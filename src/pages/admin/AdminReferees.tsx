import React, { useState } from 'react';
import { Shield, Star, Calendar, Clock, Check, X, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AdminTable, Column } from '@/components/admin/AdminTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { MOCK_ADMIN_REFEREES, MOCK_EXAM_DATES, AdminReferee } from '@/mocks/adminData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const levelConfig = {
  junior: { label: 'Junior', color: 'text-muted-foreground border-muted-foreground/50' },
  senior: { label: 'Senior', color: 'text-primary border-primary/50' },
  master: { label: 'Master', color: 'text-secondary border-secondary/50' },
};

const AdminReferees: React.FC = () => {
  const { toast } = useToast();
  const [referees, setReferees] = useState(MOCK_ADMIN_REFEREES);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    variant: 'default' | 'destructive';
    onConfirm: () => void;
  }>({ open: false, title: '', description: '', variant: 'default', onConfirm: () => {} });

  const activeReferees = referees.filter((r) => r.status === 'active');
  const pendingReferees = referees.filter((r) => r.status === 'pending');
  const examReferees = referees.filter((r) => r.status === 'exam');

  const handleApproveToExam = (referee: AdminReferee) => {
    setReferees((prev) =>
      prev.map((r) =>
        r.id === referee.id
          ? { ...r, status: 'exam' as const, examDate: '2024-01-27T10:00:00' }
          : r
      )
    );
    toast({
      title: 'Candidatura approvata',
      description: `${referee.name} è stato ammesso all'esame`,
    });
  };

  const handleReject = (referee: AdminReferee) => {
    setConfirmDialog({
      open: true,
      title: 'Rifiuta Candidatura',
      description: `Sei sicuro di voler rifiutare la candidatura di "${referee.name}"?`,
      variant: 'destructive',
      onConfirm: () => {
        setReferees((prev) => prev.filter((r) => r.id !== referee.id));
        toast({
          title: 'Candidatura rifiutata',
          description: `La candidatura di ${referee.name} è stata rifiutata`,
        });
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const columns: Column<AdminReferee>[] = [
    {
      key: 'name',
      header: 'Arbitro',
      render: (referee) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-border/50">
            <AvatarImage src={referee.avatar} />
            <AvatarFallback className="bg-primary/20 text-primary text-xs">
              {referee.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{referee.name}</span>
        </div>
      ),
    },
    {
      key: 'level',
      header: 'Livello',
      sortable: true,
      render: (referee) => (
        <Badge variant="outline" className={cn('capitalize', levelConfig[referee.level].color)}>
          {levelConfig[referee.level].label}
        </Badge>
      ),
    },
    {
      key: 'matchesRefereed',
      header: 'Partite',
      sortable: true,
      render: (referee) => (
        <span className="font-mono">{referee.matchesRefereed}</span>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      sortable: true,
      render: (referee) => (
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          <span>{referee.rating > 0 ? referee.rating.toFixed(1) : '-'}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (referee) => <StatusBadge status={referee.status} />,
    },
  ];

  const PendingCard: React.FC<{ referee: AdminReferee }> = ({ referee }) => (
    <TacticalCard className="animate-slide-in-up">
      <TacticalCardContent className="p-4">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-12 w-12 border border-border/50">
            <AvatarImage src={referee.avatar} />
            <AvatarFallback className="bg-primary/20 text-primary">
              {referee.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{referee.name}</h3>
            <p className="text-sm text-muted-foreground">
              Richiesta: {new Date(referee.appliedAt || '').toLocaleDateString('it-IT')}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <div>
            <h4 className="text-sm font-medium text-primary mb-1">Esperienza</h4>
            <p className="text-sm text-muted-foreground">{referee.experience}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-primary mb-1">Motivazione</h4>
            <p className="text-sm text-muted-foreground">{referee.motivation}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-primary mb-1">Disponibilità</h4>
            <div className="flex flex-wrap gap-2">
              {referee.availability?.map((day, i) => (
                <Badge key={i} variant="secondary">
                  {day}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <GlowButton variant="primary" size="sm" onClick={() => handleApproveToExam(referee)}>
            <Check className="h-4 w-4 mr-1" />
            Approva → Esame
          </GlowButton>
          <GlowButton
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => handleReject(referee)}
          >
            <X className="h-4 w-4 mr-1" />
            Rifiuta
          </GlowButton>
        </div>
      </TacticalCardContent>
    </TacticalCard>
  );

  const ExamCalendar: React.FC = () => (
    <div className="space-y-4">
      {MOCK_EXAM_DATES.map((exam, index) => {
        const examDate = new Date(exam.date);
        const candidatesForExam = examReferees.filter(
          (r) => r.examDate && new Date(r.examDate).toDateString() === examDate.toDateString()
        );

        return (
          <TacticalCard key={index} className="animate-slide-in-up" style={{ animationDelay: `${index * 50}ms` }}>
            <TacticalCardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-sm bg-primary/10 flex flex-col items-center justify-center border border-primary/30">
                    <span className="text-lg font-bold text-primary">
                      {examDate.getDate()}
                    </span>
                    <span className="text-xs text-primary uppercase">
                      {examDate.toLocaleDateString('it-IT', { month: 'short' })}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Esame Arbitri</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {examDate.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-sm text-muted-foreground">{exam.location}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/50">
                  {candidatesForExam.length} candidati
                </Badge>
              </div>

              {candidatesForExam.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border/30">
                  <p className="text-xs text-muted-foreground mb-2">Candidati:</p>
                  <div className="flex flex-wrap gap-2">
                    {candidatesForExam.map((candidate) => (
                      <div key={candidate.id} className="flex items-center gap-2 bg-muted/30 rounded-sm px-2 py-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback className="text-xs">
                            {candidate.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{candidate.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TacticalCardContent>
          </TacticalCard>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div>
        <h1 className="text-2xl font-bold text-glow-primary">Gestione Arbitri</h1>
        <p className="text-muted-foreground text-sm">Gestisci arbitri, richieste e esami</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="active">Attivi ({activeReferees.length})</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Richieste
            {pendingReferees.length > 0 && (
              <span className="ml-1 h-5 w-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center">
                {pendingReferees.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="exams">Esami ({examReferees.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <AdminTable
            data={activeReferees}
            columns={columns}
            keyField="id"
            emptyMessage="Nessun arbitro attivo"
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          {pendingReferees.length === 0 ? (
            <TacticalCard>
              <TacticalCardContent className="py-8 text-center text-muted-foreground">
                Nessuna richiesta in attesa
              </TacticalCardContent>
            </TacticalCard>
          ) : (
            <div className="grid gap-4">
              {pendingReferees.map((referee) => (
                <PendingCard key={referee.id} referee={referee} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="exams" className="mt-4">
          <ExamCalendar />
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog((prev) => ({ ...prev, open }))}
        title={confirmDialog.title}
        description={confirmDialog.description}
        variant={confirmDialog.variant}
        onConfirm={confirmDialog.onConfirm}
      />
    </div>
  );
};

export default AdminReferees;
