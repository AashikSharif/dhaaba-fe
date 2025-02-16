import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRecipeStore = create(
  persist(
    (set) => ({
      mealType: '',
      people: 2,
      cuisine1: '',
      cuisine2: '',
      dietaryConstraints: [],
      recipe: null,

      setMealType: (mealType) => set({ mealType }),
      setPeople: (people) => set({ people }),
      setCuisine1: (cuisine1) => set({ cuisine1 }),
      setCuisine2: (cuisine2) => set({ cuisine2 }),
      setDietaryConstraints: (constraints) => set({ dietaryConstraints: constraints }),

      // Recipe Methods
      setRecipe: (recipe) => set({ recipe }),
      clearRecipe: () =>
        set({
          recipe: null,
          mealType: '',
          people: 2,
          cuisine1: '',
          cuisine2: '',
          dietaryConstraints: [],
        }),

      // Reset Method
      clearSelections: () =>
        set({
          mealType: '',
          people: 2,
          cuisine1: '',
          cuisine2: '',
          dietaryConstraints: [],
          recipe: null,
        }),
    }),
    {
      name: 'recipe-store', // unique key in AsyncStorage
      getStorage: () => AsyncStorage,
    }
  )
);
