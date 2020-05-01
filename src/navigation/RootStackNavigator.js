import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import SplashScreen from '#/screens/SplashScreen';
import MainBottomTabNavigator from '#/navigation/MainBottomTabNavigator';
import HelpScreen from '#/screens/HelpScreen';
import LoginScreen from '#/screens/LoginScreen';
import SignUpScreen from '#/screens/SignUpScreen';
import ForgotPasswordScreen from '#/screens/ForgotPasswordScreen';
import EditModalScreen from '#/screens/modals/EditModalScreen';
import ConfirmModalScreen from '#/screens/modals/ConfirmModalScreen';
import LoadingModalScreen from '#/screens/modals/LoadingModalScreen';
import DatePickerModalScreen from '#/screens/modals/DatePickerModalScreen';
import ReservationHistoryDetailsModalScreen from '#/screens/modals/ReservationHistoryDetailsModalScreen';
import DeleteWithJustificationModalScreen from '#/screens/modals/DeleteWithJustificationModalScreen';
import CancellingAfterTimeModalScreen from '#/screens/modals/CancellingAfterTimeModalScreen';

import logo from '#/assets/img/logo_white.png';

import COLORS from '#/utils/colors';

import { onGetUser } from '#/store/actions/userActions';

const RootStackNavigator = () => {
  const dispatch = useDispatch();
  const { Navigator, Screen } = createStackNavigator();
  const { userToken, isLoading } = useSelector(({ user }) => user);

  const [token, setUserToken] = useState(null);

  const getToken = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('@access_token');

      if (value && !userToken) {
        await dispatch(onGetUser(value));
      }
      setUserToken(value);
    } catch (error) {
      console.log(`Erro ao buscar token : ${error}`);
    }
  }, [userToken, dispatch]);

  useEffect(() => {
    getToken();
  }, [getToken]);

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
    headerTitle: () => (
      <StyledLogo tintColor={COLORS.secondaryTransparent} source={logo} />
    ),
    headerStyle: {
      backgroundColor: COLORS.primaryTransparent,
      elevation: 0,
      shadowOpacity: 0,
      height: 60
    },
    headerLeft: null,
    headerTitleAlign: 'center',
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

  const OfflineNavigator = () => {
    useFocusEffect(() => {
      StatusBar.setBackgroundColor(COLORS.primary);
    });
    return (
      <Navigator
        screenOptions={{
          headerTitle: () => <StyledLogo source={logo} />,
          headerStyle: {
            backgroundColor: COLORS.primary,
            elevation: 0,
            shadowOpacity: 0,
            height: 60
          },
          headerTintColor: COLORS.secondary,
          headerTitleAlign: 'center'
        }}
        headerMode='float'
      >
        <Screen
          options={{ headerTitle: null, headerBackTitleVisible: false }}
          name='Login'
          component={LoginScreen}
        />
        <Screen
          options={{ headerTitle: null, headerBackTitleVisible: false }}
          name='Help'
          component={HelpScreen}
        />
        <Screen
          options={{ headerTitle: null, headerBackTitleVisible: false }}
          name='SignUp'
          component={SignUpScreen}
        />
        <Screen
          options={{ headerTitle: null, headerBackTitleVisible: false }}
          name='ForgotPassword'
          component={ForgotPasswordScreen}
        />
      </Navigator>
    );
  };

  const OnlineModalsNavigator = () => {
    useFocusEffect(() => {
      StatusBar.setBackgroundColor(COLORS.primaryTransparent);
    });
    return (
      <Navigator screenOptions={modalAnimationConfig}>
        <Screen name='EditModal' component={EditModalScreen} />
        <Screen name='ConfirmModal' component={ConfirmModalScreen} />
        <Screen name='DatePickerModal' component={DatePickerModalScreen} />
        <Screen
          name='ReservationHistoryDetailsModal'
          component={ReservationHistoryDetailsModalScreen}
        />
        <Screen
          name='DeleteWithJustificationModal'
          component={DeleteWithJustificationModalScreen}
        />
        <Screen
          name='CancellingAfterTimeModal'
          component={CancellingAfterTimeModalScreen}
        />
        <Screen name='LoadingModal' component={LoadingModalScreen} />
      </Navigator>
    );
  };

  const OnlineNavigator = () => {
    return (
      <Navigator>
        <Screen
          name='Main'
          options={{
            headerTitle: () => <StyledLogo source={logo} />,
            headerStyle: {
              backgroundColor: COLORS.primary,
              elevation: 0,
              shadowOpacity: 0,
              height: 60
            },
            headerLeft: null,
            headerTintColor: COLORS.secondary,
            headerTitleAlign: 'center'
          }}
          component={MainBottomTabNavigator}
        />
        <Screen
          name='OnlineModals'
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true
          }}
          component={OnlineModalsNavigator}
        />
      </Navigator>
    );
  };

  const PublicModalsNavigator = () => {
    useFocusEffect(() => {
      StatusBar.setBackgroundColor(COLORS.primaryTransparent);
    });
    return (
      <Navigator screenOptions={modalAnimationConfig}>
        <Screen name='LoadingModal' component={LoadingModalScreen} />
      </Navigator>
    );
  };

  return (
    <Navigator screenOptions={{ headerShown: false }} headerMode='float'>
      <>
        {!token ? (
          <>
            <Screen name='Offline' component={OfflineNavigator} />
          </>
        ) : (
          <>
            <Screen name='Online' component={OnlineNavigator} />
          </>
        )}
        <Screen
          name='PublicModals'
          options={{
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true
          }}
          component={PublicModalsNavigator}
        />
      </>
    </Navigator>
  );
};

const StyledLogo = styled.Image`
  width: 40px;
  height: 40px;
  resize-mode: contain;
`;

export default RootStackNavigator;
