/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * Merges React Native's default Metro config with the SVG transformer
 * setup (react-native-svg-transformer), so SVG files are treated as
 * source modules while all other assets keep RN's default handling.
 *
 * @format
 */
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {
  resolver: {sourceExts, assetExts},
} = defaultConfig;

/**
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
