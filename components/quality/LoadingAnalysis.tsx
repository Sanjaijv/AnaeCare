import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

export const LoadingAnalysis = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" animating={true} />
      <Text style={styles.text}>Analyzing image quality...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
  }
});
