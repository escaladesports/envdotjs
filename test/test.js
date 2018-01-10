import { expect } from 'chai'
import { outputFile, remove } from 'fs-extra'
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
		await remove('./env.js')
		await remove('./env.js.enc')
	})
})