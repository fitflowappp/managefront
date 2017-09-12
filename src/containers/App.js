/**
 * Created by john on 2016/5/16.
 */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {Navbar,Nav, NavItem,NavDropdown,MenuItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {withRouter,browserHistory} from "react-router";
import {getMuser,logout} from "../common/auth";
import cookie from 'react-cookie'
class App extends Component {
    constructor(props){
        super(props);
        this.nav = {
            "/account": {name: "账号管理"},
            "/networkinfo":{
                name: "人脉管理",
                item: {
                    "/networkinfo/list": {name: "人脉列表"},
                }
            }
        };
        this.state={
            pathname:props.location.pathname,
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        var pathname = nextProps.location.pathname;
        if (this.state.pathname != pathname) {
            this.setState({
                pathname:pathname
            })
        }
    }
    getdropdown(lists){//遍历下拉菜单选项
        var items=[];
        for (const i in lists) {
            items.push(
                <LinkContainer key={i} to={{ pathname: i}}>
                    <NavItem>{lists[i].name}</NavItem>
                </LinkContainer>
            );
        }
        return items;
    }
    
    getNavItem(){
        var rows = [];
        for (const i in this.nav) {
            if(this.nav[i].item){
                rows.push(
                    <NavDropdown  className={this.state.pathname.startsWith(i)?"active":null} key={i} title={this.nav[i].name} id="checkDropdown">
                        {this.getdropdown(this.nav[i].item)}
                    </NavDropdown>
                );
            }
            else{
            rows.push(
                <LinkContainer key={i} to={{ pathname: i }}>
                    <NavItem>{this.nav[i].name}</NavItem>
                </LinkContainer>
            );
            }
        }
        return rows;
    }
    //退出登录
     logout(){ 
         cookie.remove("muser");
         browserHistory.push('/');
     }
    render() {
        const user=getMuser();
        return (
            <div>
                <Navbar className={{'hide':!user,'nav-theme':true}} >
                    <Navbar.Header>
                        <Navbar.Brand className="font-25">
                            后台
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav bsStyle="pills" >
                        {this.getNavItem()}
                    </Nav>
                    {user&&
                    <div className="pull-right">
                        <img src={user.headerImg?user.headerImg.contentUri:'/dist/images/user.jpg'} alt="头像" className="pull-left m-t10 radius-5" width="30"/>
                        <Nav>
                            <NavDropdown eventKey="0" title={user?user.name:"无"} id="admin">
                                <MenuItem onClick={this.props.logout}>退出</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </div>}
                </Navbar>

                <div className="container m-t80">
                    {this.props.children}
                </div>
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

