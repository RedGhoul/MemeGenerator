const presets = ['module:@react-native/babel-preset']
const plugins = [
  [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@': './src'
      }
    }
  ],
  [
    'babel-plugin-inline-import',
    {
      extensions: ['.svg']
    }
  ],
  // react-native-worklets/plugin (used by Reanimated 4) must be listed last.
  'react-native-worklets/plugin'
]

module.exports = {
  presets,
  plugins
}
