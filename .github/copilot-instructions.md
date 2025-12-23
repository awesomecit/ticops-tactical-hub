# TicOps Tactical Hub - AI Coding Guidelines

## Project Overview
TicOps is a tactical airsoft competition management platform with a Call of Duty-inspired UI. Built with React + TypeScript + Vite, featuring a mock-first architecture ready for Supabase Edge Functions integration.

## Core Philosophy: Regola Zero (Rule Zero)

**Before creating ANYTHING** (component, hook, service, type), stop and ask:

1. **Do I really need this?** (Not "might need", but "solves a real problem NOW")
2. **Why do I need this?** (Explain in one sentence)
3. **What are the trade-offs?** (Pros AND cons)
4. **What alternatives exist?** (Maybe it already exists, maybe simpler is better)

This filter applies to every decision—before accepting AI suggestions, before creating abstractions, before adding dependencies. The best code is often the code you don't write.

## Architecture Patterns

### Mock-First API Design
- **All services use mock data by default** via `src/api/mock.ts` with `USE_MOCK = true`
- API calls return `ApiResult<T>` type: `{ data: T, error: null, status: number } | { data: null, error: { message, code }, status }`
- Services in `src/api/services/` wrap mock data with simulated network delay (200ms)
- To swap to real API: change `USE_MOCK` flag and replace `mockApi()` calls with `apiGet()`/`apiPost()` from `client.ts`
- Example pattern: `export const gamesService = { getAll: () => mockApi(mockGames) };`

### State Management
- **Zustand stores** in `src/stores/` for global state (auth, notifications, UI)
- Auth store includes mock login with predefined users from `MOCK_USERS_DB`
- LocalStorage persistence for auth state (`isLoggedIn`, `currentUser` keys)
- Use `useAuthStore()` for user context, `useNotificationStore()` for toasts

### Component Organization
- **Domain-driven folders**: `components/dashboard/`, `components/admin/`, `components/gameplay/`, etc.
- Each folder has `index.ts` barrel export
- Custom UI components in `components/ui/` extend shadcn/ui with tactical theme
- **TacticalCard** is the primary container: use `glow`, `scanlines`, `hudCorners` props for CoD aesthetic
- Use `GlowButton` instead of regular Button for primary CTAs

### Styling System
- **Tactical Design System** with CoD-inspired colors:
  - Primary: Orange (`--primary: 25 100% 50%`) for CTAs and highlights
  - Secondary: Tactical Green (`--secondary: 152 100% 50%`) for success states
  - Accent: Gold (`--accent: 51 100% 50%`) for achievements
  - Team colors: Alpha (blue), Bravo (red)
- Custom CSS classes in `index.css`: `clip-tactical`, `scanlines`, `hud-corner`, `text-glow-primary`
- Font stack: Rajdhani (display), Inter (body), JetBrains Mono (mono)
- Always use `cn()` from `@/lib/utils` to merge className props

### Internationalization (i18n)
- **Default language: Italian** (`fallbackLng: 'it'`)
- Use `useTranslation()` hook: `const { t } = useTranslation();`
- Keys stored in `src/i18n/locales/[en|it].json`
- Language stored in localStorage as `ticops-language`
- All user-facing text must use translation keys

### Type System
- Centralized types in `src/types/index.ts`
- Key interfaces: `User`, `Team`, `Game`, `GamePlayer`, `ChatMessage`, `Notification`
- User has `tier` (bronze/silver/gold/platinum/diamond) and `elo` for ranking
- Mock types in `src/mocks/index.ts` (e.g., `IMockUser`, `IMockTeam`) separate from API types

### Data Flow
- **Mock data hub**: `src/mocks/` contains all demo data organized by domain
- `useMockData()` hook provides convenient access to current user, teams, matches, activities
- Always check if data exists before rendering: `if (!currentUser) return null;`
- Use `useQuery` from TanStack Query for data fetching (already configured in `App.tsx`)

