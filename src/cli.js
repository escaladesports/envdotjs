#! /usr/bin/env node
import sc from 'subcommander'
import { encrypt, unencrypt } from './'
import { version } from '../package.json'

sc.command(`version`, {
		desc: `Display version`,
		callback: () => console.log(version),
	})

sc.command(`encrypt`, {
		description: `Encrypts an env.js file`,
		callback: encrypt,
	})
	.option(`key`, {
		abbr: `K`,
		desc: `Set an encryption key, defaults to contents of envdotjs-key file in root`,
	})
	.option(`path`, {
		abbr: `P`,
		desc: `Path to your .js file, defaults to env.js`,
	})
	.option(`output`, {
		abbr: `O`,
		desc: `Path to the encrypted output, defaults to {path}.enc`,
	})


sc.parse()