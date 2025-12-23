import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Crosshair, 
  Play, 
  Users, 
  Trophy,
  Zap,
  LogIn,
  UserPlus,
  ArrowLeft
} from 'lucide-react';
import { TacticalCard, TacticalCardContent } from '@/components/ui/TacticalCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { useAuthStore } from '@/stores/authStore';

const demoFeatures = [
  {
    icon: Play,
    title: 'Esplora le Partite',
    description: 'Naviga tra partite attive, upcoming e completate',
    route: '/games',
  },
  {
    icon: Users,
    title: 'Gestione Team',
    description: 'Scopri come funziona il sistema di team e reclutamento',
    route: '/team',
  },
  {
    icon: Trophy,
    title: 'Classifiche ELO',
    description: 'Vedi come funziona il ranking competitivo',
    route: '/leaderboard',
  },
];

const Demo: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuthStore();

  // Auto-login con utente demo se non autenticato
  useEffect(() => {
    if (!isAuthenticated) {
      const autoDemoLogin = async () => {
        await login('demo@softwar.it', 'demo123');
      };
      autoDemoLogin();
    }
  }, [isAuthenticated, login]);

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleRegisterRedirect = () => {
    navigate('/register?demo=true');
  };

  const handleBackToLanding = () => {
    navigate('/landing');
  };

  const handleFeatureExplore = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="container max-w-4xl">
        <div className="text-center mb-8">
          <button
            onClick={handleBackToLanding}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla Landing
          </button>

          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/50 shadow-glow-primary mx-auto mb-6">
            <Crosshair className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-display uppercase text-glow-primary mb-4">
            Modalità Demo
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Esplora TicOps senza limiti. Sei loggato come utente demo con accesso 
            completo a tutte le funzionalità.
          </p>
        </div>

        {/* Coming Soon Banner */}
        <TacticalCard glow="primary" className="mb-6 p-6 border-primary/30">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-display font-bold text-lg">🚀 Prossime funzionalità</h3>
                <span className="px-2 py-0.5 text-xs font-mono bg-accent/20 text-accent border border-accent/30 rounded">
                  COMING SOON
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Stiamo sviluppando moduli IoT per tracking automatico, gestione shop professionali 
                e servizi sempre   per giocatori e federazioni.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 bg-card border border-border rounded-full">📡 IoT Tracking Kit</span>
                <span className="px-3 py-1 bg-card border border-border rounded-full">📦 Shop Manager</span>
                <span className="px-3 py-1 bg-card border border-border rounded-full">👥 Anagrafiche Complete</span>
                <span className="px-3 py-1 bg-card border border-border rounded-full">🛒 Marketplace</span>
                <span className="px-3 py-1 bg-card border border-border rounded-full">🏆 Gestione Federazioni</span>
              </div>
            </div>
          </div>
        </TacticalCard>

        {/* Coming Soon Banner */}
        <TacticalCard glow="primary" className="mb-6 p-6 border-primary/30">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-display font-bold text-lg">🚀 Prossime funzionalità</h3>
                <span className="px-2 py-0.5 text-xs font-mono bg-accent/20 text-accent border border-accent/30 rounded">
                  COMING SOON
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Stiamo sviluppando moduli IoT per tracking automatico, gestione shop professionali 
                e servizi sempre   per giocatori e federazioni.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 bg-card border border-border rounded-full">📡 IoT Tracking Kit</span>
                <span className="px-3 py-1 bg-card border border-border rounded-full">📦 Shop Manager</span>
                <span className="px-3 py-1 bg-card border border-border rounded-full">👥 Anagrafiche Complete</span>
                <span className="px-3 py-1 bg-card border border-border rounded-full">🛒 Marketplace</span>
                <span className="px-3 py-1 bg-card border border-border rounded-full">🏆 Gestione Federazioni</span>
              </div>
            </div>
          </div>
        </TacticalCard>

        {/* Demo Features Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {demoFeatures.map((feature, i) => (
            <TacticalCard 
              key={i} 
              glow="primary" 
              interactive
              className="cursor-pointer group hover:scale-105 transition-transform"
              onClick={() => handleFeatureExplore(feature.route)}
            >
              <TacticalCardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display uppercase mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </TacticalCardContent>
            </TacticalCard>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Dashboard Access */}
          <TacticalCard glow="primary" scanlines>
            <TacticalCardContent className="p-6">
              <h3 className="text-xl font-display uppercase mb-4">
                🎮 Accedi alla Dashboard
              </h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Sei già loggato come utente demo. Esplora dashboard, partite, team e classifiche.
              </p>
              <GlowButton
                onClick={() => navigate('/')}
                className="w-full"
              >
                <Play className="w-4 h-4 mr-2" />
                Vai alla Dashboard
              </GlowButton>
            </TacticalCardContent>
          </TacticalCard>

          {/* Create Account */}
          <TacticalCard glow="secondary">
            <TacticalCardContent className="p-6">
              <h3 className="text-xl font-display uppercase mb-4">
                ⭐ Crea il tuo Account
              </h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Ti piace quello che vedi? Registrati per salvare i tuoi progressi e competere nelle classifiche.
              </p>
              <div className="space-y-3">
                <GlowButton
                  variant="secondary"
                  onClick={handleRegisterRedirect}
                  className="w-full"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Registrati Gratis
                </GlowButton>
                <button
                  onClick={handleLoginRedirect}
                  className="w-full px-4 py-2 rounded-lg border border-border hover:bg-card transition-colors text-sm"
                >
                  <LogIn className="w-4 h-4 inline mr-2" />
                  Ho già un account
                </button>
              </div>
            </TacticalCardContent>
          </TacticalCard>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 p-4 rounded-lg bg-accent/10 border border-accent/30 text-center">
          <p className="text-sm text-accent font-mono">
            ℹ️ <strong>Modalità Demo Attiva</strong> - I dati non verranno salvati. 
            Registrati per mantenere i tuoi progressi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Demo;
