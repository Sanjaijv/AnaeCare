import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface RiskCardProps {
  risk: string | null;
}

export const RiskCard: React.FC<RiskCardProps> = ({ risk }) => {
  const getRiskConfig = () => {
    switch (risk?.toLowerCase()) {
      case 'low':
        return { color: colors.success, label: 'LOW RISK', icon: '🟢' };
      case 'moderate':
        return { color: colors.warning, label: 'MODERATE RISK', icon: '🟠' };
      case 'high':
        return { color: colors.danger, label: 'HIGH RISK', icon: '🔴' };
      default:
        return { color: colors.textSecondary, label: 'UNKNOWN RISK', icon: '⚪' };
    }
  };

  const config = getRiskConfig();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Prediction Result</Text>
      <View style={styles.riskContainer}>
        <Text style={styles.icon}>{config.icon}</Text>
        <Text style={[styles.riskLabel, { color: config.color }]}>
          {config.label}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    ...typography.subtitle,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  riskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  riskLabel: {
    ...typography.title,
    fontWeight: 'bold',
  },
});
