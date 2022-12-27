!function e(t, n, r) {
    function i(s, a) {
        if (!n[s]) {
            if (!t[s]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(s, !0);
                if (o) return o(s, !0);
                var c = new Error("Cannot find module '" + s + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = n[s] = {exports: {}};
            t[s][0].call(u.exports, (function (e) {
                return i(t[s][1][e] || e)
            }), u, u.exports, e, t, n, r)
        }
        return n[s].exports
    }

    for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) i(r[s]);
    return i
}({
    1: [function (e, t, n) {
        "use strict";
        var r = e("./utils");

        function i() {
            var e = {}, t = 0, n = 0, r = 0;
            return {
                add: function (i, o) {
                    o || (o = i, i = 0), i > n ? n = i : i < r && (r = i), e[i] || (e[i] = []), e[i].push(o), t++
                }, process: function () {
                    for (var t = r; t <= n; t++) for (var i = e[t], o = 0; o < i.length; o++) (0, i[o])()
                }, size: function () {
                    return t
                }
            }
        }

        t.exports = function (e) {
            var t = (e = e || {}).reporter, n = r.getOption(e, "async", !0), o = r.getOption(e, "auto", !0);
            o && !n && (t && t.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true."), n = !0);
            var s, a = i(), l = !1;

            function c() {
                for (l = !0; a.size();) {
                    var e = a;
                    a = i(), e.process()
                }
                l = !1
            }

            function u() {
                s = setTimeout(c, 0)
            }

            return {
                add: function (e, t) {
                    !l && o && n && 0 === a.size() && u(), a.add(e, t)
                }, force: function (e) {
                    l || (void 0 === e && (e = n), s && (clearTimeout(s), s = null), e ? u() : c())
                }
            }
        }
    }, {"./utils": 2}],
    2: [function (e, t, n) {
        "use strict";
        (t.exports = {}).getOption = function (e, t, n) {
            var r = e[t];
            return null == r && void 0 !== n ? n : r
        }
    }, {}],
    3: [function (e, t, n) {
        var r = e("../internals/is-callable"), i = e("../internals/try-to-string"), o = TypeError;
        t.exports = function (e) {
            if (r(e)) return e;
            throw o(i(e) + " is not a function")
        }
    }, {"../internals/is-callable": 65, "../internals/try-to-string": 110}],
    4: [function (e, t, n) {
        var r = e("../internals/is-constructor"), i = e("../internals/try-to-string"), o = TypeError;
        t.exports = function (e) {
            if (r(e)) return e;
            throw o(i(e) + " is not a constructor")
        }
    }, {"../internals/is-constructor": 66, "../internals/try-to-string": 110}],
    5: [function (e, t, n) {
        var r = e("../internals/is-callable"), i = String, o = TypeError;
        t.exports = function (e) {
            if ("object" == typeof e || r(e)) return e;
            throw o("Can't set " + i(e) + " as a prototype")
        }
    }, {"../internals/is-callable": 65}],
    6: [function (e, t, n) {
        var r = e("../internals/well-known-symbol"), i = e("../internals/object-create"),
            o = e("../internals/object-define-property").f, s = r("unscopables"), a = Array.prototype;
        null == a[s] && o(a, s, {configurable: !0, value: i(null)}), t.exports = function (e) {
            a[s][e] = !0
        }
    }, {
        "../internals/object-create": 79,
        "../internals/object-define-property": 81,
        "../internals/well-known-symbol": 117
    }],
    7: [function (e, t, n) {
        var r = e("../internals/object-is-prototype-of"), i = TypeError;
        t.exports = function (e, t) {
            if (r(t, e)) return e;
            throw i("Incorrect invocation")
        }
    }, {"../internals/object-is-prototype-of": 86}],
    8: [function (e, t, n) {
        var r = e("../internals/is-object"), i = String, o = TypeError;
        t.exports = function (e) {
            if (r(e)) return e;
            throw o(i(e) + " is not an object")
        }
    }, {"../internals/is-object": 69}],
    9: [function (e, t, n) {
        t.exports = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView
    }, {}],
    10: [function (e, t, n) {
        "use strict";
        var r, i, o, s = e("../internals/array-buffer-native"), a = e("../internals/descriptors"),
            l = e("../internals/global"), c = e("../internals/is-callable"), u = e("../internals/is-object"),
            d = e("../internals/has-own-property"), f = e("../internals/classof"), p = e("../internals/try-to-string"),
            h = e("../internals/create-non-enumerable-property"), y = e("../internals/define-built-in"),
            m = e("../internals/object-define-property").f, v = e("../internals/object-is-prototype-of"),
            g = e("../internals/object-get-prototype-of"), b = e("../internals/object-set-prototype-of"),
            w = e("../internals/well-known-symbol"), _ = e("../internals/uid"), x = e("../internals/internal-state"),
            k = x.enforce, j = x.get, C = l.Int8Array, E = C && C.prototype, S = l.Uint8ClampedArray,
            D = S && S.prototype, O = C && g(C), P = E && g(E), B = Object.prototype, A = l.TypeError,
            M = w("toStringTag"), I = _("TYPED_ARRAY_TAG"), T = s && !!b && "Opera" !== f(l.opera), L = !1, K = {
                Int8Array: 1,
                Uint8Array: 1,
                Uint8ClampedArray: 1,
                Int16Array: 2,
                Uint16Array: 2,
                Int32Array: 4,
                Uint32Array: 4,
                Float32Array: 4,
                Float64Array: 8
            }, R = {BigInt64Array: 8, BigUint64Array: 8}, N = function (e) {
                var t = g(e);
                if (u(t)) {
                    var n = j(t);
                    return n && d(n, "TypedArrayConstructor") ? n.TypedArrayConstructor : N(t)
                }
            }, F = function (e) {
                if (!u(e)) return !1;
                var t = f(e);
                return d(K, t) || d(R, t)
            };
        for (r in K) (o = (i = l[r]) && i.prototype) ? k(o).TypedArrayConstructor = i : T = !1;
        for (r in R) (o = (i = l[r]) && i.prototype) && (k(o).TypedArrayConstructor = i);
        if ((!T || !c(O) || O === Function.prototype) && (O = function () {
            throw A("Incorrect invocation")
        }, T)) for (r in K) l[r] && b(l[r], O);
        if ((!T || !P || P === B) && (P = O.prototype, T)) for (r in K) l[r] && b(l[r].prototype, P);
        if (T && g(D) !== P && b(D, P), a && !d(P, M)) for (r in L = !0, m(P, M, {
            get: function () {
                return u(this) ? this[I] : void 0
            }
        }), K) l[r] && h(l[r], I, r);
        t.exports = {
            NATIVE_ARRAY_BUFFER_VIEWS: T, TYPED_ARRAY_TAG: L && I, aTypedArray: function (e) {
                if (F(e)) return e;
                throw A("Target is not a typed array")
            }, aTypedArrayConstructor: function (e) {
                if (c(e) && (!b || v(O, e))) return e;
                throw A(p(e) + " is not a typed array constructor")
            }, exportTypedArrayMethod: function (e, t, n, r) {
                if (a) {
                    if (n) for (var i in K) {
                        var o = l[i];
                        if (o && d(o.prototype, e)) try {
                            delete o.prototype[e]
                        } catch (n) {
                            try {
                                o.prototype[e] = t
                            } catch (e) {
                            }
                        }
                    }
                    P[e] && !n || y(P, e, n ? t : T && E[e] || t, r)
                }
            }, exportTypedArrayStaticMethod: function (e, t, n) {
                var r, i;
                if (a) {
                    if (b) {
                        if (n) for (r in K) if ((i = l[r]) && d(i, e)) try {
                            delete i[e]
                        } catch (e) {
                        }
                        if (O[e] && !n) return;
                        try {
                            return y(O, e, n ? t : T && O[e] || t)
                        } catch (e) {
                        }
                    }
                    for (r in K) !(i = l[r]) || i[e] && !n || y(i, e, t)
                }
            }, getTypedArrayConstructor: N, isView: function (e) {
                if (!u(e)) return !1;
                var t = f(e);
                return "DataView" === t || d(K, t) || d(R, t)
            }, isTypedArray: F, TypedArray: O, TypedArrayPrototype: P
        }
    }, {
        "../internals/array-buffer-native": 9,
        "../internals/classof": 21,
        "../internals/create-non-enumerable-property": 25,
        "../internals/define-built-in": 28,
        "../internals/descriptors": 32,
        "../internals/global": 53,
        "../internals/has-own-property": 54,
        "../internals/internal-state": 62,
        "../internals/is-callable": 65,
        "../internals/is-object": 69,
        "../internals/object-define-property": 81,
        "../internals/object-get-prototype-of": 85,
        "../internals/object-is-prototype-of": 86,
        "../internals/object-set-prototype-of": 90,
        "../internals/try-to-string": 110,
        "../internals/uid": 114,
        "../internals/well-known-symbol": 117
    }],
    11: [function (e, t, n) {
        "use strict";
        var r = e("../internals/global"), i = e("../internals/function-uncurry-this"),
            o = e("../internals/descriptors"), s = e("../internals/array-buffer-native"),
            a = e("../internals/function-name"), l = e("../internals/create-non-enumerable-property"),
            c = e("../internals/define-built-ins"), u = e("../internals/fails"), d = e("../internals/an-instance"),
            f = e("../internals/to-integer-or-infinity"), p = e("../internals/to-length"),
            h = e("../internals/to-index"), y = e("../internals/ieee754"),
            m = e("../internals/object-get-prototype-of"), v = e("../internals/object-set-prototype-of"),
            g = e("../internals/object-get-own-property-names").f, b = e("../internals/object-define-property").f,
            w = e("../internals/array-fill"), _ = e("../internals/array-slice-simple"),
            x = e("../internals/set-to-string-tag"), k = e("../internals/internal-state"), j = a.PROPER,
            C = a.CONFIGURABLE, E = k.get, S = k.set, D = "ArrayBuffer", O = "Wrong index", P = r.ArrayBuffer, B = P,
            A = B && B.prototype, M = r.DataView, I = M && M.prototype, T = Object.prototype, L = r.Array,
            K = r.RangeError, R = i(w), N = i([].reverse), F = y.pack, z = y.unpack, U = function (e) {
                return [255 & e]
            }, H = function (e) {
                return [255 & e, e >> 8 & 255]
            }, V = function (e) {
                return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]
            }, W = function (e) {
                return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
            }, q = function (e) {
                return F(e, 23, 4)
            }, G = function (e) {
                return F(e, 52, 8)
            }, Y = function (e, t) {
                b(e.prototype, t, {
                    get: function () {
                        return E(this)[t]
                    }
                })
            }, X = function (e, t, n, r) {
                var i = h(n), o = E(e);
                if (i + t > o.byteLength) throw K(O);
                var s = E(o.buffer).bytes, a = i + o.byteOffset, l = _(s, a, a + t);
                return r ? l : N(l)
            }, $ = function (e, t, n, r, i, o) {
                var s = h(n), a = E(e);
                if (s + t > a.byteLength) throw K(O);
                for (var l = E(a.buffer).bytes, c = s + a.byteOffset, u = r(+i), d = 0; d < t; d++) l[c + d] = u[o ? d : t - d - 1]
            };
        if (s) {
            var J = j && P.name !== D;
            if (u((function () {
                P(1)
            })) && u((function () {
                new P(-1)
            })) && !u((function () {
                return new P, new P(1.5), new P(NaN), J && !C
            }))) J && C && l(P, "name", D); else {
                (B = function (e) {
                    return d(this, A), new P(h(e))
                }).prototype = A;
                for (var Q, Z = g(P), ee = 0; Z.length > ee;) (Q = Z[ee++]) in B || l(B, Q, P[Q]);
                A.constructor = B
            }
            v && m(I) !== T && v(I, T);
            var te = new M(new B(2)), ne = i(I.setInt8);
            te.setInt8(0, 2147483648), te.setInt8(1, 2147483649), !te.getInt8(0) && te.getInt8(1) || c(I, {
                setInt8: function (e, t) {
                    ne(this, e, t << 24 >> 24)
                }, setUint8: function (e, t) {
                    ne(this, e, t << 24 >> 24)
                }
            }, {unsafe: !0})
        } else A = (B = function (e) {
            d(this, A);
            var t = h(e);
            S(this, {bytes: R(L(t), 0), byteLength: t}), o || (this.byteLength = t)
        }).prototype, I = (M = function (e, t, n) {
            d(this, I), d(e, A);
            var r = E(e).byteLength, i = f(t);
            if (i < 0 || i > r) throw K("Wrong offset");
            if (i + (n = void 0 === n ? r - i : p(n)) > r) throw K("Wrong length");
            S(this, {
                buffer: e,
                byteLength: n,
                byteOffset: i
            }), o || (this.buffer = e, this.byteLength = n, this.byteOffset = i)
        }).prototype, o && (Y(B, "byteLength"), Y(M, "buffer"), Y(M, "byteLength"), Y(M, "byteOffset")), c(I, {
            getInt8: function (e) {
                return X(this, 1, e)[0] << 24 >> 24
            }, getUint8: function (e) {
                return X(this, 1, e)[0]
            }, getInt16: function (e) {
                var t = X(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
                return (t[1] << 8 | t[0]) << 16 >> 16
            }, getUint16: function (e) {
                var t = X(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
                return t[1] << 8 | t[0]
            }, getInt32: function (e) {
                return W(X(this, 4, e, arguments.length > 1 ? arguments[1] : void 0))
            }, getUint32: function (e) {
                return W(X(this, 4, e, arguments.length > 1 ? arguments[1] : void 0)) >>> 0
            }, getFloat32: function (e) {
                return z(X(this, 4, e, arguments.length > 1 ? arguments[1] : void 0), 23)
            }, getFloat64: function (e) {
                return z(X(this, 8, e, arguments.length > 1 ? arguments[1] : void 0), 52)
            }, setInt8: function (e, t) {
                $(this, 1, e, U, t)
            }, setUint8: function (e, t) {
                $(this, 1, e, U, t)
            }, setInt16: function (e, t) {
                $(this, 2, e, H, t, arguments.length > 2 ? arguments[2] : void 0)
            }, setUint16: function (e, t) {
                $(this, 2, e, H, t, arguments.length > 2 ? arguments[2] : void 0)
            }, setInt32: function (e, t) {
                $(this, 4, e, V, t, arguments.length > 2 ? arguments[2] : void 0)
            }, setUint32: function (e, t) {
                $(this, 4, e, V, t, arguments.length > 2 ? arguments[2] : void 0)
            }, setFloat32: function (e, t) {
                $(this, 4, e, q, t, arguments.length > 2 ? arguments[2] : void 0)
            }, setFloat64: function (e, t) {
                $(this, 8, e, G, t, arguments.length > 2 ? arguments[2] : void 0)
            }
        });
        x(B, D), x(M, "DataView"), t.exports = {ArrayBuffer: B, DataView: M}
    }, {
        "../internals/an-instance": 7,
        "../internals/array-buffer-native": 9,
        "../internals/array-fill": 12,
        "../internals/array-slice-simple": 15,
        "../internals/create-non-enumerable-property": 25,
        "../internals/define-built-ins": 29,
        "../internals/descriptors": 32,
        "../internals/fails": 43,
        "../internals/function-name": 47,
        "../internals/function-uncurry-this": 48,
        "../internals/global": 53,
        "../internals/ieee754": 58,
        "../internals/internal-state": 62,
        "../internals/object-define-property": 81,
        "../internals/object-get-own-property-names": 83,
        "../internals/object-get-prototype-of": 85,
        "../internals/object-set-prototype-of": 90,
        "../internals/set-to-string-tag": 95,
        "../internals/to-index": 100,
        "../internals/to-integer-or-infinity": 102,
        "../internals/to-length": 103
    }],
    12: [function (e, t, n) {
        "use strict";
        var r = e("../internals/to-object"), i = e("../internals/to-absolute-index"),
            o = e("../internals/length-of-array-like");
        t.exports = function (e) {
            for (var t = r(this), n = o(t), s = arguments.length, a = i(s > 1 ? arguments[1] : void 0, n), l = s > 2 ? arguments[2] : void 0, c = void 0 === l ? n : i(l, n); c > a;) t[a++] = e;
            return t
        }
    }, {"../internals/length-of-array-like": 74, "../internals/to-absolute-index": 99, "../internals/to-object": 104}],
    13: [function (e, t, n) {
        var r = e("../internals/to-indexed-object"), i = e("../internals/to-absolute-index"),
            o = e("../internals/length-of-array-like"), s = function (e) {
                return function (t, n, s) {
                    var a, l = r(t), c = o(l), u = i(s, c);
                    if (e && n != n) {
                        for (; c > u;) if ((a = l[u++]) != a) return !0
                    } else for (; c > u; u++) if ((e || u in l) && l[u] === n) return e || u || 0;
                    return !e && -1
                }
            };
        t.exports = {includes: s(!0), indexOf: s(!1)}
    }, {
        "../internals/length-of-array-like": 74,
        "../internals/to-absolute-index": 99,
        "../internals/to-indexed-object": 101
    }],
    14: [function (e, t, n) {
        var r = e("../internals/function-bind-context"), i = e("../internals/function-uncurry-this"),
            o = e("../internals/indexed-object"), s = e("../internals/to-object"),
            a = e("../internals/length-of-array-like"), l = e("../internals/array-species-create"), c = i([].push),
            u = function (e) {
                var t = 1 == e, n = 2 == e, i = 3 == e, u = 4 == e, d = 6 == e, f = 7 == e, p = 5 == e || d;
                return function (h, y, m, v) {
                    for (var g, b, w = s(h), _ = o(w), x = r(y, m), k = a(_), j = 0, C = v || l, E = t ? C(h, k) : n || f ? C(h, 0) : void 0; k > j; j++) if ((p || j in _) && (b = x(g = _[j], j, w), e)) if (t) E[j] = b; else if (b) switch (e) {
                        case 3:
                            return !0;
                        case 5:
                            return g;
                        case 6:
                            return j;
                        case 2:
                            c(E, g)
                    } else switch (e) {
                        case 4:
                            return !1;
                        case 7:
                            c(E, g)
                    }
                    return d ? -1 : i || u ? u : E
                }
            };
        t.exports = {
            forEach: u(0),
            map: u(1),
            filter: u(2),
            some: u(3),
            every: u(4),
            find: u(5),
            findIndex: u(6),
            filterReject: u(7)
        }
    }, {
        "../internals/array-species-create": 18,
        "../internals/function-bind-context": 44,
        "../internals/function-uncurry-this": 48,
        "../internals/indexed-object": 59,
        "../internals/length-of-array-like": 74,
        "../internals/to-object": 104
    }],
    15: [function (e, t, n) {
        var r = e("../internals/to-absolute-index"), i = e("../internals/length-of-array-like"),
            o = e("../internals/create-property"), s = Array, a = Math.max;
        t.exports = function (e, t, n) {
            for (var l = i(e), c = r(t, l), u = r(void 0 === n ? l : n, l), d = s(a(u - c, 0)), f = 0; c < u; c++, f++) o(d, f, e[c]);
            return d.length = f, d
        }
    }, {
        "../internals/create-property": 27,
        "../internals/length-of-array-like": 74,
        "../internals/to-absolute-index": 99
    }],
    16: [function (e, t, n) {
        var r = e("../internals/array-slice-simple"), i = Math.floor, o = function (e, t) {
            var n = e.length, l = i(n / 2);
            return n < 8 ? s(e, t) : a(e, o(r(e, 0, l), t), o(r(e, l), t), t)
        }, s = function (e, t) {
            for (var n, r, i = e.length, o = 1; o < i;) {
                for (r = o, n = e[o]; r && t(e[r - 1], n) > 0;) e[r] = e[--r];
                r !== o++ && (e[r] = n)
            }
            return e
        }, a = function (e, t, n, r) {
            for (var i = t.length, o = n.length, s = 0, a = 0; s < i || a < o;) e[s + a] = s < i && a < o ? r(t[s], n[a]) <= 0 ? t[s++] : n[a++] : s < i ? t[s++] : n[a++];
            return e
        };
        t.exports = o
    }, {"../internals/array-slice-simple": 15}],
    17: [function (e, t, n) {
        var r = e("../internals/is-array"), i = e("../internals/is-constructor"), o = e("../internals/is-object"),
            s = e("../internals/well-known-symbol")("species"), a = Array;
        t.exports = function (e) {
            var t;
            return r(e) && (t = e.constructor, (i(t) && (t === a || r(t.prototype)) || o(t) && null === (t = t[s])) && (t = void 0)), void 0 === t ? a : t
        }
    }, {
        "../internals/is-array": 64,
        "../internals/is-constructor": 66,
        "../internals/is-object": 69,
        "../internals/well-known-symbol": 117
    }],
    18: [function (e, t, n) {
        var r = e("../internals/array-species-constructor");
        t.exports = function (e, t) {
            return new (r(e))(0 === t ? 0 : t)
        }
    }, {"../internals/array-species-constructor": 17}],
    19: [function (e, t, n) {
        var r = e("../internals/well-known-symbol")("iterator"), i = !1;
        try {
            var o = 0, s = {
                next: function () {
                    return {done: !!o++}
                }, return: function () {
                    i = !0
                }
            };
            s[r] = function () {
                return this
            }, Array.from(s, (function () {
                throw 2
            }))
        } catch (e) {
        }
        t.exports = function (e, t) {
            if (!t && !i) return !1;
            var n = !1;
            try {
                var o = {};
                o[r] = function () {
                    return {
                        next: function () {
                            return {done: n = !0}
                        }
                    }
                }, e(o)
            } catch (e) {
            }
            return n
        }
    }, {"../internals/well-known-symbol": 117}],
    20: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = r({}.toString), o = r("".slice);
        t.exports = function (e) {
            return o(i(e), 8, -1)
        }
    }, {"../internals/function-uncurry-this": 48}],
    21: [function (e, t, n) {
        var r = e("../internals/to-string-tag-support"), i = e("../internals/is-callable"),
            o = e("../internals/classof-raw"), s = e("../internals/well-known-symbol")("toStringTag"), a = Object,
            l = "Arguments" == o(function () {
                return arguments
            }());
        t.exports = r ? o : function (e) {
            var t, n, r;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {
                try {
                    return e[t]
                } catch (e) {
                }
            }(t = a(e), s)) ? n : l ? o(t) : "Object" == (r = o(t)) && i(t.callee) ? "Arguments" : r
        }
    }, {
        "../internals/classof-raw": 20,
        "../internals/is-callable": 65,
        "../internals/to-string-tag-support": 109,
        "../internals/well-known-symbol": 117
    }],
    22: [function (e, t, n) {
        var r = e("../internals/has-own-property"), i = e("../internals/own-keys"),
            o = e("../internals/object-get-own-property-descriptor"), s = e("../internals/object-define-property");
        t.exports = function (e, t, n) {
            for (var a = i(t), l = s.f, c = o.f, u = 0; u < a.length; u++) {
                var d = a[u];
                r(e, d) || n && r(n, d) || l(e, d, c(t, d))
            }
        }
    }, {
        "../internals/has-own-property": 54,
        "../internals/object-define-property": 81,
        "../internals/object-get-own-property-descriptor": 82,
        "../internals/own-keys": 92
    }],
    23: [function (e, t, n) {
        var r = e("../internals/fails");
        t.exports = !r((function () {
            function e() {
            }

            return e.prototype.constructor = null, Object.getPrototypeOf(new e) !== e.prototype
        }))
    }, {"../internals/fails": 43}],
    24: [function (e, t, n) {
        "use strict";
        var r = e("../internals/iterators-core").IteratorPrototype, i = e("../internals/object-create"),
            o = e("../internals/create-property-descriptor"), s = e("../internals/set-to-string-tag"),
            a = e("../internals/iterators"), l = function () {
                return this
            };
        t.exports = function (e, t, n, c) {
            var u = t + " Iterator";
            return e.prototype = i(r, {next: o(+!c, n)}), s(e, u, !1, !0), a[u] = l, e
        }
    }, {
        "../internals/create-property-descriptor": 26,
        "../internals/iterators": 73,
        "../internals/iterators-core": 72,
        "../internals/object-create": 79,
        "../internals/set-to-string-tag": 95
    }],
    25: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/object-define-property"),
            o = e("../internals/create-property-descriptor");
        t.exports = r ? function (e, t, n) {
            return i.f(e, t, o(1, n))
        } : function (e, t, n) {
            return e[t] = n, e
        }
    }, {
        "../internals/create-property-descriptor": 26,
        "../internals/descriptors": 32,
        "../internals/object-define-property": 81
    }],
    26: [function (e, t, n) {
        t.exports = function (e, t) {
            return {enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t}
        }
    }, {}],
    27: [function (e, t, n) {
        "use strict";
        var r = e("../internals/to-property-key"), i = e("../internals/object-define-property"),
            o = e("../internals/create-property-descriptor");
        t.exports = function (e, t, n) {
            var s = r(t);
            s in e ? i.f(e, s, o(0, n)) : e[s] = n
        }
    }, {
        "../internals/create-property-descriptor": 26,
        "../internals/object-define-property": 81,
        "../internals/to-property-key": 108
    }],
    28: [function (e, t, n) {
        var r = e("../internals/is-callable"), i = e("../internals/object-define-property"),
            o = e("../internals/make-built-in"), s = e("../internals/define-global-property");
        t.exports = function (e, t, n, a) {
            a || (a = {});
            var l = a.enumerable, c = void 0 !== a.name ? a.name : t;
            if (r(n) && o(n, c, a), a.global) l ? e[t] = n : s(t, n); else {
                try {
                    a.unsafe ? e[t] && (l = !0) : delete e[t]
                } catch (e) {
                }
                l ? e[t] = n : i.f(e, t, {
                    value: n,
                    enumerable: !1,
                    configurable: !a.nonConfigurable,
                    writable: !a.nonWritable
                })
            }
            return e
        }
    }, {
        "../internals/define-global-property": 30,
        "../internals/is-callable": 65,
        "../internals/make-built-in": 75,
        "../internals/object-define-property": 81
    }],
    29: [function (e, t, n) {
        var r = e("../internals/define-built-in");
        t.exports = function (e, t, n) {
            for (var i in t) r(e, i, t[i], n);
            return e
        }
    }, {"../internals/define-built-in": 28}],
    30: [function (e, t, n) {
        var r = e("../internals/global"), i = Object.defineProperty;
        t.exports = function (e, t) {
            try {
                i(r, e, {value: t, configurable: !0, writable: !0})
            } catch (n) {
                r[e] = t
            }
            return t
        }
    }, {"../internals/global": 53}],
    31: [function (e, t, n) {
        "use strict";
        var r = e("../internals/export"), i = e("../internals/function-call"), o = e("../internals/is-pure"),
            s = e("../internals/function-name"), a = e("../internals/is-callable"),
            l = e("../internals/create-iterator-constructor"), c = e("../internals/object-get-prototype-of"),
            u = e("../internals/object-set-prototype-of"), d = e("../internals/set-to-string-tag"),
            f = e("../internals/create-non-enumerable-property"), p = e("../internals/define-built-in"),
            h = e("../internals/well-known-symbol"), y = e("../internals/iterators"),
            m = e("../internals/iterators-core"), v = s.PROPER, g = s.CONFIGURABLE, b = m.IteratorPrototype,
            w = m.BUGGY_SAFARI_ITERATORS, _ = h("iterator"), x = "keys", k = "values", j = "entries", C = function () {
                return this
            };
        t.exports = function (e, t, n, s, h, m, E) {
            l(n, t, s);
            var S, D, O, P = function (e) {
                    if (e === h && T) return T;
                    if (!w && e in M) return M[e];
                    switch (e) {
                        case x:
                        case k:
                        case j:
                            return function () {
                                return new n(this, e)
                            }
                    }
                    return function () {
                        return new n(this)
                    }
                }, B = t + " Iterator", A = !1, M = e.prototype, I = M[_] || M["@@iterator"] || h && M[h],
                T = !w && I || P(h), L = "Array" == t && M.entries || I;
            if (L && (S = c(L.call(new e))) !== Object.prototype && S.next && (o || c(S) === b || (u ? u(S, b) : a(S[_]) || p(S, _, C)), d(S, B, !0, !0), o && (y[B] = C)), v && h == k && I && I.name !== k && (!o && g ? f(M, "name", k) : (A = !0, T = function () {
                return i(I, this)
            })), h) if (D = {
                values: P(k),
                keys: m ? T : P(x),
                entries: P(j)
            }, E) for (O in D) (w || A || !(O in M)) && p(M, O, D[O]); else r({
                target: t,
                proto: !0,
                forced: w || A
            }, D);
            return o && !E || M[_] === T || p(M, _, T, {name: h}), y[t] = T, D
        }
    }, {
        "../internals/create-iterator-constructor": 24,
        "../internals/create-non-enumerable-property": 25,
        "../internals/define-built-in": 28,
        "../internals/export": 42,
        "../internals/function-call": 46,
        "../internals/function-name": 47,
        "../internals/is-callable": 65,
        "../internals/is-pure": 70,
        "../internals/iterators": 73,
        "../internals/iterators-core": 72,
        "../internals/object-get-prototype-of": 85,
        "../internals/object-set-prototype-of": 90,
        "../internals/set-to-string-tag": 95,
        "../internals/well-known-symbol": 117
    }],
    32: [function (e, t, n) {
        var r = e("../internals/fails");
        t.exports = !r((function () {
            return 7 != Object.defineProperty({}, 1, {
                get: function () {
                    return 7
                }
            })[1]
        }))
    }, {"../internals/fails": 43}],
    33: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/is-object"), o = r.document,
            s = i(o) && i(o.createElement);
        t.exports = function (e) {
            return s ? o.createElement(e) : {}
        }
    }, {"../internals/global": 53, "../internals/is-object": 69}],
    34: [function (e, t, n) {
        t.exports = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0
        }
    }, {}],
    35: [function (e, t, n) {
        var r = e("../internals/document-create-element")("span").classList,
            i = r && r.constructor && r.constructor.prototype;
        t.exports = i === Object.prototype ? void 0 : i
    }, {"../internals/document-create-element": 33}],
    36: [function (e, t, n) {
        var r = e("../internals/engine-user-agent").match(/firefox\/(\d+)/i);
        t.exports = !!r && +r[1]
    }, {"../internals/engine-user-agent": 38}],
    37: [function (e, t, n) {
        var r = e("../internals/engine-user-agent");
        t.exports = /MSIE|Trident/.test(r)
    }, {"../internals/engine-user-agent": 38}],
    38: [function (e, t, n) {
        var r = e("../internals/get-built-in");
        t.exports = r("navigator", "userAgent") || ""
    }, {"../internals/get-built-in": 49}],
    39: [function (e, t, n) {
        var r, i, o = e("../internals/global"), s = e("../internals/engine-user-agent"), a = o.process, l = o.Deno,
            c = a && a.versions || l && l.version, u = c && c.v8;
        u && (i = (r = u.split("."))[0] > 0 && r[0] < 4 ? 1 : +(r[0] + r[1])), !i && s && (!(r = s.match(/Edge\/(\d+)/)) || r[1] >= 74) && (r = s.match(/Chrome\/(\d+)/)) && (i = +r[1]), t.exports = i
    }, {"../internals/engine-user-agent": 38, "../internals/global": 53}],
    40: [function (e, t, n) {
        var r = e("../internals/engine-user-agent").match(/AppleWebKit\/(\d+)\./);
        t.exports = !!r && +r[1]
    }, {"../internals/engine-user-agent": 38}],
    41: [function (e, t, n) {
        t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
    }, {}],
    42: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/object-get-own-property-descriptor").f,
            o = e("../internals/create-non-enumerable-property"), s = e("../internals/define-built-in"),
            a = e("../internals/define-global-property"), l = e("../internals/copy-constructor-properties"),
            c = e("../internals/is-forced");
        t.exports = function (e, t) {
            var n, u, d, f, p, h = e.target, y = e.global, m = e.stat;
            if (n = y ? r : m ? r[h] || a(h, {}) : (r[h] || {}).prototype) for (u in t) {
                if (f = t[u], d = e.dontCallGetSet ? (p = i(n, u)) && p.value : n[u], !c(y ? u : h + (m ? "." : "#") + u, e.forced) && void 0 !== d) {
                    if (typeof f == typeof d) continue;
                    l(f, d)
                }
                (e.sham || d && d.sham) && o(f, "sham", !0), s(n, u, f, e)
            }
        }
    }, {
        "../internals/copy-constructor-properties": 22,
        "../internals/create-non-enumerable-property": 25,
        "../internals/define-built-in": 28,
        "../internals/define-global-property": 30,
        "../internals/global": 53,
        "../internals/is-forced": 67,
        "../internals/object-get-own-property-descriptor": 82
    }],
    43: [function (e, t, n) {
        t.exports = function (e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    }, {}],
    44: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/a-callable"),
            o = e("../internals/function-bind-native"), s = r(r.bind);
        t.exports = function (e, t) {
            return i(e), void 0 === t ? e : o ? s(e, t) : function () {
                return e.apply(t, arguments)
            }
        }
    }, {
        "../internals/a-callable": 3,
        "../internals/function-bind-native": 45,
        "../internals/function-uncurry-this": 48
    }],
    45: [function (e, t, n) {
        var r = e("../internals/fails");
        t.exports = !r((function () {
            var e = function () {
            }.bind();
            return "function" != typeof e || e.hasOwnProperty("prototype")
        }))
    }, {"../internals/fails": 43}],
    46: [function (e, t, n) {
        var r = e("../internals/function-bind-native"), i = Function.prototype.call;
        t.exports = r ? i.bind(i) : function () {
            return i.apply(i, arguments)
        }
    }, {"../internals/function-bind-native": 45}],
    47: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/has-own-property"), o = Function.prototype,
            s = r && Object.getOwnPropertyDescriptor, a = i(o, "name"), l = a && "something" === function () {
            }.name, c = a && (!r || r && s(o, "name").configurable);
        t.exports = {EXISTS: a, PROPER: l, CONFIGURABLE: c}
    }, {"../internals/descriptors": 32, "../internals/has-own-property": 54}],
    48: [function (e, t, n) {
        var r = e("../internals/function-bind-native"), i = Function.prototype, o = i.bind, s = i.call,
            a = r && o.bind(s, s);
        t.exports = r ? function (e) {
            return e && a(e)
        } : function (e) {
            return e && function () {
                return s.apply(e, arguments)
            }
        }
    }, {"../internals/function-bind-native": 45}],
    49: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/is-callable"), o = function (e) {
            return i(e) ? e : void 0
        };
        t.exports = function (e, t) {
            return arguments.length < 2 ? o(r[e]) : r[e] && r[e][t]
        }
    }, {"../internals/global": 53, "../internals/is-callable": 65}],
    50: [function (e, t, n) {
        var r = e("../internals/classof"), i = e("../internals/get-method"), o = e("../internals/iterators"),
            s = e("../internals/well-known-symbol")("iterator");
        t.exports = function (e) {
            if (null != e) return i(e, s) || i(e, "@@iterator") || o[r(e)]
        }
    }, {
        "../internals/classof": 21,
        "../internals/get-method": 52,
        "../internals/iterators": 73,
        "../internals/well-known-symbol": 117
    }],
    51: [function (e, t, n) {
        var r = e("../internals/function-call"), i = e("../internals/a-callable"), o = e("../internals/an-object"),
            s = e("../internals/try-to-string"), a = e("../internals/get-iterator-method"), l = TypeError;
        t.exports = function (e, t) {
            var n = arguments.length < 2 ? a(e) : t;
            if (i(n)) return o(r(n, e));
            throw l(s(e) + " is not iterable")
        }
    }, {
        "../internals/a-callable": 3,
        "../internals/an-object": 8,
        "../internals/function-call": 46,
        "../internals/get-iterator-method": 50,
        "../internals/try-to-string": 110
    }],
    52: [function (e, t, n) {
        var r = e("../internals/a-callable");
        t.exports = function (e, t) {
            var n = e[t];
            return null == n ? void 0 : r(n)
        }
    }, {"../internals/a-callable": 3}],
    53: [function (e, t, n) {
        (function (e) {
            (function () {
                var n = function (e) {
                    return e && e.Math == Math && e
                };
                t.exports = n("object" == typeof globalThis && globalThis) || n("object" == typeof window && window) || n("object" == typeof self && self) || n("object" == typeof e && e) || function () {
                    return this
                }() || Function("return this")()
            }).call(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    54: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/to-object"), o = r({}.hasOwnProperty);
        t.exports = Object.hasOwn || function (e, t) {
            return o(i(e), t)
        }
    }, {"../internals/function-uncurry-this": 48, "../internals/to-object": 104}],
    55: [function (e, t, n) {
        t.exports = {}
    }, {}],
    56: [function (e, t, n) {
        var r = e("../internals/get-built-in");
        t.exports = r("document", "documentElement")
    }, {"../internals/get-built-in": 49}],
    57: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/fails"),
            o = e("../internals/document-create-element");
        t.exports = !r && !i((function () {
            return 7 != Object.defineProperty(o("div"), "a", {
                get: function () {
                    return 7
                }
            }).a
        }))
    }, {"../internals/descriptors": 32, "../internals/document-create-element": 33, "../internals/fails": 43}],
    58: [function (e, t, n) {
        var r = Array, i = Math.abs, o = Math.pow, s = Math.floor, a = Math.log, l = Math.LN2;
        t.exports = {
            pack: function (e, t, n) {
                var c, u, d, f = r(n), p = 8 * n - t - 1, h = (1 << p) - 1, y = h >> 1,
                    m = 23 === t ? o(2, -24) - o(2, -77) : 0, v = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0, g = 0;
                for ((e = i(e)) != e || e === 1 / 0 ? (u = e != e ? 1 : 0, c = h) : (c = s(a(e) / l), e * (d = o(2, -c)) < 1 && (c--, d *= 2), (e += c + y >= 1 ? m / d : m * o(2, 1 - y)) * d >= 2 && (c++, d /= 2), c + y >= h ? (u = 0, c = h) : c + y >= 1 ? (u = (e * d - 1) * o(2, t), c += y) : (u = e * o(2, y - 1) * o(2, t), c = 0)); t >= 8;) f[g++] = 255 & u, u /= 256, t -= 8;
                for (c = c << t | u, p += t; p > 0;) f[g++] = 255 & c, c /= 256, p -= 8;
                return f[--g] |= 128 * v, f
            }, unpack: function (e, t) {
                var n, r = e.length, i = 8 * r - t - 1, s = (1 << i) - 1, a = s >> 1, l = i - 7, c = r - 1, u = e[c--],
                    d = 127 & u;
                for (u >>= 7; l > 0;) d = 256 * d + e[c--], l -= 8;
                for (n = d & (1 << -l) - 1, d >>= -l, l += t; l > 0;) n = 256 * n + e[c--], l -= 8;
                if (0 === d) d = 1 - a; else {
                    if (d === s) return n ? NaN : u ? -1 / 0 : 1 / 0;
                    n += o(2, t), d -= a
                }
                return (u ? -1 : 1) * n * o(2, d - t)
            }
        }
    }, {}],
    59: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/fails"), o = e("../internals/classof-raw"),
            s = Object, a = r("".split);
        t.exports = i((function () {
            return !s("z").propertyIsEnumerable(0)
        })) ? function (e) {
            return "String" == o(e) ? a(e, "") : s(e)
        } : s
    }, {"../internals/classof-raw": 20, "../internals/fails": 43, "../internals/function-uncurry-this": 48}],
    60: [function (e, t, n) {
        var r = e("../internals/is-callable"), i = e("../internals/is-object"),
            o = e("../internals/object-set-prototype-of");
        t.exports = function (e, t, n) {
            var s, a;
            return o && r(s = t.constructor) && s !== n && i(a = s.prototype) && a !== n.prototype && o(e, a), e
        }
    }, {"../internals/is-callable": 65, "../internals/is-object": 69, "../internals/object-set-prototype-of": 90}],
    61: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/is-callable"),
            o = e("../internals/shared-store"), s = r(Function.toString);
        i(o.inspectSource) || (o.inspectSource = function (e) {
            return s(e)
        }), t.exports = o.inspectSource
    }, {"../internals/function-uncurry-this": 48, "../internals/is-callable": 65, "../internals/shared-store": 97}],
    62: [function (e, t, n) {
        var r, i, o, s = e("../internals/native-weak-map"), a = e("../internals/global"),
            l = e("../internals/function-uncurry-this"), c = e("../internals/is-object"),
            u = e("../internals/create-non-enumerable-property"), d = e("../internals/has-own-property"),
            f = e("../internals/shared-store"), p = e("../internals/shared-key"), h = e("../internals/hidden-keys"),
            y = "Object already initialized", m = a.TypeError, v = a.WeakMap;
        if (s || f.state) {
            var g = f.state || (f.state = new v), b = l(g.get), w = l(g.has), _ = l(g.set);
            r = function (e, t) {
                if (w(g, e)) throw new m(y);
                return t.facade = e, _(g, e, t), t
            }, i = function (e) {
                return b(g, e) || {}
            }, o = function (e) {
                return w(g, e)
            }
        } else {
            var x = p("state");
            h[x] = !0, r = function (e, t) {
                if (d(e, x)) throw new m(y);
                return t.facade = e, u(e, x, t), t
            }, i = function (e) {
                return d(e, x) ? e[x] : {}
            }, o = function (e) {
                return d(e, x)
            }
        }
        t.exports = {
            set: r, get: i, has: o, enforce: function (e) {
                return o(e) ? i(e) : r(e, {})
            }, getterFor: function (e) {
                return function (t) {
                    var n;
                    if (!c(t) || (n = i(t)).type !== e) throw m("Incompatible receiver, " + e + " required");
                    return n
                }
            }
        }
    }, {
        "../internals/create-non-enumerable-property": 25,
        "../internals/function-uncurry-this": 48,
        "../internals/global": 53,
        "../internals/has-own-property": 54,
        "../internals/hidden-keys": 55,
        "../internals/is-object": 69,
        "../internals/native-weak-map": 78,
        "../internals/shared-key": 96,
        "../internals/shared-store": 97
    }],
    63: [function (e, t, n) {
        var r = e("../internals/well-known-symbol"), i = e("../internals/iterators"), o = r("iterator"),
            s = Array.prototype;
        t.exports = function (e) {
            return void 0 !== e && (i.Array === e || s[o] === e)
        }
    }, {"../internals/iterators": 73, "../internals/well-known-symbol": 117}],
    64: [function (e, t, n) {
        var r = e("../internals/classof-raw");
        t.exports = Array.isArray || function (e) {
            return "Array" == r(e)
        }
    }, {"../internals/classof-raw": 20}],
    65: [function (e, t, n) {
        t.exports = function (e) {
            return "function" == typeof e
        }
    }, {}],
    66: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/fails"), o = e("../internals/is-callable"),
            s = e("../internals/classof"), a = e("../internals/get-built-in"), l = e("../internals/inspect-source"),
            c = function () {
            }, u = [], d = a("Reflect", "construct"), f = /^\s*(?:class|function)\b/, p = r(f.exec), h = !f.exec(c),
            y = function (e) {
                if (!o(e)) return !1;
                try {
                    return d(c, u, e), !0
                } catch (e) {
                    return !1
                }
            }, m = function (e) {
                if (!o(e)) return !1;
                switch (s(e)) {
                    case"AsyncFunction":
                    case"GeneratorFunction":
                    case"AsyncGeneratorFunction":
                        return !1
                }
                try {
                    return h || !!p(f, l(e))
                } catch (e) {
                    return !0
                }
            };
        m.sham = !0, t.exports = !d || i((function () {
            var e;
            return y(y.call) || !y(Object) || !y((function () {
                e = !0
            })) || e
        })) ? m : y
    }, {
        "../internals/classof": 21,
        "../internals/fails": 43,
        "../internals/function-uncurry-this": 48,
        "../internals/get-built-in": 49,
        "../internals/inspect-source": 61,
        "../internals/is-callable": 65
    }],
    67: [function (e, t, n) {
        var r = e("../internals/fails"), i = e("../internals/is-callable"), o = /#|\.prototype\./, s = function (e, t) {
            var n = l[a(e)];
            return n == u || n != c && (i(t) ? r(t) : !!t)
        }, a = s.normalize = function (e) {
            return String(e).replace(o, ".").toLowerCase()
        }, l = s.data = {}, c = s.NATIVE = "N", u = s.POLYFILL = "P";
        t.exports = s
    }, {"../internals/fails": 43, "../internals/is-callable": 65}],
    68: [function (e, t, n) {
        var r = e("../internals/is-object"), i = Math.floor;
        t.exports = Number.isInteger || function (e) {
            return !r(e) && isFinite(e) && i(e) === e
        }
    }, {"../internals/is-object": 69}],
    69: [function (e, t, n) {
        var r = e("../internals/is-callable");
        t.exports = function (e) {
            return "object" == typeof e ? null !== e : r(e)
        }
    }, {"../internals/is-callable": 65}],
    70: [function (e, t, n) {
        t.exports = !1
    }, {}],
    71: [function (e, t, n) {
        var r = e("../internals/get-built-in"), i = e("../internals/is-callable"),
            o = e("../internals/object-is-prototype-of"), s = e("../internals/use-symbol-as-uid"), a = Object;
        t.exports = s ? function (e) {
            return "symbol" == typeof e
        } : function (e) {
            var t = r("Symbol");
            return i(t) && o(t.prototype, a(e))
        }
    }, {
        "../internals/get-built-in": 49,
        "../internals/is-callable": 65,
        "../internals/object-is-prototype-of": 86,
        "../internals/use-symbol-as-uid": 115
    }],
    72: [function (e, t, n) {
        "use strict";
        var r, i, o, s = e("../internals/fails"), a = e("../internals/is-callable"),
            l = e("../internals/object-create"), c = e("../internals/object-get-prototype-of"),
            u = e("../internals/define-built-in"), d = e("../internals/well-known-symbol"),
            f = e("../internals/is-pure"), p = d("iterator"), h = !1;
        [].keys && ("next" in (o = [].keys()) ? (i = c(c(o))) !== Object.prototype && (r = i) : h = !0), null == r || s((function () {
            var e = {};
            return r[p].call(e) !== e
        })) ? r = {} : f && (r = l(r)), a(r[p]) || u(r, p, (function () {
            return this
        })), t.exports = {IteratorPrototype: r, BUGGY_SAFARI_ITERATORS: h}
    }, {
        "../internals/define-built-in": 28,
        "../internals/fails": 43,
        "../internals/is-callable": 65,
        "../internals/is-pure": 70,
        "../internals/object-create": 79,
        "../internals/object-get-prototype-of": 85,
        "../internals/well-known-symbol": 117
    }],
    73: [function (e, t, n) {
        arguments[4][55][0].apply(n, arguments)
    }, {dup: 55}],
    74: [function (e, t, n) {
        var r = e("../internals/to-length");
        t.exports = function (e) {
            return r(e.length)
        }
    }, {"../internals/to-length": 103}],
    75: [function (e, t, n) {
        var r = e("../internals/fails"), i = e("../internals/is-callable"), o = e("../internals/has-own-property"),
            s = e("../internals/descriptors"), a = e("../internals/function-name").CONFIGURABLE,
            l = e("../internals/inspect-source"), c = e("../internals/internal-state"), u = c.enforce, d = c.get,
            f = Object.defineProperty, p = s && !r((function () {
                return 8 !== f((function () {
                }), "length", {value: 8}).length
            })), h = String(String).split("String"), y = t.exports = function (e, t, n) {
                "Symbol(" === String(t).slice(0, 7) && (t = "[" + String(t).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), n && n.getter && (t = "get " + t), n && n.setter && (t = "set " + t), (!o(e, "name") || a && e.name !== t) && (s ? f(e, "name", {
                    value: t,
                    configurable: !0
                }) : e.name = t), p && n && o(n, "arity") && e.length !== n.arity && f(e, "length", {value: n.arity});
                try {
                    n && o(n, "constructor") && n.constructor ? s && f(e, "prototype", {writable: !1}) : e.prototype && (e.prototype = void 0)
                } catch (e) {
                }
                var r = u(e);
                return o(r, "source") || (r.source = h.join("string" == typeof t ? t : "")), e
            };
        Function.prototype.toString = y((function () {
            return i(this) && d(this).source || l(this)
        }), "toString")
    }, {
        "../internals/descriptors": 32,
        "../internals/fails": 43,
        "../internals/function-name": 47,
        "../internals/has-own-property": 54,
        "../internals/inspect-source": 61,
        "../internals/internal-state": 62,
        "../internals/is-callable": 65
    }],
    76: [function (e, t, n) {
        var r = Math.ceil, i = Math.floor;
        t.exports = Math.trunc || function (e) {
            var t = +e;
            return (t > 0 ? i : r)(t)
        }
    }, {}],
    77: [function (e, t, n) {
        var r = e("../internals/engine-v8-version"), i = e("../internals/fails");
        t.exports = !!Object.getOwnPropertySymbols && !i((function () {
            var e = Symbol();
            return !String(e) || !(Object(e) instanceof Symbol) || !Symbol.sham && r && r < 41
        }))
    }, {"../internals/engine-v8-version": 39, "../internals/fails": 43}],
    78: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/is-callable"), o = e("../internals/inspect-source"),
            s = r.WeakMap;
        t.exports = i(s) && /native code/.test(o(s))
    }, {"../internals/global": 53, "../internals/inspect-source": 61, "../internals/is-callable": 65}],
    79: [function (e, t, n) {
        var r, i = e("../internals/an-object"), o = e("../internals/object-define-properties"),
            s = e("../internals/enum-bug-keys"), a = e("../internals/hidden-keys"), l = e("../internals/html"),
            c = e("../internals/document-create-element"), u = e("../internals/shared-key")("IE_PROTO"),
            d = function () {
            }, f = function (e) {
                return "<script>" + e + "<\/script>"
            }, p = function (e) {
                e.write(f("")), e.close();
                var t = e.parentWindow.Object;
                return e = null, t
            }, h = function () {
                try {
                    r = new ActiveXObject("htmlfile")
                } catch (e) {
                }
                var e, t;
                h = "undefined" != typeof document ? document.domain && r ? p(r) : ((t = c("iframe")).style.display = "none", l.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(f("document.F=Object")), e.close(), e.F) : p(r);
                for (var n = s.length; n--;) delete h.prototype[s[n]];
                return h()
            };
        a[u] = !0, t.exports = Object.create || function (e, t) {
            var n;
            return null !== e ? (d.prototype = i(e), n = new d, d.prototype = null, n[u] = e) : n = h(), void 0 === t ? n : o.f(n, t)
        }
    }, {
        "../internals/an-object": 8,
        "../internals/document-create-element": 33,
        "../internals/enum-bug-keys": 41,
        "../internals/hidden-keys": 55,
        "../internals/html": 56,
        "../internals/object-define-properties": 80,
        "../internals/shared-key": 96
    }],
    80: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/v8-prototype-define-bug"),
            o = e("../internals/object-define-property"), s = e("../internals/an-object"),
            a = e("../internals/to-indexed-object"), l = e("../internals/object-keys");
        n.f = r && !i ? Object.defineProperties : function (e, t) {
            s(e);
            for (var n, r = a(t), i = l(t), c = i.length, u = 0; c > u;) o.f(e, n = i[u++], r[n]);
            return e
        }
    }, {
        "../internals/an-object": 8,
        "../internals/descriptors": 32,
        "../internals/object-define-property": 81,
        "../internals/object-keys": 88,
        "../internals/to-indexed-object": 101,
        "../internals/v8-prototype-define-bug": 116
    }],
    81: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/ie8-dom-define"),
            o = e("../internals/v8-prototype-define-bug"), s = e("../internals/an-object"),
            a = e("../internals/to-property-key"), l = TypeError, c = Object.defineProperty,
            u = Object.getOwnPropertyDescriptor;
        n.f = r ? o ? function (e, t, n) {
            if (s(e), t = a(t), s(n), "function" == typeof e && "prototype" === t && "value" in n && "writable" in n && !n.writable) {
                var r = u(e, t);
                r && r.writable && (e[t] = n.value, n = {
                    configurable: "configurable" in n ? n.configurable : r.configurable,
                    enumerable: "enumerable" in n ? n.enumerable : r.enumerable,
                    writable: !1
                })
            }
            return c(e, t, n)
        } : c : function (e, t, n) {
            if (s(e), t = a(t), s(n), i) try {
                return c(e, t, n)
            } catch (e) {
            }
            if ("get" in n || "set" in n) throw l("Accessors not supported");
            return "value" in n && (e[t] = n.value), e
        }
    }, {
        "../internals/an-object": 8,
        "../internals/descriptors": 32,
        "../internals/ie8-dom-define": 57,
        "../internals/to-property-key": 108,
        "../internals/v8-prototype-define-bug": 116
    }],
    82: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/function-call"),
            o = e("../internals/object-property-is-enumerable"), s = e("../internals/create-property-descriptor"),
            a = e("../internals/to-indexed-object"), l = e("../internals/to-property-key"),
            c = e("../internals/has-own-property"), u = e("../internals/ie8-dom-define"),
            d = Object.getOwnPropertyDescriptor;
        n.f = r ? d : function (e, t) {
            if (e = a(e), t = l(t), u) try {
                return d(e, t)
            } catch (e) {
            }
            if (c(e, t)) return s(!i(o.f, e, t), e[t])
        }
    }, {
        "../internals/create-property-descriptor": 26,
        "../internals/descriptors": 32,
        "../internals/function-call": 46,
        "../internals/has-own-property": 54,
        "../internals/ie8-dom-define": 57,
        "../internals/object-property-is-enumerable": 89,
        "../internals/to-indexed-object": 101,
        "../internals/to-property-key": 108
    }],
    83: [function (e, t, n) {
        var r = e("../internals/object-keys-internal"),
            i = e("../internals/enum-bug-keys").concat("length", "prototype");
        n.f = Object.getOwnPropertyNames || function (e) {
            return r(e, i)
        }
    }, {"../internals/enum-bug-keys": 41, "../internals/object-keys-internal": 87}],
    84: [function (e, t, n) {
        n.f = Object.getOwnPropertySymbols
    }, {}],
    85: [function (e, t, n) {
        var r = e("../internals/has-own-property"), i = e("../internals/is-callable"), o = e("../internals/to-object"),
            s = e("../internals/shared-key"), a = e("../internals/correct-prototype-getter"), l = s("IE_PROTO"),
            c = Object, u = c.prototype;
        t.exports = a ? c.getPrototypeOf : function (e) {
            var t = o(e);
            if (r(t, l)) return t[l];
            var n = t.constructor;
            return i(n) && t instanceof n ? n.prototype : t instanceof c ? u : null
        }
    }, {
        "../internals/correct-prototype-getter": 23,
        "../internals/has-own-property": 54,
        "../internals/is-callable": 65,
        "../internals/shared-key": 96,
        "../internals/to-object": 104
    }],
    86: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this");
        t.exports = r({}.isPrototypeOf)
    }, {"../internals/function-uncurry-this": 48}],
    87: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/has-own-property"),
            o = e("../internals/to-indexed-object"), s = e("../internals/array-includes").indexOf,
            a = e("../internals/hidden-keys"), l = r([].push);
        t.exports = function (e, t) {
            var n, r = o(e), c = 0, u = [];
            for (n in r) !i(a, n) && i(r, n) && l(u, n);
            for (; t.length > c;) i(r, n = t[c++]) && (~s(u, n) || l(u, n));
            return u
        }
    }, {
        "../internals/array-includes": 13,
        "../internals/function-uncurry-this": 48,
        "../internals/has-own-property": 54,
        "../internals/hidden-keys": 55,
        "../internals/to-indexed-object": 101
    }],
    88: [function (e, t, n) {
        var r = e("../internals/object-keys-internal"), i = e("../internals/enum-bug-keys");
        t.exports = Object.keys || function (e) {
            return r(e, i)
        }
    }, {"../internals/enum-bug-keys": 41, "../internals/object-keys-internal": 87}],
    89: [function (e, t, n) {
        "use strict";
        var r = {}.propertyIsEnumerable, i = Object.getOwnPropertyDescriptor, o = i && !r.call({1: 2}, 1);
        n.f = o ? function (e) {
            var t = i(this, e);
            return !!t && t.enumerable
        } : r
    }, {}],
    90: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/an-object"),
            o = e("../internals/a-possible-prototype");
        t.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
            var e, t = !1, n = {};
            try {
                (e = r(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set))(n, []), t = n instanceof Array
            } catch (e) {
            }
            return function (n, r) {
                return i(n), o(r), t ? e(n, r) : n.__proto__ = r, n
            }
        }() : void 0)
    }, {"../internals/a-possible-prototype": 5, "../internals/an-object": 8, "../internals/function-uncurry-this": 48}],
    91: [function (e, t, n) {
        var r = e("../internals/function-call"), i = e("../internals/is-callable"), o = e("../internals/is-object"),
            s = TypeError;
        t.exports = function (e, t) {
            var n, a;
            if ("string" === t && i(n = e.toString) && !o(a = r(n, e))) return a;
            if (i(n = e.valueOf) && !o(a = r(n, e))) return a;
            if ("string" !== t && i(n = e.toString) && !o(a = r(n, e))) return a;
            throw s("Can't convert object to primitive value")
        }
    }, {"../internals/function-call": 46, "../internals/is-callable": 65, "../internals/is-object": 69}],
    92: [function (e, t, n) {
        var r = e("../internals/get-built-in"), i = e("../internals/function-uncurry-this"),
            o = e("../internals/object-get-own-property-names"), s = e("../internals/object-get-own-property-symbols"),
            a = e("../internals/an-object"), l = i([].concat);
        t.exports = r("Reflect", "ownKeys") || function (e) {
            var t = o.f(a(e)), n = s.f;
            return n ? l(t, n(e)) : t
        }
    }, {
        "../internals/an-object": 8,
        "../internals/function-uncurry-this": 48,
        "../internals/get-built-in": 49,
        "../internals/object-get-own-property-names": 83,
        "../internals/object-get-own-property-symbols": 84
    }],
    93: [function (e, t, n) {
        var r = TypeError;
        t.exports = function (e) {
            if (null == e) throw r("Can't call method on " + e);
            return e
        }
    }, {}],
    94: [function (e, t, n) {
        "use strict";
        var r = e("../internals/get-built-in"), i = e("../internals/object-define-property"),
            o = e("../internals/well-known-symbol"), s = e("../internals/descriptors"), a = o("species");
        t.exports = function (e) {
            var t = r(e), n = i.f;
            s && t && !t[a] && n(t, a, {
                configurable: !0, get: function () {
                    return this
                }
            })
        }
    }, {
        "../internals/descriptors": 32,
        "../internals/get-built-in": 49,
        "../internals/object-define-property": 81,
        "../internals/well-known-symbol": 117
    }],
    95: [function (e, t, n) {
        var r = e("../internals/object-define-property").f, i = e("../internals/has-own-property"),
            o = e("../internals/well-known-symbol")("toStringTag");
        t.exports = function (e, t, n) {
            e && !n && (e = e.prototype), e && !i(e, o) && r(e, o, {configurable: !0, value: t})
        }
    }, {
        "../internals/has-own-property": 54,
        "../internals/object-define-property": 81,
        "../internals/well-known-symbol": 117
    }],
    96: [function (e, t, n) {
        var r = e("../internals/shared"), i = e("../internals/uid"), o = r("keys");
        t.exports = function (e) {
            return o[e] || (o[e] = i(e))
        }
    }, {"../internals/shared": 98, "../internals/uid": 114}],
    97: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/define-global-property"), o = "__core-js_shared__",
            s = r[o] || i(o, {});
        t.exports = s
    }, {"../internals/define-global-property": 30, "../internals/global": 53}],
    98: [function (e, t, n) {
        var r = e("../internals/is-pure"), i = e("../internals/shared-store");
        (t.exports = function (e, t) {
            return i[e] || (i[e] = void 0 !== t ? t : {})
        })("versions", []).push({
            version: "3.23.5",
            mode: r ? "pure" : "global",
            copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
            license: "https://github.com/zloirock/core-js/blob/v3.23.5/LICENSE",
            source: "https://github.com/zloirock/core-js"
        })
    }, {"../internals/is-pure": 70, "../internals/shared-store": 97}],
    99: [function (e, t, n) {
        var r = e("../internals/to-integer-or-infinity"), i = Math.max, o = Math.min;
        t.exports = function (e, t) {
            var n = r(e);
            return n < 0 ? i(n + t, 0) : o(n, t)
        }
    }, {"../internals/to-integer-or-infinity": 102}],
    100: [function (e, t, n) {
        var r = e("../internals/to-integer-or-infinity"), i = e("../internals/to-length"), o = RangeError;
        t.exports = function (e) {
            if (void 0 === e) return 0;
            var t = r(e), n = i(t);
            if (t !== n) throw o("Wrong length or index");
            return n
        }
    }, {"../internals/to-integer-or-infinity": 102, "../internals/to-length": 103}],
    101: [function (e, t, n) {
        var r = e("../internals/indexed-object"), i = e("../internals/require-object-coercible");
        t.exports = function (e) {
            return r(i(e))
        }
    }, {"../internals/indexed-object": 59, "../internals/require-object-coercible": 93}],
    102: [function (e, t, n) {
        var r = e("../internals/math-trunc");
        t.exports = function (e) {
            var t = +e;
            return t != t || 0 === t ? 0 : r(t)
        }
    }, {"../internals/math-trunc": 76}],
    103: [function (e, t, n) {
        var r = e("../internals/to-integer-or-infinity"), i = Math.min;
        t.exports = function (e) {
            return e > 0 ? i(r(e), 9007199254740991) : 0
        }
    }, {"../internals/to-integer-or-infinity": 102}],
    104: [function (e, t, n) {
        var r = e("../internals/require-object-coercible"), i = Object;
        t.exports = function (e) {
            return i(r(e))
        }
    }, {"../internals/require-object-coercible": 93}],
    105: [function (e, t, n) {
        var r = e("../internals/to-positive-integer"), i = RangeError;
        t.exports = function (e, t) {
            var n = r(e);
            if (n % t) throw i("Wrong offset");
            return n
        }
    }, {"../internals/to-positive-integer": 106}],
    106: [function (e, t, n) {
        var r = e("../internals/to-integer-or-infinity"), i = RangeError;
        t.exports = function (e) {
            var t = r(e);
            if (t < 0) throw i("The argument can't be less than 0");
            return t
        }
    }, {"../internals/to-integer-or-infinity": 102}],
    107: [function (e, t, n) {
        var r = e("../internals/function-call"), i = e("../internals/is-object"), o = e("../internals/is-symbol"),
            s = e("../internals/get-method"), a = e("../internals/ordinary-to-primitive"),
            l = e("../internals/well-known-symbol"), c = TypeError, u = l("toPrimitive");
        t.exports = function (e, t) {
            if (!i(e) || o(e)) return e;
            var n, l = s(e, u);
            if (l) {
                if (void 0 === t && (t = "default"), n = r(l, e, t), !i(n) || o(n)) return n;
                throw c("Can't convert object to primitive value")
            }
            return void 0 === t && (t = "number"), a(e, t)
        }
    }, {
        "../internals/function-call": 46,
        "../internals/get-method": 52,
        "../internals/is-object": 69,
        "../internals/is-symbol": 71,
        "../internals/ordinary-to-primitive": 91,
        "../internals/well-known-symbol": 117
    }],
    108: [function (e, t, n) {
        var r = e("../internals/to-primitive"), i = e("../internals/is-symbol");
        t.exports = function (e) {
            var t = r(e, "string");
            return i(t) ? t : t + ""
        }
    }, {"../internals/is-symbol": 71, "../internals/to-primitive": 107}],
    109: [function (e, t, n) {
        var r = {};
        r[e("../internals/well-known-symbol")("toStringTag")] = "z", t.exports = "[object z]" === String(r)
    }, {"../internals/well-known-symbol": 117}],
    110: [function (e, t, n) {
        var r = String;
        t.exports = function (e) {
            try {
                return r(e)
            } catch (e) {
                return "Object"
            }
        }
    }, {}],
    111: [function (e, t, n) {
        "use strict";
        var r = e("../internals/export"), i = e("../internals/global"), o = e("../internals/function-call"),
            s = e("../internals/descriptors"), a = e("../internals/typed-array-constructors-require-wrappers"),
            l = e("../internals/array-buffer-view-core"), c = e("../internals/array-buffer"),
            u = e("../internals/an-instance"), d = e("../internals/create-property-descriptor"),
            f = e("../internals/create-non-enumerable-property"), p = e("../internals/is-integral-number"),
            h = e("../internals/to-length"), y = e("../internals/to-index"), m = e("../internals/to-offset"),
            v = e("../internals/to-property-key"), g = e("../internals/has-own-property"),
            b = e("../internals/classof"), w = e("../internals/is-object"), _ = e("../internals/is-symbol"),
            x = e("../internals/object-create"), k = e("../internals/object-is-prototype-of"),
            j = e("../internals/object-set-prototype-of"), C = e("../internals/object-get-own-property-names").f,
            E = e("../internals/typed-array-from"), S = e("../internals/array-iteration").forEach,
            D = e("../internals/set-species"), O = e("../internals/object-define-property"),
            P = e("../internals/object-get-own-property-descriptor"), B = e("../internals/internal-state"),
            A = e("../internals/inherit-if-required"), M = B.get, I = B.set, T = B.enforce, L = O.f, K = P.f,
            R = Math.round, N = i.RangeError, F = c.ArrayBuffer, z = F.prototype, U = c.DataView,
            H = l.NATIVE_ARRAY_BUFFER_VIEWS, V = l.TYPED_ARRAY_TAG, W = l.TypedArray, q = l.TypedArrayPrototype,
            G = l.aTypedArrayConstructor, Y = l.isTypedArray, X = "BYTES_PER_ELEMENT", $ = "Wrong length",
            J = function (e, t) {
                G(e);
                for (var n = 0, r = t.length, i = new e(r); r > n;) i[n] = t[n++];
                return i
            }, Q = function (e, t) {
                L(e, t, {
                    get: function () {
                        return M(this)[t]
                    }
                })
            }, Z = function (e) {
                var t;
                return k(z, e) || "ArrayBuffer" == (t = b(e)) || "SharedArrayBuffer" == t
            }, ee = function (e, t) {
                return Y(e) && !_(t) && t in e && p(+t) && t >= 0
            }, te = function (e, t) {
                return t = v(t), ee(e, t) ? d(2, e[t]) : K(e, t)
            }, ne = function (e, t, n) {
                return t = v(t), !(ee(e, t) && w(n) && g(n, "value")) || g(n, "get") || g(n, "set") || n.configurable || g(n, "writable") && !n.writable || g(n, "enumerable") && !n.enumerable ? L(e, t, n) : (e[t] = n.value, e)
            };
        s ? (H || (P.f = te, O.f = ne, Q(q, "buffer"), Q(q, "byteOffset"), Q(q, "byteLength"), Q(q, "length")), r({
            target: "Object",
            stat: !0,
            forced: !H
        }, {getOwnPropertyDescriptor: te, defineProperty: ne}), t.exports = function (e, t, n) {
            var s = e.match(/\d+$/)[0] / 8, l = e + (n ? "Clamped" : "") + "Array", c = "get" + e, d = "set" + e,
                p = i[l], v = p, g = v && v.prototype, b = {}, _ = function (e, t) {
                    L(e, t, {
                        get: function () {
                            return function (e, t) {
                                var n = M(e);
                                return n.view[c](t * s + n.byteOffset, !0)
                            }(this, t)
                        }, set: function (e) {
                            return function (e, t, r) {
                                var i = M(e);
                                n && (r = (r = R(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r), i.view[d](t * s + i.byteOffset, r, !0)
                            }(this, t, e)
                        }, enumerable: !0
                    })
                };
            H ? a && (v = t((function (e, t, n, r) {
                return u(e, g), A(w(t) ? Z(t) ? void 0 !== r ? new p(t, m(n, s), r) : void 0 !== n ? new p(t, m(n, s)) : new p(t) : Y(t) ? J(v, t) : o(E, v, t) : new p(y(t)), e, v)
            })), j && j(v, W), S(C(p), (function (e) {
                e in v || f(v, e, p[e])
            })), v.prototype = g) : (v = t((function (e, t, n, r) {
                u(e, g);
                var i, a, l, c = 0, d = 0;
                if (w(t)) {
                    if (!Z(t)) return Y(t) ? J(v, t) : o(E, v, t);
                    i = t, d = m(n, s);
                    var f = t.byteLength;
                    if (void 0 === r) {
                        if (f % s) throw N($);
                        if ((a = f - d) < 0) throw N($)
                    } else if ((a = h(r) * s) + d > f) throw N($);
                    l = a / s
                } else l = y(t), i = new F(a = l * s);
                for (I(e, {buffer: i, byteOffset: d, byteLength: a, length: l, view: new U(i)}); c < l;) _(e, c++)
            })), j && j(v, W), g = v.prototype = x(q)), g.constructor !== v && f(g, "constructor", v), T(g).TypedArrayConstructor = v, V && f(g, V, l);
            var k = v != p;
            b[l] = v, r({
                global: !0,
                constructor: !0,
                forced: k,
                sham: !H
            }, b), X in v || f(v, X, s), X in g || f(g, X, s), D(l)
        }) : t.exports = function () {
        }
    }, {
        "../internals/an-instance": 7,
        "../internals/array-buffer": 11,
        "../internals/array-buffer-view-core": 10,
        "../internals/array-iteration": 14,
        "../internals/classof": 21,
        "../internals/create-non-enumerable-property": 25,
        "../internals/create-property-descriptor": 26,
        "../internals/descriptors": 32,
        "../internals/export": 42,
        "../internals/function-call": 46,
        "../internals/global": 53,
        "../internals/has-own-property": 54,
        "../internals/inherit-if-required": 60,
        "../internals/internal-state": 62,
        "../internals/is-integral-number": 68,
        "../internals/is-object": 69,
        "../internals/is-symbol": 71,
        "../internals/object-create": 79,
        "../internals/object-define-property": 81,
        "../internals/object-get-own-property-descriptor": 82,
        "../internals/object-get-own-property-names": 83,
        "../internals/object-is-prototype-of": 86,
        "../internals/object-set-prototype-of": 90,
        "../internals/set-species": 94,
        "../internals/to-index": 100,
        "../internals/to-length": 103,
        "../internals/to-offset": 105,
        "../internals/to-property-key": 108,
        "../internals/typed-array-constructors-require-wrappers": 112,
        "../internals/typed-array-from": 113
    }],
    112: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/fails"),
            o = e("../internals/check-correctness-of-iteration"),
            s = e("../internals/array-buffer-view-core").NATIVE_ARRAY_BUFFER_VIEWS, a = r.ArrayBuffer, l = r.Int8Array;
        t.exports = !s || !i((function () {
            l(1)
        })) || !i((function () {
            new l(-1)
        })) || !o((function (e) {
            new l, new l(null), new l(1.5), new l(e)
        }), !0) || i((function () {
            return 1 !== new l(new a(2), 1, void 0).length
        }))
    }, {
        "../internals/array-buffer-view-core": 10,
        "../internals/check-correctness-of-iteration": 19,
        "../internals/fails": 43,
        "../internals/global": 53
    }],
    113: [function (e, t, n) {
        var r = e("../internals/function-bind-context"), i = e("../internals/function-call"),
            o = e("../internals/a-constructor"), s = e("../internals/to-object"),
            a = e("../internals/length-of-array-like"), l = e("../internals/get-iterator"),
            c = e("../internals/get-iterator-method"), u = e("../internals/is-array-iterator-method"),
            d = e("../internals/array-buffer-view-core").aTypedArrayConstructor;
        t.exports = function (e) {
            var t, n, f, p, h, y, m = o(this), v = s(e), g = arguments.length, b = g > 1 ? arguments[1] : void 0,
                w = void 0 !== b, _ = c(v);
            if (_ && !u(_)) for (y = (h = l(v, _)).next, v = []; !(p = i(y, h)).done;) v.push(p.value);
            for (w && g > 2 && (b = r(b, arguments[2])), n = a(v), f = new (d(m))(n), t = 0; n > t; t++) f[t] = w ? b(v[t], t) : v[t];
            return f
        }
    }, {
        "../internals/a-constructor": 4,
        "../internals/array-buffer-view-core": 10,
        "../internals/function-bind-context": 44,
        "../internals/function-call": 46,
        "../internals/get-iterator": 51,
        "../internals/get-iterator-method": 50,
        "../internals/is-array-iterator-method": 63,
        "../internals/length-of-array-like": 74,
        "../internals/to-object": 104
    }],
    114: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = 0, o = Math.random(), s = r(1..toString);
        t.exports = function (e) {
            return "Symbol(" + (void 0 === e ? "" : e) + ")_" + s(++i + o, 36)
        }
    }, {"../internals/function-uncurry-this": 48}],
    115: [function (e, t, n) {
        var r = e("../internals/native-symbol");
        t.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator
    }, {"../internals/native-symbol": 77}],
    116: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/fails");
        t.exports = r && i((function () {
            return 42 != Object.defineProperty((function () {
            }), "prototype", {value: 42, writable: !1}).prototype
        }))
    }, {"../internals/descriptors": 32, "../internals/fails": 43}],
    117: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/shared"), o = e("../internals/has-own-property"),
            s = e("../internals/uid"), a = e("../internals/native-symbol"), l = e("../internals/use-symbol-as-uid"),
            c = i("wks"), u = r.Symbol, d = u && u.for, f = l ? u : u && u.withoutSetter || s;
        t.exports = function (e) {
            if (!o(c, e) || !a && "string" != typeof c[e]) {
                var t = "Symbol." + e;
                a && o(u, e) ? c[e] = u[e] : c[e] = l && d ? d(t) : f(t)
            }
            return c[e]
        }
    }, {
        "../internals/global": 53,
        "../internals/has-own-property": 54,
        "../internals/native-symbol": 77,
        "../internals/shared": 98,
        "../internals/uid": 114,
        "../internals/use-symbol-as-uid": 115
    }],
    118: [function (e, t, n) {
        "use strict";
        var r = e("../internals/to-indexed-object"), i = e("../internals/add-to-unscopables"),
            o = e("../internals/iterators"), s = e("../internals/internal-state"),
            a = e("../internals/object-define-property").f, l = e("../internals/define-iterator"),
            c = e("../internals/is-pure"), u = e("../internals/descriptors"), d = "Array Iterator", f = s.set,
            p = s.getterFor(d);
        t.exports = l(Array, "Array", (function (e, t) {
            f(this, {type: d, target: r(e), index: 0, kind: t})
        }), (function () {
            var e = p(this), t = e.target, n = e.kind, r = e.index++;
            return !t || r >= t.length ? (e.target = void 0, {value: void 0, done: !0}) : "keys" == n ? {
                value: r,
                done: !1
            } : "values" == n ? {value: t[r], done: !1} : {value: [r, t[r]], done: !1}
        }), "values");
        var h = o.Arguments = o.Array;
        if (i("keys"), i("values"), i("entries"), !c && u && "values" !== h.name) try {
            a(h, "name", {value: "values"})
        } catch (e) {
        }
    }, {
        "../internals/add-to-unscopables": 6,
        "../internals/define-iterator": 31,
        "../internals/descriptors": 32,
        "../internals/internal-state": 62,
        "../internals/is-pure": 70,
        "../internals/iterators": 73,
        "../internals/object-define-property": 81,
        "../internals/to-indexed-object": 101
    }],
    119: [function (e, t, n) {
        e("../internals/typed-array-constructor")("Float32", (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }))
    }, {"../internals/typed-array-constructor": 111}],
    120: [function (e, t, n) {
        "use strict";
        var r = e("../internals/global"), i = e("../internals/function-call"),
            o = e("../internals/array-buffer-view-core"), s = e("../internals/length-of-array-like"),
            a = e("../internals/to-offset"), l = e("../internals/to-object"), c = e("../internals/fails"),
            u = r.RangeError, d = r.Int8Array, f = d && d.prototype, p = f && f.set, h = o.aTypedArray,
            y = o.exportTypedArrayMethod, m = !c((function () {
                var e = new Uint8ClampedArray(2);
                return i(p, e, {length: 1, 0: 3}, 1), 3 !== e[1]
            })), v = m && o.NATIVE_ARRAY_BUFFER_VIEWS && c((function () {
                var e = new d(2);
                return e.set(1), e.set("2", 1), 0 !== e[0] || 2 !== e[1]
            }));
        y("set", (function (e) {
            h(this);
            var t = a(arguments.length > 1 ? arguments[1] : void 0, 1), n = l(e);
            if (m) return i(p, this, n, t);
            var r = this.length, o = s(n), c = 0;
            if (o + t > r) throw u("Wrong length");
            for (; c < o;) this[t + c] = n[c++]
        }), !m || v)
    }, {
        "../internals/array-buffer-view-core": 10,
        "../internals/fails": 43,
        "../internals/function-call": 46,
        "../internals/global": 53,
        "../internals/length-of-array-like": 74,
        "../internals/to-object": 104,
        "../internals/to-offset": 105
    }],
    121: [function (e, t, n) {
        "use strict";
        var r = e("../internals/global"), i = e("../internals/function-uncurry-this"), o = e("../internals/fails"),
            s = e("../internals/a-callable"), a = e("../internals/array-sort"),
            l = e("../internals/array-buffer-view-core"), c = e("../internals/engine-ff-version"),
            u = e("../internals/engine-is-ie-or-edge"), d = e("../internals/engine-v8-version"),
            f = e("../internals/engine-webkit-version"), p = l.aTypedArray, h = l.exportTypedArrayMethod,
            y = r.Uint16Array, m = y && i(y.prototype.sort), v = !(!m || o((function () {
                m(new y(2), null)
            })) && o((function () {
                m(new y(2), {})
            }))), g = !!m && !o((function () {
                if (d) return d < 74;
                if (c) return c < 67;
                if (u) return !0;
                if (f) return f < 602;
                var e, t, n = new y(516), r = Array(516);
                for (e = 0; e < 516; e++) t = e % 4, n[e] = 515 - e, r[e] = e - 2 * t + 3;
                for (m(n, (function (e, t) {
                    return (e / 4 | 0) - (t / 4 | 0)
                })), e = 0; e < 516; e++) if (n[e] !== r[e]) return !0
            }));
        h("sort", (function (e) {
            return void 0 !== e && s(e), g ? m(this, e) : a(p(this), function (e) {
                return function (t, n) {
                    return void 0 !== e ? +e(t, n) || 0 : n != n ? -1 : t != t ? 1 : 0 === t && 0 === n ? 1 / t > 0 && 1 / n < 0 ? 1 : -1 : t > n
                }
            }(e))
        }), !g || v)
    }, {
        "../internals/a-callable": 3,
        "../internals/array-buffer-view-core": 10,
        "../internals/array-sort": 16,
        "../internals/engine-ff-version": 36,
        "../internals/engine-is-ie-or-edge": 37,
        "../internals/engine-v8-version": 39,
        "../internals/engine-webkit-version": 40,
        "../internals/fails": 43,
        "../internals/function-uncurry-this": 48,
        "../internals/global": 53
    }],
    122: [function (e, t, n) {
        e("../internals/typed-array-constructor")("Uint8", (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }))
    }, {"../internals/typed-array-constructor": 111}],
    123: [function (e, t, n) {
        e("../internals/typed-array-constructor")("Uint8", (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }), !0)
    }, {"../internals/typed-array-constructor": 111}],
    124: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/dom-iterables"),
            o = e("../internals/dom-token-list-prototype"), s = e("../modules/es.array.iterator"),
            a = e("../internals/create-non-enumerable-property"), l = e("../internals/well-known-symbol"),
            c = l("iterator"), u = l("toStringTag"), d = s.values, f = function (e, t) {
                if (e) {
                    if (e[c] !== d) try {
                        a(e, c, d)
                    } catch (t) {
                        e[c] = d
                    }
                    if (e[u] || a(e, u, t), i[t]) for (var n in s) if (e[n] !== s[n]) try {
                        a(e, n, s[n])
                    } catch (t) {
                        e[n] = s[n]
                    }
                }
            };
        for (var p in i) f(r[p] && r[p].prototype, p);
        f(o, "DOMTokenList")
    }, {
        "../internals/create-non-enumerable-property": 25,
        "../internals/dom-iterables": 34,
        "../internals/dom-token-list-prototype": 35,
        "../internals/global": 53,
        "../internals/well-known-symbol": 117,
        "../modules/es.array.iterator": 118
    }],
    125: [function (e, t, n) {
        "use strict";
        var r = t.exports = {};
        r.isIE = function (e) {
            return !(-1 === (t = navigator.userAgent.toLowerCase()).indexOf("msie") && -1 === t.indexOf("trident") && -1 === t.indexOf(" edge/") || e && e !== function () {
                var e = 3, t = document.createElement("div"), n = t.getElementsByTagName("i");
                do {
                    t.innerHTML = "\x3c!--[if gt IE " + ++e + "]><i></i><![endif]--\x3e"
                } while (n[0]);
                return e > 4 ? e : void 0
            }());
            var t
        }, r.isLegacyOpera = function () {
            return !!window.opera
        }
    }, {}],
    126: [function (e, t, n) {
        "use strict";
        (t.exports = {}).forEach = function (e, t) {
            for (var n = 0; n < e.length; n++) {
                var r = t(e[n]);
                if (r) return r
            }
        }
    }, {}],
    127: [function (e, t, n) {
        "use strict";
        var r = e("../browser-detector");
        t.exports = function (e) {
            var t = (e = e || {}).reporter, n = e.batchProcessor, i = e.stateHandler.getState;
            if (!t) throw new Error("Missing required dependency: reporter.");

            function o(t) {
                var n = e.important ? " !important; " : "; ";
                return (t.join(n) + n).trim()
            }

            function s(e) {
                return i(e).object
            }

            return {
                makeDetectable: function (e, s, a) {
                    a || (a = s, s = e, e = null), (e = e || {}).debug, r.isIE(8) ? a(s) : function (s, a) {
                        var l = o(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]),
                            c = !1, u = window.getComputedStyle(s), d = s.offsetWidth, f = s.offsetHeight;

                        function p() {
                            function n() {
                                if ("static" === u.position) {
                                    s.style.setProperty("position", "relative", e.important ? "important" : "");
                                    var n = function (t, n, r, i) {
                                        var o = r[i];
                                        "auto" !== o && "0" !== function (e) {
                                            return e.replace(/[^-\d\.]/g, "")
                                        }(o) && (t.warn("An element that is positioned static has style." + i + "=" + o + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + i + " will be set to 0. Element: ", n), n.style.setProperty(i, "0", e.important ? "important" : ""))
                                    };
                                    n(t, s, u, "top"), n(t, s, u, "right"), n(t, s, u, "bottom"), n(t, s, u, "left")
                                }
                            }

                            "" !== u.position && (n(), c = !0);
                            var o = document.createElement("object");
                            o.style.cssText = l, o.tabIndex = -1, o.type = "text/html", o.setAttribute("aria-hidden", "true"), o.onload = function () {
                                c || n(), function e(t, n) {
                                    if (!t.contentDocument) {
                                        var r = i(t);
                                        return r.checkForObjectDocumentTimeoutId && window.clearTimeout(r.checkForObjectDocumentTimeoutId), void (r.checkForObjectDocumentTimeoutId = setTimeout((function () {
                                            r.checkForObjectDocumentTimeoutId = 0, e(t, n)
                                        }), 100))
                                    }
                                    n(t.contentDocument)
                                }(this, (function (e) {
                                    a(s)
                                }))
                            }, r.isIE() || (o.data = "about:blank"), i(s) && (s.appendChild(o), i(s).object = o, r.isIE() && (o.data = "about:blank"))
                        }

                        i(s).startSize = {width: d, height: f}, n ? n.add(p) : p()
                    }(s, a)
                }, addListener: function (e, t) {
                    function n() {
                        t(e)
                    }

                    if (r.isIE(8)) i(e).object = {proxy: n}, e.attachEvent("onresize", n); else {
                        var o = s(e);
                        if (!o) throw new Error("Element is not detectable by this strategy.");
                        o.contentDocument.defaultView.addEventListener("resize", n)
                    }
                }, uninstall: function (e) {
                    if (i(e)) {
                        var t = s(e);
                        t && (r.isIE(8) ? e.detachEvent("onresize", t.proxy) : e.removeChild(t), i(e).checkForObjectDocumentTimeoutId && window.clearTimeout(i(e).checkForObjectDocumentTimeoutId), delete i(e).object)
                    }
                }
            }
        }
    }, {"../browser-detector": 125}],
    128: [function (e, t, n) {
        "use strict";
        var r = e("../collection-utils").forEach;
        t.exports = function (e) {
            var t = (e = e || {}).reporter, n = e.batchProcessor, i = e.stateHandler.getState,
                o = (e.stateHandler.hasState, e.idHandler);
            if (!n) throw new Error("Missing required dependency: batchProcessor");
            if (!t) throw new Error("Missing required dependency: reporter.");
            var s = function () {
                var e = document.createElement("div");
                e.style.cssText = c(["position: absolute", "width: 1000px", "height: 1000px", "visibility: hidden", "margin: 0", "padding: 0"]);
                var t = document.createElement("div");
                t.style.cssText = c(["position: absolute", "width: 500px", "height: 500px", "overflow: scroll", "visibility: none", "top: -1500px", "left: -1500px", "visibility: hidden", "margin: 0", "padding: 0"]), t.appendChild(e), document.body.insertBefore(t, document.body.firstChild);
                var n = 500 - t.clientWidth, r = 500 - t.clientHeight;
                return document.body.removeChild(t), {width: n, height: r}
            }(), a = "erd_scroll_detection_container";

            function l(e) {
                !function (e, t, n) {
                    if (!e.getElementById(t)) {
                        var r = n + "_animation", i = "/* Created by the element-resize-detector library. */\n";
                        i += "." + n + " > div::-webkit-scrollbar { " + c(["display: none"]) + " }\n\n", i += ".erd_scroll_detection_container_animation_active { " + c(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + r, "animation-name: " + r]) + " }\n", i += "@-webkit-keyframes " + r + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n", function (n, r) {
                            r = r || function (t) {
                                e.head.appendChild(t)
                            };
                            var i = e.createElement("style");
                            i.innerHTML = n, i.id = t, r(i)
                        }(i += "@keyframes " + r + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }")
                    }
                }(e, "erd_scroll_detection_scrollbar_style", a)
            }

            function c(t) {
                var n = e.important ? " !important; " : "; ";
                return (t.join(n) + n).trim()
            }

            function u(e, n, r) {
                if (e.addEventListener) e.addEventListener(n, r); else {
                    if (!e.attachEvent) return t.error("[scroll] Don't know how to add event listeners.");
                    e.attachEvent("on" + n, r)
                }
            }

            function d(e, n, r) {
                if (e.removeEventListener) e.removeEventListener(n, r); else {
                    if (!e.detachEvent) return t.error("[scroll] Don't know how to remove event listeners.");
                    e.detachEvent("on" + n, r)
                }
            }

            function f(e) {
                return i(e).container.childNodes[0].childNodes[0].childNodes[0]
            }

            function p(e) {
                return i(e).container.childNodes[0].childNodes[0].childNodes[1]
            }

            return l(window.document), {
                makeDetectable: function (e, l, d) {
                    function h() {
                        if (e.debug) {
                            var n = Array.prototype.slice.call(arguments);
                            if (n.unshift(o.get(l), "Scroll: "), t.log.apply) t.log.apply(null, n); else for (var r = 0; r < n.length; r++) t.log(n[r])
                        }
                    }

                    function y(e) {
                        var t = i(e).container.childNodes[0], n = window.getComputedStyle(t);
                        return !n.width || -1 === n.width.indexOf("px")
                    }

                    function m() {
                        var e = window.getComputedStyle(l), t = {};
                        return t.position = e.position, t.width = l.offsetWidth, t.height = l.offsetHeight, t.top = e.top, t.right = e.right, t.bottom = e.bottom, t.left = e.left, t.widthCSS = e.width, t.heightCSS = e.height, t
                    }

                    function v() {
                        if (h("storeStyle invoked."), i(l)) {
                            var e = m();
                            i(l).style = e
                        } else h("Aborting because element has been uninstalled")
                    }

                    function g(e, t, n) {
                        i(e).lastWidth = t, i(e).lastHeight = n
                    }

                    function b() {
                        return 2 * s.width + 1
                    }

                    function w() {
                        return 2 * s.height + 1
                    }

                    function _(e) {
                        return e + 10 + b()
                    }

                    function x(e) {
                        return e + 10 + w()
                    }

                    function k(e, t, n) {
                        var r = f(e), i = p(e), o = _(t), s = x(n), a = function (e) {
                            return 2 * e + b()
                        }(t), l = function (e) {
                            return 2 * e + w()
                        }(n);
                        r.scrollLeft = o, r.scrollTop = s, i.scrollLeft = a, i.scrollTop = l
                    }

                    function j() {
                        var e = i(l).container;
                        if (!e) {
                            (e = document.createElement("div")).className = a, e.style.cssText = c(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]), i(l).container = e, function (e) {
                                e.className += " " + a + "_animation_active"
                            }(e), l.appendChild(e);
                            var t = function () {
                                i(l).onRendered && i(l).onRendered()
                            };
                            u(e, "animationstart", t), i(l).onAnimationStart = t
                        }
                        return e
                    }

                    function C() {
                        if (h("Injecting elements"), i(l)) {
                            !function () {
                                var n = i(l).style;
                                if ("static" === n.position) {
                                    l.style.setProperty("position", "relative", e.important ? "important" : "");
                                    var r = function (e, t, n, r) {
                                        var i = n[r];
                                        "auto" !== i && "0" !== function (e) {
                                            return e.replace(/[^-\d\.]/g, "")
                                        }(i) && (e.warn("An element that is positioned static has style." + r + "=" + i + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + r + " will be set to 0. Element: ", t), t.style[r] = 0)
                                    };
                                    r(t, l, n, "top"), r(t, l, n, "right"), r(t, l, n, "bottom"), r(t, l, n, "left")
                                }
                            }();
                            var n = i(l).container;
                            n || (n = j());
                            var r, o, d, f, p = s.width, y = s.height,
                                m = c(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]),
                                v = c(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(["left: " + (r = (r = -(1 + p)) ? r + "px" : "0"), "top: " + (o = (o = -(1 + y)) ? o + "px" : "0"), "right: " + (f = (f = -p) ? f + "px" : "0"), "bottom: " + (d = (d = -y) ? d + "px" : "0")])),
                                g = c(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]),
                                b = c(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]),
                                w = c(["position: absolute", "left: 0", "top: 0"]),
                                _ = c(["position: absolute", "width: 200%", "height: 200%"]),
                                x = document.createElement("div"), k = document.createElement("div"),
                                C = document.createElement("div"), E = document.createElement("div"),
                                S = document.createElement("div"), D = document.createElement("div");
                            x.dir = "ltr", x.style.cssText = m, x.className = a, k.className = a, k.style.cssText = v, C.style.cssText = g, E.style.cssText = w, S.style.cssText = b, D.style.cssText = _, C.appendChild(E), S.appendChild(D), k.appendChild(C), k.appendChild(S), x.appendChild(k), n.appendChild(x), u(C, "scroll", O), u(S, "scroll", P), i(l).onExpandScroll = O, i(l).onShrinkScroll = P
                        } else h("Aborting because element has been uninstalled");

                        function O() {
                            var e = i(l);
                            e && e.onExpand ? e.onExpand() : h("Aborting expand scroll handler: element has been uninstalled")
                        }

                        function P() {
                            var e = i(l);
                            e && e.onShrink ? e.onShrink() : h("Aborting shrink scroll handler: element has been uninstalled")
                        }
                    }

                    function E() {
                        function s(t, n, r) {
                            var i = function (e) {
                                return f(e).childNodes[0]
                            }(t), o = _(n), s = x(r);
                            i.style.setProperty("width", o + "px", e.important ? "important" : ""), i.style.setProperty("height", s + "px", e.important ? "important" : "")
                        }

                        function a(r) {
                            var a = l.offsetWidth, u = l.offsetHeight,
                                d = a !== i(l).lastWidth || u !== i(l).lastHeight;
                            h("Storing current size", a, u), g(l, a, u), n.add(0, (function () {
                                if (d) if (i(l)) if (c()) {
                                    if (e.debug) {
                                        var n = l.offsetWidth, r = l.offsetHeight;
                                        n === a && r === u || t.warn(o.get(l), "Scroll: Size changed before updating detector elements.")
                                    }
                                    s(l, a, u)
                                } else h("Aborting because element container has not been initialized"); else h("Aborting because element has been uninstalled")
                            })), n.add(1, (function () {
                                i(l) ? c() ? k(l, a, u) : h("Aborting because element container has not been initialized") : h("Aborting because element has been uninstalled")
                            })), d && r && n.add(2, (function () {
                                i(l) ? c() ? r() : h("Aborting because element container has not been initialized") : h("Aborting because element has been uninstalled")
                            }))
                        }

                        function c() {
                            return !!i(l).container
                        }

                        function u() {
                            h("notifyListenersIfNeeded invoked");
                            var e = i(l);
                            return void 0 === i(l).lastNotifiedWidth && e.lastWidth === e.startSize.width && e.lastHeight === e.startSize.height ? h("Not notifying: Size is the same as the start size, and there has been no notification yet.") : e.lastWidth === e.lastNotifiedWidth && e.lastHeight === e.lastNotifiedHeight ? h("Not notifying: Size already notified") : (h("Current size not notified, notifying..."), e.lastNotifiedWidth = e.lastWidth, e.lastNotifiedHeight = e.lastHeight, void r(i(l).listeners, (function (e) {
                                e(l)
                            })))
                        }

                        function d() {
                            h("Scroll detected."), y(l) ? h("Scroll event fired while unrendered. Ignoring...") : a(u)
                        }

                        if (h("registerListenersAndPositionElements invoked."), i(l)) {
                            i(l).onRendered = function () {
                                if (h("startanimation triggered."), y(l)) h("Ignoring since element is still unrendered..."); else {
                                    h("Element rendered.");
                                    var e = f(l), t = p(l);
                                    0 !== e.scrollLeft && 0 !== e.scrollTop && 0 !== t.scrollLeft && 0 !== t.scrollTop || (h("Scrollbars out of sync. Updating detector elements..."), a(u))
                                }
                            }, i(l).onExpand = d, i(l).onShrink = d;
                            var m = i(l).style;
                            s(l, m.width, m.height)
                        } else h("Aborting because element has been uninstalled")
                    }

                    function S() {
                        if (h("finalizeDomMutation invoked."), i(l)) {
                            var e = i(l).style;
                            g(l, e.width, e.height), k(l, e.width, e.height)
                        } else h("Aborting because element has been uninstalled")
                    }

                    function D() {
                        d(l)
                    }

                    function O() {
                        var e;
                        h("Installing..."), i(l).listeners = [], e = m(), i(l).startSize = {
                            width: e.width,
                            height: e.height
                        }, h("Element start size", i(l).startSize), n.add(0, v), n.add(1, C), n.add(2, E), n.add(3, S), n.add(4, D)
                    }

                    d || (d = l, l = e, e = null), e = e || {}, h("Making detectable..."), function (e) {
                        return !function (e) {
                            var t = e.getRootNode && e.getRootNode().contains(e);
                            return e === e.ownerDocument.body || e.ownerDocument.body.contains(e) || t
                        }(e) || null === window.getComputedStyle(e)
                    }(l) ? (h("Element is detached"), j(), h("Waiting until element is attached..."), i(l).onRendered = function () {
                        h("Element is now attached"), O()
                    }) : O()
                }, addListener: function (e, t) {
                    if (!i(e).listeners.push) throw new Error("Cannot add listener to an element that is not detectable.");
                    i(e).listeners.push(t)
                }, uninstall: function (e) {
                    var t = i(e);
                    t && (t.onExpandScroll && d(f(e), "scroll", t.onExpandScroll), t.onShrinkScroll && d(p(e), "scroll", t.onShrinkScroll), t.onAnimationStart && d(t.container, "animationstart", t.onAnimationStart), t.container && e.removeChild(t.container))
                }, initDocument: l
            }
        }
    }, {"../collection-utils": 126}],
    129: [function (e, t, n) {
        "use strict";
        var r = e("./collection-utils").forEach, i = e("./element-utils"), o = e("./listener-handler"),
            s = e("./id-generator"), a = e("./id-handler"), l = e("./reporter"), c = e("./browser-detector"),
            u = e("batch-processor"), d = e("./state-handler"), f = e("./detection-strategy/object.js"),
            p = e("./detection-strategy/scroll.js");

        function h(e) {
            return Array.isArray(e) || void 0 !== e.length
        }

        function y(e) {
            if (Array.isArray(e)) return e;
            var t = [];
            return r(e, (function (e) {
                t.push(e)
            })), t
        }

        function m(e) {
            return e && 1 === e.nodeType
        }

        function v(e, t, n) {
            var r = e[t];
            return null == r && void 0 !== n ? n : r
        }

        t.exports = function (e) {
            var t;
            if ((e = e || {}).idHandler) t = {
                get: function (t) {
                    return e.idHandler.get(t, !0)
                }, set: e.idHandler.set
            }; else {
                var n = s(), g = a({idGenerator: n, stateHandler: d});
                t = g
            }
            var b = e.reporter;
            b || (b = l(!1 === b));
            var w = v(e, "batchProcessor", u({reporter: b})), _ = {};
            _.callOnAdd = !!v(e, "callOnAdd", !0), _.debug = !!v(e, "debug", !1);
            var x, k = o(t), j = i({stateHandler: d}), C = v(e, "strategy", "object"), E = v(e, "important", !1),
                S = {reporter: b, batchProcessor: w, stateHandler: d, idHandler: t, important: E};
            if ("scroll" === C && (c.isLegacyOpera() ? (b.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy."), C = "object") : c.isIE(9) && (b.warn("Scroll strategy is not supported on IE9. Changing to object strategy."), C = "object")), "scroll" === C) x = p(S); else {
                if ("object" !== C) throw new Error("Invalid strategy name: " + C);
                x = f(S)
            }
            var D = {};
            return {
                listenTo: function (e, n, i) {
                    function o(e) {
                        var t = k.get(e);
                        r(t, (function (t) {
                            t(e)
                        }))
                    }

                    function s(e, t, n) {
                        k.add(t, n), e && n(t)
                    }

                    if (i || (i = n, n = e, e = {}), !n) throw new Error("At least one element required.");
                    if (!i) throw new Error("Listener required.");
                    if (m(n)) n = [n]; else {
                        if (!h(n)) return b.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
                        n = y(n)
                    }
                    var a = 0, l = v(e, "callOnAdd", _.callOnAdd), c = v(e, "onReady", (function () {
                    })), u = v(e, "debug", _.debug);
                    r(n, (function (e) {
                        d.getState(e) || (d.initState(e), t.set(e));
                        var f = t.get(e);
                        if (u && b.log("Attaching listener to element", f, e), !j.isDetectable(e)) return u && b.log(f, "Not detectable."), j.isBusy(e) ? (u && b.log(f, "System busy making it detectable"), s(l, e, i), D[f] = D[f] || [], void D[f].push((function () {
                            ++a === n.length && c()
                        }))) : (u && b.log(f, "Making detectable..."), j.markBusy(e, !0), x.makeDetectable({
                            debug: u,
                            important: E
                        }, e, (function (e) {
                            if (u && b.log(f, "onElementDetectable"), d.getState(e)) {
                                j.markAsDetectable(e), j.markBusy(e, !1), x.addListener(e, o), s(l, e, i);
                                var t = d.getState(e);
                                if (t && t.startSize) {
                                    var p = e.offsetWidth, h = e.offsetHeight;
                                    t.startSize.width === p && t.startSize.height === h || o(e)
                                }
                                D[f] && r(D[f], (function (e) {
                                    e()
                                }))
                            } else u && b.log(f, "Element uninstalled before being detectable.");
                            delete D[f], ++a === n.length && c()
                        })));
                        u && b.log(f, "Already detecable, adding listener."), s(l, e, i), a++
                    })), a === n.length && c()
                }, removeListener: k.removeListener, removeAllListeners: k.removeAllListeners, uninstall: function (e) {
                    if (!e) return b.error("At least one element is required.");
                    if (m(e)) e = [e]; else {
                        if (!h(e)) return b.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
                        e = y(e)
                    }
                    r(e, (function (e) {
                        k.removeAllListeners(e), x.uninstall(e), d.cleanState(e)
                    }))
                }, initDocument: function (e) {
                    x.initDocument && x.initDocument(e)
                }
            }
        }
    }, {
        "./browser-detector": 125,
        "./collection-utils": 126,
        "./detection-strategy/object.js": 127,
        "./detection-strategy/scroll.js": 128,
        "./element-utils": 130,
        "./id-generator": 131,
        "./id-handler": 132,
        "./listener-handler": 133,
        "./reporter": 134,
        "./state-handler": 135,
        "batch-processor": 1
    }],
    130: [function (e, t, n) {
        "use strict";
        t.exports = function (e) {
            var t = e.stateHandler.getState;
            return {
                isDetectable: function (e) {
                    var n = t(e);
                    return n && !!n.isDetectable
                }, markAsDetectable: function (e) {
                    t(e).isDetectable = !0
                }, isBusy: function (e) {
                    return !!t(e).busy
                }, markBusy: function (e, n) {
                    t(e).busy = !!n
                }
            }
        }
    }, {}],
    131: [function (e, t, n) {
        "use strict";
        t.exports = function () {
            var e = 1;
            return {
                generate: function () {
                    return e++
                }
            }
        }
    }, {}],
    132: [function (e, t, n) {
        "use strict";
        t.exports = function (e) {
            var t = e.idGenerator, n = e.stateHandler.getState;
            return {
                get: function (e) {
                    var t = n(e);
                    return t && void 0 !== t.id ? t.id : null
                }, set: function (e) {
                    var r = n(e);
                    if (!r) throw new Error("setId required the element to have a resize detection state.");
                    var i = t.generate();
                    return r.id = i, i
                }
            }
        }
    }, {}],
    133: [function (e, t, n) {
        "use strict";
        t.exports = function (e) {
            var t = {};

            function n(n) {
                var r = e.get(n);
                return void 0 === r ? [] : t[r] || []
            }

            return {
                get: n, add: function (n, r) {
                    var i = e.get(n);
                    t[i] || (t[i] = []), t[i].push(r)
                }, removeListener: function (e, t) {
                    for (var r = n(e), i = 0, o = r.length; i < o; ++i) if (r[i] === t) {
                        r.splice(i, 1);
                        break
                    }
                }, removeAllListeners: function (e) {
                    var t = n(e);
                    t && (t.length = 0)
                }
            }
        }
    }, {}],
    134: [function (e, t, n) {
        "use strict";
        t.exports = function (e) {
            function t() {
            }

            var n = {log: t, warn: t, error: t};
            if (!e && window.console) {
                var r = function (e, t) {
                    e[t] = function () {
                        var e = console[t];
                        if (e.apply) e.apply(console, arguments); else for (var n = 0; n < arguments.length; n++) e(arguments[n])
                    }
                };
                r(n, "log"), r(n, "warn"), r(n, "error")
            }
            return n
        }
    }, {}],
    135: [function (e, t, n) {
        "use strict";

        function r(e) {
            return e._erd
        }

        t.exports = {
            initState: function (e) {
                return e._erd = {}, r(e)
            }, getState: r, cleanState: function (e) {
                delete e._erd
            }
        }
    }, {}],
    136: [function (e, t, n) {
        var r, i;
        r = window, i = function () {
            return function (e) {
                var t = {};

                function n(r) {
                    if (t[r]) return t[r].exports;
                    var i = t[r] = {i: r, l: !1, exports: {}};
                    return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
                }

                return n.m = e, n.c = t, n.d = function (e, t, r) {
                    n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
                }, n.r = function (e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
                }, n.t = function (e, t) {
                    if (1 & t && (e = n(e)), 8 & t) return e;
                    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                    var r = Object.create(null);
                    if (n.r(r), Object.defineProperty(r, "default", {
                        enumerable: !0,
                        value: e
                    }), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i, function (t) {
                        return e[t]
                    }.bind(null, i));
                    return r
                }, n.n = function (e) {
                    var t = e && e.__esModule ? function () {
                        return e.default
                    } : function () {
                        return e
                    };
                    return n.d(t, "a", t), t
                }, n.o = function (e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }, n.p = "", n(n.s = 0)
            }([function (e, t, n) {
                "use strict";
                n.r(t);
                var r, i = function (e, t) {
                        var n = t.x - e.x, r = t.y - e.y;
                        return Math.sqrt(n * n + r * r)
                    }, o = function (e) {
                        return e * (Math.PI / 180)
                    }, s = new Map, a = function (e) {
                        s.has(e) && clearTimeout(s.get(e)), s.set(e, setTimeout(e, 100))
                    }, l = function (e, t, n) {
                        for (var r, i = t.split(/[ ,]+/g), o = 0; o < i.length; o += 1) r = i[o], e.addEventListener ? e.addEventListener(r, n, !1) : e.attachEvent && e.attachEvent(r, n)
                    }, c = function (e, t, n) {
                        for (var r, i = t.split(/[ ,]+/g), o = 0; o < i.length; o += 1) r = i[o], e.removeEventListener ? e.removeEventListener(r, n) : e.detachEvent && e.detachEvent(r, n)
                    }, u = function (e) {
                        return e.preventDefault(), e.type.match(/^touch/) ? e.changedTouches : e
                    }, d = function () {
                        return {
                            x: void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
                            y: void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
                        }
                    }, f = function (e, t) {
                        t.top || t.right || t.bottom || t.left ? (e.style.top = t.top, e.style.right = t.right, e.style.bottom = t.bottom, e.style.left = t.left) : (e.style.left = t.x + "px", e.style.top = t.y + "px")
                    }, p = function (e, t, n) {
                        var r = h(e);
                        for (var i in r) if (r.hasOwnProperty(i)) if ("string" == typeof t) r[i] = t + " " + n; else {
                            for (var o = "", s = 0, a = t.length; s < a; s += 1) o += t[s] + " " + n + ", ";
                            r[i] = o.slice(0, -2)
                        }
                        return r
                    }, h = function (e) {
                        var t = {};
                        return t[e] = "", ["webkit", "Moz", "o"].forEach((function (n) {
                            t[n + e.charAt(0).toUpperCase() + e.slice(1)] = ""
                        })), t
                    }, y = function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                        return e
                    }, m = function (e, t) {
                        if (e.length) for (var n = 0, r = e.length; n < r; n += 1) t(e[n]); else t(e)
                    }, v = !!("ontouchstart" in window), g = !!window.PointerEvent, b = !!window.MSPointerEvent,
                    w = {start: "mousedown", move: "mousemove", end: "mouseup"}, _ = {};

                function x() {
                }

                g ? r = {
                    start: "pointerdown",
                    move: "pointermove",
                    end: "pointerup, pointercancel"
                } : b ? r = {
                    start: "MSPointerDown",
                    move: "MSPointerMove",
                    end: "MSPointerUp"
                } : v ? (r = {
                    start: "touchstart",
                    move: "touchmove",
                    end: "touchend, touchcancel"
                }, _ = w) : r = w, x.prototype.on = function (e, t) {
                    var n, r = e.split(/[ ,]+/g);
                    this._handlers_ = this._handlers_ || {};
                    for (var i = 0; i < r.length; i += 1) n = r[i], this._handlers_[n] = this._handlers_[n] || [], this._handlers_[n].push(t);
                    return this
                }, x.prototype.off = function (e, t) {
                    return this._handlers_ = this._handlers_ || {}, void 0 === e ? this._handlers_ = {} : void 0 === t ? this._handlers_[e] = null : this._handlers_[e] && this._handlers_[e].indexOf(t) >= 0 && this._handlers_[e].splice(this._handlers_[e].indexOf(t), 1), this
                }, x.prototype.trigger = function (e, t) {
                    var n, r = this, i = e.split(/[ ,]+/g);
                    r._handlers_ = r._handlers_ || {};
                    for (var o = 0; o < i.length; o += 1) n = i[o], r._handlers_[n] && r._handlers_[n].length && r._handlers_[n].forEach((function (e) {
                        e.call(r, {type: n, target: r}, t)
                    }))
                }, x.prototype.config = function (e) {
                    this.options = this.defaults || {}, e && (this.options = function (e, t) {
                        var n = {};
                        for (var r in e) e.hasOwnProperty(r) && t.hasOwnProperty(r) ? n[r] = t[r] : e.hasOwnProperty(r) && (n[r] = e[r]);
                        return n
                    }(this.options, e))
                }, x.prototype.bindEvt = function (e, t) {
                    var n = this;
                    return n._domHandlers_ = n._domHandlers_ || {}, n._domHandlers_[t] = function () {
                        "function" == typeof n["on" + t] ? n["on" + t].apply(n, arguments) : console.warn('[WARNING] : Missing "on' + t + '" handler.')
                    }, l(e, r[t], n._domHandlers_[t]), _[t] && l(e, _[t], n._domHandlers_[t]), n
                }, x.prototype.unbindEvt = function (e, t) {
                    return this._domHandlers_ = this._domHandlers_ || {}, c(e, r[t], this._domHandlers_[t]), _[t] && c(e, _[t], this._domHandlers_[t]), delete this._domHandlers_[t], this
                };
                var k = x;

                function j(e, t) {
                    return this.identifier = t.identifier, this.position = t.position, this.frontPosition = t.frontPosition, this.collection = e, this.defaults = {
                        size: 100,
                        threshold: .1,
                        color: "white",
                        fadeTime: 250,
                        dataOnly: !1,
                        restJoystick: !0,
                        restOpacity: .5,
                        mode: "dynamic",
                        zone: document.body,
                        lockX: !1,
                        lockY: !1,
                        shape: "circle"
                    }, this.config(t), "dynamic" === this.options.mode && (this.options.restOpacity = 0), this.id = j.id, j.id += 1, this.buildEl().stylize(), this.instance = {
                        el: this.ui.el,
                        on: this.on.bind(this),
                        off: this.off.bind(this),
                        show: this.show.bind(this),
                        hide: this.hide.bind(this),
                        add: this.addToDom.bind(this),
                        remove: this.removeFromDom.bind(this),
                        destroy: this.destroy.bind(this),
                        setPosition: this.setPosition.bind(this),
                        resetDirection: this.resetDirection.bind(this),
                        computeDirection: this.computeDirection.bind(this),
                        trigger: this.trigger.bind(this),
                        position: this.position,
                        frontPosition: this.frontPosition,
                        ui: this.ui,
                        identifier: this.identifier,
                        id: this.id,
                        options: this.options
                    }, this.instance
                }

                j.prototype = new k, j.constructor = j, j.id = 0, j.prototype.buildEl = function (e) {
                    return this.ui = {}, this.options.dataOnly || (this.ui.el = document.createElement("div"), this.ui.back = document.createElement("div"), this.ui.front = document.createElement("div"), this.ui.el.className = "nipple collection_" + this.collection.id, this.ui.back.className = "back", this.ui.front.className = "front", this.ui.el.setAttribute("id", "nipple_" + this.collection.id + "_" + this.id), this.ui.el.appendChild(this.ui.back), this.ui.el.appendChild(this.ui.front)), this
                }, j.prototype.stylize = function () {
                    if (this.options.dataOnly) return this;
                    var e = this.options.fadeTime + "ms", t = function (e, t) {
                        var n = h("borderRadius");
                        for (var r in n) n.hasOwnProperty(r) && (n[r] = "50%");
                        return n
                    }(), n = p("transition", "opacity", e), r = {};
                    return r.el = {
                        position: "absolute",
                        opacity: this.options.restOpacity,
                        display: "block",
                        zIndex: 999
                    }, r.back = {
                        position: "absolute",
                        display: "block",
                        width: this.options.size + "px",
                        height: this.options.size + "px",
                        marginLeft: -this.options.size / 2 + "px",
                        marginTop: -this.options.size / 2 + "px",
                        background: this.options.color,
                        opacity: ".5"
                    }, r.front = {
                        width: this.options.size / 2 + "px",
                        height: this.options.size / 2 + "px",
                        position: "absolute",
                        display: "block",
                        marginLeft: -this.options.size / 4 + "px",
                        marginTop: -this.options.size / 4 + "px",
                        background: this.options.color,
                        opacity: ".5"
                    }, y(r.el, n), "circle" === this.options.shape && y(r.back, t), y(r.front, t), this.applyStyles(r), this
                }, j.prototype.applyStyles = function (e) {
                    for (var t in this.ui) if (this.ui.hasOwnProperty(t)) for (var n in e[t]) this.ui[t].style[n] = e[t][n];
                    return this
                }, j.prototype.addToDom = function () {
                    return this.options.dataOnly || document.body.contains(this.ui.el) || this.options.zone.appendChild(this.ui.el), this
                }, j.prototype.removeFromDom = function () {
                    return this.options.dataOnly || !document.body.contains(this.ui.el) || this.options.zone.removeChild(this.ui.el), this
                }, j.prototype.destroy = function () {
                    clearTimeout(this.removeTimeout), clearTimeout(this.showTimeout), clearTimeout(this.restTimeout), this.trigger("destroyed", this.instance), this.removeFromDom(), this.off()
                }, j.prototype.show = function (e) {
                    var t = this;
                    return t.options.dataOnly || (clearTimeout(t.removeTimeout), clearTimeout(t.showTimeout), clearTimeout(t.restTimeout), t.addToDom(), t.restCallback(), setTimeout((function () {
                        t.ui.el.style.opacity = 1
                    }), 0), t.showTimeout = setTimeout((function () {
                        t.trigger("shown", t.instance), "function" == typeof e && e.call(this)
                    }), t.options.fadeTime)), t
                }, j.prototype.hide = function (e) {
                    var t = this;
                    if (t.options.dataOnly) return t;
                    if (t.ui.el.style.opacity = t.options.restOpacity, clearTimeout(t.removeTimeout), clearTimeout(t.showTimeout), clearTimeout(t.restTimeout), t.removeTimeout = setTimeout((function () {
                        var n = "dynamic" === t.options.mode ? "none" : "block";
                        t.ui.el.style.display = n, "function" == typeof e && e.call(t), t.trigger("hidden", t.instance)
                    }), t.options.fadeTime), t.options.restJoystick) {
                        var n = t.options.restJoystick, r = {};
                        r.x = !0 === n || !1 !== n.x ? 0 : t.instance.frontPosition.x, r.y = !0 === n || !1 !== n.y ? 0 : t.instance.frontPosition.y, t.setPosition(e, r)
                    }
                    return t
                }, j.prototype.setPosition = function (e, t) {
                    var n = this;
                    n.frontPosition = {x: t.x, y: t.y};
                    var r = n.options.fadeTime + "ms", i = {};
                    i.front = p("transition", ["top", "left"], r);
                    var o = {front: {}};
                    o.front = {
                        left: n.frontPosition.x + "px",
                        top: n.frontPosition.y + "px"
                    }, n.applyStyles(i), n.applyStyles(o), n.restTimeout = setTimeout((function () {
                        "function" == typeof e && e.call(n), n.restCallback()
                    }), n.options.fadeTime)
                }, j.prototype.restCallback = function () {
                    var e = {};
                    e.front = p("transition", "none", ""), this.applyStyles(e), this.trigger("rested", this.instance)
                }, j.prototype.resetDirection = function () {
                    this.direction = {x: !1, y: !1, angle: !1}
                }, j.prototype.computeDirection = function (e) {
                    var t, n, r, i = e.angle.radian, o = Math.PI / 4, s = Math.PI / 2;
                    if (i > o && i < 3 * o && !e.lockX ? t = "up" : i > -o && i <= o && !e.lockY ? t = "left" : i > 3 * -o && i <= -o && !e.lockX ? t = "down" : e.lockY || (t = "right"), e.lockY || (n = i > -s && i < s ? "left" : "right"), e.lockX || (r = i > 0 ? "up" : "down"), e.force > this.options.threshold) {
                        var a, l = {};
                        for (a in this.direction) this.direction.hasOwnProperty(a) && (l[a] = this.direction[a]);
                        var c = {};
                        for (a in this.direction = {
                            x: n,
                            y: r,
                            angle: t
                        }, e.direction = this.direction, l) l[a] === this.direction[a] && (c[a] = !0);
                        if (c.x && c.y && c.angle) return e;
                        c.x && c.y || this.trigger("plain", e), c.x || this.trigger("plain:" + n, e), c.y || this.trigger("plain:" + r, e), c.angle || this.trigger("dir dir:" + t, e)
                    } else this.resetDirection();
                    return e
                };
                var C = j;

                function E(e, t) {
                    this.nipples = [], this.idles = [], this.actives = [], this.ids = [], this.pressureIntervals = {}, this.manager = e, this.id = E.id, E.id += 1, this.defaults = {
                        zone: document.body,
                        multitouch: !1,
                        maxNumberOfNipples: 10,
                        mode: "dynamic",
                        position: {top: 0, left: 0},
                        catchDistance: 200,
                        size: 100,
                        threshold: .1,
                        color: "white",
                        fadeTime: 250,
                        dataOnly: !1,
                        restJoystick: !0,
                        restOpacity: .5,
                        lockX: !1,
                        lockY: !1,
                        shape: "circle",
                        dynamicPage: !1,
                        follow: !1
                    }, this.config(t), "static" !== this.options.mode && "semi" !== this.options.mode || (this.options.multitouch = !1), this.options.multitouch || (this.options.maxNumberOfNipples = 1);
                    var n = getComputedStyle(this.options.zone.parentElement);
                    return n && "flex" === n.display && (this.parentIsFlex = !0), this.updateBox(), this.prepareNipples(), this.bindings(), this.begin(), this.nipples
                }

                E.prototype = new k, E.constructor = E, E.id = 0, E.prototype.prepareNipples = function () {
                    var e = this.nipples;
                    e.on = this.on.bind(this), e.off = this.off.bind(this), e.options = this.options, e.destroy = this.destroy.bind(this), e.ids = this.ids, e.id = this.id, e.processOnMove = this.processOnMove.bind(this), e.processOnEnd = this.processOnEnd.bind(this), e.get = function (t) {
                        if (void 0 === t) return e[0];
                        for (var n = 0, r = e.length; n < r; n += 1) if (e[n].identifier === t) return e[n];
                        return !1
                    }
                }, E.prototype.bindings = function () {
                    this.bindEvt(this.options.zone, "start"), this.options.zone.style.touchAction = "none", this.options.zone.style.msTouchAction = "none"
                }, E.prototype.begin = function () {
                    var e = this.options;
                    if ("static" === e.mode) {
                        var t = this.createNipple(e.position, this.manager.getIdentifier());
                        t.add(), this.idles.push(t)
                    }
                }, E.prototype.createNipple = function (e, t) {
                    var n = this.manager.scroll, r = {}, i = this.options,
                        o = this.parentIsFlex ? n.x : n.x + this.box.left,
                        s = this.parentIsFlex ? n.y : n.y + this.box.top;
                    if (e.x && e.y) r = {x: e.x - o, y: e.y - s}; else if (e.top || e.right || e.bottom || e.left) {
                        var a = document.createElement("DIV");
                        a.style.display = "hidden", a.style.top = e.top, a.style.right = e.right, a.style.bottom = e.bottom, a.style.left = e.left, a.style.position = "absolute", i.zone.appendChild(a);
                        var l = a.getBoundingClientRect();
                        i.zone.removeChild(a), r = e, e = {x: l.left + n.x, y: l.top + n.y}
                    }
                    var c = new C(this, {
                        color: i.color,
                        size: i.size,
                        threshold: i.threshold,
                        fadeTime: i.fadeTime,
                        dataOnly: i.dataOnly,
                        restJoystick: i.restJoystick,
                        restOpacity: i.restOpacity,
                        mode: i.mode,
                        identifier: t,
                        position: e,
                        zone: i.zone,
                        frontPosition: {x: 0, y: 0},
                        shape: i.shape
                    });
                    return i.dataOnly || (f(c.ui.el, r), f(c.ui.front, c.frontPosition)), this.nipples.push(c), this.trigger("added " + c.identifier + ":added", c), this.manager.trigger("added " + c.identifier + ":added", c), this.bindNipple(c), c
                }, E.prototype.updateBox = function () {
                    this.box = this.options.zone.getBoundingClientRect()
                }, E.prototype.bindNipple = function (e) {
                    var t, n = this, r = function (e, r) {
                        t = e.type + " " + r.id + ":" + e.type, n.trigger(t, r)
                    };
                    e.on("destroyed", n.onDestroyed.bind(n)), e.on("shown hidden rested dir plain", r), e.on("dir:up dir:right dir:down dir:left", r), e.on("plain:up plain:right plain:down plain:left", r)
                }, E.prototype.pressureFn = function (e, t, n) {
                    var r = this, i = 0;
                    clearInterval(r.pressureIntervals[n]), r.pressureIntervals[n] = setInterval(function () {
                        var n = e.force || e.pressure || e.webkitForce || 0;
                        n !== i && (t.trigger("pressure", n), r.trigger("pressure " + t.identifier + ":pressure", n), i = n)
                    }.bind(r), 100)
                }, E.prototype.onstart = function (e) {
                    var t = this, n = t.options, r = e;
                    return e = u(e), t.updateBox(), m(e, (function (i) {
                        t.actives.length < n.maxNumberOfNipples ? t.processOnStart(i) : r.type.match(/^touch/) && (Object.keys(t.manager.ids).forEach((function (n) {
                            if (Object.values(r.touches).findIndex((function (e) {
                                return e.identifier === n
                            })) < 0) {
                                var i = [e[0]];
                                i.identifier = n, t.processOnEnd(i)
                            }
                        })), t.actives.length < n.maxNumberOfNipples && t.processOnStart(i))
                    })), t.manager.bindDocument(), !1
                }, E.prototype.processOnStart = function (e) {
                    var t, n = this, r = n.options, o = n.manager.getIdentifier(e),
                        s = e.force || e.pressure || e.webkitForce || 0, a = {x: e.pageX, y: e.pageY},
                        l = n.getOrCreate(o, a);
                    l.identifier !== o && n.manager.removeIdentifier(l.identifier), l.identifier = o;
                    var c = function (t) {
                        t.trigger("start", t), n.trigger("start " + t.id + ":start", t), t.show(), s > 0 && n.pressureFn(e, t, t.identifier), n.processOnMove(e)
                    };
                    if ((t = n.idles.indexOf(l)) >= 0 && n.idles.splice(t, 1), n.actives.push(l), n.ids.push(l.identifier), "semi" !== r.mode) c(l); else {
                        if (!(i(a, l.position) <= r.catchDistance)) return l.destroy(), void n.processOnStart(e);
                        c(l)
                    }
                    return l
                }, E.prototype.getOrCreate = function (e, t) {
                    var n, r = this.options;
                    return /(semi|static)/.test(r.mode) ? (n = this.idles[0]) ? (this.idles.splice(0, 1), n) : "semi" === r.mode ? this.createNipple(t, e) : (console.warn("Coudln't find the needed nipple."), !1) : n = this.createNipple(t, e)
                }, E.prototype.processOnMove = function (e) {
                    var t = this.options, n = this.manager.getIdentifier(e), r = this.nipples.get(n),
                        s = this.manager.scroll;
                    if (function (e) {
                        return isNaN(e.buttons) ? 0 !== e.pressure : 0 !== e.buttons
                    }(e)) {
                        if (!r) return console.error("Found zombie joystick with ID " + n), void this.manager.removeIdentifier(n);
                        if (t.dynamicPage) {
                            var a = r.el.getBoundingClientRect();
                            r.position = {x: s.x + a.left, y: s.y + a.top}
                        }
                        r.identifier = n;
                        var l = r.options.size / 2, c = {x: e.pageX, y: e.pageY};
                        t.lockX && (c.y = r.position.y), t.lockY && (c.x = r.position.x);
                        var u, d, p, h, y, m, v, g, b, w, _ = i(c, r.position),
                            x = (u = c, p = (d = r.position).x - u.x, h = d.y - u.y, function (e) {
                                return e * (180 / Math.PI)
                            }(Math.atan2(h, p))), k = o(x), j = _ / l, C = {distance: _, position: c};
                        if ("circle" === r.options.shape ? (y = Math.min(_, l), v = r.position, g = y, w = {
                            x: 0,
                            y: 0
                        }, b = o(b = x), w.x = v.x - g * Math.cos(b), w.y = v.y - g * Math.sin(b), m = w) : (m = function (e, t, n) {
                            return {
                                x: Math.min(Math.max(e.x, t.x - n), t.x + n),
                                y: Math.min(Math.max(e.y, t.y - n), t.y + n)
                            }
                        }(c, r.position, l), y = i(m, r.position)), t.follow) {
                            if (_ > l) {
                                var E = c.x - m.x, S = c.y - m.y;
                                r.position.x += E, r.position.y += S, r.el.style.top = r.position.y - (this.box.top + s.y) + "px", r.el.style.left = r.position.x - (this.box.left + s.x) + "px", _ = i(c, r.position)
                            }
                        } else c = m, _ = y;
                        var D = c.x - r.position.x, O = c.y - r.position.y;
                        r.frontPosition = {x: D, y: O}, t.dataOnly || f(r.ui.front, r.frontPosition);
                        var P = {
                            identifier: r.identifier,
                            position: c,
                            force: j,
                            pressure: e.force || e.pressure || e.webkitForce || 0,
                            distance: _,
                            angle: {radian: k, degree: x},
                            vector: {x: D / l, y: -O / l},
                            raw: C,
                            instance: r,
                            lockX: t.lockX,
                            lockY: t.lockY
                        };
                        (P = r.computeDirection(P)).angle = {
                            radian: o(180 - x),
                            degree: 180 - x
                        }, r.trigger("move", P), this.trigger("move " + r.id + ":move", P)
                    } else this.processOnEnd(e)
                }, E.prototype.processOnEnd = function (e) {
                    var t = this, n = t.options, r = t.manager.getIdentifier(e), i = t.nipples.get(r),
                        o = t.manager.removeIdentifier(i.identifier);
                    i && (n.dataOnly || i.hide((function () {
                        "dynamic" === n.mode && (i.trigger("removed", i), t.trigger("removed " + i.id + ":removed", i), t.manager.trigger("removed " + i.id + ":removed", i), i.destroy())
                    })), clearInterval(t.pressureIntervals[i.identifier]), i.resetDirection(), i.trigger("end", i), t.trigger("end " + i.id + ":end", i), t.ids.indexOf(i.identifier) >= 0 && t.ids.splice(t.ids.indexOf(i.identifier), 1), t.actives.indexOf(i) >= 0 && t.actives.splice(t.actives.indexOf(i), 1), /(semi|static)/.test(n.mode) ? t.idles.push(i) : t.nipples.indexOf(i) >= 0 && t.nipples.splice(t.nipples.indexOf(i), 1), t.manager.unbindDocument(), /(semi|static)/.test(n.mode) && (t.manager.ids[o.id] = o.identifier))
                }, E.prototype.onDestroyed = function (e, t) {
                    this.nipples.indexOf(t) >= 0 && this.nipples.splice(this.nipples.indexOf(t), 1), this.actives.indexOf(t) >= 0 && this.actives.splice(this.actives.indexOf(t), 1), this.idles.indexOf(t) >= 0 && this.idles.splice(this.idles.indexOf(t), 1), this.ids.indexOf(t.identifier) >= 0 && this.ids.splice(this.ids.indexOf(t.identifier), 1), this.manager.removeIdentifier(t.identifier), this.manager.unbindDocument()
                }, E.prototype.destroy = function () {
                    for (var e in this.unbindEvt(this.options.zone, "start"), this.nipples.forEach((function (e) {
                        e.destroy()
                    })), this.pressureIntervals) this.pressureIntervals.hasOwnProperty(e) && clearInterval(this.pressureIntervals[e]);
                    this.trigger("destroyed", this.nipples), this.manager.unbindDocument(), this.off()
                };
                var S = E;

                function D(e) {
                    var t = this;
                    t.ids = {}, t.index = 0, t.collections = [], t.scroll = d(), t.config(e), t.prepareCollections();
                    var n = function () {
                        var e;
                        t.collections.forEach((function (n) {
                            n.forEach((function (n) {
                                e = n.el.getBoundingClientRect(), n.position = {
                                    x: t.scroll.x + e.left,
                                    y: t.scroll.y + e.top
                                }
                            }))
                        }))
                    };
                    l(window, "resize", (function () {
                        a(n)
                    }));
                    var r = function () {
                        t.scroll = d()
                    };
                    return l(window, "scroll", (function () {
                        a(r)
                    })), t.collections
                }

                D.prototype = new k, D.constructor = D, D.prototype.prepareCollections = function () {
                    var e = this;
                    e.collections.create = e.create.bind(e), e.collections.on = e.on.bind(e), e.collections.off = e.off.bind(e), e.collections.destroy = e.destroy.bind(e), e.collections.get = function (t) {
                        var n;
                        return e.collections.every((function (e) {
                            return !(n = e.get(t))
                        })), n
                    }
                }, D.prototype.create = function (e) {
                    return this.createCollection(e)
                }, D.prototype.createCollection = function (e) {
                    var t = new S(this, e);
                    return this.bindCollection(t), this.collections.push(t), t
                }, D.prototype.bindCollection = function (e) {
                    var t, n = this, r = function (e, r) {
                        t = e.type + " " + r.id + ":" + e.type, n.trigger(t, r)
                    };
                    e.on("destroyed", n.onDestroyed.bind(n)), e.on("shown hidden rested dir plain", r), e.on("dir:up dir:right dir:down dir:left", r), e.on("plain:up plain:right plain:down plain:left", r)
                }, D.prototype.bindDocument = function () {
                    this.binded || (this.bindEvt(document, "move").bindEvt(document, "end"), this.binded = !0)
                }, D.prototype.unbindDocument = function (e) {
                    Object.keys(this.ids).length && !0 !== e || (this.unbindEvt(document, "move").unbindEvt(document, "end"), this.binded = !1)
                }, D.prototype.getIdentifier = function (e) {
                    var t;
                    return e ? void 0 === (t = void 0 === e.identifier ? e.pointerId : e.identifier) && (t = this.latest || 0) : t = this.index, void 0 === this.ids[t] && (this.ids[t] = this.index, this.index += 1), this.latest = t, this.ids[t]
                }, D.prototype.removeIdentifier = function (e) {
                    var t = {};
                    for (var n in this.ids) if (this.ids[n] === e) {
                        t.id = n, t.identifier = this.ids[n], delete this.ids[n];
                        break
                    }
                    return t
                }, D.prototype.onmove = function (e) {
                    return this.onAny("move", e), !1
                }, D.prototype.onend = function (e) {
                    return this.onAny("end", e), !1
                }, D.prototype.oncancel = function (e) {
                    return this.onAny("end", e), !1
                }, D.prototype.onAny = function (e, t) {
                    var n, r = this, i = "processOn" + e.charAt(0).toUpperCase() + e.slice(1);
                    return t = u(t), m(t, (function (e) {
                        n = r.getIdentifier(e), m(r.collections, function (e, t, n) {
                            n.ids.indexOf(t) >= 0 && (n[i](e), e._found_ = !0)
                        }.bind(null, e, n)), e._found_ || r.removeIdentifier(n)
                    })), !1
                }, D.prototype.destroy = function () {
                    this.unbindDocument(!0), this.ids = {}, this.index = 0, this.collections.forEach((function (e) {
                        e.destroy()
                    })), this.off()
                }, D.prototype.onDestroyed = function (e, t) {
                    if (this.collections.indexOf(t) < 0) return !1;
                    this.collections.splice(this.collections.indexOf(t), 1)
                };
                var O = new D;
                t.default = {
                    create: function (e) {
                        return O.create(e)
                    }, factory: O
                }
            }]).default
        }, "object" == typeof n && "object" == typeof t ? t.exports = i() : "function" == typeof define && define.amd ? define("nipplejs", [], i) : "object" == typeof n ? n.nipplejs = i() : r.nipplejs = i()
    }, {}],
    137: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
        var r, i = function () {
            return i = Object.assign || function (e) {
                for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }, i.apply(this, arguments)
        }, o = function () {
            function e(e) {
                this.options = e, this.listeners = {}
            }

            return e.prototype.on = function (e, t) {
                var n = this.listeners[e] || [];
                this.listeners[e] = n.concat([t])
            }, e.prototype.triggerEvent = function (e, t) {
                var n = this;
                (this.listeners[e] || []).forEach((function (e) {
                    return e({target: n, event: t})
                }))
            }, e
        }();
        (r = n.NotyfArrayEvent || (n.NotyfArrayEvent = {}))[r.Add = 0] = "Add", r[r.Remove = 1] = "Remove";
        var s, a = function () {
            function e() {
                this.notifications = []
            }

            return e.prototype.push = function (e) {
                this.notifications.push(e), this.updateFn(e, n.NotyfArrayEvent.Add, this.notifications)
            }, e.prototype.splice = function (e, t) {
                var r = this.notifications.splice(e, t)[0];
                return this.updateFn(r, n.NotyfArrayEvent.Remove, this.notifications), r
            }, e.prototype.indexOf = function (e) {
                return this.notifications.indexOf(e)
            }, e.prototype.onUpdate = function (e) {
                this.updateFn = e
            }, e
        }();
        (s = n.NotyfEvent || (n.NotyfEvent = {})).Dismiss = "dismiss", s.Click = "click";
        var l = {
            types: [{
                type: "success",
                className: "notyf__toast--success",
                backgroundColor: "#3dc763",
                icon: {className: "notyf__icon--success", tagName: "i"}
            }, {
                type: "error",
                className: "notyf__toast--error",
                backgroundColor: "#ed3d3d",
                icon: {className: "notyf__icon--error", tagName: "i"}
            }], duration: 2e3, ripple: !0, position: {x: "right", y: "bottom"}, dismissible: !1
        }, c = function () {
            function e() {
                this.notifications = [], this.events = {}, this.X_POSITION_FLEX_MAP = {
                    left: "flex-start",
                    center: "center",
                    right: "flex-end"
                }, this.Y_POSITION_FLEX_MAP = {top: "flex-start", center: "center", bottom: "flex-end"};
                var e = document.createDocumentFragment(),
                    t = this._createHTMLElement({tagName: "div", className: "notyf"});
                e.appendChild(t), document.body.appendChild(e), this.container = t, this.animationEndEventName = this._getAnimationEndEventName(), this._createA11yContainer()
            }

            return e.prototype.on = function (e, t) {
                var n;
                this.events = i(i({}, this.events), ((n = {})[e] = t, n))
            }, e.prototype.update = function (e, t) {
                t === n.NotyfArrayEvent.Add ? this.addNotification(e) : t === n.NotyfArrayEvent.Remove && this.removeNotification(e)
            }, e.prototype.removeNotification = function (e) {
                var t, n, r = this, i = this._popRenderedNotification(e);
                i && ((t = i.node).classList.add("notyf__toast--disappear"), t.addEventListener(this.animationEndEventName, n = function (e) {
                    e.target === t && (t.removeEventListener(r.animationEndEventName, n), r.container.removeChild(t))
                }))
            }, e.prototype.addNotification = function (e) {
                var t = this._renderNotification(e);
                this.notifications.push({notification: e, node: t}), this._announce(e.options.message || "Notification")
            }, e.prototype._renderNotification = function (e) {
                var t, n = this._buildNotificationCard(e), r = e.options.className;
                return r && (t = n.classList).add.apply(t, r.split(" ")), this.container.appendChild(n), n
            }, e.prototype._popRenderedNotification = function (e) {
                for (var t = -1, n = 0; n < this.notifications.length && t < 0; n++) this.notifications[n].notification === e && (t = n);
                if (-1 !== t) return this.notifications.splice(t, 1)[0]
            }, e.prototype.getXPosition = function (e) {
                var t;
                return (null === (t = null == e ? void 0 : e.position) || void 0 === t ? void 0 : t.x) || "right"
            }, e.prototype.getYPosition = function (e) {
                var t;
                return (null === (t = null == e ? void 0 : e.position) || void 0 === t ? void 0 : t.y) || "bottom"
            }, e.prototype.adjustContainerAlignment = function (e) {
                var t = this.X_POSITION_FLEX_MAP[this.getXPosition(e)],
                    n = this.Y_POSITION_FLEX_MAP[this.getYPosition(e)], r = this.container.style;
                r.setProperty("justify-content", n), r.setProperty("align-items", t)
            }, e.prototype._buildNotificationCard = function (e) {
                var t = this, r = e.options, i = r.icon;
                this.adjustContainerAlignment(r);
                var o = this._createHTMLElement({tagName: "div", className: "notyf__toast"}),
                    s = this._createHTMLElement({tagName: "div", className: "notyf__ripple"}),
                    a = this._createHTMLElement({tagName: "div", className: "notyf__wrapper"}),
                    l = this._createHTMLElement({tagName: "div", className: "notyf__message"});
                l.innerHTML = r.message || "";
                var c = r.background || r.backgroundColor;
                if (i) {
                    var u = this._createHTMLElement({tagName: "div", className: "notyf__icon"});
                    if (("string" == typeof i || i instanceof String) && (u.innerHTML = new String(i).valueOf()), "object" == typeof i) {
                        var d = i.tagName, f = void 0 === d ? "i" : d, p = i.className, h = i.text, y = i.color,
                            m = void 0 === y ? c : y, v = this._createHTMLElement({tagName: f, className: p, text: h});
                        m && (v.style.color = m), u.appendChild(v)
                    }
                    a.appendChild(u)
                }
                if (a.appendChild(l), o.appendChild(a), c && (r.ripple ? (s.style.background = c, o.appendChild(s)) : o.style.background = c), r.dismissible) {
                    var g = this._createHTMLElement({tagName: "div", className: "notyf__dismiss"}),
                        b = this._createHTMLElement({tagName: "button", className: "notyf__dismiss-btn"});
                    g.appendChild(b), a.appendChild(g), o.classList.add("notyf__toast--dismissible"), b.addEventListener("click", (function (r) {
                        var i, o;
                        null === (o = (i = t.events)[n.NotyfEvent.Dismiss]) || void 0 === o || o.call(i, {
                            target: e,
                            event: r
                        }), r.stopPropagation()
                    }))
                }
                o.addEventListener("click", (function (r) {
                    var i, o;
                    return null === (o = (i = t.events)[n.NotyfEvent.Click]) || void 0 === o ? void 0 : o.call(i, {
                        target: e,
                        event: r
                    })
                }));
                var w = "top" === this.getYPosition(r) ? "upper" : "lower";
                return o.classList.add("notyf__toast--" + w), o
            }, e.prototype._createHTMLElement = function (e) {
                var t = e.tagName, n = e.className, r = e.text, i = document.createElement(t);
                return n && (i.className = n), i.textContent = r || null, i
            }, e.prototype._createA11yContainer = function () {
                var e = this._createHTMLElement({tagName: "div", className: "notyf-announcer"});
                e.setAttribute("aria-atomic", "true"), e.setAttribute("aria-live", "polite"), e.style.border = "0", e.style.clip = "rect(0 0 0 0)", e.style.height = "1px", e.style.margin = "-1px", e.style.overflow = "hidden", e.style.padding = "0", e.style.position = "absolute", e.style.width = "1px", e.style.outline = "0", document.body.appendChild(e), this.a11yContainer = e
            }, e.prototype._announce = function (e) {
                var t = this;
                this.a11yContainer.textContent = "", setTimeout((function () {
                    t.a11yContainer.textContent = e
                }), 100)
            }, e.prototype._getAnimationEndEventName = function () {
                var e, t = document.createElement("_fake"), n = {
                    MozTransition: "animationend",
                    OTransition: "oAnimationEnd",
                    WebkitTransition: "webkitAnimationEnd",
                    transition: "animationend"
                };
                for (e in n) if (void 0 !== t.style[e]) return n[e];
                return "animationend"
            }, e
        }(), u = function () {
            function e(e) {
                var t = this;
                this.dismiss = this._removeNotification, this.notifications = new a, this.view = new c;
                var r = this.registerTypes(e);
                this.options = i(i({}, l), e), this.options.types = r, this.notifications.onUpdate((function (e, n) {
                    return t.view.update(e, n)
                })), this.view.on(n.NotyfEvent.Dismiss, (function (e) {
                    var r = e.target, i = e.event;
                    t._removeNotification(r), r.triggerEvent(n.NotyfEvent.Dismiss, i)
                })), this.view.on(n.NotyfEvent.Click, (function (e) {
                    var t = e.target, r = e.event;
                    return t.triggerEvent(n.NotyfEvent.Click, r)
                }))
            }

            return e.prototype.error = function (e) {
                var t = this.normalizeOptions("error", e);
                return this.open(t)
            }, e.prototype.success = function (e) {
                var t = this.normalizeOptions("success", e);
                return this.open(t)
            }, e.prototype.open = function (e) {
                var t = this.options.types.find((function (t) {
                    return t.type === e.type
                })) || {}, n = i(i({}, t), e);
                this.assignProps(["ripple", "position", "dismissible"], n);
                var r = new o(n);
                return this._pushNotification(r), r
            }, e.prototype.dismissAll = function () {
                for (; this.notifications.splice(0, 1);) ;
            }, e.prototype.assignProps = function (e, t) {
                var n = this;
                e.forEach((function (e) {
                    t[e] = null == t[e] ? n.options[e] : t[e]
                }))
            }, e.prototype._pushNotification = function (e) {
                var t = this;
                this.notifications.push(e);
                var n = void 0 !== e.options.duration ? e.options.duration : this.options.duration;
                n && setTimeout((function () {
                    return t._removeNotification(e)
                }), n)
            }, e.prototype._removeNotification = function (e) {
                var t = this.notifications.indexOf(e);
                -1 !== t && this.notifications.splice(t, 1)
            }, e.prototype.normalizeOptions = function (e, t) {
                var n = {type: e};
                return "string" == typeof t ? n.message = t : "object" == typeof t && (n = i(i({}, n), t)), n
            }, e.prototype.registerTypes = function (e) {
                var t = (e && e.types || []).slice();
                return l.types.map((function (e) {
                    var n = -1;
                    t.forEach((function (t, r) {
                        t.type === e.type && (n = r)
                    }));
                    var r = -1 !== n ? t.splice(n, 1)[0] : {};
                    return i(i({}, e), r)
                })).concat(t)
            }, e
        }();
        n.DEFAULT_OPTIONS = l, n.Notyf = u, n.NotyfArray = a, n.NotyfNotification = o, n.NotyfView = c
    }, {}],
    138: [function (e, t, n) {
        var r;
        r = function () {
            return function () {
                var e = {
                    9662: function (e, t, n) {
                        var r = n(614), i = n(6330), o = TypeError;
                        e.exports = function (e) {
                            if (r(e)) return e;
                            throw o(i(e) + " is not a function")
                        }
                    }, 9483: function (e, t, n) {
                        var r = n(4411), i = n(6330), o = TypeError;
                        e.exports = function (e) {
                            if (r(e)) return e;
                            throw o(i(e) + " is not a constructor")
                        }
                    }, 6077: function (e, t, n) {
                        var r = n(614), i = String, o = TypeError;
                        e.exports = function (e) {
                            if ("object" == typeof e || r(e)) return e;
                            throw o("Can't set " + i(e) + " as a prototype")
                        }
                    }, 1223: function (e, t, n) {
                        var r = n(5112), i = n(30), o = n(3070).f, s = r("unscopables"), a = Array.prototype;
                        null == a[s] && o(a, s, {configurable: !0, value: i(null)}), e.exports = function (e) {
                            a[s][e] = !0
                        }
                    }, 1530: function (e, t, n) {
                        "use strict";
                        var r = n(8710).charAt;
                        e.exports = function (e, t, n) {
                            return t + (n ? r(e, t).length : 1)
                        }
                    }, 9670: function (e, t, n) {
                        var r = n(111), i = String, o = TypeError;
                        e.exports = function (e) {
                            if (r(e)) return e;
                            throw o(i(e) + " is not an object")
                        }
                    }, 8533: function (e, t, n) {
                        "use strict";
                        var r = n(2092).forEach, i = n(9341)("forEach");
                        e.exports = i ? [].forEach : function (e) {
                            return r(this, e, arguments.length > 1 ? arguments[1] : void 0)
                        }
                    }, 8457: function (e, t, n) {
                        "use strict";
                        var r = n(9974), i = n(6916), o = n(7908), s = n(3411), a = n(7659), l = n(4411), c = n(6244),
                            u = n(6135), d = n(8554), f = n(1246), p = Array;
                        e.exports = function (e) {
                            var t = o(e), n = l(this), h = arguments.length, y = h > 1 ? arguments[1] : void 0,
                                m = void 0 !== y;
                            m && (y = r(y, h > 2 ? arguments[2] : void 0));
                            var v, g, b, w, _, x, k = f(t), j = 0;
                            if (!k || this === p && a(k)) for (v = c(t), g = n ? new this(v) : p(v); v > j; j++) x = m ? y(t[j], j) : t[j], u(g, j, x); else for (_ = (w = d(t, k)).next, g = n ? new this : []; !(b = i(_, w)).done; j++) x = m ? s(w, y, [b.value, j], !0) : b.value, u(g, j, x);
                            return g.length = j, g
                        }
                    }, 1318: function (e, t, n) {
                        var r = n(5656), i = n(1400), o = n(6244), s = function (e) {
                            return function (t, n, s) {
                                var a, l = r(t), c = o(l), u = i(s, c);
                                if (e && n != n) {
                                    for (; c > u;) if ((a = l[u++]) != a) return !0
                                } else for (; c > u; u++) if ((e || u in l) && l[u] === n) return e || u || 0;
                                return !e && -1
                            }
                        };
                        e.exports = {includes: s(!0), indexOf: s(!1)}
                    }, 2092: function (e, t, n) {
                        var r = n(9974), i = n(1702), o = n(8361), s = n(7908), a = n(6244), l = n(5417),
                            c = i([].push), u = function (e) {
                                var t = 1 == e, n = 2 == e, i = 3 == e, u = 4 == e, d = 6 == e, f = 7 == e, p = 5 == e || d;
                                return function (h, y, m, v) {
                                    for (var g, b, w = s(h), _ = o(w), x = r(y, m), k = a(_), j = 0, C = v || l, E = t ? C(h, k) : n || f ? C(h, 0) : void 0; k > j; j++) if ((p || j in _) && (b = x(g = _[j], j, w), e)) if (t) E[j] = b; else if (b) switch (e) {
                                        case 3:
                                            return !0;
                                        case 5:
                                            return g;
                                        case 6:
                                            return j;
                                        case 2:
                                            c(E, g)
                                    } else switch (e) {
                                        case 4:
                                            return !1;
                                        case 7:
                                            c(E, g)
                                    }
                                    return d ? -1 : i || u ? u : E
                                }
                            };
                        e.exports = {
                            forEach: u(0),
                            map: u(1),
                            filter: u(2),
                            some: u(3),
                            every: u(4),
                            find: u(5),
                            findIndex: u(6),
                            filterReject: u(7)
                        }
                    }, 1194: function (e, t, n) {
                        var r = n(7293), i = n(5112), o = n(7392), s = i("species");
                        e.exports = function (e) {
                            return o >= 51 || !r((function () {
                                var t = [];
                                return (t.constructor = {})[s] = function () {
                                    return {foo: 1}
                                }, 1 !== t[e](Boolean).foo
                            }))
                        }
                    }, 9341: function (e, t, n) {
                        "use strict";
                        var r = n(7293);
                        e.exports = function (e, t) {
                            var n = [][e];
                            return !!n && r((function () {
                                n.call(null, t || function () {
                                    return 1
                                }, 1)
                            }))
                        }
                    }, 3671: function (e, t, n) {
                        var r = n(9662), i = n(7908), o = n(8361), s = n(6244), a = TypeError, l = function (e) {
                            return function (t, n, l, c) {
                                r(n);
                                var u = i(t), d = o(u), f = s(u), p = e ? f - 1 : 0, h = e ? -1 : 1;
                                if (l < 2) for (; ;) {
                                    if (p in d) {
                                        c = d[p], p += h;
                                        break
                                    }
                                    if (p += h, e ? p < 0 : f <= p) throw a("Reduce of empty array with no initial value")
                                }
                                for (; e ? p >= 0 : f > p; p += h) p in d && (c = n(c, d[p], p, u));
                                return c
                            }
                        };
                        e.exports = {left: l(!1), right: l(!0)}
                    }, 1589: function (e, t, n) {
                        var r = n(1400), i = n(6244), o = n(6135), s = Array, a = Math.max;
                        e.exports = function (e, t, n) {
                            for (var l = i(e), c = r(t, l), u = r(void 0 === n ? l : n, l), d = s(a(u - c, 0)), f = 0; c < u; c++, f++) o(d, f, e[c]);
                            return d.length = f, d
                        }
                    }, 206: function (e, t, n) {
                        var r = n(1702);
                        e.exports = r([].slice)
                    }, 4362: function (e, t, n) {
                        var r = n(1589), i = Math.floor, o = function (e, t) {
                            var n = e.length, l = i(n / 2);
                            return n < 8 ? s(e, t) : a(e, o(r(e, 0, l), t), o(r(e, l), t), t)
                        }, s = function (e, t) {
                            for (var n, r, i = e.length, o = 1; o < i;) {
                                for (r = o, n = e[o]; r && t(e[r - 1], n) > 0;) e[r] = e[--r];
                                r !== o++ && (e[r] = n)
                            }
                            return e
                        }, a = function (e, t, n, r) {
                            for (var i = t.length, o = n.length, s = 0, a = 0; s < i || a < o;) e[s + a] = s < i && a < o ? r(t[s], n[a]) <= 0 ? t[s++] : n[a++] : s < i ? t[s++] : n[a++];
                            return e
                        };
                        e.exports = o
                    }, 7475: function (e, t, n) {
                        var r = n(3157), i = n(4411), o = n(111), s = n(5112)("species"), a = Array;
                        e.exports = function (e) {
                            var t;
                            return r(e) && (t = e.constructor, (i(t) && (t === a || r(t.prototype)) || o(t) && null === (t = t[s])) && (t = void 0)), void 0 === t ? a : t
                        }
                    }, 5417: function (e, t, n) {
                        var r = n(7475);
                        e.exports = function (e, t) {
                            return new (r(e))(0 === t ? 0 : t)
                        }
                    }, 3411: function (e, t, n) {
                        var r = n(9670), i = n(9212);
                        e.exports = function (e, t, n, o) {
                            try {
                                return o ? t(r(n)[0], n[1]) : t(n)
                            } catch (t) {
                                i(e, "throw", t)
                            }
                        }
                    }, 7072: function (e, t, n) {
                        var r = n(5112)("iterator"), i = !1;
                        try {
                            var o = 0, s = {
                                next: function () {
                                    return {done: !!o++}
                                }, return: function () {
                                    i = !0
                                }
                            };
                            s[r] = function () {
                                return this
                            }, Array.from(s, (function () {
                                throw 2
                            }))
                        } catch (e) {
                        }
                        e.exports = function (e, t) {
                            if (!t && !i) return !1;
                            var n = !1;
                            try {
                                var o = {};
                                o[r] = function () {
                                    return {
                                        next: function () {
                                            return {done: n = !0}
                                        }
                                    }
                                }, e(o)
                            } catch (e) {
                            }
                            return n
                        }
                    }, 4326: function (e, t, n) {
                        var r = n(1702), i = r({}.toString), o = r("".slice);
                        e.exports = function (e) {
                            return o(i(e), 8, -1)
                        }
                    }, 648: function (e, t, n) {
                        var r = n(1694), i = n(614), o = n(4326), s = n(5112)("toStringTag"), a = Object,
                            l = "Arguments" == o(function () {
                                return arguments
                            }());
                        e.exports = r ? o : function (e) {
                            var t, n, r;
                            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {
                                try {
                                    return e[t]
                                } catch (e) {
                                }
                            }(t = a(e), s)) ? n : l ? o(t) : "Object" == (r = o(t)) && i(t.callee) ? "Arguments" : r
                        }
                    }, 9920: function (e, t, n) {
                        var r = n(2597), i = n(3887), o = n(1236), s = n(3070);
                        e.exports = function (e, t, n) {
                            for (var a = i(t), l = s.f, c = o.f, u = 0; u < a.length; u++) {
                                var d = a[u];
                                r(e, d) || n && r(n, d) || l(e, d, c(t, d))
                            }
                        }
                    }, 4964: function (e, t, n) {
                        var r = n(5112)("match");
                        e.exports = function (e) {
                            var t = /./;
                            try {
                                "/./"[e](t)
                            } catch (n) {
                                try {
                                    return t[r] = !1, "/./"[e](t)
                                } catch (e) {
                                }
                            }
                            return !1
                        }
                    }, 8544: function (e, t, n) {
                        var r = n(7293);
                        e.exports = !r((function () {
                            function e() {
                            }

                            return e.prototype.constructor = null, Object.getPrototypeOf(new e) !== e.prototype
                        }))
                    }, 4994: function (e, t, n) {
                        "use strict";
                        var r = n(3383).IteratorPrototype, i = n(30), o = n(9114), s = n(8003), a = n(7497),
                            l = function () {
                                return this
                            };
                        e.exports = function (e, t, n, c) {
                            var u = t + " Iterator";
                            return e.prototype = i(r, {next: o(+!c, n)}), s(e, u, !1, !0), a[u] = l, e
                        }
                    }, 8880: function (e, t, n) {
                        var r = n(9781), i = n(3070), o = n(9114);
                        e.exports = r ? function (e, t, n) {
                            return i.f(e, t, o(1, n))
                        } : function (e, t, n) {
                            return e[t] = n, e
                        }
                    }, 9114: function (e) {
                        e.exports = function (e, t) {
                            return {enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t}
                        }
                    }, 6135: function (e, t, n) {
                        "use strict";
                        var r = n(4948), i = n(3070), o = n(9114);
                        e.exports = function (e, t, n) {
                            var s = r(t);
                            s in e ? i.f(e, s, o(0, n)) : e[s] = n
                        }
                    }, 8052: function (e, t, n) {
                        var r = n(614), i = n(3070), o = n(6339), s = n(3072);
                        e.exports = function (e, t, n, a) {
                            a || (a = {});
                            var l = a.enumerable, c = void 0 !== a.name ? a.name : t;
                            if (r(n) && o(n, c, a), a.global) l ? e[t] = n : s(t, n); else {
                                try {
                                    a.unsafe ? e[t] && (l = !0) : delete e[t]
                                } catch (e) {
                                }
                                l ? e[t] = n : i.f(e, t, {
                                    value: n,
                                    enumerable: !1,
                                    configurable: !a.nonConfigurable,
                                    writable: !a.nonWritable
                                })
                            }
                            return e
                        }
                    }, 3072: function (e, t, n) {
                        var r = n(7854), i = Object.defineProperty;
                        e.exports = function (e, t) {
                            try {
                                i(r, e, {value: t, configurable: !0, writable: !0})
                            } catch (n) {
                                r[e] = t
                            }
                            return t
                        }
                    }, 654: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(6916), o = n(1913), s = n(6530), a = n(614), l = n(4994), c = n(9518),
                            u = n(7674), d = n(8003), f = n(8880), p = n(8052), h = n(5112), y = n(7497), m = n(3383),
                            v = s.PROPER, g = s.CONFIGURABLE, b = m.IteratorPrototype, w = m.BUGGY_SAFARI_ITERATORS,
                            _ = h("iterator"), x = "keys", k = "values", j = "entries", C = function () {
                                return this
                            };
                        e.exports = function (e, t, n, s, h, m, E) {
                            l(n, t, s);
                            var S, D, O, P = function (e) {
                                    if (e === h && T) return T;
                                    if (!w && e in M) return M[e];
                                    switch (e) {
                                        case x:
                                        case k:
                                        case j:
                                            return function () {
                                                return new n(this, e)
                                            }
                                    }
                                    return function () {
                                        return new n(this)
                                    }
                                }, B = t + " Iterator", A = !1, M = e.prototype, I = M[_] || M["@@iterator"] || h && M[h],
                                T = !w && I || P(h), L = "Array" == t && M.entries || I;
                            if (L && (S = c(L.call(new e))) !== Object.prototype && S.next && (o || c(S) === b || (u ? u(S, b) : a(S[_]) || p(S, _, C)), d(S, B, !0, !0), o && (y[B] = C)), v && h == k && I && I.name !== k && (!o && g ? f(M, "name", k) : (A = !0, T = function () {
                                return i(I, this)
                            })), h) if (D = {
                                values: P(k),
                                keys: m ? T : P(x),
                                entries: P(j)
                            }, E) for (O in D) (w || A || !(O in M)) && p(M, O, D[O]); else r({
                                target: t,
                                proto: !0,
                                forced: w || A
                            }, D);
                            return o && !E || M[_] === T || p(M, _, T, {name: h}), y[t] = T, D
                        }
                    }, 7235: function (e, t, n) {
                        var r = n(857), i = n(2597), o = n(6061), s = n(3070).f;
                        e.exports = function (e) {
                            var t = r.Symbol || (r.Symbol = {});
                            i(t, e) || s(t, e, {value: o.f(e)})
                        }
                    }, 5117: function (e, t, n) {
                        "use strict";
                        var r = n(6330), i = TypeError;
                        e.exports = function (e, t) {
                            if (!delete e[t]) throw i("Cannot delete property " + r(t) + " of " + r(e))
                        }
                    }, 9781: function (e, t, n) {
                        var r = n(7293);
                        e.exports = !r((function () {
                            return 7 != Object.defineProperty({}, 1, {
                                get: function () {
                                    return 7
                                }
                            })[1]
                        }))
                    }, 317: function (e, t, n) {
                        var r = n(7854), i = n(111), o = r.document, s = i(o) && i(o.createElement);
                        e.exports = function (e) {
                            return s ? o.createElement(e) : {}
                        }
                    }, 7207: function (e) {
                        var t = TypeError;
                        e.exports = function (e) {
                            if (e > 9007199254740991) throw t("Maximum allowed index exceeded");
                            return e
                        }
                    }, 8324: function (e) {
                        e.exports = {
                            CSSRuleList: 0,
                            CSSStyleDeclaration: 0,
                            CSSValueList: 0,
                            ClientRectList: 0,
                            DOMRectList: 0,
                            DOMStringList: 0,
                            DOMTokenList: 1,
                            DataTransferItemList: 0,
                            FileList: 0,
                            HTMLAllCollection: 0,
                            HTMLCollection: 0,
                            HTMLFormElement: 0,
                            HTMLSelectElement: 0,
                            MediaList: 0,
                            MimeTypeArray: 0,
                            NamedNodeMap: 0,
                            NodeList: 1,
                            PaintRequestList: 0,
                            Plugin: 0,
                            PluginArray: 0,
                            SVGLengthList: 0,
                            SVGNumberList: 0,
                            SVGPathSegList: 0,
                            SVGPointList: 0,
                            SVGStringList: 0,
                            SVGTransformList: 0,
                            SourceBufferList: 0,
                            StyleSheetList: 0,
                            TextTrackCueList: 0,
                            TextTrackList: 0,
                            TouchList: 0
                        }
                    }, 8509: function (e, t, n) {
                        var r = n(317)("span").classList, i = r && r.constructor && r.constructor.prototype;
                        e.exports = i === Object.prototype ? void 0 : i
                    }, 8886: function (e, t, n) {
                        var r = n(8113).match(/firefox\/(\d+)/i);
                        e.exports = !!r && +r[1]
                    }, 256: function (e, t, n) {
                        var r = n(8113);
                        e.exports = /MSIE|Trident/.test(r)
                    }, 5268: function (e, t, n) {
                        var r = n(4326), i = n(7854);
                        e.exports = "process" == r(i.process)
                    }, 8113: function (e, t, n) {
                        var r = n(5005);
                        e.exports = r("navigator", "userAgent") || ""
                    }, 7392: function (e, t, n) {
                        var r, i, o = n(7854), s = n(8113), a = o.process, l = o.Deno,
                            c = a && a.versions || l && l.version, u = c && c.v8;
                        u && (i = (r = u.split("."))[0] > 0 && r[0] < 4 ? 1 : +(r[0] + r[1])), !i && s && (!(r = s.match(/Edge\/(\d+)/)) || r[1] >= 74) && (r = s.match(/Chrome\/(\d+)/)) && (i = +r[1]), e.exports = i
                    }, 8008: function (e, t, n) {
                        var r = n(8113).match(/AppleWebKit\/(\d+)\./);
                        e.exports = !!r && +r[1]
                    }, 748: function (e) {
                        e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
                    }, 2109: function (e, t, n) {
                        var r = n(7854), i = n(1236).f, o = n(8880), s = n(8052), a = n(3072), l = n(9920), c = n(4705);
                        e.exports = function (e, t) {
                            var n, u, d, f, p, h = e.target, y = e.global, m = e.stat;
                            if (n = y ? r : m ? r[h] || a(h, {}) : (r[h] || {}).prototype) for (u in t) {
                                if (f = t[u], d = e.dontCallGetSet ? (p = i(n, u)) && p.value : n[u], !c(y ? u : h + (m ? "." : "#") + u, e.forced) && void 0 !== d) {
                                    if (typeof f == typeof d) continue;
                                    l(f, d)
                                }
                                (e.sham || d && d.sham) && o(f, "sham", !0), s(n, u, f, e)
                            }
                        }
                    }, 7293: function (e) {
                        e.exports = function (e) {
                            try {
                                return !!e()
                            } catch (e) {
                                return !0
                            }
                        }
                    }, 7007: function (e, t, n) {
                        "use strict";
                        n(4916);
                        var r = n(1702), i = n(8052), o = n(2261), s = n(7293), a = n(5112), l = n(8880),
                            c = a("species"), u = RegExp.prototype;
                        e.exports = function (e, t, n, d) {
                            var f = a(e), p = !s((function () {
                                var t = {};
                                return t[f] = function () {
                                    return 7
                                }, 7 != ""[e](t)
                            })), h = p && !s((function () {
                                var t = !1, n = /a/;
                                return "split" === e && ((n = {}).constructor = {}, n.constructor[c] = function () {
                                    return n
                                }, n.flags = "", n[f] = /./[f]), n.exec = function () {
                                    return t = !0, null
                                }, n[f](""), !t
                            }));
                            if (!p || !h || n) {
                                var y = r(/./[f]), m = t(f, ""[e], (function (e, t, n, i, s) {
                                    var a = r(e), l = t.exec;
                                    return l === o || l === u.exec ? p && !s ? {
                                        done: !0,
                                        value: y(t, n, i)
                                    } : {done: !0, value: a(n, t, i)} : {done: !1}
                                }));
                                i(String.prototype, e, m[0]), i(u, f, m[1])
                            }
                            d && l(u[f], "sham", !0)
                        }
                    }, 2104: function (e, t, n) {
                        var r = n(4374), i = Function.prototype, o = i.apply, s = i.call;
                        e.exports = "object" == typeof Reflect && Reflect.apply || (r ? s.bind(o) : function () {
                            return s.apply(o, arguments)
                        })
                    }, 9974: function (e, t, n) {
                        var r = n(1702), i = n(9662), o = n(4374), s = r(r.bind);
                        e.exports = function (e, t) {
                            return i(e), void 0 === t ? e : o ? s(e, t) : function () {
                                return e.apply(t, arguments)
                            }
                        }
                    }, 4374: function (e, t, n) {
                        var r = n(7293);
                        e.exports = !r((function () {
                            var e = function () {
                            }.bind();
                            return "function" != typeof e || e.hasOwnProperty("prototype")
                        }))
                    }, 6916: function (e, t, n) {
                        var r = n(4374), i = Function.prototype.call;
                        e.exports = r ? i.bind(i) : function () {
                            return i.apply(i, arguments)
                        }
                    }, 6530: function (e, t, n) {
                        var r = n(9781), i = n(2597), o = Function.prototype, s = r && Object.getOwnPropertyDescriptor,
                            a = i(o, "name"), l = a && "something" === function () {
                            }.name, c = a && (!r || r && s(o, "name").configurable);
                        e.exports = {EXISTS: a, PROPER: l, CONFIGURABLE: c}
                    }, 1702: function (e, t, n) {
                        var r = n(4374), i = Function.prototype, o = i.bind, s = i.call, a = r && o.bind(s, s);
                        e.exports = r ? function (e) {
                            return e && a(e)
                        } : function (e) {
                            return e && function () {
                                return s.apply(e, arguments)
                            }
                        }
                    }, 5005: function (e, t, n) {
                        var r = n(7854), i = n(614), o = function (e) {
                            return i(e) ? e : void 0
                        };
                        e.exports = function (e, t) {
                            return arguments.length < 2 ? o(r[e]) : r[e] && r[e][t]
                        }
                    }, 1246: function (e, t, n) {
                        var r = n(648), i = n(8173), o = n(7497), s = n(5112)("iterator");
                        e.exports = function (e) {
                            if (null != e) return i(e, s) || i(e, "@@iterator") || o[r(e)]
                        }
                    }, 8554: function (e, t, n) {
                        var r = n(6916), i = n(9662), o = n(9670), s = n(6330), a = n(1246), l = TypeError;
                        e.exports = function (e, t) {
                            var n = arguments.length < 2 ? a(e) : t;
                            if (i(n)) return o(r(n, e));
                            throw l(s(e) + " is not iterable")
                        }
                    }, 8173: function (e, t, n) {
                        var r = n(9662);
                        e.exports = function (e, t) {
                            var n = e[t];
                            return null == n ? void 0 : r(n)
                        }
                    }, 647: function (e, t, n) {
                        var r = n(1702), i = n(7908), o = Math.floor, s = r("".charAt), a = r("".replace),
                            l = r("".slice), c = /\$([$&'`]|\d{1,2}|<[^>]*>)/g, u = /\$([$&'`]|\d{1,2})/g;
                        e.exports = function (e, t, n, r, d, f) {
                            var p = n + e.length, h = r.length, y = u;
                            return void 0 !== d && (d = i(d), y = c), a(f, y, (function (i, a) {
                                var c;
                                switch (s(a, 0)) {
                                    case"$":
                                        return "$";
                                    case"&":
                                        return e;
                                    case"`":
                                        return l(t, 0, n);
                                    case"'":
                                        return l(t, p);
                                    case"<":
                                        c = d[l(a, 1, -1)];
                                        break;
                                    default:
                                        var u = +a;
                                        if (0 === u) return i;
                                        if (u > h) {
                                            var f = o(u / 10);
                                            return 0 === f ? i : f <= h ? void 0 === r[f - 1] ? s(a, 1) : r[f - 1] + s(a, 1) : i
                                        }
                                        c = r[u - 1]
                                }
                                return void 0 === c ? "" : c
                            }))
                        }
                    }, 7854: function (e, t, n) {
                        var r = function (e) {
                            return e && e.Math == Math && e
                        };
                        e.exports = r("object" == typeof globalThis && globalThis) || r("object" == typeof window && window) || r("object" == typeof self && self) || r("object" == typeof n.g && n.g) || function () {
                            return this
                        }() || Function("return this")()
                    }, 2597: function (e, t, n) {
                        var r = n(1702), i = n(7908), o = r({}.hasOwnProperty);
                        e.exports = Object.hasOwn || function (e, t) {
                            return o(i(e), t)
                        }
                    }, 3501: function (e) {
                        e.exports = {}
                    }, 490: function (e, t, n) {
                        var r = n(5005);
                        e.exports = r("document", "documentElement")
                    }, 4664: function (e, t, n) {
                        var r = n(9781), i = n(7293), o = n(317);
                        e.exports = !r && !i((function () {
                            return 7 != Object.defineProperty(o("div"), "a", {
                                get: function () {
                                    return 7
                                }
                            }).a
                        }))
                    }, 8361: function (e, t, n) {
                        var r = n(1702), i = n(7293), o = n(4326), s = Object, a = r("".split);
                        e.exports = i((function () {
                            return !s("z").propertyIsEnumerable(0)
                        })) ? function (e) {
                            return "String" == o(e) ? a(e, "") : s(e)
                        } : s
                    }, 9587: function (e, t, n) {
                        var r = n(614), i = n(111), o = n(7674);
                        e.exports = function (e, t, n) {
                            var s, a;
                            return o && r(s = t.constructor) && s !== n && i(a = s.prototype) && a !== n.prototype && o(e, a), e
                        }
                    }, 2788: function (e, t, n) {
                        var r = n(1702), i = n(614), o = n(5465), s = r(Function.toString);
                        i(o.inspectSource) || (o.inspectSource = function (e) {
                            return s(e)
                        }), e.exports = o.inspectSource
                    }, 9909: function (e, t, n) {
                        var r, i, o, s = n(8536), a = n(7854), l = n(1702), c = n(111), u = n(8880), d = n(2597),
                            f = n(5465), p = n(6200), h = n(3501), y = "Object already initialized", m = a.TypeError,
                            v = a.WeakMap;
                        if (s || f.state) {
                            var g = f.state || (f.state = new v), b = l(g.get), w = l(g.has), _ = l(g.set);
                            r = function (e, t) {
                                if (w(g, e)) throw new m(y);
                                return t.facade = e, _(g, e, t), t
                            }, i = function (e) {
                                return b(g, e) || {}
                            }, o = function (e) {
                                return w(g, e)
                            }
                        } else {
                            var x = p("state");
                            h[x] = !0, r = function (e, t) {
                                if (d(e, x)) throw new m(y);
                                return t.facade = e, u(e, x, t), t
                            }, i = function (e) {
                                return d(e, x) ? e[x] : {}
                            }, o = function (e) {
                                return d(e, x)
                            }
                        }
                        e.exports = {
                            set: r, get: i, has: o, enforce: function (e) {
                                return o(e) ? i(e) : r(e, {})
                            }, getterFor: function (e) {
                                return function (t) {
                                    var n;
                                    if (!c(t) || (n = i(t)).type !== e) throw m("Incompatible receiver, " + e + " required");
                                    return n
                                }
                            }
                        }
                    }, 7659: function (e, t, n) {
                        var r = n(5112), i = n(7497), o = r("iterator"), s = Array.prototype;
                        e.exports = function (e) {
                            return void 0 !== e && (i.Array === e || s[o] === e)
                        }
                    }, 3157: function (e, t, n) {
                        var r = n(4326);
                        e.exports = Array.isArray || function (e) {
                            return "Array" == r(e)
                        }
                    }, 614: function (e) {
                        e.exports = function (e) {
                            return "function" == typeof e
                        }
                    }, 4411: function (e, t, n) {
                        var r = n(1702), i = n(7293), o = n(614), s = n(648), a = n(5005), l = n(2788),
                            c = function () {
                            }, u = [], d = a("Reflect", "construct"), f = /^\s*(?:class|function)\b/, p = r(f.exec),
                            h = !f.exec(c), y = function (e) {
                                if (!o(e)) return !1;
                                try {
                                    return d(c, u, e), !0
                                } catch (e) {
                                    return !1
                                }
                            }, m = function (e) {
                                if (!o(e)) return !1;
                                switch (s(e)) {
                                    case"AsyncFunction":
                                    case"GeneratorFunction":
                                    case"AsyncGeneratorFunction":
                                        return !1
                                }
                                try {
                                    return h || !!p(f, l(e))
                                } catch (e) {
                                    return !0
                                }
                            };
                        m.sham = !0, e.exports = !d || i((function () {
                            var e;
                            return y(y.call) || !y(Object) || !y((function () {
                                e = !0
                            })) || e
                        })) ? m : y
                    }, 4705: function (e, t, n) {
                        var r = n(7293), i = n(614), o = /#|\.prototype\./, s = function (e, t) {
                            var n = l[a(e)];
                            return n == u || n != c && (i(t) ? r(t) : !!t)
                        }, a = s.normalize = function (e) {
                            return String(e).replace(o, ".").toLowerCase()
                        }, l = s.data = {}, c = s.NATIVE = "N", u = s.POLYFILL = "P";
                        e.exports = s
                    }, 5988: function (e, t, n) {
                        var r = n(111), i = Math.floor;
                        e.exports = Number.isInteger || function (e) {
                            return !r(e) && isFinite(e) && i(e) === e
                        }
                    }, 111: function (e, t, n) {
                        var r = n(614);
                        e.exports = function (e) {
                            return "object" == typeof e ? null !== e : r(e)
                        }
                    }, 1913: function (e) {
                        e.exports = !1
                    }, 7850: function (e, t, n) {
                        var r = n(111), i = n(4326), o = n(5112)("match");
                        e.exports = function (e) {
                            var t;
                            return r(e) && (void 0 !== (t = e[o]) ? !!t : "RegExp" == i(e))
                        }
                    }, 2190: function (e, t, n) {
                        var r = n(5005), i = n(614), o = n(7976), s = n(3307), a = Object;
                        e.exports = s ? function (e) {
                            return "symbol" == typeof e
                        } : function (e) {
                            var t = r("Symbol");
                            return i(t) && o(t.prototype, a(e))
                        }
                    }, 9212: function (e, t, n) {
                        var r = n(6916), i = n(9670), o = n(8173);
                        e.exports = function (e, t, n) {
                            var s, a;
                            i(e);
                            try {
                                if (!(s = o(e, "return"))) {
                                    if ("throw" === t) throw n;
                                    return n
                                }
                                s = r(s, e)
                            } catch (e) {
                                a = !0, s = e
                            }
                            if ("throw" === t) throw n;
                            if (a) throw s;
                            return i(s), n
                        }
                    }, 3383: function (e, t, n) {
                        "use strict";
                        var r, i, o, s = n(7293), a = n(614), l = n(30), c = n(9518), u = n(8052), d = n(5112),
                            f = n(1913), p = d("iterator"), h = !1;
                        [].keys && ("next" in (o = [].keys()) ? (i = c(c(o))) !== Object.prototype && (r = i) : h = !0), null == r || s((function () {
                            var e = {};
                            return r[p].call(e) !== e
                        })) ? r = {} : f && (r = l(r)), a(r[p]) || u(r, p, (function () {
                            return this
                        })), e.exports = {IteratorPrototype: r, BUGGY_SAFARI_ITERATORS: h}
                    }, 7497: function (e) {
                        e.exports = {}
                    }, 6244: function (e, t, n) {
                        var r = n(7466);
                        e.exports = function (e) {
                            return r(e.length)
                        }
                    }, 6339: function (e, t, n) {
                        var r = n(7293), i = n(614), o = n(2597), s = n(9781), a = n(6530).CONFIGURABLE, l = n(2788),
                            c = n(9909), u = c.enforce, d = c.get, f = Object.defineProperty, p = s && !r((function () {
                                return 8 !== f((function () {
                                }), "length", {value: 8}).length
                            })), h = String(String).split("String"), y = e.exports = function (e, t, n) {
                                "Symbol(" === String(t).slice(0, 7) && (t = "[" + String(t).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), n && n.getter && (t = "get " + t), n && n.setter && (t = "set " + t), (!o(e, "name") || a && e.name !== t) && (s ? f(e, "name", {
                                    value: t,
                                    configurable: !0
                                }) : e.name = t), p && n && o(n, "arity") && e.length !== n.arity && f(e, "length", {value: n.arity});
                                try {
                                    n && o(n, "constructor") && n.constructor ? s && f(e, "prototype", {writable: !1}) : e.prototype && (e.prototype = void 0)
                                } catch (e) {
                                }
                                var r = u(e);
                                return o(r, "source") || (r.source = h.join("string" == typeof t ? t : "")), e
                            };
                        Function.prototype.toString = y((function () {
                            return i(this) && d(this).source || l(this)
                        }), "toString")
                    }, 4758: function (e) {
                        var t = Math.ceil, n = Math.floor;
                        e.exports = Math.trunc || function (e) {
                            var r = +e;
                            return (r > 0 ? n : t)(r)
                        }
                    }, 735: function (e, t, n) {
                        var r = n(133);
                        e.exports = r && !!Symbol.for && !!Symbol.keyFor
                    }, 133: function (e, t, n) {
                        var r = n(7392), i = n(7293);
                        e.exports = !!Object.getOwnPropertySymbols && !i((function () {
                            var e = Symbol();
                            return !String(e) || !(Object(e) instanceof Symbol) || !Symbol.sham && r && r < 41
                        }))
                    }, 8536: function (e, t, n) {
                        var r = n(7854), i = n(614), o = n(2788), s = r.WeakMap;
                        e.exports = i(s) && /native code/.test(o(s))
                    }, 3929: function (e, t, n) {
                        var r = n(7850), i = TypeError;
                        e.exports = function (e) {
                            if (r(e)) throw i("The method doesn't accept regular expressions");
                            return e
                        }
                    }, 1574: function (e, t, n) {
                        "use strict";
                        var r = n(9781), i = n(1702), o = n(6916), s = n(7293), a = n(1956), l = n(5181), c = n(5296),
                            u = n(7908), d = n(8361), f = Object.assign, p = Object.defineProperty, h = i([].concat);
                        e.exports = !f || s((function () {
                            if (r && 1 !== f({b: 1}, f(p({}, "a", {
                                enumerable: !0, get: function () {
                                    p(this, "b", {value: 3, enumerable: !1})
                                }
                            }), {b: 2})).b) return !0;
                            var e = {}, t = {}, n = Symbol(), i = "abcdefghijklmnopqrst";
                            return e[n] = 7, i.split("").forEach((function (e) {
                                t[e] = e
                            })), 7 != f({}, e)[n] || a(f({}, t)).join("") != i
                        })) ? function (e, t) {
                            for (var n = u(e), i = arguments.length, s = 1, f = l.f, p = c.f; i > s;) for (var y, m = d(arguments[s++]), v = f ? h(a(m), f(m)) : a(m), g = v.length, b = 0; g > b;) y = v[b++], r && !o(p, m, y) || (n[y] = m[y]);
                            return n
                        } : f
                    }, 30: function (e, t, n) {
                        var r, i = n(9670), o = n(6048), s = n(748), a = n(3501), l = n(490), c = n(317),
                            u = n(6200)("IE_PROTO"), d = function () {
                            }, f = function (e) {
                                return "<script>" + e + "<\/script>"
                            }, p = function (e) {
                                e.write(f("")), e.close();
                                var t = e.parentWindow.Object;
                                return e = null, t
                            }, h = function () {
                                try {
                                    r = new ActiveXObject("htmlfile")
                                } catch (e) {
                                }
                                var e, t;
                                h = "undefined" != typeof document ? document.domain && r ? p(r) : ((t = c("iframe")).style.display = "none", l.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(f("document.F=Object")), e.close(), e.F) : p(r);
                                for (var n = s.length; n--;) delete h.prototype[s[n]];
                                return h()
                            };
                        a[u] = !0, e.exports = Object.create || function (e, t) {
                            var n;
                            return null !== e ? (d.prototype = i(e), n = new d, d.prototype = null, n[u] = e) : n = h(), void 0 === t ? n : o.f(n, t)
                        }
                    }, 6048: function (e, t, n) {
                        var r = n(9781), i = n(3353), o = n(3070), s = n(9670), a = n(5656), l = n(1956);
                        t.f = r && !i ? Object.defineProperties : function (e, t) {
                            s(e);
                            for (var n, r = a(t), i = l(t), c = i.length, u = 0; c > u;) o.f(e, n = i[u++], r[n]);
                            return e
                        }
                    }, 3070: function (e, t, n) {
                        var r = n(9781), i = n(4664), o = n(3353), s = n(9670), a = n(4948), l = TypeError,
                            c = Object.defineProperty, u = Object.getOwnPropertyDescriptor;
                        t.f = r ? o ? function (e, t, n) {
                            if (s(e), t = a(t), s(n), "function" == typeof e && "prototype" === t && "value" in n && "writable" in n && !n.writable) {
                                var r = u(e, t);
                                r && r.writable && (e[t] = n.value, n = {
                                    configurable: "configurable" in n ? n.configurable : r.configurable,
                                    enumerable: "enumerable" in n ? n.enumerable : r.enumerable,
                                    writable: !1
                                })
                            }
                            return c(e, t, n)
                        } : c : function (e, t, n) {
                            if (s(e), t = a(t), s(n), i) try {
                                return c(e, t, n)
                            } catch (e) {
                            }
                            if ("get" in n || "set" in n) throw l("Accessors not supported");
                            return "value" in n && (e[t] = n.value), e
                        }
                    }, 1236: function (e, t, n) {
                        var r = n(9781), i = n(6916), o = n(5296), s = n(9114), a = n(5656), l = n(4948), c = n(2597),
                            u = n(4664), d = Object.getOwnPropertyDescriptor;
                        t.f = r ? d : function (e, t) {
                            if (e = a(e), t = l(t), u) try {
                                return d(e, t)
                            } catch (e) {
                            }
                            if (c(e, t)) return s(!i(o.f, e, t), e[t])
                        }
                    }, 1156: function (e, t, n) {
                        var r = n(4326), i = n(5656), o = n(8006).f, s = n(1589),
                            a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
                        e.exports.f = function (e) {
                            return a && "Window" == r(e) ? function (e) {
                                try {
                                    return o(e)
                                } catch (e) {
                                    return s(a)
                                }
                            }(e) : o(i(e))
                        }
                    }, 8006: function (e, t, n) {
                        var r = n(6324), i = n(748).concat("length", "prototype");
                        t.f = Object.getOwnPropertyNames || function (e) {
                            return r(e, i)
                        }
                    }, 5181: function (e, t) {
                        t.f = Object.getOwnPropertySymbols
                    }, 9518: function (e, t, n) {
                        var r = n(2597), i = n(614), o = n(7908), s = n(6200), a = n(8544), l = s("IE_PROTO"),
                            c = Object, u = c.prototype;
                        e.exports = a ? c.getPrototypeOf : function (e) {
                            var t = o(e);
                            if (r(t, l)) return t[l];
                            var n = t.constructor;
                            return i(n) && t instanceof n ? n.prototype : t instanceof c ? u : null
                        }
                    }, 7976: function (e, t, n) {
                        var r = n(1702);
                        e.exports = r({}.isPrototypeOf)
                    }, 6324: function (e, t, n) {
                        var r = n(1702), i = n(2597), o = n(5656), s = n(1318).indexOf, a = n(3501), l = r([].push);
                        e.exports = function (e, t) {
                            var n, r = o(e), c = 0, u = [];
                            for (n in r) !i(a, n) && i(r, n) && l(u, n);
                            for (; t.length > c;) i(r, n = t[c++]) && (~s(u, n) || l(u, n));
                            return u
                        }
                    }, 1956: function (e, t, n) {
                        var r = n(6324), i = n(748);
                        e.exports = Object.keys || function (e) {
                            return r(e, i)
                        }
                    }, 5296: function (e, t) {
                        "use strict";
                        var n = {}.propertyIsEnumerable, r = Object.getOwnPropertyDescriptor,
                            i = r && !n.call({1: 2}, 1);
                        t.f = i ? function (e) {
                            var t = r(this, e);
                            return !!t && t.enumerable
                        } : n
                    }, 9026: function (e, t, n) {
                        "use strict";
                        var r = n(1913), i = n(7854), o = n(7293), s = n(8008);
                        e.exports = r || !o((function () {
                            if (!(s && s < 535)) {
                                var e = Math.random();
                                __defineSetter__.call(null, e, (function () {
                                })), delete i[e]
                            }
                        }))
                    }, 7674: function (e, t, n) {
                        var r = n(1702), i = n(9670), o = n(6077);
                        e.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
                            var e, t = !1, n = {};
                            try {
                                (e = r(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set))(n, []), t = n instanceof Array
                            } catch (e) {
                            }
                            return function (n, r) {
                                return i(n), o(r), t ? e(n, r) : n.__proto__ = r, n
                            }
                        }() : void 0)
                    }, 288: function (e, t, n) {
                        "use strict";
                        var r = n(1694), i = n(648);
                        e.exports = r ? {}.toString : function () {
                            return "[object " + i(this) + "]"
                        }
                    }, 2140: function (e, t, n) {
                        var r = n(6916), i = n(614), o = n(111), s = TypeError;
                        e.exports = function (e, t) {
                            var n, a;
                            if ("string" === t && i(n = e.toString) && !o(a = r(n, e))) return a;
                            if (i(n = e.valueOf) && !o(a = r(n, e))) return a;
                            if ("string" !== t && i(n = e.toString) && !o(a = r(n, e))) return a;
                            throw s("Can't convert object to primitive value")
                        }
                    }, 3887: function (e, t, n) {
                        var r = n(5005), i = n(1702), o = n(8006), s = n(5181), a = n(9670), l = i([].concat);
                        e.exports = r("Reflect", "ownKeys") || function (e) {
                            var t = o.f(a(e)), n = s.f;
                            return n ? l(t, n(e)) : t
                        }
                    }, 857: function (e, t, n) {
                        var r = n(7854);
                        e.exports = r
                    }, 2626: function (e, t, n) {
                        var r = n(3070).f;
                        e.exports = function (e, t, n) {
                            n in e || r(e, n, {
                                configurable: !0, get: function () {
                                    return t[n]
                                }, set: function (e) {
                                    t[n] = e
                                }
                            })
                        }
                    }, 7651: function (e, t, n) {
                        var r = n(6916), i = n(9670), o = n(614), s = n(4326), a = n(2261), l = TypeError;
                        e.exports = function (e, t) {
                            var n = e.exec;
                            if (o(n)) {
                                var c = r(n, e, t);
                                return null !== c && i(c), c
                            }
                            if ("RegExp" === s(e)) return r(a, e, t);
                            throw l("RegExp#exec called on incompatible receiver")
                        }
                    }, 2261: function (e, t, n) {
                        "use strict";
                        var r, i, o = n(6916), s = n(1702), a = n(1340), l = n(7066), c = n(2999), u = n(2309),
                            d = n(30), f = n(9909).get, p = n(9441), h = n(7168),
                            y = u("native-string-replace", String.prototype.replace), m = RegExp.prototype.exec, v = m,
                            g = s("".charAt), b = s("".indexOf), w = s("".replace), _ = s("".slice),
                            x = (i = /b*/g, o(m, r = /a/, "a"), o(m, i, "a"), 0 !== r.lastIndex || 0 !== i.lastIndex),
                            k = c.BROKEN_CARET, j = void 0 !== /()??/.exec("")[1];
                        (x || j || k || p || h) && (v = function (e) {
                            var t, n, r, i, s, c, u, p = this, h = f(p), C = a(e), E = h.raw;
                            if (E) return E.lastIndex = p.lastIndex, t = o(v, E, C), p.lastIndex = E.lastIndex, t;
                            var S = h.groups, D = k && p.sticky, O = o(l, p), P = p.source, B = 0, A = C;
                            if (D && (O = w(O, "y", ""), -1 === b(O, "g") && (O += "g"), A = _(C, p.lastIndex), p.lastIndex > 0 && (!p.multiline || p.multiline && "\n" !== g(C, p.lastIndex - 1)) && (P = "(?: " + P + ")", A = " " + A, B++), n = new RegExp("^(?:" + P + ")", O)), j && (n = new RegExp("^" + P + "$(?!\\s)", O)), x && (r = p.lastIndex), i = o(m, D ? n : p, A), D ? i ? (i.input = _(i.input, B), i[0] = _(i[0], B), i.index = p.lastIndex, p.lastIndex += i[0].length) : p.lastIndex = 0 : x && i && (p.lastIndex = p.global ? i.index + i[0].length : r), j && i && i.length > 1 && o(y, i[0], n, (function () {
                                for (s = 1; s < arguments.length - 2; s++) void 0 === arguments[s] && (i[s] = void 0)
                            })), i && S) for (i.groups = c = d(null), s = 0; s < S.length; s++) c[(u = S[s])[0]] = i[u[1]];
                            return i
                        }), e.exports = v
                    }, 7066: function (e, t, n) {
                        "use strict";
                        var r = n(9670);
                        e.exports = function () {
                            var e = r(this), t = "";
                            return e.hasIndices && (t += "d"), e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e.unicode && (t += "u"), e.unicodeSets && (t += "v"), e.sticky && (t += "y"), t
                        }
                    }, 4706: function (e, t, n) {
                        var r = n(6916), i = n(2597), o = n(7976), s = n(7066), a = RegExp.prototype;
                        e.exports = function (e) {
                            var t = e.flags;
                            return void 0 !== t || "flags" in a || i(e, "flags") || !o(a, e) ? t : r(s, e)
                        }
                    }, 2999: function (e, t, n) {
                        var r = n(7293), i = n(7854).RegExp, o = r((function () {
                            var e = i("a", "y");
                            return e.lastIndex = 2, null != e.exec("abcd")
                        })), s = o || r((function () {
                            return !i("a", "y").sticky
                        })), a = o || r((function () {
                            var e = i("^r", "gy");
                            return e.lastIndex = 2, null != e.exec("str")
                        }));
                        e.exports = {BROKEN_CARET: a, MISSED_STICKY: s, UNSUPPORTED_Y: o}
                    }, 9441: function (e, t, n) {
                        var r = n(7293), i = n(7854).RegExp;
                        e.exports = r((function () {
                            var e = i(".", "s");
                            return !(e.dotAll && e.exec("\n") && "s" === e.flags)
                        }))
                    }, 7168: function (e, t, n) {
                        var r = n(7293), i = n(7854).RegExp;
                        e.exports = r((function () {
                            var e = i("(?<a>b)", "g");
                            return "b" !== e.exec("b").groups.a || "bc" !== "b".replace(e, "$<a>c")
                        }))
                    }, 4488: function (e) {
                        var t = TypeError;
                        e.exports = function (e) {
                            if (null == e) throw t("Can't call method on " + e);
                            return e
                        }
                    }, 6340: function (e, t, n) {
                        "use strict";
                        var r = n(5005), i = n(3070), o = n(5112), s = n(9781), a = o("species");
                        e.exports = function (e) {
                            var t = r(e), n = i.f;
                            s && t && !t[a] && n(t, a, {
                                configurable: !0, get: function () {
                                    return this
                                }
                            })
                        }
                    }, 8003: function (e, t, n) {
                        var r = n(3070).f, i = n(2597), o = n(5112)("toStringTag");
                        e.exports = function (e, t, n) {
                            e && !n && (e = e.prototype), e && !i(e, o) && r(e, o, {configurable: !0, value: t})
                        }
                    }, 6200: function (e, t, n) {
                        var r = n(2309), i = n(9711), o = r("keys");
                        e.exports = function (e) {
                            return o[e] || (o[e] = i(e))
                        }
                    }, 5465: function (e, t, n) {
                        var r = n(7854), i = n(3072), o = "__core-js_shared__", s = r[o] || i(o, {});
                        e.exports = s
                    }, 2309: function (e, t, n) {
                        var r = n(1913), i = n(5465);
                        (e.exports = function (e, t) {
                            return i[e] || (i[e] = void 0 !== t ? t : {})
                        })("versions", []).push({
                            version: "3.23.5",
                            mode: r ? "pure" : "global",
                            copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
                            license: "https://github.com/zloirock/core-js/blob/v3.23.5/LICENSE",
                            source: "https://github.com/zloirock/core-js"
                        })
                    }, 6707: function (e, t, n) {
                        var r = n(9670), i = n(9483), o = n(5112)("species");
                        e.exports = function (e, t) {
                            var n, s = r(e).constructor;
                            return void 0 === s || null == (n = r(s)[o]) ? t : i(n)
                        }
                    }, 8710: function (e, t, n) {
                        var r = n(1702), i = n(9303), o = n(1340), s = n(4488), a = r("".charAt), l = r("".charCodeAt),
                            c = r("".slice), u = function (e) {
                                return function (t, n) {
                                    var r, u, d = o(s(t)), f = i(n), p = d.length;
                                    return f < 0 || f >= p ? e ? "" : void 0 : (r = l(d, f)) < 55296 || r > 56319 || f + 1 === p || (u = l(d, f + 1)) < 56320 || u > 57343 ? e ? a(d, f) : r : e ? c(d, f, f + 2) : u - 56320 + (r - 55296 << 10) + 65536
                                }
                            };
                        e.exports = {codeAt: u(!1), charAt: u(!0)}
                    }, 6091: function (e, t, n) {
                        var r = n(6530).PROPER, i = n(7293), o = n(1361);
                        e.exports = function (e) {
                            return i((function () {
                                return !!o[e]() || "​᠎" !== "​᠎"[e]() || r && o[e].name !== e
                            }))
                        }
                    }, 3111: function (e, t, n) {
                        var r = n(1702), i = n(4488), o = n(1340), s = n(1361), a = r("".replace), l = "[" + s + "]",
                            c = RegExp("^" + l + l + "*"), u = RegExp(l + l + "*$"), d = function (e) {
                                return function (t) {
                                    var n = o(i(t));
                                    return 1 & e && (n = a(n, c, "")), 2 & e && (n = a(n, u, "")), n
                                }
                            };
                        e.exports = {start: d(1), end: d(2), trim: d(3)}
                    }, 6532: function (e, t, n) {
                        var r = n(6916), i = n(5005), o = n(5112), s = n(8052);
                        e.exports = function () {
                            var e = i("Symbol"), t = e && e.prototype, n = t && t.valueOf, a = o("toPrimitive");
                            t && !t[a] && s(t, a, (function (e) {
                                return r(n, this)
                            }), {arity: 1})
                        }
                    }, 863: function (e, t, n) {
                        var r = n(1702);
                        e.exports = r(1..valueOf)
                    }, 1400: function (e, t, n) {
                        var r = n(9303), i = Math.max, o = Math.min;
                        e.exports = function (e, t) {
                            var n = r(e);
                            return n < 0 ? i(n + t, 0) : o(n, t)
                        }
                    }, 5656: function (e, t, n) {
                        var r = n(8361), i = n(4488);
                        e.exports = function (e) {
                            return r(i(e))
                        }
                    }, 9303: function (e, t, n) {
                        var r = n(4758);
                        e.exports = function (e) {
                            var t = +e;
                            return t != t || 0 === t ? 0 : r(t)
                        }
                    }, 7466: function (e, t, n) {
                        var r = n(9303), i = Math.min;
                        e.exports = function (e) {
                            return e > 0 ? i(r(e), 9007199254740991) : 0
                        }
                    }, 7908: function (e, t, n) {
                        var r = n(4488), i = Object;
                        e.exports = function (e) {
                            return i(r(e))
                        }
                    }, 7593: function (e, t, n) {
                        var r = n(6916), i = n(111), o = n(2190), s = n(8173), a = n(2140), l = n(5112), c = TypeError,
                            u = l("toPrimitive");
                        e.exports = function (e, t) {
                            if (!i(e) || o(e)) return e;
                            var n, l = s(e, u);
                            if (l) {
                                if (void 0 === t && (t = "default"), n = r(l, e, t), !i(n) || o(n)) return n;
                                throw c("Can't convert object to primitive value")
                            }
                            return void 0 === t && (t = "number"), a(e, t)
                        }
                    }, 4948: function (e, t, n) {
                        var r = n(7593), i = n(2190);
                        e.exports = function (e) {
                            var t = r(e, "string");
                            return i(t) ? t : t + ""
                        }
                    }, 1694: function (e, t, n) {
                        var r = {};
                        r[n(5112)("toStringTag")] = "z", e.exports = "[object z]" === String(r)
                    }, 1340: function (e, t, n) {
                        var r = n(648), i = String;
                        e.exports = function (e) {
                            if ("Symbol" === r(e)) throw TypeError("Cannot convert a Symbol value to a string");
                            return i(e)
                        }
                    }, 6330: function (e) {
                        var t = String;
                        e.exports = function (e) {
                            try {
                                return t(e)
                            } catch (e) {
                                return "Object"
                            }
                        }
                    }, 9711: function (e, t, n) {
                        var r = n(1702), i = 0, o = Math.random(), s = r(1..toString);
                        e.exports = function (e) {
                            return "Symbol(" + (void 0 === e ? "" : e) + ")_" + s(++i + o, 36)
                        }
                    }, 3307: function (e, t, n) {
                        var r = n(133);
                        e.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator
                    }, 3353: function (e, t, n) {
                        var r = n(9781), i = n(7293);
                        e.exports = r && i((function () {
                            return 42 != Object.defineProperty((function () {
                            }), "prototype", {value: 42, writable: !1}).prototype
                        }))
                    }, 6061: function (e, t, n) {
                        var r = n(5112);
                        t.f = r
                    }, 5112: function (e, t, n) {
                        var r = n(7854), i = n(2309), o = n(2597), s = n(9711), a = n(133), l = n(3307), c = i("wks"),
                            u = r.Symbol, d = u && u.for, f = l ? u : u && u.withoutSetter || s;
                        e.exports = function (e) {
                            if (!o(c, e) || !a && "string" != typeof c[e]) {
                                var t = "Symbol." + e;
                                a && o(u, e) ? c[e] = u[e] : c[e] = l && d ? d(t) : f(t)
                            }
                            return c[e]
                        }
                    }, 1361: function (e) {
                        e.exports = "\t\n\v\f\r                　\u2028\u2029\ufeff"
                    }, 2222: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(7293), o = n(3157), s = n(111), a = n(7908), l = n(6244), c = n(7207),
                            u = n(6135), d = n(5417), f = n(1194), p = n(5112), h = n(7392),
                            y = p("isConcatSpreadable"), m = h >= 51 || !i((function () {
                                var e = [];
                                return e[y] = !1, e.concat()[0] !== e
                            })), v = f("concat"), g = function (e) {
                                if (!s(e)) return !1;
                                var t = e[y];
                                return void 0 !== t ? !!t : o(e)
                            };
                        r({target: "Array", proto: !0, arity: 1, forced: !m || !v}, {
                            concat: function (e) {
                                var t, n, r, i, o, s = a(this), f = d(s, 0), p = 0;
                                for (t = -1, r = arguments.length; t < r; t++) if (g(o = -1 === t ? s : arguments[t])) for (i = l(o), c(p + i), n = 0; n < i; n++, p++) n in o && u(f, p, o[n]); else c(p + 1), u(f, p++, o);
                                return f.length = p, f
                            }
                        })
                    }, 7327: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(2092).filter;
                        r({target: "Array", proto: !0, forced: !n(1194)("filter")}, {
                            filter: function (e) {
                                return i(this, e, arguments.length > 1 ? arguments[1] : void 0)
                            }
                        })
                    }, 1038: function (e, t, n) {
                        var r = n(2109), i = n(8457);
                        r({
                            target: "Array", stat: !0, forced: !n(7072)((function (e) {
                                Array.from(e)
                            }))
                        }, {from: i})
                    }, 6699: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(1318).includes, o = n(7293), s = n(1223);
                        r({
                            target: "Array", proto: !0, forced: o((function () {
                                return !Array(1).includes()
                            }))
                        }, {
                            includes: function (e) {
                                return i(this, e, arguments.length > 1 ? arguments[1] : void 0)
                            }
                        }), s("includes")
                    }, 2772: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(1702), o = n(1318).indexOf, s = n(9341), a = i([].indexOf),
                            l = !!a && 1 / a([1], 1, -0) < 0, c = s("indexOf");
                        r({target: "Array", proto: !0, forced: l || !c}, {
                            indexOf: function (e) {
                                var t = arguments.length > 1 ? arguments[1] : void 0;
                                return l ? a(this, e, t) || 0 : o(this, e, t)
                            }
                        })
                    }, 6992: function (e, t, n) {
                        "use strict";
                        var r = n(5656), i = n(1223), o = n(7497), s = n(9909), a = n(3070).f, l = n(654), c = n(1913),
                            u = n(9781), d = "Array Iterator", f = s.set, p = s.getterFor(d);
                        e.exports = l(Array, "Array", (function (e, t) {
                            f(this, {type: d, target: r(e), index: 0, kind: t})
                        }), (function () {
                            var e = p(this), t = e.target, n = e.kind, r = e.index++;
                            return !t || r >= t.length ? (e.target = void 0, {
                                value: void 0,
                                done: !0
                            }) : "keys" == n ? {value: r, done: !1} : "values" == n ? {
                                value: t[r],
                                done: !1
                            } : {value: [r, t[r]], done: !1}
                        }), "values");
                        var h = o.Arguments = o.Array;
                        if (i("keys"), i("values"), i("entries"), !c && u && "values" !== h.name) try {
                            a(h, "name", {value: "values"})
                        } catch (e) {
                        }
                    }, 9600: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(1702), o = n(8361), s = n(5656), a = n(9341), l = i([].join),
                            c = o != Object, u = a("join", ",");
                        r({target: "Array", proto: !0, forced: c || !u}, {
                            join: function (e) {
                                return l(s(this), void 0 === e ? "," : e)
                            }
                        })
                    }, 1249: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(2092).map;
                        r({target: "Array", proto: !0, forced: !n(1194)("map")}, {
                            map: function (e) {
                                return i(this, e, arguments.length > 1 ? arguments[1] : void 0)
                            }
                        })
                    }, 5827: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(3671).left, o = n(9341), s = n(7392), a = n(5268);
                        r({
                            target: "Array",
                            proto: !0,
                            forced: !o("reduce") || !a && s > 79 && s < 83
                        }, {
                            reduce: function (e) {
                                var t = arguments.length;
                                return i(this, e, t, t > 1 ? arguments[1] : void 0)
                            }
                        })
                    }, 7042: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(3157), o = n(4411), s = n(111), a = n(1400), l = n(6244), c = n(5656),
                            u = n(6135), d = n(5112), f = n(1194), p = n(206), h = f("slice"), y = d("species"),
                            m = Array, v = Math.max;
                        r({target: "Array", proto: !0, forced: !h}, {
                            slice: function (e, t) {
                                var n, r, d, f = c(this), h = l(f), g = a(e, h), b = a(void 0 === t ? h : t, h);
                                if (i(f) && (n = f.constructor, (o(n) && (n === m || i(n.prototype)) || s(n) && null === (n = n[y])) && (n = void 0), n === m || void 0 === n)) return p(f, g, b);
                                for (r = new (void 0 === n ? m : n)(v(b - g, 0)), d = 0; g < b; g++, d++) g in f && u(r, d, f[g]);
                                return r.length = d, r
                            }
                        })
                    }, 2707: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(1702), o = n(9662), s = n(7908), a = n(6244), l = n(5117), c = n(1340),
                            u = n(7293), d = n(4362), f = n(9341), p = n(8886), h = n(256), y = n(7392), m = n(8008),
                            v = [], g = i(v.sort), b = i(v.push), w = u((function () {
                                v.sort(void 0)
                            })), _ = u((function () {
                                v.sort(null)
                            })), x = f("sort"), k = !u((function () {
                                if (y) return y < 70;
                                if (!(p && p > 3)) {
                                    if (h) return !0;
                                    if (m) return m < 603;
                                    var e, t, n, r, i = "";
                                    for (e = 65; e < 76; e++) {
                                        switch (t = String.fromCharCode(e), e) {
                                            case 66:
                                            case 69:
                                            case 70:
                                            case 72:
                                                n = 3;
                                                break;
                                            case 68:
                                            case 71:
                                                n = 4;
                                                break;
                                            default:
                                                n = 2
                                        }
                                        for (r = 0; r < 47; r++) v.push({k: t + r, v: n})
                                    }
                                    for (v.sort((function (e, t) {
                                        return t.v - e.v
                                    })), r = 0; r < v.length; r++) t = v[r].k.charAt(0), i.charAt(i.length - 1) !== t && (i += t);
                                    return "DGBEFHACIJK" !== i
                                }
                            }));
                        r({target: "Array", proto: !0, forced: w || !_ || !x || !k}, {
                            sort: function (e) {
                                void 0 !== e && o(e);
                                var t = s(this);
                                if (k) return void 0 === e ? g(t) : g(t, e);
                                var n, r, i = [], u = a(t);
                                for (r = 0; r < u; r++) r in t && b(i, t[r]);
                                for (d(i, function (e) {
                                    return function (t, n) {
                                        return void 0 === n ? -1 : void 0 === t ? 1 : void 0 !== e ? +e(t, n) || 0 : c(t) > c(n) ? 1 : -1
                                    }
                                }(e)), n = i.length, r = 0; r < n;) t[r] = i[r++];
                                for (; r < u;) l(t, r++);
                                return t
                            }
                        })
                    }, 561: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(7908), o = n(1400), s = n(9303), a = n(6244), l = n(7207), c = n(5417),
                            u = n(6135), d = n(5117), f = n(1194)("splice"), p = Math.max, h = Math.min;
                        r({target: "Array", proto: !0, forced: !f}, {
                            splice: function (e, t) {
                                var n, r, f, y, m, v, g = i(this), b = a(g), w = o(e, b), _ = arguments.length;
                                for (0 === _ ? n = r = 0 : 1 === _ ? (n = 0, r = b - w) : (n = _ - 2, r = h(p(s(t), 0), b - w)), l(b + n - r), f = c(g, r), y = 0; y < r; y++) (m = w + y) in g && u(f, y, g[m]);
                                if (f.length = r, n < r) {
                                    for (y = w; y < b - r; y++) v = y + n, (m = y + r) in g ? g[v] = g[m] : d(g, v);
                                    for (y = b; y > b - r + n; y--) d(g, y - 1)
                                } else if (n > r) for (y = b - r; y > w; y--) v = y + n - 1, (m = y + r - 1) in g ? g[v] = g[m] : d(g, v);
                                for (y = 0; y < n; y++) g[y + w] = arguments[y + 2];
                                return g.length = b - r + n, f
                            }
                        })
                    }, 8309: function (e, t, n) {
                        var r = n(9781), i = n(6530).EXISTS, o = n(1702), s = n(3070).f, a = Function.prototype,
                            l = o(a.toString), c = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,
                            u = o(c.exec);
                        r && !i && s(a, "name", {
                            configurable: !0, get: function () {
                                try {
                                    return u(c, l(this))[1]
                                } catch (e) {
                                    return ""
                                }
                            }
                        })
                    }, 8862: function (e, t, n) {
                        var r = n(2109), i = n(5005), o = n(2104), s = n(6916), a = n(1702), l = n(7293), c = n(3157),
                            u = n(614), d = n(111), f = n(2190), p = n(206), h = n(133), y = i("JSON", "stringify"),
                            m = a(/./.exec), v = a("".charAt), g = a("".charCodeAt), b = a("".replace),
                            w = a(1..toString), _ = /[\uD800-\uDFFF]/g, x = /^[\uD800-\uDBFF]$/,
                            k = /^[\uDC00-\uDFFF]$/, j = !h || l((function () {
                                var e = i("Symbol")();
                                return "[null]" != y([e]) || "{}" != y({a: e}) || "{}" != y(Object(e))
                            })), C = l((function () {
                                return '"\\udf06\\ud834"' !== y("\udf06\ud834") || '"\\udead"' !== y("\udead")
                            })), E = function (e, t) {
                                var n = p(arguments), r = t;
                                if ((d(t) || void 0 !== e) && !f(e)) return c(t) || (t = function (e, t) {
                                    if (u(r) && (t = s(r, this, e, t)), !f(t)) return t
                                }), n[1] = t, o(y, null, n)
                            }, S = function (e, t, n) {
                                var r = v(n, t - 1), i = v(n, t + 1);
                                return m(x, e) && !m(k, i) || m(k, e) && !m(x, r) ? "\\u" + w(g(e, 0), 16) : e
                            };
                        y && r({target: "JSON", stat: !0, arity: 3, forced: j || C}, {
                            stringify: function (e, t, n) {
                                var r = p(arguments), i = o(j ? E : y, null, r);
                                return C && "string" == typeof i ? b(i, _, S) : i
                            }
                        })
                    }, 9653: function (e, t, n) {
                        "use strict";
                        var r = n(9781), i = n(7854), o = n(1702), s = n(4705), a = n(8052), l = n(2597), c = n(9587),
                            u = n(7976), d = n(2190), f = n(7593), p = n(7293), h = n(8006).f, y = n(1236).f,
                            m = n(3070).f, v = n(863), g = n(3111).trim, b = "Number", w = i.Number, _ = w.prototype,
                            x = i.TypeError, k = o("".slice), j = o("".charCodeAt), C = function (e) {
                                var t = f(e, "number");
                                return "bigint" == typeof t ? t : E(t)
                            }, E = function (e) {
                                var t, n, r, i, o, s, a, l, c = f(e, "number");
                                if (d(c)) throw x("Cannot convert a Symbol value to a number");
                                if ("string" == typeof c && c.length > 2) if (c = g(c), 43 === (t = j(c, 0)) || 45 === t) {
                                    if (88 === (n = j(c, 2)) || 120 === n) return NaN
                                } else if (48 === t) {
                                    switch (j(c, 1)) {
                                        case 66:
                                        case 98:
                                            r = 2, i = 49;
                                            break;
                                        case 79:
                                        case 111:
                                            r = 8, i = 55;
                                            break;
                                        default:
                                            return +c
                                    }
                                    for (s = (o = k(c, 2)).length, a = 0; a < s; a++) if ((l = j(o, a)) < 48 || l > i) return NaN;
                                    return parseInt(o, r)
                                }
                                return +c
                            };
                        if (s(b, !w(" 0o1") || !w("0b1") || w("+0x1"))) {
                            for (var S, D = function (e) {
                                var t = arguments.length < 1 ? 0 : w(C(e)), n = this;
                                return u(_, n) && p((function () {
                                    v(n)
                                })) ? c(Object(t), n, D) : t
                            }, O = r ? h(w) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","), P = 0; O.length > P; P++) l(w, S = O[P]) && !l(D, S) && m(D, S, y(w, S));
                            D.prototype = _, _.constructor = D, a(i, b, D, {constructor: !0})
                        }
                    }, 3161: function (e, t, n) {
                        n(2109)({target: "Number", stat: !0}, {isInteger: n(5988)})
                    }, 9601: function (e, t, n) {
                        var r = n(2109), i = n(1574);
                        r({target: "Object", stat: !0, arity: 2, forced: Object.assign !== i}, {assign: i})
                    }, 9595: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(9781), o = n(9026), s = n(9662), a = n(7908), l = n(3070);
                        i && r({target: "Object", proto: !0, forced: o}, {
                            __defineGetter__: function (e, t) {
                                l.f(a(this), e, {get: s(t), enumerable: !0, configurable: !0})
                            }
                        })
                    }, 5003: function (e, t, n) {
                        var r = n(2109), i = n(7293), o = n(5656), s = n(1236).f, a = n(9781), l = i((function () {
                            s(1)
                        }));
                        r({
                            target: "Object",
                            stat: !0,
                            forced: !a || l,
                            sham: !a
                        }, {
                            getOwnPropertyDescriptor: function (e, t) {
                                return s(o(e), t)
                            }
                        })
                    }, 9337: function (e, t, n) {
                        var r = n(2109), i = n(9781), o = n(3887), s = n(5656), a = n(1236), l = n(6135);
                        r({target: "Object", stat: !0, sham: !i}, {
                            getOwnPropertyDescriptors: function (e) {
                                for (var t, n, r = s(e), i = a.f, c = o(r), u = {}, d = 0; c.length > d;) void 0 !== (n = i(r, t = c[d++])) && l(u, t, n);
                                return u
                            }
                        })
                    }, 6210: function (e, t, n) {
                        var r = n(2109), i = n(7293), o = n(1156).f;
                        r({
                            target: "Object", stat: !0, forced: i((function () {
                                return !Object.getOwnPropertyNames(1)
                            }))
                        }, {getOwnPropertyNames: o})
                    }, 9660: function (e, t, n) {
                        var r = n(2109), i = n(133), o = n(7293), s = n(5181), a = n(7908);
                        r({
                            target: "Object", stat: !0, forced: !i || o((function () {
                                s.f(1)
                            }))
                        }, {
                            getOwnPropertySymbols: function (e) {
                                var t = s.f;
                                return t ? t(a(e)) : []
                            }
                        })
                    }, 7941: function (e, t, n) {
                        var r = n(2109), i = n(7908), o = n(1956);
                        r({
                            target: "Object", stat: !0, forced: n(7293)((function () {
                                o(1)
                            }))
                        }, {
                            keys: function (e) {
                                return o(i(e))
                            }
                        })
                    }, 1539: function (e, t, n) {
                        var r = n(1694), i = n(8052), o = n(288);
                        r || i(Object.prototype, "toString", o, {unsafe: !0})
                    }, 4603: function (e, t, n) {
                        var r = n(9781), i = n(7854), o = n(1702), s = n(4705), a = n(9587), l = n(8880), c = n(8006).f,
                            u = n(7976), d = n(7850), f = n(1340), p = n(4706), h = n(2999), y = n(2626), m = n(8052),
                            v = n(7293), g = n(2597), b = n(9909).enforce, w = n(6340), _ = n(5112), x = n(9441),
                            k = n(7168), j = _("match"), C = i.RegExp, E = C.prototype, S = i.SyntaxError,
                            D = o(E.exec), O = o("".charAt), P = o("".replace), B = o("".indexOf), A = o("".slice),
                            M = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/, I = /a/g, T = /a/g, L = new C(I) !== I,
                            K = h.MISSED_STICKY, R = h.UNSUPPORTED_Y;
                        if (s("RegExp", r && (!L || K || x || k || v((function () {
                            return T[j] = !1, C(I) != I || C(T) == T || "/a/i" != C(I, "i")
                        }))))) {
                            for (var N = function (e, t) {
                                var n, r, i, o, s, c, h = u(E, this), y = d(e), m = void 0 === t, v = [], w = e;
                                if (!h && y && m && e.constructor === N) return e;
                                if ((y || u(E, e)) && (e = e.source, m && (t = p(w))), e = void 0 === e ? "" : f(e), t = void 0 === t ? "" : f(t), w = e, x && "dotAll" in I && (r = !!t && B(t, "s") > -1) && (t = P(t, /s/g, "")), n = t, K && "sticky" in I && (i = !!t && B(t, "y") > -1) && R && (t = P(t, /y/g, "")), k && (e = (o = function (e) {
                                    for (var t, n = e.length, r = 0, i = "", o = [], s = {}, a = !1, l = !1, c = 0, u = ""; r <= n; r++) {
                                        if ("\\" === (t = O(e, r))) t += O(e, ++r); else if ("]" === t) a = !1; else if (!a) switch (!0) {
                                            case"[" === t:
                                                a = !0;
                                                break;
                                            case"(" === t:
                                                D(M, A(e, r + 1)) && (r += 2, l = !0), i += t, c++;
                                                continue;
                                            case">" === t && l:
                                                if ("" === u || g(s, u)) throw new S("Invalid capture group name");
                                                s[u] = !0, o[o.length] = [u, c], l = !1, u = "";
                                                continue
                                        }
                                        l ? u += t : i += t
                                    }
                                    return [i, o]
                                }(e))[0], v = o[1]), s = a(C(e, t), h ? this : E, N), (r || i || v.length) && (c = b(s), r && (c.dotAll = !0, c.raw = N(function (e) {
                                    for (var t, n = e.length, r = 0, i = "", o = !1; r <= n; r++) "\\" !== (t = O(e, r)) ? o || "." !== t ? ("[" === t ? o = !0 : "]" === t && (o = !1), i += t) : i += "[\\s\\S]" : i += t + O(e, ++r);
                                    return i
                                }(e), n)), i && (c.sticky = !0), v.length && (c.groups = v)), e !== w) try {
                                    l(s, "source", "" === w ? "(?:)" : w)
                                } catch (e) {
                                }
                                return s
                            }, F = c(C), z = 0; F.length > z;) y(N, C, F[z++]);
                            E.constructor = N, N.prototype = E, m(i, "RegExp", N, {constructor: !0})
                        }
                        w("RegExp")
                    }, 4916: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(2261);
                        r({target: "RegExp", proto: !0, forced: /./.exec !== i}, {exec: i})
                    }, 9714: function (e, t, n) {
                        "use strict";
                        var r = n(6530).PROPER, i = n(8052), o = n(9670), s = n(1340), a = n(7293), l = n(4706),
                            c = "toString", u = RegExp.prototype.toString, d = a((function () {
                                return "/a/b" != u.call({source: "a", flags: "b"})
                            })), f = r && u.name != c;
                        (d || f) && i(RegExp.prototype, c, (function () {
                            var e = o(this);
                            return "/" + s(e.source) + "/" + s(l(e))
                        }), {unsafe: !0})
                    }, 2023: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(1702), o = n(3929), s = n(4488), a = n(1340), l = n(4964),
                            c = i("".indexOf);
                        r({target: "String", proto: !0, forced: !l("includes")}, {
                            includes: function (e) {
                                return !!~c(a(s(this)), a(o(e)), arguments.length > 1 ? arguments[1] : void 0)
                            }
                        })
                    }, 8783: function (e, t, n) {
                        "use strict";
                        var r = n(8710).charAt, i = n(1340), o = n(9909), s = n(654), a = "String Iterator", l = o.set,
                            c = o.getterFor(a);
                        s(String, "String", (function (e) {
                            l(this, {type: a, string: i(e), index: 0})
                        }), (function () {
                            var e, t = c(this), n = t.string, i = t.index;
                            return i >= n.length ? {
                                value: void 0,
                                done: !0
                            } : (e = r(n, i), t.index += e.length, {value: e, done: !1})
                        }))
                    }, 6373: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(6916), o = n(1702), s = n(4994), a = n(4488), l = n(7466), c = n(1340),
                            u = n(9670), d = n(4326), f = n(7850), p = n(4706), h = n(8173), y = n(8052), m = n(7293),
                            v = n(5112), g = n(6707), b = n(1530), w = n(7651), _ = n(9909), x = n(1913),
                            k = v("matchAll"), j = "RegExp String Iterator", C = _.set, E = _.getterFor(j),
                            S = RegExp.prototype, D = TypeError, O = o("".indexOf), P = o("".matchAll),
                            B = !!P && !m((function () {
                                P("a", /./)
                            })), A = s((function (e, t, n, r) {
                                C(this, {type: j, regexp: e, string: t, global: n, unicode: r, done: !1})
                            }), "RegExp String", (function () {
                                var e = E(this);
                                if (e.done) return {value: void 0, done: !0};
                                var t = e.regexp, n = e.string, r = w(t, n);
                                return null === r ? {
                                    value: void 0,
                                    done: e.done = !0
                                } : e.global ? ("" === c(r[0]) && (t.lastIndex = b(n, l(t.lastIndex), e.unicode)), {
                                    value: r,
                                    done: !1
                                }) : (e.done = !0, {value: r, done: !1})
                            })), M = function (e) {
                                var t, n, r, i = u(this), o = c(e), s = g(i, RegExp), a = c(p(i));
                                return t = new s(s === RegExp ? i.source : i, a), n = !!~O(a, "g"), r = !!~O(a, "u"), t.lastIndex = l(i.lastIndex), new A(t, o, n, r)
                            };
                        r({target: "String", proto: !0, forced: B}, {
                            matchAll: function (e) {
                                var t, n, r, o, s = a(this);
                                if (null != e) {
                                    if (f(e) && (t = c(a(p(e))), !~O(t, "g"))) throw D("`.matchAll` does not allow non-global regexes");
                                    if (B) return P(s, e);
                                    if (void 0 === (r = h(e, k)) && x && "RegExp" == d(e) && (r = M), r) return i(r, e, s)
                                } else if (B) return P(s, e);
                                return n = c(s), o = new RegExp(e, "g"), x ? i(M, o, n) : o[k](n)
                            }
                        }), x || k in S || y(S, k, M)
                    }, 4723: function (e, t, n) {
                        "use strict";
                        var r = n(6916), i = n(7007), o = n(9670), s = n(7466), a = n(1340), l = n(4488), c = n(8173),
                            u = n(1530), d = n(7651);
                        i("match", (function (e, t, n) {
                            return [function (t) {
                                var n = l(this), i = null == t ? void 0 : c(t, e);
                                return i ? r(i, t, n) : new RegExp(t)[e](a(n))
                            }, function (e) {
                                var r = o(this), i = a(e), l = n(t, r, i);
                                if (l.done) return l.value;
                                if (!r.global) return d(r, i);
                                var c = r.unicode;
                                r.lastIndex = 0;
                                for (var f, p = [], h = 0; null !== (f = d(r, i));) {
                                    var y = a(f[0]);
                                    p[h] = y, "" === y && (r.lastIndex = u(i, s(r.lastIndex), c)), h++
                                }
                                return 0 === h ? null : p
                            }]
                        }))
                    }, 5306: function (e, t, n) {
                        "use strict";
                        var r = n(2104), i = n(6916), o = n(1702), s = n(7007), a = n(7293), l = n(9670), c = n(614),
                            u = n(9303), d = n(7466), f = n(1340), p = n(4488), h = n(1530), y = n(8173), m = n(647),
                            v = n(7651), g = n(5112)("replace"), b = Math.max, w = Math.min, _ = o([].concat),
                            x = o([].push), k = o("".indexOf), j = o("".slice), C = "$0" === "a".replace(/./, "$0"),
                            E = !!/./[g] && "" === /./[g]("a", "$0");
                        s("replace", (function (e, t, n) {
                            var o = E ? "$" : "$0";
                            return [function (e, n) {
                                var r = p(this), o = null == e ? void 0 : y(e, g);
                                return o ? i(o, e, r, n) : i(t, f(r), e, n)
                            }, function (e, i) {
                                var s = l(this), a = f(e);
                                if ("string" == typeof i && -1 === k(i, o) && -1 === k(i, "$<")) {
                                    var p = n(t, s, a, i);
                                    if (p.done) return p.value
                                }
                                var y = c(i);
                                y || (i = f(i));
                                var g = s.global;
                                if (g) {
                                    var C = s.unicode;
                                    s.lastIndex = 0
                                }
                                for (var E = []; ;) {
                                    var S = v(s, a);
                                    if (null === S) break;
                                    if (x(E, S), !g) break;
                                    "" === f(S[0]) && (s.lastIndex = h(a, d(s.lastIndex), C))
                                }
                                for (var D, O = "", P = 0, B = 0; B < E.length; B++) {
                                    for (var A = f((S = E[B])[0]), M = b(w(u(S.index), a.length), 0), I = [], T = 1; T < S.length; T++) x(I, void 0 === (D = S[T]) ? D : String(D));
                                    var L = S.groups;
                                    if (y) {
                                        var K = _([A], I, M, a);
                                        void 0 !== L && x(K, L);
                                        var R = f(r(i, void 0, K))
                                    } else R = m(A, a, M, I, L, i);
                                    M >= P && (O += j(a, P, M) + R, P = M + A.length)
                                }
                                return O + j(a, P)
                            }]
                        }), !!a((function () {
                            var e = /./;
                            return e.exec = function () {
                                var e = [];
                                return e.groups = {a: "7"}, e
                            }, "7" !== "".replace(e, "$<a>")
                        })) || !C || E)
                    }, 3123: function (e, t, n) {
                        "use strict";
                        var r = n(2104), i = n(6916), o = n(1702), s = n(7007), a = n(7850), l = n(9670), c = n(4488),
                            u = n(6707), d = n(1530), f = n(7466), p = n(1340), h = n(8173), y = n(1589), m = n(7651),
                            v = n(2261), g = n(2999), b = n(7293), w = g.UNSUPPORTED_Y, _ = 4294967295, x = Math.min,
                            k = [].push, j = o(/./.exec), C = o(k), E = o("".slice);
                        s("split", (function (e, t, n) {
                            var o;
                            return o = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function (e, n) {
                                var o = p(c(this)), s = void 0 === n ? _ : n >>> 0;
                                if (0 === s) return [];
                                if (void 0 === e) return [o];
                                if (!a(e)) return i(t, o, e, s);
                                for (var l, u, d, f = [], h = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), m = 0, g = new RegExp(e.source, h + "g"); (l = i(v, g, o)) && !((u = g.lastIndex) > m && (C(f, E(o, m, l.index)), l.length > 1 && l.index < o.length && r(k, f, y(l, 1)), d = l[0].length, m = u, f.length >= s));) g.lastIndex === l.index && g.lastIndex++;
                                return m === o.length ? !d && j(g, "") || C(f, "") : C(f, E(o, m)), f.length > s ? y(f, 0, s) : f
                            } : "0".split(void 0, 0).length ? function (e, n) {
                                return void 0 === e && 0 === n ? [] : i(t, this, e, n)
                            } : t, [function (t, n) {
                                var r = c(this), s = null == t ? void 0 : h(t, e);
                                return s ? i(s, t, r, n) : i(o, p(r), t, n)
                            }, function (e, r) {
                                var i = l(this), s = p(e), a = n(o, i, s, r, o !== t);
                                if (a.done) return a.value;
                                var c = u(i, RegExp), h = i.unicode,
                                    y = (i.ignoreCase ? "i" : "") + (i.multiline ? "m" : "") + (i.unicode ? "u" : "") + (w ? "g" : "y"),
                                    v = new c(w ? "^(?:" + i.source + ")" : i, y), g = void 0 === r ? _ : r >>> 0;
                                if (0 === g) return [];
                                if (0 === s.length) return null === m(v, s) ? [s] : [];
                                for (var b = 0, k = 0, j = []; k < s.length;) {
                                    v.lastIndex = w ? 0 : k;
                                    var S, D = m(v, w ? E(s, k) : s);
                                    if (null === D || (S = x(f(v.lastIndex + (w ? k : 0)), s.length)) === b) k = d(s, k, h); else {
                                        if (C(j, E(s, b, k)), j.length === g) return j;
                                        for (var O = 1; O <= D.length - 1; O++) if (C(j, D[O]), j.length === g) return j;
                                        k = b = S
                                    }
                                }
                                return C(j, E(s, b)), j
                            }]
                        }), !!b((function () {
                            var e = /(?:)/, t = e.exec;
                            e.exec = function () {
                                return t.apply(this, arguments)
                            };
                            var n = "ab".split(e);
                            return 2 !== n.length || "a" !== n[0] || "b" !== n[1]
                        })), w)
                    }, 3210: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(3111).trim;
                        r({target: "String", proto: !0, forced: n(6091)("trim")}, {
                            trim: function () {
                                return i(this)
                            }
                        })
                    }, 4032: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(7854), o = n(6916), s = n(1702), a = n(1913), l = n(9781), c = n(133),
                            u = n(7293), d = n(2597), f = n(7976), p = n(9670), h = n(5656), y = n(4948), m = n(1340),
                            v = n(9114), g = n(30), b = n(1956), w = n(8006), _ = n(1156), x = n(5181), k = n(1236),
                            j = n(3070), C = n(6048), E = n(5296), S = n(8052), D = n(2309), O = n(6200), P = n(3501),
                            B = n(9711), A = n(5112), M = n(6061), I = n(7235), T = n(6532), L = n(8003), K = n(9909),
                            R = n(2092).forEach, N = O("hidden"), F = "Symbol", z = K.set, U = K.getterFor(F),
                            H = Object.prototype, V = i.Symbol, W = V && V.prototype, q = i.TypeError, G = i.QObject,
                            Y = k.f, X = j.f, $ = _.f, J = E.f, Q = s([].push), Z = D("symbols"), ee = D("op-symbols"),
                            te = D("wks"), ne = !G || !G.prototype || !G.prototype.findChild, re = l && u((function () {
                                return 7 != g(X({}, "a", {
                                    get: function () {
                                        return X(this, "a", {value: 7}).a
                                    }
                                })).a
                            })) ? function (e, t, n) {
                                var r = Y(H, t);
                                r && delete H[t], X(e, t, n), r && e !== H && X(H, t, r)
                            } : X, ie = function (e, t) {
                                var n = Z[e] = g(W);
                                return z(n, {type: F, tag: e, description: t}), l || (n.description = t), n
                            }, oe = function (e, t, n) {
                                e === H && oe(ee, t, n), p(e);
                                var r = y(t);
                                return p(n), d(Z, r) ? (n.enumerable ? (d(e, N) && e[N][r] && (e[N][r] = !1), n = g(n, {enumerable: v(0, !1)})) : (d(e, N) || X(e, N, v(1, {})), e[N][r] = !0), re(e, r, n)) : X(e, r, n)
                            }, se = function (e, t) {
                                p(e);
                                var n = h(t), r = b(n).concat(ue(n));
                                return R(r, (function (t) {
                                    l && !o(ae, n, t) || oe(e, t, n[t])
                                })), e
                            }, ae = function (e) {
                                var t = y(e), n = o(J, this, t);
                                return !(this === H && d(Z, t) && !d(ee, t)) && (!(n || !d(this, t) || !d(Z, t) || d(this, N) && this[N][t]) || n)
                            }, le = function (e, t) {
                                var n = h(e), r = y(t);
                                if (n !== H || !d(Z, r) || d(ee, r)) {
                                    var i = Y(n, r);
                                    return !i || !d(Z, r) || d(n, N) && n[N][r] || (i.enumerable = !0), i
                                }
                            }, ce = function (e) {
                                var t = $(h(e)), n = [];
                                return R(t, (function (e) {
                                    d(Z, e) || d(P, e) || Q(n, e)
                                })), n
                            }, ue = function (e) {
                                var t = e === H, n = $(t ? ee : h(e)), r = [];
                                return R(n, (function (e) {
                                    !d(Z, e) || t && !d(H, e) || Q(r, Z[e])
                                })), r
                            };
                        c || (S(W = (V = function () {
                            if (f(W, this)) throw q("Symbol is not a constructor");
                            var e = arguments.length && void 0 !== arguments[0] ? m(arguments[0]) : void 0, t = B(e),
                                n = function (e) {
                                    this === H && o(n, ee, e), d(this, N) && d(this[N], t) && (this[N][t] = !1), re(this, t, v(1, e))
                                };
                            return l && ne && re(H, t, {configurable: !0, set: n}), ie(t, e)
                        }).prototype, "toString", (function () {
                            return U(this).tag
                        })), S(V, "withoutSetter", (function (e) {
                            return ie(B(e), e)
                        })), E.f = ae, j.f = oe, C.f = se, k.f = le, w.f = _.f = ce, x.f = ue, M.f = function (e) {
                            return ie(A(e), e)
                        }, l && (X(W, "description", {
                            configurable: !0, get: function () {
                                return U(this).description
                            }
                        }), a || S(H, "propertyIsEnumerable", ae, {unsafe: !0}))), r({
                            global: !0,
                            constructor: !0,
                            wrap: !0,
                            forced: !c,
                            sham: !c
                        }, {Symbol: V}), R(b(te), (function (e) {
                            I(e)
                        })), r({target: F, stat: !0, forced: !c}, {
                            useSetter: function () {
                                ne = !0
                            }, useSimple: function () {
                                ne = !1
                            }
                        }), r({target: "Object", stat: !0, forced: !c, sham: !l}, {
                            create: function (e, t) {
                                return void 0 === t ? g(e) : se(g(e), t)
                            }, defineProperty: oe, defineProperties: se, getOwnPropertyDescriptor: le
                        }), r({
                            target: "Object",
                            stat: !0,
                            forced: !c
                        }, {getOwnPropertyNames: ce}), T(), L(V, F), P[N] = !0
                    }, 1817: function (e, t, n) {
                        "use strict";
                        var r = n(2109), i = n(9781), o = n(7854), s = n(1702), a = n(2597), l = n(614), c = n(7976),
                            u = n(1340), d = n(3070).f, f = n(9920), p = o.Symbol, h = p && p.prototype;
                        if (i && l(p) && (!("description" in h) || void 0 !== p().description)) {
                            var y = {}, m = function () {
                                var e = arguments.length < 1 || void 0 === arguments[0] ? void 0 : u(arguments[0]),
                                    t = c(h, this) ? new p(e) : void 0 === e ? p() : p(e);
                                return "" === e && (y[t] = !0), t
                            };
                            f(m, p), m.prototype = h, h.constructor = m;
                            var v = "Symbol(test)" == String(p("test")), g = s(h.toString), b = s(h.valueOf),
                                w = /^Symbol\((.*)\)[^)]+$/, _ = s("".replace), x = s("".slice);
                            d(h, "description", {
                                configurable: !0, get: function () {
                                    var e = b(this), t = g(e);
                                    if (a(y, e)) return "";
                                    var n = v ? x(t, 7, -1) : _(t, w, "$1");
                                    return "" === n ? void 0 : n
                                }
                            }), r({global: !0, constructor: !0, forced: !0}, {Symbol: m})
                        }
                    }, 763: function (e, t, n) {
                        var r = n(2109), i = n(5005), o = n(2597), s = n(1340), a = n(2309), l = n(735),
                            c = a("string-to-symbol-registry"), u = a("symbol-to-string-registry");
                        r({target: "Symbol", stat: !0, forced: !l}, {
                            for: function (e) {
                                var t = s(e);
                                if (o(c, t)) return c[t];
                                var n = i("Symbol")(t);
                                return c[t] = n, u[n] = t, n
                            }
                        })
                    }, 2165: function (e, t, n) {
                        n(7235)("iterator")
                    }, 2526: function (e, t, n) {
                        n(4032), n(763), n(6620), n(8862), n(9660)
                    }, 6620: function (e, t, n) {
                        var r = n(2109), i = n(2597), o = n(2190), s = n(6330), a = n(2309), l = n(735),
                            c = a("symbol-to-string-registry");
                        r({target: "Symbol", stat: !0, forced: !l}, {
                            keyFor: function (e) {
                                if (!o(e)) throw TypeError(s(e) + " is not a symbol");
                                if (i(c, e)) return c[e]
                            }
                        })
                    }, 3728: function (e, t, n) {
                        n(6373)
                    }, 4747: function (e, t, n) {
                        var r = n(7854), i = n(8324), o = n(8509), s = n(8533), a = n(8880), l = function (e) {
                            if (e && e.forEach !== s) try {
                                a(e, "forEach", s)
                            } catch (t) {
                                e.forEach = s
                            }
                        };
                        for (var c in i) i[c] && l(r[c] && r[c].prototype);
                        l(o)
                    }, 3948: function (e, t, n) {
                        var r = n(7854), i = n(8324), o = n(8509), s = n(6992), a = n(8880), l = n(5112),
                            c = l("iterator"), u = l("toStringTag"), d = s.values, f = function (e, t) {
                                if (e) {
                                    if (e[c] !== d) try {
                                        a(e, c, d)
                                    } catch (t) {
                                        e[c] = d
                                    }
                                    if (e[u] || a(e, u, t), i[t]) for (var n in s) if (e[n] !== s[n]) try {
                                        a(e, n, s[n])
                                    } catch (t) {
                                        e[n] = s[n]
                                    }
                                }
                            };
                        for (var p in i) f(r[p] && r[p].prototype, p);
                        f(o, "DOMTokenList")
                    }
                }, t = {};

                function n(r) {
                    var i = t[r];
                    if (void 0 !== i) return i.exports;
                    var o = t[r] = {exports: {}};
                    return e[r](o, o.exports, n), o.exports
                }

                n.d = function (e, t) {
                    for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {enumerable: !0, get: t[r]})
                }, n.g = function () {
                    if ("object" == typeof globalThis) return globalThis;
                    try {
                        return this || new Function("return this")()
                    } catch (e) {
                        if ("object" == typeof window) return window
                    }
                }(), n.o = function (e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }, n.r = function (e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
                };
                var r = {};
                return function () {
                    "use strict";

                    function e(e) {
                        return function (e) {
                            if (Array.isArray(e)) return i(e)
                        }(e) || function (e) {
                            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                        }(e) || t(e) || function () {
                            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }()
                    }

                    function t(e, t) {
                        if (e) {
                            if ("string" == typeof e) return i(e, t);
                            var n = Object.prototype.toString.call(e).slice(8, -1);
                            return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? i(e, t) : void 0
                        }
                    }

                    function i(e, t) {
                        (null == t || t > e.length) && (t = e.length);
                        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
                        return r
                    }

                    function o(e) {
                        return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                            return typeof e
                        } : function (e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        })(e)
                    }

                    function s(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                        }
                    }

                    function a(e, t, n) {
                        return t in e ? Object.defineProperty(e, t, {
                            value: n,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[t] = n, e
                    }

                    n.r(r), n.d(r, {
                        default: function () {
                            return v
                        }
                    }), n(3210), n(4916), n(5306), n(2772), n(8309), n(3123), n(1539), n(9714), n(561), n(9600), n(9595), n(7042), "undefined" == typeof Element || "remove" in Element.prototype || (Element.prototype.remove = function () {
                        this.parentNode && this.parentNode.removeChild(this)
                    }), "undefined" != typeof self && "document" in self && ((!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) && function (e) {
                        if ("Element" in e) {
                            var t = "classList", n = e.Element.prototype, r = Object,
                                i = String.prototype.trim || function () {
                                    return this.replace(/^\s+|\s+$/g, "")
                                }, o = Array.prototype.indexOf || function (e) {
                                    for (var t = 0, n = this.length; t < n; t++) if (t in this && this[t] === e) return t;
                                    return -1
                                }, s = function (e, t) {
                                    this.name = e, this.code = DOMException[e], this.message = t
                                }, a = function (e, t) {
                                    if ("" === t) throw new s("SYNTAX_ERR", "The token must not be empty.");
                                    if (/\s/.test(t)) throw new s("INVALID_CHARACTER_ERR", "The token must not contain space characters.");
                                    return o.call(e, t)
                                }, l = function (e) {
                                    for (var t = i.call(e.getAttribute("class") || ""), n = t ? t.split(/\s+/) : [], r = 0, o = n.length; r < o; r++) this.push(n[r]);
                                    this._updateClassName = function () {
                                        e.setAttribute("class", this.toString())
                                    }
                                }, c = l.prototype = [], u = function () {
                                    return new l(this)
                                };
                            if (s.prototype = Error.prototype, c.item = function (e) {
                                return this[e] || null
                            }, c.contains = function (e) {
                                return ~a(this, e + "")
                            }, c.add = function () {
                                var e, t = arguments, n = 0, r = t.length, i = !1;
                                do {
                                    e = t[n] + "", ~a(this, e) || (this.push(e), i = !0)
                                } while (++n < r);
                                i && this._updateClassName()
                            }, c.remove = function () {
                                var e, t, n = arguments, r = 0, i = n.length, o = !1;
                                do {
                                    for (e = n[r] + "", t = a(this, e); ~t;) this.splice(t, 1), o = !0, t = a(this, e)
                                } while (++r < i);
                                o && this._updateClassName()
                            }, c.toggle = function (e, t) {
                                var n = this.contains(e), r = n ? !0 !== t && "remove" : !1 !== t && "add";
                                return r && this[r](e), !0 === t || !1 === t ? t : !n
                            }, c.replace = function (e, t) {
                                var n = a(e + "");
                                ~n && (this.splice(n, 1, t), this._updateClassName())
                            }, c.toString = function () {
                                return this.join(" ")
                            }, r.defineProperty) {
                                var d = {get: u, enumerable: !0, configurable: !0};
                                try {
                                    r.defineProperty(n, t, d)
                                } catch (e) {
                                    void 0 !== e.number && -2146823252 !== e.number || (d.enumerable = !1, r.defineProperty(n, t, d))
                                }
                            } else r.prototype.__defineGetter__ && n.__defineGetter__(t, u)
                        }
                    }(self), function () {
                        var e = document.createElement("_");
                        if (e.classList.add("c1", "c2"), !e.classList.contains("c2")) {
                            var t = function (e) {
                                var t = DOMTokenList.prototype[e];
                                DOMTokenList.prototype[e] = function (e) {
                                    var n, r = arguments.length;
                                    for (n = 0; n < r; n++) e = arguments[n], t.call(this, e)
                                }
                            };
                            t("add"), t("remove")
                        }
                        if (e.classList.toggle("c3", !1), e.classList.contains("c3")) {
                            var n = DOMTokenList.prototype.toggle;
                            DOMTokenList.prototype.toggle = function (e, t) {
                                return 1 in arguments && !this.contains(e) == !t ? t : n.call(this, e)
                            }
                        }
                        "replace" in document.createElement("_").classList || (DOMTokenList.prototype.replace = function (e, t) {
                            var n = this.toString().split(" "), r = n.indexOf(e + "");
                            ~r && (n = n.slice(r), this.remove.apply(this, n), this.add(t), this.add.apply(this, n.slice(1)))
                        }), e = null
                    }()), n(7327), n(2222), n(7941), n(4603), n(3728), n(2707), n(6699), n(2023), n(4747), n(9601), n(1249), n(1038), n(8783), n(2526), n(5003), n(9337), n(1817), n(2165), n(6992), n(3948), n(3161), n(9653), n(4723), n(5827), n(6210);
                    var l = function () {
                        function n(e) {
                            var t = e.getOptions, r = e.getCaretPosition, i = e.getCaretPositionEnd, o = e.dispatch;
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, n), a(this, "isStandardButton", (function (e) {
                                return e && !("{" === e[0] && "}" === e[e.length - 1])
                            })), this.getOptions = t, this.getCaretPosition = r, this.getCaretPositionEnd = i, this.dispatch = o, n.bindMethods(n, this)
                        }

                        var r, i, l;
                        return r = n, l = [{
                            key: "bindMethods", value: function (e, n) {
                                var r, i = function (e, n) {
                                    var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                    if (!r) {
                                        if (Array.isArray(e) || (r = t(e))) {
                                            r && (e = r);
                                            var i = 0, o = function () {
                                            };
                                            return {
                                                s: o, n: function () {
                                                    return i >= e.length ? {done: !0} : {done: !1, value: e[i++]}
                                                }, e: function (e) {
                                                    throw e
                                                }, f: o
                                            }
                                        }
                                        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                    }
                                    var s, a = !0, l = !1;
                                    return {
                                        s: function () {
                                            r = r.call(e)
                                        }, n: function () {
                                            var e = r.next();
                                            return a = e.done, e
                                        }, e: function (e) {
                                            l = !0, s = e
                                        }, f: function () {
                                            try {
                                                a || null == r.return || r.return()
                                            } finally {
                                                if (l) throw s
                                            }
                                        }
                                    }
                                }(Object.getOwnPropertyNames(e.prototype));
                                try {
                                    for (i.s(); !(r = i.n()).done;) {
                                        var o = r.value;
                                        "constructor" === o || "bindMethods" === o || (n[o] = n[o].bind(n))
                                    }
                                } catch (e) {
                                    i.e(e)
                                } finally {
                                    i.f()
                                }
                            }
                        }], (i = [{
                            key: "getButtonType", value: function (e) {
                                return e.includes("{") && e.includes("}") && "{//}" !== e ? "functionBtn" : "standardBtn"
                            }
                        }, {
                            key: "getButtonClass", value: function (e) {
                                var t = this.getButtonType(e), n = e.replace("{", "").replace("}", ""), r = "";
                                return "standardBtn" !== t && (r = " hg-button-".concat(n)), "hg-".concat(t).concat(r)
                            }
                        }, {
                            key: "getDefaultDiplay", value: function () {
                                return {
                                    "{bksp}": "backspace",
                                    "{backspace}": "backspace",
                                    "{enter}": "< enter",
                                    "{shift}": "shift",
                                    "{shiftleft}": "shift",
                                    "{shiftright}": "shift",
                                    "{alt}": "alt",
                                    "{s}": "shift",
                                    "{tab}": "tab",
                                    "{lock}": "caps",
                                    "{capslock}": "caps",
                                    "{accept}": "Submit",
                                    "{space}": " ",
                                    "{//}": " ",
                                    "{esc}": "esc",
                                    "{escape}": "esc",
                                    "{f1}": "f1",
                                    "{f2}": "f2",
                                    "{f3}": "f3",
                                    "{f4}": "f4",
                                    "{f5}": "f5",
                                    "{f6}": "f6",
                                    "{f7}": "f7",
                                    "{f8}": "f8",
                                    "{f9}": "f9",
                                    "{f10}": "f10",
                                    "{f11}": "f11",
                                    "{f12}": "f12",
                                    "{numpaddivide}": "/",
                                    "{numlock}": "lock",
                                    "{arrowup}": "↑",
                                    "{arrowleft}": "←",
                                    "{arrowdown}": "↓",
                                    "{arrowright}": "→",
                                    "{prtscr}": "print",
                                    "{scrolllock}": "scroll",
                                    "{pause}": "pause",
                                    "{insert}": "ins",
                                    "{home}": "home",
                                    "{pageup}": "up",
                                    "{delete}": "del",
                                    "{forwarddelete}": "del",
                                    "{end}": "end",
                                    "{pagedown}": "down",
                                    "{numpadmultiply}": "*",
                                    "{numpadsubtract}": "-",
                                    "{numpadadd}": "+",
                                    "{numpadenter}": "enter",
                                    "{period}": ".",
                                    "{numpaddecimal}": ".",
                                    "{numpad0}": "0",
                                    "{numpad1}": "1",
                                    "{numpad2}": "2",
                                    "{numpad3}": "3",
                                    "{numpad4}": "4",
                                    "{numpad5}": "5",
                                    "{numpad6}": "6",
                                    "{numpad7}": "7",
                                    "{numpad8}": "8",
                                    "{numpad9}": "9"
                                }
                            }
                        }, {
                            key: "getButtonDisplayName", value: function (e, t, n) {
                                return (t = n ? Object.assign({}, this.getDefaultDiplay(), t) : t || this.getDefaultDiplay())[e] || e
                            }
                        }, {
                            key: "getUpdatedInput", value: function (e, t, n) {
                                var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : n,
                                    i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                                    o = this.getOptions(), s = [n, r, i], a = t;
                                return ("{bksp}" === e || "{backspace}" === e) && a.length > 0 ? a = this.removeAt.apply(this, [a].concat(s)) : ("{delete}" === e || "{forwarddelete}" === e) && a.length > 0 ? a = this.removeForwardsAt.apply(this, [a].concat(s)) : "{space}" === e ? a = this.addStringAt.apply(this, [a, " "].concat(s)) : "{tab}" !== e || "boolean" == typeof o.tabCharOnTab && !1 === o.tabCharOnTab ? "{enter}" !== e && "{numpadenter}" !== e || !o.newLineOnEnter ? e.includes("numpad") && Number.isInteger(Number(e[e.length - 2])) ? a = this.addStringAt.apply(this, [a, e[e.length - 2]].concat(s)) : "{numpaddivide}" === e ? a = this.addStringAt.apply(this, [a, "/"].concat(s)) : "{numpadmultiply}" === e ? a = this.addStringAt.apply(this, [a, "*"].concat(s)) : "{numpadsubtract}" === e ? a = this.addStringAt.apply(this, [a, "-"].concat(s)) : "{numpadadd}" === e ? a = this.addStringAt.apply(this, [a, "+"].concat(s)) : "{numpaddecimal}" === e ? a = this.addStringAt.apply(this, [a, "."].concat(s)) : "{" === e || "}" === e ? a = this.addStringAt.apply(this, [a, e].concat(s)) : e.includes("{") || e.includes("}") || (a = this.addStringAt.apply(this, [a, e].concat(s))) : a = this.addStringAt.apply(this, [a, "\n"].concat(s)) : a = this.addStringAt.apply(this, [a, "\t"].concat(s)), a
                            }
                        }, {
                            key: "updateCaretPos", value: function (e) {
                                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                    n = this.updateCaretPosAction(e, t);
                                this.dispatch((function (e) {
                                    e.setCaretPosition(n)
                                }))
                            }
                        }, {
                            key: "updateCaretPosAction", value: function (e) {
                                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                    n = this.getOptions(), r = this.getCaretPosition();
                                return null != r && (t ? r > 0 && (r -= e) : r += e), n.debug && console.log("Caret at:", r), r
                            }
                        }, {
                            key: "addStringAt", value: function (e, t) {
                                var n, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.length,
                                    i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : e.length,
                                    o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
                                return r || 0 === r ? (n = [e.slice(0, r), t, e.slice(i)].join(""), this.isMaxLengthReached() || o && this.updateCaretPos(t.length)) : n = e + t, n
                            }
                        }, {
                            key: "removeAt", value: function (e) {
                                var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.length,
                                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.length,
                                    i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                                if (0 === n && 0 === r) return e;
                                if (n === r) {
                                    var o = /([\uD800-\uDBFF][\uDC00-\uDFFF])/g;
                                    n && n >= 0 ? e.substring(n - 2, n).match(o) ? (t = e.substr(0, n - 2) + e.substr(n), i && this.updateCaretPos(2, !0)) : (t = e.substr(0, n - 1) + e.substr(n), i && this.updateCaretPos(1, !0)) : e.slice(-2).match(o) ? (t = e.slice(0, -2), i && this.updateCaretPos(2, !0)) : (t = e.slice(0, -1), i && this.updateCaretPos(1, !0))
                                } else t = e.slice(0, n) + e.slice(r), i && this.dispatch((function (e) {
                                    e.setCaretPosition(n)
                                }));
                                return t
                            }
                        }, {
                            key: "removeForwardsAt", value: function (e) {
                                var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.length,
                                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : e.length,
                                    i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                                if (null == e || !e.length || null === n) return e;
                                if (n === r) {
                                    var o = /([\uD800-\uDBFF][\uDC00-\uDFFF])/g, s = e.substring(n, n + 2),
                                        a = s.match(o);
                                    t = a ? e.substr(0, n) + e.substr(n + 2) : e.substr(0, n) + e.substr(n + 1)
                                } else t = e.slice(0, n) + e.slice(r), i && this.dispatch((function (e) {
                                    e.setCaretPosition(n)
                                }));
                                return t
                            }
                        }, {
                            key: "handleMaxLength", value: function (e, t) {
                                var n = this.getOptions(), r = n.maxLength, i = e[n.inputName || "default"],
                                    s = t.length - 1 >= r;
                                if (t.length <= i.length) return !1;
                                if (Number.isInteger(r)) return n.debug && console.log("maxLength (num) reached:", s), s ? (this.maxLengthReached = !0, !0) : (this.maxLengthReached = !1, !1);
                                if ("object" === o(r)) {
                                    var a = t.length - 1 >= r[n.inputName || "default"];
                                    return n.debug && console.log("maxLength (obj) reached:", a), a ? (this.maxLengthReached = !0, !0) : (this.maxLengthReached = !1, !1)
                                }
                            }
                        }, {
                            key: "isMaxLengthReached", value: function () {
                                return Boolean(this.maxLengthReached)
                            }
                        }, {
                            key: "isTouchDevice", value: function () {
                                return "ontouchstart" in window || navigator.maxTouchPoints
                            }
                        }, {
                            key: "pointerEventsSupported", value: function () {
                                return !!window.PointerEvent
                            }
                        }, {
                            key: "camelCase", value: function (e) {
                                return e ? e.toLowerCase().trim().split(/[.\-_\s]/g).reduce((function (e, t) {
                                    return t.length ? e + t[0].toUpperCase() + t.slice(1) : e
                                })) : ""
                            }
                        }, {
                            key: "chunkArray", value: function (t, n) {
                                return e(Array(Math.ceil(t.length / n))).map((function (e, r) {
                                    return t.slice(n * r, n + n * r)
                                }))
                            }
                        }]) && s(r.prototype, i), l && s(r, l), Object.defineProperty(r, "prototype", {writable: !1}), n
                    }();
                    a(l, "noop", (function () {
                    }));
                    var c = l;
                    var u = function () {
                        function e(t) {
                            var n = t.dispatch, r = t.getOptions;
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), this.dispatch = n, this.getOptions = r, c.bindMethods(e, this)
                        }

                        var t, n;
                        return t = e, (n = [{
                            key: "handleHighlightKeyDown", value: function (e) {
                                var t = this.getOptions(), n = this.getSimpleKeyboardLayoutKey(e);
                                this.dispatch((function (r) {
                                    var i, o, s = r.getButtonElement(n), a = r.getButtonElement("{".concat(n, "}"));
                                    if (s) i = s, o = n; else {
                                        if (!a) return;
                                        i = a, o = "{".concat(n, "}")
                                    }
                                    i && (i.style.backgroundColor = t.physicalKeyboardHighlightBgColor || "#dadce4", i.style.color = t.physicalKeyboardHighlightTextColor || "black", t.physicalKeyboardHighlightPress && (t.physicalKeyboardHighlightPressUsePointerEvents ? i.onpointerdown() : t.physicalKeyboardHighlightPressUseClick ? i.click() : r.handleButtonClicked(o, e)))
                                }))
                            }
                        }, {
                            key: "handleHighlightKeyUp", value: function (e) {
                                var t = this.getOptions(), n = this.getSimpleKeyboardLayoutKey(e);
                                this.dispatch((function (e) {
                                    var r = e.getButtonElement(n) || e.getButtonElement("{".concat(n, "}"));
                                    r && r.removeAttribute && (r.removeAttribute("style"), t.physicalKeyboardHighlightPressUsePointerEvents && r.onpointerup())
                                }))
                            }
                        }, {
                            key: "getSimpleKeyboardLayoutKey", value: function (e) {
                                var t, n, r = e.code || e.key || this.keyCodeToKey(null == e ? void 0 : e.keyCode);
                                return (n = null != r && r.includes("Numpad") || null != r && r.includes("Shift") || null != r && r.includes("Space") || null != r && r.includes("Backspace") || null != r && r.includes("Control") || null != r && r.includes("Alt") || null != r && r.includes("Meta") ? e.code || "" : e.key || this.keyCodeToKey(null == e ? void 0 : e.keyCode) || "").length > 1 ? null === (t = n) || void 0 === t ? void 0 : t.toLowerCase() : n
                            }
                        }, {
                            key: "keyCodeToKey", value: function (e) {
                                return {
                                    8: "Backspace",
                                    9: "Tab",
                                    13: "Enter",
                                    16: "Shift",
                                    17: "Ctrl",
                                    18: "Alt",
                                    19: "Pause",
                                    20: "CapsLock",
                                    27: "Esc",
                                    32: "Space",
                                    33: "PageUp",
                                    34: "PageDown",
                                    35: "End",
                                    36: "Home",
                                    37: "ArrowLeft",
                                    38: "ArrowUp",
                                    39: "ArrowRight",
                                    40: "ArrowDown",
                                    45: "Insert",
                                    46: "Delete",
                                    48: "0",
                                    49: "1",
                                    50: "2",
                                    51: "3",
                                    52: "4",
                                    53: "5",
                                    54: "6",
                                    55: "7",
                                    56: "8",
                                    57: "9",
                                    65: "A",
                                    66: "B",
                                    67: "C",
                                    68: "D",
                                    69: "E",
                                    70: "F",
                                    71: "G",
                                    72: "H",
                                    73: "I",
                                    74: "J",
                                    75: "K",
                                    76: "L",
                                    77: "M",
                                    78: "N",
                                    79: "O",
                                    80: "P",
                                    81: "Q",
                                    82: "R",
                                    83: "S",
                                    84: "T",
                                    85: "U",
                                    86: "V",
                                    87: "W",
                                    88: "X",
                                    89: "Y",
                                    90: "Z",
                                    91: "Meta",
                                    96: "Numpad0",
                                    97: "Numpad1",
                                    98: "Numpad2",
                                    99: "Numpad3",
                                    100: "Numpad4",
                                    101: "Numpad5",
                                    102: "Numpad6",
                                    103: "Numpad7",
                                    104: "Numpad8",
                                    105: "Numpad9",
                                    106: "NumpadMultiply",
                                    107: "NumpadAdd",
                                    109: "NumpadSubtract",
                                    110: "NumpadDecimal",
                                    111: "NumpadDivide",
                                    112: "F1",
                                    113: "F2",
                                    114: "F3",
                                    115: "F4",
                                    116: "F5",
                                    117: "F6",
                                    118: "F7",
                                    119: "F8",
                                    120: "F9",
                                    121: "F10",
                                    122: "F11",
                                    123: "F12",
                                    144: "NumLock",
                                    145: "ScrollLock",
                                    186: ";",
                                    187: "=",
                                    188: ",",
                                    189: "-",
                                    190: ".",
                                    191: "/",
                                    192: "`",
                                    219: "[",
                                    220: "\\",
                                    221: "]",
                                    222: "'"
                                }[e]
                            }
                        }]) && function (e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }(t.prototype, n), Object.defineProperty(t, "prototype", {writable: !1}), e
                    }();
                    var d = function () {
                        function e(t) {
                            var n, r = t.utilities;
                            !function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), (n = "pageIndex") in this ? Object.defineProperty(this, n, {
                                value: 0,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            }) : this[n] = 0, this.utilities = r, c.bindMethods(e, this), this.pageSize = this.utilities.getOptions().layoutCandidatesPageSize || 5
                        }

                        var t, n;
                        return t = e, (n = [{
                            key: "destroy", value: function () {
                                this.candidateBoxElement && (this.candidateBoxElement.remove(), this.pageIndex = 0)
                            }
                        }, {
                            key: "show", value: function (e) {
                                var t = this, n = e.candidateValue, r = e.targetElement, i = e.onSelect;
                                if (n && n.length) {
                                    var o = this.utilities.chunkArray(n.split(" "), this.pageSize);
                                    this.renderPage({
                                        candidateListPages: o,
                                        targetElement: r,
                                        pageIndex: this.pageIndex,
                                        nbPages: o.length,
                                        onItemSelected: function (e, n) {
                                            i(e, n), t.destroy()
                                        }
                                    })
                                }
                            }
                        }, {
                            key: "renderPage", value: function (e) {
                                var t, n = this, r = e.candidateListPages, i = e.targetElement, o = e.pageIndex,
                                    s = e.nbPages, a = e.onItemSelected;
                                null === (t = this.candidateBoxElement) || void 0 === t || t.remove(), this.candidateBoxElement = document.createElement("div"), this.candidateBoxElement.className = "hg-candidate-box";
                                var l = document.createElement("ul");
                                l.className = "hg-candidate-box-list", r[o].forEach((function (e) {
                                    var t = document.createElement("li"), n = function () {
                                        var e = new MouseEvent("click");
                                        return Object.defineProperty(e, "target", {value: t}), e
                                    };
                                    t.className = "hg-candidate-box-list-item", t.textContent = e, t.onclick = function () {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : n();
                                        return a(e, t)
                                    }, l.appendChild(t)
                                }));
                                var c = o > 0, u = document.createElement("div");
                                u.classList.add("hg-candidate-box-prev"), c && u.classList.add("hg-candidate-box-btn-active"), u.onclick = function () {
                                    c && n.renderPage({
                                        candidateListPages: r,
                                        targetElement: i,
                                        pageIndex: o - 1,
                                        nbPages: s,
                                        onItemSelected: a
                                    })
                                }, this.candidateBoxElement.appendChild(u), this.candidateBoxElement.appendChild(l);
                                var d = o < s - 1, f = document.createElement("div");
                                f.classList.add("hg-candidate-box-next"), d && f.classList.add("hg-candidate-box-btn-active"), f.onclick = function () {
                                    d && n.renderPage({
                                        candidateListPages: r,
                                        targetElement: i,
                                        pageIndex: o + 1,
                                        nbPages: s,
                                        onItemSelected: a
                                    })
                                }, this.candidateBoxElement.appendChild(f), i.prepend(this.candidateBoxElement)
                            }
                        }]) && function (e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }(t.prototype, n), Object.defineProperty(t, "prototype", {writable: !1}), e
                    }();

                    function f(e) {
                        return function (e) {
                            if (Array.isArray(e)) return p(e)
                        }(e) || function (e) {
                            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                        }(e) || function (e, t) {
                            if (e) {
                                if ("string" == typeof e) return p(e, t);
                                var n = Object.prototype.toString.call(e).slice(8, -1);
                                return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? p(e, t) : void 0
                            }
                        }(e) || function () {
                            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }()
                    }

                    function p(e, t) {
                        (null == t || t > e.length) && (t = e.length);
                        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
                        return r
                    }

                    function h(e) {
                        return (h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                            return typeof e
                        } : function (e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        })(e)
                    }

                    function y(e, t) {
                        var n = Object.keys(e);
                        if (Object.getOwnPropertySymbols) {
                            var r = Object.getOwnPropertySymbols(e);
                            t && (r = r.filter((function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable
                            }))), n.push.apply(n, r)
                        }
                        return n
                    }

                    function m(e, t, n) {
                        return t in e ? Object.defineProperty(e, t, {
                            value: n,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[t] = n, e
                    }

                    var v = function () {
                        function e(t, n) {
                            var r = this;
                            if (function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, e), m(this, "defaultName", "default"), m(this, "activeInputElement", null), m(this, "handleParams", (function (e, t) {
                                var n, r, i;
                                if ("string" == typeof e) n = e.split(".").join(""), r = document.querySelector(".".concat(n)), i = t; else if (e instanceof HTMLDivElement) {
                                    if (!e.className) throw console.warn("Any DOM element passed as parameter must have a class."), new Error("KEYBOARD_DOM_CLASS_ERROR");
                                    n = e.className.split(" ")[0], r = e, i = t
                                } else n = "simple-keyboard", r = document.querySelector(".".concat(n)), i = e;
                                return {keyboardDOMClass: n, keyboardDOM: r, options: i}
                            })), m(this, "getOptions", (function () {
                                return r.options
                            })), m(this, "getCaretPosition", (function () {
                                return r.caretPosition
                            })), m(this, "getCaretPositionEnd", (function () {
                                return r.caretPositionEnd
                            })), m(this, "registerModule", (function (e, t) {
                                r.modules[e] || (r.modules[e] = {}), t(r.modules[e])
                            })), m(this, "getKeyboardClassString", (function () {
                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                var i = [r.keyboardDOMClass].concat(t).filter((function (e) {
                                    return !!e
                                }));
                                return i.join(" ")
                            })), "undefined" != typeof window) {
                                var i = this.handleParams(t, n), o = i.keyboardDOMClass, s = i.keyboardDOM,
                                    a = i.options, l = void 0 === a ? {} : a;
                                this.utilities = new c({
                                    getOptions: this.getOptions,
                                    getCaretPosition: this.getCaretPosition,
                                    getCaretPositionEnd: this.getCaretPositionEnd,
                                    dispatch: this.dispatch
                                }), this.caretPosition = null, this.caretPositionEnd = null, this.keyboardDOM = s, this.options = function (e) {
                                    for (var t = 1; t < arguments.length; t++) {
                                        var n = null != arguments[t] ? arguments[t] : {};
                                        t % 2 ? y(Object(n), !0).forEach((function (t) {
                                            m(e, t, n[t])
                                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : y(Object(n)).forEach((function (t) {
                                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                                        }))
                                    }
                                    return e
                                }({
                                    layoutName: "default",
                                    theme: "hg-theme-default",
                                    inputName: "default",
                                    preventMouseDownDefault: !1,
                                    enableLayoutCandidates: !0,
                                    excludeFromLayout: {}
                                }, l), this.keyboardPluginClasses = "", c.bindMethods(e, this);
                                var f = this.options.inputName, p = void 0 === f ? this.defaultName : f;
                                if (this.input = {}, this.input[p] = "", this.keyboardDOMClass = o, this.buttonElements = {}, window.SimpleKeyboardInstances || (window.SimpleKeyboardInstances = {}), this.currentInstanceName = this.utilities.camelCase(this.keyboardDOMClass), window.SimpleKeyboardInstances[this.currentInstanceName] = this, this.allKeyboardInstances = window.SimpleKeyboardInstances, this.keyboardInstanceNames = Object.keys(window.SimpleKeyboardInstances), this.isFirstKeyboardInstance = this.keyboardInstanceNames[0] === this.currentInstanceName, this.physicalKeyboard = new u({
                                    dispatch: this.dispatch,
                                    getOptions: this.getOptions
                                }), this.candidateBox = this.options.enableLayoutCandidates ? new d({utilities: this.utilities}) : null, !this.keyboardDOM) throw console.warn('".'.concat(o, '" was not found in the DOM.')), new Error("KEYBOARD_DOM_ERROR");
                                this.render(), this.modules = {}, this.loadModules()
                            }
                        }

                        var t, n;
                        return t = e, (n = [{
                            key: "setCaretPosition", value: function (e) {
                                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e;
                                this.caretPosition = e, this.caretPositionEnd = t
                            }
                        }, {
                            key: "getInputCandidates", value: function (e) {
                                var t = this, n = this.options, r = n.layoutCandidates,
                                    i = n.layoutCandidatesCaseSensitiveMatch;
                                if (!r || "object" !== h(r)) return {};
                                var o = Object.keys(r).filter((function (n) {
                                    var r = e.substring(0, t.getCaretPositionEnd() || 0) || e,
                                        o = new RegExp("".concat(n, "$"), i ? "g" : "gi");
                                    return !!f(r.matchAll(o)).length
                                }));
                                if (o.length > 1) {
                                    var s = o.sort((function (e, t) {
                                        return t.length - e.length
                                    }))[0];
                                    return {candidateKey: s, candidateValue: r[s]}
                                }
                                if (o.length) {
                                    var a = o[0];
                                    return {candidateKey: a, candidateValue: r[a]}
                                }
                                return {}
                            }
                        }, {
                            key: "showCandidatesBox", value: function (e, t, n) {
                                var r = this;
                                this.candidateBox && this.candidateBox.show({
                                    candidateValue: t,
                                    targetElement: n,
                                    onSelect: function (t, n) {
                                        var i = r.options.layoutCandidatesCaseSensitiveMatch, o = t.normalize("NFD"),
                                            s = r.getInput(r.options.inputName, !0), a = r.getCaretPositionEnd() || 0,
                                            l = s.substring(0, a || 0) || s,
                                            c = new RegExp("".concat(e, "$"), i ? "g" : "gi"), u = l.replace(c, o),
                                            d = s.replace(l, u), f = u.length - l.length, p = (a || s.length) + f;
                                        p < 0 && (p = 0), r.setInput(d, r.options.inputName, !0), r.setCaretPosition(p), "function" == typeof r.options.onChange && r.options.onChange(r.getInput(r.options.inputName, !0), n), "function" == typeof r.options.onChangeAll && r.options.onChangeAll(r.getAllInputs(), n)
                                    }
                                })
                            }
                        }, {
                            key: "handleButtonClicked", value: function (e, t) {
                                var n = this.options, r = n.inputName, i = void 0 === r ? this.defaultName : r,
                                    o = n.debug;
                                if ("{//}" !== e) {
                                    this.input[i] || (this.input[i] = "");
                                    var s = this.utilities.getUpdatedInput(e, this.input[i], this.caretPosition, this.caretPositionEnd);
                                    if (this.utilities.isStandardButton(e) && this.activeInputElement && this.input[i] && this.input[i] === s && 0 === this.caretPosition && this.caretPositionEnd === s.length) return this.setInput("", this.options.inputName, !0), this.setCaretPosition(0), this.activeInputElement.value = "", this.activeInputElement.setSelectionRange(0, 0), void this.handleButtonClicked(e, t);
                                    if ("function" == typeof this.options.onKeyPress && this.options.onKeyPress(e, t), this.input[i] !== s && (!this.options.inputPattern || this.options.inputPattern && this.inputPatternIsValid(s))) {
                                        if (this.options.maxLength && this.utilities.handleMaxLength(this.input, s)) return;
                                        var a = this.utilities.getUpdatedInput(e, this.input[i], this.caretPosition, this.caretPositionEnd, !0);
                                        if (this.setInput(a, this.options.inputName, !0), o && console.log("Input changed:", this.getAllInputs()), this.options.debug && console.log("Caret at: ", this.getCaretPosition(), this.getCaretPositionEnd(), "(".concat(this.keyboardDOMClass, ")")), this.options.syncInstanceInputs && this.syncInstanceInputs(), "function" == typeof this.options.onChange && this.options.onChange(this.getInput(this.options.inputName, !0), t), "function" == typeof this.options.onChangeAll && this.options.onChangeAll(this.getAllInputs(), t), null != t && t.target && this.options.enableLayoutCandidates) {
                                            var l, c = this.getInputCandidates(s), u = c.candidateKey,
                                                d = c.candidateValue;
                                            u && d ? this.showCandidatesBox(u, d, this.keyboardDOM) : null === (l = this.candidateBox) || void 0 === l || l.destroy()
                                        }
                                    }
                                    o && console.log("Key pressed:", e)
                                }
                            }
                        }, {
                            key: "getMouseHold", value: function () {
                                return this.isMouseHold
                            }
                        }, {
                            key: "setMouseHold", value: function (e) {
                                this.options.syncInstanceInputs ? this.dispatch((function (t) {
                                    t.isMouseHold = e
                                })) : this.isMouseHold = e
                            }
                        }, {
                            key: "handleButtonMouseDown", value: function (e, t) {
                                var n = this;
                                t && (this.options.preventMouseDownDefault && t.preventDefault(), this.options.stopMouseDownPropagation && t.stopPropagation(), t.target.classList.add(this.activeButtonClass)), this.holdInteractionTimeout && clearTimeout(this.holdInteractionTimeout), this.holdTimeout && clearTimeout(this.holdTimeout), this.setMouseHold(!0), this.options.disableButtonHold || (this.holdTimeout = window.setTimeout((function () {
                                    (n.getMouseHold() && (!e.includes("{") && !e.includes("}") || "{delete}" === e || "{backspace}" === e || "{bksp}" === e || "{space}" === e || "{tab}" === e) || "{arrowright}" === e || "{arrowleft}" === e || "{arrowup}" === e || "{arrowdown}" === e) && (n.options.debug && console.log("Button held:", e), n.handleButtonHold(e)), clearTimeout(n.holdTimeout)
                                }), 500))
                            }
                        }, {
                            key: "handleButtonMouseUp", value: function (e, t) {
                                var n = this;
                                t && (this.options.preventMouseUpDefault && t.preventDefault && t.preventDefault(), this.options.stopMouseUpPropagation && t.stopPropagation && t.stopPropagation(), !(t.target === this.keyboardDOM || t.target && this.keyboardDOM.contains(t.target) || this.candidateBox && this.candidateBox.candidateBoxElement && (t.target === this.candidateBox.candidateBoxElement || t.target && this.candidateBox.candidateBoxElement.contains(t.target))) && this.candidateBox && this.candidateBox.destroy()), this.recurseButtons((function (e) {
                                    e.classList.remove(n.activeButtonClass)
                                })), this.setMouseHold(!1), this.holdInteractionTimeout && clearTimeout(this.holdInteractionTimeout), e && "function" == typeof this.options.onKeyReleased && this.options.onKeyReleased(e)
                            }
                        }, {
                            key: "handleKeyboardContainerMouseDown", value: function (e) {
                                this.options.preventMouseDownDefault && e.preventDefault()
                            }
                        }, {
                            key: "handleButtonHold", value: function (e) {
                                var t = this;
                                this.holdInteractionTimeout && clearTimeout(this.holdInteractionTimeout), this.holdInteractionTimeout = window.setTimeout((function () {
                                    t.getMouseHold() ? (t.handleButtonClicked(e), t.handleButtonHold(e)) : clearTimeout(t.holdInteractionTimeout)
                                }), 100)
                            }
                        }, {
                            key: "syncInstanceInputs", value: function () {
                                var e = this;
                                this.dispatch((function (t) {
                                    t.replaceInput(e.input), t.setCaretPosition(e.caretPosition, e.caretPositionEnd)
                                }))
                            }
                        }, {
                            key: "clearInput", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.options.inputName || this.defaultName;
                                this.input[e] = "", this.setCaretPosition(0), this.options.syncInstanceInputs && this.syncInstanceInputs()
                            }
                        }, {
                            key: "getInput", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.options.inputName || this.defaultName,
                                    t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                                if (this.options.syncInstanceInputs && !t && this.syncInstanceInputs(), this.options.rtl) {
                                    var n = this.input[e].replace("‫", "").replace("‬", "");
                                    return "‫" + n + "‬"
                                }
                                return this.input[e]
                            }
                        }, {
                            key: "getAllInputs", value: function () {
                                var e = this, t = {};
                                return Object.keys(this.input).forEach((function (n) {
                                    t[n] = e.getInput(n, !0)
                                })), t
                            }
                        }, {
                            key: "setInput", value: function (e) {
                                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.options.inputName || this.defaultName,
                                    n = arguments.length > 2 ? arguments[2] : void 0;
                                this.input[t] = e, !n && this.options.syncInstanceInputs && this.syncInstanceInputs()
                            }
                        }, {
                            key: "replaceInput", value: function (e) {
                                this.input = e
                            }
                        }, {
                            key: "setOptions", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                    t = this.changedOptions(e);
                                this.options = Object.assign(this.options, e), t.length && (this.options.debug && console.log("changedOptions", t), this.onSetOptions(t), this.render())
                            }
                        }, {
                            key: "changedOptions", value: function (e) {
                                var t = this;
                                return Object.keys(e).filter((function (n) {
                                    return JSON.stringify(e[n]) !== JSON.stringify(t.options[n])
                                }))
                            }
                        }, {
                            key: "onSetOptions", value: function () {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                                e.includes("layoutName") && this.candidateBox && this.candidateBox.destroy(), (e.includes("layoutCandidatesPageSize") || e.includes("layoutCandidates")) && this.candidateBox && (this.candidateBox.destroy(), this.candidateBox = new d({utilities: this.utilities}))
                            }
                        }, {
                            key: "resetRows", value: function () {
                                this.keyboardRowsDOM && this.keyboardRowsDOM.remove(), this.keyboardDOM.className = this.keyboardDOMClass, this.keyboardDOM.setAttribute("data-skInstance", this.currentInstanceName), this.buttonElements = {}
                            }
                        }, {
                            key: "dispatch", value: function (e) {
                                if (!window.SimpleKeyboardInstances) throw console.warn("SimpleKeyboardInstances is not defined. Dispatch cannot be called."), new Error("INSTANCES_VAR_ERROR");
                                return Object.keys(window.SimpleKeyboardInstances).forEach((function (t) {
                                    e(window.SimpleKeyboardInstances[t], t)
                                }))
                            }
                        }, {
                            key: "addButtonTheme", value: function (e, t) {
                                var n = this;
                                t && e && (e.split(" ").forEach((function (r) {
                                    t.split(" ").forEach((function (t) {
                                        n.options.buttonTheme || (n.options.buttonTheme = []);
                                        var i = !1;
                                        n.options.buttonTheme.map((function (e) {
                                            if (null != e && e.class.split(" ").includes(t)) {
                                                i = !0;
                                                var n = e.buttons.split(" ");
                                                n.includes(r) || (i = !0, n.push(r), e.buttons = n.join(" "))
                                            }
                                            return e
                                        })), i || n.options.buttonTheme.push({class: t, buttons: e})
                                    }))
                                })), this.render())
                            }
                        }, {
                            key: "removeButtonTheme", value: function (e, t) {
                                var n = this;
                                if (!e && !t) return this.options.buttonTheme = [], void this.render();
                                e && Array.isArray(this.options.buttonTheme) && this.options.buttonTheme.length && (e.split(" ").forEach((function (e) {
                                    var r, i;
                                    null === (r = n.options) || void 0 === r || null === (i = r.buttonTheme) || void 0 === i || i.map((function (r, i) {
                                        if (r && t && t.includes(r.class) || !t) {
                                            var o, s,
                                                a = null === (o = r) || void 0 === o ? void 0 : o.buttons.split(" ").filter((function (t) {
                                                    return t !== e
                                                }));
                                            r && null != a && a.length ? r.buttons = a.join(" ") : (null === (s = n.options.buttonTheme) || void 0 === s || s.splice(i, 1), r = null)
                                        }
                                        return r
                                    }))
                                })), this.render())
                            }
                        }, {
                            key: "getButtonElement", value: function (e) {
                                var t, n = this.buttonElements[e];
                                return n && (t = n.length > 1 ? n : n[0]), t
                            }
                        }, {
                            key: "inputPatternIsValid", value: function (e) {
                                var t, n = this.options.inputPattern;
                                if ((t = n instanceof RegExp ? n : n[this.options.inputName || this.defaultName]) && e) {
                                    var r = t.test(e);
                                    return this.options.debug && console.log('inputPattern ("'.concat(t, '"): ').concat(r ? "passed" : "did not pass!")), r
                                }
                                return !0
                            }
                        }, {
                            key: "setEventListeners", value: function () {
                                !this.isFirstKeyboardInstance && this.allKeyboardInstances || (this.options.debug && console.log("Caret handling started (".concat(this.keyboardDOMClass, ")")), document.addEventListener("keyup", this.handleKeyUp), document.addEventListener("keydown", this.handleKeyDown), document.addEventListener("mouseup", this.handleMouseUp), document.addEventListener("touchend", this.handleTouchEnd), document.addEventListener("select", this.handleSelect), document.addEventListener("selectionchange", this.handleSelectionChange))
                            }
                        }, {
                            key: "handleKeyUp", value: function (e) {
                                this.caretEventHandler(e), this.options.physicalKeyboardHighlight && this.physicalKeyboard.handleHighlightKeyUp(e)
                            }
                        }, {
                            key: "handleKeyDown", value: function (e) {
                                this.options.physicalKeyboardHighlight && this.physicalKeyboard.handleHighlightKeyDown(e)
                            }
                        }, {
                            key: "handleMouseUp", value: function (e) {
                                this.caretEventHandler(e)
                            }
                        }, {
                            key: "handleTouchEnd", value: function (e) {
                                this.caretEventHandler(e)
                            }
                        }, {
                            key: "handleSelect", value: function (e) {
                                this.caretEventHandler(e)
                            }
                        }, {
                            key: "handleSelectionChange", value: function (e) {
                                this.caretEventHandler(e)
                            }
                        }, {
                            key: "caretEventHandler", value: function (e) {
                                var t, n = this;
                                e.target.tagName && (t = e.target.tagName.toLowerCase()), this.dispatch((function (r) {
                                    var i = e.target === r.keyboardDOM || e.target && r.keyboardDOM.contains(e.target);
                                    n.options.syncInstanceInputs && Array.isArray(e.path) && (i = e.path.some((function (e) {
                                        var t;
                                        return null == e || null === (t = e.hasAttribute) || void 0 === t ? void 0 : t.call(e, "data-skInstance")
                                    }))), ("textarea" === t || "input" === t && ["text", "search", "url", "tel", "password"].includes(e.target.type)) && !r.options.disableCaretPositioning ? (r.setCaretPosition(e.target.selectionStart, e.target.selectionEnd), n.activeInputElement = e.target, r.options.debug && console.log("Caret at: ", r.getCaretPosition(), r.getCaretPositionEnd(), e && e.target.tagName.toLowerCase(), "(".concat(r.keyboardDOMClass, ")"))) : !r.options.disableCaretPositioning && i || "selectionchange" === (null == e ? void 0 : e.type) || (r.setCaretPosition(null), n.activeInputElement = null, r.options.debug && console.log('Caret position reset due to "'.concat(null == e ? void 0 : e.type, '" event'), e))
                                }))
                            }
                        }, {
                            key: "recurseButtons", value: function (e) {
                                var t = this;
                                e && Object.keys(this.buttonElements).forEach((function (n) {
                                    return t.buttonElements[n].forEach(e)
                                }))
                            }
                        }, {
                            key: "destroy", value: function () {
                                this.options.debug && console.log("Destroying simple-keyboard instance: ".concat(this.currentInstanceName)), document.removeEventListener("keyup", this.handleKeyUp), document.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("mouseup", this.handleMouseUp), document.removeEventListener("touchend", this.handleTouchEnd), document.removeEventListener("select", this.handleSelect), document.removeEventListener("selectionchange", this.handleSelectionChange), document.onpointerup = null, document.ontouchend = null, document.ontouchcancel = null, document.onmouseup = null, this.recurseButtons((function (e) {
                                    e && (e.onpointerdown = null, e.onpointerup = null, e.onpointercancel = null, e.ontouchstart = null, e.ontouchend = null, e.ontouchcancel = null, e.onclick = null, e.onmousedown = null, e.onmouseup = null, e.remove(), e = null)
                                })), this.keyboardDOM.onpointerdown = null, this.keyboardDOM.ontouchstart = null, this.keyboardDOM.onmousedown = null, this.resetRows(), this.candidateBox && (this.candidateBox.destroy(), this.candidateBox = null), this.activeInputElement = null, this.keyboardDOM.removeAttribute("data-skInstance"), this.keyboardDOM.innerHTML = "", window.SimpleKeyboardInstances[this.currentInstanceName] = null, delete window.SimpleKeyboardInstances[this.currentInstanceName], this.initialized = !1
                            }
                        }, {
                            key: "getButtonThemeClasses", value: function (e) {
                                var t = this.options.buttonTheme, n = [];
                                return Array.isArray(t) && t.forEach((function (t) {
                                    if (t && t.class && "string" == typeof t.class && t.buttons && "string" == typeof t.buttons) {
                                        var r = t.class.split(" ");
                                        t.buttons.split(" ").includes(e) && (n = [].concat(f(n), f(r)))
                                    } else console.warn('Incorrect "buttonTheme". Please check the documentation.', t)
                                })), n
                            }
                        }, {
                            key: "setDOMButtonAttributes", value: function (e, t) {
                                var n = this.options.buttonAttributes;
                                Array.isArray(n) && n.forEach((function (n) {
                                    n.attribute && "string" == typeof n.attribute && n.value && "string" == typeof n.value && n.buttons && "string" == typeof n.buttons ? n.buttons.split(" ").includes(e) && t(n.attribute, n.value) : console.warn('Incorrect "buttonAttributes". Please check the documentation.', n)
                                }))
                            }
                        }, {
                            key: "onTouchDeviceDetected", value: function () {
                                this.processAutoTouchEvents(), this.disableContextualWindow()
                            }
                        }, {
                            key: "disableContextualWindow", value: function () {
                                window.oncontextmenu = function (e) {
                                    if (e.target.classList.contains("hg-button")) return e.preventDefault(), e.stopPropagation(), !1
                                }
                            }
                        }, {
                            key: "processAutoTouchEvents", value: function () {
                                this.options.autoUseTouchEvents && (this.options.useTouchEvents = !0, this.options.debug && console.log("autoUseTouchEvents: Touch device detected, useTouchEvents enabled."))
                            }
                        }, {
                            key: "onInit", value: function () {
                                this.options.debug && console.log("".concat(this.keyboardDOMClass, " Initialized")), this.setEventListeners(), "function" == typeof this.options.onInit && this.options.onInit(this)
                            }
                        }, {
                            key: "beforeFirstRender", value: function () {
                                this.utilities.isTouchDevice() && this.onTouchDeviceDetected(), "function" == typeof this.options.beforeFirstRender && this.options.beforeFirstRender(this), this.isFirstKeyboardInstance && this.utilities.pointerEventsSupported() && !this.options.useTouchEvents && !this.options.useMouseEvents && this.options.debug && console.log("Using PointerEvents as it is supported by this browser"), this.options.useTouchEvents && this.options.debug && console.log("useTouchEvents has been enabled. Only touch events will be used.")
                            }
                        }, {
                            key: "beforeRender", value: function () {
                                "function" == typeof this.options.beforeRender && this.options.beforeRender(this)
                            }
                        }, {
                            key: "onRender", value: function () {
                                "function" == typeof this.options.onRender && this.options.onRender(this)
                            }
                        }, {
                            key: "onModulesLoaded", value: function () {
                                "function" == typeof this.options.onModulesLoaded && this.options.onModulesLoaded(this)
                            }
                        }, {
                            key: "loadModules", value: function () {
                                var e = this;
                                Array.isArray(this.options.modules) && (this.options.modules.forEach((function (t) {
                                    var n = new t(e);
                                    n.init && n.init(e)
                                })), this.keyboardPluginClasses = "modules-loaded", this.render(), this.onModulesLoaded())
                            }
                        }, {
                            key: "getModuleProp", value: function (e, t) {
                                return !!this.modules[e] && this.modules[e][t]
                            }
                        }, {
                            key: "getModulesList", value: function () {
                                return Object.keys(this.modules)
                            }
                        }, {
                            key: "parseRowDOMContainers", value: function (e, t, n, r) {
                                var i = this, o = Array.from(e.children), s = 0;
                                return o.length && n.forEach((function (n, a) {
                                    var l = r[a];
                                    if (!(l && l > n)) return !1;
                                    var c = n - s, u = l - s, d = document.createElement("div");
                                    d.className += "hg-button-container";
                                    var f = "".concat(i.options.layoutName, "-r").concat(t, "c").concat(a);
                                    d.setAttribute("data-skUID", f);
                                    var p = o.splice(c, u - c + 1);
                                    s = u - c, p.forEach((function (e) {
                                        return d.appendChild(e)
                                    })), o.splice(c, 0, d), e.innerHTML = "", o.forEach((function (t) {
                                        return e.appendChild(t)
                                    })), i.options.debug && console.log("rowDOMContainer", p, c, u, s + 1)
                                })), e
                            }
                        }, {
                            key: "render", value: function () {
                                var e = this;
                                this.resetRows(), this.initialized || this.beforeFirstRender(), this.beforeRender();
                                var t = "hg-layout-".concat(this.options.layoutName), n = this.options.layout || {
                                        default: ["` 1 2 3 4 5 6 7 8 9 0 - = {bksp}", "{tab} q w e r t y u i o p [ ] \\", "{lock} a s d f g h j k l ; ' {enter}", "{shift} z x c v b n m , . / {shift}", ".com @ {space}"],
                                        shift: ["~ ! @ # $ % ^ & * ( ) _ + {bksp}", "{tab} Q W E R T Y U I O P { } |", '{lock} A S D F G H J K L : " {enter}', "{shift} Z X C V B N M < > ? {shift}", ".com @ {space}"]
                                    }, r = this.options.useTouchEvents || !1, i = r ? "hg-touch-events" : "",
                                    o = this.options.useMouseEvents || !1, s = this.options.disableRowButtonContainers;
                                this.keyboardDOM.className = this.getKeyboardClassString(this.options.theme, t, this.keyboardPluginClasses, i), this.keyboardDOM.setAttribute("data-skInstance", this.currentInstanceName), this.keyboardRowsDOM = document.createElement("div"), this.keyboardRowsDOM.className = "hg-rows", n[this.options.layoutName || this.defaultName].forEach((function (t, n) {
                                    var i = t.split(" ");
                                    e.options.excludeFromLayout && e.options.excludeFromLayout[e.options.layoutName || e.defaultName] && (i = i.filter((function (t) {
                                        return e.options.excludeFromLayout && !e.options.excludeFromLayout[e.options.layoutName || e.defaultName].includes(t)
                                    })));
                                    var a = document.createElement("div");
                                    a.className += "hg-row";
                                    var l = [], c = [];
                                    i.forEach((function (t, i) {
                                        var u, d = !s && "string" == typeof t && t.length > 1 && 0 === t.indexOf("["),
                                            p = !s && "string" == typeof t && t.length > 1 && t.indexOf("]") === t.length - 1;
                                        d && (l.push(i), t = t.replace(/\[/g, "")), p && (c.push(i), t = t.replace(/\]/g, ""));
                                        var h = e.utilities.getButtonClass(t),
                                            y = e.utilities.getButtonDisplayName(t, e.options.display, e.options.mergeDisplay),
                                            m = e.options.useButtonTag ? "button" : "div",
                                            v = document.createElement(m);
                                        v.className += "hg-button ".concat(h), (u = v.classList).add.apply(u, f(e.getButtonThemeClasses(t))), e.setDOMButtonAttributes(t, (function (e, t) {
                                            v.setAttribute(e, t)
                                        })), e.activeButtonClass = "hg-activeButton", !e.utilities.pointerEventsSupported() || r || o ? r ? (v.ontouchstart = function (n) {
                                            e.handleButtonClicked(t, n), e.handleButtonMouseDown(t, n)
                                        }, v.ontouchend = function (n) {
                                            e.handleButtonMouseUp(t, n)
                                        }, v.ontouchcancel = function (n) {
                                            e.handleButtonMouseUp(t, n)
                                        }) : (v.onclick = function (n) {
                                            e.setMouseHold(!1), "function" != typeof e.options.onKeyReleased && e.handleButtonClicked(t, n)
                                        }, v.onmousedown = function (n) {
                                            "function" != typeof e.options.onKeyReleased || e.isMouseHold || e.handleButtonClicked(t, n), e.handleButtonMouseDown(t, n)
                                        }, v.onmouseup = function (n) {
                                            e.handleButtonMouseUp(t, n)
                                        }) : (v.onpointerdown = function (n) {
                                            e.handleButtonClicked(t, n), e.handleButtonMouseDown(t, n)
                                        }, v.onpointerup = function (n) {
                                            e.handleButtonMouseUp(t, n)
                                        }, v.onpointercancel = function (n) {
                                            e.handleButtonMouseUp(t, n)
                                        }), v.setAttribute("data-skBtn", t);
                                        var g = "".concat(e.options.layoutName, "-r").concat(n, "b").concat(i);
                                        v.setAttribute("data-skBtnUID", g);
                                        var b = document.createElement("span");
                                        b.innerHTML = y, v.appendChild(b), e.buttonElements[t] || (e.buttonElements[t] = []), e.buttonElements[t].push(v), a.appendChild(v)
                                    })), a = e.parseRowDOMContainers(a, n, l, c), e.keyboardRowsDOM.appendChild(a)
                                })), this.keyboardDOM.appendChild(this.keyboardRowsDOM), this.onRender(), this.initialized || (this.initialized = !0, !this.utilities.pointerEventsSupported() || r || o ? r ? (document.ontouchend = function (t) {
                                    return e.handleButtonMouseUp(void 0, t)
                                }, document.ontouchcancel = function (t) {
                                    return e.handleButtonMouseUp(void 0, t)
                                }, this.keyboardDOM.ontouchstart = function (t) {
                                    return e.handleKeyboardContainerMouseDown(t)
                                }) : r || (document.onmouseup = function (t) {
                                    return e.handleButtonMouseUp(void 0, t)
                                }, this.keyboardDOM.onmousedown = function (t) {
                                    return e.handleKeyboardContainerMouseDown(t)
                                }) : (document.onpointerup = function (t) {
                                    return e.handleButtonMouseUp(void 0, t)
                                }, this.keyboardDOM.onpointerdown = function (t) {
                                    return e.handleKeyboardContainerMouseDown(t)
                                }), this.onInit())
                            }
                        }]) && function (e, t) {
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                            }
                        }(t.prototype, n), Object.defineProperty(t, "prototype", {writable: !1}), e
                    }()
                }(), r
            }()
        }, "object" == typeof n && "object" == typeof t ? t.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof n ? n.SimpleKeyboard = r() : this.SimpleKeyboard = r()
    }, {}],
    139: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.Build = void 0, n.Build = {
            short: "0.73.7",
            version: "0.73.7 (e04ee0910829f6c959f628ca14fd172c)",
            buildSeed: 1658134819140
        }
    }, {}],
    140: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.deprecatedButton = n.createButton = void 0;
        const r = e("../dom/keys"), i = e("../dom/pointer"), o = function () {
            const e = {};
            for (const t of Object.keys(r.namedKeyCodes)) e[r.namedKeyCodes[t]] = t.substr(4, 2);
            return e
        }();

        function s(e, t, n) {
            const r = Math.round(.6 * n), o = Math.round(.5 * n), s = Math.max(1, Math.round(n / 20)),
                l = h[e.toLowerCase()], c = void 0 === l ? e : "", u = a("emulator-button-touch-zone"),
                d = a("emulator-button"),
                f = a("emulator-button-text", void 0 === l ? void 0 === c || 0 === c.length ? "□" : c.substr(0, 1).toUpperCase() : "");
            void 0 !== l && (d.style.backgroundImage = 'url("' + l + '")'), d.style.width = r + "px", d.style.height = r + "px", f.style.fontSize = o + "px", u.widthPx = n - 2 * s, u.heightPx = n - 2 * s, u.style.width = u.widthPx + "px", u.style.height = u.heightPx + "px", u.style.borderWidth = s + "px", u.appendChild(d), u.appendChild(f);
            const p = e => {
                void 0 !== t.onDown && t.onDown(), void 0 !== t.onClick && t.onClick(), e.stopPropagation(), e.preventDefault()
            }, y = e => {
                void 0 !== t.onUp && t.onUp(), e.stopPropagation(), e.preventDefault()
            }, m = e => {
                e.stopPropagation(), e.preventDefault()
            }, v = {capture: !0};
            for (const e of i.pointer.starters) u.addEventListener(e, p, v);
            for (const e of i.pointer.enders) u.addEventListener(e, y, v);
            for (const e of i.pointer.changers) u.addEventListener(e, m, v);
            for (const e of i.pointer.leavers) u.addEventListener(e, m, v);
            for (const e of i.pointer.prevents) u.addEventListener(e, m, v);
            return u
        }

        function a(e, t) {
            const n = document.createElement("div");
            return n.className = e, void 0 !== t && (n.innerHTML = t), n
        }

        function l(e) {
            return "number" == typeof e ? o[e] : e
        }

        function c(e, t) {
            return "click" === e.action ? {onClick: () => t.fireKeyPress(e.mapTo)} : {
                onDown: () => t.fireKeyDown(e.mapTo),
                onUp: () => t.fireKeyUp(e.mapTo)
            }
        }

        n.createButton = s, n.deprecatedButton = function (e, t, n, i) {
            const o = Math.round(i / 4), a = [];
            for (const t of n) {
                if (t.mapTo === r.KBD_NONE) continue;
                const n = s((t.symbol || l(t.mapTo)).toUpperCase(), c(t, e), i);
                n.style.position = "absolute";
                const u = t.style;
                if (u) for (const e of Object.keys(u)) n.style[e] = u[e];
                if (void 0 !== t.position) {
                    const e = t.position.left, r = t.position.top, s = t.position.bottom, a = t.position.right;
                    void 0 !== e && (n.style.left = o * e + i * (e - 1) + "px"), void 0 !== a && (n.style.right = o * a + i * (a - 1) + "px"), void 0 !== r && (n.style.top = o * r + i * (r - 1) + "px"), void 0 !== s && (n.style.bottom = o * s + i * (s - 1) + "px")
                }
                e.mouseOverlay.appendChild(n), a.push(n)
            }
            return () => {
                for (const t of a) t.parentElement === e.mouseOverlay && e.mouseOverlay.removeChild(t)
            }
        };
        const u = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' fill='%23FFF' enable-background='new 0 0 20 20' xml:space='preserve'%3E%3Ctitle%3EShape%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cg id='Page-1' sketch:type='MSPage'%3E%3Cg id='Artboard-1' transform='translate(-3.000000, -1.000000)' sketch:type='MSArtboardGroup'%3E%3Cpath id='Shape' sketch:type='MSShapeGroup' d='M19,12c-0.3,0-0.5,0.1-0.7,0.3L14,16.6V3c0-0.5-0.4-1-1-1s-1,0.5-1,1v13.6 l-4.3-4.3C7.5,12.1,7.3,12,7,12c-0.5,0-1,0.4-1,1c0,0.3,0.1,0.5,0.3,0.7l6,6c0.2,0.2,0.4,0.3,0.7,0.3s0.5-0.1,0.7-0.3l6-6 c0.2-0.2,0.3-0.4,0.3-0.7C20,12.4,19.5,12,19,12L19,12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
            d = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' enable-background='new 0 0 20 20' fill='%23FFF' xml:space='preserve'%3E%3Cg id='left_arrow_1_'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18,9H4.41l4.29-4.29C8.89,4.53,9,4.28,9,4c0-0.55-0.45-1-1-1 C7.72,3,7.47,3.11,7.29,3.29l-6,6C1.11,9.47,1,9.72,1,10c0,0.28,0.11,0.53,0.29,0.71l6,6C7.47,16.89,7.72,17,8,17 c0.55,0,1-0.45,1-1c0-0.28-0.11-0.53-0.29-0.71L4.41,11H18c0.55,0,1-0.45,1-1C19,9.45,18.55,9,18,9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
            f = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' fill='%23fff' viewBox='0 0 20 20' enable-background='new 0 0 20 20' xml:space='preserve'%3E%3Cg id='right_arrow_1_'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.71,9.29l-6-6C12.53,3.11,12.28,3,12,3c-0.55,0-1,0.45-1,1 c0,0.28,0.11,0.53,0.29,0.71L15.59,9H2c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1h13.59l-4.29,4.29C11.11,15.47,11,15.72,11,16 c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29l6-6C18.89,10.53,19,10.28,19,10C19,9.72,18.89,9.47,18.71,9.29z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
            p = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' fill='%23fff' viewBox='0 0 20 20' enable-background='new 0 0 20 20' xml:space='preserve'%3E%3Cg id='key_enter_1_'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M18,2c-0.55,0-1,0.45-1,1v5c0,2.21-1.79,4-4,4H4.41l2.29-2.29 C6.89,9.53,7,9.28,7,9c0-0.55-0.45-1-1-1C5.72,8,5.47,8.11,5.29,8.29l-4,4C1.11,12.47,1,12.72,1,13c0,0.28,0.11,0.53,0.29,0.71 l4,4C5.47,17.89,5.72,18,6,18c0.55,0,1-0.45,1-1c0-0.28-0.11-0.53-0.29-0.71L4.41,14H13c3.31,0,6-2.69,6-6V3C19,2.45,18.55,2,18,2 z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
            h = {
                fullscreen: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' xml:space='preserve'%3E%3Cg id='maximize_1_' fill='%23FFFFFF'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.99,8.99c-0.28,0-0.53,0.11-0.71,0.29l-3.29,3.29v-1.59c0-0.55-0.45-1-1-1 s-1,0.45-1,1v4c0,0.55,0.45,1,1,1h4c0.55,0,1-0.45,1-1s-0.45-1-1-1H3.41L6.7,10.7c0.18-0.18,0.29-0.43,0.29-0.71 C6.99,9.44,6.54,8.99,5.99,8.99z M14.99-0.01h-4c-0.55,0-1,0.45-1,1s0.45,1,1,1h1.59L9.28,5.29C9.1,5.47,8.99,5.72,8.99,5.99 c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29l3.29-3.29v1.59c0,0.55,0.45,1,1,1s1-0.45,1-1v-4C15.99,0.44,15.54-0.01,14.99-0.01 z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
                save: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 18.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' fill='%23FFFFFF' xml:space='preserve'%3E%3Cg id='floppy_disk'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.71,2.29l-2-2C13.53,0.11,13.28,0,13,0h-1v6H4V0H1C0.45,0,0,0.45,0,1v14 c0,0.55,0.45,1,1,1h14c0.55,0,1-0.45,1-1V3C16,2.72,15.89,2.47,15.71,2.29z M14,15H2V9c0-0.55,0.45-1,1-1h10c0.55,0,1,0.45,1,1V15 z M11,1H9v4h2V1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A",
                options: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' enable-background='new 0 0 20 20' fill='%23FFF' xml:space='preserve'%3E%3Cg id='cog_2_'%3E%3Cg%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19,8h-2.31c-0.14-0.46-0.33-0.89-0.56-1.3l1.7-1.7c0.39-0.39,0.39-1.02,0-1.41 l-1.41-1.41c-0.39-0.39-1.02-0.39-1.41,0l-1.7,1.7c-0.41-0.22-0.84-0.41-1.3-0.55V1c0-0.55-0.45-1-1-1H9C8.45,0,8,0.45,8,1v2.33 C7.52,3.47,7.06,3.67,6.63,3.91L5,2.28c-0.37-0.37-0.98-0.37-1.36,0L2.28,3.64C1.91,4.02,1.91,4.63,2.28,5l1.62,1.62 C3.66,7.06,3.46,7.51,3.31,8H1C0.45,8,0,8.45,0,9v2c0,0.55,0.45,1,1,1h2.31c0.14,0.46,0.33,0.89,0.56,1.3L2.17,15 c-0.39,0.39-0.39,1.02,0,1.41l1.41,1.41c0.39,0.39,1.02,0.39,1.41,0l1.7-1.7c0.41,0.22,0.84,0.41,1.3,0.55V19c0,0.55,0.45,1,1,1h2 c0.55,0,1-0.45,1-1v-2.33c0.48-0.14,0.94-0.35,1.37-0.59L15,17.72c0.37,0.37,0.98,0.37,1.36,0l1.36-1.36 c0.37-0.37,0.37-0.98,0-1.36l-1.62-1.62c0.24-0.43,0.45-0.89,0.6-1.38H19c0.55,0,1-0.45,1-1V9C20,8.45,19.55,8,19,8z M10,14 c-2.21,0-4-1.79-4-4c0-2.21,1.79-4,4-4s4,1.79,4,4C14,12.21,12.21,14,10,14z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
                keyboard: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 16 16' enable-background='new 0 0 16 16' xml:space='preserve'%3E%3Cg id='manually_entered_data_2_'%3E%3Cg%3E%3Cpath fill='%23FFFFFF' fill-rule='evenodd' clip-rule='evenodd' d='M1,8h3.76l2-2H1C0.45,6,0,6.45,0,7C0,7.55,0.45,8,1,8z M15.49,3.99 C15.8,3.67,16,3.23,16,2.75C16,1.78,15.22,1,14.25,1c-0.48,0-0.92,0.2-1.24,0.51l-1.44,1.44l2.47,2.47L15.49,3.99z M1,4h7.76l2-2 H1C0.45,2,0,2.45,0,3C0,3.55,0.45,4,1,4z M1,10c-0.55,0-1,0.45-1,1c0,0.48,0.35,0.86,0.8,0.96L2.76,10H1z M10.95,3.57l-6.69,6.69 l2.47,2.47l6.69-6.69L10.95,3.57z M15.2,6.04L13.24,8H15c0.55,0,1-0.45,1-1C16,6.52,15.65,6.14,15.2,6.04z M2,15l3.86-1.39 l-2.46-2.44L2,15z M15,10h-3.76l-2,2H15c0.55,0,1-0.45,1-1C16,10.45,15.55,10,15,10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
                up: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Layer_1' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' fill='%23FFF' enable-background='new 0 0 20 20' xml:space='preserve'%3E%3Ctitle%3EShape%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cg id='Page-1' sketch:type='MSPage'%3E%3Cg id='Artboard-1' transform='translate(-3.000000, -1.000000)' sketch:type='MSArtboardGroup'%3E%3Cpath id='Shape' sketch:type='MSShapeGroup' d='M19.7,8.3l-6-6C13.5,2.1,13.3,2,13,2s-0.5,0.1-0.7,0.3l-6,6C6.1,8.5,6,8.7,6,9 c0,0.6,0.5,1,1,1c0.3,0,0.5-0.1,0.7-0.3L12,5.4V19c0,0.5,0.4,1,1,1s1-0.5,1-1V5.4l4.3,4.3C18.5,9.9,18.7,10,19,10c0.5,0,1-0.4,1-1 C20,8.7,19.9,8.5,19.7,8.3L19.7,8.3z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
                down: u,
                do: u,
                dw: u,
                dwn: u,
                left: d,
                le: d,
                lft: d,
                right: f,
                ri: f,
                rght: f,
                rgh: f,
                enter: p,
                en: p,
                enr: p,
                ent: p,
                entr: p
            }
    }, {"../dom/keys": 154, "../dom/pointer": 158, "core-js/modules/web.dom-collections.iterator.js": 124}],
    141: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.getGrid = void 0, n.getGrid = function (e) {
            switch (e) {
                case"square":
                    return new class {
                        constructor() {
                            r(this, "aspect", .625)
                        }

                        getConfiguration(e, t) {
                            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                            const r = this.getCols(), i = this.getRows(), o = Math.floor(r / 2), s = Math.floor(i / 2),
                                a = 5 * e / 100 / 2, l = a, c = (e - 2 * a) / r * n, u = (t - 2 * l) / i * n,
                                d = Math.min(c, u), f = [];
                            for (let n = 0; n < i; ++n) {
                                const c = [];
                                for (let u = 0; u < r; ++u) c.push({
                                    centerX: u < o ? a + d * (u + .5) : e - a - d * (r - u - 1 + .5),
                                    centerY: n < s ? l + d * (n + .5) : t - l - d * (i - n - 1 + .5)
                                });
                                f.push(c)
                            }
                            return {
                                gridType: "square",
                                cells: f,
                                columnWidth: d,
                                rowHeight: d,
                                columnsPadding: a,
                                rowsPadding: l,
                                width: e,
                                height: t
                            }
                        }

                        getCols() {
                            return 10
                        }

                        getRows() {
                            return Math.floor(this.getCols() * this.aspect) + 1
                        }
                    };
                case"honeycomb":
                    return new class {
                        constructor() {
                            r(this, "aspect", .625)
                        }

                        getConfiguration(e, t) {
                            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                            const r = this.getCols(), i = this.getRows(), o = Math.floor(r / 2), s = Math.floor(i / 2),
                                a = 5 * e / 100 / 2, l = a, c = (e - 2 * a) / r * n, u = (t - 2 * l) / i * n,
                                d = Math.min(c, u), f = [];
                            for (let n = 0; n < i; ++n) {
                                const c = [], u = n % 2 == 0 ? r : r - 1, p = n % 2 == 0 ? 0 : d / 2;
                                for (let f = 0; f < u; ++f) c.push({
                                    centerX: f < o ? p + a + d * (f + .5) : p + e - a - d * (r - f - 1 + .5),
                                    centerY: n < s ? l + d * (n + .5) : t - l - d * (i - n - 1 + .5)
                                });
                                f.push(c)
                            }
                            return {
                                gridType: "honeycomb",
                                cells: f,
                                columnWidth: d,
                                rowHeight: d,
                                columnsPadding: a,
                                rowsPadding: l,
                                width: e,
                                height: t
                            }
                        }

                        getCols() {
                            return 10
                        }

                        getRows() {
                            return Math.floor(this.getCols() * this.aspect) + 1
                        }
                    }
            }
            throw new Error("Unknown grid type " + e)
        }
    }, {}],
    142: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.keyboard = void 0, n.keyboard = function (e, t, n) {
            const r = n || {};

            function i(e) {
                return void 0 !== r[e] ? r[e] : e
            }

            return e.setOnKeyDown((e => {
                t.sendKeyEvent(i(e), !0)
            })), e.setOnKeyUp((e => {
                t.sendKeyEvent(i(e), !1)
            })), e.setOnKeyPress((e => {
                t.simulateKeyPress(i(e))
            })), e.setOnKeysPress((e => {
                t.simulateKeyPress(...e)
            })), () => {
                e.setOnKeyDown((e => {
                })), e.setOnKeyUp((e => {
                })), e.setOnKeyPress((e => {
                })), e.setOnKeysPress((e => {
                }))
            }
        }
    }, {"core-js/modules/web.dom-collections.iterator.js": 124}],
    143: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.extractLayersConfig = void 0, n.extractLayersConfig = function (e) {
            return void 0 !== e.layersConfig ? (1 === e.layersConfig.version && function (e) {
                for (const t of e.layers) for (const e of t.controls) if ("Key" === e.type) {
                    const t = e;
                    "number" == typeof t.mapTo && (t.mapTo = [t.mapTo])
                }
            }(e.layersConfig), e.layersConfig) : void 0 !== e.layers ? e.layers : null
        }
    }, {"core-js/modules/web.dom-collections.iterator.js": 124}],
    144: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.initLayersControl = void 0;
        const r = e("./grid"), i = e("./button"), o = e("./keyboard"), s = e("./mouse/mouse-common"),
            a = e("./options"), l = e("../dom/pointer"), c = e("nipplejs");
        n.initLayersControl = function (e, t, n, i, a, l, c) {
            let f = t.layers[0];
            if (void 0 !== c) for (const e of t.layers) if (e.title === c) {
                f = e;
                break
            }
            return function (e, t, n, i, a, l) {
                const c = (0, o.keyboard)(t, n), f = (0, s.mouse)(i.autolock, i.sensitivity, t, n), p = [];

                function y(o, s) {
                    var c;
                    for (const e of p) e();
                    p.splice(0, p.length);
                    const f = (0, r.getGrid)(e.grid).getConfiguration(o, s, l), y = new u;
                    for (const t of e.controls) {
                        const {row: e, column: n, type: r} = t;
                        "NippleActivator" === r && h(f, e, n)
                    }
                    let m = -1;
                    if (0 === (null === (c = t.options.optionControls) || void 0 === c ? void 0 : c.length)) for (const t of e.controls) {
                        const {row: e, type: n} = t;
                        if ("Options" === n) {
                            m = e;
                            break
                        }
                    }
                    const v = {};
                    if (a) for (const t of e.controls) {
                        const {row: e} = t;
                        let n = t.column;
                        const r = f.cells[e].length, i = r / 2;
                        e === m && n >= i && (n = Math.min(n + 1, r - 1)), void 0 === v[e] && (v[e] = {
                            leftStart: i,
                            leftEnd: 0,
                            rightStart: r - 1,
                            rightEnd: i
                        }), n < i ? (v[e].leftStart = Math.min(v[e].leftStart, n), v[e].leftEnd = Math.max(v[e].leftEnd, n)) : (v[e].rightStart = Math.min(v[e].rightStart, n), v[e].rightEnd = Math.max(v[e].rightEnd, n))
                    }
                    for (const r of e.controls) {
                        const e = d[r.type];
                        if (void 0 === e) {
                            console.error("Factory for control '" + r.type + "' is not defined");
                            continue
                        }
                        const o = {...r}, s = f.cells[r.row].length, l = s / 2;
                        if (m === r.row && r.column >= l && (o.column = Math.min(o.column + 1, s - 1)), a) {
                            const {leftStart: e, leftEnd: t, rightStart: n, rightEnd: r} = v[o.row], i = o.column < l;
                            i ? o.column += l + (l - t) - e - 1 : o.column -= l + (n - l) - (s - r) + 1, o.column >= s ? (console.error("Column", o.column, "is out of bound", s, i ? "[leftSide]" : "[rightSide]", v), o.column = s - 1) : o.column < 0 && (console.error("Column", o.column, "is out of bound", 0, i ? "[leftSide]" : "[rightSide]", v), o.column = 0)
                        }
                        const c = e(o, t, n, f, y, i);
                        p.push(c)
                    }
                }

                return t.addOnResize(y), y(t.width, t.height), () => {
                    t.removeOnResize(y), c(), f();
                    for (const e of p) e()
                }
            }(f, e, n, i, a, l)
        };

        class u {
            constructor() {
                var e, t;
                t = {}, (e = "sensors") in this ? Object.defineProperty(this, e, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : this[e] = t
            }

            activate(e, t) {
                const n = this.sensors[t + "_" + e];
                void 0 !== n && n.activate()
            }

            deactivate(e, t) {
                const n = this.sensors[t + "_" + e];
                void 0 !== n && n.deactivate()
            }

            register(e, t, n) {
                this.sensors[t + "_" + e] = n
            }
        }

        const d = {
            Key: function (e, t, n, r, o, s) {
                const {cells: a, columnWidth: l} = r, {row: c, column: u} = e, {centerX: d, centerY: f} = a[c][u], h = {
                    onDown: () => {
                        for (const t of e.mapTo) n.sendKeyEvent(t, !0)
                    }, onUp: () => {
                        for (const t of e.mapTo) n.sendKeyEvent(t, !1)
                    }
                };
                if (o.register(c, u, {activate: h.onDown, deactivate: h.onUp}), p(r, c, u)) return () => {
                };
                const y = (0, i.createButton)(e.symbol, h, l);
                return y.style.position = "absolute", y.style.left = d - y.widthPx / 2 + "px", y.style.top = f - y.heightPx / 2 + "px", t.mouseOverlay.appendChild(y), () => t.mouseOverlay.removeChild(y)
            }, Options: function (e, t, n, r, i, o) {
                var s;
                if (0 === (null === (s = t.options.optionControls) || void 0 === s ? void 0 : s.length)) return () => {
                };
                if (void 0 !== t.options.optionControls && 1 === t.options.optionControls.length && "keyboard" === t.options.optionControls[0]) return f(e, t, n, r, i, o);
                const {cells: l, columnWidth: c, rowHeight: u} = r, {row: d, column: p} = e, {
                    centerX: h,
                    centerY: y
                } = l[d][p], m = y - u / 2, v = h - c / 2, g = r.width - v - c;
                return (0, a.options)(t, ["default"], (() => {
                }), c, m, g)
            }, Keyboard: f, Switch: function (e, t, n, r, o, s) {
                const {cells: a, columnWidth: l} = r, {row: c, column: u} = e, {centerX: d, centerY: f} = a[c][u],
                    p = (0, i.createButton)(e.symbol, {onUp: () => s.setLayersConfig(s.getLayersConfig(), e.layerName)}, l);
                return p.style.position = "absolute", p.style.left = d - p.widthPx / 2 + "px", p.style.top = f - p.heightPx / 2 + "px", t.mouseOverlay.appendChild(p), () => {
                    t.mouseOverlay.removeChild(p)
                }
            }, ScreenMove: function (e, t, n, r, o, s) {
                const {cells: a, columnWidth: l} = r, {row: c, column: u} = e, {centerX: d, centerY: f} = a[c][u];
                let h = .5, y = .5;
                e.direction.indexOf("up") >= 0 && (y = 0), e.direction.indexOf("down") >= 0 && (y = 1), e.direction.indexOf("left") >= 0 && (h = 0), e.direction.indexOf("right") >= 0 && (h = 1);
                const m = {
                    onDown: () => {
                        n.sendMouseMotion(h, y)
                    }, onUp: () => {
                        n.sendMouseMotion(.5, .5)
                    }
                };
                if (o.register(c, u, {activate: m.onDown, deactivate: m.onUp}), p(r, c, u)) return () => {
                };
                const v = (0, i.createButton)(e.symbol, m, l);
                return v.style.position = "absolute", v.style.left = d - v.widthPx / 2 + "px", v.style.top = f - v.heightPx / 2 + "px", t.mouseOverlay.appendChild(v), () => t.mouseOverlay.removeChild(v)
            }, PointerButton: function (e, t, n, r, o, s) {
                const {cells: a, columnWidth: l} = r, {row: c, column: u, click: d} = e, {
                    centerX: f,
                    centerY: h
                } = a[c][u], y = {
                    onDown: () => {
                        d ? n.sendMouseButton(e.button, !0) : t.pointerButton = e.button
                    }, onUp: () => {
                        d ? n.sendMouseButton(e.button, !1) : t.pointerButton = 0
                    }
                };
                if (o.register(c, u, {activate: y.onDown, deactivate: y.onUp}), p(r, c, u)) return () => {
                };
                const m = (0, i.createButton)(e.symbol, y, l);
                return m.style.position = "absolute", m.style.left = f - m.widthPx / 2 + "px", m.style.top = h - m.heightPx / 2 + "px", t.mouseOverlay.appendChild(m), () => t.mouseOverlay.removeChild(m)
            }, PointerMove: function (e, t, n, r, o, s) {
                const {cells: a, columnWidth: l} = r, {row: c, column: u, x: d, y: f} = e, {
                    centerX: h,
                    centerY: y
                } = a[c][u], m = {
                    onDown: () => {
                        n.sendMouseMotion(d, f)
                    }, onUp: () => {
                        n.sendMouseMotion(d, f)
                    }
                };
                if (o.register(c, u, {activate: m.onDown, deactivate: m.onUp}), p(r, c, u)) return () => {
                };
                const v = (0, i.createButton)(e.symbol, m, l);
                return v.style.position = "absolute", v.style.left = h - v.widthPx / 2 + "px", v.style.top = y - v.heightPx / 2 + "px", t.mouseOverlay.appendChild(v), () => t.mouseOverlay.removeChild(v)
            }, PointerReset: function (e, t, n, r, o, s) {
                const {cells: a, columnWidth: l} = r, {row: c, column: u} = e, {centerX: d, centerY: f} = a[c][u], h = {
                    onDown: () => {
                        n.sendMouseSync()
                    }
                };
                if (o.register(c, u, {
                    activate: h.onDown, deactivate: () => {
                    }
                }), p(r, c, u)) return () => {
                };
                const y = (0, i.createButton)(e.symbol, h, l);
                return y.style.position = "absolute", y.style.left = d - y.widthPx / 2 + "px", y.style.top = f - y.heightPx / 2 + "px", t.mouseOverlay.appendChild(y), () => t.mouseOverlay.removeChild(y)
            }, PointerToggle: function (e, t, n, r, o, s) {
                const {cells: a, columnWidth: l} = r, {row: c, column: u} = e, {centerX: d, centerY: f} = a[c][u], h = {
                    onDown: () => {
                        t.pointerDisabled = !t.pointerDisabled, t.pointerDisabled ? y.classList.contains("emulator-button-highlight") || y.classList.add("emulator-button-highlight") : y.classList.remove("emulator-button-highlight")
                    }
                };
                if (o.register(c, u, {
                    activate: h.onDown, deactivate: () => {
                    }
                }), p(r, c, u)) return () => {
                };
                const y = (0, i.createButton)(e.symbol, h, l);
                return y.style.position = "absolute", y.style.left = d - y.widthPx / 2 + "px", y.style.top = f - y.heightPx / 2 + "px", t.mouseOverlay.appendChild(y), () => t.mouseOverlay.removeChild(y)
            }, NippleActivator: function (e, t, n, r, i, o) {
                const {cells: s, columnWidth: a, rowHeight: u, width: d, height: f} = r, {
                        row: p,
                        column: h
                    } = e, {centerX: y, centerY: m} = s[p][h], v = document.createElement("div"), g = 1.5,
                    b = Math.max(0, y - a * g), w = Math.max(0, m - u * g), _ = Math.max(0, d - y - a * g),
                    x = Math.max(0, f - m - u * g);
                v.style.position = "absolute", v.style.zIndex = "999", v.style.left = b + "px", v.style.top = w + "px", v.style.right = _ + "px", v.style.bottom = x + "px", t.mouseOverlay.appendChild(v);
                const k = c.create({
                    zone: v,
                    multitouch: !1,
                    maxNumberOfNipples: 1,
                    mode: "static",
                    follow: !1,
                    dynamicPage: !0,
                    size: 1.5 * Math.max(a, u),
                    position: {left: (d - _ - b) / 2 + "px", top: (f - x - w) / 2 + "px"}
                });
                let j = -1, C = -1;
                k.on("move", ((e, t) => {
                    if (t.distance < 10) return i.deactivate(C, j), j = -1, void (C = -1);
                    let n = -1, r = -1;
                    const o = t.angle.degree;
                    o > 22.5 && o <= 67.5 ? (n = h + 1, r = p - 1) : o > 67.5 && o <= 112.5 ? (n = h, r = p - 1) : o > 112.5 && o <= 157.5 ? (n = h - 1, r = p - 1) : o > 157.5 && o <= 202.5 ? (n = h - 1, r = p) : o > 202.5 && o <= 247.5 ? (n = h - 1, r = p + 1) : o > 247.5 && o <= 292.5 ? (n = h, r = p + 1) : o > 292.5 && o <= 337.5 ? (n = h + 1, r = p + 1) : (n = h + 1, r = p), j === n && C === r || (i.deactivate(C, j), i.activate(r, n), j = n, C = r)
                }));
                let E = !1;
                k.on("start", (() => {
                    E = !0
                })), k.on("end", (() => {
                    E = !1, i.deactivate(C, j), C = -1, j = -1
                }));
                const S = {capture: !0};

                function D(e) {
                    E && k.processOnEnd(e)
                }

                for (const e of l.pointer.enders) t.mouseOverlay.addEventListener(e, D, S);
                return () => {
                    k.destroy(), t.mouseOverlay.removeChild(v);
                    for (const e of l.pointer.enders) t.mouseOverlay.removeEventListener(e, D, S)
                }
            }
        };

        function f(e, t, n, r, o, s) {
            const {cells: a, columnWidth: l} = r, {row: c, column: u} = e, {centerX: d, centerY: f} = a[c][u],
                p = (0, i.createButton)("keyboard", {onUp: () => t.toggleKeyboard()}, l), h = e => {
                    e ? p.children[0].classList.add("emulator-control-close-icon") : p.children[0].classList.remove("emulator-control-close-icon")
                };
            return t.setOnKeyboardVisibility(h), p.style.position = "absolute", p.style.left = d - p.widthPx / 2 + "px", p.style.top = f - p.heightPx / 2 + "px", t.mouseOverlay.appendChild(p), () => {
                t.mouseOverlay.removeChild(p), t.removeOnKeyboardVisibility(h)
            }
        }

        function p(e, t, n) {
            return !0 === e.cells[t][n].hidden
        }

        function h(e, t, n) {
            function r(r, i) {
                if ((r !== t || i !== n) && r >= 0 && r < e.cells.length) {
                    const t = e.cells[r];
                    i >= 0 && i < t.length && (t[i].hidden = !0)
                }
            }

            for (let e = t - 1; e <= t + 1; ++e) for (let t = n - 1; t <= n + 1; ++t) r(e, t)
        }
    }, {
        "../dom/pointer": 158,
        "./button": 140,
        "./grid": 141,
        "./keyboard": 142,
        "./mouse/mouse-common": 146,
        "./options": 152,
        "core-js/modules/web.dom-collections.iterator.js": 124,
        nipplejs: 136
    }],
    145: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.initLegacyLayersControl = void 0;
        const r = e("./button"), i = e("./mouse/mouse-common"), o = e("./nipple"), s = e("./options"),
            a = e("./keyboard");
        n.initLegacyLayersControl = function (e, t, n, l) {
            var c;
            const u = Object.keys(n), d = {
                keyboard: () => {
                }, mouse: () => {
                }, gestures: () => {
                }, buttons: () => {
                }
            }, f = s => {
                d.keyboard(), d.mouse(), d.gestures(), d.buttons(), d.keyboard = () => {
                }, d.mouse = () => {
                }, d.gestures = () => {
                }, d.buttons = () => {
                };
                const c = n[s];
                void 0 !== c && (d.keyboard = (0, a.keyboard)(t, l, c.mapper), void 0 !== c.gestures && c.gestures.length > 0 ? d.gestures = (0, o.nipple)(t, l, c.gestures) : d.mouse = (0, i.mouse)(e.autolock, e.sensitivity, t, l), void 0 !== c.buttons && c.buttons.length && (d.buttons = (0, r.deprecatedButton)(t, l, c.buttons, 54)))
            }, p = 0 === (null === (c = t.options.optionControls) || void 0 === c ? void 0 : c.length) ? () => {
            } : (0, s.options)(t, u, f, 54, 13.5, 0);
            return f("default"), () => {
                d.gestures(), d.buttons(), d.mouse(), d.keyboard(), p()
            }
        }
    }, {"./button": 140, "./keyboard": 142, "./mouse/mouse-common": 146, "./nipple": 150, "./options": 152}],
    146: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.mouse = n.mount = n.mapXY = void 0;
        const r = e("../../dom/pointer"), i = e("./mouse-swipe"), o = e("./mouse-not-locked"), s = e("./mouse-locked");
        n.mapXY = function (e, t, n, r) {
            const i = n.width(), o = n.height(), s = r.width, a = r.height, l = i / o;
            let c = s, u = s / l;
            u > a && (u = a, c = a * l);
            const d = (a - u) / 2, f = (s - c) / 2;
            let p = Math.max(0, Math.min(1, (e - f) / c)), h = Math.max(0, Math.min(1, (t - d) / u));
            return p <= .01 && (p = 0), p >= .99 && (p = 1), h <= .01 && (h = 0), h >= .99 && (h = 1), {x: p, y: h}
        }, n.mount = function (e, t, n, i, o, s) {
            let a = 0;
            const l = i => {
                if (i.target !== e) return;
                if (t.pointerDisabled) return void i.stopPropagation();
                const o = (0, r.getPointerState)(i, e);
                a = o.button || t.pointerButton, n(o.x, o.y, a), i.stopPropagation()
            }, c = n => {
                if (n.target !== e) return;
                if (t.pointerDisabled) return void n.stopPropagation();
                const o = (0, r.getPointerState)(n, e);
                i(o.x, o.y, o.mX, o.mY), n.stopPropagation()
            }, u = n => {
                if (t.pointerDisabled) return void n.stopPropagation();
                const i = (0, r.getPointerState)(n, e);
                o(i.x, i.y, a), n.stopPropagation()
            }, d = n => {
                if (n.target !== e) return;
                if (t.pointerDisabled) return void n.stopPropagation();
                const i = (0, r.getPointerState)(n, e);
                s(i.x, i.y), n.stopPropagation()
            }, f = e => {
                e.stopPropagation()
            }, p = {capture: !1};
            for (const t of r.pointer.starters) e.addEventListener(t, l, p);
            for (const t of r.pointer.changers) e.addEventListener(t, c, p);
            for (const t of r.pointer.enders) e.addEventListener(t, u, p);
            for (const t of r.pointer.prevents) e.addEventListener(t, f, p);
            for (const t of r.pointer.leavers) e.addEventListener(t, d, p);
            return () => {
                for (const t of r.pointer.starters) e.removeEventListener(t, l, p);
                for (const t of r.pointer.changers) e.removeEventListener(t, c, p);
                for (const t of r.pointer.enders) e.removeEventListener(t, u, p);
                for (const t of r.pointer.prevents) e.removeEventListener(t, f, p);
                for (const t of r.pointer.leavers) e.removeEventListener(t, d, p)
            }
        }, n.mouse = function (e, t, n, a) {
            return e && !r.pointer.canLock ? (0, i.mouseSwipe)(t, n, a) : e ? (0, s.mouseLocked)(t, n, a) : (0, o.mouseNotLocked)(n, a)
        }
    }, {
        "../../dom/pointer": 158,
        "./mouse-locked": 147,
        "./mouse-not-locked": 148,
        "./mouse-swipe": 149,
        "core-js/modules/web.dom-collections.iterator.js": 124
    }],
    147: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.mouseLocked = void 0;
        const r = e("./mouse-common");
        n.mouseLocked = function (e, t, n) {
            const i = t.mouseOverlay;

            function o() {
                return document.pointerLockElement !== i
            }

            return (0, r.mount)(i, t, (function (e, t, r) {
                o() ? (i.requestPointerLock || i.mozRequestPointerLock || i.webkitRequestPointerLock).call(i) : n.sendMouseButton(r, !0)
            }), (function (t, r, i, s) {
                o() || 0 === i && 0 === s || n.sendMouseRelativeMotion(i * e, s * e)
            }), (function (e, t, r) {
                o() || n.sendMouseButton(r, !1)
            }), (function (e, t) {
            }))
        }
    }, {"./mouse-common": 146}],
    148: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.mouseNotLocked = void 0;
        const r = e("./mouse-common");
        n.mouseNotLocked = function (e, t) {
            const n = e.mouseOverlay, i = (n, i) => (0, r.mapXY)(n, i, t, e);
            return document.pointerLockElement === n && document.exitPointerLock(), (0, r.mount)(n, e, (function (e, n, r) {
                const o = i(e, n);
                t.sendMouseMotion(o.x, o.y), t.sendMouseButton(r, !0)
            }), (function (e, n, r, o) {
                const s = i(e, n);
                t.sendMouseMotion(s.x, s.y)
            }), (function (e, n, r) {
                const o = i(e, n);
                t.sendMouseMotion(o.x, o.y), t.sendMouseButton(r, !1)
            }), (function (e, n) {
                const r = i(e, n);
                t.sendMouseMotion(r.x, r.y)
            }))
        }
    }, {"./mouse-common": 146}],
    149: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.mouseSwipe = void 0;
        const r = e("./mouse-common");
        n.mouseSwipe = function (e, t, n) {
            const i = t.mouseOverlay;
            let o = -1, s = 0, a = 0, l = 0;
            return (0, r.mount)(i, t, ((e, t) => {
                o = Date.now(), s = 0, a = e, l = t
            }), (function (t, r, i, o) {
                void 0 === i && (i = t - a), void 0 === o && (o = r - l), a = t, l = r, 0 === i && 0 === o || (s += Math.abs(i) + Math.abs(o), n.sendMouseRelativeMotion(i * e * 2, o * e * 2))
            }), ((e, r) => {
                if (Date.now() - o < 500 && s < 50) {
                    const e = t.pointerButton || 0;
                    n.sendMouseButton(e, !0), setTimeout((() => n.sendMouseButton(e, !1)), 60)
                }
            }), (() => {
            }))
        }
    }, {"./mouse-common": 146}],
    150: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.nipple = void 0;
        const r = e("nipplejs"), i = e("../dom/keys");
        n.nipple = function (e, t, n) {
            const o = r.create({zone: e.mouseOverlay, multitouch: !0, maxNumberOfNipples: 2});
            let s = -1;
            const a = () => {
                -1 !== s && (e.fireKeyUp(s), s = -1)
            }, l = {}, c = {}, u = {};
            for (const t of n) "end:release" === t.event ? l[t.joystickId] = !0 : t.mapTo !== i.KBD_NONE && ("tap" === t.event ? c[t.joystickId] = t.mapTo : o.on(t.event, (() => {
                var n;
                u[t.joystickId] = Date.now(), a(), n = t.mapTo, e.fireKeyDown(n), s = n
            })));
            const d = {};
            return o.on("start", (() => {
                const e = o.ids.length - 1;
                d[e] = Date.now()
            })), o.on("end", (() => {
                const t = o.ids.length - 1, n = Date.now() - d[t];
                !0 === l[t] && a(), c[t] && n < 500 && u[t] < d[t] && e.fireKeyPress(c[t])
            })), () => o.destroy()
        }
    }, {"../dom/keys": 154, "core-js/modules/web.dom-collections.iterator.js": 124, nipplejs: 136}],
    151: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.initNullLayersControl = void 0;
        const r = e("./keyboard"), i = e("./mouse/mouse-common"), o = e("./options");
        n.initNullLayersControl = function (e, t, n) {
            var s;
            const a = (0, r.keyboard)(t, n), l = (0, i.mouse)(e.autolock, e.sensitivity, t, n),
                c = 0 === (null === (s = t.options.optionControls) || void 0 === s ? void 0 : s.length) ? () => {
                } : (0, o.options)(t, ["default"], (() => {
                }), 54, 13.5, 0);
            return () => {
                a(), l(), c()
            }
        }
    }, {"./keyboard": 142, "./mouse/mouse-common": 146, "./options": 152}],
    152: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.options = void 0;
        const r = e("./button"), i = e("../dom/helpers");

        function o(e, t) {
            if (e.length <= 1) return document.createElement("div");
            const n = document.createElement("select");
            n.classList.add("emulator-control-select");
            for (const t of e) {
                const e = document.createElement("option");
                e.value = t, e.innerHTML = t, n.appendChild(e)
            }
            return n.onchange = e => {
                const n = e.target.value;
                t(n)
            }, (0, i.stopPropagation)(n, !1), n
        }

        n.options = function (e, t, n, s, a, l) {
            const c = Math.round(s / 4);
            let u = !1, d = !1;
            const f = () => {
                    const e = u ? "flex" : "none";
                    for (const t of h) t != y && (t.style.display = e)
                }, p = () => {
                    u = !u, !u && d && e.toggleKeyboard(), f()
                }, h = [o(t, n), (0, r.createButton)("keyboard", {
                    onClick: () => {
                        e.toggleKeyboard(), u && !d && (u = !1, f())
                    }
                }, s), (0, r.createButton)("save", {
                    onClick: () => {
                        e.save(), u && p()
                    }
                }, s), (0, r.createButton)("fullscreen", {
                    onClick: () => {
                        e.toggleFullscreen(), u && p()
                    }
                }, s), (0, r.createButton)("options", {onClick: p}, s)], y = h[h.length - 1],
                m = h[h.length - 2].children[0], v = h[h.length - 4].children[0], g = e => {
                    d = e, e ? v.classList.add("emulator-control-close-icon") : v.classList.remove("emulator-control-close-icon")
                };
            e.setOnKeyboardVisibility(g), g(e.keyboardVisible), e.setOnFullscreen((e => {
                e ? m.classList.contains("emulator-control-exit-fullscreen-icon") || m.classList.add("emulator-control-exit-fullscreen-icon") : m.classList.remove("emulator-control-exit-fullscreen-icon")
            })), e.fullscreen && m.classList.add("emulator-control-exit-fullscreen-icon");
            const b = (0, i.createDiv)("emulator-options"), w = d ? "flex" : "none";
            for (const e of h) e !== y && e.classList.add("emulator-button-control"), e.style.marginRight = c + "px", e.style.marginBottom = c + "px", e !== y && (e.style.display = w), b.appendChild(e);
            return b.style.position = "absolute", b.style.right = l + "px", b.style.top = a + "px", e.mouseOverlay.appendChild(b), () => {
                e.mouseOverlay.removeChild(b), e.setOnFullscreen((() => {
                })), e.removeOnKeyboardVisibility(g)
            }
        }
    }, {"../dom/helpers": 153, "./button": 140, "core-js/modules/web.dom-collections.iterator.js": 124}],
    153: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.stopPropagation = n.createDiv = void 0;
        const r = e("./pointer");
        n.createDiv = function (e, t) {
            const n = document.createElement("div");
            return n.className = e, void 0 !== t && (n.innerHTML = t), n
        }, n.stopPropagation = function (e) {
            let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            const n = e => {
                e.stopPropagation()
            }, i = e => {
                e.stopPropagation(), t && e.preventDefault()
            }, o = {capture: !1};
            for (const t of r.pointer.starters) e.addEventListener(t, n, o);
            for (const t of r.pointer.enders) e.addEventListener(t, n, o);
            for (const t of r.pointer.prevents) e.addEventListener(t, i, o)
        }
    }, {"./pointer": 158, "core-js/modules/web.dom-collections.iterator.js": 124}],
    154: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.KBD_kp0 = n.KBD_f12 = n.KBD_f11 = n.KBD_f10 = n.KBD_f9 = n.KBD_f8 = n.KBD_f7 = n.KBD_f6 = n.KBD_f5 = n.KBD_f4 = n.KBD_f3 = n.KBD_f2 = n.KBD_f1 = n.KBD_z = n.KBD_y = n.KBD_x = n.KBD_w = n.KBD_v = n.KBD_u = n.KBD_t = n.KBD_s = n.KBD_r = n.KBD_q = n.KBD_p = n.KBD_o = n.KBD_n = n.KBD_m = n.KBD_l = n.KBD_k = n.KBD_j = n.KBD_i = n.KBD_h = n.KBD_g = n.KBD_f = n.KBD_e = n.KBD_d = n.KBD_c = n.KBD_b = n.KBD_a = n.KBD_9 = n.KBD_8 = n.KBD_7 = n.KBD_6 = n.KBD_5 = n.KBD_4 = n.KBD_3 = n.KBD_2 = n.KBD_1 = n.KBD_0 = n.KBD_NONE = void 0, n.KBD_up = n.KBD_left = n.KBD_pagedown = n.KBD_end = n.KBD_delete = n.KBD_pageup = n.KBD_home = n.KBD_insert = n.KBD_pause = n.KBD_printscreen = n.KBD_slash = n.KBD_comma = n.KBD_period = n.KBD_quote = n.KBD_semicolon = n.KBD_rightbracket = n.KBD_leftbracket = n.KBD_backslash = n.KBD_equals = n.KBD_minus = n.KBD_grave = n.KBD_numlock = n.KBD_scrolllock = n.KBD_capslock = n.KBD_rightshift = n.KBD_leftshift = n.KBD_rightctrl = n.KBD_leftctrl = n.KBD_rightalt = n.KBD_leftalt = n.KBD_space = n.KBD_enter = n.KBD_backspace = n.KBD_tab = n.KBD_esc = n.KBD_kpenter = n.KBD_kpplus = n.KBD_kpminus = n.KBD_kpmultiply = n.KBD_kpdivide = n.KBD_kpperiod = n.KBD_kp9 = n.KBD_kp8 = n.KBD_kp7 = n.KBD_kp6 = n.KBD_kp5 = n.KBD_kp4 = n.KBD_kp3 = n.KBD_kp2 = n.KBD_kp1 = void 0, n.domToKeyCode = n.keyCodesToDom = n.namedKeyCodes = n.domToKeyCodes = n.KBD_extra_lt_gt = n.KBD_right = n.KBD_down = void 0, n.KBD_NONE = 0, n.KBD_0 = 48, n.KBD_1 = 49, n.KBD_2 = 50, n.KBD_3 = 51, n.KBD_4 = 52, n.KBD_5 = 53, n.KBD_6 = 54, n.KBD_7 = 55, n.KBD_8 = 56, n.KBD_9 = 57, n.KBD_a = 65, n.KBD_b = 66, n.KBD_c = 67, n.KBD_d = 68, n.KBD_e = 69, n.KBD_f = 70, n.KBD_g = 71, n.KBD_h = 72, n.KBD_i = 73, n.KBD_j = 74, n.KBD_k = 75, n.KBD_l = 76, n.KBD_m = 77, n.KBD_n = 78, n.KBD_o = 79, n.KBD_p = 80, n.KBD_q = 81, n.KBD_r = 82, n.KBD_s = 83, n.KBD_t = 84, n.KBD_u = 85, n.KBD_v = 86, n.KBD_w = 87, n.KBD_x = 88, n.KBD_y = 89, n.KBD_z = 90, n.KBD_f1 = 290, n.KBD_f2 = 291, n.KBD_f3 = 292, n.KBD_f4 = 293, n.KBD_f5 = 294, n.KBD_f6 = 295, n.KBD_f7 = 296, n.KBD_f8 = 297, n.KBD_f9 = 298, n.KBD_f10 = 299, n.KBD_f11 = 300, n.KBD_f12 = 301, n.KBD_kp0 = 320, n.KBD_kp1 = 321, n.KBD_kp2 = 322, n.KBD_kp3 = 323, n.KBD_kp4 = 324, n.KBD_kp5 = 325, n.KBD_kp6 = 326, n.KBD_kp7 = 327, n.KBD_kp8 = 328, n.KBD_kp9 = 329, n.KBD_kpperiod = 330, n.KBD_kpdivide = 331, n.KBD_kpmultiply = 332, n.KBD_kpminus = 333, n.KBD_kpplus = 334, n.KBD_kpenter = 335, n.KBD_esc = 256, n.KBD_tab = 258, n.KBD_backspace = 259, n.KBD_enter = 257, n.KBD_space = 32, n.KBD_leftalt = 342, n.KBD_rightalt = 346, n.KBD_leftctrl = 341, n.KBD_rightctrl = 345, n.KBD_leftshift = 340, n.KBD_rightshift = 344, n.KBD_capslock = 280, n.KBD_scrolllock = 281, n.KBD_numlock = 282, n.KBD_grave = 96, n.KBD_minus = 45, n.KBD_equals = 61, n.KBD_backslash = 92, n.KBD_leftbracket = 91, n.KBD_rightbracket = 93, n.KBD_semicolon = 59, n.KBD_quote = 39, n.KBD_period = 46, n.KBD_comma = 44, n.KBD_slash = 47, n.KBD_printscreen = 283, n.KBD_pause = 284, n.KBD_insert = 260, n.KBD_home = 268, n.KBD_pageup = 266, n.KBD_delete = 261,n.KBD_end = 269,n.KBD_pagedown = 267,n.KBD_left = 263,n.KBD_up = 265,n.KBD_down = 264,n.KBD_right = 262,n.KBD_extra_lt_gt = 348,n.domToKeyCodes = {
            8: n.KBD_backspace,
            9: n.KBD_tab,
            13: n.KBD_enter,
            16: n.KBD_leftshift,
            17: n.KBD_leftctrl,
            18: n.KBD_leftalt,
            19: n.KBD_pause,
            27: n.KBD_esc,
            32: n.KBD_space,
            33: n.KBD_pageup,
            34: n.KBD_pagedown,
            35: n.KBD_end,
            36: n.KBD_home,
            37: n.KBD_left,
            38: n.KBD_up,
            39: n.KBD_right,
            40: n.KBD_down,
            45: n.KBD_insert,
            46: n.KBD_delete,
            48: n.KBD_0,
            49: n.KBD_1,
            50: n.KBD_2,
            51: n.KBD_3,
            52: n.KBD_4,
            53: n.KBD_5,
            54: n.KBD_6,
            55: n.KBD_7,
            56: n.KBD_8,
            57: n.KBD_9,
            59: n.KBD_semicolon,
            64: n.KBD_equals,
            65: n.KBD_a,
            66: n.KBD_b,
            67: n.KBD_c,
            68: n.KBD_d,
            69: n.KBD_e,
            70: n.KBD_f,
            71: n.KBD_g,
            72: n.KBD_h,
            73: n.KBD_i,
            74: n.KBD_j,
            75: n.KBD_k,
            76: n.KBD_l,
            77: n.KBD_m,
            78: n.KBD_n,
            79: n.KBD_o,
            80: n.KBD_p,
            81: n.KBD_q,
            82: n.KBD_r,
            83: n.KBD_s,
            84: n.KBD_t,
            85: n.KBD_u,
            86: n.KBD_v,
            87: n.KBD_w,
            88: n.KBD_x,
            89: n.KBD_y,
            90: n.KBD_z,
            91: n.KBD_leftbracket,
            93: n.KBD_rightbracket,
            96: n.KBD_kp0,
            97: n.KBD_kp1,
            98: n.KBD_kp2,
            99: n.KBD_kp3,
            100: n.KBD_kp4,
            101: n.KBD_kp5,
            102: n.KBD_kp6,
            103: n.KBD_kp7,
            104: n.KBD_kp8,
            105: n.KBD_kp9,
            111: n.KBD_kpdivide,
            112: n.KBD_f1,
            113: n.KBD_f2,
            114: n.KBD_f3,
            115: n.KBD_f4,
            116: n.KBD_f5,
            117: n.KBD_f6,
            118: n.KBD_f7,
            119: n.KBD_f8,
            120: n.KBD_f9,
            121: n.KBD_f10,
            122: n.KBD_f11,
            123: n.KBD_f12,
            144: n.KBD_numlock,
            145: n.KBD_scrolllock,
            173: n.KBD_minus,
            186: n.KBD_semicolon,
            187: n.KBD_equals,
            188: n.KBD_comma,
            189: n.KBD_minus,
            190: n.KBD_period,
            191: n.KBD_slash,
            219: n.KBD_leftbracket,
            220: n.KBD_backslash,
            221: n.KBD_rightbracket
        },n.namedKeyCodes = {
            KBD_NONE: n.KBD_NONE,
            KBD_0: n.KBD_0,
            KBD_1: n.KBD_1,
            KBD_2: n.KBD_2,
            KBD_3: n.KBD_3,
            KBD_4: n.KBD_4,
            KBD_5: n.KBD_5,
            KBD_6: n.KBD_6,
            KBD_7: n.KBD_7,
            KBD_8: n.KBD_8,
            KBD_9: n.KBD_9,
            KBD_a: n.KBD_a,
            KBD_b: n.KBD_b,
            KBD_c: n.KBD_c,
            KBD_d: n.KBD_d,
            KBD_e: n.KBD_e,
            KBD_f: n.KBD_f,
            KBD_g: n.KBD_g,
            KBD_h: n.KBD_h,
            KBD_i: n.KBD_i,
            KBD_j: n.KBD_j,
            KBD_k: n.KBD_k,
            KBD_l: n.KBD_l,
            KBD_m: n.KBD_m,
            KBD_n: n.KBD_n,
            KBD_o: n.KBD_o,
            KBD_p: n.KBD_p,
            KBD_q: n.KBD_q,
            KBD_r: n.KBD_r,
            KBD_s: n.KBD_s,
            KBD_t: n.KBD_t,
            KBD_u: n.KBD_u,
            KBD_v: n.KBD_v,
            KBD_w: n.KBD_w,
            KBD_x: n.KBD_x,
            KBD_y: n.KBD_y,
            KBD_z: n.KBD_z,
            KBD_f1: n.KBD_f1,
            KBD_f2: n.KBD_f2,
            KBD_f3: n.KBD_f3,
            KBD_f4: n.KBD_f4,
            KBD_f5: n.KBD_f5,
            KBD_f6: n.KBD_f6,
            KBD_f7: n.KBD_f7,
            KBD_f8: n.KBD_f8,
            KBD_f9: n.KBD_f9,
            KBD_f10: n.KBD_f10,
            KBD_f11: n.KBD_f11,
            KBD_f12: n.KBD_f12,
            KBD_kp0: n.KBD_kp0,
            KBD_kp1: n.KBD_kp1,
            KBD_kp2: n.KBD_kp2,
            KBD_kp3: n.KBD_kp3,
            KBD_kp4: n.KBD_kp4,
            KBD_kp5: n.KBD_kp5,
            KBD_kp6: n.KBD_kp6,
            KBD_kp7: n.KBD_kp7,
            KBD_kp8: n.KBD_kp8,
            KBD_kp9: n.KBD_kp9,
            KBD_kpperiod: n.KBD_kpperiod,
            KBD_kpdivide: n.KBD_kpdivide,
            KBD_kpmultiply: n.KBD_kpmultiply,
            KBD_kpminus: n.KBD_kpminus,
            KBD_kpplus: n.KBD_kpplus,
            KBD_kpenter: n.KBD_kpenter,
            KBD_esc: n.KBD_esc,
            KBD_tab: n.KBD_tab,
            KBD_backspace: n.KBD_backspace,
            KBD_enter: n.KBD_enter,
            KBD_space: n.KBD_space,
            KBD_leftalt: n.KBD_leftalt,
            KBD_rightalt: n.KBD_rightalt,
            KBD_leftctrl: n.KBD_leftctrl,
            KBD_rightctrl: n.KBD_rightctrl,
            KBD_leftshift: n.KBD_leftshift,
            KBD_rightshift: n.KBD_rightshift,
            KBD_capslock: n.KBD_capslock,
            KBD_scrolllock: n.KBD_scrolllock,
            KBD_numlock: n.KBD_numlock,
            KBD_grave: n.KBD_grave,
            KBD_minus: n.KBD_minus,
            KBD_equals: n.KBD_equals,
            KBD_backslash: n.KBD_backslash,
            KBD_leftbracket: n.KBD_leftbracket,
            KBD_rightbracket: n.KBD_rightbracket,
            KBD_semicolon: n.KBD_semicolon,
            KBD_quote: n.KBD_quote,
            KBD_period: n.KBD_period,
            KBD_comma: n.KBD_comma,
            KBD_slash: n.KBD_slash,
            KBD_printscreen: n.KBD_printscreen,
            KBD_pause: n.KBD_pause,
            KBD_insert: n.KBD_insert,
            KBD_home: n.KBD_home,
            KBD_pageup: n.KBD_pageup,
            KBD_delete: n.KBD_delete,
            KBD_end: n.KBD_end,
            KBD_pagedown: n.KBD_pagedown,
            KBD_left: n.KBD_left,
            KBD_up: n.KBD_up,
            KBD_down: n.KBD_down,
            KBD_right: n.KBD_right,
            KBD_extra_lt_gt: n.KBD_extra_lt_gt
        },n.keyCodesToDom = {};
        for (const e of Object.keys(n.domToKeyCodes)) {
            const t = Number.parseInt(e, 10);
            n.keyCodesToDom[n.domToKeyCodes[t]] = t
        }
        n.domToKeyCode = function (e) {
            return n.domToKeyCodes[e] || 0
        }
    }, {"core-js/modules/web.dom-collections.iterator.js": 124}],
    155: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        e("core-js/modules/web.dom-collections.iterator.js");
        Object.defineProperty(n, "__esModule", {value: !0}), n.Layers = n.layers = void 0;
        const i = e("notyf"), o = function (e) {
            return e && e.__esModule ? e : {default: e}
        }(e("simple-keyboard")), s = e("./helpers"), a = e("./keys"), l = e("element-resize-detector")({});
        n.layers = function (e, t) {
            return new c(e, t || {})
        };

        class c {
            constructor(e, t) {
                r(this, "options", void 0), r(this, "root", void 0), r(this, "loading", void 0), r(this, "canvas", void 0), r(this, "video", void 0), r(this, "mouseOverlay", void 0), r(this, "width", void 0), r(this, "height", void 0), r(this, "fullscreen", !1), r(this, "keyboardVisible", !1), r(this, "pointerLock", !1), r(this, "pointerDisabled", !1), r(this, "pointerButton", 0), r(this, "notyf", new i.Notyf), r(this, "toggleKeyboard", (() => !1)), r(this, "fullscreenElement", void 0), r(this, "clickToStart", void 0), r(this, "loaderText", void 0), r(this, "onResize", void 0), r(this, "onKeyDown", void 0), r(this, "onKeyUp", void 0), r(this, "onKeyPress", void 0), r(this, "onKeysPress", void 0), r(this, "onSave", void 0), r(this, "onSaveStarted", void 0), r(this, "onSaveEnded", void 0), r(this, "onFullscreenChanged", []), r(this, "onKeyboardChanged", []), this.options = t, this.root = e, this.root.classList.add("emulator-root"), this.fullscreenElement = t.fullscreenElement || this.root, this.canvas = document.createElement("canvas"), this.canvas.className = "emulator-canvas", this.video = document.createElement("video"), this.video.setAttribute("autoplay", ""), this.video.setAttribute("playsinline", ""), this.video.className = "emulator-video", this.loading = (0, s.createDiv)("emulator-loading", "\n<div class='emulator-loading-inner'>\n<pre class='emulator-loading-pre-1'>\n        _                __\n       (_)____      ____/ /___  _____ _________  ____ ___\n      / / ___/_____/ __  / __ \\/ ___// ___/ __ \\/ __ `__ \\\n     / (__  )_____/ /_/ / /_/ (__  )/ /__/ /_/ / / / / / /\n  __/ /____/      \\__,_/\\____/____(_)___/\\____/_/ /_/ /_/\n /___/\n</pre>\n<pre class='emulator-loading-pre-2'>\n</pre>\n<div class='emulator-loader'>\n</div>\n</div>\n"), this.loaderText = this.loading.querySelector(".emulator-loading-pre-2"), this.mouseOverlay = (0, s.createDiv)("emulator-mouse-overlay", ""), this.clickToStart = (0, s.createDiv)("emulator-click-to-start-overlay", '\n<div class="emulator-click-to-start-text">Press to start</div>\n<div class="emulator-click-to-start-icon"></div>\n'), this.clickToStart.onclick = () => {
                    this.clickToStart.style.display = "none", this.video.play()
                }, this.root.appendChild(this.canvas), this.root.appendChild(this.video), this.root.appendChild(this.mouseOverlay), this.root.appendChild(this.clickToStart), this.root.appendChild(this.loading), this.width = e.offsetWidth, this.height = e.offsetHeight, this.onResize = [], this.onKeyDown = () => {
                }, this.onKeyUp = () => {
                }, this.onKeyPress = () => {
                }, this.onKeysPress = () => {
                }, this.onSave = () => Promise.reject(new Error("Not implemented")), this.onSaveStarted = () => {
                }, this.onSaveEnded = () => {
                }, l.listenTo(this.root, (t => {
                    if (t === e) {
                        this.width = t.offsetWidth, this.height = t.offsetHeight;
                        for (const e of this.onResize) e(this.width, this.height)
                    }
                })), this.initKeyEvents(), this.initKeyboard(), this.preventContextMenu(), this.fullscreenElement.onfullscreenchange = () => {
                    if (document.fullscreenElement !== this.fullscreenElement) {
                        this.fullscreen = !1;
                        for (const e of this.onFullscreenChanged) e(this.fullscreen)
                    }
                }
            }

            initKeyEvents() {
                var e;
                const t = null !== (e = this.options.keyboardInputDiv) && void 0 !== e ? e : this.root;
                t.style.outline = "none", t.tabIndex && -1 !== t.tabIndex || (t.tabIndex = 0), t.addEventListener("keydown", (e => {
                    const t = (0, a.domToKeyCode)(e.keyCode);
                    this.onKeyDown(t), e.stopPropagation(), e.preventDefault()
                })), t.addEventListener("keyup", (e => {
                    const t = (0, a.domToKeyCode)(e.keyCode);
                    this.onKeyUp(t), e.stopPropagation(), e.preventDefault()
                }))
            }

            preventContextMenu() {
                this.root.addEventListener("contextmenu", (e => (e.stopPropagation(), e.preventDefault(), !1)))
            }

            addOnResize(e) {
                this.onResize.push(e)
            }

            removeOnResize(e) {
                this.onResize = this.onResize.filter((t => t !== e))
            }

            setOnKeyDown(e) {
                this.onKeyDown = e
            }

            fireKeyDown(e) {
                this.onKeyDown(e)
            }

            setOnKeyUp(e) {
                this.onKeyUp = e
            }

            fireKeyUp(e) {
                this.onKeyUp(e)
            }

            setOnKeyPress(e) {
                this.onKeyPress = e
            }

            fireKeyPress(e) {
                this.onKeyPress(e)
            }

            setOnKeysPress(e) {
                this.onKeysPress = e
            }

            fireKeysPress(e) {
                this.onKeysPress(e)
            }

            toggleFullscreen() {
                if (this.fullscreen) {
                    this.fullscreen = !1, this.fullscreenElement.classList.contains("emulator-fullscreen-workaround") ? this.fullscreenElement.classList.remove("emulator-fullscreen-workaround") : document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen();
                    for (const e of this.onFullscreenChanged) e(!1)
                } else {
                    this.fullscreen = !0;
                    const e = this.fullscreenElement;
                    e.requestFullscreen ? e.requestFullscreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : e.webkitEnterFullscreen ? e.webkitEnterFullscreen() : this.fullscreenElement.classList.add("emulator-fullscreen-workaround");
                    for (const e of this.onFullscreenChanged) e(!0)
                }
            }

            setOnFullscreen(e) {
                this.onFullscreenChanged.push(e)
            }

            removeOnFullscreen(e) {
                this.onFullscreenChanged = this.onFullscreenChanged.filter((t => t !== e))
            }

            setOnKeyboardVisibility(e) {
                this.onKeyboardChanged.push(e)
            }

            removeOnKeyboardVisibility(e) {
                this.onKeyboardChanged = this.onKeyboardChanged.filter((t => t !== e))
            }

            save() {
                return this.onSaveStarted(), this.onSave().then((() => {
                    this.notyf.success("Saved"), this.onSaveEnded()
                })).catch((e => {
                    this.notyf.error(e.message), this.onSaveEnded()
                }))
            }

            setOnSave(e) {
                this.onSave = e
            }

            getOnSave() {
                return this.onSave
            }

            setOnSaveStarted(e) {
                this.onSaveStarted = e
            }

            setOnSaveEnded(e) {
                this.onSaveEnded = e
            }

            hideLoadingLayer() {
                this.loading.style.visibility = "hidden"
            }

            showLoadingLayer() {
                this.loading.style.visibility = "visible"
            }

            setLoadingMessage(e) {
                this.loaderText.innerHTML = e
            }

            switchToVideo() {
                this.video.style.display = "block", this.canvas.style.display = "none"
            }

            showClickToStart() {
                this.clickToStart.style.display = "flex"
            }

            initKeyboard() {
                let e = !1;
                const t = [{
                    "{esc}": "␛",
                    "{bksp}": "⌫",
                    "{enter}": "↵",
                    "{space}": "Space",
                    "{up}": "↑",
                    "{down}": "↓",
                    "{left}": "←",
                    "{right}": "→",
                    "{shift}": "⇑",
                    "{ctrl}": "Ctrl",
                    "{alt}": "Alt",
                    "{tab}": "Tab"
                }, {
                    "{esc}": "␛",
                    "{bksp}": "⌫",
                    "{enter}": "↵",
                    "{space}": "Space",
                    "{up}": "↑",
                    "{down}": "↓",
                    "{left}": "←",
                    "{right}": "→",
                    "{shift}": "⇑",
                    "{alt}": "Alt",
                    "{ctrl}": "Ctrl",
                    "{tab}": "Tab",
                    q: "й",
                    w: "ц",
                    e: "у",
                    r: "к",
                    t: "е",
                    y: "н",
                    u: "г",
                    i: "ш",
                    o: "щ",
                    p: "з",
                    "{": "х",
                    "}": "ъ",
                    a: "ф",
                    s: "ы",
                    d: "в",
                    f: "а",
                    g: "п",
                    h: "р",
                    j: "о",
                    k: "л",
                    l: "д",
                    ";": "ж",
                    "'": "э",
                    z: "я",
                    x: "ч",
                    c: "с",
                    v: "м",
                    b: "и",
                    n: "т",
                    m: "ь",
                    ",": "б",
                    ".": "ю"
                }];
                let n = 0;
                const r = this.options.keyboardDiv || (0, s.createDiv)("");
                r.classList.add("emulator-keyboard"), r.style.display = "none", (0, s.stopPropagation)(r);
                const i = new o.default(r, {
                    layout: {en: ["{esc} ` 1 2 3 4 5 6 7 8 9 0 () - = {bksp} {enter}", "{tab} q w e r t y u i o p { } \\ {up}", "{shift} {left} {right} a s d f g h j k l ; ' [ {down}", "⎘ {alt} {ctrl} z x c v b n m , . / ] {space}"]},
                    layoutName: "en",
                    display: t[n],
                    onKeyPress: e => {
                        if ("⎘" === e) return;
                        const t = u(e);
                        for (const e of t) this.fireKeyDown(e)
                    },
                    onKeyReleased: e => {
                        if ("⎘" === e) return n = (n + 1) % t.length, void i.setOptions({display: t[n]});
                        const r = u(e);
                        for (const e of r) this.fireKeyUp(e)
                    },
                    preventMouseDownDefault: !0,
                    preventMouseUpDefault: !0,
                    stopMouseDownPropagation: !0,
                    stopMouseUpPropagation: !0,
                    physicalKeyboardHighlight: !1,
                    physicalKeyboardHighlightPress: !1,
                    physicalKeyboardHighlightPressUseClick: !1,
                    physicalKeyboardHighlightPressUsePointerEvents: !1
                });
                this.toggleKeyboard = () => {
                    e = !e;
                    const t = e ? "block" : "none";
                    r.style.display = t;
                    for (const t of this.onKeyboardChanged) t(e);
                    return this.keyboardVisible = e, e
                }, this.options.keyboardDiv || this.mouseOverlay.appendChild(r)
            }
        }

        function u(e) {
            if (e.length > 1) return "{enter}" === e ? [a.KBD_enter] : "{shift}" === e ? [a.KBD_leftshift] : "{bksp}" === e ? [a.KBD_backspace] : "{lock}" === e ? [a.KBD_capslock] : "{tab}" === e ? [a.KBD_tab] : "{space}" === e ? [a.KBD_space] : "{esc}" === e ? [a.KBD_esc] : "{ctrl}" === e ? [a.KBD_leftctrl] : "{alt}" === e ? [a.KBD_leftalt] : "{up}" === e ? [a.KBD_up] : "{down}" === e ? [a.KBD_down] : "{left}" === e ? [a.KBD_left] : "{right}" === e ? [a.KBD_right] : (console.warn("Unknown button", e), []);
            if ("," === e) return [a.KBD_comma];
            if ("." === e) return [a.KBD_period];
            if ("'" === e) return [a.KBD_quote];
            if (":" === e) return [a.KBD_semicolon];
            if ("{" === e) return [a.KBD_leftshift, a.KBD_leftbracket];
            if ("}" === e) return [a.KBD_leftshift, a.KBD_rightbracket];
            const t = (0, a.domToKeyCode)(e.toUpperCase().charCodeAt(0));
            return 0 === t ? [] : [t]
        }

        n.Layers = c
    }, {
        "./helpers": 153,
        "./keys": 154,
        "core-js/modules/web.dom-collections.iterator.js": 124,
        "element-resize-detector": 129,
        notyf: 137,
        "simple-keyboard": 138
    }],
    156: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.lifecycle = void 0, n.lifecycle = function (e) {
            let t = "", n = "";

            function r() {
                document[t] ? e.pause() : e.resume()
            }

            void 0 !== document.hidden ? (t = "hidden", n = "visibilitychange") : void 0 !== document.mozHidden ? (t = "mozHidden", n = "mozvisibilitychange") : void 0 !== document.msHidden ? (t = "msHidden", n = "msvisibilitychange") : void 0 !== document.webkitHidden && (t = "webkitHidden", n = "webkitvisibilitychange"), document.addEventListener(n, r), e.events().onExit((() => {
                document.removeEventListener(n, r)
            }))
        }
    }, {}],
    157: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.MemStorage = void 0, n.MemStorage = class {
            constructor() {
                r(this, "length", 0), r(this, "storage", {})
            }

            setItem(e, t) {
                this.storage[e] = t, this.length = Object.keys(this.storage).length
            }

            getItem(e) {
                const t = this.storage[e];
                return void 0 === t ? null : t
            }

            removeItem(e) {
                delete this.storage[e], this.length = Object.keys(this.storage).length
            }

            key(e) {
                const t = Object.keys(this.storage);
                return void 0 === t[e] ? null : t[e]
            }

            clear() {
                this.length = 0, this.storage = {}
            }
        }
    }, {}],
    158: [function (e, t, n) {
        "use strict";

        function r(e, t) {
            if (e.type.match(/^touch/)) {
                const n = e, r = t.getBoundingClientRect();
                return {x: n.targetTouches[0].clientX - r.x, y: n.targetTouches[0].clientY - r.y, mX: 0, mY: 0}
            }
            if (e.type.match(/^pointer/)) {
                const t = e;
                return {x: t.offsetX, y: t.offsetY, mX: t.movementX, mY: t.movementY}
            }
            {
                const t = e;
                return {x: t.offsetX, y: t.offsetY, mX: t.movementX, mY: t.movementY, button: 0 === t.button ? 0 : 1}
            }
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.pointers = n.getPointerState = n.pointer = void 0, n.pointer = function () {
            const e = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent), t = e && !!("ontouchstart" in window),
                n = e && !!window.PointerEvent, r = e && !!window.MSPointerEvent;
            let i = !e;
            const o = [], s = [], a = [], l = [], c = [];
            return n ? (o.push("pointerdown"), a.push("pointerup", "pointercancel"), s.push("pointermove"), c.push("touchstart", "touchmove", "touchend")) : r ? (o.push("MSPointerDown"), s.push("MSPointerMove"), a.push("MSPointerUp")) : t ? (i = !1, o.push("touchstart", "mousedown"), s.push("touchmove"), a.push("touchend", "touchcancel", "mouseup")) : (o.push("mousedown"), s.push("mousemove"), a.push("mouseup"), l.push("mouseleave")), {
                mobile: e,
                canLock: i,
                starters: o,
                changers: s,
                enders: a,
                prevents: c,
                leavers: l
            }
        }(), n.getPointerState = r, n.pointers = {bind: n.pointer, getPointerState: r}
    }, {}],
    159: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.LStorage = void 0;
        const i = e("./mem-storage");
        n.LStorage = class {
            constructor(e, t) {
                r(this, "backend", void 0), r(this, "length", void 0), r(this, "prefix", void 0), this.prefix = t;
                try {
                    this.backend = e || localStorage, this.testBackend()
                } catch (e) {
                    this.backend = new i.MemStorage
                }
                this.length = this.backend.length, "function" == typeof this.backend.sync && (this.sync = e => {
                    this.backend.sync(e)
                })
            }

            testBackend() {
                const e = this.prefix + ".test.record";
                this.backend.setItem(e, "123");
                const t = this.backend.getItem(e);
                if (this.backend.removeItem(e), "123" !== t || null !== this.backend.getItem(e)) throw new Error("Storage backend is not working properly")
            }

            setLocalStoragePrefix(e) {
                this.prefix = e
            }

            clear() {
                if (!this.backend.length) return;
                const e = [];
                for (let t = 0; t < this.backend.length; ++t) {
                    const n = this.backend.key(t);
                    n && n.startsWith(this.prefix) && e.push(n)
                }
                for (const t of e) this.backend.removeItem(t);
                this.length = this.backend.length
            }

            key(e) {
                return this.backend.key(e)
            }

            setItem(e, t) {
                if (!t || void 0 === t.length || 0 === t.length) return void this.writeStringToKey(e, "");
                let n = 0;
                for (; n < t.length;) {
                    let r = t.substr(n, 1024);
                    n += r.length, n < t.length && (r += "@"), this.writeStringToKey(e, r), e += "."
                }
            }

            getItem(e) {
                let t = this.readStringFromKey(e);
                if (null === t) return null;
                if (0 === t.length) return t;
                for (; "@" === t[t.length - 1];) {
                    t = t.substr(0, t.length - 1), e += ".";
                    const n = this.readStringFromKey(e);
                    t += null === n ? "" : n
                }
                return t
            }

            removeItem(e) {
                this.backend.removeItem(this.prefix + e), this.length = this.backend.length
            }

            writeStringToKey(e, t) {
                this.backend.setItem(this.prefix + e, t), this.length = this.backend.length
            }

            readStringFromKey(e) {
                return this.backend.getItem(this.prefix + e)
            }
        }
    }, {"./mem-storage": 157, "core-js/modules/web.dom-collections.iterator.js": 124}],
    160: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.EmulatorsUi = void 0;
        const i = e("./build"), o = e("./dom/layers"), s = e("./dom/lifecycle"), a = e("./network/xhr"),
            l = e("./graphics/_2d"), c = e("./graphics/webgl"), u = e("./graphics/video"), d = e("./controls/keyboard"),
            f = e("./controls/mouse/mouse-common"), p = e("./controls/nipple"), h = e("./controls/options"),
            y = e("./dom/keys"), m = e("./sound/audio-node"), v = e("./notification/notyf"),
            g = e("./persist/save-load"), b = e("./controls/grid"), w = e("./dom/pointer"), _ = e("./dom/storage"),
            x = e("./js-dos");

        class k {
            constructor() {
                r(this, "build", i.Build), r(this, "dom", {
                    layers: o.layers,
                    lifecycle: s.lifecycle,
                    pointers: w.pointers,
                    storage: new _.LStorage(void 0, "emulators.ui.")
                }), r(this, "network", {resolveBundle: a.resolveBundle}), r(this, "graphics", {
                    webGl: c.webGl,
                    _2d: l._2d,
                    video: u.video
                }), r(this, "sound", {audioNode: m.audioNode}), r(this, "persist", {
                    save: g.save,
                    load: g.load
                }), r(this, "controls", {
                    getGrid: b.getGrid,
                    namedKeyCodes: y.namedKeyCodes,
                    domToKeyCodes: y.domToKeyCodes,
                    domToKeyCode: y.domToKeyCode,
                    keyCodesToDom: y.keyCodesToDom,
                    keyboard: d.keyboard,
                    mouse: f.mouse,
                    nipple: p.nipple,
                    options: h.options
                }), r(this, "notifications", {notyf: v.notyf}), r(this, "dos", ((e, t) => new x.DosInstance(e, j, t || {})))
            }
        }

        n.EmulatorsUi = k;
        const j = new k;
        window.emulatorsUi = j, window.Dos = j.dos
    }, {
        "./build": 139,
        "./controls/grid": 141,
        "./controls/keyboard": 142,
        "./controls/mouse/mouse-common": 146,
        "./controls/nipple": 150,
        "./controls/options": 152,
        "./dom/keys": 154,
        "./dom/layers": 155,
        "./dom/lifecycle": 156,
        "./dom/pointer": 158,
        "./dom/storage": 159,
        "./graphics/_2d": 161,
        "./graphics/video": 162,
        "./graphics/webgl": 163,
        "./js-dos": 164,
        "./network/xhr": 165,
        "./notification/notyf": 166,
        "./persist/save-load": 168,
        "./sound/audio-node": 169
    }],
    161: [function (e, t, n) {
        "use strict";
        e("core-js/modules/es.typed-array.uint8-clamped-array.js"), e("core-js/modules/es.typed-array.set.js"), e("core-js/modules/es.typed-array.sort.js"), Object.defineProperty(n, "__esModule", {value: !0}), n._2d = void 0, n._2d = function (e, t) {
            const n = e.canvas, r = n.getContext("2d");
            if (null === r) throw new Error("Unable to create 2d context on given canvas");
            let i = e.width, o = e.height, s = 0, a = 0;
            const l = () => {
                const e = s / a;
                let t = i, r = i / e;
                r > o && (r = o, t = o * e), n.style.position = "relative", n.style.top = (o - r) / 2 + "px", n.style.left = (i - t) / 2 + "px", n.style.width = t + "px", n.style.height = r + "px"
            }, c = (e, t) => {
                i = e, o = t, l()
            };
            e.addOnResize(c);
            let u = new Uint8ClampedArray(0);
            const d = (e, t) => {
                s = e, a = t, n.width = s, n.height = a, u = new Uint8ClampedArray(e * t * 4), l()
            };
            t.events().onFrameSize(d), t.events().onFrame(((e, t) => {
                if (null === e && null === t) return;
                const n = null !== e ? e : t;
                let i = 0, o = 0;
                for (; o < u.length;) u[o++] = n[i++], u[o++] = n[i++], u[o++] = n[i++], u[o++] = 255, n.length === u.length && i++;
                r.putImageData(new ImageData(u, s, a), 0, 0)
            })), d(t.width(), t.height()), t.events().onExit((() => {
                e.removeOnResize(c)
            }))
        }
    }, {
        "core-js/modules/es.typed-array.set.js": 120,
        "core-js/modules/es.typed-array.sort.js": 121,
        "core-js/modules/es.typed-array.uint8-clamped-array.js": 123
    }],
    162: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.video = void 0, n.video = function (e, t) {
            e.switchToVideo(), t.events().onMessage(((t, n) => {
                "onremotestream" === t && window.Janus.attachMediaStream(e.video, n)
            }))
        }
    }, {}],
    163: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            const r = e.createShader(t);
            if (e.shaderSource(r, n), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS)) {
                const t = e.getShaderInfoLog(r);
                throw e.deleteShader(r), new Error("An error occurred compiling the shaders: " + t)
            }
            return r
        }

        e("core-js/modules/es.typed-array.uint8-array.js"), e("core-js/modules/es.typed-array.set.js"), e("core-js/modules/es.typed-array.sort.js"), e("core-js/modules/es.typed-array.float32-array.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.webGl = void 0, n.webGl = function (e, t) {
            const n = e.canvas, i = n.getContext("webgl");
            if (null === i) throw new Error("Unable to create webgl context on given canvas");
            const o = function (e, t, n) {
                    const i = r(e, e.VERTEX_SHADER, "\nattribute vec4 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nvarying highp vec2 vTextureCoord;\n\nvoid main(void) {\n  gl_Position = aVertexPosition;\n  vTextureCoord = aTextureCoord;\n}\n"),
                        o = r(e, e.FRAGMENT_SHADER, "\nvarying highp vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\n\nvoid main(void) {\n  highp vec4 color = texture2D(uSampler, vTextureCoord);\n  gl_FragColor = vec4(color.r, color.g, color.b, 1.0);\n}\n"),
                        s = e.createProgram();
                    if (e.attachShader(s, i), e.attachShader(s, o), e.linkProgram(s), !e.getProgramParameter(s, e.LINK_STATUS)) throw new Error("Unable to initialize the shader program: " + e.getProgramInfoLog(s));
                    return s
                }(i), s = i.getAttribLocation(o, "aVertexPosition"), a = i.getAttribLocation(o, "aTextureCoord"),
                l = i.getUniformLocation(o, "uSampler");
            !function (e, t, n) {
                const r = e.createBuffer();
                e.bindBuffer(e.ARRAY_BUFFER, r);
                e.bufferData(e.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]), e.STATIC_DRAW), e.vertexAttribPointer(t, 3, e.FLOAT, !1, 0, 0), e.enableVertexAttribArray(t);
                const i = e.createBuffer();
                e.bindBuffer(e.ARRAY_BUFFER, i);
                e.bufferData(e.ARRAY_BUFFER, new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]), e.STATIC_DRAW), e.vertexAttribPointer(n, 2, e.FLOAT, !1, 0, 0), e.enableVertexAttribArray(n)
            }(i, s, a);
            const c = i.createTexture();
            i.bindTexture(i.TEXTURE_2D, c), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR);
            const u = new Uint8Array([0, 0, 0]);
            i.texImage2D(i.TEXTURE_2D, 0, i.RGB, 1, 1, 0, i.RGB, i.UNSIGNED_BYTE, u), i.useProgram(o), i.activeTexture(i.TEXTURE0), i.uniform1i(l, 0);
            let d = e.width, f = e.height, p = 0, h = 0;
            const y = () => {
                const e = p / h;
                let t = d, r = d / e;
                r > f && (r = f, t = f * e), n.style.position = "relative", n.style.top = (f - r) / 2 + "px", n.style.left = (d - t) / 2 + "px", n.style.width = t + "px", n.style.height = r + "px"
            }, m = (e, t) => {
                d = e, f = t, y()
            };
            e.addOnResize(m);
            const v = (e, t) => {
                p = e, h = t, n.width = p, n.height = h, i.viewport(0, 0, p, h), y()
            };
            t.events().onFrameSize(v), v(t.width(), t.height());
            let g = null, b = null, w = 0;
            t.events().onFrame(((e, t) => {
                b = null != e ? e : t, w = null != e ? i.RGB : i.RGBA, null === g && (g = requestAnimationFrame(_))
            }));
            const _ = () => {
                i.texImage2D(i.TEXTURE_2D, 0, w, p, h, 0, w, i.UNSIGNED_BYTE, b), i.drawArrays(i.TRIANGLES, 0, 6), g = null, b = null
            };
            t.events().onExit((() => {
                e.removeOnResize(m)
            }))
        }
    }, {
        "core-js/modules/es.typed-array.float32-array.js": 119,
        "core-js/modules/es.typed-array.set.js": 120,
        "core-js/modules/es.typed-array.sort.js": 121,
        "core-js/modules/es.typed-array.uint8-array.js": 122
    }],
    164: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.DosInstance = void 0;
        const i = e("./controls/layers-config"), o = e("./controls/legacy-layers-control"),
            s = e("./controls/null-layers-control"), a = e("./controls/layers-control"), l = e("./dom/pointer");
        n.DosInstance = class {
            constructor(e, t, n) {
                var i, o, s;
                r(this, "emulatorsUi", void 0), r(this, "emulatorFunction", void 0), r(this, "createTransportLayer", void 0), r(this, "layers", void 0), r(this, "layersConfig", null), r(this, "ciPromise", void 0), r(this, "options", void 0), r(this, "mobileControls", void 0), r(this, "mirroredControls", void 0), r(this, "scaleControls", void 0), r(this, "autolock", void 0), r(this, "sensitivity", void 0), r(this, "storage", void 0), r(this, "volume", void 0), r(this, "clickToStart", void 0), r(this, "unbindControls", (() => {
                })), r(this, "storedLayersConfig", null), r(this, "onMobileControlsChanged", void 0), r(this, "onSensitivityChanged", []), r(this, "onScaleChanged", []), r(this, "onVolumeChanged", []), r(this, "setVolumeImplFn", (() => {
                })), r(this, "registerOnSensitivityChanged", (e => {
                    this.onSensitivityChanged.push(e)
                })), r(this, "removeOnSensitivityChanged", (e => {
                    this.onSensitivityChanged = this.onSensitivityChanged.filter((t => t !== e))
                })), r(this, "registerOnScaleChanged", (e => {
                    this.onScaleChanged.push(e)
                })), r(this, "removeOnScaleChanged", (e => {
                    this.onScaleChanged = this.onScaleChanged.filter((t => t !== e))
                })), r(this, "registerOnVolumeChanged", (e => {
                    this.onVolumeChanged.push(e)
                })), r(this, "removeOnVolumeChanged", (e => {
                    this.onVolumeChanged = this.onVolumeChanged.filter((t => t !== e))
                })), this.options = n, this.emulatorsUi = t, this.storage = t.dom.storage, this.emulatorFunction = n.emulatorFunction || "dosboxWorker", this.clickToStart = n.clickToStart || !1, this.layers = this.emulatorsUi.dom.layers(e, n.layersOptions), this.layers.showLoadingLayer(), this.createTransportLayer = n.createTransportLayer, this.mobileControls = l.pointers.bind.mobile, this.autolock = !1, this.mirroredControls = "true" === this.storage.getItem("mirroredControls");
                const a = Number.parseFloat(null !== (i = this.storage.getItem("scaleControls")) && void 0 !== i ? i : "1.0");
                this.scaleControls = Number.isNaN(a) ? 1 : a;
                const c = Number.parseFloat(null !== (o = this.storage.getItem("sensitivity")) && void 0 !== o ? o : "1.0");
                this.sensitivity = Number.isNaN(c) ? 1 : c;
                const u = Number.parseFloat(null !== (s = this.storage.getItem("volume")) && void 0 !== s ? s : "1.0");
                if (this.volume = Number.isNaN(u) ? 1 : u, this.onMobileControlsChanged = () => {
                }, "backend" === this.emulatorFunction && void 0 === this.createTransportLayer) throw new Error("Emulator function set to 'backend' but 'createTransportLayer' is not a function")
            }

            async run(e, t, n) {
                var r, o, s;
                await this.stop(), this.layers.setLoadingMessage("Starting...");
                const a = null != n && n.length > 0 ? n : e + ".changes";
                let l;
                try {
                    l = await this.runBundle(e, t, a)
                } catch (e) {
                    throw this.layers.setLoadingMessage("Unexpected error occured..."), this.layers.notyf.error({message: "Can't start emulator look browser logs for more info"}), console.error(e), e
                }
                const c = this.emulatorsUi;
                if ("janus" === this.emulatorFunction) c.graphics.video(this.layers, l); else {
                    c.persist.save(a, this.layers, l, emulators);
                    try {
                        if (!0 === this.options.noWebGL) throw new Error("WebGL is disabled by options");
                        c.graphics.webGl(this.layers, l)
                    } catch (e) {
                        console.error("Unable to create webgl canvas, fallback to 2d rendering"), c.graphics._2d(this.layers, l)
                    }
                    this.setVolumeImplFn = c.sound.audioNode(l), this.setVolumeImplFn(this.volume)
                }
                c.dom.lifecycle(l);
                const u = await l.config();
                return this.autolock = !0 === (null === (r = u.output) || void 0 === r || null === (o = r.options) || void 0 === o || null === (s = o.autolock) || void 0 === s ? void 0 : s.value), await this.setLayersConfig((0, i.extractLayersConfig)(u)), this.mobileControls || (this.mobileControls = !0, this.disableMobileControls()), this.layers.setLoadingMessage("Ready"), this.layers.hideLoadingLayer(), this.clickToStart && this.layers.showClickToStart(), l
            }

            async stop() {
                if (this.layers.showLoadingLayer(), void 0 === this.ciPromise) return;
                const e = await this.ciPromise;
                delete this.ciPromise, await e.exit()
            }

            async setLayersConfig(e, t) {
                if (void 0 === this.ciPromise) return;
                const n = await this.ciPromise;
                this.layersConfig = e, this.unbindControls(), null === e ? this.unbindControls = (0, s.initNullLayersControl)(this, this.layers, n) : void 0 === e.version ? this.unbindControls = (0, o.initLegacyLayersControl)(this, this.layers, e, n) : this.unbindControls = (0, a.initLayersControl)(this.layers, e, n, this, this.mirroredControls, this.scaleControls, t)
            }

            getLayersConfig() {
                return this.layersConfig
            }

            async enableMobileControls() {
                this.mobileControls || (this.mobileControls = !0, await this.setLayersConfig(this.storedLayersConfig), this.storedLayersConfig = null, this.onMobileControlsChanged(!0))
            }

            async disableMobileControls() {
                this.mobileControls && (this.mobileControls = !1, this.storedLayersConfig = this.layersConfig, await this.setLayersConfig(null), this.onMobileControlsChanged(!1))
            }

            async setMirroredControls(e) {
                this.mirroredControls !== e && (this.mirroredControls = e, this.storage.setItem("mirroredControls", e + ""), e ? this.mobileControls ? await this.setLayersConfig(this.layersConfig) : await this.enableMobileControls() : this.mobileControls && await this.setLayersConfig(this.layersConfig))
            }

            async setScaleControls(e) {
                if (e !== this.scaleControls) {
                    this.scaleControls = e, this.storage.setItem("scaleControls", e + ""), this.mobileControls && await this.setLayersConfig(this.layersConfig);
                    for (const e of this.onScaleChanged) e(this.scaleControls)
                }
            }

            async setSensitivity(e) {
                if (e !== this.sensitivity) {
                    this.sensitivity = e, this.storage.setItem("sensitivity", e + ""), await this.setLayersConfig(this.layersConfig);
                    for (const e of this.onSensitivityChanged) e(this.sensitivity)
                }
            }

            async setVolume(e) {
                this.volume = e, this.storage.setItem("volume", e + ""), this.setVolumeImplFn(e);
                for (const e of this.onVolumeChanged) e(this.volume)
            }

            async setAutolock(e) {
                e !== this.autolock && (this.autolock = e, await this.setLayersConfig(this.layersConfig))
            }

            setOnMobileControlsChanged(e) {
                this.onMobileControlsChanged = e
            }

            async runBundle(e, t, n) {
                const r = this.emulatorsUi;
                if ("janus" === this.emulatorFunction) this.layers.setLoadingMessage("Connecting..."), this.ciPromise = emulators.janus(e); else {
                    this.layers.setLoadingMessage("Downloading bundle ...");
                    const i = r.network.resolveBundle(e, {onprogress: e => this.layers.setLoadingMessage("Downloading bundle " + e + "%")}),
                        o = {
                            onExtractProgress: (e, t, n, r) => {
                                if (0 !== e) return;
                                const i = Math.round(n / r * 100), o = t.lastIndexOf("/"), s = t.substring(o + 1);
                                this.layers.setLoadingMessage("Extracting " + i + "% (" + s + ")")
                            }
                        };
                    try {
                        let e;
                        e = null != t && t.length > 0 ? await r.network.resolveBundle(t, {httpCache: !1}) : await r.persist.load(n, emulators);
                        const s = await i;
                        "backend" === this.emulatorFunction ? this.ciPromise = emulators.backend([s, e], this.createTransportLayer(), o) : this.ciPromise = emulators[this.emulatorFunction]([s, e], o)
                    } catch {
                        const e = await i;
                        "backend" === this.emulatorFunction ? this.ciPromise = emulators.backend([e], this.createTransportLayer(), o) : this.ciPromise = emulators[this.emulatorFunction]([e], o)
                    }
                }
                return this.ciPromise
            }
        }
    }, {
        "./controls/layers-config": 143,
        "./controls/layers-control": 144,
        "./controls/legacy-layers-control": 145,
        "./controls/null-layers-control": 151,
        "./dom/pointer": 158,
        "core-js/modules/web.dom-collections.iterator.js": 124
    }],
    165: [function (e, t, n) {
        "use strict";
        e("core-js/modules/es.typed-array.uint8-array.js"), e("core-js/modules/es.typed-array.set.js"), e("core-js/modules/es.typed-array.sort.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.resolveBundle = void 0, n.resolveBundle = async function (e, t) {
            const n = null == t ? void 0 : t.onprogress, r = !(!1 === (null == t ? void 0 : t.httpCache));
            return new Promise(((t, i) => {
                const o = new XMLHttpRequest;
                o.open("GET", e, !0), o.overrideMimeType("text/plain; charset=x-user-defined"), o.addEventListener("error", (() => {
                    i(new Error("Network error, can't download " + e))
                })), o.addEventListener("abort", (() => {
                    i(new Error("Request canceled for url " + e))
                }), !1), o.responseType = "arraybuffer", o.onreadystatechange = () => {
                    4 === o.readyState && (200 === o.status ? (void 0 !== n && n(100), t(new Uint8Array(o.response))) : i(new Error("Network error, can't download " + e)))
                }, void 0 !== n && (o.onprogress = e => {
                    if (e.total && e.total > 0) {
                        const t = Math.round(1e4 * e.loaded / e.total) / 100;
                        n(t)
                    }
                }), !1 === r && (o.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0"), o.setRequestHeader("Expires", "Tue, 01 Jan 1980 1:00:00 GMT"), o.setRequestHeader("Pragma", "no-cache")), o.send()
            }))
        }
    }, {
        "core-js/modules/es.typed-array.set.js": 120,
        "core-js/modules/es.typed-array.sort.js": 121,
        "core-js/modules/es.typed-array.uint8-array.js": 122
    }],
    166: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.notyf = void 0, n.notyf = function (e, t) {
            const n = e.notyf;
            t.events().onMessage((function (e) {
                if ("error" === e) {
                    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                    n.error({message: JSON.stringify(r)})
                }
            }))
        }
    }, {}],
    167: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.makeCache = void 0;

        class i {
            close() {
            }

            put(e, t) {
                return Promise.resolve()
            }

            get(e, t) {
                return void 0 !== t ? Promise.resolve(t) : Promise.reject(new Error("Cache is not supported on this host"))
            }

            forEach(e, t) {
                t()
            }
        }

        n.makeCache = function (e, t) {
            return new Promise((n => {
                new o(e, n, (e => {
                    t.onErr(e), n(new i)
                }))
            }))
        };

        class o {
            constructor(e, t, n) {
                if (r(this, "version", void 0), r(this, "storeName", "files"), r(this, "indexedDB", void 0), r(this, "db", null), this.version = e, this.indexedDB = "undefined" == typeof window ? void 0 : window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB, this.indexedDB) try {
                    const r = this.indexedDB.open("js-dos-cache (" + e + ")", 1);
                    r.onerror = e => {
                        var t;
                        n("Can't open cache database: " + (null === (t = r.error) || void 0 === t ? void 0 : t.message))
                    }, r.onsuccess = e => {
                        this.db = r.result, t(this)
                    }, r.onupgradeneeded = e => {
                        try {
                            this.db = r.result, this.db.onerror = e => {
                                n("Can't upgrade cache database")
                            }, this.db.createObjectStore(this.storeName)
                        } catch (e) {
                            n("Can't upgrade cache database")
                        }
                    }
                } catch (e) {
                    n("Can't open cache database: " + e.message)
                } else n("Indexed db is not supported on this host")
            }

            close() {
                null !== this.db && (this.db.close(), this.db = null)
            }

            put(e, t) {
                return new Promise((n => {
                    if (null === this.db) return void n();
                    const r = this.db.transaction(this.storeName, "readwrite");
                    r.oncomplete = () => n(), r.objectStore(this.storeName).put(t, e)
                }))
            }

            get(e, t) {
                return new Promise(((n, r) => {
                    function i(e) {
                        void 0 === t ? r(new Error(e)) : n(t)
                    }

                    if (null === this.db) return void i("db is not initalized");
                    const o = this.db.transaction(this.storeName, "readonly").objectStore(this.storeName).get(e);
                    o.onerror = () => r(new Error("Can't read value for key '" + e + "'")), o.onsuccess = () => {
                        o.result ? n(o.result) : i("Result is empty for key '" + e + "', result: " + o.result)
                    }
                }))
            }

            forEach(e, t) {
                if (null === this.db) return void t();
                const n = this.db.transaction(this.storeName, "readonly").objectStore(this.storeName).openCursor();
                n.onerror = () => t(), n.onsuccess = n => {
                    const r = n.target.result;
                    r ? (e(r.key.toString(), r.value), r.continue()) : t()
                }
            }
        }
    }, {}],
    168: [function (e, t, n) {
        "use strict";
        e("core-js/modules/es.typed-array.uint8-array.js"), e("core-js/modules/es.typed-array.set.js"), e("core-js/modules/es.typed-array.sort.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.load = n.save = void 0;
        const r = (0, e("./cache").makeCache)("emulators-ui-saves", {onErr: console.error});
        n.save = function (e, t, n, i) {
            t.setOnSave((async () => {
                const t = await r, i = await n.persist();
                return t.put(e, i.buffer)
            }))
        }, n.load = async function (e, t) {
            return (await r).get(e).then((e => new Uint8Array(e)))
        }
    }, {
        "./cache": 167,
        "core-js/modules/es.typed-array.set.js": 120,
        "core-js/modules/es.typed-array.sort.js": 121,
        "core-js/modules/es.typed-array.uint8-array.js": 122
    }],
    169: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.audioNode = void 0;

        class r {
            constructor() {
                var e, t;
                t = [], (e = "samplesQueue") in this ? Object.defineProperty(this, e, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : this[e] = t
            }

            push(e) {
                this.samplesQueue.push(e)
            }

            length() {
                let e = 0;
                for (const t of this.samplesQueue) e += t.length;
                return e
            }

            writeTo(e, t) {
                let n = 0;
                for (; this.samplesQueue.length > 0;) {
                    const r = this.samplesQueue[0], i = Math.min(t - n, r.length);
                    if (i === r.length ? (e.set(r, n), this.samplesQueue.shift()) : (e.set(r.slice(0, i), n), this.samplesQueue[0] = r.slice(i)), n += i, n === t) break
                }
                n < t && e.fill(0, n)
            }
        }

        n.audioNode = function (e) {
            const t = e.soundFrequency();
            if (0 === t) return console.warn("Can't create audio node with sampleRate === 0, ingnoring"), () => {
            };
            let n = null;
            if ("undefined" != typeof AudioContext ? n = new AudioContext({
                sampleRate: t,
                latencyHint: "interactive"
            }) : void 0 !== window.webkitAudioContext && (n = new window.webkitAudioContext({
                sampleRate: t,
                latencyHint: "interactive"
            })), null == n) return () => {
            };
            const i = new r;
            e.events().onSoundPush((e => {
                i.length() < 6144 && i.push(e)
            }));
            const o = n.createScriptProcessor(2048, 0, 1);
            let s = !1, a = 0;
            const l = e.directSound;
            o.onaudioprocess = void 0 !== e.directSound ? e => {
                if (!s) {
                    const e = l.buffer[0];
                    s = Math.ceil(e[e.length - 1]) > 0
                }
                if (!s) return;
                let t = 0, n = e.outputBuffer.length;
                const r = e.outputBuffer.numberOfChannels;
                let i, o = l.buffer[a];
                for (; n > 0 && (i = Math.ceil(o[o.length - 1])) > 0;) if (n >= i) {
                    const s = o.subarray(0, i);
                    for (let n = 0; n < r; ++n) e.outputBuffer.getChannelData(n).set(s, t);
                    t += i, n -= i, o[o.length - 1] = 0, a = (a + 1) % l.ringSize, o = l.buffer[a]
                } else {
                    const s = o.subarray(0, n);
                    for (let n = 0; n < r; ++n) e.outputBuffer.getChannelData(n).set(s, t);
                    o[o.length - 1] = i - n, o.set(o.subarray(n, n + o[o.length - 1])), n = 0
                }
            } : e => {
                const t = e.outputBuffer.length, n = e.outputBuffer.numberOfChannels, r = i.length();
                if (s || (s = r >= 2048), s) for (let r = 0; r < n; r++) {
                    const n = e.outputBuffer.getChannelData(r);
                    i.writeTo(n, t)
                }
            };
            const c = n.createGain();
            c.connect(n.destination), o.connect(c), c.gain.value = 1;
            const u = () => {
                null !== n && "suspended" === n.state && n.resume()
            };
            return document.addEventListener("click", u, {once: !0}), document.addEventListener("touchstart", u, {once: !0}), document.addEventListener("keydown", u, {once: !0}), e.events().onExit((() => {
                null !== n && (o.disconnect(), c.disconnect(), n.close()), document.removeEventListener("click", u), document.removeEventListener("touchstart", u), document.removeEventListener("keydown", u)
            })), e => {
                c.gain.value = e
            }
        }
    }, {"core-js/modules/web.dom-collections.iterator.js": 124}]
}, {}, [160]), function e(t, n, r) {
    function i(s, a) {
        if (!n[s]) {
            if (!t[s]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(s, !0);
                if (o) return o(s, !0);
                var c = new Error("Cannot find module '" + s + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = n[s] = {exports: {}};
            t[s][0].call(u.exports, (function (e) {
                return i(t[s][1][e] || e)
            }), u, u.exports, e, t, n, r)
        }
        return n[s].exports
    }

    for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) i(r[s]);
    return i
}({
    1: [function (e, t, n) {
        var r = e("../internals/is-callable"), i = e("../internals/try-to-string"), o = TypeError;
        t.exports = function (e) {
            if (r(e)) return e;
            throw o(i(e) + " is not a function")
        }
    }, {"../internals/is-callable": 67, "../internals/try-to-string": 120}],
    2: [function (e, t, n) {
        var r = e("../internals/is-constructor"), i = e("../internals/try-to-string"), o = TypeError;
        t.exports = function (e) {
            if (r(e)) return e;
            throw o(i(e) + " is not a constructor")
        }
    }, {"../internals/is-constructor": 68, "../internals/try-to-string": 120}],
    3: [function (e, t, n) {
        var r = e("../internals/is-callable"), i = String, o = TypeError;
        t.exports = function (e) {
            if ("object" == typeof e || r(e)) return e;
            throw o("Can't set " + i(e) + " as a prototype")
        }
    }, {"../internals/is-callable": 67}],
    4: [function (e, t, n) {
        var r = e("../internals/well-known-symbol"), i = e("../internals/object-create"),
            o = e("../internals/object-define-property").f, s = r("unscopables"), a = Array.prototype;
        null == a[s] && o(a, s, {configurable: !0, value: i(null)}), t.exports = function (e) {
            a[s][e] = !0
        }
    }, {
        "../internals/object-create": 81,
        "../internals/object-define-property": 83,
        "../internals/well-known-symbol": 127
    }],
    5: [function (e, t, n) {
        "use strict";
        var r = e("../internals/string-multibyte").charAt;
        t.exports = function (e, t, n) {
            return t + (n ? r(e, t).length : 1)
        }
    }, {"../internals/string-multibyte": 107}],
    6: [function (e, t, n) {
        var r = e("../internals/object-is-prototype-of"), i = TypeError;
        t.exports = function (e, t) {
            if (r(t, e)) return e;
            throw i("Incorrect invocation")
        }
    }, {"../internals/object-is-prototype-of": 88}],
    7: [function (e, t, n) {
        var r = e("../internals/is-object"), i = String, o = TypeError;
        t.exports = function (e) {
            if (r(e)) return e;
            throw o(i(e) + " is not an object")
        }
    }, {"../internals/is-object": 71}],
    8: [function (e, t, n) {
        t.exports = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView
    }, {}],
    9: [function (e, t, n) {
        "use strict";
        var r, i, o, s = e("../internals/array-buffer-native"), a = e("../internals/descriptors"),
            l = e("../internals/global"), c = e("../internals/is-callable"), u = e("../internals/is-object"),
            d = e("../internals/has-own-property"), f = e("../internals/classof"), p = e("../internals/try-to-string"),
            h = e("../internals/create-non-enumerable-property"), y = e("../internals/define-built-in"),
            m = e("../internals/object-define-property").f, v = e("../internals/object-is-prototype-of"),
            g = e("../internals/object-get-prototype-of"), b = e("../internals/object-set-prototype-of"),
            w = e("../internals/well-known-symbol"), _ = e("../internals/uid"), x = e("../internals/internal-state"),
            k = x.enforce, j = x.get, C = l.Int8Array, E = C && C.prototype, S = l.Uint8ClampedArray,
            D = S && S.prototype, O = C && g(C), P = E && g(E), B = Object.prototype, A = l.TypeError,
            M = w("toStringTag"), I = _("TYPED_ARRAY_TAG"), T = s && !!b && "Opera" !== f(l.opera), L = !1, K = {
                Int8Array: 1,
                Uint8Array: 1,
                Uint8ClampedArray: 1,
                Int16Array: 2,
                Uint16Array: 2,
                Int32Array: 4,
                Uint32Array: 4,
                Float32Array: 4,
                Float64Array: 8
            }, R = {BigInt64Array: 8, BigUint64Array: 8}, N = function (e) {
                var t = g(e);
                if (u(t)) {
                    var n = j(t);
                    return n && d(n, "TypedArrayConstructor") ? n.TypedArrayConstructor : N(t)
                }
            }, F = function (e) {
                if (!u(e)) return !1;
                var t = f(e);
                return d(K, t) || d(R, t)
            };
        for (r in K) (o = (i = l[r]) && i.prototype) ? k(o).TypedArrayConstructor = i : T = !1;
        for (r in R) (o = (i = l[r]) && i.prototype) && (k(o).TypedArrayConstructor = i);
        if ((!T || !c(O) || O === Function.prototype) && (O = function () {
            throw A("Incorrect invocation")
        }, T)) for (r in K) l[r] && b(l[r], O);
        if ((!T || !P || P === B) && (P = O.prototype, T)) for (r in K) l[r] && b(l[r].prototype, P);
        if (T && g(D) !== P && b(D, P), a && !d(P, M)) for (r in L = !0, m(P, M, {
            get: function () {
                return u(this) ? this[I] : void 0
            }
        }), K) l[r] && h(l[r], I, r);
        t.exports = {
            NATIVE_ARRAY_BUFFER_VIEWS: T, TYPED_ARRAY_TAG: L && I, aTypedArray: function (e) {
                if (F(e)) return e;
                throw A("Target is not a typed array")
            }, aTypedArrayConstructor: function (e) {
                if (c(e) && (!b || v(O, e))) return e;
                throw A(p(e) + " is not a typed array constructor")
            }, exportTypedArrayMethod: function (e, t, n, r) {
                if (a) {
                    if (n) for (var i in K) {
                        var o = l[i];
                        if (o && d(o.prototype, e)) try {
                            delete o.prototype[e]
                        } catch (n) {
                            try {
                                o.prototype[e] = t
                            } catch (e) {
                            }
                        }
                    }
                    P[e] && !n || y(P, e, n ? t : T && E[e] || t, r)
                }
            }, exportTypedArrayStaticMethod: function (e, t, n) {
                var r, i;
                if (a) {
                    if (b) {
                        if (n) for (r in K) if ((i = l[r]) && d(i, e)) try {
                            delete i[e]
                        } catch (e) {
                        }
                        if (O[e] && !n) return;
                        try {
                            return y(O, e, n ? t : T && O[e] || t)
                        } catch (e) {
                        }
                    }
                    for (r in K) !(i = l[r]) || i[e] && !n || y(i, e, t)
                }
            }, getTypedArrayConstructor: N, isView: function (e) {
                if (!u(e)) return !1;
                var t = f(e);
                return "DataView" === t || d(K, t) || d(R, t)
            }, isTypedArray: F, TypedArray: O, TypedArrayPrototype: P
        }
    }, {
        "../internals/array-buffer-native": 8,
        "../internals/classof": 20,
        "../internals/create-non-enumerable-property": 24,
        "../internals/define-built-in": 27,
        "../internals/descriptors": 31,
        "../internals/global": 55,
        "../internals/has-own-property": 56,
        "../internals/internal-state": 64,
        "../internals/is-callable": 67,
        "../internals/is-object": 71,
        "../internals/object-define-property": 83,
        "../internals/object-get-prototype-of": 87,
        "../internals/object-is-prototype-of": 88,
        "../internals/object-set-prototype-of": 92,
        "../internals/try-to-string": 120,
        "../internals/uid": 124,
        "../internals/well-known-symbol": 127
    }],
    10: [function (e, t, n) {
        "use strict";
        var r = e("../internals/global"), i = e("../internals/function-uncurry-this"),
            o = e("../internals/descriptors"), s = e("../internals/array-buffer-native"),
            a = e("../internals/function-name"), l = e("../internals/create-non-enumerable-property"),
            c = e("../internals/define-built-ins"), u = e("../internals/fails"), d = e("../internals/an-instance"),
            f = e("../internals/to-integer-or-infinity"), p = e("../internals/to-length"),
            h = e("../internals/to-index"), y = e("../internals/ieee754"),
            m = e("../internals/object-get-prototype-of"), v = e("../internals/object-set-prototype-of"),
            g = e("../internals/object-get-own-property-names").f, b = e("../internals/object-define-property").f,
            w = e("../internals/array-fill"), _ = e("../internals/array-slice-simple"),
            x = e("../internals/set-to-string-tag"), k = e("../internals/internal-state"), j = a.PROPER,
            C = a.CONFIGURABLE, E = k.get, S = k.set, D = "ArrayBuffer", O = "Wrong index", P = r.ArrayBuffer, B = P,
            A = B && B.prototype, M = r.DataView, I = M && M.prototype, T = Object.prototype, L = r.Array,
            K = r.RangeError, R = i(w), N = i([].reverse), F = y.pack, z = y.unpack, U = function (e) {
                return [255 & e]
            }, H = function (e) {
                return [255 & e, e >> 8 & 255]
            }, V = function (e) {
                return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]
            }, W = function (e) {
                return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
            }, q = function (e) {
                return F(e, 23, 4)
            }, G = function (e) {
                return F(e, 52, 8)
            }, Y = function (e, t) {
                b(e.prototype, t, {
                    get: function () {
                        return E(this)[t]
                    }
                })
            }, X = function (e, t, n, r) {
                var i = h(n), o = E(e);
                if (i + t > o.byteLength) throw K(O);
                var s = E(o.buffer).bytes, a = i + o.byteOffset, l = _(s, a, a + t);
                return r ? l : N(l)
            }, $ = function (e, t, n, r, i, o) {
                var s = h(n), a = E(e);
                if (s + t > a.byteLength) throw K(O);
                for (var l = E(a.buffer).bytes, c = s + a.byteOffset, u = r(+i), d = 0; d < t; d++) l[c + d] = u[o ? d : t - d - 1]
            };
        if (s) {
            var J = j && P.name !== D;
            if (u((function () {
                P(1)
            })) && u((function () {
                new P(-1)
            })) && !u((function () {
                return new P, new P(1.5), new P(NaN), J && !C
            }))) J && C && l(P, "name", D); else {
                (B = function (e) {
                    return d(this, A), new P(h(e))
                }).prototype = A;
                for (var Q, Z = g(P), ee = 0; Z.length > ee;) (Q = Z[ee++]) in B || l(B, Q, P[Q]);
                A.constructor = B
            }
            v && m(I) !== T && v(I, T);
            var te = new M(new B(2)), ne = i(I.setInt8);
            te.setInt8(0, 2147483648), te.setInt8(1, 2147483649), !te.getInt8(0) && te.getInt8(1) || c(I, {
                setInt8: function (e, t) {
                    ne(this, e, t << 24 >> 24)
                }, setUint8: function (e, t) {
                    ne(this, e, t << 24 >> 24)
                }
            }, {unsafe: !0})
        } else A = (B = function (e) {
            d(this, A);
            var t = h(e);
            S(this, {bytes: R(L(t), 0), byteLength: t}), o || (this.byteLength = t)
        }).prototype, I = (M = function (e, t, n) {
            d(this, I), d(e, A);
            var r = E(e).byteLength, i = f(t);
            if (i < 0 || i > r) throw K("Wrong offset");
            if (i + (n = void 0 === n ? r - i : p(n)) > r) throw K("Wrong length");
            S(this, {
                buffer: e,
                byteLength: n,
                byteOffset: i
            }), o || (this.buffer = e, this.byteLength = n, this.byteOffset = i)
        }).prototype, o && (Y(B, "byteLength"), Y(M, "buffer"), Y(M, "byteLength"), Y(M, "byteOffset")), c(I, {
            getInt8: function (e) {
                return X(this, 1, e)[0] << 24 >> 24
            }, getUint8: function (e) {
                return X(this, 1, e)[0]
            }, getInt16: function (e) {
                var t = X(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
                return (t[1] << 8 | t[0]) << 16 >> 16
            }, getUint16: function (e) {
                var t = X(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
                return t[1] << 8 | t[0]
            }, getInt32: function (e) {
                return W(X(this, 4, e, arguments.length > 1 ? arguments[1] : void 0))
            }, getUint32: function (e) {
                return W(X(this, 4, e, arguments.length > 1 ? arguments[1] : void 0)) >>> 0
            }, getFloat32: function (e) {
                return z(X(this, 4, e, arguments.length > 1 ? arguments[1] : void 0), 23)
            }, getFloat64: function (e) {
                return z(X(this, 8, e, arguments.length > 1 ? arguments[1] : void 0), 52)
            }, setInt8: function (e, t) {
                $(this, 1, e, U, t)
            }, setUint8: function (e, t) {
                $(this, 1, e, U, t)
            }, setInt16: function (e, t) {
                $(this, 2, e, H, t, arguments.length > 2 ? arguments[2] : void 0)
            }, setUint16: function (e, t) {
                $(this, 2, e, H, t, arguments.length > 2 ? arguments[2] : void 0)
            }, setInt32: function (e, t) {
                $(this, 4, e, V, t, arguments.length > 2 ? arguments[2] : void 0)
            }, setUint32: function (e, t) {
                $(this, 4, e, V, t, arguments.length > 2 ? arguments[2] : void 0)
            }, setFloat32: function (e, t) {
                $(this, 4, e, q, t, arguments.length > 2 ? arguments[2] : void 0)
            }, setFloat64: function (e, t) {
                $(this, 8, e, G, t, arguments.length > 2 ? arguments[2] : void 0)
            }
        });
        x(B, D), x(M, "DataView"), t.exports = {ArrayBuffer: B, DataView: M}
    }, {
        "../internals/an-instance": 6,
        "../internals/array-buffer-native": 8,
        "../internals/array-fill": 11,
        "../internals/array-slice-simple": 14,
        "../internals/create-non-enumerable-property": 24,
        "../internals/define-built-ins": 28,
        "../internals/descriptors": 31,
        "../internals/fails": 42,
        "../internals/function-name": 48,
        "../internals/function-uncurry-this": 49,
        "../internals/global": 55,
        "../internals/ieee754": 60,
        "../internals/internal-state": 64,
        "../internals/object-define-property": 83,
        "../internals/object-get-own-property-names": 85,
        "../internals/object-get-prototype-of": 87,
        "../internals/object-set-prototype-of": 92,
        "../internals/set-to-string-tag": 103,
        "../internals/to-index": 109,
        "../internals/to-integer-or-infinity": 111,
        "../internals/to-length": 112
    }],
    11: [function (e, t, n) {
        "use strict";
        var r = e("../internals/to-object"), i = e("../internals/to-absolute-index"),
            o = e("../internals/length-of-array-like");
        t.exports = function (e) {
            for (var t = r(this), n = o(t), s = arguments.length, a = i(s > 1 ? arguments[1] : void 0, n), l = s > 2 ? arguments[2] : void 0, c = void 0 === l ? n : i(l, n); c > a;) t[a++] = e;
            return t
        }
    }, {"../internals/length-of-array-like": 76, "../internals/to-absolute-index": 108, "../internals/to-object": 113}],
    12: [function (e, t, n) {
        var r = e("../internals/to-indexed-object"), i = e("../internals/to-absolute-index"),
            o = e("../internals/length-of-array-like"), s = function (e) {
                return function (t, n, s) {
                    var a, l = r(t), c = o(l), u = i(s, c);
                    if (e && n != n) {
                        for (; c > u;) if ((a = l[u++]) != a) return !0
                    } else for (; c > u; u++) if ((e || u in l) && l[u] === n) return e || u || 0;
                    return !e && -1
                }
            };
        t.exports = {includes: s(!0), indexOf: s(!1)}
    }, {
        "../internals/length-of-array-like": 76,
        "../internals/to-absolute-index": 108,
        "../internals/to-indexed-object": 110
    }],
    13: [function (e, t, n) {
        var r = e("../internals/function-bind-context"), i = e("../internals/function-uncurry-this"),
            o = e("../internals/indexed-object"), s = e("../internals/to-object"),
            a = e("../internals/length-of-array-like"), l = e("../internals/array-species-create"), c = i([].push),
            u = function (e) {
                var t = 1 == e, n = 2 == e, i = 3 == e, u = 4 == e, d = 6 == e, f = 7 == e, p = 5 == e || d;
                return function (h, y, m, v) {
                    for (var g, b, w = s(h), _ = o(w), x = r(y, m), k = a(_), j = 0, C = v || l, E = t ? C(h, k) : n || f ? C(h, 0) : void 0; k > j; j++) if ((p || j in _) && (b = x(g = _[j], j, w), e)) if (t) E[j] = b; else if (b) switch (e) {
                        case 3:
                            return !0;
                        case 5:
                            return g;
                        case 6:
                            return j;
                        case 2:
                            c(E, g)
                    } else switch (e) {
                        case 4:
                            return !1;
                        case 7:
                            c(E, g)
                    }
                    return d ? -1 : i || u ? u : E
                }
            };
        t.exports = {
            forEach: u(0),
            map: u(1),
            filter: u(2),
            some: u(3),
            every: u(4),
            find: u(5),
            findIndex: u(6),
            filterReject: u(7)
        }
    }, {
        "../internals/array-species-create": 17,
        "../internals/function-bind-context": 45,
        "../internals/function-uncurry-this": 49,
        "../internals/indexed-object": 61,
        "../internals/length-of-array-like": 76,
        "../internals/to-object": 113
    }],
    14: [function (e, t, n) {
        var r = e("../internals/to-absolute-index"), i = e("../internals/length-of-array-like"),
            o = e("../internals/create-property"), s = Array, a = Math.max;
        t.exports = function (e, t, n) {
            for (var l = i(e), c = r(t, l), u = r(void 0 === n ? l : n, l), d = s(a(u - c, 0)), f = 0; c < u; c++, f++) o(d, f, e[c]);
            return d.length = f, d
        }
    }, {
        "../internals/create-property": 26,
        "../internals/length-of-array-like": 76,
        "../internals/to-absolute-index": 108
    }],
    15: [function (e, t, n) {
        var r = e("../internals/array-slice-simple"), i = Math.floor, o = function (e, t) {
            var n = e.length, l = i(n / 2);
            return n < 8 ? s(e, t) : a(e, o(r(e, 0, l), t), o(r(e, l), t), t)
        }, s = function (e, t) {
            for (var n, r, i = e.length, o = 1; o < i;) {
                for (r = o, n = e[o]; r && t(e[r - 1], n) > 0;) e[r] = e[--r];
                r !== o++ && (e[r] = n)
            }
            return e
        }, a = function (e, t, n, r) {
            for (var i = t.length, o = n.length, s = 0, a = 0; s < i || a < o;) e[s + a] = s < i && a < o ? r(t[s], n[a]) <= 0 ? t[s++] : n[a++] : s < i ? t[s++] : n[a++];
            return e
        };
        t.exports = o
    }, {"../internals/array-slice-simple": 14}],
    16: [function (e, t, n) {
        var r = e("../internals/is-array"), i = e("../internals/is-constructor"), o = e("../internals/is-object"),
            s = e("../internals/well-known-symbol")("species"), a = Array;
        t.exports = function (e) {
            var t;
            return r(e) && (t = e.constructor, (i(t) && (t === a || r(t.prototype)) || o(t) && null === (t = t[s])) && (t = void 0)), void 0 === t ? a : t
        }
    }, {
        "../internals/is-array": 66,
        "../internals/is-constructor": 68,
        "../internals/is-object": 71,
        "../internals/well-known-symbol": 127
    }],
    17: [function (e, t, n) {
        var r = e("../internals/array-species-constructor");
        t.exports = function (e, t) {
            return new (r(e))(0 === t ? 0 : t)
        }
    }, {"../internals/array-species-constructor": 16}],
    18: [function (e, t, n) {
        var r = e("../internals/well-known-symbol")("iterator"), i = !1;
        try {
            var o = 0, s = {
                next: function () {
                    return {done: !!o++}
                }, return: function () {
                    i = !0
                }
            };
            s[r] = function () {
                return this
            }, Array.from(s, (function () {
                throw 2
            }))
        } catch (e) {
        }
        t.exports = function (e, t) {
            if (!t && !i) return !1;
            var n = !1;
            try {
                var o = {};
                o[r] = function () {
                    return {
                        next: function () {
                            return {done: n = !0}
                        }
                    }
                }, e(o)
            } catch (e) {
            }
            return n
        }
    }, {"../internals/well-known-symbol": 127}],
    19: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = r({}.toString), o = r("".slice);
        t.exports = function (e) {
            return o(i(e), 8, -1)
        }
    }, {"../internals/function-uncurry-this": 49}],
    20: [function (e, t, n) {
        var r = e("../internals/to-string-tag-support"), i = e("../internals/is-callable"),
            o = e("../internals/classof-raw"), s = e("../internals/well-known-symbol")("toStringTag"), a = Object,
            l = "Arguments" == o(function () {
                return arguments
            }());
        t.exports = r ? o : function (e) {
            var t, n, r;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {
                try {
                    return e[t]
                } catch (e) {
                }
            }(t = a(e), s)) ? n : l ? o(t) : "Object" == (r = o(t)) && i(t.callee) ? "Arguments" : r
        }
    }, {
        "../internals/classof-raw": 19,
        "../internals/is-callable": 67,
        "../internals/to-string-tag-support": 118,
        "../internals/well-known-symbol": 127
    }],
    21: [function (e, t, n) {
        var r = e("../internals/has-own-property"), i = e("../internals/own-keys"),
            o = e("../internals/object-get-own-property-descriptor"), s = e("../internals/object-define-property");
        t.exports = function (e, t, n) {
            for (var a = i(t), l = s.f, c = o.f, u = 0; u < a.length; u++) {
                var d = a[u];
                r(e, d) || n && r(n, d) || l(e, d, c(t, d))
            }
        }
    }, {
        "../internals/has-own-property": 56,
        "../internals/object-define-property": 83,
        "../internals/object-get-own-property-descriptor": 84,
        "../internals/own-keys": 94
    }],
    22: [function (e, t, n) {
        var r = e("../internals/fails");
        t.exports = !r((function () {
            function e() {
            }

            return e.prototype.constructor = null, Object.getPrototypeOf(new e) !== e.prototype
        }))
    }, {"../internals/fails": 42}],
    23: [function (e, t, n) {
        "use strict";
        var r = e("../internals/iterators-core").IteratorPrototype, i = e("../internals/object-create"),
            o = e("../internals/create-property-descriptor"), s = e("../internals/set-to-string-tag"),
            a = e("../internals/iterators"), l = function () {
                return this
            };
        t.exports = function (e, t, n, c) {
            var u = t + " Iterator";
            return e.prototype = i(r, {next: o(+!c, n)}), s(e, u, !1, !0), a[u] = l, e
        }
    }, {
        "../internals/create-property-descriptor": 25,
        "../internals/iterators": 75,
        "../internals/iterators-core": 74,
        "../internals/object-create": 81,
        "../internals/set-to-string-tag": 103
    }],
    24: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/object-define-property"),
            o = e("../internals/create-property-descriptor");
        t.exports = r ? function (e, t, n) {
            return i.f(e, t, o(1, n))
        } : function (e, t, n) {
            return e[t] = n, e
        }
    }, {
        "../internals/create-property-descriptor": 25,
        "../internals/descriptors": 31,
        "../internals/object-define-property": 83
    }],
    25: [function (e, t, n) {
        t.exports = function (e, t) {
            return {enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t}
        }
    }, {}],
    26: [function (e, t, n) {
        "use strict";
        var r = e("../internals/to-property-key"), i = e("../internals/object-define-property"),
            o = e("../internals/create-property-descriptor");
        t.exports = function (e, t, n) {
            var s = r(t);
            s in e ? i.f(e, s, o(0, n)) : e[s] = n
        }
    }, {
        "../internals/create-property-descriptor": 25,
        "../internals/object-define-property": 83,
        "../internals/to-property-key": 117
    }],
    27: [function (e, t, n) {
        var r = e("../internals/is-callable"), i = e("../internals/object-define-property"),
            o = e("../internals/make-built-in"), s = e("../internals/define-global-property");
        t.exports = function (e, t, n, a) {
            a || (a = {});
            var l = a.enumerable, c = void 0 !== a.name ? a.name : t;
            if (r(n) && o(n, c, a), a.global) l ? e[t] = n : s(t, n); else {
                try {
                    a.unsafe ? e[t] && (l = !0) : delete e[t]
                } catch (e) {
                }
                l ? e[t] = n : i.f(e, t, {
                    value: n,
                    enumerable: !1,
                    configurable: !a.nonConfigurable,
                    writable: !a.nonWritable
                })
            }
            return e
        }
    }, {
        "../internals/define-global-property": 29,
        "../internals/is-callable": 67,
        "../internals/make-built-in": 77,
        "../internals/object-define-property": 83
    }],
    28: [function (e, t, n) {
        var r = e("../internals/define-built-in");
        t.exports = function (e, t, n) {
            for (var i in t) r(e, i, t[i], n);
            return e
        }
    }, {"../internals/define-built-in": 27}],
    29: [function (e, t, n) {
        var r = e("../internals/global"), i = Object.defineProperty;
        t.exports = function (e, t) {
            try {
                i(r, e, {value: t, configurable: !0, writable: !0})
            } catch (n) {
                r[e] = t
            }
            return t
        }
    }, {"../internals/global": 55}],
    30: [function (e, t, n) {
        "use strict";
        var r = e("../internals/export"), i = e("../internals/function-call"), o = e("../internals/is-pure"),
            s = e("../internals/function-name"), a = e("../internals/is-callable"),
            l = e("../internals/create-iterator-constructor"), c = e("../internals/object-get-prototype-of"),
            u = e("../internals/object-set-prototype-of"), d = e("../internals/set-to-string-tag"),
            f = e("../internals/create-non-enumerable-property"), p = e("../internals/define-built-in"),
            h = e("../internals/well-known-symbol"), y = e("../internals/iterators"),
            m = e("../internals/iterators-core"), v = s.PROPER, g = s.CONFIGURABLE, b = m.IteratorPrototype,
            w = m.BUGGY_SAFARI_ITERATORS, _ = h("iterator"), x = "keys", k = "values", j = "entries", C = function () {
                return this
            };
        t.exports = function (e, t, n, s, h, m, E) {
            l(n, t, s);
            var S, D, O, P = function (e) {
                    if (e === h && T) return T;
                    if (!w && e in M) return M[e];
                    switch (e) {
                        case x:
                        case k:
                        case j:
                            return function () {
                                return new n(this, e)
                            }
                    }
                    return function () {
                        return new n(this)
                    }
                }, B = t + " Iterator", A = !1, M = e.prototype, I = M[_] || M["@@iterator"] || h && M[h],
                T = !w && I || P(h), L = "Array" == t && M.entries || I;
            if (L && (S = c(L.call(new e))) !== Object.prototype && S.next && (o || c(S) === b || (u ? u(S, b) : a(S[_]) || p(S, _, C)), d(S, B, !0, !0), o && (y[B] = C)), v && h == k && I && I.name !== k && (!o && g ? f(M, "name", k) : (A = !0, T = function () {
                return i(I, this)
            })), h) if (D = {
                values: P(k),
                keys: m ? T : P(x),
                entries: P(j)
            }, E) for (O in D) (w || A || !(O in M)) && p(M, O, D[O]); else r({
                target: t,
                proto: !0,
                forced: w || A
            }, D);
            return o && !E || M[_] === T || p(M, _, T, {name: h}), y[t] = T, D
        }
    }, {
        "../internals/create-iterator-constructor": 23,
        "../internals/create-non-enumerable-property": 24,
        "../internals/define-built-in": 27,
        "../internals/export": 41,
        "../internals/function-call": 47,
        "../internals/function-name": 48,
        "../internals/is-callable": 67,
        "../internals/is-pure": 72,
        "../internals/iterators": 75,
        "../internals/iterators-core": 74,
        "../internals/object-get-prototype-of": 87,
        "../internals/object-set-prototype-of": 92,
        "../internals/set-to-string-tag": 103,
        "../internals/well-known-symbol": 127
    }],
    31: [function (e, t, n) {
        var r = e("../internals/fails");
        t.exports = !r((function () {
            return 7 != Object.defineProperty({}, 1, {
                get: function () {
                    return 7
                }
            })[1]
        }))
    }, {"../internals/fails": 42}],
    32: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/is-object"), o = r.document,
            s = i(o) && i(o.createElement);
        t.exports = function (e) {
            return s ? o.createElement(e) : {}
        }
    }, {"../internals/global": 55, "../internals/is-object": 71}],
    33: [function (e, t, n) {
        t.exports = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0
        }
    }, {}],
    34: [function (e, t, n) {
        var r = e("../internals/document-create-element")("span").classList,
            i = r && r.constructor && r.constructor.prototype;
        t.exports = i === Object.prototype ? void 0 : i
    }, {"../internals/document-create-element": 32}],
    35: [function (e, t, n) {
        var r = e("../internals/engine-user-agent").match(/firefox\/(\d+)/i);
        t.exports = !!r && +r[1]
    }, {"../internals/engine-user-agent": 37}],
    36: [function (e, t, n) {
        var r = e("../internals/engine-user-agent");
        t.exports = /MSIE|Trident/.test(r)
    }, {"../internals/engine-user-agent": 37}],
    37: [function (e, t, n) {
        var r = e("../internals/get-built-in");
        t.exports = r("navigator", "userAgent") || ""
    }, {"../internals/get-built-in": 50}],
    38: [function (e, t, n) {
        var r, i, o = e("../internals/global"), s = e("../internals/engine-user-agent"), a = o.process, l = o.Deno,
            c = a && a.versions || l && l.version, u = c && c.v8;
        u && (i = (r = u.split("."))[0] > 0 && r[0] < 4 ? 1 : +(r[0] + r[1])), !i && s && (!(r = s.match(/Edge\/(\d+)/)) || r[1] >= 74) && (r = s.match(/Chrome\/(\d+)/)) && (i = +r[1]), t.exports = i
    }, {"../internals/engine-user-agent": 37, "../internals/global": 55}],
    39: [function (e, t, n) {
        var r = e("../internals/engine-user-agent").match(/AppleWebKit\/(\d+)\./);
        t.exports = !!r && +r[1]
    }, {"../internals/engine-user-agent": 37}],
    40: [function (e, t, n) {
        t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
    }, {}],
    41: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/object-get-own-property-descriptor").f,
            o = e("../internals/create-non-enumerable-property"), s = e("../internals/define-built-in"),
            a = e("../internals/define-global-property"), l = e("../internals/copy-constructor-properties"),
            c = e("../internals/is-forced");
        t.exports = function (e, t) {
            var n, u, d, f, p, h = e.target, y = e.global, m = e.stat;
            if (n = y ? r : m ? r[h] || a(h, {}) : (r[h] || {}).prototype) for (u in t) {
                if (f = t[u], d = e.dontCallGetSet ? (p = i(n, u)) && p.value : n[u], !c(y ? u : h + (m ? "." : "#") + u, e.forced) && void 0 !== d) {
                    if (typeof f == typeof d) continue;
                    l(f, d)
                }
                (e.sham || d && d.sham) && o(f, "sham", !0), s(n, u, f, e)
            }
        }
    }, {
        "../internals/copy-constructor-properties": 21,
        "../internals/create-non-enumerable-property": 24,
        "../internals/define-built-in": 27,
        "../internals/define-global-property": 29,
        "../internals/global": 55,
        "../internals/is-forced": 69,
        "../internals/object-get-own-property-descriptor": 84
    }],
    42: [function (e, t, n) {
        t.exports = function (e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    }, {}],
    43: [function (e, t, n) {
        "use strict";
        e("../modules/es.regexp.exec");
        var r = e("../internals/function-uncurry-this"), i = e("../internals/define-built-in"),
            o = e("../internals/regexp-exec"), s = e("../internals/fails"), a = e("../internals/well-known-symbol"),
            l = e("../internals/create-non-enumerable-property"), c = a("species"), u = RegExp.prototype;
        t.exports = function (e, t, n, d) {
            var f = a(e), p = !s((function () {
                var t = {};
                return t[f] = function () {
                    return 7
                }, 7 != ""[e](t)
            })), h = p && !s((function () {
                var t = !1, n = /a/;
                return "split" === e && ((n = {}).constructor = {}, n.constructor[c] = function () {
                    return n
                }, n.flags = "", n[f] = /./[f]), n.exec = function () {
                    return t = !0, null
                }, n[f](""), !t
            }));
            if (!p || !h || n) {
                var y = r(/./[f]), m = t(f, ""[e], (function (e, t, n, i, s) {
                    var a = r(e), l = t.exec;
                    return l === o || l === u.exec ? p && !s ? {done: !0, value: y(t, n, i)} : {
                        done: !0,
                        value: a(n, t, i)
                    } : {done: !1}
                }));
                i(String.prototype, e, m[0]), i(u, f, m[1])
            }
            d && l(u[f], "sham", !0)
        }
    }, {
        "../internals/create-non-enumerable-property": 24,
        "../internals/define-built-in": 27,
        "../internals/fails": 42,
        "../internals/function-uncurry-this": 49,
        "../internals/regexp-exec": 96,
        "../internals/well-known-symbol": 127,
        "../modules/es.regexp.exec": 129
    }],
    44: [function (e, t, n) {
        var r = e("../internals/function-bind-native"), i = Function.prototype, o = i.apply, s = i.call;
        t.exports = "object" == typeof Reflect && Reflect.apply || (r ? s.bind(o) : function () {
            return s.apply(o, arguments)
        })
    }, {"../internals/function-bind-native": 46}],
    45: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/a-callable"),
            o = e("../internals/function-bind-native"), s = r(r.bind);
        t.exports = function (e, t) {
            return i(e), void 0 === t ? e : o ? s(e, t) : function () {
                return e.apply(t, arguments)
            }
        }
    }, {
        "../internals/a-callable": 1,
        "../internals/function-bind-native": 46,
        "../internals/function-uncurry-this": 49
    }],
    46: [function (e, t, n) {
        var r = e("../internals/fails");
        t.exports = !r((function () {
            var e = function () {
            }.bind();
            return "function" != typeof e || e.hasOwnProperty("prototype")
        }))
    }, {"../internals/fails": 42}],
    47: [function (e, t, n) {
        var r = e("../internals/function-bind-native"), i = Function.prototype.call;
        t.exports = r ? i.bind(i) : function () {
            return i.apply(i, arguments)
        }
    }, {"../internals/function-bind-native": 46}],
    48: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/has-own-property"), o = Function.prototype,
            s = r && Object.getOwnPropertyDescriptor, a = i(o, "name"), l = a && "something" === function () {
            }.name, c = a && (!r || r && s(o, "name").configurable);
        t.exports = {EXISTS: a, PROPER: l, CONFIGURABLE: c}
    }, {"../internals/descriptors": 31, "../internals/has-own-property": 56}],
    49: [function (e, t, n) {
        var r = e("../internals/function-bind-native"), i = Function.prototype, o = i.bind, s = i.call,
            a = r && o.bind(s, s);
        t.exports = r ? function (e) {
            return e && a(e)
        } : function (e) {
            return e && function () {
                return s.apply(e, arguments)
            }
        }
    }, {"../internals/function-bind-native": 46}],
    50: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/is-callable"), o = function (e) {
            return i(e) ? e : void 0
        };
        t.exports = function (e, t) {
            return arguments.length < 2 ? o(r[e]) : r[e] && r[e][t]
        }
    }, {"../internals/global": 55, "../internals/is-callable": 67}],
    51: [function (e, t, n) {
        var r = e("../internals/classof"), i = e("../internals/get-method"), o = e("../internals/iterators"),
            s = e("../internals/well-known-symbol")("iterator");
        t.exports = function (e) {
            if (null != e) return i(e, s) || i(e, "@@iterator") || o[r(e)]
        }
    }, {
        "../internals/classof": 20,
        "../internals/get-method": 53,
        "../internals/iterators": 75,
        "../internals/well-known-symbol": 127
    }],
    52: [function (e, t, n) {
        var r = e("../internals/function-call"), i = e("../internals/a-callable"), o = e("../internals/an-object"),
            s = e("../internals/try-to-string"), a = e("../internals/get-iterator-method"), l = TypeError;
        t.exports = function (e, t) {
            var n = arguments.length < 2 ? a(e) : t;
            if (i(n)) return o(r(n, e));
            throw l(s(e) + " is not iterable")
        }
    }, {
        "../internals/a-callable": 1,
        "../internals/an-object": 7,
        "../internals/function-call": 47,
        "../internals/get-iterator-method": 51,
        "../internals/try-to-string": 120
    }],
    53: [function (e, t, n) {
        var r = e("../internals/a-callable");
        t.exports = function (e, t) {
            var n = e[t];
            return null == n ? void 0 : r(n)
        }
    }, {"../internals/a-callable": 1}],
    54: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/to-object"), o = Math.floor,
            s = r("".charAt), a = r("".replace), l = r("".slice), c = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
            u = /\$([$&'`]|\d{1,2})/g;
        t.exports = function (e, t, n, r, d, f) {
            var p = n + e.length, h = r.length, y = u;
            return void 0 !== d && (d = i(d), y = c), a(f, y, (function (i, a) {
                var c;
                switch (s(a, 0)) {
                    case"$":
                        return "$";
                    case"&":
                        return e;
                    case"`":
                        return l(t, 0, n);
                    case"'":
                        return l(t, p);
                    case"<":
                        c = d[l(a, 1, -1)];
                        break;
                    default:
                        var u = +a;
                        if (0 === u) return i;
                        if (u > h) {
                            var f = o(u / 10);
                            return 0 === f ? i : f <= h ? void 0 === r[f - 1] ? s(a, 1) : r[f - 1] + s(a, 1) : i
                        }
                        c = r[u - 1]
                }
                return void 0 === c ? "" : c
            }))
        }
    }, {"../internals/function-uncurry-this": 49, "../internals/to-object": 113}],
    55: [function (e, t, n) {
        (function (e) {
            (function () {
                var n = function (e) {
                    return e && e.Math == Math && e
                };
                t.exports = n("object" == typeof globalThis && globalThis) || n("object" == typeof window && window) || n("object" == typeof self && self) || n("object" == typeof e && e) || function () {
                    return this
                }() || Function("return this")()
            }).call(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    56: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/to-object"), o = r({}.hasOwnProperty);
        t.exports = Object.hasOwn || function (e, t) {
            return o(i(e), t)
        }
    }, {"../internals/function-uncurry-this": 49, "../internals/to-object": 113}],
    57: [function (e, t, n) {
        t.exports = {}
    }, {}],
    58: [function (e, t, n) {
        var r = e("../internals/get-built-in");
        t.exports = r("document", "documentElement")
    }, {"../internals/get-built-in": 50}],
    59: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/fails"),
            o = e("../internals/document-create-element");
        t.exports = !r && !i((function () {
            return 7 != Object.defineProperty(o("div"), "a", {
                get: function () {
                    return 7
                }
            }).a
        }))
    }, {"../internals/descriptors": 31, "../internals/document-create-element": 32, "../internals/fails": 42}],
    60: [function (e, t, n) {
        var r = Array, i = Math.abs, o = Math.pow, s = Math.floor, a = Math.log, l = Math.LN2;
        t.exports = {
            pack: function (e, t, n) {
                var c, u, d, f = r(n), p = 8 * n - t - 1, h = (1 << p) - 1, y = h >> 1,
                    m = 23 === t ? o(2, -24) - o(2, -77) : 0, v = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0, g = 0;
                for ((e = i(e)) != e || e === 1 / 0 ? (u = e != e ? 1 : 0, c = h) : (c = s(a(e) / l), e * (d = o(2, -c)) < 1 && (c--, d *= 2), (e += c + y >= 1 ? m / d : m * o(2, 1 - y)) * d >= 2 && (c++, d /= 2), c + y >= h ? (u = 0, c = h) : c + y >= 1 ? (u = (e * d - 1) * o(2, t), c += y) : (u = e * o(2, y - 1) * o(2, t), c = 0)); t >= 8;) f[g++] = 255 & u, u /= 256, t -= 8;
                for (c = c << t | u, p += t; p > 0;) f[g++] = 255 & c, c /= 256, p -= 8;
                return f[--g] |= 128 * v, f
            }, unpack: function (e, t) {
                var n, r = e.length, i = 8 * r - t - 1, s = (1 << i) - 1, a = s >> 1, l = i - 7, c = r - 1, u = e[c--],
                    d = 127 & u;
                for (u >>= 7; l > 0;) d = 256 * d + e[c--], l -= 8;
                for (n = d & (1 << -l) - 1, d >>= -l, l += t; l > 0;) n = 256 * n + e[c--], l -= 8;
                if (0 === d) d = 1 - a; else {
                    if (d === s) return n ? NaN : u ? -1 / 0 : 1 / 0;
                    n += o(2, t), d -= a
                }
                return (u ? -1 : 1) * n * o(2, d - t)
            }
        }
    }, {}],
    61: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/fails"), o = e("../internals/classof-raw"),
            s = Object, a = r("".split);
        t.exports = i((function () {
            return !s("z").propertyIsEnumerable(0)
        })) ? function (e) {
            return "String" == o(e) ? a(e, "") : s(e)
        } : s
    }, {"../internals/classof-raw": 19, "../internals/fails": 42, "../internals/function-uncurry-this": 49}],
    62: [function (e, t, n) {
        var r = e("../internals/is-callable"), i = e("../internals/is-object"),
            o = e("../internals/object-set-prototype-of");
        t.exports = function (e, t, n) {
            var s, a;
            return o && r(s = t.constructor) && s !== n && i(a = s.prototype) && a !== n.prototype && o(e, a), e
        }
    }, {"../internals/is-callable": 67, "../internals/is-object": 71, "../internals/object-set-prototype-of": 92}],
    63: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/is-callable"),
            o = e("../internals/shared-store"), s = r(Function.toString);
        i(o.inspectSource) || (o.inspectSource = function (e) {
            return s(e)
        }), t.exports = o.inspectSource
    }, {"../internals/function-uncurry-this": 49, "../internals/is-callable": 67, "../internals/shared-store": 105}],
    64: [function (e, t, n) {
        var r, i, o, s = e("../internals/native-weak-map"), a = e("../internals/global"),
            l = e("../internals/function-uncurry-this"), c = e("../internals/is-object"),
            u = e("../internals/create-non-enumerable-property"), d = e("../internals/has-own-property"),
            f = e("../internals/shared-store"), p = e("../internals/shared-key"), h = e("../internals/hidden-keys"),
            y = "Object already initialized", m = a.TypeError, v = a.WeakMap;
        if (s || f.state) {
            var g = f.state || (f.state = new v), b = l(g.get), w = l(g.has), _ = l(g.set);
            r = function (e, t) {
                if (w(g, e)) throw new m(y);
                return t.facade = e, _(g, e, t), t
            }, i = function (e) {
                return b(g, e) || {}
            }, o = function (e) {
                return w(g, e)
            }
        } else {
            var x = p("state");
            h[x] = !0, r = function (e, t) {
                if (d(e, x)) throw new m(y);
                return t.facade = e, u(e, x, t), t
            }, i = function (e) {
                return d(e, x) ? e[x] : {}
            }, o = function (e) {
                return d(e, x)
            }
        }
        t.exports = {
            set: r, get: i, has: o, enforce: function (e) {
                return o(e) ? i(e) : r(e, {})
            }, getterFor: function (e) {
                return function (t) {
                    var n;
                    if (!c(t) || (n = i(t)).type !== e) throw m("Incompatible receiver, " + e + " required");
                    return n
                }
            }
        }
    }, {
        "../internals/create-non-enumerable-property": 24,
        "../internals/function-uncurry-this": 49,
        "../internals/global": 55,
        "../internals/has-own-property": 56,
        "../internals/hidden-keys": 57,
        "../internals/is-object": 71,
        "../internals/native-weak-map": 80,
        "../internals/shared-key": 104,
        "../internals/shared-store": 105
    }],
    65: [function (e, t, n) {
        var r = e("../internals/well-known-symbol"), i = e("../internals/iterators"), o = r("iterator"),
            s = Array.prototype;
        t.exports = function (e) {
            return void 0 !== e && (i.Array === e || s[o] === e)
        }
    }, {"../internals/iterators": 75, "../internals/well-known-symbol": 127}],
    66: [function (e, t, n) {
        var r = e("../internals/classof-raw");
        t.exports = Array.isArray || function (e) {
            return "Array" == r(e)
        }
    }, {"../internals/classof-raw": 19}],
    67: [function (e, t, n) {
        t.exports = function (e) {
            return "function" == typeof e
        }
    }, {}],
    68: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/fails"), o = e("../internals/is-callable"),
            s = e("../internals/classof"), a = e("../internals/get-built-in"), l = e("../internals/inspect-source"),
            c = function () {
            }, u = [], d = a("Reflect", "construct"), f = /^\s*(?:class|function)\b/, p = r(f.exec), h = !f.exec(c),
            y = function (e) {
                if (!o(e)) return !1;
                try {
                    return d(c, u, e), !0
                } catch (e) {
                    return !1
                }
            }, m = function (e) {
                if (!o(e)) return !1;
                switch (s(e)) {
                    case"AsyncFunction":
                    case"GeneratorFunction":
                    case"AsyncGeneratorFunction":
                        return !1
                }
                try {
                    return h || !!p(f, l(e))
                } catch (e) {
                    return !0
                }
            };
        m.sham = !0, t.exports = !d || i((function () {
            var e;
            return y(y.call) || !y(Object) || !y((function () {
                e = !0
            })) || e
        })) ? m : y
    }, {
        "../internals/classof": 20,
        "../internals/fails": 42,
        "../internals/function-uncurry-this": 49,
        "../internals/get-built-in": 50,
        "../internals/inspect-source": 63,
        "../internals/is-callable": 67
    }],
    69: [function (e, t, n) {
        var r = e("../internals/fails"), i = e("../internals/is-callable"), o = /#|\.prototype\./, s = function (e, t) {
            var n = l[a(e)];
            return n == u || n != c && (i(t) ? r(t) : !!t)
        }, a = s.normalize = function (e) {
            return String(e).replace(o, ".").toLowerCase()
        }, l = s.data = {}, c = s.NATIVE = "N", u = s.POLYFILL = "P";
        t.exports = s
    }, {"../internals/fails": 42, "../internals/is-callable": 67}],
    70: [function (e, t, n) {
        var r = e("../internals/is-object"), i = Math.floor;
        t.exports = Number.isInteger || function (e) {
            return !r(e) && isFinite(e) && i(e) === e
        }
    }, {"../internals/is-object": 71}],
    71: [function (e, t, n) {
        var r = e("../internals/is-callable");
        t.exports = function (e) {
            return "object" == typeof e ? null !== e : r(e)
        }
    }, {"../internals/is-callable": 67}],
    72: [function (e, t, n) {
        t.exports = !1
    }, {}],
    73: [function (e, t, n) {
        var r = e("../internals/get-built-in"), i = e("../internals/is-callable"),
            o = e("../internals/object-is-prototype-of"), s = e("../internals/use-symbol-as-uid"), a = Object;
        t.exports = s ? function (e) {
            return "symbol" == typeof e
        } : function (e) {
            var t = r("Symbol");
            return i(t) && o(t.prototype, a(e))
        }
    }, {
        "../internals/get-built-in": 50,
        "../internals/is-callable": 67,
        "../internals/object-is-prototype-of": 88,
        "../internals/use-symbol-as-uid": 125
    }],
    74: [function (e, t, n) {
        "use strict";
        var r, i, o, s = e("../internals/fails"), a = e("../internals/is-callable"),
            l = e("../internals/object-create"), c = e("../internals/object-get-prototype-of"),
            u = e("../internals/define-built-in"), d = e("../internals/well-known-symbol"),
            f = e("../internals/is-pure"), p = d("iterator"), h = !1;
        [].keys && ("next" in (o = [].keys()) ? (i = c(c(o))) !== Object.prototype && (r = i) : h = !0), null == r || s((function () {
            var e = {};
            return r[p].call(e) !== e
        })) ? r = {} : f && (r = l(r)), a(r[p]) || u(r, p, (function () {
            return this
        })), t.exports = {IteratorPrototype: r, BUGGY_SAFARI_ITERATORS: h}
    }, {
        "../internals/define-built-in": 27,
        "../internals/fails": 42,
        "../internals/is-callable": 67,
        "../internals/is-pure": 72,
        "../internals/object-create": 81,
        "../internals/object-get-prototype-of": 87,
        "../internals/well-known-symbol": 127
    }],
    75: [function (e, t, n) {
        arguments[4][57][0].apply(n, arguments)
    }, {dup: 57}],
    76: [function (e, t, n) {
        var r = e("../internals/to-length");
        t.exports = function (e) {
            return r(e.length)
        }
    }, {"../internals/to-length": 112}],
    77: [function (e, t, n) {
        var r = e("../internals/fails"), i = e("../internals/is-callable"), o = e("../internals/has-own-property"),
            s = e("../internals/descriptors"), a = e("../internals/function-name").CONFIGURABLE,
            l = e("../internals/inspect-source"), c = e("../internals/internal-state"), u = c.enforce, d = c.get,
            f = Object.defineProperty, p = s && !r((function () {
                return 8 !== f((function () {
                }), "length", {value: 8}).length
            })), h = String(String).split("String"), y = t.exports = function (e, t, n) {
                "Symbol(" === String(t).slice(0, 7) && (t = "[" + String(t).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), n && n.getter && (t = "get " + t), n && n.setter && (t = "set " + t), (!o(e, "name") || a && e.name !== t) && (s ? f(e, "name", {
                    value: t,
                    configurable: !0
                }) : e.name = t), p && n && o(n, "arity") && e.length !== n.arity && f(e, "length", {value: n.arity});
                try {
                    n && o(n, "constructor") && n.constructor ? s && f(e, "prototype", {writable: !1}) : e.prototype && (e.prototype = void 0)
                } catch (e) {
                }
                var r = u(e);
                return o(r, "source") || (r.source = h.join("string" == typeof t ? t : "")), e
            };
        Function.prototype.toString = y((function () {
            return i(this) && d(this).source || l(this)
        }), "toString")
    }, {
        "../internals/descriptors": 31,
        "../internals/fails": 42,
        "../internals/function-name": 48,
        "../internals/has-own-property": 56,
        "../internals/inspect-source": 63,
        "../internals/internal-state": 64,
        "../internals/is-callable": 67
    }],
    78: [function (e, t, n) {
        var r = Math.ceil, i = Math.floor;
        t.exports = Math.trunc || function (e) {
            var t = +e;
            return (t > 0 ? i : r)(t)
        }
    }, {}],
    79: [function (e, t, n) {
        var r = e("../internals/engine-v8-version"), i = e("../internals/fails");
        t.exports = !!Object.getOwnPropertySymbols && !i((function () {
            var e = Symbol();
            return !String(e) || !(Object(e) instanceof Symbol) || !Symbol.sham && r && r < 41
        }))
    }, {"../internals/engine-v8-version": 38, "../internals/fails": 42}],
    80: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/is-callable"), o = e("../internals/inspect-source"),
            s = r.WeakMap;
        t.exports = i(s) && /native code/.test(o(s))
    }, {"../internals/global": 55, "../internals/inspect-source": 63, "../internals/is-callable": 67}],
    81: [function (e, t, n) {
        var r, i = e("../internals/an-object"), o = e("../internals/object-define-properties"),
            s = e("../internals/enum-bug-keys"), a = e("../internals/hidden-keys"), l = e("../internals/html"),
            c = e("../internals/document-create-element"), u = e("../internals/shared-key")("IE_PROTO"),
            d = function () {
            }, f = function (e) {
                return "<script>" + e + "<\/script>"
            }, p = function (e) {
                e.write(f("")), e.close();
                var t = e.parentWindow.Object;
                return e = null, t
            }, h = function () {
                try {
                    r = new ActiveXObject("htmlfile")
                } catch (e) {
                }
                var e, t;
                h = "undefined" != typeof document ? document.domain && r ? p(r) : ((t = c("iframe")).style.display = "none", l.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(f("document.F=Object")), e.close(), e.F) : p(r);
                for (var n = s.length; n--;) delete h.prototype[s[n]];
                return h()
            };
        a[u] = !0, t.exports = Object.create || function (e, t) {
            var n;
            return null !== e ? (d.prototype = i(e), n = new d, d.prototype = null, n[u] = e) : n = h(), void 0 === t ? n : o.f(n, t)
        }
    }, {
        "../internals/an-object": 7,
        "../internals/document-create-element": 32,
        "../internals/enum-bug-keys": 40,
        "../internals/hidden-keys": 57,
        "../internals/html": 58,
        "../internals/object-define-properties": 82,
        "../internals/shared-key": 104
    }],
    82: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/v8-prototype-define-bug"),
            o = e("../internals/object-define-property"), s = e("../internals/an-object"),
            a = e("../internals/to-indexed-object"), l = e("../internals/object-keys");
        n.f = r && !i ? Object.defineProperties : function (e, t) {
            s(e);
            for (var n, r = a(t), i = l(t), c = i.length, u = 0; c > u;) o.f(e, n = i[u++], r[n]);
            return e
        }
    }, {
        "../internals/an-object": 7,
        "../internals/descriptors": 31,
        "../internals/object-define-property": 83,
        "../internals/object-keys": 90,
        "../internals/to-indexed-object": 110,
        "../internals/v8-prototype-define-bug": 126
    }],
    83: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/ie8-dom-define"),
            o = e("../internals/v8-prototype-define-bug"), s = e("../internals/an-object"),
            a = e("../internals/to-property-key"), l = TypeError, c = Object.defineProperty,
            u = Object.getOwnPropertyDescriptor;
        n.f = r ? o ? function (e, t, n) {
            if (s(e), t = a(t), s(n), "function" == typeof e && "prototype" === t && "value" in n && "writable" in n && !n.writable) {
                var r = u(e, t);
                r && r.writable && (e[t] = n.value, n = {
                    configurable: "configurable" in n ? n.configurable : r.configurable,
                    enumerable: "enumerable" in n ? n.enumerable : r.enumerable,
                    writable: !1
                })
            }
            return c(e, t, n)
        } : c : function (e, t, n) {
            if (s(e), t = a(t), s(n), i) try {
                return c(e, t, n)
            } catch (e) {
            }
            if ("get" in n || "set" in n) throw l("Accessors not supported");
            return "value" in n && (e[t] = n.value), e
        }
    }, {
        "../internals/an-object": 7,
        "../internals/descriptors": 31,
        "../internals/ie8-dom-define": 59,
        "../internals/to-property-key": 117,
        "../internals/v8-prototype-define-bug": 126
    }],
    84: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/function-call"),
            o = e("../internals/object-property-is-enumerable"), s = e("../internals/create-property-descriptor"),
            a = e("../internals/to-indexed-object"), l = e("../internals/to-property-key"),
            c = e("../internals/has-own-property"), u = e("../internals/ie8-dom-define"),
            d = Object.getOwnPropertyDescriptor;
        n.f = r ? d : function (e, t) {
            if (e = a(e), t = l(t), u) try {
                return d(e, t)
            } catch (e) {
            }
            if (c(e, t)) return s(!i(o.f, e, t), e[t])
        }
    }, {
        "../internals/create-property-descriptor": 25,
        "../internals/descriptors": 31,
        "../internals/function-call": 47,
        "../internals/has-own-property": 56,
        "../internals/ie8-dom-define": 59,
        "../internals/object-property-is-enumerable": 91,
        "../internals/to-indexed-object": 110,
        "../internals/to-property-key": 117
    }],
    85: [function (e, t, n) {
        var r = e("../internals/object-keys-internal"),
            i = e("../internals/enum-bug-keys").concat("length", "prototype");
        n.f = Object.getOwnPropertyNames || function (e) {
            return r(e, i)
        }
    }, {"../internals/enum-bug-keys": 40, "../internals/object-keys-internal": 89}],
    86: [function (e, t, n) {
        n.f = Object.getOwnPropertySymbols
    }, {}],
    87: [function (e, t, n) {
        var r = e("../internals/has-own-property"), i = e("../internals/is-callable"), o = e("../internals/to-object"),
            s = e("../internals/shared-key"), a = e("../internals/correct-prototype-getter"), l = s("IE_PROTO"),
            c = Object, u = c.prototype;
        t.exports = a ? c.getPrototypeOf : function (e) {
            var t = o(e);
            if (r(t, l)) return t[l];
            var n = t.constructor;
            return i(n) && t instanceof n ? n.prototype : t instanceof c ? u : null
        }
    }, {
        "../internals/correct-prototype-getter": 22,
        "../internals/has-own-property": 56,
        "../internals/is-callable": 67,
        "../internals/shared-key": 104,
        "../internals/to-object": 113
    }],
    88: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this");
        t.exports = r({}.isPrototypeOf)
    }, {"../internals/function-uncurry-this": 49}],
    89: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/has-own-property"),
            o = e("../internals/to-indexed-object"), s = e("../internals/array-includes").indexOf,
            a = e("../internals/hidden-keys"), l = r([].push);
        t.exports = function (e, t) {
            var n, r = o(e), c = 0, u = [];
            for (n in r) !i(a, n) && i(r, n) && l(u, n);
            for (; t.length > c;) i(r, n = t[c++]) && (~s(u, n) || l(u, n));
            return u
        }
    }, {
        "../internals/array-includes": 12,
        "../internals/function-uncurry-this": 49,
        "../internals/has-own-property": 56,
        "../internals/hidden-keys": 57,
        "../internals/to-indexed-object": 110
    }],
    90: [function (e, t, n) {
        var r = e("../internals/object-keys-internal"), i = e("../internals/enum-bug-keys");
        t.exports = Object.keys || function (e) {
            return r(e, i)
        }
    }, {"../internals/enum-bug-keys": 40, "../internals/object-keys-internal": 89}],
    91: [function (e, t, n) {
        "use strict";
        var r = {}.propertyIsEnumerable, i = Object.getOwnPropertyDescriptor, o = i && !r.call({1: 2}, 1);
        n.f = o ? function (e) {
            var t = i(this, e);
            return !!t && t.enumerable
        } : r
    }, {}],
    92: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/an-object"),
            o = e("../internals/a-possible-prototype");
        t.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
            var e, t = !1, n = {};
            try {
                (e = r(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set))(n, []), t = n instanceof Array
            } catch (e) {
            }
            return function (n, r) {
                return i(n), o(r), t ? e(n, r) : n.__proto__ = r, n
            }
        }() : void 0)
    }, {"../internals/a-possible-prototype": 3, "../internals/an-object": 7, "../internals/function-uncurry-this": 49}],
    93: [function (e, t, n) {
        var r = e("../internals/function-call"), i = e("../internals/is-callable"), o = e("../internals/is-object"),
            s = TypeError;
        t.exports = function (e, t) {
            var n, a;
            if ("string" === t && i(n = e.toString) && !o(a = r(n, e))) return a;
            if (i(n = e.valueOf) && !o(a = r(n, e))) return a;
            if ("string" !== t && i(n = e.toString) && !o(a = r(n, e))) return a;
            throw s("Can't convert object to primitive value")
        }
    }, {"../internals/function-call": 47, "../internals/is-callable": 67, "../internals/is-object": 71}],
    94: [function (e, t, n) {
        var r = e("../internals/get-built-in"), i = e("../internals/function-uncurry-this"),
            o = e("../internals/object-get-own-property-names"), s = e("../internals/object-get-own-property-symbols"),
            a = e("../internals/an-object"), l = i([].concat);
        t.exports = r("Reflect", "ownKeys") || function (e) {
            var t = o.f(a(e)), n = s.f;
            return n ? l(t, n(e)) : t
        }
    }, {
        "../internals/an-object": 7,
        "../internals/function-uncurry-this": 49,
        "../internals/get-built-in": 50,
        "../internals/object-get-own-property-names": 85,
        "../internals/object-get-own-property-symbols": 86
    }],
    95: [function (e, t, n) {
        var r = e("../internals/function-call"), i = e("../internals/an-object"), o = e("../internals/is-callable"),
            s = e("../internals/classof-raw"), a = e("../internals/regexp-exec"), l = TypeError;
        t.exports = function (e, t) {
            var n = e.exec;
            if (o(n)) {
                var c = r(n, e, t);
                return null !== c && i(c), c
            }
            if ("RegExp" === s(e)) return r(a, e, t);
            throw l("RegExp#exec called on incompatible receiver")
        }
    }, {
        "../internals/an-object": 7,
        "../internals/classof-raw": 19,
        "../internals/function-call": 47,
        "../internals/is-callable": 67,
        "../internals/regexp-exec": 96
    }],
    96: [function (e, t, n) {
        "use strict";
        var r, i, o = e("../internals/function-call"), s = e("../internals/function-uncurry-this"),
            a = e("../internals/to-string"), l = e("../internals/regexp-flags"),
            c = e("../internals/regexp-sticky-helpers"), u = e("../internals/shared"),
            d = e("../internals/object-create"), f = e("../internals/internal-state").get,
            p = e("../internals/regexp-unsupported-dot-all"), h = e("../internals/regexp-unsupported-ncg"),
            y = u("native-string-replace", String.prototype.replace), m = RegExp.prototype.exec, v = m,
            g = s("".charAt), b = s("".indexOf), w = s("".replace), _ = s("".slice),
            x = (i = /b*/g, o(m, r = /a/, "a"), o(m, i, "a"), 0 !== r.lastIndex || 0 !== i.lastIndex),
            k = c.BROKEN_CARET, j = void 0 !== /()??/.exec("")[1];
        (x || j || k || p || h) && (v = function (e) {
            var t, n, r, i, s, c, u, p = this, h = f(p), C = a(e), E = h.raw;
            if (E) return E.lastIndex = p.lastIndex, t = o(v, E, C), p.lastIndex = E.lastIndex, t;
            var S = h.groups, D = k && p.sticky, O = o(l, p), P = p.source, B = 0, A = C;
            if (D && (O = w(O, "y", ""), -1 === b(O, "g") && (O += "g"), A = _(C, p.lastIndex), p.lastIndex > 0 && (!p.multiline || p.multiline && "\n" !== g(C, p.lastIndex - 1)) && (P = "(?: " + P + ")", A = " " + A, B++), n = new RegExp("^(?:" + P + ")", O)), j && (n = new RegExp("^" + P + "$(?!\\s)", O)), x && (r = p.lastIndex), i = o(m, D ? n : p, A), D ? i ? (i.input = _(i.input, B), i[0] = _(i[0], B), i.index = p.lastIndex, p.lastIndex += i[0].length) : p.lastIndex = 0 : x && i && (p.lastIndex = p.global ? i.index + i[0].length : r), j && i && i.length > 1 && o(y, i[0], n, (function () {
                for (s = 1; s < arguments.length - 2; s++) void 0 === arguments[s] && (i[s] = void 0)
            })), i && S) for (i.groups = c = d(null), s = 0; s < S.length; s++) c[(u = S[s])[0]] = i[u[1]];
            return i
        }), t.exports = v
    }, {
        "../internals/function-call": 47,
        "../internals/function-uncurry-this": 49,
        "../internals/internal-state": 64,
        "../internals/object-create": 81,
        "../internals/regexp-flags": 97,
        "../internals/regexp-sticky-helpers": 98,
        "../internals/regexp-unsupported-dot-all": 99,
        "../internals/regexp-unsupported-ncg": 100,
        "../internals/shared": 106,
        "../internals/to-string": 119
    }],
    97: [function (e, t, n) {
        "use strict";
        var r = e("../internals/an-object");
        t.exports = function () {
            var e = r(this), t = "";
            return e.hasIndices && (t += "d"), e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e.unicode && (t += "u"), e.unicodeSets && (t += "v"), e.sticky && (t += "y"), t
        }
    }, {"../internals/an-object": 7}],
    98: [function (e, t, n) {
        var r = e("../internals/fails"), i = e("../internals/global").RegExp, o = r((function () {
            var e = i("a", "y");
            return e.lastIndex = 2, null != e.exec("abcd")
        })), s = o || r((function () {
            return !i("a", "y").sticky
        })), a = o || r((function () {
            var e = i("^r", "gy");
            return e.lastIndex = 2, null != e.exec("str")
        }));
        t.exports = {BROKEN_CARET: a, MISSED_STICKY: s, UNSUPPORTED_Y: o}
    }, {"../internals/fails": 42, "../internals/global": 55}],
    99: [function (e, t, n) {
        var r = e("../internals/fails"), i = e("../internals/global").RegExp;
        t.exports = r((function () {
            var e = i(".", "s");
            return !(e.dotAll && e.exec("\n") && "s" === e.flags)
        }))
    }, {"../internals/fails": 42, "../internals/global": 55}],
    100: [function (e, t, n) {
        var r = e("../internals/fails"), i = e("../internals/global").RegExp;
        t.exports = r((function () {
            var e = i("(?<a>b)", "g");
            return "b" !== e.exec("b").groups.a || "bc" !== "b".replace(e, "$<a>c")
        }))
    }, {"../internals/fails": 42, "../internals/global": 55}],
    101: [function (e, t, n) {
        var r = TypeError;
        t.exports = function (e) {
            if (null == e) throw r("Can't call method on " + e);
            return e
        }
    }, {}],
    102: [function (e, t, n) {
        "use strict";
        var r = e("../internals/get-built-in"), i = e("../internals/object-define-property"),
            o = e("../internals/well-known-symbol"), s = e("../internals/descriptors"), a = o("species");
        t.exports = function (e) {
            var t = r(e), n = i.f;
            s && t && !t[a] && n(t, a, {
                configurable: !0, get: function () {
                    return this
                }
            })
        }
    }, {
        "../internals/descriptors": 31,
        "../internals/get-built-in": 50,
        "../internals/object-define-property": 83,
        "../internals/well-known-symbol": 127
    }],
    103: [function (e, t, n) {
        var r = e("../internals/object-define-property").f, i = e("../internals/has-own-property"),
            o = e("../internals/well-known-symbol")("toStringTag");
        t.exports = function (e, t, n) {
            e && !n && (e = e.prototype), e && !i(e, o) && r(e, o, {configurable: !0, value: t})
        }
    }, {
        "../internals/has-own-property": 56,
        "../internals/object-define-property": 83,
        "../internals/well-known-symbol": 127
    }],
    104: [function (e, t, n) {
        var r = e("../internals/shared"), i = e("../internals/uid"), o = r("keys");
        t.exports = function (e) {
            return o[e] || (o[e] = i(e))
        }
    }, {"../internals/shared": 106, "../internals/uid": 124}],
    105: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/define-global-property"), o = "__core-js_shared__",
            s = r[o] || i(o, {});
        t.exports = s
    }, {"../internals/define-global-property": 29, "../internals/global": 55}],
    106: [function (e, t, n) {
        var r = e("../internals/is-pure"), i = e("../internals/shared-store");
        (t.exports = function (e, t) {
            return i[e] || (i[e] = void 0 !== t ? t : {})
        })("versions", []).push({
            version: "3.23.4",
            mode: r ? "pure" : "global",
            copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
            license: "https://github.com/zloirock/core-js/blob/v3.23.4/LICENSE",
            source: "https://github.com/zloirock/core-js"
        })
    }, {"../internals/is-pure": 72, "../internals/shared-store": 105}],
    107: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/to-integer-or-infinity"),
            o = e("../internals/to-string"), s = e("../internals/require-object-coercible"), a = r("".charAt),
            l = r("".charCodeAt), c = r("".slice), u = function (e) {
                return function (t, n) {
                    var r, u, d = o(s(t)), f = i(n), p = d.length;
                    return f < 0 || f >= p ? e ? "" : void 0 : (r = l(d, f)) < 55296 || r > 56319 || f + 1 === p || (u = l(d, f + 1)) < 56320 || u > 57343 ? e ? a(d, f) : r : e ? c(d, f, f + 2) : u - 56320 + (r - 55296 << 10) + 65536
                }
            };
        t.exports = {codeAt: u(!1), charAt: u(!0)}
    }, {
        "../internals/function-uncurry-this": 49,
        "../internals/require-object-coercible": 101,
        "../internals/to-integer-or-infinity": 111,
        "../internals/to-string": 119
    }],
    108: [function (e, t, n) {
        var r = e("../internals/to-integer-or-infinity"), i = Math.max, o = Math.min;
        t.exports = function (e, t) {
            var n = r(e);
            return n < 0 ? i(n + t, 0) : o(n, t)
        }
    }, {"../internals/to-integer-or-infinity": 111}],
    109: [function (e, t, n) {
        var r = e("../internals/to-integer-or-infinity"), i = e("../internals/to-length"), o = RangeError;
        t.exports = function (e) {
            if (void 0 === e) return 0;
            var t = r(e), n = i(t);
            if (t !== n) throw o("Wrong length or index");
            return n
        }
    }, {"../internals/to-integer-or-infinity": 111, "../internals/to-length": 112}],
    110: [function (e, t, n) {
        var r = e("../internals/indexed-object"), i = e("../internals/require-object-coercible");
        t.exports = function (e) {
            return r(i(e))
        }
    }, {"../internals/indexed-object": 61, "../internals/require-object-coercible": 101}],
    111: [function (e, t, n) {
        var r = e("../internals/math-trunc");
        t.exports = function (e) {
            var t = +e;
            return t != t || 0 === t ? 0 : r(t)
        }
    }, {"../internals/math-trunc": 78}],
    112: [function (e, t, n) {
        var r = e("../internals/to-integer-or-infinity"), i = Math.min;
        t.exports = function (e) {
            return e > 0 ? i(r(e), 9007199254740991) : 0
        }
    }, {"../internals/to-integer-or-infinity": 111}],
    113: [function (e, t, n) {
        var r = e("../internals/require-object-coercible"), i = Object;
        t.exports = function (e) {
            return i(r(e))
        }
    }, {"../internals/require-object-coercible": 101}],
    114: [function (e, t, n) {
        var r = e("../internals/to-positive-integer"), i = RangeError;
        t.exports = function (e, t) {
            var n = r(e);
            if (n % t) throw i("Wrong offset");
            return n
        }
    }, {"../internals/to-positive-integer": 115}],
    115: [function (e, t, n) {
        var r = e("../internals/to-integer-or-infinity"), i = RangeError;
        t.exports = function (e) {
            var t = r(e);
            if (t < 0) throw i("The argument can't be less than 0");
            return t
        }
    }, {"../internals/to-integer-or-infinity": 111}],
    116: [function (e, t, n) {
        var r = e("../internals/function-call"), i = e("../internals/is-object"), o = e("../internals/is-symbol"),
            s = e("../internals/get-method"), a = e("../internals/ordinary-to-primitive"),
            l = e("../internals/well-known-symbol"), c = TypeError, u = l("toPrimitive");
        t.exports = function (e, t) {
            if (!i(e) || o(e)) return e;
            var n, l = s(e, u);
            if (l) {
                if (void 0 === t && (t = "default"), n = r(l, e, t), !i(n) || o(n)) return n;
                throw c("Can't convert object to primitive value")
            }
            return void 0 === t && (t = "number"), a(e, t)
        }
    }, {
        "../internals/function-call": 47,
        "../internals/get-method": 53,
        "../internals/is-object": 71,
        "../internals/is-symbol": 73,
        "../internals/ordinary-to-primitive": 93,
        "../internals/well-known-symbol": 127
    }],
    117: [function (e, t, n) {
        var r = e("../internals/to-primitive"), i = e("../internals/is-symbol");
        t.exports = function (e) {
            var t = r(e, "string");
            return i(t) ? t : t + ""
        }
    }, {"../internals/is-symbol": 73, "../internals/to-primitive": 116}],
    118: [function (e, t, n) {
        var r = {};
        r[e("../internals/well-known-symbol")("toStringTag")] = "z", t.exports = "[object z]" === String(r)
    }, {"../internals/well-known-symbol": 127}],
    119: [function (e, t, n) {
        var r = e("../internals/classof"), i = String;
        t.exports = function (e) {
            if ("Symbol" === r(e)) throw TypeError("Cannot convert a Symbol value to a string");
            return i(e)
        }
    }, {"../internals/classof": 20}],
    120: [function (e, t, n) {
        var r = String;
        t.exports = function (e) {
            try {
                return r(e)
            } catch (e) {
                return "Object"
            }
        }
    }, {}],
    121: [function (e, t, n) {
        "use strict";
        var r = e("../internals/export"), i = e("../internals/global"), o = e("../internals/function-call"),
            s = e("../internals/descriptors"), a = e("../internals/typed-array-constructors-require-wrappers"),
            l = e("../internals/array-buffer-view-core"), c = e("../internals/array-buffer"),
            u = e("../internals/an-instance"), d = e("../internals/create-property-descriptor"),
            f = e("../internals/create-non-enumerable-property"), p = e("../internals/is-integral-number"),
            h = e("../internals/to-length"), y = e("../internals/to-index"), m = e("../internals/to-offset"),
            v = e("../internals/to-property-key"), g = e("../internals/has-own-property"),
            b = e("../internals/classof"), w = e("../internals/is-object"), _ = e("../internals/is-symbol"),
            x = e("../internals/object-create"), k = e("../internals/object-is-prototype-of"),
            j = e("../internals/object-set-prototype-of"), C = e("../internals/object-get-own-property-names").f,
            E = e("../internals/typed-array-from"), S = e("../internals/array-iteration").forEach,
            D = e("../internals/set-species"), O = e("../internals/object-define-property"),
            P = e("../internals/object-get-own-property-descriptor"), B = e("../internals/internal-state"),
            A = e("../internals/inherit-if-required"), M = B.get, I = B.set, T = B.enforce, L = O.f, K = P.f,
            R = Math.round, N = i.RangeError, F = c.ArrayBuffer, z = F.prototype, U = c.DataView,
            H = l.NATIVE_ARRAY_BUFFER_VIEWS, V = l.TYPED_ARRAY_TAG, W = l.TypedArray, q = l.TypedArrayPrototype,
            G = l.aTypedArrayConstructor, Y = l.isTypedArray, X = "BYTES_PER_ELEMENT", $ = "Wrong length",
            J = function (e, t) {
                G(e);
                for (var n = 0, r = t.length, i = new e(r); r > n;) i[n] = t[n++];
                return i
            }, Q = function (e, t) {
                L(e, t, {
                    get: function () {
                        return M(this)[t]
                    }
                })
            }, Z = function (e) {
                var t;
                return k(z, e) || "ArrayBuffer" == (t = b(e)) || "SharedArrayBuffer" == t
            }, ee = function (e, t) {
                return Y(e) && !_(t) && t in e && p(+t) && t >= 0
            }, te = function (e, t) {
                return t = v(t), ee(e, t) ? d(2, e[t]) : K(e, t)
            }, ne = function (e, t, n) {
                return t = v(t), !(ee(e, t) && w(n) && g(n, "value")) || g(n, "get") || g(n, "set") || n.configurable || g(n, "writable") && !n.writable || g(n, "enumerable") && !n.enumerable ? L(e, t, n) : (e[t] = n.value, e)
            };
        s ? (H || (P.f = te, O.f = ne, Q(q, "buffer"), Q(q, "byteOffset"), Q(q, "byteLength"), Q(q, "length")), r({
            target: "Object",
            stat: !0,
            forced: !H
        }, {getOwnPropertyDescriptor: te, defineProperty: ne}), t.exports = function (e, t, n) {
            var s = e.match(/\d+$/)[0] / 8, l = e + (n ? "Clamped" : "") + "Array", c = "get" + e, d = "set" + e,
                p = i[l], v = p, g = v && v.prototype, b = {}, _ = function (e, t) {
                    L(e, t, {
                        get: function () {
                            return function (e, t) {
                                var n = M(e);
                                return n.view[c](t * s + n.byteOffset, !0)
                            }(this, t)
                        }, set: function (e) {
                            return function (e, t, r) {
                                var i = M(e);
                                n && (r = (r = R(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r), i.view[d](t * s + i.byteOffset, r, !0)
                            }(this, t, e)
                        }, enumerable: !0
                    })
                };
            H ? a && (v = t((function (e, t, n, r) {
                return u(e, g), A(w(t) ? Z(t) ? void 0 !== r ? new p(t, m(n, s), r) : void 0 !== n ? new p(t, m(n, s)) : new p(t) : Y(t) ? J(v, t) : o(E, v, t) : new p(y(t)), e, v)
            })), j && j(v, W), S(C(p), (function (e) {
                e in v || f(v, e, p[e])
            })), v.prototype = g) : (v = t((function (e, t, n, r) {
                u(e, g);
                var i, a, l, c = 0, d = 0;
                if (w(t)) {
                    if (!Z(t)) return Y(t) ? J(v, t) : o(E, v, t);
                    i = t, d = m(n, s);
                    var f = t.byteLength;
                    if (void 0 === r) {
                        if (f % s) throw N($);
                        if ((a = f - d) < 0) throw N($)
                    } else if ((a = h(r) * s) + d > f) throw N($);
                    l = a / s
                } else l = y(t), i = new F(a = l * s);
                for (I(e, {buffer: i, byteOffset: d, byteLength: a, length: l, view: new U(i)}); c < l;) _(e, c++)
            })), j && j(v, W), g = v.prototype = x(q)), g.constructor !== v && f(g, "constructor", v), T(g).TypedArrayConstructor = v, V && f(g, V, l);
            var k = v != p;
            b[l] = v, r({
                global: !0,
                constructor: !0,
                forced: k,
                sham: !H
            }, b), X in v || f(v, X, s), X in g || f(g, X, s), D(l)
        }) : t.exports = function () {
        }
    }, {
        "../internals/an-instance": 6,
        "../internals/array-buffer": 10,
        "../internals/array-buffer-view-core": 9,
        "../internals/array-iteration": 13,
        "../internals/classof": 20,
        "../internals/create-non-enumerable-property": 24,
        "../internals/create-property-descriptor": 25,
        "../internals/descriptors": 31,
        "../internals/export": 41,
        "../internals/function-call": 47,
        "../internals/global": 55,
        "../internals/has-own-property": 56,
        "../internals/inherit-if-required": 62,
        "../internals/internal-state": 64,
        "../internals/is-integral-number": 70,
        "../internals/is-object": 71,
        "../internals/is-symbol": 73,
        "../internals/object-create": 81,
        "../internals/object-define-property": 83,
        "../internals/object-get-own-property-descriptor": 84,
        "../internals/object-get-own-property-names": 85,
        "../internals/object-is-prototype-of": 88,
        "../internals/object-set-prototype-of": 92,
        "../internals/set-species": 102,
        "../internals/to-index": 109,
        "../internals/to-length": 112,
        "../internals/to-offset": 114,
        "../internals/to-property-key": 117,
        "../internals/typed-array-constructors-require-wrappers": 122,
        "../internals/typed-array-from": 123
    }],
    122: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/fails"),
            o = e("../internals/check-correctness-of-iteration"),
            s = e("../internals/array-buffer-view-core").NATIVE_ARRAY_BUFFER_VIEWS, a = r.ArrayBuffer, l = r.Int8Array;
        t.exports = !s || !i((function () {
            l(1)
        })) || !i((function () {
            new l(-1)
        })) || !o((function (e) {
            new l, new l(null), new l(1.5), new l(e)
        }), !0) || i((function () {
            return 1 !== new l(new a(2), 1, void 0).length
        }))
    }, {
        "../internals/array-buffer-view-core": 9,
        "../internals/check-correctness-of-iteration": 18,
        "../internals/fails": 42,
        "../internals/global": 55
    }],
    123: [function (e, t, n) {
        var r = e("../internals/function-bind-context"), i = e("../internals/function-call"),
            o = e("../internals/a-constructor"), s = e("../internals/to-object"),
            a = e("../internals/length-of-array-like"), l = e("../internals/get-iterator"),
            c = e("../internals/get-iterator-method"), u = e("../internals/is-array-iterator-method"),
            d = e("../internals/array-buffer-view-core").aTypedArrayConstructor;
        t.exports = function (e) {
            var t, n, f, p, h, y, m = o(this), v = s(e), g = arguments.length, b = g > 1 ? arguments[1] : void 0,
                w = void 0 !== b, _ = c(v);
            if (_ && !u(_)) for (y = (h = l(v, _)).next, v = []; !(p = i(y, h)).done;) v.push(p.value);
            for (w && g > 2 && (b = r(b, arguments[2])), n = a(v), f = new (d(m))(n), t = 0; n > t; t++) f[t] = w ? b(v[t], t) : v[t];
            return f
        }
    }, {
        "../internals/a-constructor": 2,
        "../internals/array-buffer-view-core": 9,
        "../internals/function-bind-context": 45,
        "../internals/function-call": 47,
        "../internals/get-iterator": 52,
        "../internals/get-iterator-method": 51,
        "../internals/is-array-iterator-method": 65,
        "../internals/length-of-array-like": 76,
        "../internals/to-object": 113
    }],
    124: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = 0, o = Math.random(), s = r(1..toString);
        t.exports = function (e) {
            return "Symbol(" + (void 0 === e ? "" : e) + ")_" + s(++i + o, 36)
        }
    }, {"../internals/function-uncurry-this": 49}],
    125: [function (e, t, n) {
        var r = e("../internals/native-symbol");
        t.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator
    }, {"../internals/native-symbol": 79}],
    126: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/fails");
        t.exports = r && i((function () {
            return 42 != Object.defineProperty((function () {
            }), "prototype", {value: 42, writable: !1}).prototype
        }))
    }, {"../internals/descriptors": 31, "../internals/fails": 42}],
    127: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/shared"), o = e("../internals/has-own-property"),
            s = e("../internals/uid"), a = e("../internals/native-symbol"), l = e("../internals/use-symbol-as-uid"),
            c = i("wks"), u = r.Symbol, d = u && u.for, f = l ? u : u && u.withoutSetter || s;
        t.exports = function (e) {
            if (!o(c, e) || !a && "string" != typeof c[e]) {
                var t = "Symbol." + e;
                a && o(u, e) ? c[e] = u[e] : c[e] = l && d ? d(t) : f(t)
            }
            return c[e]
        }
    }, {
        "../internals/global": 55,
        "../internals/has-own-property": 56,
        "../internals/native-symbol": 79,
        "../internals/shared": 106,
        "../internals/uid": 124,
        "../internals/use-symbol-as-uid": 125
    }],
    128: [function (e, t, n) {
        "use strict";
        var r = e("../internals/to-indexed-object"), i = e("../internals/add-to-unscopables"),
            o = e("../internals/iterators"), s = e("../internals/internal-state"),
            a = e("../internals/object-define-property").f, l = e("../internals/define-iterator"),
            c = e("../internals/is-pure"), u = e("../internals/descriptors"), d = "Array Iterator", f = s.set,
            p = s.getterFor(d);
        t.exports = l(Array, "Array", (function (e, t) {
            f(this, {type: d, target: r(e), index: 0, kind: t})
        }), (function () {
            var e = p(this), t = e.target, n = e.kind, r = e.index++;
            return !t || r >= t.length ? (e.target = void 0, {value: void 0, done: !0}) : "keys" == n ? {
                value: r,
                done: !1
            } : "values" == n ? {value: t[r], done: !1} : {value: [r, t[r]], done: !1}
        }), "values");
        var h = o.Arguments = o.Array;
        if (i("keys"), i("values"), i("entries"), !c && u && "values" !== h.name) try {
            a(h, "name", {value: "values"})
        } catch (e) {
        }
    }, {
        "../internals/add-to-unscopables": 4,
        "../internals/define-iterator": 30,
        "../internals/descriptors": 31,
        "../internals/internal-state": 64,
        "../internals/is-pure": 72,
        "../internals/iterators": 75,
        "../internals/object-define-property": 83,
        "../internals/to-indexed-object": 110
    }],
    129: [function (e, t, n) {
        "use strict";
        var r = e("../internals/export"), i = e("../internals/regexp-exec");
        r({target: "RegExp", proto: !0, forced: /./.exec !== i}, {exec: i})
    }, {"../internals/export": 41, "../internals/regexp-exec": 96}],
    130: [function (e, t, n) {
        "use strict";
        var r = e("../internals/function-apply"), i = e("../internals/function-call"),
            o = e("../internals/function-uncurry-this"), s = e("../internals/fix-regexp-well-known-symbol-logic"),
            a = e("../internals/fails"), l = e("../internals/an-object"), c = e("../internals/is-callable"),
            u = e("../internals/to-integer-or-infinity"), d = e("../internals/to-length"),
            f = e("../internals/to-string"), p = e("../internals/require-object-coercible"),
            h = e("../internals/advance-string-index"), y = e("../internals/get-method"),
            m = e("../internals/get-substitution"), v = e("../internals/regexp-exec-abstract"),
            g = e("../internals/well-known-symbol")("replace"), b = Math.max, w = Math.min, _ = o([].concat),
            x = o([].push), k = o("".indexOf), j = o("".slice), C = "$0" === "a".replace(/./, "$0"),
            E = !!/./[g] && "" === /./[g]("a", "$0");
        s("replace", (function (e, t, n) {
            var o = E ? "$" : "$0";
            return [function (e, n) {
                var r = p(this), o = null == e ? void 0 : y(e, g);
                return o ? i(o, e, r, n) : i(t, f(r), e, n)
            }, function (e, i) {
                var s = l(this), a = f(e);
                if ("string" == typeof i && -1 === k(i, o) && -1 === k(i, "$<")) {
                    var p = n(t, s, a, i);
                    if (p.done) return p.value
                }
                var y = c(i);
                y || (i = f(i));
                var g = s.global;
                if (g) {
                    var C = s.unicode;
                    s.lastIndex = 0
                }
                for (var E = []; ;) {
                    var S = v(s, a);
                    if (null === S) break;
                    if (x(E, S), !g) break;
                    "" === f(S[0]) && (s.lastIndex = h(a, d(s.lastIndex), C))
                }
                for (var D, O = "", P = 0, B = 0; B < E.length; B++) {
                    for (var A = f((S = E[B])[0]), M = b(w(u(S.index), a.length), 0), I = [], T = 1; T < S.length; T++) x(I, void 0 === (D = S[T]) ? D : String(D));
                    var L = S.groups;
                    if (y) {
                        var K = _([A], I, M, a);
                        void 0 !== L && x(K, L);
                        var R = f(r(i, void 0, K))
                    } else R = m(A, a, M, I, L, i);
                    M >= P && (O += j(a, P, M) + R, P = M + A.length)
                }
                return O + j(a, P)
            }]
        }), !!a((function () {
            var e = /./;
            return e.exec = function () {
                var e = [];
                return e.groups = {a: "7"}, e
            }, "7" !== "".replace(e, "$<a>")
        })) || !C || E)
    }, {
        "../internals/advance-string-index": 5,
        "../internals/an-object": 7,
        "../internals/fails": 42,
        "../internals/fix-regexp-well-known-symbol-logic": 43,
        "../internals/function-apply": 44,
        "../internals/function-call": 47,
        "../internals/function-uncurry-this": 49,
        "../internals/get-method": 53,
        "../internals/get-substitution": 54,
        "../internals/is-callable": 67,
        "../internals/regexp-exec-abstract": 95,
        "../internals/require-object-coercible": 101,
        "../internals/to-integer-or-infinity": 111,
        "../internals/to-length": 112,
        "../internals/to-string": 119,
        "../internals/well-known-symbol": 127
    }],
    131: [function (e, t, n) {
        e("../internals/typed-array-constructor")("Float32", (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }))
    }, {"../internals/typed-array-constructor": 121}],
    132: [function (e, t, n) {
        "use strict";
        var r = e("../internals/array-buffer-view-core"),
            i = e("../internals/typed-array-constructors-require-wrappers"), o = r.aTypedArrayConstructor;
        (0, r.exportTypedArrayStaticMethod)("of", (function () {
            for (var e = 0, t = arguments.length, n = new (o(this))(t); t > e;) n[e] = arguments[e++];
            return n
        }), i)
    }, {"../internals/array-buffer-view-core": 9, "../internals/typed-array-constructors-require-wrappers": 122}],
    133: [function (e, t, n) {
        "use strict";
        var r = e("../internals/global"), i = e("../internals/function-call"),
            o = e("../internals/array-buffer-view-core"), s = e("../internals/length-of-array-like"),
            a = e("../internals/to-offset"), l = e("../internals/to-object"), c = e("../internals/fails"),
            u = r.RangeError, d = r.Int8Array, f = d && d.prototype, p = f && f.set, h = o.aTypedArray,
            y = o.exportTypedArrayMethod, m = !c((function () {
                var e = new Uint8ClampedArray(2);
                return i(p, e, {length: 1, 0: 3}, 1), 3 !== e[1]
            })), v = m && o.NATIVE_ARRAY_BUFFER_VIEWS && c((function () {
                var e = new d(2);
                return e.set(1), e.set("2", 1), 0 !== e[0] || 2 !== e[1]
            }));
        y("set", (function (e) {
            h(this);
            var t = a(arguments.length > 1 ? arguments[1] : void 0, 1), n = l(e);
            if (m) return i(p, this, n, t);
            var r = this.length, o = s(n), c = 0;
            if (o + t > r) throw u("Wrong length");
            for (; c < o;) this[t + c] = n[c++]
        }), !m || v)
    }, {
        "../internals/array-buffer-view-core": 9,
        "../internals/fails": 42,
        "../internals/function-call": 47,
        "../internals/global": 55,
        "../internals/length-of-array-like": 76,
        "../internals/to-object": 113,
        "../internals/to-offset": 114
    }],
    134: [function (e, t, n) {
        "use strict";
        var r = e("../internals/global"), i = e("../internals/function-uncurry-this"), o = e("../internals/fails"),
            s = e("../internals/a-callable"), a = e("../internals/array-sort"),
            l = e("../internals/array-buffer-view-core"), c = e("../internals/engine-ff-version"),
            u = e("../internals/engine-is-ie-or-edge"), d = e("../internals/engine-v8-version"),
            f = e("../internals/engine-webkit-version"), p = l.aTypedArray, h = l.exportTypedArrayMethod,
            y = r.Uint16Array, m = y && i(y.prototype.sort), v = !(!m || o((function () {
                m(new y(2), null)
            })) && o((function () {
                m(new y(2), {})
            }))), g = !!m && !o((function () {
                if (d) return d < 74;
                if (c) return c < 67;
                if (u) return !0;
                if (f) return f < 602;
                var e, t, n = new y(516), r = Array(516);
                for (e = 0; e < 516; e++) t = e % 4, n[e] = 515 - e, r[e] = e - 2 * t + 3;
                for (m(n, (function (e, t) {
                    return (e / 4 | 0) - (t / 4 | 0)
                })), e = 0; e < 516; e++) if (n[e] !== r[e]) return !0
            }));
        h("sort", (function (e) {
            return void 0 !== e && s(e), g ? m(this, e) : a(p(this), function (e) {
                return function (t, n) {
                    return void 0 !== e ? +e(t, n) || 0 : n != n ? -1 : t != t ? 1 : 0 === t && 0 === n ? 1 / t > 0 && 1 / n < 0 ? 1 : -1 : t > n
                }
            }(e))
        }), !g || v)
    }, {
        "../internals/a-callable": 1,
        "../internals/array-buffer-view-core": 9,
        "../internals/array-sort": 15,
        "../internals/engine-ff-version": 35,
        "../internals/engine-is-ie-or-edge": 36,
        "../internals/engine-v8-version": 38,
        "../internals/engine-webkit-version": 39,
        "../internals/fails": 42,
        "../internals/function-uncurry-this": 49,
        "../internals/global": 55
    }],
    135: [function (e, t, n) {
        e("../internals/typed-array-constructor")("Uint8", (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }))
    }, {"../internals/typed-array-constructor": 121}],
    136: [function (e, t, n) {
        e("../internals/typed-array-constructor")("Uint8", (function (e) {
            return function (t, n, r) {
                return e(this, t, n, r)
            }
        }), !0)
    }, {"../internals/typed-array-constructor": 121}],
    137: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/dom-iterables"),
            o = e("../internals/dom-token-list-prototype"), s = e("../modules/es.array.iterator"),
            a = e("../internals/create-non-enumerable-property"), l = e("../internals/well-known-symbol"),
            c = l("iterator"), u = l("toStringTag"), d = s.values, f = function (e, t) {
                if (e) {
                    if (e[c] !== d) try {
                        a(e, c, d)
                    } catch (t) {
                        e[c] = d
                    }
                    if (e[u] || a(e, u, t), i[t]) for (var n in s) if (e[n] !== s[n]) try {
                        a(e, n, s[n])
                    } catch (t) {
                        e[n] = s[n]
                    }
                }
            };
        for (var p in i) f(r[p] && r[p].prototype, p);
        f(o, "DOMTokenList")
    }, {
        "../internals/create-non-enumerable-property": 24,
        "../internals/dom-iterables": 33,
        "../internals/dom-token-list-prototype": 34,
        "../internals/global": 55,
        "../internals/well-known-symbol": 127,
        "../modules/es.array.iterator": 128
    }],
    138: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.Build = void 0, n.Build = {
            version: "0.73.8 (e9fa466fc3c6e8f31a7c83d97c78518a)",
            buildSeed: 1665757807348,
            "wdosbox.wasm": {size: 1462485, gzSize: 499437},
            "wdosbox.js": {size: 124967, gzSize: 32625},
            "wlibzip.wasm": {size: 110726, gzSize: 51367},
            "wlibzip.js": {size: 77090, gzSize: 19985}
        }
    }, {}],
    139: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        e("core-js/modules/web.dom-collections.iterator.js"), e("core-js/modules/es.typed-array.uint8-array.js"), e("core-js/modules/es.typed-array.set.js"), e("core-js/modules/es.typed-array.sort.js");
        Object.defineProperty(n, "__esModule", {value: !0});
        const i = e("./dos-conf"), o = function (e) {
            return e && e.__esModule ? e : {default: e}
        }(e("../../libzip/libzip")), s = e("../../http");
        n.default = class {
            constructor(e) {
                r(this, "config", void 0), r(this, "sources", void 0), r(this, "libzipWasm", void 0), this.config = (0, i.createDosConfig)(), this.sources = [], this.libzipWasm = e
            }

            autoexec() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return this.config.autoexec.options.script.value = t.join("\n"), this
            }

            cycles(e) {
                return this.config.cpu.options.cycles.value = e, this
            }

            extract(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/",
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "zip";
                return this.extractAll([{url: e, path: t, type: n}])
            }

            extractAll(e) {
                return this.sources.push(...e), this
            }

            async toUint8Array() {
                let e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                const t = {};
                await this.libzipWasm.instantiate(t);
                const n = new o.default(t, "/home/web_user"), r = await (0, i.toDosboxConf)(this.config), l = [];
                for (const e of this.sources) {
                    if ("zip" !== e.type) throw new Error("Only Zip is supported");
                    const t = (0, s.httpRequest)(e.url, {responseType: "arraybuffer"}).then((t => ({
                        source: e,
                        data: new Uint8Array(t)
                    })));
                    l.push(t)
                }
                e || (await n.writeFile(".jsdos/dosbox.conf", r), await n.writeFile(".jsdos/readme.txt", a), await n.writeFile(".jsdos/jsdos.json", JSON.stringify(this.config, null, 2)));
                const c = await Promise.all(l);
                for (const e of c) n.zipToFs(e.data, e.source.path);
                e && (await n.writeFile(".jsdos/dosbox.conf", r), await n.writeFile(".jsdos/readme.txt", a), await n.writeFile(".jsdos/jsdos.json", JSON.stringify(this.config, null, 2)));
                const u = await n.zipFromFs();
                return n.destroy(), u
            }
        };
        const a = "\nPlease visit our website:\n\n        _                __\n       (_)____      ____/ /___  _____ _________  ____ ___\n      / / ___/_____/ __  / __ \\/ ___// ___/ __ \\/ __ `__ \\\n     / (__  )_____/ /_/ / /_/ (__  )/ /__/ /_/ / / / / / /\n  __/ /____/      \\__,_/\\____/____(_)___/\\____/_/ /_/ /_/\n /___/\n"
    }, {
        "../../http": 144,
        "../../libzip/libzip": 149,
        "./dos-conf": 140,
        "core-js/modules/es.typed-array.set.js": 133,
        "core-js/modules/es.typed-array.sort.js": 134,
        "core-js/modules/es.typed-array.uint8-array.js": 135,
        "core-js/modules/web.dom-collections.iterator.js": 137
    }],
    140: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.toDosboxConf = n.createDosConfig = n.AutoexecCategory = n.MixerCategory = n.CpuCategory = n.DosboxCategory = n.OutputCategory = void 0;

        class i {
            constructor() {
                r(this, "name", "sdl"), r(this, "description", "This section contains all of the low level system settings for how DOSBox interacts with your real hardware. You can define what resolutions are emulated, how DOSBox should treat errors or listen to your keyboard and mouse. You can often achieve a fair level of optimization by working with these setting, though for the most part leaving them at their default settings will create the best experience. These settings are passed on to the SDL Library which handles low level things like input and thread priority."), r(this, "options", {
                    autolock: {
                        name: "autolock",
                        description: "Mouse will automatically lock, if you click on the screen.",
                        value: !1,
                        allowedValues: [!0, !1]
                    }
                })
            }
        }

        n.OutputCategory = i;

        class o {
            constructor() {
                r(this, "name", "dosbox"), r(this, "description", "The [dosbox] section contains various settings that do not pertain to any other section (e.g. setting the language used in DOSBox help texts, where to store screen captures, etc.)"), r(this, "options", {
                    machine: {
                        name: "machine",
                        description: "The type of machine tries to emulate.",
                        value: "svga_s3",
                        allowedValues: ["hercules", "cga", "tandy", "pcjr", "ega", "vgaonly", "svga_s3", "svga_et3000", "svga_et4000", "svga_paradise", "vesa_nolfb", "vesa_oldvbe"]
                    }
                })
            }
        }

        n.DosboxCategory = o;

        class s {
            constructor() {
                r(this, "name", "cpu"), r(this, "description", "The CPU section controls how DOSBox tries to emulate the CPU, how fast the emulation should be, and to adjust it. DOSBox offers 4 different methods of CPU emulation."), r(this, "options", {
                    core: {
                        name: "core",
                        description: "CPU Core used in emulation. auto will switch to dynamic if available and appropriate.",
                        value: "auto",
                        allowedValues: ["auto", "normal", "simple"]
                    },
                    cputype: {
                        name: "cputype",
                        description: "CPU Type used in emulation. auto is the fastest choice.",
                        value: "auto",
                        allowedValues: ["auto", "386", "386_slow", "486_slow", "pentium_slow", "386_prefetch"]
                    },
                    cycles: {
                        name: "cycles",
                        description: "Amount of instructions DOSBox tries to emulate each millisecond. Setting this value too high results in sound dropouts and lags.\nCycles can be set in 3 ways:\n'auto'          tries to guess what a game needs.\n                It usually works, but can fail for certain games.\n'fixed #number' will set a fixed amount of cycles. This is what you usually need if 'auto' fails.\n                (Example: fixed 4000).\n'max'           will allocate as much cycles as your computer is able to handle.\n",
                        value: "auto",
                        allowedValues: ["auto", "fixed", "max"]
                    }
                })
            }
        }

        n.CpuCategory = s;

        class a {
            constructor() {
                r(this, "name", "mixer"), r(this, "description", "Here you can define the quality of emulated audio."), r(this, "options", {
                    rate: {
                        name: "rate",
                        description: "Frequency rate of sound",
                        value: 44100,
                        allowedValues: []
                    },
                    nosound: {
                        name: "nosound",
                        description: "Enable silent mode, sound is still emulated though.",
                        value: !1,
                        allowedValues: [!0, !1]
                    }
                })
            }
        }

        n.MixerCategory = a;

        class l {
            constructor() {
                r(this, "name", "autoexec"), r(this, "description", "Lines in this section will be run at startup"), r(this, "options", {
                    script: {
                        name: "lines",
                        description: "Use \\n to separate lines",
                        value: "",
                        allowedValues: []
                    }
                })
            }
        }

        function c() {
            return {output: new i, dosbox: new o, cpu: new s, mixer: new a, autoexec: new l}
        }

        function u(e, t) {
            const n = "sdl" === t.name ? "output" : t.name;
            return new Promise(((r, i) => {
                if (e) if (e.name === t.name) {
                    for (const r of Object.keys(e.options)) {
                        const o = e.options[r], s = t.options[r];
                        if (void 0 === s) return void i(new Error("Unknown option '" + (o.name || r) + "' in '" + e.name + "'"));
                        if (s.allowedValues.length > 0) {
                            const t = o.value, a = s.allowedValues.find((e => e === t));
                            if ("cpu" === n && "cycles" === o.name && (t + "").startsWith("fixed ")) {
                                const e = Number.parseInt(t.substr("fixed ".length), 10);
                                if (isNaN(e)) return void i(new Error("Fixed value should conatain number"))
                            } else if (void 0 === a) return void i(new Error("Incorrect value '" + t + "' (" + typeof t + ") for '" + e.name + "." + (o.name || r) + "' allowed is " + JSON.stringify(s.allowedValues)))
                        }
                    }
                    for (const r of Object.keys(t.options)) if (!(r in e.options)) return void i(new Error("Option '" + r + "' is missed in '" + n + "'"));
                    r()
                } else i(new Error("Incorrect category name '" + e.name + "' should be '" + t.name + "'")); else i(new Error("Category '" + n + "' is missed"))
            }))
        }

        async function d(e, t) {
            if (void 0 !== e) for (const n of Object.keys(e.options || {})) {
                const r = e.options[n];
                if ("string" == typeof r || "number" == typeof r || Array.isArray(r)) {
                    const i = t.options[n];
                    if (!i) continue;
                    const o = r;
                    e.options[n] = {...i}, e.options[n].value = o
                }
            }
        }

        function f(e) {
            let t = "";
            t += "[".concat(e.name, "]\n");
            for (const n of Object.keys(e.options).sort()) {
                const r = e.options[n];
                t += "".concat(r.name, "=").concat(r.value, "\n")
            }
            return t
        }

        n.AutoexecCategory = l, n.createDosConfig = c, n.toDosboxConf = async function (e) {
            await async function (e) {
                const t = c();
                for (const n of Object.keys(t)) await d(e[n], t[n])
            }(e), await async function (e) {
                const t = c();
                for (const n of Object.keys(t)) await u(e[n], t[n])
            }(e);
            const t = f(e.output) + "\nfullscreen=false\nfulldouble=false\nfullresolution=original\nwindowresolution=original\noutput=surface\nsensitivity=100\nwaitonerror=true\npriority=higher,normal\nmapperfile=mapper-jsdos.map\nusescancodes=true\nvsync=false\n" + f(e.dosbox) + "\nlanguage=\ncaptures=capture\nmemsize=16\n" + f(e.cpu) + "\ncycleup=10\ncycledown=20\n" + f(e.mixer) + "\nblocksize=1024\nprebuffer=20\n\n[render]\n# frameskip: How many frames DOSBox skips before drawing one.\n#    aspect: Do aspect correction, if your output method doesn't support scaling this can slow things down!.\n#    scaler: Scaler used to enlarge/enhance low resolution modes.\n#              If 'forced' is appended, then the scaler will be used even if the result might not be desired.\n#            Possible values: none, normal2x, normal3x, advmame2x, advmame3x, advinterp2x, advinterp3x, hq2x, hq3x, 2xsai, super2xsai, supereagle, tv2x, tv3x, rgb2x, rgb3x, scan2x, scan3x.\n\nframeskip=0\naspect=false\nscaler=none\n\n[midi]\n#     mpu401: Type of MPU-401 to emulate.\n#             Possible values: intelligent, uart, none.\n# mididevice: Device that will receive the MIDI data from MPU-401.\n#             Possible values: default, win32, alsa, oss, coreaudio, coremidi, none.\n# midiconfig: Special configuration options for the device driver. This is usually the id of the device you want to use.\n#               See the README/Manual for more details.\n\nmpu401=intelligent\nmididevice=default\nmidiconfig=\n\n[sblaster]\n#  sbtype: Type of Soundblaster to emulate. gb is Gameblaster.\n#          Possible values: sb1, sb2, sbpro1, sbpro2, sb16, gb, none.\n#  sbbase: The IO address of the soundblaster.\n#          Possible values: 220, 240, 260, 280, 2a0, 2c0, 2e0, 300.\n#     irq: The IRQ number of the soundblaster.\n#          Possible values: 7, 5, 3, 9, 10, 11, 12.\n#     dma: The DMA number of the soundblaster.\n#          Possible values: 1, 5, 0, 3, 6, 7.\n#    hdma: The High DMA number of the soundblaster.\n#          Possible values: 1, 5, 0, 3, 6, 7.\n# sbmixer: Allow the soundblaster mixer to modify the DOSBox mixer.\n# oplmode: Type of OPL emulation. On 'auto' the mode is determined by sblaster type. All OPL modes are Adlib-compatible, except for 'cms'.\n#          Possible values: auto, cms, opl2, dualopl2, opl3, none.\n#  oplemu: Provider for the OPL emulation. compat might provide better quality (see oplrate as well).\n#          Possible values: default, compat, fast.\n# oplrate: Sample rate of OPL music emulation. Use 49716 for highest quality (set the mixer rate accordingly).\n#          Possible values: 44100, 49716, 48000, 32000, 22050, 16000, 11025, 8000.\n\nsbtype=sb16\nsbbase=220\nirq=7\ndma=1\nhdma=5\nsbmixer=true\noplmode=auto\noplemu=default\noplrate=44100\n\n[gus]\n#      gus: Enable the Gravis Ultrasound emulation.\n#  gusrate: Sample rate of Ultrasound emulation.\n#           Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#  gusbase: The IO base address of the Gravis Ultrasound.\n#           Possible values: 240, 220, 260, 280, 2a0, 2c0, 2e0, 300.\n#   gusirq: The IRQ number of the Gravis Ultrasound.\n#           Possible values: 5, 3, 7, 9, 10, 11, 12.\n#   gusdma: The DMA channel of the Gravis Ultrasound.\n#           Possible values: 3, 0, 1, 5, 6, 7.\n# ultradir: Path to Ultrasound directory. In this directory\n#           there should be a MIDI directory that contains\n#           the patch files for GUS playback. Patch sets used\n#           with Timidity should work fine.\n\ngus=false\ngusrate=44100\ngusbase=240\ngusirq=5\ngusdma=3\nultradir=C:\\ULTRASND\n\n[speaker]\n# pcspeaker: Enable PC-Speaker emulation.\n#    pcrate: Sample rate of the PC-Speaker sound generation.\n#            Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#     tandy: Enable Tandy Sound System emulation. For 'auto', emulation is present only if machine is set to 'tandy'.\n#            Possible values: auto, on, off.\n# tandyrate: Sample rate of the Tandy 3-Voice generation.\n#            Possible values: 44100, 48000, 32000, 22050, 16000, 11025, 8000, 49716.\n#    disney: Enable Disney Sound Source emulation. (Covox Voice Master and Speech Thing compatible).\n\npcspeaker=true\npcrate=44100\ntandy=auto\ntandyrate=44100\ndisney=true\n\n[joystick]\n# joysticktype: Type of joystick to emulate: auto (default), none,\n#               2axis (supports two joysticks),\n#               4axis (supports one joystick, first joystick used),\n#               4axis_2 (supports one joystick, second joystick used),\n#               fcs (Thrustmaster), ch (CH Flightstick).\n#               none disables joystick emulation.\n#               auto chooses emulation depending on real joystick(s).\n#               (Remember to reset dosbox's mapperfile if you saved it earlier)\n#               Possible values: auto, 2axis, 4axis, 4axis_2, fcs, ch, none.\n#        timed: enable timed intervals for axis. Experiment with this option, if your joystick drifts (away).\n#     autofire: continuously fires as long as you keep the button pressed.\n#       swap34: swap the 3rd and the 4th axis. can be useful for certain joysticks.\n#   buttonwrap: enable button wrapping at the number of emulated buttons.\n\njoysticktype=auto\ntimed=true\nautofire=false\nswap34=false\nbuttonwrap=false\n\n[serial]\n# serial1: set type of device connected to com port.\n#          Can be disabled, dummy, modem, nullmodem, directserial.\n#          Additional parameters must be in the same line in the form of\n#          parameter:value. Parameter for all types is irq (optional).\n#          for directserial: realport (required), rxdelay (optional).\n#                           (realport:COM1 realport:ttyS0).\n#          for modem: listenport (optional).\n#          for nullmodem: server, rxdelay, txdelay, telnet, usedtr,\n#                         transparent, port, inhsocket (all optional).\n#          Example: serial1=modem listenport:5000\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial2: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial3: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n# serial4: see serial1\n#          Possible values: dummy, disabled, modem, nullmodem, directserial.\n\nserial1=dummy\nserial2=dummy\nserial3=disabled\nserial4=disabled\n\n[dos]\n#            xms: Enable XMS support.\n#            ems: Enable EMS support.\n#            umb: Enable UMB support.\n# keyboardlayout: Language code of the keyboard layout (or none).\n\nxms=true\nems=true\numb=true\nkeyboardlayout=auto\n\n[ipx]\n# ipx: Enable ipx over UDP/IP emulation.\n\nipx=true\n" + (n = e.autoexec, "[autoexec]\necho off\nmount c .\nc:\n\ntype jsdos~1/readme.txt\necho on\n\n".concat(n.options.script.value, "\n\n# Generated using https://js-dos.com\n# █▀▀▀▀▀█ █  ▄▄▄▀▀█ █▀▀▀▀▀█\n# █ ███ █ ██▄ █ ▀ ▄ █ ███ █\n# █ ▀▀▀ █ ▄██ ▀ ▀▀█ █ ▀▀▀ █\n# ▀▀▀▀▀▀▀ ▀ █▄▀▄▀ █ ▀▀▀▀▀▀▀\n# █▀▄▄█▀▀▄▄ ▀ ▀█▄▄▄▄ ▀▄█▀█▀\n# █▀ ▀ ▀▀▄ █▀ ▄ ▄▀▀▀▄ █▀█▄\n# ▄ ▄▄ █▀▀▄ ▄▀▄▀▀█  ▀▀▄▀▀█▀\n#   ▄▀▀█▀▀ █▀█▀█▀▀▄ ▀██▀█▄\n# ▀▀▀ ▀ ▀ █▄█ ▀█▄▄█▀▀▀█▀▀\n# █▀▀▀▀▀█ ▄▄▄ ▄ ▄ █ ▀ █▄▄▄▄\n# █ ███ █ ▀█▀▀▄▀▀▄████▀▀█▄█\n# █ ▀▀▀ █ ▄▀▀█▀█▀▄ ▀▀▄▄█▄█\n# ▀▀▀▀▀▀▀ ▀   ▀▀ ▀  ▀   ▀▀▀\n"));
            var n;
            return Promise.resolve(t)
        }
    }, {"core-js/modules/web.dom-collections.iterator.js": 137}],
    141: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.dosDirect = void 0;
        const r = e("../../../protocol/messages-queue");
        n.dosDirect = async function (e, t) {
            const n = new r.MessagesQueue;
            let i = n.handler.bind(n);
            const o = {
                postMessage: (e, t) => {
                    i(e, t)
                }
            }, s = e => {
                const n = e.data;
                "ws-sync-sleep" === (null == n ? void 0 : n.name) && n.props.sessionId === t && postMessage({
                    name: "wc-sync-sleep",
                    props: n.props
                }, "*")
            }, a = {
                sessionId: t, sendMessageToServer: (e, t) => {
                    o.messageHandler({data: {name: e, props: t}})
                }, initMessageHandler: e => {
                    i = e, n.sendTo(i)
                }, exit: () => {
                    "undefined" != typeof window && window.removeEventListener("message", s)
                }
            };
            return a.module = o, "undefined" != typeof window && window.addEventListener("message", s, {passive: !0}), await e.instantiate(o), o.callMain([t]), a
        }
    }, {"../../../protocol/messages-queue": 150}],
    142: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.dosWorker = void 0;
        const r = e("../../../protocol/messages-queue");
        n.dosWorker = async function (e, t, n) {
            const i = new r.MessagesQueue;
            let o = i.handler.bind(i);
            const s = new Worker(e);
            s.onerror = e => {
                o("ws-err", {type: e.type, filename: e.filename, message: e.message})
            }, s.onmessage = e => {
                const t = e.data;
                void 0 !== (null == t ? void 0 : t.name) && o(t.name, t.props)
            }, await t.instantiate({});
            const a = {
                sessionId: n, sendMessageToServer: (e, t) => {
                    s.postMessage({name: e, props: t})
                }, initMessageHandler: e => {
                    o = e, i.sendTo(o)
                }, exit: () => {
                    s.terminate()
                }
            };
            try {
                a.sendMessageToServer("wc-install", {module: t.wasmModule, sessionId: n})
            } catch (e) {
                a.sendMessageToServer("wc-install", {sessionId: n})
            }
            return a
        }
    }, {"../../../protocol/messages-queue": 150}],
    143: [function (e, t, n) {
        (function (t) {
            (function () {
                "use strict";
                Object.defineProperty(n, "__esModule", {value: !0}), n.NetworkType = void 0;
                const r = function (e) {
                    return e && e.__esModule ? e : {default: e}
                }(e("./impl/emulators-impl"));
                !function (e) {
                    e[e.NETWORK_DOSBOX_IPX = 0] = "NETWORK_DOSBOX_IPX"
                }(n.NetworkType || (n.NetworkType = {})), "undefined" != typeof window && (window.emulators = r.default), void 0 !== t && (t.emulators = r.default)
            }).call(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {"./impl/emulators-impl": 146}],
    144: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.httpRequest = void 0, n.httpRequest = function (e, t) {
            return new Promise(((n, r) => {
                new i(e, {
                    ...t, success: n, fail: e => {
                        r(new Error(e))
                    }
                })
            }))
        };

        class i {
            constructor(e, t) {
                if (r(this, "resource", void 0), r(this, "options", void 0), r(this, "xhr", null), r(this, "total", 0), r(this, "loaded", 0), this.resource = e, this.options = t, this.options.method = t.method || "GET", "GET" !== this.options.method) throw new Error("Method " + this.options.method + " is not supported");
                this.makeHttpRequest()
            }

            makeHttpRequest() {
                let e, t;
                this.xhr = new XMLHttpRequest, this.xhr.open(this.options.method || "GET", this.resource, !0), "POST" === this.options.method && this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), this.xhr.overrideMimeType("text/plain; charset=x-user-defined"), "function" == typeof (e = this.xhr).addEventListener && e.addEventListener("progress", (e => {
                    if (this.total = e.total, this.loaded = e.loaded, this.options.progress) return this.options.progress(e.total, e.loaded)
                })), "function" == typeof (t = this.xhr).addEventListener && t.addEventListener("error", (() => {
                    if (this.options.fail) return this.options.fail("Unalbe to download '" + this.resource + "', code: " + this.xhr.status), delete this.options.fail
                })), this.xhr.onreadystatechange = () => this.onReadyStateChange(), this.options.responseType && (this.xhr.responseType = this.options.responseType), this.xhr.send(this.options.data)
            }

            onReadyStateChange() {
                const e = this.xhr;
                if (4 === e.readyState) if (200 === e.status) {
                    if (this.options.success) {
                        const t = Math.max(this.total, this.loaded);
                        return void 0 !== this.options.progress && this.options.progress(t, t), this.options.success(e.response)
                    }
                } else if (this.options.fail) return this.options.fail("Unable to download '" + this.resource + "', code: " + e.status), delete this.options.fail
            }
        }
    }, {}],
    145: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.CommandInterfaceEventsImpl = void 0, n.CommandInterfaceEventsImpl = class {
            constructor() {
                var e = this;
                r(this, "onStdoutConsumers", []), r(this, "delayedStdout", []), r(this, "onFrameSizeConsumers", []), r(this, "onFrameConsumers", []), r(this, "onSoundPushConsumers", []), r(this, "onExitConsumers", []), r(this, "onMessageConsumers", []), r(this, "delayedMessages", []), r(this, "onNetworkConnectedConsumers", []), r(this, "onNetworkDisconnectedConsumers", []), r(this, "onStdout", (e => {
                    if (this.onStdoutConsumers.push(e), 1 === this.onStdoutConsumers.length) {
                        for (const e of this.delayedStdout) this.fireStdout(e);
                        this.delayedStdout = []
                    }
                })), r(this, "onFrameSize", (e => {
                    this.onFrameSizeConsumers.push(e)
                })), r(this, "onFrame", (e => {
                    this.onFrameConsumers.push(e)
                })), r(this, "onSoundPush", (e => {
                    this.onSoundPushConsumers.push(e)
                })), r(this, "onExit", (e => {
                    this.onExitConsumers.push(e)
                })), r(this, "onMessage", (e => {
                    if (this.onMessageConsumers.push(e), 1 === this.onMessageConsumers.length) {
                        for (const t of this.delayedMessages) e(t.msgType, ...t.args);
                        this.delayedMessages = []
                    }
                })), r(this, "fireStdout", (e => {
                    if (0 !== this.onStdoutConsumers.length) for (const t of this.onStdoutConsumers) t(e); else this.delayedStdout.push(e)
                })), r(this, "fireFrameSize", ((e, t) => {
                    for (const n of this.onFrameSizeConsumers) n(e, t)
                })), r(this, "fireFrame", ((e, t) => {
                    for (const n of this.onFrameConsumers) n(e, t)
                })), r(this, "fireSoundPush", (e => {
                    for (const t of this.onSoundPushConsumers) t(e)
                })), r(this, "fireExit", (() => {
                    for (const e of this.onExitConsumers) e();
                    this.onStdoutConsumers = [], this.onFrameSizeConsumers = [], this.onFrameConsumers = [], this.onSoundPushConsumers = [], this.onExitConsumers = [], this.onMessageConsumers = []
                })), r(this, "fireMessage", (function (t) {
                    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
                    if (0 !== e.onMessageConsumers.length) for (const n of e.onMessageConsumers) n(t, ...r); else e.delayedMessages.push({
                        msgType: t,
                        args: r
                    })
                })), r(this, "fireNetworkConnected", ((e, t, n) => {
                    for (const r of this.onNetworkConnectedConsumers) r(e, t, n)
                })), r(this, "fireNetworkDisconnected", (e => {
                    for (const t of this.onNetworkDisconnectedConsumers) t(e)
                }))
            }

            onNetworkConnected(e) {
                this.onNetworkConnectedConsumers.push(e)
            }

            onNetworkDisconnected(e) {
                this.onNetworkDisconnectedConsumers.push(e)
            }
        }
    }, {"core-js/modules/web.dom-collections.iterator.js": 137}],
    146: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        var i = function (e) {
            return e && e.__esModule ? e : {default: e}
        };
        Object.defineProperty(n, "__esModule", {value: !0});
        const o = e("../build"), s = e("./modules"), a = i(e("../dos/bundle/dos-bundle")),
            l = e("../dos/dosbox/ts/direct"), c = e("../dos/dosbox/ts/worker"), u = i(e("../janus/janus-impl")),
            d = e("../protocol/protocol"), f = new class {
                constructor() {
                    r(this, "pathPrefix", ""), r(this, "version", o.Build.version), r(this, "wdosboxJs", "wdosbox.js"), r(this, "wasmModulesPromise", void 0)
                }

                async dosBundle() {
                    const e = await this.wasmModules(), t = await e.libzip();
                    return new a.default(t)
                }

                async dosboxNode(e, t) {
                    return this.dosboxDirect(e, t)
                }

                async dosboxDirect(e, t) {
                    const n = await this.wasmModules(), r = await n.dosbox(),
                        i = await (0, l.dosDirect)(r, "session-" + Date.now());
                    return this.backend(e, i, t)
                }

                async dosboxWorker(e, t) {
                    const n = await this.wasmModules(), r = await n.dosbox(),
                        i = await (0, c.dosWorker)(this.pathPrefix + this.wdosboxJs, r, "session-" + Date.now());
                    return this.backend(e, i, t)
                }

                async janus(e) {
                    return (0, u.default)(e)
                }

                async backend(e, t, n) {
                    return new Promise(((r, i) => {
                        const o = new d.CommandInterfaceOverTransportLayer(Array.isArray(e) ? e : [e], t, (e => {
                            null !== e ? i(e) : setTimeout((() => r(o)), 4)
                        }), n || {})
                    }))
                }

                wasmModules() {
                    return void 0 !== this.wasmModulesPromise || (this.wasmModulesPromise = (async () => new s.WasmModulesImpl(this.pathPrefix, this.wdosboxJs))()), this.wasmModulesPromise
                }

                async dosDirect(e) {
                    return this.dosboxDirect(e)
                }

                async dosWorker(e) {
                    return this.dosboxWorker(e)
                }
            };
        n.default = f
    }, {
        "../build": 138,
        "../dos/bundle/dos-bundle": 139,
        "../dos/dosbox/ts/direct": 141,
        "../dos/dosbox/ts/worker": 142,
        "../janus/janus-impl": 148,
        "../protocol/protocol": 151,
        "./modules": 147
    }],
    147: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        e("core-js/modules/es.typed-array.of.js"), e("core-js/modules/es.typed-array.uint8-array.js"), e("core-js/modules/es.typed-array.set.js"), e("core-js/modules/es.typed-array.sort.js"), e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.loadWasmModule = n.WasmModulesImpl = n.host = void 0;
        const i = e("../http");

        function o(t, r, o) {
            return "undefined" == typeof XMLHttpRequest ? function (t, r, i) {
                if (void 0 !== n.host.globals.compiled[r]) return n.host.globals.compiled[r];
                const o = e(t), a = Promise.resolve(new s(o));
                return r && (n.host.globals.compiled[r] = a), a
            }(t, r) : function (e, t, r) {
                if (void 0 !== n.host.globals.compiled[t]) return n.host.globals.compiled[t];
                const o = async function () {
                    const o = e.lastIndexOf("/"), s = e.indexOf("w", o), l = s === o + 1 && s >= 0;
                    if (!n.host.wasmSupported || !l) throw new Error("Starting from js-dos 6.22.60 js environment is not supported");
                    const c = e.substr(0, e.lastIndexOf(".js")) + ".wasm", u = (0, i.httpRequest)(c, {
                        responseType: "arraybuffer", progress: (t, n) => {
                            r("Resolving DosBox (" + e + ")", t, n)
                        }
                    }), d = (0, i.httpRequest)(e, {
                        progress: (e, t) => {
                            r("Resolving DosBox", e, t)
                        }
                    }), [f, p] = await Promise.all([u, d]), h = await WebAssembly.compile(f);
                    return eval.call(window, p), new a(h, n.host.globals.exports[t], ((e, t) => {
                        e.env = e.env || {}, WebAssembly.instantiate(h, e).then((e => t(e, h)))
                    }))
                }();
                return t && (n.host.globals.compiled[t] = o), o
            }(t, r, o)
        }

        n.host = new class {
            constructor() {
                if (r(this, "wasmSupported", !1), r(this, "globals", void 0), this.globals = "undefined" == typeof window ? {} : window, this.globals.exports || (this.globals.exports = {}), this.globals.compiled || (this.globals.compiled = {}), "object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate && "function" == typeof WebAssembly.compile) {
                    const e = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
                    e instanceof WebAssembly.Module && (this.wasmSupported = new WebAssembly.Instance(e) instanceof WebAssembly.Instance)
                }
                Math.imul && -5 === Math.imul(4294967295, 5) || (Math.imul = function (e, t) {
                    const n = 65535 & e, r = 65535 & t;
                    return n * r + ((e >>> 16) * r + n * (t >>> 16) << 16) | 0
                }), Math.imul = Math.imul, Math.fround || (Math.fround = function (e) {
                    return e
                }), Math.fround = Math.fround, Math.clz32 || (Math.clz32 = function (e) {
                    e >>>= 0;
                    for (let t = 0; t < 32; t++) if (e & 1 << 31 - t) return t;
                    return 32
                }), Math.clz32 = Math.clz32, Math.trunc || (Math.trunc = function (e) {
                    return e < 0 ? Math.ceil(e) : Math.floor(e)
                }), Math.trunc = Math.trunc
            }
        }, n.WasmModulesImpl = class {
            constructor(e, t) {
                r(this, "pathPrefix", void 0), r(this, "wdosboxJs", void 0), r(this, "libzipPromise", void 0), r(this, "dosboxPromise", void 0), r(this, "wasmSupported", !1), e.length > 0 && "/" !== e[e.length - 1] && (e += "/"), this.pathPrefix = e, this.wdosboxJs = t
            }

            libzip() {
                return void 0 !== this.libzipPromise || (this.libzipPromise = this.loadModule(this.pathPrefix + "wlibzip.js", "WLIBZIP")), this.libzipPromise
            }

            dosbox() {
                return void 0 !== this.dosboxPromise || (this.dosboxPromise = this.loadModule(this.pathPrefix + this.wdosboxJs, "WDOSBOX")), this.dosboxPromise
            }

            loadModule(e, t) {
                return o(e, t, (() => {
                }))
            }
        }, n.loadWasmModule = o;

        class s {
            constructor(e) {
                r(this, "emModule", void 0), this.emModule = e
            }

            instantiate(e) {
                return new Promise((t => {
                    e.onRuntimeInitialized = () => {
                        t()
                    }, new this.emModule(e)
                }))
            }
        }

        class a {
            constructor(e, t, n) {
                r(this, "wasmModule", void 0), r(this, "module", void 0), r(this, "instantiateWasm", void 0), this.wasmModule = e, this.module = t, this.instantiateWasm = n
            }

            instantiate(e) {
                return new Promise((t => {
                    e.instantiateWasm = this.instantiateWasm, e.onRuntimeInitialized = () => {
                        t()
                    }, new this.module(e)
                }))
            }
        }
    }, {
        "../http": 144,
        "core-js/modules/es.typed-array.of.js": 132,
        "core-js/modules/es.typed-array.set.js": 133,
        "core-js/modules/es.typed-array.sort.js": 134,
        "core-js/modules/es.typed-array.uint8-array.js": 135,
        "core-js/modules/web.dom-collections.iterator.js": 137
    }],
    148: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        e("core-js/modules/web.dom-collections.iterator.js"), e("core-js/modules/es.typed-array.uint8-array.js"), e("core-js/modules/es.typed-array.set.js"), e("core-js/modules/es.typed-array.sort.js"), Object.defineProperty(n, "__esModule", {value: !0});
        const i = e("../impl/ci-impl");

        function o(e, t) {
            let n = "";
            const r = i => {
                const o = i.indexOf("\n");
                if (-1 === o) n += i; else {
                    const s = n + i.substr(0, o);
                    n = "";
                    try {
                        e(function (e) {
                            const t = atob(e), n = new Uint8Array(t.length);
                            for (let e = 0; e < n.length; e++) n[e] = t.charCodeAt(e);
                            return (new TextDecoder).decode(n)
                        }(s))
                    } catch (e) {
                        t(e)
                    }
                    r(i.substr(o + 1))
                }
            };
            return r
        }

        class s {
            constructor(e, t) {
                r(this, "live", !0), r(this, "startedAt", Date.now()), r(this, "janus", void 0), r(this, "eventsImpl", void 0), r(this, "exitPromise", void 0), r(this, "exitResolveFn", (() => {
                })), r(this, "configPromise", void 0), r(this, "configResolveFn", (() => {
                })), r(this, "opaqueId", void 0), r(this, "handle", void 0), r(this, "handlePromise", void 0), r(this, "handleResolveFn", (() => {
                })), r(this, "keyMatrix", {}), r(this, "frameWidth", 0), r(this, "frameHeight", 0), r(this, "eventQueue", ""), r(this, "eventIntervalId", -1), r(this, "rttIntervalId", -1), r(this, "logIntervalId", -1), r(this, "logColor", "not set"), r(this, "logWhiteMs", 0), r(this, "logRedMs", 0), r(this, "logYellowMs", 0), r(this, "onDataMessage", (e => {
                    if (e.startsWith("config=")) this.configResolveFn(JSON.parse(e.substr("config=".length))); else if (e.startsWith("frame=")) {
                        const [t, n] = e.substr("frame=".length).split("x");
                        this.frameWidth = Number.parseInt(t, 10) || 0, this.frameHeight = Number.parseInt(n, 10) || 0
                    } else if (e.startsWith("rtt=")) {
                        var t;
                        const [n, r, i] = e.substr("rtt=".length).split(" "), o = Number.parseInt(r, 10),
                            s = Number.parseInt(i, 10), a = Date.now(),
                            l = (null === (t = this.handle) || void 0 === t ? void 0 : t.getBitrate()) || "0 kbits/sec",
                            c = Number.parseInt(l.split(" ")[0], 10);
                        this.sendPipeMessage("rtt-data", Date.now(), o, s, a, c), n === this.opaqueId && this.eventsImpl.fireStdout("rtt-data=" + (a - o) + " " + c)
                    } else if (e.startsWith("log-visual-")) switch (e) {
                        case"log-visual-white":
                            this.eventsImpl.fireStdout("yellow-frame:" + (Date.now() - this.logYellowMs));
                            break;
                        case"log-visual-red":
                            this.eventsImpl.fireStdout("white-frame:" + (Date.now() - this.logWhiteMs));
                            break;
                        case"log-visual-yellow":
                            this.eventsImpl.fireStdout("red-frame:" + (Date.now() - this.logRedMs))
                    } else if (e.startsWith("log-command-")) switch (e) {
                        case"log-command-white":
                            this.eventsImpl.fireStdout("yellow-pipe:" + (Date.now() - this.logYellowMs));
                            break;
                        case"log-command-red":
                            this.eventsImpl.fireStdout("white-pipe:" + (Date.now() - this.logWhiteMs));
                            break;
                        case"log-command-yellow":
                            this.eventsImpl.fireStdout("red-pipe:" + (Date.now() - this.logRedMs))
                    } else this.eventsImpl.fireStdout(e)
                })), r(this, "onJanusMessage", ((e, t, n) => {
                    null != n && e.createAnswer({
                        jsep: n,
                        media: {audioSend: !1, videoSend: !1, data: !0},
                        success: t => {
                            this.fireMessage("started"), e.send({message: {request: "start"}, jsep: t})
                        },
                        error: this.onError
                    })
                })), r(this, "onError", (e => {
                    this.fireMessage("error", e)
                })), this.eventsImpl = new i.CommandInterfaceEventsImpl, this.janus = e, this.opaqueId = t, this.exitPromise = new Promise((e => {
                    this.exitResolveFn = e
                })), this.configPromise = new Promise((e => {
                    this.configResolveFn = e
                })), this.handlePromise = new Promise(((e, t) => {
                    this.handleResolveFn = n => {
                        this.handle = n, this.live ? (setTimeout((() => {
                            this.live && n.data({text: "pipe " + this.opaqueId + " config"})
                        }), 1e3), this.config().then((() => {
                            this.live && (this.eventIntervalId = setInterval((() => {
                                this.sendEventsData(n)
                            }), 8), this.rttIntervalId = setInterval((() => {
                                this.sendPipeMessage("rtt", Date.now())
                            }), 1e3))
                        })), e(n)) : t(new Error("exit() was called"))
                    }
                })), this.attach()
            }

            fireMessage(e) {
                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                this.eventsImpl.fireMessage(e, ...n)
            }

            attach() {
                let e;
                this.janus.attach({
                    plugin: "janus.plugin.streaming",
                    opaqueId: this.opaqueId,
                    error: this.onError,
                    success: t => {
                        e = t, this.fireMessage("attached"), t.send({message: {request: "watch", id: 1}})
                    },
                    onmessage: (t, n) => {
                        this.onJanusMessage(e, t, n)
                    },
                    onremotestream: e => {
                        this.fireMessage("onremotestream", e)
                    },
                    ondataopen: () => this.handleResolveFn(e),
                    ondata: o(this.onDataMessage, this.onError)
                })
            }

            onDestroyed() {
                this.fireMessage("destroyed"), this.exitResolveFn()
            }

            async config() {
                return this.configPromise
            }

            width() {
                return this.frameWidth
            }

            height() {
                return this.frameHeight
            }

            soundFrequency() {
                return 44100
            }

            screenshot() {
                return Promise.reject(new Error("Not supported"))
            }

            simulateKeyPress() {
                const e = Date.now() - this.startedAt;
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                n.forEach((t => this.addKey(t, !0, e))), n.forEach((t => this.addKey(t, !1, e + 16)))
            }

            sendKeyEvent(e, t) {
                this.addKey(e, t, Date.now() - this.startedAt)
            }

            addKey(e, t, n) {
                if (!0 === this.keyMatrix[e] !== t && (this.keyMatrix[e] = t, this.sendPipeMessage("k" + (t ? "down" : "up"), e, n), -1 !== this.logIntervalId && t)) switch (this.logColor) {
                    case"white":
                        this.logWhiteMs = Date.now();
                        break;
                    case"red":
                        this.logRedMs = Date.now();
                        break;
                    case"yellow":
                        this.logYellowMs = Date.now()
                }
            }

            sendMouseMotion(e, t) {
                this.sendPipeMessage("mmove", e, t, Date.now() - this.startedAt)
            }

            sendMouseRelativeMotion(e, t) {
                throw new Error("not implemented")
            }

            sendMouseButton(e, t) {
                this.sendPipeMessage("m" + (t ? "down" : "up"), e, Date.now() - this.startedAt)
            }

            sendMouseSync() {
                this.sendPipeMessage("msync", Date.now() - this.startedAt)
            }

            logVisual(e) {
                this.sendPipeMessage("log-visual-on");
                const t = document.createElement("canvas"), n = t.getContext("2d");
                t.width = 1, t.height = 1, this.logIntervalId = setInterval((async () => {
                    var t;
                    const r = Date.now();
                    null == n || n.drawImage(e, 0, 0, 1, 1, 0, 0, 1, 1);
                    const i = null == n || null === (t = n.getImageData(0, 0, 1, 1)) || void 0 === t ? void 0 : t.data,
                        o = Date.now() - r;
                    let s = "not set";
                    if (i[0] > 200 && i[1] > 200 && i[2] > 200 ? s = "white" : i[0] > 200 && i[1] < 200 && i[2] < 200 ? s = "red" : i[0] > 200 && i[1] > 200 && i[2] < 200 && (s = "yellow"), s !== this.logColor) {
                        switch (s) {
                            case"white":
                                this.eventsImpl.fireStdout("yellow-stream:" + (Date.now() - this.logYellowMs - o));
                                break;
                            case"red":
                                this.eventsImpl.fireStdout("white-stream:" + (Date.now() - this.logWhiteMs - o));
                                break;
                            case"yellow":
                                this.eventsImpl.fireStdout("red-stream:" + (Date.now() - this.logRedMs - o))
                        }
                        this.logColor = s
                    }
                }), 16)
            }

            sendPipeMessage() {
                this.eventQueue += "pipe " + this.opaqueId;
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                for (const e of t) this.eventQueue += " " + e;
                this.eventQueue += "\n"
            }

            async sendEventsData(e) {
                0 !== this.eventQueue.length && (e.data({text: this.eventQueue}), this.eventQueue = "")
            }

            persist() {
                return Promise.reject(new Error("Not supported"))
            }

            pause() {
                console.warn("pause/resume is not implemented")
            }

            resume() {
            }

            mute() {
                console.warn("mute/unmute is not implemented")
            }

            unmute() {
            }

            exit() {
                return this.live = !1, clearInterval(this.logIntervalId), this.logIntervalId = -1, clearInterval(this.eventIntervalId), this.eventIntervalId = -1, clearInterval(this.rttIntervalId), this.rttIntervalId = -1, this.janus.destroy(), this.exitPromise
            }

            events() {
                return this.eventsImpl
            }

            networkConnect(e, t, n) {
                return Promise.reject("Not supported")
            }

            networkDisconnect(e) {
                return Promise.reject("Not supported")
            }
        }

        n.default = function (e, t) {
            const n = t || window.Janus;
            return void 0 === n ? Promise.reject(new Error("Janus is not defined, you should load janus.js before this")) : n.isWebrtcSupported() ? new Promise(((t, r) => {
                let i = null;
                const o = {
                    error: e => {
                        null === i ? r(e) : i.onError(e)
                    }, destroyed: () => {
                        null !== i && i.onDestroyed()
                    }
                }, a = {
                    server: e, success: () => {
                        i = new s(l, "js-dos-" + n.randomString(12)), t(i)
                    }, error: o.error, destroyed: o.destroyed, destroyOnUnload: !0
                }, l = new n(a)
            })) : Promise.reject(new Error("WebRTC not supported"))
        }
    }, {
        "../impl/ci-impl": 145,
        "core-js/modules/es.typed-array.set.js": 133,
        "core-js/modules/es.typed-array.sort.js": 134,
        "core-js/modules/es.typed-array.uint8-array.js": 135,
        "core-js/modules/web.dom-collections.iterator.js": 137
    }],
    149: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        e("core-js/modules/es.typed-array.uint8-array.js"), e("core-js/modules/es.typed-array.set.js"), e("core-js/modules/es.typed-array.sort.js"), e("core-js/modules/es.string.replace.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.default = class {
            constructor(e, t) {
                r(this, "module", void 0), r(this, "home", void 0), this.module = e, this.home = t, this.module.callMain([]), this.chdirToHome()
            }

            zipFromFs() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
                this.chdirToHome();
                const t = this.module._zip_from_fs(e);
                if (0 === t) return Promise.reject(new Error("Can't create zip, see more info in logs"));
                const n = this.module.HEAPU32[t / 4], r = this.module.HEAPU8.slice(t + 4, t + 4 + n);
                return this.module._free(t), Promise.resolve(r)
            }

            zipToFs(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/";
                t = this.normalizeFilename(t);
                const n = this.normalizeFilename(t).split("/");
                this.createPath(n, 0, n.length), this.chdir(t);
                const r = new Uint8Array(e), i = this.module._malloc(r.length);
                this.module.HEAPU8.set(r, i);
                const o = this.module._zip_to_fs(i, r.length);
                return this.module._free(i), this.chdirToHome(), 0 === o ? Promise.resolve() : Promise.reject(new Error("Can't extract zip, retcode " + o + ", see more info in logs"))
            }

            writeFile(e, t) {
                e = this.normalizeFilename(e), t instanceof ArrayBuffer && (t = new Uint8Array(t));
                const n = e.split("/");
                if (0 === n.length) throw new Error("Can't create file '" + e + "', because it's not valid file path");
                const r = n[n.length - 1].trim();
                if (0 === r.length) throw new Error("Can't create file '" + e + "', because file name is empty");
                const i = this.createPath(n, 0, n.length - 1);
                this.module.FS.writeFile(i + "/" + r, t)
            }

            async readFile(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "utf8";
                return e = this.normalizeFilename(e), this.module.FS.readFile(e, {encoding: t})
            }

            exists(e) {
                e = this.normalizeFilename(e);
                try {
                    return this.module.FS.lookupPath(e), !0
                } catch (e) {
                    return !1
                }
            }

            destroy() {
                try {
                    this.module._libzip_destroy()
                } catch (e) {
                    return e
                }
            }

            normalizeFilename(e) {
                for (e = e.replace(new RegExp("^[a-zA-z]+:"), "").replace(new RegExp("\\\\", "g"), "/"); "/" === e[0];) e = e.substr(1);
                return e
            }

            createPath(e, t, n) {
                let r = ".";
                for (let i = t; i < n; ++i) {
                    const t = e[i].trim();
                    0 !== t.length && (this.module.FS.createPath(r, t, !0, !0), r = r + "/" + t)
                }
                return r
            }

            chdirToHome() {
                this.module.FS.chdir(this.home)
            }

            chdir(e) {
                this.module.FS.chdir(this.home + "/" + e)
            }
        }
    }, {
        "core-js/modules/es.string.replace.js": 130,
        "core-js/modules/es.typed-array.set.js": 133,
        "core-js/modules/es.typed-array.sort.js": 134,
        "core-js/modules/es.typed-array.uint8-array.js": 135
    }],
    150: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.MessagesQueue = void 0, n.MessagesQueue = class {
            constructor() {
                var e, t;
                t = [], (e = "messages") in this ? Object.defineProperty(this, e, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : this[e] = t
            }

            handler(e, t) {
                this.messages.push({name: e, props: t})
            }

            sendTo(e) {
                for (const t of this.messages) e(t.name, t.props);
                this.messages = []
            }
        }
    }, {"core-js/modules/web.dom-collections.iterator.js": 137}],
    151: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        e("core-js/modules/es.typed-array.uint8-array.js"), e("core-js/modules/es.typed-array.set.js"), e("core-js/modules/es.typed-array.sort.js"), e("core-js/modules/web.dom-collections.iterator.js"), e("core-js/modules/es.typed-array.float32-array.js"), e("core-js/modules/es.typed-array.uint8-clamped-array.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.CommandInterfaceOverTransportLayer = void 0;
        const i = e("../impl/ci-impl");
        n.CommandInterfaceOverTransportLayer = class {
            constructor(e, t, n, o) {
                r(this, "startedAt", Date.now()), r(this, "frameWidth", 0), r(this, "frameHeight", 0), r(this, "rgb", null), r(this, "rgba", null), r(this, "freq", 0), r(this, "bundles", void 0), r(this, "transport", void 0), r(this, "ready", void 0), r(this, "persistPromise", void 0), r(this, "persistResolve", void 0), r(this, "exitPromise", void 0), r(this, "exitResolve", void 0), r(this, "eventsImpl", new i.CommandInterfaceEventsImpl), r(this, "keyMatrix", {}), r(this, "configPromise", void 0), r(this, "configResolve", (() => {
                })), r(this, "panicMessages", []), r(this, "connectPromise", null), r(this, "connectResolve", (() => {
                })), r(this, "connectReject", (() => {
                })), r(this, "disconnectPromise", null), r(this, "disconnectResolve", (() => {
                })), r(this, "sharedMemory", void 0), r(this, "directSound", void 0), r(this, "options", void 0), this.options = o, this.bundles = e, this.transport = t, this.ready = n, this.configPromise = new Promise((e => this.configResolve = e)), this.transport.initMessageHandler(this.onServerMessage.bind(this))
            }

            sendClientMessage(e, t) {
                (t = t || {}).sessionId = t.sessionId || this.transport.sessionId, this.transport.sendMessageToServer(e, t)
            }

            onServerMessage(e, t) {
                if (!(void 0 === e || e.length < 3 || "w" !== e[0] || "s" !== e[1] || "-" !== e[2]) && void 0 !== t && t.sessionId === this.transport.sessionId) switch (e) {
                    case"ws-ready":
                        this.sharedMemory = t.sharedMemory, this.sendClientMessage("wc-run", {bundles: this.bundles}), delete this.bundles;
                        break;
                    case"ws-server-ready":
                        this.panicMessages.length > 0 ? (void 0 !== this.transport.exit && this.transport.exit(), this.ready(new Error(JSON.stringify(this.panicMessages)))) : this.ready(null), delete this.ready;
                        break;
                    case"ws-frame-set-size":
                        this.onFrameSize(t.width, t.height);
                        break;
                    case"ws-update-lines":
                        this.onFrameLines(t.lines, t.rgba);
                        break;
                    case"ws-exit":
                        this.onExit();
                        break;
                    case"ws-log":
                        this.onLog(t.tag, t.message);
                        break;
                    case"ws-warn":
                        this.onWarn(t.tag, t.message);
                        break;
                    case"ws-err":
                        this.onErr(t.tag, t.message);
                        break;
                    case"ws-stdout":
                        this.onStdout(t.message);
                        break;
                    case"ws-persist":
                        this.onPersist(t.bundle);
                        break;
                    case"ws-sound-init":
                        this.onSoundInit(t.freq, t.directSound);
                        break;
                    case"ws-sound-push":
                        this.onSoundPush(t.samples);
                        break;
                    case"ws-config":
                        this.onConfig(JSON.parse(t.content));
                        break;
                    case"ws-sync-sleep":
                        this.sendClientMessage("wc-sync-sleep", t);
                        break;
                    case"ws-connected":
                        this.connectResolve(), this.connectPromise = null, this.connectResolve = () => {
                        }, this.connectReject = () => {
                        }, this.eventsImpl.fireNetworkConnected(t.networkType, t.address, t.port);
                        break;
                    case"ws-disconnected":
                        null !== this.connectPromise ? (this.connectReject(), this.connectPromise = null, this.connectResolve = () => {
                        }, this.connectReject = () => {
                        }) : (this.disconnectResolve(), this.disconnectPromise = null, this.disconnectResolve = () => {
                        }), this.eventsImpl.fireNetworkDisconnected(t.networkType);
                        break;
                    case"ws-extract-progress":
                        this.options.onExtractProgress && this.options.onExtractProgress(t.index, t.file, t.extracted, t.count);
                        break;
                    default:
                        console.log("Unknown server message (ws):", e)
                }
            }

            onConfig(e) {
                this.configResolve(e)
            }

            onFrameSize(e, t) {
                this.frameWidth === e && this.frameHeight === t || (this.frameWidth = e, this.frameHeight = t, void 0 === this.sharedMemory && (this.rgb = new Uint8Array(e * t * 3)), this.eventsImpl.fireFrameSize(e, t))
            }

            onFrameLines(e, t) {
                if (void 0 !== this.sharedMemory) this.rgba = new Uint8Array(this.sharedMemory, t, this.frameWidth * this.frameHeight * 4); else for (const t of e) this.rgb.set(t.heapu8, t.start * this.frameWidth * 3);
                this.eventsImpl.fireFrame(this.rgb, this.rgba)
            }

            onSoundInit(e, t) {
                if (this.freq = e, this.directSound = t, void 0 !== this.directSound) for (let e = 0; e < this.directSound.ringSize; ++e) this.directSound.buffer[e] = new Float32Array(this.directSound.buffer[e])
            }

            onSoundPush(e) {
                this.eventsImpl.fireSoundPush(e)
            }

            onLog(e, t) {
                this.eventsImpl.fireMessage("log", "[" + e + "]" + t)
            }

            onWarn(e, t) {
                this.eventsImpl.fireMessage("warn", "[" + e + "]" + t)
            }

            onErr(e, t) {
                "panic" === e && (this.panicMessages.push(t), console.error("[" + e + "]" + t)), this.eventsImpl.fireMessage("error", "[" + e + "]" + t)
            }

            onStdout(e) {
                this.eventsImpl.fireStdout(e)
            }

            config() {
                return this.configPromise
            }

            width() {
                return this.frameWidth
            }

            height() {
                return this.frameHeight
            }

            soundFrequency() {
                return this.freq
            }

            screenshot() {
                if (null !== this.rgb || null !== this.rgba) {
                    const e = new Uint8ClampedArray(this.frameWidth * this.frameHeight * 4),
                        t = null !== this.rgb ? this.rgb : this.rgba;
                    let n = 0, r = 0;
                    for (; r < e.length;) e[r++] = t[n++], e[r++] = t[n++], e[r++] = t[n++], e[r++] = 255, t.length === e.length && n++;
                    return Promise.resolve(new ImageData(e, this.frameWidth, this.frameHeight))
                }
                return Promise.reject(new Error("No frame received"))
            }

            simulateKeyPress() {
                const e = Date.now() - this.startedAt;
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                n.forEach((t => this.addKey(t, !0, e))), n.forEach((t => this.addKey(t, !1, e + 16)))
            }

            sendKeyEvent(e, t) {
                this.addKey(e, t, Date.now() - this.startedAt)
            }

            addKey(e, t, n) {
                !0 === this.keyMatrix[e] !== t && (this.keyMatrix[e] = t, this.sendClientMessage("wc-add-key", {
                    key: e,
                    pressed: t,
                    timeMs: n
                }))
            }

            sendMouseMotion(e, t) {
                this.sendClientMessage("wc-mouse-move", {x: e, y: t, relative: !1, timeMs: Date.now() - this.startedAt})
            }

            sendMouseRelativeMotion(e, t) {
                this.sendClientMessage("wc-mouse-move", {x: e, y: t, relative: !0, timeMs: Date.now() - this.startedAt})
            }

            sendMouseButton(e, t) {
                this.sendClientMessage("wc-mouse-button", {button: e, pressed: t, timeMs: Date.now() - this.startedAt})
            }

            sendMouseSync() {
                this.sendClientMessage("wc-mouse-sync", {timeMs: Date.now() - this.startedAt})
            }

            persist() {
                if (void 0 !== this.persistPromise) return this.persistPromise;
                const e = new Promise((e => this.persistResolve = e));
                return this.persistPromise = e, this.sendClientMessage("wc-pack-fs-to-bundle"), e
            }

            onPersist(e) {
                this.persistResolve && (this.persistResolve(e), delete this.persistPromise, delete this.persistResolve)
            }

            pause() {
                this.sendClientMessage("wc-pause")
            }

            resume() {
                this.sendClientMessage("wc-resume")
            }

            mute() {
                this.sendClientMessage("wc-mute")
            }

            unmute() {
                this.sendClientMessage("wc-unmute")
            }

            exit() {
                return void 0 !== this.exitPromise || (this.exitPromise = new Promise((e => this.exitResolve = e)), this.exitPromise.then((() => {
                    this.events().fireExit()
                })), this.resume(), this.sendClientMessage("wc-exit")), this.exitPromise
            }

            onExit() {
                void 0 !== this.transport.exit && this.transport.exit(), this.exitResolve && (this.exitResolve(), delete this.exitPromise, delete this.exitResolve)
            }

            events() {
                return this.eventsImpl
            }

            networkConnect(e, t, n) {
                return null !== this.connectPromise || null !== this.disconnectPromise ? Promise.reject(new Error("Already prefoming connection or disconnection...")) : (this.connectPromise = new Promise(((r, i) => {
                    t.startsWith("wss://") || t.startsWith("ws://") || (t = ("http:" === window.location.protocol ? "ws://" : "wss://") + t), this.connectResolve = r, this.connectReject = i, this.sendClientMessage("wc-connect", {
                        networkType: e,
                        address: t,
                        port: n
                    })
                })), this.connectPromise)
            }

            networkDisconnect(e) {
                return null !== this.connectPromise || null !== this.disconnectPromise ? Promise.reject(new Error("Already prefoming connection or disconnection...")) : (this.disconnectPromise = new Promise((t => {
                    this.disconnectResolve = t, this.sendClientMessage("wc-disconnect", {networkType: e})
                })), this.disconnectPromise)
            }
        }
    }, {
        "../impl/ci-impl": 145,
        "core-js/modules/es.typed-array.float32-array.js": 131,
        "core-js/modules/es.typed-array.set.js": 133,
        "core-js/modules/es.typed-array.sort.js": 134,
        "core-js/modules/es.typed-array.uint8-array.js": 135,
        "core-js/modules/es.typed-array.uint8-clamped-array.js": 136,
        "core-js/modules/web.dom-collections.iterator.js": 137
    }]
}, {}, [143]), function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).zip = {})
}(this, (function (e) {
    "use strict";
    const t = -2, n = -3, r = -5,
        i = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535],
        o = [96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 248, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 164, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 244, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 188, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 162, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 210, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 218, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 230, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 214, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 174, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 193, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 249, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 213, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 221, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 147, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 235, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 167, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255],
        s = [80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5, 65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5, 8193, 82, 5, 9, 90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25, 91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5, 24577, 80, 5, 4, 88, 5, 769, 84, 5, 49, 92, 5, 12289, 82, 5, 13, 90, 5, 3073, 86, 5, 193, 192, 5, 24577],
        a = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
        l = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 112, 112],
        c = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577],
        u = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];

    function d() {
        let e, t, i, o, s, d;

        function f(e, t, a, l, c, u, f, p, h, y, m) {
            let v, g, b, w, _, x, k, j, C, E, S, D, O, P, B;
            E = 0, _ = a;
            do {
                i[e[t + E]]++, E++, _--
            } while (0 !== _);
            if (i[0] == a) return f[0] = -1, p[0] = 0, 0;
            for (j = p[0], x = 1; x <= 15 && 0 === i[x]; x++) ;
            for (k = x, j < x && (j = x), _ = 15; 0 !== _ && 0 === i[_]; _--) ;
            for (b = _, j > _ && (j = _), p[0] = j, P = 1 << x; x < _; x++, P <<= 1) if ((P -= i[x]) < 0) return n;
            if ((P -= i[_]) < 0) return n;
            for (i[_] += P, d[1] = x = 0, E = 1, O = 2; 0 != --_;) d[O] = x += i[E], O++, E++;
            _ = 0, E = 0;
            do {
                0 !== (x = e[t + E]) && (m[d[x]++] = _), E++
            } while (++_ < a);
            for (a = d[b], d[0] = _ = 0, E = 0, w = -1, D = -j, s[0] = 0, S = 0, B = 0; k <= b; k++) for (v = i[k]; 0 != v--;) {
                for (; k > D + j;) {
                    if (w++, D += j, B = b - D, B = B > j ? j : B, (g = 1 << (x = k - D)) > v + 1 && (g -= v + 1, O = k, x < B)) for (; ++x < B && !((g <<= 1) <= i[++O]);) g -= i[O];
                    if (B = 1 << x, y[0] + B > 1440) return n;
                    s[w] = S = y[0], y[0] += B, 0 !== w ? (d[w] = _, o[0] = x, o[1] = j, x = _ >>> D - j, o[2] = S - s[w - 1] - x, h.set(o, 3 * (s[w - 1] + x))) : f[0] = S
                }
                for (o[1] = k - D, E >= a ? o[0] = 192 : m[E] < l ? (o[0] = m[E] < 256 ? 0 : 96, o[2] = m[E++]) : (o[0] = u[m[E] - l] + 16 + 64, o[2] = c[m[E++] - l]), g = 1 << k - D, x = _ >>> D; x < B; x += g) h.set(o, 3 * (S + x));
                for (x = 1 << k - 1; 0 != (_ & x); x >>>= 1) _ ^= x;
                for (_ ^= x, C = (1 << D) - 1; (_ & C) != d[w];) w--, D -= j, C = (1 << D) - 1
            }
            return 0 !== P && 1 != b ? r : 0
        }

        function p(n) {
            let r;
            for (e || (e = [], t = [], i = new Int32Array(16), o = [], s = new Int32Array(15), d = new Int32Array(16)), t.length < n && (t = []), r = 0; r < n; r++) t[r] = 0;
            for (r = 0; r < 16; r++) i[r] = 0;
            for (r = 0; r < 3; r++) o[r] = 0;
            s.set(i.subarray(0, 15), 0), d.set(i.subarray(0, 16), 0)
        }

        this.inflate_trees_bits = function (i, o, s, a, l) {
            let c;
            return p(19), e[0] = 0, c = f(i, 0, 19, 19, null, null, s, o, a, e, t), c == n ? l.msg = "oversubscribed dynamic bit lengths tree" : c != r && 0 !== o[0] || (l.msg = "incomplete dynamic bit lengths tree", c = n), c
        }, this.inflate_trees_dynamic = function (i, o, s, d, h, y, m, v, g) {
            let b;
            return p(288), e[0] = 0, b = f(s, 0, i, 257, a, l, y, d, v, e, t), 0 != b || 0 === d[0] ? (b == n ? g.msg = "oversubscribed literal/length tree" : -4 != b && (g.msg = "incomplete literal/length tree", b = n), b) : (p(288), b = f(s, i, o, 0, c, u, m, h, v, e, t), 0 != b || 0 === h[0] && i > 257 ? (b == n ? g.msg = "oversubscribed distance tree" : b == r ? (g.msg = "incomplete distance tree", b = n) : -4 != b && (g.msg = "empty distance tree with lengths", b = n), b) : 0)
        }
    }

    function f() {
        const e = this;
        let r, o, s, a, l = 0, c = 0, u = 0, d = 0, f = 0, p = 0, h = 0, y = 0, m = 0, v = 0;

        function g(e, t, r, o, s, a, l, c) {
            let u, d, f, p, h, y, m, v, g, b, w, _, x, k, j, C;
            m = c.next_in_index, v = c.avail_in, h = l.bitb, y = l.bitk, g = l.write, b = g < l.read ? l.read - g - 1 : l.end - g, w = i[e], _ = i[t];
            do {
                for (; y < 20;) v--, h |= (255 & c.read_byte(m++)) << y, y += 8;
                if (u = h & w, d = r, f = o, C = 3 * (f + u), 0 !== (p = d[C])) for (; ;) {
                    if (h >>= d[C + 1], y -= d[C + 1], 0 != (16 & p)) {
                        for (p &= 15, x = d[C + 2] + (h & i[p]), h >>= p, y -= p; y < 15;) v--, h |= (255 & c.read_byte(m++)) << y, y += 8;
                        for (u = h & _, d = s, f = a, C = 3 * (f + u), p = d[C]; ;) {
                            if (h >>= d[C + 1], y -= d[C + 1], 0 != (16 & p)) {
                                for (p &= 15; y < p;) v--, h |= (255 & c.read_byte(m++)) << y, y += 8;
                                if (k = d[C + 2] + (h & i[p]), h >>= p, y -= p, b -= x, g >= k) j = g - k, g - j > 0 && 2 > g - j ? (l.window[g++] = l.window[j++], l.window[g++] = l.window[j++], x -= 2) : (l.window.set(l.window.subarray(j, j + 2), g), g += 2, j += 2, x -= 2); else {
                                    j = g - k;
                                    do {
                                        j += l.end
                                    } while (j < 0);
                                    if (p = l.end - j, x > p) {
                                        if (x -= p, g - j > 0 && p > g - j) do {
                                            l.window[g++] = l.window[j++]
                                        } while (0 != --p); else l.window.set(l.window.subarray(j, j + p), g), g += p, j += p, p = 0;
                                        j = 0
                                    }
                                }
                                if (g - j > 0 && x > g - j) do {
                                    l.window[g++] = l.window[j++]
                                } while (0 != --x); else l.window.set(l.window.subarray(j, j + x), g), g += x, j += x, x = 0;
                                break
                            }
                            if (0 != (64 & p)) return c.msg = "invalid distance code", x = c.avail_in - v, x = y >> 3 < x ? y >> 3 : x, v += x, m -= x, y -= x << 3, l.bitb = h, l.bitk = y, c.avail_in = v, c.total_in += m - c.next_in_index, c.next_in_index = m, l.write = g, n;
                            u += d[C + 2], u += h & i[p], C = 3 * (f + u), p = d[C]
                        }
                        break
                    }
                    if (0 != (64 & p)) return 0 != (32 & p) ? (x = c.avail_in - v, x = y >> 3 < x ? y >> 3 : x, v += x, m -= x, y -= x << 3, l.bitb = h, l.bitk = y, c.avail_in = v, c.total_in += m - c.next_in_index, c.next_in_index = m, l.write = g, 1) : (c.msg = "invalid literal/length code", x = c.avail_in - v, x = y >> 3 < x ? y >> 3 : x, v += x, m -= x, y -= x << 3, l.bitb = h, l.bitk = y, c.avail_in = v, c.total_in += m - c.next_in_index, c.next_in_index = m, l.write = g, n);
                    if (u += d[C + 2], u += h & i[p], C = 3 * (f + u), 0 === (p = d[C])) {
                        h >>= d[C + 1], y -= d[C + 1], l.window[g++] = d[C + 2], b--;
                        break
                    }
                } else h >>= d[C + 1], y -= d[C + 1], l.window[g++] = d[C + 2], b--
            } while (b >= 258 && v >= 10);
            return x = c.avail_in - v, x = y >> 3 < x ? y >> 3 : x, v += x, m -= x, y -= x << 3, l.bitb = h, l.bitk = y, c.avail_in = v, c.total_in += m - c.next_in_index, c.next_in_index = m, l.write = g, 0
        }

        e.init = function (e, t, n, i, l, c) {
            r = 0, h = e, y = t, s = n, m = i, a = l, v = c, o = null
        }, e.proc = function (e, b, w) {
            let _, x, k, j, C, E, S, D = 0, O = 0, P = 0;
            for (P = b.next_in_index, j = b.avail_in, D = e.bitb, O = e.bitk, C = e.write, E = C < e.read ? e.read - C - 1 : e.end - C; ;) switch (r) {
                case 0:
                    if (E >= 258 && j >= 10 && (e.bitb = D, e.bitk = O, b.avail_in = j, b.total_in += P - b.next_in_index, b.next_in_index = P, e.write = C, w = g(h, y, s, m, a, v, e, b), P = b.next_in_index, j = b.avail_in, D = e.bitb, O = e.bitk, C = e.write, E = C < e.read ? e.read - C - 1 : e.end - C, 0 != w)) {
                        r = 1 == w ? 7 : 9;
                        break
                    }
                    u = h, o = s, c = m, r = 1;
                case 1:
                    for (_ = u; O < _;) {
                        if (0 === j) return e.bitb = D, e.bitk = O, b.avail_in = j, b.total_in += P - b.next_in_index, b.next_in_index = P, e.write = C, e.inflate_flush(b, w);
                        w = 0, j--, D |= (255 & b.read_byte(P++)) << O, O += 8
                    }
                    if (x = 3 * (c + (D & i[_])), D >>>= o[x + 1], O -= o[x + 1], k = o[x], 0 === k) {
                        d = o[x + 2], r = 6;
                        break
                    }
                    if (0 != (16 & k)) {
                        f = 15 & k, l = o[x + 2], r = 2;
                        break
                    }
                    if (0 == (64 & k)) {
                        u = k, c = x / 3 + o[x + 2];
                        break
                    }
                    if (0 != (32 & k)) {
                        r = 7;
                        break
                    }
                    return r = 9, b.msg = "invalid literal/length code", w = n, e.bitb = D, e.bitk = O, b.avail_in = j, b.total_in += P - b.next_in_index, b.next_in_index = P, e.write = C, e.inflate_flush(b, w);
                case 2:
                    for (_ = f; O < _;) {
                        if (0 === j) return e.bitb = D, e.bitk = O, b.avail_in = j, b.total_in += P - b.next_in_index, b.next_in_index = P, e.write = C, e.inflate_flush(b, w);
                        w = 0, j--, D |= (255 & b.read_byte(P++)) << O, O += 8
                    }
                    l += D & i[_], D >>= _, O -= _, u = y, o = a, c = v, r = 3;
                case 3:
                    for (_ = u; O < _;) {
                        if (0 === j) return e.bitb = D, e.bitk = O, b.avail_in = j, b.total_in += P - b.next_in_index, b.next_in_index = P, e.write = C, e.inflate_flush(b, w);
                        w = 0, j--, D |= (255 & b.read_byte(P++)) << O, O += 8
                    }
                    if (x = 3 * (c + (D & i[_])), D >>= o[x + 1], O -= o[x + 1], k = o[x], 0 != (16 & k)) {
                        f = 15 & k, p = o[x + 2], r = 4;
                        break
                    }
                    if (0 == (64 & k)) {
                        u = k, c = x / 3 + o[x + 2];
                        break
                    }
                    return r = 9, b.msg = "invalid distance code", w = n, e.bitb = D, e.bitk = O, b.avail_in = j, b.total_in += P - b.next_in_index, b.next_in_index = P, e.write = C, e.inflate_flush(b, w);
                case 4:
                    for (_ = f; O < _;) {
                        if (0 === j) return e.bitb = D, e.bitk = O, b.avail_in = j, b.total_in += P - b.next_in_index, b.next_in_index = P, e.write = C, e.inflate_flush(b, w);
                        w = 0, j--, D |= (255 & b.read_byte(P++)) << O, O += 8
                    }
                    p += D & i[_], D >>= _, O -= _, r = 5;
                case 5:
                    for (S = C - p; S < 0;) S += e.end;
                    for (; 0 !== l;) {
                        if (0 === E && (C == e.end && 0 !== e.read && (C = 0, E = C < e.read ? e.read - C - 1 : e.end - C), 0 === E && (e.write = C, w = e.inflate_flush(b, w), C = e.write, E = C < e.read ? e.read - C - 1 : e.end - C, C == e.end && 0 !== e.read && (C = 0, E = C < e.read ? e.read - C - 1 : e.end - C), 0 === E))) return e.bitb = D, e.bitk = O, b.avail_in = j, b.total_in += P - b.next_in_index, b.next_in_index = P, e.write = C, e.inflate_flush(b, w);
                        e.window[C++] = e.window[S++], E--, S == e.end && (S = 0), l--
                    }
                    r = 0;
                    break;
                case 6:
                    if (0 === E && (C == e.end && 0 !== e.read && (C = 0, E = C < e.read ? e.read - C - 1 : e.end - C), 0 === E && (e.write = C, w = e.inflate_flush(b, w), C = e.write, E = C < e.read ? e.read - C - 1 : e.end - C, C == e.end && 0 !== e.read && (C = 0, E = C < e.read ? e.read - C - 1 : e.end - C), 0 === E))) return e.bitb = D, e.bitk = O, b.avail_in = j, b.total_in += P - b.next_in_index, b.next_in_index = P, e.write = C, e.inflate_flush(b, w);
                    w = 0, e.window[C++] = d, E--, r = 0;
                    break;
                case 7:
                    if (O > 7 && (O -= 8, j++, P--), e.write = C, w = e.inflate_flush(b, w), C = e.write, E = C < e.read ? e.read - C - 1 : e.end - C, e.read != e.write) return e.bitb = D, e.bitk = O, b.avail_in = j, b.total_in += P - b.next_in_index, b.next_in_index = P, e.write = C, e.inflate_flush(b, w);
                    r = 8;
                case 8:
                    return w = 1, e.bitb = D, e.bitk = O, b.avail_in = j, b.total_in += P - b.next_in_index, b.next_in_index = P, e.write = C, e.inflate_flush(b, w);
                case 9:
                    return w = n, e.bitb = D, e.bitk = O, b.avail_in = j, b.total_in += P - b.next_in_index, b.next_in_index = P, e.write = C, e.inflate_flush(b, w);
                default:
                    return w = t, e.bitb = D, e.bitk = O, b.avail_in = j, b.total_in += P - b.next_in_index, b.next_in_index = P, e.write = C, e.inflate_flush(b, w)
            }
        }, e.free = function () {
        }
    }

    d.inflate_trees_fixed = function (e, t, n, r) {
        return e[0] = 9, t[0] = 5, n[0] = o, r[0] = s, 0
    };
    const p = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

    function h(e, o) {
        const s = this;
        let a, l = 0, c = 0, u = 0, h = 0;
        const y = [0], m = [0], v = new f;
        let g = 0, b = new Int32Array(4320);
        const w = new d;
        s.bitk = 0, s.bitb = 0, s.window = new Uint8Array(o), s.end = o, s.read = 0, s.write = 0, s.reset = function (e, t) {
            t && (t[0] = 0), 6 == l && v.free(e), l = 0, s.bitk = 0, s.bitb = 0, s.read = s.write = 0
        }, s.reset(e, null), s.inflate_flush = function (e, t) {
            let n, i, o;
            return i = e.next_out_index, o = s.read, n = (o <= s.write ? s.write : s.end) - o, n > e.avail_out && (n = e.avail_out), 0 !== n && t == r && (t = 0), e.avail_out -= n, e.total_out += n, e.next_out.set(s.window.subarray(o, o + n), i), i += n, o += n, o == s.end && (o = 0, s.write == s.end && (s.write = 0), n = s.write - o, n > e.avail_out && (n = e.avail_out), 0 !== n && t == r && (t = 0), e.avail_out -= n, e.total_out += n, e.next_out.set(s.window.subarray(o, o + n), i), i += n, o += n), e.next_out_index = i, s.read = o, t
        }, s.proc = function (e, r) {
            let o, f, _, x, k, j, C, E;
            for (x = e.next_in_index, k = e.avail_in, f = s.bitb, _ = s.bitk, j = s.write, C = j < s.read ? s.read - j - 1 : s.end - j; ;) {
                let S, D, O, P, B, A, M, I;
                switch (l) {
                    case 0:
                        for (; _ < 3;) {
                            if (0 === k) return s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                            r = 0, k--, f |= (255 & e.read_byte(x++)) << _, _ += 8
                        }
                        switch (o = 7 & f, g = 1 & o, o >>> 1) {
                            case 0:
                                f >>>= 3, _ -= 3, o = 7 & _, f >>>= o, _ -= o, l = 1;
                                break;
                            case 1:
                                S = [], D = [], O = [[]], P = [[]], d.inflate_trees_fixed(S, D, O, P), v.init(S[0], D[0], O[0], 0, P[0], 0), f >>>= 3, _ -= 3, l = 6;
                                break;
                            case 2:
                                f >>>= 3, _ -= 3, l = 3;
                                break;
                            case 3:
                                return f >>>= 3, _ -= 3, l = 9, e.msg = "invalid block type", r = n, s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r)
                        }
                        break;
                    case 1:
                        for (; _ < 32;) {
                            if (0 === k) return s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                            r = 0, k--, f |= (255 & e.read_byte(x++)) << _, _ += 8
                        }
                        if ((~f >>> 16 & 65535) != (65535 & f)) return l = 9, e.msg = "invalid stored block lengths", r = n, s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                        c = 65535 & f, f = _ = 0, l = 0 !== c ? 2 : 0 !== g ? 7 : 0;
                        break;
                    case 2:
                        if (0 === k) return s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                        if (0 === C && (j == s.end && 0 !== s.read && (j = 0, C = j < s.read ? s.read - j - 1 : s.end - j), 0 === C && (s.write = j, r = s.inflate_flush(e, r), j = s.write, C = j < s.read ? s.read - j - 1 : s.end - j, j == s.end && 0 !== s.read && (j = 0, C = j < s.read ? s.read - j - 1 : s.end - j), 0 === C))) return s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                        if (r = 0, o = c, o > k && (o = k), o > C && (o = C), s.window.set(e.read_buf(x, o), j), x += o, k -= o, j += o, C -= o, 0 != (c -= o)) break;
                        l = 0 !== g ? 7 : 0;
                        break;
                    case 3:
                        for (; _ < 14;) {
                            if (0 === k) return s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                            r = 0, k--, f |= (255 & e.read_byte(x++)) << _, _ += 8
                        }
                        if (u = o = 16383 & f, (31 & o) > 29 || (o >> 5 & 31) > 29) return l = 9, e.msg = "too many length or distance symbols", r = n, s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                        if (o = 258 + (31 & o) + (o >> 5 & 31), !a || a.length < o) a = []; else for (E = 0; E < o; E++) a[E] = 0;
                        f >>>= 14, _ -= 14, h = 0, l = 4;
                    case 4:
                        for (; h < 4 + (u >>> 10);) {
                            for (; _ < 3;) {
                                if (0 === k) return s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                                r = 0, k--, f |= (255 & e.read_byte(x++)) << _, _ += 8
                            }
                            a[p[h++]] = 7 & f, f >>>= 3, _ -= 3
                        }
                        for (; h < 19;) a[p[h++]] = 0;
                        if (y[0] = 7, o = w.inflate_trees_bits(a, y, m, b, e), 0 != o) return (r = o) == n && (a = null, l = 9), s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                        h = 0, l = 5;
                    case 5:
                        for (; o = u, !(h >= 258 + (31 & o) + (o >> 5 & 31));) {
                            let t, c;
                            for (o = y[0]; _ < o;) {
                                if (0 === k) return s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                                r = 0, k--, f |= (255 & e.read_byte(x++)) << _, _ += 8
                            }
                            if (o = b[3 * (m[0] + (f & i[o])) + 1], c = b[3 * (m[0] + (f & i[o])) + 2], c < 16) f >>>= o, _ -= o, a[h++] = c; else {
                                for (E = 18 == c ? 7 : c - 14, t = 18 == c ? 11 : 3; _ < o + E;) {
                                    if (0 === k) return s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                                    r = 0, k--, f |= (255 & e.read_byte(x++)) << _, _ += 8
                                }
                                if (f >>>= o, _ -= o, t += f & i[E], f >>>= E, _ -= E, E = h, o = u, E + t > 258 + (31 & o) + (o >> 5 & 31) || 16 == c && E < 1) return a = null, l = 9, e.msg = "invalid bit length repeat", r = n, s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                                c = 16 == c ? a[E - 1] : 0;
                                do {
                                    a[E++] = c
                                } while (0 != --t);
                                h = E
                            }
                        }
                        if (m[0] = -1, B = [], A = [], M = [], I = [], B[0] = 9, A[0] = 6, o = u, o = w.inflate_trees_dynamic(257 + (31 & o), 1 + (o >> 5 & 31), a, B, A, M, I, b, e), 0 != o) return o == n && (a = null, l = 9), r = o, s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                        v.init(B[0], A[0], b, M[0], b, I[0]), l = 6;
                    case 6:
                        if (s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, 1 != (r = v.proc(s, e, r))) return s.inflate_flush(e, r);
                        if (r = 0, v.free(e), x = e.next_in_index, k = e.avail_in, f = s.bitb, _ = s.bitk, j = s.write, C = j < s.read ? s.read - j - 1 : s.end - j, 0 === g) {
                            l = 0;
                            break
                        }
                        l = 7;
                    case 7:
                        if (s.write = j, r = s.inflate_flush(e, r), j = s.write, C = j < s.read ? s.read - j - 1 : s.end - j, s.read != s.write) return s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                        l = 8;
                    case 8:
                        return r = 1, s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                    case 9:
                        return r = n, s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r);
                    default:
                        return r = t, s.bitb = f, s.bitk = _, e.avail_in = k, e.total_in += x - e.next_in_index, e.next_in_index = x, s.write = j, s.inflate_flush(e, r)
                }
            }
        }, s.free = function (e) {
            s.reset(e, null), s.window = null, b = null
        }, s.set_dictionary = function (e, t, n) {
            s.window.set(e.subarray(t, t + n), 0), s.read = s.write = n
        }, s.sync_point = function () {
            return 1 == l ? 1 : 0
        }
    }

    const y = 13, m = [0, 0, 255, 255];

    function v() {
        const e = this;

        function i(e) {
            return e && e.istate ? (e.total_in = e.total_out = 0, e.msg = null, e.istate.mode = 7, e.istate.blocks.reset(e, null), 0) : t
        }

        e.mode = 0, e.method = 0, e.was = [0], e.need = 0, e.marker = 0, e.wbits = 0, e.inflateEnd = function (t) {
            return e.blocks && e.blocks.free(t), e.blocks = null, 0
        }, e.inflateInit = function (n, r) {
            return n.msg = null, e.blocks = null, r < 8 || r > 15 ? (e.inflateEnd(n), t) : (e.wbits = r, n.istate.blocks = new h(n, 1 << r), i(n), 0)
        }, e.inflate = function (e, i) {
            let o, s;
            if (!e || !e.istate || !e.next_in) return t;
            const a = e.istate;
            for (i = 4 == i ? r : 0, o = r; ;) switch (a.mode) {
                case 0:
                    if (0 === e.avail_in) return o;
                    if (o = i, e.avail_in--, e.total_in++, 8 != (15 & (a.method = e.read_byte(e.next_in_index++)))) {
                        a.mode = y, e.msg = "unknown compression method", a.marker = 5;
                        break
                    }
                    if (8 + (a.method >> 4) > a.wbits) {
                        a.mode = y, e.msg = "invalid window size", a.marker = 5;
                        break
                    }
                    a.mode = 1;
                case 1:
                    if (0 === e.avail_in) return o;
                    if (o = i, e.avail_in--, e.total_in++, s = 255 & e.read_byte(e.next_in_index++), ((a.method << 8) + s) % 31 != 0) {
                        a.mode = y, e.msg = "incorrect header check", a.marker = 5;
                        break
                    }
                    if (0 == (32 & s)) {
                        a.mode = 7;
                        break
                    }
                    a.mode = 2;
                case 2:
                    if (0 === e.avail_in) return o;
                    o = i, e.avail_in--, e.total_in++, a.need = (255 & e.read_byte(e.next_in_index++)) << 24 & 4278190080, a.mode = 3;
                case 3:
                    if (0 === e.avail_in) return o;
                    o = i, e.avail_in--, e.total_in++, a.need += (255 & e.read_byte(e.next_in_index++)) << 16 & 16711680, a.mode = 4;
                case 4:
                    if (0 === e.avail_in) return o;
                    o = i, e.avail_in--, e.total_in++, a.need += (255 & e.read_byte(e.next_in_index++)) << 8 & 65280, a.mode = 5;
                case 5:
                    return 0 === e.avail_in ? o : (o = i, e.avail_in--, e.total_in++, a.need += 255 & e.read_byte(e.next_in_index++), a.mode = 6, 2);
                case 6:
                    return a.mode = y, e.msg = "need dictionary", a.marker = 0, t;
                case 7:
                    if (o = a.blocks.proc(e, o), o == n) {
                        a.mode = y, a.marker = 0;
                        break
                    }
                    if (0 == o && (o = i), 1 != o) return o;
                    o = i, a.blocks.reset(e, a.was), a.mode = 12;
                case 12:
                    return 1;
                case y:
                    return n;
                default:
                    return t
            }
        }, e.inflateSetDictionary = function (e, n, r) {
            let i = 0, o = r;
            if (!e || !e.istate || 6 != e.istate.mode) return t;
            const s = e.istate;
            return o >= 1 << s.wbits && (o = (1 << s.wbits) - 1, i = r - o), s.blocks.set_dictionary(n, i, o), s.mode = 7, 0
        }, e.inflateSync = function (e) {
            let o, s, a, l, c;
            if (!e || !e.istate) return t;
            const u = e.istate;
            if (u.mode != y && (u.mode = y, u.marker = 0), 0 === (o = e.avail_in)) return r;
            for (s = e.next_in_index, a = u.marker; 0 !== o && a < 4;) e.read_byte(s) == m[a] ? a++ : a = 0 !== e.read_byte(s) ? 0 : 4 - a, s++, o--;
            return e.total_in += s - e.next_in_index, e.next_in_index = s, e.avail_in = o, u.marker = a, 4 != a ? n : (l = e.total_in, c = e.total_out, i(e), e.total_in = l, e.total_out = c, u.mode = 7, 0)
        }, e.inflateSyncPoint = function (e) {
            return e && e.istate && e.istate.blocks ? e.istate.blocks.sync_point() : t
        }
    }

    function g() {
    }

    g.prototype = {
        inflateInit: function (e) {
            const t = this;
            return t.istate = new v, e || (e = 15), t.istate.inflateInit(t, e)
        }, inflate: function (e) {
            const n = this;
            return n.istate ? n.istate.inflate(n, e) : t
        }, inflateEnd: function () {
            const e = this;
            if (!e.istate) return t;
            const n = e.istate.inflateEnd(e);
            return e.istate = null, n
        }, inflateSync: function () {
            const e = this;
            return e.istate ? e.istate.inflateSync(e) : t
        }, inflateSetDictionary: function (e, n) {
            const r = this;
            return r.istate ? r.istate.inflateSetDictionary(r, e, n) : t
        }, read_byte: function (e) {
            return this.next_in[e]
        }, read_buf: function (e, t) {
            return this.next_in.subarray(e, e + t)
        }
    };
    const b = {
        chunkSize: 524288,
        maxWorkers: "undefined" != typeof navigator && navigator.hardwareConcurrency || 2,
        terminateWorkerTimeout: 5e3,
        useWebWorkers: !0,
        workerScripts: void 0
    }, w = Object.assign({}, b);

    function _(e) {
        if (void 0 !== e.chunkSize && (w.chunkSize = e.chunkSize), void 0 !== e.maxWorkers && (w.maxWorkers = e.maxWorkers), void 0 !== e.terminateWorkerTimeout && (w.terminateWorkerTimeout = e.terminateWorkerTimeout), void 0 !== e.useWebWorkers && (w.useWebWorkers = e.useWebWorkers), void 0 !== e.Deflate && (w.Deflate = e.Deflate), void 0 !== e.Inflate && (w.Inflate = e.Inflate), void 0 !== e.workerScripts) {
            if (e.workerScripts.deflate) {
                if (!Array.isArray(e.workerScripts.deflate)) throw new Error("workerScripts.deflate must be an array");
                w.workerScripts || (w.workerScripts = {}), w.workerScripts.deflate = e.workerScripts.deflate
            }
            if (e.workerScripts.inflate) {
                if (!Array.isArray(e.workerScripts.inflate)) throw new Error("workerScripts.inflate must be an array");
                w.workerScripts || (w.workerScripts = {}), w.workerScripts.inflate = e.workerScripts.inflate
            }
        }
    }

    const x = "Abort error";

    function k(e, t) {
        if (e && e.aborted) throw t.flush(), new Error(x)
    }

    async function j(e, t) {
        return t.length && await e.writeUint8Array(t), t.length
    }

    const C = "HTTP error ", E = "HTTP Range not supported", S = "text/plain", D = "Content-Length",
        O = "Accept-Ranges", P = "HEAD", B = "GET", A = "bytes";

    class M {
        constructor() {
            this.size = 0
        }

        init() {
            this.initialized = !0
        }
    }

    class I extends M {
    }

    class T extends M {
        writeUint8Array(e) {
            this.size += e.length
        }
    }

    class L extends I {
        constructor(e) {
            super(), this.blob = e, this.size = e.size
        }

        async readUint8Array(e, t) {
            const n = new FileReader;
            return new Promise(((r, i) => {
                n.onload = e => r(new Uint8Array(e.target.result)), n.onerror = () => i(n.error), n.readAsArrayBuffer(this.blob.slice(e, e + t))
            }))
        }
    }

    class K extends I {
        constructor(e, t) {
            super(), this.url = e, this.preventHeadRequest = t.preventHeadRequest, this.useRangeHeader = t.useRangeHeader, this.forceRangeRequests = t.forceRangeRequests, this.options = Object.assign({}, t), delete this.options.preventHeadRequest, delete this.options.useRangeHeader, delete this.options.forceRangeRequests, delete this.options.useXHR
        }

        async init() {
            if (super.init(), V(this.url) && !this.preventHeadRequest) {
                const e = await N(P, this.url, this.options);
                if (this.size = Number(e.headers.get(D)), !this.forceRangeRequests && this.useRangeHeader && e.headers.get(O) != A) throw new Error(E);
                void 0 === this.size && await R(this, this.options)
            } else await R(this, this.options)
        }

        async readUint8Array(e, t) {
            if (this.useRangeHeader) {
                const n = await N(B, this.url, this.options, Object.assign({}, this.options.headers, {HEADER_RANGE: "bytes=" + e + "-" + (e + t - 1)}));
                if (206 != n.status) throw new Error(E);
                return new Uint8Array(await n.arrayBuffer())
            }
            return this.data || await R(this, this.options), new Uint8Array(this.data.subarray(e, e + t))
        }
    }

    async function R(e, t) {
        const n = await N(B, e.url, t);
        e.data = new Uint8Array(await n.arrayBuffer()), e.size || (e.size = e.data.length)
    }

    async function N(e, t, n, r) {
        r = Object.assign({}, n.headers, r);
        const i = await fetch(t, Object.assign({}, n, {method: e, headers: r}));
        if (i.status < 400) return i;
        throw new Error(C + (i.statusText || i.status))
    }

    class F extends I {
        constructor(e, t) {
            super(), this.url = e, this.preventHeadRequest = t.preventHeadRequest, this.useRangeHeader = t.useRangeHeader, this.forceRangeRequests = t.forceRangeRequests
        }

        async init() {
            if (super.init(), V(this.url) && !this.preventHeadRequest) return new Promise(((e, t) => U(P, this.url, (n => {
                this.size = Number(n.getResponseHeader(D)), this.useRangeHeader ? this.forceRangeRequests || n.getResponseHeader(O) == A ? e() : t(new Error(E)) : void 0 === this.size ? z(this, this.url).then((() => e())).catch(t) : e()
            }), t)));
            await z(this, this.url)
        }

        async readUint8Array(e, t) {
            if (!this.useRangeHeader) return this.data || await z(this, this.url), new Uint8Array(this.data.subarray(e, e + t));
            if (206 != (await new Promise(((n, r) => U(B, this.url, (e => n(new Uint8Array(e.response))), r, [["Range", "bytes=" + e + "-" + (e + t - 1)]])))).status) throw new Error(E)
        }
    }

    function z(e, t) {
        return new Promise(((n, r) => U(B, t, (t => {
            e.data = new Uint8Array(t.response), e.size || (e.size = e.data.length), n()
        }), r)))
    }

    function U(e, t, n, r, i = []) {
        const o = new XMLHttpRequest;
        return o.addEventListener("load", (() => {
            o.status < 400 ? n(o) : r(C + (o.statusText || o.status))
        }), !1), o.addEventListener("error", r, !1), o.open(e, t), i.forEach((e => o.setRequestHeader(e[0], e[1]))), o.responseType = "arraybuffer", o.send(), o
    }

    class H extends I {
        constructor(e, t = {}) {
            super(), this.url = e, t.useXHR ? this.reader = new F(e, t) : this.reader = new K(e, t)
        }

        set size(e) {
        }

        get size() {
            return this.reader.size
        }

        async init() {
            super.init(), await this.reader.init()
        }

        async readUint8Array(e, t) {
            return this.reader.readUint8Array(e, t)
        }
    }

    function V(e) {
        if ("undefined" != typeof document) {
            const t = document.createElement("a");
            return t.href = e, "http:" == t.protocol || "https:" == t.protocol
        }
        return /^https?:\/\//i.test(e)
    }

    const W = 4294967295, q = 33639248, G = 101075792,
        Y = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split(""),
        X = [];
    for (let e = 0; e < 256; e++) {
        let t = e;
        for (let e = 0; e < 8; e++) 1 & t ? t = t >>> 1 ^ 3988292384 : t >>>= 1;
        X[e] = t
    }

    class ${constructor(e){this.crc=e||-1}
    append

    (e)
    {
        let t = 0 | this.crc;
        for (let n = 0, r = 0 | e.length; n < r; n++) t = t >>> 8 ^ X[255 & (t ^ e[n])];
        this.crc = t
    }
    get()
    {
        return ~this.crc
    }
}
const J = {
    concat(e, t) {
        if (0 === e.length || 0 === t.length) return e.concat(t);
        const n = e[e.length - 1], r = J.getPartial(n);
        return 32 === r ? e.concat(t) : J._shiftRight(t, r, 0 | n, e.slice(0, e.length - 1))
    },
    bitLength(e) {
        const t = e.length;
        if (0 === t) return 0;
        const n = e[t - 1];
        return 32 * (t - 1) + J.getPartial(n)
    },
    clamp(e, t) {
        if (32 * e.length < t) return e;
        const n = (e = e.slice(0, Math.ceil(t / 32))).length;
        return t &= 31, n > 0 && t && (e[n - 1] = J.partial(t, e[n - 1] & 2147483648 >> t - 1, 1)), e
    },
    partial: (e, t, n) => 32 === e ? t : (n ? 0 | t : t << 32 - e) + 1099511627776 * e,
    getPartial: e => Math.round(e / 1099511627776) || 32,
    _shiftRight(e, t, n, r) {
        for (void 0 === r && (r = []); t >= 32; t -= 32) r.push(n), n = 0;
        if (0 === t) return r.concat(e);
        for (let i = 0; i < e.length; i++) r.push(n | e[i] >>> t), n = e[i] << 32 - t;
        const i = e.length ? e[e.length - 1] : 0, o = J.getPartial(i);
        return r.push(J.partial(t + o & 31, t + o > 32 ? n : r.pop(), 1)), r
    }
}, Q = {
    bytes: {
        fromBits(e) {
            const t = J.bitLength(e) / 8, n = new Uint8Array(t);
            let r;
            for (let i = 0; i < t; i++) 0 == (3 & i) && (r = e[i / 4]), n[i] = r >>> 24, r <<= 8;
            return n
        }, toBits(e) {
            const t = [];
            let n, r = 0;
            for (n = 0; n < e.length; n++) r = r << 8 | e[n], 3 == (3 & n) && (t.push(r), r = 0);
            return 3 & n && t.push(J.partial(8 * (3 & n), r)), t
        }
    }
}, Z = {
    sha1: function (e) {
        e ? (this._h = e._h.slice(0), this._buffer = e._buffer.slice(0), this._length = e._length) : this.reset()
    }
};
Z.sha1.prototype = {
    blockSize: 512,
    reset: function () {
        const e = this;
        return e._h = this._init.slice(0), e._buffer = [], e._length = 0, e
    },
    update: function (e) {
        const t = this;
        "string" == typeof e && (e = Q.utf8String.toBits(e));
        const n = t._buffer = J.concat(t._buffer, e), r = t._length, i = t._length = r + J.bitLength(e);
        if (i > 9007199254740991) throw new Error("Cannot hash more than 2^53 - 1 bits");
        const o = new Uint32Array(n);
        let s = 0;
        for (let e = t.blockSize + r - (t.blockSize + r & t.blockSize - 1); e <= i; e += t.blockSize) t._block(o.subarray(16 * s, 16 * (s + 1))), s += 1;
        return n.splice(0, 16 * s), t
    },
    finalize: function () {
        const e = this;
        let t = e._buffer;
        const n = e._h;
        t = J.concat(t, [J.partial(1, 1)]);
        for (let e = t.length + 2; 15 & e; e++) t.push(0);
        for (t.push(Math.floor(e._length / 4294967296)), t.push(0 | e._length); t.length;) e._block(t.splice(0, 16));
        return e.reset(), n
    },
    _init: [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
    _key: [1518500249, 1859775393, 2400959708, 3395469782],
    _f: function (e, t, n, r) {
        return e <= 19 ? t & n | ~t & r : e <= 39 ? t ^ n ^ r : e <= 59 ? t & n | t & r | n & r : e <= 79 ? t ^ n ^ r : void 0
    },
    _S: function (e, t) {
        return t << e | t >>> 32 - e
    },
    _block: function (e) {
        const t = this, n = t._h, r = Array(80);
        for (let t = 0; t < 16; t++) r[t] = e[t];
        let i = n[0], o = n[1], s = n[2], a = n[3], l = n[4];
        for (let e = 0; e <= 79; e++) {
            e >= 16 && (r[e] = t._S(1, r[e - 3] ^ r[e - 8] ^ r[e - 14] ^ r[e - 16]));
            const n = t._S(5, i) + t._f(e, o, s, a) + l + r[e] + t._key[Math.floor(e / 20)] | 0;
            l = a, a = s, s = t._S(30, o), o = i, i = n
        }
        n[0] = n[0] + i | 0, n[1] = n[1] + o | 0, n[2] = n[2] + s | 0, n[3] = n[3] + a | 0, n[4] = n[4] + l | 0
    }
};
const ee = class {
        constructor(e) {
            const t = this;
            t._tables = [[[], [], [], [], []], [[], [], [], [], []]], t._tables[0][0][0] || t._precompute();
            const n = t._tables[0][4], r = t._tables[1], i = e.length;
            let o, s, a, l = 1;
            if (4 !== i && 6 !== i && 8 !== i) throw new Error("invalid aes key size");
            for (t._key = [s = e.slice(0), a = []], o = i; o < 4 * i + 28; o++) {
                let e = s[o - 1];
                (o % i == 0 || 8 === i && o % i == 4) && (e = n[e >>> 24] << 24 ^ n[e >> 16 & 255] << 16 ^ n[e >> 8 & 255] << 8 ^ n[255 & e], o % i == 0 && (e = e << 8 ^ e >>> 24 ^ l << 24, l = l << 1 ^ 283 * (l >> 7))), s[o] = s[o - i] ^ e
            }
            for (let e = 0; o; e++, o--) {
                const t = s[3 & e ? o : o - 4];
                a[e] = o <= 4 || e < 4 ? t : r[0][n[t >>> 24]] ^ r[1][n[t >> 16 & 255]] ^ r[2][n[t >> 8 & 255]] ^ r[3][n[255 & t]]
            }
        }

        encrypt(e) {
            return this._crypt(e, 0)
        }

        decrypt(e) {
            return this._crypt(e, 1)
        }

        _precompute() {
            const e = this._tables[0], t = this._tables[1], n = e[4], r = t[4], i = [], o = [];
            let s, a, l, c;
            for (let e = 0; e < 256; e++) o[(i[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
            for (let u = s = 0; !n[u]; u ^= a || 1, s = o[s] || 1) {
                let o = s ^ s << 1 ^ s << 2 ^ s << 3 ^ s << 4;
                o = o >> 8 ^ 255 & o ^ 99, n[u] = o, r[o] = u, c = i[l = i[a = i[u]]];
                let d = 16843009 * c ^ 65537 * l ^ 257 * a ^ 16843008 * u, f = 257 * i[o] ^ 16843008 * o;
                for (let n = 0; n < 4; n++) e[n][u] = f = f << 24 ^ f >>> 8, t[n][o] = d = d << 24 ^ d >>> 8
            }
            for (let n = 0; n < 5; n++) e[n] = e[n].slice(0), t[n] = t[n].slice(0)
        }

        _crypt(e, t) {
            if (4 !== e.length) throw new Error("invalid aes block size");
            const n = this._key[t], r = n.length / 4 - 2, i = [0, 0, 0, 0], o = this._tables[t], s = o[0], a = o[1],
                l = o[2], c = o[3], u = o[4];
            let d, f, p, h = e[0] ^ n[0], y = e[t ? 3 : 1] ^ n[1], m = e[2] ^ n[2], v = e[t ? 1 : 3] ^ n[3], g = 4;
            for (let e = 0; e < r; e++) d = s[h >>> 24] ^ a[y >> 16 & 255] ^ l[m >> 8 & 255] ^ c[255 & v] ^ n[g], f = s[y >>> 24] ^ a[m >> 16 & 255] ^ l[v >> 8 & 255] ^ c[255 & h] ^ n[g + 1], p = s[m >>> 24] ^ a[v >> 16 & 255] ^ l[h >> 8 & 255] ^ c[255 & y] ^ n[g + 2], v = s[v >>> 24] ^ a[h >> 16 & 255] ^ l[y >> 8 & 255] ^ c[255 & m] ^ n[g + 3], g += 4, h = d, y = f, m = p;
            for (let e = 0; e < 4; e++) i[t ? 3 & -e : e] = u[h >>> 24] << 24 ^ u[y >> 16 & 255] << 16 ^ u[m >> 8 & 255] << 8 ^ u[255 & v] ^ n[g++], d = h, h = y, y = m, m = v, v = d;
            return i
        }
    }, te = class {
        constructor(e, t) {
            this._prf = e, this._initIv = t, this._iv = t
        }

        reset() {
            this._iv = this._initIv
        }

        update(e) {
            return this.calculate(this._prf, e, this._iv)
        }

        incWord(e) {
            if (255 == (e >> 24 & 255)) {
                let t = e >> 16 & 255, n = e >> 8 & 255, r = 255 & e;
                255 === t ? (t = 0, 255 === n ? (n = 0, 255 === r ? r = 0 : ++r) : ++n) : ++t, e = 0, e += t << 16, e += n << 8, e += r
            } else e += 1 << 24;
            return e
        }

        incCounter(e) {
            0 === (e[0] = this.incWord(e[0])) && (e[1] = this.incWord(e[1]))
        }

        calculate(e, t, n) {
            let r;
            if (!(r = t.length)) return [];
            const i = J.bitLength(t);
            for (let i = 0; i < r; i += 4) {
                this.incCounter(n);
                const r = e.encrypt(n);
                t[i] ^= r[0], t[i + 1] ^= r[1], t[i + 2] ^= r[2], t[i + 3] ^= r[3]
            }
            return J.clamp(t, i)
        }
    }, ne = class {
        constructor(e) {
            const t = this, n = t._hash = Z.sha1, r = [[], []], i = n.prototype.blockSize / 32;
            t._baseHash = [new n, new n], e.length > i && (e = n.hash(e));
            for (let t = 0; t < i; t++) r[0][t] = 909522486 ^ e[t], r[1][t] = 1549556828 ^ e[t];
            t._baseHash[0].update(r[0]), t._baseHash[1].update(r[1]), t._resultHash = new n(t._baseHash[0])
        }

        reset() {
            const e = this;
            e._resultHash = new e._hash(e._baseHash[0]), e._updated = !1
        }

        update(e) {
            this._updated = !0, this._resultHash.update(e)
        }

        digest() {
            const e = this, t = e._resultHash.finalize(), n = new e._hash(e._baseHash[1]).update(t).finalize();
            return e.reset(), n
        }
    }, re = "Invalid pasword", ie = 16, oe = {name: "PBKDF2"}, se = Object.assign({hash: {name: "HMAC"}}, oe),
    ae = Object.assign({iterations: 1e3, hash: {name: "SHA-1"}}, oe), le = ["deriveBits"], ce = [8, 12, 16],
    ue = [16, 24, 32], de = 10, fe = [0, 0, 0, 0], pe = Q.bytes, he = ee, ye = te, me = ne;

class ve {
    constructor(e, t, n) {
        Object.assign(this, {password: e, signed: t, strength: n - 1, pendingInput: new Uint8Array(0)})
    }

    async append(e) {
        const t = this;
        if (t.password) {
            const n = xe(e, 0, ce[t.strength] + 2);
            await async function (e, t, n) {
                await we(e, n, xe(t, 0, ce[e.strength]));
                const r = xe(t, ce[e.strength]), i = e.keys.passwordVerification;
                if (i[0] != r[0] || i[1] != r[1]) throw new Error(re)
            }(t, n, t.password), t.password = null, t.aesCtrGladman = new ye(new he(t.keys.key), Array.from(fe)), t.hmac = new me(t.keys.authentication), e = xe(e, ce[t.strength] + 2)
        }
        return be(t, e, new Uint8Array(e.length - de - (e.length - de) % ie), 0, de, !0)
    }

    flush() {
        const e = this, t = e.pendingInput, n = xe(t, 0, t.length - de), r = xe(t, t.length - de);
        let i = new Uint8Array(0);
        if (n.length) {
            const t = pe.toBits(n);
            e.hmac.update(t);
            const r = e.aesCtrGladman.update(t);
            i = pe.fromBits(r)
        }
        let o = !0;
        if (e.signed) {
            const t = xe(pe.fromBits(e.hmac.digest()), 0, de);
            for (let e = 0; e < de; e++) t[e] != r[e] && (o = !1)
        }
        return {valid: o, data: i}
    }
}

class ge {
    constructor(e, t) {
        Object.assign(this, {password: e, strength: t - 1, pendingInput: new Uint8Array(0)})
    }

    async append(e) {
        const t = this;
        let n = new Uint8Array(0);
        t.password && (n = await async function (e, t) {
            const n = crypto.getRandomValues(new Uint8Array(ce[e.strength]));
            return await we(e, t, n), _e(n, e.keys.passwordVerification)
        }(t, t.password), t.password = null, t.aesCtrGladman = new ye(new he(t.keys.key), Array.from(fe)), t.hmac = new me(t.keys.authentication));
        const r = new Uint8Array(n.length + e.length - e.length % ie);
        return r.set(n, 0), be(t, e, r, n.length, 0)
    }

    flush() {
        const e = this;
        let t = new Uint8Array(0);
        if (e.pendingInput.length) {
            const n = e.aesCtrGladman.update(pe.toBits(e.pendingInput));
            e.hmac.update(n), t = pe.fromBits(n)
        }
        const n = xe(pe.fromBits(e.hmac.digest()), 0, de);
        return {data: _e(t, n), signature: n}
    }
}

function be(e, t, n, r, i, o) {
    const s = t.length - i;
    let a;
    for (e.pendingInput.length && (t = _e(e.pendingInput, t), n = function (e, t) {
        if (t && t > e.length) {
            const n = e;
            (e = new Uint8Array(t)).set(n, 0)
        }
        return e
    }(n, s - s % ie)), a = 0; a <= s - ie; a += ie) {
        const i = pe.toBits(xe(t, a, a + ie));
        o && e.hmac.update(i);
        const s = e.aesCtrGladman.update(i);
        o || e.hmac.update(s), n.set(pe.fromBits(s), a + r)
    }
    return e.pendingInput = xe(t, a), n
}

async function we(e, t, n) {
    const r = (new TextEncoder).encode(t), i = await crypto.subtle.importKey("raw", r, se, !1, le),
        o = await crypto.subtle.deriveBits(Object.assign({salt: n}, ae), i, 8 * (2 * ue[e.strength] + 2)),
        s = new Uint8Array(o);
    e.keys = {
        key: pe.toBits(xe(s, 0, ue[e.strength])),
        authentication: pe.toBits(xe(s, ue[e.strength], 2 * ue[e.strength])),
        passwordVerification: xe(s, 2 * ue[e.strength])
    }
}

function _e(e, t) {
    let n = e;
    return e.length + t.length && (n = new Uint8Array(e.length + t.length), n.set(e, 0), n.set(t, e.length)), n
}

function xe(e, t, n) {
    return e.subarray(t, n)
}

class ke {
    constructor(e, t) {
        Object.assign(this, {password: e, passwordVerification: t}), Se(this, e)
    }

    append(e) {
        const t = this;
        if (t.password) {
            const n = Ce(t, e.subarray(0, 12));
            if (t.password = null, n[11] != t.passwordVerification) throw new Error(re);
            e = e.subarray(12)
        }
        return Ce(t, e)
    }

    flush() {
        return {valid: !0, data: new Uint8Array(0)}
    }
}

class je {
    constructor(e, t) {
        Object.assign(this, {password: e, passwordVerification: t}), Se(this, e)
    }

    append(e) {
        const t = this;
        let n, r;
        if (t.password) {
            t.password = null;
            const i = crypto.getRandomValues(new Uint8Array(12));
            i[11] = t.passwordVerification, n = new Uint8Array(e.length + i.length), n.set(Ee(t, i), 0), r = 12
        } else n = new Uint8Array(e.length), r = 0;
        return n.set(Ee(t, e), r), n
    }

    flush() {
        return {data: new Uint8Array(0)}
    }
}

function Ce(e, t) {
    const n = new Uint8Array(t.length);
    for (let r = 0; r < t.length; r++) n[r] = Oe(e) ^ t[r], De(e, n[r]);
    return n
}

function Ee(e, t) {
    const n = new Uint8Array(t.length);
    for (let r = 0; r < t.length; r++) n[r] = Oe(e) ^ t[r], De(e, t[r]);
    return n
}

function Se(e, t) {
    e.keys = [305419896, 591751049, 878082192], e.crcKey0 = new $(e.keys[0]), e.crcKey2 = new $(e.keys[2]);
    for (let n = 0; n < t.length; n++) De(e, t.charCodeAt(n))
}

function De(e, t) {
    e.crcKey0.append([t]), e.keys[0] = ~e.crcKey0.get(), e.keys[1] = Be(e.keys[1] + Pe(e.keys[0])), e.keys[1] = Be(Math.imul(e.keys[1], 134775813) + 1), e.crcKey2.append([e.keys[1] >>> 24]), e.keys[2] = ~e.crcKey2.get()
}

function Oe(e) {
    const t = 2 | e.keys[2];
    return Pe(Math.imul(t, 1 ^ t) >>> 8)
}

function Pe(e) {
    return 255 & e
}

function Be(e) {
    return 4294967295 & e
}

const Ae = "inflate", Me = "Invalid signature";

class Ie {
    constructor(e, {
        signature: t,
        password: n,
        signed: r,
        compressed: i,
        zipCrypto: o,
        passwordVerification: s,
        encryptionStrength: a
    }, {chunkSize: l}) {
        const c = Boolean(n);
        Object.assign(this, {
            signature: t,
            encrypted: c,
            signed: r,
            compressed: i,
            inflate: i && new e({chunkSize: l}),
            crc32: r && new $,
            zipCrypto: o,
            decrypt: c && o ? new ke(n, s) : new ve(n, r, a)
        })
    }

    async append(e) {
        const t = this;
        return t.encrypted && e.length && (e = await t.decrypt.append(e)), t.compressed && e.length && (e = await t.inflate.append(e)), (!t.encrypted || t.zipCrypto) && t.signed && e.length && t.crc32.append(e), e
    }

    async flush() {
        const e = this;
        let t, n = new Uint8Array(0);
        if (e.encrypted) {
            const t = e.decrypt.flush();
            if (!t.valid) throw new Error(Me);
            n = t.data
        }
        if ((!e.encrypted || e.zipCrypto) && e.signed) {
            const n = new DataView(new Uint8Array(4).buffer);
            if (t = e.crc32.get(), n.setUint32(0, t), e.signature != n.getUint32(0, !1)) throw new Error(Me)
        }
        return e.compressed && (n = await e.inflate.append(n) || new Uint8Array(0), await e.inflate.flush()), {
            data: n,
            signature: t
        }
    }
}

class Te {
    constructor(e, {
        encrypted: t,
        signed: n,
        compressed: r,
        level: i,
        zipCrypto: o,
        password: s,
        passwordVerification: a,
        encryptionStrength: l
    }, {chunkSize: c}) {
        Object.assign(this, {
            encrypted: t,
            signed: n,
            compressed: r,
            deflate: r && new e({level: i || 5, chunkSize: c}),
            crc32: n && new $,
            zipCrypto: o,
            encrypt: t && o ? new je(s, a) : new ge(s, l)
        })
    }

    async append(e) {
        const t = this;
        let n = e;
        return t.compressed && e.length && (n = await t.deflate.append(e)), t.encrypted && n.length && (n = await t.encrypt.append(n)), (!t.encrypted || t.zipCrypto) && t.signed && e.length && t.crc32.append(e), n
    }

    async flush() {
        const e = this;
        let t, n = new Uint8Array(0);
        if (e.compressed && (n = await e.deflate.flush() || new Uint8Array(0)), e.encrypted) {
            n = await e.encrypt.append(n);
            const r = e.encrypt.flush();
            t = r.signature;
            const i = new Uint8Array(n.length + r.data.length);
            i.set(n, 0), i.set(r.data, n.length), n = i
        }
        return e.encrypted && !e.zipCrypto || !e.signed || (t = e.crc32.get()), {data: n, signature: t}
    }
}

const Le = "init", Ke = "append", Re = "flush";
let Ne = !0;
var Fe = (e, t, n, r, i, o, s) => (Object.assign(e, {
    busy: !0,
    codecConstructor: t,
    options: Object.assign({}, n),
    scripts: s,
    terminate() {
        e.worker && !e.busy && (e.worker.terminate(), e.interface = null)
    },
    onTaskFinished() {
        e.busy = !1, i(e)
    }
}), o ? function (e, t) {
    let n;
    const r = {type: "module"};
    if (!e.interface) {
        if (Ne) try {
            e.worker = i()
        } catch (t) {
            Ne = !1, e.worker = i(r)
        } else e.worker = i(r);
        e.worker.addEventListener("message", (function (t) {
            const r = t.data;
            if (n) {
                const t = r.error, i = r.type;
                if (t) {
                    const r = new Error(t.message);
                    r.stack = t.stack, n.reject(r), n = null, e.onTaskFinished()
                } else if (i == Le || i == Re || i == Ke) {
                    const t = r.data;
                    i == Re ? (n.resolve({
                        data: new Uint8Array(t),
                        signature: r.signature
                    }), n = null, e.onTaskFinished()) : n.resolve(t && new Uint8Array(t))
                }
            }
        }), !1), e.interface = {append: e => o({type: Ke, data: e}), flush: () => o({type: Re})}
    }
    return e.interface;

    function i(t = {}) {
        return new Worker(new URL(e.scripts[0], "undefined" == typeof document && "undefined" == typeof location ? new (require("url").URL)("file:" + __filename).href : "undefined" == typeof document ? location.href : document.currentScript && document.currentScript.src || new URL("zip-no-worker-inflate.min.js", document.baseURI).href), t)
    }

    async function o(r) {
        if (!n) {
            const n = e.options, r = e.scripts.slice(1);
            await s({scripts: r, type: Le, options: n, config: {chunkSize: t.chunkSize}})
        }
        return s(r)
    }

    function s(t) {
        const r = e.worker, i = new Promise(((e, t) => n = {resolve: e, reject: t}));
        try {
            if (t.data) try {
                t.data = t.data.buffer, r.postMessage(t, [t.data])
            } catch (e) {
                r.postMessage(t)
            } else r.postMessage(t)
        } catch (t) {
            n.reject(t), n = null, e.onTaskFinished()
        }
        return i
    }
}(e, r) : function (e, t) {
    const n = function (e, t, n) {
        return t.codecType.startsWith("deflate") ? new Te(e, t, n) : t.codecType.startsWith(Ae) ? new Ie(e, t, n) : void 0
    }(e.codecConstructor, e.options, t);
    return {
        async append(t) {
            try {
                return await n.append(t)
            } catch (t) {
                throw e.onTaskFinished(), t
            }
        }, async flush() {
            try {
                return await n.flush()
            } finally {
                e.onTaskFinished()
            }
        }
    }
}(e, r));
let ze = [], Ue = [];

function He(e) {
    e.terminateTimeout && (clearTimeout(e.terminateTimeout), e.terminateTimeout = null)
}

const Ve = ["filename", "rawFilename", "directory", "encrypted", "compressedSize", "uncompressedSize", "lastModDate", "rawLastModDate", "comment", "rawComment", "signature", "extraField", "rawExtraField", "bitFlag", "extraFieldZip64", "extraFieldUnicodePath", "extraFieldUnicodeComment", "extraFieldAES", "filenameUTF8", "commentUTF8", "offset", "zip64", "compressionMethod", "extraFieldNTFS", "lastAccessDate", "creationDate", "extraFieldExtendedTimestamp", "version", "versionMadeBy", "msDosCompatible", "internalFileAttribute", "externalFileAttribute"];

class We {
    constructor(e) {
        Ve.forEach((t => this[t] = e[t]))
    }
}

const qe = "File format is not recognized", Ge = "End of central directory not found",
    Ye = "End of Zip64 central directory not found", Xe = "End of Zip64 central directory locator not found",
    $e = "Central directory header not found", Je = "Local file header not found", Qe = "Zip64 extra field not found",
    Ze = "File contains encrypted entry", et = "Encryption method not supported",
    tt = "Compression method not supported", nt = "utf-8", rt = ["uncompressedSize", "compressedSize", "offset"];

class it {
    constructor(e, t, n) {
        Object.assign(this, {reader: e, config: t, options: n})
    }

    async getData(e, t, n = {}) {
        const r = this, {
            reader: i,
            offset: o,
            extraFieldAES: s,
            compressionMethod: a,
            config: l,
            bitFlag: c,
            signature: u,
            rawLastModDate: d,
            compressedSize: f
        } = r, p = r.localDirectory = {};
        i.initialized || await i.init();
        let h = await vt(i, o, 30);
        const y = mt(h);
        let m = lt(r, n, "password");
        if (m = m && m.length && m, s && 99 != s.originalCompressionMethod) throw new Error(tt);
        if (0 != a && 8 != a) throw new Error(tt);
        if (67324752 != ht(y, 0)) throw new Error(Je);
        ot(p, y, 4), h = await vt(i, o, 30 + p.filenameLength + p.extraFieldLength), p.rawExtraField = h.subarray(30 + p.filenameLength), st(r, p, y, 4), t.lastAccessDate = p.lastAccessDate, t.creationDate = p.creationDate;
        const v = r.encrypted && p.encrypted, g = v && !s;
        if (v) {
            if (!g && void 0 === s.strength) throw new Error(et);
            if (!m) throw new Error(Ze)
        }
        const b = await function (e, t, n) {
            const r = !(!t.compressed && !t.signed && !t.encrypted) && (t.useWebWorkers || void 0 === t.useWebWorkers && n.useWebWorkers),
                i = r && n.workerScripts ? n.workerScripts[t.codecType] : [];
            if (ze.length < n.maxWorkers) {
                const s = {};
                return ze.push(s), Fe(s, e, t, n, o, r, i)
            }
            {
                const s = ze.find((e => !e.busy));
                return s ? (He(s), Fe(s, e, t, n, o, r, i)) : new Promise((n => Ue.push({
                    resolve: n,
                    codecConstructor: e,
                    options: t,
                    webWorker: r,
                    scripts: i
                })))
            }

            function o(e) {
                if (Ue.length) {
                    const [{resolve: t, codecConstructor: r, options: i, webWorker: s, scripts: a}] = Ue.splice(0, 1);
                    t(Fe(e, r, i, n, o, s, a))
                } else e.worker ? (He(e), Number.isFinite(n.terminateWorkerTimeout) && n.terminateWorkerTimeout >= 0 && (e.terminateTimeout = setTimeout((() => {
                    ze = ze.filter((t => t != e)), e.terminate()
                }), n.terminateWorkerTimeout))) : ze = ze.filter((t => t != e))
            }
        }(l.Inflate, {
            codecType: Ae,
            password: m,
            zipCrypto: g,
            encryptionStrength: s && s.strength,
            signed: lt(r, n, "checkSignature"),
            passwordVerification: g && (c.dataDescriptor ? d >>> 8 & 255 : u >>> 24 & 255),
            signature: u,
            compressed: 0 != a,
            encrypted: v,
            useWebWorkers: lt(r, n, "useWebWorkers")
        }, l);
        e.initialized || await e.init();
        const w = lt(r, n, "signal"), _ = o + 30 + p.filenameLength + p.extraFieldLength;
        return await async function (e, t, n, r, i, o, s) {
            const a = Math.max(o.chunkSize, 64);
            return async function o(l = 0, c = 0) {
                const u = s.signal;
                if (l < i) {
                    k(u, e);
                    const d = await t.readUint8Array(l + r, Math.min(a, i - l)), f = d.length;
                    k(u, e);
                    const p = await e.append(d);
                    if (k(u, e), c += await j(n, p), s.onprogress) try {
                        s.onprogress(l + f, i)
                    } catch (e) {
                    }
                    return o(l + a, c)
                }
                {
                    const t = await e.flush();
                    return c += await j(n, t.data), {signature: t.signature, length: c}
                }
            }()
        }(b, i, e, _, f, l, {onprogress: n.onprogress, signal: w}), e.getData()
    }
}

function ot(e, t, n) {
    const r = e.rawBitFlag = pt(t, n + 2), i = 1 == (1 & r), o = ht(t, n + 6);
    Object.assign(e, {
        encrypted: i,
        version: pt(t, n),
        bitFlag: {level: (6 & r) >> 1, dataDescriptor: 8 == (8 & r), languageEncodingFlag: 2048 == (2048 & r)},
        rawLastModDate: o,
        lastModDate: ut(o),
        filenameLength: pt(t, n + 22),
        extraFieldLength: pt(t, n + 24)
    })
}

function st(e, t, n, r) {
    const i = t.rawExtraField, o = t.extraField = new Map, s = mt(new Uint8Array(i));
    let a = 0;
    try {
        for (; a < i.length;) {
            const e = pt(s, a), t = pt(s, a + 2);
            o.set(e, {type: e, data: i.slice(a + 4, a + 4 + t)}), a += 4 + t
        }
    } catch (e) {
    }
    const l = pt(n, r + 4);
    t.signature = ht(n, r + 10), t.uncompressedSize = ht(n, r + 18), t.compressedSize = ht(n, r + 14);
    const c = o.get(1);
    c && (function (e, t) {
        t.zip64 = !0;
        const n = mt(e.data);
        e.values = [];
        for (let t = 0; t < Math.floor(e.data.length / 8); t++) e.values.push(yt(n, 0 + 8 * t));
        const r = rt.filter((e => t[e] == W));
        for (let t = 0; t < r.length; t++) e[r[t]] = e.values[t];
        rt.forEach((n => {
            if (t[n] == W) {
                if (void 0 === e[n]) throw new Error(Qe);
                t[n] = e[n]
            }
        }))
    }(c, t), t.extraFieldZip64 = c);
    const u = o.get(28789);
    u && (at(u, "filename", "rawFilename", t, e), t.extraFieldUnicodePath = u);
    const d = o.get(25461);
    d && (at(d, "comment", "rawComment", t, e), t.extraFieldUnicodeComment = d);
    const f = o.get(39169);
    f ? (function (e, t, n) {
        const r = mt(e.data);
        e.vendorVersion = ft(r, 0), e.vendorId = ft(r, 2);
        const i = ft(r, 4);
        e.strength = i, e.originalCompressionMethod = n, t.compressionMethod = e.compressionMethod = pt(r, 5)
    }(f, t, l), t.extraFieldAES = f) : t.compressionMethod = l;
    const p = o.get(10);
    p && (function (e, t) {
        const n = mt(e.data);
        let r, i = 4;
        try {
            for (; i < e.data.length && !r;) {
                const t = pt(n, i), o = pt(n, i + 2);
                1 == t && (r = e.data.slice(i + 4, i + 4 + o)), i += 4 + o
            }
        } catch (e) {
        }
        try {
            if (r && 24 == r.length) {
                const n = mt(r), i = n.getBigUint64(0, !0), o = n.getBigUint64(8, !0), s = n.getBigUint64(16, !0);
                Object.assign(e, {rawLastModDate: i, rawLastAccessDate: o, rawCreationDate: s});
                const a = dt(i), l = {lastModDate: a, lastAccessDate: dt(o), creationDate: dt(s)};
                Object.assign(e, l), Object.assign(t, l)
            }
        } catch (e) {
        }
    }(p, t), t.extraFieldNTFS = p);
    const h = o.get(21589);
    h && (function (e, t) {
        const n = mt(e.data), r = ft(n, 0), i = [], o = [];
        1 == (1 & r) && (i.push("lastModDate"), o.push("rawLastModDate")), 2 == (2 & r) && (i.push("lastAccessDate"), o.push("rawLastAccessDate")), 4 == (4 & r) && (i.push("creationDate"), o.push("rawCreationDate"));
        let s = 1;
        i.forEach(((r, i) => {
            if (e.data.length >= s + 4) {
                const a = ht(n, s);
                t[r] = e[r] = new Date(1e3 * a);
                const l = o[i];
                e[l] = a
            }
            s += 4
        }))
    }(h, t), t.extraFieldExtendedTimestamp = h)
}

function at(e, t, n, r, i) {
    const o = mt(e.data);
    e.version = ft(o, 0), e.signature = ht(o, 1);
    const s = new $;
    s.append(i[n]);
    const a = mt(new Uint8Array(4));
    a.setUint32(0, s.get(), !0), e[t] = (new TextDecoder).decode(e.data.subarray(5)), e.valid = !i.bitFlag.languageEncodingFlag && e.signature == ht(a, 0), e.valid && (r[t] = e[t], r[t + "UTF8"] = !0)
}

function lt(e, t, n) {
    return void 0 === t[n] ? e.options[n] : t[n]
}

function ct(e, t) {
    return t && "cp437" != t.trim().toLowerCase() ? new TextDecoder(t).decode(e) : (e => {
        let t = "";
        for (let n = 0; n < e.length; n++) t += Y[e[n]];
        return t
    })(e)
}

function ut(e) {
    const t = (4294901760 & e) >> 16, n = 65535 & e;
    try {
        return new Date(1980 + ((65024 & t) >> 9), ((480 & t) >> 5) - 1, 31 & t, (63488 & n) >> 11, (2016 & n) >> 5, 2 * (31 & n), 0)
    } catch (e) {
    }
}

function dt(e) {
    return new Date(Number(e / BigInt(1e4) - BigInt(116444736e5)))
}

function ft(e, t) {
    return e.getUint8(t)
}

function pt(e, t) {
    return e.getUint16(t, !0)
}

function ht(e, t) {
    return e.getUint32(t, !0)
}

function yt(e, t) {
    return Number(e.getBigUint64(t, !0))
}

function mt(e) {
    return new DataView(e.buffer)
}

function vt(e, t, n) {
    return e.readUint8Array(t, n)
}

_({
    Inflate: function (e) {
        const t = new g, n = e && e.chunkSize ? Math.floor(2 * e.chunkSize) : 131072, i = new Uint8Array(n);
        let o = !1;
        t.inflateInit(), t.next_out = i, this.append = function (e, s) {
            const a = [];
            let l, c, u = 0, d = 0, f = 0;
            if (0 !== e.length) {
                t.next_in_index = 0, t.next_in = e, t.avail_in = e.length;
                do {
                    if (t.next_out_index = 0, t.avail_out = n, 0 !== t.avail_in || o || (t.next_in_index = 0, o = !0), l = t.inflate(0), o && l === r) {
                        if (0 !== t.avail_in) throw new Error("inflating: bad input")
                    } else if (0 !== l && 1 !== l) throw new Error("inflating: " + t.msg);
                    if ((o || 1 === l) && t.avail_in === e.length) throw new Error("inflating: bad input");
                    t.next_out_index && (t.next_out_index === n ? a.push(new Uint8Array(i)) : a.push(i.slice(0, t.next_out_index))), f += t.next_out_index, s && t.next_in_index > 0 && t.next_in_index != u && (s(t.next_in_index), u = t.next_in_index)
                } while (t.avail_in > 0 || 0 === t.avail_out);
                return a.length > 1 ? (c = new Uint8Array(f), a.forEach((function (e) {
                    c.set(e, d), d += e.length
                }))) : c = a[0] || new Uint8Array(0), c
            }
        }, this.flush = function () {
            t.inflateEnd()
        }
    }
}), e.BlobReader = L, e.BlobWriter = class extends T {
    constructor(e) {
        super(), this.offset = 0, this.contentType = e, this.blob = new Blob([], {type: e})
    }

    async writeUint8Array(e) {
        super.writeUint8Array(e), this.blob = new Blob([this.blob, e.buffer], {type: this.contentType}), this.offset = this.blob.size
    }

    getData() {
        return this.blob
    }
}, e.Data64URIReader = class extends I {
    constructor(e) {
        super(), this.dataURI = e;
        let t = e.length;
        for (; "=" == e.charAt(t - 1);) t--;
        this.dataStart = e.indexOf(",") + 1, this.size = Math.floor(.75 * (t - this.dataStart))
    }

    async readUint8Array(e, t) {
        const n = new Uint8Array(t), r = 4 * Math.floor(e / 3),
            i = atob(this.dataURI.substring(r + this.dataStart, 4 * Math.ceil((e + t) / 3) + this.dataStart)),
            o = e - 3 * Math.floor(r / 4);
        for (let e = o; e < o + t; e++) n[e - o] = i.charCodeAt(e);
        return n
    }
}, e.Data64URIWriter = class extends T {
    constructor(e) {
        super(), this.data = "data:" + (e || "") + ";base64,", this.pending = []
    }

    async writeUint8Array(e) {
        super.writeUint8Array(e);
        let t = 0, n = this.pending;
        const r = this.pending.length;
        for (this.pending = "", t = 0; t < 3 * Math.floor((r + e.length) / 3) - r; t++) n += String.fromCharCode(e[t]);
        for (; t < e.length; t++) this.pending += String.fromCharCode(e[t]);
        n.length > 2 ? this.data += btoa(n) : this.pending = n
    }

    getData() {
        return this.data + btoa(this.pending)
    }
}, e.ERR_ABORT = x, e.ERR_BAD_FORMAT = qe, e.ERR_CENTRAL_DIRECTORY_NOT_FOUND = $e, e.ERR_ENCRYPTED = Ze, e.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = Xe, e.ERR_EOCDR_NOT_FOUND = Ge, e.ERR_EOCDR_ZIP64_NOT_FOUND = Ye, e.ERR_EXTRAFIELD_ZIP64_NOT_FOUND = Qe, e.ERR_HTTP_RANGE = E, e.ERR_INVALID_PASSWORD = re, e.ERR_INVALID_SIGNATURE = Me, e.ERR_LOCAL_FILE_HEADER_NOT_FOUND = Je, e.ERR_UNSUPPORTED_COMPRESSION = tt, e.ERR_UNSUPPORTED_ENCRYPTION = et, e.HttpRangeReader = class extends H {
    constructor(e, t = {}) {
        t.useRangeHeader = !0, super(e, t)
    }
}, e.HttpReader = H, e.Reader = I, e.TextReader = class extends I {
    constructor(e) {
        super(), this.blobReader = new L(new Blob([e], {type: S}))
    }

    async init() {
        super.init(), this.blobReader.init(), this.size = this.blobReader.size
    }

    async readUint8Array(e, t) {
        return this.blobReader.readUint8Array(e, t)
    }
}, e.TextWriter = class extends T {
    constructor(e) {
        super(), this.encoding = e, this.blob = new Blob([], {type: S})
    }

    async writeUint8Array(e) {
        super.writeUint8Array(e), this.blob = new Blob([this.blob, e.buffer], {type: S})
    }

    getData() {
        const e = new FileReader;
        return new Promise(((t, n) => {
            e.onload = e => t(e.target.result), e.onerror = () => n(e.error), e.readAsText(this.blob, this.encoding)
        }))
    }
}, e.Uint8ArrayReader = class extends I {
    constructor(e) {
        super(), this.array = e, this.size = e.length
    }

    async readUint8Array(e, t) {
        return this.array.slice(e, e + t)
    }
}, e.Uint8ArrayWriter = class extends T {
    constructor() {
        super(), this.array = new Uint8Array(0)
    }

    async writeUint8Array(e) {
        super.writeUint8Array(e);
        const t = this.array;
        this.array = new Uint8Array(t.length + e.length), this.array.set(t), this.array.set(e, t.length)
    }

    getData() {
        return this.array
    }
}, e.Writer = T, e.ZipReader = class {
    constructor(e, t = {}) {
        Object.assign(this, {reader: e, options: t, config: w})
    }

    async getEntries(e = {}) {
        const t = this, n = t.reader;
        if (n.initialized || await n.init(), n.size < 22) throw new Error(qe);
        const r = await async function (e, t, n, r, i) {
            const o = new Uint8Array(4);
            !function (e, t, n) {
                e.setUint32(0, 101010256, !0)
            }(mt(o));
            return await s(22) || await s(Math.min(1048582, n));

            async function s(t) {
                const r = n - t, i = await vt(e, r, t);
                for (let e = i.length - 22; e >= 0; e--) if (i[e] == o[0] && i[e + 1] == o[1] && i[e + 2] == o[2] && i[e + 3] == o[3]) return {
                    offset: r + e,
                    buffer: i.slice(e, e + 22).buffer
                }
            }
        }(n, 0, n.size);
        if (!r) throw new Error(Ge);
        const i = mt(r);
        let o = ht(i, 12), s = ht(i, 16), a = pt(i, 8), l = 0;
        if (s == W || 65535 == a) {
            const e = mt(await vt(n, r.offset - 20, 20));
            if (117853008 != ht(e, 0)) throw new Error(Ye);
            s = yt(e, 8);
            let t = await vt(n, s, 56), i = mt(t);
            const c = r.offset - 20 - 56;
            if (ht(i, 0) != G && s != c) {
                const e = s;
                s = c, l = s - e, t = await vt(n, s, 56), i = mt(t)
            }
            if (ht(i, 0) != G) throw new Error(Xe);
            a = yt(i, 24), o = ht(e, 4), s -= yt(i, 40)
        }
        if (s < 0 || s >= n.size) throw new Error(qe);
        let c = 0, u = await vt(n, s, n.size - s), d = mt(u);
        const f = r.offset - o;
        if (ht(d, c) != q && s != f) {
            const e = s;
            s = f, l = s - e, u = await vt(n, s, n.size - s), d = mt(u)
        }
        if (s < 0 || s >= n.size) throw new Error(qe);
        const p = [];
        for (let r = 0; r < a; r++) {
            const i = new it(n, t.config, t.options);
            if (ht(d, c) != q) throw new Error($e);
            ot(i, d, c + 6);
            const o = Boolean(i.bitFlag.languageEncodingFlag), s = c + 46, f = s + i.filenameLength,
                h = f + i.extraFieldLength, y = pt(d, c + 4), m = 0 == (0 & y);
            Object.assign(i, {
                versionMadeBy: y,
                msDosCompatible: m,
                compressedSize: 0,
                uncompressedSize: 0,
                commentLength: pt(d, c + 32),
                directory: m && 16 == (16 & ft(d, c + 38)),
                offset: ht(d, c + 42) + l,
                internalFileAttribute: ht(d, c + 34),
                externalFileAttribute: ht(d, c + 38),
                rawFilename: u.subarray(s, f),
                filenameUTF8: o,
                commentUTF8: o,
                rawExtraField: u.subarray(f, h)
            });
            const v = h + i.commentLength;
            i.rawComment = u.subarray(h, v), i.filename = ct(i.rawFilename, i.filenameUTF8 ? nt : lt(t, e, "filenameEncoding")), i.comment = ct(i.rawComment, i.commentUTF8 ? nt : lt(t, e, "commentEncoding")), !i.directory && i.filename.endsWith("/") && (i.directory = !0), st(i, i, d, c + 6);
            const g = new We(i);
            if (g.getData = (e, t) => i.getData(e, g, t), p.push(g), c = v, e.onprogress) try {
                e.onprogress(r + 1, a, new We(i))
            } catch (e) {
            }
        }
        return p
    }

    async close() {
    }
}, e.configure = _, e.getMimeType = function () {
    return "application/octet-stream"
}, Object.defineProperty(e, "__esModule", {value: !0})
})),

function e(t, n, r) {
    function i(s, a) {
        if (!n[s]) {
            if (!t[s]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(s, !0);
                if (o) return o(s, !0);
                var c = new Error("Cannot find module '" + s + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = n[s] = {exports: {}};
            t[s][0].call(u.exports, (function (e) {
                return i(t[s][1][e] || e)
            }), u, u.exports, e, t, n, r)
        }
        return n[s].exports
    }

    for (var o = "function" == typeof require && require, s = 0; s < r.length; s++) i(r[s]);
    return i
}

({
    1: [function (e, t, n) {
        "use strict";
        n.byteLength = function (e) {
            var t = c(e), n = t[0], r = t[1];
            return 3 * (n + r) / 4 - r
        }, n.toByteArray = function (e) {
            var t, n, r = c(e), s = r[0], a = r[1], l = new o(function (e, t, n) {
                return 3 * (t + n) / 4 - n
            }(0, s, a)), u = 0, d = a > 0 ? s - 4 : s;
            for (n = 0; n < d; n += 4) t = i[e.charCodeAt(n)] << 18 | i[e.charCodeAt(n + 1)] << 12 | i[e.charCodeAt(n + 2)] << 6 | i[e.charCodeAt(n + 3)], l[u++] = t >> 16 & 255, l[u++] = t >> 8 & 255, l[u++] = 255 & t;
            2 === a && (t = i[e.charCodeAt(n)] << 2 | i[e.charCodeAt(n + 1)] >> 4, l[u++] = 255 & t);
            1 === a && (t = i[e.charCodeAt(n)] << 10 | i[e.charCodeAt(n + 1)] << 4 | i[e.charCodeAt(n + 2)] >> 2, l[u++] = t >> 8 & 255, l[u++] = 255 & t);
            return l
        }, n.fromByteArray = function (e) {
            for (var t, n = e.length, i = n % 3, o = [], s = 16383, a = 0, l = n - i; a < l; a += s) o.push(u(e, a, a + s > l ? l : a + s));
            1 === i ? (t = e[n - 1], o.push(r[t >> 2] + r[t << 4 & 63] + "==")) : 2 === i && (t = (e[n - 2] << 8) + e[n - 1], o.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "="));
            return o.join("")
        };
        for (var r = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, l = s.length; a < l; ++a) r[a] = s[a], i[s.charCodeAt(a)] = a;

        function c(e) {
            var t = e.length;
            if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var n = e.indexOf("=");
            return -1 === n && (n = t), [n, n === t ? 0 : 4 - n % 4]
        }

        function u(e, t, n) {
            for (var i, o, s = [], a = t; a < n; a += 3) i = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), s.push(r[(o = i) >> 18 & 63] + r[o >> 12 & 63] + r[o >> 6 & 63] + r[63 & o]);
            return s.join("")
        }

        i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63
    }, {}],
    2: [function (e, t, n) {
        var r = e("../internals/is-callable"), i = e("../internals/try-to-string"), o = TypeError;
        t.exports = function (e) {
            if (r(e)) return e;
            throw o(i(e) + " is not a function")
        }
    }, {"../internals/is-callable": 56, "../internals/try-to-string": 108}],
    3: [function (e, t, n) {
        var r = e("../internals/is-callable"), i = String, o = TypeError;
        t.exports = function (e) {
            if ("object" == typeof e || r(e)) return e;
            throw o("Can't set " + i(e) + " as a prototype")
        }
    }, {"../internals/is-callable": 56}],
    4: [function (e, t, n) {
        var r = e("../internals/well-known-symbol"), i = e("../internals/object-create"),
            o = e("../internals/object-define-property").f, s = r("unscopables"), a = Array.prototype;
        null == a[s] && o(a, s, {configurable: !0, value: i(null)}), t.exports = function (e) {
            a[s][e] = !0
        }
    }, {
        "../internals/object-create": 72,
        "../internals/object-define-property": 74,
        "../internals/well-known-symbol": 113
    }],
    5: [function (e, t, n) {
        "use strict";
        var r = e("../internals/string-multibyte").charAt;
        t.exports = function (e, t, n) {
            return t + (n ? r(e, t).length : 1)
        }
    }, {"../internals/string-multibyte": 97}],
    6: [function (e, t, n) {
        var r = e("../internals/object-is-prototype-of"), i = TypeError;
        t.exports = function (e, t) {
            if (r(t, e)) return e;
            throw i("Incorrect invocation")
        }
    }, {"../internals/object-is-prototype-of": 79}],
    7: [function (e, t, n) {
        var r = e("../internals/is-object"), i = String, o = TypeError;
        t.exports = function (e) {
            if (r(e)) return e;
            throw o(i(e) + " is not an object")
        }
    }, {"../internals/is-object": 59}],
    8: [function (e, t, n) {
        "use strict";
        var r = e("../internals/function-bind-context"), i = e("../internals/function-call"),
            o = e("../internals/to-object"), s = e("../internals/call-with-safe-iteration-closing"),
            a = e("../internals/is-array-iterator-method"), l = e("../internals/is-constructor"),
            c = e("../internals/length-of-array-like"), u = e("../internals/create-property"),
            d = e("../internals/get-iterator"), f = e("../internals/get-iterator-method"), p = Array;
        t.exports = function (e) {
            var t = o(e), n = l(this), h = arguments.length, y = h > 1 ? arguments[1] : void 0, m = void 0 !== y;
            m && (y = r(y, h > 2 ? arguments[2] : void 0));
            var v, g, b, w, _, x, k = f(t), j = 0;
            if (!k || this === p && a(k)) for (v = c(t), g = n ? new this(v) : p(v); v > j; j++) x = m ? y(t[j], j) : t[j], u(g, j, x); else for (_ = (w = d(t, k)).next, g = n ? new this : []; !(b = i(_, w)).done; j++) x = m ? s(w, y, [b.value, j], !0) : b.value, u(g, j, x);
            return g.length = j, g
        }
    }, {
        "../internals/call-with-safe-iteration-closing": 12,
        "../internals/create-property": 20,
        "../internals/function-bind-context": 37,
        "../internals/function-call": 39,
        "../internals/get-iterator": 44,
        "../internals/get-iterator-method": 43,
        "../internals/is-array-iterator-method": 55,
        "../internals/is-constructor": 57,
        "../internals/length-of-array-like": 65,
        "../internals/to-object": 103
    }],
    9: [function (e, t, n) {
        var r = e("../internals/to-indexed-object"), i = e("../internals/to-absolute-index"),
            o = e("../internals/length-of-array-like"), s = function (e) {
                return function (t, n, s) {
                    var a, l = r(t), c = o(l), u = i(s, c);
                    if (e && n != n) {
                        for (; c > u;) if ((a = l[u++]) != a) return !0
                    } else for (; c > u; u++) if ((e || u in l) && l[u] === n) return e || u || 0;
                    return !e && -1
                }
            };
        t.exports = {includes: s(!0), indexOf: s(!1)}
    }, {
        "../internals/length-of-array-like": 65,
        "../internals/to-absolute-index": 99,
        "../internals/to-indexed-object": 100
    }],
    10: [function (e, t, n) {
        var r = e("../internals/to-absolute-index"), i = e("../internals/length-of-array-like"),
            o = e("../internals/create-property"), s = Array, a = Math.max;
        t.exports = function (e, t, n) {
            for (var l = i(e), c = r(t, l), u = r(void 0 === n ? l : n, l), d = s(a(u - c, 0)), f = 0; c < u; c++, f++) o(d, f, e[c]);
            return d.length = f, d
        }
    }, {
        "../internals/create-property": 20,
        "../internals/length-of-array-like": 65,
        "../internals/to-absolute-index": 99
    }],
    11: [function (e, t, n) {
        var r = e("../internals/array-slice-simple"), i = Math.floor, o = function (e, t) {
            var n = e.length, l = i(n / 2);
            return n < 8 ? s(e, t) : a(e, o(r(e, 0, l), t), o(r(e, l), t), t)
        }, s = function (e, t) {
            for (var n, r, i = e.length, o = 1; o < i;) {
                for (r = o, n = e[o]; r && t(e[r - 1], n) > 0;) e[r] = e[--r];
                r !== o++ && (e[r] = n)
            }
            return e
        }, a = function (e, t, n, r) {
            for (var i = t.length, o = n.length, s = 0, a = 0; s < i || a < o;) e[s + a] = s < i && a < o ? r(t[s], n[a]) <= 0 ? t[s++] : n[a++] : s < i ? t[s++] : n[a++];
            return e
        };
        t.exports = o
    }, {"../internals/array-slice-simple": 10}],
    12: [function (e, t, n) {
        var r = e("../internals/an-object"), i = e("../internals/iterator-close");
        t.exports = function (e, t, n, o) {
            try {
                return o ? t(r(n)[0], n[1]) : t(n)
            } catch (t) {
                i(e, "throw", t)
            }
        }
    }, {"../internals/an-object": 7, "../internals/iterator-close": 62}],
    13: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = r({}.toString), o = r("".slice);
        t.exports = function (e) {
            return o(i(e), 8, -1)
        }
    }, {"../internals/function-uncurry-this": 41}],
    14: [function (e, t, n) {
        var r = e("../internals/to-string-tag-support"), i = e("../internals/is-callable"),
            o = e("../internals/classof-raw"), s = e("../internals/well-known-symbol")("toStringTag"), a = Object,
            l = "Arguments" == o(function () {
                return arguments
            }());
        t.exports = r ? o : function (e) {
            var t, n, r;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {
                try {
                    return e[t]
                } catch (e) {
                }
            }(t = a(e), s)) ? n : l ? o(t) : "Object" == (r = o(t)) && i(t.callee) ? "Arguments" : r
        }
    }, {
        "../internals/classof-raw": 13,
        "../internals/is-callable": 56,
        "../internals/to-string-tag-support": 106,
        "../internals/well-known-symbol": 113
    }],
    15: [function (e, t, n) {
        var r = e("../internals/has-own-property"), i = e("../internals/own-keys"),
            o = e("../internals/object-get-own-property-descriptor"), s = e("../internals/object-define-property");
        t.exports = function (e, t, n) {
            for (var a = i(t), l = s.f, c = o.f, u = 0; u < a.length; u++) {
                var d = a[u];
                r(e, d) || n && r(n, d) || l(e, d, c(t, d))
            }
        }
    }, {
        "../internals/has-own-property": 48,
        "../internals/object-define-property": 74,
        "../internals/object-get-own-property-descriptor": 75,
        "../internals/own-keys": 85
    }],
    16: [function (e, t, n) {
        var r = e("../internals/fails");
        t.exports = !r((function () {
            function e() {
            }

            return e.prototype.constructor = null, Object.getPrototypeOf(new e) !== e.prototype
        }))
    }, {"../internals/fails": 34}],
    17: [function (e, t, n) {
        "use strict";
        var r = e("../internals/iterators-core").IteratorPrototype, i = e("../internals/object-create"),
            o = e("../internals/create-property-descriptor"), s = e("../internals/set-to-string-tag"),
            a = e("../internals/iterators"), l = function () {
                return this
            };
        t.exports = function (e, t, n, c) {
            var u = t + " Iterator";
            return e.prototype = i(r, {next: o(+!c, n)}), s(e, u, !1, !0), a[u] = l, e
        }
    }, {
        "../internals/create-property-descriptor": 19,
        "../internals/iterators": 64,
        "../internals/iterators-core": 63,
        "../internals/object-create": 72,
        "../internals/set-to-string-tag": 93
    }],
    18: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/object-define-property"),
            o = e("../internals/create-property-descriptor");
        t.exports = r ? function (e, t, n) {
            return i.f(e, t, o(1, n))
        } : function (e, t, n) {
            return e[t] = n, e
        }
    }, {
        "../internals/create-property-descriptor": 19,
        "../internals/descriptors": 26,
        "../internals/object-define-property": 74
    }],
    19: [function (e, t, n) {
        t.exports = function (e, t) {
            return {enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t}
        }
    }, {}],
    20: [function (e, t, n) {
        "use strict";
        var r = e("../internals/to-property-key"), i = e("../internals/object-define-property"),
            o = e("../internals/create-property-descriptor");
        t.exports = function (e, t, n) {
            var s = r(t);
            s in e ? i.f(e, s, o(0, n)) : e[s] = n
        }
    }, {
        "../internals/create-property-descriptor": 19,
        "../internals/object-define-property": 74,
        "../internals/to-property-key": 105
    }],
    21: [function (e, t, n) {
        var r = e("../internals/make-built-in"), i = e("../internals/object-define-property");
        t.exports = function (e, t, n) {
            return n.get && r(n.get, t, {getter: !0}), n.set && r(n.set, t, {setter: !0}), i.f(e, t, n)
        }
    }, {"../internals/make-built-in": 66, "../internals/object-define-property": 74}],
    22: [function (e, t, n) {
        var r = e("../internals/is-callable"), i = e("../internals/object-define-property"),
            o = e("../internals/make-built-in"), s = e("../internals/define-global-property");
        t.exports = function (e, t, n, a) {
            a || (a = {});
            var l = a.enumerable, c = void 0 !== a.name ? a.name : t;
            if (r(n) && o(n, c, a), a.global) l ? e[t] = n : s(t, n); else {
                try {
                    a.unsafe ? e[t] && (l = !0) : delete e[t]
                } catch (e) {
                }
                l ? e[t] = n : i.f(e, t, {
                    value: n,
                    enumerable: !1,
                    configurable: !a.nonConfigurable,
                    writable: !a.nonWritable
                })
            }
            return e
        }
    }, {
        "../internals/define-global-property": 24,
        "../internals/is-callable": 56,
        "../internals/make-built-in": 66,
        "../internals/object-define-property": 74
    }],
    23: [function (e, t, n) {
        var r = e("../internals/define-built-in");
        t.exports = function (e, t, n) {
            for (var i in t) r(e, i, t[i], n);
            return e
        }
    }, {"../internals/define-built-in": 22}],
    24: [function (e, t, n) {
        var r = e("../internals/global"), i = Object.defineProperty;
        t.exports = function (e, t) {
            try {
                i(r, e, {value: t, configurable: !0, writable: !0})
            } catch (n) {
                r[e] = t
            }
            return t
        }
    }, {"../internals/global": 47}],
    25: [function (e, t, n) {
        "use strict";
        var r = e("../internals/export"), i = e("../internals/function-call"), o = e("../internals/is-pure"),
            s = e("../internals/function-name"), a = e("../internals/is-callable"),
            l = e("../internals/create-iterator-constructor"), c = e("../internals/object-get-prototype-of"),
            u = e("../internals/object-set-prototype-of"), d = e("../internals/set-to-string-tag"),
            f = e("../internals/create-non-enumerable-property"), p = e("../internals/define-built-in"),
            h = e("../internals/well-known-symbol"), y = e("../internals/iterators"),
            m = e("../internals/iterators-core"), v = s.PROPER, g = s.CONFIGURABLE, b = m.IteratorPrototype,
            w = m.BUGGY_SAFARI_ITERATORS, _ = h("iterator"), x = "keys", k = "values", j = "entries", C = function () {
                return this
            };
        t.exports = function (e, t, n, s, h, m, E) {
            l(n, t, s);
            var S, D, O, P = function (e) {
                    if (e === h && T) return T;
                    if (!w && e in M) return M[e];
                    switch (e) {
                        case x:
                        case k:
                        case j:
                            return function () {
                                return new n(this, e)
                            }
                    }
                    return function () {
                        return new n(this)
                    }
                }, B = t + " Iterator", A = !1, M = e.prototype, I = M[_] || M["@@iterator"] || h && M[h],
                T = !w && I || P(h), L = "Array" == t && M.entries || I;
            if (L && (S = c(L.call(new e))) !== Object.prototype && S.next && (o || c(S) === b || (u ? u(S, b) : a(S[_]) || p(S, _, C)), d(S, B, !0, !0), o && (y[B] = C)), v && h == k && I && I.name !== k && (!o && g ? f(M, "name", k) : (A = !0, T = function () {
                return i(I, this)
            })), h) if (D = {
                values: P(k),
                keys: m ? T : P(x),
                entries: P(j)
            }, E) for (O in D) (w || A || !(O in M)) && p(M, O, D[O]); else r({
                target: t,
                proto: !0,
                forced: w || A
            }, D);
            return o && !E || M[_] === T || p(M, _, T, {name: h}), y[t] = T, D
        }
    }, {
        "../internals/create-iterator-constructor": 17,
        "../internals/create-non-enumerable-property": 18,
        "../internals/define-built-in": 22,
        "../internals/export": 33,
        "../internals/function-call": 39,
        "../internals/function-name": 40,
        "../internals/is-callable": 56,
        "../internals/is-pure": 60,
        "../internals/iterators": 64,
        "../internals/iterators-core": 63,
        "../internals/object-get-prototype-of": 78,
        "../internals/object-set-prototype-of": 83,
        "../internals/set-to-string-tag": 93,
        "../internals/well-known-symbol": 113
    }],
    26: [function (e, t, n) {
        var r = e("../internals/fails");
        t.exports = !r((function () {
            return 7 != Object.defineProperty({}, 1, {
                get: function () {
                    return 7
                }
            })[1]
        }))
    }, {"../internals/fails": 34}],
    27: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/is-object"), o = r.document,
            s = i(o) && i(o.createElement);
        t.exports = function (e) {
            return s ? o.createElement(e) : {}
        }
    }, {"../internals/global": 47, "../internals/is-object": 59}],
    28: [function (e, t, n) {
        t.exports = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0
        }
    }, {}],
    29: [function (e, t, n) {
        var r = e("../internals/document-create-element")("span").classList,
            i = r && r.constructor && r.constructor.prototype;
        t.exports = i === Object.prototype ? void 0 : i
    }, {"../internals/document-create-element": 27}],
    30: [function (e, t, n) {
        var r = e("../internals/get-built-in");
        t.exports = r("navigator", "userAgent") || ""
    }, {"../internals/get-built-in": 42}],
    31: [function (e, t, n) {
        var r, i, o = e("../internals/global"), s = e("../internals/engine-user-agent"), a = o.process, l = o.Deno,
            c = a && a.versions || l && l.version, u = c && c.v8;
        u && (i = (r = u.split("."))[0] > 0 && r[0] < 4 ? 1 : +(r[0] + r[1])), !i && s && (!(r = s.match(/Edge\/(\d+)/)) || r[1] >= 74) && (r = s.match(/Chrome\/(\d+)/)) && (i = +r[1]), t.exports = i
    }, {"../internals/engine-user-agent": 30, "../internals/global": 47}],
    32: [function (e, t, n) {
        t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
    }, {}],
    33: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/object-get-own-property-descriptor").f,
            o = e("../internals/create-non-enumerable-property"), s = e("../internals/define-built-in"),
            a = e("../internals/define-global-property"), l = e("../internals/copy-constructor-properties"),
            c = e("../internals/is-forced");
        t.exports = function (e, t) {
            var n, u, d, f, p, h = e.target, y = e.global, m = e.stat;
            if (n = y ? r : m ? r[h] || a(h, {}) : (r[h] || {}).prototype) for (u in t) {
                if (f = t[u], d = e.dontCallGetSet ? (p = i(n, u)) && p.value : n[u], !c(y ? u : h + (m ? "." : "#") + u, e.forced) && void 0 !== d) {
                    if (typeof f == typeof d) continue;
                    l(f, d)
                }
                (e.sham || d && d.sham) && o(f, "sham", !0), s(n, u, f, e)
            }
        }
    }, {
        "../internals/copy-constructor-properties": 15,
        "../internals/create-non-enumerable-property": 18,
        "../internals/define-built-in": 22,
        "../internals/define-global-property": 24,
        "../internals/global": 47,
        "../internals/is-forced": 58,
        "../internals/object-get-own-property-descriptor": 75
    }],
    34: [function (e, t, n) {
        t.exports = function (e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    }, {}],
    35: [function (e, t, n) {
        "use strict";
        e("../modules/es.regexp.exec");
        var r = e("../internals/function-uncurry-this"), i = e("../internals/define-built-in"),
            o = e("../internals/regexp-exec"), s = e("../internals/fails"), a = e("../internals/well-known-symbol"),
            l = e("../internals/create-non-enumerable-property"), c = a("species"), u = RegExp.prototype;
        t.exports = function (e, t, n, d) {
            var f = a(e), p = !s((function () {
                var t = {};
                return t[f] = function () {
                    return 7
                }, 7 != ""[e](t)
            })), h = p && !s((function () {
                var t = !1, n = /a/;
                return "split" === e && ((n = {}).constructor = {}, n.constructor[c] = function () {
                    return n
                }, n.flags = "", n[f] = /./[f]), n.exec = function () {
                    return t = !0, null
                }, n[f](""), !t
            }));
            if (!p || !h || n) {
                var y = r(/./[f]), m = t(f, ""[e], (function (e, t, n, i, s) {
                    var a = r(e), l = t.exec;
                    return l === o || l === u.exec ? p && !s ? {done: !0, value: y(t, n, i)} : {
                        done: !0,
                        value: a(n, t, i)
                    } : {done: !1}
                }));
                i(String.prototype, e, m[0]), i(u, f, m[1])
            }
            d && l(u[f], "sham", !0)
        }
    }, {
        "../internals/create-non-enumerable-property": 18,
        "../internals/define-built-in": 22,
        "../internals/fails": 34,
        "../internals/function-uncurry-this": 41,
        "../internals/regexp-exec": 87,
        "../internals/well-known-symbol": 113,
        "../modules/es.regexp.exec": 115
    }],
    36: [function (e, t, n) {
        var r = e("../internals/function-bind-native"), i = Function.prototype, o = i.apply, s = i.call;
        t.exports = "object" == typeof Reflect && Reflect.apply || (r ? s.bind(o) : function () {
            return s.apply(o, arguments)
        })
    }, {"../internals/function-bind-native": 38}],
    37: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/a-callable"),
            o = e("../internals/function-bind-native"), s = r(r.bind);
        t.exports = function (e, t) {
            return i(e), void 0 === t ? e : o ? s(e, t) : function () {
                return e.apply(t, arguments)
            }
        }
    }, {
        "../internals/a-callable": 2,
        "../internals/function-bind-native": 38,
        "../internals/function-uncurry-this": 41
    }],
    38: [function (e, t, n) {
        var r = e("../internals/fails");
        t.exports = !r((function () {
            var e = function () {
            }.bind();
            return "function" != typeof e || e.hasOwnProperty("prototype")
        }))
    }, {"../internals/fails": 34}],
    39: [function (e, t, n) {
        var r = e("../internals/function-bind-native"), i = Function.prototype.call;
        t.exports = r ? i.bind(i) : function () {
            return i.apply(i, arguments)
        }
    }, {"../internals/function-bind-native": 38}],
    40: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/has-own-property"), o = Function.prototype,
            s = r && Object.getOwnPropertyDescriptor, a = i(o, "name"), l = a && "something" === function () {
            }.name, c = a && (!r || r && s(o, "name").configurable);
        t.exports = {EXISTS: a, PROPER: l, CONFIGURABLE: c}
    }, {"../internals/descriptors": 26, "../internals/has-own-property": 48}],
    41: [function (e, t, n) {
        var r = e("../internals/function-bind-native"), i = Function.prototype, o = i.bind, s = i.call,
            a = r && o.bind(s, s);
        t.exports = r ? function (e) {
            return e && a(e)
        } : function (e) {
            return e && function () {
                return s.apply(e, arguments)
            }
        }
    }, {"../internals/function-bind-native": 38}],
    42: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/is-callable"), o = function (e) {
            return i(e) ? e : void 0
        };
        t.exports = function (e, t) {
            return arguments.length < 2 ? o(r[e]) : r[e] && r[e][t]
        }
    }, {"../internals/global": 47, "../internals/is-callable": 56}],
    43: [function (e, t, n) {
        var r = e("../internals/classof"), i = e("../internals/get-method"), o = e("../internals/iterators"),
            s = e("../internals/well-known-symbol")("iterator");
        t.exports = function (e) {
            if (null != e) return i(e, s) || i(e, "@@iterator") || o[r(e)]
        }
    }, {
        "../internals/classof": 14,
        "../internals/get-method": 45,
        "../internals/iterators": 64,
        "../internals/well-known-symbol": 113
    }],
    44: [function (e, t, n) {
        var r = e("../internals/function-call"), i = e("../internals/a-callable"), o = e("../internals/an-object"),
            s = e("../internals/try-to-string"), a = e("../internals/get-iterator-method"), l = TypeError;
        t.exports = function (e, t) {
            var n = arguments.length < 2 ? a(e) : t;
            if (i(n)) return o(r(n, e));
            throw l(s(e) + " is not iterable")
        }
    }, {
        "../internals/a-callable": 2,
        "../internals/an-object": 7,
        "../internals/function-call": 39,
        "../internals/get-iterator-method": 43,
        "../internals/try-to-string": 108
    }],
    45: [function (e, t, n) {
        var r = e("../internals/a-callable");
        t.exports = function (e, t) {
            var n = e[t];
            return null == n ? void 0 : r(n)
        }
    }, {"../internals/a-callable": 2}],
    46: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/to-object"), o = Math.floor,
            s = r("".charAt), a = r("".replace), l = r("".slice), c = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
            u = /\$([$&'`]|\d{1,2})/g;
        t.exports = function (e, t, n, r, d, f) {
            var p = n + e.length, h = r.length, y = u;
            return void 0 !== d && (d = i(d), y = c), a(f, y, (function (i, a) {
                var c;
                switch (s(a, 0)) {
                    case"$":
                        return "$";
                    case"&":
                        return e;
                    case"`":
                        return l(t, 0, n);
                    case"'":
                        return l(t, p);
                    case"<":
                        c = d[l(a, 1, -1)];
                        break;
                    default:
                        var u = +a;
                        if (0 === u) return i;
                        if (u > h) {
                            var f = o(u / 10);
                            return 0 === f ? i : f <= h ? void 0 === r[f - 1] ? s(a, 1) : r[f - 1] + s(a, 1) : i
                        }
                        c = r[u - 1]
                }
                return void 0 === c ? "" : c
            }))
        }
    }, {"../internals/function-uncurry-this": 41, "../internals/to-object": 103}],
    47: [function (e, t, n) {
        (function (e) {
            (function () {
                var n = function (e) {
                    return e && e.Math == Math && e
                };
                t.exports = n("object" == typeof globalThis && globalThis) || n("object" == typeof window && window) || n("object" == typeof self && self) || n("object" == typeof e && e) || function () {
                    return this
                }() || Function("return this")()
            }).call(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    48: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/to-object"), o = r({}.hasOwnProperty);
        t.exports = Object.hasOwn || function (e, t) {
            return o(i(e), t)
        }
    }, {"../internals/function-uncurry-this": 41, "../internals/to-object": 103}],
    49: [function (e, t, n) {
        t.exports = {}
    }, {}],
    50: [function (e, t, n) {
        var r = e("../internals/get-built-in");
        t.exports = r("document", "documentElement")
    }, {"../internals/get-built-in": 42}],
    51: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/fails"),
            o = e("../internals/document-create-element");
        t.exports = !r && !i((function () {
            return 7 != Object.defineProperty(o("div"), "a", {
                get: function () {
                    return 7
                }
            }).a
        }))
    }, {"../internals/descriptors": 26, "../internals/document-create-element": 27, "../internals/fails": 34}],
    52: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/fails"), o = e("../internals/classof-raw"),
            s = Object, a = r("".split);
        t.exports = i((function () {
            return !s("z").propertyIsEnumerable(0)
        })) ? function (e) {
            return "String" == o(e) ? a(e, "") : s(e)
        } : s
    }, {"../internals/classof-raw": 13, "../internals/fails": 34, "../internals/function-uncurry-this": 41}],
    53: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/is-callable"),
            o = e("../internals/shared-store"), s = r(Function.toString);
        i(o.inspectSource) || (o.inspectSource = function (e) {
            return s(e)
        }), t.exports = o.inspectSource
    }, {"../internals/function-uncurry-this": 41, "../internals/is-callable": 56, "../internals/shared-store": 95}],
    54: [function (e, t, n) {
        var r, i, o, s = e("../internals/native-weak-map"), a = e("../internals/global"),
            l = e("../internals/function-uncurry-this"), c = e("../internals/is-object"),
            u = e("../internals/create-non-enumerable-property"), d = e("../internals/has-own-property"),
            f = e("../internals/shared-store"), p = e("../internals/shared-key"), h = e("../internals/hidden-keys"),
            y = "Object already initialized", m = a.TypeError, v = a.WeakMap;
        if (s || f.state) {
            var g = f.state || (f.state = new v), b = l(g.get), w = l(g.has), _ = l(g.set);
            r = function (e, t) {
                if (w(g, e)) throw new m(y);
                return t.facade = e, _(g, e, t), t
            }, i = function (e) {
                return b(g, e) || {}
            }, o = function (e) {
                return w(g, e)
            }
        } else {
            var x = p("state");
            h[x] = !0, r = function (e, t) {
                if (d(e, x)) throw new m(y);
                return t.facade = e, u(e, x, t), t
            }, i = function (e) {
                return d(e, x) ? e[x] : {}
            }, o = function (e) {
                return d(e, x)
            }
        }
        t.exports = {
            set: r, get: i, has: o, enforce: function (e) {
                return o(e) ? i(e) : r(e, {})
            }, getterFor: function (e) {
                return function (t) {
                    var n;
                    if (!c(t) || (n = i(t)).type !== e) throw m("Incompatible receiver, " + e + " required");
                    return n
                }
            }
        }
    }, {
        "../internals/create-non-enumerable-property": 18,
        "../internals/function-uncurry-this": 41,
        "../internals/global": 47,
        "../internals/has-own-property": 48,
        "../internals/hidden-keys": 49,
        "../internals/is-object": 59,
        "../internals/native-weak-map": 70,
        "../internals/shared-key": 94,
        "../internals/shared-store": 95
    }],
    55: [function (e, t, n) {
        var r = e("../internals/well-known-symbol"), i = e("../internals/iterators"), o = r("iterator"),
            s = Array.prototype;
        t.exports = function (e) {
            return void 0 !== e && (i.Array === e || s[o] === e)
        }
    }, {"../internals/iterators": 64, "../internals/well-known-symbol": 113}],
    56: [function (e, t, n) {
        t.exports = function (e) {
            return "function" == typeof e
        }
    }, {}],
    57: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/fails"), o = e("../internals/is-callable"),
            s = e("../internals/classof"), a = e("../internals/get-built-in"), l = e("../internals/inspect-source"),
            c = function () {
            }, u = [], d = a("Reflect", "construct"), f = /^\s*(?:class|function)\b/, p = r(f.exec), h = !f.exec(c),
            y = function (e) {
                if (!o(e)) return !1;
                try {
                    return d(c, u, e), !0
                } catch (e) {
                    return !1
                }
            }, m = function (e) {
                if (!o(e)) return !1;
                switch (s(e)) {
                    case"AsyncFunction":
                    case"GeneratorFunction":
                    case"AsyncGeneratorFunction":
                        return !1
                }
                try {
                    return h || !!p(f, l(e))
                } catch (e) {
                    return !0
                }
            };
        m.sham = !0, t.exports = !d || i((function () {
            var e;
            return y(y.call) || !y(Object) || !y((function () {
                e = !0
            })) || e
        })) ? m : y
    }, {
        "../internals/classof": 14,
        "../internals/fails": 34,
        "../internals/function-uncurry-this": 41,
        "../internals/get-built-in": 42,
        "../internals/inspect-source": 53,
        "../internals/is-callable": 56
    }],
    58: [function (e, t, n) {
        var r = e("../internals/fails"), i = e("../internals/is-callable"), o = /#|\.prototype\./, s = function (e, t) {
            var n = l[a(e)];
            return n == u || n != c && (i(t) ? r(t) : !!t)
        }, a = s.normalize = function (e) {
            return String(e).replace(o, ".").toLowerCase()
        }, l = s.data = {}, c = s.NATIVE = "N", u = s.POLYFILL = "P";
        t.exports = s
    }, {"../internals/fails": 34, "../internals/is-callable": 56}],
    59: [function (e, t, n) {
        var r = e("../internals/is-callable");
        t.exports = function (e) {
            return "object" == typeof e ? null !== e : r(e)
        }
    }, {"../internals/is-callable": 56}],
    60: [function (e, t, n) {
        t.exports = !1
    }, {}],
    61: [function (e, t, n) {
        var r = e("../internals/get-built-in"), i = e("../internals/is-callable"),
            o = e("../internals/object-is-prototype-of"), s = e("../internals/use-symbol-as-uid"), a = Object;
        t.exports = s ? function (e) {
            return "symbol" == typeof e
        } : function (e) {
            var t = r("Symbol");
            return i(t) && o(t.prototype, a(e))
        }
    }, {
        "../internals/get-built-in": 42,
        "../internals/is-callable": 56,
        "../internals/object-is-prototype-of": 79,
        "../internals/use-symbol-as-uid": 110
    }],
    62: [function (e, t, n) {
        var r = e("../internals/function-call"), i = e("../internals/an-object"), o = e("../internals/get-method");
        t.exports = function (e, t, n) {
            var s, a;
            i(e);
            try {
                if (!(s = o(e, "return"))) {
                    if ("throw" === t) throw n;
                    return n
                }
                s = r(s, e)
            } catch (e) {
                a = !0, s = e
            }
            if ("throw" === t) throw n;
            if (a) throw s;
            return i(s), n
        }
    }, {"../internals/an-object": 7, "../internals/function-call": 39, "../internals/get-method": 45}],
    63: [function (e, t, n) {
        "use strict";
        var r, i, o, s = e("../internals/fails"), a = e("../internals/is-callable"),
            l = e("../internals/object-create"), c = e("../internals/object-get-prototype-of"),
            u = e("../internals/define-built-in"), d = e("../internals/well-known-symbol"),
            f = e("../internals/is-pure"), p = d("iterator"), h = !1;
        [].keys && ("next" in (o = [].keys()) ? (i = c(c(o))) !== Object.prototype && (r = i) : h = !0), null == r || s((function () {
            var e = {};
            return r[p].call(e) !== e
        })) ? r = {} : f && (r = l(r)), a(r[p]) || u(r, p, (function () {
            return this
        })), t.exports = {IteratorPrototype: r, BUGGY_SAFARI_ITERATORS: h}
    }, {
        "../internals/define-built-in": 22,
        "../internals/fails": 34,
        "../internals/is-callable": 56,
        "../internals/is-pure": 60,
        "../internals/object-create": 72,
        "../internals/object-get-prototype-of": 78,
        "../internals/well-known-symbol": 113
    }],
    64: [function (e, t, n) {
        arguments[4][49][0].apply(n, arguments)
    }, {dup: 49}],
    65: [function (e, t, n) {
        var r = e("../internals/to-length");
        t.exports = function (e) {
            return r(e.length)
        }
    }, {"../internals/to-length": 102}],
    66: [function (e, t, n) {
        var r = e("../internals/fails"), i = e("../internals/is-callable"), o = e("../internals/has-own-property"),
            s = e("../internals/descriptors"), a = e("../internals/function-name").CONFIGURABLE,
            l = e("../internals/inspect-source"), c = e("../internals/internal-state"), u = c.enforce, d = c.get,
            f = Object.defineProperty, p = s && !r((function () {
                return 8 !== f((function () {
                }), "length", {value: 8}).length
            })), h = String(String).split("String"), y = t.exports = function (e, t, n) {
                "Symbol(" === String(t).slice(0, 7) && (t = "[" + String(t).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), n && n.getter && (t = "get " + t), n && n.setter && (t = "set " + t), (!o(e, "name") || a && e.name !== t) && (s ? f(e, "name", {
                    value: t,
                    configurable: !0
                }) : e.name = t), p && n && o(n, "arity") && e.length !== n.arity && f(e, "length", {value: n.arity});
                try {
                    n && o(n, "constructor") && n.constructor ? s && f(e, "prototype", {writable: !1}) : e.prototype && (e.prototype = void 0)
                } catch (e) {
                }
                var r = u(e);
                return o(r, "source") || (r.source = h.join("string" == typeof t ? t : "")), e
            };
        Function.prototype.toString = y((function () {
            return i(this) && d(this).source || l(this)
        }), "toString")
    }, {
        "../internals/descriptors": 26,
        "../internals/fails": 34,
        "../internals/function-name": 40,
        "../internals/has-own-property": 48,
        "../internals/inspect-source": 53,
        "../internals/internal-state": 54,
        "../internals/is-callable": 56
    }],
    67: [function (e, t, n) {
        var r = Math.ceil, i = Math.floor;
        t.exports = Math.trunc || function (e) {
            var t = +e;
            return (t > 0 ? i : r)(t)
        }
    }, {}],
    68: [function (e, t, n) {
        var r = e("../internals/engine-v8-version"), i = e("../internals/fails");
        t.exports = !!Object.getOwnPropertySymbols && !i((function () {
            var e = Symbol();
            return !String(e) || !(Object(e) instanceof Symbol) || !Symbol.sham && r && r < 41
        }))
    }, {"../internals/engine-v8-version": 31, "../internals/fails": 34}],
    69: [function (e, t, n) {
        var r = e("../internals/fails"), i = e("../internals/well-known-symbol"), o = e("../internals/is-pure"),
            s = i("iterator");
        t.exports = !r((function () {
            var e = new URL("b?a=1&b=2&c=3", "http://a"), t = e.searchParams, n = "";
            return e.pathname = "c%20d", t.forEach((function (e, r) {
                t.delete("b"), n += r + e
            })), o && !e.toJSON || !t.sort || "http://a/c%20d?a=1&c=3" !== e.href || "3" !== t.get("c") || "a=1" !== String(new URLSearchParams("?a=1")) || !t[s] || "a" !== new URL("https://a@b").username || "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") || "xn--e1aybc" !== new URL("http://тест").host || "#%D0%B1" !== new URL("http://a#б").hash || "a1c3" !== n || "x" !== new URL("http://x", void 0).host
        }))
    }, {"../internals/fails": 34, "../internals/is-pure": 60, "../internals/well-known-symbol": 113}],
    70: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/is-callable"), o = e("../internals/inspect-source"),
            s = r.WeakMap;
        t.exports = i(s) && /native code/.test(o(s))
    }, {"../internals/global": 47, "../internals/inspect-source": 53, "../internals/is-callable": 56}],
    71: [function (e, t, n) {
        "use strict";
        var r = e("../internals/descriptors"), i = e("../internals/function-uncurry-this"),
            o = e("../internals/function-call"), s = e("../internals/fails"), a = e("../internals/object-keys"),
            l = e("../internals/object-get-own-property-symbols"), c = e("../internals/object-property-is-enumerable"),
            u = e("../internals/to-object"), d = e("../internals/indexed-object"), f = Object.assign,
            p = Object.defineProperty, h = i([].concat);
        t.exports = !f || s((function () {
            if (r && 1 !== f({b: 1}, f(p({}, "a", {
                enumerable: !0, get: function () {
                    p(this, "b", {value: 3, enumerable: !1})
                }
            }), {b: 2})).b) return !0;
            var e = {}, t = {}, n = Symbol(), i = "abcdefghijklmnopqrst";
            return e[n] = 7, i.split("").forEach((function (e) {
                t[e] = e
            })), 7 != f({}, e)[n] || a(f({}, t)).join("") != i
        })) ? function (e, t) {
            for (var n = u(e), i = arguments.length, s = 1, f = l.f, p = c.f; i > s;) for (var y, m = d(arguments[s++]), v = f ? h(a(m), f(m)) : a(m), g = v.length, b = 0; g > b;) y = v[b++], r && !o(p, m, y) || (n[y] = m[y]);
            return n
        } : f
    }, {
        "../internals/descriptors": 26,
        "../internals/fails": 34,
        "../internals/function-call": 39,
        "../internals/function-uncurry-this": 41,
        "../internals/indexed-object": 52,
        "../internals/object-get-own-property-symbols": 77,
        "../internals/object-keys": 81,
        "../internals/object-property-is-enumerable": 82,
        "../internals/to-object": 103
    }],
    72: [function (e, t, n) {
        var r, i = e("../internals/an-object"), o = e("../internals/object-define-properties"),
            s = e("../internals/enum-bug-keys"), a = e("../internals/hidden-keys"), l = e("../internals/html"),
            c = e("../internals/document-create-element"), u = e("../internals/shared-key"), d = u("IE_PROTO"),
            f = function () {
            }, p = function (e) {
                return "<script>" + e + "</" + "script>"
            }, h = function (e) {
                e.write(p("")), e.close();
                var t = e.parentWindow.Object;
                return e = null, t
            }, y = function () {
                try {
                    r = new ActiveXObject("htmlfile")
                } catch (e) {
                }
                var e, t;
                y = "undefined" != typeof document ? document.domain && r ? h(r) : ((t = c("iframe")).style.display = "none", l.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(p("document.F=Object")), e.close(), e.F) : h(r);
                for (var n = s.length; n--;) delete y.prototype[s[n]];
                return y()
            };
        a[d] = !0, t.exports = Object.create || function (e, t) {
            var n;
            return null !== e ? (f.prototype = i(e), n = new f, f.prototype = null, n[d] = e) : n = y(), void 0 === t ? n : o.f(n, t)
        }
    }, {
        "../internals/an-object": 7,
        "../internals/document-create-element": 27,
        "../internals/enum-bug-keys": 32,
        "../internals/hidden-keys": 49,
        "../internals/html": 50,
        "../internals/object-define-properties": 73,
        "../internals/shared-key": 94
    }],
    73: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/v8-prototype-define-bug"),
            o = e("../internals/object-define-property"), s = e("../internals/an-object"),
            a = e("../internals/to-indexed-object"), l = e("../internals/object-keys");
        n.f = r && !i ? Object.defineProperties : function (e, t) {
            s(e);
            for (var n, r = a(t), i = l(t), c = i.length, u = 0; c > u;) o.f(e, n = i[u++], r[n]);
            return e
        }
    }, {
        "../internals/an-object": 7,
        "../internals/descriptors": 26,
        "../internals/object-define-property": 74,
        "../internals/object-keys": 81,
        "../internals/to-indexed-object": 100,
        "../internals/v8-prototype-define-bug": 111
    }],
    74: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/ie8-dom-define"),
            o = e("../internals/v8-prototype-define-bug"), s = e("../internals/an-object"),
            a = e("../internals/to-property-key"), l = TypeError, c = Object.defineProperty,
            u = Object.getOwnPropertyDescriptor, d = "enumerable", f = "configurable", p = "writable";
        n.f = r ? o ? function (e, t, n) {
            if (s(e), t = a(t), s(n), "function" == typeof e && "prototype" === t && "value" in n && p in n && !n.writable) {
                var r = u(e, t);
                r && r.writable && (e[t] = n.value, n = {
                    configurable: f in n ? n.configurable : r.configurable,
                    enumerable: d in n ? n.enumerable : r.enumerable,
                    writable: !1
                })
            }
            return c(e, t, n)
        } : c : function (e, t, n) {
            if (s(e), t = a(t), s(n), i) try {
                return c(e, t, n)
            } catch (e) {
            }
            if ("get" in n || "set" in n) throw l("Accessors not supported");
            return "value" in n && (e[t] = n.value), e
        }
    }, {
        "../internals/an-object": 7,
        "../internals/descriptors": 26,
        "../internals/ie8-dom-define": 51,
        "../internals/to-property-key": 105,
        "../internals/v8-prototype-define-bug": 111
    }],
    75: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/function-call"),
            o = e("../internals/object-property-is-enumerable"), s = e("../internals/create-property-descriptor"),
            a = e("../internals/to-indexed-object"), l = e("../internals/to-property-key"),
            c = e("../internals/has-own-property"), u = e("../internals/ie8-dom-define"),
            d = Object.getOwnPropertyDescriptor;
        n.f = r ? d : function (e, t) {
            if (e = a(e), t = l(t), u) try {
                return d(e, t)
            } catch (e) {
            }
            if (c(e, t)) return s(!i(o.f, e, t), e[t])
        }
    }, {
        "../internals/create-property-descriptor": 19,
        "../internals/descriptors": 26,
        "../internals/function-call": 39,
        "../internals/has-own-property": 48,
        "../internals/ie8-dom-define": 51,
        "../internals/object-property-is-enumerable": 82,
        "../internals/to-indexed-object": 100,
        "../internals/to-property-key": 105
    }],
    76: [function (e, t, n) {
        var r = e("../internals/object-keys-internal"),
            i = e("../internals/enum-bug-keys").concat("length", "prototype");
        n.f = Object.getOwnPropertyNames || function (e) {
            return r(e, i)
        }
    }, {"../internals/enum-bug-keys": 32, "../internals/object-keys-internal": 80}],
    77: [function (e, t, n) {
        n.f = Object.getOwnPropertySymbols
    }, {}],
    78: [function (e, t, n) {
        var r = e("../internals/has-own-property"), i = e("../internals/is-callable"), o = e("../internals/to-object"),
            s = e("../internals/shared-key"), a = e("../internals/correct-prototype-getter"), l = s("IE_PROTO"),
            c = Object, u = c.prototype;
        t.exports = a ? c.getPrototypeOf : function (e) {
            var t = o(e);
            if (r(t, l)) return t[l];
            var n = t.constructor;
            return i(n) && t instanceof n ? n.prototype : t instanceof c ? u : null
        }
    }, {
        "../internals/correct-prototype-getter": 16,
        "../internals/has-own-property": 48,
        "../internals/is-callable": 56,
        "../internals/shared-key": 94,
        "../internals/to-object": 103
    }],
    79: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this");
        t.exports = r({}.isPrototypeOf)
    }, {"../internals/function-uncurry-this": 41}],
    80: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/has-own-property"),
            o = e("../internals/to-indexed-object"), s = e("../internals/array-includes").indexOf,
            a = e("../internals/hidden-keys"), l = r([].push);
        t.exports = function (e, t) {
            var n, r = o(e), c = 0, u = [];
            for (n in r) !i(a, n) && i(r, n) && l(u, n);
            for (; t.length > c;) i(r, n = t[c++]) && (~s(u, n) || l(u, n));
            return u
        }
    }, {
        "../internals/array-includes": 9,
        "../internals/function-uncurry-this": 41,
        "../internals/has-own-property": 48,
        "../internals/hidden-keys": 49,
        "../internals/to-indexed-object": 100
    }],
    81: [function (e, t, n) {
        var r = e("../internals/object-keys-internal"), i = e("../internals/enum-bug-keys");
        t.exports = Object.keys || function (e) {
            return r(e, i)
        }
    }, {"../internals/enum-bug-keys": 32, "../internals/object-keys-internal": 80}],
    82: [function (e, t, n) {
        "use strict";
        var r = {}.propertyIsEnumerable, i = Object.getOwnPropertyDescriptor, o = i && !r.call({1: 2}, 1);
        n.f = o ? function (e) {
            var t = i(this, e);
            return !!t && t.enumerable
        } : r
    }, {}],
    83: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/an-object"),
            o = e("../internals/a-possible-prototype");
        t.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
            var e, t = !1, n = {};
            try {
                (e = r(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set))(n, []), t = n instanceof Array
            } catch (e) {
            }
            return function (n, r) {
                return i(n), o(r), t ? e(n, r) : n.__proto__ = r, n
            }
        }() : void 0)
    }, {"../internals/a-possible-prototype": 3, "../internals/an-object": 7, "../internals/function-uncurry-this": 41}],
    84: [function (e, t, n) {
        var r = e("../internals/function-call"), i = e("../internals/is-callable"), o = e("../internals/is-object"),
            s = TypeError;
        t.exports = function (e, t) {
            var n, a;
            if ("string" === t && i(n = e.toString) && !o(a = r(n, e))) return a;
            if (i(n = e.valueOf) && !o(a = r(n, e))) return a;
            if ("string" !== t && i(n = e.toString) && !o(a = r(n, e))) return a;
            throw s("Can't convert object to primitive value")
        }
    }, {"../internals/function-call": 39, "../internals/is-callable": 56, "../internals/is-object": 59}],
    85: [function (e, t, n) {
        var r = e("../internals/get-built-in"), i = e("../internals/function-uncurry-this"),
            o = e("../internals/object-get-own-property-names"), s = e("../internals/object-get-own-property-symbols"),
            a = e("../internals/an-object"), l = i([].concat);
        t.exports = r("Reflect", "ownKeys") || function (e) {
            var t = o.f(a(e)), n = s.f;
            return n ? l(t, n(e)) : t
        }
    }, {
        "../internals/an-object": 7,
        "../internals/function-uncurry-this": 41,
        "../internals/get-built-in": 42,
        "../internals/object-get-own-property-names": 76,
        "../internals/object-get-own-property-symbols": 77
    }],
    86: [function (e, t, n) {
        var r = e("../internals/function-call"), i = e("../internals/an-object"), o = e("../internals/is-callable"),
            s = e("../internals/classof-raw"), a = e("../internals/regexp-exec"), l = TypeError;
        t.exports = function (e, t) {
            var n = e.exec;
            if (o(n)) {
                var c = r(n, e, t);
                return null !== c && i(c), c
            }
            if ("RegExp" === s(e)) return r(a, e, t);
            throw l("RegExp#exec called on incompatible receiver")
        }
    }, {
        "../internals/an-object": 7,
        "../internals/classof-raw": 13,
        "../internals/function-call": 39,
        "../internals/is-callable": 56,
        "../internals/regexp-exec": 87
    }],
    87: [function (e, t, n) {
        "use strict";
        var r, i, o = e("../internals/function-call"), s = e("../internals/function-uncurry-this"),
            a = e("../internals/to-string"), l = e("../internals/regexp-flags"),
            c = e("../internals/regexp-sticky-helpers"), u = e("../internals/shared"),
            d = e("../internals/object-create"), f = e("../internals/internal-state").get,
            p = e("../internals/regexp-unsupported-dot-all"), h = e("../internals/regexp-unsupported-ncg"),
            y = u("native-string-replace", String.prototype.replace), m = RegExp.prototype.exec, v = m,
            g = s("".charAt), b = s("".indexOf), w = s("".replace), _ = s("".slice),
            x = (i = /b*/g, o(m, r = /a/, "a"), o(m, i, "a"), 0 !== r.lastIndex || 0 !== i.lastIndex),
            k = c.BROKEN_CARET, j = void 0 !== /()??/.exec("")[1];
        (x || j || k || p || h) && (v = function (e) {
            var t, n, r, i, s, c, u, p = this, h = f(p), C = a(e), E = h.raw;
            if (E) return E.lastIndex = p.lastIndex, t = o(v, E, C), p.lastIndex = E.lastIndex, t;
            var S = h.groups, D = k && p.sticky, O = o(l, p), P = p.source, B = 0, A = C;
            if (D && (O = w(O, "y", ""), -1 === b(O, "g") && (O += "g"), A = _(C, p.lastIndex), p.lastIndex > 0 && (!p.multiline || p.multiline && "\n" !== g(C, p.lastIndex - 1)) && (P = "(?: " + P + ")", A = " " + A, B++), n = new RegExp("^(?:" + P + ")", O)), j && (n = new RegExp("^" + P + "$(?!\\s)", O)), x && (r = p.lastIndex), i = o(m, D ? n : p, A), D ? i ? (i.input = _(i.input, B), i[0] = _(i[0], B), i.index = p.lastIndex, p.lastIndex += i[0].length) : p.lastIndex = 0 : x && i && (p.lastIndex = p.global ? i.index + i[0].length : r), j && i && i.length > 1 && o(y, i[0], n, (function () {
                for (s = 1; s < arguments.length - 2; s++) void 0 === arguments[s] && (i[s] = void 0)
            })), i && S) for (i.groups = c = d(null), s = 0; s < S.length; s++) c[(u = S[s])[0]] = i[u[1]];
            return i
        }), t.exports = v
    }, {
        "../internals/function-call": 39,
        "../internals/function-uncurry-this": 41,
        "../internals/internal-state": 54,
        "../internals/object-create": 72,
        "../internals/regexp-flags": 88,
        "../internals/regexp-sticky-helpers": 89,
        "../internals/regexp-unsupported-dot-all": 90,
        "../internals/regexp-unsupported-ncg": 91,
        "../internals/shared": 96,
        "../internals/to-string": 107
    }],
    88: [function (e, t, n) {
        "use strict";
        var r = e("../internals/an-object");
        t.exports = function () {
            var e = r(this), t = "";
            return e.hasIndices && (t += "d"), e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e.unicode && (t += "u"), e.unicodeSets && (t += "v"), e.sticky && (t += "y"), t
        }
    }, {"../internals/an-object": 7}],
    89: [function (e, t, n) {
        var r = e("../internals/fails"), i = e("../internals/global").RegExp, o = r((function () {
            var e = i("a", "y");
            return e.lastIndex = 2, null != e.exec("abcd")
        })), s = o || r((function () {
            return !i("a", "y").sticky
        })), a = o || r((function () {
            var e = i("^r", "gy");
            return e.lastIndex = 2, null != e.exec("str")
        }));
        t.exports = {BROKEN_CARET: a, MISSED_STICKY: s, UNSUPPORTED_Y: o}
    }, {"../internals/fails": 34, "../internals/global": 47}],
    90: [function (e, t, n) {
        var r = e("../internals/fails"), i = e("../internals/global").RegExp;
        t.exports = r((function () {
            var e = i(".", "s");
            return !(e.dotAll && e.exec("\n") && "s" === e.flags)
        }))
    }, {"../internals/fails": 34, "../internals/global": 47}],
    91: [function (e, t, n) {
        var r = e("../internals/fails"), i = e("../internals/global").RegExp;
        t.exports = r((function () {
            var e = i("(?<a>b)", "g");
            return "b" !== e.exec("b").groups.a || "bc" !== "b".replace(e, "$<a>c")
        }))
    }, {"../internals/fails": 34, "../internals/global": 47}],
    92: [function (e, t, n) {
        var r = TypeError;
        t.exports = function (e) {
            if (null == e) throw r("Can't call method on " + e);
            return e
        }
    }, {}],
    93: [function (e, t, n) {
        var r = e("../internals/object-define-property").f, i = e("../internals/has-own-property"),
            o = e("../internals/well-known-symbol")("toStringTag");
        t.exports = function (e, t, n) {
            e && !n && (e = e.prototype), e && !i(e, o) && r(e, o, {configurable: !0, value: t})
        }
    }, {
        "../internals/has-own-property": 48,
        "../internals/object-define-property": 74,
        "../internals/well-known-symbol": 113
    }],
    94: [function (e, t, n) {
        var r = e("../internals/shared"), i = e("../internals/uid"), o = r("keys");
        t.exports = function (e) {
            return o[e] || (o[e] = i(e))
        }
    }, {"../internals/shared": 96, "../internals/uid": 109}],
    95: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/define-global-property"), o = "__core-js_shared__",
            s = r[o] || i(o, {});
        t.exports = s
    }, {"../internals/define-global-property": 24, "../internals/global": 47}],
    96: [function (e, t, n) {
        var r = e("../internals/is-pure"), i = e("../internals/shared-store");
        (t.exports = function (e, t) {
            return i[e] || (i[e] = void 0 !== t ? t : {})
        })("versions", []).push({
            version: "3.23.5",
            mode: r ? "pure" : "global",
            copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
            license: "https://github.com/zloirock/core-js/blob/v3.23.5/LICENSE",
            source: "https://github.com/zloirock/core-js"
        })
    }, {"../internals/is-pure": 60, "../internals/shared-store": 95}],
    97: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = e("../internals/to-integer-or-infinity"),
            o = e("../internals/to-string"), s = e("../internals/require-object-coercible"), a = r("".charAt),
            l = r("".charCodeAt), c = r("".slice), u = function (e) {
                return function (t, n) {
                    var r, u, d = o(s(t)), f = i(n), p = d.length;
                    return f < 0 || f >= p ? e ? "" : void 0 : (r = l(d, f)) < 55296 || r > 56319 || f + 1 === p || (u = l(d, f + 1)) < 56320 || u > 57343 ? e ? a(d, f) : r : e ? c(d, f, f + 2) : u - 56320 + (r - 55296 << 10) + 65536
                }
            };
        t.exports = {codeAt: u(!1), charAt: u(!0)}
    }, {
        "../internals/function-uncurry-this": 41,
        "../internals/require-object-coercible": 92,
        "../internals/to-integer-or-infinity": 101,
        "../internals/to-string": 107
    }],
    98: [function (e, t, n) {
        "use strict";
        var r = e("../internals/function-uncurry-this"), i = 2147483647, o = /[^\0-\u007E]/,
            s = /[.\u3002\uFF0E\uFF61]/g, a = "Overflow: input needs wider integers to process", l = RangeError,
            c = r(s.exec), u = Math.floor, d = String.fromCharCode, f = r("".charCodeAt), p = r([].join),
            h = r([].push), y = r("".replace), m = r("".split), v = r("".toLowerCase), g = function (e) {
                return e + 22 + 75 * (e < 26)
            }, b = function (e, t, n) {
                var r = 0;
                for (e = n ? u(e / 700) : e >> 1, e += u(e / t); e > 455;) e = u(e / 35), r += 36;
                return u(r + 36 * e / (e + 38))
            }, w = function (e) {
                var t = [];
                e = function (e) {
                    for (var t = [], n = 0, r = e.length; n < r;) {
                        var i = f(e, n++);
                        if (i >= 55296 && i <= 56319 && n < r) {
                            var o = f(e, n++);
                            56320 == (64512 & o) ? h(t, ((1023 & i) << 10) + (1023 & o) + 65536) : (h(t, i), n--)
                        } else h(t, i)
                    }
                    return t
                }(e);
                var n, r, o = e.length, s = 128, c = 0, y = 72;
                for (n = 0; n < e.length; n++) (r = e[n]) < 128 && h(t, d(r));
                var m = t.length, v = m;
                for (m && h(t, "-"); v < o;) {
                    var w = i;
                    for (n = 0; n < e.length; n++) (r = e[n]) >= s && r < w && (w = r);
                    var _ = v + 1;
                    if (w - s > u((i - c) / _)) throw l(a);
                    for (c += (w - s) * _, s = w, n = 0; n < e.length; n++) {
                        if ((r = e[n]) < s && ++c > i) throw l(a);
                        if (r == s) {
                            for (var x = c, k = 36; ;) {
                                var j = k <= y ? 1 : k >= y + 26 ? 26 : k - y;
                                if (x < j) break;
                                var C = x - j, E = 36 - j;
                                h(t, d(g(j + C % E))), x = u(C / E), k += 36
                            }
                            h(t, d(g(x))), y = b(c, _, v == m), c = 0, v++
                        }
                    }
                    c++, s++
                }
                return p(t, "")
            };
        t.exports = function (e) {
            var t, n, r = [], i = m(y(v(e), s, "."), ".");
            for (t = 0; t < i.length; t++) n = i[t], h(r, c(o, n) ? "xn--" + w(n) : n);
            return p(r, ".")
        }
    }, {"../internals/function-uncurry-this": 41}],
    99: [function (e, t, n) {
        var r = e("../internals/to-integer-or-infinity"), i = Math.max, o = Math.min;
        t.exports = function (e, t) {
            var n = r(e);
            return n < 0 ? i(n + t, 0) : o(n, t)
        }
    }, {"../internals/to-integer-or-infinity": 101}],
    100: [function (e, t, n) {
        var r = e("../internals/indexed-object"), i = e("../internals/require-object-coercible");
        t.exports = function (e) {
            return r(i(e))
        }
    }, {"../internals/indexed-object": 52, "../internals/require-object-coercible": 92}],
    101: [function (e, t, n) {
        var r = e("../internals/math-trunc");
        t.exports = function (e) {
            var t = +e;
            return t != t || 0 === t ? 0 : r(t)
        }
    }, {"../internals/math-trunc": 67}],
    102: [function (e, t, n) {
        var r = e("../internals/to-integer-or-infinity"), i = Math.min;
        t.exports = function (e) {
            return e > 0 ? i(r(e), 9007199254740991) : 0
        }
    }, {"../internals/to-integer-or-infinity": 101}],
    103: [function (e, t, n) {
        var r = e("../internals/require-object-coercible"), i = Object;
        t.exports = function (e) {
            return i(r(e))
        }
    }, {"../internals/require-object-coercible": 92}],
    104: [function (e, t, n) {
        var r = e("../internals/function-call"), i = e("../internals/is-object"), o = e("../internals/is-symbol"),
            s = e("../internals/get-method"), a = e("../internals/ordinary-to-primitive"),
            l = e("../internals/well-known-symbol"), c = TypeError, u = l("toPrimitive");
        t.exports = function (e, t) {
            if (!i(e) || o(e)) return e;
            var n, l = s(e, u);
            if (l) {
                if (void 0 === t && (t = "default"), n = r(l, e, t), !i(n) || o(n)) return n;
                throw c("Can't convert object to primitive value")
            }
            return void 0 === t && (t = "number"), a(e, t)
        }
    }, {
        "../internals/function-call": 39,
        "../internals/get-method": 45,
        "../internals/is-object": 59,
        "../internals/is-symbol": 61,
        "../internals/ordinary-to-primitive": 84,
        "../internals/well-known-symbol": 113
    }],
    105: [function (e, t, n) {
        var r = e("../internals/to-primitive"), i = e("../internals/is-symbol");
        t.exports = function (e) {
            var t = r(e, "string");
            return i(t) ? t : t + ""
        }
    }, {"../internals/is-symbol": 61, "../internals/to-primitive": 104}],
    106: [function (e, t, n) {
        var r = {};
        r[e("../internals/well-known-symbol")("toStringTag")] = "z", t.exports = "[object z]" === String(r)
    }, {"../internals/well-known-symbol": 113}],
    107: [function (e, t, n) {
        var r = e("../internals/classof"), i = String;
        t.exports = function (e) {
            if ("Symbol" === r(e)) throw TypeError("Cannot convert a Symbol value to a string");
            return i(e)
        }
    }, {"../internals/classof": 14}],
    108: [function (e, t, n) {
        var r = String;
        t.exports = function (e) {
            try {
                return r(e)
            } catch (e) {
                return "Object"
            }
        }
    }, {}],
    109: [function (e, t, n) {
        var r = e("../internals/function-uncurry-this"), i = 0, o = Math.random(), s = r(1..toString);
        t.exports = function (e) {
            return "Symbol(" + (void 0 === e ? "" : e) + ")_" + s(++i + o, 36)
        }
    }, {"../internals/function-uncurry-this": 41}],
    110: [function (e, t, n) {
        var r = e("../internals/native-symbol");
        t.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator
    }, {"../internals/native-symbol": 68}],
    111: [function (e, t, n) {
        var r = e("../internals/descriptors"), i = e("../internals/fails");
        t.exports = r && i((function () {
            return 42 != Object.defineProperty((function () {
            }), "prototype", {value: 42, writable: !1}).prototype
        }))
    }, {"../internals/descriptors": 26, "../internals/fails": 34}],
    112: [function (e, t, n) {
        var r = TypeError;
        t.exports = function (e, t) {
            if (e < t) throw r("Not enough arguments");
            return e
        }
    }, {}],
    113: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/shared"), o = e("../internals/has-own-property"),
            s = e("../internals/uid"), a = e("../internals/native-symbol"), l = e("../internals/use-symbol-as-uid"),
            c = i("wks"), u = r.Symbol, d = u && u.for, f = l ? u : u && u.withoutSetter || s;
        t.exports = function (e) {
            if (!o(c, e) || !a && "string" != typeof c[e]) {
                var t = "Symbol." + e;
                a && o(u, e) ? c[e] = u[e] : c[e] = l && d ? d(t) : f(t)
            }
            return c[e]
        }
    }, {
        "../internals/global": 47,
        "../internals/has-own-property": 48,
        "../internals/native-symbol": 68,
        "../internals/shared": 96,
        "../internals/uid": 109,
        "../internals/use-symbol-as-uid": 110
    }],
    114: [function (e, t, n) {
        "use strict";
        var r = e("../internals/to-indexed-object"), i = e("../internals/add-to-unscopables"),
            o = e("../internals/iterators"), s = e("../internals/internal-state"),
            a = e("../internals/object-define-property").f, l = e("../internals/define-iterator"),
            c = e("../internals/is-pure"), u = e("../internals/descriptors"), d = "Array Iterator", f = s.set,
            p = s.getterFor(d);
        t.exports = l(Array, "Array", (function (e, t) {
            f(this, {type: d, target: r(e), index: 0, kind: t})
        }), (function () {
            var e = p(this), t = e.target, n = e.kind, r = e.index++;
            return !t || r >= t.length ? (e.target = void 0, {value: void 0, done: !0}) : "keys" == n ? {
                value: r,
                done: !1
            } : "values" == n ? {value: t[r], done: !1} : {value: [r, t[r]], done: !1}
        }), "values");
        var h = o.Arguments = o.Array;
        if (i("keys"), i("values"), i("entries"), !c && u && "values" !== h.name) try {
            a(h, "name", {value: "values"})
        } catch (e) {
        }
    }, {
        "../internals/add-to-unscopables": 4,
        "../internals/define-iterator": 25,
        "../internals/descriptors": 26,
        "../internals/internal-state": 54,
        "../internals/is-pure": 60,
        "../internals/iterators": 64,
        "../internals/object-define-property": 74,
        "../internals/to-indexed-object": 100
    }],
    115: [function (e, t, n) {
        "use strict";
        var r = e("../internals/export"), i = e("../internals/regexp-exec");
        r({target: "RegExp", proto: !0, forced: /./.exec !== i}, {exec: i})
    }, {"../internals/export": 33, "../internals/regexp-exec": 87}],
    116: [function (e, t, n) {
        "use strict";
        var r = e("../internals/string-multibyte").charAt, i = e("../internals/to-string"),
            o = e("../internals/internal-state"), s = e("../internals/define-iterator"), a = "String Iterator",
            l = o.set, c = o.getterFor(a);
        s(String, "String", (function (e) {
            l(this, {type: a, string: i(e), index: 0})
        }), (function () {
            var e, t = c(this), n = t.string, i = t.index;
            return i >= n.length ? {value: void 0, done: !0} : (e = r(n, i), t.index += e.length, {value: e, done: !1})
        }))
    }, {
        "../internals/define-iterator": 25,
        "../internals/internal-state": 54,
        "../internals/string-multibyte": 97,
        "../internals/to-string": 107
    }],
    117: [function (e, t, n) {
        "use strict";
        var r = e("../internals/function-apply"), i = e("../internals/function-call"),
            o = e("../internals/function-uncurry-this"), s = e("../internals/fix-regexp-well-known-symbol-logic"),
            a = e("../internals/fails"), l = e("../internals/an-object"), c = e("../internals/is-callable"),
            u = e("../internals/to-integer-or-infinity"), d = e("../internals/to-length"),
            f = e("../internals/to-string"), p = e("../internals/require-object-coercible"),
            h = e("../internals/advance-string-index"), y = e("../internals/get-method"),
            m = e("../internals/get-substitution"), v = e("../internals/regexp-exec-abstract"),
            g = e("../internals/well-known-symbol")("replace"), b = Math.max, w = Math.min, _ = o([].concat),
            x = o([].push), k = o("".indexOf), j = o("".slice), C = "$0" === "a".replace(/./, "$0"),
            E = !!/./[g] && "" === /./[g]("a", "$0");
        s("replace", (function (e, t, n) {
            var o = E ? "$" : "$0";
            return [function (e, n) {
                var r = p(this), o = null == e ? void 0 : y(e, g);
                return o ? i(o, e, r, n) : i(t, f(r), e, n)
            }, function (e, i) {
                var s = l(this), a = f(e);
                if ("string" == typeof i && -1 === k(i, o) && -1 === k(i, "$<")) {
                    var p = n(t, s, a, i);
                    if (p.done) return p.value
                }
                var y = c(i);
                y || (i = f(i));
                var g = s.global;
                if (g) {
                    var C = s.unicode;
                    s.lastIndex = 0
                }
                for (var E = []; ;) {
                    var S = v(s, a);
                    if (null === S) break;
                    if (x(E, S), !g) break;
                    "" === f(S[0]) && (s.lastIndex = h(a, d(s.lastIndex), C))
                }
                for (var D, O = "", P = 0, B = 0; B < E.length; B++) {
                    for (var A = f((S = E[B])[0]), M = b(w(u(S.index), a.length), 0), I = [], T = 1; T < S.length; T++) x(I, void 0 === (D = S[T]) ? D : String(D));
                    var L = S.groups;
                    if (y) {
                        var K = _([A], I, M, a);
                        void 0 !== L && x(K, L);
                        var R = f(r(i, void 0, K))
                    } else R = m(A, a, M, I, L, i);
                    M >= P && (O += j(a, P, M) + R, P = M + A.length)
                }
                return O + j(a, P)
            }]
        }), !!a((function () {
            var e = /./;
            return e.exec = function () {
                var e = [];
                return e.groups = {a: "7"}, e
            }, "7" !== "".replace(e, "$<a>")
        })) || !C || E)
    }, {
        "../internals/advance-string-index": 5,
        "../internals/an-object": 7,
        "../internals/fails": 34,
        "../internals/fix-regexp-well-known-symbol-logic": 35,
        "../internals/function-apply": 36,
        "../internals/function-call": 39,
        "../internals/function-uncurry-this": 41,
        "../internals/get-method": 45,
        "../internals/get-substitution": 46,
        "../internals/is-callable": 56,
        "../internals/regexp-exec-abstract": 86,
        "../internals/require-object-coercible": 92,
        "../internals/to-integer-or-infinity": 101,
        "../internals/to-length": 102,
        "../internals/to-string": 107,
        "../internals/well-known-symbol": 113
    }],
    118: [function (e, t, n) {
        var r = e("../internals/global"), i = e("../internals/dom-iterables"),
            o = e("../internals/dom-token-list-prototype"), s = e("../modules/es.array.iterator"),
            a = e("../internals/create-non-enumerable-property"), l = e("../internals/well-known-symbol"),
            c = l("iterator"), u = l("toStringTag"), d = s.values, f = function (e, t) {
                if (e) {
                    if (e[c] !== d) try {
                        a(e, c, d)
                    } catch (t) {
                        e[c] = d
                    }
                    if (e[u] || a(e, u, t), i[t]) for (var n in s) if (e[n] !== s[n]) try {
                        a(e, n, s[n])
                    } catch (t) {
                        e[n] = s[n]
                    }
                }
            };
        for (var p in i) f(r[p] && r[p].prototype, p);
        f(o, "DOMTokenList")
    }, {
        "../internals/create-non-enumerable-property": 18,
        "../internals/dom-iterables": 28,
        "../internals/dom-token-list-prototype": 29,
        "../internals/global": 47,
        "../internals/well-known-symbol": 113,
        "../modules/es.array.iterator": 114
    }],
    119: [function (e, t, n) {
        "use strict";
        e("../modules/es.array.iterator");
        var r = e("../internals/export"), i = e("../internals/global"), o = e("../internals/function-call"),
            s = e("../internals/function-uncurry-this"), a = e("../internals/descriptors"),
            l = e("../internals/native-url"), c = e("../internals/define-built-in"),
            u = e("../internals/define-built-ins"), d = e("../internals/set-to-string-tag"),
            f = e("../internals/create-iterator-constructor"), p = e("../internals/internal-state"),
            h = e("../internals/an-instance"), y = e("../internals/is-callable"),
            m = e("../internals/has-own-property"), v = e("../internals/function-bind-context"),
            g = e("../internals/classof"), b = e("../internals/an-object"), w = e("../internals/is-object"),
            _ = e("../internals/to-string"), x = e("../internals/object-create"),
            k = e("../internals/create-property-descriptor"), j = e("../internals/get-iterator"),
            C = e("../internals/get-iterator-method"), E = e("../internals/validate-arguments-length"),
            S = e("../internals/well-known-symbol"), D = e("../internals/array-sort"), O = S("iterator"),
            P = "URLSearchParams", B = "URLSearchParamsIterator", A = p.set, M = p.getterFor(P), I = p.getterFor(B),
            T = Object.getOwnPropertyDescriptor, L = function (e) {
                if (!a) return i[e];
                var t = T(i, e);
                return t && t.value
            }, K = L("fetch"), R = L("Request"), N = L("Headers"), F = R && R.prototype, z = N && N.prototype, U = i.RegExp,
            H = i.TypeError, V = i.decodeURIComponent, W = i.encodeURIComponent, q = s("".charAt), G = s([].join),
            Y = s([].push), X = s("".replace), $ = s([].shift), J = s([].splice), Q = s("".split), Z = s("".slice),
            ee = /\+/g, te = Array(4), ne = function (e) {
                return te[e - 1] || (te[e - 1] = U("((?:%[\\da-f]{2}){" + e + "})", "gi"))
            }, re = function (e) {
                try {
                    return V(e)
                } catch (t) {
                    return e
                }
            }, ie = function (e) {
                var t = X(e, ee, " "), n = 4;
                try {
                    return V(t)
                } catch (e) {
                    for (; n;) t = X(t, ne(n--), re);
                    return t
                }
            }, oe = /[!'()~]|%20/g, se = {"!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+"},
            ae = function (e) {
                return se[e]
            }, le = function (e) {
                return X(W(e), oe, ae)
            }, ce = f((function (e, t) {
                A(this, {type: B, iterator: j(M(e).entries), kind: t})
            }), "Iterator", (function () {
                var e = I(this), t = e.kind, n = e.iterator.next(), r = n.value;
                return n.done || (n.value = "keys" === t ? r.key : "values" === t ? r.value : [r.key, r.value]), n
            }), !0), ue = function (e) {
                this.entries = [], this.url = null, void 0 !== e && (w(e) ? this.parseObject(e) : this.parseQuery("string" == typeof e ? "?" === q(e, 0) ? Z(e, 1) : e : _(e)))
            };
        ue.prototype = {
            type: P, bindURL: function (e) {
                this.url = e, this.update()
            }, parseObject: function (e) {
                var t, n, r, i, s, a, l, c = C(e);
                if (c) for (n = (t = j(e, c)).next; !(r = o(n, t)).done;) {
                    if (s = (i = j(b(r.value))).next, (a = o(s, i)).done || (l = o(s, i)).done || !o(s, i).done) throw H("Expected sequence with length 2");
                    Y(this.entries, {key: _(a.value), value: _(l.value)})
                } else for (var u in e) m(e, u) && Y(this.entries, {key: u, value: _(e[u])})
            }, parseQuery: function (e) {
                if (e) for (var t, n, r = Q(e, "&"), i = 0; i < r.length;) (t = r[i++]).length && (n = Q(t, "="), Y(this.entries, {
                    key: ie($(n)),
                    value: ie(G(n, "="))
                }))
            }, serialize: function () {
                for (var e, t = this.entries, n = [], r = 0; r < t.length;) e = t[r++], Y(n, le(e.key) + "=" + le(e.value));
                return G(n, "&")
            }, update: function () {
                this.entries.length = 0, this.parseQuery(this.url.query)
            }, updateURL: function () {
                this.url && this.url.update()
            }
        };
        var de = function () {
            h(this, fe);
            var e = arguments.length > 0 ? arguments[0] : void 0;
            A(this, new ue(e))
        }, fe = de.prototype;
        if (u(fe, {
            append: function (e, t) {
                E(arguments.length, 2);
                var n = M(this);
                Y(n.entries, {key: _(e), value: _(t)}), n.updateURL()
            }, delete: function (e) {
                E(arguments.length, 1);
                for (var t = M(this), n = t.entries, r = _(e), i = 0; i < n.length;) n[i].key === r ? J(n, i, 1) : i++;
                t.updateURL()
            }, get: function (e) {
                E(arguments.length, 1);
                for (var t = M(this).entries, n = _(e), r = 0; r < t.length; r++) if (t[r].key === n) return t[r].value;
                return null
            }, getAll: function (e) {
                E(arguments.length, 1);
                for (var t = M(this).entries, n = _(e), r = [], i = 0; i < t.length; i++) t[i].key === n && Y(r, t[i].value);
                return r
            }, has: function (e) {
                E(arguments.length, 1);
                for (var t = M(this).entries, n = _(e), r = 0; r < t.length;) if (t[r++].key === n) return !0;
                return !1
            }, set: function (e, t) {
                E(arguments.length, 1);
                for (var n, r = M(this), i = r.entries, o = !1, s = _(e), a = _(t), l = 0; l < i.length; l++) (n = i[l]).key === s && (o ? J(i, l--, 1) : (o = !0, n.value = a));
                o || Y(i, {key: s, value: a}), r.updateURL()
            }, sort: function () {
                var e = M(this);
                D(e.entries, (function (e, t) {
                    return e.key > t.key ? 1 : -1
                })), e.updateURL()
            }, forEach: function (e) {
                for (var t, n = M(this).entries, r = v(e, arguments.length > 1 ? arguments[1] : void 0), i = 0; i < n.length;) r((t = n[i++]).value, t.key, this)
            }, keys: function () {
                return new ce(this, "keys")
            }, values: function () {
                return new ce(this, "values")
            }, entries: function () {
                return new ce(this, "entries")
            }
        }, {enumerable: !0}), c(fe, O, fe.entries, {name: "entries"}), c(fe, "toString", (function () {
            return M(this).serialize()
        }), {enumerable: !0}), d(de, P), r({
            global: !0,
            constructor: !0,
            forced: !l
        }, {URLSearchParams: de}), !l && y(N)) {
            var pe = s(z.has), he = s(z.set), ye = function (e) {
                if (w(e)) {
                    var t, n = e.body;
                    if (g(n) === P) return t = e.headers ? new N(e.headers) : new N, pe(t, "content-type") || he(t, "content-type", "application/x-www-form-urlencoded;charset=UTF-8"), x(e, {
                        body: k(0, _(n)),
                        headers: k(0, t)
                    })
                }
                return e
            };
            if (y(K) && r({global: !0, enumerable: !0, dontCallGetSet: !0, forced: !0}, {
                fetch: function (e) {
                    return K(e, arguments.length > 1 ? ye(arguments[1]) : {})
                }
            }), y(R)) {
                var me = function (e) {
                    return h(this, F), new R(e, arguments.length > 1 ? ye(arguments[1]) : {})
                };
                F.constructor = me, me.prototype = F, r({
                    global: !0,
                    constructor: !0,
                    dontCallGetSet: !0,
                    forced: !0
                }, {Request: me})
            }
        }
        t.exports = {URLSearchParams: de, getState: M}
    }, {
        "../internals/an-instance": 6,
        "../internals/an-object": 7,
        "../internals/array-sort": 11,
        "../internals/classof": 14,
        "../internals/create-iterator-constructor": 17,
        "../internals/create-property-descriptor": 19,
        "../internals/define-built-in": 22,
        "../internals/define-built-ins": 23,
        "../internals/descriptors": 26,
        "../internals/export": 33,
        "../internals/function-bind-context": 37,
        "../internals/function-call": 39,
        "../internals/function-uncurry-this": 41,
        "../internals/get-iterator": 44,
        "../internals/get-iterator-method": 43,
        "../internals/global": 47,
        "../internals/has-own-property": 48,
        "../internals/internal-state": 54,
        "../internals/is-callable": 56,
        "../internals/is-object": 59,
        "../internals/native-url": 69,
        "../internals/object-create": 72,
        "../internals/set-to-string-tag": 93,
        "../internals/to-string": 107,
        "../internals/validate-arguments-length": 112,
        "../internals/well-known-symbol": 113,
        "../modules/es.array.iterator": 114
    }],
    120: [function (e, t, n) {
        e("../modules/web.url-search-params.constructor")
    }, {"../modules/web.url-search-params.constructor": 119}],
    121: [function (e, t, n) {
        "use strict";
        e("../modules/es.string.iterator");
        var r, i = e("../internals/export"), o = e("../internals/descriptors"), s = e("../internals/native-url"),
            a = e("../internals/global"), l = e("../internals/function-bind-context"),
            c = e("../internals/function-uncurry-this"), u = e("../internals/define-built-in"),
            d = e("../internals/define-built-in-accessor"), f = e("../internals/an-instance"),
            p = e("../internals/has-own-property"), h = e("../internals/object-assign"),
            y = e("../internals/array-from"), m = e("../internals/array-slice-simple"),
            v = e("../internals/string-multibyte").codeAt, g = e("../internals/string-punycode-to-ascii"),
            b = e("../internals/to-string"), w = e("../internals/set-to-string-tag"),
            _ = e("../internals/validate-arguments-length"), x = e("../modules/web.url-search-params.constructor"),
            k = e("../internals/internal-state"), j = k.set, C = k.getterFor("URL"), E = x.URLSearchParams,
            S = x.getState, D = a.URL, O = a.TypeError, P = a.parseInt, B = Math.floor, A = Math.pow, M = c("".charAt),
            I = c(/./.exec), T = c([].join), L = c(1..toString), K = c([].pop), R = c([].push), N = c("".replace),
            F = c([].shift), z = c("".split), U = c("".slice), H = c("".toLowerCase), V = c([].unshift),
            W = "Invalid scheme", q = "Invalid host", G = "Invalid port", Y = /[a-z]/i, X = /[\d+-.a-z]/i, $ = /\d/,
            J = /^0x/i, Q = /^[0-7]+$/, Z = /^\d+$/, ee = /^[\da-f]+$/i, te = /[\0\t\n\r #%/:<>?@[\\\]^|]/,
            ne = /[\0\t\n\r #/:<>?@[\\\]^|]/, re = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g, ie = /[\t\n\r]/g,
            oe = function (e) {
                var t, n, r, i;
                if ("number" == typeof e) {
                    for (t = [], n = 0; n < 4; n++) V(t, e % 256), e = B(e / 256);
                    return T(t, ".")
                }
                if ("object" == typeof e) {
                    for (t = "", r = function (e) {
                        for (var t = null, n = 1, r = null, i = 0, o = 0; o < 8; o++) 0 !== e[o] ? (i > n && (t = r, n = i), r = null, i = 0) : (null === r && (r = o), ++i);
                        return i > n && (t = r, n = i), t
                    }(e), n = 0; n < 8; n++) i && 0 === e[n] || (i && (i = !1), r === n ? (t += n ? ":" : "::", i = !0) : (t += L(e[n], 16), n < 7 && (t += ":")));
                    return "[" + t + "]"
                }
                return e
            }, se = {}, ae = h({}, se, {" ": 1, '"': 1, "<": 1, ">": 1, "`": 1}),
            le = h({}, ae, {"#": 1, "?": 1, "{": 1, "}": 1}),
            ce = h({}, le, {"/": 1, ":": 1, ";": 1, "=": 1, "@": 1, "[": 1, "\\": 1, "]": 1, "^": 1, "|": 1}),
            ue = function (e, t) {
                var n = v(e, 0);
                return n > 32 && n < 127 && !p(t, e) ? e : encodeURIComponent(e)
            }, de = {ftp: 21, file: null, http: 80, https: 443, ws: 80, wss: 443}, fe = function (e, t) {
                var n;
                return 2 == e.length && I(Y, M(e, 0)) && (":" == (n = M(e, 1)) || !t && "|" == n)
            }, pe = function (e) {
                var t;
                return e.length > 1 && fe(U(e, 0, 2)) && (2 == e.length || "/" === (t = M(e, 2)) || "\\" === t || "?" === t || "#" === t)
            }, he = function (e) {
                return "." === e || "%2e" === H(e)
            }, ye = {}, me = {}, ve = {}, ge = {}, be = {}, we = {}, _e = {}, xe = {}, ke = {}, je = {}, Ce = {}, Ee = {},
            Se = {}, De = {}, Oe = {}, Pe = {}, Be = {}, Ae = {}, Me = {}, Ie = {}, Te = {}, Le = function (e, t, n) {
                var r, i, o, s = b(e);
                if (t) {
                    if (i = this.parse(s)) throw O(i);
                    this.searchParams = null
                } else {
                    if (void 0 !== n && (r = new Le(n, !0)), i = this.parse(s, null, r)) throw O(i);
                    (o = S(new E)).bindURL(this), this.searchParams = o
                }
            };
        Le.prototype = {
            type: "URL", parse: function (e, t, n) {
                var i, o, s, a, l, c = this, u = t || ye, d = 0, f = "", h = !1, v = !1, g = !1;
                for (e = b(e), t || (c.scheme = "", c.username = "", c.password = "", c.host = null, c.port = null, c.path = [], c.query = null, c.fragment = null, c.cannotBeABaseURL = !1, e = N(e, re, "")), e = N(e, ie, ""), i = y(e); d <= i.length;) {
                    switch (o = i[d], u) {
                        case ye:
                            if (!o || !I(Y, o)) {
                                if (t) return W;
                                u = ve;
                                continue
                            }
                            f += H(o), u = me;
                            break;
                        case me:
                            if (o && (I(X, o) || "+" == o || "-" == o || "." == o)) f += H(o); else {
                                if (":" != o) {
                                    if (t) return W;
                                    f = "", u = ve, d = 0;
                                    continue
                                }
                                if (t && (c.isSpecial() != p(de, f) || "file" == f && (c.includesCredentials() || null !== c.port) || "file" == c.scheme && !c.host)) return;
                                if (c.scheme = f, t) return void (c.isSpecial() && de[c.scheme] == c.port && (c.port = null));
                                f = "", "file" == c.scheme ? u = De : c.isSpecial() && n && n.scheme == c.scheme ? u = ge : c.isSpecial() ? u = xe : "/" == i[d + 1] ? (u = be, d++) : (c.cannotBeABaseURL = !0, R(c.path, ""), u = Me)
                            }
                            break;
                        case ve:
                            if (!n || n.cannotBeABaseURL && "#" != o) return W;
                            if (n.cannotBeABaseURL && "#" == o) {
                                c.scheme = n.scheme, c.path = m(n.path), c.query = n.query, c.fragment = "", c.cannotBeABaseURL = !0, u = Te;
                                break
                            }
                            u = "file" == n.scheme ? De : we;
                            continue;
                        case ge:
                            if ("/" != o || "/" != i[d + 1]) {
                                u = we;
                                continue
                            }
                            u = ke, d++;
                            break;
                        case be:
                            if ("/" == o) {
                                u = je;
                                break
                            }
                            u = Ae;
                            continue;
                        case we:
                            if (c.scheme = n.scheme, o == r) c.username = n.username, c.password = n.password, c.host = n.host, c.port = n.port, c.path = m(n.path), c.query = n.query; else if ("/" == o || "\\" == o && c.isSpecial()) u = _e; else if ("?" == o) c.username = n.username, c.password = n.password, c.host = n.host, c.port = n.port, c.path = m(n.path), c.query = "", u = Ie; else {
                                if ("#" != o) {
                                    c.username = n.username, c.password = n.password, c.host = n.host, c.port = n.port, c.path = m(n.path), c.path.length--, u = Ae;
                                    continue
                                }
                                c.username = n.username, c.password = n.password, c.host = n.host, c.port = n.port, c.path = m(n.path), c.query = n.query, c.fragment = "", u = Te
                            }
                            break;
                        case _e:
                            if (!c.isSpecial() || "/" != o && "\\" != o) {
                                if ("/" != o) {
                                    c.username = n.username, c.password = n.password, c.host = n.host, c.port = n.port, u = Ae;
                                    continue
                                }
                                u = je
                            } else u = ke;
                            break;
                        case xe:
                            if (u = ke, "/" != o || "/" != M(f, d + 1)) continue;
                            d++;
                            break;
                        case ke:
                            if ("/" != o && "\\" != o) {
                                u = je;
                                continue
                            }
                            break;
                        case je:
                            if ("@" == o) {
                                h && (f = "%40" + f), h = !0, s = y(f);
                                for (var w = 0; w < s.length; w++) {
                                    var _ = s[w];
                                    if (":" != _ || g) {
                                        var x = ue(_, ce);
                                        g ? c.password += x : c.username += x
                                    } else g = !0
                                }
                                f = ""
                            } else if (o == r || "/" == o || "?" == o || "#" == o || "\\" == o && c.isSpecial()) {
                                if (h && "" == f) return "Invalid authority";
                                d -= y(f).length + 1, f = "", u = Ce
                            } else f += o;
                            break;
                        case Ce:
                        case Ee:
                            if (t && "file" == c.scheme) {
                                u = Pe;
                                continue
                            }
                            if (":" != o || v) {
                                if (o == r || "/" == o || "?" == o || "#" == o || "\\" == o && c.isSpecial()) {
                                    if (c.isSpecial() && "" == f) return q;
                                    if (t && "" == f && (c.includesCredentials() || null !== c.port)) return;
                                    if (a = c.parseHost(f)) return a;
                                    if (f = "", u = Be, t) return;
                                    continue
                                }
                                "[" == o ? v = !0 : "]" == o && (v = !1), f += o
                            } else {
                                if ("" == f) return q;
                                if (a = c.parseHost(f)) return a;
                                if (f = "", u = Se, t == Ee) return
                            }
                            break;
                        case Se:
                            if (!I($, o)) {
                                if (o == r || "/" == o || "?" == o || "#" == o || "\\" == o && c.isSpecial() || t) {
                                    if ("" != f) {
                                        var k = P(f, 10);
                                        if (k > 65535) return G;
                                        c.port = c.isSpecial() && k === de[c.scheme] ? null : k, f = ""
                                    }
                                    if (t) return;
                                    u = Be;
                                    continue
                                }
                                return G
                            }
                            f += o;
                            break;
                        case De:
                            if (c.scheme = "file", "/" == o || "\\" == o) u = Oe; else {
                                if (!n || "file" != n.scheme) {
                                    u = Ae;
                                    continue
                                }
                                if (o == r) c.host = n.host, c.path = m(n.path), c.query = n.query; else if ("?" == o) c.host = n.host, c.path = m(n.path), c.query = "", u = Ie; else {
                                    if ("#" != o) {
                                        pe(T(m(i, d), "")) || (c.host = n.host, c.path = m(n.path), c.shortenPath()), u = Ae;
                                        continue
                                    }
                                    c.host = n.host, c.path = m(n.path), c.query = n.query, c.fragment = "", u = Te
                                }
                            }
                            break;
                        case Oe:
                            if ("/" == o || "\\" == o) {
                                u = Pe;
                                break
                            }
                            n && "file" == n.scheme && !pe(T(m(i, d), "")) && (fe(n.path[0], !0) ? R(c.path, n.path[0]) : c.host = n.host), u = Ae;
                            continue;
                        case Pe:
                            if (o == r || "/" == o || "\\" == o || "?" == o || "#" == o) {
                                if (!t && fe(f)) u = Ae; else if ("" == f) {
                                    if (c.host = "", t) return;
                                    u = Be
                                } else {
                                    if (a = c.parseHost(f)) return a;
                                    if ("localhost" == c.host && (c.host = ""), t) return;
                                    f = "", u = Be
                                }
                                continue
                            }
                            f += o;
                            break;
                        case Be:
                            if (c.isSpecial()) {
                                if (u = Ae, "/" != o && "\\" != o) continue
                            } else if (t || "?" != o) if (t || "#" != o) {
                                if (o != r && (u = Ae, "/" != o)) continue
                            } else c.fragment = "", u = Te; else c.query = "", u = Ie;
                            break;
                        case Ae:
                            if (o == r || "/" == o || "\\" == o && c.isSpecial() || !t && ("?" == o || "#" == o)) {
                                if (".." === (l = H(l = f)) || "%2e." === l || ".%2e" === l || "%2e%2e" === l ? (c.shortenPath(), "/" == o || "\\" == o && c.isSpecial() || R(c.path, "")) : he(f) ? "/" == o || "\\" == o && c.isSpecial() || R(c.path, "") : ("file" == c.scheme && !c.path.length && fe(f) && (c.host && (c.host = ""), f = M(f, 0) + ":"), R(c.path, f)), f = "", "file" == c.scheme && (o == r || "?" == o || "#" == o)) for (; c.path.length > 1 && "" === c.path[0];) F(c.path);
                                "?" == o ? (c.query = "", u = Ie) : "#" == o && (c.fragment = "", u = Te)
                            } else f += ue(o, le);
                            break;
                        case Me:
                            "?" == o ? (c.query = "", u = Ie) : "#" == o ? (c.fragment = "", u = Te) : o != r && (c.path[0] += ue(o, se));
                            break;
                        case Ie:
                            t || "#" != o ? o != r && ("'" == o && c.isSpecial() ? c.query += "%27" : c.query += "#" == o ? "%23" : ue(o, se)) : (c.fragment = "", u = Te);
                            break;
                        case Te:
                            o != r && (c.fragment += ue(o, ae))
                    }
                    d++
                }
            }, parseHost: function (e) {
                var t, n, r;
                if ("[" == M(e, 0)) {
                    if ("]" != M(e, e.length - 1)) return q;
                    if (t = function (e) {
                        var t, n, r, i, o, s, a, l = [0, 0, 0, 0, 0, 0, 0, 0], c = 0, u = null, d = 0, f = function () {
                            return M(e, d)
                        };
                        if (":" == f()) {
                            if (":" != M(e, 1)) return;
                            d += 2, u = ++c
                        }
                        for (; f();) {
                            if (8 == c) return;
                            if (":" != f()) {
                                for (t = n = 0; n < 4 && I(ee, f());) t = 16 * t + P(f(), 16), d++, n++;
                                if ("." == f()) {
                                    if (0 == n) return;
                                    if (d -= n, c > 6) return;
                                    for (r = 0; f();) {
                                        if (i = null, r > 0) {
                                            if (!("." == f() && r < 4)) return;
                                            d++
                                        }
                                        if (!I($, f())) return;
                                        for (; I($, f());) {
                                            if (o = P(f(), 10), null === i) i = o; else {
                                                if (0 == i) return;
                                                i = 10 * i + o
                                            }
                                            if (i > 255) return;
                                            d++
                                        }
                                        l[c] = 256 * l[c] + i, 2 != ++r && 4 != r || c++
                                    }
                                    if (4 != r) return;
                                    break
                                }
                                if (":" == f()) {
                                    if (d++, !f()) return
                                } else if (f()) return;
                                l[c++] = t
                            } else {
                                if (null !== u) return;
                                d++, u = ++c
                            }
                        }
                        if (null !== u) for (s = c - u, c = 7; 0 != c && s > 0;) a = l[c], l[c--] = l[u + s - 1], l[u + --s] = a; else if (8 != c) return;
                        return l
                    }(U(e, 1, -1)), !t) return q;
                    this.host = t
                } else if (this.isSpecial()) {
                    if (e = g(e), I(te, e)) return q;
                    if (t = function (e) {
                        var t, n, r, i, o, s, a, l = z(e, ".");
                        if (l.length && "" == l[l.length - 1] && l.length--, (t = l.length) > 4) return e;
                        for (n = [], r = 0; r < t; r++) {
                            if ("" == (i = l[r])) return e;
                            if (o = 10, i.length > 1 && "0" == M(i, 0) && (o = I(J, i) ? 16 : 8, i = U(i, 8 == o ? 1 : 2)), "" === i) s = 0; else {
                                if (!I(10 == o ? Z : 8 == o ? Q : ee, i)) return e;
                                s = P(i, o)
                            }
                            R(n, s)
                        }
                        for (r = 0; r < t; r++) if (s = n[r], r == t - 1) {
                            if (s >= A(256, 5 - t)) return null
                        } else if (s > 255) return null;
                        for (a = K(n), r = 0; r < n.length; r++) a += n[r] * A(256, 3 - r);
                        return a
                    }(e), null === t) return q;
                    this.host = t
                } else {
                    if (I(ne, e)) return q;
                    for (t = "", n = y(e), r = 0; r < n.length; r++) t += ue(n[r], se);
                    this.host = t
                }
            }, cannotHaveUsernamePasswordPort: function () {
                return !this.host || this.cannotBeABaseURL || "file" == this.scheme
            }, includesCredentials: function () {
                return "" != this.username || "" != this.password
            }, isSpecial: function () {
                return p(de, this.scheme)
            }, shortenPath: function () {
                var e = this.path, t = e.length;
                !t || "file" == this.scheme && 1 == t && fe(e[0], !0) || e.length--
            }, serialize: function () {
                var e = this, t = e.scheme, n = e.username, r = e.password, i = e.host, o = e.port, s = e.path,
                    a = e.query, l = e.fragment, c = t + ":";
                return null !== i ? (c += "//", e.includesCredentials() && (c += n + (r ? ":" + r : "") + "@"), c += oe(i), null !== o && (c += ":" + o)) : "file" == t && (c += "//"), c += e.cannotBeABaseURL ? s[0] : s.length ? "/" + T(s, "/") : "", null !== a && (c += "?" + a), null !== l && (c += "#" + l), c
            }, setHref: function (e) {
                var t = this.parse(e);
                if (t) throw O(t);
                this.searchParams.update()
            }, getOrigin: function () {
                var e = this.scheme, t = this.port;
                if ("blob" == e) try {
                    return new Ke(e.path[0]).origin
                } catch (e) {
                    return "null"
                }
                return "file" != e && this.isSpecial() ? e + "://" + oe(this.host) + (null !== t ? ":" + t : "") : "null"
            }, getProtocol: function () {
                return this.scheme + ":"
            }, setProtocol: function (e) {
                this.parse(b(e) + ":", ye)
            }, getUsername: function () {
                return this.username
            }, setUsername: function (e) {
                var t = y(b(e));
                if (!this.cannotHaveUsernamePasswordPort()) {
                    this.username = "";
                    for (var n = 0; n < t.length; n++) this.username += ue(t[n], ce)
                }
            }, getPassword: function () {
                return this.password
            }, setPassword: function (e) {
                var t = y(b(e));
                if (!this.cannotHaveUsernamePasswordPort()) {
                    this.password = "";
                    for (var n = 0; n < t.length; n++) this.password += ue(t[n], ce)
                }
            }, getHost: function () {
                var e = this.host, t = this.port;
                return null === e ? "" : null === t ? oe(e) : oe(e) + ":" + t
            }, setHost: function (e) {
                this.cannotBeABaseURL || this.parse(e, Ce)
            }, getHostname: function () {
                var e = this.host;
                return null === e ? "" : oe(e)
            }, setHostname: function (e) {
                this.cannotBeABaseURL || this.parse(e, Ee)
            }, getPort: function () {
                var e = this.port;
                return null === e ? "" : b(e)
            }, setPort: function (e) {
                this.cannotHaveUsernamePasswordPort() || ("" == (e = b(e)) ? this.port = null : this.parse(e, Se))
            }, getPathname: function () {
                var e = this.path;
                return this.cannotBeABaseURL ? e[0] : e.length ? "/" + T(e, "/") : ""
            }, setPathname: function (e) {
                this.cannotBeABaseURL || (this.path = [], this.parse(e, Be))
            }, getSearch: function () {
                var e = this.query;
                return e ? "?" + e : ""
            }, setSearch: function (e) {
                "" == (e = b(e)) ? this.query = null : ("?" == M(e, 0) && (e = U(e, 1)), this.query = "", this.parse(e, Ie)), this.searchParams.update()
            }, getSearchParams: function () {
                return this.searchParams.facade
            }, getHash: function () {
                var e = this.fragment;
                return e ? "#" + e : ""
            }, setHash: function (e) {
                "" != (e = b(e)) ? ("#" == M(e, 0) && (e = U(e, 1)), this.fragment = "", this.parse(e, Te)) : this.fragment = null
            }, update: function () {
                this.query = this.searchParams.serialize() || null
            }
        };
        var Ke = function (e) {
            var t = f(this, Re), n = _(arguments.length, 1) > 1 ? arguments[1] : void 0, r = j(t, new Le(e, !1, n));
            o || (t.href = r.serialize(), t.origin = r.getOrigin(), t.protocol = r.getProtocol(), t.username = r.getUsername(), t.password = r.getPassword(), t.host = r.getHost(), t.hostname = r.getHostname(), t.port = r.getPort(), t.pathname = r.getPathname(), t.search = r.getSearch(), t.searchParams = r.getSearchParams(), t.hash = r.getHash())
        }, Re = Ke.prototype, Ne = function (e, t) {
            return {
                get: function () {
                    return C(this)[e]()
                }, set: t && function (e) {
                    return C(this)[t](e)
                }, configurable: !0, enumerable: !0
            }
        };
        if (o && (d(Re, "href", Ne("serialize", "setHref")), d(Re, "origin", Ne("getOrigin")), d(Re, "protocol", Ne("getProtocol", "setProtocol")), d(Re, "username", Ne("getUsername", "setUsername")), d(Re, "password", Ne("getPassword", "setPassword")), d(Re, "host", Ne("getHost", "setHost")), d(Re, "hostname", Ne("getHostname", "setHostname")), d(Re, "port", Ne("getPort", "setPort")), d(Re, "pathname", Ne("getPathname", "setPathname")), d(Re, "search", Ne("getSearch", "setSearch")), d(Re, "searchParams", Ne("getSearchParams")), d(Re, "hash", Ne("getHash", "setHash"))), u(Re, "toJSON", (function () {
            return C(this).serialize()
        }), {enumerable: !0}), u(Re, "toString", (function () {
            return C(this).serialize()
        }), {enumerable: !0}), D) {
            var Fe = D.createObjectURL, ze = D.revokeObjectURL;
            Fe && u(Ke, "createObjectURL", l(Fe, D)), ze && u(Ke, "revokeObjectURL", l(ze, D))
        }
        w(Ke, "URL"), i({global: !0, constructor: !0, forced: !s, sham: !o}, {URL: Ke})
    }, {
        "../internals/an-instance": 6,
        "../internals/array-from": 8,
        "../internals/array-slice-simple": 10,
        "../internals/define-built-in": 22,
        "../internals/define-built-in-accessor": 21,
        "../internals/descriptors": 26,
        "../internals/export": 33,
        "../internals/function-bind-context": 37,
        "../internals/function-uncurry-this": 41,
        "../internals/global": 47,
        "../internals/has-own-property": 48,
        "../internals/internal-state": 54,
        "../internals/native-url": 69,
        "../internals/object-assign": 71,
        "../internals/set-to-string-tag": 93,
        "../internals/string-multibyte": 97,
        "../internals/string-punycode-to-ascii": 98,
        "../internals/to-string": 107,
        "../internals/validate-arguments-length": 112,
        "../modules/es.string.iterator": 116,
        "../modules/web.url-search-params.constructor": 119
    }],
    122: [function (e, t, n) {
        e("../modules/web.url.constructor")
    }, {"../modules/web.url.constructor": 121}],
    123: [function (e, t, n) {
        var r, i, o;
        r = function (e, t, n, i) {
            var o;
            t[0] = 0;
            for (var s = 1; s < t.length; s++) {
                var a = t[s++], l = t[s] ? (t[0] |= a ? 1 : 2, n[t[s++]]) : t[++s];
                3 === a ? i[0] = l : 4 === a ? i[1] = Object.assign(i[1] || {}, l) : 5 === a ? (i[1] = i[1] || {})[t[++s]] = l : 6 === a ? i[1][t[++s]] += l + "" : a ? (o = e.apply(l, r(e, l, n, ["", null])), i.push(o), l[0] ? t[0] |= 2 : (t[s - 2] = 0, t[s] = o)) : i.push(l)
            }
            return i
        }, i = new Map, o = function (e) {
            var t = i.get(this);
            return t || (t = new Map, i.set(this, t)), (t = r(this, t.get(e) || (t.set(e, t = function (e) {
                for (var t, n, r = 1, i = "", o = "", s = [0], a = function (e) {
                    1 === r && (e || (i = i.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? s.push(0, e, i) : 3 === r && (e || i) ? (s.push(3, e, i), r = 2) : 2 === r && "..." === i && e ? s.push(4, e, 0) : 2 === r && i && !e ? s.push(5, 0, !0, i) : r >= 5 && ((i || !e && 5 === r) && (s.push(r, 0, i, n), r = 6), e && (s.push(r, e, 0, n), r = 6)), i = ""
                }, l = 0; l < e.length; l++) {
                    l && (1 === r && a(), a(l));
                    for (var c = 0; c < e[l].length; c++) t = e[l][c], 1 === r ? "<" === t ? (a(), s = [s], r = 3) : i += t : 4 === r ? "--" === i && ">" === t ? (r = 1, i = "") : i = t + i[0] : o ? t === o ? o = "" : i += t : '"' === t || "'" === t ? o = t : ">" === t ? (a(), r = 1) : r && ("=" === t ? (r = 5, n = i, i = "") : "/" === t && (r < 5 || ">" === e[l][c + 1]) ? (a(), 3 === r && (s = s[0]), r = s, (s = s[0]).push(2, 0, r), r = 0) : " " === t || "\t" === t || "\n" === t || "\r" === t ? (a(), r = 2) : i += t), 3 === r && "!--" === i && (r = 4, s = s[0])
                }
                return a(), s
            }(e)), t), arguments, [])).length > 1 ? t : t[0]
        }, void 0 !== t ? t.exports = o : self.htm = o
    }, {}],
    124: [function (e, t, n) {
        t.exports = {
            nanoid: (e = 21) => {
                let t = "", n = e;
                for (; n--;) t += "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[64 * Math.random() | 0];
                return t
            }, customAlphabet: (e, t = 21) => (n = t) => {
                let r = "", i = n;
                for (; i--;) r += e[Math.random() * e.length | 0];
                return r
            }
        }
    }, {}],
    125: [function (e, t, n) {
        var r, i, o, s, a, l, c, u = {}, d = [],
            f = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

        function p(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }

        function h(e) {
            var t = e.parentNode;
            t && t.removeChild(e)
        }

        function y(e, t, n) {
            var i, o, s, a = {};
            for (s in t) "key" == s ? i = t[s] : "ref" == s ? o = t[s] : a[s] = t[s];
            if (arguments.length > 2 && (a.children = arguments.length > 3 ? r.call(arguments, 2) : n), "function" == typeof e && null != e.defaultProps) for (s in e.defaultProps) void 0 === a[s] && (a[s] = e.defaultProps[s]);
            return m(e, a, i, o, null)
        }

        function m(e, t, n, r, s) {
            var a = {
                type: e,
                props: t,
                key: n,
                ref: r,
                __k: null,
                __: null,
                __b: 0,
                __e: null,
                __d: void 0,
                __c: null,
                __h: null,
                constructor: void 0,
                __v: null == s ? ++o : s
            };
            return null == s && null != i.vnode && i.vnode(a), a
        }

        function v(e) {
            return e.children
        }

        function g(e, t) {
            this.props = e, this.context = t
        }

        function b(e, t) {
            if (null == t) return e.__ ? b(e.__, e.__.__k.indexOf(e) + 1) : null;
            for (var n; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
            return "function" == typeof e.type ? b(e) : null
        }

        function w(e) {
            var t, n;
            if (null != (e = e.__) && null != e.__c) {
                for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) {
                    e.__e = e.__c.base = n.__e;
                    break
                }
                return w(e)
            }
        }

        function _(e) {
            (!e.__d && (e.__d = !0) && a.push(e) && !x.__r++ || l !== i.debounceRendering) && ((l = i.debounceRendering) || setTimeout)(x)
        }

        function x() {
            for (var e; x.__r = a.length;) e = a.sort((function (e, t) {
                return e.__v.__b - t.__v.__b
            })), a = [], e.some((function (e) {
                var t, n, r, i, o, s;
                e.__d && (o = (i = (t = e).__v).__e, (s = t.__P) && (n = [], (r = p({}, i)).__v = i.__v + 1, P(s, i, r, t.__n, void 0 !== s.ownerSVGElement, null != i.__h ? [o] : null, n, null == o ? b(i) : o, i.__h), B(n, i), i.__e != o && w(i)))
            }))
        }

        function k(e, t, n, r, i, o, s, a, l, c) {
            var f, p, h, y, g, w, _, x = r && r.__k || d, k = x.length;
            for (n.__k = [], f = 0; f < t.length; f++) if (null != (y = n.__k[f] = null == (y = t[f]) || "boolean" == typeof y ? null : "string" == typeof y || "number" == typeof y || "bigint" == typeof y ? m(null, y, null, null, y) : Array.isArray(y) ? m(v, {children: y}, null, null, null) : y.__b > 0 ? m(y.type, y.props, y.key, null, y.__v) : y)) {
                if (y.__ = n, y.__b = n.__b + 1, null === (h = x[f]) || h && y.key == h.key && y.type === h.type) x[f] = void 0; else for (p = 0; p < k; p++) {
                    if ((h = x[p]) && y.key == h.key && y.type === h.type) {
                        x[p] = void 0;
                        break
                    }
                    h = null
                }
                P(e, y, h = h || u, i, o, s, a, l, c), g = y.__e, (p = y.ref) && h.ref != p && (_ || (_ = []), h.ref && _.push(h.ref, null, y), _.push(p, y.__c || g, y)), null != g ? (null == w && (w = g), "function" == typeof y.type && y.__k === h.__k ? y.__d = l = j(y, l, e) : l = C(e, y, h, x, g, l), "function" == typeof n.type && (n.__d = l)) : l && h.__e == l && l.parentNode != e && (l = b(h))
            }
            for (n.__e = w, f = k; f--;) null != x[f] && ("function" == typeof n.type && null != x[f].__e && x[f].__e == n.__d && (n.__d = b(r, f + 1)), I(x[f], x[f]));
            if (_) for (f = 0; f < _.length; f++) M(_[f], _[++f], _[++f])
        }

        function j(e, t, n) {
            for (var r, i = e.__k, o = 0; i && o < i.length; o++) (r = i[o]) && (r.__ = e, t = "function" == typeof r.type ? j(r, t, n) : C(n, r, r, i, r.__e, t));
            return t
        }

        function C(e, t, n, r, i, o) {
            var s, a, l;
            if (void 0 !== t.__d) s = t.__d, t.__d = void 0; else if (null == n || i != o || null == i.parentNode) e:if (null == o || o.parentNode !== e) e.appendChild(i), s = null; else {
                for (a = o, l = 0; (a = a.nextSibling) && l < r.length; l += 2) if (a == i) break e;
                e.insertBefore(i, o), s = o
            }
            return void 0 !== s ? s : i.nextSibling
        }

        function E(e, t, n) {
            "-" === t[0] ? e.setProperty(t, n) : e[t] = null == n ? "" : "number" != typeof n || f.test(t) ? n : n + "px"
        }

        function S(e, t, n, r, i) {
            var o;
            e:if ("style" === t) if ("string" == typeof n) e.style.cssText = n; else {
                if ("string" == typeof r && (e.style.cssText = r = ""), r) for (t in r) n && t in n || E(e.style, t, "");
                if (n) for (t in n) r && n[t] === r[t] || E(e.style, t, n[t])
            } else if ("o" === t[0] && "n" === t[1]) o = t !== (t = t.replace(/Capture$/, "")), t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + o] = n, n ? r || e.addEventListener(t, o ? O : D, o) : e.removeEventListener(t, o ? O : D, o); else if ("dangerouslySetInnerHTML" !== t) {
                if (i) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s"); else if ("href" !== t && "list" !== t && "form" !== t && "tabIndex" !== t && "download" !== t && t in e) try {
                    e[t] = null == n ? "" : n;
                    break e
                } catch (e) {
                }
                "function" == typeof n || (null != n && (!1 !== n || "a" === t[0] && "r" === t[1]) ? e.setAttribute(t, n) : e.removeAttribute(t))
            }
        }

        function D(e) {
            this.l[e.type + !1](i.event ? i.event(e) : e)
        }

        function O(e) {
            this.l[e.type + !0](i.event ? i.event(e) : e)
        }

        function P(e, t, n, r, o, s, a, l, c) {
            var u, d, f, h, y, m, b, w, _, x, j, C, E, S = t.type;
            if (void 0 !== t.constructor) return null;
            null != n.__h && (c = n.__h, l = t.__e = n.__e, t.__h = null, s = [l]), (u = i.__b) && u(t);
            try {
                e:if ("function" == typeof S) {
                    if (w = t.props, _ = (u = S.contextType) && r[u.__c], x = u ? _ ? _.props.value : u.__ : r, n.__c ? b = (d = t.__c = n.__c).__ = d.__E : ("prototype" in S && S.prototype.render ? t.__c = d = new S(w, x) : (t.__c = d = new g(w, x), d.constructor = S, d.render = T), _ && _.sub(d), d.props = w, d.state || (d.state = {}), d.context = x, d.__n = r, f = d.__d = !0, d.__h = []), null == d.__s && (d.__s = d.state), null != S.getDerivedStateFromProps && (d.__s == d.state && (d.__s = p({}, d.__s)), p(d.__s, S.getDerivedStateFromProps(w, d.__s))), h = d.props, y = d.state, f) null == S.getDerivedStateFromProps && null != d.componentWillMount && d.componentWillMount(), null != d.componentDidMount && d.__h.push(d.componentDidMount); else {
                        if (null == S.getDerivedStateFromProps && w !== h && null != d.componentWillReceiveProps && d.componentWillReceiveProps(w, x), !d.__e && null != d.shouldComponentUpdate && !1 === d.shouldComponentUpdate(w, d.__s, x) || t.__v === n.__v) {
                            d.props = w, d.state = d.__s, t.__v !== n.__v && (d.__d = !1), d.__v = t, t.__e = n.__e, t.__k = n.__k, t.__k.forEach((function (e) {
                                e && (e.__ = t)
                            })), d.__h.length && a.push(d);
                            break e
                        }
                        null != d.componentWillUpdate && d.componentWillUpdate(w, d.__s, x), null != d.componentDidUpdate && d.__h.push((function () {
                            d.componentDidUpdate(h, y, m)
                        }))
                    }
                    if (d.context = x, d.props = w, d.__v = t, d.__P = e, j = i.__r, C = 0, "prototype" in S && S.prototype.render) d.state = d.__s, d.__d = !1, j && j(t), u = d.render(d.props, d.state, d.context); else do {
                        d.__d = !1, j && j(t), u = d.render(d.props, d.state, d.context), d.state = d.__s
                    } while (d.__d && ++C < 25);
                    d.state = d.__s, null != d.getChildContext && (r = p(p({}, r), d.getChildContext())), f || null == d.getSnapshotBeforeUpdate || (m = d.getSnapshotBeforeUpdate(h, y)), E = null != u && u.type === v && null == u.key ? u.props.children : u, k(e, Array.isArray(E) ? E : [E], t, n, r, o, s, a, l, c), d.base = t.__e, t.__h = null, d.__h.length && a.push(d), b && (d.__E = d.__ = null), d.__e = !1
                } else null == s && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = A(n.__e, t, n, r, o, s, a, c);
                (u = i.diffed) && u(t)
            } catch (e) {
                t.__v = null, (c || null != s) && (t.__e = l, t.__h = !!c, s[s.indexOf(l)] = null), i.__e(e, t, n)
            }
        }

        function B(e, t) {
            i.__c && i.__c(t, e), e.some((function (t) {
                try {
                    e = t.__h, t.__h = [], e.some((function (e) {
                        e.call(t)
                    }))
                } catch (e) {
                    i.__e(e, t.__v)
                }
            }))
        }

        function A(e, t, n, i, o, s, a, l) {
            var c, d, f, p = n.props, y = t.props, m = t.type, v = 0;
            if ("svg" === m && (o = !0), null != s) for (; v < s.length; v++) if ((c = s[v]) && "setAttribute" in c == !!m && (m ? c.localName === m : 3 === c.nodeType)) {
                e = c, s[v] = null;
                break
            }
            if (null == e) {
                if (null === m) return document.createTextNode(y);
                e = o ? document.createElementNS("http://www.w3.org/2000/svg", m) : document.createElement(m, y.is && y), s = null, l = !1
            }
            if (null === m) p === y || l && e.data === y || (e.data = y); else {
                if (s = s && r.call(e.childNodes), d = (p = n.props || u).dangerouslySetInnerHTML, f = y.dangerouslySetInnerHTML, !l) {
                    if (null != s) for (p = {}, v = 0; v < e.attributes.length; v++) p[e.attributes[v].name] = e.attributes[v].value;
                    (f || d) && (f && (d && f.__html == d.__html || f.__html === e.innerHTML) || (e.innerHTML = f && f.__html || ""))
                }
                if (function (e, t, n, r, i) {
                    var o;
                    for (o in n) "children" === o || "key" === o || o in t || S(e, o, null, n[o], r);
                    for (o in t) i && "function" != typeof t[o] || "children" === o || "key" === o || "value" === o || "checked" === o || n[o] === t[o] || S(e, o, t[o], n[o], r)
                }(e, y, p, o, l), f) t.__k = []; else if (v = t.props.children, k(e, Array.isArray(v) ? v : [v], t, n, i, o && "foreignObject" !== m, s, a, s ? s[0] : n.__k && b(n, 0), l), null != s) for (v = s.length; v--;) null != s[v] && h(s[v]);
                l || ("value" in y && void 0 !== (v = y.value) && (v !== e.value || "progress" === m && !v || "option" === m && v !== p.value) && S(e, "value", v, p.value, !1), "checked" in y && void 0 !== (v = y.checked) && v !== e.checked && S(e, "checked", v, p.checked, !1))
            }
            return e
        }

        function M(e, t, n) {
            try {
                "function" == typeof e ? e(t) : e.current = t
            } catch (e) {
                i.__e(e, n)
            }
        }

        function I(e, t, n) {
            var r, o;
            if (i.unmount && i.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || M(r, null, t)), null != (r = e.__c)) {
                if (r.componentWillUnmount) try {
                    r.componentWillUnmount()
                } catch (e) {
                    i.__e(e, t)
                }
                r.base = r.__P = null
            }
            if (r = e.__k) for (o = 0; o < r.length; o++) r[o] && I(r[o], t, "function" != typeof e.type);
            n || null == e.__e || h(e.__e), e.__e = e.__d = void 0
        }

        function T(e, t, n) {
            return this.constructor(e, n)
        }

        function L(e, t, n) {
            var o, s, a;
            i.__ && i.__(e, t), s = (o = "function" == typeof n) ? null : n && n.__k || t.__k, a = [], P(t, e = (!o && n || t).__k = y(v, null, [e]), s || u, u, void 0 !== t.ownerSVGElement, !o && n ? [n] : s ? null : t.firstChild ? r.call(t.childNodes) : null, a, !o && n ? n : s ? s.__e : t.firstChild, o), B(a, e)
        }

        r = d.slice, i = {
            __e: function (e, t, n, r) {
                for (var i, o, s; t = t.__;) if ((i = t.__c) && !i.__) try {
                    if ((o = i.constructor) && null != o.getDerivedStateFromError && (i.setState(o.getDerivedStateFromError(e)), s = i.__d), null != i.componentDidCatch && (i.componentDidCatch(e, r || {}), s = i.__d), s) return i.__E = i
                } catch (t) {
                    e = t
                }
                throw e
            }
        }, o = 0, s = function (e) {
            return null != e && void 0 === e.constructor
        }, g.prototype.setState = function (e, t) {
            var n;
            n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = p({}, this.state), "function" == typeof e && (e = e(p({}, n), this.props)), e && p(n, e), null != e && this.__v && (t && this.__h.push(t), _(this))
        }, g.prototype.forceUpdate = function (e) {
            this.__v && (this.__e = !0, e && this.__h.push(e), _(this))
        }, g.prototype.render = v, a = [], x.__r = 0, c = 0, n.render = L, n.hydrate = function e(t, n) {
            L(t, n, e)
        }, n.createElement = y, n.h = y, n.Fragment = v, n.createRef = function () {
            return {current: null}
        }, n.isValidElement = s, n.Component = g, n.cloneElement = function (e, t, n) {
            var i, o, s, a = p({}, e.props);
            for (s in t) "key" == s ? i = t[s] : "ref" == s ? o = t[s] : a[s] = t[s];
            return arguments.length > 2 && (a.children = arguments.length > 3 ? r.call(arguments, 2) : n), m(e.type, a, i || e.key, o || e.ref, null)
        }, n.createContext = function (e, t) {
            var n = {
                __c: t = "__cC" + c++, __: e, Consumer: function (e, t) {
                    return e.children(t)
                }, Provider: function (e) {
                    var n, r;
                    return this.getChildContext || (n = [], (r = {})[t] = this, this.getChildContext = function () {
                        return r
                    }, this.shouldComponentUpdate = function (e) {
                        this.props.value !== e.value && n.some(_)
                    }, this.sub = function (e) {
                        n.push(e);
                        var t = e.componentWillUnmount;
                        e.componentWillUnmount = function () {
                            n.splice(n.indexOf(e), 1), t && t.call(e)
                        }
                    }), e.children
                }
            };
            return n.Provider.__ = n.Consumer.contextType = n
        }, n.toChildArray = function e(t, n) {
            return n = n || [], null == t || "boolean" == typeof t || (Array.isArray(t) ? t.some((function (t) {
                e(t, n)
            })) : n.push(t)), n
        }, n.options = i
    }, {}],
    126: [function (e, t, n) {
        var r, i, o, s, a = e("preact"), l = 0, c = [], u = [], d = a.options.__b, f = a.options.__r,
            p = a.options.diffed, h = a.options.__c, y = a.options.unmount;

        function m(e, t) {
            a.options.__h && a.options.__h(i, e, l || t), l = 0;
            var n = i.__H || (i.__H = {__: [], __h: []});
            return e >= n.__.length && n.__.push({__V: u}), n.__[e]
        }

        function v(e) {
            return l = 1, g(E, e)
        }

        function g(e, t, n) {
            var o = m(r++, 2);
            return o.t = e, o.__c || (o.__ = [n ? n(t) : E(void 0, t), function (e) {
                var t = o.t(o.__[0], e);
                o.__[0] !== t && (o.__ = [t, o.__[1]], o.__c.setState({}))
            }], o.__c = i), o.__
        }

        function b(e, t) {
            var n = m(r++, 4);
            !a.options.__s && C(n.__H, t) && (n.__ = e, n.u = t, i.__h.push(n))
        }

        function w(e, t) {
            var n = m(r++, 7);
            return C(n.__H, t) ? (n.__V = e(), n.u = t, n.__h = e, n.__V) : n.__
        }

        function _() {
            for (var e; e = c.shift();) if (e.__P) try {
                e.__H.__h.forEach(k), e.__H.__h.forEach(j), e.__H.__h = []
            } catch (t) {
                e.__H.__h = [], a.options.__e(t, e.__v)
            }
        }

        a.options.__b = function (e) {
            i = null, d && d(e)
        }, a.options.__r = function (e) {
            f && f(e), r = 0;
            var t = (i = e.__c).__H;
            t && (o === i ? (t.__h = [], i.__h = [], t.__.forEach((function (e) {
                e.__V = u, e.u = void 0
            }))) : (t.__h.forEach(k), t.__h.forEach(j), t.__h = [])), o = i
        }, a.options.diffed = function (e) {
            p && p(e);
            var t = e.__c;
            t && t.__H && (t.__H.__h.length && (1 !== c.push(t) && s === a.options.requestAnimationFrame || ((s = a.options.requestAnimationFrame) || function (e) {
                var t, n = function () {
                    clearTimeout(r), x && cancelAnimationFrame(t), setTimeout(e)
                }, r = setTimeout(n, 100);
                x && (t = requestAnimationFrame(n))
            })(_)), t.__H.__.forEach((function (e) {
                e.u && (e.__H = e.u), e.__V !== u && (e.__ = e.__V), e.u = void 0, e.__V = u
            }))), o = i = null
        }, a.options.__c = function (e, t) {
            t.some((function (e) {
                try {
                    e.__h.forEach(k), e.__h = e.__h.filter((function (e) {
                        return !e.__ || j(e)
                    }))
                } catch (n) {
                    t.some((function (e) {
                        e.__h && (e.__h = [])
                    })), t = [], a.options.__e(n, e.__v)
                }
            })), h && h(e, t)
        }, a.options.unmount = function (e) {
            y && y(e);
            var t, n = e.__c;
            n && n.__H && (n.__H.__.forEach((function (e) {
                try {
                    k(e)
                } catch (e) {
                    t = e
                }
            })), t && a.options.__e(t, n.__v))
        };
        var x = "function" == typeof requestAnimationFrame;

        function k(e) {
            var t = i, n = e.__c;
            "function" == typeof n && (e.__c = void 0, n()), i = t
        }

        function j(e) {
            var t = i;
            e.__c = e.__(), i = t
        }

        function C(e, t) {
            return !e || e.length !== t.length || t.some((function (t, n) {
                return t !== e[n]
            }))
        }

        function E(e, t) {
            return "function" == typeof t ? t(e) : t
        }

        n.useState = v, n.useReducer = g, n.useEffect = function (e, t) {
            var n = m(r++, 3);
            !a.options.__s && C(n.__H, t) && (n.__ = e, n.u = t, i.__H.__h.push(n))
        }, n.useLayoutEffect = b, n.useRef = function (e) {
            return l = 5, w((function () {
                return {current: e}
            }), [])
        }, n.useImperativeHandle = function (e, t, n) {
            l = 6, b((function () {
                return "function" == typeof e ? (e(t()), function () {
                    return e(null)
                }) : e ? (e.current = t(), function () {
                    return e.current = null
                }) : void 0
            }), null == n ? n : n.concat(e))
        }, n.useMemo = w, n.useCallback = function (e, t) {
            return l = 8, w((function () {
                return e
            }), t)
        }, n.useContext = function (e) {
            var t = i.context[e.__c], n = m(r++, 9);
            return n.c = e, t ? (null == n.__ && (n.__ = !0, t.sub(i)), t.props.value) : e.__
        }, n.useDebugValue = function (e, t) {
            a.options.useDebugValue && a.options.useDebugValue(t ? t(e) : e)
        }, n.useErrorBoundary = function (e) {
            var t = m(r++, 10), n = v();
            return t.__ = e, i.componentDidCatch || (i.componentDidCatch = function (e) {
                t.__ && t.__(e), n[1](e)
            }), [n[0], function () {
                n[1](void 0)
            }]
        }
    }, {preact: 125}],
    127: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.getAutoRegion = void 0;
        const r = e("../v7/v7-config"), i = (e, t, n) => new Promise((r => {
            const i = setTimeout((() => {
                console.error("Timeout while latency check for ", t), r()
            }), n);
            e().then((() => {
                clearTimeout(i), r()
            })).catch((e => {
                console.error("Error while latency check for ", t, e), clearTimeout(i), r()
            }))
        }));

        async function o(e) {
            const t = e.ok;
            if (-1 === t.indexOf(e.name)) throw new Error("okUrl " + t + " does not contain region " + e);
            return (async () => {
                const e = Date.now();
                return await fetch(t + "?time=" + e, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache"
                }).then((e => e.text())), Date.now() - e
            })()
        }

        n.getAutoRegion = async function (e) {
            const t = [...r.awsRegions], n = (() => {
                const e = {};
                for (const {name: t} of r.awsRegions) e[t] = [];
                return e
            })(), l = [];
            for (const r of t) {
                const t = async () => {
                    const t = r.name;
                    for (let i = 0; i < 5; ++i) n[t].push(await o(r)), e(t + "#" + (i + 1) + " (" + n[t][0] + " ms)")
                };
                l.push(i(t, r.name, 15e3))
            }
            await Promise.all(l);
            try {
                const e = /execute-api\.([^.]+)\.amazonaws.com\/dev\/ok/;
                if ("undefined" != typeof performance && void 0 !== performance.getEntriesByType) {
                    const t = performance.getEntriesByType("resource");
                    for (const r of t) if (void 0 !== r.name && void 0 !== r.duration) {
                        const t = e.exec(r.name);
                        null !== t && void 0 !== t[1] && n[t[1]].push(Math.round(r.duration))
                    }
                }
            } catch (e) {
                console.error("Can't use performance data", e)
            }
            let c = "eu-central-1", u = -1, d = "";
            const f = {};
            for (const e of Object.keys(n)) {
                const t = a(n[e]);
                t > 0 && (-1 === u || u > t) && (c = e, u = t);
                const r = s(n[e]);
                f[e] = r, d += (e + "         ").substring(0, 14) + ": [" + r.join(", ") + "]\n"
            }
            return console.log("Latency estimation:\n" + d), console.log("Auto region:", c, ", latency: " + u), {
                region: c,
                regionLatency: u,
                estimation: f
            }
        };
        const s = e => e.sort(((e, t) => e - t)), a = e => 0 === e.length ? 0 : s(e)[0]
    }, {"../v7/v7-config": 129, "core-js/modules/web.dom-collections.iterator.js": 118}],
    128: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.putPersonalBundle = n.getPersonalBundleUrl = void 0;
        const r = e("../../../v7-services/src/personal"), i = e("../../xhr"), o = e("./v7-config");
        n.getPersonalBundleUrl = function (e, t, n) {
            return (0, r.getPersonalBundleUrl)(e, t, n, void 0)
        }, n.putPersonalBundle = async function (e, t, n, r) {
            const s = await async function (e) {
                const t = new zip.ZipReader(new zip.Uint8ArrayReader(e), {useWebWorkers: !1}), n = await t.getEntries();
                let r = !0;
                for (const e of n) if (r = !0 === e.directory, !r) break;
                return t.close(), r
            }(r);
            if (s) return void console.warn("Ignore empty changes archive");
            const a = await (0, i.postObject)(o.personalPut + "?namespace=" + e + "&id=" + t + "&bundleUrl=" + encodeURIComponent(n));
            if (!a.success) throw new Error("Unable to put personal bundle");
            const l = JSON.parse(a.payload), c = l.signature, u = l.url;
            if (c["x-amz-content-sha256"] = "UNSIGNED-PAYLOAD", await (0, i.send)("put", u, "text", r.buffer, void 0, c), !(await (0, i.postObject)(o.personalAcl + "?namespace=" + e + "&id=" + t + "&bundleUrl=" + n)).success) throw new Error("Can't set ACL to personal bundle")
        }
    }, {
        "../../../v7-services/src/personal": 158,
        "../../xhr": 157,
        "./v7-config": 129,
        "core-js/modules/web.dom-collections.iterator.js": 118
    }],
    129: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.awsRegions = n.checkoutEndpoint = n.checkoutCreateTokenEndpoint = n.stopIpx = n.startIpx = n.addFreeTimeTierEndpoint = n.tokeInfoGetEndpoint = n.createTokenEndpoint = n.personalAcl = n.personalPut = n.endpointBase = void 0, n.endpointBase = "https://kdhkdsv558.execute-api.eu-central-1.amazonaws.com/dev", n.personalPut = n.endpointBase + "/personal/put", n.personalAcl = n.endpointBase + "/personal/acl", n.createTokenEndpoint = n.endpointBase + "/token/create", n.tokeInfoGetEndpoint = n.endpointBase + "/token/info/get", n.addFreeTimeTierEndpoint = n.endpointBase + "/token/add/free", n.startIpx = n.endpointBase + "/token/ipx/start", n.stopIpx = n.endpointBase + "/token/ipx/stop", n.checkoutCreateTokenEndpoint = n.endpointBase + "/checkout/token/create", n.checkoutEndpoint = "https://js-dos.com/checkout/index.html", n.awsRegions = [{
            label: "US East (N. Virginia)",
            name: "us-east-1",
            ok: "https://387k8l2vgf.execute-api.us-east-1.amazonaws.com/dev/ok"
        }, {
            label: "US East (Ohio)",
            name: "us-east-2",
            ok: "https://q32vlaa5ji.execute-api.us-east-2.amazonaws.com/dev/ok"
        }, {
            label: "US West (N. California)",
            name: "us-west-1",
            ok: "https://zittdd8vr2.execute-api.us-west-1.amazonaws.com/dev/ok"
        }, {
            label: "US West (Oregon)",
            name: "us-west-2",
            ok: "https://aw3gj5315i.execute-api.us-west-2.amazonaws.com/dev/ok"
        }, {
            label: "Europe (Frankfurt)",
            name: "eu-central-1",
            ok: "https://pdxnceto92.execute-api.eu-central-1.amazonaws.com/dev/ok"
        }, {
            label: "Europe (Ireland)",
            name: "eu-west-1",
            ok: "https://yjm6n35ii4.execute-api.eu-west-1.amazonaws.com/dev/ok"
        }, {
            label: "Europe (London)",
            name: "eu-west-2",
            ok: "https://u8k6qhll5d.execute-api.eu-west-2.amazonaws.com/dev/ok"
        }, {
            label: "Europe (Milan)",
            name: "eu-south-1",
            ok: "https://hn4uxbiro0.execute-api.eu-south-1.amazonaws.com/dev/ok"
        }, {
            label: "Europe (Paris)",
            name: "eu-west-3",
            ok: "https://oce5khcznd.execute-api.eu-west-3.amazonaws.com/dev/ok"
        }, {
            label: "Europe (Stockholm)",
            name: "eu-north-1",
            ok: "https://f3j2j43580.execute-api.eu-north-1.amazonaws.com/dev/ok"
        }, {
            label: "Asia Pacific (Hong Kong)",
            name: "ap-east-1",
            ok: "https://2dji6qhipb.execute-api.ap-east-1.amazonaws.com/dev/ok"
        }, {
            label: "Asia Pacific (Mumbai)",
            name: "ap-south-1",
            ok: "https://0htlj8u1m9.execute-api.ap-south-1.amazonaws.com/dev/ok"
        }, {
            label: "Asia Pacific (Osaka)",
            name: "ap-northeast-3",
            ok: "https://4z9rh02y37.execute-api.ap-northeast-3.amazonaws.com/dev/ok"
        }, {
            label: "Asia Pacific (Seoul)",
            name: "ap-northeast-2",
            ok: "https://dv8crqb5j6.execute-api.ap-northeast-2.amazonaws.com/dev/ok"
        }, {
            label: "Asia Pacific (Singapore)",
            name: "ap-southeast-1",
            ok: "https://e0w35dr520.execute-api.ap-southeast-1.amazonaws.com/dev/ok"
        }, {
            label: "Asia Pacific (Sydney)",
            name: "ap-southeast-2",
            ok: "https://a2bnpow0ul.execute-api.ap-southeast-2.amazonaws.com/dev/ok"
        }, {
            label: "Asia Pacific (Tokyo)",
            name: "ap-northeast-1",
            ok: "https://snvzlstk05.execute-api.ap-northeast-1.amazonaws.com/dev/ok"
        }, {
            label: "Canada",
            name: "ca-central-1",
            ok: "https://wqwl5he8y7.execute-api.ca-central-1.amazonaws.com/dev/ok"
        }, {
            label: "Middle East (Bahrain)",
            name: "me-south-1",
            ok: "https://g480v58gnk.execute-api.me-south-1.amazonaws.com/dev/ok"
        }, {
            label: "South America (São Paulo)",
            name: "sa-east-1",
            ok: "https://wvhym3rtc1.execute-api.sa-east-1.amazonaws.com/dev/ok"
        }, {
            label: "Africa (Cape Town)",
            name: "af-south-1",
            ok: "https://r0atydfi7k.execute-api.af-south-1.amazonaws.com/dev/ok"
        }]
    }, {}],
    130: [function (e, t, n) {
        "use strict";
        var r, i, o, s, a;

        function l(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.ActionBar = void 0;
        const c = e("../dom"), u = e("../icons"), d = e("./controls");

        function f(e) {
            if (!0 === e.options().noSocialLinks || !0 !== e.options().noSideBar) return null;
            return (0, c.html)(i || (i = l(['\n        <div class="h-5 w-5 my-4 text-pink-400 cursor-pointer" onClick=', ">\n            <", ' class="h-5 w-5" />\n        </div>\n    '])), (function () {
                e.options().windowOpen("https://dos.zone/", "_blank")
            }), u.Icons.Plus)
        }

        function p(e) {
            if (!0 === e.options().noSideBar) return null;

            function t() {
                e.sideBar ? e.closeSideBar() : e.openSideBar()
            }

            return !0 !== e.options().withNetworkingApi ? (0, c.html)(o || (o = l(['\n        <div class="h-6 w-6 my-4 text-gray-600 cursor-pointer" onClick=', ">\n            <", ' class="h-6 w-6" />\n        </div>\n    '])), t, u.Icons.DotsHorizontal) : e.ipxConnected ? (0, c.html)(s || (s = l(['\n        <div class="h-6 w-6 my-4 text-green-400 cursor-pointer" onClick=', ">\n            <", ' class="h-6 w-6" />\n        </div>\n    '])), t, u.Icons.Online) : (0, c.html)(a || (a = l(['\n            <div class="h-6 w-6 my-4 relative text-red-800 cursor-pointer" onClick=', ">\n                <", ' class="h-6 w-6" />\n                <span class="animate-ping absolute inline-flex top-0 left-0\n                    h-full w-full rounded-full bg-red-400 opacity-75"></span>\n            </div>\n        '])), t, u.Icons.Offline)
        }

        n.ActionBar = function (e) {
            if (!e.actionBar) return null;
            const t = !0 === e.options().noSideBar && !0 === e.options().noSocialLinks;
            return (0, c.html)(r || (r = l(['\n    <div class="bg-gray-200 shadow w-10 h-full overflow-hidden flex flex-col items-center">\n        <', " ...", " />\n        <", " ...", " />\n        <", ' column="true" class="flex-grow \n            ', '" \n            portal=', " ...", " />\n    </div>\n    "])), p, e, f, e, d.Controls, t ? "" : " border-t-2 border-gray-400", !0, e)
        }
    }, {"../dom": 151, "../icons": 153, "./controls": 134}],
    131: [function (e, t, n) {
        "use strict";
        var r;
        Object.defineProperty(n, "__esModule", {value: !0}), n.ActionHide = void 0;
        const i = e("../dom"), o = e("../icons");
        n.ActionHide = function (e) {
            return (0, i.html)(r || (t = ['\n    <div class="filter transition-opacity duration-1000\n                        bg-gray-200 ', '\n                        w-5 h-12\n                        rounded-r-md cursor-pointer" onClick=', '>\n        <div class="h-4 w-4 my-4">\n            <', ' class="h-4 w-4" />\n        </div>\n    </div>\n    '], n || (n = t.slice(0)), r = Object.freeze(Object.defineProperties(t, {raw: {value: Object.freeze(n)}}))), e.class, (() => e.setActionBar(!e.actionBar)), e.actionBar ? o.Icons.ChevronLeft : o.Icons.ChevronRight);
            var t, n
        }
    }, {"../dom": 151, "../icons": 153}],
    132: [function (e, t, n) {
        "use strict";
        var r;
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.ActionSaveOrExit = void 0;
        const i = e("preact/hooks"), o = e("../dom"), s = e("../icons");
        n.ActionSaveOrExit = function (e) {
            const t = e.options().onExit, [n, a] = (0, i.useState)(!1), [l, c] = (0, i.useState)(!1),
                u = "function" == typeof t;
            return (0, i.useEffect)((() => {
                const t = e.options().preventUnload;
                if (!l && u && !1 !== t) return window.addEventListener("beforeunload", n), () => {
                    window.removeEventListener("beforeunload", n)
                };

                function n(t) {
                    if (void 0 === e.player().ciPromise) return;
                    const n = u ? "Please use close button to save progress before closing!" : "Please use save button to save progress before closing!";
                    setTimeout((() => {
                        e.player().layers.notyf.error(n), a(!0)
                    }), 16), t.preventDefault(), t.returnValue = n
                }
            }), [a, e.player, l, t, u]), l ? null : (0, o.html)(r || (d = ['\n    <div class="', " flex items-center justify-center \n        filter transition-opacity duration-1000\n        bg-gray-200 ", '\n        cursor-pointer" onClick=', '>\n        <div class="h-6 w-6">\n            <', ' class="h-6 w-6" />\n        </div>\n    </div>\n    '], f || (f = d.slice(0)), r = Object.freeze(Object.defineProperties(d, {raw: {value: Object.freeze(f)}}))), e.class ? e.class : "", n ? " text-red-500 animate-pulse" : "", (async function () {
                try {
                    a(!1), c(!0);
                    const i = e.player();
                    i.layers.notyf.success("Saving, please wait...");
                    try {
                        await i.layers.save()
                    } catch (e) {
                        console.error(e), i.layers.notyf.error(e.message)
                    }
                    if (u) {
                        try {
                            var n, r;
                            await (null === (n = (r = e.options()).onBeforeExit) || void 0 === n ? void 0 : n.call(r)), await i.stop()
                        } catch (e) {
                            console.error(e), i.layers.notyf.error(e.message)
                        }
                        t()
                    }
                } finally {
                    c(!1)
                }
            }), u ? s.Icons.XCircle : s.Icons.FloppyDisk);
            var d, f
        }
    }, {"../dom": 151, "../icons": 153, "core-js/modules/web.dom-collections.iterator.js": 118, "preact/hooks": 126}],
    133: [function (e, t, n) {
        "use strict";
        var r, i;

        function o(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.Client = void 0;
        const s = e("preact/hooks"), a = e("../dom"), l = e("../icons"), c = e("../dom");
        n.Client = function (e) {
            const [t, n] = (0, s.useState)(!1);
            if (void 0 === e.requestClientId && null === e.clientId) return null;
            if (null === e.clientId) {
                const i = () => {
                    void 0 !== e.requestClientId && (n(!0), e.requestClientId(!0).then((t => {
                        n(!1), e.setClientId(t)
                    })).catch((e => {
                        n(!1), console.error(e)
                    })))
                };
                return (0, a.html)(r || (r = o(['\n            <div class="flex flex-row justify-center items-center ', '">\n                <div class="h-6 w-6 text-red-800 animate-pulse mr-2">\n                    <', ' class="h-6 w-6" />\n                </div>\n                <div class="border-2 rounded px-4\n                    ', ' \n                    cursor-pointer" onClick=', ">\n                    Login\n                </div>\n            </div>\n        "])), e.class, l.Icons.UserCircle, t ? " text-gray-400 border-gray-400" : "text-blue-400 border-blue-400", i)
            }
            const u = e.clientId.id;
            return (0, a.html)(i || (i = o(['\n        <div class="flex flex-row justify-center ', '">\n            <div class="h-6 w-6 text-green-400 mr-2">\n                <', ' class="h-6 w-6" />\n            </div>\n            <div class="flex-shrink overflow-hidden overflow-ellipsis">', '</div>\n            <div class="h-6 w-6 ml-2 cursor-pointer" onClick=', ">\n                <", ' class="h-6 w-6" />\n            </div>\n        </div>\n    '])), e.class, l.Icons.UserCircle, u, (async function () {
                e.closeSideBar();
                const t = e.player();
                try {
                    await async function (e) {
                        if (!e.ciPromise) return;
                        const t = await e.ciPromise, n = await t.persist();
                        (0, c.downloadFile)(n, "saves.zip", "application/zip")
                    }(t)
                } catch (e) {
                    t.layers.notyf.error("Unexpected error"), console.error(e)
                }
            }), l.Icons.Download)
        }
    }, {"../dom": 151, "../icons": 153, "core-js/modules/web.dom-collections.iterator.js": 118, "preact/hooks": 126}],
    134: [function (e, t, n) {
        "use strict";
        var r, i, o;

        function s(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.Controls = void 0;
        const a = e("preact/hooks"), l = e("../dom"), c = e("../icons");

        function u(e) {
            const [t, n] = (0, a.useState)(!1);

            async function r(r, i) {
                r.stopPropagation(), await e.setAutolock(i), t && n(!1)
            }

            return (0, l.html)(i || (i = s(['\n        <div class="menu-button h-6 w-6 text-green-400 cursor-pointer" onClick=', ">\n            <", ' class="h-6 w-6" />\n            <div class="', ' absolute z-50 \n                        bg-gray-200 -mt-7 h-8 left-10 flex flex-row items-center\n                         rounded-r-md cursor-pointer" onClick=', '>\n                <div class="flex flex-row ', '">\n                    <div class="h-6 w-6 mx-2 \n                        ', '"\n                        onClick=', ">\n                        <", ' class="h-6 w-6" />\n                    </div>\n                    <div class="h-6 w-6 mx-2 \n                        ', '"\n                        onClick=', ">\n                        <", ' class="h-6 w-6" />\n                    </div>\n                </div>\n            </div>\n        </div>\n    '])), (async function (i) {
                i.target.classList.contains("sensitivity") || (e.portal ? n(!t) : await async function (t) {
                    await r(t, !e.autolock)
                }(i), i.preventDefault(), i.stopPropagation())
            }), e.autolock ? c.Icons.CursorClick : c.Icons.Cursor, e.portal ? "" : "hidden", (() => {
            }), t ? "" : "hidden", e.autolock ? "text-black" : "text-green-400", (e => r(e, !1)), c.Icons.Cursor, e.autolock ? "text-green-400" : "text-black", (e => r(e, !0)), c.Icons.CursorClick)
        }

        function d(e) {
            const [t, n] = (0, a.useState)(!1);
            return (0, l.html)(o || (o = s(['\n    <div class="h-6 w-6 text-green-400 cursor-pointer" onClick=', ">\n            <", ' class="h-6 w-6" />\n            <div class="', ' absolute z-50 bg-gray-200 -mt-7 h-8 left-10 flex flex-row items-center\n                             rounded-r-md cursor-pointer" onClick=', '>\n                <div class="h-6 w-6 mx-2 \n                    ', '"\n                    onClick=', ">\n                    <", ' class="h-6 w-6" />\n                </div>\n                <div class="h-6 w-6 mx-2 \n                    ', '"\n                    onClick=', ">\n                    <", ' class="h-6 w-6" />\n                </div>\n                <div class="h-6 w-6 mx-2  ', '"\n                    onClick=', ">\n                    <", ' class="h-6 w-6" />\n                </div>\n            </div>\n        </div>\n    '])), (function () {
                e.portal ? n(!t) : e.setMobileControls(!e.mobileControls)
            }), e.mirroredControls ? c.Icons.SwithcHorizontal : e.mobileControls ? c.Icons.Mobile : c.Icons.EyeOff, t ? "" : "hidden", (() => {
            }), e.mobileControls || e.mirroredControls ? "text-black" : "text-green-400", (async function (t) {
                await e.setMirroredControls(!1), await e.setMobileControls(!1), n(!1), t.stopPropagation()
            }), c.Icons.EyeOff, !e.mirroredControls && e.mobileControls ? "text-green-400" : "text-black", (async function (t) {
                await e.setMobileControls(!0), await e.setMirroredControls(!1), n(!1), t.stopPropagation()
            }), c.Icons.Mobile, e.mirroredControls ? "text-green-400" : "text-black", (async function (t) {
                await e.setMirroredControls(!0), n(!1), t.stopPropagation()
            }), c.Icons.SwithcHorizontal)
        }

        n.Controls = function (e) {
            return (0, l.html)(r || (r = s(['\n    <div class="flex ', " justify-evenly ", '">\n        <', " ...", " />\n        <", " ...", ' />\n        <div class="h-6 w-6 ', ' cursor-pointer"\n            onClick=', ">\n            <", ' class="h-6 w-6" />\n        </div>\n        <div class="h-6 w-6 ', ' cursor-pointer" onClick=', ">\n            <", ' class="h-6 w-6" />\n        </div>\n        <div class="h-6 w-6 ', ' cursor-pointer" onClick=', ">\n            <", ' class="h-6 w-6" />\n        </div>\n        <div class="h-6 w-6 ', " \n        ", ' cursor-pointer" onClick=', ">\n            <", ' class="h-6 w-6" />\n        </div>\n    </div>\n    '])), e.column ? " flex-col" : "flex-row", e.class, u, e, d, e, e.pause ? " text-red-400 animate-pulse" : "font-bold", (function () {
                e.setPause(!e.pause), e.closeSideBar()
            }), e.pause ? c.Icons.Play : c.Icons.Pause, e.mute ? " text-green-400" : "", (function () {
                e.setMute(!e.mute), e.closeSideBar()
            }), e.mute ? c.Icons.VolumeOff : c.Icons.VolumeUp, e.keyboard ? " text-green-400" : "", (function () {
                e.toggleKeyboard(), e.closeSideBar()
            }), c.Icons.PencilAlt, e.fullscreen ? " text-green-400" : "", !0 === e.options().noFullscreen ? "hidden" : "", (function () {
                e.toggleFullscreen(), e.closeSideBar()
            }), c.Icons.ArrowsExpand)
        }
    }, {"../dom": 151, "../icons": 153, "core-js/modules/web.dom-collections.iterator.js": 118, "preact/hooks": 126}],
    135: [function (e, t, n) {
        "use strict";
        var r;
        Object.defineProperty(n, "__esModule", {value: !0}), n.SideBarCpuControl = void 0;
        const i = e("../dom"), o = e("../icons"), s = e("./horizontal-slider");
        n.SideBarCpuControl = function (e) {
            return (0, i.html)(r || (t = ["\n        <", " minValue=", " maxValue=", '\n            maxLabel="max"\n            initialValue=', " \n            onChange=", "\n            icon=", "\n            registerListner=", "\n            removeListener=", "\n            />\n    "], n || (n = t.slice(0)), r = Object.freeze(Object.defineProperties(t, {raw: {value: Object.freeze(n)}}))), s.HorizontalSlider, 100, 5e3, 5e3, (e => {
            }), o.Icons.VolumeUp, (() => {
            }), (() => {
            }));
            var t, n
        }
    }, {"../dom": 151, "../icons": 153, "./horizontal-slider": 136}],
    136: [function (e, t, n) {
        "use strict";
        var r;
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.HorizontalSlider = void 0;
        const i = e("preact/hooks"), o = e("../dom");
        n.HorizontalSlider = function (e) {
            const {minValue: t, maxValue: n, initialValue: s, onChange: a, icon: l} = e, c = n - t,
                u = (0, i.useRef)(null), [d, f] = (0, i.useState)(s), [p, h] = (0, i.useState)(0);
            (0, i.useEffect)((() => {
                if (null === u || null === u.current) return;
                let t = !1;
                const n = u.current, r = e => {
                    const t = n.getBoundingClientRect(), r = (e.clientX - t.left) / t.width;
                    return Math.max(Math.min(1, r), 0) * c
                }, i = e => {
                    e.target !== n || t || (t = !0, h(80), f(r(e)), e.stopPropagation(), e.preventDefault())
                }, o = e => {
                    if (!t) return;
                    const n = r(e);
                    f(n), a(n), e.stopPropagation(), e.preventDefault()
                }, s = e => {
                    if (!t) return;
                    t = !1, h(0);
                    const n = r(e);
                    f(n), a(n), e.stopPropagation(), e.preventDefault()
                };
                return window.addEventListener("pointerdown", i), window.addEventListener("pointermove", o), window.addEventListener("pointerup", s), window.addEventListener("pointercancel", s), n.addEventListener("pointerup", s), n.addEventListener("pointercancel", s), e.registerListner(f), () => {
                    e.removeListener(f), window.removeEventListener("pointerdown", i), window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s), window.removeEventListener("pointercancel", s), n.removeEventListener("pointerup", s), n.removeEventListener("pointercancel", s)
                }
            }), [u]);
            const y = Math.max(0, Math.min(100, Math.round(d / c * 100))) + "%";
            let m = Math.round(10 * (t + d)) / 10 + "";
            return t + d === n && void 0 !== e.maxLabel && (m = e.maxLabel), (0, o.html)(r || (v = ['\n        <div class="h-full flex flex-row py-0 items-center">\n            <div class="bg-gray-200 rounded flex items-center justify-center h-6 w-5 lt-4 text-gray-600">\n                <', ' class="h-4 w-4" />\n            </div>\n            <div class="cursor-pointer flex-grow px-4 py-2" ref=', ">\n                <div class=", '>\n                    <div class="flex flex-row items-center absolute -mt-3" style=', '>\n                        <div class="bg-gray-600 -ml-2 flex-shrink-0 w-6 h-6 rounded-full"></div>\n                        <div class="bg-green-100 ml-2 py-1 px-2 rounded z-50 ', '">\n                            ', "\n                        </div>\n                    </div>    \n                </div>\n            </div>\n        </div>\n    "], g || (g = v.slice(0)), r = Object.freeze(Object.defineProperties(v, {raw: {value: Object.freeze(g)}}))), l, u, "pointer-events-none relative sensitivity rounded-2xl bg-gray-400 h-2 w-full" + (e.class ? e.class : ""), {left: y}, "opacity-" + p, m);
            var v, g
        }
    }, {"../dom": 151, "core-js/modules/web.dom-collections.iterator.js": 118, "preact/hooks": 126}],
    137: [function (e, t, n) {
        "use strict";
        var r;
        Object.defineProperty(n, "__esModule", {value: !0}), n.Region = void 0;
        const i = e("../dom"), o = e("../icons");
        n.Region = function (e) {
            let t = e.region;
            return null !== t && null !== e.latencyInfo && (t += " (" + e.latencyInfo.regionLatency + " ms)"), (0, i.html)(r || (n = ['\n        <div class="flex flex-row justify-between items-center ', '">\n            <div class="text-gray-600">Region</div>\n            <div class="px-4 overflow-hidden overflow-ellipsis whitespace-nowrap flex-shrink">\n                ', '\n            </div>\n            <div class="h-6 w-6 ', '" \n                onClick=', ">\n                <", ' class="h-6 w-6" />\n            </div>\n        </div>\n    '], s || (s = n.slice(0)), r = Object.freeze(Object.defineProperties(n, {raw: {value: Object.freeze(s)}}))), e.class, t || e.estimatingRegion || "Connecting...", null === e.region ? "animate-reverse-spin" : "cursor-pointer", (function () {
                null !== e.region && e.setRegion(null)
            }), o.Icons.Refresh);
            var n, s
        }
    }, {"../dom": 151, "../icons": 153}],
    138: [function (e, t, n) {
        "use strict";
        var r, i;

        function o(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.SideBarScaleControl = n.ActionBarScaleControl = void 0;
        const s = e("../dom"), a = e("../icons"), l = e("./vertical-slider"), c = e("./horizontal-slider");
        n.ActionBarScaleControl = function (e) {
            return e.mobileControls || e.mirroredControls ? (0, s.html)(r || (r = o(["\n        <", " minValue=", " maxValue=", "\n            initialValue=", " \n            onChange=", "\n            icon=", "\n            registerListner=", "\n            removeListener=", "\n            />\n    "])), l.VerticalSlider, .8, 2.5, e.player().scaleControls, (t => e.player().setScaleControls(t)), e.mirroredControls ? a.Icons.SwithcHorizontal : a.Icons.Mobile, e.player().registerOnScaleChanged, e.player().removeOnScaleChanged) : null
        }, n.SideBarScaleControl = function (e) {
            return (0, s.html)(i || (i = o(["\n        <", " minValue=", " maxValue=", "\n            initialValue=", " \n            onChange=", "\n            icon=", "\n            registerListner=", "\n            removeListener=", "\n            />\n    "])), c.HorizontalSlider, .8, 2.5, e.player().scaleControls, (t => e.player().setScaleControls(t)), e.mirroredControls ? a.Icons.SwithcHorizontal : a.Icons.Mobile, e.player().registerOnScaleChanged, e.player().removeOnScaleChanged)
        }
    }, {"../dom": 151, "../icons": 153, "./horizontal-slider": 136, "./vertical-slider": 149}],
    139: [function (e, t, n) {
        "use strict";
        var r, i;

        function o(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.SideBarSensitivityControl = n.ActionBarSensitivityControl = void 0;
        const s = e("../dom"), a = e("../icons"), l = e("./vertical-slider"), c = e("./horizontal-slider");
        n.ActionBarSensitivityControl = function (e) {
            return e.autolock ? (0, s.html)(r || (r = o(["\n        <", " minValue=", " maxValue=", "\n            initialValue=", " \n            onChange=", "\n            icon=", "\n            registerListner=", "\n            removeListener=", "\n            />\n    "])), l.VerticalSlider, .1, 4, e.player().sensitivity, (t => e.player().setSensitivity(t)), a.Icons.CursorClick, e.player().registerOnSensitivityChanged, e.player().removeOnSensitivityChanged) : null
        }, n.SideBarSensitivityControl = function (e) {
            return (0, s.html)(i || (i = o(["\n        <", " minValue=", " maxValue=", "\n            initialValue=", " \n            onChange=", "\n            icon=", "\n            registerListner=", "\n            removeListener=", "\n            />\n    "])), c.HorizontalSlider, .1, 4, e.player().sensitivity, (t => e.player().setSensitivity(t)), a.Icons.CursorClick, e.player().registerOnSensitivityChanged, e.player().removeOnSensitivityChanged)
        }
    }, {"../dom": 151, "../icons": 153, "./horizontal-slider": 136, "./vertical-slider": 149}],
    140: [function (e, t, n) {
        "use strict";
        var r, i, o;

        function s(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.SideBar = void 0;
        const a = e("preact/hooks"), l = e("../dom"), c = e("../icons"), u = e("./sidebar/main"),
            d = e("./sidebar/latency-info"), f = e("./sidebar/networking"), p = e("../backend/v7/latency");

        function h(e) {
            if (!0 === e.options().noSocialLinks) return null;

            function t() {
                e.options().windowOpen("https://discord.com/invite/hMVYEbG", "_blank")
            }

            function n() {
                e.options().windowOpen("https://t.me/doszonechat", "_blank")
            }

            return !0 === ("networking" === e.sideBarPage) ? (0, l.html)(i || (i = s(['\n        <div class="flex flex-row justify-around items-center">\n            <div class="font-bold text-purple-600">Matchmaking:</div>\n            <div class="h-6 w-6 text-gray-600 cursor-pointer" onClick=', ">\n                <", ' class="h-6 w-6" />\n            </div>\n            <div class="h-4 w-4 mt-0.5 text-gray-600 cursor-poiner" onClick=', ">\n                <", ' class="h-4 w-4" />\n            </div>\n        </div>\n    '])), t, c.Icons.Discord, n, c.Icons.Telegram) : (0, l.html)(o || (o = s(['\n        <div class="flex flex-row justify-around">\n            <div class="h-6 w-6 -mt-1 text-gray-600 cursor-pointer" onClick=', ">\n                <", ' class="h-6 w-6" />\n            </div>\n            <div class="h-4 w-4 text-gray-600 cursor-pointer" onClick=', ">\n                <", ' class="h-4 w-4" />\n            </div>\n            <div class="h-4 w-4 text-gray-600 cursor-pointer" onClick=', ">\n                <", ' class="h-4 w-4" />\n            </div>\n            <div class="h-6 w-6 -mt-1 text-gray-600 cursor-pointer" onClick=', ">\n                <", ' class="h-6 w-6" />\n            </div>\n        </div>\n    '])), t, c.Icons.Discord, n, c.Icons.Telegram, (function () {
                e.options().windowOpen("https://twitter.com/intent/user?screen_name=doszone_db", "_blank")
            }), c.Icons.Twitter, (function () {
                e.options().windowOpen("https://dos.zone/donate/", "_blank")
            }), c.Icons.CurrencyDollar)
        }

        n.SideBar = function (e) {
            if (!e.sideBar) return null;
            (0, a.useEffect)((() => {
                e.options().withNetworkingApi && null === e.region && (0, p.getAutoRegion)(e.setEstimatingRegion).then((t => {
                    e.setLatencyInfo(t), e.setRegion(t.region)
                })).catch(console.error)
            }), [e.region]);
            const t = "networking" === e.sideBarPage;
            return (0, l.html)(r || (r = s(['\n    <div class="flex flex-col filter absolute z-50 top-0 bottom-0 right-0 px-8 pt-6\n                w-full sm:w-80 rounded-l-lg drop-shadow-lg bg-white overflow-y-auto overflow-x-hidden pb-4">\n        <div class="transform absolute text-gray-400 hover:text-gray-800\n                            top-2 left-2 cursor-pointer hover:scale-125" onClick=', ">\n            <", ' class="h-6 w-6" />\n        </div>\n        <div class="transform absolute text-gray-400 hover:text-gray-800\n                             top-2 right-2 cursor-pointer hover:scale-125\n                             ', '" onClick=', ">\n            <", ' class="h-6 w-6" />\n        </div>\n    \n    \n        <', " ...", " />\n        <", " ...", " />\n        <", " ...", ' />\n\n        <div class="flex-grow"></div>\n    \n        <', " ...", " />\n    </div>\n    "])), (function () {
                "main" === e.sideBarPage ? e.closeSideBar() : e.setSideBarPage("main")
            }), "main" === e.sideBarPage ? c.Icons.XCircle : c.Icons.ArrowsCircleLeft, t ? "text-purple-400" : "", (function () {
                t ? e.options().windowOpen("https://youtu.be/XEoWLQmU168", "_blank") : (e.setShowTips(!0), e.closeSideBar())
            }), c.Icons.QuestionMarkCircle, u.Main, e, d.LatencyInfo, e, f.Networking, e, h, e)
        }
    }, {
        "../backend/v7/latency": 127,
        "../dom": 151,
        "../icons": 153,
        "./sidebar/latency-info": 141,
        "./sidebar/main": 142,
        "./sidebar/networking": 143,
        "preact/hooks": 126
    }],
    141: [function (e, t, n) {
        "use strict";
        var r, i, o, s, a;

        function l(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.LatencyInfo = void 0;
        const c = e("../../dom"), u = e("../../icons");
        n.LatencyInfo = function (e) {
            if (null === e.latencyInfo) return null;
            const t = t => {
                e.setSideBarPage("latency-info"), t.stopPropagation(), t.preventDefault()
            };
            if (!0 === e.asButton && "main" === e.sideBarPage) return (0, c.html)(r || (r = l(['\n        <div class="flex flex-row justify-between items-center cursor-pointer ', ' my-2"\n            onClick=', '>\n            <div class="">\n                Show latency\n            </div>\n            <div>\n                <', ' class="text-green-400 h-6 -w-6" />\n            </div>\n        </div>\n        '])), e.class, t, u.Icons.ArrowsCircleRight);
            if ("latency-info" !== e.sideBarPage) return null;
            const n = [];
            for (const t of Object.keys(e.latencyInfo.estimation)) {
                const r = [];
                r.push((0, c.html)(i || (i = l(['<div class="text-xs w-24 font-bold whitespace-nowrap break-words">', "</div>"])), t));
                for (let n = 0; n < 4; ++n) r.push((0, c.html)(o || (o = l(['\n                <div class="text-xs text-gray-600 text-right">\n                    ', "\n                </div>\n            "])), e.latencyInfo.estimation[t][n]));
                n.push((0, c.html)(s || (s = l(['<div class="flex flex-row flex-wrap justify-between">', "</div>"])), r))
            }
            return (0, c.html)(a || (a = l(['\n        <div class="sidebar-header">Latency</div>\n        <div class="flex flex-col">\n            ', "\n        </div>\n    "])), n)
        }
    }, {"../../dom": 151, "../../icons": 153, "core-js/modules/web.dom-collections.iterator.js": 118}],
    142: [function (e, t, n) {
        "use strict";
        var r, i, o, s, a, l, c;

        function u(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.Main = void 0;
        const d = e("../../dom"), f = e("../client"), p = e("../controls"), h = e("../region"), y = e("./latency-info"),
            m = e("../../icons"), v = (e("../cpu-control"), e("../scale-control")), g = e("../volume-control"),
            b = e("../sensitivity-control");

        function w(e) {
            return (0, d.html)(l || (l = u(['<div class="flex flex-row items-center justify-center my-2">\n        <div class="w-20 text-sm overflow-hidden overflow-ellipsis">', '</div>\n        <div class="flex-grow"><', " ...", " /></div>\n    </div>"])), e.label, e.slideBar, e.appProps)
        }

        function _(e) {
            return null === e.region ? null : (0, d.html)(c || (c = u(['\n        <div class="flex flex-row justify-between items-center cursor-pointer ', '"\n                onClick=', '>\n            <div class="">\n                ', "\n            </div>\n            <div>\n                <", ' class="text-green-400 h-6 -w-6" />\n            </div>\n        </div>\n    '])), e.class, (() => e.setSideBarPage("networking")), e.ipxConnected ? "IPX [Connected]" : "Configure networks", m.Icons.ArrowsCircleRight)
        }

        n.Main = function (e) {
            if ("main" !== e.sideBarPage) return null;
            const t = !0 === e.options().withNetworkingApi;
            return (0, d.html)(r || (r = u(["\n        <", ' class="mt-2 mb-2 pb-2 border-b-2 border-green-200" ...', " />\n        <", ' class="mt-2" portal=', " ...", " />\n        \n        ", "\n        ", "\n        ", "\n        ", '\n\n        <div class="sidebar-header mt-8">Configuration</div>\n        ', "\n        <", ' label="Volume" slideBar=', " appProps=", " />\n        <", ' label="Sensitivity" slideBar=', " appProps=", " />\n        <", ' label="Scale" slideBar=', " appProps=", " />\n    "])), f.Client, e, p.Controls, !1, e, t && (0, d.html)(i || (i = u(['<div class="sidebar-header mt-8">Networking</div>']))), t && (0, d.html)(o || (o = u(["<", ' class="mt-2" ...', " />"])), h.Region, e), t && (0, d.html)(s || (s = u(["<", " ...", ' class="mt-4" asButton=', " />"])), y.LatencyInfo, e, !0), t && (0, d.html)(a || (a = u(["<", " ...", ' class="mt-2" />'])), _, e), !1, w, g.SideBarVolumeControl, e, w, b.SideBarSensitivityControl, e, w, v.SideBarScaleControl, e)
        }
    }, {
        "../../dom": 151,
        "../../icons": 153,
        "../client": 133,
        "../controls": 134,
        "../cpu-control": 135,
        "../region": 137,
        "../scale-control": 138,
        "../sensitivity-control": 139,
        "../volume-control": 150,
        "./latency-info": 141
    }],
    143: [function (e, t, n) {
        "use strict";
        var r;
        Object.defineProperty(n, "__esModule", {value: !0}), n.Networking = void 0;
        const i = e("../../dom"), o = e("./token/token");
        n.Networking = function (e) {
            return "networking" !== e.sideBarPage ? null : (0, i.html)(r || (t = ["\n        <", " ...", " />\n    "], n || (n = t.slice(0)), r = Object.freeze(Object.defineProperties(t, {raw: {value: Object.freeze(n)}}))), o.TokenConfiguration, e);
            var t, n
        }
    }, {"../../dom": 151, "./token/token": 146}],
    144: [function (e, t, n) {
        "use strict";
        var r, i, o, s, a;

        function l(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.TokenAddTime = void 0;
        const c = e("preact/hooks"), u = e("../../../backend/v7/v7-config"), d = e("../../../dom"),
            f = e("../../../icons"), p = e("../../../request"), h = 1800;
        n.TokenAddTime = function (e) {
            const [t, n] = (0, c.useState)(null), [y, m] = (0, c.useState)(!1), [v, g] = (0, c.useState)(h), [b, w] = (0, c.useState)(null), [_, x] = (0, c.useState)(!1),
                k = y || v !== h && null === b;
            return (0, d.html)(r || (r = l(['\n        <div class="font-bold">Add time:</div>\n        ', "\n        \n        ", "\n      \n    "])), _ ? (0, d.html)(i || (i = l(['\n            <div class="cursor-pointer underline text-green-600 font-bold" onClick=', ">\n                check payment\n            </div> \n        "])), e.update) : (0, d.html)(o || (o = l(['\n            <div class="flex flex-row">\n                <select disabled=', ' class="w-14 flex-grow mr-2 \n                    ', ' "\n                    name="select" onChange=', ">\n                    <option value=", ' selected>FREE</option>\n                    <option value="259200">+3 Days</option>\n                    <option value="864000">+10 Days</option>\n                    <option value="2592000">+30 Days</option>\n                </select>\n                ', "\n            </div>\n        "])), y, y ? "border-gray-400 disabled:bg-gray-200" : "", (async function (t) {
                const n = Number.parseInt(t.currentTarget.value);
                try {
                    m(!0), w(null), g(n), n !== h && w(await async function (e, t) {
                        var n;
                        const r = null !== (n = t.clientId) && void 0 !== n ? n : t.anonymousClientId;
                        return (await (0, p.request)(u.checkoutCreateTokenEndpoint, "POST", JSON.stringify({
                            id: r.id,
                            namespace: r.namespace,
                            product: e,
                            token: t.networkToken
                        }))).token
                    }("t_" + n, e))
                } finally {
                    m(!1)
                }
            }), h, k ? f.Icons.Refresh({class: "h-6 w-6 animate-reverse-spin"}) : (0, d.html)(s || (s = l(['\n                    <div class="h-6 w-6 cursor-pointer text-green-400 hover:text-green-600"\n                        onClick=', ">\n                        <", ' class="h-6 w-6" />\n                    </div>\n                '])), (async function (t) {
                if (t.stopPropagation(), !y) {
                    n(null), m(!0);
                    try {
                        if (v === h) await (0, p.request)(u.addFreeTimeTierEndpoint, "POST", JSON.stringify({token: e.networkToken})), e.update(); else {
                            if (null === b) throw new Error("accessToken is null");
                            !function (e, t) {
                                t(u.checkoutEndpoint + "?token=" + e, "_blank")
                            }(b, e.options().windowOpen), setTimeout((() => {
                                x(!0)
                            }), 300)
                        }
                    } catch (t) {
                        n(function (e) {
                            if ("30-min-required" === e) return "Only 30 minutes interval are enabled";
                            if ("free-soft-limit" === e) return "This token reached free time limit, please use paid time";
                            if ("free-hard-limit" === e) return "All free time of today is used, please use paid time";
                            if ("not-found" === e) return "Token not found";
                            if ("too-early" === e) return "You can add free time only if TTL less then 5 minutes";
                            return e
                        }(t.message))
                    } finally {
                        m(!1)
                    }
                }
            }), f.Icons.Plus)), t ? (0, d.html)(a || (a = l(['\n            <div class="font-bold text-red-400 col-span-2">*', "</div>\n        "])), t) : null)
        }
    }, {
        "../../../backend/v7/v7-config": 129,
        "../../../dom": 151,
        "../../../icons": 153,
        "../../../request": 156,
        "core-js/modules/web.dom-collections.iterator.js": 118,
        "preact/hooks": 126
    }],
    145: [function (e, t, n) {
        "use strict";
        var r, i, o, s;

        function a(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.TokenSelect = void 0;
        const l = e("../../../backend/v7/v7-config"), c = e("preact/hooks"), u = e("../../../request"),
            d = e("../../../dom"), f = e("../../../icons");
        n.TokenSelect = function (e) {
            var t;
            const [n, p] = (0, c.useState)(null !== (t = e.networkToken) && void 0 !== t ? t : ""), [h, y] = (0, c.useState)(null), [m, v] = (0, c.useState)(!1),
                g = n === e.networkToken || "" === n;

            function b(e) {
                var t;
                p((null !== (t = e.currentTarget.value) && void 0 !== t ? t : "").toLowerCase().trim())
            }

            async function w() {
                v(!0);
                try {
                    if (g) return void (null !== e.networkToken && !0 !== window.confirm("Are you sure want to create token?") || await async function () {
                        var t;
                        if (m || null === e.region) return void y("region is not selected");
                        y(null), v(!0);
                        const n = null !== (t = e.clientId) && void 0 !== t ? t : e.anonymousClientId;
                        try {
                            const t = await (0, u.request)(l.createTokenEndpoint, "POST", JSON.stringify({
                                namespace: n.namespace,
                                id: n.id,
                                region: e.region
                            }));
                            e.setNetworkToken(t.token)
                        } catch (e) {
                            y(e.message)
                        } finally {
                            v(!1)
                        }
                    }());
                    const t = 0 === n.length ? null : n;
                    if (t === e.networkToken) return;
                    !0 === window.confirm(null === t ? "Are you sure want to reset?" : "Are you sure want to switch token?") && (null !== t && await async function (e) {
                        await (0, u.request)(l.tokeInfoGetEndpoint + "?token=" + e)
                    }(t), e.setNetworkToken(n))
                } catch (e) {
                    y("Token error: " + e.message)
                } finally {
                    v(!1)
                }
            }

            return (0, d.html)(r || (r = a(['\n        <div class="font-bold">Token:</div>\n\n        ', "\n        \n        ", "\n    "])), m ? (0, d.html)(i || (i = a(['\n            <div class="col-span-2">\n                <', ' class="w-6 h-6 animate-reverse-spin" />\n            </div>\n        '])), f.Icons.Refresh) : (0, d.html)(o || (o = a(['\n        <div class="flex flex-row">\n            <input class="rounded border ', ' \n                px-2 w-14 flex-grow mr-2" type="text" value=', " \n                onChange=", " onKeyUp=", " onKeyDown=", ' />\n            <div class="h-6 w-6 cursor-pointer ', '" \n                onClick=', ">\n                <", ' \n                    class="h-6 w-6" />\n            </div>\n        </div>\n        '])), "" === n ? "border-red-600" : "border-green-200", n, b, (function (e) {
                b(e), "Enter" === e.key && w(), e.stopPropagation()
            }), (function (e) {
                e.stopPropagation()
            }), g ? "text-green-400 hover:text-green-600" : "", w, g ? f.Icons.Plus : f.Icons.SwithcHorizontal), h ? (0, d.html)(s || (s = a(['\n            <div class="text-red-400 col-span-2">', "</div>\n        "])), h) : null)
        }
    }, {
        "../../../backend/v7/v7-config": 129,
        "../../../dom": 151,
        "../../../icons": 153,
        "../../../request": 156,
        "core-js/modules/web.dom-collections.iterator.js": 118,
        "preact/hooks": 126
    }],
    146: [function (e, t, n) {
        "use strict";
        var r, i, o, s, a, l, c, u, d, f, p, h;

        function y(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        e("core-js/modules/web.dom-collections.iterator.js"), e("core-js/modules/es.string.replace.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.TokenConfiguration = void 0;
        const m = e("preact/hooks"), v = e("../../../backend/v7/v7-config"), g = e("../../../dom"),
            b = e("../../../icons"), w = e("../../../xhr"), _ = e("../../../request"), x = e("./token-select"),
            k = e("./token-add-time");

        function j(e) {
            const [t, n] = (0, m.useState)(e.endTime - Date.now());
            return (0, m.useEffect)((() => {
                if (t <= 0) return;
                const r = setInterval((() => {
                    const t = Math.max(0, e.endTime - Date.now());
                    0 === t && (e.update(), clearInterval(r)), n(t)
                }), 1e4);
                return () => clearInterval(r)
            }), [e.endTime]), (0, g.html)(l || (l = y(['\n        <div class="font-bold">TTL:</div>\n        <div class="', ' cursor-pointer underline"\n            onClick=', ">\n            ", "\n        </div>\n    "])), t < 3e5 ? " text-red-400" : "text-gray-400", e.update, function (e) {
                if (e > 86400) {
                    const t = Math.round(e / 24 / 60 / 60 * 10) / 10;
                    return t + (1 === t ? " Day" : " Days")
                }
                if (e > 3600) {
                    const t = Math.round(e / 60 / 60 * 10) / 10;
                    return t + (1 === t ? " Hour" : " Hrs")
                }
                return Math.round(e / 60 * 10) / 10 + " Min"
            }(t / 1e3))
        }

        function C(e) {
            const [t, n] = (0, m.useState)(!1), [r, i] = (0, m.useState)(null);

            function o() {
                n(!0), (0, w.postObject)(v.stopIpx + "?token=".concat(e.networkToken, "&arn=").concat(e.ipx.arn)).then((() => {
                    n(!1), e.ipx.setAddress(null), e.ipx.setAwaitingAddress(!1)
                })).catch((e => {
                    var t;
                    console.error("Can't stop ipx", e), i(null !== (t = e.errorCode) && void 0 !== t ? t : e.message), n(!1)
                }))
            }

            if (null !== r) return (0, g.html)(c || (c = y(['\n            <div class="text-red-400 col-span-2">', "</div>\n        "])), r);
            if (t) return (0, g.html)(u || (u = y(["\n            <", ' class="w-6 h-6 col-span-2 animate-reverse-spin" />\n        '])), b.Icons.Refresh);
            if (null !== e.ipx.address) {
                const t = e.ipxConnected ? "Disconnect" : e.ipx.awaitingConnection ? "Connecting..." : "Connect",
                    n = () => {
                        e.ipx.awaitingConnection || function () {
                            var t;
                            const n = !e.ipxConnected, r = e.ipx.address;
                            r && (null === (t = e.player().ciPromise) || void 0 === t || t.then((t => n ? (e.ipx.setAwaitingConnection(!0), "http:" === location.protocol && void 0 === e.options().hardware && r.endsWith(".jj.dos.zone") ? t.networkConnect(0, "ws://" + r.substring(0, r.length - ".jj.dos.zone".length).replace(/_/g, "."), 1901) : t.networkConnect(0, r, 1901)) : t.networkDisconnect(0))).then((() => {
                                e.ipx.setAwaitingConnection(!1), e.setIpxConnected(n), n && (e.player().layers.notyf.success("Connected"), e.closeSideBar())
                            })).catch((t => {
                                e.ipx.setAwaitingConnection(!1), console.error(t), i(t.message)
                            })))
                        }()
                    };
                return (0, g.html)(d || (d = y(['\n            <div class="font-bold">IPX:</div>\n            <div class="font-bold text-gray-400 text-xs break-all -mx-6 text-center">', '</div>\n            <div class=""></div>\n            <div class="', '\n                cursor-pointer rounded uppercase text-center px-2 py-1"\n                onClick=', ">", '</div>\n            <div class="', '"></div>\n            <div class="', '\n                bg-gray-200 cursor-pointer rounded uppercase text-center px-4 py-1"\n                onClick=', ">Stop</div>\n        "])), e.ipx.address, e.ipxConnected ? " bg-red-200" : "bg-green-200", n, t, e.ipxConnected ? "hidden" : "", e.ipxConnected ? "hidden" : "none", o)
            }
            return e.ipx.awaitingAddress ? (0, g.html)(f || (f = y(['\n            <div class="font-bold">IPX:</div>\n            <', ' />\n            <div class=""></div>\n            <div class="bg-gray-200 cursor-pointer rounded uppercase text-center px-4 py-1" onClick=', ">Stop</div>\n        "])), E, o) : (0, g.html)(p || (p = y(['\n        <div class="font-bold">IPX:</div>\n        <div class="bg-green-200 cursor-pointer rounded uppercase text-center px-4 py-1" onClick=', ">Start</div>\n    "])), (function () {
                n(!0), (0, w.getObject)(v.startIpx + "?token=".concat(e.networkToken)).then((t => {
                    n(!1), e.ipx.setArn(t.arn), e.ipx.setAwaitingAddress(!0)
                })).catch((e => {
                    var t;
                    console.error("Can't start ipx", e), i(null !== (t = e.errorCode) && void 0 !== t ? t : e.message), n(!1)
                }))
            }))
        }

        function E() {
            const [e, t] = (0, m.useState)(30);
            return (0, m.useEffect)((() => {
                if (0 === e) return;
                const n = setTimeout((() => {
                    t(e - 1)
                }), 1e3);
                return () => clearTimeout(n)
            }), [e]), (0, g.html)(h || (h = y(['\n        <div class="text-gray-400 flex flex-row">\n            <', ' class="w-6 h-6 animate-reverse-spin mr-2" />\n            ', "\n        </div>\n    "])), b.Icons.Refresh, e > 0 ? e + " sec" : "")
        }

        n.TokenConfiguration = function (e) {
            const [t, n] = (0, m.useState)(null), [l, c] = (0, m.useState)(!0), [u, d] = (0, m.useState)(Date.now()), [f, p] = (0, m.useState)(null), [h, w] = (0, m.useState)(null), [E, S] = (0, m.useState)(!1), [D, O] = (0, m.useState)(!1),
                P = {
                    arn: f,
                    setArn: p,
                    address: h,
                    setAddress: w,
                    awaitingAddress: E,
                    setAwaitingAddress: S,
                    awaitingConnection: D,
                    setAwaitingConnection: O
                }, B = {...e, ipx: P, update: A};

            async function A() {
                if (p(null), w(null), S(!1), c(!0), null === e.networkToken) return n(null), void c(!1);
                (0, _.request)(v.tokeInfoGetEndpoint + "?token=".concat(e.networkToken)).then((e => {
                    n(e), c(!1), d(Date.now() + 1e3 * e.ttlSec), void 0 !== e.ipxArn && p(e.ipxArn), void 0 !== e.ipxAddress ? w(e.ipxAddress) : void 0 !== e.ipxArn && S(!0)
                })).catch((t => {
                    console.error("Can't get a token", e.networkToken, t), n(null), c(!1)
                }))
            }

            if ((0, m.useEffect)((() => {
                A()
            }), [e.networkToken]), (0, m.useEffect)((() => {
                if (null === e.networkToken || u < Date.now()) return;
                const t = setInterval((() => {
                    (0, _.request)(v.tokeInfoGetEndpoint + "?token=".concat(e.networkToken)).then((e => {
                        e.ipxArn || (e.ipxArn = null), e.ipxAddress || (e.ipxAddress = null), f === e.ipxArn ? e.ipxAddress !== h && (w(e.ipxAddress), S(!1)) : A()
                    }))
                }), 5e3);
                return () => {
                    clearInterval(t)
                }
            }), [e.networkToken, u, f, h]), l) return (0, g.html)(r || (r = y(['\n            <div class="sidebar-header">Configuration</div>\n            <div class="grid grid-cols-2 gap-4">\n                <', ' class="w-6 h-6 animate-reverse-spin" />\n            </div>\n    '])), b.Icons.Refresh);
            if (null === t) return (0, g.html)(i || (i = y(['\n            <div class="sidebar-header">Configuration</div>\n            <div class="grid grid-cols-2 gap-4">\n                <', " ...", " networkToken=", " />\n            </div>\n        "])), x.TokenSelect, e, null);
            const M = (0, g.html)(o || (o = y(['\n        <div class="sidebar-header flex flex-row justify-center items-center">\n            Configuration\n            <div onClick=', " >\n                <", ' class="h-4 w-4 ml-2 cursor-pointer" />\n            </div>\n        </div>\n    '])), A, b.Icons.Refresh);
            return u < Date.now() ? (0, g.html)(s || (s = y(["\n            ", '\n            <div class="grid grid-cols-2 gap-4">\n                <', " ...", ' />\n                <div class="font-bold">Region:</div>\n                <div class="text-gray-400">', '</div>\n                <div class="font-bold">TTL:</div>\n                <div class="text-red-400">0 Min</div>\n                <', " ...", " />\n            </div>\n        "])), M, x.TokenSelect, e, t.region, k.TokenAddTime, B) : (0, g.html)(a || (a = y(["\n        ", '\n        <div class="grid grid-cols-2 gap-4">\n            <', " ...", ' />\n            <div class="font-bold">Region:</div>\n            <div class="text-gray-400">', "</div>\n            <", " endTime=", " update=", " />\n            <", " ...", " />\n            <", " ...", " />\n        </div>\n    "])), M, x.TokenSelect, e, t.region, j, u, A, k.TokenAddTime, B, C, B)
        }
    }, {
        "../../../backend/v7/v7-config": 129,
        "../../../dom": 151,
        "../../../icons": 153,
        "../../../request": 156,
        "../../../xhr": 157,
        "./token-add-time": 144,
        "./token-select": 145,
        "core-js/modules/es.string.replace.js": 117,
        "core-js/modules/web.dom-collections.iterator.js": 118,
        "preact/hooks": 126
    }],
    147: [function (e, t, n) {
        "use strict";
        var r;
        Object.defineProperty(n, "__esModule", {value: !0}), n.SyncMouseControl = void 0;
        const i = e("../dom"), o = e("../icons");
        n.SyncMouseControl = function (e) {
            var t, n;
            if (!e.autolock) return (0, i.html)(r || (t = ['\n        <div class="flex flex-col items-center bg-gray-200 my-2 py-2 rounded">\n            <div class="text-gray-400 h-6 w-4 border-b border-gray-400">\n                <', ' class="h-4 w-4" />\n            </div>\n            <div class="cursor-pointer h-6 w-6 mt-2" onClick=', ">\n                <", ' class="h-6 w-6" />\n            </div>\n        </div>\n    '], n || (n = t.slice(0)), r = Object.freeze(Object.defineProperties(t, {raw: {value: Object.freeze(n)}}))), o.Icons.Cursor, (function (t) {
                var n;
                null === (n = e.player().ciPromise) || void 0 === n || n.then((e => {
                    e.sendMouseSync()
                })), t.stopPropagation(), t.preventDefault()
            }), o.Icons.Refresh)
        }
    }, {"../dom": 151, "../icons": 153}],
    148: [function (e, t, n) {
        "use strict";
        var r, i, o, s, a, l, c, u;

        function d(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.Tips = void 0;
        const f = e("preact/hooks"), p = e("../dom"), h = e("../icons"), y = {
                mouseLockMobile: {
                    title: "Mouse lock",
                    tip: (0, p.html)(r || (r = d(['\n        <div>\n            <div class="flex flex-col">\n                <p class=""> \n                    <strong>This game is controlled by gestures.</strong>\n                </p>\n                <p class="pt-2">\n                    When you tap on the screen, the DOS game will receive click events without\n                    mouse coordinates. <b>The click will be simulated in place where game cursor \n                    is, without moving it.</b>\n                </p>\n                <p class="pt-2">\n                    <strong>To move the game cursor</strong>, you need to put your finger on the screen and move it in\n                    the wanted direction until the game cursor reaches the desired position. After that,\n                    you can release your finger.\n                </p>\n                <p class="pt-2">\n                    You can <strong>change sensitivity</strong> of the mouse inside the\n                    submenu of icon <', ' class="h-4 w-4 text-green-600 mr-2 inline-block" />.\n                </p>\n            </div>\n        </div>\n        '])), h.Icons.CursorClick)
                },
                mouseLockDesktop: {
                    title: "Mouse lock",
                    tip: (0, p.html)(i || (i = d(['\n        <div>\n            <div class="flex flex-col">\n                <p class=""> \n                    <strong>The game will lock the browser cursor.</strong>\n                </p>\n                <p class="pt-2">\n                    When the mouse is locked, the DOS game exclusively controls the mouse and\n                    the cursor can\'t leave the game screen. \n                </p>\n                <p class="pt-2">\n                    You can <strong>change sensitivity</strong> of the mouse inside the\n                    submenu of icon <', ' class="h-4 w-4 text-green-600 mr-2 inline-block" />.\n                </p>\n                <p class="pt-2">\n                    To exit from lock mode, please use the <strong>Escape</strong> key.\n                </p>\n            </div>\n        </div>\n        '])), h.Icons.CursorClick)
                },
                lockSwitch: {
                    title: "Mouse Locking",
                    tip: (0, p.html)(o || (o = d(['\n        <div class="flex flex-col">\n            <p class="">\n                By clicking on the pointer icon, you can switch between <b>regular mouse emulation</b> and \n                <b>lock mode</b>.\n            </p>\n            <div class="mt-2">\n                <', ' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    - In regular mouse emulation mode, the game will receive\n                    browser pointer coordinates. If the browser pointer and game pointer are out of sync, use the\n                </p>\n                <', ' class="h-4 w-4 text-green-600 mx-2 inline-block" />\n                <p class="inline">\n                    refresh control to synchronize DOS and browser pointer position.\n                </p>\n            </div>\n            <div class="mt-2">\n                <', ' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    - lock mouse emulation mode.\n                </p>\n            </div>\n            <div class="mt-2">\n                <strong>On desktop</strong>, the DOS game exclusively controls the mouse and\n                the cursor can\'t leave the game screen.\n            </div>\n            <div class="mt-2">\n                <strong>On mobile</strong>, the DOS game will be controlled by gestures.\n            </div>\n        </div>\n        '])), h.Icons.Cursor, h.Icons.Refresh, h.Icons.CursorClick)
                },
                mobile: {
                    title: "Mobile Controls",
                    tip: (0, p.html)(s || (s = d(['\n        <div class="flex flex-col">\n            <p>\n                You can change the visibility of mobile controls by pressing one of these buttons:\n            </p>\n            <div class="pt-2">\n                <', ' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  shows the mobile controls if they are provided by the game.\n                </p>\n            </div>\n            <div class="pt-2">\n                <', ' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  shows the mobile controls but <strong>mirrored</strong>.\n                </p>\n            </div>\n            <div class="pt-2">\n                <', ' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  completely hide the mobile controls.\n                </p>\n            </div>\n            <p class="pt-2">\n                You can <b>change size</b> of mobile controls inside the submenu.\n            </p>\n        </div>\n        '])), h.Icons.Mobile, h.Icons.SwithcHorizontal, h.Icons.EyeOff)
                },
                sidebar: {
                    title: "Sidebar",
                    tip: (0, p.html)(a || (a = d(['\n        <div class="flex flex-col">\n            <div>\n                On the left side of the screen, you will see a sidebar; it has a set of useful controls.\n                You can hide it at any time by pressing on the arrow in the middle.\n            </div>\n            <div class="pt-2">\n                <', ' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  pause/resume game,\n                </p>\n            </div>\n            <div class="pt-2">\n                <', ' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  mute/unmute sound,\n                </p>\n            </div>\n            <div class="pt-2">\n                <', ' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  toggle soft keyboard,\n                </p>\n            </div>\n            <div class="pt-2">\n                <', ' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  toggle fullscreen,\n                </p>\n            </div>\n            <div class="pt-2">\n                <', ' class="h-4 w-4 text-green-600 mr-2 inline-block" />\n                <p class="inline">\n                    -  will open the settings sidebar, where you can change additional\n                    settings of js-dos, like networking.\n                </p>\n            </div>\n        </div>\n        '])), h.Icons.Pause, h.Icons.VolumeUp, h.Icons.PencilAlt, h.Icons.ArrowsExpand, h.Icons.DotsHorizontal)
                },
                saveLoad: {
                    title: "Save/Load",
                    tip: (0, p.html)(l || (l = d(['\n        <div>\n            <div class="flex flex-col">\n                <p class=""> \n                    js-dos supports saving and restoring game progress. You can play a game from time to time \n                    without losing progress. This works automatically or by pressing the\n                    <', ' class="h-4 w-4 text-green-600 mx-1 -mt-1 inline-block" />\n                    icon.\n                </p>\n                <p class="pt-2">\n                    However, it works only if the DOS game itself supports save and load commands.\n                    <strong> You need to save your progress in the DOS game before stopping the emulator.</strong>\n                </p>\n            </div>\n        </div>\n        '])), h.Icons.FloppyDisk)
                }
            },
            m = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()) ? ["mouseLockMobile", "mobile", "sidebar", "saveLoad", "lockSwitch"] : ["mouseLockDesktop", "sidebar", "saveLoad", "lockSwitch"];
        n.Tips = function (e) {
            const t = e.showTips, [n, r] = (0, f.useState)(0);
            if ((0, f.useEffect)((() => {
                t && r(e.player().autolock ? 0 : 1)
            }), [t]), !t) return null;
            const i = y[m[n]], o = n === m.length - 1;
            return (0, p.html)(c || (c = d(['\n    <div class="absolute bg-gray-500 bg-opacity-80 left-0 top-0 right-0 bottom-0 \n        flex flex-col items-center justify-center z-50">\n        <div class="rounded bg-gray-200 shadow-lg w-3/4 sm:w-1/2 p-2 border-b border-gray-800 overflow-auto">\n            <div class="flex row justify-between mb-2">\n                <div class="h-6 w-6 text-gray-400">\n                    <', ' class="h-6 w-6" />\n                </div>\n                <div class="text-lg font-bold">', '</div>\n                <div class="h-6 w-6 cursor-pointer" onClick=', ">\n                    <", ' class="h-6 w-6" />\n                </div>\n            </div>\n            <div class="text-sm px-2 overflow-hidden max-h-72">\n                ', '\n            </div>\n            <div class="flex flex-row justify-center mt-2" onClick=', '>\n                <p class="uppercase cursor-pointer text-blue-900 mr-2">', "</p>\n                ", "\n            </div>\n        </div>\n    </div>\n    "])), h.Icons.InformationCircle, i.title, (() => e.setShowTips(!1)), h.Icons.XCircle, i.tip, (function (t) {
                o ? e.setShowTips(!1) : r((n + 1) % m.length), t.stopPropagation(), t.preventDefault()
            }), o ? "Close" : "Next", !o && (0, p.html)(u || (u = d(['\n                    <div class="h-6 w-6 cursor-pointer text-blue-900">\n                        <', ' class="h-6 w-6" />\n                    </div>'])), h.Icons.ArrowsCircleRight))
        }
    }, {"../dom": 151, "../icons": 153, "core-js/modules/web.dom-collections.iterator.js": 118, "preact/hooks": 126}],
    149: [function (e, t, n) {
        "use strict";
        var r;
        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.VerticalSlider = void 0;
        const i = e("preact/hooks"), o = e("../dom");
        n.VerticalSlider = function (e) {
            const {minValue: t, maxValue: n, initialValue: s, onChange: a, icon: l} = e, c = n - t,
                u = (0, i.useRef)(null), [d, f] = (0, i.useState)(s), [p, h] = (0, i.useState)(0);
            (0, i.useEffect)((() => {
                if (null === u || null === u.current) return;
                let t = !1;
                const n = u.current, r = e => {
                    const t = n.getBoundingClientRect(), r = 1 - (e.clientY - t.top) / t.height;
                    return Math.max(Math.min(1, r), 0) * c
                }, i = e => {
                    e.target !== n || t || (t = !0, h(80), f(r(e)), e.stopPropagation(), e.preventDefault())
                }, o = e => {
                    if (!t) return;
                    const n = r(e);
                    f(n), a(n), e.stopPropagation(), e.preventDefault()
                }, s = e => {
                    if (!t) return;
                    t = !1, h(0);
                    const n = r(e);
                    f(n), a(n), e.stopPropagation(), e.preventDefault()
                };
                return window.addEventListener("pointerdown", i), window.addEventListener("pointermove", o), window.addEventListener("pointerup", s), window.addEventListener("pointercancel", s), n.addEventListener("pointerup", s), n.addEventListener("pointercancel", s), e.registerListner(f), () => {
                    e.removeListener(f), window.removeEventListener("pointerdown", i), window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s), window.removeEventListener("pointercancel", s), n.removeEventListener("pointerup", s), n.removeEventListener("pointercancel", s)
                }
            }), [u]);
            const y = 100 - Math.max(0, Math.min(100, Math.round(d / c * 100))) + "%";
            return (0, o.html)(r || (m = ['\n        <div class="h-full flex flex-col py-0 items-center">\n            <div class="bg-gray-200 rounded flex items-center justify-center h-6 w-5 mt-4 text-gray-600">\n                <', ' class="h-4 w-4" />\n            </div>\n            <div class="cursor-pointer flex-grow py-4 px-2" ref=', ">\n                <div class=", '>\n                    <div class="flex flex-row items-center absolute -mt-3" style=', '>\n                        <div class="bg-gray-600 -ml-2 flex-shrink-0 w-6 h-6 rounded-full"></div>\n                        <div class="bg-green-100 ml-2 py-1 px-2 rounded z-50 ', '">\n                            ', "\n                        </div>\n                    </div>    \n                </div>\n            </div>\n        </div>\n    "], v || (v = m.slice(0)), r = Object.freeze(Object.defineProperties(m, {raw: {value: Object.freeze(v)}}))), l, u, "pointer-events-none relative sensitivity rounded-2xl bg-gray-400 w-2 h-full" + (e.class ? e.class : ""), {top: y}, "opacity-" + p, Math.round(10 * (t + d)) / 10);
            var m, v
        }
    }, {"../dom": 151, "core-js/modules/web.dom-collections.iterator.js": 118, "preact/hooks": 126}],
    150: [function (e, t, n) {
        "use strict";
        var r, i;

        function o(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.SideBarVolumeControl = n.ActionBarVolumeControl = void 0;
        const s = e("../dom"), a = e("../icons"), l = e("./vertical-slider"), c = e("./horizontal-slider");
        n.ActionBarVolumeControl = function (e) {
            return e.mobileControls || e.mirroredControls ? null : (0, s.html)(r || (r = o(["\n        <", " minValue=", " maxValue=", "\n            initialValue=", " \n            onChange=", "\n            icon=", "\n            registerListner=", "\n            removeListener=", "\n            />\n    "])), l.VerticalSlider, 0, 1, e.player().volume, (t => e.player().setVolume(t)), a.Icons.VolumeUp, e.player().registerOnVolumeChanged, e.player().removeOnVolumeChanged)
        }, n.SideBarVolumeControl = function (e) {
            return (0, s.html)(i || (i = o(["\n        <", " minValue=", " maxValue=", "\n            initialValue=", " \n            onChange=", "\n            icon=", "\n            registerListner=", "\n            removeListener=", "\n            />\n    "])), c.HorizontalSlider, 0, 1, e.player().volume, (t => e.player().setVolume(t)), a.Icons.VolumeUp, e.player().registerOnVolumeChanged, e.player().removeOnVolumeChanged)
        }
    }, {"../dom": 151, "../icons": 153, "./horizontal-slider": 136, "./vertical-slider": 149}],
    151: [function (e, t, n) {
        "use strict";
        e("core-js/modules/web.dom-collections.iterator.js"), e("core-js/modules/web.url.js"), e("core-js/modules/web.url-search-params.js");
        var r = function (e) {
            return e && e.__esModule ? e : {default: e}
        };
        Object.defineProperty(n, "__esModule", {value: !0}), n.downloadFile = n.click = n.createDiv = n.activeClass = n.primaryClass = n.disabledClass = n.goneClass = n.html = void 0;
        const i = e("preact"), o = r(e("htm"));
        n.html = o.default.bind(i.h), n.goneClass = "jsdos-player-gone", n.disabledClass = "jsdos-player-button-disabled", n.primaryClass = "jsdos-player-button-primary", n.activeClass = "jsdos-player-button-active", n.createDiv = function (e, t) {
            const n = document.createElement("div");
            if ("string" == typeof e) n.className = e; else for (const t of e) n.classList.add(t);
            return void 0 !== t && (n.innerHTML = t), n
        }, n.click = function (e, t) {
            for (const n of emulatorsUi.dom.pointers.bind.enders) e.addEventListener(n, (() => {
                e.classList.contains("jsdos-player-button-disabled") || t(e)
            }))
        };
        let s = null;
        n.downloadFile = function (e, t, n) {
            const r = new Blob([e], {type: n});
            null !== s && window.URL.revokeObjectURL(s), s = window.URL.createObjectURL(r);
            const i = document.createElement("a");
            i.href = s, i.download = t, i.style.display = "none", document.body.appendChild(i), i.click(), i.remove()
        }
    }, {
        "core-js/modules/web.dom-collections.iterator.js": 118,
        "core-js/modules/web.url-search-params.js": 120,
        "core-js/modules/web.url.js": 122,
        htm: 123,
        preact: 125
    }],
    152: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        e("core-js/modules/es.string.replace.js");
        var i = Object.create ? function (e, t, n, r) {
            void 0 === r && (r = n);
            var i = Object.getOwnPropertyDescriptor(t, n);
            i && !("get" in i ? !t.__esModule : i.writable || i.configurable) || (i = {
                enumerable: !0,
                get: function () {
                    return t[n]
                }
            }), Object.defineProperty(e, r, i)
        } : function (e, t, n, r) {
            void 0 === r && (r = n), e[r] = t[n]
        }, o = Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }, s = function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var n in e) "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && i(t, e, n);
            return o(t, e), t
        };
        Object.defineProperty(n, "__esModule", {value: !0}), n.hardwareTransportLayerFactory = n.HardwareTransportLayerFactory = void 0;
        const a = s(e("base64-js")), l = new TextDecoder;

        class c {
            constructor(e) {
                r(this, "sessionId", Date.now() + ""), r(this, "hardware", void 0), r(this, "alive", !0), r(this, "frameWidth", 0), r(this, "frameHeight", 0), r(this, "handler", (() => {
                })), this.hardware = e
            }

            callMain() {
                this.hardware.sendMessage("wc-install\n" + this.sessionId + "\n"), requestAnimationFrame(this.update.bind(this))
            }

            async sendMessageToServer(e, t) {
                if (void 0 !== t && (null == t ? void 0 : t.sessionId) === this.sessionId) switch (e) {
                    case"wc-run": {
                        let e = d(this.hardware, "bundle_0.zip", t.bundles[0]);
                        if (e.length > 0) throw console.error(e), new Error(e);
                        if (void 0 !== t.bundles[1] && (e = d(this.hardware, "bundle_1.zip", t.bundles[1]), e.length > 0)) throw console.error(e), new Error(e);
                        const n = "wc-run\n";
                        this.hardware.sendMessage(n)
                    }
                        break;
                    case"wc-add-key":
                        this.hardware.addKey(t.key, t.pressed ? 1 : 0, t.timeMs);
                        break;
                    case"wc-pause":
                        this.hardware.sendMessage("wc-pause\n" + this.sessionId + "\n");
                        break;
                    case"wc-resume":
                        this.hardware.sendMessage("wc-resume\n" + this.sessionId + "\n");
                        break;
                    case"wc-mute":
                        this.hardware.sendMessage("wc-mute\n" + this.sessionId + "\n");
                        break;
                    case"wc-unmute":
                        this.hardware.sendMessage("wc-unmute\n" + this.sessionId + "\n");
                        break;
                    case"wc-exit":
                        this.alive = !1, this.hardware.sendMessage("wc-exit\n" + this.sessionId + "\n");
                        break;
                    case"wc-mouse-move":
                        this.hardware.mouseMove(t.x, t.y, t.relative, t.timeMs);
                        break;
                    case"wc-mouse-button":
                        this.hardware.mouseButton(t.button, t.pressed ? 1 : 0, t.timeMs);
                        break;
                    case"wc-pack-fs-to-bundle":
                        this.hardware.sendMessage("wc-pack-fs-to-bundle\n" + this.sessionId + "\n");
                        break;
                    case"wc-connect":
                        this.hardware.sendMessage("wc-connect\n" + this.sessionId + "\n" + t.networkType + "\n" + t.address.replace("ws://", "").replace("wss://", "") + "\n" + (t.port - 1) + "\n");
                        break;
                    case"wc-disconnect":
                        this.hardware.sendMessage("wc-disconnect\n" + this.sessionId + "\n" + t.networkType + "\n");
                        break;
                    default:
                        console.log("Unhandled client message (wc):", e, t)
                }
            }

            initMessageHandler(e) {
                this.handler = e
            }

            exit() {
                this.alive = !1
            }

            async onServerMessage(e, t) {
                const n = t || {};
                switch (e) {
                    case"ws-server-ready": {
                        const e = this.hardware.readConfig();
                        this.handler("ws-config", {sessionId: this.sessionId, content: e})
                    }
                        break;
                    case"ws-sound-init":
                        this.handler(e, n), this.handler("ws-server-ready", {sessionId: this.sessionId});
                        break;
                    case"ws-frame-set-size":
                        this.frameWidth = n.width, this.frameHeight = n.height, this.handler(e, n);
                        break;
                    case"ws-sound-push":
                    case"ws-update-lines":
                    default:
                        this.handler(e, n);
                        break;
                    case"ws-persist":
                        n.bundle = f(n.bundle), this.handler(e, n);
                        break;
                    case"ws-log":
                    case"ws-warn":
                    case"ws-err":
                    case"ws-stdout":
                        void 0 !== n.message && null !== n.message && n.message.length > 0 && (n.message = l.decode(f(n.message))), this.handler(e, n)
                }
            }

            update() {
                this.alive && requestAnimationFrame(this.update.bind(this)), this.updateFrame()
            }

            updateFrame() {
                if (0 === this.frameWidth || 0 === this.frameHeight) return;
                const e = this.hardware.getFramePayload();
                if (0 === e.length) return;
                const t = f(e);
                if (0 === t.length) return;
                const n = [], r = 3 * this.frameWidth;
                let i = this.frameHeight, o = -1;
                for (let e = 0; e < this.frameHeight; ++e) {
                    const s = e === this.frameHeight - 1;
                    if (1 === t[e] && -1 === o) o = e; else if ((s || 0 === t[e]) && -1 !== o) {
                        const s = ((1 === t[e] ? e : e - 1) - o + 1) * r, a = t.slice(i, i + s);
                        n.push({start: o, heapu8: a}), i += s, o = -1
                    }
                }
                this.handler("ws-update-lines", {sessionId: this.sessionId, lines: n})
            }
        }

        class u {
            constructor() {
                r(this, "serverMessageHandler", (() => {
                })), window.serverMessage = e => {
                    if ("string" == typeof e) {
                        const t = "{" + l.decode(f(e)).slice(0, -1) + "}";
                        try {
                            const e = JSON.parse(t);
                            this.serverMessageHandler(e.name, e)
                        } catch (e) {
                            throw console.error("Can't parse", t, e), e
                        }
                    } else this.serverMessageHandler(e.name, e)
                }, this.createTransportLayer = this.createTransportLayer.bind(this)
            }

            createTransportLayer(e) {
                const t = new c(e);
                return this.serverMessageHandler = t.onServerMessage.bind(t), t.callMain(), t
            }
        }

        function d(e, t, n) {
            if (void 0 !== e.writeFile) return e.writeFile(t, p(n));
            let r = e.createFile(t);
            if (r.length > 0) return r;
            let i = 0;
            for (; i < n.length;) {
                const t = Math.min(4194304, n.length - i), o = n.subarray(i, i + t);
                if (r = e.appendFile(p(o)), r.length > 0) return r;
                i += t
            }
            return r = e.closeFile(), r
        }

        function f(e) {
            return a.toByteArray(e)
        }

        function p(e) {
            return a.fromByteArray(e)
        }

        n.HardwareTransportLayerFactory = u, n.hardwareTransportLayerFactory = new u
    }, {"base64-js": 1, "core-js/modules/es.string.replace.js": 117}],
    153: [function (e, t, n) {
        "use strict";
        var r, i, o, s, a, l, c, u, d, f, p, h, y, m, v, g, b, w, _, x, k, j, C, E, S, D, O, P, B, A, M;

        function I(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.Icons = void 0;
        const T = e("./dom");
        n.Icons = {
            XCircle: e => (0, T.html)(r || (r = I(['\n    <svg fill="none" class=', ' viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n'])), e.class),
            UserCircle: e => (0, T.html)(i || (i = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n'])), e.class),
            Mobile: e => (0, T.html)(o || (o = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />\n    </svg>\n'])), e.class),
            SwithcHorizontal: e => (0, T.html)(s || (s = I(['\n    <svg class="', '" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />\n    </svg>\n'])), e.class),
            EyeOff: e => (0, T.html)(a || (a = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />\n    </svg>\n'])), e.class),
            Pause: e => (0, T.html)(l || (l = I(["\n    <svg className=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}\n            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n'])), e.class),
            Play: e => (0, T.html)(c || (c = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n'])), e.class),
            VolumeUp: e => (0, T.html)(u || (u = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />\n    </svg>\n'])), e.class),
            VolumeOff: e => (0, T.html)(d || (d = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"\n            clip-rule="evenodd" />\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />\n    </svg>\n'])), e.class),
            PencilAlt: e => (0, T.html)(f || (f = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />\n    </svg>\n'])), e.class),
            ArrowsExpand: e => (0, T.html)(g || (g = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />\n    </svg>\n'])), e.class),
            ArrowsCircleLeft: e => (0, T.html)(b || (b = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />\n    </svg>\n'])), e.class),
            ArrowsCircleRight: e => (0, T.html)(w || (w = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}\n            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n'])), e.class),
            ChevronLeft: e => (0, T.html)(p || (p = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />\n    </svg>\n'])), e.class),
            ChevronRight: e => (0, T.html)(h || (h = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />\n    </svg>\n'])), e.class),
            DotsHorizontal: e => (0, T.html)(y || (y = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />\n    </svg>\n'])), e.class),
            Download: e => (0, T.html)(m || (m = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />\n    </svg>\n'])), e.class),
            Upload: e => (0, T.html)(v || (v = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />\n    </svg>\n'])), e.class),
            Plus: e => (0, T.html)(_ || (_ = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />\n    </svg>\n'])), e.class),
            CursorClick: e => (0, T.html)(x || (x = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />\n    </svg>\n'])), e.class),
            Cursor: e => (0, T.html)(k || (k = I(["\n    <svg class=", ' fill="currentColor" viewBox="0 0 24 24">\n        <path\n            d="M 7 2 L 7 18.5 L 11.09375 14.605469 L 14.300781 22 L 16.5 21 L 13.195312 13.701172 L 13.199219 13.699219 L 19 13.199219 L 7 2 z M 9 6.6015625 L 14.347656 11.59375 L 13.029297 11.707031 L 12.708984 11.734375 L 12.412109 11.861328 L 10.3125 12.761719 L 9.9824219 12.904297 L 9.7226562 13.152344 L 9 13.837891 L 9 6.6015625 z" />\n    </svg>\n'])), e.class),
            Refresh: e => (0, T.html)(j || (j = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />\n    </svg>\n'])), e.class),
            CurrencyDollar: e => (0, T.html)(C || (C = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n'])), e.class),
            QuestionMarkCircle: e => (0, T.html)(E || (E = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n'])), e.class),
            Discord: e => (0, T.html)(S || (S = I(["\n    <svg class=", ' fill="none" viewBox="0 0 245 240" stroke="currentColor">\n        <style>.st0{fill:#5c7080;}</style>\n        <path class="st0" d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"/><path class="st0" d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"/>\n    </svg>\n'])), e.class),
            Telegram: e => (0, T.html)(O || (O = I(["\n    <svg class=", ' fill="none" viewBox="0 0 240 240" stroke="currentColor">\n        <defs>\n            <linearGradient id="A" x1="160.01" x2="100.01" y1="40.008" y2="180" gradientUnits="userSpaceOnUse">\n                <stop stop-color="#758599" offset="0"/>\n                <stop stop-color="#556559" offset="1"/>\n            </linearGradient>\n        </defs>\n        <circle fill="url(#A)" r="120" cy="120" cx="120"/><path d="M49.942 118.96l80.81-33.295c7.977-3.468 35.03-14.566 35.03-14.566s12.486-4.855 11.445 6.936c-.347 4.855-3.12 21.85-5.896 40.23l-8.67 54.45s-.694 7.977-6.6 9.364-15.607-4.855-17.34-6.243c-1.387-1.04-26.012-16.647-35.03-24.277-2.428-2.08-5.202-6.243.347-11.098 12.486-11.445 27.4-25.665 36.416-34.682 4.162-4.162 8.324-13.873-9.017-2.08l-48.902 32.948s-5.55 3.468-15.954.347-22.543-7.283-22.543-7.283-8.324-5.202 5.896-10.75z" fill="#fff"/>\n    </svg>\n'])), e.class),
            Twitter: e => (0, T.html)(D || (D = I(["\n    <svg class=", ' fill="none" viewBox="0 0 400 400" stroke="currentColor">\n        <style type="text/css">\n            .st0{fill:#5c7080;}\n        </style>\n        <path class="st0" d="M400,200c0,110.5-89.5,200-200,200S0,310.5,0,200S89.5,0,200,0S400,89.5,400,200z M163.4,305.5\n            c88.7,0,137.2-73.5,137.2-137.2c0-2.1,0-4.2-0.1-6.2c9.4-6.8,17.6-15.3,24.1-25c-8.6,3.8-17.9,6.4-27.7,7.6\n            c10-6,17.6-15.4,21.2-26.7c-9.3,5.5-19.6,9.5-30.6,11.7c-8.8-9.4-21.3-15.2-35.2-15.2c-26.6,0-48.2,21.6-48.2,48.2\n            c0,3.8,0.4,7.5,1.3,11c-40.1-2-75.6-21.2-99.4-50.4c-4.1,7.1-6.5,15.4-6.5,24.2c0,16.7,8.5,31.5,21.5,40.1c-7.9-0.2-15.3-2.4-21.8-6\n            c0,0.2,0,0.4,0,0.6c0,23.4,16.6,42.8,38.7,47.3c-4,1.1-8.3,1.7-12.7,1.7c-3.1,0-6.1-0.3-9.1-0.9c6.1,19.2,23.9,33.1,45,33.5\n            c-16.5,12.9-37.3,20.6-59.9,20.6c-3.9,0-7.7-0.2-11.5-0.7C110.8,297.5,136.2,305.5,163.4,305.5"/>\n    </svg>\n'])), e.class),
            FloppyDisk: e => (0, T.html)(P || (P = I(["\n    <svg class=", ' style="padding-left: 2px; padding-top: 4px" fill="none" viewBox="0 0 20 20" stroke="currentColor">\n        <g id="floppy_disk">\n            <g>\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.71,2.29l-2-2C13.53,0.11,13.28,0,13,0h-1v6H4V0H1C0.45,0,0,0.45,0,1v14\n                    c0,0.55,0.45,1,1,1h14c0.55,0,1-0.45,1-1V3C16,2.72,15.89,2.47,15.71,2.29z M14,15H2V9c0-0.55,0.45-1,1-1h10c0.55,0,1,0.45,1,1V15\n                    z M11,1H9v4h2V1z"/>\n            </g>\n        </g>\n    </svg>\n'])), e.class),
            Online: e => (0, T.html)(A || (A = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\n        <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />\n    </svg>\n'])), e.class),
            Offline: e => (0, T.html)(B || (B = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\n      <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />\n    </svg>\n'])), e.class),
            InformationCircle: e => (0, T.html)(M || (M = I(["\n    <svg class=", ' fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\n        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\n    </svg>\n'])), e.class)
        }
    }, {"./dom": 151}],
    154: [function (e, t, n) {
        "use strict";
        var r, i, o;

        function s(e, t) {
            return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {raw: {value: Object.freeze(t)}}))
        }

        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.createPlayerApp = n.PlayerApp = void 0;
        const a = e("preact"), l = e("preact/hooks"), c = e("./dom"), u = e("./components/action-hide"),
            d = e("./components/action-bar"), f = e("./components/action-save-or-exit"), p = e("./components/sidebar"),
            h = e("./components/tip"), y = e("nanoid/non-secure"), m = e("./components/sensitivity-control"),
            v = e("./components/scale-control"), g = e("./components/volume-control"),
            b = e("./components/sync-control"), w = "client.id", _ = "network.token", x = "network.region",
            k = "ui.tipsV2", j = "ui.autolockTipsV2";

        function C(e) {
            const t = !0 !== e.options().withNetworkingApi, n = emulatorsUi.dom.storage, o = e.options().clientId,
                a = "function" == typeof o ? e => o(e) : void 0, [C, E] = (0, l.useState)(null), [S, D] = (0, l.useState)(!1), [O, P] = (0, l.useState)(e.player().mobileControls), [B, A] = (0, l.useState)(e.player().mirroredControls), [M, I] = (0, l.useState)(e.player().autolock), [T, L] = (0, l.useState)(e.player().layers.keyboardVisible), [K, R] = (0, l.useState)(!1), [N, F] = (0, l.useState)(!1), [z, U] = (0, l.useState)(e.player().layers.fullscreen), [H, V] = (0, l.useState)(!t), [W, q] = (0, l.useState)(n.getItem(x)), [G, Y] = (0, l.useState)(null), [X, $] = (0, l.useState)(!1), [J, Q] = (0, l.useState)(null), [Z, ee] = (0, l.useState)("main"), [te] = (0, l.useState)((() => {
                    const e = n.getItem(w), t = null != e ? e : (0, y.nanoid)();
                    return null === e && n.setItem(w, t), {
                        namespace: encodeURIComponent("local (" + location.href + ")"),
                        id: t
                    }
                })), [ne, re] = (0, l.useState)(n.getItem(_)), [ie, oe] = (0, l.useState)(!1);
            (0, l.useEffect)((() => {
                const e = e => {
                    var t;
                    "jsdos-get-network-token" == e.data.message && (null === (t = e.source) || void 0 === t || t.postMessage({
                        message: "jsdos-network-token",
                        token: ne
                    }, "*"))
                };
                return window.addEventListener("message", e), () => window.removeEventListener("message", e)
            }), [ne]), (0, l.useEffect)((() => {
                void 0 !== a && a(!1).then(E).catch(console.error)
            }), [o, E]), (0, l.useEffect)((() => (e.setOnRun((() => {
                const t = e.player().autolock, r = "false" !== n.getItem(k), i = t && "false" !== n.getItem(j);
                (r || i) && ae.setShowTips(!0), I(t)
            })), () => e.setOnRun((() => {
            })))), [e.setOnRun]), (0, l.useEffect)((() => {
                const e = () => {
                    const e = null !== document.fullscreenElement;
                    U(e), e || V(!0)
                };
                return document.addEventListener("fullscreenchange", e), () => {
                    document.removeEventListener("fullscreenchange", e)
                }
            }), [z, U]);
            const se = t => {
                var n;
                null === (n = e.player().ciPromise) || void 0 === n || n.then((e => {
                    t ? e.pause() : e.resume(), R(t)
                })).catch(console.error)
            }, ae = {
                player: e.player,
                options: e.options,
                clientId: C,
                setClientId: E,
                requestClientId: a,
                anonymousClientId: te,
                networkToken: ne,
                setNetworkToken: e => {
                    null === e ? n.removeItem(_) : n.setItem(_, e), re(e)
                },
                mobileControls: O,
                setMobileControls: async t => {
                    t ? e.player().enableMobileControls() : e.player().disableMobileControls(), P(t)
                },
                mirroredControls: B,
                setMirroredControls: async e => {
                    ae.player().setMirroredControls(e), A(e)
                },
                autolock: M,
                setAutolock: async e => {
                    ae.player().setAutolock(e), I(e)
                },
                keyboard: T,
                toggleKeyboard: () => {
                    L(!e.player().layers.keyboardVisible), e.player().layers.toggleKeyboard()
                },
                fullscreen: z,
                toggleFullscreen: () => {
                    e.player().layers.toggleFullscreen()
                },
                pause: K,
                setPause: se,
                mute: N,
                setMute: t => {
                    var n;
                    null === (n = e.player().ciPromise) || void 0 === n || n.then((e => {
                        t ? e.mute() : e.unmute(), F(t)
                    })).catch(console.error)
                },
                actionBar: H,
                setActionBar: V,
                sideBar: S,
                openSideBar: () => D(!0),
                closeSideBar: () => D(!1),
                region: W,
                setRegion: function (e) {
                    e !== W && (null !== e && n.setItem(x, e), q(e), Y(null))
                },
                estimatingRegion: G,
                setEstimatingRegion: Y,
                showTips: X,
                setShowTips: t => {
                    n.setItem(k, t + ""), ae.player().autolock && n.setItem(j, t + ""), setTimeout((() => {
                        se(t), $(t), t && "hidden" !== e.options().style && V(!0)
                    }), 500)
                },
                latencyInfo: J,
                setLatencyInfo: Q,
                sideBarPage: Z,
                setSideBarPage: ee,
                ipxConnected: ie,
                setIpxConnected: oe
            };
            return !1 === ae.actionBar ? (0, c.html)(r || (r = s(["<div>\n            <", " ...", ' class="absolute left-0 top-0 rounded-br-md z-50 w-8 h-8" />\n            <', " ...", ' class="absolute left-0 opacity-80 top-1/2 z-50 -mt-6" />\n        </div>'])), f.ActionSaveOrExit, ae, u.ActionHide, ae) : (0, c.html)(i || (i = s(['\n    <div class="h-full flex flex-row">\n        <', " ...", " />\n        <", " ...", ' />\n        <div class="h-full">\n            <', " ...", ' />\n        </div>\n        <div class="bg-gray-300 w-8 h-full flex flex-col items-center">\n            <div class="flex-grow flex flex-col items-center">\n                <', " ...", ' class="rounded mt-1" />\n                <', " ...", " />\n                <", " ...", " />\n            </div>\n            <", " ...", ' class="self-start" />\n            <div class="flex-grow">\n                <', " ...", " />\n                <", " ...", " />\n            </div>\n        </div>\n    </div>\n    "])), p.SideBar, ae, h.Tips, ae, d.ActionBar, ae, f.ActionSaveOrExit, ae, b.SyncMouseControl, ae, m.ActionBarSensitivityControl, ae, u.ActionHide, ae, v.ActionBarScaleControl, ae, g.ActionBarVolumeControl, ae)
        }

        n.PlayerApp = C, n.createPlayerApp = function (e, t, n, r) {
            (0, a.render)((0, c.html)(o || (o = s(["<", " player=", " options=", " setOnRun=", " />"])), C, (() => t), (() => n), r), e)
        }
    }, {
        "./components/action-bar": 130,
        "./components/action-hide": 131,
        "./components/action-save-or-exit": 132,
        "./components/scale-control": 138,
        "./components/sensitivity-control": 139,
        "./components/sidebar": 140,
        "./components/sync-control": 147,
        "./components/tip": 148,
        "./components/volume-control": 150,
        "./dom": 151,
        "core-js/modules/web.dom-collections.iterator.js": 118,
        "nanoid/non-secure": 124,
        preact: 125,
        "preact/hooks": 126
    }],
    155: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.DosPlayer = void 0;
        const r = e("./dom"), i = e("./hardware-transport-layer"), o = e("./backend/v7/personal"),
            s = e("./player-app"), a = Dos;

        function l(e, t) {
            const n = t || {};
            if (void 0 === n.windowOpen && ("object" == typeof window ? n.windowOpen = window.open.bind(window) : n.windowOpen = () => {
                throw new Error("window.open is not defined")
            }), "none" === n.style) return console.warn("If you don't need the jsdos services, please use emulatros + emulators-ui instead"), a(e, n);
            e.classList.add("flex"), e.classList.add("flex-row"), e.classList.add("relative"), e.classList.add("overflow-hidden");
            const l = (0, r.createDiv)(["hidden", "flex-col", "absolute", "left-0", "top-0", "bottom-0", "right-0", "items-center", "justify-center", "z-50", "bg-gray-800", "opacity-95"]),
                c = (0, r.createDiv)(["text-2xl", "font-bold", "font-mono", "animate-pulse", "text-green-600"]);
            l.appendChild(c);
            const u = (0, r.createDiv)(["flex", "flex-col", "flex-grow", "overflow-hidden"]),
                d = (0, r.createDiv)("flex-grow"), f = (0, r.createDiv)("flex-grow-0"),
                p = (0, r.createDiv)("flex-grow-0"), h = e;

            function y(e) {
                c.innerHTML = e, l.classList.remove("hidden"), l.classList.add("flex")
            }

            u.appendChild(d), u.appendChild(p), e.appendChild(f), e.appendChild(u), e.appendChild(l), n.layersOptions = n.layersOptions || {}, n.layersOptions.keyboardDiv = p, n.layersOptions.keyboardInputDiv = h, n.layersOptions.fullscreenElement = e, n.layersOptions.optionControls = [];
            const m = n.hardware;
            null != m && (n.createTransportLayer = () => i.hardwareTransportLayerFactory.createTransportLayer(m), n.emulatorFunction = "backend");
            const v = a(d, n);
            let g = () => {
            };
            (0, s.createPlayerApp)(f, v, n, (e => g = e)), v.bundleUrl = null;
            const b = v.run;
            v.run = async (e, t, r) => {
                l.classList.remove("flex"), l.classList.add("hidden");
                const i = () => void 0 !== (null == n ? void 0 : n.clientId) ? n.clientId(!1) : null, s = await i();
                void 0 === t && void 0 === r && null !== s && (t = (0, o.getPersonalBundleUrl)(s.namespace, s.id, e) + "?dt=" + Date.now());
                const a = await b.call(v, e, t, r);
                v.bundleUrl = e;
                const u = v.layers.getOnSave();
                return v.layers.setOnSave((async () => {
                    const t = "function" == typeof (null == n ? void 0 : n.onExit), r = t;
                    t && a.mute();
                    const s = await i();
                    if (null !== s) {
                        r && y("Saving [1/2]: collecting changes");
                        const t = await a.persist();
                        r && y("Saving [2/2]: sending to cloud"), await (0, o.putPersonalBundle)(s.namespace, s.id, e, t)
                    } else r && y("Saving [1/1]: collecting changes"), await u.call(v.layers);
                    t && r && (y("Saved. Now you can close the window"), c.classList.remove("animate-pulse"))
                })), g(), a
            };
            const w = v.stop;
            return v.stop = () => (v.bundleUrl = null, w.call(v)), v
        }

        n.DosPlayer = l, window.Dos = l
    }, {"./backend/v7/personal": 128, "./dom": 151, "./hardware-transport-layer": 152, "./player-app": 154}],
    156: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.request = void 0, n.request = async function (e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "GET",
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            const r = await fetch(e, {
                method: t,
                body: n,
                headers: new Headers({"content-type": "application/json"})
            }).then((e => e.json()));
            var i;
            if (200 !== r.code) throw new Error(null !== (i = r.message) && void 0 !== i ? i : "code: " + r.code);
            return r
        }
    }, {}],
    157: [function (e, t, n) {
        "use strict";

        function r(e, t, n, r, i, o) {
            return new Promise(((s, a) => {
                const l = new XMLHttpRequest;
                if (l.responseType = n, l.open(e, t, !0), l.addEventListener("load", (() => {
                    200 !== l.status ? a(new Error("Wrong status code " + l.status)) : "text" === n ? s(l.responseText) : "arraybuffer" === n ? s(l.response) : a(new Error("Unsupported responseType " + n))
                }), !1), l.addEventListener("error", (() => {
                    a(new Error("HTTP GET failed for url " + t))
                }), !1), l.addEventListener("abort", (() => {
                    a(new Error("HTTP GET canceled for url " + t))
                }), !1), void 0 !== i && (l.onprogress = e => {
                    if (e.loaded && e.total && e.total > 0) {
                        const t = Math.round(1e4 * e.loaded / e.total) / 100;
                        i(t)
                    }
                }), void 0 !== o) for (const e of Object.keys(o)) l.setRequestHeader(e, o[e]);
                l.send(r)
            }))
        }

        function i(e, t, n) {
            return r("post", e, t, n)
        }

        e("core-js/modules/web.dom-collections.iterator.js"), Object.defineProperty(n, "__esModule", {value: !0}), n.post = n.getObject = n.postObject = n.send = void 0, n.send = r, n.postObject = async function (e, t) {
            const n = JSON.parse(await i(e, "text", t));
            if (n.success) return n;
            if (void 0 !== n.errorCode) throw new Error(n.errorCode);
            throw new Error("POST Object request failed:\n Payload:\n" + JSON.stringify(n.body, null, 2))
        }, n.getObject = async function (e) {
            const t = JSON.parse(await r("get", e, "text"));
            if (t.success) return t;
            if (void 0 !== t.errorCode) throw new Error(t.errorCode);
            throw new Error("GET Object request failed:\n Payload:\n" + JSON.stringify(t, null, 2))
        }, n.post = i
    }, {"core-js/modules/web.dom-collections.iterator.js": 118}],
    158: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.getPersonalBundleUrl = n.getPersonalBundleKey = n.uploadsS3Bucket = void 0, n.uploadsS3Bucket = "doszone-uploads";
        const r = "https://doszone-uploads.s3.dualstack.eu-central-1.amazonaws.com";

        function i(e, t, n, i) {
            if (void 0 !== i && n.startsWith(r)) return n.substring(r.length + 1);
            const o = n.lastIndexOf("/"), s = n.substr(o + 1);
            return "doszone" === e ? "personal/" + t + "/" + s : "personal-v2/" + e + "/" + t + "/" + s
        }

        n.getPersonalBundleKey = i, n.getPersonalBundleUrl = function (e, t, n, o) {
            const s = i(e, t, n, o);
            return r + "/" + s
        }
    }, {}]
}, {}, [155]);
//# sourceMappingURL=js-dos.js.map
