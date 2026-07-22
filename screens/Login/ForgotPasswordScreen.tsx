import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { PrimaryButton } from '../../components/layout/PrimaryButton';
import { Heading, Subtitle, Body } from '../../components/common/Typography';
import { AuthStackParamList } from '../../types/navigation';
import { spacing } from '../../theme/spacing';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen({ navigation }: Props) {
  return (
    <ScreenWrapper style={styles.wrapper} contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Heading>Coming Soon</Heading>
        <Subtitle>Password Reset</Subtitle>
        
        <Body style={styles.text}>
          Password reset functionality will be available in a future update. For now, please remember your password or create a new account if necessary.
        </Body>

        <PrimaryButton 
          title="Back to Login" 
          onPress={() => navigation.goBack()} 
          style={styles.button} 
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  text: {
    textAlign: 'center',
    marginVertical: spacing.xl,
  },
  button: {
    width: '100%',
    marginTop: spacing.md,
  },
});
