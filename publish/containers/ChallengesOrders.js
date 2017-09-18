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

var _common = require('../common');

var _Alert = require('../components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChallengesOrder = function (_Component) {
    (0, _inherits3.default)(ChallengesOrder, _Component);

    function ChallengesOrder(props) {
        (0, _classCallCheck3.default)(this, ChallengesOrder);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            challengeorders: []
        };
        return _this;
    }

    ChallengesOrder.prototype.componentDidMount = function componentDidMount() {
        this.query();
    };

    ChallengesOrder.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

    ChallengesOrder.prototype.query = function query() {
        var queryChallengeOrders = this.props.queryChallengeOrders;

        queryChallengeOrders();
    };

    ChallengesOrder.prototype.add = function add() {
        var that = this;
        var postChallengeOrders = this.props.postChallengeOrders;

        postChallengeOrders({ challenges: [] }, function (res) {
            if (res.result.code == 1) {
                that.query();
            }
            _Alert2.default.info({ info: res.result.msg });
        });
    };

    ChallengesOrder.prototype.render = function render() {
        var challengeorders = this.props.challengeorders.list || [];
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'ChallengesOrder' }),
            _react2.default.createElement(
                'div',
                { className: 'box' },
                _react2.default.createElement(
                    'div',
                    { className: 'box-header' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'box-title' },
                        'Challenge Orders'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'box-tools' },
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-primary pull-right m-l10', onClick: this.add.bind(this) },
                            'New ChallengeOrders'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'box-body' },
                    _react2.default.createElement(
                        'table',
                        { className: 'table table-bordered dataTable' },
                        _react2.default.createElement(
                            'thead',
                            null,
                            _react2.default.createElement(
                                'tr',
                                { role: 'row' },
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'id'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'crDate'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'tbody',
                            null,
                            challengeorders.map(function (challengeorder, index) {
                                return _react2.default.createElement(
                                    'tr',
                                    { key: index },
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        _react2.default.createElement(
                                            _reactRouter.Link,
                                            { to: '/challengesordersedit/' + challengeorder.id },
                                            challengeorder.id
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'td',
                                        null,
                                        (0, _common.getTime)(challengeorder.crDate)
                                    )
                                );
                            })
                        )
                    )
                )
            )
        );
    };

    return ChallengesOrder;
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
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(ChallengesOrder));
//# sourceMappingURL=ChallengesOrders.js.map
