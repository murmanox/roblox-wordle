/// <reference types="@rbxts/testez/globals" />

import inspect from '@rbxts/inspect'
import { List } from '@rbxts/llama'
import { IGuessResponseGood } from 'types/interfaces/network-types'
import { analyzeGuess } from './word-match'

export = () => {
	describe('Check Matches and Partials Combined', () => {
		it('Should not add matched letters as partials', () => {
			let { matches, partials } = analyzeGuess('llama', {
				word: 'light',
				usedLetters: [],
			} as any) as IGuessResponseGood

			expect(List.equals(matches, [0])).to.equal(true)
			expect(partials.size()).to.equal(0)

			const response = analyzeGuess('llama', {
				word: 'slush',
				usedLetters: [],
			} as any) as IGuessResponseGood

			matches = response.matches
			partials = response.partials

			expect(List.equals(matches, [1])).to.equal(true)
			expect(partials.size()).to.equal(0)
		})

		it('Should detect all matching', () => {
			const { matches, partials } = analyzeGuess('llama', {
				word: 'llama',
				usedLetters: [],
			} as any) as IGuessResponseGood

			expect(List.equals(matches, [0, 1, 2, 3, 4])).to.equal(true)
			expect(partials.size()).to.equal(0)
		})

		it('Should work with partials and matches', () => {
			const { matches, partials } = analyzeGuess('knoll', {
				word: 'slosh',
				usedLetters: [],
			} as any) as IGuessResponseGood

			expect(List.equals(matches, [2])).to.equal(true)
			expect(List.equals(partials, [3])).to.equal(true)
		})

		it('Should work with partials, matches and double letters', () => {
			const { matches, partials } = analyzeGuess('aarti', {
				word: 'atuas',
				usedLetters: [],
			} as any) as IGuessResponseGood

			expect(List.equals(matches, [0])).to.equal(true)
			expect(List.equals(partials, [1, 3])).to.equal(true)
		})
	})
}
