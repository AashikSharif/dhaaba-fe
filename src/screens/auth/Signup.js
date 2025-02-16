import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import { useUserStore } from '~/store/user.store';
import api from '~/utils/api';

export default function Signup({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { setUser } = useUserStore();

  // API call function
  const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data.user);
    },
    onError: (error) => {
      console.error('Error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
    },
  });

  const handleSignup = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    mutate({ email, username, password });
  };

  return (
    <View className="flex-1 justify-center bg-gray-900 px-6">
      <Text className="mb-6 text-center text-3xl font-bold text-white">Create an Account</Text>

      <TextInput
        className="mb-4 rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
        placeholder="Username"
        placeholderTextColor="#A0A0A0"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        className="mb-4 rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
        placeholder="Email"
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="mb-4 rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
        placeholder="Password"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        className="mb-4 rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
        placeholder="Confirm Password"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        onPress={handleSignup}
        className={`rounded-lg p-3 ${isLoading ? 'bg-gray-600' : 'bg-blue-600'}`}
        disabled={isLoading}>
        <Text className="text-center font-semibold text-white">
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} className="mt-4">
        <Text className="text-center text-gray-400">
          Already have an account? <Text className="text-blue-400">Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
