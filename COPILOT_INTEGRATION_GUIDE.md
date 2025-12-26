# Copilot Integration Guide: Field Mapper into Ticops Tactical Hub

This document serves as a guide for an AI assistant (like GitHub Copilot) to integrate the `@ticops/field-mapper` library into the `ticops-tactical-hub` application.

## Context

- **Target App**: `ticops-tactical-hub` (React + Vite + TypeScript)
- **Library**: `@ticops/field-mapper` (Local React library)
- **Goal**: Add a "Tactical Map" page that uses the `MapEditor` component from the library.

## Step-by-Step Instructions

### 1. Add Dependency

Update `package.json` to include the library. Since it is a local package, use the `file:` protocol.

```json
// package.json
{
  "dependencies": {
    "@ticops/field-mapper": "file:../field-mapper"
    // ... other dependencies
  }
}
```

> **Note**: Run `npm install` after updating `package.json`.

### 2. Create Page Component

Create a new file `src/pages/TacticalMap.tsx`. This component should render the `MapEditor` full screen.

```tsx
// src/pages/TacticalMap.tsx
import React from "react";
import { MapEditor } from "@ticops/field-mapper";
import "@ticops/field-mapper/styles"; // Import styles

const TacticalMap = () => {
  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      <MapEditor />
    </div>
  );
};

export default TacticalMap;
```

### 3. Update Routing

Register the new page in the main application router `src/App.tsx`.

1.  Import the component:
    ```tsx
    import TacticalMap from "@/pages/TacticalMap";
    ```
2.  Add the route within the authenticated layout (inside `ProtectedRoute`):
    ```tsx
    <Route path="/tactical-map" element={<TacticalMap />} />
    ```

### 4. Update Navigation

Add a link to the sidebar so users can access the page. Edit `src/components/layout/Sidebar.tsx`.

Add the following item to the `Gameplay` section of the `navSections` array:

```tsx
{ icon: MapPin, label: 'Mappa Tattica', path: '/tactical-map' },
```

### 5. Fix CSS Import Order (If needed)

Ensure `src/index.css` has imports at the top, _before_ Tailwind directives, to avoid build warnings/errors.

```css
/* src/index.css */
@import url("...");

@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Verification

1.  Run `npm run build` to ensure no type or build errors.
2.  Run `npm run dev` and navigate to `/tactical-map` to verify the editor loads.
