# Shadow Theater - Quick Reference

## 🚀 Quick Start

```tsx
import { Button, Card } from '@/components';
import { theme } from '@/styles';
```

## 🎨 Common Colors

```typescript
theme.colors.background.primary      // #0A0612
theme.colors.accent.gold             // #D4AF37
theme.colors.role.impostor           // #8B0000
theme.colors.text.primary            // #F7FAFC
```

## 📏 Common Spacing

```typescript
theme.spacing[2]   // 8px
theme.spacing[4]   // 16px
theme.spacing[6]   // 24px
theme.spacing[8]   // 32px
```

## ✨ Common Animations

```tsx
import { spotlightReveal, fadeInUp, glowPulse, voteDrop } from '@/styles/animations';

const Animated = styled.div`
  animation: ${spotlightReveal} 1s ease-out;
`;
```

## 🔘 Button Quick Reference

```tsx
// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Features
<Button withGlow>With Glow</Button>
<Button isLoading>Loading</Button>
<Button fullWidth>Full Width</Button>
<Button disabled>Disabled</Button>
```

## 🃏 Card Quick Reference

```tsx
// Variants
<Card variant="default">Default</Card>
<Card variant="elevated">Elevated</Card>
<Card variant="outlined">Outlined</Card>
<Card variant="spotlight">Spotlight</Card>

// Sizes
<Card size="sm">Small</Card>
<Card size="md">Medium</Card>
<Card size="lg">Large</Card>

// Features
<Card withAnimation="spotlight">Animated</Card>
<Card withGlow>With Glow</Card>
<Card interactive onClick={handler}>Clickable</Card>

// Structure
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Subtitle>Subtitle</Card.Subtitle>
  </Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

## 🎭 Common Patterns

### Spotlight Reveal
```tsx
<Card variant="spotlight" withAnimation="spotlight" withGlow>
  <h2>Important Reveal!</h2>
</Card>
```

### Impostor Reveal
```tsx
<Card variant="spotlight" size="lg" withAnimation="spotlight" withGlow>
  <Card.Title style={{ color: theme.colors.role.impostor }}>
    You are the Impostor!
  </Card.Title>
</Card>
```

### Button Group
```tsx
<div style={{ display: 'flex', gap: theme.spacing[4] }}>
  <Button variant="primary">Confirm</Button>
  <Button variant="ghost">Cancel</Button>
</div>
```

### Loading Button
```tsx
<Button variant="primary" isLoading>
  Processing...
</Button>
```

## 💡 Pro Tips

1. Use `withGlow` sparingly for maximum impact
2. Combine `variant="spotlight"` with `withAnimation="spotlight"` for dramatic reveals
3. Use `theme.spacing` for consistent gaps and padding
4. Apply `interactive` to cards for hover effects
5. Use `fullWidth` on mobile for better UX

## 🎯 Common Use Cases

| Use Case | Recommended Pattern |
|----------|-------------------|
| Role Reveal | `Card variant="spotlight" withAnimation="spotlight" withGlow` |
| Vote Button | `Button variant="danger" withGlow` |
| Start Game | `Button variant="primary" size="lg" fullWidth` |
| Settings | `Button variant="secondary"` or `variant="ghost"` |
| Loading | `Button isLoading` |
| Player Card | `Card variant="outlined" interactive` |
| Important Notice | `Card variant="elevated"` |
