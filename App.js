import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import axios from 'axios';

import storeConfig from '#/store/storeConfig';

import RootStackNavigator from '#/navigation/RootStackNavigator';

import { SERVER_URL } from '#/config/api';

axios.defaults.baseURL = SERVER_URL;

const App = () => {
  const store = storeConfig();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
