import { ThemeToggle } from "@/components/ThemeToggle";
import { NavLogo } from "@/components/NavLogo";
import { SearchModal } from "@/components/SearchModal";
import { NavUser } from "@/components/NavUser";

export function AppNav() {
  return (
    <nav className="mb-8 mt-4 border-b border-[var(--line)] pb-4">
      <div className="mx-auto flex w-full max-w-6xl min-h-14 items-center gap-3 px-4 sm:px-6">
        <NavLogo />
        <div className="ml-auto flex items-center gap-4">
          <SearchModal />
          <div className="hidden items-center gap-4 sm:flex">
            <ThemeToggle />
          </div>
          <NavUser />
        </div>
      </div>
    </nav>
  );
}
