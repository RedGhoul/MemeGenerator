# MemeGenerator Style & Design System Guide

**Version**: 1.0.0
**Last Updated**: 2025-11-14
**React Native Version**: 0.76.6

---

## Table of Contents

1. [Overview](#overview)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Border Radius & Shapes](#border-radius--shapes)
6. [Shadows & Elevation](#shadows--elevation)
7. [Component Patterns](#component-patterns)
8. [Icons & Images](#icons--images)
9. [Animations & Transitions](#animations--transitions)
10. [Accessibility](#accessibility)
11. [Best Practices](#best-practices)

---

## Overview

### Design Philosophy

The MemeGenerator app follows a **clean, modern, and playful** design language that prioritizes:

- **Simplicity**: Easy-to-use interface with minimal cognitive load
- **Speed**: Fast interactions and instant feedback
- **Fun**: Playful colors and animations that match the meme culture
- **Accessibility**: Inclusive design for all users

### Design Tokens Location

All design tokens are centralized in the `/src/Constants/` directory:

- **Colors**: `src/Constants/Colors.ts`
- **Fonts**: `src/Constants/Fonts.ts`
- **Additional constants** should be added to this directory

---

## Color System

### Brand Colors

```typescript
// Primary Brand Color - Yellow (Meme culture, fun, energetic)
primary: '#fdb622'        // Main brand color
primaryDark: '#e5a41f'    // Hover/pressed states
primaryLight: '#fec84a'   // Subtle backgrounds
```

**Usage**:
- Headers and navigation bars
- Primary call-to-action buttons
- Important highlights and accents
- App logo and branding elements

### Semantic Colors

```typescript
// Success - Green
success: '#52c41a'
successLight: '#b7eb8f'
successDark: '#389e0d'

// Error - Red
error: '#ff4d4f'
errorLight: '#ffa39e'
errorDark: '#cf1322'

// Warning - Orange
warning: '#faad14'
warningLight: '#ffd666'
warningDark: '#d48806'

// Info - Blue
info: '#1890ff'
infoLight: '#91d5ff'
infoDark: '#096dd9'
```

**Usage**:
- **Success**: Successful meme creation, downloads, confirmations
- **Error**: Form validation errors, API failures, alerts
- **Warning**: Cautionary messages, confirmations before destructive actions
- **Info**: Helpful tips, information tooltips, neutral notifications

### Neutral Colors (Grayscale)

```typescript
// Light to Dark spectrum (0-900)
gray50: '#fafafa'    // Lightest backgrounds
gray100: '#f5f5f5'   // Subtle backgrounds
gray200: '#eeeeee'   // Borders, dividers
gray300: '#e0e0e0'   // Inactive borders
gray400: '#bdbdbd'   // Disabled text
gray500: '#9e9e9e'   // Placeholder text
gray600: '#757575'   // Secondary text
gray700: '#616161'   // Body text
gray800: '#424242'   // Dark text
gray900: '#212121'   // Primary text, headings

// Pure colors
white: '#ffffff'
black: '#000000'
```

**Usage**:
- **gray50-100**: Card backgrounds, surface colors
- **gray200-300**: Borders, dividers, input outlines
- **gray400-500**: Disabled states, placeholders
- **gray600-700**: Secondary text, captions
- **gray800-900**: Primary text, headings

### Surface Colors

```typescript
background: '#ffffff'     // Main app background
surface: '#f5f5f5'       // Card/component backgrounds
surfaceElevated: '#ffffff' // Elevated cards (with shadow)
overlay: 'rgba(0, 0, 0, 0.5)' // Modal/bottom sheet overlay
```

### Text Colors

```typescript
textPrimary: '#212121'      // Primary text (headings, important content)
textSecondary: '#757575'    // Secondary text (descriptions, metadata)
textDisabled: '#bdbdbd'     // Disabled text
textInverse: '#ffffff'      // Text on dark backgrounds
textPlaceholder: '#9e9e9e'  // Input placeholders
```

### Color Usage Guidelines

**DO**:
- Use `primary` for main CTAs and brand elements
- Use semantic colors (success, error, etc.) for their intended purposes
- Use gray scale for text hierarchy
- Maintain consistent color meaning across the app

**DON'T**:
- Mix semantic colors (e.g., don't use error red for success states)
- Use pure black (#000) for text (use gray900 instead)
- Hardcode color values in components (always import from Colors.ts)

---

## Typography

### Font Families

The app uses two font families:

**Lato** (Primary - English):
```typescript
LatoRegular: 'Lato-Regular'      // Body text, general content
LatoMedium: 'Lato-Medium'        // Emphasized text
LatoSemiBold: 'Lato-Semibold'    // Subheadings, buttons
LatoBold: 'Lato-Bold'            // Headings, strong emphasis
```

**BeVietnamPro** (Vietnamese Support):
```typescript
BeVietnamProRegular: 'BeVietnamPro-Regular'
BeVietnamProMedium: 'BeVietnamPro-Medium'
BeVietnamProSemiBold: 'BeVietnamPro-SemiBold'
BeVietnamProBold: 'BeVietnamPro-Bold'
BeVietnamProItalic: 'BeVietnamPro-Italic'
```

### Type Scale

```typescript
// Headings
h1: {
  fontFamily: Fonts.LatoBold,
  fontSize: 32,
  lineHeight: 40,
  letterSpacing: -0.5,
  color: Colors.textPrimary,
}

h2: {
  fontFamily: Fonts.LatoBold,
  fontSize: 28,
  lineHeight: 36,
  letterSpacing: -0.3,
  color: Colors.textPrimary,
}

h3: {
  fontFamily: Fonts.LatoBold,
  fontSize: 24,
  lineHeight: 32,
  letterSpacing: 0,
  color: Colors.textPrimary,
}

h4: {
  fontFamily: Fonts.LatoSemiBold,
  fontSize: 20,
  lineHeight: 28,
  letterSpacing: 0.15,
  color: Colors.textPrimary,
}

h5: {
  fontFamily: Fonts.LatoSemiBold,
  fontSize: 18,
  lineHeight: 24,
  letterSpacing: 0.15,
  color: Colors.textPrimary,
}

h6: {
  fontFamily: Fonts.LatoSemiBold,
  fontSize: 16,
  lineHeight: 22,
  letterSpacing: 0.1,
  color: Colors.textPrimary,
}

// Body Text
body1: {
  fontFamily: Fonts.LatoRegular,
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0.5,
  color: Colors.textPrimary,
}

body2: {
  fontFamily: Fonts.LatoRegular,
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.25,
  color: Colors.textSecondary,
}

// Utility Text
subtitle1: {
  fontFamily: Fonts.LatoMedium,
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0.15,
  color: Colors.textPrimary,
}

subtitle2: {
  fontFamily: Fonts.LatoMedium,
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.1,
  color: Colors.textSecondary,
}

caption: {
  fontFamily: Fonts.LatoRegular,
  fontSize: 12,
  lineHeight: 16,
  letterSpacing: 0.4,
  color: Colors.textSecondary,
}

overline: {
  fontFamily: Fonts.LatoMedium,
  fontSize: 10,
  lineHeight: 16,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  color: Colors.textSecondary,
}

// Buttons
button: {
  fontFamily: Fonts.LatoSemiBold,
  fontSize: 16,
  lineHeight: 24,
  letterSpacing: 0.75,
  textTransform: 'uppercase',
  color: Colors.textInverse,
}

buttonSmall: {
  fontFamily: Fonts.LatoSemiBold,
  fontSize: 14,
  lineHeight: 20,
  letterSpacing: 0.5,
  textTransform: 'uppercase',
}
```

### Typography Guidelines

**DO**:
- Use h1-h6 for content hierarchy
- Use body1 for primary content, body2 for secondary
- Use consistent line heights for readability
- Use LatoSemiBold or LatoBold for emphasis

**DON'T**:
- Use more than 3 font sizes on a single screen
- Use font sizes below 12px (except for overline/legal text)
- Mix Lato and BeVietnamPro in the same sentence
- Use italic text for long paragraphs (hard to read on mobile)

---

## Spacing & Layout

### Spacing Scale

Use a consistent 4px base unit spacing system:

```typescript
// Spacing values (multiples of 4)
xs: 4,    // Tight spacing (between related elements)
sm: 8,    // Small spacing (compact lists, grouped items)
md: 16,   // Medium spacing (default spacing between sections)
lg: 24,   // Large spacing (major sections, screen padding)
xl: 32,   // Extra large (screen margins, major separations)
xxl: 48,  // Screen-level spacing
```

### Layout Patterns

**Screen Container**:
```typescript
container: {
  flex: 1,
  backgroundColor: Colors.background,
  paddingHorizontal: Spacing.lg, // 24px
}
```

**Section Spacing**:
```typescript
section: {
  marginBottom: Spacing.xl, // 32px between major sections
}
```

**Card/List Item Spacing**:
```typescript
card: {
  padding: Spacing.md,        // 16px internal padding
  marginBottom: Spacing.md,   // 16px between cards
}
```

**Grid Layouts** (Meme List):
```typescript
gridContainer: {
  paddingHorizontal: Spacing.sm,  // 8px outer padding
}

gridItem: {
  marginHorizontal: Spacing.xs,   // 4px between items
  marginBottom: Spacing.sm,       // 8px vertical spacing
}
```

### Safe Area Handling

Always use `react-native-safe-area-context` for screens:

```typescript
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const insets = useSafeAreaInsets();

<View style={{
  paddingTop: insets.top,
  paddingBottom: insets.bottom,
}}>
```

---

## Border Radius & Shapes

### Radius Scale

```typescript
// Border radius values
radiusNone: 0,     // Sharp corners (inputs, some cards)
radiusSm: 4,       // Subtle rounding (buttons, chips)
radiusMd: 8,       // Medium rounding (cards, inputs)
radiusLg: 12,      // Large rounding (images, featured cards)
radiusXl: 16,      // Extra large (modal corners, special cards)
radiusRound: 999,  // Fully rounded (pills, circular avatars)
```

### Shape Usage

**Buttons**:
- Primary buttons: `radiusMd` (8px)
- Icon buttons: `radiusRound` (circular)
- Pill buttons: `radiusRound` (999px)

**Cards**:
- Standard cards: `radiusLg` (12px)
- Elevated cards: `radiusXl` (16px)
- Meme cards: `radiusLg` (12px)

**Images**:
- Meme thumbnails: `radiusLg` (12px)
- Avatar images: `radiusRound` (circular)
- Full-width images: `radiusMd` (8px) or sharp corners

**Inputs**:
- Text inputs: `radiusMd` (8px)
- Search bars: `radiusRound` (999px)

**Modals & Bottom Sheets**:
- Top corners: `radiusXl` (16px)

---

## Shadows & Elevation

React Native shadow system (iOS) and elevation (Android):

### Shadow Levels

```typescript
// Level 1 - Subtle (Cards, Input focus)
shadow1: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1,
}

// Level 2 - Low (Raised cards, hover states)
shadow2: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
}

// Level 3 - Medium (Floating buttons, selected items)
shadow3: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 4,
}

// Level 4 - High (Modals, drawers)
shadow4: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.2,
  shadowRadius: 16,
  elevation: 8,
}

// Level 5 - Maximum (Dialogs, overlays)
shadow5: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: 0.25,
  shadowRadius: 24,
  elevation: 16,
}
```

### Elevation Guidelines

**DO**:
- Use shadow1 for subtle card separation
- Use shadow2 for standard cards and buttons
- Use shadow3 for floating action buttons
- Use shadow4 for modals and bottom sheets
- Use shadow5 for important dialogs

**DON'T**:
- Use shadows on flat buttons or text-only elements
- Overuse high-level shadows (creates visual noise)
- Use shadows on dark backgrounds (not visible)

---

## Component Patterns

### Buttons

#### Primary Button
```typescript
primaryButton: {
  backgroundColor: Colors.primary,
  paddingVertical: Spacing.md,     // 16px
  paddingHorizontal: Spacing.lg,   // 24px
  borderRadius: Radius.md,         // 8px
  ...shadow2,
}

primaryButtonText: {
  ...Typography.button,
  color: Colors.white,
  textAlign: 'center',
}

// Pressed state
primaryButtonPressed: {
  backgroundColor: Colors.primaryDark,
  ...shadow1, // Reduce shadow on press
}
```

#### Secondary Button
```typescript
secondaryButton: {
  backgroundColor: 'transparent',
  borderWidth: 2,
  borderColor: Colors.primary,
  paddingVertical: Spacing.md - 2,  // Account for border
  paddingHorizontal: Spacing.lg - 2,
  borderRadius: Radius.md,
}

secondaryButtonText: {
  ...Typography.button,
  color: Colors.primary,
  textAlign: 'center',
}
```

#### Icon Button
```typescript
iconButton: {
  width: 48,
  height: 48,
  borderRadius: Radius.round,
  backgroundColor: Colors.gray100,
  alignItems: 'center',
  justifyContent: 'center',
}

// Active/Pressed state
iconButtonPressed: {
  backgroundColor: Colors.gray200,
}
```

#### Disabled State
```typescript
buttonDisabled: {
  opacity: 0.5,
}
```

### Cards

#### Standard Card (Meme Grid Item)
```typescript
memeCard: {
  width: (SCREEN_WIDTH - 40) / 2,  // 2 columns with padding
  aspectRatio: 1,                   // Square cards
  borderRadius: Radius.lg,          // 12px
  backgroundColor: Colors.gray100,
  ...shadow2,
  overflow: 'hidden',
}

// Pressed state
memeCardPressed: {
  opacity: 0.8,
  ...shadow1,
}
```

#### Elevated Card
```typescript
elevatedCard: {
  backgroundColor: Colors.white,
  borderRadius: Radius.xl,          // 16px
  padding: Spacing.md,              // 16px
  marginBottom: Spacing.md,
  ...shadow3,
}
```

### Text Inputs

```typescript
textInput: {
  backgroundColor: Colors.white,
  borderWidth: 1,
  borderColor: Colors.gray300,
  borderRadius: Radius.md,          // 8px
  paddingHorizontal: Spacing.md,    // 16px
  paddingVertical: Spacing.md,      // 16px
  fontSize: 16,
  fontFamily: Fonts.LatoRegular,
  color: Colors.textPrimary,
}

// Focused state
textInputFocused: {
  borderColor: Colors.primary,
  borderWidth: 2,
  ...shadow1,
}

// Error state
textInputError: {
  borderColor: Colors.error,
  borderWidth: 2,
}

// Label
inputLabel: {
  ...Typography.subtitle2,
  marginBottom: Spacing.xs,         // 4px
  color: Colors.textPrimary,
}

// Error message
inputErrorText: {
  ...Typography.caption,
  color: Colors.error,
  marginTop: Spacing.xs,            // 4px
}

// Placeholder color
placeholderTextColor: Colors.textPlaceholder
```

### Headers

#### App Header (Home Screen)
```typescript
header: {
  backgroundColor: Colors.primary,
  paddingTop: statusBarHeight,
  paddingBottom: Spacing.md,        // 16px
  paddingHorizontal: Spacing.lg,    // 24px
  borderBottomLeftRadius: 40,       // Signature rounded bottom
  borderBottomRightRadius: 40,
  alignItems: 'center',
  justifyContent: 'center',
}

headerLogo: {
  width: SCREEN_WIDTH / 2,
  height: 50,
  resizeMode: 'contain',
}
```

#### Navigation Header
```typescript
navigationHeader: {
  backgroundColor: Colors.white,
  height: 56,
  paddingHorizontal: Spacing.md,
  flexDirection: 'row',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: Colors.gray200,
}

headerTitle: {
  ...Typography.h5,
  flex: 1,
  textAlign: 'center',
}
```

### Loading States

#### Spinner
```typescript
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.background,
}

loadingSpinner: {
  size: 'large',
  color: Colors.primary,
}
```

#### Skeleton Loading
```typescript
skeleton: {
  backgroundColor: Colors.gray200,
  borderRadius: Radius.md,
}

// Shimmer animation for skeleton
skeletonShimmer: {
  // Use react-native-animatable or Animated API
  // Animate backgroundColor from gray200 to gray100
}
```

### Empty States

```typescript
emptyStateContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: Spacing.xl,    // 32px
}

emptyStateImage: {
  width: 200,
  height: 200,
  marginBottom: Spacing.lg,         // 24px
  opacity: 0.5,
}

emptyStateTitle: {
  ...Typography.h4,
  textAlign: 'center',
  marginBottom: Spacing.sm,         // 8px
}

emptyStateText: {
  ...Typography.body2,
  textAlign: 'center',
  marginBottom: Spacing.lg,         // 24px
}
```

### Modal/Bottom Sheet

```typescript
modalOverlay: {
  flex: 1,
  backgroundColor: Colors.overlay,  // rgba(0, 0, 0, 0.5)
  justifyContent: 'flex-end',
}

bottomSheet: {
  backgroundColor: Colors.white,
  borderTopLeftRadius: Radius.xl,   // 16px
  borderTopRightRadius: Radius.xl,
  padding: Spacing.lg,              // 24px
  ...shadow5,
}

bottomSheetHandle: {
  width: 40,
  height: 4,
  backgroundColor: Colors.gray300,
  borderRadius: Radius.round,
  alignSelf: 'center',
  marginBottom: Spacing.md,         // 16px
}
```

---

## Icons & Images

### Icon System

**Library**: `react-native-vector-icons` (Ionicons)

**Icon Sizes**:
```typescript
iconSizeXs: 16,   // Small inline icons
iconSizeSm: 20,   // Regular icons
iconSizeMd: 24,   // Standard icons (default)
iconSizeLg: 32,   // Large icons
iconSizeXl: 48,   // Extra large (featured icons)
```

**Icon Colors**:
- Primary actions: `Colors.primary`
- Secondary actions: `Colors.gray600`
- Disabled: `Colors.gray400`
- On dark backgrounds: `Colors.white`

### Image Loading

**Use FastImage** for optimized image loading:
```typescript
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: imageUrl }}
  style={styles.image}
  resizeMode={FastImage.resizeMode.cover}
/>
```

**Loading Placeholder**:
```typescript
imageLoadingPlaceholder: {
  backgroundColor: Colors.gray200,
  alignItems: 'center',
  justifyContent: 'center',
}

// Show loading spinner or blurred placeholder
```

**Image Aspect Ratios**:
- Meme cards: 1:1 (square)
- Header images: 16:9
- Avatars: 1:1 (circular)

---

## Animations & Transitions

### Animation Principles

1. **Duration**: Keep animations short (150-300ms)
2. **Easing**: Use natural easing curves
3. **Purpose**: Animations should guide user attention
4. **Performance**: Use native driver when possible

### Common Animations

#### Button Press
```typescript
// Use Pressable component with scale feedback
<Pressable
  style={({ pressed }) => [
    styles.button,
    pressed && { transform: [{ scale: 0.97 }] }
  ]}
>
```

#### Fade In
```typescript
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  }).start();
}, []);

<Animated.View style={{ opacity: fadeAnim }}>
  {content}
</Animated.View>
```

#### Slide In (Bottom Sheet)
```typescript
const slideAnim = useRef(new Animated.Value(300)).current;

Animated.spring(slideAnim, {
  toValue: 0,
  tension: 50,
  friction: 8,
  useNativeDriver: true,
}).start();

<Animated.View style={{
  transform: [{ translateY: slideAnim }]
}}>
```

### Transition Timing

```typescript
// Animation durations
durationFast: 150,      // Quick feedback (button press)
durationNormal: 250,    // Standard transitions
durationSlow: 400,      // Complex animations, page transitions
```

---

## Accessibility

### Touch Target Sizes

**Minimum touch target**: 44x44 pixels (iOS HIG, Material Design)

```typescript
// Ensure buttons have minimum size
minTouchTarget: {
  minWidth: 44,
  minHeight: 44,
}
```

### Accessibility Labels

Always provide `accessibilityLabel` for interactive elements:

```typescript
<TouchableOpacity
  accessibilityLabel="Create meme with this template"
  accessibilityRole="button"
  accessibilityHint="Opens the meme editor"
>
```

### Color Contrast

**WCAG AA Standard**: Minimum contrast ratio of 4.5:1 for normal text

**Ensure**:
- Text on white: Use gray700+ for readability
- Text on primary yellow: Use white or gray900
- Error text: Use error color (#ff4d4f) on white background

### Screen Reader Support

```typescript
accessibilityRole="button"      // For buttons
accessibilityRole="header"      // For headings
accessibilityRole="image"       // For images
accessibilityRole="text"        // For text content
```

---

## Best Practices

### 1. Component Styling

**DO**:
```typescript
// Use StyleSheet.create() for performance
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  }
});

// Import design tokens
import { Colors, Fonts, Spacing } from '@/Constants';
```

**DON'T**:
```typescript
// Don't use inline styles for static values
<View style={{ backgroundColor: '#ffffff', padding: 16 }}>

// Don't hardcode values
<Text style={{ fontSize: 16, color: '#212121' }}>
```

### 2. Responsive Design

**Use percentage widths and flex**:
```typescript
// Good
container: {
  flex: 1,
  width: '100%',
}

// For grids, calculate based on screen width
import { Dimensions } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

itemWidth: (SCREEN_WIDTH - 40) / 2,  // 2-column grid with padding
```

### 3. Dark Mode Preparation

**Structure styles for future dark mode support**:
```typescript
// Instead of hardcoding
backgroundColor: '#ffffff'

// Use semantic tokens
backgroundColor: Colors.background

// This allows easy theme switching later
```

### 4. Platform-Specific Styling

```typescript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
```

### 5. Performance Optimization

**DO**:
- Use `StyleSheet.create()` for all styles
- Set `useNativeDriver: true` for animations
- Use `React.memo()` for expensive components
- Implement `shouldComponentUpdate` or `useMemo` when needed

**DON'T**:
- Create new style objects in render
- Animate layout properties without native driver
- Re-render entire lists on small changes

---

## Design Checklist

When creating or reviewing components, ensure:

- [ ] Colors imported from `Colors.ts` (no hardcoded hex values)
- [ ] Fonts imported from `Fonts.ts`
- [ ] Spacing uses multiples of 4px
- [ ] Border radius matches design system
- [ ] Touch targets are minimum 44x44px
- [ ] Accessibility labels provided
- [ ] Loading and error states designed
- [ ] Animations use native driver
- [ ] Platform differences handled (iOS/Android)
- [ ] Safe area insets respected
- [ ] Responsive to different screen sizes
- [ ] Follows component patterns from this guide

---

## Quick Reference

### Common Patterns Copy-Paste

**Screen Container**:
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
```

**Primary Button**:
```typescript
<Pressable
  style={({ pressed }) => [
    styles.primaryButton,
    pressed && styles.primaryButtonPressed
  ]}
  onPress={handlePress}
>
  <Text style={styles.primaryButtonText}>Action</Text>
</Pressable>

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonPressed: {
    backgroundColor: Colors.primaryDark,
    elevation: 1,
  },
  primaryButtonText: {
    fontFamily: Fonts.LatoSemiBold,
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
```

**Card**:
```typescript
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
```

**Text Input**:
```typescript
const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: Fonts.LatoMedium,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: Fonts.LatoRegular,
    color: Colors.textPrimary,
  },
});
```

---

**Document Maintainers**: When updating this guide, ensure changes are reflected in `src/Constants/` files and communicated to the development team.

**Version History**:
- **1.0.0** (2025-11-14): Initial design system documentation
