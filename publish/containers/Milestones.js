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

var Milestones = function (_Component) {
    (0, _inherits3.default)(Milestones, _Component);

    function Milestones(props) {
        (0, _classCallCheck3.default)(this, Milestones);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            activePage: 1,
            editAccount: null,
            exerciseRange: 50,
            workoutsRange: 0
        };
        return _this;
    }

    Milestones.prototype.componentDidMount = function componentDidMount() {
        var role = this.state.role;
        this.query(role);
    };

    Milestones.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (this.state.role != prevState.role) {
            this.query();
        }
    };

    Milestones.prototype.query = function query() {
        var queryAccount = this.props.queryAccount;

        var role = this.state.role;
        queryAccount({ "role": role });
    };

    Milestones.prototype.add = function add() {
        this.setState({
            editAccount: null
        });
        this.refs['AccountModal'].getWrappedInstance().openModal();
    };

    Milestones.prototype.edit = function edit(account) {
        this.setState({
            editAccount: (0, _assign2.default)({}, account)
        });
        this.refs['AccountModal'].getWrappedInstance().openModal();
    };

    Milestones.prototype.del = function del(account) {
        var that = this;
        _Alert2.default.confirm({
            title: '删除', body: "确定删除？", surecb: function surecb() {
                var deleteAccount = that.props.deleteAccount;

                deleteAccount(account, function (res) {});
            }
        });
    };

    Milestones.prototype.set = function set(e) {
        var name = e.target.getAttribute('name');
        var value = e.target.value;
        var state = this.state;
        state[name] = value;
        this.setState(state);
    };

    Milestones.prototype.changeRole = function changeRole(role) {
        this.setState({
            role: role
        });
    };

    Milestones.prototype.handleSelect = function handleSelect() {};

    Milestones.prototype.back = function back() {
        window.history.go(-1);
    };

    Milestones.prototype.render = function render() {
        var accounts = this.props.account.list || [];
        var role = this.state.role;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'Milestones' }),
            _react2.default.createElement(_AccountModal2.default, { ref: 'AccountModal', query: this.query.bind(this), role: role, editAccount: this.state.editAccount }),
            _react2.default.createElement(
                'div',
                { className: 'box' },
                _react2.default.createElement(
                    'div',
                    { className: 'box-header' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'box-title' },
                        'Edit Milestones'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'box-body' },
                    _react2.default.createElement(
                        'p',
                        null,
                        'Users will receive an achievement after every how many total exercise minutes?'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Row,
                        { style: { width: '600px' } },
                        _react2.default.createElement(
                            _reactBootstrap.Col,
                            { sm: 2 },
                            _react2.default.createElement(
                                'text',
                                null,
                                '30'
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Col,
                            { sm: 8 },
                            _react2.default.createElement('input', { type: 'range', min: '30', max: '300', name: 'exerciseRange', className: 'pull-left', value: this.state.exerciseRange, step: 1, onChange: this.set.bind(this) })
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Col,
                            { sm: 2 },
                            _react2.default.createElement(
                                'text',
                                null,
                                '300'
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Col,
                            { sm: 12 },
                            _react2.default.createElement(
                                'p',
                                { className: 'text-center text-primary' },
                                this.state.exerciseRange
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'm-t40' },
                        'Users will receive an achievement after every how many total workouts?'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Row,
                        { style: { width: '600px' } },
                        _react2.default.createElement(
                            _reactBootstrap.Col,
                            { sm: 2 },
                            _react2.default.createElement(
                                'text',
                                null,
                                '1'
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Col,
                            { sm: 8 },
                            _react2.default.createElement('input', { type: 'range', min: '1', max: '20', name: 'workoutsRange', className: 'pull-left', value: this.state.workoutsRange, step: 1, onChange: this.set.bind(this) })
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Col,
                            { sm: 2 },
                            _react2.default.createElement(
                                'text',
                                null,
                                '20'
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Col,
                            { sm: 12 },
                            _react2.default.createElement(
                                'p',
                                { className: 'text-center text-primary' },
                                this.state.workoutsRange
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'box-footer clearfix' },
                    _react2.default.createElement(
                        'button',
                        { type: 'button', className: 'btn  btn-primary' },
                        'Save'
                    ),
                    _react2.default.createElement(
                        'button',
                        { type: 'button', className: 'btn btn-default m-l10', onClick: this.back.bind(this) },
                        'Back'
                    )
                )
            )
        );
    };

    return Milestones;
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
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(Milestones));
//# sourceMappingURL=Milestones.js.map
