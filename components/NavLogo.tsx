"use client";

import { useSyncExternalStore } from "react";

function getPathname() {
  return typeof window !== "undefined" ? window.location.pathname : "/";
}

function subscribe(cb: () => void) {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
}

export function NavLogo() {
  const pathname = useSyncExternalStore(subscribe, getPathname, () => "/");

  if (pathname === "/") return null;

  return (
    <a href="/" className="flex items-center">
      <img
        src="/pronouns.blue.png"
        alt="pronouns.blue"
        width={966}
        height={396}
        className="h-14 w-auto"
        style={{ viewTransitionName: "site-logo" }}
        loading="eager"
      />
    </a>
  );
}
