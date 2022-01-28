import { Definitions } from '@rbxts/net'
import { IGuessResponse } from 'types/interfaces/network-types'

const remotes = Definitions.Create({
	guessWord: Definitions.ServerAsyncFunction<(word: string) => IGuessResponse>(),
	getRandomWord: Definitions.ServerAsyncFunction<(length: number) => string>(),
})

export = remotes
