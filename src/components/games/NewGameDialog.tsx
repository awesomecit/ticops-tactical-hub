import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Users, Target, Plus, Shield } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { MOCK_FIELDS } from '@/mocks/fields';
import { MOCK_TEAMS } from '@/mocks/teams';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

interface NewGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GAME_MODES = [
  { id: 'domination', name: 'Domination', icon: '🎯' },
  { id: 'tdm', name: 'Team Deathmatch', icon: '⚔️' },
  { id: 'snd', name: 'Search & Destroy', icon: '💣' },
  { id: 'ctf', name: 'Capture the Flag', icon: '🚩' },
  { id: 'ffa', name: 'Free for All', icon: '👤' },
];

export const NewGameDialog: React.FC<NewGameDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    date: '',
    time: '',
    locationId: '',
    gameMode: '',
    maxPlayers: '20',
    isTeamMatch: false,
    challengeTeamId: '',
  });

  const isTeamLeader = user?.role === 'team_leader' || user?.role === 'admin';
  const userTeam = MOCK_TEAMS.find((t) => t.id === user?.team?.id);

  // Get opponent teams (not user's team)
  const opponentTeams = MOCK_TEAMS.filter((t) => t.id !== user?.team?.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.date || !formData.locationId || !formData.gameMode) {
      toast.error(t('games.fillRequired'));
      return;
    }

    if (formData.isTeamMatch && !formData.challengeTeamId) {
      toast.error('Seleziona un team avversario');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (formData.isTeamMatch) {
      const opponent = MOCK_TEAMS.find((t) => t.id === formData.challengeTeamId);
      toast.success('Sfida inviata!', {
        description: `Sfida a ${opponent?.name} per ${formData.name}`,
      });
    } else {
      toast.success(t('games.createSuccess'), {
        description: formData.name,
      });
    }
    
    setIsSubmitting(false);
    onOpenChange(false);
    setFormData({
      name: '',
      description: '',
      date: '',
      time: '',
      locationId: '',
      gameMode: '',
      maxPlayers: '20',
      isTeamMatch: false,
      challengeTeamId: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            {t('games.newGame')}
          </DialogTitle>
          <DialogDescription>
            {t('games.newGameDescription')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Team Match Toggle - Only for Team Leaders */}
          <RoleGate roles={['team_leader', 'admin']}>
            {userTeam && (
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-sm border border-primary/30">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <div>
                    <Label className="font-display uppercase text-xs">
                      Partita di Team
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Crea una partita per [{userTeam.tag}] {userTeam.name}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={formData.isTeamMatch}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isTeamMatch: checked, challengeTeamId: '' })
                  }
                />
              </div>
            )}
          </RoleGate>

          {/* Challenge Team Selection - Only when Team Match is enabled */}
          {formData.isTeamMatch && (
            <div className="space-y-2">
              <Label className="font-display uppercase text-xs flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Sfida Team *
              </Label>
              <Select
                value={formData.challengeTeamId}
                onValueChange={(value) =>
                  setFormData({ ...formData, challengeTeamId: value })
                }
              >
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue placeholder="Seleziona team avversario" />
                </SelectTrigger>
                <SelectContent>
                  {opponentTeams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      <span className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: team.color }}
                        />
                        [{team.tag}] {team.name}
                        <span className="text-muted-foreground text-xs">
                          (Rank #{team.rank})
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="font-display uppercase text-xs">
              {t('games.gameName')} *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t('games.gameNamePlaceholder')}
              className="bg-muted border-border"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="font-display uppercase text-xs">
              {t('games.description')}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t('games.descriptionPlaceholder')}
              className="bg-muted border-border resize-none"
              rows={3}
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="font-display uppercase text-xs flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {t('games.date')} *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-muted border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="font-display uppercase text-xs">
                {t('games.time')} *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="bg-muted border-border"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="font-display uppercase text-xs flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {t('games.location')} *
            </Label>
            <Select
              value={formData.locationId}
              onValueChange={(value) => setFormData({ ...formData, locationId: value })}
            >
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder={t('games.selectLocation')} />
              </SelectTrigger>
              <SelectContent>
                {MOCK_FIELDS.slice(0, 5).map((field) => (
                  <SelectItem key={field.id} value={field.id}>
                    {field.name} - {field.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Game Mode */}
          <div className="space-y-2">
            <Label className="font-display uppercase text-xs flex items-center gap-1">
              <Target className="h-3 w-3" />
              {t('games.gameMode')} *
            </Label>
            <Select
              value={formData.gameMode}
              onValueChange={(value) => setFormData({ ...formData, gameMode: value })}
            >
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder={t('games.selectGameMode')} />
              </SelectTrigger>
              <SelectContent>
                {GAME_MODES.map((mode) => (
                  <SelectItem key={mode.id} value={mode.id}>
                    <span className="flex items-center gap-2">
                      <span>{mode.icon}</span>
                      {mode.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Max Players - Only for non-team matches */}
          {!formData.isTeamMatch && (
            <div className="space-y-2">
              <Label htmlFor="maxPlayers" className="font-display uppercase text-xs flex items-center gap-1">
                <Users className="h-3 w-3" />
                {t('games.maxPlayers')}
              </Label>
              <Input
                id="maxPlayers"
                type="number"
                min="4"
                max="100"
                value={formData.maxPlayers}
                onChange={(e) => setFormData({ ...formData, maxPlayers: e.target.value })}
                className="bg-muted border-border"
              />
            </div>
          )}

          <DialogFooter className="gap-2 pt-4">
            <GlowButton type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {t('common.cancel')}
            </GlowButton>
            <GlowButton type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting
                ? t('common.loading')
                : formData.isTeamMatch
                ? 'Invia Sfida'
                : t('games.createGame')}
            </GlowButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
