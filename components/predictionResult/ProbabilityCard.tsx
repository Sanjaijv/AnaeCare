import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface ProbabilityCardProps {
  probabilities: {
    low: number;
    moderate: number;
    high: number;
  } | null;
}

export const ProbabilityCard: React.FC<ProbabilityCardProps> = ({ probabilities }) => {
  if (!probabilities) return null;

  const getPercentage = (value: number) => Math.round(value * 100);

  const renderBar = (label: string, value: number, color: string) => {
    const percentage = getPercentage(value);
    
    return (
      <View style={styles.barContainer}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${percentage}%`, backgroundColor: color }]} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Risk Probability</Text>
      
      {renderBar('Low Risk', probabilities.low, colors.success)}
      {renderBar('Moderate Risk', probabilities.moderate, colors.warning)}
      {renderBar('High Risk', probabilities.high, colors.danger)}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: 16,
  },
  barContainer: {
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
  },
  percentage: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  track: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});
