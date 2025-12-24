# TicOps - Gameplay UI Components Reference

## 📸 Screenshot Guide - GameplayView

### Vista Completa Gameplay

La `GameplayView` ora include tutti i componenti necessari per un'esperienza tattica completa in stile Call of Duty:

---

## 🎯 Componenti Principali

### 1. **LiveIndicator**
**Posizione**: Top bar, dopo pulsante back
**File**: `src/components/gameplay/LiveIndicator.tsx`

```tsx
<LiveIndicator size="md" pulse />
```

**Caratteristiche**:
- Badge rosso animato "LIVE" con icona radio
- Effetto pulse su testo e dot indicator
- 3 size: `sm`, `md`, `lg`
- Shadow glow rosso per prominenza

**Screenshot**: Top bar con badge LIVE rosso lampeggiante

---

### 2. **DistanceRings**
**Posizione**: Overlay sulla TacticalMap
**File**: `src/components/gameplay/DistanceRings.tsx`

```tsx
<DistanceRings 
  intervals={[50, 100, 150]} 
  showLabels 
  color="primary"
/>
```

**Caratteristiche**:
- Cerchi concentrici per range awareness
- Label con distanza in metri (50m, 100m, 150m)
- Animazione pulse sfasata per ogni anello
- Centro fisso sulla posizione player (dot blu)

**Screenshot**: Mappa tattica con cerchi di distanza concentrici

---

### 3. **CompassIndicator**
**Posizione**: Top-left corner della mappa
**File**: `src/components/gameplay/CompassIndicator.tsx`

```tsx
<CompassIndicator 
  heading={45} 
  size="md" 
  showCardinals 
/>
```

**Caratteristiche**:
- Compass circolare con punti cardinali (N, E, S, W)
- Nord evidenziato in rosso
- Freccia centrale che indica heading giocatore (rotazione dinamica)
- Gradi di heading sotto il compass (es. "45°")
- Background dark con blur e border glow

**Screenshot**: Angolo top-left con compass che mostra heading

---

### 4. **MiniRadar**
**Posizione**: Bottom-right corner della mappa
**File**: `src/components/gameplay/MiniRadar.tsx`

```tsx
<MiniRadar
  players={MOCK_GAME_PLAYERS}
  playerPosition={playerPosition}
  range={30}
  size={140}
  showObjective
  objectivePosition={gameState.objective.position}
/>
```

**Caratteristiche**:
- Radar 140x140px stile COD
- Griglia concentrica con linee crosshair
- **Sweep animation** - linea di scansione rotante (4s loop)
- Centro: dot blu (player)
- Nemici: dot rossi con glow
- Alleati: dot blu
- Obiettivo: dot giallo pulsante
- Background dark con border glow primary
- Label "RADAR" sotto il componente

**Screenshot**: Corner bottom-right con mini radar animato

---

## 🗺️ TacticalMap Completa

La mappa principale ora include:

1. **Background**:
   - Gradient grigio scuro
   - Grid lines 10x10 con opacity 20%
   - Elementi terreno decorativi (buildings, obstacles)

2. **Overlay Layers** (z-index crescente):
   - DistanceRings (cerchi di distanza)
   - GameObjective (flag/zone/target)
   - Players dots (alleati blu, nemici rossi)
   - Player dot centrale (blu con glow pulsante)
   - CompassIndicator (top-left)
   - MiniRadar (bottom-right)

---

## 📊 HUD Elements

### Top Bar
- **Back button** (ArrowLeft)
- **LiveIndicator** - "LIVE" badge rosso animato ✨
- **Mode** - es. "Capture The Flag"
- **Round** - "R2/5"
- **Timer** - "03:45" (font mono)
- **End Match button** (demo)

### Score Bar
- Team Alpha (blu) vs Team Bravo (rosso)
- Progress bar con percentage
- Score numbers al centro (es. "3 - 2")

