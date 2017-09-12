/**
 * Created by qwr on 2016/6/6.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import {Button, Panel, Nav, NavItem} from "react-bootstrap"
import {accountActions} from '../actions'
import AccountModal from '../components/modal/AccountModal';
import Alert from '../components/Alert';
class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: 0,
            editAccount:null,
        };
    }
    componentDidMount() {
        const role=this.state.role;
        this.query(role);
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.role!=prevState.role){
            this.query();
        }
    }
    query() {
        const {queryAccount} = this.props;
        const role=this.state.role;
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
            editAccount: Object.assign({},account),
        })
        this.refs['AccountModal'].getWrappedInstance().openModal();
    }
    del(account) {
        const that=this;
        Alert.confirm({title:'删除',body:"确定删除？",surecb:function(){
            const {deleteAccount} = that.props;
            deleteAccount(account,function (res) {

            });
        }
        });
    }
    changeRole(role) {
        this.setState({
            role: role,
        });
    }
    render() {
        const accounts = this.props.account.list||[];
        const role=this.state.role;
        return (
            <div>
                <Helmet title="Account"/>
                <AccountModal ref="AccountModal" query={this.query.bind(this)} role={role} editAccount={this.state.editAccount}/>
                    <Nav bsStyle="tabs">
                            <NavItem className={role==0?"active":''} onClick={this.changeRole.bind(this,0)}>管理员</NavItem>
                            <NavItem className={role==1?"active":''} onClick={this.changeRole.bind(this,1)}>用户</NavItem>{/*
                            <NavItem className={role==2?"active":''} onClick={this.changeRole.bind(this,2)}>买手</NavItem>
                            <NavItem className={role==3?"active":''} onClick={this.changeRole.bind(this,3)}>仓库管理员</NavItem>
                            <NavItem className={role==4?"active":''} onClick={this.changeRole.bind(this,4)}>搭配师</NavItem>
                            <NavItem className={role==5?"active":''} onClick={this.changeRole.bind(this,5)}>采购人</NavItem>*/}
                    </Nav>
                    <Panel className="m-t5">
                        <div>
                            <Button bsStyle="primary" className="glyphicon glyphicon-plus" onClick={this.add.bind(this)}/>
                        </div>
                        <table className="table table-condensed table-hover">
                            <thead>
                            <tr>
                                <th>头像</th>
                                <th>用户名</th>
                                <th>角色名</th>
                                <th>简介</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {accounts.map((account, index) =>
                                <tr key={account.id}>
                                    <td>
                                        {account.headerImg&& <img src={account.headerImg.contentUri} alt="头像" width="50"/>}
                                    </td>
                                    <td>{account.name}</td>
                                    <td>
                                        {account.role == 0 && '管理员'}
                                        {account.role == 1 && '用户'}
                                        {account.role == 2 && '买手'}
                                        {account.role == 3 && '仓库管理员'}
                                        {account.role == 4 && '搭配师'}
                                        {account.role == 5 && '采购人'}
                                    </td>
                                    <td>{account.intro}</td>
                                    <td>
                                        {account.role != 0&&<Button bsStyle="info" className='glyphicon glyphicon-pencil m-5' onClick={this.edit.bind(this,account)}/>}
                                        {/*<Button bsStyle="danger" className="glyphicon glyphicon-trash m-5" onClick={this.del.bind(this,account)}/>*/}
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </Panel>

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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Account))