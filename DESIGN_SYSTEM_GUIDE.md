# Shadow Theater Design System

A dark, mysterious, and elegant design system for the Impostor game, featuring dramatic reveals, spotlight effects, and theatrical aesthetics.

## 🎭 Design Philosophy

The Shadow Theater design system creates an atmosphere of mystery and drama through:

- **Deep, mysterious color palette**: Purples, blacks, and gold accents
- **Dramatic lighting effects**: Spotlights, glows, and shadows
- **Elegant typography**: Playfair Display for headings, Inter for body text
- **Theatrical animations**: Curtain wipes, spotlight reveals, dramatic entrances
- **High contrast**: Ensuring readability while maintaining atmosphere

---

## 📁 File Structure

```
src/
├── styles/
│   ├── theme.ts          # Color palette, typography, spacing, shadows
│   ├── animations.ts     # Linaria keyframe animations
│   ├── global.ts         # Global CSS reset and base styles
│   └── index.ts          # Style exports
└── components/
    ├── Button/
    │   ├── Button.tsx    # Button component with variants
    │   └── index.ts
    └── Card/
        ├── Card.tsx      # Card component with variants
        └── index.ts
```

---

## 🎨 Color Palette

### Background Colors
```typescript
theme.colors.background.primary    // #0A0612 - Deepest night
theme.colors.background.secondary  // #1A0F2E - Dark purple shadow
theme.colors.background.tertiary   // #2A1B3D - Lighter purple mist
theme.colors.background.overlay    // rgba(10, 6, 18, 0.95)
```

### Accent Colors
```typescript
theme.colors.accent.gold          // #D4AF37 - Spotlight gold
theme.colors.accent.goldLight     // #F4D03F - Bright gold highlight
theme.colors.accent.goldDark      // #B8941F - Dimmed gold
```

### Role Colors
```typescript
theme.colors.role.impostor        // #8B0000 - Dark red for impostor
theme.colors.role.impostorGlow    // #DC143C - Crimson glow
theme.colors.role.innocent        // #4A5568 - Neutral gray
theme.colors.role.innocentGlow    // #718096 - Light gray glow
```

### Text Colors
```typescript
theme.colors.text.primary         // #F7FAFC - Pure white text
theme.colors.text.secondary       // #E2E8F0 - Soft white
theme.colors.text.muted           // #A0AEC0 - Muted gray
theme.colors.text.gold            // #D4AF37 - Gold highlight text
theme.colors.text.danger          // #DC143C - Red for danger
```

---

## 🔤 Typography

### Font Families
```typescript
theme.typography.fonts.heading    // "Playfair Display", serif
theme.typography.fonts.body       // "Inter", sans-serif
theme.typography.fonts.mono       // "Fira Code", monospace
```

### Font Sizes
```typescript
theme.typography.sizes.xs         // 0.75rem (12px)
theme.typography.sizes.sm         // 0.875rem (14px)
theme.typography.sizes.base       // 1rem (16px)
theme.typography.sizes.lg         // 1.125rem (18px)
theme.typography.sizes.xl         // 1.25rem (20px)
theme.typography.sizes['2xl']     // 1.5rem (24px)
theme.typography.sizes['3xl']     // 1.875rem (30px)
theme.typography.sizes['4xl']     // 2.25rem (36px)
theme.typography.sizes['5xl']     // 3rem (48px)
theme.typography.sizes['6xl']     // 3.75rem (60px)
theme.typography.sizes['7xl']     // 4.5rem (72px)
```

### Font Weights
```typescript
theme.typography.weights.light      // 300
theme.typography.weights.normal     // 400
theme.typography.weights.medium     // 500
theme.typography.weights.semibold   // 600
theme.typography.weights.bold       // 700
theme.typography.weights.extrabold  // 800
theme.typography.weights.black      // 900
```

---

## ✨ Animations

### Spotlight Reveal
Dramatic entrance with expanding light - perfect for role reveals.

```typescript
import { spotlightReveal } from '@/styles/animations';
import { styled } from '@linaria/react';

const RoleCard = styled.div`
  animation: ${spotlightReveal} 1s ease-out;
`;
```

### Curtain Wipe
Theatrical curtain opening effects.

```typescript
import { curtainWipeCenter, curtainWipeLeft, curtainWipeRight } from '@/styles/animations';

const Scene = styled.div`
  animation: ${curtainWipeCenter} 0.7s ease-out;
`;
```

