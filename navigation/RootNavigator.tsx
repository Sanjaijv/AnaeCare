import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { SplashScreen } from '../screens/Splash/SplashScreen';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { useAppSelector } from '../hooks/useAppSelector';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const loading = useAppSelector((state) => state.auth.loading);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      {!loading && isAuthenticated ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : null}
      {!loading && !isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : null}
    </Stack.Navigator>
  );
}
