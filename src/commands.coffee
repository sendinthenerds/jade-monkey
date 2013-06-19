module.exports =
	init: ->
		require('./projectCreate')()
	build: ->
		require('./sourceCompile')()
	post: ->
		require('./blogPostCreate')()
	ga: ->
		require('./addGoogleAnalytics')()
	

