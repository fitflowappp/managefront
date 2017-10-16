/**
 * Created by john on 2016/5/16.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {withRouter, browserHistory, Link} from "react-router";
import {getMuser, logout} from "../common/auth";
import cookie from 'react-cookie'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathname: props.location.pathname,
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        var pathname = nextProps.location.pathname;
        if (this.state.pathname != pathname) {
            this.setState({
                pathname: pathname
            })
        }
    }

    //退出登录
    logout() {
        cookie.remove("muser");
        browserHistory.push('/');
    }

    render() {
        const user = getMuser();
        const pathname=this.props.routes[1].name;
        return (
           <div>
               {user&&<div className="wrapper fixed">
                   <header className="main-header">
                       <a href="/" className="logo">
                           <span className="logo-mini">yoga</span>
                           <span className="logo-lg"><b>yoga</b>manage</span>
                       </a>
                       <nav className="navbar navbar-static-top" role="navigation">
                           <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button"></a>
                           <div className="navbar-custom-menu">
                               <ul className="nav navbar-nav">
                                   <li><img src={user.headerImg ? user.headerImg.contentUri : '/dist/images/user.jpg'}
                                            alt="头像" width={30} className="img-circle m-t10"/></li>
                                   <li><a href="/">{user ? user.name : "无"}</a></li>
                                   <li><a href="#" onClick={this.props.logout}>退出</a></li>
                               </ul>
                           </div>
                       </nav>
                   </header>
                   <aside className="main-sidebar">
                       <section className="sidebar">
                           <ul className="sidebar-menu tree" data-widget="tree">
                               <li className={pathname=='dashboard'?"active":""}>
                                   <Link to="/dashboard">
                                       <span>dashboard</span>
                                   </Link>
                               </li>
                               <li className={(pathname=='routines'||pathname=='routinesedit')?"active":""}>
                                   <Link to="/routines">
                                       <span>routines</span>
                                   </Link>
                               </li>
                               <li className={pathname=='workouts'?"active":""}>
                                   <Link to="/workouts">
                                       <span>workouts</span>
                                   </Link>
                               </li>
                               <li className={pathname=='challenges'?"active":""}>
                                   <Link to="/challenges">
                                       <span>challenges</span>
                                   </Link>
                               </li>
                               <li className={pathname=='users'?"active":""}>
                                   <Link to="/users">
                                       <span>users</span>
                                   </Link>
                               </li>
                               <li className={pathname=='milestones'?"active":""}>
                                   <Link to="/milestones">
                                       <span>milestones</span>
                                   </Link>
                               </li>
                           </ul>
                       </section>
                   </aside>
                   <div className="content-wrapper">
                       {this.props.children}
                   </div>
                   <footer className="main-footer">
                       <div className="pull-right hidden-xs"><b>Version</b> 1.0.0</div>
                       <strong>Copyright © 2017 <a href="/">yoga manage</a>.</strong>
                   </footer>
               </div>}
               {!user&&
               this.props.children
               }
           </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        app: state.app
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators({logout}, dispatch)
}
//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))

