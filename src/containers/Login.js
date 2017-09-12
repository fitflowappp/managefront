/**
 * Created by john on 2016/5/19.
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
class Login extends Component{
    constructor(props) {
        super(props);
    }
    //登录
    login(event){
        event.preventDefault();
        const {login} = this.props;
        const param=serializeForm(event.target);
        const that=this;
        login(param,function (obj) {
            if (obj.result.code == 1) {
                cookie.save("muser", obj, {"path": '/'});
                that.props.router.replace({pathname: '/account'});
            }
            else {
                Alert.info({info: obj.result.msg});
            }
        }.bind(this));
    }

    render() {
        return (
            <Row className={{"show-grid":true,"hide":getMuser()}}>
                <Col xs={12} mdOffset={4} md={4}>
                    <div>
                        <Helmet title="Login"/>
                        <Panel header="后台管理登录" bsStyle="primary" className="m-t60">
                            <Form horizontal onSubmit = {this.login.bind(this)}>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col  sm={2} className="text-center text-info">
                                        <Glyphicon glyph="user" className="m-t10"/>
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl required={true}  type="text" name="name" placeholder="Name"/>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalPassword">
                                    <Col sm={2} className="text-center text-info">
                                        <Glyphicon glyph="lock" className="m-t10"/>
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="password" name="password" placeholder="Password" />
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button type="submit">
                                            登录
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Panel>
                    </div>
                </Col>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
