import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CountrySelectionScreen from '~/screens/CountrySelectionScreen';
import CreateScreen from '~/screens/CreateScreen';

const Stack = createNativeStackNavigator();

export const CreateStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} id="create">
    <Stack.Screen name="create-main" component={CreateScreen} />
    <Stack.Screen
      name="country-select"
      component={CountrySelectionScreen}
      options={{
        presentation: 'formSheet',
        animation: 'slide_from_bottom',
      }}
    />
  </Stack.Navigator>
);
