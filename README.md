# paarth-resume

Animated, interactive resume site for Paarth Rajpal — with a one-click, ATS-friendly PDF download.

- **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind v4 · Motion · `@react-pdf/renderer`
- **Single source of truth:** all content lives in [`data/resume.ts`](data/resume.ts). The site **and** the PDF render from it, so they never drift. Edit once, both update.
- **Design spec:** [`docs/superpowers/specs/2026-05-31-resume-site-design.md`](docs/superpowers/specs/2026-05-31-resume-site-design.md)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build && npm start
```

## Editing content

Open `data/resume.ts`. Update profile, links, experience, projects, skills, education, awards, metrics. Both the page and the downloadable PDF reflect changes automatically.

## Phase 2 (planned)

A 3D bench-press keypoint viewer (mouse-spin, velocity readout, bar-path trail) drops into the reserved `Lab` section. Not built yet.
