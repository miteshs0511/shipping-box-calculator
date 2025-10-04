# Shipping Box Cost Calculator

Small React + Vite SPA to add boxes and calculate shipping cost from India to selected countries.

Prerequisites
- Node.js >= 18 and npm (or yarn/pnpm)

Setup
1. Install dependencies
   - npm install

Environment
- Vite automatically loads .env files (e.g. .env, .env.development). To override default multipliers, copy the example and edit:

  - cp .env.example .env
  - Edit .env to set any of:
    - VITE_MULTIPLIER_SWEDEN
    - VITE_MULTIPLIER_CHINA
    - VITE_MULTIPLIER_BRAZIL
    - VITE_MULTIPLIER_AUSTRALIA

- The app will validate values in development and warn if a provided env value is invalid; otherwise safe defaults are used.

Development
- Start dev server:
  - npm run dev
- Open http://localhost:5173

Build & Preview
- Build production bundle:
  - npm run build
- Preview production build locally:
  - npm run preview

Notes
- The app persists boxes to localStorage (simulates save/fetch endpoints).
- Do not commit .env files — .gitignore ignores them; keep .env.example in repo.
Notes
- The app persists boxes to localStorage (simulates save/fetch endpoints).
- Multipliers are loaded from Vite env (VITE_...) when provided; otherwise defaults are used.
