import React from 'react';
import { MapEditor } from '@ticops/field-mapper';
import '@ticops/field-mapper/styles';
import { useTranslation } from 'react-i18next';

/**
 * FieldMapEditor Page - Full-screen map editor for field managers
 * 
 * This tool allows field managers to:
 * - Create and edit field layouts
 * - Define spawn points, objectives, boundaries
 * - Add obstacles, buildings, and terrain features
 * - Save maps that will be used as base layers in gameplay/spectator/referee views
 * 
 * Maps created here can be toggled (eye icon) in radar views during matches.
 */
const FieldMapEditor: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="h-[calc(100vh-4rem)] w-full bg-background">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border px-6 py-3">
          <h1 className="text-xl font-bold text-primary">
            {t('fieldManager.mapEditor.title', 'Editor Mappe Campo')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('fieldManager.mapEditor.subtitle', 'Crea e modifica le mappe dei tuoi campi da gioco')}
          </p>
        </div>
        
        {/* Map Editor - Full height */}
        <div className="flex-1 relative">
          <MapEditor />
        </div>
      </div>
    </div>
  );
};

export default FieldMapEditor;
