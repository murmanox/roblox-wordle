import { RunService } from '@rbxts/services'
import remotes from 'shared/remotes'
import { IGuessResponse } from 'types/interfaces/network-types'
import { ClientStore, IClientStore } from './interface/store/rodux'

const isRunning = RunService.IsRunning()
const fakeResponse: IGuessResponse = {
	success: true,
	matches: [0],
	partials: [1],
	state: { win: false, usedLetters: [] },
}

export async function guessWord(): Promise<IGuessResponse> {
	const word = ClientStore.getState().word
	let response: IGuessResponse

	// Send the word to the server and wait for response
	if (isRunning) {
		response = await remotes.Client.Get('guessWord').CallServerAsync(word)
	} else {
		// Fake response from server when not running game
		response = fakeResponse
	}

	// TODO: Make this a thunk
	// Update state with response
	if (response.success) {
		const { matches, partials, state } = response
		const { win, usedLetters } = state
		ClientStore.dispatch({ type: 'setWord', word: '' })
		ClientStore.dispatch({ type: 'addGuess', guess: { word, matches, partials } })
		ClientStore.dispatch({ type: 'setUsedLetters', letters: usedLetters })
	}

	return response
}
