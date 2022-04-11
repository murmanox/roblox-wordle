import { Profile } from '@rbxts/profileservice/globals'
import { IPlayerGuessData } from 'types/interfaces/guess-types'

export interface PlayerProfileData {
	score: number
	coins: number

	/** Last X words solved by the player */
	solveHistory: string[]

	/** Statistics relating to solve rate */
	stats: {
		wordsGuessed: number
		wordsFailed: number
		totalGuesses: number

		/** How many times the player solves a word on each turn */
		solveTurn: {
			1: number
			2: number
			3: number
			4: number
			5: number
			6: number
		}
	}

	/** Data relating to the player's current word */
	gameState: IPlayerGuessData
}

// Default values to use for each property
export const defaultPlayerData: PlayerProfileData = {
	score: 0,
	coins: 0,
	solveHistory: [],
	stats: {
		wordsGuessed: 0,
		wordsFailed: 0,
		totalGuesses: 0,
		solveTurn: {
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0,
		},
	},
	gameState: {
		word: '',
		guessCount: 0,
		maxGuesses: 6,
		previousGuesses: [],
		usedLetters: [],
	},
}

export type PlayerProfile = Profile<PlayerProfileData>
