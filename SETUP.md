# Impostor Game - MVP Setup Documentation

## Project Overview
A modern, web-based implementation of the Impostor social deduction party game built with React 19, TypeScript, Vite, Linaria (CSS-in-JS), and Zustand (state management).

## Technology Stack

### Core Dependencies
- **React**: v19.0.0 (latest)
- **React DOM**: v19.0.0
- **TypeScript**: v5.9.3
- **Vite**: v7.2.2 (build tool)
- **Zustand**: v5.0.8 (state management)
- **React Router DOM**: v7.9.5 (routing)
- **Linaria**: v6.3.0 (zero-runtime CSS-in-JS)

### Dev Dependencies
- @vitejs/plugin-react v5.1.0
- @types/react v19.2.2
- @types/react-dom v19.2.2
- @types/node v24.10.0
- @babel/preset-react v7.28.5
- @babel/preset-typescript v7.28.5
- @linaria/vite v5.0.4
- @linaria/shaker v5.0.3

## Project Structure

```
impostor-game/
├── public/                    # Static assets
│   └── vite.svg              # Favicon
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx    # Shadow Theater button component
│   │   │   └── index.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx      # Shadow Theater card component
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── data/                 # Game data and constants
│   │   ├── avatars.ts        # Avatar system (8 spy-themed animal avatars)
│   │   └── words.ts          # Word lists (375+ words across 5 categories)
│   ├── screens/              # Game screens (to be implemented)
│   ├── store/                # Zustand state management
│   │   └── gameStore.ts      # Main game state store
│   ├── styles/               # Design system
│   │   ├── theme.ts          # Shadow Theater theme configuration
│   │   ├── global.ts         # Global styles and CSS reset
│   │   └── animations.ts     # Keyframe animations
│   ├── utils/                # Utility functions
│   │   └── gameLogic.ts      # Game logic helpers
│   ├── App.tsx               # Main app component with routing
│   ├── main.tsx              # Application entry point
│   └── vite-env.d.ts         # TypeScript environment declarations
├── .gitignore
├── index.html                # HTML entry point
├── linaria.config.ts         # Linaria configuration
├── package.json
├── tsconfig.json             # TypeScript configuration (strict mode)
├── tsconfig.node.json        # TypeScript config for Node files
└── vite.config.ts            # Vite configuration
```

## Configuration Details

### TypeScript Configuration
- **Strict mode enabled**: Full strict type checking
- **Path aliases configured**:
  - `@/*` → `./src/*`
  - `@components/*` → `./src/components/*`
  - `@screens/*` → `./src/screens/*`
  - `@store/*` → `./src/store/*`
  - `@data/*` → `./src/data/*`
  - `@styles/*` → `./src/styles/*`
  - `@utils/*` → `./src/utils/*`
- **Module resolution**: bundler mode
- **JSX**: react-jsx (React 19 automatic runtime)

### Linaria Configuration
- **Zero-runtime CSS-in-JS**: Styles extracted at build time
- **Display names**: Enabled in development for debugging
- **Class name slugs**: Readable in dev, hashed in production
- **Evaluation**: Enabled for dynamic theme values

### Vite Configuration
- **Plugins**: React + Linaria integration
- **Path aliases**: Synced with TypeScript configuration
- **Build target**: ES2020
- **Dev server**: Hot module replacement enabled

## Design System

### Shadow Theater Theme
The project uses a "Shadow Theater" aesthetic with:
- **Dark, mysterious color palette**: Deep purples, blacks, and gold accents
- **Typography**: Playfair Display (headings) + Inter (body)
- **Dramatic animations**: Spotlight reveals, glow effects, curtain wipes
- **Role colors**: Gold for UI, crimson for impostor, gray for civilians

### Key Theme Features
- Comprehensive spacing scale (0-32)
- Border radius utilities (sm to full)
- Shadow and glow effects (dramatic lighting)
- Smooth transition timings
- Z-index layers for proper stacking

## Available Scripts

```bash
# Development server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking (strict mode)
npm run lint
npm run type-check
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:5173`

4. **Build for production**:
   ```bash
   npm run build
   ```

