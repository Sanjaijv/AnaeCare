import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateProfile } from '../../store/slices/profileSlice';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { EditableField } from '../../components/profile/EditableField';
import { ProfileAvatar } from '../../components/profile/ProfileAvatar';
import { PrimaryButton } from '../../components/layout/PrimaryButton';
import { AppHeader } from '../../components/layout/AppHeader';

export const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    phone_number: '',
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        age: profile.age?.toString() || '',
        gender: profile.gender || '',
        height: profile.height?.toString() || '',
        weight: profile.weight?.toString() || '',
        phone_number: profile.phone_number || '',
      });
    }
  }, [profile]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error on change
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSave = () => {
    const errors: Record<string, string> = {};
    if (!formData.full_name.trim()) errors.full_name = 'Name is required';
    
    const ageNum = parseInt(formData.age, 10);
    if (isNaN(ageNum) || ageNum <= 0) errors.age = 'Age must be > 0';

    const heightNum = parseFloat(formData.height);
    if (isNaN(heightNum) || heightNum <= 0) errors.height = 'Height must be > 0';

    const weightNum = parseFloat(formData.weight);
    if (isNaN(weightNum) || weightNum <= 0) errors.weight = 'Weight must be > 0';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    dispatch(
      updateProfile({
        full_name: formData.full_name,
        age: ageNum,
        gender: formData.gender,
        height: heightNum,
        weight: weightNum,
        phone_number: formData.phone_number || null,
      })
    ).then((action) => {
      if (updateProfile.fulfilled.match(action)) {
        navigation.goBack();
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Edit Profile" />
      
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <ProfileAvatar uri={profile?.profile_photo} onPress={() => {}} />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.formContainer}>
            <EditableField
              label="Full Name"
              value={formData.full_name}
              onChangeText={(text) => handleChange('full_name', text)}
              error={validationErrors.full_name}
            />
            
            <EditableField
              label="Age"
              value={formData.age}
              onChangeText={(text) => handleChange('age', text)}
              keyboardType="number-pad"
              error={validationErrors.age}
            />

            <EditableField
              label="Gender"
              value={formData.gender}
              onChangeText={(text) => handleChange('gender', text)}
              placeholder="e.g., Male, Female, Other"
            />

            <EditableField
              label="Height (cm)"
              value={formData.height}
              onChangeText={(text) => handleChange('height', text)}
              keyboardType="decimal-pad"
              error={validationErrors.height}
            />

            <EditableField
              label="Weight (kg)"
              value={formData.weight}
              onChangeText={(text) => handleChange('weight', text)}
              keyboardType="decimal-pad"
              error={validationErrors.weight}
            />

            <EditableField
              label="Phone Number"
              value={formData.phone_number}
              onChangeText={(text) => handleChange('phone_number', text)}
              keyboardType="phone-pad"
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
           <PrimaryButton title="Save Changes" onPress={handleSave} loading={loading} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  formContainer: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 16,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    textAlign: 'center',
    marginBottom: 16,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  }
});
