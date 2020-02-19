import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootStackNavigator from '~/navigation/RootStackNavigator';

import COLORS from '~/utils/colors';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView />
      <StatusBar backgroundColor={COLORS.primary} barStyle='light-content' />
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default App;
