import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EquipmentPreferences } from '@/stores/equipmentStore';
import { Settings, RotateCcw } from 'lucide-react';

interface PreferencesModalProps {
  preferences: EquipmentPreferences;
  open: boolean;
  onClose: () => void;
  onSave: (preferences: Partial<EquipmentPreferences>) => void;
  onReset: () => void;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  preferences,
  open,
  onClose,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = React.useState<EquipmentPreferences>(preferences);

  React.useEffect(() => {
    setFormData(preferences);
  }, [preferences]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const tabOptions = [
    { value: 'all', label: 'Tutti' },
    { value: 'radio', label: 'Radio' },
    { value: 'optics', label: 'Ottiche' },
    { value: 'lighting', label: 'Illuminazione' },
    { value: 'protection', label: 'Protezione' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Nome' },
    { value: 'status', label: 'Stato' },
    { value: 'battery', label: 'Batteria' },
    { value: 'type', label: 'Tipo' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display uppercase flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Preferenze Equipaggiamento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Default Tab */}
          <div className="space-y-2">
            <Label>Tab predefinito</Label>
            <Select
              value={formData.defaultTab}
              onValueChange={(value) => 
                setFormData({ ...formData, defaultTab: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tabOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label>Ordina per</Label>
            <Select
              value={formData.sortBy}
              onValueChange={(value: 'name' | 'status' | 'battery' | 'type') => 
                setFormData({ ...formData, sortBy: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Avvisi batteria bassa</Label>
                <p className="text-xs text-muted-foreground">
                  Notifica quando la batteria scende sotto il 20%
                </p>
              </div>
              <Switch
                checked={formData.showLowBatteryAlerts}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, showLowBatteryAlerts: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-connetti radio</Label>
                <p className="text-xs text-muted-foreground">
                  Connetti automaticamente la radio all'avvio
                </p>
              </div>
              <Switch
                checked={formData.autoConnectRadio}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, autoConnectRadio: checked })
                }
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={onReset}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Ripristina
          </Button>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Annulla
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Salva
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
