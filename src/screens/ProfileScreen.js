import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useUserStore } from '~/store/user.store';
import api from '~/utils/api';

export default function ProfileScreen({ navigation }) {
  const { user } = useUserStore();

  const fetchUserRecipes = async () => {
    const { data } = await api.get(`recipes/user/${user.uid}`);
    return data;
  };

  const { isFetching, data } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchUserRecipes,
    enabled: !!user.uid,
  });

  return (
    <View className="flex-1 bg-gray-900 px-4 py-8">
      <View className="mt-6 flex-row flex-row-reverse items-center justify-between">
        <TouchableOpacity onPress={() => navigation.navigate('edit')}>
          <Icon name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="mt-6 items-center">
        <Image
          source={{ uri: user.profilePicture ?? '' }}
          className="h-48 w-48 rounded-full border-2 border-blue-500"
        />
        <Text className="mt-2 text-2xl font-bold text-white">{`@${user.username}`}</Text>
        <Text className="text-md mt-1 text-center text-gray-400">{user?.bio ?? ''}</Text>
      </View>

      <Text className="mb-3 mt-6 text-lg font-semibold text-white">Your Recipes</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item._id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('post-view', { recipe: item })}>
            <Image source={{ uri: item.imageUrl }} className="m-1 h-36 w-36" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
