'use strict';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var Config = {
  LIB_VERSION: "3.3.7",
  LIB_NAME: "MG",
  LIB_STACK: "egret",
  BASE_URL: "https://turbo.api.plutus-cat.com/event_center/api/v1"
};

var _ = {};
var ArrayProto = Array.prototype,
  ObjProto = Object.prototype,
  slice = ArrayProto.slice,
  nativeToString = ObjProto.toString,
  nativeHasOwnProperty = Object.prototype.hasOwnProperty,
  nativeForEach = ArrayProto.forEach,
  nativeIsArray = Array.isArray,
  breaker = {};
_.isNumber = function (a) {
  return "number" === typeof a ? 0 === a - a : "string" === typeof a && "" !== a.trim() ? Number.isFinite ? Number.isFinite(+a) : isFinite(+a) : !1;
};
_.each = function (obj, iterator, context) {
  // eslint-disable-next-line
  if (obj === null || obj === undefined) {
    return false;
  }
  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
        return false;
      }
    }
  } else {
    for (var key in obj) {
      if (nativeHasOwnProperty.call(obj, key)) {
        if (iterator.call(context, obj[key], key, obj) === breaker) {
          return false;
        }
      }
    }
  }
};
_.extend = function (obj) {
  _.each(slice.call(arguments, 1), function (source) {
    for (var prop in source) {
      if (source[prop] !== void 0) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};
_.extend2Layers = function (obj) {
  _.each(slice.call(arguments, 1), function (source) {
    for (var prop in source) {
      if (source[prop] !== void 0) {
        if (_.isObject(source[prop]) && _.isObject(obj[prop])) {
          _.extend(obj[prop], source[prop]);
        } else {
          obj[prop] = source[prop];
        }
      }
    }
  });
  return obj;
};
_.isArray = nativeIsArray || function (obj) {
  return nativeToString.call(obj) === "[object Array]";
};
_.isFunction = function (f) {
  try {
    return typeof f === "function";
  } catch (x) {
    return false;
  }
};

//alipay request 类型
_.isPromise = function (obj) {
  return nativeToString.call(obj) === "[object Promise]" && obj !== null && obj !== undefined;
};
_.isObject = function (obj) {
  return nativeToString.call(obj) === "[object Object]" && obj !== null && obj !== undefined;
};
_.isEmptyObject = function (obj) {
  if (_.isObject(obj)) {
    for (var key in obj) {
      if (nativeHasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }
  return false;
};
_.isUndefined = function (obj) {
  return obj === void 0;
};
_.isString = function (obj) {
  return nativeToString.call(obj) === "[object String]";
};
_.isDate = function (obj) {
  return nativeToString.call(obj) === "[object Date]";
};
_.isBoolean = function (obj) {
  return nativeToString.call(obj) === "[object Boolean]";
};
_.isNumber = function (obj) {
  // eslint-disable-next-line no-useless-escape
  return nativeToString.call(obj) === "[object Number]" && /[\d\.]+/.test(String(obj));
};
_.isJSONString = function (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
_.decodeURIComponent = function (val) {
  var result = "";
  try {
    result = decodeURIComponent(val);
  } catch (e) {
    result = val;
  }
  return result;
};
_.encodeURIComponent = function (val) {
  var result = "";
  try {
    result = encodeURIComponent(val);
  } catch (e) {
    result = val;
  }
  return result;
};
_.utf8Encode = function (string) {
  string = (string + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  var utftext = "";
  var start, end;
  var stringl = 0;
  var n;
  start = end = 0;
  stringl = string.length;
  for (n = 0; n < stringl; n++) {
    var c1 = string.charCodeAt(n);
    var enc = null;
    if (c1 < 128) {
      end++;
    } else if (c1 > 127 && c1 < 2048) {
      enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128);
    } else {
      enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128);
    }
    if (enc !== null) {
      if (end > start) {
        utftext += string.substring(start, end);
      }
      utftext += enc;
      start = end = n + 1;
    }
  }
  if (end > start) {
    utftext += string.substring(start, string.length);
  }
  return utftext;
};
_.base64Encode = function (data) {
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1, o2, o3, h1, h2, h3, h4, bits;
  var i = 0,
    ac = 0,
    enc = "",
    tmpArr = [];
  if (!data) {
    return data;
  }
  data = _.utf8Encode(data);
  do {
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);
    bits = o1 << 16 | o2 << 8 | o3;
    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;
    tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);
  enc = tmpArr.join("");
  switch (data.length % 3) {
    case 1:
      enc = enc.slice(0, -2) + "==";
      break;
    case 2:
      enc = enc.slice(0, -1) + "=";
      break;
  }
  return enc;
};
_.encodeDates = function (obj) {
  _.each(obj, function (v, k) {
    if (_.isDate(v)) {
      obj[k] = _.formatDate(v);
    } else if (_.isObject(v)) {
      obj[k] = _.encodeDates(v);
    } else if (_.isArray(v)) {
      for (var i = 0; i < v.length; i++) {
        if (_.isDate(v[i])) {
          obj[k][i] = _.formatDate(v[i]);
        }
      }
    }
  });
  return obj;
};
_.formatDate = function (d) {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  function secondPad(n) {
    if (n < 100 && n > 9) return "0" + n;else if (n < 10) return "00" + n;else return n;
  }
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()) + "." + secondPad(d.getMilliseconds());
};
_.searchObjDate = function (o) {
  try {
    if (_.isObject(o) || _.isArray(o)) {
      _.each(o, function (a, b) {
        if (_.isObject(a) || _.isArray(a)) {
          _.searchObjDate(o[b]);
        } else {
          if (_.isDate(a)) {
            o[b] = _.formatDate(a);
          }
        }
      });
    }
  } catch (err) {
    logger.warn(err);
  }
};
_.UUID = function () {
  var visitTime = new Date().getTime();
  var uuid = "" + String(Math.random()).replace(".", "").slice(1, 11) + "-" + visitTime;
  return uuid;
};
_.UUIDv4 = function () {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      // eslint-disable-next-line eqeqeq
      v = c === "x" ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
_.setMpPlatform = function (mpPlatform) {
  _.mpPlatform = mpPlatform;
};
_.getMpPlatform = function () {
  return _.mpPlatform;
};
_.createExtraHeaders = function () {
  return {
    "GE-Integration-Type": Config.LIB_NAME,
    "GE-Integration-Version": Config.LIB_VERSION,
    "GE-Integration-Count": "1",
    "GE-Integration-Extra": _.getMpPlatform()
  };
};

// AppId 去空格
_.checkAppId = function (appId) {
  appId = appId.replace(/\s*/g, "");
  return appId;
};

// URL 去空格、pathname（文件名）、其他参数W
_.checkUrl = function (url) {
  url = url.replace(/\s*/g, "");
  url = _.url("basic", url);
  return url;
};
_.url = function () {
  function _t() {
    return new RegExp(/(.*?)\.?([^.]*?)\.(com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|net\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz)$/);
  }
  function _d(s) {
    return _.decodeURIComponent(s.replace(/\+/g, " "));
  }
  function _i(arg, str) {
    var sptr = arg.charAt(0);
    var split = str.split(sptr);
    if (sptr === arg) {
      return split;
    }
    arg = parseInt(arg.substring(1), 10);
    return split[arg < 0 ? split.length + arg : arg - 1];
  }
  function _f(arg, str) {
    var sptr = arg.charAt(0);
    var split = str.split("&");
    var field = [];
    var params = {};
    var tmp = [];
    var arg2 = arg.substring(1);
    for (var i = 0, ii = split.length; i < ii; i++) {
      field = split[i].match(/(.*?)=(.*)/);
      // TODO: regex should be able to handle this.
      if (!field) {
        field = [split[i], split[i], ""];
      }
      if (field[1].replace(/\s/g, "") !== "") {
        field[2] = _d(field[2] || "");
        // If we have a match just return it right away.
        if (arg2 === field[1]) {
          return field[2];
        }
        // Check for array pattern.
        tmp = field[1].match(/(.*)\[([0-9]+)\]/);
        if (tmp) {
          params[tmp[1]] = params[tmp[1]] || [];
          params[tmp[1]][tmp[2]] = field[2];
        } else {
          params[field[1]] = field[2];
        }
      }
    }
    if (sptr === arg) {
      return params;
    }
    return params[arg2];
  }
  return function (arg, url) {
    var _l = {},
      tmp;
    if (arg === "tld?") {
      return _t();
    }
    url = url || window.location.toString();
    if (!arg) {
      return url;
    }
    arg = arg.toString();
    if (url.match(/^mailto:([^/].+)/)) {
      tmp = url.match(/^mailto:([^/].+)/);
      _l.protocol = "mailto";
      _l.email = tmp[1];
    } else {
      // Ignore Hashbangs.
      if (url.match(/(.*?)\/#!(.*)/)) {
        tmp = url.match(/(.*?)\/#!(.*)/);
        url = tmp[1] + tmp[2];
      }
      // Hash.
      if (url.match(/(.*?)#(.*)/)) {
        tmp = url.match(/(.*?)#(.*)/);
        _l.hash = tmp[2];
        url = tmp[1];
      }
      // Return hash parts.
      if (_l.hash && arg.match(/^#/)) {
        return _f(arg, _l.hash);
      }
      // Query
      if (url.match(/(.*?)\?(.*)/)) {
        tmp = url.match(/(.*?)\?(.*)/);
        _l.query = tmp[2];
        url = tmp[1];
      }
      // Return query parts.
      if (_l.query && arg.match(/^\?/)) {
        return _f(arg, _l.query);
      }
      // Protocol.
      if (url.match(/(.*?):?\/\/(.*)/)) {
        tmp = url.match(/(.*?):?\/\/(.*)/);
        _l.protocol = tmp[1].toLowerCase();
        url = tmp[2];
      }
      // Path.
      if (url.match(/(.*?)(\/.*)/)) {
        tmp = url.match(/(.*?)(\/.*)/);
        _l.path = tmp[2];
        url = tmp[1];
      }
      // Clean up path.
      _l.path = (_l.path || "").replace(/^([^/])/, "/$1").replace(/\/$/, "");
      // Return path parts.
      if (arg.match(/^[-0-9]+$/)) {
        arg = arg.replace(/^([^/])/, "/$1");
      }
      if (arg.match(/^\//)) {
        return _i(arg, _l.path.substring(1));
      }
      // File.
      tmp = _i("/-1", _l.path.substring(1));
      if (tmp && (tmp = tmp.match(/(.*?)\.(.*)/))) {
        _l.file = tmp[0];
        _l.filename = tmp[1];
        _l.fileext = tmp[2];
      }
      // Port.
      if (url.match(/(.*):([0-9]+)$/)) {
        tmp = url.match(/(.*):([0-9]+)$/);
        _l.port = tmp[2];
        url = tmp[1];
      }
      // Auth.
      if (url.match(/(.*?)@(.*)/)) {
        tmp = url.match(/(.*?)@(.*)/);
        _l.auth = tmp[1];
        url = tmp[2];
      }
      // User and pass.
      if (_l.auth) {
        tmp = _l.auth.match(/(.*):(.*)/);
        _l.user = tmp ? tmp[1] : _l.auth;
        _l.pass = tmp ? tmp[2] : undefined;
      }
      // Hostname.
      _l.hostname = url.toLowerCase();
      // Return hostname parts.
      if (arg.charAt(0) === ".") {
        return _i(arg, _l.hostname);
      }
      // Domain, tld and sub domain.
      if (_t()) {
        tmp = _l.hostname.match(_t());
        if (tmp) {
          _l.tld = tmp[3];
          _l.domain = tmp[2] ? tmp[2] + "." + tmp[3] : undefined;
          _l.sub = tmp[1] || undefined;
        }
      }
      // Set port and protocol defaults if not set.
      var portInfo = _l.port ? ":" + _l.port : "";
      _l.protocol = _l.protocol || window.location.protocol.replace(":", "");
      // console.log(_l);
      _l.port = _l.port || (_l.protocol === "https" ? "443" : "80");
      _l.protocol = _l.protocol || (_l.port === "443" ? "https" : "http");
      _l.basic = _l.protocol + "://" + _l.hostname + portInfo;
    }
    // Return arg.
    if (arg in _l) {
      return _l[arg];
    }
    // Return everything.
    if (arg === "{}") {
      return _l;
    }
    // Default to undefined for no match.
    return "";
  };
}();
_.createString = function (length) {
  var expect = length;
  var str = Math.random().toString(36).substr(2);
  while (str.length < expect) {
    str += Math.random().toString(36).substr(2);
  }
  str = str.substr(0, length);
  return str;
};
_.createAesKey = function () {
  return _.createString(16);
};
_.setQuery = function (obj) {
  var str = [];
  for (var p in obj) if (obj.hasOwnProperty(p)) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  }
  return str.join("&");
};
_.generateEncryptyData = function (text, secretKey) {
  if (typeof secretKey === "undefined") {
    return text;
  }
  var pkey = secretKey["publicKey"];
  var v = secretKey["version"];
  if (typeof pkey === "undefined" || typeof v === "undefined") {
    return text;
  }
  if (typeof CryptoJS === "undefined" || typeof JSEncrypt === "undefined") {
    return text;
  }
  var strKey = _.createAesKey();
  try {
    var key = CryptoJS.enc.Utf8.parse(strKey);
    var data = CryptoJS.enc.Utf8.parse(JSON.stringify(text));
    var padding = _.isUndefined(CryptoJS.pad.Pkcs7) ? CryptoJS.pad.PKCS7 : CryptoJS.pad.Pkcs7;
    var aesStr = CryptoJS.AES.encrypt(data, key, {
      mode: CryptoJS.mode.ECB,
      padding: padding
    }).toString();
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(pkey);
    var rsaStr = encrypt.encrypt(strKey);
    if (rsaStr === false) {
      logger.warn("私钥加密失败，返回原数据");
      return text;
    }
    return {
      pkv: v,
      ekey: rsaStr,
      payload: aesStr
    };
  } catch (e) {
    logger.warn("数据加密失败，返回原数据: " + e);
  }
  return text;
};
var logger = _typeof(logger) === "object" ? logger : {};
logger.info = function () {
  if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === "object" && console.log && logger.enabled) {
    try {
      return console.log.apply(console, arguments);
    } catch (e) {
      console.log(arguments[0]);
    }
  }
};
logger.warn = function () {
  if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === "object" && console.log && logger.enabled) {
    try {
      return console.warn.apply(console, arguments);
    } catch (e) {
      console.warn(arguments[0]);
    }
  }
};

var PlatformProxy = /*#__PURE__*/function () {
  function PlatformProxy() {
    _classCallCheck(this, PlatformProxy);
    this.config = {
      persistenceName: "GravityEngine",
      persistenceNameOld: "GravityEngine_mg"
    };
  }
  _createClass(PlatformProxy, [{
    key: "getConfig",
    value:
    /**
     * 返回特定平台的特殊配置，如缓存名称，缓存配置等
     */
    function getConfig() {
      return this.config;
    }

    /**
     * 获取本地缓存数据
     * @param {string} name 本地缓存中指定的 key
     * @param {boolean} async 是否异步获取
     * @return 包含本地存储值的对象类型
     */
  }, {
    key: "getStorage",
    value: function getStorage(name, async, callback) {
      // if (async) logger.warn('GE: invalid storage configuration');
      var data = localStorage.getItem(name);
      if (async) {
        if (_.isJSONString(data)) {
          callback(JSON.parse(data));
        } else {
          callback({});
        }
      } else {
        if (_.isJSONString(data)) {
          return JSON.parse(data);
        } else {
          return {};
        }
      }
    }

    /**
     * 设置本地缓存
     * @param {string} name 本地缓存的 key
     * @param {string} value JSON 字符串
     */
  }, {
    key: "setStorage",
    value: function setStorage(name, value) {
      localStorage.setItem(name, value);
    }
  }, {
    key: "_setSystemProxy",
    value: function _setSystemProxy(callback) {
      this._sysCallback = callback;
    }
    /**
     * 异步获取系统信息
     * @param {object} options 成功和结束后的回调函数
     * 当成功获取系统信息后，res 参数包含：
     *   brand         string  设备品牌
     *   model         string  设备型号
     *   screenWidth   number  屏幕宽度，单位px
     *   screenHeight  number  屏幕高度，单位px
     *   system        string  操作系统及版本
     *   platform      string  客户端平台
     */
  }, {
    key: "getSystemInfo",
    value: function getSystemInfo(options) {
      var res = {
        // eslint-disable-next-line
        mp_platform: "web",
        system: this._getOs(),
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        systemLanguage: navigator.language
      };
      if (this._sysCallback) {
        res = _.extend(res, this._sysCallback(options));
      }
      options.success(res);
      options.complete();
    }
  }, {
    key: "_getOs",
    value: function _getOs() {
      var a = navigator.userAgent;
      if (/Windows/i.test(a)) {
        if (/Phone/.test(a) || /WPDesktop/.test(a)) {
          return "Windows Phone";
        }
        return "Windows";
      } else if (/(iPhone|iPad|iPod)/.test(a)) {
        return "iOS";
      } else if (/Android/.test(a)) {
        return "Android";
      } else if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
        return "BlackBerry";
      } else if (/Mac/i.test(a)) {
        return "MacOS";
      } else if (/Linux/.test(a)) {
        return "Linux";
      } else if (/CrOS/.test(a)) {
        return "ChromeOS";
      } else {
        return "";
      }
    }

    /**
     * 异步获取网络类型
     * @param {object} options 成功和结束后的回调函数
     * res.networkType string 网络类型
     */
  }, {
    key: "getNetworkType",
    value: function getNetworkType(options) {
      options.complete();
    }

    /**
     * 监听网络状态变化事件
     * @param {function} callback 网络状态变化后的回调
     */
  }, {
    key: "onNetworkStatusChange",
    value: function onNetworkStatusChange() {}

    /**
     * 发起网络请求
     * @param {object} options 参数集合，包含：
     *   url       string         服务器接口地址
     *   data      string/object  请求的参数
     *   method    string         HTTP 请求方法
     *   success   function       请求成功的回调函数
     *   fail      function       请求失败的回调函数
     *   complete  function       请求结束的回调函数
     */
  }, {
    key: "request",
    value: function request(options) {
      var res = {};
      var xhr = new XMLHttpRequest();
      xhr.open(options.method, options.url);
      if (options.header) {
        for (var key in options.header) {
          xhr.setRequestHeader(key, options.header[key]);
        }
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          res["statusCode"] = 200;
          if (_.isJSONString(xhr.responseText)) {
            res["data"] = JSON.parse(xhr.responseText);
          }
          options.success(res);
        } else if (xhr.status !== 200) {
          res.errMsg = "network error";
          options.fail(res);
        }
      };
      xhr.ontimeout = function () {
        res.errMsg = "timeout";
        options.fail(res);
      };
      xhr.send(options.data);
      return xhr;
    }
  }, {
    key: "initAutoTrackInstance",
    value: function initAutoTrackInstance(instance, config) {
      this.instance = instance;
      this.autoTrack = config.autoTrack;
      var _that = this;
      if ("onpagehide" in window) {
        window.onpagehide = function () {
          _that.onPageHide(true);
        };
      } else {
        window.onbeforeunload = function () {
          _that.onPageHide(true);
        };
      }
      _that.onPageShow();
      if (_that.autoTrack.appHide) {
        _that.instance.timeEvent("ta_page_hide");
      }
      if ("onvisibilitychange" in document) {
        document.onvisibilitychange = function () {
          if (document.hidden) {
            _that.onPageHide(false);
          } else {
            _that.onPageShow();
            if (_that.autoTrack.appHide) {
              _that.instance.timeEvent("ta_page_hide");
            }
          }
        };
      }
    }
  }, {
    key: "setGlobal",
    value: function setGlobal(instance, name) {
      window[name] = instance;
    }

    /**
     * 获取系统启动信息，并注册 APP 切前台的回调
     * @TODO
     */
  }, {
    key: "getAppOptions",
    value: function getAppOptions() {}

    /**
     * 展示 toast. 在开启 Debug 模式的时候需要提示用户
     * @param {string} toast 内容
     */
  }, {
    key: "showToast",
    value: function showToast() {}
  }, {
    key: "onPageShow",
    value: function onPageShow() {
      if (this.autoTrack.appShow) {
        var properties = {};
        _.extend(properties, this.autoTrack.properties);
        if (_.isFunction(this.autoTrack.callback)) {
          _.extend(properties, this.autoTrack.callback("appShow"));
        }
        this.instance._internalTrack("ta_page_show", properties);
      }
    }
  }, {
    key: "onPageHide",
    value: function onPageHide(tryBeacon) {
      if (this.autoTrack.appHide) {
        var properties = {};
        _.extend(properties, this.autoTrack.properties);
        if (_.isFunction(this.autoTrack.callback)) {
          _.extend(properties, this.autoTrack.callback("appHide"));
        }
        this.instance._internalTrack("ta_page_hide", properties, new Date(), null, tryBeacon);
      }
    }
  }], [{
    key: "createInstance",
    value: function createInstance() {
      return new PlatformProxy();
    }
  }]);
  return PlatformProxy;
}();

//const DEFAULT_SHARE_DEPTH = 1;
var AutoTrackBridge = /*#__PURE__*/function () {
  function AutoTrackBridge(instance, config) {
    _classCallCheck(this, AutoTrackBridge);
    this.taInstance = instance;
    this.config = config || {};
    this.referrer = "Directly open";
    if (this.config.isPlugin) {
      instance.App = function () {
        App.apply(this, arguments);
      };
      inension(instance.Page);
    } else {
      var originalApp = App;
      App = this._initAppExtention(originalApp);
      var originalPage = Page;
      Page = this._initPageExtension(originalPage);
    }
  }
  _createClass(AutoTrackBridge, [{
    key: "_initPageExtension",
    value: function _initPageExtension(Page) {
      var _that = this;
      return function (page) {
        var onLoad = page.onLoad,
          onShow = page.onShow,
          onShareAppMessage = page.onShareAppMessage;
        var onLoadOption = {};
        page["onLoad"] = function (e) {
          onLoadOption = e || {};
          if (typeof onLoad === "function") {
            onLoad.call(this, e);
          }
        };
        page.onShow = function (options) {
          _that.onPageShow(onLoadOption);
          if (typeof onShow === "function") {
            onShow.call(this, options);
          }
        };
        if (typeof onShareAppMessage === "function") {
          page.onShareAppMessage = function (object) {
            var ret = onShareAppMessage.call(this, object);
            return _that.onPageShare(ret);
          };
        }
        return Page(page);
      };
    }
  }, {
    key: "_initAppExtention",
    value: function _initAppExtention(App) {
      var _that = this;
      return function (app) {
        var onLaunch = app.onLaunch,
          onShow = app.onShow,
          onHide = app.onHide;
        app.onLaunch = function (options) {
          _that.onAppLaunch(options, this);
          if (typeof onLaunch === "function") {
            onLaunch.call(this, options);
          }
        };
        app.onShow = function (options) {
          _that.onAppShow(options);
          if (typeof onShow === "function") {
            onShow.call(this, options);
          }
        };
        app.onHide = function () {
          _that.onAppHide();
          if (typeof onHide === "function") {
            onHide.call(this);
          }
        };
        return App(app);
      };
    }
  }, {
    key: "onAppLaunch",
    value: function onAppLaunch(options, app) {
      this._setAutoTrackProperties(options);
      if (!_.isUndefined(app)) {
        app[this.taInstance.name] = this.taInstance;
      }
      if (this.config.appLaunch) {
        var prop = {};
        if (options && options.path) {
          // prop["$url_path"] = this._getPath(options.path);
          prop["$url_query"] = _.setQuery(options.query);
          prop["$scene"] = String(options.scene);
        }
        this.taInstance._internalTrack("$MPLaunch", prop);
      }
    }
  }, {
    key: "onAppShow",
    value: function onAppShow(options) {
      if (this.config.appHide) {
        this.taInstance.timeEvent("$MPHide");
      }
      this._setAutoTrackProperties(options);
      if (this.config.appShow) {
        var prop = {};
        if (options && options.path) {
          prop["$url_path"] = this._getPath(options.path);
          prop["$url_query"] = _.setQuery(options.query);
          prop["$scene"] = String(options.scene);
        }
        _.extend(prop, this.config.properties);
        if (_.isFunction(this.config.callback)) {
          _.extend(prop, this.config.callback("appShow"));
        }
        this.taInstance._internalTrack("$MPShow", prop);
      }
    }
  }, {
    key: "onAppHide",
    value: function onAppHide() {
      if (this.config.appHide) {
        var prop = {
          // "$url_path": this._getCurrentPath(),
        };
        _.extend(prop, this.config.properties);
        if (_.isFunction(this.config.callback)) {
          _.extend(prop, this.config.callback("appHide"));
        }
        this.taInstance._internalTrack("$MPHide", prop);
      }
    }
  }, {
    key: "_getCurrentPath",
    value: function _getCurrentPath() {
      var url = "Not to get";
      try {
        // eslint-disable-next-line no-undef
        var pages = getCurrentPages();
        var currentPage = pages[pages.length - 1];
        url = currentPage.route; // 谨慎修改，字节跳动小程序需要替换此行代码. 如需修改，请同步修改 rollup.config.js
      } catch (e) {
        logger.info(e);
      }
      return url;
    }
  }, {
    key: "_setAutoTrackProperties",
    value: function _setAutoTrackProperties(options) {
      var props = {
        //   "#scene": options.scene,
      };

      // if (options && _.isObject(options.query) && options.query.tashare) {
      //     var shareInfo = _.decodeURIComponent(options.query.tashare);
      //     if (_.isJSONString(shareInfo)) {
      //         this.shareInfo = JSON.parse(shareInfo);
      //         props['#share_depth'] = _.isNumber(this.shareInfo.d) ? this.shareInfo.d : DEFAULT_SHARE_DEPTH;
      //     }
      // }

      this.taInstance._setAutoTrackProperties(props);
    }

    /*
      _getShareDepth() {
          var shareInfo = this.shareInfo || {};
          if ((shareInfo.a && shareInfo.a === this.taInstance.getAccountId()) || (shareInfo.i && shareInfo.i === this.taInstance.getDistinctId())) {
              return shareInfo.d;
          } else if (shareInfo.d) {
              return shareInfo.d + 1;
          } else {
              return DEFAULT_SHARE_DEPTH;
          }
      }
      */
  }, {
    key: "_getPath",
    value: function _getPath(path) {
      return path = "string" === typeof path ? path.replace(/^\//, "") : "Abnormal values";
    }

    /*
      _generateShareInfo() {
           return JSON.stringify({
              i: this.taInstance.getDistinctId(),
              a: this.taInstance.getAccountId(),
              p: this._getCurrentPath(),
              d: this._getShareDepth(),
          });
      }*/
  }, {
    key: "onPageShare",
    value: function onPageShare(result) {
      if (this.config.pageShare) {
        var share_depth = 1;
        try {
          share_depth = getCurrentPages().length;
        } catch (e) {
          share_depth = 1;
        }
        this.taInstance._internalTrack("$MPShare", {
          $share_method: "转发消息卡片",
          $share_depth: share_depth,
          $url_path: this._getCurrentPath()
        });
      }
      var ret = _.isObject(result) ? result : {};
      /*
          if (this.config.allow_share_info) {
              if (_.isUndefined(ret.path) || ret.path === '') {
                  ret.path = this._getCurrentPath();
              }
               if (_.isString(ret.path)) {
                  if (-1 === ret.path.indexOf('?')) {
                      ret.path = ret.path + '?';
                  } else if ('&' !== ret.path.slice(-1)) {
                      ret.path = ret.path + '&';
                  }
                  ret.path = ret.path + 'tashare=' + encodeURIComponent(this._generateShareInfo());
              }
          }*/
      return ret;
    }
  }, {
    key: "onPageShow",
    value: function onPageShow(onLoadOption) {
      if (this.config.pageShow) {
        var path = this._getCurrentPath();
        var prop = {
          $url_path: path || "The system did not get a value",
          $url_query: _.setQuery(onLoadOption)
        };
        this.referrer = path;
        this.taInstance._internalTrack("$MPViewScreen", prop);
      }
    }
  }]);
  return AutoTrackBridge;
}();

var AutoTrackBridge$1 = /*#__PURE__*/function () {
  function AutoTrackBridge(instance, config, currentPlatform) {
    var _this = this;
    _classCallCheck(this, AutoTrackBridge);
    this.taInstance = instance;
    this.config = config || {};
    var options = currentPlatform.getLaunchOptionsSync();
    this._onShow(options);
    this.startTracked = true;
    currentPlatform.onShow(function (options) {
      _this._onShow(options);
    });
    currentPlatform.onHide(function () {
      _this.startTracked = false;
      if (_this.config.appHide) {
        var properties = {};
        _.extend(properties, _this.config.properties);
        if (_.isFunction(_this.config.callback)) {
          _.extend(properties, _this.config.callback("appHide"));
        }
        _this.taInstance._internalTrack("$MPHide", properties);
      }
    });
  }
  _createClass(AutoTrackBridge, [{
    key: "_onShow",
    value: function _onShow(options) {
      if (this.startTracked) return;
      if (this.config.appHide) {
        this.taInstance.timeEvent("$MPHide");
      }

      // if (options && options.scene) {
      //   this.taInstance._setAutoTrackProperties({
      //     $scene: options.scene,
      //   });
      // }

      if (this.config.appShow) {
        var properties = {};
        _.extend(properties, this.config.properties);
        if (_.isFunction(this.config.callback)) {
          _.extend(properties, this.config.callback("appShow"));
        }
        this.taInstance._internalTrack("$MPShow", _objectSpread2(_objectSpread2({}, properties), {}, {
          $scene: String(options.scene),
          $url_query: _.setQuery(PlatformAPI.getAppOptions().query)
        }));
      }
    }
  }]);
  return AutoTrackBridge;
}();

var PlatformProxy$1 = /*#__PURE__*/function () {
  function PlatformProxy$1(api, platformConfig, internalConfig) {
    _classCallCheck(this, PlatformProxy$1);
    this.api = api;
    this.config = platformConfig;
    this._config = internalConfig;
  }
  _createClass(PlatformProxy$1, [{
    key: "getConfig",
    value:
    /**
     * 返回特定平台的特殊配置，如缓存名称，缓存配置等
     */
    function getConfig() {
      return this.config;
    }

    /**
     * 获取本地缓存数据
     * @param {string} name 本地缓存中指定的 key
     * @param {boolean} async 是否异步获取
     * @param {function} callback 异步获取时的回调函数，参数为对象
     * @return 包含本地存储值的对象类型
     */
  }, {
    key: "getStorage",
    value: function getStorage(name, async, callback) {
      if (async) {
        this.api.getStorage({
          key: name,
          success: function success(res) {
            var data = _.isJSONString(res.data) ? JSON.parse(res.data) : {};
            callback(data);
          },
          fail: function fail() {
            logger.warn("getStorage faild");
            callback({});
          }
        });
      } else {
        if (this._config.platform === "dd_mp") {
          var res = this.api.getStorageSync({
            key: name
          });
          if (_.isJSONString(res.data)) {
            return JSON.parse(res.data);
          } else {
            return {};
          }
        }
        var data = this.api.getStorageSync(name);
        if (_.isJSONString(data)) {
          return JSON.parse(data);
        } else {
          return {};
        }
      }
    }

    /**
     * 设置本地缓存
     * @param {string} name 本地缓存的 key
     * @param {string} value JSON 字符串
     */
  }, {
    key: "setStorage",
    value: function setStorage(name, value) {
      this.api.setStorage({
        key: name,
        data: value
      });
    }
  }, {
    key: "_getPlatform",
    value: function _getPlatform() {
      return "";
    }

    /**
     * 异步获取系统信息
     * @param {object} options 成功和结束后的回调函数
     * 当成功获取系统信息后，res 参数包含：
     *   brand         string  设备品牌
     *   model         string  设备型号
     *   screenWidth   number  屏幕宽度，单位px
     *   screenHeight  number  屏幕高度，单位px
     *   system        string  操作系统及版本
     *   platform      string  客户端平台
     */
  }, {
    key: "getSystemInfo",
    value: function getSystemInfo(options) {
      var platform = this._config.mpPlatform;
      this.api.getSystemInfo({
        success: function success(res) {
          if (_.isFunction(platform)) {
            res["mp_platform"] = platform(res);
          } else {
            res["mp_platform"] = platform;
          }
          options.success(res);
          if (platform === "wechat") {
            //微信平台在特殊情况下 complete 不会回调，需要在 success 回调中调用 options.complete 完成获取系统信息
            options.complete();
          }
        },
        complete: function complete() {
          options.complete();
        }
      });
    }

    /**
     * 异步获取网络类型
     * @param {object} options 成功和结束后的回调函数
     * res.networkType string 网络类型
     */
  }, {
    key: "getNetworkType",
    value: function getNetworkType(options) {
      if (!_.isFunction(this.api.getNetworkType)) {
        options.success({});
        options.complete();
      } else {
        this.api.getNetworkType({
          success: function success(res) {
            options.success(res);
          },
          complete: function complete() {
            options.complete();
          }
        });
      }
    }

    /**
     * 监听网络状态变化事件
     * @param {function} callback 网络状态变化后的回调
     */
  }, {
    key: "onNetworkStatusChange",
    value: function onNetworkStatusChange(callback) {
      if (!_.isFunction(this.api.onNetworkStatusChange)) {
        callback({});
      } else {
        this.api.onNetworkStatusChange(callback);
      }
    }

    /**
     * 发起网络请求
     * @param {object} options 参数集合，包含：
     *   url       string         服务器接口地址
     *   data      string/object  请求的参数
     *   method    string         HTTP 请求方法
     *   success   function       请求成功的回调函数
     *   fail      function       请求失败的回调函数
     *   complete  function       请求结束的回调函数
     */
  }, {
    key: "request",
    value: function request(options) {
      if (this._config.platform === "ali_mp" || this._config.platform === "dd_mp") {
        var config = _.extend({}, options);
        config.headers = options.header;
        config.success = function (res) {
          res.statusCode = res.status;
          options.success(res);
        };
        config.fail = function (res) {
          res.errMsg = res.errorMessage;
          options.fail(res);
        };
        if (this._config.platform === "dd_mp") {
          return this.api.httpRequest(config);
        } else {
          return this.api.request(config);
        }
      } else {
        return this.api.request(options);
      }
    }

    /**
     * 初始化生命周期相关实例
     * @param {GravityEngineAPI} instance SDK 实例, 用于生命周期相关逻辑回调.
     * @param {object} config 自动采集相关配置.
     */
  }, {
    key: "initAutoTrackInstance",
    value: function initAutoTrackInstance(instance, config) {
      if (_.isObject(config.autoTrack)) {
        config.autoTrack["isPlugin"] = config.is_plugin;
      }
      if (this._config.mp) {
        return new AutoTrackBridge(instance, config.autoTrack, this.api);
      } else {
        return new AutoTrackBridge$1(instance, config.autoTrack, this.api);
      }
    }
  }, {
    key: "setGlobal",
    value: function setGlobal(instance, name) {
      if (this._config.mp) {
        logger.warn("GravityAnalytics: we do not set global name for GE instance when you do not enable auto track.");
      } else {
        GameGlobal[name] = instance;
      }
    }

    /**
     * 获取系统启动信息，并注册 APP 切前台的回调
     * @param {function} callback APP 切前台的回调函数.
     */
  }, {
    key: "getAppOptions",
    value: function getAppOptions(callback) {
      var options = {};
      try {
        options = this.api.getLaunchOptionsSync();
      } catch (e) {
        logger.warn("Cannot get launch options.");
      }
      if (_.isFunction(callback)) {
        try {
          if (this._config.mp) {
            this.api.onAppShow(callback);
          } else {
            this.api.onShow(callback);
          }
        } catch (e) {
          logger.warn("Cannot register onShow callback.");
        }
      }
      return options;
    }

    /**
     * 展示 toast. 在开启 Debug 模式的时候需要提示用户
     * @param {string} toast 内容
     */
  }, {
    key: "showToast",
    value: function showToast(msg) {
      if (_.isFunction(this.api.showToast)) {
        var content = {
          title: msg
        };
        if (this._config.platform === "dd_mp" || this._config.platform === "ali_mp") {
          content.content = msg;
        }
        this.api.showToast(content);
      }
    }
  }], [{
    key: "createInstance",
    value: function createInstance() {
      // rollup 会在打包时替换下面的字符串到对应的平台
      return this._createInstance("R_CURRENT_PLATFORM");
    }
  }, {
    key: "_createInstance",
    value: function _createInstance(option) {
      switch (option) {
        // for historical reason, we use different persistence names for different platforms.
        case "wechat_mp":
          return new PlatformProxy$1(wx, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_wechat"
          }, {
            mpPlatform: "wechat",
            mp: true,
            platform: option
          });
        case "wechat_mg":
          return new PlatformProxy$1(wx, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_wechat_game"
          }, {
            mpPlatform: "wechat",
            platform: option
          });
        case "qq_mp":
          return new PlatformProxy$1(qq, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_qq"
          }, {
            mpPlatform: "qq",
            mp: true,
            platform: option
          });
        case "qq_mg":
          return new PlatformProxy$1(qq, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_qq_game"
          }, {
            mpPlatform: "qq",
            platform: option
          });
        case "baidu_mp":
          return new PlatformProxy$1(swan, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_swan"
          }, {
            mpPlatform: function mpPlatform(res) {
              return res["host"];
            },
            mp: true,
            platform: option
          });
        case "baidu_mg":
          return new PlatformProxy$1(swan, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_swan_game"
          }, {
            mpPlatform: function mpPlatform(res) {
              return res["host"];
            },
            platform: option
          });
        case "tt_mg":
          return new PlatformProxy$1(tt, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_tt_game"
          }, {
            mpPlatform: function mpPlatform(res) {
              return res["appName"];
            },
            platform: option
          });
        case "tt_mp":
          return new PlatformProxy$1(tt, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_tt"
          }, {
            mpPlatform: function mpPlatform(res) {
              return res["appName"];
            },
            mp: true,
            platform: option
          });
        case "ali_mp":
          return new PlatformProxy$1(my, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_ali"
          }, {
            mpPlatform: function mpPlatform(res) {
              return res["app"];
            },
            mp: true,
            platform: option
          });
        case "dd_mp":
          return new PlatformProxy$1(dd, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_dd"
          }, {
            mpPlatform: "dingding",
            mp: true,
            platform: option
          });
        case "bl_mg":
          return new PlatformProxy$1(bl, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_mg"
          }, {
            mpPlatform: "bilibili",
            platform: option
          });
        case "kuaishou_mp":
          return new PlatformProxy$1(ks, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_kuaishou"
          }, {
            mpPlatform: "kuaishou",
            mp: true,
            platform: option
          });
        // case 'qtt_mg':
        //     return new PlatformProxy(qttGame.systemInfo, {persistenceName: 'GravityEngine', persistenceNameOld: 'GravityEngine_qtt'}, {mpPlatform: 'qutoutiao', platform: option });
        // case 'linksure_mg':
        //     return new PlatformProxy(wuji, {persistenceName: 'GravityEngine', persistenceNameOld: 'GravityEngine_linksure'}, {mpPlatform: 'linksure', platform: option });
        case "qh360_mg":
          return new PlatformProxy$1(qh, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_qh360"
          }, {
            mpPlatform: "qh360",
            platform: option
          });
        case "tb_mp":
          return new PlatformProxy$1(my, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_tb"
          }, {
            mpPlatform: "tb",
            mp: true,
            platform: option
          });
        case "jd_mp":
          return new PlatformProxy$1(jd, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_jd"
          }, {
            mpPlatform: "jd",
            mp: true,
            platform: option
          });
        case "qh360_mp":
          return new PlatformProxy$1(qh, {
            persistenceName: "GravityEngine",
            persistenceNameOld: "GravityEngine_qh360"
          }, {
            mpPlatform: "qh360",
            mp: true,
            platform: option
          });
        case "WEB":
          return new PlatformProxy.createInstance();
      }
    }
  }]);
  return PlatformProxy$1;
}();

