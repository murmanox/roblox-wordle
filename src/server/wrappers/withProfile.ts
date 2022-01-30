import { DataManager } from 'server/profile-service'
import { IResponseBad } from 'types/interfaces/network-types'
import { PlayerProfile } from 'types/interfaces/profile-type'

export default function withPlayerProfile<T extends Array<unknown>, R = void>(
	fn: (player: Player, profile: PlayerProfile, ...args: T) => R
) {
	return (player: Player, ...args: T): R | IResponseBad => {
		const profile = DataManager.getProfile(player)
		if (profile) {
			return fn(player, profile, ...args)
		}
		return { success: false, error: 'Profile not loaded' }
	}
}
