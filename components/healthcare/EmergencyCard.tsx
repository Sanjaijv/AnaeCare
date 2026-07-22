import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { AppCard as Card } from '../common/AppCard';
import { theme } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  warnings: string[];
}

export const EmergencyCard: React.FC<Props> = ({ warnings }) => {
  if (!warnings || warnings.length === 0) return null;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="alert" size={24} color={theme.colors.error} />
        <Text variant="titleMedium" style={styles.title}>
          Emergency Guidance
        </Text>
      </View>
      
      <Text variant="bodyMedium" style={styles.subtitle}>
        Seek immediate medical attention if you experience:
      </Text>

      <View style={styles.list}>
        {warnings.map((warning, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.bullet} />
            <Text variant="bodyMedium" style={styles.warningText}>
              {warning}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderColor: theme.colors.error,
    borderWidth: 1,
    backgroundColor: theme.colors.errorContainer,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: theme.colors.error,
  },
  subtitle: {
    color: theme.colors.onErrorContainer,
    marginBottom: 8,
    fontWeight: '500',
  },
  list: {
    marginLeft: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.error,
    marginRight: 8,
  },
  warningText: {
    color: theme.colors.onErrorContainer,
  },
});
