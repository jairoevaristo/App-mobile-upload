import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/authContext';

import { Welcome } from '../pages/Welcome';

import { TabRoute } from './tab.router';

export default function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      { user.token ? <TabRoute /> : <Welcome /> }
    </NavigationContainer>
  )
}