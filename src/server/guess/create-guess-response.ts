import Object from '@rbxts/object-utils'
import { IPlayerGuessData, IUsedLetter } from 'types/interfaces/guess-types'
import { IGuessResponseGood, IResponseBad } from 'types/interfaces/network-types'

export function createGuessResponse(
	guess: string,
	matches: number[],
	partials: number[],
	gameState: IPlayerGuessData
): IGuessResponseGood {
	const { word, usedLetters } = gameState

	// Create an object for each letter in the guess with boolean properties for match and partial
	const newLetters: IUsedLetter[] = [...guess].map((letter, i) => {
		return { letter, match: matches.includes(i), partial: partials.includes(i) }
	})

	// Combine the previous used letters with the new used letters
	const allUsedLetters = [...usedLetters, ...newLetters]

	// Generate a score for each letter based on its match and partial property
	const letterScores = new Map<string, { letter: IUsedLetter; score: number }>()
	for (const usedLetter of allUsedLetters) {
		const { letter, match, partial } = usedLetter
		const currentLetterScore = match ? 2 : partial ? 1 : 0

		// Get current highest score for this letter. -1 will always be overwritten (new letter).
		const maxLetterScore = letterScores.get(letter)?.score ?? -1

		// Update highest scoring letter
		if (currentLetterScore > maxLetterScore) {
			letterScores.set(letter, { letter: usedLetter, score: currentLetterScore })
		}
	}

	const newUsedLetters = Object.values(letterScores)
		.map((v) => v.letter)
		// Sort for unit test equality
		.sort((a, b) => a.letter < b.letter)

	return {
		success: true,
		state: {
			win: matches.size() === word.size(),
			usedLetters: newUsedLetters,
		},
		matches,
		partials,
	}
}

export function createErrorGuessResponse(message: string): IResponseBad {
	return { success: false, error: message }
}
