import ProfileService from '@rbxts/profileservice'
import { Players } from '@rbxts/services'
import { KickCode, kickPlayer } from 'server/utility/kick'
import { defaultPlayerData, PlayerProfile } from './player-data'

class ProfileLoader {
	private profileStore = ProfileService.GetProfileStore('PlayerData', defaultPlayerData)

	public async loadPlayerProfile(player: Player): Promise<PlayerProfile | void> {
		const profileKey = `Player_${player.UserId}`
		const profile = this.profileStore.LoadProfileAsync(profileKey, 'ForceLoad')

		// Profile couldn't be loaded
		if (!profile) {
			return kickPlayer.profileError(player, KickCode.profileLoadFailure)
		}

		// Player left before the profile was loaded
		if (!player.IsDescendantOf(Players)) {
			return profile.Release()
		}

		// Fill in missing values from default data
		profile.Reconcile()

		// Listen for when the profile releases
		profile.ListenToRelease(() => {
			if (!player.IsDescendantOf(Players)) return
			return kickPlayer.profileError(player, KickCode.profileReleased)
		})

		return profile
	}
}

const profileLoader = new ProfileLoader()
export default profileLoader
