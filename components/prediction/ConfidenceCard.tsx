import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface ConfidenceCardProps {
  confidence: number;
}

export default function ConfidenceCard({ confidence }: ConfidenceCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>AI Confidence</Text>
      <Text style={styles.value}>{confidence}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  value: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
  }
});
