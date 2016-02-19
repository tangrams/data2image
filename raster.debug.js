/**
 * @author Bei ZHANG <ikarienator@gmail.com> http://twbs.in/
 * 
 * Copyright © 2012 Bei ZHANG <ikarienator@gmail.com>. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation and/or
 * other materials provided with the distribution.
 *
 * 3. The name of the author may not be used to endorse or promote products derived
 * from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY Bei ZHANG "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */(function(e, t) {
    "use strict";
    function m(e, n) {
        var r, i, s;
        if (n === t) {
            n = function(e, t) {
                return e < t;
            };
        }
        this._lessTest = n;
        if (e !== t) {
            this._arr = e.slice(0);
            r = this._arr, s = r.length;
            for (i = s - 1; i >= 0; i--) {
                this._down(i);
            }
        } else {
            this._arr = [];
        }
    }
    function g(e) {
        if (e) {
            this.lessTest = e;
        }
    }
    function y(e) {
        this.data = e;
    }
    function b(e) {
        this.code = e;
    }
    function w(e, t, n, r, i, s) {
        if (arguments.length === 0) {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0;
        } else {
            this.a = e;
            this.b = t;
            this.c = n;
            this.d = r;
            this.e = i;
            this.f = s;
        }
        Object.freeze(this);
    }
    function E(e) {
        if (e >= 0) {
            return u(a(e) / 3);
        } else if (e < 0) {
            return -u(a(-e) / 3);
        }
    }
    function S(e, t) {
        var n;
        if (e === 0) {
            n = function() {
                return t;
            };
            n.solve = function() {
                return [];
            };
        } else {
            n = function(n) {
                return e * n + t;
            };
            n.solve = function(n) {
                return [ (n - t) / e ];
            };
        }
        return n;
    }
    function x(e, t, n) {
        var i, s, u, a, f;
        if (e === 0) {
            return S(t, n);
        } else {
            i = function(r) {
                return (e * r + t) * r + n;
            }, s = t * t - 4 * e * n, u = function(t) {
                return s + 4 * e * t;
            }, a = 1 / e * .5, f = -a * t;
            a = r(a);
            i.solve = function(e) {
                var t = u(e);
                if (t < 0) {
                    return [];
                }
                t = o(t);
                return [ f - t * a, f + t * a ];
            };
            return i;
        }
    }
    function T(e, t, r, u) {
        var a, f, l, c, h, p, d, v, m, g;
        if (e === 0) {
            return x(t, r, u);
        } else {
            a = function(n) {
                return ((e * n + t) * n + r) * n + u;
            }, f = t / e / 3, l = r / e, c = u / e, h = f * f, p = (f * l - c) * .5 - f * h, d = h - l / 3, v = d * d * d;
            if (d === 0) {
                a.solve = function(t) {
                    return [ -f + E(p * 2 + t / e) ];
                };
            } else {
                if (d > 0) {
                    m = o(d);
                    g = m * m * m;
                    m += m;
                }
                a.solve = function(t) {
                    var r, u, a, l, c, h, d, y;
                    t /= e;
                    r = p + t * .5, u = r * r - v;
                    if (u > 0) {
                        u = o(u);
                        return [ -f + E(r + u) + E(r - u) ];
                    } else if (u === 0) {
                        d = E(r);
                        y = -f - d;
                        if (r >= 0) {
                            return [ y, y, -f + 2 * d ];
                        } else {
                            return [ -f + 2 * d, y, y ];
                        }
                    } else {
                        a = s(r / g) / 3;
                        l = m * i(a) - f;
                        c = m * i(a + n) - f;
                        h = m * i(a - n) - f;
                        if (l < c) {
                            if (c < h) {
                                return [ l, c, h ];
                            } else if (l < h) {
                                return [ l, h, c ];
                            } else {
                                return [ h, l, c ];
                            }
                        } else {
                            if (l < h) {
                                return [ c, l, h ];
                            } else if (c < h) {
                                return [ c, h, l ];
                            } else {
                                return [ h, c, l ];
                            }
                        }
                    }
                };
            }
            return a;
        }
    }
    function N(e, t, n, r) {
        this.a = e;
        this.b = t;
        this.c = n;
        this.d = r;
        this.f = T((t - n) * 3 + r - e, 3 * (e - t * 2 + n), 3 * (t - e), e);
    }
    function C(e, t, n, r, i, s, o, u) {
        this.xs = new N(e, n, i, o);
        this.ys = new N(t, r, s, u);
    }
    function k(e, t, n, i, s, o, u, a, f, l) {
        var c, h, p, d, v, m, g, y, b, w, E, S;
        if (r(5 * t - 6 * i - 3 * o + 4 * a) < l && r(4 * t - 3 * i - 6 * o + 5 * a) < l && r(5 * n - 6 * s - 3 * u + 4 * f) < l && r(4 * n - 3 * s - 6 * u + 5 * f) < l) {
            e.push(a, f);
        } else {
            c = (i + t) * .5, h = (o + i) * .5, p = (a + o) * .5, d = (h + c) * .5, v = (p + h) * .5, m = (v + d) * .5, g = (s + n) * .5, y = (u + s) * .5, b = (f + u) * .5, w = (y + g) * .5, E = (b + y) * .5, S = (E + w) * .5;
            k(e, t, n, c, g, d, w, m, S, l);
            k(e, m, S, v, E, p, b, a, f, l);
        }
    }
    function L() {}
    function A(e, t, n, i, s, o, u, a) {
        var f, l, c, h, p, d;
        if (r(t + o - i * 2) < a && r(n + u - s * 2) < a) {
            e.push(o, u);
        } else {
            f = (t + i) * .5, l = (i + o) * .5, c = (f + l) * .5, h = (n + s) * .5, p = (s + u) * .5, d = (h + p) * .5;
            A(e, t, n, f, h, c, d, a);
            A(e, c, d, l, p, o, u, a);
        }
    }
    function O(e) {
        var t, n, r, i, s = e.length / 2, o = new Array(s), u = new Array(s), a = new Array(s), f = {}, l = {};
        for (t = 0; t < s; t++) {
            o[t] = t << 1;
        }
        o.sort(function(t, n) {
            if (e[t + 1] < e[n + 1]) {
                return -1;
            } else if (e[t + 1] > e[n + 1]) {
                return 1;
            } else if (e[t] < e[n]) {
                return -1;
            } else if (e[t] > e[n]) {
                return 1;
            } else {
                return 0;
            }
        });
        for (t = 0; t < s; t++) {
            o[t] >>= 1;
        }
        for (t = 0; t < s; t++) {
            n = o[t], r = (n + s - 1) % s, i = (n + 1) % s;
            if (u[r]) {
                if (u[i]) {
                    l[n] = 1;
                    a[n] = -1;
                } else {
                    a[n] = 1;
                }
            } else {
                if (u[i]) {
                    a[n] = -1;
                } else {
                    f[n] = 1;
                    a[n] = 1;
                }
            }
            u[n] = 1;
        }
        return [ o, f, l, a ];
    }
    function M(e, t, n) {
        var r, i = new Float32Array(e * t), s = i.length;
        if (n) {
            for (r = 0; r < s; r++) {
                i[r] = 1;
            }
        }
        return i;
    }
    function _(e) {
        var t, n = e.length;
        for (t = 0; t < n; t++) {
            e[t] = 1;
        }
    }
    function D(e) {
        return new Float32Array(e);
    }
    function P(e, t, n, r, i) {
        function k(e, t) {
            return u[e] - u[t];
        }
        var s, o, u, a, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C;
        s = [], o = new Int32Array(r.length), u = new Float32Array(r.length), a = new Float32Array(r.length), l = new Float32Array(t), C = [];
        for (p = 0, y = 0; p < n; p++) {
            for (h = 0, b = 0; h < t; h++) {
                l[h] = 0;
            }
            for (g = 0; g < 1; g += .25) {
                v = p + g;
                s.length = c = 0;
                for (b = 0; b < r.length; b += 2) {
                    S = r[b];
                    x = r[b + 1];
                    T = b + 2 < r.length ? r[b + 2] : r[0];
                    N = b + 2 < r.length ? r[b + 3] : r[1];
                    if (x === N) {
                        continue;
                    }
                    w = (v - N) / (x - N) * (S - T) + T;
                    if (x > N) {
                        if (x >= v && v > N) {
                            u[c] = w;
                            a[c] = 1;
                            s.push(c);
                            c++;
                        }
                    } else {
                        if (x < v && v <= N) {
                            u[c] = w;
                            a[c] = -1;
                            s.push(c);
                            c++;
                        }
                    }
                }
                if (s.length) {
                    s.sort(k);
                    o.set(s, 0);
                    E = 0;
                    for (h = 0, b = 0; h < t && b < o.length; h++) {
                        for (m = 0; m < 1; m += .25) {
                            d = h + m;
                            while (u[o[b]] <= d) {
                                E += a[o[b]];
                                b++;
                                if (b === c) {
                                    break;
                                }
                            }
                            if (i === f.EvenOdd) {
                                l[h] += E & 1;
                            } else {
                                l[h] += +(E !== 0);
                            }
                        }
                    }
                }
            }
            for (h = 0; h < t; h++, y++) {
                e[y] = l[h] * .25 * .25;
            }
        }
        return e;
    }
    function H(e) {
        var t, n;
        if (!e) {
            t = [];
        } else if (e instanceof H) {
            t = e.pathStrips.slice(0);
            for (n = 0; n < t.length; n++) {
                t[n] = t[n].slice(0);
            }
        } else {
            t = this.pathStrips = v.Utils.parseSvgPath(e);
        }
        this.pathStrips = t;
        this.subPath = t[t.length - 2] || null;
        this.subPathTypes = t[t.length - 1] || null;
    }
    function B() {}
    function j(e, t, n) {
        var r, i, s;
        n = n || .5;
        r = [ e[0], e[1] ];
        for (i = 0, s = 2; i < t.length; i++) {
            switch (t[i]) {
              case l.LINE:
                r.push(e[s], e[s + 1]);
                s += 2;
                break;
              case l.QUAD:
                v.quadraticBezierBuildSegmentsHelper(r, e[s - 2], e[s - 1], e[s], e[s + 1], e[s + 2], e[s + 3], n * 4);
                s += 4;
                break;
              case l.CUBIC:
                v.cubicBezierBuildSegmentsHelper(r, e[s - 2], e[s - 1], e[s], e[s + 1], e[s + 2], e[s + 3], e[s + 4], e[s + 5], n * 13.5);
                s += 6;
                break;
            }
        }
        return r;
    }
    function F() {}
    function I() {}
    function q() {
        this.array = new Uint8Array(d);
        this.length = this.array.length;
        this.crcStart = 0;
    }
    function R(e, t) {
        var n, r = 65521, i = 5552, s = 1, o = 0, u = i;
        for (n = 0; n < t; n++) {
            s += e[n];
            o += s;
            if ((u -= 1) == 0) {
                s %= r;
                o %= r;
                u = i;
            }
        }
        s %= r;
        o %= r;
        return o << 16 | s;
    }
    function U(e, t) {
        var n, r, i, s = new Uint8Array(2 + 4 + 5 * Math.ceil(t / 65535) + t), o = 8 + (7 << 4) << 8 | 3 << 6, u = [ 0, 255, 255, 0, 0 ], a = 0;
        o += 31 - o % 31;
        s[a++] = o >> 8;
        s[a++] = o;
        for (r = 0; r + 65535 < t; r += 65535) {
            s.set(u, a);
            a += 5;
            s.set(e.subarray(r, r + 65535), a);
            a += 65535;
        }
        n = t - r;
        if (n) {
            s[a++] = 1;
            s[a++] = n & 255;
            s[a++] = n >> 8 & 255;
            n = ~n;
            s[a++] = n & 255;
            s[a++] = n >> 8 & 255;
            s.set(e.subarray(r), a);
            a += ~n;
        }
        i = R(e, t);
        s[a++] = i >> 24;
        s[a++] = i >> 16;
        s[a++] = i >> 8;
        s[a++] = i;
        return s;
    }
    function z(e, t, n, r) {
        var i, s, o = new Uint8Array((e * n + 1) * t), u = e * n, a = 0;
        for (i = 0, s = 0; i < t; i++, s += u) {
            o[a++] = 0;
            o.set(r.slice(s, s + u), a);
            a += u;
        }
        return o;
    }
    function W(e, t, n) {
        var r = new q;
        r.writeIHDRChunk(t, n, 8, 6, 0);
        e = z(t, n, 4, e);
        e = U(e, e.length);
        r.writeIDATChunk(e);
        r.writeIENDChunk();
        return "data:image/png;base64," + r.getBase64String();
    }
    var n, r, i, s, o, u, a, f, l, c, h, p, d, v = {};
    e.raster = v;
    if (!e.Float32Array) {
        console.log("Float32Array not supported. Polyfilling.");
        (function(e) {
            function n(e) {
                var n, r;
                if (typeof e === "number") {
                    this.length = e;
                } else if (e.length === t) {
                    this.length = e.length;
                    for (n = 0, r = e.length; n < r; n++) {
                        this[n] = +e[n];
                    }
                }
            }
            n.prototype = [];
            n.prototype.set = function(e, t) {
                var n;
                for (n = 0; n < e.length; n++) {
                    this[t++] = e[n];
                }
            };
            e.Float64Array = n;
            e.Float32Array = n;
            e.Uint32Array = n;
            e.Int32Array = n;
            e.Uint8Array = n;
            e.Uint8ClampedArray = n;
        })(e);
    }
    v.Utils = {
        eps: 1e-10,
        squareNorm: function(e, t) {
            return e * e + t * t;
        },
        norm: function(e, t) {
            return Math.sqrt(e * e + t * t);
        },
        squareDistance: function(e, t, n, r) {
            var i = n - e, s = r - t;
            return i * i + s * s;
        },
        distance: function(e, t, n, r) {
            var i = n - e, s = r - t;
            return Math.sqrt(i * i + s * s);
        },
        rotate: function(e, t, n) {
            var r = Math.cos(n), i = Math.sin(n);
            return [ e * r - t * i, e * i + t * r ];
        },
        angle: function(e, t, n, r) {
            return Math.atan2(e * r - n * t, e * n + t * r);
        },
        cross3: function(e, t, n, r, i, s) {
            return (n - e) * (s - t) - (i - e) * (r - t);
        },
        endpointArcToCenterParam: function(e, t, n, r, i, s, o, u, a) {
            var f, l, c, h, p, d, v, m, g, y, b, w, E, S, x;
            if (n < 0) {
                n = -n;
            }
            if (r < 0) {
                r = -r;
            }
            f = (e - u) / 2, l = (t - a) / 2, c = this.rotate(f, l, -i), h = c[0], p = c[1], d = h / n, v = p / r, m = this.squareNorm(h / n, p / r), g = (e + u) * .5, y = (t + a) * .5, b = 0, w = 0;
            if (m >= 1) {
                m = Math.sqrt(m);
                n *= m;
                r *= m;
            } else {
                m = Math.sqrt(1 / m - 1);
                if (s == o) {
                    m = -m;
                }
                E = this.rotate(m * v * n, -m * d * r, i);
                g += b = E[0];
                y += w = E[1];
            }
            S = Math.atan2((p - w) / r, (h - b) / n), x = this.angle((h - b) / n, (p - w) / r, (-h - b) / n, (-p - w) / r);
            if (o) {
                if (x < 0) {
                    x += Math.PI * 2;
                }
            } else {
                if (x > 0) {
                    x -= Math.PI * 2;
                }
            }
            return [ g, y, n, r, i, S, S + x, x > 0 ];
        },
        approximateArcHelper: function(e) {
            var t = 1.333333333333 * Math.tan(e * .25);
            return [ 1, t, Math.cos(e) + t * Math.sin(e), Math.sin(e) - t * Math.cos(e), Math.cos(e), Math.sin(e) ];
        },
        approximateArc: function(e, t, n, r, i, s, o, u) {
            var a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T = [];
            if (!u) {
                a = this.approximateArc(e, t, n, r, -i, o, s, !u);
                for (f = a.length - 2; f >= 0; f -= 2) {
                    T.push(a[f], a[f + 1]);
                }
                return T;
            }
            if (e != 0 || t != 0 || i != 0 || n != 1 || r != 1 || s != 0) {
                p = Math.cos(i), d = Math.sin(i), v = Math.cos(-s), m = Math.sin(-s), g = v * p * n + r * m * d, y = p * n * m - v * r * d, b = -p * r * m + v * n * d, w = v * p * r + n * m * d;
                a = this.approximateArc(0, 0, 1, 1, 0, 0, o - s, true);
                for (f = 0; f < a.length; f += 2) {
                    c = a[f];
                    h = a[f + 1];
                    a[f] = c * g + h * y + e;
                    a[f + 1] = c * b + h * w + t;
                }
                return a;
            }
            if (o < 0) {
                o += Math.PI * 2;
            }
            E = 0, S = Math.PI * .5, x = .5522847498307935;
            T = [ 1, 0 ];
            while (o >= S) {
                switch (E) {
                  case 0:
                    T.push(1, x, x, 1, 0, 1);
                    E = 1;
                    break;
                  case 1:
                    T.push(-x, 1, -1, x, -1, 0);
                    E = 2;
                    break;
                  case 2:
                    T.push(-1, -x, -x, -1, 0, -1);
                    E = 3;
                    break;
                  case 3:
                    T.push(x, -1, 1, -x, 1, 0);
                    E = 0;
                    break;
                }
                o -= S;
            }
            if (o) {
                l = this.approximateArcHelper(o);
                switch (E) {
                  case 0:
                    T.push.apply(T, l);
                    break;
                  case 1:
                    T.push(l[1], -l[0], l[3], -l[2], l[5], -l[4]);
                    break;
                  case 2:
                    T.push(l[0], l[1], l[2], l[3], l[4], l[5]);
                    break;
                  case 3:
                    T.push(-l[1], l[0], -l[3], l[2], -l[5], l[4]);
                    break;
                }
            }
            return T;
        },
        parseSvgPath: function() {
            return [];
        },
        inters: function(e, t, n, r, i, s, o, u) {
            var a, f = this.cross3(e, t, n, r, i, s), l = this.cross3(e, t, n, r, o, u), c = this.cross3(e, t, o, u, i, s), h = l + c - f;
            if (f * l <= 0 && c * h <= 0) {
                if (f == l) {
                    return null;
                }
                a = 1 / (l - f);
                return [ (i * l - o * f) * a, (s * l - u * f) * a ];
            } else {
                return null;
            }
        }
    };
    m.prototype = {
        _up: function(e) {
            var t, n = this._arr, r = n[e], i = this._lessTest;
            do {
                t = e - 1 >> 1;
                if (i(r, n[t])) {
                    n[e] = n[t];
                    e = t;
                } else {
                    break;
                }
            } while (e > 0);
            n[e] = r;
        },
        _down: function(e) {
            var t, n, r = this._arr, i = this._lessTest, s = r[e], o = r.length;
            do {
                t = e * 2 + 1;
                n = e * 2 + 2;
                if (n >= o) {
                    if (t < o) {
                        if (i(r[t], s)) {
                            r[e] = r[t];
                            e = t;
                        }
                    }
                    break;
                } else {
                    if (i(r[t], r[n])) {
                        if (i(r[t], s)) {
                            r[e] = r[t];
                            e = t;
                        } else {
                            break;
                        }
                    } else if (i(r[n], s)) {
                        r[e] = r[n];
                        e = n;
                    } else {
                        break;
                    }
                }
            } while (true);
            r[e] = s;
        },
        push: function(e) {
            var t, n = this._arr;
            if (arguments.length > 1) {
                for (t = 0; t < arguments.length; t++) {
                    n.push(arguments[t]);
                    this._up(n.length - 1);
                }
            } else if (n.length === 0) {
                n.push(e);
            } else {
                n.push(e);
                this._up(n.length - 1);
            }
        },
        peek: function() {
            return this._arr[0];
        },
        pop: function() {
            var e = this._arr, t = e[0];
            if (e.length > 1) {
                e[0] = e[e.length - 1];
                e.length--;
                this._down(0);
            } else {
                e.length = 0;
            }
            return t;
        },
        size: function() {
            return this._arr.length;
        }
    };
    v["PriorityQueue"] = m;
    y.prototype = {
        parent: null,
        red: true,
        left: null,
        right: null,
        data: null,
        toString: function() {
            return "{red: " + this.red + ", data:" + String(this.data) + ", left:" + this.left + ", right:" + this.right + "}";
        }
    };
    g.prototype = {
        lessTest: function(e, t) {
            return e < t;
        },
        root: null,
        size: 0,
        search: function(e) {
            return this._nodeSearch(this.root, e);
        },
        insert: function(e) {
            if (this.size == 0) {
                this.root = new y(e);
                this.root.red = false;
            } else {
                this._nodeInsert(this.root, e, this.lessTest);
            }
            this.size++;
        },
        first: function() {
            return this._nodeLeftMost(this.root);
        },
        next: function(e) {
            var t;
            if (e.right) {
                return this._nodeLeftMost(e.right);
            } else if (e.parent) {
                t = e;
                while (t.parent && t.parent.left !== t) {
                    t = t.parent;
                }
                return t.parent;
            } else {
                return e.right && this._nodeLeftMost(e.right);
            }
        },
        remove: function(e) {
            var t, n;
            if (this.size) {
                t = this.search(e);
                if (t) {
                    if (t.right) {
                        n = this._nodeLeftMost(t.right);
                        t.data = n.data;
                        this._nodeRemoveMin(n);
                    } else {
                        this._nodeRemoveMin(t);
                    }
                    this.size--;
                }
            }
        },
        _nodeLeftMost: function(e) {
            while (e.left) {
                e = e.left;
            }
            return e;
        },
        _nodeIsRed: function(e) {
            return e && e.red;
        },
        _nodeSibling: function(e) {
            if (e && e.parent) {
                return e == e.parent.left ? e.parent.right : e.parent.left;
            } else {
                return null;
            }
        },
        _nodeColorFlip: function(e) {
            e.red = !e.red;
            e.left.red = !e.left.red;
            e.right.red = !e.right.red;
        },
        _nodeRotateLeft: function(e) {
            var t = e.right;
            t.parent = e.parent;
            if (e.parent) {
                if (e.parent.left == e) {
                    e.parent.left = t;
                } else {
                    e.parent.right = t;
                }
            } else {
                this.root = t;
            }
            e.right = t.left;
            if (e.right) {
                e.right.parent = e;
            }
            t.left = e;
            e.parent = t;
        },
        _nodeRotateRight: function(e) {
            var t = e.left;
            t.parent = e.parent;
            if (e.parent) {
                if (e.parent.right === e) {
                    e.parent.right = t;
                } else {
                    e.parent.left = t;
                }
            } else {
                this.root = t;
            }
            e.left = t.right;
            if (e.left) {
                e.left.parent = e;
            }
            t.right = e;
            e.parent = t;
        },
        _nodeSearch: function(e, t) {
            var n = this.lessTest;
            while (e && e.data !== t) {
                if (n(t, e.data)) {
                    e = e.left;
                } else {
                    e = e.right;
                }
            }
            return e;
        },
        _nodeInsertFixUp: function(e) {
            var t, n, r;
            if (!e.parent) {
                e.red = false;
            } else if (e.parent.red) {
                t = e.parent, n = t.parent, r = n.left === t ? n.right : n.left;
                if (this._nodeIsRed(r)) {
                    this._nodeColorFlip(n);
                    this._nodeInsertFixUp(n);
                } else {
                    if (e === t.right && t === n.left) {
                        n.left = e;
                        e.parent = n;
                        if (t.right = e.left) {
                            t.right.parent = t;
                        }
                        e.left = t;
                        t.parent = e;
                        t = e;
                        e = e.left;
                    } else if (e === t.left && t === n.right) {
                        n.right = e;
                        e.parent = n;
                        if (t.left = e.right) {
                            t.left.parent = t;
                        }
                        e.right = t;
                        t.parent = e;
                        t = e;
                        e = e.right;
                    }
                    t.red = false;
                    n.red = true;
                    if (e == t.left) {
                        this._nodeRotateRight(n);
                    } else {
                        this._nodeRotateLeft(n);
                    }
                }
            }
        },
        _nodeInsert: function(e, t, n) {
            if (n(t, e.data)) {
                if (!e.left) {
                    e.left = new y(t);
                    e.left.parent = e;
                    this._nodeInsertFixUp(e.left);
                } else {
                    this._nodeInsert(e.left, t, n);
                }
            } else {
                if (!e.right) {
                    e.right = new y(t);
                    e.right.parent = e;
                    this._nodeInsertFixUp(e.right);
                } else {
                    this._nodeInsert(e.right, t, n);
                }
            }
        },
        _nodeRemoveFixUp: function(e, t, n) {
            if (t !== null) {
                if (this._nodeIsRed(n)) {
                    t.red = true;
                    n.red = false;
                    if (e === t.left) {
                        this._nodeRotateLeft(t);
                        n = t.right;
                    } else {
                        this._nodeRotateRight(t);
                        n = t.left;
                    }
                }
                if (!this._nodeIsRed(n.left) && !this._nodeIsRed(n.right)) {
                    n.red = true;
                    if (!this._nodeIsRed(t)) {
                        this._nodeRemoveFixUp(t, t.parent, this._nodeSibling(t));
                    } else {
                        t.red = false;
                    }
                } else {
                    if (e === t.left && !this._nodeIsRed(n.right) && this._nodeIsRed(n.left)) {
                        n.red = true;
                        n.left.red = false;
                        this._nodeRotateRight(n);
                        n = n.parent;
                    } else if (e === t.right && !this._nodeIsRed(n.left) && this._nodeIsRed(n.right)) {
                        n.red = true;
                        n.right.red = false;
                        this._nodeRotateLeft(n);
                        n = n.parent;
                    }
                    n.red = t.red;
                    t.red = false;
                    if (e === t.left) {
                        this._nodeRotateLeft(t);
                        n.right.red = false;
                    } else {
                        this._nodeRotateRight(t);
                        n.left.red = false;
                    }
                }
            }
        },
        _nodeRemoveMin: function(e) {
            var t = e.left || e.right, n = this._nodeSibling(e);
            if (t) {
                t.parent = e.parent;
            }
            if (e.parent) {
                if (e.parent.left === e) {
                    e.parent.left = t;
                } else {
                    e.parent.right = t;
                }
            } else {
                this.root = t;
            }
            if (!e.red) {
                if (this._nodeIsRed(t)) {
                    t.red = false;
                } else {
                    this._nodeRemoveFixUp(t, e.parent, n);
                }
            }
        }
    };
    v.RedBlackTree = g;
    b.SVG_WRONG_TYPE_ERR = 0;
    b.SVG_INVALID_VALUE_ERR = 1;
    b.SVG_MATRIX_NOT_INVERTABLE = 2;
    w.prototype = {
        multiply: function(e) {
            var t = this, n = t.a * e.a + t.c * e.b, r = t.b * e.a + t.d * e.b, i = t.a * e.c + t.c * e.d, s = t.b * e.c + t.d * e.d, o = t.e + t.a * e.e + t.c * e.f, u = this.b * e.e + this.f + this.d * e.f;
            return new w(n, r, i, s, o, u);
        },
        inverse: function() {
            var e = this, t = e.a * e.d - e.b * e.c;
            if (t === 0) {
                throw new b(b.SVG_MATRIX_NOT_INVERTABLE);
            }
            t = 1 / t;
            return new w(e.d * t, -e.b * t, -e.c * t, e.a * t, (e.c * e.f - e.d * e.e) * t, (e.b * e.e - e.a * e.f) * t);
        },
        translate: function(e, t) {
            var n = this;
            return new w(n.a, n.b, n.c, n.d, n.e + e, n.f + t);
        },
        scale: function(e) {
            var t = this;
            return new w(t.a * e, t.b * e, t.c * e, t.d * e, t.e, t.f);
        },
        scaleNonUniform: function(e, t) {
            var n = this;
            return new w(n.a * e, n.b * e, n.c * t, n.d * t, n.e, n.f);
        },
        rotate: function(e) {
            var t = this, n = Math.cos(e), r = Math.sin(e);
            return new w(t.a * n + t.c * r, t.b * n + t.d * r, t.c * n - t.a * r, t.d * n - t.b * r, t.e, t.f);
        },
        rotateFromVector: function(e, t) {
            var n, r, i, s;
            if (!e || !t) {
                throw new b(b.SVG_INVALID_VALUE_ERR);
            }
            n = this, r = Math.sqrt(e * e + t * t), i = e / r, s = t / r;
            return new w(n.a * i + n.c * s, n.b * i + n.d * s, n.c * i - n.a * s, n.d * i - n.b * s, n.e, n.f);
        },
        flipX: function() {
            var e = this;
            return new w(-e.a, -e.b, e.c, e.d, e.e, e.f);
        },
        flipY: function() {
            var e = this;
            return new w(e.a, e.b, -e.c, -e.d, e.e, e.f);
        },
        skewX: function(e) {
            var t = this, n = Math.tan(e);
            return new w(t.a, t.b, t.c + n * t.a, t.d + n * t.b, t.e, t.f);
        },
        skewY: function(e) {
            var t = this, n = Math.tan(e);
            return new w(t.a + n * t.c, t.b + n * t.d, t.c, t.d, t.e, t.f);
        },
        scaleByPivot: function(e, t, n, r) {
            var i = this, s = n * (1 - e), o = r * (1 - t);
            return new w(i.a * e, i.b * e, i.c * t, i.d * t, i.e + i.a * s + i.c * o, i.f + i.b * s + i.d * o);
        },
        rotateByPivot: function(e, t, n) {
            var r = this, i = Math.cos(e), s = Math.sin(e), o = (1 - i) * n - t * s, u = (1 - i) * t + n * s;
            return new w(r.a * i + r.c * s, r.b * i + r.d * s, r.c * i - r.a * s, r.d * i - r.b * s, r.e + r.c * o + r.a * u, r.f + r.d * o + r.b * u);
        }
    };
    v.Matrix = w;
    n = 2.0943951023931953, r = Math.abs, i = Math.cos, s = Math.acos, o = Math.sqrt, u = Math.exp, a = Math.log;
    v["linearFunction"] = S;
    v["quadraticFunction"] = x;
    v["cubicFunction"] = T;
    N.prototype = {
        get: function(e) {
            return this.f(e);
        },
        split: function() {
            return N.split(this.a, this.b, this.c, this.d);
        },
        extrema: function() {
            var e = this.a, t = this.b, n = this.c, r = this.d, i = this.f, s = x(-3 * (e - 3 * t + 3 * n - r), 6 * (e - 2 * t + n), -3 * (e - t)).solve(0), o = 0, u = e, a = 0, f = u, l = r;
            if (l < u) {
                o = 1;
                u = l;
            } else if (l > f) {
                a = 1;
                f = l;
            }
            if (s.length) {
                if (0 <= s[0] && s[0] <= 1) {
                    l = i(s[0]);
                    if (l < u) {
                        o = s[0];
                        u = l;
                    } else if (l > f) {
                        a = s[0];
                        f = l;
                    }
                }
                if (0 <= s[1] && s[1] <= 1) {
                    l = i(s[1]);
                    if (l < u) {
                        o = s[1];
                    } else if (l > f) {
                        a = s[1];
                    }
                }
            }
            s = [ o, a ];
            this.extrema = function() {
                return s;
            };
            return s;
        }
    };
    N.split = function(e, t, n, r, i) {
        var s = (t - e) * i + e, o = (n - t) * i + t, u = (r - n) * i + n, a = (o - s) * i + s, f = (u - o) * i + o, l = (f - a) * i + a;
        return [ [ e, s, a, l ], [ l, f, u, r ] ];
    };
    C.prototype = {
        get: function(e) {
            return [ this.xs.get(e), this.ys.get(e) ];
        },
        split: function(e) {
            var t = this.xs.split(e), n = this.ys.split(e);
            return [ [ t[0][0], n[0][0], t[0][1], n[0][1], t[0][2], n[0][2], t[0][3], n[0][3] ], [ t[1][0], n[1][0], t[1][1], n[1][1], t[1][2], n[1][2], t[1][3], n[1][3] ] ];
        },
        buildSegments: function(e) {
            var t = this.xs, n = this.ys;
            return C.buildSegments(t.a, n.a, t.b, n.b, t.c, n.c, t.d, n.d, e || .5);
        }
    };
    C.buildSegments = function(e, t, n, r, i, s, o, u, a) {
        var f = [ e, t ];
        k(f, e, t, n, r, i, s, o, u, a * 13.5);
        return f;
    };
    L.buildSegments = function(e, t, n, r, i, s, o) {
        var u = [ e, t ];
        A(u, e, t, n, r, i, s, o * 4);
        return u;
    };
    v.CubicBezier1 = N;
    v.CubicBezier2 = C;
    v.quadraticBezierBuildSegmentsHelper = A;
    v.cubicBezierBuildSegmentsHelper = k;
    v.buildMonotone = O;
    f = {
        EvenOdd: 0,
        Winding: 1
    };
    v.FillType = f;
    v.setOpaque = _;
    v.copyAlphaChannel = D;
    v.createMaskNaive = P;
    v.createAlphaChanel = M;
    l = {
        LINE: 0,
        QUAD: 1,
        CUBIC: 2
    };
    c = [ 0, 0 ];
    H.prototype = {
        addPath: function(e, t) {
            var n, r, i, s, o, u, a, f, l, c, h, p, d, v, m;
            if (e.pathStrips && e.pathStrips.length) {
                a = e.pathStrips;
                if (t) {
                    c = t.a, h = t.b, p = t.c, d = t.d, v = t.e, m = t.f;
                    for (n = 0, r = a.length; n < r; n += 2) {
                        f = a[n].slice(0);
                        l = a[n + 1].slice(0);
                        for (i = 0, s = f.length; i < s; i += 2) {
                            o = f[i];
                            u = f[i + 1];
                            f[i] = c * o + p * u + v;
                            f[i + 1] = h * o + d * u + m;
                        }
                        this.pathStrips.push(f);
                        this.pathStrips.push(l);
                    }
                } else {
                    for (n = 0, r = a.length; n < r; n++) {
                        this.pathStrips.push(a[n].slice(0));
                    }
                }
                f = this.pathStrips[this.pathStrips.length - 1];
                if (f) {
                    this.moveTo(f[f.length - 2], f[f.length - 1]);
                }
            }
        },
        addPathByStrokingPath: function(e, t, n) {
            this.addPath(e.__trace(t), n);
        },
        addText: function() {},
        addPathByStrokingText: function() {},
        __ensureSubpath: function(e, n) {
            var r = this;
            if (r.cursorX === t) {
                r.moveTo(e, n);
            }
            return r.cursor;
        },
        moveTo: function(e, t) {
            var n = this;
            n.subPath = [ e, t ];
            n.subPathTypes = [];
            n.pathStrips.push(n.subPath);
            n.pathStrips.push(n.subPathTypes);
            n.cursorX = e;
            n.cursorY = t;
        },
        closePath: function() {
            var e = this;
            if (e.subPath) {
                e.lineTo(e.subPath[0], e.subPath[1]);
                e.moveTo(e.subPath[0], e.subPath[1]);
            }
        },
        lineTo: function(e, t) {
            var n = this;
            n.__ensureSubpath(e, t);
            n.subPath.push(e, t);
            n.subPathTypes.push(l.LINE);
            this.cursorX = e;
            this.cursorY = t;
        },
        quadraticCurveTo: function(e, t, n, r) {
            var i = this;
            i.__ensureSubpath(e, t);
            i.subPath.push(e, t, n, r);
            i.subPathTypes.push(l.QUAD);
            this.cursorX = n;
            this.cursorY = r;
        },
        bezierCurveTo: function(e, t, n, r, i, s) {
            var o = this;
            o.__ensureSubpath(e, t);
            if (!o.subPath) {
                o.moveTo(0, 0);
            }
            o.subPath.push(e, t, n, r, i, s);
            o.subPathTypes.push(l.CUBIC);
            o.cursorX = i;
            o.cursorY = s;
        },
        arcTo: function(e, t, n, r, i, s, o) {
            var u, a, f, l, c, h, p, d, m, g, y;
            if (!s) {
                s = i;
                o = 0;
            }
            if (i < 0 || s < 0) {
                throw new B;
            }
            u = this, a = u.__ensureSubpath(e, t), f = a[0], l = a[1];
            if (f == e && l == t || e == n && t == r || i == 0 && s == 0 || v.Utils.cross3(f, l, e, t, n, r) < v.Utils.eps) {
                u.lineTo(e, t);
                return;
            }
            c = Math.cos(o), h = Math.sin(o), p = c * i, d = -h * s, m = h * i, g = c * s;
            if (e == f) {
                y = Math.atan2(d, p);
            }
        },
        arc: function(e, t, n, r, i, s) {
            return this.ellipse(e, t, n, n, 0, r, i, s);
        },
        ellipse: function(e, t, n, r, i, s, o, u) {
            var a, f, c;
            if (n < 0 || r < 0) {
                throw new B;
            }
            a = v.Utils.approximateArc(e, t, n, r, i, s, o, u), c = a.length;
            this.lineTo(a[0], a[1]);
            this.subPath.push.apply(this.subPath, a.slice(2));
            for (f = 2; f < c; f += 6) {
                this.subPathTypes.push(l.CUBIC);
            }
        },
        rect: function(e, t, n, r) {
            this.moveTo(e, t);
            this.lineTo(e + n, t);
            this.lineTo(e + n, t + r);
            this.lineTo(e, t + r);
            this.closePath();
        },
        __trace: function(e) {
            var t, n, r, i, s, o, u = this.pathStrips, a = e.lineWidth, f = e.lineJoin, l = e.lineCap, c = e.miterLimit;
            for (t = 0, n = 0; t < u.length; t += 2) {
                r = u[t], i = u[t + 1], s = i.length;
                if (s < 2) {
                    continue;
                }
                o = j(r, i, .5);
            }
        }
    };
    v.Path = H;
    v.buildSegments = j;
    F.prototype = {
        lineWidth: 1,
        lineCap: "butt",
        lineJoin: "miter",
        miterLimit: 10,
        setLineDash: function() {},
        getLineDash: function() {},
        lineDashOffset: 0,
        font: "10px sans-serif",
        textAlign: "start",
        textBaseline: "alphabetic"
    };
    I.prototype = {};
    h = [ "globalAlpha", "globalCompositeOperation", "fillStyle", "strokeStyle", "lineWidth", "lineCap", "lineJoin", "miterLimit", "shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor", "font", "textAlign", "textBaseline" ];
    h.forEach(function(e) {
        var t = "get_" + e, n = "set_" + e;
        Object.defineProperty(I.prototype, e, {
            get: function() {
                return this[t]();
            },
            set: function(e) {
                return this[n](e);
            }
        });
    });
    v.CanvasRenderingContext2D = I;
    p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    q.prototype = {
        resetCRC: function() {
            this.crcStart = this.length;
        },
        writeByte: function(e) {
            var t;
            if (this.length == this.array.length) {
                t = this.array;
                this.array = new Uint8Array(this.length * 2);
                this.array.set(t, 0);
            }
            this.array[this.length++] = e;
        },
        writeBytes: function(e) {
            var t = this.array, n = t.length, r = this.length, i = e.length;
            if (r + i > n) {
                while (r + i > n) {
                    n <<= 1;
                }
                this.array = new Uint8Array(n);
                this.array.set(t, 0);
                t = this.array;
            }
            t.set(e, r);
            this.length += e.length;
        },
        writeWord: function(e) {
            this.writeByte(e >> 8);
            this.writeByte(e);
        },
        writeWordLSB: function(e) {
            this.writeByte(e);
            this.writeByte(e >> 8);
        },
        writeInt4: function(e) {
            this.writeByte(e >> 24);
            this.writeByte(e >> 16);
            this.writeByte(e >> 8);
            this.writeByte(e);
        },
        writeType: function(e) {
            this.writeByte(e.charCodeAt(0));
            this.writeByte(e.charCodeAt(1));
            this.writeByte(e.charCodeAt(2));
            this.writeByte(e.charCodeAt(3));
        },
        writeCRC: function() {
            var e, t = -1, n = this.array, r = this.length, i = q.__CRCLookupTable;
            for (e = this.crcStart; e < r; e++) {
                t = i[(t ^ n[e]) & 255] ^ t >> 8 & 16777215;
            }
            t = t ^ -1;
            this.writeInt4(t);
        },
        writeChunk: function(e, t) {
            this.writeInt4(t.length);
            this.resetCRC();
            this.writeType(e);
            this.writeBytes(t);
            this.writeCRC();
        },
        writeIHDRChunk: function(e, n, r, i, s) {
            this.writeInt4(13);
            this.resetCRC();
            this.writeType("IHDR");
            if (!(e > 0)) {
                e = 1;
            }
            if (!(n > 0)) {
                n = 1;
            }
            this.writeInt4(e);
            this.writeInt4(n);
            this.writeByte(r || 8);
            this.writeByte(i === t ? 6 : i);
            this.writeByte(0);
            this.writeByte(0);
            this.writeByte(s);
            this.writeCRC();
        },
        writePLTEChunk: function(e, t, n) {
            var r;
            this.writeInt4(n.length * t * 3 >> 3);
            this.resetCRC();
            this.writeType("PLTE");
            for (r = 0; r < n.length; r++) {
                this.writeByte(n[r] >> 16);
                this.writeByte(n[r] >> 8);
                this.writeByte(n[r]);
            }
            this.writeCRC();
        },
        writeIDATChunk: function(e) {
            this.writeChunk("IDAT", e);
        },
        writeIENDChunk: function() {
            this.writeInt4(0);
            this.resetCRC();
            this.writeType("IEND");
            this.writeCRC();
        },
        getBase64String: function() {
            var e, t, n, r, i, s, o = this.array, u = this.array.length, a = u - u % 3, f = [], l = 0;
            for (s = 0; s < a; s += 3) {
                e = o[s];
                t = o[s + 1];
                n = o[s + 2];
                f.push(p.charAt(e >> 2) + p.charAt((e & 3) << 4 | t >> 4) + p.charAt((t & 15) << 2 | n >> 6) + p.charAt(n & 63));
            }
            e = o[s];
            t = o[s + 1];
            n = o[s + 2];
            if (typeof t === "undefined") {
                r = i = 64;
            } else {
                r = (t & 15) << 2 | n >> 6;
                if (typeof n === "undefined") {
                    i = 64;
                } else {
                    i = n & 63;
                }
            }
            f.push(p.charAt(e >> 2) + p.charAt((e & 3) << 4 | t >> 4) + p.charAt(r) + p.charAt(i));
            return f.join("");
        }
    };
    q.__CRCLookupTable = function() {
        var e, t, n, r = new Uint32Array(256);
        for (e = 0; e < 256; e++) {
            t = e;
            for (n = 0; n < 8; n++) {
                if (t & 1) {
                    t = -306674912 ^ t >> 1 & 2147483647;
                } else {
                    t = t >> 1 & 2147483647;
                }
            }
            r[e] = t;
        }
        return r;
    }();
    d = [ 137, 80, 78, 71, 13, 10, 26, 10 ];
    v.encodeRGBAtoPNG = W;
})(this);