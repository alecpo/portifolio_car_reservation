import React, { useLayoutEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useDispatch, useSelector } from 'react-redux';
import ReservationsScreen from '~/screens/ReservationsScreen';
import ReservationsHistoryScreen from '~/screens/ReservationsHistoryScreen';

import COLORS from '~/utils/colors';

import { onGetReservations } from '~/store/actions/reservationsActions';

const AllReservationsTopTabNavigator = () => {
  const { Navigator, Screen } = createMaterialTopTabNavigator();

  const { userToken } = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (userToken) dispatch(onGetReservations());
  }, [dispatch, userToken]);

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: COLORS.defaultGray,
        labelStyle: { fontWeight: 'bold' },
        indicatorStyle: { backgroundColor: COLORS.primary }
      }}
      initialRouteName='Reservations'
      lazy
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
