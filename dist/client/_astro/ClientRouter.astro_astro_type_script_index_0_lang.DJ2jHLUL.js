globalThis.process ??= {}; globalThis.process.env ??= {};
const internalFetchHeaders = {};

const PERSIST_ATTR$1 = "data-astro-transition-persist";
const NON_OVERRIDABLE_ASTRO_ATTRS = ["data-astro-transition", "data-astro-transition-fallback"];
const scriptsAlreadyRan = /* @__PURE__ */ new Set();
function detectScriptExecuted(script) {
  const key = script.src ? new URL(script.src, location.href).href : script.textContent;
  if (scriptsAlreadyRan.has(key)) return true;
  scriptsAlreadyRan.add(key);
  return false;
}
function deselectScripts(doc) {
  for (const s2 of doc.scripts) {
    if (
      // Check if the script should be rerun regardless of it being the same
      !s2.hasAttribute("data-astro-rerun") && // Check if the script has already been executed
      detectScriptExecuted(s2)
    ) {
      s2.dataset.astroExec = "";
    }
  }
}
function swapRootAttributes(newDoc) {
  const currentRoot = document.documentElement;
  const nonOverridableAstroAttributes = [...currentRoot.attributes].filter(
    ({ name }) => (currentRoot.removeAttribute(name), NON_OVERRIDABLE_ASTRO_ATTRS.includes(name))
  );
  [...newDoc.documentElement.attributes, ...nonOverridableAstroAttributes].forEach(
    ({ name, value }) => currentRoot.setAttribute(name, value)
  );
}
function swapHeadElements(doc) {
  for (const el of Array.from(document.head.children)) {
    const newEl = persistedHeadElement(el, doc);
    if (newEl) {
      newEl.remove();
    } else {
      el.remove();
    }
  }
  {
    document.head.append(...doc.head.children);
  }
}
function swapBodyElement(newElement, oldElement) {
  const persistPairs = [];
  const docEl = oldElement.ownerDocument.documentElement;
  const moveBefore = typeof docEl.moveBefore === "function" ? (parent, node, child) => parent.moveBefore(node, child) : null;
  for (const el of oldElement.querySelectorAll(`[${PERSIST_ATTR$1}]`)) {
    const id = el.getAttribute(PERSIST_ATTR$1);
    const newEl = newElement.querySelector(`[${PERSIST_ATTR$1}="${id}"]`);
    if (!newEl) continue;
    persistPairs.push({ old: el, newTarget: newEl });
    if (moveBefore) {
      moveBefore(docEl, el, null);
    } else {
      docEl.appendChild(el);
    }
  }
  oldElement.replaceWith(newElement);
  for (const { old: el, newTarget } of persistPairs) {
    if (moveBefore) {
      moveBefore(newTarget.parentNode, el, newTarget);
      newTarget.remove();
    } else {
      newTarget.replaceWith(el);
    }
    if (newTarget.localName === "astro-island" && shouldCopyProps(el) && !isSameProps(el, newTarget)) {
      el.setAttribute("ssr", "");
      el.setAttribute("props", newTarget.getAttribute("props"));
    }
  }
  attachShadowRoots(newElement);
}
function attachShadowRoots(root) {
  root.querySelectorAll("template[shadowrootmode]").forEach((template) => {
    const mode = template.getAttribute("shadowrootmode");
    const parent = template.parentNode;
    if ((mode === "closed" || mode === "open") && parent instanceof HTMLElement) {
      if (parent.shadowRoot) {
        template.remove();
        return;
      }
      const shadowRoot = parent.attachShadow({ mode });
      shadowRoot.appendChild(template.content);
      template.remove();
      attachShadowRoots(shadowRoot);
    }
  });
}
const saveFocus = () => {
  const activeElement = document.activeElement;
  if (activeElement?.closest(`[${PERSIST_ATTR$1}]`)) {
    if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      return () => restoreFocus({ activeElement, start, end });
    }
    return () => restoreFocus({ activeElement });
  } else {
    return () => restoreFocus({ activeElement: null });
  }
};
const restoreFocus = ({ activeElement, start, end }) => {
  if (activeElement) {
    activeElement.focus();
    if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
      if (typeof start === "number") activeElement.selectionStart = start;
      if (typeof end === "number") activeElement.selectionEnd = end;
    }
  }
};
const persistedHeadElement = (el, newDoc) => {
  const id = el.getAttribute(PERSIST_ATTR$1);
  const newEl = id && newDoc.head.querySelector(`[${PERSIST_ATTR$1}="${id}"]`);
  if (newEl) {
    return newEl;
  }
  if (el.matches("link[rel=stylesheet]")) {
    const href = el.getAttribute("href");
    return newDoc.head.querySelector(`link[rel=stylesheet][href="${href}"]`);
  }
  if (el.tagName === "STYLE" && el.textContent) {
    const styles = newDoc.head.querySelectorAll("style");
    for (const s of styles) {
      if (s.textContent === el.textContent) {
        return s;
      }
    }
  }
  if (el.matches("link[rel=preload][as=font]")) {
    const href = el.getAttribute("href");
    return newDoc.head.querySelector(`link[rel=preload][as=font][href="${href}"]`);
  }
  return null;
};
const shouldCopyProps = (el) => {
  const persistProps = el.dataset.astroTransitionPersistProps;
  return persistProps == null || persistProps === "false";
};
const isSameProps = (oldEl, newEl) => {
  return oldEl.getAttribute("props") === newEl.getAttribute("props");
};
const swap = (doc) => {
  deselectScripts(doc);
  swapRootAttributes(doc);
  swapHeadElements(doc);
  const restoreFocusFunction = saveFocus();
  swapBodyElement(doc.body, document.body);
  restoreFocusFunction();
};

