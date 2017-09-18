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

var _actions = require('../../actions');

var _reactBootstrap = require('react-bootstrap');

var _Alert = require('../Alert');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by qwr on 2017/9/18.
 */
var ChallengesListModal = function (_Component) {
    (0, _inherits3.default)(ChallengesListModal, _Component);

    function ChallengesListModal(props) {
        (0, _classCallCheck3.default)(this, ChallengesListModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            challenges: [],
            show: false
        };
        return _this;
    }

    ChallengesListModal.prototype.componentDidMount = function componentDidMount() {
        var queryChallenges = this.props.queryChallenges;

        var that = this;
        queryChallenges({}, function (res) {
            that.setState({
                challenges: res
            });
        });
    };

    ChallengesListModal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {};

    ChallengesListModal.prototype._handleValidSubmit = function _handleValidSubmit(event) {
        event.preventDefault();
        var pushChallenges = this.props.pushChallenges;

        var index = $("input[name='challenge']:checked").val();
        var challenges = this.state.challenges;
        pushChallenges(challenges[index]);
        this.closeModal();
    };

    ChallengesListModal.prototype.openModal = function openModal() {
        this.setState({
            show: true
        });
    };

    ChallengesListModal.prototype.closeModal = function closeModal() {
        this.setState({
            show: false,
            userNum: ''
        });
    };

    ChallengesListModal.prototype.render = function render() {
        var challenges = this.state.challenges;
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
                            'Pick a Routine'
                        )
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Modal.Body,
                        null,
                        challenges.map(function (challenge, index) {
                            return _react2.default.createElement(
                                'div',
                                { className: 'm-t5', key: index },
                                _react2.default.createElement('input', { type: 'radio', value: index, name: 'challenge' }),
                                challenge.id,
                                ':',
                                challenge.title
                            );
                        })
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Modal.Footer,
                        null,
                        _react2.default.createElement(
                            _reactBootstrap.Button,
                            { bsStyle: 'primary', type: 'submit' },
                            'Save'
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Button,
                            { bsStyle: 'default', onClick: this.closeModal.bind(this) },
                            'Back'
                        )
                    )
                )
            )
        );
    };

    return ChallengesListModal;
}(_react.Component);

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.challengesActions, dispatch);
}
exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps, null, { withRef: true })(ChallengesListModal);
//# sourceMappingURL=ChallengesListModal.js.map
