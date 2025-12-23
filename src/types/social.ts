export type SocialPlatform = 'discord' | 'instagram' | 'telegram' | 'whatsapp';

export interface SocialContact {
  platform: SocialPlatform;
  handle: string;
  url?: string;
}

export interface EntitySocialContacts {
  entityId: string;
  entityType: 'team' | 'field' | 'user';
  contacts: SocialContact[];
}
