import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface CaptureButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const CaptureButton: React.FC<CaptureButtonProps> = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={styles.outerCircle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={[styles.innerCircle, disabled && styles.disabled]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'white',
  },
  disabled: {
    backgroundColor: '#ccc',
  }
});
