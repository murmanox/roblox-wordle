import { IPlayerGuessData, IUsedLetter } from 'types/interfaces/guess-types'
import { IGuessResponseGood, IResponseBad } from 'types/interfaces/network-types'

export function createGuessResponse(
	guess: string,
	matches: number[],
	partials: number[],
	gameState: IPlayerGuessData
): IGuessResponseGood {
	const { word, usedLetters } = gameState

	const newLetters: IUsedLetter[] = [...guess].map((letter, i) => {
		return { letter, match: matches.includes(i), partial: partials.includes(i) }
	})

	const l = [...usedLetters, ...newLetters].sort((a, b) => a.letter < b.letter)

	for (const letter of l) {
		//
	}
	print(l)

	return {
		success: true,
		state: {
			win: matches.size() === word.size(),
			usedLetters: l,
		},
		matches,
		partials,
	}
}

export function createErrorGuessResponse(message: string): IResponseBad {
	return { success: false, error: message }
}
