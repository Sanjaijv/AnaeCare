import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export function AppHeader({ title, subtitle, onBack, rightAction }: AppHeaderProps) {
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
