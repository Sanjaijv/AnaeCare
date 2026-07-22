import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../../constants/config';

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Landmark {
  x: number;
  y: number;
}

interface ValidationInfo {
  valid: boolean;
  reason: string | null;
  visibility: number;
  resolution: string;
  blur_score: number | null;
}

interface ConjunctivaState {
  loading: boolean;
  status: 'idle' | 'processing' | 'completed' | 'failed';
  roiImage: string | null;
  roiMask: string | null;
  landmarks: Landmark[];
  boundingBox: BoundingBox | null;
  processingTime: number | null;
  validation: ValidationInfo | null;
  error: string | null;
  statusMessage: string;
}

const initialState: ConjunctivaState = {
  loading: false,
  status: 'idle',
  roiImage: null,
  roiMask: null, // Reserved for future use if segmentation mask needed
  landmarks: [],
  boundingBox: null,
  processingTime: null,
  validation: null,
  error: null,
  statusMessage: 'Ready',
};

// Assuming the image parameter is the local URI of the image to send to backend
export const detectConjunctiva = createAsyncThunk(
  'conjunctiva/detect',
  async (imageUri: string, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: 'eye_image.jpg', // or get from URI
        type: 'image/jpeg',
      } as any);

      const response = await axios.post(`${BACKEND_URL}/api/v1/conjunctiva/detect`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.detail) {
        return rejectWithValue(err.response.data.detail);
      }
      return rejectWithValue(err.message || 'An error occurred during conjunctiva detection');
    }
  }
);

const conjunctivaSlice = createSlice({
  name: 'conjunctiva',
  initialState,
  reducers: {
    updateStatusMessage: (state, action: PayloadAction<string>) => {
      state.statusMessage = action.payload;
    },
    resetConjunctiva: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(detectConjunctiva.pending, (state) => {
        state.loading = true;
        state.status = 'processing';
        state.error = null;
        state.statusMessage = 'Starting detection...';
      })
      .addCase(detectConjunctiva.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        
        if (data.success) {
            state.status = 'completed';
            state.roiImage = data.roiImage;
            state.boundingBox = data.boundingBox;
            state.landmarks = data.landmarks || [];
            state.validation = data.validation;
            state.processingTime = data.processingTime;
            state.statusMessage = 'Conjunctiva detected successfully';
        } else {
            state.status = 'failed';
            state.error = data.error || 'Detection failed for unknown reasons';
            state.statusMessage = 'Detection failed';
        }
      })
      .addCase(detectConjunctiva.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = (action.payload as string) || 'Network error';
        state.statusMessage = 'Detection failed';
      });
  },
});

export const { updateStatusMessage, resetConjunctiva } = conjunctivaSlice.actions;
export default conjunctivaSlice.reducer;
