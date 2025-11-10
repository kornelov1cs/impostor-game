/**
 * Shadow Theater Design System - Global Styles
 * CSS reset, font imports, and base styling
 */

import { css } from '@emotion/react';
import { theme } from './theme';

/**
 * Google Fonts Import
 * - Playfair Display: Elegant serif for headings
 * - Inter: Clean sans-serif for body text
 */
export const fontsImport = css`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
`;

/**
 * CSS Reset - Modern, minimal reset
 */
export const globalReset = css`
  :global() {
    /* Box sizing reset */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Remove default list styles */
    ul, ol {
      list-style: none;
    }

    /* Remove default button styles */
    button {
      border: none;
      background: none;
      font: inherit;
      cursor: pointer;
      outline: none;
    }

    /* Remove default link styles */
    a {
      color: inherit;
      text-decoration: none;
    }

    /* Improve media defaults */
    img, picture, video, canvas, svg {
      display: block;
      max-width: 100%;
    }

    /* Remove built-in form typography styles */
    input, button, textarea, select {
      font: inherit;
    }

    /* Avoid text overflows */
    p, h1, h2, h3, h4, h5, h6 {
      overflow-wrap: break-word;
    }

    /* Root element improvements */
    #root, #__next {
      isolation: isolate;
    }
  }
`;

/**
 * Global Base Styles
 * Background, typography, and smooth scrolling
 */
