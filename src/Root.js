import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import RootStack from '~/navigation/RootStack';
const Root = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  </GestureHandlerRootView>
);

export default Root;
