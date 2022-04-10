import { IWordResponse } from 'types/interfaces/network-types'
import { defaultPlayerData, PlayerProfileData } from './data/player-data'
import { PlayerEntity } from './data/player-entity'
import { randomWord } from './utility/random'

/**
 * Get information about the player's current word. If they don't have a word, select a new one.
 * @param player The player whose word is retrieved
 * @param length The desired length of the word if a new word is selected
 */
export function getWord(entity: PlayerEntity, length: number): IWordResponse {
	const data = entity.data as PlayerProfileData
	const { word, guessCount, previousGuesses } = data.gameState

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
	const newState = { ...defaultPlayerData.gameState, word: newWord }
	entity.updateData({ gameState: newState })

	// Return the length of the new word
	return { success: true, length: newWord.size(), guessCount: 0, previousGuesses: [] }
}
