import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface ProcessingStatusProps {
  status: string;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ status }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.statusText, { color: theme.colors.onSurface }]} variant="headlineSmall">
        {status}
      </Text>
      <Text style={[styles.subText, { color: theme.colors.onSurfaceVariant }]} variant="bodyMedium">
        Please wait while we enhance your image.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  statusText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    textAlign: 'center',
  },
});
