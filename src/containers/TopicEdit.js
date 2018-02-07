/**
 * Created by qwr on 2017/9/18.
 */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Col, Form, Row } from 'react-bootstrap';
import { topicActions } from '../actions';
import Alert from '../components/Alert';
import WorkoutsListModal from '../components/modal/WorkoutsListModal';
import ChallengesListModal from '../components/modal/ChallengesListModal';


class TopicEdit extends Component {
  constructor(props) {
    super(props);
    this.challengeCompont = null;
    this.openWorkoutCompont = null;
    this.state = {
      topic: {},
      success: false,
    };
  }
  componentDidMount() {
    this.query();
  }
  query() {
    const id = this.props.routeParams.id;
    const { getTopicDetail } = this.props;
    const that = this;
    getTopicDetail({ id }, (res) => { that.setState({ topic: res }); });
  }
  setTopic(e) {
    const target = e.target;
    const name = target.getAttribute('name');
    const topic = this.state.topic;
    const value = target.value;
    topic[name] = value;
    this.setState(topic);
  }
  save(event) {
    event.preventDefault();
    const { posttopic } = this.props;
    // eslint-disable-next-line
    const topic = this.state.topic;
    const that = this;
    if (topic.title && topic.challengeId && topic.singles && topic.singles.length > 0) {
      posttopic(topic, (res) => {
        if (res) {
          that.setState({
            success: true,
          });
        }
      });
    }
  }
  addTopicSingles(singles) {
    const topic = this.state.topic;
    let singlesList = topic.singles;
    if (!singles) {
      singlesList = [];
    }
    const topicSingles = {};
    topicSingles.singlesId = singles.id;
    topicSingles.singles = singles;
    singlesList.push(topicSingles);
    topic.singles = singlesList;
    this.setState(topic);
  }
  upSingles(index) {
    const topic = this.state.topic;
    const topicSingles = topic.singles;
    if (index != 0) {
      const before = topicSingles[index - 1];
      const after = topicSingles[index];
      topicSingles[index - 1] = after;
      topicSingles[index] = before;
      this.setState(topic);
    }
  }
  delSingles(index) {
    const that = this;
    Alert.confirm({
      title: 'delete',
      body: 'confirm？',
      surecb() {
        const topic = that.state.topic;
        const topicSingles = topic.singles;
        topicSingles.splice(index, 1);
        that.setState(topic);
      },
    });
  }
  openWorkoutsListModal() {
    this.openWorkoutCompont.getWrappedInstance().openModal();
  }
  openChallengeListModal() {
    this.challengeCompont.getWrappedInstance().openModal();
  }
  back() {
    this.props.router.goBack();
  }
  selectChallenge(challenge) {
    const topic = this.state.topic;
    topic.challenge = challenge;
    topic.challengeId = challenge.id;
    this.setState({ topic });
  }

  /* eslint-disable */
  render() {
    let topic = this.state.topic;
    if(!(topic.singles)){
      topic['singles']=[];
    }
    const challenge=topic.challenge;

    const success = this.state.success;
    return (
      <div>
            <Helmet title="TopicEdit" />
            <WorkoutsListModal ref={(m)=>{this.openWorkoutCompont=m}} pushWorkouts={this.addTopicSingles.bind(this)} />
            <ChallengesListModal ref={(m)=>{this.challengeCompont=m}} pushChallenges={this.selectChallenge.bind(this)} />
            
            <div className="box">
                {success && <div className="callout callout-success text-center">Your topic have been succesfully saved</div>}
                <div className="box-header">
                    <h3 className="box-title">Edit Topic</h3>
                  </div>
                <Form role="form" onSubmit={this.save.bind(this)}>
                    <div className="box-body">
                        <Row>
                            <Col lg={3} className="m-t10">Topic ID:</Col>
                            <Col lg={9} className="m-t10">{topic.id}</Col>
                          </Row>
                        
                        <Row className="m-t10">
                            <Col lg={3} className="m-t10">
                                <label className="m-t5">Topic Title:</label>
                              </Col>
                            <Col lg={9} className="m-t10">
                                <input type="text" className="form-control" style={{ maxWidth: '615px' }} required placeholder="" name="title" value={topic.title?topic.title:''} onChange={this.setTopic.bind(this)} />
                            </Col>
                        </Row>
                        <Row className='m-t10'>
                        <Col lg={3} md={3} className="m-t10">
                        <label className="m-t5">challenge</label>
                        </Col>
                        <Col lg={9} md={9} className="m-t10">
                            <button type="button" className="btn btn-default" style={{maxWidth:'615px'}} onClick={this.openChallengeListModal.bind(this)}>{challenge?challenge.code+' : '+challenge.title:'Select a challenge'}</button>
                         </Col>
                        </Row>

                        <Row>
                            <Col lg={3} className="m-t10">
                                <label className="m-t5">Associated Topic Singles:</label>
                              </Col>
                            <Col lg={9} className="m-t5">
                                {
                                 
                                    topic.singles.map(function(topicSingles, index) {
                                      let singles=topicSingles.singles;
                                       return (<div key={index} className="m-b5">
                                        <i onClick={this.upSingles.bind(this, index)} className="fa fa-arrow-up text-primary pointer m-r10" style={{ fontSize: '20px' }} />
                                        <text className="m-r5">{singles?singles.code+' : '+singles.title:''}</text>
                                        <i onClick={this.delSingles.bind(this, index)} className="fa fa-close text-danger pointer m-l10" style={{ fontSize: '20px' }} />
                                       </div>) 
                                      }
                                    ,this)
                                      
                                  
                                }
                                <i onClick={this.openWorkoutsListModal.bind(this)} className="fa fa-plus-square text-primary pointer" style={{ fontSize: '40px' }} />
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
    topic: state.topic,
  };
}
// 将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(topicActions, dispatch);
}

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopicEdit));

