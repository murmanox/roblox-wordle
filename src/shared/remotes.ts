import { Definitions, Middleware } from '@rbxts/net'
import { t } from '@rbxts/t'
import { IGuessResponse, IWordResponse } from 'types/interfaces/network-types'
import { createGuessMiddleware } from './middleware/net-middleware'

const remotes = Definitions.Create({
	/** Checks if the guessed word matches the word saved on the server. */
	guessWord: Definitions.ServerAsyncFunction<(word: string) => IGuessResponse>([
		Middleware.TypeChecking(t.string),
		createGuessMiddleware(),
	]),

	/** Retrieve the player's current word or generate a new one */
	getWord: Definitions.ServerAsyncFunction<(length: number) => IWordResponse>(),
})

export = remotes
