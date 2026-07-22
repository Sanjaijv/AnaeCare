import React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import { RootState } from '../../store/store';
import { Screen } from '../../components/common/Screen';
import { Header } from '../../components/common/Header';
import { MapPreview } from '../../components/healthcare/MapPreview';
import { AppButton } from '../../components/buttons/AppButton';
import { theme } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HospitalDetailsScreen() {
  const navigation = useNavigation();
  const hospital = useSelector((state: RootState) => state.healthcare.selectedHospital);

  if (!hospital) {
    return (
      <Screen>
        <Header title="Hospital Details" onBack={() => navigation.goBack()} />
        <View style={styles.centered}>
          <Text>No hospital selected.</Text>
        </View>
      </Screen>
    );
  }

  const handleCall = () => {
    Linking.openURL(`tel:${hospital.phone}`);
  };

  const handleDirections = () => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`);
  };

  return (
    <Screen>
      <Header title={hospital.name} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <MapPreview latitude={hospital.latitude} longitude={hospital.longitude} />

        <View style={styles.detailsContainer}>
          <Text variant="headlineSmall" style={styles.name}>{hospital.name}</Text>
          
          <View style={styles.row}>
            <MaterialCommunityIcons name="map-marker" size={20} color={theme.colors.onSurfaceVariant} />
            <Text variant="bodyLarge" style={styles.rowText}>{hospital.address}</Text>
          </View>

          {hospital.distance && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="map-marker-distance" size={20} color={theme.colors.onSurfaceVariant} />
              <Text variant="bodyLarge" style={styles.rowText}>{hospital.distance} away</Text>
            </View>
          )}

          <View style={styles.row}>
            <MaterialCommunityIcons name="star" size={20} color="#FFD700" />
            <Text variant="bodyLarge" style={styles.rowText}>{hospital.rating} / 5.0</Text>
          </View>

          <View style={styles.row}>
            <MaterialCommunityIcons name="clock-outline" size={20} color={theme.colors.onSurfaceVariant} />
            <Text variant="bodyLarge" style={styles.rowText}>
              {hospital.open ? 'Open Now' : 'Closed'}
            </Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <AppButton
            label="Call Hospital"
            mode="outlined"
            icon="phone"
            onPress={handleCall}
            style={styles.actionBtn}
          />
          <AppButton
            label="Get Directions"
            mode="contained"
            icon="directions"
            onPress={handleDirections}
            style={styles.actionBtn}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    marginBottom: 24,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  rowText: {
    marginLeft: 12,
    flex: 1,
    color: theme.colors.onSurfaceVariant,
  },
  actionContainer: {
    marginTop: 16,
  },
  actionBtn: {
    marginBottom: 16,
  }
});
