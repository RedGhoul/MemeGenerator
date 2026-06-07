import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Colors, Radius, Spacing, Typography } from '@/Constants'

export type FilterOption = {
  id: string
  label: string
}

type Props = {
  options: FilterOption[]
  activeId: string
  onSelect: (id: string) => void
}

const FilterChips = ({ options, activeId, onSelect }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {options.map((option) => {
        const isActive = option.id === activeId
        return (
          <TouchableOpacity
            key={option.id}
            onPress={() => onSelect(option.id)}
            style={[styles.chip, isActive && styles.chipActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Filter by ${option.label}`}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

export default FilterChips

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.round,
    borderWidth: 1,
    borderColor: Colors.gray300,
    backgroundColor: Colors.white,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  label: {
    ...Typography.body2,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  labelActive: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
})
