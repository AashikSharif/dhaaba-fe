import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useUserStore } from '~/store/user.store';
import api from '~/utils/api';

export default function Edit({ navigation }) {
  const { user, setUser, clearUser } = useUserStore();
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState('');

  const queryClient = useQueryClient();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!bio || !profilePic) {
      Alert.alert('Error', 'Please select a profile picture and enter a bio.');
      return;
    }
    mutate({
      profilePic,
      bio,
    });
  };

  const updateUser = async (userData) => {
    const formData = new FormData();
    formData.append('bio', userData.bio);

    if (userData.profilePic) {
      formData.append('profilePic', {
        uri: userData.profilePic,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });
    }

    const response = await api.put(`/user/${user.uid}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  };

  const { isPending, mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log(data);
      setUser(data.user);
      navigation.goBack();
    },
    onError: (error) => {
      console.error('Error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
    },
  });

  return (
    <View className="flex-1 bg-gray-900 px-6 pt-12">
      <Text className="mb-6 text-center text-2xl font-bold text-white">Edit Profile</Text>

      {/* Profile Picture Section */}
      <View className="items-center">
        <TouchableOpacity onPress={pickImage} className="relative">
          <Image
            source={{ uri: profilePic || 'https://via.placeholder.com/150' }}
            className="h-32 w-32 rounded-full border-2 border-blue-500"
          />
          <View className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2">
            <Icon name="camera" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <Text className="mt-6 text-lg font-semibold text-white">Bio</Text>
      <TextInput
        className="mt-2 rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
        placeholder="Write something about yourself..."
        placeholderTextColor="#A0A0A0"
        multiline
        value={bio}
        onChangeText={setBio}
      />

      <TouchableOpacity
        disabled={isPending}
        onPress={handleSave}
        className="mt-6 w-full rounded-lg bg-blue-600 py-3">
        <Text className="text-center text-lg font-semibold text-white">Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isPending}
        onPress={() => {
          queryClient.clear();
          clearUser();
        }}
        className="mt-6 w-full rounded-lg bg-red-600 py-3">
        <Text className="text-center text-lg font-semibold text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
