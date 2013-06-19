(function() {
  var entities, exec, fs, moment, path, projectDir, prompt;

  prompt = require('cli-prompt');

  entities = require('entities');

  fs = require('fs-extra');

  moment = require('moment');

  path = require('path');

  exec = require('child_process').exec;

  projectDir = path.resolve(process.cwd(), './');

  module.exports = function() {
    var postTitle,
      _this = this;
    postTitle = "";
    return prompt('Enter your new blog/post/page title:\n-> ', function(title, end, err) {
      var dateString, string;
      if (err) {
        console.log(err);
        throw err;
      }
      postTitle = title;
      end();
      dateString = moment().format('MMMM Do YYYY');
      string = '\
extends ../templates/layout\n\
block content\n\
	article\n\
		h3#post-title ' + postTitle + '\n\
		p\n\
		h5.metadata #{created}\n\
	include ../templates/footer\n';
      return fs.outputFile(projectDir + '/jade/posts/' + postTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '') + '.jade', string, function(err) {
        if (err) {
          console.log(err);
          throw err;
        }
        exec('echo "mixin link(\'' + entities.encode(postTitle) + '\', \'' + postTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '') + '\')"|cat - jade/items.jade  > /tmp/out && mv /tmp/out jade/items.jade', function(err, stdout, stderr) {
          if (err) {
            console.log(err);
            throw err;
          }
          return console.log('Blog added to index');
        });
        return console.log('New Post "' + postTitle + '" created at:\njade/posts/' + postTitle + '.jade');
      });
    });
  };

}).call(this);
