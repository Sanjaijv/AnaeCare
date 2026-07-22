import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppCard } from '../common/AppCard';
import { Title, Body } from '../common/Typography';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface HealthTipCardProps {
  tip: string;
}

export const HealthTipCard: React.FC<HealthTipCardProps> = React.memo(({ tip }) => {
  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="bulb" size={24} color={colors.warning} />
        <Title style={styles.title}>Health Tip</Title>
      </View>
      <Body style={styles.tipText}>{tip}</Body>
    </AppCard>
  );
});

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xxxl,
    padding: spacing.md,
    backgroundColor: `${colors.warning}10`,
    borderColor: `${colors.warning}30`,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    marginLeft: spacing.sm,
    marginBottom: 0,
    fontSize: 18,
    color: colors.text,
  },
  tipText: {
    lineHeight: 22,
    color: colors.textSecondary,
  },
});
