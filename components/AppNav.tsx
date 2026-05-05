import { getDid } from "@/lib/auth/session";
import { getActorProfile } from "@/lib/atproto/profiles";
import { AuthNav } from "@/components/AuthNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NavLogo } from "@/components/NavLogo";

export async function AppNav() {
  const did = await getDid();
  const actor = did ? await getActorProfile(did) : null;

  return (
    <nav className="mb-8 mt-4 border-b border-[var(--line)] pb-4">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 sm:min-h-14 sm:flex-row sm:px-6">
        <NavLogo />
        <div className="flex w-full flex-wrap items-center justify-end gap-8 sm:ms-auto sm:w-auto sm:gap-4">
          <ThemeToggle />
          <AuthNav
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
