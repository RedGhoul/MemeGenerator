import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

/**
 * Persisted set of favorited meme template ids.
 *
 * The Memegen API is anonymous, so "favorites" are purely a local convenience:
 * the list of template ids is stored in AsyncStorage. Because both the Home grid
 * (favorites filter) and the individual cards need to read and mutate the same
 * data, the state lives in a small context provider rather than per-component
 * hooks — a lightweight store scoped to this single need.
 */
export const FAVORITES_STORAGE_KEY = '@MemeGenerator/favorites'

interface FavoritesContextValue {
  favorites: Set<string>
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
  isLoaded: boolean
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)

  // Hydrate from storage once on mount.
  useEffect(() => {
    let isMounted = true
    AsyncStorage.getItem(FAVORITES_STORAGE_KEY)
      .then((raw) => {
        if (!isMounted || !raw) {
          return
        }
        try {
          const ids = JSON.parse(raw) as string[]
          setFavorites(new Set(ids))
        } catch {
          // Corrupt value — start from an empty set rather than crashing.
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoaded(true)
        }
      })
    return () => {
      isMounted = false
    }
  }, [])

  const persist = useCallback((next: Set<string>) => {
    AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...next])).catch(() => {
      // Best-effort persistence; the in-memory set still reflects the change.
    })
  }, [])

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        persist(next)
        return next
      })
    },
    [persist]
  )

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isFavorite: (id: string) => favorites.has(id),
      toggleFavorite,
      isLoaded,
    }),
    [favorites, toggleFavorite, isLoaded]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
