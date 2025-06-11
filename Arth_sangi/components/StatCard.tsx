import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
export default function StatCard({ icon, title, amount, change, changeColor, bgColor, isMain = false }:any) {
  return (
    <View className={`${isMain ? 'border-2 border-blue-400' : ''} bg-white rounded-2xl p-4 mb-4 shadow-sm`}>
      <View className="flex-row items-center justify-between mb-3">
        <View className={`w-10 h-10 ${bgColor} rounded-xl items-center justify-center`}>
            <IconSymbol name={icon} size={24} color="#1D4ED8" />
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
}