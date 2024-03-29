import { Dictionary } from '@rbxts/llama'
import { IPlayerGuessData } from 'types/interfaces/guess-types'
import { IGuessResponse } from 'types/interfaces/network-types'
import { DeepPartial } from 'types/util/partial'
import { PlayerProfileData } from './data/player-data'
import { PlayerEntity } from './data/player-entity'
import { analyzeGuess } from './guess/word-match'

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

	entity.updateData({
		gameState: {
			// Delete solved word until they want a new one
			word: response.state.win ? '' : data.gameState.word,
			guessCount: data.gameState.guessCount + 1,
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
	})

	return response
}
