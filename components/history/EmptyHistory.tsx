import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, colors, typography } from '../../theme';

interface Props {
  title?: string;
  message?: string;
}

export function EmptyHistory({ 
  title = "No screening history found.", 
  message = "Complete your first anemia screening to begin tracking your health." 
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  }
});
