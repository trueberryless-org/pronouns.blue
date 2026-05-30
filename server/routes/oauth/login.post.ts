import { getOAuthClient, SCOPE } from '~/lib/auth/client';
import { createH3CookieAdapter } from '~/lib/auth/h3-cookie-adapter';
import { isActorIdentifier } from '@atcute/lexicons/syntax';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ handle?: string }>(event);

    if (!body?.handle || typeof body.handle !== 'string') {
      throw createError({ statusCode: 400, message: 'Handle is required' });
    }

    if (!isActorIdentifier(body.handle)) {
      throw createError({ statusCode: 400, message: 'Handle is invalid' });
    }

    const cookieAdapter = createH3CookieAdapter(event);
    const client = await getOAuthClient(cookieAdapter);
    const { url } = await client.authorize({
      target: { type: 'account', identifier: body.handle },
      scope: SCOPE,
    });

    return { redirectUrl: url.toString() };
  } catch (err) {
    if (err && typeof err === 'object' && 'statusCode' in err) throw err;
    console.error('[oauth/login]', err);
    throw createError({
      statusCode: 500,
      message: err instanceof Error ? err.message : 'Login failed',
    });
  }
});
