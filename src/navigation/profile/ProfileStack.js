import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Edit from '~/screens/Edit';
import PostView from '~/screens/PostView';
import ProfileScreen from '~/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} id="create">
    <Stack.Screen name="profile-main" component={ProfileScreen} />
    <Stack.Screen name="post-view" component={PostView} />
    <Stack.Screen name="edit" component={Edit} />
  </Stack.Navigator>
);
