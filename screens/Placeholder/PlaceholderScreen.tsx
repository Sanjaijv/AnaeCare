import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const PlaceholderScreen = ({ name, nextRoute }: { name: string, nextRoute?: string }) => {
  const navigation = useNavigation<any>();
  
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">{name}</Text>
      <Text variant="bodyLarge" style={styles.subtitle}>Future Phase Placeholder</Text>
      {nextRoute && (
        <Button mode="contained" onPress={() => navigation.navigate(nextRoute)} style={styles.button}>
          Continue to {nextRoute}
        </Button>
      )}
      <Button mode="outlined" onPress={() => navigation.navigate('MainTabs')} style={styles.button}>
        Back to Home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    marginTop: 10,
    width: '100%',
  }
});
