# Features Roadmap - Task Atomici

Questo documento traccia tutte le feature da implementare, suddivise in task atomici.

---

## 📋 Indice Features

1. [Ricerca Campi Avanzata](#1-ricerca-campi-avanzata) ✅ COMPLETATA
2. [Sommario Utente](#2-sommario-utente) ✅ COMPLETATA
3. [Sistema Alert](#3-sistema-alert) ✅ COMPLETATA
4. [Messaggistica Diretta](#4-messaggistica-diretta) ✅ COMPLETATA
5. [Radio Team](#5-radio-team)
6. [Integrazione Social Media](#6-integrazione-social-media) 🔄 IN PROGRESS
7. [RBAC - Controllo Accessi Basato su Ruoli](#7-rbac---controllo-accessi-basato-su-ruoli) ⬜ CRITICO

---

## 1. Ricerca Campi Avanzata ✅

**Obiettivo**: Permettere la ricerca di campi per recensioni, caratteristiche o disponibilità.

**Stato**: ✅ COMPLETATA

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 1.1 | Creare tipo `Field` con caratteristiche (illuminazione, erba sintetica, spogliatoi, parcheggio, etc.) | ✅ DONE | `src/types/index.ts` |
| 1.2 | Creare tipo `FieldReview` con rating e commento | ✅ DONE | `src/types/index.ts` |
| 1.3 | Creare tipo `FieldAvailability` con slot orari | ✅ DONE | `src/types/index.ts` |
| 1.4 | Creare mock data per campi con recensioni | ✅ DONE | `src/mocks/fields.ts` |
| 1.5 | Creare componente `FieldCard` | ✅ DONE | `src/components/fields/FieldCard.tsx` |
| 1.6 | Creare componente `FieldFilters` (caratteristiche, rating, disponibilità) | ✅ DONE | `src/components/fields/FieldFilters.tsx` |
| 1.7 | Creare componente `FieldReviewList` | ✅ DONE | `src/components/fields/FieldReviewList.tsx` |
| 1.8 | Creare componente `AvailabilityCalendar` | ✅ DONE | `src/components/fields/AvailabilityCalendar.tsx` |
| 1.9 | Aggiornare pagina `Locations.tsx` con ricerca avanzata | ✅ DONE | `src/pages/Locations.tsx` |
| 1.10 | Creare pagina dettaglio campo `FieldDetail.tsx` | ✅ DONE | `src/pages/FieldDetail.tsx` |

---

## 2. Sommario Utente ✅

**Obiettivo**: Mostrare un sommario personalizzato per tipo utente con eventi registrati.

**Stato**: ✅ COMPLETATA

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 2.1 | Creare tipo `UserEvent` (partita, torneo, allenamento) | ✅ DONE | `src/types/index.ts` |
| 2.2 | Creare mock eventi per utente | ✅ DONE | `src/mocks/events.ts` |
| 2.3 | Creare componente `UserSummaryCard` | ✅ DONE | `src/components/profile/UserSummaryCard.tsx` |
| 2.4 | Creare componente `EventsList` | ✅ DONE | `src/components/profile/EventsList.tsx` |
| 2.5 | Creare componente `RoleSummary` (diverso per ruolo) | ✅ DONE | `src/components/profile/RoleSummary.tsx` |
| 2.6 | Aggiungere sezione sommario in Dashboard per ogni ruolo | ✅ DONE | `src/pages/Profile.tsx` |
| 2.7 | Creare pagina `Profile.tsx` con sommario completo | ✅ DONE | `src/pages/Profile.tsx` |

---

## 3. Sistema Alert ✅

**Obiettivo**: Permettere di impostare alert su shop (nuovi prodotti, sconti) o disponibilità campi.

**Stato**: ✅ COMPLETATA

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 3.1 | Creare tipo `Alert` con categoria e condizioni | ✅ DONE | `src/types/index.ts` |
| 3.2 | Creare tipo `AlertPreferences` per utente | ✅ DONE | `src/types/index.ts` |
| 3.3 | Creare store `alertStore.ts` con zustand | ✅ DONE | `src/stores/alertStore.ts` |
| 3.4 | Creare mock alert attivi | ✅ DONE | `src/mocks/alerts.ts` |
| 3.5 | Creare componente `AlertSettingsModal` | ✅ DONE | `src/components/alerts/AlertSettingsModal.tsx` |
| 3.6 | Creare componente `AlertToggle` per shop/campo | ✅ DONE | `src/components/alerts/AlertToggle.tsx` |
| 3.7 | Creare componente `AlertsList` | ✅ DONE | `src/components/alerts/AlertsList.tsx` |
| 3.8 | Aggiungere sezione Alert in Settings | ✅ DONE | `src/pages/Settings.tsx` |
| 3.9 | Aggiungere pulsante "Imposta Alert" in Shop e Locations | ✅ DONE | `src/pages/Shop.tsx`, `src/components/fields/FieldCard.tsx` |

---

## 4. Messaggistica Diretta ✅

**Obiettivo**: Permettere messaggi diretti a shop, campi, arbitri e giocatori.

**Stato**: ✅ COMPLETATA

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 4.1 | Estendere tipo `Conversation` per supportare entità (shop, field, referee, player) | ✅ DONE | `src/mocks/chat.ts` |
| 4.2 | Aggiornare mock conversazioni con tipi entità | ✅ DONE | `src/mocks/chat.ts` |
| 4.3 | Creare componente `StartConversationButton` | ✅ DONE | `src/components/chat/StartConversationButton.tsx` |
| 4.4 | Creare componente `EntityAvatar` (icona diversa per tipo) | ✅ DONE | `src/components/chat/EntityAvatar.tsx` |
| 4.5 | Aggiornare `ConversationItem` per mostrare tipo entità | ✅ DONE | `src/components/chat/ConversationItem.tsx` |
| 4.6 | Aggiungere pulsante "Contatta" in FieldCard, ShopCard | ✅ DONE | `src/pages/Shop.tsx`, `src/pages/FieldDetail.tsx` |
| 4.7 | Creare logica per avviare nuova conversazione | ✅ DONE | `src/mocks/chat.ts` |
| 4.8 | Aggiungere filtri conversazioni per tipo (shop, campi, arbitri, giocatori) | ✅ DONE | `src/pages/Chat.tsx` |

---

## 5. Radio Team

**Obiettivo**: Aggiungere feature radio in sezione equipment con attivazione da parte della squadra.

**Stato**: ⬜ TODO

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 5.1 | Creare tipo `RadioChannel` e `RadioStatus` | ⬜ TODO | `src/types/index.ts` |
| 5.2 | Creare store `radioStore.ts` con zustand | ⬜ TODO | `src/stores/radioStore.ts` |
| 5.3 | Creare mock canali radio per team | ⬜ TODO | `src/mocks/radio.ts` |
| 5.4 | Creare componente `RadioBox` (widget equipment) | ⬜ TODO | `src/components/radio/RadioBox.tsx` |
| 5.5 | Creare componente `RadioControls` (mute, volume, canale) | ⬜ TODO | `src/components/radio/RadioControls.tsx` |
| 5.6 | Creare componente `RadioActivationModal` per team leader | ⬜ TODO | `src/components/radio/RadioActivationModal.tsx` |
| 5.7 | Creare pagina/sezione `Equipment.tsx` | ⬜ TODO | `src/pages/Equipment.tsx` o `src/components/team/Equipment.tsx` |
| 5.8 | Aggiungere RadioBox in GameplayView | ⬜ TODO | `src/pages/GameplayView.tsx` |
| 5.9 | Aggiungere controlli attivazione radio in Team per team_leader | ⬜ TODO | `src/pages/Team.tsx` |

---

## 6. Integrazione Social Media 🔄

**Obiettivo**: Integrare contatti social (Discord, Instagram, Telegram, WhatsApp) per team, campi e ruoli chiave con possibilità di accesso rapido.

**Stato**: 🔄 IN PROGRESS (82%)

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 6.1 | Creare tipo `SocialContact` con piattaforme supportate | ✅ DONE | `src/types/social.ts` |
| 6.2 | Creare mock data con contatti social di esempio | ✅ DONE | `src/mocks/social.ts` |
| 6.3 | Creare componente `SocialIcon` (icone SVG piattaforme) | ✅ DONE | `src/components/social/SocialIcon.tsx` |
| 6.4 | Creare componente `SocialLinks` (lista icone cliccabili) | ✅ DONE | `src/components/social/SocialLinks.tsx` |
| 6.5 | Creare componente `QuickContactBar` (barra contatti rapidi) | ✅ DONE | `src/components/social/QuickContactBar.tsx` |
| 6.6 | Creare componente `SocialContactsForm` (form modifica contatti) | ✅ DONE | `src/components/social/SocialContactsForm.tsx` |
| 6.7 | Integrare `SocialLinks` in pagina Team (header) | ✅ DONE | `src/components/team/TeamHeader.tsx`, `src/pages/Team.tsx` |
| 6.8 | Integrare `QuickContactBar` in FieldDetail | ✅ DONE | `src/pages/FieldDetail.tsx` |
| 6.9 | Integrare `SocialLinks` e form in Profile | ✅ DONE | `src/pages/Profile.tsx` |
| 6.10 | Integrare form social in Team Settings | ✅ DONE | `src/pages/Team.tsx` |
| 6.11 | Aggiungere link Profilo in Header dropdown | ✅ DONE | `src/components/layout/Header.tsx` |

---

## 7. RBAC - Controllo Accessi Basato su Ruoli ⬜ CRITICO

**Obiettivo**: Implementare visibilità menu e protezione rotte basata su ruoli di sistema (`admin`, `player`, `referee`, etc.) e ruoli di dominio (`team_leader`, `field_manager`, `shop_owner`).

**Stato**: ⬜ TODO - **PRIORITÀ ALTA**

**Note**: Attualmente TUTTI gli utenti autenticati possono accedere a TUTTE le rotte, inclusa `/admin`. Non esiste controllo ruoli su menu e navigazione.

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 7.1 | Creare helper `hasRole()` e `hasAnyRole()` per check ruoli | ⬜ TODO | `src/lib/auth.ts` |
| 7.2 | Creare componente `ProtectedRoute` per protezione rotte | ⬜ TODO | `src/components/auth/ProtectedRoute.tsx` |
| 7.3 | Creare componente `RoleGate` per visibilità condizionale UI | ⬜ TODO | `src/components/auth/RoleGate.tsx` |
| 7.4 | Proteggere rotte `/admin/*` solo per ruolo `admin` | ⬜ TODO | `src/App.tsx` |
| 7.5 | Proteggere rotte `/referee/*` solo per ruoli `referee`, `admin` | ⬜ TODO | `src/App.tsx` |
| 7.6 | Filtrare voci menu Sidebar in base a ruolo utente | ⬜ TODO | `src/components/layout/Sidebar.tsx` |
| 7.7 | Nascondere link Admin da utenti non-admin | ⬜ TODO | `src/components/layout/Sidebar.tsx` |
| 7.8 | Mostrare sezioni Team Leader solo a `team_leader` in Team page | ⬜ TODO | `src/pages/Team.tsx` |
| 7.9 | Mostrare sezioni Field Manager solo a `field_manager` in Locations | ⬜ TODO | `src/pages/Locations.tsx` |
| 7.10 | Creare pagina `AccessDenied.tsx` per accessi non autorizzati | ⬜ TODO | `src/pages/AccessDenied.tsx` |
| 7.11 | Aggiungere test ruoli con Demo Login per ogni ruolo | ⬜ TODO | `src/components/auth/DemoLoginModal.tsx` |

---

## 📊 Riepilogo Progresso

| Feature | Task Totali | Completati | Progresso |
|---------|-------------|------------|-----------|
| Ricerca Campi | 10 | 10 | 100% ✅ |
| Sommario Utente | 7 | 7 | 100% ✅ |
| Sistema Alert | 9 | 9 | 100% ✅ |
| Messaggistica Diretta | 8 | 8 | 100% ✅ |
| Radio Team | 9 | 0 | 0% |
| Integrazione Social | 11 | 11 | 100% ✅ |
| RBAC Controllo Accessi | 11 | 0 | 0% ⚠️ |
| **TOTALE** | **65** | **45** | **69%** |

---

## 🚀 Ordine di Implementazione Suggerito

1. ~~**Ricerca Campi**~~ ✅ COMPLETATA
2. ~~**Sistema Alert**~~ ✅ COMPLETATA
3. ~~**Messaggistica Diretta**~~ ✅ COMPLETATA
4. ~~**Sommario Utente**~~ ✅ COMPLETATA
5. ~~**Integrazione Social**~~ ✅ COMPLETATA
6. **🔴 RBAC Controllo Accessi** - PRIORITÀ CRITICA (sicurezza)
7. **Radio Team** - Feature avanzata gameplay

---

## 📝 Note

- Ogni feature sarà implementata seguendo i task atomici in ordine
- Aggiornare lo stato (⬜ TODO → 🔄 IN PROGRESS → ✅ DONE) man mano
- Testare ogni componente prima di procedere al successivo

### Changelog
- **2024-12-23**: Feature 1 (Ricerca Campi) completata al 100%
- **2024-12-23**: Feature 2 (Sommario Utente) completata al 100%
- **2024-12-23**: Feature 3 (Sistema Alert) completata al 100%
- **2024-12-23**: Feature 4 (Messaggistica Diretta) completata al 100%
- **2024-12-23**: Aggiunta Feature 6 (Integrazione Social Media) alla roadmap
- **2024-12-23**: Feature 6 (Integrazione Social) completata al 100%
- **2024-12-23**: Aggiunta Feature 7 (RBAC) come priorità critica