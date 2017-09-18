/**
 * Created by qwr on 2017/9/14.
 */
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {withRouter} from "react-router";
import {connect} from 'react-redux'
import {accountActions} from '../actions'
import Helmet from "react-helmet"
import {Panel, Button, Col, Row,Form,FormControl,FormGroup,Glyphicon} from "react-bootstrap"
import Alert from '../components/Alert'
import cookie from 'react-cookie'
import {getMuser} from '../common/auth'
import {serializeForm} from '../common/index'
class Register extends Component{
    constructor(props) {
        super(props);
    }
    //注册
    register(event){
        event.preventDefault();
        const {login} = this.props;
        const param=serializeForm(event.target);
        const that=this;
        login(param,function (obj) {
            if (obj.result.code == 1) {
                cookie.save("muser", obj, {"path": '/'});
                that.props.router.replace({pathname: '/dashboard'});
            }
            else {
                Alert.info({info: obj.result.msg});
            }
        }.bind(this));
    }

    render() {
        return (
            <Row className={{"show-grid":true,"hide":getMuser()}}>
                <Helmet title="Login"/>
                <div>
                    <div className="login-box">
                        <div className="login-logo">
                            <b>yoga manage</b>
                        </div>
                        <div className="login-box-body">
                            <p className="login-box-msg">Register a new membership</p>
                            <Form role="form"  onSubmit = {this.register.bind(this)}>
                                <div className="form-group has-feedback">
                                    <input type="text" className="form-control" required={true}   name="name" placeholder="Name"/>
                                    <span className="glyphicon glyphicon-user  form-control-feedback"></span>
                                </div>
                                <div className="form-group has-feedback">
                                    <input type="password" className="form-control" required={true}   name="password" placeholder="Password"/>
                                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                                </div>
                                <div className="form-group has-feedback">
                                    <input type="password" className="form-control" required={true}   name="rePassword" placeholder="Retype password"/>
                                    <span className="glyphicon glyphicon-log-in form-control-feedback"></span>
                                </div>
                                <div className="row">
                                    <div className="col-xs-4 col-md-offset-8">
                                        <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Row>
        )
    }
}
function mapStateToProps(state) {
    return {
        account: state.account
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(accountActions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))
