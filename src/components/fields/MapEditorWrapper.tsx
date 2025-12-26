import React, { Component, ErrorInfo, ReactNode, Suspense, lazy } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Loader2 } from 'lucide-react';
import '@ticops/field-mapper/styles';

// Lazy import per evitare problemi di inizializzazione
const LazyMapEditor = lazy(async () => {
  try {
    const module = await import('@ticops/field-mapper');
    return { default: module.MapEditor };
  } catch (error) {
    console.error('Error loading MapEditor:', error);
    throw error;
  }
});

interface MapEditorWrapperProps {
  onBack?: () => void;
}

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary per MapEditor
 * Gestisce errori di React hooks e context mancanti
 */
class MapEditorErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('MapEditor Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen w-screen gap-4 p-8 text-center bg-background">
          <div className="text-destructive text-lg font-bold">
            ⚠️ Errore nel caricamento del Map Editor
          </div>
          <div className="text-sm text-muted-foreground max-w-md">
            {this.state.error?.message || 'Si è verificato un errore imprevisto'}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Possibili cause:
            <ul className="list-disc list-inside mt-2 text-left">
              <li>Conflitto versioni React</li>
              <li>Dipendenze mancanti nella libreria</li>
              <li>Context provider mancante</li>
            </ul>
          </div>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Riprova
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Loading fallback per Suspense
 */
const MapEditorLoading: React.FC = () => (
  <div className="flex items-center justify-center h-screen w-screen bg-background">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Caricamento Map Editor...</p>
    </div>
  </div>
);

/**
 * Wrapper component per MapEditor
 * Renderizza il MapEditor a schermo intero
 * Il MapEditor di field-mapper usa h-screen internamente
 */
export const MapEditorWrapper: React.FC<MapEditorWrapperProps> = ({ onBack }) => {
  return (
    <MapEditorErrorBoundary>
      <Suspense fallback={<MapEditorLoading />}>
        <TooltipProvider delayDuration={300}>
          <LazyMapEditor />
        </TooltipProvider>
      </Suspense>
    </MapEditorErrorBoundary>
  );
};
