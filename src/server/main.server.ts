import { Players } from '@rbxts/services'
import remotes from 'shared/remotes'
import { IPlayerGuessData } from 'types/interfaces/guess-types'
import { IWordResponse } from 'types/interfaces/network-types'
import { playerWordMap } from '../shared/playerWordMap'
import { analyzeGuess } from './word-match'

function getWord(player: Player, length: number): IWordResponse {
	const wordData = playerWordMap.get(player)

	// Player already has a word to guess
	if (wordData) {
		const { word, guessCount, previousGuesses } = wordData

		return {
			length: word.size(),
			guessCount,
			previousGuesses,
		}
	}

	// Get random word using length
	const newWord = 'weary'

	// Reset player's guesses and assign new word to them
	const guessData: IPlayerGuessData = {
		word: newWord,
		guessCount: 0,
		previousGuesses: [],
	}

	playerWordMap.set(player, guessData)

	// Return the length of the new word
	return {
		length: newWord.size(),
		guessCount: guessData.guessCount,
		previousGuesses: guessData.previousGuesses,
	}
}

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

remotes.Server.Create('getWord').SetCallback(getWord)

Players.PlayerAdded.Connect((player) => {
	// Load player data from ProfileService
	const tempData: IPlayerGuessData = {
		// NOT DRY!!!!
		word: 'wordy',
		guessCount: 0,
		previousGuesses: [],
	}

	// Save into word map
	playerWordMap.set(player, tempData)
})

Players.PlayerRemoving.Connect((player) => {
	// Delete data related to player when they leave
	playerWordMap.delete(player)
})
