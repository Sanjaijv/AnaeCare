import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface QualityIssueCardProps {
  description: string;
}

export const QualityIssueCard: React.FC<QualityIssueCardProps> = ({ description }) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <MaterialCommunityIcons name="alert-circle-outline" size={28} color="#f44336" />
        <Text style={styles.text}>{description}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    backgroundColor: '#ffebee',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    color: '#c62828',
    flex: 1,
    fontWeight: '500',
  }
});
