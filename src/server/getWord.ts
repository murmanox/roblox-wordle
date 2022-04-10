import { IWordResponse } from 'types/interfaces/network-types'
import { PlayerProfile } from './data/player-data'
import { DataManager } from './data/profile-service'
import { randomWord } from './utility/random'

/**
 * Get information about the player's current word. If they don't have a word, select a new one.
 * @param player The player whose word is retrieved
 * @param length The desired length of the word if a new word is selected
 */
export function getWord(player: Player, profile: PlayerProfile, length: number): IWordResponse {
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
