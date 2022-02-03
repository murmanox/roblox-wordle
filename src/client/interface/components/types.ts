import { IGuess } from 'types/interfaces/guess-types'

export interface State {
	theme: 'light' | 'dark'
	word: string
	guesses: IGuess[]
}
