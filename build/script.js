(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var baseIndexOf = require('../internal/baseIndexOf'),
    getLength = require('../internal/getLength'),
    isArray = require('../lang/isArray'),
    isIterateeCall = require('../internal/isIterateeCall'),
    isLength = require('../internal/isLength'),
    isString = require('../lang/isString'),
    values = require('../object/values');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Checks if `value` is in `collection` using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it is used as the offset
 * from the end of `collection`.
 *
 * @static
 * @memberOf _
 * @alias contains, include
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {*} target The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
 * @returns {boolean} Returns `true` if a matching element is found, else `false`.
 * @example
 *
 * _.includes([1, 2, 3], 1);
 * // => true
 *
 * _.includes([1, 2, 3], 1, 2);
 * // => false
 *
 * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
 * // => true
 *
 * _.includes('pebbles', 'eb');
 * // => true
 */
function includes(collection, target, fromIndex, guard) {
  var length = collection ? getLength(collection) : 0;
  if (!isLength(length)) {
    collection = values(collection);
    length = collection.length;
  }
  if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
    fromIndex = 0;
  } else {
    fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
  }
  return (typeof collection == 'string' || !isArray(collection) && isString(collection))
    ? (fromIndex <= length && collection.indexOf(target, fromIndex) > -1)
    : (!!length && baseIndexOf(collection, target, fromIndex) > -1);
}

module.exports = includes;

},{"../internal/baseIndexOf":2,"../internal/getLength":5,"../internal/isIterateeCall":10,"../internal/isLength":11,"../lang/isArray":15,"../lang/isString":19,"../object/values":22}],2:[function(require,module,exports){
var indexOfNaN = require('./indexOfNaN');

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./indexOfNaN":7}],3:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],4:[function(require,module,exports){
/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  var index = -1,
      length = props.length,
      result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
}

module.exports = baseValues;

},{}],5:[function(require,module,exports){
var baseProperty = require('./baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./baseProperty":3}],6:[function(require,module,exports){
var isNative = require('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":17}],7:[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],8:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./getLength":5,"./isLength":11}],9:[function(require,module,exports){
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],10:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isIndex = require('./isIndex'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":18,"./isArrayLike":8,"./isIndex":9}],11:[function(require,module,exports){
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],12:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],13:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":14,"../lang/isArray":15,"../object/keysIn":21,"./isIndex":9,"./isLength":11}],14:[function(require,module,exports){
var isArrayLike = require('../internal/isArrayLike'),
    isObjectLike = require('../internal/isObjectLike');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{"../internal/isArrayLike":8,"../internal/isObjectLike":12}],15:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":6,"../internal/isLength":11,"../internal/isObjectLike":12}],16:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

module.exports = isFunction;

},{"./isObject":18}],17:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObjectLike = require('../internal/isObjectLike');

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isNative;

},{"../internal/isObjectLike":12,"./isFunction":16}],18:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
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
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],19:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
}

