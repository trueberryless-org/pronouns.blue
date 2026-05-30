globalThis.process ??= {};
globalThis.process.env ??= {};
import { g as getOAuthClient, i as isDid } from "./astro-cookie-adapter_xxiMZNR-.mjs";
async function getSession(cookieAdapter) {
  const did = getDid(cookieAdapter);
  if (!did) return null;
  try {
    const client = await getOAuthClient(cookieAdapter);
    return await client.restore(did);
  } catch {
    return null;
  }
}
function getDid(cookieAdapter) {
  const did = cookieAdapter.get("did");
  if (!did || !isDid(did)) return null;
  return did;
}
export {
  getSession as a,
  getDid as g
};
