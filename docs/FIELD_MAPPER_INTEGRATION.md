# Field Mapper Integration

## Overview

Il **Field Mapper** (`@ticops/field-mapper`) è stato integrato come strumento di creazione e modifica mappe all'interno del **Field Manager Dashboard**.

## Scopo

Questa funzionalità permette ai gestori di campo di:
- **Creare** layout dettagliati dei propri campi da gioco
- **Definire** spawn point, obiettivi, zone e ostacoli
- **Configurare** boundary e terrain features
- **Salvare** mappe che verranno utilizzate come **layer base** nelle altre visualizzazioni

## Utilizzo nelle Viste

Le mappe create con il Field Mapper saranno visualizzabili come **layer attivabili/disattivabili** (occhietto) nelle seguenti viste:

1. **Gameplay View** (`/gameplay`) - Vista giocatore con radar tattico
2. **Spectator View** (`/spectator`) - Vista spettatore con tracking live
3. **Referee View** (`/referee`) - Vista arbitro per monitoraggio match
4. **Admin All Views** (`/admin/views`) - Dashboard unificata

## Accesso

- **Route**: `/field-manager/fields` → Tab "Mappe" → Bottone "Editor Mappe"
- **Component**: `FieldMapsManager` apre dialog fullscreen con `MapEditor`
- **Requisito ruolo**: `field_manager` (o multi-role con field_manager attivo)

### Workflow Utente

1. Field manager accede a "I Miei Campi" (`/field-manager/fields`)
2. Seleziona un campo esistente
3. Naviga al tab "Mappe"
4. Visualizza lista mappe esistenti per quel campo
5. Click su "Editor Mappe" (o "Modifica" su mappa specifica)
6. Si apre dialog fullscreen con MapEditor
7. Crea/modifica layout, salva e chiude
8. Mappa disponibile come layer nelle altre viste

## Struttura File

### File Modificati
```
package.json                                      # Aggiunta dipendenza @ticops/field-mapper
src/components/fields/FieldMapsManager.tsx       # Integrato MapEditor in dialog fullscreen
src/i18n/locales/it.json                         # Traduzioni fieldManager.mapEditor
src/i18n/locales/en.json                         # Traduzioni fieldManager.mapEditor
docs/FIELD_MAPPER_INTEGRATION.md                 # Questo file
```

### File NON Utilizzati (deprecati)
```
src/pages/TacticalMap.tsx                        # Wrapper standalone (non più linkato)
src/App.tsx route /field-manager/map-editor     # Route non più necessaria
```

**Nota**: Il file `TacticalMap.tsx` esiste ancora ma non è accessibile via routing. Può essere rimosso o mantenuto per usi futuri.

## Dipendenza

```json
"@ticops/field-mapper": "file:../field-mapper"
```

La libreria è collegata tramite **symlink locale** (NPM `file:` protocol), quindi le modifiche alla libreria sono immediatamente disponibili.

## Traduzioni

### Italiano (`it.json`)
```json
"fieldManager": {
  "mapEditor": {
    "title": "Editor Mappe Campo",
    "subtitle": "Crea e modifica le mappe dei tuoi campi da gioco",
    "description": "Disegna il layout del campo, definisci spawn point, obiettivi e ostacoli...",
    "save": "Salva Mappa",
    "load": "Carica Mappa",
    "new": "Nuova Mappa",
    "export": "Esporta",
    "import": "Importa"
  }
}
```

### English (`en.json`)
```json
"fieldManager": {
  "mapEditor": {
    "title": "Field Map Editor",
    "subtitle": "Create and edit your field maps",
    "description": "Draw field layout, define spawn points, objectives and obstacles...",
    "save": "Save Map",
    "load": "Load Map",
    "new": "New Map",
    "export": "Export",
    "import": "Import"
  }
}
```

## Architettura

