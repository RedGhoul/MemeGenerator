import ApplicationNavigator from '@/Navigators/Application'
import React from 'react'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from '@/Components'
import { FavoritesProvider } from '@/Context/FavoritesContext'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: 'always', retry: false },
    mutations: {},
  },
})

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <ApplicationNavigator />
      </FavoritesProvider>
    </QueryClientProvider>
    <Toast />
  </ErrorBoundary>
)

export default App
