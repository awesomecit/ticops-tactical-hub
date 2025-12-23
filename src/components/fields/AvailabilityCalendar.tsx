import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, Euro, Calendar as CalendarIcon } from 'lucide-react';
import { FieldAvailabilitySlot } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, addDays, startOfWeek, isSameDay, isToday, isBefore } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface AvailabilityCalendarProps {
  slots: FieldAvailabilitySlot[];
  onSlotSelect?: (slot: FieldAvailabilitySlot) => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  slots,
  onSlotSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getSlotsForDate = (date: Date) => {
    return slots.filter((slot) => isSameDay(new Date(slot.date), date));
  };

  const selectedDateSlots = getSlotsForDate(selectedDate);

  const prevWeek = () => setWeekStart(addDays(weekStart, -7));
  const nextWeek = () => setWeekStart(addDays(weekStart, 7));

  const getAvailabilityStatus = (date: Date) => {
    const daySlots = getSlotsForDate(date);
    if (daySlots.length === 0) return 'none';
    const available = daySlots.filter((s) => s.isAvailable).length;
    if (available === 0) return 'full';
    if (available === daySlots.length) return 'available';
    return 'partial';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarIcon className="h-5 w-5" />
            Disponibilità
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={prevWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[140px] text-center">
              {format(weekStart, 'MMM yyyy', { locale: it })}
            </span>
            <Button variant="ghost" size="icon" onClick={nextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Week Days */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => {
            const status = getAvailabilityStatus(day);
            const isPast = isBefore(day, new Date()) && !isToday(day);
            const isSelected = isSameDay(day, selectedDate);

            return (
              <button
                key={day.toISOString()}
                onClick={() => !isPast && setSelectedDate(day)}
                disabled={isPast}
                className={cn(
                  'flex flex-col items-center p-2 rounded-lg transition-colors',
                  isPast && 'opacity-40 cursor-not-allowed',
                  !isPast && 'hover:bg-muted cursor-pointer',
                  isSelected && 'bg-primary text-primary-foreground hover:bg-primary',
                  isToday(day) && !isSelected && 'ring-1 ring-primary'
                )}
              >
                <span className="text-xs uppercase">{format(day, 'EEE', { locale: it })}</span>
                <span className="text-lg font-bold">{format(day, 'd')}</span>
                <div
                  className={cn(
                    'w-2 h-2 rounded-full mt-1',
                    status === 'available' && 'bg-green-500',
                    status === 'partial' && 'bg-yellow-500',
                    status === 'full' && 'bg-red-500',
                    status === 'none' && 'bg-muted-foreground/30'
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" /> Disponibile
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-500" /> Parziale
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" /> Pieno
          </span>
        </div>

        {/* Selected Date Slots */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">
            {format(selectedDate, 'EEEE d MMMM', { locale: it })}
          </h4>
          {selectedDateSlots.length > 0 ? (
            <div className="grid gap-2">
              {selectedDateSlots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => slot.isAvailable && onSlotSelect?.(slot)}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg border transition-colors',
                    slot.isAvailable
                      ? 'border-green-500/30 bg-green-500/5 cursor-pointer hover:bg-green-500/10'
                      : 'border-border bg-muted/50 cursor-not-allowed'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-mono font-medium">
                        {slot.startTime} - {slot.endTime}
                      </p>
                      {!slot.isAvailable && slot.eventName && (
                        <p className="text-xs text-muted-foreground">{slot.eventName}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{slot.currentPlayers}/{slot.maxPlayers}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Euro className="h-4 w-4 text-muted-foreground" />
                      <span>{slot.price}</span>
                    </div>
                    {slot.isAvailable ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Disponibile</Badge>
                    ) : (
                      <Badge variant="secondary">Occupato</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nessuno slot disponibile per questa data</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;