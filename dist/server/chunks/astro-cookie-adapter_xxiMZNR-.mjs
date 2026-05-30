globalThis.process ??= {};
globalThis.process.env ??= {};
let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let nanoid = (size = 21) => {
  let id = "";
  let bytes = crypto.getRandomValues(new Uint8Array(size |= 0));
  while (size--) {
    id += urlAlphabet[bytes[size] & 63];
  }
  return id;
};
const textEncoder = new TextEncoder();
new TextDecoder();
const subtle = crypto.subtle;
const encodeUtf8 = (str) => {
  return textEncoder.encode(str);
};
const toSha256 = async (buffer) => {
  return new Uint8Array(await subtle.digest("SHA-256", buffer));
};
const createRfc4648Encode = (alphabet, bitsPerChar, pad) => {
  return (bytes) => {
    const mask = (1 << bitsPerChar) - 1;
    let str = "";
    let bits = 0;
    let buffer = 0;
    for (let i = 0; i < bytes.length; ++i) {
      buffer = buffer << 8 | bytes[i];
      bits += 8;
      while (bits > bitsPerChar) {
        bits -= bitsPerChar;
        str += alphabet[mask & buffer >> bits];
      }
    }
    if (bits !== 0) {
      str += alphabet[mask & buffer << bitsPerChar - bits];
    }
    if (pad) {
      while ((str.length * bitsPerChar & 7) !== 0) {
        str += "=";
      }
    }
    return str;
  };
};
const toBase64Url$2 = (bytes) => {
  return bytes.toBase64({ alphabet: "base64url", omitPadding: true });
};
const BASE64URL_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const toBase64Url$1 = /* @__PURE__ */ createRfc4648Encode(BASE64URL_CHARSET, 6, false);
const HAS_NATIVE_SUPPORT = "fromBase64" in Uint8Array;
const toBase64Url = !HAS_NATIVE_SUPPORT ? toBase64Url$1 : toBase64Url$2;
const HASH_BY_ALG = {
  ES256: "SHA-256",
  ES384: "SHA-384",
  ES512: "SHA-512",
  PS256: "SHA-256",
  PS384: "SHA-384",
  PS512: "SHA-512",
  RS256: "SHA-256",
  RS384: "SHA-384",
  RS512: "SHA-512"
};
const CURVE_BY_ALG = {
  ES256: "P-256",
  ES384: "P-384",
  ES512: "P-521",
  PS256: null,
  PS384: null,
  PS512: null,
  RS256: null,
  RS384: null,
  RS512: null
};
const getHashName = (alg) => {
  return HASH_BY_ALG[alg];
};
const getNamedCurve = (alg) => {
  return CURVE_BY_ALG[alg];
};
const getSignAlgorithm = (alg) => {
  if (alg.startsWith("ES")) {
    return { name: "ECDSA", hash: { name: getHashName(alg) } };
  }
  if (alg.startsWith("PS")) {
    return {
      name: "RSA-PSS",
      hash: { name: getHashName(alg) },
      saltLength: getHashLength(getHashName(alg))
    };
  }
  return { name: "RSASSA-PKCS1-v1_5" };
};
const getImportAlgorithm = (alg, curve) => {
  if (alg.startsWith("ES")) {
    const namedCurve = curve ?? getNamedCurve(alg);
    if (!namedCurve) {
      throw new Error(`unable to determine curve for ${alg}`);
    }
    return { name: "ECDSA", namedCurve };
  }
  if (alg.startsWith("PS")) {
    return { name: "RSA-PSS", hash: { name: getHashName(alg) } };
  }
  return { name: "RSASSA-PKCS1-v1_5", hash: { name: getHashName(alg) } };
};
const getGenerateAlgorithm = (alg) => {
  const curve = getNamedCurve(alg);
  if (curve) {
    return { name: "ECDSA", namedCurve: curve };
  }
  const hash = { name: getHashName(alg) };
  return {
    name: alg.startsWith("PS") ? "RSA-PSS" : "RSASSA-PKCS1-v1_5",
    hash,
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1])
  };
};
const getHashLength = (hash) => {
  switch (hash) {
    case "SHA-256":
      return 32;
    case "SHA-384":
      return 48;
    case "SHA-512":
      return 64;
  }
};
const SIGNING_ALGORITHMS = [
  "ES256",
  "ES384",
  "ES512",
  "PS256",
  "PS384",
  "PS512",
  "RS256",
  "RS384",
  "RS512"
];
const isSigningAlgorithm = (alg) => {
  return SIGNING_ALGORITHMS.includes(alg);
};
const derivePublicJwk = (privateJwk, kid, alg) => {
  if (privateJwk.kty === "EC") {
    const { crv, x, y } = privateJwk;
    return { kty: "EC", crv, x, y, kid, alg, use: "sig" };
  }
  if (privateJwk.kty === "RSA") {
    const { n, e } = privateJwk;
    return { kty: "RSA", n, e, kid, alg, use: "sig" };
  }
  throw new Error(`unsupported key type`);
};
const importPrivateKeyFromJwk = async (jwk, alg) => {
  if (!("d" in jwk) || !jwk.d) {
    throw new Error(`expected a private key (missing 'd' parameter)`);
  }
  if (jwk.kty === "EC" && !alg.startsWith("ES")) {
    throw new Error(`algorithm ${alg} does not match ec key`);
  }
  if (jwk.kty === "RSA" && alg.startsWith("ES")) {
    throw new Error(`algorithm ${alg} does not match rsa key`);
  }
  const algorithm = getImportAlgorithm(alg, jwk.kty === "EC" ? jwk.crv : void 0);
  const key = await crypto.subtle.importKey("jwk", jwk, algorithm, true, ["sign"]);
  if (!(key instanceof CryptoKey)) {
    throw new Error(`expected asymmetric key, got symmetric`);
  }
  return key;
};
const exportPrivateJwkFromKey = async (key, alg, kid) => {
  const jwk = await crypto.subtle.exportKey("jwk", key);
  jwk.alg = alg;
  return jwk;
};
const keyCache = /* @__PURE__ */ new WeakMap();
const getCachedKeyMaterial = async (jwk) => {
  const cached = keyCache.get(jwk);
  if (cached) {
    return cached;
  }
  const { alg } = jwk;
  const cryptoKey = await importPrivateKeyFromJwk(jwk, alg);
  const publicJwk = derivePublicJwk(jwk, jwk.kid, alg);
  const material = { cryptoKey, publicJwk };
  keyCache.set(jwk, material);
  return material;
};
const setCachedKeyMaterial = (jwk, cryptoKey) => {
  const publicJwk = derivePublicJwk(jwk, jwk.kid, jwk.alg);
  keyCache.set(jwk, { cryptoKey, publicJwk });
};
const signJwt = async (params) => {
  const { header, payload, key, alg } = params;
  const fullHeader = { ...header, alg };
  const headerSegment = encodeSegment(fullHeader);
  const payloadSegment = encodeSegment(payload);
  const signingInput = `${headerSegment}.${payloadSegment}`;
  const signature = await crypto.subtle.sign(getSignAlgorithm(alg), key, encodeUtf8(signingInput));
  const signatureSegment = toBase64Url(new Uint8Array(signature));
  return `${signingInput}.${signatureSegment}`;
};
const encodeSegment = (value) => {
  return toBase64Url(encodeUtf8(JSON.stringify(value)));
};
const createClientAssertion = async (options) => {
  const { client_id, aud, jkt, key } = options;
  const { kid, alg } = key;
  const { cryptoKey } = await getCachedKeyMaterial(key);
  const now = Math.floor(Date.now() / 1e3);
  const cnf = jkt ? { jkt } : void 0;
  return signJwt({
    header: {
      alg,
      kid
    },
    payload: {
      iss: client_id,
      sub: client_id,
      aud,
      jti: nanoid(24),
      iat: now,
      exp: now + 60,
      cnf
    },
    key: cryptoKey,
    alg
  });
};
const sha256Base64Url = async (input) => {
  const bytes = encodeUtf8(input);
  const digest = await toSha256(bytes);
  return toBase64Url(digest);
};
const createDpopProofSigner = (jwk) => {
  const alg = jwk.alg;
  let materialPromise;
  return async (htm, htu, nonce, ath) => {
    materialPromise ||= getCachedKeyMaterial(jwk);
    const { cryptoKey, publicJwk } = await materialPromise;
    const now = Math.floor(Date.now() / 1e3);
    return signJwt({
      header: {
        typ: "dpop+jwt",
        jwk: publicJwk
      },
      payload: {
        htm,
        htu,
        iat: now,
        jti: nanoid(24),
        nonce,
        ath
      },
      key: cryptoKey,
      alg
    });
  };
};
const createDpopFetch = (options) => {
  const { key, nonces, supportedAlgs, isAuthServer, fetch: fetch2 = globalThis.fetch } = options;
  negotiateAlg(key, supportedAlgs);
  const sign = createDpopProofSigner(key);
  return async (input, init) => {
    const request = init == null && input instanceof Request ? input : new Request(input, init);
    const authHeader = request.headers.get("Authorization");
    const ath = authHeader?.startsWith("DPoP ") ? await sha256Base64Url(authHeader.slice(5)) : void 0;
    const { origin } = new URL(request.url);
    const htm = request.method;
    const htu = buildHtu(request.url);
    let initNonce;
    try {
      initNonce = await nonces.get(origin);
    } catch {
    }
    const initProof = await sign(htm, htu, initNonce, ath);
    request.headers.set("DPoP", initProof);
    const initResponse = await fetch2(request);
    const nextNonce = initResponse.headers.get("DPoP-Nonce");
    if (!nextNonce || nextNonce === initNonce) {
      return initResponse;
    }
    try {
      await nonces.set(origin, nextNonce);
    } catch {
    }
    const shouldRetry = await isUseDpopNonceError(initResponse, isAuthServer);
    if (!shouldRetry) {
      return initResponse;
    }
    if (input === request || init?.body instanceof ReadableStream) {
      return initResponse;
    }
    await initResponse.body?.cancel();
    const nextProof = await sign(htm, htu, nextNonce, ath);
    const nextRequest = new Request(input, init);
    nextRequest.headers.set("DPoP", nextProof);
    const retryResponse = await fetch2(nextRequest);
    const retryNonce = retryResponse.headers.get("DPoP-Nonce");
    if (retryNonce && retryNonce !== nextNonce) {
      try {
        await nonces.set(origin, retryNonce);
      } catch {
      }
    }
    return retryResponse;
  };
};
const buildHtu = (url) => {
  const fragmentIdx = url.indexOf("#");
  const queryIdx = url.indexOf("?");
  const end = fragmentIdx === -1 ? queryIdx : queryIdx === -1 ? fragmentIdx : Math.min(fragmentIdx, queryIdx);
  return end === -1 ? url : url.slice(0, end);
};
const negotiateAlg = (key, supportedAlgs) => {
  const keyAlg = key.alg;
  if (supportedAlgs?.length) {
    if (supportedAlgs.includes(keyAlg)) {
      return keyAlg;
    }
    throw new Error(`DPoP key algorithm ${keyAlg} not supported by server: ${supportedAlgs.join(", ")}`);
  }
  return keyAlg;
};
const isUseDpopNonceError = async (response2, isAuthServer) => {
  if (isAuthServer === void 0 || isAuthServer === false) {
    if (response2.status === 401) {
      const wwwAuth = response2.headers.get("WWW-Authenticate");
      if (wwwAuth?.startsWith("DPoP")) {
        return wwwAuth.includes('error="use_dpop_nonce"');
      }
    }
  }
  if (isAuthServer === void 0 || isAuthServer === true) {
    if (response2.status === 400) {
      try {
        const json = await response2.clone().json();
        return typeof json === "object" && json?.error === "use_dpop_nonce";
      } catch {
        return false;
      }
    }
  }
  return false;
};
const PREFERRED_ALGORITHMS$1 = [
  "ES256",
  "ES384",
  "ES512",
  "PS256",
  "PS384",
  "PS512",
  "RS256",
  "RS384",
  "RS512"
];
const sortAlgorithms = (algs) => {
  return algs.toSorted((a, b) => {
    const aIdx = PREFERRED_ALGORITHMS$1.indexOf(a);
    const bIdx = PREFERRED_ALGORITHMS$1.indexOf(b);
    if (aIdx === -1 && bIdx === -1) {
      return 0;
    }
    if (aIdx === -1) {
      return 1;
    }
    if (bIdx === -1) {
      return -1;
    }
    return aIdx - bIdx;
  });
};
const generateDpopKey = async (supportedAlgs) => {
  const normalized = supportedAlgs?.filter(isSigningAlgorithm) ?? [];
  if (supportedAlgs?.length && normalized.length === 0) {
    throw new Error(`no supported algorithms provided`);
  }
  const algs = normalized.length ? sortAlgorithms(normalized) : ["ES256"];
  const errors = [];
  for (const alg of algs) {
    try {
      const pair = await crypto.subtle.generateKey(getGenerateAlgorithm(alg), true, ["sign", "verify"]);
      const jwk = await exportPrivateJwkFromKey(pair.privateKey, alg);
      setCachedKeyMaterial(jwk, pair.privateKey);
      return jwk;
    } catch (err) {
      errors.push(err);
    }
  }
  throw new AggregateError(errors, `failed to generate DPoP key for any of: ${algs.join(", ")}`);
};
const DEFAULT_CONFIG = {
  lang: void 0,
  message: void 0,
  abortEarly: void 0,
  abortPipeEarly: void 0
};
// @__NO_SIDE_EFFECTS__
function getGlobalConfig(config$1) {
  return DEFAULT_CONFIG;
}
let store$3;
// @__NO_SIDE_EFFECTS__
function getGlobalMessage(lang) {
  return store$3?.get(lang);
}
let store$2;
// @__NO_SIDE_EFFECTS__
function getSchemaMessage(lang) {
  return store$2?.get(lang);
}
let store$1;
// @__NO_SIDE_EFFECTS__
function getSpecificMessage(reference, lang) {
  return store$1?.get(reference)?.get(lang);
}
// @__NO_SIDE_EFFECTS__
function _stringify(input) {
  const type = typeof input;
  if (type === "string") return `"${input}"`;
  if (type === "number" || type === "bigint" || type === "boolean") return `${input}`;
  if (type === "object" || type === "function") return (input && Object.getPrototypeOf(input)?.constructor?.name) ?? "null";
  return type;
}
function _addIssue(context, label, dataset, config$1, other) {
  const input = other && "input" in other ? other.input : dataset.value;
  const expected = other?.expected ?? context.expects ?? null;
  const received = other?.received ?? /* @__PURE__ */ _stringify(input);
  const issue = {
    kind: context.kind,
    type: context.type,
    input,
    expected,
    received,
    message: `Invalid ${label}: ${expected ? `Expected ${expected} but r` : "R"}eceived ${received}`,
    requirement: context.requirement,
    path: other?.path,
    issues: other?.issues,
    lang: config$1.lang,
    abortEarly: config$1.abortEarly,
    abortPipeEarly: config$1.abortPipeEarly
  };
  const isSchema = context.kind === "schema";
  const message$1 = other?.message ?? context.message ?? /* @__PURE__ */ getSpecificMessage(context.reference, issue.lang) ?? (isSchema ? /* @__PURE__ */ getSchemaMessage(issue.lang) : null) ?? config$1.message ?? /* @__PURE__ */ getGlobalMessage(issue.lang);
  if (message$1 !== void 0) issue.message = typeof message$1 === "function" ? message$1(issue) : message$1;
  if (isSchema) dataset.typed = false;
  if (dataset.issues) dataset.issues.push(issue);
  else dataset.issues = [issue];
}
const _standardCache = /* @__PURE__ */ new WeakMap();
// @__NO_SIDE_EFFECTS__
function _getStandardProps(context) {
  let cached = _standardCache.get(context);
  if (!cached) {
    cached = {
      version: 1,
      vendor: "valibot",
      validate(value$1) {
        return context["~run"]({ value: value$1 }, /* @__PURE__ */ getGlobalConfig());
      }
    };
    _standardCache.set(context, cached);
  }
  return cached;
}
// @__NO_SIDE_EFFECTS__
function _isValidObjectKey(object$1, key) {
  return Object.prototype.hasOwnProperty.call(object$1, key) && key !== "__proto__" && key !== "prototype" && key !== "constructor";
}
// @__NO_SIDE_EFFECTS__
function _joinExpects(values$1, separator) {
  const list = [...new Set(values$1)];
  if (list.length > 1) return `(${list.join(` ${separator} `)})`;
  return list[0] ?? "never";
}
var ValiError = class extends Error {
  /**
  * Creates a Valibot error with useful information.
  *
  * @param issues The error issues.
  */
  constructor(issues) {
    super(issues[0].message);
    this.name = "ValiError";
    this.issues = issues;
  }
};
// @__NO_SIDE_EFFECTS__
function check(requirement, message$1) {
  return {
    kind: "validation",
    type: "check",
    reference: check,
    async: false,
    expects: null,
    requirement,
    message: message$1,
    "~run"(dataset, config$1) {
      if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function checkItems(requirement, message$1) {
  return {
    kind: "validation",
    type: "check_items",
    reference: checkItems,
    async: false,
    expects: null,
    requirement,
    message: message$1,
    "~run"(dataset, config$1) {
      if (dataset.typed) for (let index = 0; index < dataset.value.length; index++) {
        const item = dataset.value[index];
        if (!this.requirement(item, index, dataset.value)) _addIssue(this, "item", dataset, config$1, {
          input: item,
          path: [{
            type: "array",
            origin: "value",
            input: dataset.value,
            key: index,
            value: item
          }]
        });
      }
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function minLength(requirement, message$1) {
  return {
    kind: "validation",
    type: "min_length",
    reference: minLength,
    async: false,
    expects: `>=${requirement}`,
    requirement,
    message: message$1,
    "~run"(dataset, config$1) {
      if (dataset.typed && dataset.value.length < this.requirement) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function nonEmpty(message$1) {
  return {
    kind: "validation",
    type: "non_empty",
    reference: nonEmpty,
    async: false,
    expects: "!0",
    message: message$1,
    "~run"(dataset, config$1) {
      if (dataset.typed && dataset.value.length === 0) _addIssue(this, "length", dataset, config$1, { received: "0" });
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function rawCheck(action) {
  return {
    kind: "validation",
    type: "raw_check",
    reference: rawCheck,
    async: false,
    expects: null,
    "~run"(dataset, config$1) {
      action({
        dataset,
        config: config$1,
        addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config$1, info)
      });
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function regex(requirement, message$1) {
  return {
    kind: "validation",
    type: "regex",
    reference: regex,
    async: false,
    expects: `${requirement}`,
    requirement,
    message: message$1,
    "~run"(dataset, config$1) {
      if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "format", dataset, config$1);
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function transform(operation) {
  return {
    kind: "transformation",
    type: "transform",
    reference: transform,
    async: false,
    operation,
    "~run"(dataset) {
      dataset.value = this.operation(dataset.value);
      return dataset;
    }
  };
}
const ABORT_EARLY_CONFIG = { abortEarly: true };
// @__NO_SIDE_EFFECTS__
function getFallback(schema, dataset, config$1) {
  return typeof schema.fallback === "function" ? schema.fallback(dataset, config$1) : schema.fallback;
}
// @__NO_SIDE_EFFECTS__
function forward(action, path) {
  return {
    ...action,
    "~run"(dataset, config$1) {
      const prevIssues = dataset.issues && [...dataset.issues];
      dataset = action["~run"](dataset, config$1);
      if (dataset.issues) {
        for (const issue of dataset.issues) if (!prevIssues?.includes(issue)) {
          let pathInput = dataset.value;
          for (const key of path) {
            const pathValue = pathInput[key];
            const pathItem = {
              type: "unknown",
              origin: "value",
              input: pathInput,
              key,
              value: pathValue
            };
            if (issue.path) issue.path.push(pathItem);
            else issue.path = [pathItem];
            if (!pathValue) break;
            pathInput = pathValue;
          }
        }
      }
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function getDefault(schema, dataset, config$1) {
  return typeof schema.default === "function" ? schema.default(dataset, config$1) : schema.default;
}
// @__NO_SIDE_EFFECTS__
function is(schema, input) {
  return !schema["~run"]({ value: input }, ABORT_EARLY_CONFIG).issues;
}
// @__NO_SIDE_EFFECTS__
function array(item, message$1) {
  return {
    kind: "schema",
    type: "array",
    reference: array,
    expects: "Array",
    async: false,
    item,
    message: message$1,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      const input = dataset.value;
      if (Array.isArray(input)) {
        dataset.typed = true;
        dataset.value = [];
        for (let key = 0; key < input.length; key++) {
          const value$1 = input[key];
          const itemDataset = this.item["~run"]({ value: value$1 }, config$1);
          if (itemDataset.issues) {
            const pathItem = {
              type: "array",
              origin: "value",
              input,
              key,
              value: value$1
            };
            for (const issue of itemDataset.issues) {
              if (issue.path) issue.path.unshift(pathItem);
              else issue.path = [pathItem];
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) dataset.issues = itemDataset.issues;
            if (config$1.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!itemDataset.typed) dataset.typed = false;
          dataset.value.push(itemDataset.value);
        }
      } else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function boolean(message$1) {
  return {
    kind: "schema",
    type: "boolean",
    reference: boolean,
    expects: "boolean",
    async: false,
    message: message$1,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      if (typeof dataset.value === "boolean") dataset.typed = true;
      else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function custom(check$1, message$1) {
  return {
    kind: "schema",
    type: "custom",
    reference: custom,
    expects: "unknown",
    async: false,
    check: check$1,
    message: message$1,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      if (this.check(dataset.value)) dataset.typed = true;
      else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function literal(literal_, message$1) {
  return {
    kind: "schema",
    type: "literal",
    reference: literal,
    expects: /* @__PURE__ */ _stringify(literal_),
    async: false,
    literal: literal_,
    message: message$1,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      if (dataset.value === this.literal) dataset.typed = true;
      else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function looseObject(entries$1, message$1) {
  return {
    kind: "schema",
    type: "loose_object",
    reference: looseObject,
    expects: "Object",
    async: false,
    entries: entries$1,
    message: message$1,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        for (const key in this.entries) {
          const valueSchema = this.entries[key];
          if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
            const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
            const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
            if (valueDataset.issues) {
              const pathItem = {
                type: "object",
                origin: "value",
                input,
                key,
                value: value$1
              };
              for (const issue of valueDataset.issues) {
                if (issue.path) issue.path.unshift(pathItem);
                else issue.path = [pathItem];
                dataset.issues?.push(issue);
              }
              if (!dataset.issues) dataset.issues = valueDataset.issues;
              if (config$1.abortEarly) {
                dataset.typed = false;
                break;
              }
            }
            if (!valueDataset.typed) dataset.typed = false;
            dataset.value[key] = valueDataset.value;
          } else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
          else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
            _addIssue(this, "key", dataset, config$1, {
              input: void 0,
              expected: `"${key}"`,
              path: [{
                type: "object",
                origin: "key",
                input,
                key,
                value: input[key]
              }]
            });
            if (config$1.abortEarly) break;
          }
        }
        if (!dataset.issues || !config$1.abortEarly) {
          for (const key in input) if (/* @__PURE__ */ _isValidObjectKey(input, key) && !(key in this.entries)) dataset.value[key] = input[key];
        }
      } else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function number(message$1) {
  return {
    kind: "schema",
    type: "number",
    reference: number,
    expects: "number",
    async: false,
    message: message$1,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      if (typeof dataset.value === "number" && !isNaN(dataset.value)) dataset.typed = true;
      else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function optional(wrapped, default_) {
  return {
    kind: "schema",
    type: "optional",
    reference: optional,
    expects: `(${wrapped.expects} | undefined)`,
    async: false,
    wrapped,
    default: default_,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      if (dataset.value === void 0) {
        if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
        if (dataset.value === void 0) {
          dataset.typed = true;
          return dataset;
        }
      }
      return this.wrapped["~run"](dataset, config$1);
    }
  };
}
// @__NO_SIDE_EFFECTS__
function picklist(options, message$1) {
  return {
    kind: "schema",
    type: "picklist",
    reference: picklist,
    expects: /* @__PURE__ */ _joinExpects(options.map(_stringify), "|"),
    async: false,
    options,
    message: message$1,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      if (this.options.includes(dataset.value)) dataset.typed = true;
      else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function record(key, value$1, message$1) {
  return {
    kind: "schema",
    type: "record",
    reference: record,
    expects: "Object",
    async: false,
    key,
    value: value$1,
    message: message$1,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      const input = dataset.value;
      if (input && typeof input === "object") {
        dataset.typed = true;
        dataset.value = {};
        for (const entryKey in input) if (/* @__PURE__ */ _isValidObjectKey(input, entryKey)) {
          const entryValue = input[entryKey];
          const keyDataset = this.key["~run"]({ value: entryKey }, config$1);
          if (keyDataset.issues) {
            const pathItem = {
              type: "object",
              origin: "key",
              input,
              key: entryKey,
              value: entryValue
            };
            for (const issue of keyDataset.issues) {
              issue.path = [pathItem];
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) dataset.issues = keyDataset.issues;
            if (config$1.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          const valueDataset = this.value["~run"]({ value: entryValue }, config$1);
          if (valueDataset.issues) {
            const pathItem = {
              type: "object",
              origin: "value",
              input,
              key: entryKey,
              value: entryValue
            };
            for (const issue of valueDataset.issues) {
              if (issue.path) issue.path.unshift(pathItem);
              else issue.path = [pathItem];
              dataset.issues?.push(issue);
            }
            if (!dataset.issues) dataset.issues = valueDataset.issues;
            if (config$1.abortEarly) {
              dataset.typed = false;
              break;
            }
          }
          if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
          if (keyDataset.typed) dataset.value[keyDataset.value] = valueDataset.value;
        }
      } else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function string(message$1) {
  return {
    kind: "schema",
    type: "string",
    reference: string,
    expects: "string",
    async: false,
    message: message$1,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      if (typeof dataset.value === "string") dataset.typed = true;
      else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function undefined_(message$1) {
  return {
    kind: "schema",
    type: "undefined",
    reference: undefined_,
    expects: "undefined",
    async: false,
    message: message$1,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      if (dataset.value === void 0) dataset.typed = true;
      else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function _subIssues(datasets) {
  let issues;
  if (datasets) for (const dataset of datasets) if (issues) for (const issue of dataset.issues) issues.push(issue);
  else issues = dataset.issues;
  return issues;
}
// @__NO_SIDE_EFFECTS__
function union(options, message$1) {
  return {
    kind: "schema",
    type: "union",
    reference: union,
    expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "|"),
    async: false,
    options,
    message: message$1,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      let validDataset;
      let typedDatasets;
      let untypedDatasets;
      for (const schema of this.options) {
        const optionDataset = schema["~run"]({ value: dataset.value }, config$1);
        if (optionDataset.typed) if (optionDataset.issues) if (typedDatasets) typedDatasets.push(optionDataset);
        else typedDatasets = [optionDataset];
        else {
          validDataset = optionDataset;
          break;
        }
        else if (untypedDatasets) untypedDatasets.push(optionDataset);
        else untypedDatasets = [optionDataset];
      }
      if (validDataset) return validDataset;
      if (typedDatasets) {
        if (typedDatasets.length === 1) return typedDatasets[0];
        _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(typedDatasets) });
        dataset.typed = true;
      } else if (untypedDatasets?.length === 1) return untypedDatasets[0];
      else _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(untypedDatasets) });
      return dataset;
    }
  };
}
// @__NO_SIDE_EFFECTS__
function unknown() {
  return {
    kind: "schema",
    type: "unknown",
    reference: unknown,
    expects: "unknown",
    async: false,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset) {
      dataset.typed = true;
      return dataset;
    }
  };
}
function parse(schema, input, config$1) {
  const dataset = schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig());
  if (dataset.issues) throw new ValiError(dataset.issues);
  return dataset.value;
}
// @__NO_SIDE_EFFECTS__
function pipe$1(...pipe$12) {
  return {
    ...pipe$12[0],
    pipe: pipe$12,
    get "~standard"() {
      return /* @__PURE__ */ _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      for (const item of pipe$12) if (item.kind !== "metadata") {
        if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
          dataset.typed = false;
          break;
        }
        if (!dataset.issues || !config$1.abortEarly && !config$1.abortPipeEarly) dataset = item["~run"](dataset, config$1);
      }
      return dataset;
    }
  };
}
const generatePkce = async (length = 64) => {
  const verifier = nanoid(length);
  const challenge = await sha256Base64Url(verifier);
  return { verifier, challenge, method: "S256" };
};
const PREFERRED_ALGORITHMS = [
  "ES256",
  "ES384",
  "ES512",
  "PS256",
  "PS384",
  "PS512",
  "RS256",
  "RS384",
  "RS512"
];
class Keyset {
  keys;
  _publicJwks;
  /**
   * creates a new keyset from an array of private JWKs.
   *
   * @param keys array of private JWKs (at least one required, each with `kid` and `alg` set)
   * @throws if keyset is empty or contains duplicate key IDs
   */
  constructor(keys) {
    if (keys.length === 0) {
      throw new Error(`keyset must contain at least one key`);
    }
    const kids = /* @__PURE__ */ new Set();
    for (const key of keys) {
      if (kids.has(key.kid)) {
        throw new Error(`duplicate key ID: ${key.kid}`);
      }
      kids.add(key.kid);
    }
    this.keys = Object.freeze([...keys]);
  }
  /** number of keys in the keyset */
  get size() {
    return this.keys.length;
  }
  /**
   * public JWKS for serving at client metadata or jwks_uri.
   * derived lazily on first access, then cached.
   */
  get publicJwks() {
    this._publicJwks ||= { keys: this.keys.map((k) => derivePublicJwk(k, k.kid, k.alg)) };
    return this._publicJwks;
  }
  /**
   * finds the first key matching the given criteria.
   *
   * @param options search criteria (kid and/or alg)
   * @returns matching key or undefined
   */
  find(options) {
    for (const key of this.list(options)) {
      return key;
    }
    return void 0;
  }
  /**
   * gets a key matching the given criteria.
   *
   * @param options search criteria (kid and/or alg)
   * @returns matching key
   * @throws if no matching key is found
   */
  get(options) {
    const key = this.find(options);
    if (!key) {
      const desc = options?.kid ?? options?.alg ?? "any";
      throw new Error(`no key found matching: ${desc}`);
    }
    return key;
  }
  /**
   * iterates over keys matching the given criteria, in preference order.
   *
   * @param options search criteria (kid and/or alg)
   */
  *list(options) {
    const { kid, alg } = options ?? {};
    const algSet = alg == null ? null : new Set(Array.isArray(alg) ? alg : [alg]);
    const sorted = this.keys.toSorted((a, b) => {
      const aIdx = PREFERRED_ALGORITHMS.indexOf(a.alg);
      const bIdx = PREFERRED_ALGORITHMS.indexOf(b.alg);
      return aIdx - bIdx;
    });
    for (const key of sorted) {
      if (kid != null && key.kid !== kid) {
        continue;
      }
      if (algSet != null && !algSet.has(key.alg)) {
        continue;
      }
      yield key;
    }
  }
  /**
   * finds a key for signing, negotiating algorithm with server's supported list.
   *
   * @param serverAlgs algorithms supported by the server (from metadata)
   * @returns key and negotiated algorithm
   * @throws if no compatible key is found
   */
  findForSigning(serverAlgs) {
    const algs = serverAlgs ?? ["ES256"];
    const key = this.find({ alg: algs });
    if (!key) {
      throw new Error(`no key found compatible with server algorithms: ${algs.join(", ")}`);
    }
    return { key, alg: key.alg };
  }
  [Symbol.iterator]() {
    return this.keys[Symbol.iterator]();
  }
}
const FALLBACK_ALG = "ES256";
const CLIENT_ASSERTION_TYPE_JWT_BEARER = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
const OAUTH_SCOPE_REGEXP = /^[\x21\x23-\x5B\x5D-\x7E]+(?: [\x21\x23-\x5B\x5D-\x7E]+)*$/;
const isOAuthScope = (input) => OAUTH_SCOPE_REGEXP.test(input);
const isLoopbackHost = (hostname) => {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
};
const isHostnameIP = (hostname) => {
  if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return true;
  }
  if (hostname.startsWith("[") && hostname.endsWith("]")) {
    return true;
  }
  return false;
};
const isLocalHostname = (hostname) => {
  const parts = hostname.split(".");
  if (parts.length < 2) {
    return true;
  }
  const tld = parts.at(-1).toLowerCase();
  return tld === "test" || tld === "local" || tld === "localhost" || tld === "invalid" || tld === "example";
};
const extractUrlPath = (url) => {
  const endOfProtocol = url.startsWith("https://") ? 8 : url.startsWith("http://") ? 7 : -1;
  if (endOfProtocol === -1) {
    throw new TypeError(`url must use https: or http: protocol`);
  }
  const hashIdx = url.indexOf("#", endOfProtocol);
  const questionIdx = url.indexOf("?", endOfProtocol);
  const queryStrIdx = questionIdx !== -1 && (hashIdx === -1 || questionIdx < hashIdx) ? questionIdx : -1;
  const pathEnd = hashIdx === -1 ? queryStrIdx === -1 ? url.length : queryStrIdx : queryStrIdx === -1 ? hashIdx : Math.min(hashIdx, queryStrIdx);
  const slashIdx = url.indexOf("/", endOfProtocol);
  const pathStart = slashIdx === -1 || slashIdx > pathEnd ? pathEnd : slashIdx;
  if (endOfProtocol === pathStart) {
    throw new TypeError(`url must contain a host`);
  }
  return url.substring(pathStart, pathEnd) || "/";
};
const isLastOccurrence = (item, index, array2) => {
  return array2.lastIndexOf(item) === index;
};
const isSpaceSeparatedValue = (value, input) => {
  const inputLength = input.length;
  const valueLength = value.length;
  if (inputLength < valueLength) {
    return false;
  }
  let idx = input.indexOf(value);
  let idxEnd;
  while (idx !== -1) {
    idxEnd = idx + valueLength;
    if (
      // at beginning or preceded by space
      (idx === 0 || input.charCodeAt(idx - 1) === 32) && // at end or followed by space
      (idxEnd === inputLength || input.charCodeAt(idxEnd) === 32)
    ) {
      return true;
    }
    idx = input.indexOf(value, idxEnd + 1);
  }
  return false;
};
const ATPROTO_SCOPE_VALUE = "atproto";
const isAtprotoOAuthScope = (input) => {
  return isOAuthScope(input) && isSpaceSeparatedValue(ATPROTO_SCOPE_VALUE, input);
};
const atprotoOAuthScopeSchema = /* @__PURE__ */ pipe$1(/* @__PURE__ */ string(), /* @__PURE__ */ check(isAtprotoOAuthScope, `invalid atproto OAuth scope`));
const DEFAULT_ATPROTO_OAUTH_SCOPE = ATPROTO_SCOPE_VALUE;
const SINGLE_SCOPE_RE = /^[\x21\x23-\x5B\x5D-\x7E]+$/;
const singleScopeSchema = /* @__PURE__ */ pipe$1(/* @__PURE__ */ string(), /* @__PURE__ */ regex(SINGLE_SCOPE_RE, `invalid OAuth scope`));
const scopeSchema = /* @__PURE__ */ union([
  /* @__PURE__ */ pipe$1(atprotoOAuthScopeSchema, /* @__PURE__ */ check((input) => input.split(/\s+/).every(isLastOccurrence), `duplicate scope`)),
  /* @__PURE__ */ pipe$1(/* @__PURE__ */ array(singleScopeSchema), /* @__PURE__ */ transform((input) => input.includes("atproto") ? input : ["atproto", ...input]), /* @__PURE__ */ checkItems(isLastOccurrence, `duplicate scope`))
]);
const oauthClientIdSchema = /* @__PURE__ */ pipe$1(/* @__PURE__ */ string(), /* @__PURE__ */ nonEmpty(`must not be empty`));
const urlSchema = /* @__PURE__ */ pipe$1(/* @__PURE__ */ string(), /* @__PURE__ */ check((input) => input.includes(":") && URL.canParse(input), `must be a valid url`));
const loopbackUriSchema = /* @__PURE__ */ pipe$1(urlSchema, /* @__PURE__ */ rawCheck(({ dataset, addIssue }) => {
  if (!dataset.typed) {
    return;
  }
  const input = dataset.value;
  if (!input.startsWith("http://")) {
    addIssue({ message: `loopback url must use http: protocol` });
    return;
  }
  if (!isLoopbackHost(new URL(input).hostname)) {
    addIssue({ message: `loopback url must use localhost, 127.0.0.1, or [::1] as hostname` });
  }
}));
const httpsUriSchema = /* @__PURE__ */ pipe$1(urlSchema, /* @__PURE__ */ rawCheck(({ dataset, addIssue }) => {
  if (!dataset.typed) {
    return;
  }
  const input = dataset.value;
  if (!input.startsWith("https://")) {
    addIssue({ message: `url must use https: protocol` });
    return;
  }
  const url = new URL(input);
  if (isLoopbackHost(url.hostname)) {
    addIssue({ message: `https url must not use a loopback host` });
    return;
  }
  if (!isHostnameIP(url.hostname)) {
    if (!url.hostname.includes(".")) {
      addIssue({ message: `domain name must contain at least two segments` });
      return;
    }
    if (url.hostname.endsWith(".local")) {
      addIssue({ message: `domain name must not end with .local` });
    }
  }
}));
const webUriSchema = /* @__PURE__ */ union([loopbackUriSchema, httpsUriSchema], `url must use http: or https: protocol`);
const nonLocalWebUriSchema = /* @__PURE__ */ pipe$1(webUriSchema, /* @__PURE__ */ check((input) => !isLocalHostname(new URL(input).hostname), `hostname is invalid`));
const privateUseUriSchema = /* @__PURE__ */ pipe$1(urlSchema, /* @__PURE__ */ rawCheck(({ dataset, addIssue }) => {
  if (!dataset.typed) {
    return;
  }
  const input = dataset.value;
  const dotIdx = input.indexOf(".");
  const colonIdx = input.indexOf(":");
  if (dotIdx === -1 || colonIdx === -1 || dotIdx > colonIdx) {
    addIssue({ message: `private-use uri scheme must contain a dot in the protocol` });
    return;
  }
  const url = new URL(input);
  const scheme = url.protocol.slice(0, -1);
  const domain = scheme.split(".").reverse().join(".");
  if (isLocalHostname(domain)) {
    addIssue({ message: `private-use uri scheme must not be a local hostname` });
    return;
  }
  if (url.href.startsWith(`${url.protocol}//`) || url.username || url.password || url.hostname || url.port) {
    addIssue({ message: `private-use uri must be in the form scheme:/<path>` });
  }
}));
const oauthClientIdDiscoverableSchema = /* @__PURE__ */ pipe$1(oauthClientIdSchema, httpsUriSchema, /* @__PURE__ */ rawCheck(({ dataset, addIssue }) => {
  if (!dataset.typed) {
    return;
  }
  const input = dataset.value;
  const url = new URL(input);
  if (url.username || url.password) {
    addIssue({ message: `client ID must not contain credentials` });
    return;
  }
  if (url.hash) {
    addIssue({ message: `client ID must not contain a fragment` });
    return;
  }
  if (url.pathname === "/") {
    addIssue({ message: `client ID must contain a path component (e.g. "/client-metadata.json")` });
    return;
  }
  if (url.pathname.endsWith("/")) {
    addIssue({ message: `client ID path must not end with a trailing slash` });
    return;
  }
  if (isHostnameIP(url.hostname)) {
    addIssue({ message: `client ID hostname must not be an IP address` });
    return;
  }
  if (extractUrlPath(input) !== url.pathname) {
    addIssue({ message: `client ID must be in canonical form ("${url.href}", got "${input}")` });
  }
}));
const confidentialClientMetadataSchema = /* @__PURE__ */ pipe$1(/* @__PURE__ */ looseObject({
  /** discoverable https client_id URL (where metadata is hosted) */
  client_id: oauthClientIdDiscoverableSchema,
  /** redirect URIs for authorization responses (must be https) */
  redirect_uris: /* @__PURE__ */ pipe$1(/* @__PURE__ */ array(httpsUriSchema), /* @__PURE__ */ minLength(1, `must have at least one redirect URI`), /* @__PURE__ */ checkItems((uri) => {
    const url = new URL(uri);
    return !url.username && !url.password;
  }, `redirect URI must not contain credentials`)),
  scope: scopeSchema,
  /** optional client homepage */
  client_uri: /* @__PURE__ */ optional(webUriSchema),
  /** optional display name */
  client_name: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
  /** optional policy url */
  policy_uri: /* @__PURE__ */ optional(nonLocalWebUriSchema),
  /** optional terms of service url */
  tos_uri: /* @__PURE__ */ optional(nonLocalWebUriSchema),
  /** optional logo url */
  logo_uri: /* @__PURE__ */ optional(nonLocalWebUriSchema),
  /** optional JWKS URL; if omitted, the library will inline jwks from the keyset */
  jwks_uri: /* @__PURE__ */ optional(httpsUriSchema)
}), /* @__PURE__ */ forward(/* @__PURE__ */ check((input) => !isLocalHostname(new URL(input.client_id).hostname), `client_id hostname is invalid`), ["client_id"]), /* @__PURE__ */ forward(/* @__PURE__ */ check((input) => {
  if (!input.jwks_uri) {
    return true;
  }
  const jwksUrl = new URL(input.jwks_uri);
  return !(jwksUrl.username || jwksUrl.password);
}, `jwks_uri must not contain credentials`), ["jwks_uri"]), /* @__PURE__ */ forward(/* @__PURE__ */ check((input) => {
  if (!input.jwks_uri) {
    return true;
  }
  return !isLocalHostname(new URL(input.jwks_uri).hostname);
}, `jwks_uri hostname is invalid`), ["jwks_uri"]), /* @__PURE__ */ forward(/* @__PURE__ */ check((input) => {
  if (!input.client_uri) {
    return true;
  }
  return !isLocalHostname(new URL(input.client_uri).hostname);
}, `client_uri hostname is invalid`), ["client_uri"]), /* @__PURE__ */ forward(/* @__PURE__ */ check((input) => {
  if (!input.client_uri) {
    return true;
  }
  const clientUriUrl = new URL(input.client_uri);
  const clientIdUrl = new URL(input.client_id);
  return clientUriUrl.origin === clientIdUrl.origin;
}, `client_uri must have the same origin as the client_id`), ["client_uri"]), /* @__PURE__ */ forward(/* @__PURE__ */ check((input) => {
  if (!input.client_uri) {
    return true;
  }
  const clientUriUrl = new URL(input.client_uri);
  const clientIdUrl = new URL(input.client_id);
  if (clientIdUrl.pathname === clientUriUrl.pathname) {
    return true;
  }
  const prefix = clientUriUrl.pathname.endsWith("/") ? clientUriUrl.pathname : `${clientUriUrl.pathname}/`;
  return clientIdUrl.pathname.startsWith(prefix);
}, `client_uri must be a parent URL of the client_id`), ["client_uri"]));
const loopbackRedirectUriSchema = /* @__PURE__ */ pipe$1(loopbackUriSchema, /* @__PURE__ */ check((input) => !input.startsWith("http://localhost"), `use of "localhost" hostname is not allowed (RFC 8252), use a loopback IP such as "127.0.0.1" instead`));
const oauthRedirectUriSchema = /* @__PURE__ */ union([loopbackRedirectUriSchema, httpsUriSchema, privateUseUriSchema], `url must use http: loopback, https:, or a private-use scheme`);
const redirectUrisSchema = /* @__PURE__ */ pipe$1(/* @__PURE__ */ array(oauthRedirectUriSchema), /* @__PURE__ */ minLength(1, `must have at least one redirect URI`), /* @__PURE__ */ checkItems((uri) => {
  if (!uri.includes("://")) {
    return true;
  }
  const url = new URL(uri);
  return !url.username && !url.password;
}, `redirect URI must not contain credentials`));
const loopbackRedirectUrisSchema = /* @__PURE__ */ pipe$1(redirectUrisSchema, /* @__PURE__ */ checkItems((uri) => /* @__PURE__ */ is(loopbackRedirectUriSchema, uri), `loopback clients require loopback redirect URIs (127.0.0.1 or [::1])`));
const loopbackClientMetadataSchema = /* @__PURE__ */ looseObject({
  /** must not be provided for loopback clients */
  client_id: /* @__PURE__ */ optional(/* @__PURE__ */ undefined_()),
  /**
   * redirect URIs for authorization responses.
   *
   * must be loopback IP addresses (127.0.0.1 or [::1]).
   * per RFC 8252, port numbers are ignored during redirect URI matching,
   * allowing ephemeral ports.
   */
  redirect_uris: loopbackRedirectUrisSchema,
  /** OAuth scope (must include "atproto") */
  scope: scopeSchema
});
const discoverablePublicClientMetadataSchema = /* @__PURE__ */ looseObject({
  /** discoverable HTTPS client_id URL */
  client_id: oauthClientIdDiscoverableSchema,
  /** redirect URIs for authorization responses */
  redirect_uris: redirectUrisSchema,
  /** OAuth scope (must include "atproto") */
  scope: scopeSchema,
  /**
   * application type - defaults to 'web'.
   */
  application_type: /* @__PURE__ */ optional(/* @__PURE__ */ picklist(["web", "native"])),
  /** optional client homepage */
  client_uri: /* @__PURE__ */ optional(webUriSchema),
  /** optional display name */
  client_name: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
  /** optional policy url */
  policy_uri: /* @__PURE__ */ optional(nonLocalWebUriSchema),
  /** optional terms of service url */
  tos_uri: /* @__PURE__ */ optional(nonLocalWebUriSchema),
  /** optional logo url */
  logo_uri: /* @__PURE__ */ optional(nonLocalWebUriSchema)
});
const publicClientMetadataSchema = /* @__PURE__ */ union([
  loopbackClientMetadataSchema,
  discoverablePublicClientMetadataSchema
]);
const buildClientMetadata = (input, keyset) => {
  const conf = parse(confidentialClientMetadataSchema, input);
  const metadata = {
    client_id: conf.client_id,
    client_name: conf.client_name,
    client_uri: conf.client_uri,
    policy_uri: conf.policy_uri,
    tos_uri: conf.tos_uri,
    logo_uri: conf.logo_uri,
    redirect_uris: conf.redirect_uris,
    scope: Array.isArray(conf.scope) ? conf.scope.join(" ") : conf.scope,
    application_type: "web",
    subject_type: "public",
    response_types: ["code"],
    grant_types: ["authorization_code", "refresh_token"],
    token_endpoint_auth_method: "private_key_jwt",
    token_endpoint_auth_signing_alg: FALLBACK_ALG,
    dpop_bound_access_tokens: true,
    jwks_uri: conf.jwks_uri,
    jwks: conf.jwks_uri ? void 0 : keyset.publicJwks
  };
  const signingKeys = Array.from(keyset);
  if (!signingKeys.some((key) => key.alg === FALLBACK_ALG)) {
    throw new TypeError(`"private_key_jwt" requires at least one "${FALLBACK_ALG}" signing key`);
  }
  if (metadata.jwks) {
    const jwksKids = new Set(metadata.jwks.keys.filter((k) => !k.revoked).map((k) => k.kid).filter(Boolean));
    for (const key of signingKeys) {
      if (!jwksKids.has(key.kid)) {
        throw new TypeError(`signing key "${key.kid}" not found in jwks`);
      }
    }
  }
  return metadata;
};
const buildLoopbackClientId = (redirectUris, scope) => {
  const params = new URLSearchParams();
  if (scope !== DEFAULT_ATPROTO_OAUTH_SCOPE) {
    params.set("scope", scope);
  }
  for (const uri of redirectUris) {
    params.append("redirect_uri", uri);
  }
  if (params.size > 0) {
    return `http://localhost?${params.toString()}`;
  }
  return "http://localhost";
};
const buildPublicClientMetadata = (input) => {
  const parsed = parse(publicClientMetadataSchema, input);
  const scope = Array.isArray(parsed.scope) ? parsed.scope.join(" ") : parsed.scope;
  if (parsed.client_id === void 0) {
    return {
      client_id: buildLoopbackClientId(parsed.redirect_uris, scope),
      redirect_uris: parsed.redirect_uris,
      scope,
      application_type: "native",
      response_types: ["code"],
      grant_types: ["authorization_code", "refresh_token"],
      token_endpoint_auth_method: "none",
      dpop_bound_access_tokens: true
    };
  }
  return {
    client_id: parsed.client_id,
    client_name: parsed.client_name,
    client_uri: parsed.client_uri,
    policy_uri: parsed.policy_uri,
    tos_uri: parsed.tos_uri,
    logo_uri: parsed.logo_uri,
    redirect_uris: parsed.redirect_uris,
    scope,
    application_type: parsed.application_type ?? "web",
    subject_type: "public",
    response_types: ["code"],
    grant_types: ["authorization_code", "refresh_token"],
    token_endpoint_auth_method: "none",
    dpop_bound_access_tokens: true
  };
};
const oauthAuthorizationDetailSchema = /* @__PURE__ */ looseObject({
  type: /* @__PURE__ */ string(),
  /**
   * an array of strings representing the location of the resource or RS. these
   * strings are typically URIs identifying the location of the RS.
   */
  locations: /* @__PURE__ */ optional(/* @__PURE__ */ array(urlSchema)),
  /**
   * an array of strings representing the kinds of actions to be taken at the
   * resource.
   */
  actions: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  /**
   * an array of strings representing the kinds of data being requested from the
   * resource.
   */
  datatypes: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  /**
   * a string identifier indicating a specific resource available at the API.
   */
  identifier: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
  /**
   * an array of strings representing the types or levels of privilege being
   * requested at the resource.
   */
  privileges: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string()))
});
const oauthAuthorizationDetailsSchema = /* @__PURE__ */ array(oauthAuthorizationDetailSchema);
const DID_RE = /^did:([a-z]+):([a-zA-Z0-9._:%-]*[a-zA-Z0-9._-])$/;
const isDid = /* @__NO_SIDE_EFFECTS__ */ (input) => {
  return typeof input === "string" && input.length >= 7 && input.length <= 2048 && DID_RE.test(input);
};
const isAsciiAlpha = /* @__NO_SIDE_EFFECTS__ */ (c) => {
  return c >= 65 && c <= 90 || c >= 97 && c <= 122;
};
const isAsciiAlphaNum = /* @__NO_SIDE_EFFECTS__ */ (c) => {
  return /* @__PURE__ */ isAsciiAlpha(c) || c >= 48 && c <= 57;
};
const isValidLabel = (input, start, end) => {
  const len = end - start;
  if (len === 0 || len > 63) {
    return false;
  }
  const first = input.charCodeAt(start);
  if (!/* @__PURE__ */ isAsciiAlphaNum(first)) {
    return false;
  }
  if (len > 1) {
    if (!/* @__PURE__ */ isAsciiAlphaNum(input.charCodeAt(end - 1))) {
      return false;
    }
    for (let j = start + 1; j < end - 1; j++) {
      const c = input.charCodeAt(j);
      if (!/* @__PURE__ */ isAsciiAlphaNum(c) && c !== 45) {
        return false;
      }
    }
  }
  return true;
};
const isHandle = /* @__NO_SIDE_EFFECTS__ */ (input) => {
  if (typeof input !== "string") {
    return false;
  }
  const len = input.length;
  if (len < 3 || len > 253) {
    return false;
  }
  let labelStart = 0;
  let labelCount = 0;
  let lastLabelStart = 0;
  for (let i = 0; i <= len; i++) {
    if (i === len || input.charCodeAt(i) === 46) {
      if (!isValidLabel(input, labelStart, i)) {
        return false;
      }
      lastLabelStart = labelStart;
      labelStart = i + 1;
      labelCount++;
    }
  }
  if (labelCount < 2) {
    return false;
  }
  return /* @__PURE__ */ isAsciiAlpha(input.charCodeAt(lastLabelStart));
};
const FRAGMENT_RE = /^#[^#]+$/;
const MULTIBASE_RE = /^z[a-km-zA-HJ-NP-Z1-9]+$/;
const rfc3968UriSchema = /* @__PURE__ */ pipe$1(/* @__PURE__ */ string(), /* @__PURE__ */ check((input) => URL.canParse(input), `must be a url`));
const didRelativeUri = /* @__PURE__ */ pipe$1(/* @__PURE__ */ string(), /* @__PURE__ */ check((input) => FRAGMENT_RE.test(input) || URL.canParse(input), `must be a did relative uri`));
const multibaseString = /* @__PURE__ */ pipe$1(/* @__PURE__ */ string(), /* @__PURE__ */ regex(MULTIBASE_RE, `must be a base58 multibase`));
const didString = /* @__PURE__ */ custom(isDid, `must be a did`);
const verificationMethod = /* @__PURE__ */ pipe$1(/* @__PURE__ */ looseObject({
  id: didRelativeUri,
  type: /* @__PURE__ */ string(),
  controller: didString,
  publicKeyMultibase: /* @__PURE__ */ optional(multibaseString),
  publicKeyJwk: /* @__PURE__ */ optional(/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ unknown()))
}), /* @__PURE__ */ forward(/* @__PURE__ */ check((input) => {
  switch (input.type) {
    case "Multikey":
    case "EcdsaSecp256k1VerificationKey2019":
    case "EcdsaSecp256r1VerificationKey2019":
      return input.publicKeyMultibase !== void 0;
  }
  return true;
}, `missing public key multibase`), ["publicKeyMultibase"]));
const service = /* @__PURE__ */ looseObject({
  // should've only been RFC3968, but did:plc uses relative URIs.
  id: didRelativeUri,
  type: /* @__PURE__ */ union([/* @__PURE__ */ string(), /* @__PURE__ */ array(/* @__PURE__ */ string())]),
  serviceEndpoint: /* @__PURE__ */ union([
    rfc3968UriSchema,
    /* @__PURE__ */ record(/* @__PURE__ */ string(), rfc3968UriSchema),
    /* @__PURE__ */ array(/* @__PURE__ */ union([rfc3968UriSchema, /* @__PURE__ */ record(/* @__PURE__ */ string(), rfc3968UriSchema)]))
  ])
});
const hasDuplicates = (arr, key = (x) => x) => {
  const seen = /* @__PURE__ */ new Set();
  for (const item of arr) {
    const k = key(item);
    if (seen.has(k)) {
      return true;
    }
    seen.add(k);
  }
  return false;
};
const didDocument = /* @__PURE__ */ pipe$1(/* @__PURE__ */ looseObject({
  "@context": /* @__PURE__ */ optional(/* @__PURE__ */ array(rfc3968UriSchema)),
  id: didString,
  alsoKnownAs: /* @__PURE__ */ optional(/* @__PURE__ */ pipe$1(/* @__PURE__ */ array(rfc3968UriSchema), /* @__PURE__ */ check((input) => !hasDuplicates(input), `duplicate aka entries`))),
  verificationMethod: /* @__PURE__ */ optional(/* @__PURE__ */ pipe$1(/* @__PURE__ */ array(verificationMethod), /* @__PURE__ */ check((input) => !hasDuplicates(input, (m) => m.id), `duplicate verification method ids`))),
  service: /* @__PURE__ */ optional(/* @__PURE__ */ array(service)),
  controller: /* @__PURE__ */ optional(/* @__PURE__ */ union([didString, /* @__PURE__ */ array(didString)])),
  authentication: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ union([didRelativeUri, verificationMethod])))
}), /* @__PURE__ */ check((input) => {
  const services = input.service;
  if (!services?.length) {
    return true;
  }
  const did = input.id;
  const identifiers = services.map((s) => s.id[0] === "#" ? did + s.id : s.id);
  return !hasDuplicates(identifiers);
}, `duplicate service ids`));
const isUrlParseSupported = "parse" in URL;
const isAtprotoServiceEndpoint = (input) => {
  let url = null;
  if (isUrlParseSupported) {
    url = URL.parse(input);
  } else {
    try {
      url = new URL(input);
    } catch {
    }
  }
  return url !== null && (url.protocol === "https:" || url.protocol === "http:") && url.pathname === "/" && url.search === "" && url.hash === "";
};
const getAtprotoHandle = (doc) => {
  const alsoKnownAs = doc.alsoKnownAs;
  if (!alsoKnownAs) {
    return null;
  }
  const PREFIX = "at://";
  for (let idx = 0, len = alsoKnownAs.length; idx < len; idx++) {
    const aka = alsoKnownAs[idx];
    if (!aka.startsWith(PREFIX)) {
      continue;
    }
    const raw = aka.slice(PREFIX.length);
    if (!/* @__PURE__ */ isHandle(raw)) {
      return void 0;
    }
    return raw;
  }
  return null;
};
const getAtprotoServiceEndpoint = (doc, predicate) => {
  const services = doc.service;
  if (!services) {
    return;
  }
  for (let idx = 0, len = services.length; idx < len; idx++) {
    const { id, type, serviceEndpoint } = services[idx];
    if (id !== predicate.id && id !== doc.id + predicate.id) {
      continue;
    }
    if (predicate.type !== void 0) {
      if (Array.isArray(type)) {
        if (!type.includes(predicate.type)) {
          continue;
        }
      } else {
        if (type !== predicate.type) {
          continue;
        }
      }
    }
    if (typeof serviceEndpoint !== "string" || !isAtprotoServiceEndpoint(serviceEndpoint)) {
      continue;
    }
    return serviceEndpoint;
  }
};
const getPdsEndpoint = (doc) => {
  return getAtprotoServiceEndpoint(doc, {
    id: "#atproto_pds",
    type: "AtprotoPersonalDataServer"
  });
};
const PLC_DID_RE = /^did:plc:([a-z2-7]{24})$/;
const isPlcDid = (input) => {
  return typeof input === "string" && input.length === 32 && PLC_DID_RE.test(input);
};
const ATPROTO_WEB_DID_RE = /^did:web:([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(?:\.[a-zA-Z]{2,})|localhost(?:%3[aA]\d+)?)$/;
const isAtprotoWebDid = (input) => {
  return typeof input === "string" && input.length >= 12 && ATPROTO_WEB_DID_RE.test(input);
};
const webDidToDocumentUrl = (did) => {
  const [host, ...paths] = did.slice(8).split(":").map(decodeURIComponent);
  let pathname = "/" + paths.join("/");
  if (pathname === "/") {
    pathname = `/.well-known/did.json`;
  } else {
    pathname += `/did.json`;
  }
  const url = new URL(`https://${host}${pathname}`);
  if (url.hostname === "localhost") {
    url.protocol = "http:";
  }
  return url;
};
const isAtprotoDid = (input) => {
  return isPlcDid(input) || isAtprotoWebDid(input);
};
const extractDidMethod = (did) => {
  const isep = did.indexOf(":", 4);
  const method = did.slice(4, isep);
  return method;
};
const atprotoOAuthTokenResponseSchema = /* @__PURE__ */ looseObject({
  access_token: /* @__PURE__ */ string(),
  token_type: /* @__PURE__ */ literal("DPoP"),
  sub: /* @__PURE__ */ custom(isAtprotoDid, `must be a did:plc or did:web`),
  scope: atprotoOAuthScopeSchema,
  refresh_token: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
  expires_in: /* @__PURE__ */ optional(/* @__PURE__ */ number()),
  // https://datatracker.ietf.org/doc/html/rfc9396#name-enriched-authorization-deta
  authorization_details: /* @__PURE__ */ optional(oauthAuthorizationDetailsSchema)
  // OpenID is not compatible with atproto identities
});
const isPositiveInteger = (n) => Number.isInteger(n) && n > 0;
const oauthParResponseSchema = /* @__PURE__ */ looseObject({
  request_uri: /* @__PURE__ */ string(),
  expires_in: /* @__PURE__ */ pipe$1(/* @__PURE__ */ number(), /* @__PURE__ */ check(isPositiveInteger, `must be a positive integer`))
});
const oauthCodeChallengeMethodSchema = /* @__PURE__ */ picklist(["S256", "plain"]);
const oauthPromptSchema = /* @__PURE__ */ picklist(["none", "login", "consent", "select_account", "create"]);
const oauthIssuerIdentifierSchema = /* @__PURE__ */ pipe$1(
  webUriSchema,
  // validate the issuer (MIX-UP attacks)
  /* @__PURE__ */ rawCheck(({ dataset, addIssue }) => {
    if (!dataset.typed) {
      return;
    }
    const input = dataset.value;
    if (input.endsWith("/")) {
      addIssue({ message: `issuer URL must not end with a slash` });
      return;
    }
    const url = new URL(input);
    if (url.username || url.password) {
      addIssue({ message: `issuer URL must not contain a username or password` });
      return;
    }
    if (url.hash || url.search) {
      addIssue({ message: `issuer URL must not contain a query or fragment` });
      return;
    }
    const canonicalValue = url.pathname === "/" ? url.origin : url.href;
    if (input !== canonicalValue) {
      addIssue({ message: `issuer URL must be in the canonical form` });
    }
  })
);
const oauthAuthorizationServerMetadataSchema = /* @__PURE__ */ looseObject({
  issuer: oauthIssuerIdentifierSchema,
  claims_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  claims_locales_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  claims_parameter_supported: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
  request_parameter_supported: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
  request_uri_parameter_supported: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
  require_request_uri_registration: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
  scopes_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  subject_types_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  response_types_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  response_modes_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  grant_types_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  code_challenge_methods_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(oauthCodeChallengeMethodSchema)),
  ui_locales_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  id_token_signing_alg_values_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  display_values_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  prompt_values_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(oauthPromptSchema)),
  request_object_signing_alg_values_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  authorization_response_iss_parameter_supported: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
  authorization_details_types_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  request_object_encryption_alg_values_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  request_object_encryption_enc_values_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  jwks_uri: /* @__PURE__ */ optional(webUriSchema),
  authorization_endpoint: webUriSchema,
  token_endpoint: webUriSchema,
  // https://www.rfc-editor.org/rfc/rfc8414.html#section-2
  token_endpoint_auth_methods_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  token_endpoint_auth_signing_alg_values_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  revocation_endpoint: /* @__PURE__ */ optional(webUriSchema),
  revocation_endpoint_auth_methods_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  revocation_endpoint_auth_signing_alg_values_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  introspection_endpoint: /* @__PURE__ */ optional(webUriSchema),
  introspection_endpoint_auth_methods_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  introspection_endpoint_auth_signing_alg_values_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  pushed_authorization_request_endpoint: /* @__PURE__ */ optional(webUriSchema),
  pushed_authorization_request_endpoint_auth_methods_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  pushed_authorization_request_endpoint_auth_signing_alg_values_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  require_pushed_authorization_requests: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
  userinfo_endpoint: /* @__PURE__ */ optional(webUriSchema),
  end_session_endpoint: /* @__PURE__ */ optional(webUriSchema),
  registration_endpoint: /* @__PURE__ */ optional(webUriSchema),
  // https://datatracker.ietf.org/doc/html/rfc9449#section-5.1
  dpop_signing_alg_values_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  // https://www.rfc-editor.org/rfc/rfc9728.html#section-4
  protected_resources: /* @__PURE__ */ optional(/* @__PURE__ */ array(webUriSchema)),
  // https://www.ietf.org/archive/id/draft-ietf-oauth-client-id-metadata-document-00.html
  client_id_metadata_document_supported: /* @__PURE__ */ optional(/* @__PURE__ */ boolean())
});
const oauthAuthorizationServerMetadataValidator = /* @__PURE__ */ pipe$1(oauthAuthorizationServerMetadataSchema, /* @__PURE__ */ forward(/* @__PURE__ */ check((data) => !data.require_pushed_authorization_requests || !!data.pushed_authorization_request_endpoint, `"pushed_authorization_request_endpoint" required when "require_pushed_authorization_requests" is true`), ["pushed_authorization_request_endpoint"]), /* @__PURE__ */ forward(/* @__PURE__ */ check((data) => !data.response_types_supported || data.response_types_supported.includes("code"), `response type "code" is required`), ["response_types_supported"]), /* @__PURE__ */ forward(/* @__PURE__ */ check(
  (data) => !data.token_endpoint_auth_signing_alg_values_supported?.includes("none"),
  // https://openid.net/specs/openid-connect-discovery-1_0.html#rfc.section.3
  // > The value `none` MUST NOT be used.
  `client authentication method "none" is not allowed`
), ["token_endpoint_auth_signing_alg_values_supported"]));
const atprotoAuthorizationServerMetadataValidator = /* @__PURE__ */ pipe$1(oauthAuthorizationServerMetadataValidator, /* @__PURE__ */ forward(/* @__PURE__ */ check((data) => data.client_id_metadata_document_supported === true, `atproto requires client_id_metadata_document_supported to be true`), ["client_id_metadata_document_supported"]), /* @__PURE__ */ forward(/* @__PURE__ */ check((data) => !!data.pushed_authorization_request_endpoint, `atproto requires pushed_authorization_request_endpoint to be true`), ["pushed_authorization_request_endpoint"]), /* @__PURE__ */ transform((data) => data));
const oauthBearerMethodSchema = /* @__PURE__ */ picklist(["header", "body", "query"]);
const oauthProtectedResourceMetadataSchema = /* @__PURE__ */ looseObject({
  /**
   * REQUIRED. the protected resource's resource identifier, which is a URL that
   * uses the https scheme and has no query or fragment components.
   */
  resource: webUriSchema,
  /**
   * OPTIONAL. JSON array containing a list of OAuth authorization server issuer
   * identifiers, as defined in RFC8414, for authorization servers that can be
   * used with this protected resource.
   */
  authorization_servers: /* @__PURE__ */ optional(/* @__PURE__ */ array(oauthIssuerIdentifierSchema)),
  /**
   * OPTIONAL. URL of the protected resource's JWK Set document.
   */
  jwks_uri: /* @__PURE__ */ optional(webUriSchema),
  /**
   * RECOMMENDED. JSON array containing a list of the OAuth 2.0 scope values that
   * are used in authorization requests to request access to this protected resource.
   */
  scopes_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  /**
   * OPTIONAL. JSON array containing a list of the supported methods of sending
   * an OAuth 2.0 Bearer Token to the protected resource.
   */
  bearer_methods_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(oauthBearerMethodSchema)),
  /**
   * OPTIONAL. JSON array containing a list of the JWS signing algorithms
   * supported by the protected resource for signing resource responses.
   */
  resource_signing_alg_values_supported: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())),
  /**
   * OPTIONAL. URL of a page containing human-readable information that
   * developers might want or need to know when using the protected resource.
   */
  resource_documentation: /* @__PURE__ */ optional(webUriSchema),
  /**
   * OPTIONAL. URL that the protected resource provides to read about the
   * protected resource's requirements on how the client can use the data.
   */
  resource_policy_uri: /* @__PURE__ */ optional(webUriSchema),
  /**
   * OPTIONAL. URL that the protected resource provides to read about the
   * protected resource's terms of service.
   */
  resource_tos_uri: /* @__PURE__ */ optional(webUriSchema)
});
const oauthProtectedResourceMetadataValidator = /* @__PURE__ */ pipe$1(oauthProtectedResourceMetadataSchema, /* @__PURE__ */ forward(/* @__PURE__ */ check((data) => {
  const url = new URL(data.resource);
  return !url.search && !url.hash;
}, `resource URL must not contain query parameters or a fragment`), ["resource"]));
const atprotoProtectedResourceMetadataValidator = /* @__PURE__ */ pipe$1(oauthProtectedResourceMetadataValidator, /* @__PURE__ */ forward(/* @__PURE__ */ check((data) => data.authorization_servers?.length === 1, `atproto requires exactly one authorization server`), ["authorization_servers"]), /* @__PURE__ */ transform((data) => data));
class AuthMethodUnsatisfiableError extends Error {
  name = "AuthMethodUnsatisfiableError";
}
class TokenInvalidError extends Error {
  name = "TokenInvalidError";
  sub;
  constructor(sub, message = `session for "${sub}" is invalid`, options) {
    super(message, options);
    this.sub = sub;
  }
}
class TokenRefreshError extends Error {
  name = "TokenRefreshError";
  sub;
  constructor(sub, message, options) {
    super(message, options);
    this.sub = sub;
  }
}
class TokenRevokedError extends Error {
  name = "TokenRevokedError";
  sub;
  constructor(sub, message = `session for "${sub}" was revoked`, options) {
    super(message, options);
    this.sub = sub;
  }
}
class OAuthResponseError extends Error {
  name = "OAuthResponseError";
  response;
  error;
  errorDescription;
  constructor(response2, error, errorDescription) {
    super(errorDescription ?? error);
    this.response = response2;
    this.error = error;
    this.errorDescription = errorDescription;
  }
  get status() {
    return this.response.status;
  }
}
class OAuthCallbackError extends Error {
  name = "OAuthCallbackError";
  error;
  errorDescription;
  state;
  constructor(error, errorDescription, state) {
    super(errorDescription ?? error);
    this.error = error;
    this.errorDescription = errorDescription;
    this.state = state;
  }
}
class OAuthResolverError extends Error {
  name = "OAuthResolverError";
}
function pipe(...pipeline) {
  return pipeline.reduce(pipeTwo);
}
const pipeTwo = (first, second) => {
  return (input) => first(input).then(second);
};
class FetchResponseError extends Error {
  name = "FetchResponseError";
}
class FailedResponseError extends FetchResponseError {
  name = "FailedResponseError";
  response;
  constructor(response2) {
    super(`got http ${response2.status}`);
    this.response = response2;
  }
  get status() {
    return this.response.status;
  }
}
class ImproperContentTypeError extends FetchResponseError {
  name = "ImproperContentTypeError";
  contentType;
  constructor(contentType, reason) {
    super(reason);
    this.contentType = contentType;
  }
}
class ImproperContentLengthError extends FetchResponseError {
  name = "ImproperContentLengthError";
  expectedSize;
  actualSize;
  constructor(expectedSize, actualSize, reason) {
    super(reason);
    this.expectedSize = expectedSize;
    this.actualSize = actualSize;
  }
}
class ImproperResponseError extends FetchResponseError {
  name = "ImproperResponseError";
}
class SizeLimitStream extends TransformStream {
  constructor(maxSize) {
    let bytesRead = 0;
    super({
      transform(chunk, controller) {
        bytesRead += chunk.length;
        if (bytesRead > maxSize) {
          controller.error(new ImproperContentLengthError(maxSize, bytesRead, `response content-length too large`));
          return;
        }
        controller.enqueue(chunk);
      }
    });
  }
}
const isResponseOk = async (response2) => {
  if (response2.ok) {
    return response2;
  }
  throw new FailedResponseError(response2);
};
const parseResponseAsJson = (typeRegex, maxSize) => async (response2) => {
  await assertContentType(response2, typeRegex);
  const text = await readResponse(response2, maxSize);
  try {
    const json = JSON.parse(text);
    return { response: response2, json };
  } catch (error) {
    throw new ImproperResponseError(`unexpected json data`, { cause: error });
  }
};
const validateJsonWith = (schema) => async (parsed) => {
  const json = parse(schema, parsed.json);
  return { response: parsed.response, json };
};
const assertContentType = async (response2, typeRegex) => {
  const type = response2.headers.get("content-type")?.split(";", 1)[0].trim();
  if (type === void 0) {
    if (response2.body) {
      await response2.body.cancel();
    }
    throw new ImproperContentTypeError(null, `missing response content-type`);
  }
  if (!typeRegex.test(type)) {
    if (response2.body) {
      await response2.body.cancel();
    }
    throw new ImproperContentTypeError(type, `unexpected response content-type`);
  }
};
const readResponse = async (response2, maxSize) => {
  const rawSize = response2.headers.get("content-length");
  if (rawSize !== null) {
    const size = Number(rawSize);
    if (!Number.isSafeInteger(size) || size <= 0) {
      response2.body?.cancel();
      throw new ImproperContentLengthError(maxSize, null, `invalid response content-length`);
    }
    if (size > maxSize) {
      response2.body?.cancel();
      throw new ImproperContentLengthError(maxSize, size, `response content-length too large`);
    }
  }
  const stream = response2.body.pipeThrough(new SizeLimitStream(maxSize)).pipeThrough(new TextDecoderStream());
  let text = "";
  for await (const chunk of createStreamIterator(stream)) {
    text += chunk;
  }
  return text;
};
const createStreamIterator = Symbol.asyncIterator in ReadableStream.prototype ? (stream) => stream[Symbol.asyncIterator]() : (stream) => {
  const reader = stream.getReader();
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return reader.read();
    },
    async return() {
      await reader.cancel();
      return { done: true, value: void 0 };
    },
    async throw(error) {
      await reader.cancel(error);
      return { done: true, value: void 0 };
    }
  };
};
const JSON_MIME = /^application\/json(;|$)/;
const AS_METADATA_MAX_SIZE = 8 * 1024;
const PR_METADATA_MAX_SIZE = 1024;
const TOKEN_RESPONSE_MAX_SIZE = 8 * 1024;
const PAR_RESPONSE_MAX_SIZE = 1024;
const negotiateClientAuth = (serverMetadata, keyset) => {
  const supportedMethods = serverMetadata.token_endpoint_auth_methods_supported;
  if (keyset === void 0) {
    if (supportedMethods && !supportedMethods.includes("none")) {
      throw new Error(`server does not support "none" authentication for public clients. supported methods: ${supportedMethods.join(", ")}`);
    }
    return { method: "none" };
  }
  if (supportedMethods && !supportedMethods.includes("private_key_jwt")) {
    throw new Error(`server does not support "private_key_jwt" authentication. supported methods: ${supportedMethods.join(", ")}`);
  }
  const supportedAlgs = serverMetadata.token_endpoint_auth_signing_alg_values_supported ?? [FALLBACK_ALG];
  const key = keyset.find({ alg: supportedAlgs });
  if (!key) {
    throw new Error(`no key found compatible with server's signing algorithms: ${supportedAlgs.join(", ")}`);
  }
  return { method: "private_key_jwt", kid: key.kid };
};
const createClientAssertionFactory = (options) => {
  const { authMethod, serverMetadata, clientId, keyset } = options;
  if (authMethod.method === "none") {
    return async () => void 0;
  }
  if (keyset === void 0) {
    throw new Error("keyset is required for confidential clients");
  }
  const supportedAlgs = serverMetadata.token_endpoint_auth_signing_alg_values_supported ?? [FALLBACK_ALG];
  const key = keyset.find({ kid: authMethod.kid, alg: supportedAlgs });
  if (!key) {
    throw new Error(`key "${authMethod.kid}" no longer available or compatible`);
  }
  return () => createClientCredentials(key, clientId, serverMetadata.issuer);
};
const createClientCredentials = async (key, clientId, audience) => {
  const assertion = await createClientAssertion({
    client_id: clientId,
    aud: audience,
    key
  });
  return {
    client_id: clientId,
    client_assertion_type: CLIENT_ASSERTION_TYPE_JWT_BEARER,
    client_assertion: assertion
  };
};
const returnTrue = () => true;
const returnFalse = () => false;
class CachedGetter {
  #pending = /* @__PURE__ */ new Map();
  getter;
  store;
  options;
  constructor(getter, store, options = {}) {
    this.getter = getter;
    this.store = store;
    this.options = options;
  }
  async get(key, options = {}) {
    const { signal, allowStale = false, noCache = false } = options;
    const { isStale, deleteOnError } = this.options;
    signal?.throwIfAborted();
    const allowStored = noCache ? returnFalse : allowStale || isStale == null ? returnTrue : async (value2) => !await isStale(key, value2);
    let promise;
    while ((promise = this.#pending.get(key)) !== void 0) {
      try {
        const { value: value2, fresh } = await promise;
        if (fresh) {
          return value2;
        }
        if (await allowStored(value2)) {
          return value2;
        }
      } catch {
      }
      signal?.throwIfAborted();
    }
    promise = (async () => {
      try {
        const storedValue = await this.getStored(key, { signal });
        if (storedValue !== void 0 && await allowStored(storedValue)) {
          return { fresh: false, value: storedValue };
        }
        let value2;
        try {
          const options2 = { signal, noCache };
          value2 = await (0, this.getter)(key, options2, storedValue);
        } catch (err) {
          if (storedValue !== void 0 && deleteOnError !== void 0) {
            try {
              if (await deleteOnError(err, key, storedValue)) {
                await this.deleteStored(key, err);
              }
            } catch (error) {
              throw new AggregateError([err, error], `error while deleting stored value`);
            }
          }
          throw err;
        }
        await this.setStored(key, value2);
        return { fresh: true, value: value2 };
      } finally {
        this.#pending.delete(key);
      }
    })();
    this.#pending.set(key, promise);
    const { value } = await promise;
    return value;
  }
  async getStored(key, options) {
    try {
      return await this.store.get(key, options);
    } catch {
      return void 0;
    }
  }
  async setStored(key, value) {
    try {
      await this.store.set(key, value);
    } catch (err) {
      const onStoreError = this.options?.onStoreError;
      await onStoreError?.(err, key, value);
    }
  }
  async deleteStored(key, _cause) {
    await this.store.delete(key);
  }
}
const processResponse$1 = pipe(parseResponseAsJson(JSON_MIME, AS_METADATA_MAX_SIZE), validateJsonWith(atprotoAuthorizationServerMetadataValidator));
class AuthorizationServerMetadataResolver extends CachedGetter {
  allowHttp;
  fetch;
  constructor(options) {
    super((issuer, opts) => this.fetchMetadata(issuer, opts), options.cache);
    this.allowHttp = options.allowHttp ?? false;
    this.fetch = options.fetch ?? globalThis.fetch;
  }
  /**
   * resolves metadata for an authorization server.
   *
   * @param issuer authorization server issuer URL
   * @param options fetch options
   * @returns validated authorization server metadata
   */
  async resolve(input, options) {
    const issuer = parse(oauthIssuerIdentifierSchema, input);
    if (issuer.startsWith("http:") && !this.allowHttp) {
      throw new OAuthResolverError(`http issuer not allowed (set allowHttp for development)`);
    }
    return this.get(issuer, options);
  }
  async fetchMetadata(issuer, options) {
    const metadataUrl = new URL("/.well-known/oauth-authorization-server", issuer);
    const response2 = await (0, this.fetch)(metadataUrl, {
      headers: { accept: "application/json" },
      signal: options.signal,
      redirect: "manual"
    });
    if (response2.status !== 200) {
      throw new OAuthResolverError(`unexpected status ${response2.status} from ${metadataUrl}`);
    }
    const { json: metadata } = await processResponse$1(response2);
    if (metadata.issuer !== issuer) {
      throw new OAuthResolverError(`issuer mismatch: expected ${issuer}, got ${metadata.issuer}`);
    }
    return metadata;
  }
}
const processResponse = pipe(parseResponseAsJson(JSON_MIME, PR_METADATA_MAX_SIZE), validateJsonWith(atprotoProtectedResourceMetadataValidator));
class ProtectedResourceMetadataResolver extends CachedGetter {
  allowHttp;
  fetch;
  constructor(options) {
    super((origin, opts) => this.fetchMetadata(origin, opts), options.cache);
    this.allowHttp = options.allowHttp ?? false;
    this.fetch = options.fetch ?? globalThis.fetch;
  }
  /**
   * resolves metadata for a protected resource (PDS).
   *
   * @param resource protected resource URL or origin
   * @param options fetch options
   * @returns validated protected resource metadata
   */
  async resolve(resource, options) {
    const url = new URL(resource);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new OAuthResolverError(`invalid resource protocol: ${url.protocol}`);
    }
    if (url.protocol === "http:" && !this.allowHttp) {
      throw new OAuthResolverError(`http resource not allowed (set allowHttp for development)`);
    }
    return this.get(url.origin, options);
  }
  async fetchMetadata(origin, options) {
    const metadataUrl = new URL("/.well-known/oauth-protected-resource", origin);
    const response2 = await (0, this.fetch)(metadataUrl, {
      headers: { accept: "application/json" },
      signal: options.signal,
      redirect: "manual"
    });
    if (response2.status !== 200) {
      throw new OAuthResolverError(`unexpected status ${response2.status} from ${metadataUrl}`);
    }
    const { json: metadata } = await processResponse(response2);
    if (metadata.resource !== origin) {
      throw new OAuthResolverError(`resource mismatch: expected ${origin}, got ${metadata.resource}`);
    }
    return metadata;
  }
}
class OAuthResolver {
  actorResolver;
  protectedResourceResolver;
  authorizationServerResolver;
  constructor(actorResolver, protectedResourceResolver, authorizationServerResolver) {
    this.actorResolver = actorResolver;
    this.protectedResourceResolver = protectedResourceResolver;
    this.authorizationServerResolver = authorizationServerResolver;
  }
  /**
   * resolves OAuth metadata from a service URL (PDS or entryway).
   *
   * tries as PDS first (protected resource), falls back to entryway (AS directly).
   *
   * @param url PDS or entryway URL
   * @param options resolution options
   * @returns AS metadata
   */
  async resolveFromService(url, options) {
    try {
      const metadata = await this.getResourceServerMetadata(url, options);
      return { metadata };
    } catch (err) {
      if (options?.signal?.aborted) {
        throw err;
      }
      if (err instanceof OAuthResolverError) {
        try {
          const metadata = await this.authorizationServerResolver.resolve(url, options);
          return { metadata };
        } catch {
        }
      }
      throw err;
    }
  }
  /**
   * resolves OAuth metadata from an identity (handle or DID).
   *
   * @param input handle or DID
   * @param options resolution options
   * @returns resolved actor and AS metadata
   */
  async resolveFromIdentity(input, options) {
    let identity;
    try {
      identity = await this.actorResolver.resolve(input, options);
    } catch (cause) {
      throw new OAuthResolverError(`failed to resolve identity: ${input}`, { cause });
    }
    options?.signal?.throwIfAborted();
    const metadata = await this.getResourceServerMetadata(identity.pds, options);
    return { identity, metadata };
  }
  /**
   * resolves AS metadata via a protected resource (PDS).
   *
   * @param pdsUrl PDS URL
   * @param options resolution options
   * @returns AS metadata
   */
  async getResourceServerMetadata(pdsUrl, options) {
    let rsMetadata;
    try {
      rsMetadata = await this.protectedResourceResolver.resolve(pdsUrl, options);
    } catch (cause) {
      throw new OAuthResolverError(`failed to resolve protected resource metadata: ${pdsUrl}`, { cause });
    }
    const issuer = rsMetadata.authorization_servers[0];
    options?.signal?.throwIfAborted();
    let asMetadata;
    try {
      asMetadata = await this.authorizationServerResolver.resolve(issuer, options);
    } catch (cause) {
      throw new OAuthResolverError(`failed to resolve AS metadata for issuer: ${issuer}`, { cause });
    }
    if (asMetadata.protected_resources) {
      if (!asMetadata.protected_resources.includes(rsMetadata.resource)) {
        throw new OAuthResolverError(`PDS "${pdsUrl}" not listed in AS "${issuer}" protected_resources`);
      }
    }
    return asMetadata;
  }
}
const processTokenResponse = pipe(parseResponseAsJson(JSON_MIME, TOKEN_RESPONSE_MAX_SIZE), validateJsonWith(atprotoOAuthTokenResponseSchema));
const processParResponse = pipe(parseResponseAsJson(JSON_MIME, PAR_RESPONSE_MAX_SIZE), validateJsonWith(oauthParResponseSchema));
class OAuthServerAgent {
  authMethod;
  dpopKey;
  serverMetadata;
  clientMetadata;
  oauthResolver;
  keyset;
  dpopNonces;
  dpopFetch;
  clientCredentialsFactory;
  constructor(options) {
    this.authMethod = options.authMethod;
    this.dpopKey = options.dpopKey;
    this.serverMetadata = options.serverMetadata;
    this.clientMetadata = options.clientMetadata;
    this.oauthResolver = options.oauthResolver;
    this.keyset = options.keyset;
    this.dpopNonces = options.dpopNonces;
    this.clientCredentialsFactory = createClientAssertionFactory({
      authMethod: options.authMethod,
      serverMetadata: options.serverMetadata,
      clientId: options.clientMetadata.client_id,
      keyset: options.keyset
    });
    this.dpopFetch = createDpopFetch({
      key: options.dpopKey,
      nonces: options.dpopNonces,
      supportedAlgs: options.serverMetadata.dpop_signing_alg_values_supported,
      isAuthServer: true,
      fetch: options.fetch
    });
  }
  get issuer() {
    return this.serverMetadata.issuer;
  }
  /**
   * revokes a token (access or refresh).
   *
   * @param token token to revoke
   */
  async revoke(token) {
    const endpoint = this.serverMetadata.revocation_endpoint;
    if (!endpoint) {
      return;
    }
    try {
      await this.request(endpoint, { token });
    } catch {
    }
  }
  /**
   * exchanges an authorization code for tokens.
   *
   * @param code authorization code from callback
   * @param codeVerifier PKCE code verifier
   * @param redirectUri redirect URI used in authorization request
   * @returns token set with verified subject
   */
  async exchangeCode(code, codeVerifier, redirectUri) {
    const now = Date.now();
    const tokenResponse = await this.requestToken({
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code,
      code_verifier: codeVerifier
    });
    try {
      const aud = await this.verifyIssuer(tokenResponse.sub);
      return {
        iss: this.issuer,
        sub: tokenResponse.sub,
        aud,
        scope: tokenResponse.scope,
        access_token: tokenResponse.access_token,
        refresh_token: tokenResponse.refresh_token,
        token_type: tokenResponse.token_type,
        expires_at: typeof tokenResponse.expires_in === "number" ? now + tokenResponse.expires_in * 1e3 : void 0
      };
    } catch (err) {
      await this.revoke(tokenResponse.access_token);
      throw err;
    }
  }
  /**
   * refreshes an existing token set.
   *
   * @param tokenSet current token set
   * @returns new token set
   * @throws {TokenRefreshError} if no refresh token or refresh fails
   */
  async refresh(tokenSet) {
    if (!tokenSet.refresh_token) {
      throw new TokenRefreshError(tokenSet.sub, "no refresh token available");
    }
    const aud = await this.verifyIssuer(tokenSet.sub);
    const now = Date.now();
    const tokenResponse = await this.requestToken({
      grant_type: "refresh_token",
      refresh_token: tokenSet.refresh_token
    });
    return {
      iss: this.issuer,
      sub: tokenSet.sub,
      aud,
      scope: tokenResponse.scope,
      access_token: tokenResponse.access_token,
      refresh_token: tokenResponse.refresh_token,
      token_type: tokenResponse.token_type,
      expires_at: typeof tokenResponse.expires_in === "number" ? now + tokenResponse.expires_in * 1e3 : void 0
    };
  }
  /**
   * sends a pushed authorization request (PAR).
   *
   * @param params authorization request parameters
   * @returns PAR response with request_uri
   */
  async pushAuthorizationRequest(params) {
    const endpoint = this.serverMetadata.pushed_authorization_request_endpoint;
    const { json } = await this.request(endpoint, params, processParResponse);
    return json;
  }
  /**
   * verifies that the subject's authorization server matches this one.
   *
   * this is a critical security check per atproto OAuth spec.
   *
   * @param sub user's DID
   * @returns user's PDS URL
   * @throws if issuer doesn't match
   */
  async verifyIssuer(sub) {
    const resolved = await this.oauthResolver.resolveFromIdentity(sub, {
      noCache: true,
      signal: AbortSignal.timeout(1e4)
    });
    if (this.issuer !== resolved.metadata.issuer) {
      throw new TypeError(`issuer mismatch: token issued by ${this.issuer}, but identity resolves to ${resolved.metadata.issuer}`);
    }
    return resolved.identity.pds;
  }
  /**
   * makes a token endpoint request.
   */
  async requestToken(params) {
    const endpoint = this.serverMetadata.token_endpoint;
    const { json } = await this.request(endpoint, params, processTokenResponse);
    return json;
  }
  /**
   * makes a request to an authorization server endpoint.
   */
  async request(endpoint, params, processor) {
    const credentials = await this.clientCredentialsFactory();
    const body = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== void 0) {
        body.set(key, value);
      }
    }
    body.set("client_id", this.clientMetadata.client_id);
    if (credentials) {
      body.set("client_assertion_type", credentials.client_assertion_type);
      body.set("client_assertion", credentials.client_assertion);
    }
    const response2 = await this.dpopFetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    });
    if (!response2.ok) {
      let error = "unknown_error";
      let errorDescription;
      try {
        const json = await response2.clone().json();
        if (typeof json === "object" && json !== null) {
          error = json.error ?? error;
          errorDescription = json.error_description;
        }
      } catch {
      }
      throw new OAuthResponseError(response2, error, errorDescription);
    }
    if (processor) {
      return processor(response2);
    }
    return { response: response2, json: void 0 };
  }
}
class OAuthServerFactory {
  clientMetadata;
  resolver;
  keyset;
  dpopNonces;
  fetch;
  constructor(options) {
    this.clientMetadata = options.clientMetadata;
    this.resolver = options.resolver;
    this.keyset = options.keyset;
    this.dpopNonces = options.dpopNonces;
    this.fetch = options.fetch;
  }
  /**
   * creates an OAuthServerAgent from an issuer and stored session data.
   *
   * @param issuer authorization server issuer
   * @param authMethod client authentication method from stored session
   * @param dpopKey DPoP key from stored session
   * @param options fetch options
   * @returns configured OAuthServerAgent
   */
  async fromIssuer(issuer, authMethod, dpopKey, options) {
    const serverMetadata = await this.resolver.authorizationServerResolver.resolve(issuer, options);
    return this.fromMetadata(serverMetadata, authMethod, dpopKey);
  }
  /**
   * creates an OAuthServerAgent from resolved metadata.
   *
   * @param serverMetadata authorization server metadata
   * @param authMethod client authentication method
   * @param dpopKey DPoP private key
   * @returns configured OAuthServerAgent
   */
  fromMetadata(serverMetadata, authMethod, dpopKey) {
    return new OAuthServerAgent({
      authMethod,
      dpopKey,
      serverMetadata,
      clientMetadata: this.clientMetadata,
      dpopNonces: this.dpopNonces,
      oauthResolver: this.resolver,
      keyset: this.keyset,
      fetch: this.fetch
    });
  }
  /**
   * creates an OAuthServerAgent for a new authorization flow.
   *
   * negotiates the auth method with the server.
   *
   * @param serverMetadata authorization server metadata
   * @param dpopKey DPoP private key
   * @returns configured OAuthServerAgent
   */
  fromMetadataNewSession(serverMetadata, dpopKey) {
    const authMethod = negotiateClientAuth(serverMetadata, this.keyset);
    return this.fromMetadata(serverMetadata, authMethod, dpopKey);
  }
}
class OAuthSession {
  dpopFetch;
  /** server agent for this session's AS */
  server;
  /** user's DID */
  sub;
  /** session getter for token management */
  sessionGetter;
  constructor(server, sub, sessionGetter, fetch2 = globalThis.fetch) {
    this.server = server;
    this.sub = sub;
    this.sessionGetter = sessionGetter;
    this.dpopFetch = createDpopFetch({
      key: server.dpopKey,
      nonces: server.dpopNonces,
      supportedAlgs: server.serverMetadata.dpop_signing_alg_values_supported,
      isAuthServer: false,
      fetch: fetch2
    });
  }
  /**
   * user's DID.
   */
  get did() {
    return this.sub;
  }
  /**
   * gets the current token set.
   *
   * @param refresh true to force refresh, false to allow stale, 'auto' for normal
   * @returns current token set
   */
  async getTokenSet(refresh) {
    const { tokenSet } = await this.sessionGetter.getSession(this.sub, refresh);
    return tokenSet;
  }
  /**
   * gets information about the current token.
   *
   * @param refresh true to force refresh, false to allow stale, 'auto' for normal
   * @returns token information
   */
  async getTokenInfo(refresh = "auto") {
    const tokenSet = await this.getTokenSet(refresh);
    const expiresAt = tokenSet.expires_at != null ? new Date(tokenSet.expires_at) : void 0;
    return {
      expiresAt,
      get expired() {
        return expiresAt != null ? expiresAt.getTime() < Date.now() - 5e3 : void 0;
      },
      scope: tokenSet.scope,
      iss: tokenSet.iss,
      aud: tokenSet.aud,
      sub: tokenSet.sub
    };
  }
  /**
   * signs out and revokes the session.
   */
  async signOut() {
    try {
      const tokenSet = await this.getTokenSet(false);
      await this.server.revoke(tokenSet.access_token);
    } finally {
      await this.sessionGetter.deleteStored(this.sub, new TokenRevokedError(this.sub));
    }
  }
  /**
   * makes an authenticated request to the user's PDS.
   *
   * automatically refreshes tokens if needed and retries on auth failure.
   *
   * @param pathname path relative to the PDS URL
   * @param init fetch init options
   * @returns fetch response
   */
  async handle(pathname, init) {
    const tokenSet = await this.getTokenSet("auto");
    const initialUrl = new URL(pathname, tokenSet.aud);
    const initialAuth = `${tokenSet.token_type} ${tokenSet.access_token}`;
    const headers = new Headers(init?.headers);
    headers.set("Authorization", initialAuth);
    const initialResponse = await this.dpopFetch(initialUrl, { ...init, headers });
    if (!isInvalidTokenResponse(initialResponse)) {
      return initialResponse;
    }
    let freshTokenSet;
    try {
      freshTokenSet = await this.getTokenSet(true);
    } catch {
      return initialResponse;
    }
    if (init?.body instanceof ReadableStream) {
      return initialResponse;
    }
    const freshUrl = new URL(pathname, freshTokenSet.aud);
    const freshAuth = `${freshTokenSet.token_type} ${freshTokenSet.access_token}`;
    headers.set("Authorization", freshAuth);
    const freshResponse = await this.dpopFetch(freshUrl, { ...init, headers });
    if (isInvalidTokenResponse(freshResponse)) {
      await this.sessionGetter.deleteStored(this.sub, new TokenInvalidError(this.sub));
    }
    return freshResponse;
  }
}
const isInvalidTokenResponse = (response2) => {
  if (response2.status !== 401) {
    return false;
  }
  const wwwAuth = response2.headers.get("WWW-Authenticate");
  if (wwwAuth == null) {
    return false;
  }
  return (wwwAuth.startsWith("Bearer ") || wwwAuth.startsWith("DPoP ")) && wwwAuth.includes('error="invalid_token"');
};
class SessionGetter extends CachedGetter {
  listeners = /* @__PURE__ */ new Set();
  requestLock;
  constructor(options) {
    const { sessionStore, serverFactory, requestLock } = options;
    super(
      // getter function - refreshes the token
      async (sub, opts, storedSession) => {
        if (storedSession === void 0) {
          const cause = new TokenRefreshError(sub, "session was deleted by another process");
          this.dispatchEvent({ type: "deleted", sub, cause });
          throw cause;
        }
        const { dpopKey, authMethod, tokenSet } = storedSession;
        if (sub !== tokenSet.sub) {
          throw new TokenRefreshError(sub, "stored session sub mismatch");
        }
        if (!tokenSet.refresh_token) {
          throw new TokenRefreshError(sub, "no refresh token available");
        }
        const server = await serverFactory.fromIssuer(tokenSet.iss, authMethod, dpopKey);
        opts.signal?.throwIfAborted();
        try {
          const newTokenSet = await server.refresh(tokenSet);
          if (sub !== newTokenSet.sub) {
            throw new TokenRefreshError(sub, "token set sub mismatch after refresh");
          }
          return {
            dpopKey,
            authMethod: server.authMethod,
            tokenSet: newTokenSet
          };
        } catch (cause) {
          if (cause instanceof OAuthResponseError && cause.status === 400 && cause.error === "invalid_grant") {
            const msg = cause.errorDescription ?? "session was revoked";
            throw new TokenRefreshError(sub, msg, { cause });
          }
          throw cause;
        }
      },
      sessionStore,
      {
        isStale(_sub, { tokenSet }) {
          if (tokenSet.expires_at == null) {
            return false;
          }
          const buffer = 1e4 + 3e4 * Math.random();
          return tokenSet.expires_at < Date.now() + buffer;
        },
        async onStoreError(err, _sub, { tokenSet, dpopKey, authMethod }) {
          if (!(err instanceof AuthMethodUnsatisfiableError)) {
            try {
              const server = await serverFactory.fromIssuer(tokenSet.iss, authMethod, dpopKey);
              await server.revoke(tokenSet.refresh_token ?? tokenSet.access_token);
            } catch {
            }
          }
          throw err;
        },
        deleteOnError(err) {
          return err instanceof TokenRefreshError || err instanceof TokenRevokedError || err instanceof TokenInvalidError || err instanceof AuthMethodUnsatisfiableError;
        }
      }
    );
    this.requestLock = requestLock;
  }
  /**
   * adds a listener for session events.
   */
  addEventListener(listener) {
    this.listeners.add(listener);
  }
  /**
   * removes a session event listener.
   */
  removeEventListener(listener) {
    this.listeners.delete(listener);
  }
  dispatchEvent(event) {
    for (const listener of this.listeners) {
      try {
        listener(event);
      } catch {
      }
    }
  }
  async setStored(sub, session) {
    if (sub !== session.tokenSet.sub) {
      throw new TypeError("token set does not match the expected sub");
    }
    await super.setStored(sub, session);
    this.dispatchEvent({ type: "updated", sub, session });
  }
  async deleteStored(sub, cause) {
    await super.deleteStored(sub, cause);
    this.dispatchEvent({ type: "deleted", sub, cause });
  }
  /**
   * gets a session, optionally forcing a refresh.
   *
   * @param sub user's DID
   * @param refresh true to force refresh, false to allow stale, 'auto' for normal behavior
   * @returns session data
   */
  async getSession(sub, refresh = "auto") {
    return this.get(sub, {
      noCache: refresh === true,
      allowStale: refresh === false
    });
  }
  async get(sub, options) {
    const signal = options?.signal ?? AbortSignal.timeout(3e4);
    let session;
    if (this.requestLock) {
      session = await this.requestLock(`oauth-session-${sub}`, async () => {
        return await super.get(sub, { ...options, signal });
      });
    } else {
      session = await super.get(sub, { ...options, signal });
    }
    if (sub !== session.tokenSet.sub) {
      throw new Error("token set does not match the expected sub");
    }
    return session;
  }
}
class LRUCache {
  #size;
  #count = 0;
  #map = /* @__PURE__ */ new Map();
  #head = null;
  #tail = null;
  /**
   * creates a new LRU cache with the specified capacity
   * @param size the maximum number of items the cache can hold
   */
  constructor(size) {
    this.#size = size;
  }
  /** the maximum capacity of the cache */
  get size() {
    return this.#size;
  }
  /**
   * gets a value without affecting its position in the cache
   * @param key the key to look up
   * @returns the value associated with the key, or undefined if not found
   */
  peek(key) {
    const node = this.#map.get(key);
    if (node === void 0) {
      return void 0;
    }
    return node.value;
  }
  /**
   * gets a value and marks it as most recently used
   * @param key the key to look up
   * @returns the value associated with the key, or undefined if not found
   */
  get(key) {
    const node = this.#map.get(key);
    if (node === void 0) {
      return void 0;
    }
    this.#moveToFront(node);
    return node.value;
  }
  /**
   * stores a value for the given key, marking it as most recently used
   * evicts the least recently used item if the cache is at capacity
   * @param key the key to store
   * @param value the value to associate with the key
   */
  set(key, value) {
    {
      const existing = this.#map.get(key);
      if (existing !== void 0) {
        existing.value = value;
        this.#moveToFront(existing);
        return;
      }
    }
    {
      const node = { key, value, prev: null, next: null };
      this.#map.set(key, node);
      this.#addToFront(node);
      this.#count++;
    }
    this.#evict();
  }
  /**
   * removes a key from the cache
   * @param key the key to remove
   * @returns true if the key was found and removed, false otherwise
   */
  delete(key) {
    const node = this.#map.get(key);
    if (node === void 0) {
      return false;
    }
    this.#map.delete(key);
    this.#removeNode(node);
    this.#count--;
    return true;
  }
  /**
   * removes all items from the cache
   */
  clear() {
    this.#map.clear();
    this.#head = null;
    this.#tail = null;
    this.#count = 0;
  }
  /**
   * checks if a key exists in the cache
   * @param key the key to check
   * @returns true if the key exists, false otherwise
   */
  has(key) {
    return this.#map.has(key);
  }
  /**
   * iterates over the keys in LRU order (most to least recently used)
   * @returns iterator of keys
   */
  *keys() {
    let current = this.#head;
    while (current !== null) {
      yield current.key;
      current = current.next;
    }
  }
  /**
   * iterates over the values in LRU order (most to least recently used)
   * @returns iterator of values
   */
  *values() {
    let current = this.#head;
    while (current !== null) {
      yield current.value;
      current = current.next;
    }
  }
  /**
   * iterates over the key-value pairs in LRU order (most to least recently used)
   * @returns iterator of [key, value] tuples
   */
  *entries() {
    let current = this.#head;
    while (current !== null) {
      yield [current.key, current.value];
      current = current.next;
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  #moveToFront(node) {
    if (this.#head === node) {
      return;
    }
    if (node.prev !== null) {
      node.prev.next = node.next;
    }
    if (node.next !== null) {
      node.next.prev = node.prev;
    } else {
      this.#tail = node.prev;
    }
    node.prev = null;
    node.next = this.#head;
    this.#head.prev = node;
    this.#head = node;
  }
  #addToFront(node) {
    node.next = this.#head;
    node.prev = null;
    if (this.#head !== null) {
      this.#head.prev = node;
    } else {
      this.#tail = node;
    }
    this.#head = node;
  }
  #removeNode(node) {
    if (node.prev !== null) {
      node.prev.next = node.next;
    } else {
      this.#head = node.next;
    }
    if (node.next !== null) {
      node.next.prev = node.prev;
    } else {
      this.#tail = node.prev;
    }
  }
  #evict() {
    const excess = this.#count - this.#size;
    if (excess <= 0) {
      return;
    }
    let current = this.#tail;
    for (let i = 0; i < excess; i++) {
      this.#map.delete(current.key);
      current = current.prev;
    }
    current.next = null;
    this.#tail = current;
    this.#count -= excess;
  }
}
class MemoryStore {
  #map;
  #ttlMs;
  #ttlAutopurge;
  #ttlTimer;
  /**
   * creates a new in-memory store.
   *
   * @param options store configuration
   */
  constructor(options = {}) {
    this.#map = options.maxSize !== void 0 ? new LRUCache(options.maxSize) : /* @__PURE__ */ new Map();
    this.#ttlMs = options.ttl ?? 0;
    this.#ttlAutopurge = options.ttlAutopurge ?? false;
  }
  /** @inheritdoc */
  get(key) {
    const entry = this.#map.get(key);
    if (entry === void 0) {
      return void 0;
    }
    if (this.#ttlMs > 0 && Date.now() > entry.expiresAt) {
      this.#map.delete(key);
      return void 0;
    }
    return entry.value;
  }
  /** @inheritdoc */
  set(key, value) {
    this.#map.set(key, {
      value,
      expiresAt: Date.now() + this.#ttlMs
    });
    if (this.#ttlAutopurge && this.#ttlTimer === void 0) {
      this.#ttlTimer = setTimeout(() => this.#evict(), this.#ttlMs);
    }
  }
  /** @inheritdoc */
  delete(key) {
    this.#map.delete(key);
  }
  /** @inheritdoc */
  clear() {
    this.#map.clear();
  }
  /**
   * stops background timers and releases resources.
   */
  dispose() {
    if (this.#ttlTimer !== void 0) {
      clearTimeout(this.#ttlTimer);
      this.#ttlTimer = void 0;
    }
  }
  [Symbol.dispose]() {
    this.dispose();
  }
  #evict() {
    this.#ttlTimer = void 0;
    const now = Date.now();
    let earliest = Infinity;
    for (const [key, { expiresAt }] of this.#map) {
      if (now > expiresAt) {
        this.#map.delete(key);
      } else if (expiresAt < earliest) {
        earliest = expiresAt;
      }
    }
    if (earliest < Infinity) {
      this.#ttlTimer = setTimeout(() => this.#evict(), earliest - now);
    }
  }
}
class OAuthClient {
  metadata;
  keyset;
  responseMode;
  resolver;
  serverFactory;
  sessionGetter;
  stateStore;
  fetch;
  constructor(options) {
    const { stores } = options;
    let metadata;
    let keyset;
    if ("keyset" in options && options.keyset !== void 0) {
      keyset = Array.isArray(options.keyset) ? new Keyset(options.keyset) : options.keyset;
      metadata = buildClientMetadata(options.metadata, keyset);
    } else {
      keyset = void 0;
      metadata = buildPublicClientMetadata(options.metadata);
    }
    this.metadata = metadata;
    this.keyset = keyset;
    this.responseMode = options.responseMode ?? "query";
    this.fetch = options.fetch ?? globalThis.fetch;
    const protectedResourceMetadataCache = stores.prMetadata ?? new MemoryStore({
      maxSize: 100,
      ttl: 6e4,
      ttlAutopurge: true
    });
    const authorizationServerMetadataCache = stores.asMetadata ?? new MemoryStore({
      maxSize: 100,
      ttl: 6e4,
      ttlAutopurge: true
    });
    const dpopNoncesCache = stores.dpopNonces ?? new MemoryStore({
      maxSize: 100,
      ttl: 6e4,
      ttlAutopurge: true
    });
    this.resolver = new OAuthResolver(options.actorResolver, new ProtectedResourceMetadataResolver({
      cache: protectedResourceMetadataCache,
      fetch: this.fetch
    }), new AuthorizationServerMetadataResolver({
      cache: authorizationServerMetadataCache,
      fetch: this.fetch
    }));
    this.serverFactory = new OAuthServerFactory({
      clientMetadata: this.metadata,
      resolver: this.resolver,
      keyset,
      dpopNonces: dpopNoncesCache,
      fetch: this.fetch
    });
    this.sessionGetter = new SessionGetter({
      sessionStore: stores.sessions,
      serverFactory: this.serverFactory,
      requestLock: options.requestLock
    });
    this.stateStore = stores.states;
  }
  /**
   * public JWKS for serving at jwks_uri.
   *
   * returns `undefined` for public clients (no keyset).
   */
  get jwks() {
    return this.keyset?.publicJwks;
  }
  /**
   * adds a listener for session events (updated, deleted).
   */
  addEventListener(listener) {
    this.sessionGetter.addEventListener(listener);
  }
  /**
   * removes a session event listener.
   */
  removeEventListener(listener) {
    this.sessionGetter.removeEventListener(listener);
  }
  /**
   * starts the authorization flow.
   *
   * @param options authorization options
   * @returns URL to redirect user to and state ID
   */
  async authorize(options) {
    let { target, scope, state: userState, redirectUri, prompt, signal } = options;
    if (scope !== void 0) {
      scope = validateRequestedScope(scope, this.metadata.scope);
    } else {
      scope = this.metadata.scope;
    }
    if (redirectUri !== void 0) {
      if (!this.metadata.redirect_uris.includes(redirectUri)) {
        throw new TypeError(`specified redirect_uri not in client metadata: ${redirectUri}`);
      }
    } else {
      redirectUri = this.metadata.redirect_uris[0];
    }
    let resolved;
    if (target.type === "account") {
      resolved = await this.resolver.resolveFromIdentity(target.identifier, {
        signal
      });
    } else {
      resolved = await this.resolver.resolveFromService(target.serviceUrl, {
        signal
      });
    }
    const { identity, metadata } = resolved;
    signal?.throwIfAborted();
    const resolvedPrompt = resolvePrompt(prompt, metadata.prompt_values_supported);
    const pkce = await generatePkce();
    const dpopKey = await generateDpopKey(metadata.dpop_signing_alg_values_supported ?? [FALLBACK_ALG]);
    const server = this.serverFactory.fromMetadataNewSession(metadata, dpopKey);
    const stateId = nanoid(24);
    const storedState = {
      dpopKey,
      authMethod: server.authMethod,
      pkceVerifier: pkce.verifier,
      issuer: metadata.issuer,
      redirectUri,
      sub: identity?.did,
      userState,
      expiresAt: Date.now() + 10 * 60 * 1e3
      // 10 minutes
    };
    await this.stateStore.set(stateId, storedState);
    const parParams = {
      client_id: this.metadata.client_id,
      redirect_uri: redirectUri,
      response_type: "code",
      response_mode: this.responseMode,
      scope,
      state: stateId,
      code_challenge: pkce.challenge,
      code_challenge_method: pkce.method
    };
    if (identity) {
      parParams.login_hint = identity.handle !== "handle.invalid" ? identity.handle : identity.did;
    }
    if (resolvedPrompt) {
      parParams.prompt = resolvedPrompt;
    }
    const parResponse = await server.pushAuthorizationRequest(parParams);
    const authUrl = new URL(metadata.authorization_endpoint);
    authUrl.searchParams.set("client_id", this.metadata.client_id);
    authUrl.searchParams.set("request_uri", parResponse.request_uri);
    return { url: authUrl, stateId };
  }
  /**
   * handles the OAuth callback.
   *
   * @param params URL search params from callback
   * @param options callback options
   * @returns session and user state
   */
  async callback(params, options) {
    const stateParam = params.get("state");
    const errorParam = params.get("error");
    const codeParam = params.get("code");
    const issParam = params.get("iss");
    if (!stateParam) {
      throw new OAuthCallbackError("invalid_request", "missing state parameter");
    }
    const storedState = await this.stateStore.get(stateParam);
    if (!storedState) {
      throw new OAuthCallbackError("invalid_request", "unknown state", stateParam);
    }
    await this.stateStore.delete(stateParam);
    if (errorParam) {
      throw new OAuthCallbackError(errorParam, params.get("error_description") ?? void 0, stateParam);
    }
    if (!codeParam) {
      throw new OAuthCallbackError("invalid_request", "missing code parameter", stateParam);
    }
    const server = await this.serverFactory.fromIssuer(storedState.issuer, storedState.authMethod, storedState.dpopKey);
    if (issParam != null) {
      if (server.issuer !== issParam) {
        throw new OAuthCallbackError("invalid_request", "issuer mismatch", stateParam);
      }
    } else if (server.serverMetadata.authorization_response_iss_parameter_supported) {
      throw new OAuthCallbackError("invalid_request", "missing iss parameter", stateParam);
    }
    const redirectUri = options?.redirectUri ?? storedState.redirectUri;
    const tokenSet = await server.exchangeCode(codeParam, storedState.pkceVerifier, redirectUri);
    if (storedState.sub && tokenSet.sub !== storedState.sub) {
      await server.revoke(tokenSet.access_token);
      throw new OAuthCallbackError("invalid_request", "sub mismatch", stateParam);
    }
    try {
      await this.sessionGetter.setStored(tokenSet.sub, {
        dpopKey: storedState.dpopKey,
        authMethod: server.authMethod,
        tokenSet
      });
    } catch (err) {
      await server.revoke(tokenSet.access_token);
      throw err;
    }
    const session = this.createSession(server, tokenSet.sub);
    return { session, state: storedState.userState };
  }
  /**
   * restores an existing session.
   *
   * @param sub user's DID
   * @param options restore options
   * @returns authenticated session
   */
  async restore(sub, options) {
    const refresh = options?.refresh ?? "auto";
    const { dpopKey, authMethod, tokenSet } = await this.sessionGetter.getSession(sub, refresh);
    const server = await this.serverFactory.fromIssuer(tokenSet.iss, authMethod, dpopKey, {
      noCache: refresh === true
    });
    return this.createSession(server, sub);
  }
  /**
   * revokes and deletes a session.
   *
   * @param sub user's DID
   */
  async revoke(sub) {
    const { dpopKey, authMethod, tokenSet } = await this.sessionGetter.getSession(sub, false);
    try {
      const server = await this.serverFactory.fromIssuer(tokenSet.iss, authMethod, dpopKey);
      await server.revoke(tokenSet.access_token);
    } finally {
      await this.sessionGetter.deleteStored(sub, new TokenRevokedError(sub));
    }
  }
  createSession(server, sub) {
    return new OAuthSession(server, sub, this.sessionGetter, this.fetch);
  }
}
const resolvePrompt = (prompt, supported) => {
  if (!prompt) {
    return;
  }
  const candidates = Array.isArray(prompt) ? prompt : [prompt];
  if (candidates.length === 0) {
    return;
  }
  if (!supported) {
    return candidates[0];
  }
  for (let i = 0, il = candidates.length; i < il; i++) {
    const candidate = candidates[i];
    if (supported.includes(candidate)) {
      return candidate;
    }
  }
  throw new TypeError(`prompt not supported by server (provided: ${candidates.join(", ")}, supported: ${supported.join(", ")})`);
};
const parseScope = (scope) => {
  return scope.trim().split(/\s+/);
};
const validateRequestedScope = (requested, allowed) => {
  const requestedParts = parseScope(requested);
  if (requestedParts.length === 0) {
    throw new TypeError(`missing scope`);
  }
  for (let i = 0, il = requestedParts.length; i < il; i++) {
    const aka = requestedParts[i];
    for (let j = 0; j < i; j++) {
      if (aka === requestedParts[j]) {
        throw new TypeError(`duplicate "${aka}" scope`);
      }
    }
  }
  const allowedParts = parseScope(allowed);
  for (let i = 0, il = requestedParts.length; i < il; i++) {
    const scope = requestedParts[i];
    let found = false;
    for (let j = 0, jl = allowedParts.length; j < jl; j++) {
      if (scope === allowedParts[j]) {
        found = true;
        break;
      }
    }
    if (!found) {
      throw new Error(`requested "${scope}" scope is not within client metadata's scope`);
    }
  }
  return requestedParts.join(" ");
};
class DidDocumentResolutionError extends Error {
  name = "DidResolutionError";
}
class UnsupportedDidMethodError extends DidDocumentResolutionError {
  name = "UnsupportedDidMethodError";
  did;
  constructor(did) {
    super(`unsupported did method; did=${did}`);
    this.did = did;
  }
}
class DocumentNotFoundError extends DidDocumentResolutionError {
  name = "DocumentNotFoundError";
  did;
  constructor(did) {
    super(`did document not found; did=${did}`);
    this.did = did;
  }
}
class FailedDocumentResolutionError extends DidDocumentResolutionError {
  name = "FailedDocumentResolutionError";
  did;
  constructor(did, options) {
    super(`failed to resolve did document; did=${did}`, options);
    this.did = did;
  }
}
class HandleResolutionError extends Error {
  name = "HandleResolutionError";
}
class DidNotFoundError extends HandleResolutionError {
  name = "DidNotFoundError";
  handle;
  constructor(handle) {
    super(`handle returned no did; handle=${handle}`);
    this.handle = handle;
  }
}
class FailedHandleResolutionError extends HandleResolutionError {
  name = "FailedHandleResolutionError";
  handle;
  constructor(handle, options) {
    super(`failed to resolve handle; handle=${handle}`, options);
    this.handle = handle;
  }
}
class ActorResolutionError extends Error {
  name = "ActorResolutionError";
}
class LocalActorResolver {
  handleResolver;
  didDocumentResolver;
  constructor(options) {
    this.handleResolver = options.handleResolver;
    this.didDocumentResolver = options.didDocumentResolver;
  }
  async resolve(actor, options) {
    const identifierIsDid = /* @__PURE__ */ isDid(actor);
    let did;
    if (identifierIsDid) {
      did = actor;
    } else {
      try {
        did = await this.handleResolver.resolve(actor, options);
      } catch (err) {
        throw new ActorResolutionError(`failed to resolve handle`, { cause: err });
      }
    }
    let doc;
    try {
      doc = await this.didDocumentResolver.resolve(did, options);
    } catch (err) {
      throw new ActorResolutionError(`failed to resolve did document`, { cause: err });
    }
    const pds = getPdsEndpoint(doc);
    if (!pds) {
      throw new ActorResolutionError(`missing pds endpoint`);
    }
    let handle = "handle.invalid";
    if (identifierIsDid) {
      const writtenHandle = getAtprotoHandle(doc);
      if (writtenHandle) {
        try {
          const resolved = await this.handleResolver.resolve(writtenHandle, options);
          if (resolved === did) {
            handle = writtenHandle;
          }
        } catch {
        }
      }
    } else if (getAtprotoHandle(doc) === actor) {
      handle = actor;
    }
    return {
      did,
      handle,
      pds: new URL(pds).href
    };
  }
}
class CompositeDidDocumentResolver {
  #methods;
  constructor({ methods }) {
    this.#methods = new Map(Object.entries(methods));
  }
  async resolve(did, options) {
    const method = extractDidMethod(did);
    const resolver = this.#methods.get(method);
    if (resolver === void 0) {
      throw new UnsupportedDidMethodError(did);
    }
    return await resolver.resolve(did, options);
  }
}
const fetchDocHandler = pipe(isResponseOk, parseResponseAsJson(/^application\/(did\+ld\+)?json$/, 20 * 1024), validateJsonWith(didDocument));
class PlcDidDocumentResolver {
  apiUrl;
  #fetch;
  constructor({ apiUrl = "https://plc.directory", fetch: fetchThis = fetch } = {}) {
    this.apiUrl = apiUrl;
    this.#fetch = fetchThis;
  }
  async resolve(did, options) {
    if (!did.startsWith("did:plc:")) {
      throw new UnsupportedDidMethodError(did);
    }
    let json;
    try {
      const url = new URL(`/${encodeURIComponent(did)}`, this.apiUrl);
      const response2 = await (0, this.#fetch)(url, {
        signal: options?.signal,
        cache: options?.noCache ? "no-cache" : void 0,
        redirect: "manual",
        headers: { accept: "application/did+ld+json,application/json" }
      });
      if (response2.status >= 300 && response2.status < 400) {
        throw new TypeError(`unexpected redirect`);
      }
      const handled = await fetchDocHandler(response2);
      json = handled.json;
    } catch (cause) {
      if (cause instanceof FailedResponseError && cause.status === 404) {
        throw new DocumentNotFoundError(did);
      }
      throw new FailedDocumentResolutionError(did, { cause });
    }
    return json;
  }
}
class WebDidDocumentResolver {
  #fetch;
  constructor({ fetch: fetchThis = fetch } = {}) {
    this.#fetch = fetchThis;
  }
  async resolve(did, options) {
    if (!did.startsWith("did:web:")) {
      throw new UnsupportedDidMethodError(did);
    }
    let json;
    try {
      const url = webDidToDocumentUrl(did);
      const response2 = await (0, this.#fetch)(url, {
        signal: options?.signal,
        cache: options?.noCache ? "no-cache" : void 0,
        redirect: "manual",
        headers: { accept: "application/did+ld+json,application/json" }
      });
      if (response2.status >= 300 && response2.status < 400) {
        throw new TypeError(`unexpected redirect`);
      }
      const handled = await fetchDocHandler(response2);
      json = handled.json;
    } catch (cause) {
      if (cause instanceof FailedResponseError && cause.status === 404) {
        throw new DocumentNotFoundError(did);
      }
      throw new FailedDocumentResolutionError(did, { cause });
    }
    return json;
  }
}
const response = /* @__PURE__ */ looseObject({
  did: /* @__PURE__ */ custom(isAtprotoDid)
});
const fetchXrpcHandler = pipe(isResponseOk, parseResponseAsJson(/^application\/json$/, 4 * 1024), validateJsonWith(response));
class XrpcHandleResolver {
  serviceUrl;
  #fetch;
  constructor({ serviceUrl, fetch: fetchThis = fetch }) {
    this.serviceUrl = serviceUrl;
    this.#fetch = fetchThis;
  }
  async resolve(handle, options) {
    let json;
    try {
      const url = new URL(`/xrpc/com.atproto.identity.resolveHandle`, this.serviceUrl);
      url.searchParams.set("handle", handle);
      const response2 = await (0, this.#fetch)(url, {
        signal: options?.signal,
        cache: options?.noCache ? "no-cache" : void 0,
        headers: { accept: "application/json" }
      });
      const handled = await fetchXrpcHandler(response2);
      json = handled.json;
    } catch (cause) {
      if (cause instanceof FailedResponseError && cause.status === 400) {
        throw new DidNotFoundError(handle);
      }
      throw new FailedHandleResolutionError(handle, { cause });
    }
    return json.did;
  }
}
const SCOPE = "atproto repo:blue.pronouns.name repo:blue.pronouns.pronoun";
const PUBLIC_URL = process.env.PUBLIC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_APPVIEW_URL = process.env.PUBLIC_APPVIEW_URL || "https://public.api.bsky.app";
const IS_PROD = true;
const STATE_COOKIE = "oauth_state";
const SESSION_COOKIE = "session";
const SESSION_CHUNK_SIZE = 3e3;
function splitCookieValue(value, size) {
  if (value.length <= size) return [value];
  const chunks = [];
  for (let i = 0; i < value.length; i += size) {
    chunks.push(value.slice(i, i + size));
  }
  return chunks;
}
function readChunkedCookie(cookieAdapter, name) {
  const direct = cookieAdapter.get(name);
  if (direct) return direct;
  const prefix = `${name}.`;
  const chunks = cookieAdapter.getAll().map((cookie) => {
    if (!cookie.name.startsWith(prefix)) return null;
    const indexRaw = cookie.name.slice(prefix.length);
    if (!/^\d+$/.test(indexRaw)) return null;
    return { index: Number(indexRaw), value: cookie.value };
  }).filter((chunk) => !!chunk).sort((a, b) => a.index - b.index);
  if (chunks.length === 0 || chunks[0].index !== 0) return void 0;
  for (let i = 1; i < chunks.length; i++) {
    if (chunks[i].index !== chunks[i - 1].index + 1) return void 0;
  }
  return chunks.map((chunk) => chunk.value).join("");
}
function clearChunkedCookie(cookieAdapter, name) {
  const prefix = `${name}.`;
  for (const cookie of cookieAdapter.getAll()) {
    if (cookie.name === name || cookie.name.startsWith(prefix)) {
      cookieAdapter.delete(cookie.name);
    }
  }
}
function writeChunkedCookie(cookieAdapter, name, value, options) {
  const chunks = splitCookieValue(value, SESSION_CHUNK_SIZE);
  const prefix = `${name}.`;
  clearChunkedCookie(cookieAdapter, name);
  if (chunks.length === 1) {
    cookieAdapter.set(name, chunks[0], options);
    return;
  }
  chunks.forEach((chunk, index) => {
    cookieAdapter.set(`${prefix}${index}`, chunk, options);
  });
}
function getConfidentialMetadata() {
  if (!PUBLIC_URL || !PRIVATE_KEY) {
    throw new Error("PUBLIC_URL and PRIVATE_KEY are required for OAuth.");
  }
  return {
    client_id: `${PUBLIC_URL}/oauth-client-metadata.json`,
    client_name: "pronouns.blue",
    client_uri: PUBLIC_URL,
    redirect_uris: [`${PUBLIC_URL}/oauth/callback`],
    scope: SCOPE,
    jwks_uri: `${PUBLIC_URL}/.well-known/jwks.json`
  };
}
function getPublicMetadata() {
  return {
    redirect_uris: ["http://127.0.0.1:3000/oauth/callback"],
    scope: SCOPE
  };
}
function getKeyset() {
  if (PUBLIC_URL && !PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is required when PUBLIC_URL is set.");
  }
  if (PUBLIC_URL && PRIVATE_KEY) {
    return [JSON.parse(PRIVATE_KEY)];
  }
  return void 0;
}
function createStateStore(cookieAdapter) {
  return {
    async get(key) {
      const raw = cookieAdapter.get(STATE_COOKIE);
      if (!raw) return void 0;
      try {
        const parsed = JSON.parse(raw);
        return parsed.key === key ? parsed.value : void 0;
      } catch {
        return void 0;
      }
    },
    async set(key, value) {
      cookieAdapter.set(STATE_COOKIE, JSON.stringify({ key, value }), {
        httpOnly: true,
        secure: IS_PROD,
        sameSite: "lax",
        maxAge: 600,
        // 10 minutes — enough for the OAuth redirect round-trip
        path: "/"
      });
    },
    async delete(key) {
      const raw = cookieAdapter.get(STATE_COOKIE);
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        if (parsed.key === key) {
          cookieAdapter.delete(STATE_COOKIE);
        }
      } catch {
      }
    },
    async clear() {
      cookieAdapter.delete(STATE_COOKIE);
    }
  };
}
function createSessionStore(cookieAdapter) {
  return {
    async get(key) {
      const raw = readChunkedCookie(cookieAdapter, SESSION_COOKIE);
      if (!raw) return void 0;
      try {
        const parsed = JSON.parse(raw);
        return parsed.key === key ? parsed.value : void 0;
      } catch {
        return void 0;
      }
    },
    async set(key, value) {
      writeChunkedCookie(
        cookieAdapter,
        SESSION_COOKIE,
        JSON.stringify({ key, value }),
        {
          httpOnly: true,
          secure: IS_PROD,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30,
          // 30 days
          path: "/"
        }
      );
    },
    async delete(key) {
      const raw = readChunkedCookie(cookieAdapter, SESSION_COOKIE);
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        if (parsed.key === key) {
          clearChunkedCookie(cookieAdapter, SESSION_COOKIE);
        }
      } catch {
      }
    },
    async clear() {
      clearChunkedCookie(cookieAdapter, SESSION_COOKIE);
    }
  };
}
function createActorResolver() {
  return new LocalActorResolver({
    handleResolver: new XrpcHandleResolver({
      serviceUrl: PUBLIC_APPVIEW_URL,
      fetch: globalThis.fetch
    }),
    didDocumentResolver: new CompositeDidDocumentResolver({
      methods: {
        plc: new PlcDidDocumentResolver({ fetch: globalThis.fetch }),
        web: new WebDidDocumentResolver({ fetch: globalThis.fetch })
      }
    })
  });
}
async function getOAuthClient(cookieAdapter) {
  const keyset = getKeyset();
  const metadata = keyset ? getConfidentialMetadata() : getPublicMetadata();
  return new OAuthClient({
    ...keyset ? { keyset } : {},
    metadata,
    actorResolver: createActorResolver(),
    stores: {
      states: createStateStore(cookieAdapter),
      sessions: createSessionStore(cookieAdapter)
    },
    fetch: globalThis.fetch
  });
}
class AstroCookieAdapter {
  constructor(cookies, request) {
    this.cookies = cookies;
    this.request = request;
  }
  get(name) {
    return this.cookies.get(name)?.value;
  }
  set(name, value, options) {
    this.cookies.set(name, value, options);
  }
  delete(name) {
    this.cookies.delete(name, { path: "/" });
  }
  getAll() {
    const header = this.request.headers.get("cookie");
    if (!header) return [];
    return header.split(";").flatMap((part) => {
      const eqIndex = part.indexOf("=");
      if (eqIndex === -1) return [];
      const name = part.slice(0, eqIndex).trim();
      const rawValue = part.slice(eqIndex + 1).trim();
      if (!name) return [];
      let value = rawValue;
      try {
        value = decodeURIComponent(rawValue);
      } catch {
      }
      return [{ name, value }];
    });
  }
}
function createAstroCookieAdapter(cookies, request) {
  return new AstroCookieAdapter(cookies, request);
}
export {
  SCOPE as S,
  isHandle as a,
  createAstroCookieAdapter as c,
  getOAuthClient as g,
  isDid as i
};
