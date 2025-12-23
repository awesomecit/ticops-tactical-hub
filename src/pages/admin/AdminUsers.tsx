import React, { useState, useMemo } from 'react';
import { Eye, AlertTriangle, Ban, RotateCcw, Filter, Search } from 'lucide-react';
import { TacticalCard, TacticalCardHeader, TacticalCardTitle, TacticalCardContent } from '@/components/ui/TacticalCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdminTable, Column } from '@/components/admin/AdminTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ActionDropdown, ActionItem } from '@/components/admin/ActionDropdown';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { MOCK_ADMIN_USERS, AdminUser, UserRole, UserTier, UserStatus } from '@/mocks/adminData';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const tierConfig: Record<UserTier, { label: string; color: string }> = {
  bronze: { label: 'Bronze', color: 'text-amber-600 border-amber-600/50' },
  silver: { label: 'Silver', color: 'text-gray-400 border-gray-400/50' },
  gold: { label: 'Gold', color: 'text-yellow-500 border-yellow-500/50' },
  platinum: { label: 'Platinum', color: 'text-cyan-400 border-cyan-400/50' },
  diamond: { label: 'Diamond', color: 'text-purple-400 border-purple-400/50' },
};

const roleConfig: Record<UserRole, { label: string; color: string }> = {
  user: { label: 'User', color: 'text-muted-foreground border-muted-foreground/50' },
  moderator: { label: 'Mod', color: 'text-primary border-primary/50' },
  admin: { label: 'Admin', color: 'text-secondary border-secondary/50' },
};

const AdminUsers: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(MOCK_ADMIN_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [tierFilter, setTierFilter] = useState<UserTier | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    variant: 'default' | 'destructive';
    onConfirm: () => void;
  }>({ open: false, title: '', description: '', variant: 'default', onConfirm: () => {} });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesTier = tierFilter === 'all' || user.tier === tierFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesTier && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, tierFilter, statusFilter]);

  const handleWarn = (user: AdminUser) => {
    setConfirmDialog({
      open: true,
      title: 'Invia Avvertimento',
      description: `Sei sicuro di voler inviare un avvertimento a "${user.username}"?`,
      variant: 'default',
      onConfirm: () => {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === user.id
              ? { ...u, warnings: u.warnings + 1, status: 'warned' as const }
              : u
          )
        );
        toast({
          title: 'Avvertimento inviato',
          description: `${user.username} ha ricevuto un avvertimento`,
        });
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handleBan = (user: AdminUser) => {
    setConfirmDialog({
      open: true,
      title: 'Banna Utente',
      description: `Sei sicuro di voler bannare "${user.username}"? L'utente non potrà più accedere alla piattaforma.`,
      variant: 'destructive',
      onConfirm: () => {
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, status: 'banned' as const } : u))
        );
        toast({
          title: 'Utente bannato',
          description: `${user.username} è stato bannato`,
        });
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handleResetStats = (user: AdminUser) => {
    setConfirmDialog({
      open: true,
      title: 'Reset Statistiche',
      description: `Sei sicuro di voler resettare le statistiche di "${user.username}"? ELO e partite verranno azzerati.`,
      variant: 'destructive',
      onConfirm: () => {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === user.id ? { ...u, elo: 1000, matchesPlayed: 0, tier: 'bronze' as const } : u
          )
        );
        toast({
          title: 'Stats resettate',
          description: `Le statistiche di ${user.username} sono state resettate`,
        });
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const getActions = (user: AdminUser): ActionItem[] => {
    const actions: ActionItem[] = [
      { label: 'Vedi profilo', icon: Eye, onClick: () => {} },
    ];

    if (user.status !== 'banned') {
      actions.push({
        label: 'Avverti',
        icon: AlertTriangle,
        onClick: () => handleWarn(user),
      });
      actions.push({
        label: 'Banna',
        icon: Ban,
        onClick: () => handleBan(user),
        variant: 'destructive',
      });
    }

    actions.push({
      label: 'Reset Stats',
      icon: RotateCcw,
      onClick: () => handleResetStats(user),
      variant: 'destructive',
    });

    return actions;
  };

  const columns: Column<AdminUser>[] = [
    {
      key: 'username',
      header: 'Utente',
      sortable: true,
      render: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-border/50">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-primary/20 text-primary text-xs">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="font-medium block">{user.username}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Ruolo',
      sortable: true,
      render: (user) => (
        <Badge variant="outline" className={cn('capitalize', roleConfig[user.role].color)}>
          {roleConfig[user.role].label}
        </Badge>
      ),
    },
    {
      key: 'tier',
      header: 'Tier',
      sortable: true,
      render: (user) => (
        <Badge variant="outline" className={cn('capitalize', tierConfig[user.tier].color)}>
          {tierConfig[user.tier].label}
        </Badge>
      ),
    },
    {
      key: 'elo',
      header: 'ELO',
      sortable: true,
      render: (user) => <span className="font-mono text-primary">{user.elo}</span>,
    },
    {
      key: 'matchesPlayed',
      header: 'Partite',
      sortable: true,
      render: (user) => <span className="font-mono">{user.matchesPlayed}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (user) => <StatusBadge status={user.status} />,
    },
    {
      key: 'actions',
      header: '',
      className: 'w-12',
      render: (user) => <ActionDropdown actions={getActions(user)} />,
    },
  ];

  return (
    <div className="space-y-6 animate-slide-in-up">
      <div>
        <h1 className="text-2xl font-bold text-glow-primary">Gestione Utenti</h1>
        <p className="text-muted-foreground text-sm">
          {filteredUsers.length} utenti trovati
        </p>
      </div>

      {/* Filters */}
      <TacticalCard>
        <TacticalCardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca username o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as UserRole | 'all')}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Ruolo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i ruoli</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>

              <Select value={tierFilter} onValueChange={(v) => setTierFilter(v as UserTier | 'all')}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i tier</SelectItem>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as UserStatus | 'all')}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli status</SelectItem>
                  <SelectItem value="active">Attivo</SelectItem>
                  <SelectItem value="warned">Avvertito</SelectItem>
                  <SelectItem value="suspended">Sospeso</SelectItem>
                  <SelectItem value="banned">Bannato</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TacticalCardContent>
      </TacticalCard>

      {/* Table */}
      <AdminTable
        data={filteredUsers}
        columns={columns}
        keyField="id"
        emptyMessage="Nessun utente trovato"
      />

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

export default AdminUsers;