const triggerEvent = (name) => document.dispatchEvent(new Event(name));
const onPageLoad$1 = () => triggerEvent("astro:page-load");
class BeforeEvent extends Event {
  from;
  to;
  direction;
  navigationType;
  sourceElement;
  info;
  newDocument;
  signal;
  constructor(type, eventInitDict, from, to, direction, navigationType, sourceElement, info, newDocument, signal) {
    super(type, eventInitDict);
    this.from = from;
    this.to = to;
    this.direction = direction;
    this.navigationType = navigationType;
    this.sourceElement = sourceElement;
    this.info = info;
    this.newDocument = newDocument;
    this.signal = signal;
    Object.defineProperties(this, {
      from: { enumerable: true },
      to: { enumerable: true, writable: true },
      direction: { enumerable: true, writable: true },
      navigationType: { enumerable: true },
      sourceElement: { enumerable: true },
      info: { enumerable: true },
      newDocument: { enumerable: true, writable: true },
      signal: { enumerable: true }
    });
  }
}
class TransitionBeforePreparationEvent extends BeforeEvent {
  formData;
  loader;
  constructor(from, to, direction, navigationType, sourceElement, info, newDocument, signal, formData, loader) {
    super(
      "astro:before-preparation",
      { cancelable: true },
      from,
      to,
      direction,
      navigationType,
      sourceElement,
      info,
      newDocument,
      signal
    );
    this.formData = formData;
    this.loader = loader.bind(this, this);
    Object.defineProperties(this, {
      formData: { enumerable: true },
      loader: { enumerable: true, writable: true }
    });
  }
}
class TransitionBeforeSwapEvent extends BeforeEvent {
  direction;
  viewTransition;
  swap;
  constructor(afterPreparation, viewTransition) {
    super(
      "astro:before-swap",
      void 0,
      afterPreparation.from,
      afterPreparation.to,
      afterPreparation.direction,
      afterPreparation.navigationType,
      afterPreparation.sourceElement,
      afterPreparation.info,
      afterPreparation.newDocument,
      afterPreparation.signal
    );
    this.direction = afterPreparation.direction;
    this.viewTransition = viewTransition;
    this.swap = () => swap(this.newDocument);
    Object.defineProperties(this, {
      direction: { enumerable: true },
      viewTransition: { enumerable: true },
      swap: { enumerable: true, writable: true }
    });
  }
}
async function doPreparation(from, to, direction, navigationType, sourceElement, info, signal, formData, defaultLoader) {
  const event = new TransitionBeforePreparationEvent(
    from,
    to,
    direction,
    navigationType,
    sourceElement,
    info,
    window.document,
    signal,
    formData,
    defaultLoader
  );
  if (document.dispatchEvent(event)) {
    await event.loader();
    if (!event.defaultPrevented) {
      triggerEvent("astro:after-preparation");
      if (event.navigationType !== "traverse") {
        updateScrollPosition({ scrollX, scrollY });
      }
    }
  }
  return event;
}
const updateScrollPosition = (positions) => {
  if (history.state) {
    history.scrollRestoration = "manual";
    history.replaceState({ ...history.state, ...positions }, "");
  }
};
async function doSwap(afterPreparation, viewTransition, afterDispatch) {
  const event = new TransitionBeforeSwapEvent(afterPreparation, viewTransition);
  document.dispatchEvent(event);
  if (afterDispatch) {
    await afterDispatch();
  }
  event.swap();
  return event;
}

