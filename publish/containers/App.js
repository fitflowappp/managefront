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

var _reactBootstrap = require('react-bootstrap');

var _reactRouterBootstrap = require('react-router-bootstrap');

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

        _this.nav = {
            "/account": { name: "账号管理" },
            "/networkinfo": {
                name: "人脉管理",
                item: {
                    "/networkinfo/list": { name: "人脉列表" }
                }
            }
        };
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

    App.prototype.getdropdown = function getdropdown(lists) {
        //遍历下拉菜单选项
        var items = [];
        for (var i in lists) {
            items.push(_react2.default.createElement(
                _reactRouterBootstrap.LinkContainer,
                { key: i, to: { pathname: i } },
                _react2.default.createElement(
                    _reactBootstrap.NavItem,
                    null,
                    lists[i].name
                )
            ));
        }
        return items;
    };

    App.prototype.getNavItem = function getNavItem() {
        var rows = [];
        for (var i in this.nav) {
            if (this.nav[i].item) {
                rows.push(_react2.default.createElement(
                    _reactBootstrap.NavDropdown,
                    { className: this.state.pathname.startsWith(i) ? "active" : null, key: i, title: this.nav[i].name, id: 'checkDropdown' },
                    this.getdropdown(this.nav[i].item)
                ));
            } else {
                rows.push(_react2.default.createElement(
                    _reactRouterBootstrap.LinkContainer,
                    { key: i, to: { pathname: i } },
                    _react2.default.createElement(
                        _reactBootstrap.NavItem,
                        null,
                        this.nav[i].name
                    )
                ));
            }
        }
        return rows;
    };
    //退出登录


    App.prototype.logout = function logout() {
        _reactCookie2.default.remove("muser");
        _reactRouter.browserHistory.push('/');
    };

    App.prototype.render = function render() {
        var user = (0, _auth.getMuser)();
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _reactBootstrap.Navbar,
                { className: { 'hide': !user, 'nav-theme': true } },
                _react2.default.createElement(
                    _reactBootstrap.Navbar.Header,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Navbar.Brand,
                        { className: 'font-25' },
                        '\u540E\u53F0'
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.Nav,
                    { bsStyle: 'pills' },
                    this.getNavItem()
                ),
                user && _react2.default.createElement(
                    'div',
                    { className: 'pull-right' },
                    _react2.default.createElement('img', { src: user.headerImg ? user.headerImg.contentUri : '/dist/images/user.jpg', alt: '\u5934\u50CF', className: 'pull-left m-t10 radius-5', width: '30' }),
                    _react2.default.createElement(
                        _reactBootstrap.Nav,
                        null,
                        _react2.default.createElement(
                            _reactBootstrap.NavDropdown,
                            { eventKey: '0', title: user ? user.name : "无", id: 'admin' },
                            _react2.default.createElement(
                                _reactBootstrap.MenuItem,
                                { onClick: this.props.logout },
                                '\u9000\u51FA'
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'container m-t80' },
                this.props.children
            )
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
