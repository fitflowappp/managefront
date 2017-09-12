/**
 * Created by qwr on 2017/6/29.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from "react-router";
import {Button, Modal, Form, FormControl, FormGroup, ControlLabel, Col, Radio} from "react-bootstrap"
import {networkinfoActions} from '../../actions'
import Alert from '../Alert'
import {upload} from "../../common/fetch";
class NetworkinfoModal extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                show: false,
                networkinfo: {
                    openGId:'',
                    name: '',
                    gender: 1,
                    wechat: '',
                    wechatGpLimit: 0,
                    phone: '',
                    phoneGpLimit: 0,
                    industry: '',
                    province: '',
                    city: '',
                    company: {
                        name: '',
                        career: '',
                        desc: '',
                    },
                    resource: '',
                    requirement: '',
                    avatarUrl: '',
                },
                citysIndex: 1,
            }
    }

    componentDidMount() {
        this.queryIndustry();
        this.queryAddress();
    }

    componentWillReceiveProps(nextProps) {
        const editNetworkinfo = nextProps.editNetworkinfo;
        if (editNetworkinfo) {
            const provinces = this.props.networkinfo.provinces || [];
            var citysIndex=1;
            for(var i=0;i<provinces.length;i++){
                if(provinces[i].province==editNetworkinfo.province){
                    citysIndex=i+1;
                }
            }
            this.setState({
                networkinfo: editNetworkinfo,
                citysIndex:citysIndex,
            })
        }else{
            this.setState({
                networkinfo: {
                    openGId:'',
                    name: '',
                    gender: 1,
                    wechat: '',
                    wechatGpLimit: 0,
                    phone: '',
                    phoneGpLimit: 0,
                    industry: '',
                    province: '',
                    city: '',
                    company: {
                        name: '',
                        career: '',
                        desc: '',
                    },
                    resource: '',
                    requirement: '',
                    avatarUrl: '',
                },
            })
        }
    }

    queryIndustry() {
        const {industry} = this.props;
        industry({});
    }

    queryAddress() {
        const {province} = this.props;
        province({});
    }

    _handleValidSubmit(e) {
        e.preventDefault();
        const {postNetworkinfo,query} = this.props;
        const networkinfo = this.state.networkinfo;
        const that = this;
        postNetworkinfo(networkinfo, function (res) {
            query();
            that.closeModal();
        });
    };


    uploadFile(e) {
        const target = e.target;
        const name = target.name;
        const that = this;
        var networkinfo = this.state.networkinfo;
        upload(e).after(function (res) {
            networkinfo[name] = res[0].contentUri;
            that.setState({
                networkinfo: that.state.networkinfo,
            })
        });
    }

    set(e) {
        const name = e.target.getAttribute('name');
        const value = e.target.value;
        var networkinfo = this.state.networkinfo;
        if (name == 'province') {
            var index = e.target.selectedIndex;
            this.setState({
                citysIndex: index,
            })
        }
        if (name == 'wechatGpLimit' || name == 'phoneGpLimit' || name == 'gender') {
            networkinfo[name] = Number(value);
        } else if (name == 'company_name' || name == 'company_career' || name == 'company_desc') {
            var companyName = name.split('_')[1];
            networkinfo.company[companyName] = value;
        } else {
            networkinfo[name] = value;
        }
        this.setState({
            networkinfo: networkinfo,
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
        const editNetworkinfo=this.props.editNetworkinfo;
        const industrys = this.props.networkinfo.industrys || [];
        const provinces = this.props.networkinfo.provinces || [];
        const networkinfo = this.state.networkinfo;
        const citysIndex = this.state.citysIndex - 1;
        return (
            <div className="static-modal">
                <Modal show={this.state.show} backdrop={false}>

                    <Form horizontal onSubmit={this._handleValidSubmit.bind(this)}>
                        <Modal.Header>
                            <Modal.Title>{editNetworkinfo ? '编辑人脉' : '新建人脉'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormGroup controlId="openGId" >
                                <Col componentClass={ControlLabel} sm={2}>
                                    群ID
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" name="openGId"  value={networkinfo.openGId}
                                                 onChange={this.set.bind(this)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="name" >
                                <Col componentClass={ControlLabel} sm={2}>
                                    姓名
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" name="name"  value={networkinfo.name}
                                                 onChange={this.set.bind(this)} required/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="gender">
                                <Col componentClass={ControlLabel} sm={2}>
                                    性别
                                </Col>
                                <Col sm={10}>
                                    <Radio name="gender" value="1" checked={networkinfo.gender == 1}
                                           onChange={this.set.bind(this)} inline>男</Radio>
                                    <Radio name="gender" value="2" checked={networkinfo.gender == 2}
                                           onChange={this.set.bind(this)} inline>女</Radio>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="wechat">
                                <Col componentClass={ControlLabel} sm={2}>
                                    微信
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" name="wechat" value={networkinfo.wechat} onChange={this.set.bind(this)} required/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="wechatGpLimit">
                                <Col componentClass={ControlLabel} sm={2}>
                                    微信限制
                                </Col>
                                <Col sm={10}>
                                    <Radio name="wechatGpLimit" value="0" inline checked={networkinfo.wechatGpLimit == 0}
                                           onChange={this.set.bind(this)}>公开</Radio>
                                    <Radio name="wechatGpLimit" value="1" inline checked={networkinfo.wechatGpLimit == 1}
                                           onChange={this.set.bind(this)}>仅群内可见</Radio>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="phone">
                                <Col componentClass={ControlLabel} sm={2}>
                                    电话
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" name="phone" value={networkinfo.phone} onChange={this.set.bind(this)} required/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="phoneGpLimit">
                                <Col componentClass={ControlLabel} sm={2}>
                                    电话限制
                                </Col>
                                <Col sm={10}>
                                    <Radio name="phoneGpLimit" value="0" inline checked={networkinfo.phoneGpLimit == 0}
                                           onChange={this.set.bind(this)}>公开</Radio>
                                    <Radio name="phoneGpLimit" value="1" inline checked={networkinfo.phoneGpLimit == 1}
                                           onChange={this.set.bind(this)}>仅群内可见</Radio>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="industry">
                                <Col componentClass={ControlLabel} sm={2}>
                                    行业
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="select" name="industry" value={networkinfo.industry} onChange={this.set.bind(this)} required>
                                        <option value="">请选择</option>
                                        {industrys.map((industry, index) =>
                                            <option key={index} value={industry.name}>{industry.name}</option>
                                        )}
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="province_city">
                                <Col componentClass={ControlLabel} sm={2}>
                                    城市
                                </Col>
                                <Col sm={5}>
                                    <FormControl componentClass="select" name="province" value={networkinfo.province} onChange={this.set.bind(this)} required>
                                        <option value="">请选择</option>
                                        {provinces.map((province, index) =>
                                            <option key={index} value={province.province}>{province.province}</option>
                                        )}
                                    </FormControl>
                                </Col>
                                <Col sm={5}>
                                    <FormControl componentClass="select" name="city" value={networkinfo.city} onChange={this.set.bind(this)}>
                                        <option value="">请选择</option>
                                        {provinces.length > 0 && provinces[citysIndex].citys.map((city, index) =>
                                            <option key={index} value={city}>{city}</option>
                                        )}
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="company_name">
                                <Col componentClass={ControlLabel} sm={2}>
                                    公司名称
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" name="company_name" value={networkinfo.company.name} onChange={this.set.bind(this)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="company_career">
                                <Col componentClass={ControlLabel} sm={2}>
                                    公司职位
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" name="company_career" value={networkinfo.company.career}  onChange={this.set.bind(this)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="company_desc">
                                <Col componentClass={ControlLabel} sm={2}>
                                    公司项目描述
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" name="company_desc" value={networkinfo.company.desc}  onChange={this.set.bind(this)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="resource">
                                <Col componentClass={ControlLabel} sm={2}>
                                    资源
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" maxLength="100" name="resource"
                                                 placeholder="100字内" value={networkinfo.resource}  onChange={this.set.bind(this)} required/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="requirement">
                                <Col componentClass={ControlLabel} sm={2}>
                                    需求
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" maxLength="100" name="requirement"
                                                 placeholder="100字内" value={networkinfo.requirement}  onChange={this.set.bind(this)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="headerImg">
                                <Col componentClass={ControlLabel} sm={2}>
                                    头像
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="file" name="avatarUrl" onChange={this.uploadFile.bind(this)}/>
                                    {networkinfo.avatarUrl &&
                                    <img src={networkinfo.avatarUrl} alt="头像" width='50' className="m-t5"/>}
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
function mapStateToProps(state) {
    return {
        networkinfo: state.networkinfo
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(networkinfoActions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(NetworkinfoModal)