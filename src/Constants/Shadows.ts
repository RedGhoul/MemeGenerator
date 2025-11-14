// MemeGenerator Shadow & Elevation System
// Based on style_design.md
// Provides cross-platform shadows (iOS shadowX, Android elevation)

import { ViewStyle } from 'react-native'

const Shadows: { [key: string]: ViewStyle } = {
  // Level 1 - Subtle (Cards, Input focus)
  shadow1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  // Level 2 - Low (Raised cards, hover states)
  shadow2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Level 3 - Medium (Floating buttons, selected items)
  shadow3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  // Level 4 - High (Modals, drawers)
  shadow4: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },

  // Level 5 - Maximum (Dialogs, overlays)
  shadow5: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 16,
  },
}

export default Shadows
