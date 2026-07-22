import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface DividerProps {
  marginVertical?: number;
  style?: ViewStyle;
}

export function Divider({ marginVertical = spacing.md, style }: DividerProps) {
  return <View style={[styles.divider, { marginVertical }, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.border,
    width: '100%',
  },
});
