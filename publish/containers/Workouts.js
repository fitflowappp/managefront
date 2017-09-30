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
 * Created by qwr on 2017/9/15.
 */
var Workouts = function (_Component) {
    (0, _inherits3.default)(Workouts, _Component);

    function Workouts(props) {
        (0, _classCallCheck3.default)(this, Workouts);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            condition: {
                sortkey: 'id',
                sorttype: 1 //1升0降
            }
        };
        return _this;
    }

    Workouts.prototype.componentDidMount = function componentDidMount() {
        var condition = this.props.location.query;
        if (!condition.sortkey) {
            condition = this.state.condition;
        } else {

            this.setState({
                condition: condition
            });
        }
        this.query(condition);
    };

    Workouts.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

    Workouts.prototype.query = function query(condition) {
        var queryWorkouts = this.props.queryWorkouts;

        queryWorkouts(condition);
    };

    Workouts.prototype.setCondition = function setCondition(sortkey) {
        var condition = this.state.condition;
        var sorttype;

        if (sortkey == condition.sortkey) {
            sorttype = Number(!condition.sorttype);
        } else {
            sorttype = 1;
        }

        condition.sortkey = sortkey;
        condition.sorttype = sorttype;

        this.setState(condition);
        this.query(condition);
        this.props.router.replace({ pathname: this.props.location.pathname, query: condition });
    };

    Workouts.prototype.copy = function copy(workout) {
        var copyWorkout = this.props.copyWorkout;

        var that = this;
        copyWorkout({ id: workout.id, title: workout.title }, function (res) {
            if (res.result.code == 1) {
                that.query(that.state.condition);
            }
            _Alert2.default.info({ info: res.result.msg });
        });
    };

    Workouts.prototype.render = function render() {
        var _this2 = this;

        var workouts = this.props.workouts.list || [];
        var condition = this.state.condition;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'Workouts' }),
            _react2.default.createElement(
                'div',
                { className: 'box' },
                _react2.default.createElement(
                    'div',
                    { className: 'box-header' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'box-title' },
                        'Workouts'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'box-tools' },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/workoutsedit/0' },
                            _react2.default.createElement(
                                'button',
                                { type: 'button', className: 'btn  btn-primary m-5' },
                                'Create New Workout'
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
                                    { className: condition.sortkey == 'id' ? condition.sorttype ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'id') },
                                    'ID'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortkey == 'code' ? condition.sorttype ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'code') },
                                    'Code'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortkey == 'title' ? condition.sorttype ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'title') },
                                    'Title'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortkey == 'duration' ? condition.sorttype ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'duration') },
                                    'Duration'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortkey == 'timesStarted' ? condition.sorttype ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'timesStarted') },
                                    'times started'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortkey == 'timesCompleted' ? condition.sorttype ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'timesCompleted') },
                                    'times completed'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortkey == 'usersStarted' ? condition.sorttype ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'usersStarted') },
                                    'unique users started'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortkey == 'usersCompleted' ? condition.sorttype ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'usersCompleted') },
                                    'unique users completed'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    { className: condition.sortkey == 'durationWatched' ? condition.sorttype ? "sorting_asc" : "sorting_desc" : 'sorting', onClick: this.setCondition.bind(this, 'durationWatched') },
                                    'Total duration of being watched'
                                ),
                                _react2.default.createElement('th', null)
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            workouts.map(function (workout, index) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: index },
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            _reactRouter.Link,
                                            { to: '/workoutsedit/' + workout.id },
                                            workout.id
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        workout.code
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        workout.title
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        workout.duration
                                    ),
                                    _react2.default.createElement('td', null),
                                    _react2.default.createElement('td', null),
                                    _react2.default.createElement('td', null),
                                    _react2.default.createElement('td', null),
                                    _react2.default.createElement('td', null),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            'button',
                                            { type: 'button', className: 'btn  btn-default m-5', onClick: _this2.copy.bind(_this2, workout) },
                                            'copy'
                                        )
                                    )
                                );
                            })
                        )
                    )
                )
            )
        );
    };

    return Workouts;
}(_react.Component);

function mapStateToProps(state) {
    return {
        workouts: state.workouts
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.workoutsActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(Workouts));
//# sourceMappingURL=Workouts.js.map
