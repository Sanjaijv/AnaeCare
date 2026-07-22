import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageMetadata } from '../../types/camera';

interface ImageState {
  currentImage: ImageMetadata | null;
}

const initialState: ImageState = {
  currentImage: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setCurrentImage: (state, action: PayloadAction<ImageMetadata>) => {
      state.currentImage = action.payload;
    },
    clearCurrentImage: (state) => {
      state.currentImage = null;
    },
    updateImageQuality: (state, action: PayloadAction<number>) => {
      if (state.currentImage) {
        state.currentImage.qualityScore = action.payload;
      }
    },
  },
});

export const { setCurrentImage, clearCurrentImage, updateImageQuality } = imageSlice.actions;
export default imageSlice.reducer;
