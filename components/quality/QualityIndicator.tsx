import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface QualityIndicatorProps {
  label: string;
  passed: boolean;
}

export const QualityIndicator: React.FC<QualityIndicatorProps> = ({ label, passed }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons 
        name={passed ? "check-circle" : "close-circle"} 
        size={24} 
        color={passed ? "#4caf50" : "#f44336"} 
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  }
});
