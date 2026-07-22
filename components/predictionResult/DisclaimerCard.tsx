import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export const DisclaimerCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>⚠️ Important</Text>
      <Text style={styles.text}>
        AnaeCare is an AI-assisted screening tool. It does not diagnose anemia.
        Consult a healthcare professional for confirmation.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FEF2F2', // Light red/orange background for warning
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  title: {
    ...typography.subtitle,
    color: colors.danger,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    ...typography.body,
    color: '#991B1B', // Dark red text
    lineHeight: 22,
  },
});
