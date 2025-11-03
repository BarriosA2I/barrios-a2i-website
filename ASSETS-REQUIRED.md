# Required Assets for Barrios A2I Website

This document outlines all media files needed for the website to function properly.

## 📁 Directory Structure

```
public/
├── videos/
│   ├── barrios-a2i-logo-animated.mp4    ← Hero section animated logo
│   └── network-viz-bg.mp4                ← Optional background video
├── images/
│   ├── logo-poster.jpg                   ← Poster frame for logo video
│   ├── barrios-a2i-logo-static.png       ← Fallback static logo
│   ├── network-bg-poster.jpg             ← Poster for background video
│   └── og-image.jpg                      ← Social media preview image (1200x630)
├── logos/
└── favicon files...
```

## 🎬 Video Files Required

### 1. **barrios-a2i-logo-animated.mp4** (REQUIRED)
- **Location**: `public/videos/barrios-a2i-logo-animated.mp4`
- **Purpose**: Main animated logo in hero section
- **Specifications**:
  - Format: MP4 (H.264 codec)
  - Recommended size: 800x800px (square aspect ratio)
  - File size: < 5MB for optimal loading
  - Duration: 3-10 seconds (looping)
  - Transparent background (if possible) or dark background
- **Notes**: This is the centerpiece of your landing page. Should showcase the A2I branding with professional animation.

### 2. **network-viz-bg.mp4** (OPTIONAL)
- **Location**: `public/videos/network-viz-bg.mp4`
- **Purpose**: Animated background showing network visualization
- **Specifications**:
  - Format: MP4 (H.264 codec)
  - Resolution: 1920x1080 (Full HD)
  - File size: < 10MB
  - Subtle, low-contrast animation
  - Dark theme (to blend with slate-950 background)
- **Notes**: Only displays on desktop (hidden on mobile for performance). Can be omitted if not available.

## 🖼️ Image Files Required

### 3. **logo-poster.jpg** (REQUIRED)
- **Location**: `public/images/logo-poster.jpg`
- **Purpose**: Poster frame for logo video (shows while video loads)
- **Specifications**:
  - Format: JPG or PNG
  - Size: 800x800px
  - Should be a representative frame from the animated logo video
- **Notes**: Extract a keyframe from your animated logo video.

### 4. **barrios-a2i-logo-static.png** (REQUIRED)
- **Location**: `public/images/barrios-a2i-logo-static.png`
- **Purpose**: Fallback image if video fails to load
- **Specifications**:
  - Format: PNG (with transparency preferred)
  - Size: 800x800px
  - High resolution for crisp display
- **Notes**: Should match the design of your animated logo.

### 5. **network-bg-poster.jpg** (OPTIONAL)
- **Location**: `public/images/network-bg-poster.jpg`
- **Purpose**: Poster frame for background network video
- **Specifications**:
  - Format: JPG
  - Resolution: 1920x1080
  - Dark, subtle design
- **Notes**: Only needed if you include the network-viz-bg.mp4 video.

### 6. **og-image.jpg** (RECOMMENDED)
- **Location**: `public/images/og-image.jpg`
- **Purpose**: Social media preview image (Open Graph)
- **Specifications**:
  - Format: JPG
  - Size: 1200x630px (exactly)
  - Shows Barrios A2I branding + tagline
  - Professional design
- **Notes**: This appears when your site is shared on social media (Twitter, LinkedIn, etc.)

## 🎨 Favicon Files (RECOMMENDED)

Place these in the `public/` directory root:

- **favicon.ico** (16x16 and 32x32 multi-size ICO file)
- **favicon-16x16.png** (16x16 PNG)
- **apple-touch-icon.png** (180x180 PNG for iOS)

Generate these from your logo using a favicon generator tool like [RealFaviconGenerator](https://realfavicongenerator.net/).

---

## 🚀 Creating Your Assets

### Option 1: You Already Have Video Assets
If you have the animated logo video:
1. Optimize it for web (compress to < 5MB)
2. Extract a poster frame as JPG
3. Create a static PNG version
4. Place files in the directories above
5. Run `npm run dev` to see it live!

### Option 2: You Need to Create Assets
**Animated Logo Video:**
- Use tools like After Effects, Blender, or online tools like Canva/Veed.io
- Create a simple animation: logo fade-in, subtle glow/pulse effect, rotation
- Export as MP4 with H.264 codec
- Recommended: 5-second loop with smooth transitions

**Static Logo:**
- Design in Figma, Illustrator, or Photoshop
- Export as high-res PNG with transparent background
- Should include "A2I" text with cyan/amber gradient styling

**Background Video (Optional):**
- Search for "network visualization" or "data flow" stock videos
- Sites: Pexels, Pixabay, Videvo (many free options)
- Look for dark-themed, subtle animations
- Ensure it's royalty-free for commercial use

### Option 3: Temporary Placeholders
If you want to launch immediately without videos:

**Quick Fix:**
1. Use just the static logo (barrios-a2i-logo-static.png)
2. Remove video elements from HeroDualPath.tsx
3. Replace with static image display
4. Add CSS animations (pulse, glow) for visual interest

---

## ✅ Verification Checklist

Before launching, verify:

- [ ] Logo displays correctly in hero section
- [ ] Logo video autoplays and loops smoothly (or static image looks good)
- [ ] Page loads quickly (< 3 seconds on average connection)
- [ ] Mobile experience is smooth (no heavy videos on mobile)
- [ ] Social media preview looks professional
- [ ] Favicon appears in browser tab

---

## 🛠️ Quick Start Commands

After adding your assets:

```bash
# Start development server
npm run dev

# Open in browser
# http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

---

## 📞 Need Help?

If you're missing assets or need design assistance:
1. Check the existing project files for any asset guidelines
2. Consider hiring a motion designer for the animated logo
3. Use placeholder tools like [Placeholder.com](https://placeholder.com) temporarily
4. Ensure all assets follow brand guidelines (cyan #00D9FF, amber #FFA726)

---

## 🎯 Priority Order

**Must Have (Launch Blockers):**
1. ✅ barrios-a2i-logo-static.png (can use this alone without video)
2. ✅ og-image.jpg (for professional social sharing)
3. ✅ favicon.ico (for browser tab branding)

**Should Have (Enhanced Experience):**
4. ⚡ barrios-a2i-logo-animated.mp4 (significantly improves wow factor)
5. ⚡ logo-poster.jpg (smooth loading experience)

**Nice to Have (Premium Touch):**
6. 🌟 network-viz-bg.mp4 (subtle premium effect)
7. 🌟 network-bg-poster.jpg (goes with background video)

---

**Last Updated**: October 31, 2025
**Project**: Barrios A2I Marketing Website v1.0
