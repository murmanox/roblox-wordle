export function checkPartials(s1: string, s2: string): number[] {
	const partialIndex: number[] = []

	// Convert strings to arrays
	const guess = [...s1]
	const word = [...s2]

	// Look for partial matches in strings
	for (let i = 0; i < guess.size(); i++) {
		const guessChar = guess[i]
		const wordChar = word[i]

		// Letters match, not partial
		if (guessChar === wordChar) continue
		if (wordChar === '0') continue

		const index = word.indexOf(guessChar)
		if (index !== -1) {
			// Replace character with '1' to prevent being detected multiple
			// times while also not being detected as a match
			word[index] = '1'
			partialIndex.push(i)
		}
	}

	return partialIndex
}
