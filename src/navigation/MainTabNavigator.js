import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '~/screens/HomeScreen';
import ReservationsScreen from '~/screens/ReservationsScreen';
import PaymentsScreen from '~/screens/PaymentsScreen';
import PerfilScreen from '~/screens/PerfilScreen';
import HelpScreen from '~/screens/HelpScreen';

import COLORS from '~/utils/colors';

const MainTabNavigator = () => {
  const { Navigator, Screen } = createBottomTabNavigator();
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
    <Navigator
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
      initialRouteName='Home'
    >
      <Screen name='Home' component={HomeScreen} />
      <Screen name='Reservations' component={ReservationsScreen} />
      <Screen name='Payments' component={PaymentsScreen} />
      <Screen name='Perfil' component={PerfilScreen} />
      <Screen name='Help' component={HelpScreen} />
    </Navigator>
  );
};

export default MainTabNavigator;
