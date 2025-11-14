import React from 'react'
import { View, StyleSheet, Pressable, ViewStyle } from 'react-native'
import { Colors, Spacing, Radius, Shadows } from '@/Constants'

export type CardVariant = 'default' | 'elevated' | 'outlined'

export interface CardProps {
  children: React.ReactNode
  variant?: CardVariant
  onPress?: () => void
  style?: ViewStyle
  contentStyle?: ViewStyle
  disabled?: boolean
  accessibilityLabel?: string
  accessibilityHint?: string
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  onPress,
  style,
  contentStyle,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const getContainerStyle = (pressed: boolean): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.card as ViewStyle]

    // Variant styles
    if (variant === 'default') baseStyle.push(styles.cardDefault)
    if (variant === 'elevated') baseStyle.push(styles.cardElevated)
    if (variant === 'outlined') baseStyle.push(styles.cardOutlined)

    // Pressed state
    if (pressed && onPress && !disabled) {
      baseStyle.push(styles.cardPressed)
    }

    if (style) baseStyle.push(style)

    return baseStyle
  }

  const content = (
    <View style={[styles.cardContent, contentStyle]}>{children}</View>
  )

  if (onPress) {
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
        {content}
      </Pressable>
    )
  }

  return <View style={getContainerStyle(false)}>{content}</View>
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },

  // Variant styles
  cardDefault: {
    backgroundColor: Colors.white,
    ...Shadows.shadow2,
  },

  cardElevated: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.xl,
    ...Shadows.shadow3,
  },

  cardOutlined: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },

  // Content padding
  cardContent: {
    padding: Spacing.md,
  },

  // Pressed state
  cardPressed: {
    opacity: 0.8,
    ...Shadows.shadow1,
  },
})

export default Card
