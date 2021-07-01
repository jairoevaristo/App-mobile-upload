import React from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import { AuthProvider } from './src/hooks/authContext';

import Main from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return <ActivityIndicator color="#000" size={30} />;
  }
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <AuthProvider>
        <Main />
      </AuthProvider>
    </>
  );
}