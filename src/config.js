/**
 * Created by john on 2016/5/27.
 */
const port = 3002;
var apiURL = 'http://localhost';

if (process.env.NODE_ENV !== "production") {
    apiURL = 'http://localhost:11000';
}
if (process.env.NODE_API_HOST) {
    apiURL = process.env.NODE_API_HOST;
}

if (process.env.NODE_TEST_API_HOST) {
    apiURL = process.env.NODE_TEST_API_HOST;
}
console.log("config url:"+apiURL);
module.exports = {
    port,
    apiURL
};