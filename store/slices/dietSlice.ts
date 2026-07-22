import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DietState {
  loading: boolean;
  risk: string | null;
  foods: {
    iron: string[];
    vitaminC: string[];
    avoid: string[];
  } | null;
  hydration: string[];
  lifestyle: string[];
  education: string[];
  error: string | null;
}

const initialState: DietState = {
  loading: false,
  risk: null,
  foods: null,
  hydration: [],
  lifestyle: [],
  education: [],
  error: null,
};

const dietSlice = createSlice({
  name: 'diet',
  initialState,
  reducers: {
    fetchRecommendationsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRecommendationsSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.risk = action.payload.risk;
      state.foods = action.payload.foods;
      state.hydration = action.payload.hydration;
      state.lifestyle = action.payload.lifestyle;
      state.education = action.payload.education;
    },
    fetchRecommendationsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearRecommendations(state) {
      state.loading = false;
      state.risk = null;
      state.foods = null;
      state.hydration = [];
      state.lifestyle = [];
      state.education = [];
      state.error = null;
    },
  },
});

export const {
  fetchRecommendationsStart,
  fetchRecommendationsSuccess,
  fetchRecommendationsFailure,
  clearRecommendations,
} = dietSlice.actions;

export default dietSlice.reducer;
