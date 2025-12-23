import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Crosshair, 
  Target, 
  Users, 
  Trophy, 
  Shield, 
  Zap,
  Store,
  ChevronRight,
  CheckCircle2,
  Mail,
  Loader2
} from 'lucide-react';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface BetaRegistration {
  email: string;
  username: string;
  experience: 'beginner' | 'intermediate' | 'expert';
  acceptTerms: boolean;
}

const features = [
  {
    icon: Target,
    title: 'Live Match Tracking',
    description: 'Monitora le tue partite in tempo reale con statistiche dettagliate',
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Crea e gestisci il tuo team con un sistema di ruoli avanzato',
  },
  {
    icon: Trophy,
    title: 'ELO Ranking System',
    description: 'Sistema di ranking competitivo basato sulle tue performance',
  },
  {
    icon: Shield,
    title: 'Campo Review',
    description: 'Recensioni e valutazioni dei campi da soft air',
  },
];

const stats = [
  { value: '500+', label: 'Beta Testers' },
  { value: '1,200+', label: 'Partite Simulate' },
  { value: '50+', label: 'Campi Partner' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const Landing: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showBetaForm, setShowBetaForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registration, setRegistration] = useState<BetaRegistration>({
    email: '',
    username: '',
    experience: 'intermediate',
    acceptTerms: false,
  });

  const handleDemoAccess = () => {
    // Accesso diretto alla demo senza autenticazione
    navigate('/demo');
  };

  const handleBetaRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registration.acceptTerms) {
      toast({
        title: 'Attenzione',
        description: 'Devi accettare i termini e condizioni',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage (in produzione, chiamata API)
    const betaList = JSON.parse(localStorage.getItem('ticops-beta-list') || '[]');
    betaList.push({
      ...registration,
      registeredAt: new Date().toISOString(),
      id: `beta_${Date.now()}`,
    });
    localStorage.setItem('ticops-beta-list', JSON.stringify(betaList));

    setIsSubmitting(false);
    
    toast({
      title: '🎉 Registrazione completata!',
      description: 'Controlla la tua email per le istruzioni di accesso',
    });

    // Redirect to demo
    setTimeout(() => {
      navigate('/register?beta=true');
    }, 2000);
  };

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
        
        <div className="container relative z-10 px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Logo & Badge */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/50 shadow-glow-primary">
                <Crosshair className="w-12 h-12 text-primary" />
              </div>
              <div className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm font-mono">
                <Zap className="w-4 h-4 inline mr-2" />
                BETA PROGRAM ATTIVO
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-display uppercase text-glow-primary tracking-tight">
                TICOPS
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                La piattaforma definitiva per gestire partite, team e statistiche di 
                <span className="text-primary font-semibold"> Soft Air</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton
                size="lg"
                onClick={handleDemoAccess}
                className="text-lg px-8"
              >
                <Target className="w-5 h-5 mr-2" />
                Prova la Demo
              </GlowButton>
              
              <button
                onClick={() => setShowBetaForm(true)}
                className="px-8 py-4 rounded-lg border border-border bg-card hover:bg-card/80 transition-all text-lg font-medium group"
              >
                Diventa Beta Tester
                <ChevronRight className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, i) => (
                <TacticalCard key={i} variant="small" className="text-center">
                  <TacticalCardContent className="p-4">
                    <div className="text-2xl md:text-3xl font-bold text-primary font-mono">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </TacticalCardContent>
                </TacticalCard>
              ))}
            </div>

            {/* Scroll indicator */}
            <button
              onClick={scrollToFeatures}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
            >
              <ChevronRight className="w-8 h-8 text-primary rotate-90" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display uppercase text-glow-primary mb-4">
              Funzionalità
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tutto quello che ti serve per portare le tue partite soft air al livello successivo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <TacticalCard 
                key={i} 
                glow="primary" 
                interactive
                className="group hover:scale-[1.02] transition-transform"
              >
                <TacticalCardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display uppercase mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </TacticalCardContent>
              </TacticalCard>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon: Servizi   */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="px-4 py-1.5 text-xs font-mono bg-accent/20 text-accent border border-accent/30 rounded-full">
              SERVIZI SEMPRE  
            </span>
            <h2 className="text-3xl md:text-4xl font-display uppercase mt-4 mb-3">Piattaforma Completa. Zero Costi.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              TicOps offre servizi professionali completamente   per giocatori, squadre e organizzatori
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TacticalCard className="p-6 border-accent/30">
              <Users className="h-10 w-10 text-accent mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Anagrafiche Complete</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Database completo di giocatori, squadre, campi e arbitri certificati
              </p>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>✓ Profili verificati</li>
                <li>✓ Statistiche dettagliate</li>
                <li>✓ Certificazioni arbitrali</li>
                <li>✓ Gestione roster team</li>
              </ul>
            </TacticalCard>

            <TacticalCard className="p-6 border-accent/30">
              <Store className="h-10 w-10 text-accent mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Marketplace Integrato</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Bacheca per compravendite tra giocatori senza commissioni
              </p>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>✓ Annunci illimitati</li>
                <li>✓ Chat sicura integrata</li>
                <li>✓ Sistema recensioni</li>
                <li>✓ Zero commissioni</li>
              </ul>
            </TacticalCard>

            <TacticalCard className="p-6 border-accent/30">
              <Shield className="h-10 w-10 text-accent mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">Gestione Federazioni</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Strumenti per organizzare tornei e gestire associazioni
              </p>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>✓ Tornei multi-campo</li>
                <li>✓ Tesseramento online</li>
                <li>✓ Classifiche ufficiali</li>
                <li>✓ Calendario eventi</li>
              </ul>
            </TacticalCard>
          </div>
        </div>
      </section>

      {/* Coming Soon: IoT Hardware */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="px-4 py-1.5 text-xs font-mono bg-primary/20 text-primary border border-primary/30 rounded-full">
              COMING SOON - Q2 2026
            </span>
            <h2 className="text-3xl md:text-4xl font-display uppercase mt-4 mb-3">Moduli IoT Professionali</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hardware modulare per tracking automatico e gestione shop con analytics avanzate
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TacticalCard glow="primary" className="p-8">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-display font-bold text-xl mb-3">TicOps IoT Tracking Kit</h3>
              <p className="text-muted-foreground mb-6">
                Sensori indossabili, beacon GPS e sistema automatico di kill detection per partite completamente tracciate
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-primary">📡</span>
                  <span className="text-muted-foreground">Player Tracker con GPS e accelerometro</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary">🎯</span>
                  <span className="text-muted-foreground">Smart Targets per CTF e Domination</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary">📍</span>
                  <span className="text-muted-foreground">Beacon network per indoor positioning</span>
                </div>
              </div>
            </TacticalCard>

            <TacticalCard glow="secondary" className="p-8">
              <Store className="h-12 w-12 text-secondary mb-4" />
              <h3 className="font-display font-bold text-xl mb-3">TicOps Shop Manager</h3>
              <p className="text-muted-foreground mb-6">
                Suite completa per negozi con inventory, analytics vendite e CRM per fidelizzazione clienti
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-secondary">📦</span>
                  <span className="text-muted-foreground">Inventory control con barcode scanner</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-secondary">📊</span>
                  <span className="text-muted-foreground">Dashboard analytics real-time</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-secondary">👥</span>
                  <span className="text-muted-foreground">CRM e loyalty program integrati</span>
                </div>
              </div>
            </TacticalCard>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              🎁 Beta Tester ricevono sconto early-bird fino al 40% sul primo ordine hardware
            </p>
            <GlowButton onClick={() => setShowBetaForm(true)}>
              Registrati per info sui moduli IoT
            </GlowButton>
          </div>
        </div>
      </section>

      {/* Beta Registration Modal */}
      {showBetaForm && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <TacticalCard 
            glow="primary" 
            className="max-w-md w-full animate-slide-in-up"
          >
            <TacticalCardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display uppercase text-glow-primary">
                  Beta Program
                </h3>
                <button
                  onClick={() => setShowBetaForm(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleBetaRegistration} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="beta-email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="beta-email"
                      type="email"
                      placeholder="tuo@email.com"
                      required
                      className="pl-10"
                      value={registration.email}
                      onChange={(e) => setRegistration(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="beta-username">Username desiderato *</Label>
                  <Input
                    id="beta-username"
                    type="text"
                    placeholder="Il tuo callsign"
                    required
                    value={registration.username}
                    onChange={(e) => setRegistration(prev => ({ ...prev, username: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="beta-experience">Esperienza Soft Air</Label>
                  <select
                    id="beta-experience"
                    className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
                    value={registration.experience}
                    onChange={(e) => setRegistration(prev => ({ 
                      ...prev, 
                      experience: e.target.value as any 
                    }))}
                  >
                    <option value="beginner">Principiante (0-6 mesi)</option>
                    <option value="intermediate">Intermedio (6-24 mesi)</option>
                    <option value="expert">Esperto (2+ anni)</option>
                  </select>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Checkbox
                    id="beta-terms"
                    checked={registration.acceptTerms}
                    onCheckedChange={(checked) => 
                      setRegistration(prev => ({ ...prev, acceptTerms: !!checked }))
                    }
                  />
                  <label 
                    htmlFor="beta-terms"
                    className="text-sm text-muted-foreground leading-tight cursor-pointer"
                  >
                    Accetto i termini e condizioni del programma Beta e autorizzo 
                    il trattamento dei dati per scopi di testing
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBetaForm(false)}
                    className="flex-1 px-4 py-3 rounded-lg border border-border hover:bg-card transition-colors"
                  >
                    Annulla
                  </button>
                  <GlowButton
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Invio...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Registrati
                      </>
                    )}
                  </GlowButton>
                </div>
              </form>

              <div className="mt-6 p-4 rounded-lg bg-secondary/10 border border-secondary/30">
                <p className="text-xs text-secondary font-mono">
                  ✓ Accesso anticipato alle nuove funzionalità
                  <br />
                  ✓ Supporto prioritario dal team
                  <br />
                  ✓ Badge esclusivo "Early Adopter"
                </p>
              </div>
            </TacticalCardContent>
          </TacticalCard>
        </div>
      )}

      {/* Footer CTA */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-display uppercase">
            Pronto a iniziare?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Unisciti alla community di giocatori che stanno rivoluzionando 
            il modo di giocare a soft air
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowButton
              size="lg"
              onClick={handleDemoAccess}
            >
              Prova la Demo Gratuita
            </GlowButton>
            <GlowButton
              size="lg"
              variant="secondary"
              onClick={() => setShowBetaForm(true)}
            >
              Registrati come Beta Tester
            </GlowButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
