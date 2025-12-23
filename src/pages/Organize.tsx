import React, { useState, useMemo } from 'react';
import { Calendar, Users, MapPin, Sparkles, Zap, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AvailabilityPicker,
  PlayerAvailabilityList,
  FieldAvailabilityGrid,
  MatchSuggestions,
  QuickMatchFinder,
} from '@/components/availability';
import { useAvailabilityStore } from '@/stores/availabilityStore';
import { generateMatchSuggestions } from '@/lib/availabilityMatcher';
import { TimeSlot, FieldSlot } from '@/types/availability';
import { MOCK_FIELDS, MOCK_AVAILABILITY } from '@/mocks/fields';
import { format, addDays } from 'date-fns';
import { toast } from 'sonner';

const Organize: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<Record<string, TimeSlot[]>>({});

  const { userAvailabilities, matchRequests, addAvailability, joinMatchRequest } = useAvailabilityStore();

  // Convert field availability to FieldSlot format
  const fieldSlots: FieldSlot[] = useMemo(() => {
    return MOCK_AVAILABILITY.map((slot) => {
      const field = MOCK_FIELDS.find((f) => f.id === slot.fieldId);
      return {
        id: slot.id,
        fieldId: slot.fieldId,
        fieldName: field?.name || 'Campo',
        fieldCity: field?.city || '',
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isAvailable: slot.isAvailable,
        price: slot.price,
        maxPlayers: slot.maxPlayers,
        currentPlayers: slot.currentPlayers,
      };
    });
  }, []);

  // Generate suggestions
  const suggestions = useMemo(() => {
    return generateMatchSuggestions(fieldSlots, userAvailabilities, { minPlayers: 6 });
  }, [fieldSlots, userAvailabilities]);

  const handleDateSelect = (date: Date) => {
    setSelectedDates((prev) => [...prev, date]);
  };

  const handleDateRemove = (date: Date) => {
    const key = format(date, 'yyyy-MM-dd');
    setSelectedDates((prev) => prev.filter((d) => format(d, 'yyyy-MM-dd') !== key));
    setSelectedTimeSlots((prev) => {
      const newSlots = { ...prev };
      delete newSlots[key];
      return newSlots;
    });
  };

  const handleTimeSlotAdd = (date: Date, slot: TimeSlot) => {
    const key = format(date, 'yyyy-MM-dd');
    setSelectedTimeSlots((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), slot],
    }));
  };

  const handleTimeSlotRemove = (date: Date, slotId: string) => {
    const key = format(date, 'yyyy-MM-dd');
    setSelectedTimeSlots((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((s) => s.id !== slotId),
    }));
  };

  const handleSaveAvailability = () => {
    selectedDates.forEach((date) => {
      const key = format(date, 'yyyy-MM-dd');
      const slots = selectedTimeSlots[key] || [];
      if (slots.length > 0) {
        addAvailability({
          userId: 'current_user',
          userName: 'Tu',
          date,
          timeSlots: slots,
          isRecurring: false,
        });
      }
    });
    toast.success('Disponibilità salvata!');
    setSelectedDates([]);
    setSelectedTimeSlots({});
  };

  const handleJoinMatch = (matchId: string) => {
    joinMatchRequest(matchId, { id: 'current_user', name: 'Tu' });
    toast.success('Richiesta inviata!');
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Organizza Partita
          </h1>
          <p className="text-muted-foreground">
            Trova giocatori e campi compatibili con le tue disponibilità
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Scopri
          </TabsTrigger>
          <TabsTrigger value="availability" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Disponibilità
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Suggerimenti
          </TabsTrigger>
        </TabsList>

        {/* Discover Tab */}
        <TabsContent value="discover" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <QuickMatchFinder
              matchRequests={matchRequests}
              onJoinMatch={handleJoinMatch}
              onViewDetails={(id) => toast.info('Dettagli partita')}
            />
            <PlayerAvailabilityList availabilities={userAvailabilities.slice(0, 10)} />
          </div>
        </TabsContent>

        {/* Availability Tab */}
        <TabsContent value="availability" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <AvailabilityPicker
                selectedDates={selectedDates}
                selectedTimeSlots={selectedTimeSlots}
                onDateSelect={handleDateSelect}
                onDateRemove={handleDateRemove}
                onTimeSlotAdd={handleTimeSlotAdd}
                onTimeSlotRemove={handleTimeSlotRemove}
              />
              {selectedDates.length > 0 && (
                <Button onClick={handleSaveAvailability} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Salva Disponibilità
                </Button>
              )}
            </div>
            <FieldAvailabilityGrid
              fieldSlots={fieldSlots}
              onSlotSelect={(slot) => toast.info(`Selezionato: ${slot.fieldName}`)}
            />
          </div>
        </TabsContent>

        {/* Suggestions Tab */}
        <TabsContent value="suggestions" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <MatchSuggestions
              suggestions={suggestions}
              onSuggestionSelect={(s) => toast.info(`Match: ${s.field.fieldName}`)}
            />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Giocatori per Slot
                </CardTitle>
              </CardHeader>
              <CardContent>
                {suggestions[0] ? (
                  <PlayerAvailabilityList
                    availabilities={suggestions[0].availablePlayers}
                    compact
                  />
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    Seleziona un suggerimento per vedere i giocatori
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Organize;
