import { useTranslation } from 'react-i18next';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DEMO_USERS } from '@/mocks/demoUsers';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/types';

interface DemoLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoLoginModal = ({ open, onOpenChange }: DemoLoginModalProps) => {
  const { loginAsRole, isLoading } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDemoLogin = async (role: UserRole) => {
    const result = await loginAsRole(role);
    
    if (result.success) {
      toast({
        title: `Accesso come ${DEMO_USERS.find(u => u.role === role)?.label}`,
        description: 'Demo attiva con dati di esempio',
      });
      onOpenChange(false);
      
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'referee') {
        navigate('/referee/demo');
      } else {
        navigate('/');
      }
    } else {
      toast({
        title: 'Errore',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Accesso Demo Rapido</DialogTitle>
          <DialogDescription>
            Prova l'app con diversi ruoli per esplorare le funzionalità
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-3 mt-4">
          {DEMO_USERS.map((demoUser) => (
            <Card
              key={demoUser.id}
              className="p-4 cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => handleDemoLogin(demoUser.role)}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{demoUser.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{demoUser.label}</h3>
                    <Badge variant="outline" className="text-xs">
                      {demoUser.role}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {demoUser.description}
                  </p>
                </div>
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                ) : null}
              </div>
            </Card>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          I dati demo vengono resettati ad ogni sessione
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default DemoLoginModal;
