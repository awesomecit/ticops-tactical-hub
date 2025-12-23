# Features Roadmap - Task Atomici

Questo documento traccia tutte le feature da implementare, suddivise in task atomici.

---

## 📋 Indice Features

1. [Ricerca Campi Avanzata](#1-ricerca-campi-avanzata) ✅ COMPLETATA
2. [Sommario Utente](#2-sommario-utente)
3. [Sistema Alert](#3-sistema-alert)
4. [Messaggistica Diretta](#4-messaggistica-diretta)
5. [Radio Team](#5-radio-team)

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

## 2. Sommario Utente

**Obiettivo**: Mostrare un sommario personalizzato per tipo utente con eventi registrati.

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 2.1 | Creare tipo `UserEvent` (partita, torneo, allenamento) | ⬜ TODO | `src/types/index.ts` |
| 2.2 | Creare mock eventi per utente | ⬜ TODO | `src/mocks/events.ts` |
| 2.3 | Creare componente `UserSummaryCard` | ⬜ TODO | `src/components/profile/UserSummaryCard.tsx` |
| 2.4 | Creare componente `EventsList` | ⬜ TODO | `src/components/profile/EventsList.tsx` |
| 2.5 | Creare componente `RoleSummary` (diverso per ruolo) | ⬜ TODO | `src/components/profile/RoleSummary.tsx` |
| 2.6 | Aggiungere sezione sommario in Dashboard per ogni ruolo | ⬜ TODO | `src/pages/Dashboard.tsx` |
| 2.7 | Creare pagina `Profile.tsx` con sommario completo | ⬜ TODO | `src/pages/Profile.tsx` |

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

## 4. Messaggistica Diretta

**Obiettivo**: Permettere messaggi diretti a shop, campi, arbitri e giocatori.

### Task Atomici

| ID | Task | Stato | File Coinvolti |
|----|------|-------|----------------|
| 4.1 | Estendere tipo `Conversation` per supportare entità (shop, field, referee, player) | ⬜ TODO | `src/types/index.ts` |
| 4.2 | Aggiornare mock conversazioni con tipi entità | ⬜ TODO | `src/mocks/chat.ts` |
| 4.3 | Creare componente `StartConversationButton` | ⬜ TODO | `src/components/chat/StartConversationButton.tsx` |
| 4.4 | Creare componente `EntityAvatar` (icona diversa per tipo) | ⬜ TODO | `src/components/chat/EntityAvatar.tsx` |
| 4.5 | Aggiornare `ConversationItem` per mostrare tipo entità | ⬜ TODO | `src/components/chat/ConversationItem.tsx` |
| 4.6 | Aggiungere pulsante "Contatta" in FieldCard, ShopCard, PlayerCard | ⬜ TODO | Vari componenti |
| 4.7 | Creare logica per avviare nuova conversazione | ⬜ TODO | `src/mocks/chat.ts` |
| 4.8 | Aggiungere filtri conversazioni per tipo (shop, campi, arbitri, giocatori) | ⬜ TODO | `src/pages/Chat.tsx` |

---

## 5. Radio Team

**Obiettivo**: Aggiungere feature radio in sezione equipment con attivazione da parte della squadra.

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

## 📊 Riepilogo Progresso

| Feature | Task Totali | Completati | Progresso |
|---------|-------------|------------|-----------|
| Ricerca Campi | 10 | 10 | 100% ✅ |
| Sommario Utente | 7 | 0 | 0% |
| Sistema Alert | 9 | 9 | 100% ✅ |
| Messaggistica Diretta | 8 | 0 | 0% |
| Radio Team | 9 | 0 | 0% |
| **TOTALE** | **43** | **19** | **44%** |

---

## 🚀 Ordine di Implementazione Suggerito

1. ~~**Ricerca Campi**~~ ✅ COMPLETATA
2. **Sistema Alert** - In corso
3. **Messaggistica Diretta** - Core communication feature
4. **Sommario Utente** - Dashboard enhancement
5. **Radio Team** - Feature avanzata gameplay

---

## 📝 Note

- Ogni feature sarà implementata seguendo i task atomici in ordine
- Aggiornare lo stato (⬜ TODO → 🔄 IN PROGRESS → ✅ DONE) man mano
- Testare ogni componente prima di procedere al successivo

### Changelog
- **2024-12-23**: Feature 1 (Ricerca Campi) completata al 100%