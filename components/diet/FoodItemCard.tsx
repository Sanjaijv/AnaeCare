import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Ionicons } from '@expo/vector-icons';

interface FoodItemCardProps {
  name: string;
}

export const FoodItemCard: React.FC<FoodItemCardProps> = ({ name }) => {
  return (
    <View style={styles.itemContainer}>
      <Ionicons name="nutrition" size={20} color={colors.primary} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.sm,
    borderRadius: 4,
    marginBottom: spacing.xs,
    width: '48%', // Show 2 per row
  },
  name: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.xs,
  },
});
