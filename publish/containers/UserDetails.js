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
var UserDetails = function (_Component) {
    (0, _inherits3.default)(UserDetails, _Component);

    function UserDetails(props) {
        (0, _classCallCheck3.default)(this, UserDetails);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {};
        return _this;
    }

    UserDetails.prototype.componentDidMount = function componentDidMount() {
        var condition = {
            id: this.props.routeParams.id
        };
        this.query(condition);
    };

    UserDetails.prototype.query = function query(condition) {
        var getUsers = this.props.getUsers;

        getUsers(condition);
    };

    UserDetails.prototype.back = function back() {
        this.props.router.goBack();
    };

    UserDetails.prototype.render = function render() {
        var user = this.props.users.data || {};
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'UserDetails' }),
            _react2.default.createElement(
                'div',
                { className: 'box' },
                _react2.default.createElement(
                    'div',
                    { className: 'box-header' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'box-title' },
                        'UserDetails'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'box-tools' },
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'btn  btn-primary m-5', onClick: this.back.bind(this) },
                            'back'
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
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'User ID'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.user && user.user.id
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Facebook ID'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.facebookUid
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Email Address'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.email
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Profile Picture'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement('img', { src: 'data:image/gif;base64,' + user.headerImgContent, alt: 'none', width: 30 })
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Gender'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.gender
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Facebook permissions'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.facebookPermissions
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Timestamp of App First Opened'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    (0, _common.getTime)(user.firstOpenDate)
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Registered?'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.unRegistered ? 'no' : 'yes'
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Timestamp of Facebook Registration submitted'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    (0, _common.getTime)(user.submittedDate)
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Timestamp of Registration Completed'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    (0, _common.getTime)(user.registrationCompletedDate)
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Unlocked challenge IDs'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.userState && user.userState.unlockedChallengeIds && user.userState.unlockedChallengeIds.join(',')
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Current challenge ID'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.userState && user.userState.currentChallengeId
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Number of completed challenges'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.userState && user.userState.completedChallengeNum
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Started Workout IDs'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.userState && user.userState.startedWorkoutIds
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Current Workout ID'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.userState && user.userState.currentWorkoutId
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Cumulative duration of videos watched'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.userState && user.userState.duration
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Number of completed Workouts'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.userState && user.userState.completedWorkoutNum
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Scheduling in-app notification on?'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.userConfiguration && user.userConfiguration.notification
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Scheduling calendar reminder on?'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.userConfiguration && user.userConfiguration.remider
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Scheduling days'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.userConfiguration && user.userConfiguration.schedulingDays && user.userConfiguration.schedulingDays.join(',')
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Scheduling time of day'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.userConfiguration && (0, _common.getTime)(user.userConfiguration.schedulingTime)
                                )
                            ),
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'Cumulative number of social shares'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    user.shareCount
                                )
                            )
                        )
                    )
                )
            )
        );
    };

    return UserDetails;
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
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(UserDetails));
//# sourceMappingURL=UserDetails.js.map
