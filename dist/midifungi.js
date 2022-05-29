/**
 * midifungi.js
 * ---
 * https://twitter.com/midifungi
 * https://github.com/midifungi/midifungi
 * ---
 * @version 0.0.13
 * @license "Apache 2.0"
 * ---
 * This file was bundled with Rollup
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('tweakpane'), require('@tweakpane/plugin-essentials')) :
  typeof define === 'function' && define.amd ? define(['tweakpane', '@tweakpane/plugin-essentials'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Tweakpane, global.EssentialsPlugin));
})(this, (function (Tweakpane, EssentialsPlugin) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var Tweakpane__namespace = /*#__PURE__*/_interopNamespace(Tweakpane);
  var EssentialsPlugin__namespace = /*#__PURE__*/_interopNamespace(EssentialsPlugin);

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */
  var now = function() {
    return root.Date.now();
  };

  /** Used to match a single whitespace character. */
  var reWhitespace = /\s/;

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedEndIndex(string) {
    var index = string.length;

    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }

  /** Used to match leading whitespace. */
  var reTrimStart = /^\s+/;

  /**
   * The base implementation of `_.trim`.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} Returns the trimmed string.
   */
  function baseTrim(string) {
    return string
      ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
      : string;
  }

  /** Built-in value references. */
  var Symbol$1 = root.Symbol;

  /** Used for built-in method references. */
  var objectProto$d = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$a = objectProto$d.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$d.toString;

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$a.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$c = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$c.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? getRawTag(value)
      : objectToString(value);
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  /** `Object#toString` result references. */
  var symbolTag$2 = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike(value) && baseGetTag(value) == symbolTag$2);
  }

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  /** Error message constants. */
  var FUNC_ERROR_TEXT$2 = 'Expected a function';

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$1 = Math.max,
      nativeMin = Math.min;

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */
  function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$2);
    }
    wait = toNumber(wait) || 0;
    if (isObject(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax$1(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;

      return maxing
        ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }

    function timerExpired() {
      var time = now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now());
    }

    function debounced() {
      var time = now(),
          isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  var p5Overrides = [
    // Globals
    '_renderer',
    'canvas',
    'drawingContext',

    // Environment
    'describe',
    'describeElement',
    'textOutput',
    'gridOutput',
    'print',
    'focused',
    'cursor',
    'frameRate',
    'noCursor',
    'displayWidth',
    'displayHeight',
    'windowWidth',
    'windowHeight',
    'windowResized',
    'width',
    'height',
    'fullscreen',
    'pixelDensity',
    'displayDensity',
    'getURL',
    'getURLPath',
    'getURLParams',

    // Color
    // Creating and reading
    'alpha',
    'blue',
    'brightness',
    'color',
    'green',
    'hue',
    'lerpColor',
    'red',
    'saturation',
    
    // Setting
    'background',
    'clear',
    'colorMode',
    'fill',
    'noFill',
    'noStroke',
    'stroke',
    'erase',
    'noErase',

    // Shape
    // 2d primitives
    'arc',
    'ellipse',
    'circle',
    'line',
    'point',
    'quad',
    'rect',
    'square',
    'triangle',
    // Vertex
    'beginContour',
    'beginShape',
    'bezierVertex',
    'curveVertex',
    'endContour',
    'endShape',
    'quadraticVertex',
    'vertex',
    'normal',
    // Attributes
    'ellipsesMode',
    'noSmooth',
    'rectMode',
    'smooth',
    'strokeCap',
    'strokeJoin',
    'strokeWeight',
    // 3D primitives
    'plane',
    'box',
    'sphere',
    'cylinder',
    'cone',
    'ellipsoid',
    'torus',
    // Curves
    'bezier',
    'bezierDetail',
    'bezierPoint',
    'bezierTangent',
    'curve',
    'curveDetail',
    'curvePoint',
    'curveTangent',
    'curveTightness',
    // 3D Models
    'loadModel',
    'model',

    // Structure
    'remove',
    'noLoop',
    'loop',
    'isLooping',
    'push',
    'pop',
    'redraw',
    'p5',

    // Rendering
    'blendMode',
    'setAttributes',

    // Transform
    'applyMatrix',
    'resetMatrix',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'scale',
    'shearX',
    'shearY',
    'translate',

    // Image
    'saveCanvas',
    'saveFrames',
    'loadImage',
    'image',
    'tint',
    'noTint',
    'imageMode',
    'pixels',
    'blend',
    'copy',
    'filter',
    'get',
    'loadPixels',
    'set',
    'updatePixels',

    // Vector
    'createVector',

    // Noise
    'noise',
    'noiseDetail',
    'noiseSeed',

    // Typography
    'textAlign',
    'textLeading',
    'textSize',
    'textStyle',
    'textWidth',
    'textAscent',
    'textDescent',
    'textWrap',
    'loadFont',
    'text',
    'textFont',

    // 3D
    // Interaction
    'orbitControl',
    'debugMode',
    'noDebugMode',
    // Lights
    'ambientLight',
    'directionalLight',
    'pointLight',
    'specularColor',
    'lights',
    'lightsFalloff',
    'spotLight',
    'noLights',
    // Material
    'loadShader',
    'createShader',
    'shader',
    'resetShader',
    'texture',
    'textureMode',
    'textureWrap',
    'normalMaterial',
    'ambientMaterial',
    'emissiveMaterial',
    'specularMaterial',
    'shininess',
    // Camera
    'camera',
    'perspective',
    'ortho',
    'frustum',
    'createCamera',
    'setCamera'
  ];

  /**
   * WEBMIDI.js v3.0.20
   * A JavaScript library to kickstart your MIDI projects
   * https://webmidijs.org
   * Build generated on May 6th, 2022.
   *
   * © Copyright 2015-2022, Jean-Philippe Côté.
   *
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
   * in compliance with the License. You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under the License
   * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
   * or implied. See the License for the specific language governing permissions and limitations under
   * the License.
   */

  /* Version: 3.0.20 - May 6, 2022 14:57:54 */
  /**
   * The `EventEmitter` class provides methods to implement the _observable_ design pattern. This
   * pattern allows one to _register_ a function to execute when a specific event is _emitted_ by the
   * emitter.
   *
   * It is intended to be an abstract class meant to be extended by (or mixed into) other objects.
   */
  class EventEmitter {

    /**
     * Creates a new `EventEmitter`object.
     *
     * @param {boolean} [eventsSuspended=false] Whether the `EventEmitter` is initially in a suspended
     * state (i.e. not executing callbacks).
     */
    constructor(eventsSuspended = false) {

      /**
       * An object containing a property for each event with at least one registered listener. Each
       * event property contains an array of all the [`Listener`]{@link Listener} objects registered
       * for the event.
       *
       * @type {Object}
       * @readonly
       */
      this.eventMap = {};

      /**
       * Whether or not the execution of callbacks is currently suspended for this emitter.
       *
       * @type {boolean}
       */
      this.eventsSuspended = eventsSuspended == true ? true : false;

    }

    /**
     * The callback function is executed when the associated event is triggered via [`emit()`](#emit).
     * The [`emit()`](#emit) method relays all additional arguments it received to the callback
     * functions. Since [`emit()`](#emit) can be passed a variable number of arguments, it is up to
     * the developer to make sure the arguments match those of the associated callback. In addition,
     * the callback also separately receives all the arguments present in the listener's
     * [`arguments`](Listener#arguments) property. This makes it easy to pass data from where the
     * listener is added to where the listener is executed.
     *
     * @callback EventEmitter~callback
     * @param {...*} [args] A variable number of arguments matching the ones (if any) that were passed
     * to the [`emit()`](#emit) method (except, the first one) followed by the arguments found in the
     * listener's [`arguments`](Listener#arguments) array.
     */

    /**
     * Adds a listener for the specified event. It returns the [`Listener`]{@link Listener} object
     * that was created and attached to the event.
     *
     * To attach a global listener that will be triggered for any events, use
     * [`EventEmitter.ANY_EVENT`]{@link #ANY_EVENT} as the first parameter. Note that a global
     * listener will also be triggered by non-registered events.
     *
     * @param {string|Symbol} event The event to listen to.
     * @param {EventEmitter~callback} callback The callback function to execute when the event occurs.
     * @param {Object} [options={}]
     * @param {Object} [options.context=this] The value of `this` in the callback function.
     * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
     * of the listeners array and thus executed first.
     * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
     * automatically expires.
     * @param {number} [options.remaining=Infinity] The number of times after which the callback
     * should automatically be removed.
     * @param {array} [options.arguments] An array of arguments which will be passed separately to the
     * callback function. This array is stored in the [`arguments`]{@link Listener#arguments}
     * property of the [`Listener`]{@link Listener} object and can be retrieved or modified as
     * desired.
     *
     * @returns {Listener} The newly created [`Listener`]{@link Listener} object.
     *
     * @throws {TypeError} The `event` parameter must be a string or
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}.
     * @throws {TypeError} The `callback` parameter must be a function.
     */
    addListener(event, callback, options = {}) {

      if (
        (typeof event === "string" && event.length < 1) ||
        (event instanceof String && event.length < 1) ||
        (typeof event !== "string" && !(event instanceof String) && event !== EventEmitter.ANY_EVENT)
      ) {
        throw new TypeError("The 'event' parameter must be a string or EventEmitter.ANY_EVENT.");
      }

      if (typeof callback !== "function") throw new TypeError("The callback must be a function.");

      const listener = new Listener(event, this, callback, options);

      if (!this.eventMap[event]) this.eventMap[event] = [];

      if (options.prepend) {
        this.eventMap[event].unshift(listener);
      } else {
        this.eventMap[event].push(listener);
      }

      return listener;

    }

    /**
     * Adds a one-time listener for the specified event. The listener will be executed once and then
     * destroyed. It returns the [`Listener`]{@link Listener} object that was created and attached
     * to the event.
     *
     * To attach a global listener that will be triggered for any events, use
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} as the first parameter. Note that a
     * global listener will also be triggered by non-registered events.
     *
     * @param {string|Symbol} event The event to listen to
     * @param {EventEmitter~callback} callback The callback function to execute when the event occurs
     * @param {Object} [options={}]
     * @param {Object} [options.context=this] The context to invoke the callback function in.
     * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
     * of the listeners array and thus executed first.
     * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
     * automatically expires.
     * @param {array} [options.arguments] An array of arguments which will be passed separately to the
     * callback function. This array is stored in the [`arguments`]{@link Listener#arguments}
     * property of the [`Listener`]{@link Listener} object and can be retrieved or modified as
     * desired.
     *
     * @returns {Listener} The newly created [`Listener`]{@link Listener} object.
     *
     * @throws {TypeError} The `event` parameter must be a string or
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}.
     * @throws {TypeError} The `callback` parameter must be a function.
     */
    addOneTimeListener(event, callback, options = {}) {
      options.remaining = 1;
      this.addListener(event, callback, options);
    }

    /**
     * Identifier to use when adding or removing a listener that should be triggered when any events
     * occur.
     *
     * @type {Symbol}
     */
    static get ANY_EVENT() {
      return Symbol.for("Any event");
    }

    /**
     * Returns `true` if the specified event has at least one registered listener. If no event is
     * specified, the method returns `true` if any event has at least one listener registered (this
     * includes global listeners registered to
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}).
     *
     * Note: to specifically check for global listeners added with
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}, use
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} as the parameter.
     *
     * @param {string|Symbol} [event=(any event)] The event to check
     * @param {function|Listener} [callback=(any callback)] The actual function that was added to the
     * event or the {@link Listener} object returned by `addListener()`.
     * @returns {boolean}
     */
    hasListener(event, callback) {

      if (event === undefined) {

        // Check for ANY_EVENT
        if (
          this.eventMap[EventEmitter.ANY_EVENT] && this.eventMap[EventEmitter.ANY_EVENT].length > 0
        ) {
          return true;
        }

        // Check for any regular events
        return Object.entries(this.eventMap).some(([, value]) => {
          return value.length > 0;
        });

      } else {

        if (this.eventMap[event] && this.eventMap[event].length > 0) {

          if (callback instanceof Listener) {
            let result = this.eventMap[event].filter(listener => listener === callback);
            return result.length > 0;
          } else if (typeof callback === "function") {
            let result = this.eventMap[event].filter(listener => listener.callback === callback);
            return result.length > 0;
          } else if (callback != undefined) {
            return false;
          }

          return true;

        } else {
          return false;
        }


      }

    }

    /**
     * An array of all the unique event names for which the emitter has at least one registered
     * listener.
     *
     * Note: this excludes global events registered with
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} because they are not tied to a
     * specific event.
     *
     * @type {string[]}
     * @readonly
     */
    get eventNames() {
      return Object.keys(this.eventMap);
    }

    /**
     * Returns an array of all the [`Listener`]{@link Listener} objects that have been registered for
     * a specific event.
     *
     * Please note that global events (those added with
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}) are not returned for "regular"
     * events. To get the list of global listeners, specifically use
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} as the parameter.
     *
     * @param {string|Symbol} event The event to get listeners for.
     * @returns {Listener[]} An array of [`Listener`]{@link Listener} objects.
     */
    getListeners(event) {
      return this.eventMap[event] || [];
    }

    /**
     * Suspends execution of all callbacks functions registered for the specified event type.
     *
     * You can suspend execution of callbacks registered with
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} by passing
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} to `suspendEvent()`. Beware that this
     * will not suspend all callbacks but only those registered with
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}. While this may seem counter-intuitive
     * at first glance, it allows the selective suspension of global listeners while leaving other
     * listeners alone. If you truly want to suspends all callbacks for a specific
     * [`EventEmitter`]{@link EventEmitter}, simply set its `eventsSuspended` property to `true`.
     *
     * @param {string|Symbol} event The event name (or `EventEmitter.ANY_EVENT`) for which to suspend
     * execution of all callback functions.
     */
    suspendEvent(event) {
      this.getListeners(event).forEach(listener => {
        listener.suspended = true;
      });
    }

    /**
     * Resumes execution of all suspended callback functions registered for the specified event type.
     *
     * You can resume execution of callbacks registered with
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} by passing
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} to `unsuspendEvent()`. Beware that
     * this will not resume all callbacks but only those registered with
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}. While this may seem
     * counter-intuitive, it allows the selective unsuspension of global listeners while leaving other
     * callbacks alone.
     *
     * @param {string|Symbol} event The event name (or `EventEmitter.ANY_EVENT`) for which to resume
     * execution of all callback functions.
     */
    unsuspendEvent(event) {
      this.getListeners(event).forEach(listener => {
        listener.suspended = false;
      });
    }

    /**
     * Returns the number of listeners registered for a specific event.
     *
     * Please note that global events (those added with
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}) do not count towards the remaining
     * number for a "regular" event. To get the number of global listeners, specifically use
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} as the parameter.
     *
     * @param {string|Symbol} event The event which is usually a string but can also be the special
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} symbol.
     * @returns {number} An integer representing the number of listeners registered for the specified
     * event.
     */
    getListenerCount(event) {
      return this.getListeners(event).length;
    }

    /**
     * Executes the callback function of all the [`Listener`]{@link Listener} objects registered for
     * a given event. The callback functions are passed the additional arguments passed to `emit()`
     * (if any) followed by the arguments present in the [`arguments`](Listener#arguments) property of
     * the [`Listener`](Listener) object (if any).
     *
     * If the [`eventsSuspended`]{@link #eventsSuspended} property is `true` or the
     * [`Listener.suspended`]{@link Listener#suspended} property is `true`, the callback functions
     * will not be executed.
     *
     * This function returns an array containing the return values of each of the callbacks.
     *
     * It should be noted that the regular listeners are triggered first followed by the global
     * listeners (those added with [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}).
     *
     * @param {string} event The event
     * @param {...*} args Arbitrary number of arguments to pass along to the callback functions
     *
     * @returns {Array} An array containing the return value of each of the executed listener
     * functions.
     *
     * @throws {TypeError} The `event` parameter must be a string.
     */
    emit(event, ...args) {

      if (typeof event !== "string" && !(event instanceof String)) {
        throw new TypeError("The 'event' parameter must be a string.");
      }

      if (this.eventsSuspended) return;

      // We collect return values from all listeners here
      let results = [];

      // We must make sure that we do not have undefined otherwise concat() will add an undefined
      // entry in the array.
      let listeners = this.eventMap[EventEmitter.ANY_EVENT] || [];
      if (this.eventMap[event]) listeners = listeners.concat(this.eventMap[event]);

      listeners.forEach(listener => {

        // This is the per-listener suspension check
        if (listener.suspended) return;

        let params = [...args];
        if (Array.isArray(listener.arguments)) params = params.concat(listener.arguments);

        if (listener.remaining > 0) {
          results.push(listener.callback.apply(listener.context, params));
          listener.count++;
        }

        if (--listener.remaining < 1) listener.remove();

      });

      return results;

    }

    /**
     * Removes all the listeners that match the specified criterias. If no parameters are passed, all
     * listeners will be removed. If only the `event` parameter is passed, all listeners for that
     * event will be removed. You can remove global listeners by using
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} as the first parameter.
     *
     * To use more granular options, you must at least define the `event`. Then, you can specify the
     * callback to match or one or more of the additional options.
     *
     * @param {string} [event] The event name.
     * @param {EventEmitter~callback} [callback] Only remove the listeners that match this exact
     * callback function.
     * @param {Object} [options]
     * @param {*} [options.context] Only remove the listeners that have this exact context.
     * @param {number} [options.remaining] Only remove the listener if it has exactly that many
     * remaining times to be executed.
     */
    removeListener(event, callback, options = {}) {

      if (event === undefined) {
        this.eventMap = {};
        return;
      } else if (!this.eventMap[event]) {
        return;
      }

      // Find listeners that do not match the criterias (those are the ones we will keep)
      let listeners = this.eventMap[event].filter(listener => {

        return (callback && listener.callback !== callback) ||
          (options.remaining && options.remaining !== listener.remaining) ||
          (options.context && options.context !== listener.context);

      });

      if (listeners.length) {
        this.eventMap[event] = listeners;
      } else {
        delete this.eventMap[event];
      }

    }

    /**
     * The `waitFor()` method is an async function which returns a promise. The promise is fulfilled
     * when the specified event occurs. The event can be a regular event or
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} (if you want to resolve as soon as any
     * event is emitted).
     *
     * If the `duration` option is set, the promise will only be fulfilled if the event is emitted
     * within the specified duration. If the event has not been fulfilled after the specified
     * duration, the promise is rejected. This makes it super easy to wait for an event and timeout
     * after a certain time if the event is not triggered.
     *
     * @param {string|Symbol} event The event to wait for
     * @param {Object} [options={}]
     * @param {number} [options.duration=Infinity] The number of milliseconds to wait before the
     * promise is automatically rejected.
     */
    async waitFor(event, options = {}) {

      options.duration = parseInt(options.duration);
      if (isNaN(options.duration) || options.duration <= 0) options.duration = Infinity;

      return new Promise((resolve, reject) => {

        let timeout;

        let listener = this.addListener(event, () => {
          clearTimeout(timeout);
          resolve();
        }, {remaining: 1});

        if (options.duration !== Infinity) {
          timeout = setTimeout(() => {
            listener.remove();
            reject("The duration expired before the event was emitted.");
          }, options.duration);
        }

      });

    }

    /**
     * The number of unique events that have registered listeners.
     *
     * Note: this excludes global events registered with
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT} because they are not tied to a
     * specific event.
     *
     * @type {number}
     * @readonly
     */
    get eventCount() {
      return Object.keys(this.eventMap).length;
    }

  }

  /**
   * The `Listener` class represents a single event listener object. Such objects keep all relevant
   * contextual information such as the event being listened to, the object the listener was attached
   * to, the callback function and so on.
   *
   */
  class Listener {

    /**
     * Creates a new `Listener` object
     *
     * @param {string|Symbol} event The event being listened to
     * @param {EventEmitter} target The [`EventEmitter`]{@link EventEmitter} object that the listener
     * is attached to.
     * @param {EventEmitter~callback} callback The function to call when the listener is triggered
     * @param {Object} [options={}]
     * @param {Object} [options.context=target] The context to invoke the listener in (a.k.a. the
     * value of `this` inside the callback function).
     * @param {number} [options.remaining=Infinity] The remaining number of times after which the
     * callback should automatically be removed.
     * @param {array} [options.arguments] An array of arguments that will be passed separately to the
     * callback function upon execution. The array is stored in the [`arguments`]{@link #arguments}
     * property and can be retrieved or modified as desired.
     *
     * @throws {TypeError} The `event` parameter must be a string or
     * [`EventEmitter.ANY_EVENT`]{@link EventEmitter#ANY_EVENT}.
     * @throws {ReferenceError} The `target` parameter is mandatory.
     * @throws {TypeError} The `callback` must be a function.
     */
    constructor(event, target, callback, options = {}) {

      if (
        typeof event !== "string" &&
        !(event instanceof String) &&
        event !== EventEmitter.ANY_EVENT
      ) {
        throw new TypeError("The 'event' parameter must be a string or EventEmitter.ANY_EVENT.");
      }

      if (!target) {
        throw new ReferenceError("The 'target' parameter is mandatory.");
      }

      if (typeof callback !== "function") {
        throw new TypeError("The 'callback' must be a function.");
      }

      // Convert single value argument to array
      if (options.arguments !== undefined && !Array.isArray(options.arguments)) {
        options.arguments = [options.arguments];
      }

      // Define default options and merge declared options into them,
      options = Object.assign({
        context: target,
        remaining: Infinity,
        arguments: undefined,
        duration: Infinity,
      }, options);

      // Make sure it is eventually deleted if a duration is supplied
      if (options.duration !== Infinity) {
        setTimeout(() => this.remove(), options.duration);
      }

      /**
       * An array of arguments to pass to the callback function upon execution.
       * @type {array}
       */
      this.arguments = options.arguments;

      /**
       * The callback function to execute.
       * @type {Function}
       */
      this.callback = callback;

      /**
       * The context to execute the callback function in (a.k.a. the value of `this` inside the
       * callback function)
       * @type {Object}
       */
      this.context = options.context;

      /**
       * The number of times the listener function was executed.
       * @type {number}
       */
      this.count = 0;

      /**
       * The event name.
       * @type {string}
       */
      this.event = event;

      /**
       * The remaining number of times after which the callback should automatically be removed.
       * @type {number}
       */
      this.remaining = parseInt(options.remaining) >= 1 ? parseInt(options.remaining) : Infinity;

      /**
       * Whether this listener is currently suspended or not.
       * @type {boolean}
       */
      this.suspended = false;

      /**
       * The object that the event is attached to (or that emitted the event).
       * @type {EventEmitter}
       */
      this.target = target;

    }

    /**
     * Removes the listener from its target.
     */
    remove() {
      this.target.removeListener(
        this.event,
        this.callback,
        {context: this.context, remaining: this.remaining}
      );
    }

  }

  /**
   * The `Enumerations` class contains enumerations and arrays of elements used throughout the
   * library. All properties are static and should be referenced using the class name. For example:
   * `Enumerations.MIDI_CHANNEL_MESSAGES`.
   *
   * @license Apache-2.0
   * @since 3.0.0
   */
  class Enumerations {

    /**
     * Enumeration of all MIDI channel message names and their associated 4-bit numerical value:
     *
     * | Message Name        | Hexadecimal | Decimal |
     * |---------------------|-------------|---------|
     * | `noteoff`           | 0x8         | 8       |
     * | `noteon`            | 0x9         | 9       |
     * | `keyaftertouch`     | 0xA         | 10      |
     * | `controlchange`     | 0xB         | 11      |
     * | `programchange`     | 0xC         | 12      |
     * | `channelaftertouch` | 0xD         | 13      |
     * | `pitchbend`         | 0xE         | 14      |
     *
     * @enum {Object.<string, number>}
     * @readonly
     * @static
     */
    static get MIDI_CHANNEL_MESSAGES() {

      return {
        noteoff: 0x8,           // 8
        noteon: 0x9,            // 9
        keyaftertouch: 0xA,     // 10
        controlchange: 0xB,     // 11
        programchange: 0xC,     // 12
        channelaftertouch: 0xD, // 13
        pitchbend: 0xE          // 14
      };

    }

    /**
     * A simple array of the 16 valid MIDI channel numbers (`1` to `16`):
     *
     * @type {number[]}
     * @readonly
     * @static
     */
    static get MIDI_CHANNEL_NUMBERS() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    }

    /**
     * Enumeration of all MIDI channel mode message names and their associated numerical value:
     *
     *
     * | Message Name          | Hexadecimal | Decimal |
     * |-----------------------|-------------|---------|
     * | `allsoundoff`         | 0x78        | 120     |
     * | `resetallcontrollers` | 0x79        | 121     |
     * | `localcontrol`        | 0x7A        | 122     |
     * | `allnotesoff`         | 0x7B        | 123     |
     * | `omnimodeoff`         | 0x7C        | 124     |
     * | `omnimodeon`          | 0x7D        | 125     |
     * | `monomodeon`          | 0x7E        | 126     |
     * | `polymodeon`          | 0x7F        | 127     |
     *
     * @enum {Object.<string, number>}
     * @readonly
     * @static
     */
    static get MIDI_CHANNEL_MODE_MESSAGES() {

      return {
        allsoundoff: 120,
        resetallcontrollers: 121,
        localcontrol: 122,
        allnotesoff: 123,
        omnimodeoff: 124,
        omnimodeon: 125,
        monomodeon: 126,
        polymodeon: 127
      };

    }

    /**
     * Enumeration of all control change messages identifying the control function associated to its
     * control number.
     *
     * Not all numbers have a preassigned control function. For those that don't, the control function
     * is identified as the word "controller" followed by the number (e.g. `controller123`).
     *
     * | Control Function               | Control Number |
     * |--------------------------------|----------------|
     * | `bankselectcoarse`             | 0              |
     * | `modulationwheelcoarse`        | 1              |
     * | `breathcontrollercoarse`       | 2              |
     * | `controller3`                  | 3              |
     * | `footcontrollercoarse`         | 4              |
     * | `portamentotimecoarse`         | 5              |
     * | `dataentrycoarse`              | 6              |
     * | `volumecoarse`                 | 7              |
     * | `balancecoarse`                | 8              |
     * | `controller9`                  | 9              |
     * | `pancoarse`                    | 10             |
     * | `expressioncoarse`             | 11             |
     * | `effectcontrol1coarse`         | 12             |
     * | `effectcontrol2coarse`         | 13             |
     * | `controller14`                 | 14             |
     * | `controller15`                 | 15             |
     * | `generalpurposeslider1`        | 16             |
     * | `generalpurposeslider2`        | 17             |
     * | `generalpurposeslider3`        | 18             |
     * | `generalpurposeslider4`        | 19             |
     * | `controller20`                 | 20             |
     * | `controller21`                 | 21             |
     * | `controller22`                 | 22             |
     * | `controller23`                 | 23             |
     * | `controller24`                 | 24             |
     * | `controller25`                 | 25             |
     * | `controller26`                 | 26             |
     * | `controller27`                 | 27             |
     * | `controller28`                 | 28             |
     * | `controller29`                 | 29             |
     * | `controller30`                 | 30             |
     * | `controller31`                 | 31             |
     * | `bankselectfine`               | 32             |
     * | `modulationwheelfine`          | 33             |
     * | `breathcontrollerfine`         | 34             |
     * | `controller35`                 | 35             |
     * | `footcontrollerfine`           | 36             |
     * | `portamentotimefine`           | 37             |
     * | `dataentryfine`                | 38             |
     * | `volumefine`                   | 39             |
     * | `balancefine`                  | 40             |
     * | `controller41`                 | 41             |
     * | `panfine`                      | 42             |
     * | `expressionfine`               | 43             |
     * | `effectcontrol1fine`           | 44             |
     * | `effectcontrol2fine`           | 45             |
     * | `controller46`                 | 46             |
     * | `controller47`                 | 47             |
     * | `controller48`                 | 48             |
     * | `controller49`                 | 49             |
     * | `controller50`                 | 50             |
     * | `controller51`                 | 51             |
     * | `controller52`                 | 52             |
     * | `controller53`                 | 53             |
     * | `controller54`                 | 54             |
     * | `controller55`                 | 55             |
     * | `controller56`                 | 56             |
     * | `controller57`                 | 57             |
     * | `controller58`                 | 58             |
     * | `controller59`                 | 59             |
     * | `controller60`                 | 60             |
     * | `controller61`                 | 61             |
     * | `controller62`                 | 62             |
     * | `controller63`                 | 63             |
     * | `holdpedal`                    | 64             |
     * | `portamento`                   | 65             |
     * | `sustenutopedal`               | 66             |
     * | `softpedal`                    | 67             |
     * | `legatopedal`                  | 68             |
     * | `hold2pedal`                   | 69             |
     * | `soundvariation`               | 70             |
     * | `resonance`                    | 71             |
     * | `soundreleasetime`             | 72             |
     * | `soundattacktime`              | 73             |
     * | `brightness`                   | 74             |
     * | `soundcontrol6`                | 75             |
     * | `soundcontrol7`                | 76             |
     * | `soundcontrol8`                | 77             |
     * | `soundcontrol9`                | 78             |
     * | `soundcontrol10`               | 79             |
     * | `generalpurposebutton1`        | 80             |
     * | `generalpurposebutton2`        | 81             |
     * | `generalpurposebutton3`        | 82             |
     * | `generalpurposebutton4`        | 83             |
     * | `controller84`                 | 84             |
     * | `controller85`                 | 85             |
     * | `controller86`                 | 86             |
     * | `controller87`                 | 87             |
     * | `controller88`                 | 88             |
     * | `controller89`                 | 89             |
     * | `controller90`                 | 90             |
     * | `reverblevel`                  | 91             |
     * | `tremololevel`                 | 92             |
     * | `choruslevel`                  | 93             |
     * | `celestelevel`                 | 94             |
     * | `phaserlevel`                  | 95             |
     * | `databuttonincrement`          | 96             |
     * | `databuttondecrement`          | 97             |
     * | `nonregisteredparametercoarse` | 98             |
     * | `nonregisteredparameterfine`   | 99             |
     * | `registeredparametercoarse`    | 100            |
     * | `registeredparameterfine`      | 101            |
     * | `controller102`                | 102            |
     * | `controller103`                | 103            |
     * | `controller104`                | 104            |
     * | `controller105`                | 105            |
     * | `controller106`                | 106            |
     * | `controller107`                | 107            |
     * | `controller108`                | 108            |
     * | `controller109`                | 109            |
     * | `controller110`                | 110            |
     * | `controller111`                | 111            |
     * | `controller112`                | 112            |
     * | `controller113`                | 113            |
     * | `controller114`                | 114            |
     * | `controller115`                | 115            |
     * | `controller116`                | 116            |
     * | `controller117`                | 117            |
     * | `controller118`                | 118            |
     * | `controller119`                | 119            |
     * | `allsoundoff`                  | 120            |
     * | `resetallcontrollers`          | 121            |
     * | `localcontrol`                 | 122            |
     * | `allnotesoff`                  | 123            |
     * | `omnimodeoff`                  | 124            |
     * | `omnimodeon`                   | 125            |
     * | `monomodeon`                   | 126            |
     * | `polymodeon`                   | 127            |
     *
     * @enum {Object.<string, number>}
     * @readonly
     * @static
     */
    static get MIDI_CONTROL_CHANGE_MESSAGES() {

      return {

        bankselectcoarse: 0,
        modulationwheelcoarse: 1,
        breathcontrollercoarse: 2,
        controller3: 3,
        footcontrollercoarse: 4,
        portamentotimecoarse: 5,
        dataentrycoarse: 6,
        volumecoarse: 7,
        balancecoarse: 8,
        controller9: 9,
        pancoarse: 10,
        expressioncoarse: 11,
        effectcontrol1coarse: 12,
        effectcontrol2coarse: 13,
        controller14: 14,
        controller15: 15,
        generalpurposeslider1: 16,
        generalpurposeslider2: 17,
        generalpurposeslider3: 18,
        generalpurposeslider4: 19,
        controller20: 20,
        controller21: 21,
        controller22: 22,
        controller23: 23,
        controller24: 24,
        controller25: 25,
        controller26: 26,
        controller27: 27,
        controller28: 28,
        controller29: 29,
        controller30: 30,
        controller31: 31,
        bankselectfine: 32,
        modulationwheelfine: 33,
        breathcontrollerfine: 34,
        controller35: 35,
        footcontrollerfine: 36,
        portamentotimefine: 37,
        dataentryfine: 38,
        volumefine: 39,
        balancefine: 40,
        controller41: 41,
        panfine: 42,
        expressionfine: 43,
        effectcontrol1fine: 44,
        effectcontrol2fine: 45,
        controller46: 46,
        controller47: 47,
        controller48: 48,
        controller49: 49,
        controller50: 50,
        controller51: 51,
        controller52: 52,
        controller53: 53,
        controller54: 54,
        controller55: 55,
        controller56: 56,
        controller57: 57,
        controller58: 58,
        controller59: 59,
        controller60: 60,
        controller61: 61,
        controller62: 62,
        controller63: 63,
        holdpedal: 64,
        portamento: 65,
        sustenutopedal: 66,
        softpedal: 67,
        legatopedal: 68,
        hold2pedal: 69,
        soundvariation: 70,
        resonance: 71,
        soundreleasetime: 72,
        soundattacktime: 73,
        brightness: 74,
        soundcontrol6: 75,
        soundcontrol7: 76,
        soundcontrol8: 77,
        soundcontrol9: 78,
        soundcontrol10: 79,
        generalpurposebutton1: 80,
        generalpurposebutton2: 81,
        generalpurposebutton3: 82,
        generalpurposebutton4: 83,
        controller84: 84,
        controller85: 85,
        controller86: 86,
        controller87: 87,
        controller88: 88,
        controller89: 89,
        controller90: 90,
        reverblevel: 91,
        tremololevel: 92,
        choruslevel: 93,
        celestelevel: 94,
        phaserlevel: 95,
        databuttonincrement: 96,
        databuttondecrement: 97,
        nonregisteredparametercoarse: 98,
        nonregisteredparameterfine: 99,
        registeredparametercoarse: 100,
        registeredparameterfine: 101,
        controller102: 102,
        controller103: 103,
        controller104: 104,
        controller105: 105,
        controller106: 106,
        controller107: 107,
        controller108: 108,
        controller109: 109,
        controller110: 110,
        controller111: 111,
        controller112: 112,
        controller113: 113,
        controller114: 114,
        controller115: 115,
        controller116: 116,
        controller117: 117,
        controller118: 118,
        controller119: 119,
        allsoundoff: 120,
        resetallcontrollers: 121,
        localcontrol: 122,
        allnotesoff: 123,
        omnimodeoff: 124,
        omnimodeon: 125,
        monomodeon: 126,
        polymodeon: 127

      };

    }

    /**
     * Enumeration of all MIDI registered parameters and their associated pair of numerical values.
     * MIDI registered parameters extend the original list of control change messages. Currently,
     * there are only a limited number of them:
     *
     *
     * | Control Function             | [LSB, MSB]   |
     * |------------------------------|--------------|
     * | `pitchbendrange`             | [0x00, 0x00] |
     * | `channelfinetuning`          | [0x00, 0x01] |
     * | `channelcoarsetuning`        | [0x00, 0x02] |
     * | `tuningprogram`              | [0x00, 0x03] |
     * | `tuningbank`                 | [0x00, 0x04] |
     * | `modulationrange`            | [0x00, 0x05] |
     * | `azimuthangle`               | [0x3D, 0x00] |
     * | `elevationangle`             | [0x3D, 0x01] |
     * | `gain`                       | [0x3D, 0x02] |
     * | `distanceratio`              | [0x3D, 0x03] |
     * | `maximumdistance`            | [0x3D, 0x04] |
     * | `maximumdistancegain`        | [0x3D, 0x05] |
     * | `referencedistanceratio`     | [0x3D, 0x06] |
     * | `panspreadangle`             | [0x3D, 0x07] |
     * | `rollangle`                  | [0x3D, 0x08] |
     *
     * @enum {Object.<string, number[]>}
     * @readonly
     * @static
     */
    static get MIDI_REGISTERED_PARAMETERS() {

      return {
        pitchbendrange: [0x00, 0x00],
        channelfinetuning: [0x00, 0x01],
        channelcoarsetuning: [0x00, 0x02],
        tuningprogram: [0x00, 0x03],
        tuningbank: [0x00, 0x04],

        modulationrange: [0x00, 0x05],
        azimuthangle: [0x3D, 0x00],
        elevationangle: [0x3D, 0x01],
        gain: [0x3D, 0x02],
        distanceratio: [0x3D, 0x03],
        maximumdistance: [0x3D, 0x04],
        maximumdistancegain: [0x3D, 0x05],
        referencedistanceratio: [0x3D, 0x06],
        panspreadangle: [0x3D, 0x07],
        rollangle: [0x3D, 0x08]
      };

    }

    /**
     * Enumeration of all valid MIDI system messages and matching numerical values. WebMidi.js also
     * uses two additional custom messages.
     *
     * **System Common Messages**
     *
     * | Function               | Hexadecimal | Decimal |
     * |------------------------|-------------|---------|
     * | `sysex`                | 0xF0        |  240    |
     * | `timecode`             | 0xF1        |  241    |
     * | `songposition`         | 0xF2        |  242    |
     * | `songselect`           | 0xF3        |  243    |
     * | `tunerequest`          | 0xF6        |  246    |
     * | `sysexend`             | 0xF7        |  247    |
     *
     * The `sysexend` message is never actually received. It simply ends a sysex stream.
     *
     * **System Real-Time Messages**
     *
     * | Function               | Hexadecimal | Decimal |
     * |------------------------|-------------|---------|
     * | `clock`                | 0xF8        |  248    |
     * | `start`                | 0xFA        |  250    |
     * | `continue`             | 0xFB        |  251    |
     * | `stop`                 | 0xFC        |  252    |
     * | `activesensing`        | 0xFE        |  254    |
     * | `reset`                | 0xFF        |  255    |
     *
     * Values 249 and 253 are relayed by the
     * [Web MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API) but they do not
     * serve any specific purpose. The
     * [MIDI 1.0 spec](https://www.midi.org/specifications/item/table-1-summary-of-midi-message)
     * simply states that they are undefined/reserved.
     *
     * **Custom WebMidi.js Messages**
     *
     * These two messages are mostly for internal use. They are not MIDI messages and cannot be sent
     * or forwarded.
     *
     * | Function               | Hexadecimal | Decimal |
     * |------------------------|-------------|---------|
     * | `midimessage`          |             |  0      |
     * | `unknownsystemmessage` |             |  -1     |
     *
     * @enum {Object.<string, number>}
     * @readonly
     * @static
     */
    static get MIDI_SYSTEM_MESSAGES() {

      return {

        // System common messages
        sysex: 0xF0,            // 240
        timecode: 0xF1,         // 241
        songposition: 0xF2,     // 242
        songselect: 0xF3,       // 243
        tunerequest: 0xF6,      // 246
        tuningrequest: 0xF6,    // for backwards-compatibility (deprecated in version 3.0)
        sysexend: 0xF7,         // 247 (never actually received - simply ends a sysex)

        // System real-time messages
        clock: 0xF8,            // 248
        start: 0xFA,            // 250
        continue: 0xFB,         // 251
        stop: 0xFC,             // 252
        activesensing: 0xFE,    // 254
        reset: 0xFF,            // 255

        // Custom WebMidi.js messages
        midimessage: 0,
        unknownsystemmessage: -1

      };

    }

    /**
     * Array of channel-specific event names that can be listened for. This includes channel mode
     * events and RPN/NRPN events.
     *
     * @type {string[]}
     * @readonly
     */
    static get CHANNEL_EVENTS() {

      return [

        // MIDI channel message events
        "noteoff",
        "controlchange",
        "noteon",
        "keyaftertouch",
        "programchange",
        "channelaftertouch",
        "pitchbend",

        // MIDI channel mode events
        "allnotesoff",
        "allsoundoff",
        "localcontrol",
        "monomode",
        "omnimode",
        "resetallcontrollers",

        // RPN/NRPN events
        "nrpn",
        "nrpn-dataentrycoarse",
        "nrpn-dataentryfine",
        "nrpn-databuttonincrement",
        "nrpn-databuttondecrement",
        "rpn",
        "rpn-dataentrycoarse",
        "rpn-dataentryfine",
        "rpn-databuttonincrement",
        "rpn-databuttondecrement"

      ];
    }

  }

  /**
   * The `Note` class represents a single musical note such as `"D3"`, `"G#4"`, `"F-1"`, `"Gb7"`, etc.
   *
   * `Note` objects can be played back on a single channel by calling
   * [`OutputChannel.playNote()`]{@link OutputChannel#playNote} or, on multiple channels of the same
   * output, by calling [`Output.playNote()`]{@link Output#playNote}.
   *
   * The note has [`attack`](#attack) and [`release`](#release) velocities set at `0.5` by default.
   * These can be changed by passing in the appropriate option. It is also possible to set a
   * system-wide default for attack and release velocities by using the
   * [`WebMidi.defaults`](WebMidi#defaults) property.
   *
   * If you prefer to work with raw MIDI values (`0` to `127`), you can use [`rawAttack`](#rawAttack) and
   * [`rawRelease`](#rawRelease) to both get and set the values.
   *
   * The note may have a [`duration`](#duration). If it does, playback will be automatically stopped
   * when the duration has elapsed by sending a `"noteoff"` event. By default, the duration is set to
   * `Infinity`. In this case, it will never stop playing unless explicitly stopped by calling a
   * method such as [`OutputChannel.stopNote()`]{@link OutputChannel#stopNote},
   * [`Output.stopNote()`]{@link Output#stopNote} or similar.
   *
   * @license Apache-2.0
   * @since 3.0.0
   */
  class Note {

    /**
     * Creates a `Note` object.
     *
     * @param value {string|number} The value used to create the note. If an identifier string is used,
     * it must start with the note letter, optionally followed by an accidental and followed by the
     * octave number (`"C3"`, `"G#4"`, `"F-1"`, `"Db7"`, etc.). If a number is used, it must be an
     * integer between 0 and 127. In this case, middle C is considered to be C4 (note number 60).
     *
     * @param {object} [options={}]
     *
     * @param {number} [options.duration=Infinity] The number of milliseconds before the note should be
     * explicitly stopped.
     *
     * @param {number} [options.attack=0.5] The note's attack velocity as a float between 0 and 1. If
     * you wish to use an integer between 0 and 127, use the `rawAttack` option instead. If both
     * `attack` and `rawAttack` are specified, the latter has precedence.
     *
     * @param {number} [options.release=0.5] The note's release velocity as a float between 0 and 1. If
     * you wish to use an integer between 0 and 127, use the `rawRelease` option instead. If both
     * `release` and `rawRelease` are specified, the latter has precedence.
     *
     * @param {number} [options.rawAttack=64] The note's attack velocity as an integer between 0 and
     * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
     * `attack` and `rawAttack` are specified, the latter has precedence.
     *
     * @param {number} [options.rawRelease=64] The note's release velocity as an integer between 0 and
     * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
     * `release` and `rawRelease` are specified, the latter has precedence.
     *
     * @throws {Error} Invalid note identifier
     * @throws {RangeError} Invalid name value
     * @throws {RangeError} Invalid accidental value
     * @throws {RangeError} Invalid octave value
     * @throws {RangeError} Invalid duration value
     * @throws {RangeError} Invalid attack value
     * @throws {RangeError} Invalid release value
     */
    constructor(value, options = {}) {

      // Assign property defaults
      this.duration = wm.defaults.note.duration;
      this.attack = wm.defaults.note.attack;
      this.release = wm.defaults.note.release;

      // Assign property values from options (validation occurs in setter)
      if (options.duration != undefined) this.duration = options.duration;
      if (options.attack != undefined) this.attack = options.attack;
      if (options.rawAttack != undefined) this.attack = Utilities.from7bitToFloat(options.rawAttack);
      if (options.release != undefined) this.release = options.release;
      if (options.rawRelease != undefined) {
        this.release = Utilities.from7bitToFloat(options.rawRelease);
      }

      // Assign note depending on the way it was specified (name or number)
      if (Number.isInteger(value)) {
        this.identifier = Utilities.toNoteIdentifier(value);
      } else {
        this.identifier = value;
      }

    }

    /**
     * The name, optional accidental and octave of the note, as a string.
     * @type {string}
     * @since 3.0.0
     */
    get identifier() {
      return this._name + (this._accidental || "") + this._octave;
    }
    set identifier(value) {

      const fragments = Utilities.getNoteDetails(value);

      if (wm.validation) {
        if (!value) throw new Error("Invalid note identifier");
      }

      this._name = fragments.name;
      this._accidental = fragments.accidental;
      this._octave = fragments.octave;

    }

    /**
     * The name (letter) of the note
     * @type {string}
     * @since 3.0.0
     */
    get name() {
      return this._name;
    }
    set name(value) {

      if (wm.validation) {
        value = value.toUpperCase();
        if (!["C", "D", "E", "F", "G", "A", "B"].includes(value)) {
          throw new Error("Invalid name value");
        }
      }

      this._name = value;

    }

    /**
     * The accidental (#, ##, b or bb) of the note.
     * @type {string}
     * @since 3.0.0
     */
    get accidental() {
      return this._accidental;
    }
    set accidental(value) {

      if (wm.validation) {
        value = value.toLowerCase();
        if (!["#", "##", "b", "bb"].includes(value)) throw new Error("Invalid accidental value");
      }

      this._accidental = value;

    }

    /**
     * The octave of the note.
     * @type {number}
     * @since 3.0.0
     */
    get octave() {
      return this._octave;
    }
    set octave(value) {

      if (wm.validation) {
        value = parseInt(value);
        if (isNaN(value)) throw new Error("Invalid octave value");
      }

      this._octave = value;

    }

    /**
     * The duration of the note as a positive decimal number representing the number of milliseconds
     * that the note should play for.
     *
     * @type {number}
     * @since 3.0.0
     */
    get duration() {
      return this._duration;
    }
    set duration(value) {

      if (wm.validation) {
        value = parseFloat(value);
        if (isNaN(value) || value === null || value < 0) {
          throw new RangeError("Invalid duration value.");
        }
      }

      this._duration = value;

    }

    /**
     * The attack velocity of the note as an integer between 0 and 1.
     * @type {number}
     * @since 3.0.0
     */
    get attack() {
      return this._attack;
    }
    set attack(value) {

      if (wm.validation) {
        value = parseFloat(value);
        if (isNaN(value) || !(value >= 0 && value <= 1)) {
          throw new RangeError("Invalid attack value.");
        }
      }

      this._attack = value;

    }

    /**
     * The release velocity of the note as an integer between 0 and 1.
     * @type {number}
     * @since 3.0.0
     */
    get release() {
      return this._release;
    }
    set release(value) {

      if (wm.validation) {
        value = parseFloat(value);
        if (isNaN(value) || !(value >= 0 && value <= 1)) {
          throw new RangeError("Invalid release value.");
        }
      }

      this._release = value;

    }

    /**
     * The attack velocity of the note as a positive integer between 0 and 127.
     * @type {number}
     * @since 3.0.0
     */
    get rawAttack() {
      return Utilities.fromFloatTo7Bit(this._attack);
    }
    set rawAttack(value) {
      this._attack = Utilities.from7bitToFloat(value);
    }

    /**
     * The release velocity of the note as a positive integer between 0 and 127.
     * @type {number}
     * @since 3.0.0
     */
    get rawRelease() {
      return Utilities.fromFloatTo7Bit(this._release);
    }
    set rawRelease(value) {
      this._release = Utilities.from7bitToFloat(value);
    }

    /**
     * The MIDI number of the note (`0` - `127`). This number is derived from the note identifier
     * using C4 as a reference for middle C.
     *
     * @type {number}
     * @readonly
     * @since 3.0.0
     */
    get number() {
      return Utilities.toNoteNumber(this.identifier);
    }

    /**
     * Returns a MIDI note number offset by octave and/or semitone. If the calculated value is less
     * than 0, 0 will be returned. If the calculated value is more than 127, 127 will be returned. If
     * an invalid value is supplied, 0 will be used.
     *
     * @param [octaveOffset] {number} An integer to offset the note number by octave.
     * @param [semitoneOffset] {number} An integer to offset the note number by semitone.
     * @returns {number} An integer between 0 and 127
     */
    getOffsetNumber(octaveOffset = 0, semitoneOffset = 0) {

      if (wm.validation) {
        octaveOffset = parseInt(octaveOffset) || 0;
        semitoneOffset = parseInt(semitoneOffset) || 0;
      }

      return Math.min(Math.max(this.number + (octaveOffset * 12) + semitoneOffset, 0), 127);

    }

  }

  /**
   * The `Utilities` class contains general-purpose utility methods. All methods are static and
   * should be called using the class name. For example: `Utilities.getNoteDetails("C4")`.
   *
   * @license Apache-2.0
   * @since 3.0.0
   */
  class Utilities {

    /**
     * Returns a MIDI note number matching the identifier passed in the form of a string. The
     * identifier must include the octave number. The identifier also optionally include a sharp (#),
     * a double sharp (##), a flat (b) or a double flat (bb) symbol. For example, these are all valid
     * identifiers: C5, G4, D#-1, F0, Gb7, Eb-1, Abb4, B##6, etc.
     *
     * When converting note identifiers to numbers, C4 is considered to be middle C (MIDI note number
     * 60) as per the scientific pitch notation standard.
     *
     * The resulting note number can be offset by using the `octaveOffset` parameter.
     *
     * @param identifier {string} The identifier in the form of a letter, followed by an optional "#",
     * "##", "b" or "bb" followed by the octave number. For exemple: C5, G4, D#-1, F0, Gb7, Eb-1,
     * Abb4, B##6, etc.
     *
     * @param {number} [octaveOffset=0] A integer to offset the octave by.
     *
     * @returns {number} The MIDI note number (an integer between 0 and 127).
     *
     * @throws RangeError Invalid 'octaveOffset' value
     *
     * @throws TypeError Invalid note identifier
     *
     * @license Apache-2.0
     * @since 3.0.0
     * @static
     */
    static toNoteNumber(identifier, octaveOffset = 0) {

      // Validation
      octaveOffset = octaveOffset == undefined ? 0 : parseInt(octaveOffset);
      if (isNaN(octaveOffset)) throw new RangeError("Invalid 'octaveOffset' value");
      if (typeof identifier !== "string") identifier = "";

      const fragments = this.getNoteDetails(identifier);
      if (!fragments) throw new TypeError("Invalid note identifier");

      const notes = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
      let result = (fragments.octave + 1 + octaveOffset) * 12;
      result += notes[fragments.name];

      if (fragments.accidental) {
        if (fragments.accidental.startsWith("b")) {
          result -= fragments.accidental.length;
        } else {
          result += fragments.accidental.length;
        }
      }

      if (result < 0 || result > 127) throw new RangeError("Invalid octaveOffset value");

      return result;

    }

    /**
     * Given a proper note identifier (`C#4`, `Gb-1`, etc.) or a valid MIDI note number (0-127), this
     * method returns an object containing broken down details about the specified note (uppercase
     * letter, accidental and octave).
     *
     * When a number is specified, the translation to note is done using a value of 60 for middle C
     * (C4 = middle C).
     *
     * @param value {string|number} A note identifier A  atring ("C#4", "Gb-1", etc.) or a MIDI note
     * number (0-127).
     *
     * @returns {{accidental: string, identifier: string, name: string, octave: number }}
     *
     * @throws TypeError Invalid note identifier
     *
     * @since 3.0.0
     * @static
     */
    static getNoteDetails(value) {

      if (Number.isInteger(value)) value = this.toNoteIdentifier(value);

      const matches = value.match(/^([CDEFGAB])(#{0,2}|b{0,2})(-?\d+)$/i);
      if (!matches) throw new TypeError("Invalid note identifier");

      const name = matches[1].toUpperCase();
      const octave = parseInt(matches[3]);
      let accidental = matches[2].toLowerCase();
      accidental = accidental === "" ? undefined : accidental;

      const fragments = {
        accidental: accidental,
        identifier: name + (accidental || "") + octave,
        name: name,
        octave: octave
      };

      return fragments;

    }

    /**
     * Returns a sanitized array of valid MIDI channel numbers (1-16). The parameter should be a
     * single integer or an array of integers.
     *
     * For backwards-compatibility, passing `undefined` as a parameter to this method results in all
     * channels being returned (1-16). Otherwise, parameters that cannot successfully be parsed to
     * integers between 1 and 16 are silently ignored.
     *
     * @param [channel] {number|number[]} An integer or an array of integers to parse as channel
     * numbers.
     *
     * @returns {number[]} An array of 0 or more valid MIDI channel numbers.
     *
     * @since 3.0.0
     * @static
     */
    static sanitizeChannels(channel) {

      let channels;

      if (this.validation) {

        if (channel === "all") { // backwards-compatibility
          channels = ["all"];
        } else if (channel === "none") { // backwards-compatibility
          return [];
        }

      }

      if (!Array.isArray(channel)) {
        channels = [channel];
      } else {
        channels = channel;
      }

      // In order to preserve backwards-compatibility, we let this assignment as it is.
      if (channels.indexOf("all") > -1) {
        channels = Enumerations.MIDI_CHANNEL_NUMBERS;
      }

      return channels
        .map(function(ch) {
          return parseInt(ch);
        })
        .filter(function(ch) {
          return (ch >= 1 && ch <= 16);
        });

    }

    /**
     * Returns a valid timestamp, relative to the navigation start of the document, derived from the
     * `time` parameter. If the parameter is a string starting with the "+" sign and followed by a
     * number, the resulting timestamp will be the sum of the current timestamp plus that number. If
     * the parameter is a positive number, it will be returned as is. Otherwise, false will be
     * returned.
     *
     * @param [time] {number|string} The time string (e.g. `"+2000"`) or number to parse
     * @return {number|false} A positive number or `false` (if the time cannot be converted)
     *
     * @since 3.0.0
     * @static
     */
    static toTimestamp(time) {

      let value = false;

      const parsed = parseFloat(time);
      if (isNaN(parsed)) return false;

      if (typeof time === "string" && time.substring(0, 1) === "+") {
        if (parsed >= 0) value = wm.time + parsed;
      } else {
        if (parsed >= 0) value = parsed;
      }

      return value;

    }

    /**
     * Returns a valid MIDI note number (0-127) given the specified input. The input usually is a
     * string containing a note identifier (`"C3"`, `"F#4"`, `"D-2"`, `"G8"`, etc.). If an integer
     * between 0 and 127 is passed, it will simply be returned as is (for convenience). Other strings
     * will be parsed for integer value, if possible.
     *
     * If the input is an identifier, the resulting note number is offset by the `octaveOffset`
     * parameter. For example, if you pass in "C4" (note number 60) and the `octaveOffset` value is
     * -2, the resulting MIDI note number will be 36.
     *
     * @param input {string|number} A string or number to extract the MIDI note number from.
     * @param octaveOffset {number} An integer to offset the octave by
     *
     * @returns {number|false} A valid MIDI note number (0-127) or `false` if the input could not
     * successfully be parsed to a note number.
     *
     * @since 3.0.0
     * @static
     */
    static guessNoteNumber(input, octaveOffset) {

      // Validate and, if necessary, assign default
      octaveOffset = parseInt(octaveOffset) || 0;

      let output = false;

      // Check input type
      if (Number.isInteger(input) && input >= 0 && input <= 127) {        // uint
        output = parseInt(input);
      } else if (parseInt(input) >= 0 && parseInt(input) <= 127) {        // float or uint as string
        output = parseInt(input);
      } else if (typeof input === "string" || input instanceof String) {  // string
        try {
          output = this.toNoteNumber(input.trim(), octaveOffset);
        } catch (e) {
          return false;
        }
      }

      return output;

    }

    /**
     * Returns an identifier string representing a note name (with optional accidental) followed by an
     * octave number. The octave can be offset by using the `octaveOffset` parameter.
     *
     * @param {number} number The MIDI note number to convert to a note identifier
     * @param {number} octaveOffset An offset to apply to the resulting octave
     *
     * @returns {string}
     *
     * @throws RangeError Invalid note number
     * @throws RangeError Invalid octaveOffset value
     *
     * @since 3.0.0
     * @static
     */
    static toNoteIdentifier(number, octaveOffset) {

      number = parseInt(number);
      if (isNaN(number) || number < 0 || number > 127) throw new RangeError("Invalid note number");

      octaveOffset = octaveOffset == undefined ? 0 : parseInt(octaveOffset);
      if (isNaN(octaveOffset)) throw new RangeError("Invalid octaveOffset value");

      const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      const octave = Math.floor(number / 12 - 1) + octaveOffset;
      return notes[number % 12] + octave.toString();

    }

    /**
     * Converts the `input` parameter to a valid [`Note`]{@link Note} object. The input usually is an
     * unsigned integer (0-127) or a note identifier (`"C4"`, `"G#5"`, etc.). If the input is a
     * [`Note`]{@link Note} object, it will be returned as is.
     *
     * If the input is a note number or identifier, it is possible to specify options by providing the
     * `options` parameter.
     *
     * @param [input] {number|string|Note}
     *
     * @param {object} [options={}]
     *
     * @param {number} [options.duration=Infinity] The number of milliseconds before the note should
     * be explicitly stopped.
     *
     * @param {number} [options.attack=0.5] The note's attack velocity as a float between 0 and 1. If
     * you wish to use an integer between 0 and 127, use the `rawAttack` option instead. If both
     * `attack` and `rawAttack` are specified, the latter has precedence.
     *
     * @param {number} [options.release=0.5] The note's release velocity as a float between 0 and 1. If
     * you wish to use an integer between 0 and 127, use the `rawRelease` option instead. If both
     * `release` and `rawRelease` are specified, the latter has precedence.
     *
     * @param {number} [options.rawAttack=64] The note's attack velocity as an integer between 0 and
     * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
     * `attack` and `rawAttack` are specified, the latter has precedence.
     *
     * @param {number} [options.rawRelease=64] The note's release velocity as an integer between 0 and
     * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
     * `release` and `rawRelease` are specified, the latter has precedence.
     *
     * @param {number} [options.octaveOffset=0] An integer to offset the octave by. **This is only
     * used when the input value is a note identifier.**
     *
     * @returns {Note}
     *
     * @throws TypeError The input could not be parsed to a note
     *
     * @since version 3.0.0
     * @static
     */
    static buildNote(input, options= {}) {

      options.octaveOffset = parseInt(options.octaveOffset) || 0;

      // If it's already a Note, we're done
      if (input instanceof Note) return input;

      let number = this.guessNoteNumber(input, options.octaveOffset);

      if (number === false) { // We use a comparison b/c the note can be 0 (which equates to false)
        throw new TypeError(`The input could not be parsed as a note (${input})`);
      }

      // If we got here, we have a proper note number. Before creating the new note, we strip out
      // 'octaveOffset' because it has already been factored in when calling guessNoteNumber().
      options.octaveOffset = undefined;
      return new Note(number, options);

    }

    /**
     * Converts an input value, which can be an unsigned integer (0-127), a note identifier, a
     * [`Note`]{@link Note}  object or an array of the previous types, to an array of
     * [`Note`]{@link Note}  objects.
     *
     * [`Note`]{@link Note}  objects are returned as is. For note numbers and identifiers, a
     * [`Note`]{@link Note} object is created with the options specified. An error will be thrown when
     * encountering invalid input.
     *
     * Note: if both the `attack` and `rawAttack` options are specified, the later has priority. The
     * same goes for `release` and `rawRelease`.
     *
     * @param [notes] {number|string|Note|number[]|string[]|Note[]}
     *
     * @param {object} [options={}]
     *
     * @param {number} [options.duration=Infinity] The number of milliseconds before the note should
     * be explicitly stopped.
     *
     * @param {number} [options.attack=0.5] The note's attack velocity as a float between 0 and 1. If
     * you wish to use an integer between 0 and 127, use the `rawAttack` option instead. If both
     * `attack` and `rawAttack` are specified, the latter has precedence.
     *
     * @param {number} [options.release=0.5] The note's release velocity as a float between 0 and 1. If
     * you wish to use an integer between 0 and 127, use the `rawRelease` option instead. If both
     * `release` and `rawRelease` are specified, the latter has precedence.
     *
     * @param {number} [options.rawAttack=64] The note's attack velocity as an integer between 0 and
     * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
     * `attack` and `rawAttack` are specified, the latter has precedence.
     *
     * @param {number} [options.rawRelease=64] The note's release velocity as an integer between 0 and
     * 127. If you wish to use a float between 0 and 1, use the `release` option instead. If both
     * `release` and `rawRelease` are specified, the latter has precedence.
     *
     * @param {number} [options.octaveOffset=0] An integer to offset the octave by. **This is only
     * used when the input value is a note identifier.**
     *
     * @returns {Note[]}
     *
     * @throws TypeError An element could not be parsed as a note.
     *
     * @since 3.0.0
     * @static
     */
    static buildNoteArray(notes, options = {}) {

      let result = [];
      if (!Array.isArray(notes)) notes = [notes];

      notes.forEach(note => {
        result.push(this.buildNote(note, options));
      });

      return result;

    }

    /**
     * Returns a number between 0 and 1 representing the ratio of the input value divided by 127 (7
     * bit). The returned value is restricted between 0 and 1 even if the input is greater than 127 or
     * smaller than 0.
     *
     * Passing `Infinity` will return `1` and passing `-Infinity` will return `0`. Otherwise, when the
     * input value cannot be converted to an integer, the method returns 0.
     *
     * @param value {number} A positive integer between 0 and 127 (inclusive)
     * @returns {number} A number between 0 and 1 (inclusive)
     * @static
     */
    static from7bitToFloat(value) {
      if (value === Infinity) value = 127;
      value = parseInt(value) || 0;
      return Math.min(Math.max(value / 127, 0), 1);
    }

    /**
     * Returns an integer between 0 and 127 which is the result of multiplying the input value by
     * 127. The input value should be a number between 0 and 1 (inclusively). The returned value is
     * restricted between 0 and 127 even if the input is greater than 1 or smaller than 0.
     *
     * Passing `Infinity` will return `127` and passing `-Infinity` will return `0`. Otherwise, when
     * the input value cannot be converted to a number, the method returns 0.
     *
     * @param value {number} A positive float between 0 and 1 (inclusive)
     * @returns {number} A number between 0 and 127 (inclusive)
     * @static
     */
    static fromFloatTo7Bit(value) {
      if (value === Infinity) value = 1;
      value = parseFloat(value) || 0;
      return Math.min(Math.max(Math.round(value * 127), 0), 127);
    }

    /**
     * Combines and converts MSB and LSB values (0-127) to a float between 0 and 1. The returned value
     * is within between 0 and 1 even if the result is greater than 1 or smaller than 0.
     *
     * @param msb {number} The most significant byte as a integer between 0 and 127.
     * @param [lsb=0] {number} The least significant byte as a integer between 0 and 127.
     * @returns {number} A float between 0 and 1.
     */
    static fromMsbLsbToFloat(msb, lsb = 0) {

      if (wm.validation) {
        msb = Math.min(Math.max(parseInt(msb) || 0, 0), 127);
        lsb = Math.min(Math.max(parseInt(lsb) || 0, 0), 127);
      }

      const value = ((msb << 7) + lsb) / 16383;
      return Math.min(Math.max(value, 0), 1);

    }

    /**
     * Extracts 7bit MSB and LSB values from the supplied float.
     *
     * @param value {number} A float between 0 and 1
     * @returns {{lsb: number, msb: number}}
     */
    static fromFloatToMsbLsb(value) {

      if (wm.validation) {
        value = Math.min(Math.max(parseFloat(value) || 0, 0), 1);
      }

      const multiplied = Math.round(value * 16383);

      return {
        msb: multiplied >> 7,
        lsb: multiplied & 0x7F
      };

    }

    /**
     * Returns the supplied MIDI note number offset by the requested octave and semitone values. If
     * the calculated value is less than 0, 0 will be returned. If the calculated value is more than
     * 127, 127 will be returned. If an invalid offset value is supplied, 0 will be used.
     *
     * @param number {number} The MIDI note to offset as an integer between 0 and 127.
     * @param octaveOffset {number} An integer to offset the note by (in octave)
     * @param octaveOffset {number} An integer to offset the note by (in semitones)
     * @returns {number} An integer between 0 and 127
     *
     * @throws {Error} Invalid note number
     * @static
     */
    static offsetNumber(number, octaveOffset = 0, semitoneOffset = 0) {

      if (wm.validation) {
        number = parseInt(number);
        if (isNaN(number)) throw new Error("Invalid note number");
        octaveOffset = parseInt(octaveOffset) || 0;
        semitoneOffset = parseInt(semitoneOffset) || 0;
      }

      return Math.min(Math.max(number + (octaveOffset * 12) + semitoneOffset, 0), 127);

    }

    /**
     * Returns the name of the first property of the supplied object whose value is equal to the one
     * supplied. If nothing is found, `undefined` is returned.
     *
     * @param object {object} The object to look for the property in.
     * @param value {*} Any value that can be expected to be found in the object's properties.
     * @returns {string|undefined} The name of the matching property or `undefined` if nothing is
     * found.
     * @static
     */
    static getPropertyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }

    /**
     * Returns the name of a control change message matching the specified number (0-127). Some valid
     * control change numbers do not have a specific name or purpose assigned in the MIDI
     * [spec](https://midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2).
     * In these cases, the method returns `controllerXXX` (where XXX is the number).
     *
     * @param {number} number An integer (0-127) representing the control change message
     * @returns {string|undefined} The matching control change name or `undefined` if no match was
     * found.
     *
     * @static
     */
    static getCcNameByNumber(number) {
      return Utilities.getPropertyByValue(Enumerations.MIDI_CONTROL_CHANGE_MESSAGES, number);
    }

    /**
     * Returns the channel mode name matching the specified number. If no match is found, the function
     * returns `false`.
     *
     * @param {number} number An integer representing the channel mode message (120-127)
     * @returns {string|false} The name of the matching channel mode or `false` if no match could be
     * found.
     *
     * @since 2.0.0
     */
    static getChannelModeByNumber(number) {

      if ( !(number >= 120 && number <= 127) ) return false;

      for (let cm in Enumerations.MIDI_CHANNEL_MODE_MESSAGES) {

        if (
          Enumerations.MIDI_CHANNEL_MODE_MESSAGES.hasOwnProperty(cm) &&
          number === Enumerations.MIDI_CHANNEL_MODE_MESSAGES[cm]
        ) {
          return cm;
        }

      }

      return false;

    }

    /**
     * Indicates whether the execution environment is Node.js (`true`) or not (`false`)
     * @type {boolean}
     */
    static get isNode() {
      return new Function("try { return this === global; } catch(e) { return false; }")();
    }

    /**
     * Indicates whether the execution environment is a browser (`true`) or not (`false`)
     * @type {boolean}
     */
    static get isBrowser() {
      return new Function("try { return this === window; } catch(e) { return false; }")();
    }

  }

  /**
   * The `OutputChannel` class represents a single output MIDI channel. `OutputChannel` objects are
   * provided by an [`Output`](Output) port which, itself, is made available by a device. The
   * `OutputChannel` object is derived from the host's MIDI subsystem and should not be instantiated
   * directly.
   *
   * All 16 `OutputChannel` objects can be found inside the parent output's
   * [`channels`]{@link Output#channels} property.
   *
   * @param {Output} output The [`Output`](Output) this channel belongs to.
   * @param {number} number The MIDI channel number (`1` - `16`).
   *
   * @extends EventEmitter
   * @license Apache-2.0
   * @since 3.0.0
   */
  class OutputChannel extends EventEmitter {

    /**
     * Creates an `OutputChannel` object.
     *
     * @param {Output} output The [`Output`](Output) this channel belongs to.
     * @param {number} number The MIDI channel number (`1` - `16`).
     */
    constructor(output, number) {

      super();

      /**
       * @type {Output}
       * @private
       */
      this._output = output;

      /**
       * @type {number}
       * @private
       */
      this._number = number;

      /**
       * @type {number}
       * @private
       */
      this._octaveOffset = 0;

    }

    /**
     * Unlinks the MIDI subsystem, removes all listeners attached to the channel and nulls the channel
     * number. This method is mostly for internal use. It has not been prefixed with an underscore
     * since it is called by other objects such as the `Output` object.
     *
     * @private
     */
    destroy() {
      this._output = null;
      this._number = null;
      this._octaveOffset = 0;
      this.removeListener();
    }

    /**
     * Sends a MIDI message on the MIDI output port. If no time is specified, the message will be
     * sent immediately. The message should be an array of 8-bit unsigned integers (`0` - `225`),
     * a
     * [`Uint8Array`]{@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array}
     * object or a [`Message`](Message) object.
     *
     * It is usually not necessary to use this method directly as you can use one of the simpler
     * helper methods such as [`playNote()`](#playNote), [`stopNote()`](#stopNote),
     * [`sendControlChange()`](#sendControlChange), etc.
     *
     * Details on the format of MIDI messages are available in the summary of
     * [MIDI messages]{@link https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message}
     * from the MIDI Manufacturers Association.
     *
     * @param message {number[]|Uint8Array|Message} A `Message` object, an array of 8-bit unsigned
     * integers or a `Uint8Array` object (not available in Node.js) containing the message bytes.
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The first byte (status) must be an integer between 128 and 255.
     *
     * @throws {RangeError} Data bytes must be integers between 0 and 255.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    send(message, options = {time: 0}) {
      this.output.send(message, options);
      return this;
    }

    /**
     * Sends a MIDI **key aftertouch** message at the scheduled time. This is a key-specific
     * aftertouch. For a channel-wide aftertouch message, use
     * [`sendChannelAftertouch()`]{@link #sendChannelAftertouch}.
     *
     * @param target {number|Note|string|number[]|Note[]|string[]} The note(s) for which you are sending
     * an aftertouch value. The notes can be specified by using a MIDI note number (`0` - `127`), a
     * [`Note`](Note) object, a note identifier (e.g. `C3`, `G#4`, `F-1`, `Db7`) or an array of the
     * previous types. When using a note identifier, octave range must be between `-1` and `9`. The
     * lowest note is `C-1` (MIDI note number `0`) and the highest note is `G9` (MIDI note number
     * `127`).
     *
     * When using a note identifier, the octave value will be offset by the local
     * [`octaveOffset`](#octaveOffset) and by
     * [`Output.octaveOffset`](Output#octaveOffset) and [`WebMidi.octaveOffset`](WebMidi#octaveOffset)
     * (if those values are not `0`). When using a key number, `octaveOffset` values are ignored.
     *
     * @param [pressure=0.5] {number} The pressure level (between `0` and `1`). An invalid pressure
     * value will silently trigger the default behaviour. If the `rawValue` option is set to `true`,
     * the pressure is defined by using an integer between `0` and `127`.
     *
     * @param {object} [options={}]
     *
     * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
     * considered a float between `0` and `1.0` (default) or a raw integer between `0` and `127`.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @return {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     *
     * @throws RangeError Invalid key aftertouch value.
     */
    sendKeyAftertouch(target, pressure, options = {}) {

      if (wm.validation) {

        // Legacy support
        if (options.useRawValue) options.rawValue = options.useRawValue;

        if (isNaN(parseFloat(pressure))) {
          throw new RangeError("Invalid key aftertouch value.");
        }
        if (options.rawValue) {
          if (!(pressure >= 0 && pressure <= 127 && Number.isInteger(pressure))) {
            throw new RangeError("Key aftertouch raw value must be an integer between 0 and 127.");
          }
        } else {
          if (!(pressure >= 0 && pressure <= 1)) {
            throw new RangeError("Key aftertouch value must be a float between 0 and 1.");
          }
        }

      }

      // Normalize pressure to integer
      if (!options.rawValue) pressure = Utilities.fromFloatTo7Bit(pressure);

      // Plot total offset
      const offset = wm.octaveOffset + this.output.octaveOffset + this.octaveOffset;

      // Make sure we are dealing with an array
      if (!Array.isArray(target)) target = [target];

      Utilities.buildNoteArray(target).forEach(n => {
        this.send(
          [
            (Enumerations.MIDI_CHANNEL_MESSAGES.keyaftertouch << 4) + (this.number - 1),
            n.getOffsetNumber(offset),
            pressure
          ],
          {time: Utilities.toTimestamp(options.time)}
        );
      });

      return this;

    }

    /**
     * Sends a MIDI **control change** message to the channel at the scheduled time. The control
     * change message to send can be specified numerically (`0` to `127`) or by using one of the
     * following common names:
     *
     * | Number | Name                          |
     * |--------|-------------------------------|
     * | 0      |`bankselectcoarse`             |
     * | 1      |`modulationwheelcoarse`        |
     * | 2      |`breathcontrollercoarse`       |
     * | 4      |`footcontrollercoarse`         |
     * | 5      |`portamentotimecoarse`         |
     * | 6      |`dataentrycoarse`              |
     * | 7      |`volumecoarse`                 |
     * | 8      |`balancecoarse`                |
     * | 10     |`pancoarse`                    |
     * | 11     |`expressioncoarse`             |
     * | 12     |`effectcontrol1coarse`         |
     * | 13     |`effectcontrol2coarse`         |
     * | 18     |`generalpurposeslider3`        |
     * | 19     |`generalpurposeslider4`        |
     * | 32     |`bankselectfine`               |
     * | 33     |`modulationwheelfine`          |
     * | 34     |`breathcontrollerfine`         |
     * | 36     |`footcontrollerfine`           |
     * | 37     |`portamentotimefine`           |
     * | 38     |`dataentryfine`                |
     * | 39     |`volumefine`                   |
     * | 40     |`balancefine`                  |
     * | 42     |`panfine`                      |
     * | 43     |`expressionfine`               |
     * | 44     |`effectcontrol1fine`           |
     * | 45     |`effectcontrol2fine`           |
     * | 64     |`holdpedal`                    |
     * | 65     |`portamento`                   |
     * | 66     |`sustenutopedal`               |
     * | 67     |`softpedal`                    |
     * | 68     |`legatopedal`                  |
     * | 69     |`hold2pedal`                   |
     * | 70     |`soundvariation`               |
     * | 71     |`resonance`                    |
     * | 72     |`soundreleasetime`             |
     * | 73     |`soundattacktime`              |
     * | 74     |`brightness`                   |
     * | 75     |`soundcontrol6`                |
     * | 76     |`soundcontrol7`                |
     * | 77     |`soundcontrol8`                |
     * | 78     |`soundcontrol9`                |
     * | 79     |`soundcontrol10`               |
     * | 80     |`generalpurposebutton1`        |
     * | 81     |`generalpurposebutton2`        |
     * | 82     |`generalpurposebutton3`        |
     * | 83     |`generalpurposebutton4`        |
     * | 91     |`reverblevel`                  |
     * | 92     |`tremololevel`                 |
     * | 93     |`choruslevel`                  |
     * | 94     |`celestelevel`                 |
     * | 95     |`phaserlevel`                  |
     * | 96     |`databuttonincrement`          |
     * | 97     |`databuttondecrement`          |
     * | 98     |`nonregisteredparametercoarse` |
     * | 99     |`nonregisteredparameterfine`   |
     * | 100    |`registeredparametercoarse`    |
     * | 101    |`registeredparameterfine`      |
     * | 120    |`allsoundoff`                  |
     * | 121    |`resetallcontrollers`          |
     * | 122    |`localcontrol`                 |
     * | 123    |`allnotesoff`                  |
     * | 124    |`omnimodeoff`                  |
     * | 125    |`omnimodeon`                   |
     * | 126    |`monomodeon`                   |
     * | 127    |`polymodeon`                   |
     *
     * As you can see above, not all control change message have a matching name. This does not mean
     * you cannot use the others. It simply means you will need to use their number
     * (`0` to `127`) instead of their name. While you can still use them, numbers `120` to `127` are
     * usually reserved for *channel mode* messages. See
     * [`sendChannelMode()`]{@link OutputChannel#sendChannelMode} method for more info.
     *
     * To view a detailed list of all available **control change** messages, please consult "Table 3 -
     * Control Change Messages" from the [MIDI Messages](
     * https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2)
     * specification.
     *
     * **Note**: messages #0-31 (MSB) are paired with messages #32-63 (LSB). For example, message #1
     * (`modulationwheelcoarse`) can be accompanied by a second control change message for
     * `modulationwheelfine` to achieve a greater level of precision. if you want to specify both MSB
     * and LSB for messages between `0` and `31`, you can do so by passing a 2-value array as the
     * second parameter.
     *
     * @param {number|string} controller The MIDI controller name or number (`0` - `127`).
     *
     * @param {number|number[]} value The value to send (0-127). You can also use a two-position array
     * for controllers 0 to 31. In this scenario, the first value will be sent as usual and the second
     * value will be sent to the matching LSB controller (which is obtained by adding 32 to the first
     * controller)
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} Controller numbers must be between 0 and 127.
     * @throws {RangeError} Invalid controller name.
     * @throws {TypeError} The value array must have a length of 2.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     *
     * @license Apache-2.0
     * @since 3.0.0
     */
    sendControlChange(controller, value, options = {}) {

      if (typeof controller === "string") {
        controller = Enumerations.MIDI_CONTROL_CHANGE_MESSAGES[controller];
      }

      if (!Array.isArray(value)) value = [value];

      if (wm.validation) {

        if (controller === undefined) {
          throw new TypeError(
            "Control change must be identified with a valid name or an integer between 0 and 127."
          );
        }

        if (!Number.isInteger(controller) || !(controller >= 0 && controller <= 127)) {
          throw new TypeError("Control change number must be an integer between 0 and 127.");
        }

        value = value.map(item => {
          const output = Math.min(Math.max(parseInt(item), 0), 127);
          if (isNaN(output)) throw new TypeError("Values must be integers between 0 and 127");
          return output;
        });

        if (value.length === 2 && controller >= 32) {
          throw new TypeError("To use a value array, the controller must be between 0 and 31");
        }

      }

      value.forEach((item, index) => {

        this.send(
          [
            (Enumerations.MIDI_CHANNEL_MESSAGES.controlchange << 4) + (this.number - 1),
            controller + (index * 32),
            value[index]
          ],
          {time: Utilities.toTimestamp(options.time)}
        );

      });

      return this;

    }

    /**
     * Selects a MIDI non-registered parameter so it is affected by upcoming data entry, data
     * increment and data decrement messages.
     *
     * @param parameter {number[]} A two-position array specifying the two control bytes that identify
     * the registered parameter. The NRPN MSB (99 or 0x63) is a position 0. The NRPN LSB (98 or 0x62)
     * is at position 1.
     *
     * @private
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    _selectNonRegisteredParameter(parameter, options = {}) {

      // parameter[0] = Math.floor(parameter[0]);
      // if (!(parameter[0] >= 0 && parameter[0] <= 127)) {
      //   throw new RangeError("The control63 value must be between 0 and 127.");
      // }
      //
      // parameter[1] = Math.floor(parameter[1]);
      // if (!(parameter[1] >= 0 && parameter[1] <= 127)) {
      //   throw new RangeError("The control62 value must be between 0 and 127.");
      // }

      this.sendControlChange(0x63, parameter[0], options);
      this.sendControlChange(0x62, parameter[1], options);

      return this;

    }

    /**
     * Deselects the currently active MIDI registered parameter so it is no longer affected by data
     * entry, data increment and data decrement messages.
     *
     * Current best practice recommends doing that after each call to
     * [_setCurrentParameter()]{@link #_setCurrentParameter}.
     *
     * @private
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    _deselectRegisteredParameter(options = {}) {
      this.sendControlChange(0x65, 0x7F, options);
      this.sendControlChange(0x64, 0x7F, options);
      return this;
    }

    /**
     * Deselects the currently active MIDI non-registered parameter so it is no longer affected by
     * data entry, data increment and data decrement messages.
     *
     * @private
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    _deselectNonRegisteredParameter(options = {}) {
      this.sendControlChange(0x65, 0x7F, options);
      this.sendControlChange(0x64, 0x7F, options);
      return this;
    }

    /**
     * Selects a MIDI registered parameter so it is affected by upcoming data entry, data increment
     * and data decrement messages.
     *
     * @private
     *
     * @param parameter {number[]} A two-position array of integers specifying the two control bytes
     * (0x65, 0x64) that identify the registered parameter. The integers must be between 0 and 127.
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    _selectRegisteredParameter(parameter, options = {}) {
      this.sendControlChange(0x65, parameter[0], options);
      this.sendControlChange(0x64, parameter[1], options);
      return this;
    }

    /**
     * Sets the value of the currently selected MIDI registered parameter.
     *
     * @private
     *
     * @param data {number|number[]}
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time] If `time` is a string prefixed with `"+"` and followed by
     * a number, the message will be delayed by that many milliseconds. If the value is a number, the
     * operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    _setCurrentParameter(data, options = {}) {

      data = [].concat(data);

      // MSB
      // data[0] = parseInt(data[0]);
      // if (!isNaN(data[0]) && data[0] >= 0 && data[0] <= 127) {
      this.sendControlChange(0x06, data[0], options);
      // } else {
      //   throw new RangeError("The msb value must be between 0 and 127.");
      // }

      if (data.length < 2) return this;

      // LSB
      // data[1] = parseInt(data[1]);

      // if (!isNaN(data[1]) && data[1] >= 0 && data[1] <= 127) {
      this.sendControlChange(0x26, data[1], options);
      // } else {
      //   throw new RangeError("The lsb value must be between 0 and 127.");
      // }

      return this;

    }

    /**
     * Decrements the specified MIDI registered parameter by 1. Here is the full list of parameter
     * names that can be used with this function:
     *
     *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
     *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
     *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
     *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
     *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
     *  * Modulation Range (0x00, 0x05): `"modulationrange"`
     *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
     *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
     *  * Gain (0x3D, 0x02): `"gain"`
     *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
     *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
     *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
     *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
     *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
     *  * Roll Angle (0x3D, 0x08): `"rollangle"`
     *
     * @param parameter {String|number[]} A string identifying the parameter's name (see above) or a
     * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
     * parameter.
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws TypeError The specified registered parameter is invalid.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendRpnDecrement(parameter, options = {}) {

      if (!Array.isArray(parameter)) parameter = Enumerations.MIDI_REGISTERED_PARAMETERS[parameter];

      if (wm.validation) {

        if (parameter === undefined) {
          throw new TypeError("The specified registered parameter is invalid.");
        }

        let valid = false;

        Object.getOwnPropertyNames(Enumerations.MIDI_REGISTERED_PARAMETERS).forEach(p => {
          if (
            Enumerations.MIDI_REGISTERED_PARAMETERS[p][0] === parameter[0] &&
            Enumerations.MIDI_REGISTERED_PARAMETERS[p][1] === parameter[1]
          ) {
            valid = true;
          }
        });

        if (!valid) throw new TypeError("The specified registered parameter is invalid.");

      }

      this._selectRegisteredParameter(parameter, options);
      this.sendControlChange(0x61, 0, options);
      this._deselectRegisteredParameter(options);

      return this;

    }

    /**
     * Increments the specified MIDI registered parameter by 1. Here is the full list of parameter
     * names that can be used with this function:
     *
     *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
     *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
     *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
     *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
     *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
     *  * Modulation Range (0x00, 0x05): `"modulationrange"`
     *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
     *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
     *  * Gain (0x3D, 0x02): `"gain"`
     *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
     *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
     *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
     *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
     *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
     *  * Roll Angle (0x3D, 0x08): `"rollangle"`
     *
     * @param parameter {String|number[]} A string identifying the parameter's name (see above) or a
     * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
     * parameter.
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws TypeError The specified registered parameter is invalid.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendRpnIncrement(parameter, options = {}) {

      if (!Array.isArray(parameter)) parameter = Enumerations.MIDI_REGISTERED_PARAMETERS[parameter];

      if (wm.validation) {

        if (parameter === undefined) {
          throw new TypeError("The specified registered parameter is invalid.");
        }

        let valid = false;

        Object.getOwnPropertyNames(Enumerations.MIDI_REGISTERED_PARAMETERS).forEach(p => {
          if (
            Enumerations.MIDI_REGISTERED_PARAMETERS[p][0] === parameter[0] &&
            Enumerations.MIDI_REGISTERED_PARAMETERS[p][1] === parameter[1]
          ) {
            valid = true;
          }
        });

        if (!valid) throw new TypeError("The specified registered parameter is invalid.");

      }

      this._selectRegisteredParameter(parameter, options);
      this.sendControlChange(0x60, 0, options);
      this._deselectRegisteredParameter(options);

      return this;

    }

    /**
     * Plays a note or an array of notes on the channel. The first parameter is the note to play. It
     * can be a single value or an array of the following valid values:
     *
     *  - A [`Note`]{@link Note} object
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *
     * The `playNote()` method sends a **note on** MIDI message for all specified notes. If a
     * `duration` is set in the `options` parameter or in the [`Note`]{@link Note} object's
     * [`duration`]{@link Note#duration} property, it will also schedule a **note off** message
     * to end the note after said duration. If no `duration` is set, the note will simply play until
     * a matching **note off** message is sent with [`stopNote()`]{@link OutputChannel#stopNote} or
     * [`sendNoteOff()`]{@link OutputChannel#sendNoteOff}.
     *
     *  The execution of the **note on** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * When using [`Note`]{@link Note} objects, the durations and velocities defined in the
     * [`Note`]{@link Note} objects have precedence over the ones specified via the method's `options`
     * parameter.
     *
     * **Note**: per the MIDI standard, a **note on** message with an attack velocity of `0` is
     * functionally equivalent to a **note off** message.
     *
     * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
     * specified by using a MIDI note number (`0` - `127`), a note identifier (e.g. `C3`, `G#4`,
     * `F-1`, `Db7`), a [`Note`]{@link Note} object or an array of the previous types. When using a
     * note identifier, the octave range must be between `-1` and `9`. The lowest note is `C-1` (MIDI
     * note number `0`) and the highest note is `G9` (MIDI note number `127`).
     *
     * @param {object} [options={}]
     *
     * @param {number} [options.duration] A positive decimal number larger than `0` representing the
     * number of milliseconds to wait before sending a **note off** message. If invalid or left
     * undefined, only a **note on** message will be sent.
     *
     * @param {number} [options.attack=0.5] The velocity at which to play the note (between `0` and
     * `1`). If the `rawAttack` option is also defined, it will have priority. An invalid velocity
     * value will silently trigger the default of `0.5`.
     *
     * @param {number} [options.rawAttack=64] The attack velocity at which to play the note (between
     * `0` and `127`). This has priority over the `attack` property. An invalid velocity value will
     * silently trigger the default of 64.
     *
     * @param {number} [options.release=0.5] The velocity at which to release the note (between `0`
     * and `1`). If the `rawRelease` option is also defined, it will have priority. An invalid
     * velocity value will silently trigger the default of `0.5`. This is only used with the
     * **note off** event triggered when `options.duration` is set.
     *
     * @param {number} [options.rawRelease=64] The velocity at which to release the note (between `0`
     * and `127`). This has priority over the `release` property. An invalid velocity value will
     * silently trigger the default of 64. This is only used with the **note off** event triggered
     * when `options.duration` is set.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    playNote(note, options = {}) {

      // Send note on and, optionally, note off message (if duration is a positive number)
      this.sendNoteOn(note, options);

      // https://stackoverflow.com/questions/600763#answer-601877
      if (options.duration > 0 && isFinite(String(options.duration).trim() || NaN)) {

        let noteOffOptions = {
          time: (Utilities.toTimestamp(options.time) || wm.time) + options.duration,
          release: options.release,
          rawRelease: options.rawRelease,
        };

        this.sendNoteOff(note, noteOffOptions);

      }

      return this;

    }

    /**
     * Sends a **note off** message for the specified notes on the channel. The first parameter is the
     * note. It can be a single value or an array of the following valid values:
     *
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note name, followed by the octave (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *  - A [`Note`]{@link Note} object
     *
     * The execution of the **note off** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * When using [`Note`]{@link Note} objects, the release velocity defined in the
     * [`Note`]{@link Note} objects has precedence over the one specified via the method's `options`
     * parameter.
     *
     * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to stop. The notes can be
     * specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), a
     * [`Note`]{@link Note} object or an array of the previous types. When using a note name, octave
     * range must be between -1 and 9. The lowest note is C-1 (MIDI note number 0) and the highest
     * note is G9 (MIDI note number 127).
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @param {number} [options.release=0.5] The velocity at which to release the note
     * (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have
     * priority. An invalid velocity value will silently trigger the default of `0.5`.
     *
     * @param {number} [options.rawRelease=64] The velocity at which to release the note
     * (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have
     * priority. An invalid velocity value will silently trigger the default of `64`.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendNoteOff(note, options = {}) {

      if (wm.validation) {

        if (
          options.rawRelease != undefined &&
          !(options.rawRelease >= 0 && options.rawRelease <= 127)
        ) {
          throw new RangeError("The 'rawRelease' option must be an integer between 0 and 127");
        }

        if (options.release != undefined && !(options.release >= 0 && options.release <= 1)) {
          throw new RangeError("The 'release' option must be an number between 0 and 1");
        }

        // Legacy compatibility warnings
        if (options.rawVelocity) {
          options.rawRelease = options.velocity;
          console.warn("The 'rawVelocity' option is deprecated. Use 'rawRelease' instead.");
        }
        if (options.velocity) {
          options.release = options.velocity;
          console.warn("The 'velocity' option is deprecated. Use 'attack' instead.");
        }

      }

      let nVelocity = 64;

      if (options.rawRelease != undefined) {
        nVelocity = options.rawRelease;
      } else {
        if (!isNaN(options.release)) nVelocity = Math.round(options.release * 127);
      }

      // Plot total octave offset
      const offset = wm.octaveOffset + this.output.octaveOffset + this.octaveOffset;

      Utilities.buildNoteArray(note, {rawRelease: parseInt(nVelocity)}).forEach(n => {
        this.send(
          [
            (Enumerations.MIDI_CHANNEL_MESSAGES.noteoff << 4) + (this.number - 1),
            n.getOffsetNumber(offset),
            n.rawRelease,
          ],
          {time: Utilities.toTimestamp(options.time)}
        );
      });

      return this;

    }

    /**
     * Sends a **note off** message for the specified MIDI note number. The first parameter is the
     * note to stop. It can be a single value or an array of the following valid values:
     *
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *  - A [`Note`](Note) object
     *
     * The execution of the **note off** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * @param note {number|Note|string|number[]|Note[]|string[]} The note(s) to stop. The notes can be
     * specified by using a MIDI note number (`0` - `127`), a note identifier (e.g. `C3`, `G#4`, `F-1`,
     * `Db7`) or an array of the previous types. When using a note identifier, octave range must be
     * between `-1` and `9`. The lowest note is `C-1` (MIDI note number `0`) and the highest note is
     * `G9` (MIDI note number `127`).
     *
     * @param {Object} [options={}]
     *
     * @param {number} [options.release=0.5] The velocity at which to release the note
     * (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have
     * priority. An invalid velocity value will silently trigger the default of `0.5`.
     *
     * @param {number} [options.rawRelease=64] The velocity at which to release the note
     * (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have
     * priority. An invalid velocity value will silently trigger the default of `64`.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    stopNote(note, options = {}) {
      return this.sendNoteOff(note, options);
    }

    /**
     * Sends a **note on** message for the specified note(s) on the channel. The first parameter is
     * the note. It can be a single value or an array of the following valid values:
     *
     *  - A [`Note`]{@link Note} object
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *
     *  When passing a [`Note`]{@link Note}object or a note name, the `octaveOffset` will be applied.
     *  This is not the case when using a note number. In this case, we assume you know exactly which
     *  MIDI note number should be sent out.
     *
     * The execution of the **note on** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * When using [`Note`]{@link Note} objects, the attack velocity defined in the
     * [`Note`]{@link Note} objects has precedence over the one specified via the method's `options`
     * parameter. Also, the `duration` is ignored. If you want to also send a **note off** message,
     * use the [`playNote()`]{@link #playNote} method instead.
     *
     * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
     * functionally equivalent to a **note off** message.
     *
     * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
     * specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), a
     * [`Note`]{@link Note} object or an array of the previous types.
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @param {number} [options.attack=0.5] The velocity at which to play the note (between `0` and
     * `1`).  If the `rawAttack` option is also defined, `rawAttack` will have priority. An invalid
     * velocity value will silently trigger the default of `0.5`.
     *
     * @param {number} [options.rawAttack=64] The velocity at which to release the note (between `0`
     * and `127`). If the `attack` option is also defined, `rawAttack` will have priority. An invalid
     * velocity value will silently trigger the default of `64`.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendNoteOn(note, options = {}) {

      if (wm.validation) {

        if (options.rawAttack != undefined && !(options.rawAttack >= 0 && options.rawAttack <= 127)) {
          throw new RangeError("The 'rawAttack' option must be an integer between 0 and 127");
        }

        if (options.attack != undefined && !(options.attack >= 0 && options.attack <= 1)) {
          throw new RangeError("The 'attack' option must be an number between 0 and 1");
        }

        // Legacy compatibility warnings
        if (options.rawVelocity) {
          options.rawAttack = options.velocity;
          options.rawRelease = options.release;
          console.warn("The 'rawVelocity' option is deprecated. Use 'rawAttack' or 'rawRelease'.");
        }
        if (options.velocity) {
          options.attack = options.velocity;
          console.warn("The 'velocity' option is deprecated. Use 'attack' instead.");
        }

      }

      let nVelocity = 64;

      if (options.rawAttack != undefined) {
        nVelocity = options.rawAttack;
      } else {
        if (!isNaN(options.attack)) nVelocity = Math.round(options.attack * 127);
      }

      // Plot total octave offset
      const offset = wm.octaveOffset + this.output.octaveOffset + this.octaveOffset;

      Utilities.buildNoteArray(note, {rawAttack: nVelocity}).forEach(n => {
        this.send(
          [
            (Enumerations.MIDI_CHANNEL_MESSAGES.noteon << 4) + (this.number - 1),
            n.getOffsetNumber(offset),
            n.rawAttack
          ],
          {time: Utilities.toTimestamp(options.time)}
        );
      });

      return this;

    }

    /**
     * Sends a MIDI **channel mode** message. The channel mode message to send can be specified
     * numerically or by using one of the following common names:
     *
     * |  Type                |Number| Shortcut Method                                               |
     * | ---------------------|------|-------------------------------------------------------------- |
     * | `allsoundoff`        | 120  | [`sendAllSoundOff()`]{@link #sendAllSoundOff}                 |
     * | `resetallcontrollers`| 121  | [`sendResetAllControllers()`]{@link #sendResetAllControllers} |
     * | `localcontrol`       | 122  | [`sendLocalControl()`]{@link #sendLocalControl}               |
     * | `allnotesoff`        | 123  | [`sendAllNotesOff()`]{@link #sendAllNotesOff}                 |
     * | `omnimodeoff`        | 124  | [`sendOmniMode(false)`]{@link #sendOmniMode}                  |
     * | `omnimodeon`         | 125  | [`sendOmniMode(true)`]{@link #sendOmniMode}                   |
     * | `monomodeon`         | 126  | [`sendPolyphonicMode("mono")`]{@link #sendPolyphonicMode}     |
     * | `polymodeon`         | 127  | [`sendPolyphonicMode("poly")`]{@link #sendPolyphonicMode}     |
     *
     * **Note**: as you can see above, to make it easier, all channel mode messages also have a matching
     * helper method.
     *
     * It should be noted that, per the MIDI specification, only `localcontrol` and `monomodeon` may
     * require a value that's not zero. For that reason, the `value` parameter is optional and
     * defaults to 0.
     *
     * @param {number|string} command The numerical identifier of the channel mode message (integer
     * between `120` and `127`) or its name as a string.
     *
     * @param {number} [value=0] The value to send (integer between `0` - `127`).
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendChannelMode(command, value = 0, options = {}) {

      // Normalize command to integer
      if (typeof command === "string") command = Enumerations.MIDI_CHANNEL_MODE_MESSAGES[command];

      if (wm.validation) {

        if (command === undefined) {
          throw new TypeError("Invalid channel mode message name or number.");
        }

        if (isNaN(command) || !(command >= 120 && command <= 127)) {
          throw new TypeError("Invalid channel mode message number.");
        }

        if (isNaN(parseInt(value)) || value < 0 || value > 127) {
          throw new RangeError("Value must be an integer between 0 and 127.");
        }

      }

      this.send(
        [
          (Enumerations.MIDI_CHANNEL_MESSAGES.controlchange << 4) + (this.number - 1),
          command,
          value
        ],
        {time: Utilities.toTimestamp(options.time)}
      );

      return this;

    }

    /**
     * Sets OMNI mode to `"on"` or `"off"`. MIDI's OMNI mode causes the instrument to respond to
     * messages from all channels.
     *
     * It should be noted that support for OMNI mode is not as common as it used to be.
     *
     * @param [state=true] {boolean} Whether to activate OMNI mode (`true`) or not (`false`).
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {TypeError} Invalid channel mode message name.
     * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
     * @throws {RangeError} Value must be an integer between 0 and 127.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendOmniMode(state, options = {}) {

      if (state === undefined || state) {
        this.sendChannelMode("omnimodeon", 0, options);
      } else {
        this.sendChannelMode("omnimodeoff", 0, options);
      }

      return this;

    }

    /**
     * Sends a MIDI **channel aftertouch** message. For key-specific aftertouch, you should instead
     * use [`sendKeyAftertouch()`]{@link #sendKeyAftertouch}.
     *
     * @param [pressure] {number} The pressure level (between `0` and `1`). If the `rawValue` option
     * is set to `true`, the pressure can be defined by using an integer between `0` and `127`.
     *
     * @param {object} [options={}]
     *
     * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
     * considered a float between `0` and `1.0` (default) or a raw integer between `0` and `127`.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     *
     * @throws RangeError Invalid channel aftertouch value.
     */
    sendChannelAftertouch(pressure, options = {}) {

      if (wm.validation) {

        if (isNaN(parseFloat(pressure))) {
          throw new RangeError("Invalid channel aftertouch value.");
        }

        if (options.rawValue) {
          if (!(pressure >= 0 && pressure <= 127 && Number.isInteger(pressure))) {
            throw new RangeError(
              "Channel aftertouch raw value must be an integer between 0 and 127.")
            ;
          }
        } else {
          if (!(pressure >= 0 && pressure <= 1)) {
            throw new RangeError("Channel aftertouch value must be a float between 0 and 1.");
          }
        }

      }

      this.send(
        [
          (Enumerations.MIDI_CHANNEL_MESSAGES.channelaftertouch << 4) + (this.number - 1),
          Math.round(pressure * 127)
        ],
        {time: Utilities.toTimestamp(options.time)}
      );

      return this;

    }

    /**
     * Sends a **master tuning** message. The value is decimal and must be larger than -65 semitones
     * and smaller than 64 semitones.
     *
     * Because of the way the MIDI specification works, the decimal portion of the value will be
     * encoded with a resolution of 14bit. The integer portion must be between -64 and 63
     * inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
     * a **Master Fine Tuning** RPN messages.
     *
     * @param [value=0.0] {number} The desired decimal adjustment value in semitones (-65 < x < 64)
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The value must be a decimal number between larger than -65 and smaller
     * than 64.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendMasterTuning(value, options = {}) {

      // @todo allow passing value as msb/lsb pair (the same as pitch bend range)

      value = parseFloat(value) || 0.0;

      if (wm.validation) {

        if (!(value > -65 && value < 64)) {
          throw new RangeError(
            "The value must be a decimal number larger than -65 and smaller than 64."
          );
        }

      }

      let coarse = Math.floor(value) + 64;
      let fine = value - Math.floor(value);

      // Calculate MSB and LSB for fine adjustment (14bit resolution)
      fine = Math.round((fine + 1) / 2 * 16383);
      let msb = (fine >> 7) & 0x7F;
      let lsb = fine & 0x7F;

      this.sendRpnValue("channelcoarsetuning", coarse, options);
      this.sendRpnValue("channelfinetuning", [msb, lsb], options);

      return this;

    }

    /**
     * Sends a **modulation depth range** message to adjust the depth of the modulation wheel's range.
     * The range can be specified with the `semitones` parameter, the `cents` parameter or by
     * specifying both parameters at the same time.
     *
     * @param {number} semitones The desired adjustment value in semitones (integer between 0 and
     * 127).
     *
     * @param {number} [cents=0] The desired adjustment value in cents (integer between 0 and 127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendModulationRange(semitones, cents, options = {}) {

      // @todo allow passing value as msb/lsb pair (the same as pitch bend range)
      // when passing a single argument, semitones and cents shoud be combined

      if (wm.validation) {

        if (!Number.isInteger(semitones) || !(semitones >= 0 && semitones <= 127)) {
          throw new RangeError("The semitones value must be an integer between 0 and 127.");
        }

        if (!(cents == undefined) && (!Number.isInteger(cents) || !(cents >= 0 && cents <= 127))) {
          throw new RangeError("If specified, the cents value must be an integer between 0 and 127.");
        }

      }

      // Default value for cents
      if (!(cents >= 0 && cents <= 127)) cents = 0;

      this.sendRpnValue("modulationrange", [semitones, cents], options);

      return this;

    }

    /**
     * Sets a non-registered parameter (NRPN) to the specified value. The NRPN is selected by passing
     * in a two-position array specifying the values of the two control bytes. The value is specified
     * by passing in a single integer (most cases) or an array of two integers.
     *
     * NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
     * they see fit. For example, according to the Roland GS specification, you can control the
     * **vibrato rate** using NRPN (1, 8). Therefore, to set the **vibrato rate** value to **123** you
     * would use:
     *
     * ```js
     * WebMidi.outputs[0].channels[0].sendNrpnValue([1, 8], 123);
     * ```
     *
     * In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
     * would use a 2-position array. For example, for its **ClockBPM** parameter (2, 63), Novation
     * uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
     * value to send was 10, you could use:
     *
     * ```js
     * WebMidi.outputs[0].channels[0].sendNrpnValue([2, 63], [0, 10]);
     * ```
     *
     * For further implementation details, refer to the manufacturer's documentation.
     *
     * @param nrpn {number[]} A two-position array specifying the two control bytes (0x63,
     * 0x62) that identify the non-registered parameter.
     *
     * @param [data=[]] {number|number[]} An integer or an array of integers with a length of 1 or 2
     * specifying the desired data.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The control value must be between 0 and 127.
     * @throws {RangeError} The msb value must be between 0 and 127
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendNrpnValue(nrpn, data, options = {}) {

      data = [].concat(data);

      if (wm.validation) {

        if (!Array.isArray(nrpn) || !Number.isInteger(nrpn[0]) || !Number.isInteger(nrpn[1])) {
          throw new TypeError("The specified NRPN is invalid.");
        }

        if (!(nrpn[0] >= 0 && nrpn[0] <= 127)) {
          throw new RangeError("The first byte of the NRPN must be between 0 and 127.");
        }

        if (!(nrpn[1] >= 0 && nrpn[1] <= 127)) {
          throw new RangeError("The second byte of the NRPN must be between 0 and 127.");
        }

        data.forEach(value => {
          if (!(value >= 0 && value <= 127)) {
            throw new RangeError("The data bytes of the NRPN must be between 0 and 127.");
          }
        });

      }

      this._selectNonRegisteredParameter(nrpn, options);
      this._setCurrentParameter(data, options);
      this._deselectNonRegisteredParameter(options);

      return this;

    }

    /**
     * Sends a MIDI **pitch bend** message at the scheduled time. The resulting bend is relative to
     * the pitch bend range that has been defined. The range can be set with
     * [`sendPitchBendRange()`]{@link #sendPitchBendRange}. So, for example, if the pitch
     * bend range has been set to 12 semitones, using a bend value of -1 will bend the note 1 octave
     * below its nominal value.
     *
     * @param {number|number[]} [value] The intensity of the bend (between -1.0 and 1.0). A value of
     * zero means no bend. If the `rawValue` option is set to `true`, the intensity of the bend can be
     * defined by either using a single integer between 0 and 127 (MSB) or an array of two integers
     * between 0 and 127 representing, respectively, the MSB (most significant byte) and the LSB
     * (least significant byte). The MSB is expressed in semitones with `64` meaning no bend. A value
     * lower than `64` bends downwards while a value higher than `64` bends upwards. The LSB is
     * expressed in cents (1/100 of a semitone). An LSB of `64` also means no bend.
     *
     * @param {Object} [options={}]
     *
     * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
     * considered as a float between -1.0 and 1.0 (default) or as raw integer between 0 and 127 (or
     * an array of 2 integers if using both MSB and LSB).
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendPitchBend(value, options = {}) {

      // @todo standardize the way msb/lsb are passed in

      if (wm.validation) {

        if (options.rawValue && Array.isArray(value)) {

          if (!(value[0] >= 0 && value[0] <= 127)) {
            throw new RangeError("The pitch bend MSB must be an integer between 0 and 127.");
          }
          if (!(value[1] >= 0 && value[1] <= 127)) {
            throw new RangeError("The pitch bend LSB must be an integer between 0 and 127.");
          }

        } else if (options.rawValue && !Array.isArray(value)) {

          if (!(value >= 0 && value <= 127)) {
            throw new RangeError("The pitch bend MSB must be an integer between 0 and 127.");
          }

        } else {

          if (isNaN(value) || value === null) {
            throw new RangeError("Invalid pitch bend value.");
          }

          if (!(value >= -1 && value <= 1)) {
            throw new RangeError("The pitch bend MSB must be an integer between 0 and 127.");
          }

        }

      }

      let msb = 0;
      let lsb = 0;

      // Calculate MSB and LSB for both scenarios
      if (options.rawValue && Array.isArray(value)) {
        msb = value[0];
        lsb = value[1];
      } else if (options.rawValue && !Array.isArray(value)) {
        msb = value;
      } else {
        const result = Utilities.fromFloatToMsbLsb((value + 1) / 2); // b/c value is -1 to 1
        msb = result.msb;
        lsb = result.lsb;
      }

      this.send(
        [
          (Enumerations.MIDI_CHANNEL_MESSAGES.pitchbend << 4) + (this.number - 1),
          lsb,
          msb
        ],
        {time: Utilities.toTimestamp(options.time)}
      );

      return this;

    }

    /**
     * Sends a **pitch bend range** message at the scheduled time to adjust the range used by the
     * pitch bend lever. The range is specified by using the `semitones` and `cents` parameters. For
     * example, setting the `semitones` parameter to `12` means that the pitch bend range will be 12
     * semitones above and below the nominal pitch.
     *
     * @param semitones {number} The desired adjustment value in semitones (between 0 and 127). While
     * nothing imposes that in the specification, it is very common for manufacturers to limit the
     * range to 2 octaves (-12 semitones to 12 semitones).
     *
     * @param [cents=0] {number} The desired adjustment value in cents (integer between 0-127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The semitones value must be an integer between 0 and 127.
     * @throws {RangeError} The cents value must be an integer between 0 and 127.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendPitchBendRange(semitones, cents, options = {}) {

      // @todo use single value as parameter or pair of msb/lsb

      if (wm.validation) {

        if (!Number.isInteger(semitones) || !(semitones >= 0 && semitones <= 127)) {
          throw new RangeError("The semitones value must be an integer between 0 and 127.");
        }

        if (!Number.isInteger(cents) || !(cents >= 0 && cents <= 127)) {
          throw new RangeError("The cents value must be an integer between 0 and 127.");
        }

      }

      this.sendRpnValue("pitchbendrange", [semitones, cents], options);
      return this;

    }

    /**
     * Sends a MIDI **program change** message at the scheduled time.
     *
     * @param [program=1] {number} The MIDI patch (program) number (integer between `0` and `127`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
     * than 0xFF.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     *
     */
    sendProgramChange(program, options = {}) {

      program = parseInt(program) || 0;

      if (wm.validation) {

        if (!(program >= 0 && program <= 127)) {
          throw new RangeError("The program number must be between 0 and 127.");
        }

      }

      this.send(
        [
          (Enumerations.MIDI_CHANNEL_MESSAGES.programchange << 4) + (this.number - 1),
          program
        ],
        {time: Utilities.toTimestamp(options.time)}
      );

      return this;

    }

    /**
     * Sets the specified MIDI registered parameter to the desired value. The value is defined with
     * up to two bytes of data (msb, lsb) that each can go from 0 to 127.
     *
     * MIDI
     * [registered parameters](https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
     * extend the original list of control change messages. The MIDI 1.0 specification lists only a
     * limited number of them:
     *
     * | Numbers      | Function                 |
     * |--------------|--------------------------|
     * | (0x00, 0x00) | `pitchbendrange`         |
     * | (0x00, 0x01) | `channelfinetuning`      |
     * | (0x00, 0x02) | `channelcoarsetuning`    |
     * | (0x00, 0x03) | `tuningprogram`          |
     * | (0x00, 0x04) | `tuningbank`             |
     * | (0x00, 0x05) | `modulationrange`        |
     * | (0x3D, 0x00) | `azimuthangle`           |
     * | (0x3D, 0x01) | `elevationangle`         |
     * | (0x3D, 0x02) | `gain`                   |
     * | (0x3D, 0x03) | `distanceratio`          |
     * | (0x3D, 0x04) | `maximumdistance`        |
     * | (0x3D, 0x05) | `maximumdistancegain`    |
     * | (0x3D, 0x06) | `referencedistanceratio` |
     * | (0x3D, 0x07) | `panspreadangle`         |
     * | (0x3D, 0x08) | `rollangle`              |
     *
     * Note that the **Tuning Program** and **Tuning Bank** parameters are part of the *MIDI Tuning
     * Standard*, which is not widely implemented.
     *
     * @param rpn {string|number[]} A string identifying the parameter's name (see above) or a
     * two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the
     * registered parameter.
     *
     * @param [data=[]] {number|number[]} An single integer or an array of integers with a maximum
     * length of 2 specifying the desired data.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendRpnValue(rpn, data, options = {}) {

      if (!Array.isArray(rpn)) rpn = Enumerations.MIDI_REGISTERED_PARAMETERS[rpn];

      if (wm.validation) {

        if (!Number.isInteger(rpn[0]) || !Number.isInteger(rpn[1])) {
          throw new TypeError("The specified NRPN is invalid.");
        }

        if (!(rpn[0] >= 0 && rpn[0] <= 127)) {
          throw new RangeError("The first byte of the RPN must be between 0 and 127.");
        }

        if (!(rpn[1] >= 0 && rpn[1] <= 127)) {
          throw new RangeError("The second byte of the RPN must be between 0 and 127.");
        }

        [].concat(data).forEach(value => {
          if (!(value >= 0 && value <= 127)) {
            throw new RangeError("The data bytes of the RPN must be between 0 and 127.");
          }
        });

      }

      this._selectRegisteredParameter(rpn, options);
      this._setCurrentParameter(data, options);
      this._deselectRegisteredParameter(options);

      return this;

    }

    /**
     * Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
     * *MIDI Tuning Standard*, which is not widely implemented.
     *
     * @param value {number} The desired tuning bank (integer between `0` and `127`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The bank value must be between 0 and 127.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendTuningBank(value, options = {}) {

      if (wm.validation) {

        if (!Number.isInteger(value) || !(value >= 0 && value <= 127)) {
          throw new RangeError("The tuning bank number must be between 0 and 127.");
        }

      }

      this.sendRpnValue("tuningbank", value, options);
      return this;

    }

    /**
     * Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
     * *MIDI Tuning Standard*, which is not widely implemented.
     *
     * @param value {number} The desired tuning program (integer between `0` and `127`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The program value must be between 0 and 127.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendTuningProgram(value, options = {}) {

      if (wm.validation) {

        if (!Number.isInteger(value) || !(value >= 0 && value <= 127)) {
          throw new RangeError("The tuning program number must be between 0 and 127.");
        }

      }

      this.sendRpnValue("tuningprogram", value, options);
      return this;

    }

    /**
     * Turns local control on or off. Local control is usually enabled by default. If you disable it,
     * the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
     * its out port.
     *
     * @param [state=false] {boolean} Whether to activate local control (`true`) or disable it
     * (`false`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendLocalControl(state, options = {}) {
      if (state) {
        return this.sendChannelMode("localcontrol", 127, options);
      } else {
        return this.sendChannelMode("localcontrol", 0, options);
      }
    }

    /**
     * Sends an **all notes off** channel mode message. This will make all currently playing notes
     * fade out just as if their key had been released. This is different from the
     * [`sendAllSoundOff()`]{@link #sendAllSoundOff} method which mutes all sounds immediately.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendAllNotesOff(options = {}) {
      return this.sendChannelMode("allnotesoff", 0, options);
    }

    /**
     * Sends an **all sound off** channel mode message. This will silence all sounds playing on that
     * channel but will not prevent new sounds from being triggered.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendAllSoundOff(options = {}) {
      return this.sendChannelMode("allsoundoff", 0, options);
    }

    /**
     * Sends a **reset all controllers** channel mode message. This resets all controllers, such as
     * the pitch bend, to their default value.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendResetAllControllers(options = {}) {
      return this.sendChannelMode("resetallcontrollers", 0, options);
    }

    /**
     * Sets the polyphonic mode. In `"poly"` mode (usually the default), multiple notes can be played
     * and heard at the same time. In `"mono"` mode, only one note will be heard at once even if
     * multiple notes are being played.
     *
     * @param {string} [mode=poly] The mode to use: `"mono"` or `"poly"`.
     *
     * @param {Object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {OutputChannel} Returns the `OutputChannel` object so methods can be chained.
     */
    sendPolyphonicMode(mode, options = {}) {
      if (mode === "mono") {
        return this.sendChannelMode("monomodeon", 0, options);
      } else {
        return this.sendChannelMode("polymodeon", 0, options);
      }
    }

    /**
     * An integer to offset the reported octave of outgoing note-specific messages (`noteon`,
     * `noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
     * octave (C4).
     *
     * Note that this value is combined with the global offset value defined in
     * [`WebMidi.octaveOffset`](WebMidi#octaveOffset) and with the parent value defined in
     * [`Output.octaveOffset`]{@link Output#octaveOffset}.
     *
     * @type {number}
     *
     * @since 3.0
     */
    get octaveOffset() {
      return this._octaveOffset;
    }
    set octaveOffset(value) {

      if (this.validation) {
        value = parseInt(value);
        if (isNaN(value)) throw new TypeError("The 'octaveOffset' property must be an integer.");
      }

      this._octaveOffset = value;

    }

    /**
     * The parent [`Output`]{@link Output} this channel belongs to.
     * @type {Output}
     * @since 3.0
     */
    get output() {
      return this._output;
    }

    /**
     * This channel's MIDI number (`1` - `16`).
     * @type {number}
     * @since 3.0
     */
    get number() {
      return this._number;
    }

  }

  /**
   * The `Output` class represents a single MIDI output port (not to be confused with a MIDI channel).
   * A port is made available by a MIDI device. A MIDI device can advertise several input and output
   * ports. Each port has 16 MIDI channels which can be accessed via the [`channels`](#channels)
   * property.
   *
   * The `Output` object is automatically instantiated by the library according to the host's MIDI
   * subsystem and should not be directly instantiated.
   *
   * You can access all available `Output` objects by referring to the
   * [`WebMidi.outputs`](WebMidi#outputs) array or by using methods such as
   * [`WebMidi.getOutputByName()`](WebMidi#getOutputByName) or
   * [`WebMidi.getOutputById()`](WebMidi#getOutputById).
   *
   * @fires Output#opened
   * @fires Output#disconnected
   * @fires Output#closed
   *
   * @extends EventEmitter
   * @license Apache-2.0
   */
  class Output extends EventEmitter {

    /**
     * Creates an `Output` object.
     *
     * @param {MIDIOutput} midiOutput [`MIDIOutput`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIOutput)
     * object as provided by the MIDI subsystem.
     */
    constructor(midiOutput) {

      super();

      /**
       * A reference to the `MIDIOutput` object
       * @type {MIDIOutput}
       * @private
       */
      this._midiOutput = midiOutput;

      /**
       * @type {number}
       * @private
       */
      this._octaveOffset = 0;

      /**
       * Array containing the 16 [`OutputChannel`]{@link OutputChannel} objects available provided by
       * this `Output`. The channels are numbered 1 through 16.
       *
       * @type {OutputChannel[]}
       */
      this.channels = [];
      for (let i = 1; i <= 16; i++) this.channels[i] = new OutputChannel(this, i);

      this._midiOutput.onstatechange = this._onStateChange.bind(this);

    }

    /**
     * Destroys the `Output`. All listeners are removed, all channels are destroyed and the MIDI
     * subsystem is unlinked.
     * @returns {Promise<void>}
     */
    async destroy() {
      this.removeListener();
      this.channels.forEach(ch => ch.destroy());
      this.channels = [];
      this._midiOutput.onstatechange = null;
      await this.close();
      this._midiOutput = null;
    }

    /**
     * @private
     */
    _onStateChange(e) {

      let event = {
        timestamp: wm.time
      };

      if (e.port.connection === "open") {

        /**
         * Event emitted when the {@link Output} has been opened by calling the
         * [open()]{@link Output#open} method.
         *
         * @event Output#opened
         * @type {object}
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         * @property {string} type `"opened"`
         * @property {Output} target The object to which the listener was originally added (`Output`).
         * @property {Output} port The port that was opened
         */
        event.type = "opened";
        event.target = this;
        event.port = event.target; // for consistency
        this.emit("opened", event);

      } else if (e.port.connection === "closed" && e.port.state === "connected") {

        /**
         * Event emitted when the {@link Output} has been closed by calling the
         * [close()]{@link Output#close} method.
         *
         * @event Output#closed
         * @type {object}
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         * @property {string} type `"closed"`
         * @property {Output} target The object to which the listener was originally added (`Output`).
         * @property {Output} port The port that was closed
         */
        event.type = "closed";
        event.target = this;
        event.port = event.target; // for consistency
        this.emit("closed", event);

      } else if (e.port.connection === "closed" && e.port.state === "disconnected") {

        /**
         * Event emitted when the {@link Output} becomes unavailable. This event is typically fired
         * when the MIDI device is unplugged.
         *
         * @event Output#disconnected
         * @type {object}
         * @property {number} timestamp The moment (DOMHighResTimeStamp0 when the event occurred (in
         * milliseconds since the navigation start of the document).
         * @property {string} type `"disconnected"`
         * @property {Output} target The object to which the listener was originally added (`Output`).
         * @property {object} port Object with properties describing the {@link Output} that was
         * disconnected. This is not the actual `Output` as it is no longer available.
         */
        event.type = "disconnected";
        event.port = {
          connection: e.port.connection,
          id: e.port.id,
          manufacturer: e.port.manufacturer,
          name: e.port.name,
          state: e.port.state,
          type: e.port.type
        };
        this.emit("disconnected", event);

      } else if (e.port.connection === "pending" && e.port.state === "disconnected") ; else {
        console.warn("This statechange event was not caught:", e.port.connection, e.port.state);
      }

    }

    /**
     * Opens the output for usage. When the library is enabled, all ports are automatically opened.
     * This method is only useful for ports that have been manually closed.
     *
     * @returns {Promise<Output>} The promise is fulfilled with the `Output` object.
     */
    async open() {

      // Explicitly opens the port for usage. This is not mandatory. When the port is not explicitly
      // opened, it is implicitly opened (asynchronously) when calling `send()` on the `MIDIOutput`.
      // We do it explicitly so that 'connected' events are dispatched immediately and we are ready to
      // send.
      try {
        await this._midiOutput.open();
        return Promise.resolve(this);
      } catch (err) {
        return Promise.reject(err);
      }

    }

    /**
     * Closes the output connection. When an output is closed, it cannot be used to send MIDI messages
     * until the output is opened again by calling [`open()`]{@link #open}. You can check
     * the connection status by looking at the [`connection`]{@link #connection} property.
     *
     * @returns {Promise<void>}
     */
    async close() {

      // We close the port. This triggers a 'statechange' event which we listen to to re-trigger the
      // 'closed' event.
      if (this._midiOutput) {
        await this._midiOutput.close();
      } else {
        await Promise.resolve();
      }

    }

    /**
     * Sends a MIDI message on the MIDI output port. If no time is specified, the message will be
     * sent immediately. The message should be an array of 8 bit unsigned integers (0-225), a
     * [`Uint8Array`]{@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array}
     * object or a [`Message`](Message) object.
     *
     * It is usually not necessary to use this method directly as you can use one of the simpler
     * helper methods such as [`playNote()`](#playNote), [`stopNote()`](#stopNote),
     * [`sendControlChange()`](#sendControlChange), etc.
     *
     * Details on the format of MIDI messages are available in the summary of
     * [MIDI messages]{@link https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message}
     * from the MIDI Manufacturers Association.
     *
     * @param message {number[]|Uint8Array|Message} An array of 8bit unsigned integers, a `Uint8Array`
     * object (not available in Node.js) containing the message bytes or a `Message` object.
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The first byte (status) must be an integer between 128 and 255.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     *
     * @license Apache-2.0
     */
    send(message, options = {time: 0}, legacy = 0) {

      // If a Message object is passed in we extract the message data (the jzz plugin used on Node.js
      // does not support using Uint8Array).
      if (message instanceof Message) {
        message = Utilities.isNode ? message.data : message.rawData;
      }

      // If the data is a Uint8Array and we are on Node, we must convert it to array so it works with
      // the jzz module.
      if (message instanceof Uint8Array && Utilities.isNode) {
        message = Array.from(message);
      }

      // Validation
      if (wm.validation) {

        // If message is neither an array nor a Uint8Array, then we are in legacy mode
        if (!Array.isArray(message) && !(message instanceof Uint8Array)) {
          message = [message];
          if (Array.isArray(options)) message = message.concat(options);
          options = isNaN(legacy) ? {time: 0} : {time: legacy};
        }

        if (!(parseInt(message[0]) >= 128 && parseInt(message[0]) <= 255)) {
          throw new RangeError("The first byte (status) must be an integer between 128 and 255.");
        }

        message.slice(1).forEach(value => {
          value = parseInt(value);
          if (!(value >= 0 && value <= 255)) {
            throw new RangeError("Data bytes must be integers between 0 and 255.");
          }
        });

        if (!options) options = {time: 0};

      }

      // Send message and return `Output` for chaining
      this._midiOutput.send(message, Utilities.toTimestamp(options.time));
      return this;

    }

    /**
     * Sends a MIDI [**system exclusive**]{@link
      * https://www.midi.org/specifications-old/item/table-4-universal-system-exclusive-messages}
     * (*sysex*) message. There are two categories of system exclusive messages: manufacturer-specific
     * messages and universal messages. Universal messages are further divided into three subtypes:
     *
     *   * Universal non-commercial (for research and testing): `0x7D`
     *   * Universal non-realtime: `0x7E`
     *   * Universal realtime: `0x7F`
     *
     * The method's first parameter (`identification`) identifies the type of message. If the value of
     * `identification` is `0x7D` (125), `0x7E` (126) or `0x7F` (127), the message will be identified
     * as a **universal non-commercial**, **universal non-realtime** or **universal realtime** message
     * (respectively).
     *
     * If the `identification` value is an array or an integer between 0 and 124, it will be used to
     * identify the manufacturer targeted by the message. The *MIDI Manufacturers Association*
     * maintains a full list of
     * [Manufacturer ID Numbers](https://www.midi.org/specifications-old/item/manufacturer-id-numbers).
     *
     * The `data` parameter should only contain the data of the message. When sending out the actual
     * MIDI message, WEBMIDI.js will automatically prepend the data with the **sysex byte** (`0xF0`)
     * and the identification byte(s). It will also automatically terminate the message with the
     * **sysex end byte** (`0xF7`).
     *
     * To use the `sendSysex()` method, system exclusive message support must have been enabled. To
     * do so, you must set the `sysex` option to `true` when calling
     * [`WebMidi.enable()`]{@link WebMidi#enable}:
     *
     * ```js
     * WebMidi.enable({sysex: true})
     *   .then(() => console.log("System exclusive messages are enabled");
     * ```
     *
     * ##### Examples of manufacturer-specific system exclusive messages
     *
     * If you want to send a sysex message to a Korg device connected to the first output, you would
     * use the following code:
     *
     * ```js
     * WebMidi.outputs[0].sendSysex(0x42, [0x1, 0x2, 0x3, 0x4, 0x5]);
     * ```
     * In this case `0x42` is the ID of the manufacturer (Korg) and `[0x1, 0x2, 0x3, 0x4, 0x5]` is the
     * data being sent.
     *
     * The parameters can be specified using any number notation (decimal, hex, binary, etc.).
     * Therefore, the code above is equivalent to this code:
     *
     * ```js
     * WebMidi.outputs[0].sendSysex(66, [1, 2, 3, 4, 5]);
     * ```
     *
     * Some manufacturers are identified using 3 bytes. In this case, you would use a 3-position array
     * as the first parameter. For example, to send the same sysex message to a
     * *Native Instruments* device:
     *
     * ```js
     * WebMidi.outputs[0].sendSysex([0x00, 0x21, 0x09], [0x1, 0x2, 0x3, 0x4, 0x5]);
     * ```
     *
     * There is no limit for the length of the data array. However, it is generally suggested to keep
     * system exclusive messages to 64Kb or less.
     *
     * ##### Example of universal system exclusive message
     *
     * If you want to send a universal sysex message, simply assign the correct identification number
     * in the first parameter. Number `0x7D` (125) is for non-commercial, `0x7E` (126) is for
     * non-realtime and `0x7F` (127) is for realtime.
     *
     * So, for example, if you wanted to send an identity request non-realtime message (`0x7E`), you
     * could use the following:
     *
     * ```js
     * WebMidi.outputs[0].sendSysex(0x7E, [0x7F, 0x06, 0x01]);
     * ```
     *
     * For more details on the format of universal messages, consult the list of
     * [universal sysex messages](https://www.midi.org/specifications-old/item/table-4-universal-system-exclusive-messages).
     *
     * @param {number|number[]} identification An unsigned integer or an array of three unsigned
     * integers between `0` and `127` that either identify the manufacturer or sets the message to be
     * a **universal non-commercial message** (`0x7D`), a **universal non-realtime message** (`0x7E`)
     * or a **universal realtime message** (`0x7F`). The *MIDI Manufacturers Association* maintains a
     * full list of
     * [Manufacturer ID Numbers](https://www.midi.org/specifications-old/item/manufacturer-id-numbers).
     *
     * @param {number[]|Uint8Array} [data] A `Uint8Array` or an array of unsigned integers between `0`
     * and `127`. This is the data you wish to transfer.
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {DOMException} Failed to execute 'send' on 'MIDIOutput': System exclusive message is
     * not allowed.
     *
     * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index x is greater
     * than 0xFF.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendSysex(identification, data= [], options = {}) {

      identification = [].concat(identification);

      // Check if data is Uint8Array
      if (data instanceof Uint8Array) {
        const merged = new Uint8Array(1 + identification.length + data.length + 1);
        merged[0] = Enumerations.MIDI_SYSTEM_MESSAGES.sysex;
        merged.set(Uint8Array.from(identification), 1);
        merged.set(data, 1 + identification.length);
        merged[merged.length - 1] = Enumerations.MIDI_SYSTEM_MESSAGES.sysexend;
        this.send(merged, {time: options.time});
      } else {
        const merged = identification.concat(data, Enumerations.MIDI_SYSTEM_MESSAGES.sysexend);
        this.send([Enumerations.MIDI_SYSTEM_MESSAGES.sysex].concat(merged), {time: options.time});
      }

      return this;

    };

    /**
     * Clears all messages that have been queued but not yet delivered.
     *
     * **Warning**: this method has been defined in the specification but has not been implemented
     * yet. As soon as browsers implement it, it will work.
     *
     * You can check out the current status of this feature for Chromium (Chrome) here:
     * https://bugs.chromium.org/p/chromium/issues/detail?id=471798
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    clear() {

      if (this._midiOutput.clear) {

        this._midiOutput.clear();

      } else {

        if (wm.validation) {
          console.warn(
            "The 'clear()' method has not yet been implemented in your environment."
          );
        }

      }

      return this;

    }

    /**
     * Sends a MIDI **timecode quarter frame** message. Please note that no processing is being done
     * on the data. It is up to the developer to format the data according to the
     * [MIDI Timecode](https://en.wikipedia.org/wiki/MIDI_timecode) format.
     *
     * @param value {number} The quarter frame message content (integer between 0 and 127).
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendTimecodeQuarterFrame(value, options = {}) {

      if (wm.validation) {
        value = parseInt(value);
        if (isNaN(value) || !(value >= 0 && value <= 127)) {
          throw new RangeError("The value must be an integer between 0 and 127.");
        }
      }

      this.send(
        [
          Enumerations.MIDI_SYSTEM_MESSAGES.timecode,
          value
        ],
        {time: options.time}
      );

      return this;

    };

    /**
     * Sends a **song position** MIDI message. The value is expressed in MIDI beats (between `0` and
     * `16383`) which are 16th note. Position `0` is always the start of the song.
     *
     * @param {number} [value=0] The MIDI beat to cue to (integer between `0` and `16383`).
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendSongPosition(value = 0, options = {}) {

      // @todo allow passing in 2-entries array for msb/lsb

      value = Math.floor(value) || 0;

      var msb = (value >> 7) & 0x7F;
      var lsb = value & 0x7F;

      this.send(
        [
          Enumerations.MIDI_SYSTEM_MESSAGES.songposition,
          msb,
          lsb
        ],
        {time: options.time}
      );

      return this;

    }

    /**
     * Sends a **song select** MIDI message.
     *
     * @param {number} [value=0] The number of the song to select (integer between `0` and `127`).
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws The song number must be between 0 and 127.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendSongSelect(value = 0, options = {}) {

      if (wm.validation) {

        value = parseInt(value);

        if (isNaN(value) || !(value >= 0 && value <= 127)) {
          throw new RangeError("The program value must be between 0 and 127");
        }

      }

      this.send(
        [
          Enumerations.MIDI_SYSTEM_MESSAGES.songselect,
          value
        ],
        {time: options.time}
      );

      return this;

    }

    /**
     * Sends a MIDI **tune request** real-time message.
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendTuneRequest(options = {}) {

      this.send(
        [Enumerations.MIDI_SYSTEM_MESSAGES.tunerequest],
        {time: options.time}
      );

      return this;

    }

    /**
     * Sends a MIDI **clock** real-time message. According to the standard, there are 24 MIDI clocks
     * for every quarter note.
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendClock(options = {}) {

      this.send(
        [Enumerations.MIDI_SYSTEM_MESSAGES.clock],
        {time: options.time}
      );

      return this;

    }

    /**
     * Sends a **start** real-time message. A MIDI Start message starts the playback of the current
     * song at beat 0. To start playback elsewhere in the song, use the
     * [`sendContinue()`]{@link #sendContinue} method.
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendStart(options = {}) {

      this.send(
        [Enumerations.MIDI_SYSTEM_MESSAGES.start],
        {time: options.time}
      );

      return this;

    }

    /**
     * Sends a **continue** real-time message. This resumes song playback where it was previously
     * stopped or where it was last cued with a song position message. To start playback from the
     * start, use the [`sendStart()`]{@link Output#sendStart}` method.
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendContinue(options = {}) {

      this.send(
        [Enumerations.MIDI_SYSTEM_MESSAGES.continue],
        {time: options.time}
      );

      return this;

    }

    /**
     * Sends a **stop** real-time message. This tells the device connected to this output to stop
     * playback immediately (or at the scheduled time, if specified).
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendStop(options = {}) {

      this.send(
        [Enumerations.MIDI_SYSTEM_MESSAGES.stop],
        {time: options.time}
      );

      return this;

    }

    /**
     * Sends an **active sensing** real-time message. This tells the device connected to this port
     * that the connection is still good. Active sensing messages are often sent every 300 ms if there
     * was no other activity on the MIDI port.
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendActiveSensing(options = {}) {

      this.send(
        [Enumerations.MIDI_SYSTEM_MESSAGES.activesensing],
        {time: options.time}
      );

      return this;

    }

    /**
     * Sends a **reset** real-time message. This tells the device connected to this output that it
     * should reset itself to a default state.
     *
     * @param {object} [options={}]
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendReset(options = {}) {

      this.send(
        [Enumerations.MIDI_SYSTEM_MESSAGES.reset],
        {time: options.time}
      );

      return this;

    }

    /**
     * @private
     * @deprecated since version 3.0
     */
    sendTuningRequest(options = {}) {

      if (wm.validation) {
        console.warn(
          "The sendTuningRequest() method has been deprecated. Use sendTuningRequest() instead."
        );
      }

      return this.sendTuneRequest(options);

    }

    /**
     * Sends a MIDI **key aftertouch** message to the specified channel(s) at the scheduled time. This
     * is a key-specific aftertouch. For a channel-wide aftertouch message, use
     * [`setChannelAftertouch()`]{@link #setChannelAftertouch}.
     *
     * @param note {number|Note|string|number[]|Note[]|string[]} The note(s) for which you are sending
     * an aftertouch value. The notes can be specified by using a MIDI note number (`0` - `127`), a
     * [`Note`](Note) object, a note identifier (e.g. `C3`, `G#4`, `F-1`, `Db7`) or an array of the
     * previous types. When using a note identifier, octave range must be between `-1` and `9`. The
     * lowest note is `C-1` (MIDI note number `0`) and the highest note is `G9` (MIDI note number
     * `127`).
     *
     * @param [pressure=0.5] {number} The pressure level (between 0 and 1). An invalid pressure value
     * will silently trigger the default behaviour. If the `rawValue` option is set to `true`, the
     * pressure can be defined by using an integer between 0 and 127.
     *
     * @param {object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
     * considered a float between `0` and `1.0` (default) or a raw integer between `0` and `127`.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendKeyAftertouch(note, pressure, options = {}) {

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendKeyAftertouch(note, pressure, options);
      });

      return this;

    };

    /**
     * Sends a MIDI **control change** message to the specified channel(s) at the scheduled time. The
     * control change message to send can be specified numerically (0-127) or by using one of the
     * following common names:
     *
     * | Number | Name                          |
     * |--------|-------------------------------|
     * | 0      |`bankselectcoarse`             |
     * | 1      |`modulationwheelcoarse`        |
     * | 2      |`breathcontrollercoarse`       |
     * | 4      |`footcontrollercoarse`         |
     * | 5      |`portamentotimecoarse`         |
     * | 6      |`dataentrycoarse`              |
     * | 7      |`volumecoarse`                 |
     * | 8      |`balancecoarse`                |
     * | 10     |`pancoarse`                    |
     * | 11     |`expressioncoarse`             |
     * | 12     |`effectcontrol1coarse`         |
     * | 13     |`effectcontrol2coarse`         |
     * | 18     |`generalpurposeslider3`        |
     * | 19     |`generalpurposeslider4`        |
     * | 32     |`bankselectfine`               |
     * | 33     |`modulationwheelfine`          |
     * | 34     |`breathcontrollerfine`         |
     * | 36     |`footcontrollerfine`           |
     * | 37     |`portamentotimefine`           |
     * | 38     |`dataentryfine`                |
     * | 39     |`volumefine`                   |
     * | 40     |`balancefine`                  |
     * | 42     |`panfine`                      |
     * | 43     |`expressionfine`               |
     * | 44     |`effectcontrol1fine`           |
     * | 45     |`effectcontrol2fine`           |
     * | 64     |`holdpedal`                    |
     * | 65     |`portamento`                   |
     * | 66     |`sustenutopedal`               |
     * | 67     |`softpedal`                    |
     * | 68     |`legatopedal`                  |
     * | 69     |`hold2pedal`                   |
     * | 70     |`soundvariation`               |
     * | 71     |`resonance`                    |
     * | 72     |`soundreleasetime`             |
     * | 73     |`soundattacktime`              |
     * | 74     |`brightness`                   |
     * | 75     |`soundcontrol6`                |
     * | 76     |`soundcontrol7`                |
     * | 77     |`soundcontrol8`                |
     * | 78     |`soundcontrol9`                |
     * | 79     |`soundcontrol10`               |
     * | 80     |`generalpurposebutton1`        |
     * | 81     |`generalpurposebutton2`        |
     * | 82     |`generalpurposebutton3`        |
     * | 83     |`generalpurposebutton4`        |
     * | 91     |`reverblevel`                  |
     * | 92     |`tremololevel`                 |
     * | 93     |`choruslevel`                  |
     * | 94     |`celestelevel`                 |
     * | 95     |`phaserlevel`                  |
     * | 96     |`databuttonincrement`          |
     * | 97     |`databuttondecrement`          |
     * | 98     |`nonregisteredparametercoarse` |
     * | 99     |`nonregisteredparameterfine`   |
     * | 100    |`registeredparametercoarse`    |
     * | 101    |`registeredparameterfine`      |
     * | 120    |`allsoundoff`                  |
     * | 121    |`resetallcontrollers`          |
     * | 122    |`localcontrol`                 |
     * | 123    |`allnotesoff`                  |
     * | 124    |`omnimodeoff`                  |
     * | 125    |`omnimodeon`                   |
     * | 126    |`monomodeon`                   |
     * | 127    |`polymodeon`                   |
     *
     * Note: as you can see above, not all control change message have a matching name. This does not
     * mean you cannot use the others. It simply means you will need to use their number (`0` - `127`)
     * instead of their name. While you can still use them, numbers `120` to `127` are usually
     * reserved for *channel mode* messages. See [`sendChannelMode()`]{@link #sendChannelMode} method
     * for more info.
     *
     * To view a list of all available **control change** messages, please consult [Table 3 - Control
     * Change Messages](https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
     * from the MIDI specification.
     *
     * @param controller {number|string} The MIDI controller name or number (0-127).
     *
     * @param [value=0] {number} The value to send (0-127).
     *
     * @param {object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} Controller numbers must be between 0 and 127.
     * @throws {RangeError} Invalid controller name.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     */
    sendControlChange(controller, value, options = {}, legacy = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
          const channels = options;
          options = legacy;
          options.channels = channels;
          if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
        }

      }

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendControlChange(controller, value, options);
      });

      return this;

    };

    /**
     * Sends a **pitch bend range** message to the specified channel(s) at the scheduled time so that
     * they adjust the range used by their pitch bend lever. The range is specified by using the
     * `semitones` and `cents` parameters. For example, setting the `semitones` parameter to `12`
     * means that the pitch bend range will be 12 semitones above and below the nominal pitch.
     *
     * @param {number} [semitones=0] The desired adjustment value in semitones (between `0` and `127`).
     * While nothing imposes that in the specification, it is very common for manufacturers to limit
     * the range to 2 octaves (-12 semitones to 12 semitones).
     *
     * @param {number} [cents=0] The desired adjustment value in cents (integer between `0` and
     * `127`).
     *
     * @param {object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The msb value must be between 0 and 127.
     * @throws {RangeError} The lsb value must be between 0 and 127.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendPitchBendRange(semitones= 0, cents = 0, options = {}) {

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendPitchBendRange(semitones, cents, options);
      });

      return this;

    }


    /**
     * @private
     * @deprecated since version 3.0
     */
    setPitchBendRange(semitones = 0, cents = 0, channel = "all", options = {}) {

      if (wm.validation) {

        console.warn(
          "The setPitchBendRange() method is deprecated. Use sendPitchBendRange() instead."
        );

        options.channels = channel;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      }

      return this.sendPitchBendRange(semitones, cents, options);

    }

    /**
     * Sets the specified MIDI registered parameter to the desired value. The value is defined with
     * up to two bytes of data (msb, lsb) that each can go from `0` to `127`.
     *
     * MIDI
     * [registered parameters](https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2)
     * extend the original list of control change messages. The MIDI 1.0 specification lists only a
     * limited number of them:
     *
     * | Numbers      | Function                 |
     * |--------------|--------------------------|
     * | (0x00, 0x00) | `pitchbendrange`         |
     * | (0x00, 0x01) | `channelfinetuning`      |
     * | (0x00, 0x02) | `channelcoarsetuning`    |
     * | (0x00, 0x03) | `tuningprogram`          |
     * | (0x00, 0x04) | `tuningbank`             |
     * | (0x00, 0x05) | `modulationrange`        |
     * | (0x3D, 0x00) | `azimuthangle`           |
     * | (0x3D, 0x01) | `elevationangle`         |
     * | (0x3D, 0x02) | `gain`                   |
     * | (0x3D, 0x03) | `distanceratio`          |
     * | (0x3D, 0x04) | `maximumdistance`        |
     * | (0x3D, 0x05) | `maximumdistancegain`    |
     * | (0x3D, 0x06) | `referencedistanceratio` |
     * | (0x3D, 0x07) | `panspreadangle`         |
     * | (0x3D, 0x08) | `rollangle`              |
     *
     * Note that the `tuningprogram` and `tuningbank` parameters are part of the *MIDI Tuning
     * Standard*, which is not widely implemented.
     *
     * @param parameter {string|number[]} A string identifying the parameter's name (see above) or a
     * two-position array specifying the two control bytes (e.g. `[0x65, 0x64]`) that identify the
     * registered parameter.
     *
     * @param [data=[]] {number|number[]} A single integer or an array of integers with a maximum
     * length of 2 specifying the desired data.
     *
     * @param {object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendRpnValue(parameter, data, options = {}) {

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendRpnValue(parameter, data, options);
      });

      return this;

    }

    /**
     * @private
     * @deprecated since version 3.0
     */
    setRegisteredParameter(parameter, data = [], channel = "all", options = {}) {

      if (wm.validation) {

        console.warn(
          "The setRegisteredParameter() method is deprecated. Use sendRpnValue() instead."
        );

        options.channels = channel;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      }

      return this.sendRpnValue(parameter, data, options);

    }

    /**
     * Sends a MIDI **channel aftertouch** message to the specified channel(s). For key-specific
     * aftertouch, you should instead use [`setKeyAftertouch()`]{@link #setKeyAftertouch}.
     *
     * @param [pressure=0.5] {number} The pressure level (between `0` and `1`). An invalid pressure
     * value will silently trigger the default behaviour. If the `rawValue` option is set to `true`,
     * the pressure can be defined by using an integer between `0` and `127`.
     *
     * @param {object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
     * considered a float between `0` and `1.0` (default) or a raw integer between `0` and `127`.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     * @since 3.0.0
     */
    sendChannelAftertouch(pressure, options = {}, legacy = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
          const channels = options;
          options = legacy;
          options.channels = channels;
          if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
        }

      }

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendChannelAftertouch(pressure, options);
      });

      return this;

    }

    /**
     * Sends a MIDI **pitch bend** message to the specified channel(s) at the scheduled time.
     *
     * The resulting bend is relative to the pitch bend range that has been defined. The range can be
     * set with [`sendPitchBendRange()`]{@link #sendPitchBendRange}. So, for example, if the pitch
     * bend range has been set to 12 semitones, using a bend value of `-1` will bend the note 1 octave
     * below its nominal value.
     *
     * @param {number|number[]} value The intensity of the bend (between `-1.0` and `1.0`). A value of
     * `0` means no bend. If an invalid value is specified, the nearest valid value will be used
     * instead. If the `rawValue` option is set to `true`, the intensity of the bend can be defined by
     * either using a single integer between `0` and `127` (MSB) or an array of two integers between
     * `0` and `127` representing, respectively, the MSB (most significant byte) and the LSB (least
     * significant byte). The MSB is expressed in semitones with `64` meaning no bend. A value lower
     * than `64` bends downwards while a value higher than `64` bends upwards. The LSB is expressed
     * in cents (1/100 of a semitone). An LSB of `64` also means no bend.
     *
     * @param {object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {boolean} [options.rawValue=false] A boolean indicating whether the value should be
     * considered as a float between `-1.0` and `1.0` (default) or as raw integer between `0` and
     * 127` (or an array of 2 integers if using both MSB and LSB).
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendPitchBend(value, options = {}, legacy = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
          const channels = options;
          options = legacy;
          options.channels = channels;
          if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
        }

      }

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendPitchBend(value, options);
      });

      return this;

    }

    /**
     * Sends a MIDI **program change** message to the specified channel(s) at the scheduled time.
     *
     * @param {number} [program=0] The MIDI patch (program) number (integer between `0` and `127`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {TypeError} Failed to execute 'send' on 'MIDIOutput': The value at index 1 is greater
     * than 0xFF.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendProgramChange(program = 0, options = {}, legacy = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
          const channels = options;
          options = legacy;
          options.channels = channels;
          if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
        }

      }

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendProgramChange(program, options);
      });

      return this;

    }

    /**
     * Sends a **modulation depth range** message to the specified channel(s) so that they adjust the
     * depth of their modulation wheel's range. The range can be specified with the `semitones`
     * parameter, the `cents` parameter or by specifying both parameters at the same time.
     *
     * @param [semitones=0] {number} The desired adjustment value in semitones (integer between
     * 0 and 127).
     *
     * @param [cents=0] {number} The desired adjustment value in cents (integer between 0 and 127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The msb value must be between 0 and 127
     * @throws {RangeError} The lsb value must be between 0 and 127
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendModulationRange(semitones, cents, options = {}) {

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendModulationRange(semitones, cents, options);
      });

      return this;

    };

    /**
     * @private
     * @deprecated since version 3.0
     */
    setModulationRange(semitones = 0, cents = 0, channel = "all", options = {}) {

      if (wm.validation) {

        console.warn(
          "The setModulationRange() method is deprecated. Use sendModulationRange() instead."
        );

        options.channels = channel;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      }

      return this.sendModulationRange(semitones, cents, options);

    }

    /**
     * Sends a master tuning message to the specified channel(s). The value is decimal and must be
     * larger than `-65` semitones and smaller than `64` semitones.
     *
     * Because of the way the MIDI specification works, the decimal portion of the value will be
     * encoded with a resolution of 14bit. The integer portion must be between -64 and 63
     * inclusively. This function actually generates two MIDI messages: a **Master Coarse Tuning** and
     * a **Master Fine Tuning** RPN messages.
     *
     * @param [value=0.0] {number} The desired decimal adjustment value in semitones (-65 < x < 64)
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The value must be a decimal number between larger than -65 and smaller
     * than 64.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendMasterTuning(value, options = {}) {

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendMasterTuning(value, options);
      });

      return this;

    }

    /**
     * @private
     * @deprecated since version 3.0
     */
    setMasterTuning(value, channel = {}, options = {}) {

      if (wm.validation) {

        console.warn(
          "The setMasterTuning() method is deprecated. Use sendMasterTuning() instead."
        );

        options.channels = channel;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      }

      return this.sendMasterTuning(value, options);

    }

    /**
     * Sets the MIDI tuning program to use. Note that the **Tuning Program** parameter is part of the
     * *MIDI Tuning Standard*, which is not widely implemented.
     *
     * @param value {number} The desired tuning program (integer between `0` and `127`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The program value must be between 0 and 127.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendTuningProgram(value, options = {}) {

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendTuningProgram(value, options);
      });

      return this;

    }

    /**
     * @private
     * @deprecated since version 3.0
     */
    setTuningProgram(value, channel = "all", options = {}) {

      if (wm.validation) {

        console.warn(
          "The setTuningProgram() method is deprecated. Use sendTuningProgram() instead."
        );

        options.channels = channel;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      }

      return this.sendTuningProgram(value, options);

    }

    /**
     * Sets the MIDI tuning bank to use. Note that the **Tuning Bank** parameter is part of the
     * *MIDI Tuning Standard*, which is not widely implemented.
     *
     * @param {number} [value=0] The desired tuning bank (integer between `0` and `127`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The bank value must be between 0 and 127.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendTuningBank(value= 0, options = {}) {

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendTuningBank(value, options);
      });

      return this;

    };

    /**
     * @private
     * @deprecated since version 3.0
     */
    setTuningBank(parameter, channel = "all", options = {}) {

      if (wm.validation) {

        console.warn(
          "The setTuningBank() method is deprecated. Use sendTuningBank() instead."
        );

        options.channels = channel;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      }

      return this.sendTuningBank(parameter, options);

    }

    /**
     * Sends a MIDI **channel mode** message to the specified channel(s). The channel mode message to
     * send can be specified numerically or by using one of the following common names:
     *
     * |  Type                |Number| Shortcut Method                                               |
     * | ---------------------|------|-------------------------------------------------------------- |
     * | `allsoundoff`        | 120  | [`sendAllSoundOff()`]{@link #sendAllSoundOff}                 |
     * | `resetallcontrollers`| 121  | [`sendResetAllControllers()`]{@link #sendResetAllControllers} |
     * | `localcontrol`       | 122  | [`sendLocalControl()`]{@link #sendLocalControl}               |
     * | `allnotesoff`        | 123  | [`sendAllNotesOff()`]{@link #sendAllNotesOff}                 |
     * | `omnimodeoff`        | 124  | [`sendOmniMode(false)`]{@link #sendOmniMode}                  |
     * | `omnimodeon`         | 125  | [`sendOmniMode(true)`]{@link #sendOmniMode}                   |
     * | `monomodeon`         | 126  | [`sendPolyphonicMode("mono")`]{@link #sendPolyphonicMode}     |
     * | `polymodeon`         | 127  | [`sendPolyphonicMode("poly")`]{@link #sendPolyphonicMode}     |
     *
     * Note: as you can see above, to make it easier, all channel mode messages also have a matching
     * helper method.
     *
     * It should also be noted that, per the MIDI specification, only `localcontrol` and `monomodeon`
     * may require a value that's not zero. For that reason, the `value` parameter is optional and
     * defaults to 0.
     *
     * @param {number|string} command The numerical identifier of the channel mode message (integer
     * between 120-127) or its name as a string.
     *
     * @param {number} [value=0] The value to send (integer between 0-127).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {TypeError} Invalid channel mode message name.
     * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
     * @throws {RangeError} Value must be an integer between 0 and 127.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     */
    sendChannelMode(command, value = 0, options = {}, legacy = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
          const channels = options;
          options = legacy;
          options.channels = channels;
          if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
        }

      }

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendChannelMode(command, value, options);
      });

      return this;

    }

    /**
     * Sends an **all sound off** channel mode message. This will silence all sounds playing on that
     * channel but will not prevent new sounds from being triggered.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output}
     *
     * @since 3.0.0
     */
    sendAllSoundOff(options = {}) {

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendAllSoundOff(options);
      });

      return this;

    }

    /**
     * Sends an **all notes off** channel mode message. This will make all currently playing notes
     * fade out just as if their key had been released. This is different from the
     * [`turnSoundOff()`]{@link #turnSoundOff} method which mutes all sounds immediately.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output}
     *
     * @since 3.0.0
     */
    sendAllNotesOff(options = {}) {

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendAllNotesOff(options);
      });

      return this;

    }

    /**
     * Sends a **reset all controllers** channel mode message. This resets all controllers, such as
     * the pitch bend, to their default value.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output}
     */
    sendResetAllControllers(options = {}, legacy = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
          const channels = options;
          options = legacy;
          options.channels = channels;
          if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
        }

      }

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendResetAllControllers(options);
      });

      return this;

    }

    /**
     * Sets the polyphonic mode. In `poly` mode (usually the default), multiple notes can be played
     * and heard at the same time. In `mono` mode, only one note will be heard at once even if
     * multiple notes are being played.
     *
     * @param mode {string} The mode to use: `mono` or `poly`.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendPolyphonicMode(mode, options = {}, legacy = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
          const channels = options;
          options = legacy;
          options.channels = channels;
          if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
        }

      }

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendPolyphonicMode(mode, options);
      });

      return this;

    }

    /**
     * Turns local control on or off. Local control is usually enabled by default. If you disable it,
     * the instrument will no longer trigger its own sounds. It will only send the MIDI messages to
     * its out port.
     *
     * @param [state=false] {boolean} Whether to activate local control (`true`) or disable it
     * (`false`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendLocalControl(state, options = {}, legacy = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
          const channels = options;
          options = legacy;
          options.channels = channels;
          if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
        }

      }

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendLocalControl(state, options);
      });

      return this;

    }

    /**
     * Sets OMNI mode to **on** or **off** for the specified channel(s). MIDI's OMNI mode causes the
     * instrument to respond to messages from all channels.
     *
     * It should be noted that support for OMNI mode is not as common as it used to be.
     *
     * @param [state] {boolean} Whether to activate OMNI mode (`true`) or not (`false`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {TypeError} Invalid channel mode message name.
     * @throws {RangeError} Channel mode controller numbers must be between 120 and 127.
     * @throws {RangeError} Value must be an integer between 0 and 127.
     *
     * @return {Output} Returns the `Output` object so methods can be chained.
     *
     * @since 3.0.0
     */
    sendOmniMode(state, options = {}, legacy = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
          const channels = options;
          options = legacy;
          options.channels = channels;
          if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
        }

      }

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendOmniMode(state, options);
      });

      return this;

    }

    /**
     * Sets a non-registered parameter to the specified value. The NRPN is selected by passing a
     * two-position array specifying the values of the two control bytes. The value is specified by
     * passing a single integer (most cases) or an array of two integers.
     *
     * NRPNs are not standardized in any way. Each manufacturer is free to implement them any way
     * they see fit. For example, according to the Roland GS specification, you can control the
     * **vibrato rate** using NRPN (`1`, `8`). Therefore, to set the **vibrato rate** value to `123`
     * you would use:
     *
     * ```js
     * WebMidi.outputs[0].sendNrpnValue([1, 8], 123);
     * ```
     *
     * You probably want to should select a channel so the message is not sent to all channels. For
     * instance, to send to channel `1` of the first output port, you would use:
     *
     * ```js
     * WebMidi.outputs[0].sendNrpnValue([1, 8], 123, 1);
     * ```
     *
     * In some rarer cases, you need to send two values with your NRPN messages. In such cases, you
     * would use a 2-position array. For example, for its **ClockBPM** parameter (`2`, `63`), Novation
     * uses a 14-bit value that combines an MSB and an LSB (7-bit values). So, for example, if the
     * value to send was `10`, you could use:
     *
     * ```js
     * WebMidi.outputs[0].sendNrpnValue([2, 63], [0, 10], 1);
     * ```
     *
     * For further implementation details, refer to the manufacturer's documentation.
     *
     * @param parameter {number[]} A two-position array specifying the two control bytes (`0x63`,
     * `0x62`) that identify the non-registered parameter.
     *
     * @param [data=[]] {number|number[]} An integer or an array of integers with a length of 1 or 2
     * specifying the desired data.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws {RangeError} The control value must be between 0 and 127.
     * @throws {RangeError} The msb value must be between 0 and 127
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendNrpnValue(parameter, data, options = {}) {

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendNrpnValue(parameter, data, options);
      });

      return this;

    }

    /**
     * @private
     * @deprecated since version 3.0
     */
    setNonRegisteredParameter(parameter, data = [], channel = "all", options = {}) {

      if (wm.validation) {

        console.warn(
          "The setNonRegisteredParameter() method is deprecated. Use sendNrpnValue() instead."
        );

        options.channels = channel;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      }

      return this.sendNrpnValue(parameter, data, options);

    }

    /**
     * Increments the specified MIDI registered parameter by 1. Here is the full list of parameter
     * names that can be used with this method:
     *
     *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
     *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
     *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
     *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
     *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
     *  * Modulation Range (0x00, 0x05): `"modulationrange"`
     *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
     *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
     *  * Gain (0x3D, 0x02): `"gain"`
     *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
     *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
     *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
     *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
     *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
     *  * Roll Angle (0x3D, 0x08): `"rollangle"`
     *
     * @param parameter {String|number[]} A string identifying the parameter's name (see above) or a
     * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
     * parameter.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendRpnIncrement(parameter, options = {}) {

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendRpnIncrement(parameter, options);
      });

      return this;

    }

    /**
     * @private
     * @deprecated since version 3.0
     */
    incrementRegisteredParameter(parameter, channel = "all", options = {}) {

      if (wm.validation) {

        console.warn(
          "The incrementRegisteredParameter() method is deprecated. Use sendRpnIncrement() instead."
        );

        options.channels = channel;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      }

      return this.sendRpnIncrement(parameter, options);

    }

    /**
     * Decrements the specified MIDI registered parameter by 1. Here is the full list of parameter
     * names that can be used with this method:
     *
     *  * Pitchbend Range (0x00, 0x00): `"pitchbendrange"`
     *  * Channel Fine Tuning (0x00, 0x01): `"channelfinetuning"`
     *  * Channel Coarse Tuning (0x00, 0x02): `"channelcoarsetuning"`
     *  * Tuning Program (0x00, 0x03): `"tuningprogram"`
     *  * Tuning Bank (0x00, 0x04): `"tuningbank"`
     *  * Modulation Range (0x00, 0x05): `"modulationrange"`
     *  * Azimuth Angle (0x3D, 0x00): `"azimuthangle"`
     *  * Elevation Angle (0x3D, 0x01): `"elevationangle"`
     *  * Gain (0x3D, 0x02): `"gain"`
     *  * Distance Ratio (0x3D, 0x03): `"distanceratio"`
     *  * Maximum Distance (0x3D, 0x04): `"maximumdistance"`
     *  * Maximum Distance Gain (0x3D, 0x05): `"maximumdistancegain"`
     *  * Reference Distance Ratio (0x3D, 0x06): `"referencedistanceratio"`
     *  * Pan Spread Angle (0x3D, 0x07): `"panspreadangle"`
     *  * Roll Angle (0x3D, 0x08): `"rollangle"`
     *
     * @param parameter {String|number[]} A string identifying the parameter's name (see above) or a
     * two-position array specifying the two control bytes (0x65, 0x64) that identify the registered
     * parameter.
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @throws TypeError The specified parameter is not available.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendRpnDecrement(parameter, options = {}) {

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendRpnDecrement(parameter, options);
      });

      return this;

    }

    /**
     * @private
     * @deprecated since version 3.0
     */
    decrementRegisteredParameter(parameter, channel = "all", options = {}) {

      if (wm.validation) {

        console.warn(
          "The decrementRegisteredParameter() method is deprecated. Use sendRpnDecrement() instead."
        );

        options.channels = channel;
        if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      }

      return this.sendRpnDecrement(parameter, options);

    }

    /**
     * Sends a **note off** message for the specified MIDI note number on the specified channel(s).
     * The first parameter is the note to stop. It can be a single value or an array of the following
     * valid values:
     *
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *  - A [`Note`](Note) object
     *
     * The execution of the **note off** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * @param note {number|Note|string|number[]|Note[]|string[]} The note(s) to stop. The notes can be
     * specified by using a MIDI note number (`0` - `127`), a note identifier (e.g. `C3`, `G#4`,
     * `F-1`, `Db7`) or an array of the previous types. When using a note identifier, octave range
     * must be between `-1` and `9`. The lowest note is `C-1` (MIDI note number `0`) and the highest
     * note is `G9` (MIDI note number `127`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number} [options.release=0.5] The velocity at which to release the note
     * (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have
     * priority. An invalid velocity value will silently trigger the default of `0.5`.
     *
     * @param {number} [options.rawRelease=64] The velocity at which to release the note
     * (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have
     * priority. An invalid velocity value will silently trigger the default of `64`.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendNoteOff(note, options= {}, legacy = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
          const channels = options;
          options = legacy;
          options.channels = channels;
          if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
        }

      }

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendNoteOff(note, options);
      });

      return this;

    }

    /**
     * Sends a **note off** message for the specified MIDI note number on the specified channel(s).
     * The first parameter is the note to stop. It can be a single value or an array of the following
     * valid values:
     *
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *  - A [`Note`](Note) object
     *
     * The execution of the **note off** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * @param note {number|Note|string|number[]|Note[]|string[]} The note(s) to stop. The notes can be
     * specified by using a MIDI note number (`0` - `127`), a note identifier (e.g. `C3`, `G#4`, `F-1`,
     * `Db7`) or an array of the previous types. When using a note identifier, octave range must be
     * between `-1` and `9`. The lowest note is `C-1` (MIDI note number `0`) and the highest note is
     * `G9` (MIDI note number `127`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number} [options.release=0.5] The velocity at which to release the note
     * (between `0` and `1`).  If the `rawRelease` option is also defined, `rawRelease` will have
     * priority. An invalid velocity value will silently trigger the default of `0.5`.
     *
     * @param {number} [options.rawRelease=64] The velocity at which to release the note
     * (between `0` and `127`). If the `release` option is also defined, `rawRelease` will have
     * priority. An invalid velocity value will silently trigger the default of `64`.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    stopNote(note, options) {
      return this.sendNoteOff(note, options);
    }

    /**
     * Plays a note or an array of notes on one or more channels of this output. If you intend to play
     * notes on a single channel, you should probably use
     * [`OutputChannel.playNote()`](OutputChannel#playNote) instead.
     *
     * The first parameter is the note to play. It can be a single value or an array of the following
     * valid values:
     *
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *  - A [`Note`]{@link Note} object
     *
     * The `playNote()` method sends a **note on** MIDI message for all specified notes on all
     * specified channels. If no channel is specified, it will send to all channels. If a `duration`
     * is set in the `options` parameter or in the [`Note`]{@link Note} object's
     * [`duration`]{@link Note#duration} property, it will also schedule a **note off** message to end
     * the note after said duration. If no `duration` is set, the note will simply play until a
     * matching **note off** message is sent with [`stopNote()`]{@link #stopNote}.
     *
     * The execution of the **note on** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * When using [`Note`]{@link Note} objects, the durations and velocities defined in the
     * [`Note`]{@link Note} objects have precedence over the ones specified via the method's `options`
     * parameter.
     *
     * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
     * functionally equivalent to a **note off** message.
     *
     * @param note {number|string|Note|number[]|string[]|Note[]} The note(s) to play. The notes can be
     * specified by using a MIDI note number (0-127), a note identifier (e.g. C3, G#4, F-1, Db7), a
     * [`Note`]{@link Note} object or an array of the previous types. When using a note identifier,
     * octave range must be between -1 and 9. The lowest note is C-1 (MIDI note number `0`) and the
     * highest note is G9 (MIDI note number `127`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number} [options.duration=undefined] The number of milliseconds after which a
     * **note off** message will be scheduled. If left undefined, only a **note on** message is sent.
     *
     * @param {number} [options.attack=0.5] The velocity at which to play the note (between `0` and
     * `1`). If the `rawAttack` option is also defined, it will have priority. An invalid velocity
     * value will silently trigger the default of `0.5`.
     *
     * @param {number} [options.rawAttack=64] The attack velocity at which to play the note (between
     * `0` and `127`). This has priority over the `attack` property. An invalid velocity value will
     * silently trigger the default of 64.
     *
     * @param {number} [options.release=0.5] The velocity at which to release the note (between `0`
     * and `1`). If the `rawRelease` option is also defined, it will have priority. An invalid
     * velocity value will silently trigger the default of `0.5`. This is only used with the
     * **note off** event triggered when `options.duration` is set.
     *
     * @param {number} [options.rawRelease=64] The velocity at which to release the note (between `0`
     * and `127`). This has priority over the `release` property. An invalid velocity value will
     * silently trigger the default of 64. This is only used with the **note off** event triggered
     * when `options.duration` is set.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    playNote(note, options = {}, legacy = {}) {

      if (wm.validation) {

        // Legacy-compatibility warnings
        if (options.rawVelocity) {
          console.warn("The 'rawVelocity' option is deprecated. Use 'rawAttack' instead.");
        }

        if (options.velocity) {
          console.warn("The 'velocity' option is deprecated. Use 'velocity' instead.");
        }

        // Legacy compatibility
        if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
          const channels = options;
          options = legacy;
          options.channels = channels;
          if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
        }

      }

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].playNote(note, options);
      });

      return this;

    }

    /**
     * Sends a **note on** message for the specified MIDI note number on the specified channel(s). The
     * first parameter is the number. It can be a single value or an array of the following valid
     * values:
     *
     *  - A MIDI note number (integer between `0` and `127`)
     *  - A note identifier (e.g. `"C3"`, `"G#4"`, `"F-1"`, `"Db7"`)
     *  - A [`Note`](Note) object
     *
     *  The execution of the **note on** command can be delayed by using the `time` property of the
     * `options` parameter.
     *
     * **Note**: As per the MIDI standard, a **note on** message with an attack velocity of `0` is
     * functionally equivalent to a **note off** message.
     *
     * @param note {number|Note|string|number[]|Note[]|string[]} The note(s) to stop. The notes can be
     * specified by using a MIDI note number (`0` - `127`), a note identifier (e.g. `C3`, `G#4`, `F-1`,
     * `Db7`) or an array of the previous types. When using a note identifier, octave range must be
     * between `-1` and `9`. The lowest note is `C-1` (MIDI note number `0`) and the highest note is
     * `G9` (MIDI note number `127`).
     *
     * @param {Object} [options={}]
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * The MIDI channel number (between `1` and `16`) or an array of channel numbers to use. If no
     * channel is specified, all channels will be used.
     *
     * @param {number} [options.attack=0.5] The velocity at which to play the note (between `0` and
     * `1`).  If the `rawAttack` option is also defined, `rawAttack` will have priority. An invalid
     * velocity value will silently trigger the default of `0.5`.
     *
     * @param {number} [options.rawAttack=64] The velocity at which to release the note (between `0`
     * and `127`). If the `attack` option is also defined, `rawAttack` will have priority. An invalid
     * velocity value will silently trigger the default of `64`.
     *
     * @param {number|string} [options.time=(now)] If `time` is a string prefixed with `"+"` and
     * followed by a number, the message will be delayed by that many milliseconds. If the value is a
     * positive number
     * ([`DOMHighResTimeStamp`]{@link https://developer.mozilla.org/docs/Web/API/DOMHighResTimeStamp}),
     * the operation will be scheduled for that time. The current time can be retrieved with
     * [`WebMidi.time`]{@link WebMidi#time}. If `options.time` is omitted, or in the past, the
     * operation will be carried out as soon as possible.
     *
     * @returns {Output} Returns the `Output` object so methods can be chained.
     */
    sendNoteOn(note, options = {}, legacy = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (Array.isArray(options) || Number.isInteger(options) || options === "all") {
          const channels = options;
          options = legacy;
          options.channels = channels;
          if (options.channels === "all") options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;
        }

      }

      if (options.channels == undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      // This actually supports passing a Note object even if, semantically, this does not make sense.
      Utilities.sanitizeChannels(options.channels).forEach(ch => {
        this.channels[ch].sendNoteOn(note, options);
      });

      return this;

    }

    /**
     * Name of the MIDI output.
     *
     * @type {string}
     * @readonly
     */
    get name() {
      return this._midiOutput.name;
    }

    /**
     * ID string of the MIDI output. The ID is host-specific. Do not expect the same ID on different
     * platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
     * the same port.
     *
     * @type {string}
     * @readonly
     */
    get id() {
      return this._midiOutput.id;
    }

    /**
     * Output port's connection state: `pending`, `open` or `closed`.
     *
     * @type {string}
     * @readonly
     */
    get connection() {
      return this._midiOutput.connection;
    }

    /**
     * Name of the manufacturer of the device that makes this output port available.
     *
     * @type {string}
     * @readonly
     */
    get manufacturer() {
      return this._midiOutput.manufacturer;
    }

    /**
     * State of the output port: `connected` or `disconnected`.
     *
     * @type {string}
     * @readonly
     */
    get state() {
      return this._midiOutput.state;
    }

    /**
     * Type of the output port (it will always be: `output`).
     *
     * @type {string}
     * @readonly
     */
    get type() {
      return this._midiOutput.type;
    }

    /**
     * An integer to offset the octave of outgoing notes. By default, middle C (MIDI note number 60)
     * is placed on the 4th octave (C4).
     *
     * Note that this value is combined with the global offset value defined in
     * [`WebMidi.octaveOffset`](WebMidi#octaveOffset) (if any).
     *
     * @type {number}
     *
     * @since 3.0
     */
    get octaveOffset() {
      return this._octaveOffset;
    }
    set octaveOffset(value) {

      if (this.validation) {
        value = parseInt(value);
        if (isNaN(value)) throw new TypeError("The 'octaveOffset' property must be an integer.");
      }

      this._octaveOffset = value;

    }

  }

  /**
   * The `Forwarder` class allows the forwarding of MIDI messages to predetermined outputs. When you
   * call its [`forward()`](#forward) method, it will send the specified [`Message`](Message) object
   * to all the outputs listed in its [`destinations`](#destinations) property.
   *
   * If specific channels or message types have been defined in the [`channels`](#channels) or
   * [`types`](#types) properties, only messages matching the channels/types will be forwarded.
   *
   * While it can be manually instantiated, you are more likely to come across a `Forwarder` object as
   * the return value of the [`Input.addForwarder()`](Input#addForwarder) method.
   *
   * @license Apache-2.0
   * @since 3.0.0
   */
  class Forwarder {

    /**
     * Creates a `Forwarder` object.
     *
     * @param {Output|Output[]} [destinations=\[\]] An [`Output`](Output) object, or an array of such
     * objects, to forward the message to.
     *
     * @param {object} [options={}]
     * @param {string|string[]} [options.types=(all messages)] A MIDI message type or an array of such
     * types (`"noteon"`, `"controlchange"`, etc.), that the specified message must match in order to
     * be forwarded. If this option is not specified, all types of messages will be forwarded. Valid
     * messages are the ones found in either
     * [`MIDI_SYSTEM_MESSAGES`](Enumerations#MIDI_SYSTEM_MESSAGES)
     * or [`MIDI_CHANNEL_MESSAGES`](Enumerations#MIDI_CHANNEL_MESSAGES).
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * A MIDI channel number or an array of channel numbers that the message must match in order to be
     * forwarded. By default all MIDI channels are included (`1` to `16`).
     */
    constructor(destinations = [], options = {}) {

      /**
       * An array of [`Output`](Output) objects to forward the message to.
       * @type {Output[]}
       */
      this.destinations = [];

      /**
       * An array of message types (`"noteon"`, `"controlchange"`, etc.) that must be matched in order
       * for messages to be forwarded. By default, this array includes all
       * [`Enumerations.MIDI_SYSTEM_MESSAGES`](Enumerations#MIDI_SYSTEM_MESSAGES) and
       * [`Enumerations.MIDI_CHANNEL_MESSAGES`](Enumerations#MIDI_CHANNEL_MESSAGES).
       * @type {string[]}
       */
      this.types = [
        ...Object.keys(Enumerations.MIDI_SYSTEM_MESSAGES),
        ...Object.keys(Enumerations.MIDI_CHANNEL_MESSAGES)
      ];

      /**
       * An array of MIDI channel numbers that the message must match in order to be forwarded. By
       * default, this array includes all MIDI channels (`1` to `16`).
       * @type {number[]}
       */
      this.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      /**
       * Indicates whether message forwarding is currently suspended or not in this forwarder.
       * @type {boolean}
       */
      this.suspended = false;

      // Make sure parameters are arrays
      if (!Array.isArray(destinations)) destinations = [destinations];
      if (options.types && !Array.isArray(options.types)) options.types = [options.types];
      if (options.channels && !Array.isArray(options.channels)) options.channels = [options.channels];

      if (wm.validation) {

        // Validate destinations
        destinations.forEach(destination => {
          if ( !(destination instanceof Output) ) {
            throw new TypeError("Destinations must be of type 'Output'.");
          }
        });

        // Validate types
        if (options.types !== undefined) {

          options.types.forEach(type => {
            if (
              ! Enumerations.MIDI_SYSTEM_MESSAGES.hasOwnProperty(type) &&
              ! Enumerations.MIDI_CHANNEL_MESSAGES.hasOwnProperty(type)
            ) {
              throw new TypeError("Type must be a valid message type.");
            }
          });

        }

        // Validate channels
        if (options.channels !== undefined) {

          options.channels.forEach(channel => {
            if (! Enumerations.MIDI_CHANNEL_NUMBERS.includes(channel) ) {
              throw new TypeError("MIDI channel must be between 1 and 16.");
            }
          });

        }

      }

      this.destinations = destinations;
      if (options.types) this.types = options.types;
      if (options.channels) this.channels = options.channels;

    }

    /**
     * Sends the specified message to the forwarder's destination(s) if it matches the specified
     * type(s) and channel(s).
     *
     * @param {Message} message The [`Message`](Message) object to forward.
     */
    forward(message) {

      // Abort if forwarding is currently suspended
      if (this.suspended) return;

      // Abort if this message type should not be forwarded
      if (!this.types.includes(message.type)) return;

      // Abort if this channel should not be forwarded
      if (message.channel && !this.channels.includes(message.channel)) return;

      // Forward
      this.destinations.forEach(destination => {
        if (wm.validation && !(destination instanceof Output)) return;
        destination.send(message);
      });

    }

  }

  /**
   * The `InputChannel` class represents a single MIDI input channel (1-16) from a single input
   * device. This object is derived from the host's MIDI subsystem and should not be instantiated
   * directly.
   *
   * All 16 `InputChannel` objects can be found inside the input's [`channels`](Input#channels)
   * property.
   *
   * @fires InputChannel#midimessage
   * @fires InputChannel#unknownmessage
   *
   * @fires InputChannel#noteoff
   * @fires InputChannel#noteon
   * @fires InputChannel#keyaftertouch
   * @fires InputChannel#programchange
   * @fires InputChannel#event:controlchange-controllerxxx
   * @fires InputChannel#channelaftertouch
   * @fires InputChannel#pitchbend
   * @fires InputChannel#controlchange
   *
   * @fires InputChannel#allnotesoff
   * @fires InputChannel#allsoundoff
   * @fires InputChannel#localcontrol
   * @fires InputChannel#monomode
   * @fires InputChannel#omnimode
   * @fires InputChannel#resetallcontrollers
   *
   * @fires InputChannel#event:nrpn
   * @fires InputChannel#event:nrpn-dataentrycoarse
   * @fires InputChannel#event:nrpn-dataentryfine
   * @fires InputChannel#event:nrpn-databuttonincrement
   * @fires InputChannel#event:nrpn-databuttondecrement
   * @fires InputChannel#event:rpn
   * @fires InputChannel#event:rpn-dataentrycoarse
   * @fires InputChannel#event:rpn-dataentryfine
   * @fires InputChannel#event:rpn-databuttonincrement
   * @fires InputChannel#event:rpn-databuttondecrement
   *
   * @extends EventEmitter
   * @license Apache-2.0
   * @since 3.0.0
   */
  class InputChannel extends EventEmitter {

    /**
     * Creates an `InputChannel` object.
     *
     * @param {Input} input The [`Input`](Input) object this channel belongs to.
     * @param {number} number The channel's MIDI number (1-16).
     */
    constructor(input, number) {

      super();

      /**
       * @type {Input}
       * @private
       */
      this._input = input;

      /**
       * @type {number}
       * @private
       */
      this._number = number;

      /**
       * @type {number}
       * @private
       */
      this._octaveOffset = 0;

      /**
       * An array of messages that form the current NRPN sequence
       * @private
       * @type {Message[]}
       */
      this._nrpnBuffer = [];

      /**
       * An array of messages that form the current RPN sequence
       * @private
       * @type {Message[]}
       */
      this._rpnBuffer = [];

      /**
       * Indicates whether events for **Registered Parameter Number** and **Non-Registered Parameter
       * Number** should be dispatched. RPNs and NRPNs are composed of a sequence of specific
       * **control change** messages. When a valid sequence of such control change messages is
       * received, an [`rpn`](#event-rpn) or [`nrpn`](#event-nrpn) event will fire.
       *
       * If an invalid or out-of-order **control change** message is received, it will fall through
       * the collector logic and all buffered **control change** messages will be discarded as
       * incomplete.
       *
       * @type {boolean}
       */
      this.parameterNumberEventsEnabled = true;

      /**
       * Contains the current playing state of all MIDI notes of this channel (0-127). The state is
       * `true` for a currently playing note and `false` otherwise.
       * @type {boolean[]}
       */
      this.notesState = new Array(128).fill(false);

    }

    /**
     * Destroys the `InputChannel` by removing all listeners and severing the link with the MIDI
     * subsystem's input.
     */
    destroy() {
      this._input = null;
      this._number = null;
      this._octaveOffset = 0;
      this._nrpnBuffer = [];
      this.notesState = new Array(128).fill(false);
      this.parameterNumberEventsEnabled = false;
      this.removeListener();
    }

    /**
     * @param e MIDIMessageEvent
     * @private
     */
    _processMidiMessageEvent(e) {

      // Create and emit a new 'midimessage' event based on the incoming one
      const event = Object.assign({}, e);
      event.port = this.input;
      event.target = this;
      event.type = "midimessage";

      /**
       * Event emitted when a MIDI message of any kind is received by an `InputChannel`
       *
       * @event InputChannel#midimessage
       *
       * @type {object}
       *
       * @property {string} type `midimessage`
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       */
      this.emit(event.type, event);

      // Parse the inbound event for regular MIDI messages
      this._parseEventForStandardMessages(event);

    }

    /**
     * Parses incoming channel events and emit standard MIDI message events (noteon, noteoff, etc.)
     * @param e Event
     * @private
     */
    _parseEventForStandardMessages(e) {

      const event = Object.assign({}, e);
      event.type = event.message.type || "unknownmessage";

      const data1 = e.message.dataBytes[0];
      const data2 = e.message.dataBytes[1];

      if ( event.type === "noteoff" || (event.type === "noteon" && data2 === 0) ) {

        this.notesState[data1] = false;
        event.type = "noteoff"; // necessary for note on with 0 velocity

        /**
         * Event emitted when a **note off** MIDI message has been received on the channel.
         *
         * @event InputChannel#noteoff
         *
         * @type {object}
         * @property {string} type `noteoff`
         *
         * @property {InputChannel} target The object that dispatched the event.
         * @property {Input} port The `Input` that triggered the event.
         * @property {Message} message A [`Message`](Message) object containing information about the incoming
         * MIDI message.
         * @property {number} timestamp The moment
         * ([`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp))
         * when the event occurred (in milliseconds since the navigation start of the document).
         *
         * @property {object} note A [`Note`](Note) object containing information such as note name,
         * octave and release velocity.
         * @property {number} value The release velocity amount expressed as a float between 0 and 1.
         * @property {number} rawValue The release velocity amount expressed as an integer (between 0
         * and 127).
         */

        // The object created when a noteoff event arrives is a Note with an attack velocity of 0.
        event.note = new Note(
          Utilities.offsetNumber(
            data1, this.octaveOffset + this.input.octaveOffset + wm.octaveOffset
          ),
          {
            rawAttack: 0,
            rawRelease: data2,
          }
        );

        event.value = Utilities.from7bitToFloat(data2);
        event.rawValue = data2;

        // Those are kept for backwards-compatibility but are gone from the documentation. They will
        // be removed in future versions (@deprecated).
        event.velocity = event.note.release;
        event.rawVelocity = event.note.rawRelease;

      } else if (event.type === "noteon") {

        this.notesState[data1] = true;

        /**
         * Event emitted when a **note on** MIDI message has been received.
         *
         * @event InputChannel#noteon
         *
         * @type {object}
         * @property {string} type `noteon`
         * @property {InputChannel} target The object that dispatched the event.
         * @property {Input} port The `Input` that triggered the event.
         * @property {Message} message A [`Message`](Message) object containing information about the
         * incoming MIDI message.
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {object} note A [`Note`](Note) object containing information such as note name,
         * octave and release velocity.
         * @property {number} value The attack velocity amount expressed as a float between 0 and 1.
         * @property {number} rawValue The attack velocity amount expressed as an integer (between 0
         * and 127).
         */
        event.note = new Note(
          Utilities.offsetNumber(
            data1, this.octaveOffset + this.input.octaveOffset + wm.octaveOffset
          ),
          { rawAttack: data2 }
        );

        event.value = Utilities.from7bitToFloat(data2);
        event.rawValue = data2;

        // Those are kept for backwards-compatibility but are gone from the documentation. They will
        // be removed in future versions (@deprecated).
        event.velocity = event.note.attack;
        event.rawVelocity = event.note.rawAttack;

      } else if (event.type === "keyaftertouch") {

        /**
         * Event emitted when a **key-specific aftertouch** MIDI message has been received.
         *
         * @event InputChannel#keyaftertouch
         *
         * @type {object}
         * @property {string} type `"keyaftertouch"`
         *
         * @property {InputChannel} target The object that dispatched the event.
         * @property {Input} port The `Input` that triggered the event.
         * @property {Message} message A [`Message`](Message) object containing information about the
         * incoming MIDI message.
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {object} note A [`Note`](Note) object containing information such as note name
         * and number.
         * @property {number} value The aftertouch amount expressed as a float between 0 and 1.
         * @property {number} rawValue The aftertouch amount expressed as an integer (between 0 and
         * 127).
         */
        event.note = new Note(
          Utilities.offsetNumber(
            data1, this.octaveOffset + this.input.octaveOffset + wm.octaveOffset
          )
        );

        // Aftertouch value
        event.value = Utilities.from7bitToFloat(data2);
        event.rawValue = data2;

        // @deprecated
        event.identifier = event.note.identifier;
        event.key = event.note.number;
        event.rawKey = data1;

      } else if (event.type === "controlchange") {

        /**
         * Event emitted when a **control change** MIDI message has been received.
         *
         * @event InputChannel#controlchange
         *
         * @type {object}
         * @property {string} type `controlchange`
         * @property {string} subtype The type of control change message that was received.
         *
         * @property {InputChannel} target The object that dispatched the event.
         * @property {Input} port The `Input` that triggered the event.
         * @property {Message} message A [`Message`](Message) object containing information about the
         * incoming MIDI message.
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {object} controller
         * @property {object} controller.number The number of the controller.
         * @property {object} controller.name The usual name or function of the controller.
         * @property {number} value The value expressed as a float between 0 and 1.
         * @property {number} rawValue The value expressed as an integer (between 0 and 127).
         */
        event.controller = {
          number: data1,
          name: Utilities.getCcNameByNumber(data1)
        };

        event.subtype = event.controller.name || "controller" + data1;
        event.value = Utilities.from7bitToFloat(data2);
        event.rawValue = data2;

        /**
         * Event emitted when a **control change** MIDI message has been received and that message is
         * targeting the controller numbered "xxx". Of course, "xxx" should be replaced by a valid
         * controller number (0-127).
         *
         * @event InputChannel#controlchange-controllerxxx
         *
         * @type {object}
         * @property {string} type `controlchange-controllerxxx`
         * @property {string} subtype The type of control change message that was received.
         *
         * @property {InputChannel} target The object that dispatched the event.
         * @property {Input} port The `Input` that triggered the event.
         * @property {Message} message A [`Message`](Message) object containing information about the
         * incoming MIDI message.
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {object} controller
         * @property {object} controller.number The number of the controller.
         * @property {object} controller.name The usual name or function of the controller.
         * @property {number} value The value expressed as a float between 0 and 1.
         * @property {number} rawValue The value expressed as an integer (between 0 and 127).
         */
        const specificEvent = Object.assign({}, event);
        specificEvent.type = `${event.type}-controller${data1}`;
        delete specificEvent.subtype;
        this.emit(specificEvent.type, specificEvent);

        // Trigger channel mode message events (if appropriate)
        if (event.message.dataBytes[0] >= 120) this._parseChannelModeMessage(event);

        // Parse the inbound event to see if its part of an RPN/NRPN sequence
        if (
          this.parameterNumberEventsEnabled &&
          this._isRpnOrNrpnController(event.message.dataBytes[0])
        ) {
          this._parseEventForParameterNumber(event);
        }

      } else if (event.type === "programchange") {

        /**
         * Event emitted when a **program change** MIDI message has been received.
         *
         * @event InputChannel#programchange
         *
         * @type {object}
         * @property {string} type `programchange`
         *
         * @property {InputChannel} target The object that dispatched the event.
         * @property {Input} port The `Input` that triggered the event.
         * @property {Message} message A [`Message`](Message) object containing information about the
         * incoming MIDI message.
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {number} value The value expressed as an integer between 0 and 127.
         * @property {number} rawValue  The raw MIDI value expressed as an integer between 0 and 127.
         */
        event.value = data1;
        event.rawValue = event.value;

      } else if (event.type === "channelaftertouch") {

        /**
         * Event emitted when a control change MIDI message has been received.
         *
         * @event InputChannel#channelaftertouch
         *
         * @type {object}
         * @property {string} type `channelaftertouch`
         *
         * @property {InputChannel} target The object that dispatched the event.
         * @property {Input} port The `Input` that triggered the event.
         * @property {Message} message A [`Message`](Message) object containing information about the
         * incoming MIDI message.
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {number} value The value expressed as a float between 0 and 1.
         * @property {number} rawValue The raw MIDI value expressed as an integer between 0 and 127.
         */
        event.value = Utilities.from7bitToFloat(data1);
        event.rawValue = data1;

      } else if (event.type === "pitchbend") {

        /**
         * Event emitted when a pitch bend MIDI message has been received.
         *
         * @event InputChannel#pitchbend
         *
         * @type {object}
         * @property {string} type `pitchbend`
         *
         * @property {InputChannel} target The object that dispatched the event.
         * @property {Input} port The `Input` that triggered the event.
         * @property {Message} message A [`Message`](Message) object containing information about the
         * incoming MIDI message.
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         *
         * @property {number} value The value expressed as a float between 0 and 1.
         * @property {number} rawValue The raw MIDI value expressed as an integer (between 0 and
         * 16383).
         */
        event.value = ((data2 << 7) + data1 - 8192) / 8192;
        event.rawValue = (data2 << 7) + data1;

      } else {
        event.type = "unknownmessage";
      }

      this.emit(event.type, event);

    }

    /**
     * @param e {Object}
     * @private
     */
    _parseChannelModeMessage(e) {

      // Make a shallow copy of the incoming event so we can use it as the new event.
      const event = Object.assign({}, e);
      event.type = event.controller.name;

      /**
       * Event emitted when an "all sound off" channel-mode MIDI message has been received.
       *
       * @event InputChannel#allsoundoff
       *
       * @type {object}
       * @property {string} type `allsoundoff`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       */

      /**
       * Event emitted when a "reset all controllers" channel-mode MIDI message has been received.
       *
       * @event InputChannel#resetallcontrollers
       *
       * @type {object}
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       */

      /**
       * Event emitted when a "local control" channel-mode MIDI message has been received. The value
       * property of the event is set to either `true` (local control on) of `false` (local control
       * off).
       *
       * @event InputChannel#localcontrol
       *
       * @type {object}
       * @property {string} type `localcontrol`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {boolean} value For local control on, the value is `true`. For local control off,
       * the value is `false`.
       * @property {boolean} rawValue For local control on, the value is `127`. For local control off,
       * the value is `0`.
       */
      if (event.type === "localcontrol") {
        event.value = event.message.data[2] === 127 ? true : false;
        event.rawValue = event.message.data[2];
      }

      /**
       * Event emitted when an "all notes off" channel-mode MIDI message has been received.
       *
       * @event InputChannel#allnotesoff
       *
       * @type {object}
       * @property {string} type `allnotesoff`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       */

      /**
       * Event emitted when an "omni mode" channel-mode MIDI message has been received. The value
       * property of the event is set to either `true` (omni mode on) of `false` (omni mode off).
       *
       * @event InputChannel#omnimode
       *
       * @type {object}
       * @property {string} type `"omnimode"`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {boolean} value The value is `true` for omni mode on and false for omni mode off.
       * @property {boolean} rawValue The raw MIDI value
       */
      if (event.type === "omnimodeon") {
        event.type = "omnimode";
        event.value = true;
        event.rawValue = event.message.data[2];
      } else if (event.type === "omnimodeoff") {
        event.type = "omnimode";
        event.value = false;
        event.rawValue = event.message.data[2];
      }


      /**
       * Event emitted when a "mono/poly mode" MIDI message has been received. The value property of
       * the event is set to either `true` (mono mode on / poly mode off) or `false` (mono mode off /
       * poly mode on).
       *
       * @event InputChannel#monomode
       *
       * @type {object}
       * @property {string} type `monomode`
       *
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       *
       * @property {boolean} value The value is `true` for omni mode on and false for omni mode off.
       * @property {boolean} rawValue The raw MIDI value
       */
      if (event.type === "monomodeon") {
        event.type = "monomode";
        event.value = true;
        event.rawValue = event.message.data[2];
      } else if (event.type === "polymodeon") {
        event.type = "monomode";
        event.value = false;
        event.rawValue = event.message.data[2];
      }

      this.emit(event.type, event);

    }

    /**
     * Parses inbound events to identify RPN/NRPN sequences.
     * @param e Event
     * @private
     */
    _parseEventForParameterNumber(event) {

      // To make it more legible
      const controller = event.message.dataBytes[0];
      const value = event.message.dataBytes[1];
      const list = Enumerations.MIDI_CONTROL_CHANGE_MESSAGES;

      // A. Check if the message is the start of an RPN (101) or NRPN (99) parameter declaration.
      if (
        controller === list.nonregisteredparameterfine ||         // 99
        controller === list.registeredparameterfine               // 101
      ) {

        this._nrpnBuffer = [];
        this._rpnBuffer = [];

        if (controller === list.nonregisteredparameterfine) {     // 99
          this._nrpnBuffer = [event.message];
        } else {                                                  // 101
          // 127 is a reset so we ignore it
          if (value !== 127) this._rpnBuffer = [event.message];
        }

      // B. Check if the message is the end of an RPN (100) or NRPN (98) parameter declaration.
      } else if (
        controller === list.nonregisteredparametercoarse ||       // 98
        controller === list.registeredparametercoarse             // 100
      ) {

        if (controller === list.nonregisteredparametercoarse) {   // 98

          // Flush the other buffer (they are mutually exclusive)
          this._rpnBuffer = [];

          // Check if we are in sequence
          if (this._nrpnBuffer.length === 1) {
            this._nrpnBuffer.push(event.message);
          } else {
            this._nrpnBuffer = []; // out of sequence
          }

        } else {                                                  // 100

          // Flush the other buffer (they are mutually exclusive)
          this._nrpnBuffer = [];

          // 127 is a reset so we ignore it
          if (this._rpnBuffer.length === 1 && value !== 127) {
            this._rpnBuffer.push(event.message);
          } else {
            this._rpnBuffer = []; // out of sequence or reset
          }

        }

      // C. Check if the message is for data entry (6, 38, 96 or 97). Those messages trigger events.
      } else if (
        controller === list.dataentrycoarse ||                    // 6
        controller === list.dataentryfine ||                      // 38
        controller === list.databuttonincrement ||                // 96
        controller === list.databuttondecrement                   // 97
      ) {

        if (this._rpnBuffer.length === 2) {
          this._dispatchParameterNumberEvent(
            "rpn",
            this._rpnBuffer[0].dataBytes[1],
            this._rpnBuffer[1].dataBytes[1],
            event
          );
        } else if (this._nrpnBuffer.length === 2) {
          this._dispatchParameterNumberEvent(
            "nrpn",
            this._nrpnBuffer[0].dataBytes[1],
            this._nrpnBuffer[1].dataBytes[1],
            event
          );
        } else {
          this._nrpnBuffer = [];
          this._rpnBuffer = [];
        }

      }

    }

    /**
     * Indicates whether the specified controller can be part of an RPN or NRPN sequence
     * @param controller
     * @returns {boolean}
     * @private
     */
    _isRpnOrNrpnController(controller) {

      return controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.dataentrycoarse ||        //   6
        controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.dataentryfine ||               //  38
        controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.databuttonincrement ||         //  96
        controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.databuttondecrement ||         //  97
        controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.nonregisteredparametercoarse ||//  98
        controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.nonregisteredparameterfine ||  //  99
        controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.registeredparametercoarse ||   // 100
        controller === Enumerations.MIDI_CONTROL_CHANGE_MESSAGES.registeredparameterfine;       // 101

    }

    /**
     * @private
     */
    _dispatchParameterNumberEvent(type, paramMsb, paramLsb, e) {

      type = type === "nrpn" ? "nrpn" : "rpn";

      /**
       * Event emitted when an **RPN data entry coarse** message is received on the input. The
       * specific parameter to which the message applies can be found in the event's `parameter`
       * property. It is one of the ones defined in
       * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
       *
       * @event InputChannel#rpn-dataentrycoarse
       *
       * @type {object}
       *
       * @property {string} type `rpn-dataentrycoarse`
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {string} parameter The registered parameter's name
       * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
       * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when an **RPN data entry fine** message is received on the input. The
       * specific parameter to which the message applies can be found in the event's `parameter`
       * property. It is one of the ones defined in
       * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
       *
       * @event InputChannel#rpn-dataentryfine
       *
       * @type {object}
       *
       * @property {string} type `rpn-dataentryfine`
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {string} parameter The registered parameter's name
       * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
       * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when an **RPN data button increment** message is received on the input. The
       * specific parameter to which the message applies can be found in the event's `parameter`
       * property. It is one of the ones defined in
       * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
       *
       * @event InputChannel#rpn-databuttonincrement
       *
       * @type {object}
       *
       * @property {string} type `rpn-databuttonincrement`
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {string} parameter The registered parameter's name
       * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
       * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when an **RPN data button decrement** message is received on the input. The
       * specific parameter to which the message applies can be found in the event's `parameter`
       * property. It is one of the ones defined in
       * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
       *
       * @event InputChannel#rpn-databuttondecrement
       *
       * @type {object}
       *
       * @property {string} type `rpn-databuttondecrement`
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {string} parameter The registered parameter's name
       * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
       * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when an **NRPN data entry coarse** message is received on the input. The
       * specific parameter to which the message applies can be found in the event's `parameter`
       * property. It is one of the ones defined in
       * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
       *
       * @event InputChannel#nrpn-dataentrycoarse
       *
       * @type {object}
       *
       * @property {string} type `nrpn-dataentrycoarse`
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {string} parameter The registered parameter's name
       * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
       * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when an **NRPN data entry fine** message is received on the input. The
       * specific parameter to which the message applies can be found in the event's `parameter`
       * property. It is one of the ones defined in
       * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
       *
       * @event InputChannel#nrpn-dataentryfine
       *
       * @type {object}
       *
       * @property {string} type `nrpn-dataentryfine`
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {string} parameter The registered parameter's name
       * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
       * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when an **NRPN data button increment** message is received on the input. The
       * specific parameter to which the message applies can be found in the event's `parameter`
       * property. It is one of the ones defined in
       * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
       *
       * @event InputChannel#nrpn-databuttonincrement
       *
       * @type {object}
       *
       * @property {string} type `nrpn-databuttonincrement`
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {string} parameter The registered parameter's name
       * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
       * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when an **NRPN data button decrement** message is received on the input. The
       * specific parameter to which the message applies can be found in the event's `parameter`
       * property. It is one of the ones defined in
       * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
       *
       * @event InputChannel#nrpn-databuttondecrement
       *
       * @type {object}
       *
       * @property {string} type `nrpn-databuttondecrement`
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {string} parameter The registered parameter's name
       * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
       * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      const event = {
        target: e.target,
        timestamp: e.timestamp,
        message: e.message,
        parameterMsb: paramMsb,
        parameterLsb: paramLsb,
        value: Utilities.from7bitToFloat(e.message.dataBytes[1]),
        rawValue: e.message.dataBytes[1],
      };

      // Identify the parameter (by name for RPN and by number for NRPN)
      if (type === "rpn") {

        event.parameter = Object.keys(Enumerations.MIDI_REGISTERED_PARAMETERS).find(key => {
          return Enumerations.MIDI_REGISTERED_PARAMETERS[key][0] === paramMsb &&
            Enumerations.MIDI_REGISTERED_PARAMETERS[key][1] === paramLsb;
        });

      } else {
        event.parameter = (paramMsb << 7) + paramLsb;
      }

      // Type and subtype
      const subtype = Utilities.getPropertyByValue(
        Enumerations.MIDI_CONTROL_CHANGE_MESSAGES,
        e.message.dataBytes[0]
      );

      // Emit specific event
      event.type = `${type}-${subtype}`;
      this.emit(event.type, event);

      /**
       * Event emitted when any NRPN message is received on the input. There are four subtypes of NRPN
       * messages:
       *
       *   * `nrpn-dataentrycoarse`
       *   * `nrpn-dataentryfine`
       *   * `nrpn-databuttonincrement`
       *   * `nrpn-databuttondecrement`
       *
       * The parameter to which the message applies can be found in the event's `parameter` property.
       *
       * @event InputChannel#nrpn
       *
       * @type {object}
       *
       * @property {string} type `nrpn`
       * @property {string} subtype The precise type of NRPN message that was received.
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} parameter The non-registered parameter number (0-16383)
       * @property {number} parameterMsb The MSB portion of the non-registered parameter number
       * (0-127)
       * @property {number} parameterLsb: The LSB portion of the non-registered parameter number
       * (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      /**
       * Event emitted when any RPN message is received on the input. There are four subtypes of RPN
       * messages:
       *
       *   * `rpn-dataentrycoarse`
       *   * `rpn-dataentryfine`
       *   * `rpn-databuttonincrement`
       *   * `rpn-databuttondecrement`
       *
       * The parameter to which the message applies can be found in the event's `parameter` property.
       * It is one of the ones defined in
       * [`Enumerations.MIDI_REGISTERED_PARAMETERS`](Enumerations#MIDI_REGISTERED_PARAMETERS).
       *
       * @event InputChannel#rpn
       *
       * @type {object}
       *
       * @property {string} type `rpn`
       * @property {string} subtype The precise type of RPN message that was received.
       * @property {InputChannel} target The object that dispatched the event.
       * @property {Input} port The `Input` that triggered the event.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {string} parameter The registered parameter's name
       * @property {number} parameterMsb The MSB portion of the registered parameter (0-127)
       * @property {number} parameterLsb: The LSB portion of the registered parameter (0-127)
       * @property {number} value The received value as a normalized number between 0 and 1.
       * @property {number} rawValue The value as received (0-127)
       */

      // Emit general event
      event.type = type;
      event.subtype = subtype;
      this.emit(event.type, event);

    }

    /**
     * @deprecated since version 3.
     * @private
     */
    getChannelModeByNumber(number) {

      if (wm.validation) {
        console.warn(
          "The 'getChannelModeByNumber()' method has been moved to the 'Utilities' class."
        );
        number = Math.floor(number);
      }

      return Utilities.getChannelModeByNumber(number);

    }

    /**
     * @deprecated since version 3.
     * @private
     */
    getCcNameByNumber(number) {

      if (wm.validation) {
        console.warn(
          "The 'getCcNameByNumber()' method has been moved to the 'Utilities' class."
        );
        number = parseInt(number);
        if ( !(number >= 0 && number <= 127) ) throw new RangeError("Invalid control change number.");
      }

      return Utilities.getCcNameByNumber(number);

    }

    /**
     * Returns the playing status of the specified note (`true` if the note is currently playing,
     * `false` if it is not). The `note` parameter can be an unsigned integer (0-127), a note
     * identifier (`"C4"`, `"G#5"`, etc.) or a [`Note`]{@link Note} object.
     *
     * IF the note is specified using an integer (0-127), no octave offset will be applied.
     *
     * @param {number|string|Note} note The note to get the state for. The
     * [`octaveOffset`](#octaveOffset) (channel, input and global) will be factored in for note
     * identifiers and [`Note`]{@link Note} objects.
     * @returns {boolean}
     * @since version 3.0.0
     */
    getNoteState(note) {

      // If it's a note object, we simply use the identifier
      if (note instanceof Note) note = note.identifier;

      const number = Utilities.guessNoteNumber(
        note,
        wm.octaveOffset + this.input.octaveOffset + this.octaveOffset
      );

      return this.notesState[number];

    }

    /**
     * An integer to offset the reported octave of incoming note-specific messages (`noteon`,
     * `noteoff` and `keyaftertouch`). By default, middle C (MIDI note number 60) is placed on the 4th
     * octave (C4).
     *
     * If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
     * `octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.
     *
     * Note that this value is combined with the global offset value defined by
     * [`WebMidi.octaveOffset`](WebMidi#octaveOffset) object and with the value defined on the parent
     * input object with [`Input.octaveOffset`](Input#octaveOffset).
     *
     * @type {number}
     *
     * @since 3.0
     */
    get octaveOffset() {
      return this._octaveOffset;
    }
    set octaveOffset(value) {

      if (this.validation) {
        value = parseInt(value);
        if (isNaN(value)) throw new TypeError("The 'octaveOffset' property must be an integer.");
      }

      this._octaveOffset = value;

    }

    /**
     * The [`Input`](Input) this channel belongs to.
     * @type {Input}
     * @since 3.0
     */
    get input() {
      return this._input;
    }

    /**
     * This channel's MIDI number (1-16).
     * @type {number}
     * @since 3.0
     */
    get number() {
      return this._number;
    }

    /**
     * Whether RPN/NRPN events are parsed and dispatched.
     * @type {boolean}
     * @since 3.0
     * @deprecated Use parameterNumberEventsEnabled instead.
     * @private
     */
    get nrpnEventsEnabled() {
      return this.parameterNumberEventsEnabled;
    }
    set nrpnEventsEnabled(value) {

      if (this.validation) {
        value = !!value;
      }

      this.parameterNumberEventsEnabled = value;

    }

  }

  /**
   * The `Message` class represents a single MIDI message. It has several properties that make it
   * easy to make sense of the binary data it contains.
   *
   * @license Apache-2.0
   * @since 3.0.0
   */
  class Message {

    /**
     * Creates a new `Message` object from raw MIDI data.
     *
     * @param {Uint8Array} data The raw data of the MIDI message as a
     * [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
     * of integers between `0` and `255`.
     */
    constructor(data) {

      /**
       * A
       * [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
       * containing the bytes of the MIDI message. Each byte is an integer between `0` and `255`.
       *
       * @type {Uint8Array}
       * @readonly
       */
      this.rawData = data;

      /**
       * An array containing all the bytes of the MIDI message. Each byte is an integer between `0`
       * and `255`.
       *
       * @type {number[]}
       * @readonly
       */
      this.data = Array.from(this.rawData);

      /**
       * The MIDI status byte of the message as an integer between `0` and `255`.
       *
       * @type {number}
       * @readonly
       */
      this.statusByte = this.rawData[0];

      /**
       * A
       * [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
       * of the data byte(s) of the MIDI message. When the message is a system exclusive message
       * (sysex), `rawDataBytes` explicitly excludes the manufacturer ID and the sysex end byte so
       * only the actual data is included.
       *
       * @type {Uint8Array}
       * @readonly
       */
      this.rawDataBytes = this.rawData.slice(1);

      /**
       * An array of the the data byte(s) of the MIDI message (as opposed to the status byte). When
       * the message is a system exclusive message (sysex), `dataBytes` explicitly excludes the
       * manufacturer ID and the sysex end byte so only the actual data is included.
       *
       * @type {number[]}
       * @readonly
       */
      this.dataBytes = this.data.slice(1);

      /**
       * A boolean indicating whether the MIDI message is a channel-specific message.
       *
       * @type {boolean}
       * @readonly
       */
      this.isChannelMessage = false;

      /**
       * A boolean indicating whether the MIDI message is a system message (not specific to a
       * channel).
       *
       * @type {boolean}
       * @readonly
       */
      this.isSystemMessage = false;

      /**
       * An integer identifying the MIDI command. For channel-specific messages, the value is 4-bit
       * and will be between `8` and `14`. For system messages, the value will be between `240` and
       * `255`.
       *
       * @type {number}
       * @readonly
       */
      this.command = undefined;

      /**
       * The MIDI channel number (`1` - `16`) that the message is targeting. This is only for
       * channel-specific messages. For system messages, this will be left `undefined`.
       *
       * @type {number}
       * @readonly
       */
      this.channel = undefined;

      /**
       * When the message is a system exclusive message (sysex), this property contains an array with
       * either 1 or 3 entries that identify the manufacturer targeted by the message.
       *
       * To know how to translate these entries into manufacturer names, check out the official list:
       * https://www.midi.org/specifications-old/item/manufacturer-id-numbers
       *
       * @type {number[]}
       * @readonly
       */
      this.manufacturerId = undefined;

      /**
       * The type of message as a string (`"noteon"`, `"controlchange"`, `"sysex"`, etc.)
       *
       * @type {string}
       * @readonly
       */
      this.type = undefined;

      // Assign values to property that vary according to whether they are channel-specific or system
      if (this.statusByte < 240) {
        this.isChannelMessage = true;
        this.command = this.statusByte >> 4;
        this.channel = (this.statusByte & 0b00001111) + 1;
      } else {
        this.isSystemMessage = true;
        this.command = this.statusByte;
      }

      // Assign type (depending on whether the message is channel-specific or system)
      if (this.isChannelMessage) {
        this.type = Utilities.getPropertyByValue(Enumerations.MIDI_CHANNEL_MESSAGES, this.command);
      } else if (this.isSystemMessage) {
        this.type = Utilities.getPropertyByValue(Enumerations.MIDI_SYSTEM_MESSAGES, this.command);
      }

      // When the message is a sysex message, we add a manufacturer property and strip out the id from
      // dataBytes and rawDataBytes.
      if (this.statusByte === Enumerations.MIDI_SYSTEM_MESSAGES.sysex) {

        if (this.dataBytes[0] === 0) {
          this.manufacturerId = this.dataBytes.slice(0, 3);
          this.dataBytes = this.dataBytes.slice(3, this.rawDataBytes.length - 1);
          this.rawDataBytes = this.rawDataBytes.slice(3, this.rawDataBytes.length - 1);
        } else {
          this.manufacturerId = [this.dataBytes[0]];
          this.dataBytes = this.dataBytes.slice(1, this.dataBytes.length - 1);
          this.rawDataBytes = this.rawDataBytes.slice(1, this.rawDataBytes.length - 1);
        }

      }

    }

  }

  /**
   * The `Input` class represents a single MIDI input port. This object is automatically instantiated
   * by the library according to the host's MIDI subsystem and does not need to be directly
   * instantiated. Instead, you can access all `Input` objects by referring to the
   * [`WebMidi.inputs`](WebMidi#inputs) array. You can also retrieve inputs by using methods such as
   * [`WebMidi.getInputByName()`](WebMidi#getInputByName) and
   * [`WebMidi.getInputById()`](WebMidi#getInputById).
   *
   * Note that a single MIDI device may expose several inputs and/or outputs.
   *
   * **Important**: the `Input` class does not directly fire channel-specific MIDI messages
   * (such as [`noteon`](InputChannel#event:noteon) or
   * [`controlchange`](InputChannel#event:controlchange), etc.). The [`InputChannel`](InputChannel)
   * object does that. However, you can still use the
   * [`Input.addListener()`](#addListener) method to listen to channel-specific events on multiple
   * [`InputChannel`](InputChannel) objects at once.
   *
   * @fires Input#opened
   * @fires Input#disconnected
   * @fires Input#closed
   * @fires Input#midimessage
   *
   * @fires Input#sysex
   * @fires Input#timecode
   * @fires Input#songposition
   * @fires Input#songselect
   * @fires Input#tunerequest
   * @fires Input#clock
   * @fires Input#start
   * @fires Input#continue
   * @fires Input#stop
   * @fires Input#activesensing
   * @fires Input#reset
   *
   * @fires Input#unknownmidimessage
   *
   * @extends EventEmitter
   * @license Apache-2.0
   */
  class Input extends EventEmitter {

    /**
     * Creates an `Input` object.
     *
     * @param {MIDIInput} midiInput [`MIDIInput`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIInput)
     * object as provided by the MIDI subsystem (Web MIDI API).
     */
    constructor(midiInput) {

      super();

      /**
       * Reference to the actual MIDIInput object
       * @private
       */
      this._midiInput = midiInput;

      /**
       * @type {number}
       * @private
       */
      this._octaveOffset = 0;

      /**
       * Array containing the 16 [`InputChannel`](InputChannel) objects available for this `Input`. The
       * channels are numbered 1 through 16.
       *
       * @type {InputChannel[]}
       */
      this.channels = [];
      for (let i = 1; i <= 16; i++) this.channels[i] = new InputChannel(this, i);

      /**
       * @type {Forwarder[]}
       * @private
       */
      this._forwarders = [];

      // Setup listeners
      this._midiInput.onstatechange = this._onStateChange.bind(this);
      this._midiInput.onmidimessage = this._onMidiMessage.bind(this);

    }

    /**
     * Destroys the `Input` by removing all listeners, emptying the [`channels`](#channels) array and
     * unlinking the MIDI subsystem. This is mostly for internal use.
     *
     * @returns {Promise<void>}
     */
    async destroy() {
      this.removeListener();
      this.channels.forEach(ch => ch.destroy());
      this.channels = [];
      this._forwarders = [];
      if (this._midiInput) {
        this._midiInput.onstatechange = null;
        this._midiInput.onmidimessage = null;
      }
      await this.close();
      this._midiInput = null;
    }

    /**
     * Executed when a `"statechange"` event occurs.
     *
     * @param e
     * @private
     */
    _onStateChange(e) {

      let event = {
        timestamp: wm.time,
        target: this,
        port: this // for consistency
      };

      if (e.port.connection === "open") {

        /**
         * Event emitted when the `Input` has been opened by calling the [`open()`]{@link #open}
         * method.
         *
         * @event Input#opened
         * @type {object}
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         * @property {string} type `opened`
         * @property {Input} target The object that dispatched the event.
         * @property {Input} port The `Input` that triggered the event.
         */
        event.type = "opened";
        this.emit("opened", event);

      } else if (e.port.connection === "closed" && e.port.state === "connected") {

        /**
         * Event emitted when the `Input` has been closed by calling the
         * [`close()`]{@link #close} method.
         *
         * @event Input#closed
         * @type {object}
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         * @property {string} type `closed`
         * @property {Input} target The object that dispatched the event.
         * @property {Input} port The `Input` that triggered the event.
         */
        event.type = "closed";
        this.emit("closed", event);

      } else if (e.port.connection === "closed" && e.port.state === "disconnected") {

        /**
         * Event emitted when the `Input` becomes unavailable. This event is typically fired
         * when the MIDI device is unplugged.
         *
         * @event Input#disconnected
         * @type {object}
         * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
         * milliseconds since the navigation start of the document).
         * @property {string} type `disconnected`
         * @property {Input} port Object with properties describing the {@link Input} that was
         * disconnected. This is not the actual `Input` as it is no longer available.
         * @property {Input} target The object that dispatched the event.
         */
        event.type = "disconnected";
        event.port = {
          connection: e.port.connection,
          id: e.port.id,
          manufacturer: e.port.manufacturer,
          name: e.port.name,
          state: e.port.state,
          type: e.port.type
        };
        this.emit("disconnected", event);

      } else if (e.port.connection === "pending" && e.port.state === "disconnected") ; else {
        console.warn("This statechange event was not caught: ", e.port.connection, e.port.state);
      }

    }

    /**
     * Executed when a `"midimessage"` event is received
     * @param e
     * @private
     */
    _onMidiMessage(e) {

      // Create Message object from MIDI data
      const message = new Message(e.data);

      /**
       * Event emitted when any MIDI message is received on an `Input`.
       *
       * @event Input#midimessage
       *
       * @type {object}
       *
       * @property {Input} port The `Input` that triggered the event.
       * @property {Input} target The object that dispatched the event.
       * @property {Message} message A [`Message`](Message) object containing information about the
       * incoming MIDI message.
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {string} type `midimessage`
       *
       * @since 2.1
       */
      const event = {
        port: this,
        target: this,
        message: message,
        timestamp: e.timeStamp,
        type: "midimessage",

        data: message.data,           // @deprecated (will be removed in v4)
        rawData: message.data,        // @deprecated (will be removed in v4)
        statusByte: message.data[0],  // @deprecated (will be removed in v4)
        dataBytes: message.dataBytes  // @deprecated (will be removed in v4)
      };

      this.emit("midimessage", event);

      // Messages are forwarded to InputChannel if they are channel messages or parsed locally for
      // system messages.
      if (message.isSystemMessage) {           // system messages
        this._parseEvent(event);
      } else if (message.isChannelMessage) {   // channel messages
        this.channels[message.channel]._processMidiMessageEvent(event);
      }

      // Forward message if forwarders have been defined
      this._forwarders.forEach(forwarder => forwarder.forward(message));

    }

    /**
     * @private
     */
    _parseEvent(e) {

      // Make a shallow copy of the incoming event so we can use it as the new event.
      const event = Object.assign({}, e);
      event.type = event.message.type || "unknownmidimessage";

      // Add custom property for 'songselect'
      if (event.type === "songselect") {
        event.song = e.data[1] + 1; // deprecated
        event.value = e.data[1];
        event.rawValue = event.value;
      }

      // Emit event
      this.emit(event.type, event);

    }

    /**
     * Opens the input for usage. This is usually unnecessary as the port is opened automatically when
     * WebMidi is enabled.
     *
     * @returns {Promise<Input>} The promise is fulfilled with the `Input` object.
     */
    async open() {

      // Explicitly opens the port for usage. This is not mandatory. When the port is not explicitly
      // opened, it is implicitly opened (asynchronously) when assigning a listener to the
      // `onmidimessage` property of the `MIDIInput`. We do it explicitly so that 'connected' events
      // are dispatched immediately and that we are ready to listen.
      try {
        await this._midiInput.open();
      } catch (err) {
        return Promise.reject(err);
      }

      return Promise.resolve(this);

    }

    /**
     * Closes the input. When an input is closed, it cannot be used to listen to MIDI messages until
     * the input is opened again by calling [`Input.open()`](Input#open).
     *
     * **Note**: if what you want to do is stop events from being dispatched, you should use
     * [`eventsSuspended`](#eventsSuspended) instead.
     *
     * @returns {Promise<Input>} The promise is fulfilled with the `Input` object
     */
    async close() {

      // We close the port. This triggers a statechange event which, in turn, will emit the 'closed'
      // event.
      if (!this._midiInput) return Promise.resolve(this);

      try {
        await this._midiInput.close();
      } catch (err) {
        return Promise.reject(err);
      }

      return Promise.resolve(this);

    }

    /**
     * @private
     * @deprecated since v3.0.0 (moved to 'Utilities' class)
     */
    getChannelModeByNumber() {
      if (wm.validation) {
        console.warn(
          "The 'getChannelModeByNumber()' method has been moved to the 'Utilities' class."
        );
      }
    }

    /**
     * Adds an event listener that will trigger a function callback when the specified event is
     * dispatched. The event usually is **input-wide** but can also be **channel-specific**.
     *
     * Input-wide events do not target a specific MIDI channel so it makes sense to listen for them
     * at the `Input` level and not at the [`InputChannel`](InputChannel) level. Channel-specific
     * events target a specific channel. Usually, in this case, you would add the listener to the
     * [`InputChannel`](InputChannel) object. However, as a convenience, you can also listen to
     * channel-specific events directly on an `Input`. This allows you to react to a channel-specific
     * event no matter which channel it actually came through.
     *
     * When listening for an event, you simply need to specify the event name and the function to
     * execute:
     *
     * ```javascript
     * const listener = WebMidi.inputs[0].addListener("midimessage", e => {
     *   console.log(e);
     * });
     * ```
     *
     * Calling the function with an input-wide event (such as
     * [`"midimessage"`]{@link #event:midimessage}), will return the [`Listener`](Listener) object
     * that was created.
     *
     * If you call the function with a channel-specific event (such as
     * [`"noteon"`]{@link InputChannel#event:noteon}), it will return an array of all
     * [`Listener`](Listener) objects that were created (one for each channel):
     *
     * ```javascript
     * const listeners = WebMidi.inputs[0].addListener("noteon", someFunction);
     * ```
     *
     * You can also specify which channels you want to add the listener to:
     *
     * ```javascript
     * const listeners = WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [1, 2, 3]});
     * ```
     *
     * In this case, `listeners` is an array containing 3 [`Listener`](Listener) objects.
     *
     * Note that, when adding channel-specific listeners, it is the [`InputChannel`](InputChannel)
     * instance that actually gets a listener added and not the `Input` instance. You can check that
     * by calling [`InputChannel.hasListener()`](InputChannel#hasListener()).
     *
     * There are 8 families of events you can listen to:
     *
     * 1. **MIDI System Common** Events (input-wide)
     *
     *    * [`songposition`]{@link Input#event:songposition}
     *    * [`songselect`]{@link Input#event:songselect}
     *    * [`sysex`]{@link Input#event:sysex}
     *    * [`timecode`]{@link Input#event:timecode}
     *    * [`tunerequest`]{@link Input#event:tunerequest}
     *
     * 2. **MIDI System Real-Time** Events (input-wide)
     *
     *    * [`clock`]{@link Input#event:clock}
     *    * [`start`]{@link Input#event:start}
     *    * [`continue`]{@link Input#event:continue}
     *    * [`stop`]{@link Input#event:stop}
     *    * [`activesensing`]{@link Input#event:activesensing}
     *    * [`reset`]{@link Input#event:reset}
     *
     * 3. **State Change** Events (input-wide)
     *
     *    * [`opened`]{@link Input#event:opened}
     *    * [`closed`]{@link Input#event:closed}
     *    * [`disconnected`]{@link Input#event:disconnected}
     *
     * 4. **Catch-All** Events (input-wide)
     *
     *    * [`midimessage`]{@link Input#event:midimessage}
     *    * [`unknownmidimessage`]{@link Input#event:unknownmidimessage}
     *
     * 5. **Channel Voice** Events (channel-specific)
     *
     *    * [`channelaftertouch`]{@link InputChannel#event:channelaftertouch}
     *    * [`controlchange`]{@link InputChannel#event:controlchange}
     *      * [`controlchange-controller0`]{@link InputChannel#event:controlchange-controller0}
     *      * [`controlchange-controller1`]{@link InputChannel#event:controlchange-controller1}
     *      * [`controlchange-controller2`]{@link InputChannel#event:controlchange-controller2}
     *      * (...)
     *      * [`controlchange-controller127`]{@link InputChannel#event:controlchange-controller127}
     *    * [`keyaftertouch`]{@link InputChannel#event:keyaftertouch}
     *    * [`noteoff`]{@link InputChannel#event:noteoff}
     *    * [`noteon`]{@link InputChannel#event:noteon}
     *    * [`pitchbend`]{@link InputChannel#event:pitchbend}
     *    * [`programchange`]{@link InputChannel#event:programchange}
     *
     *    Note: you can listen for a specific control change message by using an event name like this:
     *    `controlchange-controller23`, `controlchange-controller99`, `controlchange-controller122`,
     *    etc.
     *
     * 6. **Channel Mode** Events (channel-specific)
     *
     *    * [`allnotesoff`]{@link InputChannel#event:allnotesoff}
     *    * [`allsoundoff`]{@link InputChannel#event:allsoundoff}
     *    * [`localcontrol`]{@link InputChannel#event:localcontrol}
     *    * [`monomode`]{@link InputChannel#event:monomode}
     *    * [`omnimode`]{@link InputChannel#event:omnimode}
     *    * [`resetallcontrollers`]{@link InputChannel#event:resetallcontrollers}
     *
     * 7. **NRPN** Events (channel-specific)
     *
     *    * [`nrpn`]{@link InputChannel#event:nrpn}
     *    * [`nrpn-dataentrycoarse`]{@link InputChannel#event:nrpn-dataentrycoarse}
     *    * [`nrpn-dataentryfine`]{@link InputChannel#event:nrpn-dataentryfine}
     *    * [`nrpn-databuttonincrement`]{@link InputChannel#event:nrpn-databuttonincrement}
     *    * [`nrpn-databuttondecrement`]{@link InputChannel#event:nrpn-databuttondecrement}
     *
     * 8. **RPN** Events (channel-specific)
     *
     *    * [`rpn`]{@link InputChannel#event:rpn}
     *    * [`rpn-dataentrycoarse`]{@link InputChannel#event:rpn-dataentrycoarse}
     *    * [`rpn-dataentryfine`]{@link InputChannel#event:rpn-dataentryfine}
     *    * [`rpn-databuttonincrement`]{@link InputChannel#event:rpn-databuttonincrement}
     *    * [`rpn-databuttondecrement`]{@link InputChannel#event:rpn-databuttondecrement}
     *
     * @param event {string | EventEmitter.ANY_EVENT} The type of the event.
     *
     * @param listener {function} A callback function to execute when the specified event is detected.
     * This function will receive an event parameter object. For details on this object's properties,
     * check out the documentation for the various events (links above).
     *
     * @param {object} [options={}]
     *
     * @param {array} [options.arguments] An array of arguments which will be passed separately to the
     * callback function. This array is stored in the [`arguments`](Listener#arguments) property of
     * the [`Listener`](Listener) object and can be retrieved or modified as desired.
     *
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * An integer between 1 and 16 or an array of such integers representing the MIDI channel(s) to
     * listen on. If no channel is specified, all channels will be used. This parameter is ignored for
     * input-wide events.
     *
     * @param {object} [options.context=this] The value of `this` in the callback function.
     *
     * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
     * automatically expires.
     *
     * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
     * of the listeners array and thus be triggered before others.
     *
     * @param {number} [options.remaining=Infinity] The number of times after which the callback
     * should automatically be removed.
     *
     * @returns {Listener|Listener[]} If the event is input-wide, a single [`Listener`](Listener)
     * object is returned. If the event is channel-specific, an array of all the
     * [`Listener`](Listener) objects is returned (one for each channel).
     */
    addListener(event, listener, options = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (typeof options === "function") {
          let channels = (listener != undefined) ? [].concat(listener) : undefined; // clone
          listener = options;
          options = {channels: channels};
        }

      }

      // Check if the event is channel-specific or input-wide
      if (Enumerations.CHANNEL_EVENTS.includes(event)) {

        // If no channel defined, use all.
        if (options.channels === undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

        let listeners = [];

        Utilities.sanitizeChannels(options.channels).forEach(ch => {
          listeners.push(this.channels[ch].addListener(event, listener, options));
        });

        return listeners;

      } else {

        return super.addListener(event, listener, options);

      }

    }

    /**
     * Adds a one-time event listener that will trigger a function callback when the specified event
     * happens. The event can be **channel-bound** or **input-wide**. Channel-bound events are
     * dispatched by [`InputChannel`]{@link InputChannel} objects and are tied to a specific MIDI
     * channel while input-wide events are dispatched by the `Input` object itself and are not tied
     * to a specific channel.
     *
     * Calling the function with an input-wide event (such as
     * [`"midimessage"`]{@link #event:midimessage}), will return the [`Listener`](Listener) object
     * that was created.
     *
     * If you call the function with a channel-specific event (such as
     * [`"noteon"`]{@link InputChannel#event:noteon}), it will return an array of all
     * [`Listener`](Listener) objects that were created (one for each channel):
     *
     * ```javascript
     * const listeners = WebMidi.inputs[0].addOneTimeListener("noteon", someFunction);
     * ```
     *
     * You can also specify which channels you want to add the listener to:
     *
     * ```javascript
     * const listeners = WebMidi.inputs[0].addOneTimeListener("noteon", someFunction, {channels: [1, 2, 3]});
     * ```
     *
     * In this case, the `listeners` variable contains an array of 3 [`Listener`](Listener) objects.
     *
     * The code above will add a listener for the `"noteon"` event and call `someFunction` when the
     * event is triggered on MIDI channels `1`, `2` or `3`.
     *
     * Note that, when adding events to channels, it is the [`InputChannel`](InputChannel) instance
     * that actually gets a listener added and not the `Input` instance.
     *
     * Note: if you want to add a listener to a single MIDI channel you should probably do so directly
     * on the [`InputChannel`](InputChannel) object itself.
     *
     * There are 8 families of events you can listen to:
     *
     * 1. **MIDI System Common** Events (input-wide)
     *
     *    * [`songposition`]{@link Input#event:songposition}
     *    * [`songselect`]{@link Input#event:songselect}
     *    * [`sysex`]{@link Input#event:sysex}
     *    * [`timecode`]{@link Input#event:timecode}
     *    * [`tunerequest`]{@link Input#event:tunerequest}
     *
     * 2. **MIDI System Real-Time** Events (input-wide)
     *
     *    * [`clock`]{@link Input#event:clock}
     *    * [`start`]{@link Input#event:start}
     *    * [`continue`]{@link Input#event:continue}
     *    * [`stop`]{@link Input#event:stop}
     *    * [`activesensing`]{@link Input#event:activesensing}
     *    * [`reset`]{@link Input#event:reset}
     *
     * 3. **State Change** Events (input-wide)
     *
     *    * [`opened`]{@link Input#event:opened}
     *    * [`closed`]{@link Input#event:closed}
     *    * [`disconnected`]{@link Input#event:disconnected}
     *
     * 4. **Catch-All** Events (input-wide)
     *
     *    * [`midimessage`]{@link Input#event:midimessage}
     *    * [`unknownmidimessage`]{@link Input#event:unknownmidimessage}
     *
     * 5. **Channel Voice** Events (channel-specific)
     *
     *    * [`channelaftertouch`]{@link InputChannel#event:channelaftertouch}
     *    * [`controlchange`]{@link InputChannel#event:controlchange}
     *      * [`controlchange-controller0`]{@link InputChannel#event:controlchange-controller0}
     *      * [`controlchange-controller1`]{@link InputChannel#event:controlchange-controller1}
     *      * [`controlchange-controller2`]{@link InputChannel#event:controlchange-controller2}
     *      * (...)
     *      * [`controlchange-controller127`]{@link InputChannel#event:controlchange-controller127}
     *    * [`keyaftertouch`]{@link InputChannel#event:keyaftertouch}
     *    * [`noteoff`]{@link InputChannel#event:noteoff}
     *    * [`noteon`]{@link InputChannel#event:noteon}
     *    * [`pitchbend`]{@link InputChannel#event:pitchbend}
     *    * [`programchange`]{@link InputChannel#event:programchange}
     *
     *    Note: you can listen for a specific control change message by using an event name like this:
     *    `controlchange-controller23`, `controlchange-controller99`, `controlchange-controller122`,
     *    etc.
     *
     * 6. **Channel Mode** Events (channel-specific)
     *
     *    * [`allnotesoff`]{@link InputChannel#event:allnotesoff}
     *    * [`allsoundoff`]{@link InputChannel#event:allsoundoff}
     *    * [`localcontrol`]{@link InputChannel#event:localcontrol}
     *    * [`monomode`]{@link InputChannel#event:monomode}
     *    * [`omnimode`]{@link InputChannel#event:omnimode}
     *    * [`resetallcontrollers`]{@link InputChannel#event:resetallcontrollers}
     *
     * 7. **NRPN** Events (channel-specific)
     *
     *    * [`nrpn`]{@link InputChannel#event:nrpn}
     *    * [`nrpn-dataentrycoarse`]{@link InputChannel#event:nrpn-dataentrycoarse}
     *    * [`nrpn-dataentryfine`]{@link InputChannel#event:nrpn-dataentryfine}
     *    * [`nrpn-databuttonincrement`]{@link InputChannel#event:nrpn-databuttonincrement}
     *    * [`nrpn-databuttondecrement`]{@link InputChannel#event:nrpn-databuttondecrement}
     *
     * 8. **RPN** Events (channel-specific)
     *
     *    * [`rpn`]{@link InputChannel#event:rpn}
     *    * [`rpn-dataentrycoarse`]{@link InputChannel#event:rpn-dataentrycoarse}
     *    * [`rpn-dataentryfine`]{@link InputChannel#event:rpn-dataentryfine}
     *    * [`rpn-databuttonincrement`]{@link InputChannel#event:rpn-databuttonincrement}
     *    * [`rpn-databuttondecrement`]{@link InputChannel#event:rpn-databuttondecrement}
     *
     * @param event {string} The type of the event.
     *
     * @param listener {function} A callback function to execute when the specified event is detected.
     * This function will receive an event parameter object. For details on this object's properties,
     * check out the documentation for the various events (links above).
     *
     * @param {object} [options={}]
     *
     * @param {array} [options.arguments] An array of arguments which will be passed separately to the
     * callback function. This array is stored in the [`arguments`](Listener#arguments) property of
     * the [`Listener`](Listener) object and can be retrieved or modified as desired.
     *
     * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
     * such integers representing the MIDI channel(s) to listen on. This parameter is ignored for
     * input-wide events.
     *
     * @param {object} [options.context=this] The value of `this` in the callback function.
     *
     * @param {number} [options.duration=Infinity] The number of milliseconds before the listener
     * automatically expires.
     *
     * @param {boolean} [options.prepend=false] Whether the listener should be added at the beginning
     * of the listeners array and thus be triggered before others.
     *
     * @returns {Listener[]} An array of all [`Listener`](Listener) objects that were created.
     */
    addOneTimeListener(event, listener, options = {}) {
      options.remaining = 1;
      return this.addListener(event, listener, options);
    }

    /**
     * This is an alias to the [Input.addListener()]{@link Input#addListener} method.
     * @since 2.0.0
     * @deprecated since v3.0
     * @private
     */
    on(event, channel, listener, options) {
      return this.addListener(event, channel, listener, options);
    }

    /**
     * Checks if the specified event type is already defined to trigger the specified callback
     * function. For channel-specific events, the function will return `true` only if all channels
     * have the listener defined.
     *
     * @param event {string|Symbol} The type of the event.
     *
     * @param listener {function} The callback function to check for.
     *
     * @param {object} [options={}]
     *
     * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of such
     * integers representing the MIDI channel(s) to check. This parameter is ignored for input-wide
     * events.
     *
     * @returns {boolean} Boolean value indicating whether or not the `Input` or
     * [`InputChannel`](InputChannel) already has this listener defined.
     */
    hasListener(event, listener, options = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (typeof options === "function") {
          let channels = [].concat(listener); // clone
          listener = options;
          options = {channels: channels};
        }

      }

      if (Enumerations.CHANNEL_EVENTS.includes(event)) {

        // If no channel defined, use all.
        if (options.channels === undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

        return Utilities.sanitizeChannels(options.channels).every(ch => {
          return this.channels[ch].hasListener(event, listener);
        });

      } else {
        return super.hasListener(event, listener);
      }

    }

    /**
     * Removes the specified listener for the specified event. If no listener is specified, all
     * listeners for the specified event will be removed. If no event is specified, all listeners for
     * the `Input` as well as all listeners for all [`InputChannel`]{@link InputChannel} objects will
     * be removed.
     *
     * By default, channel-specific listeners will be removed from all channels unless the
     * `options.channel` narrows it down.
     *
     * @param [type] {string} The type of the event.
     *
     * @param [listener] {function} The callback function to check for.
     *
     * @param {object} [options={}]
     *
     * @param {number|number[]} [options.channels]  An integer between 1 and 16 or an array of
     * such integers representing the MIDI channel(s) to match. This parameter is ignored for
     * input-wide events.
     *
     * @param {*} [options.context] Only remove the listeners that have this exact context.
     *
     * @param {number} [options.remaining] Only remove the listener if it has exactly that many
     * remaining times to be executed.
     */
    removeListener(event, listener, options = {}) {

      if (wm.validation) {

        // Legacy compatibility
        if (typeof options === "function") {
          let channels = [].concat(listener); // clone
          listener = options;
          options = {channels: channels};
        }

      }

      if (options.channels === undefined) options.channels = Enumerations.MIDI_CHANNEL_NUMBERS;

      // If the event is not specified, remove everything (channel-specific and input-wide)!
      if (event == undefined) {
        Utilities.sanitizeChannels(options.channels).forEach(ch => {
          if (this.channels[ch]) this.channels[ch].removeListener();
        });
        return super.removeListener();
      }

      // If the event is specified, check if it's channel-specific or input-wide.
      if (Enumerations.CHANNEL_EVENTS.includes(event)) {

        Utilities.sanitizeChannels(options.channels).forEach(ch => {
          this.channels[ch].removeListener(event, listener, options);
        });

      } else {

        super.removeListener(event, listener, options);

      }

    }

    /**
     * Adds a forwarder that will forward all incoming MIDI messages matching the criteria to the
     * specified [`Output`](Output) destination(s). This is akin to the hardware MIDI THRU port, with
     * the added benefit of being able to filter which data is forwarded.
     *
     * @param {Output|Output[]} output An [`Output`](Output) object, or an array of such
     * objects, to forward messages to.
     * @param {object} [options={}]
     * @param {string|string[]} [options.types=(all messages)] A message type, or an array of such
     * types (`noteon`, `controlchange`, etc.), that the message type must match in order to be
     * forwarded. If this option is not specified, all types of messages will be forwarded. Valid
     * messages are the ones found in either
     * [`MIDI_SYSTEM_MESSAGES`](Enumerations#MIDI_SYSTEM_MESSAGES) or
     * [`MIDI_CHANNEL_MESSAGES`](Enumerations#MIDI_CHANNEL_MESSAGES).
     * @param {number|number[]} [options.channels=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]
     * A MIDI channel number or an array of channel numbers that the message must match in order to be
     * forwarded. By default all MIDI channels are included (`1` to `16`).
     *
     * @returns {Forwarder} The [`Forwarder`](Forwarder) object created to handle the forwarding. This
     * is useful if you wish to manipulate or remove the [`Forwarder`](Forwarder) later on.
     */
    addForwarder(output, options = {}) {

      let forwarder;

      // Unless 'output' is a forwarder, create a new forwarder
      if (output instanceof Forwarder) {
        forwarder = output;
      } else {
        forwarder = new Forwarder(output, options);
      }

      this._forwarders.push(forwarder);
      return forwarder;

    }

    /**
     * Removes the specified [`Forwarder`](Forwarder) object from the input.
     *
     * @param {Forwarder} forwarder The [`Forwarder`](Forwarder) to remove (the
     * [`Forwarder`](Forwarder) object is returned when calling `addForwarder()`.
     */
    removeForwarder(forwarder) {
      this._forwarders = this._forwarders.filter(item => item !== forwarder);
    }

    /**
     * Checks whether the specified [`Forwarder`](Forwarder) object has already been attached to this
     * input.
     *
     * @param {Forwarder} forwarder The [`Forwarder`](Forwarder) to check for (the
     * [`Forwarder`](Forwarder) object is returned when calling [`addForwarder()`](#addForwarder).
     * @returns {boolean}
     */
    hasForwarder(forwarder) {
      return this._forwarders.includes(forwarder);
    }

    /**
     * Name of the MIDI input.
     *
     * @type {string}
     * @readonly
     */
    get name() {
      return this._midiInput.name;
    }

    /**
     * ID string of the MIDI port. The ID is host-specific. Do not expect the same ID on different
     * platforms. For example, Google Chrome and the Jazz-Plugin report completely different IDs for
     * the same port.
     *
     * @type {string}
     * @readonly
     */
    get id() {
      return this._midiInput.id;
    }

    /**
     * Input port's connection state: `pending`, `open` or `closed`.
     *
     * @type {string}
     * @readonly
     */
    get connection() {
      return this._midiInput.connection;
    }

    /**
     * Name of the manufacturer of the device that makes this input port available.
     *
     * @type {string}
     * @readonly
     */
    get manufacturer() {
      return this._midiInput.manufacturer;
    }

    /**
     * An integer to offset the reported octave of incoming notes. By default, middle C (MIDI note
     * number 60) is placed on the 4th octave (C4).
     *
     * If, for example, `octaveOffset` is set to 2, MIDI note number 60 will be reported as C6. If
     * `octaveOffset` is set to -1, MIDI note number 60 will be reported as C3.
     *
     * Note that this value is combined with the global offset value defined in the
     * [`WebMidi.octaveOffset`](WebMidi#octaveOffset) property (if any).
     *
     * @type {number}
     *
     * @since 3.0
     */
    get octaveOffset() {
      return this._octaveOffset;
    }
    set octaveOffset(value) {

      if (this.validation) {
        value = parseInt(value);
        if (isNaN(value)) throw new TypeError("The 'octaveOffset' property must be an integer.");
      }

      this._octaveOffset = value;

    }

    /**
     * State of the input port: `connected` or `disconnected`.
     *
     * @type {string}
     * @readonly
     */
    get state() {
      return this._midiInput.state;
    }

    /**
     * The port type. In the case of the `Input` object, this is always: `input`.
     *
     * @type {string}
     * @readonly
     */
    get type() {
      return this._midiInput.type;
    }

    /**
     * @type {boolean}
     * @private
     * @deprecated since v3.0.0 (moved to 'InputChannel' class)
     */
    get nrpnEventsEnabled() {
      if (wm.validation) {
        console.warn("The 'nrpnEventsEnabled' property has been moved to the 'InputChannel' class.");
      }
      return false;
    }

  }

  // Events that do not have code below them must be placed outside the class definition (?!)

  /**
   * Input-wide (system) event emitted when a **system exclusive** message has been received.
   * You should note that, to receive `sysex` events, you must call the
   * [`WebMidi.enable()`](WebMidi#enable()) method with the `sysex` option set to `true`:
   *
   * ```js
   * WebMidi.enable({sysex: true})
   *  .then(() => console.log("WebMidi has been enabled with sysex support."))
   * ```
   *
   * @event Input#sysex
   *
   * @type {object}
   *
   * @property {Input} port The `Input` that triggered the event.
   * @property {Input} target The object that dispatched the event.
   * @property {Message} message A [`Message`](Message) object containing information about the
   * incoming MIDI message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `sysex`
   *
   */

  /**
   * Input-wide (system) event emitted when a **time code quarter frame** message has been
   * received.
   *
   * @event Input#timecode
   *
   * @type {object}
   *
   * @property {Input} port The `Input` that triggered the event.
   * @property {Input} target The object that dispatched the event.
   * @property {Message} message A [`Message`](Message) object containing information about the
   * incoming MIDI message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `timecode`
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **song position** message has been received.
   *
   * @event Input#songposition
   *
   * @type {object}
   *
   * @property {Input} port The `Input` that triggered the event.
   * @property {Input} target The object that dispatched the event.
   * @property {Message} message A [`Message`](Message) object containing information about the
   * incoming MIDI message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `songposition`
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **song select** message has been received.
   *
   * @event Input#songselect
   *
   * @type {object}
   *
   * @property {Input} port The `Input` that triggered the event.
   * @property {Input} target The object that dispatched the event.
   * @property {Message} message A [`Message`](Message) object containing information about the
   * incoming MIDI message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} value Song (or sequence) number to select (0-127)
   * @property {string} rawValue Song (or sequence) number to select (0-127)
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **tune request** message has been received.
   *
   * @event Input#tunerequest
   *
   * @type {object}
   *
   * @property {Input} port The `Input` that triggered the event.
   * @property {Input} target The object that dispatched the event.
   * @property {Message} message A [`Message`](Message) object containing information about the
   * incoming MIDI message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `tunerequest`
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **timing clock** message has been received.
   *
   * @event Input#clock
   *
   * @type {object}
   *
   * @property {Input} port The `Input` that triggered the event.
   * @property {Input} target The object that dispatched the event.
   * @property {Message} message A [`Message`](Message) object containing information about the
   * incoming MIDI message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `clock`
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **start** message has been received.
   *
   * @event Input#start
   *
   * @type {object}
   *
   * @property {Input} port The `Input` that triggered the event.
   * @property {Input} target The object that dispatched the event.
   * @property {Message} message A [`Message`](Message) object containing information about the
   * incoming MIDI message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `start`
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **continue** message has been received.
   *
   * @event Input#continue
   *
   * @type {object}
   *
   * @property {Input} port The `Input` that triggered the event.
   * @property {Input} target The object that dispatched the event.
   * @property {Message} message A [`Message`](Message) object containing information about the
   * incoming MIDI message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `continue`
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **stop** message has been received.
   *
   * @event Input#stop
   *
   * @type {object}
   *
   * @property {Input} port The `Input` that triggered the event.
   * @property {Input} target The object that dispatched the event.
   * @property {Message} message A [`Message`](Message) object containing information about the
   * incoming MIDI message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `stop`
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when an **active sensing** message has been received.
   *
   * @event Input#activesensing
   *
   * @type {object}
   *
   * @property {Input} port The `Input` that triggered the event.
   * @property {Input} target The object that dispatched the event.
   * @property {Message} message A [`Message`](Message) object containing information about the
   * incoming MIDI message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `activesensing`
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when a **reset** message has been received.
   *
   * @event Input#reset
   *
   * @type {object}
   *
   * @property {Input} port The `Input` that triggered the event.
   * @property {Input} target The object that dispatched the event.
   * @property {Message} message A [`Message`](Message) object containing information about the
   * incoming MIDI message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `reset`
   *
   * @since 2.1
   */

  /**
   * Input-wide (system) event emitted when an unknown MIDI message has been received. It could
   * be, for example, one of the undefined/reserved messages.
   *
   * @event Input#unknownmessage
   *
   * @type {Object}
   *
   * @property {Input} port The `Input` that triggered the event.
   * @property {Input} target The object that dispatched the event.
   * @property {Message} message A [`Message`](Message) object containing information about the
   * incoming MIDI message.
   * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred (in
   * milliseconds since the navigation start of the document).
   * @property {string} type `unknownmessage`
   *
   * @since 2.1
   */

  /**
   * The `WebMidi` object makes it easier to work with the low-level Web MIDI API. Basically, it
   * simplifies sending outgoing MIDI messages and reacting to incoming MIDI messages.
   *
   * When using the WebMidi.js library, you should know that the `WebMidi` class has already been
   * instantiated. You cannot instantiate it yourself. If you use the **IIFE** version, you should
   * simply use the global object called `WebMidi`. If you use the **CJS** (CommonJS) or **ESM** (ES6
   * module) version, you get an already-instantiated object when you import the module.
   *
   * @fires WebMidi#connected
   * @fires WebMidi#disabled
   * @fires WebMidi#disconnected
   * @fires WebMidi#enabled
   * @fires WebMidi#error
   * @fires WebMidi#midiaccessgranted
   * @fires WebMidi#portschanged
   *
   * @extends EventEmitter
   * @license Apache-2.0
   */
  class WebMidi extends EventEmitter {

    /**
     * The WebMidi class is a singleton and you cannot instantiate it directly. It has already been
     * instantiated for you.
     */
    constructor() {

      super();

      /**
       * Object containing system-wide default values that can be changed to customize how the library
       * works.
       *
       * @type {object}
       *
       * @property {object}  defaults.note - Default values relating to note
       * @property {number}  defaults.note.attack - A number between 0 and 127 representing the
       * default attack velocity of notes. Initial value is 64.
       * @property {number}  defaults.note.release - A number between 0 and 127 representing the
       * default release velocity of notes. Initial value is 64.
       * @property {number}  defaults.note.duration - A number representing the default duration of
       * notes (in seconds). Initial value is Infinity.
       */
      this.defaults = {
        note: {
          attack: Utilities.from7bitToFloat(64),
          release: Utilities.from7bitToFloat(64),
          duration: Infinity
        }
      };

      /**
       * The [`MIDIAccess`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess)
       * instance used to talk to the lower-level Web MIDI API. This should not be used directly
       * unless you know what you are doing.
       *
       * @type {MIDIAccess}
       * @readonly
       */
      this.interface = null;

      /**
       * Indicates whether argument validation and backwards-compatibility checks are performed
       * throughout the WebMidi.js library for object methods and property setters.
       *
       * This is an advanced setting that should be used carefully. Setting `validation` to `false`
       * improves performance but should only be done once the project has been thoroughly tested with
       * `validation` turned on.
       *
       * @type {boolean}
       */
      this.validation = true;

      /**
       * Array of all (Input) objects
       * @type {Input[]}
       * @private
       */
      this._inputs = [];

      /**
       * Array of disconnected [`Input`](Input) objects. This is used when inputs are plugged back in
       * to retain their previous state.
       * @type {Input[]}
       * @private
       */
      this._disconnectedInputs = [];

      /**
       * Array of all [`Output`](Output) objects
       * @type {Output[]}
       * @private
       */
      this._outputs = [];

      /**
       * Array of disconnected [`Output`](Output) objects. This is used when outputs are plugged back
       * in to retain their previous state.
       * @type {Output[]}
       * @private
       */
      this._disconnectedOutputs = [];

      /**
       * Array of statechange events to process. These events must be parsed synchronously so they do
       * not override each other.
       *
       * @type {string[]}
       * @private
       */
      this._stateChangeQueue = [];

      /**
       * @type {number}
       * @private
       */
      this._octaveOffset = 0;

    }

    /**
     * Checks if the Web MIDI API is available in the current environment and then tries to connect to
     * the host's MIDI subsystem. This is an asynchronous operation and it causes a security prompt to
     * be displayed to the user.
     *
     * To enable the use of MIDI system exclusive messages, the `sysex` option should be set to
     * `true`. However, under some environments (e.g. Jazz-Plugin), the `sysex` option is ignored
     * and system exclusive messages are always enabled. You can check the
     * [`sysexEnabled`](#sysexEnabled) property to confirm.
     *
     * To enable access to software synthesizers available on the host, you would set the `software`
     * option to `true`. However, this option is only there to future-proof the library as support for
     * software synths has not yet been implemented in any browser (as of September 2021).
     *
     * By the way, if you call the [`enable()`](#enable) method while WebMidi.js is already enabled,
     * the callback function will be executed (if any), the promise will resolve but the events
     * ([`"midiaccessgranted"`](#event:midiaccessgranted), [`"connected"`](#event:connected) and
     * [`"enabled"`](#event:enabled)) will not be fired.
     *
     * There are 3 ways to execute code after `WebMidi` has been enabled:
     *
     * - Pass a callback function in the `options`
     * - Listen to the [`"enabled"`](#event:enabled) event
     * - Wait for the promise to resolve
     *
     * In order, this is what happens towards the end of the enabling process:
     *
     * 1. [`"midiaccessgranted"`](#event:midiaccessgranted) event is triggered once the user has
     * granted access to use MIDI.
     * 2. [`"connected"`](#event:connected) events are triggered (for each available input and output)
     * 3. [`"enabled"`](#event:enabled) event is triggered when WebMidi.js is fully ready
     * 4. specified callback (if any) is executed
     * 5. promise is resolved and fulfilled with the `WebMidi` object.
     *
     * **Important note**: starting with Chrome v77, a page using Web MIDI API must be hosted on a
     * secure origin (`https://`, `localhost` or `file:///`) and the user will always be prompted to
     * authorize the operation (no matter if the `sysex` option is `true` or not).
     *
     * ##### Example
     * ```js
     * // Enabling WebMidi and using the promise
     * WebMidi.enable().then(() => {
     *   console.log("WebMidi.js has been enabled!");
     * })
     * ```
     *
     * @param [options] {object}
     *
     * @param [options.callback] {function} A function to execute once the operation completes. This
     * function will receive an `Error` object if enabling the Web MIDI API failed.
     *
     * @param [options.sysex=false] {boolean} Whether to enable MIDI system exclusive messages or not.
     *
     * @param [options.validation=true] {boolean} Whether to enable library-wide validation of method
     * arguments and setter values. This is an advanced setting that should be used carefully. Setting
     * [`validation`](#validation) to `false` improves performance but should only be done once the
     * project has been thoroughly tested with [`validation`](#validation)  turned on.
     *
     * @param [options.software=false] {boolean} Whether to request access to software synthesizers on
     * the host system. This is part of the spec but has not yet been implemented by most browsers as
     * of April 2020.
     * 
     * @param [options.requestMIDIAccessFunction] {function} A custom function to use to return 
     * the MIDIAccess object. This is useful if you want to use a polyfill for the Web MIDI API 
     * or if you want to use a custom implementation of the Web MIDI API - probably for testing
     * purposes.
     *
     * @async
     *
     * @returns {Promise.<WebMidi>} The promise is fulfilled with the `WebMidi` object fro
     * chainability
     *
     * @throws {Error} The Web MIDI API is not supported in your environment.
     * @throws {Error} Jazz-Plugin must be installed to use WebMIDIAPIShim.
     */
    async enable(options = {}, legacy = false) {

      /*START-ESM*/

      // This block is stripped out of the IIFE and CJS versions where it isn't needed.

      // If this code is executed by Node.js in "module" mode (when "type": "module" is used in the
      // package.json file), then we must import the `jzz` module. I import it in this convoluted way
      // to prevent Webpack from automatically bundling it in browser bundles where it isn't needed.
      if (Utilities.isNode) {

        // Some environments may have both Node.js and browser runtimes (Electron, NW.js, React
        // Native, etc.) so we also check for the presence of the window.navigator property.
        try {
          window.navigator;
        } catch (err) {
          global.navigator = await Object.getPrototypeOf(async function() {}).constructor(`
        let jzz = await import("jzz");
        return jzz.default;
        `)();
        }

        // The `performance` module appeared in Node.js v8.5.0 but has started to be automatically
        // imported only in v16+.
        try {
          performance;
        } catch (err) {
          global.performance = await Object.getPrototypeOf(async function() {}).constructor(`
        let perf_hooks = await import("perf_hooks");
        return perf_hooks.performance;
        `)();
        }

      }

      /*END-ESM*/

      this.validation = (options.validation !== false);

      if (this.validation) {
        // Backwards-compatibility. Previous syntax was: enable(callback, sysex)
        if (typeof options === "function") options = {callback: options, sysex: legacy};
        if (legacy) options.sysex = true;
      }

      // If already enabled, trigger callback and resolve promise but do not dispatch events.
      if (this.enabled) {
        if (typeof options.callback === "function") options.callback();
        return Promise.resolve();
      }

      // The Jazz-Plugin takes a while to be available (even after the Window's 'load' event has been
      // fired). Therefore, we wait a little while to give it time to finish loading (initiqted in
      // constructor).
      // if (!this.supported) {
      //
      //   await new Promise((resolve, reject) => {
      //
      //     const start = this.time;
      //
      //     const intervalID = setInterval(() => {
      //
      //       if (this.supported) {
      //         clearInterval(intervalID);
      //         resolve();
      //       } else {
      //         if (this.time > start + 1500) {
      //           clearInterval(intervalID);
      //           let error = new Error("The Web MIDI API is not available in your environment.");
      //           if (typeof options.callback === "function") options.callback(error);
      //           reject(error);
      //         }
      //       }
      //
      //     }, 25);
      //
      //   });
      //
      // }

      /**
       * Event emitted when an error occurs trying to enable `WebMidi`
       *
       * @event WebMidi#error
       * @type {object}
       * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in
       * milliseconds since the navigation start of the document).
       * @property {WebMidi} target The object that triggered the event
       * @property {string} type `error`
       * @property {*} error Actual error that occurred
       */
      const errorEvent = {
        timestamp: this.time,
        target: this,
        type: "error",
        error: undefined
      };

      /**
       * Event emitted once the MIDI interface has been successfully created (which implies user has
       * granted access to MIDI).
       *
       * @event WebMidi#midiaccessgranted
       * @type {object}
       * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in milliseconds
       * since the navigation start of the document).
       * @property {WebMidi} target The object that triggered the event
       * @property {string} type `midiaccessgranted`
       */
      const midiAccessGrantedEvent = {
        timestamp: this.time,
        target: this,
        type: "midiaccessgranted"
      };

      /**
       * Event emitted once `WebMidi` has been fully enabled
       *
       * @event WebMidi#enabled
       * @type {object}
       * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in milliseconds
       * since the navigation start of the document).
       * @property {WebMidi} target The object that triggered the event
       * @property {string} type `"enabled"`
       */
      const enabledEvent = {
        timestamp: this.time,
        target: this,
        type: "enabled"
      };

      // Request MIDI access (this iw where the prompt will appear)
      try {
        if (typeof options.requestMIDIAccessFunction === "function") {
          this.interface = await options.requestMIDIAccessFunction(
            {sysex: options.sysex, software: options.software}
          );
        } else {
          this.interface = await navigator.requestMIDIAccess(
            {sysex: options.sysex, software: options.software}
          );
        }
      } catch(err) {
        errorEvent.error = err;
        this.emit("error", errorEvent);
        if (typeof options.callback === "function") options.callback(err);
        return Promise.reject(err);
      }

      // Now that the Web MIDI API interface has been created, we trigger the 'midiaccessgranted'
      // event. This allows the developer an occasion to assign listeners on 'connected' events.
      this.emit("midiaccessgranted", midiAccessGrantedEvent);

      // We setup the state change listener before creating the ports so that it properly catches the
      // the ports' `connected` events
      this.interface.onstatechange = this._onInterfaceStateChange.bind(this);

      // Update inputs and outputs (this is where `Input` and `Output` objects are created).
      try {
        await this._updateInputsAndOutputs();
      } catch (err) {
        errorEvent.error = err;
        this.emit("error", errorEvent);
        if (typeof options.callback === "function") options.callback(err);
        return Promise.reject(err);
      }

      // If we make it here, the ports have been successfully created, so we trigger the 'enabled'
      // event.
      this.emit("enabled", enabledEvent);

      // Execute the callback (if any) and resolve the promise with 'this' (for chainability)
      if (typeof options.callback === "function") options.callback();
      return Promise.resolve(this);

    }

    /**
     * Completely disables **WebMidi.js** by unlinking the MIDI subsystem's interface and closing all
     * [`Input`](Input) and [`Output`](Output) objects that may have been opened. This also means that
     * listeners added to [`Input`](Input) objects, [`Output`](Output) objects or to `WebMidi` itself
     * are also destroyed.
     *
     * @async
     * @returns {Promise<Array>}
     *
     * @throws {Error} The Web MIDI API is not supported by your environment.
     *
     * @since 2.0.0
     */
    async disable() {

      return this._destroyInputsAndOutputs().then(() => {

        if (navigator && typeof navigator.close === "function") navigator.close(); // jzz

        if (this.interface) this.interface.onstatechange = undefined;
        this.interface = null; // also resets enabled, sysexEnabled

        /**
         * Event emitted once `WebMidi` has been successfully disabled.
         *
         * @event WebMidi#disabled
         * @type {object}
         * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in
         * milliseconds since the navigation start of the document).
         * @property {WebMidi} target The object that triggered the event
         * @property {string} type `"disabled"`
         */
        let event = {
          timestamp: this.time,
          target: this,
          type: "disabled"
        };

        // Finally, trigger the 'disabled' event and then remove all listeners.
        this.emit("disabled", event);
        this.removeListener();

      });

    };

    /**
     * Returns the [`Input`](Input) object that matches the specified ID string or `false` if no
     * matching input is found. As per the Web MIDI API specification, IDs are strings (not integers).
     *
     * Please note that IDs change from one host to another. For example, Chrome does not use the same
     * kind of IDs as Jazz-Plugin.
     *
     * @param id {string} The ID string of the input. IDs can be viewed by looking at the
     * [`WebMidi.inputs`](WebMidi#inputs) array. Even though they sometimes look like integers, IDs
     * are strings.
     * @param [options] {object}
     * @param [options.disconnected] {boolean} Whether to retrieve a disconnected input
     *
     * @returns {Input} An [`Input`](Input) object matching the specified ID string or `undefined`
     * if no matching input can be found.
     *
     * @throws {Error} WebMidi is not enabled.
     *
     * @since 2.0.0
     */
    getInputById(id, options = {disconnected: false}) {

      if (this.validation) {
        if (!this.enabled) throw new Error("WebMidi is not enabled.");
        if (!id) return;
      }

      if (options.disconnected) {
        for (let i = 0; i < this._disconnectedInputs.length; i++) {
          if (this._disconnectedInputs[i].id === id.toString()) return this._disconnectedInputs[i];
        }
      } else {
        for (let i = 0; i < this.inputs.length; i++) {
          if (this.inputs[i].id === id.toString()) return this.inputs[i];
        }
      }

    };

    /**
     * Returns the first [`Input`](Input) object whose name **contains** the specified string. Note
     * that the port names change from one environment to another. For example, Chrome does not report
     * input names in the same way as the Jazz-Plugin does.
     *
     * @param name {string} The non-empty string to look for within the name of MIDI inputs (such as
     * those visible in the [inputs](WebMidi#inputs) array).
     *
     * @returns {Input} The [`Input`](Input) that was found or `undefined` if no input contained the
     * specified name.
     * @param [options] {object}
     * @param [options.disconnected] {boolean} Whether to retrieve a disconnected input
     *
     * @throws {Error} WebMidi is not enabled.
     *
     * @since 2.0.0
     */
    getInputByName(name, options = {disconnected: false}) {

      if (this.validation) {
        if (!this.enabled) throw new Error("WebMidi is not enabled.");
        if (!name) return;
        name = name.toString();
      }

      if (options.disconnected) {
        for (let i = 0; i < this._disconnectedInputs.length; i++) {
          if (~this._disconnectedInputs[i].name.indexOf(name)) return this._disconnectedInputs[i];
        }
      } else {
        for (let i = 0; i < this.inputs.length; i++) {
          if (~this.inputs[i].name.indexOf(name)) return this.inputs[i];
        }
      }

    };

    /**
     * Returns the first [`Output`](Output) object whose name **contains** the specified string. Note
     * that the port names change from one environment to another. For example, Chrome does not report
     * input names in the same way as the Jazz-Plugin does.
     *
     * @param name {string} The non-empty string to look for within the name of MIDI inputs (such as
     * those visible in the [`outputs`](#outputs) array).
     * @param [options] {object}
     * @param [options.disconnected] {boolean} Whether to retrieve a disconnected output
     *
     * @returns {Output} The [`Output`](Output) that was found or `undefined` if no output matched
     * the specified name.
     *
     * @throws {Error} WebMidi is not enabled.
     *
     * @since 2.0.0
     */
    getOutputByName(name, options = {disconnected: false}) {

      if (this.validation) {
        if (!this.enabled) throw new Error("WebMidi is not enabled.");
        if (!name) return;
        name = name.toString();
      }

      if (options.disconnected) {
        for (let i = 0; i < this._disconnectedOutputs.length; i++) {
          if (~this._disconnectedOutputs[i].name.indexOf(name)) return this._disconnectedOutputs[i];
        }
      } else {
        for (let i = 0; i < this.outputs.length; i++) {
          if (~this.outputs[i].name.indexOf(name)) return this.outputs[i];
        }
      }

    };

    /**
     * Returns the [`Output`](Output) object that matches the specified ID string or `false` if no
     * matching output is found. As per the Web MIDI API specification, IDs are strings (not
     * integers).
     *
     * Please note that IDs change from one host to another. For example, Chrome does not use the same
     * kind of IDs as Jazz-Plugin.
     *
     * @param id {string} The ID string of the port. IDs can be viewed by looking at the
     * [`WebMidi.outputs`](WebMidi#outputs) array.
     * @param [options] {object}
     * @param [options.disconnected] {boolean} Whether to retrieve a disconnected output
     *
     * @returns {Output} An [`Output`](Output) object matching the specified ID string. If no
     * matching output can be found, the method returns `undefined`.
     *
     * @throws {Error} WebMidi is not enabled.
     *
     * @since 2.0.0
     */
    getOutputById(id, options = {disconnected: false}) {

      if (this.validation) {
        if (!this.enabled) throw new Error("WebMidi is not enabled.");
        if (!id) return;
      }

      if (options.disconnected) {
        for (let i = 0; i < this._disconnectedOutputs.length; i++) {
          if (this._disconnectedOutputs[i].id === id.toString()) return this._disconnectedOutputs[i];
        }
      } else {
        for (let i = 0; i < this.outputs.length; i++) {
          if (this.outputs[i].id === id.toString()) return this.outputs[i];
        }
      }

    };

    /**
     * @private
     * @deprecated since version 3.0.0, use Utilities.toNoteNumber() instead.
     */
    noteNameToNumber(name) {
      if (this.validation) {
        console.warn(
          "The noteNameToNumber() method is deprecated. Use " +
          "Utilities.toNoteNumber() instead."
        );
      }
      return Utilities.toNoteNumber(name, this.octaveOffset);
    }

    /**
     * @private
     * @deprecated since 3.0.0, use Utilities.getNoteDetails() instead.
     */
    getOctave(number) {

      if (this.validation) {
        console.warn("The getOctave()is deprecated. Use Utilities.getNoteDetails() instead");
        number = parseInt(number);
      }

      if (!isNaN(number) && number >= 0 && number <= 127) {
        return Utilities.getNoteDetails(Utilities.offsetNumber(number, this.octaveOffset)).octave;
      } else {
        return false;
      }

    }

    /**
     * @private
     * @deprecated since 3.0.0, use Utilities.sanitizeChannels() instead.
     */
    sanitizeChannels(channel) {

      if (this.validation) {
        console.warn("The sanitizeChannels() method has been moved to the utilities class.");
      }

      return Utilities.sanitizeChannels(channel);

    }

    /**
     * @private
     * @deprecated since version 3.0.0, use Utilities.sanitizeChannels() instead.
     */
    toMIDIChannels(channel) {

      if (this.validation) {
        console.warn(
          "The toMIDIChannels() method has been deprecated. Use Utilities.sanitizeChannels() instead."
        );
      }

      return Utilities.sanitizeChannels(channel);

    }

    /**
     * @private
     * @deprecated since version 3.0.0, use Utilities.guessNoteNumber() instead.
     */
    guessNoteNumber(input) {

      if (this.validation) {
        console.warn(
          "The guessNoteNumber() method has been deprecated. Use Utilities.guessNoteNumber() instead."
        );
      }

      return Utilities.guessNoteNumber(input, this.octaveOffset);

    }

    /**
     * @private
     * @deprecated since version 3.0.0, use Utilities.buildNoteArray() instead.
     */
    getValidNoteArray(notes, options = {}) {
      if (this.validation) {
        console.warn(
          "The getValidNoteArray() method has been moved to the Utilities.buildNoteArray()"
        );
      }
      return Utilities.buildNoteArray(notes, options);
    }

    /**
     * @private
     * @deprecated since version 3.0.0, use Utilities.toTimestamp() instead.
     */
    convertToTimestamp(time) {

      if (this.validation) {
        console.warn(
          "The convertToTimestamp() method has been moved to Utilities.toTimestamp()."
        );
      }

      return Utilities.toTimestamp(time);

    }

    /**
     * @return {Promise<void>}
     * @private
     */
    async _destroyInputsAndOutputs() {

      let promises = [];

      this.inputs.forEach(input => promises.push(input.destroy()));
      this.outputs.forEach(output => promises.push(output.destroy()));

      return Promise.all(promises).then(() => {
        this._inputs = [];
        this._outputs = [];
      });

    }

    /**
     * @private
     */
    _onInterfaceStateChange(e) {

      this._updateInputsAndOutputs();

      /**
       * Event emitted when an [`Input`](Input) or [`Output`](Output) port is connected or
       * disconnected. This event is typically fired whenever a MIDI device is plugged in or
       * unplugged. Please note that it may fire several times if a device possesses multiple inputs
       * and/or outputs (which is often the case).
       *
       * @event WebMidi#portschanged
       * @type {object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred
       * (in milliseconds since the navigation start of the document).
       * @property {string} type `portschanged`
       * @property {WebMidi} target The object to which the listener was originally added (`WebMidi`)
       * @property {Input|Output} port The [`Input`](Input) or [`Output`](Output) object that
       * triggered the event.
       *
       * @since 3.0.2
       */

      /**
       * Event emitted when an [`Input`](Input) or [`Output`](Output) becomes available. This event is
       * typically fired whenever a MIDI device is plugged in. Please note that it may fire several
       * times if a device possesses multiple inputs and/or outputs (which is often the case).
       *
       * @event WebMidi#connected
       * @type {object}
       * @property {number} timestamp The moment (DOMHighResTimeStamp) when the event occurred
       * (in milliseconds since the navigation start of the document).
       * @property {string} type `connected`
       * @property {WebMidi} target The object to which the listener was originally added (`WebMidi`)
       * @property {Input|Output} port The [`Input`](Input) or [`Output`](Output) object that
       * triggered the event.
       */

      /**
       * Event emitted when an [`Input`](Input) or [`Output`](Output) becomes unavailable. This event
       * is typically fired whenever a MIDI device is unplugged. Please note that it may fire several
       * times if a device possesses multiple inputs and/or outputs (which is often the case).
       *
       * @event WebMidi#disconnected
       * @type {object}
       * @property {DOMHighResTimeStamp} timestamp The moment when the event occurred (in milliseconds
       * since the navigation start of the document).
       * @property {string} type `disconnected`
       * @property {WebMidi} target The object to which the listener was originally added (`WebMidi`)
       * @property {Input|Output} port The [`Input`](Input) or [`Output`](Output) object that
       * triggered the event.
       */
      let event = {
        timestamp: e.timeStamp,
        type: e.port.state,
        target: this
      };

      // We check if "connection" is "open" because connected events are also triggered with
      // "connection=closed"
      if (e.port.state === "connected" && e.port.connection === "open") {

        if (e.port.type === "output") {
          event.port = this.getOutputById(e.port.id);
        } else if (e.port.type === "input") {
          event.port = this.getInputById(e.port.id);
        }

        // Emit "connected" event
        this.emit(e.port.state, event);

        // Make a shallow copy of the event so we can use it for the "portschanged" event
        const portsChangedEvent = Object.assign({}, event);
        portsChangedEvent.type = "portschanged";
        this.emit(portsChangedEvent.type, portsChangedEvent);

      // We check if "connection" is "pending" because we do not always get the "closed" event
      } else if (e.port.state === "disconnected" && e.port.connection === "pending") {

        if (e.port.type === "input") {
          event.port = this.getInputById(e.port.id, {disconnected: true});
        } else if (e.port.type === "output") {
          event.port = this.getOutputById(e.port.id, {disconnected: true});
        }

        // Emit "disconnected" event
        this.emit(e.port.state, event);

        // Make a shallow copy of the event so we can use it for the "portschanged" event
        const portsChangedEvent = Object.assign({}, event);
        portsChangedEvent.type = "portschanged";
        this.emit(portsChangedEvent.type, portsChangedEvent);

      }

    };

    /**
     * @private
     */
    async _updateInputsAndOutputs() {

      return Promise.all([
        this._updateInputs(),
        this._updateOutputs()
      ]);

    };

    /**
     * @private
     */
    async _updateInputs() {

      // We must check for the existence of this.interface because it might have been closed via
      // WebMidi.disable().
      if (!this.interface) return;

      // Check for items to remove from the existing array (because they are no longer being reported
      // by the MIDI back-end).
      for (let i = this._inputs.length - 1; i >= 0; i--) {
        const current = this._inputs[i];
        const inputs = Array.from(this.interface.inputs.values());
        if (! inputs.find(input => input === current._midiInput)) {
          // Instead of destroying removed inputs, we stash them in case they come back (which is the
          // case when the computer goes to sleep and is later brought back online).
          this._disconnectedInputs.push(current);
          this._inputs.splice(i, 1);
        }
      }

      // Array to hold pending promises from trying to open all input ports
      let promises = [];

      // Add new inputs (if not already present)
      this.interface.inputs.forEach(nInput => {

        // Check if the input is currently absent from the 'inputs' array.
        if (! this._inputs.find(input => input._midiInput === nInput) ) {

          // If the input has previously been stashed away, reuse it. If not, create a new one.
          let input = this._disconnectedInputs.find(input => input._midiInput === nInput);
          if (!input) input = new Input(nInput);
          this._inputs.push(input);
          promises.push(input.open());

        }

      });

      // Return a promise that resolves when all promises have resolved
      return Promise.all(promises);

    };

    /**
     * @private
     */
    async _updateOutputs() {

      // We must check for the existence of this.interface because it might have been closed via
      // WebMidi.disable().
      if (!this.interface) return;

      // Check for items to remove from the existing array (because they are no longer being reported
      // by the MIDI back-end).
      for (let i = this._outputs.length - 1; i >= 0; i--) {
        const current = this._outputs[i];
        const outputs = Array.from(this.interface.outputs.values());
        if (! outputs.find(output => output === current._midiOutput)) {
          // Instead of destroying removed inputs, we stash them in case they come back (which is the
          // case when the computer goes to sleep and is later brought back online).
          this._disconnectedOutputs.push(current);
          this._outputs.splice(i, 1);
        }
      }

      // Array to hold pending promises from trying to open all output ports
      let promises = [];

      // Add new outputs (if not already present)
      this.interface.outputs.forEach(nOutput => {

        // Check if the output is currently absent from the 'outputs' array.
        if (! this._outputs.find(output => output._midiOutput === nOutput) ) {

          // If the output has previously been stashed away, reuse it. If not, create a new one.
          let output = this._disconnectedOutputs.find(output => output._midiOutput === nOutput);
          if (!output) output = new Output(nOutput);
          this._outputs.push(output);
          promises.push(output.open());

        }

      });

      // Return a promise that resolves when all sub-promises have resolved
      return Promise.all(promises);

    };

    // injectPluginMarkup(parent) {
    //
    //   // Silently ignore on Node.js
    //   if (Utilities.isNode) return;
    //
    //   // Default to <body> if no parent is specified
    //   if (!(parent instanceof Element) && !(parent instanceof HTMLDocument)) {
    //     parent = document.body;
    //   }
    //
    //   // IE10 needs this:
    //   // <meta http-equiv="X-UA-Compatible" content="requiresActiveX=true"/>
    //
    //   // Create markup and add to parent
    //   const obj = document.createElement("object");
    //   obj.classid = "CLSID:1ACE1618-1C7D-4561-AEE1-34842AA85E90"; // IE
    //   if (!obj.isJazz) obj.type = "audio/x-jazz";                 // Standards-compliant
    //   obj.style.visibility = "hidden";
    //   obj.style.width = obj.style.height = "0px";
    //   parent.appendChild(obj);
    //
    // }

    /**
     * Indicates whether access to the host's MIDI subsystem is active or not.
     *
     * @readonly
     * @type {boolean}
     */
    get enabled() {
      return this.interface !== null;
    }

    /**
     * An array of all currently available MIDI inputs.
     *
     * @readonly
     * @type {Input[]}
     */
    get inputs() {
      return this._inputs;
    }

    /**
     * @private
     * @deprecated
     */
    get isNode() {

      if (this.validation) {
        console.warn("WebMidi.isNode has been deprecated. Use Utilities.isNode instead.");
      }

      return Utilities.isNode;

    }

    /**
     * @private
     * @deprecated
     */
    get isBrowser() {

      if (this.validation) {
        console.warn("WebMidi.isBrowser has been deprecated. Use Utilities.isBrowser instead.");
      }

      return Utilities.isBrowser;

    }

    /**
     * An integer to offset the octave of notes received from external devices or sent to external
     * devices.
     *
     * When a MIDI message comes in on an input channel the reported note name will be offset. For
     * example, if the `octaveOffset` is set to `-1` and a [`"noteon"`](InputChannel#event:noteon)
     * message with MIDI number 60 comes in, the note will be reported as C3 (instead of C4).
     *
     * By the same token, when [`OutputChannel.playNote()`](OutputChannel#playNote) is called, the
     * MIDI note number being sent will be offset. If `octaveOffset` is set to `-1`, the MIDI note
     * number sent will be 72 (instead of 60).
     *
     * @type {number}
     *
     * @since 2.1
     */
    get octaveOffset() {
      return this._octaveOffset;
    }
    set octaveOffset(value) {

      if (this.validation) {
        value = parseInt(value);
        if (isNaN(value)) throw new TypeError("The 'octaveOffset' property must be an integer.");
      }

      this._octaveOffset = value;

    }

    /**
     * An array of all currently available MIDI outputs as [`Output`](Output) objects.
     *
     * @readonly
     * @type {Output[]}
     */
    get outputs() {
      return this._outputs;
    }

    /**
     * Indicates whether the environment provides support for the Web MIDI API or not.
     *
     * **Note**: in environments that do not offer built-in MIDI support, this will report `true` if
     * the
     * [`navigator.requestMIDIAccess`](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess)
     * function is available. For example, if you have installed WebMIDIAPIShim.js but no plugin, this
     * property will be `true` even though actual support might not be there.
     *
     * @readonly
     * @type {boolean}
     */
    get supported() {
      return (typeof navigator !== "undefined" && navigator.requestMIDIAccess);
    }

    /**
     * Indicates whether MIDI system exclusive messages have been activated when WebMidi.js was
     * enabled via the [`enable()`](#enable) method.
     *
     * @readonly
     * @type boolean
     */
    get sysexEnabled() {
      return !!(this.interface && this.interface.sysexEnabled);
    }

    /**
     * The elapsed time, in milliseconds, since the time
     * [origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#The_time_origin).
     * Said simply, it is the number of milliseconds that passed since the page was loaded. Being a
     * floating-point number, it has sub-millisecond accuracy. According to the
     * [documentation](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp), the
     * time should be accurate to 5 µs (microseconds). However, due to various constraints, the
     * browser might only be accurate to one millisecond.
     *
     * Note: `WebMidi.time` is simply an alias to `performance.now()`.
     *
     * @type {DOMHighResTimeStamp}
     * @readonly
     */
    get time() {
      return performance.now();
    }

    /**
     * The version of the library as a [semver](https://semver.org/) string.
     *
     * @readonly
     * @type string
     */
    get version() {
      return "3.0.20";
    }

    /**
     * @private
     * @deprecated since 3.0.0. Use Enumerations.CHANNEL_EVENTS instead.
     */
    get CHANNEL_EVENTS() {
      if (this.validation) {
        console.warn(
          "The CHANNEL_EVENTS enum has been moved to Enumerations.CHANNEL_EVENTS."
        );
      }
      return Enumerations.CHANNEL_EVENTS;
    }

    /**
     * @private
     * @deprecated since 3.0.0. Use Enumerations.MIDI_SYSTEM_MESSAGES instead.
     */
    get MIDI_SYSTEM_MESSAGES() {

      if (this.validation) {
        console.warn(
          "The MIDI_SYSTEM_MESSAGES enum has been moved to " +
          "Enumerations.MIDI_SYSTEM_MESSAGES."
        );
      }

      return Enumerations.MIDI_SYSTEM_MESSAGES;

    }

    /**
     * @private
     * @deprecated since 3.0.0. Use Enumerations.MIDI_CHANNEL_MODE_MESSAGES instead
     */
    get MIDI_CHANNEL_MODE_MESSAGES() {

      if (this.validation) {
        console.warn(
          "The MIDI_CHANNEL_MODE_MESSAGES enum has been moved to " +
          "Enumerations.MIDI_CHANNEL_MODE_MESSAGES."
        );
      }

      return Enumerations.MIDI_CHANNEL_MODE_MESSAGES;

    }

    /**
     * @private
     * @deprecated since 3.0.0. Use Enumerations.MIDI_CONTROL_CHANGE_MESSAGES instead.
     */
    get MIDI_CONTROL_CHANGE_MESSAGES() {

      if (this.validation) {
        console.warn(
          "The MIDI_CONTROL_CHANGE_MESSAGES enum has been moved to " +
          "Enumerations.MIDI_CONTROL_CHANGE_MESSAGES."
        );
      }

      return Enumerations.MIDI_CONTROL_CHANGE_MESSAGES;

    }

    /**
     * @deprecated since 3.0.0. Use Enumerations.MIDI_REGISTERED_PARAMETERS instead.
     * @private
     */
    get MIDI_REGISTERED_PARAMETER() {

      if (this.validation) {
        console.warn(
          "The MIDI_REGISTERED_PARAMETER enum has been moved to " +
          "Enumerations.MIDI_REGISTERED_PARAMETERS."
        );
      }

      return this.MIDI_REGISTERED_PARAMETERS;

    }

    /**
     * @deprecated since 3.0.0.
     * @private
     */
    get NOTES() {

      if (this.validation) {
        console.warn("The NOTES enum has been deprecated.");
      }

      return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    }

  }

  // Export singleton instance of WebMidi class. The 'constructor' is nulled so that it cannot be used
  // to instantiate a new WebMidi object or extend it. However, it is not freezed so it remains
  // extensible (properties can be added at will).
  const wm = new WebMidi();
  wm.constructor = null;

  /**
   * Throttled Filter
   */
  let _throttledFilter = function (layer) {
    this.mergeLayers(layer);
    layer.draw();
  };

  // Default settings
  var Layers$1 = globalThis.Layers = {
    noLoop: false,
    hasInit: false,

    // MIDI
    midiConnected: false,
    isBindingMIDI: false,
    curBindingLayer: null,
    curBindingControl: null,
    curBindingProp: null,
    midi: {},
    
    // The original renderer/canvas context before any layers
    _context: {},
    // The current layer using global context
    _globalContextLayer: null,

    default: {
      // @see Shades of Purple theme: 
      colors: [[344, 1, .69], [37, 1, .50], [50, 1, .49], [104, 1, .32], [174, .62, .47], [252, .86, .58], [215, 1, .12]],
      colorMode: ['hsl', 360, 1, 1, 1]
    },  
    
    // Layers
    all: [],
    store: {},
    methods: {},

    // About
    version: '0.0.13',
    curId: 0,

    // Menus
    openMenus: [],

    // GLobal settings
    hooks: {
      // Set this to a function to enable global settings
      globalSettings: null
    },

    /**
     * Bind listeners like clicking and right clicking
     */
    init () {
      // Menu
      this.$menu = null;
      this.hasInit = true;

      // Load sessionData
      this.sessionData = JSON.parse(localStorage.getItem('layers'));
      
      // Connect MIDI
      this.midi = JSON.parse(localStorage.getItem('midi')) || {};
      if (JSON.parse(localStorage.getItem('shouldConnectMIDI'))) {
        this.connectMIDI();
      }
      
      // Event listeners
      this.listeners.boundClick = this.listeners.click.bind(this);
      this.listeners.boundContextmenu = this.listeners.contextmenu.bind(this);
      addEventListener('click', this.listeners.boundClick);
      addEventListener('contextmenu', this.listeners.boundContextmenu);
    },

    /**
     * A list of functions to call whenever generateLayers() is called
     */
    generateCallbacks: [],
    generate (callback) {
      this.generateCallbacks.push(callback);
      this.hasInit && callback();
    },

    /**
     * Call the draw method
     * @param {Function} beforeDraw (Optional) A callback that runs just before each layer is drawn
     */
    draw: function (beforeDraw) {
      Layers.all.forEach(layer => {
        if (frameCount === 1 || (!layer.noLoop && !Layers.noLoop)) {
          switch (layer.type) {
            case 'filter':
              this.mergeLayers(layer);
            break
          }
          layer.draw(beforeDraw);
        }
      });
    },

    /**
     * Merges all the layers below the given layer
     */
    mergeLayers (layer) {
      // Determine the index within Layers.all
      let idx = Layers.all.findIndex(l => l.id === layer.id);
      // Loop through all layers below it and merge their canvases
      layer.canvas.clear();
      for (let i = 0; i < idx+1; i++) {
        !Layers.all[i].disabled && layer.canvas.image(Layers.all[i].canvas, 0, 0);
      }
    },

    /**
     * Free memory
     */
    dispose () {
      this.all.forEach(layer => layer.dispose());
      Layers.all = [];
    },

    /**
     * Move all layers up (top layer moves to bottom)
     */
    shift () {
      const layer = Layers.all.pop();
      Layers.all.unshift(layer);
    },

    /**
     * Loops through all open menus and closes them
     */
    closeMenus (ev) {
      for (let i = Layers.openMenus.length - 1; i >= 0; i--) {
        const bounds = Layers.openMenus[i].$menu.containerElem_.getBoundingClientRect();
        if (ev.clientX < bounds.left || ev.clientX > bounds.right || ev.clientY < bounds.top || ev.clientY > bounds.bottom) {
          Layers.openMenus[i].$menu.dispose();
          Layers.openMenus[i].$menu = null;
          Layers.openMenus.splice(i, 1);
        }
      }
    },

    /**
     * Updates all filter layers above a given layer
     */
    updateFilters (layer, instant = false) {
      // Find the index of the layer
      const idx = layer ? layer.id : Layers.all[0].id;
      const layerIdx = Layers.all.findIndex(l => l.id === idx);
      
      for (let i = layerIdx; i < Layers.all.length; i++) {
        if (Layers.all[i]?.type === 'filter' && !Layers.all[i]?.disabled) {
          Layers.all[i].canvas.clear();

          if (instant) {
            _throttledFilter.call(this, Layers.all[i]);
          } else {
            this.throttledFilter(Layers.all[i]);
          }
        }
      }
    },

    /**
     * Merges all layers and downloads in given format
     * @param {String} format - The format to download as (png, jpg)
     */
    download (format = 'png') {
      const date = new Date();

      // Create a new canvas that fits the size of all layers
      let x = 0;
      let xx = 0;
      let y = 0;
      let yy = 0;
      let smallestPixelDensity = 1;

      // Get dimensions and smallest pixel density
      Layers.all.forEach(layer => {
        if (x > layer.x) x = layer.x;
        if (xx < layer.x + layer.width) xx = layer.x + layer.width;
        if (y > layer.y) y = layer.y;
        if (yy < layer.y + layer.height) yy = layer.y + layer.height;
        smallestPixelDensity = layer.pixelDensity < smallestPixelDensity ? layer.pixelDensity : smallestPixelDensity;
      });

      p5Overrides.forEach(key => {
        window[key] = Layers._context[key];
      });

      // Create a new canvas and merge all layers
      resizeCanvas(xx - x, yy - y);
      pixelDensity(smallestPixelDensity);
      Layers.all.forEach(layer => {
        if (layer.canvas.elt.style.visibility.toLowerCase() !== 'hidden' && !layer.disabled) {
          image(layer.canvas, layer.x, layer.y);
        }
      });
      saveCanvas(`layers-${date.getFullYear()}${date.getMonth()}${date.getDate()}`, format);
    },

    throttledFilter: debounce(_throttledFilter, 1000, {leading: false}),

    listeners: {
      /**
       * Checks if a thing was clicked
       * - If right clicked without clicking on thing then the Tweakpane is shown
       * @param {*} ev 
       */
       click (ev) {
        // Run onClick
        if (ev.x > this.x && ev.x < this.x + this.width && ev.y > this.y && ev.y < this.y + this.height) {
          this.onClick && this.onClick.call(this, ev);
        }

        // Close all open menus
        Layers.closeMenus(ev);
      },

      /**
       * Contextmenu
       */
      contextmenu (ev) {
        for (let i = this.all.length - 1; i >= 0; i--) {
          const layer = this.all[i];
          if (!layer.disabled && !layer.menuDisabled) {
            let bounds = layer.canvas.canvas.getBoundingClientRect();
            let x = layer.x + bounds.x;
            let y = layer.y + bounds.y;

            // Only show when clicked within the layer
            if (ev.x > x && ev.x < x + layer.width && ev.y > y && ev.y < y + layer.height) {
              // Check if the pixel is empty
              const pixel = layer.canvas.get(ev.x-bounds.x, ev.y-bounds.y);
              if (pixel[3]) {
                ev.preventDefault();
                layer.showContextMenu(ev);
                return false
              }
            }
          }
        }
      },
    },

    /**
     * Connects to MIDI devices (this affects all layers)
     * @param ev The click event that triggered the menu
     * @param layer The layer that triggered the menu
     */
    connectMIDI (ev, layer) {
      wm.enable()
        .then(() => {
          // Make sure this only gets called once
          if (!this.midiConnected) {
            this.midiConnected = true;
            localStorage.setItem('shouldConnectMIDI', '1');

            wm.inputs.forEach(input => {
              input.addListener('controlchange', control => {
                this.onMIDIControlChange(control);
              });
            });
          }

          if (ev && layer) {
            setTimeout(() => {
              layer.listeners.menu.regenerate.call(layer, ev);
            }, 0);
          }
        });
    },
    disconnectMIDI (ev, layer) {
      this.midiConnected = false;
      localStorage.removeItem('shouldConnectMIDI');
      localStorage.removeItem('midi');
      wm.disable();

      if (ev && layer) {
        setTimeout(() => {
          layer.listeners.menu.regenerate.call(layer, ev);
        }, 0);
      }
    },

    /**
     * Start listening to MIDI devices
     */
    startBindingMIDI () {
      this.isBindingMIDI = true;
    },

    /**
     * React to MIDI control changes (knobs, slider, etc)
     */
    onMIDIControlChange (control) {
      if (this.isBindingMIDI) {
        this.curBindingControl = control;
        this.maybeBindControlToLayer();
      }

      // Loop through layers and bound properties and update to match the control
      // @FIXME Lets compare direct midi values and channels, not properties
      Object.keys(this.midi).forEach(key => {
        this.midi[key].forEach(binding => {
          if (binding.control.channel === control.message.channel
          && binding.control.command === control.message.command
          && binding.control.controller.number === control.controller.number
          && binding.control.controller.name === control.controller.name) {
            const layer = Layers[key];
            if (!layer) return console.warn(`Layer ${key} not found`)
            const prop = layer.menu[binding.prop];

            if (prop.step) {
              Layers[key].store[binding.prop] = stepRound(map(control.data[2]/127, 0, 1, prop.min, prop.max), prop.step, prop.min);
            } else {
              Layers[key].store[binding.prop] = map(control.data[2]/127, 0, 1, prop.min, prop.max);
            }
            Layers[key].noLoop && Layers[key].throttledDraw();
            prop.onChange && prop.onChange.call(layer, Layers[key].store[binding.prop]);
            Layers[key].$menu?.refresh();
          }
        });
      });
    },

    /**
     * Bind the control to the layers property
     */
     maybeBindControlToLayer () {
      if (this.curBindingControl && this.curBindingProp) {
        this.bindControlToLayer();
      }
    },
    bindControlToLayer () {
      this.isBindingMIDI = false;

      if (!this.midi[this.curBindingLayer.id]) {
        this.midi[this.curBindingLayer.id] = [];
      }

      // Loop through existing bindings and remove and matching this control
      Object.keys(this.midi).forEach(key => {
        this.midi[key].forEach(binding => {
          if (binding.control.channel === this.curBindingControl.message.channel
          && binding.control.command === this.curBindingControl.message.command
          && binding.control.controller.number === this.curBindingControl.controller.number
          && binding.control.controller.name === this.curBindingControl.controller.name) {
            this.midi[key].splice(this.midi[key].indexOf(binding), 1);
          }
        });
      });

      // Define binding
      const binding = {
        prop: this.curBindingProp,
        control: {
          controller: this.curBindingControl.controller,
          channel: this.curBindingControl.message.channel,
          command: this.curBindingControl.message.command,
          input: {
            id: this.curBindingControl.port._midiInput.id,
            manufacturer: this.curBindingControl.port._midiInput.manufacturer,
            name: this.curBindingControl.port._midiInput.name,
          }
        }
      };
      
      this.midi[this.curBindingLayer.id].push(binding);
      localStorage.setItem('midi', JSON.stringify(this.midi));
      // console.log('🎹 Bound MIDI to layer', this.curBindingLayer.id, this.curBindingProp, this.curBindingControl)

      this.isBindingMIDI = false;
      this.curBindingControl = null;
      this.curBindingProp = null;

      setTimeout(() => {
        Layers[this.curBindingLayer.id].showContextMenu(Layers[this.curBindingLayer.id]._showContextMenuEvent);
        this.curBindingLayer = null;
      }, 0);
    }
  };

  /**
   * Inject Shades of Purple Tweakpane styles
   */
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
  :root {
    --tp-base-background-color: hsla(243, 33%, 25%, 1.00);
    --tp-base-shadow-color: hsla(0, 0%, 0%, 0.25);
    --tp-button-background-color: hsla(49, 96%, 54%, 1.00);
    --tp-button-background-color-active: hsla(49, 96%, 39%, 1.00);
    --tp-button-background-color-focus: hsla(49, 96%, 44%, 1.00);
    --tp-button-background-color-hover: hsla(49, 96%, 49%, 1.00);
    --tp-button-foreground-color: hsla(240, 35%, 18%, 1.00);
    --tp-container-background-color: hsla(0, 0%, 0%, 0.20);
    --tp-container-background-color-active: rgba(38, 38, 38, 0.20);
    --tp-container-background-color-focus: rgba(26, 26, 26, 0.20);
    --tp-container-background-color-hover: rgba(13, 13, 13, 0.20);
    --tp-container-foreground-color: hsla(249, 65%, 76%, 1.00);
    --tp-groove-foreground-color: hsla(0, 0%, 0%, 0.50);
    --tp-input-background-color: hsla(240, 35%, 18%, 1.00);
    --tp-input-background-color-active: rgba(55, 55, 114, 1.00);
    --tp-input-background-color-focus: hsla(240, 35%, 33%, 1.00);
    --tp-input-background-color-hover: rgba(38, 38, 79, 1.00);
    --tp-input-foreground-color: hsla(0, 0%, 100%, 0.90);
    --tp-label-foreground-color: hsla(249, 65%, 76%, 1.00);
    --tp-monitor-background-color: hsla(0, 0%, 0%, 0.50);
    --tp-monitor-foreground-color: hsla(249, 65%, 76%, 1.00);
  }
  
  body .tp-dfwv {
    min-width: 300px;
    z-index: 999999999999;
  }
  /* Input and monitor view */
  body .tp-lblv_v {
    min-width: 180px;
  }
  /* scrollable panels */
  .tp-fldv .tp-brkv {
    max-height: 300px;
    overflow-y: auto !important;
  }
  `;
    document.head.appendChild(style);
  }

  // Globals
  globalThis.Tweakpane = Tweakpane__namespace;

  /**
   * Shows the context menu for the Moar
   */
  var contextMenu = {
    /**
     * Displays the clicked layer's menu, along with the other layers' menus as a context menu
     */
    showContextMenu (ev) {
      Layers.closeMenus(ev);
      this._showContextMenuEvent = ev;
      this._hasDraggedMenu = false;

      if (!this.$menu){
        this.$menu = new Tweakpane__namespace.Pane();
        this.$menu.registerPlugin(EssentialsPlugin__namespace);
        this.$menu.$folder = {};
        Layers.openMenus.push(this);

        // General settings
        const general = this.$menu.$folder.general = this.$menu.addFolder({
          title: `Layer: ${this.id}`,
          expanded: true
        });

        // More settings
        if (this.menu) {
          Object.keys(this.menu).forEach(key => {
            const menu = this.menu[key];
            const maybeBindControlToLayer = () => {
              // Check if currently binding
              if (Layers.isBindingMIDI && !Layers.curBindingProp) {
                Layers.curBindingProp = key;
                Layers.maybeBindControlToLayer();
                setTimeout(() => {
                  this.showContextMenu(ev);
                }, 0);
              }
            };

            switch (menu.type) {
              case 'slider':
                general.addInput(this.store, key, {
                  min: menu.min,
                  max: menu.max,
                  step: menu.step
                }).on('change', ev => {
                  menu.onChange.call(this, ev);
                  maybeBindControlToLayer();
                })
                .on('click', ev => {
                  maybeBindControlToLayer();
                });
              break              
            }
          });
        }
        if (typeof this.onMenu === 'function') {
          this.onMenu.call(this, {
            general
          });
        }

        // Regenerate
        general.addBlade({
          view: 'buttongrid',
          size: [2, 1],
          cells: (x, y) => ({
            title: [
              ['Regenerate All', 'Regenerate Current']
            ][y][x]
          }),
        }).on('click', (ev) => {
          switch (ev.index[0]) {
            // Regenerate all layers
            case 0:
              // Regenerate Layers.generate() callbacks
              document.dispatchEvent(new CustomEvent('layers-regenerate-all', {detail: this}));
              Layers.dispose();
              Layers.generateCallbacks && Layers.generateCallbacks.forEach(callback => callback());
              
              // Show context on topmost non-filter, non-hidden layer
              Layers.all.reverse().find(layer => layer.type !== 'filter' && !layer.disabled).showContextMenu(this._showContextMenuEvent);
              Layers.all.reverse();
            break
            // Regenerate layer
            case 1:
              document.dispatchEvent(new CustomEvent('layers-regenerate', {detail: this}));
              this.listeners.menu.regenerate.call(this, ev);
              Layers.updateFilters(this);
            break
          }
        });

        // Global settings
        if (typeof Layers.hooks.globalSettings === 'function') {
          const global = this.$menu.$folder.global = general.addFolder({
            title: 'Global Settings',
            expanded: true
          });
          
          Layers.hooks.globalSettings({
            general,
            global
          });
        }

        // Layer toggle
        const layerToggle = this.$menu.$folder.layerToggle = this.$menu.addFolder({
          title: 'Toggle Layers',
          expanded: false
        });

        const layerVisibility = {};
        const layers = [...Layers.all];
        layers.reverse().forEach(layer => {
          layerVisibility[layer.id] = !layer.disabled;
          layerToggle.addInput(layerVisibility, String(layer.id))
            .on('change', () => {
              layer.toggle();
            });
        });

        // MIDI
        this.addMIDIButtons(ev, general, layerToggle);

        // Save
        const save = this.$menu.$folder.save = this.$menu.addFolder({
          title: '💾 Save',
          expanded: false
        });
        const buttons = ['PNG', 'JPG'];
        save.addBlade({
          view: 'buttongrid',
          size: [2, 1],
          cells: (x, y) => ({
            title: buttons[y * 2 + x], value: buttons[y * 2 + x]
          }),
        }).on('click', (ev) => {
          if (ev.index[0] === 0 && ev.index[1] === 0) {
            Layers.download('png');
          } else if (ev.index[0] === 1 && ev.index[1] === 0) {
            Layers.download('jpg');
          }
        });

        // Update filter layers above this layer
        // Persist data to localstorage
        this.$menu.on('change', () => {
          Layers.updateFilters(this);

          // Store menu states
          Layers.sessionData = {};
          Layers.all.forEach(layer => {
            Layers.sessionData[layer.id] = {
              disabled: layer.disabled
            };
          });
          localStorage.setItem('layers', JSON.stringify(Layers.sessionData));
        });
      }

      // Handle drag
      let origOffset = {x: 0, y: 0};
      const $handle = this.$menu.containerElem_.querySelector('.tp-fldv_b');
      $handle.closest('.tp-dfwv').addEventListener('click', (ev) => {
        // This can be empty when this menu is regenerated
        if (this.$menu) {
          this.$menu.$folder.general.disabled = false;
          this._hasDraggedMenu = false;
        }
      });
      $handle.addEventListener('mousedown', (ev) => {
        const bounds = this.$menu.containerElem_.getBoundingClientRect();
        origOffset.x = ev.x - bounds.x;
        origOffset.y = ev.y - bounds.y;
      });
      $handle.addEventListener('mouseup', (ev) => {
        if (this._hasDraggedMenu){
          this._hasDraggedMenu = false;
          globalThis.$handle = $handle;
          $handle.dispatchEvent(new MouseEvent('mouseup'));
          return
        }
      });
      $handle.addEventListener('mousemove', (ev) => {
        if (mouseIsPressed) {
          this.$menu.$folder.general.disabled = true;
          this._hasDraggedMenu = true;
        }
      });
      $handle.closest('.tp-dfwv').addEventListener('mousemove', (ev) => {
        if (this._hasDraggedMenu) {
          this.$menu.containerElem_.style.left = `${ev.x - origOffset.x}px`;
          this.$menu.containerElem_.style.top = `${ev.y - origOffset.y}px`;
        }
      });
      
      // Move the menu to the mouse position
      const bounds = this.$menu.containerElem_.getBoundingClientRect();
      this.$menu.containerElem_.style.position = 'fixed';
      if (ev.x + bounds.width > width + globalThis.innerWidth) {
        this.$menu.containerElem_.style.left = (width + globalThis.innerWidth - bounds.width) + 'px';
      } else {
        this.$menu.containerElem_.style.left = ev.x + 'px';
      }
      if (ev.y + bounds.height > height + globalThis.innerHeight) {
        this.$menu.containerElem_.style.top = (height + globalThis.innerHeight - bounds.height) + 'px';
      } else {
        this.$menu.containerElem_.style.top = ev.y + 'px';
      }
    },

    /**
     * Goes through the menu object and sets defaults
     * - Also sets a default .store value
     */
    parseMenu () {
      if (!this.menu) return

      Object.keys(this.menu).forEach(key => {
        const menu = this.menu[key];

        // Sliders
        if (menu.type === 'slider' || typeof menu === 'object') {
          Object.assign(menu, {
            min: menu.min || 0,
            max: menu.max || 1,
            type: 'slider',
          });
          if (!menu.onChange) {
            menu.onChange = function () {
              this.noLoop && this.draw();
            };
          }
          
          if (menu.step) {
            menu.step = menu.step;
          } else if (menu.max > 1) {
            menu.step = 1;
          } else {
            menu.step = 0.001;
          }

          // Add the item to the store if it doesn't exist
          if (!(key in this.store)) {
            this.store[key] = ('default' in menu) ? menu.default : stepRound(random(menu.min, menu.max), menu.step, menu.min);
          }
        }
      });
    }
  };

  var midiMenu = {
    addMIDIButtons (ev, generalMenu, layerMenu) {
      const midi = this.$menu.$folder.midi = this.$menu.addFolder({
        title: `MIDI Settings`,
        expanded: Layers.midiConnected
      });
      
      // Connect to MIDI
      if (!Layers.midiConnected) {
        midi.addBlade({
          view: 'buttongrid',
          size: [1, 1],
          cells: (x, y) => ({
            title: [
              ['🎹 Connect MIDI']
            ][y][x]
          }),
        }).on('click', () => {
          Layers.connectMIDI(ev, this);
        });

      // Disconnect from MIDI
      } else {
        let bindMidiMessage = 'Bind MIDI';
        if (Layers.isBindingMIDI) {
          if (Layers.curBindingControl) {
            bindMidiMessage = 'Click setting to bind';
          } else if (Layers.curBindingProp) {
            bindMidiMessage = 'Move MIDI control';
          } else {
            bindMidiMessage = 'Click setting';
          }
        }
        
        midi.addBlade({
          view: 'buttongrid',
          size: [2, 1],
          cells: (x, y) => ({
            title: [
              ['🔌 Disconnect MIDI', bindMidiMessage]
            ][y][x]
          }),
        }).on('click', (btnEv) => {
          if (btnEv.index[0] === 0) {
            Layers.disconnectMIDI(ev, this);
          } else {
            Layers.curBindingLayer = this;
            Layers.startBindingMIDI(ev, this);
            this.showContextMenu(ev);
          }
        });
      }
    }
  };

  class Layer {
    constructor (opts = {}) {
      // Methods
      this.showContextMenu = contextMenu.showContextMenu;
      this.parseMenu = contextMenu.parseMenu;
      this.addMIDIButtons = midiMenu.addMIDIButtons;
      this.connectMIDI = midiMenu.connectMIDI;
      
      // Default dimensions: parent size or fullscreen
      let w = Layers.target?.clientWidth || globalThis.width;
      let h = Layers.target?.clientHeight || globalThis.height;

      // Last moved target
      this._hasMovedTarget = null;
      this.requestAnimationFrameID = null;
      
      // Defaults
      this.opts = globalThis.defaultsDeep(opts, {
        id: Layers.curId,
        disabled: false,
        menuDisabled: false,
        type: 'layer',
        target: Layers.target || null,
        
        fps: 30,
        noLoop: false,
        // 0 for system default
        pixelDensity: 0,

        // Dimensions
        width: w,
        height: h,
        x: 0,
        y: 0,

        // Canvas
        canvas: null,
        offscreen: null,
        colors: Layers.default.colors,
        colorMode: Layers.default.colorMode,

        // Listeners
        onClick: null,
        beforeGenerate: null,
        afterGenerate: null,
        onDispose: null,
        
        // Custom methods
        methods: {},

        // Custom store
        store: {},
      });

      // Setup canvas
      this.generate();

      // Apply session data
      if (Layers.sessionData && this.id in Layers.sessionData) {
        this.disabled = Layers.sessionData[this.id].disabled;
      }
      
      // Store references
      Layers.curId++;
      Layers[this.id] = this;
      Layers.all.push(this);

      // Methods
      Object.keys(this.opts.methods).forEach(key => {
        if (this[key]) {
          console.error('Trying to create method "' + key + '" but it already exists in the Layer as a property or method.');
        } else {
          this[key] = this.opts.methods[key];
        }
      });

      this.callSetup();

      // Add a slight delay to draw to allow other setups() to finish
      // Add an extra delay to filters to allow for faster render on load
      if (this.type === 'filter' && !this.disabled) {
        Layers.mergeLayers(this);
        setTimeout(() => {
          this.draw();
        }, 0);
      } else if (!this.disabled) {
        this.draw();
      }
    }

    /**
     * Sets up or restores the layer to its default state
     */
    generate (callSetup) {
      // Aliases
      if (!this.id) this.id = this.opts.id;
      if (!this.canvas) this.canvas = this.opts.canvas;
      if (!this.offscreen) this.offscreen = this.opts.offscreen;
      if (!this.x) this.x = this.opts.x;
      if (!this.y) this.y = this.opts.y;
      if (!this.width) this.width = this.opts.width;
      if (!this.height) this.height = this.opts.height;
      if (!this.disabled) this.disabled = this.opts.disabled;
      if (!this.menuDisabled) this.menuDisabled = this.opts.menuDisabled;
      if (!this.colors) this.colors = this.opts.colors;
      if (!this.colorMode) this.colorMode = this.opts.colorMode;
      if (!this.beforeGenerate) this.beforeGenerate = this.opts.beforeGenerate;
      if (!this.afterGenerate) this.afterGenerate = this.opts.afterGenerate;
      if (!this.onDispose) this.onDispose = this.opts.onDispose;
      if (!this.setup) this.setup = this.opts.setup;
      if (!this.type) this.type = this.opts.type;
      if (!this.noLoop) this.noLoop = this.opts.noLoop;
      if (!this.pixelDensity) {
        this.pixelDensity = this.opts.pixelDensity || 1;
      }
      if (!this.fps) this.fps = this.opts.fps;
      if (!this.target) this.target = this.opts.target;

      // Menu
      this.menu = cloneDeep(this.opts.menu);
      this.store = cloneDeep(this.opts.store);
      this.parseMenu();

      // Canvas
      if (!this.canvas) {
        this.canvas = createGraphics(this.width, this.height); // Main layer
      }
      if (!this.offscreen) {
        this.offscreen = createGraphics(this.width, this.height); // Buffer for individual things
      }
      if (this.pixelDensity) {
        this.canvas.pixelDensity(this.pixelDensity);
        this.offscreen.pixelDensity(this.pixelDensity);
      }
      this.canvas.elt.classList.add('midifungi-layer', `midifungi-layer-${this.id}`);
      this.offscreen.elt.classList.add('midifungi-offscreen', `midifungi-layer-${this.id}`);

      // Setup the target to receive the canvases
      if (this.target && !this._hasMovedTarget) {
        this._hasMovedTarget = true;
        this.canvas.elt.style.width = '100%';
        this.canvas.elt.style.height = '100%';

        this.target.appendChild(this.canvas.elt);
        this.target.appendChild(this.offscreen.elt);
        
        if (!this.target.style.position) {
          this.target.style.position = 'relative';
        }
      }
      this.canvas.elt.style.position = `absolute`;
      this.canvas.elt.style.display = 'block';
      this.canvas.elt.style.left = `${this.x}px`;
      this.canvas.elt.style.top = `${this.y}px`;

      this.canvas.colorMode(...this.colorMode);
      this.offscreen.colorMode(...this.colorMode);
      this.canvas.clear();
      this.offscreen.clear();

      // Throttled functions
      this.throttledDraw = throttle(this.draw.bind(this), 1000/this.opts.fps);

      this.useGlobalContext();
      this.beforeGenerate && this.beforeGenerate();
      this.restoreGlobalContext();

      // Setup
      if (this.setup && !this._hasSetContextOnSetup) {
        this._hasSetContextOnSetup = true;
        const _setup = this.setup;
        this.setup = function () {
          this.useGlobalContext();
          _setup.call(this, this.canvas, this.offscreen);
          this.restoreGlobalContext();
        };
      }
      callSetup && this.callSetup();
      
      this.useGlobalContext();
      this.afterGenerate && this.afterGenerate();
      this.restoreGlobalContext();
    }

    /**
     * Calls the setup method if it exists
     * - Temporarily changes the _renderer target
     */
    callSetup () {
      // Call the setup
      this.setup && this.setup.call(this, this.offscreen);

      // Call the Layers setup hook
      Layers.setup && Layers.setup.call(this, this.offscreen);
    }

    /**
     * Toggle the layer on/off
     */
    disable () {this.hide();}
    hide () {
      this.disabled = true;
      this.canvas.elt.style.display = 'none';
    }
    enable () {this.show();}
    show () {
      this.disabled = false;
      this.canvas.elt.style.display = 'block';
      this.draw();
    }
    toggle () {
      if (this.disabled) this.show();
      else this.hide();
    }

    /**
     * Draw loop
     */
    draw () {
      if (!this.disabled) {
        // Update position
        if (!this._lastX !== this.x || !this._lastY !== this.y) {
          this.canvas.elt.style.left = `${this.x}px`;
          this.canvas.elt.style.top = `${this.y}px`;
        }

        // Draw
        this.useGlobalContext();
        this.opts.draw && this.opts.draw.call(this, this.offscreen);
        this.restoreGlobalContext();
    
        this._lastX = this.x;
        this._lastY = this.y;
      }

      // Loop drawing
      this.requestAnimationFrameID = requestAnimationFrame(() => !Layers.noLoop && !this.noLoop && this.draw());
    }

    /**
     * Updates the global context so that all renders happen on current layer
     * (eg rect, circle, etc without having to type canvas.rect())
     */
    useGlobalContext () {
      if (Layers._globalContextLayer === this.id) return
      Layers._globalContextLayer = this.id;

      this._context = {};
      this._storeContext = {};
      p5Overrides.forEach(key => {
        this._context[key] = window[key];
        window[key] = key === 'canvas' ? this.canvas.elt : this.canvas[key];
      });

      // Manual overrides
      globalThis.loadPixels = () => {
        this.canvas.loadPixels();
        globalThis.pixels = this.canvas.pixels;
      };

      // Add this.$ variables
      Object.keys(this.store).forEach(key => {
        if (window[`$${key}`]) {
          console.warn(window[`$${key}`], `$${key} is already defined and cannot be used as a store key for Layer: ${this.id}`);
        } else {
          window[`$${key}`] = this.store[key];
          this._storeContext[key] = true;
        }
      });
    }
    restoreGlobalContext () {
      Layers._globalContextLayer = null;

      p5Overrides.forEach(key => {
        window[key] = this._context[key];
      });

      // Remove this.$ variables
      Object.keys(this._storeContext).forEach(key => {
        this.store[key] = window[`$${key}`];
        delete window[`$${key}`];
      });
    }

    /**
     * Free memory and delete reference from Layers
     */
    dispose () {
      globalThis.cancelAnimationFrame(this.requestAnimationFrameID);
      this.requestAnimationFrameID = null;
      this.onDispose && this.onDispose();
      this.canvas.remove();
      this.offscreen.remove();

      const id = this.id;
      const idx = Layers.all.findIndex(layer => layer.id === this.id);
      Layers.all.splice(idx, 1);
      delete Layers[id];
    }

    /**
     * Moves the layer up/down within the stack
     * @param {*} seconds 
     * @returns 
     */
    moveDown () {
      const idx = Layers.all.findIndex(layer => layer.id === this.id);
      if (idx) {
        const curCanvas = this.canvas.elt;
        const curOffscreen = this.offscreen.elt;
        const targetCanvas = Layers.all[idx-1].canvas.elt;
        const targetOffscreen = Layers.all[idx-1].offscreen.elt;
        
        this.canvas.elt.parentElement.insertBefore(curCanvas, targetCanvas);
        this.canvas.elt.parentElement.insertBefore(curOffscreen, targetOffscreen);
        
        Layers.all.splice(idx, 1);
        Layers.all.splice(idx-1, 0, this);
      }
    }
    moveUp () {
      const idx = Layers.all.findIndex(layer => layer.id === this.id);
      if (idx < Layers.all.length - 1) {
        const curCanvas = this.canvas.elt;
        const curOffscreen = this.offscreen.elt;
        const targetCanvas = Layers.all[idx+1].canvas.elt;
        const targetOffscreen = Layers.all[idx+1].offscreen.elt;

        this.canvas.elt.parentElement.insertAfter(curCanvas, targetCanvas);
        this.canvas.elt.parentElement.insertAfter(curOffscreen, targetOffscreen);

        Layers.all.splice(idx, 1);
        Layers.all.splice(idx+1, 0, this);
      }
    }
    
    /**
     * Uses frameCount to return the progress within a loop of the passed number of seconds
     * @param {*} seconds 
     * @returns 
     */
    getProgress (seconds = 4) {
      const period = +params.fps * seconds / 2;
      return (frameCount % period) / period
    }

    /**
     * Core Event listeners
     */
    listeners = {
      menu: {
        regenerate: ev => {
          this.generate(true);
          this.draw();
          this.showContextMenu(this._showContextMenuEvent);
        }
      }
    }
  }

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new ListCache;
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag$2 = '[object Function]',
      genTag$1 = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
  }

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root['__core-js_shared__'];

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$b = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$9).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /* Built-in method references that are verified to be native. */
  var Map = getNative(root, 'Map');

  /* Built-in method references that are verified to be native. */
  var nativeCreate = getNative(Object, 'create');

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED$1 ? undefined : result;
    }
    return hasOwnProperty$8.call(data, key) ? data[key] : undefined;
  }

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$7.call(data, key);
  }

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
    return this;
  }

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash,
      'map': new (Map || ListCache),
      'string': new Hash
    };
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  var defineProperty = (function() {
    try {
      var func = getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && defineProperty) {
      defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$6.call(object, key) && eq(objValue, value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;

      if (newValue === undefined) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /** `Object#toString` result references. */
  var argsTag$2 = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$2;
  }

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$5.call(value, 'callee') &&
      !propertyIsEnumerable$1.call(value, 'callee');
  };

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  /** Detect free variable `exports`. */
  var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

  /** Built-in value references. */
  var Buffer$1 = moduleExports$2 ? root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      boolTag$2 = '[object Boolean]',
      dateTag$2 = '[object Date]',
      errorTag$1 = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag$4 = '[object Map]',
      numberTag$2 = '[object Number]',
      objectTag$3 = '[object Object]',
      regexpTag$2 = '[object RegExp]',
      setTag$4 = '[object Set]',
      stringTag$2 = '[object String]',
      weakMapTag$2 = '[object WeakMap]';

  var arrayBufferTag$2 = '[object ArrayBuffer]',
      dataViewTag$3 = '[object DataView]',
      float32Tag$2 = '[object Float32Array]',
      float64Tag$2 = '[object Float64Array]',
      int8Tag$2 = '[object Int8Array]',
      int16Tag$2 = '[object Int16Array]',
      int32Tag$2 = '[object Int32Array]',
      uint8Tag$2 = '[object Uint8Array]',
      uint8ClampedTag$2 = '[object Uint8ClampedArray]',
      uint16Tag$2 = '[object Uint16Array]',
      uint32Tag$2 = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
  typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
  typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
  typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
  typedArrayTags[uint32Tag$2] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
  typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] =
  typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] =
  typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] =
  typedArrayTags[objectTag$3] = typedArrayTags[regexpTag$2] =
  typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] =
  typedArrayTags[weakMapTag$2] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike(value) &&
      isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /** Detect free variable `exports`. */
  var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports$1 && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value),
        isArg = !isArr && isArguments(value),
        isBuff = !isArr && !isArg && isBuffer(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$4.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

    return value === proto;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = overArg(Object.keys, Object);

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }

  /**
   * The base implementation of `_.assign` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign(object, source) {
    return object && copyObject(source, keys(source), object);
  }

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$2.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }

  /**
   * The base implementation of `_.assignIn` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssignIn(object, source) {
    return object && copyObject(source, keysIn(source), object);
  }

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

    buffer.copy(result);
    return result;
  }

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return [];
  }

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };

  /**
   * Copies own symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbols(source, object) {
    return copyObject(source, getSymbols(source), object);
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  /** Built-in value references. */
  var getPrototype = overArg(Object.getPrototypeOf, Object);

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own and inherited enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
    var result = [];
    while (object) {
      arrayPush(result, getSymbols(object));
      object = getPrototype(object);
    }
    return result;
  };

  /**
   * Copies own and inherited symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbolsIn(source, object) {
    return copyObject(source, getSymbolsIn(source), object);
  }

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeysIn(object) {
    return baseGetAllKeys(object, keysIn, getSymbolsIn);
  }

  /* Built-in method references that are verified to be native. */
  var DataView = getNative(root, 'DataView');

  /* Built-in method references that are verified to be native. */
  var Promise$1 = getNative(root, 'Promise');

  /* Built-in method references that are verified to be native. */
  var Set = getNative(root, 'Set');

  /* Built-in method references that are verified to be native. */
  var WeakMap = getNative(root, 'WeakMap');

  /** `Object#toString` result references. */
  var mapTag$3 = '[object Map]',
      objectTag$2 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$3 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';

  var dataViewTag$2 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = toSource(DataView),
      mapCtorString = toSource(Map),
      promiseCtorString = toSource(Promise$1),
      setCtorString = toSource(Set),
      weakMapCtorString = toSource(WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
      (Map && getTag(new Map) != mapTag$3) ||
      (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
      (Set && getTag(new Set) != setTag$3) ||
      (WeakMap && getTag(new WeakMap) != weakMapTag$1)) {
    getTag = function(value) {
      var result = baseGetTag(value),
          Ctor = result == objectTag$2 ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag$2;
          case mapCtorString: return mapTag$3;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag$3;
          case weakMapCtorString: return weakMapTag$1;
        }
      }
      return result;
    };
  }

  var getTag$1 = getTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray(array) {
    var length = array.length,
        result = new array.constructor(length);

    // Add properties assigned by `RegExp#exec`.
    if (length && typeof array[0] == 'string' && hasOwnProperty$1.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  /** Built-in value references. */
  var Uint8Array$1 = root.Uint8Array;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
    return result;
  }

  /**
   * Creates a clone of `dataView`.
   *
   * @private
   * @param {Object} dataView The data view to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned data view.
   */
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /**
   * Creates a clone of `regexp`.
   *
   * @private
   * @param {Object} regexp The regexp to clone.
   * @returns {Object} Returns the cloned regexp.
   */
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
      symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  /** `Object#toString` result references. */
  var boolTag$1 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      mapTag$2 = '[object Map]',
      numberTag$1 = '[object Number]',
      regexpTag$1 = '[object RegExp]',
      setTag$2 = '[object Set]',
      stringTag$1 = '[object String]',
      symbolTag$1 = '[object Symbol]';

  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]',
      float32Tag$1 = '[object Float32Array]',
      float64Tag$1 = '[object Float64Array]',
      int8Tag$1 = '[object Int8Array]',
      int16Tag$1 = '[object Int16Array]',
      int32Tag$1 = '[object Int32Array]',
      uint8Tag$1 = '[object Uint8Array]',
      uint8ClampedTag$1 = '[object Uint8ClampedArray]',
      uint16Tag$1 = '[object Uint16Array]',
      uint32Tag$1 = '[object Uint32Array]';

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag$1:
        return cloneArrayBuffer(object);

      case boolTag$1:
      case dateTag$1:
        return new Ctor(+object);

      case dataViewTag$1:
        return cloneDataView(object, isDeep);

      case float32Tag$1: case float64Tag$1:
      case int8Tag$1: case int16Tag$1: case int32Tag$1:
      case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
        return cloneTypedArray(object, isDeep);

      case mapTag$2:
        return new Ctor;

      case numberTag$1:
      case stringTag$1:
        return new Ctor(object);

      case regexpTag$1:
        return cloneRegExp(object);

      case setTag$2:
        return new Ctor;

      case symbolTag$1:
        return cloneSymbol(object);
    }
  }

  /** Built-in value references. */
  var objectCreate = Object.create;

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object;
      object.prototype = undefined;
      return result;
    };
  }());

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !isPrototype(object))
      ? baseCreate(getPrototype(object))
      : {};
  }

  /** `Object#toString` result references. */
  var mapTag$1 = '[object Map]';

  /**
   * The base implementation of `_.isMap` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   */
  function baseIsMap(value) {
    return isObjectLike(value) && getTag$1(value) == mapTag$1;
  }

  /* Node.js helper references. */
  var nodeIsMap = nodeUtil && nodeUtil.isMap;

  /**
   * Checks if `value` is classified as a `Map` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   * @example
   *
   * _.isMap(new Map);
   * // => true
   *
   * _.isMap(new WeakMap);
   * // => false
   */
  var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

  /** `Object#toString` result references. */
  var setTag$1 = '[object Set]';

  /**
   * The base implementation of `_.isSet` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   */
  function baseIsSet(value) {
    return isObjectLike(value) && getTag$1(value) == setTag$1;
  }

  /* Node.js helper references. */
  var nodeIsSet = nodeUtil && nodeUtil.isSet;

  /**
   * Checks if `value` is classified as a `Set` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   * @example
   *
   * _.isSet(new Set);
   * // => true
   *
   * _.isSet(new WeakSet);
   * // => false
   */
  var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG$1 = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG$1 = 4;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag$1 = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
  cloneableTags[boolTag] = cloneableTags[dateTag] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag] =
  cloneableTags[numberTag] = cloneableTags[objectTag$1] =
  cloneableTags[regexpTag] = cloneableTags[setTag] =
  cloneableTags[stringTag] = cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

  /**
   * The base implementation of `_.clone` and `_.cloneDeep` which tracks
   * traversed objects.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Deep clone
   *  2 - Flatten inherited properties
   *  4 - Clone symbols
   * @param {Function} [customizer] The function to customize cloning.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The parent object of `value`.
   * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result,
        isDeep = bitmask & CLONE_DEEP_FLAG$1,
        isFlat = bitmask & CLONE_FLAT_FLAG,
        isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
      return result;
    }
    if (!isObject(value)) {
      return value;
    }
    var isArr = isArray(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return copyArray(value, result);
      }
    } else {
      var tag = getTag$1(value),
          isFunc = tag == funcTag || tag == genTag;

      if (isBuffer(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag == objectTag$1 || tag == argsTag || (isFunc && !object)) {
        result = (isFlat || isFunc) ? {} : initCloneObject(value);
        if (!isDeep) {
          return isFlat
            ? copySymbolsIn(value, baseAssignIn(result, value))
            : copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag(value, tag, isDeep);
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new Stack);
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);

    if (isSet(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap(value)) {
      value.forEach(function(subValue, key) {
        result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
    }

    var keysFunc = isFull
      ? (isFlat ? getAllKeysIn : getAllKeys)
      : (isFlat ? keysIn : keys);

    var props = isArr ? undefined : keysFunc(value);
    arrayEach(props || value, function(subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }
      // Recursively populate clone (susceptible to call stack limits).
      assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
  }

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_SYMBOLS_FLAG = 4;

  /**
   * This method is like `_.clone` except that it recursively clones `value`.
   *
   * @static
   * @memberOf _
   * @since 1.0.0
   * @category Lang
   * @param {*} value The value to recursively clone.
   * @returns {*} Returns the deep cloned value.
   * @see _.clone
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var deep = _.cloneDeep(objects);
   * console.log(deep[0] === objects[0]);
   * // => false
   */
  function cloneDeep$1(value) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
  }

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !defineProperty ? identity : function(func, string) {
    return defineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant(string),
      'writable': true
    });
  };

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = shortOut(baseSetToString);

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return setToString(overRest(func, start, identity), func + '');
  }

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue(object, key, value) {
    if ((value !== undefined && !eq(object[key], value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = createBaseFor();

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  /** `Object#toString` result references. */
  var objectTag = '[object Object]';

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString;
  }

  /**
   * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function safeGet(object, key) {
    if (key === 'constructor' && typeof object[key] === 'function') {
      return;
    }

    if (key == '__proto__') {
      return;
    }

    return object[key];
  }

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */
  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key),
        srcValue = safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer
      ? customizer(objValue, srcValue, (key + ''), object, source, stack)
      : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray(srcValue),
          isBuff = !isArr && isBuffer(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray(srcValue);

      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray(objValue)) {
          newValue = objValue;
        }
        else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        }
        else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        }
        else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        }
        else {
          newValue = [];
        }
      }
      else if (isPlainObject(srcValue) || isArguments(srcValue)) {
        newValue = objValue;
        if (isArguments(objValue)) {
          newValue = toPlainObject(objValue);
        }
        else if (!isObject(objValue) || isFunction(objValue)) {
          newValue = initCloneObject(srcValue);
        }
      }
      else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    assignMergeValue(object, key, newValue);
  }

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor(source, function(srcValue, key) {
      stack || (stack = new Stack);
      if (isObject(srcValue)) {
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      }
      else {
        var newValue = customizer
          ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
          : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }

  /**
   * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
   * objects into destination objects that are passed thru.
   *
   * @private
   * @param {*} objValue The destination value.
   * @param {*} srcValue The source value.
   * @param {string} key The key of the property to merge.
   * @param {Object} object The parent object of `objValue`.
   * @param {Object} source The parent object of `srcValue`.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   * @returns {*} Returns the value to assign.
   */
  function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
    if (isObject(objValue) && isObject(srcValue)) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, objValue);
      baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
      stack['delete'](srcValue);
    }
    return objValue;
  }

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number'
          ? (isArrayLike(object) && isIndex(index, object.length))
          : (type == 'string' && index in object)
        ) {
      return eq(object[index], value);
    }
    return false;
  }

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = (assigner.length > 3 && typeof customizer == 'function')
        ? (length--, customizer)
        : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  /**
   * This method is like `_.merge` except that it accepts `customizer` which
   * is invoked to produce the merged values of the destination and source
   * properties. If `customizer` returns `undefined`, merging is handled by the
   * method instead. The `customizer` is invoked with six arguments:
   * (objValue, srcValue, key, object, source, stack).
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} sources The source objects.
   * @param {Function} customizer The function to customize assigned values.
   * @returns {Object} Returns `object`.
   * @example
   *
   * function customizer(objValue, srcValue) {
   *   if (_.isArray(objValue)) {
   *     return objValue.concat(srcValue);
   *   }
   * }
   *
   * var object = { 'a': [1], 'b': [2] };
   * var other = { 'a': [3], 'b': [4] };
   *
   * _.mergeWith(object, other, customizer);
   * // => { 'a': [1, 3], 'b': [2, 4] }
   */
  var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
    baseMerge(object, source, srcIndex, customizer);
  });

  /**
   * This method is like `_.defaults` except that it recursively assigns
   * default properties.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.defaults
   * @example
   *
   * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
   * // => { 'a': { 'b': 2, 'c': 3 } }
   */
  var defaultsDeep = baseRest(function(args) {
    args.push(undefined, customDefaultsMerge);
    return apply(mergeWith, undefined, args);
  });

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object));
  }

  /** Error message constants. */
  var FUNC_ERROR_TEXT$1 = 'Expected a function';

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    var memoized = function() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache);
    return memoized;
  }

  // Expose `MapCache`.
  memoize.Cache = MapCache;

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /** Used as references for various `Number` constants. */
  var INFINITY$1 = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return arrayMap(value, baseToString) + '';
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
  }

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    return value == null ? '' : baseToString(value);
  }

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value, object) {
    if (isArray(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath(toString(value));
  }

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  /**
   * The base implementation of `_.set`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @param {Function} [customizer] The function to customize path creation.
   * @returns {Object} Returns `object`.
   */
  function baseSet(object, path, value, customizer) {
    if (!isObject(object)) {
      return object;
    }
    path = castPath(path, object);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = toKey(path[index]),
          newValue = value;

      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return object;
      }

      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;
        if (newValue === undefined) {
          newValue = isObject(objValue)
            ? objValue
            : (isIndex(path[index + 1]) ? [] : {});
        }
      }
      assignValue(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }

  /**
   * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
   * it's created. Arrays are created for missing index properties while objects
   * are created for all other missing properties. Use `_.setWith` to customize
   * `path` creation.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.set(object, 'a[0].b.c', 4);
   * console.log(object.a[0].b.c);
   * // => 4
   *
   * _.set(object, ['x', '0', 'y', 'z'], 5);
   * console.log(object.x[0].y.z);
   * // => 5
   */
  function set(object, path, value) {
    return object == null ? object : baseSet(object, path, value);
  }

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = castPath(path, object);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a throttled function that only invokes `func` at most once per
   * every `wait` milliseconds. The throttled function comes with a `cancel`
   * method to cancel delayed `func` invocations and a `flush` method to
   * immediately invoke them. Provide `options` to indicate whether `func`
   * should be invoked on the leading and/or trailing edge of the `wait`
   * timeout. The `func` is invoked with the last arguments provided to the
   * throttled function. Subsequent calls to the throttled function return the
   * result of the last `func` invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the throttled function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.throttle` and `_.debounce`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to throttle.
   * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=true]
   *  Specify invoking on the leading edge of the timeout.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * // Avoid excessively updating the position while scrolling.
   * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
   *
   * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
   * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
   * jQuery(element).on('click', throttled);
   *
   * // Cancel the trailing throttled invocation.
   * jQuery(window).on('popstate', throttled.cancel);
   */
  function throttle$1(func, wait, options) {
    var leading = true,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    if (isObject(options)) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    return debounce(func, wait, {
      'leading': leading,
      'maxWait': wait,
      'trailing': trailing
    });
  }

  globalThis.cloneDeep = cloneDeep$1;
  globalThis.defaultsDeep = defaultsDeep;
  globalThis.set = set;
  globalThis.get = get;
  globalThis.throttle = throttle$1;

  // @see https://github.com/jamestalmage/normalize-range/blob/master/index.js
  globalThis.wrap = function (value, min, max) {
    var maxLessMin = max - min;
    return ((value - min) % maxLessMin + maxLessMin) % maxLessMin + min;
  };

  /**
   * Uses frameCount to return the progress within a loop of the passed number of seconds
   * @param {*} seconds 
   * @returns 
   */
  globalThis.getProgress = function (seconds = 7) {
    const period = +params.fps * seconds / 2;
    return (frameCount % period) / period
  }; 

  /**
   * @see https://stackoverflow.com/a/14627826
   * @param {*} number The number to round
   * @param {*} increment The increment to round to
   * @param {*} offset The number to start stepping from
   * @returns 
   */
  globalThis.stepRound = function (number, increment, offset) {
    return Math.ceil((number - offset) / increment ) * increment + offset;
  };

  /**
   * Polygons
   * @see https://p5js.org/examples/form-regular-polygon.html
   */
  globalThis.polygon = function (x, y, radius, npoints, canv) {
    if (!canv) canv = window;
    
    const angle = TWO_PI / npoints;
    canv.beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      const sx = x + cos(a) * radius;
      const sy = y + sin(a) * radius;
      canv.vertex(sx, sy);
    }
    canv.endShape(CLOSE);
  };

  /**
   * Midifungi 🎹🍄
   * A p5js library that helps you organize your code into layers
   * ---
   * @version 0.0.13
   * @license "Apache 2.0" with the addendum that you cannot use this or its output for NFTs without permission
   */

  // These are being added from somewhere but I can't pin point it yet
  let _set, _get;

  /**
   * Run Layers.generate callbacks
   */
  const onSetup = function () {
    if (!globalThis.p5) {
      setTimeout(onSetup, 1);
      return
    }

    // Exports
    globalThis.Layers = Layers$1;
    globalThis.Layer = Layer;

    globalThis.p5.disableFriendlyErrors = true;
    Layers$1.init();

    // Restore funky _get, _set
    if (_get) {
      globalThis.get = _get;
    }
    if (_set) {
      globalThis.set = _set;
    }

    globalThis.params = Object.assign({
      fps: 30,
      seed: null,
      skipnoise: 0,
      
      // Width of canvas, centered
      width: 0,
      height: 0,
    }, globalThis.getURLParams());

    // ccapture
    if (+params.record) {
      globalThis.capturer = new CCapture({
        format: 'webm',
        framerate: +params.fps,
        verbose: true,
        display: true,
        timeLimit: +params.recordTime
      });

      !params.record && params.fps && frameRate(params.fps);
    }

    // let w = +params.width || min(windowWidth, windowHeight)
    // let h = +params.height || min(windowWidth, windowHeight)
    let w = +params.width || windowWidth;
    let h = +params.height ||windowHeight;
    globalThis.windowRatio = min(w, h) / max(w, h);

    noLoop();
    createCanvas(w, h);
    recenter();
    canvas.style.display = 'none';

    /**
     * Handle keypressed across multiple files
     */
    globalThis.windowResized = globalThis.throttle(function () {
      let w = +params.width || windowWidth;
      let h = +params.height || windowHeight;

      resizeCanvas(w, h);
      generateLayers();
    }, 1000/60, {trailing: true});

    // Seed
    randomSeed(globalThis._seed);
    noiseSeed(globalThis._seed);
    reseed();

    // Global helpers
    globalThis.minSize = min(width, height);
    globalThis.maxSize = max(width, height);

    // Backup default states before any p5 overrides
    p5Overrides.forEach(key => {
      Layers$1._context[key] = window[key];
    });
    
    // Generate layers
    Layers$1.generateCallbacks && Layers$1.generateCallbacks.forEach(callback => callback());
    generateLayers();
  };

  /**
   * Onready
   */
  function onReady () {
    if (globalThis.setup) {
      const _setup = globalThis.setup;
      globalThis.setup = function () {
        _setup();
        onSetup();
      };
    } else {
      globalThis.setup = onSetup;
    }

    /**
     * Run boilerplate code
     */
    globalThis.generateLayers = function (refresh) {
      if (refresh) {
        Layers$1.dispose();
        reseed();
      } else {
        randomSeed(globalThis._seed);
        noiseSeed(globalThis._seed);
      }
    
      // Remove all layers and apply some basic setup
      Layers$1.setup = function (canvas) {
        let minSize = min(this.width, this.height);
        let strokeKilos = max(2, minSize * .01);
        canvas.stroke(0);
        canvas.strokeWeight(strokeKilos);
      };
    };

    /**
     * Reseeds seeds
     * @params {Int} seed (optional) Defaults to fxrand()
     */
    globalThis.reseed = function (s) {
      if (typeof fxrand === 'function') {
        globalThis._seed = s || globalThis.params.seed || floor(fxrand() * 9999999);
      } else {
        globalThis._seed = s || globalThis.params.seed || floor(random(9999999));
      }
      randomSeed(globalThis._seed);
      noiseSeed(globalThis._seed);
    };

    /**
     * Recenter
     */
    globalThis.recenter = function () {
      _renderer.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2, 'fixed');
    };
  }

  if (globalThis.p5) {
    globalThis.p5.disableFriendlyErrors = true;
    if (globalThis.get) {
      _get = globalThis.get;
      delete globalThis.get;
    }
    if (globalThis.set) {
      _set = globalThis.set;
      delete globalThis.set;
    }
  }

  if (typeof document !== 'undefined') {
    if (/complete|interactive|loaded/.test(document.readyState)) {
      onReady();
    } else {
      document.addEventListener('DOMContentLoaded', onReady);
    }
  }

}));
