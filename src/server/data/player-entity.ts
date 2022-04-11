import { Dictionary } from '@rbxts/llama'
import { DeepPartial } from 'types/util/partial'
import { DeepReadonly } from 'types/util/readonly'
import { PlayerProfile, PlayerProfileData } from './player-data'

/**
 * Container for data relating to the player.
 * Provides an API to update the player's ProfileService profile.
 */
export class PlayerEntity {
	public readonly name: string

	/** Readonly version of the player's profile data. Updates should be done through the `updateData` method. */
	public data: DeepReadonly<PlayerProfileData>

	constructor(player: Player, private profile: PlayerProfile) {
		this.name = player.DisplayName
		this.data = profile.Data
	}

	/**
	 * Updates the player's saved data.
	 * Nested objects will be merged recursively, so excluded keys will be ignored.
	 */
	public updateData(changedData: DeepPartial<PlayerProfileData>) {
		const newData = Dictionary.mergeDeep(this.data, changedData) as PlayerProfileData

		print(`${this.name}'s data updated to`, newData)

		this.profile.Data = newData
		this.data = newData
	}
}
