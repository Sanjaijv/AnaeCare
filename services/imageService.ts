import * as ImagePicker from 'expo-image-picker';
import { validateImage } from '../utils/imageValidator';
import { compressImageAsync } from '../utils/imageCompressor';

export const pickImageFromGallery = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images',
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    const asset = result.assets[0];
    
    const validation = validateImage(asset.uri, asset.width, asset.height, asset.fileSize);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
    
    const compressed = await compressImageAsync(asset.uri);
    return compressed;
  }
  return null;
};
