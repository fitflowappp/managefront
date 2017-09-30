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
resource("Account", '/api/user', [],
    {
        actions: [
            ["login", "post", "/api/manage/admin/login", "result"],
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
resource("Dashboard", '/api/manage/yoga/dashboard', [],
    {
        actions: [

        ],
    });
resource("Routines", '/api/manage/yoga/routine/:id', [],
    {
        actions: [

        ],
    });
resource("Workouts", '/api/manage/yoga/workout/:id', [],
    {
        actions: [
            ["copyWorkout", "put", "/api/manage/yoga/workout/:id/copy/:title", "risk"],
        ],
    });
resource("Challenges", '/api/manage/yoga/challenge/:id', [],
    {
        actions: [

        ],
    });
resource("ChallengeOrders", '/api/manage/yoga/challengeset/:id', [],
    {
        actions: [

        ],
    });
resource("MileStones", '/api/manage/yoga/milestone/:id', [],
    {
        actions: [

        ],
    });
exports.reducers = reducerObject;


