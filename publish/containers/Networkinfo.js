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

var _NetworkinfoModal = require('../components/modal/NetworkinfoModal');

var _NetworkinfoModal2 = _interopRequireDefault(_NetworkinfoModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by qwr on 2017/6/29.
 */
var Networkinfo = function (_Component) {
    (0, _inherits3.default)(Networkinfo, _Component);

    function Networkinfo(props) {
        (0, _classCallCheck3.default)(this, Networkinfo);

        //初始化要使用的state
        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            editNetworkinfo: null,
            number: 0
        };
        return _this;
    }

    Networkinfo.prototype.componentDidMount = function componentDidMount() {
        this.query();
    };

    Networkinfo.prototype.query = function query() {
        var queryNetworkinfo = this.props.queryNetworkinfo;

        queryNetworkinfo({});
    };

    Networkinfo.prototype.add = function add() {
        this.setState({
            editNetworkinfo: null
        });
        this.refs['NetworkinfoModal'].getWrappedInstance().openModal();
    };

    Networkinfo.prototype.edit = function edit(networkinfo) {
        this.setState({
            editNetworkinfo: (0, _assign2.default)({}, networkinfo)
        });
        this.refs['NetworkinfoModal'].getWrappedInstance().openModal();
    };

    Networkinfo.prototype.handleSelect = function handleSelect() {};

    Networkinfo.prototype.render = function render() {
        var _this2 = this;

        var networkinfos = this.props.networkinfo.list || [];
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_reactHelmet2.default, { title: 'Networkinfo' }),
            _react2.default.createElement(_NetworkinfoModal2.default, { query: this.query.bind(this), editNetworkinfo: this.state.editNetworkinfo, ref: 'NetworkinfoModal' }),
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
                                '\u59D3\u540D'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                '\u7FA4ID'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                '\u6027\u522B'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                '\u5FAE\u4FE1\u53F7'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                '\u7535\u8BDD'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                '\u884C\u4E1A'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                '\u57CE\u5E02'
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
                        networkinfos.map(function (networkinfo, index) {
                            return _react2.default.createElement(
                                'tr',
                                { key: index },
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement('img', { src: networkinfo.avatarUrl, alt: '\u5934\u50CF', width: 50 })
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    networkinfo.name
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    networkinfo.openGId
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    networkinfo.gender == 1 ? '男' : '女'
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    networkinfo.wechat
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    networkinfo.phone
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    networkinfo.industry
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    networkinfo.province + networkinfo.city
                                ),
                                _react2.default.createElement(
                                    'td',
                                    null,
                                    _react2.default.createElement(_reactBootstrap.Button, { bsStyle: 'info', className: 'glyphicon glyphicon-pencil m-5', onClick: _this2.edit.bind(_this2, networkinfo) })
                                )
                            );
                        })
                    )
                )
            )
        );
    };

    return Networkinfo;
}(_react.Component);

function mapStateToProps(state) {
    return {
        networkinfo: state.networkinfo
    };
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.networkinfoActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactRouter.withRouter)(Networkinfo));
//# sourceMappingURL=Networkinfo.js.map
