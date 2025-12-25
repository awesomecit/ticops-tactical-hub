# TicOps - Quick Reference Card

**Last Update**: 25 Dicembre 2024  
**Project Status**: 85% Complete → v1.0 Target: Marzo 2025

---

## 🚀 Quick Start

```bash
# Clone & Install
git clone <repo-url>
cd ticops-tactical-hub
bun install

# Development
bun dev              # → http://localhost:8080

# Build
bun run build        # Production build
bun run preview      # Preview prod build

# Linting
bun run lint         # ESLint check
```

---

## 👥 Demo Users (All password: `demo123`)

| Email | Role | Access Level | Tier |
|-------|------|--------------|------|
| player@demo.it | Player | User | Platinum |
| teamleader@demo.it | Team Leader | User | Gold |
| referee@demo.it | Referee | User | - |
| field@demo.it | Field Manager | Field Manager | - |
| shop@demo.it | Shop Owner | Field Manager | - |
| admin@demo.it | Org Admin | Organization Admin | - |
| superadmin@itl.it | Fed Admin | Federation Admin | - |

---

## 📁 Project Structure (Key Folders)

```
src/
├── api/              # API client + services (mock-first)
├── components/       # React components (domain-driven)
│   ├── admin/        # Admin panel components
│   ├── dashboard/    # User dashboard
│   ├── gameplay/     # Live match components
│   ├── ui/           # shadcn/ui + custom components
│   └── ...
├── hooks/            # Custom React hooks
├── i18n/             # Translations (IT/EN)
├── lib/              # Utilities (cn, utils, rls)
├── mocks/            # Mock data (users, teams, matches, etc.)
├── pages/            # Route pages
├── stores/           # Zustand state management
├── types/            # TypeScript type definitions
└── main.tsx          # App entry point

docs/
├── API.md                          # API documentation
├── FEATURES_ROADMAP.md             # Atomic task tracking
├── MULTI_ORG_ARCHITECTURE.md       # Multi-org system specs
├── GANTT_TIMELINE.md               # Sprint planning
├── BDD_SCENARIOS.md                # Test scenarios
├── UPDATE_SUMMARY_2024-12-25.md    # Project snapshot
└── SESSION_SUMMARY_2024-12-25.md   # Session recap
```

---

## 🏗️ Architecture Overview

### Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand (auth, notifications, UI)
- **Routing**: React Router v6
- **i18n**: react-i18next (IT default, EN available)
- **API**: Mock-first with `USE_MOCK` flag → ready for Supabase

### Multi-Organization Hierarchy
```
Federation (ITL)
    ↓
Organization (TicOps Italy)
    ↓
Division (Nord Milano, Sud Milano)
    ↓
Fields, Teams, Matches, Users
```

### Access Levels (RBAC)
1. **Federation Admin**: All federations + all orgs + all divisions
2. **Organization Admin**: Own org + all divisions in org
3. **Division Manager**: Own division only
4. **Field Manager**: Own field only
5. **User**: Own data + team data

---

## 🎨 Design System

### Tactical Theme (User-Facing)
- **Primary**: Orange `hsl(25 100% 50%)`
- **Secondary**: Tactical Green `hsl(152 100% 50%)`
- **Accent**: Gold `hsl(51 100% 50%)`
- **Effects**: Scanlines, HUD corners, glows
- **Components**: TacticalCard, GlowButton
- **Font**: Rajdhani (display), Inter (body), JetBrains Mono (mono)

### Admin Theme (Backoffice)
- **Colors**: Gray/Blue palette (clean, professional)
- **Effects**: NONE (no tactical animations)
- **Components**: DataTable, EntityFilters, AdminLayout
- **Navigation**: MUST exit via overview

---

## 🧪 Testing

### Run Tests
```bash
bun test              # Unit tests
bun test:bdd          # BDD scenarios
bun test:coverage     # With coverage report
bun test:watch        # Watch mode
```

### Coverage Target
- **Minimum**: 85%
- **BDD Scenarios**: 25+ defined in `docs/BDD_SCENARIOS.md`

---

## 📋 Current Sprint (Sprint 1)

### Feature 13: Multi-Organization System
**Status**: 2/15 tasks complete (10%)

**This Week**:
- [ ] 13.3: Mock federations/org/divisions (`src/mocks/organizations.ts`)
- [ ] 13.4: OrgContext provider (`src/contexts/OrgContext.tsx`)
- [ ] 13.5: useOrgContext hook (`src/hooks/useOrgContext.ts`)
- [ ] 13.6: RLS filters (`src/lib/rls.ts`)

**Next Week**:
- [ ] 13.8-13.10: Admin pages (Fed/Org/Div)
- [ ] 13.11-13.13: Form components
- [ ] 13.14: Division switcher in Header

---

## 🐛 Known Issues

