#! /usr/bin/env node
import sc from 'subcommander'
import { encrypt, unencrypt } from './index'
import pkg from './package.json'

sc.command(`version`, {
		desc: `Display version`,
		callback: () => console.log(pkg.version)
	})

sc.command(`encrypt`, {
		desc: `Encrypts a env.js file`
	})
	.option(`key`, {
		abbr: `k`,
		desc: `Set an encryption key, defaults to contents of envdotjs-key file in root`,
	})
	.option(`input`, {
		abbr: `i`,
		desc: `Path to your .js file`,
		default: `env.js`,
	})
	.option(`output`, {
		abbr: `o`,
		desc: `Path to the encrypted output, defaults to {path}.enc`,
	})

sc.command(`unencrypt`, {
		desc: `Unencrypts a file`
	})
	.option(`key`, {
		abbr: `k`,
		desc: `Set an encryption key, defaults to contents of envdotjs-key file in root`,
	})
	.option(`input`, {
		abbr: `i`,
		desc: `Path to your .enc file`,
		default: `env.js.enc`,
	})
	.option(`output`, {
		abbr: `o`,
		desc: `Path to the unencrypted output, defaults to {path} sans .enc`,
	})

sc.command(`change-key`, {
		desc: `Reencrypts with the supplied key and creates a new envdotjs-key file`
	})
	.option(`input`, {
		abbr: `i`,
		desc: `Path to your .js file`,
		default: `env.js`,
	})
	.option(`output`, {
		abbr: `o`,
		desc: `Path to the encrypted output, defaults to {path}.enc`,
	})
	.option(`prev-key`, {
		desc: `Supply the previous key to unencrypt the .enc file first`,
	})
	.option(`key`, {
		abbr: `k`,
		desc: `The new key to be used`,
	})

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