/**
 * Created by qwr on 2017/9/13.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from "react-router";
import {Col, Pagination} from "react-bootstrap"
import {upload} from '../common/fetch'
import {accountActions} from '../actions'
import Alert from '../components/Alert';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage:1,
            editAccount: null,
        };
    }

    componentDidMount() {
        this.query();
    }

    componentDidUpdate(prevProps, prevState) {

    }

    query() {

    }



    uploadFile(e) {
        const target = e.target;
        const name = target.name;
        const that = this;
        upload(e).after(function (res) {

        });
    }

    //分页
    handleSelect(eventKey,e){
        this.setState({
            activePage:eventKey
        });
        this.props.router.replace({pathname: '/tag', query: {page: eventKey}});
    }
    render() {
        const accounts = this.props.account.list || [];
        const role = this.state.role;
        return (
            <div>
                <Helmet title="Dashboard"/>
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Analytics Dashboard</h3>
                        <div className="box-tools">
                            <Link to="/milestones"><button type="button"  className="btn  btn-primary">Edit Milestones</button></Link>
                            <button type="button" className="btn btn-success pull-right m-l10">
                                <i className="fa fa-download"></i>Export csv
                            </button>
                        </div>
                    </div>
                    <div className="box-body">
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
                            <tr>
                                <td>d</td>
                                <td>1</td>
                                <td>1.</td>
                                <td>1.</td>
                                <td>1.</td>
                                <td>1.</td>
                                <td>1.</td>
                                <td>1.</td>
                                <td>1.</td>
                                <td>1.</td>
                                <td>1.</td>
                                <td>1.</td>
                            </tr>
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
                                items={3}
                                maxButtons={5}
                                activePage={this.state.activePage}
                                onSelect={this.handleSelect.bind(this)}
                            />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        account: state.account
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(accountActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard))