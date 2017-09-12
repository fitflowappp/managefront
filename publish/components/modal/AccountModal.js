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

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactBootstrap = require('react-bootstrap');

var _actions = require('../../actions');

var _Alert = require('../Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _fetch = require('../../common/fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AccountModal = function (_Component) {
    (0, _inherits3.default)(AccountModal, _Component);

    function AccountModal(props) {
        (0, _classCallCheck3.default)(this, AccountModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            show: false,
            account: {
                name: '',
                role: '',
                headerImg: null,
                intro: '',
                password: ''
            }
        };
        return _this;
    }

    AccountModal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var editAccount = nextProps.editAccount,
            role = nextProps.role;

        if (editAccount) {
            this.setState({
                account: editAccount
            });
        } else {
            this.setState({
                account: {
                    name: '',
                    role: role,
                    headerImg: null,
                    intro: '',
                    password: ''
                }
            });
        }
    };

    AccountModal.prototype._handleValidSubmit = function _handleValidSubmit(e) {
        e.preventDefault();
        var _props = this.props,
            postAccount = _props.postAccount,
            putAccount = _props.putAccount,
            query = _props.query;

        var account = this.state.account;
        var that = this;
        if (account.id) {
            putAccount(account, function (res) {
                if (res.code == 1) {
                    query();
                } else {
                    _Alert2.default.info({ info: res.msg });
                }
            });
        } else {
            postAccount(account, function (res) {
                if (res.code == 1) {
                    query();
                } else {
                    _Alert2.default.info({ info: res.msg });
                }
            });
        }
        that.closeModal();
    };

    AccountModal.prototype.uploadFile = function uploadFile(e) {
        var target = e.target;
        var name = target.name;
        var that = this;
        var account = this.state.account;
        (0, _fetch.upload)(e).after(function (res) {
            account[name] = res[0];
            that.setState({
                account: that.state.account
            });
        });
    };

    AccountModal.prototype.set = function set(e) {
        var name = e.target.getAttribute('name');
        var value = e.target.value;
        var account = this.state.account;
        account[name] = value;
        this.setState({
            account: account
        });
    };

    AccountModal.prototype.openModal = function openModal() {
        this.setState({
            show: true
        });
    };

    AccountModal.prototype.closeModal = function closeModal() {
        this.setState({
            show: false
        });
    };

    AccountModal.prototype.render = function render() {
        var editAccount = this.props.editAccount;
        var account = this.state.account;
        return _react2.default.createElement(
            'div',
            { className: 'static-modal' },
            _react2.default.createElement(
                _reactBootstrap.Modal,
                { show: this.state.show, backdrop: false },
                _react2.default.createElement(
                    _reactBootstrap.Form,
                    { horizontal: true, onSubmit: this._handleValidSubmit.bind(this) },
                    _react2.default.createElement(
                        _reactBootstrap.Modal.Header,
                        null,
                        _react2.default.createElement(
                            _reactBootstrap.Modal.Title,
                            null,
                            editAccount ? '编辑管理账号' : '新建管理账号',
                            account.role == 0 && '(管理员)',
                            account.role == 1 && '(用户)',
                            account.role == 2 && '(买手)',
                            account.role == 3 && '(仓库管理员)',
                            account.role == 4 && '(搭配师）',
                            account.role == 5 && '(采购人)'
                        )
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Modal.Body,
                        null,
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'name' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u7528\u6237\u540D'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', name: 'name', value: account.name,
                                    onChange: this.set.bind(this) })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'password' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u5BC6\u7801'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { type: 'password', name: 'password', value: account.password,
                                    onChange: this.set.bind(this) })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'intro' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u7B80\u4ECB'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', name: 'intro', value: account.intro,
                                    onChange: this.set.bind(this) })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'headerImg' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u5934\u50CF'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { type: 'file', name: 'headerImg', onChange: this.uploadFile.bind(this) }),
                                account.headerImg && _react2.default.createElement('img', { src: account.headerImg.contentUri, alt: '\u5934\u50CF', width: '50', className: 'm-t5' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Modal.Footer,
                        null,
                        _react2.default.createElement(
                            _reactBootstrap.Button,
                            { bsStyle: 'primary', type: 'submit' },
                            '\u786E\u8BA4'
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Button,
                            { bsStyle: 'default', onClick: this.closeModal.bind(this) },
                            '\u53D6\u6D88'
                        )
                    )
                )
            )
        );
    };

    return AccountModal;
}(_react.Component); /**
                      * Created by qwr on 2017/6/13.
                      */


function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.accountActions, dispatch);
}
exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps, null, { withRef: true })(AccountModal);
//# sourceMappingURL=AccountModal.js.map
