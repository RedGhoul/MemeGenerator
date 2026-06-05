import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import FastImage from '@d11/react-native-fast-image'
import { Images } from '@/Assets'
import { Texts, Colors, Radius, Spacing, Shadows } from '@/Constants'
import { Card } from '@/Components'
import { SCREEN_WIDTH } from '@/Utils/common'

type Props = {
  data: any
}

const CardImage = ({ data }: Props) => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)

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
})
