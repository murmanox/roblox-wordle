import { IGuess } from 'types/interfaces/guess-types'
import { IGuessResponse } from 'types/interfaces/network-types'
import { allWords } from './words'

function checkMatches(s1: string, s2: string): number[] {
	const matchIndex: number[] = []

	// Convert strings to arrays
	const string1 = [...s1]
	const string2 = [...s2]

	for (let i = 0; i < string1.size(); i++) {
		if (string1[i] === string2[i]) {
			matchIndex.push(i)
		}
	}

	return matchIndex
}

function checkPartials(s1: string, s2: string): number[] {
	const partialIndex: number[] = []

	// Convert strings to arrays
	const guess = [...s1]
	const word = [...s2]

	// Look for partial matches in strings
	for (let i = 0; i < guess.size(); i++) {
		const guessChar = guess[i]
		const wordChar = word[i]

		// Not a direct match but character exists in other string
		if (guessChar !== wordChar && word.indexOf(guessChar) !== -1) {
			partialIndex.push(i)
		}
	}

	return partialIndex
}

/**
 * Take the player's guess and compare it against their word and previous guesses
 * @param guess The player's guess
 * @param word The word to compare the guess against
 * @param pastGuesses An array of previous guesses
 */
export function analyzeGuess(guess: string, word: string, pastGuesses: IGuess[]): IGuessResponse {
	// Check if player guessed correct word
	if (word === guess) {
		return { success: true, win: true, matches: checkMatches(guess, word), partials: [] }
	}

	// Check that guess is unique
	if (pastGuesses.map((guess) => guess.word).includes(guess)) {
		return { success: false, error: 'Word was previously guessed' }
	}

	// Check that word is correct length
	if (word.size() !== guess.size()) {
		return { success: false, error: 'Not enough letters' }
	}

	// Check if word is a real word
	if (!allWords.has(guess)) {
		return { success: false, error: 'Not in word list' }
	}

	// Analyze the guess and return the results
	return {
		success: true,
		win: false,
		matches: checkMatches(guess, word),
		partials: checkPartials(guess, word),
	}
}
