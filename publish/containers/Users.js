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
 * Created by qwr on 2017/10/11.
 */
var Users = function (_Component) {
    (0, _inherits3.default)(Users, _Component);

    function Users(props) {
        (0, _classCallCheck3.default)(this, Users);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            condition: {
                number: 0,
                size: 20
            }
        };
        return _this;
    }

    Users.prototype.componentDidMount = function componentDidMount() {
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

    Users.prototype.query = function query(condition) {
        var queryUsers = this.props.queryUsers;

        queryUsers(condition);
    };

    Users.prototype.setCondition = function setCondition(eventKey) {
        var condition = this.state.condition;
        condition.number = eventKey - 1;
        this.setState(condition);
        this.query(condition);
        this.props.router.replace({ pathname: this.props.location.pathname, query: condition });
    };

    Users.prototype.render = function render() {
        var users = this.props.users.list;
        var condition = this.state.condition;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'Users' }),
            users && _react2.default.createElement(
                'div',
                { className: 'box' },
                _react2.default.createElement(
                    'div',
                    { className: 'box-header' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'box-title' },
                        'Users'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'box-tools' },
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
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'ID'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Facebook ID'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Email Address'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Timestamp of App First Opened'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Registered?'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Timestamp of Facebook Registration submitted'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Timestamp of Registration Completed'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Current challenge ID'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Number of completed challenges'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Cumulative duration of videos watched'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Number of completed Workouts'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Scheduling in-app notification on?'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Scheduling calendar reminder on?'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Cumulative number of social shares'
                                )
                            ),
                            users.content.map(function (user, index) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: index },
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            _reactRouter.Link,
                                            { to: "/userdetails/" + user.user.id },
                                            user.user.id
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        user.facebookUid
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        user.email
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        (0, _common.getTime)(user.firstOpenDate)
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        user.unRegistered ? 'no' : 'yes'
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        (0, _common.getTime)(user.submittedDate)
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        (0, _common.getTime)(user.registrationCompletedDate)
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        user.userState && user.userState.currentChallengeId
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        user.userState && user.userState.completedChallengeNum
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        user.userState && user.userState.duration
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        user.userState && user.userState.completedWorkoutNum
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        user.userConfiguration && user.userConfiguration.notification
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        user.userConfiguration && user.userConfiguration.remider
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        user.shareCount
                                    )
                                );
                            })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'box-footer clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'pull-right' },
                        _react2.default.createElement(_reactBootstrap.Pagination, {
                            prev: true,
                            next: true,
                            first: true,
                            last: true,
                            ellipsis: true,
                            boundaryLinks: true,
                            items: users.totalPages,
                            maxButtons: 2,
                            activePage: parseInt(condition.number) + 1,
                            onSelect: this.setCondition.bind(this)
                        })
                    )
                )
            )
        );
    };

    return Users;
}(_react.Component);

function mapStateToProps(state) {
    return {
        users: state.users
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.usersActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(Users));
//# sourceMappingURL=Users.js.map
