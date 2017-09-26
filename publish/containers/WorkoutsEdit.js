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

var _RoutinesListModal = require('../components/modal/RoutinesListModal');

var _RoutinesListModal2 = _interopRequireDefault(_RoutinesListModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by qwr on 2017/9/14.
 */
var WorkoutsEdit = function (_Component) {
    (0, _inherits3.default)(WorkoutsEdit, _Component);

    function WorkoutsEdit(props) {
        (0, _classCallCheck3.default)(this, WorkoutsEdit);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            workout: {
                code: '',
                title: '',
                duration: '',
                description: '',
                message: '',
                coverImg: null,
                routines: []
            },
            success: false
        };
        return _this;
    }

    WorkoutsEdit.prototype.componentDidMount = function componentDidMount() {
        var id = this.props.routeParams.id;
        if (id != 0) {
            var getWorkouts = this.props.getWorkouts;

            var that = this;
            getWorkouts({ id: id }, function (res) {
                that.setState({
                    workout: res.content
                });
            });
        }
    };

    WorkoutsEdit.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

    WorkoutsEdit.prototype.save = function save(event) {
        event.preventDefault();
        var _props = this.props,
            postWorkouts = _props.postWorkouts,
            putWorkouts = _props.putWorkouts;

        var workout = this.state.workout;
        var that = this;
        if (!workout.id) {
            postWorkouts(workout, function (res) {
                if (res.result.code == 1) {
                    that.setState({
                        success: true
                    });
                }
                _Alert2.default.info({ info: res.result.msg });
            });
        } else {
            putWorkouts(workout, function (res) {
                if (res.result.code == 1) {
                    that.setState({
                        success: true
                    });
                }
                _Alert2.default.info({ info: res.result.msg });
            });
        }
    };

    WorkoutsEdit.prototype.uploadFile = function uploadFile(e) {
        var target = e.target;
        var name = target.name;
        var that = this;
        var workout = this.state.workout;
        (0, _fetch.upload)(e).after(function (res) {
            workout[name] = res[0];
            that.setState(workout);
        });
    };

    WorkoutsEdit.prototype.setWorkout = function setWorkout(e) {
        var target = e.target;
        var name = target.getAttribute('name');
        var workout = this.state.workout;
        var value = target.value;
        workout[name] = value;
        this.setState(workout);
    };

    WorkoutsEdit.prototype.pushRoutines = function pushRoutines(obj) {
        var workout = this.state.workout;
        workout.routines.push(obj);
        this.setState(workout);
    };

    WorkoutsEdit.prototype.openRoutinesListModal = function openRoutinesListModal() {
        this.refs['RoutinesListModal'].getWrappedInstance().openModal();
    };
    //排序routines


    WorkoutsEdit.prototype.upRoutines = function upRoutines(index) {
        var workout = this.state.workout;
        var routines = workout.routines;
        if (index != 0) {
            var before = routines[index - 1];
            var after = routines[index];
            routines[index - 1] = after;
            routines[index] = before;
            this.setState(workout);
        }
    };
    //删除routines


    WorkoutsEdit.prototype.delRoutines = function delRoutines(index) {
        var that = this;
        _Alert2.default.confirm({
            title: 'delete', body: "confirm？", surecb: function surecb() {
                var workout = that.state.workout;
                var routines = workout.routines;
                routines.splice(index, 1);
                that.setState(workout);
            }
        });
    };

    WorkoutsEdit.prototype.back = function back() {
        this.props.router.goBack();
    };

    WorkoutsEdit.prototype.render = function render() {
        var _this2 = this;

        var workout = this.state.workout;
        var success = this.state.success;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'WorkoutsEdit' }),
            _react2.default.createElement(_RoutinesListModal2.default, { ref: 'RoutinesListModal', pushRoutines: this.pushRoutines.bind(this) }),
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
                        'Edit Workout'
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
                                'Workout ID:'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                workout.id
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
                            _react2.default.createElement(_reactBootstrap.Col, { lg: 3, className: 'm-t10' }),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                'Number of unique users started:'
                            ),
                            _react2.default.createElement(_reactBootstrap.Col, { lg: 3, className: 'm-t10' })
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Row,
                            null,
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                'Number of times completed:'
                            ),
                            _react2.default.createElement(_reactBootstrap.Col, { lg: 3, className: 'm-t10' }),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                'Number of unique users completed:'
                            ),
                            _react2.default.createElement(_reactBootstrap.Col, { lg: 3, className: 'm-t10' })
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
                                    'Workout Code:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'code', value: workout.code, onChange: this.setWorkout.bind(this) })
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'm-t5' },
                                    'Workout Title:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'title', value: workout.title, onChange: this.setWorkout.bind(this) })
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'm-t5' },
                                    'Workout Duration(mins):'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'duration', value: workout.duration, onChange: this.setWorkout.bind(this) })
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'm-t5' },
                                    'Workout Description:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'description', value: workout.description, onChange: this.setWorkout.bind(this) })
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'm-t5' },
                                    'Completion Message:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'message', value: workout.message, onChange: this.setWorkout.bind(this) })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Row,
                            null,
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'm-t5' },
                                    'Workout Image:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'file', name: 'coverImg', onChange: this.uploadFile.bind(this) })
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 6, className: 'm-t10' },
                                workout.coverImg && _react2.default.createElement('img', { src: workout.coverImg.contentUri, alt: 'Workout Image', width: 100 })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Row,
                            null,
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'm-t5' },
                                    'Associated Routines:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t5' },
                                workout.routines.map(function (routine, index) {
                                    return _react2.default.createElement(
                                        'div',
                                        { key: index, className: 'm-b5' },
                                        _react2.default.createElement('i', { onClick: _this2.upRoutines.bind(_this2, index), className: 'fa fa-arrow-up text-primary pointer m-r10', style: { fontSize: '20px' } }),
                                        'Routine',
                                        routine.code,
                                        ':',
                                        routine.title,
                                        _react2.default.createElement('i', { onClick: _this2.delRoutines.bind(_this2, index), className: 'fa fa-close text-danger pointer m-l10', style: { fontSize: '20px' } })
                                    );
                                }),
                                _react2.default.createElement('i', { onClick: this.openRoutinesListModal.bind(this), className: 'fa fa-plus-square text-primary pointer', style: { fontSize: '40px' } })
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

    return WorkoutsEdit;
}(_react.Component);

function mapStateToProps(state) {
    return {
        workouts: state.workouts
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.workoutsActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(WorkoutsEdit));
//# sourceMappingURL=WorkoutsEdit.js.map
