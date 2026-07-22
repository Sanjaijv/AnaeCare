import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

interface PreviewToolbarProps {
  onRetake: () => void;
  onContinue: () => void;
}

export const PreviewToolbar: React.FC<PreviewToolbarProps> = ({ onRetake, onContinue }) => {
  return (
    <View style={styles.container}>
      <Button mode="outlined" onPress={onRetake} style={styles.button}>Retake</Button>
      <Button mode="contained" onPress={onContinue} style={styles.button}>Continue</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  }
});
