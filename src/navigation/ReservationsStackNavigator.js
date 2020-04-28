import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CurrenAndFutureReservationsScreen from '#/screens/CurrenAndFutureReservationsScreen';
import CheckinScreen from '#/screens/CheckinScreen';
import CheckoutScreen from '#/screens/CheckoutScreen';

const ReservationsStackNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode='none'>
      <Screen
        name='CurrenAndFutureReservations'
        component={CurrenAndFutureReservationsScreen}
      />
      <Screen name='Checkin' component={CheckinScreen} />
      <Screen name='Checkout' component={CheckoutScreen} />
    </Navigator>
  );
};

export default ReservationsStackNavigator;
