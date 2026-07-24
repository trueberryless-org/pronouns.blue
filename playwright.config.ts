import { defineConfig } from "@playwright/test";

const executablePath =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ??
  (process.platform === "win32"
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : undefined);

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 120_000,
  workers: 1,
  use: {
    headless: true,
  },
  projects: [
    {
      name: "chromium",
      use: {
        launchOptions: executablePath ? { executablePath } : undefined,
      },
    },
  ],
});
