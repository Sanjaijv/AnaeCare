import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { AppCard as Card } from '../common/AppCard';
import { theme } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  riskLevel: string;
  priority: string;
  consultationRequired: boolean;
}

export const ConsultationCard: React.FC<Props> = ({ riskLevel, priority, consultationRequired }) => {
  const getPriorityColor = () => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return theme.colors.error;
      case 'recommended':
        return theme.colors.warning;
      default:
        return theme.colors.success;
    }
  };

  const getIcon = () => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return 'alert-circle';
      case 'recommended':
        return 'information';
      default:
        return 'check-circle';
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons name={getIcon()} size={24} color={getPriorityColor()} />
        <Text variant="titleMedium" style={[styles.title, { color: getPriorityColor() }]}>
          Consultation Priority: {priority}
        </Text>
      </View>
      
      <Text variant="bodyMedium" style={styles.text}>
        {consultationRequired 
          ? 'Based on your recent prediction, we strongly recommend consulting a healthcare professional for a complete assessment and laboratory testing.'
          : 'No immediate medical consultation is required. Continue maintaining a healthy lifestyle.'}
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
    marginBottom: 12,
  },
  title: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  text: {
    color: theme.colors.onSurfaceVariant,
  },
});
