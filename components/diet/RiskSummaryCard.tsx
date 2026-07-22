import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Ionicons } from '@expo/vector-icons';

interface RiskSummaryCardProps {
  risk: string;
}

const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case 'low': return colors.success;
    case 'moderate': return colors.warning;
    case 'high': return colors.danger;
    default: return colors.primary;
  }
};

const getRiskMessage = (risk: string) => {
  switch (risk.toLowerCase()) {
    case 'low': return "Maintain your balanced diet.";
    case 'moderate': return "Increase dietary iron and monitor symptoms.";
    case 'high': return "Consult a doctor and increase iron immediately.";
    default: return "Follow healthy dietary habits.";
  }
};

export const RiskSummaryCard: React.FC<RiskSummaryCardProps> = ({ risk }) => {
  const riskColor = getRiskColor(risk);

  return (
    <View style={[styles.card, { borderColor: riskColor }]}>
      <View style={styles.headerRow}>
        <Ionicons name="fitness" size={24} color={riskColor} />
        <Text style={styles.riskTitle}>{risk} Risk Level</Text>
      </View>
      <Text style={styles.recommendationText}>{getRiskMessage(risk)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    marginVertical: spacing.sm,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  riskTitle: {
    ...typography.title,
    color: colors.text,
    marginLeft: spacing.xs,
  },
  recommendationText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
