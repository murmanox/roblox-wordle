import { IGuessResponse } from 'types/interfaces/network-types'
import { DataManager } from './data/profile-service'
import { PlayerProfile } from './data/player-data'
import { analyzeGuess } from './word-match'

/**
 * Compare the player's guess against their assigned word.
 * @param player The player that's guessing
 * @param guess The player's guess
 */
export function guessWord(player: Player, profile: PlayerProfile, guess: string): IGuessResponse {
	const gameState = profile.Data.gameState
	const response = analyzeGuess(guess, gameState)

	if (!response.success) {
		return response
	}

	gameState.usedLetters = response.state.usedLetters

	// Increment the amount of guesses by this player
	gameState.previousGuesses.push({
		word: guess,
		matches: response.matches,
		partials: response.partials,
	})

	// Player has won
	if (response.state.win) {
		// Give points
		// Delete solved word until they want a new one
		DataManager.setPlayerWord(player, '')
	}

	return response
}
