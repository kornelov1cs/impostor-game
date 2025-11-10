/**
 * Setup Screen - Player setup and game configuration
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useGameStore } from '../store/gameStore';
import { AVATARS, type AvatarId } from '../data/avatars';
import { getCategoryNames } from '../data/words';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { theme } from '../styles/theme';
import { fadeInUp } from '../styles/animations';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[6]};
`;

const Title = styled.h1`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.sizes['4xl']};
  color: ${theme.colors.accent.gold};
  text-shadow: ${theme.shadows.glow.gold};
  margin-bottom: ${theme.spacing[2]};
  text-align: center;
  animation: ${fadeInUp} ${theme.transitions.duration.slow} ${theme.transitions.timing.easeOut};
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.sizes.lg};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[8]};
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[6]};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

const Label = styled.label`
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.text.gold};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wide};
`;

const Input = styled.input`
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.md};
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fonts.body};
  font-size: ${theme.typography.sizes.base};
  transition: all ${theme.transitions.duration.normal} ${theme.transitions.timing.easeInOut};

  &:focus {
    outline: none;
    border-color: ${theme.colors.border.active};
    box-shadow: ${theme.shadows.glow.gold};
  }

  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`;

const Select = styled.select`
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.md};
  color: ${theme.colors.text.primary};
  font-family: ${theme.typography.fonts.body};
  font-size: ${theme.typography.sizes.base};
  cursor: pointer;
  transition: all ${theme.transitions.duration.normal} ${theme.transitions.timing.easeInOut};

  &:focus {
    outline: none;
    border-color: ${theme.colors.border.active};
    box-shadow: ${theme.shadows.glow.gold};
  }
`;

const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing[3]};
  margin-top: ${theme.spacing[2]};
`;

const AvatarOption = styled.button<{ $selected: boolean }>`
  aspect-ratio: 1;
  border: 2px solid ${props => props.$selected ? theme.colors.accent.gold : theme.colors.border.default};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.background.secondary};
  padding: ${theme.spacing[2]};
  cursor: pointer;
  transition: all ${theme.transitions.duration.fast} ${theme.transitions.timing.easeInOut};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${theme.colors.accent.gold};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glow.gold};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${props => props.$selected && `
    box-shadow: ${theme.shadows.glow.gold};
    transform: scale(1.05);
  `}
`;

const PlayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  padding: ${theme.spacing[3]};
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.md};

  img {
    width: 40px;
    height: 40px;
    border-radius: ${theme.radius.sm};
  }

  span {
    flex: 1;
    color: ${theme.colors.text.primary};
    font-weight: ${theme.typography.weights.medium};
  }

  button {
    padding: ${theme.spacing[1]} ${theme.spacing[3]};
    background: ${theme.colors.role.impostor};
    border: none;
    border-radius: ${theme.radius.sm};
    color: ${theme.colors.text.primary};
    font-size: ${theme.typography.sizes.sm};
    cursor: pointer;
    transition: all ${theme.transitions.duration.fast} ${theme.transitions.timing.easeInOut};

    &:hover {
      background: ${theme.colors.role.impostorGlow};
    }
  }
`;

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
    <Container>
      <Title>🎭 Impostor</Title>
      <Subtitle>A Shadow Theater Word Game</Subtitle>

      <Form onSubmit={handleAddPlayer}>
        <Card variant="elevated" size="lg">
          <Card.Header>
            <Card.Title>Add Players ({players.length}/12)</Card.Title>
            <Card.Subtitle>Minimum 3 players to start</Card.Subtitle>
          </Card.Header>

          <Card.Body>
            <FormGroup>
              <Label>Player Name</Label>
              <Input
                type="text"
                placeholder="Enter player name..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={20}
                autoFocus
              />
            </FormGroup>

            <FormGroup>
              <Label>Choose Avatar</Label>
              <AvatarGrid>
                {avatarIds.map((avatarId) => (
                  <AvatarOption
                    key={avatarId}
                    type="button"
                    $selected={selectedAvatar === avatarId}
                    onClick={() => setSelectedAvatar(avatarId)}
                    title={AVATARS[avatarId]?.name ?? ''}
                  >
                    <img src={AVATARS[avatarId]?.svgPath ?? ''} alt={AVATARS[avatarId]?.name ?? ''} />
                  </AvatarOption>
                ))}
              </AvatarGrid>
            </FormGroup>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              withGlow
              disabled={!playerName.trim() || players.length >= 12}
            >
              Add Player
            </Button>
          </Card.Body>
        </Card>

        {players.length > 0 && (
          <Card variant="elevated" size="lg">
            <Card.Header>
              <Card.Title>Players</Card.Title>
            </Card.Header>
            <Card.Body>
              <PlayersList>
                {players.map((player) => (
                  <PlayerItem key={player.id}>
                    <img src={AVATARS[player.avatar as AvatarId]?.svgPath ?? ''} alt={player.name} />
                    <span>{player.name}</span>
                    <button onClick={() => removePlayer(player.id)}>Remove</button>
                  </PlayerItem>
                ))}
              </PlayersList>
            </Card.Body>
          </Card>
        )}

        {players.length >= 3 && (
          <Card variant="spotlight" size="lg" withGlow>
            <Card.Header>
              <Card.Title>Game Settings</Card.Title>
            </Card.Header>
            <Card.Body>
              <FormGroup>
                <Label>Word Category</Label>
                <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                withGlow
                disabled={!canStartGame}
                onClick={handleStartGame}
              >
                🎭 Begin Game
              </Button>
            </Card.Body>
          </Card>
        )}
      </Form>
    </Container>
  );
};
