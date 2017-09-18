/**
 * Created by qwr on 2017/9/13.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import {Col, Pagination, Row} from "react-bootstrap"
import {accountActions} from '../actions'
import AccountModal from '../components/modal/AccountModal';
import Alert from '../components/Alert';
class Milestones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage:1,
            editAccount: null,
            exerciseRange:50,
            workoutsRange:0,
        };
    }

    componentDidMount() {
        const role = this.state.role;
        this.query(role);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.role != prevState.role) {
            this.query();
        }
    }

    query() {
        const {queryAccount} = this.props;
        const role = this.state.role;
        queryAccount({"role": role});
    }

    add() {
        this.setState({
            editAccount: null,
        })
        this.refs['AccountModal'].getWrappedInstance().openModal();
    }

    edit(account) {
        this.setState({
            editAccount: Object.assign({}, account),
        })
        this.refs['AccountModal'].getWrappedInstance().openModal();
    }

    del(account) {
        const that = this;
        Alert.confirm({
            title: '删除', body: "确定删除？", surecb: function () {
                const {deleteAccount} = that.props;
                deleteAccount(account, function (res) {

                });
            }
        });
    }
    set(e){
        const name = e.target.getAttribute('name');
        const value = e.target.value;
        var state = this.state;
        state[name]=value;
        this.setState(state)
    }
    changeRole(role) {
        this.setState({
            role: role,
        });
    }
    handleSelect(){

    }
    back(){
        window.history.go(-1);
    }
    render() {
        const accounts = this.props.account.list || [];
        const role = this.state.role;
        return (
            <div>
                <Helmet title="Milestones"/>
                <AccountModal ref="AccountModal" query={this.query.bind(this)} role={role} editAccount={this.state.editAccount}/>
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Edit Milestones</h3>
                    </div>
                    <div className="box-body">
                        <p>Users will receive an achievement after every how many total exercise minutes?</p>
                        <Row style={{width:'600px'}}>
                            <Col sm={2}><text>30</text></Col>
                            <Col sm={8}>
                                <input type="range" min="30" max="300" name="exerciseRange" className="pull-left"  value={this.state.exerciseRange} step={1} onChange={this.set.bind(this)}/>
                            </Col>
                            <Col sm={2}><text>300</text></Col>
                            <Col sm={12}><p className="text-center text-primary">{this.state.exerciseRange}</p></Col>
                        </Row>
                        <p className="m-t40">Users will receive an achievement after every how many total workouts?</p>
                        <Row style={{width:'600px'}}>
                            <Col sm={2}><text>1</text></Col>
                            <Col sm={8}>
                                <input type="range" min="1" max="20" name="workoutsRange" className="pull-left"  value={this.state.workoutsRange} step={1} onChange={this.set.bind(this)}/>
                            </Col>
                            <Col sm={2}><text>20</text></Col>
                            <Col sm={12}><p className="text-center text-primary">{this.state.workoutsRange}</p></Col>
                        </Row>
                    </div>

                    <div className="box-footer clearfix">
                        <button type="button"  className="btn  btn-primary">Save</button>
                        <button type="button" className="btn btn-default m-l10" onClick={this.back.bind(this)}>Back</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Milestones))