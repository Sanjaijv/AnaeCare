import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { NotificationSettings } from '../../types/profile';

interface NotificationCardProps {
  settings?: NotificationSettings;
  onToggle: (key: keyof NotificationSettings, value: boolean) => void;
}

export const NotificationCard = ({ settings, onToggle }: NotificationCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Notification Settings</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Daily Health Tips</Text>
        <Switch
          value={settings?.daily_health_tips ?? true}
          onValueChange={(val) => onToggle('daily_health_tips', val)}
          trackColor={{ false: colors.border, true: colors.primary }}
        />
      </View>
      <View style={styles.divider} />
      
      <View style={styles.row}>
        <Text style={styles.label}>Weekly Reminder</Text>
        <Switch
          value={settings?.weekly_reminder ?? true}
          onValueChange={(val) => onToggle('weekly_reminder', val)}
          trackColor={{ false: colors.border, true: colors.primary }}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Monthly Screening Reminder</Text>
        <Switch
          value={settings?.monthly_screening_reminder ?? true}
          onValueChange={(val) => onToggle('monthly_screening_reminder', val)}
          trackColor={{ false: colors.border, true: colors.primary }}
        />
      </View>
      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>Diet Reminder</Text>
        <Switch
          value={settings?.diet_reminder ?? true}
          onValueChange={(val) => onToggle('diet_reminder', val)}
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
  label: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
});