### Glow Pulse
Rhythmic pulsing glow effect.

```typescript
import { glowPulse, glowPulseImpostor, glowPulseInnocent } from '@/styles/animations';

const ActiveCard = styled.div`
  animation: ${glowPulse} 2s ease-in-out infinite;
`;
```

### Vote Drop
Dramatic vote reveal with physics-based animation.

```typescript
import { voteDrop } from '@/styles/animations';

const Vote = styled.div`
  animation: ${voteDrop} 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;
```

### Fade Animations
```typescript
import {
  fadeIn,
  fadeOut,
  fadeInUp,
  fadeInDown,
  fadeInScale
} from '@/styles/animations';
```

### Other Animations
```typescript
import {
  shake,              // Tension and drama
  shakeIntense,       // Intense shake
  float,              // Ethereal floating
  floatSlow,          // Slow floating
  shimmer,            // Light sweep
  revealText,         // Character reveal
  dramaticEntrance,   // Full theatrical entrance
  cardFlip,           // 3D card flip
  spotlightScan,      // Moving spotlight
  bloodDrip,          // Impostor reveal effect
} from '@/styles/animations';
```

---

## 🎯 Shadow & Glow Effects

### Standard Shadows
```typescript
theme.shadows.sm          // Subtle shadow
theme.shadows.base        // Default shadow
theme.shadows.md          // Medium shadow
theme.shadows.lg          // Large shadow
theme.shadows.xl          // Extra large shadow
theme.shadows.dramatic    // Dramatic deep shadow
theme.shadows.inner       // Inset shadow
```

### Glow Effects
```typescript
theme.shadows.glow.gold              // Gold glow
theme.shadows.glow.goldStrong        // Strong gold glow
theme.shadows.glow.impostor          // Red impostor glow
theme.shadows.glow.impostorStrong    // Strong impostor glow
theme.shadows.glow.innocent          // Gray innocent glow
theme.shadows.glow.spotlight         // Dramatic spotlight glow
```

---

## 🧩 Components

### Button Component

The Button component comes with multiple variants and sizes.

#### Basic Usage
```tsx
import { Button } from '@/components';

function App() {
  return (
    <Button variant="primary" onClick={handleClick}>
      Start Game
    </Button>
  );
}
```

#### Variants
```tsx
// Primary button (gold gradient)
<Button variant="primary">Start Game</Button>

// Secondary button (outlined)
<Button variant="secondary">Settings</Button>

// Danger button (red, for voting)
<Button variant="danger">Vote Impostor</Button>

// Ghost button (transparent)
<Button variant="ghost">Cancel</Button>
```

#### Sizes
```tsx
<Button size="sm">Small Button</Button>
<Button size="md">Medium Button</Button>  {/* Default */}
<Button size="lg">Large Button</Button>
```

#### Special Features
```tsx
// With glow animation
<Button variant="primary" withGlow>
  Glowing Button
</Button>

// Loading state
<Button variant="primary" isLoading>
  Processing...
</Button>

// Full width
<Button variant="primary" fullWidth>
  Full Width Button
</Button>

// Disabled
<Button variant="primary" disabled>
  Disabled Button
</Button>
```

#### Complete Example
```tsx
<Button
  variant="danger"
  size="lg"
  withGlow
  fullWidth
  onClick={handleVote}
>
  Cast Your Vote
</Button>
```

---

### Card Component

The Card component is a versatile container with multiple variants and sub-components.

#### Basic Usage
```tsx
import { Card } from '@/components';

function PlayerCard() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Player Status</Card.Title>
        <Card.Subtitle>Waiting for votes...</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <p>Game content goes here</p>
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary">View Details</Button>
      </Card.Footer>
    </Card>
  );
}
```

#### Variants
```tsx
// Default card
<Card variant="default">Content</Card>

// Elevated card (larger shadow)
<Card variant="elevated">Content</Card>

// Outlined card (with backdrop blur)
<Card variant="outlined">Content</Card>

// Spotlight card (gold border with glow)
<Card variant="spotlight">
  <h2>You are the Impostor!</h2>
</Card>
```

#### Sizes
```tsx
<Card size="sm">Small padding</Card>
<Card size="md">Medium padding</Card>  {/* Default */}
<Card size="lg">Large padding</Card>
```

#### Animations
```tsx
// Fade in from bottom
<Card withAnimation="fade">Content</Card>

// Dramatic spotlight reveal
<Card withAnimation="spotlight">Content</Card>

