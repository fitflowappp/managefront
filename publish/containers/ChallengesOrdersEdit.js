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

var _actions = require('../actions');

var _Alert = require('../components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _ChallengesListModal = require('../components/modal/ChallengesListModal');

var _ChallengesListModal2 = _interopRequireDefault(_ChallengesListModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChallengesOrderEdit = function (_Component) {
    (0, _inherits3.default)(ChallengesOrderEdit, _Component);

    function ChallengesOrderEdit(props) {
        (0, _classCallCheck3.default)(this, ChallengesOrderEdit);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            challengeOrder: {
                challenges: []
            },
            success: false
        };
        return _this;
    }

    ChallengesOrderEdit.prototype.componentDidMount = function componentDidMount() {
        var id = this.props.routeParams.id;
        if (id != 0) {
            var getChallengeOrders = this.props.getChallengeOrders;

            var that = this;
            getChallengeOrders({ id: id }, function (res) {
                if (!res.content.challenges) {
                    res.content.challenges = [];
                }
                that.setState({
                    challengeOrder: res.content
                });
            });
        }
    };

    ChallengesOrderEdit.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

    ChallengesOrderEdit.prototype.save = function save(event) {
        event.preventDefault();
        var putChallengeOrders = this.props.putChallengeOrders;

        var that = this;
        putChallengeOrders(this.state.challengeOrder, function (res) {
            if (res.result.code == 1) {
                that.setState({
                    success: true
                });
            }
            _Alert2.default.info({ info: res.result.msg });
        });
    };

    ChallengesOrderEdit.prototype.pushChallenges = function pushChallenges(obj) {
        var challengeOrder = this.state.challengeOrder;
        challengeOrder.challenges.push(obj);
        this.setState(challengeOrder);
    };

    ChallengesOrderEdit.prototype.upChallenge = function upChallenge(index) {
        var challengeOrder = this.state.challengeOrder;
        var challenges = challengeOrder.challenges;
        if (index != 0) {
            var before = challenges[index - 1];
            var after = challenges[index];
            challenges[index - 1] = after;
            challenges[index] = before;
            this.setState(challengeOrder);
        }
    };

    ChallengesOrderEdit.prototype.delChallenge = function delChallenge(index) {
        var that = this;
        _Alert2.default.confirm({
            title: 'delete', body: "confirm？", surecb: function surecb() {
                var challengeOrder = that.state.challengeOrder;
                challengeOrder.challenges.splice(index, 1);
                that.setState(challengeOrder);
            }
        });
    };

    ChallengesOrderEdit.prototype.openChallengesListModal = function openChallengesListModal() {
        this.refs['ChallengesListModal'].getWrappedInstance().openModal();
    };

    ChallengesOrderEdit.prototype.back = function back() {
        this.props.router.goBack();
    };

    ChallengesOrderEdit.prototype.render = function render() {
        var _this2 = this;

        var challenges = this.state.challengeOrder.challenges;
        var success = this.state.success;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'Manage Challenge Order' }),
            _react2.default.createElement(_ChallengesListModal2.default, { ref: 'ChallengesListModal', pushChallenges: this.pushChallenges.bind(this) }),
            success && _react2.default.createElement(
                'div',
                { className: 'callout callout-success text-center' },
                'Your changes have been succesfully saved'
            ),
            _react2.default.createElement(
                'div',
                { className: 'box' },
                _react2.default.createElement(
                    'div',
                    { className: 'box-header' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'box-title' },
                        'Manage Challenge Order'
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.Form,
                    { role: 'form', onSubmit: this.save.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { className: 'box-body' },
                        challenges && challenges.map(function (challenge, index) {
                            return _react2.default.createElement(
                                'div',
                                { key: index, className: 'm-b5' },
                                _react2.default.createElement('i', { onClick: _this2.upChallenge.bind(_this2, index), className: 'fa fa-arrow-up text-primary pointer m-r10', style: { fontSize: '20px' } }),
                                'Routine',
                                challenge.code,
                                ':',
                                challenge.title,
                                _react2.default.createElement('i', { onClick: _this2.delChallenge.bind(_this2, index), className: 'fa fa-close text-danger pointer m-l10', style: { fontSize: '20px' } })
                            );
                        }),
                        _react2.default.createElement('i', { onClick: this.openChallengesListModal.bind(this), className: 'fa fa-plus-square text-primary pointer', style: { fontSize: '40px' } })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'box-footer clearfix' },
                        _react2.default.createElement(
                            _reactBootstrap.Row,
                            null,
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 12, className: 'col-md-offset-3' },
                                _react2.default.createElement(
                                    'button',
                                    { type: 'submit', className: 'btn  btn-primary' },
                                    'Save'
                                ),
                                _react2.default.createElement(
                                    'button',
                                    { type: 'button', className: 'btn btn-default m-l10', onClick: this.back.bind(this) },
                                    'Back'
                                )
                            )
                        )
                    )
                )
            )
        );
    };

    return ChallengesOrderEdit;
}(_react.Component); /**
                      * Created by qwr on 2017/9/18.
                      */


function mapStateToProps(state) {
    return {
        challengeorders: state.challengeorders
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.challengeordersActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(ChallengesOrderEdit));
//# sourceMappingURL=ChallengesOrdersEdit.js.map
