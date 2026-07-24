import { builtinModules } from "node:module";

const nodeBuiltins = builtinModules.flatMap((name) =>
  name.startsWith("node:")
    ? [name, name.slice("node:".length)]
    : [name, `node:${name}`],
);
const projectRoot = process.cwd().replaceAll("\\", "/");

/**
 * Fails the Worker build when application code or ATCute depends on a Node.js
 * builtin. Nitro's Cloudflare preset adapts its own internal runtime imports
 * after this hook runs, so those imports cannot be inspected here.
 */
export function preventNodeBuiltinDependencyPlugin() {
  return {
    name: "verify-no-node-builtins",
    generateBundle(this: {
      getModuleInfo(id: string): { importers: readonly string[] } | null;
    }) {
      for (const builtin of nodeBuiltins) {
        const importers = this.getModuleInfo(builtin)?.importers ?? [];
        const unsupportedImporters = importers.filter((importer) => {
          const normalizedImporter = importer.replaceAll("\\", "/");
          return (
            (!importer.startsWith("\0") &&
              normalizedImporter.startsWith(projectRoot) &&
              !normalizedImporter.includes("/node_modules/") &&
              !normalizedImporter.includes("/.nuxt/")) ||
            /node_modules[\\/](?:\.pnpm[\\/])?@atcute[+/]/.test(importer)
          );
        });
        if (unsupportedImporters.length > 0) {
          throw new Error(
            [
              "A Node.js builtin was found in the Cloudflare Worker bundle:",
              ` - Node builtin: '${builtin}'`,
              ...unsupportedImporters.map(
                (importer) => ` - Importer: ${importer}`,
              ),
            ].join("\n"),
          );
        }
      }
    },
  };
}
