import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { expenseService } from '@/services/expenseService';
import { useUser } from '@/atoms/UserContext';
import { useAccount } from '@/atoms/AccountContext';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface Expense {
  category: string;
  amount: string;
  description: string;
}

const QuickActions: React.FC = () => {
  const { user } = useUser();
  const { account } = useAccount();
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState<Expense>({
    category: '',
    amount: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Add Expense',
      icon: 'plus-circle',
      color: '#EF4444',
      bgColor: 'bg-red-50',
    },
    {
      id: '2',
      title: 'Govt Schemes',
      icon: 'town-hall',
      color: '#3B82F6',
      bgColor: 'bg-blue-50',
    },
    {
      id: '3',
      title: 'Saving Goals',
      icon: 'target',
      color: '#10B981',
      bgColor: 'bg-green-50',
    },
  ];

  const expenseCategories = [
    'Food & Dining',
    'Transport',
    'Shopping',
    'Bills & Utilities',
    'Entertainment',
    'Healthcare',
    'Education',
    'Travel',
    'Others',
  ];

  const handleQuickAction = (action: QuickAction) => {
    switch (action.id) {
      case '1':
        setShowAddExpenseModal(true);
        break;
      case '2':
        Alert.alert('Government Schemes', 'Government schemes feature coming soon!');
        break;
      case '3':
        Alert.alert('Saving Goals', 'Saving goals feature coming soon!');
        break;
      default:
        Alert.alert('Coming Soon', `${action.title} feature coming soon!`);
    }
  };

  // Use useCallback to prevent unnecessary re-renders
  const handleAmountChange = useCallback((text: string) => {
    setExpenseData(prev => ({ ...prev, amount: text }));
  }, []);

  const handleDescriptionChange = useCallback((text: string) => {
    setExpenseData(prev => ({ ...prev, description: text }));
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setExpenseData(prev => ({ ...prev, category }));
  }, []);

  const handleAddExpense = async () => {
    if (!expenseData.category || !expenseData.amount || !expenseData.description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (isNaN(Number(expenseData.amount)) || Number(expenseData.amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      if(account==null){
        console.log("User doenst has an account")
        return 
      }
      await expenseService.addExpense({
        category: expenseData.category,
        amount: Number(expenseData.amount),
        type:'Debit',
        accountId: account?.id ?? '' 
      }, user.token);

      Alert.alert('Success', 'Expense added successfully!');
      setExpenseData({ category: '', amount: '', description: '' });
      setShowAddExpenseModal(false);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add expense');
    } finally {
      setIsLoading(false);
    }
  };

  const QuickActionButton: React.FC<{ item: QuickAction }> = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleQuickAction(item)}
      className="items-center flex-1 mx-2"
    >
      <View className={`w-16 h-16 ${item.bgColor} rounded-2xl items-center justify-center mb-3 border border-gray-100`}>
        <IconSymbol name={item.icon} size={24} color={item.color} />
      </View>
      <Text className="text-sm text-gray-700 font-medium text-center">{item.title}</Text>
    </TouchableOpacity>
  );

  const ModalBackdrop: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <View className="flex-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
      <View 
        className="flex-1" 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {children}
      </View>
    </View>
  );

  return (
    <>
      {/* Quick Actions Section */}
      <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        <Text className="text-lg font-bold text-gray-900 mb-4">Quick Actions</Text>
        <View className="flex-row justify-between">
          {quickActions.map((action) => (
            <QuickActionButton key={action.id} item={action} />
          ))}
        </View>
      </View>

      {/* Add Expense Modal */}
      <Modal
        visible={showAddExpenseModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddExpenseModal(false)}
      >
        <ModalBackdrop>
          <View className="flex-1 justify-end">
            <View className="bg-white rounded-t-3xl p-6 min-h-[500px]" style={{ 
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 8,
            }}>
              <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />
              
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-xl font-bold text-gray-900">Add Expense</Text>
                <TouchableOpacity 
                  onPress={() => setShowAddExpenseModal(false)}
                  className="w-8 h-8 items-center justify-center"
                >
                  <IconSymbol name="close" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
              
              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <View className="space-y-4">
                  {/* Category Selection */}
                  <View>
                    <Text className="text-sm font-semibold text-gray-700 mb-2">Category</Text>
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      className="mb-2"
                      keyboardShouldPersistTaps="handled"
                    >
                      <View className="flex-row space-x-2 px-1">
                        {expenseCategories.map((category) => (
                          <TouchableOpacity
                            key={category}
                            onPress={() => handleCategoryChange(category)}
                            className={`px-4 py-2 rounded-full border ${
                              expenseData.category === category 
                                ? 'bg-blue-100 border-blue-300' 
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <Text className={`text-sm font-medium ${
                              expenseData.category === category 
                                ? 'text-blue-700' 
                                : 'text-gray-600'
                            }`}>
                              {category}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </View>

                  {/* Amount Input */}
                  <View>
                    <Text className="text-sm font-semibold text-gray-700 mb-2">Amount</Text>
                    <View className="relative">
                      <Text className="absolute left-4 top-4 text-gray-500 text-base font-semibold">₹</Text>
                      <TextInput
                        value={expenseData.amount}
                        onChangeText={handleAmountChange}
                        placeholder="0"
                        keyboardType="numeric"
                        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 pl-8 text-base font-semibold text-gray-800"
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>
                  </View>

                  {/* Description Input */}
                  <View>
                    <Text className="text-sm font-semibold text-gray-700 mb-2">Description</Text>
                    <TextInput
                      value={expenseData.description}
                      onChangeText={handleDescriptionChange}
                      placeholder="What did you spend on?"
                      multiline
                      numberOfLines={3}
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base text-gray-800"
                      placeholderTextColor="#9CA3AF"
                      textAlignVertical="top"
                    />
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row space-x-3 mt-8 mb-4">
                  <TouchableOpacity
                    onPress={() => setShowAddExpenseModal(false)}
                    className="flex-1 bg-gray-100 py-4 rounded-xl"
                  >
                    <Text className="text-gray-700 font-semibold text-center">Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={handleAddExpense}
                    disabled={isLoading}
                    className={`flex-1 py-4 rounded-xl ${
                      isLoading ? 'bg-gray-300' : 'bg-blue-500'
                    }`}
                  >
                    <Text className="text-white font-semibold text-center">
                      {isLoading ? 'Saving...' : 'Save Expense'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </ModalBackdrop>
      </Modal>
    </>
  );
};

export default QuickActions;