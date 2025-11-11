/**
 * Discussion Screen - Players give clues and discuss
 */

import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AVATARS, type AvatarId } from '../data/avatars';

export const DiscussionScreen: React.FC = () => {
  const { players, currentRound, setGamePhase } = useGameStore();

  const handleProceedToVote = () => {
    setGamePhase('voting');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="font-bold text-4xl text-primary game-title mb-2 animate-fadeInUp">
        Round {currentRound}: Discussion Phase
      </h1>
      <div className="text-lg text-muted-foreground mb-8">Give your one-word clues!</div>

      <Card className="max-w-[600px] mb-6 shadow-lg">
        <CardHeader>
          <CardTitle>How to Play</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="pl-6 space-y-3 text-left">
            <li className="text-muted-foreground">
              <strong className="text-foreground">Each player</strong> takes turns giving a{' '}
              <strong className="text-foreground">one-word clue</strong> related to their secret
              word
            </li>
            <li className="text-muted-foreground">
              <strong className="text-foreground">Civilians:</strong> Give clues that prove you know
              the word, but don't make it too obvious for the Impostor
            </li>
            <li className="text-muted-foreground">
              <strong className="text-foreground">Impostor:</strong> Listen carefully and try to give
              a clue that fits in without revealing you don't know the word
            </li>
            <li className="text-muted-foreground">
              After everyone has given their clues, proceed to voting
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card className="max-w-[800px] mb-8 shadow-lg border-border/50">
        <CardHeader>
          <CardTitle>Players in This Round</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex flex-col items-center gap-2 p-3 bg-card border border-border rounded-md"
              >
                <img
                  src={AVATARS[player.avatar as AvatarId]?.svgPath ?? ''}
                  alt={player.name}
                  className="w-[60px] h-[60px] rounded-sm"
                />
                <span className="text-sm text-foreground font-medium">{player.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button variant="destructive" size="lg" className="animate-glowPulse" onClick={handleProceedToVote}>
        🗳️ Proceed to Voting
      </Button>
    </div>
  );
};
