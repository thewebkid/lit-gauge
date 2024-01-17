var Zt = Object.defineProperty, Kt = (o, t, e) => t in o ? Zt(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e, g = (o, t, e) => (Kt(o, typeof t != "symbol" ? t + "" : t, e), e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, ct = K.ShadowRoot && (K.ShadyCSS === void 0 || K.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pt = Symbol(), mt = /* @__PURE__ */ new WeakMap();
let Mt = class {
  constructor(o, t, e) {
    if (this._$cssResult$ = !0, e !== pt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = o, this.t = t;
  }
  get styleSheet() {
    let o = this.o;
    const t = this.t;
    if (ct && o === void 0) {
      const e = t !== void 0 && t.length === 1;
      e && (o = mt.get(t)), o === void 0 && ((this.o = o = new CSSStyleSheet()).replaceSync(this.cssText), e && mt.set(t, o));
    }
    return o;
  }
  toString() {
    return this.cssText;
  }
};
const Dt = (o) => new Mt(typeof o == "string" ? o : o + "", void 0, pt), E = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, s, r) => i + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[r + 1], o[0]);
  return new Mt(e, o, pt);
}, Jt = (o, t) => {
  if (ct)
    o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const i = document.createElement("style"), s = K.litNonce;
      s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, o.appendChild(i);
    }
}, vt = ct ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return Dt(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Qt, defineProperty: te, getOwnPropertyDescriptor: ee, getOwnPropertyNames: ie, getOwnPropertySymbols: se, getPrototypeOf: re } = Object, j = globalThis, ft = j.trustedTypes, oe = ft ? ft.emptyScript : "", yt = j.reactiveElementPolyfillSupport, X = (o, t) => o, ot = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? oe : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, Bt = (o, t) => !Qt(o, t), xt = { attribute: !0, type: String, converter: ot, reflect: !1, hasChanged: Bt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), j.litPropertyMetadata ?? (j.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class U extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = xt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && te(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = ee(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get() {
      return s == null ? void 0 : s.call(this);
    }, set(n) {
      const a = s == null ? void 0 : s.call(this);
      r.call(this, n), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? xt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(X("elementProperties")))
      return;
    const t = re(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(X("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(X("properties"))) {
      const e = this.properties, i = [...ie(e), ...se(e)];
      for (const s of i)
        this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [i, s] of e)
          this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i)
        e.unshift(vt(s));
    } else
      t !== void 0 && e.push(vt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys())
      this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Jt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$E_) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$E_) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e) {
    var i;
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (((i = s.converter) == null ? void 0 : i.toAttribute) !== void 0 ? s.converter : ot).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((i = n.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? n.converter : ot;
      this._$Em = r, this[r] = a.fromAttribute(e, n.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    if (t !== void 0) {
      if (i ?? (i = this.constructor.getPropertyOptions(t)), !(i.hasChanged ?? Bt)(s ? r : this[t], e))
        return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$Eg = this._$EP());
  }
  C(t, e, i) {
    this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
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
    var t;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, n] of this._$Ep)
          this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0)
        for (const [r, n] of s)
          n.wrapped !== !0 || this._$AL.has(r) || this[r] === void 0 || this.C(r, this[r], n);
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$E_) == null || t.forEach((s) => {
        var r;
        return (r = s.hostUpdate) == null ? void 0 : r.call(s);
      }), this.update(i)) : this._$ET();
    } catch (s) {
      throw e = !1, this._$ET(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$E_) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[X("elementProperties")] = /* @__PURE__ */ new Map(), U[X("finalized")] = /* @__PURE__ */ new Map(), yt == null || yt({ ReactiveElement: U }), (j.reactiveElementVersions ?? (j.reactiveElementVersions = [])).push("2.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, tt = Q.trustedTypes, $t = tt ? tt.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Nt = "$lit$", F = `lit$${(Math.random() + "").slice(9)}$`, Pt = "?" + F, ne = `<${Pt}>`, T = document, q = () => T.createComment(""), Y = (o) => o === null || typeof o != "object" && typeof o != "function", Tt = Array.isArray, ae = (o) => Tt(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", rt = `[ 	
\f\r]`, I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, wt = /-->/g, At = />/g, M = RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), kt = /'/g, St = /"/g, Ot = /^(?:script|style|textarea|title)$/i, le = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), f = le(1), _ = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Ft = /* @__PURE__ */ new WeakMap(), N = T.createTreeWalker(T, 129);
function Lt(o, t) {
  if (!Array.isArray(o) || !o.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return $t !== void 0 ? $t.createHTML(t) : t;
}
const he = (o, t) => {
  const e = o.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : "", n = I;
  for (let a = 0; a < e; a++) {
    const l = o[a];
    let h, p, d = -1, u = 0;
    for (; u < l.length && (n.lastIndex = u, p = n.exec(l), p !== null); )
      u = n.lastIndex, n === I ? p[1] === "!--" ? n = wt : p[1] !== void 0 ? n = At : p[2] !== void 0 ? (Ot.test(p[2]) && (s = RegExp("</" + p[2], "g")), n = M) : p[3] !== void 0 && (n = M) : n === M ? p[0] === ">" ? (n = s ?? I, d = -1) : p[1] === void 0 ? d = -2 : (d = n.lastIndex - p[2].length, h = p[1], n = p[3] === void 0 ? M : p[3] === '"' ? St : kt) : n === St || n === kt ? n = M : n === wt || n === At ? n = I : (n = M, s = void 0);
    const b = n === M && o[a + 1].startsWith("/>") ? " " : "";
    r += n === I ? l + ne : d >= 0 ? (i.push(h), l.slice(0, d) + Nt + l.slice(d) + F + b) : l + F + (d === -2 ? a : b);
  }
  return [Lt(o, r + (o[e] || "<?>") + (t === 2 ? "</svg>" : "")), i];
};
class W {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, n = 0;
    const a = t.length - 1, l = this.parts, [h, p] = he(t, e);
    if (this.el = W.createElement(h, i), N.currentNode = this.el.content, e === 2) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = N.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes())
          for (const d of s.getAttributeNames())
            if (d.endsWith(Nt)) {
              const u = p[n++], b = s.getAttribute(d).split(F), $ = /([.?@])?(.*)/.exec(u);
              l.push({ type: 1, index: r, name: $[2], strings: b, ctor: $[1] === "." ? ce : $[1] === "?" ? pe : $[1] === "@" ? ue : it }), s.removeAttribute(d);
            } else
              d.startsWith(F) && (l.push({ type: 6, index: r }), s.removeAttribute(d));
        if (Ot.test(s.tagName)) {
          const d = s.textContent.split(F), u = d.length - 1;
          if (u > 0) {
            s.textContent = tt ? tt.emptyScript : "";
            for (let b = 0; b < u; b++)
              s.append(d[b], q()), N.nextNode(), l.push({ type: 2, index: ++r });
            s.append(d[u], q());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === Pt)
          l.push({ type: 2, index: r });
        else {
          let d = -1;
          for (; (d = s.data.indexOf(F, d + 1)) !== -1; )
            l.push({ type: 7, index: r }), d += F.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = T.createElement("template");
    return i.innerHTML = t, i;
  }
}
function z(o, t, e = o, i) {
  var s, r;
  if (t === _)
    return t;
  let n = i !== void 0 ? (s = e._$Co) == null ? void 0 : s[i] : e._$Cl;
  const a = Y(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== a && ((r = n == null ? void 0 : n._$AO) == null || r.call(n, !1), a === void 0 ? n = void 0 : (n = new a(o), n._$AT(o, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = n : e._$Cl = n), n !== void 0 && (t = z(o, n._$AS(o, t.values), n, i)), t;
}
class de {
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
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? T).importNode(e, !0);
    N.currentNode = s;
    let r = N.nextNode(), n = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let h;
        l.type === 2 ? h = new G(r, r.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (h = new ge(r, this, t)), this._$AV.push(h), l = i[++a];
      }
      n !== (l == null ? void 0 : l.index) && (r = N.nextNode(), n++);
    }
    return N.currentNode = T, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class G {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = z(this, t, e), Y(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== _ && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : ae(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== m && Y(this._$AH) ? this._$AA.nextSibling.data = t : this.$(T.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = W.createElement(Lt(s.h, s.h[0]), this.options)), s);
    if (((e = this._$AH) == null ? void 0 : e._$AD) === r)
      this._$AH.p(i);
    else {
      const n = new de(r, this), a = n.u(this.options);
      n.p(i), this.$(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = Ft.get(t.strings);
    return e === void 0 && Ft.set(t.strings, e = new W(t)), e;
  }
  T(t) {
    Tt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t)
      s === e.length ? e.push(i = new G(this.k(q()), this.k(q()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class it {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let n = !1;
    if (r === void 0)
      t = z(this, t, e, 0), n = !Y(t) || t !== this._$AH && t !== _, n && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        h = z(this, a[i + l], e, l), h === _ && (h = this._$AH[l]), n || (n = !Y(h) || h !== this._$AH[l]), h === m ? t = m : t !== m && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    n && !s && this.O(t);
  }
  O(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ce extends it {
  constructor() {
    super(...arguments), this.type = 3;
  }
  O(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class pe extends it {
  constructor() {
    super(...arguments), this.type = 4;
  }
  O(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class ue extends it {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = z(this, t, e, 0) ?? m) === _)
      return;
    const i = this._$AH, s = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== m && (i === m || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ge {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    z(this, t);
  }
}
const Ct = Q.litHtmlPolyfillSupport;
Ct == null || Ct(W, G), (Q.litHtmlVersions ?? (Q.litHtmlVersions = [])).push("3.1.0");
const be = (o, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new G(t.insertBefore(q(), r), r, void 0, e ?? {});
  }
  return s._$AI(o), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class k extends U {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = be(e, this.renderRoot, this.renderOptions);
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
    return _;
  }
}
var _t;
k._$litElement$ = !0, k.finalized = !0, (_t = globalThis.litElementHydrateSupport) == null || _t.call(globalThis, { LitElement: k });
const Et = globalThis.litElementPolyfillSupport;
Et == null || Et({ LitElement: k });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, jt = (o) => (...t) => ({ _$litDirective$: o, values: t });
let zt = class {
  constructor(o) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(o, t, e) {
    this._$Ct = o, this._$AM = t, this._$Ci = e;
  }
  _$AS(o, t) {
    return this.update(o, t);
  }
  update(o, t) {
    return this.render(...t);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = jt(class extends zt {
  constructor(o) {
    var t;
    if (super(o), o.type !== Ut.ATTRIBUTE || o.name !== "class" || ((t = o.strings) == null ? void 0 : t.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(o) {
    return " " + Object.keys(o).filter((t) => o[t]).join(" ") + " ";
  }
  update(o, [t]) {
    var e, i;
    if (this.it === void 0) {
      this.it = /* @__PURE__ */ new Set(), o.strings !== void 0 && (this.st = new Set(o.strings.join(" ").split(/\s/).filter((r) => r !== "")));
      for (const r in t)
        t[r] && !((e = this.st) != null && e.has(r)) && this.it.add(r);
      return this.render(t);
    }
    const s = o.element.classList;
    for (const r of this.it)
      r in t || (s.remove(r), this.it.delete(r));
    for (const r in t) {
      const n = !!t[r];
      n === this.it.has(r) || (i = this.st) != null && i.has(r) || (n ? (s.add(r), this.it.add(r)) : (s.remove(r), this.it.delete(r)));
    }
    return _;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = "important", me = " !" + Rt, x = jt(class extends zt {
  constructor(o) {
    var t;
    if (super(o), o.type !== Ut.ATTRIBUTE || o.name !== "style" || ((t = o.strings) == null ? void 0 : t.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(o) {
    return Object.keys(o).reduce((t, e) => {
      const i = o[e];
      return i == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(o, [t]) {
    const { style: e } = o.element;
    if (this.ut === void 0)
      return this.ut = new Set(Object.keys(t)), this.render(t);
    for (const i of this.ut)
      t[i] == null && (this.ut.delete(i), i.includes("-") ? e.removeProperty(i) : e[i] = null);
    for (const i in t) {
      const s = t[i];
      if (s != null) {
        this.ut.add(i);
        const r = typeof s == "string" && s.endsWith(me);
        i.includes("-") || r ? e.setProperty(i, r ? s.slice(0, -11) : s, r ? Rt : "") : e[i] = s;
      }
    }
    return _;
  }
}), ve = E`
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
`, y = (o) => st(255, Math.round(Number(o))), D = (o) => y(o * 255), B = (o) => st(1, o / 255), st = (o, t) => Math.max(0, Math.min(o, t)), L = (o) => o === void 0 ? 1 : (typeof o == "string" && o.indexOf("%") > 0 && (o = Number(o.split("%")[0]) / 100), o = Number(Number(o).toFixed(3)), isNaN(o) ? 1 : st(1, o)), nt = {
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
class c {
  constructor(t, e, i, s) {
    return c.isBaseConstructor(t) ? (this.r = y(t.r), this.g = y(t.g), this.b = y(t.b), t.a !== void 0 && (this.a = L(t.a)), this) : c.parse(t, e, i, s);
  }
  static parse(t, e, i, s) {
    if (c.isBaseConstructor(t))
      return new c(t);
    if (e !== void 0 && i !== void 0) {
      let r = y(t);
      return e = y(e), i = y(i), s !== void 0 && (s = L(s)), new c({ r, g: e, b: i, a: s });
    }
    if (Array.isArray(t))
      return c.fromArray(t);
    if (typeof t == "string") {
      let r;
      if (e !== void 0 && Number(e) <= 1 && Number(e) >= 0 && (r = Number(e)), t.startsWith("#"))
        return c.fromHex(t, r);
      if (nt[t.toLowerCase()])
        return c.fromNamed(t, r);
      if (t.startsWith("rgb"))
        return c.fromRgbString(t);
      if (t === "transparent") {
        let n, a, l, h;
        return n = a = l = h = 0, new c({ r: n, g: a, b: l, a: h });
      } else
        return null;
    } else if (typeof t == "object") {
      if (t.a !== void 0 && (this.a = L(t.a)), t.h !== void 0) {
        let r = {};
        if (t.v !== void 0)
          r = c.fromHsv(t);
        else if (t.l !== void 0)
          r = c.fromHsl(t);
        else
          return c.fromArray([0, 0, 0]);
        return r.a = t.a !== void 0 ? L(t.a) : void 0, new c(r);
      }
      return t.c !== void 0 ? c.fromCMYK(t) : this;
    }
    return c.fromArray([0, 0, 0]);
  }
  static isBaseConstructor(t) {
    return typeof t == "object" && t.r !== void 0 && t.g !== void 0 && t.b !== void 0;
  }
  static fromNamed(t, e) {
    return c.fromHex(nt[t.toLowerCase()], e);
  }
  static fromArray(t) {
    t = t.filter((i) => i !== "" && isFinite(i));
    const e = {
      r: y(t[0]),
      g: y(t[1]),
      b: y(t[2])
    };
    return t[3] !== void 0 && (e.a = L(t[3])), new c(e);
  }
  static fromHex(t, e) {
    t = t.replace("#", ""), (t.length === 3 || t.length === 4) && (t = t.split("").map((s) => s + s).join(""));
    let i = t.match(/[A-Za-z0-9]{2}/g).map((s) => parseInt(s, 16));
    return i.length === 4 ? i[3] /= 255 : e !== void 0 && (i[3] = e), c.fromArray(i);
  }
  static fromRgbString(t) {
    if (t.includes(","))
      return c.fromArray(t.split("(")[1].split(")")[0].split(","));
    const e = t.replace("/", " ").split("(")[1].replace(")", "").split(" ").filter((i) => i !== "" && isFinite(Number(i)));
    return c.fromArray(e);
  }
  static fromHsv({ h: t, s: e, v: i }) {
    e = e / 100, i = i / 100;
    const s = Math.floor(t / 60 % 6), r = t / 60 - s, n = i * (1 - e), a = i * (1 - r * e), l = i * (1 - (1 - r) * e), h = [
      [i, l, n],
      [a, i, n],
      [n, i, l],
      [n, a, i],
      [l, n, i],
      [i, n, a]
    ][s].map((p) => Math.round(p * 256));
    return new c({ r: y(h[0]), g: y(h[1]), b: y(h[2]) });
  }
  static fromHsl({ h: t, s: e, l: i }) {
    e /= 100, i /= 100;
    const s = (1 - Math.abs(2 * i - 1)) * e, r = s * (1 - Math.abs(t / 60 % 2 - 1)), n = i - s / 2;
    let a = 0, l = 0, h = 0;
    return 0 <= t && t < 60 ? (a = s, l = r, h = 0) : 60 <= t && t < 120 ? (a = r, l = s, h = 0) : 120 <= t && t < 180 ? (a = 0, l = s, h = r) : 180 <= t && t < 240 ? (a = 0, l = r, h = s) : 240 <= t && t < 300 ? (a = r, l = 0, h = s) : 300 <= t && t < 360 && (a = s, l = 0, h = r), new c({
      r: D(n + a),
      g: D(n + l),
      b: D(n + h)
    });
  }
  static fromCMYK({ c: t, m: e, y: i, k: s, a: r }) {
    const n = (a) => D(
      1 - Math.min(1, a / 100 * (1 - s) + s)
    );
    return new c({ r: n(t), b: n(e), g: n(i), a: r });
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
    let { r: t, g: e, b: i } = this;
    return { r: t, g: e, b: i, a: this.alpha };
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
    return t[3] = D(t[3]), `#${t.map((e) => e.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
  }
  get hsv() {
    const t = B(this.r), e = B(this.g), i = B(this.b), s = Math.min(t, e, i), r = Math.max(t, e, i);
    let n;
    const a = r, l = r - s;
    l === 0 ? n = 0 : r === t ? n = 60 * ((e - i) / l) % 360 : r === e ? n = 60 * ((i - t) / l) + 120 : r === i ? n = 60 * ((t - e) / l) + 240 : n = 0, n < 0 && (n += 360);
    const h = r === 0 ? 0 : 1 - s / r;
    return {
      h: Math.round(n),
      s: Math.round(h * 100),
      v: Math.round(a * 100),
      a: this.alpha
    };
  }
  get hsl() {
    const t = B(this.r), e = B(this.g), i = B(this.b), s = Math.max(t, e, i), r = Math.min(t, e, i);
    let n, a;
    const l = (s + r) / 2;
    if (s === r)
      n = a = 0;
    else {
      const h = s - r;
      switch (a = l > 0.5 ? h / (2 - s - r) : h / (s + r), s) {
        case t:
          n = (e - i) / h + (e < i ? 6 : 0);
          break;
        case e:
          n = (i - t) / h + 2;
          break;
        case i:
          n = (t - e) / h + 4;
          break;
      }
      n /= 6;
    }
    return {
      h: Math.round(n * 360),
      s: Math.round(a * 100),
      l: Math.round(l * 100),
      a: this.alpha
    };
  }
  get cmyk() {
    let t, e, i, s;
    const r = parseFloat(this.r) / 255, n = parseFloat(this.g) / 255, a = parseFloat(this.b) / 255;
    return s = 1 - Math.max(r, n, a), s === 1 ? t = e = i = 0 : (t = (1 - r - s) / (1 - s), e = (1 - n - s) / (1 - s), i = (1 - a - s) / (1 - s)), t = Math.round(100 * t), e = Math.round(100 * e), i = Math.round(100 * i), s = Math.round(100 * s), this.alpha ? { c: t, m: e, y: i, k: s, a: this.alpha } : { c: t, m: e, y: i, k: s };
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
    const i = this.rgba;
    i[3] = D(i[3]);
    const s = new c(t).rgba;
    s[3] = D(s[3]), e = L(e);
    const r = i.map((n, a) => {
      const l = s[a], h = l < n, p = h ? n - l : l - n, d = Math.round(p * e);
      return h ? n - d : d + n;
    });
    return r[3] = B(r[3]), c.fromArray(r);
  }
  adjustSatLum(t, e, i) {
    const s = this.hsl;
    let r = s[t], n = (i ? r : 100 - r) * e;
    return s[t] = st(100, i ? r - n : r + n), s.a = this.a, new c(s);
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
    return e.h = Math.round(e.h + t) % 360, e.a = this.a, new c(e);
  }
  fadeIn(t, e) {
    let i = this.alpha;
    const { r: s, g: r, b: n } = this;
    let a = (1 - i) * t;
    return i = e ? i - a : i + a, c({ r: s, g: r, b: n, a: i });
  }
  fadeOut(t) {
    return this.fadeIn(t, !0);
  }
  negate() {
    let t = this.rgb.map((e) => 255 - e);
    return this.a !== void 0 && t.push(this.alpha), c.fromArray(t);
  }
}
const It = (o) => {
  try {
    return o != null && o.constructor && o.constructor.name.toLowerCase();
  } catch {
    return console.warn({ noonemadeyou: o }), "undefinable";
  }
}, S = (o, t) => (
  // brace yourself for the punchline
  t === null ? o === "null" || o === "nullOrUndef" : t === void 0 ? o === "undefined" || o === "nullOrUndef" : typeof t === o && It(t) === o
), Vt = ["boolean", "number", "string", "array", "object", "date", "function", "null", "undefined", "nullOrUndef"], ut = {
  boolean: (o) => S("boolean", o),
  bool: (o) => S("boolean", o),
  number: (o) => S("number", o),
  string: (o) => S("string", o),
  array: (o) => Array.isArray(o),
  object: (o) => S("object", o),
  date: (o) => It(o) === "date" && typeof o == "object",
  function: (o) => S("function", o),
  null: (o) => S("null", o),
  undefined: (o) => S("undefined", o),
  nullOrUndef: (o) => S("nullOrUndef", o),
  primitive: (o) => Vt.slice(0, 3).includes(typeof o),
  custom: (o) => !fe(o),
  snum: (o) => o != null && o !== "" && !isNaN(Number(o))
}, fe = (o) => Vt.find((t) => ut[t](o));
class gt {
  constructor(t = null, e = null) {
    this.min = t, this.max = e;
  }
  static create(t, e = null, i = null, s) {
    e = e ?? Math.min(...t), i = i ?? Math.max(...t);
    let r = new gt(e, i);
    return r.val = s, r;
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
const ye = (o, t) => {
  let e = !1;
  return o.split(",").length < 2 ? (t("scale", "invalid scaleValues attribute string"), null) : o.split(",").map((i, s) => (i = i.trim(), s || (e = i.endsWith("%")), i.endsWith("%") ? (s && !e && t("scale", "Error: mixture of percent and number values found in scaleValues"), i = Number(i.replace("%", "")) / 100, (i < 0 || i > 100) && t("scale", "Percentage scale values must begin with 0% and end with 100%")) : (s && e && t("scale", "Error: mixture of percent and number values found in scaleValues"), i = Number(i)), isNaN(i) && t("scale", "Error parsing scale values. Enter comma-separated scale from low to high. Append with % for a percent scale"), i));
};
class bt {
  constructor(t, { fluid: e, reversed: i, dataItem: s } = {}) {
    this.fluid = e, this.reversed = i, this.dataItem = s, this.initInputs(t);
  }
  static fromScaleAttributes(t, e) {
    let { values: i, colors: s, min: r, max: n, fluid: a } = t, l = !0, h = (d, u) => {
      l = !1, e(d, u);
    };
    if (i = Array.isArray(i) ? i : ye(i, h), !l)
      return null;
    const p = gt.create(i, r, n);
    if (s = Array.isArray(s) ? s.map((d) => c.parse(d)) : s.split(",").map((d) => c.parse(d.trim())), s.length === i.length - 1) {
      let d = s.map((u, b) => ({
        color: u,
        pos: p.pctAtVal(i[b])
      }));
      return new bt(d, { fluid: a, dataItem: p });
    } else
      h("scale", "colors.length should be scaleValues.length - 1.");
  }
  initInputs(t) {
    let e = Array.isArray(t[0]) ? [...t].map((i) => ({ pos: Number(i[0]), color: c.parse(i[1]), lbl: i[2] })) : [...t];
    try {
      e = xe(e, "pos"), this.reversed && (e = e.reverse()), this.inputs = e.map((i, s) => (i.index = s, i));
    } catch (i) {
      console.warn({ inputsSort: i, inputs: e });
    }
  }
  addThreshold(t, e) {
    e || (e = this.getColor(t)), this.initInputs([...this.inputs, { pos: t, color: e, lbl: "" }]);
  }
  removeThreshold(t) {
    let e = [...this.inputs];
    e.splice(e.findIndex((i) => i.pos === t), 1), this.initInputs(e);
  }
  get spread() {
    return this.dataItem.spread;
  }
  get posFromVal() {
    return (t) => {
      if (ut.nullOrUndef(t))
        return this.dataItem.pct;
      let { min: e, max: i } = this.dataItem, s = (t - e) / (i - e);
      return Math.max(0, Math.min(s, 1));
    };
  }
  getColor(t, e) {
    var i;
    if (e && (t = this.posFromVal(t)), isNaN(t))
      return "#ccc";
    let s = this.stops.findIndex((b) => b.pos >= t);
    if (t <= 0 || !s)
      return this.colors[0];
    if (s === -1)
      return this.colors[this.colors.length - 1];
    let r = Math.max(0, s - 1);
    if (!this.fluid)
      return (i = this.stops[r]) == null ? void 0 : i.color;
    let { stops: n, positions: a } = this, l = n[s].color, h = n[r].color, p = n[s].pos, d = n[r].pos, u = (t - p) / (d - p);
    return isNaN(u) && console.warn({ p1: p, p2: d, pos: t, positions: a, i1: s, i2: r }), c.parse(l).mix(h, u);
  }
  get valFromPos() {
    return (t) => {
      var e;
      return (e = this.dataItem) != null && e.valAtPct ? this.dataItem.valAtPct(t) : t * 100;
    };
  }
  get ranges() {
    let t = [...this.positions], e = [...this.inputs];
    return t.map((i, s) => {
      let r = i, n = t[s + 1] ?? 1, a = e[s].color;
      return {
        posFrom: 1 - n,
        posTo: 1 - r,
        color: a,
        lbl: e[s].lbl,
        from: n,
        to: r,
        limit: t[s - 1] ?? 0,
        size: n - r
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
      const i = (s) => {
        var r;
        let n = t[s].pos;
        if (n === 1)
          return n;
        let a = (((r = t[s + 1]) == null ? void 0 : r.pos) ?? 1) - n;
        return n + a / 2;
      };
      return this.inputs.map((s, r) => ({
        color: s.color,
        pos: i(r)
      }));
    }
    return this.inputs.flatMap(({ color: i, pos: s }, r) => {
      var n;
      return [
        { color: i, pos: s },
        { color: i, pos: ((n = this.inputs[r + 1]) == null ? void 0 : n.pos) ?? 1 }
      ];
    });
  }
  get scaledStops() {
    return (t, e, i = 1, s = 0) => {
      let r = this.dataItem.min - t, n = e - this.dataItem.max, a = this.spread + n + r, l = this.stops.map((u) => this.valFromPos(u.pos));
      l[0] = t, this.fluid && l.push(this.dataItem.max);
      let h = l.map((u) => u - t), p = [...this.stops];
      if (this.fluid) {
        let u = { color: p[p.length - 1].color, pos: 1 };
        p.push(u);
      }
      let d = h.map((u) => s + u / a * i);
      return p.map((u, b) => `${u.color} ${(d[b] * 100).toFixed(1)}%`);
    };
  }
  get stopCss() {
    return this.stops.map(({ color: t, pos: e }) => `${t} ${(e * 100).toFixed(1)}%`).join(", ");
  }
}
const xe = (o, t) => o.sort((e, i) => {
  let s = t === void 0 ? e : e[t], r = t === void 0 ? i : i[t];
  if (!isNaN(s) && !isNaN(r))
    return s - r;
  if (typeof s == "string" && typeof r == "string")
    return s < r ? -1 : s > r ? 1 : 0;
}), R = (o, t, e = "color-update") => {
  const i = e.includes("color") ? { color: t } : t;
  let s = new CustomEvent(e, {
    bubbles: !0,
    composed: !0,
    detail: i
  });
  o.dispatchEvent(s);
}, Xt = (o = 3, t) => {
  let e = 0, i = 100, s = 50, r = null, n = !1;
  t && (i = t.s, t.hasOwnProperty("v") ? (r = t.v, s = null, n = !0) : s = t.l);
  const a = [];
  let l, h;
  const p = (d, u) => `${d.css} ${(u * 100).toFixed(1)}%`;
  for (; e < 360; )
    l = c.parse(n ? { h: e, s: i, v: r } : { h: e, s: i, l: s }), h = e / 360, a.push(p(l, h)), e += o;
  return e = 359, l = c.parse(n ? { h: e, s: i, v: r } : { h: e, s: i, l: s }), h = 1, a.push(p(l, h)), a.join(", ");
}, Z = f`<svg stroke='currentColor' fill='none' stroke-width='0' viewBox='0 0 24 24'>
  <path d='M13 7H7V5H13V7Z' fill='currentColor'></path>
  <path d='M13 11H7V9H13V11Z' fill='currentColor'></path>
  <path d='M7 15H13V13H7V15Z' fill='currentColor'></path>
  <path fill-rule='evenodd' clip-rule='evenodd' d='M3 19V1H17V5H21V23H7V19H3ZM15 17V3H5V17H15ZM17 7V19H9V21H19V7H17Z' fill='currentColor'></path>
</svg>`, J = class extends k {
  constructor() {
    super(), this.gradient = { backgroundImage: `linear-gradient(90deg, ${Xt(24)})` }, this.width = 400, this.sliderStyle = { display: "none" };
  }
  firstUpdated() {
    let t = this.renderRoot.querySelector("lit-movable");
    t.onmovestart = () => {
      R(this.renderRoot, { sliding: !0 }, "sliding-hue");
    }, t.onmoveend = () => {
      R(this.renderRoot, { sliding: !1 }, "sliding-hue");
    }, t.onmove = ({ posLeft: e }) => this.selectHue({ offsetX: e }), this.sliderStyle = this.sliderCss(this.hue);
  }
  get sliderBounds() {
    let t = this.width / 360, e = Number(this.hue) * t, i = 0 - e, s = this.width - e;
    return { min: i, max: s, posLeft: e };
  }
  get sliderCss() {
    return (t) => (this.color.hsx && (t = this.color.hsx.h), t === void 0 && (t = this.color.hsl.h), { backgroundColor: c.parse({ h: t, s: 100, l: 50 }).css });
  }
  willUpdate(t) {
    var e;
    if (t.get("hue") && isFinite(this.hue)) {
      if ((e = this.color) != null && e.hsx)
        return;
      let i = this.hue;
      this.sliderStyle = this.sliderCss(i);
    }
  }
  selectHue(t) {
    let e = 360 / this.width, i = t.offsetX, s = Math.max(0, Math.min(359, Math.round(i * e))), r = this.renderRoot.querySelector("a"), n = new CustomEvent("hue-update", {
      bubbles: !0,
      composed: !0,
      detail: { h: s }
    });
    r.dispatchEvent(n), this.sliderStyle = this.sliderCss(s);
  }
  render() {
    return f`
      <div style=${x(this.gradient)} class='bar' @click='${this.selectHue}'>
        <lit-movable horizontal='${this.sliderBounds.min}, ${this.sliderBounds.max}' posLeft='${this.sliderBounds.posLeft}'>
          <a class='slider' style=${x(this.sliderCss(this.h))}></a>
        </lit-movable>

      </div>`;
  }
};
g(J, "properties", {
  hue: { type: Number },
  color: { type: Object },
  gradient: { type: String, attribute: !1 },
  sliderStyle: { type: String, attribute: !1 },
  sliderBounds: { type: Object },
  width: { type: Number, attribute: !1 }
}), g(J, "styles", E`
    :host > div {
      display: block;
      width: ${Dt(J.width)}px;
      height: 15px;
      cursor: pointer;
      position: relative;
    }

    :host .slider {
      position: absolute;
      top: -1px;
      height: 17px;
      width: 8px;
      margin-left: -4px;
      box-shadow: 0 0 3px #111, inset 0 0 2px white;
    }
  `);
let $e = J;
customElements.define("hue-bar", $e);
const qt = E`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.125) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, 0.125) 0, rgba(0, 0, 0, 0.125) 0), linear-gradient(45deg, rgba(0, 0, 0, 0.125) 25%, transparent 0, transparent 75%, rgba(0, 0, 0, 0.125) 0, rgba(0, 0, 0, 0.125) 0), #fff;
  background-repeat: repeat, repeat;
  background-position: 0 0, 6px 6px;
  background-size: 12px 12px, 12px 12px;
`, Yt = E`
  display: inline-block;
  width: 69px;
  padding: .325rem .5rem;
  font-size: .9rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--input-color);
  appearance: none;
  background-color: var(--input-bg);
  background-clip: padding-box;
  border: 1px solid var(--form-border-color);
  border-radius: 3px;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
`, Wt = E`
  color: var(--input-active-color);
  background-color: var(--input-active-bg);
  border-color: var(--input-active-border-color);
  outline: 0;
  box-shadow: var(--input-active-box-shadow);
`, we = E`
  :host{
    --font-fam: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --bg-color:rgb(30 41 59);
    --label-color: #ccc;
    --form-border-color: #495057;
    --input-active-border-color: #86b7fe;
    --input-bg: #020617;
    --input-active-bg: #4682B4;
    --input-color: #ccc;
    --input-active-color: #333;
    --input-active-box-shadow: 0 2px 5px #ccc;
    --button-active-bg: #0C5B9D;
    --button-active-color:white;
    --outer-box-shadow:0 4px 12px #111;
  }
    :host > .outer {
      position: relative;
      background-color: var(--bg-color);
      height: 250px;
      width: 400px;
      display: block;
      padding: 10px;
      margin: 10px;
      box-shadow: var(--outer-box-shadow);
    }
    .d-flex {
      display: flex;
      width: 100%;
      margin-top: 15px;
    }
    .w-30 {
      width: 30%;
    }
    .w-40 {
      width: 40%;
      position: relative;
      height:210px;
    }
    :host .form-control {
      ${Yt}
    }
    :host .form-control:focus {
      ${Wt}
    }
    :host label {
      width: 12px;
      display: inline-block;
      color: var(--label-color);
      font-family: var(--font-fam);
    }
    :host .hsl-mode{
      padding-left:16px;
      margin-top:18px;
    }
    :host .button{
      padding: .325rem .5rem;
      background-color: var(--input-bg);
      border: 1px solid var(--form-border-color);
      font-family: var(--font-fam);
      color:var(--input-color);
      cursor: pointer;
      font-size: .9rem;
    }
    :host div.hex{
      margin-top:27px;
      white-space: nowrap;
      position: relative;
    }
  :host dialog{
    opacity: 0;
    width:177px;
    position: absolute;
    bottom:30px;
    left:0px;
    z-index: 3;
    border: 1px solid transparent;
    outline:transparent;
    box-shadow:var(--outer-box-shadow);
    background-color: var(--input-bg);
    transition: opacity .3s;
  }
  :host dialog.open{
    opacity: 1;
  }
  :host dialog *{
    color:var(--input-color);
  }
  :host dialog a.copy-item{
    margin-bottom:5px;
    white-space: nowrap;
    display: block;
    width: 180px;
    cursor: pointer;
  }
  :host dialog input.form-control{
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
    width:132px;
    padding-bottom: 2px;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    pointer-events: none;
  }
  :host dialog button.button{
    display: inline-block;
    vertical-align: middle;
    margin-left:-5px;
    font-size: 12px;
    height:27px;
    width:27px;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    box-sizing: border-box;
    overflow: hidden;
    outline:none;
    background-color: transparent;
  }
  :host dialog a.copy-item:hover .button,
  :host dialog a.copy-item:hover input.form-control,
  :host dialog a.copy-item:hover path{
    color:var(--button-active-color);
    background-color: var(--button-active-bg);
    fill:var(--button-active-color);
    cursor: pointer;
  }
  :host dialog .button svg{
     height:15px;
     width:15px;
     margin-left:-3px;
   }
  :host div.hex input{
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      vertical-align: middle;
      display: inline-block;
    }
    :host .button.copy{
      padding:8px 6px 5px 5px;
      position:relative;
      position:relative;
      border-left:0;
      border-bottom-right-radius: 3px;
      border-top-right-radius: 3px;
      height:34px;
      display: inline-block;
      box-sizing: border-box;
      overflow: hidden;
      vertical-align: middle;
    }
    :host .button.copy svg{
      height:16px;
      width:15px;
      margin-right:-2px;
    }
  :host .button.copy span{
    font-size: 10px;
    position:relative;
    top:-3px;
  }
    :host a.button.l{
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    :host a.button.r{
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      border-left:none;
    }
    :host a.button.active{
      color: #eee;
      background-color: var(--button-active-bg);
      cursor:default;
    }
    :host .ok{
      position:absolute;
      bottom:0;
      right:0;
    }
    :host .ok a{
      border-radius:3px;
      padding:6px 12px;
    }
    :host .swatch{
      height:14px;
      width:14px;
      display: inline-block;
      position:relative;
      top:2px;
      margin-left:3px;
    }
    :host .swatch span{
      position: absolute;
      z-index: 1;
      top:0;
      left:0;
      height:100%;
      width:100%;
    }
    :host .swatch span.checky{
      ${qt}
      z-index: 0;
    }
  `, Ae = E`
  :host > div {
    margin-bottom: 8px;
    display: block;
    position: relative;
  }

  :host label {
    width: 12px;
    display: inline-block;
    color: var(--label-color);
    font-family: var(--font-fam);
  }

  :host .form-control {
    ${Yt}
  }

  :host .form-control:focus {
    ${Wt}
  }

  :host .preview-bar {
    height: 4px;
    width: 85.5px;
    position: absolute;
    bottom: 0px;
    right: 17.5px;
    --pct: 0;
    pointer-events: none;
    z-index: 2;
  }

  :host .preview-bar:after {
    position: absolute;
    content: '';
    background-image: var(--preview);
    background-color: transparent;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    box-shadow: inset 0 -1px 1px var(--form-border-color);
    height: 100%;
    width: 100%;
  }

  :host > div.active .preview-bar {
    width: 128px;
    bottom: -23px;
    right: -9px;
    height: 10px;
    border: 8px solid var(--input-bg);
    box-shadow:var(--input-active-box-shadow);
    pointer-events: all;
    z-index: 2;
    cursor: pointer;

  }
  :host > div.active .preview-bar:after {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  :host .preview-bar .pct {
    bottom: -3px;
    margin-top: -.75px;
    position: absolute;
    width: 3px;
    height: 11px;
    background: 0 0;
    left: var(--pct);
    display: inline-block;
    z-index: 3;
    pointer-events: none;
  }

  :host .preview-bar .pct:before {
    content: "";
    height: 7px;
    width: 5px;
    position: absolute;
    left: -2.5px;
    top: 2.5px;
    background-color: #fff;
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
  }
  :host .active .preview-bar .pct:before{

    width:7px;
    height:11px;
    left:-3.5px;
    top:-1px;
  }
  :host .transparent-checks {
    ${qt}
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  :host div.active .transparent-checks {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`, ke = {
  r: "R (red) channel",
  g: "G (green) channel",
  b: "B (blue) channel",
  h: "H (hue) channel",
  s: "S (saturation) channel",
  v: "V (value / brightness) channel",
  l: "L (luminosity) channel",
  a: "A (alpha / opacity) channel"
};
class at extends k {
  constructor() {
    super(), g(this, "valueChange", (t, e = null) => {
      e = e ?? Number(this.renderRoot.querySelector("input").value), this.channel === "a" && (e /= 100), this.c[this.channel] = e;
      let i = c.parse(this.c);
      this.group !== "rgb" && (i.hsx = this.c), this.c = this.group === "rgb" ? this.color.rgbObj : this.isHsl ? this.color.hsl : this.color.hsv, R(this.renderRoot, i);
    });
  }
  clickPreview(t) {
    const e = Math.max(0, Math.min(t.offsetX, 128));
    let i = Math.round(e / 128 * this.max);
    this.channel === "a" && (i = Number((e / 127).toFixed(2))), this.valueChange(null, i), this.setActive(!1);
  }
  setActive(t) {
    this.active = t, t && this.renderRoot.querySelector("input").select();
  }
  setPreviewGradient() {
    let t;
    this.group === "rgb" ? t = this.color.rgbObj : this.color.hsx ? t = this.color.hsx : t = this.isHsl ? this.color.hsl : this.color.hsv, this.c = t;
    let e = this.group, i = this.channel;
    const s = i === "a";
    this.v = t[i], s && (this.v *= 100);
    let r = 255, n, a;
    if (e !== "rgb" || i === "a")
      if (i === "h") {
        r = this.max = 359, this.previewGradient = {
          "--preview": `linear-gradient(90deg, ${Xt(24, t)})`,
          "--pct": `${100 * (t.h / r)}%`
        };
        return;
      } else
        s ? r = 1 : r = 100;
    if (this.max = r, n = { ...t }, a = n, n[this.channel] = 0, n = c.parse(n), a[this.channel] = r, a = c.parse(a), this.channel === "l") {
      let l = { ...t };
      l.l = 50, this.previewGradient = {
        "--preview": `linear-gradient(90deg, ${n.hex}, ${c.parse(l).hex}, ${a.hex})`,
        "--pct": `${100 * (t[this.channel] / r)}%`
      };
    } else
      this.previewGradient = {
        "--preview": `linear-gradient(90deg, ${s ? n.css : n.hex}, ${s ? a.css : a.hex})`,
        "--pct": `${100 * (t[this.channel] / r)}%`
      };
  }
  willUpdate(t) {
    this.setPreviewGradient();
  }
  render() {
    const t = this.channel === "a" ? f`<div class='transparent-checks'></div>` : null, e = this.channel === "a" ? 100 : this.max;
    return f`
      <div class='${P({ active: this.active })}'>
        <label for=channel_${this.ch} >${this.channel.toUpperCase()}</label>
        <input id=channel_${this.ch} aria-label='${ke[this.channel]}'
          class='form-control' .value='${Math.round(this.v)}'
          type='number' min='0' max='${e}'
          @input='${this.valueChange}'
          @focus='${() => this.setActive(!0)}'
          @blur='${() => this.setActive(!1)}'
        />
        <div class='preview-bar' style='${x(this.previewGradient)}' @mousedown='${this.clickPreview}'>
          <div class='pct'></div>
          ${t}
        </div>
      </div>`;
  }
}
g(at, "properties", {
  group: { type: String },
  channel: { type: String },
  color: { type: Object },
  isHsl: { type: Boolean },
  c: { type: Object, state: !0, attribute: !1 },
  previewGradient: { type: Object, state: !0, attribute: !1 },
  active: { type: Boolean, state: !0, attribute: !1 },
  max: { type: Number, state: !0, attribute: !1 },
  v: { type: Number, state: !0, attribute: !1 }
}), g(at, "styles", Ae);
customElements.define("color-input-channel", at);
class lt extends k {
  constructor() {
    super(), this.isHsl = !0, this.circlePos = { top: 0, left: 0, bounds: { x: "", y: "" } }, this.size = 160;
  }
  setColor(t) {
    R(this.renderRoot, t);
  }
  setCircleCss(t, e) {
    let i = `${t}`, s = `${e}`, r = { x: `0, ${this.size}`, y: `0,${this.size}` };
    this.circlePos = { top: s, left: i, bounds: r };
  }
  pickCoord({ offsetX: t, offsetY: e }) {
    let i = t, s = e;
    const { size: r, hsw: n, isHsl: a, color: l } = this;
    let h = (r - s) / r;
    h = Math.round(h * 100);
    let p = Math.round(i / r * 100), d = { h: n.h, s: p, [a ? "l" : "v"]: h }, u = a ? c.fromHsl(d) : c.fromHsv(d);
    this.setCircleCss(i, s), u.a = l.alpha, u.hsx = d, u.fromHSLCanvas = !0, this.setColor(u);
  }
  debouncePaintDetail(t) {
    clearTimeout(this.bouncer), this.bouncer = setTimeout(() => this.paintHSL(t, !0), 50), this.paintHSL(t, !1);
  }
  // todo: test assumption that this perf lag (lit warning)
  //  is ok due to rendering canvas post update
  paintHSL(t, e = null) {
    if (this.debounceMode && e === null)
      return this.debouncePaintDetail(t);
    const { ctx: i, color: s, isHsl: r, size: n } = this;
    if (!i)
      return;
    let a = s;
    t = t ?? r ? a.hsl : a.hsv, t.w = r ? t.l : t.v;
    let { h: l, s: h, w: p } = t, d = this.hsw = { h: l, s: h, w: p }, u = n / 100;
    const b = r ? (w, A, H) => `hsl(${w}, ${A}%, ${100 - H}%)` : (w, A, H) => c.fromHsv({ h: w, s: A, v: 100 - H }).hex;
    let $ = e === !1 ? 4 : 1;
    for (let w = 0; w < 100; w += $)
      for (let A = 0; A < 100; A += $)
        i.fillStyle = b(l, w, A), i.fillRect(w, A, w + $, A + $);
    this.setCircleCss(d.s * u, n - t.w * u);
  }
  willUpdate(t) {
    var e;
    if (t.has("color") || t.has("isHsl")) {
      if ((e = this.color) != null && e.hsx) {
        if (this.color.fromHSLCanvas) {
          delete this.color.fromHSLCanvas;
          return;
        }
        return this.paintHSL(this.color.hsx);
      }
      this.paintHSL();
    }
  }
  firstUpdated(t) {
    let e = this.renderRoot.querySelector("canvas");
    this.ctx = e.getContext("2d"), this.paintHSL();
  }
  circleMove({ posTop: t, posLeft: e }) {
    this.pickCoord({ offsetX: e, offsetY: t });
  }
  render() {
    let t = { height: this.size + "p", width: this.size + "px" }, { top: e, left: i, bounds: s } = this.circlePos;
    return f`
      <div class='outer' @click='${this.pickCoord}' style='${x(t)}'>
        <canvas height='100' width='100'></canvas>
        <lit-movable
          boundsX='${s.x}' boundsY='${s.y}'
          posTop='${e}' posLeft='${i}' .onmove='${(r) => this.circleMove(r)}'>
          <div class='circle'></div>
        </lit-movable>
      </div>`;
  }
}
g(lt, "properties", {
  color: { type: Object },
  isHsl: { type: Boolean },
  size: { type: Number },
  debounceMode: { type: Boolean },
  ctx: { type: Object, state: !0, attribute: !1 },
  hsw: { type: Object, state: !0, attribute: !1 },
  circlePos: { type: Object, state: !0, attribute: !1 }
}), g(lt, "styles", E`
    :host .outer {
      position: absolute;
      top: 0;
      right: 0;
    }

    :host .outer canvas {
      height: inherit;
      width: inherit;
      cursor: pointer;
    }

    :host .circle {
      height: 12px;
      width: 12px;
      border: solid 2px #eee;
      border-radius: 50%;
      box-shadow: 0 0 3px #000, inset 0 0 1px #fff;
      position: absolute;
      margin: -8px;
      mix-blend-mode: difference;
    }
  `);
customElements.define("hsl-canvas", lt);
const et = (o) => isFinite(o) ? Number(o) : Number(o.replace(/[^0-9.\-]/g, "")), Ht = (o) => (o = Number(o), (isNaN(o) || [void 0, null].includes(o)) && (o = 0), o);
class v {
  constructor(t, e) {
    this.x = Ht(t), this.y = Ht(e);
  }
  static fromPointerEvent(t) {
    const { pageX: e, pageY: i } = t;
    return new v(e, i);
  }
  static fromElementStyle(t) {
    let e = et(t.style.left ?? 0), i = et(t.style.top ?? 0);
    return new v(e, i);
  }
  static fromObject({ x: t, y: e }) {
    return new v(t, e);
  }
  get top() {
    return this.y;
  }
  set top(t) {
    this.y = t;
  }
  get left() {
    return this.x;
  }
  set left(t) {
    this.x = t;
  }
}
const Se = (o) => {
  const t = v.fromPointerEvent(o), e = o.target.getBoundingClientRect();
  let i = t.x - (e.left + document.body.scrollLeft), s = t.y - (e.top + document.body.scrollTop);
  return new v(i, s);
};
class C {
  constructor(t = -1 / 0, e = 1 / 0) {
    this.min = t, this.max = e, this.attr = "";
  }
  get constrained() {
    return this.min === this.max;
  }
  get unconstrained() {
    return this.min === -1 / 0 && this.max === 1 / 0;
  }
  static fromString(t = null, e = 0) {
    if (!t)
      return new C();
    if (t === "null")
      return new C(0, 0);
    let [i, s] = t.split(",").map((n) => Number(n.trim()) + e), r = new C(i, s);
    return r.attr = t, r;
  }
}
class Gt extends k {
  constructor() {
    super(), g(this, "_target"), g(this, "_targetSelector", null), g(this, "_boundsX", new C()), g(this, "_boundsY", new C()), g(this, "isMoving", !1), g(this, "moveState", {}), g(this, "_vertical", null), g(this, "_horizontal", null), g(this, "_posTop", null), g(this, "_posLeft", null), g(this, "_grid", 1), g(this, "pointerId");
  }
  get vertical() {
    return this._vertical;
  }
  set vertical(t) {
    this.boundsY = t, this.boundsX = "null", this._vertical = t;
  }
  get horizontal() {
    return this._horizontal;
  }
  set horizontal(t) {
    this.boundsX = t, this.boundsY = "null", this._horizontal = t;
  }
  set posTop(t) {
    t = Number(t), this._posTop = t, this.target && (this.target.style.top = t + "px");
  }
  get posTop() {
    return this._posTop;
  }
  set posLeft(t) {
    t = Number(t), this._posLeft = t, this.target && (this.target.style.left = t + "px");
  }
  get posLeft() {
    return this._posLeft;
  }
  get grid() {
    return this._grid;
  }
  set grid(t) {
    t > 0 && t < 1 / 0 ? this._grid = t : this._grid = 1;
  }
  get bounds() {
    return {
      left: this._boundsX,
      top: this._boundsY
    };
  }
  set targetSelector(t) {
    this._targetSelector = t, this._retryTarget = document.querySelector(t) === null, this._target = document.querySelector(t);
  }
  get targetSelector() {
    return this._targetSelector;
  }
  get target() {
    return this._target ?? this;
  }
  set target(t) {
    this._target = t;
  }
  get boundsX() {
    return this._boundsX;
  }
  set boundsX(t) {
    var e;
    this._boundsX = C.fromString(t, et(((e = this.target) == null ? void 0 : e.style.left) ?? 0)), this.bounds.left = this._boundsX;
  }
  get boundsY() {
    return this._boundsY;
  }
  set boundsY(t) {
    var e;
    this._boundsY = C.fromString(t, et(((e = this.target) == null ? void 0 : e.style.top) ?? 0)), this.bounds.top = this._boundsY;
  }
  firstUpdated(t) {
    this._retryTarget && (this.target = document.querySelector(this.targetSelector));
    let { bounds: e, target: i, posTop: s, posLeft: r } = this, { offsetLeft: n, offsetTop: a, style: { left: l, top: h } } = this.target;
    i.classList.add("--movable-base"), i.addEventListener("pointerdown", (p) => this.pointerdown(p)), i.style.position = "absolute", i.style.cursor = "pointer", r ? i.style.left = r + "px" : !l && n && (i.style.left = n + "px", e.left.constrained && (e.left.min = e.left.max = n)), s ? i.style.top = s + "px" : !h && a && (i.style.top = a + "px", e.top.constrained && (e.top.min = e.top.max = a));
  }
  reposition(t) {
    if (typeof t == "object") {
      const { eventsOnly: e, target: i } = this;
      this.posTop = t.top, this.posLeft = t.left, i && !e && (i.style.left = t.left + "px", i.style.top = t.top + "px");
    } else
      this.isMoving = t;
  }
  moveInit(t) {
    let e = this.moveState, { target: i, bounds: s } = this;
    e.mouseCoord = v.fromPointerEvent(t), e.startCoord = v.fromElementStyle(i), e.moveDist = new v(0, 0), e.totalDist = new v(0, 0), e.clickOffset = Se(t), e.coords = v.fromObject(e.startCoord), e.maxX = isFinite(s.left.min) && isFinite(s.left.max) ? s.left.min + s.left.max : 1 / 0, e.maxY = isFinite(s.top.min) && isFinite(s.top.max) ? s.top.min + s.top.max : 1 / 0, this.isMoving = !0, this.reposition(!0), this.eventBroker("movestart", t);
  }
  eventBroker(t, e) {
    this.moveState.posTop = this.posTop, this.moveState.posLeft = this.posLeft;
    let i = new CustomEvent(t, {
      bubbles: !0,
      composed: !0,
      detail: { ...e, ...this.moveState, element: this }
    });
    this.renderRoot.dispatchEvent(i);
    let s = this[`on${t}`];
    s && s({ ...e, ...this.moveState, me: this });
  }
  unbind(t) {
    this.pointerId = null, this.isMoving = !1, document.body.removeEventListener("pointermove", (e) => this.motionHandler(e)), this.moveEnd(t);
  }
  moveEnd(t) {
    document.body.removeEventListener("pointerup", (e) => this.unbind(e)), this.isMoving = this.moveState.isMoving = !1, this.reposition(!1), this.eventBroker("moveend", t);
  }
  motionHandler(t) {
    t.stopPropagation();
    let e = v.fromPointerEvent(t), i = this.moveState, { grid: s, bounds: r, shiftBehavior: n, boundsX: a, boundsY: l } = this;
    if (i.moveDist = v.fromObject({
      x: e.x - i.mouseCoord.x,
      y: e.y - i.mouseCoord.y
    }), i.mouseCoord = e, i.totalDist = v.fromObject({
      x: i.totalDist.x + i.moveDist.x,
      y: i.totalDist.y + i.moveDist.y
    }), i.coords = v.fromObject({
      x: Math.round(i.totalDist.x / s) * s + i.startCoord.x,
      y: Math.round(i.totalDist.y / s) * s + i.startCoord.y
    }), n && t.shiftKey && a.unconstrained && l.unconstrained) {
      let { x: h, y: p } = i.totalDist;
      Math.abs(h) > Math.abs(p) ? i.coords.top = i.startCoord.y : i.coords.left = i.startCoord.x;
    } else
      i.coords.y = Math.min(Math.max(r.top.min, i.coords.top), r.top.max), i.coords.x = Math.min(Math.max(r.left.min, i.coords.left), r.left.max);
    isFinite(i.maxX) && (i.pctX = Math.max(r.left.min, i.coords.left) / i.maxX), isFinite(i.maxY) && (i.pctY = Math.max(r.top.min, i.coords.top) / i.maxY), this.reposition(i.coords), this.eventBroker("move", t);
  }
  pointerdown(t) {
    document.body.setPointerCapture(t.pointerId), t.preventDefault(), t.stopPropagation(), t.pointerId !== void 0 && (this.pointerId = t.pointerId), document.body.addEventListener("pointerup", (e) => this.unbind(e), !1), document.body.addEventListener("pointermove", (e) => {
      this.pointerId !== void 0 && e.pointerId === this.pointerId && this.motionHandler(e);
    }, !1), this.moveInit(t);
  }
  render() {
    return f`<slot></slot>`;
  }
}
g(Gt, "properties", {
  //set the left/top position
  // defaults to  element.offsetTop /offsetLeft
  posLeft: { type: Number },
  posTop: { type: Number },
  // target element that moves - defaults to root element
  target: { type: Object, attribute: !1, state: !0 },
  // selector that will set the target element that will move
  targetSelector: { type: String },
  // object (left:boundsX,top:boundsY)
  bounds: { type: Object, attribute: !1, state: !0 },
  // Both x and y default to -Infinity,Infinity.
  // Set to boundsX="min,max" ([0,0] to restrict the axis)
  // these are attribute string setters meant for declarative
  // element attribute setting
  boundsX: { type: String },
  boundsY: { type: String },
  // vertical="min,max" - constrain movement to y axis within min and max numbers provided.
  // automatically disables horizontal movement
  vertical: { type: String },
  // horizontal="min,max" - constrain movement to x axis within min and max provided.
  // automatically disables vertical movement
  horizontal: { type: String },
  //defaults to 1. snap to grid size in pixels.
  grid: { type: Number },
  // set to true enables shift key to constrain movement to either
  // x or y axis (whichever is greater).
  // Setting any bounds option automatically disables shift key behavior.
  shiftBehavior: { type: Boolean },
  //disables moving
  disabled: { type: Boolean },
  // advanced mode: Does not move the element, but fires
  // events so you can pass to your own handler
  eventsOnly: { type: Boolean },
  onmovestart: { type: Object },
  onmoveend: { type: Object },
  onmove: { type: Object }
});
window.customElements.define("lit-movable", Gt);
class ht extends k {
  constructor() {
    super(), g(this, "_color"), this._color = c.parse(nt.slateblue), this.isHsl = !0;
  }
  firstUpdated(t) {
    this.debounceMode = !1, t.has("value") && (this.color = c.parse(this.value));
  }
  get color() {
    return this._color;
  }
  set color(t) {
    t = t.hsx ? t : t.rgba ? c.parse(...t.rgba) : c.parse(t), t && (this.hex = t.hex, this._color = t, R(this.renderRoot, t, "colorchanged"));
  }
  updateColor({ detail: { color: t } }) {
    this.color = t;
  }
  setColor(t) {
    const e = this.renderRoot.querySelector("input#hex").value, i = c.parse(e);
    i ? this.color = i : console.log(`ignored unparsable input: ${e}`);
  }
  setHue({ detail: { h: t } }) {
    let { s: e, l: i, a: s } = this.color.hsl;
    s === 1 && (s = void 0), this.color = { h: t, s: e, l: i, a: s };
  }
  setHsl(t) {
    this.isHsl = t;
  }
  okColor() {
    R(this.renderRoot, this.color, "colorpicked");
  }
  showCopyDialog() {
    if (this.copied = null, this.dlg = this.dlg ?? this.renderRoot.querySelector("dialog"), this.dlg.open)
      return this.dlg.classList.remove("open"), this.dlg.close();
    this.dlg.show(), this.dlg.classList.add("open");
  }
  clipboard(t) {
    let e = this.color.toString(t);
    window.navigator.clipboard.writeText(e).then(() => {
      this.hideCopyDialog(e);
    });
  }
  hideCopyDialog(t) {
    if (t) {
      this.copied = t, setTimeout(() => this.dlg.classList.remove("open"), 400), setTimeout(() => this.hideCopyDialog(), 1200);
      return;
    }
    this.dlg.classList.remove("open"), this.dlg.close(), this.copied = null;
  }
  setSliding({ detail: t }) {
    this.debounceMode = t.sliding;
  }
  render() {
    const t = this.isHsl ? ["h", "s", "l"] : ["h", "s", "v"], e = { button: !0, active: !this.isHsl, l: !0 }, i = { button: !0, active: this.isHsl, r: !0 };
    let s = { backgroundColor: this.color }, r = this.copied ? { textAlign: "center", display: "block" } : { display: "none" };
    const n = this.debounceMode;
    return f`
      <div class='outer'>
        <hue-bar
          @sliding-hue='${this.setSliding}'
          hue='${this.color.hsx ? this.color.hsx.h : this.color.hsl.h}'
          @hue-update='${this.setHue}' .color='${this.color}'></hue-bar>
        <div class='d-flex'>
          <div class='col w-30'>
            ${["r", "g", "b", "a"].map((a) => f`
              <color-input-channel
                group='rgb' channel='${a}' isHsl='${this.isHsl}'
                .color='${this.color}' @color-update='${this.updateColor}' />
            `)}
            <div class='hex'>
              <dialog @blur='${() => this.hideCopyDialog()}' tabindex='0'>
                <sub class='copied' style='${x(r)}'>copied <em>${this.copied}</em></sub>
                ${this.copied ? f`` : f`
                  <a class='copy-item' @click=${(a) => this.clipboard("hex", a)} id='copyHex'>
                    <input class='form-control' disabled='disabled' value='${this.color.hex}'>
                    <button title='Copy HEX String' class='button' tabindex='0'>${Z}</button>
                  </a>
                  <a class='copy-item' @click=${(a) => this.clipboard("css", a)} id='copyRgb'>
                    <input class='form-control' disabled='disabled' value='${this.color.css}'>
                    <button title='Copy RGB String' class='button' tabindex='0'>${Z}</button>
                  </a>
                  <a class='copy-item'  id='copyHsl'
                     @click=${(a) => this.clipboard(this.color.alpha < 1 ? "hsla" : "hsl", a)}>
                    <input class='form-control' disabled='disabled'
                           value='${this.color.toString(this.color.alpha < 1 ? "hsla" : "hsl")}'>
                    <button title='Copy HSL String' class='button' tabindex='0'>${Z}</button>
                  </a>
                `}

              </dialog>
              <label for='hex'>#</label>
              <input aria-label='Hexadecimal value (editable - accepts any valid color string)'
                     @input='${this.setColor}' class='form-control' id='hex' placeholder='Set color'
                     value='${this.hex}' /><a title='Show copy to clipboard menu'
                                               @click='${this.showCopyDialog}' class='button copy'>
              ${Z}
              <span>&#11205;</span>
            </a>

            </div>
          </div>
          <div class='col w-30'>
            ${t.map((a) => f`
              <color-input-channel
                group="hsl" channel="${a}" .isHsl="${this.isHsl}"
                .color="${this.color}" @color-update="${this.updateColor}" />
            `)}
            <div class='hsl-mode'>
              <a title='Use hue / saturation / value (brightness) mode'
                 class='${P(e)}'
                 @click='${() => this.setHsl(!1)}'>HSV</a><a
              title='Use hue / saturation / luminosity mode'
              class='${P(i)}'
              @click='${() => this.setHsl(!0)}'>HSL</a>
            </div>
          </div>
          <div class='w-40'>
            <hsl-canvas .debounceMode='${n}'
              size='${160}' .isHsl='${this.isHsl}'
              .color='${this.color}' @color-update='${this.updateColor}'></hsl-canvas>
            <div class='ok'>
              <a class='button' @click='${this.okColor}'>OK
                <span class='swatch'>
                  <span style='${x(s)}'></span>
                  <span class='checky'></span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }
}
g(ht, "properties", {
  color: { type: Object, state: !0, attribute: !1 },
  hex: { type: String, state: !0, attribute: !1 },
  value: { type: String },
  isHsl: { type: Boolean, state: !0, attribute: !1 },
  copied: { type: String },
  debounceMode: { type: Boolean }
}), g(ht, "styles", we);
window.customElements.define("color-picker", ht);
const V = (o) => `${o}px`;
class dt extends k {
  constructor() {
    super(), this.size = 300, this.scaleValues = "0,10,20,70,80,90,100", this.scaleColors = "#666, #888, green, yellow, orange, red", this.value = 0, this.valuePrecision = 0, this.ticks = "10", this.minorTicks = 5, this.errors = [], this.hasErrors = !1;
  }
  errorHandler(t, e) {
    console.error({ [t + "Error"]: e }), this.errors.push({ [t + "Error"]: e }), this.hasErrors = !0;
  }
  initThresholds() {
    let { scaleValues: t, scaleColors: e, min: i, max: s, fluidColors: r } = this;
    const n = {
      values: t,
      colors: e,
      min: i,
      max: s,
      fluid: r
    }, a = (l, h) => this.errorHandler(l, h);
    this.thresholds = bt.fromScaleAttributes(n, a), this.errors.length || (this.ticks = this.tickAttr);
  }
  willUpdate(t) {
    if (this.thresholds) {
      t.has("fluidColors") && (this.thresholds.fluid = this.fluidColors), ["scaleColors", "scaleValues", "minorTicks"].some((s) => t.has(s)) && this.initThresholds();
      const e = c.parse(getComputedStyle(this.shadowRoot.host).getPropertyValue("--hand-color"));
      let i = this.shadowRoot.querySelector("div.dial");
      if (i && !this.dialButtonInit) {
        if (e.hsl.l < 40) {
          i.style.setProperty("--center-color", e.darken(0.2));
          let { r: s, g: r, b: n } = e.lighten(0.35), a = `radial-gradient(ellipse at center,
      rgba(${s}, ${r}, ${n}, 1) 0%,
      rgba(${s}, ${r}, ${n}, .8) 22%,
      rgba(0,0,0, .5) 22%,
      rgba(${s}, ${r}, ${n}, .4) 27%,
      rgba(0,0,0, .2) 100%
    )${this.plain ? "" : ",conic-gradient(from 180deg at 50.0% 50.0%,rgba(0,0,0,0) 98.00deg,rgba(255,255,255,0.3) 103.00deg, rgba(255,255,255,0.5) 180.00deg,      rgba(255,255,255,0.3) 257.00deg,      rgba(0,0,0,0) 265.00deg    )"}`;
          i.style.setProperty("--center-gradient", a);
        } else
          i.style.setProperty("--center-color", e.lighten(0.2));
        i.style.setProperty("--center-shadow", e.lighten(0.2)), this.dialButtonInit = !0;
      }
    }
    t.has("options") && (Object.entries(this.options).forEach(([e, i]) => {
      this[e] = i;
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
    else if (ut.snum(t) || !t.includes(",")) {
      e = [];
      let s = Number(t), r = this.spread / s;
      for (let n = this.min; n < this.max; n += r) {
        let a = Number(n.toFixed(this.valuePrecision));
        e.push(a);
      }
      e.push(this.max), e = Array.from(new Set(e));
    } else
      e = t.split(",").map((s) => Number(s)).filter((s) => isFinite(s));
    let i = [];
    if (t !== "thresholds" && isFinite(this.minorTicks)) {
      let s = this.minorTicks;
      e.slice(0, e.length - 1).forEach((r, n) => {
        let a = e[n + 1], l = (a - r) / s;
        for (let h = r + l; h < a; h += l)
          i.push({ v: h, d: this.val2Deg(h) });
      });
    }
    this._minor = i, this._ticks = e.map((s) => ({ d: this.val2Deg(s), v: s }));
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
    return V((9 + this.size / 33).toFixed(1));
  }
  get transform() {
    return (t, e = !0, i = !0) => (i && (t > 0 ? t = 0 - t : t = Math.abs(t)), `${i ? "scale(-1, 1)" : ""} translateX(-100%) translateY(-50%) rotate(${t}deg)`);
  }
  get val2Deg() {
    return (t) => {
      let e = 270, i = 1 - (t - this.min) / this.spread;
      return Math.max(0, Math.min(e, i * e)) % 360 - 136;
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
    let { size: t, setDynamicOuterColor: e } = this, i = {
      height: V(t),
      width: V(t),
      padding: V((t / 40).toFixed(1))
    };
    return e && (i["--outer-color"] = this.valueColor), i;
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
      paddingBottom: V(3),
      borderRadius: this.plain ? ".41em" : ".5em",
      ...e
    };
  }
  get dialGradient() {
    return { background: `conic-gradient(from 181deg, rgba(1,1,1,0) 12%, ${this.thresholds.scaledStops(this.min, this.max, 0.75, 0.125).join(", ")}, rgba(1,1,1,0) 88%)` };
  }
  get tickStyle() {
    return (t, e) => {
      let { tickSize: i, transform: s, ticks: r } = this;
      return {
        fontSize: i,
        transform: s(t.d, !0, !(e === 0 || e === r.length - 1))
      };
    };
  }
  get valueColor() {
    const { thresholds: t, value: e } = this;
    return t.getColor(t.dataItem.pctAtVal(e));
  }
  render() {
    if (!this.thresholds)
      return f``;
    const {
      dialGradient: t,
      flipClass: e,
      labelStyle: i,
      outerStyle: s,
      fontSize: r,
      value: n,
      outerClass: a,
      labelClass: l,
      label: h,
      valuePrecision: p,
      tickStyle: d,
      tickAt: u,
      ticks: b,
      minor: $,
      val2Deg: w
    } = this, A = { transform: `rotate(${w(n)}deg)` };
    return f`
      <div class=${P(a)} style=${x(s)}>
        <div class="gauge-wrap">
          ${b == null ? void 0 : b.map((H, O) => f`
            <div class="${P(e(O, !0))}" style="${x(d(H, O))}" v="${u(O)}"></div>`)}
          ${$ == null ? void 0 : $.map((H, O) => f`
            <div class="${P(e(O, !1))}" style="${x(d(H, O))}" v=""></div>`)}


          <div class="hand" style="${x(A)}"></div>
          <div class="dial">
            <div class="color-band" style="${x(t)}"></div>
            <div class="dial-border"></div>
            <div class="${P(l)}">
              <span style="${x(i)}">
                <strong style="${x(r)}">
                  ${Number(n.toFixed(p)).toLocaleString("en-US")}
                </strong><br>${h}

              </span>
        </div>
      </div>
    </div>
  </div>
    `;
  }
}
g(dt, "styles", ve), g(dt, "properties", {
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
customElements.define("lit-gauge", dt);
export {
  dt as LitGauge
};
