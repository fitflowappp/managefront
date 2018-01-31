/**
 * Created by qwr on 2017/9/13.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import {Col, Form, Pagination, Panel, Row} from "react-bootstrap"
import {milestonesActions} from '../actions'
import Alert from '../components/Alert';
class Milestones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            milestone:{
                achievementMinutes: 0,
                achievementMinutesContent: "",

                achievementWorkoutNum: 0,
                achievementWorkoutContent: "",
            },
            success:false,
        };
    }

    componentDidMount() {
        this.query();
    }

    componentDidUpdate(prevProps, prevState) {

    }

    query() {
        const {getMileStones} = this.props;
        const that=this;
        getMileStones({},function (res) {
            if(!res.content.achievementMinutesContent){
                res.content.achievementMinutesContent='';
            }
            if(!res.content.achievementWorkoutContent){
                res.content.achievementWorkoutContent='';
            }
            that.setState({
                milestone:res.content,
            })
        })
    }
    save(event){
        event.preventDefault();
        const {putMileStones} = this.props;
        const that=this;
        putMileStones(this.state.milestone,function (res) {
            if(res.result.code==1){
                that.setState({
                    success:true,
                })
            }
            Alert.info({info:res.result.msg})
        })
    }

    set(e){
        const name = e.target.getAttribute('name');
        const value = e.target.value;
        var milestone = this.state.milestone;
        milestone[name]=value;
        this.setState(milestone)
    }

    back(){
        window.history.go(-1);
    }
    render() {
        const milestone=this.state.milestone;
        const success=this.state.success;
        return (
            <div>
                <Helmet title="Milestones"/>
                <div className="box">
                    {success&&<div className="callout callout-success text-center">Your changes have been succesfully saved</div>}
                    <div className="box-header">
                        <h3 className="box-title">Edit Milestones</h3>
                    </div>
                    <Form role="form"  onSubmit = {this.save.bind(this)}>
                        <div className="box-body">
                            <Panel style={{maxWidth:'600px'}}>
                                <p>Exercise Minutes</p>
                                <p>Users will receive an achievement after every how many total exercise minutes?</p>
                                <Row style={{maxWidth:'600px'}}>
                                    <Col sm={2} className="m-t5"><text>2</text></Col>
                                    <Col sm={8} className="m-t5">
                                        <input type="range" min="2" max="100" name="achievementMinutes"   value={milestone.achievementMinutes} step={1} onChange={this.set.bind(this)}/>
                                    </Col>
                                    <Col sm={2} className="m-t5"><text>100</text></Col>
                                    <Col sm={12}><p className="text-center text-primary">{milestone.achievementMinutes}</p></Col>
                                    <Col sm={12} className="m-t5">
                                        <label  className="m-t5">Pop-up box message for exercise minutes milestone:</label>
                                    </Col>
                                    <Col sm={12} className="m-t5">
                                        <input type="text"  className="form-control" style={{maxWidth:'615px'}} required={true} placeholder="" name="achievementMinutesContent" value={milestone.achievementMinutesContent} onChange={this.set.bind(this)}/>
                                    </Col>
                                </Row>
                            </Panel>
                            <Panel style={{maxWidth:'600px'}} className="m-t40">
                                <p>Total Workouts</p>
                                <p>Users will receive an achievement after every how many total workouts?</p>
                                <Row style={{maxWidth:'600px'}}>
                                    <Col sm={2}><text>1</text></Col>
                                    <Col sm={8}>
                                        <input type="range" min="1" max="20" name="achievementWorkoutNum"   value={milestone.achievementWorkoutNum} step={1} onChange={this.set.bind(this)}/>
                                    </Col>
                                    <Col sm={2}><text>20</text></Col>
                                    <Col sm={12}><p className="text-center text-primary">{milestone.achievementWorkoutNum}</p></Col>
                                    <Col sm={12} className="m-t5">
                                        <label  className="m-t5">Pop-up box message for total wokrouts milestone:</label>
                                    </Col>
                                    <Col sm={12} className="m-t5">
                                        <input type="text"  className="form-control" style={{maxWidth:'615px'}} required={true} placeholder="" name="achievementWorkoutContent" value={milestone.achievementWorkoutContent} onChange={this.set.bind(this)}/>
                                    </Col>
                                </Row>
                            </Panel>

                        </div>

                        <div className="box-footer clearfix">
                            <button type="submit"  className="btn  btn-primary">Save</button>
                            <button type="button" className="btn btn-default m-l10" onClick={this.back.bind(this)}>Back</button>
                        </div>
                    </Form>

                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        milestones: state.milestones
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(milestonesActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Milestones))