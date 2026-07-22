import React, { useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { Caption } from './Typography';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  leftIcon,
  rightIcon,
  containerStyle,
  disabled = false,
}: InputFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        left={leftIcon ? <TextInput.Icon icon={() => leftIcon} /> : undefined}
        right={rightIcon ? <TextInput.Icon icon={() => rightIcon} /> : undefined}
        disabled={disabled}
        style={styles.input}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
      />
      {error ? <Caption style={styles.error}>{error}</Caption> : null}
    </View>
  );
}

interface PasswordInputProps extends Omit<InputFieldProps, 'secureTextEntry' | 'rightIcon'> {
  secureTextEntry?: boolean;
}

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputField
      {...props}
      secureTextEntry={!showPassword}
      rightIcon={<IconButton icon={showPassword ? 'eye-off' : 'eye'} size={20} onPress={() => setShowPassword((value) => !value)} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
  },
  error: {
    marginTop: spacing.xs,
    color: colors.danger,
  },
});
