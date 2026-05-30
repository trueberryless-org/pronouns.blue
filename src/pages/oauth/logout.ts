import type { APIRoute } from 'astro';
import { getOAuthClient } from '@/lib/auth/client';
import { getDid } from '@/lib/auth/session';
import { isDid } from '@atcute/lexicons/syntax';
import { createAstroCookieAdapter } from '@/lib/auth/astro-cookie-adapter';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const cookieAdapter = createAstroCookieAdapter(cookies, request);
    const did = getDid(cookieAdapter);

    if (did && isDid(did)) {
      const client = await getOAuthClient(cookieAdapter);
      await client.revoke(did);
    }

    cookies.delete('did', { path: '/' });
    cookies.delete('session', { path: '/' });
    cookies.delete('oauth_state', { path: '/' });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Logout error:', error);
    cookies.delete('did', { path: '/' });
    cookies.delete('session', { path: '/' });
    cookies.delete('oauth_state', { path: '/' });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
