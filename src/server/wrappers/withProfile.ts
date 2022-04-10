import { PlayerProfileData } from 'server/data/player-data'
import playerManager from 'server/data/player-manager'
import { IResponseBad } from 'types/interfaces/network-types'
import { DeepReadonly } from 'types/util/readonly'

export default function withPlayerData<T extends Array<unknown>, R = void>(
	fn: (player: Player, profile: DeepReadonly<PlayerProfileData>, ...args: T) => R
) {
	return (player: Player, ...args: T): R | IResponseBad => {
		const entity = playerManager.getPlayerEntity(player)
		const profile = entity?.data

		if (!profile) {
			return { success: false, error: 'Profile not loaded' }
		}

		return fn(player, profile, ...args)
	}
}
