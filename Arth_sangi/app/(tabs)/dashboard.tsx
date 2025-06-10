import React, { useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

// Mock chart data
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [45000, 48000, 52000, 49000, 51000, 55000],
      color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
      strokeWidth: 3,
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  propsForLabels: {
    fontSize: 12,
    fill: '#6B7280',
  },
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: '#E5E7EB',
  },
};
export default function FinancialDashboard(){
  const [selectedPeriod, setSelectedPeriod] = useState('Last 3 months');

  const StatCard = ({ icon, title, amount, change, changeColor, bgColor, isMain = false }:any) => (
    <View className={`${isMain ? 'border-2 border-blue-400' : ''} bg-white rounded-2xl p-4 mb-4 shadow-sm`}>
      <View className="flex-row items-center justify-between mb-3">
        <View className={`w-10 h-10 ${bgColor} rounded-xl items-center justify-center`}>
          <Text className="text-lg">{icon}</Text>
        </View>
        {change && (
          <View className="flex-row items-center">
            <Text className="text-xs text-gray-500 mr-1">📈</Text>
            <Text className="text-xs font-medium text-gray-700">{change}</Text>
          </View>
        )}
      </View>
      
      <Text className="text-sm text-gray-600 mb-1">{title}</Text>
      <Text className={`text-2xl font-bold ${isMain ? 'text-gray-900' : 'text-gray-800'} mb-2`}>
        {amount}
      </Text>
      
      {changeColor && (
        <Text className={`text-sm ${changeColor}`}>
          {changeColor.includes('green') ? '+' : '-'} 
          {changeColor.includes('green') ? '₹9,091' : '₹1,020'} from last month
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-12">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      <ScrollView className="flex-1 px-4 pt-2" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Text className="text-2xl font-bold text-gray-900 mr-2">
                Hello Sourabh Ghosh!
              </Text>
              <Text className="text-2xl">👋</Text>
            </View>
            <Text className="text-gray-600 text-base">
              Every small step brings you closer to your big dreams.
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              Friday, June 6, 2025
            </Text>
          </View>
          
          <View className="w-12 h-12 bg-indigo-500 rounded-full items-center justify-center">
            <Text className="text-white font-bold text-lg">SG</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="mb-6">
          {/* Main Balance Card */}
          <StatCard
            icon="💳"
            title="Total Balance"
            amount="₹1,00,000"
            change="10%"
            changeColor="text-green-600"
            bgColor="bg-green-100"
            isMain={true}
          />
          
          {/* Other Stats */}
          <View className="flex-row justify-between mb-4">
            <View className="flex-1 mr-2">
              <StatCard
                icon="💸"
                title="Monthly Expenses"
                amount="₹40,000"
                changeColor="text-red-500"
                bgColor="bg-red-100"
              />
            </View>
            <View className="flex-1 ml-2">
              <StatCard
                icon="💰"
                title="Monthly Investment"
                amount="₹2,000"
                change="15.8%"
                changeColor="text-green-600"
                bgColor="bg-green-100"
              />
            </View>
          </View>
          
          <StatCard
            icon="📊"
            title="Savings Rate"
            amount="₹400"
            change="20.5%"
            changeColor="text-green-600"
            bgColor="bg-green-100"
          />
        </View>

        {/* Financial Overview */}
        <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-lg font-bold text-gray-900 mb-1">
                Financial Overview
              </Text>
              <Text className="text-gray-600 text-sm">
                Track your investment vs expenses over time
              </Text>
            </View>
            
            <TouchableOpacity className="bg-gray-100 px-3 py-2 rounded-lg flex-row items-center">
              <Text className="text-sm text-gray-700 mr-1">{selectedPeriod}</Text>
              <Text className="text-gray-500">▼</Text>
            </TouchableOpacity>
          </View>

          {/* Chart */}
          <View className="items-center">
            <LineChart
              data={chartData}
              width={screenWidth - 60}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              withInnerLines={true}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={true}
              segments={4}
            />
          </View>
        </View>

        {/* Bottom spacing */}
        <View className="h-6" />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full items-center justify-center shadow-lg">
        <Text className="text-white text-xl">💬</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};