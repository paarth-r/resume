"use client";

import { useState } from "react";

export function DownloadButton() {
  const [busy, setBusy] = useState(false);

  async function handleDownload() {
    if (busy) return;
    setBusy(true);
    try {
      const [{ pdf }, { ResumeDoc }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./ResumePDF"),
      ]);
      const blob = await pdf(ResumeDoc()).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Paarth-Rajpal-Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Sorry — the PDF couldn't be generated. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm tracking-tight text-paper transition-colors duration-300 hover:bg-accent disabled:opacity-60"
    >
      {busy ? "Generating…" : "Download PDF"}
      <span aria-hidden className="text-paper/80">
        ↓
      </span>
    </button>
  );
}
