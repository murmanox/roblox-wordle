import { pipe } from 'shared/utility/rodash'

const filterNonLetters = (str: string): string => str.gsub('%A', '')[0]
const maxLength = (length: number) => (str: string) => str.sub(1, length)
const toLowerCase = (str: string): string => str.lower()
const trim = (str: string): string => str.gsub(' ', '')[0]

export const formatArray = (arr: defined[]) => `[${arr.join(', ')}]`
export const formatText = pipe(trim, maxLength(5), filterNonLetters, toLowerCase)
