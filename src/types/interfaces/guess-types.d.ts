export interface IPlayerGuessData {
	word: string
	guessCount: number
	previousGuesses: IGuess[]
	usedLetters: IUsedLetter[]
}

interface IUsedLetter {
	letter: string
	match?: boolean
	partial?: boolean
}

interface IGuessState {
	win: boolean
	usedLetters: IUsedLetter[]
}

interface IGuess {
	word: string
	matches: number[]
	partials: number[]
}
