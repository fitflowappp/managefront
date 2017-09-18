/**
 * Created by john on 2016/5/27.
 */
const port = 3001;
var apiURL = 'http://manage.chuanpinmen.com';

if (process.env.NODE_ENV !== "production") {
    apiURL = 'http://192.168.1.2:9009';
}

if (process.env.NODE_API_HOST) {
    apiURL = process.env.NODE_API_HOST;
}

module.exports = {
    port,
    apiURL
};