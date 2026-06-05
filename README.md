# Mememe — Meme Generator

Are you ready to enter the world of memes and become a meme master? **Mememe** is a
React Native app for meme enthusiasts and anyone who wants to start exploring the
world of memes. Browse a huge library of templates, drop in your own captions, and
generate shareable memes in seconds — powered by the open‑source
[Memegen API](https://api.memegen.link).

<p>
  <img src="https://i.imgur.com/wskmQdU.png" width="200" />
  <img src="https://i.imgur.com/k8Tbxcf.png" width="200" />
</p>

<a href="https://apps.apple.com/us/app/mememe-meme-generator/id6478360528?itsct=apps_box_badge&amp;itscg=30200">
  <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1684800000" alt="Download on the App Store" height="60px">
</a>

---

## Features

- 🖼️ **Browse templates** — explore meme templates served by the Memegen API.
- ✍️ **Create memes** — add top/bottom captions and generate a finished image.
- ⚡ **Fast image loading** — cached, optimized rendering with skeleton loaders.
- 💾 **Save & share** — download generated memes to your device.
- 🚀 **No sign-up** — download and start making memes immediately, no account or login.

---

## Tech Stack

| Area | Library |
| --- | --- |
| Framework | React Native `0.85.3`, React `19.2` |
| Language | TypeScript `5.7` (strict mode) |
| Navigation | React Navigation v7 (native stack + bottom tabs) |
| Server state | TanStack React Query |
| Networking | Axios → `https://api.memegen.link` |
| Animations | Reanimated 4 + `react-native-worklets` |
| Images | `react-native-fast-image`, `react-native-auto-height-image`, `rn-fetch-blob` |
| Icons | `react-native-vector-icons`, `react-native-svg` (inline SVG) |
| Feedback | `react-native-toast-message`, `react-native-loading-spinner-overlay` |
| Tooling | ESLint 9 (flat config), Prettier, Jest + Testing Library |

---

## Project Structure

```text
MemeGenerator/
├── App.tsx                 # Root component (providers: React Query, Navigation)
├── index.js                # App entry point
├── src/
│   ├── Assets/             # Fonts, SVG icons, images (+ barrel index.ts)
│   ├── Components/         # Reusable UI: Button, Card, Input, Skeleton, EmptyState…
│   ├── Constants/          # Design tokens: Colors, Fonts, Spacing, Radius, Shadows, Typography, Texts
│   ├── Containers/         # Screen-level features (UI + logic)
│   │   ├── Home/           # HomeScreen + Components (CardImage, Header…)
│   │   ├── MemeDetail/     # MemeDetailScreen (the meme editor)
│   │   ├── Profile/        # ProfileScreen
│   │   └── SplashScreen.tsx
│   ├── Helpers/            # Pure utilities (e.g. handleError)
│   ├── Hooks/              # React Query hooks: useListMeme, useCreateImage, useListFonts
│   ├── Navigators/         # Navigation config: Application, MainBottomTab, Stack, utils
│   ├── Service/            # Axios instance (api.ts) + endpoint constants (constant.ts)
│   ├── Type/               # Shared TypeScript types
│   └── Utils/              # Common helpers
├── __tests__/              # Jest test suite
├── android/                # Android native project
├── ios/                    # iOS native project
└── [config]               # babel.config.js, metro.config.js, eslint.config.js, tsconfig.json…
```

### Layer responsibilities

- **Containers** hold screen-level business logic; **Components** are presentational and reusable.
- **Hooks** wrap the API with React Query (`useQuery` for reads, `useMutation` for writes).
- **Service** centralizes the Axios instance, base URL, and endpoints.
- **Constants** is the single source of truth for design tokens — import these instead of hard-coding values.

---

## Architecture Overview

### Navigation

A native stack navigator (`src/Navigators/Application.tsx`) drives the top-level
flow, with a bottom tab navigator (`MainBottomTab.tsx`) for the main tabs. Imperative
navigation helpers live in `src/Navigators/utils.ts` (`navigate`, `navigateAndReset`,
`goBack`).

```text
SplashScreen ──▶ HomeScreen (meme list) ──▶ MemeDetailScreen (editor)
                      │
                      └─▶ ProfileScreen
```

### State management

The app has no global client-state store and no authentication — the Memegen API
is public, so there's no login, token, or persisted user state.

- **Server state** — React Query handles fetching, caching, and loading/error states.
- **Local state** — React component hooks (`useState`, `useReducer`).

### API layer

Base URL `https://api.memegen.link`, configured in `src/Service/api.ts`. Endpoints
are declared in `src/Service/constant.ts`:

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/templates` | GET | List meme templates |
| `/images` | POST | Create a meme image (`{ template_id, text: [top, bottom] }`) |
| `/fonts` | GET | List available fonts |

Consumed via custom hooks:

```ts
const { data, isFetching, refetch } = useListMeme()

const { mutate } = useCreateImage({ createSuccess: data => {/* … */} })
mutate({ template_id: 'doge', text: ['Top text', 'Bottom text'] })
```

---

## Getting Started

### Prerequisites

- Node.js (LTS) and npm
- Watchman (recommended on macOS)
- **iOS:** Xcode + CocoaPods
- **Android:** Android Studio + SDK

### Install

```bash
npm install

# iOS only — install native pods
cd ios && pod install && cd ..
```

### Run

```bash
# Start the Metro bundler
npm start

# In a separate terminal:
npm run ios       # build & run on iOS simulator
npm run android   # build & run on Android emulator
```

---

## Development

```bash
npm run lint        # ESLint 9 (flat config: eslint.config.js)
npx tsc --noEmit    # type-check
npm test            # Jest + @testing-library/react-native
```

### Path aliases

Imports use the `@/` alias mapped to `./src/` (configured in `babel.config.js` and
`tsconfig.json`):

```ts
import { Colors } from '@/Constants/Colors'
import { HomeScreen } from '@/Containers/Home/HomeScreen'
```

### Code style (Prettier)

Single quotes, no semicolons, 100-char print width, 2-space tabs, `es5` trailing
commas, JSX single quotes. See `.prettierrc.js`.

---

## Troubleshooting

```bash
npm start -- --reset-cache            # clear Metro cache
cd ios && pod install && cd ..        # refresh iOS pods
cd android && ./gradlew clean && cd .. # clean Android build
```

---

## Credits

- Meme templates & image generation: [jacebrowning/memegen](https://github.com/jacebrowning/memegen)
- Built with React Native ❤️

😍😍😍😍😍😍
</content>
</invoke>
