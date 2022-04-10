import ProfileService from '@rbxts/profileservice'
import { Profile } from '@rbxts/profileservice/globals'
import { Players } from '@rbxts/services'
import { IPlayerGuessData } from 'types/interfaces/guess-types'
import { defaultPlayerData, PlayerProfile, PlayerProfileData } from './player-data'

type PromiseMethods = [
	(resolve: PlayerProfile | Promise<PlayerProfile>) => void,
	(reason: string) => void
]

const profileStore = ProfileService.GetProfileStore('PlayerData', defaultPlayerData)
const profiles = new Map<Player, PlayerProfile>()
const profilePromises = new Map<Player, Promise<PlayerProfile>>()
const promiseResolve = new Map<Player, PromiseMethods>()

function onPlayerAdded(player: Player) {
	const profile = profileStore.LoadProfileAsync(`Player_${player.UserId}`)

	// Get the resole and reject callback
	let resolve, reject
	if (promiseResolve.get(player)) {
		;[resolve, reject] = promiseResolve.get(player)!
		promiseResolve.delete(player)
	}

	// Player's profile is loading
	if (profile !== undefined) {
		profile.AddUserId(player.UserId)
		profile.Reconcile()
		profile.ListenToRelease(() => {
			profiles.delete(player)
			profilePromises.delete(player)
			player.Kick('Your profile has been loaded on another server')
		})

		// Make sure the player is still in the game
		if (player.IsDescendantOf(Players)) {
			profiles.set(player, profile)

			// Resolve the active promise for this player's profile
			resolve && resolve(profile)
		} else {
			// Reject the promise
			reject && reject('Player left before profile loaded')
			profile.Release()
		}
	} else {
		reject && reject('Unable to load profile')
		player.Kick('Your profile could not be loaded')
	}
}

Players.PlayerAdded.Connect(onPlayerAdded)
Players.PlayerRemoving.Connect((player) => {
	const profile = profiles.get(player)
	if (profile) {
		profile.Release()
	}
})

/**
 * Used to access and modify user profiles externally
 */
export namespace DataManager {
	/**
	 * Converts ProfileService's LoadProfileAsync into a promise that
	 * resolves when the user's profile has been successfully retrieved
	 * @param player The player's profile to get
	 * @returns A promise that resolves with the player's profile
	 */
	export function getProfileAsync(player: Player): Promise<Profile<PlayerProfileData>> {
		// Getting stats of players outside of the game will cause memory leaks without some work
		if (!player.IsDescendantOf(Players)) {
			error("Player isn't in game")
		}

		let promise = profilePromises.get(player)

		// Promise hasn't been created yet, make it now
		if (!promise) {
			const profile = profiles.get(player)

			// Profile already exists, return a resolved promise
			if (profile) {
				const resolved = Promise.resolve(profile)
				profilePromises.set(player, resolved)
				return resolved
			}

			promise = new Promise<PlayerProfile>((resolve, reject) => {
				promiseResolve.set(player, [resolve, reject])
			})

			// Store in promise map for use later
			profilePromises.set(player, promise)
		}

		return promise
	}

	/**
	 * Retrieves the currently saved profile for a player. Returns undefined if the profile hasn't been loaded
	 * @param player The player whose profile is retrieved
	 */
	export function getProfile(player: Player): PlayerProfile | undefined {
		return profiles.get(player)
	}

	export function getPlayerData(player: Player): PlayerProfileData | undefined {
		const profile = getProfile(player)
		if (profile) {
			return profile.Data
		}
	}

	export function setPlayerWord(player: Player, word: string) {
		print('word set', word)
		const data: IPlayerGuessData = {
			word,
			guessCount: 0,
			previousGuesses: [],
			usedLetters: [],
		}

		getProfile(player)!.Data.gameState = data
	}
}
