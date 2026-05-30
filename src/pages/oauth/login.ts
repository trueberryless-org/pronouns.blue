import type { APIRoute } from 'astro';
import { getOAuthClient, SCOPE } from '@/lib/auth/client';
import { isActorIdentifier } from '@atcute/lexicons/syntax';
import { createAstroCookieAdapter } from '@/lib/auth/astro-cookie-adapter';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { handle } = await request.json() as { handle?: string };

    if (!handle || typeof handle !== 'string') {
      return new Response(JSON.stringify({ error: 'Handle is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (!isActorIdentifier(handle)) {
      return new Response(JSON.stringify({ error: 'Handle is invalid' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cookieAdapter = createAstroCookieAdapter(cookies, request);
    const client = await getOAuthClient(cookieAdapter);
    const { url } = await client.authorize({
      target: { type: 'account', identifier: handle },
      scope: SCOPE,
    });

    return new Response(JSON.stringify({ redirectUrl: url.toString() }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('OAuth login error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Login failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
