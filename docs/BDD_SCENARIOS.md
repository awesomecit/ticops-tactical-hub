# TicOps - BDD Scenarios & Test Specifications

**Versione**: 1.0  
**Data Creazione**: 25 Dicembre 2024  
**Framework**: Behavior-Driven Development (BDD)

---

## 📋 Table of Contents

1. [Authentication & Authorization](#authentication--authorization)
2. [Multi-Organization Management](#multi-organization-management)
3. [Field Search & Booking](#field-search--booking)
4. [Team Management](#team-management)
5. [Match Organization](#match-organization)
6. [Live Gameplay](#live-gameplay)
7. [Admin Anagrafiche](#admin-anagrafiche)
8. [Messaging & Chat](#messaging--chat)
9. [Ranking & Leaderboard](#ranking--leaderboard)
10. [Marketplace](#marketplace)

---

## Authentication & Authorization

### Scenario 1.1: Login con credenziali valide
```gherkin
Feature: User Authentication
  As a registered user
  I want to log in to the platform
  So that I can access my personalized dashboard

Scenario: Successful login with valid credentials
  Given I am on the login page
  And I am not authenticated
  When I enter email "player@demo.it"
  And I enter password "demo123"
  And I click the "Accedi" button
  Then I should be redirected to "/dashboard"
  And I should see "Benvenuto, Ghost"
  And the auth token should be stored in localStorage

Background:
  Given the following users exist:
    | email              | password | role        | tier     |
    | player@demo.it     | demo123  | player      | platinum |
    | admin@demo.it      | demo123  | admin       | -        |
    | teamleader@demo.it | demo123  | teamleader  | gold     |
```

### Scenario 1.2: Login con credenziali non valide
```gherkin
Scenario: Failed login with invalid credentials
  Given I am on the login page
  When I enter email "invalid@example.com"
  And I enter password "wrongpassword"
  And I click the "Accedi" button
  Then I should see error message "Email o password non validi"
  And I should remain on the login page
  And the auth token should not be stored
```

### Scenario 1.3: Accesso a rotta protetta senza autenticazione
```gherkin
Scenario: Access protected route without authentication
  Given I am not authenticated
  When I navigate to "/dashboard"
  Then I should be redirected to "/login"
  And I should see message "Devi effettuare l'accesso"
```

### Scenario 1.4: Controllo RBAC per ruoli
```gherkin
Scenario Outline: Role-based access control
  Given I am logged in as <role>
  When I navigate to <route>
  Then I should <action>

Examples:
  | role       | route                   | action                            |
  | player     | /dashboard              | see my dashboard                  |
  | player     | /admin/overview         | be redirected to /dashboard       |
  | admin      | /admin/overview         | see admin dashboard               |
  | teamleader | /team                   | see team management page          |
  | referee    | /referee/assign-matches | see referee assignment page       |
  | field      | /admin/fields           | see fields management (own only)  |
```

---

## Multi-Organization Management

### Scenario 2.1: Admin Federazione visualizza tutte le organizzazioni
```gherkin
Feature: Multi-Organization Hierarchy
  As a Federation Admin
  I want to manage multiple organizations
  So that I can oversee the entire federation

Scenario: View all organizations in federation
  Given I am logged in as Federation Admin "superadmin@itl.it"
  And the following organizations exist:
    | name           | province | region    | federationId |
    | TicOps Italy   | Milano   | Lombardia | ITL-001      |
    | TicOps Veneto  | Venezia  | Veneto    | ITL-001      |
    | TicOps Lazio   | Roma     | Lazio     | ITL-001      |
  When I navigate to "/admin/organizations"
  Then I should see 3 organizations
  And each organization should display:
    | field          |
    | Name           |
    | Province       |
    | Active Status  |
    | Admin Users    |
    | Actions (Edit) |
```

### Scenario 2.2: Organization Admin vede solo la propria organizzazione
```gherkin
Scenario: Organization Admin limited visibility
  Given I am logged in as Organization Admin "admin@ticops-italy.it"
  And my organizationId is "ORG-001"
  And the following divisions exist:
    | name        | organizationId | code    |
    | Nord Milano | ORG-001        | DIV-001 |
    | Sud Milano  | ORG-001        | DIV-002 |
    | Bergamo     | ORG-002        | DIV-003 |
  When I navigate to "/admin/divisions"
  Then I should see 2 divisions
  And I should not see "Bergamo"
  And each division should belong to "ORG-001"
```

### Scenario 2.3: Division Manager gestisce solo la propria divisione
```gherkin
Scenario: Division Manager scoped data access
  Given I am logged in as Division Manager "manager@nord-milano.it"
  And my divisionId is "DIV-001"
  And the following teams exist:
    | name          | divisionId | organizationId |
    | Alpha Squad   | DIV-001    | ORG-001        |
    | Bravo Team    | DIV-001    | ORG-001        |
    | Charlie Unit  | DIV-002    | ORG-001        |
  When I navigate to "/admin/teams"
  Then I should see 2 teams
  And I should not see "Charlie Unit"
  And all visible teams should have divisionId "DIV-001"
```

### Scenario 2.4: Switch divisione (multi-division admin)
```gherkin
Scenario: Admin switches active division
  Given I am logged in as Organization Admin with access to:
    | divisionId | divisionName  |
    | DIV-001    | Nord Milano   |
    | DIV-002    | Sud Milano    |
  And the current division is "DIV-001"
  When I click on the division switcher in Header
  And I select "Sud Milano"
  Then the active division should change to "DIV-002"
  And I should see data filtered for "DIV-002"
  And localStorage should persist "active-division-id" = "DIV-002"
```

### Scenario 2.5: Creazione nuova divisione
```gherkin
Scenario: Create new division within organization
  Given I am logged in as Organization Admin "admin@ticops-italy.it"
  And my organizationId is "ORG-001"
  When I navigate to "/admin/divisions"
  And I click "Crea Divisione"
  And I fill the form:
    | field       | value         |
    | Name        | Monza Brianza |
    | Code        | DIV-003       |
    | Area        | Nord-Est      |
    | Manager     | Mario Rossi   |
  And I click "Salva"
  Then I should see success message "Divisione creata con successo"
  And "Monza Brianza" should appear in the divisions list
  And the new division should have:
    | field          | value    |
    | organizationId | ORG-001  |
    | isActive       | true     |
    | isDefault      | false    |
```

---

## Field Search & Booking

### Scenario 3.1: Ricerca campi con filtri avanzati
```gherkin
Feature: Advanced Field Search
  As a player
  I want to search fields with multiple filters
  So that I can find the best venue for my match

Scenario: Search fields with location and amenities filters
  Given I am on the "/campi" page
  And the following fields exist:
    | name          | province | terrain | lighting | parking | amenities        |
    | Campo Bravo   | Milano   | wood    | true     | true    | bar,restroom     |
    | Tactical Zone | Bergamo  | mixed   | true     | false   | bar,rental       |
    | Forest Arena  | Milano   | mixed   | false    | true    | restroom,camping |
  When I select province "Milano"
  And I check amenity "Parcheggio"
  And I click "Cerca"
  Then I should see 2 results
  And I should see "Campo Bravo"
  And I should see "Forest Arena"
  And I should not see "Tactical Zone"
```

### Scenario 3.2: Visualizzazione dettagli campo
```gherkin
Scenario: View field details with gallery and reviews
  Given I am on the field search results page
  When I click on "Campo Bravo"
  Then I should navigate to "/campi/:id"
  And I should see:
    | element             |
    | Field name          |
    | Address and map     |
    | Photo gallery       |
    | Terrain type        |
    | Available amenities |
    | Pricing info        |
    | Reviews (stars)     |
    | Contact button      |
```

---

## Team Management

### Scenario 4.1: Team Leader crea nuovo team
```gherkin
Feature: Team Management
  As a Team Leader
  I want to create and manage my team
  So that I can organize players for matches

Scenario: Create new team with members
  Given I am logged in as "teamleader@demo.it"
  And my userId is "USER-002"
  When I navigate to "/team"
  And I click "Crea Team"
  And I fill the form:
    | field        | value       |
    | Team Name    | Alpha Squad |
    | Tag          | ALPH        |
    | Description  | Tactical specialists |
  And I add members:
    | username | role   |
    | Ghost    | leader |
    | Soap     | member |
    | Price    | member |
  And I click "Crea Team"
  Then I should see success message "Team creato con successo"
  And "Alpha Squad" should appear in my teams list
  And the team should have 3 members
  And I should be marked as team leader
```

### Scenario 4.2: Invito membro al team
```gherkin
Scenario: Invite player to team
  Given I am Team Leader of "Alpha Squad"
  And the team has 4 members
  When I navigate to "/team"
  And I click "Invita Membro"
  And I search for user "shadow@ticops.it"
  And I select "Shadow" from results
  And I click "Invia Invito"
  Then the user should receive an inbox message
  And the invitation status should be "pending"
  And I should see "Invito inviato a Shadow"
```

### Scenario 4.3: Membro accetta invito team
```gherkin
Scenario: Player accepts team invitation
  Given I am logged in as "shadow@ticops.it"
  And I have a pending team invitation from "Alpha Squad"
  When I navigate to "/inbox"
  And I click on the invitation message
  And I click "Accetta"
  Then I should be added to "Alpha Squad" as member
  And the team leader should see me in the roster
  And I should see "Alpha Squad" in my teams list
```

---

## Match Organization

### Scenario 5.1: Field Manager crea partita
```gherkin
Feature: Match Organization
  As a Field Manager
  I want to create and schedule matches
  So that teams can play at my venue

Scenario: Create new match with two teams
  Given I am logged in as Field Manager "field@demo.it"
  And my fieldId is "FIELD-001"
  And the following teams exist:
    | teamId   | name         |
    | TEAM-001 | Alpha Squad  |
    | TEAM-002 | Bravo Force  |
  When I navigate to "/admin/matches"
  And I click "Crea Partita"
  And I fill the form:
    | field      | value              |
    | Campo      | Campo Bravo        |
    | Data       | 2025-01-15         |
    | Ora Inizio | 14:00              |
    | Durata     | 120 minuti         |
    | Team Alpha | Alpha Squad        |
    | Team Bravo | Bravo Force        |
    | Tipo       | Team Deathmatch    |
  And I click "Crea Partita"
  Then I should see success message "Partita creata"
  And both teams should receive notification
  And the match should appear in "/games" for both teams
```

### Scenario 5.2: Assegnazione arbitro a partita
```gherkin
Scenario: Assign referee to match
  Given I am logged in as Field Manager
  And a match exists with matchId "MATCH-001"
  And the match has no referee assigned
  And a referee "referee@demo.it" is available
  When I navigate to "/admin/matches/:id"
  And I click "Assegna Arbitro"
  And I select "John Referee" from dropdown
  And I click "Conferma"
  Then the referee should be assigned to the match
  And the referee should receive notification
  And the match status should update to "referee_assigned"
```

---

## Live Gameplay

### Scenario 6.1: Player dichiara kill durante partita
```gherkin
Feature: Live Match Gameplay
  As a player in an active match
  I want to declare kills in real-time
  So that the score is accurately tracked

Scenario: Declare kill on opponent
  Given I am logged in as "Ghost" (playerId "PLAYER-001")
  And I am in match "MATCH-001" (status: "in_progress")
  And I am on team "Alpha"
  When I navigate to "/gameplay/:matchId"
  And I click the kill button for opponent "Enemy-05" (team Bravo)
  And I confirm the kill declaration
  Then the kill should be registered as "pending"
  And the opponent should receive conflict notification
  And my kill count should increment by 1 (local UI)
  And the kill should appear in the activity feed
```

### Scenario 6.2: Opponent conferma kill
```gherkin
Scenario: Opponent confirms kill declaration
  Given a kill declaration exists:
    | declaredBy | target   | status  | matchId   |
    | PLAYER-001 | PLAYER-05| pending | MATCH-001 |
  And I am logged in as "PLAYER-05"
  When I receive the kill notification
  And I click "Conferma"
  Then the kill status should change to "confirmed"
  And the kill should be added to match stats
  And both players' K/D should update
  And the referee (if present) should be notified
```

### Scenario 6.3: Opponent contesta kill (conflitto)
```gherkin
Scenario: Opponent disputes kill declaration
  Given a kill declaration exists (status: "pending")
  And I am the target player "PLAYER-05"
  When I click "Contesta"
  And I provide reason "Ero dietro copertura"
  And I click "Invia Contestazione"
  Then the kill status should change to "disputed"
  And a referee should be notified
  And the kill should appear in "/referee/:matchId" conflicts list
  And neither player's stats should update until resolved
```

### Scenario 6.4: Arbitro risolve conflitto
```gherkin
Scenario: Referee resolves disputed kill
  Given I am logged in as Referee "referee@demo.it"
  And a disputed kill exists:
    | declarer | target | reason               | matchId   |
    | Ghost    | Enemy  | Ero dietro copertura | MATCH-001 |
  When I navigate to "/referee/:matchId"
  And I click on the disputed kill
  And I review video replay (if available)
  And I click "Conferma Kill"
  And I add note "Replay mostra colpo valido"
  And I click "Risolvi"
  Then the kill status should change to "confirmed"
  And both players should be notified of the decision
  And the stats should update accordingly
```

### Scenario 6.5: Spectator visualizza partita live
```gherkin
Scenario: Public spectator views live match
  Given a match is in progress with matchId "MATCH-001"
  And the match is set to "public" visibility
  When I navigate to "/spectator/:matchId" as unauthenticated user
  Then I should see the tactical map with player positions
  And I should see live score:
    | team  | kills | deaths |
    | Alpha | 25    | 18     |
    | Bravo | 18    | 25     |
  And I should see activity feed with recent kills
  And I should not see player radio communications
  And I should see match timer countdown
```

---

## Admin Anagrafiche

### Scenario 7.1: Admin visualizza lista campi con filtri
```gherkin
Feature: Admin Entity Management
  As an Organization Admin
  I want to manage all entity registries (anagrafiche)
  So that I can keep data organized and updated

Scenario: View fields list with filters and pagination
  Given I am logged in as Organization Admin
  And my organizationId is "ORG-001"
  And 50 fields exist in my organization
  When I navigate to "/admin/anagrafiche/fields"
  Then I should see a DataTable with:
    | column       | sortable | filterable |
    | Name         | yes      | yes        |
    | Province     | yes      | yes        |
    | Terrain Type | yes      | yes        |
    | Status       | yes      | yes        |
    | Actions      | no       | no         |
  And I should see 20 rows per page (default)
  And I should see pagination controls
  And I should see total count "50 campi"
```

### Scenario 7.2: Admin filtra utenti per tier e divisione
```gherkin
Scenario: Filter users by tier and division
  Given I am on "/admin/anagrafiche/users"
  And the following users exist:
    | username | tier     | divisionId | status |
    | Ghost    | platinum | DIV-001    | active |
    | Soap     | gold     | DIV-001    | active |
    | Price    | silver   | DIV-002    | inactive |
  When I select filter "Tier: Platinum"
  And I select filter "Divisione: Nord Milano"
  And I click "Applica Filtri"
  Then I should see 1 user
  And I should see "Ghost"
  And I should not see "Soap" or "Price"
```

### Scenario 7.3: Admin crea nuovo campo (CRUD Create)
```gherkin
Scenario: Create new field via admin panel
  Given I am on "/admin/anagrafiche/fields"
  When I click "Crea Campo"
  Then a modal should open with form fields:
    | field         | type     | required |
    | Name          | text     | yes      |
    | Province      | select   | yes      |
    | Address       | text     | yes      |
    | Terrain Type  | select   | yes      |
    | Lighting      | checkbox | no       |
    | Parking       | checkbox | no       |
    | Description   | textarea | no       |
  When I fill all required fields
  And I click "Salva"
  Then the field should be created with organizationId "ORG-001"
  And I should see success toast "Campo creato con successo"
  And the new field should appear in the table
```

### Scenario 7.4: Admin modifica team esistente (CRUD Update)
```gherkin
Scenario: Edit existing team
  Given I am on "/admin/anagrafiche/teams"
  And a team "Alpha Squad" exists with teamId "TEAM-001"
  When I click the "Edit" action for "Alpha Squad"
  Then a modal should open pre-filled with team data
  When I change "Name" to "Alpha Elite"
  And I change "Tag" to "AE"
  And I click "Salva Modifiche"
  Then the team should be updated
  And I should see success toast "Team aggiornato"
  And the table should reflect the new name "Alpha Elite"
```

### Scenario 7.5: Admin elimina partita (CRUD Delete)
```gherkin
Scenario: Delete match with confirmation
  Given I am on "/admin/anagrafiche/matches"
  And a match exists with matchId "MATCH-001"
  When I click the "Delete" action for the match
  Then a confirmation dialog should appear with message:
    "Sei sicuro di voler eliminare questa partita? L'azione è irreversibile."
  When I click "Conferma Eliminazione"
  Then the match should be deleted from database
  And I should see success toast "Partita eliminata"
  And the match should be removed from the table
```

### Scenario 7.6: Navigazione admin con guard
```gherkin
Scenario: Admin navigation requires passing through overview
  Given I am on "/admin/anagrafiche/fields"
  When I click the browser back button
  Then I should be redirected to "/admin/overview"
  And I should not navigate directly to "/dashboard"
  
  When I click a sidebar link to "/admin/anagrafiche/users"
  Then I should navigate to "/admin/anagrafiche/users"
  
  When I want to exit admin panel
  Then I must first navigate to "/admin/overview"
  And then click "Torna alla Dashboard"
  And then I should navigate to "/dashboard"
```

---

## Messaging & Chat

### Scenario 8.1: Invio messaggio diretto tra utenti
```gherkin
Feature: Direct Messaging
  As a user
  I want to send direct messages to other players
  So that I can communicate privately

Scenario: Send direct message to another user
  Given I am logged in as "Ghost"
  And the user "Soap" exists with userId "USER-003"
  When I navigate to "/chat"
  And I click "Nuovo Messaggio"
  And I search for "Soap"
  And I select "Soap" from results
  And I type "Ci vediamo al campo domani?"
  And I click "Invia"
  Then the message should be sent
  And "Soap" should receive a notification
  And the conversation should appear in my chat list
  And the message should have status "delivered"
```

### Scenario 8.2: Team Radio durante partita
```gherkin
Scenario: Use team radio during live match
  Given I am in match "MATCH-001" (status: in_progress)
  And I am on team "Alpha"
  When I navigate to "/gameplay/:matchId"
  And I open the radio panel
  And I type "Nemici a nord-est, grid B5"
  And I click "Invia Radio"
  Then only my team members should receive the message
  And team Bravo should NOT see the message
  And the message should appear in the radio feed
  And a radio icon should pulse for recipients
```

---

## Ranking & Leaderboard

### Scenario 9.1: Visualizzazione leaderboard globale
```gherkin
Feature: Ranking System
  As a player
  I want to view the global leaderboard
  So that I can see my ranking and competitors

Scenario: View global leaderboard with tiers
  Given I am on "/leaderboard"
  And the following players exist:
    | username | elo  | tier     | kills | deaths | winRate |
    | Ghost    | 2450 | platinum | 850   | 420    | 67%     |
    | Soap     | 2150 | gold     | 720   | 510    | 58%     |
    | Price    | 1890 | silver   | 650   | 680    | 49%     |
  When the page loads
  Then I should see players ordered by ELO (descending)
  And each player row should display:
    | field     |
    | Rank      |
    | Avatar    |
    | Username  |
    | Tier      |
    | ELO       |
    | K/D Ratio |
    | Win Rate  |
  And I should see tier badges with colors:
    | tier     | color  |
    | platinum | #E5E4E2|
    | gold     | #FFD700|
    | silver   | #C0C0C0|
```

### Scenario 9.2: Filtro leaderboard per tier
```gherkin
Scenario: Filter leaderboard by tier
  Given I am on "/leaderboard"
  When I select tier filter "Gold"
  Then I should see only players with tier "gold"
  And the rankings should be recalculated within the filtered set
  And I should see "Classifica: Tier Gold"
```

---

## Marketplace

### Scenario 10.1: Acquisto prodotto nel marketplace
```gherkin
Feature: Tactical Marketplace
  As a player
  I want to purchase tactical gear
  So that I can improve my equipment

Scenario: Purchase item from marketplace
  Given I am logged in with balance 150 credits
  And a product exists:
    | name           | price | stock | shopId    |
    | Tactical Vest  | 50    | 10    | SHOP-001  |
  When I navigate to "/marketplace"
  And I click on "Tactical Vest"
  And I click "Aggiungi al Carrello"
  And I click "Procedi al Checkout"
  And I confirm the purchase
  Then my balance should be 100 credits
  And the shop should receive notification of sale
  And the product stock should decrease to 9
  And I should receive order confirmation
```

---

## Test Data Setup

### Prerequisiti per Tutti gli Scenari

```yaml
Mock Users:
  - player@demo.it / demo123 (Player, Platinum tier)
  - teamleader@demo.it / demo123 (Team Leader, Gold tier)
  - referee@demo.it / demo123 (Referee)
  - field@demo.it / demo123 (Field Manager)
  - shop@demo.it / demo123 (Shop Owner)
  - admin@demo.it / demo123 (Organization Admin)
  - superadmin@itl.it / demo123 (Federation Admin)

Mock Organizations:
  - ITL (Independent Tactical League) - Federation
    - TicOps Italy (ORG-001) - Organization
      - Nord Milano (DIV-001) - Division
      - Sud Milano (DIV-002) - Division

Mock Fields:
  - Campo Bravo (FIELD-001, Milano, ORG-001, DIV-001)
  - Tactical Zone (FIELD-002, Bergamo, ORG-001, DIV-002)

Mock Teams:
  - Alpha Squad (TEAM-001, leader: USER-002, DIV-001)
  - Bravo Force (TEAM-002, leader: USER-004, DIV-001)
```

---

## Esecuzione Test

### Comandi
```bash
# Run all BDD tests
bun test:bdd

# Run specific feature
bun test:bdd --grep "Multi-Organization"

# Run with coverage
bun test:bdd --coverage

# Run in watch mode
bun test:bdd --watch
```

### Test Framework
- **Framework**: Vitest + Testing Library
- **BDD Tool**: Cucumber.js o Vitest con describe/it in stile BDD
- **Mocking**: MSW (Mock Service Worker) per API calls
- **Coverage Target**: > 85%

---

## Acceptance Criteria Template

Per ogni feature, utilizzare questo template:

```gherkin
Feature: [Nome Feature]
  As a [Ruolo]
  I want to [Azione]
  So that [Beneficio]

Background:
  Given [Prerequisiti comuni a tutti gli scenari]

Scenario: [Scenario positivo]
  Given [Contesto iniziale]
  And [Setup addizionale]
  When [Azione utente]
  And [Azione addizionale]
  Then [Risultato atteso]
  And [Verifica addizionale]

Scenario: [Scenario negativo / edge case]
  Given [Contesto iniziale]
  When [Azione che causa errore]
  Then [Errore atteso]
  And [Sistema rimane in stato consistente]
```

---

**Document Version**: 1.0  
**Last Update**: 25 Dicembre 2024  
**Total Scenarios**: 25+  
**Coverage**: Authentication (4), Multi-Org (5), Fields (2), Team (3), Match (2), Gameplay (5), Admin (6), Chat (2), Ranking (2), Marketplace (1)
