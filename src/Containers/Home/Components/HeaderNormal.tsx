import { StyleSheet, TextStyle, View, ViewStyle, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { goBack } from '@/Navigators/utils'
import { Colors, Spacing, Typography } from '@/Constants'
import { IconButton } from '@/Components'

type Props = {
  title: string
  containerStyle?: ViewStyle
  titleStyle?: TextStyle
  showBorderBottom?: boolean
}

const HeaderNormal = ({ title, containerStyle, titleStyle, showBorderBottom = true }: Props) => {
  return (
    <View
      style={[
        styles.container,
        showBorderBottom && styles.containerWithBorder,
        containerStyle,
      ]}
    >
      <IconButton
        icon={<Icon name="arrow-back-outline" size={24} color={Colors.textPrimary} />}
        onPress={goBack}
        variant="ghost"
        accessibilityLabel="Go back"
        accessibilityHint="Navigate to previous screen"
      />

      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
        {title}
      </Text>

      {/* Spacer for centering */}
      <View style={styles.spacer} />
    </View>
  )
}

export default HeaderNormal

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    height: 56,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  containerWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  title: {
    ...Typography.h5,
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  spacer: {
    width: 48, // Same width as IconButton to balance the layout
  },
})
