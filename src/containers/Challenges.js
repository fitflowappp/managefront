/**
 * Created by qwr on 2017/9/18.
 */
import React, {Component, PropTypes} from 'react'
import Helmet from "react-helmet"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link, withRouter} from "react-router";
import {Col, Pagination} from "react-bootstrap"
import {challengesActions} from '../actions'
import Alert from '../components/Alert';
class Challenges extends Component {
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
        const {queryChallenges} = this.props;
        queryChallenges(condition);
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
        const challenges = this.props.challenges.list||[];
        var condition=this.state.condition;
        return (
            <div>
                <Helmet title="Challenges"/>
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Challenges</h3>
                        <div className="box-tools">
                            <Link to={'/challengesorders'}>
                                <button type="button"  className="btn  btn-default m-r10">Manage Challenge Order</button>
                            </Link>
                            <Link to={'/challengesedit/0'}>
                                <button type="button"  className="btn  btn-primary">Create New Challenge</button>
                            </Link>
                            <button type="button" className="btn btn-success pull-right m-l10">
                                <i className="fa fa-download"></i>Export csv
                            </button>
                        </div>
                    </div>
                    <div className="box-body">
                        <table  className="table table-bordered dataTable">
                            <thead>
                            <tr role="row">
                                <th className={condition.sortkey=='id'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'id')}>ID</th>
                                <th className={condition.sortkey=='code'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'code')}>Code</th>
                                <th className={condition.sortkey=='title'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'title')}>Title</th>
                                <th className={condition.sortkey=='duration'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'duration')}>Sequence in Challenge Homepage</th>
                                <th className={condition.sortkey=='timesStarted'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'timesStarted')}>times started</th>
                                <th className={condition.sortkey=='timesCompleted'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'timesCompleted')}>times completed</th>
                                <th className={condition.sortkey=='usersStarted'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'usersStarted')}>unique users started</th>
                                <th className={condition.sortkey=='usersCompleted'?(condition.sorttype?"sorting_asc":"sorting_desc"):'sorting'} onClick={this.setCondition.bind(this,'usersCompleted')}>unique users completed</th>
                            </tr>
                            </thead>
                            <tbody>
                            {challenges.map((challenge, index) =>
                                <tr key={index}>
                                    <td><Link to={'/challengesedit/'+challenge.id}>{challenge.id}</Link></td>
                                    <td>{challenge.code}</td>
                                    <td>{challenge.title}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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
        challenges: state.challenges
    }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(challengesActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Challenges))