export const globalStyles = css`
  :global() {
    html {
      /* Smooth scrolling */
      scroll-behavior: smooth;

      /* Better font rendering */
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;

      /* Full height */
      height: 100%;
    }

    body {
      /* Deep, mysterious background */
      background: linear-gradient(
        135deg,
        ${theme.colors.background.primary} 0%,
        ${theme.colors.background.secondary} 50%,
        ${theme.colors.background.tertiary} 100%
      );
      background-attachment: fixed;

      /* Typography */
      font-family: ${theme.typography.fonts.body};
      font-size: ${theme.typography.sizes.base};
      font-weight: ${theme.typography.weights.normal};
      line-height: ${theme.typography.lineHeights.normal};
      color: ${theme.colors.text.primary};

      /* Full height */
      min-height: 100%;

      /* Smooth transitions */
      transition: background ${theme.transitions.duration.slow} ${theme.transitions.timing.easeInOut};
    }

    /* Headings - Elegant Playfair Display */
    h1, h2, h3, h4, h5, h6 {
      font-family: ${theme.typography.fonts.heading};
      font-weight: ${theme.typography.weights.bold};
      line-height: ${theme.typography.lineHeights.tight};
      letter-spacing: ${theme.typography.letterSpacing.wide};
      color: ${theme.colors.text.primary};
    }

    h1 {
      font-size: ${theme.typography.sizes['5xl']};
      font-weight: ${theme.typography.weights.black};

      @media (min-width: 768px) {
        font-size: ${theme.typography.sizes['6xl']};
      }

      @media (min-width: 1024px) {
        font-size: ${theme.typography.sizes['7xl']};
      }
    }

    h2 {
      font-size: ${theme.typography.sizes['3xl']};

      @media (min-width: 768px) {
        font-size: ${theme.typography.sizes['4xl']};
      }

      @media (min-width: 1024px) {
        font-size: ${theme.typography.sizes['5xl']};
      }
    }

    h3 {
      font-size: ${theme.typography.sizes['2xl']};

      @media (min-width: 768px) {
        font-size: ${theme.typography.sizes['3xl']};
      }
    }

    h4 {
      font-size: ${theme.typography.sizes.xl};

      @media (min-width: 768px) {
        font-size: ${theme.typography.sizes['2xl']};
      }
    }

    h5 {
      font-size: ${theme.typography.sizes.lg};

      @media (min-width: 768px) {
        font-size: ${theme.typography.sizes.xl};
      }
    }

    h6 {
      font-size: ${theme.typography.sizes.base};

      @media (min-width: 768px) {
        font-size: ${theme.typography.sizes.lg};
      }
    }

    /* Paragraph styles */
    p {
      margin-bottom: ${theme.spacing[4]};
      color: ${theme.colors.text.secondary};
    }

    /* Strong and emphasis */
    strong, b {
      font-weight: ${theme.typography.weights.bold};
      color: ${theme.colors.text.primary};
    }

    em, i {
      font-style: italic;
    }

    /* Code blocks */
    code, pre {
      font-family: ${theme.typography.fonts.mono};
      font-size: ${theme.typography.sizes.sm};
    }

    code {
      background: ${theme.colors.background.tertiary};
      padding: ${theme.spacing[1]} ${theme.spacing[2]};
      border-radius: ${theme.radius.sm};
      color: ${theme.colors.accent.gold};
    }

    pre {
      background: ${theme.colors.background.tertiary};
      padding: ${theme.spacing[4]};
      border-radius: ${theme.radius.md};
      overflow-x: auto;
      margin-bottom: ${theme.spacing[4]};
      border: 1px solid ${theme.colors.border.default};
    }

    /* Selection styling */
    ::selection {
      background: ${theme.colors.accent.gold};
      color: ${theme.colors.background.primary};
    }

    ::-moz-selection {
      background: ${theme.colors.accent.gold};
      color: ${theme.colors.background.primary};
    }

    /* Scrollbar styling (Webkit browsers) */
    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    ::-webkit-scrollbar-track {
      background: ${theme.colors.background.secondary};
      border-radius: ${theme.radius.base};
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.accent.goldDark};
      border-radius: ${theme.radius.base};
      border: 2px solid ${theme.colors.background.secondary};
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.colors.accent.gold};
    }

    /* Firefox scrollbar */
    * {
      scrollbar-width: thin;
      scrollbar-color: ${theme.colors.accent.goldDark} ${theme.colors.background.secondary};
    }

    /* Focus styles for accessibility */
    :focus-visible {
      outline: 2px solid ${theme.colors.accent.gold};
      outline-offset: 2px;
    }

    /* Disabled state */
    :disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Loading state cursor */
    .loading, .loading * {
      cursor: wait !important;
    }

    /* ========== KEYFRAME ANIMATIONS ========== */

    @keyframes spotlightReveal {
      0% {
        opacity: 0;
        transform: scale(0.8);
        filter: brightness(0);
        box-shadow: 0 0 0 rgba(212, 175, 55, 0);
      }
      50% {
        opacity: 0.5;
        filter: brightness(1.5);
        box-shadow: 0 0 60px rgba(212, 175, 55, 0.8), 0 0 120px rgba(212, 175, 55, 0.4);
      }
      100% {
        opacity: 1;
        transform: scale(1);
        filter: brightness(1);
        box-shadow: 0 0 40px rgba(212, 175, 55, 0.5), 0 0 80px rgba(212, 175, 55, 0.3);
      }
    }

    @keyframes glowPulse {
      0%, 100% {
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2);
        filter: brightness(1);
      }
      50% {
        box-shadow: 0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.4), 0 0 90px rgba(212, 175, 55, 0.2);
        filter: brightness(1.2);
      }
    }

    @keyframes glowPulseGold {
      0%, 100% {
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2);
        filter: brightness(1);
      }
      50% {
        box-shadow: 0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.4), 0 0 90px rgba(212, 175, 55, 0.2);
        filter: brightness(1.2);
      }
    }

    @keyframes glowPulseImpostor {
      0%, 100% {
        box-shadow: 0 0 20px rgba(220, 20, 60, 0.4), 0 0 40px rgba(220, 20, 60, 0.2);
        filter: brightness(1);
      }
      50% {
        box-shadow: 0 0 30px rgba(220, 20, 60, 0.6), 0 0 60px rgba(220, 20, 60, 0.4), 0 0 90px rgba(220, 20, 60, 0.2);
        filter: brightness(1.2);
      }
    }

    @keyframes glowPulseInnocent {
      0%, 100% {
        box-shadow: 0 0 15px rgba(113, 128, 150, 0.3), 0 0 30px rgba(113, 128, 150, 0.15);
        filter: brightness(1);
      }
      50% {
        box-shadow: 0 0 20px rgba(113, 128, 150, 0.5), 0 0 40px rgba(113, 128, 150, 0.3);
        filter: brightness(1.1);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes voteDrop {
      0% {
        opacity: 0;
        transform: translateY(-100px) rotateZ(-15deg) scale(0.5);
      }
      60% {
        opacity: 1;
        transform: translateY(10px) rotateZ(5deg) scale(1.05);
      }
      80% {
        transform: translateY(-5px) rotateZ(-2deg) scale(0.98);
      }
      100% {
        opacity: 1;
        transform: translateY(0) rotateZ(0deg) scale(1);
      }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
      20%, 40%, 60%, 80% { transform: translateX(4px); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  }
`;

/**
 * Utility classes for common patterns
 */
export const utilities = css`
  :global() {
    /* Text utilities */
    .text-gold {
      color: ${theme.colors.accent.gold};
    }

    .text-impostor {
      color: ${theme.colors.role.impostor};
    }

    .text-center {
      text-align: center;
    }

    /* Glow utilities */
    .glow-gold {
      box-shadow: ${theme.shadows.glow.gold};
    }

    .glow-gold-strong {
      box-shadow: ${theme.shadows.glow.goldStrong};
    }

    .glow-impostor {
      box-shadow: ${theme.shadows.glow.impostor};
    }

    /* Visibility utilities */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    /* Container utilities */
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 ${theme.spacing[4]};

      @media (min-width: 768px) {
        padding: 0 ${theme.spacing[6]};
      }

      @media (min-width: 1024px) {
        padding: 0 ${theme.spacing[8]};
      }
    }
  }
`;
