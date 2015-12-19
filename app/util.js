var logout = function () {
  require(["jquery",
           "jquery.cookie"
          ], function ($) {
            $.cookie("splunk_sessionkey", null, { path: '/'});
            $.cookie("splunk_username", null, { path: '/'});
            window.location.replace("#/login");
        });
    };
if (!document.cookie) {
  window.location.replace("#/login");
}
