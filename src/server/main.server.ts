import { Players } from '@rbxts/services'
import remotes from 'shared/remotes'
import playerManager from './data/player-manager'
import { getWord } from './get-word'
import { guessWord } from './guess-word'
import withPlayerEntity from './wrappers/withPlayerEntity'

Players.PlayerAdded.Connect((player) => playerManager.onPlayerJoin(player))

// Add callbacks to server events
remotes.Server.Create('guessWord').SetCallback(withPlayerEntity(guessWord))
remotes.Server.Create('getWord').SetCallback(withPlayerEntity(getWord))
