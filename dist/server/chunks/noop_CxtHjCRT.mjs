globalThis.process ??= {};
globalThis.process.env ??= {};
import { b as baseService, a as isESMImportedImage, v as verifyOptions } from "./image-passthrough-endpoint_BXv3mBNz.mjs";
const noopService = {
  ...baseService,
  propertiesToHash: ["src"],
  async validateOptions(options) {
    if (isESMImportedImage(options.src) && options.src.format === "svg") {
      options.format = "svg";
    } else {
      delete options.format;
    }
    verifyOptions(options);
    return options;
  },
  async transform(inputBuffer, transformOptions) {
    return {
      data: inputBuffer,
      format: transformOptions.format
    };
  }
};
var noop_default = noopService;
export {
  noop_default as default
};
