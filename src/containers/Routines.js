/**
 * Created by qwr on 2017/9/13.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from "react-router";
import {Col, Pagination} from "react-bootstrap"
import {routinesActions} from '../actions'
import Alert from '../components/Alert';
class Routines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            condition:{
                sortKey:'id',
                sortType:1, //1升-1降
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
        const {queryRoutines} = this.props;
        queryRoutines(condition);
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
    render() {
        const routines = this.props.routines.list||[];
        var condition=this.state.condition;
        return (
            <div>
                <Helmet title="Routines"/>
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Routines</h3>
                        <div className="box-tools">
                            <Link to={'/routinesedit/0'}>
                                <button type="button"  className="btn  btn-primary m-5">Create New Routine</button>
                            </Link>
                            <button type="button" className="btn btn-success pull-right m-5">
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
                                <th className={condition.sortKey=='display'?(condition.sortType==1?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'display')}>Display in Workout detail page?</th>
                                <th className={condition.sortKey=='startedTimes'?(condition.sortType==1?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'started')}>Number of times started</th>
                                <th className={condition.sortKey=='skippedTimes'?(condition.sortType==1?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'skipped')}>Number of times skipped</th>
                            </tr>
                            </thead>
                            <tbody>
                            {routines.map((routine, index) =>
                            <tr key={index}>
                                <td><Link to={'/routinesedit/'+routine.id}>{routine.id}</Link></td>
                                <td>{routine.code}</td>
                                <td>{routine.title}</td>
                                <td>{routine.duration}</td>
                                <td>{routine.display?'yes':'no'}</td>
                                <td>{routine.startedTimes}</td>
                                <td>{routine.skippedTimes}</td>
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
        routines: state.routines
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(routinesActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Routines))