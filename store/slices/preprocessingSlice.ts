import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Get backend URL from environment or hardcode for now
const BACKEND_URL = 'http://10.0.2.2:8000/api/v1'; // Emulator default

interface PreprocessingState {
  loading: boolean;
  status: string;
  processedImage: string | null;
  resolution: string | null;
  processingTime: number | null;
  operations: string[];
  error: string | null;
}

const initialState: PreprocessingState = {
  loading: false,
  status: 'idle',
  processedImage: null,
  resolution: null,
  processingTime: null,
  operations: [],
  error: null,
};

// Async thunk for processing the image
export const processImage = createAsyncThunk(
  'preprocessing/processImage',
  async (imageUri: string, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const filename = imageUri.split('/').pop() || 'image.jpg';
      const type = filename.endsWith('.png') ? 'image/png' : 'image/jpeg';
      
      formData.append('image', {
        uri: imageUri,
        name: filename,
        type: type,
      } as any);

      const response = await axios.post(`${BACKEND_URL}/preprocessing/process`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.detail || 'Failed to process image');
      }
      return rejectWithValue('Network error or server is down');
    }
  }
);

const preprocessingSlice = createSlice({
  name: 'preprocessing',
  initialState,
  reducers: {
    resetPreprocessing: (state) => {
      state.loading = false;
      state.status = 'idle';
      state.processedImage = null;
      state.resolution = null;
      state.processingTime = null;
      state.operations = [];
      state.error = null;
    },
    updateStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(processImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'processing';
      })
      .addCase(processImage.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'completed';
        state.processedImage = action.payload.processedImage;
        state.resolution = action.payload.resolution;
        state.processingTime = action.payload.processingTime;
        state.operations = action.payload.operations || [];
      })
      .addCase(processImage.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { resetPreprocessing, updateStatus } = preprocessingSlice.actions;
export default preprocessingSlice.reducer;
