import React, { useCallback, useState, useEffect } from 'react';
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
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import auth from '@/services/userAuth';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useUser } from '@/atoms/UserContext';

const { width } = Dimensions.get('window');

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstname?: string;
  lastname?: string;
}

export default function AuthPage() {
  const { setUser } = useUser();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Determine initial mode from params or default to sign in
  const [isSignUp, setIsSignUp] = useState(params.mode === 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
  });

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength validation
  const validatePassword = (password: string): { isValid: boolean; message?: string } => {
    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters' };
    }
    return { isValid: true };
  };

  // Name validation
  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  // Real-time validation
  const validateField = (field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'email':
        if (!value) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email';
        break;
      case 'password':
        if (!value) return 'Password is required';
        const passwordValidation = validatePassword(value);
        if (!passwordValidation.isValid) return passwordValidation.message;
        break;
      case 'confirmPassword':
        if (isSignUp) {
          if (!value) return 'Please confirm your password';
          if (value !== formData.password) return 'Passwords do not match';
        }
        break;
      case 'firstname':
        if (isSignUp) {
          if (!value) return 'First name is required';
          if (!validateName(value)) return 'First name must be at least 2 characters';
        }
        break;
      case 'lastname':
        if (isSignUp) {
          if (!value) return 'Last name is required';
          if (!validateName(value)) return 'Last name must be at least 2 characters';
        }
        break;
    }
    return undefined;
  };

  const assignUserDetails = useCallback(({ token , user }: { token: string, user?:any }) => {
    setUser({
      id: user.id ?? '', // This should come from the auth response
      firstname: formData.firstname || user.firstname,
      lastname: formData.lastname || user.lastname,
      email: formData.email,
      password: formData.password,
      phoneNumber: '',
      address: '',
      token:token
    });
  }, [formData, setUser]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }

    // Real-time validation for password confirmation
    if (field === 'password' && formData.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate all required fields
    const fieldsToValidate: (keyof FormData)[] = isSignUp 
      ? ['firstname', 'lastname', 'email', 'password', 'confirmPassword']
      : ['email', 'password'];

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      if (isSignUp) {
        const res = await auth({ userDetails: { ...formData }, type: "SignUp" });
        assignUserDetails({ token: res.token });
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => router.replace('/(tabs)/dashboard') }
        ]);
      } else {
        const res = await auth({ userDetails: { ...formData }, type: "Login" });
        assignUserDetails({ token: res.accessToken, user: res.user });
        Alert.alert('Success', 'Login successful!', [
          { text: 'OK', onPress: () => router.replace('/(tabs)/dashboard') }
        ]);
      }
    } catch (error) {
      console.error('Auth error:', error);
      Alert.alert(
        'Error', 
        error instanceof Error ? error.message : 'Authentication failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstname: '',
      lastname: '',
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      Alert.alert('Email Required', 'Please enter your email address first.');
      return;
    }
    if (!validateEmail(formData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    Alert.alert('Reset Link Sent', 'Password reset link has been sent to your email.');
  };

  const getPasswordStrengthColor = (password: string): string => {
    if (password.length === 0) return '#E5E7EB';
    if (password.length < 6) return '#EF4444';
    if (password.length < 8) return '#F59E0B';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return '#F59E0B';
    return '#10B981';
  };

  const renderInput = (
    field: keyof FormData,
    placeholder: string,
    options: {
      secure?: boolean;
      keyboardType?: any;
      autoCapitalize?: any;
      showToggle?: boolean;
      toggleValue?: boolean;
      onToggle?: () => void;
    } = {}
  ) => (
    <View>
      <Text className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
        {placeholder}
      </Text>
      <View className="relative">
        <TextInput
          value={formData[field]}
          onChangeText={(text) => handleInputChange(field, text)}
          placeholder={`Enter ${placeholder.toLowerCase()}`}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={options.secure && !options.toggleValue}
          keyboardType={options.keyboardType}
          autoCapitalize={options.autoCapitalize}
          className={`bg-white dark:bg-gray-800 border ${
            errors[field] ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
          } rounded-xl px-4 py-4 ${options.showToggle ? 'pr-12' : ''} text-gray-900 dark:text-white text-base`}
        />
        {options.showToggle && (
          <TouchableOpacity
            onPress={options.onToggle}
            className="absolute right-4 top-4"
          >
            <Ionicons
              name={options.toggleValue ? 'eye-off' : 'eye'}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
      {errors[field] && (
        <Text className="text-red-500 text-sm mt-1 ml-1">{errors[field]}</Text>
      )}
      {field === 'password' && formData.password && isSignUp && (
        <View className="mt-2">
          <View className="flex-row items-center space-x-1">
            <View className="flex-1 h-1 bg-gray-200 rounded">
              <View 
                className="h-full rounded"
                style={{ 
                  backgroundColor: getPasswordStrengthColor(formData.password),
                  width: `${Math.min((formData.password.length / 12) * 100, 100)}%`
                }}
              />
            </View>
          </View>
          <Text className="text-xs text-gray-500 mt-1">
            Use 8+ characters with uppercase, lowercase & numbers
          </Text>
        </View>
      )}
    </View>
  );

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
          <Animated.View 
            className="flex-1 justify-center px-6 py-8"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute top-4 left-6 z-10 w-10 h-10 bg-white dark:bg-gray-800 rounded-full items-center justify-center shadow-sm"
            >
              <Ionicons name="arrow-back" size={20} color="#6B7280" />
            </TouchableOpacity>

            {/* Header */}
            <View className="items-center mb-8 mt-12">
              <View className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full items-center justify-center mb-4 shadow-lg">
                <Ionicons name="person" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </Text>
              <Text className="text-gray-600 dark:text-gray-400 text-center">
                {isSignUp 
                  ? 'Join ArthSaathi and start your financial journey' 
                  : 'Sign in to continue your financial planning'
                }
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-4">
              {/* Name Fields (Sign Up Only) */}
              {isSignUp && (
                <View className="flex-row space-x-3">
                  <View className="flex-1 mr-2">
                    {renderInput('firstname', 'First Name', { autoCapitalize: 'words' })}
                  </View>
                  <View className="flex-1">
                    {renderInput('lastname', 'Last Name', { autoCapitalize: 'words' })}
                  </View>
                </View>
              )}

              {/* Email Field */}
              {renderInput('email', 'Email Address', { 
                keyboardType: 'email-address', 
                autoCapitalize: 'none' 
              })}

              {/* Password Field */}
              {renderInput('password', 'Password', {
                secure: true,
                showToggle: true,
                toggleValue: showPassword,
                onToggle: () => setShowPassword(!showPassword),
              })}

              {/* Confirm Password Field (Sign Up Only) */}
              {isSignUp && renderInput('confirmPassword', 'Confirm Password', {
                secure: true,
                showToggle: true,
                toggleValue: showConfirmPassword,
                onToggle: () => setShowConfirmPassword(!showConfirmPassword),
              })}

              {/* Forgot Password (Sign In Only) */}
              {!isSignUp && (
                <TouchableOpacity onPress={handleForgotPassword} className="self-end">
                  <Text className="text-blue-500 font-medium">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isLoading}
                className={`rounded-xl py-4 items-center mt-6 ${
                  isLoading 
                    ? 'bg-gray-400' 
                    : 'bg-blue-500 active:scale-95'
                } transition-transform duration-150`}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text className="text-white font-semibold text-lg">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Text>
                )}
              </TouchableOpacity>

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
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}