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
class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        var condition={
            id:this.props.routeParams.id
        }
        this.query(condition);
    }
    query(condition) {
        const {getUsers} = this.props;
        getUsers(condition);
    }

    back(){
        this.props.router.goBack();
    }

    render() {
        const user = this.props.users.data||{};
        return (
            <div>
                <Helmet title="UserDetails"/>
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">UserDetails</h3>
                        <div className="box-tools">
                            <button type="button"  className="btn  btn-primary m-5" onClick={this.back.bind(this)}>back</button>
                            <button type="button" className="btn btn-success pull-right m-5">
                                <i className="fa fa-download"></i>Export csv
                            </button>
                        </div>
                    </div>
                    <div className="box-body table-responsive">
                        <table className="table table-bordered table-hover">
                            <tbody>
                            <tr>
                                <td>User ID</td>
                                <td>{user.user&&user.user.id}</td>
                            </tr>
                            <tr>
                                <td>Facebook ID</td>
                                <td>{user.facebookUid}</td>
                            </tr>
                            <tr>
                                <td>Email Address</td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td>Profile Picture</td>
                                <td><img src={'data:image/gif;base64,'+user.headerImgContent} alt="none" width={30}/></td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{user.gender}</td>
                            </tr>
                            <tr>
                                <td>Facebook permissions</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Timestamp of App First Opened</td>
                                <td>{getTime(user.user.crDate)}</td>
                            </tr>
                            <tr>
                                <td>Registered?</td>
                                <td>{user.user.unRegistered?'no':'yes'}</td>
                            </tr>
                            <tr>
                                <td>Timestamp of Facebook Registration submitted</td>
                                <td>{getTime(user.user.facebookRegistrationSumbmittedDate)}</td>
                            </tr>
                            <tr>
                                <td>Timestamp of Registration Completed</td>
                                <td>{getTime(user.user.registerDate)}</td>
                            </tr>
                            <tr>
                                <td>Unlocked challenge IDs</td>
                                <td>
                                    {user.userState&&user.userState.unlockedChallengeIds&&user.userState.unlockedChallengeIds.join(',')}
                                </td>
                            </tr>
                            <tr>
                                <td>Current challenge ID</td>
                                <td>{user.userState&&user.userState.currentChallengeId}</td>
                            </tr>
                            <tr>
                                <td>Number of completed challenges</td>
                                <td>{user.userState&&user.userState.completedChallengeNum}</td>
                            </tr>
                            <tr>
                                <td>Started Workout IDs</td>
                                <td>{user.userState&&user.userState.startedWorkoutIds}</td>
                            </tr><tr>
                                <td>Current Workout ID</td>
                                <td>{user.userState&&user.userState.currentWorkoutId}</td>
                            </tr>
                            <tr>
                                <td>Cumulative duration of videos watched</td>
                                <td>{user.userState&&user.userState.duration}</td>
                            </tr>
                            <tr>
                                <td>Number of completed Workouts</td>
                                <td>{user.userState&&user.userState.completedWorkoutNum}</td>
                            </tr>
                            <tr>
                                <td>Scheduling in-app notification on?</td>
                                <td>{user.userConfiguration&&user.userConfiguration.notification}</td>
                            </tr>
                            <tr>
                                <td>Scheduling calendar reminder on?</td>
                                <td>{user.userConfiguration&&user.userConfiguration.remider}</td>
                            </tr>
                            <tr>
                                <td>Scheduling days</td>
                                <td>
                                    {user.userConfiguration&&user.userConfiguration.schedulingDays&&user.userConfiguration.schedulingDays.join(',')}
                                </td>
                            </tr>
                            <tr>
                                <td>Scheduling time of day</td>
                                <td>{user.userConfiguration&&getTime(user.userConfiguration.schedulingTime)}</td>
                            </tr>
                            <tr>
                                <td>Cumulative number of social shares</td>
                                <td>{user.shareCount}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDetails))