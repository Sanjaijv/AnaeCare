import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface ConfidenceCardProps {
  confidence: number | null;
}

export const ConfidenceCard: React.FC<ConfidenceCardProps> = ({ confidence }) => {
  const confidenceValue = confidence !== null ? Math.round(confidence * 100) : 0;
  
  const getReliability = () => {
    if (confidenceValue >= 85) return 'High';
    if (confidenceValue >= 70) return 'Moderate';
    return 'Low';
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Confidence</Text>
        <Text style={styles.value}>{confidenceValue}%</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.label}>Prediction Reliability</Text>
        <Text style={styles.value}>{getReliability()}</Text>
      </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
  },
  value: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
});
