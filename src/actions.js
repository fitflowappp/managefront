/**
 * Created by john on 2017/6/6.
 */
import {actionFactory, reducerFactory} from "./common/index";
import {createAction} from "redux-actions";
var reducerObject = {};
function resource(name, url, keys = [], option = {}) {
    var actionOption = option.actions;
    var reducerOption = option.reducers;
    reducerObject[name.toLowerCase()] = reducerFactory(name, reducerOption);
    exports[name.toLowerCase() + "Actions"] = {... actionFactory(name, url, keys, actionOption)};
}
resource("Account", '/api/admin/:id', [],
    {
        actions: [
            ["login", "post", "/api/admin/login/me", "result"],
        ],
        reducers: {
            // TEST_ADD_ACTIONS: function (state, action) {
            //     console.log(state, action);
            // return something
            // return Object.assign({}, state, {isLoading: true, error: false})
            // }
        }
    }
);
resource("User", '/api/user/:userId', [],
    {
        actions: [
            ["risk", "get", "/api/user/risk/:userId", "risk"],
            ["userPayment", "get", "/api/payment/:userId"],
            ["agreement", "get", "/api/user/risk/:userId"],
            ["faculty", "get", "/api/user/risk/:userId"]

        ]
    });
resource("Networkinfo", '/api/wechataddress', [],
    {
        actions: [
            ["industry", "get", "/api/wechataddress/open/industry", 'industrys'],
            ['province', "get", "/bbs/user/open/province", "provinces"],
        ],
    });
exports.reducers = reducerObject;


