import { BlurView } from 'expo-blur';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const FeedIcon = ({ focused, size }) => (
  <View className="items-center">
    <Icon name="home" size={size} color={focused ? '#8e24aa' : '#a1a1aa'} />
  </View>
);

export const CreateIcon = ({ focused, size }) => (
  <View className="items-center">
    <Icon name="plus-circle" size={28} color={focused ? '#8e24aa' : '#a1a1aa'} />
  </View>
);

export const ProfileIcon = ({ focused, size }) => (
  <View className="items-center">
    <Icon name="user" size={size} color={focused ? '#8e24aa' : '#a1a1aa'} />
  </View>
);

export const CreateButtonIcon = () => (
  <View className="h-[55px] w-[55px] items-center justify-center rounded-full bg-blue-600 shadow-lg">
    <Icon name="plus" size={28} color="#FEFFFE" />
  </View>
);

export const tabBarBackground = () => (
  <BlurView tint="light" intensity={100} style={{ width: '100%' }} />
);
