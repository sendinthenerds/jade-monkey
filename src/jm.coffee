log = console.log
fs = require 'fs'
promise = require 'when'
sequence = require 'when/sequence'
jade = require 'jade'


class JadeMonkey

	constructor : ->
		log 'Hi :D'
		@postsDir = './test-blog/posts/'
		@postPaths = @postFiles = @postsArray = []
		tasks = [
			@readFiles,
			@getJadeStrings,
			@sortFiles,
		]
		taskPromise = sequence tasks
		taskPromise.then ((result) =>
			log @postsArray
			), (err) -> log err
	
	readFiles :  =>
		log 'Reading Files'
		deferred = promise.defer()
		fs.readdir @postsDir, (err, postFiles) =>
			if err
				deferred.reject new Error 'Could not read post directory'
			@postFiles = postFiles
			deferred.resolve postFiles
		deferred.promise

	sortFiles : =>
		compare = (a, b) ->
			if a.ctime > b.ctime then -1
			if a.ctime < b.ctime then +1
		deferred = promise.defer()
		log @postsArray
		@postsArray.sort compare
		deferred.resolve true
		deferred.promise


	getJadeStrings : =>
		deferred = promise.defer()
		for post in @postFiles
			jadeString = fs.readFileSync @postsDir + post
			options =
				filename : @postsDir + post
			compileFunction = jade.compile jadeString, options
			ctime = fs.statSync(@postsDir + post).ctime
			localFileVariables =
				title : "Booyaka"
				ctime : ctime
				mtime : fs.statSync(@postsDir + post).mtime
			htmlString = compileFunction localFileVariables
			postObject =
				name: post
				html: htmlString
				ctime : ctime.getTime()
				created : ctime
			@postsArray.push postObject
		deferred.resolve true
		deferred.promise

new JadeMonkey

