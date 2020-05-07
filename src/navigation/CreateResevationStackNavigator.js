import React, { useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';

import HomeTopTabNavigator from '#/navigation/HomeTopTabNavigator';
import SelectCarScreen from '#/screens/SelectCarScreen';

import COLORS from '#/utils/colors';

const CreateResevationStackNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();

  const headerHeight = useHeaderHeight();

  return (
    <Navigator
      screenOptions={{
        headerTitle: null,
        headerBackTitleVisible: false,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          height: headerHeight / 2 + 10
        },
        headerLeftContainerStyle: {
          position: 'relative',
          flexDirection: 'row',
          alignSelf: 'flex-end',
          left: Platform.select({
            ios: -Dimensions.get('screen').width / 2 + headerHeight / 2,
            android: -Dimensions.get('screen').width / 2 + headerHeight / 2 + 5
          })
        },
        headerTintColor: COLORS.primary
      }}
    >
      <Screen
        options={{
          headerShown: false
        }}
        name='Home'
        component={HomeTopTabNavigator}
      />
      <Screen name='SelectCar' component={SelectCarScreen} />
    </Navigator>
  );
};

export default CreateResevationStackNavigator;
