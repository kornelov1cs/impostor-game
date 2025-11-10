/**
 * Avatar System for Impostor Game
 *
 * Animal spy avatars with Shadow Theater aesthetic.
 * Each avatar features minimalist design with spy elements (fedora, sunglasses, trench coat).
 */

export interface Avatar {
  id: string;
  name: string;
  animal: string;
  description: string;
  color: string;
  accentColor: string;
  svgPath: string;
  personality: string;
}

export type AvatarId =
  | 'fox'
  | 'cat'
  | 'raccoon'
  | 'owl'
  | 'penguin'
  | 'bear'
  | 'rabbit'
  | 'wolf';

/**
 * Complete avatar database
 */
export const AVATARS: Record<AvatarId, Avatar> = {
  fox: {
    id: 'fox',
    name: 'Agent Fox',
    animal: 'Fox',
    description: 'Sly and cunning operative',
    color: '#d97642',
    accentColor: '#f4a460',
    svgPath: '/avatars/fox.svg',
    personality: 'sly',
  },
  cat: {
    id: 'cat',
    name: 'Agent Shadow',
    animal: 'Cat',
    description: 'Mysterious and stealthy',
    color: '#1a1a1a',
    accentColor: '#2d2d2d',
    svgPath: '/avatars/cat.svg',
    personality: 'mysterious',
  },
  raccoon: {
    id: 'raccoon',
    name: 'Agent Bandit',
    animal: 'Raccoon',
    description: 'Master of disguise',
    color: '#6b6b6b',
    accentColor: '#b8b8b8',
    svgPath: '/avatars/raccoon.svg',
    personality: 'bandit',
  },
  owl: {
    id: 'owl',
    name: 'Agent Wise',
    animal: 'Owl',
    description: 'Observant and analytical',
    color: '#8b6f47',
    accentColor: '#b89968',
    svgPath: '/avatars/owl.svg',
    personality: 'wise',
  },
  penguin: {
    id: 'penguin',
    name: 'Agent Dapper',
    animal: 'Penguin',
    description: 'Smooth and sophisticated',
    color: '#1a1a1a',
    accentColor: '#f8f9fa',
    svgPath: '/avatars/penguin.svg',
    personality: 'dapper',
  },
  bear: {
    id: 'bear',
    name: 'Agent Bravo',
    animal: 'Bear',
    description: 'Strong and dependable',
    color: '#6b4423',
    accentColor: '#8b5a3c',
    svgPath: '/avatars/bear.svg',
    personality: 'strong',
  },
  rabbit: {
    id: 'rabbit',
    name: 'Agent Swift',
    animal: 'Rabbit',
    description: 'Quick and agile',
    color: '#f5f5f5',
    accentColor: '#ffb6c1',
    svgPath: '/avatars/rabbit.svg',
    personality: 'quick',
  },
  wolf: {
    id: 'wolf',
    name: 'Agent Lone',
    animal: 'Wolf',
    description: 'Independent operator',
    color: '#6e7074',
    accentColor: '#8b8d91',
    svgPath: '/avatars/wolf.svg',
    personality: 'lone',
  },
};

/**
 * Get all available avatars as an array
 */
export function getAllAvatars(): Avatar[] {
  return Object.values(AVATARS);
}

/**
 * Get a specific avatar by ID
 */
export function getAvatarById(id: AvatarId): Avatar | undefined {
  return AVATARS[id];
}

/**
 * Get avatar by ID with type safety (throws if not found)
 */
export function getAvatarByIdStrict(id: AvatarId): Avatar {
  const avatar = AVATARS[id];
  if (!avatar) {
    throw new Error(`Avatar with id "${id}" not found`);
  }
  return avatar;
}

/**
 * Get a random avatar
 */
export function getRandomAvatar(): Avatar {
  const avatars = getAllAvatars();
  const randomIndex = Math.floor(Math.random() * avatars.length);
  const avatar = avatars[randomIndex];
  if (!avatar) {
    throw new Error('No avatars available');
  }
  return avatar;
}

/**
 * Get multiple random avatars (no duplicates)
 */
export function getRandomAvatars(count: number): Avatar[] {
  const allAvatars = getAllAvatars();

  if (count > allAvatars.length) {
    console.warn(`Requested ${count} avatars but only ${allAvatars.length} available`);
    count = allAvatars.length;
  }

  const shuffled = [...allAvatars].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get avatar IDs only
 */
export function getAllAvatarIds(): AvatarId[] {
  return Object.keys(AVATARS) as AvatarId[];
}

/**
 * Check if an avatar ID is valid
 */
export function isValidAvatarId(id: string): id is AvatarId {
  return id in AVATARS;
}

/**
 * Get avatar color by ID
 */
export function getAvatarColor(id: AvatarId): string {
  return AVATARS[id]?.color || '#1a1a1a';
}

/**
 * Get avatar accent color by ID
 */
export function getAvatarAccentColor(id: AvatarId): string {
  return AVATARS[id]?.accentColor || '#2d2d2d';
}

/**
 * Get avatar SVG path by ID
 */
export function getAvatarSvgPath(id: AvatarId): string {
  return AVATARS[id]?.svgPath || '';
}

/**
 * Get avatar name by ID
 */
export function getAvatarName(id: AvatarId): string {
  return AVATARS[id]?.name || 'Unknown Agent';
}

/**
 * Filter avatars by personality trait
 */
export function getAvatarsByPersonality(personality: string): Avatar[] {
  return getAllAvatars().filter(avatar => avatar.personality === personality);
}

/**
 * Get complementary avatar pairs (for team assignments, etc.)
 */
export const AVATAR_PAIRS = {
  felines: ['cat', 'fox', 'wolf'] as AvatarId[],
  clever: ['fox', 'raccoon', 'owl'] as AvatarId[],
  strong: ['bear', 'wolf'] as AvatarId[],
  quick: ['rabbit', 'cat'] as AvatarId[],
  formal: ['penguin', 'owl'] as AvatarId[],
} as const;

/**
 * Avatar rarity tiers (for potential unlock/achievement system)
 */
export const AVATAR_RARITY = {
  common: ['fox', 'cat', 'rabbit'] as AvatarId[],
  uncommon: ['raccoon', 'bear', 'owl'] as AvatarId[],
  rare: ['penguin', 'wolf'] as AvatarId[],
} as const;

/**
 * Get avatars by rarity tier
 */
export function getAvatarsByRarity(rarity: keyof typeof AVATAR_RARITY): Avatar[] {
  return AVATAR_RARITY[rarity].map(id => AVATARS[id]);
}

/**
 * Shadow Theater color palette used across all avatars
 */
export const SHADOW_THEATER_PALETTE = {
  // Base colors
  darkest: '#0a0a0a',
  darker: '#1a1a1a',
  dark: '#2d2d2d',
  medium: '#4a4a4a',
  light: '#6b6b6b',
  lighter: '#8b8b8b',
  lightest: '#b8b8b8',
  white: '#f8f9fa',

  // Accent colors
  orange: '#d97642',
  red: '#e63946',
  brown: '#8b6f47',
  pink: '#ffb6c1',
  tan: '#f4a460',
  gold: '#d4a574',
} as const;

/**
 * Export avatar count for validation
 */
export const AVATAR_COUNT = Object.keys(AVATARS).length;

/**
 * Default avatar (fallback)
 */
export const DEFAULT_AVATAR_ID: AvatarId = 'fox';
export const DEFAULT_AVATAR = AVATARS[DEFAULT_AVATAR_ID];
