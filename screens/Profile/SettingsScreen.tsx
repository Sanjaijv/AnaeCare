import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateProfile } from '../../store/slices/profileSlice';
import { colors } from '../../theme/colors';
import { NotificationCard } from '../../components/profile/NotificationCard';
import { PrivacyCard } from '../../components/profile/PrivacyCard';
import { PrimaryButton } from '../../components/layout/PrimaryButton';
import { AppHeader } from '../../components/layout/AppHeader';
import { NotificationSettings, PrivacySettings } from '../../types/profile';

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.profile);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings | null>(null);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings | null>(null);

  useEffect(() => {
    if (profile) {
      setNotificationSettings(profile.notification_settings);
      setPrivacySettings(profile.privacy_settings);
    }
  }, [profile]);

  const handleNotificationToggle = (key: keyof NotificationSettings, value: boolean) => {
    if (notificationSettings) {
      setNotificationSettings({ ...notificationSettings, [key]: value });
    }
  };

  const handlePrivacyToggle = (key: keyof PrivacySettings, value: boolean) => {
    if (privacySettings) {
      setPrivacySettings({ ...privacySettings, [key]: value });
    }
  };

  const handleSave = () => {
    if (notificationSettings && privacySettings) {
      dispatch(updateProfile({
        notification_settings: notificationSettings,
        privacy_settings: privacySettings
      })).then((action) => {
        if (updateProfile.fulfilled.match(action)) {
          navigation.goBack();
        }
      });
    }
  };

  if (!notificationSettings || !privacySettings) return null;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Settings" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <NotificationCard
          settings={notificationSettings}
          onToggle={handleNotificationToggle}
        />
        
        <PrivacyCard
          settings={privacySettings}
          onToggle={handlePrivacyToggle}
        />
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton title="Save Settings" onPress={handleSave} loading={loading} />
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
  footer: {
    padding: 20,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  }
});
