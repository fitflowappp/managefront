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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by qwr on 2016/5/31.
 */
var Map = function (_Component) {
    (0, _inherits3.default)(Map, _Component);

    function Map(props) {
        (0, _classCallCheck3.default)(this, Map);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

        _this.state = {
            user: _this.props.user
        };
        return _this;
    }
    //客户端初次加载初始化


    Map.prototype.componentDidMount = function componentDidMount() {
        this.getMap();
    };

    Map.prototype.componentWillUnmount = function componentWillUnmount() {
        var eles = document.getElementsByTagName("script");
        for (var i = eles.length - 1; i >= 0; i--) {
            var s = eles[i].getAttribute("src");
            if (s && /http:\/\/api\.map\.baidu/.test(s)) {
                // document.body.removeChild(eles[i]);
                eles[i].parentNode.removeChild(eles[i]);
            }
        }
        window.mapMarkerGps = undefined;
    };

    Map.prototype.getMap = function getMap() {
        //api回调函数
        var user = this.state.user;
        window.mapMarkerGps = function () {
            if (!document.getElementById('map')) {
                return;
            }
            var map = new BMap.Map('map');
            var myGeo = new BMap.Geocoder(),
                domicileIcon = new BMap.Symbol(BMap_Symbol_SHAPE_POINT, { scale: 1.3, fillColor: 'green', fillOpacity: 0.8 }),
                // 户籍地 {图标缩放大小 填充颜色 填充透明度}
            schoolIcon = new BMap.Symbol(BMap_Symbol_SHAPE_POINT, { scale: 1.4, fillColor: 'red', fillOpacity: 0.8 }),
                // 学校点
            userIcon = new BMap.Symbol(BMap_Symbol_SHAPE_POINT, { scale: 1.5, fillColor: 'orange', fillOpacity: 0.8 }); // 用户点
            // 编写自定义函数, 创建标注 domicile GPS
            function addMarkerDomicile() {
                myGeo.getPoint(user.idCardLocation, function (point) {
                    if (point) {
                        map.centerAndZoom(point, 12);
                        map.addOverlay(new BMap.Marker(point, { icon: domicileIcon }));
                    }
                    // 标注点 school
                    if (user.location) addMarkerSchool();
                    // 标注点 user
                    if (user.lng != 0) addMarkerUser();
                }, '');
            }
            // 编写自定义函数, 创建标注 school GPS
            function addMarkerSchool() {
                var point = new BMap.Point(user.location.center[0], user.location.center[1]);
                map.centerAndZoom(point, 12);
                map.addOverlay(new BMap.Marker(point, { icon: schoolIcon }));
                // 覆盖物 圆
                var circle = new BMap.Circle(point, user.location.radius);
                map.addOverlay(circle);
            }
            // 编写自定义函数, 创建标注 user GPS
            function addMarkerUser() {
                var point = new BMap.Point(user.lng, user.lat);
                map.centerAndZoom(point, 12);
                map.addOverlay(new BMap.Marker(point, { icon: userIcon }));
            }
            //增加缩放功能
            map.enableScrollWheelZoom(true);
            if (user.idCardLocation || user.location || user.lng != 0) {
                addMarkerDomicile();
            } else {
                map.centerAndZoom('中国', 4);
            }
        };
        var script = document.getElementById("mapScript");
        if (!script) {
            script = document.createElement('script');
            script.id = "mapScript";
            script.src = "http://api.map.baidu.com/api?v=2.0&ak=KBwKAPPw9keZ0xQt7UfwuqC8&callback=mapMarkerGps";
            document.body.appendChild(script);
        }
    };

    Map.prototype.render = function render() {
        return null;
    };

    return Map;
}(_react.Component);

exports.default = Map;
//# sourceMappingURL=Map.js.map
