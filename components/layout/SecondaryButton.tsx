import React from 'react';
import { Button } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';

interface SecondaryButtonProps {
  title?: string;
  label?: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  style?: StyleProp<ViewStyle>;
}

export function SecondaryButton({ title, label, onPress, loading, disabled, icon, style }: SecondaryButtonProps) {
  return (
    <Button mode="outlined" onPress={onPress} loading={loading} disabled={disabled} icon={icon} style={style}>
      {title ?? label ?? 'Cancel'}
    </Button>
  );
}
