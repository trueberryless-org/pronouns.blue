"use client";

export function LogoutButton() {
  async function handleLogout() {
    await fetch("/oauth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
    >
      Sign out
    </button>
  );
}
