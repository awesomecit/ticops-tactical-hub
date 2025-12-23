import React from 'react';
import { SocialContact } from '@/types/social';
import { SocialIcon } from './SocialIcon';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SocialLinksProps {
  contacts: SocialContact[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const platformColors: Record<string, string> = {
  discord: 'hover:text-[#5865F2] hover:bg-[#5865F2]/10',
  instagram: 'hover:text-[#E4405F] hover:bg-[#E4405F]/10',
  telegram: 'hover:text-[#0088cc] hover:bg-[#0088cc]/10',
  whatsapp: 'hover:text-[#25D366] hover:bg-[#25D366]/10',
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

const sizeClasses = {
  sm: 'h-7 w-7',
  md: 'h-9 w-9',
  lg: 'h-11 w-11',
};

const iconSizeClasses = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  contacts,
  size = 'md',
  className,
}) => {
  if (!contacts.length) return null;

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-1", className)}>
        {contacts.map((contact, index) => (
          <Tooltip key={`${contact.platform}-${index}`}>
            <TooltipTrigger asChild>
              <a
                href={getSocialUrl(contact)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center justify-center rounded-full border border-border/50 bg-background/50 text-muted-foreground transition-all duration-200",
                  sizeClasses[size],
                  platformColors[contact.platform]
                )}
              >
                <SocialIcon 
                  platform={contact.platform} 
                  className={iconSizeClasses[size]} 
                />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">{platformLabels[contact.platform]}</p>
              <p className="text-xs text-muted-foreground">@{contact.handle}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};
