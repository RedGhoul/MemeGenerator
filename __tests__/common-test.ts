/**
 * Unit tests for the pure helpers in src/Utils/common.
 *
 * @format
 */
import {
  formatNumber,
  getExtensionFile,
  isAndroid,
  isIOS,
} from '@/Utils/common'

describe('formatNumber', () => {
  it('adds thousands separators', () => {
    expect(formatNumber(1000)).toBe('1,000')
    expect(formatNumber(1234567)).toBe('1,234,567')
  })

  it('leaves small numbers untouched', () => {
    expect(formatNumber(42)).toBe('42')
  })
})

describe('getExtensionFile', () => {
  it('extracts the extension from a filename', () => {
    expect(getExtensionFile('meme.png')?.[0]).toBe('png')
    expect(getExtensionFile('https://x.com/a/b/photo.jpeg')?.[0]).toBe('jpeg')
  })

  it('returns undefined when there is no extension', () => {
    expect(getExtensionFile('no-extension-here')).toBeUndefined()
  })
})

describe('platform helpers', () => {
  it('reports a single platform (defaults to ios under jest)', () => {
    // Exactly one of the two should be true in any environment.
    expect(isIOS()).not.toBe(isAndroid())
  })
})
