/**
 * Created by john on 2016/5/19.
 */
import React, {Component, PropTypes} from 'react'
import {apiFactory, getAPI, postAPI, putAPI, deleteAPI} from '../common/fetch';
import {createAction, handleActions} from 'redux-actions';
//get put post delete
export function actionFactory(resourceName, url, key, customMethod) {
    const REQUEST = `REQUEST_${resourceName.toUpperCase()}`;
    const RECEIVE = `RECEIVE_${resourceName.toUpperCase()}`;
    const DELETE = `DELETE_${resourceName.toUpperCase()}`;
    const ERROR = `ERROR_${resourceName.toUpperCase()}`;
    const CLEAN = `CLEAN_${resourceName.toUpperCase()}`;
    const _UPDATE = `_UPDATE_${resourceName.toUpperCase()}`;
    const _DELETE = `_DELETE_${resourceName.toUpperCase()}`;
    var action_request = createAction(REQUEST);

    var action_query = createAction(RECEIVE, function (data, keys) {
        return {list: data}
    });
    var action_receive = createAction(RECEIVE, function (data, keys) {
        const _key = keys.join("-");
        var d = {};
        if (_key) {
            d[_key] = data;
        } else {
            d["data"] = data;
        }
        return d
    });


    var action_delete = createAction(DELETE, function (data, params, keys) {
        return {key: keys.join("-"), params, data};
    });
    var action_error = createAction(ERROR, function (err) {
        return {err};
    });


    var methods = {};
    methods["query" + resourceName] = function (params, successcb, errorcb) {
        return getAPI(successcb, errorcb, [action_query, action_request, action_error], url, params, key)
    };
    methods["get" + resourceName] = function (params, successcb, errorcb) {
        return getAPI(successcb, errorcb, [action_receive, action_request, action_error], url, params, key)
    };
    methods["post" + resourceName] = function (params, successcb, errorcb) {
        return postAPI(successcb, errorcb, [action_receive, action_request, action_error], url, params, key)
    };
    methods["put" + resourceName] = function (params, successcb, errorcb) {
        return putAPI(successcb, errorcb, [action_receive, action_request, action_error], url, params, key)
    };
    methods["delete" + resourceName] = function (params, successcb, errorcb) {
        return deleteAPI(successcb, errorcb, [action_delete, action_request, action_error], url, params, key)
    };
    methods["clean" + resourceName] = function (params, data) {
        return dispatch => {
            dispatch({type: CLEAN});
        }
    };

    methods["_update" + resourceName] = function (...p) {
        return dispatch => {
            dispatch(
                createAction(_UPDATE, function (data) {
                    return data
                })(...p))
        }
    };
    methods["_delete" + resourceName] = function (...p) {
        return dispatch => {
            dispatch(
                createAction(_DELETE, function (data) {
                    return data
                })(...p))
        }
    };


    // {name,type,url,paramName}
    if (customMethod) {
        // if (customMethod instanceof Function) {
        //     methods = {...methods, ...customMethod(action_receive, action_request, action_error, key)};
        // } else
        if (Object.prototype.toString.call(customMethod) === '[object Array]') {
            methods = {...methods};
            // customMethod
            for (const m of customMethod) {
                if (m.length >= 3) {
                    const new_action_receive = createAction(RECEIVE, function (data, keys) {
                        var result = {};
                        if (m.length == 3) {
                            result[m[0]] = data;
                        } else {
                            result[m[3]] = data;
                        }
                        return result;
                    });
                    methods[m[0]] = function (params, successcb, errorcb) {
                        return apiFactory(m[1], successcb, errorcb, [new_action_receive, action_request, action_receive], m[2], params, key)
                    }
                } else if (m.length == 2) {
                    methods[m[0]] = function (...p) {
                        return dispatch => {
                            dispatch(m[1](...p))
                        }
                    }
                }
            }

        }

    }
    return methods
}
export function reducerFactory(resourceName, customreducer) {

    const REQUEST = `REQUEST_${resourceName.toUpperCase()}`;
    const RECEIVE = `RECEIVE_${resourceName.toUpperCase()}`;
    const DELETE = `DELETE_${resourceName.toUpperCase()}`;
    const ERROR = `ERROR_${resourceName.toUpperCase()}`;
    const CLEAN = `CLEAN_${resourceName.toUpperCase()}`;
    const _UPDATE = `_UPDATE_${resourceName.toUpperCase()}`;
    const _DELETE = `_DELETE_${resourceName.toUpperCase()}`;

    var methods = {};
    //query 数据放在list里
    methods[RECEIVE] = function (state, action) {
        return ({...state, isLoading: false, ...action.payload, error: false})
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
                            break
                        }
                    } else {
                        if (item == data) {
                            _list.splice(i, 1);
                            break
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
                                break
                            }
                        } else {
                            if (item == data) {
                                contentList.splice(i, 1);
                                break
                            }
                        }
                    }
                }

            }
        }
        return ({...state, list: _list, isLoading: false, error: false})
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
                            break
                        }
                    } else {
                        if (item == data) {
                            _list[i] = data;
                            isCreate = false;
                            // _list.splice(i, 1);
                            break
                        }
                    }
                }
                if (isCreate === true) {
                    _list.unshift(data)
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
                                break
                            }
                        } else {
                            if (item == data) {
                                _list[i] = data;
                                isCreate = false;
                                // contentList.splice(i, 1);
                                break
                            }
                        }
                    }
                    if (isCreate === true) {
                        _list.content.unshift(data)
                    }
                }
            }
        }
        // else if (data && !_list) {
        //
        //
        // }
        return ({...state, list: _list, isLoading: false, error: false})
    };

    methods[DELETE] = function (state, action) {
        var data = {...state, isLoading: false, error: false};
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
        return data
    };

    methods[REQUEST] = function (state, action) {
        return Object.assign({}, state, {isLoading: true, error: false})
    };
    methods[ERROR] = function (state, action) {
        return Object.assign({}, state, {isLoading: true, error: action.payload.err})
    };
    methods[CLEAN] = function (params, data) {
        return {isLoading: false, list: null, error: false}
    };
    methods = {...methods, ...customreducer};
    return handleActions(methods,
        {
            isLoading: false, list: null, error: false
        });
}

