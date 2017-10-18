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

var _Register = require('./containers/Register');

var _Register2 = _interopRequireDefault(_Register);

var _Account = require('./containers/Account');

var _Account2 = _interopRequireDefault(_Account);

var _Dashboard = require('./containers/Dashboard');

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _Routines = require('./containers/Routines');

var _Routines2 = _interopRequireDefault(_Routines);

var _RoutinesEdit = require('./containers/RoutinesEdit');

var _RoutinesEdit2 = _interopRequireDefault(_RoutinesEdit);

var _Workouts = require('./containers/Workouts');

var _Workouts2 = _interopRequireDefault(_Workouts);

var _WorkoutsEdit = require('./containers/WorkoutsEdit');

var _WorkoutsEdit2 = _interopRequireDefault(_WorkoutsEdit);

var _Challenges = require('./containers/Challenges');

var _Challenges2 = _interopRequireDefault(_Challenges);

var _ChallengesEdit = require('./containers/ChallengesEdit');

var _ChallengesEdit2 = _interopRequireDefault(_ChallengesEdit);

var _ChallengesOrders = require('./containers/ChallengesOrders');

var _ChallengesOrders2 = _interopRequireDefault(_ChallengesOrders);

var _ChallengesOrdersEdit = require('./containers/ChallengesOrdersEdit');

var _ChallengesOrdersEdit2 = _interopRequireDefault(_ChallengesOrdersEdit);

var _Users = require('./containers/Users');

var _Users2 = _interopRequireDefault(_Users);

var _UserDetails = require('./containers/UserDetails');

var _UserDetails2 = _interopRequireDefault(_UserDetails);

var _Milestones = require('./containers/Milestones');

var _Milestones2 = _interopRequireDefault(_Milestones);

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
            pathname: '/dashboard',
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
    _react2.default.createElement(_reactRouter.Route, { path: 'register', component: _Register2.default, name: 'Register' }),
    _react2.default.createElement(_reactRouter.Route, { path: 'account', component: _Account2.default, name: '\u8D26\u53F7\u7BA1\u7406', onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'dashboard', component: _Dashboard2.default, name: 'dashboard', onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'routines', component: _Routines2.default, name: 'routines', onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'routinesedit/:id', component: _RoutinesEdit2.default, name: 'routines', onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'workouts', component: _Workouts2.default, name: 'workouts', onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'workoutsedit/:id', component: _WorkoutsEdit2.default, name: 'workouts', onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'challenges', component: _Challenges2.default, name: 'challenges', onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'challengesedit/:id', component: _ChallengesEdit2.default, name: 'challenges', onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'challengesorders', component: _ChallengesOrders2.default, name: 'challenges', onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'challengesordersedit/:id', component: _ChallengesOrdersEdit2.default, name: 'challenges', onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'yusers', component: _Users2.default, name: 'users', onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'yusers/userdetails/:id', component: _UserDetails2.default, name: 'users', onEnter: requireAuth }),
    _react2.default.createElement(_reactRouter.Route, { path: 'milestones', component: _Milestones2.default, name: 'milestones', onEnter: requireAuth })
);
exports.default = routes;
//# sourceMappingURL=routes.js.map
