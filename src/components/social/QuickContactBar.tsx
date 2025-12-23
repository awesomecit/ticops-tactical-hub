import React from 'react';
import { SocialContact } from '@/types/social';
import { SocialIcon } from './SocialIcon';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickContactBarProps {
  contacts: SocialContact[];
  entityName: string;
  className?: string;
  variant?: 'default' | 'compact';
}

const platformColors: Record<string, { bg: string; text: string; hover: string }> = {
  discord: { 
    bg: 'bg-[#5865F2]', 
    text: 'text-white', 
    hover: 'hover:bg-[#4752C4]' 
  },
  instagram: { 
    bg: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]', 
    text: 'text-white', 
    hover: 'hover:opacity-90' 
  },
  telegram: { 
    bg: 'bg-[#0088cc]', 
    text: 'text-white', 
    hover: 'hover:bg-[#006699]' 
  },
  whatsapp: { 
    bg: 'bg-[#25D366]', 
    text: 'text-white', 
    hover: 'hover:bg-[#128C7E]' 
  },
};

const platformLabels: Record<string, string> = {
  discord: 'Discord',
  instagram: 'Instagram',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
};

const getSocialUrl = (contact: SocialContact): string => {
  if (contact.url) return contact.url;
  
  switch (contact.platform) {
    case 'discord':
      return `https://discord.com/users/${contact.handle}`;
    case 'instagram':
      return `https://instagram.com/${contact.handle}`;
    case 'telegram':
      return `https://t.me/${contact.handle}`;
    case 'whatsapp':
      return `https://wa.me/${contact.handle.replace(/\D/g, '')}`;
    default:
      return '#';
  }
};

export const QuickContactBar: React.FC<QuickContactBarProps> = ({
  contacts,
  entityName,
  className,
  variant = 'default',
}) => {
  if (!contacts.length) return null;

  if (variant === 'compact') {
    return (
      <div className={cn("flex items-center gap-2 flex-wrap", className)}>
        {contacts.map((contact, index) => {
          const colors = platformColors[contact.platform];
          return (
            <a
              key={`${contact.platform}-${index}`}
              href={getSocialUrl(contact)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                colors.bg,
                colors.text,
                colors.hover
              )}
            >
              <SocialIcon platform={contact.platform} className="h-4 w-4" />
              <span>{platformLabels[contact.platform]}</span>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm text-muted-foreground font-medium">
        Contatta {entityName}
      </p>
      <div className="flex flex-col gap-2">
        {contacts.map((contact, index) => {
          const colors = platformColors[contact.platform];
          return (
            <Button
              key={`${contact.platform}-${index}`}
              asChild
              className={cn(
                "w-full justify-between",
                colors.bg,
                colors.text,
                colors.hover
              )}
            >
              <a
                href={getSocialUrl(contact)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center gap-2">
                  <SocialIcon platform={contact.platform} className="h-5 w-5" />
                  <span>{platformLabels[contact.platform]}</span>
                </span>
                <span className="flex items-center gap-1 text-xs opacity-80">
                  @{contact.handle}
                  <ExternalLink className="h-3 w-3" />
                </span>
              </a>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
