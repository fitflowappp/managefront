/**
 * Created by john on 2016/5/16.
 */
import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {RouterContext, match} from 'react-router';
import routes from './routes';
import cookie from 'react-cookie'
import Helmet from 'react-helmet'
import {port, apiURL} from './config'
// var proxy = require('http-proxy-middleware');
var compression = require('compression')
const server = global.server = express();
var http = require('http');
var agent = new http.Agent({maxSockets: Number.MAX_VALUE});
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
    target: apiURL,
    ignorePath: false,
    agent: agent,
    changeOrigin:true
    // prependPath: false
    // {
    //     host: '101.69.182.82',
    //     port: 9090
    // }
    //target:"http://101.69.182.82:9090",
    //url = url.replace("/api/","/bwm/manage/");

});


apiProxy.on('error', (error, req, res) => {
    let json;
    if (!res.headersSent) {
        res.writeHead(500, {'content-type': 'application/json'});
    }
    json = {error: 'proxy_error', reason: error.message};
    res.end(JSON.stringify(json));
});

server.all("/api/*", function (req, res) {
    var url = req.url;
    url = url.replace("/api/", "/");
    req.url = url;
    apiProxy.web(req, res);
    // return httpProxy.web(req, res , { target: "http://another-domain:8000" } );
});
/*server.all("/bbs/!*", function (req, res) {
    // var url = req.url;
    // url = url.replace("/bbs/", "/bbs/");
    // req.url = url;
    apiProxy.web(req, res);
    // return httpProxy.web(req, res , { target: "http://another-domain:8000" } );
});

server.all("/front/!*", function (req, res) {
    var url = req.url;
    url = url.replace("/front/", "/bbs/");
    req.url = url;
    apiProxy.web(req, res);
    // return httpProxy.web(req, res , { target: "http://another-domain:8000" } );
});*/
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
server.use('/dist', express.static(__dirname + '/dist'));


server.use((req, res) => {
    cookie.setRawCookie(req.headers.cookie);
    cookie.save = res.cookie;
    match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
        if (err) {
            res.status(500).end(`Internal Server Error ${err}`);
        } else if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const store = configureStore();
            // const state = store.getState();
            var arr = [];
            for (var component of renderProps.components) {
                if (component && component.serverInit) {
                    if (component.serverInit instanceof Array) {
                        arr = arr.concat(component.serverInit)
                    } else {
                        arr.push(component.serverInit)
                    }
                }
            }
            Promise.all(arr.map(function (serverInit) {
                    if (serverInit instanceof Function)
                        return store.dispatch(serverInit(renderProps))
                }))
                .catch(function (status) {
                    if (status == 401) {
                        res.redirect("/login");
                    }
                })
                .then(() => {
                    const html = renderToString(
                        <Provider store={store}>
                            <RouterContext {...renderProps} />
                        </Provider>
                    );
                    let head = Helmet.rewind();
                    res.end(renderFullPage(html, head, store.getState()));
                })
        } else {
            res.status(404).end('Not found');
        }
    });
});

function renderFullPage(html, head, initialState) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      ${head.title.toString()}
        <link href="/dist/stylesheets/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="/dist/stylesheets/datatables.css" rel="stylesheet" type="text/css" />
        <link href="/dist/stylesheets/AdminLTE.css" rel="stylesheet" type="text/css" />
        <link href="/dist/stylesheets/_all-skins.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
        <link href="/dist/stylesheets/app.css" media="screen, projection" rel="stylesheet" type="text/css" />
        <link rel="shortcut icon" href="/dist/favicon.ico">
        <!--[if IE]>
            <link href="/dist/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
        <![endif]-->
    </head>
    <body class='sidebar-mini skin-blue'>
      <div id="root">
        <div>
          ${html}
        </div>
      </div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script src="/dist/bundle.js"></script>
      <script src="/dist/jquery.js"></script>
      <script src="/dist/bootstrap.js"></script>
       <script src="/dist/adminlte.js"></script>
    </body>
    </html>
  `;
}

// This is fired every time the server side receives a request
server.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {
        //console.info(`==>  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    }
});