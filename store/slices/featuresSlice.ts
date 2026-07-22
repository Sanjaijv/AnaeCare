import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeatureSummary {
  redness: number;
  paleness: number;
  brightness: number;
  contrast: number;
  saturation: number;
  mean_intensity: number;
}

interface FeatureVector {
  rgb: number[];
  hsv: number[];
  lab: number[];
  redness: number;
  paleness: number;
  brightness: number;
  texture: number[];
  statistics: number[];
  normalized_vector: number[];
}

export interface FeaturesState {
  loading: boolean;
  status: 'idle' | 'extracting' | 'succeeded' | 'failed';
  featureVector: FeatureVector | null;
  summary: FeatureSummary | null;
  featureCount: number | null;
  processingTime: number | null;
  error: string | null;
}

const initialState: FeaturesState = {
  loading: false,
  status: 'idle',
  featureVector: null,
  summary: null,
  featureCount: null,
  processingTime: null,
  error: null,
};

const featuresSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    startExtraction: (state) => {
      state.loading = true;
      state.status = 'extracting';
      state.error = null;
    },
    extractionSuccess: (state, action: PayloadAction<{
      featureVector: FeatureVector;
      summary: FeatureSummary;
      featureCount: number;
      processingTime: number;
    }>) => {
      state.loading = false;
      state.status = 'succeeded';
      state.featureVector = action.payload.featureVector;
      state.summary = action.payload.summary;
      state.featureCount = action.payload.featureCount;
      state.processingTime = action.payload.processingTime;
      state.error = null;
    },
    extractionFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.status = 'failed';
      state.error = action.payload;
    },
    resetFeatures: () => initialState,
  },
});

export const { startExtraction, extractionSuccess, extractionFailure, resetFeatures } = featuresSlice.actions;

export default featuresSlice.reducer;
