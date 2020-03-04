import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components/native';

import RootStackNavigator from '~/navigation/RootStackNavigator';

import COLORS from '~/utils/colors';

const App = () => {
  return (
    <NavigationContainer>
      <StyledSafeAreaView />
      <StatusBar backgroundColor={COLORS.primary} barStyle='light-content' />
      <RootStackNavigator />
    </NavigationContainer>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  background-color: ${COLORS.primary};
`;

export default App;
