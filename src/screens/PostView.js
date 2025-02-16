import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import api from '~/utils/api';

// Function to parse recipe text into structured sections
function parseRecipeSections(recipeText) {
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
  };
}

export default function PostView({ route }) {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { recipe, feed = false } = route.params;

  const deletePost = async () => {
    const response = await api.delete(`/recipes/${recipe._id}`);
    return response.data;
  };

  const { isPending: isDeleting, mutate: deletePostMtn } = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries('recipes');
      navigation.navigate('profile-main');
    },
    onError: (error) => {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong. 2');
    },
  });

  // Parse recipe sections
  const parsedRecipe = parseRecipeSections(recipe?.generatedRecipe || '');

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-gray-900 px-4 py-6">
        <View className="items-center justify-center">
          <Image source={{ uri: recipe.imageUrl }} className="h-96 w-full rounded-2xl" />
        </View>
        {/* Title */}
        <Text className="my-4 text-2xl font-bold text-white">{parsedRecipe.title}</Text>

        {/* Description */}
        {parsedRecipe.description && (
          <Text className="mb-4 text-lg text-gray-300">{parsedRecipe.description}</Text>
        )}

        {/* Recipe Info */}
        {parsedRecipe.info && (
          <Text className="mb-4 italic text-gray-400">{parsedRecipe.info}</Text>
        )}

        {/* Ingredients Section */}
        {parsedRecipe.ingredients.length > 0 && (
          <View className="mb-4">
            <Text className="mb-2 text-xl font-semibold text-blue-400">Ingredients:</Text>
            {parsedRecipe.ingredients.map((ingredient, index) => (
              <Text key={index} className="text-lg text-gray-300">
                • {ingredient}
              </Text>
            ))}
          </View>
        )}

        {/* Recipe Steps Section */}
        {parsedRecipe.instructions.length > 0 && (
          <View className="mb-4">
            <Text className="mb-2 text-xl font-semibold text-blue-400">Instructions:</Text>
            {parsedRecipe.instructions.map((step, index) => (
              <Text key={index} className="mb-1 text-lg text-gray-300">
                {index + 1}. {step}
              </Text>
            ))}
          </View>
        )}

        {/* Notes Section */}
        {parsedRecipe.notes && (
          <View className="mb-4">
            <Text className="mb-2 text-xl font-semibold text-blue-400">Notes:</Text>
            <Text className="text-lg text-gray-300">{parsedRecipe.notes}</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="mb-6 w-full flex-row justify-between bg-gray-900">
          {/* Discard Button */}
          {!feed && (
            <TouchableOpacity
              disabled={isDeleting}
              onPress={() => {
                deletePostMtn(recipe._id);
              }}
              className="mr-2 flex-1 items-center justify-center rounded-lg bg-red-700 py-3">
              <Text className="text-lg font-semibold text-white">Delete</Text>
            </TouchableOpacity>
          )}

          {/* Post Button */}
          <TouchableOpacity
            disabled={isDeleting}
            onPress={() => {
              navigation.goBack();
            }}
            className="ml-2 flex-1 items-center justify-center rounded-lg bg-blue-600 py-3">
            <Text className="text-lg font-semibold text-white">Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
