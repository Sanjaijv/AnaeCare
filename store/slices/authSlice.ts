import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  token: null,
  refreshToken: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setRefreshToken(state, action: PayloadAction<string | null>) {
      state.refreshToken = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading, setToken, setRefreshToken, setError } = authSlice.actions;
export default authSlice.reducer;
