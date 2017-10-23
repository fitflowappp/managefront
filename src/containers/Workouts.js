/**
 * Created by qwr on 2017/9/15.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from "react-router";
import {Col, Pagination} from "react-bootstrap"
import {workoutsActions} from '../actions'
import Alert from '../components/Alert';
class Workouts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            condition:{
                sortKey:'id',
                sortType:1, //1升0降
            },
        };
    }
    componentDidMount() {
        var condition=this.props.location.query;
        if(!condition.sortKey){
            condition=this.state.condition;
        }else{

            this.setState({
                condition:condition,
            })
        }
        this.query(condition);
    }
    componentDidUpdate(prevProps, prevState) {

    }
    query(condition) {
        const {queryWorkouts} = this.props;
        queryWorkouts(condition);
    }
    setCondition(sortKey){
        var condition=this.state.condition;
        var sortType;

        if(sortKey==condition.sortKey){
            if(condition.sortType==1){
                sortType=-1;
            }else{
                sortType=1;
            }
        }else{
            sortType=1;
        }

        condition.sortKey=sortKey;
        condition.sortType=sortType;

        this.setState(condition);
        this.query(condition);
        this.props.router.replace({pathname: this.props.location.pathname, query: condition});
    }
    copy(workout){
        const {copyWorkout} = this.props;
        const that=this;
        copyWorkout({id:workout.id,title:workout.title},function (res) {
            if(res.result.code==1){
                that.query(that.state.condition);
            }
            Alert.info({info:res.result.msg});
        });
    }
    csv(){
        window.location.href='/api/manage/yoga/workout/csv';
    }
    render() {
        const workouts = this.props.workouts.list||[];
        var condition=this.state.condition;
        return (
            <div>
                <Helmet title="Workouts"/>
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Workouts</h3>
                        <div className="box-tools">
                            <Link to={'/workoutsedit/0'}>
                                <button type="button"  className="btn  btn-primary m-5">Create New Workout</button>
                            </Link>
                            <button type="button" className="btn btn-success pull-right m-5" onClick={this.csv.bind(this)}>
                                <i className="fa fa-download"></i>Export csv
                            </button>
                        </div>
                    </div>
                    <div className="box-body table-responsive">
                        <table  className="table table-bordered dataTable">
                            <thead>
                            <tr role="row">
                                <th className={condition.sortKey=='id'?(condition.sortType==1?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'id')}>ID</th>
                                <th className={condition.sortKey=='code'?(condition.sortType==1?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'code')}>Code</th>
                                <th className={condition.sortKey=='title'?(condition.sortType==1?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'title')}>Title</th>
                                <th className={condition.sortKey=='duration'?(condition.sortType==1?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'duration')}>Duration</th>
                                <th className={condition.sortKey=='startedTimes'?(condition.sortType==1?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'startedTimes')}>times started</th>
                                <th className={condition.sortKey=='completedTimes'?(condition.sortType==1?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'completedTimes')}>times completed</th>
                                <th className={condition.sortKey=='startedUserCount'?(condition.sortType==1?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'startedUserCount')}>unique users started</th>
                                <th className={condition.sortKey=='completedUserCount'?(condition.sortType==1?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'completedUserCount')}>unique users completed</th>
                                <th className={condition.sortKey=='totalDuration'?(condition.sortType==1?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'totalDuration')}>Total duration of being watched</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {workouts.map((workout, index) =>
                                <tr key={index}>
                                    <td><Link to={'/workoutsedit/'+workout.id}>{workout.id}</Link></td>
                                    <td>{workout.code}</td>
                                    <td>{workout.title}</td>
                                    <td>{workout.duration}</td>
                                    <td>{workout.startedTimes}</td>
                                    <td>{workout.completedTimes}</td>
                                    <td>{workout.startedUserCount}</td>
                                    <td>{workout.completedUserCount}</td>
                                    <td>{workout.totalDuration}</td>
                                    <td>
                                        <button type="button"  className="btn  btn-default m-5" onClick={this.copy.bind(this,workout)}>copy</button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/*<div className="box-footer clearfix">
                     <div className="pull-right">
                     <Pagination
                     prev
                     next
                     first
                     last
                     ellipsis
                     boundaryLinks
                     items={3}
                     maxButtons={5}
                     activePage={this.state.activePage}
                     onSelect={this.handleSelect.bind(this)}
                     />
                     </div>
                     </div>*/}
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        workouts: state.workouts
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(workoutsActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Workouts))