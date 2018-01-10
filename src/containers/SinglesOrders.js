/**
 * Created by qwr on 2017/9/18.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from "react-router";
import {Col, Form, Pagination, Row} from "react-bootstrap"
import {singlesordersActions} from '../actions'
import {getTime} from '../common'
import Alert from '../components/Alert';
import WorkoutsListModal from '../components/modal/WorkoutsListModal';

class SinglesOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singlesOrders:[],
            success:false,
        };
    }
    componentDidMount() {
        this.query();
    }
    componentDidUpdate(prevProps, prevState) {

    }
    query() {
        const {querySinglesOrders} = this.props;
        const that=this;
        querySinglesOrders({},function(res){
        	that.getSinglesListFromNetwork(res);
        });
    }
    getSinglesListFromNetwork(result){
    	var content=result['content'];
        if (content) {
        	this.setState({
        			singlesOrders:content
        	});
        }
    }
   

    addSingle(singles){
        var that=this;
        const {addSinglesWorkout} = this.props;
        console.log("id:"+singles['id']);
        addSinglesWorkout({id:singles['id']},function (res) {
            that.getSinglesListFromNetwork(res);
            that.setState({success:true});
        });
    }

    openWorkoutsListModal(){
        this.refs['WorkoutsListModal'].getWrappedInstance().openModal();
    }
    //排序routines
    upSingles(index){
        var singlesOrders = this.state.singlesOrders;
        const that=this;
        if(index!=0){
            var before=singlesOrders[index-1];
            var after=singlesOrders[index];
            const {updateSinglesSort} = this.props;
            console.log("sort:"+before['singlesSort']);
            updateSinglesSort({id:after['id'],sort:(""+before['singlesSort'])},function(res){
            	that.getSinglesListFromNetwork(res);
            })
           
        }
    }
    //删除routines
    delSingles(index) {
        var that=this;
        const {deleteSinglesOrders} = this.props;
        
        Alert.confirm({
            title: 'delete', body: "confirm？", surecb: function () {
                var singlesOrders = that.state.singlesOrders;
                var workout=singlesOrders[index];
               deleteSinglesOrders({id:workout['id']},function(res){
               	that.getSinglesListFromNetwork(res);
               })
            }
        });
    }
    back(){
        this.props.router.goBack();
    }
    render() {
    	var singlesOrders=this.state.singlesOrders;
       	var success=this.state.success;
        return (
        	 
            <div>
                <Helmet title="Edit SinglesOrders"/>
                 <WorkoutsListModal ref="WorkoutsListModal" pushWorkouts={this.addSingle.bind(this)}/>

                <div className="box">                    
                        <div className="box-body">
                            
                            <Row>
                                <Col lg={3} className="m-t10">
                                    <label className="m-t5">singles Orders:</label>
                                </Col>
                                <Col lg={9}  className="m-t5">
                                    {singlesOrders.map((singles, index) =>
                                        <div key={index} className="m-b5">
                                            <i onClick={this.upSingles.bind(this,index)} className="fa fa-arrow-up text-primary pointer m-r10" style={{fontSize:'20px'}}></i>
                                            <text className="m-r5">Workout</text>{singles.title}
                                            <i onClick={this.delSingles.bind(this,index)} className="fa fa-close text-danger pointer m-l10" style={{fontSize:'20px'}}></i>
                                        </div>
                                    )}
                                     <i onClick={this.openWorkoutsListModal.bind(this)} className="fa fa-plus-square text-primary pointer" style={{fontSize:'40px'}}></i>

                                </Col>
                            </Row>
                        </div>

                        <div className="box-footer clearfix">
                            <Row>
                                <Col lg={12} className="col-md-offset-3">
                                    <button type="button" className="btn btn-default m-l10" onClick={this.back.bind(this)}>Back</button>
                                </Col>
                            </Row>
                        </div>
                    
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        singlesOrders: state.singlesOrders
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(singlesordersActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SinglesOrder))

