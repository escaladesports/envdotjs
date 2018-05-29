import { readFile, outputFile, remove, pathExists } from 'fs-extra'
import { getKey, encrypt, unencrypt, load } from '../dist'

const key = `123`
const input = `module.exports = { TEST_ENV: 'test value' }`
const output = `95c1fe2c574151be5afd5bc1cb028b2e199e7f8fa70605cd227ae873a0d23479b7d1e732267ad0024fe69b`

describe(`getKey`, () => {
	it(`Reads the environment key from a variable`, () => {
		const key = getKey({ key })
		expect(key).toEqual(key)
	})
	it(`Reads the environment key from a file`, async () => {
		await outputFile(`./env.js.key`, key)
		const key = getKey()
		expect(key).toEqual(key)
		await remove(`./env.js.key`)
	})
	it(`Reads the environment key from the environment`, () => {
		process.env.ENVDOTJS_KEY = key
		const key = getKey()
		expect(key).toEqual(key)
		delete process.env.ENVDOTJS_KEY
	})
	it(`Should fail if no key is found`, () => {
		const key = getKey()
		expect(key).toEqual(undefined)
	})
})

describe(`encrypt`, () => {
	it(`Encrypts a file`, async () => {
		await outputFile(`./env.js`, input)
		await encrypt({ key })
		let contents = await readFile(`./env.js.enc`)
		contents = contents.toString()
		expect(contents).toEqual(output)
		await remove(`./env.js`)
		await remove(`./env.js.enc`)
	})
	it(`Should not encrypt if no key is found`, async () => {
		await outputFile(`./env.js`, input)
		await encrypt()
		let exists = await pathExists(`./env.js.enc`)
		expect(exists).toEqual(false)
		await remove(`./env.js`)
	})
})

describe(`unencrypt`, () => {
	it(`Unencrypts a file`, async () => {
		await outputFile(`./env.js.enc`, output)
		const contents = unencrypt({ key })
		expect(contents.TEST_ENV).toEqual(`test value`)
		await remove(`./env.js.enc`)
	})
})

describe(`load`, () => {
	it(`Loads an environment file`, async () => {
		await outputFile(`./env.js.enc`, output)
		load({ key })
		expect(process.env.TEST_ENV).toEqual(`test value`)
		await remove(`./env.js.enc`)
	})
})