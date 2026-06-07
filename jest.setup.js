/**
 * Jest setup: mock native modules that have no JS implementation under the
 * Node test environment, so components can be rendered in isolation.
 *
 * @format
 */

// Vector icons render from native font glyph maps; render them as a plain
// host component in tests.
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

// AsyncStorage is a native key/value store. Provide a small in-memory mock so
// favorites persistence logic can be exercised under Node without the native
// module (or the package itself) being present.
jest.mock('@react-native-async-storage/async-storage', () => {
  let store = {}
  return {
    __esModule: true,
    default: {
      getItem: jest.fn((key) => Promise.resolve(key in store ? store[key] : null)),
      setItem: jest.fn((key, value) => {
        store[key] = value
        return Promise.resolve()
      }),
      removeItem: jest.fn((key) => {
        delete store[key]
        return Promise.resolve()
      }),
      clear: jest.fn(() => {
        store = {}
        return Promise.resolve()
      }),
    },
  }
})

// rn-fetch-blob reads native constants (DocumentDir, etc.) at import time.
jest.mock('rn-fetch-blob', () => ({
  __esModule: true,
  default: {
    fs: { dirs: { DocumentDir: '', CacheDir: '', PictureDir: '' } },
    config: jest.fn(() => ({ fetch: jest.fn(() => Promise.resolve()) })),
    ios: { openDocument: jest.fn() },
  },
}))
