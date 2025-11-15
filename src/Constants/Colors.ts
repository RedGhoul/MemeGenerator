// MemeGenerator Color System
// Based on style_design.md

const Colors = {
  // Brand Colors - Yellow (Meme culture, fun, energetic)
  primary: '#fdb622',        // Main brand color (yellow)
  primaryDark: '#e5a41f',    // Hover/pressed states
  primaryLight: '#fec84a',   // Subtle backgrounds

  // Semantic Colors
  success: '#52c41a',
  successLight: '#b7eb8f',
  successDark: '#389e0d',

  error: '#ff4d4f',
  errorLight: '#ffa39e',
  errorDark: '#cf1322',

  warning: '#faad14',
  warningLight: '#ffd666',
  warningDark: '#d48806',

  info: '#1890ff',
  infoLight: '#91d5ff',
  infoDark: '#096dd9',

  // Neutral Colors (Grayscale)
  gray50: '#fafafa',
  gray100: '#f5f5f5',
  gray200: '#eeeeee',
  gray300: '#e0e0e0',
  gray400: '#bdbdbd',
  gray500: '#9e9e9e',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',

  // Pure colors
  white: '#ffffff',
  black: '#000000',

  // Surface Colors
  background: '#ffffff',
  surface: '#f5f5f5',
  surfaceElevated: '#ffffff',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Text Colors
  textPrimary: '#212121',
  textSecondary: '#757575',
  textDisabled: '#bdbdbd',
  textInverse: '#ffffff',
  textPlaceholder: '#9e9e9e',

  // Legacy color names (for backward compatibility)
  // Gradually migrate away from these
  backgroundColor: '#000',
  blue: '#1890FF',
  colorE5E5E5: '#E5E5E5',
  colorCDC3C3: '#CDC3C3',
  colorA3A9AC: '#A3A9AC',
  colorD9D9D9: '#D9D9D9',
  yellow: '#fdb622',
}

export default Colors
