import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FeedScreen from '~/screens/FeedScreen';
import PostView from '~/screens/PostView';

const Stack = createNativeStackNavigator();

export const FeedStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} id="create">
    <Stack.Screen name="feed-main" component={FeedScreen} />
    <Stack.Screen name="feed-post" component={PostView} />
  </Stack.Navigator>
);
