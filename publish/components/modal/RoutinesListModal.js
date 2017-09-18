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
 * Created by qwr on 2017/9/15.
 */
var RoutinesListModal = function (_Component) {
    (0, _inherits3.default)(RoutinesListModal, _Component);

    function RoutinesListModal(props) {
        (0, _classCallCheck3.default)(this, RoutinesListModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            routines: [],
            show: false
        };
        return _this;
    }

    RoutinesListModal.prototype.componentDidMount = function componentDidMount() {
        var queryRoutines = this.props.queryRoutines;

        var that = this;
        queryRoutines({}, function (res) {
            that.setState({
                routines: res
            });
        });
    };

    RoutinesListModal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {};

    RoutinesListModal.prototype._handleValidSubmit = function _handleValidSubmit(event) {
        event.preventDefault();
        var pushRoutines = this.props.pushRoutines;

        var index = $("input[name='routines']:checked").val();
        var routines = this.state.routines;
        pushRoutines(routines[index]);
        this.closeModal();
    };

    RoutinesListModal.prototype.openModal = function openModal() {
        this.setState({
            show: true
        });
    };

    RoutinesListModal.prototype.closeModal = function closeModal() {
        this.setState({
            show: false,
            userNum: ''
        });
    };

    RoutinesListModal.prototype.render = function render() {
        var routines = this.state.routines;
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
                        routines.map(function (routine, index) {
                            return _react2.default.createElement(
                                'div',
                                { className: 'm-t5', key: index },
                                _react2.default.createElement('input', { type: 'radio', value: index, name: 'routines' }),
                                routine.id,
                                ':',
                                routine.title
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

    return RoutinesListModal;
}(_react.Component);

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.routinesActions, dispatch);
}
exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps, null, { withRef: true })(RoutinesListModal);
//# sourceMappingURL=RoutinesListModal.js.map
