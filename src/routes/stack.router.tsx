import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { TabRoute } from './tab.router';

const stackRoute = createStackNavigator();

export default function AppRouter() {
  return (
    <stackRoute.Navigator headerMode="none">
      
      <stackRoute.Screen
        name="Home"
        component={TabRoute}
      />

    </stackRoute.Navigator>
  )
}