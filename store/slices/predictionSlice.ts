import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ExplanationFeature {
  feature: string;
  impact: string;
  shapValue: number;
}

export interface PredictionProbabilities {
  low: number;
  moderate: number;
  high: number;
}

export interface PredictionState {
  loading: boolean;
  status: string;
  risk: string | null;
  confidence: number | null;
  probabilities: PredictionProbabilities | null;
  explanation: ExplanationFeature[];
  processingTime: number | null;
  modelVersion: string | null;
  error: string | null;
}

const initialState: PredictionState = {
  loading: false,
  status: 'idle',
  risk: null,
  confidence: null,
  probabilities: null,
  explanation: [],
  processingTime: null,
  modelVersion: null,
  error: null,
};

const predictionSlice = createSlice({
  name: 'prediction',
  initialState,
  reducers: {
    startPrediction(state) {
      state.loading = true;
      state.status = 'Preparing Features...';
      state.error = null;
      state.risk = null;
      state.confidence = null;
      state.probabilities = null;
      state.explanation = [];
    },
    updatePredictionStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    predictionSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.status = 'Completed';
      state.risk = action.payload.prediction.risk;
      state.confidence = action.payload.prediction.confidence;
      state.probabilities = action.payload.prediction.probabilities;
      state.explanation = action.payload.prediction.explanation || [];
      state.processingTime = action.payload.processingTime;
      state.modelVersion = action.payload.modelVersion;
    },
    predictionFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.status = 'Error';
      state.error = action.payload;
    },
    resetPrediction(state) {
      return initialState;
    }
  },
});

export const { 
  startPrediction, 
  updatePredictionStatus, 
  predictionSuccess, 
  predictionFailure, 
  resetPrediction 
} = predictionSlice.actions;

export default predictionSlice.reducer;
