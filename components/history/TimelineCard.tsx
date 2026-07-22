import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TimelineEntry } from '../../types/history';
import { spacing, colors, typography } from '../../theme';
import { Card } from '../layout/Card';

interface Props {
  entries: TimelineEntry[];
}

export function TimelineCard({ entries }: Props) {
  if (!entries || entries.length === 0) {
    return null;
  }

  const getRiskColor = (risk: string) => {
    switch(risk.toLowerCase()) {
      case 'low': return colors.success;
      case 'moderate': return colors.warning;
      case 'high': return colors.danger;
      default: return colors.textSecondary;
    }
  };

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Timeline</Text>
      <View style={styles.timelineContainer}>
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1;
          const d = new Date(entry.timestamp);
          return (
            <View key={entry.predictionId} style={styles.entryRow}>
              <View style={styles.leftCol}>
                <Text style={styles.dateText}>
                  {d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </Text>
                <Text style={styles.timeText}>
                  {d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                </Text>
              </View>
              <View style={styles.middleCol}>
                <View style={[styles.dot, { backgroundColor: getRiskColor(entry.riskLevel) }]} />
                {!isLast && <View style={styles.line} />}
              </View>
              <View style={styles.rightCol}>
                <Text style={[styles.riskText, { color: getRiskColor(entry.riskLevel) }]}>
                  {entry.riskLevel} Risk
                </Text>
                <Text style={styles.confidenceText}>
                  {Math.round(entry.confidence * 100)}% Confidence
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.heading,
    marginBottom: spacing.md,
  },
  timelineContainer: {
    marginTop: spacing.sm,
  },
  entryRow: {
    flexDirection: 'row',
  },
  leftCol: {
    width: 60,
    alignItems: 'flex-end',
    paddingRight: spacing.md,
  },
  dateText: {
    ...typography.caption,
    color: colors.text,
  },
  timeText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  middleCol: {
    alignItems: 'center',
    width: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 1,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginTop: -2,
    marginBottom: -2,
    zIndex: 0,
  },
  rightCol: {
    flex: 1,
    paddingLeft: spacing.md,
    paddingBottom: spacing.lg,
  },
  riskText: {
    ...typography.subtitle,
  },
  confidenceText: {
    ...typography.body,
    color: colors.textSecondary,
  }
});
