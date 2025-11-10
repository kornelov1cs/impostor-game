/**
 * Shadow Theater Design System - Example App
 * Demonstrates how to use the design system components
 */

import React, { useState } from 'react';
import { styled } from '@linaria/react';
import { Button, Card } from './components';
import { theme } from './styles/theme';
import { fontsImport, globalReset, globalStyles, utilities } from './styles/global';
import { fadeInUp, spotlightReveal } from './styles/animations';

// Apply global styles
const GlobalStyles = `${fontsImport} ${globalReset} ${globalStyles} ${utilities}`;

// Main app container
const AppContainer = styled.div`
  min-height: 100vh;
  padding: ${theme.spacing[8]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[8]};
`;

// Title with animation
const Title = styled.h1`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.sizes['6xl']};
  color: ${theme.colors.accent.gold};
  text-align: center;
  text-shadow: ${theme.shadows.glow.goldStrong};
  animation: ${spotlightReveal} 1s ease-out;
  margin-bottom: ${theme.spacing[2]};
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.sizes.xl};
  color: ${theme.colors.text.muted};
  text-align: center;
  animation: ${fadeInUp} 1s ease-out 0.3s backwards;
`;

// Grid layout for cards
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing[6]};
  width: 100%;
  max-width: 1200px;
`;

// Button group
const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[4]};
  justify-content: center;
  animation: ${fadeInUp} 1s ease-out 0.6s backwards;
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleStartGame = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRevealed(true);
    }, 2000);
  };

  return (
    <div className={GlobalStyles}>
      <AppContainer>
        {/* Header */}
        <div>
          <Title>Shadow Theater</Title>
          <Subtitle>A game of deception and deduction</Subtitle>
        </div>

        {/* Example Cards */}
        <CardGrid>
          {/* Default Card */}
          <Card variant="default" withAnimation="fade">
            <Card.Header>
              <Card.Title>Default Card</Card.Title>
              <Card.Subtitle>Standard styling</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <p>This is a default card with standard styling. Perfect for regular content.</p>
            </Card.Body>
          </Card>

          {/* Elevated Card */}
          <Card variant="elevated" withAnimation="fade">
            <Card.Header>
              <Card.Title>Elevated Card</Card.Title>
              <Card.Subtitle>With larger shadow</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <p>This card has a larger shadow for more emphasis and hierarchy.</p>
            </Card.Body>
          </Card>

          {/* Outlined Card */}
          <Card variant="outlined" withAnimation="fade">
            <Card.Header>
              <Card.Title>Outlined Card</Card.Title>
              <Card.Subtitle>With backdrop blur</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <p>This card features a prominent border and backdrop blur effect.</p>
            </Card.Body>
          </Card>
        </CardGrid>

        {/* Interactive Card */}
        {!revealed ? (
          <Card
            variant="elevated"
            size="lg"
            interactive
            onClick={handleStartGame}
            style={{ maxWidth: '500px', width: '100%' }}
          >
            <Card.Header>
              <Card.Title style={{ textAlign: 'center' }}>
                Start New Game
              </Card.Title>
              <Card.Subtitle style={{ textAlign: 'center' }}>
                Click to reveal your role
              </Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <p style={{ textAlign: 'center' }}>
                The curtain is about to rise. Are you ready to discover your fate?
              </p>
            </Card.Body>
          </Card>
        ) : (
          <Card
            variant="spotlight"
            size="lg"
            withAnimation="spotlight"
            withGlow
            style={{ maxWidth: '500px', width: '100%' }}
          >
            <Card.Header>
              <Card.Title
                style={{
                  textAlign: 'center',
                  color: theme.colors.role.impostor,
                  fontSize: theme.typography.sizes['4xl']
                }}
              >
                You are the Impostor!
              </Card.Title>
              <Card.Subtitle style={{ textAlign: 'center' }}>
                The spotlight reveals your secret
              </Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <p style={{ textAlign: 'center' }}>
                Deceive the others and survive until the end. Trust no one, suspect everyone.
              </p>
            </Card.Body>
            <Card.Footer style={{ justifyContent: 'center' }}>
              <Button variant="danger" size="lg" withGlow>
                Begin Mission
              </Button>
            </Card.Footer>
          </Card>
        )}

        {/* Button Variants */}
        <ButtonGroup>
          <Button variant="primary" size="sm">
            Primary Small
          </Button>
          <Button variant="primary" size="md" isLoading={loading}>
            {loading ? 'Loading...' : 'Primary Medium'}
          </Button>
          <Button variant="primary" size="lg">
            Primary Large
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button variant="secondary" size="md">
            Secondary
          </Button>
          <Button variant="danger" size="md" withGlow>
            Danger with Glow
          </Button>
          <Button variant="ghost" size="md">
            Ghost
          </Button>
          <Button variant="primary" size="md" disabled>
            Disabled
          </Button>
        </ButtonGroup>

        <Button variant="primary" size="lg" fullWidth style={{ maxWidth: '400px' }}>
          Full Width Button
        </Button>
      </AppContainer>
    </div>
  );
}

export default App;
