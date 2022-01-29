import { IGuessResponse } from 'types/interfaces/network-types'

function isRealWord(word: string): boolean {
	return true
}

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
	const string1 = [...s1]
	const string2 = [...s2]

	// Look for partial matches in strings
	for (let i = 0; i < string1.size(); i++) {
		// Not a direct match but character exists in other string
		if (string1[i] !== string2[i] && string1.indexOf(string2[i]) !== -1) {
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
export function analyzeGuess(guess: string, word: string, pastGuesses: string[]): IGuessResponse {
	// Check if player guessed correct word
	if (word === guess) {
		return { success: true, matches: checkMatches(guess, word), partials: [] }
	}

	// Check that guess is unique
	if (pastGuesses.includes(guess)) {
		return { success: false, error: 'Word was previously guessed' }
	}

	// Check that word is correct length
	if (word.size() !== guess.size()) {
		return { success: false, error: 'Not enough letters' }
	}

	// Check if word is a real word
	if (!isRealWord(guess)) {
		return { success: false, error: 'Not in word list' }
	}

	// Analyze the guess and return the results
	return { success: true, matches: checkMatches(guess, word), partials: checkPartials(guess, word) }
}