// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"yqQa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escape = escape;
exports.unescape = unescape;

/**
 * Copyright (C) 2017-present by Andrea Giammarchi - @WebReflection
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var replace = ''.replace;
var ca = /[&<>'"]/g;
var es = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
var esca = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
};
var unes = {
  '&amp;': '&',
  '&#38;': '&',
  '&lt;': '<',
  '&#60;': '<',
  '&gt;': '>',
  '&#62;': '>',
  '&apos;': "'",
  '&#39;': "'",
  '&quot;': '"',
  '&#34;': '"'
};

function escape(es) {
  return replace.call(es, ca, pe);
}

;

function unescape(un) {
  return replace.call(un, es, cape);
}

;

function pe(m) {
  return esca[m];
}

function cape(m) {
  return unes[m];
}
},{}],"x8gg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Merge custom options to default ones
 *
 * @param {CpfFormatingOptions} options
 * @return {CpfFormatingOptions}
 */

function mergeOptions(options) {
  var _a = options.delimiters,
      _b = _a === void 0 ? {} : _a,
      _c = _b.dot,
      dot = _c === void 0 ? '.' : _c,
      _d = _b.dash,
      dash = _d === void 0 ? '-' : _d,
      _e = options.hiddenRange,
      _f = _e === void 0 ? {} : _e,
      _g = _f.start,
      start = _g === void 0 ? 3 : _g,
      _h = _f.end,
      end = _h === void 0 ? 10 : _h,
      _j = options.hiddenKey,
      hiddenKey = _j === void 0 ? '*' : _j,
      _k = options.hidden,
      hidden = _k === void 0 ? false : _k,
      _l = options.escape,
      escape = _l === void 0 ? false : _l,
      _m = options.onFail,
      onFail = _m === void 0 ? function (value) {
    throw new EvalError("'" + value + "' cannot be resolved to a CPF numeric sequence (11 digits)");
  } : _m;

  if (hidden) {
    if (Number(start) === NaN || start < 0 || start > 10) {
      throw new TypeError('Option \'hiddenRange.start\' must be a callbacknumber between 0 and 10.');
    }

    if (Number(end) === NaN || end < 0 || end > 10) {
      throw new TypeError('Option \'hiddenRange.end\' must be a callbacknumber between 0 and 10.');
    }

    if (start > end) {
      start = start ^ end;
      end = start ^ end;
      start = start ^ end;
    }
  }

  if (typeof onFail !== 'function') {
    throw new TypeError('The option \'onFail\' must be a callback function.');
  }

  return {
    delimiters: {
      dot: dot,
      dash: dash
    },
    hiddenRange: {
      start: start,
      end: end
    },
    hiddenKey: hiddenKey,
    hidden: hidden,
    escape: escape,
    onFail: onFail
  };
}

exports.default = mergeOptions;
},{}],"GX3L":[function(require,module,exports) {
/**
 * Removes any non-numeric character from a string chaing
 *
 * @param {string} target
 * @returns {string} - Target string you want to clear from NaN characters
 */
module.exports = function(target) {

  return String(target).replace(/\D/g, '')
}

},{}],"gbup":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var html_escaper_1 = __importDefault(require("html-escaper"));

var mergeOptions_1 = __importDefault(require("./mergeOptions"));

var num_only_1 = __importDefault(require("@lacussoft/num-only"));
/**
 * Validate a given CPF (Brazilian ID document) char sequence
 *
 * @param {string} cpfString
 * @param {object} options
 * @return {string}
 */


function default_1(cpfString, options) {
  if (options === void 0) {
    options = {};
  }

  var cpfNumbers = num_only_1.default(cpfString);
  var finalOptions = mergeOptions_1.default(options);

  if (cpfNumbers.length !== 11) {
    return finalOptions.onFail(cpfString);
  }

  var cpfArray = __spreadArrays(cpfNumbers);

  if (finalOptions.hidden) {
    // eslint-disable-next-line max-len
    for (var i = finalOptions.hiddenRange.start; i <= finalOptions.hiddenRange.end; i++) {
      cpfArray[i] = finalOptions.hiddenKey;
    }
  }

  cpfArray.splice(9, 0, finalOptions.delimiters.dash);
  cpfArray.splice(6, 0, finalOptions.delimiters.dot);
  cpfArray.splice(3, 0, finalOptions.delimiters.dot);
  var cpfFormat = cpfArray.join('');

  if (finalOptions.escape) {
    return html_escaper_1.default.escape(cpfFormat);
  }

  return cpfFormat;
}

exports.default = default_1;
},{"html-escaper":"yqQa","./mergeOptions":"x8gg","@lacussoft/num-only":"GX3L"}],"UeJd":[function(require,module,exports) {
window.cpfFmt = require('./core/cpfFmt.ts').default;
},{"./core/cpfFmt.ts":"gbup"}]},{},["UeJd"], null)
//# sourceMappingURL=/cpf-fmt.js.map