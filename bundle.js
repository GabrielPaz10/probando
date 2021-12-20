(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.load = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":3}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
(function (process){(function (){
/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var analizador = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,10],$V2=[1,8],$V3=[1,11],$V4=[1,12],$V5=[1,13],$V6=[1,14],$V7=[1,15],$V8=[2,5,19,20,43,44,45,46,47],$V9=[1,22],$Va=[1,23],$Vb=[1,24],$Vc=[20,76],$Vd=[1,49],$Ve=[1,38],$Vf=[1,50],$Vg=[1,51],$Vh=[1,52],$Vi=[1,53],$Vj=[1,54],$Vk=[1,55],$Vl=[1,30],$Vm=[1,29],$Vn=[1,31],$Vo=[1,32],$Vp=[1,33],$Vq=[1,39],$Vr=[1,40],$Vs=[1,41],$Vt=[1,42],$Vu=[1,43],$Vv=[1,45],$Vw=[1,46],$Vx=[1,47],$Vy=[1,48],$Vz=[8,23],$VA=[8,28,33],$VB=[2,37],$VC=[1,75],$VD=[1,76],$VE=[1,60],$VF=[1,61],$VG=[1,62],$VH=[1,63],$VI=[1,64],$VJ=[1,65],$VK=[1,66],$VL=[1,67],$VM=[1,68],$VN=[1,69],$VO=[1,70],$VP=[1,71],$VQ=[1,72],$VR=[1,73],$VS=[1,74],$VT=[1,77],$VU=[1,78],$VV=[8,23,24,28,34,35,48,49,50,51,52,53,54,55,56,58,59,60,61,62,63,69,70,76,106],$VW=[1,87],$VX=[2,47],$VY=[1,93],$VZ=[1,92],$V_=[8,23,24,28,55,56,69,70,106],$V$=[1,122],$V01=[1,139],$V11=[8,23,24,28,70,106],$V21=[8,23,24,28,50,51,55,56,58,59,60,61,62,63,69,70,106],$V31=[8,23,24,28,50,51,52,53,54,55,56,58,59,60,61,62,63,69,70,106],$V41=[8,23,24,28,55,56,58,59,60,61,62,63,69,70,106],$V51=[1,163],$V61=[23,28],$V71=[1,179],$V81=[1,184],$V91=[1,185],$Va1=[1,186],$Vb1=[1,187],$Vc1=[1,188],$Vd1=[1,189],$Ve1=[1,190],$Vf1=[1,181],$Vg1=[1,182],$Vh1=[1,183],$Vi1=[11,20,30,31,43,44,45,46,47,91,94,97,98,101,102,103,107,108,109],$Vj1=[1,283],$Vk1=[1,295],$Vl1=[11,97,98];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"init":3,"completo":4,"EOF":5,"global":6,"asignacion":7,"PTCOMA":8,"declaracion":9,"funcion":10,"LLAVEDER":11,"cuerpoLocal":12,"local":13,"condicionales":14,"ciclos":15,"llamadaMetodo":16,"control":17,"imprimir":18,"VOID":19,"ID":20,"PARIZQ":21,"parametros":22,"PARDER":23,"LLAVEIZQ":24,"tipo":25,"atributos":26,"llamadaFuncion":27,"COMA":28,"expresion":29,"PRINT":30,"PRINTLN":31,"listaId":32,"IGUAL":33,"INC":34,"DEC":35,"tipoValor":36,"DECIMAL":37,"ENTERO":38,"CADENA":39,"CARACTER":40,"TRUE":41,"FALSE":42,"BOOLEAN":43,"CHAR":44,"DOUBLE":45,"INT":46,"STRING":47,"EXTE":48,"CONCATENACION":49,"MAS":50,"MENOS":51,"POR":52,"DIVIDIDO":53,"MODULO":54,"AND":55,"OR":56,"NOT":57,"IGUALDAD":58,"DIFERENTE":59,"MAYORIGUAL":60,"MENORIGUAL":61,"MAYOR":62,"MENOR":63,"BEGIN":64,"END":65,"NULL":66,"ternario":67,"nativas":68,"PREGUNTA":69,"DOSPTS":70,"POW":71,"SQRT":72,"SIN":73,"COS":74,"TAN":75,"PUNTO":76,"COPOSITION":77,"SUBSTRING":78,"LENGTH":79,"UPPERCASE":80,"LOWERCASE":81,"PARSE":82,"TOINT":83,"TODOUBLE":84,"RSTRING":85,"TYPEOF":86,"PUSH":87,"POP":88,"ifcondicion":89,"switchcondicion":90,"IF":91,"elsecondicion":92,"ELSE":93,"SWITCH":94,"casecondicion":95,"defaultcondicion":96,"CASE":97,"DEFAULT":98,"ciclowhile":99,"ciclofor":100,"DO":101,"WHILE":102,"FOR":103,"asignacionfor":104,"declaracionfor":105,"IN":106,"RETURN":107,"CONTINUE":108,"BREAK":109,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"PTCOMA",11:"LLAVEDER",19:"VOID",20:"ID",21:"PARIZQ",23:"PARDER",24:"LLAVEIZQ",28:"COMA",30:"PRINT",31:"PRINTLN",33:"IGUAL",34:"INC",35:"DEC",37:"DECIMAL",38:"ENTERO",39:"CADENA",40:"CARACTER",41:"TRUE",42:"FALSE",43:"BOOLEAN",44:"CHAR",45:"DOUBLE",46:"INT",47:"STRING",48:"EXTE",49:"CONCATENACION",50:"MAS",51:"MENOS",52:"POR",53:"DIVIDIDO",54:"MODULO",55:"AND",56:"OR",57:"NOT",58:"IGUALDAD",59:"DIFERENTE",60:"MAYORIGUAL",61:"MENORIGUAL",62:"MAYOR",63:"MENOR",64:"BEGIN",65:"END",66:"NULL",69:"PREGUNTA",70:"DOSPTS",71:"POW",72:"SQRT",73:"SIN",74:"COS",75:"TAN",76:"PUNTO",77:"COPOSITION",78:"SUBSTRING",79:"LENGTH",80:"UPPERCASE",81:"LOWERCASE",82:"PARSE",83:"TOINT",84:"TODOUBLE",85:"RSTRING",86:"TYPEOF",87:"PUSH",88:"POP",91:"IF",93:"ELSE",94:"SWITCH",97:"CASE",98:"DEFAULT",101:"DO",102:"WHILE",103:"FOR",106:"IN",107:"RETURN",108:"CONTINUE",109:"BREAK"},
productions_: [0,[3,2],[4,2],[4,1],[6,2],[6,2],[6,1],[6,2],[6,2],[12,2],[12,1],[13,1],[13,1],[13,2],[13,2],[13,2],[13,2],[13,2],[10,8],[10,8],[10,7],[10,7],[16,4],[16,3],[27,4],[27,3],[22,4],[22,2],[26,3],[26,1],[18,4],[18,3],[18,4],[18,3],[9,4],[9,2],[32,3],[32,1],[7,3],[7,2],[7,2],[36,1],[36,1],[36,1],[36,1],[36,1],[36,1],[36,1],[25,1],[25,1],[25,1],[25,1],[25,1],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,2],[29,3],[29,3],[29,3],[29,3],[29,3],[29,3],[29,2],[29,2],[29,2],[29,1],[29,1],[29,1],[29,1],[29,1],[29,1],[29,1],[29,3],[67,5],[68,6],[68,4],[68,4],[68,4],[68,4],[68,6],[68,8],[68,5],[68,5],[68,5],[68,6],[68,4],[68,4],[68,4],[68,4],[68,6],[68,5],[14,1],[14,1],[89,8],[89,7],[89,7],[89,6],[92,2],[92,4],[92,3],[90,8],[90,7],[90,7],[90,6],[95,5],[95,4],[95,4],[95,3],[96,3],[96,2],[15,1],[15,1],[99,9],[99,7],[99,8],[99,6],[100,11],[100,11],[100,9],[100,7],[104,3],[105,4],[17,2],[17,1],[17,1],[17,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1]; 
break;
case 2: case 9:
 $$[$0-1].push($$[$0]); this.$=$$[$0-1]; 
break;
case 3: case 29: case 37:
 this.$ = [$$[$0]]; 
break;
case 4: case 5: case 13: case 14: case 15: case 16: case 17: case 105:
 this.$=$$[$0-1]; 
break;
case 6: case 11: case 12: case 75: case 76: case 77: case 78: case 104: case 115:
 this.$=$$[$0]; 
break;
case 7: case 8:
 consola.actualizar(`Se esperaba ${yytext}, l: ${this._$.first_line}, c: ${this._$.first_column}`); 
                                errores.agregar(new Error('Sintactico',`Se esperaba ${yytext}`, this._$.first_line , this._$.first_column,'')); 
break;
case 10:
 this.$ =[$$[$0]]; 
break;
case 18:
 this.$ = new Funcion(Tipos.VOID, $$[$0-6],$$[$0-4],$$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 19:
 this.$ = new Funcion($$[$0-7], $$[$0-6],$$[$0-4],$$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 20:
 this.$ = new Funcion(Tipos.VOID, $$[$0-5],[],$$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 21:
 this.$ = new Funcion($$[$0-6], $$[$0-5],[],$$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 22:
 this.$ = new LlamadaMetodo($$[$0-3],$$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 23:
 this.$ = new LlamadaMetodo($$[$0-2],[], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 24:
 this.$ = new LlamarFuncion($$[$0-3],$$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 25:
 this.$ = new LlamarFuncion($$[$0-2],[], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 26:
 $$[$0-3].push( new Parametros($$[$0-1],null,$$[$0])); this.$=$$[$0-3]; 
break;
case 27:
 this.$ = [new Parametros($$[$0-1],null,$$[$0])]; 
break;
case 28:
 $$[$0-2].push($$[$0]); this.$= $$[$0-2]; 
break;
case 30:
this.$ = new Print($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 31:
this.$ = new Print([],_$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 32:
this.$ = new Print($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column,true); 
break;
case 33:
this.$ = new Print([],_$[$0-2].first_line, _$[$0-2].first_column,true); 
break;
case 34:
 this.$ = new Declaracion($$[$0-3], $$[$0-2], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column) ; 
break;
case 35:
 this.$ = new Declaracion($$[$0-1], $$[$0], null, _$[$0-1].first_line, _$[$0-1].first_column) ; 
break;
case 36:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 38:
 this.$ = new Asignacion($$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 39:
 this.$ = new AsignacionDecInc($$[$0-1], TipoAsignacion.INCREMENTO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 40:
 this.$ = new AsignacionDecInc($$[$0-1], TipoAsignacion.DECREMENTO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 41:
 this.$ = (Number.isInteger(Number($$[$0])))?new SetearValor(Tipos.INT, Number($$[$0]), _$[$0].first_line, _$[$0].first_column):new SetearValor(Tipos.DOUBLE, Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 42:
 this.$ = new SetearValor(Tipos.INT, Number($$[$0]), _$[$0].first_line, _$[$0].first_column); 
break;
case 43:
 this.$ = new SetearValor(Tipos.STRING, $$[$0] , _$[$0].first_line, _$[$0].first_column); 
break;
case 44:
 this.$ = new SetearValor(Tipos.CHAR, $$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 45:
 this.$ = new SetearValor(Tipos.BOOLEAN, true, _$[$0].first_line, _$[$0].first_column); 
break;
case 46:
 this.$ = new SetearValor(Tipos.BOOLEAN, false, _$[$0].first_line, _$[$0].first_column); 
break;
case 47:
 this.$= new ObtenerValor($$[$0],_$[$0].first_line, _$[$0].first_column);
break;
case 48:
 this.$ = Tipos.BOOLEAN; 
break;
case 49:
 this.$ = Tipos.CHAR; 
break;
case 50:
 this.$ = Tipos.DOUBLE; 
break;
case 51:
 this.$ = Tipos.INT; 
break;
case 52:
 this.$ = Tipos.STRING; 
break;
case 53:
 this.$ = new Aritmetica(TipoOperacion.EXTE, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 54:
 this.$ = new Aritmetica(TipoOperacion.CONCATENACION, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 55:
 this.$ = new Aritmetica(TipoOperacion.SUMA, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 56:
 this.$ = new Aritmetica(TipoOperacion.RESTA, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 57:
 this.$ = new Aritmetica(TipoOperacion.MULTIPLICACION, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 58:
 this.$ = new Aritmetica(TipoOperacion.DIVISION, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 59:
 this.$ = new Aritmetica(TipoOperacion.MODULO, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 60:
 this.$ = new Logico(TipoLogico.AND, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 61:
 this.$ = new Logico(TipoLogico.OR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 62:
 this.$ = new Logico(TipoLogico.NOT, $$[$0], null,_$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 63:
 this.$ = new Relacional(TiposRelacional.IGUAL, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 64:
 this.$ = new Relacional(TiposRelacional.DIFERENTE, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 65:
 this.$ = new Relacional(TiposRelacional.MAYORI, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 66:
 this.$ = new Relacional(TiposRelacional.MENORI, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 67:
 this.$ = new Relacional(TiposRelacional.MAYOR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 68:
 this.$ = new Relacional(TiposRelacional.MENOR, $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 69:
 this.$ = new Unario(TUnario.NEGATIVO, $$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 70:
 this.$ = new Unario(TUnario.INCREMENTO, $$[$0-1], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 71:
 this.$ = new Unario(TUnario.DECREMENTO, $$[$0-1], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 72:
 this.$ = new Begin(_$[$0].first_line, _$[$0].first_column); 
break;
case 73:
 this.$ = new End(_$[$0].first_line, _$[$0].first_column); 
break;
case 74:
 this.$ = Tipos.NULL; 
break;
case 79:
 this.$ = $$[$0-1]; 
break;
case 80:
 this.$ = new Ternario($$[$0-4], $$[$0-2], $$[$0], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 81:
 this.$= new Pow($$[$0-3],$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 82:
 this.$ = new Sqrt($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 83:
 this.$ = new Sin($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 84:
 this.$ = new Cos($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 85:
 this.$ = new Tan($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 86:
 this.$ = new CaracterOfPosition($$[$0-5],$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 87:
 this.$ = new Substring($$[$0-7],$$[$0-3],$$[$0-1],_$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 88:
 this.$ = new Length($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 89:
 this.$ = new ToUpperCase($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 90:
 this.$ = new ToLowerCase($$[$0-4],_$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 91:
 this.$ = new Parse($$[$0-5],$$[$0-1],_$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 92:
 this.$ = new ToInt($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 93:
 this.$ = new ToDouble($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 94:
 this.$ = new StringM($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 95:
 this.$ = new Typeof($$[$0-1],_$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 98: case 99:
 this.$ = $$[$0]; 
break;
case 100:
 this.$= new If($$[$0-5],$$[$0-2],$$[$0],_$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 101:
 this.$= new If($$[$0-4],$$[$0-1],null,_$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 102:
 this.$= new If($$[$0-4],[],$$[$0],_$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 103:
 this.$= new If($$[$0-3],[],null,_$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 106: case 116:
 this.$=[]; 
break;
case 107:
 this.$=new Switch($$[$0-5],$$[$0-2],$$[$0-1],_$[$0-7].first_line, _$[$0-7].first_column);
break;
case 108:
 this.$=new Switch($$[$0-4],$$[$0-1],[],_$[$0-6].first_line, _$[$0-6].first_column);
break;
case 109:
 this.$=new Switch($$[$0-4],[],$$[$0-1],_$[$0-6].first_line, _$[$0-6].first_column);
break;
case 110:
 this.$=new Switch($$[$0-3],[],[],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 111:
 $$[$0-4].push(new Case($$[$0-2],$$[$0],_$[$0-4].first_line, _$[$0-4].first_column)); this.$=$$[$0-4]; 
break;
case 112:
 $$[$0-3].push(new Case($$[$0-1],[],_$[$0-3].first_line, _$[$0-3].first_column)); this.$=$$[$0-3]; 
break;
case 113:
 this.$=[new Case($$[$0-2],$$[$0],_$[$0-3].first_line, _$[$0-3].first_column)]; 
break;
case 114:
 this.$=[new Case($$[$0-1],[],_$[$0-2].first_line, _$[$0-2].first_column)]; 
break;
case 117: case 118:
this.$=$$[$0];
break;
case 119:
 this.$= new Dowhile($$[$0-2],$$[$0-6],_$[$0-8].first_line, _$[$0-8].first_column);
break;
case 120:
 this.$= new While($$[$0-4],$$[$0-1],_$[$0-6].first_line, _$[$0-6].first_column);
break;
case 121:
 this.$= new Dowhile($$[$0-2],[],_$[$0-7].first_line, _$[$0-7].first_column);
break;
case 122:
 this.$= new While($$[$0-3],[],_$[$0-5].first_line, _$[$0-5].first_column);
break;
case 123: case 124:
this.$= new For($$[$0-8],$$[$0-6],$$[$0-4],$$[$0-1],_$[$0-10].first_line, _$[$0-10].first_column);
break;
case 127:
this.$ = new Asignacion($$[$0-2],$$[$0],_$[$0-2].first_line, _$[$0-2].first_column);
break;
case 128:
this.$ = new Declaracion($$[$0-3],$$[$0-2],$$[$0],_$[$0-3].first_line, _$[$0-3].first_column);
break;
case 129:
this.$= new Return($$[$0],_$[$0-1].first_line, _$[$0-1].first_column);
break;
case 130:
this.$= new Return(null,_$[$0].first_line, _$[$0].first_column);
break;
case 131:
this.$= new Continue(_$[$0].first_line, _$[$0].first_column);
break;
case 132:
this.$= new Break(_$[$0].first_line, _$[$0].first_column);
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,7:4,9:5,10:6,19:$V1,20:$V2,25:9,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7},{1:[3]},{2:$V0,5:[1,16],6:17,7:4,9:5,10:6,19:$V1,20:$V2,25:9,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7},o($V8,[2,3]),{8:[1,18]},{8:[1,19]},o($V8,[2,6]),{8:[1,20],11:[1,21]},{33:$V9,34:$Va,35:$Vb},{20:[1,26],32:25},{20:[1,27]},o($Vc,[2,48]),o($Vc,[2,49]),o($Vc,[2,50]),o($Vc,[2,51]),o($Vc,[2,52]),{1:[2,1]},o($V8,[2,2]),o($V8,[2,4]),o($V8,[2,5]),o($V8,[2,7]),o($V8,[2,8]),{20:$Vd,21:$Ve,25:44,27:37,29:28,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},o($Vz,[2,39]),o($Vz,[2,40]),{8:[2,35],28:[1,57],33:[1,56]},o($VA,$VB,{21:[1,58]}),{21:[1,59]},o($Vz,[2,38],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU}),{20:$Vd,21:$Ve,25:44,27:37,29:79,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:80,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},o($VV,[2,72]),o($VV,[2,73]),o($VV,[2,74]),o($VV,[2,75]),o($VV,[2,76]),o($VV,[2,77]),o($VV,[2,78]),{20:$Vd,21:$Ve,25:44,27:37,29:81,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{21:[1,82]},{21:[1,83]},{21:[1,84]},{21:[1,85]},{21:[1,86]},{76:$VW},{21:[1,88]},{21:[1,89]},{21:[1,90]},{21:[1,91]},o([8,23,24,28,34,35,48,49,50,51,52,53,54,55,56,58,59,60,61,62,63,69,70,106],$VX,{21:$VY,76:$VZ}),o($VV,[2,41]),o($VV,[2,42]),o($VV,[2,43]),o($VV,[2,44]),o($VV,[2,45]),o($VV,[2,46]),{20:$Vd,21:$Ve,25:44,27:37,29:94,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:[1,95]},{22:96,23:[1,97],25:98,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7},{22:99,23:[1,100],25:98,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7},{20:$Vd,21:$Ve,25:44,27:37,29:101,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:102,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:103,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:104,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:105,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:106,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:107,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:108,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:109,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:110,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:111,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:112,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:113,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:114,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:115,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},o($VV,[2,70]),o($VV,[2,71]),{20:$Vd,21:$Ve,25:44,27:37,29:116,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{77:[1,117],78:[1,118],79:[1,119],80:[1,120],81:[1,121]},o($V_,[2,62],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,76:$VU}),o([8,23,24,28,34,35,50,51,52,53,54,55,56,58,59,60,61,62,63,69,70,106],[2,69],{48:$VE,49:$VF,76:$VU}),{23:$V$,34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{20:$Vd,21:$Ve,25:44,27:37,29:123,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:124,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:125,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:126,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:127,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{82:[1,128]},{20:$Vd,21:$Ve,25:44,27:37,29:129,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:130,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:131,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:132,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{87:[1,133],88:[1,134]},{20:$Vd,21:$Ve,23:[1,136],25:44,26:135,27:37,29:137,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{8:[2,34],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},o($VA,[2,36]),{23:[1,138],28:$V01},{24:[1,140]},{20:[1,141]},{23:[1,142],28:$V01},{24:[1,143]},o($V11,[2,53],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU}),o($V11,[2,54],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU}),o($V21,[2,55],{34:$VC,35:$VD,48:$VE,49:$VF,52:$VI,53:$VJ,54:$VK,76:$VU}),o($V21,[2,56],{34:$VC,35:$VD,48:$VE,49:$VF,52:$VI,53:$VJ,54:$VK,76:$VU}),o($V31,[2,57],{34:$VC,35:$VD,48:$VE,49:$VF,76:$VU}),o($V31,[2,58],{34:$VC,35:$VD,48:$VE,49:$VF,76:$VU}),o($V31,[2,59],{34:$VC,35:$VD,48:$VE,49:$VF,76:$VU}),o($V_,[2,60],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,76:$VU}),o([8,23,24,28,56,69,70,106],[2,61],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,76:$VU}),o($V41,[2,63],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,76:$VU}),o($V41,[2,64],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,76:$VU}),o($V41,[2,65],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,76:$VU}),o($V41,[2,66],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,76:$VU}),o($V41,[2,67],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,76:$VU}),o($V41,[2,68],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,76:$VU}),{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,70:[1,144],76:$VU},{21:[1,145]},{21:[1,146]},{21:[1,147]},{21:[1,148]},{21:[1,149]},o($VV,[2,79]),{28:[1,150],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{23:[1,151],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{23:[1,152],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{23:[1,153],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{23:[1,154],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{21:[1,155]},{23:[1,156],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{23:[1,157],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{23:[1,158],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{23:[1,159],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{21:[1,160]},{21:[1,161]},{23:[1,162],28:$V51},o($VV,[2,25]),o($V61,[2,29],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU}),{24:[1,164]},{25:165,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7},{7:171,9:172,12:166,13:167,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},o($V61,[2,27]),{24:[1,191]},{7:171,9:172,12:192,13:167,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},{20:$Vd,21:$Ve,25:44,27:37,29:193,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:194,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:195,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{23:[1,196]},{23:[1,197]},{23:[1,198]},{20:$Vd,21:$Ve,25:44,27:37,29:199,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},o($VV,[2,82]),o($VV,[2,83]),o($VV,[2,84]),o($VV,[2,85]),{20:$Vd,21:$Ve,25:44,27:37,29:200,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},o($VV,[2,92]),o($VV,[2,93]),o($VV,[2,94]),o($VV,[2,95]),{20:$Vd,21:$Ve,25:44,27:37,29:201,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{23:[1,202]},o($VV,[2,24]),{20:$Vd,21:$Ve,25:44,27:37,29:203,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{7:171,9:172,12:204,13:167,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},{20:[1,205]},{7:171,9:172,11:[1,206],13:207,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},o($Vi1,[2,10]),o($Vi1,[2,11]),o($Vi1,[2,12]),{8:[1,208]},{8:[1,209]},{8:[1,210]},{8:[1,211]},{8:[1,212]},o($Vi1,[2,98]),o($Vi1,[2,99]),o($Vi1,[2,117]),o($Vi1,[2,118]),{21:[1,213],33:$V9,34:$Va,35:$Vb},{20:[1,214],32:25},{8:[2,130],20:$Vd,21:$Ve,25:44,27:37,29:215,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{8:[2,131]},{8:[2,132]},{21:[1,216]},{21:[1,217]},{21:[1,218]},{21:[1,219]},{24:[1,220]},{21:[1,221]},{20:$Vd,21:[1,222],25:44,27:37,29:223,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{7:171,9:172,12:224,13:167,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},{7:171,9:172,11:[1,225],13:207,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},o([8,23,24,28,69,70,106],[2,80],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,76:$VU}),{23:[1,226],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{28:[1,227],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},o($VV,[2,88]),o($VV,[2,89]),o($VV,[2,90]),{23:[1,228],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{23:[1,229],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{23:[1,230],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},o($VV,[2,97]),o($V61,[2,28],{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU}),{7:171,9:172,11:[1,231],13:207,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},o($V61,[2,26]),o($V8,[2,21]),o($Vi1,[2,9]),o($Vi1,[2,13]),o($Vi1,[2,14]),o($Vi1,[2,15]),o($Vi1,[2,16]),o($Vi1,[2,17]),{20:$Vd,21:$Ve,23:[1,233],25:44,26:232,27:37,29:137,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},o($VA,$VB),{8:[2,129],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{20:$Vd,21:$Ve,23:[1,235],25:44,26:234,27:37,29:137,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,23:[1,237],25:44,26:236,27:37,29:137,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:238,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:239,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{7:171,9:172,11:[1,241],12:240,13:167,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},{20:$Vd,21:$Ve,25:44,27:37,29:242,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:[1,246],21:$Ve,25:247,27:37,29:245,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy,104:243,105:244},{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU,106:[1,248]},{7:171,9:172,11:[1,249],13:207,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},o($V8,[2,20]),o($VV,[2,86]),{20:$Vd,21:$Ve,25:44,27:37,29:250,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},o($VV,[2,81]),o($VV,[2,91]),o($VV,[2,96]),o($V8,[2,19]),{23:[1,251],28:$V51},{8:[2,23]},{23:[1,252],28:$V51},{8:[2,31]},{23:[1,253],28:$V51},{8:[2,33]},{23:[1,254],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{23:[1,255],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{7:171,9:172,11:[1,256],13:207,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},{102:[1,257]},{23:[1,258],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{8:[1,259]},{8:[1,260]},{23:$V$,34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU,106:[1,261]},o([23,34,35,48,49,50,51,52,53,54,55,56,58,59,60,61,62,63,69,106],$VX,{21:$VY,33:[1,262],76:$VZ}),{20:[1,263],76:$VW},{20:$Vd,21:$Ve,25:44,27:37,29:264,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},o($V8,[2,18]),{23:[1,265],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{8:[2,22]},{8:[2,30]},{8:[2,32]},{24:[1,266]},{24:[1,267]},{102:[1,268]},{21:[1,269]},{24:[1,270]},{20:$Vd,21:$Ve,25:44,27:37,29:271,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:272,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:273,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{20:$Vd,21:$Ve,25:44,27:37,29:274,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{33:[1,275]},{24:[1,276],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},o($VV,[2,87]),{7:171,9:172,11:[1,278],12:277,13:167,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},{11:[1,281],95:279,96:280,97:[1,282],98:$Vj1},{21:[1,284]},{20:$Vd,21:$Ve,25:44,27:37,29:285,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{7:171,9:172,11:[1,287],12:286,13:167,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},{8:[1,288],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{8:[1,289],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{23:[1,290],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{8:[2,127],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{20:$Vd,21:$Ve,25:44,27:37,29:291,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{7:171,9:172,12:292,13:167,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},{7:171,9:172,11:[1,293],13:207,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},o($Vi1,[2,103],{92:294,93:$Vk1}),{11:[1,297],96:296,97:[1,298],98:$Vj1},{11:[1,299]},o($Vi1,[2,110]),{20:$Vd,21:$Ve,25:44,27:37,29:300,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{70:[1,301]},{20:$Vd,21:$Ve,25:44,27:37,29:302,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},{23:[1,303],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{7:171,9:172,11:[1,304],13:207,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},o($Vi1,[2,122]),{7:305,20:$V2},{7:306,20:$V2},{24:[1,307]},{8:[2,128],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{7:171,9:172,11:[1,308],13:207,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},o($Vi1,[2,101],{92:309,93:$Vk1}),o($Vi1,[2,102]),{24:[1,311],89:310,91:$Va1},{11:[1,312]},o($Vi1,[2,108]),{20:$Vd,21:$Ve,25:44,27:37,29:313,36:36,37:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,51:$Vl,57:$Vm,64:$Vn,65:$Vo,66:$Vp,67:34,68:35,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu,83:$Vv,84:$Vw,85:$Vx,86:$Vy},o($Vi1,[2,109]),{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,70:[1,314],76:$VU},{7:171,9:172,11:[2,116],12:315,13:167,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},{23:[1,316],34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,76:$VU},{8:[1,317]},o($Vi1,[2,120]),{23:[1,318]},{23:[1,319]},{7:171,9:172,12:320,13:167,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},o($Vi1,[2,126]),o($Vi1,[2,100]),o($Vi1,[2,104]),{7:171,9:172,11:[1,322],12:321,13:167,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},o($Vi1,[2,107]),{34:$VC,35:$VD,48:$VE,49:$VF,50:$VG,51:$VH,52:$VI,53:$VJ,54:$VK,55:$VL,56:$VM,58:$VN,59:$VO,60:$VP,61:$VQ,62:$VR,63:$VS,69:$VT,70:[1,323],76:$VU},o($Vl1,[2,114],{13:167,14:168,15:169,16:170,7:171,9:172,17:173,18:174,89:175,90:176,99:177,100:178,25:180,12:324,20:$V71,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,91:$Va1,94:$Vb1,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1}),{7:171,9:172,11:[2,115],13:207,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},{8:[1,325]},o($Vi1,[2,121]),{24:[1,326]},{24:[1,327]},{7:171,9:172,11:[1,328],13:207,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},{7:171,9:172,11:[1,329],13:207,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},o($Vi1,[2,106]),o($Vl1,[2,112],{13:167,14:168,15:169,16:170,7:171,9:172,17:173,18:174,89:175,90:176,99:177,100:178,25:180,12:330,20:$V71,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,91:$Va1,94:$Vb1,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1}),o($Vl1,[2,113],{14:168,15:169,16:170,7:171,9:172,17:173,18:174,89:175,90:176,99:177,100:178,25:180,13:207,20:$V71,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,91:$Va1,94:$Vb1,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1}),o($Vi1,[2,119]),{7:171,9:172,12:331,13:167,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},{7:171,9:172,12:332,13:167,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},o($Vi1,[2,125]),o($Vi1,[2,105]),o($Vl1,[2,111],{14:168,15:169,16:170,7:171,9:172,17:173,18:174,89:175,90:176,99:177,100:178,25:180,13:207,20:$V71,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,91:$Va1,94:$Vb1,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1}),{7:171,9:172,11:[1,333],13:207,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},{7:171,9:172,11:[1,334],13:207,14:168,15:169,16:170,17:173,18:174,20:$V71,25:180,30:$V81,31:$V91,43:$V3,44:$V4,45:$V5,46:$V6,47:$V7,89:175,90:176,91:$Va1,94:$Vb1,99:177,100:178,101:$Vc1,102:$Vd1,103:$Ve1,107:$Vf1,108:$Vg1,109:$Vh1},o($Vi1,[2,123]),o($Vi1,[2,124])],
defaultActions: {16:[2,1],182:[2,131],183:[2,132],233:[2,23],235:[2,31],237:[2,33],251:[2,22],252:[2,30],253:[2,32]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

    //salida y errores
    const {errores,consola} =require('../ts/index.js')
    const {Error} = require('../ts/Reportes/Error.js')
    //tipos de datos
    const {Tipos}= require('../ts/tiposD/Tipos.js')
    //declaracion
    const {Declaracion}= require('../ts/instrucciones/declaracion/declaracion.js')
    //asignacion 
    const {AsignacionDecInc,TipoAsignacion} = require('../ts/instrucciones/asignacion/asignacionDecInc.js')
    const {Asignacion} = require('../ts/instrucciones/asignacion/asignacion.js')
    //funciones
    const { LlamadaMetodo } = require('../ts/instrucciones/funciones/llamadaMetodo.js')
    const { Parametros } = require('../ts/instrucciones/funciones/parametros.js')
    const { Funcion } = require('../ts/instrucciones/funciones/funcion.js')
    const { LlamarFuncion } = require('../ts/expresiones/llamarFunciones.js')
    const { Main } = require('../ts/instrucciones/funciones/main.js')
    //control
    const { Break } = require('../ts/instrucciones/control/break.js')
    const { Continue } = require('../ts/instrucciones/control/continue.js')
    const { Return } = require('../ts/instrucciones/control/return.js')
    //condicionales 
    const { Case } = require('../ts/instrucciones/condicionales/Case.js')
    const { If } = require('../ts/instrucciones/condicionales/If.js')
    const { Switch } = require('../ts/instrucciones/condicionales/Switch.js')
    //ciclos
    const { Dowhile } = require('../ts/instrucciones/ciclos/dowhile.js')
    const { For } = require('../ts/instrucciones/ciclos/for.js')
    const { While } = require('../ts/instrucciones/ciclos/while.js')
    //valores 
    const { ObtenerValor } = require('../ts/expresiones/valores/obtenerValor.js')
    const { SetearValor } = require('../ts/expresiones/valores/setearValor.js')
    //operadores 
    const { TipoOperacion, Aritmetica } = require('../ts/expresiones/operadores/Aritmetica.js')
    const { TipoLogico, Logico } = require('../ts/expresiones/operadores/Logico.js')
    const { TiposRelacional, Relacional } = require('../ts/expresiones/operadores/Relacionales.js')
    const { Ternario } = require('../ts/expresiones/operadores/Ternario.js')
    const { TUnario, Unario } = require('../ts/expresiones/operadores/Unario.js')
    const { Begin } = require('../ts/expresiones/begin.js')
    const { End } = require('../ts/expresiones/end.js')
    //funciones nativas faltan push y pop
    const { Print } = require('../ts/instrucciones/Print.js')
    const { CaracterOfPosition } = require('../ts/expresiones/funcionesNativas/caracterOfPosition.js')
    const { Cos } = require('../ts/expresiones/funcionesNativas/coseno.js')
    const { Length } = require('../ts/expresiones/funcionesNativas/length.js')
    const { Parse } = require('../ts/expresiones/funcionesNativas/parse.js')
    const { Pow } = require('../ts/expresiones/funcionesNativas/pow.js')
    const { Sin } = require('../ts/expresiones/funcionesNativas/seno.js')
    const { Sqrt } = require('../ts/expresiones/funcionesNativas/sqrt.js')
    const { StringM } = require('../ts/expresiones/funcionesNativas/String.js')
    const { Substring } = require('../ts/expresiones/funcionesNativas/substring.js')
    const { Tan } = require('../ts/expresiones/funcionesNativas/tangente.js')
    const { ToDouble } = require('../ts/expresiones/funcionesNativas/toDouble.js')
    const { ToInt } = require('../ts/expresiones/funcionesNativas/toint.js')
    const { ToLowerCase } = require('../ts/expresiones/funcionesNativas/toLower.js')
    const { ToUpperCase } = require('../ts/expresiones/funcionesNativas/toUpper.js')
    const { Typeof } = require('../ts/expresiones/funcionesNativas/typeof.js')
    
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:
break;
case 1:
break;
case 2:
break;
case 3:
break;
case 4:
break;
case 5:return 58; //igualdad
break;
case 6:return 59; //diferente
break;
case 7:return 60; //mayor igual
break;
case 8:return 61; //menor igual
break;
case 9:return 62; //mayor
break;
case 10:return 63; //menor
break;
case 11:return 8;
break;
case 12:return 21;
break;
case 13:return 23;
break;
case 14:return 'CORIZQ';
break;
case 15:return 'CORDER';
break;
case 16:return 24;
break;
case 17:return 11;
break;
case 18:return 76;
break;
case 19:return 28;
break;
case 20:return 33;
break;
case 21:return 69;
break;
case 22:return 70;
break;
case 23:return 55;
break;
case 24:return 56;
break;
case 25:return 57;
break;
case 26:return 48
break;
case 27:return 49
break;
case 28:return 34;        //Incremento
break;
case 29:return 35;        //Decremento
break;
case 30:return 50;         //Suma
break;
case 31:return 51;         //Resta
break;
case 32:return 52;         //Multipliaci├│n
break;
case 33:return 53;         //Divisi├│n
break;
case 34:return 54;         //M├│dulo
break;
case 35:return 71;
break;
case 36:return 72;
break;
case 37:return 73;
break;
case 38:return 74;
break;
case 39:return 75;
break;
case 40:return 77;
break;
case 41:return 78;
break;
case 42:return 64;
break;
case 43:return 65;
break;
case 44:return 79;
break;
case 45:return 81;
break;
case 46:return 80;
break;
case 47:return 82;
break;
case 48:return 83;
break;
case 49:return 84;
break;
case 50:return 85;
break;
case 51:return 86;
break;
case 52:return 88;
break;
case 53:return 87;
break;
case 54:return 30;
break;
case 55:return 31;
break;
case 56:return 66;
break;
case 57:return 46;
break;
case 58:return 45;
break;
case 59:return 43;
break;
case 60:return 44;
break;
case 61:return 47;
break;
case 62:return 'STRUCT';
break;
case 63:return 19;
break;
case 64:return 91;
break;
case 65:return 93;
break;
case 66:return 94;
break;
case 67:return 97;
break;
case 68:return 98;
break;
case 69:return 102;
break;
case 70:return 101;
break;
case 71:return 103;
break;
case 72:return 106;
break;
case 73:return 109;
break;
case 74:return 108;
break;
case 75:return 107;
break;
case 76: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2); return 39; 
break;
case 77: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2); return 40; 
break;
case 78:return 37;  //Decimal
break;
case 79:return 38;   //Entero
break;
case 80:return 41;     //Verdadero
break;
case 81:return 42;    //Falso
break;
case 82:return 20;       //Identificadores
break;
case 83:return 5;
break;
case 84: consola.actualizar(`${yy_.yytext} caracter no conocido, l: ${yy_.yylloc.first_line}, c: ${yy_.yylloc.first_column}`); 
    errores.agregar(new Error('Lexico',`Error lexico, ${yy_.yytext} caracter no conocido`, yy_.yylloc.first_line , yy_.yylloc.first_column,'')); 
break;
}
},
rules: [/^(?:\s+)/,/^(?:[ \r\t]+)/,/^(?:\n)/,/^(?:\/\/.*)/,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/,/^(?:==)/,/^(?:!=)/,/^(?:>=)/,/^(?:<=)/,/^(?:>)/,/^(?:<)/,/^(?:;)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:\{)/,/^(?:\})/,/^(?:\.)/,/^(?:,)/,/^(?:=)/,/^(?:\?)/,/^(?::)/,/^(?:&&)/,/^(?:\|\|)/,/^(?:!)/,/^(?:\^)/,/^(?:&)/,/^(?:\+\+)/,/^(?:--)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:pow\b)/,/^(?:sqrt\b)/,/^(?:sin\b)/,/^(?:cos\b)/,/^(?:tan\b)/,/^(?:caracterOfPosition\b)/,/^(?:subString\b)/,/^(?:begin\b)/,/^(?:end\b)/,/^(?:length\b)/,/^(?:toLowercase\b)/,/^(?:toUppercase\b)/,/^(?:parse\b)/,/^(?:toInt\b)/,/^(?:toDouble\b)/,/^(?:string\b)/,/^(?:typeof\b)/,/^(?:pop\b)/,/^(?:push\b)/,/^(?:print\b)/,/^(?:println\b)/,/^(?:null\b)/,/^(?:int\b)/,/^(?:double\b)/,/^(?:boolean\b)/,/^(?:char\b)/,/^(?:String\b)/,/^(?:struct\b)/,/^(?:void\b)/,/^(?:if\b)/,/^(?:else\b)/,/^(?:switch\b)/,/^(?:case\b)/,/^(?:default\b)/,/^(?:while\b)/,/^(?:do\b)/,/^(?:for\b)/,/^(?:in\b)/,/^(?:break\b)/,/^(?:continue\b)/,/^(?:return\b)/,/^(?:"((\\")|[^\"\n])*")/,/^(?:'((\\\\)|(\\n)|(\\t)|(\\")|(\\')|[^\'\n])')/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:[0-9]+\b)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:([a-zA-Z])[a-zA-Z0-9_]*)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = analizador;
exports.Parser = analizador.Parser;
exports.parse = function () { return analizador.parse.apply(analizador, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}
}).call(this)}).call(this,require('_process'))
},{"../ts/Reportes/Error.js":7,"../ts/expresiones/begin.js":15,"../ts/expresiones/end.js":16,"../ts/expresiones/funcionesNativas/String.js":17,"../ts/expresiones/funcionesNativas/caracterOfPosition.js":18,"../ts/expresiones/funcionesNativas/coseno.js":19,"../ts/expresiones/funcionesNativas/length.js":20,"../ts/expresiones/funcionesNativas/parse.js":21,"../ts/expresiones/funcionesNativas/pow.js":22,"../ts/expresiones/funcionesNativas/seno.js":23,"../ts/expresiones/funcionesNativas/sqrt.js":24,"../ts/expresiones/funcionesNativas/substring.js":25,"../ts/expresiones/funcionesNativas/tangente.js":26,"../ts/expresiones/funcionesNativas/toDouble.js":27,"../ts/expresiones/funcionesNativas/toLower.js":28,"../ts/expresiones/funcionesNativas/toUpper.js":29,"../ts/expresiones/funcionesNativas/toint.js":30,"../ts/expresiones/funcionesNativas/typeof.js":31,"../ts/expresiones/llamarFunciones.js":32,"../ts/expresiones/operadores/Aritmetica.js":33,"../ts/expresiones/operadores/Logico.js":34,"../ts/expresiones/operadores/Relacionales.js":35,"../ts/expresiones/operadores/Ternario.js":36,"../ts/expresiones/operadores/Unario.js":37,"../ts/expresiones/valores/obtenerValor.js":38,"../ts/expresiones/valores/setearValor.js":39,"../ts/index.js":40,"../ts/instrucciones/Print.js":41,"../ts/instrucciones/asignacion/asignacion.js":42,"../ts/instrucciones/asignacion/asignacionDecInc.js":43,"../ts/instrucciones/ciclos/dowhile.js":44,"../ts/instrucciones/ciclos/for.js":45,"../ts/instrucciones/ciclos/while.js":46,"../ts/instrucciones/condicionales/Case.js":47,"../ts/instrucciones/condicionales/If.js":48,"../ts/instrucciones/condicionales/Switch.js":49,"../ts/instrucciones/control/break.js":50,"../ts/instrucciones/control/continue.js":51,"../ts/instrucciones/control/return.js":52,"../ts/instrucciones/declaracion/declaracion.js":53,"../ts/instrucciones/funciones/funcion.js":54,"../ts/instrucciones/funciones/llamadaMetodo.js":55,"../ts/instrucciones/funciones/main.js":56,"../ts/instrucciones/funciones/parametros.js":57,"../ts/tiposD/Tipos.js":58,"_process":3,"fs":1,"path":2}],5:[function(require,module,exports){
const { ejecutar } = require("./ts/index")


const bejecutar = document.getElementById('ejecutar')
const consolaa = document.getElementById('consola')


bejecutar.addEventListener('click',()=>{
    const entrada=document.getElementById("entrada").value
    alert(entrada)
    alert(typeof(entrada))
    
    //analizador.parse(entrada)
    consolaa.value=ejecutar(entrada)
})


// var redraw;
// window.height = 300;
// window.width = 400;
// var g = new Graph();

// g.addEdge("cherry", "apple");
// g.addEdge("strawberry", "kiwi");
// g.addEdge("banana", "banana");


// /* layout the graph using the Spring layout implementation */
// var layouter = new Graph.Layout.Spring(g);
// layouter.layout();

// /* draw the graph using the RaphaelJS draw implementation */
// var renderer = new Graph.Renderer.Raphael('canvas', g, width, height);
// renderer.draw();

// redraw = function() {
//   layouter.layout();
//   renderer.draw();
// };

},{"./ts/index":40}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consola = void 0;
class Consola {
    constructor() {
        this.consola = '';
    }
    actualizar(cadena) {
        this.consola += cadena;
    }
    limpiar() {
        this.consola = '';
    }
    publicar() {
        return this.consola;
    }
}
exports.Consola = Consola;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
class Error {
    constructor(tipo, descripcion, linea, columna, entorno) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
        this.entorno = entorno;
    }
}
exports.Error = Error;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metodo = void 0;
class Metodo {
    constructor(tipo, id, parametros, cuerpo) {
        this.tipo = tipo;
        this.id = id;
        this.parametros = parametros;
        this.cuerpo = cuerpo;
    }
}
exports.Metodo = Metodo;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(tipo, id, valor, entorno, categoria = 'variable') {
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
        this.entorno = entorno;
        this.categoria = categoria;
    }
}
exports.Simbolo = Simbolo;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaError = void 0;
class TablaError {
    constructor() {
        this.errores = [];
    }
    vaciar() {
        this.errores = [];
    }
    agregar(error) {
        this.errores.push(error);
    }
    get() {
        return this.errores;
    }
}
exports.TablaError = TablaError;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaMetodos = void 0;
const Metodo_1 = require("./Metodo");
class TablaMetodos {
    constructor(metodos) {
        this.metodos = [];
        this.metodos = this.metodos.concat(metodos);
    }
    agregar(tipo, id, parametros, cuerpo) {
        this.metodos.push(new Metodo_1.Metodo(tipo, id, parametros, cuerpo));
    }
    get(id) {
        var metodo = this.metodos.filter((metod) => metod.id == id)[0];
        if (metodo) {
            return metodo;
        }
        return null;
    }
    limpiarC(id) {
        var metodo = this.metodos.filter((metod) => metod.id == id)[0];
        if (metodo) {
            metodo.cuerpo = [];
        }
    }
    get metodoss() {
        return this.metodos;
    }
}
exports.TablaMetodos = TablaMetodos;

},{"./Metodo":8}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaSimbolo = void 0;
class TablaSimbolo {
    constructor(simbolos) {
        this.simbolos = [];
        this.simbolos = this.simbolos.concat(simbolos);
    }
    agregar(simbolo) {
        this.simbolos.push(simbolo);
    }
    obtenerSimbolo(id) {
        var simbolo = this.simbolos.filter((simb) => simb.id == id)[0];
        if (simbolo)
            return simbolo;
        else
            return null;
    }
    getSimbolos() {
        return this.simbolos;
    }
    actualizar(id, valor) {
        var simbolo = this.simbolos.filter((simb) => simb.id == id)[0];
        if (simbolo) {
            simbolo.valor = valor;
        }
        //ver si se pone mensaje de error
    }
}
exports.TablaSimbolo = TablaSimbolo;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expresion = void 0;
class Expresion {
    /*
    aun faltan cambios, de importacion de cosas del ast y la consola
     */
    constructor(linea, columna) {
        this.columna = columna;
        this.linea = linea;
    }
}
exports.Expresion = Expresion;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruccion = void 0;
class Instruccion {
    /*
    aun faltan cambios, de importacion de cosas del ast y la consola
     */
    constructor(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
}
exports.Instruccion = Instruccion;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Begin = void 0;
const expresion_1 = require("../abstractas/expresion");
const Tipos_1 = require("../tiposD/Tipos");
class Begin extends expresion_1.Expresion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        return { tipo: Tipos_1.Intervalo.BEGIN, valor: Tipos_1.Intervalo.BEGIN };
    }
    ast(metodos) {
        return null;
    }
}
exports.Begin = Begin;

},{"../abstractas/expresion":13,"../tiposD/Tipos":58}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.End = void 0;
const expresion_1 = require("../abstractas/expresion");
const Tipos_1 = require("../tiposD/Tipos");
class End extends expresion_1.Expresion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        return { tipo: Tipos_1.Intervalo.END, valor: Tipos_1.Intervalo.END };
    }
    ast(metodos) {
        return null;
    }
}
exports.End = End;

},{"../abstractas/expresion":13,"../tiposD/Tipos":58}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringM = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class StringM extends expresion_1.Expresion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (valor.tipo !== Tipos_1.Tipos.NULL) {
            return { tipo: Tipos_1.Tipos.STRING, valor: (valor.valor).toString() };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${valor.tipo} no puede convertirse a STRING`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`El tipo ${valor.tipo} no puede convertirse a STRING\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.StringM = StringM;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaracterOfPosition = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class CaracterOfPosition extends expresion_1.Expresion {
    constructor(cadena, posicion, linea, columna) {
        super(linea, columna);
        this.cadena = cadena;
        this.posicion = posicion;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (cadena.tipo === Tipos_1.Tipos.STRING) {
            const posicion = this.posicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (posicion.tipo === Tipos_1.Tipos.INT || posicion.tipo === Tipos_1.Tipos.DOUBLE) {
                return { tipo: Tipos_1.Tipos.STRING, valor: (cadena.valor.charAt(posicion.valor)) };
            }
            index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${posicion.tipo} no puede ser un indice`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`El tipo ${posicion.tipo} no puede ser un indice\n`);
        }
        else {
            index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${cadena.tipo} no puede usarse con caracterOfPosition`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`El tipo ${cadena.tipo} no puede usarse con caracterOfPosition\n`);
        }
    }
    ast(metodos) {
        return null;
    }
}
exports.CaracterOfPosition = CaracterOfPosition;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cos = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Cos extends expresion_1.Expresion {
    constructor(angulo, linea, columna) {
        super(linea, columna);
        this.angulo = angulo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const angulo = this.angulo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (angulo.tipo === Tipos_1.Tipos.INT || angulo.tipo === Tipos_1.Tipos.DOUBLE) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Math.cos(angulo.valor)) };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede calcular el coseno con el tipo ${angulo.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede calcular el coseno con el tipo ${angulo.tipo}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Cos = Cos;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
class Length extends expresion_1.Expresion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (valor.tipo !== Tipos_1.Tipos.STRING) { //agregar lo de arreglos 
            index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede devolver LENGTH con un tipo ${valor.tipo}`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`No se puede devolver LENGTH con un tipo ${valor.tipo}\n`);
        }
        return { tipo: Tipos_1.Tipos.INT, valor: ((valor.valor).length) };
    }
    ast(metodos) {
        return null;
    }
}
exports.Length = Length;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parse = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Parse extends expresion_1.Expresion {
    constructor(destino, cadena, linea, columna) {
        super(linea, columna);
        this.destino = destino;
        this.cadena = cadena;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        if (this.destino === Tipos_1.Tipos.INT || this.destino === Tipos_1.Tipos.DOUBLE || this.destino === Tipos_1.Tipos.BOOLEAN) {
            const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (cadena.tipo === Tipos_1.Tipos.STRING) {
                switch (this.destino) {
                    case Tipos_1.Tipos.INT:
                        return { tipo: Tipos_1.Tipos.INT, valor: (Number(cadena.valor)) };
                    case Tipos_1.Tipos.DOUBLE:
                        return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(cadena.valor)) };
                    case Tipos_1.Tipos.BOOLEAN:
                        if (cadena.valor == '1' || cadena.valor == '0') {
                            return { tipo: Tipos_1.Tipos.BOOLEAN, valor: !!(Number(cadena.valor)) };
                        }
                        else if (cadena.valor == 'true' || cadena.valor == 'false') {
                            return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (cadena.valor == 'true') ? true : false };
                        }
                }
            }
            index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${cadena.tipo} no puede usarse con PARSE`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`El tipo ${cadena.tipo} no puede usarse con PARSE\n`);
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${this.destino} no puede usarse con PARSE`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`El tipo ${this.destino} no puede usarse con PARSE\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Parse = Parse;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pow = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Pow extends expresion_1.Expresion {
    constructor(base, exponente, linea, columna) {
        super(linea, columna);
        this.base = base;
        this.exponente = exponente;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const base = this.base.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        const exponente = this.exponente.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if ((base.tipo === Tipos_1.Tipos.INT && exponente.tipo === Tipos_1.Tipos.INT)) {
            return { tipo: Tipos_1.Tipos.INT, valor: (Math.pow(base.valor, exponente.valor)) };
        }
        else if ((base.tipo === Tipos_1.Tipos.DOUBLE && exponente.tipo === Tipos_1.Tipos.INT) ||
            (base.tipo === Tipos_1.Tipos.INT && exponente.tipo === Tipos_1.Tipos.DOUBLE)
            || (base.tipo === Tipos_1.Tipos.DOUBLE && exponente.tipo === Tipos_1.Tipos.DOUBLE)) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Math.pow(base.valor, exponente.valor)) };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede elevar la base de tipo ${base.tipo} con un exponente de tipo ${exponente.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede elevar la base de tipo ${base.tipo} con un exponente de tipo ${exponente.tipo} \n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Pow = Pow;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sin = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Sin extends expresion_1.Expresion {
    constructor(angulo, linea, columna) {
        super(linea, columna);
        this.angulo = angulo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const angulo = this.angulo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (angulo.tipo === Tipos_1.Tipos.INT || angulo.tipo === Tipos_1.Tipos.DOUBLE) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Math.sin(angulo.valor)) };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede calcular el coseno con el tipo ${angulo.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede calcular el coseno con el tipo ${angulo.tipo}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Sin = Sin;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqrt = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Sqrt extends expresion_1.Expresion {
    constructor(raiz, linea, columna) {
        super(linea, columna);
        this.raiz = raiz;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const raiz = this.raiz.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (raiz.tipo === Tipos_1.Tipos.INT || raiz.tipo === Tipos_1.Tipos.DOUBLE) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Math.sqrt(raiz.valor)) };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede calcular la raiz con el tipo ${raiz.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede calcular la raiz con el tipo ${raiz.tipo}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Sqrt = Sqrt;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Substring = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Substring extends expresion_1.Expresion {
    constructor(cadena, inicio, final, linea, columna) {
        super(linea, columna);
        this.cadena = cadena;
        this.inicio = inicio;
        this.final = final;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (cadena.tipo !== Tipos_1.Tipos.STRING) {
            index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${cadena.tipo} no puede generar un substring`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`El tipo ${cadena.tipo} no puede generar un substring\n`);
        }
        const inicio = this.inicio.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        const final = this.final.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if ((inicio.tipo == Tipos_1.Tipos.DOUBLE || inicio.tipo == Tipos_1.Tipos.INT || inicio.tipo == Tipos_1.Intervalo.BEGIN) && (final.tipo == Tipos_1.Tipos.DOUBLE || final.tipo == Tipos_1.Tipos.INT || final.tipo == Tipos_1.Intervalo.END)) {
            switch (inicio.tipo) {
                case Tipos_1.Tipos.DOUBLE:
                    switch (final.tipo) {
                        case Tipos_1.Tipos.DOUBLE:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(inicio.valor, final.valor) };
                        case Tipos_1.Tipos.INT:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(inicio.valor, final.valor) };
                        case Tipos_1.Intervalo.END:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(inicio.valor, (cadena.valor.length + 1)) };
                    }
                    break;
                case Tipos_1.Tipos.INT:
                    switch (final.tipo) {
                        case Tipos_1.Tipos.DOUBLE:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(inicio.valor, final.valor) };
                        case Tipos_1.Tipos.INT:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(inicio.valor, final.valor) };
                        case Tipos_1.Intervalo.END:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(inicio.valor, (cadena.valor.length + 1)) };
                    }
                    break;
                case Tipos_1.Intervalo.BEGIN:
                    switch (final.tipo) {
                        case Tipos_1.Tipos.INT:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(0, final.valor) };
                        case Tipos_1.Intervalo.END:
                            return { tipo: Tipos_1.Tipos.STRING, valor: cadena.valor.substring(0, (cadena.valor.length + 1)) };
                    }
            }
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `El tipo ${cadena.tipo} no es valido para un intervalo`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`El tipo ${cadena.tipo} no es valido para un intervalo\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Substring = Substring;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tan = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Tan extends expresion_1.Expresion {
    constructor(angulo, linea, columna) {
        super(linea, columna);
        this.angulo = angulo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const angulo = this.angulo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (angulo.tipo === Tipos_1.Tipos.INT || angulo.tipo === Tipos_1.Tipos.DOUBLE) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Math.tan(angulo.valor) * (180 / (Math.PI))) };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede calcular la tangente con el tipo ${angulo.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede calcular la tangente con el tipo ${angulo.tipo}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Tan = Tan;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDouble = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class ToDouble extends expresion_1.Expresion {
    constructor(numero, linea, columna) {
        super(linea, columna);
        this.numero = numero;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const numero = this.numero.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (numero.tipo === Tipos_1.Tipos.INT) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: Number(numero.valor) };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede convertir a decimal con un tipo ${numero.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede convertir a decimal con un tipo ${numero.tipo}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.ToDouble = ToDouble;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToLowerCase = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class ToLowerCase extends expresion_1.Expresion {
    constructor(cadena, linea, columna) {
        super(linea, columna);
        this.cadena = cadena;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (cadena.tipo === Tipos_1.Tipos.STRING) {
            return { tipo: Tipos_1.Tipos.STRING, valor: (cadena.valor).toLowerCase() };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede convertir a minusculas con el tipo ${cadena.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede convertir a minusculas con el tipo ${cadena.tipo}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.ToLowerCase = ToLowerCase;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToUpperCase = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class ToUpperCase extends expresion_1.Expresion {
    constructor(cadena, linea, columna) {
        super(linea, columna);
        this.cadena = cadena;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const cadena = this.cadena.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (cadena.tipo === Tipos_1.Tipos.STRING) {
            return { tipo: Tipos_1.Tipos.STRING, valor: (cadena.valor).toUpperCase() };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede convertir a mayusculas con el tipo ${cadena.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede convertir a mayusculas con el tipo ${cadena.tipo}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.ToUpperCase = ToUpperCase;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToInt = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class ToInt extends expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const valor = this.expresion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (valor.tipo === Tipos_1.Tipos.DOUBLE || valor.tipo === Tipos_1.Tipos.BOOLEAN) {
            return { tipo: Tipos_1.Tipos.INT, valor: (valor.valor < 0) ? Math.ceil(valor.valor) : Math.floor(valor.valor) };
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede Truncar con un tipo ${valor.tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`No se puede Truncar con un tipo ${valor.tipo}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.ToInt = ToInt;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typeof = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
class Typeof extends expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const expresion = this.expresion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        return { tipo: Tipos_1.Tipos.STRING, valor: (expresion.tipo) };
    }
    ast(metodos) {
        return null;
    }
}
exports.Typeof = Typeof;

},{"../../abstractas/expresion":13,"../../tiposD/Tipos":58}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamarFuncion = void 0;
const index_1 = require("../index");
const expresion_1 = require("../abstractas/expresion");
const Error_1 = require("../Reportes/Error");
const TablaSimbolos_1 = require("../Reportes/TablaSimbolos");
const Tipos_1 = require("../tiposD/Tipos");
const Simbolo_1 = require("../Reportes/Simbolo");
class LlamarFuncion extends expresion_1.Expresion {
    constructor(id, parametros, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.parametros = parametros;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const metodo = metodos.get(this.id);
        if (metodo !== null) {
            if (metodo.tipo !== Tipos_1.Tipos.VOID) {
                if (metodo.parametros.length === this.parametros.length) {
                    var local2 = this.obtenerEntorno(metodo, tsGlobal, tsLocal, metodos, entorno);
                    const control = this.ejecutarMetodo(metodo.cuerpo, tsGlobal, local2, metodos, entorno);
                    //retornos
                    if (control !== null && control !== undefined) {
                        if (control.tipo == Tipos_1.TiposControl.RETURN) {
                            if (control.valor !== null) {
                                if (control.valor.tipo === metodo.tipo) {
                                    return control.valor;
                                }
                            }
                            this.ponerError(`No se pude retornar tipo ${control.valor.tipo}`, this.linea, this.columna, entorno);
                        }
                    }
                }
                else if (metodo.parametros.length >= this.parametros.length) {
                    this.ponerError(`Menos atributos de los esperados`, this.linea, this.columna, entorno);
                }
                else {
                    this.ponerError(`Mas atributos de los esperados`, this.linea, this.columna, entorno);
                }
            }
            this.ponerError(`Funcion no asignada de forma correcta`, this.linea, this.columna, entorno);
        }
        this.ponerError(`El metodo ${this.id} no se pudo encontrar`, this.linea, this.columna, entorno);
    }
    obtenerEntorno(metodo, tsGlobal, tsLocal, metodos, entorno) {
        var stLocal2 = new TablaSimbolos_1.TablaSimbolo([]);
        for (var i in this.parametros) {
            var valor = this.parametros[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (valor.tipo === metodo.parametros[i].tipo) {
                stLocal2.agregar(new Simbolo_1.Simbolo(valor.tipo, metodo.parametros[i].id, valor.valor, entorno));
            }
            else {
                this.ponerError(`El tipo ${valor.tipo} no coincide con el parametro`, this.linea, this.columna, entorno);
            }
        }
        return stLocal2;
    }
    ejecutarMetodo(cuerpo, tsGlobal, tsLocal, metodos, entorno) {
        for (var i in cuerpo) {
            const control = cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    }
    ponerError(mensaje, linea, columna, entorno) {
        index_1.errores.agregar(new Error_1.Error('Semantico', mensaje, linea, columna, entorno));
        index_1.consola.actualizar(mensaje + ` l: ${linea}, c: ${columna}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.LlamarFuncion = LlamarFuncion;

},{"../Reportes/Error":7,"../Reportes/Simbolo":9,"../Reportes/TablaSimbolos":12,"../abstractas/expresion":13,"../index":40,"../tiposD/Tipos":58}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aritmetica = exports.TipoOperacion = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
var TipoOperacion;
(function (TipoOperacion) {
    TipoOperacion[TipoOperacion["SUMA"] = 0] = "SUMA";
    TipoOperacion[TipoOperacion["RESTA"] = 1] = "RESTA";
    TipoOperacion[TipoOperacion["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoOperacion[TipoOperacion["DIVISION"] = 3] = "DIVISION";
    TipoOperacion[TipoOperacion["MODULO"] = 4] = "MODULO";
    TipoOperacion[TipoOperacion["CONCATENACION"] = 5] = "CONCATENACION";
    TipoOperacion[TipoOperacion["EXTE"] = 6] = "EXTE";
})(TipoOperacion = exports.TipoOperacion || (exports.TipoOperacion = {}));
class Aritmetica extends expresion_1.Expresion {
    constructor(operacion, izquierdo, derecho, linea, columna) {
        super(linea, columna);
        this.operacion = operacion;
        this.izquierdo = izquierdo;
        this.derecho = derecho;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        let izq = this.izquierdo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        let dere = this.derecho.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        const dominante = this.tipoDominante(izq.tipo, dere.tipo, this.operacion);
        switch (this.operacion) {
            case TipoOperacion.SUMA:
                switch (dominante) {
                    case Tipos_1.Tipos.INT:
                        return { tipo: Tipos_1.Tipos.INT, valor: (Number(izq.valor) + Number(dere.valor)) };
                    case Tipos_1.Tipos.DOUBLE:
                        return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(izq.valor) + Number(dere.valor)) };
                    default:
                        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede sumar entre los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                        index_1.consola.actualizar(`No se puede sumar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                        break;
                }
                break;
            case TipoOperacion.RESTA:
                switch (dominante) {
                    case Tipos_1.Tipos.INT:
                        return { tipo: Tipos_1.Tipos.INT, valor: (Number(izq.valor) - Number(dere.valor)) };
                    case Tipos_1.Tipos.DOUBLE:
                        return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(izq.valor) - Number(dere.valor)) };
                    default:
                        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede restar entre los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                        index_1.consola.actualizar(`No se puede restar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                        break;
                }
                break;
            case TipoOperacion.MULTIPLICACION:
                switch (dominante) {
                    case Tipos_1.Tipos.INT:
                        return { tipo: Tipos_1.Tipos.INT, valor: (Number(izq.valor) * Number(dere.valor)) };
                    case Tipos_1.Tipos.DOUBLE:
                        return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(izq.valor) * Number(dere.valor)) };
                    default:
                        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede Multiplicar entre los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                        index_1.consola.actualizar(`No se puede multiplicar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                        break;
                }
                break;
            case TipoOperacion.DIVISION:
                if (dominante === Tipos_1.Tipos.DOUBLE) {
                    if (dere.valor != 0) {
                        return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(izq.valor) / Number(dere.valor)) };
                    }
                    else {
                        index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede dividir dentro de 0`, this.linea, this.columna, entorno));
                        index_1.consola.actualizar(`No se puede dividir dentro de 0 l:${this.linea} c:${this.columna} \n`);
                    }
                }
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede dividir con los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`No se puede dividir entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                break;
            case TipoOperacion.MODULO:
                if (dominante === Tipos_1.Tipos.DOUBLE) {
                    return { tipo: Tipos_1.Tipos.DOUBLE, valor: (Number(izq.valor) % Number(dere.valor)) };
                }
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede usar el modulo con los tipos ${izq.tipo} , ${dere.tipo}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`No se puede usar modulo entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                break;
            case TipoOperacion.CONCATENACION:
                if (dominante === Tipos_1.Tipos.STRING) {
                    return { tipo: Tipos_1.Tipos.STRING, valor: (izq.valor + dere.valor) };
                }
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede concatenar ${izq.tipo} con ${dere.tipo}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`No se puede concatenar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                break;
            case TipoOperacion.EXTE:
                if (dominante === Tipos_1.Tipos.STRING) {
                    if (izq.tipo === Tipos_1.Tipos.STRING && dere.tipo === Tipos_1.Tipos.INT) {
                        let concatena = '';
                        for (let index = 0; index < dere.valor; index++) {
                            concatena += izq.valor;
                        }
                        return { tipo: Tipos_1.Tipos.STRING, valor: concatena };
                    }
                }
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se puede concatenar ${izq.tipo} con ${dere.tipo}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`No se puede concatenar entre los tipos ${izq.tipo} , ${dere.tipo} l:${this.linea} c:${this.columna} \n`);
                break;
        }
    }
    ast(metodos) {
        return null;
    }
    tipoDominante(tipoIzquierdo, tipoDerecho, operador) {
        switch (operador) {
            case TipoOperacion.SUMA:
                if (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.INT) {
                    return Tipos_1.Tipos.INT;
                }
                else if ((tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.INT)
                    || (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.DOUBLE)) {
                    return Tipos_1.Tipos.DOUBLE;
                }
                return null;
            case TipoOperacion.RESTA:
                if (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.INT) {
                    return Tipos_1.Tipos.INT;
                }
                else if ((tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.INT)
                    || (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.DOUBLE)) {
                    return Tipos_1.Tipos.DOUBLE;
                }
                return null;
            case TipoOperacion.MULTIPLICACION:
                if (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.INT) {
                    return Tipos_1.Tipos.INT;
                }
                else if ((tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.INT)
                    || (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.DOUBLE)) {
                    return Tipos_1.Tipos.DOUBLE;
                }
                return null;
            case TipoOperacion.EXTE:
                if (tipoIzquierdo === Tipos_1.Tipos.STRING && tipoDerecho === Tipos_1.Tipos.INT) {
                    return Tipos_1.Tipos.STRING;
                }
                return null;
            case TipoOperacion.DIVISION:
                if ((tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.INT)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.INT)) {
                    return Tipos_1.Tipos.DOUBLE;
                }
                return null;
            case TipoOperacion.MODULO:
                if ((tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.INT)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.INT && tipoDerecho === Tipos_1.Tipos.DOUBLE)
                    || (tipoIzquierdo === Tipos_1.Tipos.DOUBLE && tipoDerecho === Tipos_1.Tipos.INT)) {
                    return Tipos_1.Tipos.DOUBLE;
                }
                return null;
            case TipoOperacion.CONCATENACION:
                if ((tipoIzquierdo === Tipos_1.Tipos.STRING && tipoDerecho === Tipos_1.Tipos.STRING)
                    || tipoIzquierdo === Tipos_1.Tipos.CHAR && tipoDerecho === Tipos_1.Tipos.CHAR
                    || tipoIzquierdo === Tipos_1.Tipos.STRING && tipoDerecho === Tipos_1.Tipos.CHAR
                    || tipoIzquierdo === Tipos_1.Tipos.CHAR && tipoDerecho === Tipos_1.Tipos.STRING) {
                    return Tipos_1.Tipos.STRING;
                }
                return null;
        }
    }
}
exports.Aritmetica = Aritmetica;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logico = exports.TipoLogico = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
var TipoLogico;
(function (TipoLogico) {
    TipoLogico[TipoLogico["AND"] = 0] = "AND";
    TipoLogico[TipoLogico["NOT"] = 1] = "NOT";
    TipoLogico[TipoLogico["OR"] = 2] = "OR";
})(TipoLogico = exports.TipoLogico || (exports.TipoLogico = {}));
class Logico extends expresion_1.Expresion {
    constructor(type, left, right, line, column) {
        super(line, column);
        this.tipo = type;
        this.izquierdo = left;
        this.derecho = right;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const izq = this.izquierdo.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        const dere = this.getDer(tsGlobal, tsLocal, metodos, entorno);
        this.setError(izq.tipo, dere.tipo, entorno);
        switch (this.tipo) {
            case TipoLogico.AND:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor && dere.valor) };
            case TipoLogico.NOT:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (!izq.valor) };
            case TipoLogico.OR:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor || dere.valor) };
        }
    }
    getDer(tsGlobal, tsLocal, metodos, entorno) {
        if (this.derecho !== null && this.tipo !== TipoLogico.NOT) {
            return this.derecho.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        }
        return { tipo: Tipos_1.Tipos.NULL, valor: null };
    }
    setError(izqT, derT, entorno) {
        if (izqT !== Tipos_1.Tipos.BOOLEAN && derT !== Tipos_1.Tipos.BOOLEAN && this.tipo !== TipoLogico.NOT) {
            index_1.consola.actualizar(`Los tipos no son operables ${izqT} y ${derT}, l:${this.linea} c:${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `Los tipos no son operables ${izqT} y ${derT}, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
        }
    }
    generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    ast(metodos) {
        // const id = `n${uuidv4().replace(/\-/g, "")}`
        const id = this.generateUUID();
        const izquierda = this.izquierdo.ast(metodos);
        let ast = `${id} [label="${this.getOperation()}"];
        ${izquierda.ast}
        ${id} -> ${izquierda.id};\n`;
        if (this.derecho !== null) {
            const derecha = this.derecho.ast(metodos);
            ast += `${derecha.ast}
            ${id} -> ${derecha.id};\n`;
        }
        return { id: id, ast: ast };
    }
    getOperation() {
        switch (this.tipo) {
            case TipoLogico.AND:
                return `And\\n&&`;
            case TipoLogico.OR:
                return `Or\\n||`;
            case TipoLogico.NOT:
                return `Not\\n!`;
        }
    }
}
exports.Logico = Logico;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = exports.TiposRelacional = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
var TiposRelacional;
(function (TiposRelacional) {
    TiposRelacional[TiposRelacional["MAYORI"] = 0] = "MAYORI";
    TiposRelacional[TiposRelacional["MENORI"] = 1] = "MENORI";
    TiposRelacional[TiposRelacional["DIFERENTE"] = 2] = "DIFERENTE";
    TiposRelacional[TiposRelacional["MAYOR"] = 3] = "MAYOR";
    TiposRelacional[TiposRelacional["IGUAL"] = 4] = "IGUAL";
    TiposRelacional[TiposRelacional["MENOR"] = 5] = "MENOR";
})(TiposRelacional = exports.TiposRelacional || (exports.TiposRelacional = {}));
class Relacional extends expresion_1.Expresion {
    constructor(relacion, izquierda, derecho, linea, columna) {
        super(linea, columna);
        this.relacion = relacion;
        this.izquierda = izquierda;
        this.derecho = derecho;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const izq = this.izquierda.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        const dere = this.derecho.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        switch (this.relacion) {
            case TiposRelacional.IGUAL:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor == dere.valor) };
            case TiposRelacional.DIFERENTE:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor != dere.valor) };
            case TiposRelacional.MAYOR:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor > dere.valor) };
            case TiposRelacional.MENOR:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor < dere.valor) };
            case TiposRelacional.MAYORI:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor >= dere.valor) };
            case TiposRelacional.MENORI:
                return { tipo: Tipos_1.Tipos.BOOLEAN, valor: (izq.valor <= dere.valor) };
        }
    }
    ast(metodos) {
        return null;
    }
}
exports.Relacional = Relacional;

},{"../../abstractas/expresion":13,"../../tiposD/Tipos":58}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
const Tipos_1 = require("../../tiposD/Tipos");
class Ternario extends expresion_1.Expresion {
    constructor(condicion, verdadero, falso, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (condicion.tipo != Tipos_1.Tipos.BOOLEAN) {
            index_1.errores.agregar(new Error_1.Error('Semantico', `La condicion debe ser tipo Bool, no ${condicion.tipo} l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`La condicion debe ser tipo Bool, no ${condicion.tipo} l:${this.linea} c:${this.columna}\n`);
        }
        if (condicion.valor) {
            return this.verdadero.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        }
        else {
            return this.falso.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        }
    }
    ast(metodos) {
        return null;
    }
}
exports.Ternario = Ternario;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unario = exports.TUnario = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const obtenerValor_1 = require("../valores/obtenerValor");
const Error_1 = require("../../Reportes/Error");
var TUnario;
(function (TUnario) {
    TUnario[TUnario["NEGATIVO"] = 0] = "NEGATIVO";
    TUnario[TUnario["INCREMENTO"] = 1] = "INCREMENTO";
    TUnario[TUnario["DECREMENTO"] = 2] = "DECREMENTO";
})(TUnario = exports.TUnario || (exports.TUnario = {}));
class Unario extends expresion_1.Expresion {
    constructor(tipoUni, valor, linea, columna) {
        super(linea, columna);
        this.tipoUni = tipoUni;
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        if (this.tipoUni !== TUnario.NEGATIVO && !(this.valor instanceof obtenerValor_1.ObtenerValor)) {
            index_1.errores.agregar(new Error_1.Error('Semantico', `Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}\n`);
        }
        const valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (valor.tipo == Tipos_1.Tipos.INT || valor.tipo == Tipos_1.Tipos.DOUBLE) {
            switch (this.tipoUni) {
                case TUnario.NEGATIVO:
                    return { tipo: valor.tipo, valor: (-valor.valor) };
                case TUnario.DECREMENTO:
                    return { tipo: valor.tipo, valor: (valor.valor - 1) };
                case TUnario.INCREMENTO:
                    return { tipo: valor.tipo, valor: (-valor.valor + 1) };
            }
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`Malos tipos para ${this.tipoUni} l:${this.linea} c:${this.columna}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Unario = Unario;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40,"../../tiposD/Tipos":58,"../valores/obtenerValor":38}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObtenerValor = void 0;
const index_1 = require("../../index");
const expresion_1 = require("../../abstractas/expresion");
const Error_1 = require("../../Reportes/Error");
class ObtenerValor extends expresion_1.Expresion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const valor = tsLocal.obtenerSimbolo(this.id);
        if (valor === null || valor === undefined) {
            const valo = tsGlobal.obtenerSimbolo(this.id);
            if (valo === null || valo === undefined) {
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se pudo encontrar la variale l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`No se pudo encontrar la variale l:${this.linea} c:${this.columna}\n`);
            }
            return { tipo: valo.tipo, valor: valo.valor };
        }
        return { tipo: valor.tipo, valor: valor.valor };
    }
    ast(metodos) {
        return null;
    }
}
exports.ObtenerValor = ObtenerValor;

},{"../../Reportes/Error":7,"../../abstractas/expresion":13,"../../index":40}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetearValor = void 0;
const expresion_1 = require("../../abstractas/expresion");
const Tipos_1 = require("../../tiposD/Tipos");
class SetearValor extends expresion_1.Expresion {
    constructor(tipo, valor, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        if (this.tipo === Tipos_1.Tipos.STRING || this.tipo === Tipos_1.Tipos.CHAR) {
            const valor = this.valor.replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\'/g, "\'").replace(/\\\\/g, "\\").replace(/\\"/g, "\"");
            return { tipo: this.tipo, valor: valor };
        }
        return { tipo: this.tipo, valor: this.valor };
    }
    ast(metodos) {
        return null;
    }
}
exports.SetearValor = SetearValor;

},{"../../abstractas/expresion":13,"../../tiposD/Tipos":58}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerMain = exports.ejecutar = exports.errores = exports.consola = void 0;
const Consola_1 = require("./Reportes/Consola");
const TablaError_1 = require("./Reportes/TablaError");
const TablaMetodos_1 = require("./Reportes/TablaMetodos");
const TablaSimbolos_1 = require("./Reportes/TablaSimbolos");
const instruccion_1 = require("./abstractas/instruccion");
const Error_1 = require("./Reportes/Error");
const Tipos_1 = require("./tiposD/Tipos");
// const ejecutaar = document.getElementById('ejecutar')
// ejecutaar.addEventListener('click',()=>{
//     const entrada=(<HTMLInputElement>document.getElementById("entrada")).value
//     alert(entrada)
//     alert(typeof(entrada))
// })
exports.consola = new Consola_1.Consola();
exports.errores = new TablaError_1.TablaError();
const analizador = require('../analizador/analizador.js');
let main = [];
let metodos;
let ast;
function limpiarTodo() {
    exports.consola.limpiar();
    exports.errores.vaciar();
}
function ejecutar(entrada) {
    limpiarTodo();
    const tsGlobal = new TablaSimbolos_1.TablaSimbolo([]);
    const tsLocal = new TablaSimbolos_1.TablaSimbolo([]);
    metodos = new TablaMetodos_1.TablaMetodos([]);
    main = [];
    try {
        ast = analizador.parse(entrada);
        obtenerAst(ast, tsGlobal, metodos);
        main = obtenerMain(metodos);
        ejecutarMain(main, tsGlobal, tsLocal, metodos);
    }
    catch (error) {
        console.log(error);
    }
    return exports.consola.publicar();
}
exports.ejecutar = ejecutar;
function obtenerAst(ast, tsGlobal, metodos) {
    for (const instruction of ast) {
        try {
            if (instruction instanceof instruccion_1.Instruccion)
                instruction.ejecutar(tsGlobal, tsGlobal, metodos, "-");
        }
        catch (error) {
            if (error instanceof Error_1.Error)
                exports.errores.agregar(error);
        }
    }
}
function ejecutarMain(main, tsGlobal, tsLocal, metodos) {
    if (main.length === 1) {
        const control = cuerpoMain(main[0].cuerpo, tsGlobal, tsLocal, metodos, '');
        if (control != null && control != undefined) {
            if (control.tipo == Tipos_1.TiposControl.RETURN) {
                if (control.valor == null)
                    return;
            }
        }
    }
    else if (main.length > 1) {
        exports.consola.actualizar(`Solo puede haber un metodo Main en el programa`);
        exports.errores.agregar(new Error_1.Error('Semantico', `Solo puede haber un metodo Main en el programa`, 0, 0, 'Global'));
    }
    else if (main.length < 1) {
        exports.consola.actualizar(`Debe haber un metodo Main en el programa`);
        exports.errores.agregar(new Error_1.Error('Semantico', `Debe haber un metodo Main en el programa`, 0, 0, 'Global'));
    }
}
function cuerpoMain(cuerpo, tsGlobal, tsLocal, metodos, entorno) {
    for (var i in cuerpo) {
        const control = cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (control !== null && control !== undefined) {
            return control;
        }
    }
    return null;
}
function obtenerMain(metodos) {
    return metodos.metodoss.filter((main) => main.id === 'main');
}
exports.obtenerMain = obtenerMain;

},{"../analizador/analizador.js":4,"./Reportes/Consola":6,"./Reportes/Error":7,"./Reportes/TablaError":10,"./Reportes/TablaMetodos":11,"./Reportes/TablaSimbolos":12,"./abstractas/instruccion":14,"./tiposD/Tipos":58}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const index_1 = require("../index");
const expresion_1 = require("../abstractas/expresion");
const instruccion_1 = require("../abstractas/instruccion");
class Print extends instruccion_1.Instruccion {
    constructor(expresiones, linea, columna, banderaS = false) {
        super(linea, columna);
        this.expresiones = expresiones;
        this.banderaS = banderaS;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        if (this.banderaS) { //si la bandera es verdadera, se imprime el salto (println)
            for (let index = 0; index < this.expresiones.length; index++) {
                if (this.expresiones[index] instanceof expresion_1.Expresion) {
                    const valor = this.expresiones[index].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                    index_1.consola.actualizar(valor.valor);
                }
                else {
                    index_1.consola.actualizar('');
                }
            }
            index_1.consola.actualizar('\n');
        }
        else { //si no hay bandera no se imprime salto (print)
            for (let index = 0; index < this.expresiones.length; index++) {
                if (this.expresiones[index] instanceof expresion_1.Expresion) {
                    const valor = this.expresiones[index].ejecutar(tsGlobal, tsLocal, metodos, entorno);
                    index_1.consola.actualizar(valor.valor);
                }
                else {
                    index_1.consola.actualizar('');
                }
            }
        }
    }
    ast(metodos) {
        return null;
    }
}
exports.Print = Print;

},{"../abstractas/expresion":13,"../abstractas/instruccion":14,"../index":40}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
class Asignacion extends instruccion_1.Instruccion {
    constructor(id, valor, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        var simbolo = tsLocal.obtenerSimbolo(this.id);
        if (simbolo) {
            this.actualizarValor(tsLocal, simbolo, valor, entorno);
        }
        else {
            simbolo = tsGlobal.obtenerSimbolo(this.id);
            if (simbolo) {
                this.actualizarValor(tsGlobal, simbolo, valor, entorno);
            }
            else {
                index_1.errores.agregar(new Error_1.Error('Semantico', `Variable ${this.id} no declarada`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`Variable ${this.id} no declarada l:${this.linea}, c:${this.columna}\n`);
            }
        }
    }
    actualizarValor(ts, simbolo, valor, entorno) {
        const aux = this.verificarTipo(simbolo.tipo, valor, this.linea, this.columna, entorno);
        ts.actualizar(this.id, aux.valor);
    }
    verificarTipo(tipo, valor, linea, columna, entorno) {
        if (tipo === valor.tipo) {
            return valor;
        }
        else if (tipo === Tipos_1.Tipos.DOUBLE) {
            if (valor.tipo === Tipos_1.Tipos.INT) {
                return { tipo: tipo, valor: valor.valor };
            }
        }
        else if (tipo === Tipos_1.Tipos.INT) {
            if (valor.tipo === Tipos_1.Tipos.BOOLEAN) {
                if (valor.valor === true) {
                    return { tipo: tipo, valor: 1 };
                }
                else if (valor.valor === false) {
                    return { tipo: tipo, valor: 0 };
                }
            }
            else if (valor.tipo === Tipos_1.Tipos.CHAR) {
                return { tipo: tipo, valor: valor.valor.charCodeAt(0) };
            }
            else if (valor.tipo === Tipos_1.Tipos.DOUBLE) {
                return { tipo: tipo, valor: (valor.valor < 0) ? Math.ceil(valor.valor) : Math.floor(valor.valor) };
            }
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo} l:${this.linea}, c:${this.columna}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.Asignacion = Asignacion;

},{"../../Reportes/Error":7,"../../abstractas/instruccion":14,"../../index":40,"../../tiposD/Tipos":58}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsignacionDecInc = exports.TipoAsignacion = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
var TipoAsignacion;
(function (TipoAsignacion) {
    TipoAsignacion[TipoAsignacion["DECREMENTO"] = 0] = "DECREMENTO";
    TipoAsignacion[TipoAsignacion["INCREMENTO"] = 1] = "INCREMENTO";
})(TipoAsignacion = exports.TipoAsignacion || (exports.TipoAsignacion = {}));
class AsignacionDecInc extends instruccion_1.Instruccion {
    constructor(id, tipo, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.tipo = tipo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        var simbolo = tsLocal.obtenerSimbolo(this.id);
        if (simbolo) {
            this.setDI(simbolo, tsLocal, entorno);
        }
        else {
            simbolo = tsGlobal.obtenerSimbolo(this.id);
            if (simbolo) {
                this.setDI(simbolo, tsGlobal, entorno);
            }
            else {
                index_1.errores.agregar(new Error_1.Error('Semantico', `No se pudo encontrar la variable ${this.id}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`No se pudo encontrar la variable ${this.id} l:${this.linea}, c:${this.columna}\n`);
            }
        }
    }
    setDI(simbolo, ts, entorno) {
        if (simbolo.tipo === Tipos_1.Tipos.INT || simbolo.tipo === Tipos_1.Tipos.DOUBLE) {
            if (this.tipo === TipoAsignacion.DECREMENTO) {
                ts.actualizar(this.id, simbolo.valor - 1);
            }
            else if (this.tipo === TipoAsignacion.INCREMENTO) {
                ts.actualizar(this.id, simbolo.valor + 1);
            }
            return;
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `El ${this.tipo} no se pudo realizar correctamente`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`El ${this.tipo} no se pudo realizar correctamente l:${this.linea}, c:${this.columna}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.AsignacionDecInc = AsignacionDecInc;

},{"../../Reportes/Error":7,"../../abstractas/instruccion":14,"../../index":40,"../../tiposD/Tipos":58}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dowhile = void 0;
const index_1 = require("../../index");
const instruccion_1 = require("../../abstractas/instruccion");
const Error_1 = require("../../Reportes/Error");
const TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
const Tipos_1 = require("../../tiposD/Tipos");
class Dowhile extends instruccion_1.Instruccion {
    constructor(condicion, cuerpo, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        var condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'DoWhile');
        this.verError(condicion, entorno);
        do {
            var entornoLocal = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
            const control = this.correrInstrucciones(tsGlobal, entornoLocal, metodos, entorno + "DoWhile");
            if (control !== null) {
                if (control.tipo === Tipos_1.TiposControl.BREAK) {
                    break;
                }
                else if (control.tipo === Tipos_1.TiposControl.CONTINUE) {
                    condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                    continue;
                }
                else if (control.tipo === Tipos_1.TiposControl.RETURN) {
                    return control;
                }
            }
            condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            this.verError(condicion, entorno);
        } while (condicion.valor);
    }
    correrInstrucciones(tsGlobal, tsLocal, metodos, entorno) {
        for (var i in this.cuerpo) {
            const control = this.cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    }
    verError(condicion, entorno) {
        if (condicion.tipo != Tipos_1.Tipos.BOOLEAN) {
            index_1.consola.actualizar(`La condicion de DOWHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `La condicion de DOWHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
        }
    }
    ast(metodos) {
        return null;
    }
}
exports.Dowhile = Dowhile;

},{"../../Reportes/Error":7,"../../Reportes/TablaSimbolos":12,"../../abstractas/instruccion":14,"../../index":40,"../../tiposD/Tipos":58}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const index_1 = require("../../index");
const instruccion_1 = require("../../abstractas/instruccion");
const Error_1 = require("../../Reportes/Error");
const TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
const Tipos_1 = require("../../tiposD/Tipos");
class For extends instruccion_1.Instruccion {
    constructor(declaracion, condicion, paso, cuerpo, linea, columna) {
        super(linea, columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.paso = paso;
        this.cuerpo = cuerpo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        var local = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
        this.declaracion.ejecutar(tsGlobal, local, metodos, entorno + 'For');
        var condicion = this.condicion.ejecutar(tsGlobal, local, metodos, entorno);
        this.verError(condicion, entorno);
        while (condicion.valor) {
            var localFor = new TablaSimbolos_1.TablaSimbolo(local.getSimbolos());
            const control = this.correrInstrucciones(tsGlobal, localFor, metodos, entorno + 'For');
            if (control !== null) {
                if (control.tipo === Tipos_1.TiposControl.BREAK) {
                    break;
                }
                else if (control.tipo === Tipos_1.TiposControl.CONTINUE) {
                    this.paso.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                    condicion = this.condicion.ejecutar(tsGlobal, localFor, metodos, entorno);
                    continue;
                }
                else if (control.tipo === Tipos_1.TiposControl.RETURN) {
                    return control;
                }
            }
            this.paso.ejecutar(tsGlobal, localFor, metodos, entorno);
            condicion = this.condicion.ejecutar(tsGlobal, localFor, metodos, entorno);
            this.verError(condicion, entorno);
        }
    }
    correrInstrucciones(tsGlobal, tsLocal, metodos, entorno) {
        for (var i in this.cuerpo) {
            const control = this.cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    }
    verError(condicion, entorno) {
        if (condicion.tipo != Tipos_1.Tipos.BOOLEAN) {
            index_1.consola.actualizar(`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
        }
    }
    ast(metodos) {
        return null;
    }
}
exports.For = For;

},{"../../Reportes/Error":7,"../../Reportes/TablaSimbolos":12,"../../abstractas/instruccion":14,"../../index":40,"../../tiposD/Tipos":58}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const index_1 = require("../../index");
const instruccion_1 = require("../../abstractas/instruccion");
const Error_1 = require("../../Reportes/Error");
const TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
const Tipos_1 = require("../../tiposD/Tipos");
class While extends instruccion_1.Instruccion {
    constructor(condicion, cuerpo, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        var condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'While');
        if (condicion.tipo != Tipos_1.Tipos.BOOLEAN) {
            index_1.consola.actualizar(`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
            index_1.errores.agregar(new Error_1.Error('Semantico', `La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
        }
        while (condicion.valor) {
            var entornoLocal = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
            const control = this.correrInstrucciones(tsGlobal, entornoLocal, metodos, entorno + "While");
            if (control !== null) {
                if (control.tipo === Tipos_1.TiposControl.BREAK) {
                    break;
                }
                else if (control.tipo === Tipos_1.TiposControl.CONTINUE) {
                    condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
                    continue;
                }
                else if (control.tipo === Tipos_1.TiposControl.RETURN) {
                    return control;
                }
            }
            condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (condicion.tipo != Tipos_1.Tipos.BOOLEAN) {
                index_1.consola.actualizar(`La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`);
                index_1.errores.agregar(new Error_1.Error('Semantico', `La condicion de WHILE debe ser de tipo boolean, l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
            }
        }
    }
    correrInstrucciones(tsGlobal, tsLocal, metodos, entorno) {
        for (var i in this.cuerpo) {
            const control = this.cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    }
    ast(metodos) {
        return null;
    }
}
exports.While = While;

},{"../../Reportes/Error":7,"../../Reportes/TablaSimbolos":12,"../../abstractas/instruccion":14,"../../index":40,"../../tiposD/Tipos":58}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
class Case {
    constructor(valor, cuerpo) {
        this.valor = valor;
        this.cuerpo = cuerpo;
    }
    ast(metodos) {
        return null;
    }
    obtenerCuerpo(metodos) {
        return null;
    }
}
exports.Case = Case;

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
class If extends instruccion_1.Instruccion {
    constructor(condicion, cuerpo, elseC, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
        this.elseC = elseC;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const condi = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        if (condi.tipo != Tipos_1.Tipos.BOOLEAN) {
            index_1.errores.agregar(new Error_1.Error('Semantico', `La condicion debe ser tipo Bool, no ${condi.tipo} l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`La condicion debe ser tipo Bool, no ${condi.tipo} l:${this.linea} c:${this.columna}\n`);
        }
        var control;
        if (condi.valor) {
            control = this.ejecutarIns(tsGlobal, tsLocal, metodos, entorno + 'If', this.cuerpo);
        }
        else if (this.elseC) {
            if (this.elseC instanceof instruccion_1.Instruccion) {
                control = this.elseC.ejecutar(tsGlobal, tsLocal, metodos, entorno + 'Else');
            }
            else {
                control = this.ejecutarIns(tsGlobal, tsLocal, metodos, entorno + 'Else', this.elseC);
            }
        }
        if (control !== null && control !== undefined) {
            if (control.tipo === Tipos_1.TiposControl.RETURN) {
                return control;
            }
        }
    }
    ejecutarIns(tsGlobal, tsLocal, metodos, entorno, cuerpo) {
        var tslocal2 = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
        for (var i in cuerpo) {
            const control = cuerpo[i].ejecutar(tsGlobal, tslocal2, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    }
    ast(metodos) {
        return null; //aun no implementado
    }
}
exports.If = If;

},{"../../Reportes/Error":7,"../../Reportes/TablaSimbolos":12,"../../abstractas/instruccion":14,"../../index":40,"../../tiposD/Tipos":58}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const index_1 = require("../../index");
const instruccion_1 = require("../../abstractas/instruccion");
const Error_1 = require("../../Reportes/Error");
const TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
const Tipos_1 = require("../../tiposD/Tipos");
class Switch extends instruccion_1.Instruccion {
    constructor(condicion, cuerpo, defa, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
        this.defa = defa;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const condicion = this.condicion.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        var control = this.ejecutarCase(condicion, tsGlobal, tsLocal, metodos, entorno);
        if (control === null) {
            control = this.ejecutarCuerpo(this.defa, tsGlobal, tsLocal, metodos, entorno);
        }
        if (control !== null) {
            if (control.tipo === Tipos_1.TiposControl.CONTINUE) {
                index_1.errores.agregar(new Error_1.Error('Sintactico', `Continue Fuera de un ciclo l:${this.linea} c:${this.columna}`, this.linea, this.columna, entorno));
                index_1.consola.actualizar(`Continue Fuera de un ciclo l:${this.linea} c:${this.columna}\n`);
            }
            else if (control.tipo === Tipos_1.TiposControl.RETURN) {
                return control;
            }
        }
    }
    ejecutarCase(condicion, tsGlobal, tsLocal, metodos, entorno) {
        let flag = false;
        for (var i in this.cuerpo) {
            const valor = this.cuerpo[i].valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if ((valor.valor === condicion.valor) || flag) {
                flag = true;
                const control = this.ejecutarCuerpo(this.cuerpo[i].cuerpo, tsGlobal, tsLocal, metodos, entorno + 'case');
                if (control !== null) {
                    return control;
                }
            }
        }
        return null;
    }
    ejecutarCuerpo(cuerpo, tsGlobal, tsLocal, metodos, entorno) {
        var entornoLocal = new TablaSimbolos_1.TablaSimbolo(tsLocal.getSimbolos());
        for (var i in cuerpo) {
            const control = cuerpo[i].ejecutar(tsGlobal, entornoLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    }
    ast(metodos) {
        return null;
    }
    obtenerCuerpo(metodos) { } //hola aby
}
exports.Switch = Switch;

},{"../../Reportes/Error":7,"../../Reportes/TablaSimbolos":12,"../../abstractas/instruccion":14,"../../index":40,"../../tiposD/Tipos":58}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Tipos_1 = require("../../tiposD/Tipos");
class Break extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        return { tipo: Tipos_1.TiposControl.BREAK, linea: this.linea, columna: this.columna };
    }
    ast(metodos) {
        return null;
    }
}
exports.Break = Break;

},{"../../abstractas/instruccion":14,"../../tiposD/Tipos":58}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Tipos_1 = require("../../tiposD/Tipos");
class Continue extends instruccion_1.Instruccion {
    constructor(linea, columna) {
        super(linea, columna);
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        return { tipo: Tipos_1.TiposControl.CONTINUE, linea: this.linea, columna: this.columna };
    }
    ast(metodos) {
        return null;
    }
}
exports.Continue = Continue;

},{"../../abstractas/instruccion":14,"../../tiposD/Tipos":58}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Tipos_1 = require("../../tiposD/Tipos");
class Return extends instruccion_1.Instruccion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        if (this.valor === null) {
            return { tipo: Tipos_1.TiposControl.RETURN, valor: null };
        }
        const val = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        return { tipo: Tipos_1.TiposControl.RETURN, valor: val };
    }
    ast(metodos) {
        return null;
    }
}
exports.Return = Return;

},{"../../abstractas/instruccion":14,"../../tiposD/Tipos":58}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
const Simbolo_1 = require("../../Reportes/Simbolo");
class Declaracion extends instruccion_1.Instruccion {
    constructor(tipo, id, valor, fila, columna) {
        super(fila, columna);
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        for (var i in this.id) {
            this.declarar(this.id[i], tsGlobal, tsLocal, metodos, entorno);
        }
    }
    declarar(id, tsGlobal, tsLocal, metodos, entorno) {
        const aux = tsLocal.obtenerSimbolo(id);
        if (aux) {
            index_1.errores.agregar(new Error_1.Error('Semantico', `La variable ${id} ya esta definida`, this.linea, this.columna, entorno));
            index_1.consola.actualizar(`La variable ${id} ya esta definida l:${this.linea}, c:${this.columna}\n`);
        }
        var valor;
        if (this.valor) {
            valor = this.valor.ejecutar(tsGlobal, tsLocal, metodos, entorno);
        }
        else {
            valor = this.valorDefecto(this.tipo);
        }
        valor = this.verificarTipo(this.tipo, valor, this.linea, this.columna, entorno);
        tsLocal.agregar(new Simbolo_1.Simbolo(this.tipo, id, valor.valor, entorno));
    }
    ast(metodos) {
        return null;
    }
    verificarTipo(tipo, valor, linea, columna, entorno) {
        if (tipo === valor.tipo) {
            return valor;
        }
        else if (tipo === Tipos_1.Tipos.DOUBLE) {
            if (valor.tipo === Tipos_1.Tipos.INT) {
                return { tipo: tipo, valor: valor.valor };
            }
        }
        else if (tipo === Tipos_1.Tipos.INT) {
            if (valor.tipo === Tipos_1.Tipos.BOOLEAN) {
                if (valor.valor === true) {
                    return { tipo: tipo, valor: 1 };
                }
                else if (valor.valor === false) {
                    return { tipo: tipo, valor: 0 };
                }
            }
            else if (valor.tipo === Tipos_1.Tipos.CHAR) {
                return { tipo: tipo, valor: valor.valor.charCodeAt(0) };
            }
            else if (valor.tipo === Tipos_1.Tipos.DOUBLE) {
                return { tipo: tipo, valor: (valor.valor < 0) ? Math.ceil(valor.valor) : Math.floor(valor.valor) };
            }
        }
        index_1.errores.agregar(new Error_1.Error('Semantico', `Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo}`, this.linea, this.columna, entorno));
        index_1.consola.actualizar(`Tipos incompatibles, ${valor.tipo} no se puede convertir a ${tipo} l:${this.linea}, c:${this.columna}\n`);
    }
    valorDefecto(tipo) {
        if (tipo === Tipos_1.Tipos.INT) {
            return { tipo: Tipos_1.Tipos.INT, valor: 0 };
        }
        else if (tipo === Tipos_1.Tipos.DOUBLE) {
            return { tipo: Tipos_1.Tipos.DOUBLE, valor: 0.0 };
        }
        else if (tipo === Tipos_1.Tipos.BOOLEAN) {
            return { tipo: Tipos_1.Tipos.BOOLEAN, valor: true };
        }
        else if (tipo === Tipos_1.Tipos.CHAR) {
            return { tipo: Tipos_1.Tipos.CHAR, valor: '0' };
        }
        else if (tipo === Tipos_1.Tipos.STRING) {
            return { tipo: Tipos_1.Tipos.STRING, valor: "" };
        }
    }
}
exports.Declaracion = Declaracion;

},{"../../Reportes/Error":7,"../../Reportes/Simbolo":9,"../../abstractas/instruccion":14,"../../index":40,"../../tiposD/Tipos":58}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Funcion extends instruccion_1.Instruccion {
    constructor(tipo, id, parametros, cuerpo, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.id = id;
        this.parametros = parametros;
        this.cuerpo = cuerpo;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        metodos.agregar(this.tipo, this.id, this.parametros, this.cuerpo);
    }
    ast(metodos) {
        return null;
    }
}
exports.Funcion = Funcion;

},{"../../abstractas/instruccion":14}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamadaMetodo = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
const TablaSimbolos_1 = require("../../Reportes/TablaSimbolos");
const Tipos_1 = require("../../tiposD/Tipos");
const index_1 = require("../../index");
const Error_1 = require("../../Reportes/Error");
const Simbolo_1 = require("../../Reportes/Simbolo");
class LlamadaMetodo extends instruccion_1.Instruccion {
    constructor(id, parametros, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.parametros = parametros;
    }
    ejecutar(tsGlobal, tsLocal, metodos, entorno) {
        const metodo = metodos.get(this.id);
        if (metodo) {
            if (metodo.tipo === Tipos_1.Tipos.VOID) {
                if (metodo.parametros.length === this.parametros.length) {
                    var tsLocal2 = this.obtenerEntorno(metodo, tsGlobal, tsLocal, metodos, entorno);
                    const control = this.ejecutarMetodo(metodo.cuerpo, tsGlobal, tsLocal2, metodos, entorno);
                    //para los retornos
                    if (control !== null && control !== undefined) {
                        if (control === Tipos_1.TiposControl.RETURN) {
                            if (control.valor === null) {
                                return;
                            }
                            this.ponerError(`No se puede retornar tipo: ${control.valor.tipo} en metodo VOID`, this.linea, this.columna, entorno);
                        }
                    }
                    return;
                }
                else if (metodo.parametros.length >= this.parametros.length) {
                    this.ponerError(`Hay menos parametros de los esperados`, this.linea, this.columna, entorno);
                }
                else {
                    this.ponerError(`Hay mas parametros de los esperados`, this.linea, this.columna, entorno);
                }
            }
            this.ponerError(`El metodo VOID no asignado de forma correcta`, this.linea, this.columna, entorno);
        }
        this.ponerError(`El metodo ${this.id} no se pudo encontrar`, this.linea, this.columna, entorno);
    }
    obtenerEntorno(metodo, tsGlobal, tsLocal, metodos, entorno) {
        var stLocal2 = new TablaSimbolos_1.TablaSimbolo([]);
        for (var i in this.parametros) {
            var valor = this.parametros[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (valor.tipo === metodo.parametros[i].tipo) {
                stLocal2.agregar(new Simbolo_1.Simbolo(valor.tipo, metodo.parametros[i].id, valor.valor, entorno));
            }
            else {
                this.ponerError(`El tipo ${valor.tipo} no coincide con el parametro`, this.linea, this.columna, entorno);
            }
        }
        return stLocal2;
    }
    ejecutarMetodo(cuerpo, tsGlobal, tsLocal, metodos, entorno) {
        for (var i in cuerpo) {
            const control = cuerpo[i].ejecutar(tsGlobal, tsLocal, metodos, entorno);
            if (control !== null && control !== undefined) {
                return control;
            }
        }
        return null;
    }
    ponerError(mensaje, linea, columna, entorno) {
        index_1.errores.agregar(new Error_1.Error('Semantico', mensaje, linea, columna, entorno));
        index_1.consola.actualizar(mensaje + ` l: ${linea}, c: ${columna}\n`);
    }
    ast(metodos) {
        return null;
    }
}
exports.LlamadaMetodo = LlamadaMetodo;

},{"../../Reportes/Error":7,"../../Reportes/Simbolo":9,"../../Reportes/TablaSimbolos":12,"../../abstractas/instruccion":14,"../../index":40,"../../tiposD/Tipos":58}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
class Main {
    constructor(metodo) {
        this.metodo = metodo;
    }
    ejectuar(metodos) {
        metodos.push(this.metodo);
    }
}
exports.Main = Main;

},{}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parametros = void 0;
class Parametros {
    constructor(tipo, tipo2, id) {
        this.tipo = tipo;
        this.tipo2 = tipo2;
        this.id = id;
    }
    ast() {
        //poner lo del ast
        return null;
    }
}
exports.Parametros = Parametros;

},{}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposControl = exports.Intervalo = exports.Tipos = void 0;
var Tipos;
(function (Tipos) {
    Tipos["INT"] = "int";
    Tipos["DOUBLE"] = "double";
    Tipos["BOOLEAN"] = "boolean";
    Tipos["CHAR"] = "char";
    Tipos["STRING"] = "String";
    Tipos["STRUCT"] = "struct";
    Tipos["NULL"] = "null";
    Tipos["VOID"] = "null";
    Tipos["ARRAY"] = "array";
})(Tipos = exports.Tipos || (exports.Tipos = {}));
var Intervalo;
(function (Intervalo) {
    Intervalo[Intervalo["BEGIN"] = 0] = "BEGIN";
    Intervalo[Intervalo["END"] = 1] = "END";
})(Intervalo = exports.Intervalo || (exports.Intervalo = {}));
var TiposControl;
(function (TiposControl) {
    TiposControl[TiposControl["BREAK"] = 0] = "BREAK";
    TiposControl[TiposControl["RETURN"] = 1] = "RETURN";
    TiposControl[TiposControl["CONTINUE"] = 3] = "CONTINUE";
})(TiposControl = exports.TiposControl || (exports.TiposControl = {}));

},{}]},{},[5])(5)
});
