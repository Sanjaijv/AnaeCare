import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { MainStackParamList } from '../../types/navigation';
import { Screen } from '../../components/common/Screen';
import { Header } from '../../components/common/Header';

import { PredictionStatusCard } from '../../components/predictionResult/PredictionStatusCard';
import { RiskCard } from '../../components/predictionResult/RiskCard';
import { ConfidenceCard } from '../../components/predictionResult/ConfidenceCard';
import { ProbabilityCard } from '../../components/predictionResult/ProbabilityCard';
import { ExplanationCard } from '../../components/predictionResult/ExplanationCard';
import { HealthSummaryCard } from '../../components/predictionResult/HealthSummaryCard';
import { DisclaimerCard } from '../../components/predictionResult/DisclaimerCard';
import { ActionButtons } from '../../components/predictionResult/ActionButtons';
import { resetPrediction } from '../../store/slices/predictionSlice';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function PredictionResultScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();

  const {
    risk,
    confidence,
    probabilities,
    explanation,
    processingTime,
    modelVersion,
  } = useSelector((state: RootState) => state.prediction);

  const handleScanAgain = () => {
    dispatch(resetPrediction());
    navigation.navigate('Camera');
  };

  const handleViewDiet = () => {
    // Navigate to Diet when it exists, for now just log or no-op
    // In actual implementation, we might navigate to TabNavigator -> Diet
    // To navigate to a nested stack: navigation.navigate('MainTabs', { screen: 'Diet' });
    // Assuming MainTabs is set up correctly in MainNavigator.
    // We'll leave it as a no-op if diet is not defined in MainStackParamList.
  };

  const handleViewHistory = () => {
    // Navigate to History when it exists
  };

  const handleViewHealthcare = () => {
    navigation.navigate('Healthcare');
  };

  return (
    <Screen>
      <Header title="Prediction Result" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <PredictionStatusCard
          modelVersion={modelVersion}
          processingTime={processingTime}
        />
        <RiskCard risk={risk} />
        <ConfidenceCard confidence={confidence} />
        <ProbabilityCard probabilities={probabilities} />
        <ExplanationCard explanation={explanation} />
        <HealthSummaryCard risk={risk} />
        <DisclaimerCard />
        <ActionButtons
          onScanAgain={handleScanAgain}
          onViewDiet={handleViewDiet}
          onViewHistory={handleViewHistory}
          onViewHealthcare={handleViewHealthcare}
          risk={risk}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
});
