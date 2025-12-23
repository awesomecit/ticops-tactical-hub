import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Radio, 
  Plus, 
  Pencil, 
  Trash2, 
  Signal,
  Users,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TacticalCard } from '@/components/ui/TacticalCard';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Mock data for team frequencies
interface TeamFrequency {
  id: string;
  teamId: string;
  teamName: string;
  mainFrequency: string;
  alphaFrequency: string;
  bravoFrequency: string;
  commandFrequency: string;
  isActive: boolean;
  connectedUsers: number;
}

const mockTeamFrequencies: TeamFrequency[] = [
  {
    id: '1',
    teamId: 'team_001',
    teamName: 'Shadow Hunters',
    mainFrequency: '145.500',
    alphaFrequency: '145.525',
    bravoFrequency: '145.550',
    commandFrequency: '145.600',
    isActive: true,
    connectedUsers: 4,
  },
  {
    id: '2',
    teamId: 'team_002',
    teamName: 'Night Wolves',
    mainFrequency: '146.000',
    alphaFrequency: '146.025',
    bravoFrequency: '146.050',
    commandFrequency: '146.100',
    isActive: true,
    connectedUsers: 3,
  },
  {
    id: '3',
    teamId: 'team_003',
    teamName: 'Delta Force',
    mainFrequency: '147.000',
    alphaFrequency: '147.025',
    bravoFrequency: '147.050',
    commandFrequency: '147.100',
    isActive: false,
    connectedUsers: 0,
  },
];

const AdminRadio: React.FC = () => {
  const [frequencies, setFrequencies] = useState<TeamFrequency[]>(mockTeamFrequencies);
  const [searchQuery, setSearchQuery] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamFrequency | null>(null);
  
  // Form state for editing
  const [formData, setFormData] = useState({
    mainFrequency: '',
    alphaFrequency: '',
    bravoFrequency: '',
    commandFrequency: '',
  });

  const filteredFrequencies = frequencies.filter(f =>
    f.teamName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTeams = frequencies.filter(f => f.isActive).length;
  const totalConnections = frequencies.reduce((acc, f) => acc + f.connectedUsers, 0);

  const handleEdit = (team: TeamFrequency) => {
    setSelectedTeam(team);
    setFormData({
      mainFrequency: team.mainFrequency,
      alphaFrequency: team.alphaFrequency,
      bravoFrequency: team.bravoFrequency,
      commandFrequency: team.commandFrequency,
    });
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    if (!selectedTeam) return;

    // Validate frequencies
    const freqRegex = /^\d{3}\.\d{3}$/;
    const allValid = Object.values(formData).every(f => freqRegex.test(f));
    
    if (!allValid) {
      toast.error('Formato frequenza non valido. Usa il formato XXX.XXX');
      return;
    }

    // Check for conflicts
    const allFreqs = frequencies
      .filter(f => f.id !== selectedTeam.id)
      .flatMap(f => [f.mainFrequency, f.alphaFrequency, f.bravoFrequency, f.commandFrequency]);
    
    const newFreqs = Object.values(formData);
    const hasConflict = newFreqs.some(f => allFreqs.includes(f));
    
    if (hasConflict) {
      toast.error('Conflitto frequenze! Una o più frequenze sono già assegnate.');
      return;
    }

    setFrequencies(prev => prev.map(f => 
      f.id === selectedTeam.id 
        ? { ...f, ...formData }
        : f
    ));

    toast.success(`Frequenze aggiornate per ${selectedTeam.teamName}`);
    setEditDialogOpen(false);
    setSelectedTeam(null);
  };

  const handleToggleActive = (teamId: string) => {
    setFrequencies(prev => prev.map(f =>
      f.id === teamId
        ? { ...f, isActive: !f.isActive, connectedUsers: f.isActive ? 0 : f.connectedUsers }
        : f
    ));
    toast.success('Stato radio aggiornato');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-glow-primary">
            Gestione Radio
          </h1>
          <p className="text-sm text-muted-foreground">
            Assegna e gestisci le frequenze radio per ogni team
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TacticalCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-sm bg-primary/20">
              <Radio className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{frequencies.length}</p>
              <p className="text-xs text-muted-foreground">Team Configurati</p>
            </div>
          </div>
        </TacticalCard>

        <TacticalCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-sm bg-green-500/20">
              <Signal className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeTeams}</p>
              <p className="text-xs text-muted-foreground">Radio Attive</p>
            </div>
          </div>
        </TacticalCard>

        <TacticalCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-sm bg-blue-500/20">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalConnections}</p>
              <p className="text-xs text-muted-foreground">Utenti Connessi</p>
            </div>
          </div>
        </TacticalCard>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <TacticalCard className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead>Team</TableHead>
              <TableHead>Principale</TableHead>
              <TableHead>Alpha</TableHead>
              <TableHead>Bravo</TableHead>
              <TableHead>Comando</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead>Connessi</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFrequencies.map((team) => (
              <TableRow key={team.id} className="border-border/30">
                <TableCell className="font-medium">{team.teamName}</TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    {team.mainFrequency} MHz
                  </code>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    {team.alphaFrequency} MHz
                  </code>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    {team.bravoFrequency} MHz
                  </code>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    {team.commandFrequency} MHz
                  </code>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={team.isActive ? "default" : "outline"}
                    className={team.isActive ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
                  >
                    {team.isActive ? 'Attivo' : 'Inattivo'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{team.connectedUsers}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(team)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleActive(team.id)}
                    >
                      <Signal className={`h-4 w-4 ${team.isActive ? 'text-green-500' : 'text-muted-foreground'}`} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TacticalCard>

      {/* Frequency allocation info */}
      <TacticalCard className="p-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Radio className="h-4 w-4 text-primary" />
          Linee guida frequenze
        </h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Usa il formato <code className="bg-muted px-1 rounded">XXX.XXX</code> (es. 145.500)</li>
          <li>• Mantieni almeno 0.025 MHz di separazione tra canali dello stesso team</li>
          <li>• Mantieni almeno 0.500 MHz di separazione tra team diversi</li>
          <li>• Range consigliato: 145.000 - 148.000 MHz</li>
        </ul>
      </TacticalCard>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Modifica frequenze - {selectedTeam?.teamName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Canale Principale</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={formData.mainFrequency}
                  onChange={(e) => setFormData(prev => ({ ...prev, mainFrequency: e.target.value }))}
                  placeholder="145.500"
                />
                <span className="text-sm text-muted-foreground">MHz</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Squadra Alpha</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={formData.alphaFrequency}
                  onChange={(e) => setFormData(prev => ({ ...prev, alphaFrequency: e.target.value }))}
                  placeholder="145.525"
                />
                <span className="text-sm text-muted-foreground">MHz</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Squadra Bravo</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={formData.bravoFrequency}
                  onChange={(e) => setFormData(prev => ({ ...prev, bravoFrequency: e.target.value }))}
                  placeholder="145.550"
                />
                <span className="text-sm text-muted-foreground">MHz</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Canale Comando</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={formData.commandFrequency}
                  onChange={(e) => setFormData(prev => ({ ...prev, commandFrequency: e.target.value }))}
                  placeholder="145.600"
                />
                <span className="text-sm text-muted-foreground">MHz</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSave}>
              Salva frequenze
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRadio;
