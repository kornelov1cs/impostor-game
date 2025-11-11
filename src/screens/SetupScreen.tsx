/**
 * Setup Screen - Player setup and game configuration
 */

import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { AVATARS, type AvatarId } from '../data/avatars';
import { getCategoryNames } from '../data/words';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export const SetupScreen: React.FC = () => {
  const { players, addPlayer, removePlayer, startGame } = useGameStore();
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarId>('fox');
  const [category, setCategory] = useState('Animals');

  const categories = getCategoryNames();
  const avatarIds = Object.keys(AVATARS) as AvatarId[];

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && players.length < 12) {
      addPlayer({
        id: `player-${Date.now()}`,
        name: playerName.trim(),
        avatar: selectedAvatar,
      });
      setPlayerName('');
      // Auto-select next avatar
      const currentIndex = avatarIds.indexOf(selectedAvatar);
      const nextIndex = (currentIndex + 1) % avatarIds.length;
      setSelectedAvatar(avatarIds[nextIndex] ?? 'fox');
    }
  };

  const handleStartGame = () => {
    if (players.length >= 3) {
      startGame(category);
    }
  };

  const canStartGame = players.length >= 3;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-primary game-title mb-2 text-center animate-fadeInUp">
        🎭 Impostor
      </h1>
      <p className="text-lg text-muted-foreground mb-8 text-center">
        A Shadow Theater Word Game
      </p>

      <form onSubmit={handleAddPlayer} className="w-full max-width-[600px] max-w-2xl flex flex-col gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Add Players ({players.length}/12)</CardTitle>
            <CardDescription>Minimum 3 players to start</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="playerName" className="text-primary uppercase tracking-wider">
                Player Name
              </Label>
              <Input
                id="playerName"
                type="text"
                placeholder="Enter player name..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={20}
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label className="text-primary uppercase tracking-wider">Choose Avatar</Label>
              <div className="grid grid-cols-4 gap-3">
                {avatarIds.map((avatarId) => (
                  <button
                    key={avatarId}
                    type="button"
                    className={cn(
                      "aspect-square border-2 rounded-md p-2 cursor-pointer transition-all hover:border-primary hover:shadow-lg hover:-translate-y-0.5",
                      selectedAvatar === avatarId
                        ? "border-primary shadow-lg scale-105 animate-glowPulse"
                        : "border-border bg-card"
                    )}
                    onClick={() => setSelectedAvatar(avatarId)}
                    title={AVATARS[avatarId]?.name ?? ''}
                  >
                    <img
                      src={AVATARS[avatarId]?.svgPath ?? ''}
                      alt={AVATARS[avatarId]?.name ?? ''}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full animate-glowPulse"
              size="lg"
              disabled={!playerName.trim() || players.length >= 12}
            >
              Add Player
            </Button>
          </CardContent>
        </Card>

        {players.length > 0 && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Players</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-3 p-3 bg-card border border-border rounded-md"
                  >
                    <img
                      src={AVATARS[player.avatar as AvatarId]?.svgPath ?? ''}
                      alt={player.name}
                      className="w-10 h-10 rounded-sm"
                    />
                    <span className="flex-1 text-foreground font-medium">{player.name}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removePlayer(player.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {players.length >= 3 && (
          <Card className="shadow-lg border-2 border-primary animate-glowPulse">
            <CardHeader>
              <CardTitle>Game Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-primary uppercase tracking-wider">
                  Word Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="button"
                size="lg"
                className="w-full animate-glowPulse"
                disabled={!canStartGame}
                onClick={handleStartGame}
              >
                🎭 Begin Game
              </Button>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
};
