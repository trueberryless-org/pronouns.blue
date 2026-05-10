import { HandleSearch } from "@/components/HandleSearch";
import { HomeUserSection } from "@/components/HomeUserSection";
import Image from "next/image";

// No cookies read here — personalised content is loaded client-side by HomeUserSection.
// This page can be statically served from the CDN.
export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <main className="space-y-8">
        <div className="flex justify-center pb-2">
          <Image
            src="/pronouns.blue.png"
            alt="pronouns.blue"
            width={966}
            height={396}
            className="h-auto w-auto max-h-60 max-w-full"
            style={{ viewTransitionName: "site-logo" }}
            priority
          />
        </div>

        {/* Personalised welcome / profile cards — rendered client-side only */}
        <HomeUserSection />

        <section className="space-y-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <p className="text-lg text-[var(--muted)]">
            Find any user by handle and view their names and pronouns.
          </p>
          <HandleSearch />
        </section>
      </main>
    </div>
  );
}
