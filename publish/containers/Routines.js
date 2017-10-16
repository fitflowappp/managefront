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
 * Created by qwr on 2017/9/13.
 */
var Routines = function (_Component) {
    (0, _inherits3.default)(Routines, _Component);

    function Routines(props) {
        (0, _classCallCheck3.default)(this, Routines);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            condition: {
                sortKey: 'id',
                sortType: 1 //1升-1降
            }
        };
        return _this;
    }

    Routines.prototype.componentDidMount = function componentDidMount() {
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

    Routines.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

    Routines.prototype.query = function query(condition) {
        var queryRoutines = this.props.queryRoutines;

        queryRoutines(condition);
    };

    Routines.prototype.setCondition = function setCondition(sortKey) {
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

    Routines.prototype.render = function render() {
        var routines = this.props.routines.list || [];
        var condition = this.state.condition;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'Routines' }),
            _react2.default.createElement(
                'div',
                { className: 'box' },
                _react2.default.createElement(
                    'div',
                    { className: 'box-header' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'box-title' },
                        'Routines'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'box-tools' },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/routinesedit/0' },
                            _react2.default.createElement(
                                'button',
                                { type: 'button', className: 'btn  btn-primary m-5' },
                                'Create New Routine'
                            )
                        ),
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-success pull-right m-5' },
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
                                    { className: condition.sortKey == 'duration' ? condition.sortType == 1 ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'duration') },
                                    'Duration'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortKey == 'display' ? condition.sortType == 1 ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'display') },
                                    'Display in Workout detail page?'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortKey == 'startedTimes' ? condition.sortType == 1 ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'started') },
                                    'Number of times started'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortKey == 'skippedTimes' ? condition.sortType == 1 ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'skipped') },
                                    'Number of times skipped'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            routines.map(function (routine, index) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: index },
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            _reactRouter.Link,
                                            { to: '/routinesedit/' + routine.id },
                                            routine.id
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        routine.code
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        routine.title
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        routine.duration
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        routine.display ? 'yes' : 'no'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        routine.startedTimes
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        routine.skippedTimes
                                    )
                                );
                            })
                        )
                    )
                )
            )
        );
    };

    return Routines;
}(_react.Component);

function mapStateToProps(state) {
    return {
        routines: state.routines
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.routinesActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(Routines));
//# sourceMappingURL=Routines.js.map
