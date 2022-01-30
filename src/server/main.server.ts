import { Players } from '@rbxts/services'
import remotes from 'shared/remotes'
import { IWordResponse } from 'types/interfaces/network-types'
import { PlayerProfile } from 'types/interfaces/profile-type'
import { DataManager } from './profile-service'
import { randomWord } from './utility/random'
import { analyzeGuess } from './word-match'
import withPlayerProfile from './wrappers/withProfile'

/**
 * Compare the player's guess against their assigned word.
 * @param player The player that's guessing
 * @param guess The player's guess
 */
function guessWord(player: Player, profile: PlayerProfile, guess: string) {
	const gameState = profile.Data.gameState
	const { word, previousGuesses } = gameState

	print(`${player} guessed ${guess}`)

	const response = analyzeGuess(guess, word, previousGuesses)

	if (!response.success) {
		return response
	}

	// Increment the amount of guesses by this player
	gameState.guessCount += 1
	gameState.previousGuesses.push(guess)

	// Player has won
	if (response.win) {
		// Give points
		// Assign player new word
	}

	return response
}

/**
 * Get information about the player's current word. If they don't have a word, select a new one.
 * @param player The player whose word is retrieved
 * @param length The desired length of the word if a new word is selected
 */
function getWord(player: Player, profile: PlayerProfile, length: number): IWordResponse {
	const { word, guessCount, previousGuesses } = profile.Data.gameState

	// Player already has a word to guess
	if (word !== '') {
		return {
			success: true,
			length: word.size(),
			guessCount,
			previousGuesses,
		}
	}

	// Reset player's guesses and assign new word to them
	const newWord = randomWord(length)
	DataManager.setPlayerWord(player, newWord)

	// Return the length of the new word
	return { success: true, length: newWord.size(), guessCount: 0, previousGuesses: [] }
}

Players.PlayerAdded.Connect((player) => {
	DataManager.getProfileAsync(player).then((profile) =>
		print(`Word assigned: ${profile.Data.gameState.word}`)
	)
})

// Add callbacks to server events
remotes.Server.Create('guessWord').SetCallback(withPlayerProfile(guessWord))
remotes.Server.Create('getWord').SetCallback(withPlayerProfile(getWord))
