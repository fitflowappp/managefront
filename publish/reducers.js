'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _redux = require('redux');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//使用redux的combineReducers方法将所有reducer打包起来
/**
 * Created by john on 2017/6/6.
 */
var appReducer = (0, _redux.combineReducers)((0, _extends3.default)({}, _actions.reducers));
// import {reducer as app} from './actions/app'

var rootReducer = function rootReducer(state, action) {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return appReducer(state, action);
};
exports.default = rootReducer;
//# sourceMappingURL=reducers.js.map
