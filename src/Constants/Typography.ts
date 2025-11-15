// MemeGenerator Typography System
// Based on style_design.md

import Fonts from './Fonts'
import Colors from './Colors'
import { TextStyle } from 'react-native'

const Typography: { [key: string]: TextStyle } = {
  // Headings
  h1: {
    fontFamily: Fonts.LatoBold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
    color: Colors.textPrimary,
  },

  h2: {
    fontFamily: Fonts.LatoBold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.3,
    color: Colors.textPrimary,
  },

  h3: {
    fontFamily: Fonts.LatoBold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
    color: Colors.textPrimary,
  },

  h4: {
    fontFamily: Fonts.LatoSemiBold,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    color: Colors.textPrimary,
  },

  h5: {
    fontFamily: Fonts.LatoSemiBold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: Colors.textPrimary,
  },

  h6: {
    fontFamily: Fonts.LatoSemiBold,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.1,
    color: Colors.textPrimary,
  },

  // Body Text
  body1: {
    fontFamily: Fonts.LatoRegular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: Colors.textPrimary,
  },

  body2: {
    fontFamily: Fonts.LatoRegular,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
    color: Colors.textSecondary,
  },

  // Utility Text
  subtitle1: {
    fontFamily: Fonts.LatoMedium,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: Colors.textPrimary,
  },

  subtitle2: {
    fontFamily: Fonts.LatoMedium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    color: Colors.textSecondary,
  },

  caption: {
    fontFamily: Fonts.LatoRegular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
    color: Colors.textSecondary,
  },

  overline: {
    fontFamily: Fonts.LatoMedium,
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.textSecondary,
  },

  // Buttons
  button: {
    fontFamily: Fonts.LatoSemiBold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.75,
    textTransform: 'uppercase',
    color: Colors.textInverse,
  },

  buttonSmall: {
    fontFamily: Fonts.LatoSemiBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
}

export default Typography
