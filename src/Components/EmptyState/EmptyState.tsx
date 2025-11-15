import React from 'react'
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import { Colors, Typography, Spacing } from '@/Constants'
import { Button } from '@/Components'

export interface EmptyStateProps {
  title: string
  message?: string
  image?: ImageSourcePropType
  actionLabel?: string
  onAction?: () => void
  style?: any
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  image,
  actionLabel,
  onAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {image && <Image source={image} style={styles.image} />}

      <Text style={styles.title}>{title}</Text>

      {message && <Text style={styles.message}>{message}</Text>}

      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          size="medium"
          style={styles.button}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: Spacing.lg,
    opacity: 0.5,
    resizeMode: 'contain',
  },
  title: {
    ...Typography.h4,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  message: {
    ...Typography.body2,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    color: Colors.textSecondary,
  },
  button: {
    marginTop: Spacing.md,
    minWidth: 200,
  },
})

export default EmptyState
