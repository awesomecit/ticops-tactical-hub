import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Map,
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  Download,
  Upload,
  Image,
  Maximize2,
} from 'lucide-react';
import { MapEditorWrapper } from './MapEditorWrapper';
import {
  TacticalCard,
  TacticalCardHeader,
  TacticalCardTitle,
  TacticalCardContent,
} from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';

interface FieldMap {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  isActive: boolean;
  builderUrl?: string;
}

interface FieldMapsManagerProps {
  fieldId: string;
  fieldName: string;
}

// Mock maps data
const MOCK_MAPS: FieldMap[] = [
  {
    id: 'map_001',
    name: 'Configurazione Standard',
    description: 'Layout base con 4 spawn points e coperture distribuite uniformemente',
    imageUrl: '/placeholder.svg',
    createdAt: new Date('2024-06-15'),
    isActive: true,
  },
  {
    id: 'map_002',
    name: 'MilSim Night Ops',
    description: 'Configurazione notturna con zone buie e punti luce strategici',
    imageUrl: '/placeholder.svg',
    createdAt: new Date('2024-08-20'),
    isActive: false,
  },
  {
    id: 'map_003',
    name: 'Torneo Regionale 2024',
    description: 'Layout ufficiale per il torneo regionale con simmetria perfetta',
    imageUrl: '/placeholder.svg',
    createdAt: new Date('2024-11-01'),
    isActive: false,
  },
];

export const FieldMapsManager: React.FC<FieldMapsManagerProps> = ({
  fieldId,
  fieldName,
}) => {
  const navigate = useNavigate();
  const [maps, setMaps] = useState<FieldMap[]>(MOCK_MAPS);
  const [addMapDialogOpen, setAddMapDialogOpen] = useState(false);
  const [editorDialogOpen, setEditorDialogOpen] = useState(false);
  const [editingMap, setEditingMap] = useState<FieldMap | null>(null);
  const [newMap, setNewMap] = useState({ name: '', description: '' });

  const handleOpenBuilder = (map?: FieldMap) => {
    // Naviga alla pagina editor fullscreen
    if (map) {
      navigate(`/field-manager/fields/${fieldId}/map-editor/${map.id}`);
    } else {
      navigate(`/field-manager/fields/${fieldId}/map-editor`);
    }
  };

  const handleSetActive = (mapId: string) => {
    setMaps(maps.map(m => ({
      ...m,
      isActive: m.id === mapId,
    })));
    toast.success('Mappa attivata');
  };

  const handleDeleteMap = (mapId: string) => {
    setMaps(maps.filter(m => m.id !== mapId));
    toast.success('Mappa eliminata');
  };

  const handleAddMap = () => {
    if (!newMap.name.trim()) {
      toast.error('Inserisci un nome per la mappa');
      return;
    }

    const map: FieldMap = {
      id: `map_${Date.now()}`,
      name: newMap.name,
      description: newMap.description,
      imageUrl: '/placeholder.svg',
      createdAt: new Date(),
      isActive: false,
    };

    setMaps([...maps, map]);
    setAddMapDialogOpen(false);
    setNewMap({ name: '', description: '' });
    toast.success('Mappa aggiunta', {
      description: 'Usa il builder per configurare il layout',
    });
  };

  const handleExportMap = (map: FieldMap) => {
    toast.success(`Export: ${map.name}`, {
      description: 'Download JSON in corso...',
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display uppercase tracking-wider">Mappe Campo</h3>
          <p className="text-sm text-muted-foreground">{maps.length} configurazioni</p>
        </div>
        <div className="flex gap-2">
          <GlowButton variant="secondary" onClick={() => setAddMapDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuova Mappa
          </GlowButton>
          <GlowButton variant="primary" onClick={() => handleOpenBuilder()}>
            <Maximize2 className="h-4 w-4 mr-2" />
            Editor Mappe
          </GlowButton>
        </div>
      </div>

      {/* Maps Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {maps.map((map) => (
          <TacticalCard key={map.id} className={cn(map.isActive && 'border-primary')}>
            <TacticalCardContent className="p-0">
              {/* Map Preview */}
              <div className="relative aspect-video bg-muted/50">
                <img
                  src={map.imageUrl}
                  alt={map.name}
                  className="w-full h-full object-cover"
                />
                {map.isActive && (
                  <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                    Attiva
                  </Badge>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-sm hover:bg-background">
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleOpenBuilder(map)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Modifica
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast.info('Anteprima mappa')}>
                      <Eye className="h-4 w-4 mr-2" />
                      Anteprima
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExportMap(map)}>
                      <Download className="h-4 w-4 mr-2" />
                      Esporta JSON
                    </DropdownMenuItem>
                    {!map.isActive && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleSetActive(map.id)}>
                          <Map className="h-4 w-4 mr-2" />
                          Imposta come Attiva
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteMap(map.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Elimina
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Map Info */}
              <div className="p-4">
                <h4 className="font-display text-sm uppercase">{map.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {map.description}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Creata: {map.createdAt.toLocaleDateString('it-IT')}
                </p>
              </div>
            </TacticalCardContent>
          </TacticalCard>
        ))}
      </div>

      {/* Empty State */}
      {maps.length === 0 && (
        <TacticalCard>
          <TacticalCardContent className="p-8 text-center">
            <Map className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display uppercase mb-2">Nessuna Mappa</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Crea la prima configurazione del tuo campo
            </p>
            <GlowButton variant="primary" onClick={handleOpenBuilder}>
              <Plus className="h-4 w-4 mr-2" />
              Crea con Builder
            </GlowButton>
          </TacticalCardContent>
        </TacticalCard>
      )}

      {/* Add Map Dialog */}
      <Dialog open={addMapDialogOpen} onOpenChange={setAddMapDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              Nuova Mappa
            </DialogTitle>
            <DialogDescription>
              Crea una nuova configurazione per {fieldName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="font-display uppercase text-xs">Nome Mappa *</Label>
              <Input
                value={newMap.name}
                onChange={(e) => setNewMap({ ...newMap, name: e.target.value })}
                placeholder="es. Configurazione Invernale"
                className="bg-muted border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-display uppercase text-xs">Descrizione</Label>
              <Textarea
                value={newMap.description}
                onChange={(e) => setNewMap({ ...newMap, description: e.target.value })}
                placeholder="Descrivi questa configurazione..."
                className="bg-muted border-border resize-none"
                rows={3}
              />
            </div>

            <div className="p-3 bg-muted/30 rounded-sm border border-border">
              <p className="text-xs text-muted-foreground">
                💡 Dopo aver creato la mappa, usa l'<strong>Editor Mappe</strong> per configurare
                spawn points, coperture, zone e obiettivi.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <GlowButton variant="ghost" onClick={() => setAddMapDialogOpen(false)}>
              Annulla
            </GlowButton>
            <GlowButton variant="primary" onClick={handleAddMap}>
              Crea Mappa
            </GlowButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Map Editor Dialog rimosso: ora la navigazione è su pagina dedicata */}
    </div>
  );
};
