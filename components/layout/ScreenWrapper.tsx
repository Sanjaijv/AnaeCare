import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, ViewStyle, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface ScreenWrapperProps {
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollable?: boolean;
  backgroundColor?: string;
  padding?: number;
}

export function ScreenWrapper({
  children,
  style,
  contentContainerStyle,
  scrollable = false,
  backgroundColor = colors.background,
  padding = spacing.xl,
}: PropsWithChildren<ScreenWrapperProps>) {
  const content = (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor, padding }]}
    >
      {children}
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }, style]} edges={['top', 'bottom']}>
      {scrollable ? (
        <ScrollView contentContainerStyle={[styles.scrollContent, contentContainerStyle]} keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
