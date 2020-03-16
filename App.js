import 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components/native';
import axios from 'axios';

import { Provider } from 'react-redux';
import storeConfig from '~/store/storeConfig';

import RootStackNavigator from '~/navigation/RootStackNavigator';

import COLORS from '~/utils/colors';

/* AXIOS */
axios.defaults.baseURL = 'https://api.hmg.pickndrive.com.br/api/v1';

const App = () => {
  const store = storeConfig();
  const statusBarRef = useRef();

  return (
    <Provider store={store}>
      <StyledSafeAreaView />
      <StatusBar
        ref={statusBarRef}
        backgroundColor={COLORS.primary}
        barStyle='light-content'
      />
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  background-color: ${COLORS.primary};
`;

export default App;
