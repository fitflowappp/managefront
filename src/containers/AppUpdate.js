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
      versionList: [],
      update: {},
      forceUpdate: {},
      success: false,
      system: 1,
      updateComponentAble: false,
      forceUpdateComponentAble: false,
    };
  }
  componentDidMount() {
    this.query();
  }
  query() {
    const { queryAppUpdate } = this.props;
    const that = this;
    const system = 1;// ios
    queryAppUpdate({ system: `${system}` }, (res) => {
      let updateComponentAble = false;
      let forceUpdateComponentAble = false;
      let update = {};
      let forceUpdate = {};
      if (res && res.setting) {
        if (res.setting.update && res.setting.update.build > 0) {
          updateComponentAble = true;
        }
        if (res.setting.force && res.setting.force.build > 0) {
          forceUpdateComponentAble = true;
        }
        if (res.setting.update) {
          update = res.setting.update;
        }

        if (res.setting.force) {
          forceUpdate = res.setting.force;
        }

      }
      that.setState({
        versionList: res.versions,
        update,
        forceUpdate,
        forceUpdateComponentAble,
        updateComponentAble,
      });
    });
  }
  handleNormalChangle(e) {
    // eslint-disable-next-line
    const target = e.target;
    const name = target.name;
    const value = e.target.value;
    const normalUpdate = this.state.update;
    normalUpdate[name] = value;
    this.setState({ update: normalUpdate });
  }
  handleForceUpdateChangle(e) {
    const target = e.target;
    const name = target.name;
    const value = e.target.value;
    const update = this.state.forceUpdate;
    update[name] = value;
    this.setState({ forceUpdate: update });
  }
  handleNormalUpdateDiable() {
    this.setState({ updateComponentAble: !(this.state.updateComponentAble) });
  }
  handleForceUpdateDiable() {
    this.setState({ forceUpdateComponentAble: !(this.state.forceUpdateComponentAble) });
  }
  save() {
    const update = this.state.update;
    const forceUpdate = this.state.forceUpdate;
    const forceUpdateComponentAble = this.state.forceUpdateComponentAble;
    const updateComponentAble = this.state.updateComponentAble;
    if (updateComponentAble && forceUpdateComponentAble) {
      if (update && forceUpdate && update.build <= forceUpdate.build) {
        Alert.alert({
          title: 'error',
          body: 'The Forced Upgrade Notifications Version you have chosen is equal to or larger than the Regular Upgrade Notification Version. This way, users will not see the Regular Upgrade Notification. Please check the settings before you continue.'
        });
        return;
      }
    }
    const { uploadAppUpdate } = this.props;
    const updateSetting = {};
    const system = this.state.system;
    if ((this.state.updateComponentAble)) {
      updateSetting.update = update;
    }
    if ((this.state.forceUpdateComponentAble)) { updateSetting.force = forceUpdate; }
    updateSetting.system = system;
    const that = this;

    uploadAppUpdate(updateSetting, () => {
      that.setState({ success: true });
    });
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
    return (
      <div>
      <Helmet title="app update"/>
      {success&&<div className="callout callout-success text-center">Changes successful</div>}
        <div className="box">
                 
          <div className="box-body">
          <Col lg={10}>
          <label className="font-20">Choose app versions for upgrade and forced upgrade notifications</label>
          </Col>
          <Row className="m-l5 m-box-shadow m-r5" ref={(m)=>{this.updateDiv=m}} >
          <Col lg={10} className="m-t5">
            <input type="checkbox" className="m-b5" style={{width:'30px'}} checked={(this.state.updateComponentAble)}  required={true} placeholder="" onChange={this.handleNormalUpdateDiable.bind(this)} />

            <label className="font-16">Regular Upgrade Notification Version</label>
            <label className="font-10" >Users with app installs equal to or earlier than this version will receive a notification to upgrade to the latest version.</label>
          </Col>
          
          <Col lg={10}  style={{height:'40px'}}>
          <select 
            style={{width:'50%'}}
            name="build"
            value={updateSetting?(updateSetting.build?updateSetting.build:0):0}
            onChange={this.handleNormalChangle.bind(this)}
            disabled={!(this.state.updateComponentAble)}
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
           <textarea type="text" className="form-control m-b10" style={{ maxWidth: '615px',height:'120px' }}   disabled={!(this.state.updateComponentAble)}  required placeholder="" value={updateSetting?updateSetting.desc:""} name="desc" onChange={this.handleNormalChangle.bind(this)} />
          </Col>
          </Row>
          
          <Row className="m-l5 m-box-shadow m-r5 m-t20" ref={(m)=>{this.forceUpdateDiv=m} }>
          
          <Col lg={9} className="m-t5">
            <input type="checkbox" className="m-b5" style={{width:'30px'}}  checked={(this.state.forceUpdateComponentAble)}  required={true} placeholder="" onChange={this.handleForceUpdateDiable.bind(this)} />
            <label className="font-16">Forced Update Notification</label>
          </Col>
          <Col lg={10} className="m-t5">
            <label className="font-10" >Users with app installs equal to or earlier than this version will receive a notification forcing them to update to the latest version. Please choose a version that is earlier than the one above.</label>
          </Col>
          <Col lg={10}  style={{height:'40px'}}>
          <select 
            style={{width:'50%'}}
            name="build"
            onChange={this.handleForceUpdateChangle.bind(this)}
            value={forceUpdateSetting?(forceUpdateSetting.build?forceUpdateSetting.build:0):0}
            disabled={!(this.state.forceUpdateComponentAble)}
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
           <textarea type="text" className="form-control m-b10" style={{ maxWidth: '615px',height:'120px' }} disabled={!(this.state.forceUpdateComponentAble)} required placeholder="" value={forceUpdateSetting?forceUpdateSetting.desc:""} name="desc"  onChange={this.handleForceUpdateChangle.bind(this)}           />
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

