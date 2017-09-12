'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRedux = require('react-redux');

var _configureStore = require('./store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var proxy = require('http-proxy-middleware');
/**
 * Created by john on 2016/5/16.
 */
var compression = require('compression');
var server = global.server = (0, _express2.default)();
var http = require('http');
var agent = new http.Agent({ maxSockets: Number.MAX_VALUE });
//api服务器代理 若使用nginx代理接口,fetch配置需要根据客户端和服务端 配置api地址
// server.use('/bwm',proxy({target: apiURL, changeOrigin: true}));
// server.use('/api',proxy({
//     target: apiURL, // target host
//     changeOrigin: false,               // needed for virtual hosted sites
//     ws: false,                         // proxy websockets
//     pathRewrite: {
//         '^/api' : '/bwm/manage'     // rewrite path
//         // '^/remove/api' : '/api'       // remove path
//     },
//     onError:function onError(err, req, res) {
//         res.writeHead(500, {
//             'Content-Type': 'text/plain'
//         });
//         res.end('Something went wrong.');
//     }
//     // proxyTable: {
//     //     // when request.headers.host == 'dev.localhost:3000',
//     //     // override target 'http://www.example.org' to 'http://localhost:8000'
//     //     'dev.localhost:3000' : 'http://localhost:8000'
//     // }
// }));
var httpProxy = require('http-proxy');

var apiProxy = httpProxy.createProxyServer({
    target: _config.apiURL,
    ignorePath: false,
    agent: agent,
    changeOrigin: true
    // prependPath: false
    // {
    //     host: '101.69.182.82',
    //     port: 9090
    // }
    //target:"http://101.69.182.82:9090",
    //url = url.replace("/api/","/bwm/manage/");

});

apiProxy.on('error', function (error, req, res) {
    var json = void 0;
    if (!res.headersSent) {
        res.writeHead(500, { 'content-type': 'application/json' });
    }
    json = { error: 'proxy_error', reason: error.message };
    res.end((0, _stringify2.default)(json));
});

server.all("/api/*", function (req, res) {
    var url = req.url;
    url = url.replace("/api/", "/bbs/manage/");
    req.url = url;
    apiProxy.web(req, res);
    // return httpProxy.web(req, res , { target: "http://another-domain:8000" } );
});
server.all("/bbs/*", function (req, res) {
    // var url = req.url;
    // url = url.replace("/bbs/", "/bbs/");
    // req.url = url;
    apiProxy.web(req, res);
    // return httpProxy.web(req, res , { target: "http://another-domain:8000" } );
});

server.all("/front/*", function (req, res) {
    var url = req.url;
    url = url.replace("/front/", "/bbs/");
    req.url = url;
    apiProxy.web(req, res);
    // return httpProxy.web(req, res , { target: "http://another-domain:8000" } );
});
server.all("/public/view/*", function (req, res) {
    // var url = req.url;
    // url = url.replace("/view/", "/view/");
    // req.url = url;
    apiProxy.web(req, res);
    // return httpProxy.web(req, res , { target: "http://another-domain:8000" } );
});
server.all("/view/*", function (req, res) {
    // var url = req.url;
    // url = url.replace("/view/", "/view/");
    // req.url = url;
    apiProxy.web(req, res);
    // return httpProxy.web(req, res , { target: "http://another-domain:8000" } );
});
if (process.env.NODE_ENV !== "production") {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var config = require('../webpack.dev.config');
    var compiler = webpack(config);
    server.use(webpackDevMiddleware(compiler, {
        noInfo: true, publicPath: config.output.publicPath,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        }
    }));
    server.use(webpackHotMiddleware(compiler));
}
/**
 *  静态文件可使用nginx代理或者直接用node，效率未测试
 *    server {

        listen 9000;
        server_name 192.168.1.99:9000;

        location / {
			proxy_pass    http://192.168.1.99:3000/;
            proxy_redirect default ;
        }
		location /dist/ {
			alias D:/WebstormProjects/react-redux/dist/;
		}
    }
 */
server.use(compression());
server.use('/dist', _express2.default.static(__dirname + '/dist'));

server.use(function (req, res) {
    _reactCookie2.default.setRawCookie(req.headers.cookie);
    _reactCookie2.default.save = res.cookie;
    (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).end('Internal Server Error ' + err);
        } else if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            var store = (0, _configureStore2.default)();
            // const state = store.getState();
            var arr = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(renderProps.components), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var component = _step.value;

                    if (component && component.serverInit) {
                        if (component.serverInit instanceof Array) {
                            arr = arr.concat(component.serverInit);
                        } else {
                            arr.push(component.serverInit);
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            _promise2.default.all(arr.map(function (serverInit) {
                if (serverInit instanceof Function) return store.dispatch(serverInit(renderProps));
            })).catch(function (status) {
                if (status == 401) {
                    res.redirect("/login");
                }
            }).then(function () {
                var html = (0, _server.renderToString)(_react2.default.createElement(
                    _reactRedux.Provider,
                    { store: store },
                    _react2.default.createElement(_reactRouter.RouterContext, renderProps)
                ));
                var head = _reactHelmet2.default.rewind();
                res.end(renderFullPage(html, head, store.getState()));
            });
        } else {
            res.status(404).end('Not found');
        }
    });
});

function renderFullPage(html, head, initialState) {
    return '\n    <!DOCTYPE html>\n    <html>\n    <head>\n      <meta charset="UTF-8">\n      <meta name="viewport" content="width=device-width, initial-scale=1" />\n      ' + head.title.toString() + '\n        <link href="/dist/stylesheets/bootstrap.css" rel="stylesheet" type="text/css" />\n        <link href="/dist/stylesheets/app.css" media="screen, projection" rel="stylesheet" type="text/css" />\n        <link rel="shortcut icon" href="/dist/favicon.ico">\n        <!--[if IE]>\n            <link href="/dist/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />\n        <![endif]-->\n    </head>\n    <body>\n      <div id="root">\n        <div>\n          ' + html + '\n        </div>\n      </div>\n      <script>\n        window.__INITIAL_STATE__ = ' + (0, _stringify2.default)(initialState) + ';\n      </script>\n      <script src="/dist/bundle.js"></script>\n    </body>\n    </html>\n  ';
}

// This is fired every time the server side receives a request
server.listen(_config.port, function (error) {
    if (error) {
        console.error(error);
    } else {
        //console.info(`==>  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    }
});
//# sourceMappingURL=server.js.map
