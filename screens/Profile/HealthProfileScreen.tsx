import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateProfile } from '../../store/slices/profileSlice';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { EditableField } from '../../components/profile/EditableField';
import { PrimaryButton } from '../../components/layout/PrimaryButton';
import { AppHeader } from '../../components/layout/AppHeader';
import { HealthProfile } from '../../types/profile';

const AVAILABLE_SYMPTOMS = [
  'Fatigue', 'Weakness', 'Dizziness', 'Headache', 'Pale Skin',
  'Shortness of Breath', 'Cold Hands', 'Chest Pain', 'Rapid Heartbeat'
];

export const HealthProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.profile);

  const [healthProfile, setHealthProfile] = useState<HealthProfile | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [medicalConditionsInput, setMedicalConditionsInput] = useState('');

  useEffect(() => {
    if (profile) {
      setHealthProfile(profile.health_profile);
      setSymptoms(profile.symptoms || []);
      setMedicalConditionsInput(profile.health_profile.known_medical_conditions.join(', '));
    }
  }, [profile]);

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSave = () => {
    if (!healthProfile) return;

    const conditionsArray = medicalConditionsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const updatedHealthProfile = {
      ...healthProfile,
      known_medical_conditions: conditionsArray,
    };

    dispatch(updateProfile({
      health_profile: updatedHealthProfile,
      symptoms: symptoms,
    })).then((action) => {
      if (updateProfile.fulfilled.match(action)) {
        navigation.goBack();
      }
    });
  };

  if (!healthProfile) return null;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Health Profile" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical History</Text>
          <EditableField
            label="Blood Group"
            value={healthProfile.blood_group || ''}
            onChangeText={(text) => setHealthProfile({ ...healthProfile, blood_group: text })}
            placeholder="e.g. O+, A-, B+"
          />
          <EditableField
            label="Known Medical Conditions (Comma separated)"
            value={medicalConditionsInput}
            onChangeText={setMedicalConditionsInput}
            placeholder="e.g. Asthma, Diabetes"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Symptoms</Text>
          <View style={styles.symptomsContainer}>
            {AVAILABLE_SYMPTOMS.map((symptom) => {
              const isSelected = symptoms.includes(symptom);
              return (
                <TouchableOpacity
                  key={symptom}
                  style={[styles.symptomChip, isSelected && styles.symptomChipSelected]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[styles.symptomText, isSelected && styles.symptomTextSelected]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton title="Save Health Info" onPress={handleSave} loading={loading} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: 16,
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomChip: {
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  symptomChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  symptomText: {
    ...typography.caption,
    color: colors.text,
  },
  symptomTextSelected: {
    color: colors.surface,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  }
});
