import { pathExistsSync, readFileSync } from 'fs-extra'
import { resolve } from 'path'

export default function (options = {}){
	// Default options
	options = {
		key: process.env.ENVDOTJS_KEY,
		keyPath: 'envdotjs-key',
		...options
	}
	if (!options.key) {
		options.keyPath = resolve(process.cwd(), options.keyPath)
		if (pathExistsSync(options.keyPath)){
			options.key = readFileSync(options.keyPath).toString()
		}
		else {
			console.log('No envdotjs key found.')
		}
	}
	return options.key
}