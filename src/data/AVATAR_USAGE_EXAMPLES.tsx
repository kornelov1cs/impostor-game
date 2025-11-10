/**
 * Avatar System Usage Examples
 *
 * This file demonstrates how to use the avatar system in various scenarios
 * throughout the Impostor game application.
 */

import React from 'react';
import {
  AVATARS,
  getAllAvatars,
  getAvatarById,
  getRandomAvatar,
  getRandomAvatars,
  getAvatarColor,
  getAvatarName,
  isValidAvatarId,
  type Avatar,
  type AvatarId,
} from './avatars';

// ============================================================================
// Example 1: Simple Avatar Display Component
// ============================================================================

interface AvatarDisplayProps {
  avatarId: AvatarId;
  size?: number;
  className?: string;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  avatarId,
  size = 64,
  className = '',
}) => {
  const avatar = getAvatarById(avatarId);

  if (!avatar) {
    return <div>Avatar not found</div>;
  }

  return (
    <div className={`avatar-display ${className}`}>
      <img
        src={avatar.svgPath}
        alt={avatar.name}
        width={size}
        height={size}
        style={{
          borderRadius: '50%',
          border: `3px solid ${avatar.color}`,
        }}
      />
    </div>
  );
};

// ============================================================================
// Example 2: Avatar Selector Component
// ============================================================================

interface AvatarSelectorProps {
  selectedId?: AvatarId;
  onSelect: (avatarId: AvatarId) => void;
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  selectedId,
  onSelect,
}) => {
  const avatars = getAllAvatars();

  return (
    <div className="avatar-selector grid grid-cols-4 gap-4 p-4">
      {avatars.map((avatar) => (
        <button
          key={avatar.id}
          onClick={() => onSelect(avatar.id as AvatarId)}
          className={`
            relative p-2 rounded-lg transition-all
            ${selectedId === avatar.id ? 'ring-4 scale-110' : 'hover:scale-105'}
          `}
          style={{
            backgroundColor: selectedId === avatar.id ? avatar.color + '20' : 'transparent',
            borderColor: avatar.color,
          }}
        >
          <img
            src={avatar.svgPath}
            alt={avatar.name}
            className="w-full h-auto"
          />
          <div className="mt-2 text-xs font-medium text-center">
            {avatar.animal}
          </div>
        </button>
      ))}
    </div>
  );
};

// ============================================================================
// Example 3: Player Card with Avatar
// ============================================================================

