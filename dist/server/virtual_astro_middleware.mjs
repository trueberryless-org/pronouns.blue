globalThis.process ??= {};
globalThis.process.env ??= {};
const onRequest = (_, next) => next();
export {
  onRequest
};
