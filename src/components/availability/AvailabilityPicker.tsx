import React, { useState } from 'react';
import { Calendar, Clock, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TimeSlot, DayOfWeek } from '@/types/availability';
import { format, addDays, startOfWeek, isSameDay, isToday, isBefore } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface AvailabilityPickerProps {
  selectedDates: Date[];
  selectedTimeSlots: Record<string, TimeSlot[]>;
  onDateSelect: (date: Date) => void;
  onDateRemove: (date: Date) => void;
  onTimeSlotAdd: (date: Date, slot: TimeSlot) => void;
  onTimeSlotRemove: (date: Date, slotId: string) => void;
}

const DEFAULT_TIME_SLOTS: { id: string; label: string; startTime: string; endTime: string }[] = [
  { id: 'morning', label: 'Mattina', startTime: '09:00', endTime: '12:00' },
  { id: 'afternoon', label: 'Pomeriggio', startTime: '14:00', endTime: '17:00' },
  { id: 'evening', label: 'Sera', startTime: '18:00', endTime: '21:00' },
  { id: 'night', label: 'Notte', startTime: '20:00', endTime: '23:00' },
];

export const AvailabilityPicker: React.FC<AvailabilityPickerProps> = ({
  selectedDates,
  selectedTimeSlots,
  onDateSelect,
  onDateRemove,
  onTimeSlotAdd,
  onTimeSlotRemove,
}) => {
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [expandedDate, setExpandedDate] = useState<Date | null>(null);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const prevWeek = () => setWeekStart(addDays(weekStart, -7));
  const nextWeek = () => setWeekStart(addDays(weekStart, 7));

  const isDateSelected = (date: Date) => selectedDates.some((d) => isSameDay(d, date));
  
  const getTimeSlotsForDate = (date: Date): TimeSlot[] => {
    const key = format(date, 'yyyy-MM-dd');
    return selectedTimeSlots[key] || [];
  };

  const handleDateClick = (date: Date) => {
    if (isDateSelected(date)) {
      setExpandedDate(isSameDay(expandedDate || new Date(0), date) ? null : date);
    } else {
      onDateSelect(date);
      setExpandedDate(date);
    }
  };

  const handleTimeSlotClick = (date: Date, slot: typeof DEFAULT_TIME_SLOTS[0]) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const existingSlots = selectedTimeSlots[dateKey] || [];
    const existingSlot = existingSlots.find((s) => s.id === `${dateKey}_${slot.id}`);
    
    if (existingSlot) {
      onTimeSlotRemove(date, existingSlot.id);
    } else {
      onTimeSlotAdd(date, {
        id: `${dateKey}_${slot.id}`,
        startTime: slot.startTime,
        endTime: slot.endTime,
      });
    }
  };

  const isSlotSelected = (date: Date, slotId: string): boolean => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const slots = selectedTimeSlots[dateKey] || [];
    return slots.some((s) => s.id === `${dateKey}_${slotId}`);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5" />
            Seleziona Disponibilità
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
        {/* Week Grid */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => {
            const isPast = isBefore(day, new Date()) && !isToday(day);
            const isSelected = isDateSelected(day);
            const isExpanded = expandedDate && isSameDay(day, expandedDate);
            const slots = getTimeSlotsForDate(day);

            return (
              <button
                key={day.toISOString()}
                onClick={() => !isPast && handleDateClick(day)}
                disabled={isPast}
                className={cn(
                  'flex flex-col items-center p-2 rounded-lg transition-colors relative',
                  isPast && 'opacity-40 cursor-not-allowed',
                  !isPast && 'hover:bg-muted cursor-pointer',
                  isSelected && 'bg-primary text-primary-foreground hover:bg-primary',
                  isToday(day) && !isSelected && 'ring-1 ring-primary',
                  isExpanded && 'ring-2 ring-primary'
                )}
              >
                <span className="text-xs uppercase">{format(day, 'EEE', { locale: it })}</span>
                <span className="text-lg font-bold">{format(day, 'd')}</span>
                {slots.length > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-xs mt-1 h-5",
                      isSelected && "bg-primary-foreground/20 text-primary-foreground"
                    )}
                  >
                    {slots.length}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        {/* Time Slot Selection for Expanded Date */}
        {expandedDate && isDateSelected(expandedDate) && (
          <div className="p-4 bg-muted/50 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {format(expandedDate, 'EEEE d MMMM', { locale: it })}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDateRemove(expandedDate)}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4 mr-1" />
                Rimuovi giorno
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEFAULT_TIME_SLOTS.map((slot) => {
                const selected = isSlotSelected(expandedDate, slot.id);
                return (
                  <button
                    key={slot.id}
                    onClick={() => handleTimeSlotClick(expandedDate, slot)}
                    className={cn(
                      'p-3 rounded-lg border text-left transition-colors',
                      selected
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50 bg-background'
                    )}
                  >
                    <p className="font-medium text-sm">{slot.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary */}
        {selectedDates.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{selectedDates.length}</span> giorni selezionati,{' '}
              <span className="font-medium text-foreground">
                {Object.values(selectedTimeSlots).flat().length}
              </span>{' '}
              slot orari
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailabilityPicker;
