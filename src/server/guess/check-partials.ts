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

		const index = word.indexOf(guessChar)
		if (index !== -1) {
			partialIndex.push(i)
			word[index] = '0'
		}
	}

	return partialIndex
}
