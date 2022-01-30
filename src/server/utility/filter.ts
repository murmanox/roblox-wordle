import { TextService } from '@rbxts/services'

/**
 * Checks if a word passes the filter and returns a boolean value
 * @param word Input string
 * @param plr: Player object
 */

export function filterWord(word: string, plr: Player): boolean {
	const filterInstance = TextService.FilterStringAsync(word, plr.UserId)

	if (filterInstance) {
		const filteredString = filterInstance.GetNonChatStringForUserAsync(plr.UserId)

		if (filteredString === word) return true
	}

	return false
}
