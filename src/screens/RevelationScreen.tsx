/**
 * Revelation Screen - Pass-and-play word reveal
 */

import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { AVATARS, type AvatarId } from '../data/avatars';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const RevelationScreen: React.FC = () => {
  const { players, currentPlayerIndex, secretWord, nextPlayer } = useGameStore();
  const [isRevealed, setIsRevealed] = useState(false);

  const currentPlayer = players[currentPlayerIndex];
  if (!currentPlayer || !secretWord) return null;

  const isLastPlayer = currentPlayerIndex === players.length - 1;

  const handleToggleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  const handleNext = () => {
    setIsRevealed(false);
    nextPlayer();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="w-[120px] h-[120px] rounded-lg overflow-hidden border-3 border-primary shadow-lg animate-glowPulse">
          <img
            src={AVATARS[currentPlayer.avatar as AvatarId]?.svgPath ?? ''}
            alt={currentPlayer.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="font-bold text-3xl text-primary game-title">{currentPlayer.name}'s Turn</h2>
      </div>

      <p className="text-lg text-muted-foreground mb-6 max-w-[500px]">
        {isRevealed
          ? 'Memorize your word, then hide it and pass the device.'
          : 'Tap the button below to see your word. Keep it secret!'}
      </p>

      <Card
        className={cn(
          "min-h-[300px] flex flex-col transition-all duration-700",
          isRevealed && currentPlayer.isImpostor && "border-destructive shadow-lg animate-glowPulse",
          isRevealed && !currentPlayer.isImpostor && "border-primary shadow-lg"
        )}
      >
        <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
          {isRevealed ? (
            <>
              <div
                className={cn(
                  "text-sm font-semibold uppercase tracking-wider mb-4",
                  currentPlayer.isImpostor ? "text-destructive" : "text-muted-foreground"
                )}
              >
                {currentPlayer.isImpostor ? 'You are the Impostor' : 'Your Secret Word'}
              </div>
              <div
                className={cn(
                  "font-bold text-5xl tracking-wider p-8 uppercase",
                  currentPlayer.isImpostor ? "text-destructive game-title" : "text-primary game-title"
                )}
              >
                {currentPlayer.isImpostor ? 'IMPOSTOR' : secretWord}
              </div>
              <p className="text-sm text-muted-foreground italic mt-4">
                {currentPlayer.isImpostor
                  ? "You don't know the secret word. Blend in by giving clever clues!"
                  : "Give clues that prove you know the word, but don't make it too obvious!"}
              </p>
            </>
          ) : (
            <Button size="lg" className="animate-glowPulse" onClick={handleToggleReveal}>
              👁️ Tap to Reveal
            </Button>
          )}
        </CardContent>
      </Card>

      {isRevealed && (
        <div className="mt-6 w-full max-w-[500px]">
          <Button size="lg" className="w-full animate-glowPulse" onClick={handleNext}>
            {isLastPlayer ? '✅ Everyone Has Seen Their Word' : '👉 Pass to Next Player'}
          </Button>
        </div>
      )}

      <div className="flex gap-2 justify-center mt-6">
        {players.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-3 h-3 rounded-full border transition-all",
              index <= currentPlayerIndex
                ? "bg-primary border-primary shadow-lg"
                : "bg-secondary border-border"
            )}
          />
        ))}
      </div>
    </div>
  );
};
