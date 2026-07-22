import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QualityChecks {
  blur: boolean;
  brightness: boolean;
  contrast: boolean;
  resolution: boolean;
  eyeVisible: boolean;
  conjunctivaVisible: boolean;
}

export interface QualityState {
  imageUri: string | null;
  loading: boolean;
  score: number | null;
  status: 'Idle' | 'Excellent' | 'Acceptable' | 'Reject' | null;
  checks: QualityChecks | null;
  recommendation: string | null;
  error: string | null;
}

const initialState: QualityState = {
  imageUri: null,
  loading: false,
  score: null,
  status: 'Idle',
  checks: null,
  recommendation: null,
  error: null,
};

const qualitySlice = createSlice({
  name: 'quality',
  initialState,
  reducers: {
    setImageUri: (state, action: PayloadAction<string>) => {
      state.imageUri = action.payload;
      state.status = 'Idle';
      state.score = null;
      state.checks = null;
      state.recommendation = null;
      state.error = null;
    },
    startQualityCheck: (state) => {
      state.loading = true;
      state.error = null;
    },
    qualityCheckSuccess: (
      state,
      action: PayloadAction<{ score: number; status: string; checks: QualityChecks; recommendation: string }>
    ) => {
      state.loading = false;
      state.score = action.payload.score;
      state.status = action.payload.status as any;
      state.checks = action.payload.checks;
      state.recommendation = action.payload.recommendation;
    },
    qualityCheckFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetQuality: () => initialState,
  },
});

export const {
  setImageUri,
  startQualityCheck,
  qualityCheckSuccess,
  qualityCheckFailure,
  resetQuality,
} = qualitySlice.actions;

export default qualitySlice.reducer;
