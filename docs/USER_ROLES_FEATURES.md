# TicOps - User Roles, Features & Menu Matrix

## 📊 Ruoli Utente

```typescript
export type UserRole = 
  | 'player'           // Giocatore base
  | 'team_leader'      // Capitano squadra
  | 'referee'          // Arbitro certificato
  | 'field_manager'    // Gestore campo
  | 'shop_owner'       // Proprietario negozio
  | 'admin'            // Amministratore sistema
```

### Gerarchia Ruoli

```
Level 10: admin              (accesso totale)
Level  3: referee, field_manager, shop_owner (gestione specializzata)
Level  2: team_leader        (gestione team)
Level  1: player             (base)
```

---

## 🎮 1. PLAYER (Giocatore Base)

### Caratteristiche

- Ruolo di default per tutti gli utenti registrati
- Focus su gameplay, team participation, progressione personale
- Accesso completo alle feature community

### Feature Abilitate

#### Core Gameplay

- ✅ Partecipare a partite (CTF, TDM, Domination)
- ✅ Kill declaration durante match
- ✅ Visualizzare statistiche personali (K/D, ELO, win rate)
- ✅ Sistema ranking con tier (Bronze → Diamond)
- ✅ Unlock achievement e badge

#### Team & Social

- ✅ Unirsi a un team esistente (richiesta approval leader)
- ✅ Chat team privata
- ✅ Visualizzare roster e strategie team
- ✅ Chat 1-to-1 con altri giocatori
- ✅ Friend list e follow system

#### Discovery & Booking

- ✅ Cercare campi softair verificati
- ✅ Visualizzare mappe campi e regolamenti
- ✅ Prenotare slot per partite
- ✅ Recensire campi e arbitri
- ✅ Organizzare match quick (sistema auto-match)

#### Marketplace

- ✅ Pubblicare annunci compra/vendi/scambia
- ✅ Chat privata con venditori
- ✅ Lasciare recensioni venditori
- ✅ Sistema wishlist e alert prezzi

#### Progression

- ✅ Sistema ELO competitivo
- ✅ Achievement system (200+ badge)
- ✅ Tier progression (con perks esclusivi)
- ✅ Leaderboard globali e regionali

### Menu Sidebar

```
📊 Dashboard          → /
🎯 Partite            → /games
📅 Organizza          → /organize (quick match)
👥 Team               → /team
💬 Chat               → /chat
🏆 Classifiche        → /leaderboard
🏅 Achievement        → /achievements
📍 Campi              → /locations
🎒 Equipaggiamento    → /equipment
🛒 Marketplace        → /marketplace
👤 Profilo            → /profile
```

### Limitazioni

- ❌ Non può creare team (solo unirsi)
- ❌ Non può organizzare tornei ufficiali
- ❌ Non può arbitrare partite
- ❌ Non può gestire campi o negozi
- ❌ Non può accedere a funzioni admin

---

## 👑 2. TEAM_LEADER (Capitano Squadra)

### Caratteristiche

- Tutti i privilegi di **player**
- Gestione completa del proprio team
- Organizzazione eventi team
- Strategie e loadout condivisi

### Feature Aggiuntive (oltre a player)

#### Team Management

- ✅ Creare nuovo team (nome, tag, logo, colori)
- ✅ Invitare giocatori nel team
- ✅ Approvare/rifiutare richieste join
- ✅ Assegnare ruoli (officer, member)
- ✅ Rimuovere membri (kick)
- ✅ Modificare info team (descrizione, requisiti)

#### Team Operations

- ✅ Organizzare allenamenti privati
- ✅ Creare strategie condivise (playbook)
- ✅ Gestire loadout team
- ✅ Inbox team con notifiche prioritarie
- ✅ Calendario eventi team
- ✅ Statistiche team aggregate

#### Communication

- ✅ Radio PTT team (Push-To-Talk)
- ✅ Broadcast messaggi a tutto il team
- ✅ Creare canali chat team multipli
- ✅ Gestire permessi comunicazione

#### Tournaments

- ✅ Iscrivere team a tornei
- ✅ Gestire roster per competizioni
- ✅ Confermare disponibilità membri
- ✅ Visualizzare match history team

### Menu Sidebar

