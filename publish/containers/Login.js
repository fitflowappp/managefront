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

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _reactBootstrap = require('react-bootstrap');

var _Alert = require('../components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _auth = require('../common/auth');

var _index = require('../common/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = function (_Component) {
    (0, _inherits3.default)(Login, _Component);

    function Login(props) {
        (0, _classCallCheck3.default)(this, Login);
        return (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));
    }
    //登录


    Login.prototype.login = function login(event) {
        event.preventDefault();
        var login = this.props.login;

        var param = (0, _index.serializeForm)(event.target);
        var that = this;
        login(param, function (obj) {
            if (obj.result.code == 1) {
                _reactCookie2.default.save("muser", obj, { "path": '/' });
                that.props.router.replace({ pathname: '/account' });
            } else {
                _Alert2.default.info({ info: obj.result.msg });
            }
        }.bind(this));
    };

    Login.prototype.render = function render() {
        return _react2.default.createElement(
            _reactBootstrap.Row,
            { className: { "show-grid": true, "hide": (0, _auth.getMuser)() } },
            _react2.default.createElement(
                _reactBootstrap.Col,
                { xs: 12, mdOffset: 4, md: 4 },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_reactHelmet2.default, { title: 'Login' }),
                    _react2.default.createElement(
                        _reactBootstrap.Panel,
                        { header: '\u540E\u53F0\u7BA1\u7406\u767B\u5F55', bsStyle: 'primary', className: 'm-t60' },
                        _react2.default.createElement(
                            _reactBootstrap.Form,
                            { horizontal: true, onSubmit: this.login.bind(this) },
                            _react2.default.createElement(
                                _reactBootstrap.FormGroup,
                                { controlId: 'formHorizontalEmail' },
                                _react2.default.createElement(
                                    _reactBootstrap.Col,
                                    { sm: 2, className: 'text-center text-info' },
                                    _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'user', className: 'm-t10' })
                                ),
                                _react2.default.createElement(
                                    _reactBootstrap.Col,
                                    { sm: 10 },
                                    _react2.default.createElement(_reactBootstrap.FormControl, { required: true, type: 'text', name: 'name', placeholder: 'Name' })
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.FormGroup,
                                { controlId: 'formHorizontalPassword' },
                                _react2.default.createElement(
                                    _reactBootstrap.Col,
                                    { sm: 2, className: 'text-center text-info' },
                                    _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'lock', className: 'm-t10' })
                                ),
                                _react2.default.createElement(
                                    _reactBootstrap.Col,
                                    { sm: 10 },
                                    _react2.default.createElement(_reactBootstrap.FormControl, { type: 'password', name: 'password', placeholder: 'Password' })
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.FormGroup,
                                null,
                                _react2.default.createElement(
                                    _reactBootstrap.Col,
                                    { smOffset: 2, sm: 10 },
                                    _react2.default.createElement(
                                        _reactBootstrap.Button,
                                        { type: 'submit' },
                                        '\u767B\u5F55'
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    };

    return Login;
}(_react.Component); /**
                      * Created by john on 2016/5/19.
                      */


function mapStateToProps(state) {
    return {
        account: state.account
    };
}
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.accountActions, dispatch);
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(Login));
//# sourceMappingURL=Login.js.map
