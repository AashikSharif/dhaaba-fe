import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/Feather';
import IconStar from 'react-native-vector-icons/MaterialCommunityIcons';
import countries from 'world-countries';

import gen from '../assets/gen.png';

import RecipeDisplay from '~/components/RecipeDisplay';
import { useRecipeStore } from '~/store/recipe.store';
import { useUserStore } from '~/store/user.store';
import api from '~/utils/api';
export default function CreateScreen({ navigation }) {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const {
    recipe,
    setRecipe,
    clearRecipe,
    mealType,
    setMealType,
    people,
    setPeople,
    cuisine1,
    setCuisine1,
    cuisine2,
    setCuisine2,
    dietaryConstraints,
    setDietaryConstraints,
  } = useRecipeStore();

  // Options Data
  const mealOptions = ['Soup', 'Appetizers', 'Main Course', 'Desserts'];

  const dietaryOptions = [
    'Vegan',
    'Vegetarian',
    'Gluten-Free',
    'Dairy-Free',
    'Nut-Free',
    'Keto',
    'Halal',
    'Kosher',
    'Jain',
  ];

  // Toggle Dietary Constraints
  const toggleDietary = (item) => {
    const x = dietaryConstraints.includes(item)
      ? dietaryConstraints.filter((i) => i !== item)
      : [...dietaryConstraints, item];
    setDietaryConstraints(x);
  };

  // Generate AI Prompt
  const generatePrompt = () => {
    if (!mealType || !people || !cuisine1 || !cuisine2) {
      alert('Please complete all selections.');
      return;
    }

    const dietaryText =
      dietaryConstraints.length > 0
        ? `with dietary constraints: ${dietaryConstraints.join(', ')}`
        : '';
    const prompt = `I want a ${mealType} for ${people} people which is a fusion of ${cuisine1} and ${cuisine2} cuisine ${dietaryText}.`;

    // Send the prompt to the backend
    console.log('Generated Prompt:', prompt);
    mutate({
      prompt,
      people,
      mealType,
      cuisine1,
      cuisine2,
      user: user.uid,
      dietaryConstraints,
    });
  };

  const createRecipe = async (recipeData) => {
    const response = await api.post('/recipes', recipeData);
    return response.data;
  };

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: createRecipe,
    onSuccess: (data) => {
      setRecipe(data.recipe);
      mutateImage(data.recipe);
      queryClient.invalidateQueries('recipes');
    },
    onError: (error) => {
      console.log('1');
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong. 1');
    },
  });

  const createImage = async (recipeData) => {
    console.log(recipeData);
    const response = await api.post('/recipes/gen-image', { recipe: recipeData });
    return response.data;
  };

  const { isPending: isLoadingImage, mutate: mutateImage } = useMutation({
    mutationFn: createImage,
    onSuccess: (data) => {
      setRecipe(data.recipe);
      queryClient.invalidateQueries('recipes');
      console.log(data.recipe.imageUrl);
    },
    onError: (error) => {
      console.log('2');
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong. 2');
    },
  });

  const countrySelect = () => {
    navigation.navigate('country-select');
  };

  return (
    <View className="flex-1 bg-gray-900 px-6 pb-8 pt-12">
      {!isLoading && !isLoadingImage && !recipe && (
        <>
          <View className="">
            <Text className="mb-2 mt-4 text-2xl font-semibold text-white">
              Select Cuisine Types
            </Text>
            {cuisine1 && cuisine2 ? (
              <View className="flex-col justify-evenly">
                <TouchableOpacity onPress={countrySelect}>
                  <Text className="mb-2 mt-4 text-center text-4xl font-semibold text-white">
                    {`${countries.find((c) => c.name.common === cuisine1).flag} ${cuisine1}`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={countrySelect}>
                  <Text className="mb-2 mt-4 text-center text-4xl font-semibold text-white">
                    {`${countries.find((c) => c.name.common === cuisine2).flag} ${cuisine2}`}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-col justify-evenly">
                <TouchableOpacity onPress={countrySelect}>
                  <Text className="mb-2 mt-4 text-center text-4xl font-semibold text-white">
                    Country 1
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={countrySelect}>
                  <Text className="mb-2 mt-4 text-center text-4xl font-semibold text-white">
                    Country 2
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text className="mb-2 mt-4 text-2xl font-semibold text-white">Select Meal Type</Text>
          <FlatList
            data={mealOptions}
            keyExtractor={(item) => item}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setMealType(item)}
                className={`m-1 rounded-full px-4 py-2 ${
                  mealType === item ? 'bg-blue-500' : 'bg-gray-700'
                }`}>
                <Text className="text-xl text-white">{item}</Text>
              </TouchableOpacity>
            )}
          />

          <Text className="mb-2 text-2xl font-semibold text-white">Dietary Constraints</Text>
          <FlatList
            data={dietaryOptions}
            keyExtractor={(item) => item}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => toggleDietary(item)}
                className={`m-1 rounded-full px-4 py-2 ${
                  dietaryConstraints.includes(item) ? 'bg-blue-500' : 'bg-gray-700'
                }`}>
                <Text className="text-xl text-white">{item}</Text>
              </TouchableOpacity>
            )}
          />

          <View className="">
            <Text className="mb-2 text-2xl font-semibold text-white">Number of People</Text>
            <View className="w-full flex-row items-center justify-evenly rounded-lg p-3">
              <TouchableOpacity
                onPress={() => setPeople(people - 1)}
                className="rounded-full bg-gray-700 p-2">
                <Icon name="minus" size={32} color="white" />
              </TouchableOpacity>

              <Text className="text-2xl font-bold text-white">{`${people} people`}</Text>

              <TouchableOpacity
                onPress={() => setPeople(people + 1)}
                className="rounded-full bg-blue-500 p-2">
                <Icon name="plus" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={generatePrompt}
            disabled={isLoading}
            className="my-6 w-full flex-row items-center justify-center rounded-lg bg-fuchsia-600 py-3">
            <IconStar name="star-four-points" size={20} color="white" />
            <Text className="ml-2 text-lg font-semibold text-white">
              {isLoading ? 'Creating...' : 'Create Fusion'}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {(isLoading || recipe) && (
        <RecipeDisplay recipe={recipe} recipeLoading={isLoading} imageLoading={isLoadingImage} />
      )}
    </View>
  );
}
