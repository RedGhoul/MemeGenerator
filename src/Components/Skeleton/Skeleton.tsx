import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, ViewStyle } from 'react-native'
import { Colors, Radius } from '@/Constants'

export interface SkeletonProps {
  width?: number | string
  height?: number | string
  borderRadius?: number
  style?: ViewStyle
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = Radius.md,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start()
  }, [animatedValue])

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.gray200, Colors.gray100],
  })

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width: width as any,
          height: height as any,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    />
  )
}

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
})

export default Skeleton
