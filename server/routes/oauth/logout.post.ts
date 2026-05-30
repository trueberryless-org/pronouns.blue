import { getOAuthClient } from '~/lib/auth/client';
import { getDid } from '~/lib/auth/session';
import { createH3CookieAdapter } from '~/lib/auth/h3-cookie-adapter';
import { isDid } from '@atcute/lexicons/syntax';

export default defineEventHandler(async (event) => {
  try {
    const cookieAdapter = createH3CookieAdapter(event);
    const did = getDid(cookieAdapter);

    if (did && isDid(did)) {
      const client = await getOAuthClient(cookieAdapter);
      await client.revoke(did);
    }
  } catch (err) {
    console.error('[oauth/logout] revoke error (ignored):', err);
  }

  deleteCookie(event, 'did', { path: '/' });
  deleteCookie(event, 'did-public', { path: '/' });
  deleteCookie(event, 'session', { path: '/' });
  deleteCookie(event, 'oauth_state', { path: '/' });

  return { success: true };
});
