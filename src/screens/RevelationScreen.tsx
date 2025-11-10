/**
 * Revelation Screen - Pass-and-play word reveal
 */

import React, { useState } from 'react';
import { styled } from '@linaria/react';
import { useGameStore } from '../store/gameStore';
import { AVATARS, type AvatarId } from '../data/avatars';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { theme } from '../styles/theme';
import { spotlightReveal, glowPulseGold, glowPulseImpostor } from '../styles/animations';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[6]};
  text-align: center;
`;

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[8]};
`;

const AvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  border: 3px solid ${theme.colors.accent.gold};
  box-shadow: ${theme.shadows.glow.gold};
  animation: ${glowPulseGold} 2s ease-in-out infinite;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlayerName = styled.h2`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.sizes['3xl']};
  color: ${theme.colors.accent.gold};
  text-shadow: ${theme.shadows.glow.gold};
`;

const Instruction = styled.p`
  font-size: ${theme.typography.sizes.lg};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[6]};
  max-width: 500px;
`;

const WordRevealCard = styled(Card)<{ $isRevealed: boolean; $isImpostor: boolean }>`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  transition: all ${theme.transitions.duration.slow} ${theme.transitions.timing.easeOut};

  ${props => props.$isRevealed && props.$isImpostor && `
    border-color: ${theme.colors.role.impostor};
    box-shadow: ${theme.shadows.glow.impostor};
    animation: ${glowPulseImpostor} 2s ease-in-out infinite;
  `}

  ${props => props.$isRevealed && !props.$isImpostor && `
    animation: ${spotlightReveal} 1s ease-out forwards;
  `}
`;

const SecretWord = styled.div<{ $isImpostor: boolean }>`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.sizes['5xl']};
  font-weight: ${theme.typography.weights.bold};
  color: ${props => props.$isImpostor ? theme.colors.role.impostorGlow : theme.colors.accent.gold};
  text-shadow: ${props => props.$isImpostor ? theme.shadows.glow.impostor : theme.shadows.glow.gold};
  letter-spacing: ${theme.typography.letterSpacing.wider};
  padding: ${theme.spacing[8]} ${theme.spacing[4]};
  text-transform: uppercase;
`;

const RoleLabel = styled.div<{ $isImpostor: boolean }>`
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.semibold};
  color: ${props => props.$isImpostor ? theme.colors.role.impostorGlow : theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wide};
  margin-bottom: ${theme.spacing[4]};
`;

const WarningText = styled.p`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.muted};
  font-style: italic;
  margin-top: ${theme.spacing[4]};
`;

const ProgressIndicator = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
  justify-content: center;
  margin-top: ${theme.spacing[6]};
`;

const ProgressDot = styled.div<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$active ? theme.colors.accent.gold : theme.colors.background.secondary};
  border: 1px solid ${props => props.$active ? theme.colors.accent.gold : theme.colors.border.default};
  transition: all ${theme.transitions.duration.normal} ${theme.transitions.timing.easeInOut};

  ${props => props.$active && `
    box-shadow: ${theme.shadows.glow.gold};
  `}
`;

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
    <Container>
      <PlayerInfo>
        <AvatarContainer>
          <img src={AVATARS[currentPlayer.avatar as AvatarId]?.svgPath ?? ''} alt={currentPlayer.name} />
        </AvatarContainer>
        <PlayerName>{currentPlayer.name}'s Turn</PlayerName>
      </PlayerInfo>

      <Instruction>
        {isRevealed
          ? 'Memorize your word, then hide it and pass the device.'
          : 'Tap the button below to see your word. Keep it secret!'}
      </Instruction>

      <WordRevealCard
        variant={isRevealed ? 'spotlight' : 'elevated'}
        size="lg"
        withGlow={isRevealed}
        $isRevealed={isRevealed}
        $isImpostor={currentPlayer.isImpostor}
      >
        <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {isRevealed ? (
            <>
              <RoleLabel $isImpostor={currentPlayer.isImpostor}>
                {currentPlayer.isImpostor ? 'You are the Impostor' : 'Your Secret Word'}
              </RoleLabel>
              <SecretWord $isImpostor={currentPlayer.isImpostor}>
                {currentPlayer.isImpostor ? 'IMPOSTOR' : secretWord}
              </SecretWord>
              <WarningText>
                {currentPlayer.isImpostor
                  ? 'You don\'t know the secret word. Blend in by giving clever clues!'
                  : 'Give clues that prove you know the word, but don\'t make it too obvious!'}
              </WarningText>
            </>
          ) : (
            <Button
              variant="primary"
              size="lg"
              withGlow
              onClick={handleToggleReveal}
            >
              👁️ Tap to Reveal
            </Button>
          )}
        </Card.Body>
      </WordRevealCard>

      {isRevealed && (
        <div style={{ marginTop: theme.spacing[6], width: '100%', maxWidth: '500px' }}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            withGlow
            onClick={handleNext}
          >
            {isLastPlayer ? '✅ Everyone Has Seen Their Word' : '👉 Pass to Next Player'}
          </Button>
        </div>
      )}

      <ProgressIndicator>
        {players.map((_, index) => (
          <ProgressDot key={index} $active={index <= currentPlayerIndex} />
        ))}
      </ProgressIndicator>
    </Container>
  );
};
