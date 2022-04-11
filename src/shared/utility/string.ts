/**
 * Replace characters in a string with another string based on their position
 * @param str The base string that will be replaced
 * @param positions Array of numbers which will be used to index the string
 * @param replace String to insert at every position
 */
export function overwriteCharactersAtPositions(
	str: string,
	positions: number[],
	replace: string
): string {
	const stringArray = [...str]
	positions.forEach((i) => (stringArray[i] = replace))
	return stringArray.join('')
}