```
[IDENTICO A PLAYER + funzioni avanzate dentro /team]

Differenze:
👥 Team               → /team (+ tab Management, Loadouts, Strategie)
    ├─ Overview
    ├─ Roster        [gestione membri]
    ├─ Loadouts      [equipaggiamento team]
    ├─ Strategie     [playbook condiviso]
    ├─ Calendario    [eventi team]
    ├─ Inbox         [notifiche team]
    └─ Statistiche   [analytics team]
```

### Widget Aggiuntivi

- 📻 **Radio Widget**: Sempre visibile in sidebar per PTT rapido
- 🔔 **Team Inbox Badge**: Notifiche richieste join, conferme eventi

---

## 🏁 3. REFEREE (Arbitro Certificato)

### Caratteristiche

- Tutti i privilegi di **player**
- Arbitrare partite ufficiali
- Sistema di valutazione da giocatori
- Certificazione e formazione continua

### Feature Aggiuntive

#### Match Officiating

- ✅ Accettare incarichi arbitraggio
- ✅ Accedere a **Referee View** durante match
  - Live map con posizioni giocatori (se IoT attivo)
  - Kill feed in tempo reale
  - Risolvere dispute kill (voting system)
  - Pausa/ripristino match
  - Assegnare penalità (warning, timeout, espulsione)
  - Dichiarare vincitore finale
- ✅ Compilare report post-match
- ✅ Valutare comportamento giocatori

#### Certification

- ✅ Corso formazione arbitri (online)
- ✅ Esame certificazione (rinnovabile annualmente)
- ✅ Sistema livelli arbitro (Junior → Senior → Master)
- ✅ Specializzazioni modalità (CTF specialist, TDM specialist)

#### Community

- ✅ Forum arbitri privato
- ✅ Condividere situazioni complesse (case study)
- ✅ Votare modifiche regolamenti
- ✅ Ricevere pagamento/compenso (se configurato dal campo)

### Menu Sidebar

```
[IDENTICO A PLAYER]

+ Route Speciali:
🏁 Referee View       → /referee/:gameId (accesso durante match assegnati)
📋 I Miei Incarichi   → /profile/referee-assignments
📊 Valutazioni        → /profile/referee-ratings
```

### Badge & Riconoscimenti

- 🎓 Badge "Arbitro Certificato" visibile nel profilo
- ⭐ Rating arbitro (1-5 stelle da giocatori)
- 📈 Statistiche arbitraggio (match arbitrati, dispute risolte, rating medio)

---

## 🏟️ 4. FIELD_MANAGER (Gestore Campo)

### Caratteristiche

- Tutti i privilegi di **player**
- Gestione operativa di uno o più campi
- Calendario prenotazioni
- Monitoraggio eventi e manutenzione

### Feature Aggiuntive

#### Field Management

- ✅ Creare/modificare profilo campo
  - Nome, indirizzo, coordinate GPS
  - Foto gallery, video tour 360°
  - Descrizione, regolamenti
  - Superficie (ettari), terreno (bosco/urbano)
  - Servizi (parcheggio, bar, spogliatoi, crono)
- ✅ Gestire mappe campo (upload custom maps)
- ✅ Definire zone di gioco (spawn, objectives, no-go zones)

#### Scheduling

- ✅ Calendario disponibilità campo
- ✅ Bloccare slot per manutenzione
- ✅ Approvare/rifiutare prenotazioni
- ✅ Prezzi dinamici per slot (weekend, festivi)
- ✅ Pacchetti team/tornei
- ✅ Sistema caparra e pagamenti online

#### Operations

- ✅ Check-in giocatori il giorno dell'evento
- ✅ Assegnare arbitri a partite
- ✅ Monitorare live feed partite sul campo
- ✅ Gestire emergenze (first aid, sicurezza)
- ✅ Log manutenzione campo
- ✅ Inventory attrezzatura (noleggio ASG, munizioni)

#### Analytics

- ✅ Dashboard utilizzo campo
- ✅ Revenue reports
- ✅ Recensioni e rating campo
- ✅ Heatmap presenze (giorni più frequentati)
- ✅ Confronto con altri campi (benchmark)

#### Promotions

- ✅ Creare eventi speciali (themed matches, milsim)
- ✅ Promozioni e sconti (early bird, loyalty)
- ✅ Newsletter iscritti campo

### Menu Sidebar

