import 'react-native-gesture-handler';
import React from 'react';
import { Image } from 'react-native';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from '~/screens/LoginScreen';
import HomeScreen from '~/screens/HomeScreen';
import ReservationsScreen from '~/screens/ReservationsScreen';
import PaymentsScreen from '~/screens/PaymentsScreen';
import PerfilScreen from '~/screens/PerfilScreen';
import HelpScreen from '~/screens/HelpScreen';

import COLORS from '~/utils/colors';

const { Navigator, Screen } = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
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
  const LogoTitle = (...props) => (
    <StyledHeader>
      <Image
        style={{ width: 50, height: 50 }}
        source={require('~/assets/img/logo_white.png')}
      />
    </StyledHeader>
  );

  return (
    <>
      <SafeAreaView />
      <StatusBar backgroundColor={COLORS.primary} barStyle='dark-content' />
      {/* <NavigationContainer>
        <Navigator initialRouteName='Login' headerMode='none'>
          <Screen name='Login' component={LoginScreen} />
        </Navigator>
      </NavigationContainer> */}

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const iconName = selectIconName(route.name);

              return (
                <Icon
                  name={iconName}
                  size={25}
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
        >
          <Tab.Screen name='Home' component={HomeScreen} />
          <Tab.Screen name='Reservations' component={ReservationsScreen} />
          <Tab.Screen name='Payments' component={PaymentsScreen} />
          <Tab.Screen name='Perfil' component={PerfilScreen} />
          <Tab.Screen name='Help' component={HelpScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

const StyledHeader = styled.View`
  background-color: black;
  width: 100px;
  height: 100px;
`;

export default App;
