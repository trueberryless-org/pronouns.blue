export async function register() {
  // Only run in the Node.js runtime (not Edge), and only when a DB is configured
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (!process.env.DATABASE_URL) return; // SQLite handles itself via pnpm dev/start

  try {
    const { getMigrator } = await import("@/lib/db/migrations");
    const migrator = getMigrator();
    const { error } = await migrator.migrateToLatest();
    if (error) throw error;
    console.log("[db] Migrations applied.");
  } catch (err) {
    console.error("[db] Migration failed:", err);
    throw err; // Crash the server rather than serve with a broken schema
  }
}
