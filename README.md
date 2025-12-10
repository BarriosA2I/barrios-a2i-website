# Barrios A2I Website

Production-grade AI orchestration platform website using the **Void Interface** design system.

## Tech Stack

- **Pure HTML/CSS** - No build tools required
- **Google Fonts** - Instrument Serif, Outfit, JetBrains Mono
- **Vercel** - Static hosting with clean URLs

## Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Void | `#030508` | Primary background |
| Cyan | `#00D4FF` | Primary accent, CTAs |
| Orange | `#FF7A3D` | Secondary accent |
| Violet | `#A78BFA` | Tertiary accent |

### Typography
- **Display**: Instrument Serif (headings)
- **Body**: Outfit (text)
- **Code**: JetBrains Mono (technical content)

## Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `index.html` | Landing page |
| `/blog` | `blog.html` | Technical articles |
| `/documentation` | `documentation.html` | Platform docs |
| `/guides` | `guides.html` | Implementation guides |
| `/contact` | `contact.html` | Contact form |

## Local Development

Simply open any HTML file in your browser:

```bash
# Using Python
python -m http.server 8000

# Using Node
npx serve

# Using PHP
php -S localhost:8000
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual

Upload all `.html` files to any static hosting provider.

## License

Copyright 2025 Barrios A2I. All rights reserved.
