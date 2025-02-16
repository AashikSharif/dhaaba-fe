import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '~/screens/auth/Login';
import Signup from '~/screens/auth/Signup';

const Stack = createNativeStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} id="auth">
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="signup" component={Signup} />
  </Stack.Navigator>
);
