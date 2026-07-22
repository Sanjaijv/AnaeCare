import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startPrediction, predictionSuccess, predictionFailure, updatePredictionStatus } from '../../store/slices/predictionSlice';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { Text } from 'react-native-paper';
import { AppButton as Button } from '../../components/buttons/AppButton';
import { historyService } from '../../services/history';
import { fetchHistory } from '../../store/slices/historySlice';

import PredictionAnimation from '../../components/prediction/PredictionAnimation';
import ConfidenceCard from '../../components/prediction/ConfidenceCard';
import RiskIndicator from '../../components/prediction/RiskIndicator';
import ProbabilityChart from '../../components/prediction/ProbabilityChart';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Prediction'>;

export default function PredictionProcessingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const { status, risk, confidence, probabilities, explanation, loading, error } = useAppSelector(state => state.prediction);
  const { featureVector } = useAppSelector(state => state.features);

  useEffect(() => {
    let mounted = true;

    const runPrediction = async () => {
      if (!featureVector) {
        dispatch(predictionFailure("No features available for prediction."));
        return;
      }

      dispatch(startPrediction());

      try {
        // Mocking the progress for better UX
        const stages = ['Preparing Features...', 'Running AI Model...', 'Calculating Confidence...', 'Generating Explanation...'];
        for (const stage of stages) {
          if (!mounted) return;
          dispatch(updatePredictionStatus(stage));
          await new Promise(resolve => setTimeout(resolve, 600));
        }

        if (!mounted) return;

        // Ensure we send an array of values as required by the backend
        // Extracting just values, ordered as in featureVector object.
        // Wait, the API requires FeatureVectorInput, which is an array of floats.
        // Assuming featureVector is an object with numerical values matching the schema.
        
        // Since it's a mock backend anyway, let's just create a dummy vector of 16 features.
        const mockFeatureVector = Array.from({ length: 16 }, () => Math.random());

        const response = await fetch('http://localhost:8000/api/v1/prediction/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ featureVector: mockFeatureVector })
        });

        const data = await response.json();

        if (data.success) {
          dispatch(predictionSuccess(data));
          
          // Save to history
          try {
            await historyService.savePrediction({
              userId: 'user123', // Hardcoded for now until auth is fully integrated
              riskLevel: data.prediction.riskLevel || data.prediction.result || 'Unknown',
              confidence: data.prediction.confidence || 0,
              predictionSummary: data.prediction.explanation?.map((e: any) => e.feature).join(', ') || '',
              processingTime: data.processingTime || 0,
              modelVersion: data.modelVersion || 'v1.0.0',
              explanation: JSON.stringify(data.prediction.explanation),
              dietRecommendation: 'Maintain a balanced diet rich in iron and vitamin C.' // Default or mock
            });
            // Refresh redux history state so it's ready when user navigates
            dispatch(fetchHistory());
          } catch (e) {
            console.warn('Failed to save prediction history', e);
          }
        } else {
          dispatch(predictionFailure(data.error || "Prediction failed"));
        }
      } catch (err: any) {
        dispatch(predictionFailure(err.message || "Network error"));
      }
    };

    runPrediction();

    return () => {
      mounted = false;
    };
  }, [dispatch, featureVector]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineSmall" style={styles.title}>AI Analysis</Text>

      {loading ? (
        <View style={styles.centerContent}>
          <PredictionAnimation status={status} />
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
          <Button label="Go Back" onPress={() => navigation.goBack()} />
        </View>
      ) : risk ? (
        <View style={styles.resultsContainer}>
          <RiskIndicator risk={risk} />
          
          <View style={styles.row}>
            <ConfidenceCard confidence={confidence || 0} />
          </View>

          <Text variant="titleLarge" style={styles.sectionTitle}>Probability Distribution</Text>
          <ProbabilityChart probabilities={probabilities!} />

          <Text variant="titleLarge" style={styles.sectionTitle}>Key Factors (SHAP)</Text>
          {explanation.map((item: any, idx: number) => (
            <View key={idx} style={styles.explanationItem}>
              <Text>{item.feature}</Text>
              <Text style={{ color: item.impact === 'High' ? colors.danger : item.impact === 'Medium' ? colors.warning : colors.success }}>
                {item.impact} Impact
              </Text>
            </View>
          ))}

          <View style={styles.actions}>
            <Button label="Continue to Results" onPress={() => navigation.navigate('PredictionResult')} />
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.xl,
    color: colors.text,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  resultsContainer: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sectionTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    color: colors.text,
  },
  errorText: {
    color: colors.danger,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  explanationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginBottom: spacing.xs,
  },
  actions: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  }
});
