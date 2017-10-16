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

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _auth = require('../common/auth');

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by john on 2016/5/16.
 */
var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);

    function App(props) {
        (0, _classCallCheck3.default)(this, App);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            pathname: props.location.pathname
        };
        return _this;
    }

    App.prototype.componentDidMount = function componentDidMount() {};

    App.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var pathname = nextProps.location.pathname;
        if (this.state.pathname != pathname) {
            this.setState({
                pathname: pathname
            });
        }
    };

    //退出登录


    App.prototype.logout = function logout() {
        _reactCookie2.default.remove("muser");
        _reactRouter.browserHistory.push('/');
    };

    App.prototype.render = function render() {
        var user = (0, _auth.getMuser)();
        var pathname = this.props.routes[1].name;
        return _react2.default.createElement(
            'div',
            null,
            user && _react2.default.createElement(
                'div',
                { className: 'wrapper fixed' },
                _react2.default.createElement(
                    'header',
                    { className: 'main-header' },
                    _react2.default.createElement(
                        'a',
                        { href: '/', className: 'logo' },
                        _react2.default.createElement(
                            'span',
                            { className: 'logo-mini' },
                            'yoga'
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'logo-lg' },
                            _react2.default.createElement(
                                'b',
                                null,
                                'yoga'
                            ),
                            'manage'
                        )
                    ),
                    _react2.default.createElement(
                        'nav',
                        { className: 'navbar navbar-static-top', role: 'navigation' },
                        _react2.default.createElement('a', { href: '#', className: 'sidebar-toggle', 'data-toggle': 'push-menu', role: 'button' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'navbar-custom-menu' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'nav navbar-nav' },
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement('img', { src: user.headerImg ? user.headerImg.contentUri : '/dist/images/user.jpg',
                                        alt: '\u5934\u50CF', width: 30, className: 'img-circle m-t10' })
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '/' },
                                        user ? user.name : "无"
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    _react2.default.createElement(
                                        'a',
                                        { href: '#', onClick: this.props.logout },
                                        '\u9000\u51FA'
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'aside',
                    { className: 'main-sidebar' },
                    _react2.default.createElement(
                        'section',
                        { className: 'sidebar' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'sidebar-menu tree', 'data-widget': 'tree' },
                            _react2.default.createElement(
                                'li',
                                { className: pathname == 'dashboard' ? "active" : "" },
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/dashboard' },
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'dashboard'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: pathname == 'routines' || pathname == 'routinesedit' ? "active" : "" },
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/routines' },
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'routines'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: pathname == 'workouts' ? "active" : "" },
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/workouts' },
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'workouts'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: pathname == 'challenges' ? "active" : "" },
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/challenges' },
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'challenges'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: pathname == 'users' ? "active" : "" },
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/users' },
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'users'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: pathname == 'milestones' ? "active" : "" },
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/milestones' },
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        'milestones'
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'content-wrapper' },
                    this.props.children
                ),
                _react2.default.createElement(
                    'footer',
                    { className: 'main-footer' },
                    _react2.default.createElement(
                        'div',
                        { className: 'pull-right hidden-xs' },
                        _react2.default.createElement(
                            'b',
                            null,
                            'Version'
                        ),
                        ' 1.0.0'
                    ),
                    _react2.default.createElement(
                        'strong',
                        null,
                        'Copyright \xA9 2017 ',
                        _react2.default.createElement(
                            'a',
                            { href: '/' },
                            'yoga manage'
                        ),
                        '.'
                    )
                )
            ),
            !user && this.props.children
        );
    };

    return App;
}(_react.Component);

function mapStateToProps(state) {
    return {
        app: state.app
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)({ logout: _auth.logout }, dispatch);
}
//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(App));
//# sourceMappingURL=App.js.map
