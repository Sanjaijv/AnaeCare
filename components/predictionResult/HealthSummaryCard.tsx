import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface HealthSummaryCardProps {
  risk: string | null;
}

export const HealthSummaryCard: React.FC<HealthSummaryCardProps> = ({ risk }) => {
  if (!risk) return null;

  const getSummaryTexts = () => {
    switch (risk.toLowerCase()) {
      case 'low':
        return {
          title: 'Your screening indicates a low risk of anemia.',
          subtitle: 'Continue maintaining a balanced diet.',
        };
      case 'moderate':
        return {
          title: 'Your screening indicates a moderate risk.',
          subtitle: 'Monitoring and dietary improvements are recommended.',
        };
      case 'high':
        return {
          title: 'Your screening indicates a higher risk of anemia.',
          subtitle: 'Please consult a healthcare professional for laboratory testing.',
        };
      default:
        return {
          title: 'Screening result available.',
          subtitle: 'Please consult a healthcare professional for further evaluation.',
        };
    }
  };

  const { title, subtitle } = getSummaryTexts();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background, // Slight contrast from surface
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
