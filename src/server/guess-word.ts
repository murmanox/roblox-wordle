import { IPlayerGuessData } from 'types/interfaces/guess-types'
import { IGuessResponse } from 'types/interfaces/network-types'
import { DeepPartial } from 'types/util/partial'
import { PlayerProfileData } from './data/player-data'
import { PlayerEntity } from './data/player-entity'
import { analyzeGuess } from './word-match'

/**
 * Compare the player's guess against their assigned word.
 * @param player The player that's guessing
 * @param guess The player's guess
 */
export function guessWord(entity: PlayerEntity, guess: string): IGuessResponse {
	const data = entity.data
	const gameState = data.gameState as IPlayerGuessData
	const response = analyzeGuess(guess, gameState)

	if (!response.success) {
		return response
	}

	const e: DeepPartial<PlayerProfileData> = {
		gameState: {
			usedLetters: response.state.usedLetters,
			previousGuesses: [
				...gameState.previousGuesses,
				{
					word: guess,
					matches: response.matches,
					partials: response.partials,
				},
			],
		},
	}

	// Player has won
	if (response.state.win) {
		// Give points
		// Delete solved word until they want a new one
		e.gameState!.word = ''
		// entity.updateData({ gameState: { word: '' } })
	}

	entity.updateData(e)

	return response
}
