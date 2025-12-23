import React from 'react';
import { Link } from 'react-router-dom';
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
  Calendar
} from 'lucide-react';
import { TacticalCard } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Separator } from '@/components/ui/separator';

const features = [
  {
    icon: Target,
    title: 'Gameplay Tattico',
    description: 'Partecipa a partite CTF e TDM con tracking in tempo reale, kill declaration e sistema ELO competitivo.'
  },
  {
    icon: Users,
    title: 'Sistema Team',
    description: 'Crea o unisciti a team, gestisci roster, strategie e scala le classifiche insieme ai tuoi compagni.'
  },
  {
    icon: MapPin,
    title: 'Campi Verificati',
    description: 'Trova campi softair certificati vicino a te con mappe, regolamenti e prenotazioni integrate.'
  },
  {
    icon: Trophy,
    title: 'Classifiche & Tier',
    description: 'Sistema di ranking con tier Bronze → Diamond, leaderboard globali e statistiche dettagliate.'
  },
  {
    icon: Shield,
    title: 'Arbitri Certificati',
    description: 'Arbitri formati e valutati dalla community garantiscono partite fair e professionali.'
  },
  {
    icon: Zap,
    title: 'Live Tracking',
    description: 'Segui le partite in tempo reale come spettatore o arbitro con mappa tattica e feed eventi.'
  },
  {
    icon: MessageSquare,
    title: 'Chat & Radio Team',
    description: 'Comunicazione integrata con canali team, chat private, radio PTT e scanner frequenze.'
  },
  {
    icon: Award,
    title: 'Achievement System',
    description: 'Sblocca achievement, medaglie e ricompense per le tue imprese sul campo.'
  },
  {
    icon: Store,
    title: 'Mercatino',
    description: 'Compra, vendi e scambia attrezzatura con altri giocatori. Recensioni e chat integrate.'
  },
  {
    icon: Calendar,
    title: 'Match Organizer',
    description: 'Organizza partite incrociando disponibilità giocatori e campi. Quick match con sconosciuti.'
  }
];

const About: React.FC = () => {
  return (
    <div className="space-y-8">
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
          <p className="text-muted-foreground max-w-2xl">
            TicOps rivoluziona il mondo del softair con tracking in tempo reale, 
            sistema di ranking competitivo e gestione completa di team e partite. 
            Unisciti alla community e porta il tuo gioco al livello successivo.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-xl font-display font-bold text-foreground mb-4">Funzionalità</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <TacticalCard key={index} className="p-4">
              <feature.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-display font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </TacticalCard>
          ))}
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

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground py-4">
        <p>© 2024 TicOps S.r.l. - Tutti i diritti riservati</p>
        <p className="mt-1">P.IVA: 00000000000 | REA: XX-000000</p>
      </div>
    </div>
  );
};

export default About;
