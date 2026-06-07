import React, { useEffect, useState } from 'react'
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native'

export interface AutoHeightImageProps extends Omit<ImageProps, 'style' | 'source'> {
  /** The fixed width to render at; height is derived from the image's aspect ratio. */
  width: number
  source: ImageSourcePropType
  style?: StyleProp<ImageStyle>
}

/**
 * Renders an image at a fixed `width`, deriving its `height` from the image's
 * natural aspect ratio so it never distorts. Replaces the abandoned
 * `react-native-auto-height-image` package (which was pinned to React 17).
 *
 * Supports both remote sources (`{ uri }`) and bundled assets (numeric
 * `require(...)` results).
 */
const AutoHeightImage: React.FC<AutoHeightImageProps> = ({ width, source, style, ...rest }) => {
  const [height, setHeight] = useState(0)

  useEffect(() => {
    let cancelled = false

    const applyRatio = (naturalWidth: number, naturalHeight: number) => {
      if (cancelled || !naturalWidth) {
        return
      }
      setHeight((width * naturalHeight) / naturalWidth)
    }

    const uri =
      source && typeof source === 'object' && !Array.isArray(source) ? source.uri : undefined

    if (uri) {
      Image.getSize(uri, applyRatio, () => {})
    } else {
      // Bundled asset (numeric require result) — dimensions are known synchronously.
      const resolved = Image.resolveAssetSource(source as ImageSourcePropType)
      if (resolved) {
        applyRatio(resolved.width, resolved.height)
      }
    }

    return () => {
      cancelled = true
    }
  }, [source, width])

  return <Image {...rest} source={source} style={[style, { width, height }]} />
}

export default AutoHeightImage
