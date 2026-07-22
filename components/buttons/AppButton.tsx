import React from 'react';
import { Button } from 'react-native-paper';

interface AppButtonProps {
  label: string;
  onPress: () => void;
  mode?: 'contained' | 'outlined' | 'text';
  style?: object;
}

export function AppButton({ label, onPress, mode = 'contained', style }: AppButtonProps) {
  return (
    <Button mode={mode} onPress={onPress} style={style}>
      {label}
    </Button>
  );
}
