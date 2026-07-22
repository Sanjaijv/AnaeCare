import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera'; // If needed for legacy permission check

export const requestGalleryPermissionsAsync = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === 'granted';
};

export const checkGalleryPermissionsAsync = async () => {
  const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  return status === 'granted';
};