### Status Bar
- **Player Status** - Badge "ALIVE"/"DEAD" con icona cuore
- **Radio Box** (compact mode)
- **Stats**: Kills (target icon), Deaths (skull icon), Distance (footprints)

### Action Buttons (Grid 4 colonne)
- **MORTO** (Skull) - Red
- **KILL** (Crosshair) - Green
- **PING** (MapPin) - Blue
- **SCANNER** (Scan) - Amber

### Radio PTT
- Large button centrale sopra action grid
- Waveform animation quando attivo
- Shortcut keyboard display

---

## 🎮 Interazioni

### Kill Declaration
- Modal con lista nemici vicini
- Mostra **distanza approssimativa** (es. "~35m di distanza")
- Avatar nemico con border rosso
- Selezione single-choice con checkmark
- Confirm/Cancel buttons

### Radio Scanner (Sheet)
- Frequency scanner per ingegneri
- Lista frequenze rilevate
- Channel encryption status
- Demo countermeasures buttons (scan/jam)

---

## 📐 Layout Responsive

```
┌─────────────────────────────────────────┐
│ [←] [LIVE🔴] Mode    R2/5    03:45  [🏆]│ ← Top Bar
├─────────────────────────────────────────┤
│ ALPHA ████████░░░░ 3-2 ░░░░██████ BRAVO│ ← Score
├─────────────────────────────────────────┤
│  ┌──────────────────────────────────┐  │
│  │ [🧭]                        ▲     │  │
│  │                          Compass │  │
│  │    ◯ ◯ ◯  Distance Rings          │  │
│  │                                   │  │ ← Tactical Map
│  │      @  ← Player                  │  │
│  │   ●   ●  ← Enemies                │  │
│  │                                   │  │
│  │              [MiniRadar] ◐        │  │
│  └──────────────────────────────────┘  │
├─────────────────────────────────────────┤
│ 💚ALIVE [Radio📻] 🎯12 💀3 👣2.5km    │ ← Status
├─────────────────────────────────────────┤
│        [=== PTT RADIO ===]             │ ← PTT Button
│  [MORTO] [KILL] [PING] [SCANNER]      │ ← Actions
└─────────────────────────────────────────┘
```

---

## 🎨 Color Palette

- **Live**: `bg-red-600`, `text-white`, `shadow-red-500/50`
- **Distance Rings**: `border-primary/30` (orange)
- **Compass**: `border-white/30`, North `text-red-400`
- **Mini Radar**: `bg-black/80`, `border-white/30`
- **Player**: `bg-blue-500` with glow
- **Enemies**: `bg-red-500` with glow
- **Objective**: `bg-yellow-500` pulse

---

## ✅ Screenshot Checklist

Per documentazione completa, cattura:

1. ✅ **Full GameplayView** - Vista completa con tutti i componenti
2. ✅ **LiveIndicator closeup** - Badge LIVE in top bar
3. ✅ **TacticalMap with DistanceRings** - Cerchi concentrici visibili
4. ✅ **CompassIndicator detail** - Top-left compass con heading
5. ✅ **MiniRadar detail** - Bottom-right radar con sweep animation
6. ✅ **Kill Declaration Modal** - Con distanze nemici
7. ✅ **Radio Scanner Sheet** - Frequency scanner panel
8. ✅ **Radio PTT active** - Waveform animation durante trasmissione

---

## 🚀 Quick Test

```bash
# Start dev server
bun dev

# Navigate to
http://localhost:8080/gameplay

# Or with game ID
http://localhost:8080/gameplay/game_demo_1
```

**Test flow**:
1. Auto-dark mode attivo
2. Verificare badge LIVE lampeggiante
3. Controllare cerchi distanza sulla mappa
4. Testare compass rotation (heading demo: 45°)
5. Osservare mini radar sweep animation
6. Click "KILL" → modal con distanze
7. Click "SCANNER" → sheet radio scanner

---

*Documento aggiornato: 2025-12-24*
*Versione: 2.0 - Gameplay UI Complete*
