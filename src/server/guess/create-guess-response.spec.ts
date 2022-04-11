/// <reference types="@rbxts/testez/globals" />

import inspect from '@rbxts/inspect'
import { Dictionary, List } from '@rbxts/llama'
import { createGuessResponse } from './create-guess-response'

export = () => {
	describe('Create Guess Response', () => {
		it('Should remove duplicate used letters', () => {
			const response = createGuessResponse('abcde', [], [], {
				word: 'abcde',
				usedLetters: [
					{ letter: 'a' },
					{ letter: 'b' },
					{ letter: 'c' },
					{ letter: 'd' },
					{ letter: 'e' },
				],
			} as any)

			expect(response.state.usedLetters.size()).to.equal(5)
		})

		it('Should prioritise partial matches over no matched duplicates', () => {
			const response = createGuessResponse('abcde', [], [0, 4], {
				word: 'abcde',
				usedLetters: [
					{ letter: 'a', match: false, partial: false },
					{ letter: 'b', match: false, partial: false },
					{ letter: 'c', match: false, partial: true },
					{ letter: 'd', match: false, partial: false },
					{ letter: 'e', match: false, partial: false },
				],
			} as any)

			expect(
				Dictionary.equalsDeep(response.state.usedLetters, [
					{ letter: 'a', match: false, partial: true },
					{ letter: 'b', match: false, partial: false },
					{ letter: 'c', match: false, partial: true },
					{ letter: 'd', match: false, partial: false },
					{ letter: 'e', match: false, partial: true },
				])
			).to.equal(true)
		})

		it('Should prioritise matches over partials', () => {
			const response = createGuessResponse('abcde', [0, 4], [2], {
				word: 'abcde',
				usedLetters: [
					{ letter: 'a', match: false, partial: true },
					{ letter: 'b', match: false, partial: false },
					{ letter: 'c', match: false, partial: true },
					{ letter: 'd', match: false, partial: false },
					{ letter: 'e', match: false, partial: false },
				],
			} as any)

			expect(
				Dictionary.equalsDeep(response.state.usedLetters, [
					{ letter: 'a', match: true, partial: false },
					{ letter: 'b', match: false, partial: false },
					{ letter: 'c', match: false, partial: true },
					{ letter: 'd', match: false, partial: false },
					{ letter: 'e', match: true, partial: false },
				])
			).to.equal(true)
		})
	})
}
