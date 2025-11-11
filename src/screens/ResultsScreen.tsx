/**
 * Results Screen - Show game results and winner
 */

import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { AVATARS, type AvatarId } from '../data/avatars';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const ResultsScreen: React.FC = () => {
  const { players, secretWord, calculateVotes, winner, setWinner, nextRound, resetGame } = useGameStore();

  const eliminatedId = calculateVotes();
  const eliminatedPlayer = players.find((p) => p.id === eliminatedId);
  const impostorPlayer = players.find((p) => p.isImpostor);

  useEffect(() => {
    // Determine winner based on who was eliminated
    if (eliminatedPlayer && impostorPlayer && !winner) {
      if (eliminatedPlayer.id === impostorPlayer.id) {
        setWinner('civilians');
      } else {
        setWinner('impostor');
      }
    }
  }, [eliminatedPlayer, impostorPlayer, winner, setWinner]);

  if (!eliminatedPlayer || !impostorPlayer) return null;

  const isImpostorEliminated = eliminatedPlayer.id === impostorPlayer.id;
  const civiliansWon = winner === 'civilians';

  const handlePlayAgain = () => {
    resetGame();
  };

  const handleNextRound = () => {
    nextRound();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1
        className={cn(
          "font-bold text-4xl mb-8 game-title animate-fadeInUp",
          civiliansWon ? "text-primary" : "text-destructive"
        )}
      >
        {civiliansWon ? '🎉 Civilians Win!' : '😈 Impostor Wins!'}
      </h1>

      <Card
        className={cn(
          "max-w-[500px] mb-6 shadow-lg border-2 animate-glowPulse",
          isImpostorEliminated ? "border-primary" : "border-destructive"
        )}
      >
        <CardHeader>
          <CardTitle>The Impostor Was...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 p-6">
            <img
              src={AVATARS[impostorPlayer.avatar as AvatarId]?.svgPath ?? ''}
              alt={impostorPlayer.name}
              className={cn(
                "w-[150px] h-[150px] rounded-lg border-3",
                isImpostorEliminated ? "border-primary" : "border-destructive"
              )}
            />
            <h2
              className={cn(
                "font-bold text-3xl game-title",
                isImpostorEliminated ? "text-primary" : "text-destructive"
              )}
            >
              {impostorPlayer.name}
            </h2>
            <p className="text-muted-foreground text-lg">
              {isImpostorEliminated
                ? 'The group successfully identified the impostor!'
                : 'The impostor successfully deceived the group!'}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 p-6 bg-card border border-primary/50 rounded-md max-w-[500px]">
        <h3 className="font-bold text-xl text-primary mb-3">The Secret Word Was:</h3>
        <p className="text-3xl font-bold text-primary game-title">{secretWord}</p>
      </div>

      <Card className="max-w-[600px] mt-8 mb-8 shadow-lg border-border/50">
        <CardHeader>
          <CardTitle>Voting Results</CardTitle>
          <CardDescription>Who voted for whom</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {players.map((voter) => {
              const target = players.find((p) => p.id === voter.votedFor);
              if (!target) return null;

              return (
                <div
                  key={voter.id}
                  className="flex items-center justify-between p-3 bg-card border border-border rounded-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={AVATARS[voter.avatar as AvatarId]?.svgPath ?? ''}
                      alt={voter.name}
                      className="w-10 h-10 rounded-sm"
                    />
                    <span className="text-foreground">{voter.name}</span>
                  </div>
                  <div className="text-muted-foreground text-xl">→</div>
                  <div className="flex items-center gap-3">
                    <img
                      src={AVATARS[target.avatar as AvatarId]?.svgPath ?? ''}
                      alt={target.name}
                      className="w-10 h-10 rounded-sm"
                    />
                    <span className="text-foreground font-semibold">{target.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 max-w-[500px]">
        <Button variant="secondary" size="lg" onClick={handleNextRound}>
          🔄 Play Another Round
        </Button>
        <Button size="lg" className="animate-glowPulse" onClick={handlePlayAgain}>
          🎮 New Game
        </Button>
      </div>
    </div>
  );
};
