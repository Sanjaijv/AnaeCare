import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { Body, Title } from './Typography';

interface EmptyStateProps {
  title?: string;
  message: string;
}

export function EmptyState({ title = 'Nothing here yet', message }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>{title}</Title>
      <Body style={styles.message}>{message}</Body>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxxl,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  message: {
    textAlign: 'center',
    color: colors.textSecondary,
    maxWidth: 280,
  },
});
