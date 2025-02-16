import { BlurView } from 'expo-blur';
import React from 'react';
import { ActivityIndicator } from 'react-native';

const Loading = () => (
  <BlurView
    className="h-full w-full flex-1 items-center justify-center"
    tint="light"
    intensity={30}>
    <ActivityIndicator size="large" color="white" />
  </BlurView>
);

export default Loading;
