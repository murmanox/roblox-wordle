export interface IGoodResponse {
	success: true
}

export interface IResponseBad {
	success: false
	error: string
}

interface IGuessResponseGood extends IGoodResponse {
	win: boolean
	matches: number[]
	partials: number[]
}

interface IWordResponseGood extends IGoodResponse {
	length: number
	guessCount: number
	previousGuesses: string[]
}

export type IWordResponse = IWordResponseGood | IResponseBad
export type IGuessResponse = IGuessResponseGood | IResponseBad
