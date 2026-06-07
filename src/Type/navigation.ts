import type { MemeTemplate } from '@/Type'

/**
 * Route params for the root native-stack navigator. Keep this in sync with the
 * screens registered in `src/Navigators/Application.tsx`.
 */
export type RootStackParamList = {
  Splash: undefined
  HomeScreen: undefined
  MemeDetailScreen: { data: MemeTemplate }
}
