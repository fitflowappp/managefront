/**
 * Created by qwr on 2017/9/18.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from "react-router";
import {Col, Form, Pagination, Row} from "react-bootstrap"
import {challengeordersActions} from '../actions'
import {getTime} from '../common'
import Alert from '../components/Alert';
class ChallengesOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challengeorders:[],
        };
    }
    componentDidMount() {
        this.query();
    }
    componentDidUpdate(prevProps, prevState) {

    }
    query() {
        const {queryChallengeOrders} = this.props;
        queryChallengeOrders();
    }
    add(){
        var that=this;
        const {postChallengeOrders} = this.props;
        postChallengeOrders({challenges:[]},function (res) {
            if(res.result.code==1){
                that.query();
            }
            Alert.info({info:res.result.msg});
        });
    }
    primary(challengeorder){
        var that=this;
        const {putChallengeOrders} = this.props;
        Alert.confirm({
            title: 'publish', body: "confirm？", surecb: function () {
                challengeorder.primary=!challengeorder.primary;
                putChallengeOrders(challengeorder,function (res) {
                    if(res.result.code==1){
                        that.query();
                    }
                    Alert.info({info:res.result.msg});
                });
            }
        });

    }
    render() {
        const challengeorders = this.props.challengeorders.list||[];
        return (
            <div>
                <Helmet title="ChallengesOrder"/>
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Challenge Orders</h3>
                        <div className="box-tools">
                            <button type="button" className="btn btn-primary m-5" onClick={this.add.bind(this)}>
                                New ChallengeOrders
                            </button>
                        </div>
                    </div>

                    <div className="box-body table-responsive">
                        <table  className="table table-bordered dataTable">
                            <thead>
                            <tr role="row">
                                <th>id</th>
                                <th>crDate</th>
                                <th>primary</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {challengeorders.map((challengeorder, index) =>
                                <tr key={index}>
                                    <td><Link to={'/challengesordersedit/'+challengeorder.id}>{challengeorder.id}</Link></td>
                                    <td>{getTime(challengeorder.crDate)}</td>
                                    <td>{challengeorder.primary?'yes':'no'}</td>
                                    <td>
                                        <button type="button" className="btn btn-default" onClick={this.primary.bind(this,challengeorder)}>publish</button>
                                    </td>
                                </tr>
                            )}
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
        challengeorders: state.challengeorders
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(challengeordersActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChallengesOrder))