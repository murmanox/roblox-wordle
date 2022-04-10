import { PlayerEntity } from './player-entity'
import profileLoader from './profile-loader'

class PlayerManager {
	private playerEntityMap = new Map<Player, PlayerEntity>()

	public async onPlayerJoin(player: Player) {
		const profile = await profileLoader.loadPlayerProfile(player)
		if (!profile) return

		const entity = new PlayerEntity(player, profile)
		this.playerEntityMap.set(player, entity)
	}

	public getPlayerEntity(player: Player): PlayerEntity | undefined {
		return this.playerEntityMap.get(player)
	}
}

const playerManager = new PlayerManager()
export default playerManager
