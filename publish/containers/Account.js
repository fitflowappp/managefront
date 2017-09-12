'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _AccountModal = require('../components/modal/AccountModal');

var _AccountModal2 = _interopRequireDefault(_AccountModal);

var _Alert = require('../components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Account = function (_Component) {
    (0, _inherits3.default)(Account, _Component);

    function Account(props) {
        (0, _classCallCheck3.default)(this, Account);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            role: 0,
            editAccount: null
        };
        return _this;
    }

    Account.prototype.componentDidMount = function componentDidMount() {
        var role = this.state.role;
        this.query(role);
    };

    Account.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (this.state.role != prevState.role) {
            this.query();
        }
    };

    Account.prototype.query = function query() {
        var queryAccount = this.props.queryAccount;

        var role = this.state.role;
        queryAccount({ "role": role });
    };

    Account.prototype.add = function add() {
        this.setState({
            editAccount: null
        });
        this.refs['AccountModal'].getWrappedInstance().openModal();
    };

    Account.prototype.edit = function edit(account) {
        this.setState({
            editAccount: (0, _assign2.default)({}, account)
        });
        this.refs['AccountModal'].getWrappedInstance().openModal();
    };

    Account.prototype.del = function del(account) {
        var that = this;
        _Alert2.default.confirm({ title: '删除', body: "确定删除？", surecb: function surecb() {
                var deleteAccount = that.props.deleteAccount;

                deleteAccount(account, function (res) {});
            }
        });
    };

    Account.prototype.changeRole = function changeRole(role) {
        this.setState({
            role: role
        });
    };

    Account.prototype.render = function render() {
        var _this2 = this;

        var accounts = this.props.account.list || [];
        var role = this.state.role;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'Account' }),
            _react2.default.createElement(_AccountModal2.default, { ref: 'AccountModal', query: this.query.bind(this), role: role, editAccount: this.state.editAccount }),
            _react2.default.createElement(
                _reactBootstrap.Nav,
                { bsStyle: 'tabs' },
                _react2.default.createElement(
                    _reactBootstrap.NavItem,
                    { className: role == 0 ? "active" : '', onClick: this.changeRole.bind(this, 0) },
                    '\u7BA1\u7406\u5458'
                ),
                _react2.default.createElement(
                    _reactBootstrap.NavItem,
                    { className: role == 1 ? "active" : '', onClick: this.changeRole.bind(this, 1) },
                    '\u7528\u6237'
                )
            ),
            _react2.default.createElement(
                _reactBootstrap.Panel,
                { className: 'm-t5' },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_reactBootstrap.Button, { bsStyle: 'primary', className: 'glyphicon glyphicon-plus', onClick: this.add.bind(this) })
                ),
                _react2.default.createElement(
                    'table',
                    { className: 'table table-condensed table-hover' },
                    _react2.default.createElement(
                        'thead',
                        null,
                        _react2.default.createElement(
                            'tr',
                            null,
                            _react2.default.createElement(
                                'th',
                                null,
                                '\u5934\u50CF'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                '\u7528\u6237\u540D'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                '\u89D2\u8272\u540D'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                '\u7B80\u4ECB'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                '\u64CD\u4F5C'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        accounts.map(function (account, index) {
                            return _react2.default.createElement(
                                'tr',
                                { key: account.id },
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    account.headerImg && _react2.default.createElement('img', { src: account.headerImg.contentUri, alt: '\u5934\u50CF', width: '50' })
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    account.name
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    account.role == 0 && '管理员',
                                    account.role == 1 && '用户',
                                    account.role == 2 && '买手',
                                    account.role == 3 && '仓库管理员',
                                    account.role == 4 && '搭配师',
                                    account.role == 5 && '采购人'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    account.intro
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    account.role != 0 && _react2.default.createElement(_reactBootstrap.Button, { bsStyle: 'info', className: 'glyphicon glyphicon-pencil m-5', onClick: _this2.edit.bind(_this2, account) })
                                )
                            );
                        })
                    )
                )
            )
        );
    };

    return Account;
}(_react.Component); /**
                      * Created by qwr on 2016/6/6.
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
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(Account));
//# sourceMappingURL=Account.js.map
