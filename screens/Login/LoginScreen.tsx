import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { PrimaryButton } from '../../components/layout/PrimaryButton';
import { SecondaryButton } from '../../components/layout/SecondaryButton';
import { InputField, PasswordInput } from '../../components/common/InputField';
import { Heading, Subtitle, Body } from '../../components/common/Typography';
import { useAuth } from '../../hooks/useAuth';
import { AuthStackParamList } from '../../types/navigation';
import { validateEmail, validatePassword } from '../../utils/validators';
import { spacing } from '../../theme/spacing';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleLogin = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setFormError(emailError || passwordError);
      return;
    }

    const result = await login({ email: email.trim(), password });
    if (result.success) {
      setFormError(null);
      return;
    }

    setFormError(result.message ?? 'Login failed. Please try again.');
  };

  return (
    <ScreenWrapper style={styles.wrapper} scrollable contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Heading>Welcome back</Heading>
        <Subtitle>Sign in to continue</Subtitle>
        <InputField
          label="Email"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setFormError(null);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          error={undefined}
        />
        <PasswordInput
          label="Password"
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            setFormError(null);
          }}
        />
        <View style={styles.forgotPasswordContainer}>
          <SecondaryButton 
            title="Forgot Password?" 
            onPress={() => navigation.navigate('ForgotPassword')} 
            disabled={loading} 
            style={styles.forgotPasswordButton} 
          />
        </View>
        {formError ? <Body style={styles.errorText}>{formError}</Body> : null}
        {error ? <Body style={styles.errorText}>{error}</Body> : null}
        <PrimaryButton title="Login" onPress={handleLogin} loading={loading} disabled={loading} style={styles.button} />
        <SecondaryButton title="Create account" onPress={() => navigation.navigate('Register')} disabled={loading} />
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
  },
  button: {
    marginBottom: spacing.sm,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: spacing.sm,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
    minHeight: 0,
    borderWidth: 0,
  },
  errorText: {
    color: '#B00020',
    marginBottom: spacing.sm,
  },
});
