export const wordLengthMap = new Map<number, string[]>()
export const allWords = new Set<string>()

for (const module of script!.GetChildren()) {
	const wordArray = require(module as ModuleScript) as string[]

	wordLengthMap.set(tonumber(module.Name)!, wordArray)
	for (const word of wordArray) {
		allWords.add(word)
	}
}
