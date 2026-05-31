"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function MagneticButton({
  href,
  children,
  primary = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm tracking-tight transition-colors duration-300";
  const look = primary
    ? "bg-ink text-paper hover:bg-accent"
    : "border border-line text-ink-soft hover:border-ink hover:text-ink";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${look}`}
    >
      {children}
    </motion.a>
  );
}
