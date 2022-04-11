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
	const myMap = new Map<string, { letter: IUsedLetter; score: number }[]>()
	for (const letter of allUsedLetters) {
		const score = letter.match ? 2 : letter.partial ? 1 : 0

		let arr = myMap.get(letter.letter)
		if (!arr) {
			arr = []
			myMap.set(letter.letter, arr)
		}

		arr.push({ score, letter })
	}

	// Extract only the highest scoring object for each unique letter
	const uniqueFiltered = Object.values(myMap)
		.map((v) =>
			v.reduce((largest, current) => (current.score > largest.score ? current : largest), {
				score: -1,
			} as { letter: IUsedLetter; score: number })
		)
		.map((v) => v.letter)
		// Sort for unit test equality
		.sort((a, b) => a.letter < b.letter)

	return {
		success: true,
		state: {
			win: matches.size() === word.size(),
			usedLetters: uniqueFiltered,
		},
		matches,
		partials,
	}
}

export function createErrorGuessResponse(message: string): IResponseBad {
	return { success: false, error: message }
}
