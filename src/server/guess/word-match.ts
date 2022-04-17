import { IPlayerGuessData } from 'types/interfaces/guess-types'
import { IGuessResponse } from 'types/interfaces/network-types'
import { createErrorGuessResponse, createGuessResponse } from './create-guess-response'
import { checkMatches } from './check-matches'
import { checkPartials } from './check-partials'
import { allWords } from '../words'
import { overwriteCharactersAtPositions } from 'shared/utility/string'

/**
 * Take the player's guess and compare it against their word and previous guesses
 * @param guess The player's guess
 * @param word The word to compare the guess against
 * @param pastGuesses An array of previous guesses
 */
export function analyzeGuess(guess: string, gameState: IPlayerGuessData): IGuessResponse {
	const { word, guessCount, maxGuesses } = gameState

	// Make sure player hasn't used all their guesses
	if (guessCount >= maxGuesses) {
		return createErrorGuessResponse('Guess limit reached')
	}

	// Check that word is correct length
	if (word.size() !== guess.size()) {
		return createErrorGuessResponse('Not enough letters')
	}

	// Check if word is a real word
	if (!allWords.has(guess)) {
		return createErrorGuessResponse('Not in word list')
	}

	// TODO: Check if word is filtered for player

	// Analyze string for matches
	const matches = checkMatches(guess, word)

	// Replace matched characters with '0' to prevent matches with partials
	const alteredWord = overwriteCharactersAtPositions(word, matches, '0')

	// Analyze string for partial matches
	const partials = checkPartials(guess, alteredWord)

	return createGuessResponse(guess, matches, partials, gameState)
}
