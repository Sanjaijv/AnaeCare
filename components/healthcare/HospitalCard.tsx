import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Text } from 'react-native-paper';
import { AppCard as Card } from '../common/AppCard';
import { AppButton } from '../buttons/AppButton';
import { theme } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Hospital } from '../../store/slices/healthcareSlice';

interface Props {
  hospital: Hospital;
  onPress?: () => void;
}

export const HospitalCard: React.FC<Props> = ({ hospital, onPress }) => {
  const handleCall = () => {
    Linking.openURL(`tel:${hospital.phone}`);
  };

  const handleDirections = () => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`);
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.name}>{hospital.name}</Text>
        {hospital.distance && (
          <Text variant="labelMedium" style={styles.distance}>
            {hospital.distance}
          </Text>
        )}
      </View>
      
      <View style={styles.detailsRow}>
        <MaterialCommunityIcons name="map-marker" size={16} color={theme.colors.onSurfaceVariant} />
        <Text variant="bodyMedium" style={styles.detailText}>{hospital.address}</Text>
      </View>

      <View style={styles.detailsRow}>
        <MaterialCommunityIcons name="clock-outline" size={16} color={theme.colors.onSurfaceVariant} />
        <Text variant="bodyMedium" style={styles.detailText}>
          {hospital.open ? 'Open Now' : 'Closed'}
        </Text>
      </View>

      <View style={styles.actions}>
        <AppButton
          label="Call"
          mode="outlined"
          icon="phone"
          onPress={handleCall}
          style={styles.actionBtn}
        />
        <AppButton
          label="Directions"
          mode="contained"
          icon="directions"
          onPress={handleDirections}
          style={styles.actionBtn}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    flex: 1,
    fontWeight: 'bold',
  },
  distance: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 8,
    color: theme.colors.onSurfaceVariant,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionBtn: {
    flex: 0.48,
  },
});
