import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface RiskIndicatorProps {
  risk: string;
}

export default function RiskIndicator({ risk }: RiskIndicatorProps) {
  let bgColor = colors.success;
  if (risk === 'Moderate Risk') bgColor = colors.warning;
  if (risk === 'High Risk') bgColor = colors.danger;

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.text}>{risk}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  }
});
