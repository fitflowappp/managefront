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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by qwr on 2017/9/13.
 */
var Milestones = function (_Component) {
    (0, _inherits3.default)(Milestones, _Component);

    function Milestones(props) {
        (0, _classCallCheck3.default)(this, Milestones);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            milestone: {
                achievementMinutes: 0,
                achievementMinutesContent: "",

                achievementWorkoutNum: 0,
                achievementWorkoutContent: ""
            },
            success: false
        };
        return _this;
    }

    Milestones.prototype.componentDidMount = function componentDidMount() {
        this.query();
    };

    Milestones.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

    Milestones.prototype.query = function query() {
        var getMileStones = this.props.getMileStones;

        var that = this;
        getMileStones({}, function (res) {
            if (!res.content.achievementMinutesContent) {
                res.content.achievementMinutesContent = '';
            }
            if (!res.content.achievementWorkoutContent) {
                res.content.achievementWorkoutContent = '';
            }
            that.setState({
                milestone: res.content
            });
        });
    };

    Milestones.prototype.save = function save(event) {
        event.preventDefault();
        var putMileStones = this.props.putMileStones;

        var that = this;
        putMileStones(this.state.milestone, function (res) {
            if (res.result.code == 1) {
                that.setState({
                    success: true
                });
            }
            _Alert2.default.info({ info: res.result.msg });
        });
    };

    Milestones.prototype.set = function set(e) {
        var name = e.target.getAttribute('name');
        var value = e.target.value;
        var milestone = this.state.milestone;
        milestone[name] = value;
        this.setState(milestone);
    };

    Milestones.prototype.back = function back() {
        window.history.go(-1);
    };

    Milestones.prototype.render = function render() {
        var milestone = this.state.milestone;
        var success = this.state.success;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'Milestones' }),
            _react2.default.createElement(
                'div',
                { className: 'box' },
                success && _react2.default.createElement(
                    'div',
                    { className: 'callout callout-success text-center' },
                    'Your changes have been succesfully saved'
                ),
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
                    _reactBootstrap.Form,
                    { role: 'form', onSubmit: this.save.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { className: 'box-body' },
                        _react2.default.createElement(
                            _reactBootstrap.Panel,
                            { style: { maxWidth: '600px' } },
                            _react2.default.createElement(
                                'p',
                                null,
                                'Exercise Minutes'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Users will receive an achievement after every how many total exercise minutes?'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Row,
                                { style: { maxWidth: '600px' } },
                                _react2.default.createElement(
                                    _reactBootstrap.Col,
                                    { sm: 2, className: 'm-t5' },
                                    _react2.default.createElement(
                                        'text',
                                        null,
                                        '30'
                                    )
                                ),
                                _react2.default.createElement(
                                    _reactBootstrap.Col,
                                    { sm: 8, className: 'm-t5' },
                                    _react2.default.createElement('input', { type: 'range', min: '30', max: '300', name: 'achievementMinutes', value: milestone.achievementMinutes, step: 1, onChange: this.set.bind(this) })
                                ),
                                _react2.default.createElement(
                                    _reactBootstrap.Col,
                                    { sm: 2, className: 'm-t5' },
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
                                        milestone.achievementMinutes
                                    )
                                ),
                                _react2.default.createElement(
                                    _reactBootstrap.Col,
                                    { sm: 12, className: 'm-t5' },
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'm-t5' },
                                        'Pop-up box message for exercise minutes milestone:'
                                    )
                                ),
                                _react2.default.createElement(
                                    _reactBootstrap.Col,
                                    { sm: 12, className: 'm-t5' },
                                    _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'achievementMinutesContent', value: milestone.achievementMinutesContent, onChange: this.set.bind(this) })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Panel,
                            { style: { maxWidth: '600px' }, className: 'm-t40' },
                            _react2.default.createElement(
                                'p',
                                null,
                                'Total Workouts'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Users will receive an achievement after every how many total workouts?'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Row,
                                { style: { maxWidth: '600px' } },
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
                                    _react2.default.createElement('input', { type: 'range', min: '1', max: '20', name: 'achievementWorkoutNum', value: milestone.achievementWorkoutNum, step: 1, onChange: this.set.bind(this) })
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
                                        milestone.achievementWorkoutNum
                                    )
                                ),
                                _react2.default.createElement(
                                    _reactBootstrap.Col,
                                    { sm: 12, className: 'm-t5' },
                                    _react2.default.createElement(
                                        'label',
                                        { className: 'm-t5' },
                                        'Pop-up box message for total wokrouts milestone:'
                                    )
                                ),
                                _react2.default.createElement(
                                    _reactBootstrap.Col,
                                    { sm: 12, className: 'm-t5' },
                                    _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'achievementWorkoutContent', value: milestone.achievementWorkoutContent, onChange: this.set.bind(this) })
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'box-footer clearfix' },
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
        );
    };

    return Milestones;
}(_react.Component);

function mapStateToProps(state) {
    return {
        milestones: state.milestones
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.milestonesActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(Milestones));
//# sourceMappingURL=Milestones.js.map
