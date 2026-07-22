import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProfile } from '../../store/slices/profileSlice';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Ionicons } from '@expo/vector-icons';
import { ProfileCard } from '../../components/profile/ProfileCard';
import { HealthInfoCard } from '../../components/profile/HealthInfoCard';
import { SymptomsCard } from '../../components/profile/SymptomsCard';
import { SecondaryButton } from '../../components/layout/SecondaryButton';
import { useAuth } from '../../hooks/useAuth';

type ProfileScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.profile);
  const { logout, loading: authLoading } = useAuth();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const MenuItem = ({ title, icon, onPress }: { title: string; icon: keyof typeof Ionicons.glyphMap; onPress: () => void }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={24} color={colors.primary} />
        <Text style={styles.menuItemTitle}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {loading && !profile ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => dispatch(fetchProfile())}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} activeOpacity={0.8}>
            <ProfileCard
              name={profile?.full_name || ''}
              age={profile?.age || 0}
              gender={profile?.gender || ''}
              photoUrl={profile?.profile_photo}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('HealthProfile')} activeOpacity={0.8}>
            <HealthInfoCard
              healthProfile={profile?.health_profile}
              height={profile?.height || 0}
              weight={profile?.weight || 0}
            />
          </TouchableOpacity>

          <SymptomsCard symptoms={profile?.symptoms || []} />

          <View style={styles.menuSection}>
            <MenuItem title="Edit Profile" icon="person-outline" onPress={() => navigation.navigate('EditProfile')} />
            <MenuItem title="Health Profile" icon="medical-outline" onPress={() => navigation.navigate('HealthProfile')} />
            <MenuItem title="Settings" icon="options-outline" onPress={() => navigation.navigate('Settings')} />
          </View>

          <View style={styles.logoutContainer}>
             <SecondaryButton title="Logout" onPress={() => logout()} loading={authLoading} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.heading,
    color: colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    ...typography.body,
    color: colors.danger,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    ...typography.caption,
    color: colors.surface,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  menuSection: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    ...typography.body,
    color: colors.text,
    marginLeft: 12,
  },
  logoutContainer: {
    marginTop: 24,
    marginBottom: 24,
  }
});