## Development Workflow

### Git Workflow: Trunk-Based Development

**Core rules:**
- `main` is always deployable (protected branch, all checks must pass)
- Feature branches live < 3 days (delete after merge)
- Commit early, push often (integrate continuously)
- No `develop` branch (YAGNI for small teams)

**Branch naming:**
```bash
feat/short-description    # New features
fix/issue-description     # Bug fixes
chore/task-description    # Tooling, dependencies
docs/topic                # Documentation
refactor/description      # Code refactoring
```

**Daily workflow:**
```bash
# Morning: sync with main
git checkout main && git pull

# New feature
git checkout -b feat/team-chat
git add -A && git commit -m "feat(chat): add real-time team messaging"
git push -u origin feat/team-chat

# Create PR and merge (if checks pass)
# Then delete branch immediately
```

### Conventional Commits

Format: `<type>(<scope>): <subject>`

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code change without changing behavior
- `style:` - Formatting, CSS changes
- `docs:` - Documentation only
- `test:` - Adding/updating tests
- `chore:` - Build, dependencies, tooling

**Examples:**
```bash
feat(dashboard): add live match tracking widget
fix(auth): prevent token expiration race condition
refactor(api): simplify mock service structure
style(tactical-card): adjust scanlines opacity
docs(readme): update deployment instructions
```

### Code Quality Limits

Maintain readable, maintainable code with these thresholds:

- **Max function complexity**: Keep functions simple and focused (< 50 lines guideline)
- **Component props**: If > 5 props, consider composition or sub-components
- **File length**: Split files > 300 lines into logical modules
- **Nested ternaries**: Avoid - use early returns or variables instead
- **Import depth**: Max 3 levels (`@/components/dashboard/stats`)

### Commands
```bash
bun dev              # Start dev server on port 8080
bun run build        # Production build
bun run build:dev    # Development build
bun run lint         # ESLint check
bun run preview      # Preview production build
```

### File Aliases
- `@/` maps to `src/` (configured in vite.config.ts and tsconfig.json)
- Always use `@/components`, `@/hooks`, `@/api`, `@/types`, etc.

### Adding shadcn/ui Components
- Components configured in `components.json` with CSS variables enabled
- Use `npx shadcn-ui@latest add [component]` to add new shadcn components
- Extend with tactical styling using CVA variants (see `TacticalCard.tsx` example)

### Creating New Features
1. Define types in `src/types/index.ts`
2. Create mock data in `src/mocks/[domain].ts` with barrel export
3. Add service in `src/api/services/[domain].ts` wrapping mock with `mockApi()`
4. Build components in feature-specific folder with barrel export
5. Add route in `App.tsx` under appropriate layout (MainLayout or standalone)
6. Add i18n keys to both `en.json` and `it.json`

### Page Layouts
- **MainLayout**: Dashboard, Games, Team, Leaderboard, Settings (with Sidebar + TabBar)
- **AdminLayout**: Admin pages with AdminSidebar
- **Standalone**: Login, Register, GameplayView, SpectatorView, RefereeView (no layout)

## Project-Specific Conventions

### Naming
- Components: PascalCase (`StatCard.tsx`)
- Files: camelCase for utilities (`useMockData.ts`), PascalCase for components
- Constants: UPPER_SNAKE_CASE (`MOCK_USERS`, `USE_MOCK`)
- CSS custom properties: kebab-case (`--primary-glow`)

### Component Structure
```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TacticalCard } from '@/components/ui/TacticalCard';

interface MyComponentProps {
  variant?: 'default' | 'compact';
  // Always include className for composition
  className?: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ variant = 'default', className }) => {
  const { t } = useTranslation();
  
  return (
    <TacticalCard glow="primary" className={className}>
      {/* content */}
    </TacticalCard>
  );
};
```

