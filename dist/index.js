var Mt = Object.defineProperty;
var Pt = (n, t, e) => t in n ? Mt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var Y = (n, t, e) => (Pt(n, typeof t != "symbol" ? t + "" : t, e), e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, et = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, st = Symbol(), ot = /* @__PURE__ */ new WeakMap();
let $t = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== st)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (et && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ot.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ot.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Tt = (n) => new $t(typeof n == "string" ? n : n + "", void 0, st), Ut = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, r, i) => s + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + n[i + 1], n[0]);
  return new $t(e, n, st);
}, Ht = (n, t) => {
  if (et)
    n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const s = document.createElement("style"), r = L.litNonce;
      r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, n.appendChild(s);
    }
}, at = et ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return Tt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ot, defineProperty: It, getOwnPropertyDescriptor: Rt, getOwnPropertyNames: zt, getOwnPropertySymbols: jt, getPrototypeOf: Lt } = Object, A = globalThis, lt = A.trustedTypes, Vt = lt ? lt.emptyScript : "", Z = A.reactiveElementPolyfillSupport, P = (n, t) => n, Q = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Vt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, yt = (n, t) => !Ot(n, t), ht = { attribute: !0, type: String, converter: Q, reflect: !1, hasChanged: yt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), A.litPropertyMetadata ?? (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class D extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ht) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && It(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: i } = Rt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get() {
      return r == null ? void 0 : r.call(this);
    }, set(o) {
      const l = r == null ? void 0 : r.call(this);
      i.call(this, o), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties")))
      return;
    const t = Lt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, s = [...zt(e), ...jt(e)];
      for (const r of s)
        this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [s, r] of e)
          this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s)
        e.unshift(at(r));
    } else
      t !== void 0 && e.push(at(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$Eg = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$ES(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$E_ ?? (this._$E_ = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$E_) == null || e.delete(t);
  }
  _$ES() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys())
      this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ht(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$E_) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$E_) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EO(t, e) {
    var i;
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const o = (((i = s.converter) == null ? void 0 : i.toAttribute) !== void 0 ? s.converter : Q).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = s.getPropertyOptions(r), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((i = o.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? o.converter : Q;
      this._$Em = r, this[r] = l.fromAttribute(e, o.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, i) {
    if (t !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(t)), !(s.hasChanged ?? yt)(r ? i : this[t], e))
        return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$Eg = this._$EP());
  }
  C(t, e, s) {
    this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$Eg;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [i, o] of this._$Ep)
          this[i] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0)
        for (const [i, o] of r)
          o.wrapped !== !0 || this._$AL.has(i) || this[i] === void 0 || this.C(i, this[i], o);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$E_) == null || s.forEach((r) => {
        var i;
        return (i = r.hostUpdate) == null ? void 0 : i.call(r);
      }), this.update(e)) : this._$ET();
    } catch (r) {
      throw t = !1, this._$ET(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$E_) == null || e.forEach((s) => {
      var r;
      return (r = s.hostUpdated) == null ? void 0 : r.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$ET() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Eg;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EO(e, this[e]))), this._$ET();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
D.elementStyles = [], D.shadowRootOptions = { mode: "open" }, D[P("elementProperties")] = /* @__PURE__ */ new Map(), D[P("finalized")] = /* @__PURE__ */ new Map(), Z == null || Z({ ReactiveElement: D }), (A.reactiveElementVersions ?? (A.reactiveElementVersions = [])).push("2.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, V = T.trustedTypes, dt = V ? V.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, At = "$lit$", y = `lit$${(Math.random() + "").slice(9)}$`, Ft = "?" + y, qt = `<${Ft}>`, S = document, H = () => S.createComment(""), O = (n) => n === null || typeof n != "object" && typeof n != "function", vt = Array.isArray, Wt = (n) => vt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, ut = />/g, v = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, gt = /"/g, wt = /^(?:script|style|textarea|title)$/i, Kt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), z = Kt(1), F = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), k = S.createTreeWalker(S, 129);
function Et(n, t) {
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return dt !== void 0 ? dt.createHTML(t) : t;
}
const Yt = (n, t) => {
  const e = n.length - 1, s = [];
  let r, i = t === 2 ? "<svg>" : "", o = N;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let h, c, d = -1, g = 0;
    for (; g < a.length && (o.lastIndex = g, c = o.exec(a), c !== null); )
      g = o.lastIndex, o === N ? c[1] === "!--" ? o = ct : c[1] !== void 0 ? o = ut : c[2] !== void 0 ? (wt.test(c[2]) && (r = RegExp("</" + c[2], "g")), o = v) : c[3] !== void 0 && (o = v) : o === v ? c[0] === ">" ? (o = r ?? N, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, h = c[1], o = c[3] === void 0 ? v : c[3] === '"' ? gt : pt) : o === gt || o === pt ? o = v : o === ct || o === ut ? o = N : (o = v, r = void 0);
    const p = o === v && n[l + 1].startsWith("/>") ? " " : "";
    i += o === N ? a + qt : d >= 0 ? (s.push(h), a.slice(0, d) + At + a.slice(d) + y + p) : a + y + (d === -2 ? l : p);
  }
  return [Et(n, i + (n[e] || "<?>") + (t === 2 ? "</svg>" : "")), s];
};
class I {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let i = 0, o = 0;
    const l = t.length - 1, a = this.parts, [h, c] = Yt(t, e);
    if (this.el = I.createElement(h, s), k.currentNode = this.el.content, e === 2) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = k.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes())
          for (const d of r.getAttributeNames())
            if (d.endsWith(At)) {
              const g = c[o++], p = r.getAttribute(d).split(y), b = /([.?@])?(.*)/.exec(g);
              a.push({ type: 1, index: i, name: b[2], strings: p, ctor: b[1] === "." ? Jt : b[1] === "?" ? Gt : b[1] === "@" ? Xt : q }), r.removeAttribute(d);
            } else
              d.startsWith(y) && (a.push({ type: 6, index: i }), r.removeAttribute(d));
        if (wt.test(r.tagName)) {
          const d = r.textContent.split(y), g = d.length - 1;
          if (g > 0) {
            r.textContent = V ? V.emptyScript : "";
            for (let p = 0; p < g; p++)
              r.append(d[p], H()), k.nextNode(), a.push({ type: 2, index: ++i });
            r.append(d[g], H());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === Ft)
          a.push({ type: 2, index: i });
        else {
          let d = -1;
          for (; (d = r.data.indexOf(y, d + 1)) !== -1; )
            a.push({ type: 7, index: i }), d += y.length - 1;
        }
      i++;
    }
  }
  static createElement(t, e) {
    const s = S.createElement("template");
    return s.innerHTML = t, s;
  }
}
function B(n, t, e = n, s) {
  var o, l;
  if (t === F)
    return t;
  let r = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const i = O(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== i && ((l = r == null ? void 0 : r._$AO) == null || l.call(r, !1), i === void 0 ? r = void 0 : (r = new i(n), r._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = r : e._$Cl = r), r !== void 0 && (t = B(n, r._$AS(n, t.values), r, s)), t;
}
class Zt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? S).importNode(e, !0);
    k.currentNode = r;
    let i = k.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new R(i, i.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(i, a.name, a.strings, this, t) : a.type === 6 && (h = new Qt(i, this, t)), this._$AV.push(h), a = s[++l];
      }
      o !== (a == null ? void 0 : a.index) && (i = k.nextNode(), o++);
    }
    return k.currentNode = S, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class R {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = B(this, t, e), O(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== F && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Wt(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== f && O(this._$AH) ? this._$AA.nextSibling.data = t : this.$(S.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var i;
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = I.createElement(Et(s.h, s.h[0]), this.options)), s);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === r)
      this._$AH.p(e);
    else {
      const o = new Zt(r, this), l = o.u(this.options);
      o.p(e), this.$(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new I(t)), e;
  }
  T(t) {
    vt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const i of t)
      r === e.length ? e.push(s = new R(this.k(H()), this.k(H()), this, this.options)) : s = e[r], s._$AI(i), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, i) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = i, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = f;
  }
  _$AI(t, e = this, s, r) {
    const i = this.strings;
    let o = !1;
    if (i === void 0)
      t = B(this, t, e, 0), o = !O(t) || t !== this._$AH && t !== F, o && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = i[0], a = 0; a < i.length - 1; a++)
        h = B(this, l[s + a], e, a), h === F && (h = this._$AH[a]), o || (o = !O(h) || h !== this._$AH[a]), h === f ? t = f : t !== f && (t += (h ?? "") + i[a + 1]), this._$AH[a] = h;
    }
    o && !r && this.O(t);
  }
  O(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Jt extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  O(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Gt extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  O(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Xt extends q {
  constructor(t, e, s, r, i) {
    super(t, e, s, r, i), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = B(this, t, e, 0) ?? f) === F)
      return;
    const s = this._$AH, r = t === f && s !== f || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, i = t !== f && (s === f || r);
    r && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Qt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    B(this, t);
  }
}
const G = T.litHtmlPolyfillSupport;
G == null || G(I, R), (T.litHtmlVersions ?? (T.litHtmlVersions = [])).push("3.1.0");
const te = (n, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const i = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = r = new R(t.insertBefore(H(), i), i, void 0, e ?? {});
  }
  return r._$AI(n), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class U extends D {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = te(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return F;
  }
}
var bt;
U._$litElement$ = !0, U.finalized = !0, (bt = globalThis.litElementHydrateSupport) == null || bt.call(globalThis, { LitElement: U });
const X = globalThis.litElementPolyfillSupport;
X == null || X({ LitElement: U });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, kt = (n) => (...t) => ({ _$litDirective$: n, values: t });
let St = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = kt(class extends St {
  constructor(n) {
    var t;
    if (super(n), n.type !== _t.ATTRIBUTE || n.name !== "class" || ((t = n.strings) == null ? void 0 : t.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return " " + Object.keys(n).filter((t) => n[t]).join(" ") + " ";
  }
  update(n, [t]) {
    var s, r;
    if (this.it === void 0) {
      this.it = /* @__PURE__ */ new Set(), n.strings !== void 0 && (this.st = new Set(n.strings.join(" ").split(/\s/).filter((i) => i !== "")));
      for (const i in t)
        t[i] && !((s = this.st) != null && s.has(i)) && this.it.add(i);
      return this.render(t);
    }
    const e = n.element.classList;
    for (const i of this.it)
      i in t || (e.remove(i), this.it.delete(i));
    for (const i in t) {
      const o = !!t[i];
      o === this.it.has(i) || (r = this.st) != null && r.has(i) || (o ? (e.add(i), this.it.add(i)) : (e.remove(i), this.it.delete(i)));
    }
    return F;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = "important", ee = " !" + xt, w = kt(class extends St {
  constructor(n) {
    var t;
    if (super(n), n.type !== _t.ATTRIBUTE || n.name !== "style" || ((t = n.strings) == null ? void 0 : t.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return Object.keys(n).reduce((t, e) => {
      const s = n[e];
      return s == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(n, [t]) {
    const { style: e } = n.element;
    if (this.ut === void 0)
      return this.ut = new Set(Object.keys(t)), this.render(t);
    for (const s of this.ut)
      t[s] == null && (this.ut.delete(s), s.includes("-") ? e.removeProperty(s) : e[s] = null);
    for (const s in t) {
      const r = t[s];
      if (r != null) {
        this.ut.add(s);
        const i = typeof r == "string" && r.endsWith(ee);
        s.includes("-") || i ? e.setProperty(s, i ? r.slice(0, -11) : r, i ? xt : "") : e[s] = r;
      }
    }
    return F;
  }
}), se = Ut`
  :host {
    --font-fam:  Roboto, -apple-system, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --outer-color:#444;
    --hand-color: #ddd;
    --outer-lighting-effect:conic-gradient(from 180deg at 50.0% 50.0%,
      rgba(0,0,0,0) 98.00deg,
      rgba(255,255,255,0.3) 103.00deg,
      rgba(255,255,255,0.5) 180.00deg,
      rgba(255,255,255,0.3) 257.00deg,
      rgba(0,0,0,0) 265.00deg
    );
    --label-bg: #000;
    --label-color:#fff;
    --tick-color:#fff;
    --tick-label-color:#fff;
    --tick-label-shadow: 0 1px 1px black;
    --dial-background:rgb(22,22,22);
    --dial-gradient:none;
    --dial-shadow: 0 0 1em .25em rgba(122,122,122,.8), inset 0 0 2em #bbb;
    --dial-border-width: 1px;
    --dial-border-color:#111;
    --label-min-width:3em;
  }
  :host *{
    box-sizing: border-box;
    font-family: var(--font-fam);
    font-weight: 400;
  }
  :host .outer-gauge {
    background: transparent;
    border: none;
    box-shadow: none;
    display: inline-block;
    border-radius: 50%;
  }
  :host .outer-gauge.no-lighting  .gauge-wrap{
    background-image:none;
  }
  :host .outer-gauge .gauge-wrap {
    color:white;
    transform: scale(-1, 1);
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    padding: 10%;
    background-color: var(--outer-color);
    background-image: var(--outer-lighting-effect);
  }
  :host .hand {
    background: var(--hand-color);
    height: 65%;
    left: 47.5%;
    position: absolute;
    top: 5%;
    transform-origin: 50% 69%;
    width: 5%;
    z-index: 12;
    clip-path: polygon(50% 0, 100% 95%, 50% 100%, 0 95%, 50% 0);
    box-shadow: 2px 10px 2px #333;
  }
  :host .tick {
    width: 0px;
    height: 100%;
    font-weight: 100;
    top: 50%;
    left: 50%;
    position: absolute;
    z-index: 11;
  }
  :host .tick:before {
    line-height:.5;
    content: attr(v);
    position: absolute;
    height: 5%;
    bottom: 91%;
    text-align: center;
    width: 80px;
    margin-left: -40px;
    vertical-align: text-bottom;
    display: inline-block;
    text-shadow:var(--tick-label-shadow);
    color:var(--tick-label-color);
  }
  :host .tick.flip:before {
    transform: scale(1, -1);
    bottom:92.5%;
  }
  :host .tick:after {
    content: '';
    position: absolute;
    background-color: var(--tick-color);
    width: 1px;
    height: 5%;
    bottom: 80%;
  }
  :host .tick.minor:after {
    width: .7px;
    height: 2.5%;
    bottom: 82.2%;
  }
  :host div.dial {
    position: relative;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    border-style:solid;
    border-width:var(--dial-border-width);
    border-color:var(--dial-border-color);
    box-shadow: var(--dial-shadow);
    background-color: var(--dial-background);
    --center-gradient:radial-gradient(ellipse at center,
      rgba(0, 0, 0, .7) 0%,
      rgba(0, 0, 0, 1) 18%,
      rgba(0, 0, 0, 0) 22%,
      rgba(0, 0, 0, 0.65) 100%
    );
    --center-color:white;
    --center-shadow:var(--hand-color);
  }
  :host .no-lighting div.dial{
    box-shadow: none;
  }
  :host div.dial .lbl {
    transform: scale(-1, 1);
    width: 100%;
    margin: 2px auto;
    position: absolute;
    bottom: -27%;
    padding: 10%;
    left:2.5px;
    text-align: center;
    white-space: nowrap;
    z-index: 3;
    color:var(--label-color);
  }
  :host div.dial .lbl.plain{
    bottom:0;
  }
  :host .lbl span {
    border-radius: 36%;
    padding: 2px 10px;
    min-width: var(--label-min-width);
    display: inline-block;
    background-color:var(--label-bg);
    text-shadow: 0 1px 1px #fff;
  }
  :host div.dial:before {
    content: '';
    background-color: var(--center-color);
    background-image: var(--center-gradient);
    border-radius: 50%;
    box-shadow:0 0 0 1px var(--center-shadow);
    //border-color: var(--center-color);
    height: 8%;
    width: 8%;
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    margin:-4%;
    z-index: 14;
   }
  :host .color-band {
    position: absolute;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    transform: scale(-1, 1);

  }
  :host .color-band:before {
    content: " ";
    position: absolute;
    top: 7%;
    left: 10%;
    height: 43%;
    width: 80%;
    border-radius: 50% 50% 50% 50%/75% 75% 25% 25%;
    box-shadow: inset 0 -.6em 1.35em rgba(255, 255, 255, .3),inset 0 -.1em .2em rgba(255, 255, 255, .3), inset 0 .5em 2.2em rgba(255, 255, 255, .5);
    background-color:rgba(255,255,255,.1);
    z-index: 11;
    opacity:.6;

  }
  :host .no-lighting .color-band:before{
    display: none;

  }
  :host .no-lighting .color-band:after{
    background-image: none;
    box-shadow: none;
  }
  :host .color-band:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    height: 88%;
    width: 88%;
    top: 6%;
    left: 6%;
    background: var(--dial-background);
    background-image:var(--dial-gradient);
  }
`, m = (n) => W(255, Math.round(Number(n))), E = (n) => m(n * 255), _ = (n) => W(1, n / 255), W = (n, t) => Math.max(0, Math.min(n, t)), C = (n) => n === void 0 ? 1 : (typeof n == "string" && n.indexOf("%") > 0 && (n = Number(n.split("%")[0]) / 100), n = Number(Number(n).toFixed(3)), isNaN(n) ? 1 : W(1, n)), mt = {
  aliceblue: "#F0F8FF",
  antiquewhite: "#FAEBD7",
  aqua: "#00FFFF",
  aquamarine: "#7FFFD4",
  azure: "#F0FFFF",
  beige: "#F5F5DC",
  bisque: "#FFE4C4",
  black: "#000000",
  blanchedalmond: "#FFEBCD",
  blue: "#0000FF",
  blueviolet: "#8A2BE2",
  brown: "#A52A2A",
  burlywood: "#DEB887",
  cadetblue: "#5F9EA0",
  chartreuse: "#7FFF00",
  chocolate: "#D2691E",
  coral: "#FF7F50",
  cornflowerblue: "#6495ED",
  cornsilk: "#FFF8DC",
  crimson: "#DC143C",
  cyan: "#00FFFF",
  darkblue: "#00008B",
  darkcyan: "#008B8B",
  darkgoldenrod: "#B8860B",
  darkgray: "#A9A9A9",
  darkgrey: "#A9A9A9",
  darkgreen: "#006400",
  darkkhaki: "#BDB76B",
  darkmagenta: "#8B008B",
  darkolivegreen: "#556B2F",
  darkorange: "#FF8C00",
  darkorchid: "#9932CC",
  darkred: "#8B0000",
  darksalmon: "#E9967A",
  darkseagreen: "#8FBC8F",
  darkslateblue: "#483D8B",
  darkslategray: "#2F4F4F",
  darkslategrey: "#2F4F4F",
  darkturquoise: "#00CED1",
  darkviolet: "#9400D3",
  deeppink: "#FF1493",
  deepskyblue: "#00BFFF",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1E90FF",
  firebrick: "#B22222",
  floralwhite: "#FFFAF0",
  forestgreen: "#228B22",
  fuchsia: "#FF00FF",
  gainsboro: "#DCDCDC",
  ghostwhite: "#F8F8FF",
  gold: "#FFD700",
  goldenrod: "#DAA520",
  gray: "#808080",
  grey: "#808080",
  green: "#008000",
  greenyellow: "#ADFF2F",
  honeydew: "#F0FFF0",
  hotpink: "#FF69B4",
  indianred: "#CD5C5C",
  indigo: "#4B0082",
  ivory: "#FFFFF0",
  khaki: "#F0E68C",
  lavender: "#E6E6FA",
  lavenderblush: "#FFF0F5",
  lawngreen: "#7CFC00",
  lemonchiffon: "#FFFACD",
  lightblue: "#ADD8E6",
  lightcoral: "#F08080",
  lightcyan: "#E0FFFF",
  lightgoldenrodyellow: "#FAFAD2",
  lightgray: "#D3D3D3",
  lightgrey: "#D3D3D3",
  lightgreen: "#90EE90",
  lightpink: "#FFB6C1",
  lightsalmon: "#FFA07A",
  lightseagreen: "#20B2AA",
  lightskyblue: "#87CEFA",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#B0C4DE",
  lightyellow: "#FFFFE0",
  lime: "#00FF00",
  limegreen: "#32CD32",
  linen: "#FAF0E6",
  magenta: "#FF00FF",
  maroon: "#800000",
  mediumaquamarine: "#66CDAA",
  mediumblue: "#0000CD",
  mediumorchid: "#BA55D3",
  mediumpurple: "#9370DB",
  mediumseagreen: "#3CB371",
  mediumslateblue: "#7B68EE",
  mediumspringgreen: "#00FA9A",
  mediumturquoise: "#48D1CC",
  mediumvioletred: "#C71585",
  midnightblue: "#191970",
  mintcream: "#F5FFFA",
  mistyrose: "#FFE4E1",
  moccasin: "#FFE4B5",
  navajowhite: "#FFDEAD",
  navy: "#000080",
  oldlace: "#FDF5E6",
  olive: "#808000",
  olivedrab: "#6B8E23",
  orange: "#FFA500",
  orangered: "#FF4500",
  orchid: "#DA70D6",
  palegoldenrod: "#EEE8AA",
  palegreen: "#98FB98",
  paleturquoise: "#AFEEEE",
  palevioletred: "#DB7093",
  papayawhip: "#FFEFD5",
  peachpuff: "#FFDAB9",
  peru: "#CD853F",
  pink: "#FFC0CB",
  plum: "#DDA0DD",
  powderblue: "#B0E0E6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#FF0000",
  rosybrown: "#BC8F8F",
  royalblue: "#4169E1",
  saddlebrown: "#8B4513",
  salmon: "#FA8072",
  sandybrown: "#F4A460",
  seagreen: "#2E8B57",
  seashell: "#FFF5EE",
  sienna: "#A0522D",
  silver: "#C0C0C0",
  skyblue: "#87CEEB",
  slateblue: "#6A5ACD",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#FFFAFA",
  springgreen: "#00FF7F",
  steelblue: "#4682B4",
  tan: "#D2B48C",
  teal: "#008080",
  thistle: "#D8BFD8",
  tomato: "#FF6347",
  turquoise: "#40E0D0",
  violet: "#EE82EE",
  wheat: "#F5DEB3",
  white: "#FFFFFF",
  whitesmoke: "#F5F5F5",
  yellow: "#FFFF00",
  yellowgreen: "#9ACD32"
};
class u {
  constructor(t, e, s, r) {
    return u.isBaseConstructor(t) ? (this.r = m(t.r), this.g = m(t.g), this.b = m(t.b), t.a !== void 0 && (this.a = C(t.a)), this) : u.parse(t, e, s, r);
  }
  static parse(t, e, s, r) {
    if (u.isBaseConstructor(t))
      return new u(t);
    if (e !== void 0 && s !== void 0) {
      let i = m(t);
      return e = m(e), s = m(s), r !== void 0 && (r = C(r)), new u({ r: i, g: e, b: s, a: r });
    }
    if (Array.isArray(t))
      return u.fromArray(t);
    if (typeof t == "string") {
      let i;
      if (e !== void 0 && Number(e) <= 1 && Number(e) >= 0 && (i = Number(e)), t.startsWith("#"))
        return u.fromHex(t, i);
      if (mt[t.toLowerCase()])
        return u.fromNamed(t, i);
      if (t.startsWith("rgb"))
        return u.fromRgbString(t);
      if (t === "transparent") {
        let o, l, a, h;
        return o = l = a = h = 0, new u({ r: o, g: l, b: a, a: h });
      } else
        return null;
    } else if (typeof t == "object") {
      if (t.a !== void 0 && (this.a = C(t.a)), t.h !== void 0) {
        let i = {};
        if (t.v !== void 0)
          i = u.fromHsv(t);
        else if (t.l !== void 0)
          i = u.fromHsl(t);
        else
          return u.fromArray([0, 0, 0]);
        return i.a = t.a !== void 0 ? C(t.a) : void 0, new u(i);
      }
      return t.c !== void 0 ? u.fromCMYK(t) : this;
    }
    return u.fromArray([0, 0, 0]);
  }
  static isBaseConstructor(t) {
    return typeof t == "object" && t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
  }
  static fromNamed(t, e) {
    return u.fromHex(mt[t.toLowerCase()], e);
  }
  static fromArray(t) {
    t = t.filter((s) => s !== "" && isFinite(s));
    const e = {
      r: m(t[0]),
      g: m(t[1]),
      b: m(t[2])
    };
    return t[3] !== void 0 && (e.a = C(t[3])), new u(e);
  }
  static fromHex(t, e) {
    t = t.replace("#", ""), (t.length === 3 || t.length === 4) && (t = t.split("").map((r) => r + r).join(""));
    let s = t.match(/[A-Za-z0-9]{2}/g).map((r) => parseInt(r, 16));
    return s.length === 4 ? s[3] /= 255 : e !== void 0 && (s[3] = e), u.fromArray(s);
  }
  static fromRgbString(t) {
    if (t.includes(","))
      return u.fromArray(t.split("(")[1].split(")")[0].split(","));
    const e = t.replace("/", " ").split("(")[1].replace(")", "").split(" ").filter((s) => s !== "" && isFinite(Number(s)));
    return u.fromArray(e);
  }
  static fromHsv({ h: t, s: e, v: s }) {
    e = e / 100, s = s / 100;
    const r = Math.floor(t / 60 % 6), i = t / 60 - r, o = s * (1 - e), l = s * (1 - i * e), a = s * (1 - (1 - i) * e), c = [
      [s, a, o],
      [l, s, o],
      [o, s, a],
      [o, l, s],
      [a, o, s],
      [s, o, l]
    ][r].map((d) => Math.round(d * 256));
    return new u({ r: m(c[0]), g: m(c[1]), b: m(c[2]) });
  }
  static fromHsl({ h: t, s: e, l: s }) {
    e /= 100, s /= 100;
    const r = (1 - Math.abs(2 * s - 1)) * e, i = r * (1 - Math.abs(t / 60 % 2 - 1)), o = s - r / 2;
    let l = 0, a = 0, h = 0;
    return 0 <= t && t < 60 ? (l = r, a = i, h = 0) : 60 <= t && t < 120 ? (l = i, a = r, h = 0) : 120 <= t && t < 180 ? (l = 0, a = r, h = i) : 180 <= t && t < 240 ? (l = 0, a = i, h = r) : 240 <= t && t < 300 ? (l = i, a = 0, h = r) : 300 <= t && t < 360 && (l = r, a = 0, h = i), new u({
      r: E(o + l),
      g: E(o + a),
      b: E(o + h)
    });
  }
  static fromCMYK({ c: t, m: e, y: s, k: r, a: i }) {
    const o = (l) => E(
      1 - Math.min(1, l / 100 * (1 - r) + r)
    );
    return new u({ r: o(t), b: o(e), g: o(s), a: i });
  }
  /** Getters **/
  get alpha() {
    return this.a === void 0 ? 1 : this.a;
  }
  get rgb() {
    return [this.r, this.g, this.b];
  }
  get rgba() {
    return [this.r, this.g, this.b, this.alpha];
  }
  get rgbObj() {
    let { r: t, g: e, b: s } = this;
    return { r: t, g: e, b: s, a: this.alpha };
  }
  get css() {
    return this.rgbString;
  }
  get rgbString() {
    return this.a === void 0 ? `rgb(${this.rgb.join(",")})` : `rgba(${this.rgba.join(",")})`;
  }
  get rgbaString() {
    return `rgba(${this.rgba.join(",")})`;
  }
  get hex() {
    return `#${this.rgb.map((t) => t.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
  }
  get hexa() {
    return this.rgbaHex;
  }
  get rgbaHex() {
    let t = this.rgba;
    return t[3] = E(t[3]), `#${t.map((e) => e.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
  }
  get hsv() {
    const t = _(this.r), e = _(this.g), s = _(this.b), r = Math.min(t, e, s), i = Math.max(t, e, s);
    let o;
    const l = i, a = i - r;
    a === 0 ? o = 0 : i === t ? o = 60 * ((e - s) / a) % 360 : i === e ? o = 60 * ((s - t) / a) + 120 : i === s ? o = 60 * ((t - e) / a) + 240 : o = 0, o < 0 && (o += 360);
    const h = i === 0 ? 0 : 1 - r / i;
    return {
      h: Math.round(o),
      s: Math.round(h * 100),
      v: Math.round(l * 100),
      a: this.alpha
    };
  }
  get hsl() {
    const t = _(this.r), e = _(this.g), s = _(this.b), r = Math.max(t, e, s), i = Math.min(t, e, s);
    let o, l;
    const a = (r + i) / 2;
    if (r === i)
      o = l = 0;
    else {
      const h = r - i;
      switch (l = a > 0.5 ? h / (2 - r - i) : h / (r + i), r) {
        case t:
          o = (e - s) / h + (e < s ? 6 : 0);
          break;
        case e:
          o = (s - t) / h + 2;
          break;
        case s:
          o = (t - e) / h + 4;
          break;
      }
      o /= 6;
    }
    return {
      h: Math.round(o * 360),
      s: Math.round(l * 100),
      l: Math.round(a * 100),
      a: this.alpha
    };
  }
  get cmyk() {
    let t, e, s, r;
    const i = parseFloat(this.r) / 255, o = parseFloat(this.g) / 255, l = parseFloat(this.b) / 255;
    return r = 1 - Math.max(i, o, l), r === 1 ? t = e = s = 0 : (t = (1 - i - r) / (1 - r), e = (1 - o - r) / (1 - r), s = (1 - l - r) / (1 - r)), t = Math.round(100 * t), e = Math.round(100 * e), s = Math.round(100 * s), r = Math.round(100 * r), this.alpha ? { c: t, m: e, y: s, k: r, a: this.alpha } : { c: t, m: e, y: s, k: r };
  }
  get hslString() {
    const t = this.hsl;
    return `hsl(${t.h}, ${t.s}%, ${t.l}%)`;
  }
  get hslaString() {
    const t = this.hsl;
    return `hsla(${t.h}, ${t.s}%, ${t.l}%, ${t.a})`;
  }
  get cmykString() {
    const t = this.cmyk;
    return `cmyk(${t.c}%, ${t.m}%, ${t.y}%, ${t.k}%)`;
  }
  get cmykaString() {
    const t = this.cmyk;
    return `cmyka(${t.c}%, ${t.m}%, ${t.y}%, ${t.k}%, ${t.a})`;
  }
  /** Functions **/
  toString(t = "rgb") {
    let e;
    switch (t) {
      case "rgb":
        e = this.rgbString;
        break;
      case "hex":
        e = this.hex;
        break;
      case "rgbaHex":
        e = this.hexa;
        break;
      case "hsl":
        e = this.hslString;
        break;
      case "hsla":
        e = this.hslaString;
        break;
      case "cmyk":
        e = this.cmykString;
        break;
      case "cmyka":
        e = this.cmykaString;
        break;
      default:
        e = this.rgbString;
        break;
    }
    return e;
  }
  mix(t, e = 0.5) {
    const s = this.rgba;
    s[3] = E(s[3]);
    const r = new u(t).rgba;
    r[3] = E(r[3]), e = C(e);
    const i = s.map((o, l) => {
      const a = r[l], h = a < o, c = h ? o - a : a - o, d = Math.round(c * e);
      return h ? o - d : d + o;
    });
    return i[3] = _(i[3]), u.fromArray(i);
  }
  adjustSatLum(t, e, s) {
    const r = this.hsl;
    let i = r[t], o = (s ? i : 100 - i) * e;
    return r[t] = W(100, s ? i - o : i + o), r.a = this.a, new u(r);
  }
  lighten(t, e = !1) {
    return this.adjustSatLum("l", t, e);
  }
  darken(t) {
    return this.lighten(t, !0);
  }
  saturate(t, e = !1) {
    return this.adjustSatLum("s", t, e);
  }
  desaturate(t) {
    return this.saturate(t, !0);
  }
  grayscale() {
    return this.desaturate(1);
  }
  rotate(t) {
    return this.hue(t);
  }
  hue(t) {
    const e = this.hsl;
    return e.h = Math.round(e.h + t) % 360, e.a = this.a, new u(e);
  }
  fadeIn(t, e) {
    let s = this.alpha;
    const { r, g: i, b: o } = this;
    let l = (1 - s) * t;
    return s = e ? s - l : s + l, u({ r, g: i, b: o, a: s });
  }
  fadeOut(t) {
    return this.fadeIn(t, !0);
  }
  negate() {
    let t = this.rgb.map((e) => 255 - e);
    return this.a !== void 0 && t.push(this.alpha), u.fromArray(t);
  }
}
const Ct = (n) => {
  try {
    return n != null && n.constructor && n.constructor.name.toLowerCase();
  } catch {
    return console.warn({ noonemadeyou: n }), "undefinable";
  }
}, $ = (n, t) => (
  // brace yourself for the punchline
  t === null ? n === "null" || n === "nullOrUndef" : t === void 0 ? n === "undefined" || n === "nullOrUndef" : typeof t === n && Ct(t) === n
), Dt = ["boolean", "number", "string", "array", "object", "date", "function", "null", "undefined", "nullOrUndef"], rt = {
  boolean: (n) => $("boolean", n),
  bool: (n) => $("boolean", n),
  number: (n) => $("number", n),
  string: (n) => $("string", n),
  array: (n) => Array.isArray(n),
  object: (n) => $("object", n),
  date: (n) => Ct(n) === "date" && typeof n == "object",
  function: (n) => $("function", n),
  null: (n) => $("null", n),
  undefined: (n) => $("undefined", n),
  nullOrUndef: (n) => $("nullOrUndef", n),
  primitive: (n) => Dt.slice(0, 3).includes(typeof n),
  custom: (n) => !re(n),
  snum: (n) => n != null && n !== "" && !isNaN(Number(n))
}, re = (n) => Dt.find((t) => rt[t](n));
class it {
  constructor(t = null, e = null) {
    this.min = t, this.max = e;
  }
  static create(t, e = null, s = null, r) {
    e = e ?? Math.min(...t), s = s ?? Math.max(...t);
    let i = new it(e, s);
    return i.val = r, i;
  }
  get spread() {
    return this.max - this.min;
  }
  get valAtPct() {
    return (t) => this.min + this.spread * t;
  }
  get pctAtVal() {
    return (t) => (t - this.min) / this.spread;
  }
  get pct() {
    return (this._val - this.min) / this.spread;
  }
  get cssPct() {
    return `${(this.pct * 100).toFixed(1)}%`;
  }
  get val() {
    return this._val;
  }
  set val(t) {
    this._val = t;
  }
}
const ie = (n, t) => {
  let e = !1;
  return n.split(",").length < 2 ? (t("scale", "invalid scaleValues attribute string"), null) : n.split(",").map((s, r) => (s = s.trim(), r || (e = s.endsWith("%")), s.endsWith("%") ? (r && !e && t("scale", "Error: mixture of percent and number values found in scaleValues"), s = Number(s.replace("%", "")) / 100, (s < 0 || s > 100) && t("scale", "Percentage scale values must begin with 0% and end with 100%")) : (r && e && t("scale", "Error: mixture of percent and number values found in scaleValues"), s = Number(s)), isNaN(s) && t("scale", "Error parsing scale values. Enter comma-separated scale from low to high. Append with % for a percent scale"), s));
};
class nt {
  constructor(t, { fluid: e, reversed: s, dataItem: r } = {}) {
    this.fluid = e, this.reversed = s, this.dataItem = r, this.initInputs(t);
  }
  static fromScaleAttributes(t, e) {
    let { values: s, colors: r, min: i, max: o, fluid: l } = t, a = !0, h = (d, g) => {
      a = !1, e(d, g);
    };
    if (s = Array.isArray(s) ? s : ie(s, h), !a)
      return null;
    const c = it.create(s, i, o);
    if (r = Array.isArray(r) ? r.map((d) => u.parse(d)) : r.split(",").map((d) => u.parse(d.trim())), r.length === s.length - 1) {
      let d = r.map((g, p) => ({
        color: g,
        pos: c.pctAtVal(s[p])
      }));
      return new nt(d, { fluid: l, dataItem: c });
    } else
      h("scale", "colors.length should be scaleValues.length - 1.");
  }
  initInputs(t) {
    let e = Array.isArray(t[0]) ? [...t].map((s) => ({ pos: Number(s[0]), color: u.parse(s[1]), lbl: s[2] })) : [...t];
    try {
      e = ne(e, "pos"), this.reversed && (e = e.reverse()), this.inputs = e.map((s, r) => (s.index = r, s));
    } catch (s) {
      console.warn({ inputsSort: s, inputs: e });
    }
  }
  addThreshold(t, e) {
    e || (e = this.getColor(t)), this.initInputs([...this.inputs, { pos: t, color: e, lbl: "" }]);
  }
  removeThreshold(t) {
    let e = [...this.inputs];
    e.splice(e.findIndex((s) => s.pos === t), 1), this.initInputs(e);
  }
  get spread() {
    return this.dataItem.spread;
  }
  get posFromVal() {
    return (t) => {
      if (rt.nullOrUndef(t))
        return this.dataItem.pct;
      let { min: e, max: s } = this.dataItem, r = (t - e) / (s - e);
      return Math.max(0, Math.min(r, 1));
    };
  }
  getColor(t, e) {
    var g;
    if (e && (t = this.posFromVal(t)), isNaN(t))
      return "#ccc";
    let s = this.stops.findIndex((p) => p.pos >= t);
    if (t <= 0 || !s)
      return this.colors[0];
    if (s === -1)
      return this.colors[this.colors.length - 1];
    let r = Math.max(0, s - 1);
    if (!this.fluid)
      return (g = this.stops[r]) == null ? void 0 : g.color;
    let { stops: i, positions: o } = this, l = i[s].color, a = i[r].color, h = i[s].pos, c = i[r].pos, d = (t - h) / (c - h);
    return isNaN(d) && console.warn({ p1: h, p2: c, pos: t, positions: o, i1: s, i2: r }), u.parse(l).mix(a, d);
  }
  get valFromPos() {
    return (t) => {
      var e;
      return (e = this.dataItem) != null && e.valAtPct ? this.dataItem.valAtPct(t) : t * 100;
    };
  }
  get ranges() {
    let t = [...this.positions], e = [...this.inputs];
    return t.map((r, i) => {
      let o = r, l = t[i + 1] ?? 1, a = e[i].color;
      return {
        posFrom: 1 - l,
        posTo: 1 - o,
        color: a,
        lbl: e[i].lbl,
        from: l,
        to: o,
        limit: t[i - 1] ?? 0,
        size: l - o
      };
    });
  }
  get ticks() {
    return [...this.positions.map((t) => this.valFromPos(t)), this.dataItem.max];
  }
  get positions() {
    return this.inputs.map((t) => t.pos);
  }
  get colors() {
    return this.inputs.map((t) => t.color);
  }
  get stops() {
    let { inputs: t, fluid: e } = this;
    if (t = [...t, { pos: 1, color: t[t.length - 1].color }], e) {
      t.length - 1;
      const s = (r) => {
        var a;
        let i = t[r].pos;
        if (i === 1)
          return i;
        let l = (((a = t[r + 1]) == null ? void 0 : a.pos) ?? 1) - i;
        return i + l / 2;
      };
      return this.inputs.map((r, i) => ({
        color: r.color,
        pos: s(i)
      }));
    }
    return this.inputs.flatMap(({ color: s, pos: r }, i) => {
      var o;
      return [
        { color: s, pos: r },
        { color: s, pos: ((o = this.inputs[i + 1]) == null ? void 0 : o.pos) ?? 1 }
      ];
    });
  }
  get scaledStops() {
    return (t, e, s = 1, r = 0) => {
      let i = this.dataItem.min - t, o = e - this.dataItem.max, l = this.spread + o + i, a = this.stops.map((p) => this.valFromPos(p.pos));
      a[0] = t, this.fluid && a.push(this.dataItem.max);
      let h = a.map((p) => p - t), c = [...this.stops];
      if (this.fluid) {
        let p = { color: c[c.length - 1].color, pos: 1 };
        c.push(p);
      }
      let d = h.map((p) => r + p / l * s);
      return c.map((p, b) => `${p.color} ${(d[b] * 100).toFixed(1)}%`);
    };
  }
  get stopCss() {
    return this.stops.map(({ color: t, pos: e }) => `${t} ${(e * 100).toFixed(1)}%`).join(", ");
  }
}
const ne = (n, t) => n.sort((e, s) => {
  let r = t === void 0 ? e : e[t], i = t === void 0 ? s : s[t];
  if (!isNaN(r) && !isNaN(i))
    return r - i;
  if (typeof r == "string" && typeof i == "string")
    return r < i ? -1 : r > i ? 1 : 0;
}), M = (n) => `${n}px`;
class tt extends U {
  constructor() {
    super(), this.size = 300, this.scaleValues = "0,10,20,70,80,90,100", this.scaleColors = "#666, #888, green, yellow, orange, red", this.value = 0, this.valuePrecision = 0, this.ticks = "10", this.minorTicks = 5, this.errors = [], this.hasErrors = !1;
  }
  errorHandler(t, e) {
    console.error({ [t + "Error"]: e }), this.errors.push({ [t + "Error"]: e }), this.hasErrors = !0;
  }
  initThresholds() {
    let { scaleValues: t, scaleColors: e, min: s, max: r, fluidColors: i } = this;
    const o = {
      values: t,
      colors: e,
      min: s,
      max: r,
      fluid: i
    }, l = (a, h) => this.errorHandler(a, h);
    this.thresholds = nt.fromScaleAttributes(o, l), this.errors.length || (this.ticks = this.tickAttr);
  }
  willUpdate(t) {
    if (this.thresholds) {
      t.has("fluidColors") && (this.thresholds.fluid = this.fluidColors), ["scaleColors", "scaleValues", "minorTicks"].some((i) => t.has(i)) && this.initThresholds();
      const s = u.parse(getComputedStyle(this.shadowRoot.host).getPropertyValue("--hand-color"));
      let r = this.shadowRoot.querySelector("div.dial");
      if (r && !this.dialButtonInit) {
        if (s.hsl.l < 40) {
          r.style.setProperty("--center-color", s.darken(0.2));
          let { r: i, g: o, b: l } = s.lighten(0.35), a = `radial-gradient(ellipse at center,
      rgba(${i}, ${o}, ${l}, 1) 0%,
      rgba(${i}, ${o}, ${l}, .8) 22%,
      rgba(0,0,0, .5) 22%,
      rgba(${i}, ${o}, ${l}, .4) 27%,
      rgba(0,0,0, .2) 100%
    )${this.plain ? "" : ",conic-gradient(from 180deg at 50.0% 50.0%,rgba(0,0,0,0) 98.00deg,rgba(255,255,255,0.3) 103.00deg, rgba(255,255,255,0.5) 180.00deg,      rgba(255,255,255,0.3) 257.00deg,      rgba(0,0,0,0) 265.00deg    )"}`;
          r.style.setProperty("--center-gradient", a);
        } else
          r.style.setProperty("--center-color", s.lighten(0.2));
        r.style.setProperty("--center-shadow", s.lighten(0.2)), this.dialButtonInit = !0;
      }
    }
    t.has("options") && (Object.entries(this.options).forEach(([e, s]) => {
      this[e] = s;
    }), this.initThresholds()), super.willUpdate(t);
  }
  firstUpdated() {
    this.initThresholds();
  }
  get ticks() {
    return this._ticks;
  }
  set ticks(t) {
    if (this.tickAttr = t, !this.thresholds)
      return;
    let e;
    if (!t || t === "thresholds")
      e = this.thresholds.ticks, t = "thresholds";
    else if (rt.snum(t) || !t.includes(",")) {
      e = [];
      let r = Number(t), i = this.spread / r;
      for (let o = this.min; o < this.max; o += i) {
        let l = Number(o.toFixed(this.valuePrecision));
        e.push(l);
      }
      e.push(this.max), e = Array.from(new Set(e));
    } else
      e = t.split(",").map((r) => Number(r)).filter((r) => isFinite(r));
    let s = [];
    if (t !== "thresholds" && isFinite(this.minorTicks)) {
      let r = this.minorTicks;
      e.slice(0, e.length - 1).forEach((i, o) => {
        let l = e[o + 1], h = (l - i) / r;
        for (let c = i + h; c < l; c += h)
          s.push({ v: c, d: this.val2Deg(c) });
      });
    }
    this._minor = s, this._ticks = e.map((r) => ({ d: this.val2Deg(r), v: r }));
  }
  get minor() {
    return this._minor ?? [];
  }
  get min() {
    var t;
    return (t = this.thresholds) == null ? void 0 : t.dataItem.min;
  }
  get max() {
    var t;
    return (t = this.thresholds) == null ? void 0 : t.dataItem.max;
  }
  get tickSize() {
    return M((9 + this.size / 33).toFixed(1));
  }
  get transform() {
    return (t, e = !0, s = !0) => (s && (t > 0 ? t = 0 - t : t = Math.abs(t)), `${s ? "scale(-1, 1)" : ""} translateX(-100%) translateY(-50%) rotate(${t}deg)`);
  }
  get val2Deg() {
    return (t) => {
      let e = 270, s = 1 - (t - this.min) / this.spread;
      return Math.max(0, Math.min(e, s * e)) % 360 - 136;
    };
  }
  get spread() {
    var t;
    return (t = this.thresholds) == null ? void 0 : t.dataItem.spread;
  }
  get outerClass() {
    return {
      "outer-gauge": !0,
      "no-lighting": this.plain
    };
  }
  get outerStyle() {
    let { size: t, setDynamicOuterColor: e } = this, s = {
      height: M(t),
      width: M(t),
      padding: M((t / 40).toFixed(1))
    };
    return e && (s["--outer-color"] = this.valueColor), s;
  }
  get flipClass() {
    return (t, e) => ({
      flip: !t || e && t === this.ticks.length - 1,
      tick: !0,
      maj: e,
      minor: !e
    });
  }
  get labelClass() {
    return {
      lbl: !0,
      plain: !this.label
    };
  }
  get tickAt() {
    return (t) => {
      if (this.tickLabels)
        return this.tickLabels.split(",")[t];
      let e = this.ticks[t];
      return (Math.round(e.v * 10) / 10).toLocaleString();
    };
  }
  get fontSize() {
    return {
      fontSize: this.tickSize
    };
  }
  get labelStyle() {
    const { valueColor: t, fontSize: e } = this;
    return {
      boxShadow: this.plain ? "none" : `inset 0 -4px 8px ${t}`,
      outline: this.plain ? `2px solid ${t}` : "none",
      paddingBottom: M(3),
      borderRadius: this.plain ? ".41em" : ".5em",
      ...e
    };
  }
  get dialGradient() {
    return { background: `conic-gradient(from 181deg, rgba(1,1,1,0) 12%, ${this.thresholds.scaledStops(this.min, this.max, 0.75, 0.125).join(", ")}, rgba(1,1,1,0) 88%)` };
  }
  get tickStyle() {
    return (t, e) => {
      let { tickSize: s, transform: r, ticks: i } = this;
      return {
        fontSize: s,
        transform: r(t.d, !0, !(e === 0 || e === i.length - 1))
      };
    };
  }
  get valueColor() {
    const { thresholds: t, value: e } = this;
    return t.getColor(t.dataItem.pctAtVal(e));
  }
  render() {
    if (!this.thresholds)
      return z``;
    const {
      dialGradient: t,
      flipClass: e,
      labelStyle: s,
      outerStyle: r,
      fontSize: i,
      value: o,
      outerClass: l,
      labelClass: a,
      label: h,
      valuePrecision: c,
      tickStyle: d,
      tickAt: g,
      ticks: p,
      minor: b,
      val2Deg: Bt
    } = this, Nt = { transform: `rotate(${Bt(o)}deg)` };
    return z`
      <div class=${j(l)} style=${w(r)}>
        <div class="gauge-wrap">
          ${p == null ? void 0 : p.map((K, x) => z`
            <div class="${j(e(x, !0))}" style="${w(d(K, x))}" v="${g(x)}"></div>`)}
          ${b == null ? void 0 : b.map((K, x) => z`
            <div class="${j(e(x, !1))}" style="${w(d(K, x))}" v=""></div>`)}


          <div class="hand" style="${w(Nt)}"></div>
          <div class="dial">
            <div class="color-band" style="${w(t)}"></div>
            <div class="dial-border"></div>
            <div class="${j(a)}">
              <span style="${w(s)}">
                <strong style="${w(i)}">
                  ${Number(o.toFixed(c)).toLocaleString("en-US")}
                </strong><br>${h}

              </span>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}
Y(tt, "styles", se), Y(tt, "properties", {
  size: { type: Number },
  //50-1000
  scaleValues: { type: String },
  //0,10, 40, 65, 90,100
  scaleColors: { type: String },
  //blue, aqua, green, yellow, red
  value: { type: Number },
  //50
  fluidColors: { type: Boolean },
  //false
  label: { type: String },
  //RPM
  ticks: { type: String },
  //thresholds, auto, or csv: 20,40,60,80
  tickLabels: { type: String },
  // optional
  thresholds: { type: Object },
  minorTicks: { type: Number },
  plain: { type: Boolean },
  valuePrecision: { type: Number },
  setDynamicOuterColor: { type: Boolean },
  options: { type: Object }
});
customElements.define("lit-gauge", tt);
export {
  tt as LitGauge
};
