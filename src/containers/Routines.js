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
                sortkey:'id',
                sorttype:1, //1升0降
            },
        };
    }
    componentDidMount() {
        var condition=this.props.location.query;
        if(!condition.sortkey){
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
    setCondition(sortkey){
        var condition=this.state.condition;
        var sorttype;

        if(sortkey==condition.sortkey){
            sorttype=Number(!condition.sorttype);
        }else{
            sorttype=1;
        }

        condition.sortkey=sortkey;
        condition.sorttype=sorttype;

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
                                <th className={condition.sortkey=='id'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'id')}>ID</th>
                                <th className={condition.sortkey=='code'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'code')}>Code</th>
                                <th className={condition.sortkey=='title'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'title')}>Title</th>
                                <th className={condition.sortkey=='duration'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'duration')}>Duration</th>
                                <th className={condition.sortkey=='display'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'display')}>Display in Workout detail page?</th>
                                <th className={condition.sortkey=='started'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'started')}>Number of times started</th>
                                <th className={condition.sortkey=='skipped'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'skipped')}>Number of times skipped</th>
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
                                <td></td>
                                <td></td>
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