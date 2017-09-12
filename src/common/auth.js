/**
 * Created by john on 2016/6/8.
 */
import cookie from 'react-cookie'
import {browserHistory} from 'react-router';
export function getMuser() {
    return cookie.load("muser")
}
var auth_token;
export function getMToken() {
    if(!auth_token){
        auth_token = getMuser() ? getMuser().sessionId : null;
    }
    return auth_token;
}
export function logout() {
    return dispatch => {
        dispatch({type: "LOGOUT"});
        cookie.remove("muser",{"path": '/'});
        auth_token = null;
        browserHistory.push('/');
    }
}