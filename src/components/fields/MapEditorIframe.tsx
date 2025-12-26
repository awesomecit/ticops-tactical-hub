import React, { useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface MapEditorIframeProps {
  fieldId?: string;
  mapId?: string;
  onSave?: (mapData: any) => void;
}

/**
 * MapEditor wrapped in iframe for complete isolation
 * This solves React context and dependency conflicts
 */
export const MapEditorIframe: React.FC<MapEditorIframeProps> = ({
  fieldId,
  mapId,
  onSave,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security: verify origin in production
      if (event.data.type === 'MAP_SAVED' && onSave) {
        onSave(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSave]);

  // Per ora, usa la libreria direttamente (temporaneo)
  // TODO: Creare pagina HTML standalone per iframe quando necessario
  return (
    <div className="w-full h-full bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <div>
          <p className="text-lg font-bold">Map Editor</p>
          <p className="text-sm text-muted-foreground">
            Feature in sviluppo - Richiede configurazione iframe standalone
          </p>
        </div>
        <div className="text-xs text-muted-foreground max-w-md mx-auto bg-muted/30 p-4 rounded border border-border">
          <strong>Nota tecnica:</strong> La libreria @ticops/field-mapper ha conflitti di dipendenze React.
          Per risolverli completamente serve:
          <ul className="list-disc list-inside mt-2 text-left">
            <li>Build della libreria con externals (React, Radix UI)</li>
            <li>Oppure: Hosting separato in iframe dedicato</li>
            <li>Oppure: Integrazione via Web Component</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
