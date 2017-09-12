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

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

var _actions = require('../../actions');

var _Alert = require('../Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _fetch = require('../../common/fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by qwr on 2017/6/29.
 */
var NetworkinfoModal = function (_Component) {
    (0, _inherits3.default)(NetworkinfoModal, _Component);

    function NetworkinfoModal(props) {
        (0, _classCallCheck3.default)(this, NetworkinfoModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            show: false,
            networkinfo: {
                openGId: '',
                name: '',
                gender: 1,
                wechat: '',
                wechatGpLimit: 0,
                phone: '',
                phoneGpLimit: 0,
                industry: '',
                province: '',
                city: '',
                company: {
                    name: '',
                    career: '',
                    desc: ''
                },
                resource: '',
                requirement: '',
                avatarUrl: ''
            },
            citysIndex: 1
        };
        return _this;
    }

    NetworkinfoModal.prototype.componentDidMount = function componentDidMount() {
        this.queryIndustry();
        this.queryAddress();
    };

    NetworkinfoModal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var editNetworkinfo = nextProps.editNetworkinfo;
        if (editNetworkinfo) {
            var provinces = this.props.networkinfo.provinces || [];
            var citysIndex = 1;
            for (var i = 0; i < provinces.length; i++) {
                if (provinces[i].province == editNetworkinfo.province) {
                    citysIndex = i + 1;
                }
            }
            this.setState({
                networkinfo: editNetworkinfo,
                citysIndex: citysIndex
            });
        } else {
            this.setState({
                networkinfo: {
                    openGId: '',
                    name: '',
                    gender: 1,
                    wechat: '',
                    wechatGpLimit: 0,
                    phone: '',
                    phoneGpLimit: 0,
                    industry: '',
                    province: '',
                    city: '',
                    company: {
                        name: '',
                        career: '',
                        desc: ''
                    },
                    resource: '',
                    requirement: '',
                    avatarUrl: ''
                }
            });
        }
    };

    NetworkinfoModal.prototype.queryIndustry = function queryIndustry() {
        var industry = this.props.industry;

        industry({});
    };

    NetworkinfoModal.prototype.queryAddress = function queryAddress() {
        var province = this.props.province;

        province({});
    };

    NetworkinfoModal.prototype._handleValidSubmit = function _handleValidSubmit(e) {
        e.preventDefault();
        var _props = this.props,
            postNetworkinfo = _props.postNetworkinfo,
            query = _props.query;

        var networkinfo = this.state.networkinfo;
        var that = this;
        postNetworkinfo(networkinfo, function (res) {
            query();
            that.closeModal();
        });
    };

    NetworkinfoModal.prototype.uploadFile = function uploadFile(e) {
        var target = e.target;
        var name = target.name;
        var that = this;
        var networkinfo = this.state.networkinfo;
        (0, _fetch.upload)(e).after(function (res) {
            networkinfo[name] = res[0].contentUri;
            that.setState({
                networkinfo: that.state.networkinfo
            });
        });
    };

    NetworkinfoModal.prototype.set = function set(e) {
        var name = e.target.getAttribute('name');
        var value = e.target.value;
        var networkinfo = this.state.networkinfo;
        if (name == 'province') {
            var index = e.target.selectedIndex;
            this.setState({
                citysIndex: index
            });
        }
        if (name == 'wechatGpLimit' || name == 'phoneGpLimit' || name == 'gender') {
            networkinfo[name] = Number(value);
        } else if (name == 'company_name' || name == 'company_career' || name == 'company_desc') {
            var companyName = name.split('_')[1];
            networkinfo.company[companyName] = value;
        } else {
            networkinfo[name] = value;
        }
        this.setState({
            networkinfo: networkinfo
        });
    };

    NetworkinfoModal.prototype.openModal = function openModal() {
        this.setState({
            show: true
        });
    };

    NetworkinfoModal.prototype.closeModal = function closeModal() {
        this.setState({
            show: false
        });
    };

    NetworkinfoModal.prototype.render = function render() {
        var editNetworkinfo = this.props.editNetworkinfo;
        var industrys = this.props.networkinfo.industrys || [];
        var provinces = this.props.networkinfo.provinces || [];
        var networkinfo = this.state.networkinfo;
        var citysIndex = this.state.citysIndex - 1;
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
                            editNetworkinfo ? '编辑人脉' : '新建人脉'
                        )
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Modal.Body,
                        null,
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'openGId' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u7FA4ID'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', name: 'openGId', value: networkinfo.openGId,
                                    onChange: this.set.bind(this) })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'name' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u59D3\u540D'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', name: 'name', value: networkinfo.name,
                                    onChange: this.set.bind(this), required: true })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'gender' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u6027\u522B'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(
                                    _reactBootstrap.Radio,
                                    { name: 'gender', value: '1', checked: networkinfo.gender == 1,
                                        onChange: this.set.bind(this), inline: true },
                                    '\u7537'
                                ),
                                _react2.default.createElement(
                                    _reactBootstrap.Radio,
                                    { name: 'gender', value: '2', checked: networkinfo.gender == 2,
                                        onChange: this.set.bind(this), inline: true },
                                    '\u5973'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'wechat' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u5FAE\u4FE1'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', name: 'wechat', value: networkinfo.wechat, onChange: this.set.bind(this), required: true })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'wechatGpLimit' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u5FAE\u4FE1\u9650\u5236'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(
                                    _reactBootstrap.Radio,
                                    { name: 'wechatGpLimit', value: '0', inline: true, checked: networkinfo.wechatGpLimit == 0,
                                        onChange: this.set.bind(this) },
                                    '\u516C\u5F00'
                                ),
                                _react2.default.createElement(
                                    _reactBootstrap.Radio,
                                    { name: 'wechatGpLimit', value: '1', inline: true, checked: networkinfo.wechatGpLimit == 1,
                                        onChange: this.set.bind(this) },
                                    '\u4EC5\u7FA4\u5185\u53EF\u89C1'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'phone' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u7535\u8BDD'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', name: 'phone', value: networkinfo.phone, onChange: this.set.bind(this), required: true })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'phoneGpLimit' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u7535\u8BDD\u9650\u5236'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(
                                    _reactBootstrap.Radio,
                                    { name: 'phoneGpLimit', value: '0', inline: true, checked: networkinfo.phoneGpLimit == 0,
                                        onChange: this.set.bind(this) },
                                    '\u516C\u5F00'
                                ),
                                _react2.default.createElement(
                                    _reactBootstrap.Radio,
                                    { name: 'phoneGpLimit', value: '1', inline: true, checked: networkinfo.phoneGpLimit == 1,
                                        onChange: this.set.bind(this) },
                                    '\u4EC5\u7FA4\u5185\u53EF\u89C1'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'industry' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u884C\u4E1A'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(
                                    _reactBootstrap.FormControl,
                                    { componentClass: 'select', name: 'industry', value: networkinfo.industry, onChange: this.set.bind(this), required: true },
                                    _react2.default.createElement(
                                        'option',
                                        { value: '' },
                                        '\u8BF7\u9009\u62E9'
                                    ),
                                    industrys.map(function (industry, index) {
                                        return _react2.default.createElement(
                                            'option',
                                            { key: index, value: industry.name },
                                            industry.name
                                        );
                                    })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'province_city' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u57CE\u5E02'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 5 },
                                _react2.default.createElement(
                                    _reactBootstrap.FormControl,
                                    { componentClass: 'select', name: 'province', value: networkinfo.province, onChange: this.set.bind(this), required: true },
                                    _react2.default.createElement(
                                        'option',
                                        { value: '' },
                                        '\u8BF7\u9009\u62E9'
                                    ),
                                    provinces.map(function (province, index) {
                                        return _react2.default.createElement(
                                            'option',
                                            { key: index, value: province.province },
                                            province.province
                                        );
                                    })
                                )
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 5 },
                                _react2.default.createElement(
                                    _reactBootstrap.FormControl,
                                    { componentClass: 'select', name: 'city', value: networkinfo.city, onChange: this.set.bind(this) },
                                    _react2.default.createElement(
                                        'option',
                                        { value: '' },
                                        '\u8BF7\u9009\u62E9'
                                    ),
                                    provinces.length > 0 && provinces[citysIndex].citys.map(function (city, index) {
                                        return _react2.default.createElement(
                                            'option',
                                            { key: index, value: city },
                                            city
                                        );
                                    })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'company_name' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u516C\u53F8\u540D\u79F0'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', name: 'company_name', value: networkinfo.company.name, onChange: this.set.bind(this) })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'company_career' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u516C\u53F8\u804C\u4F4D'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', name: 'company_career', value: networkinfo.company.career, onChange: this.set.bind(this) })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'company_desc' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u516C\u53F8\u9879\u76EE\u63CF\u8FF0'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', name: 'company_desc', value: networkinfo.company.desc, onChange: this.set.bind(this) })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'resource' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u8D44\u6E90'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: 'textarea', maxLength: '100', name: 'resource',
                                    placeholder: '100\u5B57\u5185', value: networkinfo.resource, onChange: this.set.bind(this), required: true })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'requirement' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u9700\u6C42'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: 'textarea', maxLength: '100', name: 'requirement',
                                    placeholder: '100\u5B57\u5185', value: networkinfo.requirement, onChange: this.set.bind(this) })
                            )
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.FormGroup,
                            { controlId: 'headerImg' },
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
                                '\u5934\u50CF'
                            ),
                            _react2.default.createElement(
                                _reactBootstrap.Col,
                                { sm: 10 },
                                _react2.default.createElement(_reactBootstrap.FormControl, { type: 'file', name: 'avatarUrl', onChange: this.uploadFile.bind(this) }),
                                networkinfo.avatarUrl && _react2.default.createElement('img', { src: networkinfo.avatarUrl, alt: '\u5934\u50CF', width: '50', className: 'm-t5' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Modal.Footer,
                        null,
                        _react2.default.createElement(
                            _reactBootstrap.Button,
                            { bsStyle: 'primary', type: 'submit' },
                            '\u786E\u8BA4'
                        ),
                        _react2.default.createElement(
                            _reactBootstrap.Button,
                            { bsStyle: 'default', onClick: this.closeModal.bind(this) },
                            '\u53D6\u6D88'
                        )
                    )
                )
            )
        );
    };

    return NetworkinfoModal;
}(_react.Component);

function mapStateToProps(state) {
    return {
        networkinfo: state.networkinfo
    };
}
function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(_actions.networkinfoActions, dispatch);
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, { withRef: true })(NetworkinfoModal);
//# sourceMappingURL=NetworkinfoModal.js.map
