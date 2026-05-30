# Copilot Instructions for `pronouns.blue`

## Build, lint, and test commands

Use `pnpm` (repo is pinned to pnpm in `package.json`).

```bash
cp env.template .env.local
pnpm install
pnpm dev          # Next.js dev server (no migrations needed)
pnpm lint         # ESLint (Next core-web-vitals + TypeScript config)
pnpm lint:fix     # ESLint with autofix
pnpm format       # Prettier write mode
pnpm format:check # Prettier check mode
pnpm build        # runs `pnpm build:lex` then `next build`
pnpm start        # Next.js production server
pnpm build:lex    # regenerate TypeScript lexicon bindings from lexicons/
pnpm gen-key      # generate a PRIVATE_KEY JWK for OAuth private_key_jwt
```

Tests are **not currently configured** in this repository.

## High-level architecture

This is a Next.js App Router app for sharing names and pronouns on AT Protocol. **There is no database** — the entire backend is ATProto.

1. **ATProto OAuth — cookie-based sessions**  
   `/oauth/login`, `/oauth/callback`, `/oauth/logout` orchestrate auth via `lib/auth/client.ts`. OAuth state and session (tokens + DPoP private key) are stored entirely in `httpOnly` browser cookies (`oauth_state`, `session`, `did`). No server-side storage is used.

2. **Record publishing**  
   `POST /api/status` uses `@atcute/client` to delete and recreate all `blue.pronouns.name` and `blue.pronouns.pronoun` records in the user's ATProto repo. Records live exclusively on the user's PDS.

3. **Profile reading**  
   `app/profile/[handle]/page.tsx` resolves the handle via the Bluesky appview (`app.bsky.actor.getProfile`), then fetches name/pronoun records directly from the user's PDS via `com.atproto.repo.listRecords` (`lib/atproto/records.ts`).

4. **Settings page**  
   `app/settings/page.tsx` reads current records directly from the user's PDS to pre-fill the editor form. Authentication check uses `getDid()` (reads the `did` cookie) — not `getSession()` — to avoid triggering an unnecessary token restore in a Server Component context.

5. **Handle search**  
   `GET /api/search` proxies to `app.bsky.actor.searchActors` on the Bluesky appview.

## Key conventions

- **Do not edit generated lexicon files** in `lib/lexicons/**`; edit source lexicons under `lexicons/**` and regenerate with `pnpm build:lex`.
- **Use path alias imports** (`@/...`) rather than long relative paths (configured in `tsconfig.json`).
- **Records live on the PDS, not locally.** There is no local database or caching layer.
- **Use `getDid()` in Server Components** (reads `did` cookie, fast, no token I/O). Only call `getSession()` (which calls `client.restore()`) in Route Handlers where cookies are writable, so a token refresh can be persisted.
- **`getOAuthClient()` is a singleton** but its cookie stores call `cookies()` lazily on each invocation, so they always operate on the current request's cookie jar.
- **Next.js's original fetch** is passed to the OAuth client and identity resolvers to bypass the patched `globalThis.fetch`, which would otherwise corrupt POST bodies in the DPoP flow.

## Nuxt instructions

Nuxt 3 Development Guidelines

The following guidelines are intended to ensure consistency, maintainability, and scalability in projects developed with Nuxt 3. Adhering to these standards will improve code quality and collaboration across the development team.

1. Project Structure
   1. Follow the default Nuxt 3 project structure for better readability and framework alignment:
      - pages/: For defining routes.
      - components/: For reusable UI components.
      - layouts/: For page layouts.
      - composables/: For reusable functions and state management.
      - plugins/: For registering plugins.
      - middleware/: For route guards and custom middleware.
      - assets/: For styles, images, and other static resources.
   2. Maintain clear folder hierarchies and avoid deeply nested structures unless absolutely necessary.

2. Coding Standards
   1. Use ESLint for enforcing JavaScript/TypeScript code standards and Prettier for consistent formatting.
   2. Prefer TypeScript for type safety and maintainability. Define types in a types/ directory.
   3. Follow a consistent naming convention:
      - Components: PascalCase
      - Files and folders: kebab-case
      - Variables and functions: camelCase
      - Constants: UPPER_SNAKE_CASE
   4. Use async/await over promises for asynchronous operations.
   5. Structure of Single-File Components (SFCs): When writing Single-File Components (SFCs) in Nuxt, always follow this structure for consistency and readability:
      1. Script Section: Place the <script setup> block at the top of the file, with lang="ts" if using TypeScript.
      2. Template Section: The <template> block should follow the script section and contain the component’s HTML structure.
      3. Style Section: Add the <style> block at the bottom of the file, using lang="scss" for SCSS and scoped for styles scoped to the component.
      4. This order ensures a logical flow: scripting first, then templating, and finally styling. Always use the specified attributes for better maintainability and scalability:
         example:

      ```vue
      <script setup lang="ts"></script>

      <template>
        <div></div>
      </template>

      <style lang="scss" scoped></style>
      ```

