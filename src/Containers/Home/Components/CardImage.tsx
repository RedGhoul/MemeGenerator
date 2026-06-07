import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import FastImage from '@d11/react-native-fast-image'
import Icon from 'react-native-vector-icons/Ionicons'
import { Images } from '@/Assets'
import { Texts, Colors, Radius, Spacing, Shadows } from '@/Constants'
import { Card } from '@/Components'
import { SCREEN_WIDTH } from '@/Utils/common'
import { MemeTemplate } from '@/Type'
import { useFavorites } from '@/Context/FavoritesContext'

type Props = {
  data: MemeTemplate
}

const CardImage = ({ data }: Props) => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = isFavorite(data.id)

  const handleShowImageDetail = (): void => {
    navigation.dispatch(
      StackActions.push(Texts.MemeDetailScreen, {
        data,
      })
    )
  }

  return (
    <Card
      variant="default"
      onPress={handleShowImageDetail}
      style={styles.card}
      contentStyle={styles.cardContent}
      accessibilityLabel={`Meme template ${data?.name || 'image'}`}
      accessibilityHint="Double tap to open meme editor"
    >
      <View style={styles.imageContainer}>
        {loading && (
          <Image source={Images.Loading} style={styles.loadingImage} />
        )}
        <FastImage
          source={{ uri: data?.blank }}
          style={styles.memeImage}
          onLoadEnd={() => setLoading(false)}
          resizeMode={FastImage.resizeMode.cover}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(data.id)}
          accessibilityRole="button"
          accessibilityLabel={
            favorited
              ? `Remove ${data?.name || 'meme'} from favorites`
              : `Add ${data?.name || 'meme'} to favorites`
          }
          accessibilityState={{ selected: favorited }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon
            name={favorited ? 'heart' : 'heart-outline'}
            size={18}
            color={favorited ? Colors.error : Colors.white}
          />
        </TouchableOpacity>
      </View>
    </Card>
  )
}

export default React.memo(CardImage)

const styles = StyleSheet.create({
  card: {
    width: (SCREEN_WIDTH - 40) / 2,
    marginHorizontal: Spacing.xs,
    marginBottom: Spacing.sm,
    borderRadius: Radius.lg,
    ...Shadows.shadow2,
  },
  cardContent: {
    padding: 0, // No padding for image cards
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  loadingImage: {
    position: 'absolute',
    width: SCREEN_WIDTH / 8,
    height: SCREEN_WIDTH / 8,
    resizeMode: 'contain',
  },
  memeImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    width: 32,
    height: 32,
    borderRadius: Radius.round,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
