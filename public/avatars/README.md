# Animal Spy Avatars

## Quick Start

Open `preview.html` in your browser to see all avatars.

## Avatar List

1. **Fox** - Agent Fox (Sly and cunning) - `fox.svg`
2. **Cat** - Agent Shadow (Mysterious and stealthy) - `cat.svg`
3. **Raccoon** - Agent Bandit (Master of disguise) - `raccoon.svg`
4. **Owl** - Agent Wise (Observant and analytical) - `owl.svg`
5. **Penguin** - Agent Dapper (Smooth and sophisticated) - `penguin.svg`
6. **Bear** - Agent Bravo (Strong and dependable) - `bear.svg`
7. **Rabbit** - Agent Swift (Quick and agile) - `rabbit.svg`
8. **Wolf** - Agent Lone (Independent operator) - `wolf.svg`

## Usage in Code

```typescript
import { getAvatarById, getAllAvatars } from '@/data/avatars';

// Get specific avatar
const foxAvatar = getAvatarById('fox');

// Use in component
<img src={foxAvatar.svgPath} alt={foxAvatar.name} />
```

See `/src/data/AVATAR_USAGE_EXAMPLES.tsx` for more examples.

## Files

- **SVG Files**: 8 avatar images (1.2-1.8 KB each)
- **preview.html**: Visual preview of all avatars
- **Total Size**: ~11 KB for all avatars

## Design

- **Style**: Minimalist Shadow Theater aesthetic
- **Format**: SVG (scalable to any size)
- **Elements**: Fedora hat, sunglasses, trench coat collar
- **Size**: 200×200px viewBox
- **Colors**: Dark palette with animal-specific accent colors

## Attribution

Created specifically for the Impostor Game project.
Original designs, no external sources used.
