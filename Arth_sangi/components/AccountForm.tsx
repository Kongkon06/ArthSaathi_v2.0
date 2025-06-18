import { useAccount } from "@/atoms/AccountContext";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { useUser } from '../atoms/UserContext';
import { accountService, AccountDetails } from '@/services/getAccount';

const CreateAccountModal = () => {
  const { user } = useUser();
  const {setAccount} = useAccount();
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    age: "25",
    dependents: "0",
    currentBalance: "5000.00",
    accountType: "Current",
    monthlyIncome: "5000.00",
    disposableIncome: "1000.00",
    desiredSavings: "500.00",
    setAsDefault: false,
  });

  const accountTypes = [
    "Current",
    "Savings"
  ];

  const assignAccount = useCallback(() => {
  const data: AccountDetails = {
    age: Number(formData.age),
    accountType: formData.accountType,
    currentBalance: Number(formData.currentBalance),
    dependents: Number(formData.dependents),
    desiredSavings: Number(formData.desiredSavings),
    disposableIncome: Number(formData.disposableIncome),
    monthlyIncome: Number(formData.monthlyIncome),
  };


  accountService
    .create(data, user.token)
    .then((response) => {
      console.log('Account created:', response);
    }).then((response)=>{
      setAccount({
        id:'',
        userId:user.id,
        firstname:user.firstname,
        lastname:user.lastname,
        age: Number(formData.age),
    account_type: formData.accountType,
    current_balance: Number(formData.currentBalance),
    dependents: Number(formData.dependents),
    desired_savings: Number(formData.desiredSavings),
    disposable_amount: Number(formData.disposableIncome),
    monthly_income: Number(formData.monthlyIncome),
      })
    })
    .catch((error) => {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to create account.');
    });
}, [formData, user.token]);
  const handleInputChange = (field: any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateAccount = () => {

   assignAccount()
    Alert.alert("Success", "Account created successfully!");
    setModalVisible(false);
  };

  const AccountTypeDropdown = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
      <View className="relative">
        <TouchableOpacity
          className="border border-gray-300 rounded-lg px-4 py-3 bg-white flex-row justify-between items-center"
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text className="text-gray-700">{formData.accountType}</Text>
          <Text className="text-gray-500">▼</Text>
        </TouchableOpacity>

        {showDropdown && (
          <View className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 z-10">
            {accountTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                className="px-4 py-3 border-b border-gray-200"
                onPress={() => {
                  handleInputChange("accountType", type);
                  setShowDropdown(false);
                }}
              >
                <Text className="text-gray-700">{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View className=" bg-gray-100">
      {/* Trigger Button */}
      <View className="mb-6 text-center">
        <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
          Start Your Financial Journey
        </Text>
        <Text className="text-gray-600 text-center text-base leading-6 mb-1">
          Take control of your finances and build a secure future.
        </Text>
        <Text className="text-gray-600 text-center text-base leading-6">
          Create your account in just a few simple steps!
        </Text>
      </View>

      {/* Benefits Section */}
      <View className="mb-6">
        <View className="flex-row items-center mb-3">
          <View className="w-2 h-2 bg-green-500 rounded-full mr-3"></View>
          <Text className="text-gray-700 flex-1">Track your savings and expenses effortlessly</Text>
        </View>
        <View className="flex-row items-center mb-3">
          <View className="w-2 h-2 bg-green-500 rounded-full mr-3"></View>
          <Text className="text-gray-700 flex-1">Set and achieve your financial goals</Text>
        </View>
        <View className="flex-row items-center mb-3">
          <View className="w-2 h-2 bg-green-500 rounded-full mr-3"></View>
          <Text className="text-gray-700 flex-1">Get personalized insights and recommendations</Text>
        </View>
      </View>

      {/* CTA Button */}
      <TouchableOpacity className="bg-blue-600 rounded-xl p-4 flex-row items-center justify-center mb-4"
      onPress={() => setModalVisible(true)}>
        <Text className="text-white text-lg mr-2">+</Text>
        <Text className="text-white font-bold text-base">Create Account</Text>
      </TouchableOpacity>

      {/* Additional Encouragement */}
      <Text className="text-center text-sm text-gray-500">
        Join thousands of users already managing their finances smarter
      </Text>
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg w-11/12 max-h-5/6">
            {/* Header */}
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-xl font-semibold text-gray-800">
                Create New Account
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="p-2"
              >
                <Text className="text-gray-500 text-xl">✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="p-4">
              <Text className="text-gray-600 mb-6">
                Fill in the details to create a new account.
              </Text>

              {/* Age and Dependents */}
              <View className="flex-row space-x-4 mb-4">
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">User's Age</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={formData.age}
                    onChangeText={(value) => handleInputChange("age", value)}
                    keyboardType="numeric"
                    placeholder="Enter age"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">
                    Number of Dependents
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={formData.dependents}
                    onChangeText={(value) =>
                      handleInputChange("dependents", value)
                    }
                    keyboardType="numeric"
                    placeholder="Enter number"
                  />
                </View>
              </View>

              {/* Current Balance and Account Type */}
              <View className="flex-row space-x-4 mb-4">
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">
                    Current Balance
                  </Text>
                  <View className="flex-row items-center border border-gray-300 rounded-lg bg-white">
                    <Text className="px-3 text-gray-700">$</Text>
                    <TextInput
                      className="flex-1 py-3 pr-4"
                      value={formData.currentBalance}
                      onChangeText={(value) =>
                        handleInputChange("currentBalance", value)
                      }
                      keyboardType="numeric"
                      placeholder="0.00"
                    />
                  </View>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">
                    Account Type
                  </Text>
                  <AccountTypeDropdown />
                </View>
              </View>

              {/* Monthly Income */}
              <View className="mb-4">
                <Text className="text-gray-700 font-medium mb-2">
                  Monthly Income
                </Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg bg-white">
                  <Text className="px-3 text-gray-700">$</Text>
                  <TextInput
                    className="flex-1 py-3 pr-4"
                    value={formData.monthlyIncome}
                    onChangeText={(value) =>
                      handleInputChange("monthlyIncome", value)
                    }
                    keyboardType="numeric"
                    placeholder="0.00"
                  />
                </View>
              </View>

              {/* Disposable Income and Desired Savings */}
              <View className="flex-row space-x-4 mb-4">
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">
                    Disposable Income
                  </Text>
                  <View className="flex-row items-center border border-gray-300 rounded-lg bg-white">
                    <Text className="px-3 text-gray-700">$</Text>
                    <TextInput
                      className="flex-1 py-3 pr-4"
                      value={formData.disposableIncome}
                      onChangeText={(value) =>
                        handleInputChange("disposableIncome", value)
                      }
                      keyboardType="numeric"
                      placeholder="0.00"
                    />
                  </View>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">
                    Desired Monthly Savings
                  </Text>
                  <View className="flex-row items-center border border-gray-300 rounded-lg bg-white">
                    <Text className="px-3 text-gray-700">₹</Text>
                    <TextInput
                      className="flex-1 py-3 pr-4"
                      value={formData.desiredSavings}
                      onChangeText={(value) =>
                        handleInputChange("desiredSavings", value)
                      }
                      keyboardType="numeric"
                      placeholder="0.00"
                    />
                  </View>
                </View>
              </View>

              {/* Set as Default Account */}
              <TouchableOpacity
                className="flex-row items-center mb-6 p-4 border border-gray-300 rounded-lg"
                onPress={() =>
                  handleInputChange("setAsDefault", !formData.setAsDefault)
                }
              >
                <View
                  className={`w-5 h-5 border-2 border-gray-400 rounded mr-3 ${
                    formData.setAsDefault ? "bg-blue-500" : "bg-white"
                  }`}
                >
                  {formData.setAsDefault && (
                    <Text className="text-white text-xs text-center">✓</Text>
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium">
                    Set as Default Account
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    This account will be used for primary transactions
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Action Buttons */}
              <View className="flex-row space-x-4">
                <TouchableOpacity
                  className="flex-1 border border-gray-300 rounded-lg py-3"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-center text-gray-700 font-medium">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-blue-500 rounded-lg py-3"
                  onPress={handleCreateAccount}
                >
                  <Text className="text-center text-white font-medium">
                    Create Account
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateAccountModal;
