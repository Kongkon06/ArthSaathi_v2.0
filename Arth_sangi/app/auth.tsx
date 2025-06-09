import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (isSignUp) {
      // Sign up validation
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters');
        return;
      }
      Alert.alert('Success', 'Account created successfully!');
    } else {
      // Sign in validation
      if (!formData.email || !formData.password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      Alert.alert('Success', 'Signed in successfully!');
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center px-6 py-8">
            {/* Header */}
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center mb-4 ">
                <Ionicons name="person" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-center">
                {isSignUp 
                  ? 'Sign up to get started with your account' 
                  : 'Sign in to continue to your account'
                }
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4">
              {/* Name Fields (Sign Up Only) */}
              {isSignUp && (
                <View className="flex-row space-x-3">
                  <View className="flex-1 mr-2">
                    <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      First Name
                    </Text>
                    <TextInput
                      value={formData.firstName}
                      onChangeText={(text) => handleInputChange('firstName', text)}
                      placeholder="Enter first name"
                      placeholderTextColor="#9CA3AF"
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 text-gray-900 dark:text-white text-base"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Last Name
                    </Text>
                    <TextInput
                      value={formData.lastName}
                      onChangeText={(text) => handleInputChange('lastName', text)}
                      placeholder="Enter last name"
                      placeholderTextColor="#9CA3AF"
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 text-gray-900 dark:text-white text-base"
                    />
                  </View>
                </View>
              )}

              {/* Email Field */}
              <View>
                <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Email Address
                </Text>
                <TextInput
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 text-gray-900 dark:text-white text-base"
                />
              </View>

              {/* Password Field */}
              <View>
                <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
                  Password
                </Text>
                <View className="relative">
                  <TextInput
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 pr-12 text-gray-900 dark:text-white text-base"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4"
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password Field (Sign Up Only) */}
              {isSignUp && (
                <View>
                  <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Confirm Password
                  </Text>
                  <View className="relative">
                    <TextInput
                      value={formData.confirmPassword}
                      onChangeText={(text) => handleInputChange('confirmPassword', text)}
                      placeholder="Confirm your password"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!showConfirmPassword}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 pr-12 text-gray-900 dark:text-white text-base"
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-4"
                    >
                      <Ionicons
                        name={showConfirmPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color="#9CA3AF"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Forgot Password (Sign In Only) */}
              {!isSignUp && (
                <TouchableOpacity className="self-end">
                  <Text className="text-blue-500 font-medium">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-blue-500 rounded-xl py-4 items-center mt-6 active:scale-95 transition-transform duration-150"
              >
                <Text className="text-white font-semibold text-lg">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <Text className="mx-4 text-gray-500 dark:text-gray-400">or</Text>
                <View className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </View>

              {/* Social Sign In Buttons */}
              <View className="space-y-3">
                <TouchableOpacity className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-4 flex-row items-center justify-center space-x-3 active:scale-95 transition-transform duration-150">
                  <Ionicons name="logo-google" size={20} color="#EA4335" />
                  <Text className="text-gray-900 dark:text-white font-medium">
                    Continue with Google
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-4 flex-row items-center justify-center space-x-3 active:scale-95 transition-transform duration-150">
                  <Ionicons name="logo-apple" size={20} color="#000000" />
                  <Text className="text-gray-900 dark:text-white font-medium">
                    Continue with Apple
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Toggle Auth Mode */}
              <View className="flex-row justify-center items-center mt-8">
                <Text className="text-gray-600 dark:text-gray-400">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </Text>
                <TouchableOpacity onPress={toggleAuthMode} className="ml-2">
                  <Text className="text-blue-500 font-semibold">
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}