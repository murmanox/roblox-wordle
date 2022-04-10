import Roact from '@rbxts/roact'
import { hooked, useContext } from '@rbxts/roact-hooked'
import { Provider, useSelector } from '@rbxts/roact-rodux-hooked'
import { IGuess } from 'types/interfaces/guess-types'
import { ThemeContext, ThemeController } from '../../context/theme-context'
import { ClientStore, IClientStore } from '../../store/rodux'
import Grid from './grid'

// Guesses to be added to the store
const guesses: IGuess[] = [
	{ word: 'pills', matches: [1], partials: [2, 3] },
	{ word: 'atone', matches: [], partials: [1] },
	{ word: 'gnome', matches: [], partials: [0] },
	{ word: 'light', matches: [0, 1, 2, 3, 4], partials: [] },
]

const Background = hooked(() => {
	const theme = useContext(ThemeContext)
	return <frame Size={UDim2.fromScale(1, 1)} BackgroundColor3={theme.default} />
})

const GridStoreWrapper = hooked(() => {
	const { guesses, word, length } = useSelector((state: IClientStore) => {
		return { guesses: state.guesses, word: state.word, length: state.length }
	})

	return <Grid guesses={guesses} current={word} length={length} />
})

export = (story: GuiBase2d) => {
	const element = (
		<Provider store={ClientStore}>
			<ThemeController>
				<Background />
				<GridStoreWrapper />
				<textbutton
					Position={UDim2.fromScale(0, 1)}
					AnchorPoint={new Vector2(0, 1)}
					Size={UDim2.fromOffset(50, 20)}
					Text="Theme"
					Event={{
						Activated: () =>
							ClientStore.dispatch({
								type: 'setTheme',
								theme: ClientStore.getState().theme === 'light' ? 'dark' : 'light',
							}),
					}}
				/>
			</ThemeController>
		</Provider>
	)

	// Simulate player input
	let running = true
	task.spawn(() => {
		let guessIndex = 0
		let index = 0
		let target = guesses[guessIndex].word

		while (running) {
			task.wait(0.5)
			if (!running) return

			// end of word reached
			if (index > target.size()) {
				index = 0
				ClientStore.dispatch({ type: 'addGuess', guess: guesses[guessIndex] })
				guessIndex += 1
				if (guessIndex === guesses.size()) {
					running = false
				} else {
					target = guesses[guessIndex].word
				}
			}

			const word = target.sub(0, index)
			ClientStore.dispatch({ type: 'setWord', word })
			index += 1
		}
	})

	const handle = Roact.mount(element, story)

	return () => {
		Roact.unmount(handle)
		running = false
	}
}
