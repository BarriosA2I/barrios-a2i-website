# Barrios A2I Logo Assets

## Required Logo File

**File:** `barrios-a2i-logo.png`
**Location:** This directory (`public/logos/`)
**Format:** PNG with transparent background
**Dimensions:** Minimum 512x512px (for best quality at all sizes)

## Logo Usage in Website

The Barrios A2I logo is used in 3 locations:

### 1. Navigation Header
- **File:** `components/Navigation.tsx`
- **Size:** 48px height (h-12)
- **Features:**
  - Hover scale effect (scale-110)
  - Cyan glow on hover
  - Priority loading for performance
  - Auto width (maintains aspect ratio)

### 2. Footer
- **File:** `components/Footer.tsx`
- **Size:** 64px height (h-16)
- **Features:**
  - Cyan drop shadow
  - Auto width

### 3. Hero Section (Mobile)
- **File:** `components/Hero.tsx`
- **Size:** 128px height (h-32)
- **Features:**
  - Float animation
  - Hidden on desktop (lg:hidden)
  - Shown on mobile/tablet only

## Logo Specifications

### Design Elements
- Geometric burst/shard design
- Cyan and gold color palette
- High contrast for dark backgrounds
- Text: "BARRIOS" and "A2I"

### Recommended Export Settings
```
Format: PNG
Background: Transparent
Resolution: 1024x1024px (or higher)
Color Space: sRGB
```

### Optional: SVG Version
For even sharper scaling, consider creating an SVG version:
- File: `barrios-a2i-logo.svg`
- Benefits: Perfect scaling at any size, smaller file size
- Update image paths from `.png` to `.svg`

## Installation

1. Save the uploaded Barrios A2I logo to this directory
2. Rename it to: `barrios-a2i-logo.png`
3. Verify the file exists: `C:\Users\gary\barrios-a2i-website\public\logos\barrios-a2i-logo.png`
4. Run `npm run dev` to test locally
5. Logo should appear in navigation, footer, and mobile hero

## Troubleshooting

### Logo not showing?
- Check file name is exactly: `barrios-a2i-logo.png`
- Verify file is in `public/logos/` directory
- Clear Next.js cache: `npm run dev` (restart dev server)
- Check browser console for 404 errors

### Logo looks blurry?
- Ensure logo is at least 512x512px
- Export at 2x resolution (1024x1024px) for retina displays
- Consider using SVG format for vector graphics

### Logo too large/small?
- Navigation: Edit `components/Navigation.tsx` - change `h-12` class
- Footer: Edit `components/Footer.tsx` - change `h-16` class
- Hero: Edit `components/Hero.tsx` - change `h-32` class

## Brand Guidelines

### Colors
- Cyan: #00D9FF (rgb(0, 217, 255))
- Gold/Amber: #FFA726 (rgb(255, 167, 38))
- Dark Navy: #0B1220 (backgrounds)

### Typography
- Primary: Orbitron (headings)
- Secondary: Inter (body text)
- Accent: Space Grotesk

### Effects
- Glow: `drop-shadow-[0_0_20px_rgba(0,217,255,0.6)]`
- Hover: Scale 110% over 300ms
- Animation: Float (gentle up/down movement)

---

**Status:** ✅ Logo integration complete
**Updated:** 2025-11-20
