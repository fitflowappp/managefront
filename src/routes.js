/**
 * Created by john on 2016/5/17.
 */
import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import App from './containers/App'
import Login from './containers/Login'
import Account from "./containers/Account";
import Networkinfo from "./containers/Networkinfo"
import {getMuser} from "./common/auth"
function requireAuth(nextState, replace) {
    if (!getMuser()) {
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}
function logined(nextState, replace) {
    if (getMuser()) {
        replace({
            pathname: '/account',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}

// route 规则：
// - `/list` 显示 `List` 组件
// - `/item/:id` 显示 `Item` 组件
// 地址用小写
const routes = (
    <Route path="/" component={App}>
        <IndexRedirect to="login"/>
        <Route path="login" component={Login} name="登录" onEnter={logined}/>
        <Route path="account" component={Account} name="账号管理" onEnter={requireAuth}/>
        <Route path="networkinfo" onEnter={requireAuth}>
            <Route path="list" component={Networkinfo}/>
        </Route>
    </Route>
);
export default routes;
// export default routeLists;