import meow from 'meow'
import { encrypt } from './index'

const cli = meow(`
    Usage
      $ envdotjs

    Options
      --key, -k     Set an encryption key, defaults to contents of envdotjs-key file in root
		--path, -p    Path to your .js file, defaults to env.js
		--output, -o  Path to the encrypted output, defaults to {path}.enc

    Examples
      $ envdotjs --key my-key
`, {
	flags: {
		key: {
			type: 'string',
			alias: 'k'
		},
		path: {
			type: 'string',
			alias: 'p'
		},
		output: {
			type: 'string',
			alias: 'o'
		},
	}
})

encrypt(cli.flags)