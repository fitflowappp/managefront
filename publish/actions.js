"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _index = require("./common/index");

var _reduxActions = require("redux-actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by john on 2017/6/6.
 */
var reducerObject = {};
function resource(name, url) {
    var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var option = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var actionOption = option.actions;
    var reducerOption = option.reducers;
    reducerObject[name.toLowerCase()] = (0, _index.reducerFactory)(name, reducerOption);
    exports[name.toLowerCase() + "Actions"] = (0, _extends3.default)({}, (0, _index.actionFactory)(name, url, keys, actionOption));
}
resource("Account", '/api/admin/:id', [], {
    actions: [["login", "post", "/api/admin/login/me", "result"]],
    reducers: {
        // TEST_ADD_ACTIONS: function (state, action) {
        //     console.log(state, action);
        // return something
        // return Object.assign({}, state, {isLoading: true, error: false})
        // }
    }
});
resource("User", '/api/user/:userId', [], {
    actions: [["risk", "get", "/api/user/risk/:userId", "risk"], ["userPayment", "get", "/api/payment/:userId"], ["agreement", "get", "/api/user/risk/:userId"], ["faculty", "get", "/api/user/risk/:userId"]]
});
resource("Networkinfo", '/api/wechataddress', [], {
    actions: [["industry", "get", "/api/wechataddress/open/industry", 'industrys'], ['province', "get", "/bbs/user/open/province", "provinces"]]
});
exports.reducers = reducerObject;
//# sourceMappingURL=actions.js.map
