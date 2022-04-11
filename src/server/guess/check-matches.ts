export function checkMatches(s1: string, s2: string): number[] {
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
