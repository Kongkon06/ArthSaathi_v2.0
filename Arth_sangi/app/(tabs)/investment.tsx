import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const MutualFundSchemesScreen = () => {
  const [showInfoBanner, setShowInfoBanner] = useState(true);

  // Mock data for mutual funds
  const mutualFunds = [
    {
      id: 1,
      name: 'Global Opportunities Fund',
      riskLevel: 4,
      riskColor: 'bg-yellow-100',
      riskTextColor: 'text-yellow-800',
      expenseRatio: '1.3%',
      fundSize: '₹2200 Cr',
      sharpeRatio: '1.7',
      sortinoRatio: '1.3',
      fundAge: '8 years',
      beta: '1.1'
    },
    {
      id: 2,
      name: 'Dividend Yield Fund',
      riskLevel: 3,
      riskColor: 'bg-green-100',
      riskTextColor: 'text-green-800',
      expenseRatio: '0.78%',
      fundSize: '₹3200 Cr',
      sharpeRatio: '1.3',
      sortinoRatio: '1',
      fundAge: '12 years',
      beta: '0.9'
    },
    {
      id: 3,
      name: 'Dynamic Bond Fund',
      riskLevel: 2,
      riskColor: 'bg-green-100',
      riskTextColor: 'text-green-700',
      expenseRatio: '0.6%',
      fundSize: '₹4500 Cr',
      sharpeRatio: '0.8',
      sortinoRatio: '0.6',
      fundAge: '9 years',
      beta: '0.4'
    },
    {
      id: 4,
      name: 'ESG Equity Fund',
      riskLevel: 3,
      riskColor: 'bg-green-100',
      riskTextColor: 'text-green-800',
      expenseRatio: '0.88%',
      fundSize: '₹900 Cr',
      sharpeRatio: '1.6',
      sortinoRatio: '1.2',
      fundAge: '4 years',
      beta: '0.85'
    },
    {
      id: 5,
      name: 'Healthcare Innovation Fund',
      riskLevel: 5,
      riskColor: 'bg-red-100',
      riskTextColor: 'text-red-800',
      expenseRatio: '1.2%',
      fundSize: '₹600 Cr',
      sharpeRatio: '2',
      sortinoRatio: '1.8',
      fundAge: '3 years',
      beta: '1.3'
    },
    {
      id: 6,
      name: 'Ultra Short Term Fund',
      riskLevel: 2,
      riskColor: 'bg-green-100',
      riskTextColor: 'text-green-700',
      expenseRatio: '0.45%',
      fundSize: '₹8000 Cr',
      sharpeRatio: '0.7',
      sortinoRatio: '0.5',
      fundAge: '6 years',
      beta: '0.2'
    },
    {
      id: 7,
      name: 'Value & Contra Fund',
      riskLevel: 4,
      riskColor: 'bg-yellow-100',
      riskTextColor: 'text-yellow-800',
      expenseRatio: '1.1%',
      fundSize: '₹1800 Cr',
      sharpeRatio: '1.4',
      sortinoRatio: '1.1',
      fundAge: '7 years',
      beta: '1.0'
    },
    {
      id: 8,
      name: 'Multi-Cap Fund',
      riskLevel: 6,
      riskColor: 'bg-red-100',
      riskTextColor: 'text-red-800',
      expenseRatio: '1.5%',
      fundSize: '₹2500 Cr',
      sharpeRatio: '1.9',
      sortinoRatio: '1.6',
      fundAge: '5 years',
      beta: '1.4'
    }
  ];

  const getRiskLevelText = (level:any) => {
    return `Risk Level ${level}`;
  };

  const FundCard = ({ fund }:any) => (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
      {/* Header */}
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 mb-2">{fund.name}</Text>
          <View className={`${fund.riskColor} px-3 py-1 rounded-full self-start`}>
            <Text className={`text-xs font-medium ${fund.riskTextColor}`}>
              {getRiskLevelText(fund.riskLevel)}
            </Text>
          </View>
        </View>
      </View>

      {/* Metrics Grid */}
      <View className="mb-4">
        {/* First Row */}
        <View className="flex-row justify-between mb-3">
          <View className="flex-1 mr-4">
            <Text className="text-sm text-gray-600 mb-1">Expense Ratio:</Text>
            <Text className="text-base font-semibold text-gray-900">{fund.expenseRatio}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm text-gray-600 mb-1">Fund Size:</Text>
            <Text className="text-base font-semibold text-gray-900">{fund.fundSize}</Text>
          </View>
        </View>

        {/* Second Row */}
        <View className="flex-row justify-between mb-3">
          <View className="flex-1 mr-4">
            <Text className="text-sm text-gray-600 mb-1">Sharpe Ratio:</Text>
            <Text className="text-base font-semibold text-gray-900">{fund.sharpeRatio}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm text-gray-600 mb-1">Sortino Ratio:</Text>
            <Text className="text-base font-semibold text-gray-900">{fund.sortinoRatio}</Text>
          </View>
        </View>

        {/* Third Row */}
        <View className="flex-row justify-between mb-3">
          <View className="flex-1 mr-4">
            <Text className="text-sm text-gray-600 mb-1">Fund Age:</Text>
            <Text className="text-base font-semibold text-gray-900">{fund.fundAge}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm text-gray-600 mb-1">Beta:</Text>
            <Text className="text-base font-semibold text-gray-900">{fund.beta}</Text>
          </View>
        </View>
      </View>

      {/* Analyze Performance Button */}
      <TouchableOpacity className="bg-blue-100 rounded-xl p-4 items-center">
        <Text className="text-blue-700 font-semibold text-base">Analyze Performance</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-12">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-3xl font-bold text-gray-900 mb-2">Mutual Fund Schemes</Text>
          <Text className="text-gray-600 text-base">
            Compare funds and get AI-powered return predictions
          </Text>
        </View>

        {/* Info Banner */}
        {showInfoBanner && (
          <View className="mx-4 my-4 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <View className="flex-row items-start">
              <View className="w-6 h-6 bg-blue-100 rounded-full items-center justify-center mr-3 mt-0.5">
                <Text className="text-blue-600 text-sm font-bold">ℹ️</Text>
              </View>
              <View className="flex-1">
                <Text className="text-blue-900 font-semibold text-base mb-1">
                  Click on any fund card below to analyze its performance
                </Text>
                <Text className="text-blue-700 text-sm">
                  Our AI will predict 1, 3, and 5 year returns based on fund metrics
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => setShowInfoBanner(false)}
                className="ml-2"
              >
                <Text className="text-blue-600 text-lg font-bold">×</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Fund Cards Grid */}
        <View className="px-4 pb-6">
          {/* Create pairs for 2-column layout on larger screens */}
          {Array.from({ length: Math.ceil(mutualFunds.length / 2) }, (_, i) => (
            <View key={i} className="mb-2">
              {/* For mobile, show single column */}
              <View className="flex-1">
                <FundCard fund={mutualFunds[i * 2]} />
                {mutualFunds[i * 2 + 1] && (
                  <FundCard fund={mutualFunds[i * 2 + 1]} />
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Bottom spacing */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MutualFundSchemesScreen;