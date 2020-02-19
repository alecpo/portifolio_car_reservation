import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components/native';

import SplashScreen from '~/screens/SplashScreen';
import MainTabNavigator from '~/navigation/MainTabNavigator';
import LoginScreen from '~/screens/LoginScreen';
import SignUpScreen from '~/screens/SignUpScreen';
import ForgotPasswordScreen from '~/screens/ForgotPasswordScreen';

import COLORS from '~/utils/colors';

import logo from '~/assets/img/logo_white.png';

const RootStackNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <SplashScreen />;

  return (
    <Navigator
      screenOptions={{
        headerTitle: () => <StyledLogo source={logo} />,
        headerStyle: {
          backgroundColor: COLORS.primary
        },
        headerTintColor: COLORS.secondary,
        headerTitleAlign: 'center'
      }}
      headerMode='screen'
      initialRouteName='Login'
    >
      {userToken == null ? (
        <>
          <Screen
            options={{ headerShown: false }}
            name='Login'
            component={LoginScreen}
          />
          <Screen name='SignUp' component={SignUpScreen} />
          <Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        </>
      ) : (
        <Screen name='Main' component={MainTabNavigator} />
      )}
    </Navigator>
  );
};

const StyledLogo = styled.Image`
  width: 40px;
  height: 40px;
  resize-mode: contain;
`;

export default RootStackNavigator;
