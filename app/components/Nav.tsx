"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const ITEMS = [
  { id: "about", index: "00", label: "About" },
  { id: "work", index: "01", label: "Experience" },
  { id: "projects", index: "02", label: "Projects" },
  { id: "stack", index: "03", label: "Stack" },
  { id: "honors", index: "04", label: "Honors" },
  { id: "lab", index: "05", label: "Lab" },
  { id: "contact", index: "06", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const first = ITEMS.map((i) => i.id).find((id) => visible.has(id));
        if (first) setActive(first);
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
                className={`group relative flex items-center gap-1.5 py-1 transition-colors ${
                  isActive ? "text-accent" : "text-faint hover:text-ink"
                }`}
              >
                <span
                  className={`text-[9px] transition-colors ${
                    isActive ? "text-accent" : "text-line group-hover:text-faint"
                  }`}
                >
                  {it.index}
                </span>
                <span>{it.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-0 right-0 mx-auto h-1 w-1 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
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
