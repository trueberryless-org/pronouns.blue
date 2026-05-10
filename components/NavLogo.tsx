"use client";

import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import Image from "next/image";

export function NavLogo() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/pronouns.blue.png"
        alt="pronouns.blue"
        width={966}
        height={396}
        className="h-14 w-auto"
        style={{ viewTransitionName: "site-logo" }}
        loading="eager"
      />
    </Link>
  );
}
