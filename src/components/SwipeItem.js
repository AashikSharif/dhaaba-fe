import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image as ReactImage,
  TouchableOpacity,
  Alert,
} from 'react-native';
import IconX from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useUserStore } from '~/store/user.store';
import api from '~/utils/api';

const { width, height } = Dimensions.get('window');

export function parseRecipeData(recipeText) {
  const extractSection = (text, sectionName) => {
    const regex = new RegExp(`\\[${sectionName}\\]([\\s\\S]*?)(?=\\[|$)`);
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  };

  return {
    title: extractSection(recipeText, 'RECIPE_TITLE'),
    description: extractSection(recipeText, 'RECIPE_DESCRIPTION'),
    info: extractSection(recipeText, 'RECIPE_INFO'),
    ingredients: extractSection(recipeText, 'INGREDIENTS')
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => line.replace(/^-\s*/, '')),
    instructions: extractSection(recipeText, 'INSTRUCTIONS')
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => line.replace(/^\d+\.\s*/, '')),
    notes: extractSection(recipeText, 'NOTES'),
    imageUrl: extractSection(recipeText, 'IMAGE_URL'),
  };
}

export default function SwipeItem({ img, item }) {
  const recipe = parseRecipeData(item.generatedRecipe);
  const navigation = useNavigation();
  const { user } = useUserStore();
  const [likes, setLikes] = useState(item?.likes?.length ?? 0);

  const addLike = async () => {
    const response = await api.put(`/recipes/${item._id}/like`, { userId: user.uid });
    return response.data;
  };

  const { isPending, mutate } = useMutation({
    mutationFn: addLike,
    onSuccess: (data) => {
      console.log(data);
      setLikes(data.likes);
    },
    onError: (error) => {
      console.error('Error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong.');
    },
  });

  return (
    <View style={styles.container}>
      <Image
        style={{
          width,
          height,
        }}
        source={img}
        blurRadius={80}
        contentFit="cover"
      />

      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          height: height * 0.2,
          width,
          paddingTop: 24,
          paddingLeft: 24,
          justifyContent: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <Image
            style={{
              width: 65,
              height: 65,
              borderRadius: 50,
            }}
            source={
              item?.user?.profilePicture ??
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
            contentFit="cover"
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              textAlign: 'left',
              gap: 2,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 600,
                fontSize: 20,
              }}>{`@${item?.user?.username}`}</Text>
          </View>
        </View>
      </View>
      <View
        className="p-4"
        style={{
          position: 'absolute',
          top: height / 6,
          display: 'flex',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
        }}>
        <ReactImage
          source={{ uri: item.imageUrl }}
          className="shadow-4xl z-40 h-96 w-full rounded-2xl"
        />

        <Text
          className="text-center"
          style={{ color: 'white', fontSize: 24, fontWeight: 500, marginBottom: 8 }}>
          {recipe.title}
        </Text>

        <Text
          numberOfLines={5}
          className="text-left"
          style={{ color: '#ddd', fontSize: 20, marginBottom: 8, fontWeight: 200 }}>
          {recipe.description}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('feed-post', { recipe: item, feed: true })}
          style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: 'white' }}
          className="w-full flex-row items-center justify-center rounded-2xl border-white p-4 text-center">
          <Text style={{ fontWeight: 200 }} className="ml-2 text-center text-lg text-white">
            Read the full recipe
          </Text>
        </TouchableOpacity>

        <View className="mt-4 w-full flex-row items-center justify-between px-6">
          <TouchableOpacity onPress={() => mutate()} className="flex-row items-center">
            <Icon
              name={item?.likes?.includes(user.uid) ? 'heart' : 'heart-o'}
              size={24}
              color="red"
            />
            <Text className="ml-2 text-lg text-white">{likes} Likes</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center">
            <IconX name="message-circle" size={24} color="white" />
            <Text className="ml-2 text-lg text-white">
              {recipe.comments || Math.floor(Math.random() * (50 - 5 + 1)) + 5} Comments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center">
            <IconX name="bookmark" size={24} color="white" />
            <Text className="ml-2 text-lg text-white">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
