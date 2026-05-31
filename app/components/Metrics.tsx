"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import type { Metric } from "@/data/resume";

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [n, setN] = useState(0);
  const isFloat = !Number.isInteger(value);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{isFloat ? n.toFixed(1) : Math.round(n)}</span>;
}

export function Metrics({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
      {metrics.map((m) => (
        <div key={m.label} className="border-t border-line pt-4">
          <dt className="font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl">
            {m.prefix}
            <CountUp value={m.value} />
            {m.suffix}
          </dt>
          <dd className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-muted">
            {m.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
