import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppHeader } from '../../components/layout/AppHeader';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { WelcomeCard } from '../../components/dashboard/WelcomeCard';
import { QuickActionCard } from '../../components/dashboard/QuickActionCard';
import { PredictionCard } from '../../components/dashboard/PredictionCard';
import { HealthTipCard } from '../../components/dashboard/HealthTipCard';
import { FloatingScanButton } from '../../components/dashboard/FloatingScanButton';

import { BottomTabParamList, MainStackParamList } from '../../types/navigation';
import { DASHBOARD_CONSTANTS, getRandomHealthTip } from '../../constants/dashboard';
import { spacing } from '../../theme/spacing';

type Props = BottomTabScreenProps<BottomTabParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const stackNavigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [refreshing, setRefreshing] = useState(false);
  const [healthTip, setHealthTip] = useState('');

  // Initialize random health tip
  useEffect(() => {
    setHealthTip(getRandomHealthTip());
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      setHealthTip(getRandomHealthTip());
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleQuickAction = (route: string) => {
    if (route === 'History' || route === 'Diet') {
      // These are bottom tab routes based on specs
      navigation.navigate(route as keyof BottomTabParamList);
    } else {
      // These are stack routes
      stackNavigation.navigate(route as never);
    }
  };

  const navigateToCamera = () => {
    stackNavigation.navigate('Camera');
  };

  const navigateToPredictionDetails = () => {
    stackNavigation.navigate('Prediction');
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <AppHeader title="AnaeCare" subtitle="Home dashboard" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <WelcomeCard 
          name={DASHBOARD_CONSTANTS.USER_PLACEHOLDER} 
          greetingSubtitle={DASHBOARD_CONSTANTS.GREETING_SUBTITLE}
        />

        <View style={styles.quickActionsContainer}>
          {DASHBOARD_CONSTANTS.QUICK_ACTIONS.map((action) => (
            <QuickActionCard
              key={action.id}
              title={action.title}
              subtitle={action.subtitle}
              icon={action.icon as any}
              onPress={() => handleQuickAction(action.route)}
            />
          ))}
        </View>

        <PredictionCard 
          risk={DASHBOARD_CONSTANTS.PREDICTION_PLACEHOLDER.risk}
          message={DASHBOARD_CONSTANTS.PREDICTION_PLACEHOLDER.message}
          // Intentionally leaving out date/confidence to trigger placeholder state
        />

        {healthTip ? <HealthTipCard tip={healthTip} /> : null}
      </ScrollView>

      <FloatingScanButton onPress={navigateToCamera} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // Padding for the floating button
  },
  quickActionsContainer: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
});
