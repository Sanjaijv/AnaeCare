import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface EditableFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  error?: string;
}

export const EditableField = ({ label, value, onChangeText, keyboardType = 'default', placeholder, error }: EditableFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { ...typography.caption, color: colors.textSecondary, marginBottom: 8 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    ...typography.body,
    color: colors.text,
  },
  inputError: { borderColor: colors.danger },
  errorText: { ...typography.small, color: colors.danger, marginTop: 4 }
});
