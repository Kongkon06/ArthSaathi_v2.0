import React, { useState, useCallback } from 'react';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import AccountForm from '../../components/AccountForm'
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAccount } from '@/atoms/AccountContext';
import { accountService } from '@/services/getAccount';
import { useUser } from '@/atoms/UserContext';

const MyAccountsScreen = () => {
  const { account, setAccount } = useAccount();
  const { user } = useUser();
  const [sortBy, setSortBy] = useState('Date Created');
  const [showSortModal, setShowSortModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const summaryCards = [
    {
      title: 'Total Balance',
      amount: account ? `₹${account.current_balance}` : '₹0',
      icon: 'credit-card-outline',
      borderColor: 'border-blue-400',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Income',
      amount: account ? `₹${account.monthly_income}` : '₹0',
      icon: 'chart-line',
      borderColor: 'border-green-400',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Savings Goal',
      amount: '₹5,200', // Placeholder, replace with actual logic
      icon: 'safe',
      borderColor: 'border-purple-400',
      bgColor: 'bg-purple-50'
    }
  ];
  const filteredAccounts = account ? [account] : [];

  const handleDelete = useCallback(async (id: string) => {
    try {
      await accountService.deleteAccount(id, user.token);
      setAccount(null);
    } catch (error) {
      Alert.alert('Delete Failed', 'Unable to delete account.');
    }
  }, [user.token, setAccount]);


  const AccountCard = React.memo(({ account, user }: any) => (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      {/* Header */}
      <View className="flex-row items-start justify-between mb-4">
        <View className="flex-row items-center flex-1">
          <View className={`w-12 h-12 ${account.account_type == 'Current' ? 'bg-blue-100' : account.account_type == 'Savings' ? 'bg-green-100' : 'bg-pink-100'} rounded-xl items-center justify-center mr-3`}>
            <IconSymbol 
              name={account.account_type === 'Current' ? 'credit-card' : account.account_type === 'Savings' ? 'cash' : 'account-multiple'} 
              size={24} 
              color="text-gray-700" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="text-lg font-bold text-gray-900 mr-2">{user.firstname + ' ' + user.lastname}</Text>
              {account.isDefault && (
                <View className="bg-yellow-100 px-2 py-1 rounded-full">
                  <Text className="text-xs text-yellow-800 font-medium">⭐ Default</Text>
                </View>
              )}
            </View>
            <Text className="text-sm text-gray-600">{account.account_type}</Text>
          </View>
        </View>
      </View>

      {/* Balance and Income */}
      <View className="flex-row justify-between mb-4">
        <View className="flex-1 mr-4">
          <Text className="text-sm text-gray-600 mb-1">Balance</Text>
          <Text className="text-xl font-bold text-green-600">₹{account.current_balance}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm text-gray-600 mb-1">Monthly Income</Text>
          <Text className="text-xl font-bold text-gray-900">₹{account.monthly_income}</Text>
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
          <Text className="text-sm font-medium text-gray-900">₹{account.savingsProgress ?? 0} / month</Text>
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
        <TouchableOpacity onPress={() => handleDelete(account.id)} className="flex-row items-center bg-red-100 px-4 py-2 rounded-lg">
          <IconSymbol name='delete-forever-outline' size={20} color='black'/>
          <Text className="text-red-600 text-sm font-medium">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  ));

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
          {account && summaryCards.map((card, index) => (
            <View 
              key={index}
              className={`${card.bgColor} ${card.borderColor} border-2 rounded-2xl p-4 mr-3 min-w-[140px]`}
            >
              <View className="flex-row items-center justify-between mb-2">
                <IconSymbol 
                  name={card.icon} 
                  size={24} 
                  color="text-gray-700" />
              </View>
              <Text className="text-sm text-gray-600 mb-1">{card.title}</Text>
              <Text className="text-xl font-bold text-gray-900">{card.amount}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Search and Controls */}
        <View className="px-4 mb-4">
          {account ? null : <AccountForm />}
        </View>

        {/* Account Cards */}
        <View className="px-4 pb-6">
          {filteredAccounts.map((account) => (
            <AccountCard key={account.id} account={account} user={user} />
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
