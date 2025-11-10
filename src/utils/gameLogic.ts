import type { Player } from '../store/gameStore';

/**
 * Generate a unique player ID
 */
export function generatePlayerId(): string {
  return `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
}

/**
 * Assign roles to players
 * @param players - Array of players
 * @param impostorCount - Number of impostors (default: 1)
 * @param hasMrWhite - Whether to include Mr. White role (default: false)
 * @returns Updated players array with roles assigned
 */
export function assignRoles(
  players: Player[],
  impostorCount: number = 1,
  hasMrWhite: boolean = false
): Player[] {
  if (players.length < 3) {
    throw new Error('Need at least 3 players to start a game');
  }

  if (impostorCount >= players.length) {
    throw new Error('Too many impostors for the number of players');
  }

  // Shuffle players to randomize role assignment
  const shuffled = shuffleArray(players);

  // Reset all roles first
  const resetPlayers = shuffled.map((p) => ({
    ...p,
    isImpostor: false,
    isMrWhite: false,
  }));

  // Assign impostor roles
  for (let i = 0; i < impostorCount; i++) {
    resetPlayers[i]!.isImpostor = true;
  }

  // Assign Mr. White role (if enabled and there are enough players)
  if (hasMrWhite && resetPlayers.length > 3) {
    // Mr. White is always a civilian who doesn't know the word
    const nonImpostorIndex = impostorCount + Math.floor(Math.random() * (resetPlayers.length - impostorCount));
    resetPlayers[nonImpostorIndex]!.isMrWhite = true;
  }

  return resetPlayers;
}

/**
 * Count votes and determine the most voted player
 * @param players - Array of players with vote data
 * @returns Object with vote counts and most voted player
 */
export function countVotes(players: Player[]): {
  voteCounts: Record<string, number>;
  mostVotedPlayerId: string | null;
  isTie: boolean;
} {
  const voteCounts: Record<string, number> = {};

  // Count votes
  players.forEach((player) => {
    if (player.votedFor) {
      voteCounts[player.votedFor] = (voteCounts[player.votedFor] ?? 0) + 1;
    }
  });

  // Find most voted player
  let maxVotes = 0;
  let mostVotedPlayerId: string | null = null;
  let isTie = false;

  Object.entries(voteCounts).forEach(([playerId, votes]) => {
    if (votes > maxVotes) {
      maxVotes = votes;
      mostVotedPlayerId = playerId;
      isTie = false;
    } else if (votes === maxVotes && maxVotes > 0) {
      isTie = true;
    }
  });

  return { voteCounts, mostVotedPlayerId, isTie };
}

/**
 * Determine the winner of the game
 * @param players - Array of players
 * @param eliminatedPlayerId - ID of the eliminated player
 * @returns 'civilians' | 'impostors' | null
 */
export function determineWinner(
  players: Player[],
  eliminatedPlayerId: string | null
): 'civilians' | 'impostors' | null {
  if (!eliminatedPlayerId) {
    return null;
  }

  const eliminatedPlayer = players.find((p) => p.id === eliminatedPlayerId);

  if (!eliminatedPlayer) {
    return null;
  }

  // If an impostor was eliminated, civilians win
  if (eliminatedPlayer.isImpostor) {
    return 'civilians';
  }

  // If a civilian was eliminated, check remaining impostors
  const remainingImpostors = players.filter(
    (p) => p.isImpostor && p.id !== eliminatedPlayerId
  );
  const remainingCivilians = players.filter(
    (p) => !p.isImpostor && p.id !== eliminatedPlayerId
  );

  // If impostors equal or outnumber civilians, impostors win
  if (remainingImpostors.length >= remainingCivilians.length) {
    return 'impostors';
  }

  // Game continues
  return null;
}

/**
 * Validate player name
 * @param name - Player name to validate
 * @returns Object with isValid flag and optional error message
 */
export function validatePlayerName(name: string): {
  isValid: boolean;
  error?: string;
} {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return { isValid: false, error: 'Name cannot be empty' };
  }

  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }

  if (trimmedName.length > 20) {
    return { isValid: false, error: 'Name must be 20 characters or less' };
  }

  return { isValid: true };
}

/**
 * Format time remaining in MM:SS format
 * @param seconds - Time in seconds
 * @returns Formatted time string
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Calculate recommended impostor count based on player count
 * @param playerCount - Number of players
 * @returns Recommended number of impostors
 */
export function getRecommendedImpostorCount(playerCount: number): number {
  if (playerCount < 3) return 0;
  if (playerCount <= 5) return 1;
  if (playerCount <= 8) return 2;
  return Math.floor(playerCount / 4);
}
