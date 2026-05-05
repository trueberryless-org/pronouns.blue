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
        src="/pronouns.blue.svg"
        alt="pronouns.blue"
        width={242}
        height={99}
        className="h-14 w-auto"
        style={{ viewTransitionName: "site-logo" }}
      />
    </Link>
  );
}
