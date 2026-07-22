import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { PrimaryButton } from '../layout/PrimaryButton';
import { Body, Title } from './Typography';

interface ErrorViewProps {
  error: string;
  onRetry?: () => void;
}

export function ErrorView({ error, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Something went wrong</Title>
      <Body style={styles.message}>{error}</Body>
      {onRetry ? <PrimaryButton title="Retry" onPress={onRetry} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xxxl,
    alignItems: 'center',
  },
  title: {
    color: colors.danger,
    marginBottom: spacing.sm,
  },
  message: {
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
});