```
[IDENTICO A PLAYER]

+ Accesso Area Gestionale:
🏟️ I Miei Campi      → /field-manager/fields
    ├─ Overview       [dashboard riepilogo]
    ├─ Calendario     [prenotazioni e disponibilità]
    ├─ Check-in       [lista giocatori del giorno]
    ├─ Mappe          [gestione mappe campo]
    ├─ Prezzi         [listino e pacchetti]
    ├─ Arbitri        [assegnazione e pagamenti]
    ├─ Recensioni     [feedback giocatori]
    ├─ Analytics      [statistiche e revenue]
    └─ Manutenzione   [log interventi]
```

---

## 🛒 5. SHOP_OWNER (Proprietario Negozio)

### Caratteristiche

- Tutti i privilegi di **player**
- Gestione negozio/armeria specializzata
- Inventory management
- Sistema CRM e loyalty

### Feature Aggiuntive (Coming Soon - IoT Module)

#### Shop Management

- ✅ Creare profilo negozio
  - Nome, indirizzo, orari apertura
  - Gallery foto store
  - Specializzazioni (ASG, equipaggiamento, ricambi)
  - Servizi (riparazioni, tuning, cronografia)
- ✅ Catalogo prodotti
  - Upload foto, descrizioni, schede tecniche
  - Categorizzazione (ASG, ottiche, accessori, abbigliamento)
  - Varianti prodotto (colore, taglia)
  - Stock disponibile (sync con inventory)

#### Inventory & Stock

- ✅ **IoT Inventory Control** (barcode scanner integration)
- ✅ Alert giacenze minime
- ✅ Ordini automatici fornitori
- ✅ Tracking spedizioni
- ✅ Gestione resi e garanzie
- ✅ Storico movimenti magazzino

#### Sales & Analytics

- ✅ **Sales Analytics Dashboard** (real-time)
  - Revenue giornaliero/mensile/annuale
  - Prodotti più venduti
  - Trend stagionali
  - Margini e profittabilità
- ✅ Report automatici
- ✅ Previsioni demand (AI-powered)
- ✅ Confronto performance vs competitors

#### CRM & Loyalty

- ✅ **Customer Relationship Management**
  - Database clienti
  - Storico acquisti per cliente
  - Segmentazione clientela (VIP, frequenti, occasionali)
- ✅ **Loyalty Program**
  - Punti fedeltà su acquisti
  - Sconti personalizzati
  - Offerte esclusive membri
- ✅ **Push Notifications**
  - Nuovi arrivi
  - Promozioni flash
  - Wishlist alerts (prodotto tornato disponibile)

#### E-commerce Integration

- ✅ Vendita online con ritiro in store
- ✅ Chat assistenza clienti
- ✅ Recensioni prodotti
- ✅ Sistema prenotazioni prodotti
- ✅ Integrazione spedizionieri

### Menu Sidebar

```
[IDENTICO A PLAYER]

+ Accesso Area Gestionale:
🛒 Il Mio Negozio     → /shop-manager/dashboard
    ├─ Overview       [KPI e statistiche oggi]
    ├─ Prodotti       [catalogo e gestione]
    ├─ Inventory      [magazzino e stock]
    ├─ Ordini         [ordini clienti e fornitori]
    ├─ Analytics      [dashboard vendite]
    ├─ Clienti        [CRM e loyalty]
    ├─ Promozioni     [sconti e campagne]
    ├─ Recensioni     [feedback prodotti]
    └─ Impostazioni   [orari, spedizioni, pagamenti]
```

### IoT Hardware (Premium - Q2 2026)

- 📦 **Barcode Scanner Integration**: Scan rapido per check-in/check-out prodotti
- 📊 **Smart Shelves** (opzionale): RFID tracking per inventory real-time
- 🖨️ **Receipt Printer** con QR code loyalty program
- 📱 **Tablet POS** per vendita assistita in-store

---

## 👤 6. ADMIN (Amministratore Sistema)

### Caratteristiche

- **Accesso completo a tutte le funzionalità**
- Gestione piattaforma e moderazione
- Analytics avanzate
- Configurazione sistema

### Feature Esclusive

#### User Management

- ✅ Visualizzare tutti gli utenti (ricerca, filtri)
- ✅ Modificare ruoli utente
- ✅ Bannare/sospendere account
- ✅ Verificare identità (documenti, certificazioni)
- ✅ Gestire dispute tra utenti
- ✅ Visualizzare log attività utenti

#### Content Moderation

