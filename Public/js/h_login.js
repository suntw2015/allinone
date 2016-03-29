function pluginBegin() {
    if (!$.sso_loadComplete) try {
        $.checkNPPlugin()
    } catch(t) {}
    $.sso_loadComplete = !0,
    $.report.setSpeedPoint($.plugin_isd_flag, 1, (new Date).getTime()),
    window.setTimeout(function() {
        $.report.isdSpeed($.plugin_isd_flag, .01)
    },
    2e3),
    window.console
}
function ptui_auth_CB(t, e) {
    switch (window.clearTimeout(pt.preload.auth_timeout), parseInt(t)) {
    case 0:
        {
            document.forms[0].u1.value
        }
        pt.preload.init(e);
        break;
    case 1:
        pt.preload.init();
        break;
    case 2:
        pt.ptui.s_url = encodeURIComponent(document.forms[0].u1.value);
        var i = e + "&regmaster=" + pt.ptui.regmaster + "&aid=" + pt.ptui.appid + "&s_url=" + pt.ptui.s_url;
        switch ("1" == pt.ptui.pt_light && (i += "&pt_light=1"), pt.ptui.target) {
        case "_self":
            location.href = i;
            break;
        case "_top":
            top.location.href = i;
            break;
        case "_parent":
            parent.location.href = i;
            break;
        default:
            top.location.href = i
        }
        break;
    default:
        pt.preload.init()
    }
}
function ptuiCB(t, e, i, n, o) {
    function r() {
        try {
            var t = $.cookie.get("uin"),
            e = $.localData.get("nocookieTime") ? $.localData.get("nocookieTime") : 0;
            if (e = parseInt(e), t) $.localData.set("nocookieTime", 0),
            $.report.monitor("269926", .05);
            else if (navigator.cookieEnabled) switch (e += 1, $.localData.set("nocookieTime", e), e) {
            case 1:
                $.report.monitor("269923");
                break;
            case 2:
                $.report.monitor("269924");
                break;
            default:
                $.report.monitor("269925")
            } else $.report.monitor("273080")
        } catch(i) {}
    }
    function a() {
        switch (n) {
        case "0":
            pt.login.is_mibao(i) && (i += "#login_param=" + encodeURIComponent(pt.login.login_param)),
            window.location.href = i;
            break;
        case "1":
            r(),
            top.location.href = i;
            break;
        case "2":
            parent.location.href = i;
            break;
        default:
            top.location.href = i
        }
    }
    clearTimeout(pt.login.loginClock),
    g_time.time13 = new Date;
    var s = g_time.time13 - g_time.time12,
    p = 0;
    switch (0 > s || (3e3 >= s ? p = 11 : 5e3 >= s && (p = 12)), p > 0 && pt.login.loginResultReport(p), pt.login.hideLoading(), pt.login.lastCheckAccout = "", pt.login.hasSubmit = !0, t) {
    case "0":
        if (pt.login.isQrLogin && !pt.login.is_mibao(i) && window.clearInterval(pt.login.qrlogin_clock), pt.preload.hasReportAuth) {
            var l = window.setTimeout(function() {
                $.report.monitor("361944"),
                a()
            },
            3e3);
            g_pt_auth_report_img = new Image;
            var c = "https:" == location.protocol ? "https://ssl.qq.com/ptlogin/cgi-bin/ptlogin_report?": "http://log.wtlogin.qq.com/cgi-bin/ptlogin_report?",
            u = window.g_superuin,
            g = $.cookie.get("uin").replace(/^o0*/, ""),
            h = 3,
            d = pt.ptui.appid,
            m = document.forms[0].u1.value,
            f = encodeURIComponent("auth_statistics:|" + h + "|" + d + "|" + u + "|" + g + "|" + m + "|" + window.navigator.userAgent);
            c += "msg=" + f + "&v=" + Math.random(),
            g_pt_auth_report_img.onload = g_pt_auth_report_img.onerror = function() {
                g_pt_auth_report_img.onload = g_pt_auth_report_img.onerror = null,
                window.clearTimeout(l),
                a()
            },
            g_pt_auth_report_img.src = c
        } else a();
        break;
    case "3":
        $("p").value = "",
        pt.login.domFocus($("p")),
        pt.login.passwordErrorNum++,
        ("101" == e || "102" == e || "103" == e) && pt.login.showVC(),
        pt.login.check();
        break;
    case "4":
        pt.login.vcFlag ? pt.login.changeVC() : pt.login.showVC();
        try {
            $("verifycode").focus(),
            $("verifycode").select()
        } catch(_) {}
        break;
    case "65":
        return void pt.login.switch_qrlogin();
    case "66":
        return;
    case "67":
        return void pt.login.go_qrlogin_step(2);
    case "10005":
        pt.login.force_qrlogin();
        break;
    default:
        pt.login.needVc ? pt.login.changeVC() : pt.login.check()
    }
    "10005" == t || "12" == t || "51" == t ? (o += pt.login.aqScanLink, pt.login.show_err(o, !0)) : pt.login.isQrLogin || 0 == t || pt.login.show_err(o),
    pt.login.hasCheck || pt.login.isQrLogin || (pt.login.showVC(), $("verifycode").focus(), $("verifycode").select())
}
function ptui_checkVC(t, e, i, n, o) {
    switch (clearTimeout(pt.login.checkClock), pt.login.isRandSalt = o, pt.login.salt = i, pt.login.checkRet = t, "2" == t ? pt.login.show_err(pt.str.inv_uin) : "3" == t || pt.login.hasSubmit || pt.login.hide_err(), t + "") {
    case "0":
    case "2":
    case "3":
        pt.login.hideVC(),
        $("verifycode").value = e || "abcd",
        pt.login.needVc = !1,
        $.report.monitor("330321", .05);
        break;
    case "1":
        pt.login.cap_cd = e,
        pt.login.showVC(),
        $.css.show($("vc_tips")),
        pt.login.needVc = !0,
        $.report.monitor("330320", .05)
    }
    pt.login.pt_verifysession = n,
    pt.login.domFocus($("p")),
    pt.login.hasCheck = !0,
    pt.login.checkTime = (new Date).getTime(),
    g_time.time7 = new Date;
    var r = g_time.time7 - g_time.time6,
    a = 0;
    0 > r || (a = 3e3 >= r ? 11 : 5e3 >= r ? 12 : 13, pt.login.checkResultReport(a))
}
var $ = window.Simple = function(t) {
    return "string" == typeof t ? document.getElementById(t) : t
};
$.cookie = {
    get: function(t) {
        var e = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
        return e ? decodeURIComponent(e[2]) : ""
    },
    getOrigin: function(t) {
        var e = document.cookie.match(new RegExp("(^| )" + t + "=([^;]*)(;|$)"));
        return e ? e[2] : ""
    },
    set: function(t, e, i, n, o) {
        var r = new Date;
        o ? (r.setTime(r.getTime() + 36e5 * o), document.cookie = t + "=" + e + "; expires=" + r.toGMTString() + "; path=" + (n ? n: "/") + "; " + (i ? "domain=" + i + ";": "")) : document.cookie = t + "=" + e + "; path=" + (n ? n: "/") + "; " + (i ? "domain=" + i + ";": "")
    },
    del: function(t, e, i) {
        document.cookie = t + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (i ? i: "/") + "; " + (e ? "domain=" + e + ";": "")
    },
    uin: function() {
        var t = $.cookie.get("uin");
        return t ? parseInt(t.substring(1, t.length), 10) : null
    }
},
$.http = {
    getXHR: function() {
        return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest
    },
    ajax: function(url, para, cb, method, type) {
        var xhr = $.http.getXHR();
        return xhr.open(method, url),
        xhr.onreadystatechange = function() {
            4 == xhr.readyState && (xhr.status >= 200 && xhr.status < 300 || 304 === xhr.status || 1223 === xhr.status || 0 === xhr.status ? "undefined" == typeof type && xhr.responseText ? cb(eval("(" + xhr.responseText + ")")) : (cb(xhr.responseText), !xhr.responseText && $.badjs._smid && $.badjs("HTTP Empty[xhr.status]:" + xhr.status, url, 0, $.badjs._smid)) : $.badjs._smid && $.badjs("HTTP Error[xhr.status]:" + xhr.status, url, 0, $.badjs._smid), xhr = null)
        },
        xhr.send(para),
        xhr
    },
    post: function(t, e, i, n) {
        var o = "";
        for (var r in e) o += "&" + r + "=" + e[r];
        return $.http.ajax(t, o, i, "POST", n)
    },
    get: function(t, e, i, n) {
        var o = [];
        for (var r in e) o.push(r + "=" + e[r]);
        return - 1 == t.indexOf("?") && (t += "?"),
        t += o.join("&"),
        $.http.ajax(t, null, i, "GET", n)
    },
    jsonp: function(t) {
        var e = document.createElement("script");
        e.src = t,
        document.getElementsByTagName("head")[0].appendChild(e)
    },
    loadScript: function(t, e) {
        var i = document.createElement("script");
        i.onload = i.onreadystatechange = function() {
            this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || ("function" == typeof e && e(), i.onload = i.onreadystatechange = null, i.parentNode && i.parentNode.removeChild(i))
        },
        i.src = t,
        document.getElementsByTagName("head")[0].appendChild(i)
    },
    preload: function(t) {
        var e = document.createElement("img");
        e.src = t,
        e = null
    }
},
$.get = $.http.get,
$.post = $.http.post,
$.jsonp = $.http.jsonp,
$.browser = function(t) {
    if ("undefined" == typeof $.browser.info) {
        var e = {
            type: ""
        },
        i = navigator.userAgent.toLowerCase();
        /chrome/.test(i) ? e = {
            type: "chrome",
            version: /chrome[\/ ]([\w.]+)/
        }: /opera/.test(i) ? e = {
            type: "opera",
            version: /version/.test(i) ? /version[\/ ]([\w.]+)/: /opera[\/ ]([\w.]+)/
        }: /msie/.test(i) ? e = {
            type: "msie",
            version: /msie ([\w.]+)/
        }: /mozilla/.test(i) && !/compatible/.test(i) ? e = {
            type: "ff",
            version: /rv:([\w.]+)/
        }: /safari/.test(i) && (e = {
            type: "safari",
            version: /safari[\/ ]([\w.]+)/
        }),
        e.version = (e.version && e.version.exec(i) || [0, "0"])[1],
        $.browser.info = e
    }
    return $.browser.info[t]
},
$.e = {
    _counter: 0,
    _uid: function() {
        return "h" + $.e._counter++
    },
    add: function(t, e, i) {
        if ("object" != typeof t && (t = $(t)), document.addEventListener) t.addEventListener(e, i, !1);
        else if (document.attachEvent) {
            if ( - 1 != $.e._find(t, e, i)) return;
            var n = function(e) {
                e || (e = window.event);
                var n = {
                    _event: e,
                    type: e.type,
                    target: e.srcElement,
                    currentTarget: t,
                    relatedTarget: e.fromElement ? e.fromElement: e.toElement,
                    eventPhase: e.srcElement == t ? 2 : 3,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    screenX: e.screenX,
                    screenY: e.screenY,
                    altKey: e.altKey,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    keyCode: e.keyCode,
                    data: e.data,
                    origin: e.origin,
                    stopPropagation: function() {
                        this._event.cancelBubble = !0
                    },
                    preventDefault: function() {
                        this._event.returnValue = !1
                    }
                };
                Function.prototype.call ? i.call(t, n) : (t._currentHandler = i, t._currentHandler(n), t._currentHandler = null)
            };
            t.attachEvent("on" + e, n);
            var o = {
                element: t,
                eventType: e,
                handler: i,
                wrappedHandler: n
            },
            r = t.document || t,
            a = r.parentWindow,
            s = $.e._uid();
            a._allHandlers || (a._allHandlers = {}),
            a._allHandlers[s] = o,
            t._handlers || (t._handlers = []),
            t._handlers.push(s),
            a._onunloadHandlerRegistered || (a._onunloadHandlerRegistered = !0, a.attachEvent("onunload", $.e._removeAllHandlers))
        }
    },
    remove: function(t, e, i) {
        if (document.addEventListener) t.removeEventListener(e, i, !1);
        else if (document.attachEvent) {
            var n = $.e._find(t, e, i);
            if ( - 1 == n) return;
            var o = t.document || t,
            r = o.parentWindow,
            a = t._handlers[n],
            s = r._allHandlers[a];
            t.detachEvent("on" + e, s.wrappedHandler),
            t._handlers.splice(n, 1),
            delete r._allHandlers[a]
        }
    },
    _find: function(t, e, i) {
        var n = t._handlers;
        if (!n) return - 1;
        for (var o = t.document || t,
        r = o.parentWindow,
        a = n.length - 1; a >= 0; a--) {
            var s = n[a],
            p = r._allHandlers[s];
            if (p.eventType == e && p.handler == i) return a
        }
        return - 1
    },
    _removeAllHandlers: function() {
        var t = this;
        for (id in t._allHandlers) {
            var e = t._allHandlers[id];
            e.element.detachEvent("on" + e.eventType, e.wrappedHandler),
            delete t._allHandlers[id]
        }
    },
    src: function(t) {
        return t ? t.target: event.srcElement
    },
    stopPropagation: function(t) {
        t ? t.stopPropagation() : event.cancelBubble = !0
    },
    trigger: function(t, e) {
        var i = {
            HTMLEvents: "abort,blur,change,error,focus,load,reset,resize,scroll,select,submit,unload",
            UIEevents: "keydown,keypress,keyup",
            MouseEvents: "click,mousedown,mousemove,mouseout,mouseover,mouseup"
        };
        if (document.createEvent) {
            var n = "";
            "mouseleave" == e && (e = "mouseout"),
            "mouseenter" == e && (e = "mouseover");
            for (var o in i) if (i[o].indexOf(e)) {
                n = o;
                break
            }
            var r = document.createEvent(n);
            r.initEvent(e, !0, !1),
            t.dispatchEvent(r)
        } else document.createEventObject && t.fireEvent("on" + e)
    }
},
$.bom = {
    query: function(t) {
        var e = window.location.search.match(new RegExp("(\\?|&)" + t + "=([^&]*)(&|$)"));
        return e ? decodeURIComponent(e[2]) : ""
    },
    getHash: function(t) {
        var e = window.location.hash.match(new RegExp("(#|&)" + t + "=([^&]*)(&|$)"));
        return e ? decodeURIComponent(e[2]) : ""
    }
},
$.winName = {
    set: function(t, e) {
        var i = window.name || "";
        window.name = i.match(new RegExp(";" + t + "=([^;]*)(;|$)")) ? i.replace(new RegExp(";" + t + "=([^;]*)"), ";" + t + "=" + e) : i + ";" + t + "=" + e
    },
    get: function(t) {
        var e = window.name || "",
        i = e.match(new RegExp(";" + t + "=([^;]*)(;|$)"));
        return i ? i[1] : ""
    },
    clear: function(t) {
        var e = window.name || "";
        window.name = e.replace(new RegExp(";" + t + "=([^;]*)"), "")
    }
},
$.localData = function() {
    function t() {
        var t = document.createElement("link");
        return t.style.display = "none",
        t.id = o,
        document.getElementsByTagName("head")[0].appendChild(t),
        t.addBehavior("#default#userdata"),
        t
    }
    function e() {
        if ("undefined" == typeof n) if (window.localStorage) n = localStorage;
        else try {
            n = t(),
            n.load(o)
        } catch(e) {
            return n = !1,
            !1
        }
        return ! 0
    }
    function i(t) {
        return "string" != typeof t ? !1 : r.test(t)
    }
    var n, o = "ptlogin2.qq.com",
    r = /^[0-9A-Za-z_-]*$/;
    return {
        set: function(t, r) {
            var a = !1;
            if (i(t) && e()) try {
                r += "",
                window.localStorage ? (n.setItem(t, r), a = !0) : (n.setAttribute(t, r), n.save(o), a = n.getAttribute(t) === r)
            } catch(s) {}
            return a
        },
        get: function(t) {
            if (i(t) && e()) try {
                return window.localStorage ? n.getItem(t) : n.getAttribute(t)
            } catch(o) {}
            return null
        },
        remove: function(t) {
            if (i(t) && e()) try {
                return window.localStorage ? n.removeItem(t) : n.removeAttribute(t),
                !0
            } catch(o) {}
            return ! 1
        }
    }
} (),
$.str = function() {
    var htmlDecodeDict = {
        quot: '"',
        lt: "<",
        gt: ">",
        amp: "&",
        nbsp: " ",
        "#34": '"',
        "#60": "<",
        "#62": ">",
        "#38": "&",
        "#160": " "
    },
    htmlEncodeDict = {
        '"': "#34",
        "<": "#60",
        ">": "#62",
        "&": "#38",
        " ": "#160"
    };
    return {
        decodeHtml: function(t) {
            return t += "",
            t.replace(/&(quot|lt|gt|amp|nbsp);/gi,
            function(t, e) {
                return htmlDecodeDict[e]
            }).replace(/&#u([a-f\d]{4});/gi,
            function(t, e) {
                return String.fromCharCode(parseInt("0x" + e))
            }).replace(/&#(\d+);/gi,
            function(t, e) {
                return String.fromCharCode( + e)
            })
        },
        encodeHtml: function(t) {
            return t += "",
            t.replace(/["<>& ]/g,
            function(t) {
                return "&" + htmlEncodeDict[t] + ";"
            })
        },
        trim: function(t) {
            t += "";
            for (var t = t.replace(/^\s+/, ""), e = /\s/, i = t.length; e.test(t.charAt(--i)););
            return t.slice(0, i + 1)
        },
        uin2hex: function(str) {
            var maxLength = 16;
            str = parseInt(str);
            for (var hex = str.toString(16), len = hex.length, i = len; maxLength > i; i++) hex = "0" + hex;
            for (var arr = [], j = 0; maxLength > j; j += 2) arr.push("\\x" + hex.substr(j, 2));
            var result = arr.join("");
            return eval('result="' + result + '"'),
            result
        },
        bin2String: function(t) {
            for (var e = [], i = 0, n = t.length; n > i; i++) {
                var o = t.charCodeAt(i).toString(16);
                1 == o.length && (o = "0" + o),
                e.push(o)
            }
            return e = "0x" + e.join(""),
            e = parseInt(e, 16)
        },
        utf8ToUincode: function(t) {
            var e = "";
            try {
                var n = t.length,
                o = [];
                for (i = 0; i < n; i += 2) o.push("%" + t.substr(i, 2));
                e = decodeURIComponent(o.join("")),
                e = $.str.decodeHtml(e)
            } catch(r) {
                e = ""
            }
            return e
        },
        json2str: function(t) {
            var e = "";
            if ("undefined" != typeof JSON) e = JSON.stringify(t);
            else {
                var i = [];
                for (var n in t) i.push("'" + n + "':'" + t[n] + "'");
                e = "{" + i.join(",") + "}"
            }
            return e
        },
        time33: function(t) {
            for (var e = 0,
            i = 0,
            n = t.length; n > i; i++) e = 33 * e + t.charCodeAt(i);
            return e % 4294967296
        }
    }
} (),
$.css = function() {
    return {
        getWidth: function(t) {
            return $(t).offsetWidth
        },
        getHeight: function(t) {
            return $(t).offsetHeight
        },
        show: function(t) {
            t.style.display = "block"
        },
        hide: function(t) {
            t.style.display = "none"
        },
        hasClass: function(t, e) {
            if (!t.className) return ! 1;
            for (var i = t.className.split(" "), n = 0, o = i.length; o > n; n++) if (e == i[n]) return ! 0;
            return ! 1
        },
        addClass: function(t, e) {
            $.css.updateClass(t, e, !1)
        },
        removeClass: function(t, e) {
            $.css.updateClass(t, !1, e)
        },
        updateClass: function(t, e, i) {
            for (var n = t.className.split(" "), o = {},
            r = 0, a = n.length; a > r; r++) n[r] && (o[n[r]] = !0);
            if (e) {
                var s = e.split(" ");
                for (r = 0, a = s.length; a > r; r++) s[r] && (o[s[r]] = !0)
            }
            if (i) {
                var p = i.split(" ");
                for (r = 0, a = p.length; a > r; r++) p[r] && delete o[p[r]]
            }
            var l = [];
            for (var c in o) l.push(c);
            t.className = l.join(" ")
        },
        setClass: function(t, e) {
            t.className = e
        }
    }
} (),
$.animate = {
    fade: function(t, e, i, n, o) {
        if (t = $(t)) {
            t.effect || (t.effect = {});
            var r = Object.prototype.toString.call(e),
            a = 100;
            isNaN(e) ? "[object Object]" == r && e && e.to && (isNaN(e.to) || (a = e.to), isNaN(e.from) || (t.style.opacity = e.from / 100, t.style.filter = "alpha(opacity=" + e.from + ")")) : a = e,
            "undefined" == typeof t.effect.fade && (t.effect.fade = 0),
            window.clearInterval(t.effect.fade);
            var i = i || 1,
            n = n || 20,
            s = window.navigator.userAgent.toLowerCase(),
            p = function(t) {
                var e;
                if ( - 1 != s.indexOf("msie")) {
                    var i = (t.currentStyle || {}).filter || "";
                    e = i.indexOf("opacity") >= 0 ? parseFloat(i.match(/opacity=([^)]*)/)[1]) + "": "100"
                } else {
                    var n = t.ownerDocument.defaultView;
                    n = n && n.getComputedStyle,
                    e = 100 * (n && n(t, null).opacity || 1)
                }
                return parseFloat(e)
            },
            l = p(t),
            c = a > l ? 1 : -1; - 1 != s.indexOf("msie") && 15 > n && (i = Math.floor(15 * i / n), n = 15);
            var u = function() {
                l += i * c,
                (Math.round(l) - a) * c >= 0 ? (t.style.opacity = a / 100, t.style.filter = "alpha(opacity=" + a + ")", window.clearInterval(t.effect.fade), "function" == typeof o && o(t)) : (t.style.opacity = l / 100, t.style.filter = "alpha(opacity=" + l + ")")
            };
            t.effect.fade = window.setInterval(u, n)
        }
    },
    animate: function(t, e, i, n, o) {
        if (t = $(t)) {
            t.effect || (t.effect = {}),
            "undefined" == typeof t.effect.animate && (t.effect.animate = 0);
            for (var r in e) e[r] = parseInt(e[r]) || 0;
            window.clearInterval(t.effect.animate);
            var i = i || 10,
            n = n || 20,
            a = function(t) {
                var e = {
                    left: t.offsetLeft,
                    top: t.offsetTop
                };
                return e
            },
            s = a(t),
            p = {
                width: t.clientWidth,
                height: t.clientHeight,
                left: s.left,
                top: s.top
            },
            l = [],
            c = window.navigator.userAgent.toLowerCase();
            if ( - 1 == c.indexOf("msie") || "BackCompat" != document.compatMode) {
                var u = document.defaultView ? document.defaultView.getComputedStyle(t, null) : t.currentStyle,
                g = e.width || 0 == e.width ? parseInt(e.width) : null,
                h = e.height || 0 == e.height ? parseInt(e.height) : null;
                "number" == typeof g && (l.push("width"), e.width = g - u.paddingLeft.replace(/\D/g, "") - u.paddingRight.replace(/\D/g, "")),
                "number" == typeof h && (l.push("height"), e.height = h - u.paddingTop.replace(/\D/g, "") - u.paddingBottom.replace(/\D/g, "")),
                15 > n && (i = Math.floor(15 * i / n), n = 15)
            }
            var d = e.left || 0 == e.left ? parseInt(e.left) : null,
            m = e.top || 0 == e.top ? parseInt(e.top) : null;
            "number" == typeof d && (l.push("left"), t.style.position = "absolute"),
            "number" == typeof m && (l.push("top"), t.style.position = "absolute");
            for (var f = [], _ = l.length, r = 0; _ > r; r++) f[l[r]] = p[l[r]] < e[l[r]] ? 1 : -1;
            var v = t.style,
            w = function() {
                for (var n = !0,
                r = 0; _ > r; r++) p[l[r]] = p[l[r]] + f[l[r]] * Math.abs(e[l[r]] - p[l[r]]) * i / 100,
                (Math.round(p[l[r]]) - e[l[r]]) * f[l[r]] >= 0 ? (n = n && !0, v[l[r]] = e[l[r]] + "px") : (n = n && !1, v[l[r]] = p[l[r]] + "px");
                n && (window.clearInterval(t.effect.animate), "function" == typeof o && o(t))
            };
            t.effect.animate = window.setInterval(w, n)
        }
    }
},
$.check = {
    isHttps: function() {
        return "https:" == document.location.protocol
    },
    isSsl: function() {
        var t = document.location.host;
        return /^ssl./i.test(t)
    },
    isIpad: function() {
        var t = navigator.userAgent.toLowerCase();
        return /ipad/i.test(t)
    },
    isQQ: function(t) {
        return /^[1-9]{1}\d{4,9}$/.test(t)
    },
    isQQMail: function(t) {
        return /^[1-9]{1}\d{4,9}@qq\.com$/.test(t)
    },
    isNullQQ: function(t) {
        return /^\d{1,4}$/.test(t)
    },
    isNick: function(t) {
        return /^[a-zA-Z]{1}([a-zA-Z0-9]|[-_]){0,19}$/.test(t)
    },
    isName: function(t) {
        return "<请输入帐号>" == t ? !1 : /[\u4E00-\u9FA5]{1,8}/.test(t)
    },
    isPhone: function(t) {
        return /^(?:86|886|)1\d{10}\s*$/.test(t)
    },
    isDXPhone: function(t) {
        return /^(?:86|886|)1(?:33|53|80|81|89)\d{8}$/.test(t)
    },
    isSeaPhone: function(t) {
        return /^(00)?(?:852|853|886(0)?\d{1})\d{8}$/.test(t)
    },
    isMail: function(t) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(t)
    },
    isPassword: function(t) {
        return t && t.length >= 16
    },
    isForeignPhone: function(t) {
        return /^00\d{7,}/.test(t)
    },
    needVip: function(t) {
        for (var e = ["21001601", "21000110", "21000121", "46000101", "716027609", "716027610", "549000912"], i = !0, n = 0, o = e.length; o > n; n++) if (e[n] == t) {
            i = !1;
            break
        }
        return i
    },
    isPaipai: function() {
        return /paipai.com$/.test(window.location.hostname)
    },
    is_weibo_appid: function(t) {
        return 46000101 == t || 607000101 == t || 558032501 == t ? !0 : !1
    }
},
$.report = {
    monitor: function(t, e) {
        if (! (Math.random() > (e || 1))) {
            var i = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/report?id=" + t;
            $.http.preload(i)
        }
    },
    nlog: function(t, e, i) {
        var n = "https:" == location.protocol ? "https://ssl.qq.com/ptlogin/cgi-bin/ptlogin_report?": "http://log.wtlogin.qq.com/cgi-bin/ptlogin_report?",
        o = encodeURIComponent(t + "|_|" + location.href + "|_|" + window.navigator.userAgent);
        e = e ? e: 0,
        i && (n += "u=" + i + "&"),
        n += "id=" + e + "&msg=" + o + "&v=" + Math.random(),
        $.http.preload(n)
    },
    isdSpeed: function(t, e) {
        var i = !1,
        n = "http://isdspeed.qq.com/cgi-bin/r.cgi?";
        if ($.check.isHttps() && (n = "https://login.qq.com/cgi-bin/r.cgi?"), n += t, Math.random() < (e || 1)) {
            var o = $.report.getSpeedPoints(t);
            for (var r in o) o[r] && o[r] < 3e4 && (n += "&" + r + "=" + o[r], i = !0);
            n += "&v=" + Math.random(),
            i && $.http.preload(n)
        }
        $.report.setSpeedPoint(t)
    },
    speedPoints: {},
    basePoint: {},
    setBasePoint: function(t, e) {
        $.report.basePoint[t] = e
    },
    setSpeedPoint: function(t, e, i) {
        e ? ($.report.speedPoints[t] || ($.report.speedPoints[t] = {}), $.report.speedPoints[t][e] = i - $.report.basePoint[t]) : $.report.speedPoints[t] = {}
    },
    setSpeedPoints: function(t, e) {
        $.report.speedPoints[t] = e
    },
    getSpeedPoints: function(t) {
        return $.report.speedPoints[t]
    }
},
$.sso_ver = 0,
$.sso_state = 0,
$.plugin_isd_flag = "",
$.nptxsso = null,
$.sso_loadComplete = !0,
$.np_clock = 0,
$.loginQQnum = 0,
$.suportActive = function() {
    var t = !0;
    try {
        window.ActiveXObject || window.ActiveXObject.prototype ? (t = !0, window.ActiveXObject.prototype && !window.ActiveXObject && $.report.nlog("activeobject 判断有问题")) : t = !1
    } catch(e) {
        t = !1
    }
    return t
},
$.getLoginQQNum = function() {
    var t = !1;
    try {
        var e = 0;
        if ($.suportActive()) {
            $.plugin_isd_flag = "flag1=7808&flag2=1&flag3=20",
            $.report.setBasePoint($.plugin_isd_flag, new Date);
            var i = new ActiveXObject("SSOAxCtrlForPTLogin.SSOForPTLogin2"),
            n = i.CreateTXSSOData();
            i.InitSSOFPTCtrl(0, n);
            var o = i.CreateTXSSOData(),
            r = i.DoOperation(2, o),
            a = r.GetArray("PTALIST");
            e = a.GetSize();
            try {
                var s = i.QuerySSOInfo(1);
                $.sso_ver = s.GetInt("nSSOVersion")
            } catch(p) {
                $.sso_ver = 0
            }
        } else if (navigator.mimeTypes["application/nptxsso"]) if ($.plugin_isd_flag = "flag1=7808&flag2=1&flag3=21", $.report.setBasePoint($.plugin_isd_flag, (new Date).getTime()), $.nptxsso || ($.nptxsso = document.createElement("embed"), $.nptxsso.type = "application/nptxsso", $.nptxsso.style.width = "0px", $.nptxsso.style.height = "0px", document.body.appendChild($.nptxsso)), "function" != typeof $.nptxsso.InitPVANoST) $.sso_loadComplete = !1,
        $.report.nlog("没有找到插件的InitPVANoST方法", 269929);
        else {
            var l = $.nptxsso.InitPVANoST();
            l && (e = $.nptxsso.GetPVACount(), $.sso_loadComplete = !0);
            try {
                $.sso_ver = $.nptxsso.GetSSOVersion()
            } catch(p) {
                $.sso_ver = 0
            }
        } else $.report.nlog("插件没有注册成功", 263744),
        $.sso_state = 2,
        t = !0
    } catch(p) {
        t = !0;
        var c = null;
        try {
            c = $.http.getXHR()
        } catch(p) {
            return $.report.nlog("获取XHR出错", 361166),
            0
        }
        var u = p.message || p;
        return /^pt_windows_sso/.test(u) ? (/^pt_windows_sso_\d+_3/.test(u) ? $.report.nlog("QQ插件不支持该url" + p.message, 326044) : $.report.nlog("QQ插件抛出内部错误" + p.message, 325361), $.sso_state = 1) : c && "msie" == $.browser("type") ? "Win64" != window.navigator.platform ? ($.report.nlog("可能没有安装QQ" + p.message, 322340), $.sso_state = 2) : $.report.nlog("使用64位IE" + p.message, 343958) : ($.report.nlog("获取登录QQ号码出错" + p.message, 263745), window.ActiveXObject && "Win32" == window.navigator.platform && ($.sso_state = 1)),
        0
    }
    return t || 0 != e || $.report.nlog("用户没有登录QQ", 361167),
    $.loginQQnum = e,
    e
},
$.checkNPPlugin = function() {
    var t = 10;
    window.clearInterval($.np_clock),
    $.np_clock = window.setInterval(function() {
        "function" == typeof $.nptxsso.InitPVANoST || 0 == t ? (window.clearInterval($.np_clock), "function" == typeof $.nptxsso.InitPVANoST && pt.preload.auth()) : (t--, window.console && console.log(t))
    },
    200)
},
$.guanjiaPlugin = null,
$.initGuanjiaPlugin = function() {
    try {
        window.ActiveXObject ? $.guanjiaPlugin = new ActiveXObject("npQMExtensionsIE.Basic") : navigator.mimeTypes["application/qqpcmgr-extensions-mozilla"] && ($.guanjiaPlugin = document.createElement("embed"), $.guanjiaPlugin.type = "application/qqpcmgr-extensions-mozilla", $.guanjiaPlugin.style.width = "0px", $.guanjiaPlugin.style.height = "0px", document.body.appendChild($.guanjiaPlugin));
        var t = $.guanjiaPlugin.QMGetVersion().split(".");
        4 == t.length && t[2] >= 9319 || ($.guanjiaPlugin = null)
    } catch(e) {
        $.guanjiaPlugin = null
    }
},
function() {
    var t = "nohost_guid",
    e = "/nohost_htdocs/js/SwitchHost.js";
    "" != $.cookie.get(t) && $.http.loadScript(e,
    function() {
        var t = window.SwitchHost && window.SwitchHost.init;
        t && t()
    })
} (),
setTimeout(function() {
    var t = "flag1=7808&flag2=1&flag3=9";
    $.report.setBasePoint(t, 0),
    "undefined" != typeof window.postMessage ? $.report.setSpeedPoint(t, 1, 2e3) : $.report.setSpeedPoint(t, 1, 1e3),
    $.report.isdSpeed(t, .01)
},
500);
var g_connectTime = 0,
g_responseStartTime = 0,
g_responseEndTime = 0; !
function() {
    try {
        performance.timing.connectStart && 0 != performance.timing.connectStart && (g_connectTime = performance.timing.connectStart),
        performance.timing.responseStart && 0 != performance.timing.responseStart && (g_responseStartTime = performance.timing.responseStart),
        performance.timing.responseEnd && 0 != performance.timing.responseEnd && (g_responseEndTime = performance.timing.responseEnd)
    } catch(t) {
        g_connectTime = 0,
        g_responseStartTime = 0,
        g_responseEndTime = 0
    }
} (),
g_time.time0 = g_connectTime,
g_time.time1 = g_responseStartTime,
g_time.time2 = g_responseEndTime,
pt.setHeader = function(t) {
    for (var e in t)"" != e && $("auth_face") && ($("auth_face").src = t[e] && t[e].indexOf("sys.getface.qq.com") > -1 ? pt.login.dftImg: t[e])
};
var g_pt_auth_report_img, g_superuin;
pt.crossMessage = function(t) {
    if ("undefined" != typeof window.postMessage) {
        var e = $.str.json2str(t);
        window.parent.postMessage(e, "*")
    } else {
        if (!pt.ptui.proxy_url) return;
        var i = pt.ptui.proxy_url + "#";
        for (var n in t) i += n + "=" + t[n] + "&";
        $("proxy") && ($("proxy").innerHTML = '<iframe src="' + encodeURI(i) + '"></iframe>')
    }
},
pt.preload = function() {
    var t = "",
    e = !1,
    i = 1,
    n = 0,
    o = !1,
    r = "",
    a = !1,
    s = "",
    p = !1,
    l = 0,
    c = function() {
        if ("" != pt.ptui.jumpname) - 1 != pt.ptui.qtarget && (pt.ptui.qtarget = parseInt(pt.ptui.qtarget));
        else switch (pt.ptui.target) {
        case "_self":
            pt.ptui.qtarget = 0;
            break;
        case "_top":
            pt.ptui.qtarget = 1;
            break;
        case "_parent":
            pt.ptui.qtarget = 2;
            break;
        default:
            pt.ptui.qtarget = 1
        }
        pt.ptui.isHttps = $.check.isHttps(),
        pt.ptui.enable_qlogin = "0" != pt.ptui.enable_qlogin && 5 != $.cookie.get("pt_qlogincode"),
        pt.ptui.needVip = $.check.needVip(pt.ptui.appid) ? 1 : 0
    },
    u = function(e) {
        $.css.show($("login"));
        try {
            document.execCommand("BackgroundImageCache", !1, !0)
        } catch(i) {}
        $.cookie.del("ptui_qstatus", "ptlogin2." + pt.ptui.domain, "/"),
        _("login"),
        e && 0 == pt.ptui.auth_mode && (a = !0, s = encodeURIComponent(e)),
        t = pt.ptui.pt_size,
        pt.ptui.enable_qlogin && (n = $.getLoginQQNum(), n += a ? 1 : 0),
        2 == pt.ptui.auth_mode && (n = 0),
        n > 0 ? (o = !0, w(n), $("login").className = "login", $("switch_login").innerHTML = pt.str.h_pt_login, b(!1)) : ($("login").className = "login_no_qlogin", $("switch_login").innerHTML = pt.str.h_other_login, b(!0, !0), _("login"), $("u").value && "function" == typeof pt.login && 0 == pt.ptui.auth_mode && pt.login.check()),
        0 != pt.ptui.auth_mode && e && q(pt.ptui.auth_mode, e)
    },
    g = function() {
        r = (pt.ptui.isHttps ? "https://ssl.": "http://") + "ptlogin2." + pt.ptui.domain + "/pt4_auth?daid=" + pt.ptui.daid + "&appid=" + pt.ptui.appid + "&auth_token=" + $.str.time33($.cookie.get("supertoken"));
        var t = document.forms[0].u1.value;
        /^https/.test(t) && (r += "&pt4_shttps=1"),
        "1" == pt.ptui.pt_qzone_sig && (r += "&pt_qzone_sig=1")
    },
    h = function() {
        c(),
        g();
        var t = $.cookie.get("superuin");
        pt.ptui.daid && "1" != pt.ptui.noAuth && "" != t ? ($.css.hide($("login")), pt.preload.auth_timeout = window.setTimeout(function() {
            pt.preload.init()
        },
        5e3), $.http.loadScript(r), window.g_superuin = t.replace(/^o0*/, "")) : pt.preload.init()
    },
    d = function(t) {
        var e = "flag1=7808&flag2=1&flag3=11";
        pt.ptui.isHttps && (e = $.check.isSsl() ? "flag1=7808&flag2=1&flag3=8": "flag1=7808&flag2=1&flag3=12"),
        $.report.setBasePoint(e, (new Date).getTime());
        var i = document.createElement("link");
        i.setAttribute("type", "text/css"),
        i.setAttribute("rel", "stylesheet"),
        i.setAttribute("href", t),
        document.getElementsByTagName("head")[0].appendChild(i),
        "msie" == $.browser("type") && $.e.add(i, "load", f)
    },
    m = function() {
        if (!p && $("qrswitch")) {
            if ("1" == pt.ptui.isCdn) d(pt.ptui.cdnCssPath + "/h_cdn_qr_login.css?max_age=86400");
            else {
                var t = pt.ptui.cssPath + "/h_qr_login_1.css";
                try {
                    var e = $.localData.get("cssCacheFlag");
                    switch (e || (e = Math.floor(100 * Math.random()), $.localData.set("cssCacheFlag", e)), e + "") {
                    case "1":
                        t += "?v=" + Math.random();
                        break;
                    case "2":
                        t += "?max_age=600";
                        break;
                    case "3":
                        t += "?max_age=86400";
                        break;
                    case "4":
                        t += "?max_age=604800";
                        break;
                    case "5":
                        t += "?max_age=2592000";
                        break;
                    default:
                        t += "?max_age=604800"
                    }
                } catch(i) {}
                pt.ptui.isHttps && (t = $.check.isSsl() ? pt.ptui.cssPath.replace("https://", "https://ssl.") + "/h_qr_login_1.css": pt.ptui.cssPath + "/h_qr_login_1.css"),
                d(t)
            }
            p = !0
        }
    },
    f = function() {
        try {
            var t = $.localData.get("cssCacheFlag"),
            e = "flag1=7808&flag2=1&flag3=11";
            if (pt.ptui.isHttps) e = $.check.isSsl() ? "flag1=7808&flag2=1&flag3=8": "flag1=7808&flag2=1&flag3=12",
            $.report.setSpeedPoint(e, 1, (new Date).getTime()),
            $.report.isdSpeed(e);
            else if ("11" == pt.ptui.style) switch (t + "") {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
                $.report.setSpeedPoint(e, t, (new Date).getTime()),
                $.report.isdSpeed(e)
            }
        } catch(i) {}
    },
    _ = function(e) {
        try {
            1 == x() && ($("bottom_web") && $.css.hide($("bottom_web")), pt.login && pt.login.adjustLoginsize(), $("bottom_web") && $.css.show($("bottom_web")))
        } catch(i) {}
        if ("1" == pt.ptui.no_drop_domain) {
            var n = $(e),
            o = {};
            o.action = "resize",
            o.width = n.offsetWidth || 1,
            o.height = n.offsetHeight || 1,
            pt.crossMessage(o)
        } else try {
            var n = $(e);
            if (n) {
                width = 1,
                height = 1,
                n.offsetWidth > 0 && (width = n.offsetWidth),
                n.offsetHeight > 0 && (height = n.offsetHeight);
                var r = window.location.hostname.replace(/ui\.ptlogin2\./i, ""),
                a = new Date;
                a.setTime(a.getTime() + 5e3),
                "1" == t && (document.cookie = "pt_size=" + width + "-" + height + ";domain=" + r + ";path=/;expires=" + a.toGMTString());
                try {
                    "undefined" != typeof window.postMessage && window.parent.postMessage("pt_size=" + width + "-" + height, "*")
                } catch(i) {}
                var s = $.bom.query("_crossDomain");
                if ("1" == s) return;
                parent.ptlogin2_onResize ? (parent.ptlogin2_onResize(width, height), window.scroll(0, 10)) : (frameElement.width = width, frameElement.style.width = width + "px", frameElement.height = height, frameElement.style.height = height + "px", frameElement.style.visibility = "hidden", frameElement.style.visibility = "visible")
            }
        } catch(i) {}
    },
    v = function() {
        if ("1" == pt.ptui.isCdn && $.sso_ver >= 1024) {
            var t = location.href.replace("ui", "xui").replace("login.html", "qlogin.html");
            return t
        }
        var e = "qlogin",
        i = encodeURIComponent(encodeURIComponent(document.forms[0].u1.value)),
        n = "" == pt.ptui.jumpname || "jump" == pt.ptui.jumpname ? encodeURIComponent("u1=" + encodeURIComponent(document.forms[0].u1.value)) : "",
        o = $.check.isHttps() && $.check.isSsl(),
        r = o ? "https://ssl.": "https://",
        t = (pt.ptui.isHttps ? r: "http://") + "xui.ptlogin2." + pt.ptui.domain + "/cgi-bin/" + e + "?domain=" + pt.ptui.domain + "&lang=" + pt.ptui.lang + "&qtarget=" + pt.ptui.qtarget + "&jumpname=" + pt.ptui.jumpname + "&appid=" + pt.ptui.appid + "&param=" + encodeURIComponent(pt.ptui.qlogin_param ? encodeURIComponent(pt.ptui.qlogin_param) : n) + "&s_url=" + i + "&mibao_css=" + pt.ptui.mibao_css + "&low_login=" + pt.ptui.low_login + (pt.ptui.daid ? "&daid=" + pt.ptui.daid: "") + (pt.ptui.regmaster ? "&regmaster=" + pt.ptui.regmaster: "") + "&style=" + pt.ptui.style + "&authParamUrl=" + s + "&needVip=" + pt.ptui.needVip + "&ptui_version=" + pt.ptui.ptui_version;
        return "0" != pt.ptui.csimc && (t += "&csimc=" + pt.ptui.csimc + "&csnum=" + pt.ptui.csnum + "&authid=" + pt.ptui.authid),
        "1" == pt.ptui.pt_qzone_sig && (t += "&pt_qzone_sig=1"),
        "1" == pt.ptui.pt_light && (t += "&pt_light=1"),
        pt.preload.hasReportAuth && (t += "&pt_auth_report=1"),
        t
    },
    w = function() {
        if (e) return void($("qlogin").style.display = "block");
        var t = v(),
        i = $("qlogin"),
        n = 265;
        12 == pt.ptui.style,
        i.innerHTML = '<iframe  id="xui" name="xui" allowtransparency="true" scrolling="no" frameborder="0" width="100%" height="' + n + '"px src="' + t + '">',
        e = !0,
        b(!1);
        try {
            frames.xui.focus()
        } catch(o) {}
    },
    y = function(t) {
        try {
            var e = t.u,
            i = t.p,
            n = t.verifycode;
            if ("" == e.value) return void e.focus();
            if ("" == i.value) return void i.focus();
            "" == n.value && n.focus()
        } catch(o) {}
    },
    b = function(t, e) {
        var n, r;
        if (t) {
            $.css.hide($("qlogin")),
            $.css.show($("web_qr_login")),
            $("qrswitch") && $.css.show($("qrswitch")),
            i = 1,
            o || ($("login").className = "login_no_qlogin");
            try {
                $("xui").blur()
            } catch(a) {}
            $("switch_login").className = "switch_btn_focus",
            $("switch_qlogin").className = "switch_btn",
            r = $("switch_login").offsetWidth,
            n = $("switch_login").parentNode.offsetWidth - r,
            _("login"),
            e || y(document.loginform),
            pt.login && pt.login.isQrLogin && pt.login.begin_qrlogin()
        } else {
            $.css.hide($("web_qr_login")),
            $.css.show($("qlogin")),
            $("qrswitch") && $.css.hide($("qrswitch")),
            i = 2;
            try {
                frames.xui.focus()
            } catch(a) {}
            $("switch_qlogin").className = "switch_btn_focus",
            $("switch_login").className = "switch_btn",
            r = $("switch_qlogin").offsetWidth,
            n = 0,
            _("login"),
            pt.login && pt.login.isQrLogin && pt.login.cancle_qrlogin()
        }
        window.setTimeout(function() {
            try {
                $.animate.animate("switch_bottom", {
                    left: n,
                    width: r
                },
                80, 20)
            } catch(t) {
                $("switch_bottom").style.left = n + "px",
                $("switch_bottom").style.width = r + "px"
            }
        },
        100),
        pt.login && pt.login.changeBottom()
    },
    k = function(t) {
        var e = $.cookie.get("uin").replace(/^o0*/, ""),
        i = $.str.utf8ToUincode($.cookie.get("ptnick_" + e)) || e;
        $("auth_uin").innerHTML = $.str.encodeHtml(e),
        $("auth_nick").innerHTML = $.str.encodeHtml(i),
        $("auth_area").setAttribute("authUrl", $.str.encodeHtml(t)),
        $.http.loadScript((pt.ptui.ishttps ? "https://ssl.ptlogin2.": "http://ptlogin2.") + pt.ptui.domain + "/getface?appid=" + pt.ptui.appid + "&imgtype=3&encrytype=0&devtype=0&keytpye=0&uin=" + e + "&r=" + Math.random())
    },
    q = function(t, e) {
        2 == t && $.css.hide($("cancleAuthOuter")),
        k(e);
        var i = pt.ptui.style; (12 == i || 13 == i) && ($.css.hide($("header")), $.css.hide($("authHeader"))),
        $("authLogin").style.height = $("login").offsetHeight - (11 == i ? 2 : 4) + "px",
        $.css.show($("authLogin")),
        _("login")
    },
    T = function() {
        var t = pt.ptui.style; (12 == t || 13 == t) && ($.css.show($("header")), $.css.show($("authHeader"))),
        $.css.hide($("authLogin")),
        _("login")
    },
    x = function() {
        return i
    },
    C = function() {
        return a
    };
    return {
        init: u,
        auth: h,
        auth_timeout: l,
        initFocus: y,
        cancleAuth: T,
        authParamUrl: s,
        getHasAuth: C,
        switchpage: b,
        getLoginStatus: x,
        loadQrCss: m,
        ptui_notifySize: _
    }
} (),
pt.preload.auth(),
$ = window.$ || {},
$pt = window.$pt || {},
$.RSA = $pt.RSA = function() {
    function t(t, e) {
        return new a(t, e)
    }
    function e(t, e) {
        if (e < t.length + 11) return uv_alert("Message too long for RSA"),
        null;
        for (var i = new Array,
        n = t.length - 1; n >= 0 && e > 0;) {
            var o = t.charCodeAt(n--);
            i[--e] = o
        }
        i[--e] = 0;
        for (var r = new Y,
        s = new Array; e > 2;) {
            for (s[0] = 0; 0 == s[0];) r.nextBytes(s);
            i[--e] = s[0]
        }
        return i[--e] = 2,
        i[--e] = 0,
        new a(i)
    }
    function i() {
        this.n = null,
        this.e = 0,
        this.d = null,
        this.p = null,
        this.q = null,
        this.dmp1 = null,
        this.dmq1 = null,
        this.coeff = null
    }
    function n(e, i) {
        null != e && null != i && e.length > 0 && i.length > 0 ? (this.n = t(e, 16), this.e = parseInt(i, 16)) : uv_alert("Invalid RSA public key")
    }
    function o(t) {
        return t.modPowInt(this.e, this.n)
    }
    function r(t) {
        var i = e(t, this.n.bitLength() + 7 >> 3);
        if (null == i) return null;
        var n = this.doPublic(i);
        if (null == n) return null;
        var o = n.toString(16);
        return 0 == (1 & o.length) ? o: "0" + o
    }
    function a(t, e, i) {
        null != t && ("number" == typeof t ? this.fromNumber(t, e, i) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
    }
    function s() {
        return new a(null)
    }
    function p(t, e, i, n, o, r) {
        for (; --r >= 0;) {
            var a = e * this[t++] + i[n] + o;
            o = Math.floor(a / 67108864),
            i[n++] = 67108863 & a
        }
        return o
    }
    function l(t, e, i, n, o, r) {
        for (var a = 32767 & e,
        s = e >> 15; --r >= 0;) {
            var p = 32767 & this[t],
            l = this[t++] >> 15,
            c = s * p + l * a;
            p = a * p + ((32767 & c) << 15) + i[n] + (1073741823 & o),
            o = (p >>> 30) + (c >>> 15) + s * l + (o >>> 30),
            i[n++] = 1073741823 & p
        }
        return o
    }
    function c(t, e, i, n, o, r) {
        for (var a = 16383 & e,
        s = e >> 14; --r >= 0;) {
            var p = 16383 & this[t],
            l = this[t++] >> 14,
            c = s * p + l * a;
            p = a * p + ((16383 & c) << 14) + i[n] + o,
            o = (p >> 28) + (c >> 14) + s * l,
            i[n++] = 268435455 & p
        }
        return o
    }
    function u(t) {
        return ut.charAt(t)
    }
    function g(t, e) {
        var i = gt[t.charCodeAt(e)];
        return null == i ? -1 : i
    }
    function h(t) {
        for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
        t.t = this.t,
        t.s = this.s
    }
    function d(t) {
        this.t = 1,
        this.s = 0 > t ? -1 : 0,
        t > 0 ? this[0] = t: -1 > t ? this[0] = t + DV: this.t = 0
    }
    function m(t) {
        var e = s();
        return e.fromInt(t),
        e
    }
    function f(t, e) {
        var i;
        if (16 == e) i = 4;
        else if (8 == e) i = 3;
        else if (256 == e) i = 8;
        else if (2 == e) i = 1;
        else if (32 == e) i = 5;
        else {
            if (4 != e) return void this.fromRadix(t, e);
            i = 2
        }
        this.t = 0,
        this.s = 0;
        for (var n = t.length,
        o = !1,
        r = 0; --n >= 0;) {
            var s = 8 == i ? 255 & t[n] : g(t, n);
            0 > s ? "-" == t.charAt(n) && (o = !0) : (o = !1, 0 == r ? this[this.t++] = s: r + i > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - r) - 1) << r, this[this.t++] = s >> this.DB - r) : this[this.t - 1] |= s << r, r += i, r >= this.DB && (r -= this.DB))
        }
        8 == i && 0 != (128 & t[0]) && (this.s = -1, r > 0 && (this[this.t - 1] |= (1 << this.DB - r) - 1 << r)),
        this.clamp(),
        o && a.ZERO.subTo(this, this)
    }
    function _() {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)--this.t
    }
    function v(t) {
        if (this.s < 0) return "-" + this.negate().toString(t);
        var e;
        if (16 == t) e = 4;
        else if (8 == t) e = 3;
        else if (2 == t) e = 1;
        else if (32 == t) e = 5;
        else {
            if (4 != t) return this.toRadix(t);
            e = 2
        }
        var i, n = (1 << e) - 1,
        o = !1,
        r = "",
        a = this.t,
        s = this.DB - a * this.DB % e;
        if (a-->0) for (s < this.DB && (i = this[a] >> s) > 0 && (o = !0, r = u(i)); a >= 0;) e > s ? (i = (this[a] & (1 << s) - 1) << e - s, i |= this[--a] >> (s += this.DB - e)) : (i = this[a] >> (s -= e) & n, 0 >= s && (s += this.DB, --a)),
        i > 0 && (o = !0),
        o && (r += u(i));
        return o ? r: "0"
    }
    function $() {
        var t = s();
        return a.ZERO.subTo(this, t),
        t
    }
    function w() {
        return this.s < 0 ? this.negate() : this
    }
    function y(t) {
        var e = this.s - t.s;
        if (0 != e) return e;
        var i = this.t;
        if (e = i - t.t, 0 != e) return e;
        for (; --i >= 0;) if (0 != (e = this[i] - t[i])) return e;
        return 0
    }
    function b(t) {
        var e, i = 1;
        return 0 != (e = t >>> 16) && (t = e, i += 16),
        0 != (e = t >> 8) && (t = e, i += 8),
        0 != (e = t >> 4) && (t = e, i += 4),
        0 != (e = t >> 2) && (t = e, i += 2),
        0 != (e = t >> 1) && (t = e, i += 1),
        i
    }
    function k() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + b(this[this.t - 1] ^ this.s & this.DM)
    }
    function q(t, e) {
        var i;
        for (i = this.t - 1; i >= 0; --i) e[i + t] = this[i];
        for (i = t - 1; i >= 0; --i) e[i] = 0;
        e.t = this.t + t,
        e.s = this.s
    }
    function T(t, e) {
        for (var i = t; i < this.t; ++i) e[i - t] = this[i];
        e.t = Math.max(this.t - t, 0),
        e.s = this.s
    }
    function x(t, e) {
        var i, n = t % this.DB,
        o = this.DB - n,
        r = (1 << o) - 1,
        a = Math.floor(t / this.DB),
        s = this.s << n & this.DM;
        for (i = this.t - 1; i >= 0; --i) e[i + a + 1] = this[i] >> o | s,
        s = (this[i] & r) << n;
        for (i = a - 1; i >= 0; --i) e[i] = 0;
        e[a] = s,
        e.t = this.t + a + 1,
        e.s = this.s,
        e.clamp()
    }
    function C(t, e) {
        e.s = this.s;
        var i = Math.floor(t / this.DB);
        if (i >= this.t) return void(e.t = 0);
        var n = t % this.DB,
        o = this.DB - n,
        r = (1 << n) - 1;
        e[0] = this[i] >> n;
        for (var a = i + 1; a < this.t; ++a) e[a - i - 1] |= (this[a] & r) << o,
        e[a - i] = this[a] >> n;
        n > 0 && (e[this.t - i - 1] |= (this.s & r) << o),
        e.t = this.t - i,
        e.clamp()
    }
    function S(t, e) {
        for (var i = 0,
        n = 0,
        o = Math.min(t.t, this.t); o > i;) n += this[i] - t[i],
        e[i++] = n & this.DM,
        n >>= this.DB;
        if (t.t < this.t) {
            for (n -= t.s; i < this.t;) n += this[i],
            e[i++] = n & this.DM,
            n >>= this.DB;
            n += this.s
        } else {
            for (n += this.s; i < t.t;) n -= t[i],
            e[i++] = n & this.DM,
            n >>= this.DB;
            n -= t.s
        }
        e.s = 0 > n ? -1 : 0,
        -1 > n ? e[i++] = this.DV + n: n > 0 && (e[i++] = n),
        e.t = i,
        e.clamp()
    }
    function A(t, e) {
        var i = this.abs(),
        n = t.abs(),
        o = i.t;
        for (e.t = o + n.t; --o >= 0;) e[o] = 0;
        for (o = 0; o < n.t; ++o) e[o + i.t] = i.am(0, n[o], e, o, 0, i.t);
        e.s = 0,
        e.clamp(),
        this.s != t.s && a.ZERO.subTo(e, e)
    }
    function E(t) {
        for (var e = this.abs(), i = t.t = 2 * e.t; --i >= 0;) t[i] = 0;
        for (i = 0; i < e.t - 1; ++i) {
            var n = e.am(i, e[i], t, 2 * i, 0, 1); (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, n, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV, t[i + e.t + 1] = 1)
        }
        t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)),
        t.s = 0,
        t.clamp()
    }
    function D(t, e, i) {
        var n = t.abs();
        if (! (n.t <= 0)) {
            var o = this.abs();
            if (o.t < n.t) return null != e && e.fromInt(0),
            void(null != i && this.copyTo(i));
            null == i && (i = s());
            var r = s(),
            p = this.s,
            l = t.s,
            c = this.DB - b(n[n.t - 1]);
            c > 0 ? (n.lShiftTo(c, r), o.lShiftTo(c, i)) : (n.copyTo(r), o.copyTo(i));
            var u = r.t,
            g = r[u - 1];
            if (0 != g) {
                var h = g * (1 << this.F1) + (u > 1 ? r[u - 2] >> this.F2: 0),
                d = this.FV / h,
                m = (1 << this.F1) / h,
                f = 1 << this.F2,
                _ = i.t,
                v = _ - u,
                $ = null == e ? s() : e;
                for (r.dlShiftTo(v, $), i.compareTo($) >= 0 && (i[i.t++] = 1, i.subTo($, i)), a.ONE.dlShiftTo(u, $), $.subTo(r, r); r.t < u;) r[r.t++] = 0;
                for (; --v >= 0;) {
                    var w = i[--_] == g ? this.DM: Math.floor(i[_] * d + (i[_ - 1] + f) * m);
                    if ((i[_] += r.am(0, w, i, v, 0, u)) < w) for (r.dlShiftTo(v, $), i.subTo($, i); i[_] < --w;) i.subTo($, i)
                }
                null != e && (i.drShiftTo(u, e), p != l && a.ZERO.subTo(e, e)),
                i.t = u,
                i.clamp(),
                c > 0 && i.rShiftTo(c, i),
                0 > p && a.ZERO.subTo(i, i)
            }
        }
    }
    function L(t) {
        var e = s();
        return this.abs().divRemTo(t, null, e),
        this.s < 0 && e.compareTo(a.ZERO) > 0 && t.subTo(e, e),
        e
    }
    function H(t) {
        this.m = t
    }
    function N(t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
    }
    function M(t) {
        return t
    }
    function R(t) {
        t.divRemTo(this.m, null, t)
    }
    function I(t, e, i) {
        t.multiplyTo(e, i),
        this.reduce(i)
    }
    function P(t, e) {
        t.squareTo(e),
        this.reduce(e)
    }
    function j() {
        if (this.t < 1) return 0;
        var t = this[0];
        if (0 == (1 & t)) return 0;
        var e = 3 & t;
        return e = e * (2 - (15 & t) * e) & 15,
        e = e * (2 - (255 & t) * e) & 255,
        e = e * (2 - ((65535 & t) * e & 65535)) & 65535,
        e = e * (2 - t * e % this.DV) % this.DV,
        e > 0 ? this.DV - e: -e
    }
    function B(t) {
        this.m = t,
        this.mp = t.invDigit(),
        this.mpl = 32767 & this.mp,
        this.mph = this.mp >> 15,
        this.um = (1 << t.DB - 15) - 1,
        this.mt2 = 2 * t.t
    }
    function U(t) {
        var e = s();
        return t.abs().dlShiftTo(this.m.t, e),
        e.divRemTo(this.m, null, e),
        t.s < 0 && e.compareTo(a.ZERO) > 0 && this.m.subTo(e, e),
        e
    }
    function O(t) {
        var e = s();
        return t.copyTo(e),
        this.reduce(e),
        e
    }
    function F(t) {
        for (; t.t <= this.mt2;) t[t.t++] = 0;
        for (var e = 0; e < this.m.t; ++e) {
            var i = 32767 & t[e],
            n = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (i = e + this.m.t, t[i] += this.m.am(0, n, t, e, 0, this.m.t); t[i] >= t.DV;) t[i] -= t.DV,
            t[++i]++
        }
        t.clamp(),
        t.drShiftTo(this.m.t, t),
        t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    }
    function Q(t, e) {
        t.squareTo(e),
        this.reduce(e)
    }
    function V(t, e, i) {
        t.multiplyTo(e, i),
        this.reduce(i)
    }
    function z() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    }
    function X(t, e) {
        if (t > 4294967295 || 1 > t) return a.ONE;
        var i = s(),
        n = s(),
        o = e.convert(this),
        r = b(t) - 1;
        for (o.copyTo(i); --r >= 0;) if (e.sqrTo(i, n), (t & 1 << r) > 0) e.mulTo(n, o, i);
        else {
            var p = i;
            i = n,
            n = p
        }
        return e.revert(i)
    }
    function W(t, e) {
        var i;
        return i = 256 > t || e.isEven() ? new H(e) : new B(e),
        this.exp(t, i)
    }
    function G(t) {
        dt[mt++] ^= 255 & t,
        dt[mt++] ^= t >> 8 & 255,
        dt[mt++] ^= t >> 16 & 255,
        dt[mt++] ^= t >> 24 & 255,
        mt >= vt && (mt -= vt)
    }
    function Z() {
        G((new Date).getTime())
    }
    function K() {
        if (null == ht) {
            for (Z(), ht = nt(), ht.init(dt), mt = 0; mt < dt.length; ++mt) dt[mt] = 0;
            mt = 0
        }
        return ht.next()
    }
    function J(t) {
        var e;
        for (e = 0; e < t.length; ++e) t[e] = K()
    }
    function Y() {}
    function tt() {
        this.i = 0,
        this.j = 0,
        this.S = new Array
    }
    function et(t) {
        var e, i, n;
        for (e = 0; 256 > e; ++e) this.S[e] = e;
        for (i = 0, e = 0; 256 > e; ++e) i = i + this.S[e] + t[e % t.length] & 255,
        n = this.S[e],
        this.S[e] = this.S[i],
        this.S[i] = n;
        this.i = 0,
        this.j = 0
    }
    function it() {
        var t;
        return this.i = this.i + 1 & 255,
        this.j = this.j + this.S[this.i] & 255,
        t = this.S[this.i],
        this.S[this.i] = this.S[this.j],
        this.S[this.j] = t,
        this.S[t + this.S[this.i] & 255]
    }
    function nt() {
        return new tt
    }
    function ot(t, e, n) {
        e = "F20CE00BAE5361F8FA3AE9CEFA495362FF7DA1BA628F64A347F0A8C012BF0B254A30CD92ABFFE7A6EE0DC424CB6166F8819EFA5BCCB20EDFB4AD02E412CCF579B1CA711D55B8B0B3AEB60153D5E0693A2A86F3167D7847A0CB8B00004716A9095D9BADC977CBB804DBDCBA6029A9710869A453F27DFDDF83C016D928B3CBF4C7",
        n = "3";
        var o = new i;
        return o.setPublic(e, n),
        o.encrypt(t)
    }
    i.prototype.doPublic = o,
    i.prototype.setPublic = n,
    i.prototype.encrypt = r;
    var rt, at = 0xdeadbeefcafe,
    st = 15715070 == (16777215 & at);
    st && "Microsoft Internet Explorer" == navigator.appName ? (a.prototype.am = l, rt = 30) : st && "Netscape" != navigator.appName ? (a.prototype.am = p, rt = 26) : (a.prototype.am = c, rt = 28),
    a.prototype.DB = rt,
    a.prototype.DM = (1 << rt) - 1,
    a.prototype.DV = 1 << rt;
    var pt = 52;
    a.prototype.FV = Math.pow(2, pt),
    a.prototype.F1 = pt - rt,
    a.prototype.F2 = 2 * rt - pt;
    var lt, ct, ut = "0123456789abcdefghijklmnopqrstuvwxyz",
    gt = new Array;
    for (lt = "0".charCodeAt(0), ct = 0; 9 >= ct; ++ct) gt[lt++] = ct;
    for (lt = "a".charCodeAt(0), ct = 10; 36 > ct; ++ct) gt[lt++] = ct;
    for (lt = "A".charCodeAt(0), ct = 10; 36 > ct; ++ct) gt[lt++] = ct;
    H.prototype.convert = N,
    H.prototype.revert = M,
    H.prototype.reduce = R,
    H.prototype.mulTo = I,
    H.prototype.sqrTo = P,
    B.prototype.convert = U,
    B.prototype.revert = O,
    B.prototype.reduce = F,
    B.prototype.mulTo = V,
    B.prototype.sqrTo = Q,
    a.prototype.copyTo = h,
    a.prototype.fromInt = d,
    a.prototype.fromString = f,
    a.prototype.clamp = _,
    a.prototype.dlShiftTo = q,
    a.prototype.drShiftTo = T,
    a.prototype.lShiftTo = x,
    a.prototype.rShiftTo = C,
    a.prototype.subTo = S,
    a.prototype.multiplyTo = A,
    a.prototype.squareTo = E,
    a.prototype.divRemTo = D,
    a.prototype.invDigit = j,
    a.prototype.isEven = z,
    a.prototype.exp = X,
    a.prototype.toString = v,
    a.prototype.negate = $,
    a.prototype.abs = w,
    a.prototype.compareTo = y,
    a.prototype.bitLength = k,
    a.prototype.mod = L,
    a.prototype.modPowInt = W,
    a.ZERO = m(0),
    a.ONE = m(1);
    var ht, dt, mt;
    if (null == dt) {
        dt = new Array,
        mt = 0;
        var ft;
        if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto && window.crypto.random) {
            var _t = window.crypto.random(32);
            for (ft = 0; ft < _t.length; ++ft) dt[mt++] = 255 & _t.charCodeAt(ft)
        }
        for (; vt > mt;) ft = Math.floor(65536 * Math.random()),
        dt[mt++] = ft >>> 8,
        dt[mt++] = 255 & ft;
        mt = 0,
        Z()
    }
    Y.prototype.nextBytes = J,
    tt.prototype.init = et,
    tt.prototype.next = it;
    var vt = 256;
    return {
        rsa_encrypt: ot
    }
} (),
function(t) {
    function e() {
        return Math.round(4294967295 * Math.random())
    }
    function i(t, e, i) { (!i || i > 4) && (i = 4);
        for (var n = 0,
        o = e; e + i > o; o++) n <<= 8,
        n |= t[o];
        return (4294967295 & n) >>> 0
    }
    function n(t, e, i) {
        t[e + 3] = i >> 0 & 255,
        t[e + 2] = i >> 8 & 255,
        t[e + 1] = i >> 16 & 255,
        t[e + 0] = i >> 24 & 255
    }
    function o(t) {
        if (!t) return "";
        for (var e = "",
        i = 0; i < t.length; i++) {
            var n = Number(t[i]).toString(16);
            1 == n.length && (n = "0" + n),
            e += n
        }
        return e
    }
    function r(t) {
        for (var e = "",
        i = 0; i < t.length; i += 2) e += String.fromCharCode(parseInt(t.substr(i, 2), 16));
        return e
    }
    function a(t, e) {
        if (!t) return "";
        e && (t = s(t));
        for (var i = [], n = 0; n < t.length; n++) i[n] = t.charCodeAt(n);
        return o(i)
    }
    function s(t) {
        var e, i, n = [],
        o = t.length;
        for (e = 0; o > e; e++) i = t.charCodeAt(e),
        i > 0 && 127 >= i ? n.push(t.charAt(e)) : i >= 128 && 2047 >= i ? n.push(String.fromCharCode(192 | i >> 6 & 31), String.fromCharCode(128 | 63 & i)) : i >= 2048 && 65535 >= i && n.push(String.fromCharCode(224 | i >> 12 & 15), String.fromCharCode(128 | i >> 6 & 63), String.fromCharCode(128 | 63 & i));
        return n.join("")
    }
    function p(t) {
        _ = new Array(8),
        v = new Array(8),
        $ = w = 0,
        k = !0,
        f = 0;
        var i = t.length,
        n = 0;
        f = (i + 10) % 8,
        0 != f && (f = 8 - f),
        y = new Array(i + f + 10),
        _[0] = 255 & (248 & e() | f);
        for (var o = 1; f >= o; o++) _[o] = 255 & e();
        f++;
        for (var o = 0; 8 > o; o++) v[o] = 0;
        for (n = 1; 2 >= n;) 8 > f && (_[f++] = 255 & e(), n++),
        8 == f && c();
        for (var o = 0; i > 0;) 8 > f && (_[f++] = t[o++], i--),
        8 == f && c();
        for (n = 1; 7 >= n;) 8 > f && (_[f++] = 0, n++),
        8 == f && c();
        return y
    }
    function l(t) {
        var e = 0,
        i = new Array(8),
        n = t.length;
        if (b = t, n % 8 != 0 || 16 > n) return null;
        if (v = g(t), f = 7 & v[0], e = n - f - 10, 0 > e) return null;
        for (var o = 0; o < i.length; o++) i[o] = 0;
        y = new Array(e),
        w = 0,
        $ = 8,
        f++;
        for (var r = 1; 2 >= r;) if (8 > f && (f++, r++), 8 == f && (i = t, !h())) return null;
        for (var o = 0; 0 != e;) if (8 > f && (y[o] = 255 & (i[w + f] ^ v[f]), o++, e--, f++), 8 == f && (i = t, w = $ - 8, !h())) return null;
        for (r = 1; 8 > r; r++) {
            if (8 > f) {
                if (0 != (i[w + f] ^ v[f])) return null;
                f++
            }
            if (8 == f && (i = t, w = $, !h())) return null
        }
        return y
    }
    function c() {
        for (var t = 0; 8 > t; t++) _[t] ^= k ? v[t] : y[w + t];
        for (var e = u(_), t = 0; 8 > t; t++) y[$ + t] = e[t] ^ v[t],
        v[t] = _[t];
        w = $,
        $ += 8,
        f = 0,
        k = !1
    }
    function u(t) {
        for (var e = 16,
        o = i(t, 0, 4), r = i(t, 4, 4), a = i(m, 0, 4), s = i(m, 4, 4), p = i(m, 8, 4), l = i(m, 12, 4), c = 0, u = 2654435769; e-->0;) c += u,
        c = (4294967295 & c) >>> 0,
        o += (r << 4) + a ^ r + c ^ (r >>> 5) + s,
        o = (4294967295 & o) >>> 0,
        r += (o << 4) + p ^ o + c ^ (o >>> 5) + l,
        r = (4294967295 & r) >>> 0;
        var g = new Array(8);
        return n(g, 0, o),
        n(g, 4, r),
        g
    }
    function g(t) {
        for (var e = 16,
        o = i(t, 0, 4), r = i(t, 4, 4), a = i(m, 0, 4), s = i(m, 4, 4), p = i(m, 8, 4), l = i(m, 12, 4), c = 3816266640, u = 2654435769; e-->0;) r -= (o << 4) + p ^ o + c ^ (o >>> 5) + l,
        r = (4294967295 & r) >>> 0,
        o -= (r << 4) + a ^ r + c ^ (r >>> 5) + s,
        o = (4294967295 & o) >>> 0,
        c -= u,
        c = (4294967295 & c) >>> 0;
        var g = new Array(8);
        return n(g, 0, o),
        n(g, 4, r),
        g
    }
    function h() {
        for (var t = (b.length, 0); 8 > t; t++) v[t] ^= b[$ + t];
        return v = g(v),
        $ += 8,
        f = 0,
        !0
    }
    function d(t, e) {
        var i = [];
        if (e) for (var n = 0; n < t.length; n++) i[n] = 255 & t.charCodeAt(n);
        else for (var o = 0,
        n = 0; n < t.length; n += 2) i[o++] = parseInt(t.substr(n, 2), 16);
        return i
    }
    var m = "",
    f = 0,
    _ = [],
    v = [],
    $ = 0,
    w = 0,
    y = [],
    b = [],
    k = !0;
    t.TEA = {
        encrypt: function(t, e) {
            var i = d(t, e),
            n = p(i);
            return o(n)
        },
        enAsBase64: function(t, e) {
            for (var i = d(t, e), n = p(i), o = "", r = 0; r < n.length; r++) o += String.fromCharCode(n[r]);
            return btoa(o)
        },
        decrypt: function(t) {
            var e = d(t, !1),
            i = l(e);
            return o(i)
        },
        initkey: function(t, e) {
            m = d(t, e)
        },
        bytesToStr: r,
        strToBytes: a,
        bytesInStr: o,
        dataFromStr: d
    };
    var q = {};
    q.PADCHAR = "=",
    q.ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    q.getbyte = function(t, e) {
        var i = t.charCodeAt(e);
        if (i > 255) throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        return i
    },
    q.encode = function(t) {
        if (1 != arguments.length) throw "SyntaxError: Not enough arguments";
        var e, i, n = q.PADCHAR,
        o = q.ALPHA,
        r = q.getbyte,
        a = [];
        t = "" + t;
        var s = t.length - t.length % 3;
        if (0 == t.length) return t;
        for (e = 0; s > e; e += 3) i = r(t, e) << 16 | r(t, e + 1) << 8 | r(t, e + 2),
        a.push(o.charAt(i >> 18)),
        a.push(o.charAt(i >> 12 & 63)),
        a.push(o.charAt(i >> 6 & 63)),
        a.push(o.charAt(63 & i));
        switch (t.length - s) {
        case 1:
            i = r(t, e) << 16,
            a.push(o.charAt(i >> 18) + o.charAt(i >> 12 & 63) + n + n);
            break;
        case 2:
            i = r(t, e) << 16 | r(t, e + 1) << 8,
            a.push(o.charAt(i >> 18) + o.charAt(i >> 12 & 63) + o.charAt(i >> 6 & 63) + n)
        }
        return a.join("")
    },
    window.btoa || (window.btoa = q.encode)
} (window),
$ = window.$ || {},
$pt = window.$pt || {},
$.Encryption = $pt.Encryption = function() {
    function md5(t) {
        return hex_md5(t)
    }
    function hex_md5(t) {
        return binl2hex(core_md5(str2binl(t), t.length * chrsz))
    }
    function str_md5(t) {
        return binl2str(core_md5(str2binl(t), t.length * chrsz))
    }
    function hex_hmac_md5(t, e) {
        return binl2hex(core_hmac_md5(t, e))
    }
    function b64_hmac_md5(t, e) {
        return binl2b64(core_hmac_md5(t, e))
    }
    function str_hmac_md5(t, e) {
        return binl2str(core_hmac_md5(t, e))
    }
    function core_md5(t, e) {
        t[e >> 5] |= 128 << e % 32,
        t[(e + 64 >>> 9 << 4) + 14] = e;
        for (var i = 1732584193,
        n = -271733879,
        o = -1732584194,
        r = 271733878,
        a = 0; a < t.length; a += 16) {
            var s = i,
            p = n,
            l = o,
            c = r;
            i = md5_ff(i, n, o, r, t[a + 0], 7, -680876936),
            r = md5_ff(r, i, n, o, t[a + 1], 12, -389564586),
            o = md5_ff(o, r, i, n, t[a + 2], 17, 606105819),
            n = md5_ff(n, o, r, i, t[a + 3], 22, -1044525330),
            i = md5_ff(i, n, o, r, t[a + 4], 7, -176418897),
            r = md5_ff(r, i, n, o, t[a + 5], 12, 1200080426),
            o = md5_ff(o, r, i, n, t[a + 6], 17, -1473231341),
            n = md5_ff(n, o, r, i, t[a + 7], 22, -45705983),
            i = md5_ff(i, n, o, r, t[a + 8], 7, 1770035416),
            r = md5_ff(r, i, n, o, t[a + 9], 12, -1958414417),
            o = md5_ff(o, r, i, n, t[a + 10], 17, -42063),
            n = md5_ff(n, o, r, i, t[a + 11], 22, -1990404162),
            i = md5_ff(i, n, o, r, t[a + 12], 7, 1804603682),
            r = md5_ff(r, i, n, o, t[a + 13], 12, -40341101),
            o = md5_ff(o, r, i, n, t[a + 14], 17, -1502002290),
            n = md5_ff(n, o, r, i, t[a + 15], 22, 1236535329),
            i = md5_gg(i, n, o, r, t[a + 1], 5, -165796510),
            r = md5_gg(r, i, n, o, t[a + 6], 9, -1069501632),
            o = md5_gg(o, r, i, n, t[a + 11], 14, 643717713),
            n = md5_gg(n, o, r, i, t[a + 0], 20, -373897302),
            i = md5_gg(i, n, o, r, t[a + 5], 5, -701558691),
            r = md5_gg(r, i, n, o, t[a + 10], 9, 38016083),
            o = md5_gg(o, r, i, n, t[a + 15], 14, -660478335),
            n = md5_gg(n, o, r, i, t[a + 4], 20, -405537848),
            i = md5_gg(i, n, o, r, t[a + 9], 5, 568446438),
            r = md5_gg(r, i, n, o, t[a + 14], 9, -1019803690),
            o = md5_gg(o, r, i, n, t[a + 3], 14, -187363961),
            n = md5_gg(n, o, r, i, t[a + 8], 20, 1163531501),
            i = md5_gg(i, n, o, r, t[a + 13], 5, -1444681467),
            r = md5_gg(r, i, n, o, t[a + 2], 9, -51403784),
            o = md5_gg(o, r, i, n, t[a + 7], 14, 1735328473),
            n = md5_gg(n, o, r, i, t[a + 12], 20, -1926607734),
            i = md5_hh(i, n, o, r, t[a + 5], 4, -378558),
            r = md5_hh(r, i, n, o, t[a + 8], 11, -2022574463),
            o = md5_hh(o, r, i, n, t[a + 11], 16, 1839030562),
            n = md5_hh(n, o, r, i, t[a + 14], 23, -35309556),
            i = md5_hh(i, n, o, r, t[a + 1], 4, -1530992060),
            r = md5_hh(r, i, n, o, t[a + 4], 11, 1272893353),
            o = md5_hh(o, r, i, n, t[a + 7], 16, -155497632),
            n = md5_hh(n, o, r, i, t[a + 10], 23, -1094730640),
            i = md5_hh(i, n, o, r, t[a + 13], 4, 681279174),
            r = md5_hh(r, i, n, o, t[a + 0], 11, -358537222),
            o = md5_hh(o, r, i, n, t[a + 3], 16, -722521979),
            n = md5_hh(n, o, r, i, t[a + 6], 23, 76029189),
            i = md5_hh(i, n, o, r, t[a + 9], 4, -640364487),
            r = md5_hh(r, i, n, o, t[a + 12], 11, -421815835),
            o = md5_hh(o, r, i, n, t[a + 15], 16, 530742520),
            n = md5_hh(n, o, r, i, t[a + 2], 23, -995338651),
            i = md5_ii(i, n, o, r, t[a + 0], 6, -198630844),
            r = md5_ii(r, i, n, o, t[a + 7], 10, 1126891415),
            o = md5_ii(o, r, i, n, t[a + 14], 15, -1416354905),
            n = md5_ii(n, o, r, i, t[a + 5], 21, -57434055),
            i = md5_ii(i, n, o, r, t[a + 12], 6, 1700485571),
            r = md5_ii(r, i, n, o, t[a + 3], 10, -1894986606),
            o = md5_ii(o, r, i, n, t[a + 10], 15, -1051523),
            n = md5_ii(n, o, r, i, t[a + 1], 21, -2054922799),
            i = md5_ii(i, n, o, r, t[a + 8], 6, 1873313359),
            r = md5_ii(r, i, n, o, t[a + 15], 10, -30611744),
            o = md5_ii(o, r, i, n, t[a + 6], 15, -1560198380),
            n = md5_ii(n, o, r, i, t[a + 13], 21, 1309151649),
            i = md5_ii(i, n, o, r, t[a + 4], 6, -145523070),
            r = md5_ii(r, i, n, o, t[a + 11], 10, -1120210379),
            o = md5_ii(o, r, i, n, t[a + 2], 15, 718787259),
            n = md5_ii(n, o, r, i, t[a + 9], 21, -343485551),
            i = safe_add(i, s),
            n = safe_add(n, p),
            o = safe_add(o, l),
            r = safe_add(r, c)
        }
        return 16 == mode ? Array(n, o) : Array(i, n, o, r)
    }
    function md5_cmn(t, e, i, n, o, r) {
        return safe_add(bit_rol(safe_add(safe_add(e, t), safe_add(n, r)), o), i)
    }
    function md5_ff(t, e, i, n, o, r, a) {
        return md5_cmn(e & i | ~e & n, t, e, o, r, a)
    }
    function md5_gg(t, e, i, n, o, r, a) {
        return md5_cmn(e & n | i & ~n, t, e, o, r, a)
    }
    function md5_hh(t, e, i, n, o, r, a) {
        return md5_cmn(e ^ i ^ n, t, e, o, r, a)
    }
    function md5_ii(t, e, i, n, o, r, a) {
        return md5_cmn(i ^ (e | ~n), t, e, o, r, a)
    }
    function core_hmac_md5(t, e) {
        var i = str2binl(t);
        i.length > 16 && (i = core_md5(i, t.length * chrsz));
        for (var n = Array(16), o = Array(16), r = 0; 16 > r; r++) n[r] = 909522486 ^ i[r],
        o[r] = 1549556828 ^ i[r];
        var a = core_md5(n.concat(str2binl(e)), 512 + e.length * chrsz);
        return core_md5(o.concat(a), 640)
    }
    function safe_add(t, e) {
        var i = (65535 & t) + (65535 & e),
        n = (t >> 16) + (e >> 16) + (i >> 16);
        return n << 16 | 65535 & i
    }
    function bit_rol(t, e) {
        return t << e | t >>> 32 - e
    }
    function str2binl(t) {
        for (var e = Array(), i = (1 << chrsz) - 1, n = 0; n < t.length * chrsz; n += chrsz) e[n >> 5] |= (t.charCodeAt(n / chrsz) & i) << n % 32;
        return e
    }
    function binl2str(t) {
        for (var e = "",
        i = (1 << chrsz) - 1, n = 0; n < 32 * t.length; n += chrsz) e += String.fromCharCode(t[n >> 5] >>> n % 32 & i);
        return e
    }
    function binl2hex(t) {
        for (var e = hexcase ? "0123456789ABCDEF": "0123456789abcdef", i = "", n = 0; n < 4 * t.length; n++) i += e.charAt(t[n >> 2] >> n % 4 * 8 + 4 & 15) + e.charAt(t[n >> 2] >> n % 4 * 8 & 15);
        return i
    }
    function binl2b64(t) {
        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        i = "",
        n = 0; n < 4 * t.length; n += 3) for (var o = (t[n >> 2] >> 8 * (n % 4) & 255) << 16 | (t[n + 1 >> 2] >> 8 * ((n + 1) % 4) & 255) << 8 | t[n + 2 >> 2] >> 8 * ((n + 2) % 4) & 255, r = 0; 4 > r; r++) i += 8 * n + 6 * r > 32 * t.length ? b64pad: e.charAt(o >> 6 * (3 - r) & 63);
        return i
    }
    function hexchar2bin(str) {
        for (var arr = [], i = 0; i < str.length; i += 2) arr.push("\\x" + str.substr(i, 2));
        return arr = arr.join(""),
        eval("var temp = '" + arr + "'"),
        temp
    }
    function __monitor(t, e) {
        if (! (Math.random() > (e || 1))) try {
            var i = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/report?id=" + t,
            n = document.createElement("img");
            n.src = i
        } catch(o) {}
    }
    function getEncryption(t, e, i, n) {
        i = i || "",
        t = t || "";
        for (var o = n ? t: md5(t), r = hexchar2bin(o), a = md5(r + e), s = $pt.RSA.rsa_encrypt(r), p = (s.length / 2).toString(16), l = TEA.strToBytes(i.toUpperCase(), !0), c = Number(l.length / 2).toString(16); c.length < 4;) c = "0" + c;
        for (; p.length < 4;) p = "0" + p;
        TEA.initkey(a);
        var u = TEA.enAsBase64(p + s + TEA.strToBytes(e) + c + l);
        return TEA.initkey(""),
        setTimeout(function() {
            __monitor(488358, 1)
        },
        0),
        u.replace(/[\/\+=]/g,
        function(t) {
            return {
                "/": "-",
                "+": "*",
                "=": "_"
            } [t]
        })
    }
    function getRSAEncryption(t, e, i) {
        var n = i ? t: md5(t),
        o = n + e.toUpperCase(),
        r = $.RSA.rsa_encrypt(o);
        return r
    }
    var hexcase = 1,
    b64pad = "",
    chrsz = 8,
    mode = 32;
    return {
        getEncryption: getEncryption,
        getRSAEncryption: getRSAEncryption,
        md5: md5
    }
} (),
pt.login = {
    accout: "",
    at_accout: "",
    uin: "",
    salt: "",
    hasCheck: !1,
    lastCheckAccout: "",
    needVc: !1,
    vcFlag: !1,
    ckNum: {},
    action: [0, 0],
    passwordErrorNum: 1,
    isIpad: !1,
    t_appid: 46000101,
    seller_id: 703010802,
    checkUrl: "",
    loginUrl: "",
    verifycodeUrl: "",
    pt_verifysession: "",
    checkClock: 0,
    isCheckTimeout: !1,
    checkTime: 0,
    submitTime: 0,
    errclock: 0,
    loginClock: 0,
    login_param: pt.ptui.href.substring(pt.ptui.href.indexOf("?") + 1),
    err_m: $("err_m"),
    low_login_enable: !0,
    low_login_isshow: !1,
    list_index: [ - 1, 2],
    keyCode: {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        ENTER: 13,
        TAB: 9,
        BACK: 8,
        DEL: 46,
        F5: 116
    },
    knownEmail: ["qq.com", "foxmail.com", "gmail.com", "hotmail.com", "yahoo.com", "sina.com", "163.com", "126.com", "vip.qq.com", "vip.sina.com", "sina.cn", "sohu.com", "yahoo.cn", "yahoo.com.cn", "139.com", "wo.com.cn", "189.cn", "live.com", "msn.com", "live.hk", "live.cn", "hotmail.com.cn", "hinet.net", "msa.hinet.net", "cm1.hinet.net", "umail.hinet.net", "xuite.net", "yam.com", "pchome.com.tw", "netvigator.com", "seed.net.tw", "anet.net.tw"],
    qrlogin_clock: 0,
    qrlogin_timeout: 0,
    qrlogin_timeout_time: 1e5,
    isQrLogin: !1,
    qr_uin: "",
    qr_nick: "",
    dftImg: "",
    need_hide_operate_tips: !0,
    js_type: 1,
    xuiState: 1,
    delayTime: 5e3,
    delayMonitorId: "294059",
    hasSubmit: !1,
    aqScanLink: "<a href='javascript:void(0)'; onclick='pt.login.switch_qrlogin()'>" + ("2052" == pt.ptui.lang ? "立即扫描": "1028" == pt.ptui.lang ? "立即掃描": "Scan now") + "</a>",
    checkRet: -1,
    cap_cd: 0,
    checkErr: {
        2052 : "网络繁忙，请稍后重试。",
        1028 : "網絡繁忙，請稍後重試。",
        1033 : "The network is busy, please try again later."
    },
    domFocus: function(t) {
        try {
            window.setTimeout(function() {
                t.focus()
            },
            0)
        } catch(e) {}
    },
    detectCapsLock: function(t) {
        var e = t.keyCode || t.which,
        i = t.shiftKey || 16 == e || !1;
        return e >= 65 && 90 >= e && !i || e >= 97 && 122 >= e && i ? !0 : !1
    },
    generateEmailTips: function(t) {
        var e = t.indexOf("@"),
        i = "";
        i = -1 == e ? t: t.substring(0, e);
        for (var n = [], o = 0, r = pt.login.knownEmail.length; r > o; o++) n.push(i + "@" + pt.login.knownEmail[o]);
        for (var a = [], s = 0, r = n.length; r > s; s++) n[s].indexOf(t) > -1 && a.push($.str.encodeHtml(n[s]));
        return a
    },
    createEmailTips: function(t) {
        var e = pt.login.generateEmailTips(t),
        i = e.length,
        n = [],
        o = "",
        r = 4;
        if (i = Math.min(i, r), 0 == i) return pt.login.list_index[0] = -1,
        void pt.login.hideEmailTips();
        for (var a = 0; i > a; a++) {
            if (t == e[a]) return void pt.login.hideEmailTips();
            o = "emailTips_" + a,
            n.push(0 == a ? "<li id=" + o + " class='hover' >" + e[a] + "</li>": "<li id=" + o + ">" + e[a] + "</li>")
        }
        $("email_list").innerHTML = n.join(" "),
        pt.login.list_index[0] = 0
    },
    showEmailTips: function() {
        $.css.show($("email_list"))
    },
    hideEmailTips: function() {
        $.css.hide($("email_list"))
    },
    setUrl: function() {
        var t = pt.ptui.domain,
        e = $.check.isHttps() && $.check.isSsl();
        pt.login.checkUrl = (pt.ptui.isHttps ? "https://ssl.": "http://check.") + "ptlogin2." + t + "/check",
        pt.login.loginUrl = (pt.ptui.isHttps ? "https://ssl.": "http://") + "ptlogin2." + t + "/",
        pt.login.verifycodeUrl = (pt.ptui.isHttps ? "https://ssl.": "http://") + "captcha." + t + "/getimage",
        e && "qq.com" != t && "tenpay.com" != t && (pt.login.verifycodeUrl = "https://ssl.ptlogin2." + t + "/ptgetimage"),
        2 == pt.ptui.regmaster ? (pt.login.checkUrl = "http://check.ptlogin2.function.qq.com/check", pt.login.loginUrl = "http://ptlogin2.function.qq.com/") : 3 == pt.ptui.regmaster && (pt.login.checkUrl = (pt.ptui.isHttps ? "https://ssl.": "http://") + "check.ptlogin2.crm2.qq.com/check", pt.login.loginUrl = (pt.ptui.isHttps ? "https://ssl.": "http://") + "ptlogin2.crm2.qq.com/")
    },
    init: function() {
        pt.ptui.login_sig = pt.ptui.login_sig || $.cookie.get("pt_login_sig"),
        $.cookie.set("ptui_version", pt.ptui.ptui_version),
        pt.login.isJiechi() && pt.login.antiProcess(),
        pt.login.setUrl(),
        pt.login.bindEvent(),
        $("login_button") && ($("login_button").disabled = !1),
        pt.login.set_default_uin(pt.ptui.defaultUin),
        $.check.is_weibo_appid(pt.ptui.appid) && $("u") && ($("u").style.imeMode = "auto"),
        pt.login.changeBottom(),
        pt.login.dftImg = pt.ptui.isHttps ? "https://ui.ptlogin2.qq.com/style/0/images/1.gif": "http://imgcache.qq.com/ptlogin/v4/style/0/images/1.gif",
        "1" == pt.ptui.isCdn && (pt.login.dftImg = location.protocol + "//pt.url.cn/ptlogin/v4/style/0/images/1.gif"),
        pt.ptui.isHttps && (pt.login.delayTime = 7e3, pt.login.delayMonitorId = "294060"),
        pt.login.vipTest(),
        window.setTimeout(function() {
            $.report.monitor("363588&union=256042", .05),
            pt.ptui.login_sig || $.report.nlog("新版登录框login_sig为空|_|" + pt.ptui.ptui_version, "291552")
        },
        1e3),
        window.g_cdn_js_fail && "msie" == $.browser("type") ? pt.login.domLoad() : $.e.add(window, "load", pt.login.domLoad)
    },
    isJiechi: function() {
        return - 1 != location.href.indexOf(pt.ptui.href) || "aqjump" != pt.ptui.jumpname || $.check.isHttps() ? !1 : !0
    },
    antiProcess: function() {
        document.body.innerHTML = "";
        var t = document.createElement("div");
        t.setAttribute("id", "login"),
        t.style.cssText = "margin: 0 auto;padding: 0 0 5px; width: 370px;background:#fff";
        var e = document.createElement("div");
        e.innerHTML = '<input type="button" style="background:url(http://imgcache.qq.com/ptlogin/v4/style/0/images/icons.gif) no-repeat 0 -284px;margin:-4px 4px 0 0;float:right;width:20px;height:20px;cursor:pointer;" id="close" name="close" onclick="javascript:onPageClose();" title="关闭" /><u id="label_login_title">用户登录</u>';
        var i = 1 == $.bom.query("hide_title_bar");
        i ? t.style.border = "0px": (t.appendChild(e), e.style.cssText = "background:url(http://imgcache.qq.com/ptlogin/v4/style/0/images/icons.gif) no-repeat 0 0;height:21px;font-weight:bold;font-size:12px;padding:7px 0 0 30px;border-bottom:1px solid #438ece;", t.style.border = "1px solid #99c2ee");
        var n = document.createElement("div");
        n.style.textAlign = "center",
        n.innerHTML = '<div style="position:relative;">\r\n              <br/>\r\n              <p style="line-height:20px;text-align:left;width:220px;margin:0 auto;">您当前的网络存在链路层劫持，为了确保您的帐号安全，请使用安全登录。</p></div>\r\n              <br/>\r\n              <input id="safe_login" value="安全登录"" type="button"  style="border:0;background:url(http://imgcache.qq.com/ptlogin/v4/style/0/images/icons.gif) no-repeat -102px -130px;color:#2473A2;width:103px;height:28px;cursor:pointer;font-weight:bold;font-size:14px;"/>\r\n              </div>\r\n              <div style="margin-top:10px;margin-left:10px; height:20px;">\r\n              <span style="float:left;height:15px;width:14px; background: url(https://ui.ptlogin2.qq.com/style/14/images/help.png) no-repeat scroll right center transparent;"></span>\r\n              <a style="float:left; margin-left:5px;" href="http://kf.qq.com/info/80861.html" target="_blank" >什么是链路层劫持</a>\r\n              </div>',
        t.appendChild(n),
        document.body.appendChild(t),
        pt.preload.ptui_notifySize("login");
        var o = $.bom.query("s_url"),
        r = $.bom.query("appid"),
        a = $.bom.query("regmaster"),
        s = $.bom.query("enable_qlogin"),
        p = $.bom.query("jumpname"),
        l = $.bom.query("target"),
        c = $.bom.query("qtarget"),
        u = $.bom.query("daid");
        switch (c) {
        case "self":
            c = 0;
            break;
        case "top":
            c = 1;
            break;
        case "parent":
            c = 2;
            break;
        default:
            c = 1
        }
        var g = 1;
        if ("" != p) - 1 != c && (g = c);
        else switch (l) {
        case "self":
            g = 0;
            break;
        case "top":
            g = 1;
            break;
        case "parent":
            g = 2;
            break;
        default:
            g = 1
        }
        $("safe_login").onclick = function() {
            if ($.report.monitor(247563), 1 != g) try {
                o = top.location.href
            } catch(t) {}
            o = encodeURIComponent(o);
            var e = "https://ui.ptlogin2.qq.com/cgi-bin/login";
            window.open(e + "?style=14&pt_safe=1&appid=" + r + "&s_url=" + o + "&regmaster=" + a + "&enable_qlogin=" + s + "&daid=" + u, "_top")
        },
        $.report.monitor(248671)
    },
    vipTest: function() {
        var t = $("vip_link2"),
        e = $("vip_dot"); ! t || !e || pt.ptui.needVip && "2052" == pt.ptui.lang || ($.css.addClass(t, "hide"), $.css.addClass(e, "hide"))
    },
    set_default_uin: function(t) {
        t || (t = unescape($.cookie.getOrigin("ptui_loginuin")), pt.ptui.appid != pt.login.t_appid && ($.check.isNick(t) || $.check.isName(t)) && (t = $.cookie.get("pt2gguin").replace(/^o/, "") - 0, t = 0 == t ? "": t)),
        $("u").value = t,
        t && ($.css.hide($("uin_tips")), $.css.show($("uin_del")), pt.login.set_accout())
    },
    set_accout: function() {
        var t = $.str.trim($("u").value),
        e = pt.ptui.appid;
        if (pt.login.accout = t, pt.login.at_accout = t, $.check.is_weibo_appid(e)) {
            if ($.check.isQQ(t) || $.check.isMail(t)) return ! 0;
            if ($.check.isNick(t) || $.check.isName(t)) return pt.login.at_accout = "@" + t,
            !0;
            if ($.check.isPhone(t)) return pt.login.at_accout = "@" + t.replace(/^(86|886)/, ""),
            !0;
            if ($.check.isSeaPhone(t)) return pt.login.at_accout = "@00" + t.replace(/^(00)/, ""),
            /^(@0088609)/.test(pt.login.at_accout) && (pt.login.at_accout = pt.login.at_accout.replace(/^(@0088609)/, "@008869")),
            !0
        } else {
            if ($.check.isQQ(t) || $.check.isMail(t)) return ! 0;
            if ($.check.isPhone(t)) return pt.login.at_accout = "@" + t.replace(/^(86|886)/, ""),
            !0;
            if ($.check.isNick(t)) return $("u").value = t + "@qq.com",
            pt.login.accout = t + "@qq.com",
            pt.login.at_accout = t + "@qq.com",
            !0
        }
        return $.check.isForeignPhone(t) && (pt.login.at_accout = "@" + t),
        !0
    },
    show_err: function(t, e) {
        pt.login.hideLoading(),
        pt.login.hideOperate(),
        $.css.show($("error_tips")),
        pt.login.err_m.innerHTML = t,
        clearTimeout(pt.login.errclock),
        e || (pt.login.errclock = setTimeout("pt.login.hide_err()", 5e3))
    },
    hide_err: function() {
        $.css.hide($("error_tips")),
        pt.login.err_m.innerHTML = ""
    },
    showAssistant: function(t) {
        if ("2052" == pt.ptui.lang) switch (pt.login.hideLoading(), pt.login.hideOperate(), $.css.show($("error_tips")), t) {
        case 0:
            pt.login.err_m.innerHTML = "快速登录异常，试试<a class='tips_link' style='color: #29B1F1' href='/assistant/troubleshooter.html' target='_blank'>登录助手</a>修复",
            $.report.monitor("315785");
            break;
        case 1:
            pt.login.err_m.innerHTML = "快速登录异常，试试<a class='tips_link' style='color: #29B1F1' href='/assistant/troubleshooter.html' target='_blank'>登录助手</a>修复",
            $.report.monitor("315786");
            break;
        case 2:
            pt.login.err_m.innerHTML = "登录异常，试试<a class='tips_link' style='color: #29B1F1' href='/assistant/troubleshooter.html' target='_blank'>登录助手</a>修复",
            $.report.monitor("315787");
            break;
        case 3:
            pt.login.err_m.innerHTML = "快速登录异常，试试<a class='tips_link' style='color: #29B1F1' href='http://im.qq.com/qq/2013/' target='_blank' onclick='$.report.monitor(326049);'>升级QQ</a>修复",
            $.report.monitor("326046");
            break;
        case 4:
            pt.login.err_m.innerHTML = "快速登录插件可能被禁用，<a class='tips_link' style='color: #29B1F1' href='/assistant/plugin.html' target='_blank''>查看启用方法</a>",
            $.report.monitor("361049")
        }
    },
    showGuanjiaTips: function() {
        $.initGuanjiaPlugin(),
        $.guanjiaPlugin ? ($.guanjiaPlugin.QMStartUp(16, '/traytip=3 /tipProblemid=1401 /tipSource=18 /tipType=0 /tipIdParam=0 /tipIconUrl="http://dldir2.qq.com/invc/xfspeed/qqpcmgr/clinic/image/tipsicon_qq.png" /tipTitle="QQ快速登录异常?" /tipDesc="不能用已登录的QQ号快速登录，只能手动输入账号密码，建议用电脑诊所一键修复。"'), $.report.monitor("316548")) : $.report.monitor("316549")
    },
    showLoading: function(t) {
        pt.login.hideOperate(),
        pt.login.hide_err(),
        $.css.show($("loading_tips")),
        $("loading_wording").innerHTML = t
    },
    hideLoading: function() {
        $.css.hide($("loading_tips"))
    },
    showOperate: function() {
        "2052" == pt.ptui.lang && (pt.login.hideLoading(), pt.login.hide_err(), $.css.show($("operate_tips")))
    },
    hideOperate: function() {
        pt.login.need_hide_operate_tips && $.css.hide($("operate_tips"))
    },
    showLowList: function() {
        var t = $("combox_list");
        t && ($.css.show(t), pt.login.low_login_isshow = !0)
    },
    hideLowList: function() {
        var t = $("combox_list");
        t && ($.css.hide(t), pt.login.low_login_isshow = !1)
    },
    u_focus: function() {
        "" == $("u").value && ($.css.show($("uin_tips")), $("uin_tips").className = "input_tips_focus"),
        $("u").parentNode.className = "inputOuter_focus"
    },
    u_blur: function() {
        pt.login.hideOperate(),
        "" == $("u").value ? ($.css.show($("uin_tips")), $("uin_tips").className = "input_tips") : (pt.login.set_accout(), pt.login.check()),
        $("u").parentNode.className = "inputOuter"
    },
    window_blur: function() {
        pt.login.lastCheckAccout = ""
    },
    u_change: function() {
        pt.login.set_accout(),
        pt.login.passwordErrorNum = 1,
        pt.login.hasCheck = !1,
        pt.login.hasSubmit = !1
    },
    list_keydown: function(t, e) {
        {
            var i = $("email_list");
            $("u")
        }
        if (1 == e) var i = $("combox_list");
        var n = i.getElementsByTagName("li"),
        o = n.length,
        r = t.keyCode;
        switch (r) {
        case pt.login.keyCode.UP:
            n[pt.login.list_index[e]].className = "",
            pt.login.list_index[e] = (pt.login.list_index[e] - 1 + o) % o,
            n[pt.login.list_index[e]].className = "hover";
            break;
        case pt.login.keyCode.DOWN:
            n[pt.login.list_index[e]].className = "",
            pt.login.list_index[e] = (pt.login.list_index[e] + 1) % o,
            n[pt.login.list_index[e]].className = "hover";
            break;
        case pt.login.keyCode.ENTER:
            var a = n[pt.login.list_index[e]].innerHTML;
            0 == e && ($("u").value = $.str.decodeHtml(a)),
            pt.login.hideEmailTips(),
            pt.login.hideLowList(),
            t.preventDefault();
            break;
        case pt.login.keyCode.TAB:
            pt.login.hideEmailTips(),
            pt.login.hideLowList()
        }
        1 == e && ($("combox_box").innerHTML = n[pt.login.list_index[e]].innerHTML, $("low_login_hour").value = n[pt.login.list_index[e]].getAttribute("value"))
    },
    u_keydown: function(t) {
        $.css.hide($("uin_tips")),
        -1 != pt.login.list_index[0] && pt.login.list_keydown(t, 0)
    },
    u_keyup: function(t) {
        var e = this.value;
        "" == e ? ($.css.show($("uin_tips")), $.css.hide($("uin_del"))) : $.css.show($("uin_del"));
        var i = t.keyCode;
        i != pt.login.keyCode.UP && i != pt.login.keyCode.DOWN && i != pt.login.keyCode.ENTER && i != pt.login.keyCode.TAB && i != pt.login.keyCode.F5 && ($("u").value.indexOf("@") > -1 ? (pt.login.showEmailTips(), pt.login.createEmailTips($("u").value)) : pt.login.hideEmailTips())
    },
    email_mousemove: function(t) {
        var e = t.target;
        if ("li" == e.tagName.toLowerCase()) {
            var i = $("emailTips_" + pt.login.list_index[0]);
            i && (i.className = ""),
            e.className = "hover",
            pt.login.list_index[0] = parseInt(e.getAttribute("id").substring(10)),
            t.stopPropagation()
        }
    },
    email_click: function(t) {
        var e = t.target;
        if ("li" == e.tagName.toLowerCase()) {
            var i = $("emailTips_" + pt.login.list_index[0]);
            i && ($("u").value = $.str.decodeHtml(i.innerHTML), pt.login.set_accout(), pt.login.check()),
            pt.login.hideEmailTips(),
            t.stopPropagation()
        }
    },
    p_focus: function() {
        "" == this.value && ($.css.show($("pwd_tips")), $("pwd_tips").className = "input_tips_focus"),
        this.parentNode.className = "inputOuter_focus",
        pt.login.check()
    },
    p_blur: function() {
        "" == this.value && ($.css.show($("pwd_tips")), $("pwd_tips").className = "input_tips"),
        $.css.hide($("caps_lock_tips")),
        this.parentNode.className = "inputOuter"
    },
    p_keydown: function() {
        $.css.hide($("pwd_tips"));

    },
    p_keyup: function() {
        "" == this.value && $.css.show($("pwd_tips"))
    },
    p_keypress: function(t) {
        pt.login.detectCapsLock(t) ? $.css.show($("caps_lock_tips")) : $.css.hide($("caps_lock_tips"))
    },
    vc_focus: function() {
        "" == this.value && ($.css.show($("vc_tips")), $("vc_tips").className = "input_tips_focus"),
        this.parentNode.className = "inputOuter_focus"
    },
    vc_blur: function() {
        "" == this.value && ($.css.show($("vc_tips")), $("vc_tips").className = "input_tips"),
        this.parentNode.className = "inputOuter"
    },
    vc_keydown: function() {
        $.css.hide($("vc_tips"))
    },
    vc_keyup: function() {
        "" == this.value && $.css.show($("vc_tips"))
    },
    document_click: function() {
        pt.login.action[0]++,
        pt.login.hideEmailTips(),
        pt.login.hideLowList()
    },
    document_keydown: function() {
        pt.login.action[1]++
    },
    checkbox_click: function(t) {
        var e = t.target;
        "low_login_wording" == e.id && (e = $("low_login_enable")),
        "auth_low_login_wording" == e.id && (e = $("auth_low_login_enable")),
        e.className = pt.login.low_login_enable ? "uncheck": "checked",
        pt.login.low_login_enable = !pt.login.low_login_enable
    },
    feedback: function(t) {
        var e = t ? t.target: null,
        i = e ? e.id + "-": "",
        n = "http://support.qq.com/write.shtml?guest=1&fid=713&SSTAG=hailunna-" + i + $.str.encodeHtml(pt.login.accout);
        window.open(n)
    },
    bind_account: function() {
        $.css.hide($("operate_tips")),
        pt.login.need_hide_operate_tips = !0,
        window.open("http://id.qq.com/index.html#account"),
        $.report.monitor("234964")
    },
    combox_click: function(t) {
        pt.login.low_login_isshow ? pt.login.hideLowList() : pt.login.showLowList(),
        t.stopPropagation()
    },
    switchpage: function(t) {
        var e = t.origin,
        i = new RegExp("http(s){0,1}://(ssl.){0,1}xui.ptlogin2." + pt.ptui.domain);
        i.test(e) ? (pt.login.setQloginState(t.data), "3" == pt.login.getQloginState() && pt.preload.switchpage(!0)) : "hidePtui" == t.data
    },
    setQloginState: function(t) {
        pt.login.xuiState = t
    },
    getQloginState: function() {
        return pt.login.xuiState
    },
    checkQloginState: function() {
        var t = 2e3;
        $.check.isSsl() ? t = 4e3: window.g_cdn_js_fail && "msie" == $.browser("type") && (t = 5e3),
        window.setTimeout(function() {
            if ($.loginQQnum > 0) {
                var t = pt.login.getQloginState(),
                e = $.cookie.get("ptui_qstatus");
                "2" != t && "2" != e && (pt.preload.switchpage(!0), "1" == t && Math.random() < .1 && (e ? $.report.nlog("没有收到xui跨域消息(3)", 282313) : $.report.nlog("没有收到xui跨域消息(2)", 282482))),
                3 == t && (pt.login.showAssistant(1), pt.login.showGuanjiaTips())
            } else 1 == $.sso_state && /windows/.test(navigator.userAgent.toLowerCase()) ? pt.login.showAssistant(0) : 2 == $.sso_state && /windows/.test(navigator.userAgent.toLowerCase()) && pt.login.showAssistant(3)
        },
        t),
        $("u").value && 0 == pt.ptui.auth_mode && pt.login.check(),
        5 == $.cookie.get("pt_qlogincode") && $.report.monitor("300967")
    },
    delUin: function(t) {
        t && $.css.hide(t.target),
        $("u").value = "",
        pt.login.domFocus($("u"))
    },
    check_cdn_img: function() {
        if (window.g_cdn_js_fail && !pt.ptui.isHttps) {
            var t = new Image;
            t.onload = function() {
                t.onload = t.onerror = null
            },
            t.onerror = function() {
                t.onload = t.onerror = null;
                var e = $("main_css").innerHTML,
                i = "http://imgcache.qq.com/ptlogin/v4/style/11/images/",
                n = "http://ui.ptlogin2.qq.com/style/11/images/";
                e = e.replace(new RegExp(i, "g"), n),
                pt.login.insertInlineCss(e),
                $.report.monitor(312520)
            },
            t.src = "http://imgcache.qq.com/ptlogin/v4/style/11/images/icon_3.png"
        }
    },
    insertInlineCss: function(t) {
        if (document.createStyleSheet) {
            var e = document.createStyleSheet("");
            e.cssText = t
        } else {
            var i = document.createElement("style");
            i.type = "text/css",
            i.textContent = t,
            document.getElementsByTagName("head")[0].appendChild(i)
        }
    },
    checkInputLable: function() {
        try {
            $("u").value && $.css.hide($("uin_tips")),
            window.setTimeout(function() {
                $("p").value && $.css.hide($("pwd_tips"))
            },
            1e3)
        } catch(t) {}
    },
    domLoad: function() {
        pt.login.checkInputLable(),
        pt.login.checkNPLoad(),
        pt.preload.loadQrCss();
        var t = $("loading_img");
        t && t.setAttribute("src", t.getAttribute("place_src")),
        pt.login.check_cdn_img(),
        window.setTimeout(function() {
            pt.preload.ptui_notifySize("login"),
            0 == pt.ptui.auth_mode && pt.preload.initFocus(document.loginform)
        },
        0),
        pt.login.checkQloginState(),
        window.setTimeout(function() {
            $.http.loadScript(pt.ptui.jsPath + "/monitor.js")
        },
        2e3),
        window.setTimeout(function() {
            if (pt.preload.hasReportAuth) {
                g_pt_auth_report_img = new Image;
                var t = "https:" == location.protocol ? "https://ssl.qq.com/ptlogin/cgi-bin/ptlogin_report?": "http://log.wtlogin.qq.com/cgi-bin/ptlogin_report?",
                e = window.g_superuin,
                i = window.g_superuin,
                n = 6,
                o = pt.ptui.appid,
                r = document.forms[0].u1.value,
                a = encodeURIComponent("auth_statistics:|" + n + "|" + o + "|" + e + "|" + i + "|" + r + "|" + window.navigator.userAgent);
                t += "msg=" + a + "&v=" + Math.random(),
                g_pt_auth_report_img.onload = g_pt_auth_report_img.onerror = function() {
                    g_pt_auth_report_img.onload = g_pt_auth_report_img.onerror = null
                },
                g_pt_auth_report_img.src = t
            }
        },
        12e5)
    },
    checkNPLoad: function() {
        navigator.mimeTypes["application/nptxsso"] && !$.sso_loadComplete && ($.checkNPPlugin(), window.setTimeout(function() {
            var t = "chrome" == $.browser("type") && parseInt($.browser("version")) >= 32; ! $.sso_loadComplete && t && pt.login.showAssistant(4)
        },
        200), window.console && console.log("np 回调没执行"))
    },
    noscript_err: function() {
        $.report.nlog("noscript_err", 316648),
        $("noscript_area").style.display = "none"
    },
    bindEvent: function() {
        var t = $("u"),
        e = $("p"),
        i = $("verifycode"),
        n = $("verifyimgArea"),
        o = $("login_button"),
        r = $("low_login_enable"),
        a = $("email_list"),
        s = ($("feedback_web"), $("feedback_qr"), $("feedback_qlogin"), $("low_login_wording")),
        p = $("close"),
        l = $("switch_qlogin"),
        c = $("switch_login"),
        u = $("uin_del"),
        g = $("qrswitch_logo"),
        h = $("bind_account"),
        d = $("cancleAuth"),
        m = $("authClose"),
        f = $("auth_area"),
        _ = $("auth_low_login_enable");
        f && ($.e.add(f, "click", pt.login.authLogin), $.e.add(f, "mousedown", pt.login.authMouseDowm), $.e.add(f, "mouseup", pt.login.authMouseUp)),
        d && $.e.add(d, "click", pt.preload.cancleAuth),
        m && $.e.add(m, "click", pt.login.ptui_notifyClose),
        l && $.e.add(l, "click",
        function() {
            pt.preload.switchpage(!1)
        }),
        g && $.e.add(g, "click", pt.login.switch_qrlogin),
        c && $.e.add(c, "click",
        function(t) {
            t.preventDefault(),
            pt.preload.switchpage(!0)
        }),
        h && ($.e.add(h, "click", pt.login.bind_account), $.e.add(h, "mouseover",
        function() {
            pt.login.need_hide_operate_tips = !1
        }), $.e.add(h, "mouseout",
        function() {
            pt.login.need_hide_operate_tips = !0
        })),
        p && $.e.add(p, "click", pt.login.ptui_notifyClose),
        1 == pt.ptui.low_login && r && ($.e.add(r, "click", pt.login.checkbox_click), $.e.add(s, "click", pt.login.checkbox_click)),
        1 == pt.ptui.low_login && _ && ($.e.add(_, "click", pt.login.checkbox_click), $.e.add($("auth_low_login_wording"), "click", pt.login.checkbox_click)),
        $.e.add(t, "focus", pt.login.u_focus),
        $.e.add(t, "blur", pt.login.u_blur),
        $.e.add(t, "change", pt.login.u_change),
        $.e.add(t, "keydown", pt.login.u_keydown),
        $.e.add(t, "keyup", pt.login.u_keyup),
        $.e.add(t, "click", pt.login.showOperate),
        $.e.add(u, "click", pt.login.delUin),
        $.e.add(e, "focus", pt.login.p_focus),
        $.e.add(e, "blur", pt.login.p_blur),
        $.e.add(e, "keydown", pt.login.p_keydown),
        $.e.add(e, "keyup", pt.login.p_keyup),
        $.e.add(e, "keypress", pt.login.p_keypress),
        $.e.add(o, "click", pt.login.submit),
        $.e.add(n, "click", pt.login.changeVC),
        $.e.add(a, "mousemove", pt.login.email_mousemove),
        $.e.add(a, "click", pt.login.email_click),
        $.e.add(document, "click", pt.login.document_click),
        $.e.add(document, "keydown", pt.login.document_keydown),
        $.e.add(i, "focus", pt.login.vc_focus),
        $.e.add(i, "blur", pt.login.vc_blur),
        $.e.add(i, "keydown", pt.login.vc_keydown),
        $.e.add(i, "keyup", pt.login.vc_keyup),
        $.e.add(window, "message", pt.login.switchpage),
        $("qrlogin") && ($("qrlogin").style.visibility = "hidden");
        var v = $("vip_link2");
        v && $.e.add(v, "click",
        function(t) {
            window.open("http://pay.qq.com/qqvip/index.shtml?aid=vip.gongneng.other.red.dengluweb_wording2_open"),
            t.preventDefault(),
            $.report.monitor("263482")
        });
        var w = $("noscript_img");
        w && ($.e.add(w, "load", pt.login.noscript_err), $.e.add(w, "error", pt.login.noscript_err))
    },
    showVC: function() {
        pt.login.vcFlag = !0,
        $.css.show($("verifyArea")),
        $("verifycode").value = "",
        pt.preload.ptui_notifySize("login");
        var t = $("verifyimg"),
        e = pt.login.getVCUrl();
        t.src = e
    },
    hideVC: function() {
        pt.login.vcFlag = !1,
        $.css.hide($("verifyArea")),
        pt.preload.ptui_notifySize("login")
    },
    changeVC: function(t) {
        var e = $("verifyimg"),
        i = pt.login.getVCUrl();
        e.src = i,
        t && t.preventDefault()
    },
    getVCUrl: function() {
        var t = pt.login.at_accout,
        e = (pt.ptui.domain, pt.ptui.appid),
        i = pt.login.verifycodeUrl + "?uin=" + t + "&aid=" + e + "&cap_cd=" + pt.login.cap_cd + "&" + Math.random();
        return i
    },
    checkValidate: function(t) {
        try {
            var e = t.u,
            i = t.p,
            n = t.verifycode;
            if ("" == $.str.trim(e.value)) return pt.login.show_err(pt.str.no_uin),
            pt.login.domFocus(e),
            !1;
            if ($.check.isNullQQ(e.value)) return pt.login.show_err(pt.str.inv_uin),
            pt.login.domFocus(e),
            !1;
            if ("" == i.value) return pt.login.show_err(pt.str.no_pwd),
            pt.login.domFocus(i),
            !1;
            if ("" == n.value) return pt.login.needVc || pt.login.vcFlag ? (pt.login.show_err(pt.str.no_vcode), pt.login.domFocus(n)) : (pt.login.checkResultReport(14), clearTimeout(pt.login.checkClock), pt.login.showVC()),
            !1;
            if (n.value.length < 4) return pt.login.show_err(pt.str.inv_vcode),
            pt.login.domFocus(n),
            n.select(),
            !1
        } catch(o) {}
        return ! 0
    },
    checkTimeout: function() {
        var t = $.str.trim($("u").value); ($.check.isQQ(t) || $.check.isQQMail(t)) && (pt.login.salt = $.str.uin2hex(t.replace("@qq.com", "")), pt.login.showVC(), pt.login.isCheckTimeout = !0, pt.login.checkRet = 1, pt.login.cap_cd = 0),
        $.report.monitor(216082)
    },
    loginTimeout: function() {
        pt.login.loginResultReport(13),
        pt.login.showAssistant(2)
    },
    check: function() {
        if (pt.login.accout || pt.login.set_accout(), $.check.isNullQQ(pt.login.accout)) return pt.login.show_err(pt.str.inv_uin),
        !1;
        if (pt.login.accout != pt.login.lastCheckAccout && "" != pt.login.accout) {
            pt.login.ptui_uin(pt.login.accout),
            pt.login.lastCheckAccout = pt.login.accout;
            var t = pt.ptui.appid,
            e = pt.login.getCheckUrl(pt.login.at_accout, t);
            pt.login.isCheckTimeout = !1,
            g_time.time6 = new Date,
            clearTimeout(pt.login.checkClock),
            pt.login.checkClock = setTimeout("pt.login.checkTimeout();", 5e3),
            $.http.loadScript(e)
        }
    },
    getCheckUrl: function(t, e) {
        var i = pt.login.checkUrl + "?regmaster=" + pt.ptui.regmaster + "&pt_tea=1&";
        return i += "uin=" + t + "&appid=" + e + "&js_ver=" + pt.ptui.ptui_version + "&js_type=" + pt.login.js_type + "&login_sig=" + pt.ptui.login_sig + "&u1=" + encodeURIComponent(document.forms[0].u1.value) + "&r=" + Math.random()
    },
    getSubmitUrl: function(t) {
        for (var e = document.forms[0], i = pt.login.loginUrl + t + "?", n = document.getElementById("login2qq"), o = 0; o < e.length; o++) if ("ptqrlogin" != t || "u" != e[o].name && "p" != e[o].name && "verifycode" != e[o].name && "h" != e[o].name) if ("ipFlag" != e[o].name || e[o].checked) {
            console.log(e[o]);
            if ("fp" != e[o].name && "submit" != e[o].type && ("ptredirect" == e[o].name && (g_ptredirect = e[o].value), ("low_login_hour" != e[o].name || pt.login.low_login_enable) && ("webqq_type" != e[o].name || n || e[o].checked))) if (i += e[o].name, i += "=", "u" != e[o].name) {
                if ("p" == e[o].name) {
                    var r = e.p.value,
                    a = e.verifycode.value.toUpperCase(),
                    s = $.Encryption.getEncryption(r, pt.login.salt, a);
                    i += s
                } else if ("u1" == e[o].name || "ep" == e[o].name) {
                    var p = e[o].value,
                    l = "";
                    if ("1003903" == pt.ptui.appid && n) {
                        l = /\?/g.test(p) ? "&": "?";
                        var c = document.getElementById("webqq_type").value;
                        l += "login2qq=" + n.value + "&webqq_type=" + c
                    }
                    i += encodeURIComponent(p + l)
                } else i += e[o].value;
                i += "&"
            } else i += encodeURIComponent(pt.login.at_accout) + "&"
        } else i += e[o].name + "=-1&";
        return i += "low_login_enable=" + (1 == pt.ptui.low_login && pt.login.low_login_enable ? "1&low_login_hour=720": 0) + "&regmaster=" + pt.ptui.regmaster + "&fp=loginerroralert&action=" + pt.login.action.join("-") + "-" + (new Date - 0) + "&mibao_css=" + pt.ptui.mibao_css + "&t=" + pt.login.passwordErrorNum + "&g=1",
        i += "&js_ver=" + pt.ptui.ptui_version + "&js_type=" + pt.login.js_type + "&login_sig=" + pt.ptui.login_sig,
        i += "&pt_uistyle=" + pt.ptui.style,
        i += "&pt_randsalt=" + (pt.login.isRandSalt || 0),
        "0" != pt.ptui.csimc && (i += "&csimc=" + pt.ptui.csimc + "&csnum=" + pt.ptui.csnum + "&authid=" + pt.ptui.authid),
        1 == $.bom.query("pt_safe") && (i += "&ptmbproto=1"),
        "1" == pt.ptui.pt_qzone_sig && (i += "&pt_qzone_sig=1"),
        "1" == pt.ptui.pt_light && (i += "&pt_light=1"),
        "0" != pt.ptui.pt_3rd_aid && (i += "&pt_3rd_aid=" + pt.ptui.pt_3rd_aid),
        "login" == t && (i += "&pt_vcode_v1=0", i += "&pt_verifysession_v1=" + (pt.login.pt_verifysession || $.cookie.get("verifysession"))),
        i
    },
    submit: function(t) {
        if (pt.login.submitTime = (new Date).getTime(), t && t.preventDefault(), !pt.login.ptui_onLogin(document.loginform)) return ! 1;
        if ($.cookie.set("ptui_loginuin", escape(document.loginform.u.value), pt.ptui.domain, "/", 720), -1 == pt.login.checkRet || 3 == pt.login.checkRet) return pt.login.show_err(pt.login.checkErr[pt.ptui.lang]),
        pt.login.lastCheckAccout = "",
        void pt.login.domFocus($("p"));
        pt.login.isCheckTimeout && pt.login.checkResultReport(14),
        g_time.time12 = new Date,
        clearTimeout(pt.login.loginClock),
        pt.login.loginClock = setTimeout("pt.login.loginTimeout();", 5e3);
        var e = pt.login.getSubmitUrl("login");
        return $.winName.set("login_param", encodeURIComponent(pt.login.login_param)),
        pt.login.showLoading(pt.str.h_loading_wording),
        pt.login.isVCSessionTimeOut() && !pt.login.needVc ? (pt.login.lastCheckAccout = "", pt.login.check(), window.setTimeout(function() {
            pt.login.submit()
        },
        1e3)) : $.http.loadScript(e),
        !1
    },
    isVCSessionTimeOut: function() {
        return pt.login.checkTime = pt.login.checkTime || (new Date).getTime(),
        pt.login.submitTime - pt.login.checkTime > 12e5 ? ($.report.monitor(330323, .05), !0) : !1
    },
    getAuthLoginUrl: function() {
        var t = $.str.decodeHtml($("auth_area").getAttribute("authUrl"));
        return t += "&regmaster=" + pt.ptui.regmaster + "&aid=" + pt.ptui.appid + "&s_url=" + encodeURIComponent(document.forms[0].u1.value),
        1 == pt.ptui.low_login && pt.login.low_login_enable && (t += "&low_login_enable=1&low_login_hour=720"),
        t
    },
    authLogin: function() {
        var t = pt.login.getAuthLoginUrl();
        switch (pt.ptui.target) {
        case "_self":
            location.href = t;
            break;
        case "_top":
            top.location.href = t;
            break;
        case "_parent":
            parent.location.href = t;
            break;
        default:
            top.location.href = t
        }
    },
    authMouseDowm: function() {
        var t = $("auth_mengban");
        t && (t.className = "face_mengban")
    },
    authMouseUp: function() {
        var t = $("auth_mengban");
        t && (t.className = "")
    },
    resultReport: function(t, e, i) {
        var n = "http://isdspeed.qq.com/cgi-bin/v.cgi?flag1=" + t + "&flag2=" + e + "&flag3=" + i,
        o = new Image;
        o.src = n
    },
    checkResultReport: function(t) {
        if (! (pt.ptui.isHttps || Math.random() > .1)) {
            var e = 170025,
            i = 0,
            n = t;
            switch (t) {
            case 11:
            case 12:
            case 13:
                i = 1;
                break;
            case 14:
            case 15:
                i = 2
            }
            0 != i && pt.login.resultReport(e, i, n)
        }
    },
    loginResultReport: function(t) {
        if (! (pt.ptui.isHttps || Math.random() > .1)) {
            var e = 170026,
            i = 0,
            n = t;
            switch (t) {
            case 11:
            case 12:
                i = 1;
                break;
            case 13:
                i = 2
            }
            0 != i && pt.login.resultReport(e, i, n)
        }
    },
    _ptui_notifyClose: function(t) {
        if (window.clearInterval(pt.login.qrlogin_clock), "1" == pt.ptui.no_drop_domain) {
            t && t.preventDefault();
            var e = {};
            e.action = "close",
            pt.crossMessage(e)
        } else try {
            parent.ptlogin2_onClose ? parent.ptlogin2_onClose() : top == this && window.close()
        } catch(t) {
            window.close()
        }
    },
    ptui_notifyClose: function(t) {
        if (pt.preload.hasReportAuth && !pt.login.hasClose) {
            pt.login.hasClose = !0;
            var e = window.setTimeout(function() {
                $.report.monitor("361944"),
                pt.login._ptui_notifyClose(t)
            },
            3e3);
            g_pt_auth_report_img = new Image;
            var i = "https:" == location.protocol ? "https://ssl.qq.com/ptlogin/cgi-bin/ptlogin_report?": "http://log.wtlogin.qq.com/cgi-bin/ptlogin_report?",
            n = window.g_superuin,
            o = window.g_superuin,
            r = 2,
            a = pt.ptui.appid,
            s = document.forms[0].u1.value,
            p = encodeURIComponent("auth_statistics:|" + r + "|" + a + "|" + n + "|" + o + "|" + s + "|" + window.navigator.userAgent);
            i += "msg=" + p + "&v=" + Math.random(),
            g_pt_auth_report_img.onload = g_pt_auth_report_img.onerror = function() {
                g_pt_auth_report_img.onload = g_pt_auth_report_img.onerror = null,
                window.clearTimeout(e),
                pt.login._ptui_notifyClose(t)
            },
            g_pt_auth_report_img.src = i
        } else pt.login._ptui_notifyClose(t)
    },
    ptui_onLogin: function(t) {
        var e = !0;
        e = pt.login.checkValidate(t);
        try {
            if ("function" == typeof parent.ptlogin2_onLogin && !parent.ptlogin2_onLogin()) return ! 1;
            if ("function" == typeof parent.ptlogin2_onLoginEx) {
                var i = t.u.value,
                n = t.verifycode.value;
                if (!parent.ptlogin2_onLoginEx(i, n)) return ! 1
            }
        } catch(o) {}
        return e
    },
    ptui_uin: function(t) {
        try {
            "function" == typeof parent.ptui_uin && parent.ptui_uin(t)
        } catch(e) {}
    },
    is_mibao: function(t) {
        return /^http(s)?:\/\/ui.ptlogin2.(\S)+\/cgi-bin\/mibao_vry/.test(t)
    },
    get_qrlogin_pic: function() {
        var t = "ptqrshow",
        e = (pt.ptui.isHttps ? "https://ssl.": "http://") + "ptlogin2." + pt.ptui.domain + "/" + t + "?";
        return 2 == pt.ptui.regmaster ? e = "http://ptlogin2.function.qq.com/" + t + "?regmaster=2&": 3 == pt.ptui.regmaster && (e = "http://ptlogin2.crm2.qq.com/" + t + "?regmaster=3&"),
        e += "appid=" + pt.ptui.appid + "&e=2&l=M&s=3&d=72&v=4&t=" + Math.random(),
        pt.ptui.daid && (e += "&daid=" + pt.ptui.daid),
        e
    },
    go_qrlogin_step: function(t) {
        switch (t) {
        case 1:
            $("qrlogin_step1").style.display = "block",
            $("qrlogin_step2").style.display = "none";
            break;
        case 2:
            $("qrlogin_step1").style.display = "none",
            $("qrlogin_step2").style.display = "block"
        }
    },
    adjustLoginsize: function() {
        var t = pt.login.isQrLogin;
        $("web_qr_login").style.height = t ? ($("qrlogin").offsetHeight || 265) + "px": $("web_login").offsetHeight + "px"
    },
    switch_qrlogin_animate: function() {
        var t = pt.login.isQrLogin,
        e = $("web_qr_login_show"),
        i = 0;
        t ? (i = -$("web_login").offsetHeight, $("web_qr_login").style.height = ($("qrlogin").offsetHeight || 265) + "px", $("qrlogin").style.visibility = "", $("web_login").style.visibility = "hidden") : (i = 0, $("web_qr_login").style.height = $("web_login").offsetHeight + "px", $("web_login").style.visibility = "", $("qrlogin").style.visibility = "hidden"),
        $.animate.animate(e, {
            top: i
        },
        30, 20)
    },
    changeBottom: function() {
        2 == pt.preload.getLoginStatus() ? $("bottom_qlogin") && $.css.show($("bottom_qlogin")) : $("bottom_qlogin") && $.css.hide($("bottom_qlogin"))
    },
    begin_qrlogin: function() {
        pt.login.cancle_qrlogin(),
        $("qrlogin_img").src = pt.login.get_qrlogin_pic(),
        pt.login.qrlogin_clock = window.setInterval("pt.login.qrlogin_submit();", 2e3),
        pt.login.qrlogin_timeout = window.setTimeout(function() {
            pt.login.switch_qrlogin()
        },
        pt.login.qrlogin_timeout_time)
    },
    cancle_qrlogin: function() {
        window.clearInterval(pt.login.qrlogin_clock),
        window.clearTimeout(pt.login.qrlogin_timeout)
    },
    switch_qrlogin: function(t) {
        t && t.preventDefault(),
        pt.login.isQrLogin ? (pt.login.cancle_qrlogin(), $("qrswitch_logo").title = "二维码登录", $("qrswitch_logo").className = "qrswitch_logo", $.report.monitor("273368", .05)) : (pt.login.go_qrlogin_step(1), pt.login.begin_qrlogin(), $("qrswitch_logo").title = "返回", $("qrswitch_logo").className = "qrswitch_logo_qr", $.report.monitor("273367", .05)),
        pt.login.isQrLogin = !pt.login.isQrLogin,
        pt.login.changeBottom(),
        pt.login.switch_qrlogin_animate(),
        pt.preload.ptui_notifySize("login")
    },
    force_qrlogin: function() {},
    no_force_qrlogin: function() {},
    qrlogin_submit: function() {
        var t = pt.login.getSubmitUrl("ptqrlogin");
        $.winName.set("login_param", encodeURIComponent(pt.login.login_param)),
        $.http.loadScript(t)
    },
    getShortWord: function(t, e, i) {
        i = t.getAttribute("w") || i,
        e = e ? e: "";
        var n = "...";
        if (t.innerHTML = $.str.encodeHtml(e), t.clientWidth <= i);
        else for (var o = Math.min(e.length, 20), r = o; r > 0; r--) {
            var a = e.substring(0, r);
            if (t.innerHTML = $.str.encodeHtml(a + n), t.clientWidth <= i) break
        }
        t.style.width = i + "px"
    }
},
pt.login.init();