import React, { useState, useEffect, useCallback } from 'react';
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
import DeleteModalScreen from '#/screens/modals/DeleteModalScreen';
import LoadingModalScreen from '#/screens/modals/LoadingModalScreen';
import DatePickerModalScreen from '#/screens/modals/DatePickerModalScreen';
import ReservationHistoryDetailsModalScreen from '#/screens/modals/ReservationHistoryDetailsModalScreen';
import DeleteWithJustificationModalScreen from '#/screens/modals/DeleteWithJustificationModalScreen';
import CancellingAfterTimeModalScreen from '#/screens/modals/CancellingAfterTimeModalScreen';

import logo from '#/assets/img/logo_white.png';

import COLORS from '#/utils/colors';
import SPACING from '#/utils/spacing';

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
  }, [userToken, getToken]);

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
          <Screen
            options={{ headerTitle: null }}
            name='Help'
            component={HelpScreen}
          />
          <Screen name='SignUp' component={SignUpScreen} />
          <Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        </>
      ) : (
        <>
          <Screen name='Main' component={MainBottomTabNavigator} />
          <Screen
            options={modalAnimationConfig}
            name='EditModal'
            component={EditModalScreen}
          />
          <Screen
            options={modalAnimationConfig}
            name='DeleteModal'
            component={DeleteModalScreen}
          />
          <Screen
            options={modalAnimationConfig}
            name='LoadingModal'
            component={LoadingModalScreen}
          />
          <Screen
            options={modalAnimationConfig}
            name='DatePickerModal'
            component={DatePickerModalScreen}
          />
          <Screen
            options={modalAnimationConfig}
            name='ReservationHistoryDetailsModal'
            component={ReservationHistoryDetailsModalScreen}
          />
          <Screen
            options={modalAnimationConfig}
            name='DeleteWithJustificationModal'
            component={DeleteWithJustificationModalScreen}
          />
          <Screen
            options={modalAnimationConfig}
            name='CancellingAfterTimeModal'
            component={CancellingAfterTimeModalScreen}
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
  margin-bottom: ${SPACING.smallPlus}px;
`;

export default RootStackNavigator;
