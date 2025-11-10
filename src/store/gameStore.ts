import { create } from 'zustand';
import { getRandomWord } from '../data/words';

/**
 * Player interface
 */
export interface Player {
  id: string;
  name: string;
  avatar: string;
  isImpostor: boolean;
  hasVoted: boolean;
  votedFor: string | null;
}

/**
 * Game state interface
 */
export interface GameState {
  // Game setup
  players: Player[];
  wordCategory: string | null;
  secretWord: string | null;
  currentPlayerIndex: number;

  // Game status
  gamePhase: 'setup' | 'reveal' | 'discussion' | 'voting' | 'results';
  currentRound: number;

  // Game results
  winner: 'civilians' | 'impostor' | null;
  eliminatedPlayerId: string | null;

  // Actions
  addPlayer: (player: Omit<Player, 'hasVoted' | 'votedFor' | 'isImpostor'>) => void;
  removePlayer: (playerId: string) => void;
  updatePlayer: (playerId: string, updates: Partial<Player>) => void;
  setGamePhase: (phase: GameState['gamePhase']) => void;
  startGame: (category: string) => void;
  nextPlayer: () => void;
  castVote: (voterId: string, targetId: string) => void;
  calculateVotes: () => string | null;
  setWinner: (winner: 'civilians' | 'impostor') => void;
  nextRound: () => void;
  resetGame: () => void;
}

/**
 * Initial state
 */
const initialState = {
  players: [],
  wordCategory: null,
  secretWord: null,
  currentPlayerIndex: 0,
  gamePhase: 'setup' as const,
  currentRound: 1,
  winner: null,
  eliminatedPlayerId: null,
};

/**
 * Game Store - Zustand store for game state management
 */
export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  addPlayer: (player) =>
    set((state) => ({
      players: [
        ...state.players,
        {
          ...player,
          isImpostor: false,
          hasVoted: false,
          votedFor: null,
        },
      ],
    })),

  removePlayer: (playerId) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== playerId),
    })),

  updatePlayer: (playerId, updates) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, ...updates } : p
      ),
    })),

  setGamePhase: (phase) =>
    set({ gamePhase: phase }),

  startGame: (category) => {
    const word = getRandomWord(category);
    if (!word) return;

    // Randomly select one player to be the impostor
    const players = get().players;
    const impostorIndex = Math.floor(Math.random() * players.length);

    set((state) => ({
      wordCategory: category,
      secretWord: word,
      players: state.players.map((p, idx) => ({
        ...p,
        isImpostor: idx === impostorIndex,
        hasVoted: false,
        votedFor: null,
      })),
      currentPlayerIndex: 0,
      gamePhase: 'reveal',
      currentRound: 1,
      winner: null,
      eliminatedPlayerId: null,
    }));
  },

  nextPlayer: () =>
    set((state) => {
      const nextIndex = state.currentPlayerIndex + 1;
      if (nextIndex >= state.players.length) {
        // All players have seen their words, move to discussion
        return {
          currentPlayerIndex: 0,
          gamePhase: 'discussion',
        };
      }
      return {
        currentPlayerIndex: nextIndex,
      };
    }),

  castVote: (voterId, targetId) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === voterId
          ? { ...p, hasVoted: true, votedFor: targetId }
          : p
      ),
    })),

  calculateVotes: () => {
    const { players } = get();
    const voteCounts: Record<string, number> = {};

    // Count votes
    players.forEach((player) => {
      if (player.votedFor) {
        voteCounts[player.votedFor] = (voteCounts[player.votedFor] || 0) + 1;
      }
    });

    // Find player with most votes
    let maxVotes = 0;
    let eliminatedId: string | null = null;

    Object.entries(voteCounts).forEach(([playerId, votes]) => {
      if (votes > maxVotes) {
        maxVotes = votes;
        eliminatedId = playerId;
      }
    });

    return eliminatedId;
  },

  setWinner: (winner) =>
    set({ winner }),

  nextRound: () =>
    set((state) => ({
      currentRound: state.currentRound + 1,
      gamePhase: 'discussion',
      currentPlayerIndex: 0,
      players: state.players.map((p) => ({
        ...p,
        hasVoted: false,
        votedFor: null,
      })),
    })),

  resetGame: () =>
    set({
      ...initialState,
      players: [], // Clear all players on reset
    }),
}));
