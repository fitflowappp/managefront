/**
 * Created by qwr on 2017/9/14.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from "react-router";
import {upload} from '../common/fetch'
import {Col, Form, Pagination, Row} from "react-bootstrap"
import {routinesActions} from '../actions'
import Alert from '../components/Alert';
class RoutinesEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routine:{
                code:'',
                title:'',
                duration:'',
                display:true,
                video:null,
            },
            success:false,
        };
    }
    componentDidMount() {
        var id=this.props.routeParams.id;
        if(id!=0){
            const {getRoutines} = this.props;
            const that=this;
            getRoutines({id:id},function (res) {
                that.setState({
                    routine:res.content,
                })
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    save(event) {
        event.preventDefault();
        const {postRoutines,putRoutines} = this.props;
        var routine = this.state.routine;
        var that=this;
        if(!routine.id){
            postRoutines(routine,function (res) {
                if(res.result.code==1){
                    that.setState({
                        success:true,
                    })
                    that.back();
                }
                Alert.info({info:res.result.msg});

            });
        }else{
            putRoutines(routine,function (res) {
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
        var routine = this.state.routine;
        upload(e,function (percentCompleted) {
            that.setState({
                process:(percentCompleted*100)+'%',
            })
        }).after(function (res) {
            routine[name]=res[0];
            that.setState(routine)
        });
    }
    setRoutine(e){
        var name = e.target.getAttribute('name');
        var value = e.target.value;
        var routine = this.state.routine;
        if(name=='display'){
            value=!routine.display;
        }
        routine[name]=value;
        this.setState(routine);
    }
    back(){
        this.props.router.goBack();
    }
    render() {
        var routine=this.state.routine;
        var success=this.state.success;
        var process=this.state.process;
        return (
            <div>
                <Helmet title="RoutinesEdit"/>
                <div className="box">
                    {success&&<div className="callout callout-success text-center">Your changes have been succesfully saved</div>}
                    <div className="box-header">
                        <h3 className="box-title">Edit Routine</h3>
                    </div>
                    <Form role="form"  onSubmit = {this.save.bind(this)}>
                       <div className="box-body">
                           <Row>
                               <Col lg={3} className="m-t10">Routine ID:</Col>
                               <Col lg={9} className="m-t10">{routine.id}</Col>
                           </Row>
                           <Row>
                               <Col lg={3} className="m-t10">Number of times started:</Col>
                               <Col lg={9} className="m-t10"></Col>
                           </Row>
                           <Row>
                               <Col lg={3} className="m-t10">Number of times skipped:</Col>
                               <Col lg={9} className="m-t10"></Col>
                           </Row>
                        <Row className="m-t40">
                            <Col lg={3} className="m-t10">
                                <label  className="m-t5">Routine Code:</label>
                            </Col>
                            <Col lg={9} className="m-t10">
                                <input type="text"  className="form-control" style={{maxWidth:'615px'}} required={true} placeholder="" name="code" value={routine.code} onChange={this.setRoutine.bind(this)}/>
                            </Col>

                            <Col lg={3} className="m-t10">
                                <label className="m-t5">Routine Title:</label>
                            </Col>
                            <Col lg={9} className="m-t10">
                                <input type="text"  className="form-control" style={{maxWidth:'615px'}} required={true} placeholder="" name="title" value={routine.title} onChange={this.setRoutine.bind(this)}/>
                            </Col>

                            <Col lg={3} className="m-t10">
                                <label htmlFor="Code" className="m-t5">Routine Duration:</label>
                            </Col>
                            <Col lg={9} className="m-t10">
                                <input type="text"  className="form-control" style={{maxWidth:'615px'}} required={true} placeholder="" name="duration" value={routine.duration} onChange={this.setRoutine.bind(this)}/>
                            </Col>
                            <Col lg={3} className="m-t10">
                                <label htmlFor="Code" className="m-t5">Routine Video:</label>
                            </Col>
                            <Col lg={3} className="m-t10">
                                <input type="file" name="video"  onChange={this.uploadFile.bind(this)}/>

                                {(process&&process!='100%')&&<div className="progress m-t5" style={{width:'200px',marginBottom:'auto',verticalAlign:'middle'}}>
                                    <div className="progress-bar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width: this.state.process}}>
                                    </div>
                                </div>}
                            </Col>
                            <Col lg={6} className="m-t10">
                                {routine.video&&
                                <video width={200} src={routine.video.contentUri} controls="controls">
                                    您的浏览器不支持 video 标签。
                                </video>
                                }
                            </Col>
                            <Col lg={12}>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" name="display" checked={routine.display}  onChange={this.setRoutine.bind(this)}/>Display in Workout detail page?
                                    </label>
                                </div>
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
        routines: state.routines
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(routinesActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoutinesEdit))