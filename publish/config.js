'use strict';

/**
 * Created by john on 2016/5/27.
 */
var port = 3002;
var apiURL = 'http://localhost';

if (process.env.NODE_ENV !== "production") {
    apiURL = 'http://192.168.1.2:9009';
}

if (process.env.NODE_API_HOST) {
    apiURL = process.env.NODE_API_HOST;
}

if (process.env.NODE_TEST_API_HOST) {
    apiURL = process.env.NODE_TEST_API_HOST;
}

module.exports = {
    port: port,
    apiURL: apiURL
};
//# sourceMappingURL=config.js.map
