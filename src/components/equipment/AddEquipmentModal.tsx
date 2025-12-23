import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Radio, Headphones, Shield, Flashlight, Eye, Package } from 'lucide-react';
import type { EquipmentType, EquipmentStatus } from '@/stores/equipmentStore';

const equipmentSchema = z.object({
  name: z.string().trim().min(1, 'Nome obbligatorio').max(100, 'Nome troppo lungo'),
  type: z.enum(['radio', 'optics', 'protection', 'lighting', 'accessory']),
  description: z.string().trim().max(500, 'Descrizione troppo lunga').optional(),
  notes: z.string().trim().max(200, 'Note troppo lunghe').optional(),
  battery: z.number().min(0).max(100),
  isConnected: z.boolean(),
  status: z.enum(['active', 'inactive', 'charging', 'error']),
  iconType: z.string(),
});

type FormData = z.infer<typeof equipmentSchema>;

interface AddEquipmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (equipment: {
    name: string;
    type: EquipmentType;
    status: EquipmentStatus;
    battery: number;
    isConnected: boolean;
    iconType: string;
    description: string;
    notes?: string;
  }) => void;
}

const typeOptions: { value: EquipmentType; label: string; icon: React.ElementType }[] = [
  { value: 'radio', label: 'Radio', icon: Radio },
  { value: 'optics', label: 'Ottiche', icon: Eye },
  { value: 'protection', label: 'Protezione', icon: Shield },
  { value: 'lighting', label: 'Illuminazione', icon: Flashlight },
  { value: 'accessory', label: 'Accessorio', icon: Package },
];

const iconOptions = [
  { value: 'Radio', label: 'Radio', icon: Radio },
  { value: 'Headphones', label: 'Cuffie', icon: Headphones },
  { value: 'Eye', label: 'Ottica', icon: Eye },
  { value: 'Shield', label: 'Scudo', icon: Shield },
  { value: 'Flashlight', label: 'Torcia', icon: Flashlight },
];

export const AddEquipmentModal: React.FC<AddEquipmentModalProps> = ({
  open,
  onOpenChange,
  onAdd,
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: '',
      type: 'accessory',
      description: '',
      notes: '',
      battery: 100,
      isConnected: false,
      status: 'inactive',
      iconType: 'Radio',
    },
  });

  const handleSubmit = (data: FormData) => {
    onAdd({
      name: data.name,
      type: data.type,
      status: data.status,
      battery: data.battery,
      isConnected: data.isConnected,
      iconType: data.iconType,
      description: data.description || '',
      notes: data.notes,
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display uppercase">Nuovo Equipaggiamento</DialogTitle>
          <DialogDescription>
            Aggiungi un nuovo equipaggiamento alla tua lista
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome *</FormLabel>
                  <FormControl>
                    <Input placeholder="Es. Radio Baofeng UV-5R" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {typeOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <div className="flex items-center gap-2">
                              <opt.icon className="h-4 w-4" />
                              {opt.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="iconType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icona</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona icona" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {iconOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <div className="flex items-center gap-2">
                              <opt.icon className="h-4 w-4" />
                              {opt.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrizione</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descrizione dell'equipaggiamento..."
                      className="resize-none"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="battery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batteria: {field.value}%</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={5}
                      value={[field.value]}
                      onValueChange={([val]) => field.onChange(val)}
                      className="py-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stato iniziale</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Stato" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Attivo</SelectItem>
                        <SelectItem value="inactive">Spento</SelectItem>
                        <SelectItem value="charging">In carica</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isConnected"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Connesso</FormLabel>
                    <FormControl>
                      <div className="flex items-center h-10">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input placeholder="Note aggiuntive..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annulla
              </Button>
              <Button type="submit">Aggiungi</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
