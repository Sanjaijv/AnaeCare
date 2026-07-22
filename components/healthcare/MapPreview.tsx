import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme';

interface Props {
  latitude: float;
  longitude: float;
}

export const MapPreview: React.FC<Props> = ({ latitude, longitude }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="map-marker-radius" size={48} color={theme.colors.primary} />
      <Text variant="bodyMedium" style={styles.text}>
        Map Preview
      </Text>
      <Text variant="labelSmall" style={styles.subtext}>
        ({latitude.toFixed(4)}, {longitude.toFixed(4)})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    marginTop: 8,
    color: theme.colors.onSurfaceVariant,
  },
  subtext: {
    color: theme.colors.onSurfaceVariant,
    opacity: 0.7,
  }
});
