import React, { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';

interface ScreenProps {
  style?: ViewStyle;
}

export function Screen({ children, style }: PropsWithChildren<ScreenProps>) {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F6F4',
  },
});
