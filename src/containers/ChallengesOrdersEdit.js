/**
 * Created by qwr on 2017/9/18.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from "react-router";
import {Col, Form, Pagination, Row} from "react-bootstrap"
import {challengeordersActions} from '../actions'
import Alert from '../components/Alert';
import ChallengesListModal from '../components/modal/ChallengesListModal';
class ChallengesOrderEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challengeOrder:{
                challenges:[],
            },
            success:false,
        };
    }
    componentDidMount() {
        var id=this.props.routeParams.id;
        if(id!=0){
            const {getChallengeOrders} = this.props;
            const that=this;
            getChallengeOrders({id:id},function (res) {
                if(!res.content.challenges){
                    res.content.challenges=[];
                }
                that.setState({
                    challengeOrder:res.content,
                })
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    save(event){
        event.preventDefault();
        const {putChallengeOrders} = this.props;
        var that=this;
        putChallengeOrders(this.state.challengeOrder,function (res) {
            if(res.result.code==1){
                that.setState({
                    success:true,
                })
            }
            Alert.info({info:res.result.msg});
        });
    }
    pushChallenges(obj){
        obj.unlocked=false;
        var challengeOrder = this.state.challengeOrder;
        challengeOrder.challenges.push(obj);
        this.setState(challengeOrder);
    }
    upChallenge(index){
        var challengeOrder = this.state.challengeOrder;
        var challenges=challengeOrder.challenges;
        if(index!=0){
            var before=challenges[index-1];
            var after=challenges[index];
            challenges[index-1]=after;
            challenges[index]=before;
            this.setState(challengeOrder);
        }
    }
    delChallenge(index) {
        var that=this;
        Alert.confirm({
            title: 'delete', body: "confirm？", surecb: function () {
                var challengeOrder = that.state.challengeOrder;
                challengeOrder.challenges.splice(index, 1);
                that.setState(challengeOrder);
            }
        });
    }
    openChallengesListModal(){
        this.refs['ChallengesListModal'].getWrappedInstance().openModal();
    }
    set(index,e){
        var name =e.target.getAttribute('name');
        var challengeOrder = this.state.challengeOrder;
        var  value=!challengeOrder.challenges[index].unlocked;
        challengeOrder.challenges[index][name]=value;
        this.setState(challengeOrder);
    }
    back(){
        this.props.router.goBack();
    }
    render() {
        const challenges = this.state.challengeOrder.challenges;
        var success=this.state.success;
        return (
            <div>
                <Helmet title="Manage Challenge Order"/>
                <ChallengesListModal ref="ChallengesListModal" pushChallenges={this.pushChallenges.bind(this)}/>
                {success&&<div className="callout callout-success text-center">Your changes have been succesfully saved</div>}
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Manage Challenge Order</h3>
                    </div>
                    <Form role="form"  onSubmit = {this.save.bind(this)}>
                        <div className="box-body">
                            {challenges&&challenges.map((challenge, index) =>
                                <div key={index} className="m-b5">
                                    <i onClick={this.upChallenge.bind(this,index)} className="fa fa-arrow-up text-primary pointer m-r10" style={{fontSize:'20px'}}></i>
                                    Challenge{challenge.code}:{challenge.title}
                                    <i onClick={this.delChallenge.bind(this,index)} className="fa fa-close text-danger pointer m-l10 m-r10" style={{fontSize:'20px'}}></i>
                                    <input type="checkbox" name="unlocked" checked={challenge.unlocked} onChange={this.set.bind(this,index)}/>unlocked?
                                </div>
                            )}
                            <i onClick={this.openChallengesListModal.bind(this)} className="fa fa-plus-square text-primary pointer" style={{fontSize:'40px'}}></i>
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
        challengeorders: state.challengeorders
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(challengeordersActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChallengesOrderEdit))
