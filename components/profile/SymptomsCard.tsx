import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface SymptomsCardProps {
  symptoms: string[];
}

export const SymptomsCard = ({ symptoms }: SymptomsCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Reported Symptoms</Text>
      {symptoms && symptoms.length > 0 ? (
        <View style={styles.chipsContainer}>
          {symptoms.map((symptom, index) => (
            <View key={index} style={styles.chip}>
              <Text style={styles.chipText}>{symptom}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.emptyText}>No symptoms reported recently.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: colors.primary + '1A', // 10% opacity primary
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary + '33', // 20% opacity primary
  },
  chipText: {
    ...typography.caption,
    color: colors.primary,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
