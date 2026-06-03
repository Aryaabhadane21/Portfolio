# Aryaa Bhadane — Portfolio

A stunning 3D animated portfolio built with **React + Tailwind CSS + Vite**.

## Features
- 🎲 Rotating 3D CSS cube in the hero
- ✨ Live particle constellation background
- 🖱️ Custom cursor with trailing ring
- 🎬 Scroll-triggered fade-up reveal animations
- 💎 Glassmorphism nav with blur
- 📱 Fully responsive

## Tech Stack
- React 18
- Tailwind CSS 3
- Vite 5
- Google Fonts (Syne + Outfit)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to GitHub Pages

1. Install the deploy package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. Add to `vite.config.js`:
   ```js
   base: '/your-repo-name/'
   ```

4. Run:
   ```bash
   npm run deploy
   ```

## Folder Structure

```
aryaa-portfolio/
├── src/
│   ├── App.jsx        # Main portfolio component
│   ├── index.css      # Global styles + 3D cube + animations
│   └── main.jsx       # React entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```
