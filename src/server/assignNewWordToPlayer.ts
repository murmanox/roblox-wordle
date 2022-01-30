import { IPlayerGuessData } from 'types/interfaces/guess-types'
import { playerWordMap } from '../shared/playerWordMap'
import { randomWord } from './utility/random'

/**
 * Select a random word for the player to guess. Resets their previous guesses to 0.
 * @param player The player to selected a new word for
 * @param length The length of the word to selected
 * @returns The word that was selected
 */
export function assignNewWordToPlayer(player: Player, length: number): string {
	const guessData: IPlayerGuessData = {
		word: randomWord(length),
		guessCount: 0,
		previousGuesses: [],
	}
	playerWordMap.set(player, guessData)

	return guessData.word
}
