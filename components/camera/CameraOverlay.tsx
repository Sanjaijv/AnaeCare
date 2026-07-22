import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export const CameraOverlay = () => {
  return (
    <View style={styles.overlay} pointerEvents="none">
      <View style={styles.topMask} />
      <View style={styles.centerRow}>
        <View style={styles.sideMask} />
        <View style={styles.frame}>
          <Text style={styles.instructionText}>Keep your eye inside the frame</Text>
        </View>
        <View style={styles.sideMask} />
      </View>
      <View style={styles.bottomMask} />
    </View>
  );
};

const maskColor = 'rgba(0, 0, 0, 0.5)';

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill as any, // fallback in case of weird TS errors, though absoluteFill should work
    justifyContent: 'center',
    alignItems: 'center',
  },
  topMask: {
    flex: 1,
    width: '100%',
    backgroundColor: maskColor,
  },
  bottomMask: {
    flex: 1,
    width: '100%',
    backgroundColor: maskColor,
  },
  centerRow: {
    flexDirection: 'row',
    height: 250,
  },
  sideMask: {
    flex: 1,
    backgroundColor: maskColor,
  },
  frame: {
    width: 250,
    height: 250,
    borderColor: '#4CAF50',
    borderWidth: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  instructionText: {
    color: 'white',
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