### Icon Usage
- Import from `lucide-react`: `import { Crosshair, Skull } from 'lucide-react';`
- Domain-specific icon mappings (see `Dashboard.tsx` activityIcons pattern)

### Toast Notifications
- Use `sonner` library via `<Sonner />` in App.tsx
- Import: `import { toast } from 'sonner';`
- Pattern: `toast.success(t('messages.success'))` or `toast.error()`

## Critical Integration Points

### Authentication Flow
- Login via `useAuthStore().login(email, password)` - returns `{ success, error? }`
- Logout clears localStorage and Zustand state
- Protected routes should check `useAuthStore().isAuthenticated`
- Mock users: `ghost@ticops.it` / `password123` or `demo@softwar.it` / `demo123`

### API Migration Path
1. Set `USE_MOCK = false` in `src/api/mock.ts`
2. Update `VITE_API_URL` env var to Supabase Edge Functions URL
3. Replace service implementations with `apiGet()`/`apiPost()` calls
4. API already structured for Edge Functions (see `docs/API.md`)

### Lovable Integration
- Built via Lovable platform (see README)
- `lovable-tagger` plugin active in dev mode for component tracking
- Push changes to sync with Lovable project

## AI-Assisted Development Guidelines

### AI as Amplifier, Not Substitute

- AI amplifies your understanding—**good understanding → faster correct code; poor understanding → faster wrong code**
- **Paradox of productivity**: Speed enables producing more code than necessary. Apply Regola Zero rigorously.
- Always pass AI suggestions through the Regola Zero filter

### Effective Copilot Usage

**Copilot excels at:**
- Boilerplate code (API services, types, mock data structures)
- Common React patterns (hooks, context, component structure)
- Test setup and repetitive test cases
- CSS/Tailwind class combinations
- i18n key definitions

**Copilot struggles with:**
- TicOps-specific business logic (ELO calculations, game rules)
- Complex state interactions (Zustand stores with side effects)
- Architectural decisions (when to split components, create new services)
- Performance optimizations (memoization, lazy loading decisions)

**Best practices:**
- **Contextual comments**: Describe what you want before writing code
  ```tsx
  // Create a TacticalCard showing player K/D ratio with trend indicator
  // Use primary glow, include lucide-react icon
  ```
- **Meaningful names**: `calculatePlayerEloGain(match, performance)` yields better suggestions than `calc(m, p)`
- **Open reference files**: Keep `types/index.ts`, `TacticalCard.tsx` open for context
- **Iterate**: If first suggestion is complex, simplify your comment and try again

### Code Review Checklist for AI-Generated Code

Before accepting AI-generated code, ask:

1. ✅ **Do I understand every line?** (If not, don't use it)
2. ✅ **Is this the simplest solution?** (Can I remove code and still solve the problem?)
3. ✅ **Are there hidden dependencies?** (Does it assume data structures, APIs, or imports that don't exist?)
4. ✅ **Does it follow TicOps patterns?** (Uses TacticalCard? Follows barrel exports? Uses i18n?)
5. ✅ **Does it handle errors appropriately?** (Loading states? Null checks? Toast notifications?)
6. ✅ **Would I write this without AI?** (If no, why not? Learn from it or reject it)

**Red flags in AI suggestions:**
- ❌ Creating new abstractions for one-time use
- ❌ Bypassing existing patterns (e.g., using `Button` instead of `GlowButton`)
- ❌ Adding dependencies without checking if functionality exists
- ❌ Complex logic without comments explaining "why"
- ❌ Ignoring TypeScript errors or using `any`

### Key Files Reference
- `src/App.tsx` - Routing and providers setup
- `src/api/client.ts` - API client with error handling
- `src/stores/authStore.ts` - Auth state and mock login
- `src/components/ui/TacticalCard.tsx` - Primary UI component pattern
- `src/mocks/index.ts` - Central mock data exports
- `tailwind.config.ts` - Theme tokens and tactical animations
- `src/index.css` - Custom CSS utilities and CoD styling
