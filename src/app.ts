import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import {
  actions,
  middleware,
  pages,
  i18n,
  trailingSlash,
  redirects,
} from "astro/hono";

const app = new Hono();

// Mirror httpOnly `did` cookie into a non-httpOnly `did-public` cookie so
// client-side React components can read the current DID without a server call.
// Runs after pages() on the response path — same semantics as the old middleware.ts.
app.use(async (c, next) => {
  await next();
  const did = getCookie(c, "did");
  if (did) {
    setCookie(c, "did-public", did, {
      httpOnly: false,
      secure: c.env?.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
    });
  } else {
    deleteCookie(c, "did-public", { path: "/" });
  }
});

app.use(trailingSlash());
app.use(redirects());
app.use(middleware());
app.use(actions());
app.use(pages());
app.use(i18n());

export default app;
