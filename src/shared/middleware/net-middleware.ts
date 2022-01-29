import { NetMiddleware } from '@rbxts/net/out/middleware'
import { playerWordMap } from '../playerWordMap'

type GuessMiddleware = NetMiddleware<any, Array<unknown>>
export function createGuessMiddleware(): GuessMiddleware {
	return (processNext: Callback) => {
		return (player: Player, ...args: unknown[]) => {
			if (playerWordMap.get(player)) {
				return processNext(player, ...args)
			} else {
				warn(`user ${player.UserId} made a guess before being assigned a word`)
			}
		}
	}
}
