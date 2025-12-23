import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Save } from 'lucide-react';
import { SocialContact, SocialPlatform } from '@/types/social';
import { SocialIcon } from './SocialIcon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TacticalCard,
  TacticalCardHeader,
  TacticalCardTitle,
  TacticalCardContent,
} from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const socialContactSchema = z.object({
  platform: z.enum(['discord', 'instagram', 'telegram', 'whatsapp']),
  handle: z.string()
    .trim()
    .min(1, 'Handle richiesto')
    .max(100, 'Handle troppo lungo')
    .refine(
      (val) => /^[a-zA-Z0-9_@+#.\-]+$/.test(val),
      'Caratteri non validi. Usa solo lettere, numeri e _ @ + # . -'
    ),
});

type SocialContactFormData = z.infer<typeof socialContactSchema>;

interface SocialContactsFormProps {
  contacts: SocialContact[];
  onSave: (contacts: SocialContact[]) => void;
  entityType: 'user' | 'team' | 'field';
  className?: string;
}

const platformOptions: { value: SocialPlatform; label: string }[] = [
  { value: 'discord', label: 'Discord' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'whatsapp', label: 'WhatsApp' },
];

const platformPlaceholders: Record<SocialPlatform, string> = {
  discord: 'username#1234 o server invite',
  instagram: 'username (senza @)',
  telegram: 'username o numero',
  whatsapp: '+39 123 456 7890',
};

export const SocialContactsForm: React.FC<SocialContactsFormProps> = ({
  contacts: initialContacts,
  onSave,
  entityType,
  className,
}) => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<SocialContact[]>(initialContacts);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('discord');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SocialContactFormData>({
    resolver: zodResolver(socialContactSchema),
    defaultValues: {
      platform: 'discord',
      handle: '',
    },
  });

  const currentPlatform = watch('platform');

  const handleAddContact = (data: SocialContactFormData) => {
    // Check if platform already exists
    if (contacts.some(c => c.platform === data.platform)) {
      toast({
        title: 'Errore',
        description: `Hai già aggiunto un contatto ${platformOptions.find(p => p.value === data.platform)?.label}`,
        variant: 'destructive',
      });
      return;
    }

    const newContact: SocialContact = {
      platform: data.platform,
      handle: data.handle.trim(),
    };

    setContacts([...contacts, newContact]);
    reset({ platform: 'discord', handle: '' });
    setIsAdding(false);
    
    toast({
      title: 'Contatto Aggiunto',
      description: `${platformOptions.find(p => p.value === data.platform)?.label} aggiunto con successo`,
    });
  };

  const handleRemoveContact = (platform: SocialPlatform) => {
    setContacts(contacts.filter(c => c.platform !== platform));
    toast({
      title: 'Contatto Rimosso',
      description: 'Il contatto social è stato rimosso',
    });
  };

  const handleSaveAll = () => {
    onSave(contacts);
    toast({
      title: 'Salvato',
      description: 'I contatti social sono stati aggiornati',
    });
  };

  const availablePlatforms = platformOptions.filter(
    p => !contacts.some(c => c.platform === p.value)
  );

  return (
    <TacticalCard className={className}>
      <TacticalCardHeader>
        <TacticalCardTitle>Contatti Social</TacticalCardTitle>
      </TacticalCardHeader>
      <TacticalCardContent className="space-y-4">
        {/* Existing Contacts */}
        {contacts.length > 0 ? (
          <div className="space-y-2">
            {contacts.map((contact) => (
              <div
                key={contact.platform}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-sm border border-border"
              >
                <div className="flex items-center gap-3">
                  <SocialIcon platform={contact.platform} className="h-5 w-5" />
                  <div>
                    <p className="font-medium text-sm">
                      {platformOptions.find(p => p.value === contact.platform)?.label}
                    </p>
                    <p className="text-xs text-muted-foreground">@{contact.handle}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveContact(contact.platform)}
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nessun contatto social configurato
          </p>
        )}

        {/* Add New Contact Form */}
        {isAdding && availablePlatforms.length > 0 ? (
          <form onSubmit={handleSubmit(handleAddContact)} className="space-y-3 p-3 bg-primary/5 rounded-sm border border-primary/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="platform" className="text-xs">Piattaforma</Label>
                <Select
                  value={currentPlatform}
                  onValueChange={(value) => setValue('platform', value as SocialPlatform)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona piattaforma" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePlatforms.map((platform) => (
                      <SelectItem key={platform.value} value={platform.value}>
                        <div className="flex items-center gap-2">
                          <SocialIcon platform={platform.value} className="h-4 w-4" />
                          {platform.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="handle" className="text-xs">Username / Handle</Label>
                <Input
                  {...register('handle')}
                  placeholder={platformPlaceholders[currentPlatform]}
                  className={cn(errors.handle && 'border-destructive')}
                />
                {errors.handle && (
                  <p className="text-xs text-destructive">{errors.handle.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAdding(false);
                  reset();
                }}
              >
                Annulla
              </Button>
              <Button type="submit" size="sm">
                Aggiungi
              </Button>
            </div>
          </form>
        ) : (
          availablePlatforms.length > 0 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsAdding(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Aggiungi Contatto Social
            </Button>
          )
        )}

        {availablePlatforms.length === 0 && !isAdding && (
          <p className="text-xs text-muted-foreground text-center">
            Hai aggiunto tutti i contatti social disponibili
          </p>
        )}

        {/* Save Button */}
        {contacts.length > 0 && (
          <GlowButton
            variant="primary"
            className="w-full"
            onClick={handleSaveAll}
          >
            <Save className="h-4 w-4 mr-2" />
            Salva Contatti
          </GlowButton>
        )}
      </TacticalCardContent>
    </TacticalCard>
  );
};
