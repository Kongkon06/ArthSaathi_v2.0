import React, { useState, useRef, useEffect } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Animated,
    RefreshControl,
    Modal,
    Alert,
    Platform,
} from 'react-native';
//import { BlurView } from 'expo-blur';
import { LineChart, PieChart } from 'react-native-chart-kit';
import StatCard from '@/components/StatCard';
import ChatModal from '@/components/ChatModel';
import QuickActions from '@/components/QuickActions';
import { useUser } from '@/atoms/UserContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { accountService } from '@/services/getAccount';
import { expenseService, Expense } from '@/services/expenseService';
import { Account, useAccount } from '@/atoms/AccountContext';

const screenWidth = Dimensions.get('window').width;

// Enhanced chart data with multiple datasets
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [45000, 48000, 52000, 49000, 51000, 55000],
      color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
      strokeWidth: 3,
    },
    {
      data: [30000, 32000, 35000, 33000, 36000, 38000],
      color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
      strokeWidth: 2,
    },
  ],
  legend: ['Investment', 'Expenses'],
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
    fontSize: 11,
    fill: '#64748B',
  },
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: '#F1F5F9',
  },
};

export default function PremiumFinancialDashboard() {
  const { user } = useUser();
  const { account, setAccount } = useAccount();
  const [selectedPeriod, setSelectedPeriod] = useState('Last 6 months');
  const [refreshing, setRefreshing] = useState(false);
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [showExpenseBreakdown, setShowExpenseBreakdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [pressedStat, setPressedStat] = useState<string | null>(null);
  
  // Expense related state
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenseChartData, setExpenseChartData] = useState<any[]>([]);
  const [loadingExpenses, setLoadingExpenses] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const periods = ['Last 7 days', 'Last month', 'Last 3 months', 'Last 6 months', 'Last year'];

  const notifications = [
    { id: '1', title: 'Investment Update', message: 'Your SIP investment has been processed successfully', time: '2 hours ago' },
    { id: '2', title: 'Expense Alert', message: 'You have exceeded your monthly dining budget', time: '5 hours ago' },
    { id: '3', title: 'Goal Achievement', message: 'Congratulations! You reached your vacation savings goal', time: '1 day ago' },
  ];

  const fetchAccount = async () => {
    try {
      const userAccount: Account = await accountService.getAccount(user.token);
      setAccount(userAccount);
    } catch (error) {
      console.error('Error fetching account:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      setLoadingExpenses(true);
      const userExpenses = await expenseService.getUserExpenses(user.id, user.token, 'monthly');
      setExpenses(userExpenses);
      
      // Calculate total expenses
      const total = expenseService.calculateTotalExpenses(userExpenses);
      setTotalExpenses(total);
      
      // Format data for pie chart
      const chartData = expenseService.formatExpenseDataForChart(userExpenses);
      setExpenseChartData(chartData);
      
    } catch (error) {
      console.error('Error fetching expenses:', error);
      Alert.alert('Error', 'Failed to fetch expenses');
    } finally {
      setLoadingExpenses(false);
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
    
    fetchAccount();
    fetchExpenses();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    Promise.all([fetchAccount(), fetchExpenses()]).finally(() => {
      setRefreshing(false);
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const calculateSavingsRate = () => {
    const balance = account?.current_balance
      ? parseFloat(String(account.current_balance).replace(/[₹,]/g, ''))
      : 0;
    if (balance > 0 && totalExpenses > 0) {
      const savingsRate = ((balance / (balance + totalExpenses)) * 100).toFixed(1);
      return `${savingsRate}%`;
    }
    return '0%';
  };

  type QuickAction = {
    id: string;
    title: string;
    icon: string;
    color: string;
    bgColor: string;
  };

  type Notification = {
    id: string;
    title: string;
    message: string;
    time: string;
  };

  const NotificationItem: React.FC<{ item: Notification }> = ({ item }) => (
    <View className="p-4 bg-gray-50 rounded-xl mb-3">
      <Text className="font-semibold text-gray-800 mb-1">{item.title}</Text>
      <Text className="text-sm text-gray-600 mb-2">{item.message}</Text>
      <Text className="text-xs text-gray-400">{item.time}</Text>
    </View>
  );

  // Enhanced Modal Backdrop with Blur Effect
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

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} className="bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      <ScrollView 
        className="flex-1 px-5 pt-2" 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Premium Header with Notification */}
        <Animated.View 
          style={{ 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }] 
          }}
          className="flex-row items-start justify-between mb-8 mt-4"
        >
          <View style={{flex: 1, minWidth: 0}}>
            <View className="flex-row items-center mb-2 flex-wrap">
              <Text className="text-2xl font-bold text-gray-900 mr-2 flex-shrink" numberOfLines={2} ellipsizeMode="tail">
                Hello {user.firstname}!
              </Text>
              <Text className="text-2xl">👋</Text>
            </View>
            <Text className="text-gray-600 text-base font-medium">
              Every small step brings you closer to your big dreams.
            </Text>
            <Text className="text-gray-400 text-sm mt-1">
              {formattedDate}
            </Text>
          </View>
          <View className="flex-row items-center space-x-3 ml-2" style={{flexShrink: 0}}>
            {/* Notification Bell */}
            <TouchableOpacity 
              onPress={() => setShowNotifications(true)}
              className="w-12 h-12 items-center justify-center "
            >
              <IconSymbol name="bell-outline" size={20} color="#3B82F6" />
            </TouchableOpacity>
            {/* Profile */}
            <TouchableOpacity className="w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-sm">
              <IconSymbol name="account-settings" size={20} color="#27283A" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Stats Cards */}
        <View className="mb-2">
          <StatCard
            icon="wallet"
            title="Total Balance"
            amount={account?.current_balance ?? '₹0'}
            change="10.2%"
            changeColor="text-green-600"
            bgColor="bg-blue-100"
            isMain={pressedStat === 'Total Balance'}
            onPressIn={() => setPressedStat('Total Balance')}
            onPressOut={() => setPressedStat(null)}
          />
          <View className="flex-row justify-between">
            <View className="flex-1 mr-2">
              <StatCard
                icon="cash"
                title="Monthly Expenses"
                amount={formatCurrency(totalExpenses)}
                change="5.2%"
                changeColor="text-red-500"
                bgColor="bg-red-100"
                isMain={pressedStat === 'Monthly Expenses'}
                onPress={() => setShowExpenseBreakdown(true)}
                onPressIn={() => setPressedStat('Monthly Expenses')}
                onPressOut={() => setPressedStat(null)}
              />
            </View>
            <View className="flex-1 ml-2">
              <StatCard
                icon="safe"
                title="Savings Rate"
                amount={calculateSavingsRate()}
                change="20.5%"
                changeColor="text-green-600"
                bgColor="bg-green-100"
                isMain={pressedStat === 'Savings Rate'}
                onPressIn={() => setPressedStat('Savings Rate')}
                onPressOut={() => setPressedStat(null)}
              />
            </View>
          </View>
        </View>

        {/* Quick Actions Component */}
        <QuickActions />

        {/* Enhanced Financial Overview */}
        <Animated.View 
          style={{ opacity: fadeAnim }}
          className="bg-white rounded-2xl p-6 mb-6 shadow-sm"
        >
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900 mb-1">
                Financial Overview
              </Text>
              <Text className="text-gray-500 text-sm">
                Track your Investments vs Expenses over time
              </Text>
            </View>
            
            <TouchableOpacity 
              onPress={() => setShowPeriodModal(true)}
              className="bg-gray-50 px-4 py-2 rounded-lg flex-row items-center border border-gray-200"
            >
              <Text className="text-sm text-gray-700 mr-2 font-medium">{selectedPeriod}</Text>
              <View className="w-4 h-4 items-center justify-center">
                <Text className="text-gray-400 text-xs">▼</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="items-center">
            <LineChart
              data={chartData}
              width={screenWidth - 70}
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
              withShadow={false}
            />
          </View>
        </Animated.View>

        <View className="h-6" />
      </ScrollView>

      {/* Modern AI Assistant Button */}
      <Animated.View 
        style={{ 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }] 
        }}
        className="absolute bottom-6 right-5"
      >
        <ChatModal />
      </Animated.View>

      {/* Notifications Modal with Blur Effect */}
      <Modal
        visible={showNotifications}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowNotifications(false)}
      >
        <ModalBackdrop>
          <View className="flex-1 justify-end">
            <View className="bg-white rounded-t-3xl p-6 min-h-[400px]" style={{ 
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 8,
            }}>
              <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-xl font-bold text-gray-900">Notifications</Text>
                <TouchableOpacity onPress={() => setShowNotifications(false)}>
                  <Text className="text-blue-500 font-semibold">Close</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView showsVerticalScrollIndicator={false}>
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} item={notification} />
                ))}
              </ScrollView>
            </View>
          </View>
        </ModalBackdrop>
      </Modal>

      {/* Period Selection Modal with Blur Effect */}
      <Modal
        visible={showPeriodModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPeriodModal(false)}
      >
        <ModalBackdrop>
          <View className="flex-1 justify-end">
            <View className="bg-white rounded-t-3xl p-6 min-h-[300px]" style={{ 
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 8,
            }}>
              <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />
              <Text className="text-xl font-bold text-gray-900 mb-4">Select Time Period</Text>
              
              {periods.map((period) => (
                <TouchableOpacity
                  key={period}
                  onPress={() => {
                    setSelectedPeriod(period);
                    setShowPeriodModal(false);
                  }}
                  className={`p-4 rounded-xl mb-2 ${
                    selectedPeriod === period ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                  }`}
                >
                  <Text className={`font-semibold ${
                    selectedPeriod === period ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ModalBackdrop>
      </Modal>

      {/* Expense Breakdown Modal with Blur Effect */}
      <Modal
        visible={showExpenseBreakdown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowExpenseBreakdown(false)}
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
                <Text className="text-xl font-bold text-gray-900">Expense Breakdown</Text>
                <TouchableOpacity 
                  onPress={() => setShowExpenseBreakdown(false)}
                  className="w-8 h-8 items-center justify-center"
                >
                  <IconSymbol name="close" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
              
              <ScrollView showsVerticalScrollIndicator={false}>
                {loadingExpenses ? (
                  <View className="items-center py-8">
                    <Text className="text-gray-500">Loading expenses...</Text>
                  </View>
                ) : expenseChartData.length > 0 ? (
                  <>
                    {/* Total Expenses */}
                    <View className="bg-gray-50 rounded-xl p-4 mb-6">
                      <Text className="text-sm text-gray-600 mb-1">Total Monthly Expenses</Text>
                      <Text className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</Text>
                    </View>

                    {/* Pie Chart */}
                    <View className="items-center mb-6">
                      <PieChart
                        data={expenseChartData}
                        width={screenWidth - 80}
                        height={220}
                        chartConfig={{
                          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                      />
                    </View>

                    {/* Category Breakdown */}
                    <View className="space-y-3">
                      <Text className="text-lg font-semibold text-gray-900 mb-2">Category Details</Text>
                      {expenseChartData.map((item, index) => (
                        <View key={index} className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <View className="flex-row items-center">
                            <View 
                              className="w-4 h-4 rounded-full mr-3"
                              style={{ backgroundColor: item.color }}
                            />
                            <Text className="text-gray-800 font-medium">{item.name}</Text>
                          </View>
                          <Text className="text-gray-900 font-semibold">{formatCurrency(item.population)}</Text>
                        </View>
                      ))}
                    </View>
                  </>
                ) : (
                  <View className="items-center py-8">
                    <IconSymbol name="chart-pie" size={48} color="#D1D5DB" />
                    <Text className="text-gray-500 mt-4 text-center">No expenses recorded yet</Text>
                    <Text className="text-gray-400 text-sm mt-2 text-center">
                      Start adding expenses to see your breakdown
                    </Text>
                  </View>
                )}
              </ScrollView>
              
              <TouchableOpacity
                onPress={() => setShowExpenseBreakdown(false)}
                className="bg-blue-500 p-4 rounded-xl mt-6"
              >
                <Text className="text-white font-semibold text-center">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ModalBackdrop>
      </Modal>
    </SafeAreaView>
  );
}