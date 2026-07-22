import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { Caption } from './Typography';

export type RiskBadgeVariant = 'low' | 'moderate' | 'high';

interface RiskBadgeProps {
  variant: RiskBadgeVariant;
  label?: string;
}

export function RiskBadge({ variant, label }: RiskBadgeProps) {
  const config = {
    low: { color: colors.success, text: label ?? 'Low Risk' },
    moderate: { color: colors.warning, text: label ?? 'Moderate Risk' },
    high: { color: colors.danger, text: label ?? 'High Risk' },
  }[variant];

  return (
    <View style={[styles.badge, { backgroundColor: `${config.color}15` }]}> 
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Caption style={{ color: config.color }}>{config.text}</Caption>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginRight: spacing.xs,
  },
});
