# node-proxy #
This is a bare-bones example of how to serve a [Splunk Enterprise] web app and proxy through node.js.

I created this project to demonstrate how node can be used as a proxy between the front-end app and your Splunk Enterprise instance. I use the [express-http-proxy] node module to proxy requests between the node webserver and the Splunk instance.


To use the example for yourself:
1. Change the username and password in index.html
2. Replace YOUR_SPLUNK_SERVER with the fqdn or IP address of your real Splunk server.
3. Before you go to production, remove the line `process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";` in index.js which tells node.js to trust self-signed certificates.


Here are (some of) the [official docs] from Splunk.

[Splunk]: http://www.splunk.com
[express-http-proxy]: https://www.npmjs.com/package/express-http-proxy
[official docs]: http://dev.splunk.com/view/SP-CAAAEV9