3. Nuxt-Specific Best Practices
   1. Use the defineNuxtConfig function to configure the project in nuxt.config.ts.
   2. Leverage auto-imported features:
      - Use defineComponent for defining components.
      - Use useState, useFetch, useLazyFetch, and other Nuxt composables for state and data fetching.
   3. Use useRuntimeConfig for managing environment variables securely.
   4. Utilize the server directory for server-side logic and APIs:
      - Define API endpoints in server/api/.
      - Use server/middleware/ for custom server-side middleware.
   5. Optimize for SEO using useHead for meta tags and definePageMeta for page-level metadata.

4. Component Development
   1. Break down the UI into reusable, modular components.
   2. Use props and emits sparingly, ensuring that data flow is predictable and documented.
   3. Define props with types and default values to ensure reliability:
      ```typescript
      const props = defineProps<{
        foo: string;
        bar?: number;
      }>();
      ```
   4. Emit events with clear names, such as onClick or onSubmit.
   5. To declare emitted events using pure type annotations:
      ```typescript
      const emit = defineEmits<{
        (e: "change", id: number): void;
        (e: "update", value: string): void;
      }>();
      ```

5. State Management
   1. Use Nuxt’s built-in composables like useState and useCookie for simple state management.
   2. For complex applications, use Pinia as the preferred state management library:
      - Organize stores in the stores/ directory.
      - Follow a modular approach for separating concerns.
      - Use TypeScript for defining state, actions, and getters.

6. API Integration
   1. Use useFetch for fetching data from APIs, preferring useLazyFetch for on-demand loading.
   2. Handle errors gracefully:
      ```typescript
      const { data, error } = await useFetch("/api/example");
      if (error.value) {
        console.error("Error fetching data:", error.value);
      }
      ```
   3. Structure API endpoints semantically within the server/api directory.

7. Styling
   1. Use SCSS or Tailwind CSS for styling. Maintain styles in the assets/ or components/ directory.
   2. Adhere to the BEM naming convention for class names:
      - `.block__element--modifier`
   3. Avoid inline styles; prefer reusable classes or scoped styles.
   4. Scope component-specific styles:
      ```vue
      <style lang="scss" scoped>
      .example {
        color: red;
      }
      </style>
      ```

8. Prettier Formatter
   1. Semicolons: Always end statements with a semicolon (;) to improve clarity and prevent potential issues caused by automatic semicolon insertion.
   2. Indentation: Use 2 spaces per indentation level to ensure clean and concise code formatting.
   3. Quotations: Use single quotes (') for strings instead of double quotes, except in cases where escaping single quotes would make the string less readable.
   4. Line Length: Limit each line of code to a maximum of 100 characters. Break long lines logically to improve readability while adhering to this limit.
   5. Trailing Commas: Avoid trailing commas in object and array literals, function arguments, and other contexts where they might appear.

9. Performance Optimization
   1. Optimize page load time:
      - Use defineNuxtComponent to lazy-load components where applicable.
      - Utilize useLazyFetch and asyncData for efficient data fetching.
      - Use image module for optimized images.
   2. Split code intelligently to reduce bundle size.
   3. Cache frequently used data in state or cookies.

10. Testing and Debugging
    1. Write unit tests using Jest or Vitest for components and composables.
    2. Use Cypress for end-to-end testing.
    3. Test edge cases for data fetching, state management, and API integration.
    4. Leverage Nuxt DevTools for debugging and performance monitoring.

11. Documentation
    1. Document critical components, composables, and APIs using JSDoc.
    2. Maintain a README.md file with:
       - Project setup instructions.
       - Dependencies.
       - Code structure overview.
       - Deployment guidelines.
    3. Keep the codebase self-documenting by using clear variable and function names.

12. Deployment
    1. Use Static Site Generation (SSG) for projects that don’t require dynamic content.
    2. For dynamic projects, prefer server-side rendering (SSR) with edge or server hosting.
    3. Set up CI/CD pipelines to automate build, testing, and deployment processes.
    4. Monitor deployments and runtime performance using tools like Vercel, Netlify, or custom monitoring solutions.

By following these guidelines, we can ensure that Nuxt 3 projects remain efficient, scalable, and maintainable, fostering a seamless development experience.
