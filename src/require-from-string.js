import Module from 'module'
import path from 'path'

function requireFromString(code, filename, opts) {
	if (typeof filename === 'object') {
		opts = filename
		filename = undefined
	}

	opts = opts || {}
	filename = filename || ''

	opts.appendPaths = opts.appendPaths || []
	opts.prependPaths = opts.prependPaths || []

	if (typeof code !== 'string') {
		throw new Error('code must be a string, not ' + typeof code)
	}

	let exports
	try {
		let paths = Module._nodeModulePaths(path.dirname(filename))
		let parent = module.parent
		let m = new Module(filename, parent)
		m.filename = filename
		m.paths = [].concat(opts.prependPaths).concat(paths).concat(opts.appendPaths)
		m._compile(code, filename)
		exports = m.exports
		parent && parent.children && parent.children.splice(parent.children.indexOf(m), 1)
	}
	catch(err){
		exports = {}
		console.warn(`Contents of env.js are not valid. Make sure your envdotjs key is correct.`)
	}


	return exports
}

export default requireFromString