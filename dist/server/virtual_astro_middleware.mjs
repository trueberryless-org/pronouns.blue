import { d as defineMiddleware, ag as sequence } from './chunks/params-and-props_CGkvChX8.mjs';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const did = context.cookies.get("did")?.value;
  if (did) {
    context.cookies.set("did-public", did, {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/"
    });
  } else {
    context.cookies.delete("did-public", { path: "/" });
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
