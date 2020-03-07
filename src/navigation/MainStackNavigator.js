import React from 'react';
import styled from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '~/screens/HomeScreen';
import ReservationsScreen from '~/screens/ReservationsScreen';
import PaymentsScreen from '~/screens/PaymentsScreen';
import ProfileScreen from '~/screens/ProfileScreen';
import HelpScreen from '~/screens/HelpScreen';

import COLORS from '~/utils/colors';

const MainStackNavigator = () => {
  const BottomTab = createBottomTabNavigator();

  const selectIconName = key => {
    switch (key) {
      case 'Home':
        return 'event-note';
        break;
      case 'Reservations':
        return 'update';
        break;
      case 'Payments':
        return 'account-balance-wallet';
        break;
      case 'Perfil':
        return 'person';
        break;
      default:
        return 'help-outline';
        break;
    }
  };

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const iconName = selectIconName(route.name);

          return (
            <Icon
              name={iconName}
              size={30}
              color={focused ? COLORS.primary : COLORS.defaultGray}
            />
          );
        }
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.defaultGray
      }}
      initialRouteName='Perfil'
    >
      <BottomTab.Screen name='Home' component={HomeScreen} />
      <BottomTab.Screen name='Reservations' component={ReservationsScreen} />
      <BottomTab.Screen name='Payments' component={PaymentsScreen} />
      <BottomTab.Screen name='Perfil' component={ProfileScreen} />
      <BottomTab.Screen name='Help' component={HelpScreen} />
    </BottomTab.Navigator>
  );
};

export default MainStackNavigator;