var AutoTrackBridge$2 = /*#__PURE__*/_createClass(function AutoTrackBridge(instance, config) {
  var _this = this;
  _classCallCheck(this, AutoTrackBridge);
  this.taInstance = instance;
  this.config = config || {};
  // VIVO 快游戏 的 onShow 定义为回到前台的事件， 所以此处添加启动时的onshow。
  if (this.config.appShow) {
    this.taInstance._internalTrack("$MPShow");
  }
  if (this.config.appHide) {
    this.taInstance.timeEvent("$MPHide");
  }
  qg.onShow(function () {
    if (_this.config.appHide) {
      _this.taInstance.timeEvent("$MPHide");
    }
    if (_this.config.appShow) {
      var properties = {};
      _.extend(properties, _this.config.properties);
      if (_.isFunction(_this.config.callback)) {
        _.extend(properties, _this.config.callback("appShow"));
      }
      _this.taInstance._internalTrack("$MPShow");
    }
  });
  qg.onHide(function () {
    if (_this.config.appHide) {
      var properties = {};
      _.extend(properties, _this.config.properties);
      if (_.isFunction(_this.config.callback)) {
        _.extend(properties, _this.config.callback("appHide"));
      }
      _this.taInstance._internalTrack("$MPHide");
    }
  });
});
/**
 * vivo 小游戏系统接口
 */
