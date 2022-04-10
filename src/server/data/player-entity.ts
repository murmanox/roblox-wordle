import { Dictionary } from '@rbxts/llama'
import { DeepPartial } from 'types/util/partial'
import { DeepReadonly } from 'types/util/readonly'
import { PlayerProfile, PlayerProfileData } from './player-data'

export class PlayerEntity {
	public readonly name: string
	public data: DeepReadonly<PlayerProfileData>

	constructor(player: Player, private profile: PlayerProfile) {
		this.name = player.DisplayName
		this.data = profile.Data
	}

	public updateData(changedData: DeepPartial<PlayerProfileData>) {
		const newData = Dictionary.mergeDeep(this.data, changedData) as PlayerProfileData

		print('Data updated from', this.data, 'to', newData)

		this.profile.Data = newData
		this.data = newData
	}
}
