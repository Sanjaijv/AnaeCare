import React, { PropsWithChildren } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';

interface SafeAreaWrapperProps {
  style?: ViewStyle;
}

export function SafeAreaWrapper({ children, style }: PropsWithChildren<SafeAreaWrapperProps>) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, style]} edges={['top', 'bottom']}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
