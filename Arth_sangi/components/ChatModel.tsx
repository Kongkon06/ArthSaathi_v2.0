import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();

  const toggleModal = () => setIsVisible(!isVisible);

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

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! We'll get back to you soon.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Trigger Button */}
      <TouchableOpacity
        onPress={toggleModal}
        className="absolute bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full items-center justify-center shadow-lg"
      >
        <Text className="text-white text-xl">💬</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <BlurView intensity={50} tint="light" style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View className="flex-1 bg-black/50 bg-opacity-50 justify-end px-4">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={insets.bottom}
          >
            <View className="bg-white rounded-t-3xl h-2/3">
              {/* Header */}
              <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
                <Text className="text-lg font-bold">Chat Support</Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Text className="text-gray-500 text-lg">✕</Text>
                </TouchableOpacity>
              </View>

              {/* Messages */}
              <ScrollView 
                className="flex-1 p-4"
                contentContainerStyle={{ paddingBottom: 16 }}
                ref={ref => {
                  if (ref) {
                    setTimeout(() => ref.scrollToEnd({ animated: true }), 100);
                  }
                }}
              >
                {messages.map(msg => (
                  <View
                    key={msg.id}
                    className={`mb-3 ${msg.isUser ? 'items-end' : 'items-start'}`}
                  >
                    <View
                      className={`max-w-[80%] p-3 rounded-lg ${msg.isUser ? 'bg-blue-500 rounded-tr-none' : 'bg-gray-200 rounded-tl-none'}`}
                    >
                      <Text className={`${msg.isUser ? 'text-white' : 'text-gray-800'}`}>
                        {msg.text}
                      </Text>
                      <Text className={`text-xs mt-1 ${msg.isUser ? 'text-blue-200' : 'text-gray-500'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>

              {/* Input Area */}
              <View className="p-4 border-t border-gray-200 flex-row items-center">
                <TextInput
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2"
                  placeholder="Type your message..."
                  value={message}
                  onChangeText={setMessage}
                  onSubmitEditing={handleSend}
                />
                <TouchableOpacity
                  onPress={handleSend}
                  className="bg-blue-500 w-10 h-10 rounded-full items-center justify-center"
                >
                  <Text className="text-white text-lg">↑</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        </BlurView>
      </Modal>
    </>
  );
};

export default ChatModal;