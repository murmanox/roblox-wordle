import { wordLengthMap } from 'server/words'

/**
 * Get a random word of specified length from the pre-loaded words
 * @param length The length of the word to return
 */
export function randomWord(length: number): string {
	const words = wordLengthMap.get(length)!
	return words[math.random(0, words.size())]
}
