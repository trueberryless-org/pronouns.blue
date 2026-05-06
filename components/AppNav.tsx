import { getDid } from "@/lib/auth/session";
import { getActorProfile } from "@/lib/atproto/profiles";
import { AuthNav } from "@/components/AuthNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavLogo } from "@/components/NavLogo";
import { MobileNav } from "@/components/MobileNav";

export async function AppNav() {
  const did = await getDid();
  const actor = did ? await getActorProfile(did) : null;

  return (
    <nav className="mb-8 mt-4 border-b border-[var(--line)] pb-4">
      <div className="mx-auto flex w-full max-w-6xl min-h-14 items-center gap-3 px-4 sm:px-6">
        <NavLogo />
        <div className="ml-auto flex items-center gap-4">
          {/* Desktop: items shown inline */}
          <div className="hidden items-center gap-4 sm:flex">
            <ThemeToggle />
            <AuthNav
              signedIn={Boolean(did)}
              did={did ?? undefined}
              handle={actor?.handle}
              displayName={actor?.displayName}
              avatar={actor?.avatar}
            />
          </div>
          {/* Mobile: burger menu (hides itself on sm+) */}
          <MobileNav
            signedIn={Boolean(did)}
            did={did ?? undefined}
            handle={actor?.handle}
            displayName={actor?.displayName}
            avatar={actor?.avatar}
          />
        </div>
      </div>
    </nav>
  );
}
