import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Target, 
  Users, 
  MapPin, 
  Trophy, 
  Shield, 
  Zap, 
  MessageSquare, 
  Award,
  ExternalLink,
  Mail,
  Instagram,
  Facebook,
  Store,
  Calendar,
  Search,
  Activity,
  Bell,
  Radio,
  Share2,
  Lock,
  Clock,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Check,
  Settings
} from 'lucide-react';
import { TacticalCard } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Feature {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
  category: 'gameplay' | 'management' | 'commerce' | 'social';
  longDescription: string;
  capabilities: string[];
  releaseDate: string;
  status: 'completed' | 'in-progress' | 'planned';
}

const features: Feature[] = [
  {
    id: 'field-search',
    icon: Search,
    title: 'Ricerca Campi Avanzata',
    description: 'Trova campi softair certificati con filtri per caratteristiche, recensioni e disponibilità.',
    category: 'management',
    badge: 'v1.0',
    longDescription: 'Sistema completo di ricerca campi con filtri avanzati per illuminazione, tipo terreno, amenities (parcheggio, bar, spogliatoi), recensioni utenti e disponibilità in tempo reale.',
    capabilities: [
      'Filtri multipli (terreno, illuminazione, servizi)',
      'Sistema recensioni 5 stelle',
      'Calendario disponibilità',
      'Galleria foto',
      'Mappa interattiva',
      'Contatto diretto gestore'
    ],
    releaseDate: '2024-10',
    status: 'completed'
  },
  {
    id: 'tactical-gameplay',
    icon: Target,
    title: 'Gameplay Tattico Live',
    description: 'Partecipa a partite CTF e TDM con tracking in tempo reale, kill declaration e sistema ELO.',
    category: 'gameplay',
    badge: 'Core',
    longDescription: 'Sistema di gameplay avanzato con mappa tattica interattiva, dichiarazione kill in tempo reale, sistema di conferma opponent, gestione conflitti con arbitro. Include tracking ELO competitivo con tier Bronze → Diamond.',
    capabilities: [
      'Mappa tattica con coni visione',
      'Dichiarazione kill con conferma',
      'Sistema ELO competitivo',
      'Statistiche dettagliate (K/D, accuracy)',
      'Elementi mappa (spawn, edifici, alberi)',
      'Obiettivi live (CTF, zone controllo)',
      'Feed attività real-time',
      'Sistema anti-cheat'
    ],
    releaseDate: '2024-11',
    status: 'completed'
  },
  {
    id: 'team-management',
    icon: Users,
    title: 'Gestione Team Completa',
    description: 'Crea o unisciti a team, gestisci roster, strategie, radio e scala le classifiche.',
    category: 'management',
    badge: 'Team',
    longDescription: 'Sistema completo di team management con gestione roster, radio team dedicata, strategia pre-match, statistiche aggregate e integrazione social media per coordinamento.',
    capabilities: [
      'Creazione team con tag e logo',
      'Gestione roster e ruoli',
      'Radio team criptata',
      'Strategia pre-match',
      'Statistiche aggregate',
      'Classifiche team',
      'Integrazione social',
      'Team inbox'
    ],
    releaseDate: '2024-10',
    status: 'completed'
  },
  {
    id: 'ranking-leaderboard',
    icon: Trophy,
    title: 'Classifiche & Tier System',
    description: 'Sistema di ranking con tier Bronze → Diamond, leaderboard globali e statistiche.',
    category: 'gameplay',
    badge: 'Competitive',
    longDescription: 'Sistema di ranking competitivo basato su ELO con 5 tier. Leaderboard globali con filtri per tier, regione, periodo. Statistiche dettagliate e confronto giocatori.',
    capabilities: [
      'Sistema ELO con 5 tier',
      'Leaderboard filtrabili',
      'Statistiche individuali',
      'Confronto giocatori',
      'Tier progression visuale',
      'Badge tier animati',
      'History match',
      'Promozione automatica'
    ],
    releaseDate: '2024-11',
    status: 'completed'
  },
  {
    id: 'referee-system',
    icon: Shield,
    title: 'Sistema Arbitri Certificati',
    description: 'Arbitri formati garantiscono fair play con strumenti professionali.',
    category: 'management',
    badge: 'Fair Play',
    longDescription: 'Sistema completo per arbitri con vista dedicata live match, gestione conflitti kill, replay video, statistiche arbitraggio e rating da giocatori/campi.',
    capabilities: [
      'Vista arbitro con eventi live',
      'Gestione conflitti kill',
      'Replay video integrato',
      'Note su decisioni',
      'Statistiche arbitraggio',
      'Rating arbitro',
      'Notifiche conflitti',
      'Report post-partita'
    ],
    releaseDate: '2024-11',
    status: 'completed'
  },
  {
    id: 'spectator-mode',
    icon: Zap,
    title: 'Live Tracking & Spectator',
    description: 'Segui partite in tempo reale come spettatore con mappa tattica e feed eventi.',
    category: 'gameplay',
    badge: 'Live',
    longDescription: 'Modalità spettatore per seguire partite live con mappa tattica, posizioni giocatori, score in tempo reale, feed kill e statistiche. Supporta streaming pubblico o privato.',
    capabilities: [
      'Mappa tattica con posizioni',
      'Score live',
      'Feed eventi real-time',
      'Statistiche live',
      'Cambio camera giocatori',
      'Modalità pubblico/privato',
      'Delay anti-ghosting',
      'Recording per replay'
    ],
    releaseDate: '2024-12',
    status: 'completed'
  },
  {
    id: 'chat-messaging',
    icon: MessageSquare,
    title: 'Chat & Messaggistica',
    description: 'Comunicazione integrata con chat diretta, canali team e messaggi a shop/campi.',
    category: 'social',
    badge: 'Social',
    longDescription: 'Sistema messaggistica completo con chat 1-to-1, canali team, messaggi diretti a shop/campi/arbitri, typing indicators, presenza online, notifiche push e messaggi vocali.',
    capabilities: [
      'Chat privata 1-to-1',
      'Canali team',
      'Contatto shop/campi',
      'Typing indicators',
      'Presenza online',
      'Notifiche push',
      'Allegati foto',
      'Emoji reactions',
      'Messaggi vocali',
      'Ricerca full-text'
    ],
    releaseDate: '2024-10',
    status: 'completed'
  },
  {
    id: 'achievements',
    icon: Award,
    title: 'Achievement & Rewards',
    description: 'Sblocca achievement, medaglie e ricompense per le tue imprese sul campo.',
    category: 'gameplay',
    badge: 'Progression',
    longDescription: 'Sistema completo con 50+ achievement, badge con abilità speciali, chest post-match con reward, animazioni sblocco live, progression path e integrazione XP.',
    capabilities: [
      '50+ achievement',
      'Badge con abilità speciali',
      'Chest reward post-match',
      'Animazioni in-game',
      'Progression tracking',
      'Showcase profilo',
      'Achievement segreti',
      'Seasonal achievement',
      'Bonus XP/ELO'
    ],
    releaseDate: '2024-11',
    status: 'completed'
  },
  {
    id: 'radio-advanced',
    icon: Radio,
    title: 'Radio Avanzata Match Live',
    description: 'Sistema radio con PTT, streaming audio, scanner frequenze e contromisure.',
    category: 'gameplay',
    badge: 'Tactical',
    longDescription: 'Radio avanzata con Push-To-Talk, streaming audio bidirezionale, suoni ricetrasmittente realistici, scanner frequenze nemiche (badge Ingegnere), jamming e encryption.',
    capabilities: [
      'PTT con feedback visivo',
      'Streaming audio real-time',
      'Suoni realistici',
      'Scanner frequenze',
      'Sistema jamming',
      'Frequenze criptate',
      'Canali multipli',
      'Volume regolabile',
      'Animazione interferenza'
    ],
    releaseDate: '2024-11',
    status: 'completed'
  },
  {
    id: 'marketplace',
    icon: Store,
    title: 'Mercatino P2P',
    description: 'Compra, vendi e scambia attrezzatura airsoft tra giocatori.',
    category: 'commerce',
    badge: 'Commerce',
    longDescription: 'Marketplace peer-to-peer per attrezzatura. Annunci con foto, condizioni prodotto, recensioni acquirente/venditore, badge verificato, chat integrata e storico transazioni.',
    capabilities: [
      'Annunci con foto multiple',
      'Categorie prodotti',
      'Condizioni (nuovo/usato)',
      'Sistema recensioni',
      'Badge Verificato',
      'Chat trattative',
      'Preferiti e alert',
      'Storico transazioni',
      'Report fraudolenti'
    ],
    releaseDate: '2024-12',
    status: 'completed'
  },
  {
    id: 'match-organizer',
    icon: Calendar,
    title: 'Match Organizer',
    description: 'Organizza partite incrociando disponibilità. Quick match con sconosciuti.',
    category: 'management',
    badge: 'Organizer',
    longDescription: 'Sistema per organizzazione match con calendario disponibilità, slot liberi campi, algoritmo matching automatico, Quick Match per trovare partite e notifiche.',
    capabilities: [
      'Calendario disponibilità',
      'Slot liberi campi',
      'Matching automatico',
      'Quick Match casuali',
      'Filtri geografici',
      'Notifiche match',
      'Wizard creazione',
      'Tracking RSVP',
      'Reminder automatici'
    ],
    releaseDate: '2024-12',
    status: 'completed'
  },
  {
    id: 'social-integration',
    icon: Share2,
    title: 'Integrazione Social',
    description: 'Connetti Discord, Telegram, WhatsApp, Instagram per coordinamento team.',
    category: 'social',
    badge: 'Community',
    longDescription: 'Integrazione con piattaforme social. Team/campo/shop possono pubblicare link social per coordinamento out-of-game, eventi community e supporto immediato.',
    capabilities: [
      'Link Discord server',
      'Gruppi Telegram',
      'WhatsApp rapido',
      'Instagram foto',
      'Facebook eventi',
      'Quick contact bar',
      'Auto-invite bot',
      'Notifiche cross-platform'
    ],
    releaseDate: '2024-10',
    status: 'completed'
  },
  {
    id: 'rbac',
    icon: Lock,
    title: 'RBAC & Permessi',
    description: 'Sistema ruoli con visibilità menu e protezione rotte.',
    category: 'management',
    badge: 'Security',
    longDescription: 'Role-Based Access Control con 6 ruoli (player, team_leader, referee, field_manager, shop_owner, admin). Capabilities specifiche, rotte protette, menu filtrati.',
    capabilities: [
      '6 ruoli predefiniti',
      'Capabilities granulari',
      'Protezione rotte',
      'Filtro menu dinamico',
      'Helper hasRole()',
      'Access Denied page',
      'Demo login test',
      'Audit log admin'
    ],
    releaseDate: '2024-10',
    status: 'completed'
  },
  {
    id: 'realtime',
    icon: Activity,
    title: 'Real-Time System',
    description: 'Comunicazione real-time via WebSocket per notifiche, chat e radio live.',
    category: 'gameplay',
    badge: 'Real-Time',
    longDescription: 'Sistema real-time con mock client (pronto per Supabase). Gestisce notifiche push, chat, radio live, presenza online, typing e sync stato match.',
    capabilities: [
      'Mock Realtime Client',
      'Notifiche push',
      'Chat istantanea',
      'Radio live',
      'Presenza online',
      'Typing indicators',
      'Sync match state',
      'Pronto per Supabase'
    ],
    releaseDate: '2024-11',
    status: 'completed'
  },
  {
    id: 'alert-system',
    icon: Bell,
    title: 'Sistema Alert',
    description: 'Imposta alert su shop (nuovi prodotti, sconti) e disponibilità campi.',
    category: 'management',
    badge: 'Notifications',
    longDescription: 'Sistema alert personalizzabile per notifiche shop, disponibilità campi, inviti team. Preferenze granulari con canali multipli (email, push, in-app).',
    capabilities: [
      'Alert shop',
      'Alert campi',
      'Alert team',
      'Preferenze per tipo',
      'Canali multipli',
      'Frequency control',
      'Mute temporaneo',
      'History alert'
    ],
    releaseDate: '2024-10',
    status: 'completed'
  },
  {
    id: 'multi-org',
    icon: ShoppingBag,
    title: 'Multi-Organizzazione',
    description: 'Gestione federazioni, organizzazioni e divisioni con visibilità RLS.',
    category: 'management',
    badge: 'In Development',
    longDescription: 'Sistema multi-organizzazione con gerarchia Federation → Organization → Division. 5 access level. Row Level Security per filtrare dati. Admin UI pulito.',
    capabilities: [
      'Hierarchy Fed/Org/Div',
      '5 access levels',
      'RLS filters automatici',
      'Division switcher',
      'Admin CRUD pages',
      'Migration script',
      'Clean admin theme',
      'Navigation guard'
    ],
    releaseDate: '2025-01 (Sprint 1-2)',
    status: 'in-progress'
  },
  {
    id: 'admin-entities',
    icon: Settings,
    title: 'Gestione Anagrafiche Admin',
    description: 'Pannello admin unificato per CRUD su tutte le entità.',
    category: 'management',
    badge: 'Planned',
    longDescription: 'Admin panel completo con anagrafiche unificate. DataTable generico, EntityFilters, form CRUD per Fields, Users, Teams, Matches, Referees, Shops. Theme pulito, pagination server-side.',
    capabilities: [
      'Clean AdminLayout',
      'DataTable riusabile',
      'EntityFilters',
      '6 entity pages',
      'Form modali CRUD',
      'Pagination server-side',
      'Breadcrumb navigation',
      'Bulk actions',
      'Export CSV/Excel'
    ],
    releaseDate: '2025-02 (Sprint 3-4)',
    status: 'planned'
  }
];

