var hljs = new function() {
	function o(r) {
		return r.replace(/&/gm, "&amp;").replace(/</gm, "&lt;")
	}
	function h(t, s, r) {
		return RegExp(s, "m" + (t.cI ? "i" : "") + (r ? "g" : ""))
	}
	function d(t) {
		for ( var r = 0; r < t.childNodes.length; r++) {
			var s = t.childNodes[r];
			if (s.nodeName == "CODE") {
				return s
			}
			if (!(s.nodeType == 3 && s.nodeValue.match(/\s+/))) {
				break
			}
		}
	}
	var c = (typeof navigator !== "undefined" && /MSIE [678]/
			.test(navigator.userAgent));
	function j(v, u) {
		var r = "";
		for ( var t = 0; t < v.childNodes.length; t++) {
			if (v.childNodes[t].nodeType == 3) {
				var s = v.childNodes[t].nodeValue;
				if (u) {
					s = s.replace(/\n/g, "")
				}
				r += s
			} else {
				if (v.childNodes[t].nodeName == "BR") {
					r += "\n"
				} else {
					r += j(v.childNodes[t])
				}
			}
		}
		if (c) {
			r = r.replace(/\r/g, "\n")
		}
		return r
	}
	function a(u) {
		var t = u.className.split(/\s+/);
		t = t.concat(u.parentNode.className.split(/\s+/));
		for ( var s = 0; s < t.length; s++) {
			var r = t[s].replace(/^language-/, "");
			if (g[r] || r == "no-highlight") {
				return r
			}
		}
	}
	function e(t) {
		var r = [];
		(function s(v, w) {
			for ( var u = 0; u < v.childNodes.length; u++) {
				if (v.childNodes[u].nodeType == 3) {
					w += v.childNodes[u].nodeValue.length
				} else {
					if (v.childNodes[u].nodeName == "BR") {
						w += 1
					} else {
						if (v.childNodes[u].nodeType == 1) {
							r.push({
								event : "start",
								offset : w,
								node : v.childNodes[u]
							});
							w = s(v.childNodes[u], w);
							r.push({
								event : "stop",
								offset : w,
								node : v.childNodes[u]
							})
						}
					}
				}
			}
			return w
		})(t, 0);
		return r
	}
	function m(A, y, z) {
		var s = 0;
		var B = "";
		var u = [];
		function w() {
			if (A.length && y.length) {
				if (A[0].offset != y[0].offset) {
					return (A[0].offset < y[0].offset) ? A : y
				} else {
					return y[0].event == "start" ? A : y
				}
			} else {
				return A.length ? A : y
			}
		}
		function v(F) {
			var C = "<" + F.nodeName.toLowerCase();
			for ( var D = 0; D < F.attributes.length; D++) {
				var E = F.attributes[D];
				C += " " + E.nodeName.toLowerCase();
				if (E.value !== undefined && E.value !== false
						&& E.value !== null) {
					C += '="' + o(E.value) + '"'
				}
			}
			return C + ">"
		}
		while (A.length || y.length) {
			var x = w().splice(0, 1)[0];
			B += o(z.substr(s, x.offset - s));
			s = x.offset;
			if (x.event == "start") {
				B += v(x.node);
				u.push(x.node)
			} else {
				if (x.event == "stop") {
					var r, t = u.length;
					do {
						t--;
						r = u[t];
						B += ("</" + r.nodeName.toLowerCase() + ">")
					} while (r != x.node);
					u.splice(t, 1);
					while (t < u.length) {
						B += v(u[t]);
						t++
					}
				}
			}
		}
		return B + o(z.substr(s))
	}
	function l(r) {
		function s(y, A, w) {
			if (y.compiled) {
				return
			}
			var u = [];
			if (y.k) {
				var t = {};
				function z(F, E) {
					var C = E.split(" ");
					for ( var B = 0; B < C.length; B++) {
						var D = C[B].split("|");
						t[D[0]] = [ F, D[1] ? Number(D[1]) : 1 ];
						u.push(D[0])
					}
				}
				y.lR = h(A, y.l || hljs.IR, true);
				if (typeof y.k == "string") {
					z("keyword", y.k)
				} else {
					for ( var x in y.k) {
						if (!y.k.hasOwnProperty(x)) {
							continue
						}
						z(x, y.k[x])
					}
				}
				y.k = t
			}
			if (!w) {
				if (y.bWK) {
					y.b = "\\b(" + u.join("|") + ")\\s"
				}
				y.bR = h(A, y.b ? y.b : "\\B|\\b");
				if (!y.e && !y.eW) {
					y.e = "\\B|\\b"
				}
				if (y.e) {
					y.eR = h(A, y.e)
				}
			}
			if (y.i) {
				y.iR = h(A, y.i)
			}
			if (y.r === undefined) {
				y.r = 1
			}
			if (!y.c) {
				y.c = []
			}
			y.compiled = true;
			for ( var v = 0; v < y.c.length; v++) {
				if (y.c[v] == "self") {
					y.c[v] = y
				}
				s(y.c[v], A, false)
			}
			if (y.starts) {
				s(y.starts, A, false)
			}
		}
		s(g[r].dM, g[r], true)
	}
	var b = {};
	function f(F, G) {
		if (!b[F]) {
			l(F);
			b[F] = true
		}
		function u(r, Q) {
			for ( var P = 0; P < Q.c.length; P++) {
				var O = Q.c[P].bR.exec(r);
				if (O && O.index == 0) {
					return Q.c[P]
				}
			}
		}
		function y(O, r) {
			if (s[O].e && s[O].eR.test(r)) {
				return 1
			}
			if (s[O].eW) {
				var P = y(O - 1, r);
				return P ? P + 1 : 0
			}
			return 0
		}
		function z(r, O) {
			return O.i && O.iR.test(r)
		}
		function N(Q, R) {
			var P = [];
			for ( var O = 0; O < Q.c.length; O++) {
				P.push(Q.c[O].b)
			}
			var r = s.length - 1;
			do {
				if (s[r].e) {
					P.push(s[r].e)
				}
				r--
			} while (s[r + 1].eW);
			if (Q.i) {
				P.push(Q.i)
			}
			return P.length ? h(R, P.join("|"), true) : null
		}
		function t(P, O) {
			var Q = s[s.length - 1];
			if (Q.t === undefined) {
				Q.t = N(Q, H)
			}
			var r;
			if (Q.t) {
				Q.t.lastIndex = O;
				r = Q.t.exec(P)
			}
			return r ? [ P.substr(O, r.index - O), r[0], false ] : [
					P.substr(O), "", true ]
		}
		function C(Q, r) {
			var O = H.cI ? r[0].toLowerCase() : r[0];
			var P = Q.k[O];
			if (P && P instanceof Array) {
				return P
			}
			return false
		}
		function I(O, S) {
			O = o(O);
			if (!S.k) {
				return O
			}
			var r = "";
			var R = 0;
			S.lR.lastIndex = 0;
			var P = S.lR.exec(O);
			while (P) {
				r += O.substr(R, P.index - R);
				var Q = C(S, P);
				if (Q) {
					A += Q[1];
					r += '<span class="' + Q[0] + '">' + P[0] + "</span>"
				} else {
					r += P[0]
				}
				R = S.lR.lastIndex;
				P = S.lR.exec(O)
			}
			return r + O.substr(R)
		}
		function D(O, P) {
			var r;
			if (P.sL == "") {
				r = i(O)
			} else {
				r = f(P.sL, O)
			}
			if (P.r > 0) {
				A += r.keyword_count;
				E += r.r
			}
			return '<span class="' + r.language + '">' + r.value + "</span>"
		}
		function M(r, O) {
			if (O.sL && g[O.sL] || O.sL == "") {
				return D(r, O)
			} else {
				return I(r, O)
			}
		}
		function L(P, r) {
			var O = P.cN ? '<span class="' + P.cN + '">' : "";
			if (P.rB) {
				B += O;
				P.buffer = ""
			} else {
				if (P.eB) {
					B += o(r) + O;
					P.buffer = ""
				} else {
					B += O;
					P.buffer = r
				}
			}
			s.push(P);
			E += P.r
		}
		function J(Q, P, T) {
			var U = s[s.length - 1];
			if (T) {
				B += M(U.buffer + Q, U);
				return false
			}
			var S = u(P, U);
			if (S) {
				B += M(U.buffer + Q, U);
				L(S, P);
				return S.rB
			}
			var O = y(s.length - 1, P);
			if (O) {
				var R = U.cN ? "</span>" : "";
				if (U.rE) {
					B += M(U.buffer + Q, U) + R
				} else {
					if (U.eE) {
						B += M(U.buffer + Q, U) + R + o(P)
					} else {
						B += M(U.buffer + Q + P, U) + R
					}
				}
				while (O > 1) {
					R = s[s.length - 2].cN ? "</span>" : "";
					B += R;
					O--;
					s.length--
				}
				var r = s[s.length - 1];
				s.length--;
				s[s.length - 1].buffer = "";
				if (r.starts) {
					L(r.starts, "")
				}
				return U.rE
			}
			if (z(P, U)) {
				throw "Illegal"
			}
		}
		var H = g[F];
		var s = [ H.dM ];
		var E = 0;
		var A = 0;
		var B = "";
		try {
			var v, x = 0;
			H.dM.buffer = "";
			do {
				v = t(G, x);
				var w = J(v[0], v[1], v[2]);
				x += v[0].length;
				if (!w) {
					x += v[1].length
				}
			} while (!v[2]);
			return {
				r : E,
				keyword_count : A,
				value : B,
				language : F
			}
		} catch (K) {
			if (K == "Illegal") {
				return {
					r : 0,
					keyword_count : 0,
					value : o(G)
				}
			} else {
				throw K
			}
		}
	}
	function i(v) {
		var r = {
			keyword_count : 0,
			r : 0,
			value : o(v)
		};
		var t = r;
		for ( var s in g) {
			if (!g.hasOwnProperty(s)) {
				continue
			}
			var u = f(s, v);
			u.language = s;
			if (u.keyword_count + u.r > t.keyword_count + t.r) {
				t = u
			}
			if (u.keyword_count + u.r > r.keyword_count + r.r) {
				t = r;
				r = u
			}
		}
		if (t.language) {
			r.second_best = t
		}
		return r
	}
	function k(t, s, r) {
		if (s) {
			t = t.replace(/^((<[^>]+>|\t)+)/gm, function(u, x, w, v) {
				return x.replace(/\t/g, s)
			})
		}
		if (r) {
			t = t.replace(/\n/g, "<br>")
		}
		return t
	}
	function p(v, y, t) {
		var z = j(v, t);
		var x = a(v);
		var A, u;
		if (x == "no-highlight") {
			return
		}
		if (x) {
			A = f(x, z)
		} else {
			A = i(z);
			x = A.language
		}
		var s = e(v);
		if (s.length) {
			u = document.createElement("pre");
			u.innerHTML = A.value;
			A.value = m(s, e(u), z)
		}
		A.value = k(A.value, y, t);
		var w = v.className;
		if (!w.match("(\\s|^)(language-)?" + x + "(\\s|$)")) {
			w = w ? (w + " " + x) : x
		}
		if (c && v.tagName == "CODE" && v.parentNode.tagName == "PRE") {
			u = v.parentNode;
			var r = document.createElement("div");
			r.innerHTML = "<pre><code>" + A.value + "</code></pre>";
			v = r.firstChild.firstChild;
			r.firstChild.cN = u.cN;
			u.parentNode.replaceChild(r.firstChild, u)
		} else {
			v.innerHTML = A.value
		}
		v.className = w;
		v.result = {
			language : x,
			kw : A.keyword_count,
			re : A.r
		};
		if (A.second_best) {
			v.second_best = {
				language : A.second_best.language,
				kw : A.second_best.keyword_count,
				re : A.second_best.r
			}
		}
	}
	function q() {
		if (q.called) {
			return
		}
		q.called = true;
		var t = document.getElementsByTagName("pre");
		for ( var r = 0; r < t.length; r++) {
			var s = d(t[r]);
			if (s) {
				p(s, hljs.tabReplace)
			}
		}
	}
	function n() {
		if (window.addEventListener) {
			window.addEventListener("DOMContentLoaded", q, false);
			window.addEventListener("load", q, false)
		} else {
			if (window.attachEvent) {
				window.attachEvent("onload", q)
			} else {
				window.onload = q
			}
		}
	}
	var g = {};
	this.LANGUAGES = g;
	this.highlight = f;
	this.highlightAuto = i;
	this.fixMarkup = k;
	this.highlightBlock = p;
	this.initHighlighting = q;
	this.initHighlightingOnLoad = n;
	this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
	this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
	this.NR = "\\b\\d+(\\.\\d+)?";
	this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
	this.BNR = "\\b(0b[01]+)";
	this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
	this.BE = {
		b : "\\\\[\\s\\S]",
		r : 0
	};
	this.ASM = {
		cN : "string",
		b : "'",
		e : "'",
		i : "\\n",
		c : [ this.BE ],
		r : 0
	};
	this.QSM = {
		cN : "string",
		b : '"',
		e : '"',
		i : "\\n",
		c : [ this.BE ],
		r : 0
	};
	this.CLCM = {
		cN : "comment",
		b : "//",
		e : "$"
	};
	this.CBLCLM = {
		cN : "comment",
		b : "/\\*",
		e : "\\*/"
	};
	this.HCM = {
		cN : "comment",
		b : "#",
		e : "$"
	};
	this.NM = {
		cN : "number",
		b : this.NR,
		r : 0
	};
	this.CNM = {
		cN : "number",
		b : this.CNR,
		r : 0
	};
	this.BNM = {
		cN : "number",
		b : this.BNR,
		r : 0
	};
	this.inherit = function(t, u) {
		var r = {};
		for ( var s in t) {
			r[s] = t[s]
		}
		if (u) {
			for ( var s in u) {
				r[s] = u[s]
			}
		}
		return r
	}
}();
hljs.LANGUAGES.javascript = function(a) {
	return {
		dM : {
			k : {
				keyword : "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield",
				literal : "true false null undefined NaN Infinity"
			},
			c : [ a.ASM, a.QSM, a.CLCM, a.CBLCLM, a.CNM, {
				b : "(" + a.RSR + "|\\b(case|return|throw)\\b)\\s*",
				k : "return throw case",
				c : [ a.CLCM, a.CBLCLM, {
					cN : "regexp",
					b : "/",
					e : "/[gim]*",
					c : [ {
						b : "\\\\/"
					} ]
				} ],
				r : 0
			}, {
				cN : "function",
				bWK : true,
				e : "{",
				k : "function",
				c : [ {
					cN : "title",
					b : "[A-Za-z$_][0-9A-Za-z$_]*"
				}, {
					cN : "params",
					b : "\\(",
					e : "\\)",
					c : [ a.CLCM, a.CBLCLM ],
					i : "[\"'\\(]"
				} ],
				i : "\\[|%"
			} ]
		}
	}
}(hljs);