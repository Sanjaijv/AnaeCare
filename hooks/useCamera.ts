import { useState } from 'react';
import { useCameraPermissions, CameraType, FlashMode } from 'expo-camera';
import { useAppDispatch } from './useAppDispatch';
import { setCurrentImage } from '../store/slices/imageSlice';
import { processCapturedPicture } from '../services/cameraService';
import { Alert } from 'react-native';

export const useCamera = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [isCapturing, setIsCapturing] = useState(false);
  const dispatch = useAppDispatch();

  const toggleFacing = () => setFacing(current => (current === 'back' ? 'front' : 'back'));
  const toggleFlash = () => setFlash(current => (current === 'off' ? 'on' : 'off'));

  const handleCapture = async (cameraRef: any) => {
    if (!cameraRef) return null;
    setIsCapturing(true);
    try {
      const photo = await cameraRef.takePictureAsync({
        quality: 1,
      });
      const compressedImage = await processCapturedPicture(photo);
      const imageId = Date.now().toString();
      
      dispatch(setCurrentImage({
        id: imageId,
        ...compressedImage
      }));
      return imageId;
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to capture image');
      return null;
    } finally {
      setIsCapturing(false);
    }
  };

  return {
    permission,
    requestPermission,
    facing,
    toggleFacing,
    flash,
    toggleFlash,
    isCapturing,
    handleCapture
  };
};
