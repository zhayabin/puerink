(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node.js或CommonJS
    module.exports = factory();
  } else {
    // 浏览器全局变量
    root.Waline = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  const h = (t) => `${t.replace(/\/?$/, "/")}api/`;

  const i = (t, e = "") => {
    if (typeof t == "object" && t.errno)
      throw new TypeError(`${e} failed with ${t.errno}: ${t.errmsg}`);
    return t;
  };

  const g = ({ serverURL: t, lang: e, paths: r, signal: o }) =>
    fetch(
      `${h(t)}comment?type=count&url=${encodeURIComponent(r.join(","))}&lang=${e}`,
      { signal: o },
    )
      .then((n) => n.json())
      .then((n) => i(n, "Get comment count").data);

  const p = (t) => {
    try {
      t = decodeURI(t);
    } catch {}
    return t;
  };

  const m = (t = "") => t.replace(/\/$/u, "");

  const u = (t) => /^(https?:)?\/\//.test(t);

  const d = (t) => {
    const e = m(t);
    return u(e) ? e : `https://${e}`;
  };

  const $ = (t) => {
    t.name !== "AbortError" && console.error(t.message);
  };

  const f = (t) => {
    const { path: e } = t.dataset;
    return e != null && e.length ? e : null;
  };

  const v = ({
    serverURL: t,
    path: e = window.location.pathname,
    selector: r = ".waline-comment-count",
    lang: o = navigator.language,
  }) => {
    const n = new AbortController(),
      a = document.querySelectorAll(r);
    return (
      a.length &&
        g({
          serverURL: d(t),
          paths: Array.from(a).map((c) => p(f(c) ?? e)),
          lang: o,
          signal: n.signal,
        })
          .then((c) => {
            a.forEach((s, l) => {
              s.innerText = c[l].toString();
            });
          })
          .catch($),
      n.abort.bind(n)
    );
  };

  const w = "3.3.2"; // 版本号

  return { commentCount: v, version: w };
}));
