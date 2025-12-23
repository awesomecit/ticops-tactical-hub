import React, { useState } from 'react';
import { MapPin, Clock, Euro, Users, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FieldSlot } from '@/types/availability';
import { format, addDays, startOfWeek, isSameDay, isToday, isBefore } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface FieldAvailabilityGridProps {
  fieldSlots: FieldSlot[];
  selectedSlot?: FieldSlot;
  onSlotSelect?: (slot: FieldSlot) => void;
}

export const FieldAvailabilityGrid: React.FC<FieldAvailabilityGridProps> = ({
  fieldSlots,
  selectedSlot,
  onSlotSelect,
}) => {
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [expandedField, setExpandedField] = useState<string | null>(null);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const prevWeek = () => setWeekStart(addDays(weekStart, -7));
  const nextWeek = () => setWeekStart(addDays(weekStart, 7));

  // Group slots by field
  const slotsByField = fieldSlots.reduce((acc, slot) => {
    if (!acc[slot.fieldId]) {
      acc[slot.fieldId] = {
        fieldName: slot.fieldName,
        fieldCity: slot.fieldCity,
        slots: [],
      };
    }
    acc[slot.fieldId].slots.push(slot);
    return acc;
  }, {} as Record<string, { fieldName: string; fieldCity: string; slots: FieldSlot[] }>);

  const getSlotForDay = (fieldId: string, date: Date): FieldSlot[] => {
    return slotsByField[fieldId]?.slots.filter((s) => isSameDay(s.date, date)) || [];
  };

  const getAvailabilityStatus = (fieldId: string, date: Date) => {
    const slots = getSlotForDay(fieldId, date);
    if (slots.length === 0) return 'none';
    const available = slots.filter((s) => s.isAvailable).length;
    if (available === 0) return 'full';
    if (available === slots.length) return 'available';
    return 'partial';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            Disponibilità Campi
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={prevWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[140px] text-center">
              {format(weekStart, 'MMMM yyyy', { locale: it })}
            </span>
            <Button variant="ghost" size="icon" onClick={nextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Header Row */}
        <div className="grid grid-cols-8 gap-1">
          <div className="p-2 text-sm font-medium text-muted-foreground">Campo</div>
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className={cn(
                'text-center p-2 rounded-lg',
                isToday(day) && 'bg-primary/10'
              )}
            >
              <span className="text-xs uppercase text-muted-foreground block">
                {format(day, 'EEE', { locale: it })}
              </span>
              <span className="text-sm font-bold">{format(day, 'd')}</span>
            </div>
          ))}
        </div>

        {/* Field Rows */}
        {Object.entries(slotsByField).map(([fieldId, { fieldName, fieldCity }]) => (
          <div key={fieldId} className="space-y-2">
            <div className="grid grid-cols-8 gap-1 items-center">
              <div
                className="p-2 cursor-pointer hover:bg-muted rounded-lg transition-colors"
                onClick={() => setExpandedField(expandedField === fieldId ? null : fieldId)}
              >
                <p className="text-sm font-medium truncate">{fieldName}</p>
                <p className="text-xs text-muted-foreground">{fieldCity}</p>
              </div>
              {weekDays.map((day) => {
                const status = getAvailabilityStatus(fieldId, day);
                const isPast = isBefore(day, new Date()) && !isToday(day);
                const daySlots = getSlotForDay(fieldId, day).filter((s) => s.isAvailable);

                return (
                  <button
                    key={day.toISOString()}
                    disabled={isPast || status === 'none' || status === 'full'}
                    onClick={() => {
                      if (daySlots.length === 1) {
                        onSlotSelect?.(daySlots[0]);
                      } else {
                        setExpandedField(fieldId);
                      }
                    }}
                    className={cn(
                      'p-2 rounded-lg transition-colors flex items-center justify-center',
                      isPast && 'opacity-30',
                      status === 'available' && 'bg-green-500/20 hover:bg-green-500/30 cursor-pointer',
                      status === 'partial' && 'bg-yellow-500/20 hover:bg-yellow-500/30 cursor-pointer',
                      status === 'full' && 'bg-red-500/20 cursor-not-allowed',
                      status === 'none' && 'bg-muted cursor-not-allowed'
                    )}
                  >
                    <div
                      className={cn(
                        'w-3 h-3 rounded-full',
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

            {/* Expanded Slots */}
            {expandedField === fieldId && (
              <div className="ml-4 p-3 bg-muted/50 rounded-lg">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {slotsByField[fieldId].slots
                    .filter((s) => s.isAvailable && !isBefore(s.date, new Date()))
                    .slice(0, 6)
                    .map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => onSlotSelect?.(slot)}
                        className={cn(
                          'p-3 rounded-lg border text-left transition-colors',
                          selectedSlot?.id === slot.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-background hover:border-primary/50'
                        )}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">
                            {format(slot.date, 'EEE d', { locale: it })}
                          </span>
                          {selectedSlot?.id === slot.id && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {slot.startTime}-{slot.endTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Euro className="h-3 w-3" />
                            {slot.price}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {slot.maxPlayers}
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2 border-t">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" /> Disponibile
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500" /> Parziale
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" /> Pieno
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FieldAvailabilityGrid;
