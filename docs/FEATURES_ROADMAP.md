# Features Roadmap - Task Atomici

Questo documento traccia tutte le feature da implementare, suddivise in task atomici.

---

## 📋 Indice Features

1. [Ricerca Campi Avanzata](#1-ricerca-campi-avanzata) ✅ COMPLETATA
2. [Sommario Utente](#2-sommario-utente) ✅ COMPLETATA
3. [Sistema Alert](#3-sistema-alert) ✅ COMPLETATA
4. [Messaggistica Diretta](#4-messaggistica-diretta) ✅ COMPLETATA
5. [Radio Team](#5-radio-team) ✅ COMPLETATA
6. [Integrazione Social Media](#6-integrazione-social-media) ✅ COMPLETATA
7. [RBAC - Controllo Accessi Basato su Ruoli](#7-rbac---controllo-accessi-basato-su-ruoli) ✅ COMPLETATA
8. [Sistema Real-Time (WebSockets)](#8-sistema-real-time-websockets) ✅ COMPLETATA (Mock)
9. [Achievement & Rewards System](#9-achievement--rewards-system) ✅ COMPLETATA
10. [Radio Avanzata Match Live](#10-radio-avanzata-match-live) ⬜ TODO
11. [Mercatino - Compra/Vendi/Scambia](#11-mercatino---compravendiscambia) ✅ COMPLETATA
12. [Match Organizer](#12-match-organizer) ✅ COMPLETATA

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

## 5. Radio Team ✅

**Obiettivo**: Aggiungere feature radio in sezione equipment con attivazione da parte della squadra.

**Stato**: ✅ COMPLETATA (100%)

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 5.1 | Creare tipo `RadioChannel` e `RadioStatus` | ✅ DONE | `src/types/radio.ts` |
| 5.2 | Creare store `radioStore.ts` con zustand | ✅ DONE | `src/stores/radioStore.ts` |
| 5.3 | Creare mock canali radio per team | ✅ DONE | `src/mocks/radio.ts` |
| 5.4 | Creare componente `RadioBox` (widget equipment) | ✅ DONE | `src/components/radio/RadioBox.tsx` |
| 5.5 | Creare componente `RadioControls` (mute, volume, canale) | ✅ DONE | `src/components/radio/RadioControls.tsx` |
| 5.6 | Creare componente `RadioActivationModal` per team leader | ✅ DONE | `src/components/radio/RadioActivationModal.tsx` |
| 5.7 | Aggiungere RadioBox in GameplayView | ✅ DONE | `src/pages/GameplayView.tsx` |
| 5.8 | Aggiungere controlli attivazione radio in Team per team_leader | ✅ DONE | `src/pages/Team.tsx` |
| 5.9 | Creare pagina/sezione `Equipment.tsx` | ✅ DONE | `src/pages/Equipment.tsx` |

---

## 6. Integrazione Social Media ✅

**Obiettivo**: Integrare contatti social (Discord, Instagram, Telegram, WhatsApp) per team, campi e ruoli chiave con possibilità di accesso rapido.

**Stato**: ✅ COMPLETATA (100%)

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

## 7. RBAC - Controllo Accessi Basato su Ruoli ✅

**Obiettivo**: Implementare visibilità menu e protezione rotte basata su ruoli di sistema (`admin`, `player`, `referee`, etc.) e ruoli di dominio (`team_leader`, `field_manager`, `shop_owner`).

**Stato**: ✅ COMPLETATA

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 7.1 | Creare helper `hasRole()` e `hasAnyRole()` per check ruoli | ✅ DONE | `src/lib/auth.ts` |
| 7.2 | Creare componente `ProtectedRoute` per protezione rotte | ✅ DONE | `src/components/auth/ProtectedRoute.tsx` |
| 7.3 | Creare componente `RoleGate` per visibilità condizionale UI | ✅ DONE | `src/components/auth/RoleGate.tsx` |
| 7.4 | Proteggere rotte `/admin/*` solo per ruolo `admin` | ✅ DONE | `src/App.tsx` |
| 7.5 | Proteggere rotte `/referee/*` solo per ruoli `referee`, `admin` | ✅ DONE | `src/App.tsx` |
| 7.6 | Filtrare voci menu Sidebar in base a ruolo utente | ✅ DONE | `src/components/layout/Sidebar.tsx` |
| 7.7 | Nascondere link Admin da utenti non-admin | ✅ DONE | `src/components/layout/Sidebar.tsx` |
| 7.8 | Mostrare sezioni Team Leader solo a `team_leader` in Team page | ✅ DONE | `src/pages/Team.tsx` |
| 7.9 | Creare pagina `AccessDenied.tsx` per accessi non autorizzati | ✅ DONE | `src/pages/AccessDenied.tsx` |
| 7.10 | Aggiungere test ruoli con Demo Login per ogni ruolo | ✅ DONE | `src/components/auth/DemoLoginModal.tsx` |

---

## 📊 Riepilogo Progresso

| Feature | Task Totali | Completati | Progresso |
|---------|-------------|------------|-----------|
| Ricerca Campi | 10 | 10 | 100% ✅ |
| Sommario Utente | 7 | 7 | 100% ✅ |
| Sistema Alert | 9 | 9 | 100% ✅ |
| Messaggistica Diretta | 8 | 8 | 100% ✅ |
| Radio Team | 9 | 9 | 100% ✅ |
| Integrazione Social | 11 | 11 | 100% ✅ |
| RBAC Controllo Accessi | 10 | 10 | 100% ✅ |
| Real-Time WebSockets | 7 | 7 | 100% ✅ |
| Achievement & Rewards | 10 | 10 | 100% ✅ |
| Radio Avanzata Match Live | 10 | 0 | 0% ⬜ |
| Mercatino Compra/Vendi | 14 | 14 | 100% ✅ |
| Match Organizer | 11 | 11 | 100% ✅ |
| **TOTALE** | **116** | **105** | **91%** |

---

## 🚀 Ordine di Implementazione Suggerito

1. ~~**Ricerca Campi**~~ ✅ COMPLETATA
2. ~~**Sistema Alert**~~ ✅ COMPLETATA
3. ~~**Messaggistica Diretta**~~ ✅ COMPLETATA
4. ~~**Sommario Utente**~~ ✅ COMPLETATA
5. ~~**Integrazione Social**~~ ✅ COMPLETATA
6. ~~**RBAC Controllo Accessi**~~ ✅ COMPLETATA
7. **Radio Team** - Completare Equipment page
8. **🟡 Fix Bug Chat** - Nuova chat, archivia, elimina, edit messaggi
9. **Sistema Real-Time** - Richiede Lovable Cloud (Supabase)
10. **Achievement & Rewards** - Sistema badge, bauli, animazioni
11. **Radio Avanzata Match Live** - Suoni, PTT, scanner frequenze, Ingegnere badge
12. **Mercatino Compra/Vendi** - Annunci, foto, recensioni, sistema scambi

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
- **2024-12-23**: Feature 5 (Radio Team) al 89%
- **2024-12-23**: Aggiunte Feature 8 (Real-Time WebSockets), Feature 9 (Achievement & Rewards), Feature 10 (Radio Avanzata Match Live)
- **2024-12-23**: Aggiunti bug da fixare nella sezione Chat
- **2024-12-23**: Bug Chat fixati (5/5)
- **2024-12-23**: Aggiunta Feature 11 (Mercatino Compra/Vendi/Scambia)
- **2024-12-23**: Feature 12 (Match Organizer) completata al 100% - Calendario disponibilità, matching automatico, notifiche
- **2024-12-23**: Feature 7 (RBAC) completata al 100% - Protezione rotte, RoleGate, AccessDenied page
- **2024-12-23**: Feature 9 (Achievement & Rewards) completata al 100% - Badge, animazioni sblocco, celebrazione fine partita, integrazione GameplayView
- **2024-12-23**: Feature 8 (Real-Time) completata al 100% con Mock Client - Notifiche push, chat live, radio, presenza utenti

---

## 🐛 Bug Noti da Fixare

| ID | Bug | Priorità | Stato | File Coinvolti |
|----|-----|----------|-------|----------------|
| BUG-1 | Bottone "Nuova Chat" non gestito | 🔴 Alta | ✅ FIXED | `src/pages/Chat.tsx`, `src/components/chat/NewChatDialog.tsx` |
| BUG-2 | Chat non si possono archiviare | 🟡 Media | ✅ FIXED | `src/stores/chatStore.ts`, `src/components/chat/ConversationActions.tsx` |
| BUG-3 | Chat non si possono eliminare | 🟡 Media | ✅ FIXED | `src/stores/chatStore.ts`, `src/components/chat/ConversationActions.tsx` |
| BUG-4 | Messaggi non si possono eliminare | 🟡 Media | ✅ FIXED | `src/components/chat/MessageActions.tsx` |
| BUG-5 | Messaggi non si possono editare | 🟡 Media | ✅ FIXED | `src/components/chat/MessageActions.tsx` |

---

## 8. Sistema Real-Time (WebSockets) ✅ (Mock)

**Obiettivo**: Implementare comunicazione real-time via WebSockets/Supabase Realtime per notifiche, chat, radio e achievement.

**Stato**: ✅ COMPLETATA (con Mock Client) - Pronto per migrazione a Supabase Realtime

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 8.1 | Creare Mock Realtime Client | ✅ DONE | `src/lib/mockRealtimeClient.ts` |
| 8.2 | Creare hook `useRealtimeNotifications` per notifiche push | ✅ DONE | `src/hooks/useRealtimeNotifications.ts` |
| 8.3 | Creare hook `useRealtimeChat` per messaggi live | ✅ DONE | `src/hooks/useRealtimeChat.ts` |
| 8.4 | Creare hook `useRealtimeRadio` per comunicazione radio | ✅ DONE | `src/hooks/useRealtimeRadio.ts` |
| 8.5 | Implementare gestione presenza utenti online | ✅ DONE | `src/hooks/usePresence.ts` |
| 8.6 | Creare componente OnlineUsersIndicator | ✅ DONE | `src/components/realtime/OnlineUsersIndicator.tsx` |
| 8.7 | Creare RealtimeDemo per testing | ✅ DONE | `src/components/realtime/RealtimeDemo.tsx` |

---

## 9. Achievement & Rewards System ✅

**Obiettivo**: Sistema completo di achievement, badge e ricompense con animazioni per sblocchi live/post-partita.

**Stato**: ✅ COMPLETATA

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 9.1 | Creare tipi `Achievement`, `Badge`, `Chest`, `Reward` | ✅ DONE | `src/types/achievements.ts` |
| 9.2 | Creare store `achievementStore.ts` con Zustand | ✅ DONE | `src/stores/achievementStore.ts` |
| 9.3 | Creare mock data achievement e badge | ✅ DONE | `src/mocks/achievements.ts` |
| 9.4 | Creare componente `AchievementUnlockAnimation` (animazione sblocco) | ✅ DONE | `src/components/achievements/AchievementUnlockAnimation.tsx` |
| 9.5 | Creare componente `ChestOpenAnimation` (animazione apertura baule) | ✅ DONE | `src/components/achievements/ChestOpenAnimation.tsx` |
| 9.6 | Creare componente `BadgeDisplay` (mostra badge utente/team) | ✅ DONE | `src/components/achievements/BadgeDisplay.tsx` |
| 9.7 | Creare componente `MatchEndCelebration` (animazioni fine partita) | ✅ DONE | `src/components/achievements/MatchEndCelebration.tsx` |
| 9.8 | Creare pagina `Achievements.tsx` con lista achievement | ✅ DONE | `src/pages/Achievements.tsx` |
| 9.9 | Integrare animazioni in GameplayView | ✅ DONE | `src/pages/GameplayView.tsx` |
| 9.10 | Badge con abilità speciali (es. Ingegnere) | ✅ DONE | `src/types/achievements.ts` |

---

## 10. Radio Avanzata Match Live ⬜

**Obiettivo**: Sistema radio avanzato con suoni ricetrasmittente, comunicazione bidirezionale non simultanea (audio streaming), e abilità speciali badge Ingegnere.

**Stato**: ⬜ TODO

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 10.1 | Aggiungere suoni ricetrasmittente (beep attivazione, statico, rilascio) | ⬜ TODO | `src/assets/sounds/`, `src/hooks/useRadioSounds.ts` |
| 10.2 | Implementare PTT (Push-To-Talk) con recording audio | ⬜ TODO | `src/hooks/useAudioRecorder.ts` |
| 10.3 | Creare sistema invio messaggi audio in streaming | ⬜ TODO | `src/hooks/useAudioStreaming.ts` |
| 10.4 | Creare componente `RadioTransmitButton` con feedback visivo | ⬜ TODO | `src/components/radio/RadioTransmitButton.tsx` |
| 10.5 | Creare componente `AudioMessageBubble` per messaggi vocali | ⬜ TODO | `src/components/radio/AudioMessageBubble.tsx` |
| 10.6 | Implementare abilità badge Ingegnere: scanner frequenze nemiche | ⬜ TODO | `src/components/radio/FrequencyScanner.tsx` |
| 10.7 | Creare UI scanner per ricerca stazioni avversarie | ⬜ TODO | `src/components/radio/EnemyScannerOverlay.tsx` |
| 10.8 | Animazione "interferenza" quando si viene scansionati | ⬜ TODO | `src/components/radio/InterferenceEffect.tsx` |
| 10.9 | Integrare radio avanzata in GameplayView | ⬜ TODO | `src/pages/GameplayView.tsx` |
| 10.10 | Sistema contromisure radio (jamming, frequenze segrete) | ⬜ TODO | `src/hooks/useRadioCountermeasures.ts` |

---

## 11. Mercatino - Compra/Vendi/Scambia ⬜

**Obiettivo**: Marketplace stile Subito per comprare, vendere e scambiare attrezzatura airsoft tra giocatori. Include annunci con foto, sistema recensioni venditore/acquirente, e messaggistica integrata.

**Stato**: ⬜ TODO

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 11.1 | Creare tipi `MarketListing`, `ListingCategory`, `ListingCondition`, `SellerReview` | ⬜ TODO | `src/types/marketplace.ts` |
| 11.2 | Creare store `marketplaceStore.ts` con Zustand | ⬜ TODO | `src/stores/marketplaceStore.ts` |
| 11.3 | Creare mock data annunci e recensioni | ⬜ TODO | `src/mocks/marketplace.ts` |
| 11.4 | Creare componente `ListingCard` (foto, prezzo, condizione, venditore) | ⬜ TODO | `src/components/marketplace/ListingCard.tsx` |
| 11.5 | Creare componente `ListingFilters` (categoria, prezzo, condizione, zona) | ⬜ TODO | `src/components/marketplace/ListingFilters.tsx` |
| 11.6 | Creare componente `ListingGallery` (carousel foto annuncio) | ⬜ TODO | `src/components/marketplace/ListingGallery.tsx` |
| 11.7 | Creare componente `SellerCard` (rating, recensioni, annunci attivi) | ⬜ TODO | `src/components/marketplace/SellerCard.tsx` |
| 11.8 | Creare componente `ReviewList` (recensioni venditore/acquirente) | ⬜ TODO | `src/components/marketplace/ReviewList.tsx` |
| 11.9 | Creare componente `CreateListingForm` (form pubblicazione annuncio) | ⬜ TODO | `src/components/marketplace/CreateListingForm.tsx` |
| 11.10 | Creare pagina `Marketplace.tsx` (lista annunci + filtri) | ⬜ TODO | `src/pages/Marketplace.tsx` |
| 11.11 | Creare pagina `ListingDetail.tsx` (dettaglio annuncio) | ⬜ TODO | `src/pages/ListingDetail.tsx` |
| 11.12 | Creare pagina `SellerProfile.tsx` (profilo venditore) | ⬜ TODO | `src/pages/SellerProfile.tsx` |
| 11.13 | Integrare chat per contattare venditore | ⬜ TODO | `src/mocks/chat.ts` |
| 11.14 | Aggiungere link Mercatino in Sidebar/Navigation | ⬜ TODO | `src/components/layout/Sidebar.tsx` |

### Categorie Annunci Previste
- **Repliche** (fucili, pistole, shotgun, sniper)
- **Ottiche** (red dot, scope, torce)
- **Accessori** (caricatori, batterie, hop-up)
- **Abbigliamento** (mimetiche, gilet tattici, elmetti)
- **Protezioni** (occhiali, maschere, guanti)
- **Altro** (radio, borse, attrezzatura varia)

### Sistema Recensioni ✅ IMPLEMENTATO
- Rating 1-5 stelle
- Recensione testuale
- Ruolo: Acquirente / Venditore
- Badge "Venditore Verificato" dopo X transazioni positive
- Statistiche cumulative venditore/acquirente

---

## 12. Match Organizer - Disponibilità e Incroci ✅

**Obiettivo**: Sistema per organizzare partite con incroci disponibilità campi, giocatori e attrezzature. Favorisce l'organizzazione di match anche tra sconosciuti.

**Stato**: ✅ COMPLETATA

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 12.1 | Creare tipi `Availability`, `TimeSlot`, `MatchRequest` | ✅ DONE | `src/types/availability.ts` |
| 12.2 | Creare store `availabilityStore.ts` per gestire disponibilità | ✅ DONE | `src/stores/availabilityStore.ts` |
| 12.3 | Creare componente `AvailabilityPicker` per selezione slot | ✅ DONE | `src/components/availability/AvailabilityPicker.tsx` |
| 12.4 | Creare componente `FieldAvailabilityGrid` per campi | ✅ DONE | `src/components/availability/FieldAvailabilityGrid.tsx` |
| 12.5 | Creare componente `PlayerAvailabilityList` per giocatori disponibili | ✅ DONE | `src/components/availability/PlayerAvailabilityList.tsx` |
| 12.6 | Creare algoritmo incrocio disponibilità campi/giocatori | ✅ DONE | `src/lib/availabilityMatcher.ts` |
| 12.7 | Creare componente `MatchSuggestions` con proposte automatiche | ✅ DONE | `src/components/availability/MatchSuggestions.tsx` |
| 12.8 | Creare componente `QuickMatchFinder` per match con sconosciuti | ✅ DONE | `src/components/availability/QuickMatchFinder.tsx` |
| 12.9 | Creare pagina `Organize.tsx` con wizard organizzazione | ✅ DONE | `src/pages/Organize.tsx` |
| 12.10 | Notifiche match compatibili trovati | ✅ DONE | `src/hooks/useMatchNotifications.ts` |
| 12.11 | Aggiungere link "Organizza Partita" nella sidebar | ✅ DONE | `src/components/layout/Sidebar.tsx` |

### Funzionalità Principali
- **Calendario disponibilità**: Giocatori indicano quando sono liberi
- **Disponibilità campi**: Visualizzazione slot liberi per ogni campo
- **Matching automatico**: Sistema suggerisce match quando disponibilità coincidono
- **Quick Match**: Trova partite con giocatori sconosciuti nella tua zona
- **Notifiche automatiche**: Avvisa quando viene trovato un match compatibile
- **Notifiche smart**: Avvisi quando si trova un match compatibile