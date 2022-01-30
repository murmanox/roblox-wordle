export const wordLengthMap = new Map<number, string[]>()
export const allWords = new Set<string>()

for (const child of script!.GetChildren()) {
	if (!child.IsA('ModuleScript')) continue

	const wordArray = require(child as ModuleScript) as string[]

	wordLengthMap.set(tonumber(child.Name)!, wordArray)
	for (const word of wordArray) {
		allWords.add(word)
	}
}