const supportsViewTransitions = !!document.startViewTransition;
const transitionEnabledOnThisPage = () => !!document.querySelector('[name="astro-view-transitions-enabled"]');
const samePage = (thisLocation, otherLocation) => thisLocation.pathname === otherLocation.pathname && thisLocation.search === otherLocation.search;
let mostRecentNavigation;
let mostRecentTransition;
let originalLocation;
const announce = () => {
  let div = document.createElement("div");
  div.setAttribute("aria-live", "assertive");
  div.setAttribute("aria-atomic", "true");
  div.className = "astro-route-announcer";
  document.body.append(div);
  setTimeout(
    () => {
      let title = document.title || document.querySelector("h1")?.textContent || location.pathname;
      div.textContent = title;
    },
    // Much thought went into this magic number; the gist is that screen readers
    // need to see that the element changed and might not do so if it happens
    // too quickly.
    60
  );
};
const PERSIST_ATTR = "data-astro-transition-persist";
const DIRECTION_ATTR = "data-astro-transition";
const OLD_NEW_ATTR = "data-astro-transition-fallback";
let parser;
let currentHistoryIndex = 0;
{
  if (history.state) {
    currentHistoryIndex = history.state.index;
    scrollTo({ left: history.state.scrollX, top: history.state.scrollY });
  } else if (transitionEnabledOnThisPage()) {
    history.replaceState({ index: currentHistoryIndex, scrollX, scrollY }, "");
    history.scrollRestoration = "manual";
  }
}
async function fetchHTML(href, init) {
  try {
    const headers = new Headers(init?.headers);
    for (const [key, value] of Object.entries(internalFetchHeaders)) {
      headers.set(key, value);
    }
    const res = await fetch(href, { ...init, headers });
    const contentType = res.headers.get("content-type") ?? "";
    const mediaType = contentType.split(";", 1)[0].trim();
    if (mediaType !== "text/html" && mediaType !== "application/xhtml+xml") {
      return null;
    }
    const html = await res.text();
    return {
      html,
      redirected: res.redirected ? res.url : void 0,
      mediaType
    };
  } catch {
    return null;
  }
}
function getFallback$1() {
  const el = document.querySelector('[name="astro-view-transitions-fallback"]');
  if (el) {
    return el.getAttribute("content");
  }
  return "animate";
}
function runScripts() {
  let wait = Promise.resolve();
  let needsWaitForInlineModuleScript = false;
  for (const script of document.getElementsByTagName("script")) {
    script.dataset.astroExec === void 0 && script.getAttribute("type") === "module" && (needsWaitForInlineModuleScript = script.getAttribute("src") === null);
  }
  needsWaitForInlineModuleScript && document.body.insertAdjacentHTML(
    "beforeend",
    `<script type="module" src="data:application/javascript,"/>`
  );
  for (const script of document.getElementsByTagName("script")) {
    if (script.dataset.astroExec === "") continue;
    const type = script.getAttribute("type");
    if (type && type !== "module" && type !== "text/javascript") continue;
    const newScript = document.createElement("script");
    newScript.innerHTML = script.innerHTML;
    for (const attr of script.attributes) {
      if (attr.name === "src") {
        const p = new Promise((r) => {
          newScript.onload = newScript.onerror = r;
        });
        wait = wait.then(() => p);
      }
      newScript.setAttribute(attr.name, attr.value);
    }
    newScript.dataset.astroExec = "";
    script.replaceWith(newScript);
  }
  return wait;
}
const moveToLocation = (to, from, options, pageTitleForBrowserHistory, historyState) => {
  const intraPage = samePage(from, to);
  const targetPageTitle = document.title;
  document.title = pageTitleForBrowserHistory;
  let scrolledToTop = false;
  if (to.href !== location.href && !historyState) {
    if (options.history === "replace") {
      const current = history.state;
      history.replaceState(
        {
          ...options.state,
          index: current.index,
          scrollX: current.scrollX,
          scrollY: current.scrollY
        },
        "",
        to.href
      );
    } else {
      history.pushState(
        { ...options.state, index: ++currentHistoryIndex, scrollX: 0, scrollY: 0 },
        "",
        to.href
      );
    }
  }
  document.title = targetPageTitle;
  originalLocation = to;
  if (!intraPage) {
    scrollTo({ left: 0, top: 0, behavior: "instant" });
    scrolledToTop = true;
  }
  if (historyState) {
    scrollTo(historyState.scrollX, historyState.scrollY);
  } else {
    if (to.hash) {
      history.scrollRestoration = "auto";
      const savedState = history.state;
      location.href = to.href;
      if (!history.state) {
        history.replaceState(savedState, "");
        if (intraPage) {
          window.dispatchEvent(new PopStateEvent("popstate"));
        }
      }
    } else {
      if (!scrolledToTop) {
        scrollTo({ left: 0, top: 0, behavior: "instant" });
      }
    }
    history.scrollRestoration = "manual";
  }
};
function preloadStyleLinks(newDocument) {
  const links = [];
  for (const el of newDocument.querySelectorAll("head link[rel=stylesheet]")) {
    if (!document.querySelector(
      `[${PERSIST_ATTR}="${el.getAttribute(
        PERSIST_ATTR
      )}"], link[rel=stylesheet][href="${el.getAttribute("href")}"]`
    )) {
      const c = document.createElement("link");
      c.setAttribute("rel", "preload");
      c.setAttribute("as", "style");
      c.setAttribute("href", el.getAttribute("href"));
      links.push(
        new Promise((resolve) => {
          ["load", "error"].forEach((evName) => c.addEventListener(evName, resolve));
          document.head.append(c);
        })
      );
    }
  }
  return links;
}
async function updateDOM(preparationEvent, options, currentTransition, historyState, fallback) {
  async function animate(phase) {
    function isInfinite(animation) {
      const effect = animation.effect;
      if (!effect || !(effect instanceof KeyframeEffect) || !effect.target) return false;
      const style = window.getComputedStyle(effect.target, effect.pseudoElement);
      return style.animationIterationCount === "infinite";
    }
    const currentAnimations = document.getAnimations();
    document.documentElement.setAttribute(OLD_NEW_ATTR, phase);
    const nextAnimations = document.getAnimations();
    const newAnimations = nextAnimations.filter(
      (a) => !currentAnimations.includes(a) && !isInfinite(a)
    );
    return Promise.allSettled(newAnimations.map((a) => a.finished));
  }
  const animateFallbackOld = async () => {
    if (fallback === "animate" && !currentTransition.transitionSkipped && !preparationEvent.signal.aborted) {
      try {
        await animate("old");
      } catch {
      }
    }
  };
  const pageTitleForBrowserHistory = document.title;
  const swapEvent = await doSwap(
    preparationEvent,
    currentTransition.viewTransition,
    animateFallbackOld
  );
  moveToLocation(swapEvent.to, swapEvent.from, options, pageTitleForBrowserHistory, historyState);
  triggerEvent("astro:after-swap");
  if (fallback === "animate" && !currentTransition.transitionSkipped && !swapEvent.signal.aborted) {
    animate("new").finally(() => currentTransition.viewTransitionFinished());
  } else {
    currentTransition.viewTransitionFinished?.();
  }
}
function abortAndRecreateMostRecentNavigation() {
  mostRecentNavigation?.controller.abort();
  return mostRecentNavigation = {
    controller: new AbortController()
  };
}
async function transition(direction, from, to, options, historyState, hasUAVisualTransition = false) {
  const currentNavigation = abortAndRecreateMostRecentNavigation();
  if (!transitionEnabledOnThisPage() || location.origin !== to.origin) {
    if (currentNavigation === mostRecentNavigation) mostRecentNavigation = void 0;
    location.href = to.href;
    return;
  }
  const navigationType = historyState ? "traverse" : options.history === "replace" ? "replace" : "push";
  if (navigationType !== "traverse") {
    updateScrollPosition({ scrollX, scrollY });
  }
  if (samePage(from, to) && !options.formData) {
    if (direction !== "back" && to.hash || direction === "back" && from.hash) {
      moveToLocation(to, from, options, document.title, historyState);
      if (currentNavigation === mostRecentNavigation) mostRecentNavigation = void 0;
      return;
    }
  }
  const prepEvent = await doPreparation(
    from,
    to,
    direction,
    navigationType,
    options.sourceElement,
    options.info,
    currentNavigation.controller.signal,
    options.formData,
    defaultLoader
  );
  if (prepEvent.defaultPrevented || prepEvent.signal.aborted) {
    if (currentNavigation === mostRecentNavigation) mostRecentNavigation = void 0;
    if (!prepEvent.signal.aborted) {
      location.href = to.href;
    }
    return;
  }
  async function defaultLoader(preparationEvent) {
    const href = preparationEvent.to.href;
    const init = { signal: preparationEvent.signal };
    if (preparationEvent.formData) {
      init.method = "POST";
      const form = preparationEvent.sourceElement instanceof HTMLFormElement ? preparationEvent.sourceElement : preparationEvent.sourceElement instanceof HTMLElement && "form" in preparationEvent.sourceElement ? preparationEvent.sourceElement.form : preparationEvent.sourceElement?.closest("form");
      init.body = from !== void 0 && Reflect.get(HTMLFormElement.prototype, "attributes", form).getNamedItem("enctype")?.value === "application/x-www-form-urlencoded" ? new URLSearchParams(preparationEvent.formData) : preparationEvent.formData;
    }
    const response = await fetchHTML(href, init);
    if (response === null) {
      preparationEvent.preventDefault();
      return;
    }
    if (response.redirected) {
      const redirectedTo = new URL(response.redirected);
      if (redirectedTo.origin !== preparationEvent.to.origin) {
        preparationEvent.preventDefault();
        return;
      }
      const fragment = preparationEvent.to.hash;
      preparationEvent.to = redirectedTo;
      preparationEvent.to.hash = fragment;
    }
    parser ??= new DOMParser();
    preparationEvent.newDocument = parser.parseFromString(response.html, response.mediaType);
    preparationEvent.newDocument.querySelectorAll("noscript").forEach((el) => el.remove());
    if (!preparationEvent.newDocument.querySelector('[name="astro-view-transitions-enabled"]') && !preparationEvent.formData) {
      preparationEvent.preventDefault();
      return;
    }
    const links = preloadStyleLinks(preparationEvent.newDocument);
    links.length && !preparationEvent.signal.aborted && await Promise.all(links);
  }
  async function abortAndRecreateMostRecentTransition() {
    if (mostRecentTransition) {
      if (mostRecentTransition.viewTransition) {
        try {
          mostRecentTransition.viewTransition.skipTransition();
        } catch {
        }
        try {
          await mostRecentTransition.viewTransition.updateCallbackDone;
        } catch {
        }
      }
    }
    return mostRecentTransition = { transitionSkipped: false };
  }
  const currentTransition = await abortAndRecreateMostRecentTransition();
  if (prepEvent.signal.aborted) {
    if (currentNavigation === mostRecentNavigation) mostRecentNavigation = void 0;
    return;
  }
  document.documentElement.setAttribute(DIRECTION_ATTR, prepEvent.direction);
  if (supportsViewTransitions && !hasUAVisualTransition) {
    currentTransition.viewTransition = document.startViewTransition(
      async () => await updateDOM(prepEvent, options, currentTransition, historyState)
    );
  } else {
    const updateDone = (async () => {
      await Promise.resolve();
      await updateDOM(
        prepEvent,
        options,
        currentTransition,
        historyState,
        hasUAVisualTransition ? "swap" : getFallback$1()
      );
      return void 0;
    })();
    currentTransition.viewTransition = {
      updateCallbackDone: updateDone,
      // this is about correct
      ready: updateDone,
      // good enough
      // Finished promise could have been done better: finished rejects iff updateDone does.
      // Our simulation always resolves, never rejects.
      finished: new Promise((r) => currentTransition.viewTransitionFinished = r),
      // see end of updateDOM
      skipTransition: () => {
        currentTransition.transitionSkipped = true;
        document.documentElement.removeAttribute(OLD_NEW_ATTR);
      },
      types: /* @__PURE__ */ new Set()
      // empty by default
    };
  }
  currentTransition.viewTransition?.updateCallbackDone.finally(async () => {
    await runScripts();
    onPageLoad$1();
    announce();
  });
  currentTransition.viewTransition?.finished.finally(() => {
    currentTransition.viewTransition = void 0;
    if (currentTransition === mostRecentTransition) mostRecentTransition = void 0;
    if (currentNavigation === mostRecentNavigation) mostRecentNavigation = void 0;
    document.documentElement.removeAttribute(DIRECTION_ATTR);
    document.documentElement.removeAttribute(OLD_NEW_ATTR);
  });
  try {
    await currentTransition.viewTransition?.updateCallbackDone;
  } catch (e) {
    const err = e;
    console.log("[astro]", err.name, err.message, err.stack);
  }
}
async function navigate(href, options) {
  await transition("forward", originalLocation, new URL(href, location.href), options ?? {});
}
function onPopState(ev) {
  if (!transitionEnabledOnThisPage() && ev.state) {
    location.reload();
    return;
  }
  if (ev.state === null) {
    return;
  }
  const state = history.state;
  const nextIndex = state.index;
  const direction = nextIndex > currentHistoryIndex ? "forward" : "back";
  currentHistoryIndex = nextIndex;
  transition(
    direction,
    originalLocation,
    new URL(location.href),
    {},
    state,
    ev.hasUAVisualTransition
  );
}
const onScrollEnd = () => {
  if (history.state && (scrollX !== history.state.scrollX || scrollY !== history.state.scrollY)) {
    updateScrollPosition({ scrollX, scrollY });
  }
};
{
  if (supportsViewTransitions || getFallback$1() !== "none") {
    originalLocation = new URL(location.href);
    addEventListener("popstate", onPopState);
    addEventListener("load", onPageLoad$1);
    if ("onscrollend" in window) addEventListener("scrollend", onScrollEnd);
    else {
      let intervalId, lastY, lastX, lastIndex;
      const scrollInterval = () => {
        if (lastIndex !== history.state?.index) {
          clearInterval(intervalId);
          intervalId = void 0;
          return;
        }
        if (lastY === scrollY && lastX === scrollX) {
          clearInterval(intervalId);
          intervalId = void 0;
          onScrollEnd();
          return;
        } else {
          lastY = scrollY, lastX = scrollX;
        }
      };
      addEventListener(
        "scroll",
        () => {
          if (intervalId !== void 0) return;
          lastIndex = history.state?.index, lastY = scrollY, lastX = scrollX;
          intervalId = window.setInterval(scrollInterval, 50);
        },
        { passive: true }
      );
    }
  }
  for (const script of document.getElementsByTagName("script")) {
    detectScriptExecuted(script);
    script.dataset.astroExec = "";
  }
}

