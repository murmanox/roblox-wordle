import { Players } from '@rbxts/services'
import remotes from 'shared/remotes'
import { IPlayerGuessData } from 'types/interfaces/guess-types'
import { IWordResponse } from 'types/interfaces/network-types'
import { playerWordMap } from '../shared/playerWordMap'
import { assignNewWordToPlayer } from './assignNewWordToPlayer'
import { analyzeGuess } from './word-match'

function getPlayerProfile(player: Player) {
	return {
		word: 'wordy',
		guessCount: 0,
		previousGuesses: [],
	}
}

function guessWord(player: Player, guess: string) {
	const playerGuessData = playerWordMap.get(player)!
	const { word, previousGuesses } = playerGuessData

	print(`${player} guessed ${guess}`)

	const response = analyzeGuess(guess, word, previousGuesses)

	if (!response.success) {
		return response
	}

	// Increment the amount of guesses by this player
	playerGuessData.guessCount += 1
	playerGuessData.previousGuesses.push(guess)

	// Player has won
	if (response.win) {
		// Give points
		// Assign player new word
	}

	return response
}

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

	// Reset player's guesses and assign new word to them
	const word = assignNewWordToPlayer(player, length)

	// Return the length of the new word
	return { length: word.size(), guessCount: 0, previousGuesses: [] }
}

Players.PlayerAdded.Connect((player) => {
	// Load player data from ProfileService
	const tempData: IPlayerGuessData = getPlayerProfile(player)

	// Save into word map
	playerWordMap.set(player, tempData)
})

Players.PlayerRemoving.Connect((player) => {
	// Delete data related to player when they leave
	playerWordMap.delete(player)
})

remotes.Server.Create('guessWord').SetCallback(guessWord)
remotes.Server.Create('getWord').SetCallback(getWord)
