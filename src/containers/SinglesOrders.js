/**
 * Created by qwr on 2017/9/18.
 */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import { singlesordersActions } from '../actions';
import Alert from '../components/Alert';
import WorkoutsListModal from '../components/modal/WorkoutsListModal';

class SinglesOrder extends Component {
  constructor(props) {
    super(props);
    this.openWorkoutCompont = null;
    this.state = {
      singlesOrders: [],
      success: false,
    };
  }
  componentDidMount() {
    this.query();
  }

  getSinglesListFromNetwork(result) {
    // eslint-disable-next-line
    const content = result.content;
    if (content) {
      this.setState({
        singlesOrders: content,
      });
    }
  }

  query() {
    const { querySinglesOrders } = this.props;
    const that = this;
    querySinglesOrders({}, (res) => { that.getSinglesListFromNetwork(res); });
  }

  addSingle(singles) {
    const singlesOrderList = this.state.singlesOrders;
    singlesOrderList.push(singles);
    this.setState({ singlesOrders: singlesOrderList });
  }
  saveSinglesOrder() {
    const singlesOrderList = this.state.singlesOrders;
    const updateSinglesIdList = [];
    let workout = {};
    let singlesItem = {};
    for (let i = 0; i < singlesOrderList.length; i += 1) {
      workout = singlesOrderList[i];
      singlesItem = {};
      singlesItem.singlesId = workout.id;
      singlesItem.singlesLock = workout.singlesLock;
      updateSinglesIdList.push(singlesItem);
    }
    const { saveSinglesOrders } = this.props;
    const that = this;
    saveSinglesOrders(updateSinglesIdList, () => {
      that.setState({ success: true });
    });
  }

  openWorkoutsListModal() {
    this.openWorkoutCompont.getWrappedInstance().openModal();
  }
  // 排序routines
  upSingles(index) {
    // eslint-disable-next-line
    const singlesOrders = this.state.singlesOrders;
    if (index !== 0) {
      const before = singlesOrders[index - 1];
      const after = singlesOrders[index];
      singlesOrders[index - 1] = after;
      singlesOrders[index] = before;
      this.setState({ singlesOrders });
    }
  }
  lockSingles(index) {
    const singlesOrders = this.state.singlesOrders;
    const singles = singlesOrders[index];
    singles.singlesLock = !singles.singlesLock;
    singlesOrders[index] = singles;
    this.setState({ singlesOrders });
  }
  // 删除routines
  delSingles(index) {
    const that = this;
    Alert.confirm({
      title: 'delete',
      body: 'confirm？',
      surecb() {
        // eslint-disable-next-line
        var singlesOrders = that.state.singlesOrders;
        singlesOrders.splice(index, 1);
        that.setState({ singlesOrders });
      },
    });
  }
  back() {
    this.props.router.goBack();
  }
  /* eslint-disable */
  render() {
    const singlesOrders = this.state.singlesOrders;
    console.log(singlesOrders);
    var success=this.state.success;
    return (
      <div>
        <Helmet title="Edit SinglesOrders" />
        <WorkoutsListModal ref={(m)=>{this.openWorkoutCompont=m}} pushWorkouts={this.addSingle.bind(this)} />
        {success&&<div className="callout callout-success text-center">Your singlesOrders have been succesfully saved</div>}
        <div className="box">
          <div className="box-body">
          <Row>
              <Col lg={3} className="m-t10">
                <label className="m-t5">singles Orders:</label>
              </Col>
          </Row>
          <table  className="table table-bordered dataTable">
          <thead>
          <tr role="row">
            <th >id </th> 
            <th >order </th> 
            <th >singles title </th> 
            <th >delete single </th> 
            <th >lock single </th> 
          </tr>
          </thead>
          <tbody>
          {singlesOrders.map((workout, index) =>
              <tr key={index}>
                  <td>{workout.id}</td>
                  <td><i onClick={this.upSingles.bind(this, index)} className="fa fa-arrow-up text-primary pointer m-r10" style={{ fontSize: '20px' }} /></td>
                  <td><text className="m-r5">{workout.code}:</text>{workout.title}</td>
                  <td><i onClick={this.delSingles.bind(this, index)} className="fa fa-close text-danger pointer m-l10" style={{ fontSize: '20px' }} /></td>
                  
                  <td>
                  <Col lg={12}>
                    <div className="checkbox">
                   <label>
                       <input type="checkbox" name="display" checked={workout.singlesLock} onChange={this.lockSingles.bind(this,index)} /></label>
                  </div>
                  </Col>
                </td>
              </tr>
          )}
          </tbody>
          </table>
          <Row>
            <Col lg={9} className="m-t5">
              <i onClick={this.openWorkoutsListModal.bind(this)} className="fa fa-plus-square text-primary pointer" style={{ fontSize: '40px' }} />
            </Col>
          </Row>
          </div>

          <div className="box-footer clearfix">
            <Row>
              <Col lg={12} className="col-md-offset-3">
                <button type="button"  className="btn  btn-primary" onClick={this.saveSinglesOrder.bind(this)} >Save</button>
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
    singlesOrders: state.singlesOrders,
  };
}
// 将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(singlesordersActions, dispatch);
}

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SinglesOrder));