var PlatformProxy$2 = /*#__PURE__*/function () {
  function PlatformProxy() {
    _classCallCheck(this, PlatformProxy);
    this.config = {
      persistenceName: "gravityengine",
      persistenceNameOld: "gravityengine_qg_vivo_game",
      asyncPersistence: true
    };
  }
  _createClass(PlatformProxy, [{
    key: "getConfig",
    value:
    /**
     * 返回特定平台的特殊配置，如缓存名称，缓存配置等
     */
    function getConfig() {
      return this.config || {};
    }

    /**
     * 获取本地缓存数据
     * @param {string} name 本地缓存中指定的 key
     * @param {boolean} async 是否异步获取
     * @param {function} callback 异步获取时的回调函数，参数为对象
     * @return 包含本地存储值的对象类型
     */
  }, {
    key: "getStorage",
    value: function getStorage(name, async, callback) {
      // if (!async) logger.warn('GE: invalid storage configuration');
      if (async) {
        qg.getStorage({
          key: name,
          success: function success(res) {
            var data = _.isJSONString(res) ? JSON.parse(res) : {};
            callback(data);
          },
          fail: function fail() {
            callback({});
          }
        });
      } else {
        var data = qg.getStorageSync({
          key: name
        });
        if (_.isJSONString(data)) {
          return JSON.parse(data);
        } else {
          return {};
        }
      }
    }

    /**
     * 设置本地缓存
     * @param {string} name 本地缓存的 key
     * @param {string} value JSON 字符串
     */
  }, {
    key: "setStorage",
    value: function setStorage(name, value) {
      qg.setStorage({
        key: name,
        value: value
      });
    }

    /**
     * 异步获取系统信息
     * @param {object} options 成功和结束后的回调函数
     * 当成功获取系统信息后，res 参数包含：
     *   brand         string  设备品牌
     *   model         string  设备型号
     *   screenWidth   number  屏幕宽度，单位px
     *   screenHeight  number  屏幕高度，单位px
     *   system        string  操作系统及版本
     *   platform      string  客户端平台
     */
  }, {
    key: "getSystemInfo",
    value: function getSystemInfo(options) {
      qg.getSystemInfo({
        success: function success(ret) {
          var deviceInfo = ret;
          var systemArr = [ret["osType"], ret["osVersionName"]];
          var system = systemArr.join(" ");
          deviceInfo["brand"] = ret["manufacturer"];
          deviceInfo["system"] = system;
          deviceInfo["mp_platform"] = "vivo_qg";
          options.success(deviceInfo);
        },
        complete: function complete() {
          options.complete();
        }
      });
    }

    /**
     * 异步获取网络类型
     * @param {object} options 成功和结束后的回调函数
     * res.networkType string 网络类型
     */
  }, {
    key: "getNetworkType",
    value: function getNetworkType(options) {
      qg.getNetworkType({
        success: function success(data) {
          var networkInfo = data;
          networkInfo["networkType"] = data.type;
          options.success(networkInfo);
        },
        complete: function complete() {
          options.complete();
        }
      });
    }

    /**
     * 监听网络状态变化事件
     * @param {function} callback 网络状态变化后的回调
     */
  }, {
    key: "onNetworkStatusChange",
    value: function onNetworkStatusChange(_callback) {
      qg.subscribeNetworkStatus({
        callback: function callback(data) {
          var networkInfo = data;
          networkInfo["networkType"] = data.type;
          _callback(networkInfo);
        }
      });
    }

    /**
     * 发起网络请求
     * @param {object} options 参数集合，包含：
     *   url       string         服务器接口地址
     *   data      string/object  请求的参数
     *   method    string         HTTP 请求方法
     *   success   function       请求成功的回调函数
     *   fail      function       请求失败的回调函数
     *   complete  function       请求结束的回调函数
     */
  }, {
    key: "request",
    value: function request(options) {
      return qg.request({
        url: options.url,
        data: options.data,
        method: options.method,
        header: options.header,
        success: function success(response) {
          options.success(response);
        },
        fail: function fail(data) {
          options.fail(data);
        }
      });
    }

    /**
     * 初始化生命周期相关实例
     * @param {GravityEngineAPI} instance SDK 实例, 用于生命周期相关逻辑回调.
     * @param {object} config 自动采集相关配置.
     */
  }, {
    key: "initAutoTrackInstance",
    value: function initAutoTrackInstance(instance, config) {
      return new AutoTrackBridge$2(instance, config.autoTrack);
    }
  }, {
    key: "setGlobal",
    value: function setGlobal(instance, name) {
      globalThis[name] = instance;
    }

    /**
     * 获取系统启动信息，并注册 APP 切前台的回调
     */
  }, {
    key: "getAppOptions",
    value: function getAppOptions() {
      return {};
    }

    /**
     * 展示 toast. 在开启 Debug 模式的时候需要提示用户
     * @param {string} msg 内容
     */
  }, {
    key: "showToast",
    value: function showToast(msg) {
      qg.showToast({
        message: msg,
        duration: 0
      });
    }
  }], [{
    key: "createInstance",
    value: function createInstance() {
      return new PlatformProxy();
    }
  }]);
  return PlatformProxy;
}();

var AutoTrackBridge$3 = /*#__PURE__*/_createClass(function AutoTrackBridge(instance, config, api) {
  var _this = this;
  _classCallCheck(this, AutoTrackBridge);
  this.taInstance = instance;
  this.config = config || {};

  // 快游戏 的 onShow 定义为回到前台的事件， 所以此处添加启动时的onshow。
  if (this.config.appShow) {
    var properties = {};
    _.extend(properties, this.config.properties);
    if (_.isFunction(this.config.callback)) {
      _.extend(properties, this.config.callback('appShow'));
    }
    this.taInstance._internalTrack('$MPShow', properties);
  }
  if (this.config.appHide) {
    this.taInstance.timeEvent('$MPHide');
  }
  api.onShow(function () {
    if (_this.config.appHide) {
      _this.taInstance.timeEvent('$MPHide');
    }
    if (_this.config.appShow) {
      var properties = {};
      _.extend(properties, _this.config.properties);
      if (_.isFunction(_this.config.callback)) {
        _.extend(properties, _this.config.callback('appShow'));
      }
      _this.taInstance._internalTrack('$MPShow', properties);
    }
  });
  api.onHide(function () {
    if (_this.config.appHide) {
      var properties = {};
      _.extend(properties, _this.config.properties);
      if (_.isFunction(_this.config.callback)) {
        _.extend(properties, _this.config.callback('appHide'));
      }
      _this.taInstance._internalTrack('$MPHide', properties);
    }
  });
});
var PlatformProxy$3 = /*#__PURE__*/function () {
  function PlatformProxy(api, platformConfig, internalConfig) {
    _classCallCheck(this, PlatformProxy);
    this.api = api;
    this.config = platformConfig;
    this._config = internalConfig;
  }
  _createClass(PlatformProxy, [{
    key: "getConfig",
    value:
    /**
     * 返回特定平台的特殊配置，如缓存名称，缓存配置等
     */
    function getConfig() {
      return this.config || {};
    }

    /**
     * 获取本地缓存数据
     * @param {string} name 本地缓存中指定的 key
     * @param {boolean} async 是否异步获取
     * @return 包含本地存储值的对象类型
     */
  }, {
    key: "getStorage",
    value: function getStorage(name, async, callback) {
      // if (async) logger.warn('GE: invalid storage configuration');
      var data = localStorage.getItem(name);
      if (async) {
        if (_.isJSONString(data)) {
          callback(JSON.parse(data));
        } else {
          callback({});
        }
      } else {
        if (_.isJSONString(data)) {
          return JSON.parse(data);
        } else {
          return {};
        }
      }
    }

    /**
     * 设置本地缓存
     * @param {string} name 本地缓存的 key
     * @param {string} value JSON 字符串
     */
  }, {
    key: "setStorage",
    value: function setStorage(name, value) {
      localStorage.setItem(name, value);
    }

    /**
     * 异步获取系统信息
     * @param {object} options 成功和结束后的回调函数
     * 当成功获取系统信息后，res 参数包含：
     *   brand         string  设备品牌
     *   model         string  设备型号
     *   screenWidth   number  屏幕宽度，单位px
     *   screenHeight  number  屏幕高度，单位px
     *   system        string  操作系统及版本
     *   platform      string  客户端平台
     */
  }, {
    key: "getSystemInfo",
    value: function getSystemInfo(options) {
      var platform = this._config.mpPlatform;
      this.api.getSystemInfo({
        success: function success(res) {
          res['mp_platform'] = platform;
          options.success(res);
        },
        complete: function complete() {
          options.complete();
        }
      });
    }

    /**
     * 异步获取网络类型
     * @param {object} options 成功和结束后的回调函数
     * res.networkType string 网络类型
     */
  }, {
    key: "getNetworkType",
    value: function getNetworkType(options) {
      this.api.getNetworkType({
        success: function success(data) {
          options.success(data);
        },
        complete: function complete() {
          options.complete();
        }
      });
    }

    /**
     * 监听网络状态变化事件
     * @param {function} callback 网络状态变化后的回调
     */
  }, {
    key: "onNetworkStatusChange",
    value: function onNetworkStatusChange(_callback) {
      this.api.onNetworkStatusChange({
        callback: function callback(data) {
          _callback(data);
        }
      });
    }

    /**
     * 发起网络请求
     * @param {object} options 参数集合，包含：
     *   url       string         服务器接口地址
     *   data      string/object  请求的参数
     *   method    string         HTTP 请求方法
     *   success   function       请求成功的回调函数
     *   fail      function       请求失败的回调函数
     *   complete  function       请求结束的回调函数
     */
  }, {
    key: "request",
    value: function request(options) {
      var res = {};
      var xhr = new XMLHttpRequest();
      xhr.open(options.method, options.url);
      if (options.header) {
        for (var key in options.header) {
          xhr.setRequestHeader(key, options.header[key]);
        }
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          res['statusCode'] = 200;
          if (_.isJSONString(xhr.responseText)) {
            res['data'] = JSON.parse(xhr.responseText);
          }
          options.success(res);
        } else if (xhr.status !== 200) {
          res.errMsg = 'network error';
          options.fail(res);
        }
      };
      xhr.ontimeout = function () {
        res.errMsg = 'timeout';
        options.fail(res);
      };
      xhr.send(options.data);
      return xhr;
    }

    /**
     * 初始化生命周期相关实例
     * @param {GravityEngineAPI} instance SDK 实例, 用于生命周期相关逻辑回调.
     * @param {object} config 自动采集相关配置.
     */
  }, {
    key: "initAutoTrackInstance",
    value: function initAutoTrackInstance(instance, config) {
      return new AutoTrackBridge$3(instance, config.autoTrack, this.api);
    }
  }, {
    key: "setGlobal",
    value: function setGlobal(instance, name) {
      globalThis[name] = instance;
    }

    /**
     * 获取系统启动信息，并注册 APP 切前台的回调
     * @TODO
     */
  }, {
    key: "getAppOptions",
    value: function getAppOptions() {
      return this.api.getLaunchOptionsSync();
    }

    /**
     * 展示 toast. 在开启 Debug 模式的时候需要提示用户
     * @param {string} toast 内容
     */
  }, {
    key: "showToast",
    value: function showToast(msg) {
      this.api.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      });
    }
  }], [{
    key: "createInstance",
    value: function createInstance() {
      return this._createInstance('R_CURRENT_PLATFORM');
    }
  }, {
    key: "_createInstance",
    value: function _createInstance(option) {
      switch (option) {
        case 'oppo':
          return new PlatformProxy(qg, {
            persistenceName: 'gravityengine',
            persistenceNameOld: 'gravityengine_qg_oppo_game'
          }, {
            mpPlatform: 'oppo_qg'
          });
        case 'huawei':
          return new PlatformProxy(hbs, {
            persistenceName: 'gravityengine',
            persistenceNameOld: 'gravityengine_qg_huawei_game'
          }, {
            mpPlatform: 'huawei_qg'
          });
        case 'mz':
          return new PlatformProxy(qg, {
            persistenceName: 'gravityengine',
            persistenceNameOld: 'gravityengine_qg_mz_game'
          }, {
            mpPlatform: 'mz'
          });
        case 'xiaomi':
          return new PlatformProxy(qg, {
            persistenceName: 'gravityengine',
            persistenceNameOld: 'gravityengine_qg'
          }, {
            mpPlatform: 'xiaomi'
          });
      }
    }
  }]);
  return PlatformProxy;
}();

