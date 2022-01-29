interface IGuessResponseGood {
	success: true
	win: boolean
	matches: number[]
	partials: number[]
}

interface IGuessResponseBad {
	success: false
	error: string
}

export type IGuessResponse = IGuessResponseGood | IGuessResponseBad

interface IWordResponse {
	length: number
	guessCount: number
	previousGuesses: string[]
}
