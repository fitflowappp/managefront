/**
 * Created by john on 2016/5/17.
 */
import React from 'react';
import {Route, IndexRedirect} from 'react-router';
import App from './containers/App'
import Login from './containers/Login'
import Register from './containers/Register'
import Account from "./containers/Account";
import Dashboard from "./containers/Dashboard";
import Routines from "./containers/Routines";
import RoutinesEdit from "./containers/RoutinesEdit";
import Workouts from "./containers/Workouts";
import WorkoutsEdit from "./containers/WorkoutsEdit";
import Challenges from "./containers/Challenges";
import ChallengesEdit from "./containers/ChallengesEdit";
import ChallengesOrders from "./containers/ChallengesOrders";
import ChallengesOrdersEdit from "./containers/ChallengesOrdersEdit";
import Users from "./containers/Users";
import UserDetails from "./containers/UserDetails";
import Milestones from "./containers/Milestones";
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
            pathname: '/dashboard',
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
        <Route path="register" component={Register} name="Register"/>
        <Route path="account" component={Account} name="账号管理" onEnter={requireAuth}/>
        <Route path="dashboard" component={Dashboard} name="dashboard" onEnter={requireAuth}/>
        <Route path="routines" component={Routines} name="routines" onEnter={requireAuth}/>
        <Route path="routinesedit/:id" component={RoutinesEdit} name="routines" onEnter={requireAuth}/>
        <Route path="workouts" component={Workouts} name="workouts" onEnter={requireAuth}/>
        <Route path="workoutsedit/:id" component={WorkoutsEdit} name="workouts" onEnter={requireAuth}/>
        <Route path="challenges" component={Challenges} name="challenges" onEnter={requireAuth}/>
        <Route path="challengesedit/:id" component={ChallengesEdit} name="challenges" onEnter={requireAuth}/>
        <Route path="challengesorders" component={ChallengesOrders} name="challenges" onEnter={requireAuth}/>
        <Route path="challengesordersedit/:id" component={ChallengesOrdersEdit} name="challenges" onEnter={requireAuth}/>
        <Route path="yogausers" component={Users} name="users" onEnter={requireAuth}/>
        <Route path="yogausers/userdetails/:id" component={UserDetails} name="users" onEnter={requireAuth}/>
        <Route path="milestones" component={Milestones} name="milestones" onEnter={requireAuth}/>

    </Route>
);
export default routes;
