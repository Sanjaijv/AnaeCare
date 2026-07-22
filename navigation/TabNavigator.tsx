import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { HistoryScreen } from '../screens/History/HistoryScreen';
import { DietScreen } from '../screens/Diet/DietScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { BottomTabBar } from '../components/layout/BottomTabBar';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Diet" component={DietScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
