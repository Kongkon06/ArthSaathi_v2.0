import { BlurView } from 'expo-blur';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Animated, Modal } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';


interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

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

  const handleSend = () => {
    if (message.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Auto-scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! I'm here to help you with your financial questions. How can I assist you today?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Auto-scroll to bottom after bot response
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 2000);
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
        <BlurView intensity={20} tint="light" style={{ flex: 1 }}>
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
                <View className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4"style={{ backgroundColor: '#8B5CF6' }}>
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
                        <IconSymbol name="assistant" size={20} color="white" />
                      </View>
                      <View>
                        <Text className="text-white text-lg font-bold">AI Assistant</Text>
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
                  {messages.length === 0 && (
                    <View className="items-center justify-center py-8">
                      <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4">
                        <IconSymbol name="assistant" size={24} color="#8B5CF6" />
                      </View>
                      <Text className="text-gray-500 text-center">
                        Hello! I'm your AI financial assistant. How can I help you today?
                      </Text>
                    </View>
                  )}
                  
                  {messages.map(msg => (
                    <View
                      key={msg.id}
                      className={`mb-4 ${msg.isUser ? 'items-end' : 'items-start'}` }
                    >
                      <View
                        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                          msg.isUser 
                            ? ' rounded-tr-md' 
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
                      placeholder="Type your message..."
                      placeholderTextColor="#9CA3AF"
                      value={message}
                      onChangeText={setMessage}
                      onSubmitEditing={handleSend}
                      multiline
                      maxLength={500}
                     
                      
                    />
                    <TouchableOpacity
                      onPress={handleSend}
                      disabled={message.trim() === ''}
                       className={`ml-2 w-10 h-10 rounded-full items-center justify-center`}
                      style={{ 
                        backgroundColor: message.trim() === '' ? '#D1D5DB' : '#8B5CF6'
                      }}
                    >
                      <IconSymbol 
                        name="send" 
                        size={18} 
                        color={message.trim() === '' ? '#9CA3AF' : 'white'} 
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