var PlatformProxyEgret = /*#__PURE__*/function () {
  function PlatformProxyEgret() {
    _classCallCheck(this, PlatformProxyEgret);
  }
  _createClass(PlatformProxyEgret, null, [{
    key: "createInstance",
    value: function createInstance() {
      if (egret.Capabilities.runtimeType === egret.RuntimeType.WXGAME) {
        return PlatformProxy$1._createInstance('wechat_mg');
      } else if (egret.Capabilities.runtimeType === egret.RuntimeType.BAIDUGAME) {
        return PlatformProxy$1._createInstance('baidu_mg');
      } else if (egret.Capabilities.runtimeType === egret.RuntimeType.QQGAME) {
        return PlatformProxy$1._createInstance('qq_mg');
      } else if (egret.Capabilities.runtimeType === egret.RuntimeType.VIVOGAME) {
        return PlatformProxy$2.createInstance();
      } else if (egret.Capabilities.runtimeType === egret.RuntimeType.OPPOGAME) {
        return PlatformProxy$3._createInstance('oppo');
        /** @TODO config.persistenceName = 'gravityengine_qg_oppo_game'; */
      } else if (egret.Capabilities.runtimeType === egret.RuntimeType.QGAME) {
        return PlatformProxy$3._createInstance('xiaomi');
      } else if (egret.Capabilities.runtimeType === egret.RuntimeType.FASTGAME) {
        return PlatformProxy$3._createInstance('huawei');
      } else if (egret.Capabilities.runtimeType === egret.RuntimeType.QHGAME) {
        return PlatformProxy$1._createInstance('qh360_mg');
      } else if (egret.Capabilities.runtimeType === egret.RuntimeType.TTGAME) {
        return PlatformProxy$1._createInstance('tt_mg');
      } else if (egret.Capabilities.runtimeType === egret.RuntimeType.MYGAME) {
        return PlatformProxy$1._createInstance('ali_mp');
      } else if (egret.Capabilities.runtimeType === egret.RuntimeType.TBCREATIVEAPP) {
        return PlatformProxy$1._createInstance('tb_mp');
      } else {
        var platform = PlatformProxy.createInstance();
        platform._sysCallback = function () {
          return {
            system: egret.Capabilities.os.replace(/\s*/g, ''),
            // eslint-disable-next-line
            mp_platform: egret.Capabilities.runtimeType
          };
        };
        platform.request = function (options) {
          var res = {};
          var httpMethod = options.method === 'GET' ? egret.HttpMethod.GET : egret.HttpMethod.POST;
          var request = new egret.HttpRequest();
          request.timeout = 10000;
          request.responseType = egret.HttpResponseType.TEXT;
          request.open(options.url, httpMethod);
          if (options.header) {
            for (var key in options.header) {
              request.setRequestHeader(key, options.header[key]);
            }
          }
          request.send(options.data);
          request.addEventListener(egret.Event.COMPLETE, function (event) {
            res['statusCode'] = 200;
            var response = event.currentTarget.response;
            if (_.isJSONString(response)) {
              res['data'] = JSON.parse(response);
            }
            options.success(res);
          }, platform);
          request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
            res.errMsg = 'network error';
            options.fail(res);
          }, platform);
          return request;
        };
        return platform;
      }
    }
  }]);
  return PlatformProxyEgret;
}();

var PlatformAPI = /*#__PURE__*/function () {
  function PlatformAPI() {
    _classCallCheck(this, PlatformAPI);
  }
  _createClass(PlatformAPI, null, [{
    key: "_getCurrentPlatform",
    value: function _getCurrentPlatform() {
      return this.currentPlatform || (this.currentPlatform = PlatformProxyEgret.createInstance());
    }

    /**
     * 获取平台特定的配置: persistenceName 必须
     */
  }, {
    key: "getConfig",
    value: function getConfig() {
      return this._getCurrentPlatform().getConfig();
    }

    /**
     * 获取本地缓存数据
     * @param {string} name 本地缓存中指定的 key
     * @param {boolean} async 是否异步获取
     * @param {function} callback 异步获取时的回调函数，参数为对象
     * @return 包含本地存储值的对象类型
     */
  }, {
    key: "getStorage",
    value: function getStorage(name, async, callback) {
      return this._getCurrentPlatform().getStorage(name, async, callback);
    }

    /**
     * 设置本地缓存
     * @param {string} name 本地缓存的 key
     * @param {string} value JSON 字符串
     */
  }, {
    key: "setStorage",
    value: function setStorage(name, value) {
      return this._getCurrentPlatform().setStorage(name, value);
    }

    /**
     * 异步获取系统信息
     * @param {object} options 成功和结束后的回调函数
     * 当成功获取系统信息后，res 参数包含：
     *   brand         string  设备品牌
     *   model         string  设备型号
     *   screenWidth   number  屏幕宽度，单位px
     *   screenHeight  number  屏幕高度，单位px
     *   system        string  操作系统及版本
     *   platform      string  客户端平台
     */
  }, {
    key: "getSystemInfo",
    value: function getSystemInfo(options) {
      return this._getCurrentPlatform().getSystemInfo(options);
    }

    /**
     * 异步获取网络类型
     * @param {object} options 成功和结束后的回调函数
     * res.networkType string 网络类型
     */
  }, {
    key: "getNetworkType",
    value: function getNetworkType(options) {
      return this._getCurrentPlatform().getNetworkType(options);
    }

    /**
     * 监听网络状态变化事件
     * @param {function} callback 网络状态变化后的回调
     */
  }, {
    key: "onNetworkStatusChange",
    value: function onNetworkStatusChange(callback) {
      this._getCurrentPlatform().onNetworkStatusChange(callback);
    }

    /**
     * 发起网络请求
     * @param {object} options 参数集合，包含：
     *   url       string         服务器接口地址
     *   data      string/object  请求的参数
     *   method    string         HTTP 请求方法
     *   success   function       请求成功的回调函数
     *   fail      function       请求失败的回调函数
     *   complete  function       请求结束的回调函数
     */
  }, {
    key: "request",
    value: function request(options) {
      return this._getCurrentPlatform().request(options);
    }

    /**
     * 初始化生命周期相关实例
     * @param {GravityEngineAPI} instance SDK 实例, 用于生命周期相关逻辑回调.
     * @param {object} config 自动采集相关配置.
     */
  }, {
    key: "initAutoTrackInstance",
    value: function initAutoTrackInstance(instance, config) {
      return this._getCurrentPlatform().initAutoTrackInstance(instance, config);
    }

    /**
     * 将 instance 设置为全局变量
     * @param {object} instance
     * @param {string} name
     */
  }, {
    key: "setGlobal",
    value: function setGlobal(instance, name) {
      if (instance && name) {
        this._getCurrentPlatform().setGlobal(instance, name);
      }
    }

    /**
     * 获取系统启动信息，并注册 APP 切前台的回调
     * @param {function} callback APP 切前台的回调函数.
     */
  }, {
    key: "getAppOptions",
    value: function getAppOptions(callback) {
      return this._getCurrentPlatform().getAppOptions(callback);
    }

    /**
     * 提示用户 Debug 模式信息
     * @param {string} msg 提示信息
     */
  }, {
    key: "showDebugToast",
    value: function showDebugToast(msg) {
      this._getCurrentPlatform().showToast(msg);
    }
  }]);
  return PlatformAPI;
}();

