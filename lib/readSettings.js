(function() {
  var fs, path, projectDir,
    _this = this;

  fs = require('fs-extra');

  path = require('path');

  projectDir = path.resolve(process.cwd(), './');

  module.exports = function() {
    return fs.readJson(projectDir + '/jm.json', function(err, jsonObject) {
      var jmOptions;
      if (err) {
        console.log(err);
        throw err;
      }
      jmOptions = jsonObject;
      return require('./jadeCompile')(jmOptions);
    });
  };

}).call(this);