- ✅ Review annunci marketplace
- ✅ Moderare chat e messaggi segnalati
- ✅ Rimuovere contenuti inappropriati
- ✅ Gestire segnalazioni utenti
- ✅ Ban automatici per comportamenti violenti

#### Fields & Locations

- ✅ Approvare nuovi campi (verifica documentazione)
- ✅ Modificare info campi
- ✅ Rimuovere campi non conformi
- ✅ Gestire certificazioni campi

#### Referees

- ✅ Gestire corso formazione arbitri
- ✅ Approvare certificazioni
- ✅ Revocare licenze arbitri
- ✅ Monitorare rating arbitri
- ✅ Assegnare specializzazioni

#### Matches & Events

- ✅ Visualizzare tutte le partite (live feed multi-campo)
- ✅ Accedere a qualsiasi match in modalità spectator
- ✅ Forzare fine match o annullamento
- ✅ Modificare risultati (in caso dispute irrisolte)
- ✅ Organizzare tornei nazionali/regionali

#### Analytics & Reports

- ✅ **Platform Analytics Dashboard**
  - Utenti attivi giornalieri/mensili
  - Partite giocate per modalità
  - Campi più frequentati
  - Revenue totale piattaforma
  - Growth metrics (nuove registrazioni, retention)
- ✅ Report abusi e sicurezza
- ✅ Heatmap utilizzo features
- ✅ Export dati per compliance GDPR

#### System Configuration

- ✅ Gestire tier system (XP thresholds, perks)
- ✅ Modificare regolamenti modalità gioco
- ✅ Configurare achievement system
- ✅ Gestire modalità manutenzione
- ✅ Push notifications globali
- ✅ A/B testing features

#### Radio & Communications

- ✅ **Admin Radio Scanner**: Accesso a tutte le frequenze team
- ✅ Broadcast emergenze globali
- ✅ Monitorare comunicazioni per sicurezza

### Menu Sidebar

```
[IDENTICO A PLAYER]

+ Accesso Admin Panel:
🛡️ Admin Panel        → /admin
    ├─ Overview       [dashboard piattaforma]
    ├─ Utenti         [gestione utenti]
    ├─ Campi          [gestione campi]
    ├─ Arbitri        [certificazioni e formazione]
    ├─ Partite        [monitoraggio match live]
    ├─ Radio          [scanner frequenze]
    ├─ Report         [segnalazioni e dispute]
    ├─ Analytics      [statistiche globali]
    └─ Tutte le Viste [accesso rapido a tutto]
```

---

## 📋 Matrice Feature per Ruolo

| Feature | Player | Team Leader | Referee | Field Mgr | Shop Owner | Admin |
|---------|:------:|:-----------:|:-------:|:---------:|:----------:|:-----:|
| **Gameplay** |
| Partecipare a match | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Kill declaration | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Visualizzare stats personali | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ELO ranking | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Achievement unlock | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Team** |
| Unirsi a team | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Creare team | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Gestire membri team | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Radio PTT team | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Creare strategie team | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ |
| **Match Management** |
| Organizzare quick match | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Arbitrare partite | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |
| Referee view | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |
| Risolvere dispute | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |
| **Fields** |
| Prenotare slot campo | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Recensire campi | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Gestire calendario campo | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Modificare info campo | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Approvare prenotazioni | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| **Marketplace** |
| Pubblicare annunci | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Chat con venditori | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Gestire negozio | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Inventory IoT | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Sales analytics | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| CRM e loyalty | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Admin** |
| Gestire utenti | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Moderare contenuti | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Platform analytics | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Radio scanner globale | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| System configuration | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 🎯 Intersezioni Feature Importanti

### 1. **Tutti i ruoli possono giocare**

- Anche admin, field_manager e shop_owner mantengono l'esperienza player completa
- Statistiche personali e ranking sempre attivi

### 2. **Team Leader + Referee**

- Un utente può essere contemporaneamente team leader e arbitro certificato
- Durante arbitraggio, non può arbitrare match del proprio team (conflict of interest)

### 3. **Field Manager + Shop Owner**

- Spesso coincidono (campo con negozio annesso)
- Dashboard unificata per gestire entrambi
- Cross-promotion (sconto campo per acquisti negozio, viceversa)

### 4. **Admin "God Mode"**

- Admin ha accesso a tutte le view (player, team leader, referee, field manager, shop owner)
- Può switchare temporaneamente ruolo per testing
- Può impersonare utenti per troubleshooting (con log audit)

