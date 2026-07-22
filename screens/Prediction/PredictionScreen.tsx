import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppHeader } from '../../components/layout/AppHeader';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { PrimaryButton } from '../../components/layout/PrimaryButton';
import { AppCard } from '../../components/common/AppCard';
import { RiskBadge } from '../../components/common/RiskBadge';
import { Heading, Body } from '../../components/common/Typography';
import { MainStackParamList } from '../../types/navigation';
import { spacing } from '../../theme/spacing';

type Props = NativeStackScreenProps<MainStackParamList, 'Prediction'>;

export function PredictionScreen({ navigation }: Props) {
  return (
    <ScreenWrapper style={styles.wrapper}>
      <AppHeader title="Prediction" subtitle="Review AI insights" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Heading>Prediction Result</Heading>
        <Body style={styles.description}>Prediction output will display here once the model is integrated.</Body>
        <AppCard title="Latest Scan" subtitle="No result available yet">
          <RiskBadge variant="moderate" />
          <Body style={styles.cardBody}>This placeholder card shows how results will appear in the final experience.</Body>
        </AppCard>
        <PrimaryButton title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
  },
  content: {
    flex: 1,
    padding: spacing.xxl,
    justifyContent: 'center',
  },
  description: {
    marginBottom: spacing.lg,
  },
  cardBody: {
    marginTop: spacing.sm,
  },
});
