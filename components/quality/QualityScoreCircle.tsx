import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper'; // Assuming a ThemeProvider exists, else fallback to standard styles

interface QualityScoreCircleProps {
  score: number;
}

export const QualityScoreCircle: React.FC<QualityScoreCircleProps> = ({ score }) => {
  let color = '#4caf50'; // Excellent
  if (score < 70) color = '#f44336'; // Reject
  else if (score < 85) color = '#ff9800'; // Acceptable

  return (
    <View style={[styles.circle, { borderColor: color }]}>
      <Text style={[styles.score, { color }]}>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  score: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});
