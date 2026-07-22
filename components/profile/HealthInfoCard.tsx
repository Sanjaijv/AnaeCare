import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { HealthProfile } from '../../types/profile';

interface HealthInfoCardProps {
  healthProfile?: HealthProfile;
  height: number;
  weight: number;
}

export const HealthInfoCard = ({ healthProfile, height, weight }: HealthInfoCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Health Information</Text>
      
      <View style={styles.row}>
        <View style={styles.item}>
          <Text style={styles.label}>Height</Text>
          <Text style={styles.value}>{height ? `${height} cm` : 'N/A'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Weight</Text>
          <Text style={styles.value}>{weight ? `${weight} kg` : 'N/A'}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Blood Group</Text>
          <Text style={styles.value}>{healthProfile?.blood_group || 'N/A'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Medical Conditions</Text>
        <Text style={styles.value}>
          {healthProfile?.known_medical_conditions?.length ? healthProfile.known_medical_conditions.join(', ') : 'None reported'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    ...typography.subtitle,
    color: colors.text,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  item: {
    flex: 1,
  },
  section: {
    marginTop: 8,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    ...typography.body,
    color: colors.text,
  },
});
