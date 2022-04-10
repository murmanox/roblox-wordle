import { IGuess, IGuessState } from './guess-types'

export interface IGoodResponse {
	success: true
}

export interface IResponseBad {
	success: false
	error: string
}

interface IGuessResponseGood extends IGoodResponse {
	state: IGuessState
	matches: number[]
	partials: number[]
}

interface IWordResponseGood extends IGoodResponse {
	length: number
	guessCount: number
	previousGuesses: IGuess[]
}

export type IWordResponse = IWordResponseGood | IResponseBad
export type IGuessResponse = IGuessResponseGood | IResponseBad
