import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface SummaryProps {
  summary: {
    redness: number;
    paleness: number;
    brightness: number;
    contrast: number;
    saturation: number;
    mean_intensity: number;
  };
}

export const FeatureSummary: React.FC<SummaryProps> = ({ summary }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feature Summary</Text>
      <View style={styles.grid}>
        <SummaryItem label="Redness" value={summary.redness} />
        <SummaryItem label="Paleness" value={summary.paleness} />
        <SummaryItem label="Brightness" value={summary.brightness} />
        <SummaryItem label="Contrast" value={summary.contrast} />
        <SummaryItem label="Saturation" value={summary.saturation} />
        <SummaryItem label="Intensity" value={summary.mean_intensity} />
      </View>
    </View>
  );
};

const SummaryItem: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value.toFixed(3)}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: spacing.md,
  },
  title: {
    fontSize: 18,
    fontFamily: typography.fontFamily,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    marginBottom: spacing.sm,
    backgroundColor: colors.background,
    padding: spacing.sm,
    borderRadius: 4,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily,
  },
  value: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: typography.fontFamily,
    marginTop: 2,
  },
});
