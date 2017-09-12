/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorLeaf.react
 * @typechecks
 * 
 */

'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var DraftEditorTextNode = require('./DraftEditorTextNode.react');
var React = require('react');
var ReactDOM = require('react-dom');
var SelectionState = require('./SelectionState');

var setDraftEditorSelection = require('./setDraftEditorSelection');

/**
 * All leaf nodes in the editor are spans with single text nodes. Leaf
 * elements are styled based on the merging of an optional custom style map
 * and a default style map.
 *
 * `DraftEditorLeaf` also provides a wrapper for calling into the imperative
 * DOM Selection API. In this way, top-level components can declaratively
 * maintain the selection state.
 */

var DraftEditorLeaf = function (_React$Component) {
  _inherits(DraftEditorLeaf, _React$Component);

  function DraftEditorLeaf() {
    _classCallCheck(this, DraftEditorLeaf);

    _get((0, _getPrototypeOf2.default)(DraftEditorLeaf.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(DraftEditorLeaf, [{
    key: '_setSelection',

    /**
     * By making individual leaf instances aware of their context within
     * the text of the editor, we can set our selection range more
     * easily than we could in the non-React world.
     *
     * Note that this depends on our maintaining tight control over the
     * DOM structure of the TextEditor component. If leaves had multiple
     * text nodes, this would be harder.
     */
    value: function _setSelection() {
      var selection = this.props.selection;

      // If selection state is irrelevant to the parent block, no-op.
      if (selection == null || !selection.getHasFocus()) {
        return;
      }

      var _props = this.props;
      var blockKey = _props.blockKey;
      var start = _props.start;
      var text = _props.text;

      var end = start + text.length;
      if (!selection.hasEdgeWithin(blockKey, start, end)) {
        return;
      }

      // Determine the appropriate target node for selection. If the child
      // is not a text node, it is a <br /> spacer. In this case, use the
      // <span> itself as the selection target.
      var node = ReactDOM.findDOMNode(this);
      var child = node.firstChild;
      var targetNode = undefined;

      if (child.nodeType === Node.TEXT_NODE) {
        targetNode = child;
      } else if (child.tagName === 'BR') {
        targetNode = node;
      } else {
        targetNode = child.firstChild;
      }

      setDraftEditorSelection(selection, targetNode, blockKey, start, end);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return ReactDOM.findDOMNode(this.refs.leaf).textContent !== nextProps.text || nextProps.styleSet !== this.props.styleSet || nextProps.forceSelection;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._setSelection();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._setSelection();
    }
  }, {
    key: 'render',
    value: function render() {
      var text = this.props.text;

      // If the leaf is at the end of its block and ends in a soft newline, append
      // an extra line feed character. Browsers collapse trailing newline
      // characters, which leaves the cursor in the wrong place after a
      // shift+enter. The extra character repairs this.
      if (text.endsWith('\n') && this.props.isLast) {
        text += '\n';
      }

      var _props2 = this.props;
      var customStyleMap = _props2.customStyleMap;
      var offsetKey = _props2.offsetKey;
      var styleSet = _props2.styleSet;

      var styleObj = styleSet.reduce(function (map, styleName) {
        var mergedStyles = {};
        var style = customStyleMap[styleName];

        if (style !== undefined && map.textDecoration !== style.textDecoration) {
          mergedStyles.textDecoration = [map.textDecoration, style.textDecoration].join(' ');
        }

        return (0, _assign2.default)(map, style, mergedStyles);
      }, {});

      return React.createElement('span', {
        'data-offset-key': offsetKey,
        ref: 'leaf',
        style: styleObj }, React.createElement(DraftEditorTextNode, null, text));
    }
  }]);

  return DraftEditorLeaf;
}(React.Component);

module.exports = DraftEditorLeaf;

// A function passed through from the the top level to define a cx
// style map for the provided style value.

// Mapping of style names to CSS declarations.

// Whether to force the DOM selection after render.

// Whether this leaf is the last in its block. Used for a DOM hack.

// The current `SelectionState`, used to

// The offset of this string within its block.

// The set of style(s) names to apply to the node.

// The full text to be rendered within this node.
//# sourceMappingURL=DraftEditorLeaf.react.js.map