/** @const */
var KEY_NAME_MATCH_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{0,49}$/;
var PropertyChecker = /*#__PURE__*/function () {
  function PropertyChecker() {
    _classCallCheck(this, PropertyChecker);
  }
  _createClass(PropertyChecker, null, [{
    key: "stripProperties",
    value: function stripProperties(prop) {
      if (!_.isObject(prop)) {
        return prop;
      }
      _.each(prop, function (v, k) {
        if (!(_.isString(v) || _.isNumber(v) || _.isDate(v) || _.isBoolean(v) || _.isArray(v) || _.isObject(v))) {
          logger.warn('Your data -', k, v, '- format does not meet requirements and may not be stored correctly. Attribute values only support String, Number, Date, Boolean, Array, Object');
        }
      });
      return prop;
    }
  }, {
    key: "_checkPropertiesKey",
    value: function _checkPropertiesKey(obj) {
      var flag = true;
      _.each(obj, function (content, key) {
        if (!KEY_NAME_MATCH_REGEX.test(key)) {
          logger.warn('Invalid KEY: ' + key);
          flag = false;
        }
      });
      return flag;
    }
  }, {
    key: "event",
    value: function event(s) {
      if (!_.isString(s) || !KEY_NAME_MATCH_REGEX.test(s)) {
        logger.warn('Check the parameter format. The eventName must start with an English letter and contain no more than 50 characters including letters, digits, and underscores: ' + s);
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: "propertyName",
    value: function propertyName(s) {
      if (!_.isString(s) || !KEY_NAME_MATCH_REGEX.test(s)) {
        logger.warn('Check the parameter format. PropertyName must start with a letter and contain letters, digits, and underscores (_). The value is a string of no more than 50 characters: ' + s);
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: "properties",
    value: function properties(p) {
      this.stripProperties(p);
      if (p) {
        if (_.isObject(p)) {
          if (this._checkPropertiesKey(p)) {
            return true;
          } else {
            logger.warn('Check the parameter format. The properties key must start with a letter, contain digits, letters, and underscores (_), and contain a maximum of 50 characters');
            return false;
          }
        } else {
          logger.warn('properties can be none, but it must be an object');
          return false;
        }
      } else {
        return true;
      }
    }
  }, {
    key: "propertiesMust",
    value: function propertiesMust(p) {
      this.stripProperties(p);
      if (p === undefined || !_.isObject(p) || _.isEmptyObject(p)) {
        logger.warn('properties must be an object with a value');
        return false;
      } else {
        if (this._checkPropertiesKey(p)) {
          return true;
        } else {
          logger.warn('Check the parameter format. The properties key must start with a letter, contain digits, letters, and underscores (_), and contain a maximum of 50 characters');
          return false;
        }
      }
    }
  }, {
    key: "userId",
    value: function userId(id) {
      if (_.isString(id) && /^.{1,64}$/.test(id)) {
        return true;
      } else {
        logger.warn('The user ID must be a string of less than 64 characters and cannot be null');
        return false;
      }
    }
  }, {
    key: "userAddProperties",
    value: function userAddProperties(p) {
      if (!this.propertiesMust(p)) return false;
      for (var i in p) {
        if (!_.isNumber(p[i])) {
          logger.warn('The attributes of userAdd need to be Number');
          return false;
        }
      }
      return true;
    }
  }, {
    key: "userAppendProperties",
    value: function userAppendProperties(p) {
      if (!this.propertiesMust(p)) return false;
      for (var i in p) {
        if (!_.isArray(p[i])) {
          logger.warn('The attribute of userAppend must be Array');
          return false;
        }
      }
      return true;
    }
  }]);
  return PropertyChecker;
}();

var HttpTask = /*#__PURE__*/function () {
  function HttpTask(data, serverUrl, tryCount, timeout, debugMode, callback) {
    _classCallCheck(this, HttpTask);
    this.data = data;
    this.serverUrl = serverUrl;
    this.callback = callback;
    this.debugMode = debugMode;
    this.tryCount = _.isNumber(tryCount) ? tryCount : 1;
    this.permissionTryCount = 6;
    this.timeout = _.isNumber(timeout) ? timeout : 3000;
    this.taClassName = "HttpTask";
  }
  _createClass(HttpTask, [{
    key: "run",
    value: function run() {
      var _this = this;
      var headers = _.createExtraHeaders();
      headers["content-type"] = "application/json";
      if (this.debugMode === "debug") {
        headers["Turbo-Debug-Mode"] = 1;
      }
      // eslint-disable-next-line no-undef
      var request = PlatformAPI.request({
        url: this.serverUrl,
        method: "POST",
        data: this.data,
        header: headers,
        success: function success(res) {
          if (res.data.code !== 0) {
            _this.onFailed(res);
          } else {
            _this.onSuccess(res);
          }
        },
        fail: function fail(res) {
          _this.onFailed(res);
        }
      });
      setTimeout(function () {
        if ((_.isObject(request) || _.isPromise(request)) && _.isFunction(request.abort)) {
          request.abort();
        }
      }, this.timeout);
    }
  }, {
    key: "onSuccess",
    value: function onSuccess(res) {
      if (res.statusCode === 200) {
        var _res$data$extra$error;
        var msgStr = "Data Verified";
        if ((_res$data$extra$error = res.data.extra.errors) !== null && _res$data$extra$error !== void 0 && _res$data$extra$error.length) {
          msgStr = res.data.extra.errors;
        }
        this.callback({
          code: res.data.code,
          msg: msgStr
        });
      } else {
        this.callback({
          code: -3,
          msg: res.statusCode
        });
      }
    }
  }, {
    key: "onFailed",
    value: function onFailed(res) {
      var _this2 = this;
      if (res.data.code === 2000 && --this.permissionTryCount > 0) {
        setTimeout(function () {
          _this2.run();
        }, 6000);
      } else if (--this.tryCount > 0) {
        setTimeout(function () {
          _this2.run();
        }, 1000);
      } else {
        this.callback({
          code: -3,
          msg: "".concat(res.data.msg, "\uFF1A").concat(res.data.extra.error)
        });
      }
    }
  }]);
  return HttpTask;
}();
var SenderQueue = /*#__PURE__*/function () {
  function SenderQueue() {
    _classCallCheck(this, SenderQueue);
    this.items = [];
    this.isRunning = false;
    this.showDebug = false;
  }
  _createClass(SenderQueue, [{
    key: "enqueue",
    value: function enqueue(data, serverUrl, config) {
      var _enqueue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var isDebugMode = config.debugMode === "debug";
      var element;
      var that = this;
      element = new HttpTask(JSON.stringify(data), serverUrl, config.maxRetries, config.sendTimeout, config.debugMode, function (res) {
        that.isRunning = false;
        if (_.isFunction(config.callback)) {
          config.callback(res);
        }
        that._runNext(isDebugMode);
        if (isDebugMode) {
          logger.info("code ".concat(res.code, " and msg is ").concat(res.msg));
        }
      });
      if (_enqueue === true) {
        this.items.push(element);
        this._runNext(isDebugMode);
      } else {
        element.run();
      }
    }
  }, {
    key: "_dequeue",
    value: function _dequeue() {
      return this.items.shift();
    }
  }, {
    key: "_runNext",
    value: function _runNext(isDebugMode) {
      if (this.items.length > 0 && !this.isRunning) {
        this.isRunning = true;
        if (isDebugMode) {
          // Debug模式会走这里，一条一条上报
          this._dequeue().run();
        } else {
          // 正常模式下支持batch上报
          var items = this.items.splice(0, this.items.length);
          var httpTask0 = items[0];
          var data = JSON.parse(httpTask0.data);
          for (var i = 1; i < items.length; i++) {
            var task = items[i];
            var taskData = JSON.parse(task.data);
            // 合并上报数据
            data["event_list"] = data["event_list"].concat(taskData["event_list"]);
          }
          var flushTime = new Date().getTime();
          data["$flush_time"] = flushTime;
          var element;
          element = new HttpTask(JSON.stringify(data), httpTask0.serverUrl, httpTask0.tryCount, httpTask0.timeout, httpTask0 === null || httpTask0 === void 0 ? void 0 : httpTask0.debugMode, httpTask0.callback);
          element.run();
        }
      }
    }
  }]);
  return SenderQueue;
}();
var senderQueue = new SenderQueue();

var DEFAULT_CONFIG = {
  name: "GravityEngine",
  // 全局变量名称
  // eslint-disable-next-line camelcase
  is_plugin: false,
  // 是否是插件版本。基础库 < 2.6.4 不允许修改 App 和 Page
  maxRetries: 3,
  // 当网络出错或者超时时，最大重试次数. v1.3.0+
  sendTimeout: 5000,
  // 请求超时时间, 单位毫秒
  enablePersistence: true,
  // 是否使用本地缓存
  asyncPersistence: false,
  // 是否使用异步存储
  enableLog: true,
  // 是否打开日志
  strict: false,
  // 关闭严格数据格式校验。允许可能的问题数据上报
  debugMode: "none" // Debug 模式
};

/**
 * 异步获取系统信息，初始化预置属性
 *
 * $lib_version SDK 版本
 * $lib SDK 技术框架
 * $network_type 上传事件时的网络类型
 * $manufacture 设备制造商
 * $model 设备型号，如iPhone 8
 * $screen_width 设备屏幕宽度
 * $screen_height 设备屏幕高度
 * $os 操作系统
 * $os_version 操作系统版本
 */
var systemInformation = {
  properties: {
    $lib_version: Config.LIB_VERSION,
    $lib: Config.LIB_STACK
  },
  getSystemInfo: function getSystemInfo(callback) {
    var that = this;
    PlatformAPI.onNetworkStatusChange(function (res) {
      that.properties["$network_type"] = res.networkType;
    });
    PlatformAPI.getNetworkType({
      success: function success(res) {
        that.properties["$network_type"] = res.networkType;
      },
      complete: function complete() {
        PlatformAPI.getSystemInfo({
          success: function success(res) {
            logger.info(JSON.stringify(res, null, 4));
            var data = {
              $manufacturer: res["brand"],
              $model: res["model"],
              $screen_width: Number(res["screenWidth"]),
              $screen_height: Number(res["screenHeight"]),
              $system_language: res.language,
              $os: res.platform,
              $os_version: res.system
            };
            _.extend(that.properties, data);
            _.setMpPlatform(res["mp_platform"]);
          },
          complete: function complete() {
            callback();
          }
        });
      }
    });
  }
};

/**
 * 数据缓存的包装类。
 *
 * 本地缓存的 key 值及其对应的属性 key 为:
 * 1. device_id: $device_id
 * 2. distinct_id: $distinct_id
 * 3. account_id: $account_id
 * 4. props: 事件公共属性
 * 5. event_timers: $duration
 *
 */
var GravityEnginePersistence = /*#__PURE__*/function () {
  function GravityEnginePersistence(config, callback) {
    var _this = this;
    _classCallCheck(this, GravityEnginePersistence);
    this.enabled = config.enablePersistence;
    if (this.enabled) {
      if (config.isChildInstance) {
        this.name = config.persistenceName + "_" + config.name;
        this.nameOld = config.persistenceNameOld + "_" + config.name;
      } else {
        this.name = config.persistenceName;
        this.nameOld = config.persistenceNameOld;
      }
      if (config.asyncPersistence) {
        this._state = {};
        PlatformAPI.getStorage(this.name, true, function (data) {
          if (_.isEmptyObject(data)) {
            PlatformAPI.getStorage(_this.nameOld, true, function (dataOld) {
              _this._state = _.extend2Layers({}, dataOld, _this._state);
              _this._init(config, callback);
              _this._save();
            });
          } else {
            _this._state = _.extend2Layers({}, data, _this._state);
            _this._init(config, callback);
            _this._save();
          }
        });
      } else {
        this._state = PlatformAPI.getStorage(this.name) || {};
        if (_.isEmptyObject(this._state)) {
          this._state = PlatformAPI.getStorage(this.nameOld) || {};
        }
        this._init(config, callback);
      }
    } else {
      this._state = {};
      this._init(config, callback);
    }
  }
  _createClass(GravityEnginePersistence, [{
    key: "_init",
    value: function _init(config, callback) {
      if (!this.getDistinctId()) {
        this.setDistinctId(_.UUID());
      }
      if (!config.isChildInstance) {
        if (!this.getDeviceId()) {
          this._setDeviceId(_.UUID());
        }
      }

      // 表明初始化完成，可以进行本地缓存的写操作
      this.initComplete = true;
      if (typeof callback === "function") {
        callback();
      }
      this._save();
    }
  }, {
    key: "_save",
    value: function _save() {
      if (this.enabled && this.initComplete) {
        PlatformAPI.setStorage(this.name, JSON.stringify(this._state));
      }
    }
  }, {
    key: "_set",
    value: function _set(name, value) {
      var _this2 = this;
      var obj;
      if (typeof name === "string") {
        obj = {};
        obj[name] = value;
      } else if (_typeof(name) === "object") {
        obj = name;
      }
      _.each(obj, function (value, key) {
        _this2._state[key] = value;
      });
      this._save();
    }
  }, {
    key: "_get",
    value: function _get(name) {
      return this._state[name];
    }
  }, {
    key: "setEventTimer",
    value: function setEventTimer(eventName, timestamp) {
      var timers = this._state.event_timers || {};
      timers[eventName] = timestamp;
      this._set("event_timers", timers);
    }
  }, {
    key: "removeEventTimer",
    value: function removeEventTimer(eventName) {
      var timers = this._state.event_timers || {};
      var timestamp = timers[eventName];
      if (!_.isUndefined(timestamp)) {
        delete this._state.event_timers[eventName];
        this._save();
      }
      return timestamp;
    }
  }, {
    key: "getDeviceId",
    value: function getDeviceId() {
      return this._state.device_id;
    }
  }, {
    key: "_setDeviceId",
    value: function _setDeviceId(deviceId) {
      if (this.getDeviceId()) {
        logger.warn("cannot modify the device id.");
        return;
      }
      this._set("device_id", deviceId);
    }
  }, {
    key: "getDistinctId",
    value: function getDistinctId() {
      return this._state.distinct_id;
    }
  }, {
    key: "setDistinctId",
    value: function setDistinctId(distinctId) {
      this._set("distinct_id", distinctId);
    }
  }, {
    key: "getAccountId",
    value: function getAccountId() {
      return this._state.account_id;
    }
  }, {
    key: "setAccountId",
    value: function setAccountId(accoundId) {
      this._set("account_id", accoundId);
    }
  }, {
    key: "getSuperProperties",
    value: function getSuperProperties() {
      return this._state.props || {};
    }
  }, {
    key: "setSuperProperties",
    value: function setSuperProperties(superProperties, replace) {
      var props = replace ? superProperties : _.extend(this.getSuperProperties(), superProperties);
      this._set("props", props);
    }
  }]);
  return GravityEnginePersistence;
}();
function getPlatFormName() {
  return PlatformAPI.getConfig().persistenceNameOld;
}
var GravityEngineAPI = /*#__PURE__*/function () {
  function GravityEngineAPI(config) {
    _classCallCheck(this, GravityEngineAPI);
    config.appId = config.clientId ? _.checkAppId(config.clientId) : _.checkAppId(config.appid);
    config.accessToken = config.accessToken;
    config.serverUrl = "".concat(Config.BASE_URL, "/event/collect/?access_token=").concat(config.accessToken);
    var defaultConfig = _.extend({}, DEFAULT_CONFIG, PlatformAPI.getConfig());
    if (_.isObject(config)) {
      this.config = _.extend(defaultConfig, config);
    } else {
      this.config = defaultConfig;
    }
    this._init(this.config);
  }

  // internal init function. it should not be used by users.
  _createClass(GravityEngineAPI, [{
    key: "_init",
    value: function _init(config) {
      var _this3 = this;
      this.name = config.name;
      this.appId = config.clientId || config.appid;
      this.accessToken = config.accessToken;
      var serverUrl = config.serverUrl || config.server_url;
      this.serverUrl = serverUrl;
      this.serverDebugUrl = serverUrl;
      this.configUrl = serverUrl + "/config";
      this.autoTrackProperties = {};
      // cache commands.
      this._queue = [];
      this.config.syncBatchSize = 100;
      this.config.syncInterval = 60;
      if (config.isChildInstance) {
        this._state = {};
      } else {
        logger.enabled = config.enableLog;
        this.instances = []; // 子实例名称
        this._state = {
          getSystemInfo: false,
          initComplete: false
        };
        systemInformation.getSystemInfo(function () {
          _this3._updateState({
            getSystemInfo: true
          });
        });
        PlatformAPI.setGlobal(this, this.name);
      }
      this.store = new GravityEnginePersistence(config, function () {
        if (_this3.config.asyncPersistence && _.isFunction(_this3.config.persistenceComplete)) {
          _this3.config.persistenceComplete(_this3);
        }
        _this3._updateState();
      });
      this.enabled = _.isBoolean(this.store._get("ge_enabled")) ? this.store._get("ge_enabled") : true;
      this.isOptOut = _.isBoolean(this.store._get("ge_isOptOut")) ? this.store._get("ge_isOptOut") : false;
      if (getPlatFormName() === "GravityEngine_wechat_game" && config.autoTrack.appLaunch) {
        this.track("$MPLaunch", {
          $url_query: this.setQuery(this.getQuery()),
          $scene: String(PlatformAPI.getAppOptions().scene)
        });
      }
      if (!config.isChildInstance && config.autoTrack) {
        this.autoTrack = PlatformAPI.initAutoTrackInstance(this, config);
      }
    }
  }, {
    key: "updateConfig",
    value: function updateConfig(configUrl, appId) {
      // this.config.syncBatchSize = res.data["data"]["sync_batch_size"];
      // this.config.syncInterval = res.data["data"]["sync_interval"];
    }

    /**
     * 创建新的实例（子实例）。所有可以设置的属性都与主实例独立。
     *
     * @param {string} name 子实例名称
     * @param {object} config 可选 子实例配置信息
     */
  }, {
    key: "initInstance",
    value: function initInstance(name, config) {
      if (this.config.isChildInstance) {
        logger.warn("initInstance() cannot be called on child instance");
        return undefined;
      }
      if (_.isString(name) && name !== this.name && _.isUndefined(this[name])) {
        var instance = new GravityEngineAPI(_.extend({}, this.config, {
          enablePersistence: false,
          isChildInstance: true,
          name: name
        }, config));
        this[name] = instance;
        this.instances.push(name);
        this[name]._state = this._state;
        return instance;
      } else {
        logger.warn("initInstance() failed due to the name is invalid: " + name);
        return undefined;
      }
    }

    /**
     * 用于获取子实例，用于白鹭引擎 t.ds 代码调用
     *
     * @param {string} name 子实例名称
     */
  }, {
    key: "lightInstance",
    value: function lightInstance(name) {
      return this[name];
    }

    /**
     * 内部函数，用于设置与生命周期相关的一些预置属性
     *
     * 常见的属性有：
     * - $scene 场景值，在 onLaunch 回调中可获取。也可以根据平台接口主动获取
     * - $url_path 页面路径
     *
     * 在发送事件数据时，优先级为：事件属性 > 动态公共属性 > 公共事件属性 > 自动采集属性 > 其他预置属性
     *
     * @param {object} props 相关预置属性
     */
  }, {
    key: "_setAutoTrackProperties",
    value: function _setAutoTrackProperties(props) {
      _.extend(this.autoTrackProperties, props);
    }

    /**
     * 用户主动调用 init()，开始真正的上报。
     *
     * 在调用此函数之前，所有的上报请求将被缓存。当用户完成必要的设置时，调用此函数触发上报.
     */
  }, {
    key: "init",
    value: function init() {
      if (this._state.initComplete) return false;
      this._updateState({
        initComplete: true
      });
    }

    /**
     * 内部函数，判断是否完成初始化，可以真正发送数据
     *
     * 每个实例有三个异步状态
     * - getSystemInfo 是否获取到系统信息，子实例默认此状态为 true.
     * - initComplete 是否调用了init() 函数，true 则表明用户已经完成必要的初始化设置。子实例此状态默认为 true.
     * - store.initComplete 缓存信息是否已经读取完成
     */
  }, {
    key: "_isReady",
    value: function _isReady() {
      return this._state.getSystemInfo && this._state.initComplete && this.store.initComplete
      // this.getDeviceId()
      ;
    }
  }, {
    key: "_updateState",
    value: function _updateState(state) {
      var _this4 = this;
      if (_.isObject(state)) {
        _.extend(this._state, state);
      }
      this._onStateChange();
      _.each(this.instances, function (name) {
        _this4[name]._onStateChange();
      });
    }

    // 只有系统信息初始化完成，并且用户主动调用init()之后，才会真正的发送数据.
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      var _this5 = this;
      if (this._isReady() && this._queue && this._queue.length > 0) {
        _.each(this._queue, function (item) {
          _this5[item[0]].apply(_this5, slice.call(item[1]));
        });
        this._queue = [];
      }
    }
  }, {
    key: "_hasDisabled",
    value: function _hasDisabled() {
      var hasDisabled = !this.enabled || this.isOptOut;
      if (hasDisabled) {
        logger.info("GravityEngine is Pause or Stop!");
      }
      return hasDisabled;
    }

    // 发送请求。由于一些平台对网络连接数目的限制，我们使用 senderQueue 发送数据。
  }, {
    key: "_sendRequest",
    value: function _sendRequest(eventData, time, tryBeacon) {
      if (this._hasDisabled()) {
        return;
      }
      if (!_.isUndefined(this.config.disableEventList)) {
        if (this.config.disableEventList.includes(eventData.eventName)) {
          logger.info("disabled Event : " + eventData.eventName);
          return;
        }
      }
      time = _.isDate(time) ? time : new Date();
      var data = {
        event_list: [{
          // "$time": _.formatDate(time),
          type: eventData.type,
          time: Date.now()
          // "$distinct_id": this.store.getDistinctId(),
        }]
      };
      // if (this.store.getAccountId()) {
      //   data.event_list[0]["$account_id"] = this.store.getAccountId();
      // }
      data.event_list[0]["event"] = eventData.eventName;
      if (eventData.type === "track") {
        data.event_list[0]["properties"] = _.extend({}, systemInformation.properties, this.autoTrackProperties, this.store.getSuperProperties(), this.dynamicProperties ? this.dynamicProperties() : {});
        var startTimestamp = this.store.removeEventTimer(eventData.eventName);
        if (!_.isUndefined(startTimestamp)) {
          var durationMillisecond = new Date().getTime() - startTimestamp;
          var duration = parseFloat((durationMillisecond / 1000).toFixed(3));
          if (duration > 86400) {
            duration = 86400;
          } else if (duration < 0) {
            duration = 0;
          }
          data.event_list[0]["properties"]["$event_duration"] = duration;
        }
      } else {
        // eventData.type === "profile"
        data.event_list[0]["properties"] = {};
      }
      if (_.isObject(eventData.properties) && !_.isEmptyObject(eventData.properties)) {
        _.extend(data.event_list[0].properties, eventData.properties);
      }
      _.searchObjDate(data.event_list[0]);
      data["client_id"] = this.appId;
      logger.info(JSON.stringify(data, null, 4));
      var serverUrl = this.serverUrl;
      if (_.isBoolean(this.config.enableEncrypt) && this.config.enableEncrypt == true) {
        data.event_list[0] = _.generateEncryptyData(data.event_list[0], undefined);
      }
      if (tryBeacon) {
        var formData = new FormData();
        if (this.config.debugMode === "debug") {
          formData.append("source", "client");
          formData.append("appid", this.appId);
          formData.append("deviceId", this.getDeviceId());
          formData.append("data", JSON.stringify(data.event_list[0]));
        } else {
          var base64Data = _.base64Encode(JSON.stringify(data));
          formData.append("data", base64Data);
        }
        navigator.sendBeacon(serverUrl, formData);
        if (_.isFunction(eventData.onComplete)) {
          eventData.onComplete({
            statusCode: 200
          });
        }
      } else {
        senderQueue.enqueue(data, serverUrl, {
          maxRetries: this.config.maxRetries,
          sendTimeout: this.config.sendTimeout,
          callback: eventData.onComplete,
          debugMode: this.config.debugMode
        });
      }
    }

    // 是否为参数对象
  }, {
    key: "_isObjectParams",
    value: function _isObjectParams(obj) {
      return _.isObject(obj) && _.isFunction(obj.onComplete);
    }

    /**
     * 发送事件数据. 会对属性值进行校验.
     * @param {string} eventName 必填
     * @param {object} properties 可选
     * @param {date} time 可选
     * @param {function} onComplete 可选, 回调函数
     */
  }, {
    key: "track",
    value: function track(eventName, properties, time, onComplete) {
      if (this._hasDisabled()) {
        return;
      }
      if (this._isObjectParams(eventName)) {
        var options = eventName;
        eventName = options.eventName;
        properties = options.properties;
        time = options.time;
        onComplete = options.onComplete;
      }
      if (PropertyChecker.event(eventName) && PropertyChecker.properties(properties) || !this.config.strict) {
        this._internalTrack(eventName, properties, time, onComplete);
      } else if (_.isFunction(onComplete)) {
        onComplete({
          code: -1,
          msg: "invalid parameters"
        });
      }
    }

    // internal function. Do not call this function directly.
  }, {
    key: "_internalTrack",
    value: function _internalTrack(eventName, properties, time, onComplete, tryBeacon) {
      if (this._hasDisabled()) {
        return;
      }
      time = _.isDate(time) ? time : new Date();
      if (this._isReady()) {
        this._sendRequest({
          type: "track",
          eventName: eventName,
          properties: properties,
          onComplete: onComplete
        }, time, tryBeacon);
      } else {
        this._queue.push(["_internalTrack", [eventName, properties, time, onComplete]]);
      }
    }
  }, {
    key: "userSet",
    value: function userSet(properties, time, onComplete) {
      if (this._hasDisabled()) {
        return;
      }
      if (this._isObjectParams(properties)) {
        var options = properties;
        properties = options.properties;
        time = options.time;
        onComplete = options.onComplete;
      }
      if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
        time = _.isDate(time) ? time : new Date();
        if (this._isReady()) {
          this._sendRequest({
            type: "profile",
            eventName: "profile_set",
            properties: properties,
            onComplete: onComplete
          }, time);
        } else {
          this._queue.push(["userSet", [properties, time, onComplete]]);
        }
      } else {
        logger.warn("calling userSet failed due to invalid arguments");
        if (_.isFunction(onComplete)) {
          onComplete({
            code: -1,
            msg: "invalid parameters"
          });
        }
      }
    }
  }, {
    key: "userSetOnce",
    value: function userSetOnce(properties, time, onComplete) {
      if (this._hasDisabled()) {
        return;
      }
      if (this._isObjectParams(properties)) {
        var options = properties;
        properties = options.properties;
        time = options.time;
        onComplete = options.onComplete;
      }
      if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
        time = _.isDate(time) ? time : new Date();
        if (this._isReady()) {
          this._sendRequest({
            type: "profile",
            eventName: "profile_set_once",
            properties: properties,
            onComplete: onComplete
          }, time);
        } else {
          this._queue.push(["userSetOnce", [properties, time, onComplete]]);
        }
      } else {
        logger.warn("calling userSetOnce failed due to invalid arguments");
        if (_.isFunction(onComplete)) {
          onComplete({
            code: -1,
            msg: "invalid parameters"
          });
        }
      }
    }
  }, {
    key: "userAdd",
    value: function userAdd(properties, time, onComplete) {
      if (this._hasDisabled()) {
        return;
      }
      if (this._isObjectParams(properties)) {
        var options = properties;
        properties = options.properties;
        time = options.time;
        onComplete = options.onComplete;
      }
      if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
        time = _.isDate(time) ? time : new Date();
        if (this._isReady()) {
          this._sendRequest({
            type: "profile",
            eventName: "profile_increment",
            properties: properties,
            onComplete: onComplete
          }, time);
        } else {
          this._queue.push(["userAdd", [properties, time, onComplete]]);
        }
      } else {
        logger.warn("calling userAdd failed due to invalid arguments");
        if (_.isFunction(onComplete)) {
          onComplete({
            code: -1,
            msg: "invalid parameters"
          });
        }
      }
    }
  }, {
    key: "userDel",
    value: function userDel(time, onComplete) {
      var properties = {};
      if (this._hasDisabled()) {
        return;
      }
      if (this._isObjectParams(properties)) {
        var options = properties;
        properties = options.properties;
        time = options.time;
        onComplete = options.onComplete;
      }
      if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
        time = _.isDate(time) ? time : new Date();
        if (this._isReady()) {
          this._sendRequest({
            type: "profile",
            eventName: "profile_delete",
            properties: properties,
            onComplete: onComplete
          }, time);
        } else {
          this._queue.push(["userDel", [properties, time, onComplete]]);
        }
      } else {
        logger.warn("calling userDel failed due to invalid arguments");
        if (_.isFunction(onComplete)) {
          onComplete({
            code: -1,
            msg: "invalid parameters"
          });
        }
      }
    }
  }, {
    key: "userAppend",
    value: function userAppend(properties, time, onComplete) {
      if (this._hasDisabled()) {
        return;
      }
      if (this._isObjectParams(properties)) {
        var options = properties;
        properties = options.properties;
        time = options.time;
        onComplete = options.onComplete;
      }
      if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
        time = _.isDate(time) ? time : new Date();
        if (this._isReady()) {
          this._sendRequest({
            type: "profile",
            eventName: "profile_append",
            properties: properties,
            onComplete: onComplete
          }, time);
        } else {
          this._queue.push(["userAppend", [properties, time, onComplete]]);
        }
      } else {
        logger.warn("calling userAppend failed due to invalid arguments");
        if (_.isFunction(onComplete)) {
          onComplete({
            code: -1,
            msg: "invalid parameters"
          });
        }
      }
    }
  }, {
    key: "userUniqAppend",
    value: function userUniqAppend(properties, time, onComplete) {
      if (this._hasDisabled()) {
        return;
      }
      if (this._isObjectParams(properties)) {
        var options = properties;
        properties = options.properties;
        time = options.time;
        onComplete = options.onComplete;
      }
      if (PropertyChecker.userAppendProperties(properties) || !this.config.strict) {
        time = _.isDate(time) ? time : new Date();
        if (this._isReady()) {
          this._sendRequest({
            type: "profile",
            eventName: "profile_uniq_append",
            properties: properties,
            onComplete: onComplete
          }, time);
        } else {
          this._queue.push(["userUniqAppend", [properties, time, onComplete]]);
        }
      } else {
        logger.warn("calling userAppend failed due to invalid arguments");
        if (_.isFunction(onComplete)) {
          onComplete({
            code: -1,
            msg: "invalid parameters"
          });
        }
      }
    }
  }, {
    key: "userUnset",
    value: function userUnset(key, time, onComplete) {
      var properties = _defineProperty({}, key, null);
      if (this._hasDisabled()) {
        return;
      }
      if (this._isObjectParams(properties)) {
        var options = properties;
        properties = options.properties;
        time = options.time;
        onComplete = options.onComplete;
      }
      if (PropertyChecker.propertiesMust(properties) || !this.config.strict) {
        time = _.isDate(time) ? time : new Date();
        if (this._isReady()) {
          this._sendRequest({
            type: "profile",
            eventName: "profile_unset",
            properties: properties,
            onComplete: onComplete
          }, time);
        } else {
          this._queue.push(["userUnset", [properties, time, onComplete]]);
        }
      } else {
        logger.warn("calling userUnset failed due to invalid arguments");
        if (_.isFunction(onComplete)) {
          onComplete({
            code: -1,
            msg: "invalid parameters"
          });
        }
      }
    }
  }, {
    key: "logoutEvent",
    value: function logoutEvent() {
      this.track("$MPLogout", {});
    }
  }, {
    key: "loginEvent",
    value: function loginEvent() {
      this.track("$MPLogin", {});
    }
  }, {
    key: "registerEvent",
    value: function registerEvent() {
      this.track("$MPRegister", {});
    }
  }, {
    key: "payEvent",
    value: function payEvent($pay_amount, $pay_type, $order_id, $pay_reason, $pay_method, $is_first_pay) {
      if (typeof $pay_amount !== "number") {
        throw new Error("pay_amount must be a number");
      } else if (typeof $pay_type !== "string") {
        throw new Error("pay_type must be a string");
      } else if (typeof $order_id !== "string") {
        throw new Error("order_id must be a string");
      } else if (typeof $pay_reason !== "string") {
        throw new Error("pay_reason must be a string");
      } else if (typeof $pay_method !== "string") {
        throw new Error("pay_method must be a string");
      } else if (typeof $is_first_pay !== "boolean") {
        throw new Error("is_first_pay must be a boolean");
      }
      this.track("$PayEvent", {
        $pay_amount: $pay_amount,
        $pay_type: $pay_type,
        $order_id: $order_id,
        $pay_reason: $pay_reason,
        $pay_method: $pay_method,
        $is_first_pay: $is_first_pay
      });
    }
  }, {
    key: "adShowEvent",
    value: function adShowEvent($ad_type, $ad_unit_id) {
      if (typeof $ad_type !== "string") {
        throw new Error("ad_type must be a string");
      } else if (typeof $ad_unit_id !== "string") {
        throw new Error("ad_unit_id must be a string");
      }
      this.track("$AdShow", {
        $ad_type: $ad_type,
        $ad_unit_id: $ad_unit_id,
        $adn_type: "wechat"
      });
    }
  }, {
    key: "getQuery",
    value: function getQuery() {
      var query = PlatformAPI.getAppOptions().query || {};
      return query;
    }
  }, {
    key: "setQuery",
    value: function setQuery(obj) {
      var str = [];
      for (var p in obj) if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
      return str.join("&");
    }
  }, {
    key: "getPlatForm",
    value: function getPlatForm() {
      var query = this.getQuery();
      if (query.ksUnitId || query.ksCampaignId || query.ksChannel) {
        return "kuaishou";
      } else if (query.clue_token || query.ad_id || query.creative_id || query.request_id || query.advertiser_id) {
        return "bytedance";
      } else if (query.gdt_vid) {
        return "tencent";
      } else if (query.bd_vid) {
        return "baidu";
      } else {
        return "";
      }
    }
  }, {
    key: "sendNetWork",
    value: function sendNetWork(url, data) {
      return new Promise(function (resolve, reject) {
        PlatformAPI.request({
          url: url,
          method: "POST",
          data: data,
          header: {
            "content-type": "application/json"
          },
          success: function success(res) {
            if (res.statusCode === 200) {
              resolve(res.data);
              return;
            }
            reject(res);
          },
          fail: function fail(err) {
            reject(err);
          }
        });
      });
    }
  }, {
    key: "_errorPromise",
    value: function _errorPromise(msg) {
      return Promise.reject(new Error(msg));
    }
  }, {
    key: "register",
    value: function register() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var warn = "";
      if (!this._state.initComplete) {
        warn = "register must be called after init";
      } else if (!(e !== null && e !== void 0 && e.name)) {
        warn = "name must be required";
      } else if (!(e !== null && e !== void 0 && e.channel)) {
        warn = "channel must be required";
      } else if (!(e !== null && e !== void 0 && e.version) && (e === null || e === void 0 ? void 0 : e.version) !== 0) {
        warn = "version must be required";
      } else if (!_.isNumber(e === null || e === void 0 ? void 0 : e.version) || typeof (e === null || e === void 0 ? void 0 : e.version) !== "number") {
        warn = "version must be type: Number";
      }
      if (warn) {
        return this._errorPromise(warn);
      }
      var platform = this.getPlatForm();
      var data = {
        client_id: this.appId,
        name: e.name,
        channel: e.channel,
        version: e.version,
        media_type: platform || "tencent",
        wx_openid: (e === null || e === void 0 ? void 0 : e.wx_openid) || "",
        wx_unionid: (e === null || e === void 0 ? void 0 : e.wx_unionid) || "",
        click_id: (e === null || e === void 0 ? void 0 : e.click_id) || "",
        ad_data: {}
      };
      var query = this.getQuery();
      if (platform === "kuaishou") {
        data.ad_data = {
          callback: (query === null || query === void 0 ? void 0 : query.callback) || "",
          ksCampaignId: (query === null || query === void 0 ? void 0 : query.ksCampaignId) || "",
          ksUnitId: (query === null || query === void 0 ? void 0 : query.ksUnitId) || "",
          ksCreativeId: (query === null || query === void 0 ? void 0 : query.ksCreativeId) || "",
          ksChannel: (query === null || query === void 0 ? void 0 : query.ksChannel) || ""
        };
      } else if (platform === "bytedance") {
        data.ad_data = {
          clue_token: (query === null || query === void 0 ? void 0 : query.clue_token) || "",
          ad_id: (query === null || query === void 0 ? void 0 : query.ad_id) || "",
          creative_id: (query === null || query === void 0 ? void 0 : query.creative_id) || "",
          advertiser_id: (query === null || query === void 0 ? void 0 : query.advertiser_id) || "",
          request_id: (query === null || query === void 0 ? void 0 : query.request_id) || "",
          req_id: (query === null || query === void 0 ? void 0 : query.req_id) || "",
          // v2.0
          project_id: (query === null || query === void 0 ? void 0 : query.project_id) || "",
          promotion_id: (query === null || query === void 0 ? void 0 : query.promotion_id) || "",
          mid1: (query === null || query === void 0 ? void 0 : query.mid1) || "",
          mid2: (query === null || query === void 0 ? void 0 : query.mid2) || "",
          mid3: (query === null || query === void 0 ? void 0 : query.mid3) || "",
          mid4: (query === null || query === void 0 ? void 0 : query.mid4) || "",
          mid5: (query === null || query === void 0 ? void 0 : query.mid5) || ""
        };
      } else if (platform === "tencent") {
        data.ad_data = {
          gdt_vid: (query === null || query === void 0 ? void 0 : query.gdt_vid) || ""
        };
      } else if (platform === "baidu") {
        data.ad_data = {
          bd_vid: (query === null || query === void 0 ? void 0 : query.bd_vid) || ""
        };
      }
      if (query !== null && query !== void 0 && query.turbo_promoted_object_id) {
        data.promoted_object_id = query.turbo_promoted_object_id;
      }
      var url = "".concat(Config.BASE_URL, "/user/register/?access_token=").concat(this.accessToken);
      return this.sendNetWork(url, data);
    }
  }, {
    key: "handleEvent",
    value: function handleEvent() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var warn = "";
      if (!this._state.initComplete) {
        warn = "handleEvent must be called after init";
      }
      var data = {
        event_type: e.event_type
      };
      if (e !== null && e !== void 0 && e.properties) {
        data.properties = e.properties;
      }
      data.use_client_time = (e === null || e === void 0 ? void 0 : e.use_client_time) || false;
      if (data.use_client_time && !(e !== null && e !== void 0 && e.timestamp)) {
        warn = "timestamp must be required";
      }
      if (warn) {
        return this._errorPromise(warn);
      }
      if (e !== null && e !== void 0 && e.timestamp) {
        data.timestamp = e.timestamp;
      }
      if (e !== null && e !== void 0 && e.trace_id) {
        data.trace_id = e.trace_id;
      }
      data.timestamp = (e === null || e === void 0 ? void 0 : e.timestamp) || new Date().getTime();
      var url = "".concat(Config.BASE_URL, "/event/handle_event/?access_token=").concat(this.accessToken, "&client_id=").concat(this.appId);
      return this.sendNetWork(url, data);
    }
  }, {
    key: "queryUser",
    value: function queryUser() {
      var warn = "";
      if (!this._state.initComplete) {
        warn = "queryUser must be called after init";
      }
      if (warn) {
        return this._errorPromise(warn);
      }
      var data = {
        user_list: [this.appId]
      };
      var url = "".concat(Config.BASE_URL, "/user/get/?access_token=").concat(this.accessToken);
      return this.sendNetWork(url, data);
    }
  }, {
    key: "authorizeOpenID",
    value: function authorizeOpenID(id) {
      this.identify(id);
    }
  }, {
    key: "identify",
    value: function identify(id) {
      if (this._hasDisabled()) {
        return;
      }
      if (typeof id === "number") {
        id = String(id);
      } else if (typeof id !== "string") {
        return false;
      }
      this.store.setDistinctId(id);
    }
  }, {
    key: "getDistinctId",
    value: function getDistinctId() {
      return this.store.getDistinctId();
    }
  }, {
    key: "login",
    value: function login(accoundId) {
      if (this._hasDisabled()) {
        return;
      }
      if (typeof accoundId === "number") {
        accoundId = String(accoundId);
      } else if (typeof accoundId !== "string") {
        return false;
      }
      this.store.setAccountId(accoundId);
    }
  }, {
    key: "getAccountId",
    value: function getAccountId() {
      return this.store.getAccountId();
    }
  }, {
    key: "logout",
    value: function logout() {
      if (this._hasDisabled()) {
        return;
      }
      this.store.setAccountId(null);
    }
  }, {
    key: "setSuperProperties",
    value: function setSuperProperties(obj) {
      if (this._hasDisabled()) {
        return;
      }
      if (PropertyChecker.propertiesMust(obj) || !this.config.strict) {
        this.store.setSuperProperties(obj);
      } else {
        logger.warn("setSuperProperties parameter must be a valid property value");
      }
    }
  }, {
    key: "registerApp",
    value: function registerApp(obj) {
      this.setSuperProperties(obj);
    }
  }, {
    key: "clearSuperProperties",
    value: function clearSuperProperties() {
      if (this._hasDisabled()) {
        return;
      }
      this.store.setSuperProperties({}, true);
    }
  }, {
    key: "unsetSuperProperty",
    value: function unsetSuperProperty(propertyName) {
      if (this._hasDisabled()) {
        return;
      }
      if (_.isString(propertyName)) {
        var superProperties = this.getSuperProperties();
        delete superProperties[propertyName];
        this.store.setSuperProperties(superProperties, true);
      }
    }
  }, {
    key: "getSuperProperties",
    value: function getSuperProperties() {
      return this.store.getSuperProperties();
    }
  }, {
    key: "getPresetProperties",
    value: function getPresetProperties() {
      var properties = systemInformation.properties;
      var presetProperties = {};
      var system_language = properties["$system_language"];
      presetProperties.system_language = _.isUndefined(system_language) ? "" : system_language;
      var os = properties["$os"];
      presetProperties.os = _.isUndefined(os) ? "" : os;
      var screenWidth = properties["$screen_width"];
      presetProperties.screenWidth = _.isUndefined(screenWidth) ? 0 : screenWidth;
      var screenHeight = properties["$screen_height"];
      presetProperties.screenHeight = _.isUndefined(screenHeight) ? 0 : screenHeight;
      var networkType = properties["$network_type"];
      presetProperties.networkType = _.isUndefined(networkType) ? "" : networkType;
      var deviceModel = properties["$model"];
      presetProperties.deviceModel = _.isUndefined(deviceModel) ? "" : deviceModel;
      var osVersion = properties["$os_version"];
      presetProperties.osVersion = _.isUndefined(osVersion) ? "" : osVersion;
      presetProperties.deviceId = this.getDeviceId();
      var zoneOffset = 0 - new Date().getTimezoneOffset() / 60.0;
      presetProperties.zoneOffset = zoneOffset;
      var manufacturer = properties["$manufacturer"];
      presetProperties.manufacturer = _.isUndefined(manufacturer) ? "" : manufacturer;
      presetProperties.toEventPresetProperties = function () {
        return {
          $app_id: this.appId,
          $model: presetProperties.deviceModel,
          // "$device_id": presetProperties.deviceId,
          $screen_width: presetProperties.screenWidth,
          $screen_height: presetProperties.screenHeight,
          $system_language: presetProperties.system_language,
          $os: presetProperties.os,
          $os_version: presetProperties.osVersion,
          $network_type: presetProperties.networkType,
          $manufacturer: presetProperties.manufacturer
        };
      };
      return presetProperties;
    }
  }, {
    key: "setDynamicSuperProperties",
    value: function setDynamicSuperProperties(dynamicProperties) {
      if (this._hasDisabled()) {
        return;
      }
      if (typeof dynamicProperties === "function") {
        if (PropertyChecker.properties(dynamicProperties()) || !this.config.strict) {
          this.dynamicProperties = dynamicProperties;
        } else {
          logger.warn("A dynamic public property must return a valid property value");
        }
      } else {
        logger.warn("setDynamicSuperProperties parameter must be a function type");
      }
    }
  }, {
    key: "timeEvent",
    value: function timeEvent(eventName, time) {
      if (this._hasDisabled()) {
        return;
      }
      time = _.isDate(time) ? time : new Date();
      if (this._isReady()) {
        if (PropertyChecker.event(eventName) || !this.config.strict) {
          this.store.setEventTimer(eventName, time.getTime());
        } else {
          logger.warn("calling timeEvent failed due to invalid eventName: " + eventName);
        }
      } else {
        this._queue.push(["timeEvent", [eventName, time]]);
      }
    }
  }, {
    key: "getDeviceId",
    value: function getDeviceId() {
      return systemInformation.properties["$device_id"];
    }

    /**
     * 暂停/开启上报
     * @param {bool} enabled YES：开启上报 NO：暂停上报
     * @deprecated This method is deprecated, use setTrackStatus() instand.
     */
  }, {
    key: "enableTracking",
    value: function enableTracking(enabled) {
      this.enabled = enabled;
      this.store._set("ta_enabled", enabled);
    }

    /**
     * 停止上报，后续的上报和设置都无效，数据将清空
     * @deprecated This method is deprecated, use setTrackStatus() instand.
     */
  }, {
    key: "optOutTracking",
    value: function optOutTracking() {
      this.store.setSuperProperties({}, true);
      this.store.setDistinctId(_.UUID());
      this.store.setAccountId(null);
      this._queue.splice(0, this._queue.length);
      this.isOptOut = true;
      this.store._set("ge_isOptOut", true);
    }

    /**
     * 停止上报，后续的上报和设置都无效，数据将清空，并且发送 user_del
     * @deprecated This method is deprecated, use setTrackStatus() instand.
     */
  }, {
    key: "optOutTrackingAndDeleteUser",
    value: function optOutTrackingAndDeleteUser() {
      var time = new Date();
      this._sendRequest({
        type: "user_del"
      }, time);
      this.optOutTracking();
    }

    /**
     * 允许上报
     * @deprecated This method is deprecated, use setTrackStatus() instand.
     */
  }, {
    key: "optInTracking",
    value: function optInTracking() {
      this.isOptOut = false;
      this.store._set("ge_isOptOut", false);
    }

    /**
     * 设置数据上报状态
     * PAUSE 暂停数据上报
     * STOP 停止数据上报，并清除缓存
     * SAVE_ONLY 数据入库，但不上报 (接入Native原生可支持，JS暂不支持此状态，默认等同 NORMAL)
     * NORMAL 恢复数据上报
     * @param {string} status 上报状态
     */
  }, {
    key: "setTrackStatus",
    value: function setTrackStatus(status) {
      switch (status) {
        case "PAUSE":
          this.eventSaveOnly = false;
          this.optInTracking();
          this.enableTracking(false);
          break;
        case "STOP":
          this.eventSaveOnly = false;
          // this.enableTracking(false);
          this.optOutTracking(true);
          break;
        case "SAVE_ONLY":
        // this.eventSaveOnly = true;
        // this.enableTracking(false);
        // this.optInTracking();
        // break;
        case "NORMAL":
        default:
          this.eventSaveOnly = false;
          this.optInTracking();
          this.enableTracking(true);
          break;
      }
    }
  }]);
  return GravityEngineAPI;
}();

