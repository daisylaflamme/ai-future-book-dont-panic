# Update README — Accurate, Detailed Tech Stack Documentation

## Goal
Rewrite `README.md` so the tech stack section reflects what the project actually uses (verified from `package.json`, config files, and source), and expand it into a detailed, accurate breakdown. The current README incorrectly lists **Next.js** — the project uses **Vite + React Router**.

## What's wrong today
- README claims "Next.js – Used for routing" — the project uses Vite (`vite.config.ts`) and `react-router-dom` for routing. No Next.js dependency exists.
- Tech stack section is thin and lists no libraries beyond React/Tailwind/TypeScript.
- No mention of jsPDF, Radix UI, the page-turn animation system, swipe navigation, or the PDF export pipeline.

## Verified tech stack (from package.json + source)
**Core framework & build**
- React 18.3 (`react`, `react-dom`)
- Vite 5.4 (`@vitejs/plugin-react-swc` — SWC-based fast refresh)
- TypeScript 5.8
- React Router DOM 6.30 (client-side routing, `BrowserRouter` in `App.tsx`)

**Styling & design system**
- Tailwind CSS 3.4 (utility-first, with CSS-variable HSL theme tokens in `src/index.css`)
- shadcn/ui pattern built on Radix UI primitives (~20+ `@radix-ui/*` packages)
- `class-variance-authority` + `clsx` + `tailwind-merge` for variant composition
- `tailwindcss-animate` for animation utilities
- Google Fonts: Playfair Display (display/headings) + Libre Baskerville (body/UI)

**State & data**
- TanStack React Query 5.83
- React Hook Form 7.61 + Zod 3.25 (form validation)

**Icons & UI extras**
- Lucide React 0.462 (icons)
- Sonner + Radix Toast (notifications)
- Embla Carousel, Vaul (drawer), Recharts (charting) — available though lightly used

**Media / PDF export**
- jsPDF 4.2 (`src/lib/pdfGenerator.ts`) — generates a KDP-compliant 6×9" PDF with cover, contents page, story pages, and back cover; custom image cropping/contain logic

**Navigation & animation (custom, no library)**
- `src/components/PageTurn.tsx` — CSS 3D `perspective` + `rotateY` page-flip animation with shadow depth and animation-lock debouncing
- `src/hooks/use-swipe.ts` — touch swipe navigation (left/right)
- `src/hooks/use-layout-mode.ts` — responsive spread (2-page) vs single-page mode
- `src/components/StoryImage.tsx` — click/tap-to-zoom full-screen image overlay with loading spinner

**Testing**
- Vitest 3.2 + Testing Library (`@testing-library/react`, `@testing-library/jest-dom`) + jsdom
- Playwright 1.57 (`playwright.config.ts`, `playwright-fixture.ts`) — E2E tests

**Tooling**
- ESLint 9 + `typescript-eslint` + `eslint-plugin-react-hooks` / `react-refresh`
- PostCSS + Autoprefixer
- `lovable-tagger` (dev-only component tagging)

**AI & content**
- Lovable — AI co-builder for app structure, UI, and content generation
- AI-generated Pixar-inspired 3D illustrations (50 story images + covers)

**Deployment**
- Hosted on Lovable managed hosting
- Published on Amazon Kindle + paperback (KDP)

## Changes to README.md
Rewrite the file in place, keeping the existing Project Summary, Project Description, and Book Links sections intact, and replacing the Tech Stack + Frontend + AI + Media + Deployment sections with a detailed, accurate breakdown matching the verified list above. Structure with clear headings and bullet lists. No fabricated details — every entry comes from `package.json` or source.

## Out of scope
- No source code changes, no dependency changes, no config changes. README-only edit.
