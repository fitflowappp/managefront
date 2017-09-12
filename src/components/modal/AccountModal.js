/**
 * Created by qwr on 2017/6/13.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button, Modal, Form, FormControl, FormGroup, ControlLabel, Col} from "react-bootstrap"
import {accountActions} from '../../actions'
import Alert from '../Alert'
import {upload} from "../../common/fetch";
class AccountModal extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                show: false,
                account: {
                    name: '',
                    role: '',
                    headerImg: null,
                    intro: '',
                    password: '',
                }
            }
    }
    componentWillReceiveProps(nextProps) {
        const {editAccount,role}= nextProps;
        if (editAccount) {
             this.setState({
             account: editAccount,
             })
        } else {
            this.setState({
                account: {
                    name: '',
                    role: role,
                    headerImg: null,
                    intro: '',
                    password: '',
                }
            })
        }
    }

    _handleValidSubmit(e) {
        e.preventDefault();
        const {postAccount, putAccount, query} = this.props;
        const account = this.state.account;
        const that = this;
        if (account.id) {
            putAccount(account, function (res) {
                if(res.code==1){
                    query();
                }else{
                    Alert.info({info:res.msg})
                }
            });
        } else {
            postAccount(account, function (res) {
                if(res.code==1){
                    query();
                }else{
                    Alert.info({info:res.msg})
                }
            });
        }
        that.closeModal();
    };

    uploadFile(e) {
        const target = e.target;
        const name = target.name;
        const that = this;
        var account = this.state.account;
        upload(e).after(function (res) {
            account[name] = res[0];
            that.setState({
                account: that.state.account,
            })
        });
    }

    set(e) {
        const name = e.target.getAttribute('name');
        const value = e.target.value;
        var account = this.state.account;
        account[name] = value;
        this.setState({
            account: account,
        });
    }

    openModal() {
        this.setState({
            show: true
        })
    }

    closeModal() {
        this.setState({
            show: false,
        })
    }

    render() {
        const editAccount = this.props.editAccount;
        const account = this.state.account;
        return (
            <div className="static-modal">
                <Modal show={this.state.show} backdrop={false}>
                    <Form horizontal onSubmit={this._handleValidSubmit.bind(this)}>
                        <Modal.Header>
                            <Modal.Title>
                                {editAccount ? '编辑管理账号' : '新建管理账号'}
                                {account.role == 0 && '(管理员)'}
                                {account.role == 1 && '(用户)'}
                                {account.role == 2 && '(买手)'}
                                {account.role == 3 && '(仓库管理员)'}
                                {account.role == 4 && '(搭配师）'}
                                {account.role == 5 && '(采购人)'}
                                </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormGroup controlId="name">
                                <Col componentClass={ControlLabel} sm={2}>
                                    用户名
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" name="name" value={account.name}
                                                 onChange={this.set.bind(this)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="password">
                                <Col componentClass={ControlLabel} sm={2}>
                                    密码
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" name="password" value={account.password}
                                                 onChange={this.set.bind(this)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="intro">
                                <Col componentClass={ControlLabel} sm={2}>
                                    简介
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" name="intro" value={account.intro}
                                                 onChange={this.set.bind(this)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="headerImg">
                                <Col componentClass={ControlLabel} sm={2}>
                                    头像
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="file" name="headerImg" onChange={this.uploadFile.bind(this)}/>
                                    {account.headerImg &&
                                    <img src={account.headerImg.contentUri} alt="头像" width='50' className="m-t5"/>}
                                </Col>
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" type="submit">确认</Button>
                            <Button bsStyle="default" onClick={this.closeModal.bind(this)}>取消</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(accountActions, dispatch)
}
export default connect(null, mapDispatchToProps, null, {withRef: true})(AccountModal)