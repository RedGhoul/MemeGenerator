# CLAUDE.md - AI Assistant Guide for MemeGenerator

## Project Overview

**MemeGenerator** (also known as "Mememe Meme Generator") is a React Native mobile application that allows users to browse, create, and share memes. The app is available on the iOS App Store and uses the [Memegen API](https://api.memegen.link) for meme templates and image generation.

### Tech Stack
- **React Native** 0.71.5
- **TypeScript** 4.8.4
- **React** 18.2.0
- **Redux Toolkit** + Redux Persist (state management)
- **React Query** (data fetching)
- **React Navigation** v6 (navigation)
- **Axios** (HTTP client)
- **React Native Vector Icons** (icon system)

## Directory Structure

```
MemeGenerator/
├── src/                          # Main source code
│   ├── Assets/                   # Static assets
│   │   ├── Fonts/               # BeVietnamPro & Lato font families
│   │   ├── Icons/               # SVG icons
│   │   └── Images/              # PNG/JPG/GIF images
│   ├── Components/              # Reusable UI components
│   ├── Containers/              # Screen components (feature-based)
│   │   ├── Auth/Login/
│   │   ├── Home/
│   │   ├── MemeDetail/
│   │   └── Profile/
│   ├── Constants/               # App constants (Colors, Fonts, Strings)
│   ├── Helpers/                 # Utility helper functions
│   ├── Hooks/                   # Custom React hooks (API integration)
│   ├── Model/                   # Data models/interfaces
│   ├── Navigators/              # Navigation configuration
│   ├── Service/                 # API layer (Axios instance)
│   ├── Stores/                  # Redux store & slices
│   ├── Type/                    # TypeScript type definitions
│   └── Utils/                   # Common utilities
├── android/                      # Android native code
├── ios/                         # iOS native code
├── __tests__/                   # Test files
├── App.tsx                      # Root component
├── index.js                     # App entry point
└── [config files]               # Babel, Metro, ESLint, etc.
```

## Key Architecture Patterns

### 1. Navigation Structure

**File:** `src/Navigators/Application.tsx`

The app uses React Navigation with:
- **Native Stack Navigator** for main screens
- **Bottom Tab Navigator** for Home/Profile tabs
- **Navigation utilities** in `src/Navigators/utils.ts`

**Screen Flow:**
```
SplashScreen (1s delay)
  → HomeScreen (Main Tab: Meme List)
  → MemeDetailScreen (Meme Editor)
  → ProfileScreen (Main Tab: User Profile)
```

**Key Navigation Functions:**
- `navigate(name, params)` - Navigate to route
- `navigateAndReset(routes, index)` - Reset navigation stack
- `goBack()` - Navigate back

### 2. State Management (Redux)

**File:** `src/Stores/index.ts`

**Store Configuration:**
- Uses **Redux Toolkit** `configureStore`
- **Redux Persist** with AsyncStorage for offline persistence
- Serializable check disabled for non-serializable values

**User Slice:** `src/Stores/User/User.ts`
```typescript
State: {
  token: string | null
  userInfo: User | null
  language: string
}

Actions:
- setToken(token)
- setUserInfo(user)
- setLanguage(lang)
- clearUser()
```

**Usage Pattern:**
```typescript
import { useAppDispatch, useAppSelector } from '@/Stores/hooks'

const dispatch = useAppDispatch()
const { token, userInfo } = useAppSelector(state => state.user)
```

### 3. API Integration

**Base Configuration:** `src/Service/api.ts`
- Base URL: `https://api.memegen.link`
- Request interceptor: Adds auth token and language headers (currently commented out)
- Response interceptor: Handles 401 errors by clearing user state

**API Endpoints:** `src/Service/constant.ts`
```typescript
BASE_URL = 'https://api.memegen.link'
END_POINT = {
  templates: 'templates',  // GET meme templates
  images: 'images',        // POST create meme
  fonts: 'fonts'           // GET available fonts
}
```

**Custom Hooks Pattern:**

**Fetch Meme Templates:** `src/Hooks/useListMeme.ts`
```typescript
const { data, isError, isFetching, refetch, error } = useListMeme()
```

**Create Meme Image:** `src/Hooks/useCreateImage.ts`
```typescript
const { mutate } = useCreateImage({ createSuccess: (data) => {...} })
mutate({ template_id: 'doge', text: ['Top text', 'Bottom text'] })
```

### 4. Styling System

**Approach:** React Native StyleSheet API (no CSS-in-JS library)

**Colors:** `src/Constants/Colors.ts`
- Centralized color constants
- Key colors: primary, white, black, blue, yellow, etc.

**Fonts:** `src/Constants/Fonts.ts`
- BeVietnamPro (Vietnamese support): Bold, Regular, Medium, SemiBold
- Lato (English support): Bold, Regular, Medium, SemiBold

**Pattern:**
```typescript
import { Colors } from '@/Constants/Colors'
import { Fonts } from '@/Constants/Fonts'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    fontFamily: Fonts.BeVietnamProRegular,
  }
})
```

### 5. Asset Management

**SVG Icons:**
- Stored in `src/Assets/Icons/`
- Imported via `babel-plugin-inline-import`
- Rendered with `react-native-svg` and `SvgXml`
- Component: `IconSvgView.tsx` - Reusable SVG wrapper

**Images:**
- Optimized loading with `react-native-fast-image`
- Download functionality via `rn-fetch-blob`
- Auto-height images with `react-native-auto-height-image`

**Usage:**
```typescript
import { Icons, Images } from '@/Assets'
```

## Development Workflows

### Running the App

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Code Quality

```bash
# Lint code
npm run lint

# Run tests
npm run test
```

### Code Style (Prettier)

**Configuration:** `.prettierrc.js`
- Single quotes: `true`
- Semicolons: `false`
- Print width: `100`
- Tab width: `2`
- JSX single quotes: `true`
- Trailing commas: `es5`

### Path Aliases

**Configuration:** `babel.config.js` + `tsconfig.json`
```typescript
// Use @ prefix for clean imports
import { Colors } from '@/Constants/Colors'
import { HomeScreen } from '@/Containers/Home/HomeScreen'
```

**Alias:** `@/` → `./src/`

## Important Conventions

### 1. TypeScript Usage

- **Strict mode enabled** - All code must be type-safe
- Type definitions in `src/Type/`
- Export RootState and AppDispatch types for Redux hooks
- Use interfaces for data models

### 2. Component Organization

**Containers vs Components:**
- **Containers** (`src/Containers/`) - Screen-level components with business logic
- **Components** (`src/Components/`) - Reusable UI components

**Naming:**
- PascalCase for components: `HomeScreen.tsx`, `IconSvgView.tsx`
- camelCase for hooks: `useListMeme.ts`, `useCreateImage.ts`
- UPPER_CASE for constants: `Colors.ts`, `END_POINT`

### 3. File Structure

**Screen Components:**
```
src/Containers/FeatureName/
├── FeatureScreen.tsx        # Main screen component
└── Components/              # Screen-specific subcomponents
    └── SubComponent.tsx
```

**Custom Hooks:**
```typescript
// Pattern: useXXX.ts in src/Hooks/
// Returns React Query hook for API integration
export const useListMeme = () => {
  return useQuery(['memes'], fetchMemes)
}
```

### 4. State Management Patterns

**Local State:** Use React hooks (`useState`, `useReducer`)
**Global State:** Use Redux for:
- User authentication (token, userInfo)
- App-wide settings (language)
- Data that persists across sessions

**Server State:** Use React Query for:
- API data fetching
- Caching and refetching
- Loading/error states

### 5. Error Handling

**API Layer:**
- 401 errors automatically clear user state and redirect
- Error responses include status code and message
- Use React Query's error handling for UI feedback

**UI Feedback:**
- Toast messages via `react-native-toast-message`
- Loading spinners via `react-native-loading-spinner-overlay`

## Common Tasks for AI Assistants

### Adding a New Screen

1. Create screen component in `src/Containers/FeatureName/`
2. Add screen to navigator in `src/Navigators/Application.tsx`
3. Export screen from `src/Navigators/Stack.ts`
4. Add navigation types if using TypeScript navigation props

### Adding a New API Endpoint

1. Add endpoint to `src/Service/constant.ts`
2. Create custom hook in `src/Hooks/useXXX.ts`
3. Use React Query's `useQuery` (GET) or `useMutation` (POST/PUT/DELETE)
4. Handle loading/error states in UI

### Adding Redux State

1. Create slice in `src/Stores/FeatureName/FeatureName.ts`
2. Add reducer to store in `src/Stores/index.ts`
3. Export typed hooks if needed
4. Configure persistence in Redux Persist if required

### Adding New Assets

**Fonts:**
1. Add font files to `src/Assets/Fonts/`
2. Link fonts: `npx react-native-cli link`
3. Add font names to `src/Constants/Fonts.ts`

**Icons (SVG):**
1. Add SVG to `src/Assets/Icons/`
2. Export from `src/Assets/index.ts`
3. Use with `IconSvgView` component

**Images:**
1. Add to `src/Assets/Images/`
2. Export from `src/Assets/index.ts`
3. Use with `FastImage` or `Image` component

### Styling Components

1. Use StyleSheet.create() for styles
2. Reference colors from `@/Constants/Colors`
3. Reference fonts from `@/Constants/Fonts`
4. Keep styles at bottom of component file

## Testing

**Framework:** Jest with React Native preset

**Test Location:** `__tests__/` directory

**Running Tests:**
```bash
npm test
```

## Build Configuration

### Metro Bundler

**File:** `metro.config.js`
- Custom transformer for SVG support via `react-native-svg-transformer`
- SVG files treated as source files, not assets

### Babel

**File:** `babel.config.js`
- Preset: `metro-react-native-babel-preset`
- Plugins:
  - `module-resolver` - Path aliases (@/)
  - `react-native-reanimated/plugin` - Animation support
  - `babel-plugin-inline-import` - Inline SVG imports

### React Native Config

**File:** `react-native.config.js`
- Auto-links custom fonts from `src/Assets/Fonts/`

## External Dependencies

### Key Libraries

**UI & Components:**
- `react-native-elements` - UI component library
- `react-native-vector-icons` - Icon system (Ionicons)
- `react-native-animatable` - Animations
- `react-native-reanimated` - Advanced animations

**Image Handling:**
- `react-native-fast-image` - Optimized image loading
- `react-native-auto-height-image` - Responsive images
- `react-native-image-progress` - Loading indicators
- `rn-fetch-blob` - Download functionality

**Navigation:**
- `@react-navigation/native` - Core navigation
- `@react-navigation/native-stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Tab navigator
- `react-native-gesture-handler` - Gesture support
- `react-native-screens` - Native screens
- `react-native-safe-area-context` - Safe area handling

**State & Data:**
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - React bindings for Redux
- `redux-persist` - State persistence
- `@react-native-async-storage/async-storage` - Local storage
- `react-query` - Server state management
- `axios` - HTTP client

**Utilities:**
- `lodash` - Utility functions

## API Reference

### Memegen API

**Base URL:** `https://api.memegen.link`

**Endpoints:**
- `GET /templates` - List available meme templates
- `POST /images` - Create meme image
  - Body: `{ template_id: string, text: [string, string] }`
  - Returns: Image URL
- `GET /fonts` - List available fonts

**Documentation:** [github.com/jacebrowning/memegen](https://github.com/jacebrowning/memegen)

## Git Workflow

**Current Branch:** `claude/claude-md-mhzffdingfup06tm-01E1r7FNhmCVyGCEbG5wBd7a`

### Important Git Rules

1. All development on designated `claude/` branch
2. Commit messages should be clear and descriptive
3. Push with: `git push -u origin <branch-name>`
4. Branch names must start with `claude/` for push permissions

### Common Git Commands

```bash
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "Description of changes"

# Push to branch
git push -u origin claude/claude-md-mhzffdingfup06tm-01E1r7FNhmCVyGCEbG5wBd7a
```

## Debugging

### React Native Debugging

- Shake device/emulator for debug menu
- Enable "Debug JS Remotely" for Chrome DevTools
- Use Flipper for advanced debugging

### Common Issues

**Metro bundler cache issues:**
```bash
npm start -- --reset-cache
```

**iOS build issues:**
```bash
cd ios && pod install && cd ..
```

**Android build issues:**
```bash
cd android && ./gradlew clean && cd ..
```

## Platform-Specific Notes

### iOS
- Requires Xcode and CocoaPods
- Font linking handled by `react-native.config.js`
- Run `pod install` after adding native dependencies

### Android
- Requires Android Studio and SDK
- Font linking automatic via `react-native.config.js`
- Check `local.properties` for SDK path

## Security Considerations

1. **API Token Management:**
   - Store tokens in Redux with Redux Persist
   - Clear tokens on 401 responses
   - Use AsyncStorage for local persistence

2. **Input Validation:**
   - Validate user input before API calls
   - Sanitize text input for meme generation

3. **Sensitive Data:**
   - Never commit `.env` files
   - Keep API keys in environment variables
   - Use `.gitignore` for sensitive files

## Performance Optimization

1. **Image Loading:**
   - Use `FastImage` for optimized caching
   - Implement lazy loading for meme lists
   - Use appropriate image sizes

2. **List Rendering:**
   - Use `FlatList` with proper `keyExtractor`
   - Implement `windowSize` and `maxToRenderPerBatch`
   - Use `getItemLayout` for fixed-size items

3. **Bundle Size:**
   - Monitor bundle size with Metro
   - Remove unused dependencies
   - Use Hermes JS engine for Android

## Resources

- **App Store:** [Mememe Meme Generator](https://apps.apple.com/us/app/mememe-meme-generator/id6478360528)
- **Memegen API:** [github.com/jacebrowning/memegen](https://github.com/jacebrowning/memegen)
- **React Native Docs:** [reactnative.dev](https://reactnative.dev)
- **React Navigation Docs:** [reactnavigation.org](https://reactnavigation.org)
- **Redux Toolkit Docs:** [redux-toolkit.js.org](https://redux-toolkit.js.org)

## AI Assistant Guidelines

### When Working on This Project:

1. **Always use TypeScript** - Provide full type safety
2. **Follow existing patterns** - Match the established architecture
3. **Use path aliases** - Import with `@/` prefix
4. **Maintain code style** - Follow Prettier configuration
5. **Test changes** - Ensure app builds and runs
6. **Update types** - Keep TypeScript definitions current
7. **Check both platforms** - Consider iOS and Android differences
8. **Document complex logic** - Add comments for clarity
9. **Handle errors gracefully** - Use proper error boundaries
10. **Optimize performance** - Consider mobile constraints

### Before Making Changes:

1. Read relevant files in the affected area
2. Understand the current implementation
3. Check for existing patterns to follow
4. Consider impact on both iOS and Android
5. Verify TypeScript types are correct

### After Making Changes:

1. Ensure code builds without errors
2. Test on both platforms if possible
3. Update documentation if needed
4. Commit with clear messages
5. Push to the designated branch

---

**Last Updated:** 2025-11-14
**React Native Version:** 0.71.5
**TypeScript Version:** 4.8.4
