import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface PredictionAnimationProps {
  status: string;
}

export default function PredictionAnimation({ status }: PredictionAnimationProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginBottom: spacing.md,
    transform: [{ scale: 1.5 }],
  },
  status: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
