import React, { useState } from 'react';
import { 
  Bell, X, Clock, Calendar, Tag, DollarSign, 
  MapPin, ShoppingBag, Package 
} from 'lucide-react';
import { AlertCategory, AlertConditions, AlertFrequency } from '@/types';
import { useAlertStore } from '@/stores/alertStore';
import { ALERT_CATEGORY_CONFIG, ALERT_FREQUENCY_CONFIG } from '@/mocks/alerts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface AlertSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: 'field' | 'shop' | 'product';
  entityId: string;
  entityName: string;
  defaultCategory?: AlertCategory;
}

const DAYS_OF_WEEK = [
  { value: 0, label: 'Dom' },
  { value: 1, label: 'Lun' },
  { value: 2, label: 'Mar' },
  { value: 3, label: 'Mer' },
  { value: 4, label: 'Gio' },
  { value: 5, label: 'Ven' },
  { value: 6, label: 'Sab' },
];

const TIME_SLOTS = [
  { value: 'morning', label: 'Mattina (9-12)' },
  { value: 'afternoon', label: 'Pomeriggio (14-18)' },
  { value: 'evening', label: 'Sera (18-22)' },
];

export const AlertSettingsModal: React.FC<AlertSettingsModalProps> = ({
  isOpen,
  onClose,
  entityType,
  entityId,
  entityName,
  defaultCategory,
}) => {
  const { addAlert, getAlertForEntity, updateAlert, deleteAlert } = useAlertStore();
  const existingAlert = getAlertForEntity(entityType, entityId);

  // Determine available categories based on entity type
  const availableCategories: AlertCategory[] = entityType === 'field'
    ? ['field_availability', 'field_event']
    : entityType === 'shop'
    ? ['shop_discount', 'shop_new_product']
    : ['price_drop'];

  const [category, setCategory] = useState<AlertCategory>(
    existingAlert?.category || defaultCategory || availableCategories[0]
  );
  const [frequency, setFrequency] = useState<AlertFrequency>(
    existingAlert?.frequency || 'instant'
  );
  const [conditions, setConditions] = useState<AlertConditions>(
    existingAlert?.conditions || {}
  );

  const handleSave = () => {
    if (existingAlert) {
      updateAlert(existingAlert.id, {
        category,
        frequency,
        conditions,
        isActive: true,
      });
      toast({
        title: 'Alert Aggiornato',
        description: `Le impostazioni per ${entityName} sono state salvate`,
      });
    } else {
      addAlert({
        userId: 'current_user',
        category,
        entityType,
        entityId,
        entityName,
        conditions,
        frequency,
        isActive: true,
      });
      toast({
        title: 'Alert Creato!',
        description: `Riceverai notifiche per ${entityName}`,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (existingAlert) {
      deleteAlert(existingAlert.id);
      toast({
        title: 'Alert Eliminato',
        description: `Alert per ${entityName} rimosso`,
      });
    }
    onClose();
  };

  const toggleDay = (day: number) => {
    const currentDays = conditions.dayOfWeek || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    setConditions({ ...conditions, dayOfWeek: newDays });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Impostazioni Alert
          </DialogTitle>
          <DialogDescription>
            Configura le notifiche per <strong>{entityName}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Category Selection */}
          {availableCategories.length > 1 && (
            <div className="space-y-2">
              <Label>Tipo di Alert</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableCategories.map((cat) => {
                  const config = ALERT_CATEGORY_CONFIG[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={cn(
                        'flex items-center gap-2 p-3 rounded-lg border text-left transition-colors',
                        category === cat
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:bg-muted'
                      )}
                    >
                      <span className="text-xl">{config.icon}</span>
                      <div>
                        <p className="text-sm font-medium">{config.label}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Frequency Selection */}
          <div className="space-y-2">
            <Label>Frequenza Notifiche</Label>
            <RadioGroup
              value={frequency}
              onValueChange={(v) => setFrequency(v as AlertFrequency)}
              className="grid grid-cols-3 gap-2"
            >
              {Object.entries(ALERT_FREQUENCY_CONFIG).map(([value, config]) => (
                <div key={value}>
                  <RadioGroupItem
                    value={value}
                    id={`freq-${value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`freq-${value}`}
                    className={cn(
                      'flex flex-col items-center justify-center rounded-lg border-2 p-3 cursor-pointer transition-colors',
                      frequency === value
                        ? 'border-primary bg-primary/10'
                        : 'border-muted hover:bg-muted'
                    )}
                  >
                    <span className="text-sm font-medium">{config.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Conditional Options based on category */}
          {(category === 'field_availability' || category === 'field_event') && (
            <>
              {/* Days of Week */}
              <div className="space-y-2">
                <Label>Giorni della Settimana</Label>
                <div className="flex gap-1">
                  {DAYS_OF_WEEK.map((day) => (
                    <button
                      key={day.value}
                      onClick={() => toggleDay(day.value)}
                      className={cn(
                        'w-10 h-10 rounded-lg text-xs font-medium transition-colors',
                        (conditions.dayOfWeek || []).includes(day.value)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      )}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot */}
              <div className="space-y-2">
                <Label>Fascia Oraria</Label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.value}
                      onClick={() => setConditions({ 
                        ...conditions, 
                        timeSlot: conditions.timeSlot === slot.value ? undefined : slot.value as any 
                      })}
                      className={cn(
                        'p-2 rounded-lg text-xs font-medium border transition-colors',
                        conditions.timeSlot === slot.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:bg-muted'
                      )}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {(category === 'shop_discount' || category === 'price_drop') && (
            <div className="space-y-2">
              <Label>
                {category === 'shop_discount' ? 'Sconto Minimo (%)' : 'Prezzo Massimo (€)'}
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[category === 'shop_discount' 
                    ? (conditions.discountPercentage || 10) 
                    : (conditions.maxPrice || 100)
                  ]}
                  min={category === 'shop_discount' ? 5 : 10}
                  max={category === 'shop_discount' ? 50 : 500}
                  step={category === 'shop_discount' ? 5 : 10}
                  onValueChange={([v]) => setConditions({
                    ...conditions,
                    ...(category === 'shop_discount' 
                      ? { discountPercentage: v }
                      : { maxPrice: v }
                    ),
                  })}
                  className="flex-1"
                />
                <Badge variant="outline" className="min-w-[60px] justify-center">
                  {category === 'shop_discount' 
                    ? `${conditions.discountPercentage || 10}%`
                    : `€${conditions.maxPrice || 100}`
                  }
                </Badge>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {existingAlert && (
            <Button variant="destructive" onClick={handleDelete}>
              Elimina
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Annulla
          </Button>
          <Button onClick={handleSave}>
            {existingAlert ? 'Salva Modifiche' : 'Crea Alert'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertSettingsModal;