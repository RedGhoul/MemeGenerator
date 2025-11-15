import React, { useState } from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { Colors, Typography, Spacing, Radius, Shadows } from '@/Constants'

export interface InputProps extends TextInputProps {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
  labelStyle?: TextStyle
  maxLength?: number
  showCharacterCount?: boolean
  required?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  maxLength,
  showCharacterCount = false,
  required,
  value = '',
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const getInputContainerStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.inputContainer as ViewStyle]

    if (isFocused && !error) {
      baseStyle.push(styles.inputContainerFocused)
    }

    if (error) {
      baseStyle.push(styles.inputContainerError)
    }

    return baseStyle
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      {/* Input Container */}
      <View style={getInputContainerStyle()}>
        {/* Left Icon */}
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        {/* Text Input */}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : undefined,
            rightIcon ? styles.inputWithRightIcon : undefined,
            inputStyle,
          ]}
          placeholderTextColor={Colors.textPlaceholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          maxLength={maxLength}
          {...textInputProps}
        />

        {/* Right Icon */}
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {/* Helper/Error Text and Character Count */}
      <View style={styles.footerContainer}>
        <View style={styles.messageContainer}>
          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Helper Text */}
          {!error && helperText && (
            <Text style={styles.helperText}>{helperText}</Text>
          )}
        </View>

        {/* Character Count */}
        {showCharacterCount && maxLength && (
          <Text style={styles.characterCount}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },

  // Label
  label: {
    ...Typography.subtitle2,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },

  required: {
    color: Colors.error,
  },

  // Input Container
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    minHeight: 48,
  },

  inputContainerFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
    ...Shadows.shadow1,
  },

  inputContainerError: {
    borderColor: Colors.error,
    borderWidth: 2,
  },

  // Input
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: Colors.textPrimary,
    paddingVertical: Spacing.md - 4,
  },

  inputWithLeftIcon: {
    marginLeft: Spacing.sm,
  },

  inputWithRightIcon: {
    marginRight: Spacing.sm,
  },

  // Icons
  leftIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Footer
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: Spacing.xs,
  },

  messageContainer: {
    flex: 1,
  },

  // Helper/Error Text
  errorText: {
    ...Typography.caption,
    color: Colors.error,
  },

  helperText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  // Character Count
  characterCount: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: Spacing.sm,
  },
})

export default Input
