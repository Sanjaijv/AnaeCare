import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../hooks/useAuth';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { Loader } from '../../components/common/Loader';
import { Heading, Body } from '../../components/common/Typography';
import { RootStackParamList } from '../../types/navigation';
import { colors } from '../../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  const { restoreSession, loading } = useAuth();

  useEffect(() => {
    const init = async () => {
      const authenticated = await restoreSession();
      navigation.replace(authenticated ? 'Main' : 'Auth');
    };

    init();
  }, [navigation, restoreSession]);

  return (
    <ScreenWrapper style={styles.wrapper}>
      <View style={styles.container}>
        <Heading style={styles.title}>AnaeCare</Heading>
        <Body style={styles.subtitle}>Eye Health & Anemia Awareness</Body>
        <Loader message={loading ? 'Preparing your experience...' : 'Loading...'} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.primary,
    marginBottom: 12,
  },
  subtitle: {
    color: colors.muted,
    marginBottom: 24,
  },
});
