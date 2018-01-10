import { expect } from 'chai'
import { readFile, outputFile, remove } from 'fs-extra'
import { getKey, encrypt } from '../src'

process.env.ENVDOTJS_KEY = '123'

describe('getKey', () => {
	it('Reads the environment key from a variable', () => {
		const key = getKey({ key: '123' })
		expect(key).to.equal('123')
	})
	it('Reads the environment key from a file', async () => {
		await outputFile('./envdotjs-key', '123')
		const key = getKey()
		expect(key).to.equal('123')
		await remove('./envdotjs-key')
	})
	it('Reads the environment key from the environment', () => {
		const key = getKey()
		expect(key).to.equal('123')
	})
})

describe('encrypt', () => {
	it('Encrypts a file', async () => {
		await outputFile('./env.js', `module.exports = { TEST_ENV: 'test value' }`)
		await encrypt()
		let contents = await readFile('./env.js.enc')
		contents = contents.toString()
		expect(contents).to.equal('95c1fe2c574151be5afd5bc1cb028b2e199e7f8fa70605cd227ae873a0d23479b7d1e732267ad0024fe69b')
		await remove('./env.js')
		await remove('./env.js.enc')
	})
})