import Rodux, { ThunkDispatcher, thunkMiddleware, ThunkMiddleware } from '@rbxts/rodux'
import { formatText } from 'shared/utility/format'
import { IGuess, IUsedLetter } from 'types/interfaces/guess-types'
import { IWordResponse } from 'types/interfaces/network-types'
import { themes } from '../context/theme-context'

export type StoreActions =
	| { type: 'setTheme'; theme: 'light' | 'dark' }
	| { type: 'setLength'; length: number }
	| { type: 'setWord'; word: string }
	| { type: 'addGuess'; guess: IGuess }
	| { type: 'addLetter'; letter: string }
	| { type: 'backspace' }
	| { type: 'setUsedLetters'; letters: IUsedLetter[] }
	| { type: 'setStateFromResponse'; response: IWordResponse }

export interface IClientStore {
	theme: keyof typeof themes
	length: number
	word: string
	maxGuesses: number
	guesses: IGuess[]
	usedLetters: IUsedLetter[]
	win: boolean
}

const initialState: IClientStore = {
	win: false,
	length: 5,
	word: '',
	theme: 'dark',
	guesses: [],
	maxGuesses: 6,
	usedLetters: [],
}

const themeReducer = Rodux.createReducer<IClientStore, StoreActions>(initialState, {
	setTheme: (state, action) => ({ ...state, theme: action.theme }),
	setWord: (state, action) => ({ ...state, word: action.word }),
	setLength: (state, action) => ({ ...state, length: action.length }),
	addGuess: (state, action) => ({ ...state, guesses: [...state.guesses, action.guess] }),
	addLetter: (state, action) => ({
		...state,
		word: formatText(state.length)(state.word + action.letter),
	}),
	backspace: (state, action) => ({ ...state, word: state.word.sub(0, state.word.size() - 1) }),
	setUsedLetters: (state, action) => ({ ...state, usedLetters: action.letters }),
	setStateFromResponse: (state, { response }) => {
		if (!response.success) {
			return state
		}

		const { length, maxGuesses, previousGuesses, usedLetters } = response

		return {
			...state,
			length,
			usedLetters,
			maxGuesses,
			guesses: previousGuesses,
		}
	},
})

export const ClientStore = new Rodux.Store<IClientStore, StoreActions>(themeReducer, initialState)
export type ClientDispatch = typeof ClientStore
