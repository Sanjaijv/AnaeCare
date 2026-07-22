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
import {
  validateAge,
  validateConfirmPassword,
  validateEmail,
  validateGender,
  validateName,
  validatePassword,
} from '../../utils/validators';
import { spacing } from '../../theme/spacing';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { register, loading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleRegister = async () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmError = validateConfirmPassword(password, confirmPassword);
    const ageError = validateAge(age);
    const genderError = validateGender(gender);

    if (nameError || emailError || passwordError || confirmError || ageError || genderError) {
      setFormError(nameError || emailError || passwordError || confirmError || ageError || genderError);
      return;
    }

    const result = await register({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      age: Number(age.trim()),
      gender: gender.trim(),
    });

    if (result.success) {
      navigation.goBack();
    } else {
      setFormError(result.message ?? 'Registration failed. Please try again.');
    }
  };

  return (
    <ScreenWrapper style={styles.wrapper} scrollable contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Heading>Create account</Heading>
        <Subtitle>Register to begin</Subtitle>
        <InputField
          label="Full Name"
          value={name}
          onChangeText={(value) => {
            setName(value);
            setFormError(null);
          }}
        />
        <InputField
          label="Email"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setFormError(null);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <PasswordInput
          label="Password"
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            setFormError(null);
          }}
        />
        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(value) => {
            setConfirmPassword(value);
            setFormError(null);
          }}
        />
        <InputField
          label="Age"
          value={age}
          onChangeText={(value) => {
            setAge(value);
            setFormError(null);
          }}
          keyboardType="numeric"
        />
        <InputField
          label="Gender (Male / Female / Other)"
          value={gender}
          onChangeText={(value) => {
            setGender(value);
            setFormError(null);
          }}
        />
        {formError ? <Body style={styles.errorText}>{formError}</Body> : null}
        {error ? <Body style={styles.errorText}>{error}</Body> : null}
        <PrimaryButton title="Register" onPress={handleRegister} loading={loading} disabled={loading} style={styles.button} />
        <SecondaryButton title="Already have an account" onPress={() => navigation.goBack()} disabled={loading} />
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
  errorText: {
    color: '#B00020',
    marginBottom: spacing.sm,
  },
});
