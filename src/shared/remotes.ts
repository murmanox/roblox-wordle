import { Definitions } from '@rbxts/net'
import { IGuessResponse } from 'types/interfaces/network-types'

const remotes = Definitions.Create({
	/** Checks if the guessed word matches the word saved on the server. */
	guessWord: Definitions.ServerAsyncFunction<(word: string) => IGuessResponse>(),

	/** Give the player a new word to guess */
	getRandomWord: Definitions.ClientToServerEvent<[length: number]>(),
})

export = remotes
