import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Equipment, EquipmentStatus, EquipmentType } from '@/stores/equipmentStore';
import { Battery, Save } from 'lucide-react';

interface EquipmentEditModalProps {
  equipment: Equipment | null;
  open: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Equipment>) => void;
}

export const EquipmentEditModal: React.FC<EquipmentEditModalProps> = ({
  equipment,
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = React.useState<Partial<Equipment>>({});

  React.useEffect(() => {
    if (equipment) {
      setFormData({
        name: equipment.name,
        description: equipment.description,
        type: equipment.type,
        status: equipment.status,
        battery: equipment.battery,
        notes: equipment.notes || '',
      });
    }
  }, [equipment]);

  if (!equipment) return null;

  const handleSave = () => {
    onSave(equipment.id, formData);
    onClose();
  };

  const statusOptions: { value: EquipmentStatus; label: string }[] = [
    { value: 'active', label: 'Attivo' },
    { value: 'inactive', label: 'Spento' },
    { value: 'charging', label: 'In carica' },
    { value: 'error', label: 'Errore' },
  ];

  const typeOptions: { value: EquipmentType; label: string }[] = [
    { value: 'radio', label: 'Radio' },
    { value: 'optics', label: 'Ottiche' },
    { value: 'lighting', label: 'Illuminazione' },
    { value: 'protection', label: 'Protezione' },
    { value: 'accessory', label: 'Accessorio' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display uppercase">
            Modifica Equipaggiamento
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nome equipaggiamento"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrizione</Label>
            <Input
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descrizione breve"
            />
          </div>

          {/* Type & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select
                value={formData.type}
                onValueChange={(value: EquipmentType) => 
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Stato</Label>
              <Select
                value={formData.status}
                onValueChange={(value: EquipmentStatus) => 
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Battery */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Battery className="h-4 w-4" />
              Batteria: {formData.battery}%
            </Label>
            <Slider
              value={[formData.battery || 0]}
              onValueChange={([value]) => setFormData({ ...formData, battery: value })}
              max={100}
              step={5}
              className="py-2"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Note personali</Label>
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Aggiungi note o promemoria..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annulla
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salva
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
