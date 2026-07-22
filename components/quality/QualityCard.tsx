import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { QualityScoreCircle } from './QualityScoreCircle';

interface QualityCardProps {
  score: number;
  status: string;
}

export const QualityCard: React.FC<QualityCardProps> = ({ score, status }) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <QualityScoreCircle score={score} />
        <Text variant="headlineSmall" style={styles.status}>{status}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    padding: 16,
  },
  status: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});
