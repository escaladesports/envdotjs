#! /usr/bin/env node
//import sc from 'subcommander'
import { encrypt, unencrypt } from './index'
import meow from 'meow'

const cli = meow(`
    Usage
      $ envdotjs

    Options
      --key, -k         Set an encryption key, defaults to contents of envdotjs-key file in root
      --path, -p        Path to your .js file, defaults to env.js
      --output, -o      Path to the encrypted output, defaults to {path}.enc
		--unencrypt, -u   Unencrypts a file, defaults to env.js.enc
		--change-key, -c  Reencrypts and creates a new envdotjs-key file with provided string

    Examples
      $ envdotjs --key my-key
`, {
	flags: {
		key: {
			type: 'string',
			alias: 'k',
		},
		path: {
			type: 'string',
			alias: 'p',
		},
		output: {
			type: 'string',
			alias: 'o',
		},
		unencrypt: {
			type: 'boolean',
			alias: 'u',
		},
		'change-key': {
			type: 'string'
		},
	}
})

if (!cli.flags.unencrypt) {
	encrypt()
}
else{
	unencrypt({
		output: 'env.js',
		...cli.flags
	})
}