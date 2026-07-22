import * as SecureStore from 'expo-secure-store';
import { api } from './api';
import { User } from '../types/user';

const AUTH_TOKEN_KEY = 'anaecare_auth_token';
const REFRESH_TOKEN_KEY = 'anaecare_refresh_token';
const USER_ID_KEY = 'anaecare_user_id';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  user: User;
}

export interface RefreshResponse {
  token: string;
  refresh_token: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export const authService = {
  saveTokens: async (token: string, refreshToken: string, userId: string) => {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
    await SecureStore.setItemAsync(USER_ID_KEY, userId);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  
  loadToken: async (): Promise<{ token: string | null; refreshToken: string | null }> => {
    const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    return { token, refreshToken };
  },
  
  clearTokens: async () => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_ID_KEY);
    delete api.defaults.headers.common.Authorization;
  },
  
  register: async (payload: RegisterPayload) => {
    return api.post<RegisterResponse>('/auth/register', payload);
  },
  
  login: async (payload: LoginPayload) => {
    return api.post<LoginResponse>('/auth/login', payload);
  },
  
  refresh: async (refreshToken: string) => {
    return api.post<RefreshResponse>('/auth/refresh', { refresh_token: refreshToken });
  },

  logout: async () => {
    // We attempt to call the backend to invalidate the session.
    // We catch errors to ensure local cleanup still happens even if offline.
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.warn("Backend logout failed, proceeding with local cleanup", e);
    }
  },
  
  fetchProfile: async () => {
    // If there is an actual /auth/me or similar, it would go here.
    // For now we assume the user object comes from the login response, 
    // or we fetch it from a hypothetical profile endpoint.
    // Here we'll return a mock for the standalone profile fetch if needed,
    // though typically the session restore might use the decoded token or a real endpoint.
    return {
      data: {
        id: '1',
        name: 'Restored User',
        email: 'restored@example.com',
        age: 30,
        gender: 'other',
      }
    };
  },
};
