import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors, Radius, Spacing, Shadows } from '@/Constants'
import { SCREEN_WIDTH } from '@/Utils/common'
import Skeleton from './Skeleton'

const SkeletonMemeCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <Skeleton
        width="100%"
        height="100%"
        borderRadius={Radius.lg}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: (SCREEN_WIDTH - 40) / 2,
    aspectRatio: 1,
    marginHorizontal: Spacing.xs,
    marginBottom: Spacing.sm,
    borderRadius: Radius.lg,
    backgroundColor: Colors.gray100,
    ...Shadows.shadow2,
    overflow: 'hidden',
  },
})

export default SkeletonMemeCard