// No animation
<Card withAnimation="none">Content</Card>  {/* Default */}
```

#### Special Features
```tsx
// With glow pulse
<Card withGlow>
  Pulsing glow effect
</Card>

// Interactive (clickable)
<Card interactive onClick={handleClick}>
  Click me!
</Card>
```

#### Complete Example
```tsx
<Card
  variant="spotlight"
  size="lg"
  withAnimation="spotlight"
  withGlow
>
  <Card.Header>
    <Card.Title>Role Revealed</Card.Title>
    <Card.Subtitle>The moment of truth...</Card.Subtitle>
  </Card.Header>
  <Card.Body>
    <h2 style={{ color: theme.colors.role.impostor }}>
      You are the Impostor!
    </h2>
    <p>Deceive the others and survive until the end.</p>
  </Card.Body>
  <Card.Footer>
    <Button variant="danger" withGlow fullWidth>
      Begin Mission
    </Button>
  </Card.Footer>
</Card>
```

---

## 🚀 Setup & Installation

### 1. Install Dependencies
```bash
npm install @linaria/core @linaria/react @linaria/babel-preset
```

### 2. Configure Linaria

Add to your `babel.config.js` or `.babelrc`:
```javascript
module.exports = {
  presets: [
    '@linaria',
    // ... other presets
  ],
};
```

For Vite, install and configure:
```bash
npm install @linaria/vite
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import linaria from '@linaria/vite';

