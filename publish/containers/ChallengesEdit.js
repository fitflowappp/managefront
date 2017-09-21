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

var _fetch = require('../common/fetch');

var _actions = require('../actions');

var _Alert = require('../components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _WorkoutsListModal = require('../components/modal/WorkoutsListModal');

var _WorkoutsListModal2 = _interopRequireDefault(_WorkoutsListModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by qwr on 2017/9/18.
 */
var ChallengesEdit = function (_Component) {
    (0, _inherits3.default)(ChallengesEdit, _Component);

    function ChallengesEdit(props) {
        (0, _classCallCheck3.default)(this, ChallengesEdit);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            challenge: {
                code: '',
                title: '',
                subTitle: '',
                description: '',
                coverImg: null,
                workouts: []
            },
            success: false
        };
        return _this;
    }

    ChallengesEdit.prototype.componentDidMount = function componentDidMount() {
        var id = this.props.routeParams.id;
        if (id != 0) {
            var getChallenges = this.props.getChallenges;

            var that = this;
            getChallenges({ id: id }, function (res) {
                that.setState({
                    challenge: res.content
                });
            });
        }
    };

    ChallengesEdit.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

    ChallengesEdit.prototype.save = function save(event) {
        event.preventDefault();
        var _props = this.props,
            postChallenges = _props.postChallenges,
            putChallenges = _props.putChallenges;

        var challenge = this.state.challenge;
        var that = this;
        if (!challenge.id) {
            postChallenges(challenge, function (res) {
                if (res.result.code == 1) {
                    that.setState({
                        success: true
                    });
                }
                _Alert2.default.info({ info: res.result.msg });
            });
        } else {
            putChallenges(challenge, function (res) {
                if (res.result.code == 1) {
                    that.setState({
                        success: true
                    });
                }
                _Alert2.default.info({ info: res.result.msg });
            });
        }
    };

    ChallengesEdit.prototype.uploadFile = function uploadFile(e) {
        var target = e.target;
        var name = target.name;
        var that = this;
        var challenge = this.state.challenge;
        (0, _fetch.upload)(e).after(function (res) {
            challenge[name] = res[0];
            that.setState(challenge);
        });
    };

    ChallengesEdit.prototype.setChallenge = function setChallenge(e) {
        var target = e.target;
        var name = target.getAttribute('name');
        var challenge = this.state.challenge;
        var value = target.value;
        challenge[name] = value;
        this.setState(challenge);
    };

    ChallengesEdit.prototype.pushWorkouts = function pushWorkouts(obj) {
        var challenge = this.state.challenge;
        challenge.workouts.push(obj);
        this.setState(challenge);
    };

    ChallengesEdit.prototype.openWorkoutsListModal = function openWorkoutsListModal() {
        this.refs['WorkoutsListModal'].getWrappedInstance().openModal();
    };
    //排序routines


    ChallengesEdit.prototype.upChallenge = function upChallenge(index) {
        var challenge = this.state.challenge;
        var workouts = challenge.workouts;
        if (index != 0) {
            var before = workouts[index - 1];
            var after = workouts[index];
            workouts[index - 1] = after;
            workouts[index] = before;
            this.setState(challenge);
        }
    };
    //删除routines


    ChallengesEdit.prototype.delChallenge = function delChallenge(index) {
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

    ChallengesEdit.prototype.back = function back() {
        this.props.router.goBack();
    };

    ChallengesEdit.prototype.render = function render() {
        var _this2 = this;

        var challenge = this.state.challenge;
        var success = this.state.success;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'Edit Challenge' }),
            _react2.default.createElement(_WorkoutsListModal2.default, { ref: 'WorkoutsListModal', pushWorkouts: this.pushWorkouts.bind(this) }),
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
                        'Edit Challenge'
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
                                'Challenge ID:'
                            ),
                            _react2.default.createElement(_reactBootstrap.Col, { lg: 9, className: 'm-t10' })
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
                                    'Challenge Code:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'code', value: challenge.code, onChange: this.setChallenge.bind(this) })
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'm-t5' },
                                    'Challenge Title:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'title', value: challenge.title, onChange: this.setChallenge.bind(this) })
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'm-t5' },
                                    'Challenge Subtitle:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'subTitle', value: challenge.subTitle, onChange: this.setChallenge.bind(this) })
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 3, className: 'm-t10' },
                                _react2.default.createElement(
                                    'label',
                                    { className: 'm-t5' },
                                    'Challenge Description:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t10' },
                                _react2.default.createElement('input', { type: 'text', className: 'form-control', style: { maxWidth: '615px' }, required: true, placeholder: '', name: 'description', value: challenge.description, onChange: this.setChallenge.bind(this) })
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
                                    'Challenge Image:'
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
                                challenge.coverImg && _react2.default.createElement('img', { src: challenge.coverImg.contentUri, alt: 'Challenge Image', width: 100 })
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
                                    'Challenge Workouts:'
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { lg: 9, className: 'm-t5' },
                                challenge.workouts.map(function (workout, index) {
                                    return _react2.default.createElement(
                                        'div',
                                        { key: index, className: 'm-b5' },
                                        _react2.default.createElement('i', { onClick: _this2.upChallenge.bind(_this2, index), className: 'fa fa-arrow-up text-primary pointer m-r10', style: { fontSize: '20px' } }),
                                        'Workout',
                                        workout.code,
                                        ':',
                                        workout.title,
                                        _react2.default.createElement('i', { onClick: _this2.delChallenge.bind(_this2, index), className: 'fa fa-close text-danger pointer m-l10', style: { fontSize: '20px' } })
                                    );
                                }),
                                _react2.default.createElement('i', { onClick: this.openWorkoutsListModal.bind(this), className: 'fa fa-plus-square text-primary pointer', style: { fontSize: '40px' } })
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

    return ChallengesEdit;
}(_react.Component);

function mapStateToProps(state) {
    return {
        challenges: state.challenges
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.challengesActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(ChallengesEdit));
//# sourceMappingURL=ChallengesEdit.js.map
