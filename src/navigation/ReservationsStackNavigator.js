import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CurrenAndFutureReservationsScreen from '#/screens/CurrenAndFutureReservationsScreen';
import CheckinScreen from '#/screens/CheckinScreen';

const ReservationsStackNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator headerMode='none'>
      <Screen
        name='CurrenAndFutureReservations'
        component={CurrenAndFutureReservationsScreen}
      />
      <Screen name='Checkin' component={CheckinScreen} />
    </Navigator>
  );
};

export default ReservationsStackNavigator;
