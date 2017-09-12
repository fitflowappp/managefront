/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SelectionState
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

var Record = Immutable.Record;

var defaultRecord = {
  anchorKey: '',
  anchorOffset: 0,
  focusKey: '',
  focusOffset: 0,
  isBackward: false,
  hasFocus: false
};

var SelectionStateRecord = Record(defaultRecord);

var SelectionState = function (_SelectionStateRecord) {
  _inherits(SelectionState, _SelectionStateRecord);

  function SelectionState() {
    _classCallCheck(this, SelectionState);

    _get((0, _getPrototypeOf2.default)(SelectionState.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(SelectionState, [{
    key: 'serialize',
    value: function serialize() {
      return 'Anchor: ' + this.getAnchorKey() + ':' + this.getAnchorOffset() + ', ' + 'Focus: ' + this.getFocusKey() + ':' + this.getFocusOffset() + ', ' + 'Is Backward: ' + String(this.getIsBackward()) + ', ' + 'Has Focus: ' + String(this.getHasFocus());
    }
  }, {
    key: 'getAnchorKey',
    value: function getAnchorKey() {
      return this.get('anchorKey');
    }
  }, {
    key: 'getAnchorOffset',
    value: function getAnchorOffset() {
      return this.get('anchorOffset');
    }
  }, {
    key: 'getFocusKey',
    value: function getFocusKey() {
      return this.get('focusKey');
    }
  }, {
    key: 'getFocusOffset',
    value: function getFocusOffset() {
      return this.get('focusOffset');
    }
  }, {
    key: 'getIsBackward',
    value: function getIsBackward() {
      return this.get('isBackward');
    }
  }, {
    key: 'getHasFocus',
    value: function getHasFocus() {
      return this.get('hasFocus');
    }

    /**
     * Return whether the specified range overlaps with an edge of the
     * SelectionState.
     */
  }, {
    key: 'hasEdgeWithin',
    value: function hasEdgeWithin(blockKey, start, end) {
      var anchorKey = this.getAnchorKey();
      var focusKey = this.getFocusKey();

      if (anchorKey === focusKey && anchorKey === blockKey) {
        var selectionStart = this.getStartOffset();
        var selectionEnd = this.getEndOffset();
        return start <= selectionEnd && selectionStart <= end;
      }

      if (blockKey !== anchorKey && blockKey !== focusKey) {
        return false;
      }

      var offsetToCheck = blockKey === anchorKey ? this.getAnchorOffset() : this.getFocusOffset();

      return start <= offsetToCheck && end >= offsetToCheck;
    }
  }, {
    key: 'isCollapsed',
    value: function isCollapsed() {
      return this.getAnchorKey() === this.getFocusKey() && this.getAnchorOffset() === this.getFocusOffset();
    }
  }, {
    key: 'getStartKey',
    value: function getStartKey() {
      return this.getIsBackward() ? this.getFocusKey() : this.getAnchorKey();
    }
  }, {
    key: 'getStartOffset',
    value: function getStartOffset() {
      return this.getIsBackward() ? this.getFocusOffset() : this.getAnchorOffset();
    }
  }, {
    key: 'getEndKey',
    value: function getEndKey() {
      return this.getIsBackward() ? this.getAnchorKey() : this.getFocusKey();
    }
  }, {
    key: 'getEndOffset',
    value: function getEndOffset() {
      return this.getIsBackward() ? this.getAnchorOffset() : this.getFocusOffset();
    }
  }], [{
    key: 'createEmpty',
    value: function createEmpty(key) {
      return new SelectionState({
        anchorKey: key,
        anchorOffset: 0,
        focusKey: key,
        focusOffset: 0,
        isBackward: false,
        hasFocus: false
      });
    }
  }]);

  return SelectionState;
}(SelectionStateRecord);

module.exports = SelectionState;
//# sourceMappingURL=SelectionState.js.map
