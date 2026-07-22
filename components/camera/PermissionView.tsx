import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';

interface PermissionViewProps {
  message: string;
  onRetry: () => void;
}

export const PermissionView: React.FC<PermissionViewProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message} variant="titleMedium">{message}</Text>
      <Button mode="contained" onPress={onRetry}>Grant Permission</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  message: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  }
});
