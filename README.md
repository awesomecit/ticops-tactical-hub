# TicOps Tactical Hub

Piattaforma di gestione competizioni airsoft tactical con UI ispirata a Call of Duty. Costruita con React + TypeScript + Vite, con architettura mock-first pronta per integrazione Supabase Edge Functions.

## 📊 Stato Progetto

**Versione**: 0.9.0 (MVP + Multi-Org Architecture)
**Completamento**: 85%
- ✅ 12 feature core completate
- 🚧 2 feature in sviluppo (Multi-Org, Admin Anagrafiche)
- 🐛 1 bug fix (SpectatorView)

## 🏗️ Architettura

### Core Philosophy: Regola Zero
Prima di creare qualsiasi componente, hook o servizio:
1. **Serve davvero?** (Problema reale NOW)
2. **Perché serve?** (Una frase)
3. **Trade-offs?** (Pro E contro)
4. **Alternative?** (Esiste già? Soluzione più semplice?)

### Stack Tecnologico
- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router v6 con ProtectedRoute
- **State**: Zustand (auth, notifications, UI)
- **Styling**: Tailwind CSS + shadcn/ui + Tactical Design System
- **i18n**: react-i18next (IT default)
- **Mock Data**: Centralizzato in `src/mocks/`
- **API**: Mock-first (`USE_MOCK = true`) con pattern `ApiResult<T>`

### Pattern Architetturali

#### Mock-First API
```typescript
// Tutti i servizi usano mock data di default
export const gamesService = { 
  getAll: () => mockApi(mockGames) 
};
// Per swap a API reale: USE_MOCK = false + apiGet()/apiPost()
```

#### Multi-Organization Hierarchy
```
Federation (Nazionale)
├── Organization (Franchising/Provincia)  
│   ├── Division (Settore/Area)
│   │   ├── Fields, Teams, Users, Matches
```

Vedi `docs/MULTI_ORG_ARCHITECTURE.md` per dettagli completi.

## 🎯 Features Principali

### ✅ Completate (MVP)
- 🔍 Ricerca campi avanzata (filtri, recensioni, disponibilità)
- 👤 Sommario utente personalizzato per ruolo
- 🔔 Sistema alert (shop, campi, disponibilità)
- 💬 Messaggistica diretta (shop, campi, arbitri, giocatori)
- 📻 Radio team con canali dedicati
- 🌐 Integrazione social media (Discord, Instagram, Telegram, WhatsApp)
- 🔐 RBAC completo (6 ruoli: player, team_leader, referee, field_manager, shop_owner, admin)
- ⚡ Sistema real-time mock (pronto per Supabase Realtime)
- 🏆 Achievement & rewards system
- 🎮 HUD gameplay avanzato con mappa tattica interattiva
- 🛒 Marketplace compra/vendi/scambia
- 📅 Match organizer con gestione iscrizioni

### 🚧 In Sviluppo
- 🏢 **Sistema Multi-Organizzazione** (Sprint 1-2)
  - Federazioni → Organizzazioni → Divisioni
  - Visibilità controllata per entità
  - Row Level Security

- 📋 **Gestione Anagrafiche Admin** (Sprint 3-4)
  - UI pulita (no tactical theme)
  - CRUD tutte le entità
  - Filtri avanzati, paginazione
  - Navigation guard (uscita via overview)

### 🐛 Bug Fix
- SpectatorView Not Found (Alta priorità)

## 📁 Struttura Progetto

```
src/
├── api/              # Services mock-first
│   ├── client.ts     # API client + error handling
│   ├── mock.ts       # Mock orchestrator (USE_MOCK flag)
│   └── services/     # Domain services
├── components/       # Componenti UI
│   ├── admin/        # Admin panels
│   ├── dashboard/    # Dashboard widgets
│   ├── gameplay/     # HUD + TacticalMap
│   │   └── map-elements/  # SpawnZone, Building, Trees, Paths
│   ├── layout/       # MainLayout, Sidebar, Header
│   └── ui/           # shadcn/ui + TacticalCard
├── contexts/         # React Context providers
├── hooks/            # Custom hooks
├── i18n/             # Traduzioni (it, en)
├── mocks/            # Mock data hub
├── pages/            # Route pages
│   └── admin/        # Admin routes
├── stores/           # Zustand stores
└── types/            # TypeScript types
docs/
├── MULTI_ORG_ARCHITECTURE.md
├── FEATURES_ROADMAP.md
├── USER_ROLES_FEATURES.md
├── GAMEPLAY_UI_COMPONENTS.md
└── API.md
```

## 🚀 Quick Start
## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (consigliato: nvm)
- Bun o npm/yarn

### Installation

```sh
# Clone repository
git clone <YOUR_GIT_URL>
cd ticops-tactical-hub

# Install dependencies
bun install
# oppure: npm install

# Start dev server (porta 8080)
bun dev
# oppure: npm run dev
```

### Build & Deploy

```sh
# Production build
bun run build

# Development build
bun run build:dev

# Preview build
bun run preview
```

## 🎮 Demo & Login

### Demo Mode
Accesso rapido senza registrazione:
```
URL: http://localhost:8080/demo
```
Auto-login come `player@demo.it` con tour guidato delle feature.