const About: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tutte', color: 'bg-primary/20 text-primary' },
    { id: 'gameplay', label: 'Gameplay', color: 'bg-blue-500/20 text-blue-400' },
    { id: 'management', label: 'Gestione', color: 'bg-yellow-500/20 text-yellow-400' },
    { id: 'commerce', label: 'Commercio', color: 'bg-green-500/20 text-green-400' },
    { id: 'social', label: 'Social', color: 'bg-purple-500/20 text-purple-400' }
  ];

  const filteredFeatures = categoryFilter === 'all' 
    ? features 
    : features.filter(f => f.category === categoryFilter);

  const getStatusBadge = (status: Feature['status']) => {
    const badges = {
      completed: { label: 'Completata', variant: 'default' as const, color: 'bg-green-500/20 text-green-400' },
      'in-progress': { label: 'In Sviluppo', variant: 'secondary' as const, color: 'bg-yellow-500/20 text-yellow-400' },
      planned: { label: 'Pianificata', variant: 'outline' as const, color: 'bg-gray-500/20 text-gray-400' }
    };
    return badges[status];
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 via-background to-accent/10 p-8 border border-border">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-display text-4xl font-bold tracking-wider text-primary">TIC</span>
            <span className="font-display text-4xl font-bold tracking-wider text-foreground">OPS</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">
            La Piattaforma Definitiva per il Softair Competitivo
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-6">
            TicOps rivoluziona il mondo del softair con tracking in tempo reale, 
            sistema di ranking competitivo e gestione completa di team e partite. 
            Unisciti alla community e porta il tuo gioco al livello successivo.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <GlowButton 
              onClick={() => navigate('/register')}
              className="gap-2"
            >
              Inizia Ora <ArrowRight className="w-4 h-4" />
            </GlowButton>
            <Button variant="outline" onClick={() => navigate('/games')}>
              Esplora Partite
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <TacticalCard className="p-4">
          <div className="text-3xl font-bold text-primary">17+</div>
          <div className="text-sm text-muted-foreground">Feature Complete</div>
        </TacticalCard>
        <TacticalCard className="p-4">
          <div className="text-3xl font-bold text-secondary">15</div>
          <div className="text-sm text-muted-foreground">Completate</div>
        </TacticalCard>
        <TacticalCard className="p-4">
          <div className="text-3xl font-bold text-accent">2</div>
          <div className="text-sm text-muted-foreground">In Sviluppo</div>
        </TacticalCard>
        <TacticalCard className="p-4">
          <div className="text-3xl font-bold text-foreground">85%</div>
          <div className="text-sm text-muted-foreground">Progetto</div>
        </TacticalCard>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <Button
            key={cat.id}
            variant={categoryFilter === cat.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategoryFilter(cat.id)}
            className={cn(
              'gap-2 transition-all',
              categoryFilter === cat.id && cat.color
            )}
          >
            {cat.label}
            <Badge variant="secondary" className="text-xs">
              {cat.id === 'all' 
                ? features.length 
                : features.filter(f => f.category === cat.id).length
              }
            </Badge>
          </Button>
        ))}
      </div>

      <Separator />

      {/* Features Grid */}
      <div>
        <h2 className="text-xl font-display font-bold text-foreground mb-6">
          Funzionalità della Piattaforma
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFeatures.map((feature) => {
            const Icon = feature.icon;
            const statusBadge = getStatusBadge(feature.status);
            
            return (
              <TacticalCard
                key={feature.id}
                className="p-6 cursor-pointer hover:border-primary/50 transition-all group"
                onClick={() => setSelectedFeature(feature)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  {feature.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  )}
                </div>

                <h3 className="text-base font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {feature.description}
                </p>

                <div className="flex items-center justify-between">
                  <Badge 
                    variant={statusBadge.variant}
                    className={cn('text-xs', statusBadge.color)}
                  >
                    {statusBadge.label}
                  </Badge>
                  
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </TacticalCard>
            );
          })}
        </div>
      </div>

      {/* Coming Soon: Servizi   */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-display font-bold text-foreground">🚀 Coming Soon - Servizi  </h2>
          <span className="px-3 py-1 text-xs font-mono bg-accent/20 text-accent border border-accent/30 rounded-full">
            BETA
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Anagrafiche */}
          <TacticalCard className="p-5 border-accent/30">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-6 w-6 text-accent" />
              <h3 className="font-display font-bold text-accent">Anagrafiche Complete</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Sistema completo di anagrafiche per giocatori, squadre, campi e arbitri. 
              Gestisci profili, statistiche e certificazioni in un unico database.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">✓ Profili giocatori verificati</li>
              <li className="flex items-center gap-2">✓ Registri squadre e roster</li>
              <li className="flex items-center gap-2">✓ Database campi certificati</li>
              <li className="flex items-center gap-2">✓ Albo arbitri qualificati</li>
            </ul>
          </TacticalCard>

          {/* Marketplace */}
          <TacticalCard className="p-5 border-accent/30">
            <div className="flex items-center gap-2 mb-3">
              <Store className="h-6 w-6 text-accent" />
              <h3 className="font-display font-bold text-accent">Bacheca Marketplace</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Piattaforma gratuita per compravendite e scambi tra giocatori. 
              Chat integrata, recensioni e sistema di reputazione.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">✓ Annunci compra/vendi/scambia</li>
              <li className="flex items-center gap-2">✓ Chat privata sicura</li>
              <li className="flex items-center gap-2">✓ Sistema recensioni venditori</li>
              <li className="flex items-center gap-2">✓ Nessuna commissione</li>
            </ul>
          </TacticalCard>

          {/* Federazioni */}
          <TacticalCard className="p-5 border-accent/30">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-6 w-6 text-accent" />
              <h3 className="font-display font-bold text-accent">Organizzazione Federazioni</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Strumenti per federazioni e associazioni per organizzare tornei, 
              gestire iscrizioni e certificazioni arbitrali.
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">✓ Gestione tornei multi-campo</li>
              <li className="flex items-center gap-2">✓ Tesseramento giocatori</li>
              <li className="flex items-center gap-2">✓ Calendario eventi nazionali</li>
              <li className="flex items-center gap-2">✓ Classifiche ufficiali</li>
            </ul>
          </TacticalCard>
        </div>
      </div>

      {/* Coming Soon: Moduli IoT Premium */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-display font-bold text-foreground">⚡ Coming Soon - Moduli IoT Professionali</h2>
          <span className="px-3 py-1 text-xs font-mono bg-primary/20 text-primary border border-primary/30 rounded-full">
            PREMIUM
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* IoT Tracking Kit */}
          <TacticalCard glow="primary" className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-7 w-7 text-primary" />
              <h3 className="font-display font-bold text-primary text-lg">TicOps IoT Tracking Kit</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Hardware modulare per tracking real-time delle partite con sensori indossabili, 
              beacon GPS e sistema di kill detection automatico.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-card/50 rounded border border-border">
                <h4 className="text-sm font-bold text-foreground mb-1">📡 Player Tracker Module</h4>
                <p className="text-xs text-muted-foreground">
                  Sensore indossabile con GPS, accelerometro e giroscopio per tracking movimenti, 
                  posizione in tempo reale e detection automatica kill.
                </p>
              </div>
              <div className="p-3 bg-card/50 rounded border border-border">
                <h4 className="text-sm font-bold text-foreground mb-1">🎯 Smart Target System</h4>
                <p className="text-xs text-muted-foreground">
                  Obiettivi IoT con sensori di impatto per modalità CTF e Domination. 
                  Rilevamento automatico capture/neutralizzazione.
                </p>
              </div>
              <div className="p-3 bg-card/50 rounded border border-border">
                <h4 className="text-sm font-bold text-foreground mb-1">📍 Field Beacon Network</h4>
                <p className="text-xs text-muted-foreground">
                  Sistema di beacon Bluetooth per indoor positioning accurato anche senza GPS. 
                  Triangolazione posizione con precisione minore dei 2 metri.
                </p>
              </div>
            </div>
          </TacticalCard>

          {/* Shop Monitoring */}
          <TacticalCard glow="secondary" className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Store className="h-7 w-7 text-secondary" />
              <h3 className="font-display font-bold text-secondary text-lg">TicOps Shop Manager</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Suite completa per negozi e armerie specializzate con inventory management, 
              analytics vendite e sistema CRM integrato.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-card/50 rounded border border-border">
                <h4 className="text-sm font-bold text-foreground mb-1">📦 Inventory & Stock Control</h4>
                <p className="text-xs text-muted-foreground">
                  Gestione magazzino con barcode scanner, alert giacenze minime, 
                  ordini automatici fornitori e tracking spedizioni.
                </p>
              </div>
              <div className="p-3 bg-card/50 rounded border border-border">
                <h4 className="text-sm font-bold text-foreground mb-1">📊 Sales Analytics Dashboard</h4>
                <p className="text-xs text-muted-foreground">
                  Analytics real-time su vendite, trend prodotti, margini e performance. 
                  Report automatici e previsioni demand.
                </p>
              </div>
              <div className="p-3 bg-card/50 rounded border border-border">
                <h4 className="text-sm font-bold text-foreground mb-1">👥 CRM & Loyalty Program</h4>
                <p className="text-xs text-muted-foreground">
                  Gestione clienti, programma fedeltà con punti, sconti personalizzati 
                  e notifiche push per nuovi arrivi e promozioni.
                </p>
              </div>
            </div>
          </TacticalCard>
        </div>

        <div className="mt-6 p-6 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 border border-primary/20 rounded-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h4 className="font-display font-bold text-foreground mb-2">🎁 Pre-ordina i moduli IoT</h4>
              <p className="text-sm text-muted-foreground">
                Registrati come Beta Tester per ricevere sconti early-bird fino al 40% 
                sul primo ordine di hardware IoT. Accesso anticipato Q2 2026.
              </p>
            </div>
            <GlowButton className="whitespace-nowrap">
              Voglio info sui moduli IoT
            </GlowButton>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TacticalCard className="p-4">
          <h3 className="font-display font-bold text-foreground mb-3">Link Rapidi</h3>
          <div className="space-y-2">
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="h-4 w-4" />
              Dashboard
            </Link>
            <Link to="/games" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="h-4 w-4" />
              Partite
            </Link>
            <Link to="/leaderboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="h-4 w-4" />
              Classifiche
            </Link>
            <Link to="/locations" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="h-4 w-4" />
              Campi
            </Link>
          </div>
        </TacticalCard>

        <TacticalCard className="p-4">
          <h3 className="font-display font-bold text-foreground mb-3">Contatti</h3>
          <div className="space-y-2">
            <a href="mailto:info@ticops.it" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
              info@ticops.it
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-4 w-4" />
              @ticops_official
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-4 w-4" />
              TicOps Italia
            </a>
          </div>
        </TacticalCard>

        <TacticalCard className="p-4">
          <h3 className="font-display font-bold text-foreground mb-3">Supporto</h3>
          <div className="space-y-2">
            <Link to="/settings" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="h-4 w-4" />
              Impostazioni Account
            </Link>
            <a href="#faq" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="h-4 w-4" />
              FAQ
            </a>
            <a href="mailto:support@ticops.it" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-4 w-4" />
              Assistenza
            </a>
          </div>
        </TacticalCard>
      </div>

      <Separator />

      {/* Legal Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-display font-bold text-foreground">Informazioni Legali</h2>
        
        <TacticalCard className="p-6">
          <h3 className="font-display font-bold text-foreground mb-3">Cookie Policy</h3>
          <p className="text-sm text-muted-foreground mb-4">
            TicOps utilizza cookie tecnici necessari per il funzionamento della piattaforma 
            e cookie analitici per migliorare l'esperienza utente. Continuando a navigare, 
            accetti l'utilizzo dei cookie secondo la nostra policy.
          </p>
          <div className="flex gap-2">
            <GlowButton variant="outline" size="sm">Gestisci Preferenze</GlowButton>
            <GlowButton variant="ghost" size="sm">Leggi Policy Completa</GlowButton>
          </div>
        </TacticalCard>

        <TacticalCard className="p-6">
          <h3 className="font-display font-bold text-foreground mb-3">Privacy & GDPR</h3>
          <p className="text-sm text-muted-foreground mb-4">
            I tuoi dati personali sono trattati in conformità al Regolamento UE 2016/679 (GDPR). 
            Hai diritto di accesso, rettifica, cancellazione e portabilità dei tuoi dati. 
            Per esercitare i tuoi diritti, contatta il nostro DPO all'indirizzo privacy@ticops.it.
          </p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Titolare del trattamento: TicOps S.r.l.</p>
            <p>• DPO: privacy@ticops.it</p>
            <p>• Finalità: Erogazione servizi, miglioramento UX, comunicazioni</p>
            <p>• Base giuridica: Consenso, esecuzione contratto, legittimo interesse</p>
          </div>
        </TacticalCard>

        <TacticalCard className="p-6">
          <h3 className="font-display font-bold text-foreground mb-3">Termini di Servizio & Disclaimer</h3>
          <p className="text-sm text-muted-foreground mb-4">
            L'utilizzo di TicOps implica l'accettazione dei presenti termini. La piattaforma 
            è fornita "as is" senza garanzie di alcun tipo.
          </p>
          <div className="text-xs text-muted-foreground space-y-2">
            <p><strong>Responsabilità:</strong> TicOps non è responsabile per danni diretti 
            o indiretti derivanti dall'uso della piattaforma o dalla partecipazione ad 
            attività di softair. Ogni utente partecipa sotto la propria responsabilità.</p>
            <p><strong>Sicurezza:</strong> Il softair è uno sport che richiede attrezzatura 
            di protezione adeguata. Tutti i partecipanti devono rispettare le normative 
            vigenti e i regolamenti dei campi.</p>
            <p><strong>Copyright:</strong> Tutti i contenuti, loghi, grafiche e software 
            sono proprietà di TicOps S.r.l. È vietata la riproduzione senza autorizzazione.</p>
          </div>
        </TacticalCard>

        <TacticalCard className="p-6">
          <h3 className="font-display font-bold text-foreground mb-3">Dichiarazione di Non Responsabilità</h3>
          <p className="text-sm text-muted-foreground">
            L'utente dichiara di essere maggiorenne e di assumersi ogni responsabilità 
            relativa alla propria partecipazione ad attività di softair. TicOps declina 
            ogni responsabilità per infortuni, danni a persone o cose, e qualsiasi 
            conseguenza derivante dall'uso della piattaforma o dalla partecipazione 
            agli eventi. L'utente si impegna a rispettare tutte le leggi applicabili, 
            i regolamenti dei campi e le norme di sicurezza.
          </p>
        </TacticalCard>
      </div>

      {/* Open Source Credits */}
      <div className="max-w-4xl mx-auto mb-12">
        <TacticalCard glow="secondary" className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg bg-secondary/20">
              <ExternalLink className="w-6 h-6 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                Tecnologie Open Source
              </h3>
              <p className="text-muted-foreground">
                TicOps è costruito con l'aiuto di tecnologie open-source e commerciali di alta qualità
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* tldraw Attribution */}
            <div className="p-4 rounded-lg bg-background/50 border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">Map Editor</h4>
                <Badge variant="outline">tldraw License</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Il nostro editor di mappe tattiche è powered by{' '}
                <a 
                  href="https://tldraw.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline inline-flex items-center gap-1"
                >
                  tldraw
                  <ExternalLink className="w-3 h-3" />
                </a>
                , un editor canvas infinito collaborativo. Utilizzato sotto licenza gratuita per progetti 
                con fatturato annuo inferiore a $25,000 USD.
              </p>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span>• Apache 2.0 (core)</span>
                <span>• tldraw License (SDK)</span>
              </div>
            </div>

            {/* React & Ecosystem */}
            <div className="p-4 rounded-lg bg-background/50 border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">Framework & UI</h4>
                <Badge variant="outline">MIT License</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Costruito con React, TypeScript, Vite, Tailwind CSS, shadcn/ui, e altre 
                librerie open-source di alta qualità.
              </p>
            </div>

            {/* Full List Link */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
              <span className="text-sm text-muted-foreground">
                Lista completa delle dipendenze e licenze
              </span>
              <a 
                href="https://github.com/yourusername/ticops-tactical-hub/blob/main/THIRD_PARTY_LICENSES.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1"
              >
                THIRD_PARTY_LICENSES.md
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="text-xs text-muted-foreground">
            <p className="mb-2">
              <strong>Compliance Note:</strong> TicOps rispetta tutti i termini di licenza delle 
              tecnologie utilizzate. I watermark richiesti sono mantenuti visibili, le attribuzioni 
              sono complete, e le licenze complete sono disponibili nei file di progetto.
            </p>
            <p>
              Se il fatturato di TicOps dovesse superare la soglia di $25,000 USD annui, 
              acquisteremo le licenze commerciali necessarie o migreremo a tecnologie alternative.
            </p>
          </div>
        </TacticalCard>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground py-4">
        <p>© 2024 TicOps S.r.l. - Tutti i diritti riservati</p>
        <p className="mt-1">P.IVA: 00000000000 | REA: XX-000000</p>
      </div>

      {/* Feature Detail Modal */}
      <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedFeature && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-4 rounded-lg bg-primary/10">
                    {React.createElement(selectedFeature.icon, { 
                      className: 'w-8 h-8 text-primary' 
                    })}
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-display font-bold">
                      {selectedFeature.title}
                    </DialogTitle>
                    <DialogDescription className="text-base mt-2">
                      {selectedFeature.longDescription}
                    </DialogDescription>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedFeature.badge && (
                    <Badge variant="secondary">{selectedFeature.badge}</Badge>
                  )}
                  <Badge 
                    variant={getStatusBadge(selectedFeature.status).variant}
                    className={getStatusBadge(selectedFeature.status).color}
                  >
                    {getStatusBadge(selectedFeature.status).label}
                  </Badge>
                  <Badge variant="outline">
                    {selectedFeature.releaseDate}
                  </Badge>
                </div>
              </DialogHeader>

              <Separator className="my-6" />

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-display font-bold text-foreground mb-4">
                    Capabilities
                  </h4>
                  <div className="space-y-2">
                    {selectedFeature.capabilities.map((cap, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border/50"
                      >
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedFeature.status === 'completed' && (
                  <div className="flex gap-3">
                    <GlowButton className="flex-1" onClick={() => {
                      setSelectedFeature(null);
                      navigate('/dashboard');
                    }}>
                      Prova Ora
                    </GlowButton>
                    <Button variant="outline" onClick={() => navigate('/settings')}>
                      Vai a Impostazioni
                    </Button>
                  </div>
                )}

                {selectedFeature.status === 'in-progress' && (
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h5 className="text-sm font-semibold text-foreground mb-1">
                          In Sviluppo
                        </h5>
                        <p className="text-xs text-muted-foreground">
                          Questa feature è attualmente in sviluppo. Release prevista: {selectedFeature.releaseDate}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedFeature.status === 'planned' && (
                  <div className="p-4 rounded-lg bg-gray-500/10 border border-gray-500/20">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <h5 className="text-sm font-semibold text-foreground mb-1">
                          Pianificata
                        </h5>
                        <p className="text-xs text-muted-foreground">
                          Questa feature è in roadmap. Release prevista: {selectedFeature.releaseDate}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default About;
