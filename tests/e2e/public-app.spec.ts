import { expect, test } from "@nuxt/test-utils/playwright";

const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ??
  (process.platform === "win32"
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : undefined);

test.use({
  nuxt: {
    rootDir: ".",
    nuxtConfig: {
      nitro: {
        preset: "node-server",
        rollupConfig: { plugins: [] },
      },
    },
    browserOptions: {
      type: "chromium",
      launch: executablePath ? { executablePath } : undefined,
    },
  },
});

test("serves public OAuth metadata @integration", async ({ page, goto }) => {
  await goto("/oauth-client-metadata.json");
  await expect(page.locator("body")).toContainText(
    '"token_endpoint_auth_method":"none"',
  );
  await expect(page.locator("body")).toContainText(
    '"dpop_bound_access_tokens":true',
  );
});

test("renders the public profile search @e2e", async ({ page, goto }) => {
  await goto("/");
  await expect(page.getByText("Find any user by handle")).toBeVisible();
});
