import React from 'react';
import PropTypes from 'prop-types';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '~/screens/HomeScreen';
import ReservationsScreen from '~/screens/ReservationsScreen';
import PaymentsScreen from '~/screens/PaymentsScreen';
import ProfileScreen from '~/screens/ProfileScreen';
import HelpScreen from '~/screens/HelpScreen';

import COLORS from '~/utils/colors';

const selectIconName = key => {
  switch (key) {
    case 'Home':
      return 'event-note';
    case 'Reservations':
      return 'update';
    case 'Payments':
      return 'account-balance-wallet';
    case 'Profile':
      return 'person';
    default:
      return 'help-outline';
  }
};

const TabBarIcon = ({ focused }) => {
  const route = useRoute();
  const iconName = selectIconName(route.name);

  return (
    <Icon
      name={iconName}
      size={30}
      color={focused ? COLORS.primary : COLORS.defaultGray}
    />
  );
};

const MainStackNavigator = () => {
  const BottomTab = createBottomTabNavigator();

  const screenOptions = { tabBarIcon: TabBarIcon };

  return (
    <BottomTab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.defaultGray
      }}
      initialRouteName='Profile'
    >
      <BottomTab.Screen name='Home' component={HomeScreen} />
      <BottomTab.Screen name='Reservations' component={ReservationsScreen} />
      <BottomTab.Screen name='Payments' component={PaymentsScreen} />
      <BottomTab.Screen name='Profile' component={ProfileScreen} />
      <BottomTab.Screen name='Help' component={HelpScreen} />
    </BottomTab.Navigator>
  );
};

TabBarIcon.defaultProps = {
  focused: false
};

TabBarIcon.propTypes = {
  focused: PropTypes.bool
};

export default MainStackNavigator;
