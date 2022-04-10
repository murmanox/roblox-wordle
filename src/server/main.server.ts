import { Players } from '@rbxts/services'
import remotes from 'shared/remotes'
import { getWord } from './getWord'
import { guessWord } from './guessWord'
import withPlayerData from './wrappers/withProfile'
import playerManager from './data/player-manager'

Players.PlayerAdded.Connect((player) => playerManager.onPlayerJoin(player))

// Add callbacks to server events
remotes.Server.Create('guessWord').SetCallback(withPlayerData(guessWord))
remotes.Server.Create('getWord').SetCallback(withPlayerData(getWord))
