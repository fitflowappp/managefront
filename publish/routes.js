'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('./containers/App');

var _App2 = _interopRequireDefault(_App);

var _Login = require('./containers/Login');

var _Login2 = _interopRequireDefault(_Login);

var _Account = require('./containers/Account');

var _Account2 = _interopRequireDefault(_Account);

var _Networkinfo = require('./containers/Networkinfo');

var _Networkinfo2 = _interopRequireDefault(_Networkinfo);

var _auth = require('./common/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function requireAuth(nextState, replace) {
    if (!(0, _auth.getMuser)()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
} /**
   * Created by john on 2016/5/17.
   */

function logined(nextState, replace) {
    if ((0, _auth.getMuser)()) {
        replace({
            pathname: '/account',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

// route 规则：
// - `/list` 显示 `List` 组件
// - `/item/:id` 显示 `Item` 组件
// 地址用小写
var routes = _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _App2.default },
    _react2.default.createElement(_reactRouter.IndexRedirect, { to: 'login' }),
    _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _Login2.default, name: '\u767B\u5F55', onEnter: logined }),
    _react2.default.createElement(_reactRouter.Route, { path: 'account', component: _Account2.default, name: '\u8D26\u53F7\u7BA1\u7406', onEnter: requireAuth }),
    _react2.default.createElement(
        _reactRouter.Route,
        { path: 'networkinfo', onEnter: requireAuth },
        _react2.default.createElement(_reactRouter.Route, { path: 'list', component: _Networkinfo2.default })
    )
);
exports.default = routes;
// export default routeLists;
//# sourceMappingURL=routes.js.map
