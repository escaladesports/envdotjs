import { pathExistsSync, readFileSync } from 'fs-extra'
import { resolve } from 'path'

const errorMsg = `No envdotjs key found. Include key in environment variable ENVDOTJS_KEY or in an env.js.key file.`

function getKey(options = {}){
	// Default options
	options = {
		key: process.env.ENVDOTJS_KEY,
		keyPath: `env.js.key`,
		...options
	}
	if (!options.key || options.key === `undefined`) {
		options.keyPath = resolve(process.cwd(), options.keyPath)
		if (pathExistsSync(options.keyPath)) {
			options.key = readFileSync(options.keyPath)
				.toString()
				.trim()
		}
		else if(options.strict){
			throw errorMsg
		}
		else {
			console.warn(errorMsg)
		}
	}
	return options.key
}

export default getKey