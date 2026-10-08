### Project Title
AI Digital Book: Interactive App → Published Manuscript

### Project Summary
Designed and built an AI-assisted digital book experience using React and Tailwind, transforming generated content into an interactive web app, downloadable PDF, and a fully published Kindle and paperback book.

### Project Description
This project explores the intersection of UI engineering, AI-assisted creation, and digital publishing. I used Lovable as an AI co-builder to generate and iterate on the application structure, UI flows, and content, then refined the result into a production-quality digital experience. The app presents the book as an interactive, responsive interface across mobile, tablet, and desktop, simulating real page navigation. Beyond the web experience, I designed a content pipeline to produce a high-quality downloadable PDF and a print-ready manuscript, which has been published on Amazon Kindle and as a paperback. This project combines modern front-end architecture with emerging AI tools to deliver a complete end-to-end digital media product—from concept to published asset.

---

## Tech Stack

This project is a modern React-based digital publishing app that combines front-end engineering with AI-assisted content generation and media production. Every library and tool listed below is verified from `package.json` and the source code — nothing is embellished.

> **A note on animation libraries:** this project deliberately does **not** use Framer Motion, GSAP, or React Spring. The 3D page-turn is a hand-rolled CSS 3D transform system (detailed below), which keeps the bundle lean and gives full control over the physics, timing, and iOS Safari compositing behavior.

### Core Framework & Build

- **React 18.3** (`react`, `react-dom`) — Component-based UI architecture with hooks-driven state and declarative rendering for the interactive book experience.
- **Vite 5.4** (`@vitejs/plugin-react-swc`) — SWC-based dev server and build tooling with instant fast refresh; a pure client-side SPA (no server framework).
- **TypeScript 5.8** — Strict typing across the codebase with path aliases (`@/*` → `./src/*`) for clean, scalable imports.
- **React Router DOM 6.30** — Client-side routing via `BrowserRouter` (`App.tsx`); serves the book viewer at `/` with a catch-all 404 route.

### Styling & Design System

- **Tailwind CSS 3.4** — Utility-first styling for a consistent, token-driven design system; content paths cover all `src/**/*.{ts,tsx}` files.
- **`@tailwindcss/typography`** — Prose styling utilities for long-form book text.
- **CSS-variable HSL theme tokens** (`src/index.css`) — Semantic color system (`--background`, `--foreground`, `--accent`, `--book-gold`, `--book-spine`, etc.) with light/dark variants; components never hard-code hex values.
- **shadcn/ui pattern built on Radix UI** — 25+ accessible primitives (`@radix-ui/react-dialog`, `-tooltip`, `-toast`, `-scroll-area`, `-tabs`, `-dropdown-menu`, `-popover`, `-hover-card`, `-accordion`, and more) composed into reusable components under `src/components/ui/`.
- **`class-variance-authority`** + **`clsx`** + **`tailwind-merge`** — Type-safe variant composition and conflict-free conditional class merging (`cn()` helper).
- **`tailwindcss-animate`** — Animation utilities (accordion, fade, zoom) on top of Tailwind.
- **Google Fonts** — Playfair Display (display/headings) and Libre Baskerville (body/UI text), loaded via `@import` in `src/index.css` and mapped to Tailwind `font-display` / `font-body` / `font-ui` families.
- **Custom keyframes** — A `page-turn` keyframe in `tailwind.config.ts` alongside the standard accordion animations.

### State, Data & Forms

- **TanStack React Query 5.83** — Server-state caching and async data management (`QueryClientProvider` in `App.tsx`).
- **React Hook Form 7.61** + **Zod 3.25** (`@hookform/resolvers`) — Type-safe form handling with schema-first validation.
- **date-fns 3.6** — Lightweight, immutable date formatting and manipulation utilities.

### Icons & UI Extras

- **Lucide React 0.462** — Primary icon set (navigation controls, buttons, loading spinners).
- **Sonner** + **Radix Toast** — Layered toast notification system (e.g., PDF generation feedback).
- **Embla Carousel 8.6** — Lightweight carousel engine (available for swipeable galleries).
- **Vaul 0.9** — Drawer/bottom-sheet component.
- **Recharts 2.15** — Composable charting library (available for data visualization).
- **`next-themes`** — Theme switching infrastructure (light/dark).
- **cmdk 1.1** — Command palette primitive (⌘K-style quick navigation).
- **React Day Picker 8.10** — Accessible date selection component.
- **`react-resizable-panels` 2.1** — Accessible resizable split-panel layouts.
- **`input-otp` 1.4** — One-time-passcode input primitive.

### Navigation & Animation (custom engineering, no animation library)

