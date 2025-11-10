/**
 * Shadow Theater Design System - Theme Configuration
 * Dark & mysterious atmosphere with dramatic reveals
 */

export const theme = {
  // Color Palette - Deep purples, blacks, and gold accents
  colors: {
    // Background colors - Deep, mysterious darks
    background: {
      primary: '#0A0612',      // Deepest night
      secondary: '#1A0F2E',    // Dark purple shadow
      tertiary: '#2A1B3D',     // Lighter purple mist
      overlay: 'rgba(10, 6, 18, 0.95)',
    },

    // Accent colors
    accent: {
      gold: '#D4AF37',         // Spotlight gold
      goldLight: '#F4D03F',    // Bright gold highlight
      goldDark: '#B8941F',     // Dimmed gold
    },

    // Role colors
    role: {
      impostor: '#8B0000',     // Dark red for impostor
      impostorGlow: '#DC143C', // Crimson glow
      innocent: '#4A5568',     // Neutral gray
      innocentGlow: '#718096', // Light gray glow
    },

    // UI State colors
    state: {
      success: '#2D7A3E',
      warning: '#D4AF37',
      danger: '#8B0000',
      info: '#4A5568',
    },

    // Text colors
    text: {
      primary: '#F7FAFC',      // Pure white text
      secondary: '#E2E8F0',    // Soft white
      muted: '#A0AEC0',        // Muted gray
      gold: '#D4AF37',         // Gold highlight text
      danger: '#DC143C',       // Red for danger
    },

    // Border colors
    border: {
      default: 'rgba(212, 175, 55, 0.2)',  // Subtle gold
      active: 'rgba(212, 175, 55, 0.6)',   // Brighter gold
      danger: 'rgba(139, 0, 0, 0.4)',      // Red border
    },
  },

  // Typography - Elegant serif for headings, clean sans-serif for body
  typography: {
    fonts: {
      heading: '"Playfair Display", serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"Fira Code", "Courier New", monospace',
    },

    sizes: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
    },

    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },

    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Spacing Scale - Consistent rhythm
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },

  // Border Radius - Subtle curves
  radius: {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.5rem',  // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    full: '9999px',
  },

  // Shadow & Glow Effects - Dramatic lighting
  shadows: {
    // Standard shadows
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',

    // Dramatic shadows
    dramatic: '0 30px 60px -15px rgba(0, 0, 0, 0.8)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)',

    // Glow effects
    glow: {
      gold: '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)',
      goldStrong: '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3), 0 0 90px rgba(212, 175, 55, 0.1)',
      impostor: '0 0 20px rgba(220, 20, 60, 0.4), 0 0 40px rgba(220, 20, 60, 0.2)',
      impostorStrong: '0 0 30px rgba(220, 20, 60, 0.6), 0 0 60px rgba(220, 20, 60, 0.3)',
      innocent: '0 0 20px rgba(113, 128, 150, 0.3), 0 0 40px rgba(113, 128, 150, 0.15)',
      spotlight: '0 0 40px rgba(212, 175, 55, 0.5), 0 0 80px rgba(212, 175, 55, 0.3), 0 0 120px rgba(212, 175, 55, 0.15)',
    },
  },

  // Transition Timings - Smooth, dramatic animations
  transitions: {
    duration: {
      instant: '100ms',
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
      dramatic: '1000ms',
    },

    timing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      dramatic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  },

  // Z-index layers
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modalBackdrop: 400,
    modal: 500,
    popover: 600,
    tooltip: 700,
  },
} as const;

// Type exports for TypeScript
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeTypography = typeof theme.typography;
