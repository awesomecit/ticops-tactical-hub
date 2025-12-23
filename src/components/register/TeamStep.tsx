import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Check, Loader2, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { MOCK_TEAMS } from "@/mocks/teams";

interface TeamData {
  hasTeam: boolean;
  selectedTeamId?: string;
}

interface TeamStepProps {
  onComplete: (data: TeamData) => void;
  onBack: () => void;
}

export const TeamStep = ({ onComplete, onBack }: TeamStepProps) => {
  const [hasTeam, setHasTeam] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof MOCK_TEAMS>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API search
    const timer = setTimeout(() => {
      const results = MOCK_TEAMS.filter(team => 
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSubmit = () => {
    onComplete({
      hasTeam,
      selectedTeamId: hasTeam && selectedTeamId ? selectedTeamId : undefined,
    });
  };

  const handleSkip = () => {
    onComplete({ hasTeam: false });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Unisciti a un team</h2>
        <p className="text-muted-foreground mt-2">Fai già parte di un team di softair?</p>
      </div>

      <div className="space-y-6">
        {/* Team Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
          <div>
            <Label className="text-base font-medium">Ho già un team</Label>
            <p className="text-sm text-muted-foreground">
              {hasTeam ? "Cerca il tuo team" : "Puoi unirti a un team in seguito"}
            </p>
          </div>
          <Switch
            checked={hasTeam}
            onCheckedChange={(checked) => {
              setHasTeam(checked);
              if (!checked) {
                setSelectedTeamId(null);
                setSearchQuery("");
              }
            }}
          />
        </div>

        {/* Team Search */}
        {hasTeam && (
          <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cerca per nome o tag del team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Search Results */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {isSearching && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              )}
              
              {!isSearching && searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p>Nessun team trovato</p>
                  <p className="text-sm">Prova con un altro nome</p>
                </div>
              )}

              {searchResults.map((team) => (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => setSelectedTeamId(team.id)}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 flex items-center gap-4 transition-all",
                    selectedTeamId === team.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={team.logo} />
                    <AvatarFallback>{team.tag}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{team.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        [{team.tag}]
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {team.memberCount} membri • {team.region}
                    </p>
                  </div>
                  {selectedTeamId === team.id && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </button>
              ))}
            </div>

            {selectedTeamId && (
              <p className="text-sm text-muted-foreground text-center">
                Una richiesta di adesione verrà inviata al team
              </p>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Indietro
          </Button>
          {!hasTeam ? (
            <Button onClick={handleSkip} variant="secondary" className="flex-1">
              Salta per ora
            </Button>
          ) : null}
          <Button 
            onClick={handleSubmit} 
            className="flex-1"
            disabled={hasTeam && !selectedTeamId}
          >
            {hasTeam ? "Invia richiesta" : "Completa"}
          </Button>
        </div>
      </div>
    </div>
  );
};
