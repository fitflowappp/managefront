/**
 * Created by qwr on 2017/6/29.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import {Button, Pagination, Panel} from "react-bootstrap"
import {networkinfoActions} from '../actions'
import NetworkinfoModal from '../components/modal/NetworkinfoModal';
class Networkinfo extends Component {
    constructor(props) {
        super(props);
        //初始化要使用的state
        this.state = {
            editNetworkinfo:null,
            number:0,
        };
    }
    componentDidMount() {
        this.query();
    }
    query() {
        const {queryNetworkinfo} = this.props;
        queryNetworkinfo({});
    }
    add(){
        this.setState({
        editNetworkinfo:null,
    })
        this.refs['NetworkinfoModal'].getWrappedInstance().openModal();
    }
    edit(networkinfo){
        this.setState({
            editNetworkinfo:Object.assign({},networkinfo),
        })
        this.refs['NetworkinfoModal'].getWrappedInstance().openModal();
    }
    handleSelect(){

    }
    render(){
        const networkinfos=this.props.networkinfo.list||[];
        return (
            <div>
                <Helmet title="Networkinfo"/>
                <NetworkinfoModal query={this.query.bind(this)}  editNetworkinfo={this.state.editNetworkinfo} ref="NetworkinfoModal"/>
                <Panel className="m-t5">
                    <div>
                        <Button bsStyle="primary" className="glyphicon glyphicon-plus" onClick={this.add.bind(this)}/>
                    </div>
                    <table className="table table-condensed table-hover">
                        <thead>
                        <tr>
                            <th>头像</th>
                            <th>姓名</th>
                            <th>群ID</th>
                            <th>性别</th>
                            <th>微信号</th>
                            <th>电话</th>
                            <th>行业</th>
                            <th>城市</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {networkinfos.map((networkinfo, index) =>
                        <tr key={index}>
                            <td><img src={networkinfo.avatarUrl} alt="头像" width={50}/></td>
                            <td>{networkinfo.name}</td>
                            <td>{networkinfo.openGId}</td>
                            <td>{networkinfo.gender==1?'男':'女'}</td>
                            <td>{networkinfo.wechat}</td>
                            <td>{networkinfo.phone}</td>
                            <td>{networkinfo.industry}</td>
                            <td>{networkinfo.province+networkinfo.city}</td>
                            <td>
                                <Button bsStyle="info" className='glyphicon glyphicon-pencil m-5' onClick={this.edit.bind(this,networkinfo)}/>
                                {/*<Button bsStyle="danger" className="glyphicon glyphicon-trash m-5"/>*/}
                            </td>
                        </tr>
                        )}
                        </tbody>
                    </table>
                </Panel>
                {/*<div className="pagination-wrap">
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        items={5}
                        maxButtons={5}
                        activePage={1}
                        onSelect={this.handleSelect.bind(this)}
                    />
                </div>*/}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        networkinfo: state.networkinfo
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(networkinfoActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Networkinfo))