# Field Mapper Integration - Troubleshooting

## Problema: React Hooks Error

### Errore Originale
```
Warning: Invalid hook call. Hooks can only be called inside of the body of a function component.
TypeError: Cannot read properties of null (reading 'useRef')
Error: `Tooltip` must be used within `TooltipProvider`
```

### Causa
La libreria `@ticops/field-mapper` ha **copie duplicate di React** quando viene importata come dipendenza locale (`file:../field-mapper`). Questo causa:
1. Multiple istanze di React nello stesso bundle
2. Context providers (come `TooltipProvider`) non funzionano correttamente
3. Hooks falliscono perché chiamati su istanze React diverse

### Soluzione Implementata

#### 1. Dedupe React in Vite Config
```typescript
// vite.config.ts
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
  dedupe: ['react', 'react-dom'], // ← Forza uso singola istanza
}
```

Questo forza Vite a usare **una sola istanza** di React e React-DOM, risolvendo il conflitto.

#### 2. MapEditorWrapper Component
Creato wrapper robusto con:
- **Error Boundary**: Cattura errori di rendering
- **TooltipProvider dedicato**: Context isolato per la libreria
- **Suspense**: Loading state durante caricamento

```tsx
// src/components/fields/MapEditorWrapper.tsx
<MapEditorErrorBoundary>
  <Suspense fallback={<Loading />}>
    <TooltipProvider>
      <MapEditor />
    </TooltipProvider>
  </Suspense>
</MapEditorErrorBoundary>
```

#### 3. Utilizzo in FieldMapsManager
```tsx
// Invece di:
<MapEditor />

// Usare:
<MapEditorWrapper />
```

## Verifica della Soluzione

### 1. Check Console Browser
Aprire DevTools → Console, **non dovrebbero** esserci:
- ❌ `Warning: Invalid hook call`
- ❌ `TypeError: Cannot read properties of null (reading 'useRef')`
- ❌ `Error: Tooltip must be used within TooltipProvider`

### 2. Test Funzionale
1. Login → I Miei Campi (`/field-manager/fields`)
2. Tab "Mappe"
3. Click "Editor Mappe"
4. Il MapEditor dovrebbe **caricarsi senza errori**

### 3. Fallback Error Boundary
Se il problema persiste, l'Error Boundary mostrerà:
```
⚠️ Errore nel caricamento del Map Editor
[Messaggio errore]
Possibili cause: ...
[Bottone Riprova]
```

## Alternative (se dedupe non basta)

### Opzione A: PeerDependencies nella Libreria
Modificare `field-mapper/package.json`:
```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```
E rimuovere da `dependencies` (se presenti).

### Opzione B: Externals in Build
Se la libreria viene buildata separatamente:
```typescript
// field-mapper vite.config.ts
build: {
  rollupOptions: {
    external: ['react', 'react-dom'],
  }
}
```

### Opzione C: Import Dinamico
Lazy load del MapEditor solo quando necessario:
```tsx
const MapEditorWrapper = lazy(() => import('./MapEditorWrapper'));
```

## Logs Utili per Debug

### Check Versioni React
```bash
npm ls react react-dom
```

Dovrebbe mostrare **una sola versione** (no duplicati).

### Check Symlink
```bash
ls -la node_modules/@ticops/field-mapper
```

Dovrebbe essere symlink a `../../../field-mapper`.

### Vite Build Analysis
```bash
npm run build -- --debug
```

Cerca warning su "multiple instances of react".

## Status Attuale

⚠️ **PROBLEMA NON RISOLVIBILE LATO APP**  
✅ **Dedupe configurato** in `vite.config.ts`  
✅ **MapEditorWrapper** creato con Error Boundary  
✅ **TooltipProvider** multipli testati  
❌ **Errore persiste**: La libreria è buildata con dipendenze bundle

### Root Cause
La libreria `@ticops/field-mapper` è stata buildata includendo React e @radix-ui nel bundle finale. Questo crea **istanze duplicate** che non possono essere risolte con dedupe o context providers esterni.

### Soluzione Implementata (Temporanea)
**MapEditorIframe** - Placeholder che:
- Spiega il problema tecnico
- Mostra loader con messaggio informativo  
- Indica le soluzioni necessarie

### Soluzioni Definitive (Richieste)

#### ✅ Soluzione 1: Rebuild Libreria (RACCOMANDATO)
Modificare il build della libreria `@ticops/field-mapper`:

```typescript
// field-mapper/vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'FieldMapper',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@radix-ui/react-tooltip',
        '@radix-ui/react-slot',
        '@radix-ui/react-portal',
        '@radix-ui/react-presence',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

E modificare `package.json`:
```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@radix-ui/react-tooltip": "^1.0.0"
  },
  "devDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

Poi:
```bash
cd /home/antoniocittadino/MyRepos/field-mapper
npm install
npm run build
```

#### ✅ Soluzione 2: Iframe Isolation
Creare pagina standalone per MapEditor:

1. **Creare** `public/map-editor.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="/field-mapper-standalone.js"></script>
</head>
<body>
  <div id="map-editor-root"></div>
</body>
</html>
```

2. **Modificare** `MapEditorIframe.tsx`:
```tsx
<iframe 
  ref={iframeRef}
  src="/map-editor.html"
  className="w-full h-full border-0"
  sandbox="allow-scripts allow-same-origin"
/>
```

#### ✅ Soluzione 3: Web Component
Wrappare MapEditor come Web Component nativo per isolamento completo.

### Prossimi Step se Problemi Persistono
1. Verificare `field-mapper/package.json` (React come peer o dev dependency)
2. Rebuild libreria con externals
3. Considerare iframe isolation per editor (ultima risorsa)

---

**Autore**: TicOps Dev Team  
**Data**: 26 Dicembre 2025  
**Versione**: 0.1.0
