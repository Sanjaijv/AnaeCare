import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Ionicons } from '@expo/vector-icons';

interface EducationCardProps {
  tips: string[];
}

export const EducationCard: React.FC<EducationCardProps> = ({ tips }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="book" size={24} color={colors.primary} />
        <Text style={styles.title}>Education</Text>
      </View>
      {tips.map((tip, index) => (
        <View key={index} style={styles.listItem}>
          <View style={styles.bullet} />
          <Text style={styles.text}>{tip}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    marginVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: spacing.sm,
  },
  text: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
});
