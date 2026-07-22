import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  latitude: float;
  longitude: float;
  rating: float;
  open: boolean;
  distance?: string;
}

export interface HealthcareState {
  loading: boolean;
  consultation: any;
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  userLocation: { lat: number; lon: number } | null;
  priority: string;
  error: string | null;
}

const initialState: HealthcareState = {
  loading: false,
  consultation: null,
  hospitals: [],
  selectedHospital: null,
  userLocation: { lat: 13.0827, lon: 80.2707 }, // Default for mock
  priority: 'Routine',
  error: null,
};

export const fetchHealthcareRecommendation = createAsyncThunk(
  'healthcare/fetchRecommendation',
  async ({ riskLevel, lat, lon, hasEmergency }: { riskLevel: string, lat: number, lon: number, hasEmergency?: boolean }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/healthcare/recommendation/${riskLevel}`, {
        params: { lat, lon, has_emergency: hasEmergency }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch healthcare recommendation');
    }
  }
);

const healthcareSlice = createSlice({
  name: 'healthcare',
  initialState,
  reducers: {
    setSelectedHospital: (state, action: PayloadAction<Hospital | null>) => {
      state.selectedHospital = action.payload;
    },
    setUserLocation: (state, action: PayloadAction<{ lat: number; lon: number }>) => {
      state.userLocation = action.payload;
    },
    clearHealthcare: (state) => {
      state.consultation = null;
      state.hospitals = [];
      state.selectedHospital = null;
      state.priority = 'Routine';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHealthcareRecommendation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHealthcareRecommendation.fulfilled, (state, action) => {
        state.loading = false;
        state.consultation = {
          consultationRequired: action.payload.consultationRequired,
          recommendedSpecialist: action.payload.recommendedSpecialist,
          emergencyWarnings: action.payload.emergencyWarnings,
          risk: action.payload.risk
        };
        state.priority = action.payload.priority;
        state.hospitals = action.payload.hospitals;
      })
      .addCase(fetchHealthcareRecommendation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setSelectedHospital, setUserLocation, clearHealthcare } = healthcareSlice.actions;
export default healthcareSlice.reducer;
