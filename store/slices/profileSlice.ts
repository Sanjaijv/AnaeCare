import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
// API_URL will be used later
import { Profile, ProfileUpdate } from '../../types/profile';

// We might need to replace API_URL if it's imported differently
// Let's use a generic API client or constants later, for now we will hardcode or use the usual setup
// Actually I'll use process.env.EXPO_PUBLIC_API_URL or what's standard in the app. Let's just define it inline if not sure.
// Let's check where the API_URL is defined later.

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://10.0.2.2:8000/api/v1/profile');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData: ProfileUpdate, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const currentProfile = state.profile.profile;
      
      const payload = {
        ...currentProfile,
        ...profileData,
      };

      const response = await axios.put('http://10.0.2.2:8000/api/v1/profile', payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to update profile');
    }
  }
);

export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (profileData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://10.0.2.2:8000/api/v1/profile', profileData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to create profile');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;
