# TicOps - Sistema Multi-Organizzazione e Federazioni

## Architettura Gerarchica

### Livelli di Visibilità

```
Federation (Federazione Nazionale)
├── Organization (Franchising/Provincia)
│   ├── Division (Settore/Area)
│   │   ├── Fields (Campi)
│   │   ├── Teams (Squadre)
│   │   ├── Users (Utenti)
│   │   └── Matches (Partite)
```

### Entità Principali

#### 1. Federation (Federazione)
- **Scopo**: Organizzazione nazionale/internazionale che coordina più organizzazioni
- **Attributi**:
  - `id`: Identificativo univoco
  - `name`: Nome federazione (es. "FITAG - Federazione Italiana Tactical Airsoft")
  - `code`: Codice breve (es. "FITAG")
  - `country`: Nazione
  - `logo`: Logo ufficiale
  - `website`: Sito web
  - `email`: Email di contatto
  - `phone`: Telefono
  - `regulations`: Link regolamento
  - `isActive`: Stato attivo/inattivo
  - `createdAt`: Data creazione
  - `settings`: Configurazioni (formati partite, ranking system, ecc.)

#### 2. Organization (Organizzazione/Franchising)
- **Scopo**: Entità locale che gestisce più divisioni (es. TicOps Lombardia, TicOps Veneto)
- **Attributi**:
  - `id`: Identificativo univoco
  - `federationId`: Riferimento alla federazione
  - `name`: Nome (es. "TicOps Lombardia")
  - `code`: Codice breve (es. "TICO-LOM")
  - `province`: Provincia principale
  - `region`: Regione
  - `address`: Indirizzo sede
  - `logo`: Logo
  - `adminUsers`: Array di admin user IDs
  - `isActive`: Stato attivo/inattivo
  - `createdAt`: Data creazione

#### 3. Division (Divisione/Settore)
- **Scopo**: Suddivisione operativa dell'organizzazione (es. TicOps Milano Nord)
- **Attributi**:
  - `id`: Identificativo univoco
  - `organizationId`: Riferimento all'organizzazione
  - `name`: Nome divisione (es. "Milano Nord")
  - `code`: Codice breve (es. "MI-N")
  - `area`: Area geografica
  - `managerUserId`: Responsabile divisione
  - `isDefault`: Divisione di default per nuovi utenti
  - `isActive`: Stato attivo/inattivo
  - `createdAt`: Data creazione

### Relazioni tra Entità

```typescript
// Ogni utente appartiene a una divisione specifica
User {
  divisionId: string;
  organizationId: string; // Denormalizzato per query veloci
  federationId: string; // Denormalizzato per query veloci
}

// Ogni campo appartiene a una divisione
Field {
  divisionId: string;
  organizationId: string;
  federationId: string;
}

// Ogni partita è associata a una divisione
Match {
  divisionId: string;
  organizationId: string;
  federationId: string;
  fieldId: string;
}

// Ogni team appartiene a una divisione
Team {
  divisionId: string;
  organizationId: string;
  federationId: string;
}
```

## Permessi e Visibilità

### Livelli di Accesso

1. **Federation Admin**
   - Vede tutte le organizzazioni e divisioni
   - Gestisce regolamenti e configurazioni globali
   - Approva nuove organizzazioni
   - Accede a statistiche aggregate

2. **Organization Admin**
   - Vede tutte le divisioni della propria organizzazione
   - Crea e gestisce divisioni
   - Assegna manager alle divisioni
   - Vede report aggregati dell'organizzazione

3. **Division Manager**
   - Vede solo la propria divisione
   - Gestisce campi, utenti, team della divisione
   - Organizza partite nella divisione
   - Accede a report della divisione

4. **Field Manager**
   - Gestisce solo i propri campi
   - Vede partite programmate sui propri campi
   - Può appartenere a una divisione specifica

5. **User (Player/Team Leader)**
   - Vede solo contenuti della propria divisione
   - Può partecipare a partite inter-divisione se autorizzato

## Funzionalità Admin

### 1. Gestione Federazioni (`/admin/federations`)
- **Lista federazioni**: Tabella con filtri (paese, stato attivo)
- **Dettaglio federazione**: 
  - Info base
  - Lista organizzazioni associate
  - Statistiche (numero org, divisioni, utenti)
  - Configurazioni regolamento
- **CRUD**: Crea, modifica, disattiva federazioni

### 2. Gestione Organizzazioni (`/admin/organizations`)
- **Lista organizzazioni**: Tabella con filtri (federazione, regione, stato)
- **Dettaglio organizzazione**:
  - Info base
  - Lista divisioni
  - Admin users
  - Statistiche (campi, team, partite)
- **CRUD**: Crea, modifica, disattiva organizzazioni

### 3. Gestione Divisioni (`/admin/divisions`)
- **Lista divisioni**: Tabella con filtri (organizzazione, area, stato)
- **Dettaglio divisione**:
  - Info base
  - Manager assegnato
  - Lista campi
  - Lista team
  - Lista utenti
- **CRUD**: Crea, modifica, disattiva divisioni

### 4. Gestione Anagrafiche

Sezione unificata per gestire tutte le entità:

