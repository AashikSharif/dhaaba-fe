import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

import SwipeItem from '../components/SwipeItem';

import api from '~/utils/api';

const { height } = Dimensions.get('window');

const FeedScreen = () => {
  const queryClient = useQueryClient();
  const translateY = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const refreshOpacity = useSharedValue(1);

  const fetchRecipes = async () => {
    const { data } = await api.get('recipes');
    return data;
  };

  const { isFetching, data } = useQuery({
    queryKey: ['all-recipes'],
    queryFn: fetchRecipes,
    enabled: true,
  });

  const refreshFeed = () => {
    queryClient.invalidateQueries(['all-recipes']);
    currentIndex.value = 0;
    translateY.value = withSpring(0);
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      refreshOpacity.value = withTiming(0, { duration: 200 });
    })
    .onUpdate((event) => {
      translateY.value = event.translationY - currentIndex.value * height;
    })
    .onEnd((event) => {
      const direction = event.translationY > 0 ? -1 : 1;
      const nextIndex = currentIndex.value + direction;

      if (nextIndex >= 0 && nextIndex < data?.length) {
        currentIndex.value = nextIndex;
      }

      translateY.value = withSpring(-currentIndex.value * height);
      refreshOpacity.value = withTiming(1, { duration: 200 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const refreshButtonStyle = useAnimatedStyle(() => ({
    opacity: refreshOpacity.value,
  }));

  return (
    <View className="flex-1 bg-gray-900">
      <Animated.View className="mt-24" style={[styles.refreshButton, refreshButtonStyle]}>
        <TouchableOpacity onPress={refreshFeed} className="rounded-full bg-gray-800 p-3">
          <Icon name="refresh-cw" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
          {data?.map((item) => (
            <SwipeItem item={item} key={item._id} img={item.imageUrl} id={item._id} />
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  refreshButton: {
    position: 'absolute',
    // top: 80,
    right: 20,
    zIndex: 50,
  },
});

export default FeedScreen;
