"use client";

import { useEffect, useState } from "react";

export function FloatingProfileBack({ title, avatar }: { title: string; avatar: string | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > window.innerHeight * 0.65); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-30 flex overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-lg shadow-black/10 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} title="Back to profile" aria-label={`Scroll back to ${title}'s profile`} className="flex items-center gap-2 py-2 pl-2 pr-3 transition-colors hover:bg-[var(--surface-strong)]">
        {avatar ? (
          <span className="h-8 w-8 flex-shrink-0 rounded-full border border-[var(--border)] bg-cover bg-center" style={{ backgroundImage: `url(${avatar})` }} role="img" aria-label={title} />
        ) : (
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--tag-bg)] text-sm font-semibold text-[var(--text)]">
            {title.slice(0, 1).toUpperCase()}
          </span>
        )}
        <span className="max-w-28 truncate text-sm font-medium text-[var(--text)]">{title}</span>
        <span className="text-[var(--muted)]">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m18 15-6-6-6 6" />
          </svg>
        </span>
      </button>
      <div className="my-2 w-px bg-[var(--border)]" />
      <button type="button" onClick={() => window.history.back()} title="Go back" aria-label="Go back to previous page" className="flex items-center px-3 text-[var(--muted)] transition-colors hover:bg-[var(--surface-strong)] hover:text-[var(--text)]">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
}
