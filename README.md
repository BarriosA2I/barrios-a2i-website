# Barrios A2I Website

Enterprise-grade AI orchestration platform website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

## 📁 Project Structure

```
barrios-a2i-website/
├── app/
│   ├── globals.css           # Global styles + Tailwind utilities
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Home page
├── components/
│   ├── Navigation.tsx        # Header navigation with dropdown menus
│   ├── HeroDualPath.tsx      # Hero section with animated logo + dual CTAs
│   ├── FeaturesSection.tsx   # Core capabilities showcase
│   └── Footer.tsx            # Footer with links and social icons
├── public/
│   ├── videos/               # Video assets (logo animation, backgrounds)
│   ├── images/               # Images (posters, fallbacks, OG images)
│   └── logos/                # Logo variants
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind theme customization
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Cyber Cyan**: `#00D9FF` - Primary brand color
- **Cyber Gold**: `#FFA726` - Accent/secondary color
- **Navy Deep**: `#0A1628` - Dark backgrounds
- **Slate Tones**: `slate-950`, `slate-900`, `slate-800` - UI surfaces

### Typography
- **Font**: Space Grotesk (Google Fonts)
- **Usage**: `font-space` class for headings and brand text

### Animations
- `pulse-glow` - Pulsing glow effect for emphasis
- `float` - Floating animation for interactive elements
- Framer Motion for page transitions and reveals

## ✨ Features

### Implemented
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Animated hero section with video logo support
- ✅ Dual CTA paths (SMB Quick-Win + Enterprise Infrastructure)
- ✅ Features showcase with hover effects
- ✅ Navigation with dropdown menus + mobile menu
- ✅ SEO optimized (metadata, Open Graph, Twitter cards)
- ✅ Smooth scroll animations with Framer Motion
- ✅ Custom scrollbar and focus states
- ✅ Grid pattern backgrounds
- ✅ Gradient text effects

### Navigation Structure
- **Solutions**: SMB Automation, AI Infrastructure, Multi-Agent Systems
- **Products**
- **Case Studies**
- **Resources**: Blog, Documentation, Guides
- **Pricing**
- **Contact**
- **CTA**: Get Started

## 🎬 Required Assets

See [ASSETS-REQUIRED.md](./ASSETS-REQUIRED.md) for complete details.

**Critical files needed:**
- `public/videos/barrios-a2i-logo-animated.mp4` - Animated logo
- `public/images/barrios-a2i-logo-static.png` - Fallback logo
- `public/images/logo-poster.jpg` - Video poster frame
- `public/images/og-image.jpg` - Social media preview (1200x630)

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11.0
- **Icons**: Lucide React

### Environment
- **Node**: 20+
- **Package Manager**: npm

## 📋 Pre-Launch Checklist

Before deploying:

- [ ] Add all required media assets (videos, images)
- [ ] Configure favicon files
- [ ] Update social media links in Footer.tsx
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Configure domain and hosting
- [ ] Test on multiple devices/browsers
- [ ] Verify all navigation links work
- [ ] Check page load performance (Lighthouse score)
- [ ] Ensure video files are optimized (< 5MB each)
- [ ] Add actual company information to metadata

## 🎯 Page Routes

Currently implemented:
- `/` - Home page (landing)

To be implemented:
- `/qualify/smb` - SMB qualification flow
- `/qualify/enterprise` - Enterprise qualification flow
- `/solutions/*` - Solutions pages
- `/products` - Products showcase
- `/case-studies` - Case studies
- `/blog` - Blog listing
- `/docs` - Documentation
- `/pricing` - Pricing page
- `/contact` - Contact form
- `/about` - About page

## 🚧 Next Steps

1. **Add Assets** (Priority 1)
   - Create or source animated logo video
   - Generate poster images and fallbacks
   - Add favicon files

2. **Build Remaining Pages** (Priority 2)
   - Create qualification flow pages (`/qualify/smb` and `/qualify/enterprise`)
   - Build products and solutions pages
   - Add case studies section

3. **Integrate Backend** (Priority 3)
   - Set up contact form backend
   - Configure email notifications
   - Add analytics tracking

4. **Deploy** (Priority 4)
   - Choose hosting platform (Vercel, Netlify, AWS)
   - Configure environment variables
   - Set up CI/CD pipeline
   - Connect custom domain

## 📄 License

© 2025 Barrios A2I Systems. All rights reserved.

---

**Built with**: Next.js + TypeScript + Tailwind CSS + Framer Motion

**Status**: ✅ Core implementation complete, ready for assets and content
