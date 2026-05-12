async function r(){if(document.cookie.match(/(?:^|;\s*)did-public=([^;]+)/))try{const a=await fetch("/api/me"),{user:e,isFirstTime:s}=await a.json();if(!e)return;const t=document.getElementById("home-user-section");if(!t)return;const n=e.handle?`/profile/${encodeURIComponent(e.handle.replace(/^@/,""))}`:"/settings",o=e.avatar?`<span class="h-12 w-12 rounded-full border border-[var(--border)] bg-cover bg-center" style="background-image:url(${e.avatar})" role="img" aria-label="${e.displayName??e.handle??""}"></span>`:`<span class="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-lg font-semibold text-[var(--text)]">${(e.displayName??e.handle??"U").slice(0,1).toUpperCase()}</span>`;s?t.innerHTML=`
          <section class="relative overflow-hidden rounded-3xl border-2 border-[var(--accent)] bg-[var(--surface)] p-8">
            <div class="pointer-events-none absolute inset-0" style="background:radial-gradient(ellipse at top left,color-mix(in srgb,var(--accent) 12%,transparent),transparent 60%)"></div>
            <div class="relative space-y-6">
              <div>
                <p class="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">Welcome &#128075;</p>
                <h2 class="text-2xl font-semibold text-[var(--text)]">Let's set up your profile</h2>
                <p class="mt-1 text-sm text-[var(--muted)]">You're signed in — now add your names and pronouns so others can find you.</p>
              </div>
              <div class="flex items-start">
                <div class="flex shrink-0 flex-col items-center gap-1.5">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--accent-contrast)]">&#10003;</div>
                  <span class="text-xs font-medium text-[var(--text)]">Sign in</span>
                </div>
                <div class="mt-4 h-px flex-1 bg-[var(--accent)]"></div>
                <div class="flex shrink-0 flex-col items-center gap-1.5">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--accent)] text-sm font-bold text-[var(--accent)]">2</div>
                  <span class="text-xs font-medium text-[var(--text)]">Add your info</span>
                </div>
                <div class="mt-4 h-px flex-1 bg-[var(--border)]"></div>
                <div class="flex shrink-0 flex-col items-center gap-1.5">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--border)] text-sm font-bold text-[var(--muted)]">3</div>
                  <span class="text-xs text-[var(--muted)]">Share</span>
                </div>
              </div>
              <a href="/settings" class="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-contrast)] transition-opacity hover:opacity-90">
                Get started
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
              </a>
            </div>
          </section>`:t.innerHTML=`
          <section class="grid gap-4 md:grid-cols-2">
            <a href="/settings" class="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]">
              <p class="text-lg font-semibold text-[var(--text)]">Set pronouns and names</p>
              <p class="mt-1 text-sm text-[var(--muted)]">Update your profile entries and preferred options.</p>
            </a>
            <a href="${n}" class="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]">
              <div class="flex items-center gap-3">
                ${o}
                <span class="min-w-0">
                  <p class="truncate text-lg font-semibold text-[var(--text)]">${e.displayName??e.handle??e.did}</p>
                  <p class="truncate text-sm text-[var(--muted)]">@${e.handle??e.did}</p>
                </span>
              </div>
              <p class="mt-2 text-sm text-[var(--muted)]">View your profile</p>
            </a>
          </section>`}catch{}}r();document.addEventListener("astro:page-load",r);
