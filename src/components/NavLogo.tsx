"use client";

import { useEffect, useState } from "react";

interface NavLogoProps {
  pathname?: string;
}

export function NavLogo({ pathname: initialPathname = "/" }: NavLogoProps) {
  const [pathname, setPathname] = useState(initialPathname);

  useEffect(() => {
    // Keep in sync with Astro's client-side navigations
    const handler = () => setPathname(window.location.pathname);
    document.addEventListener("astro:page-load", handler);
    return () => document.removeEventListener("astro:page-load", handler);
  }, []);

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
      />
    </a>
  );
}