#### `/admin/entities`
- **Sidebar con categorie**:
  - Federazioni
  - Organizzazioni
  - Divisioni
  - Campi
  - Utenti
  - Team
  - Partite
  - Referee
  - Shop

- **Design pulito** (no lucine CoD):
  - Tabelle semplici con righe alternate
  - Filtri in toolbar
  - Paginazione standard
  - Azioni inline (edit, delete, view)
  - Breadcrumb per navigazione
  - Form modali per CRUD

## UI/UX Admin

### Design System Admin
- **Palette colori**: Grigio/Blu professionale
- **Font**: Inter/Roboto
- **Layout**: Sidebar fissa + content area
- **Componenti**:
  - DataTable con sorting/filtering
  - Form con validation
  - Modal per CRUD
  - Toast per feedback
  - Breadcrumb navigation
  - Stat cards per overview

### Flusso Navigazione
```
/admin → Overview Dashboard
  ├── /admin/federations → Lista/CRUD Federazioni
  ├── /admin/organizations → Lista/CRUD Organizzazioni
  ├── /admin/divisions → Lista/CRUD Divisioni
  ├── /admin/entities → Gestione Anagrafiche
  │   ├── /admin/entities/fields
  │   ├── /admin/entities/users
  │   ├── /admin/entities/teams
  │   └── ...
  └── (ritorno a Overview obbligatorio per uscire)
```

## Migrazione e Setup Iniziale

### Default Setup
1. **Federazione Default**: "Independent Tactical League" (ITL)
2. **Organizzazione Default**: "TicOps Italy"
3. **Divisione Default**: "General"
4. **Assegnazione automatica**: Nuovi utenti → Divisione default

### Script Migrazione
```typescript
// Aggiungere campi alle entità esistenti
Users: { divisionId: 'default-div-id', organizationId: 'default-org-id', federationId: 'default-fed-id' }
Fields: { divisionId: 'default-div-id', organizationId: 'default-org-id', federationId: 'default-fed-id' }
Teams: { divisionId: 'default-div-id', organizationId: 'default-org-id', federationId: 'default-fed-id' }
Matches: { divisionId: 'default-div-id', organizationId: 'default-org-id', federationId: 'default-fed-id' }
```

## API Endpoints

### Federations
- `GET /api/federations` - Lista federazioni
- `GET /api/federations/:id` - Dettaglio federazione
- `POST /api/federations` - Crea federazione
- `PUT /api/federations/:id` - Modifica federazione
- `DELETE /api/federations/:id` - Elimina federazione

### Organizations
- `GET /api/organizations` - Lista organizzazioni
- `GET /api/organizations/:id` - Dettaglio organizzazione
- `GET /api/organizations?federationId=xxx` - Filtra per federazione
- `POST /api/organizations` - Crea organizzazione
- `PUT /api/organizations/:id` - Modifica organizzazione
- `DELETE /api/organizations/:id` - Elimina organizzazione

### Divisions
- `GET /api/divisions` - Lista divisioni
- `GET /api/divisions/:id` - Dettaglio divisione
- `GET /api/divisions?organizationId=xxx` - Filtra per organizzazione
- `POST /api/divisions` - Crea divisione
- `PUT /api/divisions/:id` - Modifica divisione
- `DELETE /api/divisions/:id` - Elimina divisione

## Sicurezza e Query Filtering

### Row Level Security (RLS)
```sql
-- Utenti vedono solo dati della propria divisione
SELECT * FROM matches 
WHERE divisionId = current_user.divisionId;

-- Admin organizzazione vedono tutte le divisioni dell'org
SELECT * FROM matches 
WHERE organizationId = current_user.organizationId;

-- Admin federazione vedono tutto
SELECT * FROM matches 
WHERE federationId = current_user.federationId;
```

### Context Provider
```typescript
// Gestisce divisione attiva e permessi
const { 
  currentDivision, 
  currentOrganization, 
  currentFederation,
  canManageDivisions,
  canManageOrganizations,
  canManageFederations
} = useOrgContext();
```

## Roadmap Implementazione

### Phase 1: Struttura Base (Sprint 1-2)
- [ ] Creare tipi TypeScript (Federation, Organization, Division)
- [ ] Setup database schema
- [ ] Migrare dati esistenti a struttura gerarchica
- [ ] Context provider per org/division attiva

### Phase 2: Admin UI (Sprint 3-4)
- [ ] Layout admin pulito (no tactical theme)
- [ ] Gestione Federazioni (CRUD)
- [ ] Gestione Organizzazioni (CRUD)
- [ ] Gestione Divisioni (CRUD)
- [ ] Navigation guard (obbligatorio passare da overview)

### Phase 3: Gestione Anagrafiche (Sprint 5-6)
- [ ] Sezione /admin/entities
- [ ] CRUD Campi con filtri divisione
- [ ] CRUD Utenti con assegnazione divisione
- [ ] CRUD Team con divisione
- [ ] CRUD Partite con divisione

### Phase 4: Permessi e Visibilità (Sprint 7-8)
- [ ] Row Level Security
- [ ] Filtri automatici per divisione attiva
- [ ] Switch divisione (per admin multi-divisione)
- [ ] Dashboard differenziata per livello accesso

### Phase 5: SpectatorView Fix (Sprint 1)
- [ ] Fix route SpectatorView not found
- [ ] Verifica import e export corretti