module.exports = isString;

},{"../internal/isObjectLike":12}],20:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isArrayLike = require('../internal/isArrayLike'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
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
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/getNative":6,"../internal/isArrayLike":8,"../internal/shimKeys":13,"../lang/isObject":18}],21:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
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
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":9,"../internal/isLength":11,"../lang/isArguments":14,"../lang/isArray":15,"../lang/isObject":18}],22:[function(require,module,exports){
var baseValues = require('../internal/baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return baseValues(object, keys(object));
}

module.exports = values;

},{"../internal/baseValues":4,"./keys":20}],23:[function(require,module,exports){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

module.exports = React.createClass({
  displayName: "exports",

  handleChange: function handleChange(e) {
    this.props.change(e);
  },
  render: function render() {
    var _props = this.props;
    var change = _props.change;
    var children = _props.children;

    var others = _objectWithoutProperties(_props, ["change", "children"]);

    return React.createElement(
      "label",
      null,
      React.createElement("input", _extends({}, others, { onChange: this.handleChange })),
      React.createElement(
        "span",
        null,
        React.createElement("i", { className: "fa fa-check" }),
        this.props.children
      )
    );
  }
});

},{}],24:[function(require,module,exports){
'use strict';

var _ = {
  includes: require('lodash/collection/includes')
  // escape: require('lodash/string/escape')
};

var FormCheckRadio = require('./FormCheckRadio');

// form: setting conditions
module.exports = React.createClass({
  displayName: 'exports',

  // get all checked checkboxes
  _checkboxFilter: function _checkboxFilter(cond) {
    var _chbx = React.findDOMNode(this).querySelectorAll('[name="' + cond + '"]');
    var _arr = [];
    for (var i = 0; i < _chbx.length; i++) {
      if (_chbx[i].checked) {
        _arr.push(_chbx[i].value);
      }
    }
    return _arr;
  },
  getInitialState: function getInitialState() {
    return {
      "activeField": "status"
    };
  },
  // set status type
  setStatusType: function setStatusType(e) {
    this.props.onStatusTypeChange(e.target.value);
  },
  // set checked type filter
  setTypeFilter: function setTypeFilter(e) {
    var _type = this._checkboxFilter('type');
    this.props.onConditionChange({ "type": _type });
  },
  // set checked family filter
  setFamilyFilter: function setFamilyFilter(e) {
    var _family = this._checkboxFilter('family');
    this.props.onConditionChange({ "family": _family });
  },
  // set checked family filter
  setRareFilter: function setRareFilter(e) {
    var _rare = this._checkboxFilter('rare');
    _rare = _rare.map(function (n) {
      return parseInt(n);
    });
    this.props.onConditionChange({ "rare": _rare });
  },
  // set inputted names filter
  setNamesFilter: function setNamesFilter(e) {
    // var _input = _.escape(React.findDOMNode(this.refs.names).value);
    var _input = React.findDOMNode(this.refs.names).value;
    var _names = [];
    if (_input.length > 0) {
      _names = _input.split(',');
    } else {
      _names = [];
    }
    this.props.onConditionChange({ "names": _names });
  },
  // select all items
  selectAll: function selectAll(e) {
    e.preventDefault();
    var _tmp = {};
    _tmp[e.target.value] = this.props.config.labels[e.target.value];
    this.props.onConditionChange(_tmp);
  },
  // deselect
  selectNone: function selectNone(e) {
    e.preventDefault();
    var _tmp = {};
    _tmp[e.target.value] = [];
    this.props.onConditionChange(_tmp);
  },
  // active input field
  changeField: function changeField(e) {
    var _field = e.currentTarget.getAttribute("data-field");
    if (_field == this.state.activeField) {
      this.setState({ "activeField": null });
    } else {
      this.setState({ "activeField": _field });
    }
  },
  render: function render() {
    var _statusTypeInput = Object.keys(this.props.config.labels.statusType).map((function (item) {
      return React.createElement(
        FormCheckRadio,
        { key: item, type: "radio", name: "statusType", value: item, checked: this.props.condition.statusType == item, change: this.setStatusType },
        this.props.config.labels.statusType[item]
      );
    }).bind(this));

    var _typeInput = this.props.config.labels.type.map((function (item) {
      return React.createElement(
        FormCheckRadio,
        { key: item, type: "checkbox", name: "type", value: item, checked: _.includes(this.props.condition.type, item), change: this.setTypeFilter },
        item
      );
    }).bind(this));

    var _familyInput = this.props.config.labels.family.map((function (item) {
      return React.createElement(
        FormCheckRadio,
        { key: item, type: "checkbox", name: "family", value: item, checked: _.includes(this.props.condition.family, item), change: this.setFamilyFilter },
        item
      );
    }).bind(this));

    var _rareInput = this.props.config.labels.rare.map((function (item) {
      return React.createElement(
        FormCheckRadio,
        { key: item, type: "checkbox", name: "rare", value: item, checked: _.includes(this.props.condition.rare, item), change: this.setRareFilter },
        'レア',
        item
      );
    }).bind(this));

    return React.createElement(
      'form',
      { id: "status-form", className: "active-" + this.state.activeField },
      React.createElement(
        'h2',
        null,
        '表示条件を変更'
      ),
      React.createElement(
        'fieldset',
        null,
        React.createElement(
          'legend',
          { onClick: this.changeField, 'data-field': "status" },
          '表示ステータス',
          React.createElement('i', { className: "fa fa-caret-down" })
        ),
        React.createElement(
          'div',
          { className: "fieldset-item" },
          _statusTypeInput
        )
      ),
      React.createElement(
        'fieldset',
        null,
        React.createElement(
          'legend',
          { onClick: this.changeField, 'data-field': "narrowing" },
          '絞り込み',
          React.createElement('i', { className: "fa fa-caret-down" })
        ),
        React.createElement(
          'div',
          { className: "fieldset-item" },
          React.createElement(
            'div',
            { className: "input-group" },
            React.createElement(
              'h3',
              null,
              '刀種'
            ),
            _typeInput,
            React.createElement(
              'button',
              { value: "type", className: "btn-all", onClick: this.selectAll },
              '全選択'
            ),
            React.createElement(
              'button',
              { value: "type", className: "btn-none", onClick: this.selectNone },
              '全解除'
            )
          ),
          React.createElement(
            'div',
            { className: "input-group" },
            React.createElement(
              'h3',
              null,
              '刀派'
            ),
            _familyInput,
            React.createElement(
              'button',
              { value: "family", className: "btn-all", onClick: this.selectAll },
              '全選択'
            ),
            React.createElement(
              'button',
              { value: "family", className: "btn-none", onClick: this.selectNone },
              '全解除'
            )
          ),
          React.createElement(
            'div',
            { className: "input-group" },
            React.createElement(
              'h3',
              null,
              'レアリティ'
            ),
            _rareInput,
            React.createElement(
              'button',
              { value: "rare", className: "btn-all", onClick: this.selectAll },
              '全選択'
            ),
            React.createElement(
              'button',
              { value: "rare", className: "btn-none", onClick: this.selectNone },
              '全解除'
            )
          )
        )
      ),
      React.createElement(
        'fieldset',
        null,
        React.createElement(
          'legend',
          { onClick: this.changeField, 'data-field': "names" },
          '刀剣名指定',
          React.createElement('i', { className: "fa fa-caret-down" })
        ),
        React.createElement(
          'div',
          { className: "fieldset-item" },
          React.createElement('input', { type: "text", ref: "names", value: this.props.condition.names.join(','), placeholder: "半角カンマ区切り（空白なし）", onChange: this.setNamesFilter }),
          React.createElement(
            'button',
            { value: "names", className: "btn-none", onClick: this.selectNone },
            '解除'
          )
        )
      )
    );
  }
});

},{"./FormCheckRadio":23,"lodash/collection/includes":1}],25:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",

  render: function render() {
    // create background lines
    var lines = [];

    for (var i = 100; i > 0; i -= 5) {
      lines.push(React.createElement("div", { className: "graph-back", key: i, "data-line": i }));
    }

    return React.createElement(
      "div",
      { id: "status-graph-back" },
      lines
    );
  }
});

},{}],26:[function(require,module,exports){
"use strict";

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var helpMd = require('../data/help');

module.exports = React.createClass({
  displayName: "exports",

  closeHelp: function closeHelp(e) {
    e.preventDefault();
    this.props.onCloseClick();
  },
  render: function render() {
    var _help = null;

    if (this.props.show) {
      _help = React.createElement(
        "div",
        { id: "status-help" },
        React.createElement("div", { className: "help-body", dangerouslySetInnerHTML: { __html: helpMd } }),
        React.createElement(
          "div",
          { className: "help-close" },
          React.createElement(
            "a",
            { onClick: this.closeHelp },
            "ヘルプをとじる"
          )
        )
      );
    }

    return React.createElement(
      ReactCSSTransitionGroup,
      { transitionName: "status-help" },
      _help
    );
  }
});

},{"../data/help":33}],27:[function(require,module,exports){
'use strict';

var data = require('../data/status');
var config = require('../config');
var TkrbStatus = require('./tkrbStatus');

React.render(React.createElement(TkrbStatus, { data: data, config: config }), document.getElementById('tkrb-status'));

},{"../config":32,"../data/status":34,"./tkrbStatus":31}],28:[function(require,module,exports){
"use strict";

var _ = {
  includes: require('lodash/collection/includes')
};

module.exports = {
  FiltersMixin: {
    _typeFilter: function _typeFilter(item) {
      if (!_.includes(this.props.condition.type, item.type)) {
        return false;
      }
      return true;
    },
    _familyFilter: function _familyFilter(item) {
      if (item.family.indexOf("虎徹") > -1) {
        item.family = "虎徹";
      }
      if (item.family == "-") {
        item.family = "その他";
      }
      if (!_.includes(this.props.condition.family, item.family)) {
        return false;
      }
      return true;
    },
    _rareFilter: function _rareFilter(item) {
      if (!_.includes(this.props.condition.rare, item.rare)) {
        return false;
      }
      return true;
    },
    _namesFilter: function _namesFilter(item) {
      if (!_.includes(this.props.condition.names, item.name)) {
        return false;
      }
      return true;
    }
  }
};

},{"lodash/collection/includes":1}],29:[function(require,module,exports){
"use strict";

module.exports = React.createClass({
  displayName: "exports",

  render: function render() {
    // create graph bars
    var val = this.props.item[this.props.statusType][this.props.name];
    var _height = "";

    if (val) {
      _height = val / this.props.maxStatus * 100 + "%";
    } else {
      _height = this.props.item.initial[this.props.name] / this.props.maxStatus * 100 + "%";
    }

    return React.createElement("div", { className: "status-bar " + this.props.name, style: { height: _height }, "data-status": val });
  }
});

},{}],30:[function(require,module,exports){
'use strict';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var _ = {
  includes: require('lodash/collection/includes')
};
var StatusBar = require('./statusBar');
var GraphBack = require('./graphBack');
var FiltersMixin = require('./mixins').FiltersMixin;

// filter data and create graph
module.exports = React.createClass({
  displayName: 'exports',

  mixins: [FiltersMixin],
  render: function render() {
    var status = this.props.data.map((function (item) {
      if (this.props.condition.names.length > 0) {
        if (!this._namesFilter(item)) {
          return false;
        }
      } else {
        if (!this._typeFilter(item) || !this._familyFilter(item) || !this._rareFilter(item)) {
          return false;
        }
      }

      var n = 0;
      var bars = Object.keys(item[this.props.condition.statusType]).map((function (key) {
        // filter by status
        if (!_.includes(this.props.condition.status, key)) {
          return false;
        }

        n += item[this.props.condition.statusType][key];

        return React.createElement(StatusBar, { maxStatus: this.props.config.maxStatus, statusType: this.props.condition.statusType, item: item, name: key, key: key });
      }).bind(this));

      // create graphs for each character
      return React.createElement(
        'div',
        { className: "status-graph-item bars-" + bars.length, key: item.id },
        React.createElement(
          'div',
          { className: "status-bar-box" },
          React.createElement(
            ReactCSSTransitionGroup,
            { transitionName: "status-bar", transitionAppear: true },
            bars
          )
        ),
        React.createElement(
          'div',
          { className: "status-info-box" },
          React.createElement(
            'p',
            { className: "info-name" },
            React.createElement(
              'a',
              { href: item.url1, target: "_new" },
              item.name
            )
          ),
          React.createElement(
            'p',
            { className: "info-id" },
            'No. ',
            item.id
          ),
          React.createElement(
            'p',
            { className: "info-total" },
            '合計：',
            n
          )
        )
      );
    }).bind(this));

    return React.createElement(
      'div',
      { id: "status-graph" },
      React.createElement(
        'div',
        { id: "status-graph-box" },
        React.createElement(
          ReactCSSTransitionGroup,
          { transitionName: "status-graph", transitionAppear: true },
          status
        )
      ),
      React.createElement(GraphBack, null)
    );
  }
});

},{"./graphBack":25,"./mixins":28,"./statusBar":29,"lodash/collection/includes":1}],31:[function(require,module,exports){
'use strict';

var ConditionalForm = require('./conditionalForm');
var StatusGraph = require('./statusGraph');
var HelpModal = require('./helpModal');

// wrapper component
module.exports = React.createClass({
  displayName: 'exports',

  getInitialState: function getInitialState() {
    return {
      "showHelp": false,
      "statusType": "initial",
      "type": this.props.config.labels.type,
      "family": this.props.config.labels.family,
      "rare": this.props.config.labels.rare,
      "names": this.props.config.labels.names,
      "status": Object.keys(this.props.config.labels.status)
    };
  },
  handleStatusType: function handleStatusType(type) {
    this.setState({ "statusType": type });
  },
  handleCondition: function handleCondition(condition) {
    this.setState(condition);
    // this.setState(_.assign({}, {
    //   "type": this.props.config.labels.type,
    //   "family": this.props.config.labels.family,
    //   "rare": this.props.config.labels.rare,
    //   "names": this.props.config.labels.names
    // }, condition));
  },
  toggleHelp: function toggleHelp(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({ "showHelp": !this.state.showHelp });
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'header',
        null,
        React.createElement(
          'h1',
          null,
          '刀剣乱舞ぬるぬる動くステータス'
        ),
        React.createElement(
          'nav',
          null,
          React.createElement(
            'ul',
            null,
            React.createElement(
              'li',
              null,
              React.createElement(
                'a',
                { onClick: this.toggleHelp },
                React.createElement('i', { className: "fa fa-question" }),
                'ヘルプ'
              )
            ),
            React.createElement(
              'li',
              null,
              React.createElement(
                's',
                null,
                React.createElement('i', { className: "fa fa-github" }),
                'GitHub'
              )
            )
          )
        )
      ),
      React.createElement(ConditionalForm, { onStatusTypeChange: this.handleStatusType, onConditionChange: this.handleCondition, onActiveFieldChange: this.handleActiveField, condition: this.state, data: this.props.data, config: this.props.config }),
      React.createElement(StatusGraph, { condition: this.state, data: this.props.data, config: this.props.config }),
      React.createElement(HelpModal, { show: this.state.showHelp, onCloseClick: this.toggleHelp })
    );
  }
});

},{"./conditionalForm":24,"./helpModal":26,"./statusGraph":30}],32:[function(require,module,exports){
module.exports={
  "maxStatus": 100,
  "labels": {
    "statusType": {
      "initial": "初期値",
      "rankupMax": "特MAX"
    },
    "type": ["短刀", "脇差", "打刀", "太刀", "大太刀", "槍", "薙刀"],
    "family": ["三条", "青江", "粟田口", "古備前", "来", "長船", "左文字", "兼定", "堀川", "虎徹", "村正", "その他"],
    "status": {
      "life": "生存",
      "attack": "打撃",
      "defence": "統率",
      "speed": "機動",
      "push": "衝力",
      "critical": "必殺",
      "search": "偵察",
      "hide": "隠蔽"
    },
    "rare": [1, 2, 3, 4, 5],
    "names": []
  }
}

},{}],33:[function(require,module,exports){
module.exports = '<h2>【刀剣乱舞ぬるぬる動くステータス】の使い方</h2>\n<h3>注意！</h3>\n<ul>\n<li>各刀剣のステータス差をグラフにしてにらにら眺めようという邪な動機の元、作成しております。</li>\n<li>したがって攻略用には向きません。</li>\n<li>データは<a href="http://wikiwiki.jp/toulove/">刀剣乱舞攻略Wiki</a>様を参照いたしております。</li>\n<li>言うほどぬるぬるしてませんすみません…</li>\n<li>なにかございましたら、Twitterにて@kotorieclairまでリプお願いします。</li>\n<li><strong>7/22メンテによる刀種変更未対応</strong></li>\n</ul>\n<h3>グラフ</h3>\n<p>それぞれのバーにオンマウスすると、ステータス名と数値が表示されます。<br>\n左から 生存、打撃、統率、機動、衝力、必殺、偵察、隠蔽 です。<br>\n判明していないステータスに関しては、バーが半透明になります（2015年7月現在、博多藤四郎の偵察のみ）<br>\n刀剣名は<a href="http://wikiwiki.jp/toulove/">刀剣乱舞攻略Wiki</a>様の各刀剣個別ページにリンクされております。</p>\n<h3>表示ステータス</h3>\n<p>表示するステータスがどの時点のものかを選択できます。デフォルトでは初期値を表示。</p>\n<ul>\n<li>初期値…ドロップないしは鍛刀したばかりの初々しい頃のステータス</li>\n<li>特MAX…限界までバッキバキに上がった頼もしいステータス</li>\n</ul>\n<h3>絞り込み</h3>\n<p>刀剣男士を各種条件で絞り込み表示します。</p>\n<h4>刀種</h4>\n<p>刀剣男士を刀種で絞り込みます。デフォルトでは全刀種を表示。<br>\n選択可能な刀種…短刀、脇差、打刀、太刀、大太刀、槍、薙刀</p>\n<h4>刀派</h4>\n<p>刀剣男士を刀派で絞り込みます。デフォルトでは全刀派を表示。<br>\n選択可能な刀派…三条、青江、粟田口、古備前、来、長船、左文字、兼定、堀川、虎徹、村正、その他（＝刀派なし）</p>\n<h4>レアリティ</h4>\n<p>刀剣男士をレアリティで絞り込みます。デフォルトでは全レアリティを表示。<br>\n選択可能なレアリティ…レア1、レア2、レア3、レア4、レア5</p>\n<h3>刀剣名</h3>\n<p>刀剣男士を刀剣名で絞り込みます。絞り込みとの併用は不可。刀剣名への入力が優先されます。<br>\n刀剣名はフルネームで入力してください。一部ヒットはいたしません。<br>\n複数の刀剣名を入力する際には、刀剣名を半角カンマ(,)で区切ってください。例）三日月宗近,御手杵,へし切長谷部</p>\n<h3>予定している追加機能</h3>\n<ul>\n<li>刀剣名入力サジェスト</li>\n<li>現在の表示状態を刀剣名欄に反映するボタン</li>\n<li>ステータス値選択</li>\n<li>刀帳No.でソート</li>\n<li>ステータス値でソート</li>\n<li>特初期値モード</li>\n</ul>\n';
},{}],34:[function(require,module,exports){
module.exports=[
  {
    "id": 3,
    "name": "三日月宗近",
    "url1": "http://wikiwiki.jp/toulove/?%BB%B0%C6%FC%B7%EE%BD%A1%B6%E1",
    "url2": "http://wikiwiki.jp/toulove/?%BB%B0%C6%FC%B7%EE%BD%A1%B6%E1%20%C6%C3",
    "rare": 5,
    "type": "太刀",
    "family": "三条",
    "slot": 3,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 50,
      "attack": 50,
      "defence": 52,
      "speed": 31,
      "push": 40,
      "critical": 30,
      "search": 29,
      "hide": 29
    },
    "rankupMax": {
      "life": 63,
      "attack": 72,
      "defence": 72,
      "speed": 37,
      "push": 55,
      "critical": 30,
      "search": 38,
      "hide": 35
    }
  },
  {
    "id": 5,
    "name": "小狐丸",
    "url1": "http://wikiwiki.jp/toulove/?%BE%AE%B8%D1%B4%DD",
    "url2": "http://wikiwiki.jp/toulove/?%BE%AE%B8%D1%B4%DD%20%C6%C3",
    "rare": 3,
    "type": "太刀",
    "family": "三条",
    "slot": 2,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 44,
      "attack": 47,
      "defence": 48,
      "speed": 35,
      "push": 37,
      "critical": 28,
      "search": 30,
      "hide": 24
    },
    "rankupMax": {
      "life": 58,
      "attack": 68,
      "defence": 69,
      "speed": 41,
      "push": 53,
      "critical": 28,
      "search": 38,
      "hide": 30
    }
  },
  {
    "id": 7,
    "name": "石切丸",
    "url1": "http://wikiwiki.jp/toulove/?%C0%D0%C0%DA%B4%DD",
    "url2": "http://wikiwiki.jp/toulove/?%C0%D0%C0%DA%B4%DD%20%C6%C3",
    "rare": 3,
    "type": "大太刀",
    "family": "三条",
    "slot": 2,
    "rankup": 25,
    "wideness": "広",
    "initial": {
      "life": 60,
      "attack": 60,
      "defence": 52,
      "speed": 10,
      "push": 48,
      "critical": 32,
      "search": 10,
      "hide": 20
    },
    "rankupMax": {
      "life": 72,
      "attack": 85,
      "defence": 68,
      "speed": 13,
      "push": 61,
      "critical": 32,
      "search": 15,
      "hide": 23
    }
  },
  {
    "id": 9,
    "name": "岩融",
    "url1": "http://wikiwiki.jp/toulove/?%B4%E4%CD%BB",
    "url2": "http://wikiwiki.jp/toulove/?%B4%E4%CD%BB%20%C6%C3",
    "rare": 3,
    "type": "薙刀",
    "family": "三条",
    "slot": 2,
    "rankup": 25,
    "wideness": "横",
    "initial": {
      "life": 49,
      "attack": 48,
      "defence": 40,
      "speed": 29,
      "push": 45,
      "critical": 29,
      "search": 30,
      "hide": 30
    },
    "rankupMax": {
      "life": 60,
      "attack": 68,
      "defence": 51,
      "speed": 42,
      "push": 61,
      "critical": 29,
      "search": 41,
      "hide": 35
    }
  },
  {
    "id": 11,
    "name": "今剣",
    "url1": "http://wikiwiki.jp/toulove/?%BA%A3%B7%F5",
    "url2": "http://wikiwiki.jp/toulove/?%BA%A3%B7%F5%20%C6%C3",
    "rare": 1,
    "type": "短刀",
    "family": "三条",
    "slot": 1,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 26,
      "attack": 13,
      "defence": 26,
      "speed": 27,
      "push": 17,
      "critical": 45,
      "search": 35,
      "hide": 36
    },
    "rankupMax": {
      "life": 33,
      "attack": 26,
      "defence": 38,
      "speed": 58,
      "push": 31,
      "critical": 45,
      "search": 49,
      "hide": 40
    }
  },
  {
    "id": 19,
    "name": "にっかり青江",
    "url1": "http://wikiwiki.jp/toulove/?%A4%CB%A4%C3%A4%AB%A4%EA%C0%C4%B9%BE",
    "url2": "http://wikiwiki.jp/toulove/?%A4%CB%A4%C3%A4%AB%A4%EA%C0%C4%B9%BE%20%C6%C3",
    "rare": 2,
    "type": "脇差",
    "family": "青江",
    "slot": 2,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 30,
      "attack": 26,
      "defence": 28,
      "speed": 37,
      "push": 25,
      "critical": 40,
      "search": 41,
      "hide": 39
    },
    "rankupMax": {
      "life": 39,
      "attack": 44,
      "defence": 46,
      "speed": 52,
      "push": 41,
      "critical": 40,
      "search": 55,
      "hide": 45
    }
  },
  {
    "id": 23,
    "name": "鳴狐",
    "url1": "http://wikiwiki.jp/toulove/?%CC%C4%B8%D1",
    "url2": "http://wikiwiki.jp/toulove/?%CC%C4%B8%D1%20%C6%C3",
    "rare": 2,
    "type": "打刀",
    "family": "粟田口",
    "slot": 2,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 38,
      "attack": 38,
      "defence": 37,
      "speed": 38,
      "push": 29,
      "critical": 35,
      "search": 36,
      "hide": 36
    },
    "rankupMax": {
      "life": 48,
      "attack": 58,
      "defence": 50,
      "speed": 51,
      "push": 53,
      "critical": 35,
      "search": 46,
      "hide": 41
    }
  },
  {
    "id": 25,
    "name": "一期一振",
    "url1": "http://wikiwiki.jp/toulove/?%B0%EC%B4%FC%B0%EC%BF%B6",
    "url2": "http://wikiwiki.jp/toulove/?%B0%EC%B4%FC%B0%EC%BF%B6%20%C6%C3",
    "rare": 4,
    "type": "太刀",
    "family": "粟田口",
    "slot": 3,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 48,
      "attack": 49,
      "defence": 52,
      "speed": 30,
      "push": 42,
      "critical": 30,
      "search": 30,
      "hide": 25
    },
    "rankupMax": {
      "life": 61,
      "attack": 70,
      "defence": 72,
      "speed": 36,
      "push": 57,
      "critical": 30,
      "search": 39,
      "hide": 31
    }
  },
  {
    "id": 27,
    "name": "鯰尾藤四郎",
    "url1": "http://wikiwiki.jp/toulove/?%F2%D0%C8%F8%C6%A3%BB%CD%CF%BA",
    "url2": "http://wikiwiki.jp/toulove/?%F2%D0%C8%F8%C6%A3%BB%CD%CF%BA%20%C6%C3",
    "rare": 2,
    "type": "脇差",
    "family": "粟田口",
    "slot": 2,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 27,
      "attack": 27,
      "defence": 27,
      "speed": 33,
      "push": 25,
      "critical": 47,
      "search": 40,
      "hide": 41
    },
    "rankupMax": {
      "life": 35,
      "attack": 45,
      "defence": 45,
      "speed": 48,
      "push": 40,
      "critical": 47,
      "search": 52,
      "hide": 46
    }
  },
  {
    "id": 29,
    "name": "骨喰藤四郎",
    "url1": "http://wikiwiki.jp/toulove/?%B9%FC%B6%F4%C6%A3%BB%CD%CF%BA",
    "url2": "http://wikiwiki.jp/toulove/?%B9%FC%B6%F4%C6%A3%BB%CD%CF%BA%20%C6%C3",
    "rare": 2,
    "type": "脇差",
    "family": "粟田口",
    "slot": 2,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 32,
      "attack": 28,
      "defence": 29,
      "speed": 40,
      "push": 22,
      "critical": 49,
      "search": 38,
      "hide": 38
    },
    "rankupMax": {
      "life": 41,
      "attack": 47,
      "defence": 48,
      "speed": 54,
      "push": 36,
      "critical": 49,
      "search": 49,
      "hide": 43
    }
  },
  {
    "id": 31,
    "name": "平野藤四郎",
    "url1": "http://wikiwiki.jp/toulove/?%CA%BF%CC%EE%C6%A3%BB%CD%CF%BA",
    "url2": "http://wikiwiki.jp/toulove/?%CA%BF%CC%EE%C6%A3%BB%CD%CF%BA%20%C6%C3",
    "rare": 1,
    "type": "短刀",
    "family": "粟田口",
    "slot": 1,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 28,
      "attack": 17,
      "defence": 29,
      "speed": 28,
      "push": 18,
      "critical": 37,
      "search": 34,
      "hide": 34
    },
    "rankupMax": {
      "life": 34,
      "attack": 32,
      "defence": 45,
      "speed": 56,
      "push": 30,
      "critical": 37,
      "search": 48,
      "hide": 38
    }
  },
  {
    "id": 33,
    "name": "厚藤四郎",
    "url1": "http://wikiwiki.jp/toulove/?%B8%FC%C6%A3%BB%CD%CF%BA",
    "url2": "http://wikiwiki.jp/toulove/?%B8%FC%C6%A3%BB%CD%CF%BA%20%C6%C3",
    "rare": 1,
    "type": "短刀",
    "family": "粟田口",
    "slot": 1,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 29,
      "attack": 18,
      "defence": 28,
      "speed": 29,
      "push": 16,
      "critical": 35,
      "search": 34,
      "hide": 34
    },
    "rankupMax": {
      "life": 36,
      "attack": 32,
      "defence": 42,
      "speed": 58,
      "push": 30,
      "critical": 35,
      "search": 47,
      "hide": 38
    }
  },
  {
    "id": 39,
    "name": "前田藤四郎",
    "url1": "http://wikiwiki.jp/toulove/?%C1%B0%C5%C4%C6%A3%BB%CD%CF%BA",
    "url2": "http://wikiwiki.jp/toulove/?%C1%B0%C5%C4%C6%A3%BB%CD%CF%BA%20%C6%C3",
    "rare": 1,
    "type": "短刀",
    "family": "粟田口",
    "slot": 1,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 29,
      "attack": 18,
      "defence": 28,
      "speed": 23,
      "push": 14,
      "critical": 37,
      "search": 34,
      "hide": 34
    },
    "rankupMax": {
      "life": 36,
      "attack": 31,
      "defence": 41,
      "speed": 52,
      "push": 30,
      "critical": 37,
      "search": 48,
      "hide": 38
    }
  },
  {
    "id": 41,
    "name": "秋田藤四郎",
    "url1": "http://wikiwiki.jp/toulove/?%BD%A9%C5%C4%C6%A3%BB%CD%CF%BA",
    "url2": "http://wikiwiki.jp/toulove/?%BD%A9%C5%C4%C6%A3%BB%CD%CF%BA%20%C6%C3",
    "rare": 1,
    "type": "短刀",
    "family": "粟田口",
    "slot": 1,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 27,
      "attack": 15,
      "defence": 29,
      "speed": 24,
      "push": 18,
      "critical": 38,
      "search": 34,
      "hide": 34
    },
    "rankupMax": {
      "life": 33,
      "attack": 30,
      "defence": 42,
      "speed": 52,
      "push": 33,
      "critical": 38,
      "search": 46,
      "hide": 38
    }
  },
  {
    "id": 43,
    "name": "博多藤四郎",
    "url1": "http://wikiwiki.jp/toulove/?%C7%EE%C2%BF%C6%A3%BB%CD%CF%BA",
    "url2": "http://wikiwiki.jp/toulove/?%C7%EE%C2%BF%C6%A3%BB%CD%CF%BA%20%C6%C3",
    "rare": 1,
    "type": "短刀",
    "family": "粟田口",
    "slot": 1,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 29,
      "attack": 15,
      "defence": 23,
      "speed": 22,
      "push": 16,
      "critical": 33,
      "search": 33,
      "hide": 34
    },
    "rankupMax": {
      "life": 35,
      "attack": 30,
      "defence": 38,
      "speed": 64,
      "push": 31,
      "critical": 33,
      "search": null,
      "hide": 38
    }
  },
  {
    "id": 45,
    "name": "乱藤四郎",
    "url1": "http://wikiwiki.jp/toulove/?%CD%F0%C6%A3%BB%CD%CF%BA",
    "url2": "http://wikiwiki.jp/toulove/?%CD%F0%C6%A3%BB%CD%CF%BA%20%C6%C3",
    "rare": 1,
    "type": "短刀",
    "family": "粟田口",
    "slot": 1,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 28,
      "attack": 18,
      "defence": 25,
      "speed": 25,
      "push": 17,
      "critical": 35,
      "search": 35,
      "hide": 35
    },
    "rankupMax": {
      "life": 35,
      "attack": 31,
      "defence": 40,
      "speed": 55,
      "push": 30,
      "critical": 35,
      "search": 49,
      "hide": 39
    }
  },
  {
    "id": 47,
    "name": "五虎退",
    "url1": "http://wikiwiki.jp/toulove/?%B8%DE%B8%D7%C2%E0",
    "url2": "http://wikiwiki.jp/toulove/?%B8%DE%B8%D7%C2%E0%20%C6%C3",
    "rare": 1,
    "type": "短刀",
    "family": "粟田口",
    "slot": 1,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 27,
      "attack": 15,
      "defence": 27,
      "speed": 25,
      "push": 16,
      "critical": 40,
      "search": 35,
      "hide": 35
    },
    "rankupMax": {
      "life": 33,
      "attack": 27,
      "defence": 39,
      "speed": 58,
      "push": 29,
      "critical": 40,
      "search": 48,
      "hide": 39
    }
  },
  {
    "id": 49,
    "name": "薬研藤四郎",
    "url1": "http://wikiwiki.jp/toulove/?%CC%F4%B8%A6%C6%A3%BB%CD%CF%BA",
    "url2": "http://wikiwiki.jp/toulove/?%CC%F4%B8%A6%C6%A3%BB%CD%CF%BA%20%C6%C3",
    "rare": 1,
    "type": "短刀",
    "family": "粟田口",
    "slot": 1,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 27,
      "attack": 14,
      "defence": 29,
      "speed": 23,
      "push": 17,
      "critical": 40,
      "search": 35,
      "hide": 35
    },
    "rankupMax": {
      "life": 34,
      "attack": 28,
      "defence": 42,
      "speed": 53,
      "push": 31,
      "critical": 40,
      "search": 47,
      "hide": 39
    }
  },
  {
    "id": 55,
    "name": "鶯丸",
    "url1": "http://wikiwiki.jp/toulove/?%F2%F4%B4%DD",
    "url2": "http://wikiwiki.jp/toulove/?%F2%F4%B4%DD%20%C6%C3",
    "rare": 4,
    "type": "太刀",
    "family": "古備前",
    "slot": 3,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 50,
      "attack": 51,
      "defence": 48,
      "speed": 31,
      "push": 39,
      "critical": 28,
      "search": 30,
      "hide": 27
    },
    "rankupMax": {
      "life": 64,
      "attack": 71,
      "defence": 69,
      "speed": 37,
      "push": 55,
      "critical": 28,
      "search": 38,
      "hide": 33
    }
  },
  {
    "id": 57,
    "name": "明石国行",
    "url1": "http://wikiwiki.jp/toulove/?%CC%C0%C0%D0%B9%F1%B9%D4",
    "url2": "http://wikiwiki.jp/toulove/?%CC%C0%C0%D0%B9%F1%B9%D4%20%C6%C3",
    "rare": 3,
    "type": "太刀",
    "family": "来",
    "slot": 2,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 42,
      "attack": 43,
      "defence": 47,
      "speed": 43,
      "push": 32,
      "critical": 26,
      "search": 30,
      "hide": 30
    },
    "rankupMax": {
      "life": 56,
      "attack": 63,
      "defence": 67,
      "speed": 49,
      "push": 47,
      "critical": 26,
      "search": 41,
      "hide": 36
    }
  },
  {
    "id": 59,
    "name": "蛍丸",
    "url1": "http://wikiwiki.jp/toulove/?%B7%D6%B4%DD",
    "url2": "http://wikiwiki.jp/toulove/?%B7%D6%B4%DD%20%C6%C3",
    "rare": 4,
    "type": "大太刀",
    "family": "来",
    "slot": 3,
    "rankup": 25,
    "wideness": "広",
    "initial": {
      "life": 60,
      "attack": 57,
      "defence": 57,
      "speed": 15,
      "push": 48,
      "critical": 29,
      "search": 14,
      "hide": 25
    },
    "rankupMax": {
      "life": 73,
      "attack": 81,
      "defence": 74,
      "speed": 18,
      "push": 60,
      "critical": 29,
      "search": 18,
      "hide": 28
    }
  },
  {
    "id": 61,
    "name": "愛染国俊",
    "url1": "http://wikiwiki.jp/toulove/?%B0%A6%C0%F7%B9%F1%BD%D3",
    "url2": "http://wikiwiki.jp/toulove/?%B0%A6%C0%F7%B9%F1%BD%D3%20%C6%C3",
    "rare": 1,
    "type": "短刀",
    "family": "来",
    "slot": 1,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 29,
      "attack": 13,
      "defence": 24,
      "speed": 32,
      "push": 18,
      "critical": 39,
      "search": 34,
      "hide": 35
    },
    "rankupMax": {
      "life": 35,
      "attack": 27,
      "defence": 38,
      "speed": 61,
      "push": 32,
      "critical": 39,
      "search": 47,
      "hide": 39
    }
  },
  {
    "id": 65,
    "name": "蜻蛉切",
    "url1": "http://wikiwiki.jp/toulove/?%E9%F1%E9%D9%C0%DA",
    "url2": "http://wikiwiki.jp/toulove/?%E9%F1%E9%D9%C0%DA%20%C6%C3",
    "rare": 3,
    "type": "槍",
    "family": "村正",
    "slot": 2,
    "rankup": 25,
    "wideness": "縦",
    "initial": {
      "life": 62,
      "attack": 56,
      "defence": 53,
      "speed": 12,
      "push": 48,
      "critical": 30,
      "search": 12,
      "hide": 28
    },
    "rankupMax": {
      "life": 73,
      "attack": 76,
      "defence": 63,
      "speed": 27,
      "push": 63,
      "critical": 30,
      "search": 21,
      "hide": 33
    }
  },
  {
    "id": 73,
    "name": "燭台切光忠",
    "url1": "http://wikiwiki.jp/toulove/?%BF%A4%C2%E6%C0%DA%B8%F7%C3%E9",
    "url2": "http://wikiwiki.jp/toulove/?%BF%A4%C2%E6%C0%DA%B8%F7%C3%E9%20%C6%C3",
    "rare": 3,
    "type": "太刀",
    "family": "長船",
    "slot": 2,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 52,
      "attack": 51,
      "defence": 51,
      "speed": 28,
      "push": 38,
      "critical": 30,
      "search": 28,
      "hide": 24
    },
    "rankupMax": {
      "life": 65,
      "attack": 73,
      "defence": 72,
      "speed": 34,
      "push": 53,
      "critical": 30,
      "search": 37,
      "hide": 30
    }
  },
  {
    "id": 79,
    "name": "江雪左文字",
    "url1": "http://wikiwiki.jp/toulove/?%B9%BE%C0%E3%BA%B8%CA%B8%BB%FA",
    "url2": "http://wikiwiki.jp/toulove/?%B9%BE%C0%E3%BA%B8%CA%B8%BB%FA%20%C6%C3",
    "rare": 4,
    "type": "太刀",
    "family": "左文字",
    "slot": 3,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 51,
      "attack": 51,
      "defence": 49,
      "speed": 31,
      "push": 41,
      "critical": 30,
      "search": 27,
      "hide": 26
    },
    "rankupMax": {
      "life": 65,
      "attack": 72,
      "defence": 70,
      "speed": 37,
      "push": 57,
      "critical": 30,
      "search": 35,
      "hide": 32
    }
  },
  {
    "id": 81,
    "name": "宗三左文字",
    "url1": "http://wikiwiki.jp/toulove/?%BD%A1%BB%B0%BA%B8%CA%B8%BB%FA",
    "url2": "http://wikiwiki.jp/toulove/?%BD%A1%BB%B0%BA%B8%CA%B8%BB%FA%20%C6%C3",
    "rare": 2,
    "type": "打刀",
    "family": "左文字",
    "slot": 2,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 32,
      "attack": 34,
      "defence": 34,
      "speed": 33,
      "push": 26,
      "critical": 30,
      "search": 33,
      "hide": 34
    },
    "rankupMax": {
      "life": 42,
      "attack": 53,
      "defence": 47,
      "speed": 46,
      "push": 49,
      "critical": 30,
      "search": 42,
      "hide": 39
    }
  },
  {
    "id": 83,
    "name": "小夜左文字",
    "url1": "http://wikiwiki.jp/toulove/?%BE%AE%CC%EB%BA%B8%CA%B8%BB%FA",
    "url2": "http://wikiwiki.jp/toulove/?%BE%AE%CC%EB%BA%B8%CA%B8%BB%FA%20%C6%C3",
    "rare": 1,
    "type": "短刀",
    "family": "左文字",
    "slot": 1,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 32,
      "attack": 20,
      "defence": 29,
      "speed": 20,
      "push": 16,
      "critical": 42,
      "search": 35,
      "hide": 35
    },
    "rankupMax": {
      "life": 39,
      "attack": 33,
      "defence": 44,
      "speed": 49,
      "push": 30,
      "critical": 42,
      "search": 47,
      "hide": 39
    }
  },
  {
    "id": 85,
    "name": "加州清光",
    "url1": "http://wikiwiki.jp/toulove/?%B2%C3%BD%A3%C0%B6%B8%F7",
    "url2": "http://wikiwiki.jp/toulove/?%B2%C3%BD%A3%C0%B6%B8%F7%20%C6%C3",
    "rare": 2,
    "type": "打刀",
    "family": "-",
    "slot": 2,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 33,
      "attack": 34,
      "defence": 36,
      "speed": 37,
      "push": 26,
      "critical": 41,
      "search": 36,
      "hide": 37
    },
    "rankupMax": {
      "life": 43,
      "attack": 55,
      "defence": 50,
      "speed": 51,
      "push": 50,
      "critical": 41,
      "search": 46,
      "hide": 42
    }
  },
  {
    "id": 87,
    "name": "大和守安定",
    "url1": "http://wikiwiki.jp/toulove/?%C2%E7%CF%C2%BC%E9%B0%C2%C4%EA",
    "url2": "http://wikiwiki.jp/toulove/?%C2%E7%CF%C2%BC%E9%B0%C2%C4%EA%20%C6%C3",
    "rare": 2,
    "type": "打刀",
    "family": "-",
    "slot": 2,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 37,
      "attack": 37,
      "defence": 34,
      "speed": 33,
      "push": 26,
      "critical": 38,
      "search": 34,
      "hide": 34
    },
    "rankupMax": {
      "life": 47,
      "attack": 56,
      "defence": 50,
      "speed": 49,
      "push": 49,
      "critical": 38,
      "search": 43,
      "hide": 39
    }
  },
  {
    "id": 89,
    "name": "歌仙兼定",
    "url1": "http://wikiwiki.jp/toulove/?%B2%CE%C0%E7%B7%F3%C4%EA",
    "url2": "http://wikiwiki.jp/toulove/?%B2%CE%C0%E7%B7%F3%C4%EA%20%C6%C3",
    "rare": 2,
    "type": "打刀",
    "family": "兼定",
    "slot": 2,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 35,
      "attack": 39,
      "defence": 35,
      "speed": 36,
      "push": 26,
      "critical": 30,
      "search": 33,
      "hide": 34
    },
    "rankupMax": {
      "life": 46,
      "attack": 59,
      "defence": 50,
      "speed": 50,
      "push": 51,
      "critical": 30,
      "search": 42,
      "hide": 39
    }
  },
  {
    "id": 91,
    "name": "和泉守兼定",
    "url1": "http://wikiwiki.jp/toulove/?%CF%C2%C0%F4%BC%E9%B7%F3%C4%EA",
    "url2": "http://wikiwiki.jp/toulove/?%CF%C2%C0%F4%BC%E9%B7%F3%C4%EA%20%C6%C3",
    "rare": 3,
    "type": "太刀",
    "family": "兼定",
    "slot": 2,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 50,
      "attack": 49,
      "defence": 48,
      "speed": 30,
      "push": 40,
      "critical": 30,
      "search": 30,
      "hide": 25
    },
    "rankupMax": {
      "life": 64,
      "attack": 70,
      "defence": 69,
      "speed": 36,
      "push": 56,
      "critical": 30,
      "search": 38,
      "hide": 31
    }
  },
  {
    "id": 93,
    "name": "陸奥守吉行",
    "url1": "http://wikiwiki.jp/toulove/?%CE%A6%B1%FC%BC%E9%B5%C8%B9%D4",
    "url2": "http://wikiwiki.jp/toulove/?%CE%A6%B1%FC%BC%E9%B5%C8%B9%D4%20%C6%C3",
    "rare": 2,
    "type": "打刀",
    "family": "-",
    "slot": 2,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 36,
      "attack": 40,
      "defence": 34,
      "speed": 33,
      "push": 28,
      "critical": 34,
      "search": 35,
      "hide": 35
    },
    "rankupMax": {
      "life": 47,
      "attack": 61,
      "defence": 47,
      "speed": 47,
      "push": 53,
      "critical": 34,
      "search": 44,
      "hide": 40
    }
  },
  {
    "id": 95,
    "name": "山姥切国広",
    "url1": "http://wikiwiki.jp/toulove/?%BB%B3%B1%B8%C0%DA%B9%F1%B9%AD",
    "url2": "http://wikiwiki.jp/toulove/?%BB%B3%B1%B8%C0%DA%B9%F1%B9%AD%20%C6%C3",
    "rare": 2,
    "type": "打刀",
    "family": "堀川",
    "slot": 2,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 34,
      "attack": 36,
      "defence": 36,
      "speed": 39,
      "push": 28,
      "critical": 35,
      "search": 35,
      "hide": 36
    },
    "rankupMax": {
      "life": 44,
      "attack": 58,
      "defence": 49,
      "speed": 52,
      "push": 55,
      "critical": 35,
      "search": 45,
      "hide": 41
    }
  },
  {
    "id": 97,
    "name": "山伏国広",
    "url1": "http://wikiwiki.jp/toulove/?%BB%B3%C9%FA%B9%F1%B9%AD",
    "url2": "http://wikiwiki.jp/toulove/?%BB%B3%C9%FA%B9%F1%B9%AD%20%C6%C3",
    "rare": 3,
    "type": "太刀",
    "family": "堀川",
    "slot": 2,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 51,
      "attack": 51,
      "defence": 45,
      "speed": 31,
      "push": 36,
      "critical": 28,
      "search": 25,
      "hide": 24
    },
    "rankupMax": {
      "life": 64,
      "attack": 72,
      "defence": 66,
      "speed": 37,
      "push": 52,
      "critical": 28,
      "search": 34,
      "hide": 30
    }
  },
  {
    "id": 99,
    "name": "堀川国広",
    "url1": "http://wikiwiki.jp/toulove/?%CB%D9%C0%EE%B9%F1%B9%AD",
    "url2": "http://wikiwiki.jp/toulove/?%CB%D9%C0%EE%B9%F1%B9%AD%20%C6%C3",
    "rare": 2,
    "type": "脇差",
    "family": "堀川",
    "slot": 2,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 29,
      "attack": 28,
      "defence": 26,
      "speed": 36,
      "push": 20,
      "critical": 45,
      "search": 41,
      "hide": 41
    },
    "rankupMax": {
      "life": 37,
      "attack": 47,
      "defence": 43,
      "speed": 50,
      "push": 36,
      "critical": 45,
      "search": 53,
      "hide": 46
    }
  },
  {
    "id": 101,
    "name": "蜂須賀虎徹",
    "url1": "http://wikiwiki.jp/toulove/?%CB%AA%BF%DC%B2%EC%B8%D7%C5%B0",
    "url2": "http://wikiwiki.jp/toulove/?%CB%AA%BF%DC%B2%EC%B8%D7%C5%B0%20%C6%C3",
    "rare": 2,
    "type": "打刀",
    "family": "虎徹",
    "slot": 2,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 39,
      "attack": 38,
      "defence": 38,
      "speed": 36,
      "push": 27,
      "critical": 31,
      "search": 34,
      "hide": 35
    },
    "rankupMax": {
      "life": 51,
      "attack": 60,
      "defence": 53,
      "speed": 52,
      "push": 54,
      "critical": 31,
      "search": 44,
      "hide": 41
    }
  },
  {
    "id": 103,
    "name": "浦島虎徹",
    "url1": "http://wikiwiki.jp/toulove/?%B1%BA%C5%E7%B8%D7%C5%B0",
    "url2": "http://wikiwiki.jp/toulove/?%B1%BA%C5%E7%B8%D7%C5%B0%20%C6%C3",
    "rare": 2,
    "type": "脇差",
    "family": "虎徹",
    "slot": 2,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 34,
      "attack": 25,
      "defence": 30,
      "speed": 30,
      "push": 30,
      "critical": 40,
      "search": 45,
      "hide": 34
    },
    "rankupMax": {
      "life": 45,
      "attack": 44,
      "defence": 50,
      "speed": 42,
      "push": 47,
      "critical": 40,
      "search": 53,
      "hide": 39
    }
  },
  {
    "id": 105,
    "name": "長曽祢虎徹",
    "url1": "http://wikiwiki.jp/toulove/?%C4%B9%C1%BE%C7%AA%B8%D7%C5%B0",
    "url2": "http://wikiwiki.jp/toulove/?%C4%B9%C1%BE%C7%AA%B8%D7%C5%B0%20%C6%C3",
    "rare": 2,
    "type": "打刀",
    "family": "虎徹…?",
    "slot": 2,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 45,
      "attack": 43,
      "defence": 38,
      "speed": 31,
      "push": 30,
      "critical": 30,
      "search": 35,
      "hide": 34
    },
    "rankupMax": {
      "life": 57,
      "attack": 68,
      "defence": 53,
      "speed": 42,
      "push": 56,
      "critical": 30,
      "search": 42,
      "hide": 39
    }
  },
  {
    "id": 116,
    "name": "大倶利伽羅",
    "url1": "http://wikiwiki.jp/toulove/?%C2%E7%B6%E6%CD%F8%B2%C0%CD%E5",
    "url2": "http://wikiwiki.jp/toulove/?%C2%E7%B6%E6%CD%F8%B2%C0%CD%E5%20%C6%C3",
    "rare": 3,
    "type": "太刀",
    "family": "-",
    "slot": 2,
    "rankup": 20,
    "wideness": "狭",
    "initial": {
      "life": 48,
      "attack": 48,
      "defence": 51,
      "speed": 29,
      "push": 42,
      "critical": 28,
      "search": 27,
      "hide": 27
    },
    "rankupMax": {
      "life": 59,
      "attack": 69,
      "defence": 68,
      "speed": 33,
      "push": 55,
      "critical": 28,
      "search": 34,
      "hide": 31
    }
  },
  {
    "id": 118,
    "name": "へし切長谷部",
    "url1": "http://wikiwiki.jp/toulove/?%A4%D8%A4%B7%C0%DA%C4%B9%C3%AB%C9%F4",
    "url2": "http://wikiwiki.jp/toulove/?%A4%D8%A4%B7%C0%DA%C4%B9%C3%AB%C9%F4%20%C6%C3",
    "rare": 2,
    "type": "打刀",
    "family": "-",
    "slot": 2,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 41,
      "attack": 42,
      "defence": 35,
      "speed": 42,
      "push": 30,
      "critical": 33,
      "search": 34,
      "hide": 34
    },
    "rankupMax": {
      "life": 51,
      "attack": 61,
      "defence": 48,
      "speed": 57,
      "push": 54,
      "critical": 33,
      "search": 43,
      "hide": 38
    }
  },
  {
    "id": 122,
    "name": "獅子王",
    "url1": "http://wikiwiki.jp/toulove/?%BB%E2%BB%D2%B2%A6",
    "url2": "http://wikiwiki.jp/toulove/?%BB%E2%BB%D2%B2%A6%20%C6%C3",
    "rare": 3,
    "type": "太刀",
    "family": "-",
    "slot": 2,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 45,
      "attack": 47,
      "defence": 49,
      "speed": 31,
      "push": 41,
      "critical": 28,
      "search": 25,
      "hide": 25
    },
    "rankupMax": {
      "life": 59,
      "attack": 66,
      "defence": 72,
      "speed": 37,
      "push": 56,
      "critical": 28,
      "search": 33,
      "hide": 31
    }
  },
  {
    "id": 128,
    "name": "同田貫正国",
    "url1": "http://wikiwiki.jp/toulove/?%C6%B1%C5%C4%B4%D3%C0%B5%B9%F1",
    "url2": "http://wikiwiki.jp/toulove/?%C6%B1%C5%C4%B4%D3%C0%B5%B9%F1%20%C6%C3",
    "rare": 3,
    "type": "太刀",
    "family": "-",
    "slot": 2,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 46,
      "attack": 50,
      "defence": 48,
      "speed": 30,
      "push": 40,
      "critical": 30,
      "search": 30,
      "hide": 25
    },
    "rankupMax": {
      "life": 56,
      "attack": 67,
      "defence": 65,
      "speed": 33,
      "push": 55,
      "critical": 30,
      "search": 36,
      "hide": 28
    }
  },
  {
    "id": 130,
    "name": "鶴丸国永",
    "url1": "http://wikiwiki.jp/toulove/?%C4%E1%B4%DD%B9%F1%B1%CA",
    "url2": "http://wikiwiki.jp/toulove/?%C4%E1%B4%DD%B9%F1%B1%CA%20%C6%C3",
    "rare": 4,
    "type": "太刀",
    "family": "-",
    "slot": 3,
    "rankup": 25,
    "wideness": "狭",
    "initial": {
      "life": 51,
      "attack": 51,
      "defence": 51,
      "speed": 31,
      "push": 38,
      "critical": 32,
      "search": 28,
      "hide": 26
    },
    "rankupMax": {
      "life": 62,
      "attack": 69,
      "defence": 69,
      "speed": 34,
      "push": 51,
      "critical": 32,
      "search": 33,
      "hide": 29
    }
  },
  {
    "id": 132,
    "name": "太郎太刀",
    "url1": "http://wikiwiki.jp/toulove/?%C2%C0%CF%BA%C2%C0%C5%E1",
    "url2": "http://wikiwiki.jp/toulove/?%C2%C0%CF%BA%C2%C0%C5%E1%20%C6%C3",
    "rare": 3,
    "type": "大太刀",
    "family": "-",
    "slot": 2,
    "rankup": 25,
    "wideness": "広",
    "initial": {
      "life": 62,
      "attack": 57,
      "defence": 57,
      "speed": 12,
      "push": 45,
      "critical": 26,
      "search": 13,
      "hide": 26
    },
    "rankupMax": {
      "life": 76,
      "attack": 82,
      "defence": 77,
      "speed": 17,
      "push": 61,
      "critical": 26,
      "search": 20,
      "hide": 31
    }
  },
  {
    "id": 134,
    "name": "次郎太刀",
    "url1": "http://wikiwiki.jp/toulove/?%BC%A1%CF%BA%C2%C0%C5%E1",
    "url2": "http://wikiwiki.jp/toulove/?%BC%A1%CF%BA%C2%C0%C5%E1%20%C6%C3",
    "rare": 3,
    "type": "大太刀",
    "family": "-",
    "slot": 2,
    "rankup": 25,
    "wideness": "広",
    "initial": {
      "life": 57,
      "attack": 60,
      "defence": 59,
      "speed": 11,
      "push": 43,
      "critical": 23,
      "search": 12,
      "hide": 30
    },
    "rankupMax": {
      "life": 72,
      "attack": 84,
      "defence": 80,
      "speed": 16,
      "push": 58,
      "critical": 23,
      "search": 18,
      "hide": 35
    }
  },
  {
    "id": 138,
    "name": "御手杵",
    "url1": "http://wikiwiki.jp/toulove/?%B8%E6%BC%EA%B5%CF",
    "url2": "http://wikiwiki.jp/toulove/?%B8%E6%BC%EA%B5%CF%20%C6%C3",
    "rare": 3,
    "type": "槍",
    "family": "-",
    "slot": 2,
    "rankup": 25,
    "wideness": "縦",
    "initial": {
      "life": 49,
      "attack": 50,
      "defence": 40,
      "speed": 28,
      "push": 46,
      "critical": 32,
      "search": 31,
      "hide": 28
    },
    "rankupMax": {
      "life": 60,
      "attack": 69,
      "defence": 51,
      "speed": 42,
      "push": 62,
      "critical": 32,
      "search": 40,
      "hide": 33
    }
  }
]
},{}]},{},[27]);
