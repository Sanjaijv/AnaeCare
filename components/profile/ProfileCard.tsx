import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProfileAvatar } from './ProfileAvatar';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface ProfileCardProps {
  name: string;
  age: number;
  gender: string;
  photoUrl?: string | null;
}

export const ProfileCard = ({ name, age, gender, photoUrl }: ProfileCardProps) => {
  return (
    <View style={styles.card}>
      <ProfileAvatar uri={photoUrl} size={80} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name || 'Unknown'}</Text>
        <Text style={styles.details}>{age ? `${age} years` : 'Age not set'} • {gender || 'Gender not set'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    ...typography.title,
    color: colors.text,
    marginBottom: 4,
  },
  details: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
