import { expect } from 'chai'
import theModule from '../src'

describe('Default module', () => {
	it('Should have content', () => {
		const testVar = theModule()
		expect(testVar).to.not.be.empty
		expect(testVar.test).to.equal('123')
	})
})