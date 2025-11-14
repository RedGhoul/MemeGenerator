import React from 'react'
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native'
import { Colors, Typography, Spacing, Radius, Shadows } from '@/Constants'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps {
  title: string
  onPress: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  style?: ViewStyle
  textStyle?: TextStyle
  accessibilityLabel?: string
  accessibilityHint?: string
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
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
    if (variant === 'primary') baseStyle.push(styles.buttonPrimary)
    if (variant === 'secondary') baseStyle.push(styles.buttonSecondary)
    if (variant === 'outline') baseStyle.push(styles.buttonOutline)
    if (variant === 'ghost') baseStyle.push(styles.buttonGhost)
    if (variant === 'danger') baseStyle.push(styles.buttonDanger)

    // State styles
    if (pressed && !disabled && !loading) {
      if (variant === 'primary') baseStyle.push(styles.buttonPrimaryPressed)
      if (variant === 'danger') baseStyle.push(styles.buttonDangerPressed)
      baseStyle.push(styles.buttonPressed)
    }

    if (disabled || loading) baseStyle.push(styles.buttonDisabled)
    if (fullWidth) baseStyle.push(styles.buttonFullWidth)
    if (style) baseStyle.push(style)

    return baseStyle
  }

  const getTextStyle = (): TextStyle[] => {
    const baseStyle: TextStyle[] = [styles.buttonText as TextStyle]

    // Size text styles
    if (size === 'small') baseStyle.push(styles.buttonTextSmall)

    // Variant text styles
    if (variant === 'primary' || variant === 'danger') {
      baseStyle.push(styles.buttonTextPrimary)
    }
    if (variant === 'secondary' || variant === 'outline') {
      baseStyle.push(styles.buttonTextSecondary)
    }
    if (variant === 'ghost') baseStyle.push(styles.buttonTextGhost)

    if (textStyle) baseStyle.push(textStyle)

    return baseStyle
  }

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={
            variant === 'primary' || variant === 'danger'
              ? Colors.white
              : Colors.primary
          }
        />
      )
    }

    return (
      <View style={styles.contentContainer}>
        {icon && iconPosition === 'left' && (
          <View style={styles.iconLeft}>{icon}</View>
        )}
        <Text style={getTextStyle()}>{title}</Text>
        {icon && iconPosition === 'right' && (
          <View style={styles.iconRight}>{icon}</View>
        )}
      </View>
    )
  }

  return (
    <Pressable
      style={({ pressed }) => getContainerStyle(pressed)}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {renderContent()}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
  },

  // Size variants
  buttonSmall: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 36,
  },

  buttonMedium: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 48,
  },

  buttonLarge: {
    paddingVertical: Spacing.lg - 4,
    paddingHorizontal: Spacing.xl,
    minHeight: 56,
  },

  // Color variants
  buttonPrimary: {
    backgroundColor: Colors.primary,
    ...Shadows.shadow2,
  },

  buttonSecondary: {
    backgroundColor: Colors.gray200,
  },

  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },

  buttonGhost: {
    backgroundColor: 'transparent',
  },

  buttonDanger: {
    backgroundColor: Colors.error,
    ...Shadows.shadow2,
  },

  // Pressed states
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  buttonPrimaryPressed: {
    backgroundColor: Colors.primaryDark,
    ...Shadows.shadow1,
  },

  buttonDangerPressed: {
    backgroundColor: Colors.errorDark,
    ...Shadows.shadow1,
  },

  // Other states
  buttonDisabled: {
    opacity: 0.5,
  },

  buttonFullWidth: {
    width: '100%',
  },

  // Text styles
  buttonText: {
    ...Typography.button,
    textAlign: 'center',
  },

  buttonTextSmall: {
    ...Typography.buttonSmall,
  },

  buttonTextPrimary: {
    color: Colors.white,
  },

  buttonTextSecondary: {
    color: Colors.primary,
  },

  buttonTextGhost: {
    color: Colors.primary,
  },

  // Icon container
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconLeft: {
    marginRight: Spacing.sm,
  },

  iconRight: {
    marginLeft: Spacing.sm,
  },
})

export default Button
