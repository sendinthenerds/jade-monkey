(function() {
  module.exports = {
    init: function() {
      return require('./projectCreate')();
    },
    build: function() {
      return require('./sourceCompile')();
    },
    post: function() {
      return require('./blogPostCreate')();
    },
    ga: function() {
      return require('./addGoogleAnalytics')();
    }
  };

}).call(this);
