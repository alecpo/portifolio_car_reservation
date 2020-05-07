import React from 'react';
import PropTypes from 'prop-types';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CreateResevationStackNavigator from '#/navigation/CreateResevationStackNavigator';
import AllReservationsTopTabNavigator from '#/navigation/AllReservationsTopTabNavigator';
import PaymentsScreen from '#/screens/PaymentsScreen';
import ProfileScreen from '#/screens/ProfileScreen';
import HelpScreen from '#/screens/HelpScreen';

import COLORS from '#/utils/colors';

const selectIconName = key => {
  switch (key) {
    case 'CreateResevation':
      return 'event-note';
    case 'AllReservations':
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

const MainBottomTabNavigator = () => {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <Navigator
      screenOptions={{ tabBarIcon: TabBarIcon }}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.defaultGray
      }}
      initialRouteName='CreateResevation'
    >
      <Screen
        name='CreateResevation'
        component={CreateResevationStackNavigator}
      />
      <Screen
        name='AllReservations'
        component={AllReservationsTopTabNavigator}
      />
      <Screen name='Payments' component={PaymentsScreen} />
      <Screen name='Profile' component={ProfileScreen} />
      <Screen name='Help' component={HelpScreen} />
    </Navigator>
  );
};

TabBarIcon.defaultProps = {
  focused: false
};

TabBarIcon.propTypes = {
  focused: PropTypes.bool
};

export default MainBottomTabNavigator;
