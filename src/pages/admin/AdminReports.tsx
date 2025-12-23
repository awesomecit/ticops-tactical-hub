import React from 'react';
import { Flag, AlertTriangle, CheckCircle, Clock, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface Report {
  id: string;
  type: 'cheat' | 'behavior' | 'technical' | 'other';
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  reporter: string;
  reported: string;
  description: string;
  createdAt: Date;
  matchId?: string;
}

const MOCK_REPORTS: Report[] = [
  {
    id: 'rep_001',
    type: 'cheat',
    status: 'pending',
    reporter: 'GhostSniper92',
    reported: 'SuspectPlayer',
    description: 'Possibile uso di aimbot durante la partita. Colpi troppo precisi.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    matchId: 'match_123',
  },
  {
    id: 'rep_002',
    type: 'behavior',
    status: 'investigating',
    reporter: 'TacticalMike',
    reported: 'ToxicPlayer99',
    description: 'Comportamento antisportivo e linguaggio offensivo in chat.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 'rep_003',
    type: 'technical',
    status: 'resolved',
    reporter: 'NewRecruit',
    reported: 'Sistema',
    description: 'Problema con il conteggio punti durante il torneo.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    matchId: 'match_456',
  },
  {
    id: 'rep_004',
    type: 'behavior',
    status: 'dismissed',
    reporter: 'LoneWolf99',
    reported: 'FairPlayer',
    description: 'Accusa infondata di team killing.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
  },
];

const typeLabels: Record<string, { label: string; color: string }> = {
  cheat: { label: 'Cheat', color: 'bg-red-500/20 text-red-400' },
  behavior: { label: 'Comportamento', color: 'bg-orange-500/20 text-orange-400' },
  technical: { label: 'Tecnico', color: 'bg-blue-500/20 text-blue-400' },
  other: { label: 'Altro', color: 'bg-gray-500/20 text-gray-400' },
};

const statusLabels: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'In Attesa', color: 'bg-yellow-500/20 text-yellow-400', icon: Clock },
  investigating: { label: 'In Esame', color: 'bg-blue-500/20 text-blue-400', icon: AlertTriangle },
  resolved: { label: 'Risolto', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  dismissed: { label: 'Archiviato', color: 'bg-gray-500/20 text-gray-400', icon: Flag },
};

const AdminReports: React.FC = () => {
  const pendingCount = MOCK_REPORTS.filter(r => r.status === 'pending').length;
  const investigatingCount = MOCK_REPORTS.filter(r => r.status === 'investigating').length;
  const resolvedCount = MOCK_REPORTS.filter(r => r.status === 'resolved').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Report</h1>
        <p className="text-muted-foreground">Gestisci le segnalazioni degli utenti</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Flag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{MOCK_REPORTS.length}</p>
              <p className="text-xs text-muted-foreground">Totale Report</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-yellow-500/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-xs text-muted-foreground">In Attesa</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{investigatingCount}</p>
              <p className="text-xs text-muted-foreground">In Esame</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-green-500/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{resolvedCount}</p>
              <p className="text-xs text-muted-foreground">Risolti</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cerca nei report..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i tipi</SelectItem>
                <SelectItem value="cheat">Cheat</SelectItem>
                <SelectItem value="behavior">Comportamento</SelectItem>
                <SelectItem value="technical">Tecnico</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Stato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti gli stati</SelectItem>
                <SelectItem value="pending">In Attesa</SelectItem>
                <SelectItem value="investigating">In Esame</SelectItem>
                <SelectItem value="resolved">Risolto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Segnalazioni Recenti</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_REPORTS.map((report) => {
              const typeConfig = typeLabels[report.type];
              const statusConfig = statusLabels[report.status];
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={report.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                    <Flag className="h-5 w-5 text-destructive" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{report.reporter}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium text-destructive">{report.reported}</span>
                      <Badge className={typeConfig.color}>{typeConfig.label}</Badge>
                      <Badge className={statusConfig.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {report.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{format(report.createdAt, 'dd MMM yyyy, HH:mm', { locale: it })}</span>
                      {report.matchId && (
                        <span className="text-primary">Match: {report.matchId}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm">Dettagli</Button>
                    {report.status === 'pending' && (
                      <Button variant="default" size="sm">Esamina</Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReports;