### Bug #15: SpectatorView Not Found
**Status**: 4/5 tasks complete  
**Root Cause**: Dev server cache issue  
**Solution**:
```bash
# Stop dev server
Ctrl+C

# Clear cache
rm -rf node_modules/.vite

# Restart
bun dev

# Hard refresh browser
Ctrl+Shift+R (Chrome/Firefox)
Cmd+Shift+R (Safari)
```

---

## 🔀 Git Workflow

### Branch Naming
```bash
feat/short-description    # New features
fix/issue-description     # Bug fixes
chore/task-description    # Tooling, dependencies
docs/topic                # Documentation
refactor/description      # Code refactoring
```

### Conventional Commits
```bash
feat(scope): add feature X
fix(scope): resolve issue Y
refactor(scope): improve code Z
docs(scope): update documentation
chore(scope): update dependencies
style(scope): format code
test(scope): add test for X
```

### Daily Workflow
```bash
# Morning sync
git checkout main && git pull

# New feature
git checkout -b feat/team-chat
git add -A && git commit -m "feat(chat): add team radio"
git push -u origin feat/team-chat

# Create PR → Merge → Delete branch
```

---

## 🚨 Critical Rules

### Regola Zero (Rule Zero)
Before creating ANYTHING:
1. **Do I need this?** (Real problem NOW, not "might need")
2. **Why?** (One sentence explanation)
3. **Trade-offs?** (Pros AND cons)
4. **Alternatives?** (Maybe simpler exists)

### Code Quality Limits
- Max function complexity: < 50 lines
- Component props: Max 5 (else compose)
- File length: < 300 lines (else split)
- Nested ternaries: AVOID (use early returns)
- Import depth: Max 3 levels

---

## 📚 Documentation Index

| Document | Purpose | Lines |
|----------|---------|-------|
| [API.md](./API.md) | API endpoints + examples | 300+ |
| [FEATURES_ROADMAP.md](./FEATURES_ROADMAP.md) | Atomic task tracking | 500+ |
| [MULTI_ORG_ARCHITECTURE.md](./MULTI_ORG_ARCHITECTURE.md) | Multi-org specs | 400+ |
| [GANTT_TIMELINE.md](./GANTT_TIMELINE.md) | Sprint planning | 600+ |
| [BDD_SCENARIOS.md](./BDD_SCENARIOS.md) | Test scenarios | 600+ |
| [UPDATE_SUMMARY_2024-12-25.md](./UPDATE_SUMMARY_2024-12-25.md) | Project snapshot | 400+ |
| [SESSION_SUMMARY_2024-12-25.md](./SESSION_SUMMARY_2024-12-25.md) | Session recap | 900+ |

**Total Documentation**: 3700+ lines

---

## 🎯 Key Patterns

### API Call Pattern
```typescript
import { apiGet, mockApi } from '@/api';
import { USE_MOCK } from '@/api/mock';

export const myService = {
  getAll: () => USE_MOCK 
    ? mockApi(MOCK_DATA) 
    : apiGet('/endpoint')
};
```

### Component Pattern
```typescript
import { useTranslation } from 'react-i18next';
import { TacticalCard } from '@/components/ui/TacticalCard';

interface MyComponentProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  variant = 'default', 
  className 
}) => {
  const { t } = useTranslation();
  
  return (
    <TacticalCard glow="primary" className={className}>
      {t('key.path')}
    </TacticalCard>
  );
};
```

### RLS Pattern (Coming in Sprint 1)
```typescript
import { applyDivisionFilter } from '@/lib/rls';

const filteredData = applyDivisionFilter(
  allData, 
  userDivisionId, 
  userRole
);
```

---

## 🔗 Quick Links

- **Lovable Dashboard**: https://lovable.dev/projects/[project-id]
- **Deployment**: TBD (Netlify/Vercel)
- **Supabase**: TBD (future real API)

---

## 💡 Quick Tips

### Adding New Feature
1. Define types in `src/types/index.ts`
2. Create mock data in `src/mocks/[domain].ts`
3. Add service in `src/api/services/[domain].ts`
4. Build components in `src/components/[domain]/`
5. Add route in `src/App.tsx`
6. Add i18n keys to `src/i18n/locales/[en|it].json`

### Using shadcn/ui Component
```bash
npx shadcn-ui@latest add [component-name]
```

### Changing Language
```typescript
import { useTranslation } from 'react-i18next';

const { i18n } = useTranslation();
i18n.changeLanguage('en'); // or 'it'
```

### Accessing Auth State
```typescript
import { useAuthStore } from '@/stores/authStore';

const { isAuthenticated, currentUser, login, logout } = useAuthStore();
```

---

## 📞 Support

- **Issues**: GitHub Issues
- **Documentation**: See `docs/` folder
- **Questions**: Check BDD scenarios or architecture docs first

---

**Version**: 1.0  
**Maintained**: Active Development (Sprint 1/5)  
**Next Review**: Sprint 2 Start (Week 3 Gennaio 2025)
