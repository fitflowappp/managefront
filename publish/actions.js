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
resource("Account", '/api/user', [], {
    actions: [["login", "post", "/api/manage/admin/login", "result"]],
    reducers: {
        // TEST_ADD_ACTIONS: function (state, action) {
        //     console.log(state, action);
        // return something
        // return Object.assign({}, state, {isLoading: true, error: false})
        // }
    }
});
resource("Users", '/api/manage/admin/user/:id', [], {
    actions: []
});
resource("Dashboard", '/api/manage/yoga/dashboard', [], {
    actions: []
});
resource("Routines", '/api/manage/yoga/routine/:id', [], {
    actions: []
});
resource("Workouts", '/api/manage/yoga/workout/:id', [], {
    actions: [["copyWorkout", "put", "/api/manage/yoga/workout/:id/copy/:title", "risk"]]
});
resource("Challenges", '/api/manage/yoga/challenge/:id', [], {
    actions: []
});
resource("ChallengeOrders", '/api/manage/yoga/challengeset/:id', [], {
    actions: []
});
resource("MileStones", '/api/manage/yoga/milestone/:id', [], {
    actions: []
});
exports.reducers = reducerObject;
//# sourceMappingURL=actions.js.map
