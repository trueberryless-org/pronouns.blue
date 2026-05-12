import { s as searchActors } from './profiles_BoBmfCD2.mjs';

const prerender = false;
const GET = async ({ url }) => {
  const query = url.searchParams.get("q") ?? "";
  const results = await searchActors(query, 8);
  return new Response(JSON.stringify({ results }), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