interface PlayerCardProps {
  avatarId: AvatarId;
  playerName: string;
  status?: 'active' | 'eliminated' | 'impostor';
  isCurrentPlayer?: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  avatarId,
  playerName,
  status = 'active',
  isCurrentPlayer = false,
}) => {
  const avatar = getAvatarById(avatarId);

  if (!avatar) return null;

  const statusColors = {
    active: avatar.color,
    eliminated: '#666666',
    impostor: '#e63946',
  };

  return (
    <div
      className="player-card p-4 rounded-lg shadow-lg"
      style={{
        backgroundColor: isCurrentPlayer ? avatar.color + '10' : '#2d2d2d',
        borderLeft: `4px solid ${statusColors[status]}`,
      }}
    >
      <div className="flex items-center gap-3">
        <img
          src={avatar.svgPath}
          alt={avatar.name}
          className="w-12 h-12 rounded-full"
          style={{
            border: `2px solid ${statusColors[status]}`,
            opacity: status === 'eliminated' ? 0.5 : 1,
          }}
        />
        <div className="flex-1">
          <div className="font-bold text-white">{playerName}</div>
          <div className="text-xs text-gray-400">{avatar.name}</div>
        </div>
        {isCurrentPlayer && (
          <div className="text-xs bg-white text-black px-2 py-1 rounded">
            You
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Example 4: Random Avatar Assignment
// ============================================================================

export function assignRandomAvatarsToPlayers(playerNames: string[]) {
  const avatars = getRandomAvatars(playerNames.length);

  return playerNames.map((name, index) => ({
    playerName: name,
    avatar: avatars[index],
    avatarId: avatars[index].id,
  }));
}

// Usage:
// const players = ['Alice', 'Bob', 'Charlie', 'Diana'];
// const playersWithAvatars = assignRandomAvatarsToPlayers(players);

// ============================================================================
// Example 5: Avatar Badge/Icon
// ============================================================================

interface AvatarBadgeProps {
  avatarId: AvatarId;
  size?: 'sm' | 'md' | 'lg';
  showBorder?: boolean;
}

export const AvatarBadge: React.FC<AvatarBadgeProps> = ({
  avatarId,
  size = 'md',
  showBorder = true,
}) => {
  const avatar = getAvatarById(avatarId);
  if (!avatar) return null;

  const sizes = {
    sm: 24,
    md: 40,
    lg: 64,
  };

  return (
    <img
      src={avatar.svgPath}
      alt={avatar.animal}
      width={sizes[size]}
      height={sizes[size]}
      className="rounded-full"
      style={{
        border: showBorder ? `2px solid ${avatar.color}` : 'none',
      }}
    />
  );
};

// ============================================================================
// Example 6: Avatar with Tooltip
// ============================================================================

export const AvatarWithTooltip: React.FC<{ avatarId: AvatarId }> = ({
  avatarId,
}) => {
  const avatar = getAvatarById(avatarId);
  if (!avatar) return null;

  return (
    <div className="relative group">
      <img
        src={avatar.svgPath}
        alt={avatar.name}
        className="w-12 h-12 rounded-full cursor-pointer"
      />
      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
        {avatar.name} - {avatar.description}
      </div>
    </div>
  );
};

// ============================================================================
// Example 7: Voting Screen with Avatars
// ============================================================================

interface VotingScreenProps {
  players: Array<{
    id: string;
    name: string;
    avatarId: AvatarId;
  }>;
  onVote: (playerId: string) => void;
  currentPlayerId: string;
}

export const VotingScreen: React.FC<VotingScreenProps> = ({
  players,
  onVote,
  currentPlayerId,
}) => {
  return (
    <div className="voting-screen p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Vote to Eliminate a Player
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {players
          .filter((p) => p.id !== currentPlayerId)
          .map((player) => {
            const avatar = getAvatarById(player.avatarId);
            if (!avatar) return null;

            return (
              <button
                key={player.id}
                onClick={() => onVote(player.id)}
                className="vote-button p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
                style={{
                  borderTop: `4px solid ${avatar.color}`,
                }}
              >
                <img
                  src={avatar.svgPath}
                  alt={avatar.name}
                  className="w-full h-auto mb-2"
                />
                <div className="text-white font-medium">{player.name}</div>
                <div className="text-gray-400 text-sm">{avatar.animal}</div>
              </button>
            );
          })}
      </div>
    </div>
  );
};

// ============================================================================
// Example 8: Avatar Color Theming
// ============================================================================

export const AvatarThemedContainer: React.FC<{
  avatarId: AvatarId;
  children: React.ReactNode;
}> = ({ avatarId, children }) => {
  const color = getAvatarColor(avatarId);

  return (
    <div
      className="themed-container p-6 rounded-lg"
      style={{
        backgroundColor: color + '10', // 10% opacity
        borderLeft: `4px solid ${color}`,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// Example 9: Avatar Animation Component
// ============================================================================

export const AnimatedAvatar: React.FC<{
  avatarId: AvatarId;
  isTalking?: boolean;
  isActive?: boolean;
}> = ({ avatarId, isTalking = false, isActive = false }) => {
  const avatar = getAvatarById(avatarId);
  if (!avatar) return null;

  return (
    <div
      className={`
        relative w-16 h-16
        ${isTalking ? 'animate-bounce' : ''}
        ${isActive ? 'ring-4 ring-offset-2' : ''}
      `}
      style={{
        ringColor: avatar.color,
      }}
    >
      <img
        src={avatar.svgPath}
        alt={avatar.name}
        className="w-full h-full rounded-full"
      />
      {isTalking && (
        <div
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-ping"
          style={{ backgroundColor: avatar.color }}
        />
      )}
    </div>
  );
};

// ============================================================================
// Example 10: Custom Hook for Avatar Management
// ============================================================================

export function useAvatar(avatarId: AvatarId | undefined) {
  const [currentAvatarId, setCurrentAvatarId] = React.useState<AvatarId>(
    avatarId || 'fox'
  );

  const avatar = getAvatarById(currentAvatarId);

  const selectRandomAvatar = React.useCallback(() => {
    const randomAvatar = getRandomAvatar();
    setCurrentAvatarId(randomAvatar.id as AvatarId);
  }, []);

  const selectAvatar = React.useCallback((id: AvatarId) => {
    if (isValidAvatarId(id)) {
      setCurrentAvatarId(id);
    }
  }, []);

  return {
    avatar,
    avatarId: currentAvatarId,
    selectAvatar,
    selectRandomAvatar,
  };
}

// Usage:
// const { avatar, selectAvatar, selectRandomAvatar } = useAvatar('cat');

// ============================================================================
// Example 11: Lobby Display with All Players
// ============================================================================

interface LobbyDisplayProps {
  players: Array<{
    id: string;
    name: string;
    avatarId: AvatarId;
    isReady: boolean;
  }>;
}

export const LobbyDisplay: React.FC<LobbyDisplayProps> = ({ players }) => {
  return (
    <div className="lobby-display p-6 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Players in Lobby ({players.length}/12)
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {players.map((player) => {
          const avatar = getAvatarById(player.avatarId);
          if (!avatar) return null;

          return (
            <div
              key={player.id}
              className="player-lobby-card p-3 rounded-lg bg-gray-800"
              style={{
                borderTop: `3px solid ${avatar.color}`,
                opacity: player.isReady ? 1 : 0.6,
              }}
            >
              <div className="relative">
                <img
                  src={avatar.svgPath}
                  alt={avatar.name}
                  className="w-full h-auto mb-2"
                />
                {player.isReady && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    ✓
                  </div>
                )}
              </div>
              <div className="text-white text-sm font-medium truncate">
                {player.name}
              </div>
              <div className="text-gray-400 text-xs">{avatar.animal}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// Example 12: Avatar Validation in Form
// ============================================================================

export function validatePlayerAvatar(avatarId: string): {
  valid: boolean;
  error?: string;
} {
  if (!avatarId) {
    return { valid: false, error: 'Please select an avatar' };
  }

  if (!isValidAvatarId(avatarId)) {
    return { valid: false, error: 'Invalid avatar selection' };
  }

  return { valid: true };
}

// ============================================================================
// Example 13: Get Avatar Statistics
// ============================================================================

export function getAvatarStats() {
  const avatars = getAllAvatars();

  return {
    totalAvatars: avatars.length,
    byPersonality: avatars.reduce((acc, avatar) => {
      acc[avatar.personality] = (acc[avatar.personality] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    colorPalette: avatars.map((a) => ({
      animal: a.animal,
      primary: a.color,
      accent: a.accentColor,
    })),
  };
}

// ============================================================================
// Example 14: Avatar Preloader
// ============================================================================

export function preloadAvatars(): Promise<void[]> {
  const avatars = getAllAvatars();

  const loadPromises = avatars.map((avatar) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load ${avatar.svgPath}`));
      img.src = avatar.svgPath;
    });
  });

  return Promise.all(loadPromises);
}

// Usage in app initialization:
// await preloadAvatars();

// ============================================================================
// Example 15: Export for Testing
// ============================================================================

export const testHelpers = {
  mockAvatar: AVATARS.fox,
  allAvatarIds: Object.keys(AVATARS) as AvatarId[],
  getTestPlayers: () => [
    { id: '1', name: 'Alice', avatarId: 'fox' as AvatarId },
    { id: '2', name: 'Bob', avatarId: 'cat' as AvatarId },
    { id: '3', name: 'Charlie', avatarId: 'owl' as AvatarId },
    { id: '4', name: 'Diana', avatarId: 'penguin' as AvatarId },
  ],
};
