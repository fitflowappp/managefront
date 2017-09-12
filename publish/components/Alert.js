'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Alert = function (_Component) {
    (0, _inherits3.default)(Alert, _Component);

    Alert.createRootEle = function createRootEle() {
        var root = document.getElementById("reactAlert");
        if (!root) {
            root = document.createElement('div');
            root.id = "reactAlert";
            document.body.appendChild(root);
        }
    };

    /**
     *
     * 消息
     * Alert.info({info:123});
     * Alert.info({info:123,closeTime:3000});
     * @param props
     */


    Alert.info = function info(props) {
        Alert.createRootEle();
        var p = document.createElement('div');
        document.getElementById("reactAlert").appendChild(p);
        var rele = (0, _reactDom.render)(_react2.default.createElement(Alert, (0, _extends3.default)({ type: "info" }, props)), p);
        if (props.closeTime) {
            rele.open(props.closeTime);
        } else {
            rele.open(1000);
        }
        return rele;
    };

    /**
     * alert
     *
     * Alert.alert({title:300,body:"hahah" ,cb:function(){
     *  do something
     * }})
     * @param props
     */


    Alert.alert = function alert(props) {
        Alert.createRootEle();
        var p = document.createElement('div');
        document.getElementById("reactAlert").appendChild(p);
        var rele = (0, _reactDom.render)(_react2.default.createElement(Alert, (0, _extends3.default)({ type: "alert" }, props)), p);
        rele.open();
        return rele;
    };

    /**
     * confirm
     *
     * Alert.confirm({title:300,body:"hahah" ,surecb:function(){
     *  do something
     * },cancelcb:function(){
     *  do something
     * }})
     * @param props
     */


    Alert.confirm = function confirm(props) {
        Alert.createRootEle();
        var p = document.createElement('div');
        document.getElementById("reactAlert").appendChild(p);
        var rele = (0, _reactDom.render)(_react2.default.createElement(Alert, (0, _extends3.default)({ type: "confirm" }, props)), p);
        rele.open();
        return rele;
    };

    Alert.prototype.close = function close() {
        this.content.close();
    };

    Alert.prototype.sure = function sure() {
        this.content.sure();
        var parent = _reactDom2.default.findDOMNode(this).parentNode;
        _reactDom2.default.unmountComponentAtNode(parent);
        document.getElementById("reactAlert").removeChild(parent);
    };

    Alert.prototype.open = function open(closeTime) {
        this.content.open();
        if (closeTime) {
            setTimeout(function () {
                this.destroy();
            }.bind(this), closeTime);
        }
    };

    Alert.prototype.destroy = function destroy() {
        this.close();
        var parent = _reactDom2.default.findDOMNode(this).parentNode;
        _reactDom2.default.unmountComponentAtNode(parent);
        document.getElementById("reactAlert").removeChild(parent);
    };

    function Alert(props) {
        (0, _classCallCheck3.default)(this, Alert);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.element = null;
        return _this;
    }

    Alert.prototype.render = function render() {
        return _react2.default.createElement('div', null);
    };

    Alert.prototype.componentDidMount = function componentDidMount() {
        this.element = _reactDom2.default.findDOMNode(this);
        this.componentDidUpdate();
    };

    Alert.prototype.componentWillUnmount = function componentWillUnmount() {
        var parent = _reactDom2.default.findDOMNode(this.content).parentNode;
        _reactDom2.default.unmountComponentAtNode(parent);
    };

    Alert.prototype.componentDidUpdate = function componentDidUpdate() {
        var type = this.props.type;

        var content;
        switch (type) {
            case "info":
                content = _react2.default.createElement(InfoModal, this.props);
                break;
            case "alert":
                content = _react2.default.createElement(AlertModal, (0, _extends3.default)({ close: this.destroy.bind(this) }, this.props));
                break;
            case "confirm":
                content = _react2.default.createElement(ConfirmModal, (0, _extends3.default)({ close: this.destroy.bind(this), sure: this.sure.bind(this) }, this.props));
                break;
            case "prompt":
                content = _react2.default.createElement(PromptModal, (0, _extends3.default)({ close: this.destroy.bind(this), sure: this.sure.bind(this) }, this.props));
                break;

        }
        this.content = (0, _reactDom.render)(content, this.element);
    };

    return Alert;
}(_react.Component); /**
                      * Created by bruce on 16-6-14.
                      */


exports.default = Alert;

