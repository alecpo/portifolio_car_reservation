import React, { useLayoutEffect, useCallback } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useDispatch, useSelector } from 'react-redux';

import ReservationsStackNavigator from '#/navigation/ReservationsStackNavigator';
import ReservationsHistoryScreen from '#/screens/ReservationsHistoryScreen';

import COLORS from '#/utils/colors';

import { onGetReservations } from '#/store/actions/reservationsActions';

const AllReservationsTopTabNavigator = () => {
  const { Navigator, Screen } = createMaterialTopTabNavigator();

  const { userToken } = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const getReservations = useCallback(() => {
    if (userToken) {
      dispatch(onGetReservations());
    }
  }, [dispatch, userToken]);

  useLayoutEffect(() => {
    getReservations();
  }, [getReservations]);

  return (
    <>
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
          component={ReservationsStackNavigator}
          options={{ tabBarLabel: 'RESERVAS' }}
        />
        <Screen
          name='ReservationsHistory'
          component={ReservationsHistoryScreen}
          options={{ tabBarLabel: 'HISTÓRICO' }}
        />
      </Navigator>
    </>
  );
};

export default AllReservationsTopTabNavigator;
