import { p as pipelineSymbol, s as shouldAppendForwardSlash, r as removeTrailingForwardSlash, A as ActionNotFoundError, R as REDIRECT_STATUS_CODES, a as AstroError, b as ActionsReturnedInvalidDataError, c as ResponseSentError, d as defineMiddleware, N as NOOP_MIDDLEWARE_HEADER, e as s, E as EndpointDidNotReturnAResponse, f as REROUTABLE_STATUS_CODES, g as REROUTE_DIRECTIVE_HEADER, i as isPropagatingHint, h as getPropagationHint$1, M as MissingMediaQueryDirective, j as NoMatchingImport, k as escapeHTML, l as bufferPropagatedHead, m as isHeadAndContent, n as isRenderTemplateResult, O as OnlyResponseCanBeReturned, o as isPromise, q as promiseWithResolvers, t as encoder, u as chunkToByteArray, v as chunkToString, w as chunkToByteArrayOrString, x as toAttributeString, y as markHTMLString, z as renderSlotToString, B as maybeRenderHead, C as containsServerDirective, F as Fragment, D as renderSlot, G as clsx, H as renderSlots, S as ServerIslandComponent, I as createAstroComponentInstance, J as Renderer, K as NoMatchingRenderer, L as formatList, P as NoClientOnlyHint, Q as internalSpreadAttributes, T as voidElementNames, U as renderTemplate, V as createRenderInstruction, W as renderElement$1, X as SlotString, Y as mergeSlotInstructions, Z as HTMLString, _ as isHTMLString, $ as isRenderInstruction, a0 as isAstroComponentInstance, a1 as isRenderInstance, a2 as renderCspContent, a3 as isNode, a4 as isDeno, a5 as addAttribute, a6 as decryptString, a7 as createSlotValueFromString, a8 as DEFAULT_404_COMPONENT, a9 as DEFAULT_404_ROUTE, aa as default404Instance, ab as getParams, ac as prependForwardSlash$1, ad as decodeKey, ae as UnableToLoadLogger, af as RouteCache, ag as sequence, ah as ReservedSlotName, ai as ROUTE_TYPE_HEADER, aj as appendForwardSlash, ak as i18nNoLocaleFoundInPath, al as MiddlewareNoDataOrNextCalled, am as MiddlewareNotAResponse, an as CacheNotEnabled, ao as ASTRO_ERROR_HEADER, ap as REWRITE_DIRECTIVE_HEADER_KEY, aq as REWRITE_DIRECTIVE_HEADER_VALUE, ar as collapseDuplicateSlashes, as as ForbiddenRewrite, at as copyRequest, au as setOriginPathname, av as isRoute404, aw as isRoute500, ax as originPathnameSymbol, ay as generateCspDigest, az as ASTRO_GENERATOR, aA as PrerenderClientAddressNotAvailable, aB as ClientAddressNotAvailable, aC as StaticClientAddressNotAvailable, aD as routeHasHtmlExtension, aE as collapseDuplicateLeadingSlashes, aF as getProps, aG as fetchStateSymbol, aH as AstroResponseHeadersReassigned, aI as responseSentSymbol$1, aJ as getOriginPathname, aK as LocalsReassigned, aL as INTERNAL_RESPONSE_HEADERS, aM as escape, aN as isInternalPath, aO as collapseDuplicateTrailingSlashes, aP as hasFileExtension, aQ as removeLeadingForwardSlash, aR as getRouteGenerator, aS as SessionStorageInitError, aT as SessionStorageSaveError, aU as appSymbol, aV as joinPaths, aW as LocalsNotAnObject, aX as clientAddressSymbol, aY as fileExtension, aZ as slash, a_ as routeIsRedirect, a$ as routeIsFallback, b0 as getFallbackRoute, b1 as findRouteToRewrite, b2 as nodeRequestAbortControllerCleanupSymbol } from './params-and-props_CGkvChX8.mjs';
import React, { memo, createElement } from 'react';
import ReactDOM from 'react-dom/server';
import fs, { createReadStream } from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import os from 'node:os';
import { AsyncLocalStorage } from 'node:async_hooks';
import path from 'node:path';
import { Readable } from 'node:stream';
import { Http2ServerResponse } from 'node:http2';
import url from 'node:url';
import require$$0$2 from 'path';
import require$$1 from 'tty';
import require$$1$1 from 'util';
import require$$0$3 from 'os';
import require$$0$4 from 'crypto';
import require$$1$2 from 'fs';
import require$$13 from 'stream';

/** @type {Record<string, string>} */

class DevalueError extends Error {
	/**
	 * @param {string} message
	 * @param {string[]} keys
	 * @param {any} [value] - The value that failed to be serialized
	 * @param {any} [root] - The root value being serialized
	 */
	constructor(message, keys, value, root) {
		super(message);
		this.name = 'DevalueError';
		this.path = keys.join('');
		this.value = value;
		this.root = root;
	}
}

/** @param {any} thing */
function is_primitive(thing) {
	return thing === null || (typeof thing !== 'object' && typeof thing !== 'function');
}

const object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(Object.prototype)
	.sort()
	.join('\0');

/** @param {any} thing */
function is_plain_object(thing) {
	const proto = Object.getPrototypeOf(thing);

	return (
		proto === Object.prototype ||
		proto === null ||
		Object.getPrototypeOf(proto) === null ||
		Object.getOwnPropertyNames(proto).sort().join('\0') === object_proto_names
	);
}

/** @param {any} thing */
function get_type(thing) {
	return Object.prototype.toString.call(thing).slice(8, -1);
}

/** @param {string} char */
function get_escaped_char(char) {
	switch (char) {
		case '"':
			return '\\"';
		case '<':
			return '\\u003C';
		case '\\':
			return '\\\\';
		case '\n':
			return '\\n';
		case '\r':
			return '\\r';
		case '\t':
			return '\\t';
		case '\b':
			return '\\b';
		case '\f':
			return '\\f';
		case '\u2028':
			return '\\u2028';
		case '\u2029':
			return '\\u2029';
		default:
			return char < ' ' ? `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}` : '';
	}
}

/** @param {string} str */
function stringify_string(str) {
	let result = '';
	let last_pos = 0;
	const len = str.length;

	for (let i = 0; i < len; i += 1) {
		const char = str[i];
		const replacement = get_escaped_char(char);
		if (replacement) {
			result += str.slice(last_pos, i) + replacement;
			last_pos = i + 1;
		}
	}

	return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}

/** @param {Record<string | symbol, any>} object */
function enumerable_symbols(object) {
	return Object.getOwnPropertySymbols(object).filter(
		(symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
	);
}

const is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;

/** @param {string} key */
function stringify_key(key) {
	return is_identifier.test(key) ? '.' + key : '[' + JSON.stringify(key) + ']';
}

/** @param {string} s */
function is_valid_array_index(s) {
	if (s.length === 0) return false;
	if (s.length > 1 && s.charCodeAt(0) === 48) return false; // leading zero
	for (let i = 0; i < s.length; i++) {
		const c = s.charCodeAt(i);
		if (c < 48 || c > 57) return false;
	}
	// by this point we know it's a string of digits, but it has to be within the range of valid array indices
	const n = +s;
	if (n >= 2 ** 32 - 1) return false;
	if (n < 0) return false;
	return true;
}

/**
 * Finds the populated indices of an array.
 * @param {unknown[]} array
 */
function valid_array_indices(array) {
	const keys = Object.keys(array);
	for (var i = keys.length - 1; i >= 0; i--) {
		if (is_valid_array_index(keys[i])) {
			break;
		}
	}
	keys.length = i + 1;
	return keys;
}

/* Baseline 2025 runtimes */

/**	@type {(array_buffer: ArrayBuffer) => string} */
function encode_native(array_buffer) {
	return new Uint8Array(array_buffer).toBase64();
}

/**	@type {(base64: string) => ArrayBuffer} */
function decode_native(base64) {
	return Uint8Array.fromBase64(base64).buffer;
}

/* Node-compatible runtimes */

/** @type {(array_buffer: ArrayBuffer) => string} */
function encode_buffer(array_buffer) {
	return Buffer.from(array_buffer).toString('base64');
}

/**	@type {(base64: string) => ArrayBuffer} */
function decode_buffer(base64) {
	return Uint8Array.from(Buffer.from(base64, 'base64')).buffer;
}

/* Legacy runtimes */

/** @type {(array_buffer: ArrayBuffer) => string} */
function encode_legacy(array_buffer) {
	const array = new Uint8Array(array_buffer);
	let binary = '';

	// the maximum number of arguments to String.fromCharCode.apply
	// should be around 0xFFFF in modern engines
	const chunk_size = 0x8000;
	for (let i = 0; i < array.length; i += chunk_size) {
		const chunk = array.subarray(i, i + chunk_size);
		binary += String.fromCharCode.apply(null, chunk);
	}

	return btoa(binary);
}

/**	@type {(base64: string) => ArrayBuffer} */
function decode_legacy(base64) {
	const binary_string = atob(base64);
	const len = binary_string.length;
	const array = new Uint8Array(len);

	for (let i = 0; i < len; i++) {
		array[i] = binary_string.charCodeAt(i);
	}

	return array.buffer;
}

const native = typeof Uint8Array.fromBase64 === 'function';
const buffer = typeof process === 'object' && process.versions?.node !== undefined;

const encode64 = native ? encode_native : buffer ? encode_buffer : encode_legacy;
const decode64 = native ? decode_native : buffer ? decode_buffer : decode_legacy;

const UNDEFINED = -1;
const HOLE = -2;
const NAN = -3;
const POSITIVE_INFINITY = -4;
const NEGATIVE_INFINITY = -5;
const NEGATIVE_ZERO = -6;
const SPARSE = -7;

/**
 * Revive a value serialized with `devalue.stringify`
 * @param {string} serialized
 * @param {Record<string, (value: any) => any>} [revivers]
 */
function parse(serialized, revivers) {
	return unflatten$1(JSON.parse(serialized), revivers);
}

/**
 * Revive a value flattened with `devalue.stringify`
 * @param {number | any[]} parsed
 * @param {Record<string, (value: any) => any>} [revivers]
 */
function unflatten$1(parsed, revivers) {
	if (typeof parsed === 'number') return hydrate(parsed, true);

	if (!Array.isArray(parsed) || parsed.length === 0) {
		throw new Error('Invalid input');
	}

	const values = /** @type {any[]} */ (parsed);

	const hydrated = Array(values.length);

	/**
	 * A set of values currently being hydrated with custom revivers,
	 * used to detect invalid cyclical dependencies
	 * @type {Set<number> | null}
	 */
	let hydrating = null;

	/**
	 * @param {number} index
	 * @returns {any}
	 */
	function hydrate(index, standalone = false) {
		if (index === UNDEFINED) return undefined;
		if (index === NAN) return NaN;
		if (index === POSITIVE_INFINITY) return Infinity;
		if (index === NEGATIVE_INFINITY) return -Infinity;
		if (index === NEGATIVE_ZERO) return -0;

		if (standalone || typeof index !== 'number') {
			throw new Error(`Invalid input`);
		}

		if (index in hydrated) return hydrated[index];

		const value = values[index];

		if (!value || typeof value !== 'object') {
			hydrated[index] = value;
		} else if (Array.isArray(value)) {
			if (typeof value[0] === 'string') {
				const type = value[0];

				const reviver = revivers && Object.hasOwn(revivers, type) ? revivers[type] : undefined;

				if (reviver) {
					let i = value[1];
					if (typeof i !== 'number') {
						// if it's not a number, it was serialized by a builtin reviver
						// so we need to munge it into the format expected by a custom reviver
						i = values.push(value[1]) - 1;
					}

					hydrating ??= new Set();

					if (hydrating.has(i)) {
						throw new Error('Invalid circular reference');
					}

					hydrating.add(i);
					hydrated[index] = reviver(hydrate(i));
					hydrating.delete(i);

					return hydrated[index];
				}

				switch (type) {
					case 'Date':
						hydrated[index] = new Date(value[1]);
						break;

					case 'Set':
						const set = new Set();
						hydrated[index] = set;
						for (let i = 1; i < value.length; i += 1) {
							set.add(hydrate(value[i]));
						}
						break;

					case 'Map':
						const map = new Map();
						hydrated[index] = map;
						for (let i = 1; i < value.length; i += 2) {
							map.set(hydrate(value[i]), hydrate(value[i + 1]));
						}
						break;

					case 'RegExp':
						hydrated[index] = new RegExp(value[1], value[2]);
						break;

					case 'Object': {
						const wrapped_index = value[1];

						if (
							typeof values[wrapped_index] === 'object' &&
							values[wrapped_index][0] !== 'BigInt'
						) {
							// avoid infinite recusion in case of malformed input
							throw new Error('Invalid input');
						}

						hydrated[index] = Object(hydrate(wrapped_index));
						break;
					}

					case 'BigInt':
						hydrated[index] = BigInt(value[1]);
						break;

					case 'null':
						const obj = Object.create(null);
						hydrated[index] = obj;
						for (let i = 1; i < value.length; i += 2) {
							if (value[i] === '__proto__') {
								throw new Error('Cannot parse an object with a `__proto__` property');
							}

							obj[value[i]] = hydrate(value[i + 1]);
						}
						break;

					case 'Int8Array':
					case 'Uint8Array':
					case 'Uint8ClampedArray':
					case 'Int16Array':
					case 'Uint16Array':
					case 'Float16Array':
					case 'Int32Array':
					case 'Uint32Array':
					case 'Float32Array':
					case 'Float64Array':
					case 'BigInt64Array':
					case 'BigUint64Array':
					case 'DataView': {
						if (values[value[1]][0] !== 'ArrayBuffer') {
							// without this, if we receive malformed input we could
							// end up trying to hydrate in a circle or allocate
							// huge amounts of memory when we call `new TypedArrayConstructor(buffer)`
							throw new Error('Invalid data');
						}

						const TypedArrayConstructor = globalThis[type];
						const buffer = hydrate(value[1]);

						hydrated[index] =
							value[2] !== undefined
								? new TypedArrayConstructor(buffer, value[2], value[3])
								: new TypedArrayConstructor(buffer);

						break;
					}

					case 'ArrayBuffer': {
						const base64 = value[1];
						if (typeof base64 !== 'string') {
							throw new Error('Invalid ArrayBuffer encoding');
						}
						const arraybuffer = decode64(base64);
						hydrated[index] = arraybuffer;
						break;
					}

					case 'Temporal.Duration':
					case 'Temporal.Instant':
					case 'Temporal.PlainDate':
					case 'Temporal.PlainTime':
					case 'Temporal.PlainDateTime':
					case 'Temporal.PlainMonthDay':
					case 'Temporal.PlainYearMonth':
					case 'Temporal.ZonedDateTime': {
						const temporalName = type.slice(9);
						// @ts-expect-error TS doesn't know about Temporal yet
						hydrated[index] = Temporal[temporalName].from(value[1]);
						break;
					}

					case 'URL': {
						const url = new URL(value[1]);
						hydrated[index] = url;
						break;
					}

					case 'URLSearchParams': {
						const url = new URLSearchParams(value[1]);
						hydrated[index] = url;
						break;
					}

					default:
						throw new Error(`Unknown type ${type}`);
				}
			} else if (value[0] === SPARSE) {
				// Sparse array encoding: [SPARSE, length, idx, val, idx, val, ...]
				const len = value[1];

				if (!Number.isInteger(len) || len < 0) {
					throw new Error('Invalid input');
				}

				const array = new Array(len);
				hydrated[index] = array;

				for (let i = 2; i < value.length; i += 2) {
					const idx = value[i];

					if (!Number.isInteger(idx) || idx < 0 || idx >= len) {
						throw new Error('Invalid input');
					}

					array[idx] = hydrate(value[i + 1]);
				}
			} else {
				const array = new Array(value.length);
				hydrated[index] = array;

				for (let i = 0; i < value.length; i += 1) {
					const n = value[i];
					if (n === HOLE) continue;

					array[i] = hydrate(n);
				}
			}
		} else {
			/** @type {Record<string, any>} */
			const object = {};
			hydrated[index] = object;

			for (const key of Object.keys(value)) {
				if (key === '__proto__') {
					throw new Error('Cannot parse an object with a `__proto__` property');
				}

				const n = value[key];
				object[key] = hydrate(n);
			}
		}

		return hydrated[index];
	}

	return hydrate(0);
}

/**
 * Turn a value into a JSON string that can be parsed with `devalue.parse`
 * @param {any} value
 * @param {Record<string, (value: any) => any>} [reducers]
 */
function stringify$2(value, reducers) {
	const stringified = run(false, value, reducers);
	return typeof stringified === 'string' ? stringified : `[${stringified.join(',')}]`;
}

/**
 * @param {boolean} async
 * @param {any} value
 * @param {Record<string, (value: any) => any>} [reducers]
 */
function run(async, value, reducers) {
	/** @type {any[]} */
	const stringified = [];

	/** @type {Map<any, number>} */
	const indexes = new Map();

	/** @type {Array<{ key: string, fn: (value: any) => any }>} */
	const custom = [];
	if (reducers) {
		for (const key of Object.getOwnPropertyNames(reducers)) {
			custom.push({ key, fn: reducers[key] });
		}
	}

	/** @type {string[]} */
	const keys = [];

	let p = 0;

	/**
	 * @param {any} thing
	 * @param {number} [index]
	 */
	function flatten(thing, index) {
		if (thing === undefined) return UNDEFINED;
		if (Number.isNaN(thing)) return NAN;
		if (thing === Infinity) return POSITIVE_INFINITY;
		if (thing === -Infinity) return NEGATIVE_INFINITY;
		if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO;

		if (indexes.has(thing)) return /** @type {number} */ (indexes.get(thing));

		index ??= p++;
		indexes.set(thing, index);

		for (const { key, fn } of custom) {
			const value = fn(thing);
			if (value) {
				stringified[index] = `["${key}",${flatten(value)}]`;
				return index;
			}
		}

		if (typeof thing === 'function') {
			throw new DevalueError(`Cannot stringify a function`, keys, thing, value);
		} else if (typeof thing === 'symbol') {
			throw new DevalueError(`Cannot stringify a Symbol primitive`, keys, thing, value);
		}

		/** @type {string | Promise<any>} */
		let str = '';

		if (is_primitive(thing)) {
			str = stringify_primitive(thing);
		} else if (typeof thing.then === 'function') {
			{
				throw new DevalueError(
					`Cannot stringify a Promise or thenable — use stringifyAsync instead`,
					keys,
					thing,
					value
				);
			}
		} else {
			const type = get_type(thing);

			switch (type) {
				case 'Number':
				case 'String':
				case 'Boolean':
				case 'BigInt':
					str = `["Object",${flatten(thing.valueOf())}]`;
					break;

				case 'Date':
					const valid = !isNaN(thing.getDate());
					str = `["Date","${valid ? thing.toISOString() : ''}"]`;
					break;

				case 'URL':
					str = `["URL",${stringify_string(thing.toString())}]`;
					break;

				case 'URLSearchParams':
					str = `["URLSearchParams",${stringify_string(thing.toString())}]`;
					break;

				case 'RegExp':
					const { source, flags } = thing;
					str = flags
						? `["RegExp",${stringify_string(source)},"${flags}"]`
						: `["RegExp",${stringify_string(source)}]`;
					break;

				case 'Array': {
					// For dense arrays (no holes), we iterate normally.
					// When we encounter the first hole, we call Object.keys
					// to determine the sparseness, then decide between:
					//   - HOLE encoding: [-2, val, -2, ...] (default)
					//   - Sparse encoding: [-7, length, idx, val, ...] (for very sparse arrays)
					// Only the sparse path avoids iterating every slot, which
					// is what protects against the DoS of e.g. `arr[1000000] = 1`.
					let mostly_dense = false;

					str = '[';

					for (let i = 0; i < thing.length; i += 1) {
						if (i > 0) str += ',';

						if (Object.hasOwn(thing, i)) {
							keys.push(`[${i}]`);
							str += flatten(thing[i]);
							keys.pop();
						} else if (mostly_dense) {
							// Use dense encoding. The heuristic guarantees the
							// array is only mildly sparse, so iterating over every
							// slot is fine.
							str += HOLE;
						} else {
							// Decide between HOLE encoding and sparse encoding.
							//
							// HOLE encoding: each hole is serialized as the HOLE
							// sentinel (-2). For example, [, "a", ,] becomes
							// [-2, 0, -2]. Each hole costs 3 chars ("-2" + comma).
							//
							// Sparse encoding: lists only populated indices.
							// For example, [, "a", ,] becomes [-7, 3, 1, 0] — the
							// -7 sentinel, the array length (3), then index-value
							// pairs. This avoids paying per-hole, but each element
							// costs extra chars to write its index.
							//
							// The values are the same size either way, so the
							// choice comes down to structural overhead:
							//
							//   HOLE overhead:
							//     3 chars per hole ("-2" + comma)
							//     = (L - P) * 3
							//
							//   Sparse overhead:
							//     "-7,"          — 3 chars (sparse sentinel + comma)
							//     + length + "," — (d + 1) chars (array length + comma)
							//     + per element: index + "," — (d + 1) chars
							//     = (4 + d) + P * (d + 1)
							//
							// where L is the array length, P is the number of
							// populated elements, and d is the number of digits
							// in L (an upper bound on the digits in any index).
							//
							// Sparse encoding is cheaper when:
							//   (4 + d) + P * (d + 1) < (L - P) * 3
							const populated_keys = valid_array_indices(/** @type {any[]} */ (thing));
							const population = populated_keys.length;
							const d = String(thing.length).length;

							const hole_cost = (thing.length - population) * 3;
							const sparse_cost = 4 + d + population * (d + 1);

							if (hole_cost > sparse_cost) {
								str = '[' + SPARSE + ',' + thing.length;
								for (let j = 0; j < populated_keys.length; j++) {
									const key = populated_keys[j];
									keys.push(`[${key}]`);
									str += ',' + key + ',' + flatten(thing[key]);
									keys.pop();
								}
								break;
							} else {
								mostly_dense = true;
								str += HOLE;
							}
						}
					}

					str += ']';

					break;
				}

				case 'Set':
					str = '["Set"';

					for (const value of thing) {
						str += `,${flatten(value)}`;
					}

					str += ']';
					break;

				case 'Map':
					str = '["Map"';

					for (const [key, value] of thing) {
						keys.push(`.get(${is_primitive(key) ? stringify_primitive(key) : '...'})`);
						str += `,${flatten(key)},${flatten(value)}`;
						keys.pop();
					}

					str += ']';
					break;

				case 'Int8Array':
				case 'Uint8Array':
				case 'Uint8ClampedArray':
				case 'Int16Array':
				case 'Uint16Array':
				case 'Float16Array':
				case 'Int32Array':
				case 'Uint32Array':
				case 'Float32Array':
				case 'Float64Array':
				case 'BigInt64Array':
				case 'BigUint64Array':
				case 'DataView': {
					/** @type {import("./types.js").TypedArray} */
					const typedArray = thing;
					str = '["' + type + '",' + flatten(typedArray.buffer);

					// handle subarrays
					if (typedArray.byteLength !== typedArray.buffer.byteLength) {
						// to be used with `new TypedArray(buffer, byteOffset, length)`
						str += `,${typedArray.byteOffset},${typedArray.length}`;
					}

					str += ']';
					break;
				}

				case 'ArrayBuffer': {
					/** @type {ArrayBuffer} */
					const arraybuffer = thing;
					const base64 = encode64(arraybuffer);

					str = `["ArrayBuffer","${base64}"]`;
					break;
				}

				case 'Temporal.Duration':
				case 'Temporal.Instant':
				case 'Temporal.PlainDate':
				case 'Temporal.PlainTime':
				case 'Temporal.PlainDateTime':
				case 'Temporal.PlainMonthDay':
				case 'Temporal.PlainYearMonth':
				case 'Temporal.ZonedDateTime':
					str = `["${type}",${stringify_string(thing.toString())}]`;
					break;

				default:
					if (!is_plain_object(thing)) {
						throw new DevalueError(`Cannot stringify arbitrary non-POJOs`, keys, thing, value);
					}

					if (enumerable_symbols(thing).length > 0) {
						throw new DevalueError(`Cannot stringify POJOs with symbolic keys`, keys, thing, value);
					}

					if (Object.getPrototypeOf(thing) === null) {
						str = '["null"';
						for (const key of Object.keys(thing)) {
							if (key === '__proto__') {
								throw new DevalueError(
									`Cannot stringify objects with __proto__ keys`,
									keys,
									thing,
									value
								);
							}

							keys.push(stringify_key(key));
							str += `,${stringify_string(key)},${flatten(thing[key])}`;
							keys.pop();
						}
						str += ']';
					} else {
						str = '{';
						let started = false;
						for (const key of Object.keys(thing)) {
							if (key === '__proto__') {
								throw new DevalueError(
									`Cannot stringify objects with __proto__ keys`,
									keys,
									thing,
									value
								);
							}

							if (started) str += ',';
							started = true;
							keys.push(stringify_key(key));
							str += `${stringify_string(key)}:${flatten(thing[key])}`;
							keys.pop();
						}
						str += '}';
					}
			}
		}

		stringified[index] = str;
		return index;
	}

	const index = flatten(value);

	// special case — value is represented as a negative index
	if (index < 0) return `${index}`;

	return stringified;
}

/**
 * @param {any} thing
 * @returns {string}
 */
function stringify_primitive(thing) {
	const type = typeof thing;
	if (type === 'string') return stringify_string(thing);
	if (thing === void 0) return UNDEFINED.toString();
	if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO.toString();
	if (type === 'bigint') return `["BigInt","${thing}"]`;
	return String(thing);
}

const ACTION_QUERY_PARAMS = {
  actionName: "_action"};
const ACTION_RPC_ROUTE_PATTERN = "/_actions/[...path]";

const __vite_import_meta_env__$1 = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_URL": "http://127.0.0.1:3000", "SITE": undefined, "SSR": true};
const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
const statusToCodeMap = Object.fromEntries(
  Object.entries(codeToStatusMap).map(([key, value]) => [value, key])
);
class ActionError extends Error {
  type = "AstroActionError";
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor(params) {
    super(params.message);
    this.code = params.code;
    this.status = ActionError.codeToStatus(params.code);
    if (params.stack) {
      this.stack = params.stack;
    }
  }
  static codeToStatus(code) {
    return codeToStatusMap[code];
  }
  static statusToCode(status) {
    return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
  }
  static fromJson(body) {
    if (isInputError(body)) {
      return new ActionInputError(body.issues);
    }
    if (isActionError(body)) {
      return new ActionError(body);
    }
    return new ActionError({
      code: "INTERNAL_SERVER_ERROR"
    });
  }
}
function isActionError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
class ActionInputError extends ActionError {
  type = "AstroActionInputError";
  // We don't expose all ZodError properties.
  // Not all properties will serialize from server to client,
  // and we don't want to import the full ZodError object into the client.
  issues;
  fields;
  constructor(issues) {
    super({
      message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
      code: "BAD_REQUEST"
    });
    this.issues = issues;
    this.fields = {};
    for (const issue of issues) {
      if (issue.path.length > 0) {
        const key = issue.path[0].toString();
        this.fields[key] ??= [];
        this.fields[key]?.push(issue.message);
      }
    }
  }
}
function deserializeActionResult(res) {
  if (res.type === "error") {
    let json;
    try {
      json = JSON.parse(res.body);
    } catch {
      return {
        data: void 0,
        error: new ActionError({
          message: res.body,
          code: "INTERNAL_SERVER_ERROR"
        })
      };
    }
    if (Object.assign(__vite_import_meta_env__$1, {})?.PROD) {
      return { error: ActionError.fromJson(json), data: void 0 };
    } else {
      const error = ActionError.fromJson(json);
      error.stack = actionResultErrorStack.get();
      return {
        error,
        data: void 0
      };
    }
  }
  if (res.type === "empty") {
    return { data: void 0, error: void 0 };
  }
  return {
    data: parse(res.body, {
      URL: (href) => new URL(href)
    }),
    error: void 0
  };
}
const actionResultErrorStack = /* @__PURE__ */ (function actionResultErrorStackFn() {
  let errorStack;
  return {
    set(stack) {
      errorStack = stack;
    },
    get() {
      return errorStack;
    }
  };
})();
function getActionQueryString(name) {
  const searchParams = new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name });
  return `?${searchParams.toString()}`;
}

/* es-module-lexer 2.1.0 */
var ImportType;!function(A){A[A.Static=1]="Static",A[A.Dynamic=2]="Dynamic",A[A.ImportMeta=3]="ImportMeta",A[A.StaticSourcePhase=4]="StaticSourcePhase",A[A.DynamicSourcePhase=5]="DynamicSourcePhase",A[A.StaticDeferPhase=6]="StaticDeferPhase",A[A.DynamicDeferPhase=7]="DynamicDeferPhase";}(ImportType||(ImportType={}));1===new Uint8Array(new Uint16Array([1]).buffer)[0];const E=()=>{return A="AGFzbQEAAAABKwhgAX8Bf2AEf39/fwBgAAF/YAAAYAF/AGADf39/AX9gAn9/AX9gA39/fwADODcAAQECAgICAgICAgICAgICAgICAgICAgICAwIAAwMDBAAEAAAABQAAAAAAAwMDAAAGAAcABgIFBAUBcAEBAQUDAQABBg8CfwFBsPIAC38AQbDyAAsHnQEbBm1lbW9yeQIAAnNhAAABZQADAmlzAAQCaWUABQJzcwAGAnNlAAcCaXQACAJhaQAJAmlkAAoCaXAACwJlcwAMAmVlAA0DZWxzAA4DZWxlAA8CcmkAEAJyZQARAWYAEgJtcwATAnJhABQDYWtzABUDYWtlABYDYXZzABcDYXZlABgDcnNhABkFcGFyc2UAGgtfX2hlYXBfYmFzZQMBCrxJN2gBAX9BACAANgL0CUEAKALQCSIBIABBAXRqIgBBADsBAEEAIABBAmoiADYC+AlBACAANgL8CUEAQQA2AtQJQQBBADYC5AlBAEEANgLcCUEAQQA2AtgJQQBBADYC7AlBAEEANgLgCSABC9MBAQN/QQAoAuQJIQRBAEEAKAL8CSIFNgLkCUEAIAQ2AugJQQAgBUEoajYC/AkgBEEkakHUCSAEGyAFNgIAQQAoAsgJIQRBACgCxAkhBiAFIAE2AgAgBSAANgIIIAUgAiACQQJqQQAgBiADRiIAGyAEIANGIgQbNgIMIAUgAzYCFCAFQQA2AhAgBSACNgIEIAVCADcCICAFQQNBAUECIAAbIAQbNgIcIAVBACgCxAkgA0YiAjoAGAJAAkAgAg0AQQAoAsgJIANHDQELQQBBAToAgAoLC14BAX9BACgC7AkiBEEQakHYCSAEG0EAKAL8CSIENgIAQQAgBDYC7AlBACAEQRRqNgL8CUEAQQE6AIAKIARBADYCECAEIAM2AgwgBCACNgIIIAQgATYCBCAEIAA2AgALCABBACgChAoLFQBBACgC3AkoAgBBACgC0AlrQQF1Cx4BAX9BACgC3AkoAgQiAEEAKALQCWtBAXVBfyAAGwsVAEEAKALcCSgCCEEAKALQCWtBAXULHgEBf0EAKALcCSgCDCIAQQAoAtAJa0EBdUF/IAAbCwsAQQAoAtwJKAIcCx4BAX9BACgC3AkoAhAiAEEAKALQCWtBAXVBfyAAGws7AQF/AkBBACgC3AkoAhQiAEEAKALECUcNAEF/DwsCQCAAQQAoAsgJRw0AQX4PCyAAQQAoAtAJa0EBdQsLAEEAKALcCS0AGAsVAEEAKALgCSgCAEEAKALQCWtBAXULFQBBACgC4AkoAgRBACgC0AlrQQF1Cx4BAX9BACgC4AkoAggiAEEAKALQCWtBAXVBfyAAGwseAQF/QQAoAuAJKAIMIgBBACgC0AlrQQF1QX8gABsLJQEBf0EAQQAoAtwJIgBBJGpB1AkgABsoAgAiADYC3AkgAEEARwslAQF/QQBBACgC4AkiAEEQakHYCSAAGygCACIANgLgCSAAQQBHCwgAQQAtAIgKCwgAQQAtAIAKCysBAX9BAEEAKAKMCiIAQRBqQQAoAtwJQSBqIAAbKAIAIgA2AowKIABBAEcLFQBBACgCjAooAgBBACgC0AlrQQF1CxUAQQAoAowKKAIEQQAoAtAJa0EBdQsVAEEAKAKMCigCCEEAKALQCWtBAXULFQBBACgCjAooAgxBACgC0AlrQQF1CwoAQQBBADYCjAoLuw8BBX8jAEGA0ABrIgAkAEEAQQE6AIgKQQBBACgCzAk2ApQKQQBBACgC0AlBfmoiATYCqApBACABQQAoAvQJQQF0aiICNgKsCkEAQQA6AIAKQQBBADsBkApBAEEAOwGSCkEAQQA6AJgKQQBBADYChApBAEEAOgDwCUEAIABBgBBqNgKcCkEAIAA2AqAKQQBBADoApAoCQAJAAkACQANAQQAgAUECaiIDNgKoCiABIAJPDQECQCADLwEAIgJBd2pBBUkNAAJAAkACQAJAAkAgAkGbf2oOBQEICAgCAAsgAkEgRg0EIAJBL0YNAyACQTtGDQIMBwtBAC8BkgoNASADEBtFDQEgAUEEakGCCEEKEDYNARAcQQAtAIgKDQFBAEEAKAKoCiIBNgKUCgwHCyADEBtFDQAgAUEEakGMCEEKEDYNABAdC0EAQQAoAqgKNgKUCgwBCwJAIAEvAQQiA0EqRg0AIANBL0cNBBAeDAELQQEQHwtBACgCrAohAkEAKAKoCiEBDAALC0EAIQIgAyEBQQAtAPAJDQIMAQtBACABNgKoCkEAQQA6AIgKCwNAQQAgAUECaiIDNgKoCgJAAkACQAJAAkACQAJAIAFBACgCrApPDQACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCADLwEAIgJBYGoOEBMSCRISEhIIAQUSEgQSEgoACwJAAkACQAJAIAJBpX9qDg8FFQYVFQ4VFQMVARUVFQIACyACQXdqQQVJDRUgAkGFf2oOAwgUCRQLQQAvAZIKDRMgAxAbRQ0TIAFBBGpBgghBChA2DRMQHAwTCyADEBtFDRIgAUEEakGMCEEKEDYNEhAdDBILIAMQG0UNESABKQAEQuyAhIOwjsA5Ug0RIAEvAQwiA0F3aiIBQRdLDQ9BASABdEGfgIAEcUUNDwwQC0EAQQAvAZIKIgFBAWo7AZIKQQAoApwKIAFBA3RqIgFBATYCACABQQAoApQKNgIEDBALQQBBAC8BkgoiAUEBajsBkgpBACgCnAogAUEDdGoiAUEINgIAIAFBACgClAo2AgQMDwtBAC8BkgoiAUUNC0EAIAFBf2o7AZIKDA4LQQAvAZAKIgNFDQ1BAC8BkgoiAkUNDSACQQN0QQAoApwKakF4aigCAEEFRw0NIANBAnRBACgCoApqQXxqKAIAIgMoAgQNDUEAIAFBBGo2AqgKIANBACgClApBAmo2AgRBARAgGiADQQAoAqgKIgE2AhBBACABQX5qNgKoCgwNC0EALwGSCiIDRQ0JQQAgA0F/aiIDOwGSCkEALwGQCiICRQ0MQQAoApwKIANB//8DcUEDdGooAgBBBUcNDAJAIAJBAnRBACgCoApqQXxqKAIAIgMoAgQNACADQQAoApQKQQJqNgIEC0EAIAJBf2o7AZAKIAMgAUEEajYCDAwMCwJAQQAoApQKIgEvAQBBKUcNAEEAKALkCSIDRQ0AIAMoAgQgAUcNAEEAQQAoAugJIgM2AuQJAkAgA0UNACADQQA2AiQMAQtBAEEANgLUCQtBAEEALwGSCiIDQQFqOwGSCkEAKAKcCiADQQN0aiIDQQZBAkEALQCkChs2AgAgAyABNgIEQQBBADoApAoMCwtBAC8BkgoiAUUNB0EAIAFBf2oiATsBkgpBACgCnAogAUH//wNxQQN0aigCAEEERg0EDAoLQScQIQwJC0EiECEMCAsCQAJAIAEvAQQiAUEqRg0AIAFBL0cNARAeDAoLQQEQHwwJCwJAAkACQAJAQQAoApQKIgEvAQAiAxAiRQ0AAkACQCADQVVqDgQACQEDCQsgAUF+ai8BAEErRg0DDAgLIAFBfmovAQBBLUYNAgwHCyADQSlHDQFBACgCnApBAC8BkgoiAkEDdGooAgQQI0UNAgwGCyABQX5qLwEAQVBqQf//A3FBCk8NBQtBAC8BkgohAgsCQAJAIAJB//8DcSICRQ0AIANB5gBHDQBBACgCnAogAkF/akEDdGoiBCgCAEEBRw0AIAFBfmovAQBB7wBHDQEgAUF8ahAkRQ0BIAQoAgRBlghBAxAlRQ0BDAULIANB/QBHDQBBACgCnAogAkEDdGoiAigCBBAmDQQgAigCAEEGRg0ECyABECcNAyADRQ0DIANBL0ZBAC0AmApBAEdxDQMCQEEAKALsCSICRQ0AIAEgAigCAEkNACABIAIoAgRNDQQLIAFBfmohAUEAKALQCSECAkADQCABQQJqIgQgAk0NAUEAIAE2ApQKIAEvAQAhAyABQX5qIgQhASADEChFDQALIARBAmohBAsCQCADQf//A3EQKUUNACAEQX5qIQECQANAIAFBAmoiAyACTQ0BQQAgATYClAogAS8BACEDIAFBfmoiBCEBIAMQKQ0ACyAEQQJqIQMLIAMQKg0EC0EAQQE6AJgKDAcLQQAoApwKQQAvAZIKIgFBA3QiA2pBACgClAo2AgRBACABQQFqOwGSCkEAKAKcCiADakEDNgIACxArDAULQQAtAPAJQQAvAZAKQQAvAZIKcnJFIQIMBwsQLEEAQQA6AJgKDAMLEC1BACECDAULIANBoAFHDQELQQBBAToApAoLQQBBACgCqAo2ApQKC0EAKAKoCiEBDAALCyAAQYDQAGokACACCxoAAkBBACgC0AkgAEcNAEEBDwsgAEF+ahAuC/4KAQZ/QQBBACgCqAoiAEEMaiIBNgKoCkEAKALsCSECQQEQICEDAkACQAJAAkACQAJAAkACQAJAQQAoAqgKIgQgAUcNACADEC9FDQELAkACQAJAAkACQAJAAkAgA0EqRg0AIANB+wBHDQFBACAEQQJqNgKoCkEBECAhA0EAKAKoCiEEA0ACQAJAIANB//8DcSIDQSJGDQAgA0EnRg0AIAMQMxpBACgCqAohAwwBCyADECFBAEEAKAKoCkECaiIDNgKoCgtBARAgGgJAIAQgAxA0IgNBLEcNAEEAQQAoAqgKQQJqNgKoCkEBECAhAwsgA0H9AEYNA0EAKAKoCiIFIARGDQ8gBSEEIAVBACgCrApNDQAMDwsLQQAgBEECajYCqApBARAgGkEAKAKoCiIDIAMQNBoMAgtBAEEAOgCICgJAAkACQAJAAkACQCADQZ9/ag4MAgsEAQsDCwsLCwsFAAsgA0H2AEYNBAwKC0EAIARBDmoiAzYCqAoCQAJAAkBBARAgQZ9/ag4GABICEhIBEgtBACgCqAoiBSkAAkLzgOSD4I3AMVINESAFLwEKEClFDRFBACAFQQpqNgKoCkEAECAaC0EAKAKoCiIFQQJqQbIIQQ4QNg0QIAUvARAiAkF3aiIBQRdLDQ1BASABdEGfgIAEcUUNDQwOC0EAKAKoCiIFKQACQuyAhIOwjsA5Ug0PIAUvAQoiAkF3aiIBQRdNDQYMCgtBACAEQQpqNgKoCkEAECAaQQAoAqgKIQQLQQAgBEEQajYCqAoCQEEBECAiBEEqRw0AQQBBACgCqApBAmo2AqgKQQEQICEEC0EAKAKoCiEDIAQQMxogA0EAKAKoCiIEIAMgBBACQQBBACgCqApBfmo2AqgKDwsCQCAEKQACQuyAhIOwjsA5Ug0AIAQvAQoQKEUNAEEAIARBCmo2AqgKQQEQICEEQQAoAqgKIQMgBBAzGiADQQAoAqgKIgQgAyAEEAJBAEEAKAKoCkF+ajYCqAoPC0EAIARBBGoiBDYCqAoLQQAgBEEGajYCqApBAEEAOgCICkEBECAhBEEAKAKoCiEDIAQQMyEEQQAoAqgKIQIgBEHf/wNxIgFB2wBHDQNBACACQQJqNgKoCkEBECAhBUEAKAKoCiEDQQAhBAwEC0EAQQE6AIAKQQBBACgCqApBAmo2AqgKC0EBECAhBEEAKAKoCiEDAkAgBEHmAEcNACADQQJqQawIQQYQNg0AQQAgA0EIajYCqAogAEEBECBBABAyIAJBEGpB2AkgAhshAwNAIAMoAgAiA0UNBSADQgA3AgggA0EQaiEDDAALC0EAIANBfmo2AqgKDAMLQQEgAXRBn4CABHFFDQMMBAtBASEECwNAAkACQCAEDgIAAQELIAVB//8DcRAzGkEBIQQMAQsCQAJAQQAoAqgKIgQgA0YNACADIAQgAyAEEAJBARAgIQQCQCABQdsARw0AIARBIHJB/QBGDQQLQQAoAqgKIQMCQCAEQSxHDQBBACADQQJqNgKoCkEBECAhBUEAKAKoCiEDIAVBIHJB+wBHDQILQQAgA0F+ajYCqAoLIAFB2wBHDQJBACACQX5qNgKoCg8LQQAhBAwACwsPCyACQaABRg0AIAJB+wBHDQQLQQAgBUEKajYCqApBARAgIgVB+wBGDQMMAgsCQCACQVhqDgMBAwEACyACQaABRw0CC0EAIAVBEGo2AqgKAkBBARAgIgVBKkcNAEEAQQAoAqgKQQJqNgKoCkEBECAhBQsgBUEoRg0BC0EAKAKoCiEBIAUQMxpBACgCqAoiBSABTQ0AIAQgAyABIAUQAkEAQQAoAqgKQX5qNgKoCg8LIAQgA0EAQQAQAkEAIARBDGo2AqgKDwsQLQuFDAEKf0EAQQAoAqgKIgBBDGoiATYCqApBARAgIQJBACgCqAohAwJAAkACQAJAAkACQAJAAkAgAkEuRw0AQQAgA0ECajYCqAoCQEEBECAiAkHkAEYNAAJAIAJB8wBGDQAgAkHtAEcNB0EAKAKoCiICQQJqQZwIQQYQNg0HAkBBACgClAoiAxAxDQAgAy8BAEEuRg0ICyAAIAAgAkEIakEAKALICRABDwtBACgCqAoiAkECakGiCEEKEDYNBgJAQQAoApQKIgMQMQ0AIAMvAQBBLkYNBwtBACEEQQAgAkEMajYCqApBASEFQQUhBkEBECAhAkEAIQdBASEIDAILQQAoAqgKIgIpAAJC5YCYg9CMgDlSDQUCQEEAKAKUCiIDEDENACADLwEAQS5GDQYLQQAhBEEAIAJBCmo2AqgKQQIhCEEHIQZBASEHQQEQICECQQEhBQwBCwJAAkACQAJAIAJB8wBHDQAgAyABTQ0AIANBAmpBoghBChA2DQACQCADLwEMIgRBd2oiB0EXSw0AQQEgB3RBn4CABHENAgsgBEGgAUYNAQtBACEHQQchBkEBIQQgAkHkAEYNAQwCC0EAIQRBACADQQxqIgI2AqgKQQEhBUEBECAhCQJAQQAoAqgKIgYgAkYNAEHmACECAkAgCUHmAEYNAEEFIQZBACEHQQEhCCAJIQIMBAtBACEHQQEhCCAGQQJqQawIQQYQNg0EIAYvAQgQKEUNBAtBACEHQQAgAzYCqApBByEGQQEhBEEAIQVBACEIIAkhAgwCCyADIABBCmpNDQBBACEIQeQAIQICQCADKQACQuWAmIPQjIA5Ug0AAkACQCADLwEKIgRBd2oiB0EXSw0AQQEgB3RBn4CABHENAQtBACEIIARBoAFHDQELQQAhBUEAIANBCmo2AqgKQSohAkEBIQdBAiEIQQEQICIJQSpGDQRBACADNgKoCkEBIQRBACEHQQAhCCAJIQIMAgsgAyEGQQAhBwwCC0EAIQVBACEICwJAIAJBKEcNAEEAKAKcCkEALwGSCiICQQN0aiIDQQAoAqgKNgIEQQAgAkEBajsBkgogA0EFNgIAQQAoApQKLwEAQS5GDQRBAEEAKAKoCiIDQQJqNgKoCkEBECAhAiAAQQAoAqgKQQAgAxABAkACQCAFDQBBACgC5AkhAQwBC0EAKALkCSIBIAY2AhwLQQBBAC8BkAoiA0EBajsBkApBACgCoAogA0ECdGogATYCAAJAIAJBIkYNACACQSdGDQBBAEEAKAKoCkF+ajYCqAoPCyACECFBAEEAKAKoCkECaiICNgKoCgJAAkACQEEBECBBV2oOBAECAgACC0EAQQAoAqgKQQJqNgKoCkEBECAaQQAoAuQJIgMgAjYCBCADQQE6ABggA0EAKAKoCiICNgIQQQAgAkF+ajYCqAoPC0EAKALkCSIDIAI2AgQgA0EBOgAYQQBBAC8BkgpBf2o7AZIKIANBACgCqApBAmo2AgxBAEEALwGQCkF/ajsBkAoPC0EAQQAoAqgKQX5qNgKoCg8LAkAgBEEBcyACQfsAR3INAEEAKAKoCiECQQAvAZIKDQUDQAJAAkACQCACQQAoAqwKTw0AQQEQICICQSJGDQEgAkEnRg0BIAJB/QBHDQJBAEEAKAKoCkECajYCqAoLQQEQICEDQQAoAqgKIQICQCADQeYARw0AIAJBAmpBrAhBBhA2DQcLQQAgAkEIajYCqAoCQEEBECAiAkEiRg0AIAJBJ0cNBwsgACACQQAQMg8LIAIQIQtBAEEAKAKoCkECaiICNgKoCgwACwsCQAJAIAJBWWoOBAMBAQMACyACQSJGDQILQQAoAqgKIQYLIAYgAUcNAEEAIABBCmo2AqgKDwsgAkEqRyAHcQ0DQQAvAZIKQf//A3ENA0EAKAKoCiECQQAoAqwKIQEDQCACIAFPDQECQAJAIAIvAQAiA0EnRg0AIANBIkcNAQsgACADIAgQMg8LQQAgAkECaiICNgKoCgwACwsQLQsPC0EAIAJBfmo2AqgKDwtBAEEAKAKoCkF+ajYCqAoLRwEDf0EAKAKoCkECaiEAQQAoAqwKIQECQANAIAAiAkF+aiABTw0BIAJBAmohACACLwEAQXZqDgQBAAABAAsLQQAgAjYCqAoLmAEBA39BAEEAKAKoCiIBQQJqNgKoCiABQQZqIQFBACgCrAohAgNAAkACQAJAIAFBfGogAk8NACABQX5qLwEAIQMCQAJAIAANACADQSpGDQEgA0F2ag4EAgQEAgQLIANBKkcNAwsgAS8BAEEvRw0CQQAgAUF+ajYCqAoMAQsgAUF+aiEBC0EAIAE2AqgKDwsgAUECaiEBDAALC5wBAQN/QQAoAqgKIQECQANAAkACQCABLwEAIgJBL0cNAAJAIAEvAQIiAUEqRg0AIAFBL0cNBBAeDAILIAAQHwwBCwJAAkAgAEUNACACQXdqIgFBF0sNAUEBIAF0QZ+AgARxRQ0BDAILIAIQKUUNAwwBCyACQaABRw0CC0EAQQAoAqgKIgNBAmoiATYCqAogA0EAKAKsCkkNAAsLIAILiAEBBH9BACgCqAohAUEAKAKsCiECAkACQANAIAEiA0ECaiEBIAMgAk8NASABLwEAIgQgAEYNAgJAIARB3ABGDQAgBEF2ag4EAgEBAgELIANBBGohASADLwEEQQ1HDQAgA0EGaiABIAMvAQZBCkYbIQEMAAsLQQAgATYCqAoQLQ8LQQAgATYCqAoLbAEBfwJAAkAgAEFfaiIBQQVLDQBBASABdEExcQ0BCyAAQUZqQf//A3FBBkkNACAAQSlHIABBWGpB//8DcUEHSXENAAJAIABBpX9qDgQBAAABAAsgAEH9AEcgAEGFf2pB//8DcUEESXEPC0EBCy4BAX9BASEBAkAgAEGcCUEFECUNACAAQZYIQQMQJQ0AIABBpglBAhAlIQELIAELygEBAn8CQAJAIAAvAQAiAUF3akEFSQ0AIAFBIEYNACABQSlGDQAgAUHdAEYNACABQaABRg0AQQAhAiABQf0ARw0BC0EAKALQCSECAkACQANAIAAvAQAhASAAIAJNDQECQCABQXdqQQVJDQAgAUEgRg0AIAFBoAFGDQACQCABQSlGDQAgAUHdAEYNACABQf0ARw0EC0EBDwsgAEF+aiEADAALC0EBIQIgAUEpRg0BIAFB3QBGDQEgAUH9AEYNAQsgARAvQQFzIQILIAILRgEDf0EAIQMCQCAAIAJBAXQiAmsiBEECaiIAQQAoAtAJIgVJDQAgACABIAIQNg0AAkAgACAFRw0AQQEPCyAEEC4hAwsgAwuDAQECf0EBIQECQAJAAkACQAJAAkAgAC8BACICQUVqDgQFBAQBAAsCQCACQZt/ag4EAwQEAgALIAJBKUYNBCACQfkARw0DIABBfmpBsglBBhAlDwsgAEF+ai8BAEE9Rg8LIABBfmpBqglBBBAlDwsgAEF+akG+CUEDECUPC0EAIQELIAELtAMBAn9BACEBAkACQAJAAkACQAJAAkACQAJAAkAgAC8BAEGcf2oOFAABAgkJCQkDCQkEBQkJBgkHCQkICQsCQAJAIABBfmovAQBBl39qDgQACgoBCgsgAEF8akHACEECECUPCyAAQXxqQcQIQQMQJQ8LAkACQAJAIABBfmovAQBBjX9qDgMAAQIKCwJAIABBfGovAQAiAkHhAEYNACACQewARw0KIABBempB5QAQMA8LIABBempB4wAQMA8LIABBfGpByghBBBAlDwsgAEF8akHSCEEGECUPCyAAQX5qLwEAQe8ARw0GIABBfGovAQBB5QBHDQYCQCAAQXpqLwEAIgJB8ABGDQAgAkHjAEcNByAAQXhqQd4IQQYQJQ8LIABBeGpB6ghBAhAlDwsgAEF+akHuCEEEECUPC0EBIQEgAEF+aiIAQekAEDANBCAAQfYIQQUQJQ8LIABBfmpB5AAQMA8LIABBfmpBgAlBBxAlDwsgAEF+akGOCUEEECUPCwJAIABBfmovAQAiAkHvAEYNACACQeUARw0BIABBfGpB7gAQMA8LIABBfGpBlglBAxAlIQELIAELNAEBf0EBIQECQCAAQXdqQf//A3FBBUkNACAAQYABckGgAUYNACAAQS5HIAAQL3EhAQsgAQswAQF/AkACQCAAQXdqIgFBF0sNAEEBIAF0QY2AgARxDQELIABBoAFGDQBBAA8LQQELTgECf0EAIQECQAJAIAAvAQAiAkHlAEYNACACQesARw0BIABBfmpB7ghBBBAlDwsgAEF+ai8BAEH1AEcNACAAQXxqQdIIQQYQJSEBCyABC94BAQR/QQAoAqgKIQBBACgCrAohAQJAAkACQANAIAAiAkECaiEAIAIgAU8NAQJAAkACQCAALwEAIgNBpH9qDgUCAwMDAQALIANBJEcNAiACLwEEQfsARw0CQQAgAkEEaiIANgKoCkEAQQAvAZIKIgJBAWo7AZIKQQAoApwKIAJBA3RqIgJBBDYCACACIAA2AgQPC0EAIAA2AqgKQQBBAC8BkgpBf2oiADsBkgpBACgCnAogAEH//wNxQQN0aigCAEEDRw0DDAQLIAJBBGohAAwACwtBACAANgKoCgsQLQsLcAECfwJAAkADQEEAQQAoAqgKIgBBAmoiATYCqAogAEEAKAKsCk8NAQJAAkACQCABLwEAIgFBpX9qDgIBAgALAkAgAUF2ag4EBAMDBAALIAFBL0cNAgwECxA1GgwBC0EAIABBBGo2AqgKDAALCxAtCws1AQF/QQBBAToA8AlBACgCqAohAEEAQQAoAqwKQQJqNgKoCkEAIABBACgC0AlrQQF1NgKECgtDAQJ/QQEhAQJAIAAvAQAiAkF3akH//wNxQQVJDQAgAkGAAXJBoAFGDQBBACEBIAIQL0UNACACQS5HIAAQMXIPCyABC2gBAn9BASEBAkACQCAAQV9qIgJBBUsNAEEBIAJ0QTFxDQELIABB+P8DcUEoRg0AIABBRmpB//8DcUEGSQ0AAkAgAEGlf2oiAkEDSw0AIAJBAUcNAQsgAEGFf2pB//8DcUEESSEBCyABCz0BAn9BACECAkBBACgC0AkiAyAASw0AIAAvAQAgAUcNAAJAIAMgAEcNAEEBDwsgAEF+ai8BABAoIQILIAILMQEBf0EAIQECQCAALwEAQS5HDQAgAEF+ai8BAEEuRw0AIABBfGovAQBBLkYhAQsgAQvbBAEFfwJAIAFBIkYNACABQSdGDQAQLQ8LQQAoAqgKIQMgARAhIAAgA0ECakEAKAKoCkEAKALECRABAkAgAkEBSA0AQQAoAuQJQQRBBiACQQFGGzYCHAtBAEEAKAKoCkECajYCqApBABAgIQJBACgCqAohAQJAAkAgAkH3AEcNACABLwECQekARw0AIAEvAQRB9ABHDQAgAS8BBkHoAEYNAQtBACABQX5qNgKoCg8LQQAgAUEIajYCqAoCQEEBECBB+wBGDQBBACABNgKoCg8LQQAoAqgKIgQhA0EAIQADQEEAIANBAmo2AqgKAkACQAJAAkBBARAgIgJBJ0cNAEEAKAKoCiEFQScQIUEAKAKoCkECaiEDDAELQQAoAqgKIQUgAkEiRw0BQSIQIUEAKAKoCkECaiEDC0EAIAM2AqgKQQEQICECDAELIAIQMyECQQAoAqgKIQMLAkAgAkE6Rg0AQQAgATYCqAoPC0EAQQAoAqgKQQJqNgKoCgJAQQEQICICQSJGDQAgAkEnRg0AQQAgATYCqAoPC0EAKAKoCiEGIAIQIUEAQQAoAvwJIgJBFGo2AvwJQQAoAqgKIQcgAiAFNgIAIAJBADYCECACIAY2AgggAiADNgIEIAIgB0ECajYCDEEAQQAoAqgKQQJqNgKoCiAAQRBqQQAoAuQJQSBqIAAbIAI2AgACQAJAQQEQICIAQSxGDQAgAEH9AEYNAUEAIAE2AqgKDwtBAEEAKAKoCkECaiIDNgKoCiACIQAMAQsLQQAoAuQJIgEgBDYCECABQQAoAqgKQQJqNgIMC20BAn8CQAJAA0ACQCAAQf//A3EiAUF3aiICQRdLDQBBASACdEGfgIAEcQ0CCyABQaABRg0BIAAhAiABEC8NAkEAIQJBAEEAKAKoCiIAQQJqNgKoCiAALwECIgANAAwCCwsgACECCyACQf//A3ELqwEBBH8CQAJAQQAoAqgKIgIvAQAiA0HhAEYNACABIQQgACEFDAELQQAgAkEEajYCqApBARAgIQJBACgCqAohBQJAAkAgAkEiRg0AIAJBJ0YNACACEDMaQQAoAqgKIQQMAQsgAhAhQQBBACgCqApBAmoiBDYCqAoLQQEQICEDQQAoAqgKIQILAkAgAiAFRg0AIAUgBEEAIAAgACABRiICG0EAIAEgAhsQAgsgAwtyAQR/QQAoAqgKIQBBACgCrAohAQJAAkADQCAAQQJqIQIgACABTw0BAkACQCACLwEAIgNBpH9qDgIBBAALIAIhACADQXZqDgQCAQECAQsgAEEEaiEADAALC0EAIAI2AqgKEC1BAA8LQQAgAjYCqApB3QALSQEDf0EAIQMCQCACRQ0AAkADQCAALQAAIgQgAS0AACIFRw0BIAFBAWohASAAQQFqIQAgAkF/aiICDQAMAgsLIAQgBWshAwsgAwsL4gECAEGACAvEAQAAeABwAG8AcgB0AG0AcABvAHIAdABmAG8AcgBlAHQAYQBvAHUAcgBjAGUAcgBvAG0AdQBuAGMAdABpAG8AbgB2AG8AeQBpAGUAZABlAGwAZQBjAG8AbgB0AGkAbgBpAG4AcwB0AGEAbgB0AHkAYgByAGUAYQByAGUAdAB1AHIAZABlAGIAdQBnAGcAZQBhAHcAYQBpAHQAaAByAHcAaABpAGwAZQBpAGYAYwBhAHQAYwBmAGkAbgBhAGwAbABlAGwAcwAAQcQJCxABAAAAAgAAAAAEAAAwOQAA","undefined"!=typeof Buffer?Buffer.from(A,"base64"):Uint8Array.from(atob(A),(A=>A.charCodeAt(0)));var A;};WebAssembly.compile(E()).then(WebAssembly.instantiate).then((({exports:A})=>{}));

async function readBodyWithLimit(request, limit) {
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = Number.parseInt(contentLengthHeader, 10);
    if (Number.isFinite(contentLength) && contentLength > limit) {
      throw new BodySizeLimitError(limit);
    }
  }
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks = [];
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      received += value.byteLength;
      if (received > limit) {
        throw new BodySizeLimitError(limit);
      }
      chunks.push(value);
    }
  }
  const buffer = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return buffer;
}
class BodySizeLimitError extends Error {
  limit;
  constructor(limit) {
    super(`Request body exceeds the configured limit of ${limit} bytes`);
    this.name = "BodySizeLimitError";
    this.limit = limit;
  }
}

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_URL": "http://127.0.0.1:3000", "SITE": undefined, "SSR": true};
function getActionContext(context) {
  const callerInfo = getCallerInfo(context);
  const actionResultAlreadySet = Boolean(context.locals._actionPayload);
  let action = void 0;
  if (callerInfo && context.request.method === "POST" && !actionResultAlreadySet) {
    action = {
      calledFrom: callerInfo.from,
      name: callerInfo.name,
      handler: async () => {
        const pipeline = Reflect.get(context, pipelineSymbol);
        const callerInfoName = shouldAppendForwardSlash(
          pipeline.manifest.trailingSlash,
          pipeline.manifest.buildFormat
        ) ? removeTrailingForwardSlash(callerInfo.name) : callerInfo.name;
        let baseAction;
        try {
          baseAction = await pipeline.getAction(callerInfoName);
        } catch (error) {
          if (error instanceof Error && "name" in error && typeof error.name === "string" && error.name === ActionNotFoundError.name) {
            return { data: void 0, error: new ActionError({ code: "NOT_FOUND" }) };
          }
          throw error;
        }
        const bodySizeLimit = pipeline.manifest.actionBodySizeLimit;
        let input;
        try {
          input = await parseRequestBody(context.request, bodySizeLimit);
        } catch (e) {
          if (e instanceof ActionError) {
            return { data: void 0, error: e };
          }
          if (e instanceof TypeError) {
            return { data: void 0, error: new ActionError({ code: "UNSUPPORTED_MEDIA_TYPE" }) };
          }
          throw e;
        }
        const omitKeys = ["props", "getActionResult", "callAction", "redirect"];
        const actionAPIContext = Object.create(
          Object.getPrototypeOf(context),
          Object.fromEntries(
            Object.entries(Object.getOwnPropertyDescriptors(context)).filter(
              ([key]) => !omitKeys.includes(key)
            )
          )
        );
        Reflect.set(actionAPIContext, ACTION_API_CONTEXT_SYMBOL, true);
        const handler = baseAction.bind(actionAPIContext);
        return handler(input);
      }
    };
  }
  function setActionResult(actionName, actionResult) {
    context.locals._actionPayload = {
      actionResult,
      actionName
    };
  }
  return {
    action,
    setActionResult,
    serializeActionResult,
    deserializeActionResult
  };
}
function getCallerInfo(ctx) {
  if (ctx.routePattern === ACTION_RPC_ROUTE_PATTERN) {
    return { from: "rpc", name: ctx.url.pathname.replace(/^.*\/_actions\//, "") };
  }
  const queryParam = ctx.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
  if (queryParam) {
    return { from: "form", name: queryParam };
  }
  return void 0;
}
async function parseRequestBody(request, bodySizeLimit) {
  const contentType = request.headers.get("content-type");
  const contentLengthHeader = request.headers.get("content-length");
  const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : void 0;
  const hasContentLength = typeof contentLength === "number" && Number.isFinite(contentLength);
  if (!contentType) return void 0;
  if (hasContentLength && contentLength > bodySizeLimit) {
    throw new ActionError({
      code: "CONTENT_TOO_LARGE",
      message: `Request body exceeds ${bodySizeLimit} bytes`
    });
  }
  try {
    if (hasContentType(contentType, formContentTypes$1)) {
      if (!hasContentLength) {
        const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
        const formRequest = new Request(request.url, {
          method: request.method,
          headers: request.headers,
          body: toArrayBuffer(body)
        });
        return await formRequest.formData();
      }
      return await request.clone().formData();
    }
    if (hasContentType(contentType, ["application/json"])) {
      if (contentLength === 0) return void 0;
      if (!hasContentLength) {
        const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
        if (body.byteLength === 0) return void 0;
        return JSON.parse(new TextDecoder().decode(body));
      }
      return await request.clone().json();
    }
  } catch (e) {
    if (e instanceof BodySizeLimitError) {
      throw new ActionError({
        code: "CONTENT_TOO_LARGE",
        message: `Request body exceeds ${bodySizeLimit} bytes`
      });
    }
    throw e;
  }
  throw new TypeError("Unsupported content type");
}
const ACTION_API_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("astro.actionAPIContext");
const formContentTypes$1 = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
  const type = contentType.split(";")[0].toLowerCase();
  return expected.some((t) => type === t);
}
function serializeActionResult(res) {
  if (res.error) {
    if (Object.assign(__vite_import_meta_env__, {})?.DEV) {
      actionResultErrorStack.set(res.error.stack);
    }
    let body2;
    if (res.error instanceof ActionInputError) {
      body2 = {
        type: res.error.type,
        issues: res.error.issues,
        fields: res.error.fields
      };
    } else {
      body2 = {
        ...res.error,
        message: res.error.message
      };
    }
    return {
      type: "error",
      status: res.error.status,
      contentType: "application/json",
      body: JSON.stringify(body2)
    };
  }
  if (res.data === void 0) {
    return {
      type: "empty",
      status: 204
    };
  }
  let body;
  try {
    body = stringify$2(res.data, {
      // Add support for URL objects
      URL: (value) => value instanceof URL && value.href
    });
  } catch (e) {
    let hint = ActionsReturnedInvalidDataError.hint;
    if (res.data instanceof Response) {
      hint = REDIRECT_STATUS_CODES.includes(res.data.status) ? "If you need to redirect when the action succeeds, trigger a redirect where the action is called. See the Actions guide for server and client redirect examples: https://docs.astro.build/en/guides/actions." : "If you need to return a Response object, try using a server endpoint instead. See https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes";
    }
    throw new AstroError({
      ...ActionsReturnedInvalidDataError,
      message: ActionsReturnedInvalidDataError.message(String(e)),
      hint
    });
  }
  return {
    type: "data",
    status: 200,
    contentType: "application/json+devalue",
    body
  };
}
function toArrayBuffer(buffer) {
  const copy = new Uint8Array(buffer.byteLength);
  copy.set(buffer);
  return copy.buffer;
}

function hasActionPayload(locals) {
  return "_actionPayload" in locals;
}
function createGetActionResult(locals) {
  return (actionFn) => {
    if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) {
      return void 0;
    }
    return deserializeActionResult(locals._actionPayload.actionResult);
  };
}
function createCallAction(context) {
  return (baseAction, input) => {
    Reflect.set(context, ACTION_API_CONTEXT_SYMBOL, true);
    const action = baseAction.bind(context);
    return action(input);
  };
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var dist = {};

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	Object.defineProperty(dist, "__esModule", { value: true });
	dist.parseCookie = parseCookie;
	dist.parse = parseCookie;
	dist.stringifyCookie = stringifyCookie;
	dist.stringifySetCookie = stringifySetCookie;
	dist.serialize = stringifySetCookie;
	dist.parseSetCookie = parseSetCookie;
	dist.stringifySetCookie = stringifySetCookie;
	dist.serialize = stringifySetCookie;
	/**
	 * RegExp to match cookie-name in RFC 6265 sec 4.1.1
	 * This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
	 * which has been replaced by the token definition in RFC 7230 appendix B.
	 *
	 * cookie-name       = token
	 * token             = 1*tchar
	 * tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
	 *                     "*" / "+" / "-" / "." / "^" / "_" /
	 *                     "`" / "|" / "~" / DIGIT / ALPHA
	 *
	 * Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191
	 * Allow same range as cookie value, except `=`, which delimits end of name.
	 */
	const cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
	/**
	 * RegExp to match cookie-value in RFC 6265 sec 4.1.1
	 *
	 * cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
	 * cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
	 *                     ; US-ASCII characters excluding CTLs,
	 *                     ; whitespace DQUOTE, comma, semicolon,
	 *                     ; and backslash
	 *
	 * Allowing more characters: https://github.com/jshttp/cookie/issues/191
	 * Comma, backslash, and DQUOTE are not part of the parsing algorithm.
	 */
	const cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
	/**
	 * RegExp to match domain-value in RFC 6265 sec 4.1.1
	 *
	 * domain-value      = <subdomain>
	 *                     ; defined in [RFC1034], Section 3.5, as
	 *                     ; enhanced by [RFC1123], Section 2.1
	 * <subdomain>       = <label> | <subdomain> "." <label>
	 * <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
	 *                     Labels must be 63 characters or less.
	 *                     'let-dig' not 'letter' in the first char, per RFC1123
	 * <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
	 * <let-dig-hyp>     = <let-dig> | "-"
	 * <let-dig>         = <letter> | <digit>
	 * <letter>          = any one of the 52 alphabetic characters A through Z in
	 *                     upper case and a through z in lower case
	 * <digit>           = any one of the ten digits 0 through 9
	 *
	 * Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
	 *
	 * > (Note that a leading %x2E ("."), if present, is ignored even though that
	 * character is not permitted, but a trailing %x2E ("."), if present, will
	 * cause the user agent to ignore the attribute.)
	 */
	const domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
	/**
	 * RegExp to match path-value in RFC 6265 sec 4.1.1
	 *
	 * path-value        = <any CHAR except CTLs or ";">
	 * CHAR              = %x01-7F
	 *                     ; defined in RFC 5234 appendix B.1
	 */
	const pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
	/**
	 * RegExp to match max-age-value in RFC 6265 sec 5.6.2
	 */
	const maxAgeRegExp = /^-?\d+$/;
	const __toString = Object.prototype.toString;
	const NullObject = /* @__PURE__ */ (() => {
	    const C = function () { };
	    C.prototype = Object.create(null);
	    return C;
	})();
	/**
	 * Parse a `Cookie` header.
	 *
	 * Parse the given cookie header string into an object
	 * The object has the various cookies as keys(names) => values
	 */
	function parseCookie(str, options) {
	    const obj = new NullObject();
	    const len = str.length;
	    // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name consists of one char minimum, plus '='.
	    if (len < 2)
	        return obj;
	    const dec = options?.decode || decode;
	    let index = 0;
	    do {
	        const eqIdx = eqIndex(str, index, len);
	        if (eqIdx === -1)
	            break; // No more cookie pairs.
	        const endIdx = endIndex(str, index, len);
	        if (eqIdx > endIdx) {
	            // backtrack on prior semicolon
	            index = str.lastIndexOf(";", eqIdx - 1) + 1;
	            continue;
	        }
	        const key = valueSlice(str, index, eqIdx);
	        // only assign once
	        if (obj[key] === undefined) {
	            obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
	        }
	        index = endIdx + 1;
	    } while (index < len);
	    return obj;
	}
	/**
	 * Stringifies an object into an HTTP `Cookie` header.
	 */
	function stringifyCookie(cookie, options) {
	    const enc = options?.encode || encodeURIComponent;
	    const cookieStrings = [];
	    for (const name of Object.keys(cookie)) {
	        const val = cookie[name];
	        if (val === undefined)
	            continue;
	        if (!cookieNameRegExp.test(name)) {
	            throw new TypeError(`cookie name is invalid: ${name}`);
	        }
	        const value = enc(val);
	        if (!cookieValueRegExp.test(value)) {
	            throw new TypeError(`cookie val is invalid: ${val}`);
	        }
	        cookieStrings.push(`${name}=${value}`);
	    }
	    return cookieStrings.join("; ");
	}
	function stringifySetCookie(_name, _val, _opts) {
	    const cookie = typeof _name === "object"
	        ? _name
	        : { ..._opts, name: _name, value: String(_val) };
	    const options = typeof _val === "object" ? _val : _opts;
	    const enc = options?.encode || encodeURIComponent;
	    if (!cookieNameRegExp.test(cookie.name)) {
	        throw new TypeError(`argument name is invalid: ${cookie.name}`);
	    }
	    const value = cookie.value ? enc(cookie.value) : "";
	    if (!cookieValueRegExp.test(value)) {
	        throw new TypeError(`argument val is invalid: ${cookie.value}`);
	    }
	    let str = cookie.name + "=" + value;
	    if (cookie.maxAge !== undefined) {
	        if (!Number.isInteger(cookie.maxAge)) {
	            throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
	        }
	        str += "; Max-Age=" + cookie.maxAge;
	    }
	    if (cookie.domain) {
	        if (!domainValueRegExp.test(cookie.domain)) {
	            throw new TypeError(`option domain is invalid: ${cookie.domain}`);
	        }
	        str += "; Domain=" + cookie.domain;
	    }
	    if (cookie.path) {
	        if (!pathValueRegExp.test(cookie.path)) {
	            throw new TypeError(`option path is invalid: ${cookie.path}`);
	        }
	        str += "; Path=" + cookie.path;
	    }
	    if (cookie.expires) {
	        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
	            throw new TypeError(`option expires is invalid: ${cookie.expires}`);
	        }
	        str += "; Expires=" + cookie.expires.toUTCString();
	    }
	    if (cookie.httpOnly) {
	        str += "; HttpOnly";
	    }
	    if (cookie.secure) {
	        str += "; Secure";
	    }
	    if (cookie.partitioned) {
	        str += "; Partitioned";
	    }
	    if (cookie.priority) {
	        const priority = typeof cookie.priority === "string"
	            ? cookie.priority.toLowerCase()
	            : undefined;
	        switch (priority) {
	            case "low":
	                str += "; Priority=Low";
	                break;
	            case "medium":
	                str += "; Priority=Medium";
	                break;
	            case "high":
	                str += "; Priority=High";
	                break;
	            default:
	                throw new TypeError(`option priority is invalid: ${cookie.priority}`);
	        }
	    }
	    if (cookie.sameSite) {
	        const sameSite = typeof cookie.sameSite === "string"
	            ? cookie.sameSite.toLowerCase()
	            : cookie.sameSite;
	        switch (sameSite) {
	            case true:
	            case "strict":
	                str += "; SameSite=Strict";
	                break;
	            case "lax":
	                str += "; SameSite=Lax";
	                break;
	            case "none":
	                str += "; SameSite=None";
	                break;
	            default:
	                throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
	        }
	    }
	    return str;
	}
	/**
	 * Deserialize a `Set-Cookie` header into an object.
	 *
	 * deserialize('foo=bar; httpOnly')
	 *   => { name: 'foo', value: 'bar', httpOnly: true }
	 */
	function parseSetCookie(str, options) {
	    const dec = options?.decode || decode;
	    const len = str.length;
	    const endIdx = endIndex(str, 0, len);
	    const eqIdx = eqIndex(str, 0, endIdx);
	    const setCookie = eqIdx === -1
	        ? { name: "", value: dec(valueSlice(str, 0, endIdx)) }
	        : {
	            name: valueSlice(str, 0, eqIdx),
	            value: dec(valueSlice(str, eqIdx + 1, endIdx)),
	        };
	    let index = endIdx + 1;
	    while (index < len) {
	        const endIdx = endIndex(str, index, len);
	        const eqIdx = eqIndex(str, index, endIdx);
	        const attr = eqIdx === -1
	            ? valueSlice(str, index, endIdx)
	            : valueSlice(str, index, eqIdx);
	        const val = eqIdx === -1 ? undefined : valueSlice(str, eqIdx + 1, endIdx);
	        switch (attr.toLowerCase()) {
	            case "httponly":
	                setCookie.httpOnly = true;
	                break;
	            case "secure":
	                setCookie.secure = true;
	                break;
	            case "partitioned":
	                setCookie.partitioned = true;
	                break;
	            case "domain":
	                setCookie.domain = val;
	                break;
	            case "path":
	                setCookie.path = val;
	                break;
	            case "max-age":
	                if (val && maxAgeRegExp.test(val))
	                    setCookie.maxAge = Number(val);
	                break;
	            case "expires":
	                if (!val)
	                    break;
	                const date = new Date(val);
	                if (Number.isFinite(date.valueOf()))
	                    setCookie.expires = date;
	                break;
	            case "priority":
	                if (!val)
	                    break;
	                const priority = val.toLowerCase();
	                if (priority === "low" ||
	                    priority === "medium" ||
	                    priority === "high") {
	                    setCookie.priority = priority;
	                }
	                break;
	            case "samesite":
	                if (!val)
	                    break;
	                const sameSite = val.toLowerCase();
	                if (sameSite === "lax" ||
	                    sameSite === "strict" ||
	                    sameSite === "none") {
	                    setCookie.sameSite = sameSite;
	                }
	                break;
	        }
	        index = endIdx + 1;
	    }
	    return setCookie;
	}
	/**
	 * Find the `;` character between `min` and `len` in str.
	 */
	function endIndex(str, min, len) {
	    const index = str.indexOf(";", min);
	    return index === -1 ? len : index;
	}
	/**
	 * Find the `=` character between `min` and `max` in str.
	 */
	function eqIndex(str, min, max) {
	    const index = str.indexOf("=", min);
	    return index < max ? index : -1;
	}
	/**
	 * Slice out a value between startPod to max.
	 */
	function valueSlice(str, min, max) {
	    let start = min;
	    let end = max;
	    do {
	        const code = str.charCodeAt(start);
	        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
	            break;
	    } while (++start < end);
	    while (end > start) {
	        const code = str.charCodeAt(end - 1);
	        if (code !== 0x20 /*   */ && code !== 0x09 /* \t */)
	            break;
	        end--;
	    }
	    return str.slice(start, end);
	}
	/**
	 * URL-decode string value. Optimized to skip native call when no %.
	 */
	function decode(str) {
	    if (str.indexOf("%") === -1)
	        return str;
	    try {
	        return decodeURIComponent(str);
	    }
	    catch (e) {
	        return str;
	    }
	}
	/**
	 * Determine if value is a Date.
	 */
	function isDate(val) {
	    return __toString.call(val) === "[object Date]";
	}
	
	return dist;
}

var distExports = /*@__PURE__*/ requireDist();

const DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
const DELETED_VALUE = "deleted";
const responseSentSymbol = /* @__PURE__ */ Symbol.for("astro.responseSent");
const identity = (value) => value;
class AstroCookie {
  value;
  constructor(value) {
    this.value = value;
  }
  json() {
    if (this.value === void 0) {
      throw new Error(`Cannot convert undefined to an object.`);
    }
    return JSON.parse(this.value);
  }
  number() {
    return Number(this.value);
  }
  boolean() {
    if (this.value === "false") return false;
    if (this.value === "0") return false;
    return Boolean(this.value);
  }
}
class AstroCookies {
  #request;
  #requestValues;
  #outgoing;
  #consumed;
  constructor(request) {
    this.#request = request;
    this.#requestValues = null;
    this.#outgoing = null;
    this.#consumed = false;
  }
  /**
   * Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
   * in a Set-Cookie header added to the response.
   * @param key The cookie to delete
   * @param options Options related to this deletion, such as the path of the cookie.
   */
  delete(key, options) {
    const {
      // @ts-expect-error
      maxAge: _ignoredMaxAge,
      // @ts-expect-error
      expires: _ignoredExpires,
      ...sanitizedOptions
    } = options || {};
    const serializeOptions = {
      expires: DELETED_EXPIRATION,
      ...sanitizedOptions
    };
    this.#ensureOutgoingMap().set(key, [
      DELETED_VALUE,
      distExports.serialize(key, DELETED_VALUE, serializeOptions),
      false
    ]);
  }
  /**
   * Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
   * request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
   * from that set call, overriding any values already part of the request.
   * @param key The cookie to get.
   * @returns An object containing the cookie value as well as convenience methods for converting its value.
   */
  get(key, options = void 0) {
    if (this.#outgoing?.has(key)) {
      let [serializedValue, , isSetValue] = this.#outgoing.get(key);
      if (isSetValue) {
        return new AstroCookie(serializedValue);
      } else {
        return void 0;
      }
    }
    const decode = options?.decode ?? decodeURIComponent;
    const values = this.#ensureParsed();
    if (key in values) {
      const value = values[key];
      if (value) {
        let decodedValue;
        try {
          decodedValue = decode(value);
        } catch (_error) {
          decodedValue = value;
        }
        return new AstroCookie(decodedValue);
      }
    }
  }
  /**
   * Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
   * part of the initial request or set via Astro.cookies.set(key)
   * @param key The cookie to check for.
   * @param _options This parameter is no longer used.
   * @returns
   */
  has(key, _options) {
    if (this.#outgoing?.has(key)) {
      let [, , isSetValue] = this.#outgoing.get(key);
      return isSetValue;
    }
    const values = this.#ensureParsed();
    return values[key] !== void 0;
  }
  /**
   * Astro.cookies.set(key, value) is used to set a cookie's value. If provided
   * an object it will be stringified via JSON.stringify(value). Additionally you
   * can provide options customizing how this cookie will be set, such as setting httpOnly
   * in order to prevent the cookie from being read in client-side JavaScript.
   * @param key The name of the cookie to set.
   * @param value A value, either a string or other primitive or an object.
   * @param options Options for the cookie, such as the path and security settings.
   */
  set(key, value, options) {
    if (this.#consumed) {
      const warning = new Error(
        "Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page."
      );
      warning.name = "Warning";
      console.warn(warning);
    }
    let serializedValue;
    if (typeof value === "string") {
      serializedValue = value;
    } else {
      let toStringValue = value.toString();
      if (toStringValue === Object.prototype.toString.call(value)) {
        serializedValue = JSON.stringify(value);
      } else {
        serializedValue = toStringValue;
      }
    }
    const serializeOptions = {};
    if (options) {
      Object.assign(serializeOptions, options);
    }
    this.#ensureOutgoingMap().set(key, [
      serializedValue,
      distExports.serialize(key, serializedValue, serializeOptions),
      true
    ]);
    if (this.#request[responseSentSymbol]) {
      throw new AstroError({
        ...ResponseSentError
      });
    }
  }
  /**
   * Merges a new AstroCookies instance into the current instance. Any new cookies
   * will be added to the current instance, overwriting any existing cookies with the same name.
   */
  merge(cookies) {
    const outgoing = cookies.#outgoing;
    if (outgoing) {
      for (const [key, value] of outgoing) {
        this.#ensureOutgoingMap().set(key, value);
      }
    }
  }
  /**
   * Astro.cookies.header() returns an iterator for the cookies that have previously
   * been set by either Astro.cookies.set() or Astro.cookies.delete().
   * This method is primarily used by adapters to set the header on outgoing responses.
   * @returns
   */
  *headers() {
    if (this.#outgoing == null) return;
    for (const [, value] of this.#outgoing) {
      yield value[1];
    }
  }
  /**
   * Marks the cookies as consumed and returns the header values.
   * After consumption, any subsequent `set()` calls will warn.
   */
  consume() {
    this.#consumed = true;
    return this.headers();
  }
  /**
   * @deprecated Use the instance method `cookies.consume()` instead.
   * Kept for backward compatibility with adapters.
   */
  static consume(cookies) {
    return cookies.consume();
  }
  #ensureParsed() {
    if (!this.#requestValues) {
      this.#parse();
    }
    if (!this.#requestValues) {
      this.#requestValues = /* @__PURE__ */ Object.create(null);
    }
    return this.#requestValues;
  }
  #ensureOutgoingMap() {
    if (!this.#outgoing) {
      this.#outgoing = /* @__PURE__ */ new Map();
    }
    return this.#outgoing;
  }
  #parse() {
    const raw = this.#request.headers.get("cookie");
    if (!raw) {
      return;
    }
    this.#requestValues = distExports.parse(raw, { decode: identity });
  }
}

const astroCookiesSymbol = /* @__PURE__ */ Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
  Reflect.set(response, astroCookiesSymbol, cookies);
}
function getCookiesFromResponse(response) {
  let cookies = Reflect.get(response, astroCookiesSymbol);
  if (cookies != null) {
    return cookies;
  } else {
    return void 0;
  }
}
function* getSetCookiesFromResponse(response) {
  const cookies = getCookiesFromResponse(response);
  if (!cookies) {
    return [];
  }
  for (const headerValue of cookies.consume()) {
    yield headerValue;
  }
  return [];
}

const NOOP_ACTIONS_MOD = {
  server: {}
};

const FORM_CONTENT_TYPES = [
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
];
const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"];
function createOriginCheckMiddleware() {
  return defineMiddleware((context, next) => {
    const { request, url, isPrerendered } = context;
    if (isPrerendered) {
      return next();
    }
    if (SAFE_METHODS.includes(request.method)) {
      return next();
    }
    const isSameOrigin = request.headers.get("origin") === url.origin;
    const hasContentType = request.headers.has("content-type");
    if (hasContentType) {
      const formLikeHeader = hasFormLikeHeader(request.headers.get("content-type"));
      if (formLikeHeader && !isSameOrigin) {
        return new Response(`Cross-site ${request.method} form submissions are forbidden`, {
          status: 403
        });
      }
    } else {
      if (!isSameOrigin) {
        return new Response(`Cross-site ${request.method} form submissions are forbidden`, {
          status: 403
        });
      }
    }
    return next();
  });
}
function hasFormLikeHeader(contentType) {
  if (contentType) {
    for (const FORM_CONTENT_TYPE of FORM_CONTENT_TYPES) {
      if (contentType.toLowerCase().includes(FORM_CONTENT_TYPE)) {
        return true;
      }
    }
  }
  return false;
}

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const RedirectComponentInstance = {
  default() {
    return new Response(null, {
      status: 301
    });
  }
};
const RedirectSinglePageBuiltModule = {
  page: () => Promise.resolve(RedirectComponentInstance),
  onRequest: (_, next) => next()
};

async function renderEndpoint(mod, context, isPrerendered, logger) {
  const { request, url } = context;
  const method = request.method.toUpperCase();
  let handler = mod[method] ?? mod["ALL"];
  if (!handler && method === "HEAD" && mod["GET"]) {
    handler = mod["GET"];
  }
  if (isPrerendered && !["GET", "HEAD"].includes(method)) {
    logger.warn(
      "router",
      `${url.pathname} ${s.bold(
        method
      )} requests are not available in static endpoints. Mark this page as server-rendered (\`export const prerender = false;\`) or update your config to \`output: 'server'\` to make all your pages server-rendered by default.`
    );
  }
  if (handler === void 0) {
    logger.warn(
      "router",
      `No API Route handler exists for the method "${method}" for the route "${url.pathname}".
Found handlers: ${Object.keys(mod).map((exp) => JSON.stringify(exp)).join(", ")}
` + ("all" in mod ? `One of the exported handlers is "all" (lowercase), did you mean to export 'ALL'?
` : "")
    );
    return new Response(null, { status: 404 });
  }
  if (typeof handler !== "function") {
    logger.error(
      "router",
      `The route "${url.pathname}" exports a value for the method "${method}", but it is of the type ${typeof handler} instead of a function.`
    );
    return new Response(null, { status: 500 });
  }
  let response = await handler.call(mod, context);
  if (!response || response instanceof Response === false) {
    throw new AstroError(EndpointDidNotReturnAResponse);
  }
  if (REROUTABLE_STATUS_CODES.includes(response.status)) {
    try {
      response.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
    } catch (err) {
      if (err.message?.includes("immutable")) {
        response = new Response(response.body, response);
        response.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
      } else {
        throw err;
      }
    }
  }
  if (method === "HEAD") {
    return new Response(null, response);
  }
  return response;
}

const AstroJSX = "astro:jsx";
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}

function isAstroComponentFactory(obj) {
  return obj == null ? false : obj.isAstroComponentFactory === true;
}
function isAPropagatingComponent(result, factory) {
  return isPropagatingHint(getPropagationHint(result, factory));
}
function getPropagationHint(result, factory) {
  return getPropagationHint$1(result, factory);
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  // Actually means Array
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7,
  Uint8Array: 8,
  Uint16Array: 9,
  Uint32Array: 10,
  Infinity: 11
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [PROP_TYPE.Map, serializeArray(Array.from(value), metadata, parents)];
    }
    case "[object Set]": {
      return [PROP_TYPE.Set, serializeArray(Array.from(value), metadata, parents)];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, serializeArray(value, metadata, parents)];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, Array.from(value)];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, Array.from(value)];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, Array.from(value)];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      }
      if (value === Number.POSITIVE_INFINITY) {
        return [PROP_TYPE.Infinity, 1];
      }
      if (value === Number.NEGATIVE_INFINITY) {
        return [PROP_TYPE.Infinity, -1];
      }
      if (value === void 0) {
        return [PROP_TYPE.Value];
      }
      return [PROP_TYPE.Value, value];
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}

const transitionDirectivesToCopyOnIsland = Object.freeze([
  "data-astro-transition-scope",
  "data-astro-transition-persist",
  "data-astro-transition-persist-props"
]);
function extractDirectives(inputProps, clientDirectives) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {},
    propsWithoutTransitionAttributes: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        // This is a special prop added to prove that the client hydration method
        // was added statically.
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!clientDirectives.has(extracted.hydration.directive)) {
            const hydrationMethods = Array.from(clientDirectives.keys()).map((d) => `client:${d}`).join(", ");
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${hydrationMethods}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new AstroError(MissingMediaQueryDirective);
          }
          break;
        }
      }
    } else {
      extracted.props[key] = value;
      if (!transitionDirectivesToCopyOnIsland.includes(key)) {
        extracted.propsWithoutTransitionAttributes[key] = value;
      }
    }
  }
  for (const sym of Object.getOwnPropertySymbols(inputProps)) {
    extracted.props[sym] = inputProps[sym];
    extracted.propsWithoutTransitionAttributes[sym] = inputProps[sym];
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new AstroError({
      ...NoMatchingImport,
      message: NoMatchingImport.message(metadata.displayName)
    });
  }
  const island = {
    children: "",
    props: {
      // This is for HMR, probably can avoid it in prod
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = escapeHTML(value);
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(
      decodeURI(renderer.clientEntrypoint.toString())
    );
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  transitionDirectivesToCopyOnIsland.forEach((name) => {
    if (typeof props[name] !== "undefined") {
      island.props[name] = props[name];
    }
  });
  return island;
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const DOCTYPE_EXP = /<!doctype html/i;
async function renderToString(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(
    result,
    componentFactory,
    props,
    children,
    route
  );
  if (templateResult instanceof Response) return templateResult;
  let str = "";
  let renderedFirstPageChunk = false;
  if (isPage) {
    await bufferHeadContent(result);
  }
  const destination = {
    write(chunk) {
      if (isPage && !renderedFirstPageChunk) {
        renderedFirstPageChunk = true;
        if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
          const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
          str += doctype;
        }
      }
      if (chunk instanceof Response) return;
      str += chunkToString(result, chunk);
    }
  };
  await templateResult.render(destination);
  return str;
}
async function renderToReadableStream(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(
    result,
    componentFactory,
    props,
    children,
    route
  );
  if (templateResult instanceof Response) return templateResult;
  let renderedFirstPageChunk = false;
  if (isPage) {
    await bufferHeadContent(result);
  }
  return new ReadableStream({
    start(controller) {
      const destination = {
        write(chunk) {
          if (isPage && !renderedFirstPageChunk) {
            renderedFirstPageChunk = true;
            if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
              const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
              controller.enqueue(encoder.encode(doctype));
            }
          }
          if (chunk instanceof Response) {
            throw new AstroError({
              ...ResponseSentError
            });
          }
          const bytes = chunkToByteArray(result, chunk);
          controller.enqueue(bytes);
        }
      };
      (async () => {
        try {
          await templateResult.render(destination);
          controller.close();
        } catch (e) {
          if (AstroError.is(e) && !e.loc) {
            e.setLocation({
              file: route?.component
            });
          }
          setTimeout(() => controller.error(e), 0);
        }
      })();
    },
    cancel() {
      result.cancelled = true;
    }
  });
}
async function callComponentAsTemplateResultOrResponse(result, componentFactory, props, children, route) {
  const factoryResult = await componentFactory(result, props, children);
  if (factoryResult instanceof Response) {
    return factoryResult;
  } else if (isHeadAndContent(factoryResult)) {
    if (!isRenderTemplateResult(factoryResult.content)) {
      throw new AstroError({
        ...OnlyResponseCanBeReturned,
        message: OnlyResponseCanBeReturned.message(
          route?.route,
          typeof factoryResult
        ),
        location: {
          file: route?.component
        }
      });
    }
    return factoryResult.content;
  } else if (!isRenderTemplateResult(factoryResult)) {
    throw new AstroError({
      ...OnlyResponseCanBeReturned,
      message: OnlyResponseCanBeReturned.message(route?.route, typeof factoryResult),
      location: {
        file: route?.component
      }
    });
  }
  return factoryResult;
}
async function bufferHeadContent(result) {
  await bufferPropagatedHead(result);
}
async function renderToAsyncIterable(result, componentFactory, props, children, isPage = false, route) {
  const templateResult = await callComponentAsTemplateResultOrResponse(
    result,
    componentFactory,
    props,
    children,
    route
  );
  if (templateResult instanceof Response) return templateResult;
  let renderedFirstPageChunk = false;
  if (isPage) {
    await bufferHeadContent(result);
  }
  let error = null;
  let next = null;
  const buffer = [];
  let renderingComplete = false;
  const iterator = {
    async next() {
      if (result.cancelled) return { done: true, value: void 0 };
      if (next !== null) {
        await next.promise;
      } else if (!renderingComplete && !buffer.length) {
        next = promiseWithResolvers();
        await next.promise;
      }
      if (!renderingComplete) {
        next = promiseWithResolvers();
      }
      if (error) {
        throw error;
      }
      let length = 0;
      let stringToEncode = "";
      for (let i = 0, len = buffer.length; i < len; i++) {
        const bufferEntry = buffer[i];
        if (typeof bufferEntry === "string") {
          const nextIsString = i + 1 < len && typeof buffer[i + 1] === "string";
          stringToEncode += bufferEntry;
          if (!nextIsString) {
            const encoded = encoder.encode(stringToEncode);
            length += encoded.length;
            stringToEncode = "";
            buffer[i] = encoded;
          } else {
            buffer[i] = "";
          }
        } else {
          length += bufferEntry.length;
        }
      }
      let mergedArray = new Uint8Array(length);
      let offset = 0;
      for (let i = 0, len = buffer.length; i < len; i++) {
        const item = buffer[i];
        if (item === "") {
          continue;
        }
        mergedArray.set(item, offset);
        offset += item.length;
      }
      buffer.length = 0;
      const returnValue = {
        // The iterator is done when rendering has finished
        // and there are no more chunks to return.
        done: length === 0 && renderingComplete,
        value: mergedArray
      };
      return returnValue;
    },
    async return() {
      result.cancelled = true;
      return { done: true, value: void 0 };
    }
  };
  const destination = {
    write(chunk) {
      if (isPage && !renderedFirstPageChunk) {
        renderedFirstPageChunk = true;
        if (!result.partial && !DOCTYPE_EXP.test(String(chunk))) {
          const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
          buffer.push(encoder.encode(doctype));
        }
      }
      if (chunk instanceof Response) {
        throw new AstroError(ResponseSentError);
      }
      const bytes = chunkToByteArrayOrString(result, chunk);
      if (bytes.length > 0) {
        buffer.push(bytes);
        next?.resolve();
      } else if (buffer.length > 0) {
        next?.resolve();
      }
    }
  };
  const renderResult = toPromise(() => templateResult.render(destination));
  renderResult.catch((err) => {
    error = err;
  }).finally(() => {
    renderingComplete = true;
    next?.resolve();
  });
  return {
    [Symbol.asyncIterator]() {
      return iterator;
    }
  };
}
function toPromise(fn) {
  try {
    const result = fn();
    return isPromise(result) ? result : Promise.resolve(result);
  } catch (err) {
    return Promise.reject(err);
  }
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement$1(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlotToString(result, slots?.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName) return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const needsHeadRenderingSymbol = /* @__PURE__ */ Symbol.for("astro.needsHeadRendering");
const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
const clientOnlyValues = /* @__PURE__ */ new Set(["solid-js", "react", "preact", "vue", "svelte"]);
function guessRenderers(componentUrl) {
  const extname = componentUrl?.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue (jsx)"];
    case void 0:
    default:
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid-js",
        "@astrojs/vue",
        "@astrojs/svelte"
      ];
  }
}
function isFragmentComponent(Component) {
  return Component === Fragment;
}
function isHTMLComponent(Component) {
  return Component && Component["astro:html"] === true;
}
const ASTRO_SLOT_EXP = /<\/?astro-slot\b[^>]*>/g;
const ASTRO_STATIC_SLOT_EXP = /<\/?astro-static-slot\b[^>]*>/g;
function removeStaticAstroSlot(html, supportsAstroStaticSlot = true) {
  const exp = supportsAstroStaticSlot ? ASTRO_STATIC_SLOT_EXP : ASTRO_SLOT_EXP;
  return html.replace(exp, "");
}
async function renderFrameworkComponent(result, displayName, Component, _props, slots = {}) {
  if (!Component && "client:only" in _props === false) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers, clientDirectives } = result;
  const metadata = {
    astroStaticSlot: true,
    displayName
  };
  const { hydration, isPage, props, propsWithoutTransitionAttributes } = extractDirectives(
    _props,
    clientDirectives
  );
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  const validRenderers = renderers.filter((r) => r.name !== "astro:jsx");
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    let isTagged = false;
    try {
      isTagged = Component && Component[Renderer];
    } catch {
    }
    if (isTagged) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children, metadata)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ??= e;
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = await renderHTMLElement$1(
        result,
        Component,
        _props,
        slots
      );
      return {
        render(destination) {
          destination.write(output);
        }
      };
    }
  } else {
    if (metadata.hydrateArgs) {
      const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
      if (clientOnlyValues.has(rendererName)) {
        renderer = renderers.find(
          ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
        );
      }
    }
    if (!renderer && validRenderers.length === 1) {
      renderer = validRenderers[0];
    }
    if (!renderer) {
      const extname = metadata.componentUrl?.split(".").pop();
      renderer = renderers.find(({ name }) => name === `@astrojs/${extname}` || name === extname);
    }
    if (!renderer && metadata.hydrateArgs) {
      const rendererName = metadata.hydrateArgs;
      if (typeof rendererName === "string") {
        renderer = renderers.find(({ name }) => name === rendererName);
      }
    }
  }
  let componentServerRenderEndTime;
  if (!renderer) {
    if (metadata.hydrate === "only") {
      const rendererName = rendererAliases.has(metadata.hydrateArgs) ? rendererAliases.get(metadata.hydrateArgs) : metadata.hydrateArgs;
      if (clientOnlyValues.has(rendererName)) {
        const plural = validRenderers.length > 1;
        throw new AstroError({
          ...NoMatchingRenderer,
          message: NoMatchingRenderer.message(
            metadata.displayName,
            metadata?.componentUrl?.split(".").pop(),
            plural,
            validRenderers.length
          ),
          hint: NoMatchingRenderer.hint(
            formatList(probableRendererNames.map((r) => "`" + r + "`"))
          )
        });
      } else {
        throw new AstroError({
          ...NoClientOnlyHint,
          message: NoClientOnlyHint.message(metadata.displayName),
          hint: NoClientOnlyHint.hint(
            probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")
          )
        });
      }
    } else if (typeof Component !== "string") {
      const matchingRenderers = validRenderers.filter(
        (r) => probableRendererNames.includes(r.name)
      );
      const plural = validRenderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new AstroError({
          ...NoMatchingRenderer,
          message: NoMatchingRenderer.message(
            metadata.displayName,
            metadata?.componentUrl?.split(".").pop(),
            plural,
            validRenderers.length
          ),
          hint: NoMatchingRenderer.hint(
            formatList(probableRendererNames.map((r) => "`" + r + "`"))
          )
        });
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          propsWithoutTransitionAttributes,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.
3. If using multiple JSX frameworks at the same time (e.g. React + Preact), pass the correct \`include\`/\`exclude\` options to integrations.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlotToString(result, slots?.fallback);
    } else {
      const componentRenderStartTime = performance.now();
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        propsWithoutTransitionAttributes,
        children,
        metadata
      ));
      if (process.env.NODE_ENV === "development")
        componentServerRenderEndTime = performance.now() - componentRenderStartTime;
    }
  }
  if (!html && typeof Component === "string") {
    const Tag = sanitizeElementName(Component);
    const childSlots = Object.values(children).join("");
    const renderTemplateResult = renderTemplate`<${Tag}${internalSpreadAttributes(
      props,
      true,
      Tag
    )}${markHTMLString(
      childSlots === "" && voidElementNames.test(Tag) ? `/>` : `>${childSlots}</${Tag}>`
    )}`;
    html = "";
    const destination = {
      write(chunk) {
        if (chunk instanceof Response) return;
        html += chunkToString(result, chunk);
      }
    };
    await renderTemplateResult.render(destination);
  }
  if (!hydration) {
    return {
      render(destination) {
        if (slotInstructions) {
          for (const instruction of slotInstructions) {
            destination.write(instruction);
          }
        }
        if (isPage || renderer?.name === "astro:jsx") {
          destination.write(html);
        } else if (html && html.length > 0) {
          destination.write(
            markHTMLString(removeStaticAstroSlot(html, renderer?.ssr?.supportsAstroStaticSlot))
          );
        }
      }
    };
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  if (componentServerRenderEndTime && process.env.NODE_ENV === "development")
    island.props["server-render-time"] = componentServerRenderEndTime;
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        let tagName = renderer?.ssr?.supportsAstroStaticSlot ? !!metadata.hydrate ? "astro-slot" : "astro-static-slot" : "astro-slot";
        let expectedHTML = key === "default" ? `<${tagName}>` : `<${tagName} name="${key}">`;
        if (!html.includes(expectedHTML)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
    island.children += `<!--astro:end-->`;
  }
  return {
    render(destination) {
      if (slotInstructions) {
        for (const instruction of slotInstructions) {
          destination.write(instruction);
        }
      }
      destination.write(createRenderInstruction({ type: "directive", hydration }));
      if (hydration.directive !== "only" && renderer?.ssr.renderHydrationScript) {
        destination.write(
          createRenderInstruction({
            type: "renderer-hydration-script",
            rendererName: renderer.name,
            render: renderer.ssr.renderHydrationScript
          })
        );
      }
      const renderedElement = renderElement$1("astro-island", island, false);
      destination.write(markHTMLString(renderedElement));
    }
  };
}
function sanitizeElementName(tag) {
  const unsafe = /[&<>'"\s]+/;
  if (!unsafe.test(tag)) return tag;
  return tag.trim().split(unsafe)[0].trim();
}
function renderFragmentComponent(result, slots = {}) {
  const slot = slots?.default;
  return {
    render(destination) {
      if (slot == null) return;
      return renderSlot(result, slot).render(destination);
    }
  };
}
async function renderHTMLComponent(result, Component, _props, slots = {}) {
  const { slotInstructions, children } = await renderSlots(result, slots);
  const html = Component({ slots: children });
  const hydrationHtml = slotInstructions ? slotInstructions.map((instr) => chunkToString(result, instr)).join("") : "";
  return {
    render(destination) {
      destination.write(markHTMLString(hydrationHtml + html));
    }
  };
}
function renderAstroComponent(result, displayName, Component, props, slots = {}) {
  if (containsServerDirective(props)) {
    const serverIslandComponent = new ServerIslandComponent(result, props, slots, displayName);
    result._metadata.propagators.add(serverIslandComponent);
    return serverIslandComponent;
  }
  const instance = createAstroComponentInstance(result, displayName, Component, props, slots);
  return {
    render(destination) {
      return instance.render(destination);
    }
  };
}
function renderComponent(result, displayName, Component, props, slots = {}) {
  if (isPromise(Component)) {
    return Component.catch(handleCancellation).then((x) => {
      return renderComponent(result, displayName, x, props, slots);
    });
  }
  if (isFragmentComponent(Component)) {
    return renderFragmentComponent(result, slots);
  }
  props = normalizeProps(props);
  if (isHTMLComponent(Component)) {
    return renderHTMLComponent(result, Component, props, slots).catch(handleCancellation);
  }
  if (isAstroComponentFactory(Component)) {
    return renderAstroComponent(result, displayName, Component, props, slots);
  }
  return renderFrameworkComponent(result, displayName, Component, props, slots).catch(
    handleCancellation
  );
  function handleCancellation(e) {
    if (result.cancelled)
      return {
        render() {
        }
      };
    throw e;
  }
}
function normalizeProps(props) {
  if (props["class:list"] !== void 0) {
    const value = props["class:list"];
    delete props["class:list"];
    props["class"] = clsx(props["class"], value);
    if (props["class"] === "") {
      delete props["class"];
    }
  }
  return props;
}
async function renderComponentToString(result, displayName, Component, props, slots = {}, isPage = false, route) {
  let str = "";
  let renderedFirstPageChunk = false;
  let head = "";
  if (isPage && !result.partial && nonAstroPageNeedsHeadInjection(Component)) {
    head += chunkToString(result, maybeRenderHead());
  }
  try {
    const destination = {
      write(chunk) {
        if (isPage && !result.partial && !renderedFirstPageChunk) {
          renderedFirstPageChunk = true;
          if (!/<!doctype html/i.test(String(chunk))) {
            const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
            str += doctype + head;
          }
        }
        if (chunk instanceof Response) return;
        str += chunkToString(result, chunk);
      }
    };
    const renderInstance = await renderComponent(result, displayName, Component, props, slots);
    if (containsServerDirective(props)) {
      await bufferHeadContent(result);
    }
    await renderInstance.render(destination);
  } catch (e) {
    if (AstroError.is(e) && !e.loc) {
      e.setLocation({
        file: route?.component
      });
    }
    throw e;
  }
  return str;
}
function nonAstroPageNeedsHeadInjection(pageComponent) {
  return !!pageComponent?.[needsHeadRenderingSymbol];
}

const ClientOnlyPlaceholder$1 = "astro-client-only";
const hasTriedRenderComponentSymbol = /* @__PURE__ */ Symbol("hasTriedRenderComponent");
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case typeof vnode === "function":
      return vnode;
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode): {
      const renderedItems = await Promise.all(vnode.map((v) => renderJSX(result, v)));
      let instructions = null;
      let content = "";
      for (const item of renderedItems) {
        if (item instanceof SlotString) {
          content += item;
          instructions = mergeSlotInstructions(instructions, item);
        } else {
          content += item;
        }
      }
      if (instructions) {
        return markHTMLString(new SlotString(content, instructions));
      }
      return markHTMLString(content);
    }
  }
  return renderJSXVNode(result, vnode);
}
async function renderJSXVNode(result, vnode) {
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === /* @__PURE__ */ Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case isAstroComponentFactory(vnode.type): {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        const str = await renderComponentToString(
          result,
          vnode.type.name,
          vnode.type,
          props,
          slots
        );
        const html = markHTMLString(str);
        return html;
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder$1):
        return markHTMLString(await renderElement(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function") {
        if (vnode.props[hasTriedRenderComponentSymbol]) {
          delete vnode.props[hasTriedRenderComponentSymbol];
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2?.[AstroJSX] || !output2) {
            return await renderJSXVNode(result, output2);
          } else {
            return;
          }
        } else {
          vnode.props[hasTriedRenderComponentSymbol] = true;
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value?.["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0) return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder$1 && vnode.props["client:only"]) {
        output = await renderComponentToString(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponentToString(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      return markHTMLString(output);
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children === "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, prerenderElementChildren$1(tag, children))}</${tag}>`
    )}`
  );
}
function prerenderElementChildren$1(tag, children) {
  if (typeof children === "string" && (tag === "style" || tag === "script")) {
    return markHTMLString(children);
  } else {
    return children;
  }
}

const ClientOnlyPlaceholder = "astro-client-only";
function renderJSXToQueue(vnode, result, queue, pool, stack, parent, metadata) {
  if (vnode instanceof HTMLString) {
    const html = vnode.toString();
    if (html.trim() === "") return;
    const node = pool.acquire("html-string", html);
    node.html = html;
    queue.nodes.push(node);
    return;
  }
  if (typeof vnode === "string") {
    const node = pool.acquire("text", vnode);
    node.content = vnode;
    queue.nodes.push(node);
    return;
  }
  if (typeof vnode === "number" || typeof vnode === "boolean") {
    const str = String(vnode);
    const node = pool.acquire("text", str);
    node.content = str;
    queue.nodes.push(node);
    return;
  }
  if (vnode == null || vnode === false) {
    return;
  }
  if (Array.isArray(vnode)) {
    for (let i = vnode.length - 1; i >= 0; i = i - 1) {
      stack.push({ node: vnode[i], parent, metadata });
    }
    return;
  }
  if (!isVNode(vnode)) {
    const str = String(vnode);
    const node = pool.acquire("text", str);
    node.content = str;
    queue.nodes.push(node);
    return;
  }
  handleVNode(vnode, result, queue, pool, stack, parent, metadata);
}
function handleVNode(vnode, result, queue, pool, stack, parent, metadata) {
  if (!vnode.type) {
    throw new Error(
      `Unable to render ${result.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  if (vnode.type === /* @__PURE__ */ Symbol.for("astro:fragment")) {
    stack.push({ node: vnode.props?.children, parent, metadata });
    return;
  }
  if (isAstroComponentFactory(vnode.type)) {
    const factory = vnode.type;
    let props = {};
    let slots = {};
    for (const [key, value] of Object.entries(vnode.props ?? {})) {
      if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
        slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
      } else {
        props[key] = value;
      }
    }
    const displayName = metadata?.displayName || factory.name || "Anonymous";
    const instance = createAstroComponentInstance(result, displayName, factory, props, slots);
    const queueNode = pool.acquire("component");
    queueNode.instance = instance;
    queue.nodes.push(queueNode);
    return;
  }
  if (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder) {
    renderHTMLElement(vnode, result, queue, pool, stack, parent, metadata);
    return;
  }
  if (typeof vnode.type === "function") {
    if (vnode.props?.["server:root"]) {
      const output3 = vnode.type(vnode.props ?? {});
      stack.push({ node: output3, parent, metadata });
      return;
    }
    const output2 = vnode.type(vnode.props ?? {});
    stack.push({ node: output2, parent, metadata });
    return;
  }
  const output = renderJSX(result, vnode);
  stack.push({ node: output, parent, metadata });
}
function renderHTMLElement(vnode, _result, queue, pool, stack, parent, metadata) {
  const tag = vnode.type;
  const { children, ...props } = vnode.props ?? {};
  const attrs = spreadAttributes(props);
  const isVoidElement = (children == null || children === "") && voidElementNames.test(tag);
  if (isVoidElement) {
    const html = `<${tag}${attrs}/>`;
    const node = pool.acquire("html-string", html);
    node.html = html;
    queue.nodes.push(node);
    return;
  }
  const openTag = `<${tag}${attrs}>`;
  const openTagHtml = queue.htmlStringCache ? queue.htmlStringCache.getOrCreate(openTag) : markHTMLString(openTag);
  stack.push({ node: openTagHtml, parent, metadata });
  if (children != null && children !== "") {
    const processedChildren = prerenderElementChildren(tag, children, queue.htmlStringCache);
    stack.push({ node: processedChildren, parent, metadata });
  }
  const closeTag = `</${tag}>`;
  const closeTagHtml = queue.htmlStringCache ? queue.htmlStringCache.getOrCreate(closeTag) : markHTMLString(closeTag);
  stack.push({ node: closeTagHtml, parent, metadata });
}
function prerenderElementChildren(tag, children, htmlStringCache) {
  if (typeof children === "string" && (tag === "style" || tag === "script")) {
    return htmlStringCache ? htmlStringCache.getOrCreate(children) : markHTMLString(children);
  }
  return children;
}

async function buildRenderQueue(root, result, pool) {
  const queue = {
    nodes: [],
    result,
    pool,
    htmlStringCache: result._experimentalQueuedRendering?.htmlStringCache
  };
  const stack = [{ node: root, parent: null }];
  while (stack.length > 0) {
    const item = stack.pop();
    if (!item) {
      continue;
    }
    let { node, parent } = item;
    if (isPromise(node)) {
      try {
        const resolved = await node;
        stack.push({ node: resolved, parent, metadata: item.metadata });
      } catch (error) {
        throw error;
      }
      continue;
    }
    if (node == null || node === false) {
      continue;
    }
    if (typeof node === "string") {
      const queueNode = pool.acquire("text", node);
      queueNode.content = node;
      queue.nodes.push(queueNode);
      continue;
    }
    if (typeof node === "number" || typeof node === "boolean") {
      const str = String(node);
      const queueNode = pool.acquire("text", str);
      queueNode.content = str;
      queue.nodes.push(queueNode);
      continue;
    }
    if (isHTMLString(node)) {
      const html = node.toString();
      const queueNode = pool.acquire("html-string", html);
      queueNode.html = html;
      queue.nodes.push(queueNode);
      continue;
    }
    if (node instanceof SlotString) {
      const html = node.toString();
      const queueNode = pool.acquire("html-string", html);
      queueNode.html = html;
      queue.nodes.push(queueNode);
      continue;
    }
    if (isVNode(node)) {
      renderJSXToQueue(node, result, queue, pool, stack, parent, item.metadata);
      continue;
    }
    if (Array.isArray(node)) {
      for (const n of node) {
        stack.push({ node: n, parent, metadata: item.metadata });
      }
      continue;
    }
    if (isRenderInstruction(node)) {
      const queueNode = pool.acquire("instruction");
      queueNode.instruction = node;
      queue.nodes.push(queueNode);
      continue;
    }
    if (isRenderTemplateResult(node)) {
      const htmlParts = node["htmlParts"];
      const expressions = node["expressions"];
      if (htmlParts[0]) {
        const htmlString = queue.htmlStringCache ? queue.htmlStringCache.getOrCreate(htmlParts[0]) : markHTMLString(htmlParts[0]);
        stack.push({
          node: htmlString,
          parent,
          metadata: item.metadata
        });
      }
      for (let i = 0; i < expressions.length; i = i + 1) {
        stack.push({ node: expressions[i], parent, metadata: item.metadata });
        if (htmlParts[i + 1]) {
          const htmlString = queue.htmlStringCache ? queue.htmlStringCache.getOrCreate(htmlParts[i + 1]) : markHTMLString(htmlParts[i + 1]);
          stack.push({
            node: htmlString,
            parent,
            metadata: item.metadata
          });
        }
      }
      continue;
    }
    if (isAstroComponentInstance(node)) {
      const queueNode = pool.acquire("component");
      queueNode.instance = node;
      queue.nodes.push(queueNode);
      continue;
    }
    if (isAstroComponentFactory(node)) {
      const factory = node;
      const props = item.metadata?.props || {};
      const slots = item.metadata?.slots || {};
      const displayName = item.metadata?.displayName || factory.name || "Anonymous";
      const instance = createAstroComponentInstance(result, displayName, factory, props, slots);
      const queueNode = pool.acquire("component");
      queueNode.instance = instance;
      if (isAPropagatingComponent(result, factory)) {
        try {
          const returnValue = await instance.init(result);
          if (isHeadAndContent(returnValue) && returnValue.head) {
            result._metadata.extraHead.push(returnValue.head);
          }
        } catch (error) {
          throw error;
        }
      }
      queue.nodes.push(queueNode);
      continue;
    }
    if (isRenderInstance(node)) {
      const queueNode = pool.acquire("component");
      queueNode.instance = node;
      queue.nodes.push(queueNode);
      continue;
    }
    if (typeof node === "object" && Symbol.iterator in node) {
      const items = Array.from(node);
      for (const iterItem of items) {
        stack.push({ node: iterItem, parent, metadata: item.metadata });
      }
      continue;
    }
    if (typeof node === "object" && Symbol.asyncIterator in node) {
      try {
        const items = [];
        for await (const asyncItem of node) {
          items.push(asyncItem);
        }
        for (const iterItem of items) {
          stack.push({ node: iterItem, parent, metadata: item.metadata });
        }
      } catch (error) {
        throw error;
      }
      continue;
    }
    if (node instanceof Response) {
      const queueNode = pool.acquire("html-string", "");
      queueNode.html = "";
      queue.nodes.push(queueNode);
      continue;
    }
    if (isHTMLString(node)) {
      const html = String(node);
      const queueNode = pool.acquire("html-string", html);
      queueNode.html = html;
      queue.nodes.push(queueNode);
    } else {
      const str = String(node);
      const queueNode = pool.acquire("text", str);
      queueNode.content = str;
      queue.nodes.push(queueNode);
    }
  }
  queue.nodes.reverse();
  return queue;
}

async function renderQueue(queue, destination) {
  const result = queue.result;
  const pool = queue.pool;
  const cache = queue.htmlStringCache;
  let batchBuffer = "";
  let i = 0;
  while (i < queue.nodes.length) {
    const node = queue.nodes[i];
    try {
      if (canBatch(node)) {
        const batchStart = i;
        while (i < queue.nodes.length && canBatch(queue.nodes[i])) {
          batchBuffer += renderNodeToString(queue.nodes[i]);
          i = i + 1;
        }
        if (batchBuffer) {
          const htmlString = cache ? cache.getOrCreate(batchBuffer) : markHTMLString(batchBuffer);
          destination.write(htmlString);
          batchBuffer = "";
        }
        if (pool) {
          for (let j = batchStart; j < i; j++) {
            pool.release(queue.nodes[j]);
          }
        }
      } else {
        await renderNode(node, destination, result);
        if (pool) {
          pool.release(node);
        }
        i = i + 1;
      }
    } catch (error) {
      throw error;
    }
  }
  if (batchBuffer) {
    const htmlString = cache ? cache.getOrCreate(batchBuffer) : markHTMLString(batchBuffer);
    destination.write(htmlString);
  }
}
function canBatch(node) {
  return node.type === "text" || node.type === "html-string";
}
function renderNodeToString(node) {
  switch (node.type) {
    case "text":
      return node.content ? escapeHTML(node.content) : "";
    case "html-string":
      return node.html || "";
    case "component":
    case "instruction": {
      return "";
    }
  }
}
async function renderNode(node, destination, result) {
  const cache = result._experimentalQueuedRendering?.htmlStringCache;
  switch (node.type) {
    case "text": {
      if (node.content) {
        const escaped = escapeHTML(node.content);
        const htmlString = cache ? cache.getOrCreate(escaped) : markHTMLString(escaped);
        destination.write(htmlString);
      }
      break;
    }
    case "html-string": {
      if (node.html) {
        const htmlString = cache ? cache.getOrCreate(node.html) : markHTMLString(node.html);
        destination.write(htmlString);
      }
      break;
    }
    case "instruction": {
      if (node.instruction) {
        destination.write(node.instruction);
      }
      break;
    }
    case "component": {
      if (node.instance) {
        let componentHtml = "";
        const componentDestination = {
          write(chunk) {
            if (chunk instanceof Response) return;
            componentHtml += chunkToString(result, chunk);
          }
        };
        await node.instance.render(componentDestination);
        if (componentHtml) {
          destination.write(componentHtml);
        }
      }
      break;
    }
  }
}

async function renderPage(result, componentFactory, props, children, streaming, route) {
  if (!isAstroComponentFactory(componentFactory)) {
    result._metadata.headInTree = result.componentMetadata.get(componentFactory.moduleId)?.containsHead ?? false;
    const pageProps = { ...props ?? {}, "server:root": true };
    let str;
    if (result._experimentalQueuedRendering && result._experimentalQueuedRendering.enabled) {
      let vnode = await componentFactory(pageProps);
      if (componentFactory["astro:html"] && typeof vnode === "string") {
        vnode = markHTMLString(vnode);
      }
      const queue = await buildRenderQueue(
        vnode,
        result,
        result._experimentalQueuedRendering.pool
      );
      let html = "";
      let renderedFirst = false;
      const destination = {
        write(chunk) {
          if (chunk instanceof Response) return;
          if (!renderedFirst && !result.partial) {
            renderedFirst = true;
            const chunkStr = String(chunk);
            if (!/<!doctype html/i.test(chunkStr)) {
              const doctype = result.compressHTML ? "<!DOCTYPE html>" : "<!DOCTYPE html>\n";
              html += doctype;
            }
          }
          html += chunkToString(result, chunk);
        }
      };
      await renderQueue(queue, destination);
      str = html;
    } else {
      str = await renderComponentToString(
        result,
        componentFactory.name,
        componentFactory,
        pageProps,
        {},
        true,
        route
      );
    }
    const bytes = encoder.encode(str);
    const headers2 = new Headers([
      ["Content-Type", "text/html"],
      ["Content-Length", bytes.byteLength.toString()]
    ]);
    if (result.shouldInjectCspMetaTags && (result.cspDestination === "header" || result.cspDestination === "adapter")) {
      headers2.set("content-security-policy", renderCspContent(result));
    }
    return new Response(bytes, {
      headers: headers2,
      status: result.response.status
    });
  }
  result._metadata.headInTree = result.componentMetadata.get(componentFactory.moduleId)?.containsHead ?? false;
  let body;
  if (streaming) {
    if (isNode && !isDeno) {
      const nodeBody = await renderToAsyncIterable(
        result,
        componentFactory,
        props,
        children,
        true,
        route
      );
      body = nodeBody;
    } else {
      body = await renderToReadableStream(result, componentFactory, props, children, true, route);
    }
  } else {
    body = await renderToString(result, componentFactory, props, children, true, route);
  }
  if (body instanceof Response) return body;
  const init = result.response;
  const headers = new Headers(init.headers);
  if (result.shouldInjectCspMetaTags && result.cspDestination === "header" || result.cspDestination === "adapter") {
    headers.set("content-security-policy", renderCspContent(result));
  }
  if (!streaming && typeof body === "string") {
    body = encoder.encode(body);
    headers.set("Content-Length", body.byteLength.toString());
  }
  let status = init.status;
  let statusText = init.statusText;
  if (route?.route === "/404") {
    status = 404;
    if (statusText === "OK") {
      statusText = "Not Found";
    }
  } else if (route?.route === "/500") {
    status = 500;
    if (statusText === "OK") {
      statusText = "Internal Server Error";
    }
  }
  if (status) {
    return new Response(body, { ...init, headers, status, statusText });
  } else {
    return new Response(body, { ...init, headers });
  }
}

function spreadAttributes(values = {}, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true, _name);
  }
  return markHTMLString(output);
}

function getPattern(segments, base, addTrailingSlash) {
  const pathname = segments.map((segment) => {
    if (segment.length === 1 && segment[0].spread) {
      return "(?:\\/(.*?))?";
    } else {
      return "\\/" + segment.map((part) => {
        if (part.spread) {
          return "(.*?)";
        } else if (part.dynamic) {
          return "([^/]+?)";
        } else {
          return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
      }).join("");
    }
  }).join("");
  const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
  let initial = "\\/";
  if (addTrailingSlash === "never" && base !== "/" && pathname !== "") {
    initial = "";
  }
  return new RegExp(`^${pathname || initial}${trailing}`);
}
function getTrailingSlashPattern(addTrailingSlash) {
  if (addTrailingSlash === "always") {
    return "\\/$";
  }
  if (addTrailingSlash === "never") {
    return "$";
  }
  return "\\/?$";
}

const SERVER_ISLAND_ROUTE = "/_server-islands/[name]";
const SERVER_ISLAND_COMPONENT = "_server-islands.astro";
function badRequest(reason) {
  return new Response(null, {
    status: 400,
    statusText: "Bad request: " + reason
  });
}
const DEFAULT_BODY_SIZE_LIMIT = 1024 * 1024;
async function getRequestData(request, bodySizeLimit = DEFAULT_BODY_SIZE_LIMIT) {
  switch (request.method) {
    case "GET": {
      const url = new URL(request.url);
      const params = url.searchParams;
      if (!params.has("s") || !params.has("e") || !params.has("p")) {
        return badRequest("Missing required query parameters.");
      }
      const encryptedSlots = params.get("s");
      return {
        encryptedComponentExport: params.get("e"),
        encryptedProps: params.get("p"),
        encryptedSlots
      };
    }
    case "POST": {
      try {
        const body = await readBodyWithLimit(request, bodySizeLimit);
        const raw = new TextDecoder().decode(body);
        const data = JSON.parse(raw);
        if (Object.hasOwn(data, "slots") && typeof data.slots === "object") {
          return badRequest("Plaintext slots are not allowed. Slots must be encrypted.");
        }
        if (Object.hasOwn(data, "componentExport") && typeof data.componentExport === "string") {
          return badRequest(
            "Plaintext componentExport is not allowed. componentExport must be encrypted."
          );
        }
        return data;
      } catch (e) {
        if (e instanceof BodySizeLimitError) {
          return new Response(null, {
            status: 413,
            statusText: e.message
          });
        }
        if (e instanceof SyntaxError) {
          return badRequest("Request format is invalid.");
        }
        throw e;
      }
    }
    default: {
      return new Response(null, { status: 405 });
    }
  }
}
function createEndpoint(manifest) {
  const page = async (result) => {
    const params = result.params;
    if (!params.name) {
      return new Response(null, {
        status: 400,
        statusText: "Bad request"
      });
    }
    const componentId = params.name;
    const data = await getRequestData(result.request, manifest.serverIslandBodySizeLimit);
    if (data instanceof Response) {
      return data;
    }
    const serverIslandMappings = await manifest.serverIslandMappings?.();
    const serverIslandMap = await serverIslandMappings?.serverIslandMap;
    let imp = serverIslandMap?.get(componentId);
    if (!imp) {
      return new Response(null, {
        status: 404,
        statusText: "Not found"
      });
    }
    const key = await manifest.key;
    let componentExport;
    try {
      componentExport = await decryptString(
        key,
        data.encryptedComponentExport,
        `export:${componentId}`
      );
    } catch (_e) {
      return badRequest("Encrypted componentExport value is invalid.");
    }
    const encryptedProps = data.encryptedProps;
    let props = {};
    if (encryptedProps !== "") {
      try {
        const propString = await decryptString(key, encryptedProps, `props:${componentId}`);
        props = JSON.parse(propString);
      } catch (_e) {
        return badRequest("Encrypted props value is invalid.");
      }
    }
    let decryptedSlots = {};
    const encryptedSlots = data.encryptedSlots;
    if (encryptedSlots !== "") {
      try {
        const slotsString = await decryptString(key, encryptedSlots, `slots:${componentId}`);
        decryptedSlots = JSON.parse(slotsString);
      } catch (_e) {
        return badRequest("Encrypted slots value is invalid.");
      }
    }
    const componentModule = await imp();
    let Component = componentModule[componentExport];
    const slots = {};
    for (const prop in decryptedSlots) {
      slots[prop] = createSlotValueFromString(decryptedSlots[prop]);
    }
    result.response.headers.set("X-Robots-Tag", "noindex");
    if (isAstroComponentFactory(Component)) {
      const ServerIsland = Component;
      Component = function(...args) {
        return ServerIsland.apply(this, args);
      };
      Object.assign(Component, ServerIsland);
      Component.propagation = "self";
    }
    return renderTemplate`${renderComponent(result, "Component", Component, props, slots)}`;
  };
  page.isAstroComponentFactory = true;
  const instance = {
    default: page,
    partial: true
  };
  return instance;
}

function createDefaultRoutes(manifest) {
  const root = new URL(manifest.rootDir);
  return [
    {
      instance: default404Instance,
      matchesComponent: (filePath) => filePath.href === new URL(DEFAULT_404_COMPONENT, root).href,
      route: DEFAULT_404_ROUTE.route,
      component: DEFAULT_404_COMPONENT
    },
    {
      instance: createEndpoint(manifest),
      matchesComponent: (filePath) => filePath.href === new URL(SERVER_ISLAND_COMPONENT, root).href,
      route: SERVER_ISLAND_ROUTE,
      component: SERVER_ISLAND_COMPONENT
    }
  ];
}

function ensure404Route(manifest) {
  if (!manifest.routes.some((route) => route.route === "/404")) {
    manifest.routes.push(DEFAULT_404_ROUTE);
  }
  return manifest;
}

function routeComparator(a, b) {
  const commonLength = Math.min(a.segments.length, b.segments.length);
  for (let index = 0; index < commonLength; index++) {
    const aSegment = a.segments[index];
    const bSegment = b.segments[index];
    const aIsStatic = aSegment.every((part) => !part.dynamic && !part.spread);
    const bIsStatic = bSegment.every((part) => !part.dynamic && !part.spread);
    if (aIsStatic && bIsStatic) {
      const aContent = aSegment.map((part) => part.content).join("");
      const bContent = bSegment.map((part) => part.content).join("");
      if (aContent !== bContent) {
        return aContent.localeCompare(bContent);
      }
    }
    if (aIsStatic !== bIsStatic) {
      return aIsStatic ? -1 : 1;
    }
    const aAllDynamic = aSegment.every((part) => part.dynamic);
    const bAllDynamic = bSegment.every((part) => part.dynamic);
    if (aAllDynamic !== bAllDynamic) {
      return aAllDynamic ? 1 : -1;
    }
    const aHasSpread = aSegment.some((part) => part.spread);
    const bHasSpread = bSegment.some((part) => part.spread);
    if (aHasSpread !== bHasSpread) {
      return aHasSpread ? 1 : -1;
    }
  }
  const aLength = a.segments.length;
  const bLength = b.segments.length;
  if (aLength !== bLength) {
    const aEndsInRest = a.segments.at(-1)?.some((part) => part.spread);
    const bEndsInRest = b.segments.at(-1)?.some((part) => part.spread);
    if (aEndsInRest !== bEndsInRest && Math.abs(aLength - bLength) === 1) {
      if (aLength > bLength && aEndsInRest) {
        return 1;
      }
      if (bLength > aLength && bEndsInRest) {
        return -1;
      }
    }
    return aLength > bLength ? -1 : 1;
  }
  if (a.type === "endpoint" !== (b.type === "endpoint")) {
    return a.type === "endpoint" ? -1 : 1;
  }
  return a.route.localeCompare(b.route);
}

class Router {
  #routes;
  #base;
  #baseWithoutTrailingSlash;
  #buildFormat;
  #trailingSlash;
  constructor(routes, options) {
    this.#routes = [...routes].sort(routeComparator);
    this.#base = normalizeBase(options.base);
    this.#baseWithoutTrailingSlash = removeTrailingForwardSlash(this.#base);
    this.#buildFormat = options.buildFormat;
    this.#trailingSlash = options.trailingSlash;
  }
  /**
   * Match an input pathname against the route list.
   * If allowWithoutBase is true, a non-base-prefixed path is still considered.
   */
  match(inputPathname, { allowWithoutBase = false } = {}) {
    const normalized = getRedirectForPathname(inputPathname);
    if (normalized.redirect) {
      return { type: "redirect", location: normalized.redirect, status: 301 };
    }
    if (this.#base !== "/") {
      const baseWithSlash = `${this.#baseWithoutTrailingSlash}/`;
      if (this.#trailingSlash === "always" && (normalized.pathname === this.#baseWithoutTrailingSlash || normalized.pathname === this.#base)) {
        return { type: "redirect", location: baseWithSlash, status: 301 };
      }
      if (this.#trailingSlash === "never" && normalized.pathname === baseWithSlash) {
        return { type: "redirect", location: this.#baseWithoutTrailingSlash, status: 301 };
      }
    }
    const baseResult = stripBase(
      normalized.pathname,
      this.#base,
      this.#baseWithoutTrailingSlash,
      this.#trailingSlash
    );
    if (!baseResult) {
      if (!allowWithoutBase) {
        return { type: "none", reason: "outside-base" };
      }
    }
    let pathname = baseResult ?? normalized.pathname;
    if (this.#buildFormat === "file") {
      pathname = normalizeFileFormatPathname(pathname);
    }
    const route = this.#routes.find((candidate) => {
      if (candidate.pattern.test(pathname)) return true;
      return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
    });
    if (!route) {
      return { type: "none", reason: "no-match" };
    }
    const params = getParams(route, pathname);
    return { type: "match", route, params, pathname };
  }
}
function normalizeBase(base) {
  if (!base) return "/";
  if (base === "/") return base;
  return prependForwardSlash$1(base);
}
function getRedirectForPathname(pathname) {
  let value = prependForwardSlash$1(pathname);
  if (value.startsWith("//")) {
    const collapsed = `/${value.replace(/^\/+/, "")}`;
    return { pathname: value, redirect: collapsed };
  }
  return { pathname: value };
}
function stripBase(pathname, base, baseWithoutTrailingSlash, trailingSlash) {
  if (base === "/") return pathname;
  const baseWithSlash = `${baseWithoutTrailingSlash}/`;
  if (pathname === baseWithoutTrailingSlash || pathname === base) {
    return trailingSlash === "always" ? null : "/";
  }
  if (pathname === baseWithSlash) {
    return trailingSlash === "never" ? null : "/";
  }
  if (pathname.startsWith(baseWithSlash)) {
    return pathname.slice(baseWithoutTrailingSlash.length);
  }
  return null;
}
function normalizeFileFormatPathname(pathname) {
  if (pathname.endsWith("/index.html")) {
    const trimmed = pathname.slice(0, -"/index.html".length);
    return trimmed === "" ? "/" : trimmed;
  }
  if (pathname.endsWith(".html")) {
    const trimmed = pathname.slice(0, -".html".length);
    return trimmed === "" ? "/" : trimmed;
  }
  return pathname;
}

function deserializeManifest(serializedManifest, routesList) {
  const routes = [];
  if (serializedManifest.routes) {
    for (const serializedRoute of serializedManifest.routes) {
      routes.push({
        ...serializedRoute,
        routeData: deserializeRouteData(serializedRoute.routeData)
      });
      const route = serializedRoute;
      route.routeData = deserializeRouteData(serializedRoute.routeData);
    }
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    rootDir: new URL(serializedManifest.rootDir),
    srcDir: new URL(serializedManifest.srcDir),
    publicDir: new URL(serializedManifest.publicDir),
    outDir: new URL(serializedManifest.outDir),
    cacheDir: new URL(serializedManifest.cacheDir),
    buildClientDir: new URL(serializedManifest.buildClientDir),
    buildServerDir: new URL(serializedManifest.buildServerDir),
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    key
  };
}
function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    // nosemgrep: javascript.lang.security.audit.detect-non-literal-regexp.detect-non-literal-regexp
    // This pattern is serialized from Astro's own route manifest.
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin,
    distURL: rawRouteData.distURL
  };
}
function deserializeRouteInfo(rawRouteInfo) {
  return {
    styles: rawRouteInfo.styles,
    file: rawRouteInfo.file,
    links: rawRouteInfo.links,
    scripts: rawRouteInfo.scripts,
    routeData: deserializeRouteData(rawRouteInfo.routeData)
  };
}

class NodePool {
  textPool = [];
  htmlStringPool = [];
  componentPool = [];
  instructionPool = [];
  maxSize;
  enableStats;
  stats = {
    acquireFromPool: 0,
    acquireNew: 0,
    released: 0,
    releasedDropped: 0
  };
  /**
   * Creates a new object pool for queue nodes.
   *
   * @param maxSize - Maximum number of nodes to keep in the pool (default: 1000).
   *   The cap is shared across all typed sub-pools.
   * @param enableStats - Enable statistics tracking (default: false for performance)
   */
  constructor(maxSize = 1e3, enableStats = false) {
    this.maxSize = maxSize;
    this.enableStats = enableStats;
  }
  /**
   * Acquires a queue node from the pool or creates a new one if the pool is empty.
   * Pops from the type-specific sub-pool to reuse an existing object when available.
   *
   * @param type - The type of queue node to acquire
   * @param content - Optional content to set on the node (for text or html-string types)
   * @returns A queue node ready to be populated with data
   */
  acquire(type, content) {
    const pooledNode = this.popFromTypedPool(type);
    if (pooledNode) {
      if (this.enableStats) {
        this.stats.acquireFromPool = this.stats.acquireFromPool + 1;
      }
      this.resetNodeContent(pooledNode, type, content);
      return pooledNode;
    }
    if (this.enableStats) {
      this.stats.acquireNew = this.stats.acquireNew + 1;
    }
    return this.createNode(type, content);
  }
  /**
   * Creates a new node of the specified type with the given content.
   * Helper method to reduce branching in acquire().
   */
  createNode(type, content = "") {
    switch (type) {
      case "text":
        return { type: "text", content };
      case "html-string":
        return { type: "html-string", html: content };
      case "component":
        return { type: "component", instance: void 0 };
      case "instruction":
        return { type: "instruction", instruction: void 0 };
    }
  }
  /**
   * Pops a node from the type-specific sub-pool.
   * Returns undefined if the sub-pool for the requested type is empty.
   */
  popFromTypedPool(type) {
    switch (type) {
      case "text":
        return this.textPool.pop();
      case "html-string":
        return this.htmlStringPool.pop();
      case "component":
        return this.componentPool.pop();
      case "instruction":
        return this.instructionPool.pop();
    }
  }
  /**
   * Resets the content/value field on a reused pooled node.
   * The type discriminant is already correct since we pop from the matching sub-pool.
   */
  resetNodeContent(node, type, content) {
    switch (type) {
      case "text":
        node.content = content ?? "";
        break;
      case "html-string":
        node.html = content ?? "";
        break;
      case "component":
        node.instance = void 0;
        break;
      case "instruction":
        node.instruction = void 0;
        break;
    }
  }
  /**
   * Returns the total number of nodes across all typed sub-pools.
   */
  totalPoolSize() {
    return this.textPool.length + this.htmlStringPool.length + this.componentPool.length + this.instructionPool.length;
  }
  /**
   * Releases a queue node back to the pool for reuse.
   * If the pool is at max capacity, the node is discarded (will be GC'd).
   *
   * @param node - The node to release back to the pool
   */
  release(node) {
    if (this.totalPoolSize() >= this.maxSize) {
      if (this.enableStats) {
        this.stats.releasedDropped = this.stats.releasedDropped + 1;
      }
      return;
    }
    switch (node.type) {
      case "text":
        node.content = "";
        this.textPool.push(node);
        break;
      case "html-string":
        node.html = "";
        this.htmlStringPool.push(node);
        break;
      case "component":
        node.instance = void 0;
        this.componentPool.push(node);
        break;
      case "instruction":
        node.instruction = void 0;
        this.instructionPool.push(node);
        break;
    }
    if (this.enableStats) {
      this.stats.released = this.stats.released + 1;
    }
  }
  /**
   * Releases all nodes in an array back to the pool.
   * This is a convenience method for releasing multiple nodes at once.
   *
   * @param nodes - Array of nodes to release
   */
  releaseAll(nodes) {
    for (const node of nodes) {
      this.release(node);
    }
  }
  /**
   * Clears all typed sub-pools, discarding all cached nodes.
   * This can be useful if you want to free memory after a large render.
   */
  clear() {
    this.textPool.length = 0;
    this.htmlStringPool.length = 0;
    this.componentPool.length = 0;
    this.instructionPool.length = 0;
  }
  /**
   * Gets the current total number of nodes across all typed sub-pools.
   * Useful for monitoring pool usage and tuning maxSize.
   *
   * @returns Number of nodes currently available in the pool
   */
  size() {
    return this.totalPoolSize();
  }
  /**
   * Gets pool statistics for debugging.
   *
   * @returns Pool usage statistics including computed metrics
   */
  getStats() {
    return {
      ...this.stats,
      poolSize: this.totalPoolSize(),
      maxSize: this.maxSize,
      hitRate: this.stats.acquireFromPool + this.stats.acquireNew > 0 ? this.stats.acquireFromPool / (this.stats.acquireFromPool + this.stats.acquireNew) * 100 : 0
    };
  }
  /**
   * Resets pool statistics.
   */
  resetStats() {
    this.stats = {
      acquireFromPool: 0,
      acquireNew: 0,
      released: 0,
      releasedDropped: 0
    };
  }
}

class HTMLStringCache {
  cache = /* @__PURE__ */ new Map();
  maxSize;
  constructor(maxSize = 1e3) {
    this.maxSize = maxSize;
    this.warm(COMMON_HTML_PATTERNS);
  }
  /**
   * Get or create an HTMLString for the given content.
   * If cached, the existing object is returned and moved to end (most recently used).
   * If not cached, a new HTMLString is created, cached, and returned.
   *
   * @param content - The HTML string content
   * @returns HTMLString object (cached or newly created)
   */
  getOrCreate(content) {
    const cached = this.cache.get(content);
    if (cached) {
      this.cache.delete(content);
      this.cache.set(content, cached);
      return cached;
    }
    const htmlString = new HTMLString(content);
    this.cache.set(content, htmlString);
    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== void 0) {
        this.cache.delete(firstKey);
      }
    }
    return htmlString;
  }
  /**
   * Get current cache size
   */
  size() {
    return this.cache.size;
  }
  /**
   * Pre-warms the cache with common HTML patterns.
   * This ensures first-render cache hits for frequently used tags.
   *
   * @param patterns - Array of HTML strings to pre-cache
   */
  warm(patterns) {
    for (const pattern of patterns) {
      if (!this.cache.has(pattern)) {
        this.cache.set(pattern, new HTMLString(pattern));
      }
    }
  }
  /**
   * Clear the entire cache
   */
  clear() {
    this.cache.clear();
  }
}
const COMMON_HTML_PATTERNS = [
  // Structural elements
  "<div>",
  "</div>",
  "<span>",
  "</span>",
  "<p>",
  "</p>",
  "<section>",
  "</section>",
  "<article>",
  "</article>",
  "<header>",
  "</header>",
  "<footer>",
  "</footer>",
  "<nav>",
  "</nav>",
  "<main>",
  "</main>",
  "<aside>",
  "</aside>",
  // List elements
  "<ul>",
  "</ul>",
  "<ol>",
  "</ol>",
  "<li>",
  "</li>",
  // Void/self-closing elements
  "<br>",
  "<hr>",
  "<br/>",
  "<hr/>",
  // Heading elements
  "<h1>",
  "</h1>",
  "<h2>",
  "</h2>",
  "<h3>",
  "</h3>",
  "<h4>",
  "</h4>",
  // Inline elements
  "<a>",
  "</a>",
  "<strong>",
  "</strong>",
  "<em>",
  "</em>",
  "<code>",
  "</code>",
  // Common whitespace
  " ",
  "\n"
];

const FORBIDDEN_PATH_KEYS = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]);

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.destination;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(s.bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return s.red(prefix.join(" "));
  }
  if (level === "warn") {
    return s.yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return s.dim(prefix[0]);
  }
  return s.dim(prefix[0]) + " " + s.blue(prefix.splice(1).join(" "));
}
class AstroLogger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  setDestination(destination) {
    this.options.destination = destination;
  }
  /**
   * It calls the `close` function of the provided destination, if it exists.
   */
  close() {
    if (this.options.destination.close) {
      this.options.destination.close();
    }
  }
  /**
   * It calls the `flush` function of the provided destinatin, if it exists.
   */
  flush() {
    if (this.options.destination.flush) {
      this.options.destination.flush();
    }
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
  /**
   * It calls the `flush` function of the provided destination, if it exists.
   */
  flush() {
    if (this.options.destination.flush) {
      this.options.destination.flush();
    }
  }
  /**
   * It calls the `close` function of the provided destination, if it exists.
   */
  close() {
    if (this.options.destination.close) {
      this.options.destination.close();
    }
  }
}

function matchesLevel(messageLevel, configuredLevel) {
  return levels[messageLevel] >= levels[configuredLevel];
}

function nodeLogDestination(config = {}) {
  const { level = "info" } = config;
  return {
    write(event) {
      let dest = process.stderr;
      if (levels[event.level] < levels["error"]) {
        dest = process.stdout;
      }
      if (!matchesLevel(event.level, level)) {
        return;
      }
      let trailingLine = event.newLine ? "\n" : "";
      if (event.label === "SKIP_FORMAT") {
        dest.write(event.message + trailingLine);
      } else {
        dest.write(getEventPrefix(event) + " " + event.message + trailingLine);
      }
    }
  };
}
function node_default(options) {
  return nodeLogDestination(options);
}

function consoleLogDestination(config = {}) {
  const { level = "info" } = config;
  return {
    write(event) {
      let dest = console.error;
      if (levels[event.level] < levels["error"]) {
        dest = console.info;
      }
      if (!matchesLevel(event.level, level)) {
        return;
      }
      if (event.label === "SKIP_FORMAT") {
        dest(event.message);
      } else {
        dest(getEventPrefix(event) + " " + event.message);
      }
    }
  };
}
function createConsoleLogger({ level }) {
  return new AstroLogger({
    level,
    destination: consoleLogDestination()
  });
}
function console_default(options) {
  return consoleLogDestination(options);
}

const SGR_REGEX = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, "g");
function jsonLoggerDestination(config = {}) {
  const { pretty = false, level = "info" } = config;
  return {
    write(event) {
      let dest = process.stderr;
      if (levels[event.level] < levels["error"]) {
        dest = process.stdout;
      }
      if (!matchesLevel(event.level, level)) {
        return;
      }
      let trailingLine = event.newLine ? "\n" : "";
      const message = event.message.replace(SGR_REGEX, "");
      if (pretty) {
        dest.write(
          JSON.stringify({ message, label: event.label, level: event.level }, null, 2) + trailingLine
        );
      } else {
        dest.write(
          JSON.stringify({ message, label: event.label, level: event.level }) + trailingLine
        );
      }
    }
  };
}

function compose(destinations) {
  return {
    write(chunk) {
      for (const logger of destinations) {
        logger.write(chunk);
      }
    },
    flush() {
      for (const logger of destinations) {
        if (logger.flush) {
          logger.flush();
        }
      }
    },
    close() {
      for (const logger of destinations) {
        if (logger.close) {
          logger.close();
        }
      }
    }
  };
}

async function loadLogger(config, level = "info") {
  let cause = void 0;
  try {
    switch (config.entrypoint) {
      case "astro/logger/node": {
        return new AstroLogger({
          destination: node_default(config.config),
          level
        });
      }
      case "astro/logger/console": {
        return new AstroLogger({
          destination: console_default(config.config),
          level
        });
      }
      case "astro/logger/json": {
        return new AstroLogger({
          destination: jsonLoggerDestination(config.config),
          level
        });
      }
      case "astro/logger/compose": {
        let destinations = [];
        if (config.config?.loggers) {
          const loggers = config.config?.loggers;
          destinations = await Promise.all(
            loggers.map(async (loggerConfig) => {
              const logger = await import(
                /* @vite-ignore */
                loggerConfig.entrypoint
              );
              return logger.default(loggerConfig.config);
            })
          );
        }
        return new AstroLogger({
          destination: compose(destinations),
          level
        });
      }
      default: {
        const nodeLogger = await import(
          /* @vite-ignore */
          config.entrypoint
        );
        return new AstroLogger({
          destination: nodeLogger.default(config.config),
          level
        });
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      cause = e;
    }
  }
  const error = new AstroError({
    ...UnableToLoadLogger,
    message: UnableToLoadLogger.message(config.entrypoint)
  });
  if (cause) {
    error.cause = cause;
  }
  throw error;
}

const PipelineFeatures = {
  redirects: 1 << 0,
  sessions: 1 << 1,
  actions: 1 << 2,
  middleware: 1 << 3,
  i18n: 1 << 4,
  cache: 1 << 5
};
class Pipeline {
  internalMiddleware;
  resolvedMiddleware = void 0;
  resolvedLogger = false;
  resolvedActions = void 0;
  resolvedSessionDriver = void 0;
  resolvedCacheProvider = void 0;
  compiledCacheRoutes = void 0;
  nodePool;
  htmlStringCache;
  /**
   * Bit mask of pipeline features activated by handler classes.
   * Each handler sets its bit via `|=`. Only meaningful when a
   * custom `src/app.ts` fetch handler is in use.
   */
  usedFeatures = 0;
  logger;
  manifest;
  /**
   * "development" or "production" only
   */
  runtimeMode;
  renderers;
  resolve;
  streaming;
  /**
   * Used to provide better error messages for `Astro.clientAddress`
   */
  adapterName;
  clientDirectives;
  inlinedScripts;
  compressHTML;
  i18n;
  middleware;
  routeCache;
  /**
   * Used for `Astro.site`.
   */
  site;
  /**
   * Array of built-in, internal, routes.
   * Used to find the route module
   */
  defaultRoutes;
  actions;
  sessionDriver;
  cacheProvider;
  cacheConfig;
  serverIslands;
  /** Route data derived from the manifest, used for route matching. */
  manifestData;
  /** Pattern-matching router built from manifestData. */
  #router;
  constructor(logger, manifest, runtimeMode, renderers, resolve, streaming, adapterName = manifest.adapterName, clientDirectives = manifest.clientDirectives, inlinedScripts = manifest.inlinedScripts, compressHTML = manifest.compressHTML, i18n = manifest.i18n, middleware = manifest.middleware, routeCache = new RouteCache(logger, runtimeMode), site = manifest.site ? new URL(manifest.site) : void 0, defaultRoutes = createDefaultRoutes(manifest), actions = manifest.actions, sessionDriver = manifest.sessionDriver, cacheProvider = manifest.cacheProvider, cacheConfig = manifest.cacheConfig, serverIslands = manifest.serverIslandMappings) {
    this.logger = logger;
    this.manifest = manifest;
    this.runtimeMode = runtimeMode;
    this.renderers = renderers;
    this.resolve = resolve;
    this.streaming = streaming;
    this.adapterName = adapterName;
    this.clientDirectives = clientDirectives;
    this.inlinedScripts = inlinedScripts;
    this.compressHTML = compressHTML;
    this.i18n = i18n;
    this.middleware = middleware;
    this.routeCache = routeCache;
    this.site = site;
    this.defaultRoutes = defaultRoutes;
    this.actions = actions;
    this.sessionDriver = sessionDriver;
    this.cacheProvider = cacheProvider;
    this.cacheConfig = cacheConfig;
    this.serverIslands = serverIslands;
    this.manifestData = { routes: (manifest.routes ?? []).map((route) => route.routeData) };
    ensure404Route(this.manifestData);
    this.#router = new Router(this.manifestData.routes, {
      base: manifest.base,
      trailingSlash: manifest.trailingSlash,
      buildFormat: manifest.buildFormat
    });
    this.internalMiddleware = [];
    if (manifest.experimentalQueuedRendering.enabled) {
      this.nodePool = this.createNodePool(
        manifest.experimentalQueuedRendering.poolSize ?? 1e3,
        false
      );
      if (manifest.experimentalQueuedRendering.contentCache) {
        this.htmlStringCache = this.createStringCache();
      }
    }
  }
  /**
   * Low-level route matching against the manifest routes. Returns the
   * matched `RouteData` or `undefined`. Does not filter prerendered
   * routes or check public assets — use `BaseApp.match()` for that.
   */
  matchRoute(pathname) {
    const match = this.#router.match(pathname, { allowWithoutBase: true });
    if (match.type !== "match") return void 0;
    return match.route;
  }
  /**
   * Rebuilds the internal router after routes have been added or
   * removed (e.g. by the dev server on HMR).
   */
  rebuildRouter() {
    this.#router = new Router(this.manifestData.routes, {
      base: this.manifest.base,
      trailingSlash: this.manifest.trailingSlash,
      buildFormat: this.manifest.buildFormat
    });
  }
  /**
   * Resolves the middleware from the manifest, and returns the `onRequest` function. If `onRequest` isn't there,
   * it returns a no-op function
   */
  async getMiddleware() {
    if (this.resolvedMiddleware) {
      return this.resolvedMiddleware;
    }
    if (this.middleware) {
      const middlewareInstance = await this.middleware();
      const onRequest = middlewareInstance.onRequest ?? NOOP_MIDDLEWARE_FN;
      const internalMiddlewares = [onRequest];
      if (this.manifest.checkOrigin) {
        internalMiddlewares.unshift(createOriginCheckMiddleware());
      }
      this.resolvedMiddleware = sequence(...internalMiddlewares);
      return this.resolvedMiddleware;
    } else {
      this.resolvedMiddleware = NOOP_MIDDLEWARE_FN;
      return this.resolvedMiddleware;
    }
  }
  /**
   * Clears the cached middleware so it is re-resolved on the next request.
   * Called via HMR when middleware files change during development.
   */
  clearMiddleware() {
    this.resolvedMiddleware = void 0;
  }
  /**
   * Resolves the logger destination from the manifest and updates the pipeline logger.
   * If the user configured `experimental.logger`, the bundled logger factory is loaded
   * and replaces the default console destination. This is lazy and only resolves once.
   */
  async getLogger() {
    if (this.resolvedLogger) {
      return this.logger;
    }
    this.resolvedLogger = true;
    if (this.manifest.experimentalLogger) {
      this.logger = await loadLogger(this.manifest.experimentalLogger);
    }
    return this.logger;
  }
  async getActions() {
    if (this.resolvedActions) {
      return this.resolvedActions;
    } else if (this.actions) {
      return this.actions();
    }
    return NOOP_ACTIONS_MOD;
  }
  async getSessionDriver() {
    if (this.resolvedSessionDriver !== void 0) {
      return this.resolvedSessionDriver;
    }
    if (this.sessionDriver) {
      const driverModule = await this.sessionDriver();
      this.resolvedSessionDriver = driverModule?.default || null;
      return this.resolvedSessionDriver;
    }
    this.resolvedSessionDriver = null;
    return null;
  }
  async getCacheProvider() {
    if (this.resolvedCacheProvider !== void 0) {
      return this.resolvedCacheProvider;
    }
    if (this.cacheProvider) {
      const mod = await this.cacheProvider();
      const factory = mod?.default || null;
      this.resolvedCacheProvider = factory ? factory(this.cacheConfig?.options) : null;
      return this.resolvedCacheProvider;
    }
    this.resolvedCacheProvider = null;
    return null;
  }
  async getServerIslands() {
    if (this.serverIslands) {
      return this.serverIslands();
    }
    return {
      serverIslandMap: /* @__PURE__ */ new Map(),
      serverIslandNameMap: /* @__PURE__ */ new Map()
    };
  }
  async getAction(path) {
    const pathKeys = path.split(".").map((key) => decodeURIComponent(key));
    let { server } = await this.getActions();
    if (!server || !(typeof server === "object")) {
      throw new TypeError(
        `Expected \`server\` export in actions file to be an object. Received ${typeof server}.`
      );
    }
    for (const key of pathKeys) {
      if (FORBIDDEN_PATH_KEYS.has(key)) {
        throw new AstroError({
          ...ActionNotFoundError,
          message: ActionNotFoundError.message(pathKeys.join("."))
        });
      }
      if (!Object.hasOwn(server, key)) {
        throw new AstroError({
          ...ActionNotFoundError,
          message: ActionNotFoundError.message(pathKeys.join("."))
        });
      }
      server = server[key];
    }
    if (typeof server !== "function") {
      throw new TypeError(
        `Expected handler for action ${pathKeys.join(".")} to be a function. Received ${typeof server}.`
      );
    }
    return server;
  }
  async getModuleForRoute(route) {
    for (const defaultRoute of this.defaultRoutes) {
      if (route.component === defaultRoute.component) {
        return {
          page: () => Promise.resolve(defaultRoute.instance)
        };
      }
    }
    if (route.type === "redirect") {
      return RedirectSinglePageBuiltModule;
    } else {
      if (this.manifest.pageMap) {
        const importComponentInstance = this.manifest.pageMap.get(route.component);
        if (!importComponentInstance) {
          throw new Error(
            `Unexpectedly unable to find a component instance for route ${route.route}`
          );
        }
        return await importComponentInstance();
      } else if (this.manifest.pageModule) {
        return this.manifest.pageModule;
      }
      throw new Error(
        "Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue."
      );
    }
  }
  createNodePool(poolSize, stats) {
    return new NodePool(poolSize, stats);
  }
  createStringCache() {
    return new HTMLStringCache(1e3);
  }
}

function getFunctionExpression(slot) {
  if (!slot) return;
  const expressions = slot?.expressions?.filter(
    (e) => isRenderInstruction(e) === false || isRenderTemplateResult(e)
  );
  if (expressions?.length !== 1) return;
  const expression = expressions[0];
  if (isRenderTemplateResult(expression)) {
    return getFunctionExpression(expression);
  }
  return expression;
}
class Slots {
  #result;
  #slots;
  #logger;
  constructor(result, slots, logger) {
    this.#result = result;
    this.#slots = slots;
    this.#logger = logger;
    if (slots) {
      for (const key of Object.keys(slots)) {
        if (this[key] !== void 0) {
          throw new AstroError({
            ...ReservedSlotName,
            message: ReservedSlotName.message(key)
          });
        }
        Object.defineProperty(this, key, {
          get() {
            return true;
          },
          enumerable: true
        });
      }
    }
  }
  has(name) {
    if (!this.#slots) return false;
    return Boolean(this.#slots[name]);
  }
  async render(name, args = []) {
    if (!this.#slots || !this.has(name)) return;
    const result = this.#result;
    if (!Array.isArray(args)) {
      this.#logger.warn(
        null,
        `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as an item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`
      );
    } else if (args.length > 0) {
      const slotValue = this.#slots[name];
      const component = typeof slotValue === "function" ? await slotValue(result) : await slotValue;
      const expression = getFunctionExpression(component);
      if (expression) {
        const slot = async () => typeof expression === "function" ? expression(...args) : expression;
        return await renderSlotToString(result, slot).then((res) => {
          return res;
        });
      }
      if (typeof component === "function") {
        return await renderJSX(result, component(...args)).then(
          (res) => res != null ? String(res) : res
        );
      }
    }
    const content = await renderSlotToString(result, this.#slots[name]);
    const outHTML = chunkToString(result, content);
    return outHTML;
  }
}

function deduplicateDirectiveValues(existingDirective, newDirective) {
  const [directiveName, ...existingValues] = existingDirective.split(/\s+/).filter(Boolean);
  const [newDirectiveName, ...newValues] = newDirective.split(/\s+/).filter(Boolean);
  if (directiveName !== newDirectiveName) {
    return void 0;
  }
  const finalDirectives = Array.from(/* @__PURE__ */ new Set([...existingValues, ...newValues]));
  return `${directiveName} ${finalDirectives.join(" ")}`;
}
function pushDirective(directives, newDirective) {
  if (directives.length === 0) {
    return [newDirective];
  }
  const finalDirectives = [];
  let matched = false;
  for (const directive of directives) {
    if (matched) {
      finalDirectives.push(directive);
      continue;
    }
    const result = deduplicateDirectiveValues(directive, newDirective);
    if (result) {
      finalDirectives.push(result);
      matched = true;
    } else {
      finalDirectives.push(directive);
    }
  }
  if (!matched) {
    finalDirectives.push(newDirective);
  }
  return finalDirectives;
}

function computeFallbackRoute(options) {
  const {
    pathname,
    responseStatus,
    fallback,
    fallbackType,
    locales,
    defaultLocale,
    strategy,
    base
  } = options;
  if (responseStatus !== 404) {
    return { type: "none" };
  }
  if (!fallback || Object.keys(fallback).length === 0) {
    return { type: "none" };
  }
  const segments = pathname.split("/");
  const urlLocale = segments.find((segment) => {
    for (const locale of locales) {
      if (typeof locale === "string") {
        if (locale === segment) {
          return true;
        }
      } else if (locale.path === segment) {
        return true;
      }
    }
    return false;
  });
  if (!urlLocale) {
    return { type: "none" };
  }
  const fallbackKeys = Object.keys(fallback);
  if (!fallbackKeys.includes(urlLocale)) {
    return { type: "none" };
  }
  const fallbackLocale = fallback[urlLocale];
  const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
  let newPathname;
  if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") {
    if (pathname.includes(`${base}`)) {
      newPathname = pathname.replace(`/${urlLocale}`, ``);
    } else {
      newPathname = pathname.replace(`/${urlLocale}`, `/`);
    }
  } else {
    newPathname = pathname.replace(`/${urlLocale}`, `/${pathFallbackLocale}`);
  }
  return {
    type: fallbackType,
    pathname: newPathname
  };
}

class I18nRouter {
  #strategy;
  #defaultLocale;
  #locales;
  #base;
  #domains;
  constructor(options) {
    this.#strategy = options.strategy;
    this.#defaultLocale = options.defaultLocale;
    this.#locales = options.locales;
    this.#base = options.base === "/" ? "/" : removeTrailingForwardSlash(options.base || "");
    this.#domains = options.domains;
  }
  /**
   * Evaluate routing strategy for a pathname.
   * Returns decision object (not HTTP Response).
   */
  match(pathname, context) {
    if (this.shouldSkipProcessing(pathname, context)) {
      return { type: "continue" };
    }
    switch (this.#strategy) {
      case "manual":
        return { type: "continue" };
      case "pathname-prefix-always":
        return this.matchPrefixAlways(pathname, context);
      case "domains-prefix-always":
        if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) {
          return { type: "continue" };
        }
        return this.matchPrefixAlways(pathname, context);
      case "pathname-prefix-other-locales":
        return this.matchPrefixOtherLocales(pathname, context);
      case "domains-prefix-other-locales":
        if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) {
          return { type: "continue" };
        }
        return this.matchPrefixOtherLocales(pathname, context);
      case "pathname-prefix-always-no-redirect":
        return this.matchPrefixAlwaysNoRedirect(pathname, context);
      case "domains-prefix-always-no-redirect":
        if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) {
          return { type: "continue" };
        }
        return this.matchPrefixAlwaysNoRedirect(pathname, context);
      default:
        return { type: "continue" };
    }
  }
  /**
   * Check if i18n processing should be skipped for this request
   */
  shouldSkipProcessing(pathname, context) {
    if (pathname.includes("/404") || pathname.includes("/500")) {
      return true;
    }
    if (pathname.includes("/_server-islands/")) {
      return true;
    }
    if (context.isReroute) {
      return true;
    }
    if (context.routeType && context.routeType !== "page" && context.routeType !== "fallback") {
      return true;
    }
    return false;
  }
  /**
   * Strategy: pathname-prefix-always
   * All locales must have a prefix, including the default locale.
   */
  matchPrefixAlways(pathname, _context) {
    const isRoot = pathname === this.#base + "/" || pathname === this.#base;
    if (isRoot) {
      const basePrefix = this.#base === "/" ? "" : this.#base;
      return {
        type: "redirect",
        location: `${basePrefix}/${this.#defaultLocale}`
      };
    }
    if (!pathHasLocale(pathname, this.#locales)) {
      return { type: "notFound" };
    }
    return { type: "continue" };
  }
  /**
   * Strategy: pathname-prefix-other-locales
   * Default locale has no prefix, other locales must have a prefix.
   */
  matchPrefixOtherLocales(pathname, _context) {
    let pathnameContainsDefaultLocale = false;
    for (const segment of pathname.split("/")) {
      if (normalizeTheLocale(segment) === normalizeTheLocale(this.#defaultLocale)) {
        pathnameContainsDefaultLocale = true;
        break;
      }
    }
    if (pathnameContainsDefaultLocale) {
      const newLocation = pathname.replace(`/${this.#defaultLocale}`, "");
      return {
        type: "notFound",
        location: newLocation
      };
    }
    return { type: "continue" };
  }
  /**
   * Strategy: pathname-prefix-always-no-redirect
   * Like prefix-always but allows root to serve instead of redirecting
   */
  matchPrefixAlwaysNoRedirect(pathname, _context) {
    const isRoot = pathname === this.#base + "/" || pathname === this.#base;
    if (isRoot) {
      return { type: "continue" };
    }
    if (!pathHasLocale(pathname, this.#locales)) {
      return { type: "notFound" };
    }
    return { type: "continue" };
  }
  /**
   * Check if the current locale doesn't belong to the configured domain.
   * Used for domain-based routing strategies.
   */
  localeHasntDomain(currentLocale, currentDomain) {
    if (!this.#domains || !currentDomain) {
      return false;
    }
    if (!currentLocale) {
      return false;
    }
    const localesForDomain = this.#domains[currentDomain];
    if (!localesForDomain) {
      return true;
    }
    return !localesForDomain.includes(currentLocale);
  }
}

class I18n {
  #i18n;
  #base;
  #trailingSlash;
  #format;
  #router;
  constructor(i18n, base, trailingSlash, format) {
    this.#i18n = i18n;
    this.#base = base;
    this.#trailingSlash = trailingSlash;
    this.#format = format;
    this.#router = new I18nRouter({
      strategy: i18n.strategy,
      defaultLocale: i18n.defaultLocale,
      locales: i18n.locales,
      base,
      domains: i18n.domainLookupTable ? Object.keys(i18n.domainLookupTable).reduce(
        (acc, domain) => {
          const locale = i18n.domainLookupTable[domain];
          if (!acc[domain]) {
            acc[domain] = [];
          }
          acc[domain].push(locale);
          return acc;
        },
        {}
      ) : void 0
    });
  }
  async finalize(state, response) {
    state.pipeline.usedFeatures |= PipelineFeatures.i18n;
    const i18n = this.#i18n;
    const typeHeader = response.headers.get(ROUTE_TYPE_HEADER);
    const isReroute = response.headers.get(REROUTE_DIRECTIVE_HEADER);
    if (isReroute === "no" && typeof i18n.fallback === "undefined") {
      return response;
    }
    if (typeHeader !== "page" && typeHeader !== "fallback") {
      return response;
    }
    const url = new URL(state.request.url);
    const currentLocale = state.computeCurrentLocale();
    const isPrerendered = state.routeData.prerender;
    const routerContext = {
      currentLocale,
      currentDomain: url.hostname,
      routeType: typeHeader,
      isReroute: isReroute === "yes"
    };
    const routeDecision = this.#router.match(url.pathname, routerContext);
    switch (routeDecision.type) {
      case "redirect": {
        let location = routeDecision.location;
        if (shouldAppendForwardSlash(this.#trailingSlash, this.#format)) {
          location = appendForwardSlash(location);
        }
        return new Response(null, {
          status: routeDecision.status ?? 302,
          headers: { Location: location }
        });
      }
      case "notFound": {
        if (isPrerendered) {
          const prerenderedRes = new Response(response.body, {
            status: 404,
            headers: response.headers
          });
          prerenderedRes.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
          if (routeDecision.location) {
            prerenderedRes.headers.set("Location", routeDecision.location);
          }
          return prerenderedRes;
        }
        const headers = new Headers();
        if (routeDecision.location) {
          headers.set("Location", routeDecision.location);
        }
        return new Response(null, { status: 404, headers });
      }
    }
    if (i18n.fallback && i18n.fallbackType) {
      const effectiveStatus = typeHeader === "fallback" ? 404 : response.status;
      const fallbackDecision = computeFallbackRoute({
        pathname: url.pathname,
        responseStatus: effectiveStatus,
        fallback: i18n.fallback,
        fallbackType: i18n.fallbackType,
        locales: i18n.locales,
        defaultLocale: i18n.defaultLocale,
        strategy: i18n.strategy,
        base: this.#base
      });
      switch (fallbackDecision.type) {
        case "redirect":
          return new Response(null, {
            status: 302,
            headers: { Location: fallbackDecision.pathname + url.search }
          });
        case "rewrite":
          return await state.rewrite(fallbackDecision.pathname + url.search);
      }
    }
    return response;
  }
}

function pathHasLocale(path, locales) {
  const segments = path.split("/").map(normalizeThePath);
  for (const segment of segments) {
    for (const locale of locales) {
      if (typeof locale === "string") {
        if (normalizeTheLocale(segment) === normalizeTheLocale(locale)) {
          return true;
        }
      } else if (segment === locale.path) {
        return true;
      }
    }
  }
  return false;
}
function getPathByLocale(locale, locales) {
  for (const loopLocale of locales) {
    if (typeof loopLocale === "string") {
      if (loopLocale === locale) {
        return loopLocale;
      }
    } else {
      for (const code of loopLocale.codes) {
        if (code === locale) {
          return loopLocale.path;
        }
      }
    }
  }
  throw new AstroError(i18nNoLocaleFoundInPath);
}
function normalizeTheLocale(locale) {
  return locale.replaceAll("_", "-").toLowerCase();
}
function normalizeThePath(path) {
  return path.endsWith(".html") ? path.slice(0, -5) : path;
}
function getAllCodes(locales) {
  const result = [];
  for (const loopLocale of locales) {
    if (typeof loopLocale === "string") {
      result.push(loopLocale);
    } else {
      result.push(...loopLocale.codes);
    }
  }
  return result;
}

function parseLocale(header) {
  if (header === "*") {
    return [{ locale: header, qualityValue: void 0 }];
  }
  const result = [];
  const localeValues = header.split(",").map((str) => str.trim());
  for (const localeValue of localeValues) {
    const split = localeValue.split(";").map((str) => str.trim());
    const localeName = split[0];
    const qualityValue = split[1];
    if (!split) {
      continue;
    }
    if (qualityValue && qualityValue.startsWith("q=")) {
      const qualityValueAsFloat = Number.parseFloat(qualityValue.slice("q=".length));
      if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) {
        result.push({
          locale: localeName,
          qualityValue: void 0
        });
      } else {
        result.push({
          locale: localeName,
          qualityValue: qualityValueAsFloat
        });
      }
    } else {
      result.push({
        locale: localeName,
        qualityValue: void 0
      });
    }
  }
  return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
  const normalizedLocales = getAllCodes(locales).map(normalizeTheLocale);
  return browserLocaleList.filter((browserLocale) => {
    if (browserLocale.locale !== "*") {
      return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
    }
    return true;
  }).sort((a, b) => {
    if (a.qualityValue && b.qualityValue) {
      return Math.sign(b.qualityValue - a.qualityValue);
    }
    return 0;
  });
}
function computePreferredLocale(request, locales) {
  const acceptHeader = request.headers.get("Accept-Language");
  let result = void 0;
  if (acceptHeader) {
    const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
    const firstResult = browserLocaleList.at(0);
    if (firstResult && firstResult.locale !== "*") {
      outer: for (const currentLocale of locales) {
        if (typeof currentLocale === "string") {
          if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
            result = currentLocale;
            break;
          }
        } else {
          for (const currentCode of currentLocale.codes) {
            if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
              result = currentCode;
              break outer;
            }
          }
        }
      }
    }
  }
  return result;
}
function computePreferredLocaleList(request, locales) {
  const acceptHeader = request.headers.get("Accept-Language");
  let result = [];
  if (acceptHeader) {
    const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
    if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") {
      return getAllCodes(locales);
    } else if (browserLocaleList.length > 0) {
      for (const browserLocale of browserLocaleList) {
        for (const loopLocale of locales) {
          if (typeof loopLocale === "string") {
            if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) {
              result.push(loopLocale);
            }
          } else {
            for (const code of loopLocale.codes) {
              if (code === browserLocale.locale) {
                result.push(code);
              }
            }
          }
        }
      }
    }
  }
  return result;
}
function computeCurrentLocale(pathname, locales, defaultLocale) {
  for (const segment of pathname.split("/").map(normalizeThePath)) {
    for (const locale of locales) {
      if (typeof locale === "string") {
        if (!segment.includes(locale)) continue;
        if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) {
          return locale;
        }
      } else {
        if (locale.path === segment) {
          return locale.codes.at(0);
        } else {
          for (const code of locale.codes) {
            if (normalizeTheLocale(code) === normalizeTheLocale(segment)) {
              return code;
            }
          }
        }
      }
    }
  }
  for (const locale of locales) {
    if (typeof locale === "string") {
      if (locale === defaultLocale) {
        return locale;
      }
    } else {
      if (locale.path === defaultLocale) {
        return locale.codes.at(0);
      }
    }
  }
}
function computeCurrentLocaleFromParams(params, locales) {
  const byNormalizedCode = /* @__PURE__ */ new Map();
  const byPath = /* @__PURE__ */ new Map();
  for (const locale of locales) {
    if (typeof locale === "string") {
      byNormalizedCode.set(normalizeTheLocale(locale), locale);
    } else {
      byPath.set(locale.path, locale.codes[0]);
      for (const code of locale.codes) {
        byNormalizedCode.set(normalizeTheLocale(code), code);
      }
    }
  }
  for (const value of Object.values(params)) {
    if (!value) continue;
    const pathMatch = byPath.get(value);
    if (pathMatch) return pathMatch;
    const codeMatch = byNormalizedCode.get(normalizeTheLocale(value));
    if (codeMatch) return codeMatch;
  }
}

async function callMiddleware(onRequest, apiContext, responseFunction) {
  let nextCalled = false;
  let responseFunctionPromise = void 0;
  const next = async (payload) => {
    nextCalled = true;
    responseFunctionPromise = responseFunction(apiContext, payload);
    return responseFunctionPromise;
  };
  const middlewarePromise = onRequest(apiContext, next);
  return await Promise.resolve(middlewarePromise).then(async (value) => {
    if (nextCalled) {
      if (typeof value !== "undefined") {
        if (value instanceof Response === false) {
          throw new AstroError(MiddlewareNotAResponse);
        }
        return value;
      } else {
        if (responseFunctionPromise) {
          return responseFunctionPromise;
        } else {
          throw new AstroError(MiddlewareNotAResponse);
        }
      }
    } else if (typeof value === "undefined") {
      throw new AstroError(MiddlewareNoDataOrNextCalled);
    } else if (value instanceof Response === false) {
      throw new AstroError(MiddlewareNotAResponse);
    } else {
      return value;
    }
  });
}

const EMPTY_OPTIONS = Object.freeze({ tags: [] });
class NoopAstroCache {
  enabled = false;
  set() {
  }
  get tags() {
    return [];
  }
  get options() {
    return EMPTY_OPTIONS;
  }
  async invalidate() {
  }
}
let hasWarned = false;
class DisabledAstroCache {
  enabled = false;
  #logger;
  constructor(logger) {
    this.#logger = logger;
  }
  #warn() {
    if (!hasWarned) {
      hasWarned = true;
      this.#logger?.warn(
        "cache",
        "`cache.set()` was called but caching is not enabled. Configure a cache provider in your Astro config under `experimental.cache` to enable caching."
      );
    }
  }
  set() {
    this.#warn();
  }
  get tags() {
    return [];
  }
  get options() {
    return EMPTY_OPTIONS;
  }
  async invalidate() {
    throw new AstroError(CacheNotEnabled);
  }
}

class AstroMiddleware {
  #pipeline;
  constructor(pipeline) {
    this.#pipeline = pipeline;
  }
  async handle(state, renderRouteCallback) {
    state.pipeline.usedFeatures |= PipelineFeatures.middleware;
    const pipeline = this.#pipeline;
    await state.getProps();
    const apiContext = state.getAPIContext();
    state.counter++;
    if (state.counter === 4) {
      return new Response("Loop Detected", {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508
        status: 508,
        statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
      });
    }
    const next = async (ctx, payload) => {
      if (payload) {
        pipeline.logger.debug("router", "Called rewriting to:", payload);
        const result = await pipeline.tryRewrite(payload, state.request);
        applyRewriteToState(state, payload, result);
      }
      return renderRouteCallback(state, ctx);
    };
    let response;
    if (state.skipMiddleware) {
      response = await next(apiContext);
    } else {
      const pipelineMiddleware = await pipeline.getMiddleware();
      const composed = sequence(...pipeline.internalMiddleware, pipelineMiddleware);
      response = await callMiddleware(composed, apiContext, next);
    }
    return this.#finalize(state, response);
  }
  #finalize(state, response) {
    if (response.headers.get(ROUTE_TYPE_HEADER)) {
      response.headers.delete(ROUTE_TYPE_HEADER);
    }
    attachCookiesToResponse(response, state.cookies);
    return response;
  }
}

const EMPTY_SLOTS = Object.freeze({});
class PagesHandler {
  #pipeline;
  constructor(pipeline) {
    this.#pipeline = pipeline;
  }
  async handle(state, ctx) {
    const pipeline = this.#pipeline;
    const { logger, streaming } = pipeline;
    let response;
    const componentInstance = await state.loadComponentInstance();
    switch (state.routeData.type) {
      case "endpoint": {
        response = await renderEndpoint(
          componentInstance,
          ctx,
          state.routeData.prerender,
          logger
        );
        break;
      }
      case "page": {
        const props = await state.getProps();
        const actionApiContext = state.getActionAPIContext();
        const result = await state.createResult(componentInstance, actionApiContext);
        try {
          response = await renderPage(
            result,
            componentInstance?.default,
            props,
            state.slots ?? EMPTY_SLOTS,
            streaming,
            state.routeData
          );
        } catch (e) {
          result.cancelled = true;
          throw e;
        }
        response.headers.set(ROUTE_TYPE_HEADER, "page");
        if (state.routeData.route === "/404" || state.routeData.route === "/500") {
          response.headers.set(REROUTE_DIRECTIVE_HEADER, "no");
        }
        if (state.isRewriting) {
          response.headers.set(REWRITE_DIRECTIVE_HEADER_KEY, REWRITE_DIRECTIVE_HEADER_VALUE);
        }
        break;
      }
      case "redirect": {
        return new Response(null, { status: 404, headers: { [ASTRO_ERROR_HEADER]: "true" } });
      }
      case "fallback": {
        return new Response(null, { status: 500, headers: { [ROUTE_TYPE_HEADER]: "fallback" } });
      }
    }
    const responseCookies = getCookiesFromResponse(response);
    if (responseCookies) {
      state.cookies.merge(responseCookies);
    }
    return response;
  }
}

function validateAndDecodePathname(pathname) {
  let decoded;
  try {
    decoded = decodeURI(pathname);
  } catch (_e) {
    throw new Error("Invalid URL encoding");
  }
  const hasDecoding = decoded !== pathname;
  const decodedStillHasEncoding = /%[0-9a-fA-F]{2}/.test(decoded);
  if (hasDecoding && decodedStillHasEncoding) {
    throw new Error("Multi-level URL encoding is not allowed");
  }
  return decoded;
}

function createNormalizedUrl(requestUrl) {
  return normalizeUrl(new URL(requestUrl));
}
function normalizeUrl(url) {
  try {
    url.pathname = validateAndDecodePathname(url.pathname);
  } catch {
    try {
      url.pathname = decodeURI(url.pathname);
    } catch {
    }
  }
  url.pathname = collapseDuplicateSlashes(url.pathname);
  return url;
}

function applyRewriteToState(state, payload, { routeData, componentInstance, newUrl, pathname }, { mergeCookies = false } = {}) {
  const pipeline = state.pipeline;
  const oldPathname = state.pathname;
  const isI18nFallback = routeData.fallbackRoutes && routeData.fallbackRoutes.length > 0;
  if (pipeline.manifest.serverLike && !state.routeData.prerender && routeData.prerender && !isI18nFallback) {
    throw new AstroError({
      ...ForbiddenRewrite,
      message: ForbiddenRewrite.message(state.pathname, pathname, routeData.component),
      hint: ForbiddenRewrite.hint(routeData.component)
    });
  }
  state.routeData = routeData;
  state.componentInstance = componentInstance;
  if (payload instanceof Request) {
    state.request = payload;
  } else {
    state.request = copyRequest(
      newUrl,
      state.request,
      routeData.prerender,
      pipeline.logger,
      state.routeData.route
    );
  }
  state.url = createNormalizedUrl(state.request.url);
  if (mergeCookies) {
    const newCookies = new AstroCookies(state.request);
    if (state.cookies) {
      newCookies.merge(state.cookies);
    }
    state.cookies = newCookies;
  }
  state.params = getParams(routeData, pathname);
  state.pathname = pathname;
  state.isRewriting = true;
  state.status = 200;
  setOriginPathname(
    state.request,
    oldPathname,
    pipeline.manifest.trailingSlash,
    pipeline.manifest.buildFormat
  );
  state.invalidateContexts();
}
class Rewrites {
  async execute(state, payload) {
    const pipeline = state.pipeline;
    pipeline.logger.debug("router", "Calling rewrite: ", payload);
    const result = await pipeline.tryRewrite(payload, state.request);
    applyRewriteToState(state, payload, result, { mergeCookies: true });
    const middleware = new AstroMiddleware(pipeline);
    const pagesHandler = new PagesHandler(pipeline);
    return middleware.handle(state, pagesHandler.handle.bind(pagesHandler));
  }
}

function matchRoute(pathname, manifest) {
  if (isRoute404(pathname)) {
    const errorRoute = manifest.routes.find((route) => isRoute404(route.route));
    if (errorRoute) return errorRoute;
  }
  if (isRoute500(pathname)) {
    const errorRoute = manifest.routes.find((route) => isRoute500(route.route));
    if (errorRoute) return errorRoute;
  }
  return manifest.routes.find((route) => {
    return route.pattern.test(pathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
  });
}
function isRoute404or500(route) {
  return isRoute404(route.route) || isRoute500(route.route);
}
function isRouteServerIsland(route) {
  return route.component === SERVER_ISLAND_COMPONENT;
}

const renderOptionsSymbol = /* @__PURE__ */ Symbol.for("astro.renderOptions");
function getRenderOptions(request) {
  return Reflect.get(request, renderOptionsSymbol);
}
function setRenderOptions(request, options) {
  Reflect.set(request, renderOptionsSymbol, options);
}

class FetchState {
  pipeline;
  /**
   * The request to render. Mutated during rewrites so subsequent renders
   * see the rewritten URL.
   */
  request;
  routeData;
  /**
   * The pathname to use for routing and rendering. Starts out as the raw,
   * base-stripped, decoded pathname from the request. May be further
   * normalized by `AstroHandler` after routeData is known (in dev, when
   * the matched route has no `.html` extension, `.html` / `/index.html`
   * suffixes are stripped).
   */
  pathname;
  /** Resolved render options (addCookieHeader, clientAddress, locals, etc.). */
  renderOptions;
  /** When the request started, used to log duration. */
  timeStart;
  /**
   * The route's loaded component module. Set before middleware runs; may
   * be swapped during in-flight rewrites from inside the middleware chain.
   */
  componentInstance;
  /**
   * Slot overrides supplied by the container API. `undefined` for HTTP
   * requests — `PagesHandler` coalesces to `{}` on read so we don't
   * allocate an empty object per request.
   */
  slots;
  /**
   * Default HTTP status for the rendered response. Callers override
   * before rendering runs (e.g. `AstroHandler` sets this from
   * `BaseApp.getDefaultStatusCode`; error handlers set `404` / `500`).
   */
  status = 200;
  /** Whether user middleware should be skipped for this request. */
  skipMiddleware = false;
  /** A flag that tells the render content if the rewriting was triggered. */
  isRewriting = false;
  /** A safety net in case of loops (rewrite counter). */
  counter = 0;
  /** Cookies for this request. Created lazily on first access. */
  cookies;
  /** Route params derived from routeData + pathname. Computed lazily. */
  #params;
  get params() {
    if (!this.#params && this.routeData) {
      this.#params = getParams(this.routeData, this.pathname);
    }
    return this.#params;
  }
  set params(value) {
    this.#params = value;
  }
  /** Normalized URL for this request. */
  url;
  /** Client address for this request. */
  clientAddress;
  /** Whether this is a partial render (container API). */
  partial;
  /** Whether to inject CSP meta tags. */
  shouldInjectCspMetaTags;
  /** Request-scoped locals object, shared with user middleware. */
  locals = {};
  /**
   * Memoized `props` (see `getProps`). `null` means "not yet computed"
   * — using `null` (rather than `undefined`) keeps the hidden class
   * stable and distinct from a valid-but-empty result.
   */
  props = null;
  /** Memoized `ActionAPIContext` (see `getActionAPIContext`). */
  actionApiContext = null;
  /** Memoized `APIContext` (see `getAPIContext`). */
  apiContext = null;
  /** Registered context providers keyed by name. Lazy-initialized on first provide(). */
  #providers;
  /** Cached values from resolved providers. Lazy-initialized on first resolve(). */
  #providersResolvedValues;
  /** Cached promise for lazy component instance loading. */
  #componentInstancePromise;
  /** SSR result for the current page render. */
  result;
  /** Initial props (from container/error handler). */
  initialProps = {};
  /** Rewrites handler instance. Lazy-initialized on first rewrite(). */
  #rewrites;
  /** Memoized Astro page partial. */
  #astroPagePartial;
  /** Memoized current locale. */
  #currentLocale;
  /** Memoized preferred locale. */
  #preferredLocale;
  /** Memoized preferred locale list. */
  #preferredLocaleList;
  constructor(pipeline, request, options) {
    this.pipeline = pipeline;
    this.request = request;
    options ??= getRenderOptions(request);
    this.routeData = options?.routeData;
    this.renderOptions = options ?? {
      addCookieHeader: false,
      clientAddress: void 0,
      locals: void 0,
      prerenderedErrorPageFetch: fetch,
      routeData: void 0,
      waitUntil: void 0
    };
    this.componentInstance = void 0;
    this.slots = void 0;
    const url = new URL(request.url);
    this.pathname = this.#computePathname(url);
    this.timeStart = performance.now();
    this.clientAddress = options?.clientAddress;
    this.locals = options?.locals ?? {};
    this.url = normalizeUrl(url);
    this.cookies = new AstroCookies(request);
    if (!Reflect.get(request, originPathnameSymbol)) {
      setOriginPathname(
        request,
        this.pathname,
        pipeline.manifest.trailingSlash,
        pipeline.manifest.buildFormat
      );
    }
    this.#resolveRouteData();
  }
  /**
   * Triggers a rewrite. Delegates to the Rewrites handler.
   */
  rewrite(payload) {
    return (this.#rewrites ??= new Rewrites()).execute(this, payload);
  }
  /**
   * Creates the SSR result for the current page render.
   */
  async createResult(mod, ctx) {
    const pipeline = this.pipeline;
    const { clientDirectives, inlinedScripts, compressHTML, manifest, renderers, resolve } = pipeline;
    const routeData = this.routeData;
    const { links, scripts, styles } = await pipeline.headElements(routeData);
    const extraStyleHashes = [];
    const extraScriptHashes = [];
    const shouldInjectCspMetaTags = this.shouldInjectCspMetaTags ?? manifest.shouldInjectCspMetaTags;
    const cspAlgorithm = manifest.csp?.algorithm ?? "SHA-256";
    if (shouldInjectCspMetaTags) {
      for (const style of styles) {
        extraStyleHashes.push(await generateCspDigest(style.children, cspAlgorithm));
      }
      for (const script of scripts) {
        extraScriptHashes.push(await generateCspDigest(script.children, cspAlgorithm));
      }
    }
    const componentMetadata = await pipeline.componentMetadata(routeData) ?? manifest.componentMetadata;
    const headers = new Headers({ "Content-Type": "text/html" });
    const partial = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
    const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
    const status = this.status;
    const response = {
      status: actionResult?.error ? actionResult?.error.status : status,
      statusText: actionResult?.error ? actionResult?.error.type : "OK",
      get headers() {
        return headers;
      },
      set headers(_) {
        throw new AstroError(AstroResponseHeadersReassigned);
      }
    };
    const state = this;
    const result = {
      base: manifest.base,
      userAssetsBase: manifest.userAssetsBase,
      cancelled: false,
      clientDirectives,
      inlinedScripts,
      componentMetadata,
      compressHTML,
      cookies: this.cookies,
      createAstro: (props, slots) => state.createAstro(result, props, slots, ctx),
      links,
      // SAFETY: createResult is only called after route resolution, so routeData
      // is always set and the params getter always returns a value.
      params: this.params,
      partial,
      pathname: this.pathname,
      renderers,
      resolve,
      response,
      request: this.request,
      scripts,
      styles,
      actionResult,
      async getServerIslandNameMap() {
        const serverIslands = await pipeline.getServerIslands();
        return serverIslands.serverIslandNameMap ?? /* @__PURE__ */ new Map();
      },
      key: manifest.key,
      trailingSlash: manifest.trailingSlash,
      _experimentalQueuedRendering: {
        pool: pipeline.nodePool,
        htmlStringCache: pipeline.htmlStringCache,
        enabled: manifest.experimentalQueuedRendering?.enabled,
        poolSize: manifest.experimentalQueuedRendering?.poolSize,
        contentCache: manifest.experimentalQueuedRendering?.contentCache
      },
      _metadata: {
        hasHydrationScript: false,
        rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
        hasRenderedHead: false,
        renderedScripts: /* @__PURE__ */ new Set(),
        hasDirectives: /* @__PURE__ */ new Set(),
        hasRenderedServerIslandRuntime: false,
        headInTree: false,
        extraHead: [],
        extraStyleHashes,
        extraScriptHashes,
        propagators: /* @__PURE__ */ new Set(),
        templateDepth: 0
      },
      cspDestination: manifest.csp?.cspDestination ?? (routeData.prerender ? "meta" : "header"),
      shouldInjectCspMetaTags,
      cspAlgorithm,
      scriptHashes: manifest.csp?.scriptHashes ? [...manifest.csp.scriptHashes] : [],
      scriptResources: manifest.csp?.scriptResources ? [...manifest.csp.scriptResources] : [],
      styleHashes: manifest.csp?.styleHashes ? [...manifest.csp.styleHashes] : [],
      styleResources: manifest.csp?.styleResources ? [...manifest.csp.styleResources] : [],
      directives: manifest.csp?.directives ? [...manifest.csp.directives] : [],
      isStrictDynamic: manifest.csp?.isStrictDynamic ?? false,
      internalFetchHeaders: manifest.internalFetchHeaders
    };
    this.result = result;
    return result;
  }
  /**
   * Creates the Astro global object for a component render.
   */
  createAstro(result, props, slotValues, apiContext) {
    let astroPagePartial;
    if (this.isRewriting) {
      this.#astroPagePartial = this.createAstroPagePartial(result, apiContext);
    }
    this.#astroPagePartial ??= this.createAstroPagePartial(result, apiContext);
    astroPagePartial = this.#astroPagePartial;
    const astroComponentPartial = { props, self: null };
    const Astro = Object.assign(
      Object.create(astroPagePartial),
      astroComponentPartial
    );
    let _slots;
    Object.defineProperty(Astro, "slots", {
      get: () => {
        if (!_slots) {
          _slots = new Slots(
            result,
            slotValues,
            this.pipeline.logger
          );
        }
        return _slots;
      }
    });
    return Astro;
  }
  /**
   * Creates the Astro page-level partial (prototype for Astro global).
   */
  createAstroPagePartial(result, apiContext) {
    const state = this;
    const { cookies, locals, params, pipeline, url } = this;
    const { response } = result;
    const redirect = (path, status = 302) => {
      if (state.request[responseSentSymbol$1]) {
        throw new AstroError({
          ...ResponseSentError
        });
      }
      return new Response(null, { status, headers: { Location: path } });
    };
    const rewrite = async (reroutePayload) => {
      return await state.rewrite(reroutePayload);
    };
    const callAction = createCallAction(apiContext);
    const partial = {
      generator: ASTRO_GENERATOR,
      routePattern: this.routeData.route,
      isPrerendered: this.routeData.prerender,
      cookies,
      get clientAddress() {
        return state.getClientAddress();
      },
      get currentLocale() {
        return state.computeCurrentLocale();
      },
      params,
      get preferredLocale() {
        return state.computePreferredLocale();
      },
      get preferredLocaleList() {
        return state.computePreferredLocaleList();
      },
      locals,
      redirect,
      rewrite,
      request: this.request,
      response,
      site: pipeline.site,
      getActionResult: createGetActionResult(locals),
      get callAction() {
        return callAction;
      },
      url,
      get originPathname() {
        return getOriginPathname(state.request);
      },
      get csp() {
        return state.getCsp();
      },
      get logger() {
        return {
          info(msg) {
            pipeline.logger.info(null, msg);
          },
          warn(msg) {
            pipeline.logger.warn(null, msg);
          },
          error(msg) {
            pipeline.logger.error(null, msg);
          }
        };
      }
    };
    this.defineProviderGetters(partial);
    return partial;
  }
  getClientAddress() {
    const { pipeline, clientAddress } = this;
    const routeData = this.routeData;
    if (routeData.prerender) {
      throw new AstroError({
        ...PrerenderClientAddressNotAvailable,
        message: PrerenderClientAddressNotAvailable.message(routeData.component)
      });
    }
    if (clientAddress) {
      return clientAddress;
    }
    if (pipeline.adapterName) {
      throw new AstroError({
        ...ClientAddressNotAvailable,
        message: ClientAddressNotAvailable.message(pipeline.adapterName)
      });
    }
    throw new AstroError(StaticClientAddressNotAvailable);
  }
  getCookies() {
    return this.cookies;
  }
  getCsp() {
    const state = this;
    const { pipeline } = this;
    if (!pipeline.manifest.csp) {
      if (pipeline.runtimeMode === "production") {
        pipeline.logger.warn(
          "csp",
          `context.csp was used when rendering the route ${s.green(state.routeData.route)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/configuration-reference/#securitycsp`
        );
      }
      return void 0;
    }
    return {
      insertDirective(payload) {
        if (state?.result?.directives) {
          state.result.directives = pushDirective(state.result.directives, payload);
        } else {
          state?.result?.directives.push(payload);
        }
      },
      insertScriptResource(resource) {
        state.result?.scriptResources.push(resource);
      },
      insertStyleResource(resource) {
        state.result?.styleResources.push(resource);
      },
      insertStyleHash(hash) {
        state.result?.styleHashes.push(hash);
      },
      insertScriptHash(hash) {
        state.result?.scriptHashes.push(hash);
      }
    };
  }
  computeCurrentLocale() {
    const {
      url,
      pipeline: { i18n },
      routeData
    } = this;
    if (!i18n || !routeData) return;
    const { defaultLocale, locales, strategy } = i18n;
    const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
    if (this.#currentLocale) {
      return this.#currentLocale;
    }
    let computedLocale;
    if (isRouteServerIsland(routeData)) {
      let referer = this.request.headers.get("referer");
      if (referer) {
        if (URL.canParse(referer)) {
          referer = new URL(referer).pathname;
        }
        computedLocale = computeCurrentLocale(referer, locales, defaultLocale);
      }
    } else {
      let pathname = routeData.pathname;
      if (url && !routeData.pattern.test(url.pathname)) {
        for (const fallbackRoute of routeData.fallbackRoutes) {
          if (fallbackRoute.pattern.test(url.pathname)) {
            pathname = fallbackRoute.pathname;
            break;
          }
        }
      }
      pathname = pathname && !isRoute404or500(routeData) ? pathname : url.pathname ?? this.pathname;
      computedLocale = computeCurrentLocale(pathname, locales, defaultLocale);
      if (routeData.params.length > 0) {
        const localeFromParams = computeCurrentLocaleFromParams(this.params, locales);
        if (localeFromParams) {
          computedLocale = localeFromParams;
        }
      }
    }
    this.#currentLocale = computedLocale ?? fallbackTo;
    return this.#currentLocale;
  }
  computePreferredLocale() {
    const {
      pipeline: { i18n },
      request
    } = this;
    if (!i18n) return;
    return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
  }
  computePreferredLocaleList() {
    const {
      pipeline: { i18n },
      request
    } = this;
    if (!i18n) return;
    return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
  }
  /**
   * Lazily loads the route's component module. Returns the cached
   * instance if already loaded. The promise is cached so concurrent
   * callers share the same load.
   */
  async loadComponentInstance() {
    if (this.componentInstance) return this.componentInstance;
    if (this.#componentInstancePromise) return this.#componentInstancePromise;
    this.#componentInstancePromise = this.pipeline.getComponentByRoute(this.routeData).then((mod) => {
      this.componentInstance = mod;
      return mod;
    });
    return this.#componentInstancePromise;
  }
  /**
   * Registers a context provider under the given key. Handlers call
   * this to contribute values to the request context (e.g. sessions).
   * The `create` factory is called lazily on the first `resolve(key)`.
   */
  provide(key, provider) {
    (this.#providers ??= /* @__PURE__ */ new Map()).set(key, provider);
  }
  /**
   * Lazily resolves a provider registered under `key`. Calls
   * `provider.create()` on first access and caches the result.
   * Returns `undefined` if no provider was registered for the key.
   */
  resolve(key) {
    if (this.#providersResolvedValues?.has(key)) {
      return this.#providersResolvedValues.get(key);
    }
    const provider = this.#providers?.get(key);
    if (!provider) return void 0;
    const value = provider.create();
    (this.#providersResolvedValues ??= /* @__PURE__ */ new Map()).set(key, value);
    return value;
  }
  /**
   * Runs all registered `finalize` callbacks. Should be called after
   * the response is produced, typically in a `finally` block.
   *
   * Returns synchronously (no promise allocation) when nothing needs
   * finalizing — important for the hot path where sessions are not used.
   */
  finalizeAll() {
    if (!this.#providersResolvedValues || this.#providersResolvedValues.size === 0) return;
    let chain;
    for (const [key, provider] of this.#providers) {
      if (provider.finalize && this.#providersResolvedValues.has(key)) {
        const result = provider.finalize(this.#providersResolvedValues.get(key));
        if (result) {
          chain = chain ? chain.then(() => result) : result;
        }
      }
    }
    return chain;
  }
  /**
   * Adds lazy getters to `target` for each registered provider key.
   * Used by context creation (APIContext, Astro global) so that
   * provider values like `session` and `cache` appear as properties
   * without hard-coding the keys.
   */
  defineProviderGetters(target) {
    if (!this.#providers) return;
    const state = this;
    for (const key of this.#providers.keys()) {
      Object.defineProperty(target, key, {
        get: () => state.resolve(key),
        enumerable: true,
        configurable: true
      });
    }
  }
  /**
   * Resolves the route to use for this request and stores it on
   * `this.routeData`. If the adapter (or the dev server) provided a
   * `routeData` via render options it's already set and this is a
   * no-op. Otherwise we use the app's synchronous route matcher and
   * fall back to a `404.astro` route so middleware can still run.
   *
   * Called eagerly from the constructor so individual handlers
   * (actions, pages, middleware, etc.) always see a resolved route
   * without the caller needing an extra setup step.
   *
   * Once routeData is known, finalizes `this.pathname`: in dev, if the
   * matched route has no `.html` extension, strip `.html` / `/index.html`
   * suffixes so the rendering pipeline sees the canonical pathname.
   */
  /**
   * Strip `.html` / `/index.html` suffixes from the pathname so the
   * rendering pipeline sees the canonical route path. Skipped when the
   * matched route itself has an `.html` extension in its definition.
   */
  #stripHtmlExtension() {
    if (this.routeData && !routeHasHtmlExtension(this.routeData)) {
      this.pathname = this.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
    }
  }
  #resolveRouteData() {
    const pipeline = this.pipeline;
    if (this.routeData) {
      this.#stripHtmlExtension();
      return;
    }
    const matched = pipeline.matchRoute(this.pathname);
    if (matched && matched.prerender && pipeline.manifest.serverLike) {
      this.routeData = void 0;
    } else {
      this.routeData = matched;
    }
    pipeline.logger.debug("router", "Astro matched the following route for " + this.request.url);
    pipeline.logger.debug("router", "RouteData:\n" + this.routeData);
    if (!this.routeData) {
      this.routeData = pipeline.manifestData.routes.find(
        (route) => route.component === "404.astro" || route.component === DEFAULT_404_COMPONENT
      );
    }
    if (!this.routeData) {
      pipeline.logger.debug("router", "Astro hasn't found routes that match " + this.request.url);
      pipeline.logger.debug("router", "Here's the available routes:\n", pipeline.manifestData);
      return;
    }
    this.#stripHtmlExtension();
  }
  /**
   * Strips the pipeline's base from the request URL, prepends a forward
   * slash, and decodes the pathname. Falls back to the raw (not decoded)
   * pathname if `decodeURI` throws.
   *
   * Mirrors `BaseApp.removeBase`, including the
   * `collapseDuplicateLeadingSlashes` fix that prevents middleware
   * authorization bypass when the URL starts with `//`.
   */
  #computePathname(url) {
    let pathname = collapseDuplicateLeadingSlashes(url.pathname);
    const base = this.pipeline.manifest.base;
    if (pathname.startsWith(base)) {
      const baseWithoutTrailingSlash = removeTrailingForwardSlash(base);
      pathname = pathname.slice(baseWithoutTrailingSlash.length + 1);
    }
    pathname = prependForwardSlash$1(pathname);
    try {
      return decodeURI(pathname);
    } catch (e) {
      this.pipeline.logger.error(null, e.toString());
      return pathname;
    }
  }
  /**
   * Returns the resolved `props` for this render, computing them lazily
   * from the route + component module on first access. If the
   * `initialProps` already carries user-supplied props (e.g. the
   * container API) those are used verbatim.
   */
  async getProps() {
    if (this.props !== null) return this.props;
    if (Object.keys(this.initialProps).length > 0) {
      this.props = this.initialProps;
      return this.props;
    }
    const pipeline = this.pipeline;
    const mod = await this.loadComponentInstance();
    this.props = await getProps({
      mod,
      routeData: this.routeData,
      routeCache: pipeline.routeCache,
      pathname: this.pathname,
      logger: pipeline.logger,
      serverLike: pipeline.manifest.serverLike,
      base: pipeline.manifest.base,
      trailingSlash: pipeline.manifest.trailingSlash
    });
    return this.props;
  }
  /**
   * Returns the `ActionAPIContext` for this render, creating it lazily.
   * Used by middleware, actions, and page dispatch.
   */
  getActionAPIContext() {
    if (this.actionApiContext !== null) return this.actionApiContext;
    const state = this;
    const ctx = {
      get cookies() {
        return state.cookies;
      },
      routePattern: this.routeData.route,
      isPrerendered: this.routeData.prerender,
      get clientAddress() {
        return state.getClientAddress();
      },
      get currentLocale() {
        return state.computeCurrentLocale();
      },
      generator: ASTRO_GENERATOR,
      get locals() {
        return state.locals;
      },
      set locals(_) {
        throw new AstroError(LocalsReassigned);
      },
      // SAFETY: getActionAPIContext is only called after route resolution,
      // so routeData is always set and the params getter always returns a value.
      params: this.params,
      get preferredLocale() {
        return state.computePreferredLocale();
      },
      get preferredLocaleList() {
        return state.computePreferredLocaleList();
      },
      request: this.request,
      site: this.pipeline.site,
      url: this.url,
      get originPathname() {
        return getOriginPathname(state.request);
      },
      get csp() {
        return state.getCsp();
      },
      get logger() {
        if (!state.pipeline.manifest.experimentalLogger) {
          state.pipeline.logger.warn(
            null,
            "The Astro.logger is available only when experimental.logger is defined."
          );
          return void 0;
        }
        return {
          info(msg) {
            state.pipeline.logger.info(null, msg);
          },
          warn(msg) {
            state.pipeline.logger.warn(null, msg);
          },
          error(msg) {
            state.pipeline.logger.error(null, msg);
          }
        };
      }
    };
    this.defineProviderGetters(ctx);
    this.actionApiContext = ctx;
    return this.actionApiContext;
  }
  /**
   * Returns the `APIContext` for this render, creating it lazily from
   * the memoized props + action context.
   *
   * Callers must ensure `getProps()` has resolved at least once before
   * calling this.
   */
  getAPIContext() {
    if (this.apiContext !== null) return this.apiContext;
    const actionApiContext = this.getActionAPIContext();
    const state = this;
    const redirect = (path, status = 302) => new Response(null, { status, headers: { Location: path } });
    const rewrite = async (reroutePayload) => {
      return await state.rewrite(reroutePayload);
    };
    Reflect.set(actionApiContext, pipelineSymbol, this.pipeline);
    actionApiContext[fetchStateSymbol] = this;
    this.apiContext = Object.assign(actionApiContext, {
      props: this.props,
      redirect,
      rewrite,
      getActionResult: createGetActionResult(actionApiContext.locals),
      callAction: createCallAction(actionApiContext)
    });
    return this.apiContext;
  }
  /**
   * Invalidates the cached `APIContext` so the next `getAPIContext()`
   * call re-derives it from the (possibly mutated) state. Used
   * after an in-flight rewrite swaps the route / request / params.
   */
  invalidateContexts() {
    this.props = null;
    this.actionApiContext = null;
    this.apiContext = null;
  }
}

class ActionHandler {
  /**
   * Run action handling for the current request. Expects the APIContext
   * that is already being used by the render pipeline.
   *
   * Returns a `Response` when the action fully handles the request (RPC),
   * or `undefined` when the caller should continue processing the
   * request (form actions or non-action requests).
   */
  handle(apiContext, state) {
    state.pipeline.usedFeatures |= PipelineFeatures.actions;
    if (apiContext.isPrerendered) {
      return void 0;
    }
    const { action, setActionResult } = getActionContext(apiContext);
    if (!action) {
      return void 0;
    }
    return this.#executeAction(action, setActionResult);
  }
  async #executeAction(action, setActionResult) {
    const actionResult = await action.handler();
    const serialized = serializeActionResult(actionResult);
    if (action.calledFrom === "rpc") {
      if (serialized.type === "empty") {
        return new Response(null, {
          status: serialized.status
        });
      }
      return new Response(serialized.body, {
        status: serialized.status,
        headers: {
          "Content-Type": serialized.contentType
        }
      });
    }
    setActionResult(action.name, serialized);
    return void 0;
  }
}

function prepareResponse(response, { addCookieHeader }) {
  for (const headerName of INTERNAL_RESPONSE_HEADERS) {
    if (response.headers.has(headerName)) {
      response.headers.delete(headerName);
    }
  }
  if (addCookieHeader) {
    for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) {
      response.headers.append("set-cookie", setCookieHeaderValue);
    }
  }
  Reflect.set(response, responseSentSymbol$1, true);
}

function redirectTemplate({
  status,
  absoluteLocation,
  relativeLocation,
  from
}) {
  const delay = status === 302 ? 2 : 0;
  const rel = escape(String(relativeLocation));
  const abs = escape(String(absoluteLocation));
  const fromHtml = from ? `from <code>${escape(from)}</code> ` : "";
  return `<!doctype html>
<title>Redirecting to: ${rel}</title>
<meta http-equiv="refresh" content="${delay};url=${rel}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${abs}">
<body>
	<a href="${rel}">Redirecting ${fromHtml}to <code>${rel}</code></a>
</body>`;
}

class TrailingSlashHandler {
  #app;
  constructor(app) {
    this.#app = app;
  }
  /**
   * Returns a redirect `Response` if the request pathname needs
   * normalization, or `undefined` if no redirect is required.
   */
  handle(state) {
    const url = new URL(state.request.url);
    const redirect = this.#redirectTrailingSlash(url.pathname);
    if (redirect === url.pathname) {
      return void 0;
    }
    const addCookieHeader = state.renderOptions.addCookieHeader;
    const status = state.request.method === "GET" ? 301 : 308;
    const response = new Response(
      redirectTemplate({
        status,
        relativeLocation: url.pathname,
        absoluteLocation: redirect,
        from: state.request.url
      }),
      {
        status,
        headers: {
          location: redirect + url.search
        }
      }
    );
    prepareResponse(response, { addCookieHeader });
    return response;
  }
  #redirectTrailingSlash(pathname) {
    const { trailingSlash } = this.#app.manifest;
    if (pathname === "/" || isInternalPath(pathname)) {
      return pathname;
    }
    const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
    if (path !== pathname) {
      return path;
    }
    if (trailingSlash === "ignore") {
      return pathname;
    }
    if (trailingSlash === "always" && !hasFileExtension(pathname)) {
      return appendForwardSlash(pathname);
    }
    if (trailingSlash === "never") {
      return removeTrailingForwardSlash(pathname);
    }
    return pathname;
  }
}

function defaultSetHeaders(options) {
  const headers = new Headers();
  const directives = [];
  if (options.maxAge !== void 0) {
    directives.push(`max-age=${options.maxAge}`);
  }
  if (options.swr !== void 0) {
    directives.push(`stale-while-revalidate=${options.swr}`);
  }
  if (directives.length > 0) {
    headers.set("CDN-Cache-Control", directives.join(", "));
  }
  if (options.tags && options.tags.length > 0) {
    headers.set("Cache-Tag", options.tags.join(", "));
  }
  if (options.lastModified) {
    headers.set("Last-Modified", options.lastModified.toUTCString());
  }
  if (options.etag) {
    headers.set("ETag", options.etag);
  }
  return headers;
}
function isLiveDataEntry(value) {
  return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}

const APPLY_HEADERS = /* @__PURE__ */ Symbol.for("astro:cache:apply");
const IS_ACTIVE = /* @__PURE__ */ Symbol.for("astro:cache:active");
class AstroCache {
  #options = {};
  #tags = /* @__PURE__ */ new Set();
  #disabled = false;
  #provider;
  enabled = true;
  constructor(provider) {
    this.#provider = provider;
  }
  set(input) {
    if (input === false) {
      this.#disabled = true;
      this.#tags.clear();
      this.#options = {};
      return;
    }
    this.#disabled = false;
    let options;
    if (isLiveDataEntry(input)) {
      if (!input.cacheHint) return;
      options = input.cacheHint;
    } else {
      options = input;
    }
    if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
    if ("swr" in options && options.swr !== void 0)
      this.#options.swr = options.swr;
    if ("etag" in options && options.etag !== void 0)
      this.#options.etag = options.etag;
    if (options.lastModified !== void 0) {
      if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) {
        this.#options.lastModified = options.lastModified;
      }
    }
    if (options.tags) {
      for (const tag of options.tags) this.#tags.add(tag);
    }
  }
  get tags() {
    return [...this.#tags];
  }
  /**
   * Get the current cache options (read-only snapshot).
   * Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
   */
  get options() {
    return {
      ...this.#options,
      tags: this.tags
    };
  }
  async invalidate(input) {
    if (!this.#provider) {
      throw new AstroError(CacheNotEnabled);
    }
    let options;
    if (isLiveDataEntry(input)) {
      options = { tags: input.cacheHint?.tags ?? [] };
    } else {
      options = input;
    }
    return this.#provider.invalidate(options);
  }
  /** @internal */
  [APPLY_HEADERS](response) {
    if (this.#disabled) return;
    const finalOptions = { ...this.#options, tags: this.tags };
    if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
    const headers = this.#provider?.setHeaders?.(finalOptions) ?? defaultSetHeaders(finalOptions);
    for (const [key, value] of headers) {
      response.headers.set(key, value);
    }
  }
  /** @internal */
  get [IS_ACTIVE]() {
    return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
  }
}
function applyCacheHeaders(cache, response) {
  if (APPLY_HEADERS in cache) {
    cache[APPLY_HEADERS](response);
  }
}

const ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
const ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
  const result = [];
  part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
    if (!str) return;
    const dynamic = i % 2 === 1;
    const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
    if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) {
      throw new Error(`Invalid route ${file} \u2014 parameter name must match /^[a-zA-Z0-9_$]+$/`);
    }
    result.push({
      content,
      dynamic,
      spread: dynamic && ROUTE_SPREAD.test(content)
    });
  });
  return result;
}

function compileCacheRoutes(routes, base, trailingSlash) {
  const compiled = Object.entries(routes).map(([path, options]) => {
    const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
    const pattern = getPattern(segments, base, trailingSlash);
    return { pattern, options, segments, route: path };
  });
  compiled.sort(
    (a, b) => routeComparator(
      { segments: a.segments, route: a.route, type: "page" },
      { segments: b.segments, route: b.route, type: "page" }
    )
  );
  return compiled;
}
function matchCacheRoute(pathname, compiledRoutes) {
  for (const route of compiledRoutes) {
    if (route.pattern.test(pathname)) return route.options;
  }
  return null;
}

const CACHE_KEY = "cache";
function provideCache(state) {
  const pipeline = state.pipeline;
  if (!pipeline.cacheConfig) {
    state.provide(CACHE_KEY, {
      create: () => new DisabledAstroCache(pipeline.logger)
    });
    return;
  }
  if (pipeline.runtimeMode === "development") {
    state.provide(CACHE_KEY, {
      create: () => new NoopAstroCache()
    });
    return;
  }
  return provideCacheAsync(state, pipeline);
}
async function provideCacheAsync(state, pipeline) {
  const cacheProvider = await pipeline.getCacheProvider();
  state.provide(CACHE_KEY, {
    create() {
      const cache = new AstroCache(cacheProvider);
      if (pipeline.cacheConfig?.routes) {
        if (!pipeline.compiledCacheRoutes) {
          pipeline.compiledCacheRoutes = compileCacheRoutes(
            pipeline.cacheConfig.routes,
            pipeline.manifest.base,
            pipeline.manifest.trailingSlash
          );
        }
        const matched = matchCacheRoute(state.pathname, pipeline.compiledCacheRoutes);
        if (matched) {
          cache.set(matched);
        }
      }
      return cache;
    }
  });
}
class CacheHandler {
  #app;
  constructor(app) {
    this.#app = app;
  }
  async handle(state, next) {
    this.#app.pipeline.usedFeatures |= PipelineFeatures.cache;
    if (!this.#app.pipeline.cacheProvider) {
      return next();
    }
    const cache = state.resolve(CACHE_KEY);
    const cacheProvider = await this.#app.pipeline.getCacheProvider();
    if (cacheProvider?.onRequest) {
      const response2 = await cacheProvider.onRequest(
        {
          request: state.request,
          url: new URL(state.request.url),
          waitUntil: state.renderOptions.waitUntil
        },
        async () => {
          const res = await next();
          applyCacheHeaders(cache, res);
          return res;
        }
      );
      response2.headers.delete("CDN-Cache-Control");
      response2.headers.delete("Cache-Tag");
      return response2;
    }
    const response = await next();
    applyCacheHeaders(cache, response);
    return response;
  }
}

function isExternalURL(url) {
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
function redirectIsExternal(redirect) {
  if (typeof redirect === "string") {
    return isExternalURL(redirect);
  } else {
    return isExternalURL(redirect.destination);
  }
}
function computeRedirectStatus(method, redirect, redirectRoute) {
  return redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
}
function resolveRedirectTarget(params, redirect, redirectRoute, trailingSlash) {
  if (typeof redirectRoute !== "undefined") {
    const generate = getRouteGenerator(redirectRoute.segments, trailingSlash);
    return generate(params);
  } else if (typeof redirect === "string") {
    if (redirectIsExternal(redirect)) {
      return redirect;
    } else {
      let target = redirect;
      for (const param of Object.keys(params)) {
        const paramValue = params[param];
        target = target.replace(`[${param}]`, paramValue).replace(`[...${param}]`, paramValue);
      }
      return target;
    }
  } else if (typeof redirect === "undefined") {
    return "/";
  }
  return redirect.destination;
}
async function renderRedirect(state) {
  state.pipeline.usedFeatures |= PipelineFeatures.redirects;
  const routeData = state.routeData;
  const { redirect, redirectRoute } = routeData;
  const status = computeRedirectStatus(state.request.method, redirect, redirectRoute);
  const headers = {
    location: encodeURI(
      resolveRedirectTarget(
        state.params,
        redirect,
        redirectRoute,
        state.pipeline.manifest.trailingSlash
      )
    )
  };
  if (redirect && redirectIsExternal(redirect)) {
    if (typeof redirect === "string") {
      return Response.redirect(redirect, status);
    } else {
      return Response.redirect(redirect.destination, status);
    }
  }
  return new Response(null, { status, headers });
}

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify$1(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify$1(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}
function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver(factory) {
  return factory;
}

const DRIVER_NAME = "memory";
const memory = defineDriver(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify$1(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify$1(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify$1(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const PERSIST_SYMBOL = /* @__PURE__ */ Symbol();
const DEFAULT_COOKIE_NAME = "astro-session";
const VALID_COOKIE_REGEX = /^[\w-]+$/;
const unflatten = (parsed, _) => {
  return unflatten$1(parsed, {
    URL: (href) => new URL(href)
  });
};
const stringify = (data, _) => {
  return stringify$2(data, {
    // Support URL objects
    URL: (val) => val instanceof URL && val.href
  });
};
class AstroSession {
  // The cookies object.
  #cookies;
  // The session configuration.
  #config;
  // The cookie config
  #cookieConfig;
  // The cookie name
  #cookieName;
  // The unstorage object for the session driver.
  #storage;
  #data;
  // The session ID. A v4 UUID.
  #sessionID;
  // Sessions to destroy. Needed because we won't have the old session ID after it's destroyed locally.
  #toDestroy = /* @__PURE__ */ new Set();
  // Session keys to delete. Used for partial data sets to avoid overwriting the deleted value.
  #toDelete = /* @__PURE__ */ new Set();
  // Whether the session is dirty and needs to be saved.
  #dirty = false;
  // Whether the session cookie has been set.
  #cookieSet = false;
  // Whether the session ID was sourced from a client cookie rather than freshly generated.
  #sessionIDFromCookie = false;
  // The local data is "partial" if it has not been loaded from storage yet and only
  // contains values that have been set or deleted in-memory locally.
  // We do this to avoid the need to block on loading data when it is only being set.
  // When we load the data from storage, we need to merge it with the local partial data,
  // preserving in-memory changes and deletions.
  #partial = true;
  // The driver factory function provided by the pipeline
  #driverFactory;
  static #sharedStorage = /* @__PURE__ */ new Map();
  constructor({
    cookies,
    config,
    runtimeMode,
    driverFactory,
    mockStorage
  }) {
    if (!config) {
      throw new AstroError({
        ...SessionStorageInitError,
        message: SessionStorageInitError.message(
          "No driver was defined in the session configuration and the adapter did not provide a default driver."
        )
      });
    }
    this.#cookies = cookies;
    this.#driverFactory = driverFactory;
    const { cookie: cookieConfig = DEFAULT_COOKIE_NAME, ...configRest } = config;
    let cookieConfigObject;
    if (typeof cookieConfig === "object") {
      const { name = DEFAULT_COOKIE_NAME, ...rest } = cookieConfig;
      this.#cookieName = name;
      cookieConfigObject = rest;
    } else {
      this.#cookieName = cookieConfig || DEFAULT_COOKIE_NAME;
    }
    this.#cookieConfig = {
      sameSite: "lax",
      secure: runtimeMode === "production",
      path: "/",
      ...cookieConfigObject,
      httpOnly: true
    };
    this.#config = configRest;
    if (mockStorage) {
      this.#storage = mockStorage;
    }
  }
  /**
   * Gets a session value. Returns `undefined` if the session or value does not exist.
   */
  async get(key) {
    return (await this.#ensureData()).get(key)?.data;
  }
  /**
   * Checks if a session value exists.
   */
  async has(key) {
    return (await this.#ensureData()).has(key);
  }
  /**
   * Gets all session values.
   */
  async keys() {
    return (await this.#ensureData()).keys();
  }
  /**
   * Gets all session values.
   */
  async values() {
    return [...(await this.#ensureData()).values()].map((entry) => entry.data);
  }
  /**
   * Gets all session entries.
   */
  async entries() {
    return [...(await this.#ensureData()).entries()].map(([key, entry]) => [key, entry.data]);
  }
  /**
   * Deletes a session value.
   */
  delete(key) {
    this.#data ??= /* @__PURE__ */ new Map();
    this.#data.delete(key);
    if (this.#partial) {
      this.#toDelete.add(key);
    }
    this.#dirty = true;
  }
  /**
   * Sets a session value. The session is created if it does not exist.
   */
  set(key, value, { ttl } = {}) {
    if (!key) {
      throw new AstroError({
        ...SessionStorageSaveError,
        message: "The session key was not provided."
      });
    }
    let cloned;
    try {
      cloned = unflatten(JSON.parse(stringify(value)));
    } catch (err) {
      throw new AstroError(
        {
          ...SessionStorageSaveError,
          message: `The session data for ${key} could not be serialized.`,
          hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue"
        },
        { cause: err }
      );
    }
    if (!this.#cookieSet) {
      this.#setCookie();
      this.#cookieSet = true;
    }
    this.#data ??= /* @__PURE__ */ new Map();
    const lifetime = ttl ?? this.#config.ttl;
    const expires = typeof lifetime === "number" ? Date.now() + lifetime * 1e3 : lifetime;
    this.#data.set(key, {
      data: cloned,
      expires
    });
    this.#dirty = true;
  }
  /**
   * Destroys the session, clearing the cookie and storage if it exists.
   */
  destroy() {
    const sessionId = this.#sessionID ?? this.#cookies.get(this.#cookieName)?.value;
    if (sessionId) {
      this.#toDestroy.add(sessionId);
    }
    this.#cookies.delete(this.#cookieName, this.#cookieConfig);
    this.#sessionID = void 0;
    this.#data = void 0;
    this.#dirty = true;
  }
  /**
   * Regenerates the session, creating a new session ID. The existing session data is preserved.
   */
  async regenerate() {
    let data = /* @__PURE__ */ new Map();
    try {
      data = await this.#ensureData();
    } catch (err) {
      console.error("Failed to load session data during regeneration:", err);
    }
    const oldSessionId = this.#sessionID;
    this.#sessionID = crypto.randomUUID();
    this.#sessionIDFromCookie = false;
    this.#data = data;
    this.#dirty = true;
    await this.#setCookie();
    if (oldSessionId && this.#storage) {
      this.#storage.removeItem(oldSessionId).catch((err) => {
        console.error("Failed to remove old session data:", err);
      });
    }
  }
  // Persists the session data to storage.
  // This is called automatically at the end of the request.
  // Uses a symbol to prevent users from calling it directly.
  async [PERSIST_SYMBOL]() {
    if (!this.#dirty && !this.#toDestroy.size) {
      return;
    }
    const storage = await this.#ensureStorage();
    if (this.#dirty && this.#data) {
      const data = await this.#ensureData();
      this.#toDelete.forEach((key2) => data.delete(key2));
      const key = this.#ensureSessionID();
      let serialized;
      try {
        serialized = stringify(data);
      } catch (err) {
        throw new AstroError(
          {
            ...SessionStorageSaveError,
            message: SessionStorageSaveError.message(
              "The session data could not be serialized.",
              this.#config.driver
            )
          },
          { cause: err }
        );
      }
      await storage.setItem(key, serialized);
      this.#dirty = false;
    }
    if (this.#toDestroy.size > 0) {
      const cleanupPromises = [...this.#toDestroy].map(
        (sessionId) => storage.removeItem(sessionId).catch((err) => {
          console.error("Failed to clean up session %s:", sessionId, err);
        })
      );
      await Promise.all(cleanupPromises);
      this.#toDestroy.clear();
    }
  }
  get sessionID() {
    return this.#sessionID;
  }
  /**
   * Loads a session from storage with the given ID, and replaces the current session.
   * Any changes made to the current session will be lost.
   * This is not normally needed, as the session is automatically loaded using the cookie.
   * However it can be used to restore a session where the ID has been recorded somewhere
   * else (e.g. in a database).
   */
  async load(sessionID) {
    this.#sessionID = sessionID;
    this.#data = void 0;
    await this.#setCookie();
    await this.#ensureData();
  }
  /**
   * Sets the session cookie.
   */
  async #setCookie() {
    if (!VALID_COOKIE_REGEX.test(this.#cookieName)) {
      throw new AstroError({
        ...SessionStorageSaveError,
        message: "Invalid cookie name. Cookie names can only contain letters, numbers, and dashes."
      });
    }
    const value = this.#ensureSessionID();
    this.#cookies.set(this.#cookieName, value, this.#cookieConfig);
  }
  /**
   * Attempts to load the session data from storage, or creates a new data object if none exists.
   * If there is existing partial data, it will be merged into the new data object.
   */
  async #ensureData() {
    if (this.#data && !this.#partial) {
      return this.#data;
    }
    this.#data ??= /* @__PURE__ */ new Map();
    if (!this.#sessionID && !this.#cookies.get(this.#cookieName)?.value) {
      this.#partial = false;
      return this.#data;
    }
    const storage = await this.#ensureStorage();
    const raw = await storage.get(this.#ensureSessionID());
    if (!raw) {
      if (this.#sessionIDFromCookie) {
        this.#sessionID = crypto.randomUUID();
        this.#sessionIDFromCookie = false;
        if (this.#cookieSet) {
          await this.#setCookie();
        }
      }
      return this.#data;
    }
    try {
      const storedMap = unflatten(raw);
      if (!(storedMap instanceof Map)) {
        await this.destroy();
        throw new AstroError({
          ...SessionStorageInitError,
          message: SessionStorageInitError.message(
            "The session data was an invalid type.",
            this.#config.driver
          )
        });
      }
      const now = Date.now();
      for (const [key, value] of storedMap) {
        const expired = typeof value.expires === "number" && value.expires < now;
        if (!this.#data.has(key) && !this.#toDelete.has(key) && !expired) {
          this.#data.set(key, value);
        }
      }
      this.#partial = false;
      return this.#data;
    } catch (err) {
      await this.destroy();
      if (err instanceof AstroError) {
        throw err;
      }
      throw new AstroError(
        {
          ...SessionStorageInitError,
          message: SessionStorageInitError.message(
            "The session data could not be parsed.",
            this.#config.driver
          )
        },
        { cause: err }
      );
    }
  }
  /**
   * Returns the session ID, generating a new one if it does not exist.
   */
  #ensureSessionID() {
    if (!this.#sessionID) {
      const cookieValue = this.#cookies.get(this.#cookieName)?.value;
      if (cookieValue) {
        this.#sessionID = cookieValue;
        this.#sessionIDFromCookie = true;
      } else {
        this.#sessionID = crypto.randomUUID();
      }
    }
    return this.#sessionID;
  }
  /**
   * Ensures the storage is initialized.
   * This is called automatically when a storage operation is needed.
   */
  async #ensureStorage() {
    if (this.#storage) {
      return this.#storage;
    }
    if (AstroSession.#sharedStorage.has(this.#config.driver)) {
      this.#storage = AstroSession.#sharedStorage.get(this.#config.driver);
      return this.#storage;
    }
    if (!this.#driverFactory) {
      throw new AstroError({
        ...SessionStorageInitError,
        message: SessionStorageInitError.message(
          "Astro could not load the driver correctly. Does it exist?",
          this.#config.driver
        )
      });
    }
    const driver = this.#driverFactory;
    try {
      this.#storage = createStorage({
        driver: {
          ...driver(this.#config.options),
          // Unused methods
          hasItem() {
            return false;
          },
          getKeys() {
            return [];
          }
        }
      });
      AstroSession.#sharedStorage.set(this.#config.driver, this.#storage);
      return this.#storage;
    } catch (err) {
      throw new AstroError(
        {
          ...SessionStorageInitError,
          message: SessionStorageInitError.message("Unknown error", this.#config.driver)
        },
        { cause: err }
      );
    }
  }
}

const SESSION_KEY = "session";
function provideSession(state) {
  state.pipeline.usedFeatures |= PipelineFeatures.sessions;
  const pipeline = state.pipeline;
  const config = pipeline.manifest.sessionConfig;
  if (!config) return;
  return provideSessionAsync(state, config);
}
async function provideSessionAsync(state, config) {
  const pipeline = state.pipeline;
  const driverFactory = await pipeline.getSessionDriver();
  if (!driverFactory) return;
  state.provide(SESSION_KEY, {
    create() {
      const cookies = state.cookies;
      return new AstroSession({
        cookies,
        config,
        runtimeMode: pipeline.runtimeMode,
        driverFactory,
        mockStorage: null
      });
    },
    finalize(session) {
      return session[PERSIST_SYMBOL]();
    }
  });
}

class AstroHandler {
  #app;
  #trailingSlashHandler;
  #actionHandler;
  #astroMiddleware;
  #pagesHandler;
  #cacheHandler;
  /** Bound callback for the middleware chain — created once, reused per request. */
  #renderRouteCallback;
  /**
   * i18n post-processor. Only set when the app has i18n configured and
   * the strategy is not `manual` — for the manual strategy users wire
   * `astro:i18n.middleware(...)` into their own `onRequest`.
   */
  #i18n;
  /** Whether sessions are configured on the manifest. */
  #hasSession;
  constructor(app) {
    this.#app = app;
    this.#trailingSlashHandler = new TrailingSlashHandler(app);
    this.#actionHandler = new ActionHandler();
    this.#astroMiddleware = new AstroMiddleware(app.pipeline);
    this.#pagesHandler = new PagesHandler(app.pipeline);
    this.#cacheHandler = new CacheHandler(app);
    this.#renderRouteCallback = this.#actionsAndPages.bind(this);
    this.#hasSession = !!app.manifest.sessionConfig;
    const i18n = app.manifest.i18n;
    if (i18n && i18n.strategy !== "manual") {
      this.#i18n = new I18n(
        i18n,
        app.manifest.base,
        app.manifest.trailingSlash,
        app.manifest.buildFormat
      );
    }
  }
  /**
   * Runs actions then pages — the callback at the bottom of the
   * middleware chain. Bound once in the constructor to avoid
   * per-request closure allocation.
   */
  #actionsAndPages(state, ctx) {
    if (!state.skipMiddleware) {
      const actionResult = this.#actionHandler.handle(ctx, state);
      if (actionResult) {
        return actionResult.then((response) => response ?? this.#pagesHandler.handle(state, ctx));
      }
    }
    return this.#pagesHandler.handle(state, ctx);
  }
  async handle(state) {
    const trailingSlashRedirect = this.#trailingSlashHandler.handle(state);
    if (trailingSlashRedirect) {
      return trailingSlashRedirect;
    }
    if (!state.routeData) {
      return this.#app.renderError(state.request, {
        ...state.renderOptions,
        status: 404,
        pathname: state.pathname
      });
    }
    return this.render(state);
  }
  /**
   * Renders a response for the given `FetchState`. Assumes
   * trailing-slash redirects and routeData resolution have already run.
   *
   * User-triggered rewrites (`Astro.rewrite` / `ctx.rewrite`) go through
   * `Rewrites.execute` on the current `FetchState` — they mutate the
   * existing state in place and re-run middleware + page dispatch.
   */
  async render(state) {
    const routeData = state.routeData;
    const pathname = state.pathname;
    const request = state.request;
    const { addCookieHeader } = state.renderOptions;
    const defaultStatus = this.#app.getDefaultStatusCode(routeData, pathname);
    state.status = defaultStatus;
    let response;
    try {
      if (this.#hasSession || this.#app.pipeline.cacheConfig) {
        const sessionP = this.#hasSession ? provideSession(state) : void 0;
        const cacheP = this.#app.pipeline.cacheConfig ? provideCache(state) : void 0;
        if (sessionP || cacheP) await Promise.all([sessionP, cacheP]);
      }
      state.pipeline.usedFeatures |= PipelineFeatures.sessions;
      if (routeData.type === "redirect") {
        const redirectResponse = await renderRedirect(state);
        this.#app.logThisRequest({
          pathname,
          method: request.method,
          statusCode: redirectResponse.status,
          isRewrite: false,
          timeStart: state.timeStart
        });
        prepareResponse(redirectResponse, { addCookieHeader });
        this.#app.pipeline.logger.flush();
        return redirectResponse;
      }
      if (!this.#app.pipeline.cacheProvider) {
        this.#app.pipeline.usedFeatures |= PipelineFeatures.cache;
        response = await this.#astroMiddleware.handle(state, this.#renderRouteCallback);
        if (this.#i18n) {
          response = await this.#i18n.finalize(state, response);
        }
      } else {
        const runPipeline = async () => {
          let res = await this.#astroMiddleware.handle(state, this.#renderRouteCallback);
          if (this.#i18n) {
            res = await this.#i18n.finalize(state, res);
          }
          return res;
        };
        response = await this.#cacheHandler.handle(state, runPipeline);
      }
      const isRewrite = response.headers.has(REWRITE_DIRECTIVE_HEADER_KEY);
      this.#app.logThisRequest({
        pathname,
        method: request.method,
        statusCode: response.status,
        isRewrite,
        timeStart: state.timeStart
      });
    } catch (err) {
      this.#app.logger.error(null, err.stack || err.message || String(err));
      return this.#app.renderError(request, {
        ...state.renderOptions,
        status: 500,
        error: err,
        pathname: state.pathname
      });
    } finally {
      const finalize = state.finalizeAll();
      if (finalize) await finalize;
    }
    if (REROUTABLE_STATUS_CODES.includes(response.status) && // If the body isn't null, that means the user sets the 404 status
    // but uses the current route to handle the 404
    response.body === null && response.headers.get(REROUTE_DIRECTIVE_HEADER) !== "no") {
      return this.#app.renderError(request, {
        ...state.renderOptions,
        response,
        status: response.status,
        // We don't have an error to report here. Passing null means we pass nothing intentionally
        // while undefined means there's no error
        error: response.status === 500 ? null : void 0,
        pathname: state.pathname
      });
    }
    prepareResponse(response, { addCookieHeader });
    this.#app.pipeline.logger.flush();
    return response;
  }
}

class DefaultFetchHandler {
  #app;
  #handler;
  constructor(app) {
    this.#app = app ?? null;
    this.#handler = app ? new AstroHandler(app) : null;
  }
  /**
   * Fast path: called directly by `BaseApp.render()` with pre-resolved
   * options, avoiding the `Reflect.set/get` round-trip through the request.
   */
  renderWithOptions(request, options) {
    if (!this.#app) {
      const app = Reflect.get(request, appSymbol);
      if (!app) {
        throw new Error("No fetch handler provided.");
      }
      this.#app = app;
      this.#handler = new AstroHandler(app);
    }
    const state = new FetchState(this.#app.pipeline, request, options);
    return this.#handler.handle(state);
  }
  fetch = (request) => {
    if (!this.#app) {
      const app = Reflect.get(request, appSymbol);
      if (!app) {
        throw new Error("No fetch handler provided.");
      }
      this.#app = app;
      this.#handler = new AstroHandler(app);
    }
    const state = new FetchState(this.#app.pipeline, request);
    if (!this.#handler) {
      throw new Error("No fetch handler provided.");
    }
    return this.#handler.handle(state);
  };
}

const fetchable = new DefaultFetchHandler();

function matchPattern(url, remotePattern) {
  return matchProtocol(url, remotePattern.protocol) && matchHostname(url, remotePattern.hostname, true) && matchPort(url, remotePattern.port) && matchPathname(url, remotePattern.pathname, true);
}
function matchPort(url, port) {
  return !port || port === url.port;
}
function matchProtocol(url, protocol) {
  return !protocol || protocol === url.protocol.slice(0, -1);
}
function matchHostname(url, hostname, allowWildcard = false) {
  if (!hostname) {
    return true;
  } else if (!allowWildcard || !hostname.startsWith("*")) {
    return hostname === url.hostname;
  } else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2);
    return slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname);
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1);
    if (!url.hostname.endsWith(slicedHostname)) {
      return false;
    }
    const subdomainWithDot = url.hostname.slice(0, -(slicedHostname.length - 1));
    return subdomainWithDot.endsWith(".") && !subdomainWithDot.slice(0, -1).includes(".");
  }
  return false;
}
function matchPathname(url, pathname, allowWildcard = false) {
  if (!pathname) {
    return true;
  } else if (!allowWildcard || !pathname.endsWith("*")) {
    return pathname === url.pathname;
  } else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2);
    return slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname);
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1);
    if (!url.pathname.startsWith(slicedPathname)) {
      return false;
    }
    const additionalPathChunks = url.pathname.slice(slicedPathname.length).split("/").filter(Boolean);
    return additionalPathChunks.length === 1;
  }
  return false;
}
function isRemoteAllowed(src, {
  domains,
  remotePatterns
}) {
  if (!URL.canParse(src)) {
    return false;
  }
  const url = new URL(src);
  if (!["http:", "https:", "data:"].includes(url.protocol)) {
    return false;
  }
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}

class DefaultErrorHandler {
  #app;
  #astroMiddleware;
  #pagesHandler;
  constructor(app) {
    this.#app = app;
    this.#astroMiddleware = new AstroMiddleware(app.pipeline);
    this.#pagesHandler = new PagesHandler(app.pipeline);
  }
  async renderError(request, {
    status,
    response: originalResponse,
    skipMiddleware = false,
    error,
    pathname,
    ...resolvedRenderOptions
  }) {
    const app = this.#app;
    const resolvedPathname = pathname ?? new FetchState(app.pipeline, request).pathname;
    const errorRoutePath = `/${status}${app.manifest.trailingSlash === "always" ? "/" : ""}`;
    const errorRouteData = matchRoute(errorRoutePath, app.manifestData);
    const url = new URL(request.url);
    if (errorRouteData) {
      if (errorRouteData.prerender) {
        const maybeDotHtml = errorRouteData.route.endsWith(`/${status}`) ? ".html" : "";
        const statusURL = new URL(`${app.baseWithoutTrailingSlash}/${status}${maybeDotHtml}`, url);
        if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) {
          const response2 = await resolvedRenderOptions.prerenderedErrorPageFetch(
            statusURL.toString()
          );
          const override = { status, removeContentEncodingHeaders: true };
          const newResponse = mergeResponses(response2, originalResponse, override);
          prepareResponse(newResponse, resolvedRenderOptions);
          return newResponse;
        }
      }
      const mod = await app.pipeline.getComponentByRoute(errorRouteData);
      const errorState = new FetchState(app.pipeline, request);
      errorState.skipMiddleware = skipMiddleware;
      errorState.clientAddress = resolvedRenderOptions.clientAddress;
      errorState.routeData = errorRouteData;
      errorState.pathname = resolvedPathname;
      errorState.status = status;
      errorState.componentInstance = mod;
      errorState.locals = resolvedRenderOptions.locals ?? {};
      errorState.initialProps = { error };
      try {
        await provideSession(errorState);
        const response2 = await this.#astroMiddleware.handle(
          errorState,
          this.#pagesHandler.handle.bind(this.#pagesHandler)
        );
        const newResponse = mergeResponses(response2, originalResponse);
        prepareResponse(newResponse, resolvedRenderOptions);
        return newResponse;
      } catch {
        if (skipMiddleware === false) {
          return this.renderError(request, {
            ...resolvedRenderOptions,
            status,
            response: originalResponse,
            skipMiddleware: true,
            pathname: resolvedPathname
          });
        }
      } finally {
        await errorState.finalizeAll();
      }
    }
    const response = mergeResponses(new Response(null, { status }), originalResponse);
    prepareResponse(response, resolvedRenderOptions);
    return response;
  }
}
function mergeResponses(newResponse, originalResponse, override) {
  let newResponseHeaders = newResponse.headers;
  if (override?.removeContentEncodingHeaders) {
    newResponseHeaders = new Headers(newResponseHeaders);
    newResponseHeaders.delete("Content-Encoding");
    newResponseHeaders.delete("Content-Length");
  }
  if (!originalResponse) {
    if (override !== void 0) {
      return new Response(newResponse.body, {
        status: override.status,
        statusText: newResponse.statusText,
        headers: newResponseHeaders
      });
    }
    return newResponse;
  }
  const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
  try {
    originalResponse.headers.delete("Content-type");
    originalResponse.headers.delete("Content-Length");
    originalResponse.headers.delete("Transfer-Encoding");
  } catch {
  }
  const newHeaders = new Headers();
  const seen = /* @__PURE__ */ new Set();
  for (const [name, value] of originalResponse.headers) {
    newHeaders.append(name, value);
    seen.add(name.toLowerCase());
  }
  for (const [name, value] of newResponseHeaders) {
    if (!seen.has(name.toLowerCase())) {
      newHeaders.append(name, value);
    }
  }
  const mergedResponse = new Response(newResponse.body, {
    status,
    statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
    // If you're looking at here for possible bugs, it means that it's not a bug.
    // With the middleware, users can meddle with headers, and we should pass to the 404/500.
    // If users see something weird, it's because they are setting some headers they should not.
    //
    // Although, we don't want it to replace the content-type, because the error page must return `text/html`
    headers: newHeaders
  });
  const originalCookies = getCookiesFromResponse(originalResponse);
  const newCookies = getCookiesFromResponse(newResponse);
  if (originalCookies) {
    if (newCookies) {
      for (const cookieValue of newCookies.consume()) {
        originalResponse.headers.append("set-cookie", cookieValue);
      }
    }
    attachCookiesToResponse(mergedResponse, originalCookies);
  } else if (newCookies) {
    attachCookiesToResponse(mergedResponse, newCookies);
  }
  return mergedResponse;
}

class BaseApp {
  manifest;
  manifestData;
  pipeline;
  #adapterLogger;
  baseWithoutTrailingSlash;
  /**
   * The handler that turns incoming `Request` objects into `Response`s.
   * Defaults to a `DefaultFetchHandler` pinned to this app and can be
   * overridden via `setFetchHandler` — typically by the bundled
   * entrypoint after importing `virtual:astro:fetchable`.
   */
  #fetchHandler;
  #errorHandler;
  /**
   * Whether a custom fetch handler (from `src/app.ts`) has been set
   * via `setFetchHandler`. When false, the `DefaultFetchHandler` is
   * in use and all features are implicitly active.
   */
  #hasCustomFetchHandler = false;
  /**
   * Whether the missing-feature check has already run. We only want
   * to warn once — after the first request in dev, or at build end.
   */
  #featureCheckDone = false;
  get logger() {
    return this.pipeline.logger;
  }
  get adapterLogger() {
    if (!this.#adapterLogger) {
      this.#adapterLogger = new AstroIntegrationLogger(
        this.logger.options,
        this.manifest.adapterName
      );
    }
    return this.#adapterLogger;
  }
  constructor(manifest, streaming = true, ...args) {
    this.manifest = manifest;
    this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest.base);
    this.pipeline = this.createPipeline(streaming, manifest, ...args);
    this.manifestData = this.pipeline.manifestData;
    this.#fetchHandler = new DefaultFetchHandler(this);
    this.#errorHandler = this.createErrorHandler();
  }
  /**
   * Override the fetch handler used to dispatch requests. Entrypoints
   * call this with the default export of `virtual:astro:fetchable` to
   * plug in a user-authored handler from `src/app.ts`.
   */
  setFetchHandler(handler) {
    this.#fetchHandler = handler;
    this.#hasCustomFetchHandler = !(handler instanceof DefaultFetchHandler);
  }
  /**
   * Returns the error handler strategy used by this app. Override to
   * provide environment-specific behavior (dev overlay, build-time throws, etc.).
   */
  createErrorHandler() {
    return new DefaultErrorHandler(this);
  }
  /**
   * Resets the cached adapter logger so it picks up a new logger instance.
   * Used by BuildApp when the logger is replaced via setOptions().
   */
  resetAdapterLogger() {
    this.#adapterLogger = void 0;
  }
  getAllowedDomains() {
    return this.manifest.allowedDomains;
  }
  matchesAllowedDomains(forwardedHost, protocol) {
    return BaseApp.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
  }
  static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
    if (!allowedDomains || allowedDomains.length === 0) {
      return false;
    }
    try {
      const testUrl = new URL(`${protocol || "https"}://${forwardedHost}`);
      return allowedDomains.some((pattern) => {
        return matchPattern(testUrl, pattern);
      });
    } catch {
      return false;
    }
  }
  set setManifestData(newManifestData) {
    this.manifestData = newManifestData;
    this.pipeline.manifestData = newManifestData;
    this.pipeline.rebuildRouter();
  }
  removeBase(pathname) {
    pathname = collapseDuplicateLeadingSlashes(pathname);
    if (pathname.startsWith(this.manifest.base)) {
      return pathname.slice(this.baseWithoutTrailingSlash.length + 1);
    }
    return pathname;
  }
  /**
   * Extracts the base-stripped, decoded pathname from a request.
   * Used by adapters to compute the pathname for dev-mode route matching.
   */
  getPathnameFromRequest(request) {
    const url = new URL(request.url);
    const pathname = prependForwardSlash$1(this.removeBase(url.pathname));
    try {
      return decodeURI(pathname);
    } catch (e) {
      this.adapterLogger.error(e.toString());
      return pathname;
    }
  }
  /**
   * Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
   * routes aren't returned, even if they are matched.
   *
   * When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
   * @param request
   * @param allowPrerenderedRoutes
   */
  match(request, allowPrerenderedRoutes = false) {
    const url = new URL(request.url);
    if (this.manifest.assets.has(url.pathname)) return void 0;
    let pathname = this.computePathnameFromDomain(request);
    if (!pathname) {
      pathname = prependForwardSlash$1(this.removeBase(url.pathname));
    }
    const routeData = this.pipeline.matchRoute(decodeURI(pathname));
    if (!routeData) return void 0;
    if (allowPrerenderedRoutes) {
      return routeData;
    }
    if (routeData.prerender) {
      return void 0;
    }
    return routeData;
  }
  /**
   * A matching route function to use in the development server.
   * Contrary to the `.match` function, this function resolves props and params, returning the correct
   * route based on the priority, segments. It also returns the correct, resolved pathname.
   * @param pathname
   */
  devMatch(pathname) {
    return void 0;
  }
  computePathnameFromDomain(request) {
    let pathname = void 0;
    const url = new URL(request.url);
    if (this.manifest.i18n && (this.manifest.i18n.strategy === "domains-prefix-always" || this.manifest.i18n.strategy === "domains-prefix-other-locales" || this.manifest.i18n.strategy === "domains-prefix-always-no-redirect")) {
      let host = request.headers.get("X-Forwarded-Host");
      let protocol = request.headers.get("X-Forwarded-Proto");
      if (protocol) {
        protocol = protocol + ":";
      } else {
        protocol = url.protocol;
      }
      if (!host) {
        host = request.headers.get("Host");
      }
      if (host && protocol) {
        host = host.split(":")[0];
        try {
          let locale;
          const hostAsUrl = new URL(`${protocol}//${host}`);
          for (const [domainKey, localeValue] of Object.entries(
            this.manifest.i18n.domainLookupTable
          )) {
            const domainKeyAsUrl = new URL(domainKey);
            if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
              locale = localeValue;
              break;
            }
          }
          if (locale) {
            pathname = prependForwardSlash$1(
              joinPaths(normalizeTheLocale(locale), this.removeBase(url.pathname))
            );
            if (this.manifest.trailingSlash === "always") {
              pathname = appendForwardSlash(pathname);
            } else if (this.manifest.trailingSlash === "never") {
              pathname = removeTrailingForwardSlash(pathname);
            } else if (url.pathname.endsWith("/")) {
              pathname = appendForwardSlash(pathname);
            }
          }
        } catch (e) {
          this.logger.error(
            "router",
            `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`
          );
          this.logger.error("router", `Error: ${e}`);
        }
      }
    }
    return pathname;
  }
  async render(request, {
    addCookieHeader = false,
    clientAddress = Reflect.get(request, clientAddressSymbol),
    locals,
    prerenderedErrorPageFetch = fetch,
    routeData,
    waitUntil
  } = {}) {
    await this.pipeline.getLogger();
    if (routeData) {
      this.logger.debug(
        "router",
        "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ",
        request.url
      );
      this.logger.debug("router", "RouteData");
      this.logger.debug("router", routeData);
    }
    if (locals) {
      if (typeof locals !== "object") {
        const error = new AstroError(LocalsNotAnObject);
        this.logger.error(null, error.stack);
        return this.renderError(request, {
          addCookieHeader,
          clientAddress,
          prerenderedErrorPageFetch,
          // If locals are invalid, we don't want to include them when
          // rendering the error page
          locals: void 0,
          routeData,
          waitUntil,
          status: 500,
          error
        });
      }
    }
    if (!routeData) {
      const domainPathname = this.computePathnameFromDomain(request);
      if (domainPathname) {
        routeData = this.pipeline.matchRoute(decodeURI(domainPathname));
      }
    }
    const resolvedOptions = {
      addCookieHeader,
      clientAddress,
      prerenderedErrorPageFetch,
      locals,
      routeData,
      waitUntil
    };
    let response;
    if (this.#fetchHandler instanceof DefaultFetchHandler) {
      Reflect.set(request, appSymbol, this);
      response = await this.#fetchHandler.renderWithOptions(request, resolvedOptions);
    } else {
      setRenderOptions(request, resolvedOptions);
      Reflect.set(request, appSymbol, this);
      response = await this.#fetchHandler.fetch(request);
    }
    this.#warnMissingFeatures();
    if (response.headers.get(ASTRO_ERROR_HEADER)) {
      response.headers.delete(ASTRO_ERROR_HEADER);
      return this.renderError(request, {
        addCookieHeader,
        clientAddress,
        prerenderedErrorPageFetch,
        locals,
        routeData,
        waitUntil,
        response,
        status: response.status,
        error: response.status === 500 ? null : void 0
      });
    }
    return response;
  }
  setCookieHeaders(response) {
    return getSetCookiesFromResponse(response);
  }
  /**
   * Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
   * For example,
   * ```ts
   * for (const cookie_ of App.getSetCookieFromResponse(response)) {
   *     const cookie: string = cookie_
   * }
   * ```
   * @param response The response to read cookies from.
   * @returns An iterator that yields key-value pairs as equal-sign-separated strings.
   */
  static getSetCookieFromResponse = getSetCookiesFromResponse;
  /**
   * If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
   * This also handles pre-rendered /404 or /500 routes.
   *
   * Delegates to the app's configured `ErrorHandler`. To customize behavior
   * for a specific environment, override `createErrorHandler()` rather than
   * this method.
   */
  async renderError(request, options) {
    return this.#errorHandler.renderError(request, options);
  }
  /**
   * One-shot check: after the first request with a custom `src/app.ts`,
   * compare `usedFeatures` against the manifest and warn about any
   * configured features the user's pipeline doesn't call.
   */
  #warnMissingFeatures() {
    if (this.#featureCheckDone || !this.#hasCustomFetchHandler) return;
    this.#featureCheckDone = true;
    const manifest = this.manifest;
    const missing = [];
    const used = this.pipeline.usedFeatures;
    if (manifest.routes.some((r) => r.routeData.type === "redirect") && !(used & PipelineFeatures.redirects)) {
      missing.push("redirects");
    }
    if (manifest.sessionConfig && !(used & PipelineFeatures.sessions)) {
      missing.push("sessions");
    }
    if (manifest.actions && !(used & PipelineFeatures.actions)) {
      missing.push("actions");
    }
    if (manifest.middleware && !(used & PipelineFeatures.middleware)) {
      missing.push("middleware");
    }
    if (manifest.i18n && manifest.i18n.strategy !== "manual" && !(used & PipelineFeatures.i18n)) {
      missing.push("i18n");
    }
    if (manifest.cacheConfig && !(used & PipelineFeatures.cache)) {
      missing.push("cache");
    }
    for (const feature of missing) {
      this.logger.warn(
        "router",
        `Your project uses ${feature}, but your custom src/app.ts does not call the ${feature}() handler. This feature will not work unless you add it to your app.ts pipeline.`
      );
    }
  }
  getDefaultStatusCode(routeData, pathname) {
    if (!routeData.pattern.test(pathname)) {
      for (const fallbackRoute of routeData.fallbackRoutes) {
        if (fallbackRoute.pattern.test(pathname)) {
          return 302;
        }
      }
    }
    const route = removeTrailingForwardSlash(routeData.route);
    if (route.endsWith("/404")) return 404;
    if (route.endsWith("/500")) return 500;
    return 200;
  }
  getManifest() {
    return this.pipeline.manifest;
  }
  logThisRequest({
    pathname,
    method,
    statusCode,
    isRewrite,
    timeStart
  }) {
    const timeEnd = performance.now();
    this.logRequest({
      pathname,
      method,
      statusCode,
      isRewrite,
      reqTime: timeEnd - timeStart
    });
  }
}

function getAssetsPrefix(fileExtension, assetsPrefix) {
  let prefix = "";
  if (!assetsPrefix) {
    prefix = "";
  } else if (typeof assetsPrefix === "string") {
    prefix = assetsPrefix;
  } else {
    const dotLessFileExtension = fileExtension.slice(1);
    prefix = assetsPrefix[dotLessFileExtension] || assetsPrefix.fallback;
  }
  return prefix;
}

const URL_PARSE_BASE = "https://astro.build";
function splitAssetPath(path) {
  const parsed = new URL(path, URL_PARSE_BASE);
  const isAbsolute = URL.canParse(path);
  const pathname = !isAbsolute && !path.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname;
  return {
    pathname,
    suffix: `${parsed.search}${parsed.hash}`
  };
}
function createAssetLink(href, base, assetsPrefix, queryParams) {
  const { pathname, suffix } = splitAssetPath(href);
  let url = "";
  if (assetsPrefix) {
    const pf = getAssetsPrefix(fileExtension(pathname), assetsPrefix);
    url = joinPaths(pf, slash(pathname)) + suffix;
  } else if (base) {
    url = prependForwardSlash$1(joinPaths(base, slash(pathname))) + suffix;
  } else {
    url = href;
  }
  return url;
}
function createStylesheetElement(stylesheet, base, assetsPrefix, queryParams) {
  if (stylesheet.type === "inline") {
    return {
      props: {},
      children: stylesheet.content
    };
  } else {
    return {
      props: {
        rel: "stylesheet",
        href: createAssetLink(stylesheet.src, base, assetsPrefix)
      },
      children: ""
    };
  }
}
function createStylesheetElementSet(stylesheets, base, assetsPrefix, queryParams) {
  return new Set(
    stylesheets.map((s) => createStylesheetElement(s, base, assetsPrefix))
  );
}
function createModuleScriptElement(script, base, assetsPrefix, queryParams) {
  if (script.type === "external") {
    return createModuleScriptElementWithSrc(script.value, base, assetsPrefix);
  } else {
    return {
      props: {
        type: "module"
      },
      children: script.value
    };
  }
}
function createModuleScriptElementWithSrc(src, base, assetsPrefix, queryParams) {
  return {
    props: {
      type: "module",
      src: createAssetLink(src, base, assetsPrefix)
    },
    children: ""
  };
}

class AppPipeline extends Pipeline {
  getName() {
    return "AppPipeline";
  }
  static create({ manifest, streaming }) {
    const resolve = async function resolve2(specifier) {
      if (!(specifier in manifest.entryModules)) {
        throw new Error(`Unable to resolve [${specifier}]`);
      }
      const bundlePath = manifest.entryModules[specifier];
      if (bundlePath.startsWith("data:") || bundlePath.length === 0) {
        return bundlePath;
      } else {
        return createAssetLink(bundlePath, manifest.base, manifest.assetsPrefix);
      }
    };
    const logger = createConsoleLogger({ level: manifest.logLevel });
    const pipeline = new AppPipeline(
      logger,
      manifest,
      "production",
      manifest.renderers,
      resolve,
      streaming,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0,
      void 0
    );
    return pipeline;
  }
  async headElements(routeData) {
    const { assetsPrefix, base } = this.manifest;
    const routeInfo = this.manifest.routes.find(
      (route) => route.routeData.route === routeData.route
    );
    const links = /* @__PURE__ */ new Set();
    const scripts = /* @__PURE__ */ new Set();
    const styles = createStylesheetElementSet(routeInfo?.styles ?? [], base, assetsPrefix);
    for (const script of routeInfo?.scripts ?? []) {
      if ("stage" in script) {
        if (script.stage === "head-inline") {
          scripts.add({
            props: {},
            children: script.children
          });
        }
      } else {
        scripts.add(createModuleScriptElement(script, base, assetsPrefix));
      }
    }
    return { links, styles, scripts };
  }
  componentMetadata() {
  }
  async getComponentByRoute(routeData) {
    const module = await this.getModuleForRoute(routeData);
    return module.page();
  }
  async getModuleForRoute(route) {
    for (const defaultRoute of this.defaultRoutes) {
      if (route.component === defaultRoute.component) {
        return {
          page: () => Promise.resolve(defaultRoute.instance)
        };
      }
    }
    let routeToProcess = route;
    if (routeIsRedirect(route)) {
      if (route.redirectRoute) {
        routeToProcess = route.redirectRoute;
      } else {
        return RedirectSinglePageBuiltModule;
      }
    } else if (routeIsFallback(route)) {
      routeToProcess = getFallbackRoute(route, this.manifest.routes);
    }
    if (this.manifest.pageMap) {
      const importComponentInstance = this.manifest.pageMap.get(routeToProcess.component);
      if (!importComponentInstance) {
        throw new Error(
          `Unexpectedly unable to find a component instance for route ${route.route}`
        );
      }
      return await importComponentInstance();
    } else if (this.manifest.pageModule) {
      return this.manifest.pageModule;
    }
    throw new Error(
      "Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue."
    );
  }
  async tryRewrite(payload, request) {
    const { newUrl, pathname, routeData } = findRouteToRewrite({
      payload,
      request,
      routes: this.manifest?.routes.map((r) => r.routeData),
      trailingSlash: this.manifest.trailingSlash,
      buildFormat: this.manifest.buildFormat,
      base: this.manifest.base,
      outDir: this.manifest?.serverLike ? this.manifest.buildClientDir : this.manifest.outDir
    });
    const componentInstance = await this.getComponentByRoute(routeData);
    return { newUrl, pathname, componentInstance, routeData };
  }
}

class App extends BaseApp {
  createPipeline(streaming) {
    return AppPipeline.create({
      manifest: this.manifest,
      streaming
    });
  }
  isDev() {
    return false;
  }
  // Should we log something for our users?
  logRequest(_options) {
  }
}

const contexts = /* @__PURE__ */ new WeakMap();
const ID_PREFIX = "r";
function getContext(rendererContextResult) {
  if (contexts.has(rendererContextResult)) {
    return contexts.get(rendererContextResult);
  }
  const ctx = {
    currentIndex: 0,
    get id() {
      return ID_PREFIX + this.currentIndex.toString();
    }
  };
  contexts.set(rendererContextResult, ctx);
  return ctx;
}
function incrementId(rendererContextResult) {
  const ctx = getContext(rendererContextResult);
  const id = ctx.id;
  ctx.currentIndex++;
  return id;
}

const StaticHtml = ({
  value,
  name,
  hydrate = true
}) => {
  if (value == null || value.trim() === "") return null;
  const tagName = hydrate ? "astro-slot" : "astro-static-slot";
  return createElement(tagName, {
    name,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: value }
  });
};
var static_html_default = memo(StaticHtml, () => true);

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
const reactTypeof = /* @__PURE__ */ Symbol.for("react.element");
const reactTransitionalTypeof = /* @__PURE__ */ Symbol.for("react.transitional.element");
async function check(Component, props, children, metadata) {
  if (typeof Component === "object") {
    return Component["$$typeof"].toString().slice("Symbol(".length).startsWith("react");
  }
  if (typeof Component !== "function") return false;
  if (Component.name === "QwikComponent") return false;
  if (typeof Component === "function" && Component["$$typeof"] === /* @__PURE__ */ Symbol.for("react.forward_ref"))
    return false;
  if (Component.prototype != null && typeof Component.prototype.render === "function") {
    return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
  }
  let isReactComponent = false;
  function Tester(...args) {
    try {
      const vnode = Component(...args);
      if (vnode && (vnode["$$typeof"] === reactTypeof || vnode["$$typeof"] === reactTransitionalTypeof)) {
        isReactComponent = true;
      }
    } catch {
    }
    return React.createElement("div");
  }
  await renderToStaticMarkup.call(this, Tester, props, children);
  return isReactComponent;
}
async function getNodeWritable() {
  let nodeStreamBuiltinModuleName = "node:stream";
  let { Writable } = await import(
    /* @vite-ignore */
    nodeStreamBuiltinModuleName
  );
  return Writable;
}
function needsHydration(metadata) {
  return metadata?.astroStaticSlot ? !!metadata.hydrate : true;
}
async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
  let prefix;
  if (this && this.result) {
    prefix = incrementId(this.result);
  }
  const attrs = { prefix };
  delete props["class"];
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = React.createElement(static_html_default, {
      hydrate: needsHydration(metadata),
      value,
      name
    });
  }
  const newProps = {
    ...props,
    ...slots
  };
  const newChildren = children ?? props.children;
  if (newChildren != null) {
    newProps.children = React.createElement(static_html_default, {
      hydrate: needsHydration(metadata),
      value: newChildren
    });
  }
  const formState = this ? await getFormState(this) : void 0;
  if (formState) {
    attrs["data-action-result"] = JSON.stringify(formState[0]);
    attrs["data-action-key"] = formState[1];
    attrs["data-action-name"] = formState[2];
  }
  const vnode = React.createElement(Component, newProps);
  const renderOptions = {
    identifierPrefix: prefix,
    formState
  };
  let html;
  if ("renderToReadableStream" in ReactDOM) {
    html = await renderToReadableStreamAsync(vnode, renderOptions);
  } else {
    html = await renderToPipeableStreamAsync(vnode, renderOptions);
  }
  html = html.replace(
    /<link\s[^>]*rel="(?:preload|modulepreload|stylesheet|preconnect|dns-prefetch)"[^>]*>/g,
    ""
  );
  return { html, attrs };
}
async function getFormState({
  result
}) {
  const { request, actionResult } = result;
  if (!actionResult) return void 0;
  if (!isFormRequest(request.headers.get("content-type"))) return void 0;
  const { searchParams } = new URL(request.url);
  const formData = await request.clone().formData();
  const actionKey = formData.get("$ACTION_KEY")?.toString();
  const actionName = searchParams.get("_action");
  if (!actionKey || !actionName) return void 0;
  return [actionResult, actionKey, actionName];
}
async function renderToPipeableStreamAsync(vnode, options) {
  const Writable = await getNodeWritable();
  let html = "";
  return new Promise((resolve, reject) => {
    let error = void 0;
    let stream = ReactDOM.renderToPipeableStream(vnode, {
      ...options,
      onError(err) {
        error = err;
        reject(error);
      },
      onAllReady() {
        stream.pipe(
          new Writable({
            write(chunk, _encoding, callback) {
              html += chunk.toString("utf-8");
              callback();
            },
            destroy() {
              resolve(html);
            }
          })
        );
      }
    });
  });
}
async function readResult(stream) {
  const reader = stream.getReader();
  let result = "";
  const decoder = new TextDecoder("utf-8");
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      if (value) {
        result += decoder.decode(value);
      } else {
        decoder.decode(new Uint8Array());
      }
      return result;
    }
    result += decoder.decode(value, { stream: true });
  }
}
async function renderToReadableStreamAsync(vnode, options) {
  return await readResult(await ReactDOM.renderToReadableStream(vnode, options));
}
const formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function isFormRequest(contentType) {
  const type = contentType?.split(";")[0].toLowerCase();
  return formContentTypes.some((t) => type === t);
}
const renderer = {
  name: "@astrojs/react",
  check,
  renderToStaticMarkup,
  supportsAstroStaticSlot: true
};
var server_default = renderer;

const renderers = [Object.assign({"name":"@astrojs/react","clientEntrypoint":"@astrojs/react/client.js","serverEntrypoint":"@astrojs/react/server.js"}, { ssr: server_default }),];

const serializedData = [{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/_image","component":"node_modules/.pnpm/astro@6.3.1_@types+node@24.12.2_tsx@4.21.0/node_modules/astro/dist/assets/endpoint/node.js","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/.well-known/jwks.json","isIndex":false,"type":"endpoint","pattern":"^\\/\\.well-known\\/jwks\\.json$","segments":[[{"content":".well-known","dynamic":false,"spread":false}],[{"content":"jwks.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/.well-known/jwks.json.ts","pathname":"/.well-known/jwks.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/follows","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/follows\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"follows","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/follows.ts","pathname":"/api/follows","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/me","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/me\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"me","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/me.ts","pathname":"/api/me","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/search","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/search\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/search.ts","pathname":"/api/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/status","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/status\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"status","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/status.ts","pathname":"/api/status","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/oauth/callback","isIndex":false,"type":"endpoint","pattern":"^\\/oauth\\/callback\\/?$","segments":[[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oauth/callback.ts","pathname":"/oauth/callback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/oauth/login","isIndex":false,"type":"endpoint","pattern":"^\\/oauth\\/login\\/?$","segments":[[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oauth/login.ts","pathname":"/oauth/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/oauth/logout","isIndex":false,"type":"endpoint","pattern":"^\\/oauth\\/logout\\/?$","segments":[[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oauth/logout.ts","pathname":"/oauth/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/oauth-client-metadata.json","isIndex":false,"type":"endpoint","pattern":"^\\/oauth-client-metadata\\.json$","segments":[[{"content":"oauth-client-metadata.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oauth-client-metadata.json.ts","pathname":"/oauth-client-metadata.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/og.png","isIndex":false,"type":"endpoint","pattern":"^\\/og\\.png$","segments":[[{"content":"og.png","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/og.png.ts","pathname":"/og.png","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/profile/[handle]-og.png","isIndex":false,"type":"endpoint","pattern":"^\\/profile\\/([^/]+?)-og\\.png\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}],[{"content":"handle","dynamic":true,"spread":false},{"content":"-og.png","dynamic":false,"spread":false}]],"params":["handle"],"component":"src/pages/profile/[handle]-og.png.ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/profile/[handle]","isIndex":false,"type":"page","pattern":"^\\/profile\\/([^/]+?)\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}],[{"content":"handle","dynamic":true,"spread":false}]],"params":["handle"],"component":"src/pages/profile/[handle].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/settings","isIndex":false,"type":"page","pattern":"^\\/settings\\/?$","segments":[[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/settings.astro","pathname":"/settings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}];
				serializedData.map(deserializeRouteInfo);

const _page0 = () => import('./node_DTNMIqE9.mjs').then(n => n.n);
const _page1 = () => import('./jwks_VuEttr0C.mjs');
const _page2 = () => import('./follows_B69Q2fyv.mjs');
const _page3 = () => import('./me_BsD3nP_T.mjs');
const _page4 = () => import('./search_UZE_TxPx.mjs');
const _page5 = () => import('./status_V_GAUrA-.mjs');
const _page6 = () => import('./callback_CcaStVUQ.mjs');
const _page7 = () => import('./login_COPAev77.mjs');
const _page8 = () => import('./logout_CIZt0esr.mjs');
const _page9 = () => import('./oauth-client-metadata_4tPRveVr.mjs');
const _page10 = () => import('./og_njou0-Rj.mjs');
const _page11 = () => import('./_handle_-og_D28syFO8.mjs');
const _page12 = () => import('./_handle__D4ccKNsm.mjs');
const _page13 = () => import('./settings_DzsevLW0.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@6.3.1_@types+node@24.12.2_tsx@4.21.0/node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/.well-known/jwks.json.ts", _page1],
    ["src/pages/api/follows.ts", _page2],
    ["src/pages/api/me.ts", _page3],
    ["src/pages/api/search.ts", _page4],
    ["src/pages/api/status.ts", _page5],
    ["src/pages/oauth/callback.ts", _page6],
    ["src/pages/oauth/login.ts", _page7],
    ["src/pages/oauth/logout.ts", _page8],
    ["src/pages/oauth-client-metadata.json.ts", _page9],
    ["src/pages/og.png.ts", _page10],
    ["src/pages/profile/[handle]-og.png.ts", _page11],
    ["src/pages/profile/[handle].astro", _page12],
    ["src/pages/settings.astro", _page13]
]);

const _manifest = deserializeManifest(({"rootDir":"file:///Users/trueberryless/repos/trueberryless-org/pronouns.blue/","cacheDir":"file:///Users/trueberryless/repos/trueberryless-org/pronouns.blue/node_modules/.astro/","outDir":"file:///Users/trueberryless/repos/trueberryless-org/pronouns.blue/dist/","srcDir":"file:///Users/trueberryless/repos/trueberryless-org/pronouns.blue/src/","publicDir":"file:///Users/trueberryless/repos/trueberryless-org/pronouns.blue/public/","buildClientDir":"file:///Users/trueberryless/repos/trueberryless-org/pronouns.blue/dist/client/","buildServerDir":"file:///Users/trueberryless/repos/trueberryless-org/pronouns.blue/dist/server/","adapterName":"@astrojs/node","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/_image","component":"node_modules/.pnpm/astro@6.3.1_@types+node@24.12.2_tsx@4.21.0/node_modules/astro/dist/assets/endpoint/node.js","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/.well-known/jwks.json","isIndex":false,"type":"endpoint","pattern":"^\\/\\.well-known\\/jwks\\.json$","segments":[[{"content":".well-known","dynamic":false,"spread":false}],[{"content":"jwks.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/.well-known/jwks.json.ts","pathname":"/.well-known/jwks.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/follows","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/follows\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"follows","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/follows.ts","pathname":"/api/follows","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/me","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/me\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"me","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/me.ts","pathname":"/api/me","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/search","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/search\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/search.ts","pathname":"/api/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/status","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/status\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"status","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/status.ts","pathname":"/api/status","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/credits","isIndex":false,"type":"page","pattern":"^\\/credits\\/?$","segments":[[{"content":"credits","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/credits.astro","pathname":"/credits","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/oauth/callback","isIndex":false,"type":"endpoint","pattern":"^\\/oauth\\/callback\\/?$","segments":[[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oauth/callback.ts","pathname":"/oauth/callback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/oauth/login","isIndex":false,"type":"endpoint","pattern":"^\\/oauth\\/login\\/?$","segments":[[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oauth/login.ts","pathname":"/oauth/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/oauth/logout","isIndex":false,"type":"endpoint","pattern":"^\\/oauth\\/logout\\/?$","segments":[[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oauth/logout.ts","pathname":"/oauth/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/oauth-client-metadata.json","isIndex":false,"type":"endpoint","pattern":"^\\/oauth-client-metadata\\.json$","segments":[[{"content":"oauth-client-metadata.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oauth-client-metadata.json.ts","pathname":"/oauth-client-metadata.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/og.png","isIndex":false,"type":"endpoint","pattern":"^\\/og\\.png$","segments":[[{"content":"og.png","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/og.png.ts","pathname":"/og.png","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy\\/?$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/profile/[handle]-og.png","isIndex":false,"type":"endpoint","pattern":"^\\/profile\\/([^/]+?)-og\\.png\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}],[{"content":"handle","dynamic":true,"spread":false},{"content":"-og.png","dynamic":false,"spread":false}]],"params":["handle"],"component":"src/pages/profile/[handle]-og.png.ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/HeartIcon.DYGaam80.css"}],"routeData":{"route":"/profile/[handle]","isIndex":false,"type":"page","pattern":"^\\/profile\\/([^/]+?)\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}],[{"content":"handle","dynamic":true,"spread":false}]],"params":["handle"],"component":"src/pages/profile/[handle].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"_astro/HeartIcon.DYGaam80.css"}],"routeData":{"route":"/settings","isIndex":false,"type":"page","pattern":"^\\/settings\\/?$","segments":[[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/settings.astro","pathname":"/settings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/terms","isIndex":false,"type":"page","pattern":"^\\/terms\\/?$","segments":[[{"content":"terms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms.astro","pathname":"/terms","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"serverLike":true,"middlewareMode":"classic","base":"/","trailingSlash":"ignore","compressHTML":true,"experimentalQueuedRendering":{"enabled":false,"poolSize":0,"contentCache":false},"componentMetadata":[["/Users/trueberryless/repos/trueberryless-org/pronouns.blue/src/pages/credits.astro",{"propagation":"none","containsHead":true}],["/Users/trueberryless/repos/trueberryless-org/pronouns.blue/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/trueberryless/repos/trueberryless-org/pronouns.blue/src/pages/privacy.astro",{"propagation":"none","containsHead":true}],["/Users/trueberryless/repos/trueberryless-org/pronouns.blue/src/pages/terms.astro",{"propagation":"none","containsHead":true}],["/Users/trueberryless/repos/trueberryless-org/pronouns.blue/src/pages/profile/[handle].astro",{"propagation":"none","containsHead":true}],["/Users/trueberryless/repos/trueberryless-org/pronouns.blue/src/pages/settings.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_BOlrdqWF.mjs","\u0000virtual:astro:middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_CqFkrO5f.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_CQQ1F5PF.mjs","\u0000virtual:astro:page:src/pages/credits@_@astro":"chunks/credits_BECHfxpc.mjs","\u0000virtual:astro:page:src/pages/privacy@_@astro":"chunks/privacy_Dl-9wd-w.mjs","\u0000virtual:astro:page:src/pages/terms@_@astro":"chunks/terms_lfsyFOiX.mjs","\u0000virtual:astro:page:src/pages/index@_@astro":"chunks/index_ClxbMu-f.mjs","astro/entrypoints/prerender":"prerender-entry.CTLdLtjl.mjs","@astrojs/node/server.js":"entry.mjs","\u0000virtual:astro:page:src/pages/.well-known/jwks.json@_@ts":"chunks/jwks_VuEttr0C.mjs","\u0000virtual:astro:page:src/pages/api/follows@_@ts":"chunks/follows_B69Q2fyv.mjs","\u0000virtual:astro:page:src/pages/api/me@_@ts":"chunks/me_BsD3nP_T.mjs","\u0000virtual:astro:page:src/pages/api/search@_@ts":"chunks/search_UZE_TxPx.mjs","\u0000virtual:astro:page:src/pages/api/status@_@ts":"chunks/status_V_GAUrA-.mjs","\u0000virtual:astro:page:src/pages/oauth/callback@_@ts":"chunks/callback_CcaStVUQ.mjs","\u0000virtual:astro:page:src/pages/oauth/login@_@ts":"chunks/login_COPAev77.mjs","\u0000virtual:astro:page:src/pages/oauth/logout@_@ts":"chunks/logout_CIZt0esr.mjs","\u0000virtual:astro:page:src/pages/oauth-client-metadata.json@_@ts":"chunks/oauth-client-metadata_4tPRveVr.mjs","\u0000virtual:astro:page:src/pages/og.png@_@ts":"chunks/og_njou0-Rj.mjs","\u0000virtual:astro:page:src/pages/profile/[handle]-og.png@_@ts":"chunks/_handle_-og_D28syFO8.mjs","\u0000virtual:astro:page:src/pages/profile/[handle]@_@astro":"chunks/_handle__D4ccKNsm.mjs","\u0000virtual:astro:page:src/pages/settings@_@astro":"chunks/settings_DzsevLW0.mjs","/Users/trueberryless/repos/trueberryless-org/pronouns.blue/node_modules/.pnpm/astro@6.3.1_@types+node@24.12.2_tsx@4.21.0/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CT6r1pvl.mjs","/Users/trueberryless/repos/trueberryless-org/pronouns.blue/node_modules/.pnpm/astro@6.3.1_@types+node@24.12.2_tsx@4.21.0/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CZ1STEZH.js","@/components/AppNav":"_astro/AppNav.CvJ2gPnv.js","@/components/FloatingProfileBack":"_astro/FloatingProfileBack.XjH3lZ_p.js","@/components/FollowsSection":"_astro/FollowsSection.p5nOZVFN.js","@/components/HandleSearch":"_astro/HandleSearch.KRblLvaN.js","@/components/HomeUserSection":"_astro/HomeUserSection.D0g-9Mf9.js","@/components/PrivacyUserSection":"_astro/PrivacyUserSection.CUn-Ua9h.js","@/components/ProfileDisplay":"_astro/ProfileDisplay.CEqgPKt2.js","@/components/ProfileEditor":"_astro/ProfileEditor.DL0GcuTT.js","@astrojs/react/client.js":"_astro/client.DTojXMD-.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/pronouns.blue-round.svg","/pronouns.blue.png","/pronouns.blue.svg","/_astro/AppNav.CvJ2gPnv.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CZ1STEZH.js","/_astro/FloatingProfileBack.XjH3lZ_p.js","/_astro/FollowsSection.p5nOZVFN.js","/_astro/HandleSearch.KRblLvaN.js","/_astro/HeartIcon.DMZx32Tc.js","/_astro/HomeUserSection.D0g-9Mf9.js","/_astro/PrivacyUserSection.CUn-Ua9h.js","/_astro/ProfileDisplay.CEqgPKt2.js","/_astro/ProfileEditor.DL0GcuTT.js","/_astro/client.DTojXMD-.js","/_astro/index.CO9X3OiW.js","/_astro/jsx-runtime.u17CrQMm.js","/_astro/router.BRjOBFNg.js","/_astro/BaseLayout.BQl5vhAS.css","/_astro/HeartIcon.DYGaam80.css","/credits/index.html","/privacy/index.html","/terms/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"TSBKFpxYmicL/hOXRZTL/HF+D9NFaVz0VD7l5j17iyg=","sessionConfig":{"driver":"unstorage/drivers/fs-lite","options":{"base":"/Users/trueberryless/repos/trueberryless-org/pronouns.blue/node_modules/.astro/sessions"}},"image":{},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false}));
					const manifestRoutes = _manifest.routes;
					
					const manifest = Object.assign(_manifest, {
					  renderers,
					  actions: () => import('./noop-entrypoint_BOlrdqWF.mjs'),
					  middleware: () => import('../virtual_astro_middleware.mjs'),
					  sessionDriver: () => import('./_virtual_astro_session-driver_CqFkrO5f.mjs'),
					  
					  serverIslandMappings: () => import('./_virtual_astro_server-island-manifest_CQQ1F5PF.mjs'),
					  routes: manifestRoutes,
					  pageMap,
					});

const createApp$1 = ({ streaming } = {}) => {
  const app = new App(manifest, streaming);
  app.setFetchHandler(fetchable);
  return app;
};

const createApp = createApp$1;

const mode = "standalone";
const client = "file:///Users/trueberryless/repos/trueberryless-org/pronouns.blue/dist/client/";
const server = "file:///Users/trueberryless/repos/trueberryless-org/pronouns.blue/dist/server/";
const host = false;
const port = 4321;
const staticHeaders = false;
const bodySizeLimit = 1073741824;
const experimentalDisableStreaming = false;

const options = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	bodySizeLimit,
	client,
	experimentalDisableStreaming,
	host,
	mode,
	port,
	server,
	staticHeaders
}, Symbol.toStringTag, { value: 'Module' }));

const createOutgoingHttpHeaders = (headers) => {
  if (!headers) {
    return void 0;
  }
  const nodeHeaders = Object.fromEntries(headers.entries());
  if (Object.keys(nodeHeaders).length === 0) {
    return void 0;
  }
  if (headers.has("set-cookie")) {
    const cookieHeaders = headers.getSetCookie();
    if (cookieHeaders.length > 1) {
      nodeHeaders["set-cookie"] = cookieHeaders;
    }
  }
  return nodeHeaders;
};

function getFirstForwardedValue(multiValueHeader) {
  return multiValueHeader?.toString().split(",").map((e) => e.trim())[0];
}
function sanitizeHost(hostname) {
  if (!hostname) return void 0;
  if (/[/\\]/.test(hostname)) return void 0;
  return hostname;
}
function parseHost(host) {
  const parts = host.split(":");
  return {
    hostname: parts[0],
    port: parts[1]
  };
}
function matchesAllowedDomains(hostname, protocol, port, allowedDomains) {
  const hostWithPort = port ? `${hostname}:${port}` : hostname;
  const urlString = `${protocol}://${hostWithPort}`;
  if (!URL.canParse(urlString)) {
    return false;
  }
  const testUrl = new URL(urlString);
  return allowedDomains.some((pattern) => matchPattern(testUrl, pattern));
}
function validateHost(host, protocol, allowedDomains) {
  if (!host || host.length === 0) return void 0;
  if (!allowedDomains || allowedDomains.length === 0) return void 0;
  const sanitized = sanitizeHost(host);
  if (!sanitized) return void 0;
  const { hostname, port } = parseHost(sanitized);
  if (matchesAllowedDomains(hostname, protocol, port, allowedDomains)) {
    return sanitized;
  }
  return void 0;
}
function validateForwardedHeaders(forwardedProtocol, forwardedHost, forwardedPort, allowedDomains) {
  const result = {};
  if (forwardedProtocol) {
    if (allowedDomains && allowedDomains.length > 0) {
      const hasProtocolPatterns = allowedDomains.some((pattern) => pattern.protocol !== void 0);
      if (hasProtocolPatterns) {
        try {
          const testUrl = new URL(`${forwardedProtocol}://example.com`);
          const isAllowed = allowedDomains.some(
            (pattern) => matchPattern(testUrl, { protocol: pattern.protocol })
          );
          if (isAllowed) {
            result.protocol = forwardedProtocol;
          }
        } catch {
        }
      } else if (/^https?$/.test(forwardedProtocol)) {
        result.protocol = forwardedProtocol;
      }
    }
  }
  if (forwardedPort && allowedDomains && allowedDomains.length > 0) {
    const hasPortPatterns = allowedDomains.some((pattern) => pattern.port !== void 0);
    if (hasPortPatterns) {
      const isAllowed = allowedDomains.some((pattern) => pattern.port === forwardedPort);
      if (isAllowed) {
        result.port = forwardedPort;
      }
    }
  }
  if (forwardedHost && forwardedHost.length > 0 && allowedDomains && allowedDomains.length > 0) {
    const protoForValidation = result.protocol || "https";
    const sanitized = sanitizeHost(forwardedHost);
    if (sanitized) {
      const { hostname, port: portFromHost } = parseHost(sanitized);
      const portForValidation = result.port || portFromHost;
      if (matchesAllowedDomains(hostname, protoForValidation, portForValidation, allowedDomains)) {
        result.host = sanitized;
      }
    }
  }
  return result;
}

function createRequest(req, {
  skipBody = false,
  allowedDomains = [],
  bodySizeLimit,
  port: serverPort
} = {}) {
  const controller = new AbortController();
  const isEncrypted = "encrypted" in req.socket && req.socket.encrypted;
  const providedProtocol = isEncrypted ? "https" : "http";
  const untrustedHostname = req.headers.host ?? req.headers[":authority"];
  const validated = validateForwardedHeaders(
    getFirstForwardedValue(req.headers["x-forwarded-proto"]),
    getFirstForwardedValue(req.headers["x-forwarded-host"]),
    getFirstForwardedValue(req.headers["x-forwarded-port"]),
    allowedDomains
  );
  const protocol = validated.protocol ?? providedProtocol;
  const validatedHostname = validateHost(
    typeof untrustedHostname === "string" ? untrustedHostname : void 0,
    protocol,
    allowedDomains
  );
  const hostname = validated.host ?? validatedHostname ?? "localhost";
  const port = validated.port ?? (!validated.host && !validatedHostname && serverPort ? String(serverPort) : void 0);
  let url;
  try {
    const hostnamePort = getHostnamePort(hostname, port);
    url = new URL(`${protocol}://${hostnamePort}${req.url}`);
  } catch {
    const hostnamePort = getHostnamePort(hostname, port);
    url = new URL(`${protocol}://${hostnamePort}`);
  }
  const options = {
    method: req.method || "GET",
    headers: makeRequestHeaders(req),
    signal: controller.signal
  };
  const bodyAllowed = options.method !== "HEAD" && options.method !== "GET" && skipBody === false;
  if (bodyAllowed) {
    Object.assign(options, makeRequestBody(req, bodySizeLimit));
  }
  const request = new Request(url, options);
  const socket = getRequestSocket(req);
  if (socket && typeof socket.on === "function") {
    const existingCleanup = getAbortControllerCleanup(req);
    if (existingCleanup) {
      existingCleanup();
    }
    let cleanedUp = false;
    const removeSocketListener = () => {
      if (typeof socket.off === "function") {
        socket.off("close", onSocketClose);
      } else if (typeof socket.removeListener === "function") {
        socket.removeListener("close", onSocketClose);
      }
    };
    const cleanup = () => {
      if (cleanedUp) return;
      cleanedUp = true;
      removeSocketListener();
      controller.signal.removeEventListener("abort", cleanup);
      Reflect.deleteProperty(req, nodeRequestAbortControllerCleanupSymbol);
    };
    const onSocketClose = () => {
      cleanup();
      if (!controller.signal.aborted) {
        controller.abort();
      }
    };
    socket.on("close", onSocketClose);
    controller.signal.addEventListener("abort", cleanup, { once: true });
    Reflect.set(req, nodeRequestAbortControllerCleanupSymbol, cleanup);
    if (socket.destroyed) {
      onSocketClose();
    }
  }
  const hostValidated = validated.host !== void 0 || validatedHostname !== void 0;
  const forwardedClientIp = hostValidated ? getFirstForwardedValue(req.headers["x-forwarded-for"]) : void 0;
  const clientIp = forwardedClientIp || req.socket?.remoteAddress;
  if (clientIp) {
    Reflect.set(request, clientAddressSymbol, clientIp);
  }
  return request;
}
async function writeResponse(source, destination) {
  const { status, headers, body, statusText } = source;
  if (!(destination instanceof Http2ServerResponse)) {
    destination.statusMessage = statusText;
  }
  destination.writeHead(status, createOutgoingHttpHeaders(headers));
  const cleanupAbortFromDestination = getAbortControllerCleanup(
    destination.req ?? void 0
  );
  if (cleanupAbortFromDestination) {
    const runCleanup = () => {
      cleanupAbortFromDestination();
      if (typeof destination.off === "function") {
        destination.off("finish", runCleanup);
        destination.off("close", runCleanup);
      } else {
        destination.removeListener?.("finish", runCleanup);
        destination.removeListener?.("close", runCleanup);
      }
    };
    destination.on("finish", runCleanup);
    destination.on("close", runCleanup);
  }
  if (!body) return destination.end();
  try {
    const reader = body.getReader();
    destination.on("close", () => {
      reader.cancel().catch((err) => {
        console.error(
          "There was an uncaught error in the middle of the stream while rendering %s.",
          destination.req.url,
          err
        );
      });
    });
    let result = await reader.read();
    while (!result.done) {
      destination.write(result.value);
      result = await reader.read();
    }
    destination.end();
  } catch (err) {
    destination.write("Internal server error", () => {
      err instanceof Error ? destination.destroy(err) : destination.destroy();
    });
  }
}
function getHostnamePort(hostname, port) {
  const portInHostname = typeof hostname === "string" && /:\d+$/.test(hostname);
  const hostnamePort = portInHostname ? hostname : `${hostname}${port ? `:${port}` : ""}`;
  return hostnamePort;
}
function makeRequestHeaders(req) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers)) {
    if (value === void 0) {
      continue;
    }
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else {
      headers.append(name, value);
    }
  }
  return headers;
}
function makeRequestBody(req, bodySizeLimit) {
  if (req.body !== void 0) {
    if (typeof req.body === "string" && req.body.length > 0) {
      return { body: Buffer.from(req.body) };
    }
    if (typeof req.body === "object" && req.body !== null && Object.keys(req.body).length > 0) {
      return { body: Buffer.from(JSON.stringify(req.body)) };
    }
    if (typeof req.body === "object" && req.body !== null && typeof req.body[Symbol.asyncIterator] !== "undefined") {
      return asyncIterableToBodyProps(req.body, bodySizeLimit);
    }
  }
  return asyncIterableToBodyProps(req, bodySizeLimit);
}
function asyncIterableToBodyProps(iterable, bodySizeLimit) {
  const source = bodySizeLimit != null ? limitAsyncIterable(iterable, bodySizeLimit) : iterable;
  return {
    // Node uses undici for the Request implementation. Undici accepts
    // a non-standard async iterable for the body.
    // @ts-expect-error
    body: source,
    // The duplex property is required when using a ReadableStream or async
    // iterable for the body. The type definitions do not include the duplex
    // property because they are not up-to-date.
    duplex: "half"
  };
}
async function* limitAsyncIterable(iterable, limit) {
  let received = 0;
  for await (const chunk of iterable) {
    const byteLength = chunk instanceof Uint8Array ? chunk.byteLength : typeof chunk === "string" ? Buffer.byteLength(chunk) : 0;
    received += byteLength;
    if (received > limit) {
      throw new Error(`Body size limit exceeded: received more than ${limit} bytes`);
    }
    yield chunk;
  }
}
function getAbortControllerCleanup(req) {
  if (!req) return void 0;
  const cleanup = Reflect.get(req, nodeRequestAbortControllerCleanupSymbol);
  return typeof cleanup === "function" ? cleanup : void 0;
}
function getRequestSocket(req) {
  if (req.socket && typeof req.socket.on === "function") {
    return req.socket;
  }
  const http2Socket = req.stream?.session?.socket;
  if (http2Socket && typeof http2Socket.on === "function") {
    return http2Socket;
  }
  return void 0;
}

function resolveClientDir(options) {
  const clientURLRaw = new URL(options.client);
  const serverURLRaw = new URL(options.server);
  const rel = path.relative(url.fileURLToPath(serverURLRaw), url.fileURLToPath(clientURLRaw));
  const serverFolder = path.basename(options.server);
  let serverEntryFolderURL = path.dirname(import.meta.url);
  let previous = "";
  while (!serverEntryFolderURL.endsWith(serverFolder)) {
    if (serverEntryFolderURL === previous) {
      throw new Error(
        `[@astrojs/node] Could not find the server directory "${serverFolder}" by walking up from "${import.meta.url}". This can happen when the server entry point is bundled into a single file (e.g. with esbuild) so that import.meta.url no longer contains the original "${serverFolder}" path segment. When bundling the server entry, make sure the output path contains a "${serverFolder}" directory segment, or avoid bundling the server entry entirely.`
      );
    }
    previous = serverEntryFolderURL;
    serverEntryFolderURL = path.dirname(serverEntryFolderURL);
  }
  const serverEntryURL = serverEntryFolderURL + "/entry.mjs";
  const clientURL = new URL(appendForwardSlash(rel), serverEntryURL);
  return url.fileURLToPath(clientURL);
}

async function readErrorPageFromDisk(client, status) {
  const filePaths = [`${status}.html`, `${status}/index.html`];
  for (const filePath of filePaths) {
    const fullPath = path.join(client, filePath);
    let stream;
    try {
      stream = createReadStream(fullPath);
      await new Promise((resolve, reject) => {
        stream.once("open", () => resolve());
        stream.once("error", reject);
      });
      const webStream = Readable.toWeb(stream);
      return new Response(webStream, {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    } catch {
      stream?.destroy();
    }
  }
  return void 0;
}
function createAppHandler(app, options) {
  const als = new AsyncLocalStorage();
  const logger = app.adapterLogger;
  process.on("unhandledRejection", (reason) => {
    const requestUrl = als.getStore();
    logger.error(`Unhandled rejection while rendering ${requestUrl}`);
    console.error(reason);
  });
  const client = resolveClientDir(options);
  const prerenderedErrorPageFetch = async (url) => {
    const { pathname } = new URL(url);
    if (pathname.endsWith("/404.html") || pathname.endsWith("/404/index.html")) {
      const response = await readErrorPageFromDisk(client, 404);
      if (response) return response;
    }
    if (pathname.endsWith("/500.html") || pathname.endsWith("/500/index.html")) {
      const response = await readErrorPageFromDisk(client, 500);
      if (response) return response;
    }
    return new Response(null, { status: 404 });
  };
  const effectiveBodySizeLimit = options.bodySizeLimit === 0 || options.bodySizeLimit === Number.POSITIVE_INFINITY ? void 0 : options.bodySizeLimit;
  return async (req, res, next, locals) => {
    let request;
    try {
      request = createRequest(req, {
        allowedDomains: app.getAllowedDomains?.() ?? [],
        bodySizeLimit: effectiveBodySizeLimit,
        port: options.port
      });
    } catch (err) {
      logger.error(`Could not render ${req.url}`);
      console.error(err);
      res.statusCode = 500;
      res.end("Internal Server Error");
      return;
    }
    const routeData = app.match(request, true);
    if (routeData && !(routeData.type === "page" && routeData.prerender)) {
      const response = await als.run(
        request.url,
        () => app.render(request, {
          addCookieHeader: true,
          locals,
          routeData,
          prerenderedErrorPageFetch
        })
      );
      await writeResponse(response, res);
    } else if (next) {
      const cleanup = getAbortControllerCleanup(req);
      if (cleanup) cleanup();
      return next();
    } else {
      const response = await app.render(request, {
        addCookieHeader: true,
        prerenderedErrorPageFetch
      });
      await writeResponse(response, res);
    }
  };
}

var serverDestroy;
var hasRequiredServerDestroy;

function requireServerDestroy () {
	if (hasRequiredServerDestroy) return serverDestroy;
	hasRequiredServerDestroy = 1;
	serverDestroy = enableDestroy;

	function enableDestroy(server) {
	  var connections = {};

	  server.on('connection', function(conn) {
	    var key = conn.remoteAddress + ':' + conn.remotePort;
	    connections[key] = conn;
	    conn.on('close', function() {
	      delete connections[key];
	    });
	  });

	  server.destroy = function(cb) {
	    server.close(cb);
	    for (var key in connections)
	      connections[key].destroy();
	  };
	}
	return serverDestroy;
}

var serverDestroyExports = requireServerDestroy();
const enableDestroy = /*@__PURE__*/getDefaultExportFromCjs(serverDestroyExports);

const wildcardHosts = /* @__PURE__ */ new Set(["0.0.0.0", "::", "0000:0000:0000:0000:0000:0000:0000:0000"]);
async function logListeningOn(logger, server, configuredHost) {
  await new Promise((resolve) => server.once("listening", resolve));
  const protocol = server instanceof https.Server ? "https" : "http";
  const host = getResolvedHostForHttpServer(configuredHost);
  const { port } = server.address();
  const address = getNetworkAddress(protocol, host, port);
  if (host === void 0 || wildcardHosts.has(host)) {
    logger.info(
      `Server listening on 
  local: ${address.local[0]} 	
  network: ${address.network[0]}
`
    );
  } else {
    logger.info(`Server listening on ${address.local[0]}`);
  }
}
function getResolvedHostForHttpServer(host) {
  if (host === false) {
    return "localhost";
  } else if (host === true) {
    return void 0;
  } else {
    return host;
  }
}
function getNetworkAddress(protocol = "http", hostname, port, base) {
  const NetworkAddress = {
    local: [],
    network: []
  };
  Object.values(os.networkInterfaces()).flatMap((nInterface) => nInterface ?? []).filter((detail) => detail && detail.address && detail.family === "IPv4").forEach((detail) => {
    let host = detail.address.replace(
      "127.0.0.1",
      hostname === void 0 || wildcardHosts.has(hostname) ? "localhost" : hostname
    );
    if (host.includes(":")) {
      host = `[${host}]`;
    }
    const url = `${protocol}://${host}:${port}${""}`;
    if (detail.address.includes("127.0.0.1")) {
      NetworkAddress.local.push(url);
    } else {
      NetworkAddress.network.push(url);
    }
  });
  return NetworkAddress;
}

var httpErrors = {exports: {}};

/*!
 * depd
 * Copyright(c) 2014-2018 Douglas Christopher Wilson
 * MIT Licensed
 */

var depd_1;
var hasRequiredDepd;

function requireDepd () {
	if (hasRequiredDepd) return depd_1;
	hasRequiredDepd = 1;
	/**
	 * Module dependencies.
	 */

	var relative = require$$0$2.relative;

	/**
	 * Module exports.
	 */

	depd_1 = depd;

	/**
	 * Get the path to base files on.
	 */

	var basePath = process.cwd();

	/**
	 * Determine if namespace is contained in the string.
	 */

	function containsNamespace (str, namespace) {
	  var vals = str.split(/[ ,]+/);
	  var ns = String(namespace).toLowerCase();

	  for (var i = 0; i < vals.length; i++) {
	    var val = vals[i];

	    // namespace contained
	    if (val && (val === '*' || val.toLowerCase() === ns)) {
	      return true
	    }
	  }

	  return false
	}

	/**
	 * Convert a data descriptor to accessor descriptor.
	 */

	function convertDataDescriptorToAccessor (obj, prop, message) {
	  var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
	  var value = descriptor.value;

	  descriptor.get = function getter () { return value };

	  if (descriptor.writable) {
	    descriptor.set = function setter (val) { return (value = val) };
	  }

	  delete descriptor.value;
	  delete descriptor.writable;

	  Object.defineProperty(obj, prop, descriptor);

	  return descriptor
	}

	/**
	 * Create arguments string to keep arity.
	 */

	function createArgumentsString (arity) {
	  var str = '';

	  for (var i = 0; i < arity; i++) {
	    str += ', arg' + i;
	  }

	  return str.substr(2)
	}

	/**
	 * Create stack string from stack.
	 */

	function createStackString (stack) {
	  var str = this.name + ': ' + this.namespace;

	  if (this.message) {
	    str += ' deprecated ' + this.message;
	  }

	  for (var i = 0; i < stack.length; i++) {
	    str += '\n    at ' + stack[i].toString();
	  }

	  return str
	}

	/**
	 * Create deprecate for namespace in caller.
	 */

	function depd (namespace) {
	  if (!namespace) {
	    throw new TypeError('argument namespace is required')
	  }

	  var stack = getStack();
	  var site = callSiteLocation(stack[1]);
	  var file = site[0];

	  function deprecate (message) {
	    // call to self as log
	    log.call(deprecate, message);
	  }

	  deprecate._file = file;
	  deprecate._ignored = isignored(namespace);
	  deprecate._namespace = namespace;
	  deprecate._traced = istraced(namespace);
	  deprecate._warned = Object.create(null);

	  deprecate.function = wrapfunction;
	  deprecate.property = wrapproperty;

	  return deprecate
	}

	/**
	 * Determine if event emitter has listeners of a given type.
	 *
	 * The way to do this check is done three different ways in Node.js >= 0.8
	 * so this consolidates them into a minimal set using instance methods.
	 *
	 * @param {EventEmitter} emitter
	 * @param {string} type
	 * @returns {boolean}
	 * @private
	 */

	function eehaslisteners (emitter, type) {
	  var count = typeof emitter.listenerCount !== 'function'
	    ? emitter.listeners(type).length
	    : emitter.listenerCount(type);

	  return count > 0
	}

	/**
	 * Determine if namespace is ignored.
	 */

	function isignored (namespace) {
	  if (process.noDeprecation) {
	    // --no-deprecation support
	    return true
	  }

	  var str = process.env.NO_DEPRECATION || '';

	  // namespace ignored
	  return containsNamespace(str, namespace)
	}

	/**
	 * Determine if namespace is traced.
	 */

	function istraced (namespace) {
	  if (process.traceDeprecation) {
	    // --trace-deprecation support
	    return true
	  }

	  var str = process.env.TRACE_DEPRECATION || '';

	  // namespace traced
	  return containsNamespace(str, namespace)
	}

	/**
	 * Display deprecation message.
	 */

	function log (message, site) {
	  var haslisteners = eehaslisteners(process, 'deprecation');

	  // abort early if no destination
	  if (!haslisteners && this._ignored) {
	    return
	  }

	  var caller;
	  var callFile;
	  var callSite;
	  var depSite;
	  var i = 0;
	  var seen = false;
	  var stack = getStack();
	  var file = this._file;

	  if (site) {
	    // provided site
	    depSite = site;
	    callSite = callSiteLocation(stack[1]);
	    callSite.name = depSite.name;
	    file = callSite[0];
	  } else {
	    // get call site
	    i = 2;
	    depSite = callSiteLocation(stack[i]);
	    callSite = depSite;
	  }

	  // get caller of deprecated thing in relation to file
	  for (; i < stack.length; i++) {
	    caller = callSiteLocation(stack[i]);
	    callFile = caller[0];

	    if (callFile === file) {
	      seen = true;
	    } else if (callFile === this._file) {
	      file = this._file;
	    } else if (seen) {
	      break
	    }
	  }

	  var key = caller
	    ? depSite.join(':') + '__' + caller.join(':')
	    : undefined;

	  if (key !== undefined && key in this._warned) {
	    // already warned
	    return
	  }

	  this._warned[key] = true;

	  // generate automatic message from call site
	  var msg = message;
	  if (!msg) {
	    msg = callSite === depSite || !callSite.name
	      ? defaultMessage(depSite)
	      : defaultMessage(callSite);
	  }

	  // emit deprecation if listeners exist
	  if (haslisteners) {
	    var err = DeprecationError(this._namespace, msg, stack.slice(i));
	    process.emit('deprecation', err);
	    return
	  }

	  // format and write message
	  var format = process.stderr.isTTY
	    ? formatColor
	    : formatPlain;
	  var output = format.call(this, msg, caller, stack.slice(i));
	  process.stderr.write(output + '\n', 'utf8');
	}

	/**
	 * Get call site location as array.
	 */

	function callSiteLocation (callSite) {
	  var file = callSite.getFileName() || '<anonymous>';
	  var line = callSite.getLineNumber();
	  var colm = callSite.getColumnNumber();

	  if (callSite.isEval()) {
	    file = callSite.getEvalOrigin() + ', ' + file;
	  }

	  var site = [file, line, colm];

	  site.callSite = callSite;
	  site.name = callSite.getFunctionName();

	  return site
	}

	/**
	 * Generate a default message from the site.
	 */

	function defaultMessage (site) {
	  var callSite = site.callSite;
	  var funcName = site.name;

	  // make useful anonymous name
	  if (!funcName) {
	    funcName = '<anonymous@' + formatLocation(site) + '>';
	  }

	  var context = callSite.getThis();
	  var typeName = context && callSite.getTypeName();

	  // ignore useless type name
	  if (typeName === 'Object') {
	    typeName = undefined;
	  }

	  // make useful type name
	  if (typeName === 'Function') {
	    typeName = context.name || typeName;
	  }

	  return typeName && callSite.getMethodName()
	    ? typeName + '.' + funcName
	    : funcName
	}

	/**
	 * Format deprecation message without color.
	 */

	function formatPlain (msg, caller, stack) {
	  var timestamp = new Date().toUTCString();

	  var formatted = timestamp +
	    ' ' + this._namespace +
	    ' deprecated ' + msg;

	  // add stack trace
	  if (this._traced) {
	    for (var i = 0; i < stack.length; i++) {
	      formatted += '\n    at ' + stack[i].toString();
	    }

	    return formatted
	  }

	  if (caller) {
	    formatted += ' at ' + formatLocation(caller);
	  }

	  return formatted
	}

	/**
	 * Format deprecation message with color.
	 */

	function formatColor (msg, caller, stack) {
	  var formatted = '\x1b[36;1m' + this._namespace + '\x1b[22;39m' + // bold cyan
	    ' \x1b[33;1mdeprecated\x1b[22;39m' + // bold yellow
	    ' \x1b[0m' + msg + '\x1b[39m'; // reset

	  // add stack trace
	  if (this._traced) {
	    for (var i = 0; i < stack.length; i++) {
	      formatted += '\n    \x1b[36mat ' + stack[i].toString() + '\x1b[39m'; // cyan
	    }

	    return formatted
	  }

	  if (caller) {
	    formatted += ' \x1b[36m' + formatLocation(caller) + '\x1b[39m'; // cyan
	  }

	  return formatted
	}

	/**
	 * Format call site location.
	 */

	function formatLocation (callSite) {
	  return relative(basePath, callSite[0]) +
	    ':' + callSite[1] +
	    ':' + callSite[2]
	}

	/**
	 * Get the stack as array of call sites.
	 */

	function getStack () {
	  var limit = Error.stackTraceLimit;
	  var obj = {};
	  var prep = Error.prepareStackTrace;

	  Error.prepareStackTrace = prepareObjectStackTrace;
	  Error.stackTraceLimit = Math.max(10, limit);

	  // capture the stack
	  Error.captureStackTrace(obj);

	  // slice this function off the top
	  var stack = obj.stack.slice(1);

	  Error.prepareStackTrace = prep;
	  Error.stackTraceLimit = limit;

	  return stack
	}

	/**
	 * Capture call site stack from v8.
	 */

	function prepareObjectStackTrace (obj, stack) {
	  return stack
	}

	/**
	 * Return a wrapped function in a deprecation message.
	 */

	function wrapfunction (fn, message) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('argument fn must be a function')
	  }

	  var args = createArgumentsString(fn.length);
	  var stack = getStack();
	  var site = callSiteLocation(stack[1]);

	  site.name = fn.name;

	  // eslint-disable-next-line no-new-func
	  var deprecatedfn = new Function('fn', 'log', 'deprecate', 'message', 'site',
	    '"use strict"\n' +
	    'return function (' + args + ') {' +
	    'log.call(deprecate, message, site)\n' +
	    'return fn.apply(this, arguments)\n' +
	    '}')(fn, log, this, message, site);

	  return deprecatedfn
	}

	/**
	 * Wrap property in a deprecation message.
	 */

	function wrapproperty (obj, prop, message) {
	  if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
	    throw new TypeError('argument obj must be object')
	  }

	  var descriptor = Object.getOwnPropertyDescriptor(obj, prop);

	  if (!descriptor) {
	    throw new TypeError('must call property on owner object')
	  }

	  if (!descriptor.configurable) {
	    throw new TypeError('property must be configurable')
	  }

	  var deprecate = this;
	  var stack = getStack();
	  var site = callSiteLocation(stack[1]);

	  // set site name
	  site.name = prop;

	  // convert data descriptor
	  if ('value' in descriptor) {
	    descriptor = convertDataDescriptorToAccessor(obj, prop);
	  }

	  var get = descriptor.get;
	  var set = descriptor.set;

	  // wrap getter
	  if (typeof get === 'function') {
	    descriptor.get = function getter () {
	      log.call(deprecate, message, site);
	      return get.apply(this, arguments)
	    };
	  }

	  // wrap setter
	  if (typeof set === 'function') {
	    descriptor.set = function setter () {
	      log.call(deprecate, message, site);
	      return set.apply(this, arguments)
	    };
	  }

	  Object.defineProperty(obj, prop, descriptor);
	}

	/**
	 * Create DeprecationError for deprecation
	 */

	function DeprecationError (namespace, message, stack) {
	  var error = new Error();
	  var stackString;

	  Object.defineProperty(error, 'constructor', {
	    value: DeprecationError
	  });

	  Object.defineProperty(error, 'message', {
	    configurable: true,
	    enumerable: false,
	    value: message,
	    writable: true
	  });

	  Object.defineProperty(error, 'name', {
	    enumerable: false,
	    configurable: true,
	    value: 'DeprecationError',
	    writable: true
	  });

	  Object.defineProperty(error, 'namespace', {
	    configurable: true,
	    enumerable: false,
	    value: namespace,
	    writable: true
	  });

	  Object.defineProperty(error, 'stack', {
	    configurable: true,
	    enumerable: false,
	    get: function () {
	      if (stackString !== undefined) {
	        return stackString
	      }

	      // prepare stack trace
	      return (stackString = createStackString.call(this, stack))
	    },
	    set: function setter (val) {
	      stackString = val;
	    }
	  });

	  return error
	}
	return depd_1;
}

var setprototypeof;
var hasRequiredSetprototypeof;

function requireSetprototypeof () {
	if (hasRequiredSetprototypeof) return setprototypeof;
	hasRequiredSetprototypeof = 1;
	/* eslint no-proto: 0 */
	setprototypeof = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);

	function setProtoOf (obj, proto) {
	  obj.__proto__ = proto;
	  return obj
	}

	function mixinProperties (obj, proto) {
	  for (var prop in proto) {
	    if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
	      obj[prop] = proto[prop];
	    }
	  }
	  return obj
	}
	return setprototypeof;
}

const require$$0$1 = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "103": "Early Hints",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a Teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Too Early",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required",
};

/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */

var statuses;
var hasRequiredStatuses;

function requireStatuses () {
	if (hasRequiredStatuses) return statuses;
	hasRequiredStatuses = 1;

	/**
	 * Module dependencies.
	 * @private
	 */

	var codes = require$$0$1;

	/**
	 * Module exports.
	 * @public
	 */

	statuses = status;

	// status code to message map
	status.message = codes;

	// status message (lower-case) to code map
	status.code = createMessageToStatusCodeMap(codes);

	// array of status codes
	status.codes = createStatusCodeList(codes);

	// status codes for redirects
	status.redirect = {
	  300: true,
	  301: true,
	  302: true,
	  303: true,
	  305: true,
	  307: true,
	  308: true
	};

	// status codes for empty bodies
	status.empty = {
	  204: true,
	  205: true,
	  304: true
	};

	// status codes for when you should retry the request
	status.retry = {
	  502: true,
	  503: true,
	  504: true
	};

	/**
	 * Create a map of message to status code.
	 * @private
	 */

	function createMessageToStatusCodeMap (codes) {
	  var map = {};

	  Object.keys(codes).forEach(function forEachCode (code) {
	    var message = codes[code];
	    var status = Number(code);

	    // populate map
	    map[message.toLowerCase()] = status;
	  });

	  return map
	}

	/**
	 * Create a list of all status codes.
	 * @private
	 */

	function createStatusCodeList (codes) {
	  return Object.keys(codes).map(function mapCode (code) {
	    return Number(code)
	  })
	}

	/**
	 * Get the status code for given message.
	 * @private
	 */

	function getStatusCode (message) {
	  var msg = message.toLowerCase();

	  if (!Object.prototype.hasOwnProperty.call(status.code, msg)) {
	    throw new Error('invalid status message: "' + message + '"')
	  }

	  return status.code[msg]
	}

	/**
	 * Get the status message for given code.
	 * @private
	 */

	function getStatusMessage (code) {
	  if (!Object.prototype.hasOwnProperty.call(status.message, code)) {
	    throw new Error('invalid status code: ' + code)
	  }

	  return status.message[code]
	}

	/**
	 * Get the status code.
	 *
	 * Given a number, this will throw if it is not a known status
	 * code, otherwise the code will be returned. Given a string,
	 * the string will be parsed for a number and return the code
	 * if valid, otherwise will lookup the code assuming this is
	 * the status message.
	 *
	 * @param {string|number} code
	 * @returns {number}
	 * @public
	 */

	function status (code) {
	  if (typeof code === 'number') {
	    return getStatusMessage(code)
	  }

	  if (typeof code !== 'string') {
	    throw new TypeError('code must be a number or string')
	  }

	  // '403'
	  var n = parseInt(code, 10);
	  if (!isNaN(n)) {
	    return getStatusMessage(n)
	  }

	  return getStatusCode(code)
	}
	return statuses;
}

var inherits = {exports: {}};

var inherits_browser = {exports: {}};

var hasRequiredInherits_browser;

function requireInherits_browser () {
	if (hasRequiredInherits_browser) return inherits_browser.exports;
	hasRequiredInherits_browser = 1;
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	          value: ctor,
	          enumerable: false,
	          writable: true,
	          configurable: true
	        }
	      });
	    }
	  };
	} else {
	  // old school shim for old browsers
	  inherits_browser.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      var TempCtor = function () {};
	      TempCtor.prototype = superCtor.prototype;
	      ctor.prototype = new TempCtor();
	      ctor.prototype.constructor = ctor;
	    }
	  };
	}
	return inherits_browser.exports;
}

var hasRequiredInherits;

function requireInherits () {
	if (hasRequiredInherits) return inherits.exports;
	hasRequiredInherits = 1;
	try {
	  var util = require('util');
	  /* istanbul ignore next */
	  if (typeof util.inherits !== 'function') throw '';
	  inherits.exports = util.inherits;
	} catch (e) {
	  /* istanbul ignore next */
	  inherits.exports = requireInherits_browser();
	}
	return inherits.exports;
}

/*!
 * toidentifier
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */

var toidentifier;
var hasRequiredToidentifier;

function requireToidentifier () {
	if (hasRequiredToidentifier) return toidentifier;
	hasRequiredToidentifier = 1;

	/**
	 * Module exports.
	 * @public
	 */

	toidentifier = toIdentifier;

	/**
	 * Trasform the given string into a JavaScript identifier
	 *
	 * @param {string} str
	 * @returns {string}
	 * @public
	 */

	function toIdentifier (str) {
	  return str
	    .split(' ')
	    .map(function (token) {
	      return token.slice(0, 1).toUpperCase() + token.slice(1)
	    })
	    .join('')
	    .replace(/[^ _0-9a-z]/gi, '')
	}
	return toidentifier;
}

/*!
 * http-errors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */

var hasRequiredHttpErrors;

function requireHttpErrors () {
	if (hasRequiredHttpErrors) return httpErrors.exports;
	hasRequiredHttpErrors = 1;
	(function (module) {

		/**
		 * Module dependencies.
		 * @private
		 */

		var deprecate = requireDepd()('http-errors');
		var setPrototypeOf = requireSetprototypeof();
		var statuses = requireStatuses();
		var inherits = requireInherits();
		var toIdentifier = requireToidentifier();

		/**
		 * Module exports.
		 * @public
		 */

		module.exports = createError;
		module.exports.HttpError = createHttpErrorConstructor();
		module.exports.isHttpError = createIsHttpErrorFunction(module.exports.HttpError);

		// Populate exports for all constructors
		populateConstructorExports(module.exports, statuses.codes, module.exports.HttpError);

		/**
		 * Get the code class of a status code.
		 * @private
		 */

		function codeClass (status) {
		  return Number(String(status).charAt(0) + '00')
		}

		/**
		 * Create a new HTTP Error.
		 *
		 * @returns {Error}
		 * @public
		 */

		function createError () {
		  // so much arity going on ~_~
		  var err;
		  var msg;
		  var status = 500;
		  var props = {};
		  for (var i = 0; i < arguments.length; i++) {
		    var arg = arguments[i];
		    var type = typeof arg;
		    if (type === 'object' && arg instanceof Error) {
		      err = arg;
		      status = err.status || err.statusCode || status;
		    } else if (type === 'number' && i === 0) {
		      status = arg;
		    } else if (type === 'string') {
		      msg = arg;
		    } else if (type === 'object') {
		      props = arg;
		    } else {
		      throw new TypeError('argument #' + (i + 1) + ' unsupported type ' + type)
		    }
		  }

		  if (typeof status === 'number' && (status < 400 || status >= 600)) {
		    deprecate('non-error status code; use only 4xx or 5xx status codes');
		  }

		  if (typeof status !== 'number' ||
		    (!statuses.message[status] && (status < 400 || status >= 600))) {
		    status = 500;
		  }

		  // constructor
		  var HttpError = createError[status] || createError[codeClass(status)];

		  if (!err) {
		    // create error
		    err = HttpError
		      ? new HttpError(msg)
		      : new Error(msg || statuses.message[status]);
		    Error.captureStackTrace(err, createError);
		  }

		  if (!HttpError || !(err instanceof HttpError) || err.status !== status) {
		    // add properties to generic error
		    err.expose = status < 500;
		    err.status = err.statusCode = status;
		  }

		  for (var key in props) {
		    if (key !== 'status' && key !== 'statusCode') {
		      err[key] = props[key];
		    }
		  }

		  return err
		}

		/**
		 * Create HTTP error abstract base class.
		 * @private
		 */

		function createHttpErrorConstructor () {
		  function HttpError () {
		    throw new TypeError('cannot construct abstract class')
		  }

		  inherits(HttpError, Error);

		  return HttpError
		}

		/**
		 * Create a constructor for a client error.
		 * @private
		 */

		function createClientErrorConstructor (HttpError, name, code) {
		  var className = toClassName(name);

		  function ClientError (message) {
		    // create the error object
		    var msg = message != null ? message : statuses.message[code];
		    var err = new Error(msg);

		    // capture a stack trace to the construction point
		    Error.captureStackTrace(err, ClientError);

		    // adjust the [[Prototype]]
		    setPrototypeOf(err, ClientError.prototype);

		    // redefine the error message
		    Object.defineProperty(err, 'message', {
		      enumerable: true,
		      configurable: true,
		      value: msg,
		      writable: true
		    });

		    // redefine the error name
		    Object.defineProperty(err, 'name', {
		      enumerable: false,
		      configurable: true,
		      value: className,
		      writable: true
		    });

		    return err
		  }

		  inherits(ClientError, HttpError);
		  nameFunc(ClientError, className);

		  ClientError.prototype.status = code;
		  ClientError.prototype.statusCode = code;
		  ClientError.prototype.expose = true;

		  return ClientError
		}

		/**
		 * Create function to test is a value is a HttpError.
		 * @private
		 */

		function createIsHttpErrorFunction (HttpError) {
		  return function isHttpError (val) {
		    if (!val || typeof val !== 'object') {
		      return false
		    }

		    if (val instanceof HttpError) {
		      return true
		    }

		    return val instanceof Error &&
		      typeof val.expose === 'boolean' &&
		      typeof val.statusCode === 'number' && val.status === val.statusCode
		  }
		}

		/**
		 * Create a constructor for a server error.
		 * @private
		 */

		function createServerErrorConstructor (HttpError, name, code) {
		  var className = toClassName(name);

		  function ServerError (message) {
		    // create the error object
		    var msg = message != null ? message : statuses.message[code];
		    var err = new Error(msg);

		    // capture a stack trace to the construction point
		    Error.captureStackTrace(err, ServerError);

		    // adjust the [[Prototype]]
		    setPrototypeOf(err, ServerError.prototype);

		    // redefine the error message
		    Object.defineProperty(err, 'message', {
		      enumerable: true,
		      configurable: true,
		      value: msg,
		      writable: true
		    });

		    // redefine the error name
		    Object.defineProperty(err, 'name', {
		      enumerable: false,
		      configurable: true,
		      value: className,
		      writable: true
		    });

		    return err
		  }

		  inherits(ServerError, HttpError);
		  nameFunc(ServerError, className);

		  ServerError.prototype.status = code;
		  ServerError.prototype.statusCode = code;
		  ServerError.prototype.expose = false;

		  return ServerError
		}

		/**
		 * Set the name of a function, if possible.
		 * @private
		 */

		function nameFunc (func, name) {
		  var desc = Object.getOwnPropertyDescriptor(func, 'name');

		  if (desc && desc.configurable) {
		    desc.value = name;
		    Object.defineProperty(func, 'name', desc);
		  }
		}

		/**
		 * Populate the exports object with constructors for every error class.
		 * @private
		 */

		function populateConstructorExports (exports, codes, HttpError) {
		  codes.forEach(function forEachCode (code) {
		    var CodeError;
		    var name = toIdentifier(statuses.message[code]);

		    switch (codeClass(code)) {
		      case 400:
		        CodeError = createClientErrorConstructor(HttpError, name, code);
		        break
		      case 500:
		        CodeError = createServerErrorConstructor(HttpError, name, code);
		        break
		    }

		    if (CodeError) {
		      // export the constructor
		      exports[code] = CodeError;
		      exports[name] = CodeError;
		    }
		  });
		}

		/**
		 * Get a class name from a name identifier.
		 *
		 * @param {string} name
		 * @returns {string}
		 * @private
		 */

		function toClassName (name) {
		  return name.slice(-5) === 'Error' ? name : name + 'Error'
		} 
	} (httpErrors));
	return httpErrors.exports;
}

var src = {exports: {}};

var browser = {exports: {}};

/**
 * Helpers.
 */

var ms;
var hasRequiredMs;

function requireMs () {
	if (hasRequiredMs) return ms;
	hasRequiredMs = 1;
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	ms = function (val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isFinite(val)) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
	    'val is not a non-empty string or a valid number. val=' +
	      JSON.stringify(val)
	  );
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'weeks':
	    case 'week':
	    case 'w':
	      return n * w;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (msAbs >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (msAbs >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (msAbs >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return plural(ms, msAbs, d, 'day');
	  }
	  if (msAbs >= h) {
	    return plural(ms, msAbs, h, 'hour');
	  }
	  if (msAbs >= m) {
	    return plural(ms, msAbs, m, 'minute');
	  }
	  if (msAbs >= s) {
	    return plural(ms, msAbs, s, 'second');
	  }
	  return ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, msAbs, n, name) {
	  var isPlural = msAbs >= n * 1.5;
	  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
	}
	return ms;
}

var common;
var hasRequiredCommon;

function requireCommon () {
	if (hasRequiredCommon) return common;
	hasRequiredCommon = 1;
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 */

	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = requireMs();
		createDebug.destroy = destroy;

		Object.keys(env).forEach(key => {
			createDebug[key] = env[key];
		});

		/**
		* The currently active debug mode names, and names to skip.
		*/

		createDebug.names = [];
		createDebug.skips = [];

		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.formatters = {};

		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;

			for (let i = 0; i < namespace.length; i++) {
				hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
				hash |= 0; // Convert to 32bit integer
			}

			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;

		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;

			function debug(...args) {
				// Disabled?
				if (!debug.enabled) {
					return;
				}

				const self = debug;

				// Set `diff` timestamp
				const curr = Number(new Date());
				const ms = curr - (prevTime || curr);
				self.diff = ms;
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;

				args[0] = createDebug.coerce(args[0]);

				if (typeof args[0] !== 'string') {
					// Anything else let's inspect with %O
					args.unshift('%O');
				}

				// Apply any `formatters` transformations
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					// If we encounter an escaped % then don't increase the array index
					if (match === '%%') {
						return '%';
					}
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === 'function') {
						const val = args[index];
						match = formatter.call(self, val);

						// Now we need to remove `args[index]` since it's inlined in the `format`
						args.splice(index, 1);
						index--;
					}
					return match;
				});

				// Apply env-specific formatting (colors, etc.)
				createDebug.formatArgs.call(self, args);

				const logFn = self.log || createDebug.log;
				logFn.apply(self, args);
			}

			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

			Object.defineProperty(debug, 'enabled', {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) {
						return enableOverride;
					}
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}

					return enabledCache;
				},
				set: v => {
					enableOverride = v;
				}
			});

			// Env-specific initialization logic for debug instances
			if (typeof createDebug.init === 'function') {
				createDebug.init(debug);
			}

			return debug;
		}

		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}

		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;

			createDebug.names = [];
			createDebug.skips = [];

			const split = (typeof namespaces === 'string' ? namespaces : '')
				.trim()
				.replace(/\s+/g, ',')
				.split(',')
				.filter(Boolean);

			for (const ns of split) {
				if (ns[0] === '-') {
					createDebug.skips.push(ns.slice(1));
				} else {
					createDebug.names.push(ns);
				}
			}
		}

		/**
		 * Checks if the given string matches a namespace template, honoring
		 * asterisks as wildcards.
		 *
		 * @param {String} search
		 * @param {String} template
		 * @return {Boolean}
		 */
		function matchesTemplate(search, template) {
			let searchIndex = 0;
			let templateIndex = 0;
			let starIndex = -1;
			let matchIndex = 0;

			while (searchIndex < search.length) {
				if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')) {
					// Match character or proceed with wildcard
					if (template[templateIndex] === '*') {
						starIndex = templateIndex;
						matchIndex = searchIndex;
						templateIndex++; // Skip the '*'
					} else {
						searchIndex++;
						templateIndex++;
					}
				} else if (starIndex !== -1) { // eslint-disable-line no-negated-condition
					// Backtrack to the last '*' and try to match more characters
					templateIndex = starIndex + 1;
					matchIndex++;
					searchIndex = matchIndex;
				} else {
					return false; // No match
				}
			}

			// Handle trailing '*' in template
			while (templateIndex < template.length && template[templateIndex] === '*') {
				templateIndex++;
			}

			return templateIndex === template.length;
		}

		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			const namespaces = [
				...createDebug.names,
				...createDebug.skips.map(namespace => '-' + namespace)
			].join(',');
			createDebug.enable('');
			return namespaces;
		}

		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			for (const skip of createDebug.skips) {
				if (matchesTemplate(name, skip)) {
					return false;
				}
			}

			for (const ns of createDebug.names) {
				if (matchesTemplate(name, ns)) {
					return true;
				}
			}

			return false;
		}

		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			if (val instanceof Error) {
				return val.stack || val.message;
			}
			return val;
		}

		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}

		createDebug.enable(createDebug.load());

		return createDebug;
	}

	common = setup;
	return common;
}

/* eslint-env browser */

var hasRequiredBrowser;

function requireBrowser () {
	if (hasRequiredBrowser) return browser.exports;
	hasRequiredBrowser = 1;
	(function (module, exports) {
		/**
		 * This is the web browser implementation of `debug()`.
		 */

		exports.formatArgs = formatArgs;
		exports.save = save;
		exports.load = load;
		exports.useColors = useColors;
		exports.storage = localstorage();
		exports.destroy = (() => {
			let warned = false;

			return () => {
				if (!warned) {
					warned = true;
					console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
				}
			};
		})();

		/**
		 * Colors.
		 */

		exports.colors = [
			'#0000CC',
			'#0000FF',
			'#0033CC',
			'#0033FF',
			'#0066CC',
			'#0066FF',
			'#0099CC',
			'#0099FF',
			'#00CC00',
			'#00CC33',
			'#00CC66',
			'#00CC99',
			'#00CCCC',
			'#00CCFF',
			'#3300CC',
			'#3300FF',
			'#3333CC',
			'#3333FF',
			'#3366CC',
			'#3366FF',
			'#3399CC',
			'#3399FF',
			'#33CC00',
			'#33CC33',
			'#33CC66',
			'#33CC99',
			'#33CCCC',
			'#33CCFF',
			'#6600CC',
			'#6600FF',
			'#6633CC',
			'#6633FF',
			'#66CC00',
			'#66CC33',
			'#9900CC',
			'#9900FF',
			'#9933CC',
			'#9933FF',
			'#99CC00',
			'#99CC33',
			'#CC0000',
			'#CC0033',
			'#CC0066',
			'#CC0099',
			'#CC00CC',
			'#CC00FF',
			'#CC3300',
			'#CC3333',
			'#CC3366',
			'#CC3399',
			'#CC33CC',
			'#CC33FF',
			'#CC6600',
			'#CC6633',
			'#CC9900',
			'#CC9933',
			'#CCCC00',
			'#CCCC33',
			'#FF0000',
			'#FF0033',
			'#FF0066',
			'#FF0099',
			'#FF00CC',
			'#FF00FF',
			'#FF3300',
			'#FF3333',
			'#FF3366',
			'#FF3399',
			'#FF33CC',
			'#FF33FF',
			'#FF6600',
			'#FF6633',
			'#FF9900',
			'#FF9933',
			'#FFCC00',
			'#FFCC33'
		];

		/**
		 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
		 * and the Firebug extension (any Firefox version) are known
		 * to support "%c" CSS customizations.
		 *
		 * TODO: add a `localStorage` variable to explicitly enable/disable colors
		 */

		// eslint-disable-next-line complexity
		function useColors() {
			// NB: In an Electron preload script, document will be defined but not fully
			// initialized. Since we know we're in Chrome, we'll just detect this case
			// explicitly
			if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
				return true;
			}

			// Internet Explorer and Edge do not support colors.
			if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
				return false;
			}

			let m;

			// Is webkit? http://stackoverflow.com/a/16459606/376773
			// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
			// eslint-disable-next-line no-return-assign
			return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
				// Is firebug? http://stackoverflow.com/a/398120/376773
				(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
				// Is firefox >= v31?
				// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
				(typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31) ||
				// Double check webkit in userAgent just in case we are in a worker
				(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
		}

		/**
		 * Colorize log arguments if enabled.
		 *
		 * @api public
		 */

		function formatArgs(args) {
			args[0] = (this.useColors ? '%c' : '') +
				this.namespace +
				(this.useColors ? ' %c' : ' ') +
				args[0] +
				(this.useColors ? '%c ' : ' ') +
				'+' + module.exports.humanize(this.diff);

			if (!this.useColors) {
				return;
			}

			const c = 'color: ' + this.color;
			args.splice(1, 0, c, 'color: inherit');

			// The final "%c" is somewhat tricky, because there could be other
			// arguments passed either before or after the %c, so we need to
			// figure out the correct index to insert the CSS into
			let index = 0;
			let lastC = 0;
			args[0].replace(/%[a-zA-Z%]/g, match => {
				if (match === '%%') {
					return;
				}
				index++;
				if (match === '%c') {
					// We only are interested in the *last* %c
					// (the user may have provided their own)
					lastC = index;
				}
			});

			args.splice(lastC, 0, c);
		}

		/**
		 * Invokes `console.debug()` when available.
		 * No-op when `console.debug` is not a "function".
		 * If `console.debug` is not available, falls back
		 * to `console.log`.
		 *
		 * @api public
		 */
		exports.log = console.debug || console.log || (() => {});

		/**
		 * Save `namespaces`.
		 *
		 * @param {String} namespaces
		 * @api private
		 */
		function save(namespaces) {
			try {
				if (namespaces) {
					exports.storage.setItem('debug', namespaces);
				} else {
					exports.storage.removeItem('debug');
				}
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		/**
		 * Load `namespaces`.
		 *
		 * @return {String} returns the previously persisted debug modes
		 * @api private
		 */
		function load() {
			let r;
			try {
				r = exports.storage.getItem('debug') || exports.storage.getItem('DEBUG') ;
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}

			// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
			if (!r && typeof process !== 'undefined' && 'env' in process) {
				r = process.env.DEBUG;
			}

			return r;
		}

		/**
		 * Localstorage attempts to return the localstorage.
		 *
		 * This is necessary because safari throws
		 * when a user disables cookies/localstorage
		 * and you attempt to access it.
		 *
		 * @return {LocalStorage}
		 * @api private
		 */

		function localstorage() {
			try {
				// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
				// The Browser also has localStorage in the global context.
				return localStorage;
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		module.exports = requireCommon()(exports);

		const {formatters} = module.exports;

		/**
		 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
		 */

		formatters.j = function (v) {
			try {
				return JSON.stringify(v);
			} catch (error) {
				return '[UnexpectedJSONParseError]: ' + error.message;
			}
		}; 
	} (browser, browser.exports));
	return browser.exports;
}

var node = {exports: {}};

var hasFlag;
var hasRequiredHasFlag;

function requireHasFlag () {
	if (hasRequiredHasFlag) return hasFlag;
	hasRequiredHasFlag = 1;

	hasFlag = (flag, argv = process.argv) => {
		const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
		const position = argv.indexOf(prefix + flag);
		const terminatorPosition = argv.indexOf('--');
		return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
	};
	return hasFlag;
}

var supportsColor_1;
var hasRequiredSupportsColor;

function requireSupportsColor () {
	if (hasRequiredSupportsColor) return supportsColor_1;
	hasRequiredSupportsColor = 1;
	const os = require$$0$3;
	const tty = require$$1;
	const hasFlag = requireHasFlag();

	const {env} = process;

	let forceColor;
	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false') ||
		hasFlag('color=never')) {
		forceColor = 0;
	} else if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		forceColor = 1;
	}

	if ('FORCE_COLOR' in env) {
		if (env.FORCE_COLOR === 'true') {
			forceColor = 1;
		} else if (env.FORCE_COLOR === 'false') {
			forceColor = 0;
		} else {
			forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
		}
	}

	function translateLevel(level) {
		if (level === 0) {
			return false;
		}

		return {
			level,
			hasBasic: true,
			has256: level >= 2,
			has16m: level >= 3
		};
	}

	function supportsColor(haveStream, streamIsTTY) {
		if (forceColor === 0) {
			return 0;
		}

		if (hasFlag('color=16m') ||
			hasFlag('color=full') ||
			hasFlag('color=truecolor')) {
			return 3;
		}

		if (hasFlag('color=256')) {
			return 2;
		}

		if (haveStream && !streamIsTTY && forceColor === undefined) {
			return 0;
		}

		const min = forceColor || 0;

		if (env.TERM === 'dumb') {
			return min;
		}

		if (process.platform === 'win32') {
			// Windows 10 build 10586 is the first Windows release that supports 256 colors.
			// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
			const osRelease = os.release().split('.');
			if (
				Number(osRelease[0]) >= 10 &&
				Number(osRelease[2]) >= 10586
			) {
				return Number(osRelease[2]) >= 14931 ? 3 : 2;
			}

			return 1;
		}

		if ('CI' in env) {
			if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
				return 1;
			}

			return min;
		}

		if ('TEAMCITY_VERSION' in env) {
			return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
		}

		if (env.COLORTERM === 'truecolor') {
			return 3;
		}

		if ('TERM_PROGRAM' in env) {
			const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

			switch (env.TERM_PROGRAM) {
				case 'iTerm.app':
					return version >= 3 ? 3 : 2;
				case 'Apple_Terminal':
					return 2;
				// No default
			}
		}

		if (/-256(color)?$/i.test(env.TERM)) {
			return 2;
		}

		if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
			return 1;
		}

		if ('COLORTERM' in env) {
			return 1;
		}

		return min;
	}

	function getSupportLevel(stream) {
		const level = supportsColor(stream, stream && stream.isTTY);
		return translateLevel(level);
	}

	supportsColor_1 = {
		supportsColor: getSupportLevel,
		stdout: translateLevel(supportsColor(true, tty.isatty(1))),
		stderr: translateLevel(supportsColor(true, tty.isatty(2)))
	};
	return supportsColor_1;
}

/**
 * Module dependencies.
 */

var hasRequiredNode;

function requireNode () {
	if (hasRequiredNode) return node.exports;
	hasRequiredNode = 1;
	(function (module, exports) {
		const tty = require$$1;
		const util = require$$1$1;

		/**
		 * This is the Node.js implementation of `debug()`.
		 */

		exports.init = init;
		exports.log = log;
		exports.formatArgs = formatArgs;
		exports.save = save;
		exports.load = load;
		exports.useColors = useColors;
		exports.destroy = util.deprecate(
			() => {},
			'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
		);

		/**
		 * Colors.
		 */

		exports.colors = [6, 2, 3, 4, 5, 1];

		try {
			// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
			// eslint-disable-next-line import/no-extraneous-dependencies
			const supportsColor = requireSupportsColor();

			if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
				exports.colors = [
					20,
					21,
					26,
					27,
					32,
					33,
					38,
					39,
					40,
					41,
					42,
					43,
					44,
					45,
					56,
					57,
					62,
					63,
					68,
					69,
					74,
					75,
					76,
					77,
					78,
					79,
					80,
					81,
					92,
					93,
					98,
					99,
					112,
					113,
					128,
					129,
					134,
					135,
					148,
					149,
					160,
					161,
					162,
					163,
					164,
					165,
					166,
					167,
					168,
					169,
					170,
					171,
					172,
					173,
					178,
					179,
					184,
					185,
					196,
					197,
					198,
					199,
					200,
					201,
					202,
					203,
					204,
					205,
					206,
					207,
					208,
					209,
					214,
					215,
					220,
					221
				];
			}
		} catch (error) {
			// Swallow - we only care if `supports-color` is available; it doesn't have to be.
		}

		/**
		 * Build up the default `inspectOpts` object from the environment variables.
		 *
		 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
		 */

		exports.inspectOpts = Object.keys(process.env).filter(key => {
			return /^debug_/i.test(key);
		}).reduce((obj, key) => {
			// Camel-case
			const prop = key
				.substring(6)
				.toLowerCase()
				.replace(/_([a-z])/g, (_, k) => {
					return k.toUpperCase();
				});

			// Coerce string value into JS value
			let val = process.env[key];
			if (/^(yes|on|true|enabled)$/i.test(val)) {
				val = true;
			} else if (/^(no|off|false|disabled)$/i.test(val)) {
				val = false;
			} else if (val === 'null') {
				val = null;
			} else {
				val = Number(val);
			}

			obj[prop] = val;
			return obj;
		}, {});

		/**
		 * Is stdout a TTY? Colored output is enabled when `true`.
		 */

		function useColors() {
			return 'colors' in exports.inspectOpts ?
				Boolean(exports.inspectOpts.colors) :
				tty.isatty(process.stderr.fd);
		}

		/**
		 * Adds ANSI color escape codes if enabled.
		 *
		 * @api public
		 */

		function formatArgs(args) {
			const {namespace: name, useColors} = this;

			if (useColors) {
				const c = this.color;
				const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
				const prefix = `  ${colorCode};1m${name} \u001B[0m`;

				args[0] = prefix + args[0].split('\n').join('\n' + prefix);
				args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
			} else {
				args[0] = getDate() + name + ' ' + args[0];
			}
		}

		function getDate() {
			if (exports.inspectOpts.hideDate) {
				return '';
			}
			return new Date().toISOString() + ' ';
		}

		/**
		 * Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
		 */

		function log(...args) {
			return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + '\n');
		}

		/**
		 * Save `namespaces`.
		 *
		 * @param {String} namespaces
		 * @api private
		 */
		function save(namespaces) {
			if (namespaces) {
				process.env.DEBUG = namespaces;
			} else {
				// If you set a process.env field to null or undefined, it gets cast to the
				// string 'null' or 'undefined'. Just delete instead.
				delete process.env.DEBUG;
			}
		}

		/**
		 * Load `namespaces`.
		 *
		 * @return {String} returns the previously persisted debug modes
		 * @api private
		 */

		function load() {
			return process.env.DEBUG;
		}

		/**
		 * Init logic for `debug` instances.
		 *
		 * Create a new `inspectOpts` object in case `useColors` is set
		 * differently for a particular `debug` instance.
		 */

		function init(debug) {
			debug.inspectOpts = {};

			const keys = Object.keys(exports.inspectOpts);
			for (let i = 0; i < keys.length; i++) {
				debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
			}
		}

		module.exports = requireCommon()(exports);

		const {formatters} = module.exports;

		/**
		 * Map %o to `util.inspect()`, all on a single line.
		 */

		formatters.o = function (v) {
			this.inspectOpts.colors = this.useColors;
			return util.inspect(v, this.inspectOpts)
				.split('\n')
				.map(str => str.trim())
				.join(' ');
		};

		/**
		 * Map %O to `util.inspect()`, allowing multiple lines if needed.
		 */

		formatters.O = function (v) {
			this.inspectOpts.colors = this.useColors;
			return util.inspect(v, this.inspectOpts);
		}; 
	} (node, node.exports));
	return node.exports;
}

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

var hasRequiredSrc;

function requireSrc () {
	if (hasRequiredSrc) return src.exports;
	hasRequiredSrc = 1;
	if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
		src.exports = requireBrowser();
	} else {
		src.exports = requireNode();
	}
	return src.exports;
}

/*!
 * encodeurl
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */

var encodeurl;
var hasRequiredEncodeurl;

function requireEncodeurl () {
	if (hasRequiredEncodeurl) return encodeurl;
	hasRequiredEncodeurl = 1;

	/**
	 * Module exports.
	 * @public
	 */

	encodeurl = encodeUrl;

	/**
	 * RegExp to match non-URL code points, *after* encoding (i.e. not including "%")
	 * and including invalid escape sequences.
	 * @private
	 */

	var ENCODE_CHARS_REGEXP = /(?:[^\x21\x23-\x3B\x3D\x3F-\x5F\x61-\x7A\x7C\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]|$))+/g;

	/**
	 * RegExp to match unmatched surrogate pair.
	 * @private
	 */

	var UNMATCHED_SURROGATE_PAIR_REGEXP = /(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g;

	/**
	 * String to replace unmatched surrogate pair with.
	 * @private
	 */

	var UNMATCHED_SURROGATE_PAIR_REPLACE = '$1\uFFFD$2';

	/**
	 * Encode a URL to a percent-encoded form, excluding already-encoded sequences.
	 *
	 * This function will take an already-encoded URL and encode all the non-URL
	 * code points. This function will not encode the "%" character unless it is
	 * not part of a valid sequence (`%20` will be left as-is, but `%foo` will
	 * be encoded as `%25foo`).
	 *
	 * This encode is meant to be "safe" and does not throw errors. It will try as
	 * hard as it can to properly encode the given URL, including replacing any raw,
	 * unpaired surrogate pairs with the Unicode replacement character prior to
	 * encoding.
	 *
	 * @param {string} url
	 * @return {string}
	 * @public
	 */

	function encodeUrl (url) {
	  return String(url)
	    .replace(UNMATCHED_SURROGATE_PAIR_REGEXP, UNMATCHED_SURROGATE_PAIR_REPLACE)
	    .replace(ENCODE_CHARS_REGEXP, encodeURI)
	}
	return encodeurl;
}

/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */

var escapeHtml_1;
var hasRequiredEscapeHtml;

function requireEscapeHtml () {
	if (hasRequiredEscapeHtml) return escapeHtml_1;
	hasRequiredEscapeHtml = 1;

	/**
	 * Module variables.
	 * @private
	 */

	var matchHtmlRegExp = /["'&<>]/;

	/**
	 * Module exports.
	 * @public
	 */

	escapeHtml_1 = escapeHtml;

	/**
	 * Escape special characters in the given string of html.
	 *
	 * @param  {string} string The string to escape for inserting into HTML
	 * @return {string}
	 * @public
	 */

	function escapeHtml(string) {
	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);

	  if (!match) {
	    return str;
	  }

	  var escape;
	  var html = '';
	  var index = 0;
	  var lastIndex = 0;

	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34: // "
	        escape = '&quot;';
	        break;
	      case 38: // &
	        escape = '&amp;';
	        break;
	      case 39: // '
	        escape = '&#39;';
	        break;
	      case 60: // <
	        escape = '&lt;';
	        break;
	      case 62: // >
	        escape = '&gt;';
	        break;
	      default:
	        continue;
	    }

	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }

	    lastIndex = index + 1;
	    html += escape;
	  }

	  return lastIndex !== index
	    ? html + str.substring(lastIndex, index)
	    : html;
	}
	return escapeHtml_1;
}

/*!
 * etag
 * Copyright(c) 2014-2016 Douglas Christopher Wilson
 * MIT Licensed
 */

var etag_1;
var hasRequiredEtag;

function requireEtag () {
	if (hasRequiredEtag) return etag_1;
	hasRequiredEtag = 1;

	/**
	 * Module exports.
	 * @public
	 */

	etag_1 = etag;

	/**
	 * Module dependencies.
	 * @private
	 */

	var crypto = require$$0$4;
	var Stats = require$$1$2.Stats;

	/**
	 * Module variables.
	 * @private
	 */

	var toString = Object.prototype.toString;

	/**
	 * Generate an entity tag.
	 *
	 * @param {Buffer|string} entity
	 * @return {string}
	 * @private
	 */

	function entitytag (entity) {
	  if (entity.length === 0) {
	    // fast-path empty
	    return '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"'
	  }

	  // compute hash of entity
	  var hash = crypto
	    .createHash('sha1')
	    .update(entity, 'utf8')
	    .digest('base64')
	    .substring(0, 27);

	  // compute length of entity
	  var len = typeof entity === 'string'
	    ? Buffer.byteLength(entity, 'utf8')
	    : entity.length;

	  return '"' + len.toString(16) + '-' + hash + '"'
	}

	/**
	 * Create a simple ETag.
	 *
	 * @param {string|Buffer|Stats} entity
	 * @param {object} [options]
	 * @param {boolean} [options.weak]
	 * @return {String}
	 * @public
	 */

	function etag (entity, options) {
	  if (entity == null) {
	    throw new TypeError('argument entity is required')
	  }

	  // support fs.Stats object
	  var isStats = isstats(entity);
	  var weak = options && typeof options.weak === 'boolean'
	    ? options.weak
	    : isStats;

	  // validate argument
	  if (!isStats && typeof entity !== 'string' && !Buffer.isBuffer(entity)) {
	    throw new TypeError('argument entity must be string, Buffer, or fs.Stats')
	  }

	  // generate entity tag
	  var tag = isStats
	    ? stattag(entity)
	    : entitytag(entity);

	  return weak
	    ? 'W/' + tag
	    : tag
	}

	/**
	 * Determine if object is a Stats object.
	 *
	 * @param {object} obj
	 * @return {boolean}
	 * @api private
	 */

	function isstats (obj) {
	  // genuine fs.Stats
	  if (typeof Stats === 'function' && obj instanceof Stats) {
	    return true
	  }

	  // quack quack
	  return obj && typeof obj === 'object' &&
	    'ctime' in obj && toString.call(obj.ctime) === '[object Date]' &&
	    'mtime' in obj && toString.call(obj.mtime) === '[object Date]' &&
	    'ino' in obj && typeof obj.ino === 'number' &&
	    'size' in obj && typeof obj.size === 'number'
	}

	/**
	 * Generate a tag for a stat.
	 *
	 * @param {object} stat
	 * @return {string}
	 * @private
	 */

	function stattag (stat) {
	  var mtime = stat.mtime.getTime().toString(16);
	  var size = stat.size.toString(16);

	  return '"' + size + '-' + mtime + '"'
	}
	return etag_1;
}

/*!
 * fresh
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2016-2017 Douglas Christopher Wilson
 * MIT Licensed
 */

var fresh_1;
var hasRequiredFresh;

function requireFresh () {
	if (hasRequiredFresh) return fresh_1;
	hasRequiredFresh = 1;

	/**
	 * RegExp to check for no-cache token in Cache-Control.
	 * @private
	 */

	var CACHE_CONTROL_NO_CACHE_REGEXP = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;

	/**
	 * Module exports.
	 * @public
	 */

	fresh_1 = fresh;

	/**
	 * Check freshness of the response using request and response headers.
	 *
	 * @param {Object} reqHeaders
	 * @param {Object} resHeaders
	 * @return {Boolean}
	 * @public
	 */

	function fresh (reqHeaders, resHeaders) {
	  // fields
	  var modifiedSince = reqHeaders['if-modified-since'];
	  var noneMatch = reqHeaders['if-none-match'];

	  // unconditional request
	  if (!modifiedSince && !noneMatch) {
	    return false
	  }

	  // Always return stale when Cache-Control: no-cache
	  // to support end-to-end reload requests
	  // https://tools.ietf.org/html/rfc2616#section-14.9.4
	  var cacheControl = reqHeaders['cache-control'];
	  if (cacheControl && CACHE_CONTROL_NO_CACHE_REGEXP.test(cacheControl)) {
	    return false
	  }

	  // if-none-match takes precedent over if-modified-since
	  if (noneMatch) {
	    if (noneMatch === '*') {
	      return true
	    }
	    var etag = resHeaders.etag;

	    if (!etag) {
	      return false
	    }

	    var matches = parseTokenList(noneMatch);
	    for (var i = 0; i < matches.length; i++) {
	      var match = matches[i];
	      if (match === etag || match === 'W/' + etag || 'W/' + match === etag) {
	        return true
	      }
	    }

	    return false
	  }

	  // if-modified-since
	  if (modifiedSince) {
	    var lastModified = resHeaders['last-modified'];
	    var modifiedStale = !lastModified || !(parseHttpDate(lastModified) <= parseHttpDate(modifiedSince));

	    if (modifiedStale) {
	      return false
	    }
	  }

	  return true
	}

	/**
	 * Parse an HTTP Date into a number.
	 *
	 * @param {string} date
	 * @private
	 */

	function parseHttpDate (date) {
	  var timestamp = date && Date.parse(date);

	  // istanbul ignore next: guard against date.js Date.parse patching
	  return typeof timestamp === 'number'
	    ? timestamp
	    : NaN
	}

	/**
	 * Parse a HTTP token list.
	 *
	 * @param {string} str
	 * @private
	 */

	function parseTokenList (str) {
	  var end = 0;
	  var list = [];
	  var start = 0;

	  // gather tokens
	  for (var i = 0, len = str.length; i < len; i++) {
	    switch (str.charCodeAt(i)) {
	      case 0x20: /*   */
	        if (start === end) {
	          start = end = i + 1;
	        }
	        break
	      case 0x2c: /* , */
	        list.push(str.substring(start, end));
	        start = end = i + 1;
	        break
	      default:
	        end = i + 1;
	        break
	    }
	  }

	  // final token
	  list.push(str.substring(start, end));

	  return list
	}
	return fresh_1;
}

var mimeTypes = {};

const require$$0 = {
  "application/1d-interleaved-parityfec": {"source":"iana"},
  "application/3gpdash-qoe-report+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/3gpp-ims+xml": {"source":"iana","compressible":true},
  "application/3gpphal+json": {"source":"iana","compressible":true},
  "application/3gpphalforms+json": {"source":"iana","compressible":true},
  "application/a2l": {"source":"iana"},
  "application/ace+cbor": {"source":"iana"},
  "application/ace+json": {"source":"iana","compressible":true},
  "application/ace-groupcomm+cbor": {"source":"iana"},
  "application/ace-trl+cbor": {"source":"iana"},
  "application/activemessage": {"source":"iana"},
  "application/activity+json": {"source":"iana","compressible":true},
  "application/aif+cbor": {"source":"iana"},
  "application/aif+json": {"source":"iana","compressible":true},
  "application/alto-cdni+json": {"source":"iana","compressible":true},
  "application/alto-cdnifilter+json": {"source":"iana","compressible":true},
  "application/alto-costmap+json": {"source":"iana","compressible":true},
  "application/alto-costmapfilter+json": {"source":"iana","compressible":true},
  "application/alto-directory+json": {"source":"iana","compressible":true},
  "application/alto-endpointcost+json": {"source":"iana","compressible":true},
  "application/alto-endpointcostparams+json": {"source":"iana","compressible":true},
  "application/alto-endpointprop+json": {"source":"iana","compressible":true},
  "application/alto-endpointpropparams+json": {"source":"iana","compressible":true},
  "application/alto-error+json": {"source":"iana","compressible":true},
  "application/alto-networkmap+json": {"source":"iana","compressible":true},
  "application/alto-networkmapfilter+json": {"source":"iana","compressible":true},
  "application/alto-propmap+json": {"source":"iana","compressible":true},
  "application/alto-propmapparams+json": {"source":"iana","compressible":true},
  "application/alto-tips+json": {"source":"iana","compressible":true},
  "application/alto-tipsparams+json": {"source":"iana","compressible":true},
  "application/alto-updatestreamcontrol+json": {"source":"iana","compressible":true},
  "application/alto-updatestreamparams+json": {"source":"iana","compressible":true},
  "application/aml": {"source":"iana"},
  "application/andrew-inset": {"source":"iana","extensions":["ez"]},
  "application/appinstaller": {"compressible":false,"extensions":["appinstaller"]},
  "application/applefile": {"source":"iana"},
  "application/applixware": {"source":"apache","extensions":["aw"]},
  "application/appx": {"compressible":false,"extensions":["appx"]},
  "application/appxbundle": {"compressible":false,"extensions":["appxbundle"]},
  "application/at+jwt": {"source":"iana"},
  "application/atf": {"source":"iana"},
  "application/atfx": {"source":"iana"},
  "application/atom+xml": {"source":"iana","compressible":true,"extensions":["atom"]},
  "application/atomcat+xml": {"source":"iana","compressible":true,"extensions":["atomcat"]},
  "application/atomdeleted+xml": {"source":"iana","compressible":true,"extensions":["atomdeleted"]},
  "application/atomicmail": {"source":"iana"},
  "application/atomsvc+xml": {"source":"iana","compressible":true,"extensions":["atomsvc"]},
  "application/atsc-dwd+xml": {"source":"iana","compressible":true,"extensions":["dwd"]},
  "application/atsc-dynamic-event-message": {"source":"iana"},
  "application/atsc-held+xml": {"source":"iana","compressible":true,"extensions":["held"]},
  "application/atsc-rdt+json": {"source":"iana","compressible":true},
  "application/atsc-rsat+xml": {"source":"iana","compressible":true,"extensions":["rsat"]},
  "application/atxml": {"source":"iana"},
  "application/auth-policy+xml": {"source":"iana","compressible":true},
  "application/automationml-aml+xml": {"source":"iana","compressible":true,"extensions":["aml"]},
  "application/automationml-amlx+zip": {"source":"iana","compressible":false,"extensions":["amlx"]},
  "application/bacnet-xdd+zip": {"source":"iana","compressible":false},
  "application/batch-smtp": {"source":"iana"},
  "application/bdoc": {"compressible":false,"extensions":["bdoc"]},
  "application/beep+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/bufr": {"source":"iana"},
  "application/c2pa": {"source":"iana"},
  "application/calendar+json": {"source":"iana","compressible":true},
  "application/calendar+xml": {"source":"iana","compressible":true,"extensions":["xcs"]},
  "application/call-completion": {"source":"iana"},
  "application/cals-1840": {"source":"iana"},
  "application/captive+json": {"source":"iana","compressible":true},
  "application/cbor": {"source":"iana"},
  "application/cbor-seq": {"source":"iana"},
  "application/cccex": {"source":"iana"},
  "application/ccmp+xml": {"source":"iana","compressible":true},
  "application/ccxml+xml": {"source":"iana","compressible":true,"extensions":["ccxml"]},
  "application/cda+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/cdfx+xml": {"source":"iana","compressible":true,"extensions":["cdfx"]},
  "application/cdmi-capability": {"source":"iana","extensions":["cdmia"]},
  "application/cdmi-container": {"source":"iana","extensions":["cdmic"]},
  "application/cdmi-domain": {"source":"iana","extensions":["cdmid"]},
  "application/cdmi-object": {"source":"iana","extensions":["cdmio"]},
  "application/cdmi-queue": {"source":"iana","extensions":["cdmiq"]},
  "application/cdni": {"source":"iana"},
  "application/ce+cbor": {"source":"iana"},
  "application/cea": {"source":"iana"},
  "application/cea-2018+xml": {"source":"iana","compressible":true},
  "application/cellml+xml": {"source":"iana","compressible":true},
  "application/cfw": {"source":"iana"},
  "application/cid-edhoc+cbor-seq": {"source":"iana"},
  "application/city+json": {"source":"iana","compressible":true},
  "application/city+json-seq": {"source":"iana"},
  "application/clr": {"source":"iana"},
  "application/clue+xml": {"source":"iana","compressible":true},
  "application/clue_info+xml": {"source":"iana","compressible":true},
  "application/cms": {"source":"iana"},
  "application/cnrp+xml": {"source":"iana","compressible":true},
  "application/coap-eap": {"source":"iana"},
  "application/coap-group+json": {"source":"iana","compressible":true},
  "application/coap-payload": {"source":"iana"},
  "application/commonground": {"source":"iana"},
  "application/concise-problem-details+cbor": {"source":"iana"},
  "application/conference-info+xml": {"source":"iana","compressible":true},
  "application/cose": {"source":"iana"},
  "application/cose-key": {"source":"iana"},
  "application/cose-key-set": {"source":"iana"},
  "application/cose-x509": {"source":"iana"},
  "application/cpl+xml": {"source":"iana","compressible":true,"extensions":["cpl"]},
  "application/csrattrs": {"source":"iana"},
  "application/csta+xml": {"source":"iana","compressible":true},
  "application/cstadata+xml": {"source":"iana","compressible":true},
  "application/csvm+json": {"source":"iana","compressible":true},
  "application/cu-seeme": {"source":"apache","extensions":["cu"]},
  "application/cwl": {"source":"iana","extensions":["cwl"]},
  "application/cwl+json": {"source":"iana","compressible":true},
  "application/cwl+yaml": {"source":"iana"},
  "application/cwt": {"source":"iana"},
  "application/cybercash": {"source":"iana"},
  "application/dart": {"compressible":true},
  "application/dash+xml": {"source":"iana","compressible":true,"extensions":["mpd"]},
  "application/dash-patch+xml": {"source":"iana","compressible":true,"extensions":["mpp"]},
  "application/dashdelta": {"source":"iana"},
  "application/davmount+xml": {"source":"iana","compressible":true,"extensions":["davmount"]},
  "application/dca-rft": {"source":"iana"},
  "application/dcd": {"source":"iana"},
  "application/dec-dx": {"source":"iana"},
  "application/dialog-info+xml": {"source":"iana","compressible":true},
  "application/dicom": {"source":"iana","extensions":["dcm"]},
  "application/dicom+json": {"source":"iana","compressible":true},
  "application/dicom+xml": {"source":"iana","compressible":true},
  "application/dii": {"source":"iana"},
  "application/dit": {"source":"iana"},
  "application/dns": {"source":"iana"},
  "application/dns+json": {"source":"iana","compressible":true},
  "application/dns-message": {"source":"iana"},
  "application/docbook+xml": {"source":"apache","compressible":true,"extensions":["dbk"]},
  "application/dots+cbor": {"source":"iana"},
  "application/dpop+jwt": {"source":"iana"},
  "application/dskpp+xml": {"source":"iana","compressible":true},
  "application/dssc+der": {"source":"iana","extensions":["dssc"]},
  "application/dssc+xml": {"source":"iana","compressible":true,"extensions":["xdssc"]},
  "application/dvcs": {"source":"iana"},
  "application/eat+cwt": {"source":"iana"},
  "application/eat+jwt": {"source":"iana"},
  "application/eat-bun+cbor": {"source":"iana"},
  "application/eat-bun+json": {"source":"iana","compressible":true},
  "application/eat-ucs+cbor": {"source":"iana"},
  "application/eat-ucs+json": {"source":"iana","compressible":true},
  "application/ecmascript": {"source":"apache","compressible":true,"extensions":["ecma"]},
  "application/edhoc+cbor-seq": {"source":"iana"},
  "application/edi-consent": {"source":"iana"},
  "application/edi-x12": {"source":"iana","compressible":false},
  "application/edifact": {"source":"iana","compressible":false},
  "application/efi": {"source":"iana"},
  "application/elm+json": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/elm+xml": {"source":"iana","compressible":true},
  "application/emergencycalldata.cap+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/emergencycalldata.comment+xml": {"source":"iana","compressible":true},
  "application/emergencycalldata.control+xml": {"source":"iana","compressible":true},
  "application/emergencycalldata.deviceinfo+xml": {"source":"iana","compressible":true},
  "application/emergencycalldata.ecall.msd": {"source":"iana"},
  "application/emergencycalldata.legacyesn+json": {"source":"iana","compressible":true},
  "application/emergencycalldata.providerinfo+xml": {"source":"iana","compressible":true},
  "application/emergencycalldata.serviceinfo+xml": {"source":"iana","compressible":true},
  "application/emergencycalldata.subscriberinfo+xml": {"source":"iana","compressible":true},
  "application/emergencycalldata.veds+xml": {"source":"iana","compressible":true},
  "application/emma+xml": {"source":"iana","compressible":true,"extensions":["emma"]},
  "application/emotionml+xml": {"source":"iana","compressible":true,"extensions":["emotionml"]},
  "application/encaprtp": {"source":"iana"},
  "application/entity-statement+jwt": {"source":"iana"},
  "application/epp+xml": {"source":"iana","compressible":true},
  "application/epub+zip": {"source":"iana","compressible":false,"extensions":["epub"]},
  "application/eshop": {"source":"iana"},
  "application/exi": {"source":"iana","extensions":["exi"]},
  "application/expect-ct-report+json": {"source":"iana","compressible":true},
  "application/express": {"source":"iana","extensions":["exp"]},
  "application/fastinfoset": {"source":"iana"},
  "application/fastsoap": {"source":"iana"},
  "application/fdf": {"source":"iana","extensions":["fdf"]},
  "application/fdt+xml": {"source":"iana","compressible":true,"extensions":["fdt"]},
  "application/fhir+json": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/fhir+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/fido.trusted-apps+json": {"compressible":true},
  "application/fits": {"source":"iana"},
  "application/flexfec": {"source":"iana"},
  "application/font-sfnt": {"source":"iana"},
  "application/font-tdpfr": {"source":"iana","extensions":["pfr"]},
  "application/font-woff": {"source":"iana","compressible":false},
  "application/framework-attributes+xml": {"source":"iana","compressible":true},
  "application/geo+json": {"source":"iana","compressible":true,"extensions":["geojson"]},
  "application/geo+json-seq": {"source":"iana"},
  "application/geopackage+sqlite3": {"source":"iana"},
  "application/geopose+json": {"source":"iana","compressible":true},
  "application/geoxacml+json": {"source":"iana","compressible":true},
  "application/geoxacml+xml": {"source":"iana","compressible":true},
  "application/gltf-buffer": {"source":"iana"},
  "application/gml+xml": {"source":"iana","compressible":true,"extensions":["gml"]},
  "application/gnap-binding-jws": {"source":"iana"},
  "application/gnap-binding-jwsd": {"source":"iana"},
  "application/gnap-binding-rotation-jws": {"source":"iana"},
  "application/gnap-binding-rotation-jwsd": {"source":"iana"},
  "application/gpx+xml": {"source":"apache","compressible":true,"extensions":["gpx"]},
  "application/grib": {"source":"iana"},
  "application/gxf": {"source":"apache","extensions":["gxf"]},
  "application/gzip": {"source":"iana","compressible":false,"extensions":["gz"]},
  "application/h224": {"source":"iana"},
  "application/held+xml": {"source":"iana","compressible":true},
  "application/hjson": {"extensions":["hjson"]},
  "application/hl7v2+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/http": {"source":"iana"},
  "application/hyperstudio": {"source":"iana","extensions":["stk"]},
  "application/ibe-key-request+xml": {"source":"iana","compressible":true},
  "application/ibe-pkg-reply+xml": {"source":"iana","compressible":true},
  "application/ibe-pp-data": {"source":"iana"},
  "application/iges": {"source":"iana"},
  "application/im-iscomposing+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/index": {"source":"iana"},
  "application/index.cmd": {"source":"iana"},
  "application/index.obj": {"source":"iana"},
  "application/index.response": {"source":"iana"},
  "application/index.vnd": {"source":"iana"},
  "application/inkml+xml": {"source":"iana","compressible":true,"extensions":["ink","inkml"]},
  "application/iotp": {"source":"iana"},
  "application/ipfix": {"source":"iana","extensions":["ipfix"]},
  "application/ipp": {"source":"iana"},
  "application/isup": {"source":"iana"},
  "application/its+xml": {"source":"iana","compressible":true,"extensions":["its"]},
  "application/java-archive": {"source":"iana","compressible":false,"extensions":["jar","war","ear"]},
  "application/java-serialized-object": {"source":"apache","compressible":false,"extensions":["ser"]},
  "application/java-vm": {"source":"apache","compressible":false,"extensions":["class"]},
  "application/javascript": {"source":"apache","charset":"UTF-8","compressible":true,"extensions":["js"]},
  "application/jf2feed+json": {"source":"iana","compressible":true},
  "application/jose": {"source":"iana"},
  "application/jose+json": {"source":"iana","compressible":true},
  "application/jrd+json": {"source":"iana","compressible":true},
  "application/jscalendar+json": {"source":"iana","compressible":true},
  "application/jscontact+json": {"source":"iana","compressible":true},
  "application/json": {"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},
  "application/json-patch+json": {"source":"iana","compressible":true},
  "application/json-seq": {"source":"iana"},
  "application/json5": {"extensions":["json5"]},
  "application/jsonml+json": {"source":"apache","compressible":true,"extensions":["jsonml"]},
  "application/jsonpath": {"source":"iana"},
  "application/jwk+json": {"source":"iana","compressible":true},
  "application/jwk-set+json": {"source":"iana","compressible":true},
  "application/jwk-set+jwt": {"source":"iana"},
  "application/jwt": {"source":"iana"},
  "application/kpml-request+xml": {"source":"iana","compressible":true},
  "application/kpml-response+xml": {"source":"iana","compressible":true},
  "application/ld+json": {"source":"iana","compressible":true,"extensions":["jsonld"]},
  "application/lgr+xml": {"source":"iana","compressible":true,"extensions":["lgr"]},
  "application/link-format": {"source":"iana"},
  "application/linkset": {"source":"iana"},
  "application/linkset+json": {"source":"iana","compressible":true},
  "application/load-control+xml": {"source":"iana","compressible":true},
  "application/logout+jwt": {"source":"iana"},
  "application/lost+xml": {"source":"iana","compressible":true,"extensions":["lostxml"]},
  "application/lostsync+xml": {"source":"iana","compressible":true},
  "application/lpf+zip": {"source":"iana","compressible":false},
  "application/lxf": {"source":"iana"},
  "application/mac-binhex40": {"source":"iana","extensions":["hqx"]},
  "application/mac-compactpro": {"source":"apache","extensions":["cpt"]},
  "application/macwriteii": {"source":"iana"},
  "application/mads+xml": {"source":"iana","compressible":true,"extensions":["mads"]},
  "application/manifest+json": {"source":"iana","charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},
  "application/marc": {"source":"iana","extensions":["mrc"]},
  "application/marcxml+xml": {"source":"iana","compressible":true,"extensions":["mrcx"]},
  "application/mathematica": {"source":"iana","extensions":["ma","nb","mb"]},
  "application/mathml+xml": {"source":"iana","compressible":true,"extensions":["mathml"]},
  "application/mathml-content+xml": {"source":"iana","compressible":true},
  "application/mathml-presentation+xml": {"source":"iana","compressible":true},
  "application/mbms-associated-procedure-description+xml": {"source":"iana","compressible":true},
  "application/mbms-deregister+xml": {"source":"iana","compressible":true},
  "application/mbms-envelope+xml": {"source":"iana","compressible":true},
  "application/mbms-msk+xml": {"source":"iana","compressible":true},
  "application/mbms-msk-response+xml": {"source":"iana","compressible":true},
  "application/mbms-protection-description+xml": {"source":"iana","compressible":true},
  "application/mbms-reception-report+xml": {"source":"iana","compressible":true},
  "application/mbms-register+xml": {"source":"iana","compressible":true},
  "application/mbms-register-response+xml": {"source":"iana","compressible":true},
  "application/mbms-schedule+xml": {"source":"iana","compressible":true},
  "application/mbms-user-service-description+xml": {"source":"iana","compressible":true},
  "application/mbox": {"source":"iana","extensions":["mbox"]},
  "application/media-policy-dataset+xml": {"source":"iana","compressible":true,"extensions":["mpf"]},
  "application/media_control+xml": {"source":"iana","compressible":true},
  "application/mediaservercontrol+xml": {"source":"iana","compressible":true,"extensions":["mscml"]},
  "application/merge-patch+json": {"source":"iana","compressible":true},
  "application/metalink+xml": {"source":"apache","compressible":true,"extensions":["metalink"]},
  "application/metalink4+xml": {"source":"iana","compressible":true,"extensions":["meta4"]},
  "application/mets+xml": {"source":"iana","compressible":true,"extensions":["mets"]},
  "application/mf4": {"source":"iana"},
  "application/mikey": {"source":"iana"},
  "application/mipc": {"source":"iana"},
  "application/missing-blocks+cbor-seq": {"source":"iana"},
  "application/mmt-aei+xml": {"source":"iana","compressible":true,"extensions":["maei"]},
  "application/mmt-usd+xml": {"source":"iana","compressible":true,"extensions":["musd"]},
  "application/mods+xml": {"source":"iana","compressible":true,"extensions":["mods"]},
  "application/moss-keys": {"source":"iana"},
  "application/moss-signature": {"source":"iana"},
  "application/mosskey-data": {"source":"iana"},
  "application/mosskey-request": {"source":"iana"},
  "application/mp21": {"source":"iana","extensions":["m21","mp21"]},
  "application/mp4": {"source":"iana","extensions":["mp4","mpg4","mp4s","m4p"]},
  "application/mpeg4-generic": {"source":"iana"},
  "application/mpeg4-iod": {"source":"iana"},
  "application/mpeg4-iod-xmt": {"source":"iana"},
  "application/mrb-consumer+xml": {"source":"iana","compressible":true},
  "application/mrb-publish+xml": {"source":"iana","compressible":true},
  "application/msc-ivr+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/msc-mixer+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/msix": {"compressible":false,"extensions":["msix"]},
  "application/msixbundle": {"compressible":false,"extensions":["msixbundle"]},
  "application/msword": {"source":"iana","compressible":false,"extensions":["doc","dot"]},
  "application/mud+json": {"source":"iana","compressible":true},
  "application/multipart-core": {"source":"iana"},
  "application/mxf": {"source":"iana","extensions":["mxf"]},
  "application/n-quads": {"source":"iana","extensions":["nq"]},
  "application/n-triples": {"source":"iana","extensions":["nt"]},
  "application/nasdata": {"source":"iana"},
  "application/news-checkgroups": {"source":"iana","charset":"US-ASCII"},
  "application/news-groupinfo": {"source":"iana","charset":"US-ASCII"},
  "application/news-transmission": {"source":"iana"},
  "application/nlsml+xml": {"source":"iana","compressible":true},
  "application/node": {"source":"iana","extensions":["cjs"]},
  "application/nss": {"source":"iana"},
  "application/oauth-authz-req+jwt": {"source":"iana"},
  "application/oblivious-dns-message": {"source":"iana"},
  "application/ocsp-request": {"source":"iana"},
  "application/ocsp-response": {"source":"iana"},
  "application/octet-stream": {"source":"iana","compressible":true,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},
  "application/oda": {"source":"iana","extensions":["oda"]},
  "application/odm+xml": {"source":"iana","compressible":true},
  "application/odx": {"source":"iana"},
  "application/oebps-package+xml": {"source":"iana","compressible":true,"extensions":["opf"]},
  "application/ogg": {"source":"iana","compressible":false,"extensions":["ogx"]},
  "application/ohttp-keys": {"source":"iana"},
  "application/omdoc+xml": {"source":"apache","compressible":true,"extensions":["omdoc"]},
  "application/onenote": {"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg","one","onea"]},
  "application/opc-nodeset+xml": {"source":"iana","compressible":true},
  "application/oscore": {"source":"iana"},
  "application/oxps": {"source":"iana","extensions":["oxps"]},
  "application/p21": {"source":"iana"},
  "application/p21+zip": {"source":"iana","compressible":false},
  "application/p2p-overlay+xml": {"source":"iana","compressible":true,"extensions":["relo"]},
  "application/parityfec": {"source":"iana"},
  "application/passport": {"source":"iana"},
  "application/patch-ops-error+xml": {"source":"iana","compressible":true,"extensions":["xer"]},
  "application/pdf": {"source":"iana","compressible":false,"extensions":["pdf"]},
  "application/pdx": {"source":"iana"},
  "application/pem-certificate-chain": {"source":"iana"},
  "application/pgp-encrypted": {"source":"iana","compressible":false,"extensions":["pgp"]},
  "application/pgp-keys": {"source":"iana","extensions":["asc"]},
  "application/pgp-signature": {"source":"iana","extensions":["sig","asc"]},
  "application/pics-rules": {"source":"apache","extensions":["prf"]},
  "application/pidf+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/pidf-diff+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/pkcs10": {"source":"iana","extensions":["p10"]},
  "application/pkcs12": {"source":"iana"},
  "application/pkcs7-mime": {"source":"iana","extensions":["p7m","p7c"]},
  "application/pkcs7-signature": {"source":"iana","extensions":["p7s"]},
  "application/pkcs8": {"source":"iana","extensions":["p8"]},
  "application/pkcs8-encrypted": {"source":"iana"},
  "application/pkix-attr-cert": {"source":"iana","extensions":["ac"]},
  "application/pkix-cert": {"source":"iana","extensions":["cer"]},
  "application/pkix-crl": {"source":"iana","extensions":["crl"]},
  "application/pkix-pkipath": {"source":"iana","extensions":["pkipath"]},
  "application/pkixcmp": {"source":"iana","extensions":["pki"]},
  "application/pls+xml": {"source":"iana","compressible":true,"extensions":["pls"]},
  "application/poc-settings+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/postscript": {"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},
  "application/ppsp-tracker+json": {"source":"iana","compressible":true},
  "application/private-token-issuer-directory": {"source":"iana"},
  "application/private-token-request": {"source":"iana"},
  "application/private-token-response": {"source":"iana"},
  "application/problem+json": {"source":"iana","compressible":true},
  "application/problem+xml": {"source":"iana","compressible":true},
  "application/provenance+xml": {"source":"iana","compressible":true,"extensions":["provx"]},
  "application/provided-claims+jwt": {"source":"iana"},
  "application/prs.alvestrand.titrax-sheet": {"source":"iana"},
  "application/prs.cww": {"source":"iana","extensions":["cww"]},
  "application/prs.cyn": {"source":"iana","charset":"7-BIT"},
  "application/prs.hpub+zip": {"source":"iana","compressible":false},
  "application/prs.implied-document+xml": {"source":"iana","compressible":true},
  "application/prs.implied-executable": {"source":"iana"},
  "application/prs.implied-object+json": {"source":"iana","compressible":true},
  "application/prs.implied-object+json-seq": {"source":"iana"},
  "application/prs.implied-object+yaml": {"source":"iana"},
  "application/prs.implied-structure": {"source":"iana"},
  "application/prs.mayfile": {"source":"iana"},
  "application/prs.nprend": {"source":"iana"},
  "application/prs.plucker": {"source":"iana"},
  "application/prs.rdf-xml-crypt": {"source":"iana"},
  "application/prs.vcfbzip2": {"source":"iana"},
  "application/prs.xsf+xml": {"source":"iana","compressible":true,"extensions":["xsf"]},
  "application/pskc+xml": {"source":"iana","compressible":true,"extensions":["pskcxml"]},
  "application/pvd+json": {"source":"iana","compressible":true},
  "application/qsig": {"source":"iana"},
  "application/raml+yaml": {"compressible":true,"extensions":["raml"]},
  "application/raptorfec": {"source":"iana"},
  "application/rdap+json": {"source":"iana","compressible":true},
  "application/rdf+xml": {"source":"iana","compressible":true,"extensions":["rdf","owl"]},
  "application/reginfo+xml": {"source":"iana","compressible":true,"extensions":["rif"]},
  "application/relax-ng-compact-syntax": {"source":"iana","extensions":["rnc"]},
  "application/remote-printing": {"source":"apache"},
  "application/reputon+json": {"source":"iana","compressible":true},
  "application/resolve-response+jwt": {"source":"iana"},
  "application/resource-lists+xml": {"source":"iana","compressible":true,"extensions":["rl"]},
  "application/resource-lists-diff+xml": {"source":"iana","compressible":true,"extensions":["rld"]},
  "application/rfc+xml": {"source":"iana","compressible":true},
  "application/riscos": {"source":"iana"},
  "application/rlmi+xml": {"source":"iana","compressible":true},
  "application/rls-services+xml": {"source":"iana","compressible":true,"extensions":["rs"]},
  "application/route-apd+xml": {"source":"iana","compressible":true,"extensions":["rapd"]},
  "application/route-s-tsid+xml": {"source":"iana","compressible":true,"extensions":["sls"]},
  "application/route-usd+xml": {"source":"iana","compressible":true,"extensions":["rusd"]},
  "application/rpki-checklist": {"source":"iana"},
  "application/rpki-ghostbusters": {"source":"iana","extensions":["gbr"]},
  "application/rpki-manifest": {"source":"iana","extensions":["mft"]},
  "application/rpki-publication": {"source":"iana"},
  "application/rpki-roa": {"source":"iana","extensions":["roa"]},
  "application/rpki-signed-tal": {"source":"iana"},
  "application/rpki-updown": {"source":"iana"},
  "application/rsd+xml": {"source":"apache","compressible":true,"extensions":["rsd"]},
  "application/rss+xml": {"source":"apache","compressible":true,"extensions":["rss"]},
  "application/rtf": {"source":"iana","compressible":true,"extensions":["rtf"]},
  "application/rtploopback": {"source":"iana"},
  "application/rtx": {"source":"iana"},
  "application/samlassertion+xml": {"source":"iana","compressible":true},
  "application/samlmetadata+xml": {"source":"iana","compressible":true},
  "application/sarif+json": {"source":"iana","compressible":true},
  "application/sarif-external-properties+json": {"source":"iana","compressible":true},
  "application/sbe": {"source":"iana"},
  "application/sbml+xml": {"source":"iana","compressible":true,"extensions":["sbml"]},
  "application/scaip+xml": {"source":"iana","compressible":true},
  "application/scim+json": {"source":"iana","compressible":true},
  "application/scvp-cv-request": {"source":"iana","extensions":["scq"]},
  "application/scvp-cv-response": {"source":"iana","extensions":["scs"]},
  "application/scvp-vp-request": {"source":"iana","extensions":["spq"]},
  "application/scvp-vp-response": {"source":"iana","extensions":["spp"]},
  "application/sdp": {"source":"iana","extensions":["sdp"]},
  "application/secevent+jwt": {"source":"iana"},
  "application/senml+cbor": {"source":"iana"},
  "application/senml+json": {"source":"iana","compressible":true},
  "application/senml+xml": {"source":"iana","compressible":true,"extensions":["senmlx"]},
  "application/senml-etch+cbor": {"source":"iana"},
  "application/senml-etch+json": {"source":"iana","compressible":true},
  "application/senml-exi": {"source":"iana"},
  "application/sensml+cbor": {"source":"iana"},
  "application/sensml+json": {"source":"iana","compressible":true},
  "application/sensml+xml": {"source":"iana","compressible":true,"extensions":["sensmlx"]},
  "application/sensml-exi": {"source":"iana"},
  "application/sep+xml": {"source":"iana","compressible":true},
  "application/sep-exi": {"source":"iana"},
  "application/session-info": {"source":"iana"},
  "application/set-payment": {"source":"iana"},
  "application/set-payment-initiation": {"source":"iana","extensions":["setpay"]},
  "application/set-registration": {"source":"iana"},
  "application/set-registration-initiation": {"source":"iana","extensions":["setreg"]},
  "application/sgml": {"source":"iana"},
  "application/sgml-open-catalog": {"source":"iana"},
  "application/shf+xml": {"source":"iana","compressible":true,"extensions":["shf"]},
  "application/sieve": {"source":"iana","extensions":["siv","sieve"]},
  "application/simple-filter+xml": {"source":"iana","compressible":true},
  "application/simple-message-summary": {"source":"iana"},
  "application/simplesymbolcontainer": {"source":"iana"},
  "application/sipc": {"source":"iana"},
  "application/slate": {"source":"iana"},
  "application/smil": {"source":"apache"},
  "application/smil+xml": {"source":"iana","compressible":true,"extensions":["smi","smil"]},
  "application/smpte336m": {"source":"iana"},
  "application/soap+fastinfoset": {"source":"iana"},
  "application/soap+xml": {"source":"iana","compressible":true},
  "application/sparql-query": {"source":"iana","extensions":["rq"]},
  "application/sparql-results+xml": {"source":"iana","compressible":true,"extensions":["srx"]},
  "application/spdx+json": {"source":"iana","compressible":true},
  "application/spirits-event+xml": {"source":"iana","compressible":true},
  "application/sql": {"source":"iana","extensions":["sql"]},
  "application/srgs": {"source":"iana","extensions":["gram"]},
  "application/srgs+xml": {"source":"iana","compressible":true,"extensions":["grxml"]},
  "application/sru+xml": {"source":"iana","compressible":true,"extensions":["sru"]},
  "application/ssdl+xml": {"source":"apache","compressible":true,"extensions":["ssdl"]},
  "application/sslkeylogfile": {"source":"iana"},
  "application/ssml+xml": {"source":"iana","compressible":true,"extensions":["ssml"]},
  "application/st2110-41": {"source":"iana"},
  "application/stix+json": {"source":"iana","compressible":true},
  "application/stratum": {"source":"iana"},
  "application/swid+cbor": {"source":"iana"},
  "application/swid+xml": {"source":"iana","compressible":true,"extensions":["swidtag"]},
  "application/tamp-apex-update": {"source":"iana"},
  "application/tamp-apex-update-confirm": {"source":"iana"},
  "application/tamp-community-update": {"source":"iana"},
  "application/tamp-community-update-confirm": {"source":"iana"},
  "application/tamp-error": {"source":"iana"},
  "application/tamp-sequence-adjust": {"source":"iana"},
  "application/tamp-sequence-adjust-confirm": {"source":"iana"},
  "application/tamp-status-query": {"source":"iana"},
  "application/tamp-status-response": {"source":"iana"},
  "application/tamp-update": {"source":"iana"},
  "application/tamp-update-confirm": {"source":"iana"},
  "application/tar": {"compressible":true},
  "application/taxii+json": {"source":"iana","compressible":true},
  "application/td+json": {"source":"iana","compressible":true},
  "application/tei+xml": {"source":"iana","compressible":true,"extensions":["tei","teicorpus"]},
  "application/tetra_isi": {"source":"iana"},
  "application/thraud+xml": {"source":"iana","compressible":true,"extensions":["tfi"]},
  "application/timestamp-query": {"source":"iana"},
  "application/timestamp-reply": {"source":"iana"},
  "application/timestamped-data": {"source":"iana","extensions":["tsd"]},
  "application/tlsrpt+gzip": {"source":"iana"},
  "application/tlsrpt+json": {"source":"iana","compressible":true},
  "application/tm+json": {"source":"iana","compressible":true},
  "application/tnauthlist": {"source":"iana"},
  "application/toc+cbor": {"source":"iana"},
  "application/token-introspection+jwt": {"source":"iana"},
  "application/toml": {"source":"iana","compressible":true,"extensions":["toml"]},
  "application/trickle-ice-sdpfrag": {"source":"iana"},
  "application/trig": {"source":"iana","extensions":["trig"]},
  "application/trust-chain+json": {"source":"iana","compressible":true},
  "application/trust-mark+jwt": {"source":"iana"},
  "application/trust-mark-delegation+jwt": {"source":"iana"},
  "application/ttml+xml": {"source":"iana","compressible":true,"extensions":["ttml"]},
  "application/tve-trigger": {"source":"iana"},
  "application/tzif": {"source":"iana"},
  "application/tzif-leap": {"source":"iana"},
  "application/ubjson": {"compressible":false,"extensions":["ubj"]},
  "application/uccs+cbor": {"source":"iana"},
  "application/ujcs+json": {"source":"iana","compressible":true},
  "application/ulpfec": {"source":"iana"},
  "application/urc-grpsheet+xml": {"source":"iana","compressible":true},
  "application/urc-ressheet+xml": {"source":"iana","compressible":true,"extensions":["rsheet"]},
  "application/urc-targetdesc+xml": {"source":"iana","compressible":true,"extensions":["td"]},
  "application/urc-uisocketdesc+xml": {"source":"iana","compressible":true},
  "application/vc": {"source":"iana"},
  "application/vc+cose": {"source":"iana"},
  "application/vc+jwt": {"source":"iana"},
  "application/vcard+json": {"source":"iana","compressible":true},
  "application/vcard+xml": {"source":"iana","compressible":true},
  "application/vemmi": {"source":"iana"},
  "application/vividence.scriptfile": {"source":"apache"},
  "application/vnd.1000minds.decision-model+xml": {"source":"iana","compressible":true,"extensions":["1km"]},
  "application/vnd.1ob": {"source":"iana"},
  "application/vnd.3gpp-prose+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp-prose-pc3a+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp-prose-pc3ach+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp-prose-pc3ch+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp-prose-pc8+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp-v2x-local-service-information": {"source":"iana"},
  "application/vnd.3gpp.5gnas": {"source":"iana"},
  "application/vnd.3gpp.5gsa2x": {"source":"iana"},
  "application/vnd.3gpp.5gsa2x-local-service-information": {"source":"iana"},
  "application/vnd.3gpp.5gsv2x": {"source":"iana"},
  "application/vnd.3gpp.5gsv2x-local-service-information": {"source":"iana"},
  "application/vnd.3gpp.access-transfer-events+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.bsf+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.crs+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.current-location-discovery+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.gmop+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.gtpc": {"source":"iana"},
  "application/vnd.3gpp.interworking-data": {"source":"iana"},
  "application/vnd.3gpp.lpp": {"source":"iana"},
  "application/vnd.3gpp.mc-signalling-ear": {"source":"iana"},
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcdata-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcdata-msgstore-ctrl-request+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcdata-payload": {"source":"iana"},
  "application/vnd.3gpp.mcdata-regroup+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcdata-service-config+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcdata-signalling": {"source":"iana"},
  "application/vnd.3gpp.mcdata-ue-config+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcdata-user-profile+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcptt-floor-request+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcptt-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcptt-location-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcptt-regroup+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcptt-service-config+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcptt-signed+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcptt-ue-config+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcptt-user-profile+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcvideo-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcvideo-location-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcvideo-regroup+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcvideo-service-config+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcvideo-ue-config+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mcvideo-user-profile+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.mid-call+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.ngap": {"source":"iana"},
  "application/vnd.3gpp.pfcp": {"source":"iana"},
  "application/vnd.3gpp.pic-bw-large": {"source":"iana","extensions":["plb"]},
  "application/vnd.3gpp.pic-bw-small": {"source":"iana","extensions":["psb"]},
  "application/vnd.3gpp.pic-bw-var": {"source":"iana","extensions":["pvb"]},
  "application/vnd.3gpp.pinapp-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.s1ap": {"source":"iana"},
  "application/vnd.3gpp.seal-group-doc+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.seal-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.seal-location-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.seal-mbms-usage-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.seal-network-qos-management-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.seal-ue-config-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.seal-unicast-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.seal-user-profile-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.sms": {"source":"iana"},
  "application/vnd.3gpp.sms+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.srvcc-ext+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.srvcc-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.state-and-event-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.ussd+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp.v2x": {"source":"iana"},
  "application/vnd.3gpp.vae-info+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp2.bcmcsinfo+xml": {"source":"iana","compressible":true},
  "application/vnd.3gpp2.sms": {"source":"iana"},
  "application/vnd.3gpp2.tcap": {"source":"iana","extensions":["tcap"]},
  "application/vnd.3lightssoftware.imagescal": {"source":"iana"},
  "application/vnd.3m.post-it-notes": {"source":"iana","extensions":["pwn"]},
  "application/vnd.accpac.simply.aso": {"source":"iana","extensions":["aso"]},
  "application/vnd.accpac.simply.imp": {"source":"iana","extensions":["imp"]},
  "application/vnd.acm.addressxfer+json": {"source":"iana","compressible":true},
  "application/vnd.acm.chatbot+json": {"source":"iana","compressible":true},
  "application/vnd.acucobol": {"source":"iana","extensions":["acu"]},
  "application/vnd.acucorp": {"source":"iana","extensions":["atc","acutc"]},
  "application/vnd.adobe.air-application-installer-package+zip": {"source":"apache","compressible":false,"extensions":["air"]},
  "application/vnd.adobe.flash.movie": {"source":"iana"},
  "application/vnd.adobe.formscentral.fcdt": {"source":"iana","extensions":["fcdt"]},
  "application/vnd.adobe.fxp": {"source":"iana","extensions":["fxp","fxpl"]},
  "application/vnd.adobe.partial-upload": {"source":"iana"},
  "application/vnd.adobe.xdp+xml": {"source":"iana","compressible":true,"extensions":["xdp"]},
  "application/vnd.adobe.xfdf": {"source":"apache","extensions":["xfdf"]},
  "application/vnd.aether.imp": {"source":"iana"},
  "application/vnd.afpc.afplinedata": {"source":"iana"},
  "application/vnd.afpc.afplinedata-pagedef": {"source":"iana"},
  "application/vnd.afpc.cmoca-cmresource": {"source":"iana"},
  "application/vnd.afpc.foca-charset": {"source":"iana"},
  "application/vnd.afpc.foca-codedfont": {"source":"iana"},
  "application/vnd.afpc.foca-codepage": {"source":"iana"},
  "application/vnd.afpc.modca": {"source":"iana"},
  "application/vnd.afpc.modca-cmtable": {"source":"iana"},
  "application/vnd.afpc.modca-formdef": {"source":"iana"},
  "application/vnd.afpc.modca-mediummap": {"source":"iana"},
  "application/vnd.afpc.modca-objectcontainer": {"source":"iana"},
  "application/vnd.afpc.modca-overlay": {"source":"iana"},
  "application/vnd.afpc.modca-pagesegment": {"source":"iana"},
  "application/vnd.age": {"source":"iana","extensions":["age"]},
  "application/vnd.ah-barcode": {"source":"apache"},
  "application/vnd.ahead.space": {"source":"iana","extensions":["ahead"]},
  "application/vnd.airzip.filesecure.azf": {"source":"iana","extensions":["azf"]},
  "application/vnd.airzip.filesecure.azs": {"source":"iana","extensions":["azs"]},
  "application/vnd.amadeus+json": {"source":"iana","compressible":true},
  "application/vnd.amazon.ebook": {"source":"apache","extensions":["azw"]},
  "application/vnd.amazon.mobi8-ebook": {"source":"iana"},
  "application/vnd.americandynamics.acc": {"source":"iana","extensions":["acc"]},
  "application/vnd.amiga.ami": {"source":"iana","extensions":["ami"]},
  "application/vnd.amundsen.maze+xml": {"source":"iana","compressible":true},
  "application/vnd.android.ota": {"source":"iana"},
  "application/vnd.android.package-archive": {"source":"apache","compressible":false,"extensions":["apk"]},
  "application/vnd.anki": {"source":"iana"},
  "application/vnd.anser-web-certificate-issue-initiation": {"source":"iana","extensions":["cii"]},
  "application/vnd.anser-web-funds-transfer-initiation": {"source":"apache","extensions":["fti"]},
  "application/vnd.antix.game-component": {"source":"iana","extensions":["atx"]},
  "application/vnd.apache.arrow.file": {"source":"iana"},
  "application/vnd.apache.arrow.stream": {"source":"iana"},
  "application/vnd.apache.parquet": {"source":"iana"},
  "application/vnd.apache.thrift.binary": {"source":"iana"},
  "application/vnd.apache.thrift.compact": {"source":"iana"},
  "application/vnd.apache.thrift.json": {"source":"iana"},
  "application/vnd.apexlang": {"source":"iana"},
  "application/vnd.api+json": {"source":"iana","compressible":true},
  "application/vnd.aplextor.warrp+json": {"source":"iana","compressible":true},
  "application/vnd.apothekende.reservation+json": {"source":"iana","compressible":true},
  "application/vnd.apple.installer+xml": {"source":"iana","compressible":true,"extensions":["mpkg"]},
  "application/vnd.apple.keynote": {"source":"iana","extensions":["key"]},
  "application/vnd.apple.mpegurl": {"source":"iana","extensions":["m3u8"]},
  "application/vnd.apple.numbers": {"source":"iana","extensions":["numbers"]},
  "application/vnd.apple.pages": {"source":"iana","extensions":["pages"]},
  "application/vnd.apple.pkpass": {"compressible":false,"extensions":["pkpass"]},
  "application/vnd.arastra.swi": {"source":"apache"},
  "application/vnd.aristanetworks.swi": {"source":"iana","extensions":["swi"]},
  "application/vnd.artisan+json": {"source":"iana","compressible":true},
  "application/vnd.artsquare": {"source":"iana"},
  "application/vnd.astraea-software.iota": {"source":"iana","extensions":["iota"]},
  "application/vnd.audiograph": {"source":"iana","extensions":["aep"]},
  "application/vnd.autodesk.fbx": {"extensions":["fbx"]},
  "application/vnd.autopackage": {"source":"iana"},
  "application/vnd.avalon+json": {"source":"iana","compressible":true},
  "application/vnd.avistar+xml": {"source":"iana","compressible":true},
  "application/vnd.balsamiq.bmml+xml": {"source":"iana","compressible":true,"extensions":["bmml"]},
  "application/vnd.balsamiq.bmpr": {"source":"iana"},
  "application/vnd.banana-accounting": {"source":"iana"},
  "application/vnd.bbf.usp.error": {"source":"iana"},
  "application/vnd.bbf.usp.msg": {"source":"iana"},
  "application/vnd.bbf.usp.msg+json": {"source":"iana","compressible":true},
  "application/vnd.bekitzur-stech+json": {"source":"iana","compressible":true},
  "application/vnd.belightsoft.lhzd+zip": {"source":"iana","compressible":false},
  "application/vnd.belightsoft.lhzl+zip": {"source":"iana","compressible":false},
  "application/vnd.bint.med-content": {"source":"iana"},
  "application/vnd.biopax.rdf+xml": {"source":"iana","compressible":true},
  "application/vnd.blink-idb-value-wrapper": {"source":"iana"},
  "application/vnd.blueice.multipass": {"source":"iana","extensions":["mpm"]},
  "application/vnd.bluetooth.ep.oob": {"source":"iana"},
  "application/vnd.bluetooth.le.oob": {"source":"iana"},
  "application/vnd.bmi": {"source":"iana","extensions":["bmi"]},
  "application/vnd.bpf": {"source":"iana"},
  "application/vnd.bpf3": {"source":"iana"},
  "application/vnd.businessobjects": {"source":"iana","extensions":["rep"]},
  "application/vnd.byu.uapi+json": {"source":"iana","compressible":true},
  "application/vnd.bzip3": {"source":"iana"},
  "application/vnd.c3voc.schedule+xml": {"source":"iana","compressible":true},
  "application/vnd.cab-jscript": {"source":"iana"},
  "application/vnd.canon-cpdl": {"source":"iana"},
  "application/vnd.canon-lips": {"source":"iana"},
  "application/vnd.capasystems-pg+json": {"source":"iana","compressible":true},
  "application/vnd.cendio.thinlinc.clientconf": {"source":"iana"},
  "application/vnd.century-systems.tcp_stream": {"source":"iana"},
  "application/vnd.chemdraw+xml": {"source":"iana","compressible":true,"extensions":["cdxml"]},
  "application/vnd.chess-pgn": {"source":"iana"},
  "application/vnd.chipnuts.karaoke-mmd": {"source":"iana","extensions":["mmd"]},
  "application/vnd.ciedi": {"source":"iana"},
  "application/vnd.cinderella": {"source":"iana","extensions":["cdy"]},
  "application/vnd.cirpack.isdn-ext": {"source":"iana"},
  "application/vnd.citationstyles.style+xml": {"source":"iana","compressible":true,"extensions":["csl"]},
  "application/vnd.claymore": {"source":"iana","extensions":["cla"]},
  "application/vnd.cloanto.rp9": {"source":"iana","extensions":["rp9"]},
  "application/vnd.clonk.c4group": {"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},
  "application/vnd.cluetrust.cartomobile-config": {"source":"iana","extensions":["c11amc"]},
  "application/vnd.cluetrust.cartomobile-config-pkg": {"source":"iana","extensions":["c11amz"]},
  "application/vnd.cncf.helm.chart.content.v1.tar+gzip": {"source":"iana"},
  "application/vnd.cncf.helm.chart.provenance.v1.prov": {"source":"iana"},
  "application/vnd.cncf.helm.config.v1+json": {"source":"iana","compressible":true},
  "application/vnd.coffeescript": {"source":"iana"},
  "application/vnd.collabio.xodocuments.document": {"source":"iana"},
  "application/vnd.collabio.xodocuments.document-template": {"source":"iana"},
  "application/vnd.collabio.xodocuments.presentation": {"source":"iana"},
  "application/vnd.collabio.xodocuments.presentation-template": {"source":"iana"},
  "application/vnd.collabio.xodocuments.spreadsheet": {"source":"iana"},
  "application/vnd.collabio.xodocuments.spreadsheet-template": {"source":"iana"},
  "application/vnd.collection+json": {"source":"iana","compressible":true},
  "application/vnd.collection.doc+json": {"source":"iana","compressible":true},
  "application/vnd.collection.next+json": {"source":"iana","compressible":true},
  "application/vnd.comicbook+zip": {"source":"iana","compressible":false},
  "application/vnd.comicbook-rar": {"source":"iana"},
  "application/vnd.commerce-battelle": {"source":"iana"},
  "application/vnd.commonspace": {"source":"iana","extensions":["csp"]},
  "application/vnd.contact.cmsg": {"source":"iana","extensions":["cdbcmsg"]},
  "application/vnd.coreos.ignition+json": {"source":"iana","compressible":true},
  "application/vnd.cosmocaller": {"source":"iana","extensions":["cmc"]},
  "application/vnd.crick.clicker": {"source":"iana","extensions":["clkx"]},
  "application/vnd.crick.clicker.keyboard": {"source":"iana","extensions":["clkk"]},
  "application/vnd.crick.clicker.palette": {"source":"iana","extensions":["clkp"]},
  "application/vnd.crick.clicker.template": {"source":"iana","extensions":["clkt"]},
  "application/vnd.crick.clicker.wordbank": {"source":"iana","extensions":["clkw"]},
  "application/vnd.criticaltools.wbs+xml": {"source":"iana","compressible":true,"extensions":["wbs"]},
  "application/vnd.cryptii.pipe+json": {"source":"iana","compressible":true},
  "application/vnd.crypto-shade-file": {"source":"iana"},
  "application/vnd.cryptomator.encrypted": {"source":"iana"},
  "application/vnd.cryptomator.vault": {"source":"iana"},
  "application/vnd.ctc-posml": {"source":"iana","extensions":["pml"]},
  "application/vnd.ctct.ws+xml": {"source":"iana","compressible":true},
  "application/vnd.cups-pdf": {"source":"iana"},
  "application/vnd.cups-postscript": {"source":"iana"},
  "application/vnd.cups-ppd": {"source":"iana","extensions":["ppd"]},
  "application/vnd.cups-raster": {"source":"iana"},
  "application/vnd.cups-raw": {"source":"iana"},
  "application/vnd.curl": {"source":"iana"},
  "application/vnd.curl.car": {"source":"apache","extensions":["car"]},
  "application/vnd.curl.pcurl": {"source":"apache","extensions":["pcurl"]},
  "application/vnd.cyan.dean.root+xml": {"source":"iana","compressible":true},
  "application/vnd.cybank": {"source":"iana"},
  "application/vnd.cyclonedx+json": {"source":"iana","compressible":true},
  "application/vnd.cyclonedx+xml": {"source":"iana","compressible":true},
  "application/vnd.d2l.coursepackage1p0+zip": {"source":"iana","compressible":false},
  "application/vnd.d3m-dataset": {"source":"iana"},
  "application/vnd.d3m-problem": {"source":"iana"},
  "application/vnd.dart": {"source":"iana","compressible":true,"extensions":["dart"]},
  "application/vnd.data-vision.rdz": {"source":"iana","extensions":["rdz"]},
  "application/vnd.datalog": {"source":"iana"},
  "application/vnd.datapackage+json": {"source":"iana","compressible":true},
  "application/vnd.dataresource+json": {"source":"iana","compressible":true},
  "application/vnd.dbf": {"source":"iana","extensions":["dbf"]},
  "application/vnd.dcmp+xml": {"source":"iana","compressible":true,"extensions":["dcmp"]},
  "application/vnd.debian.binary-package": {"source":"iana"},
  "application/vnd.dece.data": {"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},
  "application/vnd.dece.ttml+xml": {"source":"iana","compressible":true,"extensions":["uvt","uvvt"]},
  "application/vnd.dece.unspecified": {"source":"iana","extensions":["uvx","uvvx"]},
  "application/vnd.dece.zip": {"source":"iana","extensions":["uvz","uvvz"]},
  "application/vnd.denovo.fcselayout-link": {"source":"iana","extensions":["fe_launch"]},
  "application/vnd.desmume.movie": {"source":"iana"},
  "application/vnd.dir-bi.plate-dl-nosuffix": {"source":"iana"},
  "application/vnd.dm.delegation+xml": {"source":"iana","compressible":true},
  "application/vnd.dna": {"source":"iana","extensions":["dna"]},
  "application/vnd.document+json": {"source":"iana","compressible":true},
  "application/vnd.dolby.mlp": {"source":"apache","extensions":["mlp"]},
  "application/vnd.dolby.mobile.1": {"source":"iana"},
  "application/vnd.dolby.mobile.2": {"source":"iana"},
  "application/vnd.doremir.scorecloud-binary-document": {"source":"iana"},
  "application/vnd.dpgraph": {"source":"iana","extensions":["dpg"]},
  "application/vnd.dreamfactory": {"source":"iana","extensions":["dfac"]},
  "application/vnd.drive+json": {"source":"iana","compressible":true},
  "application/vnd.ds-keypoint": {"source":"apache","extensions":["kpxx"]},
  "application/vnd.dtg.local": {"source":"iana"},
  "application/vnd.dtg.local.flash": {"source":"iana"},
  "application/vnd.dtg.local.html": {"source":"iana"},
  "application/vnd.dvb.ait": {"source":"iana","extensions":["ait"]},
  "application/vnd.dvb.dvbisl+xml": {"source":"iana","compressible":true},
  "application/vnd.dvb.dvbj": {"source":"iana"},
  "application/vnd.dvb.esgcontainer": {"source":"iana"},
  "application/vnd.dvb.ipdcdftnotifaccess": {"source":"iana"},
  "application/vnd.dvb.ipdcesgaccess": {"source":"iana"},
  "application/vnd.dvb.ipdcesgaccess2": {"source":"iana"},
  "application/vnd.dvb.ipdcesgpdd": {"source":"iana"},
  "application/vnd.dvb.ipdcroaming": {"source":"iana"},
  "application/vnd.dvb.iptv.alfec-base": {"source":"iana"},
  "application/vnd.dvb.iptv.alfec-enhancement": {"source":"iana"},
  "application/vnd.dvb.notif-aggregate-root+xml": {"source":"iana","compressible":true},
  "application/vnd.dvb.notif-container+xml": {"source":"iana","compressible":true},
  "application/vnd.dvb.notif-generic+xml": {"source":"iana","compressible":true},
  "application/vnd.dvb.notif-ia-msglist+xml": {"source":"iana","compressible":true},
  "application/vnd.dvb.notif-ia-registration-request+xml": {"source":"iana","compressible":true},
  "application/vnd.dvb.notif-ia-registration-response+xml": {"source":"iana","compressible":true},
  "application/vnd.dvb.notif-init+xml": {"source":"iana","compressible":true},
  "application/vnd.dvb.pfr": {"source":"iana"},
  "application/vnd.dvb.service": {"source":"iana","extensions":["svc"]},
  "application/vnd.dxr": {"source":"iana"},
  "application/vnd.dynageo": {"source":"iana","extensions":["geo"]},
  "application/vnd.dzr": {"source":"iana"},
  "application/vnd.easykaraoke.cdgdownload": {"source":"iana"},
  "application/vnd.ecdis-update": {"source":"iana"},
  "application/vnd.ecip.rlp": {"source":"iana"},
  "application/vnd.eclipse.ditto+json": {"source":"iana","compressible":true},
  "application/vnd.ecowin.chart": {"source":"iana","extensions":["mag"]},
  "application/vnd.ecowin.filerequest": {"source":"iana"},
  "application/vnd.ecowin.fileupdate": {"source":"iana"},
  "application/vnd.ecowin.series": {"source":"iana"},
  "application/vnd.ecowin.seriesrequest": {"source":"iana"},
  "application/vnd.ecowin.seriesupdate": {"source":"iana"},
  "application/vnd.efi.img": {"source":"iana"},
  "application/vnd.efi.iso": {"source":"iana"},
  "application/vnd.eln+zip": {"source":"iana","compressible":false},
  "application/vnd.emclient.accessrequest+xml": {"source":"iana","compressible":true},
  "application/vnd.enliven": {"source":"iana","extensions":["nml"]},
  "application/vnd.enphase.envoy": {"source":"iana"},
  "application/vnd.eprints.data+xml": {"source":"iana","compressible":true},
  "application/vnd.epson.esf": {"source":"iana","extensions":["esf"]},
  "application/vnd.epson.msf": {"source":"iana","extensions":["msf"]},
  "application/vnd.epson.quickanime": {"source":"iana","extensions":["qam"]},
  "application/vnd.epson.salt": {"source":"iana","extensions":["slt"]},
  "application/vnd.epson.ssf": {"source":"iana","extensions":["ssf"]},
  "application/vnd.ericsson.quickcall": {"source":"iana"},
  "application/vnd.erofs": {"source":"iana"},
  "application/vnd.espass-espass+zip": {"source":"iana","compressible":false},
  "application/vnd.eszigno3+xml": {"source":"iana","compressible":true,"extensions":["es3","et3"]},
  "application/vnd.etsi.aoc+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.asic-e+zip": {"source":"iana","compressible":false},
  "application/vnd.etsi.asic-s+zip": {"source":"iana","compressible":false},
  "application/vnd.etsi.cug+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.iptvcommand+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.iptvdiscovery+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.iptvprofile+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.iptvsad-bc+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.iptvsad-cod+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.iptvsad-npvr+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.iptvservice+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.iptvsync+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.iptvueprofile+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.mcid+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.mheg5": {"source":"iana"},
  "application/vnd.etsi.overload-control-policy-dataset+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.pstn+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.sci+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.simservs+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.timestamp-token": {"source":"iana"},
  "application/vnd.etsi.tsl+xml": {"source":"iana","compressible":true},
  "application/vnd.etsi.tsl.der": {"source":"iana"},
  "application/vnd.eu.kasparian.car+json": {"source":"iana","compressible":true},
  "application/vnd.eudora.data": {"source":"iana"},
  "application/vnd.evolv.ecig.profile": {"source":"iana"},
  "application/vnd.evolv.ecig.settings": {"source":"iana"},
  "application/vnd.evolv.ecig.theme": {"source":"iana"},
  "application/vnd.exstream-empower+zip": {"source":"iana","compressible":false},
  "application/vnd.exstream-package": {"source":"iana"},
  "application/vnd.ezpix-album": {"source":"iana","extensions":["ez2"]},
  "application/vnd.ezpix-package": {"source":"iana","extensions":["ez3"]},
  "application/vnd.f-secure.mobile": {"source":"iana"},
  "application/vnd.familysearch.gedcom+zip": {"source":"iana","compressible":false},
  "application/vnd.fastcopy-disk-image": {"source":"iana"},
  "application/vnd.fdf": {"source":"apache","extensions":["fdf"]},
  "application/vnd.fdsn.mseed": {"source":"iana","extensions":["mseed"]},
  "application/vnd.fdsn.seed": {"source":"iana","extensions":["seed","dataless"]},
  "application/vnd.fdsn.stationxml+xml": {"source":"iana","charset":"XML-BASED","compressible":true},
  "application/vnd.ffsns": {"source":"iana"},
  "application/vnd.ficlab.flb+zip": {"source":"iana","compressible":false},
  "application/vnd.filmit.zfc": {"source":"iana"},
  "application/vnd.fints": {"source":"iana"},
  "application/vnd.firemonkeys.cloudcell": {"source":"iana"},
  "application/vnd.flographit": {"source":"iana","extensions":["gph"]},
  "application/vnd.fluxtime.clip": {"source":"iana","extensions":["ftc"]},
  "application/vnd.font-fontforge-sfd": {"source":"iana"},
  "application/vnd.framemaker": {"source":"iana","extensions":["fm","frame","maker","book"]},
  "application/vnd.freelog.comic": {"source":"iana"},
  "application/vnd.frogans.fnc": {"source":"apache","extensions":["fnc"]},
  "application/vnd.frogans.ltf": {"source":"apache","extensions":["ltf"]},
  "application/vnd.fsc.weblaunch": {"source":"iana","extensions":["fsc"]},
  "application/vnd.fujifilm.fb.docuworks": {"source":"iana"},
  "application/vnd.fujifilm.fb.docuworks.binder": {"source":"iana"},
  "application/vnd.fujifilm.fb.docuworks.container": {"source":"iana"},
  "application/vnd.fujifilm.fb.jfi+xml": {"source":"iana","compressible":true},
  "application/vnd.fujitsu.oasys": {"source":"iana","extensions":["oas"]},
  "application/vnd.fujitsu.oasys2": {"source":"iana","extensions":["oa2"]},
  "application/vnd.fujitsu.oasys3": {"source":"iana","extensions":["oa3"]},
  "application/vnd.fujitsu.oasysgp": {"source":"iana","extensions":["fg5"]},
  "application/vnd.fujitsu.oasysprs": {"source":"iana","extensions":["bh2"]},
  "application/vnd.fujixerox.art-ex": {"source":"iana"},
  "application/vnd.fujixerox.art4": {"source":"iana"},
  "application/vnd.fujixerox.ddd": {"source":"iana","extensions":["ddd"]},
  "application/vnd.fujixerox.docuworks": {"source":"iana","extensions":["xdw"]},
  "application/vnd.fujixerox.docuworks.binder": {"source":"iana","extensions":["xbd"]},
  "application/vnd.fujixerox.docuworks.container": {"source":"iana"},
  "application/vnd.fujixerox.hbpl": {"source":"iana"},
  "application/vnd.fut-misnet": {"source":"iana"},
  "application/vnd.futoin+cbor": {"source":"iana"},
  "application/vnd.futoin+json": {"source":"iana","compressible":true},
  "application/vnd.fuzzysheet": {"source":"iana","extensions":["fzs"]},
  "application/vnd.ga4gh.passport+jwt": {"source":"iana"},
  "application/vnd.genomatix.tuxedo": {"source":"iana","extensions":["txd"]},
  "application/vnd.genozip": {"source":"iana"},
  "application/vnd.gentics.grd+json": {"source":"iana","compressible":true},
  "application/vnd.gentoo.catmetadata+xml": {"source":"iana","compressible":true},
  "application/vnd.gentoo.ebuild": {"source":"iana"},
  "application/vnd.gentoo.eclass": {"source":"iana"},
  "application/vnd.gentoo.gpkg": {"source":"iana"},
  "application/vnd.gentoo.manifest": {"source":"iana"},
  "application/vnd.gentoo.pkgmetadata+xml": {"source":"iana","compressible":true},
  "application/vnd.gentoo.xpak": {"source":"iana"},
  "application/vnd.geo+json": {"source":"apache","compressible":true},
  "application/vnd.geocube+xml": {"source":"apache","compressible":true},
  "application/vnd.geogebra.file": {"source":"iana","extensions":["ggb"]},
  "application/vnd.geogebra.pinboard": {"source":"iana"},
  "application/vnd.geogebra.slides": {"source":"iana","extensions":["ggs"]},
  "application/vnd.geogebra.tool": {"source":"iana","extensions":["ggt"]},
  "application/vnd.geometry-explorer": {"source":"iana","extensions":["gex","gre"]},
  "application/vnd.geonext": {"source":"iana","extensions":["gxt"]},
  "application/vnd.geoplan": {"source":"iana","extensions":["g2w"]},
  "application/vnd.geospace": {"source":"iana","extensions":["g3w"]},
  "application/vnd.gerber": {"source":"iana"},
  "application/vnd.globalplatform.card-content-mgt": {"source":"iana"},
  "application/vnd.globalplatform.card-content-mgt-response": {"source":"iana"},
  "application/vnd.gmx": {"source":"iana","extensions":["gmx"]},
  "application/vnd.gnu.taler.exchange+json": {"source":"iana","compressible":true},
  "application/vnd.gnu.taler.merchant+json": {"source":"iana","compressible":true},
  "application/vnd.google-apps.audio": {},
  "application/vnd.google-apps.document": {"compressible":false,"extensions":["gdoc"]},
  "application/vnd.google-apps.drawing": {"compressible":false,"extensions":["gdraw"]},
  "application/vnd.google-apps.drive-sdk": {"compressible":false},
  "application/vnd.google-apps.file": {},
  "application/vnd.google-apps.folder": {"compressible":false},
  "application/vnd.google-apps.form": {"compressible":false,"extensions":["gform"]},
  "application/vnd.google-apps.fusiontable": {},
  "application/vnd.google-apps.jam": {"compressible":false,"extensions":["gjam"]},
  "application/vnd.google-apps.mail-layout": {},
  "application/vnd.google-apps.map": {"compressible":false,"extensions":["gmap"]},
  "application/vnd.google-apps.photo": {},
  "application/vnd.google-apps.presentation": {"compressible":false,"extensions":["gslides"]},
  "application/vnd.google-apps.script": {"compressible":false,"extensions":["gscript"]},
  "application/vnd.google-apps.shortcut": {},
  "application/vnd.google-apps.site": {"compressible":false,"extensions":["gsite"]},
  "application/vnd.google-apps.spreadsheet": {"compressible":false,"extensions":["gsheet"]},
  "application/vnd.google-apps.unknown": {},
  "application/vnd.google-apps.video": {},
  "application/vnd.google-earth.kml+xml": {"source":"iana","compressible":true,"extensions":["kml"]},
  "application/vnd.google-earth.kmz": {"source":"iana","compressible":false,"extensions":["kmz"]},
  "application/vnd.gov.sk.e-form+xml": {"source":"apache","compressible":true},
  "application/vnd.gov.sk.e-form+zip": {"source":"iana","compressible":false},
  "application/vnd.gov.sk.xmldatacontainer+xml": {"source":"iana","compressible":true,"extensions":["xdcf"]},
  "application/vnd.gpxsee.map+xml": {"source":"iana","compressible":true},
  "application/vnd.grafeq": {"source":"iana","extensions":["gqf","gqs"]},
  "application/vnd.gridmp": {"source":"iana"},
  "application/vnd.groove-account": {"source":"iana","extensions":["gac"]},
  "application/vnd.groove-help": {"source":"iana","extensions":["ghf"]},
  "application/vnd.groove-identity-message": {"source":"iana","extensions":["gim"]},
  "application/vnd.groove-injector": {"source":"iana","extensions":["grv"]},
  "application/vnd.groove-tool-message": {"source":"iana","extensions":["gtm"]},
  "application/vnd.groove-tool-template": {"source":"iana","extensions":["tpl"]},
  "application/vnd.groove-vcard": {"source":"iana","extensions":["vcg"]},
  "application/vnd.hal+json": {"source":"iana","compressible":true},
  "application/vnd.hal+xml": {"source":"iana","compressible":true,"extensions":["hal"]},
  "application/vnd.handheld-entertainment+xml": {"source":"iana","compressible":true,"extensions":["zmm"]},
  "application/vnd.hbci": {"source":"iana","extensions":["hbci"]},
  "application/vnd.hc+json": {"source":"iana","compressible":true},
  "application/vnd.hcl-bireports": {"source":"iana"},
  "application/vnd.hdt": {"source":"iana"},
  "application/vnd.heroku+json": {"source":"iana","compressible":true},
  "application/vnd.hhe.lesson-player": {"source":"iana","extensions":["les"]},
  "application/vnd.hp-hpgl": {"source":"iana","extensions":["hpgl"]},
  "application/vnd.hp-hpid": {"source":"iana","extensions":["hpid"]},
  "application/vnd.hp-hps": {"source":"iana","extensions":["hps"]},
  "application/vnd.hp-jlyt": {"source":"iana","extensions":["jlt"]},
  "application/vnd.hp-pcl": {"source":"iana","extensions":["pcl"]},
  "application/vnd.hp-pclxl": {"source":"iana","extensions":["pclxl"]},
  "application/vnd.hsl": {"source":"iana"},
  "application/vnd.httphone": {"source":"iana"},
  "application/vnd.hydrostatix.sof-data": {"source":"iana","extensions":["sfd-hdstx"]},
  "application/vnd.hyper+json": {"source":"iana","compressible":true},
  "application/vnd.hyper-item+json": {"source":"iana","compressible":true},
  "application/vnd.hyperdrive+json": {"source":"iana","compressible":true},
  "application/vnd.hzn-3d-crossword": {"source":"iana"},
  "application/vnd.ibm.afplinedata": {"source":"apache"},
  "application/vnd.ibm.electronic-media": {"source":"iana"},
  "application/vnd.ibm.minipay": {"source":"iana","extensions":["mpy"]},
  "application/vnd.ibm.modcap": {"source":"apache","extensions":["afp","listafp","list3820"]},
  "application/vnd.ibm.rights-management": {"source":"iana","extensions":["irm"]},
  "application/vnd.ibm.secure-container": {"source":"iana","extensions":["sc"]},
  "application/vnd.iccprofile": {"source":"iana","extensions":["icc","icm"]},
  "application/vnd.ieee.1905": {"source":"iana"},
  "application/vnd.igloader": {"source":"iana","extensions":["igl"]},
  "application/vnd.imagemeter.folder+zip": {"source":"iana","compressible":false},
  "application/vnd.imagemeter.image+zip": {"source":"iana","compressible":false},
  "application/vnd.immervision-ivp": {"source":"iana","extensions":["ivp"]},
  "application/vnd.immervision-ivu": {"source":"iana","extensions":["ivu"]},
  "application/vnd.ims.imsccv1p1": {"source":"iana"},
  "application/vnd.ims.imsccv1p2": {"source":"iana"},
  "application/vnd.ims.imsccv1p3": {"source":"iana"},
  "application/vnd.ims.lis.v2.result+json": {"source":"iana","compressible":true},
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {"source":"iana","compressible":true},
  "application/vnd.ims.lti.v2.toolproxy+json": {"source":"iana","compressible":true},
  "application/vnd.ims.lti.v2.toolproxy.id+json": {"source":"iana","compressible":true},
  "application/vnd.ims.lti.v2.toolsettings+json": {"source":"iana","compressible":true},
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {"source":"iana","compressible":true},
  "application/vnd.informedcontrol.rms+xml": {"source":"iana","compressible":true},
  "application/vnd.informix-visionary": {"source":"apache"},
  "application/vnd.infotech.project": {"source":"iana"},
  "application/vnd.infotech.project+xml": {"source":"iana","compressible":true},
  "application/vnd.innopath.wamp.notification": {"source":"iana"},
  "application/vnd.insors.igm": {"source":"iana","extensions":["igm"]},
  "application/vnd.intercon.formnet": {"source":"iana","extensions":["xpw","xpx"]},
  "application/vnd.intergeo": {"source":"iana","extensions":["i2g"]},
  "application/vnd.intertrust.digibox": {"source":"iana"},
  "application/vnd.intertrust.nncp": {"source":"iana"},
  "application/vnd.intu.qbo": {"source":"iana","extensions":["qbo"]},
  "application/vnd.intu.qfx": {"source":"iana","extensions":["qfx"]},
  "application/vnd.ipfs.ipns-record": {"source":"iana"},
  "application/vnd.ipld.car": {"source":"iana"},
  "application/vnd.ipld.dag-cbor": {"source":"iana"},
  "application/vnd.ipld.dag-json": {"source":"iana"},
  "application/vnd.ipld.raw": {"source":"iana"},
  "application/vnd.iptc.g2.catalogitem+xml": {"source":"iana","compressible":true},
  "application/vnd.iptc.g2.conceptitem+xml": {"source":"iana","compressible":true},
  "application/vnd.iptc.g2.knowledgeitem+xml": {"source":"iana","compressible":true},
  "application/vnd.iptc.g2.newsitem+xml": {"source":"iana","compressible":true},
  "application/vnd.iptc.g2.newsmessage+xml": {"source":"iana","compressible":true},
  "application/vnd.iptc.g2.packageitem+xml": {"source":"iana","compressible":true},
  "application/vnd.iptc.g2.planningitem+xml": {"source":"iana","compressible":true},
  "application/vnd.ipunplugged.rcprofile": {"source":"iana","extensions":["rcprofile"]},
  "application/vnd.irepository.package+xml": {"source":"iana","compressible":true,"extensions":["irp"]},
  "application/vnd.is-xpr": {"source":"iana","extensions":["xpr"]},
  "application/vnd.isac.fcs": {"source":"iana","extensions":["fcs"]},
  "application/vnd.iso11783-10+zip": {"source":"iana","compressible":false},
  "application/vnd.jam": {"source":"iana","extensions":["jam"]},
  "application/vnd.japannet-directory-service": {"source":"iana"},
  "application/vnd.japannet-jpnstore-wakeup": {"source":"iana"},
  "application/vnd.japannet-payment-wakeup": {"source":"iana"},
  "application/vnd.japannet-registration": {"source":"iana"},
  "application/vnd.japannet-registration-wakeup": {"source":"iana"},
  "application/vnd.japannet-setstore-wakeup": {"source":"iana"},
  "application/vnd.japannet-verification": {"source":"iana"},
  "application/vnd.japannet-verification-wakeup": {"source":"iana"},
  "application/vnd.jcp.javame.midlet-rms": {"source":"iana","extensions":["rms"]},
  "application/vnd.jisp": {"source":"iana","extensions":["jisp"]},
  "application/vnd.joost.joda-archive": {"source":"iana","extensions":["joda"]},
  "application/vnd.jsk.isdn-ngn": {"source":"iana"},
  "application/vnd.kahootz": {"source":"iana","extensions":["ktz","ktr"]},
  "application/vnd.kde.karbon": {"source":"iana","extensions":["karbon"]},
  "application/vnd.kde.kchart": {"source":"iana","extensions":["chrt"]},
  "application/vnd.kde.kformula": {"source":"iana","extensions":["kfo"]},
  "application/vnd.kde.kivio": {"source":"iana","extensions":["flw"]},
  "application/vnd.kde.kontour": {"source":"iana","extensions":["kon"]},
  "application/vnd.kde.kpresenter": {"source":"iana","extensions":["kpr","kpt"]},
  "application/vnd.kde.kspread": {"source":"iana","extensions":["ksp"]},
  "application/vnd.kde.kword": {"source":"iana","extensions":["kwd","kwt"]},
  "application/vnd.kdl": {"source":"iana"},
  "application/vnd.kenameaapp": {"source":"iana","extensions":["htke"]},
  "application/vnd.keyman.kmp+zip": {"source":"iana","compressible":false},
  "application/vnd.keyman.kmx": {"source":"iana"},
  "application/vnd.kidspiration": {"source":"iana","extensions":["kia"]},
  "application/vnd.kinar": {"source":"iana","extensions":["kne","knp"]},
  "application/vnd.koan": {"source":"iana","extensions":["skp","skd","skt","skm"]},
  "application/vnd.kodak-descriptor": {"source":"iana","extensions":["sse"]},
  "application/vnd.las": {"source":"iana"},
  "application/vnd.las.las+json": {"source":"iana","compressible":true},
  "application/vnd.las.las+xml": {"source":"iana","compressible":true,"extensions":["lasxml"]},
  "application/vnd.laszip": {"source":"iana"},
  "application/vnd.ldev.productlicensing": {"source":"iana"},
  "application/vnd.leap+json": {"source":"iana","compressible":true},
  "application/vnd.liberty-request+xml": {"source":"iana","compressible":true},
  "application/vnd.llamagraphics.life-balance.desktop": {"source":"iana","extensions":["lbd"]},
  "application/vnd.llamagraphics.life-balance.exchange+xml": {"source":"iana","compressible":true,"extensions":["lbe"]},
  "application/vnd.logipipe.circuit+zip": {"source":"iana","compressible":false},
  "application/vnd.loom": {"source":"iana"},
  "application/vnd.lotus-1-2-3": {"source":"iana","extensions":["123"]},
  "application/vnd.lotus-approach": {"source":"iana","extensions":["apr"]},
  "application/vnd.lotus-freelance": {"source":"iana","extensions":["pre"]},
  "application/vnd.lotus-notes": {"source":"iana","extensions":["nsf"]},
  "application/vnd.lotus-organizer": {"source":"iana","extensions":["org"]},
  "application/vnd.lotus-screencam": {"source":"iana","extensions":["scm"]},
  "application/vnd.lotus-wordpro": {"source":"iana","extensions":["lwp"]},
  "application/vnd.macports.portpkg": {"source":"iana","extensions":["portpkg"]},
  "application/vnd.mapbox-vector-tile": {"source":"iana","extensions":["mvt"]},
  "application/vnd.marlin.drm.actiontoken+xml": {"source":"iana","compressible":true},
  "application/vnd.marlin.drm.conftoken+xml": {"source":"iana","compressible":true},
  "application/vnd.marlin.drm.license+xml": {"source":"iana","compressible":true},
  "application/vnd.marlin.drm.mdcf": {"source":"iana"},
  "application/vnd.mason+json": {"source":"iana","compressible":true},
  "application/vnd.maxar.archive.3tz+zip": {"source":"iana","compressible":false},
  "application/vnd.maxmind.maxmind-db": {"source":"iana"},
  "application/vnd.mcd": {"source":"iana","extensions":["mcd"]},
  "application/vnd.mdl": {"source":"iana"},
  "application/vnd.mdl-mbsdf": {"source":"iana"},
  "application/vnd.medcalcdata": {"source":"iana","extensions":["mc1"]},
  "application/vnd.mediastation.cdkey": {"source":"iana","extensions":["cdkey"]},
  "application/vnd.medicalholodeck.recordxr": {"source":"iana"},
  "application/vnd.meridian-slingshot": {"source":"iana"},
  "application/vnd.mermaid": {"source":"iana"},
  "application/vnd.mfer": {"source":"iana","extensions":["mwf"]},
  "application/vnd.mfmp": {"source":"iana","extensions":["mfm"]},
  "application/vnd.micro+json": {"source":"iana","compressible":true},
  "application/vnd.micrografx.flo": {"source":"iana","extensions":["flo"]},
  "application/vnd.micrografx.igx": {"source":"iana","extensions":["igx"]},
  "application/vnd.microsoft.portable-executable": {"source":"iana"},
  "application/vnd.microsoft.windows.thumbnail-cache": {"source":"iana"},
  "application/vnd.miele+json": {"source":"iana","compressible":true},
  "application/vnd.mif": {"source":"iana","extensions":["mif"]},
  "application/vnd.minisoft-hp3000-save": {"source":"iana"},
  "application/vnd.mitsubishi.misty-guard.trustweb": {"source":"iana"},
  "application/vnd.mobius.daf": {"source":"iana","extensions":["daf"]},
  "application/vnd.mobius.dis": {"source":"iana","extensions":["dis"]},
  "application/vnd.mobius.mbk": {"source":"iana","extensions":["mbk"]},
  "application/vnd.mobius.mqy": {"source":"iana","extensions":["mqy"]},
  "application/vnd.mobius.msl": {"source":"iana","extensions":["msl"]},
  "application/vnd.mobius.plc": {"source":"iana","extensions":["plc"]},
  "application/vnd.mobius.txf": {"source":"iana","extensions":["txf"]},
  "application/vnd.modl": {"source":"iana"},
  "application/vnd.mophun.application": {"source":"iana","extensions":["mpn"]},
  "application/vnd.mophun.certificate": {"source":"iana","extensions":["mpc"]},
  "application/vnd.motorola.flexsuite": {"source":"iana"},
  "application/vnd.motorola.flexsuite.adsi": {"source":"iana"},
  "application/vnd.motorola.flexsuite.fis": {"source":"iana"},
  "application/vnd.motorola.flexsuite.gotap": {"source":"iana"},
  "application/vnd.motorola.flexsuite.kmr": {"source":"iana"},
  "application/vnd.motorola.flexsuite.ttc": {"source":"iana"},
  "application/vnd.motorola.flexsuite.wem": {"source":"iana"},
  "application/vnd.motorola.iprm": {"source":"iana"},
  "application/vnd.mozilla.xul+xml": {"source":"iana","compressible":true,"extensions":["xul"]},
  "application/vnd.ms-3mfdocument": {"source":"iana"},
  "application/vnd.ms-artgalry": {"source":"iana","extensions":["cil"]},
  "application/vnd.ms-asf": {"source":"iana"},
  "application/vnd.ms-cab-compressed": {"source":"iana","extensions":["cab"]},
  "application/vnd.ms-color.iccprofile": {"source":"apache"},
  "application/vnd.ms-excel": {"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},
  "application/vnd.ms-excel.addin.macroenabled.12": {"source":"iana","extensions":["xlam"]},
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {"source":"iana","extensions":["xlsb"]},
  "application/vnd.ms-excel.sheet.macroenabled.12": {"source":"iana","extensions":["xlsm"]},
  "application/vnd.ms-excel.template.macroenabled.12": {"source":"iana","extensions":["xltm"]},
  "application/vnd.ms-fontobject": {"source":"iana","compressible":true,"extensions":["eot"]},
  "application/vnd.ms-htmlhelp": {"source":"iana","extensions":["chm"]},
  "application/vnd.ms-ims": {"source":"iana","extensions":["ims"]},
  "application/vnd.ms-lrm": {"source":"iana","extensions":["lrm"]},
  "application/vnd.ms-office.activex+xml": {"source":"iana","compressible":true},
  "application/vnd.ms-officetheme": {"source":"iana","extensions":["thmx"]},
  "application/vnd.ms-opentype": {"source":"apache","compressible":true},
  "application/vnd.ms-outlook": {"compressible":false,"extensions":["msg"]},
  "application/vnd.ms-package.obfuscated-opentype": {"source":"apache"},
  "application/vnd.ms-pki.seccat": {"source":"apache","extensions":["cat"]},
  "application/vnd.ms-pki.stl": {"source":"apache","extensions":["stl"]},
  "application/vnd.ms-playready.initiator+xml": {"source":"iana","compressible":true},
  "application/vnd.ms-powerpoint": {"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {"source":"iana","extensions":["ppam"]},
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {"source":"iana","extensions":["pptm"]},
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {"source":"iana","extensions":["sldm"]},
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {"source":"iana","extensions":["ppsm"]},
  "application/vnd.ms-powerpoint.template.macroenabled.12": {"source":"iana","extensions":["potm"]},
  "application/vnd.ms-printdevicecapabilities+xml": {"source":"iana","compressible":true},
  "application/vnd.ms-printing.printticket+xml": {"source":"apache","compressible":true},
  "application/vnd.ms-printschematicket+xml": {"source":"iana","compressible":true},
  "application/vnd.ms-project": {"source":"iana","extensions":["mpp","mpt"]},
  "application/vnd.ms-tnef": {"source":"iana"},
  "application/vnd.ms-visio.viewer": {"extensions":["vdx"]},
  "application/vnd.ms-windows.devicepairing": {"source":"iana"},
  "application/vnd.ms-windows.nwprinting.oob": {"source":"iana"},
  "application/vnd.ms-windows.printerpairing": {"source":"iana"},
  "application/vnd.ms-windows.wsd.oob": {"source":"iana"},
  "application/vnd.ms-wmdrm.lic-chlg-req": {"source":"iana"},
  "application/vnd.ms-wmdrm.lic-resp": {"source":"iana"},
  "application/vnd.ms-wmdrm.meter-chlg-req": {"source":"iana"},
  "application/vnd.ms-wmdrm.meter-resp": {"source":"iana"},
  "application/vnd.ms-word.document.macroenabled.12": {"source":"iana","extensions":["docm"]},
  "application/vnd.ms-word.template.macroenabled.12": {"source":"iana","extensions":["dotm"]},
  "application/vnd.ms-works": {"source":"iana","extensions":["wps","wks","wcm","wdb"]},
  "application/vnd.ms-wpl": {"source":"iana","extensions":["wpl"]},
  "application/vnd.ms-xpsdocument": {"source":"iana","compressible":false,"extensions":["xps"]},
  "application/vnd.msa-disk-image": {"source":"iana"},
  "application/vnd.mseq": {"source":"iana","extensions":["mseq"]},
  "application/vnd.msgpack": {"source":"iana"},
  "application/vnd.msign": {"source":"iana"},
  "application/vnd.multiad.creator": {"source":"iana"},
  "application/vnd.multiad.creator.cif": {"source":"iana"},
  "application/vnd.music-niff": {"source":"iana"},
  "application/vnd.musician": {"source":"iana","extensions":["mus"]},
  "application/vnd.muvee.style": {"source":"iana","extensions":["msty"]},
  "application/vnd.mynfc": {"source":"iana","extensions":["taglet"]},
  "application/vnd.nacamar.ybrid+json": {"source":"iana","compressible":true},
  "application/vnd.nato.bindingdataobject+cbor": {"source":"iana"},
  "application/vnd.nato.bindingdataobject+json": {"source":"iana","compressible":true},
  "application/vnd.nato.bindingdataobject+xml": {"source":"iana","compressible":true,"extensions":["bdo"]},
  "application/vnd.nato.openxmlformats-package.iepd+zip": {"source":"iana","compressible":false},
  "application/vnd.ncd.control": {"source":"iana"},
  "application/vnd.ncd.reference": {"source":"iana"},
  "application/vnd.nearst.inv+json": {"source":"iana","compressible":true},
  "application/vnd.nebumind.line": {"source":"iana"},
  "application/vnd.nervana": {"source":"iana"},
  "application/vnd.netfpx": {"source":"iana"},
  "application/vnd.neurolanguage.nlu": {"source":"iana","extensions":["nlu"]},
  "application/vnd.nimn": {"source":"iana"},
  "application/vnd.nintendo.nitro.rom": {"source":"iana"},
  "application/vnd.nintendo.snes.rom": {"source":"iana"},
  "application/vnd.nitf": {"source":"iana","extensions":["ntf","nitf"]},
  "application/vnd.noblenet-directory": {"source":"iana","extensions":["nnd"]},
  "application/vnd.noblenet-sealer": {"source":"iana","extensions":["nns"]},
  "application/vnd.noblenet-web": {"source":"iana","extensions":["nnw"]},
  "application/vnd.nokia.catalogs": {"source":"iana"},
  "application/vnd.nokia.conml+wbxml": {"source":"iana"},
  "application/vnd.nokia.conml+xml": {"source":"iana","compressible":true},
  "application/vnd.nokia.iptv.config+xml": {"source":"iana","compressible":true},
  "application/vnd.nokia.isds-radio-presets": {"source":"iana"},
  "application/vnd.nokia.landmark+wbxml": {"source":"iana"},
  "application/vnd.nokia.landmark+xml": {"source":"iana","compressible":true},
  "application/vnd.nokia.landmarkcollection+xml": {"source":"iana","compressible":true},
  "application/vnd.nokia.n-gage.ac+xml": {"source":"iana","compressible":true,"extensions":["ac"]},
  "application/vnd.nokia.n-gage.data": {"source":"iana","extensions":["ngdat"]},
  "application/vnd.nokia.n-gage.symbian.install": {"source":"apache","extensions":["n-gage"]},
  "application/vnd.nokia.ncd": {"source":"iana"},
  "application/vnd.nokia.pcd+wbxml": {"source":"iana"},
  "application/vnd.nokia.pcd+xml": {"source":"iana","compressible":true},
  "application/vnd.nokia.radio-preset": {"source":"iana","extensions":["rpst"]},
  "application/vnd.nokia.radio-presets": {"source":"iana","extensions":["rpss"]},
  "application/vnd.novadigm.edm": {"source":"iana","extensions":["edm"]},
  "application/vnd.novadigm.edx": {"source":"iana","extensions":["edx"]},
  "application/vnd.novadigm.ext": {"source":"iana","extensions":["ext"]},
  "application/vnd.ntt-local.content-share": {"source":"iana"},
  "application/vnd.ntt-local.file-transfer": {"source":"iana"},
  "application/vnd.ntt-local.ogw_remote-access": {"source":"iana"},
  "application/vnd.ntt-local.sip-ta_remote": {"source":"iana"},
  "application/vnd.ntt-local.sip-ta_tcp_stream": {"source":"iana"},
  "application/vnd.oai.workflows": {"source":"iana"},
  "application/vnd.oai.workflows+json": {"source":"iana","compressible":true},
  "application/vnd.oai.workflows+yaml": {"source":"iana"},
  "application/vnd.oasis.opendocument.base": {"source":"iana"},
  "application/vnd.oasis.opendocument.chart": {"source":"iana","extensions":["odc"]},
  "application/vnd.oasis.opendocument.chart-template": {"source":"iana","extensions":["otc"]},
  "application/vnd.oasis.opendocument.database": {"source":"apache","extensions":["odb"]},
  "application/vnd.oasis.opendocument.formula": {"source":"iana","extensions":["odf"]},
  "application/vnd.oasis.opendocument.formula-template": {"source":"iana","extensions":["odft"]},
  "application/vnd.oasis.opendocument.graphics": {"source":"iana","compressible":false,"extensions":["odg"]},
  "application/vnd.oasis.opendocument.graphics-template": {"source":"iana","extensions":["otg"]},
  "application/vnd.oasis.opendocument.image": {"source":"iana","extensions":["odi"]},
  "application/vnd.oasis.opendocument.image-template": {"source":"iana","extensions":["oti"]},
  "application/vnd.oasis.opendocument.presentation": {"source":"iana","compressible":false,"extensions":["odp"]},
  "application/vnd.oasis.opendocument.presentation-template": {"source":"iana","extensions":["otp"]},
  "application/vnd.oasis.opendocument.spreadsheet": {"source":"iana","compressible":false,"extensions":["ods"]},
  "application/vnd.oasis.opendocument.spreadsheet-template": {"source":"iana","extensions":["ots"]},
  "application/vnd.oasis.opendocument.text": {"source":"iana","compressible":false,"extensions":["odt"]},
  "application/vnd.oasis.opendocument.text-master": {"source":"iana","extensions":["odm"]},
  "application/vnd.oasis.opendocument.text-master-template": {"source":"iana"},
  "application/vnd.oasis.opendocument.text-template": {"source":"iana","extensions":["ott"]},
  "application/vnd.oasis.opendocument.text-web": {"source":"iana","extensions":["oth"]},
  "application/vnd.obn": {"source":"iana"},
  "application/vnd.ocf+cbor": {"source":"iana"},
  "application/vnd.oci.image.manifest.v1+json": {"source":"iana","compressible":true},
  "application/vnd.oftn.l10n+json": {"source":"iana","compressible":true},
  "application/vnd.oipf.contentaccessdownload+xml": {"source":"iana","compressible":true},
  "application/vnd.oipf.contentaccessstreaming+xml": {"source":"iana","compressible":true},
  "application/vnd.oipf.cspg-hexbinary": {"source":"iana"},
  "application/vnd.oipf.dae.svg+xml": {"source":"iana","compressible":true},
  "application/vnd.oipf.dae.xhtml+xml": {"source":"iana","compressible":true},
  "application/vnd.oipf.mippvcontrolmessage+xml": {"source":"iana","compressible":true},
  "application/vnd.oipf.pae.gem": {"source":"iana"},
  "application/vnd.oipf.spdiscovery+xml": {"source":"iana","compressible":true},
  "application/vnd.oipf.spdlist+xml": {"source":"iana","compressible":true},
  "application/vnd.oipf.ueprofile+xml": {"source":"iana","compressible":true},
  "application/vnd.oipf.userprofile+xml": {"source":"iana","compressible":true},
  "application/vnd.olpc-sugar": {"source":"iana","extensions":["xo"]},
  "application/vnd.oma-scws-config": {"source":"iana"},
  "application/vnd.oma-scws-http-request": {"source":"iana"},
  "application/vnd.oma-scws-http-response": {"source":"iana"},
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.bcast.drm-trigger+xml": {"source":"apache","compressible":true},
  "application/vnd.oma.bcast.imd+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.bcast.ltkm": {"source":"iana"},
  "application/vnd.oma.bcast.notification+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.bcast.provisioningtrigger": {"source":"iana"},
  "application/vnd.oma.bcast.sgboot": {"source":"iana"},
  "application/vnd.oma.bcast.sgdd+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.bcast.sgdu": {"source":"iana"},
  "application/vnd.oma.bcast.simple-symbol-container": {"source":"iana"},
  "application/vnd.oma.bcast.smartcard-trigger+xml": {"source":"apache","compressible":true},
  "application/vnd.oma.bcast.sprov+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.bcast.stkm": {"source":"iana"},
  "application/vnd.oma.cab-address-book+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.cab-feature-handler+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.cab-pcc+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.cab-subs-invite+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.cab-user-prefs+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.dcd": {"source":"iana"},
  "application/vnd.oma.dcdc": {"source":"iana"},
  "application/vnd.oma.dd2+xml": {"source":"iana","compressible":true,"extensions":["dd2"]},
  "application/vnd.oma.drm.risd+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.group-usage-list+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.lwm2m+cbor": {"source":"iana"},
  "application/vnd.oma.lwm2m+json": {"source":"iana","compressible":true},
  "application/vnd.oma.lwm2m+tlv": {"source":"iana"},
  "application/vnd.oma.pal+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.poc.detailed-progress-report+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.poc.final-report+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.poc.groups+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.poc.invocation-descriptor+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.poc.optimized-progress-report+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.push": {"source":"iana"},
  "application/vnd.oma.scidm.messages+xml": {"source":"iana","compressible":true},
  "application/vnd.oma.xcap-directory+xml": {"source":"iana","compressible":true},
  "application/vnd.omads-email+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/vnd.omads-file+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/vnd.omads-folder+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/vnd.omaloc-supl-init": {"source":"iana"},
  "application/vnd.onepager": {"source":"iana"},
  "application/vnd.onepagertamp": {"source":"iana"},
  "application/vnd.onepagertamx": {"source":"iana"},
  "application/vnd.onepagertat": {"source":"iana"},
  "application/vnd.onepagertatp": {"source":"iana"},
  "application/vnd.onepagertatx": {"source":"iana"},
  "application/vnd.onvif.metadata": {"source":"iana"},
  "application/vnd.openblox.game+xml": {"source":"iana","compressible":true,"extensions":["obgx"]},
  "application/vnd.openblox.game-binary": {"source":"iana"},
  "application/vnd.openeye.oeb": {"source":"iana"},
  "application/vnd.openofficeorg.extension": {"source":"apache","extensions":["oxt"]},
  "application/vnd.openstreetmap.data+xml": {"source":"iana","compressible":true,"extensions":["osm"]},
  "application/vnd.opentimestamps.ots": {"source":"iana"},
  "application/vnd.openvpi.dspx+json": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.drawing+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {"source":"iana","compressible":false,"extensions":["pptx"]},
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {"source":"iana","extensions":["sldx"]},
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {"source":"iana","extensions":["ppsx"]},
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.template": {"source":"iana","extensions":["potx"]},
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {"source":"iana","compressible":false,"extensions":["xlsx"]},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {"source":"iana","extensions":["xltx"]},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.theme+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.vmldrawing": {"source":"iana"},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {"source":"iana","compressible":false,"extensions":["docx"]},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {"source":"iana","extensions":["dotx"]},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-package.core-properties+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {"source":"iana","compressible":true},
  "application/vnd.openxmlformats-package.relationships+xml": {"source":"iana","compressible":true},
  "application/vnd.oracle.resource+json": {"source":"iana","compressible":true},
  "application/vnd.orange.indata": {"source":"iana"},
  "application/vnd.osa.netdeploy": {"source":"iana"},
  "application/vnd.osgeo.mapguide.package": {"source":"iana","extensions":["mgp"]},
  "application/vnd.osgi.bundle": {"source":"iana"},
  "application/vnd.osgi.dp": {"source":"iana","extensions":["dp"]},
  "application/vnd.osgi.subsystem": {"source":"iana","extensions":["esa"]},
  "application/vnd.otps.ct-kip+xml": {"source":"iana","compressible":true},
  "application/vnd.oxli.countgraph": {"source":"iana"},
  "application/vnd.pagerduty+json": {"source":"iana","compressible":true},
  "application/vnd.palm": {"source":"iana","extensions":["pdb","pqa","oprc"]},
  "application/vnd.panoply": {"source":"iana"},
  "application/vnd.paos.xml": {"source":"iana"},
  "application/vnd.patentdive": {"source":"iana"},
  "application/vnd.patientecommsdoc": {"source":"iana"},
  "application/vnd.pawaafile": {"source":"iana","extensions":["paw"]},
  "application/vnd.pcos": {"source":"iana"},
  "application/vnd.pg.format": {"source":"iana","extensions":["str"]},
  "application/vnd.pg.osasli": {"source":"iana","extensions":["ei6"]},
  "application/vnd.piaccess.application-licence": {"source":"iana"},
  "application/vnd.picsel": {"source":"iana","extensions":["efif"]},
  "application/vnd.pmi.widget": {"source":"iana","extensions":["wg"]},
  "application/vnd.poc.group-advertisement+xml": {"source":"iana","compressible":true},
  "application/vnd.pocketlearn": {"source":"iana","extensions":["plf"]},
  "application/vnd.powerbuilder6": {"source":"iana","extensions":["pbd"]},
  "application/vnd.powerbuilder6-s": {"source":"iana"},
  "application/vnd.powerbuilder7": {"source":"iana"},
  "application/vnd.powerbuilder7-s": {"source":"iana"},
  "application/vnd.powerbuilder75": {"source":"iana"},
  "application/vnd.powerbuilder75-s": {"source":"iana"},
  "application/vnd.preminet": {"source":"iana"},
  "application/vnd.previewsystems.box": {"source":"iana","extensions":["box"]},
  "application/vnd.procrate.brushset": {"extensions":["brushset"]},
  "application/vnd.procreate.brush": {"extensions":["brush"]},
  "application/vnd.procreate.dream": {"extensions":["drm"]},
  "application/vnd.proteus.magazine": {"source":"iana","extensions":["mgz"]},
  "application/vnd.psfs": {"source":"iana"},
  "application/vnd.pt.mundusmundi": {"source":"iana"},
  "application/vnd.publishare-delta-tree": {"source":"iana","extensions":["qps"]},
  "application/vnd.pvi.ptid1": {"source":"iana","extensions":["ptid"]},
  "application/vnd.pwg-multiplexed": {"source":"iana"},
  "application/vnd.pwg-xhtml-print+xml": {"source":"iana","compressible":true,"extensions":["xhtm"]},
  "application/vnd.qualcomm.brew-app-res": {"source":"iana"},
  "application/vnd.quarantainenet": {"source":"iana"},
  "application/vnd.quark.quarkxpress": {"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},
  "application/vnd.quobject-quoxdocument": {"source":"iana"},
  "application/vnd.radisys.moml+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml-audit+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml-audit-conf+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml-audit-conn+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml-audit-dialog+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml-audit-stream+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml-conf+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml-dialog+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml-dialog-base+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml-dialog-group+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml-dialog-speech+xml": {"source":"iana","compressible":true},
  "application/vnd.radisys.msml-dialog-transform+xml": {"source":"iana","compressible":true},
  "application/vnd.rainstor.data": {"source":"iana"},
  "application/vnd.rapid": {"source":"iana"},
  "application/vnd.rar": {"source":"iana","extensions":["rar"]},
  "application/vnd.realvnc.bed": {"source":"iana","extensions":["bed"]},
  "application/vnd.recordare.musicxml": {"source":"iana","extensions":["mxl"]},
  "application/vnd.recordare.musicxml+xml": {"source":"iana","compressible":true,"extensions":["musicxml"]},
  "application/vnd.relpipe": {"source":"iana"},
  "application/vnd.renlearn.rlprint": {"source":"iana"},
  "application/vnd.resilient.logic": {"source":"iana"},
  "application/vnd.restful+json": {"source":"iana","compressible":true},
  "application/vnd.rig.cryptonote": {"source":"iana","extensions":["cryptonote"]},
  "application/vnd.rim.cod": {"source":"apache","extensions":["cod"]},
  "application/vnd.rn-realmedia": {"source":"apache","extensions":["rm"]},
  "application/vnd.rn-realmedia-vbr": {"source":"apache","extensions":["rmvb"]},
  "application/vnd.route66.link66+xml": {"source":"iana","compressible":true,"extensions":["link66"]},
  "application/vnd.rs-274x": {"source":"iana"},
  "application/vnd.ruckus.download": {"source":"iana"},
  "application/vnd.s3sms": {"source":"iana"},
  "application/vnd.sailingtracker.track": {"source":"iana","extensions":["st"]},
  "application/vnd.sar": {"source":"iana"},
  "application/vnd.sbm.cid": {"source":"iana"},
  "application/vnd.sbm.mid2": {"source":"iana"},
  "application/vnd.scribus": {"source":"iana"},
  "application/vnd.sealed.3df": {"source":"iana"},
  "application/vnd.sealed.csf": {"source":"iana"},
  "application/vnd.sealed.doc": {"source":"iana"},
  "application/vnd.sealed.eml": {"source":"iana"},
  "application/vnd.sealed.mht": {"source":"iana"},
  "application/vnd.sealed.net": {"source":"iana"},
  "application/vnd.sealed.ppt": {"source":"iana"},
  "application/vnd.sealed.tiff": {"source":"iana"},
  "application/vnd.sealed.xls": {"source":"iana"},
  "application/vnd.sealedmedia.softseal.html": {"source":"iana"},
  "application/vnd.sealedmedia.softseal.pdf": {"source":"iana"},
  "application/vnd.seemail": {"source":"iana","extensions":["see"]},
  "application/vnd.seis+json": {"source":"iana","compressible":true},
  "application/vnd.sema": {"source":"iana","extensions":["sema"]},
  "application/vnd.semd": {"source":"iana","extensions":["semd"]},
  "application/vnd.semf": {"source":"iana","extensions":["semf"]},
  "application/vnd.shade-save-file": {"source":"iana"},
  "application/vnd.shana.informed.formdata": {"source":"iana","extensions":["ifm"]},
  "application/vnd.shana.informed.formtemplate": {"source":"iana","extensions":["itp"]},
  "application/vnd.shana.informed.interchange": {"source":"iana","extensions":["iif"]},
  "application/vnd.shana.informed.package": {"source":"iana","extensions":["ipk"]},
  "application/vnd.shootproof+json": {"source":"iana","compressible":true},
  "application/vnd.shopkick+json": {"source":"iana","compressible":true},
  "application/vnd.shp": {"source":"iana"},
  "application/vnd.shx": {"source":"iana"},
  "application/vnd.sigrok.session": {"source":"iana"},
  "application/vnd.simtech-mindmapper": {"source":"iana","extensions":["twd","twds"]},
  "application/vnd.siren+json": {"source":"iana","compressible":true},
  "application/vnd.sketchometry": {"source":"iana"},
  "application/vnd.smaf": {"source":"iana","extensions":["mmf"]},
  "application/vnd.smart.notebook": {"source":"iana"},
  "application/vnd.smart.teacher": {"source":"iana","extensions":["teacher"]},
  "application/vnd.smintio.portals.archive": {"source":"iana"},
  "application/vnd.snesdev-page-table": {"source":"iana"},
  "application/vnd.software602.filler.form+xml": {"source":"iana","compressible":true,"extensions":["fo"]},
  "application/vnd.software602.filler.form-xml-zip": {"source":"iana"},
  "application/vnd.solent.sdkm+xml": {"source":"iana","compressible":true,"extensions":["sdkm","sdkd"]},
  "application/vnd.spotfire.dxp": {"source":"iana","extensions":["dxp"]},
  "application/vnd.spotfire.sfs": {"source":"iana","extensions":["sfs"]},
  "application/vnd.sqlite3": {"source":"iana"},
  "application/vnd.sss-cod": {"source":"iana"},
  "application/vnd.sss-dtf": {"source":"iana"},
  "application/vnd.sss-ntf": {"source":"iana"},
  "application/vnd.stardivision.calc": {"source":"apache","extensions":["sdc"]},
  "application/vnd.stardivision.draw": {"source":"apache","extensions":["sda"]},
  "application/vnd.stardivision.impress": {"source":"apache","extensions":["sdd"]},
  "application/vnd.stardivision.math": {"source":"apache","extensions":["smf"]},
  "application/vnd.stardivision.writer": {"source":"apache","extensions":["sdw","vor"]},
  "application/vnd.stardivision.writer-global": {"source":"apache","extensions":["sgl"]},
  "application/vnd.stepmania.package": {"source":"iana","extensions":["smzip"]},
  "application/vnd.stepmania.stepchart": {"source":"iana","extensions":["sm"]},
  "application/vnd.street-stream": {"source":"iana"},
  "application/vnd.sun.wadl+xml": {"source":"iana","compressible":true,"extensions":["wadl"]},
  "application/vnd.sun.xml.calc": {"source":"apache","extensions":["sxc"]},
  "application/vnd.sun.xml.calc.template": {"source":"apache","extensions":["stc"]},
  "application/vnd.sun.xml.draw": {"source":"apache","extensions":["sxd"]},
  "application/vnd.sun.xml.draw.template": {"source":"apache","extensions":["std"]},
  "application/vnd.sun.xml.impress": {"source":"apache","extensions":["sxi"]},
  "application/vnd.sun.xml.impress.template": {"source":"apache","extensions":["sti"]},
  "application/vnd.sun.xml.math": {"source":"apache","extensions":["sxm"]},
  "application/vnd.sun.xml.writer": {"source":"apache","extensions":["sxw"]},
  "application/vnd.sun.xml.writer.global": {"source":"apache","extensions":["sxg"]},
  "application/vnd.sun.xml.writer.template": {"source":"apache","extensions":["stw"]},
  "application/vnd.sus-calendar": {"source":"iana","extensions":["sus","susp"]},
  "application/vnd.svd": {"source":"iana","extensions":["svd"]},
  "application/vnd.swiftview-ics": {"source":"iana"},
  "application/vnd.sybyl.mol2": {"source":"iana"},
  "application/vnd.sycle+xml": {"source":"iana","compressible":true},
  "application/vnd.syft+json": {"source":"iana","compressible":true},
  "application/vnd.symbian.install": {"source":"apache","extensions":["sis","sisx"]},
  "application/vnd.syncml+xml": {"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xsm"]},
  "application/vnd.syncml.dm+wbxml": {"source":"iana","charset":"UTF-8","extensions":["bdm"]},
  "application/vnd.syncml.dm+xml": {"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xdm"]},
  "application/vnd.syncml.dm.notification": {"source":"iana"},
  "application/vnd.syncml.dmddf+wbxml": {"source":"iana"},
  "application/vnd.syncml.dmddf+xml": {"source":"iana","charset":"UTF-8","compressible":true,"extensions":["ddf"]},
  "application/vnd.syncml.dmtnds+wbxml": {"source":"iana"},
  "application/vnd.syncml.dmtnds+xml": {"source":"iana","charset":"UTF-8","compressible":true},
  "application/vnd.syncml.ds.notification": {"source":"iana"},
  "application/vnd.tableschema+json": {"source":"iana","compressible":true},
  "application/vnd.tao.intent-module-archive": {"source":"iana","extensions":["tao"]},
  "application/vnd.tcpdump.pcap": {"source":"iana","extensions":["pcap","cap","dmp"]},
  "application/vnd.think-cell.ppttc+json": {"source":"iana","compressible":true},
  "application/vnd.tmd.mediaflex.api+xml": {"source":"iana","compressible":true},
  "application/vnd.tml": {"source":"iana"},
  "application/vnd.tmobile-livetv": {"source":"iana","extensions":["tmo"]},
  "application/vnd.tri.onesource": {"source":"iana"},
  "application/vnd.trid.tpt": {"source":"iana","extensions":["tpt"]},
  "application/vnd.triscape.mxs": {"source":"iana","extensions":["mxs"]},
  "application/vnd.trueapp": {"source":"iana","extensions":["tra"]},
  "application/vnd.truedoc": {"source":"iana"},
  "application/vnd.ubisoft.webplayer": {"source":"iana"},
  "application/vnd.ufdl": {"source":"iana","extensions":["ufd","ufdl"]},
  "application/vnd.uic.osdm+json": {"source":"iana","compressible":true},
  "application/vnd.uiq.theme": {"source":"iana","extensions":["utz"]},
  "application/vnd.umajin": {"source":"iana","extensions":["umj"]},
  "application/vnd.unity": {"source":"iana","extensions":["unityweb"]},
  "application/vnd.uoml+xml": {"source":"iana","compressible":true,"extensions":["uoml","uo"]},
  "application/vnd.uplanet.alert": {"source":"iana"},
  "application/vnd.uplanet.alert-wbxml": {"source":"iana"},
  "application/vnd.uplanet.bearer-choice": {"source":"iana"},
  "application/vnd.uplanet.bearer-choice-wbxml": {"source":"iana"},
  "application/vnd.uplanet.cacheop": {"source":"iana"},
  "application/vnd.uplanet.cacheop-wbxml": {"source":"iana"},
  "application/vnd.uplanet.channel": {"source":"iana"},
  "application/vnd.uplanet.channel-wbxml": {"source":"iana"},
  "application/vnd.uplanet.list": {"source":"iana"},
  "application/vnd.uplanet.list-wbxml": {"source":"iana"},
  "application/vnd.uplanet.listcmd": {"source":"iana"},
  "application/vnd.uplanet.listcmd-wbxml": {"source":"iana"},
  "application/vnd.uplanet.signal": {"source":"iana"},
  "application/vnd.uri-map": {"source":"iana"},
  "application/vnd.valve.source.material": {"source":"iana"},
  "application/vnd.vcx": {"source":"iana","extensions":["vcx"]},
  "application/vnd.vd-study": {"source":"iana"},
  "application/vnd.vectorworks": {"source":"iana"},
  "application/vnd.vel+json": {"source":"iana","compressible":true},
  "application/vnd.veraison.tsm-report+cbor": {"source":"iana"},
  "application/vnd.veraison.tsm-report+json": {"source":"iana","compressible":true},
  "application/vnd.verimatrix.vcas": {"source":"iana"},
  "application/vnd.veritone.aion+json": {"source":"iana","compressible":true},
  "application/vnd.veryant.thin": {"source":"iana"},
  "application/vnd.ves.encrypted": {"source":"iana"},
  "application/vnd.vidsoft.vidconference": {"source":"iana"},
  "application/vnd.visio": {"source":"iana","extensions":["vsd","vst","vss","vsw","vsdx","vtx"]},
  "application/vnd.visionary": {"source":"iana","extensions":["vis"]},
  "application/vnd.vividence.scriptfile": {"source":"iana"},
  "application/vnd.vocalshaper.vsp4": {"source":"iana"},
  "application/vnd.vsf": {"source":"iana","extensions":["vsf"]},
  "application/vnd.wap.sic": {"source":"iana"},
  "application/vnd.wap.slc": {"source":"iana"},
  "application/vnd.wap.wbxml": {"source":"iana","charset":"UTF-8","extensions":["wbxml"]},
  "application/vnd.wap.wmlc": {"source":"iana","extensions":["wmlc"]},
  "application/vnd.wap.wmlscriptc": {"source":"iana","extensions":["wmlsc"]},
  "application/vnd.wasmflow.wafl": {"source":"iana"},
  "application/vnd.webturbo": {"source":"iana","extensions":["wtb"]},
  "application/vnd.wfa.dpp": {"source":"iana"},
  "application/vnd.wfa.p2p": {"source":"iana"},
  "application/vnd.wfa.wsc": {"source":"iana"},
  "application/vnd.windows.devicepairing": {"source":"iana"},
  "application/vnd.wmc": {"source":"iana"},
  "application/vnd.wmf.bootstrap": {"source":"iana"},
  "application/vnd.wolfram.mathematica": {"source":"iana"},
  "application/vnd.wolfram.mathematica.package": {"source":"iana"},
  "application/vnd.wolfram.player": {"source":"iana","extensions":["nbp"]},
  "application/vnd.wordlift": {"source":"iana"},
  "application/vnd.wordperfect": {"source":"iana","extensions":["wpd"]},
  "application/vnd.wqd": {"source":"iana","extensions":["wqd"]},
  "application/vnd.wrq-hp3000-labelled": {"source":"iana"},
  "application/vnd.wt.stf": {"source":"iana","extensions":["stf"]},
  "application/vnd.wv.csp+wbxml": {"source":"iana"},
  "application/vnd.wv.csp+xml": {"source":"iana","compressible":true},
  "application/vnd.wv.ssp+xml": {"source":"iana","compressible":true},
  "application/vnd.xacml+json": {"source":"iana","compressible":true},
  "application/vnd.xara": {"source":"iana","extensions":["xar"]},
  "application/vnd.xarin.cpj": {"source":"iana"},
  "application/vnd.xecrets-encrypted": {"source":"iana"},
  "application/vnd.xfdl": {"source":"iana","extensions":["xfdl"]},
  "application/vnd.xfdl.webform": {"source":"iana"},
  "application/vnd.xmi+xml": {"source":"iana","compressible":true},
  "application/vnd.xmpie.cpkg": {"source":"iana"},
  "application/vnd.xmpie.dpkg": {"source":"iana"},
  "application/vnd.xmpie.plan": {"source":"iana"},
  "application/vnd.xmpie.ppkg": {"source":"iana"},
  "application/vnd.xmpie.xlim": {"source":"iana"},
  "application/vnd.yamaha.hv-dic": {"source":"iana","extensions":["hvd"]},
  "application/vnd.yamaha.hv-script": {"source":"iana","extensions":["hvs"]},
  "application/vnd.yamaha.hv-voice": {"source":"iana","extensions":["hvp"]},
  "application/vnd.yamaha.openscoreformat": {"source":"iana","extensions":["osf"]},
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {"source":"iana","compressible":true,"extensions":["osfpvg"]},
  "application/vnd.yamaha.remote-setup": {"source":"iana"},
  "application/vnd.yamaha.smaf-audio": {"source":"iana","extensions":["saf"]},
  "application/vnd.yamaha.smaf-phrase": {"source":"iana","extensions":["spf"]},
  "application/vnd.yamaha.through-ngn": {"source":"iana"},
  "application/vnd.yamaha.tunnel-udpencap": {"source":"iana"},
  "application/vnd.yaoweme": {"source":"iana"},
  "application/vnd.yellowriver-custom-menu": {"source":"iana","extensions":["cmp"]},
  "application/vnd.zul": {"source":"iana","extensions":["zir","zirz"]},
  "application/vnd.zzazz.deck+xml": {"source":"iana","compressible":true,"extensions":["zaz"]},
  "application/voicexml+xml": {"source":"iana","compressible":true,"extensions":["vxml"]},
  "application/voucher-cms+json": {"source":"iana","compressible":true},
  "application/voucher-jws+json": {"source":"iana","compressible":true},
  "application/vp": {"source":"iana"},
  "application/vp+cose": {"source":"iana"},
  "application/vp+jwt": {"source":"iana"},
  "application/vq-rtcpxr": {"source":"iana"},
  "application/wasm": {"source":"iana","compressible":true,"extensions":["wasm"]},
  "application/watcherinfo+xml": {"source":"iana","compressible":true,"extensions":["wif"]},
  "application/webpush-options+json": {"source":"iana","compressible":true},
  "application/whoispp-query": {"source":"iana"},
  "application/whoispp-response": {"source":"iana"},
  "application/widget": {"source":"iana","extensions":["wgt"]},
  "application/winhlp": {"source":"apache","extensions":["hlp"]},
  "application/wita": {"source":"iana"},
  "application/wordperfect5.1": {"source":"iana"},
  "application/wsdl+xml": {"source":"iana","compressible":true,"extensions":["wsdl"]},
  "application/wspolicy+xml": {"source":"iana","compressible":true,"extensions":["wspolicy"]},
  "application/x-7z-compressed": {"source":"apache","compressible":false,"extensions":["7z"]},
  "application/x-abiword": {"source":"apache","extensions":["abw"]},
  "application/x-ace-compressed": {"source":"apache","extensions":["ace"]},
  "application/x-amf": {"source":"apache"},
  "application/x-apple-diskimage": {"source":"apache","extensions":["dmg"]},
  "application/x-arj": {"compressible":false,"extensions":["arj"]},
  "application/x-authorware-bin": {"source":"apache","extensions":["aab","x32","u32","vox"]},
  "application/x-authorware-map": {"source":"apache","extensions":["aam"]},
  "application/x-authorware-seg": {"source":"apache","extensions":["aas"]},
  "application/x-bcpio": {"source":"apache","extensions":["bcpio"]},
  "application/x-bdoc": {"compressible":false,"extensions":["bdoc"]},
  "application/x-bittorrent": {"source":"apache","extensions":["torrent"]},
  "application/x-blender": {"extensions":["blend"]},
  "application/x-blorb": {"source":"apache","extensions":["blb","blorb"]},
  "application/x-bzip": {"source":"apache","compressible":false,"extensions":["bz"]},
  "application/x-bzip2": {"source":"apache","compressible":false,"extensions":["bz2","boz"]},
  "application/x-cbr": {"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},
  "application/x-cdlink": {"source":"apache","extensions":["vcd"]},
  "application/x-cfs-compressed": {"source":"apache","extensions":["cfs"]},
  "application/x-chat": {"source":"apache","extensions":["chat"]},
  "application/x-chess-pgn": {"source":"apache","extensions":["pgn"]},
  "application/x-chrome-extension": {"extensions":["crx"]},
  "application/x-cocoa": {"source":"nginx","extensions":["cco"]},
  "application/x-compress": {"source":"apache"},
  "application/x-compressed": {"extensions":["rar"]},
  "application/x-conference": {"source":"apache","extensions":["nsc"]},
  "application/x-cpio": {"source":"apache","extensions":["cpio"]},
  "application/x-csh": {"source":"apache","extensions":["csh"]},
  "application/x-deb": {"compressible":false},
  "application/x-debian-package": {"source":"apache","extensions":["deb","udeb"]},
  "application/x-dgc-compressed": {"source":"apache","extensions":["dgc"]},
  "application/x-director": {"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},
  "application/x-doom": {"source":"apache","extensions":["wad"]},
  "application/x-dtbncx+xml": {"source":"apache","compressible":true,"extensions":["ncx"]},
  "application/x-dtbook+xml": {"source":"apache","compressible":true,"extensions":["dtb"]},
  "application/x-dtbresource+xml": {"source":"apache","compressible":true,"extensions":["res"]},
  "application/x-dvi": {"source":"apache","compressible":false,"extensions":["dvi"]},
  "application/x-envoy": {"source":"apache","extensions":["evy"]},
  "application/x-eva": {"source":"apache","extensions":["eva"]},
  "application/x-font-bdf": {"source":"apache","extensions":["bdf"]},
  "application/x-font-dos": {"source":"apache"},
  "application/x-font-framemaker": {"source":"apache"},
  "application/x-font-ghostscript": {"source":"apache","extensions":["gsf"]},
  "application/x-font-libgrx": {"source":"apache"},
  "application/x-font-linux-psf": {"source":"apache","extensions":["psf"]},
  "application/x-font-pcf": {"source":"apache","extensions":["pcf"]},
  "application/x-font-snf": {"source":"apache","extensions":["snf"]},
  "application/x-font-speedo": {"source":"apache"},
  "application/x-font-sunos-news": {"source":"apache"},
  "application/x-font-type1": {"source":"apache","extensions":["pfa","pfb","pfm","afm"]},
  "application/x-font-vfont": {"source":"apache"},
  "application/x-freearc": {"source":"apache","extensions":["arc"]},
  "application/x-futuresplash": {"source":"apache","extensions":["spl"]},
  "application/x-gca-compressed": {"source":"apache","extensions":["gca"]},
  "application/x-glulx": {"source":"apache","extensions":["ulx"]},
  "application/x-gnumeric": {"source":"apache","extensions":["gnumeric"]},
  "application/x-gramps-xml": {"source":"apache","extensions":["gramps"]},
  "application/x-gtar": {"source":"apache","extensions":["gtar"]},
  "application/x-gzip": {"source":"apache"},
  "application/x-hdf": {"source":"apache","extensions":["hdf"]},
  "application/x-httpd-php": {"compressible":true,"extensions":["php"]},
  "application/x-install-instructions": {"source":"apache","extensions":["install"]},
  "application/x-ipynb+json": {"compressible":true,"extensions":["ipynb"]},
  "application/x-iso9660-image": {"source":"apache","extensions":["iso"]},
  "application/x-iwork-keynote-sffkey": {"extensions":["key"]},
  "application/x-iwork-numbers-sffnumbers": {"extensions":["numbers"]},
  "application/x-iwork-pages-sffpages": {"extensions":["pages"]},
  "application/x-java-archive-diff": {"source":"nginx","extensions":["jardiff"]},
  "application/x-java-jnlp-file": {"source":"apache","compressible":false,"extensions":["jnlp"]},
  "application/x-javascript": {"compressible":true},
  "application/x-keepass2": {"extensions":["kdbx"]},
  "application/x-latex": {"source":"apache","compressible":false,"extensions":["latex"]},
  "application/x-lua-bytecode": {"extensions":["luac"]},
  "application/x-lzh-compressed": {"source":"apache","extensions":["lzh","lha"]},
  "application/x-makeself": {"source":"nginx","extensions":["run"]},
  "application/x-mie": {"source":"apache","extensions":["mie"]},
  "application/x-mobipocket-ebook": {"source":"apache","extensions":["prc","mobi"]},
  "application/x-mpegurl": {"compressible":false},
  "application/x-ms-application": {"source":"apache","extensions":["application"]},
  "application/x-ms-shortcut": {"source":"apache","extensions":["lnk"]},
  "application/x-ms-wmd": {"source":"apache","extensions":["wmd"]},
  "application/x-ms-wmz": {"source":"apache","extensions":["wmz"]},
  "application/x-ms-xbap": {"source":"apache","extensions":["xbap"]},
  "application/x-msaccess": {"source":"apache","extensions":["mdb"]},
  "application/x-msbinder": {"source":"apache","extensions":["obd"]},
  "application/x-mscardfile": {"source":"apache","extensions":["crd"]},
  "application/x-msclip": {"source":"apache","extensions":["clp"]},
  "application/x-msdos-program": {"extensions":["exe"]},
  "application/x-msdownload": {"source":"apache","extensions":["exe","dll","com","bat","msi"]},
  "application/x-msmediaview": {"source":"apache","extensions":["mvb","m13","m14"]},
  "application/x-msmetafile": {"source":"apache","extensions":["wmf","wmz","emf","emz"]},
  "application/x-msmoney": {"source":"apache","extensions":["mny"]},
  "application/x-mspublisher": {"source":"apache","extensions":["pub"]},
  "application/x-msschedule": {"source":"apache","extensions":["scd"]},
  "application/x-msterminal": {"source":"apache","extensions":["trm"]},
  "application/x-mswrite": {"source":"apache","extensions":["wri"]},
  "application/x-netcdf": {"source":"apache","extensions":["nc","cdf"]},
  "application/x-ns-proxy-autoconfig": {"compressible":true,"extensions":["pac"]},
  "application/x-nzb": {"source":"apache","extensions":["nzb"]},
  "application/x-perl": {"source":"nginx","extensions":["pl","pm"]},
  "application/x-pilot": {"source":"nginx","extensions":["prc","pdb"]},
  "application/x-pkcs12": {"source":"apache","compressible":false,"extensions":["p12","pfx"]},
  "application/x-pkcs7-certificates": {"source":"apache","extensions":["p7b","spc"]},
  "application/x-pkcs7-certreqresp": {"source":"apache","extensions":["p7r"]},
  "application/x-pki-message": {"source":"iana"},
  "application/x-rar-compressed": {"source":"apache","compressible":false,"extensions":["rar"]},
  "application/x-redhat-package-manager": {"source":"nginx","extensions":["rpm"]},
  "application/x-research-info-systems": {"source":"apache","extensions":["ris"]},
  "application/x-sea": {"source":"nginx","extensions":["sea"]},
  "application/x-sh": {"source":"apache","compressible":true,"extensions":["sh"]},
  "application/x-shar": {"source":"apache","extensions":["shar"]},
  "application/x-shockwave-flash": {"source":"apache","compressible":false,"extensions":["swf"]},
  "application/x-silverlight-app": {"source":"apache","extensions":["xap"]},
  "application/x-sql": {"source":"apache","extensions":["sql"]},
  "application/x-stuffit": {"source":"apache","compressible":false,"extensions":["sit"]},
  "application/x-stuffitx": {"source":"apache","extensions":["sitx"]},
  "application/x-subrip": {"source":"apache","extensions":["srt"]},
  "application/x-sv4cpio": {"source":"apache","extensions":["sv4cpio"]},
  "application/x-sv4crc": {"source":"apache","extensions":["sv4crc"]},
  "application/x-t3vm-image": {"source":"apache","extensions":["t3"]},
  "application/x-tads": {"source":"apache","extensions":["gam"]},
  "application/x-tar": {"source":"apache","compressible":true,"extensions":["tar"]},
  "application/x-tcl": {"source":"apache","extensions":["tcl","tk"]},
  "application/x-tex": {"source":"apache","extensions":["tex"]},
  "application/x-tex-tfm": {"source":"apache","extensions":["tfm"]},
  "application/x-texinfo": {"source":"apache","extensions":["texinfo","texi"]},
  "application/x-tgif": {"source":"apache","extensions":["obj"]},
  "application/x-ustar": {"source":"apache","extensions":["ustar"]},
  "application/x-virtualbox-hdd": {"compressible":true,"extensions":["hdd"]},
  "application/x-virtualbox-ova": {"compressible":true,"extensions":["ova"]},
  "application/x-virtualbox-ovf": {"compressible":true,"extensions":["ovf"]},
  "application/x-virtualbox-vbox": {"compressible":true,"extensions":["vbox"]},
  "application/x-virtualbox-vbox-extpack": {"compressible":false,"extensions":["vbox-extpack"]},
  "application/x-virtualbox-vdi": {"compressible":true,"extensions":["vdi"]},
  "application/x-virtualbox-vhd": {"compressible":true,"extensions":["vhd"]},
  "application/x-virtualbox-vmdk": {"compressible":true,"extensions":["vmdk"]},
  "application/x-wais-source": {"source":"apache","extensions":["src"]},
  "application/x-web-app-manifest+json": {"compressible":true,"extensions":["webapp"]},
  "application/x-www-form-urlencoded": {"source":"iana","compressible":true},
  "application/x-x509-ca-cert": {"source":"iana","extensions":["der","crt","pem"]},
  "application/x-x509-ca-ra-cert": {"source":"iana"},
  "application/x-x509-next-ca-cert": {"source":"iana"},
  "application/x-xfig": {"source":"apache","extensions":["fig"]},
  "application/x-xliff+xml": {"source":"apache","compressible":true,"extensions":["xlf"]},
  "application/x-xpinstall": {"source":"apache","compressible":false,"extensions":["xpi"]},
  "application/x-xz": {"source":"apache","extensions":["xz"]},
  "application/x-zip-compressed": {"extensions":["zip"]},
  "application/x-zmachine": {"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},
  "application/x400-bp": {"source":"iana"},
  "application/xacml+xml": {"source":"iana","compressible":true},
  "application/xaml+xml": {"source":"apache","compressible":true,"extensions":["xaml"]},
  "application/xcap-att+xml": {"source":"iana","compressible":true,"extensions":["xav"]},
  "application/xcap-caps+xml": {"source":"iana","compressible":true,"extensions":["xca"]},
  "application/xcap-diff+xml": {"source":"iana","compressible":true,"extensions":["xdf"]},
  "application/xcap-el+xml": {"source":"iana","compressible":true,"extensions":["xel"]},
  "application/xcap-error+xml": {"source":"iana","compressible":true},
  "application/xcap-ns+xml": {"source":"iana","compressible":true,"extensions":["xns"]},
  "application/xcon-conference-info+xml": {"source":"iana","compressible":true},
  "application/xcon-conference-info-diff+xml": {"source":"iana","compressible":true},
  "application/xenc+xml": {"source":"iana","compressible":true,"extensions":["xenc"]},
  "application/xfdf": {"source":"iana","extensions":["xfdf"]},
  "application/xhtml+xml": {"source":"iana","compressible":true,"extensions":["xhtml","xht"]},
  "application/xhtml-voice+xml": {"source":"apache","compressible":true},
  "application/xliff+xml": {"source":"iana","compressible":true,"extensions":["xlf"]},
  "application/xml": {"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},
  "application/xml-dtd": {"source":"iana","compressible":true,"extensions":["dtd"]},
  "application/xml-external-parsed-entity": {"source":"iana"},
  "application/xml-patch+xml": {"source":"iana","compressible":true},
  "application/xmpp+xml": {"source":"iana","compressible":true},
  "application/xop+xml": {"source":"iana","compressible":true,"extensions":["xop"]},
  "application/xproc+xml": {"source":"apache","compressible":true,"extensions":["xpl"]},
  "application/xslt+xml": {"source":"iana","compressible":true,"extensions":["xsl","xslt"]},
  "application/xspf+xml": {"source":"apache","compressible":true,"extensions":["xspf"]},
  "application/xv+xml": {"source":"iana","compressible":true,"extensions":["mxml","xhvml","xvml","xvm"]},
  "application/yaml": {"source":"iana"},
  "application/yang": {"source":"iana","extensions":["yang"]},
  "application/yang-data+cbor": {"source":"iana"},
  "application/yang-data+json": {"source":"iana","compressible":true},
  "application/yang-data+xml": {"source":"iana","compressible":true},
  "application/yang-patch+json": {"source":"iana","compressible":true},
  "application/yang-patch+xml": {"source":"iana","compressible":true},
  "application/yang-sid+json": {"source":"iana","compressible":true},
  "application/yin+xml": {"source":"iana","compressible":true,"extensions":["yin"]},
  "application/zip": {"source":"iana","compressible":false,"extensions":["zip"]},
  "application/zip+dotlottie": {"extensions":["lottie"]},
  "application/zlib": {"source":"iana"},
  "application/zstd": {"source":"iana"},
  "audio/1d-interleaved-parityfec": {"source":"iana"},
  "audio/32kadpcm": {"source":"iana"},
  "audio/3gpp": {"source":"iana","compressible":false,"extensions":["3gpp"]},
  "audio/3gpp2": {"source":"iana"},
  "audio/aac": {"source":"iana","extensions":["adts","aac"]},
  "audio/ac3": {"source":"iana"},
  "audio/adpcm": {"source":"apache","extensions":["adp"]},
  "audio/amr": {"source":"iana","extensions":["amr"]},
  "audio/amr-wb": {"source":"iana"},
  "audio/amr-wb+": {"source":"iana"},
  "audio/aptx": {"source":"iana"},
  "audio/asc": {"source":"iana"},
  "audio/atrac-advanced-lossless": {"source":"iana"},
  "audio/atrac-x": {"source":"iana"},
  "audio/atrac3": {"source":"iana"},
  "audio/basic": {"source":"iana","compressible":false,"extensions":["au","snd"]},
  "audio/bv16": {"source":"iana"},
  "audio/bv32": {"source":"iana"},
  "audio/clearmode": {"source":"iana"},
  "audio/cn": {"source":"iana"},
  "audio/dat12": {"source":"iana"},
  "audio/dls": {"source":"iana"},
  "audio/dsr-es201108": {"source":"iana"},
  "audio/dsr-es202050": {"source":"iana"},
  "audio/dsr-es202211": {"source":"iana"},
  "audio/dsr-es202212": {"source":"iana"},
  "audio/dv": {"source":"iana"},
  "audio/dvi4": {"source":"iana"},
  "audio/eac3": {"source":"iana"},
  "audio/encaprtp": {"source":"iana"},
  "audio/evrc": {"source":"iana"},
  "audio/evrc-qcp": {"source":"iana"},
  "audio/evrc0": {"source":"iana"},
  "audio/evrc1": {"source":"iana"},
  "audio/evrcb": {"source":"iana"},
  "audio/evrcb0": {"source":"iana"},
  "audio/evrcb1": {"source":"iana"},
  "audio/evrcnw": {"source":"iana"},
  "audio/evrcnw0": {"source":"iana"},
  "audio/evrcnw1": {"source":"iana"},
  "audio/evrcwb": {"source":"iana"},
  "audio/evrcwb0": {"source":"iana"},
  "audio/evrcwb1": {"source":"iana"},
  "audio/evs": {"source":"iana"},
  "audio/flac": {"source":"iana"},
  "audio/flexfec": {"source":"iana"},
  "audio/fwdred": {"source":"iana"},
  "audio/g711-0": {"source":"iana"},
  "audio/g719": {"source":"iana"},
  "audio/g722": {"source":"iana"},
  "audio/g7221": {"source":"iana"},
  "audio/g723": {"source":"iana"},
  "audio/g726-16": {"source":"iana"},
  "audio/g726-24": {"source":"iana"},
  "audio/g726-32": {"source":"iana"},
  "audio/g726-40": {"source":"iana"},
  "audio/g728": {"source":"iana"},
  "audio/g729": {"source":"iana"},
  "audio/g7291": {"source":"iana"},
  "audio/g729d": {"source":"iana"},
  "audio/g729e": {"source":"iana"},
  "audio/gsm": {"source":"iana"},
  "audio/gsm-efr": {"source":"iana"},
  "audio/gsm-hr-08": {"source":"iana"},
  "audio/ilbc": {"source":"iana"},
  "audio/ip-mr_v2.5": {"source":"iana"},
  "audio/isac": {"source":"apache"},
  "audio/l16": {"source":"iana"},
  "audio/l20": {"source":"iana"},
  "audio/l24": {"source":"iana","compressible":false},
  "audio/l8": {"source":"iana"},
  "audio/lpc": {"source":"iana"},
  "audio/matroska": {"source":"iana"},
  "audio/melp": {"source":"iana"},
  "audio/melp1200": {"source":"iana"},
  "audio/melp2400": {"source":"iana"},
  "audio/melp600": {"source":"iana"},
  "audio/mhas": {"source":"iana"},
  "audio/midi": {"source":"apache","extensions":["mid","midi","kar","rmi"]},
  "audio/midi-clip": {"source":"iana"},
  "audio/mobile-xmf": {"source":"iana","extensions":["mxmf"]},
  "audio/mp3": {"compressible":false,"extensions":["mp3"]},
  "audio/mp4": {"source":"iana","compressible":false,"extensions":["m4a","mp4a","m4b"]},
  "audio/mp4a-latm": {"source":"iana"},
  "audio/mpa": {"source":"iana"},
  "audio/mpa-robust": {"source":"iana"},
  "audio/mpeg": {"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},
  "audio/mpeg4-generic": {"source":"iana"},
  "audio/musepack": {"source":"apache"},
  "audio/ogg": {"source":"iana","compressible":false,"extensions":["oga","ogg","spx","opus"]},
  "audio/opus": {"source":"iana"},
  "audio/parityfec": {"source":"iana"},
  "audio/pcma": {"source":"iana"},
  "audio/pcma-wb": {"source":"iana"},
  "audio/pcmu": {"source":"iana"},
  "audio/pcmu-wb": {"source":"iana"},
  "audio/prs.sid": {"source":"iana"},
  "audio/qcelp": {"source":"iana"},
  "audio/raptorfec": {"source":"iana"},
  "audio/red": {"source":"iana"},
  "audio/rtp-enc-aescm128": {"source":"iana"},
  "audio/rtp-midi": {"source":"iana"},
  "audio/rtploopback": {"source":"iana"},
  "audio/rtx": {"source":"iana"},
  "audio/s3m": {"source":"apache","extensions":["s3m"]},
  "audio/scip": {"source":"iana"},
  "audio/silk": {"source":"apache","extensions":["sil"]},
  "audio/smv": {"source":"iana"},
  "audio/smv-qcp": {"source":"iana"},
  "audio/smv0": {"source":"iana"},
  "audio/sofa": {"source":"iana"},
  "audio/sp-midi": {"source":"iana"},
  "audio/speex": {"source":"iana"},
  "audio/t140c": {"source":"iana"},
  "audio/t38": {"source":"iana"},
  "audio/telephone-event": {"source":"iana"},
  "audio/tetra_acelp": {"source":"iana"},
  "audio/tetra_acelp_bb": {"source":"iana"},
  "audio/tone": {"source":"iana"},
  "audio/tsvcis": {"source":"iana"},
  "audio/uemclip": {"source":"iana"},
  "audio/ulpfec": {"source":"iana"},
  "audio/usac": {"source":"iana"},
  "audio/vdvi": {"source":"iana"},
  "audio/vmr-wb": {"source":"iana"},
  "audio/vnd.3gpp.iufp": {"source":"iana"},
  "audio/vnd.4sb": {"source":"iana"},
  "audio/vnd.audiokoz": {"source":"iana"},
  "audio/vnd.celp": {"source":"iana"},
  "audio/vnd.cisco.nse": {"source":"iana"},
  "audio/vnd.cmles.radio-events": {"source":"iana"},
  "audio/vnd.cns.anp1": {"source":"iana"},
  "audio/vnd.cns.inf1": {"source":"iana"},
  "audio/vnd.dece.audio": {"source":"iana","extensions":["uva","uvva"]},
  "audio/vnd.digital-winds": {"source":"iana","extensions":["eol"]},
  "audio/vnd.dlna.adts": {"source":"iana"},
  "audio/vnd.dolby.heaac.1": {"source":"iana"},
  "audio/vnd.dolby.heaac.2": {"source":"iana"},
  "audio/vnd.dolby.mlp": {"source":"iana"},
  "audio/vnd.dolby.mps": {"source":"iana"},
  "audio/vnd.dolby.pl2": {"source":"iana"},
  "audio/vnd.dolby.pl2x": {"source":"iana"},
  "audio/vnd.dolby.pl2z": {"source":"iana"},
  "audio/vnd.dolby.pulse.1": {"source":"iana"},
  "audio/vnd.dra": {"source":"iana","extensions":["dra"]},
  "audio/vnd.dts": {"source":"iana","extensions":["dts"]},
  "audio/vnd.dts.hd": {"source":"iana","extensions":["dtshd"]},
  "audio/vnd.dts.uhd": {"source":"iana"},
  "audio/vnd.dvb.file": {"source":"iana"},
  "audio/vnd.everad.plj": {"source":"iana"},
  "audio/vnd.hns.audio": {"source":"iana"},
  "audio/vnd.lucent.voice": {"source":"iana","extensions":["lvp"]},
  "audio/vnd.ms-playready.media.pya": {"source":"iana","extensions":["pya"]},
  "audio/vnd.nokia.mobile-xmf": {"source":"iana"},
  "audio/vnd.nortel.vbk": {"source":"iana"},
  "audio/vnd.nuera.ecelp4800": {"source":"iana","extensions":["ecelp4800"]},
  "audio/vnd.nuera.ecelp7470": {"source":"iana","extensions":["ecelp7470"]},
  "audio/vnd.nuera.ecelp9600": {"source":"iana","extensions":["ecelp9600"]},
  "audio/vnd.octel.sbc": {"source":"iana"},
  "audio/vnd.presonus.multitrack": {"source":"iana"},
  "audio/vnd.qcelp": {"source":"apache"},
  "audio/vnd.rhetorex.32kadpcm": {"source":"iana"},
  "audio/vnd.rip": {"source":"iana","extensions":["rip"]},
  "audio/vnd.rn-realaudio": {"compressible":false},
  "audio/vnd.sealedmedia.softseal.mpeg": {"source":"iana"},
  "audio/vnd.vmx.cvsd": {"source":"iana"},
  "audio/vnd.wave": {"compressible":false},
  "audio/vorbis": {"source":"iana","compressible":false},
  "audio/vorbis-config": {"source":"iana"},
  "audio/wav": {"compressible":false,"extensions":["wav"]},
  "audio/wave": {"compressible":false,"extensions":["wav"]},
  "audio/webm": {"source":"apache","compressible":false,"extensions":["weba"]},
  "audio/x-aac": {"source":"apache","compressible":false,"extensions":["aac"]},
  "audio/x-aiff": {"source":"apache","extensions":["aif","aiff","aifc"]},
  "audio/x-caf": {"source":"apache","compressible":false,"extensions":["caf"]},
  "audio/x-flac": {"source":"apache","extensions":["flac"]},
  "audio/x-m4a": {"source":"nginx","extensions":["m4a"]},
  "audio/x-matroska": {"source":"apache","extensions":["mka"]},
  "audio/x-mpegurl": {"source":"apache","extensions":["m3u"]},
  "audio/x-ms-wax": {"source":"apache","extensions":["wax"]},
  "audio/x-ms-wma": {"source":"apache","extensions":["wma"]},
  "audio/x-pn-realaudio": {"source":"apache","extensions":["ram","ra"]},
  "audio/x-pn-realaudio-plugin": {"source":"apache","extensions":["rmp"]},
  "audio/x-realaudio": {"source":"nginx","extensions":["ra"]},
  "audio/x-tta": {"source":"apache"},
  "audio/x-wav": {"source":"apache","extensions":["wav"]},
  "audio/xm": {"source":"apache","extensions":["xm"]},
  "chemical/x-cdx": {"source":"apache","extensions":["cdx"]},
  "chemical/x-cif": {"source":"apache","extensions":["cif"]},
  "chemical/x-cmdf": {"source":"apache","extensions":["cmdf"]},
  "chemical/x-cml": {"source":"apache","extensions":["cml"]},
  "chemical/x-csml": {"source":"apache","extensions":["csml"]},
  "chemical/x-pdb": {"source":"apache"},
  "chemical/x-xyz": {"source":"apache","extensions":["xyz"]},
  "font/collection": {"source":"iana","extensions":["ttc"]},
  "font/otf": {"source":"iana","compressible":true,"extensions":["otf"]},
  "font/sfnt": {"source":"iana"},
  "font/ttf": {"source":"iana","compressible":true,"extensions":["ttf"]},
  "font/woff": {"source":"iana","extensions":["woff"]},
  "font/woff2": {"source":"iana","extensions":["woff2"]},
  "image/aces": {"source":"iana","extensions":["exr"]},
  "image/apng": {"source":"iana","compressible":false,"extensions":["apng"]},
  "image/avci": {"source":"iana","extensions":["avci"]},
  "image/avcs": {"source":"iana","extensions":["avcs"]},
  "image/avif": {"source":"iana","compressible":false,"extensions":["avif"]},
  "image/bmp": {"source":"iana","compressible":true,"extensions":["bmp","dib"]},
  "image/cgm": {"source":"iana","extensions":["cgm"]},
  "image/dicom-rle": {"source":"iana","extensions":["drle"]},
  "image/dpx": {"source":"iana","extensions":["dpx"]},
  "image/emf": {"source":"iana","extensions":["emf"]},
  "image/fits": {"source":"iana","extensions":["fits"]},
  "image/g3fax": {"source":"iana","extensions":["g3"]},
  "image/gif": {"source":"iana","compressible":false,"extensions":["gif"]},
  "image/heic": {"source":"iana","extensions":["heic"]},
  "image/heic-sequence": {"source":"iana","extensions":["heics"]},
  "image/heif": {"source":"iana","extensions":["heif"]},
  "image/heif-sequence": {"source":"iana","extensions":["heifs"]},
  "image/hej2k": {"source":"iana","extensions":["hej2"]},
  "image/ief": {"source":"iana","extensions":["ief"]},
  "image/j2c": {"source":"iana"},
  "image/jaii": {"source":"iana","extensions":["jaii"]},
  "image/jais": {"source":"iana","extensions":["jais"]},
  "image/jls": {"source":"iana","extensions":["jls"]},
  "image/jp2": {"source":"iana","compressible":false,"extensions":["jp2","jpg2"]},
  "image/jpeg": {"source":"iana","compressible":false,"extensions":["jpg","jpeg","jpe"]},
  "image/jph": {"source":"iana","extensions":["jph"]},
  "image/jphc": {"source":"iana","extensions":["jhc"]},
  "image/jpm": {"source":"iana","compressible":false,"extensions":["jpm","jpgm"]},
  "image/jpx": {"source":"iana","compressible":false,"extensions":["jpx","jpf"]},
  "image/jxl": {"source":"iana","extensions":["jxl"]},
  "image/jxr": {"source":"iana","extensions":["jxr"]},
  "image/jxra": {"source":"iana","extensions":["jxra"]},
  "image/jxrs": {"source":"iana","extensions":["jxrs"]},
  "image/jxs": {"source":"iana","extensions":["jxs"]},
  "image/jxsc": {"source":"iana","extensions":["jxsc"]},
  "image/jxsi": {"source":"iana","extensions":["jxsi"]},
  "image/jxss": {"source":"iana","extensions":["jxss"]},
  "image/ktx": {"source":"iana","extensions":["ktx"]},
  "image/ktx2": {"source":"iana","extensions":["ktx2"]},
  "image/naplps": {"source":"iana"},
  "image/pjpeg": {"compressible":false,"extensions":["jfif"]},
  "image/png": {"source":"iana","compressible":false,"extensions":["png"]},
  "image/prs.btif": {"source":"iana","extensions":["btif","btf"]},
  "image/prs.pti": {"source":"iana","extensions":["pti"]},
  "image/pwg-raster": {"source":"iana"},
  "image/sgi": {"source":"apache","extensions":["sgi"]},
  "image/svg+xml": {"source":"iana","compressible":true,"extensions":["svg","svgz"]},
  "image/t38": {"source":"iana","extensions":["t38"]},
  "image/tiff": {"source":"iana","compressible":false,"extensions":["tif","tiff"]},
  "image/tiff-fx": {"source":"iana","extensions":["tfx"]},
  "image/vnd.adobe.photoshop": {"source":"iana","compressible":true,"extensions":["psd"]},
  "image/vnd.airzip.accelerator.azv": {"source":"iana","extensions":["azv"]},
  "image/vnd.clip": {"source":"iana"},
  "image/vnd.cns.inf2": {"source":"iana"},
  "image/vnd.dece.graphic": {"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},
  "image/vnd.djvu": {"source":"iana","extensions":["djvu","djv"]},
  "image/vnd.dvb.subtitle": {"source":"iana","extensions":["sub"]},
  "image/vnd.dwg": {"source":"iana","extensions":["dwg"]},
  "image/vnd.dxf": {"source":"iana","extensions":["dxf"]},
  "image/vnd.fastbidsheet": {"source":"iana","extensions":["fbs"]},
  "image/vnd.fpx": {"source":"iana","extensions":["fpx"]},
  "image/vnd.fst": {"source":"iana","extensions":["fst"]},
  "image/vnd.fujixerox.edmics-mmr": {"source":"iana","extensions":["mmr"]},
  "image/vnd.fujixerox.edmics-rlc": {"source":"iana","extensions":["rlc"]},
  "image/vnd.globalgraphics.pgb": {"source":"iana"},
  "image/vnd.microsoft.icon": {"source":"iana","compressible":true,"extensions":["ico"]},
  "image/vnd.mix": {"source":"iana"},
  "image/vnd.mozilla.apng": {"source":"iana"},
  "image/vnd.ms-dds": {"compressible":true,"extensions":["dds"]},
  "image/vnd.ms-modi": {"source":"iana","extensions":["mdi"]},
  "image/vnd.ms-photo": {"source":"apache","extensions":["wdp"]},
  "image/vnd.net-fpx": {"source":"iana","extensions":["npx"]},
  "image/vnd.pco.b16": {"source":"iana","extensions":["b16"]},
  "image/vnd.radiance": {"source":"iana"},
  "image/vnd.sealed.png": {"source":"iana"},
  "image/vnd.sealedmedia.softseal.gif": {"source":"iana"},
  "image/vnd.sealedmedia.softseal.jpg": {"source":"iana"},
  "image/vnd.svf": {"source":"iana"},
  "image/vnd.tencent.tap": {"source":"iana","extensions":["tap"]},
  "image/vnd.valve.source.texture": {"source":"iana","extensions":["vtf"]},
  "image/vnd.wap.wbmp": {"source":"iana","extensions":["wbmp"]},
  "image/vnd.xiff": {"source":"iana","extensions":["xif"]},
  "image/vnd.zbrush.pcx": {"source":"iana","extensions":["pcx"]},
  "image/webp": {"source":"iana","extensions":["webp"]},
  "image/wmf": {"source":"iana","extensions":["wmf"]},
  "image/x-3ds": {"source":"apache","extensions":["3ds"]},
  "image/x-adobe-dng": {"extensions":["dng"]},
  "image/x-cmu-raster": {"source":"apache","extensions":["ras"]},
  "image/x-cmx": {"source":"apache","extensions":["cmx"]},
  "image/x-emf": {"source":"iana"},
  "image/x-freehand": {"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},
  "image/x-icon": {"source":"apache","compressible":true,"extensions":["ico"]},
  "image/x-jng": {"source":"nginx","extensions":["jng"]},
  "image/x-mrsid-image": {"source":"apache","extensions":["sid"]},
  "image/x-ms-bmp": {"source":"nginx","compressible":true,"extensions":["bmp"]},
  "image/x-pcx": {"source":"apache","extensions":["pcx"]},
  "image/x-pict": {"source":"apache","extensions":["pic","pct"]},
  "image/x-portable-anymap": {"source":"apache","extensions":["pnm"]},
  "image/x-portable-bitmap": {"source":"apache","extensions":["pbm"]},
  "image/x-portable-graymap": {"source":"apache","extensions":["pgm"]},
  "image/x-portable-pixmap": {"source":"apache","extensions":["ppm"]},
  "image/x-rgb": {"source":"apache","extensions":["rgb"]},
  "image/x-tga": {"source":"apache","extensions":["tga"]},
  "image/x-wmf": {"source":"iana"},
  "image/x-xbitmap": {"source":"apache","extensions":["xbm"]},
  "image/x-xcf": {"compressible":false},
  "image/x-xpixmap": {"source":"apache","extensions":["xpm"]},
  "image/x-xwindowdump": {"source":"apache","extensions":["xwd"]},
  "message/bhttp": {"source":"iana"},
  "message/cpim": {"source":"iana"},
  "message/delivery-status": {"source":"iana"},
  "message/disposition-notification": {"source":"iana","extensions":["disposition-notification"]},
  "message/external-body": {"source":"iana"},
  "message/feedback-report": {"source":"iana"},
  "message/global": {"source":"iana","extensions":["u8msg"]},
  "message/global-delivery-status": {"source":"iana","extensions":["u8dsn"]},
  "message/global-disposition-notification": {"source":"iana","extensions":["u8mdn"]},
  "message/global-headers": {"source":"iana","extensions":["u8hdr"]},
  "message/http": {"source":"iana","compressible":false},
  "message/imdn+xml": {"source":"iana","compressible":true},
  "message/mls": {"source":"iana"},
  "message/news": {"source":"apache"},
  "message/ohttp-req": {"source":"iana"},
  "message/ohttp-res": {"source":"iana"},
  "message/partial": {"source":"iana","compressible":false},
  "message/rfc822": {"source":"iana","compressible":true,"extensions":["eml","mime","mht","mhtml"]},
  "message/s-http": {"source":"apache"},
  "message/sip": {"source":"iana"},
  "message/sipfrag": {"source":"iana"},
  "message/tracking-status": {"source":"iana"},
  "message/vnd.si.simp": {"source":"apache"},
  "message/vnd.wfa.wsc": {"source":"iana","extensions":["wsc"]},
  "model/3mf": {"source":"iana","extensions":["3mf"]},
  "model/e57": {"source":"iana"},
  "model/gltf+json": {"source":"iana","compressible":true,"extensions":["gltf"]},
  "model/gltf-binary": {"source":"iana","compressible":true,"extensions":["glb"]},
  "model/iges": {"source":"iana","compressible":false,"extensions":["igs","iges"]},
  "model/jt": {"source":"iana","extensions":["jt"]},
  "model/mesh": {"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},
  "model/mtl": {"source":"iana","extensions":["mtl"]},
  "model/obj": {"source":"iana","extensions":["obj"]},
  "model/prc": {"source":"iana","extensions":["prc"]},
  "model/step": {"source":"iana","extensions":["step","stp","stpnc","p21","210"]},
  "model/step+xml": {"source":"iana","compressible":true,"extensions":["stpx"]},
  "model/step+zip": {"source":"iana","compressible":false,"extensions":["stpz"]},
  "model/step-xml+zip": {"source":"iana","compressible":false,"extensions":["stpxz"]},
  "model/stl": {"source":"iana","extensions":["stl"]},
  "model/u3d": {"source":"iana","extensions":["u3d"]},
  "model/vnd.bary": {"source":"iana","extensions":["bary"]},
  "model/vnd.cld": {"source":"iana","extensions":["cld"]},
  "model/vnd.collada+xml": {"source":"iana","compressible":true,"extensions":["dae"]},
  "model/vnd.dwf": {"source":"iana","extensions":["dwf"]},
  "model/vnd.flatland.3dml": {"source":"iana"},
  "model/vnd.gdl": {"source":"iana","extensions":["gdl"]},
  "model/vnd.gs-gdl": {"source":"apache"},
  "model/vnd.gs.gdl": {"source":"iana"},
  "model/vnd.gtw": {"source":"iana","extensions":["gtw"]},
  "model/vnd.moml+xml": {"source":"iana","compressible":true},
  "model/vnd.mts": {"source":"iana","extensions":["mts"]},
  "model/vnd.opengex": {"source":"iana","extensions":["ogex"]},
  "model/vnd.parasolid.transmit.binary": {"source":"iana","extensions":["x_b"]},
  "model/vnd.parasolid.transmit.text": {"source":"iana","extensions":["x_t"]},
  "model/vnd.pytha.pyox": {"source":"iana","extensions":["pyo","pyox"]},
  "model/vnd.rosette.annotated-data-model": {"source":"iana"},
  "model/vnd.sap.vds": {"source":"iana","extensions":["vds"]},
  "model/vnd.usda": {"source":"iana","extensions":["usda"]},
  "model/vnd.usdz+zip": {"source":"iana","compressible":false,"extensions":["usdz"]},
  "model/vnd.valve.source.compiled-map": {"source":"iana","extensions":["bsp"]},
  "model/vnd.vtu": {"source":"iana","extensions":["vtu"]},
  "model/vrml": {"source":"iana","compressible":false,"extensions":["wrl","vrml"]},
  "model/x3d+binary": {"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},
  "model/x3d+fastinfoset": {"source":"iana","extensions":["x3db"]},
  "model/x3d+vrml": {"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},
  "model/x3d+xml": {"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},
  "model/x3d-vrml": {"source":"iana","extensions":["x3dv"]},
  "multipart/alternative": {"source":"iana","compressible":false},
  "multipart/appledouble": {"source":"iana"},
  "multipart/byteranges": {"source":"iana"},
  "multipart/digest": {"source":"iana"},
  "multipart/encrypted": {"source":"iana","compressible":false},
  "multipart/form-data": {"source":"iana","compressible":false},
  "multipart/header-set": {"source":"iana"},
  "multipart/mixed": {"source":"iana"},
  "multipart/multilingual": {"source":"iana"},
  "multipart/parallel": {"source":"iana"},
  "multipart/related": {"source":"iana","compressible":false},
  "multipart/report": {"source":"iana"},
  "multipart/signed": {"source":"iana","compressible":false},
  "multipart/vnd.bint.med-plus": {"source":"iana"},
  "multipart/voice-message": {"source":"iana"},
  "multipart/x-mixed-replace": {"source":"iana"},
  "text/1d-interleaved-parityfec": {"source":"iana"},
  "text/cache-manifest": {"source":"iana","compressible":true,"extensions":["appcache","manifest"]},
  "text/calendar": {"source":"iana","extensions":["ics","ifb"]},
  "text/calender": {"compressible":true},
  "text/cmd": {"compressible":true},
  "text/coffeescript": {"extensions":["coffee","litcoffee"]},
  "text/cql": {"source":"iana"},
  "text/cql-expression": {"source":"iana"},
  "text/cql-identifier": {"source":"iana"},
  "text/css": {"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},
  "text/csv": {"source":"iana","compressible":true,"extensions":["csv"]},
  "text/csv-schema": {"source":"iana"},
  "text/directory": {"source":"iana"},
  "text/dns": {"source":"iana"},
  "text/ecmascript": {"source":"apache"},
  "text/encaprtp": {"source":"iana"},
  "text/enriched": {"source":"iana"},
  "text/fhirpath": {"source":"iana"},
  "text/flexfec": {"source":"iana"},
  "text/fwdred": {"source":"iana"},
  "text/gff3": {"source":"iana"},
  "text/grammar-ref-list": {"source":"iana"},
  "text/hl7v2": {"source":"iana"},
  "text/html": {"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},
  "text/jade": {"extensions":["jade"]},
  "text/javascript": {"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},
  "text/jcr-cnd": {"source":"iana"},
  "text/jsx": {"compressible":true,"extensions":["jsx"]},
  "text/less": {"compressible":true,"extensions":["less"]},
  "text/markdown": {"source":"iana","compressible":true,"extensions":["md","markdown"]},
  "text/mathml": {"source":"nginx","extensions":["mml"]},
  "text/mdx": {"compressible":true,"extensions":["mdx"]},
  "text/mizar": {"source":"iana"},
  "text/n3": {"source":"iana","charset":"UTF-8","compressible":true,"extensions":["n3"]},
  "text/parameters": {"source":"iana","charset":"UTF-8"},
  "text/parityfec": {"source":"iana"},
  "text/plain": {"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},
  "text/provenance-notation": {"source":"iana","charset":"UTF-8"},
  "text/prs.fallenstein.rst": {"source":"iana"},
  "text/prs.lines.tag": {"source":"iana","extensions":["dsc"]},
  "text/prs.prop.logic": {"source":"iana"},
  "text/prs.texi": {"source":"iana"},
  "text/raptorfec": {"source":"iana"},
  "text/red": {"source":"iana"},
  "text/rfc822-headers": {"source":"iana"},
  "text/richtext": {"source":"iana","compressible":true,"extensions":["rtx"]},
  "text/rtf": {"source":"iana","compressible":true,"extensions":["rtf"]},
  "text/rtp-enc-aescm128": {"source":"iana"},
  "text/rtploopback": {"source":"iana"},
  "text/rtx": {"source":"iana"},
  "text/sgml": {"source":"iana","extensions":["sgml","sgm"]},
  "text/shaclc": {"source":"iana"},
  "text/shex": {"source":"iana","extensions":["shex"]},
  "text/slim": {"extensions":["slim","slm"]},
  "text/spdx": {"source":"iana","extensions":["spdx"]},
  "text/strings": {"source":"iana"},
  "text/stylus": {"extensions":["stylus","styl"]},
  "text/t140": {"source":"iana"},
  "text/tab-separated-values": {"source":"iana","compressible":true,"extensions":["tsv"]},
  "text/troff": {"source":"iana","extensions":["t","tr","roff","man","me","ms"]},
  "text/turtle": {"source":"iana","charset":"UTF-8","extensions":["ttl"]},
  "text/ulpfec": {"source":"iana"},
  "text/uri-list": {"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},
  "text/vcard": {"source":"iana","compressible":true,"extensions":["vcard"]},
  "text/vnd.a": {"source":"iana"},
  "text/vnd.abc": {"source":"iana"},
  "text/vnd.ascii-art": {"source":"iana"},
  "text/vnd.curl": {"source":"iana","extensions":["curl"]},
  "text/vnd.curl.dcurl": {"source":"apache","extensions":["dcurl"]},
  "text/vnd.curl.mcurl": {"source":"apache","extensions":["mcurl"]},
  "text/vnd.curl.scurl": {"source":"apache","extensions":["scurl"]},
  "text/vnd.debian.copyright": {"source":"iana","charset":"UTF-8"},
  "text/vnd.dmclientscript": {"source":"iana"},
  "text/vnd.dvb.subtitle": {"source":"iana","extensions":["sub"]},
  "text/vnd.esmertec.theme-descriptor": {"source":"iana","charset":"UTF-8"},
  "text/vnd.exchangeable": {"source":"iana"},
  "text/vnd.familysearch.gedcom": {"source":"iana","extensions":["ged"]},
  "text/vnd.ficlab.flt": {"source":"iana"},
  "text/vnd.fly": {"source":"iana","extensions":["fly"]},
  "text/vnd.fmi.flexstor": {"source":"iana","extensions":["flx"]},
  "text/vnd.gml": {"source":"iana"},
  "text/vnd.graphviz": {"source":"iana","extensions":["gv"]},
  "text/vnd.hans": {"source":"iana"},
  "text/vnd.hgl": {"source":"iana"},
  "text/vnd.in3d.3dml": {"source":"iana","extensions":["3dml"]},
  "text/vnd.in3d.spot": {"source":"iana","extensions":["spot"]},
  "text/vnd.iptc.newsml": {"source":"iana"},
  "text/vnd.iptc.nitf": {"source":"iana"},
  "text/vnd.latex-z": {"source":"iana"},
  "text/vnd.motorola.reflex": {"source":"iana"},
  "text/vnd.ms-mediapackage": {"source":"iana"},
  "text/vnd.net2phone.commcenter.command": {"source":"iana"},
  "text/vnd.radisys.msml-basic-layout": {"source":"iana"},
  "text/vnd.senx.warpscript": {"source":"iana"},
  "text/vnd.si.uricatalogue": {"source":"apache"},
  "text/vnd.sosi": {"source":"iana"},
  "text/vnd.sun.j2me.app-descriptor": {"source":"iana","charset":"UTF-8","extensions":["jad"]},
  "text/vnd.trolltech.linguist": {"source":"iana","charset":"UTF-8"},
  "text/vnd.vcf": {"source":"iana"},
  "text/vnd.wap.si": {"source":"iana"},
  "text/vnd.wap.sl": {"source":"iana"},
  "text/vnd.wap.wml": {"source":"iana","extensions":["wml"]},
  "text/vnd.wap.wmlscript": {"source":"iana","extensions":["wmls"]},
  "text/vnd.zoo.kcl": {"source":"iana"},
  "text/vtt": {"source":"iana","charset":"UTF-8","compressible":true,"extensions":["vtt"]},
  "text/wgsl": {"source":"iana","extensions":["wgsl"]},
  "text/x-asm": {"source":"apache","extensions":["s","asm"]},
  "text/x-c": {"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},
  "text/x-component": {"source":"nginx","extensions":["htc"]},
  "text/x-fortran": {"source":"apache","extensions":["f","for","f77","f90"]},
  "text/x-gwt-rpc": {"compressible":true},
  "text/x-handlebars-template": {"extensions":["hbs"]},
  "text/x-java-source": {"source":"apache","extensions":["java"]},
  "text/x-jquery-tmpl": {"compressible":true},
  "text/x-lua": {"extensions":["lua"]},
  "text/x-markdown": {"compressible":true,"extensions":["mkd"]},
  "text/x-nfo": {"source":"apache","extensions":["nfo"]},
  "text/x-opml": {"source":"apache","extensions":["opml"]},
  "text/x-org": {"compressible":true,"extensions":["org"]},
  "text/x-pascal": {"source":"apache","extensions":["p","pas"]},
  "text/x-processing": {"compressible":true,"extensions":["pde"]},
  "text/x-sass": {"extensions":["sass"]},
  "text/x-scss": {"extensions":["scss"]},
  "text/x-setext": {"source":"apache","extensions":["etx"]},
  "text/x-sfv": {"source":"apache","extensions":["sfv"]},
  "text/x-suse-ymp": {"compressible":true,"extensions":["ymp"]},
  "text/x-uuencode": {"source":"apache","extensions":["uu"]},
  "text/x-vcalendar": {"source":"apache","extensions":["vcs"]},
  "text/x-vcard": {"source":"apache","extensions":["vcf"]},
  "text/xml": {"source":"iana","compressible":true,"extensions":["xml"]},
  "text/xml-external-parsed-entity": {"source":"iana"},
  "text/yaml": {"compressible":true,"extensions":["yaml","yml"]},
  "video/1d-interleaved-parityfec": {"source":"iana"},
  "video/3gpp": {"source":"iana","extensions":["3gp","3gpp"]},
  "video/3gpp-tt": {"source":"iana"},
  "video/3gpp2": {"source":"iana","extensions":["3g2"]},
  "video/av1": {"source":"iana"},
  "video/bmpeg": {"source":"iana"},
  "video/bt656": {"source":"iana"},
  "video/celb": {"source":"iana"},
  "video/dv": {"source":"iana"},
  "video/encaprtp": {"source":"iana"},
  "video/evc": {"source":"iana"},
  "video/ffv1": {"source":"iana"},
  "video/flexfec": {"source":"iana"},
  "video/h261": {"source":"iana","extensions":["h261"]},
  "video/h263": {"source":"iana","extensions":["h263"]},
  "video/h263-1998": {"source":"iana"},
  "video/h263-2000": {"source":"iana"},
  "video/h264": {"source":"iana","extensions":["h264"]},
  "video/h264-rcdo": {"source":"iana"},
  "video/h264-svc": {"source":"iana"},
  "video/h265": {"source":"iana"},
  "video/h266": {"source":"iana"},
  "video/iso.segment": {"source":"iana","extensions":["m4s"]},
  "video/jpeg": {"source":"iana","extensions":["jpgv"]},
  "video/jpeg2000": {"source":"iana"},
  "video/jpm": {"source":"apache","extensions":["jpm","jpgm"]},
  "video/jxsv": {"source":"iana"},
  "video/lottie+json": {"source":"iana","compressible":true},
  "video/matroska": {"source":"iana"},
  "video/matroska-3d": {"source":"iana"},
  "video/mj2": {"source":"iana","extensions":["mj2","mjp2"]},
  "video/mp1s": {"source":"iana"},
  "video/mp2p": {"source":"iana"},
  "video/mp2t": {"source":"iana","extensions":["ts","m2t","m2ts","mts"]},
  "video/mp4": {"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},
  "video/mp4v-es": {"source":"iana"},
  "video/mpeg": {"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},
  "video/mpeg4-generic": {"source":"iana"},
  "video/mpv": {"source":"iana"},
  "video/nv": {"source":"iana"},
  "video/ogg": {"source":"iana","compressible":false,"extensions":["ogv"]},
  "video/parityfec": {"source":"iana"},
  "video/pointer": {"source":"iana"},
  "video/quicktime": {"source":"iana","compressible":false,"extensions":["qt","mov"]},
  "video/raptorfec": {"source":"iana"},
  "video/raw": {"source":"iana"},
  "video/rtp-enc-aescm128": {"source":"iana"},
  "video/rtploopback": {"source":"iana"},
  "video/rtx": {"source":"iana"},
  "video/scip": {"source":"iana"},
  "video/smpte291": {"source":"iana"},
  "video/smpte292m": {"source":"iana"},
  "video/ulpfec": {"source":"iana"},
  "video/vc1": {"source":"iana"},
  "video/vc2": {"source":"iana"},
  "video/vnd.cctv": {"source":"iana"},
  "video/vnd.dece.hd": {"source":"iana","extensions":["uvh","uvvh"]},
  "video/vnd.dece.mobile": {"source":"iana","extensions":["uvm","uvvm"]},
  "video/vnd.dece.mp4": {"source":"iana"},
  "video/vnd.dece.pd": {"source":"iana","extensions":["uvp","uvvp"]},
  "video/vnd.dece.sd": {"source":"iana","extensions":["uvs","uvvs"]},
  "video/vnd.dece.video": {"source":"iana","extensions":["uvv","uvvv"]},
  "video/vnd.directv.mpeg": {"source":"iana"},
  "video/vnd.directv.mpeg-tts": {"source":"iana"},
  "video/vnd.dlna.mpeg-tts": {"source":"iana"},
  "video/vnd.dvb.file": {"source":"iana","extensions":["dvb"]},
  "video/vnd.fvt": {"source":"iana","extensions":["fvt"]},
  "video/vnd.hns.video": {"source":"iana"},
  "video/vnd.iptvforum.1dparityfec-1010": {"source":"iana"},
  "video/vnd.iptvforum.1dparityfec-2005": {"source":"iana"},
  "video/vnd.iptvforum.2dparityfec-1010": {"source":"iana"},
  "video/vnd.iptvforum.2dparityfec-2005": {"source":"iana"},
  "video/vnd.iptvforum.ttsavc": {"source":"iana"},
  "video/vnd.iptvforum.ttsmpeg2": {"source":"iana"},
  "video/vnd.motorola.video": {"source":"iana"},
  "video/vnd.motorola.videop": {"source":"iana"},
  "video/vnd.mpegurl": {"source":"iana","extensions":["mxu","m4u"]},
  "video/vnd.ms-playready.media.pyv": {"source":"iana","extensions":["pyv"]},
  "video/vnd.nokia.interleaved-multimedia": {"source":"iana"},
  "video/vnd.nokia.mp4vr": {"source":"iana"},
  "video/vnd.nokia.videovoip": {"source":"iana"},
  "video/vnd.objectvideo": {"source":"iana"},
  "video/vnd.planar": {"source":"iana"},
  "video/vnd.radgamettools.bink": {"source":"iana"},
  "video/vnd.radgamettools.smacker": {"source":"apache"},
  "video/vnd.sealed.mpeg1": {"source":"iana"},
  "video/vnd.sealed.mpeg4": {"source":"iana"},
  "video/vnd.sealed.swf": {"source":"iana"},
  "video/vnd.sealedmedia.softseal.mov": {"source":"iana"},
  "video/vnd.uvvu.mp4": {"source":"iana","extensions":["uvu","uvvu"]},
  "video/vnd.vivo": {"source":"iana","extensions":["viv"]},
  "video/vnd.youtube.yt": {"source":"iana"},
  "video/vp8": {"source":"iana"},
  "video/vp9": {"source":"iana"},
  "video/webm": {"source":"apache","compressible":false,"extensions":["webm"]},
  "video/x-f4v": {"source":"apache","extensions":["f4v"]},
  "video/x-fli": {"source":"apache","extensions":["fli"]},
  "video/x-flv": {"source":"apache","compressible":false,"extensions":["flv"]},
  "video/x-m4v": {"source":"apache","extensions":["m4v"]},
  "video/x-matroska": {"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},
  "video/x-mng": {"source":"apache","extensions":["mng"]},
  "video/x-ms-asf": {"source":"apache","extensions":["asf","asx"]},
  "video/x-ms-vob": {"source":"apache","extensions":["vob"]},
  "video/x-ms-wm": {"source":"apache","extensions":["wm"]},
  "video/x-ms-wmv": {"source":"apache","compressible":false,"extensions":["wmv"]},
  "video/x-ms-wmx": {"source":"apache","extensions":["wmx"]},
  "video/x-ms-wvx": {"source":"apache","extensions":["wvx"]},
  "video/x-msvideo": {"source":"apache","extensions":["avi"]},
  "video/x-sgi-movie": {"source":"apache","extensions":["movie"]},
  "video/x-smv": {"source":"apache","extensions":["smv"]},
  "x-conference/x-cooltalk": {"source":"apache","extensions":["ice"]},
  "x-shader/x-fragment": {"compressible":true},
  "x-shader/x-vertex": {"compressible":true},
};

/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

var mimeDb;
var hasRequiredMimeDb;

function requireMimeDb () {
	if (hasRequiredMimeDb) return mimeDb;
	hasRequiredMimeDb = 1;
	/**
	 * Module exports.
	 */

	mimeDb = require$$0;
	return mimeDb;
}

var mimeScore;
var hasRequiredMimeScore;

function requireMimeScore () {
	if (hasRequiredMimeScore) return mimeScore;
	hasRequiredMimeScore = 1;
	// 'mime-score' back-ported to CommonJS

	// Score RFC facets (see https://tools.ietf.org/html/rfc6838#section-3)
	var FACET_SCORES = {
	  'prs.': 100,
	  'x-': 200,
	  'x.': 300,
	  'vnd.': 400,
	  default: 900
	};

	// Score mime source (Logic originally from `jshttp/mime-types` module)
	var SOURCE_SCORES = {
	  nginx: 10,
	  apache: 20,
	  iana: 40,
	  default: 30 // definitions added by `jshttp/mime-db` project?
	};

	var TYPE_SCORES = {
	  // prefer application/xml over text/xml
	  // prefer application/rtf over text/rtf
	  application: 1,

	  // prefer font/woff over application/font-woff
	  font: 2,

	  // prefer video/mp4 over audio/mp4 over application/mp4
	  // See https://www.rfc-editor.org/rfc/rfc4337.html#section-2
	  audio: 2,
	  video: 3,

	  default: 0
	};

	/**
	 * Get each component of the score for a mime type.  The sum of these is the
	 * total score.  The higher the score, the more "official" the type.
	 */
	mimeScore = function mimeScore (mimeType, source = 'default') {
	  if (mimeType === 'application/octet-stream') {
	    return 0
	  }

	  const [type, subtype] = mimeType.split('/');

	  const facet = subtype.replace(/(\.|x-).*/, '$1');

	  const facetScore = FACET_SCORES[facet] || FACET_SCORES.default;
	  const sourceScore = SOURCE_SCORES[source] || SOURCE_SCORES.default;
	  const typeScore = TYPE_SCORES[type] || TYPE_SCORES.default;

	  // All else being equal prefer shorter types
	  const lengthScore = 1 - mimeType.length / 100;

	  return facetScore + sourceScore + typeScore + lengthScore
	};
	return mimeScore;
}

/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

var hasRequiredMimeTypes;

function requireMimeTypes () {
	if (hasRequiredMimeTypes) return mimeTypes;
	hasRequiredMimeTypes = 1;
	(function (exports) {

		/**
		 * Module dependencies.
		 * @private
		 */

		var db = requireMimeDb();
		var extname = require$$0$2.extname;
		var mimeScore = requireMimeScore();

		/**
		 * Module variables.
		 * @private
		 */

		var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
		var TEXT_TYPE_REGEXP = /^text\//i;

		/**
		 * Module exports.
		 * @public
		 */

		exports.charset = charset;
		exports.charsets = { lookup: charset };
		exports.contentType = contentType;
		exports.extension = extension;
		exports.extensions = Object.create(null);
		exports.lookup = lookup;
		exports.types = Object.create(null);
		exports._extensionConflicts = [];

		// Populate the extensions/types maps
		populateMaps(exports.extensions, exports.types);

		/**
		 * Get the default charset for a MIME type.
		 *
		 * @param {string} type
		 * @return {false|string}
		 */

		function charset (type) {
		  if (!type || typeof type !== 'string') {
		    return false
		  }

		  // TODO: use media-typer
		  var match = EXTRACT_TYPE_REGEXP.exec(type);
		  var mime = match && db[match[1].toLowerCase()];

		  if (mime && mime.charset) {
		    return mime.charset
		  }

		  // default text/* to utf-8
		  if (match && TEXT_TYPE_REGEXP.test(match[1])) {
		    return 'UTF-8'
		  }

		  return false
		}

		/**
		 * Create a full Content-Type header given a MIME type or extension.
		 *
		 * @param {string} str
		 * @return {false|string}
		 */

		function contentType (str) {
		  // TODO: should this even be in this module?
		  if (!str || typeof str !== 'string') {
		    return false
		  }

		  var mime = str.indexOf('/') === -1 ? exports.lookup(str) : str;

		  if (!mime) {
		    return false
		  }

		  // TODO: use content-type or other module
		  if (mime.indexOf('charset') === -1) {
		    var charset = exports.charset(mime);
		    if (charset) mime += '; charset=' + charset.toLowerCase();
		  }

		  return mime
		}

		/**
		 * Get the default extension for a MIME type.
		 *
		 * @param {string} type
		 * @return {false|string}
		 */

		function extension (type) {
		  if (!type || typeof type !== 'string') {
		    return false
		  }

		  // TODO: use media-typer
		  var match = EXTRACT_TYPE_REGEXP.exec(type);

		  // get extensions
		  var exts = match && exports.extensions[match[1].toLowerCase()];

		  if (!exts || !exts.length) {
		    return false
		  }

		  return exts[0]
		}

		/**
		 * Lookup the MIME type for a file path/extension.
		 *
		 * @param {string} path
		 * @return {false|string}
		 */

		function lookup (path) {
		  if (!path || typeof path !== 'string') {
		    return false
		  }

		  // get the extension ("ext" or ".ext" or full path)
		  var extension = extname('x.' + path)
		    .toLowerCase()
		    .slice(1);

		  if (!extension) {
		    return false
		  }

		  return exports.types[extension] || false
		}

		/**
		 * Populate the extensions and types maps.
		 * @private
		 */

		function populateMaps (extensions, types) {
		  Object.keys(db).forEach(function forEachMimeType (type) {
		    var mime = db[type];
		    var exts = mime.extensions;

		    if (!exts || !exts.length) {
		      return
		    }

		    // mime -> extensions
		    extensions[type] = exts;

		    // extension -> mime
		    for (var i = 0; i < exts.length; i++) {
		      var extension = exts[i];
		      types[extension] = _preferredType(extension, types[extension], type);

		      // DELETE (eventually): Capture extension->type maps that change as a
		      // result of switching to mime-score.  This is just to help make reviewing
		      // PR #119 easier, and can be removed once that PR is approved.
		      const legacyType = _preferredTypeLegacy(
		        extension,
		        types[extension],
		        type
		      );
		      if (legacyType !== types[extension]) {
		        exports._extensionConflicts.push([extension, legacyType, types[extension]]);
		      }
		    }
		  });
		}

		// Resolve type conflict using mime-score
		function _preferredType (ext, type0, type1) {
		  var score0 = type0 ? mimeScore(type0, db[type0].source) : 0;
		  var score1 = type1 ? mimeScore(type1, db[type1].source) : 0;

		  return score0 > score1 ? type0 : type1
		}

		// Resolve type conflict using pre-mime-score logic
		function _preferredTypeLegacy (ext, type0, type1) {
		  var SOURCE_RANK = ['nginx', 'apache', undefined, 'iana'];

		  var score0 = type0 ? SOURCE_RANK.indexOf(db[type0].source) : 0;
		  var score1 = type1 ? SOURCE_RANK.indexOf(db[type1].source) : 0;

		  if (
		    exports.types[extension] !== 'application/octet-stream' &&
		    (score0 > score1 ||
		      (score0 === score1 &&
		        exports.types[extension]?.slice(0, 12) === 'application/'))
		  ) {
		    return type0
		  }

		  return score0 > score1 ? type0 : type1
		} 
	} (mimeTypes));
	return mimeTypes;
}

var onFinished = {exports: {}};

/*!
 * ee-first
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

var eeFirst;
var hasRequiredEeFirst;

function requireEeFirst () {
	if (hasRequiredEeFirst) return eeFirst;
	hasRequiredEeFirst = 1;

	/**
	 * Module exports.
	 * @public
	 */

	eeFirst = first;

	/**
	 * Get the first event in a set of event emitters and event pairs.
	 *
	 * @param {array} stuff
	 * @param {function} done
	 * @public
	 */

	function first(stuff, done) {
	  if (!Array.isArray(stuff))
	    throw new TypeError('arg must be an array of [ee, events...] arrays')

	  var cleanups = [];

	  for (var i = 0; i < stuff.length; i++) {
	    var arr = stuff[i];

	    if (!Array.isArray(arr) || arr.length < 2)
	      throw new TypeError('each array member must be [ee, events...]')

	    var ee = arr[0];

	    for (var j = 1; j < arr.length; j++) {
	      var event = arr[j];
	      var fn = listener(event, callback);

	      // listen to the event
	      ee.on(event, fn);
	      // push this listener to the list of cleanups
	      cleanups.push({
	        ee: ee,
	        event: event,
	        fn: fn,
	      });
	    }
	  }

	  function callback() {
	    cleanup();
	    done.apply(null, arguments);
	  }

	  function cleanup() {
	    var x;
	    for (var i = 0; i < cleanups.length; i++) {
	      x = cleanups[i];
	      x.ee.removeListener(x.event, x.fn);
	    }
	  }

	  function thunk(fn) {
	    done = fn;
	  }

	  thunk.cancel = cleanup;

	  return thunk
	}

	/**
	 * Create the event listener.
	 * @private
	 */

	function listener(event, done) {
	  return function onevent(arg1) {
	    var args = new Array(arguments.length);
	    var ee = this;
	    var err = event === 'error'
	      ? arg1
	      : null;

	    // copy args to prevent arguments escaping scope
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    done(err, ee, event, args);
	  }
	}
	return eeFirst;
}

/*!
 * on-finished
 * Copyright(c) 2013 Jonathan Ong
 * Copyright(c) 2014 Douglas Christopher Wilson
 * MIT Licensed
 */

var hasRequiredOnFinished;

function requireOnFinished () {
	if (hasRequiredOnFinished) return onFinished.exports;
	hasRequiredOnFinished = 1;

	/**
	 * Module exports.
	 * @public
	 */

	onFinished.exports = onFinished$1;
	onFinished.exports.isFinished = isFinished;

	/**
	 * Module dependencies.
	 * @private
	 */

	var asyncHooks = tryRequireAsyncHooks();
	var first = requireEeFirst();

	/**
	 * Variables.
	 * @private
	 */

	/* istanbul ignore next */
	var defer = typeof setImmediate === 'function'
	  ? setImmediate
	  : function (fn) { process.nextTick(fn.bind.apply(fn, arguments)); };

	/**
	 * Invoke callback when the response has finished, useful for
	 * cleaning up resources afterwards.
	 *
	 * @param {object} msg
	 * @param {function} listener
	 * @return {object}
	 * @public
	 */

	function onFinished$1 (msg, listener) {
	  if (isFinished(msg) !== false) {
	    defer(listener, null, msg);
	    return msg
	  }

	  // attach the listener to the message
	  attachListener(msg, wrap(listener));

	  return msg
	}

	/**
	 * Determine if message is already finished.
	 *
	 * @param {object} msg
	 * @return {boolean}
	 * @public
	 */

	function isFinished (msg) {
	  var socket = msg.socket;

	  if (typeof msg.finished === 'boolean') {
	    // OutgoingMessage
	    return Boolean(msg.finished || (socket && !socket.writable))
	  }

	  if (typeof msg.complete === 'boolean') {
	    // IncomingMessage
	    return Boolean(msg.upgrade || !socket || !socket.readable || (msg.complete && !msg.readable))
	  }

	  // don't know
	  return undefined
	}

	/**
	 * Attach a finished listener to the message.
	 *
	 * @param {object} msg
	 * @param {function} callback
	 * @private
	 */

	function attachFinishedListener (msg, callback) {
	  var eeMsg;
	  var eeSocket;
	  var finished = false;

	  function onFinish (error) {
	    eeMsg.cancel();
	    eeSocket.cancel();

	    finished = true;
	    callback(error);
	  }

	  // finished on first message event
	  eeMsg = eeSocket = first([[msg, 'end', 'finish']], onFinish);

	  function onSocket (socket) {
	    // remove listener
	    msg.removeListener('socket', onSocket);

	    if (finished) return
	    if (eeMsg !== eeSocket) return

	    // finished on first socket event
	    eeSocket = first([[socket, 'error', 'close']], onFinish);
	  }

	  if (msg.socket) {
	    // socket already assigned
	    onSocket(msg.socket);
	    return
	  }

	  // wait for socket to be assigned
	  msg.on('socket', onSocket);

	  if (msg.socket === undefined) {
	    // istanbul ignore next: node.js 0.8 patch
	    patchAssignSocket(msg, onSocket);
	  }
	}

	/**
	 * Attach the listener to the message.
	 *
	 * @param {object} msg
	 * @return {function}
	 * @private
	 */

	function attachListener (msg, listener) {
	  var attached = msg.__onFinished;

	  // create a private single listener with queue
	  if (!attached || !attached.queue) {
	    attached = msg.__onFinished = createListener(msg);
	    attachFinishedListener(msg, attached);
	  }

	  attached.queue.push(listener);
	}

	/**
	 * Create listener on message.
	 *
	 * @param {object} msg
	 * @return {function}
	 * @private
	 */

	function createListener (msg) {
	  function listener (err) {
	    if (msg.__onFinished === listener) msg.__onFinished = null;
	    if (!listener.queue) return

	    var queue = listener.queue;
	    listener.queue = null;

	    for (var i = 0; i < queue.length; i++) {
	      queue[i](err, msg);
	    }
	  }

	  listener.queue = [];

	  return listener
	}

	/**
	 * Patch ServerResponse.prototype.assignSocket for node.js 0.8.
	 *
	 * @param {ServerResponse} res
	 * @param {function} callback
	 * @private
	 */

	// istanbul ignore next: node.js 0.8 patch
	function patchAssignSocket (res, callback) {
	  var assignSocket = res.assignSocket;

	  if (typeof assignSocket !== 'function') return

	  // res.on('socket', callback) is broken in 0.8
	  res.assignSocket = function _assignSocket (socket) {
	    assignSocket.call(this, socket);
	    callback(socket);
	  };
	}

	/**
	 * Try to require async_hooks
	 * @private
	 */

	function tryRequireAsyncHooks () {
	  try {
	    return require('async_hooks')
	  } catch (e) {
	    return {}
	  }
	}

	/**
	 * Wrap function with async resource, if possible.
	 * AsyncResource.bind static method backported.
	 * @private
	 */

	function wrap (fn) {
	  var res;

	  // create anonymous resource
	  if (asyncHooks.AsyncResource) {
	    res = new asyncHooks.AsyncResource(fn.name || 'bound-anonymous-fn');
	  }

	  // incompatible node.js
	  if (!res || !res.runInAsyncScope) {
	    return fn
	  }

	  // return bound function
	  return res.runInAsyncScope.bind(res, fn, null)
	}
	return onFinished.exports;
}

/*!
 * range-parser
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */

var rangeParser_1;
var hasRequiredRangeParser;

function requireRangeParser () {
	if (hasRequiredRangeParser) return rangeParser_1;
	hasRequiredRangeParser = 1;

	/**
	 * Module exports.
	 * @public
	 */

	rangeParser_1 = rangeParser;

	/**
	 * Parse "Range" header `str` relative to the given file `size`.
	 *
	 * @param {Number} size
	 * @param {String} str
	 * @param {Object} [options]
	 * @return {Array}
	 * @public
	 */

	function rangeParser (size, str, options) {
	  if (typeof str !== 'string') {
	    throw new TypeError('argument str must be a string')
	  }

	  var index = str.indexOf('=');

	  if (index === -1) {
	    return -2
	  }

	  // split the range string
	  var arr = str.slice(index + 1).split(',');
	  var ranges = [];

	  // add ranges type
	  ranges.type = str.slice(0, index);

	  // parse all ranges
	  for (var i = 0; i < arr.length; i++) {
	    var range = arr[i].split('-');
	    var start = parseInt(range[0], 10);
	    var end = parseInt(range[1], 10);

	    // -nnn
	    if (isNaN(start)) {
	      start = size - end;
	      end = size - 1;
	    // nnn-
	    } else if (isNaN(end)) {
	      end = size - 1;
	    }

	    // limit last-byte-pos to current length
	    if (end > size - 1) {
	      end = size - 1;
	    }

	    // invalid or unsatisifiable
	    if (isNaN(start) || isNaN(end) || start > end || start < 0) {
	      continue
	    }

	    // add range
	    ranges.push({
	      start: start,
	      end: end
	    });
	  }

	  if (ranges.length < 1) {
	    // unsatisifiable
	    return -1
	  }

	  return options && options.combine
	    ? combineRanges(ranges)
	    : ranges
	}

	/**
	 * Combine overlapping & adjacent ranges.
	 * @private
	 */

	function combineRanges (ranges) {
	  var ordered = ranges.map(mapWithIndex).sort(sortByRangeStart);

	  for (var j = 0, i = 1; i < ordered.length; i++) {
	    var range = ordered[i];
	    var current = ordered[j];

	    if (range.start > current.end + 1) {
	      // next range
	      ordered[++j] = range;
	    } else if (range.end > current.end) {
	      // extend range
	      current.end = range.end;
	      current.index = Math.min(current.index, range.index);
	    }
	  }

	  // trim ordered array
	  ordered.length = j + 1;

	  // generate combined range
	  var combined = ordered.sort(sortByRangeIndex).map(mapWithoutIndex);

	  // copy ranges type
	  combined.type = ranges.type;

	  return combined
	}

	/**
	 * Map function to add index value to ranges.
	 * @private
	 */

	function mapWithIndex (range, index) {
	  return {
	    start: range.start,
	    end: range.end,
	    index: index
	  }
	}

	/**
	 * Map function to remove index value from ranges.
	 * @private
	 */

	function mapWithoutIndex (range) {
	  return {
	    start: range.start,
	    end: range.end
	  }
	}

	/**
	 * Sort function to sort ranges by index.
	 * @private
	 */

	function sortByRangeIndex (a, b) {
	  return a.index - b.index
	}

	/**
	 * Sort function to sort ranges by start position.
	 * @private
	 */

	function sortByRangeStart (a, b) {
	  return a.start - b.start
	}
	return rangeParser_1;
}

/*!
 * send
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2014-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

var send_1;
var hasRequiredSend;

function requireSend () {
	if (hasRequiredSend) return send_1;
	hasRequiredSend = 1;

	/**
	 * Module dependencies.
	 * @private
	 */

	var createError = requireHttpErrors();
	var debug = requireSrc()('send');
	var encodeUrl = requireEncodeurl();
	var escapeHtml = requireEscapeHtml();
	var etag = requireEtag();
	var fresh = requireFresh();
	var fs = require$$1$2;
	var mime = requireMimeTypes();
	var ms = requireMs();
	var onFinished = requireOnFinished();
	var parseRange = requireRangeParser();
	var path = require$$0$2;
	var statuses = requireStatuses();
	var Stream = require$$13;
	var util = require$$1$1;

	/**
	 * Path function references.
	 * @private
	 */

	var extname = path.extname;
	var join = path.join;
	var normalize = path.normalize;
	var resolve = path.resolve;
	var sep = path.sep;

	/**
	 * Regular expression for identifying a bytes Range header.
	 * @private
	 */

	var BYTES_RANGE_REGEXP = /^ *bytes=/;

	/**
	 * Maximum value allowed for the max age.
	 * @private
	 */

	var MAX_MAXAGE = 60 * 60 * 24 * 365 * 1000; // 1 year

	/**
	 * Regular expression to match a path with a directory up component.
	 * @private
	 */

	var UP_PATH_REGEXP = /(?:^|[\\/])\.\.(?:[\\/]|$)/;

	/**
	 * Module exports.
	 * @public
	 */

	send_1 = send;

	/**
	 * Return a `SendStream` for `req` and `path`.
	 *
	 * @param {object} req
	 * @param {string} path
	 * @param {object} [options]
	 * @return {SendStream}
	 * @public
	 */

	function send (req, path, options) {
	  return new SendStream(req, path, options)
	}

	/**
	 * Initialize a `SendStream` with the given `path`.
	 *
	 * @param {Request} req
	 * @param {String} path
	 * @param {object} [options]
	 * @private
	 */

	function SendStream (req, path, options) {
	  Stream.call(this);

	  var opts = options || {};

	  this.options = opts;
	  this.path = path;
	  this.req = req;

	  this._acceptRanges = opts.acceptRanges !== undefined
	    ? Boolean(opts.acceptRanges)
	    : true;

	  this._cacheControl = opts.cacheControl !== undefined
	    ? Boolean(opts.cacheControl)
	    : true;

	  this._etag = opts.etag !== undefined
	    ? Boolean(opts.etag)
	    : true;

	  this._dotfiles = opts.dotfiles !== undefined
	    ? opts.dotfiles
	    : 'ignore';

	  if (this._dotfiles !== 'ignore' && this._dotfiles !== 'allow' && this._dotfiles !== 'deny') {
	    throw new TypeError('dotfiles option must be "allow", "deny", or "ignore"')
	  }

	  this._extensions = opts.extensions !== undefined
	    ? normalizeList(opts.extensions, 'extensions option')
	    : [];

	  this._immutable = opts.immutable !== undefined
	    ? Boolean(opts.immutable)
	    : false;

	  this._index = opts.index !== undefined
	    ? normalizeList(opts.index, 'index option')
	    : ['index.html'];

	  this._lastModified = opts.lastModified !== undefined
	    ? Boolean(opts.lastModified)
	    : true;

	  this._maxage = opts.maxAge || opts.maxage;
	  this._maxage = typeof this._maxage === 'string'
	    ? ms(this._maxage)
	    : Number(this._maxage);
	  this._maxage = !isNaN(this._maxage)
	    ? Math.min(Math.max(0, this._maxage), MAX_MAXAGE)
	    : 0;

	  this._root = opts.root
	    ? resolve(opts.root)
	    : null;
	}

	/**
	 * Inherits from `Stream`.
	 */

	util.inherits(SendStream, Stream);

	/**
	 * Emit error with `status`.
	 *
	 * @param {number} status
	 * @param {Error} [err]
	 * @private
	 */

	SendStream.prototype.error = function error (status, err) {
	  // emit if listeners instead of responding
	  if (hasListeners(this, 'error')) {
	    return this.emit('error', createHttpError(status, err))
	  }

	  var res = this.res;
	  var msg = statuses.message[status] || String(status);
	  var doc = createHtmlDocument('Error', escapeHtml(msg));

	  // clear existing headers
	  clearHeaders(res);

	  // add error headers
	  if (err && err.headers) {
	    setHeaders(res, err.headers);
	  }

	  // send basic response
	  res.statusCode = status;
	  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	  res.setHeader('Content-Length', Buffer.byteLength(doc));
	  res.setHeader('Content-Security-Policy', "default-src 'none'");
	  res.setHeader('X-Content-Type-Options', 'nosniff');
	  res.end(doc);
	};

	/**
	 * Check if the pathname ends with "/".
	 *
	 * @return {boolean}
	 * @private
	 */

	SendStream.prototype.hasTrailingSlash = function hasTrailingSlash () {
	  return this.path[this.path.length - 1] === '/'
	};

	/**
	 * Check if this is a conditional GET request.
	 *
	 * @return {Boolean}
	 * @api private
	 */

	SendStream.prototype.isConditionalGET = function isConditionalGET () {
	  return this.req.headers['if-match'] ||
	    this.req.headers['if-unmodified-since'] ||
	    this.req.headers['if-none-match'] ||
	    this.req.headers['if-modified-since']
	};

	/**
	 * Check if the request preconditions failed.
	 *
	 * @return {boolean}
	 * @private
	 */

	SendStream.prototype.isPreconditionFailure = function isPreconditionFailure () {
	  var req = this.req;
	  var res = this.res;

	  // if-match
	  var match = req.headers['if-match'];
	  if (match) {
	    var etag = res.getHeader('ETag');
	    return !etag || (match !== '*' && parseTokenList(match).every(function (match) {
	      return match !== etag && match !== 'W/' + etag && 'W/' + match !== etag
	    }))
	  }

	  // if-unmodified-since
	  var unmodifiedSince = parseHttpDate(req.headers['if-unmodified-since']);
	  if (!isNaN(unmodifiedSince)) {
	    var lastModified = parseHttpDate(res.getHeader('Last-Modified'));
	    return isNaN(lastModified) || lastModified > unmodifiedSince
	  }

	  return false
	};

	/**
	 * Strip various content header fields for a change in entity.
	 *
	 * @private
	 */

	SendStream.prototype.removeContentHeaderFields = function removeContentHeaderFields () {
	  var res = this.res;

	  res.removeHeader('Content-Encoding');
	  res.removeHeader('Content-Language');
	  res.removeHeader('Content-Length');
	  res.removeHeader('Content-Range');
	  res.removeHeader('Content-Type');
	};

	/**
	 * Respond with 304 not modified.
	 *
	 * @api private
	 */

	SendStream.prototype.notModified = function notModified () {
	  var res = this.res;
	  debug('not modified');
	  this.removeContentHeaderFields();
	  res.statusCode = 304;
	  res.end();
	};

	/**
	 * Raise error that headers already sent.
	 *
	 * @api private
	 */

	SendStream.prototype.headersAlreadySent = function headersAlreadySent () {
	  var err = new Error('Can\'t set headers after they are sent.');
	  debug('headers already sent');
	  this.error(500, err);
	};

	/**
	 * Check if the request is cacheable, aka
	 * responded with 2xx or 304 (see RFC 2616 section 14.2{5,6}).
	 *
	 * @return {Boolean}
	 * @api private
	 */

	SendStream.prototype.isCachable = function isCachable () {
	  var statusCode = this.res.statusCode;
	  return (statusCode >= 200 && statusCode < 300) ||
	    statusCode === 304
	};

	/**
	 * Handle stat() error.
	 *
	 * @param {Error} error
	 * @private
	 */

	SendStream.prototype.onStatError = function onStatError (error) {
	  switch (error.code) {
	    case 'ENAMETOOLONG':
	    case 'ENOENT':
	    case 'ENOTDIR':
	      this.error(404, error);
	      break
	    default:
	      this.error(500, error);
	      break
	  }
	};

	/**
	 * Check if the cache is fresh.
	 *
	 * @return {Boolean}
	 * @api private
	 */

	SendStream.prototype.isFresh = function isFresh () {
	  return fresh(this.req.headers, {
	    etag: this.res.getHeader('ETag'),
	    'last-modified': this.res.getHeader('Last-Modified')
	  })
	};

	/**
	 * Check if the range is fresh.
	 *
	 * @return {Boolean}
	 * @api private
	 */

	SendStream.prototype.isRangeFresh = function isRangeFresh () {
	  var ifRange = this.req.headers['if-range'];

	  if (!ifRange) {
	    return true
	  }

	  // if-range as etag
	  if (ifRange.indexOf('"') !== -1) {
	    var etag = this.res.getHeader('ETag');
	    return Boolean(etag && ifRange.indexOf(etag) !== -1)
	  }

	  // if-range as modified date
	  var lastModified = this.res.getHeader('Last-Modified');
	  return parseHttpDate(lastModified) <= parseHttpDate(ifRange)
	};

	/**
	 * Redirect to path.
	 *
	 * @param {string} path
	 * @private
	 */

	SendStream.prototype.redirect = function redirect (path) {
	  var res = this.res;

	  if (hasListeners(this, 'directory')) {
	    this.emit('directory', res, path);
	    return
	  }

	  if (this.hasTrailingSlash()) {
	    this.error(403);
	    return
	  }

	  var loc = encodeUrl(collapseLeadingSlashes(this.path + '/'));
	  var doc = createHtmlDocument('Redirecting', 'Redirecting to ' + escapeHtml(loc));

	  // redirect
	  res.statusCode = 301;
	  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	  res.setHeader('Content-Length', Buffer.byteLength(doc));
	  res.setHeader('Content-Security-Policy', "default-src 'none'");
	  res.setHeader('X-Content-Type-Options', 'nosniff');
	  res.setHeader('Location', loc);
	  res.end(doc);
	};

	/**
	 * Pipe to `res.
	 *
	 * @param {Stream} res
	 * @return {Stream} res
	 * @api public
	 */

	SendStream.prototype.pipe = function pipe (res) {
	  // root path
	  var root = this._root;

	  // references
	  this.res = res;

	  // decode the path
	  var path = decode(this.path);
	  if (path === -1) {
	    this.error(400);
	    return res
	  }

	  // null byte(s)
	  if (~path.indexOf('\0')) {
	    this.error(400);
	    return res
	  }

	  var parts;
	  if (root !== null) {
	    // normalize
	    if (path) {
	      path = normalize('.' + sep + path);
	    }

	    // malicious path
	    if (UP_PATH_REGEXP.test(path)) {
	      debug('malicious path "%s"', path);
	      this.error(403);
	      return res
	    }

	    // explode path parts
	    parts = path.split(sep);

	    // join / normalize from optional root dir
	    path = normalize(join(root, path));
	  } else {
	    // ".." is malicious without "root"
	    if (UP_PATH_REGEXP.test(path)) {
	      debug('malicious path "%s"', path);
	      this.error(403);
	      return res
	    }

	    // explode path parts
	    parts = normalize(path).split(sep);

	    // resolve the path
	    path = resolve(path);
	  }

	  // dotfile handling
	  if (containsDotFile(parts)) {
	    debug('%s dotfile "%s"', this._dotfiles, path);
	    switch (this._dotfiles) {
	      case 'allow':
	        break
	      case 'deny':
	        this.error(403);
	        return res
	      case 'ignore':
	      default:
	        this.error(404);
	        return res
	    }
	  }

	  // index file support
	  if (this._index.length && this.hasTrailingSlash()) {
	    this.sendIndex(path);
	    return res
	  }

	  this.sendFile(path);
	  return res
	};

	/**
	 * Transfer `path`.
	 *
	 * @param {String} path
	 * @api public
	 */

	SendStream.prototype.send = function send (path, stat) {
	  var len = stat.size;
	  var options = this.options;
	  var opts = {};
	  var res = this.res;
	  var req = this.req;
	  var ranges = req.headers.range;
	  var offset = options.start || 0;

	  if (res.headersSent) {
	    // impossible to send now
	    this.headersAlreadySent();
	    return
	  }

	  debug('pipe "%s"', path);

	  // set header fields
	  this.setHeader(path, stat);

	  // set content-type
	  this.type(path);

	  // conditional GET support
	  if (this.isConditionalGET()) {
	    if (this.isPreconditionFailure()) {
	      this.error(412);
	      return
	    }

	    if (this.isCachable() && this.isFresh()) {
	      this.notModified();
	      return
	    }
	  }

	  // adjust len to start/end options
	  len = Math.max(0, len - offset);
	  if (options.end !== undefined) {
	    var bytes = options.end - offset + 1;
	    if (len > bytes) len = bytes;
	  }

	  // Range support
	  if (this._acceptRanges && BYTES_RANGE_REGEXP.test(ranges)) {
	    // parse
	    ranges = parseRange(len, ranges, {
	      combine: true
	    });

	    // If-Range support
	    if (!this.isRangeFresh()) {
	      debug('range stale');
	      ranges = -2;
	    }

	    // unsatisfiable
	    if (ranges === -1) {
	      debug('range unsatisfiable');

	      // Content-Range
	      res.setHeader('Content-Range', contentRange('bytes', len));

	      // 416 Requested Range Not Satisfiable
	      return this.error(416, {
	        headers: { 'Content-Range': res.getHeader('Content-Range') }
	      })
	    }

	    // valid (syntactically invalid/multiple ranges are treated as a regular response)
	    if (ranges !== -2 && ranges.length === 1) {
	      debug('range %j', ranges);

	      // Content-Range
	      res.statusCode = 206;
	      res.setHeader('Content-Range', contentRange('bytes', len, ranges[0]));

	      // adjust for requested range
	      offset += ranges[0].start;
	      len = ranges[0].end - ranges[0].start + 1;
	    }
	  }

	  // clone options
	  for (var prop in options) {
	    opts[prop] = options[prop];
	  }

	  // set read options
	  opts.start = offset;
	  opts.end = Math.max(offset, offset + len - 1);

	  // content-length
	  res.setHeader('Content-Length', len);

	  // HEAD support
	  if (req.method === 'HEAD') {
	    res.end();
	    return
	  }

	  this.stream(path, opts);
	};

	/**
	 * Transfer file for `path`.
	 *
	 * @param {String} path
	 * @api private
	 */
	SendStream.prototype.sendFile = function sendFile (path) {
	  var i = 0;
	  var self = this;

	  debug('stat "%s"', path);
	  fs.stat(path, function onstat (err, stat) {
	    var pathEndsWithSep = path[path.length - 1] === sep;
	    if (err && err.code === 'ENOENT' && !extname(path) && !pathEndsWithSep) {
	      // not found, check extensions
	      return next(err)
	    }
	    if (err) return self.onStatError(err)
	    if (stat.isDirectory()) return self.redirect(path)
	    if (pathEndsWithSep) return self.error(404)
	    self.emit('file', path, stat);
	    self.send(path, stat);
	  });

	  function next (err) {
	    if (self._extensions.length <= i) {
	      return err
	        ? self.onStatError(err)
	        : self.error(404)
	    }

	    var p = path + '.' + self._extensions[i++];

	    debug('stat "%s"', p);
	    fs.stat(p, function (err, stat) {
	      if (err) return next(err)
	      if (stat.isDirectory()) return next()
	      self.emit('file', p, stat);
	      self.send(p, stat);
	    });
	  }
	};

	/**
	 * Transfer index for `path`.
	 *
	 * @param {String} path
	 * @api private
	 */
	SendStream.prototype.sendIndex = function sendIndex (path) {
	  var i = -1;
	  var self = this;

	  function next (err) {
	    if (++i >= self._index.length) {
	      if (err) return self.onStatError(err)
	      return self.error(404)
	    }

	    var p = join(path, self._index[i]);

	    debug('stat "%s"', p);
	    fs.stat(p, function (err, stat) {
	      if (err) return next(err)
	      if (stat.isDirectory()) return next()
	      self.emit('file', p, stat);
	      self.send(p, stat);
	    });
	  }

	  next();
	};

	/**
	 * Stream `path` to the response.
	 *
	 * @param {String} path
	 * @param {Object} options
	 * @api private
	 */

	SendStream.prototype.stream = function stream (path, options) {
	  var self = this;
	  var res = this.res;

	  // pipe
	  var stream = fs.createReadStream(path, options);
	  this.emit('stream', stream);
	  stream.pipe(res);

	  // cleanup
	  function cleanup () {
	    stream.destroy();
	  }

	  // response finished, cleanup
	  onFinished(res, cleanup);

	  // error handling
	  stream.on('error', function onerror (err) {
	    // clean up stream early
	    cleanup();

	    // error
	    self.onStatError(err);
	  });

	  // end
	  stream.on('end', function onend () {
	    self.emit('end');
	  });
	};

	/**
	 * Set content-type based on `path`
	 * if it hasn't been explicitly set.
	 *
	 * @param {String} path
	 * @api private
	 */

	SendStream.prototype.type = function type (path) {
	  var res = this.res;

	  if (res.getHeader('Content-Type')) return

	  var ext = extname(path);
	  var type = mime.contentType(ext) || 'application/octet-stream';

	  debug('content-type %s', type);
	  res.setHeader('Content-Type', type);
	};

	/**
	 * Set response header fields, most
	 * fields may be pre-defined.
	 *
	 * @param {String} path
	 * @param {Object} stat
	 * @api private
	 */

	SendStream.prototype.setHeader = function setHeader (path, stat) {
	  var res = this.res;

	  this.emit('headers', res, path, stat);

	  if (this._acceptRanges && !res.getHeader('Accept-Ranges')) {
	    debug('accept ranges');
	    res.setHeader('Accept-Ranges', 'bytes');
	  }

	  if (this._cacheControl && !res.getHeader('Cache-Control')) {
	    var cacheControl = 'public, max-age=' + Math.floor(this._maxage / 1000);

	    if (this._immutable) {
	      cacheControl += ', immutable';
	    }

	    debug('cache-control %s', cacheControl);
	    res.setHeader('Cache-Control', cacheControl);
	  }

	  if (this._lastModified && !res.getHeader('Last-Modified')) {
	    var modified = stat.mtime.toUTCString();
	    debug('modified %s', modified);
	    res.setHeader('Last-Modified', modified);
	  }

	  if (this._etag && !res.getHeader('ETag')) {
	    var val = etag(stat);
	    debug('etag %s', val);
	    res.setHeader('ETag', val);
	  }
	};

	/**
	 * Clear all headers from a response.
	 *
	 * @param {object} res
	 * @private
	 */

	function clearHeaders (res) {
	  for (const header of res.getHeaderNames()) {
	    res.removeHeader(header);
	  }
	}

	/**
	 * Collapse all leading slashes into a single slash
	 *
	 * @param {string} str
	 * @private
	 */
	function collapseLeadingSlashes (str) {
	  for (var i = 0; i < str.length; i++) {
	    if (str[i] !== '/') {
	      break
	    }
	  }

	  return i > 1
	    ? '/' + str.substr(i)
	    : str
	}

	/**
	 * Determine if path parts contain a dotfile.
	 *
	 * @api private
	 */

	function containsDotFile (parts) {
	  for (var i = 0; i < parts.length; i++) {
	    var part = parts[i];
	    if (part.length > 1 && part[0] === '.') {
	      return true
	    }
	  }

	  return false
	}

	/**
	 * Create a Content-Range header.
	 *
	 * @param {string} type
	 * @param {number} size
	 * @param {array} [range]
	 */

	function contentRange (type, size, range) {
	  return type + ' ' + (range ? range.start + '-' + range.end : '*') + '/' + size
	}

	/**
	 * Create a minimal HTML document.
	 *
	 * @param {string} title
	 * @param {string} body
	 * @private
	 */

	function createHtmlDocument (title, body) {
	  return '<!DOCTYPE html>\n' +
	    '<html lang="en">\n' +
	    '<head>\n' +
	    '<meta charset="utf-8">\n' +
	    '<title>' + title + '</title>\n' +
	    '</head>\n' +
	    '<body>\n' +
	    '<pre>' + body + '</pre>\n' +
	    '</body>\n' +
	    '</html>\n'
	}

	/**
	 * Create a HttpError object from simple arguments.
	 *
	 * @param {number} status
	 * @param {Error|object} err
	 * @private
	 */

	function createHttpError (status, err) {
	  if (!err) {
	    return createError(status)
	  }

	  return err instanceof Error
	    ? createError(status, err, { expose: false })
	    : createError(status, err)
	}

	/**
	 * decodeURIComponent.
	 *
	 * Allows V8 to only deoptimize this fn instead of all
	 * of send().
	 *
	 * @param {String} path
	 * @api private
	 */

	function decode (path) {
	  try {
	    return decodeURIComponent(path)
	  } catch (err) {
	    return -1
	  }
	}

	/**
	 * Determine if emitter has listeners of a given type.
	 *
	 * The way to do this check is done three different ways in Node.js >= 0.10
	 * so this consolidates them into a minimal set using instance methods.
	 *
	 * @param {EventEmitter} emitter
	 * @param {string} type
	 * @returns {boolean}
	 * @private
	 */

	function hasListeners (emitter, type) {
	  var count = typeof emitter.listenerCount !== 'function'
	    ? emitter.listeners(type).length
	    : emitter.listenerCount(type);

	  return count > 0
	}

	/**
	 * Normalize the index option into an array.
	 *
	 * @param {boolean|string|array} val
	 * @param {string} name
	 * @private
	 */

	function normalizeList (val, name) {
	  var list = [].concat(val || []);

	  for (var i = 0; i < list.length; i++) {
	    if (typeof list[i] !== 'string') {
	      throw new TypeError(name + ' must be array of strings or false')
	    }
	  }

	  return list
	}

	/**
	 * Parse an HTTP Date into a number.
	 *
	 * @param {string} date
	 * @private
	 */

	function parseHttpDate (date) {
	  var timestamp = date && Date.parse(date);

	  return typeof timestamp === 'number'
	    ? timestamp
	    : NaN
	}

	/**
	 * Parse a HTTP token list.
	 *
	 * @param {string} str
	 * @private
	 */

	function parseTokenList (str) {
	  var end = 0;
	  var list = [];
	  var start = 0;

	  // gather tokens
	  for (var i = 0, len = str.length; i < len; i++) {
	    switch (str.charCodeAt(i)) {
	      case 0x20: /*   */
	        if (start === end) {
	          start = end = i + 1;
	        }
	        break
	      case 0x2c: /* , */
	        if (start !== end) {
	          list.push(str.substring(start, end));
	        }
	        start = end = i + 1;
	        break
	      default:
	        end = i + 1;
	        break
	    }
	  }

	  // final token
	  if (start !== end) {
	    list.push(str.substring(start, end));
	  }

	  return list
	}

	/**
	 * Set an object of headers on a response.
	 *
	 * @param {object} res
	 * @param {object} headers
	 * @private
	 */

	function setHeaders (res, headers) {
	  var keys = Object.keys(headers);

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    res.setHeader(key, headers[key]);
	  }
	}
	return send_1;
}

var sendExports = requireSend();
const send = /*@__PURE__*/getDefaultExportFromCjs(sendExports);

function resolveStaticPath(client, urlPath) {
  const filePath = path.join(client, urlPath);
  const resolved = path.resolve(filePath);
  const resolvedClient = path.resolve(client);
  if (resolved !== resolvedClient && !resolved.startsWith(resolvedClient + path.sep)) {
    return { filePath: resolved, isDirectory: false };
  }
  let isDirectory = false;
  try {
    isDirectory = fs.lstatSync(filePath).isDirectory();
  } catch {
  }
  return { filePath: resolved, isDirectory };
}
function createStaticHandler(app, options, headersMap) {
  const client = resolveClientDir(options);
  return (req, res, ssr) => {
    if (req.url) {
      let fullUrl = req.url;
      if (req.url.includes("#")) {
        fullUrl = fullUrl.slice(0, req.url.indexOf("#"));
      }
      const [urlPath, urlQuery] = fullUrl.split("?");
      const { isDirectory } = resolveStaticPath(client, app.removeBase(urlPath));
      const hasSlash = urlPath.endsWith("/");
      let pathname = urlPath;
      switch (app.manifest.trailingSlash) {
        case "never": {
          if (isDirectory && urlPath !== "/" && hasSlash) {
            pathname = urlPath.slice(0, -1) + (urlQuery ? "?" + urlQuery : "");
            res.statusCode = 301;
            res.setHeader("Location", pathname);
            return res.end();
          }
          if (isDirectory && !hasSlash) {
            pathname = `${urlPath}/index.html`;
          }
          break;
        }
        case "ignore": {
          if (isDirectory && !hasSlash) {
            pathname = `${urlPath}/index.html`;
          }
          break;
        }
        case "always": {
          if (!hasSlash && !hasFileExtension(urlPath) && !isInternalPath(urlPath)) {
            pathname = urlPath + "/" + (urlQuery ? "?" + urlQuery : "");
            res.statusCode = 301;
            res.setHeader("Location", pathname);
            return res.end();
          }
          break;
        }
      }
      pathname = prependForwardSlash(app.removeBase(pathname));
      const normalizedPathname = path.posix.normalize(pathname);
      const stream = send(req, normalizedPathname, {
        root: client,
        dotfiles: normalizedPathname.startsWith("/.well-known/") ? "allow" : "deny"
      });
      let forwardError = false;
      stream.on("error", (err) => {
        if (forwardError) {
          const status = "statusCode" in err ? err.statusCode : 500;
          if (status >= 500) {
            console.error(err.toString());
          }
          res.writeHead(status);
          res.end(status >= 500 ? "Internal server error" : "");
          return;
        }
        ssr();
      });
      stream.on("file", () => {
        forwardError = true;
      });
      stream.on("stream", () => {
        if (normalizedPathname.startsWith(`/${app.manifest.assetsDir}/`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      });
      stream.pipe(res);
    } else {
      ssr();
    }
  };
}
function prependForwardSlash(pth) {
  return pth.startsWith("/") ? pth : "/" + pth;
}

const hostOptions = (host) => {
  if (typeof host === "boolean") {
    return host ? "0.0.0.0" : "localhost";
  }
  return host;
};
function standalone(app, options, headersMap) {
  const port = process.env.PORT ? Number(process.env.PORT) : options.port ?? 8080;
  const host = process.env.HOST ?? hostOptions(options.host);
  const resolvedOptions = { ...options, port };
  const handler = createStandaloneHandler(app, resolvedOptions);
  const server = createServer(handler, host, port);
  server.server.listen(port, host);
  if (process.env.ASTRO_NODE_LOGGING !== "disabled") {
    logListeningOn(app.adapterLogger, server.server, host);
  }
  server.server.on("close", () => {
    app.logger.close();
  });
  return {
    server,
    done: server.closed()
  };
}
function createStandaloneHandler(app, options, headersMap) {
  const appHandler = createAppHandler(app, options);
  const staticHandler = createStaticHandler(app, options);
  return (req, res) => {
    try {
      decodeURI(req.url);
    } catch {
      res.writeHead(400);
      res.end("Bad request.");
      return;
    }
    staticHandler(req, res, () => appHandler(req, res));
  };
}
function createServer(listener, host, port) {
  let httpServer;
  if (process.env.SERVER_CERT_PATH && process.env.SERVER_KEY_PATH) {
    httpServer = https.createServer(
      {
        key: fs.readFileSync(process.env.SERVER_KEY_PATH),
        cert: fs.readFileSync(process.env.SERVER_CERT_PATH)
      },
      listener
    );
  } else {
    httpServer = http.createServer(listener);
  }
  enableDestroy(httpServer);
  const closed = new Promise((resolve, reject) => {
    httpServer.addListener("close", resolve);
    httpServer.addListener("error", reject);
  });
  const previewable = {
    host,
    port,
    closed() {
      return closed;
    },
    async stop() {
      await new Promise((resolve, reject) => {
        httpServer.destroy((err) => err ? reject(err) : resolve(void 0));
      });
    }
  };
  return {
    server: httpServer,
    ...previewable
  };
}

const app = createApp({ streaming: true });
const handler = createStandaloneHandler(app, options);
const startServer = () => standalone(app, options);
if (process.env.ASTRO_NODE_AUTOSTART !== "disabled") {
  startServer();
}

export { startServer as a, getDefaultExportFromCjs as g, handler as h, isRemoteAllowed as i, options as o, renderComponent as r, spreadAttributes as s };
