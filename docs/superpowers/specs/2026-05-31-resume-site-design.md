# Resume Site — Design Spec

**Date:** 2026-05-31
**Owner:** Paarth Rajpal
**Status:** Approved (design); content + implementation pending

## Goal

A polished, animated, interactive personal **resume site** that doubles as a downloadable, ATS-friendly 1-page PDF. Flagship personal link for **internship recruiters, college admissions, and general "this is me"** audiences.

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Visual direction | **Editorial / minimal** (matches Geist blog aesthetic; calm, premium, whitespace-heavy) |
| Motion level | **Level 2 — Kinetic**: staggered fade-up reveals on scroll, scroll-driven section transitions, count-up stats, magnetic buttons, drawn underlines. Tasteful, not playful. |
| PDF strategy | **Separate clean 1-page PDF** generated from the same data source via `@react-pdf/renderer`. Real selectable text, ATS-friendly. Denser/standard layout, distinct from the expressive site. |
| Theme | Light editorial only (no dark mode for v1) |
| Deployment | Standalone repo, its own Vercel project. **Paarth handles repo creation + Vercel deploy**; Claude pings when code is ready to push. |

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion (animation)
- `@react-pdf/renderer` (PDF generation)
- Deploy: Vercel

## Architecture

**Single source of truth:** `data/resume.ts` — typed object holding `profile`, `links`, `experience[]`, `projects[]`, `skills`, `education`. Both the website and the PDF render from this file so they never drift.

**Component boundaries (each isolated, testable):**
- `data/resume.ts` — content + types
- Site components: `Hero`, `Section`, `Reveal` (animation wrapper), `ExperienceItem`, `ProjectCard`, `SkillGroup`, `StatStrip`, `DownloadButton`
- PDF: `ResumePDF` document component (consumes same data)
- `app/page.tsx` composes the site sections

Animation logic is isolated in `Reveal` so section components stay clean.

## Site structure (single scroll page)

1. **Hero** — eyebrow ("Computer Vision Engineer"), name, one-line value prop, CTA row (Download PDF · GitHub · Email), count-up stat strip
2. **About** — 2–3 sentence positioning
3. **Experience** — Mashgin (CV/ML intern), FRC Team 254 (Vision/AI lead), Hyperform (founder); tight bullets, scroll-reveal
4. **Projects** — selected cards (Hyperform 3D pose, FRC vision on Jetson Orin, Jarvis, etc.)
5. **Skills** — languages + CV/ML stack + tooling, grouped
6. **Education** — Bellarmine College Prep (class of 2028) + honors
7. **[Phase-2 slot]** — reserved section for the 3D bench-press keypoint viewer
8. **Footer / Contact** — email, GitHub, blog, Download PDF

## The PDF

`<ResumePDF>` renders a polished, ATS-friendly **1-page** resume from `data/resume.ts`: header (name/contact), Education, Experience, Projects, Skills. "Download PDF" button generates and downloads client-side. Intentionally denser and more conventional than the site.

## Out of scope (v1)

- **3D bench-press keypoint viewer** (Phase 2): mouse-spin 3D view of bench-press keypoints from a user-supplied file, with velocity readout and bar-path trail. Layout reserves a clean slot; not built now.
- Blog integration, CMS/backend, dark mode.

## Open items

- Final resume **content** — gathered via interview (next step).
- Deploy target name (e.g. `paarth-r-resume.vercel.app`) — Paarth's call at deploy time.

## Success criteria

- Site renders the editorial layout with level-2 motion, responsive on mobile.
- "Download PDF" produces a clean, selectable-text, 1-page ATS-friendly resume matching site content.
- Site and PDF both derive from `data/resume.ts` (no duplicated content).
