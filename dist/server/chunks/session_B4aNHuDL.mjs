import { r as runWithCookies, g as getOAuthClient } from './client_BKFXYDiu.mjs';

async function getSession(cookies) {
  const did = getDid(cookies);
  if (!did) return null;
  try {
    return await runWithCookies(cookies, async () => {
      const client = await getOAuthClient();
      return await client.restore(did);
    });
  } catch {
    return null;
  }
}
function getDid(cookies) {
  return cookies.get("did")?.value ?? null;
}

export { getSession as a, getDid as g };
