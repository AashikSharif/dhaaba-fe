import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { CreateIcon, FeedIcon, ProfileIcon, tabBarBackground } from '~/components/TabItems'; // Using Feather icons
import { CreateStack } from '~/navigation/create/CreateStack';
import { FeedStack } from '~/navigation/feed/FeedStack';
import { ProfileStack } from '~/navigation/profile/ProfileStack';
import CreateScreen from '~/screens/CreateScreen';
import FeedScreen from '~/screens/FeedScreen';
import ProfileScreen from '~/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#111827',
          borderTopColor: '#111827',
        },
        tabBarActiveTintColor: '#60A5FA',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Feed"
        component={FeedStack}
        options={{
          tabBarIcon: FeedIcon,
        }}
      />

      <Tab.Screen
        name="Create"
        component={CreateStack}
        options={{
          tabBarIcon: CreateIcon,
          tabBarShowLabel: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
}
