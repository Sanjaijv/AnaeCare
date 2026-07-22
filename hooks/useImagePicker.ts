import { useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setCurrentImage } from '../store/slices/imageSlice';
import { pickImageFromGallery } from '../services/imageService';
import { requestGalleryPermissionsAsync } from '../utils/permissions';
import { Alert } from 'react-native';

export const useImagePicker = () => {
  const dispatch = useAppDispatch();
  const [isPicking, setIsPicking] = useState(false);

  const pickImage = async () => {
    setIsPicking(true);
    try {
      const hasPermission = await requestGalleryPermissionsAsync();
      if (!hasPermission) {
        Alert.alert('Permission Required', 'Gallery permission is required to select photos.');
        setIsPicking(false);
        return null;
      }

      const compressedImage = await pickImageFromGallery();
      if (compressedImage) {
        const imageId = Date.now().toString();
        dispatch(setCurrentImage({
          id: imageId,
          ...compressedImage
        }));
        return imageId;
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to pick image');
    } finally {
      setIsPicking(false);
    }
    return null;
  };

  return { pickImage, isPicking };
};
