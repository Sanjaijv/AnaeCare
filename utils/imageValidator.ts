export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateImage = (
  uri: string,
  width: number,
  height: number,
  fileSize?: number
): ValidationResult => {
  const lowerUri = uri.toLowerCase();
  
  if (!lowerUri.endsWith('.jpg') && !lowerUri.endsWith('.jpeg') && !lowerUri.endsWith('.png')) {
    // Some picked images might not have extension in URI, but we'll enforce if it does
    if (lowerUri.includes('.')) {
      const ext = lowerUri.split('.').pop();
      if (ext && !['jpg', 'jpeg', 'png'].includes(ext)) {
        return { isValid: false, error: 'Invalid file format. Only JPG and PNG are supported.' };
      }
    }
  }

  if (fileSize && fileSize > 10 * 1024 * 1024) {
    return { isValid: false, error: 'Image is too large. Maximum size is 10 MB.' };
  }

  if (width < 720 || height < 720) {
    return { isValid: false, error: 'Image resolution is too low. Minimum is 720 x 720.' };
  }

  const aspectRatio = width / height;
  if (aspectRatio < 0.8 || aspectRatio > 1.2) {
    console.warn('Image aspect ratio is not 1:1. Recommended 1:1');
  }

  return { isValid: true };
};