## Current Implementation Status

### ✅ Completed
- React 19 + TypeScript + Vite setup
- Linaria CSS-in-JS configuration
- Zustand state management store
- Complete design system (Shadow Theater theme)
- Routing structure (React Router)
- Word list system (375+ words, 5 categories)
- Avatar system (8 spy-themed animals)
- Game logic utilities
- Basic app structure with placeholder screens

### 🚧 To Be Implemented
- Screen components (Home, Lobby, Game, Results)
- Player management UI
- Word reveal system
- Voting mechanism
- Role assignment UI
- Game timer
- Responsive layouts
- Multiplayer/networking (future)

## Game Store (Zustand)

The main game state is managed through `gameStore.ts`:

```typescript
interface GameState {
  // Game setup
  players: Player[]
  wordCategory: string | null
  civilianWord: string | null
  impostorWord: string | null

  // Game status
  gamePhase: 'setup' | 'lobby' | 'playing' | 'voting' | 'results'
  currentRound: number
  timeRemaining: number

  // Game results
  winner: 'civilians' | 'impostors' | null
  revealedImpostor: string | null

  // Actions
  addPlayer, removePlayer, updatePlayer
  setGamePhase, setWords, castVote
  setWinner, resetGame
}
```

## Known Issues & Notes

### TypeScript Strict Mode
The pre-existing Button and Card components have TypeScript strict mode warnings related to implicit 'any' types in Linaria styled component template literals. These warnings do not prevent the application from building or running, but should be addressed for full type safety.

**Warnings**:
- `src/components/Button/Button.tsx`: 6 implicit any warnings
- `src/components/Card/Card.tsx`: 6 implicit any warnings

**Solution**: Add explicit type annotations to arrow functions in styled component template literals.

### Example Files Excluded
The following example/demo files are excluded from TypeScript compilation:
- `src/App.example.tsx`
- `src/data/AVATAR_USAGE_EXAMPLES.tsx`

These files contain usage examples and demos but are not part of the main application.

## Next Steps for Development

1. **Implement Home Screen**
   - Game title and branding
   - "Create Game" / "Join Game" buttons
   - Settings panel

2. **Implement Lobby Screen**
   - Player list with avatars
   - Add/remove players
   - Word category selection
   - Game settings (impostor count, timer)
   - Start game button

3. **Implement Game Screen**
   - Word reveal card (with role indication)
   - Player list (showing who has seen their word)
   - Game timer
   - "Start Discussion" / "Start Voting" buttons

4. **Implement Voting Screen**
   - Player cards for voting
   - Vote tallying
   - Results reveal

5. **Implement Results Screen**
   - Winner announcement
   - Role reveals
   - Play again button

## Design Decisions

### Why Linaria?
- **Zero runtime overhead**: Styles extracted at build time
- **Full TypeScript support**: Type-safe styling
- **No CSS-in-JS runtime**: Better performance than styled-components/emotion
- **Familiar syntax**: Similar to styled-components
- **Works with Vite**: Excellent DX with HMR

### Why Zustand?
- **Minimal boilerplate**: Simpler than Redux
- **TypeScript friendly**: Great type inference
- **No providers needed**: Direct hook usage
- **Small bundle size**: ~1KB
- **Perfect for game state**: Simple, predictable updates

### Why React Router v7?
- **Latest version**: Future-proof
- **Type-safe routing**: Full TypeScript support
- **Simple for MVP**: Easy to add more routes later
- **Can upgrade to Remix**: If we need SSR later

## Folder Organization Philosophy

- **components/**: Reusable, presentational components (Button, Card, Avatar, etc.)
- **screens/**: Full-page components tied to routes (Home, Lobby, Game, Results)
- **store/**: Global state management (Zustand stores)
- **data/**: Static data and constants (words, avatars, config)
- **styles/**: Design system (theme, global styles, animations)
- **utils/**: Pure utility functions (game logic, formatters, validators)

## Resources

- [React 19 Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Linaria Documentation](https://linaria.dev/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Setup completed on**: 2025-11-10
**React Version**: 19.0.0
**Node Version**: Compatible with ES2020+
