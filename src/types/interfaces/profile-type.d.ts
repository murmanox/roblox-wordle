export interface ProfileTemplate {
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
	gameState: {
		word: string
		guessCount: number
		previousGuesses: string[]
	}
}