export default defineConfig({
  plugins: [
    react(),
    linaria({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
  ],
});
```

### 3. Import Global Styles

In your main app file (e.g., `App.tsx` or `index.tsx`):

```tsx
import { fontsImport, globalReset, globalStyles, utilities } from '@/styles';

function App() {
  return (
    <div className={`${fontsImport} ${globalReset} ${globalStyles} ${utilities}`}>
      {/* Your app content */}
    </div>
  );
}
```

Or apply globally in your HTML:
```html
<!-- Add to index.html head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## 💡 Usage Examples

### Example 1: Game Start Screen
```tsx
import { Card, Button } from '@/components';
import { theme } from '@/styles';

function GameStart() {
  return (
    <div style={{ padding: theme.spacing[8] }}>
      <Card
        variant="elevated"
        size="lg"
        withAnimation="spotlight"
      >
        <Card.Header>
          <Card.Title style={{ textAlign: 'center', fontSize: theme.typography.sizes['5xl'] }}>
            Shadow Theater
          </Card.Title>
          <Card.Subtitle style={{ textAlign: 'center' }}>
            A game of deception and deduction
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
            <Button variant="primary" size="lg" fullWidth withGlow>
              Start New Game
            </Button>
            <Button variant="secondary" size="lg" fullWidth>
              Join Game
            </Button>
            <Button variant="ghost" size="md" fullWidth>
              Settings
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
```

### Example 2: Role Reveal
```tsx
import { Card, Button } from '@/components';
import { theme } from '@/styles';
import { styled } from '@linaria/react';
import { bloodDrip } from '@/styles/animations';

const ImpostorText = styled.h1`
  color: ${theme.colors.role.impostor};
  font-size: ${theme.typography.sizes['4xl']};
  text-align: center;
  animation: ${bloodDrip} 1s ease-out forwards;
  animation-delay: 0.5s;
`;

function RoleReveal({ role }) {
  const isImpostor = role === 'impostor';

  return (
    <Card
      variant={isImpostor ? "spotlight" : "elevated"}
      size="lg"
      withAnimation="spotlight"
      withGlow={isImpostor}
    >
      <Card.Header>
        <Card.Title style={{ textAlign: 'center' }}>
          Your Role
        </Card.Title>
      </Card.Header>
      <Card.Body>
        {isImpostor ? (
          <ImpostorText>You are the Impostor!</ImpostorText>
        ) : (
          <h1 style={{
            color: theme.colors.text.primary,
            textAlign: 'center',
            fontSize: theme.typography.sizes['4xl']
          }}>
            You are Innocent
          </h1>
        )}
        <p style={{ textAlign: 'center', marginTop: theme.spacing[4] }}>
          {isImpostor
            ? "Deceive the others and survive until the end."
            : "Work together to find the impostor."}
        </p>
      </Card.Body>
      <Card.Footer style={{ justifyContent: 'center' }}>
        <Button variant={isImpostor ? "danger" : "primary"} withGlow>
          Continue
        </Button>
      </Card.Footer>
    </Card>
  );
}
```

### Example 3: Voting Interface
```tsx
import { Card, Button } from '@/components';
import { theme } from '@/styles';
import { styled } from '@linaria/react';
import { voteDrop } from '@/styles/animations';

const VoteCard = styled(Card)`
  animation: ${voteDrop} 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  animation-fill-mode: backwards;
`;

function VotingInterface({ players, onVote }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: theme.spacing[4],
      padding: theme.spacing[6]
    }}>
      {players.map((player, index) => (
        <VoteCard
          key={player.id}
          variant="outlined"
          interactive
          onClick={() => onVote(player.id)}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Card.Header>
            <Card.Title>{player.name}</Card.Title>
            <Card.Subtitle>Click to vote</Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <p>Suspicion Level: {player.suspicion}%</p>
          </Card.Body>
        </VoteCard>
      ))}
    </div>
  );
}
```

---

## 🎨 Visual Aesthetic Description

### Overall Atmosphere
The Shadow Theater design system creates a **mysterious, theatrical ambiance** reminiscent of:
- **Old theater curtains** opening to reveal secrets
- **Spotlight effects** illuminating key moments
- **Deep shadows** hiding what lurks in darkness
- **Golden accents** like theatrical lights piercing the gloom

### Color Experience
- **Background**: Deep purples and near-blacks create an enveloping darkness
- **Accents**: Gold spotlights draw attention to important elements
- **Roles**: Crimson red for impostors creates tension; neutral grays for innocents maintain calm
- **Contrast**: High contrast ensures readability while maintaining mood

### Typography Feel
- **Headings** (Playfair Display): Elegant, classical, theatrical - like vintage theater marquees
- **Body** (Inter): Clean, modern, readable - doesn't distract from the drama
- **Spacing**: Generous letter-spacing on headings adds gravitas and importance

### Animation Style
- **Dramatic reveals**: Nothing just "appears" - everything has a theatrical entrance
- **Smooth transitions**: 300-500ms timing keeps interactions feeling polished
- **Glow effects**: Pulsing glows create living, breathing interfaces
- **Physics-based**: Vote drops and shakes feel weighty and impactful

### Interactive Elements
- **Buttons**: Gradient fills with strong shadows, hover states that lift and glow
- **Cards**: Elevated containers that respond to interaction with gentle movements
- **Focus states**: Clear golden outlines for accessibility
- **Loading states**: Elegant spinners that match the aesthetic

### Responsive Behavior
- Typography scales gracefully across screen sizes
- Cards adapt to container widths
- Spacing adjusts for mobile comfort
- Touch targets remain accessible

---

## 🎯 Best Practices

### Do's ✅
- Use the theme object for all colors, spacing, and typography
- Apply animations purposefully for dramatic moments
- Maintain high contrast for readability
- Use spotlight variant for role reveals and important moments
- Combine withGlow with important interactive elements
- Use semantic HTML and ARIA labels for accessibility

### Don'ts ❌
- Don't use colors outside the theme palette
- Don't overuse glow effects (they lose impact)
- Don't animate everything (reserve for key moments)
- Don't sacrifice readability for aesthetics
- Don't forget hover/focus states for interactive elements
- Don't use animations longer than 1 second for common interactions

### Performance Tips
- Linaria generates zero-runtime CSS for optimal performance
- Animations use GPU-accelerated properties (transform, opacity)
- Glow effects are performant box-shadows
- Consider reducing animations for users who prefer reduced motion

---

## 📝 TypeScript Support

All theme values are fully typed:

```typescript
import { theme, Theme, ThemeColors } from '@/styles';

// Autocomplete and type checking
const myColor: string = theme.colors.accent.gold;
const mySpacing: string = theme.spacing[4];
const myFont: string = theme.typography.fonts.heading;
```

---

## 🎭 Summary

The Shadow Theater design system provides everything needed to create a mysterious, dramatic, and elegant Impostor game interface. With carefully crafted colors, typography, animations, and components, you can build an immersive theatrical experience that keeps players engaged and on edge.

**Key Features:**
- 🎨 Complete color palette with dramatic purples, blacks, and golds
- ✨ Rich animation library for theatrical effects
- 🎯 Reusable Button and Card components with multiple variants
- 📱 Responsive and accessible by default
- ⚡ Zero-runtime CSS with Linaria
- 🎭 Theatrical, mysterious aesthetic throughout

Start building your dramatic game interface today!
