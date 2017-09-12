/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CharacterMetadata
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

var _require = require('immutable');

var Map = _require.Map;
var OrderedSet = _require.OrderedSet;
var Record = _require.Record;

var EMPTY_SET = OrderedSet();

var defaultRecord = {
  style: EMPTY_SET,
  entity: null
};

var CharacterMetadataRecord = Record(defaultRecord);

var CharacterMetadata = function (_CharacterMetadataRecord) {
  _inherits(CharacterMetadata, _CharacterMetadataRecord);

  function CharacterMetadata() {
    _classCallCheck(this, CharacterMetadata);

    _get((0, _getPrototypeOf2.default)(CharacterMetadata.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(CharacterMetadata, [{
    key: 'getStyle',
    value: function getStyle() {
      return this.get('style');
    }
  }, {
    key: 'getEntity',
    value: function getEntity() {
      return this.get('entity');
    }
  }, {
    key: 'hasStyle',
    value: function hasStyle(style) {
      return this.getStyle().has(style);
    }
  }], [{
    key: 'applyStyle',
    value: function applyStyle(record, style) {
      var withStyle = record.set('style', record.getStyle().add(style));
      return CharacterMetadata.create(withStyle);
    }
  }, {
    key: 'removeStyle',
    value: function removeStyle(record, style) {
      var withoutStyle = record.set('style', record.getStyle().remove(style));
      return CharacterMetadata.create(withoutStyle);
    }
  }, {
    key: 'applyEntity',
    value: function applyEntity(record, entityKey) {
      var withEntity = record.getEntity() === entityKey ? record : record.set('entity', entityKey);
      return CharacterMetadata.create(withEntity);
    }

    /**
     * Use this function instead of the `CharacterMetadata` constructor.
     * Since most content generally uses only a very small number of
     * style/entity permutations, we can reuse these objects as often as
     * possible.
     */
  }, {
    key: 'create',
    value: function create(config) {
      if (!config) {
        return EMPTY;
      }

      // Fill in unspecified properties, if necessary.
      var configMap = Map({ style: EMPTY_SET, entity: null }).merge(config);

      var existing = pool.get(configMap);
      if (existing) {
        return existing;
      }

      var newCharacter = new CharacterMetadata(configMap);
      pool = pool.set(configMap, newCharacter);
      return newCharacter;
    }
  }]);

  return CharacterMetadata;
}(CharacterMetadataRecord);

var EMPTY = new CharacterMetadata();
var pool = Map([[Map(defaultRecord), EMPTY]]);

CharacterMetadata.EMPTY = EMPTY;

module.exports = CharacterMetadata;
//# sourceMappingURL=CharacterMetadata.js.map
