'use strict';

require('es6-shim');

require('console-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Grab the state from a global injected into server-generated HTML
/**
 * Created by john on 2016/5/16.
 */
var initialState = window.__INITIAL_STATE__;
//es6 ie9兼容


var store = (0, _configureStore2.default)(initialState);
(0, _reactDom.render)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
        _reactRouter.Router,
        { history: _reactRouter.browserHistory },
        _routes2.default
    )
), document.getElementById('root'));
//# sourceMappingURL=index.js.map
