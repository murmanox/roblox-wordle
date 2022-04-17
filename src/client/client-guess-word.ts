import remotes from 'shared/remotes'
import { IGuessResponse } from 'types/interfaces/network-types'
import { ClientStore } from './interface/store/rodux'

export async function guessWord(): Promise<IGuessResponse> {
	const state = ClientStore.getState()
	const { word } = state

	// TODO: Client side checks that word is valid before sending to server

	// Send the word to the server and wait for response
	const response = await remotes.Client.Get('guessWord').CallServerAsync(word)

	// TODO: Make this a thunk
	// Update state with response
	if (response.success) {
		const { matches, partials, state } = response
		const { win, usedLetters } = state
		ClientStore.dispatch({ type: 'setWord', word: '' })
		ClientStore.dispatch({ type: 'addGuess', guess: { word, matches, partials } })
		ClientStore.dispatch({ type: 'setUsedLetters', letters: usedLetters })
	} else {
		warn(response.error)
	}

	return response
}
