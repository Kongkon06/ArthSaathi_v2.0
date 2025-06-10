import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
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
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const MetricCard = ({ title, value, subtitle, color = '#4F46E5' }: any) => (
    <View style={[styles.metricCard, { borderLeftColor: color }]}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </View>
  );

  const AllocationCard = ({ percentage, title, subtitle, color }: any) => (
    <View style={[styles.allocationCard, { backgroundColor: color + '15' }]}>
      <Text style={[styles.allocationPercentage, { color }]}>{percentage}%</Text>
      <Text style={[styles.allocationTitle, { color }]}>{title}</Text>
      <Text style={styles.allocationSubtitle}>{subtitle}</Text>
    </View>
  );

  if (showResults) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
        <LinearGradient
          colors={['#4F46E5', '#7C3AED', '#EC4899']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={handleReset} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Your Investment Strategy</Text>
            <Text style={styles.headerSubtitle}>
              Personalized for {formData.financialGoal} • {formData.timeHorizon} years
            </Text>
          </View>
        </LinearGradient>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Financial Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Financial Overview</Text>
            <View style={styles.metricsGrid}>
              <MetricCard
                title="Annual Income"
                value={formatCurrency(formData.income)}
                color="#10B981"
              />
              <MetricCard
                title="Monthly Investment"
                value={calculateInvestmentPlan ? formatCurrency(calculateInvestmentPlan.actualSavings) : 'N/A'}
                color="#3B82F6"
              />
              <MetricCard
                title="Risk Level"
                value={formData.riskTolerance.charAt(0).toUpperCase() + formData.riskTolerance.slice(1)}
                color="#F59E0B"
              />
              <MetricCard
                title="Time Horizon"
                value={`${formData.timeHorizon} Years`}
                color="#8B5CF6"
              />
            </View>
          </View>

          {/* Projected Returns */}
          {calculateProjectedReturns && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projected Portfolio Growth</Text>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.projectionCard}
              >
                <View style={styles.projectionGrid}>
                  <View style={styles.projectionItem}>
                    <Text style={styles.projectionLabel}>Total Investment</Text>
                    <Text style={styles.projectionValue}>
                      {formatCurrency(calculateProjectedReturns.totalInvested)}
                    </Text>
                  </View>
                  <View style={styles.projectionItem}>
                    <Text style={styles.projectionLabel}>Expected Returns</Text>
                    <Text style={styles.projectionValue}>
                      {formatCurrency(calculateProjectedReturns.totalReturns)}
                    </Text>
                  </View>
                  <View style={styles.projectionItem}>
                    <Text style={styles.projectionLabel}>Future Value</Text>
                    <Text style={[styles.projectionValue, styles.projectionHighlight]}>
                      {formatCurrency(calculateProjectedReturns.totalFutureValue)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.projectionFooter}>
                  Expected Annual Return: {calculateProjectedReturns.weightedReturn}%
                </Text>
              </LinearGradient>
            </View>
          )}

          {/* Asset Allocation */}
          {calculateAssetAllocation && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended Asset Allocation</Text>
              <View style={styles.allocationGrid}>
                <AllocationCard
                  percentage={calculateAssetAllocation.equity}
                  title="Equity"
                  subtitle="Growth potential"
                  color="#3B82F6"
                />
                <AllocationCard
                  percentage={calculateAssetAllocation.debt}
                  title="Debt"
                  subtitle="Stability & income"
                  color="#10B981"
                />
                <AllocationCard
                  percentage={calculateAssetAllocation.gold}
                  title="Gold"
                  subtitle="Inflation hedge"
                  color="#F59E0B"
                />
              </View>
            </View>
          )}

          {/* Investment Breakdown */}
          {calculateInvestmentPlan && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Monthly Investment Breakdown</Text>
              <View style={styles.breakdownCard}>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Monthly Income</Text>
                  <Text style={styles.breakdownValue}>
                    {formatCurrency(calculateInvestmentPlan.monthlyIncome)}
                  </Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Monthly Expenses</Text>
                  <Text style={styles.breakdownValue}>
                    {formatCurrency(formData.monthlyExpenses)}
                  </Text>
                </View>
                <View style={[styles.breakdownRow, styles.breakdownHighlight]}>
                  <Text style={[styles.breakdownLabel, styles.breakdownLabelHighlight]}>
                    Available for Investment
                  </Text>
                  <Text style={[styles.breakdownValue, styles.breakdownValueHighlight]}>
                    {formatCurrency(calculateInvestmentPlan.availableForInvestment)}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Next Steps */}
          <View style={[styles.section, { marginBottom: 30 }]}>
            <Text style={styles.sectionTitle}>Next Steps</Text>
            <View style={styles.stepsCard}>
              {[
                'Open a Demat account if you don\'t have one',
                'Start SIPs in recommended mutual funds',
                'Maximize tax-saving investments (80C, 80CCD)',
                'Build an emergency fund (6-12 months expenses)',
                'Review and rebalance portfolio annually'
              ].map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      <LinearGradient
        colors={['#4F46E5', '#7C3AED']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Investment Strategy Advisor</Text>
          <Text style={styles.headerSubtitle}>
            Get personalized investment recommendations based on your financial profile
          </Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Annual Income (₹) *</Text>
              <TextInput
                style={styles.textInput}
                value={formData.income}
                onChangeText={(value) => handleInputChange('income', value)}
                placeholder="e.g., 500000"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Your Age *</Text>
              <TextInput
                style={styles.textInput}
                value={formData.age}
                onChangeText={(value) => handleInputChange('age', value)}
                placeholder="e.g., 25"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Monthly Expenses (₹) *</Text>
              <TextInput
                style={styles.textInput}
                value={formData.monthlyExpenses}
                onChangeText={(value) => handleInputChange('monthlyExpenses', value)}
                placeholder="e.g., 25000"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Current Savings (₹)</Text>
              <TextInput
                style={styles.textInput}
                value={formData.currentSavings}
                onChangeText={(value) => handleInputChange('currentSavings', value)}
                placeholder="e.g., 100000"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Financial Goal *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.financialGoal}
                onValueChange={(value: string) => handleInputChange('financialGoal', value)}
                style={styles.picker}
              >
                <Picker.Item label="Retirement Planning" value="retirement" />
                <Picker.Item label="Wealth Creation" value="wealth" />
                <Picker.Item label="Child's Education" value="education" />
                <Picker.Item label="House Purchase" value="house" />
                <Picker.Item label="Emergency Fund" value="emergency" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Risk Tolerance *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.riskTolerance}
                onValueChange={(value: string) => handleInputChange('riskTolerance', value)}
                style={styles.picker}
              >
                <Picker.Item label="Conservative (Low Risk)" value="conservative" />
                <Picker.Item label="Moderate (Medium Risk)" value="moderate" />
                <Picker.Item label="Aggressive (High Risk)" value="aggressive" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Investment Time Horizon (Years) *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.timeHorizon}
              onChangeText={(value) => handleInputChange('timeHorizon', value)}
              placeholder="e.g., 20"
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleSubmit}
              disabled={loading}
            >
              <LinearGradient
                colors={['#4F46E5', '#7C3AED']}
                style={styles.submitButtonGradient}
              >
                {loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.submitButtonText}>Get My Strategy</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  formContainer: {
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  picker: {
    height: 56,
    color: '#1F2937',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitButtonGradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    width: (screenWidth - 60) / 2,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  metricTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  metricSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  projectionCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  projectionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  projectionItem: {
    flex: 1,
    alignItems: 'center',
  },
  projectionLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
    textAlign: 'center',
  },
  projectionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  projectionHighlight: {
    fontSize: 20,
  },
  projectionFooter: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontWeight: '600',
  },
  allocationGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  allocationCard: {
    width: (screenWidth - 80) / 3,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  allocationPercentage: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  allocationTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  allocationSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  breakdownCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  breakdownHighlight: {
    backgroundColor: '#F0F9FF',
    marginHorizontal: -20,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    borderRadius: 12,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  breakdownLabelHighlight: {
    fontWeight: '600',
    color: '#1F2937',
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  breakdownValueHighlight: {
    color: '#0EA5E9',
    fontSize: 16,
  },
  stepsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});

export default AdvisorScreen;