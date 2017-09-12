'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * <ObjSelect options={options} onChange={selectChange.bind(this)} label="size" code="code" value={this.state.v}/>
 */
/**
 * Created by smk on 2016/9/23.
 */
var ObjSelect = function (_Component) {
    (0, _inherits3.default)(ObjSelect, _Component);

    function ObjSelect(props) {
        (0, _classCallCheck3.default)(this, ObjSelect);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        var options = props.options,
            label = props.label,
            code = props.code;

        var _options = [];
        var _optionsMap = new _map2.default();

        _options.push({ label: "请选择", value: "" });
        _optionsMap.set("", "");

        for (var prop in options) {
            var item = options[prop];
            _options.push({ label: item[label], value: item[code] });
            _optionsMap.set(String(item[code]), item);
        }

        _this.state = {
            optionsMap: _optionsMap,
            options: _options
        };

        return _this;
    }

    ObjSelect.prototype.selectChange = function selectChange(cb, e) {
        if (cb) cb(this.state.optionsMap.get(e.target.value));
    };

    ObjSelect.prototype.render = function render() {
        var value = this.props.value[this.props.code];
        return _react2.default.createElement(
            'select',
            { onChange: this.selectChange.bind(this, this.props.onChange), value: value },
            this.state.options && this.state.options.map(function (item, index) {
                return _react2.default.createElement(
                    'option',
                    { value: item.value, key: index },
                    item.label
                );
            })
        );
    };

    return ObjSelect;
}(_react.Component);

exports.default = ObjSelect;


ObjSelect.propTypes = {
    label: _react2.default.PropTypes.string.isRequired,
    code: _react2.default.PropTypes.string.isRequired,
    options: _react2.default.PropTypes.array,
    onChange: _react2.default.PropTypes.func
};
//# sourceMappingURL=ObjSelect.js.map
