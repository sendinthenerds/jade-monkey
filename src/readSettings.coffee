fs					= require 'fs-extra'
path				= require 'path'

projectDir	= path.resolve(process.cwd(), './')

module.exports = () =>
	fs.readJson projectDir + '/jm.json', (err, jsonObject) =>
		if err
			console.log err
			throw err
		jmOptions = jsonObject
		require('./jadeCompile')(jmOptions)


