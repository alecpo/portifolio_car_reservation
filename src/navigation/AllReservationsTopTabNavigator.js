import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ReservationsScreen from '~/screens/ReservationsScreen';
import ReservationsHistoryScreen from '~/screens/ReservationsHistoryScreen';

import COLORS from '~/utils/colors';

const AllReservationsTopTabNavigator = () => {
  const { Navigator, Screen } = createMaterialTopTabNavigator();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.defaultGray,
        labelStyle: { fontWeight: 'bold' },
        indicatorStyle: { backgroundColor: COLORS.primary }
      }}
      initialRouteName='Reservations'
    >
      <Screen
        name='Reservations'
        component={ReservationsScreen}
        options={{ tabBarLabel: 'RESERVAS' }}
      />
      <Screen
        name='ReservationsHistory'
        component={ReservationsHistoryScreen}
        options={{ tabBarLabel: 'HISTÓRICO' }}
      />
    </Navigator>
  );
};

export default AllReservationsTopTabNavigator;
