/**
 * Results Screen - Show game results and winner
 */

import React, { useEffect } from 'react';
import { styled } from '@linaria/react';
import { useGameStore } from '../store/gameStore';
import { AVATARS, type AvatarId } from '../data/avatars';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { theme } from '../styles/theme';
import { fadeInUp, spotlightReveal, glowPulseGold, glowPulseImpostor } from '../styles/animations';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[6]};
  text-align: center;
`;

const Title = styled.h1<{ $isWinner: boolean }>`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.sizes['4xl']};
  color: ${props => props.$isWinner ? theme.colors.accent.gold : theme.colors.role.impostorGlow};
  text-shadow: ${props => props.$isWinner ? theme.shadows.glow.gold : theme.shadows.glow.impostor};
  margin-bottom: ${theme.spacing[8]};
  animation: ${fadeInUp} ${theme.transitions.duration.slow} ${theme.transitions.timing.easeOut};
`;

const RevealCard = styled(Card)<{ $isImpostor: boolean }>`
  max-width: 500px;
  margin-bottom: ${theme.spacing[6]};
  animation: ${spotlightReveal} 1s ease-out forwards;
  border-color: ${props => props.$isImpostor ? theme.colors.role.impostor : theme.colors.accent.gold};
  animation: ${props => props.$isImpostor ? glowPulseImpostor : glowPulseGold} 2s ease-in-out infinite;
`;

const ImpostorReveal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[4]};
  padding: ${theme.spacing[6]};

  img {
    width: 150px;
    height: 150px;
    border-radius: ${theme.radius.lg};
    border: 3px solid ${theme.colors.role.impostor};
  }

  h2 {
    font-family: ${theme.typography.fonts.heading};
    font-size: ${theme.typography.sizes['3xl']};
    color: ${theme.colors.role.impostorGlow};
    text-shadow: ${theme.shadows.glow.impostor};
  }

  p {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.sizes.lg};
  }
`;

const SecretWordReveal = styled.div`
  margin-top: ${theme.spacing[6]};
  padding: ${theme.spacing[6]};
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.active};
  border-radius: ${theme.radius.md};
  max-width: 500px;

  h3 {
    font-family: ${theme.typography.fonts.heading};
    font-size: ${theme.typography.sizes.xl};
    color: ${theme.colors.text.gold};
    margin-bottom: ${theme.spacing[3]};
  }

  p {
    font-size: ${theme.typography.sizes['3xl']};
    font-weight: ${theme.typography.weights.bold};
    color: ${theme.colors.accent.gold};
    text-shadow: ${theme.shadows.glow.gold};
  }
`;

const VotingResults = styled.div`
  max-width: 600px;
  margin-bottom: ${theme.spacing[8]};
`;

const VoteRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing[3]};
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.sm};
  margin-bottom: ${theme.spacing[2]};

  .voter {
    display: flex;
    align-items: center;
    gap: ${theme.spacing[3]};

    img {
      width: 40px;
      height: 40px;
      border-radius: ${theme.radius.sm};
    }

    span {
      color: ${theme.colors.text.primary};
    }
  }

  .arrow {
    color: ${theme.colors.text.muted};
    font-size: ${theme.typography.sizes.xl};
  }

  .target {
    display: flex;
    align-items: center;
    gap: ${theme.spacing[3]};

    img {
      width: 40px;
      height: 40px;
      border-radius: ${theme.radius.sm};
    }

    span {
      color: ${theme.colors.text.primary};
      font-weight: ${theme.typography.weights.semibold};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  max-width: 500px;
`;

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
    <Container>
      <Title $isWinner={civiliansWon}>
        {civiliansWon ? '🎉 Civilians Win!' : '😈 Impostor Wins!'}
      </Title>

      <RevealCard variant="spotlight" size="lg" withGlow $isImpostor={!isImpostorEliminated}>
        <Card.Header>
          <Card.Title>The Impostor Was...</Card.Title>
        </Card.Header>
        <Card.Body>
          <ImpostorReveal>
            <img src={AVATARS[impostorPlayer.avatar as AvatarId]?.svgPath ?? ''} alt={impostorPlayer.name} />
            <h2>{impostorPlayer.name}</h2>
            {isImpostorEliminated ? (
              <p>The group successfully identified the impostor!</p>
            ) : (
              <p>The impostor successfully deceived the group!</p>
            )}
          </ImpostorReveal>
        </Card.Body>
      </RevealCard>

      <SecretWordReveal>
        <h3>The Secret Word Was:</h3>
        <p>{secretWord}</p>
      </SecretWordReveal>

      <Card variant="outlined" size="lg" style={{ maxWidth: '600px', marginTop: theme.spacing[8], marginBottom: theme.spacing[8] }}>
        <Card.Header>
          <Card.Title>Voting Results</Card.Title>
          <Card.Subtitle>Who voted for whom</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <VotingResults>
            {players.map((voter) => {
              const target = players.find((p) => p.id === voter.votedFor);
              if (!target) return null;

              return (
                <VoteRow key={voter.id}>
                  <div className="voter">
                    <img src={AVATARS[voter.avatar as AvatarId]?.svgPath ?? ''} alt={voter.name} />
                    <span>{voter.name}</span>
                  </div>
                  <div className="arrow">→</div>
                  <div className="target">
                    <img src={AVATARS[target.avatar as AvatarId]?.svgPath ?? ''} alt={target.name} />
                    <span>{target.name}</span>
                  </div>
                </VoteRow>
              );
            })}
          </VotingResults>
        </Card.Body>
      </Card>

      <ButtonGroup>
        <Button variant="secondary" size="lg" onClick={handleNextRound}>
          🔄 Play Another Round
        </Button>
        <Button variant="primary" size="lg" withGlow onClick={handlePlayAgain}>
          🎮 New Game
        </Button>
      </ButtonGroup>
    </Container>
  );
};
