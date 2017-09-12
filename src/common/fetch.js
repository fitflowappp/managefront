/**
 * Created by john on 2016/5/19.
 */
import axios from 'axios';
import {port} from "../config"
import {getMToken, logout} from "../common/auth";

export function fetch() {
    var headers = {
        'Content-Type': 'application/json'
    };
    var auth_token = getMToken();
    if (auth_token) {
        headers['Authorization'] = auth_token;
    }
    var conf = {
        baseURL: "http://localhost:" + port + "/",
        timeout: 60000,
        headers
    };
    if (process.env.BROWSER) {
        delete conf["baseURL"];
    }
    return axios.create(
        conf
    );
}

function handleError(dispatch, error) {
    if (process.env.BROWSER) {
        if (error.status == 404) {
        } else if (error.status == 401) {
            dispatch(logout());
            // dispatch(dispatch => {
            //     dispatch({type: "LOGOUT"});
            //     // cookie.remove("mtoken");
            //     cookie.remove("muser",{"path": '/'});
            //     browserHistory.push('/login');
            // });
        }
    } else {
        throw error.status
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
                let status = response.status;
                if (status >= 200 && status < 300 || status === 304) {
                    if (success)
                        success(response.data, response.status, response.headers);
                } else {
                    if (error)
                        error(response.data, response.status, response.headers);
                }
            });
        }
        return promise;
    };
    return promise;
}

export function apiFactory(method, successCB, errorCB, actions = [], _url, _params, keys) {
    var params = Object.assign({},_params);
    var url =  _url;
    var match1 = url.match(/\/\:[a-zA-Z]+/g);
    if (match1 && _params) {
        for (let i of match1) {
            let key = i.replace("/:", "");
            if (params[key]) {
                url = url.replace(i, "/" + params[key]);
                delete params[key];
            }
        }
    }

    var match2 = url.match(/\/\:[a-zA-Z]+/g);

    if (match2) {
        for (let i in match2) {
            url = url.replace(match2[i], "");
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

    keys && (keys = keys.map(key => params[key]));

    var request_action;
    var receive_action;
    var error_action;
    actions[0] && (receive_action = actions[0]);
    actions[1] && (request_action = actions[1]);
    actions[2] && (error_action = actions[2]);
    return dispatch => {
        if (request_action)
            dispatch(request_action());


        if (method === "get") {
            const promise = fetch().get(url, {params: {...params, _: new Date().getTime()}})
                .then(function (response) {
                    dispatch(receive_action(response.data, keys));
                    let status = response.status;
                    if (status >= 200 && status < 300 || status === 304) {
                        if (successCB)
                            successCB(response.data, response.status, response.headers);
                    } else {
                        if (errorCB)
                            errorCB(response.data, response.status, response.headers);
                    }
                    return response;

                })
                .catch(function (err) {
                    handleError(dispatch, err);
                    if (error_action) {
                        dispatch(error_action(err, keys));
                    }
                    if (errorCB)
                        errorCB(err.data, err.status, err.headers);
                    return err;
                });
            // fetchSetAfterMethod(promise);


            return promise
        } else {
            const promise = fetch()[method](url, params)
                .then(function (response) {
                    if (method === "delete") {
                        dispatch(receive_action(response.data, params, keys));
                    } else {
                        dispatch(receive_action(response.data, keys));
                    }

                    let status = response.status;
                    if (status >= 200 && status < 300 || status === 304) {
                        if (successCB)
                            successCB(response.data, response.status, response.headers);
                    } else {
                        if (errorCB)
                            errorCB(response.data, response.status, response.headers);
                    }
                    return response;
                })
                .catch(function (err) {
                    handleError(dispatch, err);
                    if (error_action) {
                        dispatch(error_action(err, keys));
                    }
                    if (errorCB)
                        errorCB(err.data, err.status, err.headers);
                    return err;

                });
            // fetchSetAfterMethod(promise);


            return promise;
        }

    }
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
export function upload(e, progressCb) {
    const data = new FormData();
    const file = e.target;
    for (var i = 0; i < file.files.length; i++) {
        data.append('file', file.files[i]);
    }
    const config = {
        progress: function (progressEvent) {
            var percentCompleted = progressEvent.loaded / progressEvent.total;
            if(progressCb){
                progressCb(percentCompleted);
            }
        },
    };

    var promise = fetchSetAfterMethod(
        fetch().post('/api/upload', data, config)
            .then(function (response) {
                return response;
            }).catch(function (response) {
            return response;
        })
    );
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

export function postAPI(success,error,actions = [], url, params, keys) {
    return apiFactory("post",success,error, actions, url, params, keys);
}

export function getAPI(success,error,actions = [], url, params, keys) {
    return apiFactory("get",success,error, actions, url, params,keys);
}
export function putAPI(success,error,actions = [], url, params,  keys) {
    return apiFactory("put",success,error, actions, url, params, keys);
}
export function deleteAPI(success,error,actions = [], url, params, keys) {
    return apiFactory("delete",success,error, actions, url, params, keys);
}