- **`src/components/PageTurn.tsx`** — A hand-rolled 3D page-flip animation system built directly on CSS `perspective(2000px)` + `rotateY()` transforms:
  - Two-phase turn-out → turn-in sequence (250 ms each) with directional `ease-in`/`ease-out` easing.
  - Dynamic inset shadows that simulate physical page depth during the flip.
  - A state machine (`idle → turning-out → turning-in → idle`) with animation-lock debouncing to prevent rapid double-click/spam navigation.
  - **iOS Safari/Chrome hardening:** during the `idle` state, 3D compositing is fully cleared (`transform: none`, `transformStyle: flat`, `willChange: auto`, explicit `backfaceVisibility`) to eliminate WebKit's washed-out layer-compositing artifacts on iPhone — verified on iPhone 12 Pro Max in both Safari and Chrome.
- **`src/hooks/use-swipe.ts`** — Touch swipe navigation (left = next, right = previous) with horizontal/vertical axis discrimination, wired into the book content area for mobile and tablet.
- **`src/hooks/use-layout-mode.ts`** — Responsive layout switching: desktop and landscape tablets render a 2-page open-book spread; phones and portrait tablets render a single page at a time, driven by `resize` and `orientationchange` listeners.
- **`src/hooks/use-mobile.tsx`** — Touch-device detection hook.
- **`src/components/StoryImage.tsx`** — Click/tap-to-zoom full-screen image overlay with a per-image loading spinner (`Loader2`) that resets on every `src` change, so the indicator works across all forward and backward page navigation — not just the first spread.
- **Keyboard navigation** — `ArrowLeft` / `ArrowRight` drive page turns on desktop, feeding the same locked navigation path as swipes and buttons.

### Media & PDF Export

- **jsPDF 4.2** (`src/lib/pdfGenerator.ts`) — Generates a KDP-compliant downloadable PDF at 6×9" trim size with proper inside/outside margins. Includes a full-bleed cover, a Contents page with dotted leaders and accurate page numbers, 50 story pages with cropped illustrations inside rounded rectangular frames, and a back cover. Custom helpers handle async image loading, aspect-ratio cropping, and contain/cover fitting.
- **Background texture** — A page background image is applied to every PDF page.
- **Single source of truth** — Story text, titles, and Milo's Notes flow from a shared data module (`src/data/bookData.ts`) consumed by both the app and the PDF pipeline, guaranteeing text parity between the two outputs.

### Testing

- **Vitest 3.2** (`vitest.config.ts`, `src/test/`) — Unit test runner with a jsdom environment and dedicated setup file.
- **Testing Library** (`@testing-library/react` 16, `@testing-library/jest-dom` 6) — Behavioral component testing focused on user-visible outcomes.
- **Playwright 1.57** (`@playwright/test`, `playwright.config.ts`, `playwright-fixture.ts`) — End-to-end browser automation for cross-device flow verification, including signed-in and navigation paths.

### Tooling & Quality

- **ESLint 9** (flat config) + **`typescript-eslint` 8** + **`eslint-plugin-react-hooks`** / **`eslint-plugin-react-refresh`** — Linting with React-specific correctness rules.
- **PostCSS 8** + **Autoprefixer** — CSS processing with automatic vendor prefixing for cross-browser support.
- **`lovable-tagger`** (dev-only) — Component tagging for the Lovable platform.

### AI & Content Generation

- **Lovable** — AI co-builder used to generate the application structure, UI flows, and assist with content transformation into a digital book format.
- **AI-assisted workflows for:**
  - Structuring chapters and layout
  - Generating visuals and narrative concepts
  - Iterating on UX and storytelling presentation
- **AI-generated illustrations** — 50 Pixar-inspired semi-realistic 3D story images plus cover art, with consistent character identity across all illustrations (defined in `src/data/bookData.ts`).

### Deployment & Publication

- **Hosted via Lovable's managed hosting environment** (preview + published app) with automatic builds on change.
- **Designed to be portable** to platforms like Vercel if needed.
- **Published on Amazon Kindle and as a paperback** via KDP — the same codebase powers the web app, the downloadable PDF, and the print-ready manuscript.

### Book Links

[Digital book app](https://designing-tomorrow-with-milo.lovable.app/)

[Amazon paperback](https://www.amazon.com/Designing-Tomorrow-Milo-Families-Together/dp/B0HLH8S53G/ref=sr_1_1?crid=1N52D6YV1MG45&dib=eyJ2IjoiMSJ9.gfsm1Y4Ya44_tQxsjJB9GuwSwSWYapaJ5sI9Ypn9wGTGjHj071QN20LucGBJIEps.KJ1Kir1foQc6J13xbHPVr0agDnuwwOVPTQJ23ajifxU&dib_tag=se&keywords=designing+tomorrow+with+milo&qid=1791419481&sprefix=designing+tomorrow+with+milo%2Caps%2C194&sr=8-1)
