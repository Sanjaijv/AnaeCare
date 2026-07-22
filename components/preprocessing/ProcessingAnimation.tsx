import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from 'react-native-paper';

export const ProcessingAnimation: React.FC = () => {
  const theme = useTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          { borderColor: theme.colors.primary, transform: [{ rotate: spin }] },
        ]}
      />
      <View style={[styles.innerCircle, { backgroundColor: theme.colors.primaryContainer }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    marginVertical: 40,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
  },
});
