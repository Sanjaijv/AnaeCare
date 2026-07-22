import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface FeatureProgressProps {
  status: 'idle' | 'extracting' | 'succeeded' | 'failed';
}

export const FeatureProgress: React.FC<FeatureProgressProps> = ({ status }) => {
  if (status !== 'extracting') return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
