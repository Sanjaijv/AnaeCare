import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { PredictionProbabilities } from '../../store/slices/predictionSlice';

interface ProbabilityChartProps {
  probabilities: PredictionProbabilities;
}

export default function ProbabilityChart({ probabilities }: ProbabilityChartProps) {
  return (
    <View style={styles.container}>
      <Bar label="Low" value={probabilities.low} color={colors.success} />
      <Bar label="Moderate" value={probabilities.moderate} color={colors.warning} />
      <Bar label="High" value={probabilities.high} color={colors.danger} />
    </View>
  );
}

function Bar({ label, value, color }: { label: string, value: number, color: string }) {
  const percentage = Math.round(value * 100);
  return (
    <View style={styles.barRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.value}>{percentage}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    width: 70,
    color: colors.text,
    fontSize: 14,
  },
  barTrack: {
    flex: 1,
    height: 12,
    backgroundColor: colors.border,
    borderRadius: 6,
    marginHorizontal: spacing.sm,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
  },
  value: {
    width: 40,
    textAlign: 'right',
    color: colors.textSecondary,
    fontSize: 14,
  }
});
