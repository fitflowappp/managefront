/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ContentBlock
 * @typechecks
 * 
 */

'use strict';

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;(0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _get = function get(_x, _x2, _x3) {
  var _again = true;_function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);if (desc === undefined) {
      var parent = (0, _getPrototypeOf2.default)(object);if (parent === null) {
        return undefined;
      } else {
        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
      }
    } else if ('value' in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + (typeof superClass === 'undefined' ? 'undefined' : (0, _typeof3.default)(superClass)));
  }subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
}

var Immutable = require('immutable');

var findRangesImmutable = require('./findRangesImmutable');

var List = Immutable.List;
var OrderedSet = Immutable.OrderedSet;
var Record = Immutable.Record;

var EMPTY_SET = OrderedSet();

var defaultRecord = {
  key: '',
  type: 'unstyled',
  text: '',
  characterList: List(),
  depth: 0
};

var ContentBlockRecord = Record(defaultRecord);

var ContentBlock = function (_ContentBlockRecord) {
  _inherits(ContentBlock, _ContentBlockRecord);

  function ContentBlock() {
    _classCallCheck(this, ContentBlock);

    _get((0, _getPrototypeOf2.default)(ContentBlock.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ContentBlock, [{
    key: 'getKey',
    value: function getKey() {
      return this.get('key');
    }
  }, {
    key: 'getType',
    value: function getType() {
      return this.get('type');
    }
  }, {
    key: 'getText',
    value: function getText() {
      return this.get('text');
    }
  }, {
    key: 'getCharacterList',
    value: function getCharacterList() {
      return this.get('characterList');
    }
  }, {
    key: 'getLength',
    value: function getLength() {
      return this.getText().length;
    }
  }, {
    key: 'getDepth',
    value: function getDepth() {
      return this.get('depth');
    }
  }, {
    key: 'getInlineStyleAt',
    value: function getInlineStyleAt(offset) {
      var character = this.getCharacterList().get(offset);
      return character ? character.getStyle() : EMPTY_SET;
    }
  }, {
    key: 'getEntityAt',
    value: function getEntityAt(offset) {
      var character = this.getCharacterList().get(offset);
      return character ? character.getEntity() : null;
    }

    /**
     * Execute a callback for every contiguous range of styles within the block.
     */
  }, {
    key: 'findStyleRanges',
    value: function findStyleRanges(filterFn, callback) {
      findRangesImmutable(this.getCharacterList(), haveEqualStyle, filterFn, callback);
    }

    /**
     * Execute a callback for every contiguous range of entities within the block.
     */
  }, {
    key: 'findEntityRanges',
    value: function findEntityRanges(filterFn, callback) {
      findRangesImmutable(this.getCharacterList(), haveEqualEntity, filterFn, callback);
    }
  }]);

  return ContentBlock;
}(ContentBlockRecord);

function haveEqualStyle(charA, charB) {
  return charA.getStyle() === charB.getStyle();
}

function haveEqualEntity(charA, charB) {
  return charA.getEntity() === charB.getEntity();
}

module.exports = ContentBlock;
//# sourceMappingURL=ContentBlock.js.map
