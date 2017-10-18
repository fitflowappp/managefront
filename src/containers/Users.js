/**
 * Created by qwr on 2017/10/11.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from "react-router";
import {Col, Pagination} from "react-bootstrap"
import {upload} from '../common/fetch'
import {getTime} from '../common'
import {usersActions} from '../actions'
import Alert from '../components/Alert';
class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            condition: {
                number:0,
                size:20,
            },
        };
    }

    componentDidMount() {
        var condition = this.props.location.query;
        if (!condition.number) {
            condition = this.state.condition;
        } else {
            this.setState({
                condition: condition,
            })
        }
        this.query(condition);
    }

    query(condition) {
        const {queryUsers} = this.props;
        queryUsers(condition);
    }

    setCondition(eventKey) {
        var condition = this.state.condition;
        condition.number = eventKey-1;
        this.setState(condition);
        this.query(condition);
        this.props.router.replace({pathname: this.props.location.pathname, query: condition});
    }
    super(user){
        const {putSuper,deleteSuper}=this.props;
        const that=this;
        const condition = that.state.condition;
        if(user.role==0){
            deleteSuper({uid:user.id},function (res) {
                that.query(condition)
            })
        }else{
            putSuper({uid:user.id},function (res) {
                that.query(condition)
            })
        }
    }
    render() {
        const users = this.props.users.list;
        const condition=this.state.condition;
        return (
            <div>
                <Helmet title="Users"/>
                {users&&<div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Users</h3>
                        <div className="box-tools">
                            <button type="button" className="btn btn-success pull-right m-5">
                                <i className="fa fa-download"></i>Export csv
                            </button>
                        </div>
                    </div>
                    <div className="box-body table-responsive">
                        <table className="table table-bordered table-hover">
                            <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Facebook ID</th>
                                <th>Email Address</th>
                                <th>Timestamp of App First Opened</th>
                                <th>Registered?</th>
                                <th>Timestamp of Facebook Registration submitted</th>
                                <th>Timestamp of Registration Completed</th>
                                <th>Current challenge ID</th>
                                <th>Number of completed challenges</th>
                                <th>Cumulative duration of videos watched</th>
                                <th>Number of completed Workouts</th>
                                <th>Scheduling in-app notification on?</th>
                                <th>Scheduling calendar reminder on?</th>
                                <th>Cumulative number of social shares</th>
                                <th></th>
                            </tr>
                             {users.content.map((user, index) =>
                             <tr key={index}>
                             <td><Link to={"/yusers/userdetails/"+user.user.id}>{user.user.id}</Link></td>
                             <td>{user.facebookUid}</td>
                             <td>{user.email}</td>
                             <td>{getTime(user.user.crDate)}</td>
                             <td>{user.user.unRegistered?'no':'yes'}</td>
                             <td>{getTime(user.user.facebookRegistrationSumbmittedDate)}</td>
                             <td>{getTime(user.user.registerDate)}</td>
                             <td>{user.userState&&user.userState.currentChallengeId}</td>
                             <td>{user.userState&&user.userState.completedChallengeNum}</td>
                             <td>{user.userState&&user.userState.duration}</td>
                             <td>{user.userState&&user.userState.completedWorkoutNum}</td>
                             <td>{user.userConfiguration&&user.userConfiguration.notification}</td>
                             <td>{user.userConfiguration&&user.userConfiguration.remider}</td>
                             <td>{user.shareCount}</td>
                             <td>
                                 {user.user&&user.user.role==0&&<button type="button" className="btn btn-danger m-5" onClick={this.super.bind(this,user.user)}>cancelSuper</button>}
                                 {user.user&&user.user.role!=0&&<button type="button" className="btn btn-success m-5" onClick={this.super.bind(this,user.user)}>setSuper</button>}
                             </td>
                             </tr>
                             )}
                            </tbody>
                        </table>
                    </div>

                    <div className="box-footer clearfix">
                        <div className="pull-right">
                            <Pagination
                                prev
                                next
                                first
                                last
                                ellipsis
                                boundaryLinks
                                items={users.totalPages}
                                maxButtons={2}
                                activePage={parseInt(condition.number)+1}
                                onSelect={this.setCondition.bind(this)}
                            />
                        </div>
                    </div>
                </div>}

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        users: state.users
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(usersActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Users))