import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import { useUserStore } from '~/store/user.store';
import api from '~/utils/api';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useUserStore();

  const handleLogin = () => {
    mutate({
      email,
      password,
    });
  };

  const loginUser = async (userData) => {
    const response = await api.post('/auth/login', userData);
    return response.data;
  };

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.user);
    },
    onError: (error) => {
      console.error('Error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
    },
  });

  return (
    <View className="flex-1 justify-center bg-gray-900 px-6">
      <Text className="mb-6 text-center text-3xl font-bold text-white">Welcome Back</Text>

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

      <TouchableOpacity onPress={handleLogin} className="rounded-lg bg-blue-600 p-3">
        <Text className="text-center font-semibold text-white">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('signup')} className="mt-4">
        <Text className="text-center text-gray-400">
          Don't have an account? <Text className="text-blue-400">Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
