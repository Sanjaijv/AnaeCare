import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

export interface CompressedImageResult {
  uri: string;
  width: number;
  height: number;
  size: number;
}

export const compressImageAsync = async (uri: string): Promise<CompressedImageResult> => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [],
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  );

  const fileInfo = await FileSystem.getInfoAsync(result.uri);
  const size = fileInfo.exists && !fileInfo.isDirectory ? fileInfo.size : 0;

  return {
    uri: result.uri,
    width: result.width,
    height: result.height,
    size: size,
  };
};
