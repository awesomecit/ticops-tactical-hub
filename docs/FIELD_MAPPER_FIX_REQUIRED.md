# Field Mapper Library - Integration Fix Required

## 🔴 CRITICAL ISSUE

La libreria `@ticops/field-mapper` **non può essere integrata** nell'app `ticops-tactical-hub` a causa di conflitti di dipendenze React.

### Problema

La libreria è buildata con React e @radix-ui **inclusi nel bundle**, causando:
- ❌ Duplicate React instances → `Invalid hook call`
- ❌ Duplicate Radix UI contexts → `Tooltip must be used within TooltipProvider`
- ❌ Impossibilità di condividere context tra app e libreria

### Test Effettuati (Falliti)

1. ✅ `vite.config.ts` dedupe → **Non sufficiente**
2. ✅ `TooltipProvider` multipli → **Non funziona con bundle**
3. ✅ Lazy loading → **Stesso errore**
4. ✅ Error Boundary → **Cattura ma non risolve**

## ✅ SOLUZIONE RICHIESTA

### Opzione A: Rebuild con Externals (RACCOMANDATO)

Modificare la build per **escludere** React e Radix UI dal bundle.

#### 1. Modificare `vite.config.ts`

\`\`\`typescript
// field-mapper/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FieldMapper',
      formats: ['es', 'cjs'],
      fileName: (format) => \`field-mapper.\${format}.js\`,
    },
    rollupOptions: {
      // ⚠️ CRITICAL: Mark as external
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@radix-ui/react-tooltip',
        '@radix-ui/react-slot',
        '@radix-ui/react-portal',
        '@radix-ui/react-presence',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        // Add all other @radix-ui packages used
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
\`\`\`

#### 2. Modificare `package.json`

\`\`\`json
{
  "name": "@ticops/field-mapper",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/field-mapper.cjs.js",
  "module": "./dist/field-mapper.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/field-mapper.es.js",
      "require": "./dist/field-mapper.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/style.css"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@radix-ui/react-tooltip": "^1.0.0",
    "@radix-ui/react-slot": "^1.0.0"
  },
  "devDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@radix-ui/react-tooltip": "^1.0.0"
  }
  // dependencies dovrebbe essere vuoto o solo utility pure
}
\`\`\`

#### 3. Rebuild

\`\`\`bash
cd /home/antoniocittadino/MyRepos/field-mapper
rm -rf node_modules dist
npm install
npm run build
\`\`\`

#### 4. Verifica

\`\`\`bash
# Bundle NON deve contenere React
ls -lh dist/
cat dist/field-mapper.es.js | grep "react" | wc -l  # Should be 0 or minimal imports

# Controlla che external funziona
npm run build | grep "external"
\`\`\`

### Opzione B: Monorepo con Shared Dependencies

Se field-mapper e tactical-hub sono nello stesso monorepo:

\`\`\`json
// Root package.json
{
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}
\`\`\`

E usare `pnpm` o `yarn workspaces` per condividere dipendenze.

### Opzione C: Iframe Isolation (Fallback)

Se rebuild non è possibile immediatamente:

1. Hostare MapEditor come app standalone
2. Embeddare via iframe in tactical-hub
3. Comunicazione via `postMessage`

Già preparato in `MapEditorIframe.tsx` (placeholder).

## 📋 Checklist Post-Fix

Dopo aver applicato **Opzione A**:

- [ ] `npm run build` nella libreria
- [ ] Verificare `dist/` non contiene React nel bundle
- [ ] `npm install` in tactical-hub
- [ ] Sostituire `MapEditorIframe` con `MapEditorWrapper` in `FieldMapsManager.tsx`
- [ ] Test: Aprire Editor Mappe e verificare **nessun errore console**
- [ ] Commit libreria con messaggio: `build: externalize React and Radix UI dependencies`

## 🔗 File Coinvolti

### Field Mapper (da modificare)
- `/home/antoniocittadino/MyRepos/field-mapper/vite.config.ts`
- `/home/antoniocittadino/MyRepos/field-mapper/package.json`

### Tactical Hub (già pronto)
- ✅ `vite.config.ts` - Dedupe configurato
- ✅ `MapEditorWrapper.tsx` - Error boundary ready
- ⏳ `MapEditorIframe.tsx` - Placeholder temporaneo
- ✅ `FieldMapsManager.tsx` - Usa MapEditorIframe (da cambiare in MapEditorWrapper dopo fix)

## ⏱️ Stima Tempo

- **Rebuild libreria**: 15-30 minuti
- **Test integrazione**: 10 minuti
- **Totale**: < 1 ora

## 📞 Contatti

Per domande su questa modifica:
- **Repo tactical-hub**: Configurazione già pronta
- **Repo field-mapper**: Richiede rebuild come da istruzioni

---

**Priorità**: 🔴 ALTA - Blocca integrazione Map Editor  
**Tipo**: 🛠️ Build Configuration  
**Impact**: 🎯 Critical Feature Enabler
