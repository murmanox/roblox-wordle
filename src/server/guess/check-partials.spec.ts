/// <reference types="@rbxts/testez/globals" />

import { List } from '@rbxts/llama'
import { checkPartials } from './check-partials'

export = () => {
	describe('Check Partials', () => {
		it('Should show partials with double letters', () => {
			let partials = checkPartials('krill', 'hello')
			expect(List.equals(partials, [4])).to.equal(true)

			partials = checkPartials('llama', 'hello')
			expect(List.equals(partials, [0, 1])).to.equal(true)
		})

		it('Should only add partials as many times as it appears in the answer', () => {
			const partials = checkPartials('xllll', 'l0000')
			expect(List.equals(partials, [1])).to.equal(true)
		})
	})
}
