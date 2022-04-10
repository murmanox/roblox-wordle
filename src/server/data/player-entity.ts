import { DeepReadonly } from 'types/util/readonly'
import { PlayerProfile, PlayerProfileData } from './player-data'

export class PlayerEntity {
	public readonly name: string
	public data: DeepReadonly<PlayerProfileData>

	constructor(player: Player, private profile: PlayerProfile) {
		this.name = player.DisplayName
		this.data = profile.Data
	}
}
