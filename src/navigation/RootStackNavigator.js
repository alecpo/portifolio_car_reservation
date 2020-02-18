import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components/native';

import MainTabNavigator from '~/navigation/MainTabNavigator';
import LoginScreen from '~/screens/LoginScreen';

import COLORS from '~/utils/colors';

import logo from '~/assets/img/logo_white.png';

const RootStackNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator
      screenOptions={{
        headerTitle: () => <StyledLogo source={logo} />,
        headerStyle: {
          backgroundColor: COLORS.primary
        },
        headerTitleAlign: 'center',
        headerLeft: false
      }}
      headerMode='screen'
      initialRouteName='Login'
    >
      <Screen name='Main' component={MainTabNavigator} />
      <Screen
        options={{ headerShown: false }}
        name='Login'
        component={LoginScreen}
      />
    </Navigator>
  );
};

const StyledLogo = styled.Image`
  width: 40px;
  height: 40px;
  resize-mode: contain;
`;

export default RootStackNavigator;
