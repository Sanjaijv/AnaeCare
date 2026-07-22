import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppCard } from '../common/AppCard';
import { Title, Body, Subtitle } from '../common/Typography';
import { PrimaryButton } from '../layout/PrimaryButton';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface PredictionCardProps {
  risk: string;
  message: string;
  date?: string;
  confidence?: string;
  onViewDetails?: () => void;
}

export const PredictionCard: React.FC<PredictionCardProps> = React.memo(({ risk, message, date, confidence, onViewDetails }) => {
  const isPlaceholder = !date;

  return (
    <AppCard style={styles.card}>
      <Title style={styles.headerTitle}>Recent Prediction</Title>
      
      {isPlaceholder ? (
        <View style={styles.placeholderContainer}>
          <Subtitle style={styles.risk}>{risk}</Subtitle>
          <Body style={styles.message}>{message}</Body>
        </View>
      ) : (
        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <Body>Risk Level:</Body>
            <Subtitle style={styles.riskValue}>{risk}</Subtitle>
          </View>
          <View style={styles.row}>
            <Body>Date:</Body>
            <Body style={styles.value}>{date}</Body>
          </View>
          <View style={styles.row}>
            <Body>Confidence:</Body>
            <Body style={styles.value}>{confidence}</Body>
          </View>
          {onViewDetails && (
            <PrimaryButton 
              title="View Details" 
              onPress={onViewDetails} 
              style={styles.button} 
            />
          )}
        </View>
      )}
    </AppCard>
  );
});

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    padding: spacing.md,
    borderRadius: 16,
  },
  headerTitle: {
    fontSize: 18,
    marginBottom: spacing.md,
  },
  placeholderContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  risk: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  message: {
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  riskValue: {
    color: colors.primary,
  },
  value: {
    fontWeight: '500',
    color: colors.text,
  },
  button: {
    marginTop: spacing.md,
  }
});
