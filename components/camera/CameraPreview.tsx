import React, { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { CameraView, CameraType, FlashMode } from 'expo-camera';

interface CameraPreviewProps {
  facing: CameraType;
  flash: FlashMode;
}

export const CameraPreview = forwardRef<CameraView, CameraPreviewProps>(
  ({ facing, flash }, ref) => {
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing} flash={flash} ref={ref} />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
