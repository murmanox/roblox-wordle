import { Definitions, Middleware } from '@rbxts/net'
import { t } from '@rbxts/t'
import { IGuessResponse } from 'types/interfaces/network-types'
import { createGuessMiddleware } from './middleware/net-middleware'

const remotes = Definitions.Create({
	/** Checks if the guessed word matches the word saved on the server. */
	guessWord: Definitions.ServerAsyncFunction<(word: string) => IGuessResponse>([
		Middleware.TypeChecking(t.string, t.number),
		createGuessMiddleware(),
	]),

	/** Give the player a new word to guess */
	getRandomWord: Definitions.ServerAsyncFunction<(length: number) => any>(),
})

export = remotes
