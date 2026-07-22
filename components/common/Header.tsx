import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { colors } from '../../theme/colors';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export function Header({ title, subtitle, onBack, rightAction }: HeaderProps) {
  return (
    <Appbar.Header style={styles.header} elevated>
      {onBack ? <Appbar.BackAction onPress={onBack} /> : null}
      <Appbar.Content title={title} subtitle={subtitle} />
      {rightAction}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.surface,
  },
});
