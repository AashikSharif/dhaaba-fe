import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import countries from 'world-countries';

import { useRecipeStore } from '~/store/recipe.store';

export default function CountrySelectionScreen({ navigation }) {
  const { cuisine1, setCuisine1, cuisine2, setCuisine2 } = useRecipeStore();

  const renderCountryItem = (country, setSelectedCountry, selectedCountry, position) => (
    <TouchableOpacity
      key={country.cca2}
      onPress={() => setSelectedCountry(country.name.common)}
      className={`mb-2 rounded-lg px-2 py-4 ${selectedCountry === country.name.common ? 'bg-gray-800' : ''} `}>
      <Text className={`text-white text-${position} text-2xl`}>{country.name.common}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="h-full flex-1 bg-gray-900 px-4 pb-24">
      <Text className="mb-4 mt-12 text-center text-2xl font-bold text-white">
        Select Two Countries
      </Text>

      <View className="flex-row justify-between">
        <View className="mr-2 flex-1">
          <FlatList
            data={[...countries].sort()}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.cca2}
            renderItem={({ item }) => renderCountryItem(item, setCuisine1, cuisine1, 'left')}
            contentContainerStyle={{ paddingBottom: 100 }}
            className="h-[72vh] rounded-lg p-3"
          />
        </View>

        <View className="ml-2 flex-1">
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[...countries].reverse()}
            keyExtractor={(item) => item.cca2}
            renderItem={({ item }) => renderCountryItem(item, setCuisine2, cuisine2, 'right')}
            contentContainerStyle={{ paddingBottom: 100 }}
            className="h-[72vh] rounded-lg p-3"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        disabled={!cuisine1 || !cuisine2}
        className={`mt-4 w-full rounded-lg py-3 ${
          cuisine1 && cuisine2 ? 'bg-blue-600' : 'bg-gray-700'
        }`}>
        <Text className="text-center text-lg font-semibold text-white">Back</Text>
      </TouchableOpacity>
    </View>
  );
}
