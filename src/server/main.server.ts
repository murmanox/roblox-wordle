import { Players } from '@rbxts/services'
import remotes from 'shared/remotes'
import { getWord } from './getWord'
import { guessWord } from './guessWord'
import { DataManager } from './data/profile-service'
import withPlayerProfile from './wrappers/withProfile'

Players.PlayerAdded.Connect((player) => {
	DataManager.getProfileAsync(player).then((profile) =>
		print(`Word assigned: ${profile.Data.gameState.word}`)
	)
})

// Add callbacks to server events
remotes.Server.Create('guessWord').SetCallback(withPlayerProfile(guessWord))
remotes.Server.Create('getWord').SetCallback(withPlayerProfile(getWord))
