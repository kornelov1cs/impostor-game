/**
 * Voting Screen - Pass-and-play voting system
 */

import React, { useState, useEffect } from 'react';
import { styled } from '@linaria/react';
import { useGameStore } from '../store/gameStore';
import { AVATARS, type AvatarId } from '../data/avatars';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { theme } from '../styles/theme';
import { fadeInUp, glowPulseGold } from '../styles/animations';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[6]};
  text-align: center;
`;

const VoterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[6]};
`;

const AvatarContainer = styled.div`
  width: 100px;
  height: 100px;
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

const VoterName = styled.h2`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.sizes['2xl']};
  color: ${theme.colors.accent.gold};
  text-shadow: ${theme.shadows.glow.gold};
`;

const Instruction = styled.p`
  font-size: ${theme.typography.sizes.lg};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[6]};
`;

const CandidatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${theme.spacing[4]};
  max-width: 800px;
  margin-bottom: ${theme.spacing[6]};
`;

const CandidateCard = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[4]};
  background: ${theme.colors.background.secondary};
  border: 2px solid ${props => props.$selected ? theme.colors.accent.gold : theme.colors.border.default};
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition: all ${theme.transitions.duration.fast} ${theme.transitions.timing.easeInOut};

  &:hover {
    border-color: ${theme.colors.accent.gold};
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.glow.gold};
  }

  ${props => props.$selected && `
    box-shadow: ${theme.shadows.glow.gold};
    transform: scale(1.05);
  `}

  img {
    width: 80px;
    height: 80px;
    border-radius: ${theme.radius.sm};
  }

  span {
    font-size: ${theme.typography.sizes.base};
    color: ${theme.colors.text.primary};
    font-weight: ${theme.typography.weights.medium};
  }
`;

const ConfirmationCard = styled(Card)`
  max-width: 400px;
  animation: ${fadeInUp} ${theme.transitions.duration.normal} ${theme.transitions.timing.easeOut};
`;

const SelectedPlayerDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin: ${theme.spacing[4]} 0;

  img {
    width: 100px;
    height: 100px;
    border-radius: ${theme.radius.md};
    border: 2px solid ${theme.colors.accent.gold};
  }

  h3 {
    font-family: ${theme.typography.fonts.heading};
    font-size: ${theme.typography.sizes['2xl']};
    color: ${theme.colors.accent.gold};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing[3]};
  width: 100%;
`;

const ProgressIndicator = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
  justify-content: center;
  margin-top: ${theme.spacing[6]};
`;

const ProgressDot = styled.div<{ $voted: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$voted ? theme.colors.accent.gold : theme.colors.background.secondary};
  border: 1px solid ${props => props.$voted ? theme.colors.accent.gold : theme.colors.border.default};
  transition: all ${theme.transitions.duration.normal} ${theme.transitions.timing.easeInOut};

  ${props => props.$voted && `
    box-shadow: ${theme.shadows.glow.gold};
  `}
`;

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
      <Container>
        <VoterInfo>
          <AvatarContainer>
            <img src={AVATARS[currentVoter.avatar as AvatarId]?.svgPath ?? ''} alt={currentVoter.name} />
          </AvatarContainer>
          <VoterName>{currentVoter.name}</VoterName>
        </VoterInfo>

        <ConfirmationCard variant="spotlight" size="lg" withGlow>
          <Card.Header>
            <Card.Title>Confirm Your Vote</Card.Title>
          </Card.Header>
          <Card.Body>
            <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing[4] }}>
              You suspect:
            </p>
            <SelectedPlayerDisplay>
              <img src={AVATARS[selectedPlayer.avatar as AvatarId]?.svgPath ?? ''} alt={selectedPlayer.name} />
              <h3>{selectedPlayer.name}</h3>
            </SelectedPlayerDisplay>

            <ButtonGroup>
              <Button variant="secondary" onClick={handleChangeVote} fullWidth>
                ← Change
              </Button>
              <Button variant="danger" withGlow onClick={handleConfirmVote} fullWidth>
                Confirm Vote
              </Button>
            </ButtonGroup>
          </Card.Body>
        </ConfirmationCard>
      </Container>
    );
  }

  return (
    <Container>
      <VoterInfo>
        <AvatarContainer>
          <img src={AVATARS[currentVoter.avatar as AvatarId]?.svgPath ?? ''} alt={currentVoter.name} />
        </AvatarContainer>
        <VoterName>{currentVoter.name}'s Vote</VoterName>
      </VoterInfo>

      <Instruction>Who do you think is the Impostor?</Instruction>

      <CandidatesGrid>
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            $selected={selectedTargetId === candidate.id}
            onClick={() => handleSelectCandidate(candidate.id)}
          >
            <img src={AVATARS[candidate.avatar as AvatarId]?.svgPath ?? ''} alt={candidate.name} />
            <span>{candidate.name}</span>
          </CandidateCard>
        ))}
      </CandidatesGrid>

      <ProgressIndicator>
        {players.map((player, index) => (
          <ProgressDot key={player.id} $voted={player.hasVoted || index < currentVoterIndex} />
        ))}
      </ProgressIndicator>
    </Container>
  );
};
