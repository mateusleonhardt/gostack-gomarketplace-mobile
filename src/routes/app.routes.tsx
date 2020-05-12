import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Image, View, Text } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';
import Cart from '../pages/Cart';

import Logo from '../assets/logo.png';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      cardStyle: { backgroundColor: '#282a36' },
    }}
    initialRouteName="Dashboard"
  >
    <App.Screen
      options={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: () => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FeatherIcon color="#bd93f9" name="shopping-bag" size={24} />
            <Text style={{ marginLeft: 10, fontSize: 20, color: '#f8f8f2' }}>
              Go Marketplace
            </Text>
          </View>
        ),
      }}
      name="Dashboard"
      component={Dashboard}
    />
    <App.Screen
      options={{
        headerTransparent: true,
        headerTitle: () => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FeatherIcon color="#bd93f9" name="shopping-bag" size={24} />
            <Text style={{ marginLeft: 10, fontSize: 20, color: '#f8f8f2' }}>
              Go Marketplace
            </Text>
          </View>
        ),
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          marginLeft: 20,
        },

        headerBackImage: () => (
          <FeatherIcon color="#f8f8f2" name="chevron-left" size={24} />
        ),
      }}
      name="Cart"
      component={Cart}
    />
  </App.Navigator>
);

export default AppRoutes;
