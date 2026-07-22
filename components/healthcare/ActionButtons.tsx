import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { AppButton } from '../buttons/AppButton';
import { theme } from '../../theme';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface Props {
  latitude: float;
  longitude: float;
}

export const ActionButtons: React.FC<Props> = ({ latitude, longitude }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleOpenMaps = () => {
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`);
  };

  const handleBackToHome = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <View style={styles.container}>
      <AppButton
        label="Open in Maps"
        mode="contained"
        icon="map"
        onPress={handleOpenMaps}
        style={styles.button}
      />
      <AppButton
        label="Back to Home"
        mode="outlined"
        icon="home"
        onPress={handleBackToHome}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 32,
  },
  button: {
    marginBottom: 12,
  },
});
