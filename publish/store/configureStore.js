'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//applyMiddleware来自redux可以包装 store 的 dispatch
//thunk作用是使被 dispatch 的 function 会接收 dispatch 作为参数，并且可以异步调用它
var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore); /**
                                                                                                        * Created by john on 2016/5/16.
                                                                                                        */
function configureStore(initialState) {
    var store = createStoreWithMiddleware(_reducers2.default, initialState

    //热替换选项
    );if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', function () {
            var nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
//# sourceMappingURL=configureStore.js.map
