# TicOps RBAC System - Role-Based Access Control

> Documento di riferimento per autorizzazioni, visibilità e vincoli per ruolo

---

## 📋 Indice

1. [Ruoli Definiti](#ruoli-definiti)
2. [Matrice Autorizzazioni Path](#matrice-autorizzazioni-path)
3. [Matrice Visibilità Componenti](#matrice-visibilità-componenti)
4. [Vincoli e Soglie per Ruolo](#vincoli-e-soglie-per-ruolo)
5. [Gap e TODO](#gap-e-todo)
6. [Implementazione Tecnica](#implementazione-tecnica)

---

## 🎭 Ruoli Definiti

| Ruolo | Codice | Livello | Descrizione |
|-------|--------|---------|-------------|
| Giocatore | `player` | 1 | Utente base, può partecipare a partite |
| Capitano | `team_leader` | 2 | Gestisce la propria squadra |
| Arbitro | `referee` | 3 | Può arbitrare partite |
| Gestore Campo | `field_manager` | 3 | Gestisce uno o più campi |
| Negoziante | `shop_owner` | 3 | Gestisce un negozio |
| Admin | `admin` | 10 | Accesso completo al sistema |

### Gerarchia Ruoli

```
admin (10)
   ├── referee (3)
   ├── field_manager (3)
   └── shop_owner (3)
        └── team_leader (2)
             └── player (1)
```

---

## 🔐 Matrice Autorizzazioni Path

### Pagine Pubbliche (No Auth)

| Path | Descrizione | Stato |
|------|-------------|-------|
| `/landing` | Landing page | ✅ Attivo |
| `/demo` | Demo mode | ✅ Attivo |
| `/register` | Registrazione | ✅ Attivo |
| `/login` | Login | ✅ Attivo |

### Pagine Autenticate (Tutti i ruoli)

| Path | Descrizione | Protezione | Stato |
|------|-------------|------------|-------|
| `/` | Dashboard | `ProtectedRoute` | ✅ Attivo |
| `/games` | Lista partite | `ProtectedRoute` | ✅ Attivo |
| `/games/:gameId` | Dettaglio partita | `ProtectedRoute` | ✅ Attivo |
| `/team` | Gestione squadra | `ProtectedRoute` | ✅ Attivo |
| `/team/inbox` | Inbox squadra | `ProtectedRoute` | ✅ Attivo |
| `/chat` | Chat | `ProtectedRoute` | ✅ Attivo |
| `/chat/:conversationId` | Conversazione | `ProtectedRoute` | ✅ Attivo |
| `/leaderboard` | Classifica | `ProtectedRoute` | ✅ Attivo |
| `/locations` | Campi | `ProtectedRoute` | ✅ Attivo |
| `/locations/:slug` | Dettaglio campo | `ProtectedRoute` | ✅ Attivo |
| `/shop` | Negozio | `ProtectedRoute` | ✅ Attivo |
| `/profile` | Profilo | `ProtectedRoute` | ✅ Attivo |
| `/equipment` | Equipaggiamento | `ProtectedRoute` | ✅ Attivo |
| `/marketplace` | Mercatino | `ProtectedRoute` | ✅ Attivo |
| `/organize` | Organizza partita | `ProtectedRoute` | ✅ Attivo |
| `/achievements` | Achievement | `ProtectedRoute` | ✅ Attivo |
| `/about` | About | `ProtectedRoute` | ✅ Attivo |
| `/settings` | Impostazioni | `ProtectedRoute` | ✅ Attivo |

### Pagine Gameplay

| Path | Descrizione | Protezione | Ruoli | Stato |
|------|-------------|------------|-------|-------|
| `/gameplay` | Vista gameplay | Nessuna | - | ⚠️ Da proteggere |
| `/gameplay/:gameId` | Gameplay partita | Nessuna | - | ⚠️ Da proteggere |
| `/spectator/:gameId` | Spettatore | Nessuna | Pubblico | ✅ OK (pubblico) |
| `/referee/:gameId` | Vista arbitro | `ProtectedRoute` | `referee`, `admin` | ✅ Attivo |

### Pagine Role-Specific

| Path | Descrizione | Protezione | Ruoli | Stato |
|------|-------------|------------|-------|-------|
| `/admin/*` | Area admin | `ProtectedRoute` | `admin` | ✅ Attivo |
| `/field-manager/fields` | Gestione campi | - | `field_manager`, `admin` | ❌ 404 |
| `/shop-manager/dashboard` | Gestione negozio | - | `shop_owner`, `admin` | ❌ 404 |
| `/profile/referee-assignments` | Incarichi arbitro | - | `referee`, `admin` | ❌ 404 |

### Rotte Admin

| Path | Descrizione | Stato |
|------|-------------|-------|
| `/admin` | Dashboard admin | ✅ Attivo |
| `/admin/fields` | Gestione campi | ✅ Attivo |
| `/admin/referees` | Gestione arbitri | ✅ Attivo |
| `/admin/users` | Gestione utenti | ✅ Attivo |
| `/admin/matches` | Gestione partite | ✅ Attivo |
| `/admin/matches/:matchId` | Dettaglio partita | ✅ Attivo |
| `/admin/reports` | Report | ✅ Attivo |
| `/admin/analytics` | Analytics | ✅ Attivo |
| `/admin/radio` | Frequenze radio | ✅ Attivo |
| `/admin/views` | Tutte le viste | ✅ Attivo |

---

## 👁️ Matrice Visibilità Componenti

### Sidebar Navigation

| Sezione | player | team_leader | referee | field_manager | shop_owner | admin |
|---------|--------|-------------|---------|---------------|------------|-------|
| Menu Base | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Radio Widget | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Gestione Campo | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Gestione Negozio | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Arbitraggio | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |
| Admin | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

### Componenti Team Page

| Componente/Azione | player | team_leader | admin | Stato |
|-------------------|--------|-------------|-------|-------|
| Visualizza team | ✅ | ✅ | ✅ | ✅ Attivo |
| Attiva Radio | ❌ | ✅ | ✅ | ✅ Attivo |
| Gestisci membri | ❌ | ✅ | ✅ | ⚠️ Da verificare |
| Invita giocatori | ❌ | ✅ | ✅ | ⚠️ Da verificare |
| Modifica team | ❌ | ✅ | ✅ | ⚠️ Da verificare |

### Componenti Equipment Page

| Componente/Azione | player | team_leader | admin | Stato |
|-------------------|--------|-------------|-------|-------|
| Visualizza equipment | ✅ | ✅ | ✅ | ✅ Attivo |
| Controlli Radio | ❌ | ✅ | ✅ | ⚠️ Visibile a tutti |
| Aggiungi equipment | ✅ | ✅ | ✅ | ✅ Attivo |

### Componenti Marketplace

| Componente/Azione | player | team_leader | admin | Stato |
|-------------------|--------|-------------|-------|-------|
| Visualizza annunci | ✅ | ✅ | ✅ | ✅ Attivo |
| Crea annuncio | ✅ | ✅ | ✅ | ⚠️ Nessun limite |
| Contatta venditore | ✅ | ✅ | ✅ | ✅ Attivo |
| Modifica annuncio proprio | ✅ | ✅ | ✅ | ✅ Attivo |
| Elimina qualsiasi annuncio | ❌ | ❌ | ✅ | ⚠️ Da implementare |

### Componenti Game/Partite

| Componente/Azione | player | team_leader | referee | admin | Stato |
|-------------------|--------|-------------|---------|-------|-------|
| Visualizza partite | ✅ | ✅ | ✅ | ✅ | ✅ Attivo |
| Partecipa a partita | ✅ | ✅ | ❌ | ✅ | ⚠️ Nessun limite |
| Crea partita | ❌ | ✅ | ❌ | ✅ | ⚠️ Da verificare |
| Arbitra partita | ❌ | ❌ | ✅ | ✅ | ✅ Attivo |
| Annulla partita | ❌ | ✅* | ❌ | ✅ | ⚠️ *Solo proprie |

---

## ⚖️ Vincoli e Soglie per Ruolo

### Player (Utente Base)

| Vincolo | Valore | Stato |
|---------|--------|-------|
| Max partite al giorno | 3 | ❌ Non implementato |
| Cooldown tra partite | 30 min | ❌ Non implementato |
| Max messaggi chat/ora | 100 | ❌ Non implementato |
| Max annunci marketplace attivi | 5 | ❌ Non implementato |
| Max richieste team pendenti | 3 | ❌ Non implementato |
| Può creare team | ❌ | ⚠️ Da verificare |
| Può invitare a team | ❌ | ⚠️ Da verificare |

### Team Leader

| Vincolo | Valore | Stato |
|---------|--------|-------|
| Max membri team | 20 | ❌ Non implementato |
| Max partite team/giorno | 5 | ❌ Non implementato |
| Può attivare radio | ✅ | ✅ Implementato |
| Può gestire membri | ✅ | ⚠️ Da verificare |
| Può sciogliere team | ✅ | ⚠️ Da verificare |

### Referee

| Vincolo | Valore | Stato |
|---------|--------|-------|
| Max partite arbitrate/giorno | 3 | ❌ Non implementato |
| Può accedere a vista arbitro | ✅ | ✅ Implementato |
| Può dichiarare kill | ✅ | ✅ Implementato |
| Può terminare partita | ✅ | ⚠️ Da verificare |

### Field Manager

| Vincolo | Valore | Stato |
|---------|--------|-------|
| Max campi gestiti | 5 | ❌ Non implementato |
| Può creare eventi | ✅ | ❌ Pagina mancante |
| Può gestire prenotazioni | ✅ | ❌ Pagina mancante |

### Shop Owner

| Vincolo | Valore | Stato |
|---------|--------|-------|
| Max negozi | 1 | ❌ Non implementato |
| Può creare promozioni | ✅ | ❌ Pagina mancante |
| Dashboard vendite | ✅ | ❌ Pagina mancante |

### Admin

| Privilegio | Stato |
|------------|-------|
| Accesso completo | ✅ Implementato |
| Bypass tutti i limiti | ⚠️ Implicito |
| Gestione utenti | ✅ Implementato |
| Gestione frequenze radio | ✅ Implementato |
| Visualizza tutte le viste | ✅ Implementato |

---

## 🔴 Gap e TODO

### Priorità Alta (Sicurezza)

| ID | Descrizione | File Coinvolti |
|----|-------------|----------------|
| GAP-001 | `/gameplay` accessibile senza auth | `App.tsx` |
| GAP-002 | Pagine field_manager inesistenti | Nuovi file |
| GAP-003 | Pagine shop_owner inesistenti | Nuovi file |
| GAP-004 | Pagine referee assignments inesistenti | Nuovi file |

### Priorità Media (Funzionalità)

| ID | Descrizione | File Coinvolti |
|----|-------------|----------------|
| GAP-005 | Controlli radio visibili a tutti in Equipment | `Equipment.tsx` |
| GAP-006 | Nessun limite annunci marketplace | `Marketplace.tsx` |
| GAP-007 | Nessun limite partite giornaliere | `GameDetail.tsx`, store |
| GAP-008 | Admin non può eliminare annunci altrui | `Marketplace.tsx` |

### Priorità Bassa (Enhancement)

| ID | Descrizione | File Coinvolti |
|----|-------------|----------------|
| GAP-009 | Manca sistema cooldown partite | Nuovo hook/store |
| GAP-010 | Manca rate limiting messaggi chat | `chatStore.ts` |
| GAP-011 | Manca limite membri team | `Team.tsx`, store |

---

## 🛠️ Implementazione Tecnica

### Helper Functions (`src/lib/auth.ts`)

```typescript
// Funzioni disponibili
hasRole(userRole, requiredRole)      // Check ruolo esatto
hasAnyRole(userRole, roles[])        // Check uno tra più ruoli
isAdmin(userRole)                    // Check admin
canManageTeam(userRole)              // team_leader | admin
isReferee(userRole)                  // referee | admin
canManageField(userRole)             // field_manager | admin
canManageShop(userRole)              // shop_owner | admin
getRoleLabel(role)                   // Label italiano
getRoleColor(role)                   // Colori badge
```

### Componenti di Protezione

```tsx
// Protezione rotte
<ProtectedRoute requireAdmin>         // Solo admin
<ProtectedRoute roles={['referee']}>  // Ruoli specifici

// Visibilità condizionale UI
<RoleGate role="admin">               // Singolo ruolo
<RoleGate roles={['admin', 'ref']}>   // Multipli ruoli
<RoleGate role="admin" fallback={<X/>}> // Con fallback
```

### Pattern Consigliato

```tsx
// ✅ Corretto - Protezione rotta
<Route path="/admin/*" element={
  <ProtectedRoute requireAdmin redirectTo="/access-denied">
    <AdminLayout />
  </ProtectedRoute>
} />

// ✅ Corretto - Visibilità componente
<RoleGate roles={['team_leader', 'admin']}>
  <Button>Attiva Radio</Button>
</RoleGate>

// ❌ Errato - Check manuale inline
{user?.role === 'admin' && <AdminButton />}
```

---

## 📝 Changelog

| Data | Versione | Modifiche |
|------|----------|-----------|
| 2025-12-25 | 1.0.0 | Documento iniziale con gap analysis |

---

*Documento generato automaticamente - Ultimo aggiornamento: 25 Dicembre 2025*
