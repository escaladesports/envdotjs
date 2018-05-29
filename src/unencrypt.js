import { pathExistsSync, readFileSync, outputFileSync } from 'fs-extra'
import { resolve } from 'path'
import { createDecipher } from 'crypto'
import requireFromString from './require-from-string'
import getKey from './get-key'

function unencrypt(options = {}){
	// Default options
	options = {
		path: `env.js.enc`,
		...options
	}
	options.key = getKey(options)
	if (!options.key) {
		return {}
	}
	const fullPath = resolve(process.cwd(), options.path)
	if (options.output && typeof options.output !== `string`) {
		options.output = options.path.replace(/.enc$/, ``)
	}

	if (!pathExistsSync(fullPath)) {
		if (options.strict) {
			throw new Error(`${options.path} file not found`)
		}
		else {
			console.warn(`${options.path} file not found`)
			return {}
		}
	}

	// Read file
	let contents = readFileSync(fullPath)
	contents = contents.toString()

	// Unencrypt contents
	const decipher = createDecipher(`aes-256-ctr`, options.key)
	contents = decipher.update(contents, `hex`, `utf8`)
	contents += decipher.final(`utf8`)

	// Output file
	if (options.output) {
		outputFileSync(options.output, contents)
	}

	return requireFromString(contents, null, options)
}

export default unencrypt