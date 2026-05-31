import { resume } from "@/data/resume";
import { Reveal } from "./components/Reveal";
import { Metrics } from "./components/Metrics";
import { MagneticButton } from "./components/MagneticButton";
import { DownloadButton } from "./components/DownloadButton";
import { ScrollProgress } from "./components/ScrollProgress";

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="md:sticky md:top-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
        <span className="text-accent">{index}</span>
        <span className="mx-2 text-line">/</span>
        {title}
      </p>
    </div>
  );
}

function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-16 md:py-20">
      <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-12">
        <SectionHeading index={index} title={title} />
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function Home() {
  const { profile, links, metrics, experience, projects, skills, education, awards } =
    resume;

  return (
    <>
      <ScrollProgress />

      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        {/* Top bar */}
        <header className="flex items-center justify-between py-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            P. Rajpal
          </span>
          <nav className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.15em] text-muted">
            <a className="link-underline hover:text-ink" href="#work">
              Work
            </a>
            <a className="link-underline hover:text-ink" href="#projects">
              Projects
            </a>
            <a className="link-underline hover:text-ink" href="#contact">
              Contact
            </a>
          </nav>
        </header>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="pb-16 pt-10 sm:pt-20">
          <Reveal delay={0.05}>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              {profile.role}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className="mt-6 font-display text-6xl leading-[0.92] tracking-[-0.03em] text-ink sm:text-7xl md:text-8xl">
              Paarth
              <br />
              <span className="text-ink-soft">Rajpal</span>
            </h1>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              {profile.headline}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <DownloadButton />
              <MagneticButton href={links.github} external>
                GitHub
              </MagneticButton>
              <MagneticButton href={links.linkedin} external>
                LinkedIn
              </MagneticButton>
              <MagneticButton href={`mailto:${links.email}`}>Email</MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.42}>
            <div className="mt-16">
              <Metrics metrics={metrics} />
            </div>
          </Reveal>
        </div>

        {/* ── About ────────────────────────────────────────────── */}
        <Section index="00" title="About">
          <Reveal>
            <p className="max-w-2xl font-display text-2xl leading-snug tracking-[-0.01em] text-ink-soft sm:text-3xl">
              {profile.about}
            </p>
          </Reveal>
        </Section>

        {/* ── Experience ───────────────────────────────────────── */}
        <section id="work">
          <Section index="01" title="Experience">
            <div className="space-y-12">
              {experience.map((e, i) => (
                <Reveal key={e.org} delay={i * 0.05}>
                  <article>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="font-display text-2xl tracking-[-0.01em] text-ink">
                        {e.org}
                      </h3>
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                        {e.period} · {e.location}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-accent">{e.role}</p>
                    <p className="mt-3 max-w-2xl text-ink-soft">{e.summary}</p>
                    <ul className="mt-4 space-y-2.5">
                      {e.points.map((p, j) => (
                        <li key={j} className="flex max-w-2xl gap-3 text-[15px] leading-relaxed text-ink-soft">
                          <span aria-hidden className="mt-[2px] text-accent">
                            —
                          </span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    {e.links && (
                      <div className="mt-4 flex flex-wrap gap-4">
                        {e.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="link-underline font-mono text-[11px] uppercase tracking-[0.12em] text-muted hover:text-ink"
                          >
                            {l.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </Section>
        </section>

        {/* ── Projects ─────────────────────────────────────────── */}
        <section id="projects">
          <Section index="02" title="Selected Projects">
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((p, i) => {
                const Wrapper = p.href ? "a" : "div";
                return (
                  <Reveal key={p.name} delay={i * 0.06}>
                    <Wrapper
                      {...(p.href
                        ? { href: p.href, target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="group block h-full rounded-xl border border-line bg-paper-deep/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/40"
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="font-display text-xl tracking-[-0.01em] text-ink">
                          {p.name}
                        </h3>
                        {p.href && (
                          <span
                            aria-hidden
                            className="text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                          >
                            ↗
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {p.blurb}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </Wrapper>
                  </Reveal>
                );
              })}
            </div>
          </Section>
        </section>

        {/* ── Skills ───────────────────────────────────────────── */}
        <Section index="03" title="Stack">
          <div className="space-y-7">
            {skills.map((g, i) => (
              <Reveal key={g.group} delay={i * 0.04}>
                <div className="grid gap-2 sm:grid-cols-[140px_1fr]">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    {g.group}
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                    {g.items.map((it) => (
                      <span key={it} className="text-[15px] text-ink-soft">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Education + Honors ───────────────────────────────── */}
        <Section index="04" title="Education & Honors">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-display text-2xl tracking-[-0.01em] text-ink">
                {education.school}
              </h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                {education.detail} · {education.location}
              </span>
            </div>
            <p className="mt-2 text-ink-soft">{education.involvement.join("  ·  ")}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-8 space-y-2.5">
              {awards.map((a, i) => (
                <li key={i} className="flex max-w-2xl gap-3 text-[15px] leading-relaxed text-ink-soft">
                  <span aria-hidden className="mt-[2px] text-accent">
                    —
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* ── Lab (Phase 2 reserved slot) ──────────────────────── */}
        <Section index="05" title="Lab">
          <Reveal>
            <div className="rounded-xl border border-dashed border-line p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                In progress
              </p>
              <h3 className="mt-3 font-display text-2xl tracking-[-0.01em] text-ink">
                Interactive 3D pose viewer
              </h3>
              <p className="mt-2 max-w-xl text-ink-soft">
                A spin-to-explore 3D reconstruction of a bench press from tracked
                keypoints — with live bar-path trail and velocity readout. Built
                from my Hyperform pipeline. Landing here soon.
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <section id="contact" className="border-t border-line py-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              <span className="text-accent">06</span>
              <span className="mx-2 text-line">/</span>
              Contact
            </p>
            <a
              href={`mailto:${links.email}`}
              className="mt-6 block font-display text-4xl tracking-[-0.02em] text-ink transition-colors hover:text-accent sm:text-6xl"
            >
              {links.email}
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <DownloadButton />
              <MagneticButton href={links.github} external>
                GitHub
              </MagneticButton>
              <MagneticButton href={links.linkedin} external>
                LinkedIn
              </MagneticButton>
              <MagneticButton href={links.site} external>
                Blog
              </MagneticButton>
            </div>
          </Reveal>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          <span>{profile.name} · {profile.location}</span>
          <span>{links.phone}</span>
        </footer>
      </div>
    </>
  );
}
