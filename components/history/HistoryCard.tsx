import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PredictionHistory } from '../../types/history';
import { spacing, colors, typography } from '../../theme';
import { Card } from '../layout/Card';

interface Props {
  prediction: PredictionHistory;
  index: number;
  totalCount: number;
  onPress: () => void;
}

export function HistoryCard({ prediction, index, totalCount, onPress }: Props) {
  const dateObj = new Date(prediction.timestamp);
  const dateStr = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const scanNumber = totalCount - index; // if sorted descending

  const getRiskColor = () => {
    switch(prediction.riskLevel.toLowerCase()) {
      case 'low': return colors.success;
      case 'moderate': return colors.warning;
      case 'high': return colors.danger;
      default: return colors.textSecondary;
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.scanText}>Scan #{scanNumber}</Text>
        <Text style={styles.dateText}>{dateStr}</Text>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.timeText}>{timeStr}</Text>
          <Text style={[styles.riskText, { color: getRiskColor() }]}>{prediction.riskLevel} Risk</Text>
        </View>
        <View style={styles.rightInfo}>
          <Text style={styles.confidenceText}>{Math.round(prediction.confidence * 100)}%</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  scanText: {
    ...typography.subtitle,
    color: colors.text,
  },
  dateText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  timeText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  riskText: {
    ...typography.title,
  },
  rightInfo: {
    alignItems: 'flex-end',
  },
  confidenceText: {
    ...typography.heading,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    ...typography.body,
    color: colors.primary,
  }
});
