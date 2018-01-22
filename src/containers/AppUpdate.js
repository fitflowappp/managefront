/**
 * Created by qwr on 2017/9/18.
 */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import Alert from '../components/Alert';
import { appupdateActions } from '../actions';

class AppUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versionList:[],
      update:{},
      forceUpdate:{},
      success:false,
      system:1,
    };
  }
  componentDidMount() {
    this.query();
  }
  query() {
    const { queryAppUpdate } = this.props;
    const that = this;
    const system=1;//ios
    queryAppUpdate({system:''+system} , (res) => { 
      that.setState({
        versionList:res.versions,
        update:res.setting?(res.setting.update?res.setting.update:{}):{},
        forceUpdate:res.setting?(res.setting.force?res.setting.force: {}):{},
      });
     });
  
  }
  handleNormalChangle(e){
    const target = e.target;
    const name = target.name;
    let value = e.target.value;
    let normalUpdate = this.state.update;
    normalUpdate[name]=value;
    console.log(name+":"+value);
    this.setState({update: normalUpdate});
  }
  handleForceUpdateChangle(e){
    const target = e.target;
    const name = target.name;
    let value = e.target.value;
    let update = this.state.forceUpdate;
    update[name]=value;
    this.setState({forceUpdate: update});

  }
  save(){

    const update=this.state.update;
    const forceUpdate=this.state.forceUpdate;
    if( update && forceUpdate && update.build<=forceUpdate.build ){
      Alert.info({info:"normal update version must less than force update"});
      return;
    }
    const { uploadAppUpdate } = this.props;
    let updateSetting={};
    const system=this.state.system;

    updateSetting['update']=update;
    updateSetting['force']=forceUpdate;
    updateSetting['system']=system;
    const that=this;

    console.log(updateSetting);
    uploadAppUpdate(updateSetting,()=>{
      that.setState({success:true});
    })
  }

  back() {
    this.props.router.goBack();
  }
  /* eslint-disable */
  render() {
    var versions=this.state.versionList;
    var success=this.state.success;
    var updateSetting=this.state.update;
    var forceUpdateSetting=this.state.forceUpdate;
    console.log(versions);
    return (
      <div>
      <Helmet title="app update"/>
      {success&&<div className="callout callout-success text-center">your update settting have been succesfully saved</div>}
        <div className="box">
                 
          <div className="box-body">
          <Col lg={10}>
          <label className="font-20">Choose app versions for upgrade and forced upgrade notifications</label>
          </Col>
          <Row className="m-l5 m-box-shadow m-r5"  >
          <Col lg={10} className="m-t5">
          <label className="font-16">Regular Upgrade Notification Version</label>
            <label className="font-10" >Users with app installs equal to or earlier than this version will receive a notification to upgrade to the latest version.</label>
          </Col>
          
          <Col lg={10}  style={{height:'40px'}}>
          <select 
            style={{width:'50%'}}
            name="build"
            value={updateSetting?(updateSetting.build?updateSetting.build:0):0}
            onChange={this.handleNormalChangle.bind(this)}
            >
            <option value={0}>closed</option>

            {
              versions.map(function(version,index){
              
              return  (<option key={'normal'+index} value={version.build} >{version.version}</option>)
            })
            }
            </select>
          </Col>
          <Col lg={10}>
            <label className="font-20">Update Message</label>
          </Col>
          <Col lg={10}>
           <textarea type="text" className="form-control m-b10" style={{ maxWidth: '615px',height:'120px' }} required placeholder="" value={updateSetting?updateSetting.desc:""} name="desc" onChange={this.handleNormalChangle.bind(this)} />
          </Col>
          </Row>
          
          <Row className="m-l5 m-box-shadow m-r5 m-t20"  >
          <Col lg={10} className="m-t5">
          <label className="font-16">Forced Update Notification</label>
            <label className="font-10" >Users with app installs equal to or earlier than this version will receive a notification forcing them to update to the latest version. Please choose a version that is earlier than the one above.</label>
          </Col>
          
          <Col lg={10}  style={{height:'40px'}}>
          <select 
            style={{width:'50%'}}
            name="build"
            onChange={this.handleForceUpdateChangle.bind(this)}
            value={forceUpdateSetting?(forceUpdateSetting.build?forceUpdateSetting.build:0):0}
            >
            <option value={0}>closed</option>

            {
              versions.map((version,index)=> 
              <option key={'force'+index} value={version.build} >{version.version}</option>
            )
            }

            </select>
          </Col>
          <Col lg={10}>
            <label className="font-20">Forced Update Message</label>
          </Col>
          <Col lg={10}>
           <textarea type="text" className="form-control m-b10" style={{ maxWidth: '615px',height:'120px' }} required placeholder="" value={forceUpdateSetting?forceUpdateSetting.desc:""} name="desc"  onChange={this.handleForceUpdateChangle.bind(this)}           />
          </Col>
          </Row>
          </div>

          <div className="box-footer clearfix">
            <Row>
              <Col lg={12} className="col-md-offset-3">
                <button type="button"  className="btn  btn-primary"  onClick={this.save.bind(this)}>Save</button>
                <button type="button" className="btn btn-default m-l10" onClick={this.back.bind(this)}>Back</button>
              </Col>
            </Row>
          </div>

        </div>

      </div>
    );
    /* eslint-enable */
  }
}
function mapStateToProps(state) {
  return {
    system: state.system,
  };
}
// 将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(appupdateActions, dispatch);
}

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppUpdate));

