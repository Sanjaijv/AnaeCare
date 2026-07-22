import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Card } from 'react-native-paper';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface AppCardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function AppCard({ title, subtitle, children, onPress, style }: AppCardProps) {
  return (
    <Card mode="elevated" style={[styles.card, style]} onPress={onPress}>
      {title ? <Card.Title title={title} subtitle={subtitle} titleStyle={styles.title} subtitleStyle={styles.subtitle} /> : null}
      {children ? <Card.Content>{children}</Card.Content> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
  title: {
    color: colors.text,
  },
  subtitle: {
    color: colors.textSecondary,
  },
});
