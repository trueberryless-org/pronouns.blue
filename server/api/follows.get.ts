// Follows API — currently returns an empty list (stub for future implementation)
export default defineEventHandler((event) => {
  setResponseHeader(event, "Cache-Control", "no-store");
  return { follows: [], cursor: null };
});
