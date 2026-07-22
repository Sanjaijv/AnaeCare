import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function DetectionStatus() {
  const theme = useTheme();
  const { status, error, validation, landmarks } = useSelector((state: RootState) => state.conjunctiva);

  const getStatusColor = () => {
    if (status === 'failed') return theme.colors.error;
    if (status === 'completed' && validation?.valid) return '#4caf50'; // Green
    if (status === 'completed' && !validation?.valid) return '#ff9800'; // Orange
    return theme.colors.primary;
  };

  const getStatusIcon = () => {
    if (status === 'failed') return 'alert-circle';
    if (status === 'completed' && validation?.valid) return 'check-circle';
    if (status === 'completed' && !validation?.valid) return 'alert';
    return 'information';
  };

  if (status === 'idle' || status === 'processing') return null;

  return (
    <Surface style={[styles.container, { borderLeftColor: getStatusColor() }]} elevation={2}>
      <View style={styles.header}>
        <MaterialCommunityIcons name={getStatusIcon()} size={24} color={getStatusColor()} />
        <Text variant="titleMedium" style={[styles.title, { color: getStatusColor() }]}>
          {status === 'completed' ? (validation?.valid ? 'Detection Successful' : 'Validation Failed') : 'Detection Error'}
        </Text>
      </View>
      
      {status === 'failed' && error && (
        <Text variant="bodyMedium" style={{ color: theme.colors.error, marginTop: 8 }}>
          {error}
        </Text>
      )}

      {status === 'completed' && (
        <View style={styles.details}>
          <Text variant="bodySmall">Face Landmarks: {landmarks.length > 0 ? 'Detected' : 'Not Detected'}</Text>
          <Text variant="bodySmall">ROI Valid: {validation?.valid ? 'Yes' : 'No'}</Text>
          {validation?.reason && (
             <Text variant="bodySmall" style={{color: '#ff9800'}}>{validation.reason}</Text>
          )}
        </View>
      )}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  details: {
    marginTop: 8,
  }
});
