/**
 * Created by qwr on 2017/9/18.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from "react-router";
import {Col, Form, Pagination, Row} from "react-bootstrap"
import {upload} from '../common/fetch'
import {challengesActions} from '../actions'
import Alert from '../components/Alert';
import WorkoutsListModal from '../components/modal/WorkoutsListModal';
class ChallengesEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenge:{
                code:'',
                title:'',
                subTitle:'',
                description:'',
                coverImg:null,
                workouts:[],
            },
            success:false,
        };
    }
    componentDidMount() {
        var id=this.props.routeParams.id;
        if(id!=0){
            const {getChallenges} = this.props;
            const that=this;
            getChallenges({id:id},function (res) {
                that.setState({
                    challenge:res.content,
                })
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    save(event) {
        event.preventDefault();
        const {postChallenges,putChallenges} = this.props;
        var challenge = this.state.challenge;
        var that=this;
        if(!challenge.id){
            postChallenges(challenge,function (res) {
                if(res.result.code==1){
                    that.setState({
                        success:true,
                    })
                }
                Alert.info({info:res.result.msg});
            });
        }else{
            putChallenges(challenge,function (res) {
                if(res.result.code==1){
                    that.setState({
                        success:true,
                    })
                }
                Alert.info({info:res.result.msg});
            });
        }

    }
    uploadFile(e) {
        const target = e.target;
        const name = target.name;
        const that = this;
        var challenge = this.state.challenge;
        upload(e).after(function (res) {
            challenge[name]=res[0];
            that.setState(challenge)
        });
    }
    setChallenge(e){
        var target=e.target;
        var name =target.getAttribute('name');
        var challenge = this.state.challenge;
        var value = target.value;
        challenge[name]=value;
        this.setState(challenge);
    }
    pushWorkouts(obj){
        var challenge = this.state.challenge;
        challenge.workouts.push(obj);
        this.setState(challenge);
    }
    openWorkoutsListModal(){
        this.refs['WorkoutsListModal'].getWrappedInstance().openModal();
    }
    //排序routines
    upChallenge(index){
        var challenge = this.state.challenge;
        var workouts=challenge.workouts;
        if(index!=0){
            var before=workouts[index-1];
            var after=workouts[index];
            workouts[index-1]=after;
            workouts[index]=before;
            this.setState(challenge);
        }
    }
    //删除routines
    delChallenge(index) {
        Alert.confirm({
            title: 'delete', body: "confirm？", surecb: function () {
                var workout = this.state.workout;
                var routines = workout.routines;
                routines.splice(index, 1);
                this.setState(workout);
            }
        });
    }
    back(){
        this.props.router.goBack();
    }
    render() {
        var challenge=this.state.challenge;
        var success=this.state.success;
        return (
            <div>
                <Helmet title="Edit Challenge"/>
                <WorkoutsListModal ref="WorkoutsListModal" pushWorkouts={this.pushWorkouts.bind(this)}/>
                <div className="box">
                    {success&&<div className="callout callout-success text-center">Your changes have been succesfully saved</div>}
                    <div className="box-header">
                        <h3 className="box-title">Edit Challenge</h3>
                    </div>
                    <Form role="form"  onSubmit = {this.save.bind(this)}>
                        <div className="box-body">
                            <Row>
                                <Col lg={3} className="m-t10">Challenge ID:</Col>
                                <Col lg={9} className="m-t10">{}</Col>
                            </Row>
                            <Row>
                                <Col lg={3} className="m-t10">Number of times started:</Col>
                                <Col lg={3} className="m-t10"></Col>

                                <Col lg={3} className="m-t10">Number of unique users started:</Col>
                                <Col lg={3} className="m-t10"></Col>
                            </Row>
                            <Row>
                                <Col lg={3} className="m-t10">Number of times completed:</Col>
                                <Col lg={3} className="m-t10"></Col>

                                <Col lg={3} className="m-t10">Number of unique users completed:</Col>
                                <Col lg={3} className="m-t10"></Col>
                            </Row>
                            <Row className="m-t40">
                                <Col lg={3} className="m-t10">
                                    <label  className="m-t5">Challenge Code:</label>
                                </Col>
                                <Col lg={9} className="m-t10">
                                    <input type="text"  className="form-control" style={{maxWidth:'615px'}} required={true} placeholder="" name="code" value={challenge.code} onChange={this.setChallenge.bind(this)}/>
                                </Col>

                                <Col lg={3} className="m-t10">
                                    <label className="m-t5">Challenge Title:</label>
                                </Col>
                                <Col lg={9} className="m-t10">
                                    <input type="text"  className="form-control" style={{maxWidth:'615px'}} required={true} placeholder="" name="title" value={challenge.title} onChange={this.setChallenge.bind(this)}/>
                                </Col>
                                <Col lg={3} className="m-t10">
                                    <label className="m-t5">Challenge Subtitle:</label>
                                </Col>
                                <Col lg={9} className="m-t10">
                                    <input type="text"  className="form-control" style={{maxWidth:'615px'}} required={true} placeholder="" name="subTitle" value={challenge.subTitle} onChange={this.setChallenge.bind(this)}/>
                                </Col>
                                <Col lg={3} className="m-t10">
                                    <label className="m-t5">Challenge Description:</label>
                                </Col>
                                <Col lg={9} className="m-t10">
                                    <input type="text"  className="form-control" style={{maxWidth:'615px'}} required={true} placeholder="" name="description" value={challenge.description} onChange={this.setChallenge.bind(this)}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={3} className="m-t10">
                                    <label className="m-t5">Challenge Image:</label>
                                </Col>
                                <Col lg={3} className="m-t10">
                                    <input type="file" name="coverImg"  onChange={this.uploadFile.bind(this)}/>
                                </Col>
                                <Col lg={6} className="m-t10">
                                    {challenge.coverImg&&
                                    <img src={challenge.coverImg.contentUri} alt="Challenge Image" width={100}/>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={3} className="m-t10">
                                    <label className="m-t5">Challenge Workouts:</label>
                                </Col>
                                <Col lg={9}  className="m-t5">
                                    {challenge.workouts.map((workout, index) =>
                                        <div key={index} className="m-b5">
                                            <i onClick={this.upChallenge.bind(this,index)} className="fa fa-arrow-up text-primary pointer m-r10" style={{fontSize:'20px'}}></i>
                                            Workout{workout.code}:{workout.title}
                                            <i onClick={this.delChallenge.bind(this,index)} className="fa fa-close text-danger pointer m-l10" style={{fontSize:'20px'}}></i>
                                        </div>
                                    )}
                                    <i onClick={this.openWorkoutsListModal.bind(this)} className="fa fa-plus-square text-primary pointer" style={{fontSize:'40px'}}></i>
                                </Col>
                            </Row>
                        </div>

                        <div className="box-footer clearfix">
                            <Row>
                                <Col lg={12} className="col-md-offset-3">
                                    <button type="submit"  className="btn  btn-primary" >Save</button>
                                    <button type="button" className="btn btn-default m-l10" onClick={this.back.bind(this)}>Back</button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        challenges: state.challenges
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(challengesActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChallengesEdit))