'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

var _actions = require('../actions');

var _Alert = require('../components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by qwr on 2017/9/18.
 */
var Challenges = function (_Component) {
    (0, _inherits3.default)(Challenges, _Component);

    function Challenges(props) {
        (0, _classCallCheck3.default)(this, Challenges);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            condition: {
                sortKey: 'id',
                sortType: 1 //1升0降
            }
        };
        return _this;
    }

    Challenges.prototype.componentDidMount = function componentDidMount() {
        var condition = this.props.location.query;
        if (!condition.sortKey) {
            condition = this.state.condition;
        } else {

            this.setState({
                condition: condition
            });
        }
        this.query(condition);
    };

    Challenges.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

    Challenges.prototype.query = function query(condition) {
        var queryChallenges = this.props.queryChallenges;

        queryChallenges(condition);
    };

    Challenges.prototype.setCondition = function setCondition(sortKey) {
        var condition = this.state.condition;
        var sortType;

        if (sortKey == condition.sortKey) {
            if (condition.sortType == 1) {
                sortType = -1;
            } else {
                sortType = 1;
            }
        } else {
            sortType = 1;
        }

        condition.sortKey = sortKey;
        condition.sortType = sortType;

        this.setState(condition);
        this.query(condition);
        this.props.router.replace({ pathname: this.props.location.pathname, query: condition });
    };

    Challenges.prototype.csv = function csv() {
        window.location.href = "/api/manage/yoga/challenge/csv";
    };

    Challenges.prototype.render = function render() {
        var challenges = this.props.challenges.list || [];
        var condition = this.state.condition;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'Challenges' }),
            _react2.default.createElement(
                'div',
                { className: 'box' },
                _react2.default.createElement(
                    'div',
                    { className: 'box-header' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'box-title' },
                        'Challenges'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'box-tools' },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/challengesorders' },
                            _react2.default.createElement(
                                'button',
                                { type: 'button', className: 'btn  btn-default m-5' },
                                'Manage Challenge Order'
                            )
                        ),
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/challengesedit/0' },
                            _react2.default.createElement(
                                'button',
                                { type: 'button', className: 'btn  btn-primary m-5' },
                                'Create New Challenge'
                            )
                        ),
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-success pull-right m-5', onClick: this.csv.bind(this) },
                            _react2.default.createElement('i', { className: 'fa fa-download' }),
                            'Export csv'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'box-body table-responsive' },
                    _react2.default.createElement(
                        'table',
                        { className: 'table table-bordered dataTable' },
                        _react2.default.createElement(
                            'thead',
                            null,
                            _react2.default.createElement(
                                'tr',
                                { role: 'row' },
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortKey == 'id' ? condition.sortType == 1 ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'id') },
                                    'ID'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortKey == 'code' ? condition.sortType == 1 ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'code') },
                                    'Code'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortKey == 'title' ? condition.sortType == 1 ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'title') },
                                    'Title'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortKey == 'timesStarted' ? condition.sortType == 1 ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'timesStarted') },
                                    'times started'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortKey == 'timesCompleted' ? condition.sortType == 1 ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'timesCompleted') },
                                    'times completed'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortKey == 'usersStarted' ? condition.sortType == 1 ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'usersStarted') },
                                    'unique users started'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortKey == 'usersCompleted' ? condition.sortType == 1 ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'usersCompleted') },
                                    'unique users completed'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            challenges.map(function (challenge, index) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: index },
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            _reactRouter.Link,
                                            { to: '/challengesedit/' + challenge.id },
                                            challenge.id
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        challenge.code
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        challenge.title
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        challenge.startedTimes
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        challenge.completedTimes
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        challenge.startedUserCount
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        challenge.completedUserCount
                                    )
                                );
                            })
                        )
                    )
                )
            )
        );
    };

    return Challenges;
}(_react.Component);

function mapStateToProps(state) {
    return {
        challenges: state.challenges
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.challengesActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(Challenges));
//# sourceMappingURL=Challenges.js.map