```
┌──────────────────────────────────────────────────────────┐
│         Field Manager Dashboard                          │
│         /field-manager/fields                            │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Tab: Mappe                                        │ │
│  │                                                    │ │
│  │  ┌──────────────────────────────────────────────┐ │ │
│  │  │  FieldMapsManager Component                  │ │ │
│  │  │                                              │ │ │
│  │  │  [Nuova Mappa] [Editor Mappe] ← buttons     │ │ │
│  │  │                                              │ │ │
│  │  │  Grid di mappe esistenti:                   │ │ │
│  │  │  ┌───────┐ ┌───────┐ ┌───────┐             │ │ │
│  │  │  │ Map 1 │ │ Map 2 │ │ Map 3 │             │ │ │
│  │  │  │ [👁️] [✏️]│ │ [👁️] [✏️]│ │ [👁️] [✏️]│             │ │ │
│  │  │  └───────┘ └───────┘ └───────┘             │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
                    │
                    │ Click "Editor Mappe" or "Modifica"
                    ▼
┌──────────────────────────────────────────────────────────┐
│  Dialog Fullscreen (max-w-[100vw] h-screen)             │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │   Header: "Editor Mappe - Campo X"                │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │                                                    │ │
│  │         @ticops/field-mapper                       │ │
│  │            <MapEditor />                           │ │
│  │                                                    │ │
│  │  - Canvas 2D/3D                                   │ │
│  │  - Drawing tools (spawn, cover, zone)            │ │
│  │  - Object palette                                 │ │
│  │  - Layer controls                                 │ │
│  │  - Save/Load/Export                               │ │
│  │                                                    │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
        │
        │ saves map data (future: Supabase)
        ▼
┌──────────────────────────────────────────────────────────┐
│   Field Maps Storage (future implementation)             │
│   - Supabase table: field_maps                           │
│   - Columns: id, field_id, name, data (JSON),            │
│     description, is_active, created_at, updated_at       │
└──────────────────────────────────────────────────────────┘
        │
        │ loaded as layer in tactical views
        ▼
┌──────────────────────────────────────────────────────────┐
│  Gameplay/Spectator/Referee Views                        │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │   Tactical Radar Component                         │ │
│  │                                                    │ │
│  │   Layers (toggle with eye icon):                  │ │
│  │   [👁️] Field Map (base layer - from editor)       │ │
│  │   [👁️] Player positions (live tracking)           │ │
│  │   [👁️] Objectives (match-specific)                │ │
│  │   [👁️] Events (kills, flags, etc)                 │ │
│  └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

## Next Steps

### Backend Integration (v0.2.0+)
- [ ] Creare tabella `field_maps` in Supabase
- [ ] API endpoints per CRUD mappe
- [ ] Associare mappe ai campi (`fields` table)
- [ ] Permessi basati su ruolo field_manager

### UI Enhancements
- [ ] Galleria mappe esistenti (load/select)
- [ ] Template mappe predefinite (outdoor, CQB, woodland, urban)
- [ ] Preview miniatura in lista campi
- [ ] Versioning mappe (history/rollback)

### Integration con Radar Views
- [ ] `TacticalMap.tsx` (gameplay) - Layer toggle per mappa campo
- [ ] `SpectatorMap.tsx` - Layer toggle per spettatori
- [ ] `RefereeView.tsx` - Overlay mappa per arbitri
- [ ] `AdminAllViews.tsx` - Selezione mappa per monitoring

### Features Avanzate
- [ ] Import da immagini (floor plan → vectorized)
- [ ] Export PDF/PNG per stampa
- [ ] Condivisione mappe pubbliche (community)
- [ ] Validazione automatica (spawn balance, boundaries)

## Build & Development

```bash
# Install dependencies (creates symlink to ../field-mapper)
npm install

# Build project
npm run build

# Dev server
npm run dev

# Access map editor
# Login → Sidebar → Gestione → Editor Mappe
# Or navigate to: http://localhost:8080/field-manager/map-editor
```

## Notes

- La pagina è **full-screen** (h-[calc(100vh-4rem)]) per massimizzare area di lavoro
- Il `MapEditor` della libreria gestisce **autonomamente** lo stato interno (canvas, tools, objects)
- Le mappe salvate devono essere **serializzabili** (JSON) per storage database
- Future integrazioni richiederanno **API contract** tra editor e tactical radar components

## Related Files

- [COPILOT_INTEGRATION_GUIDE.md](../COPILOT_INTEGRATION_GUIDE.md) - Guida originale per integrazione
- [API.md](API.md) - API endpoints per mappe (future)
- [src/components/gameplay/TacticalMap.tsx](../src/components/gameplay/TacticalMap.tsx) - Componente radar gameplay (esistente)
- [src/components/gameplay/SpectatorMap.tsx](../src/components/gameplay/SpectatorMap.tsx) - Componente radar spettatore (esistente)

---

**Status**: ✅ Integrazione completata (v0.1.0)  
**Author**: TicOps Development Team  
**Last Updated**: 26 Dicembre 2025
