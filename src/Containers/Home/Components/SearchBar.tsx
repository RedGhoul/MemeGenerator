import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Input } from '@/Components'
import { Colors, Spacing } from '@/Constants'

type Props = {
  value: string
  onChangeText: (text: string) => void
}

const SearchBar = ({ value, onChangeText }: Props) => {
  return (
    <Input
      value={value}
      onChangeText={onChangeText}
      placeholder="Search memes..."
      autoCorrect={false}
      returnKeyType="search"
      accessibilityLabel="Search memes"
      containerStyle={styles.container}
      leftIcon={<Icon name="search" size={20} color={Colors.textSecondary} />}
      rightIcon={
        value ? (
          <TouchableOpacity
            onPress={() => onChangeText('')}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon name="close-circle" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        ) : undefined
      }
    />
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.sm,
    marginBottom: Spacing.xs,
  },
})
