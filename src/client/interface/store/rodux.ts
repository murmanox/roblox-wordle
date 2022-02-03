import Rodux from '@rbxts/rodux'
import { IGuess } from 'types/interfaces/guess-types'
import { themes } from '../context/theme-context'

export type StoreActions =
	| { type: 'setTheme'; theme: 'light' | 'dark' }
	| { type: 'setWord'; word: string }
	| { type: 'addGuess'; guess: IGuess }

export interface IClientStore {
	theme: keyof typeof themes
	word: string
	guesses: IGuess[]
}

const initialState: IClientStore = {
	theme: 'dark',
	word: '',
	guesses: [],
}

const themeReducer = Rodux.createReducer<IClientStore, StoreActions>(initialState, {
	setTheme: (state, action) => ({ ...state, theme: action.theme }),
	setWord: (state, action) => ({ ...state, word: action.word }),
	addGuess: (state, action) => ({ ...state, guesses: [...state.guesses, action.guess] }),
})

export const ClientStore = new Rodux.Store<IClientStore, StoreActions>(themeReducer)
export type ClientDispatch = typeof ClientStore
