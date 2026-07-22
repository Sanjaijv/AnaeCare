import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { MainStackParamList } from '../../types/navigation';
import { RootState } from '../../store/store';
import { AppHeader } from '../../components/layout/AppHeader';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Card } from '../../components/layout/Card';
import { spacing, colors, typography } from '../../theme';
import { PredictionHistory } from '../../types/history';

type Props = NativeStackScreenProps<MainStackParamList, 'PredictionDetails'>;

export default function PredictionDetailsScreen({ navigation }: Props) {
  const selectedPrediction = useSelector((state: RootState) => state.history.selectedPrediction);

  if (!selectedPrediction) {
    return (
      <ScreenWrapper style={styles.wrapper}>
        <AppHeader title="Prediction Details" onBack={() => navigation.goBack()} />
        <View style={styles.centered}>
          <Text style={styles.errorText}>No prediction selected.</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const p: PredictionHistory = selectedPrediction;
  const d = new Date(p.timestamp);
  
  const getRiskColor = (risk: string) => {
    switch(risk.toLowerCase()) {
      case 'low': return colors.success;
      case 'moderate': return colors.warning;
      case 'high': return colors.danger;
      default: return colors.textSecondary;
    }
  };

  const DetailRow = ({ label, value, valueColor }: { label: string, value: string | number, valueColor?: string }) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, valueColor ? { color: valueColor } : null]}>{value}</Text>
    </View>
  );

  return (
    <ScreenWrapper style={styles.wrapper}>
      <AppHeader title="Prediction Details" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Result Summary</Text>
          <View style={styles.riskContainer}>
            <Text style={[styles.mainRisk, { color: getRiskColor(p.riskLevel) }]}>{p.riskLevel} Risk</Text>
            <Text style={styles.mainConfidence}>{Math.round(p.confidence * 100)}% Confidence</Text>
          </View>
          <DetailRow label="Date" value={d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })} />
          <DetailRow label="Time" value={d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} />
          <DetailRow label="Model Version" value={p.modelVersion} />
          <DetailRow label="Processing Time" value={`${p.processingTime.toFixed(2)}s`} />
        </Card>

        {p.explanation && (
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>AI Explanation</Text>
            <Text style={styles.bodyText}>{p.explanation}</Text>
          </Card>
        )}

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Diet Recommendation</Text>
          <Text style={styles.bodyText}>{p.dietRecommendation || 'Please maintain a balanced diet.'}</Text>
        </Card>
        
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
  },
  content: {
    padding: spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  card: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.heading,
    marginBottom: spacing.md,
    color: colors.text,
  },
  riskContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  mainRisk: {
    ...typography.display,
    marginBottom: spacing.xs,
  },
  mainConfidence: {
    ...typography.subtitle,
    color: colors.textSecondary,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.subtitle,
    color: colors.text,
  },
  bodyText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 24,
  }
});
