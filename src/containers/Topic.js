/**
 * Created by qwr on 2017/9/18.
 */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import { topicActions } from '../actions';
import Alert from '../components/Alert';


class Topic extends Component {
  constructor(props) {
    super(props);
    this.timeout=null;
    this.state = {
      topic: [],
      success:false
    };
  }
  componentDidMount() {
    this.query();
  }
  componentWillUnmount(){
    if(this.timeout){
      clearTimeout(this.timeout); 
    }
  }
  query() {
    const { gettopic } = this.props;
    const that = this;
    gettopic({}, (res) => {
      that.setState({ topic: res });
    });
  }
  upTopic(index){
    const topic = this.state.topic;
    if (index != 0) {
      const before = topic[index - 1];
      const after = topic[index];
      topic[index - 1] = after;
      topic[index] = before;
      this.setState(topic);
    }
  }
  deleteTopic(index) {
    const that = this;
    
    if (this.state.topic.length === 1){
      Alert.alert({title:'Warn',body:"your topics must more than 1." });
      return;
    }
    Alert.confirm({
      title: 'delete',
      body: 'confirm？',
      surecb() {
        const topic = that.state.topic;
        topic.splice(index, 1);
        that.setState(topic);
      },
    });
  }
  timeoutSuccess(){
    if(this.timeout){
      clearTimeout(this.timeout);  
    }
    const that=this;
    this.timeout=setTimeout(function () {
      that.setState({success:false});
    }, 2000);

  }
  save(){
    const topics=this.state.topic;
    let sortList=[];
    
    for(var i=0;i<topics.length;i++){
      var topic=topics[i];
      var sort={};
      sort['id']=topic.id;
      sort['sort']=i;
      sortList.push(sort);
    }
    const that =this;
    const { sortTopic } = this.props;
    sortTopic(sortList, (res) => {

      that.timeoutSuccess();
      that.setState({ topic: res ,success:true});
          

    });
  }
  back() {
    this.props.router.goBack();
  }

  /* eslint-disable */
  render() {
    const topics = this.state.topic;
    const topicsSize=topics.length;
    const success=this.state.success;
    return (
      <div>
        <Helmet title="topic" />
         <div className="box">
         {success && <div className="callout callout-success text-center">Your topic have been succesfully saved</div>}

         <div className="box-header">
                        <h3 className="box-title">topic</h3>
                        <div className="box-tools">
                            <Link to={'/topic/0'}>
                                <button type="button" className="btn  btn-primary m-5" disabled={topicsSize>3?true:false}>Create New Topic { console.log('topic size:'+topicsSize)}</button>
                            </Link> 
                        </div>
                    </div>
          <div className="box-body">
          <Row>
              <Col lg={3} className="m-t10">
                <label className="m-t5">topic List:</label>
              </Col>
          </Row>
          <table  className="table table-bordered dataTable">
          <thead>
          <tr role="row">
            <th >id </th>
            <th >title </th> 
            <th >challenges code and title</th> 
            <th >sort</th> 
            <th >delete topic</th> 
          </tr>
          </thead>
          <tbody>
          {topics.map(function(topic, index){
              let challenge=topic.challenge;
               return (<tr key={index}>
                  <td><Link to={'/topic/'+topic.id}>{topic.id}</Link></td>
                  <td>{topic.title}</td>
                  <td>{challenge?(challenge.code+':'+challenge.title):''}</td>
                  <td><i onClick={this.upTopic.bind(this, index)} className="fa fa-arrow-up text-primary pointer m-r10" style={{ fontSize: '20px' }} /></td>
                  <td><button type="button" className="btn  btn-primary" onClick={this.deleteTopic.bind(this,index)}>delete</button></td>
                  </tr>)
          },this
          )}
          </tbody>
          </table>
          </div>
          <div className="box-footer clearfix">
          <Row>
              <Col lg={12} className="col-md-offset-3">
                  <button type="submit" className="btn  btn-primary" onClick={this.save.bind(this)}>Save</button>
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
    topic: state.topic,
  };
}
// 将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(topicActions, dispatch);
}

// 通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Topic));

