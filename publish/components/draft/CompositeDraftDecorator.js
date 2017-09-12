/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CompositeDraftDecorator
 * @typechecks
 * 
 */

'use strict';

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Immutable = require('immutable');

var List = Immutable.List;

var DELIMITER = '.';

/**
 * A CompositeDraftDecorator traverses through a list of DraftDecorator
 * instances to identify sections of a ContentBlock that should be rendered
 * in a "decorated" manner. For example, hashtags, mentions, and links may
 * be intended to stand out visually, be rendered as anchors, etc.
 *
 * The list of decorators supplied to the constructor will be used in the
 * order they are provided. This allows the caller to specify a priority for
 * string matching, in case of match collisions among decorators.
 *
 * For instance, I may have a link with a `#` in its text. Though this section
 * of text may match our hashtag decorator, it should not be treated as a
 * hashtag. I should therefore list my link DraftDecorator
 * before my hashtag DraftDecorator when constructing this composite
 * decorator instance.
 *
 * Thus, when a collision like this is encountered, the earlier match is
 * preserved and the new match is discarded.
 */

var CompositeDraftDecorator = function () {
  function CompositeDraftDecorator(decorators) {
    _classCallCheck(this, CompositeDraftDecorator);

    // Copy the decorator array, since we use this array order to determine
    // precedence of decoration matching. If the array is mutated externally,
    // we don't want to be affected here.
    this._decorators = decorators.slice();
  }

  /**
   * Determine whether we can occupy the specified slice of the decorations
   * array.
   */

  _createClass(CompositeDraftDecorator, [{
    key: 'getDecorations',
    value: function getDecorations(block) {
      var decorations = Array(block.getText().length).fill(null);

      this._decorators.forEach(function ( /*object*/decorator, /*number*/ii) {
        var counter = 0;
        var strategy = decorator.strategy;
        strategy(block, function ( /*number*/start, /*number*/end) {
          // Find out if any of our matching range is already occupied
          // by another decorator. If so, discard the match. Otherwise, store
          // the component key for rendering.
          if (canOccupySlice(decorations, start, end)) {
            occupySlice(decorations, start, end, ii + DELIMITER + counter);
            counter++;
          }
        });
      });

      return List(decorations);
    }
  }, {
    key: 'getComponentForKey',
    value: function getComponentForKey(key) {
      var componentKey = parseInt(key.split(DELIMITER)[0], 10);
      return this._decorators[componentKey].component;
    }
  }, {
    key: 'getPropsForKey',
    value: function getPropsForKey(key) {
      var componentKey = parseInt(key.split(DELIMITER)[0], 10);
      return this._decorators[componentKey].props;
    }
  }]);

  return CompositeDraftDecorator;
}();

function canOccupySlice(decorations, start, end) {
  for (var ii = start; ii < end; ii++) {
    if (decorations[ii] != null) {
      return false;
    }
  }
  return true;
}

/**
 * Splice the specified component into our decoration array at the desired
 * range.
 */
function occupySlice(targetArr, start, end, componentKey) {
  for (var ii = start; ii < end; ii++) {
    targetArr[ii] = componentKey;
  }
}

module.exports = CompositeDraftDecorator;
//# sourceMappingURL=CompositeDraftDecorator.js.map
