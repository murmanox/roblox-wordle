import remotes from 'shared/remotes'
import { analyzeGuess } from './word-match'

interface IPlayerGuessData {
	word: string
	guessCount: number
	previousGuesses: string[]
}

/** A map of players to the current words they have to guess */
const playerWordMap = new Map<Player, IPlayerGuessData>()

remotes.Server.Create('guessWord').SetCallback((player, guess) => {
	const playerGuessData = playerWordMap.get(player)!
	const { word, previousGuesses: guesses } = playerGuessData

	print(`${player} guessed ${guess}`)

	const response = analyzeGuess(guess, word, guesses)

	// Increment the amount of guesses by this player
	if (response.success) {
		playerGuessData.guessCount += 1
		playerGuessData.previousGuesses.push(guess)
	}

	return response
})

remotes.Server.Create('getRandomWord').SetCallback((player) => {
	// Get random word
	const newWord = 'weary'

	print(`${player}'s new word is ${newWord}`)

	// Reset player's guesses and assign new word to them
	const guessData: IPlayerGuessData = {
		word: newWord,
		guessCount: 0,
		previousGuesses: [],
	}

	playerWordMap.set(player, guessData)

	// Return the length of the new word
	return newWord.size()
})
