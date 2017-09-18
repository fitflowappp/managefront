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

var _actions = require('../actions');

var _Alert = require('../components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dashboard = function (_Component) {
    (0, _inherits3.default)(Dashboard, _Component);

    function Dashboard(props) {
        (0, _classCallCheck3.default)(this, Dashboard);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            activePage: 1,
            editAccount: null
        };
        return _this;
    }

    Dashboard.prototype.componentDidMount = function componentDidMount() {
        this.query();
    };

    Dashboard.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

    Dashboard.prototype.query = function query() {};

    Dashboard.prototype.uploadFile = function uploadFile(e) {
        var target = e.target;
        var name = target.name;
        var that = this;
        (0, _fetch.upload)(e).after(function (res) {});
    };

    //分页


    Dashboard.prototype.handleSelect = function handleSelect(eventKey, e) {
        this.setState({
            activePage: eventKey
        });
        this.props.router.replace({ pathname: '/tag', query: { page: eventKey } });
    };

    Dashboard.prototype.render = function render() {
        var accounts = this.props.account.list || [];
        var role = this.state.role;
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
                                { type: 'button', className: 'btn  btn-primary' },
                                'Edit Milestones'
                            )
                        ),
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-success pull-right m-l10' },
                            _react2.default.createElement('i', { className: 'fa fa-download' }),
                            'Export csv'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'box-body' },
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
                            _react2.default.createElement(
                                'tr',
                                null,
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    'd'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '1'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '1.'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '1.'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '1.'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '1.'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '1.'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '1.'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '1.'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '1.'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '1.'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    '1.'
                                )
                            )
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
                            items: 3,
                            maxButtons: 5,
                            activePage: this.state.activePage,
                            onSelect: this.handleSelect.bind(this)
                        })
                    )
                )
            )
        );
    };

    return Dashboard;
}(_react.Component); /**
                      * Created by qwr on 2017/9/13.
                      */


function mapStateToProps(state) {
    return {
        account: state.account
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.accountActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(Dashboard));
//# sourceMappingURL=Dashboard.js.map