var DEFAULT_CONFIG$1 = {
  name: "GravityEngine",
  // 全局变量名称
  enableLog: true,
  // 是否打开日志
  enableNative: false
};

// export default class GravityEngineAPIForNative {}
var GravityEngineAPIForNative = /*#__PURE__*/function () {
  function GravityEngineAPIForNative(config) {
    _classCallCheck(this, GravityEngineAPIForNative);
    config.appId = config.clientId ? _.checkAppId(config.clientId) : _.checkAppId(config.appid);
    config.accessToken = config.accessToken;
    config.serverUrl = "".concat(Config.BASE_URL, "/event/collect/?access_token=").concat(config.accessToken);
    var defaultConfig = _.extend({}, DEFAULT_CONFIG$1);
    if (_.isObject(config)) {
      this.config = _.extend(defaultConfig, config);
    } else {
      this.config = defaultConfig;
    }
    this._init(this.config);
  }

  // 判断是否native平台，目前支持 iOS
  _createClass(GravityEngineAPIForNative, [{
    key: "_isNativePlatform",
    value: function _isNativePlatform() {
      if ((this._isIOS() || this._isAndroid()) && this.config.enableNative) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "_isIOS",
    value: function _isIOS() {
      if (egret.Capabilities.os === "iOS" && egret.Capabilities.runtimeType === egret.RuntimeType.RUNTIME2) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "_isAndroid",
    value: function _isAndroid() {
      if (egret.Capabilities.os === "Android" && egret.Capabilities.runtimeType === egret.RuntimeType.RUNTIME2) {
        return true;
      } else {
        return false;
      }
    }
    // internal init function. it should not be used by users.
  }, {
    key: "_init",
    value: function _init(config) {
      this.name = config.name;
      this.appId = config.clientId || config.appid;
      this.accessToken = config.accessToken;
      var serverUrl = config.serverUrl || config.server_url;
      this.serverUrl = serverUrl;
      this.serverDebugUrl = serverUrl + "/data_debug";
      this.configUrl = serverUrl + "/config";
      if (this._isNativePlatform()) {
        this.initInstanceForNative(this.name, config, this.appId);
        this._readStorage(config);
      } else {
        this.geJs = new GravityAnalyticsAPIForJS(config);
      }
    }

    // 读取js层存储的访客id/账号id，传递到native层，保持账号系统一致
  }, {
    key: "_readStorage",
    value: function _readStorage(config) {
      var _this = this;
      var name = config.persistenceName;
      var nameOld = config.persistenceNameOld;
      if (config.isChildInstance) {
        name = config.persistenceName + "_" + config.name;
        nameOld = config.persistenceNameOld + "_" + config.name;
      }
      // 先尝试同步获取js层缓存，如失败则异步获取js层缓存
      this._state = PlatformAPI.getStorage(name) || {};
      if (_.isEmptyObject(this._state)) {
        this._state = PlatformAPI.getStorage(nameOld) || {};
      }
      if (_.isEmptyObject(this._state)) {
        PlatformAPI.getStorage(name, true, function (data) {
          if (_.isEmptyObject(data)) {
            PlatformAPI.getStorage(nameOld, true, function (dataOld) {
              _this._state = _.extend2Layers({}, dataOld, _this._state);
            });
          } else {
            _this._state = _.extend2Layers({}, data, _this._state);
          }
          //获取js层缓存成功，提取访客id和账号id
          if (_this._state.distinct_id) {
            _this.identifyForNative(_this._state.distinct_id);
          }
          if (_this._state.account_id) {
            _this.loginForNative(_this._state.account_id);
          }
        });
      } else {
        //获取js层缓存成功，提取访客id和账号id
        if (this._state.distinct_id) {
          this.identifyForNative(this._state.distinct_id);
        }
        if (this._state.account_id) {
          this.loginForNative(this._state.account_id);
        }
      }
    }

    /**
     * 创建新的实例（子实例）。所有可以设置的属性都与主实例独立。
     *
     * @param {string} name 子实例名称
     * @param {object} config 可选 子实例配置信息
     */
  }, {
    key: "initInstance",
    value: function initInstance(name, config) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        if (!_.isUndefined(config)) {
          this[name] = new GravityAnalyticsAPI(config);
        } else {
          this[name] = new GravityAnalyticsAPI(this.config);
        }
        return this[name];
      }
      this[name] = this.geJs.initInstance(name, config);
      return this[name];
    }

    /**
     * 用于获取子实例，用于白鹭引擎 t.ds 代码调用
     *
     * @param {string} name 子实例名称
     */
  }, {
    key: "lightInstance",
    value: function lightInstance(name) {
      return this[name];
    }

    /**
     * 用户主动调用 init()，开始真正的上报。
     *
     * 在调用此函数之前，所有的上报请求将被缓存。当用户完成必要的设置时，调用此函数触发上报.
     */
  }, {
    key: "init",
    value: function init() {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        var w = window;
        var _that = this;
        w.__autoTrackCallback = function (s) {
          if (_.isFunction(_that.config.autoTrack.callback)) {
            var properties = _that.config.autoTrack.callback(s);
            return JSON.stringify(properties);
          } else {
            return "{}";
          }
        };
        this.startGravityAnalyticsForNative();
        return;
      }
      this.geJs.init();
    }

    /**
     * 发送事件数据. 会对属性值进行校验.
     * @param {string} eventName 必填
     * @param {object} properties 可选
     * @param {date} time 可选
     * @param {function} onComplete 可选, 回调函数
     */
  }, {
    key: "track",
    value: function track(eventName, properties, time, onComplete) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.trackForNative(eventName, properties, time, this.appId);
        return;
      }
      this.geJs.track(eventName, properties, time, onComplete);
    }
  }, {
    key: "register",
    value: function register() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (this._isNativePlatform()) {
        //   this.registerForNative(e, this.appId);
        return;
      }
      return this.geJs.register(e);
    }
  }, {
    key: "handleEvent",
    value: function handleEvent() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (this._isNativePlatform()) {
        //   this.handleEventForNative(e, this.appId);
        return;
      }
      return this.geJs.handleEvent(e);
    }
  }, {
    key: "queryUser",
    value: function queryUser() {
      if (this._isNativePlatform()) {
        //   this.queryUserForNative(e, this.appId);
        return;
      }
      return this.geJs.queryUser();
    }
  }, {
    key: "registerApp",
    value: function registerApp(obj) {
      if (this._isNativePlatform()) {
        //   this.registerAppForNative(e, this.appId);
        return;
      }
      return this.geJs.registerApp(obj);
    }
  }, {
    key: "registerEvent",
    value: function registerEvent() {
      if (this._isNativePlatform()) {
        //   this.registerEventForNative(e, this.appId);
        return;
      }
      return this.geJs.registerEvent();
    }
  }, {
    key: "loginEvent",
    value: function loginEvent() {
      if (this._isNativePlatform()) {
        //   this.loginEventForNative(e, this.appId);
        return;
      }
      return this.geJs.loginEvent();
    }
  }, {
    key: "logoutEvent",
    value: function logoutEvent() {
      if (this._isNativePlatform()) {
        //   this.logoutEventForNative(e, this.appId);
        return;
      }
      return this.geJs.logoutEvent();
    }
  }, {
    key: "payEvent",
    value: function payEvent($pay_amount, $pay_type, $order_id, $pay_reason, $pay_method, $is_first_pay) {
      if (this._isNativePlatform()) {
        return;
      }
      return this.geJs.payEvent($pay_amount, $pay_type, $order_id, $pay_reason, $pay_method, $is_first_pay);
    }
  }, {
    key: "adShowEvent",
    value: function adShowEvent($ad_type, $ad_unit_id) {
      if (this._isNativePlatform()) {
        return;
      }
      return this.geJs.adShowEvent($ad_type, $ad_unit_id);
    }
  }, {
    key: "userSet",
    value: function userSet(properties, time, onComplete) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.userSetForNative(properties, this.appId);
        return;
      }
      this.geJs.userSet(properties, time, onComplete);
    }
  }, {
    key: "userSetOnce",
    value: function userSetOnce(properties, time, onComplete) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.userSetOnceForNative(properties, this.appId);
        return;
      }
      this.geJs.userSetOnce(properties, time, onComplete);
    }
  }, {
    key: "userUnset",
    value: function userUnset(property, time, onComplete) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.userUnsetForNative(property, this.appId);
        return;
      }
      this.geJs.userUnset(property, time, onComplete);
    }
  }, {
    key: "userDel",
    value: function userDel(time, onComplete) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.userDelForNative(this.appId);
        return;
      }
      this.geJs.userDel(time, onComplete);
    }
  }, {
    key: "userAdd",
    value: function userAdd(properties, time, onComplete) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.userAddForNative(properties, this.appId);
        return;
      }
      this.geJs.userAdd(properties, time, onComplete);
    }
  }, {
    key: "userAppend",
    value: function userAppend(properties, time, onComplete) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.userAppendForNative(properties, this.appId);
        return;
      }
      this.geJs.userAppend(properties, time, onComplete);
    }
  }, {
    key: "userUniqAppend",
    value: function userUniqAppend(properties, time, onComplete) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.userUniqAppendForNative(properties, this.appId);
        return;
      }
      this.geJs.userUniqAppend(properties, time, onComplete);
    }
  }, {
    key: "authorizeOpenID",
    value: function authorizeOpenID(id) {
      this.identify(id);
    }
  }, {
    key: "identify",
    value: function identify(id) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.identifyForNative(id, this.appId);
        return;
      }
      this.geJs.identify(id);
    }
  }, {
    key: "getDistinctId",
    value: function getDistinctId(callback) {
      if (!_.isUndefined(callback)) {
        if (this._isNativePlatform()) {
          //判断是否是原生平台并且是否是iOS平台
          this.getDistinctIdForNative(callback, this.appId);
          return;
        } else {
          callback(this.geJs.getDistinctId());
        }
      }
      return this.geJs.getDistinctId();
    }
  }, {
    key: "login",
    value: function login(accoundId) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.loginForNative(accoundId, this.appId);
        return;
      }
      this.geJs.login(accoundId);
    }
  }, {
    key: "getAccountId",
    value: function getAccountId(callback) {
      if (!_.isUndefined(callback)) {
        if (this._isNativePlatform()) {
          //判断是否是原生平台并且是否是iOS平台
          this.getAccountIdForNative(callback, this.appId);
          return;
        } else {
          callback(this.geJs.getAccountId());
        }
      }
      return this.geJs.getAccountId();
    }
  }, {
    key: "logout",
    value: function logout() {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.logoutForNative(this.appId);
        return;
      }
      this.geJs.logout();
    }
  }, {
    key: "setSuperProperties",
    value: function setSuperProperties(obj) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.setSuperPropertiesForNative(obj, this.appId);
        return;
      }
      this.geJs.setSuperProperties(obj);
    }
  }, {
    key: "clearSuperProperties",
    value: function clearSuperProperties() {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.clearSuperPropertiesForNative(this.appId);
        return;
      }
      this.geJs.clearSuperProperties();
    }
  }, {
    key: "unsetSuperProperty",
    value: function unsetSuperProperty(propertyName) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.unsetSuperPropertyForNative(propertyName, this.appId);
        return;
      }
      this.geJs.unsetSuperProperty(propertyName);
    }
  }, {
    key: "getSuperProperties",
    value: function getSuperProperties(callback) {
      if (!_.isUndefined(callback)) {
        if (this._isNativePlatform()) {
          //判断是否是原生平台并且是否是iOS平台
          this.getSuperPropertiesForNative(callback, this.appId);
          return;
        } else {
          callback(this.geJs.getSuperProperties());
        }
      }
      return this.geJs.getSuperProperties();
    }
  }, {
    key: "getPresetProperties",
    value: function getPresetProperties(callback) {
      if (!_.isUndefined(callback)) {
        if (this._isNativePlatform()) {
          //判断是否是原生平台并且是否是iOS平台
          this.getPresetPropertiesForNative(callback, this.appId);
          return;
        } else {
          callback(this.geJs.getPresetProperties());
        }
      }
      return this.geJs.getPresetProperties();
    }
  }, {
    key: "setDynamicSuperProperties",
    value: function setDynamicSuperProperties(dynamicProperties) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        if (typeof dynamicProperties === "function") {
          this.dynamicProperties = dynamicProperties;
        } else {
          logger.warn("setDynamicSuperProperties parameter must be a function type");
        }
        return;
      }
      this.geJs.setDynamicSuperProperties(dynamicProperties);
    }
  }, {
    key: "timeEvent",
    value: function timeEvent(eventName, time) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        return this.timeEventForNative(eventName, this.appId);
      }
      return this.geJs.timeEvent(eventName, time);
    }
  }, {
    key: "getDeviceId",
    value: function getDeviceId(callback) {
      if (!_.isUndefined(callback)) {
        if (this._isNativePlatform()) {
          //判断是否是原生平台并且是否是iOS平台
          this.getDeviceIdForNative(callback, this.appId);
          return;
        } else {
          callback(this.geJs.getDeviceId());
        }
      }
      return this.geJs.getDeviceId();
    }

    /**
     * 暂停/开启上报
     * @param {bool} enabled YES：开启上报 NO：暂停上报
     * @deprecated This method is deprecated, use setTrackStatus() instand.
     */
  }, {
    key: "enableTracking",
    value: function enableTracking(enabled) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.enableTrackingForNative(enabled, this.appId);
        return;
      }
      this.geJs.enableTracking(enabled);
    }

    /**
     * 停止上报，后续的上报和设置都无效，数据将清空
     * @deprecated This method is deprecated, use setTrackStatus() instand.
     */
  }, {
    key: "optOutTracking",
    value: function optOutTracking() {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.optOutTrackingForNative(this.appId);
        return;
      }
      this.geJs.optOutTracking();
    }

    /**
     * 停止上报，后续的上报和设置都无效，数据将清空，并且发送 user_del
     * @deprecated This method is deprecated, use setTrackStatus() instand.
     */
  }, {
    key: "optOutTrackingAndDeleteUser",
    value: function optOutTrackingAndDeleteUser() {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.optOutTrackingAndDeleteUserForNative(this.appId);
        return;
      }
      this.geJs.optOutTrackingAndDeleteUser();
    }

    /**
     * 允许上报
     * @deprecated This method is deprecated, use setTrackStatus() instand.
     */
  }, {
    key: "optInTracking",
    value: function optInTracking() {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.optInTrackingForNative(this.appId);
        return;
      }
      this.geJs.optInTracking();
    }

    /**
     * 设置数据上报状态
     * PAUSE 暂停数据上报
     * STOP 停止数据上报，并清除缓存
     * SAVE_ONLY 数据入库，但不上报 (接入Native原生可支持，JS暂不支持此状态，默认等同 NORMAL)
     * NORMAL 恢复数据上报
     * @param {string} status 上报状态
     */
  }, {
    key: "setTrackStatus",
    value: function setTrackStatus(status) {
      if (this._isNativePlatform()) {
        //判断是否是原生平台并且是否是iOS平台
        this.setTrackStatusForNative(status, this.appId);
        return;
      }
      this.geJs.setTrackStatus(status);
    }
  }, {
    key: "trackForNative",
    value: function trackForNative(eventName, properties, time, appId) {
      var formatTime = _.isDate(time) ? _.formatDate(time) : "";
      eventName = !_.isUndefined(eventName) ? eventName : "";
      properties = !_.isUndefined(properties) ? properties : {};
      formatTime = !_.isUndefined(formatTime) ? formatTime : "";
      appId = !_.isUndefined(appId) ? appId : "";
      var params = _.extend(properties, this.dynamicProperties ? this.dynamicProperties() : {});
      params = _.encodeDates(params);
      var msg = {
        eventName: eventName,
        properties: JSON.stringify(params),
        formatTime: formatTime,
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("track", jsonMsg);
    }
  }, {
    key: "timeEventForNative",
    value: function timeEventForNative(eventName, appId) {
      eventName = !_.isUndefined(eventName) ? eventName : "";
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        eventName: eventName,
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("timeEvent", jsonMsg);
    }
  }, {
    key: "loginForNative",
    value: function loginForNative(accoundId, appId) {
      accoundId = !_.isUndefined(accoundId) ? accoundId : "";
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        accoundId: accoundId,
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("login", jsonMsg);
    }
  }, {
    key: "logoutForNative",
    value: function logoutForNative(appId) {
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("logout", jsonMsg);
    }
  }, {
    key: "setSuperPropertiesForNative",
    value: function setSuperPropertiesForNative(properties, appId) {
      properties = !_.isUndefined(properties) ? properties : {};
      appId = !_.isUndefined(appId) ? appId : "";
      properties = _.encodeDates(properties);
      var msg = {
        properties: JSON.stringify(properties),
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("setSuperProperties", jsonMsg);
    }
  }, {
    key: "getSuperPropertiesForNative",
    value: function getSuperPropertiesForNative(callback, appId) {
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.addCallback("getSuperProperties", function (n) {
        callback(JSON.parse(n));
      });
      egret.ExternalInterface.call("getSuperProperties", jsonMsg);
    }
  }, {
    key: "unsetSuperPropertyForNative",
    value: function unsetSuperPropertyForNative(property, appId) {
      property = !_.isUndefined(property) ? property : "";
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        property: property,
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("unsetSuperProperty", jsonMsg);
    }
  }, {
    key: "clearSuperPropertiesForNative",
    value: function clearSuperPropertiesForNative(appId) {
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("clearSuperProperties", jsonMsg);
    }
  }, {
    key: "userSetForNative",
    value: function userSetForNative(properties, appId) {
      properties = !_.isUndefined(properties) ? properties : {};
      appId = !_.isUndefined(appId) ? appId : "";
      properties = _.encodeDates(properties);
      var msg = {
        properties: JSON.stringify(properties),
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("userSet", jsonMsg);
    }
  }, {
    key: "userSetOnceForNative",
    value: function userSetOnceForNative(properties, appId) {
      properties = !_.isUndefined(properties) ? properties : {};
      appId = !_.isUndefined(appId) ? appId : "";
      properties = _.encodeDates(properties);
      var msg = {
        properties: JSON.stringify(properties),
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("userSetOnce", jsonMsg);
    }
  }, {
    key: "userAppendForNative",
    value: function userAppendForNative(properties, appId) {
      properties = !_.isUndefined(properties) ? properties : {};
      appId = !_.isUndefined(appId) ? appId : "";
      properties = _.encodeDates(properties);
      var msg = {
        properties: JSON.stringify(properties),
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("userAppend", jsonMsg);
    }
  }, {
    key: "userUniqAppendForNative",
    value: function userUniqAppendForNative(properties, appId) {
      properties = !_.isUndefined(properties) ? properties : {};
      appId = !_.isUndefined(appId) ? appId : "";
      properties = _.encodeDates(properties);
      var msg = {
        properties: JSON.stringify(properties),
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("userUniqAppend", jsonMsg);
    }
  }, {
    key: "userAddForNative",
    value: function userAddForNative(properties, appId) {
      properties = !_.isUndefined(properties) ? properties : {};
      appId = !_.isUndefined(appId) ? appId : "";
      properties = _.encodeDates(properties);
      var msg = {
        properties: JSON.stringify(properties),
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("userAdd", jsonMsg);
    }
  }, {
    key: "userUnsetForNative",
    value: function userUnsetForNative(property, appId) {
      property = !_.isUndefined(property) ? property : "";
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        property: property,
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("userUnset", jsonMsg);
    }
  }, {
    key: "userDelForNative",
    value: function userDelForNative(appId) {
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("userDel", jsonMsg);
    }
  }, {
    key: "authorizeOpenIDForNative",
    value: function authorizeOpenIDForNative(distinctId, appId) {
      this.identifyForNative(distinctId, appId);
    }
  }, {
    key: "identifyForNative",
    value: function identifyForNative(distinctId, appId) {
      distinctId = !_.isUndefined(distinctId) ? distinctId : "";
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        distinctId: distinctId,
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("identify", jsonMsg);
    }
  }, {
    key: "initInstanceForNative",
    value: function initInstanceForNative(name, config, appId) {
      name = !_.isUndefined(name) ? name : "";
      config = !_.isUndefined(config) ? config : {};
      appId = !_.isUndefined(appId) ? appId : "";
      egret.ExternalInterface.call("setCustomerLibInfo", JSON.stringify({
        libName: Config.LIB_NAME,
        libVersion: Config.LIB_VERSION
      }));
      if (!_.isUndefined(config)) {
        var msg = {
          name: name,
          config: JSON.stringify(config)
        };
        var jsonMsg = JSON.stringify(msg);
        egret.ExternalInterface.call("initInstanceConfig", jsonMsg);
      } else {
        var _msg = {
          name: name,
          appId: appId
        };
        var _jsonMsg = JSON.stringify(_msg);
        egret.ExternalInterface.call("initInstanceAppId", _jsonMsg);
      }
    }
  }, {
    key: "lightInstanceForNative",
    value: function lightInstanceForNative(name, appId, callback) {
      name = !_.isUndefined(name) ? name : "";
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        name: name,
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.addCallback("lightInstance", function (n) {
        callback(n);
      });
      egret.ExternalInterface.call("lightInstance", jsonMsg);
    }
  }, {
    key: "startGravityAnalyticsForNative",
    value: function startGravityAnalyticsForNative(appId) {
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("startGravityAnalytics", jsonMsg);
    }
    // setDynamicSuperPropertiesForNative(dynamicProperties, appId) {
    //     appId = !_.isUndefined(appId)?appId:'';
    //     let msg = {dynamicProperties: dynamicProperties, appId: appId};
    //     let jsonMsg = JSON.stringify(msg);
    //     egret.ExternalInterface.addCallback('setDynamicSuperProperties', function(n) {
    //         // let properties = dynamicProperties();
    //     });
    //     egret.ExternalInterface.call('setDynamicSuperProperties', jsonMsg);
    // }
  }, {
    key: "getDeviceIdForNative",
    value: function getDeviceIdForNative(callback, appId) {
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.addCallback("getDeviceId", function (n) {
        callback(n);
      });
      egret.ExternalInterface.call("getDeviceId", jsonMsg);
    }
  }, {
    key: "getDistinctIdForNative",
    value: function getDistinctIdForNative(callback, appId) {
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.addCallback("getDistinctId", function (n) {
        callback(n);
      });
      egret.ExternalInterface.call("getDistinctId", jsonMsg);
    }
  }, {
    key: "getAccountIdForNative",
    value: function getAccountIdForNative(callback, appId) {
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.addCallback("getAccountId", function (n) {
        callback(n);
      });
      egret.ExternalInterface.call("getAccountId", jsonMsg);
    }
  }, {
    key: "getPresetPropertiesForNative",
    value: function getPresetPropertiesForNative(callback, appId) {
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.addCallback("getPresetProperties", function (n) {
        var properties = JSON.parse(n);
        var presetProperties = {};
        var system_language = properties["$system_language"];
        presetProperties.system_language = _.isUndefined(system_language) ? "" : system_language;
        var os = properties["$os"];
        presetProperties.os = _.isUndefined(os) ? "" : os;
        var screenWidth = properties["$screen_width"];
        presetProperties.screenWidth = _.isUndefined(screenWidth) ? 0 : screenWidth;
        var screenHeight = properties["$screen_height"];
        presetProperties.screenHeight = _.isUndefined(screenHeight) ? 0 : screenHeight;
        var networkType = properties["$network_type"];
        presetProperties.networkType = _.isUndefined(networkType) ? "" : networkType;
        var deviceModel = properties["$device_model"];
        presetProperties.deviceModel = _.isUndefined(deviceModel) ? "" : deviceModel;
        var osVersion = properties["$os_version"];
        presetProperties.osVersion = _.isUndefined(osVersion) ? "" : osVersion;
        var deviceId = properties["$device_id"];
        presetProperties.deviceId = _.isUndefined(deviceId) ? "" : deviceId;
        var zoneOffset = properties["$zone_offset"];
        presetProperties.zoneOffset = _.isUndefined(zoneOffset) ? "" : zoneOffset;
        var manufacturer = properties["$manufacturer"];
        presetProperties.manufacturer = _.isUndefined(manufacturer) ? "" : manufacturer;
        presetProperties.toEventPresetProperties = function () {
          return {
            $device_model: presetProperties.deviceModel,
            $device_id: presetProperties.deviceId,
            $screen_width: presetProperties.screenWidth,
            $screen_height: presetProperties.screenHeight,
            $system_language: presetProperties.system_language,
            $os: presetProperties.os,
            $os_version: presetProperties.osVersion,
            $network_type: presetProperties.networkType,
            $zone_offset: presetProperties.zoneOffset,
            $manufacturer: presetProperties.manufacturer
          };
        };
        callback(presetProperties);
      });
      egret.ExternalInterface.call("getPresetProperties", jsonMsg);
    }
  }, {
    key: "enableTrackingForNative",
    value: function enableTrackingForNative(enabled, appId) {
      enabled = !_.isUndefined(enabled) ? enabled : false;
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        enabled: enabled.toString(),
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("enableTracking", jsonMsg);
    }
  }, {
    key: "optOutTrackingForNative",
    value: function optOutTrackingForNative(appId) {
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("optOutTracking", jsonMsg);
    }
  }, {
    key: "optOutTrackingAndDeleteUserForNative",
    value: function optOutTrackingAndDeleteUserForNative(appId) {
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("optOutTrackingAndDeleteUser", jsonMsg);
    }
  }, {
    key: "optInTrackingForNative",
    value: function optInTrackingForNative(appId) {
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("optInTracking", jsonMsg);
    }
  }, {
    key: "setTrackStatusForNative",
    value: function setTrackStatusForNative(status, appId) {
      appId = !_.isUndefined(appId) ? appId : "";
      var msg = {
        status: status,
        appId: appId
      };
      var jsonMsg = JSON.stringify(msg);
      egret.ExternalInterface.call("setTrackStatus", jsonMsg);
    }
  }]);
  return GravityEngineAPIForNative;
}();
window["GravityAnalyticsAPI"] = GravityEngineAPIForNative;
window["GravityAnalyticsAPIForJS"] = GravityEngineAPI;
