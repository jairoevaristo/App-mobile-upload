import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import { Home } from '../pages/Home';
import { Upload } from '../pages/Upload';
import { Settings } from '../pages/Settings';

const tabRoute = createBottomTabNavigator();

export function TabRoute() {
  return (
    <tabRoute.Navigator
      initialRouteName="initial"
      tabBarOptions={{
        activeTintColor: '#0A444A',
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 60,
          position: 'absolute',
        }
      }}

    >
      <tabRoute.Screen
        name="upload"
        component={Upload}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Feather
              name="upload"
              color={focused ? color : '#ccc'}
              size={size}
            />
          )
        }}
      />

      <tabRoute.Screen
        name="initial"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Feather
              name="home"
              color={focused ? color : '#ccc'}
              size={size}
            />
          )
        }}
      />

      <tabRoute.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Feather
              name="settings"
              color={focused ? color : '#ccc'}
              size={size}
            />
          )
        }}
      />
    </tabRoute.Navigator>
  )
}