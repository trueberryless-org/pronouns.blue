import type { APIRoute } from 'astro';
import { getOAuthClient } from '@/lib/auth/client';
import { createAstroCookieAdapter } from '@/lib/auth/astro-cookie-adapter';

const PUBLIC_URL = import.meta.env.PUBLIC_URL || 'http://127.0.0.1:4321';
const IS_PROD = import.meta.env.PROD;

export const GET: APIRoute = async ({ request, cookies, url }) => {
  try {
    const params = url.searchParams;
    const cookieAdapter = createAstroCookieAdapter(cookies, request);
    const client = await getOAuthClient(cookieAdapter);
    const { session } = await client.callback(params);

    cookies.set('did', session.did, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return new Response(null, {
      status: 302,
      headers: { Location: new URL('/', PUBLIC_URL).toString() },
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    const redirectUrl = new URL('/?error=login_failed', PUBLIC_URL);
    return new Response(null, {
      status: 302,
      headers: { Location: redirectUrl.toString() },
    });
  }
};