export function serializeForm(form) {//form表单取值
    if (!form || form.nodeName !== "FORM") {
        return;
    }
    var i, j, q = {};
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
    return q
}

/**
 * 数据双向绑定
 * 例子: containers/TwoWayBindTest
 * two way bind data
 */
function createHandler(component, key, path) {
    return (e) => {
        const el = e.target;
        const value = el.type === 'checkbox' ? el.checked : el.value;
        component.setState({
            [key]: path ? component.state[key].setIn(path, value) : value,
        });
    };
}

function _linkState(component, key, path) {
    const cache = component.__linkStateHandlers ||
        (component.__linkStateHandlers = {});
    const cacheKey = path ? `${key}:${path.toString()}` : key;

    return cache[cacheKey] ||
        (cache[cacheKey] = createHandler(component, key, path));
}

function linkStateE(context,key){
    return function (_path) {

        var path = [];
        if(isArray(_path)){
            path = _path;
        }else {
            path.push(_path);
        }
        if(key){
            return _linkState(context,key, path)
        }else {
            return _linkState(context, _path)
        }
    };
}

function linkStateV(context,key) {
    return function (_path) {
        var path = [];
        if(isArray(_path)){
            path = _path;
        }else {
            path.push(_path);
        }
        if(key){
            return context.state[key] ? context.state[key].getIn(path):undefined;
        }else {
            return context.state[_path] ? context.state[_path]:undefined;
        }
    };
}

export function linkState(context,key) {
    return{get:linkStateV(context,key),set:linkStateE(context,key)}
}




export function isEqual(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
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
export function getTime(time) {
    if (!time) {
        return ' ';
    }
    var myDate = new Date(time);
    var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    if (month < 10)
        month = '0' + month.toString();
    var date = myDate.getDate();
    if (date < 10)
        date = '0' + date.toString();//获取当前日(1-31)
    var hour = myDate.getHours();       //获取当前小时数(0-23)
    if (hour < 10)
        hour = '0' + hour.toString();//获取当前日(1-31)
    var minute = myDate.getMinutes();     //获取当前分钟数(0-59)
    if (minute < 10)
        minute = '0' + minute.toString();//获取当前日(1-31)

    var strTime;
        strTime=year + '-' + month + '-' + date + ' ' + hour + ':' + minute


    return strTime;
}
// 回到顶部
export function scrollTop() {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
}

/**
 * 检测Object类型
 * @param obj
 * @returns {boolean}
 */
export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}
/**
 * 检测Array类型
 * @param arr
 * @returns {boolean}
 */
export function isArray(arr){
    return Object.prototype.toString.call(arr) === '[object Array]';
}