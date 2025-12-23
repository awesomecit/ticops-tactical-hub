import { EntitySocialContacts, SocialContact } from '@/types/social';

// Mock social contacts for teams
export const teamSocialContacts: EntitySocialContacts[] = [
  {
    entityId: 'team-1',
    entityType: 'team',
    contacts: [
      { platform: 'discord', handle: 'shadowhunters' },
      { platform: 'instagram', handle: 'shadow_hunters_airsoft' },
      { platform: 'telegram', handle: 'shadowhunters_chat' },
      { platform: 'whatsapp', handle: '+393331234567' },
    ],
  },
  {
    entityId: 'team-2',
    entityType: 'team',
    contacts: [
      { platform: 'discord', handle: 'nightwolves' },
      { platform: 'instagram', handle: 'night_wolves_team' },
    ],
  },
];

// Mock social contacts for fields
export const fieldSocialContacts: EntitySocialContacts[] = [
  {
    entityId: 'field-1',
    entityType: 'field',
    contacts: [
      { platform: 'instagram', handle: 'tactical_arena_milano' },
      { platform: 'whatsapp', handle: '+393339876543' },
      { platform: 'telegram', handle: 'tactical_arena' },
    ],
  },
  {
    entityId: 'field-2',
    entityType: 'field',
    contacts: [
      { platform: 'discord', handle: 'urban_combat_zone', url: 'https://discord.gg/ucz123' },
      { platform: 'instagram', handle: 'urban_combat_zone' },
    ],
  },
];

// Mock social contacts for users/roles
export const userSocialContacts: EntitySocialContacts[] = [
  {
    entityId: 'user-1',
    entityType: 'user',
    contacts: [
      { platform: 'discord', handle: 'shadowleader#1234' },
      { platform: 'telegram', handle: 'shadow_leader' },
    ],
  },
];

// Helper function to get contacts by entity
export const getSocialContactsByEntity = (
  entityId: string,
  entityType: 'team' | 'field' | 'user'
): SocialContact[] => {
  let contacts: EntitySocialContacts[] = [];
  
  switch (entityType) {
    case 'team':
      contacts = teamSocialContacts;
      break;
    case 'field':
      contacts = fieldSocialContacts;
      break;
    case 'user':
      contacts = userSocialContacts;
      break;
  }
  
  const entity = contacts.find(c => c.entityId === entityId);
  return entity?.contacts || [];
};
