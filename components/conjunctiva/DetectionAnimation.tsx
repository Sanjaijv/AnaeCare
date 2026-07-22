import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, useTheme, ActivityIndicator } from 'react-native-paper';

const MESSAGES = [
  'Locating Eye...',
  'Finding Landmarks...',
  'Extracting Conjunctiva...'
];

export function DetectionAnimation() {
  const theme = useTheme();
  const [messageIndex, setMessageIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();

      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
      }, 300);

    }, 1500);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} style={styles.spinner} />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          {MESSAGES[messageIndex]}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  spinner: {
    marginBottom: 20,
  }
});
