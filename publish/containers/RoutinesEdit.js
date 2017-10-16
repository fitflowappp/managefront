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

var _fetch = require('../common/fetch');

var _reactBootstrap = require('react-bootstrap');

var _actions = require('../actions');

var _Alert = require('../components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RoutinesEdit = function (_Component) {
    (0, _inherits3.default)(RoutinesEdit, _Component);

    function RoutinesEdit(props) {
        (0, _classCallCheck3.default)(this, RoutinesEdit);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            routine: {
                code: '',
                title: '',
                duration: '',
                display: true,
                video: null
            },
            success: false
        };
        return _this;
    }

    RoutinesEdit.prototype.componentDidMount = function componentDidMount() {
        var id = this.props.routeParams.id;
        if (id != 0) {
            var getRoutines = this.props.getRoutines;

            var that = this;
            getRoutines({ id: id }, function (res) {
                that.setState({
                    routine: res.content
                });
            });
        }
    };

    RoutinesEdit.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

    RoutinesEdit.prototype.save = function save(event) {
        event.preventDefault();
        var _props = this.props,
            postRoutines = _props.postRoutines,
            putRoutines = _props.putRoutines;

        var routine = this.state.routine;
        var that = this;
        if (!routine.id) {
            postRoutines(routine, function (res) {
                if (res.result.code == 1) {
                    that.setState({
                        success: true
                    });
                    that.back();
                }
                _Alert2.default.info({ info: res.result.msg });
            });
        } else {
            putRoutines(routine, function (res) {
                if (res.result.code == 1) {
                    that.setState({
                        success: true
                    });
                }
                _Alert2.default.info({ info: res.result.msg });
            });
        }
    };

    RoutinesEdit.prototype.uploadFile = function uploadFile(e) {
        var target = e.target;
        var name = target.name;
        var that = this;
        var routine = this.state.routine;
        (0, _fetch.upload)(e, function (percentCompleted) {
            that.setState({
                process: percentCompleted * 100 + '%'
            });
        }).after(function (res) {
            routine[name] = res[0];
            that.setState(routine);
        });
    };

    RoutinesEdit.prototype.setRoutine = function setRoutine(e) {
        var name = e.target.getAttribute('name');
        var value = e.target.value;
        var routine = this.state.routine;
        if (name == 'display') {
            value = !routine.display;
        }
        routine[name] = value;
        this.setState(routine);
    };

    RoutinesEdit.prototype.back = function back() {
        this.props.router.goBack();
    };

    RoutinesEdit.prototype.render = function render() {
        var routine = this.state.routine;
        var success = this.state.success;
        var process = this.state.process;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'RoutinesEdit' }),
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
                        'Edit Routine'
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.Form,
                    { role: 'form', onSubmit: this.save.bind(this) },
                    _react2.default.createElement(
                        'div',
                        { className: 'box-body' },
                        _react2.default.createElement(
                            _reactBootstrap.Row,
                            null,
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                'Routine ID:'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                routine.id
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Row,
                            null,
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                'Number of times started:'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                routine.startedTimes
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Row,
                            null,
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                'Number of times skipped:'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                routine.skippedTimes
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Row,
                            { className: 'm-t40' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'm-t5' },
                                    'Routine Code:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'code', value: routine.code, onChange: this.setRoutine.bind(this) })
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'm-t5' },
                                    'Routine Title:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'title', value: routine.title, onChange: this.setRoutine.bind(this) })
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'Code', className: 'm-t5' },
                                    'Routine Duration:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'duration', value: routine.duration, onChange: this.setRoutine.bind(this) })
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement(
                                    'label',
                                    { htmlFor: 'Code', className: 'm-t5' },
                                    'Routine Video:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'file', name: 'video', onChange: this.uploadFile.bind(this) }),
                                process && process != '100%' && _react2.default.createElement(
                                    'div',
                                    { className: 'progress m-t5', style: { width: '200px', marginBottom: 'auto', verticalAlign: 'middle' } },
                                    _react2.default.createElement('div', { className: 'progress-bar', role: 'progressbar', 'aria-valuenow': '50', 'aria-valuemin': '0', 'aria-valuemax': '100', style: { width: this.state.process } })
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 6, className: 'm-t10' },
                                routine.video && _react2.default.createElement(
                                    'video',
                                    { width: 200, src: routine.video.contentUri, controls: 'controls' },
                                    '\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 video \u6807\u7B7E\u3002'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 12 },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'checkbox' },
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        _react2.default.createElement('input', { type: 'checkbox', name: 'display', checked: routine.display, onChange: this.setRoutine.bind(this) }),
                                        'Display in Workout detail page?'
                                    )
                                )
                            )
                        )
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

    return RoutinesEdit;
}(_react.Component); /**
                      * Created by qwr on 2017/9/14.
                      */


function mapStateToProps(state) {
    return {
        routines: state.routines
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.routinesActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(RoutinesEdit));
//# sourceMappingURL=RoutinesEdit.js.map
