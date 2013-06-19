(function() {
  var fs, path, prompt;

  fs = require('fs-extra');

  path = require('path');

  prompt = require('cli-prompt');

  module.exports = function() {
    var projectDir,
      _this = this;
    projectDir = path.resolve(process.cwd(), './');
    return fs.readJson(projectDir + '/jm.json', function(err, jsonObject) {
      var jmOptions;
      if (err) {
        console.log(err);
        throw err;
      }
      jmOptions = jsonObject;
      return prompt('Enter your Google Analytics tracking code.\nFormat: UA-12345678-0\n-> ', function(code, end, err) {
        if (err) {
          console.log(err);
          throw err;
        }
        jmOptions.googleAnalytics = code;
        end();
        return fs.writeJson(projectDir + '/jm.json', jmOptions, function(err) {
          if (err) {
            console.log(err);
            throw err;
          }
          return console.log('Google Analytics Added');
        });
      });
    });
  };

}).call(this);
