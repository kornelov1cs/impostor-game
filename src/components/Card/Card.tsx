/**
 * Shadow Theater Card Component
 * Elegant content container with dramatic styling
 */

import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { fadeInUp, spotlightReveal, glowPulse } from '../../styles/animations';

// Card variants
type CardVariant = 'default' | 'elevated' | 'outlined' | 'spotlight';
type CardSize = 'sm' | 'md' | 'lg';

interface CardProps {
  variant?: CardVariant;
  size?: CardSize;
  withGlow?: boolean;
  withAnimation?: 'fade' | 'spotlight' | 'none';
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

// Base card styles
const StyledCard = styled.div<{
  $variant: CardVariant;
  $size: CardSize;
  $withGlow: boolean;
  $animation: 'fade' | 'spotlight' | 'none';
  $interactive: boolean;
}>`
  /* Base styles */
  position: relative;
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  transition: all ${theme.transitions.duration.normal} ${theme.transitions.timing.easeInOut};

  /* Animation */
  ${props => {
    switch (props.$animation) {
      case 'fade':
        return `animation: ${fadeInUp} ${theme.transitions.duration.slow} ${theme.transitions.timing.easeOut};`;
      case 'spotlight':
        return `animation: ${spotlightReveal} ${theme.transitions.duration.dramatic} ${theme.transitions.timing.dramatic};`;
      default:
        return '';
    }
  }}

  /* Size variants */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `padding: ${theme.spacing[4]};`;
      case 'lg':
        return `padding: ${theme.spacing[8]};`;
      default: // md
        return `padding: ${theme.spacing[6]};`;
    }
  }}

  /* Variant styles */
  ${props => {
    switch (props.$variant) {
      case 'elevated':
        return `
          background: ${theme.colors.background.secondary};
          border: 1px solid ${theme.colors.border.default};
          box-shadow: ${theme.shadows.lg};
        `;

      case 'outlined':
        return `
          background: rgba(26, 15, 46, 0.6);
          border: 2px solid ${theme.colors.border.default};
          box-shadow: ${theme.shadows.base};
          backdrop-filter: blur(10px);
        `;

      case 'spotlight':
        return `
          background: ${theme.colors.background.secondary};
          border: 2px solid ${theme.colors.accent.gold};
          box-shadow: ${theme.shadows.glow.goldStrong};
        `;

      default: // default
        return `
          background: ${theme.colors.background.secondary};
          border: 1px solid rgba(212, 175, 55, 0.1);
          box-shadow: ${theme.shadows.md};
        `;
    }
  }}

  /* Glow effect */
  ${props => props.$withGlow && `
    animation: ${glowPulse} 2s ease-in-out infinite;
  `}

  /* Interactive hover effects */
  ${props => props.$interactive && `
    cursor: pointer;

    &:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: ${theme.shadows.glow.gold};
      border-color: ${theme.colors.border.active};
    }

    &:active {
      transform: translateY(-2px) scale(1.01);
    }
  `}

  /* Focus state for accessibility */
  ${props => props.$interactive && `
    &:focus-visible {
      outline: 2px solid ${theme.colors.accent.gold};
      outline-offset: 2px;
    }
  `}
`;

// Optional card header
const CardHeader = styled.div`
  margin-bottom: ${theme.spacing[4]};
  padding-bottom: ${theme.spacing[4]};
  border-bottom: 1px solid ${theme.colors.border.default};
`;

const CardTitle = styled.h3`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
`;

const CardSubtitle = styled.p`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.text.muted};
  margin: 0;
`;

// Card body
const CardBody = styled.div`
  color: ${theme.colors.text.secondary};
`;

// Optional card footer
const CardFooter = styled.div`
  margin-top: ${theme.spacing[4]};
  padding-top: ${theme.spacing[4]};
  border-top: 1px solid ${theme.colors.border.default};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

/**
 * Card Component
 *
 * @example
 * // Basic card
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Player Status</Card.Title>
 *     <Card.Subtitle>Waiting for votes...</Card.Subtitle>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Game content goes here</p>
 *   </Card.Body>
 * </Card>
 *
 * @example
 * // Spotlight card with animation
 * <Card variant="spotlight" withAnimation="spotlight">
 *   <h2>You are the Impostor!</h2>
 * </Card>
 *
 * @example
 * // Interactive card
 * <Card interactive onClick={handleClick}>
 *   Click me!
 * </Card>
 */
export const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Subtitle: typeof CardSubtitle;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
} = ({
  variant = 'default',
  size = 'md',
  withGlow = false,
  withAnimation = 'none',
  interactive = false,
  className,
  children,
  onClick,
}) => {
  return (
    <StyledCard
      $variant={variant}
      $size={size}
      $withGlow={withGlow}
      $animation={withAnimation}
      $interactive={interactive}
      className={className}
      onClick={onClick}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
    >
      {children}
    </StyledCard>
  );
};

// Attach sub-components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

// Export for easier imports
export default Card;
