import React from 'react';
import { Bell, BellOff, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAlertStore } from '@/stores/alertStore';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface AlertToggleProps {
  entityType: 'field' | 'shop' | 'product';
  entityId: string;
  entityName: string;
  variant?: 'button' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AlertToggle: React.FC<AlertToggleProps> = ({
  entityType,
  entityId,
  entityName,
  variant = 'button',
  size = 'md',
  className,
}) => {
  const { 
    hasAlertForEntity, 
    getAlertForEntity,
    createFieldAvailabilityAlert, 
    createShopDiscountAlert,
    toggleAlert,
    deleteAlert,
  } = useAlertStore();

  const hasAlert = hasAlertForEntity(entityType, entityId);
  const existingAlert = getAlertForEntity(entityType, entityId);

  const handleToggle = () => {
    if (existingAlert) {
      if (existingAlert.isActive) {
        toggleAlert(existingAlert.id);
        toast({
          title: 'Alert Disattivato',
          description: `Non riceverai più notifiche per ${entityName}`,
        });
      } else {
        toggleAlert(existingAlert.id);
        toast({
          title: 'Alert Riattivato',
          description: `Riceverai notifiche per ${entityName}`,
        });
      }
    } else {
      // Create new alert based on entity type
      if (entityType === 'field') {
        createFieldAvailabilityAlert(entityId, entityName);
      } else if (entityType === 'shop') {
        createShopDiscountAlert(entityId, entityName);
      }
      toast({
        title: 'Alert Creato!',
        description: `Riceverai notifiche per ${entityName}`,
      });
    }
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const buttonSizes = {
    sm: 'h-8 text-xs',
    md: 'h-9 text-sm',
    lg: 'h-10',
  };

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        className={cn(
          hasAlert && 'text-primary',
          className
        )}
        title={hasAlert ? 'Disattiva alert' : 'Attiva alert'}
      >
        {hasAlert ? (
          <BellRing className={cn(iconSizes[size], 'fill-current')} />
        ) : (
          <Bell className={iconSizes[size]} />
        )}
      </Button>
    );
  }

  return (
    <Button
      variant={hasAlert ? 'secondary' : 'outline'}
      size={size === 'lg' ? 'default' : 'sm'}
      onClick={handleToggle}
      className={cn(
        buttonSizes[size],
        hasAlert && 'bg-primary/10 border-primary/30 text-primary',
        className
      )}
    >
      {hasAlert ? (
        <>
          <BellRing className={cn(iconSizes[size], 'mr-2 fill-current')} />
          Alert Attivo
        </>
      ) : (
        <>
          <Bell className={cn(iconSizes[size], 'mr-2')} />
          Attiva Alert
        </>
      )}
    </Button>
  );
};

export default AlertToggle;