const prefetchedUrls = /* @__PURE__ */ new Set();
const listenedAnchors = /* @__PURE__ */ new WeakSet();
let prefetchAll = void 0;
let defaultStrategy = void 0;
let inited = false;
function init(defaultOpts) {
  if (inited) return;
  inited = true;
  prefetchAll ??= defaultOpts?.prefetchAll;
  defaultStrategy ??= defaultOpts?.defaultStrategy ?? "hover";
  initTapStrategy();
  initHoverStrategy();
  initViewportStrategy();
  initLoadStrategy();
}
function initTapStrategy() {
  for (const event of ["touchstart", "mousedown"]) {
    document.addEventListener(
      event,
      (e) => {
        const anchor = e.target.closest("a");
        if (elMatchesStrategy(anchor, "tap")) {
          prefetch(anchor.href, { ignoreSlowConnection: true });
        }
      },
      { passive: true }
    );
  }
}
function initHoverStrategy() {
  let timeout;
  document.body.addEventListener(
    "focusin",
    (e) => {
      const anchor = e.target.closest("a");
      if (elMatchesStrategy(anchor, "hover")) {
        handleHoverIn(anchor.href);
      }
    },
    { passive: true }
  );
  document.body.addEventListener("focusout", handleHoverOut, { passive: true });
  onPageLoad(() => {
    for (const anchor of document.getElementsByTagName("a")) {
      if (listenedAnchors.has(anchor)) continue;
      if (elMatchesStrategy(anchor, "hover")) {
        listenedAnchors.add(anchor);
        anchor.addEventListener(
          "mouseenter",
          (e) => handleHoverIn(e.currentTarget.href),
          { passive: true }
        );
        anchor.addEventListener("mouseleave", handleHoverOut, { passive: true });
      }
    }
  });
  function handleHoverIn(href) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      prefetch(href);
    }, 80);
  }
  function handleHoverOut() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = 0;
    }
  }
}
function initViewportStrategy() {
  let observer;
  onPageLoad(() => {
    for (const anchor of document.getElementsByTagName("a")) {
      if (listenedAnchors.has(anchor)) continue;
      if (elMatchesStrategy(anchor, "viewport")) {
        listenedAnchors.add(anchor);
        observer ??= createViewportIntersectionObserver();
        observer.observe(anchor);
      }
    }
  });
}
function createViewportIntersectionObserver() {
  const timeouts = /* @__PURE__ */ new WeakMap();
  return new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      const anchor = entry.target;
      const timeout = timeouts.get(anchor);
      if (entry.isIntersecting) {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeouts.set(
          anchor,
          setTimeout(() => {
            observer.unobserve(anchor);
            timeouts.delete(anchor);
            prefetch(anchor.href);
          }, 300)
        );
      } else {
        if (timeout) {
          clearTimeout(timeout);
          timeouts.delete(anchor);
        }
      }
    }
  });
}
function initLoadStrategy() {
  onPageLoad(() => {
    for (const anchor of document.getElementsByTagName("a")) {
      if (elMatchesStrategy(anchor, "load")) {
        prefetch(anchor.href);
      }
    }
  });
}
function prefetch(url, opts) {
  url = url.replace(/#.*/, "");
  const ignoreSlowConnection = opts?.ignoreSlowConnection ?? false;
  if (!canPrefetchUrl(url, ignoreSlowConnection)) return;
  prefetchedUrls.add(url);
  if (document.createElement("link").relList?.supports?.("prefetch")) {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.setAttribute("href", url);
    document.head.append(link);
  } else {
    const headers = new Headers();
    for (const [key, value] of Object.entries(internalFetchHeaders)) {
      headers.set(key, value);
    }
    fetch(url, { priority: "low", headers });
  }
}
function canPrefetchUrl(url, ignoreSlowConnection) {
  if (!navigator.onLine) return false;
  if (!ignoreSlowConnection && isSlowConnection()) return false;
  try {
    const urlObj = new URL(url, location.href);
    return location.origin === urlObj.origin && (location.pathname !== urlObj.pathname || location.search !== urlObj.search) && !prefetchedUrls.has(url);
  } catch {
  }
  return false;
}
function elMatchesStrategy(el, strategy) {
  if (el?.tagName !== "A") return false;
  const attrValue = el.dataset.astroPrefetch;
  if (attrValue === "false") {
    return false;
  }
  if (strategy === "tap" && (attrValue != null || prefetchAll) && isSlowConnection()) {
    return true;
  }
  if (attrValue == null && prefetchAll || attrValue === "") {
    return strategy === defaultStrategy;
  }
  if (attrValue === strategy) {
    return true;
  }
  return false;
}
function isSlowConnection() {
  if ("connection" in navigator) {
    const conn = navigator.connection;
    return conn.saveData || /2g/.test(conn.effectiveType);
  }
  return false;
}
function onPageLoad(cb) {
  cb();
  let firstLoad = false;
  document.addEventListener("astro:page-load", () => {
    if (!firstLoad) {
      firstLoad = true;
      return;
    }
    cb();
  });
}

let lastClickedElementLeavingWindow = null;
function getFallback() {
  const el = document.querySelector('[name="astro-view-transitions-fallback"]');
  if (el) {
    return el.getAttribute("content");
  }
  return "animate";
}
function isReloadEl(el) {
  return el.dataset.astroReload !== void 0;
}
const leavesWindow = (ev) => ev.button && ev.button !== 0 || // left clicks only
ev.metaKey || // new tab (mac)
ev.ctrlKey || // new tab (windows)
ev.altKey || // download
ev.shiftKey;
if (supportsViewTransitions || getFallback() !== "none") {
  document.addEventListener("click", (ev) => {
    let link = ev.target;
    lastClickedElementLeavingWindow = leavesWindow(ev) ? link : null;
    if (ev.composed) {
      link = ev.composedPath()[0];
    }
    if (link instanceof Element) {
      link = link.closest("a, area");
    }
    if (!(link instanceof HTMLAnchorElement) && !(link instanceof SVGAElement) && !(link instanceof HTMLAreaElement))
      return;
    const linkTarget = link instanceof HTMLElement ? link.target : link.target.baseVal;
    const href = link instanceof HTMLElement ? link.href : link.href.baseVal;
    const origin = new URL(href, location.href).origin;
    if (isReloadEl(link) || link.hasAttribute("download") || !link.href || linkTarget && linkTarget !== "_self" || origin !== location.origin || lastClickedElementLeavingWindow || ev.defaultPrevented) {
      return;
    }
    ev.preventDefault();
    navigate(href, {
      history: link.dataset.astroHistory === "replace" ? "replace" : "auto",
      sourceElement: link
    });
  });
  document.addEventListener("submit", (ev) => {
    let el = ev.target;
    const submitter = ev.submitter;
    const clickedWithKeys = submitter && submitter === lastClickedElementLeavingWindow;
    lastClickedElementLeavingWindow = null;
    if (el.tagName !== "FORM" || ev.defaultPrevented || isReloadEl(el) || clickedWithKeys) {
      return;
    }
    const form = el;
    const formData = new FormData(form, submitter);
    const formAction = typeof form.action === "string" ? form.action : form.getAttribute("action");
    const formMethod = typeof form.method === "string" ? form.method : form.getAttribute("method");
    let action = submitter?.getAttribute("formaction") ?? formAction ?? location.pathname;
    const method = submitter?.getAttribute("formmethod") ?? formMethod ?? "get";
    if (method === "dialog" || location.origin !== new URL(action, location.href).origin) {
      return;
    }
    const options = { sourceElement: submitter ?? form };
    if (method === "get") {
      const params = new URLSearchParams(formData);
      const url = new URL(action);
      url.search = params.toString();
      action = url.toString();
    } else {
      options.formData = formData;
    }
    ev.preventDefault();
    navigate(action, options);
  });
  {
    init({ prefetchAll: true });
  }
}
