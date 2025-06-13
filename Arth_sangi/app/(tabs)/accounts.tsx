import React, { useState, useEffect } from 'react';
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Switch,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width } = Dimensions.get('window');

interface FamilyMember {
  name: string;
  relation: string;
}

interface Account {
  id: string;
  firstName: string;
  lastName: string;
  balance: number;
  income: number;
  age: number;
  dependents: number;
  disposableIncome: number;
  desiredSavings: number;
  accountType: 'current' | 'savings' | 'family';
  isDefault: boolean;
  familyMembers: FamilyMember[];
  createdAt: Date;
}

const MyAccountsScreen = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'current' | 'savings' | 'family'>('all');
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'balance' | 'income' | 'created'>('created');
  const [showSortModal, setShowSortModal] = useState(false);
  const [showBalances, setShowBalances] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    balance: '',
    income: '',
    age: '',
    dependents: '0',
    disposableIncome: '',
    desiredSavings: '',
    accountType: 'current' as 'current' | 'savings' | 'family',
    isDefault: false,
  });
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([{ name: '', relation: '' }]);

  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      balance: 5000,
      income: 3000,
      age: 30,
      dependents: 2,
      disposableIncome: 1000,
      desiredSavings: 1500,
      accountType: 'savings',
      isDefault: true,
      familyMembers: [],
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      balance: 8000,
      income: 4500,
      age: 40,
      dependents: 1,
      disposableIncome: 2000,
      desiredSavings: 2500,
      accountType: 'family',
      isDefault: false,
      familyMembers: [
        { name: 'Alice Smith', relation: 'Daughter' },
        { name: 'Bob Smith', relation: 'Son' },
      ],
      createdAt: new Date('2024-02-20'),
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
      balance: 3500,
      income: 2800,
      age: 28,
      dependents: 0,
      disposableIncome: 800,
      desiredSavings: 1200,
      accountType: 'current',
      isDefault: false,
      familyMembers: [],
      createdAt: new Date('2024-03-10'),
    },
  ]);

  const tabs = [
    { name: 'all' as const, label: 'All', count: accounts.length },
    { name: 'current' as const, label: 'Current', count: accounts.filter(a => a.accountType === 'current').length },
    { name: 'savings' as const, label: 'Savings', count: accounts.filter(a => a.accountType === 'savings').length },
    { name: 'family' as const, label: 'Family', count: accounts.filter(a => a.accountType === 'family').length },
  ];

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalIncome = accounts.reduce((sum, acc) => sum + acc.income, 0);
  const totalSavingsGoal = accounts.reduce((sum, acc) => sum + acc.desiredSavings, 0);

  const summaryCards = [
    {
      title: 'Total Balance',
      amount: `₹${totalBalance.toLocaleString()}`,
      icon: 'wallet',
      gradient: ['#3B82F6', '#1D4ED8'] as const,
      bgColor: '#EFF6FF',
    },
    {
      title: 'Total Income',
      amount: `₹${totalIncome.toLocaleString()}`,
      icon: 'trending-up',
      gradient: ['#10B981', '#059669'] as const,
      bgColor: '#ECFDF5',
    },
    {
      title: 'Savings Goal',
      amount: `₹${totalSavingsGoal.toLocaleString()}`,
      icon: 'piggy-bank',
      gradient: ['#8B5CF6', '#7C3AED'] as const,
      bgColor: '#F3E8FF',
    },
  ];

  useEffect(() => {
    if (accountToEdit) {
      setFormData({
        firstName: accountToEdit.firstName,
        lastName: accountToEdit.lastName,
        balance: accountToEdit.balance.toString(),
        income: accountToEdit.income.toString(),
        age: accountToEdit.age.toString(),
        dependents: accountToEdit.dependents.toString(),
        disposableIncome: accountToEdit.disposableIncome.toString(),
        desiredSavings: accountToEdit.desiredSavings.toString(),
        accountType: accountToEdit.accountType,
        isDefault: accountToEdit.isDefault,
      });
      setFamilyMembers(accountToEdit.familyMembers.length > 0 ? accountToEdit.familyMembers : [{ name: '', relation: '' }]);
    }
  }, [accountToEdit]);

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      balance: '',
      income: '',
      age: '',
      dependents: '0',
      disposableIncome: '',
      desiredSavings: '',
      accountType: 'current',
      isDefault: false,
    });
    setFamilyMembers([{ name: '', relation: '' }]);
    setAccountToEdit(null);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    resetForm();
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      Alert.alert('Error', 'First name and last name are required');
      return false;
    }
    
    const balance = parseFloat(formData.balance);
    const income = parseFloat(formData.income);
    const disposableIncome = parseFloat(formData.disposableIncome);
    const desiredSavings = parseFloat(formData.desiredSavings);
    const age = parseInt(formData.age);

    if (isNaN(balance) || balance < 0) {
      Alert.alert('Error', 'Please enter a valid balance');
      return false;
    }
    
    if (isNaN(income) || income < 0) {
      Alert.alert('Error', 'Please enter a valid income');
      return false;
    }
    
    if (isNaN(age) || age < 18) {
      Alert.alert('Error', 'Age must be at least 18');
      return false;
    }
    
    if (disposableIncome > income) {
      Alert.alert('Error', 'Disposable income cannot exceed monthly income');
      return false;
    }
    
    if (desiredSavings > disposableIncome) {
      Alert.alert('Error', 'Desired savings cannot exceed disposable income');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const accountData: Account = {
      id: accountToEdit ? accountToEdit.id : Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      balance: parseFloat(formData.balance),
      income: parseFloat(formData.income),
      age: parseInt(formData.age),
      dependents: parseInt(formData.dependents),
      disposableIncome: parseFloat(formData.disposableIncome),
      desiredSavings: parseFloat(formData.desiredSavings),
      accountType: formData.accountType,
      isDefault: formData.isDefault,
      familyMembers: formData.accountType === 'family' ? familyMembers.filter(m => m.name && m.relation) : [],
      createdAt: accountToEdit ? accountToEdit.createdAt : new Date(),
    };

    if (accountData.isDefault) {
      setAccounts(prev => prev.map(acc => ({ ...acc, isDefault: false })));
    }

    if (accountToEdit) {
      setAccounts(prev => prev.map(acc => acc.id === accountToEdit.id ? accountData : acc));
    } else {
      setAccounts(prev => [...prev, accountData]);
    }

    closeModal();
  };

  const handleDeleteAccount = () => {
    if (accountToDelete) {
      setAccounts(prev => prev.filter(acc => acc.id !== accountToDelete.id));
      setAccountToDelete(null);
    }
  };

  const handleEditAccount = (account: Account) => {
    setAccountToEdit(account);
    setShowCreateModal(true);
  };

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: '', relation: '' }]);
  };

  const removeFamilyMember = (index: number) => {
    if (familyMembers.length > 1) {
      setFamilyMembers(familyMembers.filter((_, i) => i !== index));
    }
  };

  const updateFamilyMember = (index: number, field: keyof FamilyMember, value: string) => {
    const updated = [...familyMembers];
    updated[index][field] = value;
    setFamilyMembers(updated);
  };

  const filteredAndSortedAccounts = accounts
    .filter(account => {
      const matchesTab = selectedTab === 'all' || account.accountType === selectedTab;
      const matchesSearch = searchText === '' || 
        `${account.firstName} ${account.lastName}`.toLowerCase().includes(searchText.toLowerCase());
      return matchesTab && matchesSearch;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          break;
        case 'balance':
          comparison = a.balance - b.balance;
          break;
        case 'income':
          comparison = a.income - b.income;
          break;
        case 'created':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
      }
      return comparison;
    });

  const getAccountTypeIcon = (type: Account['accountType']) => {
    switch (type) {
      case 'family': return 'account-group';
      case 'savings': return 'piggy-bank';
      default: return 'bank';
    }
  };

  const getAccountTypeColor = (type: Account['accountType']) => {
    switch (type) {
      case 'family': return { bg: '#F3E8FF', border: '#A855F7', text: '#7C3AED' };
      case 'savings': return { bg: '#ECFDF5', border: '#10B981', text: '#059669' };
      default: return { bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8' };
    }
  };

  const calculateSavingsProgress = (account: Account) => {
    return Math.min((account.desiredSavings / account.disposableIncome) * 100, 100);
  };

  const AccountCard = ({ account }: { account: Account }) => {
    const typeColors = getAccountTypeColor(account.accountType);
    const progress = calculateSavingsProgress(account);

    return (
      <View className="bg-white rounded-3xl p-5 mb-5 mx-1" style={{ 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
      }}>
        {/* Header */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <LinearGradient
              colors={[typeColors.bg, typeColors.border + '20']}
              className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
            >
              <IconSymbol name={getAccountTypeIcon(account.accountType)} size={24} color={typeColors.text} />
            </LinearGradient>
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Text className="text-xl font-bold text-gray-900 mr-2">
                  {account.firstName} {account.lastName}
                </Text>
                {account.isDefault && (
                  <View className="bg-yellow-100 px-3 py-1 rounded-full">
                    <Text className="text-xs text-yellow-800 font-semibold">⭐ Default</Text>
                  </View>
                )}
              </View>
              <Text className="text-sm text-gray-600 capitalize">{account.accountType} Account</Text>
            </View>
          </View>
        </View>

        {/* Balance and Income */}
        <View className="flex-row justify-between mb-5">
          <View className="flex-1 mr-4">
            <Text className="text-sm text-gray-600 mb-2">Balance</Text>
            <Text className="text-2xl font-bold text-green-600">
              {showBalances ? `₹${account.balance.toLocaleString()}` : '₹••••••'}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm text-gray-600 mb-2">Monthly Income</Text>
            <Text className="text-xl font-bold text-gray-900">
              {showBalances ? `₹${account.income.toLocaleString()}` : '₹••••••'}
            </Text>
          </View>
        </View>

        {/* Details Grid */}
        <View className="flex-row justify-between mb-5 bg-gray-50 rounded-2xl p-4">
          <View className="items-center">
            <Text className="text-xs text-gray-500 mb-1">Age</Text>
            <Text className="text-base font-semibold text-gray-900">{account.age}</Text>
          </View>
          <View className="items-center">
            <Text className="text-xs text-gray-500 mb-1">Dependents</Text>
            <Text className="text-base font-semibold text-gray-900">{account.dependents}</Text>
          </View>
          <View className="items-center">
            <Text className="text-xs text-gray-500 mb-1">Created</Text>
            <Text className="text-base font-semibold text-gray-900">
              {account.createdAt.toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Savings Progress */}
        <View className="mb-5">
          <View className="flex-row justify-between mb-3">
            <Text className="text-sm text-gray-600">Savings Progress</Text>
            <Text className="text-sm font-semibold text-gray-900">
              {showBalances ? `₹${account.desiredSavings.toLocaleString()}` : '₹••••••'} / month
            </Text>
          </View>
          <View className="bg-gray-200 rounded-full h-2 mb-2">
            <View 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </View>
          <Text className="text-xs text-blue-600">
            {progress.toFixed(1)}% of disposable income
          </Text>
        </View>

        {/* Family Members */}
        {account.accountType === 'family' && account.familyMembers.length > 0 && (
          <View className="mb-5 bg-purple-50 rounded-2xl p-4">
            <View className="flex-row items-center mb-3">
              <IconSymbol name="account-group" size={16} color="#7C3AED" />
              <Text className="text-sm font-semibold text-gray-900 ml-2">Family Members</Text>
            </View>
            {account.familyMembers.slice(0, 2).map((member, index) => (
              <View key={index} className="flex-row justify-between items-center py-1">
                <Text className="text-sm text-gray-700 font-medium">{member.name}</Text>
                <View className="bg-purple-200 px-3 py-1 rounded-full">
                  <Text className="text-xs text-purple-800 font-medium">{member.relation}</Text>
                </View>
              </View>
            ))}
            {account.familyMembers.length > 2 && (
              <Text className="text-xs text-gray-500 mt-2">
                +{account.familyMembers.length - 2} more members
              </Text>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View className="flex-row justify-end" style={{ gap: 8 }}>
          <TouchableOpacity 
            onPress={() => handleEditAccount(account)}
            className="flex-row items-center bg-blue-50 px-3 py-2 rounded-lg"
          >
            <IconSymbol name="account-edit" size={16} color="#3B82F6" />
            <Text className="text-blue-600 text-sm font-semibold ml-2">Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setAccountToDelete(account)}
            className="flex-row items-center bg-red-50 px-3 py-2 rounded-lg"
          >
            <IconSymbol name="delete" size={16} color="#EF4444" />
            <Text className="text-red-600 text-sm font-semibold ml-2">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <LinearGradient
        colors={['#667EEA', '#764BA2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-16 pb-8">
          <View className="flex-row justify-between items-start mb-6">
            <View className="flex-1">
              <Text className="text-4xl font-bold text-white mb-2">My Accounts</Text>
              <Text className="text-white/80 text-lg">
                Manage your personal and family finances
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => setShowBalances(!showBalances)}
              className="bg-white/20 rounded-2xl p-3"
            >
              <IconSymbol name={showBalances ? 'eye-off' : 'eye'} size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary Cards */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="px-6 -mt-4"
          contentContainerStyle={{ paddingRight: 24 }}
        >
          {summaryCards.map((card, index) => (
            <LinearGradient
              key={index}
              colors={card.gradient}
              className="rounded-2xl p-6 mr-4 w-[200px] h-[120px]"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.2,
                shadowRadius: 16,
                elevation: 12,
              }}
            >
              <View className="flex-row items-center justify-between mb-3">
                <IconSymbol name={card.icon} size={28} color="white" />
              </View>
              <Text className="text-white/80 text-sm mb-2">{card.title}</Text>
              <Text className="text-white text-xl font-bold">
                {showBalances ? card.amount : '₹••••••'}
              </Text>
            </LinearGradient>
          ))}
        </ScrollView>

        {/* Main Content */}
        <View className="bg-white rounded-t-[2rem] mt-8 flex-1 min-h-[600px]">
          {/* Search and Controls */}
          <View className="px-6 pt-8 pb-4">
            <View className="flex-row items-center mb-6" style={{ gap: 12 }}>
              <View className="flex-1 bg-gray-100 rounded-xl px-4 py-3 flex-row items-center">
                <IconSymbol name="magnify" size={20} color="#9CA3AF" />
                <TextInput
                  placeholder="Search accounts..."
                  value={searchText}
                  onChangeText={setSearchText}
                  className="flex-1 ml-3 text-gray-900 text-base"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              
              <TouchableOpacity 
                onPress={() => setShowSortModal(true)}
                className="bg-gray-100 rounded-xl px-4 py-3"
              >
                <IconSymbol name="sort" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Create Account Button */}
            <TouchableOpacity
              onPress={() => setShowCreateModal(true)}
              className="mb-6"
            >
              <LinearGradient
                colors={['#3B82F6', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="rounded-xl p-4 flex-row items-center justify-center"
              >
                <IconSymbol name="plus" size={24} color="white" />
                <Text className="text-white text-lg font-bold ml-3">Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View className="px-6 mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row" style={{ gap: 12 }}>
                {tabs.map((tab) => (
                  <TouchableOpacity
                    key={tab.name}
                    onPress={() => setSelectedTab(tab.name)}
                    className={`px-4 py-2.5 rounded-xl ${
                      selectedTab === tab.name
                        ? 'bg-blue-600'
                        : 'bg-gray-100'
                    }`}
                  >
                    <Text
                      className={`font-semibold text-sm ${
                        selectedTab === tab.name
                          ? 'text-white'
                          : 'text-gray-700'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Account Cards */}
          <View className="px-5 pb-8">
            {filteredAndSortedAccounts.length > 0 ? (
              filteredAndSortedAccounts.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))
            ) : (
              <View className="items-center justify-center py-20">
                <View className="bg-gray-100 rounded-full p-8 mb-6">
                  <IconSymbol name="wallet" size={48} color="#9CA3AF" />
                </View>
                <Text className="text-xl font-bold text-gray-900 mb-2">No accounts found</Text>
                <Text className="text-gray-600 text-center mb-8 px-8">
                  {searchText 
                    ? `No accounts match "${searchText}"`
                    : selectedTab === 'all'
                    ? "You haven't created any accounts yet"
                    : `You don't have any ${selectedTab} accounts yet`}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowCreateModal(true)}
                  className="bg-blue-600 px-8 py-4 rounded-2xl"
                >
                  <Text className="text-white font-bold text-lg">Create Account</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Create/Edit Account Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showCreateModal}
        onRequestClose={closeModal}
      >
        <SafeAreaView className="flex-1 bg-white">
          <ScrollView className="flex-1 px-6">
            <View className="py-8">
              <View className="flex-row justify-between items-center mb-8">
                <Text className="text-2xl font-bold text-gray-900">
                  {accountToEdit ? 'Edit Account' : 'Create Account'}
                </Text>
                <TouchableOpacity onPress={closeModal}>
                  <IconSymbol name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Form Fields */}
              <View className="space-y-6">
                <View className="flex-row space-x-4">
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-2">First Name</Text>
                    <TextInput
                      value={formData.firstName}
                      onChangeText={(text) => setFormData({...formData, firstName: text})}
                      placeholder="John"
                      className="bg-gray-50 rounded-xl p-4 text-gray-900"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Last Name</Text>
                    <TextInput
                      value={formData.lastName}
                      onChangeText={(text) => setFormData({...formData, lastName: text})}
                      placeholder="Doe"
                      className="bg-gray-50 rounded-xl p-4 text-gray-900"
                    />
                  </View>
                </View>

                <View className="flex-row space-x-4">
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Age</Text>
                    <TextInput
                      value={formData.age}
                      onChangeText={(text) => setFormData({...formData, age: text})}
                      placeholder="25"
                      keyboardType="numeric"
                      className="bg-gray-50 rounded-xl p-4 text-gray-900"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Dependents</Text>
                    <TextInput
                      value={formData.dependents}
                      onChangeText={(text) => setFormData({...formData, dependents: text})}
                      placeholder="0"
                      keyboardType="numeric"
                      className="bg-gray-50 rounded-xl p-4 text-gray-900"
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">Account Type</Text>
                  <View className="flex-row space-x-3">
                    {(['current', 'savings', 'family'] as const).map((type) => (
                      <TouchableOpacity
                        key={type}
                        onPress={() => setFormData({...formData, accountType: type})}
                        className={`flex-1 p-4 rounded-xl border ${
                          formData.accountType === type
                            ? 'bg-blue-50 border-blue-500'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <Text className={`text-center capitalize font-medium ${
                          formData.accountType === type ? 'text-blue-600' : 'text-gray-700'
                        }`}>
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View className="flex-row space-x-4">
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Balance</Text>
                    <TextInput
                      value={formData.balance}
                      onChangeText={(text) => setFormData({ ...formData, balance: 			text })}
                      placeholder="₹0"
                      keyboardType="numeric"
                      className="bg-gray-50 rounded-xl p-4 text-gray-900"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Monthly Income</Text>
                    <TextInput
                      value={formData.income}
                      onChangeText={(text) => setFormData({ ...formData, income: text })}
                      placeholder="₹0"
                      keyboardType="numeric"
                      className="bg-gray-50 rounded-xl p-4 text-gray-900"
                    />
                  </View>
                </View>

                <View className="flex-row space-x-4">
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Disposable Income</Text>
                    <TextInput
                      value={formData.disposableIncome}
                      onChangeText={(text) => setFormData({ ...formData, disposableIncome: text })}
                      placeholder="₹0"
                      keyboardType="numeric"
                      className="bg-gray-50 rounded-xl p-4 text-gray-900"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 mb-2">Desired Savings</Text>
                    <TextInput
                      value={formData.desiredSavings}
                      onChangeText={(text) => setFormData({ ...formData, desiredSavings: text })}
                      placeholder="₹0"
                      keyboardType="numeric"
                      className="bg-gray-50 rounded-xl p-4 text-gray-900"
                    />
                  </View>
                </View>

                {/* Family Members */}
                {formData.accountType === 'family' && (
                  <View>
                    <Text className="text-sm font-medium text-gray-700 mb-2">Family Members</Text>
                    {familyMembers.map((member, index) => (
                      <View
                        key={index}
                        className="flex-row items-center space-x-3 mb-3"
                      >
                        <View className="flex-1">
                          <TextInput
                            value={member.name}
                            onChangeText={(text) => updateFamilyMember(index, 'name', text)}
                            placeholder="Name"
                            className="bg-gray-50 rounded-xl p-4 text-gray-900"
                          />
                        </View>
                        <View className="flex-1">
                          <TextInput
                            value={member.relation}
                            onChangeText={(text) => updateFamilyMember(index, 'relation', text)}
                            placeholder="Relation"
                            className="bg-gray-50 rounded-xl p-4 text-gray-900"
                          />
                        </View>
                        {familyMembers.length > 1 && (
                          <TouchableOpacity
                            onPress={() => removeFamilyMember(index)}
                            className="bg-red-100 rounded-xl p-2"
                          >
                            <IconSymbol name="minus" size={16} color="#DC2626" />
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                    <TouchableOpacity
                      onPress={addFamilyMember}
                      className="flex-row items-center mt-2"
                    >
                      <IconSymbol name="plus" size={18} color="#3B82F6" />
                      <Text className="text-blue-600 ml-2 font-medium">Add family member</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Set Default Switch */}
                <View className="flex-row items-center mt-2">
                  <Switch
                    value={formData.isDefault}
                    onValueChange={(val) => setFormData({ ...formData, isDefault: val })}
                    trackColor={{ false: '#D1D5DB', true: '#2563EB' }}
                    thumbColor={formData.isDefault ? '#3B82F6' : '#F3F4F6'}
                  />
                  <Text className="ml-3 text-sm text-gray-700 font-medium">Set as Default Account</Text>
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-blue-600 rounded-2xl p-4 mt-10 items-center"
              >
                <Text className="text-white text-lg font-bold">
                  {accountToEdit ? 'Update Account' : 'Create Account'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={!!accountToDelete}
        onRequestClose={() => setAccountToDelete(null)}
      >
        <View className="flex-1 justify-center items-center bg-black/30">
          <View className="bg-white rounded-2xl p-8 w-[85%] items-center">
            <IconSymbol name="trash-can-outline" size={32} color="#EF4444" />
            <Text className="text-lg font-bold mt-4 mb-2 text-gray-900">
              Delete Account
            </Text>
            <Text className="text-gray-600 mb-6 text-center">
              Are you sure you want to delete{' '}
              <Text className="font-semibold text-gray-900">
                {accountToDelete ? `${accountToDelete.firstName} ${accountToDelete.lastName}` : ''}
              </Text>
              ? This action cannot be undone.
            </Text>
            <View className="flex-row space-x-4">
              <TouchableOpacity
                onPress={() => setAccountToDelete(null)}
                className="bg-gray-100 px-6 py-3 rounded-xl"
              >
                <Text className="text-gray-700 font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteAccount}
                className="bg-red-600 px-6 py-3 rounded-xl"
              >
                <Text className="text-white font-semibold">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
            {[
              { key: 'created', label: 'Date Created' },
              { key: 'name', label: 'Name' },
              { key: 'balance', label: 'Balance' },
              { key: 'income', label: 'Income' },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                onPress={() => {
                  setSortBy(option.key as typeof sortBy);
                  setShowSortModal(false);
                }}
                className="py-3 border-b border-gray-100"
              >
                <Text
                  className={`text-base ${
                    sortBy === option.key ? 'text-blue-600 font-semibold' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setShowSortModal(false)}
              className="mt-4 bg-gray-100 rounded-xl p-4 items-center"
            >
              <Text className="text-gray-700 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MyAccountsScreen;