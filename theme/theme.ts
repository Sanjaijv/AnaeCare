import { DefaultTheme } from 'react-native-paper';
import { colors } from './colors';
import { typography } from './typography';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.success,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    placeholder: colors.muted,
    error: colors.danger,
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: typography.fontFamily,
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: typography.fontFamily,
      fontWeight: '500' as const,
    },
    light: {
      fontFamily: typography.fontFamily,
      fontWeight: '300' as const,
    },
    thin: {
      fontFamily: typography.fontFamily,
      fontWeight: '100' as const,
    },
  },
};
