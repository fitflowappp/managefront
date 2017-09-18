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

var Register = function (_Component) {
    (0, _inherits3.default)(Register, _Component);

    function Register(props) {
        (0, _classCallCheck3.default)(this, Register);
        return (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));
    }
    //注册


    Register.prototype.register = function register(event) {
        event.preventDefault();
        var login = this.props.login;

        var param = (0, _index.serializeForm)(event.target);
        var that = this;
        login(param, function (obj) {
            if (obj.result.code == 1) {
                _reactCookie2.default.save("muser", obj, { "path": '/' });
                that.props.router.replace({ pathname: '/dashboard' });
            } else {
                _Alert2.default.info({ info: obj.result.msg });
            }
        }.bind(this));
    };

    Register.prototype.render = function render() {
        return _react2.default.createElement(
            _reactBootstrap.Row,
            { className: { "show-grid": true, "hide": (0, _auth.getMuser)() } },
            _react2.default.createElement(_reactHelmet2.default, { title: 'Login' }),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'login-box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'login-logo' },
                        _react2.default.createElement(
                            'b',
                            null,
                            'yoga manage'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'login-box-body' },
                        _react2.default.createElement(
                            'p',
                            { className: 'login-box-msg' },
                            'Register a new membership'
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Form,
                            { role: 'form', onSubmit: this.register.bind(this) },
                            _react2.default.createElement(
                                'div',
                                { className: 'form-group has-feedback' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', required: true, name: 'name', placeholder: 'Name' }),
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-user  form-control-feedback' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'form-group has-feedback' },
                                _react2.default.createElement('input', { type: 'password', className: 'form-control', required: true, name: 'password', placeholder: 'Password' }),
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-lock form-control-feedback' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'form-group has-feedback' },
                                _react2.default.createElement('input', { type: 'password', className: 'form-control', required: true, name: 'rePassword', placeholder: 'Retype password' }),
                                _react2.default.createElement('span', { className: 'glyphicon glyphicon-log-in form-control-feedback' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'col-xs-4 col-md-offset-8' },
                                    _react2.default.createElement(
                                        'button',
                                        { type: 'submit', className: 'btn btn-primary btn-block btn-flat' },
                                        'Register'
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    };

    return Register;
}(_react.Component); /**
                      * Created by qwr on 2017/9/14.
                      */


function mapStateToProps(state) {
    return {
        account: state.account
    };
}
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.accountActions, dispatch);
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(Register));
//# sourceMappingURL=Register.js.map
