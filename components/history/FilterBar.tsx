import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { spacing, colors, typography } from '../../theme';

interface Props {
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
}

const FILTERS = ['All', 'Low', 'Moderate', 'High'];

export function FilterBar({ selectedFilter, onSelectFilter }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {FILTERS.map(filter => {
          const isSelected = selectedFilter === filter;
          return (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, isSelected && styles.filterChipSelected]}
              onPress={() => onSelectFilter(filter)}
            >
              <Text style={[styles.filterText, isSelected && styles.filterTextSelected]}>
                {filter === 'All' ? 'All Risks' : `${filter} Risk`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  scrollContent: {
    paddingVertical: spacing.xs,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  filterChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    ...typography.body,
    color: colors.text,
  },
  filterTextSelected: {
    color: '#FFFFFF',
  }
});
