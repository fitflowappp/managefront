"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

exports.fetch = fetch;
exports.apiFactory = apiFactory;
exports.upload = upload;
exports.postAPI = postAPI;
exports.getAPI = getAPI;
exports.putAPI = putAPI;
exports.deleteAPI = deleteAPI;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _config = require("../config");

var _auth = require("../common/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetch() {
    var headers = {
        'Content-Type': 'application/json'
    };
    var auth_token = (0, _auth.getMToken)();
    if (auth_token) {
        headers['Authorization'] = auth_token;
    }
    var conf = {
        baseURL: "http://localhost:" + _config.port + "/",
        timeout: 60000,
        headers: headers
    };
    if (process.env.BROWSER) {
        delete conf["baseURL"];
    }
    return _axios2.default.create(conf);
} /**
   * Created by john on 2016/5/19.
   */


function handleError(dispatch, error) {
    if (process.env.BROWSER) {
        if (error.status == 404) {} else if (error.status == 401) {
            dispatch((0, _auth.logout)());
            // dispatch(dispatch => {
            //     dispatch({type: "LOGOUT"});
            //     // cookie.remove("mtoken");
            //     cookie.remove("muser",{"path": '/'});
            //     browserHistory.push('/login');
            // });
        }
    } else {
        throw error.status;
    }
}

function fetchSetAfterMethod(promise) {
    promise.after = function (success, error) {
        if (!error) {
            this.then(function (response) {
                success(response.data, response.status, response.headers);
            });
        } else {
            this.then(function (response) {
                var status = response.status;
                if (status >= 200 && status < 300 || status === 304) {
                    if (success) success(response.data, response.status, response.headers);
                } else {
                    if (error) error(response.data, response.status, response.headers);
                }
            });
        }
        return promise;
    };
    return promise;
}

function apiFactory(method, successCB, errorCB) {
    var actions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var _url = arguments[4];
    var _params = arguments[5];
    var keys = arguments[6];

    var params = (0, _assign2.default)({}, _params);
    var url = _url;
    var match1 = url.match(/\/\:[a-zA-Z]+/g);
    if (match1 && _params) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(match1), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                var key = i.replace("/:", "");
                if (params[key]) {
                    url = url.replace(i, "/" + params[key]);
                    delete params[key];
                }
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

    var match2 = url.match(/\/\:[a-zA-Z]+/g);

    if (match2) {
        for (var _i in match2) {
            url = url.replace(match2[_i], "");
        }
    }
    // if (params) {
    //     for (let i in params) {
    //         url = url.replace("/:" + i, "/" + params[i]);
    //     }
    // }
    //
    // var _p = url.match(/\/\:[a-zA-Z]+/g);
    // if (_p) {
    //     for (let i in _p) {
    //         url = url.replace(_p[i], "");
    //     }
    // }

    keys && (keys = keys.map(function (key) {
        return params[key];
    }));

    var request_action;
    var receive_action;
    var error_action;
    actions[0] && (receive_action = actions[0]);
    actions[1] && (request_action = actions[1]);
    actions[2] && (error_action = actions[2]);
    return function (dispatch) {
        if (request_action) dispatch(request_action());

        if (method === "get") {
            var promise = fetch().get(url, { params: (0, _extends3.default)({}, params, { _: new Date().getTime() }) }).then(function (response) {
                dispatch(receive_action(response.data, keys));
                var status = response.status;
                if (status >= 200 && status < 300 || status === 304) {
                    if (successCB) successCB(response.data, response.status, response.headers);
                } else {
                    if (errorCB) errorCB(response.data, response.status, response.headers);
                }
                return response;
            }).catch(function (err) {
                handleError(dispatch, err);
                if (error_action) {
                    dispatch(error_action(err, keys));
                }
                if (errorCB) errorCB(err.data, err.status, err.headers);
                return err;
            });
            // fetchSetAfterMethod(promise);


            return promise;
        } else {
            var _promise = fetch()[method](url, params).then(function (response) {
                if (method === "delete") {
                    dispatch(receive_action(response.data, params, keys));
                } else {
                    dispatch(receive_action(response.data, keys));
                }

                var status = response.status;
                if (status >= 200 && status < 300 || status === 304) {
                    if (successCB) successCB(response.data, response.status, response.headers);
                } else {
                    if (errorCB) errorCB(response.data, response.status, response.headers);
                }
                return response;
            }).catch(function (err) {
                handleError(dispatch, err);
                if (error_action) {
                    dispatch(error_action(err, keys));
                }
                if (errorCB) errorCB(err.data, err.status, err.headers);
                return err;
            });
            // fetchSetAfterMethod(promise);


            return _promise;
        }
    };
}

/**
 * 文件上传接口
 * @param fileId
 * @param e
 * @returns {*|axios.Promise}
 * uploadFile(e){
 *      upload(e).then(function (res) {
 *
 *      }).catch(function (error) {
 *
 *      })
 * }
 * <FormControl type="file" id="headerImg" onChange={this.uploadFile.bind(this)}/>
 */
function upload(e, progressCb) {
    var data = new FormData();
    var file = e.target;
    for (var i = 0; i < file.files.length; i++) {
        data.append('file', file.files[i]);
    }
    var config = {
        progress: function progress(progressEvent) {
            var percentCompleted = progressEvent.loaded / progressEvent.total;
            if (progressCb) {
                progressCb(percentCompleted);
            }
        }
    };

    var promise = fetchSetAfterMethod(fetch().post('/api/manage/upload', data, config).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    }));
    // promise.after = function (success, error) {
    //     if (!error) {
    //         this.then(function (response) {
    //             success(response.data, response.status, response.headers);
    //         });
    //     } else {
    //         this.then(function (response) {
    //             let status = response.status;
    //             if (status >= 200 && status < 300 || status === 304) {
    //                 if (success)
    //                     success(response.data, response.status, response.headers);
    //             } else {
    //                 if (error)
    //                     error(response.data, response.status, response.headers);
    //             }
    //         });
    //     }
    //     return promise;
    // };

    return promise;
}

function postAPI(success, error) {
    var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var url = arguments[3];
    var params = arguments[4];
    var keys = arguments[5];

    return apiFactory("post", success, error, actions, url, params, keys);
}

function getAPI(success, error) {
    var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var url = arguments[3];
    var params = arguments[4];
    var keys = arguments[5];

    return apiFactory("get", success, error, actions, url, params, keys);
}
function putAPI(success, error) {
    var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var url = arguments[3];
    var params = arguments[4];
    var keys = arguments[5];

    return apiFactory("put", success, error, actions, url, params, keys);
}
function deleteAPI(success, error) {
    var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var url = arguments[3];
    var params = arguments[4];
    var keys = arguments[5];

    return apiFactory("delete", success, error, actions, url, params, keys);
}
//# sourceMappingURL=fetch.js.map
