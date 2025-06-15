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
    firstName: "John",
    lastName: "Doe",
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
    firstName: formData.firstName,
    lastName: formData.lastName,
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
    // Validate required fields
    if (!formData.firstName || !formData.lastName) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

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
      <TouchableOpacity className="bg-blue-600 rounded-xl p-4 flex-row items-center justify-center mb-4"
      onPress={() => setModalVisible(true)}>
        <Text className="text-white text-lg mr-2">+</Text>
        <Text className="text-white font-bold text-base">Create Account</Text>
      </TouchableOpacity>

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

              {/* Name Fields */}
              <View className="flex-row space-x-4 mb-4">
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">
                    First Name
                  </Text>
                  <TextInput
                    className="border-2 border-gray-800 rounded-lg px-4 py-3 bg-white"
                    value={formData.firstName}
                    onChangeText={(value) =>
                      handleInputChange("firstName", value)
                    }
                    placeholder="Enter first name"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">
                    Last Name
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white"
                    value={formData.lastName}
                    onChangeText={(value) =>
                      handleInputChange("lastName", value)
                    }
                    placeholder="Enter last name"
                  />
                </View>
              </View>

              {/* Age and Dependents */}
              <View className="flex-row space-x-4 mb-4">
                <View className="flex-1">
                  <Text className="text-gray-700 font-medium mb-2">Age</Text>
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
