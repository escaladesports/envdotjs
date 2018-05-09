import { pathExists, outputFile, readFile } from 'fs-extra'
import { resolve } from 'path'
import { createCipher } from 'crypto'

import getKey from './get-key'

async function encrypt(options = {}){
	// Default options
	options = {
		path: 'env.js',
		...options
	}
	if (!options.output) {
		options.output = options.path + '.enc'
	}
	let fullPath = resolve(process.cwd(), options.path)
	options.output = resolve(process.cwd(), options.output)
	options.key = getKey(options)

	if (options.key) {
		// Read file
		if (!await pathExists(fullPath)) {
			return console.log(`${options.path} file not found`)
		}
		let contents = await readFile(fullPath, 'utf8')

		// Encrypt contents
		let cipher = createCipher('aes-256-ctr', options.key)
		contents = cipher.update(contents, 'utf8', 'hex')
		contents += cipher.final('hex')

		// Output new file
		await outputFile(options.output, contents)
	}
}

export default encrypt