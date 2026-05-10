import { ThemeToggle } from "@/components/ThemeToggle";
import { NavLogo } from "@/components/NavLogo";
import { SearchModal } from "@/components/SearchModal";
import { NavUser } from "@/components/NavUser";

/**
 * Static server component — no cookies read here.
 * Auth state is loaded client-side by the NavUser island so that this layout
 * segment (and every page it wraps) can be statically cached on the CDN.
 */
export function AppNav() {
  return (
    <nav className="mb-8 mt-4 border-b border-[var(--line)] pb-4">
      <div className="mx-auto flex w-full max-w-6xl min-h-14 items-center gap-3 px-4 sm:px-6">
        <NavLogo />
        <div className="ml-auto flex items-center gap-4">
          <SearchModal />
          {/* Desktop-only theme toggle — static, no auth needed */}
          <div className="hidden items-center gap-4 sm:flex">
            <ThemeToggle />
          </div>
          {/* Client island: reads did-public cookie → fetches /api/me → renders AuthNav + MobileNav */}
          <NavUser />
        </div>
      </div>
    </nav>
  );
}
