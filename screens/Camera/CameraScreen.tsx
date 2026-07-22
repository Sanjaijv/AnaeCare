import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { useCamera } from '../../hooks/useCamera';
import { useImagePicker } from '../../hooks/useImagePicker';
import { CameraPreview } from '../../components/camera/CameraPreview';
import { CameraOverlay } from '../../components/camera/CameraOverlay';
import { CaptureButton } from '../../components/camera/CaptureButton';
import { PermissionView } from '../../components/camera/PermissionView';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Camera'>;

export default function CameraScreen() {
  const navigation = useNavigation<NavigationProp>();
  const cameraRef = useRef<any>(null);
  
  const {
    permission,
    requestPermission,
    facing,
    flash,
    toggleFlash,
    isCapturing,
    handleCapture
  } = useCamera();

  const { pickImage, isPicking } = useImagePicker();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <PermissionView 
        message="We need your permission to use the camera" 
        onRetry={requestPermission} 
      />
    );
  }

  const onCapture = async () => {
    const imageId = await handleCapture(cameraRef.current);
    if (imageId) {
      navigation.navigate('ImagePreview', { imageId });
    }
  };

  const onGallery = async () => {
    const imageId = await pickImage();
    if (imageId) {
      navigation.navigate('ImagePreview', { imageId });
    }
  };

  const isBusy = isCapturing || isPicking;

  return (
    <View style={styles.container}>
      <CameraPreview facing={facing} flash={flash} ref={cameraRef} />
      <CameraOverlay />
      
      <View style={styles.controlsContainer}>
        <IconButton
          icon="image"
          iconColor="white"
          size={30}
          onPress={onGallery}
          disabled={isBusy}
        />
        <CaptureButton onPress={onCapture} disabled={isBusy} />
        <IconButton
          icon={flash === 'on' ? 'flash' : 'flash-off'}
          iconColor="white"
          size={30}
          onPress={toggleFlash}
          disabled={isBusy}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  }
});
