import { PlayerEntity } from './player-entity'
import profileLoader from './profile-loader'

/**
 * Handles the creation of player entities when the player joins the game.
 * Keeps a record of player entities for external use.
 */
class PlayerManager {
	private playerEntityMap = new Map<Player, PlayerEntity>()

	/**
	 * Creates a PlayerEntity for the passed player
	 */
	public async onPlayerJoin(player: Player): Promise<void> {
		const profile = await profileLoader.loadPlayerProfile(player)
		if (!profile) return

		const entity = new PlayerEntity(player, profile)
		this.playerEntityMap.set(player, entity)
	}

	/**
	 * Retrieves the PlayerEntity associated with the passed player
	 */
	public getPlayerEntity(player: Player): PlayerEntity | undefined {
		return this.playerEntityMap.get(player)
	}
}

const playerManager = new PlayerManager()
export default playerManager
