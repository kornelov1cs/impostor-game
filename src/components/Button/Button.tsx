/**
 * Shadow Theater Button Component
 * Dramatic, elegant button with multiple variants
 */

import React from 'react';
import { styled } from '@linaria/react';
import { theme } from '../../styles/theme';
import { glowPulse, fadeInScale } from '../../styles/animations';

// Button variants
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  withGlow?: boolean;
  children: React.ReactNode;
}

// Base button styles
const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $withGlow: boolean;
  $isLoading: boolean;
}>`
  /* Base styles */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};

  font-family: ${theme.typography.fonts.heading};
  font-weight: ${theme.typography.weights.semibold};
  letter-spacing: ${theme.typography.letterSpacing.wide};
  text-transform: uppercase;

  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition: all ${theme.transitions.duration.normal} ${theme.transitions.timing.easeInOut};

  /* Remove default button styles */
  border: none;
  outline: none;

  /* Animation */
  animation: ${fadeInScale} ${theme.transitions.duration.slow} ${theme.transitions.timing.easeOut};

  /* Full width option */
  width: ${props => props.$fullWidth ? '100%' : 'auto'};

  /* Size variants */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return `
          padding: ${theme.spacing[2]} ${theme.spacing[4]};
          font-size: ${theme.typography.sizes.sm};
          min-height: 36px;
        `;
      case 'lg':
        return `
          padding: ${theme.spacing[4]} ${theme.spacing[8]};
          font-size: ${theme.typography.sizes.lg};
          min-height: 56px;
        `;
      default: // md
        return `
          padding: ${theme.spacing[3]} ${theme.spacing[6]};
          font-size: ${theme.typography.sizes.base};
          min-height: 44px;
        `;
    }
  }}

  /* Variant styles */
  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, ${theme.colors.accent.gold}, ${theme.colors.accent.goldDark});
          color: ${theme.colors.background.primary};
          box-shadow: ${theme.shadows.md};

          &:hover:not(:disabled) {
            background: linear-gradient(135deg, ${theme.colors.accent.goldLight}, ${theme.colors.accent.gold});
            box-shadow: ${theme.shadows.glow.gold};
            transform: translateY(-2px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: ${theme.shadows.base};
          }
        `;

      case 'secondary':
        return `
          background: ${theme.colors.background.tertiary};
          color: ${theme.colors.text.primary};
          border: 2px solid ${theme.colors.border.default};
          box-shadow: ${theme.shadows.base};

          &:hover:not(:disabled) {
            border-color: ${theme.colors.border.active};
            box-shadow: ${theme.shadows.glow.gold};
            background: ${theme.colors.background.secondary};
            transform: translateY(-2px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: ${theme.shadows.base};
          }
        `;

      case 'danger':
        return `
          background: linear-gradient(135deg, ${theme.colors.role.impostor}, #5A0000);
          color: ${theme.colors.text.primary};
          box-shadow: ${theme.shadows.md};

          &:hover:not(:disabled) {
            background: linear-gradient(135deg, ${theme.colors.role.impostorGlow}, ${theme.colors.role.impostor});
            box-shadow: ${theme.shadows.glow.impostor};
            transform: translateY(-2px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: ${theme.shadows.base};
          }
        `;

      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.text.secondary};
          border: 1px solid transparent;
          box-shadow: none;

          &:hover:not(:disabled) {
            color: ${theme.colors.accent.gold};
            border-color: ${theme.colors.border.default};
            background: rgba(212, 175, 55, 0.05);
          }

          &:active:not(:disabled) {
            background: rgba(212, 175, 55, 0.1);
          }
        `;

      default:
        return '';
    }
  }}

  /* Glow effect */
  ${props => props.$withGlow && `
    animation: ${glowPulse} 2s ease-in-out infinite;
  `}

  /* Disabled state */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    transform: none !important;
  }

  /* Loading state */
  ${props => props.$isLoading && `
    cursor: wait;
    pointer-events: none;

    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      top: 50%;
      left: 50%;
      margin-left: -8px;
      margin-top: -8px;
      border: 2px solid currentColor;
      border-radius: 50%;
      border-right-color: transparent;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `}

  /* Focus state for accessibility */
  &:focus-visible {
    outline: 2px solid ${theme.colors.accent.gold};
    outline-offset: 2px;
  }
`;

const ButtonContent = styled.span<{ $isLoading: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  opacity: ${props => props.$isLoading ? 0 : 1};
  transition: opacity ${theme.transitions.duration.fast} ${theme.transitions.timing.easeInOut};
`;

/**
 * Button Component
 *
 * @example
 * // Primary button
 * <Button variant="primary" onClick={handleClick}>
 *   Start Game
 * </Button>
 *
 * @example
 * // Danger button with glow
 * <Button variant="danger" withGlow>
 *   Vote Impostor
 * </Button>
 *
 * @example
 * // Loading state
 * <Button variant="primary" isLoading>
 *   Processing...
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  withGlow = false,
  children,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $withGlow={withGlow}
      $isLoading={isLoading}
      disabled={disabled || isLoading}
      {...props}
    >
      <ButtonContent $isLoading={isLoading}>
        {children}
      </ButtonContent>
    </StyledButton>
  );
};

// Export for easier imports
export default Button;
