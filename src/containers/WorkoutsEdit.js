/**
 * Created by qwr on 2017/9/14.
 */
import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { upload } from '../common/fetch';
import { Col, Form, Pagination, Row } from 'react-bootstrap';
import { workoutsActions } from '../actions';
import Alert from '../components/Alert';
import RoutinesListModal from '../components/modal/RoutinesListModal';

class WorkoutsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workout: {
        code: '',
        title: '',
        duration: '',
        description: '',
        message: '',
        coverImg: null,
        routines: [],
      },
      success: false,
    };
  }
  componentDidMount() {
    const id = this.props.routeParams.id;
    if (id != 0) {
      const { getWorkouts } = this.props;
      const that = this;
      getWorkouts({ id }, (res) => {
        that.setState({
          workout: res.content,
        });
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {

  }
  setWorkout(e) {
    const target = e.target;
    const name = target.getAttribute('name');
    const workout = this.state.workout;
    let value = target.value;
    if (name === 'single') {
      value = !workout.single;
    } else if (name === 'shareUrl') {
      if (value.substring(0, 4) !== 'http') {
        Alert({ info: '' });
        return;
      }
    }
    workout[name] = value;
    this.setState(workout);
  }
  uploadFile(e) {
    const target = e.target;
    const name = target.name;
    const that = this;
    const workout = this.state.workout;
    upload(e).after((res) => {
      workout[name] = res[0];
      that.setState(workout);
    });
  }
  save(event) {
    event.preventDefault();
    const { postWorkouts, putWorkouts } = this.props;
    // eslint-disable-next-line
    const workout = this.state.workout;
    const that = this;
    if (!workout.id) {
      postWorkouts(workout, (res) => {
        if (res.result.code === 1) {
          that.setState({
            success: true,
          });
          that.back();
        }
        Alert.info({ info: res.result.msg });
      });
    } else {
      putWorkouts(workout, (res) => {
        if (res.result.code === 1) {
          that.setState({
            success: true,
          });
        }
        Alert.info({ info: res.result.msg });
      });
    }
  }
  pushRoutines(obj) {
    // eslint-disable-next-line
    const workout = this.state.workout;
    workout.routines.push(obj);
    this.setState(workout);
  }
  openRoutinesListModal() {
    this.refs.RoutinesListModal.getWrappedInstance().openModal();
  }
  // 排序routines
  upRoutines(index) {
    const workout = this.state.workout;
    const routines = workout.routines;
    if (index != 0) {
      const before = routines[index - 1];
      const after = routines[index];
      routines[index - 1] = after;
      routines[index] = before;
      this.setState(workout);
    }
  }
  // 删除routines
  delRoutines(index) {
    const that = this;
    Alert.confirm({
      title: 'delete',
      body: 'confirm？',
      surecb() {
        const workout = that.state.workout;
        const routines = workout.routines;
        routines.splice(index, 1);
        that.setState(workout);
      },
    });
  }
  back() {
    this.props.router.goBack();
  }
  /* eslint-disable */
  render() {
    const workout = this.state.workout;
    const success = this.state.success;
    return (
      <div>
            <Helmet title="WorkoutsEdit" />
            <RoutinesListModal ref="RoutinesListModal" pushRoutines={this.pushRoutines.bind(this)} />
            <div className="box">
                {success && <div className="callout callout-success text-center">Your changes have been succesfully saved</div>}
                <div className="box-header">
                    <h3 className="box-title">Edit Workout</h3>
                  </div>
                <Form role="form" onSubmit={this.save.bind(this)}>
                    <div className="box-body">
                        <Row>
                            <Col lg={3} className="m-t10">Workout ID:</Col>
                            <Col lg={9} className="m-t10">{workout.id}</Col>
                          </Row>
                        <Row>
                            <Col lg={3} className="m-t10">Number of times started:</Col>
                            <Col lg={3} className="m-t10">{workout.startedTimes}</Col>

                            <Col lg={3} className="m-t10">Number of unique users started:</Col>
                            <Col lg={3} className="m-t10">{workout.startedUserCount}</Col>
                          </Row>
                        <Row>
                            <Col lg={3} className="m-t10">Number of times completed:</Col>
                            <Col lg={3} className="m-t10">{workout.completedTimes}</Col>

                            <Col lg={3} className="m-t10">Number of unique users completed:</Col>
                            <Col lg={3} className="m-t10">{workout.completedUserCount}</Col>
                          </Row>
                        <Row className="m-t40">
                            <Col lg={3} className="m-t10">
                                <label className="m-t5">Workout Code:</label>
                              </Col>
                            <Col lg={9} className="m-t10">
                                <input type="text" className="form-control" style={{ maxWidth: '615px' }} required placeholder="" name="code" value={workout.code} onChange={this.setWorkout.bind(this)} />
                              </Col>

                            <Col lg={3} className="m-t10">
                                <label className="m-t5">Workout Title:</label>
                              </Col>
                            <Col lg={9} className="m-t10">
                                <input type="text" className="form-control" style={{ maxWidth: '615px' }} required placeholder="" name="title" value={workout.title} onChange={this.setWorkout.bind(this)} />
                              </Col>

                            <Col lg={3} className="m-t10">
                                <label className="m-t5">Workout Duration(mins):</label>
                              </Col>
                            <Col lg={9} className="m-t10">
                                <input type="text" className="form-control" style={{ maxWidth: '615px' }} required placeholder="" name="duration" value={workout.duration} onChange={this.setWorkout.bind(this)} />
                              </Col>
                            <Col lg={3} className="m-t10">
                                <label className="m-t5">Workout Description:</label>
                              </Col>
                            <Col lg={9} className="m-t10">
                                <input type="text" className="form-control" style={{ maxWidth: '615px' }} required placeholder="" name="description" value={workout.description} onChange={this.setWorkout.bind(this)} />
                              </Col>
                            <Col lg={3} className="m-t10">
                                <label className="m-t5">Completion Message:</label>
                              </Col>
                            <Col lg={9} className="m-t10">
                                <input type="text" className="form-control" style={{ maxWidth: '615px' }} placeholder="" name="message" value={workout.message} onChange={this.setWorkout.bind(this)} />
                              </Col>
                          </Row>
                        <Row>
                            <Col lg={3} className="m-t10">
                                <label className="m-t5">share url:</label>
                              </Col>
                            <Col lg={3} className="m-t10">
                                <input type="text" className="form-control" style={{ maxWidth: '615px' }} placeholder="" name="shareUrl" value={workout.shareUrl} onChange={this.setWorkout.bind(this)} />
                              </Col>

                          </Row>
                        <Row>
                            <Col lg={3} className="m-t10">
                                <label className="m-t5">Workout Image:</label>
                              </Col>
                            <Col lg={3} className="m-t10">
                                <input type="file" name="coverImg" onChange={this.uploadFile.bind(this)} />
                              </Col>
                            <Col lg={6} className="m-t10">
                                {workout.coverImg &&
                                    <img src={workout.coverImg.contentUri} alt="Workout Image" width={100} />
                                    }
                              </Col>
                          </Row>

                        <Row>
                            <Col lg={3} className="m-t10">
                                <label className="m-t5">Associated Routines:</label>
                              </Col>
                            <Col lg={9} className="m-t5">
                                {workout.routines.map((routine, index) =>
                                      (<div key={index} className="m-b5">
                                        <i onClick={this.upRoutines.bind(this, index)} className="fa fa-arrow-up text-primary pointer m-r10" style={{ fontSize: '20px' }} />
                                        <text className="m-r5">Routine</text>{routine.code}:{routine.title}
                                        <i onClick={this.delRoutines.bind(this, index)} className="fa fa-close text-danger pointer m-l10" style={{ fontSize: '20px' }} />
                                       </div>) )}
                                <i onClick={this.openRoutinesListModal.bind(this)} className="fa fa-plus-square text-primary pointer" style={{ fontSize: '40px' }} />
                              </Col>
                          </Row>
                      </div>

                    <div className="box-footer clearfix">
                        <Row>
                            <Col lg={12} className="col-md-offset-3">
                                <button type="submit" className="btn  btn-primary" >Save</button>
                                <button type="button" className="btn btn-default m-l10" onClick={this.back.bind(this)}>Back</button>
                              </Col>
                          </Row>
                      </div>
                  </Form>
              </div>

          </div>
    );
    /* eslint-enable */
  }
}
function mapStateToProps(state) {
  return {
    workouts: state.workouts,
  };
}
// 将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(workoutsActions, dispatch);
}

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WorkoutsEdit));
