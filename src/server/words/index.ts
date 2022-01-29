export const wordArrayMap = new Map<number, string[]>()
export const wordSet = new Set<string>()

for (const module of script!.GetChildren()) {
	const wordArray = require(module as ModuleScript) as string[]

	wordArrayMap.set(tonumber(module.Name)!, wordArray)
	for (const word of wordArray) {
		wordSet.add(word)
	}
}
