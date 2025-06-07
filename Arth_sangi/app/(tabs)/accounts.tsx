import React, { useState } from 'react';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const MyAccountsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('Date Created');
  const [showSortModal, setShowSortModal] = useState(false);

  // Mock data
  const accounts = [
    {
      id: 1,
      name: 'Mike Johnson',
      type: 'Current Account',
      balance: 3500,
      monthlyIncome: 2800,
      age: 28,
      dependents: 0,
      created: '10/3/2024',
      savingsProgress: 1200,
      disposableIncome: '100.0%',
      icon: '💳',
      iconBg: 'bg-blue-100',
      category: 'Current'
    },
    {
      id: 2,
      name: 'Jane Smith',
      type: 'Family Account',
      balance: 8000,
      monthlyIncome: 4500,
      age: 40,
      dependents: 1,
      created: '20/2/2024',
      savingsProgress: 2500,
      disposableIncome: '100.0%',
      icon: '👥',
      iconBg: 'bg-pink-100',
      category: 'Family',
      familyMembers: [
        { name: 'Alice Smith', relation: 'Daughter' },
        { name: 'Bob Smith', relation: 'Son' }
      ]
    },
    {
      id: 3,
      name: 'John Doe',
      type: 'Savings Account',
      balance: 5000,
      monthlyIncome: 3000,
      age: 30,
      dependents: 2,
      created: '15/1/2024',
      savingsProgress: 1500,
      disposableIncome: '100.0%',
      icon: '💰',
      iconBg: 'bg-green-100',
      category: 'Savings',
      isDefault: true
    }
  ];

  const tabs = [
    { name: 'All', count: 3 },
    { name: 'Current', count: 1 },
    { name: 'Savings', count: 1 },
    { name: 'Family', count: 1 }
  ];

  const summaryCards = [
    {
      title: 'Total Balance',
      amount: '₹16,500',
      icon: '💳',
      borderColor: 'border-blue-400',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Income',
      amount: '₹10,300',
      icon: '📈',
      borderColor: 'border-green-400',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Savings Goal',
      amount: '₹5,200',
      icon: '🎯',
      borderColor: 'border-purple-400',
      bgColor: 'bg-purple-50'
    }
  ];

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesTab = selectedTab === 'All' || account.category === selectedTab;
    return matchesSearch && matchesTab;
  });

  const AccountCard = ({ account }:any) => (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      {/* Header */}
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-row items-center flex-1">
          <View className={`w-12 h-12 ${account.iconBg} rounded-xl items-center justify-center mr-3`}>
            <Text className="text-xl">{account.icon}</Text>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="text-lg font-bold text-gray-900 mr-2">{account.name}</Text>
              {account.isDefault && (
                <View className="bg-yellow-100 px-2 py-1 rounded-full">
                  <Text className="text-xs text-yellow-800 font-medium">⭐ Default</Text>
                </View>
              )}
            </View>
            <Text className="text-sm text-gray-600">{account.type}</Text>
          </View>
        </View>
      </View>

      {/* Balance and Income */}
      <View className="flex-row justify-between mb-4">
        <View className="flex-1 mr-4">
          <Text className="text-sm text-gray-600 mb-1">Balance</Text>
          <Text className="text-xl font-bold text-green-600">₹{account.balance.toLocaleString()}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm text-gray-600 mb-1">Monthly Income</Text>
          <Text className="text-xl font-bold text-gray-900">₹{account.monthlyIncome.toLocaleString()}</Text>
        </View>
      </View>

      {/* Details Row */}
      <View className="flex-row justify-between mb-4 bg-gray-50 rounded-xl p-3">
        <View className="items-center">
          <Text className="text-xs text-gray-500 mb-1">Age</Text>
          <Text className="text-sm font-medium text-gray-900">{account.age}</Text>
        </View>
        <View className="items-center">
          <Text className="text-xs text-gray-500 mb-1">Dependents</Text>
          <Text className="text-sm font-medium text-gray-900">{account.dependents}</Text>
        </View>
        <View className="items-center">
          <Text className="text-xs text-gray-500 mb-1">Created</Text>
          <Text className="text-sm font-medium text-gray-900">{account.created}</Text>
        </View>
      </View>

      {/* Savings Progress */}
      <View className="mb-4">
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm text-gray-600">Savings Progress</Text>
          <Text className="text-sm font-medium text-gray-900">₹{account.savingsProgress} / month</Text>
        </View>
        <Text className="text-xs text-blue-600">{account.disposableIncome} of disposable income</Text>
      </View>

      {/* Family Members (if family account) */}
      {account.familyMembers && (
        <View className="mb-4 bg-pink-50 rounded-xl p-3">
          <View className="flex-row items-center mb-2">
            <Text className="text-sm font-medium text-gray-900 mr-2">👥 Family Members</Text>
          </View>
          {account.familyMembers.map((member:any, index:any) => (
            <View key={index} className="flex-row justify-between items-center py-1">
              <Text className="text-sm text-gray-700">{member.name}</Text>
              <View className="bg-pink-200 px-2 py-1 rounded-full">
                <Text className="text-xs text-pink-800">{member.relation}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Action Buttons */}
      <View className="flex-row justify-end space-x-3">
        <TouchableOpacity className="flex-row items-center bg-gray-100 px-4 py-2 rounded-lg">
          <Text className="text-gray-700 text-sm mr-1">✏️</Text>
          <Text className="text-gray-700 text-sm font-medium">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-red-100 px-4 py-2 rounded-lg">
          <Text className="text-red-600 text-sm mr-1">🗑️</Text>
          <Text className="text-red-600 text-sm font-medium">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-12">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4 pb-6">
          <Text className="text-3xl font-bold text-blue-600 mb-2">My Accounts</Text>
          <Text className="text-gray-600 text-base">
            Manage your personal and family finances with ease
          </Text>
        </View>

        {/* Summary Cards */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-4 mb-6"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {summaryCards.map((card, index) => (
            <View 
              key={index}
              className={`${card.bgColor} ${card.borderColor} border-2 rounded-2xl p-4 mr-3 min-w-[140px]`}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-lg">{card.icon}</Text>
              </View>
              <Text className="text-sm text-gray-600 mb-1">{card.title}</Text>
              <Text className="text-xl font-bold text-gray-900">{card.amount}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Search and Controls */}
        <View className="px-4 mb-4">
          <View className="flex-row items-center space-x-3 mb-4">
            <View className="flex-1 bg-white rounded-xl p-3 flex-row items-center">
              <Text className="text-gray-400 mr-2">🔍</Text>
              <TextInput
                placeholder="Search accounts..."
                value={searchText}
                onChangeText={setSearchText}
                className="flex-1 text-gray-900"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            
            <TouchableOpacity 
              onPress={() => setShowSortModal(true)}
              className="bg-white rounded-xl p-3 flex-row items-center"
            >
              <Text className="text-gray-700 text-sm mr-1">{sortBy}</Text>
              <Text className="text-gray-500">▼</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-white rounded-xl p-3">
              <Text className="text-gray-700">⚙️</Text>
            </TouchableOpacity>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity className="bg-blue-600 rounded-xl p-4 flex-row items-center justify-center mb-4">
            <Text className="text-white text-lg mr-2">+</Text>
            <Text className="text-white font-bold text-base">Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="px-4 mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-4">
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.name}
                  onPress={() => setSelectedTab(tab.name)}
                  className={`px-4 py-2 rounded-full ${
                    selectedTab === tab.name
                      ? 'bg-blue-600'
                      : 'bg-white'
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      selectedTab === tab.name
                        ? 'text-white'
                        : 'text-gray-700'
                    }`}
                  >
                    {tab.name} ({tab.count})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Account Cards */}
        <View className="px-4 pb-6">
          {filteredAccounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </View>
      </ScrollView>

      {/* Sort Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSortModal}
        onRequestClose={() => setShowSortModal(false)}
      >
        <View className="flex-1 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">Sort by</Text>
            {['Date Created', 'Name', 'Balance', 'Income'].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  setSortBy(option);
                  setShowSortModal(false);
                }}
                className="py-3 border-b border-gray-100"
              >
                <Text className={`text-base ${sortBy === option ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setShowSortModal(false)}
              className="mt-4 bg-gray-100 rounded-xl p-4 items-center"
            >
              <Text className="text-gray-700 font-medium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MyAccountsScreen;