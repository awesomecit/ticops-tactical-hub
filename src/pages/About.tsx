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

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground py-4">
        <p>© 2024 TicOps S.r.l. - Tutti i diritti riservati</p>
        <p className="mt-1">P.IVA: 00000000000 | REA: XX-000000</p>
      </div>
    </div>
  );
};

export default About;
