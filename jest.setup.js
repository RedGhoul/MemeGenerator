/**
 * Jest setup: mock native modules that have no JS implementation under the
 * Node test environment, so components can be rendered in isolation.
 *
 * @format
 */

// Vector icons render from native font glyph maps; render them as a plain
// host component in tests.
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon')

// rn-fetch-blob reads native constants (DocumentDir, etc.) at import time.
jest.mock('rn-fetch-blob', () => ({
  __esModule: true,
  default: {
    fs: { dirs: { DocumentDir: '', CacheDir: '', PictureDir: '' } },
    config: jest.fn(() => ({ fetch: jest.fn(() => Promise.resolve()) })),
    ios: { openDocument: jest.fn() },
  },
}))
