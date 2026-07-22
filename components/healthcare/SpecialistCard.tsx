import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { AppCard as Card } from '../common/AppCard';
import { theme } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  specialist: string;
}

export const SpecialistCard: React.FC<Props> = ({ specialist }) => {
  if (!specialist) return null;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="doctor" size={24} color={theme.colors.primary} />
        <Text variant="titleMedium" style={styles.title}>
          Recommended Specialist
        </Text>
      </View>
      
      <Text variant="bodyMedium" style={styles.text}>
        You should consult a <Text style={styles.specialistText}>{specialist}</Text> for proper diagnosis and treatment.
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  text: {
    color: theme.colors.onSurfaceVariant,
  },
  specialistText: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  }
});
