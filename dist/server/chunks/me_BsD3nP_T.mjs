import { g as getDid } from './session_B4aNHuDL.mjs';
import { g as getActorProfile } from './profiles_BoBmfCD2.mjs';
import { g as getProfileRecordsFromPds } from './records_BqEqK-mF.mjs';

const prerender = false;
const GET = async ({ cookies }) => {
  const did = getDid(cookies);
  if (!did) {
    return new Response(JSON.stringify({ user: null, isFirstTime: false }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  }
  const [actor, profile] = await Promise.all([
    getActorProfile(did),
    getProfileRecordsFromPds(did)
  ]);
  const isFirstTime = profile.groups.every(
    (g) => g.names.length === 0 && g.pronouns.length === 0
  );
  return new Response(JSON.stringify({ user: actor, isFirstTime }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private, max-age=60"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
