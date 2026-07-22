import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { PrivacySettings } from '../../types/profile';

interface PrivacyCardProps {
  settings?: PrivacySettings;
  onToggle: (key: keyof PrivacySettings, value: boolean) => void;
}

export const PrivacyCard = ({ settings, onToggle }: PrivacyCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Privacy Settings</Text>
      
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Store Images</Text>
          <Text style={styles.description}>Save eye images locally on device</Text>
        </View>
        <Switch
          value={settings?.store_images ?? false}
          onValueChange={(val) => onToggle('store_images', val)}
          trackColor={{ false: colors.border, true: colors.primary }}
        />
      </View>
      <View style={styles.divider} />
      
      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Store Prediction History</Text>
          <Text style={styles.description}>Keep a history of anemia screenings</Text>
        </View>
        <Switch
          value={settings?.store_prediction_history ?? true}
          onValueChange={(val) => onToggle('store_prediction_history', val)}
          trackColor={{ false: colors.border, true: colors.primary }}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Share Anonymous Data</Text>
          <Text style={styles.description}>Help improve AnaeCare by sharing anonymized health data</Text>
        </View>
        <Switch
          value={settings?.share_anonymous_data ?? false}
          onValueChange={(val) => onToggle('share_anonymous_data', val)}
          trackColor={{ false: colors.border, true: colors.primary }}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Allow Analytics</Text>
          <Text style={styles.description}>Send crash reports and usage statistics</Text>
        </View>
        <Switch
          value={settings?.allow_analytics ?? true}
          onValueChange={(val) => onToggle('allow_analytics', val)}
          trackColor={{ false: colors.border, true: colors.primary }}
        />
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
    alignItems: 'center',
    paddingVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  labelContainer: {
    flex: 1,
    paddingRight: 16,
  },
  label: {
    ...typography.body,
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    ...typography.small,
    color: colors.textSecondary,
  },
});
