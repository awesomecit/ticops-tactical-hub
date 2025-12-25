import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  X,
  AlertTriangle,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';

interface TimeSlot {
  id: string;
  time: string;
  status: 'available' | 'booked' | 'blocked';
  eventName?: string;
  teamName?: string;
  players?: number;
}

interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

interface FieldCalendarViewProps {
  fieldId: string;
  fieldName: string;
}

// Mock time slots
const generateMockSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const times = ['09:00', '11:00', '14:00', '16:00', '18:00', '20:00'];
  
  times.forEach((time, idx) => {
    const rand = Math.random();
    let status: TimeSlot['status'] = 'available';
    let eventName, teamName, players;
    
    if (rand > 0.7) {
      status = 'booked';
      eventName = ['Partita Amichevole', 'Torneo Regionale', 'Allenamento Team'][Math.floor(Math.random() * 3)];
      teamName = ['Alpha Squad', 'Shadow Wolves', 'Delta Force'][Math.floor(Math.random() * 3)];
      players = Math.floor(Math.random() * 20) + 10;
    } else if (rand > 0.6) {
      status = 'blocked';
    }
    
    slots.push({
      id: `${format(date, 'yyyy-MM-dd')}-${time}`,
      time,
      status,
      eventName,
      teamName,
      players,
    });
  });
  
  return slots;
};

export const FieldCalendarView: React.FC<FieldCalendarViewProps> = ({
  fieldId,
  fieldName,
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedEvent, setSelectedEvent] = useState<TimeSlot | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  // Generate week days
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  
  // Generate schedule for each day
  const weekSchedule: DaySchedule[] = weekDays.map(date => ({
    date,
    slots: generateMockSlots(date),
  }));

  const handlePrevWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const handleCancelEvent = () => {
    if (!cancelReason.trim()) {
      toast.error('Inserisci un motivo per la cancellazione');
      return;
    }

    toast.success('Evento cancellato', {
      description: `Notifica inviata a ${selectedEvent?.teamName}`,
    });
    
    setCancelDialogOpen(false);
    setCancelReason('');
    setSelectedEvent(null);
  };

  const handleOpenEventChat = (slot: TimeSlot) => {
    toast.info(`Chat evento: ${slot.eventName}`, {
      description: 'Apertura chat automatica evento...',
    });
  };

  const getSlotStyle = (status: TimeSlot['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20';
      case 'booked':
        return 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20';
      case 'blocked':
        return 'bg-muted/30 border-muted text-muted-foreground';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display uppercase tracking-wider">{fieldName}</h3>
          <p className="text-sm text-muted-foreground">
            {format(currentWeekStart, "d MMMM", { locale: it })} - {format(addDays(currentWeekStart, 6), "d MMMM yyyy", { locale: it })}
          </p>
        </div>
        <div className="flex gap-2">
          <GlowButton variant="secondary" size="sm" onClick={handlePrevWeek}>
            <ChevronLeft className="h-4 w-4" />
          </GlowButton>
          <GlowButton variant="secondary" size="sm" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </GlowButton>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Days Header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day) => (
              <div
                key={day.toISOString()}
                className={cn(
                  'text-center p-2 rounded-sm',
                  isSameDay(day, new Date()) && 'bg-primary/10 border border-primary/30'
                )}
              >
                <p className="text-xs text-muted-foreground">
                  {format(day, 'EEE', { locale: it })}
                </p>
                <p className="font-display text-lg">{format(day, 'd')}</p>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="grid grid-cols-7 gap-2">
            {weekSchedule.map((day) => (
              <div key={day.date.toISOString()} className="space-y-1">
                {day.slots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => {
                      if (slot.status === 'booked') {
                        setSelectedEvent(slot);
                      }
                    }}
                    disabled={slot.status === 'blocked'}
                    className={cn(
                      'w-full p-2 rounded-sm border text-xs transition-all',
                      getSlotStyle(slot.status),
                      slot.status === 'blocked' && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    <p className="font-mono">{slot.time}</p>
                    {slot.status === 'booked' && (
                      <p className="truncate text-[10px] mt-1">{slot.teamName}</p>
                    )}
                    {slot.status === 'available' && (
                      <p className="text-[10px] mt-1">Libero</p>
                    )}
                    {slot.status === 'blocked' && (
                      <p className="text-[10px] mt-1">Bloccato</p>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-green-500/20 border border-green-500/30" />
          <span className="text-muted-foreground">Disponibile</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-primary/20 border border-primary/30" />
          <span className="text-muted-foreground">Prenotato</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-muted/30 border border-muted" />
          <span className="text-muted-foreground">Bloccato</span>
        </div>
      </div>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent && !cancelDialogOpen} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Dettagli Evento
            </DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Evento</p>
                <p className="font-display uppercase">{selectedEvent.eventName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Team</p>
                  <p className="font-medium">{selectedEvent.teamName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Giocatori</p>
                  <p className="font-medium">{selectedEvent.players}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Orario</p>
                <p className="font-mono">{selectedEvent.time}</p>
              </div>

              <div className="flex gap-2 pt-4">
                <GlowButton
                  variant="secondary"
                  className="flex-1"
                  onClick={() => handleOpenEventChat(selectedEvent)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat Evento
                </GlowButton>
                <GlowButton
                  variant="outline"
                  className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
                  onClick={() => setCancelDialogOpen(true)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Annulla
                </GlowButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Event Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Annulla Evento
            </DialogTitle>
            <DialogDescription>
              Questa azione invierà una notifica automatica al team prenotato
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-sm">
              <p className="text-sm">
                <strong>Evento:</strong> {selectedEvent?.eventName}
              </p>
              <p className="text-sm">
                <strong>Team:</strong> {selectedEvent?.teamName}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Motivo cancellazione *</p>
              <Textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="es. Manutenzione straordinaria, maltempo previsto..."
                className="bg-muted border-border"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <GlowButton variant="ghost" onClick={() => setCancelDialogOpen(false)}>
              Indietro
            </GlowButton>
            <GlowButton
              variant="primary"
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleCancelEvent}
            >
              Conferma Cancellazione
            </GlowButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
