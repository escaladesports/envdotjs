# envdotjs

WIP

Store your environment variables in a dynamic env.js file and encrypt so you can commit your variables to source control.

## Installation

With yarn:

```bash
yarn add envdotjs
```

Or with npm:

```bash
npm install --save envdotjs
```

## Basic Usage

Add an `env.js` file to the root of your project:

```javascript
module.exports = {
	SOME_VARIABLE: '123'
}
```

Then as early as possible in your application:

```javascript
require('envdotjs').load()
```

envdotjs will attempt to load an encrypted file (`env.js.enc`) first. If it's not found it will then load `env.js`. Encryption is obviously preferable if you want to keep your environment variables in source control. See below for information on encryption.

## Encryption Key

If you want to encrypt your variables, you first need to set a key. There are 3 ways to do this.

### Setting your key with a file

Create a `envdotjs-key` file in the root of your project containing whatever key you want to use. envdotjs will automatically find this file and use it to encrypt and unencrypt the contents of your `env.js` file. Make sure you don't check this file or your `env.js` file into source control.

### Setting your key in the environment

You can also set a variable in the environment called `ENVDOTJS_KEY` with the value of your key. If you also have a `envdotjs-key` file and the environment variable set, the environment variable will get used.

### Setting your key with options

If you need more control over where the key is, you can also set it in the options during the load:

```javascript
require('envdotjs').load({
	key: 'some-secure-key'
})
```

## Encryption