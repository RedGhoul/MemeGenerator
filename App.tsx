import ApplicationNavigator from '@/Navigators/Application'
import React from 'react'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: 'always', retry: false },
    mutations: {},
  },
})

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApplicationNavigator />
    <Toast />
  </QueryClientProvider>
)

export default App
