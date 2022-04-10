import { pipe } from 'shared/utility/rodash'

const filterNonAlphabetic = (str: string): string => str.gsub('%A', '')[0]
const trimToLength = (length?: number) => (str: string) => str.sub(1, length)
const toLowerCase = (str: string): string => str.lower()

/**
 * Format an array into a readable string
 * @param arr The array to format
 */
export const formatArray = (arr: defined[]) => `[${arr.join(', ')}]`

/**
 * Returns a function that formats a string to remove non-alphabetic characters,
 * convert to lower case, and trims to a max length
 * @param length The length of the resulting string. Negative numbers will count from the end of the string.
 */
export const formatText = (length?: number) => {
	return pipe(filterNonAlphabetic, trimToLength(length), toLowerCase)
}
