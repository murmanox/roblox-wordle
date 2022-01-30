export {}

const ProfileTemplate = {
	score: 0,
	coins: 0,

	/** Last X words solved by the player */
	solveHistory: [],

	/** Statistics relating to solve rate */
	stats: {
		wordsGuessed: 0,
		wordsFailed: 0,
		totalGuesses: 0,

		/** How many times the player solves a word on each turn */
		solveTurn: {
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0,
		},
	},

	/** Data relating to the player's current word */
	gameState: {
		word: 'atone',
		guessCount: 0,
		previousGuesses: [],
	},
}
