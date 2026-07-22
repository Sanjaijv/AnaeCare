import React from 'react';
import { ActivityIndicator, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface LoaderProps {
  message?: string;
  size?: 'small' | 'large';
}

export function Loader({ message = 'Loading...', size = 'large' }: LoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating size={size} color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  message: {
    marginTop: spacing.md,
    color: colors.muted,
  },
});
