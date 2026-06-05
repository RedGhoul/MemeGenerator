import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { Colors, Spacing } from '@/Constants'
import { Button, Input } from '@/Components'
import HeaderNormal from '../Home/Components/HeaderNormal'
import { useRoute } from '@react-navigation/native'
import { SCREEN_WIDTH, getExtensionFile, isAndroid, isIOS } from '@/Utils/common'
import AutoHeightImage from 'react-native-auto-height-image'
import { useCreateImage } from '@/Hooks/useCreateImage'
import Toast from 'react-native-toast-message'
import { Images } from '@/Assets'
import RNFetchBlob from 'rn-fetch-blob'
import Spinner from 'react-native-loading-spinner-overlay'

const MemeDetailScreen = () => {
  const route = useRoute<any>()
  const data = route.params?.data
  const [image, setImage] = useState(data?.blank)
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [loading, setLoading] = useState(false)

  const createSuccess = (responseData: any) => {
    setLoading(false)
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Meme created successfully!',
    })
    if (responseData?.url) {
      setImage(responseData.url)
    }
  }

  const { refetch } = useCreateImage(
    {
      template_id: data.id,
      text: [topText.trim(), bottomText.trim()],
    },
    createSuccess
  )

  const handleCreateMeme = () => {
    if (!topText.trim() && !bottomText.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter at least one text field',
      })
      return
    }
    setLoading(true)
    refetch()
  }

  const handleDownload = () => {
    setLoading(true)
    const { config, fs } = RNFetchBlob
    let PictureDir = isAndroid() ? fs.dirs.PictureDir : fs.dirs.DocumentDir
    let ext: any = getExtensionFile(image)
    ext = '.' + ext[0]

    let options =
      Platform.OS === 'ios'
        ? {
            fileCache: false,
            appendExt: getExtensionFile(image)?.[0],
            notification: true,
            path: PictureDir + '/meme' + ext,
          }
        : {
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              path:
                PictureDir +
                '/meme_' +
                Math.floor(new Date().getTime() + new Date().getSeconds() / 2) +
                ext,
              description: 'Image',
            },
          }
    config(options)
      .fetch('GET', image)
      .then((res: any) => {
        setLoading(false)
        if (isIOS()) {
          setTimeout(() => {
            RNFetchBlob.ios.openDocument(res.data)
          }, 300)
        }
        handleDownloadImageSuccess()
      })
      .catch(() => {
        setLoading(false)
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to download image',
        })
      })
  }

  const handleDownloadImageSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Image downloaded successfully!',
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={loading} />
      <StatusBar translucent={false} backgroundColor={Colors.white} />
      <View style={styles.container}>
        <HeaderNormal title={data?.name} />
        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
        >
          {/* Text Inputs */}
          <Input
            label="Top Text"
            placeholder="Enter top text..."
            value={topText}
            onChangeText={setTopText}
            maxLength={100}
            showCharacterCount
            helperText="Text that appears at the top of the meme"
          />

          <Input
            label="Bottom Text"
            placeholder="Enter bottom text..."
            value={bottomText}
            onChangeText={setBottomText}
            maxLength={100}
            showCharacterCount
            helperText="Text that appears at the bottom of the meme"
          />

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title="Create Meme"
              variant="primary"
              size="large"
              onPress={handleCreateMeme}
              loading={loading}
              style={styles.button}
              accessibilityLabel="Create meme with entered text"
            />
            <Button
              title="Download"
              variant="secondary"
              size="large"
              onPress={handleDownload}
              disabled={loading}
              style={styles.button}
              accessibilityLabel="Download meme to device"
            />
          </View>

          {/* Meme Preview */}
          <AutoHeightImage
            style={styles.memeImage}
            width={SCREEN_WIDTH - 40}
            source={{ uri: image }}
            loadingIndicatorSource={Images.Loading}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default MemeDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  body: {
    flexGrow: 1,
    padding: Spacing.lg,
    paddingTop: Spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  button: {
    flex: 1,
  },
  memeImage: {
    marginTop: Spacing.lg,
    alignSelf: 'center',
    width: SCREEN_WIDTH - 40,
    backgroundColor: Colors.gray100,
    borderRadius: 12,
  },
})
