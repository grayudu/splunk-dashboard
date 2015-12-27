# splunk-dashboard #

This is a data visualization dashboard. The back-end relies on Splunk Enterprise running on an AWS ec2 instance. The charts and graphs come from SplunkJs, which is also built by Splunk. The front-end is built with AngularJS, served up by Node.js and Express.js from a Heroku container. Express.js also provides a proxy to the Splunk back-end.

This is still a work in progress, but here's what I know so far:

1. Chart and dashboard view configuration is controlled through a json file. Adding a new chart or dashboard page does not require changing the application code. And of course, loading a view will fetch the latest data from Splunk itself.
2. TBD...

## Instructions ##
1. Clone the repo
2. Set up an environment variable pointing to your Splunk installation: `export splunk_server_url=https://YOUR-NODE.compute.amazonaws.com`

  In production, set up a (Heroku) environment variable.
3. Run the Node web server. I use nodemon which restarts Node whenever a file is changed. `nodemon`
