/**
 * Tests for the favorites context: toggling and persistence behaviour.
 * AsyncStorage is mocked in-memory via jest.setup.js.
 *
 * @format
 */
import React from 'react'
import { act, renderHook, waitFor } from '@testing-library/react-native'
import { FavoritesProvider, useFavorites } from '@/Context/FavoritesContext'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
)

describe('useFavorites', () => {
  it('starts with no favorites once hydrated', async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    await waitFor(() => expect(result.current.isLoaded).toBe(true))
    expect(result.current.isFavorite('doge')).toBe(false)
  })

  it('toggles a favorite on and off', async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    await waitFor(() => expect(result.current.isLoaded).toBe(true))

    act(() => result.current.toggleFavorite('doge'))
    expect(result.current.isFavorite('doge')).toBe(true)
    expect(result.current.favorites.has('doge')).toBe(true)

    act(() => result.current.toggleFavorite('doge'))
    expect(result.current.isFavorite('doge')).toBe(false)
  })

  it('throws when used outside a provider', () => {
    // Silence the expected React error boundary log for this assertion.
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useFavorites())).toThrow(
      'useFavorites must be used within a FavoritesProvider'
    )
    spy.mockRestore()
  })
})
