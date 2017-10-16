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
import {dashboardActions} from '../actions'
import Alert from '../components/Alert';
class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            condition:{
                number:1,
                size:20,
            },
        };
    }

    componentDidMount() {
        var condition=this.props.location.query;
        if(!condition.number){
            condition=this.state.condition;
        }else{
            this.setState({
                condition:condition,
            })
        }
        this.query(condition);
    }
    query(condition) {
        const {queryDashboard} = this.props;
        //queryDashboard(condition);
        queryDashboard();
    }


    //分页
    handleSelect(eventKey,e){
        var condition=this.state.condition;
        condition.number=eventKey;
        this.setState(condition);
        this.query(condition);
        this.props.router.replace({pathname: this.props.location.pathname, query: condition});
    }
    render() {
        const dashboards = this.props.dashboard.list||[];
        const condition=this.state.condition;
        return (
            <div>
                <Helmet title="UserDetails"/>
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Analytics Dashboard</h3>
                        <div className="box-tools">
                            <Link to="/milestones"><button type="button"  className="btn  btn-primary m-5">Edit Milestones</button></Link>
                            <button type="button" className="btn btn-success pull-right m-5">
                                <i className="fa fa-download"></i>Export csv
                            </button>
                        </div>
                    </div>
                    <div className="box-body table-responsive">
                        <table className="table table-bordered table-hover">
                            <tbody>
                            <tr>
                                <th></th>
                                <th>Facebook registration submitted</th>
                                <th>Facebook registration completed</th>
                                <th>Challenges started by unique users</th>
                                <th>Challenges completed by unique users</th>
                                <th>Workouts started by unique users</th>
                                <th>Workouts completed by unique users</th>
                                <th>Unique users who completed a Workout</th>
                                <th>Cumulative duration of videos watched</th>
                                <th>Unique users who turned scheduling on</th>
                                <th>Unique users who have received achievements</th>
                                <th>Unique users who have shared on social media</th>
                            </tr>
                            {dashboards.map((dashboard, index) =>
                                <tr key={index}>
                                    <td>{getTime(dashboard.date)}</td>
                                    <td>{dashboard.facebookRegSubmitNum}</td>
                                    <td>{dashboard.facebookRegCompleteNum}</td>
                                    <td>{dashboard.challengeStartNum}</td>
                                    <td>{dashboard.challengeCompleteNum}</td>
                                    <td>{dashboard.workoutStartNum}</td>
                                    <td>{dashboard.workoutCompleteNum}</td>
                                    <td>{dashboard.oneWorkoutCompleteUserNum}</td>
                                    <td>{dashboard.totalDuration}</td>
                                    <td>{dashboard.calReminderOnNum}</td>
                                    <td>{dashboard.achievementNum}</td>
                                    <td>{dashboard.shareNum}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* <div className="box-footer clearfix">
                     <div className="pull-right">
                     <Pagination
                     prev
                     next
                     first
                     last
                     ellipsis
                     boundaryLinks
                     items={3}
                     maxButtons={5}
                     activePage={Number(condition.number)}
                     onSelect={this.handleSelect.bind(this)}
                     />
                     </div>
                     </div>*/}
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        dashboard: state.dashboard
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(dashboardActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDetails))