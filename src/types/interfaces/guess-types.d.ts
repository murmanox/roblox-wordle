export interface IPlayerGuessData {
	word: string
	guessCount: number
	previousGuesses: IGuess[]
}

interface IGuess {
	win: boolean
	word: string
	matches: number[]
	partials: number[]
}
