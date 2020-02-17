import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '~/screens/LoginScreen';

const { Navigator, Screen } = createStackNavigator();

const App = () => {
  return (
    <>
      <SafeAreaView />
      <NavigationContainer>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <Navigator initialRouteName='Login' headerMode='none'>
          <Screen name='Login' component={LoginScreen} />
        </Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
