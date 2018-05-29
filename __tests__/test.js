import { readFile, outputFile, remove } from 'fs-extra'
import { getKey, encrypt, unencrypt, load } from '../dist'


describe(`getKey`, () => {
	it(`Reads the environment key from a variable`, () => {
		const key = getKey({ key: `123` })
		expect(key).toEqual(`123`)
	})
	it(`Reads the environment key from a file`, async () => {
		await outputFile(`./env.js.key`, `123`)
		const key = getKey()
		console.log(key)
		expect(key).toEqual(`123`)
		await remove(`./env.js.key`)
	})
	it(`Reads the environment key from the environment`, () => {
		process.env.ENVDOTJS_KEY = `123`
		const key = getKey()
		expect(key).toEqual(`123`)
		delete process.env.ENVDOTJS_KEY
	})
})

describe(`encrypt`, () => {
	it(`Encrypts a file`, async () => {
		await outputFile(`./env.js`, `module.exports = { TEST_ENV: 'test value' }`)
		await encrypt({ key: `123` })
		let contents = await readFile(`./env.js.enc`)
		contents = contents.toString()
		expect(contents).toEqual(`95c1fe2c574151be5afd5bc1cb028b2e199e7f8fa70605cd227ae873a0d23479b7d1e732267ad0024fe69b`)
		await remove(`./env.js`)
		await remove(`./env.js.enc`)
	})
})

describe(`unencrypt`, () => {
	it(`Unencrypts a file`, async () => {
		await outputFile(`./env.js.enc`, `95c1fe2c574151be5afd5bc1cb028b2e199e7f8fa70605cd227ae873a0d23479b7d1e732267ad0024fe69b`)
		const contents = unencrypt({ key: `123` })
		expect(contents.TEST_ENV).toEqual(`test value`)
		await remove(`./env.js.enc`)
	})
})

describe(`load`, () => {
	it(`Loads an environment file`, async () => {
		await outputFile(`./env.js.enc`, `95c1fe2c574151be5afd5bc1cb028b2e199e7f8fa70605cd227ae873a0d23479b7d1e732267ad0024fe69b`)
		load({ key: `123` })
		expect(process.env.TEST_ENV).toEqual(`test value`)
		await remove(`./env.js.enc`)
	})
})