import { PlayerEntity } from 'server/data/player-entity'
import playerManager from 'server/data/player-manager'
import { IResponseBad } from 'types/interfaces/network-types'

export default function withPlayerProfile<T extends Array<unknown>, R = void>(
	fn: (player: Player, profile: PlayerEntity, ...args: T) => R
) {
	return (player: Player, ...args: T): R | IResponseBad => {
		const entity = playerManager.getPlayerEntity(player)

		if (!entity) {
			return { success: false, error: 'PlayerEntity not found' }
		}

		return fn(player, entity, ...args)
	}
}
