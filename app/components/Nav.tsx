"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const ITEMS = [
  { id: "about", label: "About" },
  { id: "work", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "education", label: "Education" },
  { id: "lab", label: "Lab" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        // Pick the section in view, in document order, nearest the top band.
        const inOrder = ITEMS.map((i) => i.id).filter((id) => visible.has(id));
        if (inOrder.length) setActive(inOrder[0]);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.5, 1] }
    );

    ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-3.5 sm:px-10">
        <a
          href="#top"
          className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
        >
          P. Rajpal
        </a>
        <nav className="no-scrollbar -mr-1 flex items-center gap-5 overflow-x-auto whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em]">
          {ITEMS.map((it) => {
            const isActive = active === it.id;
            return (
              <a
                key={it.id}
                href={`#${it.id}`}
                className={`relative py-1 transition-colors ${
                  isActive ? "text-accent" : "text-faint hover:text-ink"
                }`}
              >
                {it.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
