import React from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Colors, Radius, Spacing, Typography } from '@/Constants'
import { Font } from '@/Type'

type Props = {
  fonts: Font[]
  selectedFont: string | null
  onSelect: (fontId: string | null) => void
  loading?: boolean
}

// Turn a font id/alias into a friendly label, e.g. "titilliumweb" -> "Titilliumweb",
// preferring the human alias ("thick", "comic") when the API provides one.
const getFontLabel = (font: Font): string => {
  const value = font.alias || font.id
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const FontPicker = ({ fonts, selectedFont, onSelect, loading }: Props) => {
  const options: { id: string | null; label: string }[] = [
    { id: null, label: 'Default' },
    ...fonts.map((font) => ({ id: font.id, label: getFontLabel(font) })),
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Font</Text>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={Colors.primary}
          style={styles.loader}
        />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {options.map((option) => {
            const isSelected = selectedFont === option.id
            return (
              <Pressable
                key={option.id ?? 'default'}
                onPress={() => onSelect(option.id)}
                style={[styles.chip, isSelected && styles.chipSelected]}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={`Font ${option.label}`}
              >
                <Text
                  style={[
                    styles.chipText,
                    isSelected && styles.chipTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            )
          })}
        </ScrollView>
      )}
    </View>
  )
}

export default FontPicker

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.subtitle2,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  loader: {
    alignSelf: 'flex-start',
    marginVertical: Spacing.sm,
  },
  chipRow: {
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  chip: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.round,
    borderWidth: 1,
    borderColor: Colors.gray300,
    backgroundColor: Colors.white,
  },
  chipSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  chipText: {
    ...Typography.body2,
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    color: Colors.primary,
  },
})
