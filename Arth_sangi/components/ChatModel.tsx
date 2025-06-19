import { BlurView } from 'expo-blur';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Animated, Modal, Alert } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useUser } from '@/atoms/UserContext';
import { useAccount } from '@/atoms/AccountContext';
import { accountService } from '@/services/getAccount';

// Add your Gemini API key here
const GEMINI_API_KEY = "AIzaSyCcXsT36P3Uyxu-CCmG3VIXwFflPRUAU2A";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface UserFinancialData {
  age: number;
  dependents: number;
  currentBalance: number;
  accountType: string;
  monthlyIncome: number;
  disposableIncome: number;
  desiredSavings: number;
  firstname: string;
  lastname: string;
}

// Helper function to safely format numbers
const safeToLocaleString = (value: number | undefined | null): string => {
  if (typeof value === 'number' && !isNaN(value)) {
    return value.toLocaleString();
  }
  return '0';
};

// Helper function to safely perform calculations
const safeCalculate = (a: number | undefined | null, b: number | undefined | null, defaultValue: number = 0): number => {
  const numA = typeof a === 'number' && !isNaN(a) ? a : defaultValue;
  const numB = typeof b === 'number' && !isNaN(b) ? b : defaultValue;
  return numA - numB;
};

const ChatModal = () => {
  const { user } = useUser();
  const { account } = useAccount();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userFinancialData, setUserFinancialData] = useState<UserFinancialData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Load user financial data when modal opens
  useEffect(() => {
    if (isVisible && user?.token && !userFinancialData) {
      loadUserFinancialData();
    }
  }, [isVisible, user?.token]);

  // Use account context data if available
  useEffect(() => {
    if (account && account.userId) {
      const financialData: UserFinancialData = {
        age: account.age || 0,
        dependents: account.dependents || 0,
        currentBalance: account.current_balance || 0,
        accountType: account.account_type || 'N/A',
        monthlyIncome: account.monthly_income || 0,
        disposableIncome: account.disposable_amount || 0,
        desiredSavings: account.desired_savings || 0,
        firstname: account.firstname || 'User',
        lastname: account.lastname || '',
      };
      setUserFinancialData(financialData);
    }
  }, [account]);

  const loadUserFinancialData = async () => {
    if (!user?.token) return;
    
    setIsLoadingData(true);
    try {
      const accountData = await accountService.getAccount(user.token);
      if (accountData && accountData.length > 0) {
        const latestAccount = accountData[0]; // Get the first/latest account
        const financialData: UserFinancialData = {
          age: latestAccount.age || 0,
          dependents: latestAccount.dependents || 0,
          currentBalance: latestAccount.current_balance || 0,
          accountType: latestAccount.account_type || 'N/A',
          monthlyIncome: latestAccount.monthly_income || 0,
          disposableIncome: latestAccount.disposable_amount || 0,
          desiredSavings: latestAccount.desired_savings || 0,
          firstname: latestAccount.firstname || user.firstname || 'User',
          lastname: latestAccount.lastname || user.lastname || '',
        };
        setUserFinancialData(financialData);
      }
    } catch (error) {
      console.error('Error loading financial data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Enhanced system instruction with user financial data
  const getSystemInstruction = (financialData: UserFinancialData | null) => {
    const baseInstruction = `You are a helpful AI financial assistant specialized in providing personalized financial advice and insights.`;
    
    if (!financialData) {
      return `${baseInstruction} 
      
Your role is to:
1. Provide accurate and helpful financial advice
2. Answer questions about personal finance, investments, budgeting, and financial planning
3. Be professional, friendly, and easy to understand
4. Always remind users to consult with qualified financial professionals for major financial decisions
5. Keep responses concise but informative
6. Ask clarifying questions when needed to provide better assistance

The user hasn't provided their financial data yet. Encourage them to create an account or provide financial information for more personalized advice.`;
    }

    // Safely calculate derived values
    const monthlyExpenses = safeCalculate(financialData.monthlyIncome, financialData.disposableIncome);
    const savingsRate = financialData.monthlyIncome > 0 
      ? ((financialData.desiredSavings || 0) / financialData.monthlyIncome) * 100 
      : 0;
    const expenseRatio = financialData.monthlyIncome > 0 
      ? (monthlyExpenses / financialData.monthlyIncome) * 100 
      : 0;

    return `${baseInstruction}

**USER'S FINANCIAL PROFILE:**
- Name: ${financialData.firstname} ${financialData.lastname}
- Age: ${financialData.age} years old
- Dependents: ${financialData.dependents}
- Account Type: ${financialData.accountType}
- Current Balance: Rs${safeToLocaleString(financialData.currentBalance)}
- Monthly Income: Rs${safeToLocaleString(financialData.monthlyIncome)}
- Monthly Expenses: Rs${safeToLocaleString(monthlyExpenses)}
- Disposable Income: Rs${safeToLocaleString(financialData.disposableIncome)}
- Desired Monthly Savings: Rs${safeToLocaleString(financialData.desiredSavings)}
- Current Savings Rate: ${savingsRate.toFixed(1)}%
- Expense Ratio: ${expenseRatio.toFixed(1)}%

**YOUR ENHANCED ROLE:**
1. Provide PERSONALIZED financial advice based on their specific financial situation
2. Analyze their spending patterns, savings goals, and financial health
3. Offer specific recommendations for improving their financial position
4. Compare their financial metrics to recommended benchmarks
5. Suggest budget optimizations based on their income and expenses
6. Recommend investment strategies suitable for their age, income, and goals
7. Provide insights on emergency fund adequacy (recommend 3-6 months of expenses)
8. Help them track progress toward their desired savings goal
9. Alert them to potential financial risks or opportunities
10. Always reference their actual numbers when giving advice

**FINANCIAL INSIGHTS TO CONSIDER:**
- Emergency Fund Status: Current balance vs. recommended 3-6 months of expenses ($${safeToLocaleString(monthlyExpenses * 3)} - $${safeToLocaleString(monthlyExpenses * 6)})
- Savings Goal Achievement: Whether their desired savings ($${safeToLocaleString(financialData.desiredSavings)}) is realistic given their disposable income ($${safeToLocaleString(financialData.disposableIncome)})
- Age-appropriate financial planning strategies
- Dependent-related financial considerations

Always be encouraging, specific, and actionable in your advice. Reference their actual financial numbers to make recommendations more meaningful and personal.`;
  };

  const toggleModal = () => {
    if (!isVisible) {
      setIsVisible(true);
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start(() => {
        setIsVisible(false);
      });
    }
  };

  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const systemInstruction = getSystemInstruction(userFinancialData);

      const requestBody = {
        contents: [
          // Add system instruction as the first message
          {
            role: 'user',
            parts: [{ text: systemInstruction }]
          },
          {
            role: 'model',
            parts: [{ text: `Hello ${userFinancialData?.firstname || 'there'}! I'm your AI financial assistant and I have access to your financial profile. I can provide personalized advice based on your specific financial situation. How can I help you today?` }]
          },
          // Add conversation history
          ...conversationHistory,
          // Add current user message
          {
            role: 'user',
            parts: [{ text: userMessage }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      };

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Unexpected response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (message.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage('');
    setIsTyping(true);

    // Auto-scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      // Call Gemini API
      const aiResponse = await callGeminiAPI(currentMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Auto-scroll to bottom after bot response
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setIsTyping(false);
      
      // Show error message to user
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please check your internet connection and try again.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      // Auto-scroll to bottom after error message
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const getQuickInsights = () => {
    if (!userFinancialData) return [];
    
    const monthlyExpenses = safeCalculate(userFinancialData.monthlyIncome, userFinancialData.disposableIncome);
    const savingsRate = userFinancialData.monthlyIncome > 0 
      ? ((userFinancialData.desiredSavings || 0) / userFinancialData.monthlyIncome) * 100 
      : 0;
    
    return [
      `📊 Analyze my financial health`,
      `💰 How can I improve my ${savingsRate.toFixed(1)}% savings rate?`,
      `🚨 Is my emergency fund of $${safeToLocaleString(userFinancialData.currentBalance)} adequate?`,
      `📈 Investment suggestions for my age (${userFinancialData.age})`
    ];
  };

  const handleQuickInsight = (insight: string) => {
    setMessage(insight.substring(2)); // Remove emoji prefix
  };

  const TypingIndicator = () => (
    <View className="items-start mb-3">
      <View className="bg-gray-200 rounded-2xl rounded-tl-md px-4 py-3">
        <View className="flex-row items-center space-x-1">
          <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
          <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </View>
      </View>
    </View>
  );

  return (
    <>
      {/* Trigger Button */}
      <TouchableOpacity
        onPress={toggleModal}
        className="absolute bottom-6 right-6 w-16 h-16 bg-gray-100 rounded-full items-center justify-center shadow-xl"
        style={{
          shadowColor: '#8B5CF6',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <IconSymbol name="assistant" size={22} color="#8300FF" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <BlurView intensity={6} tint="light" style={{ flex: 1 }}>
          <View className="flex-1 bg-black/20 justify-center items-center p-4">
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              className="w-full max-w-sm"
            >
              <Animated.View
                style={[
                  {
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [300, 0],
                        }),
                      },
                      {
                        scale: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.9, 1],
                        }),
                      },
                    ],
                    opacity: slideAnim,
                  },
                  {
                    height: 500,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    elevation: 20,
                  }
                ]}
                className="bg-white rounded-3xl overflow-hidden shadow-2xl"
              >
                {/* Header */}
                <View className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4" style={{ backgroundColor: '#8B5CF6' }}>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
                        <IconSymbol name="assistant" size={20} color="white" />
                      </View>
                      <View>
                        <Text className="text-white text-lg font-bold">
                          {userFinancialData ? `Hi ${userFinancialData.firstname}!` : 'AI Financial Assistant'}
                        </Text>
                        <Text className="text-white/70 text-xs">
                          {userFinancialData ? 'Personalized Insights Ready' : 'Powered by Gemini'}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={toggleModal} className="w-8 h-8 bg-white/20 rounded-full items-center justify-center">
                      <IconSymbol name="close" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Messages */}
                <ScrollView 
                  ref={scrollViewRef}
                  className="flex-1 px-4 py-4"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 8 }}
                >
                  {messages.length === 0 && !isLoadingData && (
                    <View className="items-center justify-center py-4">
                      <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4">
                        <IconSymbol name="assistant" size={24} color="#8B5CF6" />
                      </View>
                      {userFinancialData ? (
                        <>
                          <Text className="text-gray-700 text-center font-medium mb-2">
                            Welcome back, {userFinancialData.firstname}!
                          </Text>
                          <Text className="text-gray-500 text-center text-sm mb-4">
                            I have access to your financial profile and can provide personalized insights based on your income, expenses, and goals.
                          </Text>
                          
                          {/* Quick Insights */}
                          <Text className="text-gray-600 text-sm font-medium mb-2">Quick Insights:</Text>
                          {getQuickInsights().map((insight, index) => (
                            <TouchableOpacity
                              key={index}
                              onPress={() => handleQuickInsight(insight)}
                              className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 mb-2 w-full"
                            >
                              <Text className="text-purple-700 text-xs text-center">{insight}</Text>
                            </TouchableOpacity>
                          ))}
                        </>
                      ) : (
                        <>
                          <Text className="text-gray-500 text-center text-sm">
                            Hello! I'm your AI financial assistant powered by Gemini. 
                          </Text>
                          <Text className="text-gray-500 text-center text-sm mt-2">
                            Create an account to get personalized financial insights based on your data!
                          </Text>
                        </>
                      )}
                    </View>
                  )}

                  {isLoadingData && (
                    <View className="items-center justify-center py-8">
                      <Text className="text-gray-500 text-center">Loading your financial data...</Text>
                    </View>
                  )}
                  
                  {messages.map(msg => (
                    <View
                      key={msg.id}
                      className={`mb-4 ${msg.isUser ? 'items-end' : 'items-start'}`}
                    >
                      <View
                        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                          msg.isUser 
                            ? 'rounded-tr-md' 
                            : 'bg-gray-100 rounded-tl-md'
                        }`}
                        style={msg.isUser ? { backgroundColor: '#8B5CF6' } : {}}
                      >
                        <Text className={`text-base ${msg.isUser ? 'text-white' : 'text-gray-800'}`}>
                          {msg.text}
                        </Text>
                        <Text className={`text-xs mt-1 ${msg.isUser ? 'text-white/70' : 'text-gray-500'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                      </View>
                    </View>
                  ))}
                  
                  {isTyping && <TypingIndicator />}
                </ScrollView>

                {/* Input Area */}
                <View className="px-4 pb-4 pt-2 border-t border-gray-100">
                  <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-2">
                    <TextInput
                      className="flex-1 text-base text-gray-800 py-2"
                      placeholder={userFinancialData ? "Ask about your finances..." : "Ask me about finances..."}
                      placeholderTextColor="#9CA3AF"
                      value={message}
                      onChangeText={setMessage}
                      onSubmitEditing={handleSend}
                      multiline
                      maxLength={500}
                    />
                    <TouchableOpacity
                      onPress={handleSend}
                      disabled={message.trim() === '' || isTyping}
                      className={`ml-2 w-10 h-10 rounded-full items-center justify-center`}
                      style={{ 
                        backgroundColor: (message.trim() === '' || isTyping) ? '#D1D5DB' : '#8B5CF6'
                      }}
                    >
                      <IconSymbol 
                        name="send" 
                        size={18} 
                        color={(message.trim() === '' || isTyping) ? '#9CA3AF' : 'white'} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            </KeyboardAvoidingView>
          </View>
        </BlurView>
      </Modal>
    </>
  );
};

export default ChatModal;