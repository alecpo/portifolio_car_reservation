import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import axios from 'axios';

import COLORS from '#/utils/colors';

import storeConfig from '#/store/storeConfig';

import RootStackNavigator from '#/navigation/RootStackNavigator';

import { SERVER_URL } from '#/config/api';

axios.defaults.baseURL = SERVER_URL;

const App = () => {
  const store = storeConfig();

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={COLORS.primary} barStyle='light-content' />
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
