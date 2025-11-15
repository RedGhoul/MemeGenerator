import React from 'react'
import { Pressable, StyleSheet, ViewStyle } from 'react-native'
import { Colors, Radius, Shadows } from '@/Constants'

export interface IconButtonProps {
  icon: React.ReactNode
  onPress: () => void
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'primary' | 'ghost'
  disabled?: boolean
  style?: ViewStyle
  accessibilityLabel?: string
  accessibilityHint?: string
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 'medium',
  variant = 'default',
  disabled = false,
  style,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const getContainerStyle = (pressed: boolean): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.button as ViewStyle]

    // Size styles
    if (size === 'small') baseStyle.push(styles.buttonSmall)
    if (size === 'medium') baseStyle.push(styles.buttonMedium)
    if (size === 'large') baseStyle.push(styles.buttonLarge)

    // Variant styles
    if (variant === 'default') baseStyle.push(styles.buttonDefault)
    if (variant === 'primary') baseStyle.push(styles.buttonPrimary)
    if (variant === 'ghost') baseStyle.push(styles.buttonGhost)

    // State styles
    if (pressed && !disabled) {
      baseStyle.push(styles.buttonPressed)
    }

    if (disabled) baseStyle.push(styles.buttonDisabled)
    if (style) baseStyle.push(style)

    return baseStyle
  }

  return (
    <Pressable
      style={({ pressed }) => getContainerStyle(pressed)}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      {icon}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.round,
  },

  // Size variants
  buttonSmall: {
    width: 36,
    height: 36,
  },

  buttonMedium: {
    width: 48,
    height: 48,
  },

  buttonLarge: {
    width: 56,
    height: 56,
  },

  // Color variants
  buttonDefault: {
    backgroundColor: Colors.gray100,
  },

  buttonPrimary: {
    backgroundColor: Colors.primary,
    ...Shadows.shadow2,
  },

  buttonGhost: {
    backgroundColor: 'transparent',
  },

  // States
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },

  buttonDisabled: {
    opacity: 0.5,
  },
})

export default IconButton
