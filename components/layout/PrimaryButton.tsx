import React from 'react';
import { Button } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';

interface PrimaryButtonProps {
  title?: string;
  label?: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  style?: StyleProp<ViewStyle>;
}

export function PrimaryButton({ title, label, onPress, loading, disabled, icon, style }: PrimaryButtonProps) {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      icon={icon}
      style={style}
    >
      {title ?? label ?? 'Continue'}
    </Button>
  );
}
