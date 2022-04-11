/// <reference types="@rbxts/testez/globals" />

import { List } from '@rbxts/llama'
import { checkMatches } from './check-matches'

export = () => {
	describe('Check Matches', () => {
		it('Should work for no matches', () => {
			let matches = checkMatches('abcde', 'fghij')
			expect(matches.size()).to.equal(0)

			matches = checkMatches('abcde', 'bcdef')
			expect(matches.size()).to.equal(0)
		})

		it('Should work for single partial matches', () => {
			let matches = checkMatches('abcde', 'aaaaa')
			expect(matches.size()).to.equal(1)
			expect(List.equals(matches, [0])).to.equal(true)

			matches = checkMatches('abcde', 'ccccc')
			expect(matches.size()).to.equal(1)
			expect(List.equals(matches, [2])).to.equal(true)
		})

		it('Should work for full matches', () => {
			const matches = checkMatches('abcde', 'abcde')
			expect(matches.size()).to.equal(5)
			expect(List.equals(matches, [0, 1, 2, 3, 4])).to.equal(true)
		})
	})
}
