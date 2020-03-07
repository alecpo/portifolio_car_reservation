import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import SplashScreen from '~/screens/SplashScreen';
import MainStackNavigator from '~/navigation/MainStackNavigator';
import HelpScreen from '~/screens/HelpScreen';
import LoginScreen from '~/screens/LoginScreen';
import SignUpScreen from '~/screens/SignUpScreen';
import ForgotPasswordScreen from '~/screens/ForgotPasswordScreen';
import EditModalScreen from '~/screens/EditModalScreen';

import logo from '~/assets/img/logo_white.png';

import COLORS from '~/utils/colors';

const RootStackNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  const { userToken } = useSelector(({ user }) => user);

  const [isLoading, setIsLoading] = useState(true);
  const [token, setUserToken] = useState(null);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@access_token');
      setIsLoading(false);
      setUserToken(value);
    } catch (error) {
      console.log('Error retrieving data' + error);
    }
  };

  useEffect(() => {
    getToken();
  }, [userToken]);

  const config = {
    animation: 'spring',
    config: {
      stiffness: 800,
      damping: 90,
      mass: 4,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.06
    }
  };

  const modalAnimationConfig = {
    transitionSpec: {
      open: config,
      close: config
    },
    headerShown: false,
    cardStyle: { backgroundColor: 'transparent' },
    cardOverlayEnabled: true,
    cardStyleInterpolator: ({ current, layouts }) => {
      const { progress } = current;
      const { screen } = layouts;
      return {
        cardStyle: {
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [screen.height, 0]
              })
            }
          ]
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.4],
            extrapolate: 'clamp'
          })
        }
      };
    }
  };

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
      mode='modal'
    >
      {!token ? (
        <>
          <Screen
            options={{ headerShown: false }}
            name='Login'
            component={LoginScreen}
          />
          <Screen name='Help' component={HelpScreen} />
          <Screen name='SignUp' component={SignUpScreen} />
          <Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        </>
      ) : (
        <>
          <Screen name='Main' component={MainStackNavigator} />
          <Screen
            options={modalAnimationConfig}
            name='EditModal'
            component={EditModalScreen}
          />
        </>
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
