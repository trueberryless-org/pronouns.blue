import type { APIRoute } from 'astro';
import { getOAuthClient } from '@/lib/auth/client';
import { createAstroCookieAdapter } from '@/lib/auth/astro-cookie-adapter';

export const GET: APIRoute = async ({ request, cookies }) => {
  const cookieAdapter = createAstroCookieAdapter(cookies, request);
  const client = await getOAuthClient(cookieAdapter);
  return new Response(JSON.stringify(client.metadata), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
