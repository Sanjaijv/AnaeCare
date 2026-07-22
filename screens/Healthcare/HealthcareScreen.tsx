import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import { MainStackParamList } from '../../types/navigation';
import { RootState, AppDispatch } from '../../store/store';
import { fetchHealthcareRecommendation, setSelectedHospital } from '../../store/slices/healthcareSlice';
import { Screen } from '../../components/common/Screen';
import { Header } from '../../components/common/Header';
import { ConsultationCard } from '../../components/healthcare/ConsultationCard';
import { HospitalCard } from '../../components/healthcare/HospitalCard';
import { SpecialistCard } from '../../components/healthcare/SpecialistCard';
import { EmergencyCard } from '../../components/healthcare/EmergencyCard';
import { theme } from '../../theme';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function HealthcareScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading,
    consultation,
    hospitals,
    userLocation,
    priority,
    error
  } = useSelector((state: RootState) => state.healthcare);

  const risk = useSelector((state: RootState) => state.prediction.risk);

  useEffect(() => {
    if (userLocation && risk) {
      dispatch(fetchHealthcareRecommendation({
        riskLevel: risk,
        lat: userLocation.lat,
        lon: userLocation.lon,
        hasEmergency: false // Optionally can be derived from user input
      }));
    }
  }, [dispatch, userLocation, risk]);

  const handleHospitalPress = (hospital: any) => {
    dispatch(setSelectedHospital(hospital));
    navigation.navigate('HospitalDetails');
  };

  if (loading) {
    return (
      <Screen>
        <Header title="Doctor Consultation" onBack={() => navigation.goBack()} />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Finding nearby healthcare options...</Text>
        </View>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen>
        <Header title="Doctor Consultation" onBack={() => navigation.goBack()} />
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title="Doctor Consultation" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {consultation && (
          <>
            <ConsultationCard
              riskLevel={consultation.risk}
              priority={priority}
              consultationRequired={consultation.consultationRequired}
            />
            <SpecialistCard specialist={consultation.recommendedSpecialist} />
            <EmergencyCard warnings={consultation.emergencyWarnings || []} />
          </>
        )}

        <Text variant="titleLarge" style={styles.sectionTitle}>
          Nearby Hospitals
        </Text>
        
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              onPress={() => handleHospitalPress(hospital)}
            />
          ))
        ) : (
          <Text style={styles.noHospitalsText}>No nearby hospitals found.</Text>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
    color: theme.colors.onSurfaceVariant,
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
  },
  noHospitalsText: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 16,
  }
});
