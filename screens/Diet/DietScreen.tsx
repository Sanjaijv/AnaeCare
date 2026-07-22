import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  fetchRecommendationsStart,
  fetchRecommendationsSuccess,
  fetchRecommendationsFailure,
} from '../../store/slices/dietSlice';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { API_URL } from '../../constants/api';
import { RiskSummaryCard } from '../../components/diet/RiskSummaryCard';
import { FoodCategoryCard } from '../../components/diet/FoodCategoryCard';
import { FoodItemCard } from '../../components/diet/FoodItemCard';
import { HydrationCard } from '../../components/diet/HydrationCard';
import { LifestyleCard } from '../../components/diet/LifestyleCard';
import { EducationCard } from '../../components/diet/EducationCard';
import { PrimaryButton } from '../../components/layout/PrimaryButton';
import { AppHeader } from '../../components/layout/AppHeader';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';

export function DietScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  
  // Fallback to "Low" risk if no prediction is available yet
  const predictedRisk = useSelector((state: RootState) => state.prediction.risk) || 'Low';

  const { loading, risk, foods, hydration, lifestyle, education, error } = useSelector(
    (state: RootState) => state.diet
  );

  useEffect(() => {
    const fetchRecommendations = async () => {
      dispatch(fetchRecommendationsStart());
      try {
        // Using API_URL configured in constants
        const response = await fetch(`${API_URL}/recommendation/${predictedRisk}`);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const data = await response.json();
        dispatch(fetchRecommendationsSuccess(data));
      } catch (err: any) {
        dispatch(fetchRecommendationsFailure(err.message || 'An error occurred'));
      }
    };

    fetchRecommendations();
  }, [dispatch, predictedRisk]);

  if (loading) {
    return (
      <ScreenWrapper style={styles.wrapper}>
        <AppHeader title="Diet" subtitle="Nutrition guidance" />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Generating personalized recommendations...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  if (error) {
    return (
      <ScreenWrapper style={styles.wrapper}>
        <AppHeader title="Diet" subtitle="Nutrition guidance" />
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <PrimaryButton title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper style={styles.wrapper}>
      <AppHeader title="Diet" subtitle="Nutrition guidance" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {risk && <RiskSummaryCard risk={risk} />}

        {risk?.toLowerCase() === 'high' && (
          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              Disclaimer: These recommendations are educational and not a substitute for diagnosis, treatment, or individualized medical advice. Please consult a qualified healthcare professional.
            </Text>
          </View>
        )}

        {foods && (
          <>
            <FoodCategoryCard title="Iron-Rich Foods">
              {foods.iron.map((food, idx) => (
                <FoodItemCard key={idx} name={food} />
              ))}
            </FoodCategoryCard>
            
            <FoodCategoryCard title="Vitamin C Foods">
              {foods.vitaminC.map((food, idx) => (
                <FoodItemCard key={idx} name={food} />
              ))}
            </FoodCategoryCard>

            <FoodCategoryCard title="Foods to Avoid">
              {foods.avoid.map((food, idx) => (
                <FoodItemCard key={idx} name={food} />
              ))}
            </FoodCategoryCard>
          </>
        )}

        {hydration && hydration.length > 0 && <HydrationCard tips={hydration} />}
        {lifestyle && lifestyle.length > 0 && <LifestyleCard tips={lifestyle} />}
        {education && education.length > 0 && <EducationCard tips={education} />}
        
        <View style={styles.footer}>
          <PrimaryButton 
            title="Return Home" 
            onPress={() => navigation.navigate('Home')} 
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.md,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  loadingText: {
    ...typography.body,
    marginTop: spacing.md,
    color: colors.textSecondary,
  },
  errorText: {
    ...typography.body,
    color: colors.danger,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  disclaimer: {
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderLeftWidth: 4,
    borderColor: colors.danger,
    marginVertical: spacing.sm,
  },
  disclaimerText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  footer: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  }
});
