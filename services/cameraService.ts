import { compressImageAsync } from '../utils/imageCompressor';

export const processCapturedPicture = async (picture: any) => {
  const compressed = await compressImageAsync(picture.uri);
  return compressed;
};
