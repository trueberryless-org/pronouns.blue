"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "next-view-transitions";
import { ThemeToggle } from "@/components/ThemeToggle";

interface MobileNavProps {
  signedIn: boolean;
  did?: string;
  handle?: string | null;
  displayName?: string | null;
  avatar?: string | null;
}

function BurgerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function MobileNav({
  signedIn,
  did,
  handle,
  displayName,
  avatar,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [loginHandle, setLoginHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (!open) return;
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [open]);

  async function startLogin() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/oauth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle: loginHandle }),
      });
      const data = (await res.json()) as {
        redirectUrl?: string;
        error?: string;
      };
      if (!res.ok || !data.redirectUrl) {
        throw new Error(data.error ?? "Login failed");
      }
      window.location.href = data.redirectUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/oauth/logout", { method: "POST" });
    window.location.href = "/";
  }

  const label = displayName ?? handle ?? did ?? "profile";
  const normalizedHandle = handle?.replace(/^@/, "");
  const profileHref = normalizedHandle
    ? `/profile/${encodeURIComponent(normalizedHandle)}`
    : "/settings";

  return (
    <div className="relative sm:hidden" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
      >
        {open ? <XIcon /> : <BurgerIcon />}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 min-w-56 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg"
        >
          <div className="border-b border-[var(--border)] px-1 pb-3 mb-2">
            <p className="mb-1.5 px-2 text-xs font-medium text-[var(--muted)]">
              Theme
            </p>
            <ThemeToggle />
          </div>

          {signedIn ? (
            <>
              {avatar && (
                <div className="flex items-center gap-2 px-3 py-2 mb-1">
                  <span
                    className="h-7 w-7 flex-shrink-0 rounded-full bg-cover bg-center border border-[var(--border)]"
                    style={{ backgroundImage: `url(${avatar})` }}
                    role="img"
                    aria-label={label}
                  />
                  <span className="truncate text-sm font-medium text-[var(--text)]">
                    {label}
                  </span>
                </div>
              )}
              <Link
                href={profileHref}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center rounded-md px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center rounded-md px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]"
              >
                Settings
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]"
              >
                Log out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 p-1 pt-0">
              <input
                value={loginHandle}
                onChange={(e) => setLoginHandle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && loginHandle.trim() && !loading)
                    startLogin();
                }}
                placeholder="handle.bsky.social"
                className="min-h-10 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--text)]"
              />
              <button
                type="button"
                disabled={loading || !loginHandle.trim()}
                onClick={startLogin}
                className="min-h-10 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)] disabled:opacity-50"
              >
                {loading ? "..." : "Log in / Sign up"}
              </button>
              {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
