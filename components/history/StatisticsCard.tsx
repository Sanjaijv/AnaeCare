import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HistoryStatistics } from '../../types/history';
import { spacing, colors, typography } from '../../theme';
import { Card } from '../layout/Card';

interface Props {
  statistics: HistoryStatistics | null;
}

export function StatisticsCard({ statistics }: Props) {
  if (!statistics) {
    return null;
  }

  const StatItem = ({ label, value }: { label: string, value: string | number }) => (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Health Statistics</Text>
      <View style={styles.grid}>
        <StatItem label="Total Scans" value={statistics.totalScans} />
        <StatItem label="Most Common" value={statistics.mostCommonRisk || 'N/A'} />
        <StatItem label="Avg. Confidence" value={`${Math.round(statistics.averageConfidence * 100)}%`} />
        
        <StatItem label="Low Risk" value={`${statistics.lowRiskPercent}%`} />
        <StatItem label="Moderate Risk" value={`${statistics.moderateRiskPercent}%`} />
        <StatItem label="High Risk" value={`${statistics.highRiskPercent}%`} />
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '30%',
    marginBottom: spacing.md,
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  statValue: {
    ...typography.title,
    color: colors.primary,
    textAlign: 'center',
  }
});
