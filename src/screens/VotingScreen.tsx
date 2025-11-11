/**
 * Voting Screen - Pass-and-play voting system
 */

import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { AVATARS, type AvatarId } from '../data/avatars';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const VotingScreen: React.FC = () => {
  const { players, castVote, calculateVotes, setGamePhase } = useGameStore();
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const currentVoter = players[currentVoterIndex];
  const allPlayersVoted = players.every((p) => p.hasVoted);

  useEffect(() => {
    // If all players have voted, automatically calculate results
    if (allPlayersVoted) {
      const timer = setTimeout(() => {
        const eliminatedId = calculateVotes();
        setGamePhase('results');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [allPlayersVoted, calculateVotes, setGamePhase]);

  if (!currentVoter) return null;

  // Skip to next voter if current voter has already voted
  if (currentVoter.hasVoted && currentVoterIndex < players.length - 1) {
    setCurrentVoterIndex(currentVoterIndex + 1);
    return null;
  }

  const handleSelectCandidate = (targetId: string) => {
    setSelectedTargetId(targetId);
    setShowConfirmation(true);
  };

  const handleConfirmVote = () => {
    if (selectedTargetId) {
      castVote(currentVoter.id, selectedTargetId);
      setSelectedTargetId(null);
      setShowConfirmation(false);

      // Move to next voter
      if (currentVoterIndex < players.length - 1) {
        setCurrentVoterIndex(currentVoterIndex + 1);
      }
    }
  };

  const handleChangeVote = () => {
    setSelectedTargetId(null);
    setShowConfirmation(false);
  };

  const selectedPlayer = players.find((p) => p.id === selectedTargetId);

  // Filter out the current voter from candidates
  const candidates = players.filter((p) => p.id !== currentVoter.id);

  if (showConfirmation && selectedPlayer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="w-[100px] h-[100px] rounded-lg overflow-hidden border-3 border-primary shadow-lg animate-glowPulse">
            <img
              src={AVATARS[currentVoter.avatar as AvatarId]?.svgPath ?? ''}
              alt={currentVoter.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="font-bold text-2xl text-primary game-title">{currentVoter.name}</h2>
        </div>

        <Card className="max-w-[400px] shadow-lg border-2 border-primary animate-fadeInUp animate-glowPulse">
          <CardHeader>
            <CardTitle>Confirm Your Vote</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">You suspect:</p>
            <div className="flex flex-col items-center gap-3 my-4">
              <img
                src={AVATARS[selectedPlayer.avatar as AvatarId]?.svgPath ?? ''}
                alt={selectedPlayer.name}
                className="w-[100px] h-[100px] rounded-md border-2 border-primary"
              />
              <h3 className="font-bold text-2xl text-primary">{selectedPlayer.name}</h3>
            </div>

            <div className="flex gap-3 w-full">
              <Button variant="secondary" onClick={handleChangeVote} className="flex-1">
                ← Change
              </Button>
              <Button variant="destructive" className="flex-1 animate-glowPulse" onClick={handleConfirmVote}>
                Confirm Vote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="w-[100px] h-[100px] rounded-lg overflow-hidden border-3 border-primary shadow-lg animate-glowPulse">
          <img
            src={AVATARS[currentVoter.avatar as AvatarId]?.svgPath ?? ''}
            alt={currentVoter.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="font-bold text-2xl text-primary game-title">{currentVoter.name}'s Vote</h2>
      </div>

      <p className="text-lg text-muted-foreground mb-6">Who do you think is the Impostor?</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-[800px] mb-6">
        {candidates.map((candidate) => (
          <button
            key={candidate.id}
            className={cn(
              "flex flex-col items-center gap-2 p-4 bg-card border-2 rounded-md cursor-pointer transition-all",
              "hover:border-primary hover:-translate-y-1 hover:shadow-lg",
              selectedTargetId === candidate.id
                ? "border-primary shadow-lg scale-105"
                : "border-border"
            )}
            onClick={() => handleSelectCandidate(candidate.id)}
          >
            <img
              src={AVATARS[candidate.avatar as AvatarId]?.svgPath ?? ''}
              alt={candidate.name}
              className="w-[80px] h-[80px] rounded-sm"
            />
            <span className="text-base text-foreground font-medium">{candidate.name}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-2 justify-center mt-6">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={cn(
              "w-3 h-3 rounded-full border transition-all",
              player.hasVoted || index < currentVoterIndex
                ? "bg-primary border-primary shadow-lg"
                : "bg-secondary border-border"
            )}
          />
        ))}
      </div>
    </div>
  );
};
