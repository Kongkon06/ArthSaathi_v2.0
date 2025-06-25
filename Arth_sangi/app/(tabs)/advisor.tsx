import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AdvisorScreen = () => {
  const [formData, setFormData] = useState({
    income: '',
    age: '',
    financialGoal: 'retirement',
    riskTolerance: 'moderate',
    timeHorizon: '',
    currentSavings: '',
    monthlyExpenses: ''
  });
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calculate dynamic asset allocation based on age and risk tolerance
  const calculateAssetAllocation = useMemo(() => {
    if (!formData.age || !formData.timeHorizon) return null;

    const age = parseInt(formData.age);
    const timeHorizon = parseInt(formData.timeHorizon);
    
    let baseEquity = Math.max(20, Math.min(80, 100 - age));
    
    switch (formData.riskTolerance) {
      case 'conservative':
        baseEquity = Math.max(20, baseEquity - 20);
        break;
      case 'aggressive':
        baseEquity = Math.min(85, baseEquity + 15);
        break;
      default:
        break;
    }
    
    if (timeHorizon > 20) baseEquity = Math.min(80, baseEquity + 10);
    if (timeHorizon < 5) baseEquity = Math.max(30, baseEquity - 15);
    
    const equity = baseEquity;
    const debt = Math.max(15, 90 - equity);
    const gold = Math.min(10, 100 - equity - debt);
    
    return { equity, debt, gold };
  }, [formData.age, formData.timeHorizon, formData.riskTolerance]);

  // Calculate monthly investment suggestions
  const calculateInvestmentPlan = useMemo(() => {
    if (!formData.income || !formData.monthlyExpenses) return null;

    const annualIncome = parseInt(formData.income);
    const monthlyIncome = annualIncome / 12;
    const monthlyExpenses = parseInt(formData.monthlyExpenses);
    const availableForInvestment = monthlyIncome - monthlyExpenses;
    
    const recommendedSavings = monthlyIncome * 0.20;
    const actualSavings = Math.min(availableForInvestment, recommendedSavings);
    
    return {
      monthlyIncome: monthlyIncome.toFixed(0),
      availableForInvestment: availableForInvestment.toFixed(0),
      recommendedSavings: recommendedSavings.toFixed(0),
      actualSavings: actualSavings.toFixed(0)
    };
  }, [formData.income, formData.monthlyExpenses]);

  // Calculate projected returns
  const calculateProjectedReturns = useMemo(() => {
    if (!calculateInvestmentPlan || !calculateAssetAllocation || !formData.timeHorizon) return null;

    const monthlyInvestment = parseInt(calculateInvestmentPlan.actualSavings);
    const years = parseInt(formData.timeHorizon);
    const currentSavings = parseInt(formData.currentSavings) || 0;
    
    const equityReturn = 0.12;
    const debtReturn = 0.07;
    const goldReturn = 0.08;
    
    const { equity, debt, gold } = calculateAssetAllocation;
    const weightedReturn = (equity * equityReturn + debt * debtReturn + gold * goldReturn) / 100;
    
    const monthlyRate = weightedReturn / 12;
    const totalMonths = years * 12;
    
    const sipFutureValue = monthlyInvestment * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate);
    const currentSavingsFV = currentSavings * ((1 + weightedReturn) ** years);
    const totalFutureValue = sipFutureValue + currentSavingsFV;
    const totalInvested = (monthlyInvestment * totalMonths) + currentSavings;
    const totalReturns = totalFutureValue - totalInvested;
    
    return {
      totalFutureValue: totalFutureValue.toFixed(0),
      totalInvested: totalInvested.toFixed(0),
      totalReturns: totalReturns.toFixed(0),
      weightedReturn: (weightedReturn * 100).toFixed(1)
    };
  }, [calculateInvestmentPlan, calculateAssetAllocation, formData.timeHorizon, formData.currentSavings]);

 const handleInputChange = (field: string, value: string) => {
    let safeValue = value;
    if (['income', 'age', 'timeHorizon', 'currentSavings', 'monthlyExpenses'].includes(field)) {
      safeValue = value.replace(/[^0-9]/g, '');
    }
    setFormData(prev => ({ ...prev, [field]: safeValue }));
  };


  const handleSubmit = () => {
    if (!formData.income || !formData.age || !formData.monthlyExpenses || !formData.timeHorizon) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      income: '',
      age: '',
      financialGoal: 'retirement',
      riskTolerance: 'moderate',
      timeHorizon: '',
      currentSavings: '',
      monthlyExpenses: ''
    });
    setShowResults(false);
  };

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseInt(amount) : amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  type MetricCardColor = 'indigo' | 'green' | 'blue' | 'amber' | 'purple';
  interface MetricCardProps {
    title: string;
    value: string;
    subtitle?: string;
    color?: MetricCardColor;
  }

  const MetricCard = ({ title, value, subtitle, color = 'indigo' }: MetricCardProps) => {
    const colorStyles: Record<MetricCardColor, string> = {
      indigo: 'border-l-indigo-600 text-indigo-600',
      green: 'border-l-emerald-600 text-emerald-600', 
      blue: 'border-l-blue-600 text-blue-600',
      amber: 'border-l-amber-600 text-amber-600',
      purple: 'border-l-purple-600 text-purple-600'
    };

    return (
      <View className={`bg-white rounded-2xl p-4 mb-3 border-l-4 shadow-lg ${colorStyles[color]}`} 
            style={{ width: (screenWidth - 60) / 2 }}>
        <Text className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{title}</Text>
        <Text className={`text-lg font-bold mb-0.5 ${colorStyles[color].split(' ')[1]}`}>{value}</Text>
        {subtitle && <Text className="text-xs text-gray-400">{subtitle}</Text>}
      </View>
    );
  };

  type AllocationCardColor = 'blue' | 'green' | 'amber';
  interface AllocationCardProps {
    percentage: number;
    title: string;
    subtitle: string;
    color: AllocationCardColor;
  }

  const AllocationCard = ({ percentage, title, subtitle, color }: AllocationCardProps) => {
    const colorStyles: Record<AllocationCardColor, string> = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-emerald-50 text-emerald-600',
      amber: 'bg-amber-50 text-amber-600'
    };

    return (
      <View className={`rounded-2xl p-4 items-center ${colorStyles[color]}`} 
            style={{ width: (screenWidth - 80) / 3 }}>
        <Text className={`text-3xl font-bold mb-1 ${colorStyles[color].split(' ')[1]}`}>{percentage}%</Text>
        <Text className={`text-sm font-semibold mb-0.5 ${colorStyles[color].split(' ')[1]}`}>{title}</Text>
        <Text className="text-xs text-gray-500 text-center">{subtitle}</Text>
      </View>
    );
  };

  if (showResults) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50">
        <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
        <LinearGradient
          colors={['#4F46E5', '#7C3AED', '#EC4899']}
          className="pt-5 pb-8 px-5"
        >
          <View className="items-center mt-8">
            <TouchableOpacity onPress={handleReset} className="self-start mb-2.5">
              <Text className="text-white text-base font-semibold">← Back</Text>
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-white text-center mb-2">Your Investment Strategy</Text>
            <Text className="text-base text-white/90 text-center leading-6">
              Personalized for {formData.financialGoal} • {formData.timeHorizon} years
            </Text>
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 bg-slate-50" showsVerticalScrollIndicator={false}>
          {/* Financial Overview */}
          <View className="px-5 mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">Financial Overview</Text>
            <View className="flex-row flex-wrap justify-between">
              <MetricCard
                title="Annual Income"
                value={formatCurrency(formData.income)}
                color="green"
              />
              <MetricCard
                title="Monthly Investment"
                value={calculateInvestmentPlan ? formatCurrency(calculateInvestmentPlan.actualSavings) : 'N/A'}
                color="blue"
              />
              <MetricCard
                title="Risk Level"
                value={formData.riskTolerance.charAt(0).toUpperCase() + formData.riskTolerance.slice(1)}
                color="amber"
              />
              <MetricCard
                title="Time Horizon"
                value={`${formData.timeHorizon} Years`}
                color="purple"
              />
            </View>
          </View>

          {/* Projected Returns */}
          {calculateProjectedReturns && (
            <View className="px-5 mb-6">
              <Text className="text-xl font-bold text-gray-800 mb-4">Projected Portfolio Growth</Text>
              <LinearGradient
                colors={['#10B981', '#059669']}
                className="rounded-3xl p-6 mb-4"
              >
                <View className="flex-row justify-between mb-4">
                  <View className="flex-1 items-center">
                    <Text className="text-xs text-white/80 mb-1 text-center">Total Investment</Text>
                    <Text className="text-base font-bold text-white text-center">
                      {formatCurrency(calculateProjectedReturns.totalInvested)}
                    </Text>
                  </View>
                  <View className="flex-1 items-center">
                    <Text className="text-xs text-white/80 mb-1 text-center">Expected Returns</Text>
                    <Text className="text-base font-bold text-white text-center">
                      {formatCurrency(calculateProjectedReturns.totalReturns)}
                    </Text>
                  </View>
                  <View className="flex-1 items-center">
                    <Text className="text-xs text-white/80 mb-1 text-center">Future Value</Text>
                    <Text className="text-xl font-bold text-white text-center">
                      {formatCurrency(calculateProjectedReturns.totalFutureValue)}
                    </Text>
                  </View>
                </View>
                <Text className="text-sm text-white/90 text-center font-semibold">
                  Expected Annual Return: {calculateProjectedReturns.weightedReturn}%
                </Text>
              </LinearGradient>
            </View>
          )}

          {/* Asset Allocation */}
          {calculateAssetAllocation && (
            <View className="px-5 mb-6">
              <Text className="text-xl font-bold text-gray-800 mb-4">Recommended Asset Allocation</Text>
              <View className="flex-row justify-between mb-4">
                <AllocationCard
                  percentage={calculateAssetAllocation.equity}
                  title="Equity"
                  subtitle="Growth potential"
                  color="blue"
                />
                <AllocationCard
                  percentage={calculateAssetAllocation.debt}
                  title="Debt"
                  subtitle="Stability & income"
                  color="green"
                />
                <AllocationCard
                  percentage={calculateAssetAllocation.gold}
                  title="Gold"
                  subtitle="Inflation hedge"
                  color="amber"
                />
              </View>
            </View>
          )}

          {/* Investment Breakdown */}
          {calculateInvestmentPlan && (
            <View className="px-5 mb-6">
              <Text className="text-xl font-bold text-gray-800 mb-4">Monthly Investment Breakdown</Text>
              <View className="bg-white rounded-2xl p-5 shadow-lg">
                <View className="flex-row justify-between py-3 border-b border-gray-100">
                  <Text className="text-sm text-gray-500">Monthly Income</Text>
                  <Text className="text-sm font-semibold text-gray-800">
                    {formatCurrency(calculateInvestmentPlan.monthlyIncome)}
                  </Text>
                </View>
                <View className="flex-row justify-between py-3 border-b border-gray-100">
                  <Text className="text-sm text-gray-500">Monthly Expenses</Text>
                  <Text className="text-sm font-semibold text-gray-800">
                    {formatCurrency(formData.monthlyExpenses)}
                  </Text>
                </View>
                <View className="flex-row justify-between py-3 bg-sky-50 -mx-5 px-5 rounded-xl">
                  <Text className="text-sm font-semibold text-gray-800">Available for Investment</Text>
                  <Text className="text-base font-semibold text-sky-600">
                    {formatCurrency(calculateInvestmentPlan.availableForInvestment)}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Next Steps */}
          <View className="px-5 mb-8">
            <Text className="text-xl font-bold text-gray-800 mb-4">Next Steps</Text>
            <View className="bg-white rounded-2xl p-5 shadow-lg">
              {[
                'Open a Demat account if you don\'t have one',
                'Start SIPs in recommended mutual funds',
                'Maximize tax-saving investments (80C, 80CCD)',
                'Build an emergency fund (6-12 months expenses)',
                'Review and rebalance portfolio annually'
              ].map((step, index) => (
                <View key={index} className="flex-row items-start mb-4">
                  <View className="w-6 h-6 rounded-full bg-indigo-600 justify-center items-center mr-3 mt-0.5">
                    <Text className="text-white text-xs font-bold">{index + 1}</Text>
                  </View>
                  <Text className="flex-1 text-sm text-gray-700 leading-5">{step}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    //Header section 
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F1F5F9', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} className="bg-slate-50">
      <LinearGradient
        colors={['#4F46E5', '#7C3AED']}
        className="pt-5 pb-8 px-5"
      >
        <View className="items-center">
          <Text className="text-3xl font-bold text-white text-center mb-2">Investment Strategy Advisor</Text>
          <Text className="text-base text-white/90 text-center leading-6">
            Get personalized investment recommendations based on your financial profile
          </Text>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 bg-slate-50" showsVerticalScrollIndicator={false}>
        <View className="p-5">
          <View className="flex-row justify-between mb-5">
            <View className="flex-1 mr-2.5 mb-5">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Annual Income (₹) *</Text>
              <TextInput
                className="bg-white border-2 border-gray-200 rounded-xl p-4 text-base text-gray-800 shadow-sm"
                value={formData.income}
                onChangeText={(value) => handleInputChange('income', value)}
                placeholder="e.g., 500000"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View className="flex-1 mr-2.5 mb-5">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Your Age *</Text>
              <TextInput
                className="bg-white border-2 border-gray-200 rounded-xl p-4 text-base text-gray-800 shadow-sm"
                value={formData.age}
                onChangeText={(value) => handleInputChange('age', value)}
                placeholder="e.g., 25"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View className="flex-row justify-between mb-5">
            <View className="flex-1 mr-2.5 mb-5">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Monthly Expenses (₹) *</Text>
              <TextInput
                className="bg-white border-2 border-gray-200 rounded-xl p-4 text-base text-gray-800 shadow-sm"
                value={formData.monthlyExpenses}
                onChangeText={(value) => handleInputChange('monthlyExpenses', value)}
                placeholder="e.g., 25000"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View className="flex-1 mr-2.5 mb-5">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Current Savings (₹)</Text>
              <TextInput
                className="bg-white border-2 border-gray-200 rounded-xl p-4 text-base text-gray-800 shadow-sm"
                value={formData.currentSavings}
                onChangeText={(value) => handleInputChange('currentSavings', value)}
                placeholder="e.g., 100000"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View className="flex-1 mr-2.5 mb-5">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Financial Goal *</Text>
            <View className="bg-white border-2 border-gray-200 rounded-xl shadow-sm">
              <Picker
                selectedValue={formData.financialGoal}
                onValueChange={(value: string) => handleInputChange('financialGoal', value)}
                className="h-14 text-gray-800"
              >
                <Picker.Item label="Retirement Planning" value="retirement" />
                <Picker.Item label="Wealth Creation" value="wealth" />
                <Picker.Item label="Child's Education" value="education" />
                <Picker.Item label="House Purchase" value="house" />
                <Picker.Item label="Emergency Fund" value="emergency" />
              </Picker>
            </View>
          </View>

          <View className="flex-1 mr-2.5 mb-5">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Risk Tolerance *</Text>
            <View className="bg-white border-2 border-gray-200 rounded-xl shadow-sm">
              <Picker
                selectedValue={formData.riskTolerance}
                onValueChange={(value: string) => handleInputChange('riskTolerance', value)}
                className="h-14 text-gray-800"
              >
                <Picker.Item label="Conservative (Low Risk)" value="conservative" />
                <Picker.Item label="Moderate (Medium Risk)" value="moderate" />
                <Picker.Item label="Aggressive (High Risk)" value="aggressive" />
              </Picker>
            </View>
          </View>

          <View className="flex-1 mr-2.5 mb-5">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Investment Time Horizon (Years) *</Text>
            <TextInput
              className="bg-white border-2 border-gray-200 rounded-xl p-4 text-base text-gray-800 shadow-sm"
              value={formData.timeHorizon}
              onChangeText={(value) => handleInputChange('timeHorizon', value)}
              placeholder="e.g., 20"
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View className="flex-row justify-between mt-8 gap-3">
            <TouchableOpacity className="flex-1 bg-gray-100 rounded-xl p-4 items-center" onPress={handleReset}>
              <Text className="text-gray-600 text-base font-semibold">Reset</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 rounded-xl overflow-hidden"
              onPress={handleSubmit}
              disabled={loading}
              style={{ flex: 2 }}
            >
              <LinearGradient
                colors={['#4F46E5', '#7C3AED']}
                className="p-4 items-center justify-center"
              >
                {loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text className="text-white text-base font-bold">Get My Strategy</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdvisorScreen;