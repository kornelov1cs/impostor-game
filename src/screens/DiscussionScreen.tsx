/**
 * Discussion Screen - Players give clues and discuss
 */

import React from 'react';
import { styled } from '@linaria/react';
import { useGameStore } from '../store/gameStore';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { theme } from '../styles/theme';
import { fadeInUp } from '../styles/animations';
import { AVATARS, type AvatarId } from '../data/avatars';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[6]};
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.sizes['4xl']};
  color: ${theme.colors.accent.gold};
  text-shadow: ${theme.shadows.glow.gold};
  margin-bottom: ${theme.spacing[2]};
  animation: ${fadeInUp} ${theme.transitions.duration.slow} ${theme.transitions.timing.easeOut};
`;

const RoundLabel = styled.div`
  font-size: ${theme.typography.sizes.lg};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[8]};
`;

const InstructionsCard = styled(Card)`
  max-width: 600px;
  margin-bottom: ${theme.spacing[6]};
`;

const Instruction = styled.li`
  text-align: left;
  margin-bottom: ${theme.spacing[3]};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.sizes.base};
`;

const PlayerList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${theme.spacing[4]};
  max-width: 800px;
  margin-bottom: ${theme.spacing[8]};
`;

const PlayerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[3]};
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.md};

  img {
    width: 60px;
    height: 60px;
    border-radius: ${theme.radius.sm};
  }

  span {
    font-size: ${theme.typography.sizes.sm};
    color: ${theme.colors.text.primary};
    font-weight: ${theme.typography.weights.medium};
  }
`;

export const DiscussionScreen: React.FC = () => {
  const { players, currentRound, setGamePhase } = useGameStore();

  const handleProceedToVote = () => {
    setGamePhase('voting');
  };

  return (
    <Container>
      <Title>Round {currentRound}: Discussion Phase</Title>
      <RoundLabel>Give your one-word clues!</RoundLabel>

      <InstructionsCard variant="elevated" size="lg">
        <Card.Header>
          <Card.Title>How to Play</Card.Title>
        </Card.Header>
        <Card.Body>
          <ol style={{ paddingLeft: theme.spacing[6] }}>
            <Instruction>
              <strong>Each player</strong> takes turns giving a <strong>one-word clue</strong> related to their secret word
            </Instruction>
            <Instruction>
              <strong>Civilians:</strong> Give clues that prove you know the word, but don't make it too obvious for the Impostor
            </Instruction>
            <Instruction>
              <strong>Impostor:</strong> Listen carefully and try to give a clue that fits in without revealing you don't know the word
            </Instruction>
            <Instruction>
              After everyone has given their clues, proceed to voting
            </Instruction>
          </ol>
        </Card.Body>
      </InstructionsCard>

      <Card variant="outlined" size="lg" style={{ maxWidth: '800px', marginBottom: theme.spacing[8] }}>
        <Card.Header>
          <Card.Title>Players in This Round</Card.Title>
        </Card.Header>
        <Card.Body>
          <PlayerList>
            {players.map((player) => (
              <PlayerCard key={player.id}>
                <img src={AVATARS[player.avatar as AvatarId]?.svgPath ?? ''} alt={player.name} />
                <span>{player.name}</span>
              </PlayerCard>
            ))}
          </PlayerList>
        </Card.Body>
      </Card>

      <Button
        variant="danger"
        size="lg"
        withGlow
        onClick={handleProceedToVote}
      >
        🗳️ Proceed to Voting
      </Button>
    </Container>
  );
};
