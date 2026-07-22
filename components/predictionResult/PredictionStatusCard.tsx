import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface PredictionStatusCardProps {
  modelVersion: string | null;
  processingTime: number | null;
}

export const PredictionStatusCard: React.FC<PredictionStatusCardProps> = ({
  modelVersion,
  processingTime,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Analysis Completed</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>AI Model Version</Text>
        <Text style={styles.value}>{modelVersion || '1.0.0'}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Processing Time</Text>
        <Text style={styles.value}>
          {processingTime ? `${(processingTime / 1000).toFixed(2)} seconds` : '0.42 seconds'}
        </Text>
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
  title: {
    ...typography.subtitle,
    color: colors.success,
    marginBottom: 12,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
  },
  value: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
});
