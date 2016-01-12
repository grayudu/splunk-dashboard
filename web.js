// save a reference to our dependencies.
var express = require('express');
var proxy = require('express-http-proxy');

// instantiate the express framework.
var app = express();

// trust self-signed SSL certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// create proxy -- requests to /proxy/... will be forwarded
// to YOUR_SPLUNK_SERVER on port 8089 using TLS
// I don't fully understand the JSON parsing that is necessary in the
// intercept property, but it is necessary to work
var splunkServerUrl = process.env['splunk_server_url'] || '';
app.use('/proxy', proxy(splunkServerUrl, {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  },
  intercept: function(rsp, data, req, res, callback) {
    var buf = new Buffer(data);
    callback(null, buf);
  },
  port: 8089
}));

// serve the index.html through the express framework
// note that the inner function refers to the dependency
// for the library, not the instance
app.use('/', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.listen(process.env.PORT || 5000);
