import { generateClientAssertionKey } from "@atcute/oauth-node-client";

async function main() {
  const kid = Date.now().toString();
  const key = await generateClientAssertionKey(kid, "ES256");
  console.log(JSON.stringify(key));
}

main();
