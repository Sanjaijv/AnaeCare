import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { TimelineEntry } from '../../types/history';
import { spacing, colors, typography } from '../../theme';
import { Card } from '../layout/Card';

interface Props {
  entries: TimelineEntry[];
}

export function TrendChart({ entries }: Props) {
  if (!entries || entries.length < 2) {
    return null;
  }

  // Reverse entries so oldest is first (left to right)
  const chartData = [...entries].reverse();

  // Map risk level to a numerical value for charting
  const getRiskValue = (risk: string) => {
    switch(risk.toLowerCase()) {
      case 'low': return 1;
      case 'moderate': return 2;
      case 'high': return 3;
      default: return 0;
    }
  };

  const data = chartData.map(e => getRiskValue(e.riskLevel));
  
  // Format Y-axis labels
  const yAxisFormat = (value: string) => {
    const val = parseInt(value, 10);
    if (val === 1) return 'Low';
    if (val === 2) return 'Mod';
    if (val === 3) return 'High';
    return '';
  };

  const screenWidth = Dimensions.get('window').width - 64; // Adjust for padding

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Risk Trend</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: chartData.map((_, i) => `${i + 1}`),
            datasets: [
              {
                data,
              }
            ]
          }}
          width={screenWidth}
          height={200}
          yAxisLabel=""
          yAxisSuffix=""
          yLabelsOffset={10}
          chartConfig={{
            backgroundColor: colors.surface,
            backgroundGradientFrom: colors.surface,
            backgroundGradientTo: colors.surface,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`, // colors.primary
            labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`, // colors.textSecondary
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: colors.primary
            }
          }}
          formatYLabel={yAxisFormat}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.heading,
    marginBottom: spacing.md,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
