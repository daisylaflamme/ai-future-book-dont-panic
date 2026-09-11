### Project Title
AI Digital Book: Interactive App → Published Manuscript

### Project Summary
Designed and built an AI-assisted digital book experience using React and Tailwind, transforming generated content into an interactive web app, downloadable PDF, and a fully published Kindle and paperback book.

### Project Description
This project explores the intersection of UI engineering, AI-assisted creation, and digital publishing. I used Lovable as an AI co-builder to generate and iterate on the application structure, UI flows, and content, then refined the result into a production-quality digital experience. The app presents the book as an interactive, responsive interface across mobile, tablet, and desktop, simulating real page navigation. Beyond the web experience, I designed a content pipeline to produce a high-quality downloadable PDF and a print-ready manuscript, which has been published on Amazon Kindle and as a paperback. This project combines modern front-end architecture with emerging AI tools to deliver a complete end-to-end digital media product—from concept to published asset.

---

## Tech Stack

This project is a modern React-based digital publishing app that combines front-end engineering with AI-assisted content generation and media production. Every library and tool listed below is verified from `package.json` and the source code.

### Core Framework & Build

- **React 18.3** (`react`, `react-dom`) — Component-based UI architecture for building an interactive digital book experience with hooks-driven state and declarative rendering.
- **Vite 5.4** (`@vitejs/plugin-react-swc`) — Lightning-fast dev server and build tool using SWC-based fast refresh. Replaces the original Next.js reference; this is a pure client-side Vite SPA.
- **TypeScript 5.8** — Strict typing for maintainability and scalable code structure, with path aliases (`@/*` → `./src/*`).
- **React Router DOM 6.30** — Client-side routing via `BrowserRouter` (`App.tsx`); serves the book viewer at `/` with a catch-all 404 route.

### Styling & Design System

- **Tailwind CSS 3.4** — Utility-first styling for rapid UI development and a consistent design system. Content paths cover all `src/**/*.{ts,tsx}` files.
- **CSS-variable HSL theme tokens** (`src/index.css`) — Semantic color system (`--background`, `--foreground`, `--accent`, `--book-gold`, etc.) with light/dark variants, never hard-coded hex values in components.
- **shadcn/ui pattern** built on **Radix UI** — ~20+ accessible primitives (`@radix-ui/react-dialog`, `-tooltip`, `-toast`, `-scroll-area`, `-tabs`, etc.) composed into reusable components under `src/components/ui/`.
- **`class-variance-authority`** + **`clsx`** + **`tailwind-merge`** — Variant composition and conditional class merging (`cn()` helper).
- **`tailwindcss-animate`** — Tailwind animation utilities (accordion, fade, zoom).
- **Google Fonts** — Playfair Display (display/headings) and Libre Baskerville (body/UI text), loaded via `@import` in `src/index.css` and mapped to Tailwind `font-display` / `font-body` / `font-ui` families.
- **Custom keyframes** — A `page-turn` keyframe in `tailwind.config.ts` alongside the standard accordion animations.

### State & Data

- **TanStack React Query 5.83** — Server-state and async data fetching management (`QueryClientProvider` in `App.tsx`).
- **React Hook Form 7.61** + **Zod 3.25** (`@hookform/resolvers`) — Type-safe form handling and schema validation.

### Icons & UI Extras

- **Lucide React 0.462** — Icon set used throughout the app (navigation, buttons, loading spinners).
- **Sonner** + **Radix Toast** — Toast notifications (PDF generation feedback, etc.).
- **Embla Carousel 8.6**, **Vaul 0.9** (drawer), **Recharts 2.15** — Available UI libraries (carousel, drawer, charting).
- **`next-themes`** — Theme switching support (light/dark).

### Navigation & Animation (custom, no external animation library)

- **`src/components/PageTurn.tsx`** — A hand-rolled 3D page-flip animation using CSS `perspective(2000px)` + `rotateY` transforms with directional shadows, a two-phase turn-out/turn-in sequence, and animation-lock debouncing to prevent rapid double-clicks.
- **`src/hooks/use-swipe.ts`** — Touch swipe navigation (left = next, right = previous) with horizontal/vertical movement detection, wired into the book content area for mobile/tablet.
- **`src/hooks/use-layout-mode.ts`** — Responsive layout switching: desktop/tablet-landscape show a 2-page open-book spread; phone/tablet-portrait show a single page at a time.
- **`src/components/StoryImage.tsx`** — Click/tap-to-zoom full-screen image overlay with a loading spinner (`Loader2`) that shows until each image finishes loading; resets on every `src` change so it works across all page navigations.
- **Keyboard navigation** — `ArrowLeft` / `ArrowRight` also drive page turns on desktop.

### Media & PDF Export

- **jsPDF 4.2** (`src/lib/pdfGenerator.ts`) — Generates a KDP-compliant downloadable PDF at 6×9" trim size with proper inside/outside margins. Includes a full-bleed cover, a Contents page with dotted leaders and accurate page numbers, 50 story pages with cropped illustrations inside rounded rectangular frames, and a back cover. Custom helpers handle image loading, aspect-ratio cropping, and contain/cover fitting.
- **Background texture** — A page background image is applied to every PDF page.
- **Content pipeline** — Story text, titles, and Milo's Notes flow from a shared data source (`src/data/bookData.ts`) used by both the app and the PDF, ensuring text parity between the two outputs.

### Testing

- **Vitest 3.2** (`vitest.config.ts`) — Unit test runner with jsdom environment.
- **Testing Library** (`@testing-library/react`, `@testing-library/jest-dom`) — Component testing utilities.
- **Playwright 1.57** (`playwright.config.ts`, `playwright-fixture.ts`) — End-to-end browser automation tests.

### Tooling

- **ESLint 9** + **`typescript-eslint`** + **`eslint-plugin-react-hooks`** / **`eslint-plugin-react-refresh`** — Linting with React-specific rules.
- **PostCSS** + **Autoprefixer** — CSS processing pipeline.
- **`lovable-tagger`** (dev-only) — Component tagging for the Lovable platform.

### AI & Content Generation

- **Lovable** — AI co-builder used to generate the application structure, UI flows, and assist with content transformation into a digital book format.
- **AI-assisted workflows for:**
  - Structuring chapters and layout
  - Generating visuals and narrative concepts
  - Iterating on UX and storytelling presentation
- **AI-generated illustrations** — 50 Pixar-inspired semi-realistic 3D story images plus cover art, with consistent character identity across all illustrations (defined in `src/data/bookData.ts`).

### Deployment

- **Hosted via Lovable's managed hosting environment** (preview + published app).
- **Designed to be portable** to platforms like Vercel if needed.
- **Published on Amazon Kindle and as a paperback** via KDP.

### Book Links

[Digital book app](https://ai-future-book-dont-panic.lovable.app/)

[Amazon paperback](https://www.amazon.com/AI-Humans-Stories-Families-Together/dp/B0GVWCB7RV/ref=sr_1_1?crid=1KZQPXETKEU46&dib=eyJ2IjoiMSJ9.SZNXqCq90NiGrxWE_3VcMA.IIL1-hzKCahlx7szFypq3-mbiNTe7D1f3hLJXvBY5Ws&dib_tag=se&keywords=AI%3A+Let+Me+Tell+You+What+I%E2%80%99ll+Do+With+Humans+%E2%80%94+Don%E2%80%99t+Panic&nsdOptOutParam=true&qid=1776353966&sprefix=ai+let+me+tell+you+what+i+ll+do+with+humans+don+t+panic%2Caps%2C122&sr=8-1)