var InfoModal = function (_Component2) {
    (0, _inherits3.default)(InfoModal, _Component2);

    function InfoModal(props) {
        (0, _classCallCheck3.default)(this, InfoModal);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, _Component2.call(this, props));

        _this2.state = {
            show: false
        };
        return _this2;
    }

    InfoModal.prototype.open = function open() {
        //打开模态框
        this.setState({
            show: true
        });
    };

    InfoModal.prototype.close = function close() {
        //关闭模态框
        this.setState({
            show: false
        });
    };

    InfoModal.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            { className: 'static-modal' },
            _react2.default.createElement(
                _reactBootstrap.Modal,
                { show: this.state.show, onHide: this.close.bind(this), bsSize: 'small' },
                _react2.default.createElement(
                    _reactBootstrap.Modal.Body,
                    { className: 'text-center' },
                    this.props.info
                )
            )
        );
    };

    return InfoModal;
}(_react.Component);

InfoModal.propTypes = {
    info: _react2.default.PropTypes.oneOfType([// any
    _react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired
};

var AlertModal = function (_Component3) {
    (0, _inherits3.default)(AlertModal, _Component3);

    function AlertModal(props) {
        (0, _classCallCheck3.default)(this, AlertModal);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, _Component3.call(this, props));

        _this3.state = {
            show: false
        };
        return _this3;
    }

    AlertModal.prototype.open = function open() {
        //打开模态框
        this.setState({
            show: true
        });
    };

    AlertModal.prototype.close = function close() {
        //关闭模态框
        this.props.cb && this.props.cb();
        this.setState({
            show: false
        });
    };

    AlertModal.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            { className: 'static-modal' },
            _react2.default.createElement(
                _reactBootstrap.Modal,
                { show: this.state.show, backdrop: false },
                _react2.default.createElement(
                    _reactBootstrap.Modal.Header,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Modal.Title,
                        null,
                        this.props.title
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.Modal.Body,
                    null,
                    this.props.body
                ),
                _react2.default.createElement(
                    _reactBootstrap.Modal.Footer,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { autoFocus: true, bsStyle: 'primary', onClick: this.props.close },
                        '\u786E\u5B9A'
                    )
                )
            )
        );
    };

    return AlertModal;
}(_react.Component);

AlertModal.propTypes = {
    body: _react2.default.PropTypes.oneOfType([// any
    _react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired,
    title: _react2.default.PropTypes.oneOfType([// any
    _react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    cb: _react2.default.PropTypes.func
};

var ConfirmModal = function (_Component4) {
    (0, _inherits3.default)(ConfirmModal, _Component4);

    function ConfirmModal(props) {
        (0, _classCallCheck3.default)(this, ConfirmModal);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, _Component4.call(this, props));

        _this4.state = {
            show: false
        };
        return _this4;
    }

    ConfirmModal.prototype.open = function open() {
        //打开模态框
        this.setState({
            show: true
        });
    };

    ConfirmModal.prototype.close = function close() {
        //关闭模态框
        this.props.cancelcb && this.props.cancelcb();
        this.setState({
            show: false
        });
    };

    ConfirmModal.prototype.sure = function sure() {
        //关闭模态框
        this.props.surecb && this.props.surecb();
        this.setState({
            show: false
        });
    };

    ConfirmModal.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            { className: 'static-modal' },
            _react2.default.createElement(
                _reactBootstrap.Modal,
                { show: this.state.show, backdrop: false },
                _react2.default.createElement(
                    _reactBootstrap.Modal.Header,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Modal.Title,
                        null,
                        this.props.title
                    )
                ),
                _react2.default.createElement(
                    _reactBootstrap.Modal.Body,
                    null,
                    this.props.body
                ),
                _react2.default.createElement(
                    _reactBootstrap.Modal.Footer,
                    null,
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { autoFocus: true, bsStyle: 'primary', onClick: this.props.sure },
                        '\u786E\u5B9A'
                    ),
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        { onClick: this.props.close },
                        '\u53D6\u6D88'
                    )
                )
            )
        );
    };

    return ConfirmModal;
}(_react.Component);

ConfirmModal.propTypes = {
    body: _react2.default.PropTypes.oneOfType([// any
    _react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired,
    title: _react2.default.PropTypes.oneOfType([// any
    _react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    surecb: _react2.default.PropTypes.func,
    cancelcb: _react2.default.PropTypes.func
};
//# sourceMappingURL=Alert.js.map
