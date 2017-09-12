'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMuser = getMuser;
exports.getMToken = getMToken;
exports.logout = logout;

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by john on 2016/6/8.
 */
function getMuser() {
    return _reactCookie2.default.load("muser");
}
var auth_token;
function getMToken() {
    if (!auth_token) {
        auth_token = getMuser() ? getMuser().sessionId : null;
    }
    return auth_token;
}
function logout() {
    return function (dispatch) {
        dispatch({ type: "LOGOUT" });
        _reactCookie2.default.remove("muser", { "path": '/' });
        auth_token = null;
        _reactRouter.browserHistory.push('/');
    };
}
//# sourceMappingURL=auth.js.map