### Demo Users (6 ruoli)
```
player@demo.it      / demo123  → Giocatore base
teamleader@demo.it  / demo123  → Team Leader (gestione team)
referee@demo.it     / demo123  → Arbitro (gestione partite)
field@demo.it       / demo123  → Field Manager (gestione campi)
shop@demo.it        / demo123  → Shop Owner (gestione negozio)
admin@demo.it       / demo123  → Admin (accesso totale)
```

## 📚 Documentazione

### Guide Principali
- **[Multi-Org Architecture](docs/MULTI_ORG_ARCHITECTURE.md)**: Sistema federazioni/organizzazioni/divisioni
- **[Features Roadmap](docs/FEATURES_ROADMAP.md)**: Task atomici e stato implementazione
- **[User Roles](docs/USER_ROLES_FEATURES.md)**: Matrice ruoli e permessi
- **[Gameplay UI](docs/GAMEPLAY_UI_COMPONENTS.md)**: Componenti HUD tattico
- **[API Design](docs/API.md)**: Struttura Edge Functions

### Convenzioni

#### Git Workflow: Trunk-Based Development
```bash
# Branch naming
feat/short-description    # New features
fix/issue-description     # Bug fixes  
chore/task-description    # Tooling
docs/topic                # Documentation

# Daily workflow
git checkout main && git pull
git checkout -b feat/team-chat
git commit -m "feat(chat): add real-time messaging"
git push -u origin feat/team-chat
# PR → Merge → Delete branch
```

#### Conventional Commits
```
feat(scope): description     # New feature
fix(scope): description      # Bug fix
refactor(scope): description # Code change
style(scope): description    # Formatting, CSS
docs(scope): description     # Documentation
chore(scope): description    # Build, deps, tooling
```

Esempi:
```bash
feat(gameplay): add interactive tactical map with pan/zoom
fix(auth): prevent token expiration race condition
refactor(api): simplify mock service structure
docs(readme): update multi-org architecture
```

## 🏛️ Multi-Organization System (NEW)

### Gerarchia
1. **Federation**: Organizzazione nazionale (es. "FITAG")
2. **Organization**: Franchising/Provincia (es. "TicOps Lombardia")
3. **Division**: Settore/Area (es. "Milano Nord")

### Visibilità & Permessi
- **Federation Admin**: Vede tutto
- **Organization Admin**: Vede tutte le divisioni dell'org
- **Division Manager**: Vede solo la propria divisione
- **Field Manager**: Gestisce solo i propri campi
- **User**: Vede contenuti della propria divisione

### Entità Estese
Tutte le entità ora includono:
```typescript
{
  divisionId: string;
  organizationId: string;
  federationId: string;
}
```

Applica a: `User`, `Field`, `Team`, `Match`.

## 🎨 Design System

### Tactical Theme (User-Facing)
- **Primary**: Orange (`hsl(25 100% 50%)`) - CTAs
- **Secondary**: Tactical Green (`hsl(152 100% 50%)`) - Success
- **Accent**: Gold (`hsl(51 100% 50%)`) - Achievements
- **Team Colors**: Alpha (blu), Bravo (rosso)
- **Font**: Rajdhani (display), Inter (body), JetBrains Mono (mono)
- **Custom CSS**: `clip-tactical`, `scanlines`, `hud-corner`, `text-glow-primary`

### Admin Theme (Clean)
- **Palette**: Grigio/Blu professionale
- **Font**: Inter/Roboto
- **Layout**: Sidebar fissa + content area
- **No**: Animazioni tactical, scanlines, lucine

## 🧪 Testing

### Demo Users Testing
Testare ogni ruolo con utenti dedicati:
```
/login → Seleziona ruolo → Verifica menu sidebar → Testa funzioni specifiche
```

### Feature Testing Checklist
- [ ] Login con tutti i 6 ruoli
- [ ] Navigazione sidebar role-based
- [ ] CRUD entità (se admin)
- [ ] Filtri e ricerca
- [ ] Modal e form validation
- [ ] Toast notifications
- [ ] Responsive (mobile, tablet, desktop)

## 🔧 Development Commands

```bash
bun dev              # Dev server (port 8080)
bun run build        # Production build
bun run build:dev    # Development build
bun run lint         # ESLint check
bun run preview      # Preview production build
```

## 🚢 Deployment

Piattaforma: **Lovable** (git integration)

```
Push → Auto-deploy → https://lovable.dev/projects/<PROJECT_ID>
```

Oppure deploy manuale:
```bash
bun run build
# Upload dist/ to hosting (Netlify, Vercel, etc.)
```

## 🤝 Contributing

1. Fork repository
2. Crea feature branch (`feat/amazing-feature`)
3. Commit con conventional commits
4. Push branch
5. Apri Pull Request

**Importante**: Applica sempre Regola Zero prima di creare codice.

## 📄 License

MIT License - vedi [LICENSE](LICENSE) per dettagli.

## 🔗 Links

- **Lovable Project**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID
- **Documentation**: `docs/`
- **Issues**: GitHub Issues

---

**Mantenuto con ❤️ dal team TicOps**
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
