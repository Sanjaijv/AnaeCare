import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { useAppSelector } from '../../store/hooks';
import { FeatureSummary } from '../../components/feature/FeatureSummary';
import { Header } from '../../components/common/Header';
import { AppButton as Button } from '../../components/buttons/AppButton';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'FeatureReview'>;
};

export default function FeatureReviewScreen({ navigation }: Props) {
  const { summary, featureCount, processingTime } = useAppSelector((state) => state.features);

  return (
    <View style={styles.container}>
      <Header title="Feature Review" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Extraction Success</Text>
          <Text style={styles.subtitle}>Feature Count: {featureCount}</Text>
          <Text style={styles.subtitle}>Processing Time: {processingTime}s</Text>
        </View>

        {summary && <FeatureSummary summary={summary} />}

        <Button 
          label="Continue to Prediction" 
          onPress={() => navigation.navigate('Prediction')} 
          style={styles.button}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.lg,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: typography.fontFamily,
    color: colors.success,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: typography.fontFamily,
    color: colors.text,
    marginBottom: 4,
  },
  button: {
    marginTop: spacing.xl,
  },
});