---

## 🚀 Roadmap Ruoli Futuri

### Fase 2 (Q3 2026)

- **Federation Manager**: Gestione federazioni nazionali/regionali
  - Organizzare tornei multi-campo
  - Tesseramento giocatori
  - Classifiche ufficiali
  - Certificazioni arbitri livello nazionale
- **Event Organizer**: Specializzato in grandi eventi
  - Milsim multi-giorno
  - Convention e fiere
  - Sponsorizzazioni e partnership

### Fase 3 (Q4 2026)

- **Content Creator**: Streamers e YouTuber
  - Overlay personalizzati per streaming
  - Highlights automatici AI
  - Analytics views e engagement
- **Coach**: Allenatori team professionali
  - Strumenti analisi performance
  - Playbook avanzati
  - Sessioni training programmate

---

## 📱 Viste Specializzate per Ruolo

### Player View

- `/` → Dashboard personale con stats, match upcoming, team activity
- Focus: ELO progression, next tier, achievement recenti

### Team Leader View

- `/team` → Dashboard team con roster, calendario, inbox
- Widget radio sempre visibile
- Quick actions: Invite player, Create training, Broadcast message

### Referee View

- `/referee/:gameId` → Full-screen match control panel
  - Live map con positions
  - Kill feed real-time
  - Dispute resolution panel
  - Player behavior notes

### Field Manager View

- `/field-manager/fields` → Dashboard multi-campo
  - Calendario prenotazioni (calendar view)
  - Check-in list giocatori oggi
  - Live feed partite in corso sul campo

### Shop Owner View

- `/shop-manager/dashboard` → Sales dashboard con revenue oggi
  - Quick scan prodotto (barcode input)
  - Inventory alerts (low stock)
  - Pending orders da evadere

### Admin View

- `/admin` → Platform-wide dashboard
  - Active users NOW
  - Live matches feed (multi-campo)
  - Pending reports da risolvere
  - System health status

---

## 🔐 Implementazione Tecnica

### Auth System

```typescript
// src/lib/auth.ts
const ROLE_HIERARCHY: Record<UserRole, number> = {
  player: 1,
  team_leader: 2,
  referee: 3,
  field_manager: 3,
  shop_owner: 3,
  admin: 10,
};

// Check role permission
export const hasPermission = (userRole: UserRole, requiredLevel: number): boolean => {
  return ROLE_HIERARCHY[userRole] >= requiredLevel;
};
```

### Route Protection

```tsx
// Admin-only routes
<Route path="/admin" element={
  <ProtectedRoute requireAdmin redirectTo="/access-denied">
    <AdminLayout />
  </ProtectedRoute>
} />

// Referee-only routes
<Route path="/referee/:gameId" element={
  <ProtectedRoute roles={['referee', 'admin']} redirectTo="/access-denied">
    <RefereeView />
  </ProtectedRoute>
} />
```

### Dynamic Menu Generation

```tsx
// src/components/layout/Sidebar.tsx
const getMenuItems = (userRole: UserRole) => {
  const baseItems = [...playerMenuItems];
  
  if (canManageTeam(userRole)) {
    // Add team management features
  }
  
  if (isReferee(userRole)) {
    // Add referee assignments link
  }
  
  if (isAdmin(userRole)) {
    baseItems.push(...adminMenuItems);
  }
  
  return baseItems;
};
```

---

## 📊 Metriche per Ruolo

### Player

- **Core KPI**: ELO rating, win rate, K/D ratio
- **Engagement**: Match/week, team activity, achievement progression

### Team Leader

- **Team KPI**: Team win rate, member retention, training frequency
- **Management**: Roster size, active members %, event organization rate

### Referee

- **Quality KPI**: Average rating (1-5⭐), disputes resolved, match completion rate
- **Activity**: Matches refereed/month, certification level, specializations

### Field Manager

- **Business KPI**: Occupancy rate %, revenue/month, booking conversion
- **Quality**: Campo rating, repeat customers %, incident rate

### Shop Owner

- **Sales KPI**: Revenue, average order value, inventory turnover
- **Customer**: Loyalty members, customer lifetime value, review rating

### Admin

- **Platform KPI**: DAU/MAU, user growth %, retention rate
- **Health**: System uptime, reports resolved time, moderation accuracy

---

*Documento aggiornato: 2025-12-24*
*Versione: 1.0*
