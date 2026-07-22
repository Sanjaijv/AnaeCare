import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { authService, LoginPayload, RegisterPayload } from '../services/auth';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { clearUser, setError, setLoading, setToken, setRefreshToken, setUser } from '../store/slices/authSlice';

function getErrorMessage(error: unknown) {
  const err = error as any;

  if (axios.isAxiosError(err)) {
    if (err.response?.data?.detail) return String(err.response.data.detail);
    if (err.response?.data?.message) return String(err.response.data.message);
    if (err.message) return err.message;
  }

  if (err instanceof Error) return err.message;
  return 'Unable to connect to server. Please try again.';
}

export function useAuth() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  // Monitor token expiration and refresh 5 minutes before expiry
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (auth.token && auth.refreshToken) {
      try {
        const decoded = jwtDecode<{ exp: number }>(auth.token);
        const expiresAt = decoded.exp * 1000;
        const timeUntilExpiry = expiresAt - Date.now();
        // 5 minutes before expiry
        const refreshTime = timeUntilExpiry - (5 * 60 * 1000);

        if (refreshTime > 0) {
          timeoutId = setTimeout(() => {
            refreshSession(auth.refreshToken!);
          }, refreshTime);
        } else {
          // It's already within 5 minutes of expiring, refresh now
          refreshSession(auth.refreshToken);
        }
      } catch (e) {
        console.error("Failed to decode token", e);
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [auth.token, auth.refreshToken]);

  const refreshSession = async (currentRefreshToken: string) => {
    try {
      const response = await authService.refresh(currentRefreshToken);
      const { token, refresh_token } = response.data;
      
      // If we had a user id we could save it, but we can decode from new token
      const decoded = jwtDecode<{ sub: string }>(token);
      await authService.saveTokens(token, refresh_token, decoded.sub);
      
      dispatch(setToken(token));
      dispatch(setRefreshToken(refresh_token));
    } catch (e) {
      console.warn("Failed to refresh token", e);
      await logout();
    }
  };

  const restoreSession = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const { token, refreshToken } = await authService.loadToken();
      if (!token || !refreshToken) {
        dispatch(clearUser());
        return false;
      }

      // Check if token is expired
      const decoded = jwtDecode<{ exp: number }>(token);
      if (decoded.exp * 1000 < Date.now()) {
         // Expired, try to refresh
         await refreshSession(refreshToken);
         // If it fails, refreshSession handles logout
         return !!auth.token; 
      }

      const response = await authService.fetchProfile();
      dispatch(setUser(response.data));
      dispatch(setToken(token));
      dispatch(setRefreshToken(refreshToken));
      return true;
    } catch (e) {
      console.error("Restore session failed", e);
      await authService.clearTokens();
      dispatch(clearUser());
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await authService.login(payload);
        const { token, refresh_token, user } = response.data;

        await authService.saveTokens(token, refresh_token, user.id);
        dispatch(setToken(token));
        dispatch(setRefreshToken(refresh_token));
        dispatch(setUser(user));

        return { success: true };
      } catch (error) {
        const message = getErrorMessage(error);
        dispatch(setError(message));
        return { success: false, message };
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch],
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        await authService.register(payload);
        return { success: true };
      } catch (error) {
        const message = getErrorMessage(error);
        dispatch(setError(message));
        return { success: false, message };
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      await authService.logout();
    } finally {
      await authService.clearTokens();
      dispatch(clearUser());
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return {
    ...auth,
    restoreSession,
    login,
    register,
    logout,
  };
}
