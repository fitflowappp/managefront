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

var _fetch = require('../common/fetch');

var _common = require('../common');

var _actions = require('../actions');

var _Alert = require('../components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by qwr on 2017/9/13.
 */
var Dashboard = function (_Component) {
    (0, _inherits3.default)(Dashboard, _Component);

    function Dashboard(props) {
        (0, _classCallCheck3.default)(this, Dashboard);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            condition: {
                number: 1,
                size: 20
            }
        };
        return _this;
    }

    Dashboard.prototype.componentDidMount = function componentDidMount() {
        var condition = this.props.location.query;
        if (!condition.number) {
            condition = this.state.condition;
        } else {
            this.setState({
                condition: condition
            });
        }
        this.query(condition);
    };

    Dashboard.prototype.query = function query(condition) {
        var queryDashboard = this.props.queryDashboard;
        //queryDashboard(condition);

        queryDashboard();
    };

    //分页


    Dashboard.prototype.handleSelect = function handleSelect(eventKey, e) {
        var condition = this.state.condition;
        condition.number = eventKey;
        this.setState(condition);
        this.query(condition);
        this.props.router.replace({ pathname: this.props.location.pathname, query: condition });
    };

    Dashboard.prototype.render = function render() {
        var dashboards = this.props.dashboard.list || [];
        var condition = this.state.condition;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'Dashboard' }),
            _react2.default.createElement(
                'div',
                { className: 'box' },
                _react2.default.createElement(
                    'div',
                    { className: 'box-header' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'box-title' },
                        'Analytics Dashboard'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'box-tools' },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/milestones' },
                            _react2.default.createElement(
                                'button',
                                { type: 'button', className: 'btn  btn-primary m-5' },
                                'Edit Milestones'
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
                        { className: 'table table-bordered table-hover' },
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement('th', null),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Facebook registration submitted'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Facebook registration completed'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Challenges started by unique users'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Challenges completed by unique users'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Workouts started by unique users'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Workouts completed by unique users'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Unique users who completed a Workout'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Cumulative duration of videos watched'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Unique users who turned scheduling on'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Unique users who have received achievements'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Unique users who have shared on social media'
                                )
                            ),
                            dashboards.map(function (dashboard, index) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: index },
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        (0, _common.getTime)(dashboard.date)
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        dashboard.facebookRegSubmitNum
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        dashboard.facebookRegCompleteNum
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        dashboard.challengeStartNum
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        dashboard.challengeCompleteNum
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        dashboard.workoutStartNum
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        dashboard.workoutCompleteNum
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        dashboard.oneWorkoutCompleteUserNum
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        dashboard.totalDuration
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        dashboard.calReminderOnNum
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        dashboard.achievementNum
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        dashboard.shareNum
                                    )
                                );
                            })
                        )
                    )
                )
            )
        );
    };

    return Dashboard;
}(_react.Component);

function mapStateToProps(state) {
    return {
        dashboard: state.dashboard
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.dashboardActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(Dashboard));
//# sourceMappingURL=Dashboard.js.map
