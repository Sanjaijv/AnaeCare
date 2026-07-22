import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { ExplanationFeature } from '../../store/slices/predictionSlice';

interface ExplanationCardProps {
  explanation: ExplanationFeature[];
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({ explanation }) => {
  if (!explanation || explanation.length === 0) return null;

  // The backend should provide non-technical feature names (e.g. "Reduced conjunctival redness")
  // We simply render them as bullet points.
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Possible contributing factors</Text>
      
      <View style={styles.listContainer}>
        {explanation.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemText}>{item.feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: 12,
  },
  listContainer: {
    paddingLeft: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    ...typography.body,
    color: colors.textSecondary,
    marginRight: 8,
    fontWeight: 'bold',
  },
  itemText: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
});
