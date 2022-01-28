interface IGuessResponseGood {
	success: true
	matches: number[]
	partials: number[]
}

interface IGuessResponseBad {
	success: false
	error: string
}

export type IGuessResponse = IGuessResponseGood | IGuessResponseBad
