import React, { useState } from 'react';
import { Edit2, Save, Image, Users, Shield, Lock } from 'lucide-react';
import {
  TacticalCard,
  TacticalCardHeader,
  TacticalCardTitle,
  TacticalCardContent,
} from '@/components/ui/TacticalCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { GlowButton } from '@/components/ui/GlowButton';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RoleGate } from '@/components/auth/RoleGate';
import { IMockTeam } from '@/mocks/teams';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TeamSettingsFormProps {
  team: IMockTeam;
  onSave?: (data: TeamFormData) => void;
}

interface TeamFormData {
  name: string;
  tag: string;
  description: string;
  color: string;
  isRecruiting: boolean;
  maxMembers: number;
  minTierRequired: string;
  minEloRequired: number;
}

const TEAM_COLORS = [
  { value: '#6366f1', label: 'Indaco' },
  { value: '#ef4444', label: 'Rosso' },
  { value: '#22c55e', label: 'Verde' },
  { value: '#f59e0b', label: 'Ambra' },
  { value: '#06b6d4', label: 'Ciano' },
  { value: '#8b5cf6', label: 'Viola' },
  { value: '#ec4899', label: 'Rosa' },
  { value: '#64748b', label: 'Grigio' },
];

const TIER_OPTIONS = [
  { value: 'none', label: 'Nessun requisito' },
  { value: 'bronze', label: 'Bronze' },
  { value: 'silver', label: 'Silver' },
  { value: 'gold', label: 'Gold' },
  { value: 'platinum', label: 'Platinum' },
  { value: 'diamond', label: 'Diamond' },
];

export const TeamSettingsForm: React.FC<TeamSettingsFormProps> = ({
  team,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TeamFormData>({
    name: team.name,
    tag: team.tag,
    description: team.description,
    color: team.color,
    isRecruiting: team.isRecruiting,
    maxMembers: team.maxMembers,
    minTierRequired: 'none',
    minEloRequired: 0,
  });

  const handleSave = () => {
    if (!formData.name.trim() || !formData.tag.trim()) {
      toast.error('Nome e Tag sono obbligatori');
      return;
    }

    if (formData.tag.length > 5) {
      toast.error('Il Tag può avere massimo 5 caratteri');
      return;
    }

    if (onSave) {
      onSave(formData);
    }

    toast.success('Impostazioni team salvate!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: team.name,
      tag: team.tag,
      description: team.description,
      color: team.color,
      isRecruiting: team.isRecruiting,
      maxMembers: team.maxMembers,
      minTierRequired: 'none',
      minEloRequired: 0,
    });
    setIsEditing(false);
  };

  return (
    <RoleGate
      roles={['team_leader', 'admin']}
      fallback={
        <TacticalCard>
          <TacticalCardHeader>
            <TacticalCardTitle className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              Impostazioni Team
            </TacticalCardTitle>
          </TacticalCardHeader>
          <TacticalCardContent className="text-center py-8">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Solo il capitano può modificare le impostazioni del team
            </p>
          </TacticalCardContent>
        </TacticalCard>
      }
    >
      <TacticalCard>
        <TacticalCardHeader className="flex flex-row items-center justify-between">
          <TacticalCardTitle className="flex items-center gap-2">
            <Edit2 className="h-4 w-4" />
            Impostazioni Team
          </TacticalCardTitle>
          {!isEditing && (
            <GlowButton variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Modifica
            </GlowButton>
          )}
        </TacticalCardHeader>
        <TacticalCardContent className="space-y-4">
          {/* Nome e Tag */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <Label className="font-display uppercase text-xs">Nome Team</Label>
              {isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nome del team"
                  className="bg-muted border-border"
                  maxLength={30}
                />
              ) : (
                <p className="font-medium py-2">{formData.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="font-display uppercase text-xs">Tag</Label>
              {isEditing ? (
                <Input
                  value={formData.tag}
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value.toUpperCase() })
                  }
                  placeholder="TAG"
                  className="bg-muted border-border font-mono"
                  maxLength={5}
                />
              ) : (
                <p className="font-mono py-2">[{formData.tag}]</p>
              )}
            </div>
          </div>

          {/* Descrizione */}
          <div className="space-y-2">
            <Label className="font-display uppercase text-xs">Descrizione</Label>
            {isEditing ? (
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Descrivi il tuo team..."
                className="bg-muted border-border resize-none"
                rows={3}
                maxLength={300}
              />
            ) : (
              <p className="text-sm text-muted-foreground py-2">
                {formData.description || 'Nessuna descrizione'}
              </p>
            )}
          </div>

          {/* Colore Team */}
          <div className="space-y-2">
            <Label className="font-display uppercase text-xs">Colore Team</Label>
            {isEditing ? (
              <div className="flex gap-2 flex-wrap">
                {TEAM_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setFormData({ ...formData, color: color.value })}
                    className={cn(
                      'h-8 w-8 rounded-full border-2 transition-all',
                      formData.color === color.value
                        ? 'border-foreground scale-110'
                        : 'border-transparent hover:border-muted-foreground'
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.label}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div
                  className="h-6 w-6 rounded-full"
                  style={{ backgroundColor: formData.color }}
                />
                <span className="text-sm">
                  {TEAM_COLORS.find((c) => c.value === formData.color)?.label}
                </span>
              </div>
            )}
          </div>

          {/* Reclutamento */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-sm border border-border">
            <div>
              <Label className="font-display uppercase text-xs">Reclutamento Aperto</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Permetti ai giocatori di richiedere di unirsi al team
              </p>
            </div>
            <Switch
              checked={formData.isRecruiting}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isRecruiting: checked })
              }
              disabled={!isEditing}
            />
          </div>

          {/* Requisiti Reclutamento */}
          {formData.isRecruiting && (
            <div className="space-y-4 p-3 bg-muted/30 rounded-sm border border-border">
              <Label className="font-display uppercase text-xs flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Requisiti Minimi
              </Label>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Tier Minimo</Label>
                  <Select
                    value={formData.minTierRequired}
                    onValueChange={(value) =>
                      setFormData({ ...formData, minTierRequired: value })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIER_OPTIONS.map((tier) => (
                        <SelectItem key={tier.value} value={tier.value}>
                          {tier.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Elo Minimo</Label>
                  <Input
                    type="number"
                    value={formData.minEloRequired}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        minEloRequired: parseInt(e.target.value) || 0,
                      })
                    }
                    min={0}
                    max={3000}
                    step={50}
                    disabled={!isEditing}
                    className="bg-background"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Max Membri */}
          <div className="space-y-2">
            <Label className="font-display uppercase text-xs flex items-center gap-1">
              <Users className="h-3 w-3" />
              Massimo Membri
            </Label>
            {isEditing ? (
              <Select
                value={formData.maxMembers.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, maxMembers: parseInt(value) })
                }
              >
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[4, 6, 8, 10, 12, 16, 20].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} membri
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="py-2">{formData.maxMembers} membri</p>
            )}
          </div>

          {/* Azioni */}
          {isEditing && (
            <div className="flex gap-2 pt-4">
              <GlowButton variant="ghost" className="flex-1" onClick={handleCancel}>
                Annulla
              </GlowButton>
              <GlowButton variant="primary" className="flex-1" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salva Modifiche
              </GlowButton>
            </div>
          )}
        </TacticalCardContent>
      </TacticalCard>
    </RoleGate>
  );
};
