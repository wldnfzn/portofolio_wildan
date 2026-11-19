# Wildan Fauzan — Portfolio Website

Interactive bilingual (**EN / ID**) portfolio website built with **React 18**, **TypeScript**, **Vite**, **GSAP (ScrollTrigger)**, **Lenis Smooth Scroll**, and **Three.js (WebGL)**.

## Features
- **Bilingual Switcher (`EN / ID`)**: Instant switching between English and Bahasa Indonesia across all sections and downloadable ATS CV links (`/CV_Wildan_Fauzan_EN.pdf` and `/CV_Wildan_Fauzan_ID.pdf`).
- **3D WebGL Scenes (`Three.js`)**:
  - `Scene3D.tsx`: Interactive holographic system core with orbital rings and mouse/scroll parallax choreography.
  - `TechStack.tsx`: 24 interactive 3D spheres representing core technologies (`SDLC`, `PostgreSQL`, `Laravel`, `PHP`, `React`, `TypeScript`, `JavaScript`, `Node.js`, `Docker`, `Tailwind`, `MySQL`, `REST API`, `Expo`, `Git`).
- **Production-Safe Animation Stack**: Built using official `gsap` + `lenis` (no `gsap-trial`), ready for Vercel/Netlify deployment.

## Local Development
```bash
npm install
npm run dev
```

## Production Build & Preview
```bash
npm run build
npm run preview
# or run the lightweight static server:
node serve.mjs
```

## Credits
- Visual layout and scroll-driven motion style inspired by [MoncyDev/Portfolio-Website](https://github.com/MoncyDev/Portfolio-Website).
