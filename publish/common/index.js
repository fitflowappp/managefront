'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.actionFactory = actionFactory;
exports.reducerFactory = reducerFactory;
exports.serializeForm = serializeForm;
exports.linkState = linkState;
exports.isEqual = isEqual;
exports.getTime = getTime;
exports.scrollTop = scrollTop;
exports.isObject = isObject;
exports.isArray = isArray;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fetch = require('../common/fetch');

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//get put post delete
function actionFactory(resourceName, url, key, customMethod) {
    var REQUEST = 'REQUEST_' + resourceName.toUpperCase();
    var RECEIVE = 'RECEIVE_' + resourceName.toUpperCase();
    var DELETE = 'DELETE_' + resourceName.toUpperCase();
    var ERROR = 'ERROR_' + resourceName.toUpperCase();
    var CLEAN = 'CLEAN_' + resourceName.toUpperCase();
    var _UPDATE = '_UPDATE_' + resourceName.toUpperCase();
    var _DELETE = '_DELETE_' + resourceName.toUpperCase();
    var action_request = (0, _reduxActions.createAction)(REQUEST);

    var action_query = (0, _reduxActions.createAction)(RECEIVE, function (data, keys) {
        return { list: data };
    });
    var action_receive = (0, _reduxActions.createAction)(RECEIVE, function (data, keys) {
        var _key = keys.join("-");
        var d = {};
        if (_key) {
            d[_key] = data;
        } else {
            d["data"] = data;
        }
        return d;
    });

    var action_delete = (0, _reduxActions.createAction)(DELETE, function (data, params, keys) {
        return { key: keys.join("-"), params: params, data: data };
    });
    var action_error = (0, _reduxActions.createAction)(ERROR, function (err) {
        return { err: err };
    });

    var methods = {};
    methods["query" + resourceName] = function (params, successcb, errorcb) {
        return (0, _fetch.getAPI)(successcb, errorcb, [action_query, action_request, action_error], url, params, key);
    };
    methods["get" + resourceName] = function (params, successcb, errorcb) {
        return (0, _fetch.getAPI)(successcb, errorcb, [action_receive, action_request, action_error], url, params, key);
    };
    methods["post" + resourceName] = function (params, successcb, errorcb) {
        return (0, _fetch.postAPI)(successcb, errorcb, [action_receive, action_request, action_error], url, params, key);
    };
    methods["put" + resourceName] = function (params, successcb, errorcb) {
        return (0, _fetch.putAPI)(successcb, errorcb, [action_receive, action_request, action_error], url, params, key);
    };
    methods["delete" + resourceName] = function (params, successcb, errorcb) {
        return (0, _fetch.deleteAPI)(successcb, errorcb, [action_delete, action_request, action_error], url, params, key);
    };
    methods["clean" + resourceName] = function (params, data) {
        return function (dispatch) {
            dispatch({ type: CLEAN });
        };
    };

    methods["_update" + resourceName] = function () {
        for (var _len = arguments.length, p = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
            p[_key2] = arguments[_key2];
        }

        return function (dispatch) {
            dispatch((0, _reduxActions.createAction)(_UPDATE, function (data) {
                return data;
            }).apply(undefined, p));
        };
    };
    methods["_delete" + resourceName] = function () {
        for (var _len2 = arguments.length, p = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
            p[_key3] = arguments[_key3];
        }

        return function (dispatch) {
            dispatch((0, _reduxActions.createAction)(_DELETE, function (data) {
                return data;
            }).apply(undefined, p));
        };
    };

    // {name,type,url,paramName}
    if (customMethod) {
        // if (customMethod instanceof Function) {
        //     methods = {...methods, ...customMethod(action_receive, action_request, action_error, key)};
        // } else
        if (Object.prototype.toString.call(customMethod) === '[object Array]') {
            methods = (0, _extends3.default)({}, methods);
            // customMethod
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var m = _step.value;

                    if (m.length >= 3) {
                        var new_action_receive = (0, _reduxActions.createAction)(RECEIVE, function (data, keys) {
                            var result = {};
                            if (m.length == 3) {
                                result[m[0]] = data;
                            } else {
                                result[m[3]] = data;
                            }
                            return result;
                        });
                        methods[m[0]] = function (params, successcb, errorcb) {
                            return (0, _fetch.apiFactory)(m[1], successcb, errorcb, [new_action_receive, action_request, action_receive], m[2], params, key);
                        };
                    } else if (m.length == 2) {
                        methods[m[0]] = function () {
                            for (var _len3 = arguments.length, p = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
                                p[_key4] = arguments[_key4];
                            }

                            return function (dispatch) {
                                dispatch(m[1].apply(m, p));
                            };
                        };
                    }
                };

                for (var _iterator = (0, _getIterator3.default)(customMethod), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }
    return methods;
} /**
   * Created by john on 2016/5/19.
   */
function reducerFactory(resourceName, customreducer) {

    var REQUEST = 'REQUEST_' + resourceName.toUpperCase();
    var RECEIVE = 'RECEIVE_' + resourceName.toUpperCase();
    var DELETE = 'DELETE_' + resourceName.toUpperCase();
    var ERROR = 'ERROR_' + resourceName.toUpperCase();
    var CLEAN = 'CLEAN_' + resourceName.toUpperCase();
    var _UPDATE = '_UPDATE_' + resourceName.toUpperCase();
    var _DELETE = '_DELETE_' + resourceName.toUpperCase();

    var methods = {};
    //query 数据放在list里
    methods[RECEIVE] = function (state, action) {
        return (0, _extends3.default)({}, state, { isLoading: false }, action.payload, { error: false });
    };
    methods[_DELETE] = function (state, action) {
        var data = action.payload;
        var _list = state.list;
        if (data && _list) {
            if (Object.prototype.toString.call(_list) === '[object Array]') {
                for (var i = 0; i < _list.length; i++) {
                    var item = _list[i];
                    if (item.id !== null && item !== undefined && data.id !== null && data.id !== undefined) {
                        if (item.id === data.id) {
                            _list.splice(0, 1);
                            break;
                        }
                    } else {
                        if (item == data) {
                            _list.splice(i, 1);
                            break;
                        }
                    }
                }
            } else if (Object.prototype.toString.call(_list) === '[object Object]') {
                if (_list.content && Object.prototype.toString.call(_list.content) === '[object Array]') {
                    var contentList = _list.content;
                    for (var i = 0; i < contentList.length; i++) {
                        var item = contentList[i];
                        if (item.id !== null && item !== undefined && data.id !== null && data.id !== undefined) {
                            if (item.id === data.id) {
                                contentList.splice(0, 1);
                                break;
                            }
                        } else {
                            if (item == data) {
                                contentList.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            }
        }
        return (0, _extends3.default)({}, state, { list: _list, isLoading: false, error: false });
    };
    methods[_UPDATE] = function (state, action) {
        var isCreate = true;
        var data = action.payload.data;
        var _list = state.list;

        if (data && _list) {
            if (Object.prototype.toString.call(_list) === '[object Array]') {
                for (var i = 0; i < _list.length; i++) {
                    var item = _list[i];
                    if (item.id !== null && item !== undefined && data.id !== null && data.id !== undefined) {
                        if (item.id === data.id) {
                            _list[i] = data;
                            isCreate = false;
                            // _list.splice(0, 1);
                            break;
                        }
                    } else {
                        if (item == data) {
                            _list[i] = data;
                            isCreate = false;
                            // _list.splice(i, 1);
                            break;
                        }
                    }
                }
                if (isCreate === true) {
                    _list.unshift(data);
                }
            } else if (Object.prototype.toString.call(_list) === '[object Object]') {
                if (_list.content && Object.prototype.toString.call(_list.content) === '[object Array]') {
                    var contentList = _list.content;
                    for (var i = 0; i < contentList.length; i++) {
                        var item = contentList[i];
                        if (item.id !== null && item !== undefined && data.id !== null && data.id !== undefined) {
                            if (item.id === data.id) {
                                // contentList.splice(0, 1);
                                _list[i] = data;
                                isCreate = false;
                                break;
                            }
                        } else {
                            if (item == data) {
                                _list[i] = data;
                                isCreate = false;
                                // contentList.splice(i, 1);
                                break;
                            }
                        }
                    }
                    if (isCreate === true) {
                        _list.content.unshift(data);
                    }
                }
            }
        }
        // else if (data && !_list) {
        //
        //
        // }
        return (0, _extends3.default)({}, state, { list: _list, isLoading: false, error: false });
    };

    methods[DELETE] = function (state, action) {
        var data = (0, _extends3.default)({}, state, { isLoading: false, error: false });
        // //如果对象在key中，删除对象,需测试
        // if (action.payload.key) {
        //     delete data[action.payload.key]
        // }
        // //如果对象在list中，从list中删除对象,需测试
        // if (data.list && data.list instanceof Array) {
        //     data.list = data.list.filter(function (obj) {
        //         var b = true;
        //         for (var i in action.payload.params) {
        //             b = b && (obj[i] == action.payload.params[i]);
        //         }
        //         return !b
        //     });
        // }
        return data;
    };

    methods[REQUEST] = function (state, action) {
        return (0, _assign2.default)({}, state, { isLoading: true, error: false });
    };
    methods[ERROR] = function (state, action) {
        return (0, _assign2.default)({}, state, { isLoading: true, error: action.payload.err });
    };
    methods[CLEAN] = function (params, data) {
        return { isLoading: false, list: null, error: false };
    };
    methods = (0, _extends3.default)({}, methods, customreducer);
    return (0, _reduxActions.handleActions)(methods, {
        isLoading: false, list: null, error: false
    });
}

function serializeForm(form) {
    //form表单取值
    if (!form || form.nodeName !== "FORM") {
        return;
    }
    var i,
        j,
        q = {};
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'text':
                    case 'hidden':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                        q[form.elements[i].name] = form.elements[i].value;
                        break;
                    case 'checkbox':
                    case 'radio':
                        if (form.elements[i].checked) {
                            q[form.elements[i].name] = form.elements[i].value;
                        }
                        break;
                }
                break;
            case 'file':
                break;
            case 'TEXTAREA':
                q[form.elements[i].name] = form.elements[i].value;
                break;
            case 'SELECT':
                switch (form.elements[i].type) {
                    case 'select-one':
                        q[form.elements[i].name] = form.elements[i].value;
                        break;
                    case 'select-multiple':
                        for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                            if (form.elements[i].options[j].selected) {
                                q[form.elements[i].name] = form.elements[i].options[j].value;
                            }
                        }
                        break;
                }
                break;
            case 'BUTTON':
                switch (form.elements[i].type) {
                    case 'reset':
                    case 'submit':
                    case 'button':
                        q[form.elements[i].name] = form.elements[i].value;
                        break;
                }
                break;
        }
    }
    return q;
}

/**
 * 数据双向绑定
 * 例子: containers/TwoWayBindTest
 * two way bind data
 */
function createHandler(component, key, path) {
    return function (e) {
        var el = e.target;
        var value = el.type === 'checkbox' ? el.checked : el.value;
        component.setState((0, _defineProperty3.default)({}, key, path ? component.state[key].setIn(path, value) : value));
    };
}

function _linkState(component, key, path) {
    var cache = component.__linkStateHandlers || (component.__linkStateHandlers = {});
    var cacheKey = path ? key + ':' + path.toString() : key;

    return cache[cacheKey] || (cache[cacheKey] = createHandler(component, key, path));
}

function linkStateE(context, key) {
    return function (_path) {

        var path = [];
        if (isArray(_path)) {
            path = _path;
        } else {
            path.push(_path);
        }
        if (key) {
            return _linkState(context, key, path);
        } else {
            return _linkState(context, _path);
        }
    };
}

function linkStateV(context, key) {
    return function (_path) {
        var path = [];
        if (isArray(_path)) {
            path = _path;
        } else {
            path.push(_path);
        }
        if (key) {
            return context.state[key] ? context.state[key].getIn(path) : undefined;
        } else {
            return context.state[_path] ? context.state[_path] : undefined;
        }
    };
}

function linkState(context, key) {
    return { get: linkStateV(context, key), set: linkStateE(context, key) };
}

function isEqual(a, b) {
    var aProps = (0, _getOwnPropertyNames2.default)(a);
    var bProps = (0, _getOwnPropertyNames2.default)(b);
    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}
//时间转型
function getTime(time) {
    var date = new Date(time);
    var fmt = "yyyy-MM-dd";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var date = date.getDate();
    fmt = fmt.replace("yyyy", year);
    fmt = fmt.replace("MM", fix(month));
    fmt = fmt.replace("dd", fix(date));
    return fmt;
    function fix(n) {
        return n < 10 ? "0" + n : n;
    }
}
// 回到顶部
function scrollTop() {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
}

/**
 * 检测Object类型
 * @param obj
 * @returns {boolean}
 */
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
/**
 * 检测Array类型
 * @param arr
 * @returns {boolean}
 */
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
//# sourceMappingURL=index.js.map
