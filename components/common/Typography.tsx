import React from 'react';
import { StyleProp, StyleSheet, Text as RNText, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface TypographyProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

export function Heading({ children, style, numberOfLines }: TypographyProps) {
  return (
    <Text style={[styles.heading, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

export function Title({ children, style, numberOfLines }: TypographyProps) {
  return (
    <Text style={[styles.title, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

export function Subtitle({ children, style, numberOfLines }: TypographyProps) {
  return (
    <Text style={[styles.subtitle, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

export function Body({ children, style, numberOfLines }: TypographyProps) {
  return (
    <Text style={[styles.body, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

export function Caption({ children, style, numberOfLines }: TypographyProps) {
  return (
    <Text style={[styles.caption, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: typography.fontFamily,
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: typography.fontFamily,
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: typography.fontFamily,
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  body: {
    fontFamily: typography.fontFamily,
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  caption: {
    fontFamily: typography.fontFamily,
    fontSize: 12,
    fontWeight: '500',
    color: colors.muted,
  },
});
