"use client";

import { useEffect, useState } from "react";

export function NavLogo() {
  const [pathname, setPathname] = useState<string | null>(null);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  // Hide on the homepage; show nothing while determining pathname (avoids flash)
  if (pathname === null || pathname === "/") return null;

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
