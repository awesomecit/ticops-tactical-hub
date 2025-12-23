import React, { useState } from 'react';
import { MapPin, Building, Star, Eye, Edit, Pause, Check, X, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Badge } from '@/components/ui/badge';
import { AdminTable, Column } from '@/components/admin/AdminTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ActionDropdown, ActionItem } from '@/components/admin/ActionDropdown';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { MOCK_ADMIN_FIELDS, AdminField } from '@/mocks/adminData';
import { useToast } from '@/hooks/use-toast';

const AdminFields: React.FC = () => {
  const { toast } = useToast();
  const [fields, setFields] = useState(MOCK_ADMIN_FIELDS);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    variant: 'default' | 'destructive';
    onConfirm: () => void;
  }>({ open: false, title: '', description: '', variant: 'default', onConfirm: () => {} });

  const activeFields = fields.filter((f) => f.status === 'active');
  const pendingFields = fields.filter((f) => f.status === 'pending');
  const suspendedFields = fields.filter((f) => f.status === 'suspended');

  const handleApprove = (field: AdminField) => {
    setFields((prev) =>
      prev.map((f) => (f.id === field.id ? { ...f, status: 'active' as const } : f))
    );
    toast({ title: 'Campo approvato', description: `${field.name} è ora attivo` });
  };

  const handleReject = (field: AdminField) => {
    setFields((prev) => prev.filter((f) => f.id !== field.id));
    toast({ title: 'Campo rifiutato', description: `La richiesta per ${field.name} è stata rifiutata` });
  };

  const handleSuspend = (field: AdminField) => {
    setConfirmDialog({
      open: true,
      title: 'Sospendi Campo',
      description: `Sei sicuro di voler sospendere "${field.name}"? Non sarà più visibile agli utenti.`,
      variant: 'destructive',
      onConfirm: () => {
        setFields((prev) =>
          prev.map((f) => (f.id === field.id ? { ...f, status: 'suspended' as const } : f))
        );
        toast({ title: 'Campo sospeso', description: `${field.name} è stato sospeso` });
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handleReactivate = (field: AdminField) => {
    setFields((prev) =>
      prev.map((f) => (f.id === field.id ? { ...f, status: 'active' as const } : f))
    );
    toast({ title: 'Campo riattivato', description: `${field.name} è di nuovo attivo` });
  };

  const getActions = (field: AdminField): ActionItem[] => {
    const baseActions: ActionItem[] = [
      { label: 'Vedi dettagli', icon: Eye, onClick: () => {} },
      { label: 'Modifica', icon: Edit, onClick: () => {} },
    ];

    if (field.status === 'active') {
      baseActions.push({
        label: 'Sospendi',
        icon: Pause,
        onClick: () => handleSuspend(field),
        variant: 'destructive',
      });
    } else if (field.status === 'suspended') {
      baseActions.push({
        label: 'Riattiva',
        icon: Check,
        onClick: () => handleReactivate(field),
      });
    }

    return baseActions;
  };

  const columns: Column<AdminField>[] = [
    {
      key: 'name',
      header: 'Nome',
      sortable: true,
      render: (field) => (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-primary" />
          <span className="font-medium">{field.name}</span>
        </div>
      ),
    },
    {
      key: 'city',
      header: 'Città',
      sortable: true,
      render: (field) => (
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {field.city}
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Tipo',
      render: (field) => (
        <Badge variant="outline" className="capitalize">
          {field.type}
        </Badge>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      sortable: true,
      render: (field) => (
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          <span>{field.rating > 0 ? field.rating.toFixed(1) : '-'}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (field) => <StatusBadge status={field.status} />,
    },
    {
      key: 'actions',
      header: '',
      className: 'w-12',
      render: (field) => <ActionDropdown actions={getActions(field)} />,
    },
  ];

  const PendingCard: React.FC<{ field: AdminField }> = ({ field }) => (
    <TacticalCard className="animate-slide-in-up">
      <TacticalCardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{field.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {field.city} - {field.address}
            </p>
          </div>
          <Badge variant="outline" className="capitalize">
            {field.type}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-muted-foreground">Capacità:</span>
            <span className="ml-2 font-medium">{field.capacity} giocatori</span>
          </div>
          <div>
            <span className="text-muted-foreground">Email:</span>
            <span className="ml-2">{field.email}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Telefono:</span>
            <span className="ml-2">{field.phone}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Richiesta:</span>
            <span className="ml-2">
              {new Date(field.submittedAt || '').toLocaleDateString('it-IT')}
            </span>
          </div>
        </div>

        {field.documents && (
          <div className="mb-4">
            <span className="text-sm text-muted-foreground block mb-2">Documenti allegati:</span>
            <div className="flex flex-wrap gap-2">
              {field.documents.map((doc, i) => (
                <Badge key={i} variant="secondary" className="gap-1">
                  <FileText className="h-3 w-3" />
                  {doc}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <GlowButton variant="primary" size="sm" onClick={() => handleApprove(field)}>
            <Check className="h-4 w-4 mr-1" />
            Approva
          </GlowButton>
          <GlowButton
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => handleReject(field)}
          >
            <X className="h-4 w-4 mr-1" />
            Rifiuta
          </GlowButton>
        </div>
      </TacticalCardContent>
    </TacticalCard>
  );

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div>
        <h1 className="text-2xl font-bold text-glow-primary">Gestione Campi</h1>
        <p className="text-muted-foreground text-sm">Approva, modifica e gestisci i campi</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="active">Attivi ({activeFields.length})</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingFields.length > 0 && (
              <span className="ml-1 h-5 w-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center">
                {pendingFields.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="suspended">Sospesi ({suspendedFields.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <AdminTable data={activeFields} columns={columns} keyField="id" emptyMessage="Nessun campo attivo" />
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          {pendingFields.length === 0 ? (
            <TacticalCard>
              <TacticalCardContent className="py-8 text-center text-muted-foreground">
                Nessuna richiesta in attesa
              </TacticalCardContent>
            </TacticalCard>
          ) : (
            <div className="grid gap-4">
              {pendingFields.map((field) => (
                <PendingCard key={field.id} field={field} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="suspended" className="mt-4">
          <AdminTable
            data={suspendedFields}
            columns={columns}
            keyField="id"
            emptyMessage="Nessun campo sospeso"
          />
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

export default AdminFields;
